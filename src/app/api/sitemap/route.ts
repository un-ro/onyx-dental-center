export const dynamic = "force-dynamic";

import { getBlogsForSitemap } from "@/lib/api";
import { doctors } from "@/lib/data/doctor";
import { locationPaths } from "@/lib/data/location";
import { NextResponse } from "next/server";

type SitemapImage = { loc: string; caption?: string };
type SitemapUrl = {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod: string;
  images?: SitemapImage[];
};

let cachedSitemap: string | null = null;
let lastFetched = 0;

const escapeXml = (value: string | number) =>
  String(value).replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });

const treatmentImages: Record<string, string> = {
  "treatment/veneers": "treatment-detail-1.webp",
  "treatment/dental-crown": "treatment-detail-2.webp",
  "treatment/dental-spa": "treatment-detail-3.webp",
  "treatment/orthodontic-and-clear-aligner": "treatment-detail-4.webp",
  "treatment/dental-implant": "treatment-detail-5.webp",
  "treatment/aesthetic-direct-restoration": "treatment-detail-6.webp",
  "treatment/kids-treatment": "treatment-detail-7.webp",
  "treatment/smile-makeover": "treatment-detail-8.webp",
  "treatment/bleaching": "treatment-detail-9.webp",
};

export async function GET() {
  const now = Date.now();
  const lastMod = new Date().toISOString();

  // 10 seconds cache in dev, 1 hour in production
  const cacheTime = process.env.NODE_ENV === 'development' ? 10000 : 1000 * 60 * 60;
  if (!cachedSitemap || now - lastFetched > cacheTime) {
    try {
      const responseBlog = await getBlogsForSitemap();
      const blogs = responseBlog.data;
      const baseUrl = "https://onyxdentalcenter.id/";
      const assetsBase = `${baseUrl}assets/images`;

      const doctorUrls = doctors.flatMap((doctor) => [
        `ourteam/${doctor.slug}`,
        `dokter-gigi/${doctor.slug}`,
      ]);

      const treatmentUrls: Array<string> = [
        "treatment/veneers",
        "treatment/dental-crown",
        "treatment/dental-spa",
        "treatment/orthodontic-and-clear-aligner",
        "treatment/dental-implant",
        "treatment/aesthetic-direct-restoration",
        "treatment/kids-treatment",
        "treatment/smile-makeover",
        "treatment/bleaching",
      ];

      const allUrls: Array<string> = [
        "ourteam",
        "dokter-gigi",
        "treatment",
        "experience",
        "philosophy",
        "proven-result",
        "blogs",
        "blogs/en",
        "blogs/id",
        ...doctorUrls,
        ...treatmentUrls,
        ...locationPaths,
      ];

      const staticUrls: SitemapUrl[] = allUrls.map((url) => {
        const entry: SitemapUrl = {
          loc: `${baseUrl}${url}`,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: lastMod,
        };
        if (url === "treatment") {
          entry.images = [{ loc: `${assetsBase}/treatment/treatment-banner.webp`, caption: "Onyx Dental Center — Perawatan Gigi Jakarta" }];
        } else if (treatmentImages[url]) {
          entry.images = [{ loc: `${assetsBase}/treatment/${treatmentImages[url]}`, caption: `Onyx Dental Center — ${url.split("/")[1].replace(/-/g, " ")}` }];
        }
        return entry;
      });

      const blogUrls: SitemapUrl[] =
        blogs?.map((blog: Post) => ({
          loc: `${baseUrl}blogs/${blog.slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: blog.published_at ? new Date(blog.published_at).toISOString() : lastMod,
          images: blog.thumbnailUrl ? [{ loc: blog.thumbnailUrl, caption: blog.title }] : undefined,
        })) || [];

      const urls: SitemapUrl[] = [
        {
          loc: baseUrl,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: lastMod,
          images: [
            { loc: `${assetsBase}/home-section1.webp`, caption: "Onyx Dental Center — Klinik Gigi Jakarta" },
            { loc: `${assetsBase}/home-section4-3.webp`, caption: "Onyx Dental Center — Fasilitas Klinik Gigi" },
          ],
        },
        ...staticUrls,
        ...blogUrls,
      ];

      const renderImages = (images?: SitemapImage[]) =>
        images?.map(img => `
            <image:image>
              <image:loc>${escapeXml(img.loc)}</image:loc>
              ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ""}
            </image:image>`).join("") ?? "";

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${urls
          .map(
            (url) => `
          <url>
            <loc>${escapeXml(url.loc)}</loc>
            ${url?.lastmod ? `<lastmod>${escapeXml(url.lastmod)}</lastmod>` : `<lastmod>${escapeXml(lastMod)}</lastmod>`}
            <changefreq>${escapeXml(url.changefreq)}</changefreq>
            <priority>${escapeXml(url.priority)}</priority>${renderImages(url.images)}
          </url>`
          )
          .join("")}
      </urlset>`;

      cachedSitemap = sitemap;
      lastFetched = now;
    } catch (error) {
      console.error("Error generating sitemap:", error);
      cachedSitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
      // return NextResponse.error();
    }
  }

  // console.log({
  //   lastFetched,
  //   now,
  //   timeSinceLastFetch: now - lastFetched,
  //   cachedSitemap,
  // });

  return new NextResponse(cachedSitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
