export const ROUTES = {
  home: "/",
  // Auth
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  // Public
  demo: "/demo",
  vets: "/vets",
  vet: (id: string) => `/vets/${id}`,
  products: "/products",
  product: (id: string) => `/products/${id}`,
  // Dashboard
  dashboard: "/dashboard",
  bookings: "/dashboard/bookings",
  booking: (id: string) => `/dashboard/bookings/${id}`,
  messages: "/dashboard/messages",
  conversation: (id: string) => `/dashboard/messages/${id}`,
  profile: "/dashboard/profile",
  // Vet dashboard
  vetDashboard: "/dashboard/vet",
  vetAvailability: "/dashboard/vet/availability",
  vetEarnings: "/dashboard/vet/earnings",
  vetReviews: "/dashboard/vet/reviews",
  // Seller dashboard
  sellerProducts: "/dashboard/seller/products",
  sellerNewProduct: "/dashboard/seller/products/new",
  sellerEditProduct: (id: string) => `/dashboard/seller/products/${id}/edit`,
  // Admin
  admin: "/admin",
  adminUsers: "/admin/users",
  adminListings: "/admin/listings",
} as const;
