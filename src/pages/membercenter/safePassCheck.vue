<template>
  <div class="safePass">
    <ul class="nav">
      <li v-bind:class="{active:navIndex==1}" @click="chanageNav(1)">安全密码</li>
      <li v-bind:class="{active:navIndex==2}" @click="chanageNav(2)">登陆密码</li>
    </ul>
    <div v-show="navIndex==1">
      <span class="notice">安全问题是重置安全密码的唯一凭证！如果忘记答案可联系 <i @click="onlineService()">在线客服</i></span>
      <div class="Cont-Spacing-02">
        <tf-cell-group>
          <!-- <span class="notice">安全问题是重置安全密码的唯一凭证！如果忘记答案可联系 <i @click="onlineService()">在线客服</i></span> -->
          <tf-cell-item>
            <span slot="left" class="title">安全问题</span>
            <span slot="left" v-show="checked">{{ question }}</span>
            <tf-input v-show="!checked" slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入安全问题、2-16个字符" v-model="question"></tf-input>
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
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="12" placeholder="必须与安全密码一致" v-model="password2"></tf-input>
          </tf-cell-item>
        </tf-cell-group>
      </div>
      <tf-button size="large" @click.native="savePass()" class="btnSubmit" type="primary">确 认</tf-button>
      <tf-button v-show="checked" size="large" class="btnSubmit resetPass" type="primary" @click.native="resetSafePass()">重置安全密码</tf-button>
    </div>

    <div v-show="navIndex==2">
      <!-- <span class="notice">修改后请牢记您的登陆密码！</span> -->
      <!-- <tf-notice class="newapp-notice-1" title="温馨提示：" content="修改后请牢记您的登陆密码！"></tf-notice> -->
      <div class="Cont-Spacing-02">
        <tf-cell-group>
          <tf-cell-item>
            <span slot="left" class="title">旧密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入当前的登陆密码" v-model="oldPw"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span slot="left" class="title">新密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="6-12位英文或数字组合，且不包括【/\#%&quot; '.?】特殊字符" v-model="pw1"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span slot="left" class="title">确认新密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="两次密码要一致" v-model="pw2"></tf-input>
          </tf-cell-item>
        </tf-cell-group>
      </div>
      <tf-button size="large" class="btnSubmit" type="primary" @click.native="updateLoginPass()">确认修改</tf-button>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import Notice from 'components/notice'
  import gVars from '../../common/GlobalVars'
  export default{
    name: 'safePassCheck',
    data(){
      return {
        question:'',
        answer:'',
        password1:'',
        password2:'',
        checked:false,
        formData:{},
        navIndex:1,
        regPwd: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z][^\\/#%'"".\??]{5,11}$/,
        oldPw:"",
        pw1:"",
        pw2:"",

      }
    },
    mounted(){
      setTimeout(()=>{
        this.init();
      },20)
    },
    methods:{
      init(){
        this.$loading.open();
        Api[ApiNames.CheckSafeQuestionCommand]().then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === config.ERR_OK){
            this.question = data.row;
            this.checked = true;
          }else if(data.Status === 14){
            this.question = "";
          }else{
            this.sysErrCheck(data.Status);
          }
        }).catch(()=>{
          this.$loading.close();
          this.sysErrCheck(-9);
        })
      },

      //切换导航
      chanageNav(n){
        n = n || 1;
        this.navIndex = n;
      },

      //提交表单
      savePass(){
        if(this.formCheck()){
          if(this.checked){
            this.updateSafeQuestion();
          }else{
            this.setSafeQuestion();
          }
        }
      },

      //设置安全密码/安全问题
      setSafeQuestion(){
        this.$loading.open();
        Api[ApiNames.SetSafeQuestionCommand](this.formData).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === 403){//安全密码设置成功
            this.$store.commit('setSettingOkTitle','验证成功');
            this.$store.commit('setSettingOkMsg','您的安全密码已经设置成功！');
            this.$router.push('/settingOk');
            setTimeout(()=>{
              this.formData = {};
            },0)
          } else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(data.CNMessage);
              }
            })
          }
        }).catch(()=>{
          this.sysErrCheck(-9);
        })
      },

      //修改安全密码
      updateSafeQuestion(){
        this.$loading.open();
        Api[ApiNames.UpdateSafePasswordCommand](this.formData).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === 212){
            //安全密码修改成功
            this.$store.commit('setSettingOkTitle','修改成功');
            this.$store.commit('setSettingOkMsg','您的安全密码已经修改成功！');
            this.$router.push('/settingOk');
            setTimeout(()=>{
              this.formData = {};
            },0)
          }else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(data.CNMessage);
              }
            })
          }
        }).catch(()=>{
          this.sysErrCheck(-9);
        })
      },

      //表单验证
      formCheck(){
        let data = {};
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
        data.Question = this.question;
        data.Answer = this.answer;
        data.Pwd1 = this.password1;
        data.Pwd2 = this.password2;
        this.formData = data;
        return true;
      },
