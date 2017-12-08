<template>
  <transition name="slide-right">
  <div class="bankList">
    <div class="panel" v-for="(item, index) in info">
      <div class="content">
        <div class="myIcon">
          <tf-symbol :name="getIconName(item.BankName)" size="0.65rem" color="#f01924"></tf-symbol>
        </div>
        <div class="info">
          <span class="bankName">{{item.BankName}}</span>
          <span class="addr">{{item.Loc1+'-'+item.Loc2+' '+item.Loc3}}</span>
          <span class="bankNO">{{item.CardID}}</span>
        </div>
        <div class="realName">{{item.TrueName}}</div>
      </div>
      <div class="opt">
        <div class="setDefault" @click="setDefaultBank(index,item.BankName,item.Index)" v-if="item.IsTive">
          <span class="myIcon2" v-bind:class="{selectIcon: item.IsDefault}">
            <tf-icon v-if="!item.IsDefault" name="yduidanxuankuang" size="0.40rem" color="#bbb"></tf-icon>
            <tf-icon v-if="item.IsDefault" name="gou1" size="0.34rem" color="#bbb"></tf-icon>
          </span>
          <span>设为默认</span>
        </div>
        <div class="right">
          <span class="revamp" @click="showSafePwd(2,item)">
            <tf-icon name="baobiao" size="0.34rem" color="#666"></tf-icon>
            <span>修改</span>
          </span>
          <span class="delete" v-if="info.length>1" @click="showSafePwd(3,item,index)">
            <tf-icon name="delete" size="0.34rem" color="#666"></tf-icon>
            <span>删除</span>
          </span>
        </div>
      </div>
      <div class="card-invalid" v-if="!item.IsTive">
        <h2>银行卡无效</h2>
        <p>该卡经核实信息有误无法汇款<a href="javascript:;">请修改卡信息</a></p>
      </div>
    </div>
    <div class="btn_add" @click="showSafePwd(1)" v-if="isCheckSafePwd && (!info.length || info.length<3)">
      <span class="con">
        <tf-icon name="tianjia" size="0.38rem" color="#bbb"></tf-icon>
        <b>添加银行卡</b>
      </span>
    </div>
    <tf-popup v-model="safePwdShow" :useLock="false" v-show="safePwdShow" :autoClose="false" position="center" width="80%" style="text-align:center;">
      <div class="transfer-wrap">
        <div class="transfer-title">
          <span>请输入安全密码</span>
        </div>
        <div class="transfer-input">
          <tf-input :required="true" type="password" style="font-size:.26rem;" class="right" v-model="safePwd" max="12" :showSuccessIcon="false" :showRequiredIcon="false" placeholder="请输入安全密码"></tf-input>
        </div>
        <div class="transfer-button-wrap">
          <tf-button class="transfer-button" size="large" @click.native="submitSafePwd()">确定</tf-button>
        </div>
        <span @click="safePwdShow=false" class="transfer-close">
            <tf-icon color="#bbb" size=".32rem" name="cha"></tf-icon>
        </span>
      </div>
    </tf-popup>
  </div>
  </transition>
</template>

