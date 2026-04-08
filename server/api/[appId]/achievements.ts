import { FetchError } from 'ofetch'
import { SteamApiErrors } from '~~/types/errors'
import type { GameWithStatsResponse } from '~~/types/steam.ts'
export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()

    const { steamApiKey, steamApiPath } = config
    const steamId = config.public.steamId
    const appId = getRouterParam(event, 'appId')

    if (!steamApiKey || !steamId) {
      throw createError({
        statusCode: 400,
        data: SteamApiErrors.BadRequest,
      })
    }

    try {
      const response: GameWithStatsResponse = await $fetch(
        `${steamApiPath}/ISteamUserStats/GetPlayerAchievements/v0001`,
        {
          query: {
            key: steamApiKey,
            steamid: steamId,
            appid: appId,
          },
        }
      )
      return response.playerstats
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.statusCode === 400) {
          throw createError({
            statusCode: 400,
            data: SteamApiErrors.NoGameAchievements,
          })
        }
        if (error.statusCode === 401) {
          throw createError({
            statusCode: 401,
            data: SteamApiErrors.Unauthorized,
          })
        }
      }
      throw createError({
        statusCode: 500,
        data: SteamApiErrors.GenericError,
      })
    }
  },
  {
    maxAge: 1 * 5,
    // TODO: add getKey once useId is passing through event
  }
)
