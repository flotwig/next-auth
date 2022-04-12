import type { OAuthConfig, OAuthUserConfig } from "."

export interface BattleNetProfile {
  sub: string
  battle_tag: string
}

/** See the [available regions](https://develop.battle.net/documentation/guides/regionality-and-apis) */
export type BattleNetIssuer =
  | "https://www.battlenet.com.cn/oauth"
  | `https://${"us" | "eu" | "kr" | "tw"}.battle.net/oauth`

export default function BattleNet<
  P extends Record<string, any> = BattleNetProfile
>(options: OAuthUserConfig<P> & { issuer: BattleNetIssuer }): OAuthConfig<P> {
  return {
    id: "battlenet",
    name: "Battle.net",
    type: "oauth",
    wellKnown: `${options.issuer}/.well-known/openid-configuration`,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.battle_tag,
        email: null,
        image: null,
      }
    },
    options,
  }
}