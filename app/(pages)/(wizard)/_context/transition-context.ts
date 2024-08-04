import { createContext, Dispatch, SetStateAction } from "react";

type Animation = "slide-left" | "slide-right";

interface TransitionContext {
  animation: React.MutableRefObject<Animation>;
  className: string;
  setClassName: Dispatch<SetStateAction<string>>;
}

const TransitionContext = createContext<TransitionContext | null>(null);

export { type Animation, TransitionContext };
