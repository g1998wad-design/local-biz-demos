import { notFound } from "next/navigation";
import { getAllBusinessSlugs, getBusiness } from "@/lib/businesses";
import {
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

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

// Mix a hex color with white to get a soft tint for backgrounds/borders.
function tint(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
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
  const accentSoft = tint(accent, 0.94);
  const accentSofter = tint(accent, 0.97);
  const mailHref = business.email
    ? `mailto:${business.email}`
    : undefined;

  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Complimentary-demo banner */}
      <div
        className="w-full px-4 py-2.5 text-center text-sm font-medium text-white"
        style={{ backgroundColor: accent }}
      >
        <Sparkles className="mb-0.5 inline h-4 w-4" /> This is a free demo
        website built for {business.name} -- not live yet, just a preview.{" "}
        {mailHref ? (
          <a href={mailHref} className="underline underline-offset-2">
            Reply to the email
          </a>
        ) : (
          "Want this for real? Just reply."
        )}{" "}
        and it&apos;s yours.
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-4 backdrop-blur-md sm:px-10">
        <div className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {business.name.charAt(0).toUpperCase()}
          </span>
          <span className="text-lg font-semibold text-gray-900">
            {business.name}
          </span>
        </div>
        {mailHref && (
          <a
            href={mailHref}
            className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:flex"
            style={{ backgroundColor: accent }}
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </nav>

      {/* Hero */}
      <header
        className="relative overflow-hidden px-6 py-28 text-center sm:py-36"
        style={{
          background: `radial-gradient(circle at 50% -20%, ${accentSoft} 0%, white 60%)`,
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: accentSofter }}
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
          <span
            className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: accentSoft, color: accent }}
          >
            {business.category}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {business.name}
          </h1>
          <p className="max-w-xl text-lg text-gray-600 sm:text-xl">
            {business.tagline}
          </p>
          {mailHref && (
            <a
              href={mailHref}
              className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl"
              style={{ backgroundColor: accent, boxShadow: `0 12px 24px -8px ${accent}66` }}
            >
              Claim This Website <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      {/* About */}
      <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
          About
        </h2>
        <p className="text-xl leading-relaxed text-gray-700">
          {business.about}
        </p>
      </section>

      {/* Services */}
      {business.services?.length > 0 && (
        <section className="px-6 py-20" style={{ backgroundColor: accentSofter }}>
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
              What We Offer
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {business.services.map((service) => (
                <div
                  key={service}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: accentSoft, color: accent }}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <p className="font-medium text-gray-800">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
        <h2 className="mb-10 text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
          Visit Us
        </h2>
        <div className="flex flex-col items-center gap-4 text-lg text-gray-700">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: accentSoft, color: accent }}
            >
              <MapPin className="h-4 w-4" />
            </span>
            <span>
              {business.address}, {business.city}
            </span>
          </div>
          {business.phone && (
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: accentSoft, color: accent }}
              >
                <Phone className="h-4 w-4" />
              </span>
              <span>{business.phone}</span>
            </div>
          )}
          {business.email && (
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: accentSoft, color: accent }}
              >
                <Mail className="h-4 w-4" />
              </span>
              <span>{business.email}</span>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-auto border-t border-gray-100 px-6 py-8 text-center text-sm text-gray-400">
        Demo site &middot; not affiliated with {business.name} until they say
        so.
      </footer>
    </div>
  );
}
