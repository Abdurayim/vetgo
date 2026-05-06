import { Link } from "react-router";
import {
  Stethoscope,
  ShoppingBag,
  Shield,
  Star,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/utils";

const FEATURED_VETS = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Small Animals",
    rating: 4.9,
    reviews: 214,
    city: "San Francisco",
    fee: 85,
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Dr. James Okafor",
    specialty: "Exotic Animals",
    rating: 4.8,
    reviews: 178,
    city: "New York",
    fee: 110,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&auto=format",
  },
  {
    name: "Dr. Lena Müller",
    specialty: "Surgery & Ortho",
    rating: 5.0,
    reviews: 96,
    city: "Chicago",
    fee: 130,
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&auto=format",
  },
];

const STATS = [
  { value: "10,000+", label: "Pet owners" },
  { value: "1,200+", label: "Verified vets" },
  { value: "98%", label: "Satisfaction" },
  { value: "50+", label: "Cities" },
];

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <title>VetGo — Your pet's health, always first</title>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1800&h=900&fit=crop&auto=format"
            alt="Veterinarian examining a golden retriever"
            className="h-full w-full object-cover object-center brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/50 to-primary/10" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-primary/20 blur-[140px]"
        />

        <div className="container mx-auto flex min-h-[88vh] flex-col items-start justify-center px-4 py-24 md:px-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Left — copy */}
          <div className="max-w-2xl flex-1">
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 border-primary/40 bg-primary/10 text-primary"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Trusted by 10,000+ pet owners
            </Badge>

            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your pet&apos;s health,{" "}
              <span className="text-primary">always first.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Find licensed veterinarians near you, book in seconds, and shop
              vet-approved products — all in one beautiful platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to={ROUTES.vets}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 px-8 text-base shadow-lg shadow-primary/30"
                )}
              >
                Find a Vet
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={ROUTES.products}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "gap-2 border-white/20 bg-white/10 px-8 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white"
                )}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Products
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 text-sm text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="relative mt-14 hidden lg:mt-0 lg:flex lg:shrink-0 lg:flex-col gap-4">
            <div className="relative h-72 w-64 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop&auto=format"
                alt="Happy dog being examined"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-medium text-white/80">In-clinic visit</p>
                <p className="text-sm font-semibold text-white">Golden Retriever · Max</p>
              </div>
            </div>

            <div className="relative ml-auto h-48 w-52 -mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=350&fit=crop&auto=format"
                alt="Cat at vet"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-sm font-semibold text-white">Telemedicine</p>
              </div>
            </div>

            <div className="absolute -right-6 top-8 flex items-center gap-2 rounded-full border border-white/15 bg-background/80 px-3.5 py-2 shadow-xl backdrop-blur">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">4.9 / 5</span>
            </div>

            <div className="absolute -left-8 bottom-24 flex items-center gap-2.5 rounded-xl border border-white/15 bg-background/80 px-3.5 py-2.5 shadow-xl backdrop-blur">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Stethoscope className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Appointment booked</p>
                <p className="text-[11px] text-muted-foreground">Today, 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED VETS ────────────────────────────────────────────────── */}
      <section className="border-t border-border/50 bg-card/40 px-4 py-20">
        <div className="container mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
            Top rated
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold sm:text-3xl">
            Meet our featured vets
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
            Every vet on VetGo is license-verified and reviewed by real pet owners.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_VETS.map((vet) => (
              <Link
                key={vet.name}
                to={ROUTES.vets}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={vet.img}
                    alt={vet.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                  <Badge
                    variant="secondary"
                    className="absolute right-3 top-3 text-xs"
                  >
                    {vet.specialty}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <h3 className="font-semibold">{vet.name}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {vet.rating} ({vet.reviews})
                      </span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3" />
                        {vet.city}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      From ${vet.fee}
                    </span>
                    <span className="text-xs font-medium text-primary group-hover:underline">
                      Book now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to={ROUTES.vets}
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              See all vets
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
            Why VetGo
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold sm:text-3xl">
            Built for your pet&apos;s wellbeing
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Stethoscope className="h-6 w-6" />,
                title: "Verified Vets",
                description:
                  "Every veterinarian is license-verified. Browse profiles, read reviews, and book in minutes.",
              },
              {
                icon: <ShoppingBag className="h-6 w-6" />,
                title: "Trusted Marketplace",
                description:
                  "Shop vet-approved food, supplements, and medicines. All products are moderated for quality.",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Secure & Private",
                description:
                  "Your data is encrypted end-to-end. We never share your information with third parties.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md hover:shadow-primary/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1400&h=600&fit=crop&auto=format"
            alt="Pets being cared for"
            className="h-full w-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>

        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to find the perfect vet?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Join thousands of pet owners who trust VetGo for expert care and
            quality products.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.register}
              className={cn(
                buttonVariants({ size: "lg" }),
                "px-8 shadow-lg shadow-primary/30"
              )}
            >
              Get started — it&apos;s free
            </Link>
            <Link
              to={ROUTES.demo}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "px-8"
              )}
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
