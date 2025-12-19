"use client";

import Link from "next/link";

type SiteHeaderProps = {
  showBadge?: boolean;
};

export default function SiteHeader({ showBadge = true }: SiteHeaderProps) {
  return (
    <header className="w-full px-6 pt-8 md:px-12 lg:px-16">
      <div className="grid grid-cols-3 items-center">
        <Link
          href="/"
          className="justify-self-start -mt-1 pl-1 text-sm uppercase tracking-[0.24em] text-deep-green/80"
        >
          Kitchen Cali
        </Link>
        <div className="justify-self-center" />
        <div className="justify-self-end flex items-center gap-3">
          {showBadge && (
            <div className="rounded-full bg-white/50 px-3 py-1 text-xs text-deep-green/70 shadow-soft backdrop-blur">
              California • Catering Directory
            </div>
          )}
          <Link
            href="/for-caterers"
            className="rounded-full border border-deep-green/20 px-3 py-1 text-xs font-medium text-deep-green/70 transition hover:border-deep-green/40 hover:text-deep-green"
          >
            For Caterers
          </Link>
        </div>
      </div>
    </header>
  );
}
