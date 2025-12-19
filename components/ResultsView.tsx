"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Caterer } from "../lib/mockCaterers";
import { slugify } from "../lib/slugify";

type ResultsViewProps = {
  county: string;
  city: string;
  caterers: Caterer[];
};

const cuisineOptions = [
  "Italian",
  "Mediterranean",
  "Mexican",
  "BBQ",
  "Vegan",
  "Dessert"
];

const priceOptions: Array<Caterer["priceTier"]> = ["$", "$$", "$$$"];

const sortOptions = ["Recommended", "Rating", "Price"];

export default function ResultsView({ county, city, caterers }: ResultsViewProps) {
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<Caterer["priceTier"] | null>(
    null
  );
  const [sortBy, setSortBy] = useState("Recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...caterers];

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      list = list.filter(
        (caterer) =>
          caterer.name.toLowerCase().includes(query) ||
          caterer.cuisines.some((cuisine) => cuisine.toLowerCase().includes(query))
      );
    }

    if (selectedCuisine) {
      list = list.filter((caterer) => caterer.cuisines.includes(selectedCuisine));
    }

    if (selectedPrice) {
      list = list.filter((caterer) => caterer.priceTier === selectedPrice);
    }

    if (sortBy === "Rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Price") {
      const rank: Record<Caterer["priceTier"], number> = { $: 1, $$: 2, $$$: 3 };
      list.sort((a, b) => rank[a.priceTier] - rank[b.priceTier]);
    }

    return list;
  }, [caterers, search, selectedCuisine, selectedPrice, sortBy]);

  const filters = (
    <div className="flex flex-col gap-5">
      <div className="space-y-2">
        <label className="text-[11px] font-medium tracking-[0.18em] text-deep-green/60">
          Search
        </label>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name or cuisine"
          className="w-full rounded-2xl border border-deep-green/10 bg-white/70 px-4 py-2 text-sm text-deep-green shadow-soft outline-none transition focus:border-deep-green/30"
        />
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-medium tracking-[0.18em] text-deep-green/60">
          Cuisine
        </p>
        <div className="flex flex-wrap gap-2">
          {cuisineOptions.map((cuisine) => {
            const active = selectedCuisine === cuisine;
            return (
              <button
                key={cuisine}
                type="button"
                onClick={() => setSelectedCuisine(active ? null : cuisine)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "bg-deep-green/15 text-deep-green"
                    : "bg-deep-green/5 text-deep-green/70 hover:bg-deep-green/10"
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] font-medium tracking-[0.18em] text-deep-green/60">
          Price
        </p>
        <div className="flex gap-2">
          {priceOptions.map((price) => {
            const active = selectedPrice === price;
            return (
              <button
                key={price}
                type="button"
                onClick={() => setSelectedPrice(active ? null : price)}
                className={`rounded-full px-4 py-1 text-xs font-medium transition ${
                  active
                    ? "bg-deep-green/15 text-deep-green"
                    : "bg-deep-green/5 text-deep-green/70 hover:bg-deep-green/10"
                }`}
              >
                {price}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-medium tracking-[0.18em] text-deep-green/60">
          Sort
        </label>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="w-full rounded-2xl border border-deep-green/10 bg-white/70 px-4 py-2 text-sm text-deep-green shadow-soft outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">
        <div className="sticky top-6 rounded-3xl bg-white/50 p-5 shadow-soft backdrop-blur">
          {filters}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between lg:hidden">
          <p className="text-sm font-medium text-deep-green/70">
            {filtered.length} partners
          </p>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="rounded-full border border-deep-green/20 bg-white/70 px-4 py-2 text-xs font-medium text-deep-green shadow-soft"
          >
            Filters
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((caterer) => {
            const slug = slugify(caterer.slug);
            return (
              <Link
                key={caterer.slug}
                href={`/${slugify(county)}/${slugify(city)}/${slug}`}
                className="group overflow-hidden rounded-3xl bg-white/70 shadow-soft transition hover:-translate-y-[2px] hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-cream">
                  <img
                    src={caterer.heroImage}
                    alt={caterer.name}
                    className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                </div>
                <div className="space-y-3 p-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-deep-green">
                      {caterer.name}
                    </h3>
                    <p className="text-xs text-deep-green/70">{caterer.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {caterer.cuisines.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="rounded-full bg-deep-green/5 px-2 py-1 text-[10px] font-medium text-deep-green/70"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-deep-green/70">
                    <span>
                      {caterer.rating.toFixed(1)} · {caterer.reviewCount} reviews
                    </span>
                    <span>{caterer.priceTier}</span>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center justify-center rounded-full bg-deep-green px-4 py-2 text-xs font-semibold text-cream transition group-hover:bg-deep-green/90">
                      View details
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {!filtered.length && (
          <div className="rounded-3xl bg-white/60 p-8 text-center text-sm text-deep-green/70 shadow-soft">
            No matches yet. Try clearing filters or searching another cuisine.
          </div>
        )}
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-cream px-6 pb-8 pt-6 shadow-xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-deep-green">Filters</p>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="text-xs font-medium text-deep-green/70"
                >
                  Close
                </button>
              </div>
              {filters}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
