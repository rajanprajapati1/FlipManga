'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react"
import useMangaChapter from '@/zustand/MangaChapterStore'

export default function ChapterModal({ chapter, isOpen, setIsOpen }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { SetChapter, Pages, isLoading, error } = useMangaChapter();

  useEffect(() => {
    if (chapter?.id) {
      SetChapter(chapter.id);
    }
  }, [chapter?.id, SetChapter]);

  const totalPages = Pages?.length;

  const currentPageImage = Pages?.find(page => page?.page === currentPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Function to go to the previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      nextPage();
    } else if (e.key === 'ArrowLeft') {
      previousPage();
    }
  };
  if(isLoading){
    return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-5xl h-[90vh] bg-white flex flex-col p-0" onKeyDown={handleKeyDown}>
        <DialogHeader className="px-4 py-3 flex flex-row items-center justify-between border-b">
          <DialogTitle>
            Chapter {chapter.chapterNumber}: {chapter.title}
          </DialogTitle>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground mr-8 ">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 w-full">
          <div className="relative w-full h-full flex justify-center items-center p-4">
            {/* Show the image for the current page */}
            {currentPageImage ? (
              <img
                src={currentPageImage.img}
                alt={`Page ${currentPage}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>Loading page...</span>
            )}

            {/* Navigation overlay */}
            <div className="absolute inset-0 flex justify-between items-center px-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-32 w-16 opacity-0 hover:opacity-100 transition-opacity"
                onClick={previousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-32 w-16 opacity-0 hover:opacity-100 transition-opacity"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* Bottom navigation bar */}
        <div className="p-2 border-t flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Page
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next Page
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
