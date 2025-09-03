"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

export default function PixelProviders({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "PageView");
        }
    }, [pathname, searchParams]);

    return <>{children}</>;
}
