import { PageWrapper } from "@/components";
import Icons from "@/components/Icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/lib/api";
import { doctors } from "@/lib/data/doctor";
import { metaData } from "@/lib/utils/metadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const doctor = doctors.find((doc) => doc.slug === slug);

    if (!doctor) {
        return metaData({
            title: 'Our Team - Onyx Dental Center',
            description: 'Professional Aesthetic dentists near you. Nearby dentists in Jakarta, Tangerang, Bekasi, BSD, Alam Sutera, Serpong, Bintaro, and Puri Indah.',
            images: [{ url: '/assets/images/doctor/doctor-banner.webp' }],
            path: '/ourteam',
        });
    }

    const index = doctors.findIndex((d) => d.slug === slug);
  
    return metaData({
        title: `${doctor.name} | Onyx Dental Center`,
        description: `Meet ${doctor.name}, experienced ${doctor.speciality.toLowerCase()} with ${doctor.year_experience} years of experience. Expert in ${doctor.speciality}. Book your appointment at Onyx Dental Center - serving Jakarta, Tangerang, and Karawaci areas.`,
        images: [{ url: `/assets/images/doctor/doctor-detail-${index + 1}.webp` }],
        path: `/ourteam/${slug}`,
    });
}

export default async function DetailDoctor({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const settings = await getSettings();

    const doctor = doctors.find((d) => d.slug === slug);
    const index = doctors.findIndex((d) => d.slug === slug);
    return (<PageWrapper className="w-full min-h-screen flex justify-center bg-custom-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": doctor?.name ?? '',
              "jobTitle": "Dentist",
              "description": doctor?.description ?? '',
              "worksFor": { "@id": "https://onyxdentalcenter.id/#business" },
              "url": `https://onyxdentalcenter.id/ourteam/${slug}`,
              "image": `https://onyxdentalcenter.id/assets/images/doctor/doctor-detail-${index + 1}.webp`,
              "knowsAbout": doctor?.speciality ? [doctor.speciality] : [],
              "alumniOf": doctor?.education?.map((edu: string) => ({
                "@type": "EducationalOrganization",
                "name": edu
              })) ?? [],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "name": "drg. (Dokter Gigi)"
              }
            })
          }}
        />
        <section className="w-full md:py-20 md:max-w-5xl xl:max-w-6xl text-custom-text-color">
            <h1 className="p-7 md:p-0 text-5xl font-eb-garamond font-semibold leading-[150%] mb-4">{doctor?.name}</h1>
            <div className='p-7 md:p-0 flex flex-col md:flex-row gap-3 md:gap-7 mb-7 md:mb-14'>
                {doctor?.statistic && doctor?.statistic.map((s) => (
                    <div key={s.title} className='flex items-center gap-2'>
                        <Icons name='verified' className='w-6 h-6 ' />
                        <p className='font-bold'>{s.value}</p>
                        <p className=''>{s.title}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mb-14">
                <Image
                    src={`/assets/images/doctor/doctor-detail-${index + 1}.webp`}
                    alt={`doctor-${slug}`}
                    width={500}
                    height={500}
                    className="w-full"
                />
                <div className="flex flex-col justify-between bg-custom-white-accent p-10">
                    <h2 className="leading-[130%] text-3xl font-eb-garamond font-semibold mb-4" >Profile</h2>

                    <div>
                        <div className='mb-4'>
                            <p className="text-custom-text-color-3">Year of experience</p>
                            <p className="font-bold">{doctor?.year_experience} Years</p>
                        </div>

                        <div className='mb-4'>
                            <p className="text-custom-text-color-3">Speciality</p>
                            <p className="font-bold">{doctor?.speciality}</p>
                        </div>

                        <div className='mb-4'>
                            <p className="text-custom-text-color-3">Education</p>
                            {doctor?.education.map((e) => (
                                <p className="font-bold" key={e}>{e}</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-4">{doctor?.description}</p>

                        <Button className="w-full md:w-auto flex text-black font-helvetica font-semibold cursor-pointer bg-custom-brown rounded-none py-5 mb-4 md:mb-0 md:mr-4 hover:bg-custom-brown/70">
                            <Link href={settings?.data?.link_whatsapp || ''} target="_blank">
                                Make appointment now
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-7 md:p-0">
                <h2 className="text-4xl font-eb-garamond font-semibold leading-[47px] mb-4">Schedule</h2>
                <hr className="w-full border-custom-text-color mb-10" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-7 mb-7 md:mb-14">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div className="flex" key={day}>
                            <div className="bg-custom-green-accent w-1 mr-2" />
                            <div className="flex flex-col">
                                <p className='font-bold'>{day}</p>
                                <div className=''>{doctor?.schedule.find(f => f.day === day)?.time ?? <hr className="mt-4 p-2 md:p-3 w-[10px] border-custom-text-color" />}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Accordion
                type='multiple'
                // collapsible
                className='w-full p-7 md:p-0'
            >
                <AccordionItem className='border-none' value={`item-1`}>
                    <AccordionTrigger icon="chevron" iconClassName="size-8" className='text-2xl md:text-4xl font-eb-garamond font-semibold leading-[130%] md:leading-[47px] items-center border-none'>Continuing Education & Speaking Engagements</AccordionTrigger>
                    <hr className="w-full border-custom-text-color mb-4" />
                    <AccordionContent className='' >
                        {/* <hr className="w-full border-custom-text-color mb-4" /> */}
                        <ul className='list-disc pl-5'>
                            {doctor?.experience.map((e, i) => (
                                <li className='mb-4' key={i}>{e}</li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    </PageWrapper>)
}