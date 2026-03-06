import { AgentActionPanel } from "../components/AgentActionPanel";
import ComponentGeneratorPanel from "../components/ComponentGeneratorPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-[#ffe6d8] text-zinc-900">
      <main className="flex min-h-screen w-full flex-col gap-12 px-6 py-12 sm:px-10 lg:px-16 lg:max-w-[1600px] lg:mx-auto">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#fb7232]/30 bg-white px-5 py-2 shadow-sm">
              <span className="text-2xl font-black tracking-tight text-[#fb7232]">Componeasy</span>
            </div>
            <p className="text-sm font-medium text-[#c75829] sm:text-base">
              Generate production-ready React/UI components from text — instantly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <a
              href="#cta"
              className="w-full sm:w-auto text-center rounded-full border border-[#fb7232]/30 bg-white px-4 py-2 text-sm font-semibold text-[#c75829] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Try Now
            </a>
            <a
              href="mailto:hi@chirag.co"
              className="w-full sm:w-auto text-center rounded-full bg-[#fb7232] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e06225] hover:shadow-md"
            >
              Contact
            </a>
          </div>
        </header>

        {/* Hero & Generator */}
        <section className="grid min-h-[600px] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232] shadow-sm">
              Plan Mode: UI Component Generator
            </p>
            <h1 className="text-4xl font-black leading-tight text-[#3f1b08] sm:text-5xl">
              Describe your component.<br className="hidden sm:block" /> Generate ready-to-use code.
            </h1>
            <p className="max-w-3xl text-lg leading-7 text-zinc-700">
              Componeasy lets developers turn text descriptions into actual, production-ready React and HTML code with one click. <span className="text-[#fb7232] font-medium">Stop handcoding UI from scratch:</span> describe your component &amp; copy-paste the output—fast.
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-base text-[#5a2a12] sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#fb7232] inline-block" /> Describe what you want in text
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#fb7232] inline-block" /> Get both React and HTML code instantly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#fb7232] inline-block" /> Copy to clipboard with one click
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#fb7232] inline-block" /> Built for developers, no sign-up
              </li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-[#fb7232]/30 bg-white shadow-md p-6 flex flex-col items-stretch justify-center">
            <ComponentGeneratorPanel />
          </div>
        </section>

        {/* Client Island Demo (Keep as-is for now) */}
        <section className="rounded-2xl border border-[#fb7232]/20 bg-white/80 px-6 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">Demo: Client island</p>
              <h3 className="text-xl font-bold text-[#341404]">Persistent local notes</h3>
              <p className="text-sm text-[#6a3515]">
                Example of mixing interactive islands (like forms) inside a server-rendered landing. Your code generator uses the same "island" pattern for best performance.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <AgentActionPanel />
            </div>
          </div>
        </section>

        {/* Footer / CTA */}
        <section
          id="cta"
          className="rounded-2xl border border-[#fb7232]/15 bg-gradient-to-br from-white via-[#fff5ee] to-white px-6 py-12 text-[#33170a] shadow-sm sm:px-12"
        >
          <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb7232]">Componeasy template</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Productionized. Fast. Typed.</h2>
              <p className="text-base text-[#6a3515]">
                Built for developers ready to move fast: describe any UI—get clean, reusable code on demand.
              </p>
            </div>
            <div className="grid gap-4 rounded-xl border border-[#fb7232]/20 bg-white/80 p-6 text-sm shadow-sm sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Product</p>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="#features">
                  Features
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="#cta">
                  Try Now
                </a>
                <a className="block text-[#5a2a12] transition hover:text-[#fb7232]" href="mailto:hi@chirag.co">
                  Support
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c75829]">Info</p>
                <span className="block text-[#5a2a12]">
                  Owner: Chirag Dodiya
                </span>
                <span className="block text-[#5a2a12]">Email: hi@chirag.co</span>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center border-t border-[#fb7232]/15 pt-6 text-center text-xs text-[#6a3515]">
            <span>Componeasy • MIT licensed • For developers</span>
          </div>
        </section>
      </main>
    </div>
  );
}