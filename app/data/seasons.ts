const UNKNOWN_SEASON_START_OR_ENDING = null;

export type AlternativeTooltipSource = "ptr" | "beta";

export interface Season {
  name: string;
  shortName: string;
  slug: string;
  startDate: number | null;
  endDate: number | null;
  seasonIcon: string;
  tooltipSource?: AlternativeTooltipSource;
}

export const seasons: readonly Season[] = [
  {
    name: "TWW S1",
    shortName: "TWW1",
    slug: "tww-season-1",
    startDate: UNKNOWN_SEASON_START_OR_ENDING,
    endDate: UNKNOWN_SEASON_START_OR_ENDING,
    seasonIcon: "/img/thewarwithin/season1/logo.png",
    tooltipSource: "beta",
  },
  {
    name: "DF S4",
    shortName: "DF4",
    slug: "df-season-4",
    startDate: 1_713_884_400_000,
    endDate: UNKNOWN_SEASON_START_OR_ENDING,
    seasonIcon: "/img/dragonflight/season4/logo.png",
  },
  {
    name: "DF S3",
    shortName: "DF3",
    slug: "df-season-3",
    startDate: 1_699_974_000_000,
    endDate: 1_713_848_400_000,
    seasonIcon: "/img/dragonflight/season3/logo.png",
  },
  {
    name: "DF S2",
    shortName: "DF2",
    slug: "df-season-2",
    startDate: 1_683_644_400_000,
    endDate: 1_699_336_800_000,
    seasonIcon: "/img/dragonflight/season2/logo.png",
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
