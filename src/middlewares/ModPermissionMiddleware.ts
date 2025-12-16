import { Request, Response, NextFunction } from 'express'
import * as nodemailer from 'nodemailer';
import { AppDataSource } from '../data-source';
import {UserRequest} from '../entities/UserRequests'

export const ModPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtém o repositório da entidade ModRequest.
    // É através do repositório que podemos salvar, buscar e editar registros no banco.
    const modRepo = AppDataSource.getRepository(UserRequest);

    // 1. salva requisição no banco como pendente

    // Cria um novo objeto ModRequest **em memória**, ainda NÃO salva no banco.
    // Aqui estamos preparando a requisição que o usuário tentou fazer,
    // guardando o corpo da request e marcando como "pending".
    const requestEntity = modRepo.create({
      request_body: req.body,
      status: "pending",
    });

    // Salva no banco de dados a requisição pendente que acabamos de criar.
    // Após salvar, o TypeORM retorna o registro completo já com ID autogerado.
    const saved = await modRepo.save(requestEntity);

    // Pegamos o ID que o banco acabou de gerar.
    // Esse ID será usado no link enviado por email, para aprovar ou negar depois.
    const requestId = saved.id;

    // 2. enviar e-mail
    //manda email com as informações da request para um moderador(NOS). de alguma forma ter um botão para aceitar ou negar a modificação
    //se aceitar continua com next se não da um return e não permite nenhuma modificação

    // Cria um "transporter", que é o objeto responsável por enviar emails.
    // Ele define para qual servidor SMTP vamos conectar e com qual credencial.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Monta a URL que o moderador vai clicar para APROVAR a requisição.
    // Ela chama a rota /permission/approve enviando o ID da requisição pendente.
    const approveURL = `http://localhost:3000/permission/approve?id=${requestId}`;

    // Mesma coisa aqui, só que para negar
    const denyURL = `http://localhost:3000/permission/deny?id=${requestId}`;

    await transporter.sendMail({
      from: '"Atlas" <atlasmundi0@gmail.com>',
      to: process.env.GMAIL_USER,
      subject: "Solicitação deletar pais",
      html: `
        <h2>Nova solicitação de modificação</h2>
        <p><pre>${JSON.stringify(req.body, null, 2)}</pre></p>
        <a href="${approveURL}" style="background:green;color:white;padding:10px;border-radius:5px;">APROVAR</a>
        <br><br>
        <a href="${denyURL}" style="background:red;color:white;padding:10px;border-radius:5px;">NEGAR</a>
      `,
    });

    // 3. responde ao usuário
    return res.json({
      message: "Sua solicitação foi enviada para moderação.",
      requestId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar solicitação." });
  }


// <script>
//         async function sendResponse(response) {
//             const result = await fetch('http://localhost:3000/permission/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ response: response })
//             });
//             const data = await result.json();
//         }
//     </script>
// scripts não funcionam em EMAILS então isso n roda, tem q ser um link, essa merda tem q roda em um link e tem q ser um GET
};