// components/TestimonialCarousel.tsx
'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
// import { cn } from '@/lib/utils'
import Image from 'next/image'
import Icons from './Icon'

const testimonials = [
    {
        title: 'The Onyx Treatment Room',
        description: 'Equipped with high technology facilities and always prioritizing your comfort',
        image: '/assets/images/home-section4-1.webp',
    },
    {
        title: 'The Smile Studio',
        description: 'A dedicated studio space to support your personalized smile design',
        image: '/assets/images/home-section4-2.webp',
    },
    {
        title: 'Reception Atelier',
        description: 'A warm, elegant welcome with seamless concierge-style service',
        image: '/assets/images/home-section4-3.webp',
    },
    {
        title: 'Refreshments Bar',
        description: 'Enjoy curated refreshments and a moment of calm before or after treatment',
        image: '/assets/images/home-section4-4.webp',
    },
    {
        title: 'Aesthetic Lounge',
        description: 'A tranquil space designed for effortless comfort and refined taste',
        image: '/assets/images/home-section4-5.webp',
    },
    {
        title: 'Powder Room',
        description: 'Immaculately maintained, serene, and styled for your complete comfort',
        image: '/assets/images/home-section4-6.webp',
    },
    {
        title: 'Kids Corner',
        description: 'A cozy, playful space designed to keep little guests happy and at ease',
        image: '/assets/images/home-section4-7.webp',
    },
    {
        title: 'Advanced Technology',
        description: 'From microscope to digital scanning, every step is guided by innovation for predictable results',
        image: '/assets/images/home-section4-8.webp',
    }
]

export default function CustomCarousel() {
    const autoplay = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
    )

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [autoplay.current]
    )

    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', onSelect)
        onSelect()
    }, [emblaApi, onSelect])

    console.log({ emblaApi });


    return (
        <div>
            <div className="relative w-full">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className='flex'>
                        {testimonials.map((item, index) => (
                            <div className='flex-[0_0_100%] h-[70vh] md:h-[825px] relative' key={index}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={1000}
                                    height={1000}
                                    sizes="100vw"
                                    className='z-10 w-full h-[50vh] md:h-[825px] object-cover md:object-none'
                                />
                                {/* overlay */}
                                <div className='hidden md:block absolute w-full h-[75vh] bottom-0 z-20 bg-gradient-to-b from-[rgba(14,14,14,0)] to-[#000000]' />
                                {/* text content */}
                                <div className='w-full absolute bottom-0 left-0 z-30 hidden md:flex justify-center'>
                                    <div className='w-full md:max-w-5xl xl:max-w-6xl py-20 flex flex-col justify-end items-end text-white'>
                                        {/* <div className='absolute bottom-8 left-8 z-20 text-white'> */}
                                        <h2 className="leading-[130%] text-4xl font-semibold font-eb-garamond">{item.title}</h2>
                                        <p className="leading-[150%]">{item.description}</p>
                                    </div>
                                </div>
                                <div className='w-full absolute z-30 flex justify-center md:hidden'>
                                    <div className='w-full h-fit md:max-w-5xl xl:max-w-6xl p-7 text-white'>
                                        <h2 className="leading-[130%] text-2xl md:text-4xl font-semibold font-eb-garamond">{item.title}</h2>
                                        <p className="leading-[150%]">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows */}
                <div className='w-full h-[50vh] md:h-auto  flex justify-center absolute z-30 inset-0'>
                    <div className='w-full px-7 md:px-0 md:max-w-5xl xl:max-w-6xl flex justify-between items-center'>
                        <button
                            onClick={scrollPrev}
                            className={'cursor-pointer'}
                        >
                            <Icons name="arrow-circle-left" className='w-12 h-12 text-white' />
                        </button>
                        <button
                            onClick={scrollNext}
                            className={'cursor-pointer'}
                        >
                            <Icons name="arrow-circle-right" className='w-12 h-12 text-white' />
                        </button>
                    </div>
                </div>

            </div>

            <div className="hidden w-full md:flex justify-center md:mt-12">
                <div className='w-full md:max-w-5xl xl:max-w-6xl flex flex-wrap justify-between gap-6'>
                    {testimonials.map((_, idx) => (
                        <Image
                            key={idx}
                            className={`w-[23%] ${idx === selectedIndex ? 'border-2 border-black' : ''}`}
                            onClick={() => emblaApi?.scrollTo(idx)}
                            src={_.image}
                            width={288}
                            height={165}
                            sizes="(min-width:768px) 23vw, 0px"
                            alt={_.title}
                        />

                    ))}
                </div>
            </div>
        </div >
    )
}
