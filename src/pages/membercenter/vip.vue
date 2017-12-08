<template>
  <transition name="slide-right">
  <div class="vip">
    <div class="banner">
      <dl>
        <dt></dt>
        <dd>{{ username }} ,欢迎您！</dd>
        <dd><span class="level">{{groupVipName[vipIndex1]}}</span></dd>
      </dl>
      <span class="vipDetail" @click="routePath('/vipPlan')">
        <tf-icon name="VIP" class="vipIcon" size="0.45rem" color="#a39877"></tf-icon>
        <span>VIP成长特权</span>
      </span>
    </div>
    <div class="content">
      <div class="totalBet">
        <span class="desc">您本周已累积投注</span>
        <span class="money">
          <tf-countup :endnum="hasBet" duration="3" decimals="2" separator="," :duration="duration"></tf-countup> 元
        </span>
      </div>
      <div class="level">
        <div class="level-left">{{groupVipName[vipIndex1]}}</div>
        <div class="level-process">
          <span class="num">成长进度：<i>{{slever*100}}%</i></span>
          <span class="line">
            <tf-progressbar type="line" :progress="slever" trailWidth="2" trailColor="#f01924"></tf-progressbar>
          </span>
          <span class="desc" v-if="descIndex==1">首存任意金额自动升级为<i>普通VIP</i>！</span>
          <span class="desc" v-if="descIndex==2">再投注 <i>{{ needBet }}</i> 元即可提升VIP等级</span>
          <span class="desc" v-if="descIndex==3">您已达到晋升条件，请等待下周一晋级！</span>
          <span class="desc" v-if="descIndex==4">您当前已经成长为最高!</span>
          <span class="desc" v-if="descIndex==5">加载失败，请稍后重试!</span>
        </div>
        <div class="level-right">{{groupVipName[vipIndex2]}}</div>
      </div>
      <div class="notice boxshadow">
        <tf-icon class="timeIcon" name="shijian" color="#ff3a2c" size="0.36rem"></tf-icon>
        <span><i>提示：</i>系统将在 <em v-if="dayWeek<7"><b>{{7-dayWeek}}</b> 天后</em> <em v-if="dayWeek==7"><b>明天</b></em>，自动清除本周投注并重新累积</span>
      </div>
      <div class="award boxshadow">
        <div class="title">
          <span>专享福利</span>
        </div>
        <div class="con">
          <div v-if="groupId!=1">
            <dl>
              <dt>
                <tf-icon name="zijin" color="#fff" size="0.5rem"></tf-icon>
              </dt>
              <dd><span>洗码比例</span></dd>
              <dd><i>{{ximabet[vipIndex1]}}</i></dd>
            </dl>
            <dl>
              <dt>
                <tf-icon name="zijin" color="#fff" size="0.5rem"></tf-icon>
              </dt>
              <dd><span>VIP周年礼金</span></dd>
              <dd><i>{{yearMark[vipIndex1]}}元</i></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import ajaxCommon from 'common/ajaxCommon'
  import { CountUp } from '../../tf-ui/components/countup'
  import gvars from "common/GlobalVars"
  export default {
    name:'vip',
    components:{
      [CountUp.name]:CountUp
    },
    data(){
      return {
        username: gvars.ACNT,
        hasBet:0,
        needBet:0,
        slever:0,
        duration:1.5,
        dayWeek:1,
        descIndex:1,
        groupId:1,
        vipIndex1:0,
        vipIndex2:1
      }
    },
    created(){
      this.groupVipName = ["普通会员", "普通VIP", "白银VIP", "黄金VIP", "钻石VIP", "至尊VIP", "青铜VIP"];
      this.groupId = gvars.GroupID;
      this.ximabet = ['','0.80%','0.90%','1.00%','1.10%','1.20%','0.85%'];
      this.yearMark = ['','58.00','188.00','288.00','888.00','1288.00','88.00'];
    },
    mounted(){
      this.getVipData();
    },
    methods:{
      //获取用户VIP数据
      getVipData(){
        this.$loading.open();
        Api[ApiNames.GetMemberLevelUP]().then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status === 1){
            this.hasBet = data.row.hasBet;
            let infoNeedBet = parseFloat((data.row.needBet - data.row.hasBet).toFixed(2));
            this.needBet = infoNeedBet;
            this.dayWeek = data.row.dayWeek;
            let parent =  Math.round(this.hasBet *10000 / (infoNeedBet + this.hasBet))/10000;
            this.slever = parent>1?1:parent;
            if (infoNeedBet <= 0) {
              this.descIndex = 3;
            } else {
              this.descIndex = 2;
            }
            let groupId = this.groupId;
            if (groupId == 6) {
                this.descIndex = 4;
                this.vipIndex1 = 5;
                this.vipIndex2 = 5;
            } else if (groupId == 1) {
                this.descIndex = 1;
                this.vipIndex1 = 0;
                this.vipIndex2 = 1;
                this.slever = 1;
            } else if (groupId == 7) {
              this.vipIndex1 = groupId-1;
              this.vipIndex2 = 2;
            } else if (groupId == 2) {
              this.vipIndex1 = groupId-1;
              this.vipIndex2 = 6;
            } else {
              this.vipIndex1 = groupId-1;
              this.vipIndex2 = groupId;
            }
          }else{
            this.sysErrCheck(data.Status).then(canrun=>{
              if(canrun){
                this.descIndex = 5;
              }
            })
          }
        }).catch(()=>{
          this.$loading.open();
          this.sysErrCheck(-9);
        })
      },
      routePath(path){
        this.$router.push(path);
      }
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"VIP俱乐部",
          showMenu:false,
          showBack:true,
          showNav:true,
          showChat:true
        });
      })
    }
  }
