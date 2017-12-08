import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由配置
let routeConfig = {
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(["@/pages/home"], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(["@/pages/login"], resolve)
    },
    {
      path: '/signup',
      name: 'signup',
      component: resolve => require(["@/pages/signup"], resolve)
    },
    {
      path: '/download',
      name: 'download',
      component: resolve => require(["@/pages/clientdownload"], resolve)
    },
    {
      path: '/specialOffer',
      name: 'specialOffer',
      component: resolve => require(["@/pages/specialOffer"], resolve)
    },
    {
      path: '/viprank',
      name: 'viprank',
      component: resolve => require(["@/pages/viprank"], resolve)
    },
    {
      path: '/notice', //公告信息
      name: 'notice',
      component: resolve => require(["@/pages/notice"], resolve)
    },
    {
      path: '/records', //客户报表
      name: 'records',
      component: resolve => require(["@/pages/membercenter/records"],resolve)
    },
    {
      path: '/mgDetail/:sid',  //MG国际--客户报表
      name: 'mgDetail',
      component: resolve => require(["@/pages/membercenter/mgDetail"],resolve)
    },
    {
      path: '/memberCenter', //用户中心
      name: 'memberCenter',
      component: resolve => require(["@/pages/membercenter/memberCenter"],resolve)
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: resolve => require(["@/pages/membercenter/deposit"], resolve)
    },
    {
      path: '/channel/greenpay',
      name: 'greenpay',
      component: resolve => require(["@/pages/membercenter/pay.channel/greenpay.channel"], resolve)
    },
    {
      path: '/channel/alipay2card',
      name: 'alipay2card',
      component: resolve => require(["@/pages/membercenter/pay.channel/alipay2card.channel"], resolve)
    },
    {
      path: '/channel/scanpay',
      name: 'scanpay',
      component: resolve => require(["@/pages/membercenter/pay.channel/scan.channel"], resolve)
    },
    {
      path: '/channel/union',
      name: 'unionpay',
      component: resolve => require(["@/pages/membercenter/pay.channel/unionpay.channel"], resolve)
    },
    {
      path: '/userInfo', //用户基本信息
      name: 'userInfo',
      component: resolve => require(["@/pages/membercenter/userInfo"], resolve)
    },
    {
      path: '/bankInfo', //银行资料 bindBank
      name: 'bankInfo',
      component: resolve => require(["@/pages/membercenter/bankInfo"], resolve)
    },
    {
      path: '/bindBank', //绑定银行卡 bindBank
      name: 'bindBank',
      component: resolve => require(["@/pages/membercenter/bindBank"], resolve)
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: resolve => require(["@/pages/membercenter/withdraw"], resolve)
    },
    {
      path: '/gametran',
      name: 'gametran',
      component: resolve => require(["@/pages/membercenter/game.transfer"], resolve)
    },
    {
      path: '/settingOK', //设置成功
      name: 'settingOK',
      component: resolve => require(["@/pages/settingOK"], resolve)
    },
    {
      path: '/revampBankInfo', //修改银行信息
      name: 'revampBankInfo',
      component: resolve => require(["@/pages/membercenter/revampBankInfo"], resolve)
    },
    {
      path: '/safetyCenter', //安全中心
      name: 'safetyCenter',
      component: resolve => require(["@/pages/membercenter/safetyCenter"], resolve)
    },
    {
      path: '/safetyCenter/safeCheck/:name', //安全验证：邮箱验证，手机验证
      name: 'safeCheck',
      component: resolve => require(["@/pages/membercenter/safeCheck"], resolve)
    },
    {
      path: '/safetyCenter/safePassCheck',  //安全密码设置,登陆密码修改
      name: 'safePassCheck',
      component: resolve => require(["@/pages/membercenter/safePassCheck"], resolve)
    },
    {
      path: '/safetyCenter/resetSafePass',  //安全密码重置
      name: 'resetSafePass',
      component: resolve => require(["@/pages/membercenter/resetSafePass"], resolve)
    },
    {
      path: '/accountSetting',  //账号设置
      name: 'accountSetting',
      component: resolve => require(["@/pages/membercenter/accountSetting"], resolve)
    },
    {
      path: '/suggest',   //投诉建议
      name: 'suggest',
      component: resolve => require(["@/pages/suggest"], resolve)
    },
    {
      path: '/register',   //免费注册
      name: 'register',
      component: resolve => require(["@/pages/register"], resolve)
    },
    {
      path: '/findPwd',   //找回密码
      name: 'findPwd',
      component: resolve => require(["@/pages/findPwd"], resolve)
    },
    {
      path: '/self.service.entry',
      name: 'selforder',
      component: resolve => require(["@/pages/membercenter/self.service.entry"], resolve)
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: resolve => require(["@/pages/membercenter/promotion"], resolve)
    },
    {
      path: '/payorder/success',
      name: 'payorder',
      component: resolve => require(["@/pages/membercenter/pay.channel/payOrder.success"], resolve)
    },
    {
      path: '/vip', //vip俱乐部
      name: 'vip',
      component: resolve => require(["@/pages/membercenter/vip"], resolve)
    },
    {
      path: '/vipPlan', //vip成长计划
      name: 'vipPlan',
      component: resolve => require(["@/pages/vipPlan"], resolve)
    },
    {
      path: '/discount', //优惠活动-首页
      name: 'discount',
      component: resolve => require(["@/pages/discount"], resolve)
    },
    {
      path: '/discountDetail/:id', //优惠活动-详情页
      name: 'discountDetail',
      component: resolve => require(["@/pages/discountDetail"], resolve)
    },
    {
      path: '/liveCasino', //真人娱乐
      name: 'liveCasino',
      component: resolve => require(["@/pages/liveCasino"], resolve)
    },
    {
      path: '/egames',//电子游艺
      name: 'egames',
      component: resolve => require(["@/pages/egames"], resolve)
    },
    {
      path: '/fishgame',//捕鱼游戏
      name: 'fishgame',
      component: resolve => require(["@/pages/fishgame"], resolve)
    },
    {
      path: '/messageList',//消息列表
      name: 'messageList',
      component: resolve => require(["@/pages/membercenter/messageList"], resolve)
    },
    {
      path: '/message/:id',//消息
      name: 'message',
      component: resolve => require(["@/pages/membercenter/message"], resolve)
    },
    {
      path: '/eplatform/:id/:back?',//电子游艺平台分类
      name: 'eplatform',
      component: resolve => require(["@/pages/egames.platform"], resolve)
    },
    {
      path: '/launcher',//游戏启动页
      name: 'launcher',
      component: resolve => require(["@/launcher"], resolve)
    },
    {
      path: '/trygames',//游戏试玩
      name: 'trygames',
      component: resolve => require(["@/pages/trygames"], resolve)
    },
    {
      path: '/contactus',//联系我们
      name: 'contactus',
      component: resolve => require(["@/pages/contactus"], resolve)
    },
    {
      path: '/demo',//演示图
      name: 'demo',
      component: resolve => require(["@/pages/demo"], resolve)
    },
    {
      path: '/grabredpacket',//演示图
      name: 'grabredpacket',
      component: resolve => require(["@/pages/grabredpacket"], resolve)
    },
    {
      path: '/405',//系统维护升级
      name: '405',
      component: resolve => require(["@/405"], resolve)
    },
    {
      path: '/403',//访问受限
      name: '403',
      component: resolve => require(["@/403"], resolve)
    },
    { path: '*', component: resolve => require(["@/404"], resolve) }
  ]
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === "production_td") {
  routeConfig.routes.push({
    path: '/dev',
    name: 'dev',
    component: resolve => require(["@/pages/dev.page.list"], resolve)
  });
}

export default new Router(routeConfig)
