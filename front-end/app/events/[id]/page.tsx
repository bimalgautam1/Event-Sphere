"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, CalendarDays, Clock, MapPin, Share, Star, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteLayout } from "@/components/layout/site-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { fetchEventById } from "@/lib/api"
import type { Event } from "@/lib/types"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [ticketCount, setTicketCount] = useState("1")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEvent() {
      setIsLoading(true)
      setError(null)

      try {
        const eventData = await fetchEventById(params.id)
        if (eventData) {
          setEvent(eventData)
        } else {
          setError("Event not found")
          // Redirect after a short delay
          setTimeout(() => router.push("/events"), 2000)
        }
      } catch (error) {
        setError("Failed to load event details")
        console.error("Error loading event:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEvent()
  }, [params.id, router])

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="container py-12 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </SiteLayout>
    )
  }

  if (error || !event) {
    return (
      <SiteLayout>
        <div className="container py-12 flex flex-col items-center justify-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button asChild>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </SiteLayout>
    )
  }

  return (
    <SiteLayout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm font-medium mb-6 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                width={1200}
                height={600}
                className="w-full object-cover aspect-[2/1]"
              />
              <Badge className="absolute top-4 right-4 text-sm px-3 py-1">{event.category}</Badge>
            </div>

            <div>
              <h1 className="text-3xl font-bold">{event.title}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
              {event.rating && event.reviews && (
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{event.rating}</span>
                    <span className="text-muted-foreground ml-1">({event.reviews} reviews)</span>
                  </div>
                  {event.attendees && (
                    <>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-muted-foreground">{event.attendees} attendees</span>
                      </div>
                    </>
                  )}
                  <Button variant="ghost" size="sm" className="ml-auto gap-1">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-line">{event.longDescription || event.description}</p>
            </div>

            {event.organizer && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <CalendarDays className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-sm text-muted-foreground">Event Organizer</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Contact
                  </Button>
                </div>
              </div>
            )}

            {event.location && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden border aspect-video bg-muted flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Map view would appear here</span>
                </div>
                <p className="mt-2 text-muted-foreground">{event.location}</p>
              </div>
            )}
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">{event.price}</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Date</p>
                  <div className="flex items-center gap-2 p-2 border rounded-md">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Number of Tickets</p>
                  <Select value={ticketCount} onValueChange={setTicketCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tickets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Ticket</SelectItem>
                      <SelectItem value="2">2 Tickets</SelectItem>
                      <SelectItem value="3">3 Tickets</SelectItem>
                      <SelectItem value="4">4 Tickets</SelectItem>
                      <SelectItem value="5">5 Tickets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">Book Now</Button>
                <p className="text-xs text-center text-muted-foreground">You won't be charged yet</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

