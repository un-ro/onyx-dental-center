'use client'

import { Sheet, SheetTrigger, SheetContent, SheetFooter, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'
import { useBoolean } from '@/hooks'
import Link from 'next/link';
import { Button } from './ui/button';
// import Icons from './Icon';
import Image from "next/image";

type NavbarSheetProps = {
    menuItems: {
        label: string;
        href: string | {
            label: string;
            href: string;
        }[];
    }[];
    settings: Setting;
}

export default function NavbarSheet({ menuItems = [], settings }: NavbarSheetProps) {
    const { value, setValue } = useBoolean();

    return (
        <Sheet open={value} onOpenChange={setValue}>
            <div className="grid md:hidden grid-cols-[auto_1fr_auto] items-center w-full gap-x-2 px-0 py-2">
                <Link href="/" className="flex">
                    {/* <Image width={24} height={24} src="/logo.svg" alt="logo" className="text-white w-24" /> */}
                    <Image src="/logo.webp" alt="logo" className="w-28" width={24} height={24} priority />
                    <span className="sr-only">logo</span>
                </Link>

                <div></div>

                <SheetTrigger asChild>
                    <div
                        className="peer group relative rounded-full md:hidden w-10 h-10"
                    >
                        <Menu className="absolute inset-0 m-auto w-7 h-7 text-black transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" />
                        <X className="absolute inset-0 m-auto w-7 h-7 text-black opacity-0 rotate-90 transition-all duration-300 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </div>
                </SheetTrigger>
                {/* <Button className="peer-data-[state=open]:hidden font-outfit font-semibold rounded-full bg-gold-primary text-heading-2 cursor-pointer py-2 px-3">
                    Reservasi
                </Button> */}
                {/* <div className="hidden peer-data-[state=open]:block py-2 px-3" /> */}
            </div>
            <SheetContent side="right" className="w-[100vw] mt-[9vh] md:hidden">

                <div className="grid text-custom-text-color">
                    {menuItems.map((e) => (
                        typeof e.href === 'string' ? (
                            <Link
                                key={e.label}
                                href={e.href}
                                className="font-semibold py-4 px-4 sm:py-3"
                                onClick={() => setValue(false)}
                            >
                                {e.label}
                            </Link>
                        ) : (
                            <div key={e.label}>
                                <div className="leading-[150%] font-semibold py-4 px-4 sm:py-3">
                                    {e.label}
                                </div>
                                <div className="flex flex-col gap-3 ml-8 leading-[150%]">
                                    {e.href.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="hover:text-gray-400"
                                            onClick={() => setValue(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>

                <Button className="flex text-md font-helvetica text-heading-2 font-semibold cursor-pointer drop-shadow bg-custom-brown rounded-none py-6 mx-4 hover:bg-custom-brown/50">
                    <Link href={settings?.link_whatsapp || ''} target="_blank">
                        {/* <Icons name="whatsapp" className="h-6 w-6 text-heading-2" /> */}
                        Book Your Session
                    </Link>
                </Button>
                {/* <Button className="text-md font-outfit text-heading-2 font-semibold flex rounded-full cursor-pointer bg-gold-primary px-6 py-6 mx-4">
                    <Icons name="whatsapp" className="h-6 w-6 text-heading-2" />
                    Reservasi
                </Button> */}
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                <SheetFooter className="mt-0">
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