<script>
  import { mapMutations ,mapGetters} from 'vuex'
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import Notice from 'components/notice'
  import SymbolIcon from "components/custom-icon/icon-symbol"
  import { bankName2Icon } from 'common/banklist'
  import ajaxCommon from 'common/ajaxCommon'
  import gvars from "common/GlobalVars"
  export default{
    name: 'bankInfo',
    data(){
      return {
        info:{},
        noticeContent:"",
        noticeTitle:"",
        setDefaultList:[],
        isCheckSafePwd: false,
        safePwdShow :false ,//显示输入安全密码弹框开关
        safePwd:"",
        optType:0,  //1增加,2修改,3删除
        curBankInfo: {}, //当前操作的银行卡信息
        curIndex: -1 //当前选择银行卡在数组中的索引
      }
    },
    created(){
      this.noticeTitle = '温馨提示：';
      this.noticeContent = '手机验证后，可自行修改银行相关信息（开户姓名无法修改;绑定的银行卡必须和注册绑定姓名一致，否则无法提款!）';
      this.checkData = this.memberData();
    },
    mounted(){
      this.getBankInfo();
    },
    methods:{
      //获取银行卡信息
      getBankInfo(){
        Api[ApiNames.GetMemberBankCommand]().then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status == config.ERR_OK) {
            if(data.row && data.row.length>0){
              this.info = data.row;
            }
          } else {
            this.sysErrCheck(data.Status).then(canrun=>{
                if(canrun)
                   this.alertTip(data.CNMessage);
            });
          }
        }).catch(()=> {
          this.sysErrCheck(-9);
        });
      },

      //路由跳转
      routePath(path){
        if(path=="/revampBankInfo"){ //修改银行资料
          let verifyStr = this.checkData.verifyStr;
          if(verifyStr!=""){
            if(!this.checkSafePwd(verifyStr)){
              this.confirmChecKPhone();
              return;
            }else{
              this.$store.commit('setTrueName',this.info[0].TrueName);
              this.$router.push(path);
            }
          }else {
            ajaxCommon("SleVerification",{},1,this).then(res=>{
              if(res){
                if(!this.checkSafePwd(res.row)){
                  this.confirmChecKPhone();
                  return;
                }else{
                  this.$store.commit('setTrueName',this.info[0].TrueName);
                  this.$router.push(path);
                }
              }
            })
          }
        }else{
          this.$router.push(path);
        }
      },

      //未设置安全密码
      confirmChecKPhone(){
        this.$confirm({
          title: '温馨提示',
          icon: "warn",
          mes: '您未设置安全密码，请先设置安全密码操作！',
          opts: [{
            txt: '返回',
            color: false,
            callback: () => {
              this.$router.back();
            }
          }, {
            txt: '设置安全密码',
            color: true,
            callback: () => {
              this.$router.push("/safetyCenter/safePassCheck");
            }
          }]
        });
      },

      //是否设置安全密码
      checkSafePwd(verifyStr){
        let flag = false;
        if(verifyStr!=""){
          let arrayData = JSON.parse(verifyStr);
          for(let i=0;i<arrayData.length;i++){
            if(arrayData[i].SecType==1){
              flag = true;
            }
          }
        }
        return flag
      },

      //显示输入安全密码
      showSafePwd(type,info,index){
        type = type || 0;
        info = info || {};
        index = index==undefined?-1 : index;
        if(type===1 && !this.info.length){
          this.$store.commit("setRouteCheckCode","tengbo6888");
          this.routePath("/bindBank");
          return;
        }
        this.safePwdShow = true;
        this.optType = type;
        if(type==2||type==3)
          this.curBankInfo = info;
          this.curIndex = index;
      },

      //提交安全密码
      submitSafePwd(){
        if(this.safePwd.length<=0){
          this.alertTip("请输入安全密码！");
          return;
        }
        let data = {
          ACNT: gvars.ACNT,
          SecPwd: this.safePwd
        };
        ajaxCommon("VerifySecPwdCommand",data,1,this).then(res=>{
          if(res){
            if(this.optType===1){ //添加银行卡
              this.$store.commit("setRouteCheckCode","tengbo6888_"+this.safePwd); //传一个验证码过去，到时候可以验证是否从这里跳转过去。
              this.routePath('/bindBank');
            }else if(this.optType===2){ //修改银行卡
              this.curBankInfo.SecPwd = this.safePwd;
              this.$store.commit("setCurBankInfo", this.curBankInfo);
              this.routePath('/revampBankInfo');
            }else if(this.optType === 3){ //删除银行卡
              this.safePwdShow = false;
              this.deleteBank(this.curIndex,this.curBankInfo);
            }
          }
        })
      },

      //设置默认
      setDefaultBank(index,BankName,BankNameIndex){
        if(this.info[index].IsDefault){
          return ;
        }
        let data = {
          BankName: BankName,
          Index: BankNameIndex
        };
        ajaxCommon("SetBankDefault",data,1,this).then(res=>{
          if(res){
            this.info.map((v,i)=>{
              if(index==i){
                v.IsDefault = true
              }else{
                v.IsDefault = false
              }
            })
          }
        })
      },

      //删除银行卡
      deleteBank(index,info){
        let data = {
          BankName: this.curBankInfo.BankName,
          Index:info.Index,
          SecPwd: this.safePwd
        };
        ajaxCommon("MemberBankCardDelete",data,1,this).then(res=>{
          if(res){
            this.info.splice(index,1);
            this.curIndex = -1;
            this.curBankInfo = {};
            this.safePwd = "";
          }
        });
      },

      getIconName(name){
        name = name=="银行"?"中国银行":name;
        return bankName2Icon[name];
      },
      //弹出框
      alertTip(msg){
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: 'error'
        });
      },
      ...mapMutations([
        "TrueName",
        "setRouteCheckCode",
        "setCurBankInfo"
      ]),
      ...mapGetters({
        memberData: 'getMemberData'
      })
    },
    watch:{
      info(val){
        if(val && val.length>0){
          val.map((v,i)=>{
            this.setDefaultList.push(v.IsDefault);
          })
        }
      }
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"银行卡管理",
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
        Api[ApiNames.SleVerification]().then(res=>{
          let data = res.data;
          if(data.Status===963){
            vm.confirmChecKPhone();
          }else if(data.Status===1){
            if(!vm.checkSafePwd(data.row)){
              vm.confirmChecKPhone();
            }else{
              vm.isCheckSafePwd = true;
            }
          }
        })
      })
    },
    components:{
      Notice,
      [SymbolIcon.name]:SymbolIcon
    }
  }
</script>

