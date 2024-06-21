import { invariantResponse } from "@epic-web/invariant";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import { json } from "@vercel/remix";

import { H1, H2, Lead } from "~/components/typography.tsx";
import { findSeasonByName } from "~/data/seasons.ts";
import { serverTiming } from "~/lib/constants.ts";
import { combineHeaders } from "~/lib/misc.ts";
import { makeTimings } from "~/lib/timing.server.ts";

export function loader({ params }: LoaderFunctionArgs) {
  invariantResponse(
    "season" in params && params.season,
    "Missing season parameter",
  );

  const season = findSeasonByName(params.season);
  invariantResponse(season, "Unable to find season by provided name");

  const timings = makeTimings(`${season.name} loader`);

  const enhancedSeason = {
    ...season,
  };

  return json(
    { season: enhancedSeason },
    {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      headers: combineHeaders({ [serverTiming]: timings.toString() }),
    },
  );
}

export function ErrorBoundary() {
  return (
    <>
      <div className="pb-8 space-y-2">
        <H1>You should have Bombed or Cleaved.</H1>
        <Lead>
          Doing one or the other is always better than doing nothing. Which you
          did.
        </Lead>
      </div>
      <section className="hidden md:block">
        <div className="overflow-hidden rounded-lg border bg-background px-4 shadow">
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
            <H2>404</H2>
            <Lead>Unable to find season data</Lead>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SeasonRoute() {
  const { season } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="pb-8 space-y-2">
        <H1>Should I Spirit Bomb or Should I Soul Cleave?</H1>
        <Lead>
          Efficiency calculator for Spirit Bomb and Soul Cleave in {season.name}
          .
        </Lead>
      </div>
      <section className="hidden md:block">
        <div className="overflow-hidden rounded-lg border bg-background px-4 shadow">
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
            <H2>We&apos;re building here</H2>
            <Lead>Hopefully it&apos;ll be neat.</Lead>
          </div>
        </div>
      </section>
    </>
  );
}
