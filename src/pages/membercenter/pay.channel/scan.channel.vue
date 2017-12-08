
<template>
    <div class="container">
        <!-- <tf-notice v-show="showTip" title="温馨提示：" content="“扫码支付”单笔存款金额最高为1000元。如1000元以上存款，请使用“支付宝转银行卡"></tf-notice> -->
        
        <div class="Cont-Spacing-02">
            <tf-cell-group>
                <tf-cell-item>
                    <span class="left" slot="left">
                        存款方式
                    </span>
                    <span class="right" slot="right">
                        {{title}}
                    </span>
                </tf-cell-item>
                <tf-cell-item>
                    <span class="left" slot="left" >
                        存款
                    </span>
                    <tf-input :required="true" class="right"  slot="right" v-model="Amount" ref="Amount" type="number" regex="^[0-9]+$" :showSuccessIcon="false" :showRequiredIcon="false" :placeholder="moneyrule"></tf-input>
                </tf-cell-item>
            </tf-cell-group>
        </div>
        <p class="redColor" v-show="AmountErr" style="font-size:.22rem;padding:.1rem 0 0 .2rem;">&nbsp;{{AmountErr}}</p>
        <div class="Cont-Spacing-02">
            <tf-cell-group>
                <tf-cell-item @click.native="platform.show=true" arrow>
                    <span class="left" slot="left">选择存入账户</span>
                    <div slot="right" class="right">
                        {{platform.item.Name}}
                    </div>
                </tf-cell-item>
            </tf-cell-group>
        </div>
        <tf-selector-platform v-model="platform.show" :selectItem.sync="platform.item" :ID.sync="GameID"></tf-selector-platform>
        <tf-button size="large" :disabled="AmountErr!=''&& isKMPay" @click.native="getQcode" class="btnOk btn-boxshadow" type="primary">确定</tf-button>
        <ul v-if="isKMPay" class="end-discription">
            <li class="title">温馨提示：</li>
            <li>1.金额必须大于100</li>
            <li>2.金额个位数必须为 2、 4、 6、 8</li>
            <li>例如：102,104,106,108</li>
        </ul>
        
    </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import gVars from "@/common/GlobalVars";
