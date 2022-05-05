import { FeedbacksRepository } from './../repositories/feedbacks-repository';
interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,

    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        //para utilizarmos short sintax abaixo
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })
    } 
}