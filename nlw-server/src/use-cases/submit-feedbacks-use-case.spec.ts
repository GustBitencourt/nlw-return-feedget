import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//spies - forma de conseguir saber se uma função foi chamada ou não
//fn função espiã, podemos saber se foi chamada ou não
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    //devemos mandar dependencias mockadas, já que se enviassemos os mesmos parametros não iria ser um teste unitário
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

// describe switch de test, vários tests para uma única funcionalidade
describe('Submit feedback', () => {
    
    //o que esperamos que o teste faça
    it('should be able to submit a feedback', async () => {

        //ao chamarmos a função esperamos que ela seja executada sem nenhum erro, por isso o resolve acompanhado de not
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64hda7i3dh3ia7dh7he8h.jpg',

        })).resolves.not.toThrow();

        //verifica se as funções de criar feedback e enviar email foram chamadas
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    //o que esperamos que o teste faça
    it('should not be able to submit a feedback without type', async () => {        

        //ao chamarmos a função esperamos que ela não seja executada já que o type é obrigatório
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64hda7i3dh3ia7dh7he8h.jpg',

        })).rejects.toThrow();
    });

    //o que esperamos que o teste faça
    it('should not be able to submit a feedback without comment', async () => {        

        //ao chamarmos a função esperamos que ela não seja executada já que o comment é obrigatório
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64hda7i3dh3ia7dh7he8h.jpg',

        })).rejects.toThrow();
    });

    //o que esperamos que o teste faça
    it('should not be able to submit a feedback with an invalid image format', async () => {        

        //ao chamarmos a função esperamos que ela não seja executada já que o comment é obrigatório
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'bugou tudo',
            screenshot: 'test.jpg',

        })).rejects.toThrow();
    });
})