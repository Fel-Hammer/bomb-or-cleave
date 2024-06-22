import fastCartesian from "fast-cartesian";

const UNKNOWN_SEASON_START_OR_ENDING = null;

export type AlternativeTooltipSource = "ptr" | "beta";

export type BombOrCleave = "bomb" | "cleave" | "both";

export interface AbilityMultiplier {
  ability: BombOrCleave;
  appliedName: string;
  value: number;
}

export interface Conditional {
  notAppliedName: string;
}

export interface Stacking {
  maxStacks: number;
}

export interface ConditionalAbilityMultiplier
  extends AbilityMultiplier,
    Conditional {}

export interface StackingAbilityMultiplier
  extends AbilityMultiplier,
    Stacking {}

export interface Season {
  name: string;
  shortName: string;
  description: string;
  slug: string;
  startDate: number | null;
  endDate: number | null;
  seasonIcon: string;
  apRatios: {
    soulCleave: number;
    spiritBombPerSoulFragment: number;
  };
  furyCost: {
    soulCleave: number;
    spiritBomb: number;
  };
  alwaysOnMultipliers: AbilityMultiplier[];
  conditionalMultipliers: ConditionalAbilityMultiplier[];
  stackingMultipliers: StackingAbilityMultiplier[];
  tooltipSource?: AlternativeTooltipSource;
}

