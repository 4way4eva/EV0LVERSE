import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Users, CircleDot } from "lucide-react";
import type { EvolEvent } from "@shared/schema";

export default function EventsPage() {
  const { data: events, isLoading } = useQuery<EvolEvent[]>({
    queryKey: ['/api/evol-events'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  const upcomingEvents = events?.filter(e => e.status === 'Upcoming') || [];
  const liveEvents = events?.filter(e => e.status === 'Live') || [];
  const completedEvents = events?.filter(e => e.status === 'Completed') || [];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent" data-testid="text-page-title">
              EVOL Events & Sports
            </h1>
            <p className="text-muted-foreground text-lg">
              Tournaments, concerts, conferences, and competitions in the EvolVerse
            </p>
          </div>
        </div>
      </div>

      {/* Live Events */}
      {liveEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-2xl font-bold text-red-500" data-testid="text-live-title">Live Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden border-red-500/50 hover-elevate" data-testid={`card-live-event-${event.id}`}>
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-event-${event.id}`}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="destructive" className="animate-pulse flex items-center gap-1">
                      <CircleDot className="w-3 h-3" />
                      LIVE
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit" data-testid={`badge-category-${event.id}`}>
                    {event.category}
                  </Badge>
                  <CardTitle className="text-2xl" data-testid={`text-title-${event.id}`}>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {event.venue && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.venue}</span>
                    </div>
                  )}
                  {event.attendees && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees.toLocaleString()} attendees</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold" data-testid="text-upcoming-title">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-upcoming-event-${event.id}`}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-event-thumb-${event.id}`}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" data-testid={`badge-category-small-${event.id}`}>
                      {event.category}
                    </Badge>
                    <Badge variant="secondary">
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2" data-testid={`text-title-small-${event.id}`}>
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{event.venue}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Events */}
      {completedEvents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold" data-testid="text-completed-title">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover-elevate active-elevate-2 opacity-80" data-testid={`card-completed-event-${event.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    data-testid={`img-event-completed-${event.id}`}
                  />
                </div>
                <CardHeader>
                  <Badge variant="outline" className="w-fit opacity-60">
                    {event.category}
                  </Badge>
                  <CardTitle className="text-base line-clamp-2">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
