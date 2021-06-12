import { tips } from './config'

/**
 * 获取输出信息
 * @param tipsKey lib/config tips key
 */
export const message = (tipsKey: keyof typeof tips, params?: string[]): string => {
  let currentTips = tips[tipsKey]
  params?.forEach(param => (currentTips = currentTips.replace(/%s|%n/, param)))
  return currentTips
}
