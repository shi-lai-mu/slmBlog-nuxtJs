
import axiosQs from 'qs'
import jsrsasign from 'jsrsasign'
import API from '~/store/API'
import dataParse from '~/store/dataParse'

const RSA = new jsrsasign.RSAKey()
RSA.setPublic('D3379E6D621B0C3C96DB21F478468BAE8E117C6136774EBF0921F77F2D102ECCB2EFCE4AF2722E6F3942E3D23A36E4E3AC9971896D4DFBD6F7A68C390117CA824C115F6AAC3828B7C5C5D4FF971228BC53CE714208C6283CBAEB3515BF71CC7841BDF44C731C329845896AC3EF7B1E64D51EDCF2D6BB6E106D24A17F5EB4BFDD', `10001`)

export default function ({ $axios, redirect }) {
  /**
   * axios Request
   */
  $axios.onRequest(config => {
    const data = config.data

    if (data) {
      // RSA 加密处理
      const rsa = data.rsa
      delete config.data.rsa
      for (const key in rsa) {
        if (key in data) {
          throw new Error(`RSA.${key} there is Data in the!`)
        }
        config.data[key] = RSA.encrypt(rsa[key])
      }

      // GET 数据处理
      if (config.method === 'get') {
        config.url += `?${axiosQs.stringify(data)}`
        config.data = ''
      }
    }
    console.log('API:  ' + config.url, config);
  })

  /**
   * axios Response
   */
  $axios.onResponse(res => {
    let { data } = res

    // 根据API 对数据进行处理
    const api = res.config.api
    if (api && dataParse[api]) {
      data = dataParse[api](data)
    }

    return data
  })

  /**
   * axios Error
   */
  $axios.onError((error, res) => {
    // console.log('error::', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
  
  /**
   * axios API request
   * @param {string/object} api API库内的键
   * @return 链式操作请求方式，内部传入与axios相同，排除第一个URL
   */
  $axios.api = api => {
    let URL = API[api]
    
    // 动态API
    if (typeof api === 'object') {
      URL = API[api.key]
      for (const key in api.data) {
        URL = URL.replace(`:${key}`, api.data[key])
      }
    }
    return {
      get: (res) => {
        console.log({api, ...res});
        return $axios.get(URL, {api, ...res})
      },
      post: (...res) => $axios.post(URL, ...[{ api }, ...res])
    }
  }
}
