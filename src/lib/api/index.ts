import { whatsappLink } from "../utils";
import { fetcher } from "../utils/fetcher";

type BaseResponseDetail<T> = {
  success: boolean;
  message: string;
  data: T;
};
type BaseResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
};

export const API_BASE_URL = "https://api.onyxdentalcenter.id/api/";
const BASE_URL = "https://api.onyxdentalcenter.id/api/" + "public";
const DEFAULT_REVALIDATE = 43200; // 12 hours
const DEFAULT_REVALIDATE_BLOGS = 3600; // 1 hours

export async function getBlogs(
  language: string | null = null,
): Promise<BaseResponse<Post>> {
  const url = language
    ? `${BASE_URL}/posts?language=${language}`
    : `${BASE_URL}/posts`;

  const res = await fetcher<BaseResponse<Post>>(url, {
    next: {
      revalidate: DEFAULT_REVALIDATE_BLOGS,
      tags: [`blogs-${language || "all"}`], // Unique cache tag per language
    },
  });

  return res;
}

// Remove getBlogsId and getBlogsEn, replace with:
export const getBlogsId = () => getBlogs("id-id");
export const getBlogsEn = () => getBlogs("en-id");

export async function getBlogsForSitemap(): Promise<BaseResponse<Post>> {
  try {
    const res = await fetcher<BaseResponse<Post>>(`${BASE_URL}/posts`, {
      next: { revalidate: DEFAULT_REVALIDATE_BLOGS },
      // headers: {
      //   Authorization: `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Goq3DwXNNOPqtez1.drTTp0wfOa2qI12MNrTRUXFhQhFHEKV2KaplMOj1cGyC5oNnpYXs68ORc5_VEQSOVNNBydHrpRYvuTExqIV4zD2D_7PJTxcAjGkP9EpdN_jpBlx9vn4nVH1f-SivP65Ypv0xYeI-RLgh5APzp2RGxsoLUpvUD_p_Au2eHmIKTGeu2JC1PZ-RCfYJainNWO-VmDGni9MMJE9g4ut5SjJBhqRUwxzyqY0h83hNlsHfWrEw5ECk.hB7Eza35UwgtbLaRm0LI1g`,
      // },
    });
    return res;
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
    return {
      success: true,
      message: "Fallback blogs data",
      data: [],
    };
  }
}

export async function getSettings(): Promise<BaseResponseDetail<Setting>> {
  try {
    const res = await fetcher<BaseResponseDetail<Setting>>(
      `${BASE_URL}/settings`,
      {
        next: { revalidate: DEFAULT_REVALIDATE },
        // cache: "no-store",
        // headers: {
        //   Authorization: `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Goq3DwXNNOPqtez1.drTTp0wfOa2qI12MNrTRUXFhQhFHEKV2KaplMOj1cGyC5oNnpYXs68ORc5_VEQSOVNNBydHrpRYvuTExqIV4zD2D_7PJTxcAjGkP9EpdN_jpBlx9vn4nVH1f-SivP65Ypv0xYeI-RLgh5APzp2RGxsoLUpvUD_p_Au2eHmIKTGeu2JC1PZ-RCfYJainNWO-VmDGni9MMJE9g4ut5SjJBhqRUwxzyqY0h83hNlsHfWrEw5ECk.hB7Eza35UwgtbLaRm0LI1g`,
        // },
      },
    );

    // console.log("CEK: ", {
    //   ...res,
    //   data: {
    //     ...res.data,
    //     link_whatsapp: whatsappLink(
    //       res.data?.socials?.whatsapp || "6281286632240",
    //       res.data?.socials?.whatsappMessage ||
    //         "Hi ONYX, saya ingin konsultasi untuk perawatan gigi saya ya"
    //     ),
    //   },
    // });

    return {
      ...res,
      data: {
        ...res.data,
        link_whatsapp: whatsappLink(
          res.data?.socials?.whatsapp || "6281286632240",
          // res.data?.socials?.whatsappMessage || "Hi, ONYX...",
          "Hi, ONYX...",
        ),
      },
    };
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    // Return fallback data during build failures
    return {
      success: true,
      message: "Fallback settings",
      data: {} as Setting,
    };
  }
}

export async function getBlogsBySlug(
  slug: string,
): Promise<BaseResponseDetail<Post>> {
  const res = await fetcher<BaseResponseDetail<Post>>(
    `${BASE_URL}/posts/${slug}`,
    {
      next: { revalidate: DEFAULT_REVALIDATE_BLOGS },
      // cache: "no-store",
      // headers: {
      //   Authorization: `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Goq3DwXNNOPqtez1.drTTp0wfOa2qI12MNrTRUXFhQhFHEKV2KaplMOj1cGyC5oNnpYXs68ORc5_VEQSOVNNBydHrpRYvuTExqIV4zD2D_7PJTxcAjGkP9EpdN_jpBlx9vn4nVH1f-SivP65Ypv0xYeI-RLgh5APzp2RGxsoLUpvUD_p_Au2eHmIKTGeu2JC1PZ-RCfYJainNWO-VmDGni9MMJE9g4ut5SjJBhqRUwxzyqY0h83hNlsHfWrEw5ECk.hB7Eza35UwgtbLaRm0LI1g`,
      // },
    },
  );

  return res;
}
