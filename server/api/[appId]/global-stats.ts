import { SteamApiErrors } from '~~/types/errors'
import { FetchError } from 'ofetch'
import type { GameGlobalAchievementsResponse } from '~~/types/steam.ts'

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig()
    const appId = getRouterParam(event, 'appId')

    const { steamApiPath } = config

    try {
      const response: GameGlobalAchievementsResponse = await $fetch(
        `${steamApiPath}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002`,
        {
          query: {
            appid: appId,
          },
        }
      )
      return response.achievementpercentages
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.statusCode === 500) {
          throw createError({
            statusCode: 400,
            data: SteamApiErrors.BadRequest,
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