export const seasons: readonly Season[] = [
  {
    name: "TWW S1",
    shortName: "TWW1",
    description: "The War Within season 1",
    slug: "tww-season-1",
    startDate: UNKNOWN_SEASON_START_OR_ENDING,
    endDate: UNKNOWN_SEASON_START_OR_ENDING,
    seasonIcon: "/img/thewarwithin/season1/logo.png",
    apRatios: {
      soulCleave: 1.4812,
      spiritBombPerSoulFragment: 0.35041,
    },
    furyCost: {
      soulCleave: 30,
      spiritBomb: 40,
    },
    alwaysOnMultipliers: [
      {
        ability: "bomb",
        appliedName: "Chaos Brand",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Armor Mitigation",
        value: 0.7,
      },
    ],
    conditionalMultipliers: [
      {
        ability: "cleave",
        appliedName: "Mystic Touch",
        notAppliedName: "No Mystic Touch",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Focused Cleave",
        notAppliedName: "No Focused Cleave",
        value: 1.5,
      },
      {
        ability: "bomb",
        appliedName: "Burning Blood",
        notAppliedName: "No Burning Blood",
        value: 1.1,
      },
      {
        ability: "bomb",
        appliedName: "Fiery Demise",
        notAppliedName: "No Fiery Demise",
        value: 1.4,
      },
    ],
    stackingMultipliers: [],
    tooltipSource: "beta",
  },
  {
    name: "DF S4",
    shortName: "DF4",
    description: "Dragonflight season 4",
    slug: "df-season-4",
    startDate: 1_713_884_400_000,
    endDate: UNKNOWN_SEASON_START_OR_ENDING,
    seasonIcon: "/img/dragonflight/season4/logo.png",
    apRatios: {
      soulCleave: 1.4812,
      spiritBombPerSoulFragment: 0.35041,
    },
    furyCost: {
      soulCleave: 30,
      spiritBomb: 40,
    },
    alwaysOnMultipliers: [
      {
        ability: "bomb",
        appliedName: "Chaos Brand",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Armor Mitigation",
        value: 0.7,
      },
    ],
    conditionalMultipliers: [
      {
        ability: "cleave",
        appliedName: "Mystic Touch",
        notAppliedName: "No Mystic Touch",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Focused Cleave",
        notAppliedName: "No Focused Cleave",
        value: 1.5,
      },
      {
        ability: "bomb",
        appliedName: "Burning Blood",
        notAppliedName: "No Burning Blood",
        value: 1.1,
      },
      {
        ability: "bomb",
        appliedName: "Fiery Demise",
        notAppliedName: "No Fiery Demise",
        value: 1.5,
      },
    ],
    stackingMultipliers: [
      {
        ability: "both",
        appliedName: "Fiery Resolve",
        value: 1.02,
        maxStacks: 5,
      },
    ],
  },
  {
    name: "DF S3",
    shortName: "DF3",
    description: "Dragonflight season 3",
    slug: "df-season-3",
    startDate: 1_699_974_000_000,
    endDate: 1_713_848_400_000,
    seasonIcon: "/img/dragonflight/season3/logo.png",
    apRatios: {
      soulCleave: 1.61,
      spiritBombPerSoulFragment: 0.35041,
    },
    furyCost: {
      soulCleave: 30,
      spiritBomb: 40,
    },
    alwaysOnMultipliers: [
      {
        ability: "bomb",
        appliedName: "Chaos Brand",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Armor Mitigation",
        value: 0.7,
      },
    ],
    conditionalMultipliers: [
      {
        ability: "cleave",
        appliedName: "Mystic Touch",
        notAppliedName: "No Mystic Touch",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Focused Cleave",
        notAppliedName: "No Focused Cleave",
        value: 1.5,
      },
      {
        ability: "bomb",
        appliedName: "Burning Blood",
        notAppliedName: "No Burning Blood",
        value: 1.1,
      },
      {
        ability: "bomb",
        appliedName: "Fiery Demise",
        notAppliedName: "No Fiery Demise",
        value: 1.5,
      },
    ],
    stackingMultipliers: [
      {
        ability: "both",
        appliedName: "Fiery Resolve",
        value: 1.02,
        maxStacks: 5,
      },
    ],
  },
  {
    name: "DF S2",
    shortName: "DF2",
    description: "Dragonflight season 2",
    slug: "df-season-2",
    startDate: 1_683_644_400_000,
    endDate: 1_699_336_800_000,
    seasonIcon: "/img/dragonflight/season2/logo.png",
    apRatios: {
      soulCleave: 1.31,
      spiritBombPerSoulFragment: 0.32445,
    },
    furyCost: {
      soulCleave: 30,
      spiritBomb: 40,
    },
    alwaysOnMultipliers: [
      {
        ability: "bomb",
        appliedName: "Chaos Brand",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Armor Mitigation",
        value: 0.7,
      },
    ],
    conditionalMultipliers: [
      {
        ability: "cleave",
        appliedName: "Mystic Touch",
        notAppliedName: "No Mystic Touch",
        value: 1.05,
      },
      {
        ability: "cleave",
        appliedName: "Focused Cleave",
        notAppliedName: "No Focused Cleave",
        value: 1.4,
      },
      {
        ability: "bomb",
        appliedName: "Burning Blood",
        notAppliedName: "No Burning Blood",
        value: 1.1,
      },
      {
        ability: "bomb",
        appliedName: "Fiery Demise",
        notAppliedName: "No Fiery Demise",
        value: 1.4,
      },
    ],
    stackingMultipliers: [
      {
        ability: "bomb",
        appliedName: "Fires of Fel",
        value: 1.02,
        maxStacks: 6,
      },
    ],
  },
];

export function findSeasonByTimestamp(timestamp = Date.now()): Season | null {
  const season = seasons.find(
    (season) =>
      season.startDate &&
      timestamp >= season.startDate &&
      (season.endDate === UNKNOWN_SEASON_START_OR_ENDING ||
        season.endDate > timestamp),
  );

  return season ?? null;
}

export function findSeasonByName(slug: string): Season | null {
  if (slug === "latest") {
    const ongoingSeason = findSeasonByTimestamp();

    if (ongoingSeason) return ongoingSeason;

    const mostRecentlyStartedSeason = seasons.find(
      (season) =>
        season.startDate !== UNKNOWN_SEASON_START_OR_ENDING &&
        Date.now() >= season.startDate,
    );

    if (mostRecentlyStartedSeason) return mostRecentlyStartedSeason;
  }

  const match = seasons.find((season) => {
    return season.slug === slug;
  });

  return match ?? null;
}

export interface MultiplierResult {
  value: number;
  appliedMultipliers: string[];
}

