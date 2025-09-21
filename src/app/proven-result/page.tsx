import { PageWrapper } from "@/components";
import Cta from "@/components/Cta";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { metaData } from "@/lib/utils/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: 'Proven Results - Onyx Dental Center',
    description: 'See our proven aesthetic dentistry results. Veneers, smile makeovers & transformative treatments that create stunning smiles.',
    images: [{ url: '/assets/images/proven-result/proven-result-banner.webp' }],
    path: '/proven-result',
  });
}

export default async function ProvenResult() {

  const list = [
    {
      title: "Smile Makeover",
      description: [
        "Flawless Fixed Dentures, Confident Smile",
        "Smile Makeover Saves the Day",
        "From Dull to Dazzling Smile"
      ]
    },
    {
      title: "Veneers",
      description: [
        "From Gaps to Gorgeous Smile",
        "From chipped to complete & confident smile",
        "No more breaks, just beautiful smiles"
      ]
    },
    {
      title: "Orthodontic and Clear Aligner",
      description: [
        "Corrected Bite, Confident Smile",
        "Aligner for Gap-Free Smile",
        "Straighter Teeth, Brighter Confidence"
      ]
    },
    {
      title: "Dental Crown",
      description: [
        "Reveal the New You with Natural Looking Dental Crowns",
        "Dental Crown Strengthen Severely Damaged Teeth",
        "Seamless Strength with Dental Crown"
      ]
    },
    {
      title: "Bleaching",
      description: [
        "A fresher and more radiant smile in one visit",
        "Whiter teeth, instant glow-up",
        "Goodbye stains, hello sparkle"
      ]
    },
    {
      title: "Dental Spa",
      description: [
        "Refresh Your Smile, Reclaim Your Shine",
        "No More Bad Breath",
        "Stained Teeth? Not Anymore!"
      ]
    },
    {
      title: "Aesthetic Direct Restoration",
      description: [
        "Small Touch-Up, Big Impact",
        "Direct Restoration, Instant Smile Fix",
        "Decayed, Repaired, Renewed"
      ]
    },
    {
      title: "Dental Implant",
      description: [
        "From Missing Teeth to Endless Possibilities.",
        "Dental Implants: Comfort That Feels Like Real Teeth."
      ]
    }
  ]

  return (
    <PageWrapper className="min-h-screen bg-custom-primary">
      <section className="relative w-full overflow-hidden flex flex-col-reverse md:flex-row mb-10 md:mb-20">
        <div className='bg-custom-white-accent md:absolute z-10 left-0 w-full h-full flex justify-center items-center'>
          <div className="w-full md:max-w-5xl xl:max-w-6xl z-20">
            <div className="p-7 md:p-0 md:max-w-[30%] flex flex-col h-full text-custom-text-color">
              <h1 className="text-3xl text-[32px] mb-2 md:text-6xl md:leading-[76px] font-eb-garamond font-bold">Our Proven Results</h1>
              <p className="leading-[150%] md:leading-[24px]">Every result is shaped by precision, empathy, and a deep respect for each individuality.</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2" />
        <div className="md:w-1/2 z-30">
          <Image
            src="/assets/images/proven-result/proven-result-banner.webp"
            alt="Banner Proven Result"
            width={1920}
            height={1080}
            className="z-30 w-full h-full object-cover"
          />
        </div>
      </section>

      <div className="w-full flex justify-center p-7">
        <div className="w-full flex flex-col md:max-w-5xl xl:max-w-6xl">
          {list.map((item, itemIndex) => (
            <div key={itemIndex} className="mb-8 md:mb-0">
              <h1 className="font-eb-garamond font-semibold text-custom-text-color text-2xl md:text-4xl mb-6">
                {item.title}
              </h1>
              <div className="flex flex-wrap flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-12">
                {item.description.map((sub, subIndex) => {
                  const globalIndex = list
                    .slice(0, itemIndex)
                    .reduce((acc, curr) => acc + curr.description.length, 0) + subIndex + 1;

                  return (
                    <div className="md:w-[31%]" key={globalIndex}>
                      <Image
                        src={`/assets/images/proven-result/proven-result-${globalIndex}.webp`}
                        alt={`Proven Result ${globalIndex}`}
                        width={500}
                        height={500}
                        className="w-full"
                      />
                      <p className="mt-2 text-custom-text-color-2">{sub}</p>
                    </div>
                  );
                })}

                {item.description.length === 2 && (
                  <div className="md:w-[31%]"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Cta
        title="Let’s design a smile you’ll love"
        description={`Every confident smile you see here began with a single step. Make yours today with ONYX.`}
        image="proven-result/proven-result-cta"
        classNameTitle="text-2xl"
        classNameDescription="xl:max-w-[90%]"
        buttonLabel="Book Your Session Now"
      />
    </PageWrapper>
  );
}
