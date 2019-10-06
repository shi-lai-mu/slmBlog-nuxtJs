import { DefaultConfig } from '../interface/config'

/**
 * 默认配置文件
 */

const config: DefaultConfig = {
  server: {
    host: 'http://localhost',
    port: 3000,
    apiHost: 'http://localhost:7001',
  }
}

export default {
  ...config,
}