import express from 'express';
import { prisma } from './prisma';

const app = express();
app.use(express.json());

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

    return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
    console.log('HTTP Server started on port 3333');
})