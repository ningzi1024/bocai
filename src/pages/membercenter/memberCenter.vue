<template>
  <transition name="slide-right">
    <div class="userCenter">
      <tf-pullrefresh :onInfinite="reload" ref="pullrefreshDemo">
        <div class="userInfo">
          <div class="userImg fl"><tf-icon name="yonghu" size="1rem" color="#fff"></tf-icon></div>
          <ul class="info bfc">
            <li class="fl">
              <div class="username">欢迎您，<span>{{username}}</span></div>
              <div class="level" @click="routePath('/vip')">
                <span class="vip"><i class="icon tb icon-VIP"></i></span>
                <span class="vip-name">{{ vipName }}</span>
              </div>
            </li>
            <li class="fr"><div class="fr">安全等级：<span>{{ sleverName[sleverNameIndex] }}</span></div></li>
            <!-- <li class="progress">
              <tf-progressbar type="line" :progress="slever" trailWidth="2" trailColor="#f01924"></tf-progressbar>
            </li> -->
          </ul>
        </div>
        <div class="account">
          <div class="userMoney" @click="getBalance">
            <span class="fl">主账户余额</span>
            <span class="fl">
              <tf-countup class="money" ref="moneyshow" :endnum="account" :use-easing="true"  decimals="2" separator="," :duration="duration"></tf-countup>
              
              <!-- <span class="money">{{account}}</span> -->
              
              </span>
            <span :class="{'fr':true, 'shuaxin-money':true,'shuaxin-loading':showLoading}"><tf-icon name="refresh"  size="0.24rem"></tf-icon>刷新</span>
          </div>
          <dl @click="routePath('/deposit')">
            <dt><tf-icon name="yinhangqia" size="0.53rem" color="#fff"></tf-icon></dt>
            <dd><h3>会员存款</h3></dd>
            <!-- <dd><span>存款快捷，投注无忧</span></dd> -->
          </dl>
          <dl class="n2 noborder" @click="routePath('/withdraw')">
            <dt><tf-icon name="tikuan" size="0.46rem" color="#fff"></tf-icon></dt>
            <dd><h3>会员提款</h3></dd>
            <!-- <dd><span>尚未绑定银行卡</span></dd> -->
          </dl>
          <dl class="n3" @click="routePath('/gametran')">
            <dt><tf-icon name="zhuanzhang" size="0.48rem" color="#fff"></tf-icon></dt>
            <dd><h3>户内转账</h3></dd>
            <!-- <dd><span>请先查看游戏厅额度</span></dd> -->
          </dl>
          <dl class="n4 noborder" @click="routePath('self.service.entry')">
            <dt><tf-icon name="zizhuruzhang" size="0.45rem" color="#fff"></tf-icon></dt>
            <dd><h3>自助入账</h3></dd>
            <!-- <dd><span>支付宝转银行卡</span></dd> -->
          </dl>
        </div>
        <div class="userNav">
          <tf-cell-group>
            <tf-cell-item @click.native="routePath('/promotion')" arrow>
              <span slot="left" class="myIcon" style="background:#ff396b;">
                <tf-icon name="zizhuyouhui" size="0.36rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">自助优惠</span>
            </tf-cell-item>
            <tf-cell-item @click.native="routePath('/records')" arrow>
              <span slot="left" class="myIcon" style="background:#3975fc;">
                <tf-icon name="baobiao" size="0.36rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">客户报表</span>
            </tf-cell-item>
            <tf-cell-item @click.native="routePath('/userInfo')" arrow>
              <span slot="left" class="myIcon" style="background:#00b8cc;">
                <tf-icon name="huiyuan" size="0.36rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">基本信息</span>
            </tf-cell-item>
            <!--<tf-cell-item @click.native="routePath(isBingBank?'bankInfo':'bindBank')" arrow>-->
            <tf-cell-item @click.native="routePath('bankInfo')" arrow>
              <span slot="left" class="myIcon" style="background:#29c900;">
                <tf-icon name="yinhangziliao" size="0.25rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">银行卡管理</span>
              <span slot="right" class="desc" v-show="!isBingBank">未绑定银行卡</span>
            </tf-cell-item>
            <tf-cell-item @click.native="routePath('/accountSetting')" arrow>
              <span slot="left" class="myIcon" style="background:#d18218;">
                <tf-icon name="zhanghushezhi" size="0.38rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">账户设置</span>
            </tf-cell-item>
            <tf-cell-item @click.native="routePath('/safetyCenter')" arrow>
              <span slot="left" class="myIcon" style="background:#8a3dba;">
                <tf-icon name="anquanyanzheng" size="0.36rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">安全验证</span>
              <span slot="right" class="desc" v-show="wantCheckNum">尚有{{ wantCheckNum }}项待验证</span>
            </tf-cell-item>
            <tf-cell-item @click.native="routePath('/safetyCenter/safePassCheck')" arrow>
              <span slot="left" class="myIcon" style="background:#2469fb;">
                <tf-icon name="mimaguanli" size="0.36rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">密码管理</span>
            </tf-cell-item>
            <tf-cell-item @click.native="routePath('/notice')" arrow>
              <span slot="left" class="myIcon" style="background:#fd2b03;">
                <tf-icon name="gonggaoxinxi" size="0.36rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">公告信息</span>
              <span slot="right" class="desc" v-show="noticeNum">{{ noticeNum }}</span>
            </tf-cell-item>
            <tf-cell-item @click.native="routePath('/suggest')" arrow>
              <span slot="left" class="myIcon" style="background:#a32c00;">
                <tf-icon name="tousujianyi" size="0.36rem" color="#fff"></tf-icon>
              </span>
              <span slot="left">投诉建议</span>
            </tf-cell-item>
          </tf-cell-group>
          <tf-button size="large" @click.native="sigup()" class="user-btnout boxshadow" type="hollow">退出当前账号</tf-button>
        </div>
      </tf-pullrefresh>
  </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import ajaxCommon from "common/ajaxCommon";
