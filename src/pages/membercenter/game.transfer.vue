<!--
* 户内转账
-->
<template>
    <div class="container tran-gamepla">
        <!-- <tf-notice title="温馨提示：" content="查询时，请点击游戏厅刷新额度"></tf-notice> -->
        <div class="balance">
            <span class="title fl">主账户额度</span>
            <div class="fr">
                <span class="title redColor" style="font-size:.3rem;">
                    <tf-countup :endnum="balance" duration="1"  decimals="2" separator="," prefix="￥"></tf-countup>
                </span>&nbsp;元
                <!-- <span class="title blueColor" @click="getBalance" style="margin-left:.4rem">
                            <span>
                                <tf-icon name="xuexiao" :class="{'rotate':showLoading}" size=".3rem"></tf-icon>
                            </span>
                        </span> -->
            </div>
        </div>
        <!-- <div class="group-title">
                    <label>游戏平台</label>
                </div> -->

        <tf-cell-group>
            <tf-cell-item v-for="item in gamelist" @click.native="UserGameBalance(item,$event)" :class="{'selected':transfer.platform== item.name}" v-bind:key="item.name">

                <span class="left" slot="left">
                    <div :class="['left-icon','game-platform-'+item.name]">
                        <tf-icon :name="item.name" size=".54rem"></tf-icon>
                    </div>
                </span>
                <div class="right-wrap" slot="right">
                    <div class="game-balance">
                        <span class="clr game-blance-title">{{item.cnname}}</span>
                        <div class="clr">
                            <span class="inline-block ptd12rem">余额：</span>
                            <span v-show="!item.loading && item.amount===null" class="game-balance-tip">
                                点击查看
                            </span>
                            <tf-icon v-show="item.loading" name="xuexiao" :class="{'rotate':item.loading,'warp-loading':true}" size=".26rem"></tf-icon>
                            <span v-show="item.amount!==null && !item.loading" class="game-balance-value">
                                <span class="redColor">
                                    <tf-countup v-if="item.amount !== null && typeof(item.amount) =='number'" :endnum="item.amount" :startnum="item.amount" decimals="2" separator=","></tf-countup>
                                    <span v-else>{{item.amount}}</span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="transfer-on"><tf-icon name="gou1" size=".18rem" color="#fff"></tf-icon></div>
                    <!-- <div class="game-oprate">
                                <tf-button @click.native="UserGameTran(item,'gameid_1',$event)" type="hollow">转出</tf-button>
                                <tf-button @click.native="UserGameTran(item,'gameid_0',$event)">转入</tf-button>
                            </div> -->
                </div>

            </tf-cell-item>
        </tf-cell-group>

        <!--转账-->
        <div class="TitleText">
            <span>{{ transfer.platformName === ''? '户内转账':transfer.platformName }}</span>
        </div>
        <div class="transfer-input">
            <tf-input :required="true" type="number" regex="^\d+$" style="font-size:.28rem;" class="right" v-model="transfer.amount" ref="amount" max="5" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="最低1元，只能为整数"></tf-input>
        </div>
        <div class="transfer-btn">
            <tf-button size="large" @click.native="beginTran('gameid_0')" class="btnLogin-2 fl" type="primary">转入游戏平台</tf-button>
            <tf-button size="large" @click.native="beginTran('gameid_1')" class="btnLogin-2 fr" type="primary">转入主账户</tf-button>
        </div>

        <!-- <tf-popup v-model="transfershow" v-show="transfershow" :autoClose="false" position="center" width="94%" style="text-align:center;">
                    <div class="transfer-wrap">

                        <div class="transfer-title">
                            <span v-if="transfer.type=='gameid_0'">主账户</span>
                            <span v-else>{{transfer.platformName}}</span>
                            <tf-icon name="jiantou1" size="0.1rem" style="transform: scaleX(.5) translateY(-.1rem); display: inline-block;" color="#ccc"></tf-icon>
                            <span v-if="transfer.type=='gameid_1'">主账户</span>
                            <span v-else>{{transfer.platformName}}</span>

                        </div>
                        <div class="transfer-input">
                            <tf-input :required="true" type="number" regex="^\d+$" style="font-size:.28rem;" class="right" v-model="transfer.amount" ref="amount" max="5" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入存款金额，最低为100元"></tf-input>
                        </div>
                        <div class="transfer-button-wrap">
                            <tf-button class="transfer-button" size="large" @click.native="beginTran">
                                {{transfer.type=='gameid_0'?"转入":"转出"}}
                            </tf-button>
                        </div>
                        <span @click="transfershow=false" class="transfer-close">
                            <tf-icon color="#ccc" size=".3rem" name="cha"></tf-icon>
                        </span>
                    </div>
                </tf-popup> -->

    </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import notice from "./../../components/notice";
