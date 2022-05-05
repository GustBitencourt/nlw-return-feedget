import { useState } from "react";
import { CloseButton } from "../CloseButtom";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./components/FeedbackType";
import { FeedbackContent } from "./components/FeedbackContent";
import { FeedbackSucess } from "./components/FeedbackSucess";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada',
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento',
    }
  },
};

/* Tipando o tipo de feedback a ser escolhido pelo usuário keyof para pegar apenass a chave do objeto*/
export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null); /* UseState após tipagem do feedbacktype */
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }


  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)]md:w-auto">


      {
        /* Se o feedback foi enviado show sucess */
        feedbackSent ? (
          <FeedbackSucess onFeedbackRestartRequested={handleRestartFeedback} />

        ) : (
          <>
            {
              /* Se foi escolhido um tipo de feedback */
              !feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />

              ) : (
                <FeedbackContent
                  feedbackType={feedbackType}
                  onFeedbackRestartRequested={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
                />
              )
            }
          </>
        )
      }

      <footer>
        Feito com 💕 por <a className="underline underline-offset-2" href="https://www.linkedin.com/in/gustavobiten" target="_blank" rel="noopener noreferrer">Gustavo Bitencourt</a> na NLW
      </footer>
    </div>
  )
}