import Api from "api/User";
import ApiNames from "api/API.list";
import config from "common/config";
import { CountUp } from "../../tf-ui/components/countup";
import gvars from "common/GlobalVars";
import { PullRefresh } from "@/tf-ui/components/pullrefresh";
export default {
  name: "userCenter",
  data() {
    return {
      slever: "0", //安全等级进度条长度
      sleverNameIndex: 0, //低，中，高
      account: 0, //账号余额
      isBingBank: false, //是否绑定了银行卡
      wantCheckNum: 0, //未验证项目
      noticeNum: 0, //未读消息数
      duration: 1,
      vipName: "",
      username: "",
      token: "",
      getMemberData: {},
      isloaded: false
    };
  },
  watch: {
    showLoading(value) {
      // console.log(value);
    },
    balance(value) {
      this.account = value;
      this.$store.commit("setBalance", value);
    },
    isLogin(value) {
      if (!value) {
        this.needLogin();
      }
    }
  },
  computed: {
    ...mapState(["showLoading", "balance"])
  },
  created() {
    this.sleverName = ["低", "中", "高"];
    this.groupId = gvars.GroupID;
    this.groupVipName = [
      "普通会员",
      "普通VIP",
      "白银VIP",
      "黄金VIP",
      "钻石VIP",
      "至尊VIP",
      "青铜VIP"
    ];
    this.username = gvars.hideACNT;
    this.getMemberData = this.memberData();
    this.token = gvars.Token;
  },
  mounted() {
    // console.log("verifyStr:" + this.getMemberData.verifyStr);
    if (this.wantLoad()) {
      this.getAllData();
    }
    this.getVipName();
    this.getScrollTop();
  },
  methods: {
    //一起发送ajax请求
    getAllData() {
      if (this.loaded) {
        return;
      }
      // ajaxBeforeThen("UserBalance")
      let queue = ["SleVerification", "UserBalance", "GetAnno"];
      let promiseQueue = [];
      let callBackQueue = [
        this.getUserSlever,
        this.getAccount,
        this.getNoticeNum
      ];
      queue.forEach(item => {
        promiseQueue.push(this.ajaxBeforeThen(item));
      });
      this.$loading.open();
      Promise.all(promiseQueue)
        .then(res => {
          this.$loading.close();
          this.isloaded = true;
          res.forEach((item, index) => {
            callBackQueue[index](item);
          });
        })
        .catch(() => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    },

    //提交ajax请求
    ajaxBeforeThen(apiName) {
      return Api[ApiNames[apiName]]();
    },

    //是否重新加载
    wantLoad() {
      if (this.token) {
        if (
          this.getMemberData.verifyStr &&
          this.getMemberData.noticeNum > -1 &&
          this.getMemberData.balance > -1
        ) {
          this.SleverDone(this.getMemberData.verifyStr);
          this.noticeNum = this.getMemberData.noticeNum;
          this.account = this.getMemberData.balance;
          return false;
        }
      }
      return true;
    },

    //获取验证信息ajax
    getUserSlever(res) {
      let data = res.data;
      if (data.Status === config.ERR_OK) {
        //有验证项
        this.SleverDone(data.row);
        this.setUser({
          userName: gvars.ACNT,
          hideACNT: gvars.hideACNT,
          isLogin: true
        });
      } else if (data.Status === 963) {
        //新用户，无验证项
        this.wantCheckNum = 4;
      } else {
        this.sysErrCheck(data.Status).then(canrun => {
          if (canrun) {
            this.alertTip(data.CNMessage);
          }
        });
      }
    },

    //提取验证信息
    SleverDone(sleverStr) {
      if (!sleverStr) return;
      let dataArray;
      let verifyNum = 4;
      if (sleverStr == undefined) return;
      else dataArray = JSON.parse(sleverStr);
      this.$store.commit("setVerifyStr", sleverStr);
      let parent = dataArray.length / verifyNum;
      this.slever = parent;
      if (parent < 0.5) {
        // 低
        this.sleverNameIndex = 0;
      } else if (0.5 <= parent && parent <= 0.7) {
        // 中
        this.sleverNameIndex = 1;
      } else {
        // 高
        this.sleverNameIndex = 2;
      }
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].SecType == 5) {
          this.isBingBank = true;
        }
        this.wantCheckNum = verifyNum - dataArray.length;
      }
    },

    //获取账号余额
    getAccount(res) {
      if (res.data.Status == config.ERR_OK) {
        let money = res.data.row;
        if (typeof money == "string") {
          money = money.replace(",", "");
          money = parseFloat(money);
        }
        this.account = money;
        this.$store.commit("setBalance", money);
      } else {
        this.sysErrCheck(res.data.Status).then(canrun => {
          if (canrun) {
            this.alertTip(res.data.CNMessage);
          }
        });
      }
    },

    //获取通知数
    getNoticeNum(res) {
      if (res.data.Status === config.ERR_OK) {
        let nowlen = res.data.row.length;
        let localen = localStorage.getItem("tengbo.notice.number")
          ? localStorage.getItem("tengbo.notice.number")
          : 0;
        this.noticeNum = nowlen - localen;
        this.$store.commit("setNoticeNum", nowlen - localen);
      } else {
        this.sysErrCheck(res.data.Status).then(canrun => {
          if (canrun) this.alertTip(res.data.CNMessage);
        });
      }
    },

    //获取会员称号
    getVipName() {
      let groupId = this.groupId;
      if (groupId == 6) {
        this.vipName = this.groupVipName[5];
      } else {
        this.vipName = this.groupVipName[groupId - 1];
      }
    },

    getScrollTop() {
      let st = this.getMemberData.scrollTop;
      if (st > 0) {
        document.getElementById("scrollView").scrollTop = st;
      }
    },

    //路由跳转 统一 入口
    routePath(route) {
      route = route || "/";
      this.$router.push(route);
    },

    //下拉刷新
    reload() {
      this.isloaded = false;
      this.getAllData();
      this.$refs.pullrefreshDemo.$emit("tf.pullrefresh.finishLoad");
    },

    //退出登录
    sigup() {
      ajaxCommon("Logout", {}, 1, this).then(res => {
        if (res) {
          this.loginOut().then(() => {
            this.$store.commit("setVerifyStr", "");
            this.$store.commit("setScrollTop", 0);
            this.$store.commit("setBalance", 0);
            this.$store.commit("setBalance", 0);
            setTimeout(() => {
              this.$router.push("/login");
            }, 20);
          });
        }
      });
    },

    //弹出框
    alertTip(msg, type) {
      type = type || "error";
      this.$toast({
        mes: msg,
        timeout: 1500,
        icon: type
      });
    },

    ...mapMutations([
      "setSiteConfig",
      "setBalance",
      "setNoticeNum",
      "setVerifyStr",
      "setScrollTop"
    ]),

    ...mapGetters({
      memberData: "getMemberData"
    }),
    ...mapActions(["getBalance"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("setSiteConfig", {
        title: "会员中心",
        showMenu: true,
        showBack: false,
        showNav: true,
        showChat: true
      });
      // alert(vm.balance);
    });
  },
  beforeRouteLeave(to, from, next) {
    let st = document.getElementById("scrollView").scrollTop;
    this.$store.commit("setScrollTop", st);
    next();
  },
  components: {
    [CountUp.name]: CountUp,
    [PullRefresh.name]: PullRefresh
  }
};
</script>

