import axios from 'axios'
import axiosQs from 'qs'
import jsrsasign from 'jsrsasign'
let rsa = new jsrsasign.RSAKey()
rsa.setPublic('D3379E6D621B0C3C96DB21F478468BAE8E117C6136774EBF0921F77F2D102ECCB2EFCE4AF2722E6F3942E3D23A36E4E3AC9971896D4DFBD6F7A68C390117CA824C115F6AAC3828B7C5C5D4FF971228BC53CE714208C6283CBAEB3515BF71CC7841BDF44C731C329845896AC3EF7B1E64D51EDCF2D6BB6E106D24A17F5EB4BFDD', `10001`)

let $http = axios.create({
  baseURL: 'http://mczyzy.cn:8080',
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  validateStatus: state => state
})

if (process.env.NODE_ENV === 'development') {
  $http.defaults.baseURL = 'http://127.0.0.1:8080'
}

export default {
  get (url, data) {
    return new Promise((resolve, reject) => {
      let detail = []
      for (let key in data) {
        if (key.indexOf('_rsa') > -1) {
          detail[key] = rsa.encrypt(data[key])
        } else detail[key] = data[key]
      }
      $http
        .get(url + (data ? '?' + axiosQs.stringify(detail) : ''))
        .then(res => {
          if (res.data && !res.data.error) {
            resolve(res)
          } else if (res.status === 200) {
            !res.data && (res.error = 'http get error!')
            reject(res)
          } else {
            console.error(`${res.status}: ${res.statusText}`)
          }
        })
        .catch(err => {
          console.error(err)
        })
    })
  },
  post (url, data, head) {
    return new Promise((resolve, reject) => {
      let detail = []
      console.log(data)
      var params = new URLSearchParams()
      for (let key in data) {
        if (key.indexOf('_rsa') > -1) {
          detail[key] = rsa.encrypt(data[key])
        } else detail[key] = data[key]
        params.append(key, data[key])
      }
      if (data instanceof FormData) {
        params = data
      }
      $http
        .post(url, params, head)
        .then(res => {
          if (res.data && !res.data.error) {
            resolve(res)
          } else if (res.status === 200) {
            !res.data && (res.error = 'http get error!')
            reject(res)
          } else {
            console.error(`${res.status}: ${res.statusText}`)
          }
        })
        .catch(err => {
          console.error(err)
        })
    })
  }
}
