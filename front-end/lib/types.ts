export interface Event {
  id: string
  title: string
  description: string
  longDescription?: string
  date: string
  time?: string
  location?: string
  price: string
  category: string
  image: string
  organizer?: string
  rating?: number
  reviews?: number
  attendees?: number
}

