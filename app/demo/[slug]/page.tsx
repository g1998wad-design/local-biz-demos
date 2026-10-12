import { notFound } from "next/navigation";
import { getAllBusinessSlugs, getBusiness } from "@/lib/businesses";

export function generateStaticParams() {
  return getAllBusinessSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) return {};
  return {
    title: `${business.name} | ${business.city}`,
    description: business.tagline,
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const accent = business.accentColor || "#2563eb";

  return (
    <div className="flex min-h-full flex-col">
      {/* Complimentary-demo banner -- the whole point of this site is to be
          a live pitch the recipient can click into from a cold email, so
          make it unmistakable that this was made for them, for free. */}
      <div
        className="w-full py-2 px-4 text-center text-sm text-white"
        style={{ backgroundColor: accent }}
      >
        This is a free demo website built for {business.name} -- not live
        yet, just a preview. Want this for real?{" "}
        <a href={`mailto:${business.email || ""}`} className="underline font-medium">
          Reply to the email
        </a>{" "}
        and it&apos;s yours.
      </div>

      {/* Hero */}
      <header
        className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, #0f172a 100%)`,
        }}
      >
        <p className="text-sm uppercase tracking-widest opacity-80">
          {business.category}
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">{business.name}</h1>
        <p className="max-w-xl text-lg opacity-90">{business.tagline}</p>
      </header>

      {/* About */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold" style={{ color: accent }}>
          About
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          {business.about}
        </p>
      </section>

      {/* Services */}
      {business.services?.length > 0 && (
        <section className="bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2
              className="mb-8 text-center text-2xl font-semibold"
              style={{ color: accent }}
            >
              Services
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {business.services.map((service) => (
                <div
                  key={service}
                  className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm"
                >
                  <p className="font-medium text-gray-800">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
        <h2 className="mb-6 text-2xl font-semibold" style={{ color: accent }}>
          Visit Us
        </h2>
        <div className="space-y-2 text-lg text-gray-700">
          <p>{business.address}</p>
          <p>{business.city}</p>
          {business.phone && <p>{business.phone}</p>}
        </div>
      </section>

      <footer className="mt-auto border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-400">
        Demo site &middot; not affiliated with {business.name} until they say
        so.
      </footer>
    </div>
  );
}
