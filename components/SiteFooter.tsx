"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 w-full px-6 pb-8 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-deep-green/60">
        <span>Kitchen Cali</span>
        <Link href="/for-caterers" className="hover:text-deep-green">
          For Caterers
        </Link>
      </div>
    </footer>
  );
}
