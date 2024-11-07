'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useMangaChapter from '@/zustand/MangaChapterStore'
import HTMLFlipBook from 'react-pageflip'
import { motion } from 'framer-motion'

export default function BookReaderModal({ chapter, isOpen, setIsOpen }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { SetChapter, Pages, isLoading, error } = useMangaChapter();
  const book = useRef(null); 

  useEffect(() => {
    if (chapter?.id) {
      SetChapter(chapter.id);
    }
  }, [chapter?.id, SetChapter]);

  useEffect(() => {
    if (book.current) {
      const flipBook = book.current.pageFlip();

      const onFlip = (e) => {
        setCurrentPage(e.data);  // Sync the current page when flip occurs
      };

      flipBook.on('flip', onFlip);

      return () => {
        flipBook.off('flip', onFlip);
      };
    }
  }, [isOpen]);

  const totalPages = Pages?.length;

  // Keyboard navigation for page flipping
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      nextPage();
    } else if (e.key === 'ArrowLeft') {
      previousPage();
    }
  };

  const nextPage = () => {
    if (book.current) {
      const flipBook = book.current.pageFlip();
      flipBook.flipNext();  // Flip to the next page
    }
  };

  const previousPage = () => {
    if (book.current) {
      const flipBook = book.current.pageFlip();
      flipBook.flipPrev();  // Flip to the previous page
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-5xl h-[95vh] bg-white flex p-0"
        onKeyDown={handleKeyDown}  // Bind keyboard event
        tabIndex={0}  // Ensure the dialog listens for keyboard events
      >
        <div className="content-flip w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.5 }}
            className="w-auto h-[500px]"
          >
            <motion.div
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.5 }}
              className="relative border-[10px] bg-slate-100 shadow-xl rounded"
            >
              <HTMLFlipBook
                width={370}
                height={500}
                size="stretch"
                minWidth={370}
                maxWidth={500}
                minHeight={500}
                maxHeight={700}
                showCover={true}
                ref={book}
                className="book-flip"
                startPage={0}
                drawShadow={true}
                flippingTime={1000}
                usePortrait={false}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.5}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {Pages?.map((page, index) => (
                  <Page key={index}>
                    <img src={page?.img} alt={`Page ${index + 1}`} className="h-full object-contain w-full" />
                  </Page>
                ))}
                <BookEnd />
              </HTMLFlipBook>
            </motion.div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const Page = React.forwardRef(({ children, bg }, ref) => {
  return (
    <div className={`bg-white h-full w-full flex items-center justify-center p-2 shadow-2xl`} ref={ref}>
      <div className="text-2xl w-full shadow-md h-full font-serif">{children}</div>
    </div>
  )
})

const Cover = React.forwardRef((props, ref) => {
  return (
    <div
      className="bg-primary text-primary-foreground h-full w-full flex flex-col items-center justify-center p-8 shadow-lg"
      ref={ref}
    >
      <h1 className="text-4xl font-bold mb-4">My Book</h1>
      <p className="text-xl">Click to open</p>
    </div>
  )
})

const BookEnd = React.forwardRef((props, ref) => {
  return (
    <div
      className="bg-secondary text-secondary-foreground h-full w-full flex flex-col items-center justify-center p-8 shadow-lg"
      ref={ref}
    >
      <h2 className="text-3xl font-bold mb-4">The End</h2>
      <p className="text-xl">Thanks for reading!</p>
    </div>
  )
})
