"use client";
import Reader from "@/components/Reader";
import useMangaDetailStore from "@/zustand/MangaDetailStore";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const ReadServer = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const title = params.slug ? params.slug.join(" ") : ""; 
  const id = searchParams.get("id");  

  const { mangaDetails,  fetchMangaDetails } = useMangaDetailStore();

  const metaTitle = mangaDetails?.title || "FlipManga - Read Manga Online";
  const metaDescription = mangaDetails?.description || "Explore manga series online with FlipManga!";
  const metaImage = mangaDetails?.coverImage || "/default-cover.jpg"; // Use a default image if cover image is unavailable
  const metaUrl = `https://www.flipmanga.com/manga/${id}`;

  useEffect(() => {
    fetchMangaDetails(id, decodeURIComponent(title));
  }, [id, title, fetchMangaDetails]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <main className="container mx-auto px-4">
        <Reader  id={id} title={decodeURIComponent(title)} />
        </main>
        </div>
  );
};

export default ReadServer;
