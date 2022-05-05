export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

//funções assincrona viram promises voids
export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}