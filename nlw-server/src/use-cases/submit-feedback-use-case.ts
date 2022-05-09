import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "./../repositories/feedbacks-repository";
interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    //para utilizarmos short sintax abaixo
    const { type, comment, screenshot } = request;

    //erro caso o type seja enviado vazio
    if (!type) {
      throw new Error("Type is required");
    }

    //erro caso o comentário seja enviado vazio
    if (!comment) {
      throw new Error("Comment is required");
    }

    //pegando erro caso a foto não esteja no formato correto
    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot formato');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;" >`,
        `<p>Tipo do feedback recebido: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`,
      ].join("\n"),
    });
  }
}
