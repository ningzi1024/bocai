<template>
  <div class="register" @click.stop="showMailList=false">
    <ul class="nav" v-show="steps!=3">
      <li v-bind:class="{active:steps==1}">1.账户信息</li>
      <li v-bind:class="{active:steps==2}">2.详细资料</li>
      <li>3.注册成功</li>
    </ul>
    <tf-notice v-show="steps!=3" class="notice" title="温馨提示：" content="温馨提示：如发现客户拥有多个账户，其帐户将会被冻结并且取消所有胜出的投注，恕不另行通知。"></tf-notice>
    <div v-if="steps==1">
      <div class="Cont-Spacing-02">
        <tf-cell-group>
          <tf-cell-item>
            <span slot="left" class="title">登录账号</span>
            <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="10" placeholder="账号前自动加tb,必须是3-10个字符" v-model="username"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span slot="left" class="title">登录密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="12" placeholder="6-12位英文或数字组合，且不包括【/\#%&quot; '.?】特殊字符" v-model="pw1"></tf-input>
          </tf-cell-item>
          <tf-cell-item>
            <span slot="left" class="title">确认密码</span>
            <tf-input slot="right" :required="true" type="password" :showSuccessIcon="false" :showRequiredIcon="false" max="12" placeholder="必须与登陆密码一致" v-model="pw2"></tf-input>
          </tf-cell-item>
        </tf-cell-group>
      </div>
      <tf-button size="large" @click.native="nextStep()" class="btnSubmit btn-boxshadow" type="primary">下一步</tf-button>
      <tf-button size="large" @click.native="routePath(3)" class="btnSubmit resetPass" type="primary">我已注册有账号</tf-button>
      <!-- <div class="toLogin">
        <span>已经注册有账号? <i @click="routePath(3)">点击登录</i></span>
      </div> -->
    </div>
    <div v-show="steps==2">
      <div class="Cont-Spacing-02">
      <tf-cell-group>
        <tf-cell-item>
          <span class="title" slot="left">真实姓名</span>
          <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" max="20" placeholder="绑定银行卡时必须与开户人保持一致" v-model="realName"></tf-input>
        </tf-cell-item>
        <tf-cell-item @click.native="selectShow=true">
          <span class="title" slot="left">性别</span>
          <span slot="left" class="color-blue">{{ ["男","女"][sex]||"请选择性别" }}</span>
          <tf-icon slot="right" name="right-copy" color="#666" size="0.35rem"></tf-icon>
        </tf-cell-item>
      </tf-cell-group>
      </div>
      <div class="Cont-Spacing-02" style="overflow: visible;">
      <tf-cell-group>
        <tf-cell-item>
          <span class="title" slot="left">联系电话</span>
          <tf-input slot="right" :required="true" type="tel" :showSuccessIcon="false" :showRequiredIcon="false" :max="11" placeholder="请输入您的联系电话/手机号码" v-model="phone"></tf-input>
        </tf-cell-item>
        <tf-cell-item>
          <span class="title" slot="left">联系QQ</span>
          <tf-input slot="right" :required="true" type="number" :showSuccessIcon="false" :showRequiredIcon="false"  placeholder="请输入您的常用QQ" v-model="qq"></tf-input>
        </tf-cell-item>
        <tf-cell-item>
          <span class="title" slot="left">会员邮箱</span>
          <tf-input slot="right" :required="true" type="text" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入您的常用邮箱" v-model="mail" ></tf-input>
        </tf-cell-item>
        <ul class="mailList" v-show="showMailList">
          <li v-for="item in emailList" @click="chooseMail(item)">{{  tempmail+item}}</li>
        </ul>
      </tf-cell-group>
      </div>
      <div class="Cont-Spacing-02" style="z-index:1;">
      <tf-cell-group>
        <tf-cell-item>
          <span class="title" slot="left">推荐人</span>
          <tf-input slot="right" :required="true" type="email" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="如有推荐人，可在此处输入推荐人账号" v-model="referrer"></tf-input>
        </tf-cell-item>
        <tf-cell-item>
          <span class="title" style="width: 2.18rem;" slot="left">验证码</span>
          <tf-input slot="left" :required="true" type="number" :showSuccessIcon="false" :showRequiredIcon="false" :max="4" placeholder="请输入验证码" v-model="code"></tf-input>
          <img :src="codeImg" slot="right" @click="getCode()">
        </tf-cell-item>
      </tf-cell-group>
      </div>
      <tf-button size="large" @click.native="formSubmit()" class="btnSubmit btn-boxshadow" type="primary">确认提交</tf-button>
      <tf-actionsheet :items="selectItems" v-model="selectShow" cancel="取消"></tf-actionsheet>
    </div>
    <div v-show="steps==3">
      <div class="setting-ok">
        <dl>
          <dt>
            <span class="ok-icon">
              <i class="icon tb icon-gou1"></i>
            </span>
          </dt>
          <dd><b>注册成功</b></dd>
          <dd>{{ username }}，欢迎您加入腾博会！</dd>
        </dl>
        <tf-button size="large" class="btn1" @click.native="routePath(1)" bgcolor="#4feabe" color="#fff">完善个人资料</tf-button>
        <tf-button size="large" class="btn2" @click.native="routePath(2)" bgcolor="#fff" color="#808080">返回首页</tf-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import ajaxCommon from 'common/ajaxCommon'
  import Notice from 'components/notice'
  import { ActionSheet } from '../tf-ui/components/actionsheet'
  import gvars from "common/GlobalVars"
  export default {
    name: 'register',
    create(){

    },
    mounted(){
      this.setSelectArr();
    },
    data(){
      return {
        steps: 1,
        username:"",
        pw1:"",
        pw2:"",
        realName:"",
        sex:"",
        phone:"",
        qq:"",
        mail:"",
        referrer:"",
        code:"",
        codeImg:"",
        formData: {},
        selectShow:false,
        selectItems:[],
        gVars: gvars,
        showMailList:false,
        emailList: ['@qq.com','@163.com','@126.com','@sohu.com','@sina.com','@gmail.com','@hotmail.com','@yahoo.com','@live.com'],
        tempmail:''
      }
    },
    methods:{
      //获取验证码
      getCode(){
        ajaxCommon("GetVerifyCode",{},1,this).then(res=>{
          if(res){
            this.codeImg = "data:image/png;base64,"+res.row.imgdata;
          }
        },false)
      },

      //生成性别数据
      setSelectArr(){
        ["男","女"].map((item,index)=>{
          this.selectItems.push({
            label:item,
            method: () => {
              this.sex = index;
            }
          });
        })
      },

      //下一步表单提交
      nextStep(){
        if(this.nextStepFomrCheck()){
          ajaxCommon("MemberExist",{ACNT:this.username},1,this).then(res=>{
            if(res){
              this.steps = 2;
              this.getCode();
            }
          })
        }
      },

      //第一步 表单验证
      nextStepFomrCheck(){
       if(!this.numAndChatReg(3,10).test(this.username)){
          this.alertTip("用户名格式不正确！");
          return false
       }else if(!config.REG_PASSWORD.test(this.pw1)){
           this.alertTip("密码是6-12位英文和数字组合，且不包括【/\#%\" \'.?】这些字符！");
           return false;
       }else if(this.pw2=="" || this.pw1!=this.pw2){
         this.alertTip("两次密码不一致！");
         return false
       }
       return true;
      },

      //表单提交
      formSubmit(){
        if(this.secondFormCheck()){
          this.$loading.open();
          Api[ApiNames.MemberRegister](this.formData).then(res=>{
            debugger

            this.$loading.close();
            let data = res.data;
            if(data.Status === 1){
              this.gVars.ACNT = data.row.ACNT;
              this.gVars.hideACNT=data.row.HideACNT;

              this.steps = 3;
              this.gVars.GroupID = data.row.GroupID;
              this.setUser({userName:data.row.ACNT,isLogin:true,hideACNT:data.row.HideACNT})
              this.getBalance();
              localStorage.setItem("tengbo.notice.number",0);
            }else{
              this.sysErrCheck(data.Status).then(canrun=>{
                if(canrun){
                  this.alertTip(data.CNMessage);
                }
              })
            }
          }).catch(()=>{
            this.sysErrCheck(-9);
          });
        }
      },

      //第二次表单提交时验证
      secondFormCheck(){
        let data = {};
        if(!this.numAndChatReg(0,0,2).test(this.realName)){
          this.alertTip("请填写正确的真实姓名！");
          return false;
        }else if(this.realName.length<2){
          this.alertTip("请填写正确的真实姓名！");
          return false;
        }else if(this.sex.length<=0){
          this.alertTip("请选择性别！");
          return false;
        }else if((!this.numAndChatReg(0,0,3).test(this.phone))&&(!this.numAndChatReg(0,0,4).test(this.phone))){
          this.alertTip("电话号码或手机号格式不正确！");
          return false;
        }else if(!this.numAndChatReg(0,0,6).test(this.qq)){
          this.alertTip("QQ号格式不正确！");
          return false;
        }else if(!this.numAndChatReg(0,0,5).test(this.mail)){
          this.alertTip("邮箱格式不正确！")
          return false;
        }else if(this.code.length<=0){
          this.alertTip("请输入验证码！")
          return false;
        }
        data.id = this.username;
        data.pwd1 = this.pw1;
        data.pwd2 = this.pw2;
        data.name = this.realName;
        data.sex = (this.sex+1).toString();
        data.tel = this.phone;
        data.qq = this.qq;
        data.mail = this.mail;
        data.intro = this.referrer;
        data.vcode = this.code;
        this.formData = data;
        return true;
      },

      //用户名，密码验证正则表达式
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
        }else if(type==7){ //匹配 字母和数字组合，不包含特殊字符
          return new RegExp("/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{"+min+","+max+"}$/");
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

      routePath(type){
        type = type || 1;
        let path;
        if(type==1){
          path = "/memberCenter";
        }else if(type==2){
          path = "/";
        }else if(type==3){
          path = "/login";
        }
        this.$router.push(path);
      },

//      showMail(){
//        if(this.mail)
//          this.showMailList = true
//        else
//          this.showMailList = false
//      },

      chooseMail(item){
        let mail = this.mail;
        let pos = mail.indexOf('@')
        if(pos>-1){
          mail = mail.substr(0,pos)
        }
        this.mail = mail + item;
        this.tempmail = '';
        this.showMailList = false;
      },

      ...mapMutations(["setUser"]),
    },
    watch:{
      mail(newVal){
        if(newVal){
            this.tempmail =  newVal.replace(/@.*$/g,"");
        }else {
          this.tempmail = '';
        }
      },
      tempmail(newVal){
        if(newVal)
          this.showMailList = true;
        else
            this.showMailList = false;
      }
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:'注册',
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
      })
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit('setSiteConfig', {
        showBack: false,
        showNav: true
      });
      next();
    },
    components:{
      [Notice.name]:Notice,
      [ActionSheet.name]:ActionSheet
    }
  }
