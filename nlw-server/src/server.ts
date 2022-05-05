import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a86a6b1c64e54e",
      pass: "56d246a04fbf28"
    }
  });

//req é onde mandaremos o json do nosso feedback
app.post('/feedbacks', async (req, res) => {

    //para utilizarmos short sintax abaixo
    const { type, comment, screenshot } = req.body;
    //acessando as informações da nossa tabela no prisma, para ser enviado da forma correta
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    })

    //após criação feedback envia confirmação por email para o usuario
    await transport.sendMail({
        from: 'Equipe GustFeedGet <adm@gustfeedget.com',
        to: 'Gustavo Gama <gubiten@gmail.com>',
        subject: 'Novo feedback',
        //corpo do email em html cada posição é referente a uma linha no email
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
            `<p>Tipo do feedback recebido: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`,
        ].join('\n')
    })

    return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
    console.log('HTTP Server started on port 3333');
})