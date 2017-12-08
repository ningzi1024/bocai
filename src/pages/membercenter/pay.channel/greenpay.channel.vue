<template>
    <div class="container">

        <!-- <tf-notice v-show="isShowTip" title="温馨提示：" :content="tipContent"></tf-notice> -->
        <div v-show="!isShowDetail">
          <div class="Cont-Spacing-02">
                <tf-cell-group>
                    <tf-cell-item @click.native="selector.bank.show = true" arrow>
                        <span class="left" slot="left">
                            付款银行
                        </span>
                        <span class="right" slot="right">
                            {{bankShow}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item @click.native="selector.saveChannel.show=true" arrow>
                        <span class="left" slot="left">
                            付款渠道
                        </span>
                        <div slot="right" class="right">
                            {{selector.saveChannel.current.text}}
                        </div>
                        <!-- <tf-input :required="true" class="right" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="选择付款渠道"></tf-input> -->
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left" slot="left">
                            存款金额
                        </span>
                        <tf-input class="right" :required="true" regex="^\d+$" slot="right" ref="Amount" v-model="Amount" type="number" :showSuccessIcon="false" :showRequiredIcon="false" :placeholder="moneyrule"></tf-input>
                    </tf-cell-item>
                </tf-cell-group>
            </div>

            <div class="Cont-Spacing-02">
                <tf-cell-group>
                    <tf-cell-item>
                        <span class="left" slot="left">
                            存款人
                        </span>
                        <tf-input class="right" :required="true" regex="^[\u4E00-\u9FA5\uF900-\uFA2D]{2,10}$" ref="payerName" v-model="payerName" slot="right" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入存款的姓名，以方便资金查验"></tf-input>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left" slot="left">
                            付款卡号
                        </span>
                        <tf-input class="right" :required="true" regex="^\d{4}$" slot="right" v-model="payerAccount" ref="payerAccount" type="number" max="4" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="银行卡后4位"></tf-input>
                    </tf-cell-item>
                    
                    <tf-cell-item @click.native="platform.show=true" arrow>
                        <span class="left" slot="left">选择存入账户</span>
                        <div slot="right" class="right">
                            {{platform.item.Name}}
                        </div>
                    </tf-cell-item>
                </tf-cell-group>
            </div>
            <tf-selector-platform v-model="platform.show" :selectItem.sync="platform.item" :ID.sync="GameID"></tf-selector-platform>
            <tf-button size="large" @click.native="commitRequest" class="btnOk btn-boxshadow" type="primary">确定</tf-button>

            <ul class="end-discription">
                <li class="title">温馨提示：</li>
                <li>1.绿色通道入款只支持网银转账、手机转账。</li>
                <li>2.每次存款前，请注意查看我们最新的存款银行账户信息，如因转账错误导致的损失，公司不承担任何责任！如有疑问，请联系在线客服。</li>
                <li>3.此存款方式单次最低金额为100元，每次收到存款后，系统将自动为您增加1%的存款优惠，单笔存款的优惠金额封顶为300元。</li>
                <li>4.例1：您单笔存款3000元，将得到额外30元的“绿色通道支付”存款优惠。 </li>
                <li>5.例2：您单笔存款50000元，将得到额外300元的“绿色通道支付”存款优惠。</li>
                <li>6.客户领取1%绿通优惠的前提是不会收取【腾博会】收款账户</li>
            </ul>
            <tf-selector-bank :items="selector.bank.list" :selectedItem="bankName" @selected="selector.bank.selected" v-model="selector.bank.show"></tf-selector-bank>
            <tf-actionsheet :items="selector.saveChannel.list" v-model="selector.saveChannel.show"></tf-actionsheet>
        </div>
        <div data-detail v-show="isShowDetail">

            <div class="message">
                <tf-icon class="fl" name="yduizhengqueshixin" size="0.34rem"></tf-icon>
                <!-- <h2 class="fl">订单创建成功</h2> -->
                <p>请在15分钟内完成支付，否则系统将自动取消该订单</p>
                <!-- <tf-flexbox class="message-time">
                                    <tf-flexbox-item>
                                        <tf-countdown class="redColor" :callback="countDownFun" :time="details.endTimes" format="{%m}:{%s}"></tf-countdown>
                                    </tf-flexbox-item>
                                </tf-flexbox> -->
            </div>

            <div class="Cont-Spacing">
                <div class="title">
                    <label> 收款方信息</label>
                </div>
                <tf-cell-group>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            收款银行
                        </span>
                        <span class="right" slot="right">
                            <tf-symbol style="vertical-align: -.05rem;" :name="getBankIcon(details.BankName)" size="0.3rem"></tf-symbol>
                            {{details.BankName}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            收款人卡号
                        </span>
                        <span class="right" slot="right">
                            {{details.CardID}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            收款人姓名
                        </span>
                        <span class="right" slot="right">
                            {{details.Name}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            收款人拼音名
                        </span>
                        <span class="right" slot="right">
                            {{details.PinYinName}}
                        </span>
                    </tf-cell-item>
                </tf-cell-group>
            </div>
            <div class="Cont-Spacing">
                <div class="title">
                    <label> 付款方信息</label>
                </div>
                <tf-cell-group>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            付款银行
                        </span>
                        <span class="right" slot="right">
                            <tf-symbol style="vertical-align: -.05rem;" :name="getBankIcon(details.B_BankName)" size="0.3rem"></tf-symbol>
                            {{details.B_BankName}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            付款人卡号
                        </span>
                        <span class="right" slot="right">
                            {{details.B_CardID}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            付款人姓名
                        </span>
                        <span class="right" slot="right">
                            {{details.B_Name}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            付款渠道
                        </span>
                        <span class="right" slot="right">
                            {{Transfer}}
                        </span>
                    </tf-cell-item>
                    <tf-cell-item>
                        <span class="left pay-info-bt" slot="left">
                            付款金额
                        </span>
                        <span class="right" slot="right">
                            <span class="redColor">{{details.Amount}} <em style="color: #bbb;">元</em></span>
                        </span>
                    </tf-cell-item>
                </tf-cell-group>
            </div>
            <p class="discrption">
                系统到账时间将以银行入账时间为准<br/>如超过
                <span class="redColor">15</span>分钟不到账，请联系
                <span class="blueColor" @click="onlineService">在线客服</span>
            </p>
            <div class="pay-info-off">
                <p class="pay-info-off-time">
                    <span><tf-icon class="" name="time" size="0.3rem"></tf-icon>距离截止时间：</span>
                    <tf-countdown class="redColor" :callback="countDownFun" :time="details.endTimes" format="{%m}:{%s}"></tf-countdown>
                </p>
                <tf-flexbox>
                    <tf-flexbox-item><a @click="CancelUnfinishOrder(true)" class="blueColor02">取消订单</a></tf-flexbox-item>
                    <tf-flexbox-item v-if="tranferUrl"><a  @click="openWin(tranferUrl)" class="blueColor">立即转账</a></tf-flexbox-item>
                </tf-flexbox>
                
                
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import notice from "@/components/notice";
import selectorBank from "./selector.banks";
import selectorplatform from "./selector.platform";
import { ActionSheet } from "@/tf-ui/components/actionsheet";
import { FlexBox, FlexBoxItem } from "@/tf-ui/components/flexbox";
import { CountDown } from "@/tf-ui/components/countdown";
import moment from "moment";
import banklist from "@/common/banklist";
import { bankName2Icon } from "@/common/banklist";
import symbolIcon from "@/components/custom-icon/icon-symbol";
const tipContent =
  "建议汇款时增添一个零头，例如您要汇款1000元的话，可以汇款1002元，此金额帮您在款项未能及时到账的情况下获得更快的处理。";

export default {
  components: {
    [notice.name]: notice,
    [selectorBank.name]: selectorBank,
    [ActionSheet.name]: ActionSheet,
    [FlexBox.name]: FlexBox,
    [FlexBoxItem.name]: FlexBoxItem,
    [CountDown.name]: CountDown,
    [symbolIcon.name]: symbolIcon,
    [selectorplatform.name]: selectorplatform
  },
  data() {
    return {
      isShowTip: true,
      bankShow: "点击选择付款银行",
      bankName: "",
      payerName: "",
      payerAccount: "",
      TransferType: "",
      Amount: null,
      CancelOrder: false,
      isShowDetail: false,
      tipContent: tipContent,
      tranferUrl: "",
      platform: {
        show: false,
        item: { Name: "主账户" }
      },
      GameID: "",
      banknames: [
        "工商银行",
        "建设银行",
        "农业银行",
        "中国银行",
        "招商银行",
        "交通银行",
        "民生银行",
        "华夏银行",
        "兴业银行",
        "上海浦东发展银行",
        "广发银行",
        "中信银行",
        "光大银行",
        "邮政储蓄银行",
        "平安银行",
        "其它银行"
      ],
      countDownFun: this.CancelUnfinishOrder,
      details: {},
      selector: {
        bank: {
          show: false,
          list: [],
          selected: item => {
            // console.log(this,item);
            this.bankName = item.value;
            this.bankShow = item.text;
          }
        },
        saveChannel: {
          show: false,
          current: {
            text: "点击选择渠道",
            value: ""
          },
          list: [
            {
              label: "网银",
              method: () => {
                console.log(this);
                this.selector.saveChannel.show = false;
                this.selector.saveChannel.current.text = "网银";
                this.TransferType = 1;
              }
            },
            {
              label: "手机银行",
              method: () => {
                this.selector.saveChannel.show = false;
                this.selector.saveChannel.current.text = "手机银行";
                this.TransferType = 2;
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    //获取mutation
    ...mapMutations(["setSiteConfig"]),
    ...mapActions(["initChannel"]),
    // 绿色通道存款
    commitRequest() {
      // {"RequestBankDepositCommand":{"bankName":"民生银行","payerName":"的付","payerAccount":"1111","TransferType":"1","Amount":100,"CancelOrder":false,"Token":"0d32e72b4983b5e709a881b164b907f0","ACNT":"robbin","IP":"&IP&","BSCore":"Chrome/59.0","OSVer":"Windows 7","Terminal":"PC","Host":"tengbo.local","SID":"64d906b9c0764b1e81129ac60b0b5e65","Divice":"PC"}}

      debugger;
      if (this.checkData() && this.checkLimit(this.Amount)) {
        this.$loading.open();
        // this.CancelUnfinishOrder();

        api[apiNames.RequestBankDepositCommand]({
          bankName: this.bankName,
          payerName: this.payerName,
          payerAccount: this.payerAccount,
          TransferType: this.TransferType,
          Amount: this.Amount,
          CancelOrder: false,
          GameID: this.GameID
        })
          .then(rep => {
            this.$loading.close();
            if (rep.data.Status == 1) {
              this.getOrder();
            } else {
              this.sysErrCheck(rep.data.Status).then(e => {
                this.alert({ mes: rep.data.CNMessage });
              });
            }
          })
          .catch(err => {
            this.sysErrCheck(-9);
          });
      }
    },
    checkLimit(amount) {
      if (
        this.channel.green.Maximum != 0 &&
        this.channel.green.Maximum != this.channel.green.Minimum &&
        (amount < this.channel.green.Minimum ||
          amount > this.channel.green.Maximum)
      ) {
        this.alert({ mes: this.moneyrule });
        return false;
      } else {
        return true;
      }
    },
    checkData() {
      if (!this.bankName) {
        this.$toast({
          mes: "请选择付款银行",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }
      if (!this.TransferType) {
        this.$toast({
          mes: "请选择付款渠道",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }

      if (!this.$refs.Amount.valid) {
        this.$toast({
          mes: "请输入正确的存款金额,金额只能为整数",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }
      if (!this.$refs.payerName.valid) {
        this.$toast({
          mes: "请输入存款的姓名，以方便资金查验",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }
      if (!this.$refs.payerAccount.valid) {
        this.$toast({
          mes: "请输入付款银行卡后4位",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }

      return true;
    },
    //获取订单信息
    getOrder() {
      //获取订单信息
      this.$loading.open();
      api[apiNames.GetUnfinishOrder]()
        .then(rep => {
          let data = rep.data;
          this.$loading.close();
          if (data.Status == 1) {
            if (!data.row.BankOrder) {
              this.isShowDetail = false;
              this.isShowTip = true;
            } else {
              // debugger;
              let endtimes = moment(data.row.BankOrder.OrderTime).add(15, "m");
              // console.log(
              //   moment(Date.now()).format("YYYY/MM/DD HH:mm:ss"),
              //   endtimes.format("YYYY/MM/DD HH:mm:ss"),
              //   endtimes.isAfter(Date.now())
              // );
              if (endtimes.isAfter(Date.now())) {
                this.details = data.row.BankOrder;
                this.isShowDetail = true;
                let bankInfo = banklist.find(
                  item => item.value === data.row.BankOrder.B_BankName
                );
                // console.log(bankInfo);console.log(bankInfo);
                this.tranferUrl = bankInfo.BankUrl;
                // console.log()
                this.details.endTimes = endtimes.format("YYYY/MM/DD HH:mm:ss");
                if (data.row.BankOrder.RealName !== data.row.BankOrder.B_Name) {
                  this.tipContent =
                    "付款人姓名(" +
                    data.row.BankOrder.B_Name +
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
              if (e) this.alert({ mes: data.CNMessage });
            });
          }
          // if(re)
        })
        .catch(err => {
          this.sysErrCheck(-9);
        });
    },
    // 时间结束回调
    endTime() {
      this.CancelUnfinishOrder();
    },
    CancelUnfinishOrder(showTip) {
      if (showTip) {
        this.$confirm({
          title: "温馨提示",
          mes: "确认取消订单吗？",
          opts: [
            {
              txt: "考虑一下",
              color: true,
              callback: () => {}
            },
            {
              txt: "取消订单",
              stay: false,
              callback: () => {
                api[apiNames.CancelUnfinishOrder]({
                  LogType: this.channel.green.type
                })
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
                          if (e) this.alert({ mes: data.CNMessage });
                        });
                      }
                    }
                  })
                  .catch(err => {
                    this.sysErrCheck(-9);
                  });
              }
            }
          ]
        });
      } else {
        api[apiNames.CancelUnfinishOrder]({ LogType: this.channel.green.type })
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
                  if (e) this.alert({ mes: data.CNMessage });
                });
              }
            }
          })
          .catch(err => {
            this.sysErrCheck(-9);
          });
      }
    },
    getBankIcon(name) {
      return bankName2Icon[name];
    },
    setBankRule() {
      let allowBank = this.channel.green.allowBank;
      if (allowBank && allowBank.length > 0) {
        // console.log(this.selector.bank.list)
        this.selector.bank.list = this.selector.bank.list.filter(
          item => allowBank.indexOf(item.text) >= 0
        );

        // console.log(this.selector.bank.list)
      }
    }
  },
  computed: {
    Transfer: function() {
      return this.details.TransferType === 1 ? "网银" : "手机银行";
    },
    ...mapState({
      error_status: state => state.paycenter.error_status,
      isLoading: state => state.paycenter.isLoading,
      updateTime: state => state.paycenter.updateTime,
      channel: state => state.paycenter.channel
    }),
    moneyrule() {
      return (
        "请输入存款金额，最低为" +
        this.channel.green.Minimum +
        "元," +
        "最高为" +
        this.channel.green.Maximum +
        "元"
      );
    }
    // ,
    // countdownTime: function() {
    //     debugger;
    //     return new moment( this.details.OrderTime).add(15, 'm')
    // }
  },
  watch: {
    isShowDetail(val) {
      if (val) {
      }
    },
    error_satus(value) {
      this.sysErrCheck(value);
    },
    isLoading(value) {
      if (value) {
        this.loading();
      } else {
        this.loadingClose();
        this.setBankRule();
      }
    }
  },
  created() {
    this.getOrder();
    this.selector.bank.list = banklist.filter(item => {
      return this.banknames.indexOf(item.text) >= 0;
    });
  },
  mounted() {
    this.initChannel();
    // this.isShowDetail = false;
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例
      vm.$store.commit("setSiteConfig", {
        title: "绿色通道支付",
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
    width: 1.3rem;
    display: block;
  }
  .pay-info-bt {
    color: #999;
    font-size: 0.24rem;
  }
  .right {
    color: #699deb;
    text-align: left; // display: block;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.5rem;
  }
  div[data-detail] .right {
    color: #333;
    padding-left: 0.6rem;
  }
  .m-input {
    /* padding-left: .5rem;*/
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
    color: #ff3a2b;
  }
  .blueColor {
    color: #699deb;
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
      margin:2% 2%;
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



