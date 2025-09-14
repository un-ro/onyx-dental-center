import { PageWrapper } from "@/components";
import Cta from "@/components/Cta";
import Icons from "@/components/Icon";
import { treatments } from "@/lib/data/treatment";
import { metaData } from "@/lib/utils/metadata";
import { Metadata } from "next";
import Image from "next/image";

export function generateStaticParams() {
    return treatments.map((treatment) => ({
        slug: treatment.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const treatment = treatments.find((treatment) => treatment.slug === slug);

    if (!treatment) {
        return metaData({
            title: 'Treatments - Onyx Dental Center',
            description: 'Specialized in aesthetic dentistry, we service smile makeovers, veneers, orthodontics, dental crowns, bleaching, dental spa, etc.',
            images: [{ url: '/assets/images/treatment/treatment-banner.webp' }],
            path: '/treatment',
        });
    }

    const index = treatments.findIndex((treatment) => treatment.slug === slug);

    return metaData({
        title: `${treatment.title} Treatment | Onyx Dental Center`,
        description: `Premium Aesthetic Dental Treatment ${treatment.title} near Jakarta, Bogor, Depok, Tangerang, and Bekasi.`,
        images: [{ url: `/assets/images/treatment/treatment-image-${index + 1}.webp` }],
        path: `/treatment/${slug}`,
    });
}

export default async function DetailDoctor({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const treatment = treatments.find((d) => d.slug === slug);
    const index = treatments.findIndex((d) => d.slug === slug);
    return (<PageWrapper className="min-h-screen bg-custom-primary">
        <section className="relative w-full overflow-hidden flex flex-col-reverse md:flex-row mb-10 md:mb-20">
            <div className='bg-custom-white-accent md:absolute z-10 left-0 w-full h-full flex justify-center items-center'>
                <div className="w-full md:max-w-5xl xl:max-w-6xl z-20">
                    <div className="p-7 md:p-0 md:max-w-[37.5%] flex flex-col h-full text-custom-text-color">
                        <h1 className="text-3xl text-[32px] mb-2 md:text-6xl md:leading-[76px] font-eb-garamond font-semibold">{treatment?.title}</h1>
                        <p className="leading-[150%] md:leading-[24px] mb-10">{treatment?.subheading}</p>

                        <div className="flex flex-col gap-2">
                            {treatment?.description && (
                                <>
                                    <div className="flex gap-2 text-custom-text-color">
                                        <div className="w-6">
                                            <Icons name={'verified'} className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h5 className="font-bold">{treatment?.description[0].heading}</h5>
                                            <p>{treatment?.description[0].list}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-custom-text-color">
                                        <div className="w-6">
                                            <Icons name={'star-badge'} className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h5 className="font-bold">{treatment?.description[1].heading}</h5>
                                            <p>{treatment?.description[1].list}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 text-custom-text-color">
                                        <div className="w-6">
                                            <Icons name={'clock4'} className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h5 className="font-bold">{treatment?.description[2].heading}</h5>
                                            <p>{treatment?.description[2].list}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2" />
            <div className="md:w-1/2 z-30">
                <Image
                    src={`/assets/images/treatment/treatment-detail-${index + 1}.webp`}
                    alt="Banner Proven Result"
                    width={1920}
                    height={1080}
                    className="z-30 w-full h-[636px] object-cover"
                />
            </div>
        </section>

        {treatment?.result?.length ? <section className="p-7 md:p-0 w-full flex justify-center">
            <div className="w-full flex flex-col md:max-w-5xl xl:max-w-6xl">
                <h1 className="font-eb-garamond font-semibold text-custom-text-color text-2xl md:text-4xl mb-6 md:mb-12">The Results</h1>
                <div className="flex flex-wrap flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-12">
                    {treatment?.result && treatment?.result.map((item, index) => (
                        <div className="md:w-[31%]" key={index}>
                            <Image
                                src={`/assets/images/treatment/result/${slug}-${index + 1}.webp`}
                                alt="section1"
                                width={500}
                                height={500}
                                className="w-full"
                            />
                            <p className="mt-2 text-custom-text-color-2">{item.description}</p>
                        </div>
                    ))}

                    {treatment?.result && treatment?.result.length === 2 && (
                        <div className="md:w-[31%]"></div>
                    )}
                </div>
            </div>
        </section> : null}

        <Cta
            title={treatment?.cta.title}
            description={`${treatment?.cta.subheading}`}
            image={`/assets/images/treatment/cta-${slug}.webp`}
            // classNameImage="mt-6"
            buttonLabel={treatment?.cta.buttonLabel}
            isDynamic={true}
        />
    </PageWrapper>)
}