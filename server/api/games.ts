import type { GamesResponse } from "~~/types/steam.ts";
import { SteamApiErrors } from "~~/types/errors";
import { FetchError } from "ofetch";

export default defineCachedEventHandler(
  async () => {
    const config = useRuntimeConfig();

    const { steamApiKey, steamApiPath } = config;
    const steamId = config.public.steamId;

    if (!steamApiKey || !steamId) {
      throw createError({
        statusCode: 400,
        data: SteamApiErrors.BadRequest,
      });
    }

    try {
      const response: GamesResponse = await $fetch(
        `${steamApiPath}/IPlayerService/GetOwnedGames/v0001`,
        {
          query: {
            key: steamApiKey,
            steamid: steamId,
            format: "json",
            include_appinfo: 1,
            include_played_free_games: 1,
          },
        },
      );
      return response.response;
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.statusCode === 401) {
          throw createError({
            statusCode: 401,
            data: SteamApiErrors.Unauthorized,
          });
        }
      }
      throw createError({
        statusCode: 500,
        data: SteamApiErrors.GenericError,
      });
    }
  },
  {
    maxAge: 0,
    // TODO: add getKey once useId is passing through event
  },
);
