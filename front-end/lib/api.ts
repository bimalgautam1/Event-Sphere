import type { Event } from "@/lib/types"

// Base URL for API requests
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

// Fetch all events with optional filtering
export async function fetchEvents(params?: {
  category?: string
  limit?: number
  page?: number
}): Promise<Event[]> {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams()
    if (params?.category && params.category !== "all") {
      queryParams.append("category", params.category)
    }
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString())
    }
    if (params?.page) {
      queryParams.append("page", params.page.toString())
    }

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
    const response = await fetch(`${API_URL}/events${queryString}`)

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch events:", error)
    return [] // Return empty array on error
  }
}

// Fetch a single event by ID
export async function fetchEventById(id: string): Promise<Event | null> {
  try {
    const response = await fetch(`${API_URL}/events/${id}`)

    if (!response.ok) {
      throw new Error(`Error fetching event: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch event with ID ${id}:`, error)
    return null
  }
}

// Fetch all available categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/categories`)

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return [] // Return empty array on error
  }
}

