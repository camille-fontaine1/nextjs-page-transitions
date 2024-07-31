import { WizardContextProvider } from "./_context/wizard-context";

export default function WizardLayout({ children }: React.PropsWithChildren) {
  return (
    <WizardContextProvider className="h-full">
      <div className="flex flex-column h-full items-center">
        <div className="px-4 w-full md:max-w-screen-md md:mx-auto">
          {children}
        </div>
      </div>
    </WizardContextProvider>
  );
}
