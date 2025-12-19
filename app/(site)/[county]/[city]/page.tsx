import ResultsView from "../../../../components/ResultsView";
import { mockCaterers } from "../../../../lib/mockCaterers";
import { slugify } from "../../../../lib/slugify";

type PageProps = {
  params: { county: string; city: string };
};

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ResultsPage({ params }: PageProps) {
  const countySlug = decodeURIComponent(params.county);
  const citySlug = decodeURIComponent(params.city);

  const countyLabel =
    mockCaterers.find((caterer) => slugify(caterer.county) === countySlug)?.county ??
    formatLabel(countySlug);
  const cityLabel =
    mockCaterers.find((caterer) => slugify(caterer.city) === citySlug)?.city ??
    formatLabel(citySlug);

  const caterers = mockCaterers.filter(
    (caterer) =>
      slugify(caterer.county) === countySlug && slugify(caterer.city) === citySlug
  );

  return (
    <main className="min-h-screen bg-linen px-6 py-10 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-deep-green/60">
            California / {countyLabel} County / {cityLabel}
          </p>
          <h1 className="text-3xl font-semibold text-deep-green sm:text-4xl">
            Caterers in {cityLabel}
          </h1>
          <p className="max-w-2xl text-sm text-deep-green/70 sm:text-base">
            Curated partners for weddings, corporate events, and private gatherings.
          </p>
        </div>

        <ResultsView county={countyLabel} city={cityLabel} caterers={caterers} />
      </div>
    </main>
  );
}
