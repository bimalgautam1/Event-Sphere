import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} EventSphere. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium hover:underline">
            Terms
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline">
            Privacy
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

