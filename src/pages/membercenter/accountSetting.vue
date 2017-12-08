<template>
  <transition name="slide-left">
  <div class="account">
    <tf-cell-group>
      <div class="TitleText">
        <span>短信设置</span>
      </div>
      <tf-cell-item class="acc-set-higt">
        <span slot="left" class="myIcon">
          <tf-icon name="youxiang" color="#fff" size=".36rem"></tf-icon>
        </span>
        <div slot="left" class="content">
          <span class="title">系统短信</span>
          <span class="desc">为您实时提醒平台重要通知信息</span>
        </div>
        <tf-switch slot="right" v-model="sysMsg" :disabled="false" @input="updateAccountSetting('sysMsg')"></tf-switch>
      </tf-cell-item>
      <tf-cell-item class="acc-set-higt">
        <span slot="left" class="myIcon actMsg">
          <tf-icon name="youhui" color="#fff" size=".4rem"></tf-icon>
        </span>
        <div slot="left" class="content">
          <span class="title">优惠短信</span>
          <span class="desc">第一时间获知活动内容，不错过任何精彩</span>
        </div>
        <tf-switch slot="right" v-model="actMsg" @input="updateAccountSetting('act')"></tf-switch>
      </tf-cell-item>
      <tf-cell-item class="acc-set-higt">
        <span slot="left" class="myIcon wishMsg">
          <tf-icon name="zhufuduanxin" color="#fff" size=".4rem"></tf-icon>
        </span>
        <div slot="left" class="content">
          <span class="title">祝福短信</span>
          <span class="desc">腾博会感恩您一直以来的陪伴与支持</span>
        </div>
        <tf-switch slot="right" v-model="wishMsg" @input="updateAccountSetting('wish')"></tf-switch>
      </tf-cell-item>
    </tf-cell-group>
    <tf-cell-group style="margin:.2rem 0 0 0;">
      <div class="TitleText lock">
        <span>账号解锁</span>
      </div>
      <tf-cell-item class="lockItem">
        <span slot="left" class="lockIcon">
          <tf-icon name="PT" color="#fff" size=".5rem"></tf-icon>
        </span>
        <div slot="left" class="content lockcon">
          <span class="title">PT厅</span>
          <span class="desc">因密码输入错误三次被锁定账号，可在此处解锁</span>
        </div>
      </tf-cell-item>
    </tf-cell-group>
    <ul class="operate">
      <li @click="playGameSet('PT','r')">解锁</li>
      <li @click="playGameSet('PT','l')">登出</li>
    </ul>
    <tf-cell-group class="mg-cell-group">
      <tf-cell-item class="lockItem">
        <span slot="left" class="lockIcon mgIcon">
          <tf-icon name="MG" color="#fff" size=".5rem"></tf-icon>
        </span>
        <div slot="left" class="content lockcon">
          <span class="title">MG国际厅</span>
          <span class="desc">游戏中因操作不当被锁定账号，可在此处解锁</span>
        </div>
      </tf-cell-item>
    </tf-cell-group>
    <ul class="operate mgOperate">
      <li style="width:94%; border-right: 0;" @click="playGameSet('MG_IN','r')">解锁</li>
    </ul>
  </div>
  </transition>
</template>

