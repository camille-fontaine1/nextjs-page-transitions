"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";

export enum Action {
  Back,
  Next,
}

export interface WizardContext {
  animation: string;
  setAnimation: Dispatch<SetStateAction<string>>;
  pendingReset: ReturnType<typeof useRef<() => void>>;
  isAnimationCompleted: ReturnType<typeof useRef<boolean | null>>;
  action: ReturnType<typeof useRef<Action>>;
}

export const WizardContext = createContext<WizardContext | null>(null);

export function WizardProvider({
  children,
  className,
}: React.PropsWithChildren<{ className: string }>) {
  const [animation, setAnimation] = useState("");
  const pendingReset = useRef<() => void>();
  const isAnimationCompleted = useRef(null);
  const action = useRef(Action.Next);

  return (
    <WizardContext.Provider
      value={{
        animation,
        setAnimation,
        pendingReset,
        isAnimationCompleted,
        action,
      }}
    >
      <div className={`${animation} ${className}`}>{children}</div>
    </WizardContext.Provider>
  );
}
