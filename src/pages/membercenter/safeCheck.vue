<template>
  <transition name="slide-left">
  <div class="safeCheck uapp-yzbg">
    <div class="mail" v-show="paramName=='mail'">
      <tf-cell-group>
        <span class="desc">
          <span v-show="!isNext">请填写注册时的邮箱，如需要更改请联系 <i @click="onlineService()">在线客服</i></span>
          <span v-show="isNext">已经向您的邮箱发送了验证码！ <i v-show="!getCodeIsReady" class="resendTxt">{{secondsMail}}秒后</i><i v-bind:class="codeClass" @click="resendCode('mail')">重新发送</i></span>
        </span>
        <div class="Cont-Spacing-02">
          <tf-cell-item v-show="!isNext">
            <tf-icon slot="left" name="youxiang" size="0.38rem" color="#bbb"></tf-icon>
            <span slot="left" class="title">邮箱</span>
            <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="30" placeholder="请输入注册时邮箱" v-model="mailBox"></tf-input>
          </tf-cell-item>
          <tf-cell-item v-show="isNext">
            <tf-icon slot="left" name="youxiang" size="0.45rem" color="#000"></tf-icon>
            <span slot="left" class="title" style="color: #999;">{{ mailBox }}</span>
          </tf-cell-item>
          <tf-cell-item v-show="isNext">
            <tf-icon slot="left" name="anquanyanzheng" size="0.45rem" color="#000"></tf-icon>
            <tf-input slot="right" class="title" :required="true" type="number" :showSuccessIcon="false" :showRequiredIcon="false" max="6" placeholder="请输入验证码" v-model="code"></tf-input>
          </tf-cell-item>
        </div>
      </tf-cell-group>
      <tf-button v-show="!isNext" size="large" @click.native="getCodeMailSubmit()" class="btnSubmit btn-boxshadow" type="primary">发送验证码</tf-button>
      <tf-button v-show="isNext" size="large" @click.native="mailCheckSubmit()" class="btnSubmit btn-boxshadow" type="primary">确 认</tf-button>
    </div>


    <div class="mobile" v-show="paramName=='mobile'">
      <tf-cell-group>
        <span class="desc">
          <span v-show="!isNext">请填写注册时的手机号码，如需要更改请联系 <i @click="onlineService()">在线客服</i></span>
          <span v-show="isNext">已经向您的手机发送了验证码！ <i v-show="!getCodeIsReady" class="resendTxt">{{seconds}}秒后</i><i v-bind:class="codeClass" @click="resendCode()">重新发送</i></span>
        </span>
        <div class="Cont-Spacing-02">
          <tf-cell-item v-show="!isNext">
            <tf-icon slot="left" name="shouji" size="0.38rem" color="#bbb"></tf-icon>
            <span slot="left" class="title">手机号码</span>
            <tf-input slot="right" :required="true" type="number" :showSuccessIcon="false" :showRequiredIcon="false" max="20" placeholder="请输入注册时手机号" v-model="mobile"></tf-input>
          </tf-cell-item>
          <tf-cell-item v-show="isNext">
            <tf-icon slot="left" name="shouji" size="0.45rem" color="#000"></tf-icon>
            <span slot="left" class="title" style="color: #999;">+86 {{mobile}}</span>
          </tf-cell-item>
          <tf-cell-item v-show="isNext">
            <tf-icon slot="left" name="anquanyanzheng" size="0.45rem" color="#000"></tf-icon>
            <tf-input slot="right" class="title" :required="true" type="number" :showSuccessIcon="false" :showRequiredIcon="false" max="6" placeholder="请输入验证码" v-model="code"></tf-input>
          </tf-cell-item>
        </div>
      </tf-cell-group>
      <tf-button v-show="!isNext" size="large" @click.native="getCodeSubmit()" class="btnSubmit btn-boxshadow" type="primary">发送验证码</tf-button>
      <tf-button v-show="isNext" size="large" @click.native="mobileCheckSubmit()" class="btnSubmit btn-boxshadow" type="primary">确 认</tf-button>
    </div>
  </div>
  </transition>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import ajaxCommon from 'common/ajaxCommon'
  export default {
    name: 'safeCheck',
    created(){
      this.paramName = this.$route.params.name;
    },
    data(){
      return {
        paramName: '',
        mobile: '', //手机号
        isNext:false, // 第二部操作
        code: '', //手机验证码
        getCodeIsReady:true, //发送验证码开关
        mailBox:"", //邮箱地址
        seconds:60,
        secondsMail:180
      }
    },
    methods:{
      //获取手机验证码
      getCodeSubmit(){
        let reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        if(!this.getCodeIsReady) return;
        if(!reg.test(this.mobile)){
          this.alertTip("请输入正确的手机号码！");
          return false;
        }
        this.$loading.open();
        Api[ApiNames.TelAgreement]({
          PhoneNumber:this.mobile
        }).then(res=>{
          this.$loading.close();
          if(res.data.Status === config.TEL_OK){
            //成功
            this.SendPhoneCode();
          }else{
            this.sysErrCheck(res.data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(res.data.CNMessage);
              }
            });
          }
        }).catch(err=>{
          this.$loading.close();
          console.log(err);
          this.sysErrCheck(-9);
        })
      },

      //手机验证 PhoneNumber,ValidCode,SecType
      mobileCheckSubmit(){
        if(this.code.length<=0||this.code.length>6){
          this.alertTip("请输入正确的手机验证码！");
          return false;
        }
        this.$loading.open();
        Api[ApiNames.Verification]({
           PhoneNumber:this.mobile,
           ValidCode: this.code,
           SecType: 4,
           MailAddress:""
        }).then(res=>{
           this.$loading.close();
           if(res.data.Status === 951){
             this.$store.commit('setSettingOkTitle','验证成功');
             this.$store.commit('setSettingOkMsg','您的手机验证已经成功！');
             this.$router.push('/settingOk');
           }else{
             this.sysErrCheck(res.data.Status).then(canrun=>{
               if(canrun){
                 let msg = res.data.CNMessage;
                 if(res.data.CNMessage.indexOf('{')){
                   msg = msg.replace("{0}","验证码");
                 }
                 this.alertTip(msg);
               }
             });
           }
         }).catch(err=>{
           this.$loading.close();
           console.log(err);
           this.sysErrCheck(-9);
         })
      },

      //邮箱是否存在
      getCodeMailSubmit(){
        let reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if(!reg.test(this.mailBox)){
          this.alertTip("邮箱格式不正确！");
          return false;
        }
        this.$loading.open();
        Api[ApiNames.MailAgreement]({
          MailAddress:this.mailBox
        }).then(res=>{
          this.$loading.close();
          if(res.data.Status === config.MAIL_OK){
            this.SendMailCode();
          }else{
            this.sysErrCheck(res.data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(res.data.CNMessage);
              }
            })
          }
        }).catch(err=>{
          this.$loading.close();
          console.log(err);
          this.sysErrCheck(-9);
        })
      },

      //邮箱验证
      mailCheckSubmit(){
        this.$loading.open();
        Api[ApiNames.Verification]({
          MailAddress:this.mailBox,
          ValidCode:this.code,
          SecType:3
        }).then(res=>{
          this.$loading.close();
          if(res.data.Status === 952){
            this.$store.commit('setSettingOkTitle','验证成功');
            this.$store.commit('setSettingOkMsg','您的邮箱验证已经成功！');
            this.$router.push('/settingOk');
          }else{
            this.sysErrCheck(res.data.Status).then(canrun=>{
              if(!canrun) return;
              let msg = res.data.CNMessage;
              if(msg.indexOf('{0}')>-1){
                msg = msg.replace("{0}","验证码");
              }
              this.alertTip(msg);
            })
          }
        }).catch(err=>{
          this.$loading.close();
          console.log(err);
          this.sysErrCheck(-9);
        })
      },

      //发送验证码到手机
      SendPhoneCode(){
        this.$loading.open("发送中...");
        Api[ApiNames.Sendverification]({PhoneNumber:this.mobile}).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === config.MOBILESEND_OK){
            this.getCodeIsReady = false;
            this.isNext = true;
            this.alertTip("发送成功！","success");
          }else{
            this.sysErrCheck(-9).then(canrun=>{
              if(canrun){
                this.alertTip(data.CNMessage);
              }
            })
          }
        }).catch(()=>{
          this.$loading.close();
          this.sysErrCheck(-9);
        })
      },

      //发送邮箱验证码
      SendMailCode(){
        this.$loading.open("发送中...");
        let hostUrl = window.location.protocol + "//" + location.hostname;
        Api[ApiNames.SendPostMail]({
          MailAddress:this.mailBox,
          URL: hostUrl,
          PageName:""
        }).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status===config.MAILSEND_OK){
            this.isNext = true;
            this.getCodeIsReady = false;
            this.alertTip("发送成功！","success");
          }else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(data.CNMessage);
              }
            })
          }
        }).catch(()=>{
          this.$loading.close();
          this.sysErrCheck(-9);
        })
      },

      //弹出框
      alertTip(msg,type){
        type = type || "error"  ;
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: type
        });
      },

      //重新发送验证码
      resendCode(type){
        type = type?type:"mobile";
        if(!this.getCodeIsReady) return ;
        if(type=="mobile"){
          this.SendPhoneCode();
        }else if(type=="mail"){
          this.SendMailCode();
        }

      },

      // //在线客服
      // onlineService(){
      //   ajaxCommon("OnlineServices",{},1,this).then(res=>{
      //     let chatType = res.row;
      //     let url = 'https://secure.livechatinc.com/licence/8699606/open_chat.cgi';
      //     if(chatType==="Live800"){
      //       url = 'http://vftb18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=293933&configID=54000&jid=8086264846&lan=zh';
      //     }
      //     window.location.href = url;
      //   })
      // },

      ...mapMutations([
        "setSettingOkTitle",
        "setSettingOkMsg"
      ])
    },
    computed:{
      codeClass(){
        return {
          btnDisabled: !this.getCodeIsReady
        }
      }
    },
    watch:{
      getCodeIsReady(newVal,oldVal){
        let params = this.$route.params.name;
        let isMail = params==="mail";
        if(newVal===false){
          let timer = setInterval(()=>{
            if(isMail){
              if(this.secondsMail<=0){
                clearInterval(timer);
                setTimeout(()=>{
                  this.secondsMail = 180;
                  this.getCodeIsReady = !newVal;
                },20)
              }
              this.secondsMail--;
            }else{
              if(this.seconds<=0){
                clearInterval(timer);
                setTimeout(()=>{
                  this.seconds = 60;
                  this.getCodeIsReady = !newVal;
                },20)
              }
              this.seconds--;
            }
          },1000)
        }
      }
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        let paramName = vm.$route.params.name;
        let name = paramName=="mail"?"邮箱验证":"手机验证";
        vm.$store.commit('setSiteConfig',{
          title:name,
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
        vm.$loading.open();
        if(paramName=="mobile" || paramName=="mail"){
          Api[ApiNames.SleVerification]().then(res=>{
            vm.$loading.close();
            let data = res.data;
            let flag = false;
            let flag2 = false;
            if(data.Status == 1){
              let arr =  JSON.parse(data.row);
              for(let i=0;i<arr.length;i++){
                if(arr[i].SecType==4){ // 手机验证
                  flag = true;
                }else if(arr[i].SecType==3){ //邮箱验证
                  flag2 = true;
                }
              }
              if(flag && paramName=="mobile"){ //已经绑定手机，离开本页面
                vm.$confirm({
                  title: '温馨提示',
                  icon: "warn",
                  mes: '您已绑定手机，请不要重复操作！',
                  opts: [{
                    txt: '知道了',
                    color: false,
                    callback: () => {
                      vm.$router.back();
                    }
                  }, {
                    txt: '前往会员中心',
                    color: true,
                    callback: () => {
                      vm.$router.push("/memberCenter")
                    }
                  }]
                });
              }
              if(flag2 && paramName=="mail"){ //已经绑定邮箱，离开本页面
                vm.$confirm({
                  title: '温馨提示',
                  icon: "warn",
                  mes: '您的邮箱已验证，请不要重复操作！',
                  opts: [{
                    txt: '知道了',
                    color: false,
                    callback: () => {
                      vm.$router.back();
                    }
                  }, {
                    txt: '前往会员中心',
                    color: true,
                    callback: () => {
                      vm.$router.push("/memberCenter")
                    }
                  }]
                });
              }
            }else if(data.Status===963){
              return;
            }else{
              vm.sysErrCheck(data.Status).then(canrun=>{
                  if(canrun)
                    vm.alertTip(data.CNMessage);
              });
            }
          }).catch(err=>{
            console.log(err);
            vm.sysErrCheck(-9);
          })
        }else{
          vm.$loading.close();
          vm.$router.push("/memberCenter")
        }
      })
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit('setSiteConfig', {
        showBack: false,
        showNav: true
      });
      next();
    }
  }
</script>

<style scoped lang="less">
.safeCheck{
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
}
.desc{
  background: #f5f5f5;
  display: inline-block;
  width:100%;
  padding:0.3rem 0;
  font-size: .24rem;
  text-align: center;
  color: #bbb;
  i{
    color: #699deb;
    &.btnDisabled{
      color: #aaa;
    }
  }
}
.title{
  margin:0 .22rem;
  line-height: 0;
  font-size: .24rem;
}
.btnSubmit{
  width:94%;
  margin-left:3%;
  height: .88rem;
}
.btnDisabled{
  color: #aaa;
}
.resendTxt{
  color: #aaa!important;
  margin-left:0.05rem;
}
</style>
