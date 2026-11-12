import Icons from "@/components/Icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Section1() {
    return (
        <section className="flex justify-center p-7 md:py-20">
            <div className="w-full flex gap-10 flex-col-reverse md:flex-row md:items-center md:justify-between md:max-w-5xl xl:max-w-6xl">
                <div>
                    <h2 className="md:leading-[130%] md:max-w-[90%] text-2xl md:text-4xl font-eb-garamond font-semibold text-custom-text-color mb-6 md:mb-6">
                        Home to Jakarta’s leading natural smile makers — Founded by three visionary aesthetic dentists
                    </h2>
                    <p className="md:max-w-[90%] text-custom-text-color mb-6 md:mb-12" >Personalized, artistic, and timeless. Your smile in the hands of Indonesia’s finest.</p>
                    <Link href={'/ourteam'}>
                        <Button className="w-full md:w-fit flex gap-2 !px-12 py-6 cursor-pointer bg-transparent rounded-none border border-black items-center justify-center hover:bg-transparent">
                            <span className="text-black font-semibold">Meet all dentists</span>
                            <Icons name="arrow-long-right" className="w-6 h-6 text-black" />
                        </Button>
                    </Link>
                </div>
                <Image
                    src="/assets/images/home-section1.webp"
                    alt="Founders of Onyx Dental Center in the Karawaci clinic"
                    width={500}
                    height={500}
                />
            </div>
        </section>
    );
}
