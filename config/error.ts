export const page = {
  404: '页面未找到或未开发',
}

export const axiosError = {
  'Network Error': '服务器网络异常，请稍后再试!',

  error(message: string) {
    return axiosError[message] ?? message
  },
}
