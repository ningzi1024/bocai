const state = {
  settingOkMsg:"",
  settingOkTitle:"",
  setTrueName:"",
  balance:-1, //账户余额
  noticeNum: -1,//未读消息
  verifyStr:"", //验证结果
  scrollTop:0, //会员中心
  discountScrollTop:0, //优惠活动列表
  routeCheckCode:"", //跳转路由验证参数
  curBankInfo:{} // 当前要修改的银行卡信息
};

const getters = {
  getMemberData: state => state
};

const mutations = {
  setSettingOkMsg(state,settingOkMsg=""){  //设置操作成功后：内容
    state.settingOkMsg = settingOkMsg;
  },
  setSettingOkTitle(state,settingOkTitle=""){ //设置操作成功后：标题
    state.settingOkTitle = settingOkTitle;
  },
  setTrueName(state,TrueName=""){ //真实姓名
    state.setTrueName = TrueName;
  },
  setBalance(state,balance=0){ //账号余额
    state.balance = balance;
  },
  setNoticeNum(state,noticeNum=0){ //未读消息
    state.noticeNum = noticeNum;
  },
  setVerifyStr(state, verifyStr=""){
    state.verifyStr = verifyStr
  },
  setScrollTop(state,scrollTop=0){
    state.scrollTop = scrollTop
  },
  setDiscountScrollTop(state, scrollTop=0){
    state.discountScrollTop = scrollTop
  },
  setRouteCheckCode(state,code=""){ // 进入绑定银行卡时的，任意字符串验证
    state.routeCheckCode = code
  },
  setCurBankInfo(state,info={}){
    state.curBankInfo = info
  }
};

export default {
  state,
  getters,
  mutations
}