import notice from "@/components/notice";
import submitPay from "@/common/submit.pay.mixin";
import selectorplatform from "./selector.platform";
export default {
  mixins: [submitPay],
  components: {
    [notice.name]: notice,
    [selectorplatform.name]: selectorplatform
  },
  data() {
    return {
      actionIsLoaded: false,
      showTip: true,
      title: "",
      Amount: "",
      ACNT: gVars.ACNT,
      Token: gVars.Token,
      SID: gVars.SID,
      platform: {
        show: false,
        item: { Name: "主账户" }
      },
      isKMPay: false,
      GameID: "",
      showQrcode: false,
      currentChannel: null,
      AmountErr: ""
    };
  },
  watch: {
    error_satus(value) {
      this.sysErrCheck(value);
    },
    isLoading(value) {
      console.log(value);
      if (value) {
        this.loading();
      } else {
        this.loadingClose();
        this.setCurrentChannel();
      }
    },
    Amount(value) {
      if (this.isKMPay) {
        if (value && this.currentChannel.Maximum != 0) {
          let fVal = parseFloat(value);
          if (fVal < 100) {
            this.AmountErr = "金额必须大于100";
          } else if (fVal % 2 != 0) {
            this.AmountErr = "金额个位数只能为 2、 4、 6、 8";
          } else if (fVal % 10 == 0) {
            this.AmountErr = "金额个位数只能为 2、 4、 6、 8";
          } else {
            this.AmountErr = "";
          }
        } else {
          this.AmountErr = "";
        }
      }
    }
    // QRcode_link(value) {
    //     if (value != "") {
    //         this.showQrcode = true;
    //     }
    // }
  },
  methods: {
    //获取mutation
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig"
    ]),
    ...mapActions(["initChannel"]),
    checkLimit(amount) {
      let checked = true;
      // debugger;
      if (this.actionIsLoaded.Maximum != 0) {
        let maxN = this.actionIsLoaded.Maximum;
        let minN = this.actionIsLoaded.Minimum;
        if (this.isKMPay)
          minN =
            this.actionIsLoaded.Minimum >= 100
              ? this.actionIsLoaded.Minimum
              : 100;
        if (amount < minN || amount > maxN) {
          checked = false;
        }
        // else if (maxN <= minN && amount < minN) {
        //   checked = false;
        // }
      }
      if (!checked) this.alert({ mes: this.moneyrule });
      return checked;
      // if (
      //   this.actionIsLoaded.Maximum != 0 &&
      //   this.actionIsLoaded.Maximum != this.actionIsLoaded.Minimum &&
      //   (amount < this.actionIsLoaded.Minimum ||
      //     amount > this.actionIsLoaded.Maximum)
      // ) {
      //   this.alert({ mes: this.moneyrule });
      //   return false;
      // } else {
      //   return true;
      // }
    },
    getQcode() {
      if (!this.$refs.Amount.valid) {
        this.$toast({
          mes: "请输入正确的存款金额,金额只能为整数",
          timeout: 1500,
          icon: "error"
        });
        // this.createFromSubmit({});
      } else {
        let Amount = parseFloat(this.Amount);
        if (this.checkLimit(Amount))
          this.submitPay(this.currentChannel.params[3], {
            id: this.currentChannel.params[2],
            amount: this.Amount,
            bankCode: "",
            memberID: "",
            GameID: this.GameID,
            payType: this.currentChannel.params[4],
            img: "imgsrc"
          });
      }
    },
    setCurrentChannel() {
      let title = "扫码支付";
      if (this.$route.query.payway == "wechatpay") {
        title = "微信扫码支付";
        this.showTip = false;
        this.currentChannel = this.actionIsLoaded = this.channel.wechatscan;
      } else if (this.$route.query.payway == "alipay") {
        title = "支付宝扫码支付";
        this.showTip = true;
        this.currentChannel = this.actionIsLoaded = this.channel.aliscan;
      } else if (this.$route.query.payway == "qqscan") {
        title = "QQ钱包扫码支付";
        this.showTip = true;
        this.currentChannel = this.actionIsLoaded = this.channel.qqscan;
      } else if (this.$route.query.payway == "UnionScanPay") {
        title = "银联支付扫码";
        this.showTip = true;
        this.currentChannel = this.actionIsLoaded = this.channel.UnionScanPay;
      } else if (this.$route.query.payway == "JDPay") {
        title = "京东支付";
        this.showTip = true;
        this.currentChannel = this.actionIsLoaded = this.channel.JDPay;
      }
      if (
        this.currentChannel &&
        this.currentChannel.params &&
        this.currentChannel.params[3] === "KMPay"
      ) {
        this.isKMPay = true;
      }
      this.title = title;
      this.$store.commit("setSiteConfig", {
        title: title,
        showMenu: false,
        showBack: true,
        showNav: false,
        showChat: false
      });
    }
  },

  created() {
    this.initChannel();
  },
  mounted() {
    this.$loading.open();
    // this.setCurrentChannel();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
    next();
  },
  computed: {
    ...mapState({
      error_status: state => state.paycenter.error_status,
      isLoading: state => state.paycenter.isLoading,
      updateTime: state => state.paycenter.updateTime,
      channel: state => state.paycenter.channel,
      action_url: state => state.paycenter.action_url
    }),
    moneyrule() {
      let msgTip = "";
      if (this.currentChannel) {
        // msgTip = true;
        if (this.actionIsLoaded.Maximum != 0) {
          let maxN = this.actionIsLoaded.Maximum;
          let minN = this.actionIsLoaded.Minimum;
          if (this.isKMPay)
            minN =
              this.actionIsLoaded.Minimum >= 100
                ? this.actionIsLoaded.Minimum
                : 100;
          msgTip = "存款金额最低为" + minN + "元,最高为" + maxN + "元";
        }
        // return checked;
      }

      return msgTip;
      // if (this.currentChannel) {
      //   return (
      //     "存款金额最低为" +
      //     this.currentChannel.Minimum +
      //     "元," +
      //     "最高为" +
      //     this.currentChannel.Maximum +
      //     "元"
      //   );
      // } else {
      //   return null;
      // }
    }
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.container {
  // padding-top: .2rem;
  .left {
    display: block;
    width: 1.68rem;
  }
  .right {
    color: #699deb;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    // padding-left: .5rem;
  }
  // div.right {
  //     display: flex;
  // }
  .btnOk {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.25rem;
    height: 0.88rem;
  }
  .btn-boxshadow:disabled{
    box-shadow: none;
  }
}
</style>
