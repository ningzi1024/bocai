<!--找回密码-->
<template>
  <div class="findPwd">
    <ul class="nav" v-show="steps<5">
      <li v-bind:class="{active:steps==1}">1.找回方式</li>
      <li v-bind:class="{active:steps==2||steps==4}">2.信息验证</li>
      <li v-bind:class="{active:steps==3}">3.设置新密码</li>
    </ul>
    <div v-if="steps==1">
      <div class="Cont-Spacing">
        <tf-cell-group>
          <tf-cell-item arrow @click.native="chooseType(1)">
            <span slot="left" class="myIcon phone">
              <tf-icon name="shouji" size="0.35rem" color="#fff"></tf-icon>
            </span>
            <div slot="left" class="type-desc">
              <b>验证手机</b>
              <span>通过绑定手机找回</span>
            </div>
          </tf-cell-item>
          <tf-cell-item arrow @click.native="chooseType(2)">
            <span slot="left" class="myIcon mail">
              <tf-icon name="youxiang" size="0.35rem" color="#fff"></tf-icon>
            </span>
            <div slot="left" class="type-desc">
              <b>验证邮箱</b>
              <span>通过绑定邮箱找回</span>
            </div>
          </tf-cell-item>
          <tf-cell-item arrow @click.native="chooseType(3)">
            <span slot="left" class="myIcon safePass">
              <tf-icon name="mimaguanli" size="0.35rem" color="#fff"></tf-icon>
            </span>
            <div slot="left" class="type-desc">
              <b>安全密码</b>
              <span>通过安全密码找回</span>
            </div>
          </tf-cell-item>
        </tf-cell-group>
      </div>
    </div>
    <div class="type-phone" v-if="type==1&&steps==2">
      <div class="Cont-Spacing-02">
        <tf-cell-group>
          <tf-cell-item>
            <span class="title" slot="left">会员账号</span>
            <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入账号" v-model="username"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span class="title" slot="left">绑定手机</span>
            <span slot="left" class="phone-input">
              <tf-input :required="true" type="tel" :showSuccessIcon="false" :showRequiredIcon="false" :max="11" placeholder="请输入绑定的手机号" v-model="phone"></tf-input>
            </span>
            <span slot="right" class="btn-getCode" @click="getPhoneCode()" v-bind:class="{btnDisable:!getCodeIsReady}"><i v-if="!getCodeIsReady">{{seconds}}秒后重新</i>获取<i v-if="getCodeIsReady">验证码</i></span>
          </tf-cell-item>
          <tf-cell-item>
            <span class="title" slot="left">验证码</span>
            <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="6" placeholder="请输入验证码" v-model="code"></tf-input>
          </tf-cell-item>
        </tf-cell-group>
      </div>
      <tf-button size="large" @click.native="phoneNext()" class="btnSubmit btn-boxshadow" type="primary">下一步</tf-button>
      <tf-button size="large" @click.native="steps=1" type="primary" class="btnSubmit back">返回上一步</tf-button>
    </div>
    <div class="type-safePass" v-if="type==2&&steps==2">
      <div class="Cont-Spacing-02">
        <tf-cell-group>
          <tf-cell-item>
            <span class="title" slot="left">会员账号</span>
            <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入账号" v-model="username"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span class="title" slot="left">绑定邮箱</span>
            <tf-input slot="right" :required="true" type="email" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入您验证绑定的电子邮箱" v-model="mail"></tf-input>
          </tf-cell-item>
        </tf-cell-group>
      </div>
      <tf-button size="large" @click.native="mailNext()" class="btnSubmit" type="primary btn-boxshadow">下一步</tf-button>
      <tf-button size="large" @click.native="steps=1" type="primary" class="btnSubmit back">返回上一步</tf-button>
    </div>
    <div class="type-safePass" v-if="type==3&&steps==2">
      <div class="Cont-Spacing-02">
        <tf-cell-group>
          <tf-cell-item>
            <span class="title" slot="left">会员账号</span>
            <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入账号" v-model="username"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span class="title" slot="left">安全密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="16" placeholder="请输入该账号设置的安全密码" v-model="safePwd"></tf-input>
          </tf-cell-item>
        </tf-cell-group>
      </div>
      <tf-button size="large" @click.native="safePwdNext()" class="btnSubmit" type="primary btn-boxshadow">下一步</tf-button>
      <tf-button size="large" @click.native="steps=1" type="primary" class="btnSubmit back">返回上一步</tf-button>
    </div>
    <div class="setPwd" v-if="steps==3">
      <div class="Cont-Spacing-02">
        <tf-cell-group>
          <tf-cell-item>
            <span slot="left" class="title">设置新密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false"  placeholder="6-12位英文或数字组合，且不包括【/\#%&quot; '.?】特殊字符" v-model="pwd1"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span slot="left" class="title">确认新密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false"  placeholder="两次密码输入必须一致" v-model="pwd2"></tf-input>
          </tf-cell-item>
        </tf-cell-group>
      </div>
      <tf-button size="large" @click.native="submitNewPwd()" class="btnSubmit" type="primary btn-boxshadow">确 认</tf-button>
    </div>
    <div class="setting-ok" v-if="steps==4">
      <dl>
        <dt>
        <span class="ok-icon">
          <i class="icon tb icon-gou1"></i>
        </span>
        </dt>
        <dd><b>邮件已发送</b></dd>
        <dd>您的申请已提交成功，请查看您的邮箱！</dd>
      </dl>
    </div>
    <div class="setting-ok" v-if="steps==5">
      <dl>
        <dt>
        <span class="ok-icon">
          <i class="icon tb icon-gou1"></i>
        </span>
        </dt>
        <dd><b>密码修改成功</b></dd>
        <dd>请在下次登录时使用新密码！</dd>
      </dl>
      <tf-button size="large" class="backtouc" @click.native="routePath('/login')" bgcolor="#fff">前往登陆</tf-button>
    </div>
  </div>
