import { Request, Response, NextFunction } from 'express'
import * as nodemailer from 'nodemailer';

export const ModPermissionMiddleware = (req:Request,res:Response,next:NextFunction) => {
    //manda email com as informações da request para um moderador(NOS). de alguma forma ter um botão para aceitar ou negar a modificação
    //se aceitar continua com next se não da um return e não permite nenhuma modificação
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const body = JSON.stringify(req.body, null, 2);
const encodedData = encodeURIComponent(body);
(async () => {
  const info = await transporter.sendMail({
    from: '"Atlas" <atlasmundi0@gmail.com>',
    to: process.env.GMAIL_USER,
    subject: "User Requesting bullshit",
    html: `<body>
        <p>request feita, VE SE ESTA CRIATURA PODE PASSAR:</p>
        <p>${body}</p>
          <a href="http://localhost:3000/permission/?data=${encodedData}&response="NÃO TA PODANDO"" style="background-color:red; color:white; text-decoration:none;">YOU SHALL NOT PASS</a>
          <br> <br> <br>
          <a href="http://localhost:3000/permission/?data=${encodedData}&response="VAI"" style="background-color:green; color:white; text-decoration:none;">Run you fools</a>
      </body>`
  });
  next()
  console.log("Request sent:", info.messageId);
})();

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

}