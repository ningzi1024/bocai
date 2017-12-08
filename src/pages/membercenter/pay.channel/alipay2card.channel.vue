<!--
* 支付宝转银行卡
-->
<template>
    <div class="container">
        <div data-input="" v-if="!showDetail">
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
                        存款金额
                    </span>
                    <tf-input :required="true" class="right" regex="^[0-9]+$" slot="right" v-model="Account" ref="Account" type="number"  :showSuccessIcon="false" :showRequiredIcon="false" :placeholder="moneyrule"></tf-input>
                </tf-cell-item>
                <tf-cell-item>
                    <span class="left" slot="left">
                        支付宝认证姓名
                    </span>
                    <tf-input :required="true" class="right" regex="^[\u4E00-\u9FA5\uF900-\uFA2D]{2,10}$" slot="right" v-model="alipayname" ref="alipayname" max="5" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="支付宝认证姓名"></tf-input>
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
            <ul class="end-discription">
                <li class="title">说明</li>
                <li>1.提交的支付金额必须和实际支付金额一致，否则充值将无法到账！</li>
                <li>2.“支付宝姓名”必须与您实际转账的支付宝实名一致！</li>
                <li>3.“支付宝姓名”须经过实名认证，否则无法自动入账！ </li>
                <li>4.存款成功后，至少需达到一倍有效投注额方可提款（防套现、防洗钱）。</li>
            </ul>
        </div>
        <div data-detail="" v-if="showDetail">
            <div class="message">
                <tf-icon class="fl" name="yduizhengqueshixin" size="0.34rem"></tf-icon>
                <p>请在15分钟内完成支付，否则系统将自动取消该订单</p>
            </div>
            <!-- <tf-notice v-show="isShowTip" title="温馨提示：" :content="tipContent"></tf-notice>
            <p class="message">请在15分钟内完成支付，否则系统将自动取消该订单</p>
            <tf-flexbox class="message">
                <tf-flexbox-item>订单截止倒计时
                    <tf-countdown class="redColor" style="font-size:.4rem;font-weight: 600;padding-left: .1rem;" :callback="countDownFun" :time="details.endTimes" format="{%m}:{%s}"></tf-countdown>
                </tf-flexbox-item>
                <a @click="cancelOrder(true)" class="blueColor">取消订单</a>
            </tf-flexbox> -->
<div class="Cont-Spacing">

            <div class="title">
                <label>收款方信息</label>
            </div>
            <tf-cell-group>
                <tf-cell-item>
                    <span class="left" slot="left">
                        收款银行
                    </span>
                    <span class="right" slot="right">
                        <tf-symbol :name="bankIcon" size="0.6rem" style="vertical-align: -.18rem;margin-right:.1rem"></tf-symbol>
                        {{details.BankName}}
                    </span>
                </tf-cell-item>
                <tf-cell-item>
                    <span class="left" slot="left">
                        帐(卡)号
                    </span>
                    <span class="right" slot="right">
                        {{details.CardID}}
                        <!-- <img @click="isShowQR?isShowQR=true:isShowQR=true" :src="bankQRcode" alt=""> -->
                    </span>
                </tf-cell-item>
                <tf-cell-item>
                    <span class="left" slot="left">
                        户名
                    </span>
                    <span class="right" slot="right">

                        {{details.Name}}
                    </span>
                </tf-cell-item>
                <tf-cell-item v-if="details.PinYinName!=''">
                    <span class="left" slot="left">
                        收款人拼音
                    </span>
                    <span class="right" slot="right">
                        {{details.PinYinName}}
                    </span>
                </tf-cell-item>
            </tf-cell-group>
</div>
<div class="Cont-Spacing">
            <div class="title">
                <label>付款方信息</label>
            </div>
            <tf-cell-group>
                <tf-cell-item>
                    <span class="left" slot="left">
                        付款人姓名
                    </span>
                    <span class="right" slot="right">
                        {{details.B_Name}}
                    </span>
                </tf-cell-item>
                <tf-cell-item>
                    <span class="left" slot="left">
                        付款金额
                    </span>
                    <span class="right" slot="right">
                        <span class="redColor">{{details.Amount}} <em style="color: #bbb;">元</em></span>
                    </span>
                </tf-cell-item>

            </tf-cell-group>
