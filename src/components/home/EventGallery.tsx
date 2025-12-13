import { cache } from "react";
import "server-only";
import { api } from "@/server/api/server";
import EventGalleryClient from "@/components/home/EventGalleryClient";
// import { unstable_cache } from "next/cache";

// const getGallery = unstable_cache(
//   async () => {
//     const caller = await api();
//     const galleryData = await caller.gallery.getAll();
//     return galleryData?.map((e) => e.publicUrl) ?? [];
//   },
//   ["home-gallery"],
//   { revalidate: 3600 }
// );

const getGallery = cache(async () => {
  const caller = await api();
  const galleryData = await caller.gallery.getAll();

  let gallery = galleryData?.map((e) => e.publicUrl) || [];

  if (gallery.length === 0) {
    gallery = [
      "/gallery/syaigathering1.png",
      "/gallery/deepracedash1.png",
      "/gallery/cedar2.png",
      "/gallery/cedar1.png",
      "/gallery/yac.png",
      "/gallery/syaigathering2.png",
      "/gallery/mindfulhacksxsyai.png",
      "/gallery/deepracedash3.png",
      "/gallery/yac2.png",
      "/gallery/syaigathering3.png",
      "/gallery/mindfulhacksxsyai2.png",
      "/gallery/deepracedash2.png",
    ];
  }

  return gallery;
});

export default async function EventGallery() {
  const gallery = await getGallery();
  return <EventGalleryClient gallery={gallery} />;
}
