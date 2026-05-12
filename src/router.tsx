import { createBrowserRouter } from "react-router";

import { RequireAuth, RedirectIfAuthed } from "@/shared/components/auth/RequireAuth";
import { RootError } from "@/pages/RootError";
import { NotFound } from "@/pages/NotFound";
import { HomePage } from "@/pages/HomePage";
import { AuthLayout } from "@/pages/auth/Layout";
import { LoginPage } from "@/pages/auth/Login";
import { RegisterPage } from "@/pages/auth/Register";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPassword";
import { MainLayout } from "@/pages/main/Layout";
import { DemoPage } from "@/pages/main/Demo";
import { VetsPage } from "@/pages/main/Vets";
import { VetDetailPage } from "@/pages/main/VetDetail";
import { ProductsPage } from "@/pages/main/Products";
import { ProductDetailPage } from "@/pages/main/ProductDetail";
import { DashboardLayout } from "@/pages/dashboard/Layout";
import { DashboardPage } from "@/pages/dashboard/Dashboard";
import { ProfilePage } from "@/pages/dashboard/Profile";
import { BookingsPage } from "@/pages/dashboard/Bookings";
import { MessagesPage } from "@/pages/dashboard/Messages";
import { VetDashboardPage } from "@/pages/dashboard/vet/Vet";
import { VetAvailabilityPage } from "@/pages/dashboard/vet/Availability";
import { VetEarningsPage } from "@/pages/dashboard/vet/Earnings";
import { VetReviewsPage } from "@/pages/dashboard/vet/Reviews";
import { SellerProductsPage } from "@/pages/dashboard/seller/Products";
import { AdminLayout } from "@/pages/admin/Layout";
import { AdminPage } from "@/pages/admin/Admin";
import { AdminUsersPage } from "@/pages/admin/Users";
import { AdminListingsPage } from "@/pages/admin/Listings";

export const router = createBrowserRouter([
  {
    errorElement: <RootError />,
    children: [
      // ── Home ────────────────────────────────────────────────────────────
      {
        path: "/",
        element: <HomePage />,
      },

      // ── Auth group (redirect to dashboard if already signed in) ─────────
      {
        element: <RedirectIfAuthed />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: "/login", element: <LoginPage /> },
              { path: "/register", element: <RegisterPage /> },
              { path: "/forgot-password", element: <ForgotPasswordPage /> },
            ],
          },
        ],
      },

      // ── Main / public layout ─────────────────────────────────────────────
      {
        element: <MainLayout />,
        children: [
          { path: "/demo", element: <DemoPage /> },
          { path: "/vets", element: <VetsPage /> },
          { path: "/vets/:vetId", element: <VetDetailPage /> },
          { path: "/products", element: <ProductsPage /> },
          { path: "/products/:productId", element: <ProductDetailPage /> },
        ],
      },

      // ── Dashboard (requires auth, any role) ──────────────────────────────
      {
        element: <RequireAuth />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "/dashboard", element: <DashboardPage /> },
              { path: "/dashboard/profile", element: <ProfilePage /> },
              { path: "/dashboard/bookings", element: <BookingsPage /> },
              { path: "/dashboard/messages", element: <MessagesPage /> },
              // Vet-only routes
              {
                element: <RequireAuth role="vet" />,
                children: [
                  { path: "/dashboard/vet", element: <VetDashboardPage /> },
                  { path: "/dashboard/vet/availability", element: <VetAvailabilityPage /> },
                  { path: "/dashboard/vet/earnings", element: <VetEarningsPage /> },
                  { path: "/dashboard/vet/reviews", element: <VetReviewsPage /> },
                ],
              },
              // Seller-only routes
              {
                element: <RequireAuth role="seller" />,
                children: [
                  { path: "/dashboard/seller/products", element: <SellerProductsPage /> },
                ],
              },
            ],
          },
        ],
      },

      // ── Admin (requires admin role) ──────────────────────────────────────
      {
        element: <RequireAuth role="admin" />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "/admin", element: <AdminPage /> },
              { path: "/admin/users", element: <AdminUsersPage /> },
              { path: "/admin/listings", element: <AdminListingsPage /> },
            ],
          },
        ],
      },

      // ── 404 ─────────────────────────────────────────────────────────────
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
], {
  // Vite sets BASE_URL to the configured base path:
  //   - production (GitHub Pages): "/vetgo/"
  //   - local dev:                 "/"
  // Without this, React Router tries to match "/vetgo/login" against "/login"
  // and finds nothing, showing a 404 on every hard navigation.
  basename: import.meta.env.BASE_URL,
});
