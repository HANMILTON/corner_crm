
const type = sessionStorage.getItem("user_type")
const sideList1 = [{
    title: '审核列表',
    path: 'checkList',
  }, {
    title: '商家列表',
    path: 'shopList',
  }, {
    title: '用户列表',
    path: 'userList'
  }, {
    title: '场景列表',
    path: 'sceneList',
  }, {
    title: '标签列表',
    path: 'labelList',
  }, {
    title: '订单列表',
    path: 'orderList',
  }, {
    title: '兴趣列表',
    path: 'hobbyList',
  }, {
    title: '管理员列表',
    path: 'adminList',
  }, {
    title: '消息列表',
    path: 'newsList',
  }, {
    title: 'banner列表',
    path: 'bannerList'
  }, {
    title: '财务统计',
    path: 'finance'
  }]
const sideList2 = [{
    title: '餐厅列表',
    path: 'shopAddList',
  }]  

export const mainSide = type == 3 ? sideList2 :sideList1