import { CountUp } from "@/tf-ui/components/countup";
import gamePlatform from "@/common/games.platform";
export default {
  components: {
    [notice.name]: notice,
    [CountUp.name]: CountUp
  },
  data() {
    return {
      gamelist: [],
      transfershow: false,
      transfer: {
        platformName: "",
        platform: "",
        amount: "",
        type: ""
      }
    };
  },
  watch: {
    transfershow: function(value) {
      if (!value) {
        this.transfer.platformName = "";
        this.transfer.platform = "";
        this.transfer.amount = "";
        this.transfer.type = "";
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
    ...mapActions(["getBalance"]),
    // 获取游戏平台额度
    UserGameBalance(item) {
      item.loading = true;
      console.log(item);
      this.transfershow = true;
      this.transfer.platformName = item.cnname;
      this.transfer.platform = item.name;
      // this.transfer.amount = ""
      // this.transfer.type = type
      api[apiNames.UserGameBalance]({ GameID: item.name })
        .then(rep => {
          item.loading = false;
          let data = rep.data;
          if (data.Status === 1) {
            if (typeof data.row === "string") {
              item.amount = data.row;
            } else {
              if (data.row.Locked == 1) {
                this.alert({ mes: data.row.MaintainMsg });
              }
            }
          } else {
            this.sysErrCheck(data.Status).then(e => {
              if (e) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          item.loading = false;
        });
    },
    // 转入转出
    UserGameTran(item, type, event) {
      // "amount":"100","gameid_0":"PT" 为转入 gameid_1 为转出
      this.transfershow = true;
      this.transfer.platformName = item.cnname;
      this.transfer.platform = item.name;
      // this.transfer.amount = ""
      this.transfer.type = type;
    },
    checkRule() {
      if (!this.transfer.platform) {
        this.$toast({
          mes: "请选择平台",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }

      if (!this.$refs.amount.valid || this.transfer.amount <= 0) {
        this.$toast({
          mes: "操作金额最低1元，只能为整数",
          timeout: 1500,
          icon: "error"
        });
        return false;
      }

      return true;
    },
    beginTran(type) {
      if (!this.checkRule()) return;
      this.transfer.type = type;
      this.$loading.open();
      // let game = ;
      api[apiNames.UserGameTran]({
        amount: this.transfer.amount,
        [this.transfer.type]: this.transfer.platform
      })
        .then(rep => {
          this.$loading.close();
          this.transfershow = false;
          let data = rep.data;
          var game = null;
          this.gamelist.forEach(item => {
            if (item.name == this.transfer.platform) {
              game = item;
              return false;
            }
          });
          this.getBalance();
          if (data.Status === 1) {
            if (data.row != "") {
              if (data.row.Locked == 1) {
                this.alert({ mes: data.row.MaintainMsg });
              } else {
                game.amount = data.row.GameBalance;
                this.confirm({
                  title: "操作成功",
                  mes: "您户内账号转账已成功,注意核对相关金额！",
                  icon: "success",
                  opts: [
                    {
                      txt: "确定",
                      color: true,
                      callback: () => {}
                    }
                  ]
                });
              }
            } else {
              this.UserGameBalance(game);
              this.sysErrCheck(data.Status).then(e => {
                if (e) {
                  let alertMsg = "户内转账操作失败,请稍后再试!";
                  if (data.CNMessage && data.Status !== 1) {
                    alertMsg = data.CNMessage;
                  }
                  this.confirm({
                    title: "操作失败",
                    mes: alertMsg,
                    icon: "warn",
                    opts: [
                      {
                        txt: "确定",
                        color: true,
                        callback: () => {}
                      }
                    ]
                  });
                }
              });
            }
          } else {
            this.sysErrCheck(data.Status).then(rep => {
              this.alert({ mes: data.CNMessage });
            });
          }
        })
        .catch(err => {
          debugger;
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    }
  },
  created() {
    //获取钱包
    this.getBalance();
    let _newlist = [];
    gamePlatform.forEach(item => {
      let newItem = Object.assign({ loading: false, amount: null }, item);
      _newlist.push(newItem);
    });
    this.gamelist = _newlist.filter(item => item.id !== 16);
  },
  mounted() {
    // console.log(this.isLogin)
    setTimeout(() => {
      if (!this.isLogin) {
        this.needLogin();
      }
    }, 500);
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: "户内转账",
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
    ...mapState(["showLoading", "balance", "isLogin"])
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.container {
  .rotate {
    display: inline-block;
    animation: rotate-loading 0.45s linear forwards infinite;
  }
  .selected {
    //选中效果
    border: 1px solid #f01924;
    box-shadow: 1px 2px 8px rgba(220, 0, 0, 0.25);
    overflow: hidden;
    .right-wrap {
      .transfer-on {
        display: block;
      }
    }
  }
  .balance {
    background: #fff;
    margin: 0rem 0% 0 0%;
    width: 100%;
    padding: 0 0.24rem 0 0;
    height: 1.08rem;
    line-height: 1.08rem;
    font-size: 0.24rem;
    color: #999;
    border-radius: 0px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 6;
    border-bottom: 1px solid #f2f2f2;
    > .title {
      height: 0.38rem;
      line-height: 0.38rem;
      display: inline-block;
      border-left: 4px solid #ff3a2b;
      margin-top: 0.35rem;
      padding-left: 0.18rem;
      font-size: 0.26rem;
      color: #444;
    }
  }
  .left-icon {
    width: 0.8rem;
    height: 0.8rem;
    padding: 0;
    line-height: 0.8rem;
    border-radius: 32%;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    color: #fff;
    opacity: 1;
    margin-right: 0.05rem;
    display: none;
  }
  .right-wrap {
    display: block;
    width: 100%;
    text-align: left;
    font-size: 0.24rem;
    height: 1.2rem;
    margin: 0rem 0;
    .game-oprate,
    .game-balance {
      display: inline-block;
      padding-top: 0.2rem;
      box-sizing: border-box;
    }
    .game-balance {
      color: #ccc;
      vertical-align: top;
      padding-left: 0.2rem;
      line-height: 0.36rem;
      .game-blance-title {
        font-size: 0.24rem;
        display: block;
        width: 2.8rem;
        color: #333;
      }
      .game-balance-value {
        font-size: 0.3rem;
        font-weight: 500;
      }
      .game-balance-tip {
        color: #699deb;
        opacity: 0.75;
      }
    }
    .game-oprate {
      width: 2rem;
      padding-top: 0.3rem;
      text-align: right; // botton{
      // }
      .btn-primary {
        background-color: #699deb;
        border-radius: 0.6rem;
        height: 0.6rem;
        padding: 0 20px;
        margin-left: 0.06rem;
        font-size: 0.24rem;
      }
      .btn-hollow {
        border: 1px solid #699deb;
        box-sizing: border-box;
        border-radius: 0.6rem;
        height: 0.6rem;
        padding: 0 20px;
        font-size: 0.24rem;
        color: #699deb;
      }
    }
    .transfer-on {
      position: absolute;
      display: none;
      width: 0.88rem;
      height: 0.88rem;
      overflow: hidden;
      background: #f01924;
      right: -0.44rem;
      transform: rotate(45deg);
      i {
        position: absolute;
        top: 12px;
        left: 2px;
        transform: rotate(-45deg);
      }
    }
  }
  .warp-loading {
    position: relative;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    &:before {
      position: absolute;
      top: 1px;
      left: 0;
    }
  }
  .ptd12rem {
    padding-top: 0.06rem;
  }
  /*
    .transfer-wrap {
        overflow: hidden;
        clear: both;
        position: relative;
        .pading() {
            padding-left: .2rem;
            padding-right: .2rem;
        }
        .transfer-title {
            .pading();
            font-size: .3rem;
            height: 1rem;
            background-color: #f5f5f5;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            padding-top: .3rem;
            padding-bottom: .3rem;
            width: 100%;
            position: relative;
        }
        .transfer-title:after {
            content: " ";
            width: 100%;
            border-bottom: 1px solid #D9D9D9;
            transform: scaleY(.5);
            transform-origin: 0 0;
            position: absolute;
            z-index: 0;
            bottom: 0;
            left: 0;
        }
        .transfer-input {
            .pading();
            height: 1rem;
            width: 100%;
            overflow: hidden;
        }
        .transfer-button-wrap {
            .pading();
            box-sizing: border-box;
            background-color: #f5f5f5;
            padding-top: .3rem;
            padding-bottom: .3rem;
            width: 100%;
            position: relative;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        .transfer-button-wrap:before {
            content: " ";
            width: 100%;
            border-bottom: 1px solid #D9D9D9;
            transform: scaleY(.5);
            transform-origin: 0 0;
            position: absolute;
            z-index: 0;
            top: 0;
            left: 0;
        }
        .transfer-button {
            // display: inline-block;
            // width: 96%;
            // maring-left: 2%;
            margin-top: 0!important; // margin-bottom: .2rem;
        }
        .transfer-close {
            position: absolute;
            display: inline-block;
            top: .1rem;
            right: .24rem;
        }
    }
    */
  .TitleText {
    margin-top: 15px;
    width: 100%;
    border-top: 0.2rem solid #f2f2f2;
    padding: 0.3rem 0 0.3rem 0;
    overflow: hidden;
    float: left;
    span {
      display: inline-block;
      border-left: 4px solid #09f;
      padding-left: 0.28rem;
      color: #333;
      font-size: 0.26rem;
    }
  }

  .btnLogin-2 {
    width: 46%;
    height: 0.8rem;
    background: #ff3a2b;
    color: #fff;
    box-shadow: 0 0.02rem 0.5rem rgba(0, 0, 0, 0.1);
    margin: 0.25rem 0 0 0.2rem;
  }
  .btnLogin-2.fr {
    float: left;
    background: #473f4d;
  }

  .transfer-input {
    clear: both;
    overflow: hidden;
    height: 0.88rem;
    margin: 0 3%;
    width: 94%;
    border-radius: 6px;
    padding: 0 5px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    border-bottom: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    background: #fff;
    box-shadow: 0 0.04rem 0.15rem rgba(0, 0, 0, 0.1);
  }
  .transfer-btn {
    overflow: hidden;
    clear: both;
    padding-bottom: 0.25rem;
  }
}
</style>
