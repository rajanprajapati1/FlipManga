import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-6 max-w-md">
        <AlertCircle className="w-20 h-20 text-muted-foreground mx-auto" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}