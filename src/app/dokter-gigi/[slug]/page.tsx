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
            title: 'Dokter Gigi Karawaci - Onyx Dental Center',
            description: 'Temui dokter gigi profesional dan terbaik di Karawaci, Tangerang, untuk perawatan estetik, veneer, implant, orthodontic, dan smile makeover di Onyx Dental Center.',
            images: [{ url: '/assets/images/doctor/doctor-banner.webp' }],
            path: '/dokter-gigi',
            language: 'id-id',
        });
    }

    const index = doctors.findIndex((d) => d.slug === slug);

    return metaData({
        title: `${doctor.name} - Dokter Gigi Karawaci | Onyx Dental Center`,
        description: `Profil ${doctor.name}, dokter gigi di Karawaci dengan pengalaman ${doctor.year_experience} tahun dalam ${doctor.speciality}. Buat janji di Onyx Dental Center, dokter gigi terdekat untuk area Tangerang dan Karawaci.`,
        images: [{ url: `/assets/images/doctor/doctor-detail-${index + 1}.webp` }],
        path: `/dokter-gigi/${slug}`,
        language: 'id-id',
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
                    "jobTitle": "Dokter Gigi",
                    "description": doctor?.description ?? '',
                    "worksFor": { "@id": "https://onyxdentalcenter.id/#business" },
                    "url": `https://onyxdentalcenter.id/dokter-gigi/${slug}`,
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
                    <h2 className="leading-[130%] text-3xl font-eb-garamond font-semibold mb-4" >Profil</h2>

                    <div>
                        <div className='mb-4'>
                            <p className="text-custom-text-color-3">Pengalaman</p>
                            <p className="font-bold">{doctor?.year_experience} Tahun</p>
                        </div>

                        <div className='mb-4'>
                            <p className="text-custom-text-color-3">Spesialisasi</p>
                            <p className="font-bold">{doctor?.speciality}</p>
                        </div>

                        <div className='mb-4'>
                            <p className="text-custom-text-color-3">Pendidikan</p>
                            {doctor?.education.map((e) => (
                                <p className="font-bold" key={e}>{e}</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-4">{doctor?.description}</p>

                        <Button className="w-full md:w-auto flex text-black font-helvetica font-semibold cursor-pointer bg-custom-brown rounded-none py-5 mb-4 md:mb-0 md:mr-4 hover:bg-custom-brown/70">
                            <Link href={settings?.data?.link_whatsapp || ''} target="_blank">
                                Buat Janji Sekarang
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-7 md:p-0">
                <h2 className="text-4xl font-eb-garamond font-semibold leading-[47px] mb-4">Jadwal Praktik</h2>
                <hr className="w-full border-custom-text-color mb-10" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-7 mb-7 md:mb-14">
                    {[
                        ["Monday", "Senin"],
                        ["Tuesday", "Selasa"],
                        ["Wednesday", "Rabu"],
                        ["Thursday", "Kamis"],
                        ["Friday", "Jumat"],
                        ["Saturday", "Sabtu"],
                        ["Sunday", "Minggu"],
                    ].map(([day, label]) => (
                        <div className="flex" key={day}>
                            <div className="bg-custom-green-accent w-1 mr-2" />
                            <div className="flex flex-col">
                                <p className='font-bold'>{label}</p>
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
                    <AccordionTrigger icon="chevron" iconClassName="size-8" className='text-2xl md:text-4xl font-eb-garamond font-semibold leading-[130%] md:leading-[47px] items-center border-none'>Pendidikan Berkelanjutan & Kegiatan Pembicara</AccordionTrigger>
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
