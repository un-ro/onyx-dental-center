import { Metadata } from "next";
interface GenerateMetadataParams {
  title: string;
  description: string;
  images?: { url: string }[];
  path?: string;
  language?: string;
}

export function metaData({
  title,
  description,
  images = [],
  path = "",
  language = "en-id",
}: GenerateMetadataParams): Metadata {
  const baseUrl = "https://onyxdentalcenter.id";
  const url = path ? `${baseUrl}${path}` : baseUrl;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: images.map((img) => ({
        // url: img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`,
        url: img.url,
        width: 1200,
        height: 630,
        alt: description,
        type: "image/webp",
      })),
      siteName: "Onyx Dental Center – Klinik Gigi Terdekat di Karawaci, Tangerang",
    },
    alternates: {
      languages: {
        [language]: url,
      },
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: images.map((img) => img.url),
    // },
  };
}
