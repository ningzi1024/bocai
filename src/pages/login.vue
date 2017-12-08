<!--
    * 登录页面
-->
<template>
    <div class="container">
        <tf-cell-group>
            <tf-cell-item class="item">
                <span slot="left">
                    <tf-icon class="iconcust" :usetb="true" name="huiyuan" size=".36rem" color="#aaa"></tf-icon>
                    <span class="label">账号</span>
                </span>
                <tf-input slot="right" :required="true" v-model="name" :showSuccessIcon="false" :showRequiredIcon="false" max="20" placeholder="请输入您的用户名"></tf-input>
            </tf-cell-item>
            <tf-cell-item class="item">
                <span slot="left">
                    <tf-icon class="iconcust" :usetb="true" name="mimaguanli" size=".36rem" color="#aaa"></tf-icon>
                    <span class="label">密码</span>
                </span>
                <tf-input :required="true" slot="right" type="password" :showSuccessIcon="false" :showRequiredIcon="false" v-model="pwd" placeholder="请输入登录密码"></tf-input>
            </tf-cell-item>
            <tf-cell-item v-if="needVcode" class="item">
                <span slot="left">
                    <tf-icon @click.native="getVCode" class="iconcust" name="xuexiao" size=".36rem" color="#aaa"></tf-icon>
                    <span class="label">验证码</span>
                </span>

                <span class="right" slot="right">
                    <tf-input style="padding-right:1.74rem;" max="4" type="number" :showClearIcon="false" :showErrorIcon="false" :showSuccessIcon="false" :showRequiredIcon="false" v-model="vcode" placeholder="请输入验证码"></tf-input>
                    <img class="img" :src="vcodeSrc" @click="getVCode" /></span>
            </tf-cell-item>
        </tf-cell-group>
        <tf-button size="large" @click.native="login()" class="btnLogin" type="primary">登&nbsp;&nbsp;录</tf-button>
        <tf-button size="large" @click.native="$router.push('/findPwd')" class="btnLogin-2 fl" type="primary">忘记密码</tf-button>
        <tf-button size="large" @click.native="$router.push('/register')" class="btnLogin-2 fr" type="primary">免费注册</tf-button>
        <!-- <tf-button size="large" @click.native="login()" class="btnLogin" type="hollow">用户登录</tf-button>
                                                                                <tf-button size="large" @click.native="login()" class="btnLogin" type="disabled">用户登录</tf-button> -->
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import api from "api/User";
import apiNames from "api/API.list";
import gvars from "@/common/GlobalVars";
export default {
  components: {},
  name: "login",
  data: () => {
    return {
      gVars: gvars,
      name: "",
      pwd: "",
      vcode: "",
      needVcode: false,
      vcodeSrc: "",
      from: null
    };
  },
  methods: {
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig",
      "setUser"
    ]),
    getVCode() {
      api[apiNames.GetVerifyCode]()
        .then(rep => {
          let data = rep.data;
          if (data.Status == 1) {
            this.vcodeSrc = "data:image/png;base64," + data.row.imgdata;
          }
        })
        .catch(err => {
          this.$toast({
            mes: "获取验证码失败",
            timeout: 1500,
            icon: "error"
          });
        });
    },
    login() {
      if (this.name.length <= 0) {
        this.$toast({
          mes: "请输入您的用户名",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      if (this.pwd.length <= 0) {
        this.$toast({
          mes: "请输入登录密码",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      if (this.needVcode && this.vcode.length != 4) {
        this.$toast({
          mes: "请输入验证码",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      this.$loading.open();
      this.name = this.name.toLowerCase();
      let inputData = {
        UserPassword: this.pwd,
        ACNT: this.name.toLowerCase()
      };
      if (this.needVcode) {
        inputData.vcode = this.vcode;
      }
      api[apiNames.Login](inputData)
        .then(rep => {
          let data = rep.data;
          if (data.Status == 1) {
            this.gVars.ACNT = data.row.ACNT;
            this.gVars.GroupID = data.row.GroupID;
            this.needVcode = false;
            this.gVars.hideACNT = data.row.HideACNT;
            this.gVars.loginStatu = true;
            // console.log({ 'userName': data.row.ACNT,'hideACNT':data.row.HideACNT, 'isLogin': true })
            this.setUser({
              userName: data.row.ACNT,
              hideACNT: data.row.HideACNT,
              isLogin: true
            });
            this.getBalance();
            api[apiNames.EgameptLogin]()
              .then(rep => {
                let data = rep.data;
                if (data.Status === 1) {
                  this.gVars.ptAccount = data.row;
                  this.gVars.userPwd = this.pwd;
                }
                this.$loading.close();
                if (this.from !== null) window.history.back();
                else this.$router.replace({ name: "home" });
              })
              .catch(err => {
                this.$loading.close();
                console.log("EgameptLogin登录失败");

                // this.$alert({
                //     mes: "系统错误，请稍候再试"
                // });
                if (window.history.length > 2) window.history.back();
                else this.$router.replace({ name: "home" });

                this.sysErrCheck(-9);
              });
          } else {
            this.$loading.close();
            this.sysErrCheck(data.Status).then(e => {
              if (e) {
                if (data.Status == "8004") {
                  this.confirm({
                    title: "温馨提示",
                    mes: "密码错误超过5次，锁定24小时，可通过找回密码解锁！",
                    icon: "warn",
                    opts: [
                      {
                        txt: "知道了",
                        color: false,
                        callback: () => {}
                      },
                      {
                        txt: "找回密码",
                        color: true,
                        callback: () => {
                          this.$router.push({ name: "findPwd" });
                        }
                      }
                    ]
                  });
                } else if (data.Status == "12") {
                  this.$alert({
                    mes: "密码错误，还剩余" + data.args[1] + "次机会"
                  });
                } else {
                  this.$alert({
                    mes: data.CNMessage
                  });
                }
              }
            });
            this.getVCode();
            this.needVcode = true;
          }
        })
        .catch(err => {
          this.needVcode = true;
          this.getVCode();
          this.$loading.close();
        });
    },

    //路由跳转
    routePath(path) {
      this.$router.push(path);
    }
  },

  created() {
    // this.gVars.Token = "";
    // this.gVars.SID = "";
    this.needVcode = gvars.isNeedVcode ? true : false;
    if (this.needVcode) {
      this.getVCode();
    }
  },
  mounted() {
    this.$loading.open();
    this.getLoginStatu().then(rep => {
      this.$loading.close();
      if (rep.data.Status === 1 && rep.data.row === "Successed") {
        this.$router.replace("/");
      }
    });
    // this.getBalance();
  },
  watch: {
    needVcode: function(val, oldVal) {
      this.gVars.isNeedVcode = val;
      // if (val === true) {
      //     this.getVCode();
      // }
    }
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from.name;
      vm.$store.commit("setSiteConfig", {
        title: "会员登录",
        showMenu: false,
        showBack: true,
        showNav: false,
        showChat: false
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.$store.commit('setSiteConfig', { showBack: false, showNav: true });
    next();
  },
  computed: {
    ...mapState(["showLoading"])
  }
};
</script>

<style lang="less" scoped>
@left : .2rem;
.container {
  margin: 0.3rem 0.2rem 0 0.2rem;

  .btnLogin {
    width: 100%;
    margin: 0;
    height: 0.9rem;
    box-shadow: 0 0.02rem 0.3rem rgba(220, 0, 0, 0.25);
  }
  .btnLogin-2 {
    width: 48%;
    height: 0.9rem;
    background: #fff;
    color: #09f;
    border: 1px solid #eaeaea;
    box-shadow: 0 0.02rem 0.3rem rgba(0, 0, 0, 0.06);
    margin: 0.25rem 0 0 0;
  }
  .right {
    display: inline-block;
    width: 100%;
    position: relative;
  }
  .item {
    padding-top: 0.06rem;
    padding-bottom: 0.06rem;
    .iconcust {
      position: absolute;
      top: 0.48rem;
      left: @left;
    }
    .label {
      display: inline-block;
      padding-left: @left+0.25rem;
      padding-right: @left;
      width: 1.5rem;
    }
    .img {
      width: 1.5rem;
      height: 0.6rem;
      border-radius: 5px;
      position: absolute;
      top: 0.2rem;
      right: 0.24rem;
    }
  }
}

.m-cell-box {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.3rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.06);
}

.container .item div {
  padding-top: 0px;
}
</style>

