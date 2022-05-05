import { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "../..";
import { CloseButton } from "../../../CloseButtom"
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
}

export const FeedbackContent = ({ 
    feedbackType, 
    onFeedbackRestartRequested 
    }: FeedbackContentProps) => {

    const [screenshot, setScreenshot] = useState<string | null>(null);


    const feedbackTypeInfo = feedbackTypes[feedbackType];


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
            
            <form className="my-4 w-full">
                <textarea 
                    className="min-w-[19rem] w-full min-h-[7rem] text=sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte o que está acontecendo"
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
                    >
                        Enviar Feedback
                    </button>
                </footer>                
            </form>
        </>
    )
  }