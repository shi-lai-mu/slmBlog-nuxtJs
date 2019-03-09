
import axiosQs from 'qs'
// import axios from 'axios'
import jsrsasign from 'jsrsasign'
// import connecter from '~/plugins/connecter'

const rsa = new jsrsasign.RSAKey()
rsa.setPublic('D3379E6D621B0C3C96DB21F478468BAE8E117C6136774EBF0921F77F2D102ECCB2EFCE4AF2722E6F3942E3D23A36E4E3AC9971896D4DFBD6F7A68C390117CA824C115F6AAC3828B7C5C5D4FF971228BC53CE714208C6283CBAEB3515BF71CC7841BDF44C731C329845896AC3EF7B1E64D51EDCF2D6BB6E106D24A17F5EB4BFDD', `10001`)

export default function ({ $axios, redirect }) {
  /**
   * axios Request
   */
  $axios.onRequest(config => {
    // RSA 数据处理
    // if (config.data.rsa) {

    // }

    // GET 数据处理
    if (config.method === 'get') {
      config.url += `?${axiosQs.stringify(config.data)}`
      config.data = ''
    }

    console.log('Making request to ' + config.url, config)
  })

  /**
   * axios Response
   */
  $axios.onResponse(data => {
    // console.log('onResponse:', data)
  })

  /**
   * axios Error
   */
  $axios.onError(error => {
    console.log('error', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
