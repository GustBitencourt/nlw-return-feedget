import { PrismaFeedbacksRepository } from "./../repositories/prisma/prisma-feedback-repository";
import { SubmitFeedbackUseCase } from "./../use-cases/submit-feedback-use-case";
import express from "express";
import { NodeMailerMailAdapter } from "../adapters/nodemaler/nodemailer-mail-adapter";

export const routes = express.Router();

//req é onde mandaremos o json do nosso feedback
routes.post("/feedbacks", async (req, res) => {
  //para utilizarmos short sintax abaixo
  const { type, comment, screenshot } = req.body;

  try {
    //parametros com responsabilidades divididas
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodeMailerMailAdapter = new NodeMailerMailAdapter();

    //função de enviar feedback
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodeMailerMailAdapter
    );

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).send();
  } catch (err) {
    console.log(err);
  }
});