</template>

<script>
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import ajaxCommon from 'common/ajaxCommon'
  export default{
    name:'findPw',
    data(){
      return {
        steps:1,//步骤
        type:0, //选择方式
        phone:"",
        code:"",
        username:"",
        safePwd:"",
        mail:"",
        getCodeIsReady:true,
        seconds:60,
        pwd1:"",
        pwd2:"",
        mailCode:""
      }
    },
    mounted(){
      this.isMailCheck();
    },
    methods:{
      //选择找回方式
      chooseType(n){
        n = n||1;
        this.steps = 2;
        this.type = n;
      },

      isMailCheck(){
        let code  = this.$route.query.code || null;
        if(!!code){
          this.mailCode = code;
          ajaxCommon("VerfiMailParamCommand",{MailCode:code},1,this).then(res=>{
            if(res){
              this.type = 2;
              this.steps = 3;
              this.username = res.row;
            }
          })
        }
      },

      //手机获取验证码
      getPhoneCode(){
        let data = {};
        if(this.username.length===0){
          this.alertTip("请填写账号！");
          return false;
        }else if(!this.numAndChatReg(0,0,3).test(this.phone)){
          this.alertTip("手机号码格式不正确！");
          return false;
        }
        if(!this.getCodeIsReady){
          return;
        }
        data.ACNT = this.username;
        data.Tel = this.phone;
        data.type = 14;
        this.$loading.open("正在发生...");
        Api[ApiNames.PasswordTelCommand](data).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === 964){
            this.alertTip('发送成功！','success');
            this.getCodeIsReady = false;
          }else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                this.alertTip(data.CNMessage);
              }
            })
          }
        }).catch((err)=>{
          this.sysErrCheck(-9);
        });
      },

      //手机验证信息
      phoneNext(){
        let data = {};
        if(this.username.length<=0){
          this.alertTip("请填写用户名！");
          return false;
        }else if(this.phone.length!=11){
          this.alertTip("电话号码格式不正确！");
          return false;
        }else if(this.code.length<=0){
          this.alertTip("请填写验证码！");
          return false;
        }
        data.ACNT = this.username;
        data.Code = this.code;
        data.Tel = this.phone;
        data.type = 14;
        this.$loading.open();
        Api[ApiNames.TelSecCodeCommand](data).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === 320){
            this.steps = 3;
          }else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                let msg = data.CNMessage;
                if(data.Status==1000){
                  msg = msg.replace("{0}","验证码");
                }
                this.alertTip(msg);
              }
            })
          }
        }).catch(()=>{
          this.sysErrCheck(-9);
        })
      },

      //安全密码验证信息
      safePwdNext(){
        if(this.username.length<=0){
          this.alertTip("请填写会员账号!");
          return false;
        }else if(!this.numAndChatReg(6,16,1).test(this.safePwd)){
          this.alertTip("安全密码是6-12位英文和数字组合，且不包括【/\#%\" \'.?】这些字符!");
          return false;
        }
        let data = {
          ACNT:this.username,
          SecPwd: this.safePwd
        };
        ajaxCommon("VerifySecPwdCommand",data,1,this).then(res=>{
          if(res){
            this.steps = 3;
          }
        })
      },

      //邮箱验证信息
      mailNext(){
        if(this.username.length<=0){
          this.alertTip("请填写会员账号");
          return false;
        }else if(!this.numAndChatReg(0,0,5).test(this.mail)){
          this.alertTip("邮箱格式不正确！");
          return false;
        }
        let host = window.location.origin;
        let params = window.location.hash;
        if(params.indexOf('#')<0){
          params = 'findPwd/';
        }
        let mobielUrl = host+'/'+params;
        let data = {
          ACNT:this.username,
          Mail:this.mail,
          URL:'https://www.tengbo8988.com',
          PageName:'ResetPassword.aspx',
          URL1:mobielUrl
        };
        ajaxCommon("PasswordMailCommand",data,1,this).then(res=>{
          if(res){
            this.steps = 4;
          }
        })
      },

      //设置新密码
      submitNewPwd(){
          if(!config.REG_PASSWORD.test(this.pwd1)){
            this.alertTip('密码是6-12位英文和数字组合，且不包括【/\#%\" \'.?】这些字符！！');
            return false;
          }else if(this.pwd1 != this.pwd2){
            this.alertTip('两次输入必须相同！');
            return false;
          }
          let comData = {
            LoginPwd1:this.pwd1,
            LoginPwd2:this.pwd2,
            ACNT:this.username
          };
          if(this.type===1){ //手机号码找回密码
            ajaxCommon("TelResetLoginPwdCommand",Object.assign({},{Tel:this.phone, Code:this.code},comData),211,this).then(res=>{
              if(res){
               this.steps = 5;
               setTimeout(()=>{
                 this.pwd1 = "";
                 this.pwd2 = "";
                 this.type = 0 ;
               },10);
              }
            })
          }else if(this.type === 2){ //邮箱找回密码
            ajaxCommon("MailResetLoginPwdCommand",Object.assign({},{Code:this.mailCode},comData),211,this).then(res=>{
              if(res){
                this.steps = 5;
                setTimeout(()=>{
                  this.pwd1 = "";
                  this.pwd2 = "";
                  this.type = 0 ;
                },10);
              }
            })
          }else if(this.type === 3){ //安全密码找回登陆密码
            ajaxCommon("SafePwdResetLoginPwdCommand",Object.assign({},{SafePwd:this.safePwd},comData),211,this).then(res=>{
              if(res){
                this.steps = 5;
                setTimeout(()=>{
                  this.pwd1 = "";
                  this.pwd2 = "";
                  this.type = 0 ;
                },10);
              }
            })
          }
      },

      //正则表达式
      numAndChatReg(min,max,type){
        type = type || 1;
        if(type == 1){ //用户名或密码验证
          return new RegExp("^[a-zA-Z0-9_-]{"+min+","+max+"}$");
        }else if(type == 2){//中文验证
          return /[^u4e00-u9fa5]$/;
        }else if(type == 3){ //手机号验证
          return /^1(3|4|5|7|8)\d{9}$/;
        }else if(type == 4){
          return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}$/;
        }else if(type == 5){ //邮箱验证
          return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        }else if(type==6){ //qq号码验证
          return /^[1-9][0-9]{4,10}$/;
        }
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

      routePath(path){
        path = path || '/';
        this.$router.push(path);
      }
    },
    beforeRouteEnter(to, from, next) {
      // 页面进入时触发
      next(vm => {
        vm.$store.commit('setSiteConfig', {
          title: "找回密码",
          showMenu:true,
          showBack:false,
          showNav:true,
          showChat:true
        });
      });
    },
    watch:{
      getCodeIsReady(newVal){
        if(newVal===false){
          let timer = setInterval(()=>{
            if(this.seconds<=0){
              clearInterval(timer);
              setTimeout(()=>{
                this.getCodeIsReady = !newVal;
                this.seconds = 60;
              },0)
            }
            this.seconds--;
          },1000)
        }
      }
    }
  }
