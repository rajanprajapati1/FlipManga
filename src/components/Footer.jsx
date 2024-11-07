import React from 'react'

const Footer = () => {
  const CopyRightYear = new Date().getFullYear(); ;
  return (
    <footer className="border-t py-2 md:py-0">
    <div className="container flex px-16 flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {CopyRightYear} Flipmanga. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer