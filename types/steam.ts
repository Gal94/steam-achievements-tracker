import type {
  SteamAchievement,
  SteamGame,
  GlobalAchievementStats,
} from "./game";
export interface GamesResponse {
  response: {
    game_count: number;
    games: SteamGame[];
  };
}

export interface GameWithStatsResponse {
  playerstats: {
    gameName: string;
    achievements: SteamAchievement[];
  };
}

export interface GameGlobalAchievementsResponse {
  achievementpercentages: {
    achievements: GlobalAchievementStats[];
  };
}
