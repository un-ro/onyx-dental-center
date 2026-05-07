export const dynamic = "force-dynamic";

import { getBlogsForSitemap } from "@/lib/api";
import { NextResponse } from "next/server";

let cachedSitemap: string | null = null;
let lastFetched = 0;

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

      const doctorUrls: Array<string> = [
        "ourteam/drg-trisia-bella-kusuma",
        "ourteam/drg-eka-yesaya",
        "ourteam/drg-fikri-al-hafiz",
        "ourteam/drg-ovelia-veres",
        "ourteam/drg-melisa-sp-pros",
        "ourteam/drg-arinanda-ramadhan",
        "ourteam/drg-yeheskiel-mursalim",
        "ourteam/drg-rio-jonas-m-kes-sert-ort",
        "ourteam/drg-eddy-phd",
        "ourteam/drg-florencia-stephanie",
        "ourteam/drg-jazila-afifa",
      ];

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
        "treatment",
        "experience",
        "philosophy",
        "proven-result",
        "blogs",
        "blogs/en",
        "blogs/id",
        ...doctorUrls,
        ...treatmentUrls,
      ];

      const staticUrls: Array<Record<string, string | number>> = allUrls.map((url) => ({
        loc: `${baseUrl}${url}`,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: lastMod,
      }));

      const blogUrls =
        blogs?.map((blog: Post) => ({
          loc: `${baseUrl}blogs/${blog.slug}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmod: blog.published_at ? new Date(blog.published_at).toISOString() : lastMod,
        })) || [];

      const urls: Record<string, string | number>[] = [
        {
          loc: baseUrl,
          changefreq: "weekly",
          priority: 0.7,
          lastmod: lastMod,
        },
        ...staticUrls,
        ...blogUrls,
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
          .map(
            (url) => `
          <url>
            <loc>${url.loc}</loc>
            ${url?.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : `<lastmod>${lastMod}</lastmod>`}
            <changefreq>${url.changefreq}</changefreq>
            <priority>${url.priority}</priority>
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
