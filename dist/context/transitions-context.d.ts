import { Dispatch, SetStateAction } from "react";
import { FlowType } from "../types/flow-type";
interface TransitionsContext {
    flowType: React.MutableRefObject<FlowType | null>;
    className: string;
    setClassName: Dispatch<SetStateAction<string>>;
    animationDuration: number;
}
declare const TransitionsContext: import("react").Context<TransitionsContext | null>;
export { TransitionsContext as TransitionsContext };
