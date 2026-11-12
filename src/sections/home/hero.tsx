// app/components/HeroVideoResponsive.jsx
'use client';
// import { SlideIn } from '@/components';
import Icons from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useBoolean } from '@/hooks';
import Link from 'next/link';
import React from 'react';

export default function HeroVideoResponsive({ settings }: { settings: Setting }) {

    const { value, setValue, setTrue } = useBoolean()

    return (
        <>
            <section className="relative w-full h-screen overflow-hidden">
                {/* Desktop video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster=""
                    className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/assets/videos/hero-video-desktop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Mobile video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster=""
                    className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/assets/videos/hero-video-mobile.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black/30"></div> {/* overlay */}
                <div className="absolute w-full h-[50vh] bottom-0 bg-gradient-to-t from-custom-overlay/70 to-custom-overlay/0"></div> {/* overlay */}

                <div className='w-full h-full flex justify-center items-end'>
                    <div className="w-full md:max-w-5xl xl:max-w-6xl relative z-10 mb-[20vh]">
                        <div className="px-7 md:px-0 md:max-w-[55%] flex flex-col items-center justify-center h-full text-white">
                            <h1 className="text-4xl text-[40px] mb-8 md:text-6xl font-eb-garamond font-bold"><span className="block mb-3 font-helvetica text-base md:text-lg font-semibold uppercase tracking-wide not-italic">Dental Clinic in Karawaci, Tangerang</span>Crafting The <br className='md:hidden' /> Best Version of <span className=' font-eb-garamond italic font-light'>Your Smile</span></h1>

                            <div className='hidden md:grid w-full grid-cols-3 justify-between mb-10'>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <Icons name='verified' className='w-6 h-6 text-white' />
                                        <p className='text-2xl font-semibold'>4000+</p>
                                    </div>
                                    Satisfied patiens
                                </div>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <Icons name='verified' className='w-6 h-6 text-white' />
                                        <p className='text-2xl font-semibold'>1800+</p>
                                    </div>
                                    Veneers Made
                                </div>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <Icons name='verified' className='w-6 h-6 text-white' />
                                        <p className='text-2xl font-semibold'>500+</p>
                                    </div>
                                    Orthodontic treatments
                                </div>
                            </div>

                            <div className='w-full flex flex-col md:flex-row'>
                                <Button className="flex text-black font-helvetica font-semibold cursor-pointer bg-custom-brown rounded-none py-5 mb-4 md:mb-0 md:mr-4 hover:bg-custom-brown/70">
                                    <Link href={settings?.link_whatsapp || ''} target="_blank">
                                        {/* <Icons name="whatsapp" className="h-6 w-6 text-heading-2" /> */}
                                        Book Your Session Now
                                    </Link>
                                </Button>
                                <Button onClick={setTrue} className="flex text-black font-helvetica font-semibold cursor-pointer bg-white rounded-none py-5 hover:bg-white/70">
                                    <Icons name="play" className="h-8 w-8" />
                                    Watch Video
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='grid md:hidden w-full grid-rows-3 p-7 gap-8 justify-between bg-custom-black text-white'>
                <div className='flex flex-col items-start justify-start'>
                    <div className='flex items-center gap-2'>
                        <Icons name='verified' className='w-6 h-6 text-white' />
                        <p className='text-2xl font-semibold'>4000+</p>
                    </div>
                    Satisfied patiens
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <Icons name='verified' className='w-6 h-6 text-white' />
                        <p className='text-2xl font-semibold'>1800+</p>
                    </div>
                    Veneers Made
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <Icons name='verified' className='w-6 h-6 text-white' />
                        <p className='text-2xl font-semibold'>500+</p>
                    </div>
                    Orthodontic treatments
                </div>
            </div>
            <Dialog open={value} onOpenChange={setValue}>
                <DialogTitle></DialogTitle>
                <DialogContent className="mt-[2.5%] h-[80vh] md:max-w-5xl xl:max-w-6xl p-0 overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/FIRlKny3n2M?si=MpuWkjigNZxSJOPC&autoplay=1"
                        title="YouTube video player"
                        // frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    >
                    </iframe>
                </DialogContent>
            </Dialog>
        </>
    );
}

