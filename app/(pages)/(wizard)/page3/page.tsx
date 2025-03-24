"use client";
import { useEffect } from "react";
import { usePageTransitions } from "../../../../plugin/hooks/use-page-transitions";
import { useRouter } from "next/navigation";
import { FlowType } from "@/plugin/types/flow-type";

export default function Page() {
  const transitions = usePageTransitions();
  const router = useRouter();

  useEffect(() => {
    transitions.show();
  }, []);

  function onBack() {
    transitions.hide(FlowType.Previous).then(() => router.push("/page2"));
  }

  return (
    <main className="mb-8">
      <h1 className="font-bold text-6xl text-center">You're all set!</h1>

      <p className="mt-16">
        You've successfully created your first project. Don't waste a minute,
        and start publishing!
      </p>

      <div className="flex gap-4 items-center mt-8">
        <button
          className="text-center outline-none min-w-28 h-fit px-4 py-2 border border-slate-300 rounded-lg focus:border-2 focus:border-black"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="text-center outline-none min-w-28 h-fit px-4 py-2 bg-blue-600 text-white rounded-lg focus:border-2 focus:border-black"
          onClick={() => {}}
        >
          My Projects
        </button>
      </div>
    </main>
  );
}
