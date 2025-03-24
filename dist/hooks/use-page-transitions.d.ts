import { FlowType } from "../types/flow-type";
/** Gives access to different transitions between pages. */
export declare function usePageTransitions(): {
    hide: {
        (): Promise<void>;
        (flowType: FlowType): Promise<void>;
    };
    show: () => void;
};
