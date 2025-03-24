"use client";

import { AnimationType } from "@/plugin/types/animation-type";
import { Configuration, TransitionsProvider } from "../../../plugin/components/transitions-provider";

export default function WizardLayout({ children }: React.PropsWithChildren) {
  const config: Configuration = {
    animation: {
      type: AnimationType.SlideHorizontally,
      duration: 400
    }
  }
  return (
    <TransitionsProvider config={config}>
      <div className="flex flex-column h-full items-center">
        <div className="px-4 w-full md:max-w-screen-md md:mx-auto">
          {children}
        </div>
      </div>
    </TransitionsProvider>
  );
}
