import { Link } from "react-router";
import {
  Search,
  CalendarCheck,
  MessageSquare,
  ShoppingBag,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Package,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/constants/routes";

const MEMBERS = [
  {
    id: "sarah",
    role: "Veterinarian",
    roleColor: "text-emerald-400",
    roleBg: "bg-emerald-400/10 border-emerald-400/20",
    name: "Dr. Sarah Chen",
    initials: "SC",
    avatarBg: "bg-emerald-500/20 text-emerald-400",
    city: "San Francisco, CA",
    specialty: "Dogs · Cats · Surgery",
    years: 9,
    rating: 4.9,
    reviews: 142,
    fee: "$55 / visit",
    bio: "Before VetPlatform, 60 % of my week was spent chasing bookings by phone. Now I manage everything — availability, messages, payments — from one dashboard.",
    quote: "I doubled my client base in 3 months without any extra marketing.",
  },
  {
    id: "marcus",
    role: "Pet Owner",
    roleColor: "text-blue-400",
    roleBg: "bg-blue-400/10 border-blue-400/20",
    name: "Marcus Williams",
    initials: "MW",
    avatarBg: "bg-blue-500/20 text-blue-400",
    city: "Austin, TX",
    specialty: "Golden Retriever owner",
    years: null,
    rating: null,
    reviews: null,
    fee: null,
    bio: "My dog Buddy had a swollen paw at 9 pm. I found a verified vet within 5 km, booked a telemedicine call, and had a diagnosis in 20 minutes. No waiting room stress.",
    quote: "I used to drive 40 minutes to the nearest vet I could trust. Now I just open the app.",
  },
  {
    id: "elena",
    role: "Seller",
    roleColor: "text-amber-400",
    roleBg: "bg-amber-400/10 border-amber-400/20",
    name: "Elena Petrov",
    initials: "EP",
    avatarBg: "bg-amber-500/20 text-amber-400",
    city: "Chicago, IL",
    specialty: "Organic pet nutrition",
    years: null,
    rating: 4.7,
    reviews: 89,
    fee: null,
    bio: "My small-batch pet food brand had no way to reach customers who actually care about ingredient quality. VetPlatform put my products in front of owners who already trust their vets.",
    quote: "Sales grew 3× in the first quarter. Vet recommendations drive real purchases.",
  },
] as const;

const BEFORE_AFTER = [
  {
    icon: <Search className="h-5 w-5" />,
    problem: "Searching for a vet means scrolling through Google, Yelp, and Facebook groups — no way to verify credentials.",
    solution: "Every vet on VetPlatform is license-verified and reviewed by real pet owners.",
  },
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    problem: "Booking an appointment requires phone calls, voicemails, and back-and-forth texts.",
    solution: "Real-time availability. Book in 30 seconds, get instant confirmation.",
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    problem: "After the visit, follow-up questions go unanswered or get lost in email.",
    solution: "Built-in messaging thread per booking. Your vet is one tap away.",
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    problem: "Buying medication or food online means choosing from thousands of untested options.",
    solution: "A curated marketplace — sellers are vetted, prescriptions gated behind vet approval.",
  },
] as const;

const STEPS = [
  { n: "01", label: "Create an account", sub: "Choose your role — pet owner, vet, or seller. Takes 60 seconds." },
  { n: "02", label: "Find or list", sub: "Search vets by location, specialty, and price. Or list your practice and start accepting bookings." },
  { n: "03", label: "Book & connect", sub: "Choose in-clinic, home visit, or telemedicine. Confirm your appointment instantly." },
  { n: "04", label: "Message & follow up", sub: "Chat with your vet directly. Get prescriptions, refill reminders, and advice in one thread." },
] as const;

