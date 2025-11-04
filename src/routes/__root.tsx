import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TailwindIndicator } from "~/components/TailwindIndicator.tsx";
import { siteConfig } from "~/config/site.ts";
import { generated } from "~/generated/env.ts";
import { cn } from "~/lib/utils.ts";
import { Icon } from "~/components/ui/icon.tsx";
import { buttonVariants } from "~/components/ui/button.tsx";
import { ThemeSwitch } from "~/components/ThemeSwitch.tsx";

const RootLayout = () => (
  <>
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img
              src="/img/logo.webp"
              alt="Logo"
              height="128"
              width="128"
              className="h-8 w-8"
            />
            <span className="font-bold inline-block">{siteConfig.name}</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <nav className="flex items-center">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(buttonVariants({ variant: "ghost" }), "w-9 px-0")}
              >
                <Icon name="github-logo" size="sm">
                  <span className="sr-only">GitHub</span>
                </Icon>
              </div>
            </a>
            <ThemeSwitch />
          </nav>
        </div>
      </div>
    </header>
    <main className="container flex-1 items-start relative py-6 lg:gap-10 lg:py-8">
      <Outlet />
    </main>
    <footer className="space-y-2 py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by ToppleTheNun. The source code is available on{" "}
          <a
            href={`${siteConfig.links.github}/tree/${generated.COMMIT_SHA}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Using and inspired by{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </a>
          .
        </p>
      </div>
    </footer>
    <TailwindIndicator />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
