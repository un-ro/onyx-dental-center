import Icons from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const list: { image: string; description: string }[] = [
    {
        image: "/assets/images/home-section3-1.webp",
        description: "Natural-looking veneers for the upper front teeth",
    },
    {
        image: "/assets/images/home-section3-2.webp",
        description: "Conventional metal braces for crowded teeth and narrow arch condition",
    },
    {
        image: "/assets/images/home-section3-3.webp",
        description: "A comprehensive smile makeover using bridges and crowns",
    },
    {
        image: "/assets/images/home-section3-4.webp",
        description: "Conventional metal braces for crossbite and open bite condition",
    },
    {
        image: "/assets/images/home-section3-5.webp",
        description: "Natural-looking veneers for the upper front teeth",
    },
    {
        image: "/assets/images/home-section3-6.webp",
        description: "Damon braces for crowded and missing tooth",
    }
]

export default async function Section3() {


    return (
        <section className="flex justify-center p-7 md:py-20">
            <div className="w-full flex flex-col md:max-w-5xl xl:max-w-6xl">
                {/* <h1 className="font-eb-garamond font-semibold text-custom-text-color text-2xl md:text-4xl mb-6 md:mb-12">The Smile Transformations</h1> */}
                <h2 className="font-eb-garamond font-semibold text-custom-text-color text-2xl md:text-4xl mb-6 md:mb-12">Smile Transformations — Veneer, Invisalign & Smile Makeover Jakarta</h2>
                <div className="flex flex-wrap flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-12">
                    {list.map((item, index) => (
                        <div className="md:w-[31%]" key={index}>
                            <Image
                                src={item.image}
                                alt="section1"
                                width={500}
                                height={500}
                                className="w-full"
                            />
                            <p className="mt-2 text-custom-text-color-2">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-center">
                    <Link href={"/proven-result"}>
                        <Button className="w-full md:w-fit flex gap-2 !px-12 md:!px-36 py-6 cursor-pointer bg-transparent rounded-none border border-black items-center justify-center hover:bg-transparent">
                            <span className="text-black font-semibold">See all Transformations</span>
                            <Icons name="arrow-long-right" className="w-6 h-6 text-black" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
