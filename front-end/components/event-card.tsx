"use client"

import Image from "next/image"
import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export interface EventCardProps {
  id?: string
  title: string
  description: string
  date: string
  price: string
  category: string
  image: string
  onBookNow?: () => void
}

export function EventCard({ id, title, description, date, price, category, image, onBookNow }: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[16/9] relative">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 mt-4 text-sm">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>{date}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="font-bold">{price}</span>
        <Button size="sm" onClick={onBookNow}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}