</script>

<style scoped lang="less">
.vip{
  font-size:.3rem;
  &.slide-right-enter,&.slide-right-leave-to{
    transform: translate3d(-100%,0, 0);
  }
  &.slide-right-enter-active, &.slide-right-leave-active {
    transition: all 0.2s ease;
  }
  .banner{
    position: relative;
    width:100%;
    height:4.2rem;
    text-align: center;
    overflow: hidden;
    background: url("../../assets/image/vip-banner.jpg") no-repeat center center;
    background-size:contain;
    dl{
      width:2.7rem;
      margin:0.3rem auto;
      dt{
        width:2.65rem;
        height:2.6rem;
      }
      dd{
        color: #d7d1be;
        margin-bottom:0.2rem;
        .level{
          display: inline-block;
          padding:0 0.25rem;
          background: #e1bf70;
          -webkit-border-radius:0.2rem;
          border-radius:0.2rem;
          color: #6e5732;
        }
      }
    }
    .vipDetail{
      display: inline-block;
      position: absolute;
      right:0;
      top:0.45rem;
      background: #1d1d1d;
      color: #baad86;
      border-radius: 0.3rem 0 0 0.3rem;
      padding:0.02rem 0.05rem;
      .vipIcon{
        float: left;
      }
      span{
        float: left;
        font-size:0.24rem;
        line-height: 0.5rem;
        display: inline-block;
        padding-right:0.15rem;
      }
    }
  }
  .content{
    color: #666;
    .totalBet{
      font-size: .24rem;
      height:.88rem;
      background: #fff;
      line-height:.88rem;
      .desc{
        float: left;
        margin-left:0.2rem;
      }
      .money{
        float: right;
        margin-right:.2rem;
        font-size:0.24rem;
        span{
          font-size:0.32rem;
          color: #f01924;
        }
      }
    }
    .level{
      width:100%;
      padding:.2rem .2rem;
      height:1.68rem;
      background: #fff;
      border-bottom:1px solid #f2f2f2;
      overflow: hidden;
      .level-left,.level-right{
        float: left;
        display: inline-block;
        background: #f01924;
        font-size:.22rem;
        padding:0.05rem 0.15rem;
        white-space: nowrap;
        color: #fff;
        border-radius: 0.32rem;
        line-height:0.32rem;
        margin-top:0.4rem;
      }
      .level-right{
        float: right;
        background: #bbb;
      }
      .level-process{
        font-size:.24rem;
        float: left;
        width:60%;
        margin-left:0.3rem;
        text-align: center;
        margin-top:0.1rem;
        .desc{
          display: inline-block;
          margin-top:0.18rem;
          color: #ff7d84;
          font-size: .22rem;
        }
        .line{
          display: block;
          height:0.2rem;
          border-radius: .2rem;
          overflow: hidden;
        }
        .num{
          display: block;
        }
        i{
          color: #ff3a2b;
        }
      }
    }
    .notice{
      width:100%;
      height:.88rem;
      padding:0 .2rem;
      background: #fff;
      line-height:.88rem;
      overflow: hidden;
      font-size:0.24rem;
      color: #808080;
      .timeIcon{
        float: left;
        margin:0.01rem 0.05rem 0 0;
      }
      i{
        color: #333;
      }
      b{
        color: #f01924;
        font-size:0.26rem;
        font-weight:500;
      }
    }
    .award{
      margin-top:0.2rem;
      background: #fff;
      .title{
        width:100%;
        height:.88rem;
        border-bottom:1px solid #f2f2f2;
        span{
          display: inline-block;
          border-left:4px solid #f01924;
          margin-top:0.26rem;
          padding-left:0.2rem;
          color: #444;
          font-size:.26rem;
        }
      }
      .con{
        padding:0.3rem 0.2rem;
        min-height:2.2rem;
        overflow: hidden;
        dl{
          width: 1.3rem;
          text-align: center;
          float: left;
          margin-right: 0.56rem;
          &:last-child{
            margin-right: 0;
          }
          dt{
            width:.88rem;
            height:.88rem;
            background: #febd00;
            border-radius: 40%;
            text-align: center;
            margin: 0 auto 0.05rem auto;
            i{
              line-height:0.88rem;
            }
          }
          dd{
            font-size: .24rem;
            padding:0.03rem 0;
            white-space: nowrap;
            i{
              color:#333!important;
              font-weight:bold;
              font-size:.26rem;
            }
          }
        }
      }
    }
  }
}
</style>
