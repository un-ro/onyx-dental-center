import { Label } from './ui/label'
import Link from 'next/link'
import Icons from './Icon'
import Image from 'next/image'

export default async function Footer({ settings }: { settings: Setting }) {

    const menuItems = [
        {
            label: "Our team",
            href: "/ourteam",
        },
        {
            label: "Our Expertise",
            href: "/treatment",
        },
        {
            label: "The Onyx Experience",
            href: "/experience",
        },
        {
            label: "Our Proven Result",
            href: "/proven-result",
        },
        {
            label: "Blog",
            href: "/blogs",
        }
    ]

    // console.log("FOOTER ", settings);


    return (
        <footer className="w-full bg-footer p-7 md:px-[10%] md:py-10">
            <div className='flex flex-col md:flex-row md:mb-14'>
                <div className='w-full grid grid-cols-1 md:grid-cols-4 mb-6 md:mb-0 gap-6 items-start justify-between'>
                    <Link href="/" className="flex mt-2 min-h-[10vh]">
                        <Image src="/logo-footer.svg" alt="logo" width={24} height={24} className="text-white w-[60%] md:w-40" />
                        <span className="sr-only">logo</span>
                    </Link>
                    <div className="grid md:grid-cols-1 text-white font-bold">
                        {menuItems.map((e) => (
                            <Link
                                key={e.label}
                                href={e.href}
                                className="leading-[150%] pb-4 sm:pb-4 w-fit h-fit"
                            >
                                {e.label}
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-col text-white font-bold'>
                        <Link href={`https://www.instagram.com/${settings?.socials?.instagram ?? "onyxdentalcenter"}`} className='pb-4 w-fit h-fit' target='_blank'>Instagram</Link>
                        <Link href={`https://www.tiktok.com/${settings?.socials?.tiktok ?? "@onyxdentalcenter"}`} className='pb-4 w-fit h-fit' target='_blank'>Tiktok</Link>
                        <Link href={`https://www.youtube.com/${settings?.socials?.youtube ?? "@onyxdentalcenter"}`} className='pb-4 w-fit h-fit' target='_blank'>Youtube</Link>
                        <Link href={`https://www.facebook.com/${settings?.socials?.facebook ?? "onyxdentalcenter"}`} className='pb-4 w-fit h-fit' target='_blank'>Facebook</Link>
                    </div>
                    <div className='grid gap-4 text-white'>
                        <address className='grid gap-4 text-white' style={{ fontStyle: "normal" }}>
                            <strong className='font-bold'>Onyx Dental Center</strong>
                            <p>{settings.contactInfo?.address ?? `Ruko Asia Millenium, Jl. Taman Permata No.65 Blok C-1, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15811`}</p>
                            <Link href={`tel:${(settings.contactInfo?.phone ?? '+628126632240').replace(/\D/g, '').replace(/^0/, '+62')}`} className='font-bold'>
                                {settings.contactInfo?.phone ?? '+62 812-8663-2240'}
                            </Link>
                            
                            <p>Near / Area Served: Lippo Karawaci • Karawaci • Kelapa Dua • Gading Serpong • Tangerang</p>

                            <Link className='flex items-center font-bold' href={settings?.mapUrl ?? 'https://maps.app.goo.gl/5AqjUPYF1gZtmtuh9'} target='_blank'>
                                <Icons name='place' className='w-6 h-6 text-white mr-2' /> See on Google Maps
                            </Link>
                        </address>
                    </div>
                </div>
            </div>

            <hr className='text-white' />
            <div className="leading-[150%] flex justify-center mt-6 text-white">
                Copyright © Onyx Dental Center 2025
            </div>
        </footer>
    )
}