"use client";

import { AnimationType, PageTransitionsConfiguration, PageTransitionsProvider } from "@/app/page-transitions";


export default function WizardLayout({ children }: React.PropsWithChildren) {
  const config: PageTransitionsConfiguration = {
    animation: {
      type: AnimationType.SlideHorizontally,
      duration: 400,
    },
  };
  return (
    <PageTransitionsProvider config={config}>
      <div className="flex flex-column h-full items-center">
        <div className="px-4 w-full md:max-w-screen-md md:mx-auto">
          {children}
        </div>
      </div>
    </PageTransitionsProvider>
  );
}
