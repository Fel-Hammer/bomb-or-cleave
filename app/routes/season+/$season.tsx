import { invariantResponse } from "@epic-web/invariant";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import { json } from "@vercel/remix";

import { H1, H2, H3, H4, Lead, Paragraph } from "~/components/typography.tsx";
import type {
  AbilityMultiplier,
  ConditionalAbilityMultiplier,
  StackingAbilityMultiplier,
} from "~/data/seasons.ts";
import { findSeasonByName } from "~/data/seasons.ts";
import { serverTiming } from "~/lib/constants.ts";
import { combineHeaders } from "~/lib/misc.ts";
import { makeTimings } from "~/lib/timing.server.ts";

interface MultiplierResult {
  value: number;
  appliedMultipliers: string[];
}

function abilityMultiplierAppliedName(multiplier: AbilityMultiplier) {
  return `${multiplier.appliedName} (${String(multiplier.value)})`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function abilityMultiplierNotAppliedName(
  multiplier: ConditionalAbilityMultiplier,
) {
  return multiplier.notAppliedName;
}

function stackingMultiplierAppliedName(multiplier: StackingAbilityMultiplier) {
  return `${multiplier.appliedName} (${String(multiplier.value)} per stack [max ${String(multiplier.maxStacks)}])`;
}

export function loader({ params }: LoaderFunctionArgs) {
  invariantResponse(
    "season" in params && params.season,
    "Missing season parameter",
  );

  const season = findSeasonByName(params.season);
  invariantResponse(season, "Unable to find season by provided name");

  const timings = makeTimings(`${season.name} loader`);

  const soulCleaveBaseApRatio = season.alwaysOnMultipliers
    .filter((it) => it.ability === "cleave" || it.ability === "both")
    .reduce<MultiplierResult>(
      (acc, multiplier) => ({
        value: acc.value * multiplier.value,
        appliedMultipliers: [
          ...acc.appliedMultipliers,
          abilityMultiplierAppliedName(multiplier),
        ],
      }),
      {
        value: season.apRatios.soulCleave,
        appliedMultipliers: [],
      },
    );
  const spiritBombBaseApRatioPerSoulFragment = season.alwaysOnMultipliers
    .filter((it) => it.ability === "bomb" || it.ability === "both")
    .reduce<MultiplierResult>(
      (acc, multiplier) => ({
        value: acc.value * multiplier.value,
        appliedMultipliers: [
          ...acc.appliedMultipliers,
          abilityMultiplierAppliedName(multiplier),
        ],
      }),
      {
        value: season.apRatios.spiritBombPerSoulFragment,
        appliedMultipliers: [],
      },
    );

  const enhancedSeason = {
    ...season,
    soulCleaveBaseApRatio,
    spiritBombBaseApRatioPerSoulFragment,
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
        <H1>Should I Spirit Bomb or should I Soul Cleave?</H1>
        <Lead>
          Efficiency calculator for Spirit Bomb and Soul Cleave in{" "}
          {season.description}.
        </Lead>
      </div>
      <section className="pb-8 space-y-3">
        <div className="space-y-2">
          <H2>Soul Cleave</H2>
          <Lead>Base AP Ratio: {season.apRatios.soulCleave}</Lead>
          <Lead>Effective AP Ratio: {season.soulCleaveBaseApRatio.value}</Lead>
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
                .filter((it) => it.ability === "bomb" || it.ability === "both")
                .map(abilityMultiplierAppliedName)
                .join(", ")}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <H4>Conditional Multipliers</H4>
            <Paragraph>
              {season.conditionalMultipliers
                .filter((it) => it.ability === "bomb" || it.ability === "both")
                .map(abilityMultiplierAppliedName)
                .join(", ")}
            </Paragraph>
          </div>
          <div className="space-y-2">
            <H4>Stacking Multipliers</H4>
            <Paragraph>
              {season.stackingMultipliers
                .filter((it) => it.ability === "bomb" || it.ability === "both")
                .map(stackingMultiplierAppliedName)
                .join(", ")}
            </Paragraph>
          </div>
        </div>
      </section>
    </>
  );
}
