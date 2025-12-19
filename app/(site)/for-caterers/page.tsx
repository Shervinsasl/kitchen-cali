import Link from "next/link";

export default function ForCaterersPage() {
  return (
    <main className="min-h-screen bg-linen px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <p className="text-xs font-medium tracking-[0.18em] text-deep-green/60">
          Partner with Kitchen Cali
        </p>
        <h1 className="text-3xl font-semibold text-deep-green sm:text-4xl">
          Get discovered by clients who love unforgettable food.
        </h1>
        <p className="text-sm text-deep-green/70 sm:text-base">
          We connect California caterers with weddings, corporate events, and
          private gatherings. A tailored onboarding experience is coming soon.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="rounded-full bg-deep-green px-5 py-3 text-sm font-semibold text-cream shadow-soft"
          >
            Join the waitlist
          </button>
          <Link
            href="/"
            className="text-xs font-medium text-deep-green/70 hover:text-deep-green"
          >
            Back to customer search
          </Link>
        </div>
      </div>
    </main>
  );
}
