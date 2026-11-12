import Icons from "@/components/Icon";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

const list: { name: string; image: string; description: string }[] = [
    {
        name: "Yosef Herawan",
        image: "/assets/images/home-section3-1.webp",
        description: "I've been to Onyx Dental for a few different issues, and I can honestly say they’ve got all your tooth problems covered! From quick fixes to more serious treatments, they take care of everything with such ease and professionalism. I never worry when I'm in their hands!",
    },
    {
        name: "Lidya Agata",
        image: "/assets/images/home-section3-2.webp",
        description: "The best dental place I've been all around Tangerang area. The doctor was indeed professional, I had my root canal treatment done with dr. Eka. My tooth is looking healthier after treatment and I couldn't be more satisfied with the service and everything. I could recommend this to anyone looking for the best dentist experience. As you enter the place, you'll know for sure you're in the right place. Will come back for sure!",
    },
    {
        name: "Ammy Kua",
        image: "/assets/images/home-section3-3.webp",
        description: "Wonderful experience with Onyx dental clinic. Dr. Eka Yesaya was a wonderful Dentist, he was so kind and always give best effort in his work. I am so glad I chose this clinic, and would highly recommend it to anyone.",
    },
    {
        name: "Valdo Marcelino",
        image: "/assets/images/home-section3-4.webp",
        description: "I'm a regular patient of Dr. Rio here, great service as always, don't hesitate to do your checkups here 👍",
    },
    {
        name: "Lidya Riyanti",
        image: "/assets/images/home-section3-5.webp",
        description: "The doctors are great, the clinic is clean and the staff are friendly and informative. Thanks onyx dental center lippo karawaci.",
    },
    {
        name: "Cindy Karyadi",
        image: "/assets/images/home-section3-6.webp",
        description: "The clinic is equipped with very complete and modern technology. The admin is highly responsive. Dr. Yeheskiel is thorough and kind. Highly recommended.",
    }
]

export default async function Section6() {

    return (
        <section className="flex justify-center p-7 md:py-20">
            <div className="w-full flex flex-col md:max-w-5xl xl:max-w-6xl">
                <h2 className="font-eb-garamond font-semibold text-custom-text-color text-2xl md:text-4xl mb-6 md:mb-16">What Our Patients Say</h2>
                <div className="flex flex-wrap flex-col md:flex-row justify-between gap-6 md:gap-8 mb-6 md:mb-12">
                    {list.map((item, index) => (
                        <div className="md:w-[31%] md:mb-2" key={index}>
                            <h3 className="leading-[130%] text-lg md:text-2xl font-semibold text-custom-text-color">{item.name}</h3>
                            <div className='flex'>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Icons key={index} name="star" className="w-6 h-6 text-custom-brown" />
                                ))}
                            </div>
                            <p className="mt-2 text-custom-text-color">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
