'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useRouter } from 'next/navigation'

export default function CardSection({sectionTitle ,data}) {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter();
  console.log(data,"data")
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const HandleSliderNavigation = (card)=>{
    router.push(`/read/${card?.title?.userPreferred || card?.title?.english || card?.title?.native}`)
  }

  if (!isMounted) {
    return null 
  }

  return (
    <section id={sectionTitle} className="mb-2 mt-2  py-4 ">
  <h2 className="text-2xl md:text-3xl font-bold mb-6">{sectionTitle}</h2>
        <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        {data?.loading ? <CarouselContent className="-ml-2 md:-ml-4 ">
          {Array.from({length:10}).map((manga, index) => (
            <CarouselItem key={manga} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full "
              >
                <Card className="h-full bg-gray-200 w-full animate-pulse transition-all">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent> :
        <CarouselContent className="-ml-2 md:-ml-4 ">
          {data?.data?.map((manga, index) => (
            <CarouselItem key={manga.title} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full cursor-pointer" onClick={()=>HandleSliderNavigation(manga)}>
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                      <img
                        src={manga.image}
                        alt={manga.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-center p-2">{manga?.title?.english || manga?.title?.userPreferred ||
        manga?.title?.native || manga?.title?.romaji}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}