////////////////////以下是登陆密码////////////////////////
      //修改登陆密码
      updateLoginPass(){
        if(this.formCheck_login()){
          this.$loading.open();
          Api[ApiNames.UpdateLoginPwdCommand](this.formData).then(res=>{
            this.$loading.close();
            let data = res.data;
            if(data.Status===config.ERR_OK){
              gVars.userPwd = this.pw1;
              this.$store.commit('setSettingOkTitle','密码修改成功');
              this.$store.commit('setSettingOkMsg','您相关游戏平台密码已经修改成功！');
              this.$router.push('/settingOk');
              setTimeout(()=>{
                this.formData = {};
              },0)
            }else{
              this.sysErrCheck(data.Status).then(canrun=>{
                this.alertTip(data.CNMessage);
              })
            }
          }).catch(()=>{
            this.sysErrCheck(-9);
          })
        }
      },

      //登陆密码表单验证
      formCheck_login(){
        let data = {};
        if(this.oldPw.length<=0){
          this.alertTip("请输入旧密码！");
          return false;
        }else if(this.oldPw.length<6||this.oldPw.length>12){
          this.alertTip("密码长度应为6-12位！");
          return false;
        }else if(this.pw1.length<=0){
          this.alertTip("请输入新密码！");
          return false;
        }else if(!config.REG_PASSWORD.test(this.pw1)){
          this.alertTip("安全密码是6-12位英文和数字组合，且不包括【/\#%\" \'.?】这些字符！");
          return false;
        }else if(this.pw1!==this.pw2){
          this.alertTip("两次密码输入不一致！");
          return false;
        }
        data.pwd0 = this.oldPw;
        data.pwd1 = this.pw1;
        data.pwd2 = this.pw2;
        this.formData = data;
        return true;
      },

      //弹出框
      alertTip(msg){
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: 'error'
        });
      },

      //重置安全密码
      resetSafePass(){
        this.$router.push('/safetyCenter/resetSafePass');
      },
      ...mapMutations([
        "setSettingOkTitle",
        "setSettingOkMsg"
      ])
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:'密码管理',
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
      })
    },
    components:{
      [Notice.name]:Notice
    }
  }
</script>

<style scoped lang="less">
.safePass{
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
  .notice,.newapp-notice-1{
    display:block;
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
      color: #699deb;
    }
  }
  .newapp-notice-1{
    line-height: .34rem;
  }
  .title{
    width:1.8rem;
    display: inline-block;
  }
  .btnSubmit{
    width:96%;
    margin-left:2%;
    height: .88rem;
    box-shadow: 0 .03rem .3rem rgba(220,0,0,.2);
  }
  .resetPass{
    color: #999;
    background: #fff;
    border:1px solid #eaeaea;
    margin-top:0.25rem;
    box-shadow: 0 .03rem .2rem rgba(0,0,0,.05);
  }
}
</style>
