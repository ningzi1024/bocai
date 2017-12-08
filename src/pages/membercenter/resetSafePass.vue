<template>
<div class="resetWrap">
  <ul class="nav">
    <li class="active">安全密码</li>
    <li>登陆密码</li>
  </ul>
  <!-- <span class="notice">安全问题是重置安全密码的唯一凭证！如果忘记答案可联系 <i @click="onlineService()">在线客服</i></span> -->
  <div class="Cont-Spacing-02">
    <tf-cell-group>
      <tf-cell-item>
        <span slot="left" class="title">验证的手机</span>
        <span slot="left" class="mobileNum">{{ mobile }}</span>
        <span slot="right" v-show="getCodeIsReady" class="btn-getCode" @click="getCode()">获取验证码</span>
        <span slot="right" v-show="!getCodeIsReady" class="btn-getCode disable">{{ seconds }}秒后再获取</span>
      </tf-cell-item>
      <tf-cell-item>
        <span slot="left" class="title">验证码</span>
        <tf-input slot="right" :required="true" type="number" :showSuccessIcon="false" :showRequiredIcon="false" max="20" placeholder="请输入验证码" v-model="code"></tf-input>
      </tf-cell-item>
    </tf-cell-group>
  </div>
  <span class="notice">以下为重置银行卡信息！重置成功后，原来的将被注销并替换</span>
  <div class="Cont-Spacing-02">
    <tf-cell-group>
      <tf-cell-item>
        <span slot="left" class="title">安全问题</span>
        <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入安全问题、2-16个字符" v-model="question"></tf-input>
      </tf-cell-item>
      <tf-cell-item>
        <span slot="left" class="title">问题答案</span>
        <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="20" placeholder="请输入问题答案" v-model="answer"></tf-input>
      </tf-cell-item>
      <tf-cell-item>
        <span slot="left" class="title">新密码</span>
        <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="12" placeholder="6-12位英文或数字组合，且不包括【/\#%&quot; '.?】特殊字符" v-model="password1"></tf-input>
      </tf-cell-item>
      <tf-cell-item>
        <span slot="left" class="title">确认新密码</span>
        <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="12" placeholder="两次密码输入必须一致" v-model="password2"></tf-input>
      </tf-cell-item>
    </tf-cell-group>
  </div>
  <tf-button size="large" @click.native="resetPass()" class="btnSubmit btn-boxshadow" type="primary">确 认</tf-button>
