
import React from "react";

const Home = () => {
  return (
    <main className="min-h-screen bg-base-100">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/event-hero.png')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />

        {/* Hero content */}
        <div className="mx-auto flex min-h-[600px] max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Discover something extraordinary
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Your next
              <span className="block text-violet-400">
                great moment
              </span>
              starts here.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              Discover exciting events, connect with people,
              and turn ordinary days into unforgettable memories.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-300">
              <span>✦ Find your community</span>
              <span>✦ Discover new experiences</span>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-slate-950/60 to-transparent" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
          Your world, your events
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
          There is always something happening.
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-7 text-base-content/70">
          From inspiring workshops to unforgettable parties,
          find experiences that match your interests.
        </p>

      </section>
    </main>
  );
};

export default Home;

