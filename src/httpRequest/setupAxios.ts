import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { TokenService } from './tokenService'

class SetupAxios {
  api: AxiosInstance
  constructor(baseURL: string, contentType?: string) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: contentType
        ? {
            'Content-Type': contentType,
          }
        : {},
      withCredentials: true,
    })

    this.api.interceptors.response.use(
      (response) => {
        return new Promise((resolve) => {
          resolve(response)
        })
      },
      (error) => {
        //xu ly bua
        if (!error.response) return Promise.reject(error)
        //401 403
        if ([401, 403].includes(error.response.status)) {
          // do some things
          // toast.error('Đã xảy ra lỗi!!!', { autoClose: 1000 })
          return Promise.reject(error.response)
        }
        return Promise.reject(error.response.data)
      }
    )

    // this.setHeader()
  }

  setHeader = () => {
    // console.log('setting header')
    if (TokenService.getToken()) {
      this.api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${TokenService.getToken()}`
    }
    return this
  }

  removeHeader = () => {
    this.api.defaults.headers.common = {}
  }

  public get = (url = '', config = {}) => {
    return this.api.get(url, config).then((response) => response)
  }

  public post = (url = '', body = {}, config = {}) => {
    return this.api.post(url, body, config).then((response) => response)
  }

  public patch = (url = '', body = {}, config = {}) => {
    return this.api.patch(url, body, config).then((response) => response)
  }

  public put = (url = '', body = {}, config = {}) => {
    return this.api.put(url, body, config).then((response) => response)
  }

  public delete = (url = '', config = {}) => {
    return this.api.delete(url, config).then((response) => response)
  }
}

export { SetupAxios }
