import { FormEvent, useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "../..";
import { CloseButton } from "../../../CloseButtom"
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../../lib/api";
import { Loading } from "../../../Loading";

interface FeedbackContentProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export const FeedbackContent = ({ 
    feedbackType, 
    onFeedbackRestartRequested,
    onFeedbackSent 
    }: FeedbackContentProps) => {

    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);


    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type : feedbackType,
            comment,
            screenshot,
        })

        setIsSendingFeedback(false);
        onFeedbackSent();

    }


    return (
        <>
            <header>

                <button 
                    type="button"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft 
                        weight="bold" 
                        className="w-4 h-4 top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    />
                </button>


                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>
            
            <form 
                className="my-4 w-full"
                onSubmit={handleSubmitFeedback}
            >
                <textarea 
                    className="min-w-[19rem] w-full min-h-[7rem] text=sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte o que está acontecendo"
                    onChange={(event) => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        type="submit"
                        disabled={comment.length === 0 || isSendingFeedback} //desabilita o botão caso não tenha comentatário ou esteja sendo enviado
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {
                            isSendingFeedback ? <Loading /> : 'Enviar Feedback'
                        }
                    </button>
                </footer>                
            </form>
        </>
    )
  }