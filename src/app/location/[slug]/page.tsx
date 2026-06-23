import { PageWrapper } from "@/components";
import { getLocationPage, locationPages } from "@/lib/data/location";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const baseUrl = "https://onyxdentalcenter.id";
const whatsappUrl = "https://wa.me/6281286632240";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPage(slug);

  if (!page) notFound();

  return {
    metadataBase: new URL(baseUrl),
    title: page.metadataTitle,
    description: page.description,
    alternates: {
      canonical: `/location/${page.slug}`,
      languages: {
        [page.locale === "en" ? "en-ID" : "id-ID"]: `/location/${page.slug}`,
        [page.locale === "en" ? "id-ID" : "en-ID"]: `/location/${page.alternateSlug}`,
      },
    },
    openGraph: {
      title: page.metadataTitle,
      description: page.description,
      url: `${baseUrl}/location/${page.slug}`,
      siteName: "Onyx Dental Center",
      type: "website",
    },
  };
}

export default async function LocationDetail({ params }: PageProps) {
  const { slug } = await params;
  const page = getLocationPage(slug);

  if (!page) notFound();

  return (
    <PageWrapper className="min-h-screen bg-custom-primary text-custom-text-color">
      <section className="w-full bg-custom-white-accent">
        <div className="mx-auto grid w-full gap-8 px-7 py-16 md:max-w-5xl md:grid-cols-[1fr_420px] md:items-center md:px-0 md:py-24 xl:max-w-6xl">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.18em] text-custom-text-color-2">
              {page.eyebrow}
            </p>
            <h1 className="mb-5 max-w-4xl font-eb-garamond text-4xl font-semibold leading-[110%] md:text-6xl">
              {page.title}
            </h1>
            <p className="max-w-3xl leading-[150%] text-custom-text-color-2">{page.intro}</p>
          </div>
          <Image
            src={page.imageUrl}
            alt={page.imageAlt}
            width={600}
            height={400}
            loading="eager"
            className="aspect-[4/3] w-full object-cover object-center"
          />
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto grid w-full items-start gap-6 px-7 py-12 md:max-w-5xl md:grid-cols-3 md:px-0 md:py-16 xl:max-w-6xl">
          {page.sections.map((section) => (
            <article key={section.heading} className="h-fit self-start bg-white p-6 drop-shadow-md">
              <Image
                src={section.imageUrl}
                alt={section.heading}
                width={600}
                height={400}
                loading="eager"
                className="mb-5 aspect-[4/3] w-full object-cover object-center"
              />
              <h2 className="mb-3 font-eb-garamond text-2xl font-semibold leading-[120%]">
                {section.heading}
              </h2>
              <p className="leading-[150%] text-custom-text-color-2">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full bg-custom-black text-white">
        <div className="mx-auto flex w-full flex-col gap-5 px-7 py-12 md:max-w-5xl md:flex-row md:items-center md:justify-between md:px-0 xl:max-w-6xl">
          <div>
            <h2 className="mb-2 font-eb-garamond text-3xl font-semibold">
              Onyx Dental Center
            </h2>
            <p className="max-w-2xl leading-[150%] text-white/75">
              Ruko Asia Millenium, Jl. Taman Permata No.65 Blok C-1, Binong,
              Curug, Tangerang.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={whatsappUrl}
              className="inline-flex w-fit items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-custom-text-color"
            >
              {page.ctaLabel}
            </Link>
            <Link
              href={page.mapUrl}
              target="_blank"
              className="inline-flex w-fit items-center justify-center border border-white px-5 py-3 text-sm font-semibold text-white"
            >
              {page.mapLabel}
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
