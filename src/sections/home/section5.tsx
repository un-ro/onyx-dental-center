// import Icons from "@/components/Icon";
// import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Section5() {
    return (
        <section className="bg-custom-cream flex justify-end py-0 md:py-0">
            <div className="w-full h-full flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center text-custom-text-color p-7 md:py-0 md:pl-[12%]">
                    <Image
                        src="/assets/images/home-section5-1.webp"
                        alt="Pediatric dental care at Onyx Dental Center"
                        width={500}
                        height={500}
                        className="w-[65%] md:w-[40%] h-full object-cover mb-4"
                    />
                    <h2 className="md:leading-[130%] text-2xl md:text-4xl font-eb-garamond font-semibold md:mb-6">
                        Making Every Visit a Happy Experience for Our Little Patients
                    </h2>
                </div>
                <div className="relative w-full md:w-1/2 h-full">
                    <Image
                        src="/assets/images/home-section5-2.webp"
                        alt="Child patient smiling at Onyx kids corner"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