</div>
            <tf-popup v-model="isShowQR" position="center" width="60%" style="text-align:center;">
                <!-- <img @click.native="isShowQR ? isShowQR=true:isShowQR=true" :src="bankQRcode" style="width:100%;" alt=""> -->
                <p style="padding:0 0 5px 0;">长按二维码选择保存图片</p>
            </tf-popup>
            <p class="discrption">
                系统到账时间将以银行入账时间为准<br/>如超过
                <span class="redColor">15</span>分钟不到账，请联系
                <span @click="onlineService" class="blueColor">在线客服</span>
            </p>
            <div class="pay-info-off">
                <p class="pay-info-off-time">
                    <span><tf-icon class="" name="time" size="0.3rem"></tf-icon>距离截止时间：</span>
                    <tf-countdown class="redColor" :callback="countDownFun" :time="details.endTimes" format="{%m}:{%s}"></tf-countdown>
                </p>
                 <tf-flexbox>
                    <tf-flexbox-item><a @click="cancelOrder(true)"  class="blueColor02">取消订单</a></tf-flexbox-item>
                    <tf-flexbox-item ><a @click="$router.push('/demo')" class="blueColor02">转账演示</a></tf-flexbox-item>
                     <tf-flexbox-item ><a @click="openWin('https://auth.alipay.com/login/index.htm')" class="blueColor">立即转账</a></tf-flexbox-item>
                </tf-flexbox>
               
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import moment from "moment";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import notice from "@/components/notice";
import { ActionSheet } from "@/tf-ui/components/actionsheet";
import { FlexBox, FlexBoxItem } from "@/tf-ui/components/flexbox";
import { CountDown } from "@/tf-ui/components/countdown";
import symbolIcon from "@/components/custom-icon/icon-symbol";
import { bankName2Icon } from "@/common/banklist";
import config from "@/common/evn.config";
import selectorplatform from "./selector.platform";
export default {
  components: {
    [notice.name]: notice,
    [ActionSheet.name]: ActionSheet,
    [FlexBox.name]: FlexBox,
    [FlexBoxItem.name]: FlexBoxItem,
    [CountDown.name]: CountDown,
    [symbolIcon.name]: symbolIcon,
    [selectorplatform.name]: selectorplatform
  },
  data() {
    return {
      showDetail: false,
      isShowTip: true,
      tipContent: "",
      title: "支付宝转银行卡",
      bankIcon: "",
      bankQRcode: "",
      Account: "",
      alipayname: "",
      countDownFun: this.cancelOrder,
      endTimes: "2017/8/28/ 20:00",
      isShowQR: false,
      platform: {
        show: false,
        item: { Name: "主账户" }
      },
      GameID: "",
      details: {
        ID: "",
        Amount: "",
        Name: "",
        BankName: "",
        CardID: "",
        OrderTime: "",
        RealName: "",
        B_Name: "",
        PinYinName: "",
        IsNewOrder: false
      }
    };
  },
  computed: {
    ...mapState({
      error_status: state => state.paycenter.error_status,
      isLoading: state => state.paycenter.isLoading,
      updateTime: state => state.paycenter.updateTime,
      channel: state => state.paycenter.channel
    }),
    moneyrule() {
      return (
        "存款金额最低为" +
        this.channel.ali2card.Minimum +
        "元," +
        "最高为" +
        this.channel.ali2card.Maximum +
        "元"
      );
    }
    // ...mapState(["paycenter.error_status", "paycenter.isLoading", "paycenter.updateTime", "paycenter.channel"])
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
  methods: {
    //获取mutation
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig"
    ]),
    ...mapActions(["initChannel"]),
    commitOrder() {
      if (!this.$refs.Account.valid) {
        this.$toast({
          mes: "请输入正确的存款金额,金额只能为整数",
          timeout: 1500,
          icon: "error"
        });
        // this.createFromSubmit({});
      } else if (this.checkLimit(this.Account)) {
        this.$loading.open();
        api[apiNames.AlipayBankDepositCommand]({
          payer: this.alipayname,
          Amount: this.Account,
          LogType: "21",
          GameID: this.GameID,
          CancelOrder: false
        })
          .then(rep => {
            let data = rep.data;
            if (data.Status == 1) {
              this.getOrder();
            } else {
              this.sysErrCheck(data.Status).then(s => {
                if (s) this.alert({ mes: data.CNMessage });
              });
            }
          })
          .catch(err => {
            this.sysErrCheck(-9);
          });
      }
    },
    getOrder() {
      //获取订单信息
      this.$loading.open();
      api[apiNames.GetUnfinishOrder]()
        .then(rep => {
          let data = rep.data;
          this.$loading.close();
          if (data.Status == 1) {
            if (!data.row.AlipayBankOrder) {
              this.showDetail = false;
              this.isShowTip = true;
            } else {
              // debugger;
              let endtimes = moment(data.row.AlipayBankOrder.OrderTime).add(
                15,
                "m"
              );
              // console.log(moment(Date.now()).format('YYYY/MM/DD HH:mm:ss'), endtimes.format('YYYY/MM/DD HH:mm:ss'), endtimes.isAfter(Date.now()))
              if (endtimes.isAfter(Date.now())) {
                this.details = data.row.AlipayBankOrder;
                this.showDetail = true;

                this.tipContent = "如当前支付方式未能支付成功，请您尝试其他支付方式进行支付！";

                api[apiNames.AlipayQRCodeContent]({
                  ChannelID: this.details.ID
                })
                  .then(rep => {
                    let data = rep.data;
                    if (data.Status === 1) {
                      this.bankQRcode = config.qrcode_src + data.row + ".png";
                    } else {
                      this.sysErrCheck(data.Status).then(e => {
                        if (s) this.alert({ mes: data.CNMessage });
                      });
                    }
                  })
                  .catch(err => {
                    this.sysErrCheck(-9);
                  });
                // console.log()
                this.details.endTimes = endtimes.format("YYYY/MM/DD HH:mm:ss");
                this.bankIcon = bankName2Icon[this.details.BankName];
                if (
                  data.row.AlipayBankOrder.RealName !==
                  data.row.AlipayBankOrder.B_Name
                ) {
                  this.tipContent =
                    "付款人姓名(" +
                    data.row.AlipayBankOrder.B_Name +
                    ")与绑定的银行卡姓名不一致，请确认后再支付";
                } else {
                  this.isShowTip = false;
                }
              } else {
                this.isShowDetail = false;
                this.isShowTip = true;
              }
            }
          } else {
            this.sysErrCheck(data.Status).then(e => {
              if (s) this.alert({ mes: data.CNMessage });
            });
          }
          // if(re)
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    },

    checkLimit(amount) {
      if (
        this.channel.ali2card.Maximum != 0 &&
        this.channel.ali2card.Maximum != this.channel.ali2card.Minimum &&
        (amount < this.channel.ali2card.Minimum ||
          amount > this.channel.ali2card.Maximum)
      ) {
        this.alert({ mes: this.moneyrule });
        return false;
      } else {
        return true;
      }
    },
    cancelOrder(showTip) {
      api[apiNames.CancelUnfinishOrder]({ LogType: this.channel.ali2card.type })
        .then(rep => {
          if (showTip) {
            if (rep.data.Status == 1) {
              this.$toast({
                mes: "取消成功",
                timeout: 1500,
                icon: "success"
              });
              this.getOrder();
            } else {
              this.sysErrCheck(data.Status).then(e => {
                if (s) this.alert({ mes: data.CNMessage });
              });
            }
          }
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    }
  },
  created() {
    this.initChannel();
    this.getOrder();
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
        title: "支付宝转银行卡",
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
  destroyed() {}
};
</script>
<style lang="less" scoped>
.container {
  [data-detail] .title {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 9;
    > label {
      display: inline-block;
      font-size: 0.24rem;
      margin: 0.3rem 0;
      padding-left: 0.2rem;
      border-left: 3px solid #ff3a2b;
      color: #666;
    }
  }
  .left {
    width: 2rem;
    display: block;
  }
  .right {
    color: #699deb;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.1rem;
    img {
      width: 0.7rem;
      height: 0.7rem;
      position: absolute;
      right: 0.24rem;
      top: 0.15rem;
    }
  }
  div.right {
    display: flex;
  }
  .btnOk {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.25rem;
    height: 0.88rem;
  }
  .message {
    text-align: left;
    background: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.06);
    padding: 0.2rem 0.2rem;
    font-size: 0.24rem;
    h2 {
      font-size: 0.24rem;
      font-weight: 500;
      color: #2d6f40;
    }
    p {
      color: #bbb;
    }
    i {
      color: #56cc77;
      margin-right: 0.12rem;
    }
  }

  .discrption {
    margin-top: 0.25rem;
    font-size: 0.24rem;
    text-align: center;
    color: #bbb;
    line-height: 0.36rem;
    padding-bottom: 1.28rem;
  }
  .redColor {
    color: #f11924;
  }
  .blueColor {
    color: #09f;
  }

  .pay-info-off {
    position: fixed;
    z-index: 9;
    background: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    a.blueColor {
      display: block;
      // width: 46.5%;
      height: 0.76rem;
      background: #f01924;
      color: #fff;
      border-radius: 0.12rem;
      text-align: center;
      line-height: 0.76rem;
      margin: 2% 2%;
      box-shadow: 0 2px 8px rgba(220, 0, 0, 0.25);
      /*box-shadow: 0 2px 8px rgba(199,220,252,.5); */
    }
    a.blueColor02 {
      display: block;
      box-sizing: border-box;
      /* width: 100%; */
      height: 0.76rem;
      background: #fff;
      color: #ff3a2b;
      border-radius: 0.12rem;
      text-align: center;
      line-height: 0.76rem;
      margin: 2% 2%;
      border: 1px solid #ff8a80;
      box-shadow: 0 2px 8px rgba(220, 0, 0, 0.2);
    }
    p.pay-info-off-time {
      margin-left: 2%;
      font-size: 0.24rem;
      line-height: 0.56rem;
      color: #bbb;
      i {
        position: relative;
        top: 1px;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
