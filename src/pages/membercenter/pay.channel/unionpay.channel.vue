<!--
* 银联支付
-->
<template>
    <div class="container">
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
                <span class="left" slot="left">
                    存款
                </span>
                <tf-input style="padding-left: 0.5rem;" :required="true" class="right"  slot="right" v-model="Amount" ref="Amount" regex="^[0-9]+$" type="number"  :showSuccessIcon="false" :showRequiredIcon="false" :placeholder="moneyrule"></tf-input>
            </tf-cell-item>
        </tf-cell-group>
      </div>

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
      <tf-button size="large" @click.native="commitOrder" class="btnOk btn-boxshadow" type="primary">确定</tf-button>
    
    </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import gVars from "@/common/GlobalVars";
import submitPay from "@/common/submit.pay.mixin";
import selectorplatform from "./selector.platform";
export default {
  mixins: [submitPay],
  components: {
    [selectorplatform.name]: selectorplatform
  },
  data() {
    return {
      actionIsLoaded: false,
      title: "银联支付",
      Amount: "",
      ACNT: gVars.ACNT,
      Token: gVars.Token,
      SID: gVars.SID,
      platform: {
        show: false,
        item: { Name: "主账户" }
      },
      GameID: "",
      showQrcode: false
    };
  },
  watch: {
    error_satus(value) {
      this.sysErrCheck(value);
    },
    isLoading(value) {
      if (value) {
        this.loading();
      } else {
        this.actionIsLoaded = true;
        this.loadingClose();
      }
    }
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
      if (
         (this.channel.union.Maximum != 0 &&
        this.channel.union.Maximum != this.channel.union.Minimum) &&
        (amount < this.channel.union.Minimum ||
          amount > this.channel.union.Maximum)
      ) {
        this.alert({ mes: this.moneyrule });
        return false;
      } else {
        return true;
      }
    },
    commitOrder() {
      if (!this.$refs.Amount.valid) {
        this.$toast({
          mes:"请输入正确的存款金额,金额只能为整数",
          timeout: 1500,
          icon: "error"
        });
      } else {
        let _Amount = parseFloat(this.Amount);
        if (this.checkLimit(_Amount)) {
          this.submitPay(this.channel.union.params[3], {
            id: this.channel.union.params[2],
            amount: this.Amount,
            bankCode: "",
            memberID: "",
            GameID: this.GameID,
            payType: this.channel.union.params[4]
          });
        }
      }
    }
  },
  created() {
    this.initChannel();
  },
  mounted() {},
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: "银联支付",
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
      return (
        "存款金额最低为" +
        this.channel.union.Minimum +
        "元," +
        "最高为" +
        this.channel.union.Maximum +
        "元"
      );
    }
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.container {
  .left {
    display: block;
    width: 1.24rem;
  }
  .right {
    // display: block;
    color: #699deb;
    text-align: left; // display: inline-block;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.5rem;
  }
  span.right {
    display: block;
  }
  .btnOk {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.25rem;
    height: 0.88rem;
  }
}
</style>