<style scoped lang="less">
@color-red: #f01924;
@color-border: #f5f5f5;
.userCenter {
  background: #f0f0f0;
  position: relative;
  &.slide-right-enter,
  &.slide-right-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  &.slide-right-enter-active,
  &.slide-right-leave-active {
    transition: all 0.2s ease;
  }
  .userInfo {
    height: 1.8rem;
    background: #fff;
    overflow: hidden;
    .userImg {
      float: left;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      overflow: hidden;
      margin: 0.3rem 0.3rem 0.3rem 0.2rem;
      background: #efe5e4;
      -webkit-border-radius: 50%;
      border-radius: 50%;
      i {
        position: relative;
        top: 0.11rem;
      }
    }
    ul.info {
      /*float: left;*/
      padding: 0.32rem 0;
      color: #444;
      li {
        padding: 0.1rem 0;
        .username {
          color: #aaa;
          font-size: 0.24rem;
          margin-right: 0.2rem;
          span {
            color: #06f;
            font-size: 0.28rem;
          }
        }
        div.fr {
          padding: 0 0.25rem;
          font-size: 0.22rem;
          line-height: 0.6rem;
          background: rgba(255, 255, 255, 1);
          border: 1px solid #eee;
          box-shadow: -0.01rem 0.05rem 0.3rem rgba(0, 0, 0, 0.05);
          border-right: none;
          color: #aaa;
          border-radius: 0.6rem 0 0 0.6rem;
          span {
            color: #f80;
          }
        }
        .level {
          position: relative;
          margin: 0.12rem 0 0 0;
          background: #a99963;
          height: 0.4rem;
          line-height: 0.4rem;
          border-radius: 0.4rem;
          color: #fff;
          .vip {
            position: absolute;
            left: -1px;
            top: -1px;
            width: 0.4rem;
            height: 0.4rem;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            z-index: 1;
            overflow: hidden;
            box-sizing: content-box;
            border: 1px solid #fff;
            border-left: none;
            .icon {
              font-size: 0.4rem;
              margin: 0 0 0 0.015rem;
            }
          }
          .vip-name {
            padding-left: 0.52rem;
            font-size: 0.24rem;
          }
        }
        &:nth-child(2) {
          span {
            color: @color-red;
          }
        }
        .progress-wrap {
          display: inline-block;
          width: 5rem;
          height: 0.12rem;
          position: relative;
          background: #eee;
          -webkit-border-radius: 6px;
          border-radius: 0.06rem;
          .progress-con {
            display: inline-block;
            width: 29%;
            height: 100%;
            background: @color-red;
            position: absolute;
            -webkit-border-radius: 6px;
            border-radius: 6px;
            transition: width 0.8s ease;
          }
        }
        &.progress {
          height: 0.28rem;
          overflow: hidden;
        }
      }
    }
  }
  .account {
    background: #fff;
    margin-top: 0rem;
    overflow: hidden;
    .userMoney {
      float: left;
      width: 100%;
      font-size: 0.24rem;
      color: #bbb;
      height: 1.08rem;
      padding: 0 0 0 0.3rem;
      line-height: 1.08rem;
      border-top: 1px solid @color-border;
      border-bottom: 1px solid @color-border;
      background: #fff;
      .money {
        font-size: 0.32rem;
        color: @color-red;
        font-weight: 400;
        position: relative;
        top: -1px;
        margin: 0 0.12rem 0 0.2rem;
      }
      .shuaxin-money {
        color: #aaa;
        padding: 0 0.3rem;
        font-size: 0.24rem;
        i {
          margin-right: 2px;
        }
        &.shuaxin-loading {
          i {
            display: inline-block;
            animation: rotate-loading 0.45s linear forwards infinite;
          }
        }
      }
    }
    dl {
      width: 25%;
      float: left;
      /*border:1px solid @color-border;*/
      border-top: 0;
      border-left: 0;
      padding: 0.25rem 0 0.1rem 0;
      overflow: hidden;
      text-align: center;
      &.noborder {
        border-right: 0;
      }
      dt {
        width: 0.96rem;
        height: 0.96rem;
        overflow: hidden;
        margin: 0 auto;
        -webkit-border-radius: 44%;
        border-radius: 44%;
        background-image: -webkit-linear-gradient(to bottom, #a08dff, #c5a2ff);
        background-image: linear-gradient(to bottom, #a08dff, #c5a2ff);
        box-shadow: 0 1px 0.05rem rgba(0, 0, 0, 0.1);
        text-align: center;
        i {
          color: #fff;
          font-size: 0.45rem;
          line-height: 0.96rem;
        }
      }
      &.n2 dt {
        background-image: -webkit-linear-gradient(to bottom, #ff7884, #ff71b5);
        background-image: linear-gradient(to bottom, #ff7884, #ff71b5);
      }
      &.n3 dt {
        background-image: -webkit-linear-gradient(to bottom, #ffbb57, #ffcf41);
        background-image: linear-gradient(to bottom, #ffbb57, #ffcf41);
      }
      &.n4 dt {
        background-image: -webkit-linear-gradient(to bottom, #4feabe, #42e5e9);
        background-image: linear-gradient(to bottom, #4feabe, #42e5e9);
        i.icon {
          line-height: 1rem;
        }
      }
      dd {
        color: #aaa;
        overflow: hidden;
        h3 {
          font-size: 0.22rem;
          font-weight: 500;
          text-align: center;
          color: #aaa;
          line-height: 0.5rem;
        }
      }
    }
  }
  .myIcon {
    width: 0.64rem;
    height: 0.64rem;
    border-radius: 38%;
    opacity: 1;
    text-align: center;
    margin-right: 0.2rem;
    display: inline-block;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    i {
      line-height: 0.68rem;
    }
  }
  .desc {
    background: #fc0;
    color: #fff;
    font-size: 0.22rem;
    line-height: 0.4rem;
    padding: 0 0.2rem;
    border-radius: 0.4rem;
  }
  .userNav {
    margin: 0.15rem 0 0 0;
    .m-cell-box {
      margin-bottom: 0.15rem;
    }
  }
  .user-btnout {
    position: relative;
    width: 96%;
    margin: 0.2rem 2% -0.25rem 2%;
    height: 0.88rem;
    border-color: #e3e3e3;
    background: #fcfcfc;
  }
}
</style>
