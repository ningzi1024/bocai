<!--
    * 会员存款
-->
<template>
    <div class="container">
        <!--  -->
        <!-- <tf-notice title="温馨提示：" content="手机验证后，可自行修改银行相关信息（开户姓名无法修改;绑定的银行卡必须和注册绑定姓名一致，否则无法提款!）"></tf-notice> -->
        <div class="title">
            <label> 请选择存款方式</label>
        </div>
        <tf-cell-group>
            <tf-cell-item v-if="channel.green.canuse" href="/channel/greenpay" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #6574ff;">
                    <tf-icon class="iconcust" :usetb="true" name="tongliankuaijiezhifu" size=".56rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>绿色通道</span><br/> 可获得1%优惠红利，红利最高可达10000元
                </div>
            </tf-cell-item>
            <tf-cell-item v-if="channel.qqscan.canuse" href="/channel/scanpay/?payway=qqscan" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #ea4335; padding-top:.01rem;">
                    <tf-icon class="iconcust" :usetb="true" name="qq" size=".64rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>QQ钱包扫码</span><br/> QQ钱包扫码支付，安全快捷
                </div>
            </tf-cell-item>
            <tf-cell-item v-if="channel.wechatscan.canuse" href="/channel/scanpay/?payway=wechatpay" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #07c406; padding-top:.05rem;">
                    <tf-icon class="iconcust" :usetb="true" name="weixin1" size=".6rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>微信扫码</span><br/> 微信扫码支付，安全快捷
                </div>
            </tf-cell-item>
            <tf-cell-item v-if="channel.aliscan.canuse" href="/channel/scanpay/?payway=alipay" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #00bbff;">
                    <tf-icon class="iconcust" style="position:relative;right:-2px;top:-2px;" :usetb="true" name="zhifubao" size=".65rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>支付宝扫码</span><br/> 支付宝扫码支付，安全快捷
                </div>
            </tf-cell-item>
            <tf-cell-item v-if="channel.ali2card.canuse" href="/channel/alipay2card" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #00bbff;">
                    <tf-icon class="iconcust" style="position:relative;right:-2px;top:-2px;" :usetb="true" name="zhifubao" size=".65rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>支付宝转银行卡</span><br/> 必须实名认证的支付宝转账，否则无法自动入账
                </div>
            </tf-cell-item>
            <tf-cell-item v-if="channel.union.canuse" href="/channel/union" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #07afa5;">
                    <tf-icon class="iconcust" :usetb="true" name="yinlian" size=".4rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>银联支付</span><br/> 安全、便捷、高效的网上支付方式
                </div>
            </tf-cell-item>
            <tf-cell-item v-if="channel.UnionScanPay.canuse" href="/channel/scanpay/?payway=UnionScanPay" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #07afa5;">
                    <tf-icon class="iconcust" :usetb="true" name="yinlian" size=".4rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>银联扫码支付</span><br/> 无需网银，下载APP直接扫码
                </div>
            </tf-cell-item>
            <tf-cell-item v-if="channel.JDPay.canuse" href="/channel/scanpay/?payway=JDPay" type="link" arrow>
                <span slot="left" class="icon-wrap" style="background-color: #f01924;">
                    <tf-icon class="iconcust" :usetb="true" name="jingdong" size=".4rem"></tf-icon>
                </span>
                <div class="right-item-content" slot="right">
                    <span>京东支付</span><br/> 支持跨平台，安全便捷的支付方式
                </div>
            </tf-cell-item>
        </tf-cell-group>
    </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import notice from "./../../components/notice";
import api from "./../../api/API.list";
import ajax from "./../../api/User";
export default {
  components: {
    [notice.name]: notice
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig",
      "setBaseValue"
    ]),
    ...mapActions(["initChannel"]),
    needBindBank() {
      this.$confirm({
        title: "未绑定银行卡",
        icon: "warn",
        mes: "请您先绑定银行卡，再进行操作！",
        opts: [
          {
            txt: "知道了",
            color: false,
            callback: () => {
              this.$router.back();
            }
          },
          {
            txt: "前往绑定",
            color: true,
            callback: () => {
              this.$router.push("/bankInfo");
            }
          }
        ]
      });
    }
  },
  computed: {
    ...mapState({
      error_status: state => state.paycenter.error_status,
      isLoading: state => state.paycenter.isLoading,
      updateTime: state => state.paycenter.updateTime,
      channel: state => state.paycenter.channel
    })
  },
  watch: {
    error_satus(value) {
      this.sysErrCheck(value);
    },
    isLoading(value) {
      if (value) {
        this.loading();
      } else {
        this.loadingClose();
      }
    }
  },
  mounted() {},
  created() {
    this.initChannel();

    this.getLoginStatu().then(ar => {
      this.$loading.open();
      ajax[api.SleVerification]().then(rep => {
        this.$loading.close();
        let data = rep.data;
        let need = true;
        if (data.Status == 1) {
          if (data.row) {
            let obj = JSON.parse(data.row);
            obj.forEach(item => {
              if (item.SecType == "5") need = false;
            });
          }
          if (need) this.needBindBank();
        } else {
          this.sysErrCheck(data.Status).then(s => {
            if (!s) need = false;
            if (need) this.needBindBank();
          });
        }
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("setSiteConfig", {
        title: "会员存款",
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
  }
};
</script>
<style lang="less" scoped>
.container {
  a:link {
    color: #eee;
    text-decoration: none;
  }
  a:visited {
    color: #eee;
    text-decoration: none;
  }
  a:active {
    color: #eee;
  }
  .title {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 9;

    > label {
      display: inline-block;
      font-size: 0.26rem;
      margin: 0.3rem 0;
      padding-left: 0.15rem; // height: .4rem;
      border-left: 5px solid #ff3a2b;
      color: #888;
    }
  }
  .icon-wrap {
    display: inline-block;
    height: 0.92rem;
    width: 0.92rem;
    text-align: center;
    line-height: 0.92rem;
    border-radius: 30%;
    color: #fff;
    box-shadow: 0 0.03rem 0.3rem rgba(0, 0, 0, 0.1);
  }
  .right-item-content {
    text-align: left;
    width: 100%;
    padding: 0.3rem 0 0.3rem 0.25rem;
    font-size: 0.24rem;
    color: #ccc;
    > span {
      font-size: 0.28rem;
      display: inline-block;
      color: #505050;
      padding-bottom: 0.06rem;
    }
  }
}
</style>



