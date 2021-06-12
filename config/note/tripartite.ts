import loginConfig from '@/config/login'
import { TripartiteConfig } from '@/interface/config'

/**
 * 登录类型
 */
export enum LOGIN_TYPE {
  QQ = 'qq',
  SUPER = 'super',
}

/**
 * 三方平台
 */
const tripartite: TripartiteConfig[] = [
  {
    name: 'QQ登录',
    icon: 'qq',
    type: LOGIN_TYPE.QQ,
    link(display: 'pc' | 'mobile' = 'pc', state: string = 'slmblog') {
      return `https://graph.qq.com/oauth2.0/show?which=Login&response_type=code&display=${display}&client_id=${loginConfig.QQ.client_id}&redirect_uri=${loginConfig.QQ.redirect_uri}&state=${state}`
    },
  },
  {
    name: '超管登录',
    type: LOGIN_TYPE.SUPER,
    icon: 'vip-crown-2-fill',
  },
]

export default tripartite