export interface EfficientMultiplierResult extends MultiplierResult {
  valuePerFury: number;
}

export interface SpiritBombMultiplierResult extends MultiplierResult {
  soulFragments: number;
}

export interface EfficientSpiritBombMultiplierResult
  extends SpiritBombMultiplierResult {
  valuePerFury: number;
}

export function abilityMultiplierAppliedName(multiplier: AbilityMultiplier) {
  return `${multiplier.appliedName} (${String(multiplier.value)})`;
}

export function abilityMultiplierNotAppliedName(
  multiplier: ConditionalAbilityMultiplier,
) {
  return multiplier.notAppliedName;
}

export function stackingMultiplierAppliedName(
  multiplier: StackingAbilityMultiplier,
) {
  return `${multiplier.appliedName} (${String(multiplier.value)} per stack [max ${String(multiplier.maxStacks)}])`;
}

export interface CombinedMultiplierResult {
  conditionalMultipliers: ConditionalAbilityMultiplier[];
  soulCleaveApRatio: EfficientMultiplierResult;
  spiritBombBaseApRatios: EfficientSpiritBombMultiplierResult[];
}

export interface EfficiencyTable {
  id: string;
  title: string;
  description: string;
  conditionalMultipliers: AbilityMultiplier[];
  soulCleaveApRatio: EfficientMultiplierResult;
  spiritBombApRatios: EfficientSpiritBombMultiplierResult[];
}

export interface EnhancedSeason extends Season {
  efficiencyTables: EfficiencyTable[];
}

function getSoulCleaveBaseApRatio(season: Season): EfficientMultiplierResult {
  const soulCleaveBaseApRatioMultiplierResult = season.alwaysOnMultipliers
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
  return {
    ...soulCleaveBaseApRatioMultiplierResult,
    valuePerFury:
      soulCleaveBaseApRatioMultiplierResult.value / season.furyCost.soulCleave,
  };
}

function getSpiritBombBaseApRatioPerSoulFragment(
  season: Season,
): EfficientMultiplierResult {
  const spiritBombBaseApRatioPerSoulFragmentResult = season.alwaysOnMultipliers
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
  return {
    ...spiritBombBaseApRatioPerSoulFragmentResult,
    valuePerFury:
      spiritBombBaseApRatioPerSoulFragmentResult.value /
      season.furyCost.spiritBomb,
  };
}

function getSpiritBombBaseApRatios(
  season: Season,
  baseMultiplierResult: EfficientMultiplierResult,
): EfficientSpiritBombMultiplierResult[] {
  return Array(5)
    .fill(0)
    .map((_, idx) => idx + 1)
    .map<SpiritBombMultiplierResult>((soulFragments) => ({
      value: soulFragments * baseMultiplierResult.value,
      appliedMultipliers: baseMultiplierResult.appliedMultipliers,
      soulFragments,
    }))
    .map<EfficientSpiritBombMultiplierResult>((it) => ({
      ...it,
      valuePerFury: it.value / season.furyCost.spiritBomb,
    }));
}

function getSoulCleaveApRatio(
  season: Season,
  soulCleaveBaseApRatio: EfficientMultiplierResult,
  multipliers: AbilityMultiplier[],
): EfficientMultiplierResult {
  const result = multipliers.reduce<MultiplierResult>(
    (acc, multiplier) => ({
      value: acc.value * multiplier.value,
      appliedMultipliers: [
        ...acc.appliedMultipliers,
        abilityMultiplierAppliedName(multiplier),
      ],
    }),
    soulCleaveBaseApRatio,
  );

  return {
    ...result,
    valuePerFury: result.value / season.furyCost.soulCleave,
  };
}

