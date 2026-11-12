// app/blogs/[slug]/page.tsx
import { notFound } from 'next/navigation';
// import { findBlogBySlug, findAllPublishedBlogSlugs } from '@/lib/models';
import { metaData } from '@/lib/utils/metadata';
import { Metadata } from 'next';
import Image from 'next/image';
// import { cache } from "react";
import BlogPostingJsonLd from '@/lib/components/JsonLd';
import { format } from 'date-fns';
// import Icons from '@/components/Icon';
// import Link from 'next/link';
import { id } from 'date-fns/locale';
import { PageWrapper } from '@/components';
import { getBlogsBySlug } from '@/lib/api';
import Cta from '@/components/Cta';
import HtmlLang from '@/components/HtmlLang';
import TableOfContents from '@/components/TableOfContents';
import BlogContent from '@/components/BlogContent';

export const revalidate = 60; // ISR regeneration time (60 seconds)
export const dynamicParams = true; // Allow dynamic params

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug
    let blog;
    try {
        blog = await getBlogsBySlug(slug);
    } catch {
        notFound();
    }

    return metaData({
        title: blog.data.title,
        description: blog.data.excerpt,
        images: blog.data.thumbnailUrl ? [{ url: blog.data.thumbnailUrl }] : [],
        path: `/blogs/${blog.data.slug}`,
    });
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
    // Ensure params is properly destructured and not treated as a Promise
    const { slug } = await params;

    let blog;
    try {
        blog = await getBlogsBySlug(slug);
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'NOT_FOUND') {
            return notFound();
        }
        throw error; // Re-throw other errors
    }

    // console.log('BLOG: ', blog);
    const language = blog.data.language ?? 'id-id';
    const author = blog.data.author.name ?? 'Onyx Editorial Team';

    return (
        <>
            <HtmlLang lang={language === 'id-id' ? 'id' : 'en'} />
            <BlogPostingJsonLd post={blog.data} />
            <PageWrapper className='bg-custom-primary'>
                <section className="w-full flex justify-center px-4 py-8 md:py-20">
                    <div className='w-full md:max-w-3xl xl:max-w-4xl'>
                        {/* <div className='flex justify-between items-center mb-10'>
                            <Link href={`/blogs`} className='text-body-2 flex items-center gap-2 underline'> <Icons name='arrow-back' className='w-6 h-6 text-black' /> Kembali ke Blog</Link>
                        </div> */}

                        <h1 className='mb-1 leading-[150%] text-5xl font-eb-garamond text-custom-text-color font-semibold'>{blog.data.title}</h1>
                        <span className='text-custom-text-color'>{format(blog.data.published_at ?? '', 'dd MMMM yyyy', { locale: id })}</span>
                        <span > | {language == 'id-id' ? 'Ditulis oleh ' : 'Written by '}{author}</span>

                        <Image
                            src={blog.data.thumbnailUrl ?? ''}
                            alt={blog.data.title ?? ''}
                            width={800}
                            height={600}
                            className='mt-8 rounded-lg w-full h-auto max-h-[70vh] object-contain'
                            priority
                        />

                        <TableOfContents htmlContent={blog.data.content} language={language} />

                        <BlogContent content={blog.data.content} />
                    </div>
                </section>
                {Boolean(blog.data?.cta) && <Cta
                    title={blog.data.cta.title ?? ''}
                    description={blog.data.cta.description ?? ''}
                    image={blog.data.cta.imgBanner || '/assets/images/proven-result/proven-result-cta-desktop.webp'}
                    buttonLabel={blog.data.cta.textButton ?? (language === 'id-id' ? 'Booking Sekarang' : 'Booking Now!')}
                    url={blog.data.cta.url}
                    isDynamic={true}
                // classNameImage="object-[50%_80%] md:object-[50%_40%]"
                />}
            </PageWrapper>
        </>
    );
}
