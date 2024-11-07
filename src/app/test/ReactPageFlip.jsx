"use client"

import React, { useState, useRef, useEffect } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ReactPageFlip = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const book = useRef(null)

  const pages = [
    { bg: "bg-green-100", content: "Chapter 1: The Beginning" },
    { bg: "bg-yellow-100", content: "Chapter 2: The Journey" },
    { bg: "bg-pink-100", content: "Chapter 3: The Climax" },
    { bg: "bg-teal-100", content: "Chapter 4: The Resolution" },
    { bg: "bg-green-100", content: "Chapter 1: The Beginning" },
    { bg: "bg-yellow-100", content: "Chapter 2: The Journey" },
    { bg: "bg-pink-100", content: "Chapter 3: The Climax" },
    { bg: "bg-teal-100", content: "Chapter 4: The Resolution" },    { bg: "bg-green-100", content: "Chapter 1: The Beginning" },
    { bg: "bg-yellow-100", content: "Chapter 2: The Journey" },
    { bg: "bg-pink-100", content: "Chapter 3: The Climax" },
    { bg: "bg-teal-100", content: "Chapter 4: The Resolution" },    { bg: "bg-green-100", content: "Chapter 1: The Beginning" },
    { bg: "bg-yellow-100", content: "Chapter 2: The Journey" },
    { bg: "bg-pink-100", content: "Chapter 3: The Climax" },
    { bg: "bg-teal-100", content: "Chapter 4: The Resolution" },
  ]

  useEffect(() => {
    if (book.current) {
      const flipBook = book.current?.pageFlip();
      const onFlip = (e) => setCurrentPage(e.data);

      flipBook?.on('flip', onFlip);

      // Cleanup function
      return () => {
        flipBook?.off('flip', onFlip);
      };
    }
  }, [isOpen]);



  const Page = React.forwardRef(({ children, bg }, ref) => {
    return (
      <div className={`${bg} h-full w-full flex items-center justify-center p-8 shadow-2xl`} ref={ref}>
        <div className="text-2xl font-serif">{children}</div>
      </div>
    )
  })

  const Cover = React.forwardRef((props, ref) => {
    return (
      <div 
        className="bg-primary text-primary-foreground h-full w-full flex flex-col items-center justify-center p-8 shadow-lg" 
        ref={ref}
        onClick={() => setIsOpen(true)}
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

  // Handle turning to previous page
  const handlePrevPage = () => {
    if (book.current) {
      // Use the flipPrev method with a corner specified
      book.current.pageFlip().flipPrev(['top']) // You can also try ['bottom']
    }
  }

  // Handle turning to next page
  const handleNextPage = () => {
    if (book.current) {
      // Use the flipNext method with a corner specified
      book.current.pageFlip().flipNext(['top']) // You can also try ['bottom']
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.5 }}
            className="w-[80%] h-[700px]"
          >
          <motion.div
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.5 }}
            className="relative border-[10px] bg-gray-50 shadow-xl rounded"
          >
            <HTMLFlipBook
              width={500}
              height={580}
              size="stretch"
              minWidth={500}
              maxWidth={500}
              minHeight={580}
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
              {/* <Cover /> */}
              {pages.map((page, index) => (
                <Page key={index} bg={page.bg}>
                  {page.content}
                </Page>
              ))}
              <BookEnd />
            </HTMLFlipBook>

            {/* <div className="absolute bottom-[-50px] left-0 right-0 flex justify-between items-center px-4">
              <div className="text-sm text-gray-500 mt-10">
                {currentPage > 0 && currentPage <= pages.length && (
                  <>Page {currentPage + 1} of {pages.length + 1}</> // Adjusted page numbering
                )}
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevPage}
                //   disabled={currentPage === 0} // Disable prev button on first page
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={currentPage === pages.length} // Disable next button on last page
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div> */}
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.5 }}
            className="relative border-[10px] bg-gray-50 shadow-xl rounded"
          >
            <HTMLFlipBook
              width={500}
              height={580}
              size="stretch"
              minWidth={500}
              maxWidth={500}
              minHeight={580}
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
              {/* <Cover /> */}
              {pages.map((page, index) => (
                <Page key={index} bg={page.bg}>
                  {page.content}
                </Page>
              ))}
              <BookEnd />
            </HTMLFlipBook>

            {/* <div className="absolute bottom-[-50px] left-0 right-0 flex justify-between items-center px-4">
              <div className="text-sm text-gray-500 mt-10">
                {currentPage > 0 && currentPage <= pages.length && (
                  <>Page {currentPage + 1} of {pages.length + 1}</> // Adjusted page numbering
                )}
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevPage}
                //   disabled={currentPage === 0} // Disable prev button on first page
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextPage}
                  disabled={currentPage === pages.length} // Disable next button on last page
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReactPageFlip
