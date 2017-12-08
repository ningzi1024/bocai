<template>
  <transition name="slide-left">
  <div class="vipPlan">
    <div class="banner"></div>
    <div class="panel boxshadow">
      <div class="title">
        <span style="border-color: #f01924;">VIP会员等级特权说明</span>
      </div>
      <div class="con">
        <p>腾博会VIP会员级别共分六个等级</p>
        <p class="vipLevel"></p>
        <p>每一阶段VIP等级都有自己专属的等级特权</p>
      </div>
    </div>
    <div class="panel boxshadow">
      <div class="title">
        <span style="border-color: #f01924;">如何成为VIP会员</span>
      </div>
      <div class="con">
        <p>首存任意金额自动升级为普通VIP会员，享受0.8%洗码返利！</p>
      </div>
    </div>
    <div class="panel boxshadow">
      <div class="title">
        <span style="border-color: #f01924;">VIP成长特权</span>
      </div>
      <div class="con">
        <table>
          <tr>
            <th>VIP晋升</th>
            <th>周有效投注</th>
            <th>洗码比例</th>
            <th>晋级礼金</th>
            <th>VIP周年礼金</th>
          </tr>
          <tr>
            <td>普通VIP</td>
            <td>&ge;0</td>
            <td>0.80%</td>
            <td>--</td>
            <td><i>58</i></td>
          </tr>
          <tr>
            <td>青铜VIP</td>
            <td>&ge;50万</td>
            <td>0.85%</td>
            <td><i>288</i></td>
            <td><i>88</i></td>
          </tr>
          <tr>
            <td>白银VIP</td>
            <td>&ge;300万</td>
            <td>0.90%</td>
            <td><i>588</i></td>
            <td><i>188</i></td>
          </tr>
          <tr>
            <td>黄金VIP</td>
            <td>&ge;500万</td>
            <td>1.00%</td>
            <td><i>888</i></td>
            <td><i>288</i></td>
          </tr>
          <tr>
            <td>钻石VIP</td>
            <td>&ge;800万</td>
            <td>1.10%</td>
            <td><i>1288</i></td>
            <td><i>888</i></td>
          </tr>
          <tr>
            <td>至尊VIP</td>
            <td>&ge;1200万</td>
            <td>1.20%</td>
            <td><i>2888</i></td>
            <td><i>1288</i></td>
          </tr>
        </table>
      </div>
    </div>
    <!-- <div class="panel last-panel">
      <div class="title">
        <span style="border-color: #009afd;">服务特权</span>
      </div>
      <div class="con">
        <p>一对一的VIP客服</p>
        <p>1.VIP热线服务，随时为您遇到的问题排忧解难。</p>
        <p>2.可随时联系客服经理专人服务。</p>
        <p>3.开辟VIP专属的存取款通道，保证VIP用户能畅通无阻地享受游戏。</p>
      </div>
    </div> -->
  </div>
  </transition>
</template>

<script>
  export default {
    name:'vipPlan',
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"VIP成长特权",
          showBack:true,
          showNav:false,
          showChat:false,
          showMenu:false
        });
      })
    }
  }
</script>

<style scoped lang="less">
.vipPlan{
  font-size:.3rem;
  margin-bottom:-0.6rem;
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
  .banner{
    width:100%;
    height:2.5rem;
    background: url("../assets/image/vipPlan-banner.jpg") no-repeat center center;
    background-size:contain;
    overflow: hidden;
  }
  .panel{
    background: #fff;
    width:100%;
    /*border-bottom:1px solid #e6e6e6;*/
    margin-bottom:0.16rem;
    overflow: hidden;
    .title{
      width:100%;
      /*height:.6rem;*/
      border-bottom:1px solid #f2f2f2;
      box-shadow: 0 1px 3px rgba(0,0,0,.03);
      font-size:0.26rem;
      padding: .28rem 0;
      span{
        display: inline-block;
        border-left:4px solid #fff;
        color:#333;
        padding-left:0.2rem;
      }
    }
    .con{
      padding:.3rem 0.2rem;
      font-size:.24rem;
      p{
        color: #999;
        line-height:1.6;
        margin:0.1rem 0;
        &.vipLevel{
          width:100%;
          min-height:0.6rem;
          background: url("../assets/image/vip-level.png") no-repeat center center;
          background-size:contain;
          padding:0.5rem 0;
        }
      }
      table{
        width:100%;
        border-collapse:collapse;
        border-spacing: 0;
        border-right:1px solid #e6e6e6;
        border-left:1px solid #e6e6e6;
        th{
          background: #f01924;
          padding:0.2rem 0;
          color: #fff;
          font-size:0.24rem;
        }
        td{
          padding:0.25rem 0;
          text-align: center;
          color: #999;
          border-bottom:1px solid #e6e6e6;
          i{
            color: #f01924;
          }
        }
      }
    }
  }
  .last-panel{
    border-bottom:0;
    margin-bottom:0;
  }
}
</style>
