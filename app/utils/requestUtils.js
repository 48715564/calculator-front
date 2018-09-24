import config from '../config'
import { GlobalConstants } from '.'

const toQueryString = (obj, encode = true) =>
  obj
    ? Object.keys(obj)
        .sort()
        .map(key => {
          const val = obj[key]
          if (Array.isArray(val)) {
            return val
              .sort()
              .map(
                val2 =>
                  encode
                    ? `${encodeURIComponent(key)}=${encodeURIComponent(val2)}`
                    : `${key}=${val2}`
              )
              .join('&')
          }
          return encode
            ? `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            : `${key}=${val}`
        })
        .join('&')
    : ''
const sendRequest = (url, params = {}, method = 'POST') =>
  new Promise((resolve, reject) => {
    fetch(config.host + url, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: GlobalConstants.TOKEN == '' ? '' : `${GlobalConstants.TOKEN}`,
      },
      body: toQueryString(params || {}),
    })
      .then(response =>
        // todo 判断返回HTTP状态
        response.json()
      )
      .then(responseData => {
        resolve(responseData)
      })
      .catch(error => {
        console.log(config.host, url, method, params, error)
        if (error.message == 'Network request failed') {
          error.message = '网络连接失败,请检查网络'
        } else {
          error.message = '服务器内部错误'
        }
        reject({ msg: error.message || '请求错误' })
      })
  })

const sendTimeoutRequest = (
  url,
  params = {},
  method = 'POST',
  timeout = 8000
) => {
  let timeout_fn = null
  let abort = null
  const fetch_promise = sendRequest(url, params, method)
  // 创建一个超时promise
  const timeout_promise = new Promise((resolve, reject) => {
    timeout_fn = function() {
      reject({ msg: '连接超时，请检查网络' })
    }
  })
  // 创建一个终止promise
  const abort_promise = new Promise((resolve, reject) => {
    abort = function() {
      reject({ msg: '请求终止' })
    }
  })

  // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  const abortable_promise = Promise.race([
    fetch_promise,
    timeout_promise,
    abort_promise,
  ])
  setTimeout(timeout_fn, timeout)
  // 终止
  abortable_promise.abort = abort
  return abortable_promise
}

export const Request = {
  service: sendTimeoutRequest,
  get: (url, params = {}) => sendTimeoutRequest(url, params, 'GET'),
  post: (url, params = {}) => sendTimeoutRequest(url, params),
  put: (url, params = {}) => sendTimeoutRequest(url, params, 'PUT'),
  delete: (url, params = {}) => sendTimeoutRequest(url, params, 'DELETE'),
  patch: (url, params = {}) => sendTimeoutRequest(url, params, 'PATCH'),
}
