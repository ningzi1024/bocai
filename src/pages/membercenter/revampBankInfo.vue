<template>
  <transition name="slide-left">
  <div class="bindInfo">

    <div class="warnText">
      <span>以下为重置银行卡信息！重置成功后，原来的将被注销并替换</span>
    </div>
    <div class="Cont-Spacing-02">
      <tf-cell-group>
        <tf-cell-item arrow @click.native="chooseBank()">
          <span slot="left" class="title">收款银行</span>
          <span slot="left" class="chooseSort">{{ bankName||bankShow }}</span>
        </tf-cell-item>
        <tf-cell-item arrow @click.native="chooseCity()">
          <span slot="left" class="title">开户城市</span>
          <span slot="left" class="chooseSort">{{ bankCity?bankCity.itemName1 +' '+bankCity.itemName2 : cityShow}}</span>
        </tf-cell-item>
      </tf-cell-group>
    </div>

    <div class="Cont-Spacing-02">
      <tf-cell-group>
        <tf-cell-item>
          <span slot="left" class="title">开户姓名</span>
          <span slot="left">{{info.TrueName}}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">银行账号</span>
          <tf-input :required="true" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" :max="20" placeholder="请输入您的银行卡号" v-model="bankNum1"></tf-input>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">确认账号</span>
          <tf-input :required="true" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" :max="20" placeholder="请再输一遍银行卡号" v-model="bankNum2"></tf-input>
        </tf-cell-item>
      </tf-cell-group>
    </div>

    <tf-selector-bank :items="selector.bank.list" :selectedItem="bankName" @selected="selector.bank.selected" v-model="selector.bank.show"></tf-selector-bank>
    <tf-cityselect :items="selector.city.list" :ready="selector.city.show" :done="selector.city.selected" v-model="selector.city.show"></tf-cityselect>
    <tf-button size="large" @click.native="bankInfoSubmit()" class="btnSubmit btn-boxshadow" type="primary">确认</tf-button>
  </div>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Api from "api/User";
import ApiNames from "api/API.list";
import config from "common/config";
import banklist from "common/banklist";
import cityList from "common/cityList";
import selectorBank from "./pay.channel/selector.banks";

