declare type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  language: string;
  author: {
    name: string,
    email: string,
  }
  status: string;
  thumbnailUrl: string;
  //   {
  //     "headline": "Hari baru",
  //     "description": "test deskripsi",
  //     "buttonText": null,
  //     "buttonUrl": null,
  //     "bannerImg": "https://api.cms.ts-exp.com/storage/images/2025/06/ddb6027ae29eb19d963d730726282758.jpg"
  // }
  cta: {
    title: string;
    description: string;
    url: string;
    textButton: string;
    imgBanner: string;
  };
  relatedPosts: string[];
  tags: string[];
  category: string[];
  authorId: string | null;
  published_at: string | null;
  updated_at?: string | null;
};