</div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import ajaxCommon from 'common/ajaxCommon'
  export default {
    name:'resetSafePass',
    data(){
      return {
        mobile:"",
        question:"",
        answer:"",
        password1:"",
        password2:"",
        btnText:"获取验证码",
        code:"",
        seconds: 60,
        formData:{},
        isBindPhone:false, //是否绑定过手机
        getCodeIsReady:true //发送验证码开关

      }
    },
    mounted(){
      if(this.isBindPhone){
        this.getPhoneNum();
      }
    },
    methods:{
      //获取验证码
      getCode(){
        if(!this.getCodeIsReady) return;
        this.$loading.open('发送中..');
        Api[ApiNames.TelSendCodeSafetyProblemAndPassword]().then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status===964){
            this.getCodeIsReady = false;
            this.alertTip('发送成功','success');
          }else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(data.CNMessage);
              }
            })
          }
        }).catch(()=>{
          this.$loading.close();
          this.sysErrCheck(-9)
        })
      },

      //获取注册时的手机号
      getPhoneNum(){
        this.$loading.open();
        Api[ApiNames.retBindTel]().then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status===config.ERR_OK){
            this.mobile = data.row;
          }else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(data.CNMessage);
              }
            })
          }
        }).catch(()=>{
          this.$loading.close();
          this.sysErrCheck(-9)
        })
      },

      //提交表单
      resetPass(){
        if(this.formCheck()){
          this.$loading.open();
          Api[ApiNames.TelCodeUpdateSafetyProblemAndPassword](this.formData).then(res=>{
            this.$loading.close();
            let data = res.data;
            if(data.Status === config.ERR_OK){
              this.$store.commit('setSettingOkTitle','重置成功');
              this.$store.commit('setSettingOkMsg','您的安全密码已经重置成功！');
              this.$router.push('/settingOk');
            }else{
              this.sysErrCheck(data.Status).then(canrun=>{
                if(canrun){
                  let msg = data.CNMessage;
                  if(msg.indexOf("{")>-1){
                    msg = msg.replace("{0}","验证码");
                  }
                  this.alertTip(msg);
                }
              })
            }
          }).catch(()=>{
            this.$loading.open();
            this.sysErrCheck(-9);
          })
        }
      },

      //表单验证
      formCheck(){
        let data = {};
        let pwReg = /^[\w]{6,12}$/;
        if(this.code.length<=0||this.code.length>6){
          this.alertTip("请填写正确的验证码!");
          return false;
        }else
        if(this.question.length<=0 || this.question.length>16){
          this.alertTip("安全问题长度为2-16个字符!");
          return false;
        }else if(this.answer.length<=0){
          this.alertTip("请输入问题答案!");
          return false;
        }else if(!config.REG_PASSWORD.test(this.password1)){
          this.alertTip("安全密码是6-12位英文和数字组合，且不包括【/\#%\" \'.?】这些字符！");
          return false;
        }else if(this.password1!==this.password2){
          this.alertTip("两次密码输入不一致!");
          return false;
        }
        data.VerificationCode = this.code;
        data.NewSafetyProblem = this.question;
        data.NewSafetyAnswer = this.answer;
        data.pwd1 = this.password1;
        data.pwd2 = this.password2;
        this.formData = data;
        return true;
      },

      //在线客服
      onlineService(){
        ajaxCommon("OnlineServices",{},1,this).then(res=>{
            let chatType = res.row;
            let url = 'https://secure.livechatinc.com/licence/8699606/open_chat.cgi';
            if(chatType==="Live800"){
              url = 'http://vftb18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=293933&configID=54000&jid=8086264846&lan=zh';
            }
            window.location.href = url;
        })
      },

      //弹出框
      alertTip(msg,type){
        type = type || 'error';
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: type
        });
      },

      ...mapMutations([
        "setSettingOkTitle",
        "setSettingOkMsg"
      ])
    },
    watch:{
      getCodeIsReady(newVal,oldVal){
        if(!newVal){
          console.log(newVal);
          this.seconds = 60;
          let myTimer = setInterval(()=>{
            if(this.seconds<=0){
              clearInterval(myTimer);
              this.getCodeIsReady = true;
            }
            this.seconds--;
          },1000)
        }
      }
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"重置安全密码",
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
        vm.$loading.open();
        Api[ApiNames.SleVerification]().then(res=>{
          vm.$loading.close();
          let data = res.data;
          if(data.Status == 1){
            let arr =  JSON.parse(data.row);
            let flag = false;
            for(let i=0;i<arr.length;i++){
              if(arr[i].SecType==4){
                flag = true;
              }
            }
            vm.isBindPhone = flag;
            if(!flag){ //为绑定手机
              vm.$confirm({
                title: '未绑定手机',
                icon: "warn",
                mes: '请您先去设置手机验证，再进行此操作！',
                opts: [{
                  txt: '知道了',
                  color: false,
                  callback: () => {
                    vm.$router.back();
                  }
                }, {
                  txt: '手机验证',
                  color: true,
                  callback: () => {
                    vm.$router.push("/safetyCenter/safeCheck/mobile")
                  }
                }]
              });
            }
          }else{
            vm.sysErrCheck(data.Status);
          }
        }).catch(err=>{
          console.log(err);
          vm.sysErrCheck(-9);
        })
      })
    }
  }
</script>

<style scoped lang="less">
.resetWrap{
  font-size:.3rem;
  .nav{
    overflow: hidden;
    text-align: center;
    font-size:0.26rem;
    height:0.88rem;
    line-height:0.88rem;
    background: #fff;
    box-shadow: 0 .02rem .15rem rgba(0,0,0,.08);
    li{
      width:40%;
      margin: 0 5%;
      height:.88rem;
      float: left;
      line-height: .88rem;
      color: #666;
      &.active{
        border-bottom:4px solid #ff3a2b;
        color: #ff3a2b;
      }
      &:last-child{
        float: right;
      }
    }
  }
  .notice{
    display:block;
    overflow: hidden;
    clear: both;
    font-size:.22rem;
    color: #bbb;
    text-align: center;
    padding:0.1rem 0;
    width:100%;
    height: .42rem;
    line-height: .3rem;
    position: relative;
    margin-bottom: -.2rem;
    background: none;
    i{
      color: #09f;
    }
  }
  .title{
    color: #333;
    width:1.8rem;
  }
  .mobileNum{
    display: inline-block;
    height: 100%;
    width:2.4rem;
    line-height:1rem;
    overflow: hidden;
  }
  .btn-getCode{
    color: #fff;
    font-size:0.24rem;
    height: .72rem;
    line-height: .72rem;
    padding: 0 12px;
    border-radius: .12rem;
    text-align: center;
    background: #50dab8;
    white-space: nowrap;
  }
  /*.warnText{
    width: 100%;
    border-top:1px solid #dcdcdc;
    border-bottom:1px solid #dcdcdc;
    padding:0.2rem 0 .2rem 0;
    overflow: hidden;
    span{
      display: inline-block;
      border-left:3px solid #f01924;
      padding-left:.24rem;
      color: #f01924;
      font-size:0.24rem;
    }
  }*/
  .btnSubmit{
    width:96%;
    height: .88rem;
    margin-left:2%;
  }
  .disable{
    color: #bbb;
    background: #eee;
  }
}
</style>
