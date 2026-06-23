import { PageWrapper } from "@/components";
import { locationPages } from "@/lib/data/location";
import { metaData } from "@/lib/utils/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: "Dental Clinic Locations | Onyx Dental Center",
    description:
      "Find Onyx Dental Center location pages for patients searching for dental care around Karawaci and nearby Tangerang areas.",
    path: "/location",
  });
}

export default function Location() {
  return (
    <PageWrapper className="min-h-screen bg-custom-primary text-custom-text-color">
      <section className="w-full bg-custom-white-accent">
        <div className="mx-auto w-full px-7 py-16 md:max-w-5xl md:px-0 md:py-24 xl:max-w-6xl">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-custom-text-color-2">
            Location
          </p>
          <h1 className="mb-4 font-eb-garamond text-4xl font-semibold leading-[110%] md:text-6xl">
            Dental Care Around Karawaci
          </h1>
          <p className="max-w-3xl leading-[150%] text-custom-text-color-2">
            Static local pages for patients comparing dental clinic options near Karawaci,
            Lippo Village, Binong, and the surrounding Tangerang area.
          </p>
        </div>
      </section>

      <section className="w-full">
        <div className="mx-auto grid w-full gap-6 px-7 py-12 md:max-w-5xl md:grid-cols-2 md:px-0 md:py-16 xl:max-w-6xl">
          {locationPages.map((page) => (
            <Link
              key={page.slug}
              href={`/location/${page.slug}`}
              className="bg-white drop-shadow-md transition hover:-translate-y-1"
            >
              <Image
                src={page.imageUrl}
                alt={page.imageAlt}
                width={600}
                height={400}
                className="h-auto w-full"
              />
              <div className="p-6">
                <p className="mb-3 text-sm uppercase tracking-[0.18em] text-custom-text-color-2">
                  {page.eyebrow}
                </p>
                <h2 className="mb-3 font-eb-garamond text-3xl font-semibold leading-[115%]">
                  {page.title}
                </h2>
                <p className="leading-[150%] text-custom-text-color-2">{page.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
