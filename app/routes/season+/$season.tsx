import { invariantResponse } from "@epic-web/invariant";
import { Await, useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderFunctionArgs } from "@vercel/remix";
import { defer } from "@vercel/remix";
import { Suspense } from "react";

import { H1, H2, Lead } from "~/components/typography.tsx";
import { Badge } from "~/components/ui/badge.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card.tsx";
import { Skeleton } from "~/components/ui/skeleton.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table.tsx";
import type {
  EfficiencyTable,
  EfficientSpiritBombMultiplierResult,
} from "~/data/seasons.ts";
import {
  findEnhancedSeasonByName,
  getEfficiencyTables,
} from "~/data/seasons.ts";
import { cacheControl, serverTiming } from "~/lib/constants.ts";
import { combineHeaders } from "~/lib/misc.ts";
import { makeTimings } from "~/lib/timing.server.ts";

export const headers: HeadersFunction = () => ({
  [cacheControl]: "s-maxage=1, stale-while-revalidate=59",
});

export function loader({ params }: LoaderFunctionArgs) {
  invariantResponse(
    "season" in params && params.season,
    "Missing season parameter",
  );

  const season = findEnhancedSeasonByName(params.season);
  invariantResponse(season, "Unable to find season by provided name");

  const timings = makeTimings(`${season.name} loader`);

  return defer(
    {
      season,
      efficiencyTables: new Promise<EfficiencyTable[]>((resolve) => {
        resolve(getEfficiencyTables(season));
      }),
    },
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

function SoulCleaveTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Soul Cleave</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell" />
      <TableCell className="hidden sm:table-cell text-right">
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
    </TableRow>
  );
}

function SoulCleaveTableRow({
  efficiencyTable,
}: {
  efficiencyTable: EfficiencyTable;
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Soul Cleave</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {efficiencyTable.soulCleaveApRatio.appliedMultipliers.join(", ")}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell" />
      <TableCell className="hidden sm:table-cell text-right">
        {efficiencyTable.soulCleaveApRatio.value.toPrecision(5)}
      </TableCell>
      <TableCell className="text-right">
        {efficiencyTable.soulCleaveApRatio.valuePerFury.toPrecision(5)}
      </TableCell>
    </TableRow>
  );
}

function SpiritBombTableRowSkeleton({
  soulFragments,
}: {
  soulFragments: number;
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">
          Spirit Bomb at {String(soulFragments)} Soul Fragments
        </div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell className="hidden text-right sm:table-cell">
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
    </TableRow>
  );
}

function SpiritBombTableRow({
  efficiencyTable,
  efficientSpiritBombMultiplierResult,
}: {
  efficiencyTable: EfficiencyTable;
  efficientSpiritBombMultiplierResult: EfficientSpiritBombMultiplierResult;
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">
          Spirit Bomb at{" "}
          {String(efficientSpiritBombMultiplierResult.soulFragments)} Soul
          Fragments
        </div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {efficientSpiritBombMultiplierResult.appliedMultipliers.join(", ")}
        </div>
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        {efficientSpiritBombMultiplierResult.valuePerFury >
        efficiencyTable.soulCleaveApRatio.valuePerFury ? (
          <Badge>Use Spirit Bomb</Badge>
        ) : (
          <Badge variant="secondary">Use Soul Cleave</Badge>
        )}
      </TableCell>
      <TableCell className="hidden text-right sm:table-cell">
        {efficientSpiritBombMultiplierResult.value.toPrecision(5)}
      </TableCell>
      <TableCell className="text-right">
        {efficientSpiritBombMultiplierResult.valuePerFury.toPrecision(5)}
      </TableCell>
    </TableRow>
  );
}

function EfficiencyTableCardSkeleton() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>
          <Skeleton className="h-4 w-[300px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[250px]" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ability</TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Verdict
              </TableHead>
              <TableHead className="hidden text-right sm:table-cell">
                AP Ratio
              </TableHead>
              <TableHead className="text-right">AP Ratio / Fury</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SoulCleaveTableRowSkeleton />
            {Array(5)
              .fill(0)
              .map((_, idx) => idx + 1)
              .map((soulFragment) => (
                <SpiritBombTableRowSkeleton
                  soulFragments={soulFragment}
                  key={soulFragment}
                />
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function EfficiencyTableCard({
  efficiencyTable,
}: {
  efficiencyTable: EfficiencyTable;
}) {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>{efficiencyTable.title}</CardTitle>
        <CardDescription>{efficiencyTable.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ability</TableHead>
              <TableHead className="hidden text-center sm:table-cell">
                Verdict
              </TableHead>
              <TableHead className="hidden text-right sm:table-cell">
                AP Ratio
              </TableHead>
              <TableHead className="text-right">AP Ratio / Fury</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SoulCleaveTableRow efficiencyTable={efficiencyTable} />
            {efficiencyTable.spiritBombApRatios.map((apRatio) => (
              <SpiritBombTableRow
                efficiencyTable={efficiencyTable}
                efficientSpiritBombMultiplierResult={apRatio}
                key={`spirit-bomb-${String(apRatio.soulFragments)}-soul-fragments`}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function SeasonRoute() {
  const { season, efficiencyTables } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="pb-8 space-y-2">
        <H1>Should I Spirit Bomb or should I Soul Cleave?</H1>
        <Lead>
          Efficiency calculator for Spirit Bomb and Soul Cleave in{" "}
          {season.description}.
        </Lead>
      </div>
      <div className="space-y-4">
        <EfficiencyTableCard efficiencyTable={season.baselineEfficiencyTable} />
        <Suspense fallback={<EfficiencyTableCardSkeleton />}>
          <Await resolve={efficiencyTables}>
            {(tables) =>
              tables.map((table) => (
                <EfficiencyTableCard efficiencyTable={table} key={table.id} />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </>
  );
}
