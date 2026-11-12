export type LocationPage = {
  slug: string;
  locale: "en" | "id";
  alternateSlug: string;
  title: string;
  metadataTitle: string;
  description: string;
  eyebrow: string;
  imageAlt: string;
  imageUrl: string;
  intro: string;
  mapLabel: string;
  mapUrl: string;
  sections: { heading: string; body: string; imageUrl: string }[];
  ctaLabel: string;
};

export const locationPages: LocationPage[] = [
  {
    slug: "dental-near-karawaci",
    locale: "en",
    alternateSlug: "klinik-gigi-terdekat-karawaci",
    title: "Dental Clinic Near Karawaci",
    metadataTitle: "Dental Clinic Near Karawaci | Onyx Dental Center",
    description:
      "Onyx Dental Center serves Karawaci patients with aesthetic, restorative, and family dental care near the Tangerang area.",
    eyebrow: "Karawaci area",
    imageAlt: "Dental clinic near Karawaci placeholder",
    imageUrl: "/assets/images/experience/experience-image-1.webp",
    intro:
      "Looking for a dental clinic near Karawaci? Onyx Dental Center provides personalized dental care for patients around Karawaci, Lippo Village, Binong, and nearby Tangerang neighborhoods.",
    mapLabel: "Open Onyx Dental Center on Google Maps",
    mapUrl: "https://maps.app.goo.gl/5AqjUPYF1gZtmtuh9",
    sections: [
      {
        heading: "Dental care near Karawaci",
        body: "Our clinic supports routine checkups, dental spa, whitening, veneers, crowns, implants, orthodontics, and smile makeover consultations in one modern dental center.",
        imageUrl: "/assets/images/home-section2-3.webp",
      },
      {
        heading: "Dentist near Karawaci area",
        body: "For patients searching for a dentist near the Karawaci area, Onyx Dental Center is here to provide you with the best dental experience. Every appointment includes clear explanations, refined smile planning, and technology-led care before treatment begins.",
        imageUrl: "/assets/images/doctor/doctor-banner.webp",
      },
      {
        heading: "Easy to reach from Karawaci",
        body: "Onyx Dental Center is located in the Tangerang area, making it a practical option for patients searching for dentist services around Karawaci and surrounding communities.",
        imageUrl: "/assets/images/experience/experience-image-2.webp",
      },
    ],
    ctaLabel: "Chat with Onyx Dental Center",
  },
  {
    slug: "klinik-gigi-terdekat-karawaci",
    locale: "id",
    alternateSlug: "dental-near-karawaci",
    title: "Klinik Gigi Terdekat Karawaci",
    metadataTitle: "Klinik Gigi Terdekat Karawaci | Onyx Dental Center",
    description:
      "Onyx Dental Center melayani pasien area Karawaci dengan perawatan gigi estetik, restoratif, dan keluarga di sekitar Tangerang.",
    eyebrow: "Area Karawaci",
    imageAlt: "Klinik gigi terdekat Karawaci placeholder",
    imageUrl: "/assets/images/experience/experience-image-1.webp",
    intro:
      "Sedang mencari klinik gigi terdekat Karawaci? Onyx Dental Center menghadirkan perawatan gigi personal untuk pasien di sekitar Karawaci, Lippo Village, Binong, dan area Tangerang sekitarnya.",
    mapLabel: "Buka Onyx Dental Center di Google Maps",
    mapUrl: "https://maps.app.goo.gl/5AqjUPYF1gZtmtuh9",
    sections: [
      {
        heading: "Perawatan gigi dekat Karawaci",
        body: "Klinik kami melayani pemeriksaan rutin, dental spa, bleaching, veneer, crown, implan gigi, orthodontic, hingga konsultasi smile makeover dalam satu dental center modern.",
        imageUrl: "/assets/images/home-section2-3.webp",
      },
      {
        heading: "Dokter gigi terdekat di Karawaci",
        body: "Bagi pasien yang mencari dokter gigi terdekat di Karawaci, setiap sesi dilengkapi penjelasan yang mudah dipahami, perencanaan senyum yang detail, dan teknologi pendukung.",
        imageUrl: "/assets/images/doctor/doctor-banner.webp",
      },
      {
        heading: "Mudah dijangkau dari Karawaci",
        body: "Onyx Dental Center berada di area Tangerang, sehingga menjadi pilihan praktis bagi pasien yang mencari dokter gigi di sekitar Karawaci dan kawasan sekitarnya.",
        imageUrl: "/assets/images/experience/experience-image-2.webp",
      },
    ],
    ctaLabel: "Chat Onyx Dental Center",
  },
];

export const locationPaths = locationPages.map((page) => `location/${page.slug}`);

export function getLocationPage(slug: string) {
  return locationPages.find((page) => page.slug === slug);
}