function getSpiritBombApRatios(
  season: Season,
  spiritBombBaseApRatios: EfficientSpiritBombMultiplierResult[],
  multipliers: AbilityMultiplier[],
): EfficientSpiritBombMultiplierResult[] {
  return spiritBombBaseApRatios.map((spiritBombBaseApRatio) => {
    const result = multipliers.reduce<SpiritBombMultiplierResult>(
      (acc, multiplier) => ({
        value: acc.value * multiplier.value,
        appliedMultipliers: [
          ...acc.appliedMultipliers,
          abilityMultiplierAppliedName(multiplier),
        ],
        soulFragments: acc.soulFragments,
      }),
      spiritBombBaseApRatio,
    );

    return {
      ...result,
      valuePerFury: result.value / season.furyCost.spiritBomb,
    };
  });
}

function getEfficiencyTables(
  season: Season,
  soulCleaveBaseApRatio: EfficientMultiplierResult,
  spiritBombBaseApRatios: EfficientSpiritBombMultiplierResult[],
): EfficiencyTable[] {
  return fastCartesian(
    season.conditionalMultipliers.map<AbilityMultiplier[]>((multiplier) => [
      {
        ability: multiplier.ability,
        appliedName: multiplier.appliedName,
        value: multiplier.value,
      },
      {
        ability: multiplier.ability,
        appliedName: multiplier.notAppliedName,
        value: 1,
      },
    ]),
  ).map<EfficiencyTable>((combo) => ({
    id: combo.map((comboPart) => comboPart.appliedName).join("-"),
    title: combo.map((comboPart) => comboPart.appliedName).join(" + "),
    description: `Effective AP ratios in single target with ${combo.map((comboPart) => comboPart.appliedName).join(", ")}`,
    conditionalMultipliers: combo,
    soulCleaveApRatio: getSoulCleaveApRatio(
      season,
      soulCleaveBaseApRatio,
      combo.filter(
        (comboPart) =>
          comboPart.ability === "cleave" || comboPart.ability === "both",
      ),
    ),
    spiritBombApRatios: getSpiritBombApRatios(
      season,
      spiritBombBaseApRatios,
      combo.filter(
        (comboPart) =>
          comboPart.ability === "bomb" || comboPart.ability === "both",
      ),
    ),
  }));
}

function enhanceSeason(season: Season): EnhancedSeason {
  const soulCleaveBaseApRatio: EfficientMultiplierResult =
    getSoulCleaveBaseApRatio(season);
  const spiritBombBaseApRatioPerSoulFragment =
    getSpiritBombBaseApRatioPerSoulFragment(season);
  const spiritBombBaseApRatios = getSpiritBombBaseApRatios(
    season,
    spiritBombBaseApRatioPerSoulFragment,
  );

  const efficiencyTables: EfficiencyTable[] = [
    {
      id: "baseline",
      title: "Baseline",
      description:
        "Effective AP ratios in single target with no additional talents or multipliers",
      soulCleaveApRatio: soulCleaveBaseApRatio,
      spiritBombApRatios: spiritBombBaseApRatios,
      conditionalMultipliers: [],
    },
    ...getEfficiencyTables(
      season,
      soulCleaveBaseApRatio,
      spiritBombBaseApRatios,
    ),
  ];

  return {
    ...season,
    efficiencyTables,
  };
}

export const enhancedSeasons = seasons.map(enhanceSeason);

export function findEnhancedSeasonByTimestamp(
  timestamp = Date.now(),
): EnhancedSeason | null {
  const season = enhancedSeasons.find(
    (season) =>
      season.startDate &&
      timestamp >= season.startDate &&
      (season.endDate === UNKNOWN_SEASON_START_OR_ENDING ||
        season.endDate > timestamp),
  );

  return season ?? null;
}

export function findEnhancedSeasonByName(slug: string): EnhancedSeason | null {
  if (slug === "latest") {
    const ongoingSeason = findEnhancedSeasonByTimestamp();

    if (ongoingSeason) return ongoingSeason;

    const mostRecentlyStartedSeason = enhancedSeasons.find(
      (season) =>
        season.startDate !== UNKNOWN_SEASON_START_OR_ENDING &&
        Date.now() >= season.startDate,
    );

    if (mostRecentlyStartedSeason) return mostRecentlyStartedSeason;
  }

  const match = enhancedSeasons.find((season) => {
    return season.slug === slug;
  });

  return match ?? null;
}
