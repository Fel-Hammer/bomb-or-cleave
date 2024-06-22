import { invariantResponse } from "@epic-web/invariant";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import { json } from "@vercel/remix";

import { H1, H2, H3, H4, Lead, Paragraph } from "~/components/typography.tsx";
import { Badge } from "~/components/ui/badge.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table.tsx";
import {
  abilityMultiplierAppliedName,
  findEnhancedSeasonByName,
  stackingMultiplierAppliedName,
} from "~/data/seasons.ts";
import { serverTiming } from "~/lib/constants.ts";
import { combineHeaders } from "~/lib/misc.ts";
import { makeTimings } from "~/lib/timing.server.ts";

export function loader({ params }: LoaderFunctionArgs) {
  invariantResponse(
    "season" in params && params.season,
    "Missing season parameter",
  );

  const season = findEnhancedSeasonByName(params.season);
  invariantResponse(season, "Unable to find season by provided name");

  const timings = makeTimings(`${season.name} loader`);

  return json(
    { season },
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
        <H1>Should I Spirit Bomb or should I Soul Cleave?</H1>
        <Lead>
          Efficiency calculator for Spirit Bomb and Soul Cleave in{" "}
          {season.description}.
        </Lead>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Baseline</CardTitle>
            <CardDescription>
              Effective AP ratios in single target with no conditional
              multipliers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ability</TableHead>
                  <TableHead className="hidden text-center sm:table-cell ">
                    Verdict
                  </TableHead>
                  <TableHead className="text-right">AP Ratio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Soul Cleave</TableCell>
                  <TableCell className="hidden sm:table-cell" />
                  <TableCell className="text-right">
                    {season.soulCleaveBaseApRatio.value.toPrecision(5)}
                  </TableCell>
                </TableRow>
                {season.spiritBombBaseApRatios.map((apRatio) => (
                  <TableRow
                    key={`spirit-bomb-${String(apRatio.soulFragments)}-soul-fragments`}
                  >
                    <TableCell className="font-medium">
                      Spirit Bomb at {String(apRatio.soulFragments)} Soul
                      Fragments
                    </TableCell>
                    <TableCell className="hidden text-center sm:table-cell">
                      {apRatio.value > season.soulCleaveBaseApRatio.value ? (
                        <Badge>Use Spirit Bomb</Badge>
                      ) : (
                        <Badge variant="secondary">Use Soul Cleave</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {apRatio.value.toPrecision(5)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <section className="pb-8 space-y-3">
          <div className="space-y-2">
            <H2>Soul Cleave</H2>
            <Lead>Base AP Ratio: {season.apRatios.soulCleave}</Lead>
            <Lead>
              Effective AP Ratio: {season.soulCleaveBaseApRatio.value}
            </Lead>
          </div>
          <div className="space-y-2">
            <H3>Applied Multipliers</H3>
            <Paragraph>
              {season.soulCleaveBaseApRatio.appliedMultipliers.join(", ")}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <H3>Available Multipliers</H3>
            <div className="space-y-2">
              <H4>Always On Multipliers</H4>
              <Paragraph>
                {season.alwaysOnMultipliers
                  .filter(
                    (it) => it.ability === "cleave" || it.ability === "both",
                  )
                  .map(abilityMultiplierAppliedName)
                  .join(", ")}
              </Paragraph>
            </div>
            <div className="space-y-2">
              <H4>Conditional Multipliers</H4>
              <Paragraph>
                {season.conditionalMultipliers
                  .filter(
                    (it) => it.ability === "cleave" || it.ability === "both",
                  )
                  .map(abilityMultiplierAppliedName)
                  .join(", ")}
              </Paragraph>
            </div>
            <div className="space-y-2">
              <H4>Stacking Multipliers</H4>
              <Paragraph>
                {season.stackingMultipliers
                  .filter(
                    (it) => it.ability === "cleave" || it.ability === "both",
                  )
                  .map(stackingMultiplierAppliedName)
                  .join(", ")}
              </Paragraph>
            </div>
          </div>
        </section>
        <section className="pb-8 space-y-3">
          <div className="space-y-2">
            <H2>Spirit Bomb</H2>
            <Lead>
              Base AP Ratio per Soul Fragment:{" "}
              {season.apRatios.spiritBombPerSoulFragment}
            </Lead>
            <Lead>
              Effective AP Ratio per Soul Fragment:{" "}
              {season.spiritBombBaseApRatioPerSoulFragment.value}
            </Lead>
          </div>
          <div className="space-y-2">
            <H3>Applied Multipliers</H3>
            <Paragraph>
              {season.spiritBombBaseApRatioPerSoulFragment.appliedMultipliers.join(
                ", ",
              )}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <H3>Available Multipliers</H3>
            <div className="space-y-2">
              <H4>Always On Multipliers</H4>
              <Paragraph>
                {season.alwaysOnMultipliers
                  .filter(
                    (it) => it.ability === "bomb" || it.ability === "both",
                  )
                  .map(abilityMultiplierAppliedName)
                  .join(", ")}
              </Paragraph>
            </div>
            <div className="space-y-2">
              <H4>Conditional Multipliers</H4>
              <Paragraph>
                {season.conditionalMultipliers
                  .filter(
                    (it) => it.ability === "bomb" || it.ability === "both",
                  )
                  .map(abilityMultiplierAppliedName)
                  .join(", ")}
              </Paragraph>
            </div>
            <div className="space-y-2">
              <H4>Stacking Multipliers</H4>
              <Paragraph>
                {season.stackingMultipliers
                  .filter(
                    (it) => it.ability === "bomb" || it.ability === "both",
                  )
                  .map(stackingMultiplierAppliedName)
                  .join(", ")}
              </Paragraph>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
