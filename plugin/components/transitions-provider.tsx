"use client";

import React, { useState, useRef } from "react";
import { TransitionsContext } from "../context/transitions-context";
import classNames from "classnames";
import { AnimationType } from "../types/animation-type";
import { FlowType } from "../types/flow-type";

export interface Configuration {
  wrapperClassName?: string;
  animation: {
    type:AnimationType,
    duration: number
  }
}

export function TransitionsProvider({
  children,
  config: tempConfig,
}: React.PropsWithChildren<{
  config?: Configuration;
}>) {
  const [className, setClassName] = useState("");
  const config = getConfigOrDefault(tempConfig);
  const action = useRef<FlowType | null>(null);
  const animationDuration = durationToCss(config.animationDuration);
  return (
    <TransitionsContext.Provider
      value={{
        className,
        setClassName,
        flowType: action,
        animationDuration: config.animationDuration,
      }}
    >
      <div
        className={classNames(className, config.wrapperClassName)}
        style={{ animationDuration: animationDuration }}
      >
        {children}
      </div>
    </TransitionsContext.Provider>
  );
}

function durationToCss(duration: number) {
  const seconds = duration / 1000;
  return `${seconds}s`;
}

function getConfigOrDefault(config?: Configuration) {
  return {
    ...config,
    animationType: config?.animation.type ?? AnimationType.SlideHorizontally,
    animationDuration: config?.animation.duration ?? 400,
  };
}
