import { CalendarDays, CheckCircle, Users, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  About EventSphere
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connecting people through memorable experiences since 2015
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                EventSphere was founded in 2015 with a simple mission: to
                connect people through memorable experiences. What started as a
                small team of event enthusiasts has grown into a leading
                platform for discovering and booking events across the globe.
              </p>
              <p className="text-muted-foreground mb-4">
                Our platform hosts thousands of events each month, from intimate
                workshops to large-scale conferences, music festivals, and
                cultural gatherings. We believe that experiences bring people
                together and create lasting memories.
              </p>
              <p className="text-muted-foreground">
                Today, EventSphere serves millions of users worldwide, helping
                them discover events that match their interests and connect with
                like-minded individuals in their communities.
              </p>
            </div>
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="EventSphere team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
              Our Mission & Values
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Quality Experiences</h3>
                    <p className="text-muted-foreground">
                      We curate high-quality events that deliver exceptional
                      experiences for attendees.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Community Building</h3>
                    <p className="text-muted-foreground">
                      We believe in the power of events to build and strengthen
                      communities.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Excellence</h3>
                    <p className="text-muted-foreground">
                      We strive for excellence in everything we do, from our
                      platform to our customer service.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Priya Sharma",
                role: "Head of Events",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Wilson",
                role: "Marketing Director",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">
                  Join Our Journey
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover amazing events and create unforgettable memories with
                  EventSphere
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/events">Explore Events</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
