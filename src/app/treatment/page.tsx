import { PageWrapper } from "@/components";
import Cta from "@/components/Cta";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { metaData } from "@/lib/utils/metadata";
import Link from "next/link";
import Icons from "@/components/Icon";
import { treatments } from "@/lib/data/treatment";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: 'Treatments - Onyx Dental Center',
    description: 'Specialized in aesthetic dentistry, we service smile makeovers, veneers, orthodontics, dental crowns, bleaching, dental spa, etc.',
    images: [{ url: '/assets/images/treatment/treatment-banner.webp' }],
    path: '/treatment',
  });
}

export default async function Treatment() {

  const list: { image: string; description: string }[] = [
    {
      image: "/assets/images/treatment/treatment-image-10.webp",
      description: "Smile Makeover using natural-looking fixed dentures",
    },
    {
      image: "/assets/images/treatment/treatment-image-11.webp",
      description: "Natural-looking veneers for the upper front teeth",
    },
    {
      image: "/assets/images/treatment/treatment-image-12.webp",
      description: "A Comprehensive Smile Makeover after braces and veneers",
    },
  ]

  return (
    <PageWrapper className="min-h-screen bg-custom-primary">
      <section className="relative w-full overflow-hidden">
        <Image
          src="/assets/images/treatment/treatment-banner.webp"
          alt="Banner Treatment"
          width={1920}
          height={1080}
          className="z-10 w-full h-full object-cover"
        />

        <div className='bg-custom-black md:bg-transparent md:absolute bottom-0 w-full h-full flex justify-center items-end'>
          <div className="w-full md:max-w-5xl xl:max-w-6xl z-20 md:mb-[12vh]">
            <div className="p-7 md:p-0 flex flex-col h-full text-white">
              <h1 className="text-4xl text-[40px] mb-2 md:text-6xl md:leading-[76px] font-eb-garamond font-bold">Our Signature Treatments</h1>
              <p>Smile care at ONYX is more than a treatment — it’s a design experience, led by experts who see your best version and uniqueness.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center">
        <div className="w-full md:max-w-5xl xl:max-w-6xl p-7 md:px-0 md:py-16 ">
          <div className="flex flex-wrap flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-12">
            {treatments.map((item, index) => (<div className="relative bg-white md:w-[31%] drop-shadow-md" key={index}>
              <Image
                src={`/assets/images/treatment/treatment-image-${index + 1}.webp`}
                alt={`treatment-${item.slug}`}
                width={500}
                height={500}
                className="w-full"
              />
              <div className="min-h-[170px] flex flex-col justify-between gap-3 p-4">
                <h5 className="leading-[150%] text-lg font-bold text-[#1A1A2E]">{item.title}</h5>
                <p className="text-sm leading-[20px] text-[#8C8CA2] mb-2">{item.excrept}</p>
                <Link className="text-sm text-[#4D4D5C] flex gap-2 items-center" href={`/treatment/${item.slug}`}>
                  Learn More <Icons name="arrow-long-right" className="w-4 h-4 text-custom-text-color" />
                </Link>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden w-full md:flex justify-center">
        <div className="w-full flex flex-col md:max-w-5xl xl:max-w-6xl">
          <h2 className="font-eb-garamond font-semibold text-custom-text-color text-2xl md:text-4xl mb-6 md:mb-12">The Smile Transformations</h2>
          <div className="flex flex-wrap flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-12">
            {list.map((item, index) => (
              <div className="md:w-[31%]" key={index}>
                <Image
                  src={item.image}
                  alt={item.description}
                  width={500}
                  height={500}
                  className="w-full"
                />
                <p className="mt-2 text-custom-text-color-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta
        title="Curated Dental Center, crafted just for you"
        description={`
          Precision-driven and tailored to your pace, our aesthetic and restorative
          solutions fit seamlessly into your lifestyle.
        `}
        image="treatment/treatment-cta"
        classNameDescription="xl:max-w-[90%]"
        // classNameImage="mt-6"
        buttonLabel="Book Your Session Now"
      />
    </PageWrapper>
  );
}
