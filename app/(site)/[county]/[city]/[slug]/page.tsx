import Link from "next/link";
import { mockCaterers } from "../../../../../lib/mockCaterers";
import { slugify } from "../../../../../lib/slugify";
import ProfileCTA from "../../../../../components/ProfileCTA";

type PageProps = {
  params: { county: string; city: string; slug: string };
};

export default function CatererProfilePage({ params }: PageProps) {
  const countySlug = decodeURIComponent(params.county);
  const citySlug = decodeURIComponent(params.city);
  const slug = decodeURIComponent(params.slug);

  const caterer = mockCaterers.find(
    (item) =>
      slugify(item.slug) === slug &&
      slugify(item.county) === countySlug &&
      slugify(item.city) === citySlug
  );

  if (!caterer) {
    return (
      <main className="min-h-screen bg-linen px-6 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-deep-green/70">Caterer not found.</p>
          <Link
            href={`/${countySlug}/${citySlug}`}
            className="mt-4 inline-flex rounded-full bg-deep-green px-5 py-2 text-xs font-semibold text-cream"
          >
            Back to results
          </Link>
        </div>
      </main>
    );
  }

  const countyLabel = caterer.county;
  const cityLabel = caterer.city;

  return (
    <main className="min-h-screen bg-linen px-6 py-10 md:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-deep-green/60">
            <Link href="/" className="hover:text-deep-green">
              California
            </Link>{" "}
            /{" "}
            <Link href={`/${slugify(countyLabel)}/${slugify(cityLabel)}`}>
              {countyLabel} County
            </Link>{" "}
            / {cityLabel}
          </p>
          <h1 className="text-3xl font-semibold text-deep-green sm:text-4xl">
            {caterer.name}
          </h1>
          <p className="text-sm text-deep-green/70 sm:text-base">{caterer.tagline}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-deep-green/70">
            <span>
              {caterer.rating.toFixed(1)} · {caterer.reviewCount} reviews
            </span>
            <span className="h-1 w-1 rounded-full bg-deep-green/30" />
            <span>{caterer.priceTier}</span>
            <span className="h-1 w-1 rounded-full bg-deep-green/30" />
            <span>
              {cityLabel}, {countyLabel} County
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {caterer.cuisines.map((cuisine) => (
              <span
                key={cuisine}
                className="rounded-full bg-deep-green/5 px-3 py-1 text-xs font-medium text-deep-green/70"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_240px]">
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {caterer.gallery.map((image) => (
                <div
                  key={image}
                  className="aspect-[4/3] overflow-hidden rounded-3xl bg-white/70 shadow-soft"
                >
                  <img
                    src={image}
                    alt={caterer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <section className="rounded-3xl bg-white/70 p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-deep-green">About</h2>
              <p className="mt-3 text-sm text-deep-green/70 sm:text-base">
                {caterer.about}
              </p>
            </section>

            <section className="rounded-3xl bg-white/70 p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-deep-green">Services</h2>
              <ul className="mt-4 grid gap-2 text-sm text-deep-green/70 sm:grid-cols-2">
                {caterer.services.map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-deep-green/40" />
                    {service}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl bg-white/70 p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-deep-green">Sample menu</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {caterer.sampleMenu.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <p className="text-sm font-semibold text-deep-green">
                      {section.title}
                    </p>
                    <ul className="space-y-1 text-sm text-deep-green/70">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl bg-white/70 p-6 shadow-soft">
            <p className="text-xs font-medium tracking-[0.18em] text-deep-green/60">
              Get started
            </p>
            <p className="mt-2 text-sm text-deep-green/70">
              Tell us about your event and we will connect you with {caterer.name}.
            </p>
            <div className="mt-4">
              <ProfileCTA />
            </div>
            <Link
              href={`/${countySlug}/${citySlug}`}
              className="mt-4 inline-flex text-xs font-semibold text-deep-green/70 hover:text-deep-green"
            >
              Back to results
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
