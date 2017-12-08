<template>
  <tf-layout id="app">
    <tf-navbar :style="siteConfig.style" slot="navbar" :class="['app-header',siteConfig.cssClass]" v-show="siteConfig.showHeader" fontsize=".28rem" :title="siteConfig.title">

      <a v-show="siteConfig.showMenu" @click="menue.open=true" slot="left">
        <tf-icon size=".44rem" :usetb="true" name="caidan"></tf-icon>
      </a>
      <a  v-if="siteConfig.backname" @click="$router.replace({name:siteConfig.backname})" slot="left">
        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
      </a>
      <a  v-else v-show="siteConfig.showBack" @click="back" slot="left">
        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
      </a>
      <a  slot="right" style="position:relative;"  @click="showService=true" v-show="siteConfig.showChat">
        <span>客服</span>
        <!-- <tf-icon name="kefu5"  @click.native="showService=true" size=".42rem"></tf-icon> -->
        <!-- <tf-icon name="xiaoxi1" size=".5rem"></tf-icon>
        <tf-badge color="#f00" style="padding:1px 4px;position: absolute; top: 3px; right: -5px;" bgcolor="#fff" type="danger" v-if="memberInfo.noticeNum>0">{{memberInfo.noticeNum}}</tf-badge> -->
      </a>
    </tf-navbar>
    <!-- <div class="app-content"> -->
    <div class="routerLoading" v-show="routerLoading">
      <span class="ico-router-loader">
      </span><br/>
      <span class="grayColor">努力加载，请稍后...</span>
    </div>
    <router-view v-show="!routerLoading"></router-view>
    <!-- </div> -->
    <tf-tabbar slot="tabbar" v-show="siteConfig.showNav">
      <tf-tabbar-item :active="$route.name ==='home'" title="首页" link="/">
        <tf-icon style="margin-top:0px;" name="shouye1" :usetb="true" slot="icon" size="0.46rem"></tf-icon>
      </tf-tabbar-item>
      <tf-tabbar-item :active="$route.name==='deposit'" title="存款" link="/deposit">
        <tf-icon name="qianbao1" :usetb="true" slot="icon" size="0.56rem"></tf-icon>
      </tf-tabbar-item>
      <tf-tabbar-item :active="$route.name==='gametran'" title="转账" link="/gametran">
        <tf-icon style="margin-top:0px;" name="jiaoyixinxi" :usetb="true" slot="icon" size="0.48rem"></tf-icon>
      </tf-tabbar-item>
      <tf-tabbar-item :active="$route.name==='promotion'" title="自助" link="/promotion">
        <tf-icon name="aixin-kong" :usetb="true" slot="icon" size="0.55rem"></tf-icon>
      </tf-tabbar-item>
      <tf-tabbar-item :active="$route.name ==='memberCenter'" title="会员" link="/memberCenter">
        <tf-icon name="jibenziliao" :usetb="true" slot="icon" size="0.55rem"></tf-icon>
      </tf-tabbar-item>
    </tf-tabbar>
    <tf-popup v-model="menue.open" class="tb-allframe" v-finger:swipe="toggle" position="left" width="58%">

      <div class="left-toolbar">
        <tf-cell-group>
          <tf-cell-item class="orangeBgc header-1" arrow @click.native="headerClick" style="padding-left:.1rem;">
            <span slot="left" class="icon-userface">
              <tf-icon name="yonghu" size=".76rem"></tf-icon>
            </span>

            <div class="right" slot="right">
              <h2>{{ isLogin ? hideACNT:'未登录'}}</h2>
              <p class="grayColor">

                {{ isLogin? '账户余额：'+balance:' 登录后体验更多精彩...'}}
              </p>
            </div>
          </tf-cell-item>
          <tf-cell-item v-if="!isLogin" class="header-2">
              <span slot="left" @click="headerClick" class="TbLogin-Btn fl">登录</span>
              <span slot="right" @click="goPage('/register')" class="TbReg-Btn fr">注册</span>
          </tf-cell-item>
          <tf-cell-item v-else class="header-2">
              <span slot="left" @click="goPage('/deposit')" class="TbUserCk-Btn fl">存款</span>
              <span slot="right" @click="goPage('/withdraw')" class="TbUserTk-Btn fr">提款</span>
          </tf-cell-item>
        </tf-cell-group>

        <ul>
          <li @click="goPage('/')" class="item-list">
            <span class="app-menu-ico menu01 fl"><tf-icon class="left-icon" name="shouye1" size=".32rem"></tf-icon></span>
            <span class="app-menu-bt fl">首页</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li>
          <li @click="goPage('/liveCasino')" class="item-list">
            <span class="app-menu-ico menu02 fl"><tf-icon class="left-icon" name="tuxing" size=".32rem"></tf-icon></span>
            <span class="app-menu-bt fl">真人娱乐</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li>
          <li @click="goPage('/egames')" class="item-list">
            <span class="app-menu-ico menu03 fl"><tf-icon class="left-icon" name="iconfont-game" size=".36rem"></tf-icon></span>
            <span class="app-menu-bt fl">电子游艺</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li>
          <li @click="goPage('/fishgame')" class="item-list">
            <span class="app-menu-ico menu08 fl"><tf-icon class="left-icon" name="yu" size=".38rem"></tf-icon></span>
            <span class="app-menu-bt fl">捕鱼游戏</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li>
          <li @click="openBBin(0,!isLogin)" class="item-list">
            <span class="app-menu-ico menu04 fl"><tf-icon class="left-icon" name="sheshitiyuguan" size=".32rem"></tf-icon></span>
            <span class="app-menu-bt fl">体育赛事</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li>
          <li @click="goPage('/discount')" class="item-list">
            <span class="app-menu-ico menu05 fl"><tf-icon class="left-icon" name="youhui1" size=".34rem"></tf-icon></span>
            <span class="app-menu-bt fl">优惠活动</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li>
          <li @click="goPage('/download')" class="item-list">
            <span class="app-menu-ico menu06 fl"><tf-icon class="left-icon" name="xiazai" size=".32rem"></tf-icon></span>
            <span class="app-menu-bt fl">客户端下载</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li>
          <!-- <li @click="onlineService" class="item-list serviceOnline">
            <span class="app-menu-ico menu07 fl"><tf-icon class="left-icon" name="zaixiankefu7" size=".34rem"></tf-icon></span>
            <span class="app-menu-bt fl">免费试玩</span>
            <tf-icon class="app-menu-jt fr" name="jiantou" size=".3rem"></tf-icon>
          </li> -->
        </ul>
        <tf-button v-if="isLogin" class="loginOutBtn app-user-out" @click.native="LoginOut" type="hollow">退出登录</tf-button>
      </div>
    </tf-popup>
    <tf-popup class="selector-bank" :useLock="false" v-model="showService" width="80%" position="center">
      <div class="serviceWraper">
        <h2 class="service-title">在线客服</h2>
        <tf-flexbox class="ptdot2rem">
            <tf-flexbox-item @click.native="onlineService" class="txt-center">
               <div class="mob-tb-kf fl zxkf"><tf-icon name="kefu51" size=".56rem"></tf-icon><p>在线客服</p></div>
            </tf-flexbox-item>

            <tf-flexbox-item @click.native="onlineQQService" class="txt-center">
               <div class="mob-tb-kf fr qqkf"><tf-icon name="qq1" size=".48rem"></tf-icon><p>QQ客服</p></div>
            </tf-flexbox-item>
        </tf-flexbox>
        <h2 class="service-title pbdot2rem">客服免费热线</h2>
        <p class="service-call txt-center blueColor"><a href="tel:4008427033">400-842-7033</a> </p>
        <p class="service-call txt-center blueColor"><a href="tel:13143969573">13143969573</a></p>
        <p class="service-call txt-center blueColor">
            <!-- <tf-icon name="guojichangtudianhua" size=".38rem" style="position: relative;bottom:-2px;margin-right:-4px;color: #ccc;"></tf-icon> -->
            <span style="font-size: .26rem;color: #ccc;">国际长途&nbsp;&nbsp;</span>
          <a href="tel:00639152888266">0063-9152888266</a>
        </p>

      </div>
    </tf-popup>
    <tf-backtop></tf-backtop>
    <!-- <iframe ref="ifrMessage" height="0" width="0" :srcdoc="messagerHtmlContent" frameborder="0">    </iframe>-->
  </tf-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import gVar from "./common/GlobalVars";
