"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SiteLayout } from "@/components/layout/site-layout";
import { EventGrid } from "@/components/events/event-grid";
import { fetchEvents, fetchCategories } from "@/lib/api";
import type { Event } from "@/lib/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function EventsPage() {
  const router = useRouter();
  const [category, setCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState("upcoming");
  const [priceFilter, setPriceFilter] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories on component mount
  useEffect(() => {
    async function loadCategories() {
      setIsLoadingCategories(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  // Fetch events when filters change
  useEffect(() => {
    async function loadEvents() {
      setIsLoadingEvents(true);
      try {
        const data = await fetchEvents({
          category: category !== "all" ? category : undefined,
          page: currentPage,
          limit: 9,
        });
        setEvents(data);
        // In a real app, you would get total pages from the API
        setTotalPages(Math.ceil(data.length / 9) || 1);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    }

    loadEvents();
  }, [category, currentPage]);

  const handleApplyFilters = () => {
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Events</h1>
            <p className="text-muted-foreground">
              Discover and book amazing events
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="w-full md:w-[300px] appearance-none pl-8"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="w-full sm:w-[240px] space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Filters</h3>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Category</h4>
                {isLoadingCategories ? (
                  <LoadingSpinner />
                ) : (
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Date</h4>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Price Range</h4>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="under50">Under $50</SelectItem>
                    <SelectItem value="50to100">$50 - $100</SelectItem>
                    <SelectItem value="100to200">$100 - $200</SelectItem>
                    <SelectItem value="over200">Over $200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleApplyFilters}
              disabled={isLoadingEvents}
            >
              Apply Filters
            </Button>
          </div>

          <div className="flex-1">
            <EventGrid events={events} isLoading={isLoadingEvents} />

            {!isLoadingEvents && events.length > 0 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={
                        currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      className={
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
