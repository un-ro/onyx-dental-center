// app/blogs/page.tsx
import Link from 'next/link';
// import { findPublishedBlogs } from '@/lib/models';
import Image from 'next/image';
import { format } from 'date-fns'
import { id } from 'date-fns/locale';
import Icons from '@/components/Icon';
import { PageWrapper } from '@/components';
import { Metadata } from 'next';
import { getBlogs } from '@/lib/api';
import { notFound } from 'next/navigation';
import { metaData } from '@/lib/utils/metadata';
import Cta from '@/components/Cta';

export const revalidate = 60; // ISR: update list every 60s

export async function generateMetadata(): Promise<Metadata> {
    return metaData({
        title: 'Expert Dental Insights & Tips - Onyx Dental Blog',
        description: "Discover the latest in dental care, innovative treatments, and oral health tips from our expert dentists. Stay informed, stay healthy.",
        images: [{ url: '/assets/images/home-section4-3.webp' }],
        path: '/blogs/en',
    });
};

export default async function BlogListPage() {
    const _blogs = await getBlogs("en-id");

    if (!_blogs) return notFound();

    const blogs = _blogs.data;

    return (
        <PageWrapper className=" bg-custom-primary">
            <section className='min-h-screen flex justify-center px-4 py-8 md:py-20'>
                <div className='w-full md:max-w-5xl xl:max-w-6xl'>
                    <div className='mb-24'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10'>
                            <div>
                                <h1 className="leading-[130%] text-3xl md:text-5xl font-eb-garamond font-bold text-heading-1">Onyx Dental Blog</h1>
                                <p className="text-gray-600 mt-2">Expert insights on dental care and innovations.</p>
                            </div>

                            {/* Language Switcher */}
                            <div className='flex gap-2 mt-4 md:mt-0'>
                                <Link
                                    href="/blogs/id"
                                    className='px-4 py-2 rounded-lg font-medium transition-colors bg-white text-custom-text-color border border-gray-300 hover:bg-gray-50'
                                >
                                    Bahasa Indonesia
                                </Link>
                                <Link
                                    href="/blogs/en"
                                    className='px-4 py-2 rounded-lg font-medium transition-colors bg-white text-custom-text-color border border-gray-300 hover:bg-gray-50'
                                >
                                    English
                                </Link>
                            </div>
                        </div>

                        <div className='w-full flex flex-col md:flex-row flex-wrap items-stretch gap-5 md:gap-7 xl:gap-10'>
                            {blogs.map((e) => (
                                <Link key={e.id} href={`/blogs/${e.slug}`} className='w-full md:w-[31%] flex flex-col gap-4 bg-white drop-shadow-md'>
                                    <Image
                                        src={e.thumbnailUrl}
                                        alt={e.title}
                                        width={200}
                                        height={200}
                                        className='w-full h-[250px] object-cover'
                                    />
                                    <div className='w-full h-full flex flex-col justify-between p-4'>
                                        <div>
                                            <h2 className='leading-[130%] text-2xl font-semibold text-custom-text-color mb-2'>{e.title}</h2>
                                            <p className='leading-[150%] text-[#7C7C7C]'>{e.excerpt}</p>
                                        </div>

                                        <div className='flex justify-between items-center mt-8'>
                                            <span className='leading-[150%] text-[#7C7C7C]'>{format(e.published_at ?? '', 'dd MMMM yyyy', { locale: id })}</span>
                                            <p className='leading-[150%] text-custom-text-color font-semibold flex items-center gap-2'>Read More <Icons name='arrow-forward' className='w-6 h-6 text-black'></Icons></p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Cta
                title="Begin your smile transformation"
                description={`
                    Your smile is your signature. Let us refine it with care, precision, and an eye
                    for elegance.
                `}
                image="proven-result/proven-result-cta"
                classNameTitle="text-2xl"
                buttonLabel="Book Your Session Now"
            />
        </PageWrapper>
    );
}