</script>

<style scoped lang="less">
.findPwd{
  font-size:.3rem;
  ul.nav{
    overflow: hidden;
    text-align: center;
    font-size:0.24rem;
    height:0.88rem;
    line-height:0.88rem;
    background: #fff;
    box-shadow: 0 .02rem .15rem rgba(0,0,0,.08);
    li{
      width:33%;
      margin: 0 0%;
      height:.88rem;
      float: left;
      line-height: .88rem;
      color: #666;
      &.active{
        border-bottom:4px solid #ff3a2b;
        color: #ff3a2b;
      }
    }
  }
  .myIcon{
    display: inline-block;
    width:.8rem;
    height:.8rem;
    border-radius: 32%;
    text-align: center;
    margin:.26rem .26rem .26rem 0;
    box-shadow: 0 2px 8px rgba(0,0,0,.12);
    i{
      line-height:0.8rem;
    }
  }
  .phone{
    background: #7066b7;
  }
  .mail{
    background: #f01924;
  }
  .safePass{
    background: #236bf8;
  }
  .type-desc{
    font-size:0.24rem;
    b{
      display: block;
      font-weight:500;
      font-size:.24rem;
      color: #222;
    }
    span{
      color: #bbb;
    }
  }
  .btnSubmit{
    width:96%;
    height: .88rem;
    margin-left:2%;
  }
  .type-phone{
    font-size:.3rem;
    .title{
      width:1.4rem;
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
    .phone-input{
      display: inline-block;
      height: 1rem;
      width:3rem;
      padding-right:.1rem;
    }
  }
  .btnDisable{
    color: #aaa!important;
  }
  .setPwd{
    .title{
      width:1.9rem;
    }
  }
  .setting-ok{
    font-size:.3rem;
    padding-top:.6rem;
    dl{
      text-align: center;
      margin: 0 auto;
      dt{
        width:100%;
        margin-bottom:.38rem;
        .ok-icon{
          display: inline-block;
          width:1.28rem;
          height:1.28rem;
          background-image:-webkit-linear-gradient(to bottom, #4feabe, #42e5e9);
          background-image:linear-gradient(to bottom,#4feabe,#42e5e9);
          box-shadow: 0 .02rem .25rem rgba(66,229,233,.4);
          -webkit-border-radius:50%;
          border-radius:50%;
          text-align: center;
          i{
            font-size:.68rem;
            color: #fff;
            line-height:1.28rem;
          }
        }
      }
      dd{
        line-height:.44rem;
        color: #ccc;
        font-size: .24rem;
        b{
          color: #333;
          font-size: .26rem;
          font-weight: 500;
        }
      }
    }
  }
  .backtouc{
  width:90%;
  margin-left:5%;
  margin-top:.8rem;
  height: .88rem;
  border-radius: .88rem;
  background-image:-webkit-linear-gradient(to bottom, #fff, #f6f6f6);
  background-image:linear-gradient(to bottom,#fff,#f6f6f6);
  color: #666;
  border:1px solid #e8e8e8;
  box-shadow: 0 4px 20px rgba(0,0,0,.06);
  }
  .title{
    width:1.5rem;
    display: inline-block;
  }
  .back{
    color: #999;
    background: #fff;
    border:1px solid #eaeaea;
    margin-top:0.25rem;
    box-shadow: 0 .03rem .2rem rgba(0,0,0,.05);
  }
}
</style>
