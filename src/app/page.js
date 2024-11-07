'use client'
import NewsLetter from '@/components/NewsLetter'
import CarouselIndicatorExample from '@/components/CarouselBox'
import CardSection from '@/components/CardSection'
import useHomeStore from '@/zustand/HomeStore'
import { useEffect } from 'react'

export default function Component() {
  const { trending, popular,  fetchAllData } = useHomeStore();

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 flex flex-col" id="latest">
        <CarouselIndicatorExample />
        <CardSection sectionTitle={'Trending'} data={trending} />
        <CardSection sectionTitle={'Popular'} data={popular} />
        <NewsLetter />
      </main>
    </div>
  )
}