
import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookX, Home, Search } from "lucide-react"

export default function MangaNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-muted rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <BookX className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Manga Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Oops! The manga you're looking for doesn't exist or may have been removed.
          </p>
          <p className="text-muted-foreground">
            Don't worry, there are plenty of other great manga to discover!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Browse Manga
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Search className="mr-2 h-4 w-4" />
              Search Manga
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}