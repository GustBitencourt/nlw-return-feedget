import React from 'react'
import { feedbackTypes, FeedbackType } from '../..'
import { CloseButton } from '../../../CloseButtom';

interface FeedbackTypeStepProps {
    onFeedbackTypeChange: (type: FeedbackType) => void;
}

export const FeedbackTypeStep = ({ onFeedbackTypeChange }: FeedbackTypeStepProps) => {
    return (
        <>
            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>
                <CloseButton />
            </header>
            
            <div className="flex py-8 gap-2 w-full">
                {
                    /* Object entries retorna um array de arrays com a chave e conteudo do Objeto
                        Exemplo: 
                        [
                          ['BUG', {...conteudo de BUg}], 
                          ['IDEA', {...conteudo de IDEA}]
                          ...
                        ] 
                    */
                    Object.entries(feedbackTypes).map(([key, value]) => {
                        return (
                            <button
                                key={key}
                                className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                                onClick={() => onFeedbackTypeChange(key as FeedbackType)} /* necessário deixar explicito que o key é um feedbacktype */
                                type="button"
                            >
                                <img src={value.image.source} alt={value.image.alt} />
                                <span>{value.title}</span>
                            </button>
                        )
                    })
                }
            </div>
        </>
    )
}
