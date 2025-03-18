import type { Event } from "@/lib/types";
import { EventCard } from "@/components/event-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Link from "next/link";

interface EventGridProps {
  events: Event[];
  isLoading?: boolean;
}

export function EventGrid({ events, isLoading = false }: EventGridProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No events found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            price={event.price}
            category={event.category}
            image={event.image}
          />
        </Link>
      ))}
    </div>
  );
}
