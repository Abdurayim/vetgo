import { Link } from "react-router";
import { Stethoscope } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              to={ROUTES.home}
              className="flex items-center gap-2 font-bold"
            >
              <Stethoscope className="h-5 w-5 text-primary" />
              VetGo
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Connecting pet owners with trusted veterinarians and quality
              products.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to={ROUTES.vets} className="hover:text-foreground">
                  Find a Vet
                </Link>
              </li>
              <li>
                <Link to={ROUTES.products} className="hover:text-foreground">
                  Shop Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Account</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to={ROUTES.login} className="hover:text-foreground">
                  Sign in
                </Link>
              </li>
              <li>
                <Link to={ROUTES.register} className="hover:text-foreground">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="cursor-default">About</span>
              </li>
              <li>
                <span className="cursor-default">Contact</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} VetGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
