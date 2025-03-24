import React from "react";
import { AnimationType } from "../types/animation-type";
export interface Configuration {
    wrapperClassName?: string;
    animation: {
        type: AnimationType;
        duration: number;
    };
}
export declare function TransitionsProvider({ children, config: tempConfig, }: React.PropsWithChildren<{
    config?: Configuration;
}>): React.JSX.Element;
