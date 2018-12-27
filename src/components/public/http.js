import axios from 'axios'
import axiosQs from 'qs'

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
  $http.defaults.baseURL = 'http://127.0.0.1:80'
}

export default {
  get (url, data) {
    return new Promise((resolve, reject) => {
      $http
        .get(url, axiosQs.stringify(data))
        .then(res => {
          if (res.data) {
            resolve(res.data)
          } else {
            console.error(`${res.status}: ${res.statusText}`)
          }
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }
}
