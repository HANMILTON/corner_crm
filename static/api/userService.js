import {
  pkFetch
} from './pkFetch'
const userServer = `${window.config.server}/user`
export default {
  // 获取审核列表
  getShopValidateList(searchObj){
    return pkFetch.post(`${userServer}/get_shop_validate_list`,searchObj)
      .then(res => res)
  },
  //审核商家
  validateAct(id,validate_res,validate_words){
    return pkFetch.post(`${userServer}/validate_act`,{
      id,
      validate_res,
      validate_words
    })
      .then(res => res)
  } ,

  //获取场景列表
  getSceneList(serachObj){
    return pkFetch.post(`${userServer}/scene_list`,serachObj)
    .then(res => res)
  },
  //场景的新增、编辑
  sceneSubmit(sceneObj){
    return pkFetch.post(`${userServer}/scene_submit`,sceneObj)
    .then(res => res)
  },  
  // 场景的上线、下线
  sceneOnline(scene_id,is_online){
    return pkFetch.post(`${userServer}/scene_set_is_online`,{
      scene_id,
      is_online
    })
    .then(res => res)
  },
  //分类列表
  getCategoryList(){
    return pkFetch.get(`${userServer}/category_list`)
    .then(res => res)
  },
  //获取某个分类的信息
  getCategoryDetail(category_id){
    return pkFetch.get(`${userServer}/get_row_by_category_id`,{category_id})
    .then(res => res)
  },
  //分类的新增、编辑
  categorySubmit(categoryObj){
    return pkFetch.post(`${userServer}/category_submit`,categoryObj)
    .then(res => res)
  }, 
  //某个分类下评价列表
  getCommentList(category_id){
    return pkFetch.post(`${userServer}/category_comment_item_list`,{category_id})
    .then(res => res)
  },
  submitComment(dataObj){
    return pkFetch.post(`${userServer}/category_comment_item_submit`,dataObj)
    .then(res => res)
  },
  getOrderList(dataObj){
    return pkFetch.post(`${userServer}/order_list`,dataObj)
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

   //<--------------------------------------------------- 用户爱好 --------------------------------------------------->
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
   //<--------------------------------------------------- 商家风格 --------------------------------------------------->
   //兴趣爱好列表
   getStyleList(){
        return pkFetch.post(`${userServer}/shop_style_list`)
      .then(res => res)
   },
   // 兴趣爱好提交
   styleSubmit(hobby_obj){
      return pkFetch.post(`${userServer}/shop_style_submit`,hobby_obj)
      .then(res => res)
   },
   // 兴趣爱好删除
   styleDelete(style_id){
      return pkFetch.post(`${userServer}/shop_style_del`,{style_id})
      .then(res => res)
   },
   // 获取管理员列表
    getAdminList(){
      return pkFetch.post(`${userServer}/app_news_admin_list`)
      .then(res => res)
    },
    // 管理员信息修改
    adminSubmit(adminObj){
      return pkFetch.post(`${userServer}/app_news_admin_submit`,adminObj)
      .then(res => res)
    },
    //餐厅口味与人群兴趣爱好的编辑提交
    tasteHobbySubmit(labelObj){
      return pkFetch.post(`${userServer}/shop_detail_taste_hobby_submit`,labelObj)
      .then(res => res)
    },
    // 获取消息列表
    getNewsList(searchObj){
      return pkFetch.post(`${userServer}/news_list`,searchObj)
      .then(res => res)  
    },
    // 消息提交接口
    newsSubmit(newsObj){
      return pkFetch.post(`${userServer}/news_submit`,newsObj)
      .then(res => res)  
    },
    // 消息上线接口
    newsSwitchOnline(news_id,is_online){
      return pkFetch.post(`${userServer}/news_switch_online`,{
        news_id,
        is_online
      })
      .then(res => res)
    }, 
    // 删除消息接口
    newsDelete(news_id){
      return pkFetch.post(`${userServer}/news_delete`,{
        news_id
      })
      .then(res => res)
    },
    //Banner列表
    getBannerList(searchObj){
      return pkFetch.post(`${userServer}/banner_list`,searchObj)
      .then(res => res)
    },
    //一条 Banner信息
    getBannerDetail(banner_id){
      return pkFetch.post(`${userServer}/banner_get_row`,{banner_id})
      .then(res => res)
    },
    //banner 新增、修改
    bannerSubmit(bannerObj){
      return pkFetch.post(`${userServer}/banner_submit`,bannerObj)
      .then(res => res)
    },
    //banner上下线
    bannerSwitch(banner_id,is_online){
      return pkFetch.post(`${userServer}/banner_switch_online`,{
        banner_id,is_online
      })
      .then(res => res)
    },
    //banner删除
    bannerDelete(banner_id){
      return pkFetch.post(`${userServer}/banner_delete`,{
        banner_id
      })
      .then(res => res)
    },
    //用户列表
    getUserList(searchObj){
      return pkFetch.post(`${userServer}/app_user_list`,searchObj)
      .then(res => res)    
    },
    //结算列表
    orderSettlementList(searchObj){
      return pkFetch.post(`${userServer}/order_settlement_list`,searchObj)
      .then(res => res) 
    },
    //商家搜索
    searchShopByWords(search_words,num){
      return pkFetch.post(`${userServer}/search_shop_by_words`,{
        search_words,num
      })
      .then(res => res) 
    },
    orderSettlementConfirm(order_id_list,shop_detail_id){
      return pkFetch.post(`${userServer}/order_settlement_confirm`,{
        order_id_list,shop_detail_id
      })
      .then(res => res) 
    },
    //管理员整站推送信息
    //新增、修改
    pushSubmit(pushObj){
      return pkFetch.post(`${userServer}/push_submit`,pushObj)
      .then(res => res) 
    },
    //信息列表
    getPushList(searchObj){
      return pkFetch.post(`${userServer}/push_list`,searchObj)
      .then(res => res)
    },
    getPushDetail(push_id){
      return pkFetch.post(`${userServer}/push_row`,{push_id})
      .then(res => res)
    },
    pushOnline(push_id,is_online){
      return pkFetch.post(`${userServer}/push_set_is_online`,{push_id,is_online})
      .then(res => res)
    },
    pushDelete(push_id){
      return pkFetch.post(`${userServer}/push_row_delete`,{push_id})
      .then(res => res)
    }
}