import {
  pkFetch
} from './pkFetch'
const userServer = `${window.config.server}/userShop`
export default {
     //兴趣爱好列表
   getHobbyList(){
        return pkFetch.post(`${userServer}/app_user_hobby_list`)
      .then(res => res)
   },
    //获取场景列表
  getSceneList(serachObj){
    return pkFetch.post(`${userServer}/scene_list`,serachObj)
    .then(res => res)
  },
  //新增商家
  addShop(user_name){
    return pkFetch.post(`${userServer}/add_shop_by_shop_user_name`,{
      user_name
    })
    .then(res => res)
  },
  // 获取商家列表
  getShopList(searchObj){
    return pkFetch.post(`${userServer}/shop_detail_list`,searchObj)
    .then(res => res)
  },
  shopDetailInfo(detail_id){
    return pkFetch.post(`${userServer}/shop_detail_info`,{
      detail_id
    })
    .then(res => res)
  },
  // 获取一级分类
  getCategorySub(category_id){
    return pkFetch.post(`${userServer}/get_category_sub`,{
      category_id
    })
    .then(res => res) 
  },
  // 门店上下线
  shopOnline(detail_id,is_online){
    return pkFetch.post(`${userServer}/shop_detail_switch_is_online`,{
      detail_id,
      is_online
    })
    .then(res => res)
  },
  // 门店删除
  shopDelete(detail_id){
     return pkFetch.post(`${userServer}/shop_detail_delete`,{
      detail_id
    })
    .then(res => res)
  },
  // 门店信息的修改
  shopUpdate(shopObj){
     return pkFetch.post(`${userServer}/shop_detail_modify`,shopObj)
    .then(res => res)
  },
  // 门店信息获取
  getShopDetail(detail_id){
     return pkFetch.post(`${userServer}/shop_detail_info`,{
      detail_id
     })
    .then(res => res)
  },
  //餐厅场景推荐
  shopDetailSceneSubmit(shop_detail_id,scene_arr){
    return pkFetch.post(`${userServer}/shop_detail_scene_submit`,{
      shop_detail_id,
      scene_arr: JSON.stringify(scene_arr)
    })
    .then(res => res)
  },
  // 推荐菜提交  
  shopRecommendSubmit(updateObj){
    return pkFetch.post(`${userServer}/shop_recommend_submit`,updateObj)
      .then(res => res)
   },
   //推荐菜删除
  shopRecommendDelete(recommend_id){
        return pkFetch.post(`${userServer}/shop_recommend_delete`,{recommend_id})
      .then(res => res)
   },
   //兴趣爱好列表
   getHobbyList(){
        return pkFetch.post(`${userServer}/app_user_hobby_list`)
      .then(res => res)
   },
   // 兴趣爱好提交
   userHobbySubmit(hobby_obj){
      return pkFetch.post(`${userServer}/app_user_hobby_submit`,hobby_obj)
      .then(res => res)
   },
   // 兴趣爱好删除
   userHobbyDelete(hobby_id){
      return pkFetch.post(`${userServer}/app_user_hobby_del`,{hobby_id})
      .then(res => res)
   },
       //餐厅口味与人群兴趣爱好的编辑提交
    tasteHobbySubmit(labelObj){
      return pkFetch.post(`${userServer}/shop_detail_taste_hobby_submit`,labelObj)
      .then(res => res)
    },
}