</script>

<style scoped lang="less">
.register{
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
  .notice{
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
  }
  .title{
    width:1.5rem;
    display: inline-block;
  }
  .btnSubmit{
    width:96%;
    height: .88rem;
    margin-left:2%;
  }
  .resetPass{
    color: #09f;
    background: #fff;
    border:1px solid #eaeaea;
    margin-top:0.25rem;
    box-shadow: 0 .03rem .2rem rgba(0,0,0,.05);
  }
  .toLogin{
    margin-top:.9rem;
    width:100%;
    text-align: center;
    color: #666;
    i{
      margin-left:0.1rem;
      color: #09f;
    }
  }
  .color-blue{
    color: #09f;
    font-size:.28rem;
  }

  .setting-ok{
    font-size:.3rem;
    padding-top:.6rem;
    dl{
      text-align: center;
      margin: 0 auto;
      dt{
        width:100%;
        margin-bottom:.16rem;
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
  .btn1,.btn2{
    width:90%;
    margin-left:5%;
    height: .88rem;
    border-radius: .88rem;
    margin-top:.8rem;
  }
  .btn1{
    box-shadow: 0 .02rem .25rem rgba(66,229,233,.25);
  }
  .btn2{
  margin-top:.3rem;
  background-image:-webkit-linear-gradient(to bottom, #fff, #f6f6f6);
  background-image:linear-gradient(to bottom,#fff,#f6f6f6);
  border:1px solid #e8e8e8;
  box-shadow: 0 4px 20px rgba(0,0,0,.06);
  }
  .mailList{
    position: absolute;
    left:1.5rem;
    top:3.3rem;
    background: #fff;
    padding: 0.1rem 0.3rem 0.1rem 0.3rem;
    z-index: 99999999;
    border:1px solid #eee;
    border-radius:0.2rem;
    li{
      color: #222;
      font-size:0.24rem;
      margin:0.14rem 0;
      width:100%;
    }
  }
}
</style>
