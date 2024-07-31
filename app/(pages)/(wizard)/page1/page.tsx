"use client";
import { useWizardContext } from "@/app/(pages)/(wizard)/_context/wizard-context";
import { useEffect } from "react";

export default function Page() {
  const wizardContext = useWizardContext();

  useEffect(() => {
    wizardContext.reset();
  }, []);

  function onNext() {
    wizardContext.next("/page2");
  }

  return (
    <main>
      <h1 className="font-bold text-6xl text-center">Create a Project</h1>

      <div className="mt-16">
        <label>
          <span className="block font-medium">
            What do you want to call this project?
          </span>
          <input
            type="text"
            className="mt-2 bg-white p-2 h-[2.5rem] border-slate-200 border rounded-lg outline-0 focus:border-sky-600 focus:border-2 w-full md:max-w-md"
          />
        </label>
      </div>

      <div className="mt-8">
        <label>
          <span className="block font-medium">
            Give it a description (Only you will see this!)
          </span>
          <textarea className="mt-2 bg-white p-2 h-[5rem] border-slate-200 border rounded-lg outline-0 focus:border-sky-600 focus:border-2 w-full" />
        </label>
      </div>
      <div className="flex items-center mt-8">
        <button
          className="text-center outline-none min-w-28 h-fit px-4 py-2 bg-blue-600 text-white rounded-lg focus:border-2 focus:border-black"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </main>
  );
}
