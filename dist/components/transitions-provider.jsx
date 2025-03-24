"use client";
import React, { useState, useRef } from "react";
import { TransitionsContext } from "../context/transitions-context";
import classNames from "classnames";
import { AnimationType } from "../types/animation-type";
export function TransitionsProvider({ children, config: tempConfig, }) {
    const [className, setClassName] = useState("");
    const config = getConfigOrDefault(tempConfig);
    const action = useRef(null);
    const animationDuration = durationToCss(config.animationDuration);
    return (<TransitionsContext.Provider value={{
            className,
            setClassName,
            flowType: action,
            animationDuration: config.animationDuration,
        }}>
      <div className={classNames(className, config.wrapperClassName)} style={{ animationDuration: animationDuration }}>
        {children}
      </div>
    </TransitionsContext.Provider>);
}
function durationToCss(duration) {
    const seconds = duration / 1000;
    return `${seconds}s`;
}
function getConfigOrDefault(config) {
    var _a, _b;
    return Object.assign(Object.assign({}, config), { animationType: (_a = config === null || config === void 0 ? void 0 : config.animation.type) !== null && _a !== void 0 ? _a : AnimationType.SlideHorizontally, animationDuration: (_b = config === null || config === void 0 ? void 0 : config.animation.duration) !== null && _b !== void 0 ? _b : 400 });
}
