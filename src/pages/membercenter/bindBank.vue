<template>
  <transition name="slide-left">
  <div class="bindInfo">
    <div class="Cont-Spacing-02">
      <tf-cell-group>
        <tf-cell-item arrow @click.native="chooseBank()">
          <span slot="left" class="title">收款银行</span>
          <span slot="left" class="chooseSort">{{ bankName||bankShow }}</span>
        </tf-cell-item>
        <tf-cell-item arrow @click.native="chooseCity()">
          <span slot="left" class="title">开户城市</span>
          <span slot="left" class="chooseSort">{{ bankCity?bankCity.itemName1 +' '+bankCity.itemName2 : cityShow}}</span>
        </tf-cell-item>
      </tf-cell-group>
    </div>
    <div class="Cont-Spacing-02">
      <tf-cell-group>
        <tf-cell-item>
          <span slot="left" class="title">开户姓名</span>
          <span slot="left">{{username}}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">银行账号</span>
          <tf-input :required="true" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" :max="20" placeholder="请输入您的银行卡号" v-model="bankNum1"></tf-input>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">确认账号</span>
          <tf-input :required="true" slot="right" type="number" :showSuccessIcon="false" :showRequiredIcon="false" :max="20" placeholder="请再输一遍银行卡号" v-model="bankNum2"></tf-input>
        </tf-cell-item>
      </tf-cell-group>
    </div>
    <tf-selector-bank :items="selector.bank.list" :selectedItem="bankName" @selected="selector.bank.selected" v-model="selector.bank.show"></tf-selector-bank>
    <tf-cityselect :items="selector.city.list" :ready="selector.city.show" :done="selector.city.selected" v-model="selector.city.show"></tf-cityselect>
    <tf-button size="large" @click.native="bankInfoSubmit()" class="btnSubmit btn-boxshadow" type="primary">确认</tf-button>
  </div>
  </transition>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import banklist from "common/banklist"
  import cityList from "common/cityList"
  import selectorBank from "./pay.channel/selector.banks"

  export default{
    name: 'bankInfo',
    created(){
      this.selector.bank.list = this.filterArr();
      this.selector.city.list = cityList;
    },
    data(){
      return {
        bankName:'',
        bankShow:'请选择绑定银行',
        bankCity:'',
        cityShow:'请选择您开户所在的区域',
        username: '',
        bankNum1: "",
        bankNum2: "",
        formData:{},
        selector:{
          bank: {
            show: false,
            list: [],
            selected: (item) => {
              this.bankName = item.value;
              this.bankShow = item.text;
            }
          },
          city:{
            list: [],
            show:false,
            selected: (item) => {
              this.bankCity = item;
            }
          }
        }
      }
    },
    mounted(){
        if(!this.memberInfo().routeCheckCode){
        this.$router.push('/memberCenter');
        return;
      }
      this.getBankInfo();
    },
    methods:{
      getBankInfo(){
        Api[ApiNames.GetMemberBankCommand]().then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status == config.ERR_OK) {
            if(data.row && data.row.length>0){
              this.username = data.row[0].TrueName;
            }else {
              this.username = data.row.TrueName;
            }

          } else {
            this.sysErrCheck(data.Status);
          }
        }).catch(err => {
          this.sysErrCheck(-9);
        });
      },

      //帅选数组
      filterArr(){
        let arr = banklist.filter(function(obj){
            return obj.value != "其它银行";
        });
        return arr;
      },

      //选择银行
      chooseBank(){
        this.selector.bank.show = true;
      },

      //选择城市
      chooseCity(){
        this.selector.city.show = true;
      },

      //提交数据
      bankInfoSubmit(){
        if(this.formCheck()){
          this.$loading.open();
          Api[ApiNames.UpdateMemberBankCommand](this.formData).then(res=>{
             this.$loading.close();
            if(res.data.Status == config.ERR_OK){
//              this.$store.commit('setSettingOkTitle','设置成功');
//              this.$store.commit('setSettingOkMsg','您的银行资料已经设置成功！');
//              this.$router.push('/settingOk');
              // this.$alert({
              //   mes:"银行卡添加成功！",
              //   callback:function(){
              //     this.$router.push('/bankInfo');
              //   }.bind(this)
              // });
              this.confirm({
                title: "操作成功！",
                mes: "银行卡添加成功！",
                icon: "wancheng",
                opts: [
                  {
                    txt: "确定",
                    color: true,
                    callback: () => {
                      this.$router.back();
                    }
                  }
                ]
              });
              this.firstTimeAddBank()
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
        }
      },

      //表单验证
      formCheck(){
        let data = {};
        if(!this.bankName){
          this.alertTip("请选择收款银行!");
          return false;
        }else if(this.bankCity==null){
          this.alertTip("请选择开户城市!");
          return false;
        }else if(!this.bankNum1){
          this.alertTip("请输入银行账号!");
          return false;
        }else if(this.bankNum1.length<16 || this.bankNum1.length>19){
          this.alertTip("请输入正确的银行账号!");
          return false;
        }else if(!this.bankNum2){
          this.alertTip("请输入确认账号!");
          return false;
        }else if(this.bankNum2.length<16 || this.bankNum2.length>19){
          this.alertTip("请输入正确的确认银行账号!");
          return false;
        }else if(this.bankNum1 != this.bankNum2){
          this.alertTip("两次输入的账号不一致!");
          return false;
        }
        let arr = this.memberInfo().routeCheckCode.split('_');
        data.BankName = this.bankName;
        data.Loc1 = this.bankCity.itemName1;
        data.Loc2 = this.bankCity.itemName2;
        data.AccountName = this.username;
        data.CardID = this.bankNum1;
        data.CardID2 = this.bankNum2;
        data.SecPwd = arr[1] || "";
        this.formData = data;
        return true;
      },

      //第一次绑定银行卡
      firstTimeAddBank(){
        let verifyStr = this.memberInfo().verifyStr;
        if(!verifyStr) return;
        let data = JSON.parse(verifyStr);
        let flag = true;
        data.map((v)=>{
          if(v.SecType == 5){
              flag = false;
          }
        })
        if(flag){
          data.push({"SecType":5});
          this.$store.commit('setVerifyStr',JSON.stringify(data));
        }
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
        "setSettingOkTitle",
        "setSettingOkMsg",
        "setRouteCheckCode",
        "setVerifyStr"
      ]),
      ...mapGetters({
        memberInfo: "getMemberData"
      })
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"绑定银行卡",
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
      })
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit("setRouteCheckCode","");
      next();
    },
    components:{
      [selectorBank.name]: selectorBank
    }
  }
</script>

<style scoped lang="less">
.bindInfo{
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
  .title{
    display: inline-block;
    width:2rem;
  }
  .chooseSort{
    font-size:0.26rem;
    color:#09f;
  }
  .btnSubmit{
    width:96%;
    height: .88rem;
    margin-left:2%;
  }
}
.confirm-ft > a.confirm-btn.primary{
  background: #1d8e22!important;
}
</style>
