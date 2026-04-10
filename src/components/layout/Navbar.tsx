import { siteConfig } from "@/config/site";

import { BrandLogo } from "./BrandLogo";
import { ActionLink } from "../ui/ActionLink";
import { Container } from "../ui/Container";

/**
 * Floating navbar with centered navigation and primary chat CTA.
 */
export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-5">
      <Container as="div">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-pill border border-white/20 bg-[#07090da1] px-4 py-3 shadow-ambient-lg sm:px-6">
          <BrandLogo compact plainIcon />
          <nav className="hidden items-center gap-7 md:flex">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#cfd4dc] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ActionLink
            href={siteConfig.routes.chat}
            className="px-4 py-2 text-xs sm:text-sm"
          >
            Ir al chat
          </ActionLink>
        </div>
      </Container>
    </header>
  );
}
