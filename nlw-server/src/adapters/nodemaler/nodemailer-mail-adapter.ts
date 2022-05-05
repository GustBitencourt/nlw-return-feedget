import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a86a6b1c64e54e",
    pass: "56d246a04fbf28",
  },
});

export class NodeMailerMailAdapter implements MailAdapter {

  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe GustFeedGet <adm@gustfeedget.com",
      to: "Gustavo Gama <gubiten@gmail.com>",
      subject,
      //corpo do email em html cada posição é referente a uma linha no email
      html: body,
    });
  }
}