<script>
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import { Switch } from '../../tf-ui/components/switch';
  export default {
    name:'accountSetting',
    data(){
      return {
        sysMsg:true,
        actMsg:false,
        wishMsg:false,
        msgReady:false
      }
    },
    mounted(){
      setTimeout(()=>{
        this.init();
      },20)
    },
    methods:{
      //初始化数据
      init(){
        this.$loading.open();
        Api[ApiNames.selectShortM]().then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === config.ERR_OK){
            let row = data.row;
            this.sysMsg = row[0].SM_index===0?false:true;
            this.actMsg = row[1].SM_index===0?false:true;
            this.wishMsg = row[2].SM_index===0?false:true;
            setTimeout(()=>{
              this.msgReady = true;
            },5)
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

      //更新短信操作
      updateAccountSetting(name){
        name = name || "";
        if(!this.msgReady) return;
        if(name==="sysMsg"){
          this.alertTip("系统短信不能取消订阅");
          setTimeout(()=>{
            this.sysMsg = true;
          },20)
          return;
        }
        this.$loading.open();
        let Sys = this.sysMsg?"1":"0";
        let Promo = this.actMsg?"1":"0";
        let Blessing = this.wishMsg?"1":"0";
        let data ={};
        data.Sys = Sys;
        data.Promo = Promo;
        data.Blessing = Blessing;
        Api[ApiNames.updateShortM](data).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status===config.ERR_OK){
            let msg = name=='act'?'优惠':'祝福'
            this.alertTip('您的'+msg+'短信接收设置成功','success');
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

      //游戏设置
      playGameSet(gameId,action){
        this.$loading.open();
        let data = {
          GameID:gameId,
          Action:action
        };
        Api[ApiNames.PlayGameSet](data).then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status===config.ERR_OK){
            this.$loading.close();
            let gameName = gameId=="MG_IN"?"MG国际":gameId;
            let msg = action=="r"?gameName+"账户解锁成功":gameName+'账户登出成功';
            this.alertTip(msg,'success')
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
        type = type||'error';
        this.$toast({
          mes: msg,
          timeout: 1500,
          icon: type
        });
      }
    },
    components:{
      [Switch.name]:Switch
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:'账户设置',
          showMenu:false,
          showBack:true,
          showNav:false,
          showChat:false
        });
      })
    }
  }
</script>

<style scoped lang="less">
.account{
  font-size:.26rem;
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
  .TitleText{
    width: 100%;
    border-bottom:1px solid #f2f2f2;
    padding:0.3rem 0 .3rem 0;
    overflow: hidden;
    span{
      display: inline-block;
      border-left:4px solid #09f;
      padding-left:.28rem;
      color: #333;
      font-size:0.26rem;
    }
  }
  .acc-set-higt{
    height: 1.42rem;
  }
  .lock{
    span{
      border-left:4px solid #f01924;
    }
  }
  .myIcon{
    width:.8rem;
    height:.8rem;
    border-radius:32%;
    background: #f01924;
    box-shadow: 0 2px 8px rgba(0,0,0,.12);
    text-align: center;
    margin-right:.25rem;
    i{
      line-height: .8rem;
    }
  }
  .actMsg{
     background: #199eff;
  }
  .wishMsg{
    background: #fd9b53;
  }
  .content{
    font-size:0.28rem;
    width: 4.6rem;
    overflow: hidden;
    span{
      display: block;
      &.title{
        font-size:.26rem;
        color: #333;
      }
      &.desc{
        font-size:.24rem;
        color: #ccc;
      }
    }
  }
  .lockcon{
    width:auto;
  }
  .lockIcon{
    width:.8rem;
    height:.8rem;
    border-radius: 32%;
    background: #6147d5;
    margin-right:.25rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,.12);
    i{
      line-height:.8rem;
    }
  }
  .lockItem{
    padding:0.16rem .2rem;
    overflow: hidden;
  }
  .mgIcon{
    background: #00bb67;
  }
  .operate{
    width:100%;
    height:.98rem;
    background: #fff;
    padding-top: .12rem;
    position: relative;
    z-index: 6;
    border-top: 1px solid #f2f2f2;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,.06);
    li{
      float: left;
      width:45.5%;
      margin:0 0 0 3%;
      text-align: center;
      color: #699deb;
      border:1px solid #a3c2f0;
      border-radius: .15rem;
      height:.72rem;
      line-height:.72rem;
      box-shadow: 0 .02rem .1rem rgba(105,157,235,.25);
      &:last-child{
        border-right:0;
        border:none;
        background: #699deb;
        color: #fff;
        border:1px solid #699deb;
      }
    }
  }
  .mg-cell-group{
    margin-bottom: 0;
    margin-top: .2rem;
  }
}
</style>
