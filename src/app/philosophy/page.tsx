import { PageWrapper } from "@/components";
import Cta from "@/components/Cta";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { metaData } from "@/lib/utils/metadata";
import HeroPhilosophy from "@/sections/philosophi/hero";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: '360 Smile Philosophy - Onyx Dental Center',
    description: 'Personalized smile consultations co-diagnosed by our founders using latest digital technology. Carefully designed, expertly delivered',
    images: [{ url: '/assets/images/philosophy/philosophi-image-5.webp' }],
    path: '/philosophy',
  });
}

export default async function Philosophy() {

  const section1 = [
    {
      title: 'Truly Personalized Experience',
      description: 'Every smile is unique — our session is tailored based on your facial structure, lifestyle, and long-term goals to ensure the result feels truly yours.',
    },
    {
      title: 'Co-Diagnosed by Onyx Founders',
      description: 'Your treatment is guided directly by our founders with a refined aesthetic sense to ensure precision and elevated outcomes.',
    },
    {
      title: 'Seamless Digital Dentistry',
      description: 'From digital scanning to smile simulation, our technology ensures comfort, accuracy, and full visual clarity before any treatment begins.',
    }
  ]

  const mainSection = [
    {
      title: "Photo session",
      description: "We begin with a personalized photo session to capture your current smile from every angle — not just for documentation, but to analyze facial features, harmony, proportions, and symmetry.",
    },
    {
      title: "Goal Setting",
      description: "In this session, we discuss your smile aspirations, whether it’s subtle enhancement or a full transformation. Together, we define the aesthetic direction that suits your personality and lifestyle.",
    },
    {
      title: "Co-Diagnosed by Founders",
      description: "Your case is reviewed directly by the founders of Onyx, combining clinical expertise with aesthetic vision to curate the most precise and personalized treatment plan.",
    },
    {
      title: "The Treatment",
      description: "Once everything is aligned, we begin your journey with the treatment itself,  handled with precision, comfort, and artistry using the latest techniques in digital dentistry.",
    },
  ]

  return (
    <PageWrapper className="min-h-screen bg-custom-primary">
      <HeroPhilosophy />

      <section className="w-full bg-custom-white-accent flex justify-center">
        <div className="w-full md:max-w-5xl xl:max-w-6xl px-7 py-14 md:px-0 md:py-16 ">
          <div className="flex flex-wrap flex-col md:flex-row items-start justify-between gap-10 md:gap-8 mb-6 md:mb-0">
            {section1.map((item, index) => (
              <div className="flex flex-col justify-center items-center md:w-[31%]" key={index}>
                <Image
                  src={`/assets/images/philosophy/icon-${index + 1}.svg`}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-[80px] mb-6"
                />
                <div className="flex flex-col items-center gap-3">
                  <h5 className="leading-[110%] text-xl font-semibold font-eb-garamond text-custom-text-color text-center">{item.title}</h5>
                  <p className="leading-[130%] text-center text-custom-text-color-2 mb-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="md:px-7 pt-7 md:py-20 space-y-12 md:space-y-24">
        {mainSection.map((item, index) => (
          <div key={index} className="w-full flex flex-col gap-y-4 md:gap-y-0 md:flex-row justify-between text-custom-text-color">
            <div className="px-7 md:px-0 md:w-[22%] xl:w-[24%]">
              <span className="leading-[130%]">Step {index + 1}:</span>
              <h2 className="leading-[130%] text-2xl md:leading-[47px] md:text-4xl font-eb-garamond font-semibold mb-4">{item.title}</h2>

              <p className="leading-[150%] md:leading-[130%]">{item.description}</p>
            </div>
            <div className={cn("", index % 2 === 0 ? "md:w-[50%] xl:w-[48%]" : "md:w-[25%] xl:w-[24%]")}>
              <Image
                src={`/assets/images/philosophy/philosophi-image-${index * 2 + 1}.webp`}
                alt={item.title}
                width={500}
                height={500}
                className="w-full md:h-[454px] object-cover"
              />
            </div>
            <div className={cn("", index % 2 === 0 ? "md:w-[25%] xl:w-[24%]" : "md:w-[50%] xl:w-[48%]")}>
              <Image
                src={`/assets/images/philosophy/philosophi-image-${index * 2 + 2}.webp`}
                alt={item.title}
                width={500}
                height={500}
                className="w-full md:h-[454px] object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      <Cta
        title="Carefully designed, expertly delivered"
        description={`
          Where expertise meets attention and every detail of your smile is crafted with
          care by the hands you can trust. Choose your expert and take the first step
          today.
        `}
        image="philosophy/philosophy-cta"
        classNameTitle="text-2xl"
        classNameDescription="pr-[4%] md:pr-0"
        buttonLabel="Book Your Session Now"
      />
    </PageWrapper>
  );
}
