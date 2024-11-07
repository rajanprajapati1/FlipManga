import ReadServer from '@/components/ReadServer'
import { fetchMangaDetails } from '@/utils/GenerateMetadataApi';
import React from 'react'

export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;
  const mangaId = searchParams.id;  // Access query parameter 'id' directly from searchParams object
  const mangaTitle = slug ? slug.join(" ") : "";  // Join slug for the title

  // Fetch the manga details from your API (or a static source)
  const mangaDetails = await fetchMangaDetails(mangaId, mangaTitle);

  return {
    title: mangaDetails?.title || 'FlipManga - Read Manga Online',
    description: mangaDetails?.description?.en || 'Explore manga series online with FlipManga!',
    openGraph: {
      title: mangaDetails?.title || 'FlipManga - Read Manga Online',
      description: mangaDetails?.description?.en || 'Explore manga series online with FlipManga!',
      images: [{ url: mangaDetails?.image || '/default-cover.jpg' }],
      url: `https://www.flipmanga.com/manga/${mangaId}`,
    },
  };
}


const page = () => {
  return (
    <ReadServer />
  )
}

export default page