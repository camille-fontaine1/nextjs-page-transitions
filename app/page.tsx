import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-column h-full items-center mb-8">
      <div className="px-4 w-full md:max-w-screen-md md:mx-auto">
        <h1 className="font-bold text-6xl text-center">Page Transitions</h1>

        <p className="mt-16">
          Click Start Wizard to access the pages where page transitions have
          been setup.
        </p>

        <p className="mt-8">
          Navigate back and forth within the wizard to see how the page
          transitions flow seamlessly.
        </p>

        <Link
          className="text-center outline-none h-fit px-4 py-2 bg-blue-600 text-white rounded-lg focus:border-2 focus:border-black mt-8 inline-block"
          href="/page1"
        >
          Start Wizard
        </Link>
      </div>
    </main>
  );
}