export function DemoPage() {
  return (
    <div className="min-h-screen">
      <title>How it works — VetGo</title>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/50 px-4 py-24 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[500px] w-[700px] rounded-full bg-primary/8 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-2xl">
          <Badge className="mb-5 border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">
            Platform overview
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Pet care is <span className="text-primary">broken.</span>
            <br />We&apos;re fixing it.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Finding a trusted vet, booking an appointment, getting follow-up care, and
            buying safe products — these are still four separate, frustrating experiences.
            VetPlatform puts them all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to={ROUTES.register} className={cn(buttonVariants({ size: "lg" }), "px-8 shadow-lg shadow-primary/20")}>
              Join for free
            </Link>
            <Link to={ROUTES.vets} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "px-8")}>
              Browse vets
            </Link>
          </div>
        </div>
      </section>

      {/* ── Before / After ────────────────────────────────────────────────── */}
      <section className="border-b border-border/50 px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-3">The problem</p>
          <h2 className="text-center text-2xl font-bold mb-12">What pet owners deal with every day</h2>
          <div className="space-y-4">
            {BEFORE_AFTER.map(({ problem, solution }) => (
              <div
                key={problem}
                className="grid gap-4 rounded-xl border border-border/60 bg-card p-5 sm:grid-cols-2"
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <XCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Before</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{problem}</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:border-l sm:border-border/40 sm:pl-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">After</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="border-b border-border/50 bg-card/30 px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-3">How it works</p>
          <h2 className="text-center text-2xl font-bold mb-12">Up and running in minutes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ n, label, sub }) => (
              <div key={n} className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5">
                <span className="text-3xl font-black text-primary/20 leading-none">{n}</span>
                <div>
                  <h3 className="font-semibold text-sm">{label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community members ─────────────────────────────────────────────── */}
      <section className="border-b border-border/50 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary mb-3">Our community</p>
          <h2 className="text-center text-2xl font-bold mb-3">Meet the people on VetPlatform</h2>
          <p className="text-center text-sm text-muted-foreground mb-12">
            Three perspectives — one platform.{" "}
            <span className="text-muted-foreground/60">(Profiles are illustrative — real members coming soon.)</span>
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {MEMBERS.map((m) => (
              <div key={m.id} className="flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden">
                <div className="flex items-start gap-4 p-5 pb-4 border-b border-border/40">
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold", m.avatarBg)}>
                    {m.initials}
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-sm">{m.name}</span>
                    <span className={cn("mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", m.roleBg, m.roleColor)}>
                      {m.role}
                    </span>
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {m.city}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 px-5 py-3 border-b border-border/40 text-xs text-muted-foreground">
                  {m.specialty && (
                    <span className="flex items-center gap-1">
                      {m.role === "Veterinarian" ? <Stethoscope className="h-3 w-3" /> : <Package className="h-3 w-3" />}
                      {m.specialty}
                    </span>
                  )}
                  {m.rating && (
                    <span className="ml-auto flex items-center gap-0.5 text-amber-400 font-medium">
                      <Star className="h-3 w-3 fill-amber-400" />
                      {m.rating}
                      <span className="text-muted-foreground font-normal ml-0.5">({m.reviews})</span>
                    </span>
                  )}
                </div>
                {(m.years || m.fee) && (
                  <div className="flex gap-4 px-5 py-2.5 border-b border-border/40 text-xs text-muted-foreground">
                    {m.years && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {m.years} yrs experience
                      </span>
                    )}
                    {m.fee && (
                      <span className="flex items-center gap-1 ml-auto text-foreground font-medium">
                        <ShieldCheck className="h-3 w-3 text-primary" />
                        {m.fee}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex-1 px-5 py-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.bio}</p>
                </div>
                <div className="mx-5 mb-5 rounded-lg bg-primary/8 border border-primary/15 px-4 py-3">
                  <p className="text-xs font-medium text-primary/90 leading-relaxed">&ldquo;{m.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-border/50 bg-card/30 px-4 py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {[
              { value: "2,400+", label: "Verified vets" },
              { value: "18,000+", label: "Pet owners" },
              { value: "340+", label: "Sellers" },
              { value: "4.8 ★", label: "Avg vet rating" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-2xl font-extrabold text-primary">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="px-4 py-24 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-bold">Ready to get started?</h2>
          <p className="mt-3 text-muted-foreground">
            Join as a pet owner, list your practice as a vet, or sell your products.
            Your account is free forever.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to={ROUTES.register} className={cn(buttonVariants({ size: "lg" }), "px-10 shadow-lg shadow-primary/20")}>
              Create a free account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
