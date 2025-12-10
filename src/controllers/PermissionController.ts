import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserRequest } from "../entities/UserRequests";

export class PermissionController {
  async approve(req: Request, res: Response) {
    // Pegamos o ID que veio pela URL
    const { id } = req.query;

    try {
      // Obtém o repositório da tabela ModRequest
      // para podermos atualizar o registro
      const repo = AppDataSource.getRepository(UserRequest);

      // converte id para número
      const requestId = Number(req.query.id);
      // valida se é um número real
      if (isNaN(requestId)) {
        return res.status(400).send("ID inválido.");
      }
      // Atualiza o registro com o ID recebido, marcando como aprovado
      await repo.update(requestId, {
        status: "approved",
        approved_at: new Date()
      });
      // Retorna uma resposta simples em HTML para o navegador.
      // Quem clicar no link do email verá essa mensagem.
      return res.send("<h1 style='color:green'>Solicitação APROVADA</h1>");
    } catch (e) {
      return res.status(500).send("Erro ao aprovar.");
    }
  }

  async deny(req: Request, res: Response) {
    const { id } = req.query;

    try {
      const repo = AppDataSource.getRepository(UserRequest);
      // converte id para número
      const requestId = Number(req.query.id);

      // valida se é um número real
      if (isNaN(requestId)) {
        return res.status(400).send("ID inválido.");
      }
      await repo.update(requestId, {
        status: "denied",
        denied_at: new Date()
      });

      return res.send("<h1 style='color:red'>Solicitação NEGADA</h1>");
    } catch (e) {
      return res.status(500).send("Erro ao negar.");
    }
  }
}