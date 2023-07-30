import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const ENV = import.meta.env

// 设置请求头和请求路径
axios.defaults.baseURL = ENV.VITE_APP_BASE_URL + ':' + ENV.VITE_APP_PORT
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = window.sessionStorage.getItem('token') as string
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return error
  },
)

// 响应拦截
axios.interceptors.response.use((res: AxiosResponse) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res
})

interface ResType<T> {
  code: number
  data?: T
  token?: string
  msg?: string
  err?: string
}

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      /* 可以在此添加加载操作 */
      axios
        .get(url, { params })
        .then((res) => {
          /* 可以在此添加关闭加载操作 */
          resolve(res.data)
        })
        .catch((err) => {
          /* 可以在此添加关闭加载操作 */
          reject(err)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      /* 可以在此添加加载操作 */
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          /* 可以在此添加关闭加载操作 */
          resolve(res.data)
        })
        .catch((err) => {
          /* 可以在此添加关闭加载操作 */
          reject(err)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      /* 可以在此添加加载操作 */
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          /* 可以在此添加关闭加载操作 */
          resolve(res.data)
        })
        .catch((err) => {
          /* 可以在此添加关闭加载操作 */
          reject(err)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
