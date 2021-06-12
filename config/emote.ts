import { EmoteConfig } from '@/interface/config'
import defaultConfig from '@/config/default'

/**
 * 站点表情配置
 */
export const emote: EmoteConfig = {
  list: {
    lyf: {
      name: '小黄脸',
      mode: 'local',
      perfix: '',
      style: 'width: 1.8em; height: 1.8em;',
      getLink(url) {
        return `${defaultConfig.ossLink}/emote/lyf/${url}`
      },
      map: [
        { url: '1.png', name: 'OK' },
        { url: '2.png', name: '惊讶' },
        { url: '3.png', name: '吃瓜' },
        { url: '4.png', name: '狗头' },
      ],
    },
    test: {
      name: '第二个表情测试',
      mode: 'local',
      perfix: '',
      style: 'width: 1em; height: 1em;',
      getLink(url) {
        return `${defaultConfig.ossLink}/emote/lyf/${url}`
      },
      map: [
        { url: '2.png', name: 'OK' },
        { url: '2.png', name: '惊讶' },
        { url: '3.png', name: '吃瓜' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '4.png', name: '狗头' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '4.png', name: '狗头' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
        { url: '3.png', name: '吃瓜' },
      ],
    },
  },
}
