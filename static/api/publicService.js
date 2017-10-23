import {
  pkFetch
} from './pkFetch'
// console.log(pkFetch)
const publicServer = `${window.config.server}/public`
export default {
  imgUpload(img_base64_encode){
    return pkFetch.post(`${publicServer}/img_upload`,{
    	img_base64_encode
    })
      .then(res => res)
  },	
  getUserInfo(){
    return pkFetch.get(`${publicServer}/get_login_admin_info`)
      .then(res => res)
  },
  getCitySub(level,parent_id){
    return pkFetch.post(`${publicServer}/get_city_sub`, {
      level,
      parent_id
    })
    .then(res => res)
  },
  getCityTop(){
    return pkFetch.get(`${publicServer}/get_city_top`)
      .then(res => res)
  },  
}