"use client";

export default function ProfileCTA() {
  return (
    <button
      type="button"
      onClick={() => {
        window.alert("Request a quote is coming soon.");
      }}
      className="w-full rounded-full bg-deep-green px-5 py-3 text-sm font-semibold text-cream shadow-soft transition hover:bg-deep-green/90"
    >
      Request a quote
    </button>
  );
}
