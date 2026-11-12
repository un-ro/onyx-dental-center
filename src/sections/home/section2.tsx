import Icons from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Section2() {
    return (
        <section className=" bg-custom-black flex justify-center py-0 md:py-0">
            <div className="w-full h-full flex flex-col md:flex-row md:items-center md:justify-between ">
                <div className="relative w-full md:w-1/2 h-full overflow-hidden">
                    <div className="min-w-full md:min-h-screen w-full h-full flex animate-[slideShow_16s_linear_infinite]">
                        {[1, 2, 3, 4].map((i) => (
                            <Image key={i} src={`/assets/images/home-section2-${i}.webp`} alt={`360° Smile Philosophy consultation at Onyx Dental Center, photo ${i}`} width={720} height={694} sizes="(min-width:768px) 50vw, 100vw" className="w-full object-cover" />
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center text-white p-7 md:py-0 md:px-[4.5%]">
                    <h2 className="md:leading-[130%] text-3xl md:text-5xl font-eb-garamond font-semibold mb-6 md:mb-6">
                        Our Unique Approach: <br /> 360° Smile Philosophy Session
                    </h2>
                    <p className="mb-6 md:mb-12" >Every smile has a story. Begin your personalized smile journey, guided exclusively by our three founders.</p>
                    <Link href="/philosophy">
                        <Button className="w-full md:w-fit flex gap-2 !px-12 py-6 cursor-pointer bg-white rounded-none border border-black items-center justify-center hover:bg-white">
                            <span className="text-black font-semibold">Learn More</span>
                            <Icons name="arrow-long-right" className="w-6 h-6 text-black" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
