type Props = {
  post: Partial<Post> & { author?: { name: string } };
};

export default function BlogPostingJsonLd({ post }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: `https://onyxdentalcenter.id/blogs/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnailUrl,
    inLanguage: post.language === "id-id" ? "id-ID" : "en-ID",
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Onyx Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://onyxdentalcenter.id/#business",
      name: "Onyx Dental Center",
      logo: {
        "@type": "ImageObject",
        url: "https://onyxdentalcenter.id/logo.webp",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
