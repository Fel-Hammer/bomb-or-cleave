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