import gameMixins from "@/common/game.mixins";
import config from "@/common/evn.config";
import { Popup } from "@/tf-ui/components/popup";
import { FlexBox, FlexBoxItem } from "@/tf-ui/components/flexbox";
import { BackTop } from "@/tf-ui/components/backtop";
import { userAgent } from "./api/API.base";
import messageContent from "./common/message";
import api from "api/User";
import apiNames from "api/API.list";
export default {
  mixins: [gameMixins],
  components: {
    [Popup.name]: Popup,
    [FlexBox.name]: FlexBox,
    [FlexBoxItem.name]: FlexBoxItem,
    [BackTop.name]: BackTop
  },
  mounted() {
    this.getBalance();
    this.runInterval = setInterval(this.checkeUser, 5000);
    window.addEventListener("message", this.onMessage, false);
    this.initMessageControl();
    // this.hideScreen();
  },
  data() {
    return {
      currentNavItem: "index",
      showBottom: true,
      showHeader: true,
      bottomNav: "movies",
      bottomNavColor: "movies",
      showService: false,
      messagerHtmlContent: ``,
      menue: {
        open: false,
        docked: false
      },
      runInterval: null
    };
  },
  name: "app",
  methods: {
    ...mapMutations(["pushMsg"]),
    ag_active() {
      // debugger debugger
      // if (!this.ag_active_once) {
      //   let rqxin = require("../static/XINSlotEvent-v1.0.min.js");
      //   // console.log(rqxin)
      //   let xin = new rqxin();
      //   let imgPath = config.static;
      //   xin.API({
      //     action: "init",
      //     style: "large",
      //     lang: "ZH",
      //     pid: "TST",
      //     afterClose: "loop",
      //     imgPath: imgPath + "static/image/",
      //     mode: "test",
      //     goGameCallback: gameType => {
      //       console.log("点击进入游戏", gameType);
      //       this.playGame({
      //         trys: false,
      //         Gtype: "12",
      //         code: gameType,
      //         IsHtml5: false
      //       });
      //     }
      //   });
      //   this.ag_active_once = 1;
      // }
    },
    ...mapMutations(["setUser"]),
    goPage(url) {
      this.menue.open = false;
      this.$router.push(url);
    },
    handleChange(val) {
      this.bottomNav = val;
    },
    menueClick() {
      this.menue.open = !this.menue.open;
    },
    toggle(event) {
      if (event.direction === "Left" && this.menue.open == true)
        this.menue.open = false;
    },
    back() {
      if (!this.urlFrom) {
        this.$router.replace("/");
      } else {
        this.$router.back();
      }
    },
    headerClick() {
      if (this.isLogin) {
        this.$router.push("/memberCenter");
      } else {
        this.$router.push("/login");
      }
      this.menue.open = false;
    },
    hideScreen() {
      let screenDom = document.getElementById("splash-screen");
      // screenDom.remove();
      screenDom.classList.add("fadeOut");
      // mozAnimationEnd MSAnimationEnd oanimationend animationend
      if (typeof window["onanimationend"] != "undefined") {
        screenDom.addEventListener( "animationend", () => {
            screenDom.remove();
          }, false );
      } else if (typeof window["onwebkitanimationend"] != "undefined") {
        screenDom.addEventListener( "webkitAnimationEnd",  () => {
            screenDom.remove();
          },  false );
      } else {
        screenDom.remove();
      }

      console.log(screenDom.webkitAnimationEnd);
    },
    LoginOut() {
      // gVar.Token = "";
      // gVar.ACNT = "";
      // // gVar.hideACNT = "";
      // this.setUser({
      //   userName: gVar.ACNT,
      //   hideACNT: gVar.hideACNT,
      //   isLogin: false
      // });

      // this.$loading.open();
      // this.getLoginStatu();
      api[apiNames.Logout]()
        .then(rep => {
          let data = rep.data;
          if (data.Status === 1) {
            this.loginOut().then(() => {
              this.$loading.close();
              this.menue.open = false;
              this.$toast({
                mes: "退出成功",
                timeout: 1500
              });
            });
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                // this.alert({ mes: data.CNMessage, })
              }
            });
          }
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    },
    checkeUser() {
      let currentUser = this.user || "";
      let localUser = gVar.ACNT;
      let currentLoginStatu = this.isLogin;
      let localLoginStatu = gVar.loginStatu;
      // if(localLoginStatu === "true")
      // debugger;

      if (currentLoginStatu != localLoginStatu) {
        // console.log(currentLoginStatu, localLoginStatu);
        this.getLoginStatu().then(rep => {
          if (rep.data.Status === 1 && rep.data.row === "Successed")
            this.getBalance();
        });
      } else {
        if (currentLoginStatu && currentUser != localUser) {
          this.getLoginStatu().then(rep => {
            if (rep.data.Status === 1 && rep.data.row === "Successed")
              this.getBalance();
          });
        }
      }
      // if (currentUser != localUser && localUser != "") {

      // }
    },
    initMessageControl() {
      this.messagerHtmlContent = messageContent();
      // if(this.message.length<=0){
      //   // this.getMessages();
      // }
    },
    onMessage(e) {
      // console.log(e);
      if (e.data.type && e.data.type === "msg") {
        this.pushMsg(e.data.content);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    //console.log(to, from);
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.store.commit(setSiteConfig, { showBack: false, showNav: true });

    next();
  },
  created() {
    this.getLoginStatu();
  },
  computed: {
    ...mapGetters({
      siteConfig: "getAll",
      memberInfo: "getMemberData"
    }),
    ...mapState(["routerLoading", "balance", "urlFrom"])
  },
  watch: {
    routerLoading(val) {
      console.log(val, this.$route.name);

      // if (this.$route.name !== "launcher") this.ag_active();
    },
    isLogin() {
      // this.initMessageControl();
    }
  }
};
</script>

<style lang="less">
@import "./assets/css/app.less";

.icon-userface {
  background: #33314f;
  width: 0.88rem;
  height: 0.88rem;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 0.16rem;
  text-align: center;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.06);
  i {
    display: block;
    color: #524f76;
    margin-top: 0.1rem;
  }
}
.TbLogin-Btn {
  width: 1.76rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  font-size: 0.22rem;
  border-radius: 0.6rem;
  background-image: linear-gradient(to right bottom, #ff2549, #ff8080);
  box-shadow: 1px 1px 6px rgba(255, 120, 120, 0.2);
  color: #fff;
  opacity: 0.9;
}
.TbReg-Btn {
  width: 1.76rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  font-size: 0.22rem;
  border-radius: 0.6rem;
  background-image: linear-gradient(to right bottom, #47c0f5, #3eeac4);
  box-shadow: 1px 1px 6px rgba(71, 192, 245, 0.2);
  color: #fff;
  opacity: 0.9;
}

.TbUserCk-Btn {
  width: 1.76rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  font-size: 0.22rem;
  border-radius: 0.6rem;
  /*background-image: linear-gradient(to right bottom, #ff2549, #ff8080);*/
  border: 1px solid #ff2549;
  box-shadow: 1px 1px 6px rgba(255, 120, 120, 0.2);
  color: #ff2549;
  opacity: 0.72;
}
.TbUserTk-Btn {
  width: 1.76rem;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: center;
  font-size: 0.22rem;
  border-radius: 0.6rem;
  /*background-image: linear-gradient(to right bottom, #47c0f5, #3eeac4);*/
  border: 1px solid #47c0f5;
  box-shadow: 1px 1px 6px rgba(71, 192, 245, 0.2);
  color: #47c0f5;
  opacity: 0.72;
}

.app-menu-ico {
  width: 0.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.28rem;
  margin-right: 0.1rem;
  text-align: center;
  opacity: 0.9;
  &.menu01 i {
    /*background-image: linear-gradient(to right bottom,  #e22319, #fb5322);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #a12228;
  }
  &.menu02 i {
    /*background-image: linear-gradient(to bottom, #7307d7, #b25ee8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #008b8d;
  }
  &.menu03 i {
    /*background-image: linear-gradient(to bottom, #4e63fc, #7288f8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #5c29ee;
  }
  &.menu04 i {
    /*background-image: linear-gradient(to bottom, #3ec020, #6fd92e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #216b60;
  }
  &.menu05 i {
    /*background-image: linear-gradient(to bottom, #eb117f, #fe51e1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #f0382c;
  }
  &.menu06 i {
    /*background-image: linear-gradient(to bottom, #eb5b05, #fd9728);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #ca6111;
  }
  &.menu07 i {
    /*background-image: linear-gradient(to bottom, #cc1609, #f73f33);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #e27b27;
  }
  &.menu08 i {
    /*background-image: linear-gradient(to bottom, #0050b1, #17b3f5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
    color: #0044dd;
  }
}
/*.app-menu-ico {
  width: 0.48rem;
  height: 0.48rem;
  line-height: 0.48rem;
  margin-top: 0.3rem;
  margin-right: 0.2rem;
  border-radius: 32%;
  background: #e6e6e6;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  opacity: 0.45;
  &.menu01 {
    background-image: linear-gradient(to bottom, #fb5322, #e22319);
  }
  &.menu02 {
    background-image: linear-gradient(to bottom, #b25ee8, #7307d7);
  }
  &.menu03 {
    background-image: linear-gradient(to bottom, #7288f8, #4e63fc);
  }
  &.menu04 {
    background-image: linear-gradient(to bottom, #6fd92e, #3ec020);
  }
  &.menu05 {
    background-image: linear-gradient(to bottom, #fe51e1, #eb117f);
  }
  &.menu06 {
    background-image: linear-gradient(to bottom, #fd9728, #eb5b05);
  }
  &.menu07 {
    background-image: linear-gradient(to bottom, #f73f33, #cc1609);
  }
  &.menu08 {
    background-image: linear-gradient(to bottom, #17b3f5, #0050b1);
  }
  i {
    color: #fff;
  }
}*/
.app-menu-bt {
  background-image: linear-gradient(
    to bottom,
    rgba(235, 235, 255, 1),
    rgba(200, 200, 255, 0.6)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /*color: rgba(230,230,255,.85);*/
}
.app-menu-jt {
  color: rgba(185, 185, 255, 0.4);
}

.loginOutBtn {
  margin: 0.16rem auto !important;
  display: block !important;
  width: 88% !important;
  box-sizing: border-box !important;
  &.app-user-out {
    height: 0.72rem;
    border-radius: 6px;
    font-size: 0.24rem;
    color: rgba(220, 220, 255, 0.8);
    /*border: 1px solid #4d90ff;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.06);*/
    /*background-image:linear-gradient(to right bottom,#4d90ff,#87d3ff);*/
    /*background-image: linear-gradient(to bottom, #fff, #fafafa);*/
    &.btn-hollow {
      /*box-shadow: 1px 2px 6px rgba(155,155,255,.06);
      background: rgba(155,155,255,.14);*/
      background: none;
      background-image: linear-gradient(
        to right bottom,
        rgba(155, 155, 255, 0.12),
        rgba(155, 155, 255, 0.08)
      );
      border: none;
    }
  }
}

.routerLoading {
  position: absolute;
  height: 2rem;
  width: 80%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -60%);
  text-align: center;
  .ico-router-loader {
    width: 0.6rem;
    height: 0.6rem;
    display: inline-block;
    background-image: url("./assets/image/router-loading.png");
    background-size: cover;
    background-repeat: no-repeat;
    animation: rotate-loading 0.8s linear forwards infinite;
  }
}
.serviceWraper {
  padding: 0.2rem;
}
</style>
