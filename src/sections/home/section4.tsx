import Icons from "@/components/Icon";
import CustomCarousel from "@/components/custom-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Image from "next/image";

export default async function Section4() {

    return (
        <section className="flex flex-col items-center pt-7 md:py-20 ">
            <div className="w-full flex flex-col md:max-w-5xl xl:max-w-6xl px-7 md:px-0">
                <h1 className="font-eb-garamond font-semibold text-custom-text-color text-2xl md:text-4xl mb-6 md:mb-12">The Onyx Experience</h1>
            </div>
            <div className="w-full pb-7 bg-custom-black md:bg-custom-primary">
                <CustomCarousel />
                <div className="mt-6 px-7 md:px-0 md:mt-12 w-full flex justify-center">
                    <Link href="/experience">
                        <Button className="w-full md:w-fit flex gap-2 !px-12 md:!px-36 py-6 cursor-pointer bg-transparent rounded-none border border-white md:border-black items-center justify-center hover:bg-transparent">
                            <span className="text-white md:text-black font-semibold">See all facilities</span>
                            <Icons name="arrow-long-right" className="w-6 h-6 text-white md:text-black" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