<style scoped lang="less">
.bankList{
  &.slide-right-enter,&.slide-right-leave-to{
    transform: translate3d(-100%,0, 0);
  }
  &.slide-right-enter-active, &.slide-right-leave-active {
    transition: all 0.2s ease;
  }
  padding:0.2rem;
  .panel{
    width:100%;
    min-height:2.4rem;
    overflow: hidden;
    text-align: left;
    color: #aaa;
    background: #fff;
    border-top:1px solid #f0f0f0;
    border-left:1px solid #f0f0f0;
    border-bottom:1px solid #eaeaea;
    border-right:1px solid #eaeaea;
    box-shadow: 1px 3px 10px rgba(0,0,0,.05);
    border-radius:0.15rem;
    margin-bottom:0.2rem;
    position: relative;
    .content{
      width:100%;
      min-height:1.8rem;
      border-bottom:1px solid #f2f2f2;
      box-shadow: 0px 2px 6px rgba(0,0,0,.03);
      padding:0.34rem 0.24rem 0.24rem 0.24rem;
      overflow: hidden;
      .myIcon{
        float: left;
        width:0.9rem;
        height:100%;
        text-align: left;
      }
      .info{
        float: left;
        span{
          display: block;
          line-height:1.8;
          white-space: nowrap;
          &.addr{
            width:5rem;
            color: #bbb;
            font-size: .24rem;
            white-space: normal;
            overflow: hidden;
          }
          &.bankName{
            line-height: .36rem;
            font-size:0.26rem;
            color: #222;
          }
          &.bankNO{
            color: #666;
            padding-top: .06rem;
            font-size: .28rem;
          }
        }
      }
      .realName{
        float: right;
      }
    }
    .opt{
      padding:0 0.2rem;
      height:.8rem;
      font-size: .24rem;
      overflow: hidden;
      .setDefault{
        float: left;
        margin-top: .1rem;
        .myIcon2{
          float: left;
        }
        .selectIcon{
          float: left;
          width: 0.36rem;
          height:0.36rem;
          overflow: hidden;
          text-align: center;
          background: #e02419;
          border-radius:50%;
          margin-top:0.11rem;
          margin-right:0.05rem;
          i{
            margin-left: .08rem;
            line-height:0.4rem;
            font-size:0.2rem!important;
            color: #fff!important;
          }
        }
        i{
          float: left;
          line-height:0.6rem;
        }
        span{
          display: inline-block;
          line-height:0.6rem;
          margin-left:0.05rem;
        }
      }
      .right{
        float: right;
        margin-top: .1rem;
        .revamp{

        }
        .delete{
          margin-left: .6rem;
        }
        i{
          float: left;
          line-height:0.6rem;
        }
        span{
          float: left;
          line-height:0.6rem;
          margin-left:0.05rem;
        }
      }
    }
    .card-invalid{
      background:#f8f8f8;
      opacity:0.9;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:70%;
      text-align:center;
      z-index:5;
      h2{
        color:#f01924;
        font-size: 14px;
        margin:0.3rem auto 0 auto;
      }
      p{
        color:#666;
        font-size:.24rem;
        margin:0.1rem auto;
        a{
          color:#666;
          display: block;
          margin-top:0.1rem;
        }
      }
    }
  }
  .btn_add{
    width:100%;
    height:1rem;
    line-height: 1rem;
    border:1px dotted #e1e1e1;
    box-shadow: 0px 2px 10px rgba(0,0,0,.04);
    border-radius: 0.1rem;
    background: #fff;
    margin:0 auto;
    overflow: hidden;
    text-align: center;
/*    i{
      float: left;
      margin-left: 2rem;
      width:0.36rem;
      height:0.36rem;
      line-height: .34rem;
      text-align: center;
      border:1px solid  #e6e6e6;
      border-radius:100%;
      color: #ccc;
      font-size:0.36rem;
      position: relative;
    }*/
    b{
      display: inline-block;
      color: #aaa;
      font-size: .26rem;
      font-weight:500;
      position: relative;
      top: -2px;
    }
  }
  .transfer-wrap {
    position: relative;
    .pading() {
      padding-left: .2rem;
      padding-right: .2rem;
    }
    .transfer-title {
      .pading();
      font-size: .26rem;
      padding-left: .3rem;
      color: #666;
      height: .88rem;
      line-height: .88rem;
      text-align: left;
      background-color: #fff;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      width: 100%;
      position: relative;
    }

    .transfer-input {
      .pading();
      height: .88rem;
      width: 90%;
      margin-left: 5%;
      overflow: hidden;
      border:1px solid #e6e6e6;
      border-radius: 6px;
      box-shadow: 1px 2px 8px rgba(0,0,0,.1);
      position: relative;
      z-index: 3;
    }
    .transfer-button-wrap {
      .pading();
      box-sizing: border-box;
      background-color: #fff;
      padding-top: .3rem;
      padding-bottom: .3rem;
      width: 100%;
      position: relative;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    .transfer-button {
      // display: inline-block;
      width: 96%;
      margin-left: 2%;
      height: .8rem;
      margin-top: 0!important; // margin-bottom: .2rem;
      box-shadow: 0px 2px 8px rgba(220,0,0,.3);
    }
    .transfer-close {
      position: absolute;
      display: inline-block;
      top: .24rem;
      right: .3rem;
    }
  }
}
</style>
