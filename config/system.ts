/**
 * @file Environment / ES module
 * @module System
 * @author shi-lai-mu <https://github.com/surmon-china>
 */

const { env } = process
const { NODE_ENV } = env

/**
 * 为调试模式
 */
export const isDeBug = process && process.env.npm_lifecycle_script?.indexOf('debug') !== -1

/**
 * 为开发环境
 */
export const isDev = NODE_ENV === 'development' || isDeBug

/**
 * 为生产环境
 */
export const isProd = NODE_ENV === 'production'

/**
 * 为Mock环境
 */
export const isMock = !!env.npm_config_mock

/**
 * 为静态环境
 */
export const isStatic = process && process.static

/**
 * 为服务器环境
 */
export const isServer = process && process.server
/**
 * 为浏览器环境
 */
export const isBrowser = process && process.browser
