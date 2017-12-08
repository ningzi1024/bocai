<template>
  <transition name="slide-left">
    <div class="userInfo">
    <div class="nav">
      <span :class="{ active: navIndex==0 }" @click="changeNav(0)">个人资料</span>
      <span :class="{ active: navIndex==1 }" @click="changeNav(1)">游戏账号</span>
    </div>
    <div class="baseInfo" v-show=" navIndex==0 ">
      <tf-cell-group style="margin-top:.2rem">
        <tf-cell-item>
          <span slot="left" class="title">首存时间</span>
          <span slot="left">{{ tidyTime(userInfo.FDTime) || "" }}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">首存金额</span>
          <span slot="left">{{ userInfo.FDAmount?userInfo.FDAmount+' 元' : "" }}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">性 别</span>
          <span slot="left">{{ sexName }}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">联系地址</span>
          <span slot="left">{{ userInfo.Addr||"" }}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">联系电话</span>
          <span slot="left">{{ userInfo.Tel }}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">邮箱地址</span>
          <span slot="left">{{ userInfo.Mail }}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">联系 QQ</span>
          <span slot="left">{{ userInfo.QQ }}</span>
        </tf-cell-item>
      </tf-cell-group>

      <tf-cell-group style="margin-top:.2rem">
        <tf-cell-item>
          <span slot="left" class="title">推荐我的人</span>
          <span slot="left">{{ userInfo.Introducer || "--无--" }}</span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="title">我推荐的人</span>
          <span slot="left">{{ userInfo.Recommend || "--无--" }}</span>
        </tf-cell-item>
      </tf-cell-group>
    </div>
    <div class="gameInfo userInFo-GameID" v-show=" navIndex==1 ">
      <tf-cell-group>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #6147d7;"><tf-icon name="PT" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">PT厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[15]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #00bc65;"><tf-icon name="MG" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">MG国际厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[17]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #9a09ff;"><tf-icon name="DT" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">DT厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[21]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #ff3b2a;"><tf-icon name="BBIN" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">波音厅</span>
          <span slot="right" class="game-account">账号&nbsp;<i>{{ gameInfo[9]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #ff9a00;"><tf-icon name="AG" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">AG国际厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[12]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #f90;"><tf-icon name="AG" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">AG旗舰厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[12]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #fe2648;"><tf-icon name="TTG" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">TTG厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[18]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #ffdd00;"><tf-icon name="SWG" size="0.55rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">SW厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[22]||"无" }}</i></span>
        </tf-cell-item>
        <tf-cell-item>
          <span slot="left" class="game-icon" style="background: #4056ff;"><tf-icon name="GG" size="0.6rem" color="#fff"></tf-icon></span>
          <span slot="left" class="game-title">GG厅</span>
          <span slot="right" class="game-account">账号：<i>{{ gameInfo[20]||"无" }}</i></span>
        </tf-cell-item>
      </tf-cell-group>
    </div>
  </div>
  </transition>
</template>

<script>
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  import { createDate } from '../../common/date'
  export default{
    name:'userInfo',
    data(){
      return {
        navIndex:0, //导航栏选中索引
        userInfo:{}, //基本信息
        gameInfo:{}, //游戏账号
        sexName:""
      }
    },
    mounted(){
      setTimeout(()=>{
        this.getUserInfoData();
      },20)
    },
    methods:{

      //请求页面数据
      getUserInfoData(){
        this.$loading.open();
        Api[ApiNames.GetMemberBaseInfoCommand]().then(res=>{
          this.$loading.close();
          if(res.data.Status === config.ERR_OK){
            this.userInfo = res.data.row;
            this.gameInfo = res.data.row.GameACNTRowsWeb;
            this.sexName = res.data.row.Sex=="Male"?"男":"女";
          }else{
            this.sysErrCheck(res.data.Status);
          }
        }).catch(err=>{
            console.log(err);
        })
      },

      //切换导航栏
      changeNav(index){
        index = index || 0;
        this.navIndex = index;
      },

      tidyTime(date){
        if(!date)
            return '';
        else
          return createDate(date, 'YYYY-MM-DD HH:mm');
      }
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"基本信息",
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
  @color-red:#ff3a2b;
  .userInfo{
    font-size:0.24rem;
    color: #666;
    &.slide-left-enter, &.slide-left-leave-to{
      transform: translate3d(100%,0, 0);
    }
    &.slide-left-enter-active, &.slide-left-leave-active{
      transition: all 0.3s ease;
    }
    .nav{
      font-size:0.26rem;
      height:0.88rem;
      line-height:0.88rem;
      background: #fff;
      box-shadow: 0 .02rem .15rem rgba(0,0,0,.08);
      span{
        display: inline-block;
        height: 0.88rem;
        width:40%;
        margin: 0 5%;
        text-align: center;
        &:first-child{
          float: left;
        }
        &:last-child{
          float: right;
        }
        &.active{
          color: @color-red;
          border-bottom: 4px solid @color-red;
        }
      }
    }


    .baseInfo{
      span.title{
        width:1.8rem;
        display: inline-block;
        color: #aaa;
      }
    }
    .gameInfo{
      margin-top: .18rem;
      background:none;
      margin-bottom:-0.3rem;
      .cell-item{
        display:block;
        float: left;
        background: #fff;
        width: 47%;
        margin:0rem 0% .16rem 2%;
        height: 1.28rem;
        padding-left: 0;
        border-radius: 6px;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
        border-bottom: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
        box-shadow:2px 2px 8px rgba(0, 0, 0, 0.05);
        &:after{
          border-bottom:none;
        }
        .cell-left{
          display: block;
          white-space: none;
          .game-icon{
            display: none;
            width:.8rem;
            height:.8rem;
            margin:0 .3rem 0 0;
            overflow: hidden;
            border-radius:32%;
            box-shadow: 0 2px 8px rgba(0,0,0,.15);
            text-align: center;
            opacity: .75;
            i{
              line-height:.84rem;
            }
          }
          .game-title{
            margin: .25rem 0 0 .1rem;
            display: block;
            font-size: .24rem;
            width: 100%;
            color: #222;
          }
        }
        .cell-right{
          .game-account{
            text-align: left;
            display: block;
            width: 100%;
            font-size:.22rem;
            color: #bbb;
            i{
              color: #699deb;
              font-size:.26rem;
            }
          }
        }


      }

    }
  }
</style>
