<!--
* 支付订单提交成功
*type: 0 创建表单提交，
       1 跳转网页
       2 打开二维码
       
-->
<template>
    <div class="container" :style="{'height':contentHeight+'px'}">
        <div v-if="type===2" class="QRcode">
            <!-- <img :src="url">
            <p class="size24rem">长按保存二维码</p>
            <p class="size3rem fontW600">二维码生成成功请扫码支付</p>
            <tf-button size="large" @click.native="goMemberCenter" class="blueColor" type="hollow">返回个人中心</tf-button> -->
            <dl class="AppDraw-OK boxshadow">
                <dt><img id="qcodeImage" v-finger:long-tap="imgLongTap"   v-lazy="url"></dt>
                <dd><b>长按二维码图片点击保存</b></dd>
                <dd><b>或截图保存二维码</b></dd>
                <!-- <dd><b>或下载二维码</b></dd> -->
                <dd>二维码生成成功请扫码支付！</dd>
            </dl>
            <tf-button size="large" @click.native="goMemberCenter" class="btnOk" type="hollow">返回个人中心</tf-button>
        </div>
        <div v-else-if="type===0 || type===1" class="success">
            <!-- <tf-icon name="success" size="1.6rem" color="#3ccd94"></tf-icon>
            <p class="size3rem fontW600">支付订单提交成功</p>
            <tf-button size="large" @click.native="goPay" type="primary">前往支付</tf-button>
            <tf-button size="large" @click.native="goMemberCenter" class="blueColor" type="hollow">返回个人中心</tf-button> -->

            <dl class="AppDraw-OK boxshadow">
                <dt><span class="ok-icon"><i class="icon tb icon-gou1"></i></span></dt>
                <dd><b>支付订单提交成功</b></dd>
                <dd>请尽快完成支付，若超过3分钟充值未到账，请与客服联系！</dd>
            </dl>
            <tf-button size="large" @click.native="goPay" class="btnToPay btn-boxshadow" type="primary">前往支付</tf-button>
            <tf-button size="large" @click.native="goMemberCenter" class="btnOk" type="hollow">返回个人中心</tf-button>

        </div>
        <tf-actionsheet :items="list" cancel="取消" v-model="show"></tf-actionsheet>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import submitPay from "@/common/submit.pay.mixin";
import { ActionSheet } from "@/tf-ui/components/actionsheet";
export default {
  mixins: [submitPay],
  components: {
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      type: "",
      url: "",
      show: false,
      list: [
        {
          label: "保存二维码",
          method: () => {
            this.saveImg();
          }
        }
      ]
    };
  },
  methods: {
    //获取mutation
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig"
    ]),
    imgLongTap() {
      if (this.$native.IsNative) {
        this.show = true;
        // console.log(window["cordova"], this.$native.photoLibrary);
      }
    },
    saveImg() {
      let url = this.url;
      cordova.plugins.photoLibrary.requestAuthorization(
        () => {
          cordova.plugins.photoLibrary.saveImage(
            url,
            "TengBoAPP",
            save => {
              this.$toast({
                mes: "支付二维码保存成功，请在相册中查看",
                timeout: 1500
              });
            },
            err => {
              // alert(err)
              this.confirm({
                title: "保存失败",
                mes: "未获得存储读写权限，请对APP授予存储读写权限",
                icon: "error",
                opts: [
                  {
                    txt: "知道了",
                    color: false,
                    callback: () => {}
                  }
                ]
              });
            }
          );
        },
        err => {
          this.confirm({
            title: "申请权限失败",
            mes: "未获得存储读写权限，请对APP授予存储读写权限",
            icon: "error",
            opts: [
              {
                txt: "知道了",
                color: false,
                callback: () => {}
              }
            ]
          });
        },
        {
          read: true,
          write: true
        }
      );
    },
    goPay() {
      this.$loading.open();
      if (this.type === 0) {
        if (this.$native.IsNative) {
          let fromHtml = encodeURIComponent(
            this.createFromSubmit({ actionUrl: this.url, isGetHtml: true })
          );
          let url = `/static/FromPay.html?fromhtml=${fromHtml}`;
          window.open(url, "_system", "location=no,hardwareback=no");
        } else {
          this.createFromSubmit({ actionUrl: this.url });
        }
      } else {
        if (this.$native.IsNative) {
          window.open(this.url, "_system", "location=no,hardwareback=no");
        } else {
          this.openWin(this.url);
        }
      }
      setTimeout(() => {
        this.$confirm({
          title: "是否完成支付？",
          icon: "warn",
          mes: "充值后，请点击下方的“完成支付”来自动刷新您的主账户余额,若超过3分钟充值未到账，请与客服联系",
          opts: [
            {
              txt: "联系客服",
              color: true,
              callback: () => {
                this.onlineService();
                this.$loading.close();
              }
            },
            {
              txt: "再付一笔",
              color: false,
              callback: () => {
                this.$loading.close();
                this.$router.replace("/deposit");
              }
            },
            {
              txt: "完成",
              color: false,
              callback: () => {
                this.$loading.close();
                this.$router.back();
              }
            }
          ]
        });
      }, 1500);
    },
    goMemberCenter() {
      this.$router.replace({ name: "memberCenter" });
    }
  },
  created() {
    this.type = this.$route.params.type;
    this.url = this.$route.params.value;
  },
  mounted() {
    document.getElementById("scrollView").style.overflow = "hidden";
    // document.getElementById("")
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: "提交成功",
        showMenu: false,
        showBack: true,
        showNav: false,
        showChat: false
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    document.getElementById("scrollView").style.overflow = "auto";
    next();
  },
  computed: {
    contentHeight() {
      return (
        this.screen.height -
        document.getElementsByTagName("header")[0].getBoundingClientRect()
          .height
      );
    }
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
.container {
  overflow: hidden;
  .success,
  .QRcode {
    text-align: center;
  }
  .QRcode {
    img {
      display: block;
      box-sizing: border-box;
      width: 4.5rem;
      min-height: 4.5rem;
      margin: 0 auto 0.5rem auto;
    }
  }
  .btnToPay {
    width: 96%;
    height: 0.88rem;
    margin-left: 2%;
  }
  .btnOk {
    width: 96%;
    height: 0.88rem;
    border: none;
    -webkit-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    margin-left: 2%;
    margin-top: 0.2rem;
  }

  .AppDraw-OK {
    background: #fff;
    padding: 0.8rem 0;
    text-align: center;
    margin: 0 auto 0.2rem auto;
    dt {
      width: 100%;
      margin-bottom: 0.16rem;
      .ok-icon {
        display: inline-block;
        width: 1.28rem;
        height: 1.28rem;
        background-image: -webkit-linear-gradient(to bottom, #4feabe, #42e5e9);
        background-image: linear-gradient(to bottom, #4feabe, #42e5e9);
        box-shadow: 0 0.02rem 0.25rem rgba(66, 229, 233, 0.4);
        -webkit-border-radius: 50%;
        border-radius: 50%;
        text-align: center;
        i {
          font-size: 0.68rem;
          color: #fff;
          line-height: 1.28rem;
        }
      }
    }
    dd {
      line-height: 0.44rem;
      color: #ccc;
      font-size: 0.24rem;
      b {
        color: #333;
        font-size: 0.26rem;
        font-weight: 500;
      }
    }
  }
}
</style>
