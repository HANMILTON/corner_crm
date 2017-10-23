require('es6-promise').polyfill()
require('isomorphic-fetch')
export const pkFetch = {
  checkStatus(res) {
    if (res.ok) {
      return res
    } else {
      (function() {
        console.error(`status:${res.status}**StatusText:${res.statusText}**${res.url}`)
        bus.$emit("showAlert",`Http状态码${res.status},核对参数无误后,联系技术`,"error")
      }())
    }
  },
  formatParams(params) {
    let query = []
    for (let i in params) {
      query.push(`${i}=${encodeURIComponent(params[i])}`)
    }
    return query.join('&')
  },
  createformData(params) {
    let fd = new FormData()
    for (let i in params) {
      fd.append(i, params[i])
    }
    return fd
  },
  log(json) {
    if(json.code !=200 && json.code !=299 && json.code !=210) bus.$emit("showAlert",json.msg,"warning")
    console.info(`fetch原始数据`, json)
    return json
  },
  get(url, params) {
    console.info('GET请求数据 参数', params, `请求地址${url}`)
    return window.fetch(url + '?' + this.formatParams(params),{credentials: 'include'})
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  },
  post(url, params) {
    console.info('POST请求数据 参数', params, `请求地址${url}`)
    return window.fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        credentials: 'include',
        body: this.formatParams(params)
      })
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  },
  postFile(url, params) {
    console.info('POST上传文件数据 参数', params, `请求地址${url}`)
    return window.fetch(url, {
        method: 'POST',
        body: params,
        async: false,    
        contentType: false,  
        processData: false,  
      })
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  },
  delete(url, params) {
    url += '?_method=DELETE'
    console.info('POST模拟DELETE请求数据 参数', params, `请求地址${url}`)
    return window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: this.formatParams(params)
      })
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  }
}