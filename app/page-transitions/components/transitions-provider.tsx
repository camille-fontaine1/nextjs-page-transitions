"use client";
import React, { useState, useRef } from "react";
import { TransitionsContext } from "../context/transitions-context";
import classNames from "classnames";
import { AnimationType } from "../types/animation-type";
import { FlowType } from "../types/flow-type";
import { PageTransitionsConfiguration } from "../types/page-transitions-configuration";
import styles from './styles.module.css';

export function PageTransitionsProvider({
  children,
  config: tempConfig,
}: React.PropsWithChildren<{
  config?: PageTransitionsConfiguration;
}>) {
  const [className, setClassName] = useState("");
  const config = getConfigOrDefault(tempConfig);
  const action = useRef<FlowType | null>(null);
  const animationDurationSeconds = config.animationDuration / 1000;

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
        className={classNames(styles[className], config.wrapperClassName)}
        style={{ animationDuration: `${animationDurationSeconds}s` }}
      >
        {children}
      </div>
    </TransitionsContext.Provider>
  );
}

function getConfigOrDefault(config?: PageTransitionsConfiguration) {
  return {
    ...config,
    animationType: config?.animation.type ?? AnimationType.SlideHorizontally,
    animationDuration: config?.animation.duration ?? 400,
  };
}
