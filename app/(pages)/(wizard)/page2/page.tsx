"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FlowType, usePageTransitions } from "@/app/page-transitions";

export default function Page() {
  const transitions = usePageTransitions();
  const router = useRouter();

  useEffect(() => {
    transitions.show();
  }, []);

  function onBack() {
    transitions.hide(FlowType.Previous).then(() => router.push("/page1"));
  }

  function onNext() {
    transitions.hide(FlowType.Next).then(() => router.push("/page3"));
  }

  return (
    <main className="mb-8">
      <h1 className="font-bold text-6xl text-center">Add a Notebook</h1>

      <p className="mt-16">
        Add a notebook to your project to keep notes about your story. You will
        be able to add more notebooks later.
      </p>
      <div className="mt-8">
        <label>
          <span className="block font-medium">
            Choose a name for your first notebook
          </span>
          <input
            type="text"
            className="mt-2 bg-white p-2 h-[2.5rem] border-slate-200 border rounded-lg outline-0 focus:border-sky-600 focus:border-b w-full md:max-w-md"
          />
        </label>
      </div>

      <div className="mt-8">
        <label>
          <span className="block font-medium">Write a first note</span>
          <textarea className="mt-2 bg-white p-2 h-[5rem] border-slate-200 border rounded-lg outline-0 focus:border-sky-600 focus:border-b w-full" />
        </label>
      </div>
      <div className="flex gap-4 items-center mt-8">
        <button
          className="text-center outline-none min-w-28 h-fit px-4 py-2 border border-slate-300 rounded-lg focus:border-2 focus:border-black"
          onClick={onBack}
        >
          Back
        </button>
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
