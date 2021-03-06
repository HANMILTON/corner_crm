import checkList from '@/views/check/checkList'
import sceneList from '@/views/scene/sceneList'
import labelList from '@/views/label/labelList'
import orderList from '@/views/order/orderList'
import shopList from '@/views/shop/shopList'
import hobbyList from '@/views/hobby/hobbyList'
import styleList from '@/views/style/styleList'
import adminList from '@/views/admin/adminList'
import newsList from '@/views/news/newsList'
import bannerList from '@/views/banner/bannerList'
import userList from '@/views/user/userList'
import finance from '@/views/finance/financePanel'
import shopAddList from '@/views/shopAdd/shopAddList'
import pushList from '@/views/push/pushList'
export default [
  {
    path: '/',
    name: '/',
    component: checkList,
  } ,
  {
  	path: '/checkList',
    name: 'checkList',
    component: checkList,
  } ,   
  {
    	path: '/sceneList',
      name: 'sceneList',
      component: sceneList,
  } , 
  {
      path: '/labelList',
      name: 'labelList',
      component: labelList,
  } ,
  {
      path: '/orderList',
      name: 'orderList',
      component: orderList,
  } ,
  {
      path: '/shopList',
      name: 'shopList',
      component: shopList,
  } ,
  {
      path: '/hobbyList',
      name: 'hobbyList',
      component: hobbyList,
  } ,
  {
      path: '/styleList',
      name: 'styleList',
      component: styleList,
  } ,  
  {
      path: '/adminList',
      name: 'adminList',
      component: adminList,
  } ,
  {
      path: '/newsList',
      name: 'newsList',
      component: newsList,
  } ,
  {
      path: '/bannerList',
      name: 'bannerList',
      component: bannerList,
  } ,
  {
      path: '/userList',
      name: 'userList',
      component: userList,
  } ,
  {
      path: '/finance',
      name: 'finance',
      component: finance,
  } ,
  {
      path: '/shopAddList',
      name: 'shopAddList',
      component: shopAddList,
  } ,
  {
      path: '/pushList',
      name: 'pushList',
      component: pushList,
  }         
]