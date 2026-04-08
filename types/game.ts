export interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: number;
  content_descriptorids: number[];
  playtime_disconnected: number;
}

export interface SteamAchievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
  name?: string;
  description?: string;
}

export interface GlobalAchievementStats {
  name: string;
  percent: number;
}

export interface GameWithStats {
  game: SteamGame;
  achievements: SteamAchievement[];
  unlocked_count: number;
  completion_percentage: number;
  achievement_status:
    | "not_loaded"
    | "loading"
    | "loaded"
    | "no_achievements"
    | "error";
}