export default {
  name: "bankInfo",
  created() {
    this.selector.bank.list = banklist;
    this.selector.city.list = cityList;
    this.info = this.getMemberData().curBankInfo;
  },
  data() {
    return {
      bankName: "",
      bankShow: "请选择绑定银行",
      bankCity: {},
      cityShow: "请选择您开户所在的区域",
      username: "",
      bankNum1: "",
      bankNum2: "",
      code: "", //验证码
      mobile: "", //手机号码
      getCodeIsReady: true,
      seconds: 60,
      formData: {},
      selector: {
        bank: {
          show: false,
          list: [],
          selected: item => {
            this.bankName = item.value;
            this.bankShow = item.text;
          }
        },
        city: {
          list: [],
          show: false,
          selected: item => {
            console.log(item);
            this.bankCity = item;
          }
        }
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 20);
  },
  methods: {
    //组件初始化入口
    init() {
      if (!this.getMemberData().curBankInfo.TrueName) {
        this.$router.push("/memberCenter");
        return;
      }
      this.bankName = this.info.BankName;
      this.bankCity.itemName1 = this.info.Loc1;
      this.bankCity.itemName2 = this.info.Loc2;
    },

    //获取验证码
    getCode() {
      if (!this.getCodeIsReady) return;
      if (this.mobile.length <= 0 || this.mobile.length > 11) {
        this.alertTip("请输入正确的手机号码！");
        return false;
      }
      this.$loading.open("发送中...");
      Api[ApiNames.PasswordTelCommand]({
        Tel: this.mobile,
        type: "15"
      })
        .then(res => {
          this.$loading.close();
          if (res.data.Status === 964) {
            //成功
            this.getCodeIsReady = false;
            this.alertTip("发送成功！", "success");
          } else {
            this.sysErrCheck(res.data.Status).then(canrun => {
              if (canrun) {
                this.alertTip(res.data.CNMessage);
              }
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          console.log(err);
          this.sysErrCheck(-9);
        });
    },

    //选择银行
    chooseBank() {
      this.selector.bank.show = true;
    },

    //选择城市
    chooseCity() {
      console.log(cityList);
      this.selector.city.show = true;
    },

    //提交数据
    bankInfoSubmit() {
      if (this.formCheck()) {
        this.$loading.open();
        Api[ApiNames.SecCodeMifBankCode](this.formData)
          .then(res => {
            this.$loading.close();
            if (res.data.Status === 981) {
              this.confirm({
                title: "操作成功！",
                mes: "您的银行资料已经设置成功！",
                icon: "wancheng",
                opts: [
                  {
                    txt: "确定",
                    color: true,
                    callback: () => {
                      this.$router.back();
                    }
                  }
                ]
              });
            } else {
              this.sysErrCheck(res.data.Status).then(canrun => {
                if (canrun) {
                  this.alertTip(res.data.CNMessage);
                }
              });
            }
          })
          .catch(err => {
            this.$loading.close();
            console.log(err);
            this.sysErrCheck(-9);
          });
      }
    },

    //表单验证
    formCheck() {
      let data = {};
      if (!this.bankName) {
        this.alertTip("请选择收款银行!");
        return false;
      } else if (this.bankCity == null) {
        this.alertTip("请选择开户城市!");
        return false;
      } else if (!this.bankNum1) {
        this.alertTip("请输入银行账号!");
        return false;
      } else if (this.bankNum1.length < 16 || this.bankNum1.length > 19) {
        this.alertTip("请输入正确的银行账号!");
        return false;
      } else if (!this.bankNum2) {
        this.alertTip("请输入确认账号!");
        return false;
      } else if (this.bankNum2.length < 16 || this.bankNum2.length > 19) {
        this.alertTip("请输入正确的确认银行账号!");
        return false;
      } else if (this.bankNum1 != this.bankNum2) {
        this.alertTip("两次输入的账号不一致!");
        return false;
      }
      data.BankName = this.bankName;
      data.loc1 = this.bankCity.itemName1;
      data.loc2 = this.bankCity.itemName2;
      data.BankCardNO = this.bankNum1;
      data.BankCardNO2 = this.bankNum2;
      data.Index = this.info.Index;
      data.MemberID = this.info.MemberID;
      data.SecPwd = this.info.SecPwd;
      this.formData = data;
      return true;
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
    //未设置安全密码
    confirmChecKPhone() {
      this.$confirm({
        title: "温馨提示",
        icon: "warn",
        mes: "您未设置安全密码，请先设置安全密码操作！",
        opts: [
          {
            txt: "返回",
            color: false,
            callback: () => {
              this.$router.back();
            }
          },
          {
            txt: "设置安全密码",
            color: true,
            callback: () => {
              this.$router.push("/safetyCenter/safePassCheck");
            }
          }
        ]
      });
    },

    //是否设置安全密码
    checkSafePwd(verifyStr) {
      let flag = false;
      if (verifyStr != "") {
        let arrayData = JSON.parse(verifyStr);
        for (let i = 0; i < arrayData.length; i++) {
          if (arrayData[i].SecType == 1) {
            flag = true;
          }
        }
      }
      return flag;
    },

    ...mapMutations(["setSettingOkTitle", "setSettingOkMsg", "setCurBankInfo"]),
    ...mapGetters({
      getMemberData: "getMemberData"
    })
  },

  computed: {
    codeClass() {
      return {
        btnDisabled: !this.getCodeIsReady
      };
    }
  },
  watch: {
    getCodeIsReady(newVal, oldVal) {
      if (newVal === false) {
        let timer = setInterval(() => {
          if (this.seconds <= 0) {
            clearInterval(timer);
            setTimeout(() => {
              this.getCodeIsReady = !newVal;
              this.seconds = 60;
            }, 0);
          }
          this.seconds--;
        }, 1000);
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("setSiteConfig", {
        title: "修改银行卡资料",
        showMenu: false,
        showBack: true,
        showNav: false,
        showChat: false
      });
      vm.$loading.open();
      Api[ApiNames.SleVerification]()
        .then(res => {
          vm.$loading.close();
          let data = res.data;
          if (data.Status === 960) {
            vm.confirmChecKPhone();
          } else if (data.Status == 1) {
            if (!vm.checkSafePwd(data.row)) {
              vm.confirmChecKPhone();
            }
          } else {
            vm.sysErrCheck(data.Status);
          }
        })
        .catch(err => {
          console.log(err);
          vm.sysErrCheck(-9);
        });
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurBankInfo", {});
    next();
  },
  components: {
    [selectorBank.name]: selectorBank
  }
};
</script>

<style scoped lang="less">
.bindInfo {
  &.slide-left-enter,
  &.slide-left-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  &.slide-left-enter-active,
  &.slide-left-leave-active {
    transition: all 0.3s ease;
  }
  .title {
    display: inline-block;
    width: 2rem;
  }
  .chooseSort {
    font-size: 0.26rem;
    color: #09f;
  }
  .btnSubmit {
    width: 96%;
    height: 0.88rem;
    margin-left: 2%;
  }
  .btn-getCode {
    font-size: 0.24rem;
    color: #09f;
    white-space: nowrap;
  }
  .btnDisabled {
    color: #aaa;
  }
  .input-mobile {
    width: 3.1rem;
    height: 1rem;
    padding-right: 0.15rem;
    border-right: 1px solid #dcdcdc;
  }
  .warnText {
    width: 100%;
    height: 0.8rem;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
    span {
      margin: 0.24rem 0;
      display: inline-block;
      border-left: 4px solid #f01924;
      padding-left: 0.2rem;
      font-size: 0.22rem;
      color: #f6757c;
    }
  }
}
.confirm-ft > a.confirm-btn.primary {
  background: #1d8e22 !important;
}
</style>
