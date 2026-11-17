import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappLink(phoneNo: string, message: string) {
  // Remove any non-numeric characters
  const cleanNumber = phoneNo.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(message);

  // Add country code if not present
  const numberWithCode = cleanNumber.startsWith("62")
    ? cleanNumber
    : `62${cleanNumber.startsWith("0") ? cleanNumber.slice(1) : cleanNumber}`;

  return `https://wa.me/${numberWithCode}?text=${encodedMsg}`;
}

// Animated SVG data URL for next/image `placeholder` (Next.js shimmer example)
export function shimmer(w: number, h: number) {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g"><stop stop-color="#eee" offset="20%"/><stop stop-color="#ddd" offset="50%"/><stop stop-color="#eee" offset="70%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#eee"/><rect width="${w}" height="${h}" fill="url(#g)"><animate attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/></rect></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}` as const;
}
