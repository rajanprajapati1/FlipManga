'use client'

import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Star, Clock, LibraryBig, Waypoints, Users, ChevronRight, LoaderCircle, LoaderCircleIcon, BookOpenText, SquareLibrary } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import useMangaDetailStore from '@/zustand/MangaDetailStore'
import MangaNotFound from './Not-found'
import ChapterModal from './ReadingModal'
import useMangaChapter from '@/zustand/MangaChapterStore'
import BookReaderModal from './BookReaderModal'


export default function Reader({ id, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chaoterInfo,setchapterInfo] =useState({data : null , mode : 0});
    const { mangaDetails: mangaDetail ,loading } = useMangaDetailStore();
    const {isLoading:mangaloading} = useMangaChapter();

    const HandleOpen = (info,mode)=>{
        setchapterInfo({data:info , mode:mode });
        setIsOpen(true)
    }

    useEffect(()=>{
        if(!isOpen){
            setchapterInfo({data:null ,mode:null})
        }
    },[isOpen])
    
    
    if(loading){
        return <div className='w-full flex gap-3 py-5'>
          <div className="box flex-[0.4] bg-gray-200 rounded-md animate-pulse h-screen border border-gray-100"></div>
          <div className="desc flex-1 bg-gray-200 rounded-md animate-pulse h-screen border border-gray-100"></div>
        </div>
    }
    if(!mangaDetail){
        return <MangaNotFound/>
    }
    return (<>
        <div className="container  mx-auto px-4 py-8">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Manga</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{mangaDetail?.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <div className="relative aspect-[3/4] mb-4">
                                <img
                                    src={mangaDetail?.image}
                                    alt={mangaDetail?.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <h1 className="text-2xl font-bold mb-2">{mangaDetail?.title}</h1>
                            {mangaDetail?.genres && <div className="flex flex-wrap gap-2 mb-4">
                                {mangaDetail?.genres?.map((genre) => (
                                    <Badge key={genre} variant="primary">{genre}</Badge>
                                ))}
                            </div>}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center">
                                    <Star size={18} className="mr-2 text-yellow-400" />
                                    <span className="font-semibold">4.8</span>
                                </div>
                                {mangaDetail?.chapters?.length > 0 && <div className="flex items-center">
                                    <BookOpen size={18} className="mr-2 text-gray-400" />
                                    <span>{mangaDetail?.chapters?.length} chapters</span>
                                </div>}
                                {mangaDetail?.releaseDate && <div className="flex items-center">
                                    <Clock size={18} className="mr-2 text-gray-400" />
                                    <span>{mangaDetail?.releaseDate}</span>
                                </div>}
                            </div>
                            <Button className="w-full">Start Reading</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description"><LibraryBig size={18} className='mr-2' /> Description</TabsTrigger>
                            <TabsTrigger value="chapters"><Waypoints size={18} className='mr-2' /> Chapters</TabsTrigger>
                            <TabsTrigger value="characters"><Users size={18} className='mr-2' /> Characters</TabsTrigger>
                        </TabsList>
                        <TabsContent value="description">
                            <Card>
                                <CardContent className="p-6">
                                    <ScrollArea className="h-[400px] w-full pr-4">
                                        <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                                        <p className="text-gray-700 dark:text-gray-300">{mangaDetail?.description?.en || mangaDetail?.description?.ru || mangaDetail?.description?.vi}</p>
                                        <Separator className="my-4" />
                                        <h3 className="text-lg font-semibold mb-2">Themes</h3>
                                        {mangaDetail?.themes && <div className="flex flex-wrap gap-2">
                                            {mangaDetail?.themes?.map((theme) => (
                                                <Badge key={theme} variant="outline">{theme}</Badge>
                                            ))}
                                        </div>}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        {mangaDetail?.chapters &&
                            <TabsContent value="chapters">
                                <Card>
                                    <CardContent className="p-6">
                                        <ScrollArea className="h-[400px] w-full pr-4">
                                            <ul className="space-y-2">
                                                {mangaDetail?.chapters?.length > 1 ? mangaDetail?.chapters?.map((chapter) => (
                                                    <li key={chapter.id} className="flex justify-between items-center">
                                                        <span className="font-medium">Chapter {chapter?.chapterNumber}: {chapter?.title}</span>
                                                        <div className="buttons w-auto flex gap-2 items-center">
                                                        <Button variant="outline" className="w-[100px]" size="sm" 
                                                        onClick={()=>HandleOpen(chapter , '1')}>{mangaloading &&
                                                         (chapter?.id === chaoterInfo?.data?.id && chaoterInfo?.mode == 1) ? (<>
                                                            <LoaderCircleIcon size={18} className='animate-spin' />
                                                        </>) : (<>
                                                        Read <SquareLibrary size={18} className='ml-2' />
                                                        </>)}</Button>
                                                        <Button variant="outline" className="" size="sm"
                                                         onClick={()=>HandleOpen(chapter , '2')}
                                                         >{mangaloading && (chapter?.id === chaoterInfo?.data?.id && chaoterInfo?.mode == 2) ? (<>
                                                            <LoaderCircleIcon size={18} className='animate-spin' />
                                                        </>) : (<>
                                                        <BookOpenText size={18}  />
                                                        </>)}</Button>
                                                        </div>
                                                    </li>
                                                )) : (<>
                                                    <CardContent className="p-6">
                                                        <p className="text-gray-700 dark:text-gray-300">Chapter information not available.</p>
                                                    </CardContent>
                                                </>)}
                                            </ul>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </TabsContent>}
                        <TabsContent value="characters">
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-gray-700 dark:text-gray-300">Character information not available.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
        {(chaoterInfo?.data && chaoterInfo?.mode == 1) && <ChapterModal isOpen={isOpen} setIsOpen={setIsOpen} chapter={chaoterInfo?.data} />}
        {(chaoterInfo?.data && chaoterInfo?.mode == 2) && <BookReaderModal isOpen={isOpen} setIsOpen={setIsOpen} chapter={chaoterInfo?.data} />}
        </>
    )
}