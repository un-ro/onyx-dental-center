import { PageWrapper } from "@/components";
import Cta from "@/components/Cta";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { metaData } from "@/lib/utils/metadata";
import { doctors } from "@/lib/data/doctor";
import Link from "next/link";
import Icons from "@/components/Icon";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: 'Dokter Gigi Karawaci - Onyx Dental Center',
    description: 'Temui dokter gigi profesional dan terbaik di Karawaci, Tangerang, untuk perawatan estetik, veneer, implant, orthodontic, dan smile makeover di Onyx Dental Center.',
    images: [{ url: '/assets/images/doctor/doctor-banner.webp' }],
    path: '/dokter-gigi',
    language: 'id-id',
  });
}

export default async function OurTeam() {

  return (
    <PageWrapper className="min-h-screen">
      <section className="relative w-full overflow-hidden">
        <Image
          src="/assets/images/doctor/doctor-banner.webp"
          alt="Banner Dokter"
          width={1920}
          height={1080}
          loading="eager"
          className="z-10 w-full h-full object-cover"
        />

        <div className='bg-custom-black md:bg-transparent md:absolute bottom-0 w-full h-full flex justify-center items-end'>
          <div className="w-full md:max-w-5xl xl:max-w-6xl z-20 md:mb-[12vh]">
            <div className="p-7 md:p-0 md:max-w-[55%] flex flex-col h-full text-white">
              <h1 className="text-4xl text-[40px] mb-2 md:text-6xl md:leading-[76px] font-eb-garamond font-bold">Dokter Gigi Terbaik di Karawaci</h1>
              <p>Temui tim dokter gigi Onyx Dental Center yang berpengalaman merancang senyum sehat, natural, dan percaya diri.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center">
        <div className="w-full md:max-w-5xl xl:max-w-6xl p-7 md:px-0 md:pt-20 ">
          <div className="flex flex-wrap flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-12">
            {doctors.map((item, index) => (
              (index <= 2) && <div className="bg-white md:w-[31%] drop-shadow-md" key={index}>
                <Image
                  src={`/assets/images/doctor/doctor-person-${index + 1}.webp`}
                  alt={`doctor-${item.slug}`}
                  width={500}
                  height={500}
                  className="w-full"
                />
                <div className="flex flex-col gap-3 p-4">
                  <h5 className="leading-[150%] text-lg font-bold text-custom-text-color">{item.name}</h5>
                  <p className="text-custom-text-color-2 mb-2">{item.excrept}</p>
                  <Link className="text-sm text-custom-text-color leading-[130%] font-semibold flex gap-2 items-center" href={`/dokter-gigi/${item.slug}`}>
                    Lihat profil & jadwal <Icons name="arrow-long-right" className="w-4 h-4 text-custom-text-color" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 mb-6 md:mb-12">
            {doctors.map((item, index) => (
              (index > 2) && <div className="bg-white drop-shadow-md" key={item.slug}>
                <Image
                  src={`/assets/images/doctor/doctor-person-${index + 1}.webp`}
                  alt={`doctor-${item.slug}`}
                  width={500}
                  height={500}
                  className="w-full"
                />
                <div className="flex flex-col gap-3 p-4">
                  <h5 className="leading-[150%] text-lg font-bold text-custom-text-color">{item.name}</h5>
                  <p className="text-custom-text-color-2 mb-2">{item.excrept}</p>
                  <Link className="text-sm text-custom-text-color leading-[130%] font-semibold flex gap-2 items-center" href={`/dokter-gigi/${item.slug}`}>
                    Lihat profil & jadwal <Icons name="arrow-long-right" className="w-4 h-4 text-custom-text-color" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta
        title="Perawatan Personal oleh Dokter Gigi Tepercaya"
        description={`
          Cari dokter gigi Karawaci yang tepat untuk kebutuhan senyum Anda.
          Pilih dokter Onyx Dental Center dan buat janji konsultasi hari ini.
        `}
        image="doctor/doctor-cta"
        classNameImage="mt-6"
        classNameDescription="pr-[10%] md:pr-0"
        buttonLabel="Buat Janji Sekarang"
      />
    </PageWrapper>
  );
}
