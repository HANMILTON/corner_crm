import {
  pkFetch
} from './pkFetch'
// console.log(pkFetch)
const indexServer = `${window.config.server}/index`
export default {

  login(loginObj) {
    return pkFetch.post(`${indexServer}/login_submit`,loginObj)
      .then(res => res)    
  },
  checkHasLogin(){
    return pkFetch.post(`${indexServer}/check_has_login`)
      .then(res => res)  	
  },
    // 退出登录
  logout(){
    return pkFetch.get(`${indexServer}/logout`)
    .then(res => res)
  },
}