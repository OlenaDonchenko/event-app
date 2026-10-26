import React from 'react';
import { Link, useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-950 px-6 py-20 text-white">
      {/* Glow background */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-32 w-full bg-gradient-to-t from-violet-950/40 to-transparent" />

      <div className="w-full max-w-xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
          Error 404
        </div>

        {/* Ticket-style 404 */}
        <div className="relative mx-auto mb-8 w-fit rounded-2xl border border-white/10 bg-white/5 px-10 py-6 backdrop-blur-sm">
          <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-slate-950" />
          <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-slate-950" />
          <h1 className="bg-gradient-to-r from-violet-300 via-violet-400 to-fuchsia-400 bg-clip-text text-8xl font-extrabold tracking-tight text-transparent sm:text-9xl">
            404
          </h1>
          <div className="mt-3 border-t border-dashed border-white/20 pt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            Admit nobody
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          This event doesn&apos;t exist
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-slate-300">
          The page you&apos;re looking for may have been moved, cancelled, or
          never made it onto the schedule.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn btn-primary btn-lg rounded-full border-none bg-violet-600 px-8 hover:bg-violet-500">
            Back to home
          </Link>
          <Link to="/events" className="btn btn-outline btn-lg rounded-full border-white/30 px-8 text-white hover:border-white hover:bg-white/10">
            Browse events
          </Link>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-link mt-6 text-slate-400 no-underline hover:text-violet-300"
        >
          ← Go back to previous page
        </button>
      </div>
    </main>
  );
};

export default NotFound;
