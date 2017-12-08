<template>
<div style="margin-bottom: -.3rem;">
  <tf-cell-group>
    <tf-cell-item v-for="item in list" v-bind:key="item.icon">
      <span slot="left" :class="['game-icon','game-platform-'+item.icon]" >
        <tf-icon :name="item.icon" size=".6rem"></tf-icon>
      </span>
      <span slot="left">
        <span class="title">{{item.name}}</span>
      </span>
      <span slot="right" v-if="item.ios" class="btn-down btn-iosapp" @click="downNow(item.ios)">苹果下载</span>
      <span slot="right" v-if="item.android" class="btn-down" @click="downNow(item.android)">安卓下载</span>
    </tf-cell-item>
  </tf-cell-group>
</div>
</template>

<script>
export default {
  name: 'clientside',
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.list = [
    {
      icon:'PT',
      iconBg:'#6147d7',
      name:'PT客户端',
      desc:'',
      ios:'',
      android:'https://static.tb5632.com:7443/tb2d1/Downloads/Client.apk'
    },{
      icon:'MG',
      iconBg:'#00bc65',
      name:'MG国际客户端',
      desc:'',
      ios:'',
      android:'http://resigner.valueactive.eu/fortunecat.apk'
    },{
      icon:'AG',
      iconBg:'#ff9a00',
      name:'AG国际客户端',
      desc:'',
      ios:'',
      android:'http://agmbet.com/universal/AG_setup.apk'
    },{
      icon:'yu',
      iconBg:'#009aff',
      name:'AG捕鱼二代客户端',
      desc:'',
      ios:'http://hunter2.agmjs.com/',
      android:'http://hunter2.agmjs.com/'
    },{
      icon:'BBIN',
      iconBg:'#ff3b2a',
      name:'波音客户端',
      desc:'',
      ios:'https://itunes.apple.com/ph/app/bb-game-zone/id1154344492?mt=8',
      android:'https://static.tb5632.com:7443/tb2d1/Downloads/aio3_3010.apk'
    },{
      icon:'DT',
      iconBg:'#9a09ff',
      name:'DT客户端',
      desc:'',
      ios:'http://down.dreamtech.asia/TBHUI/ios.html',
      android:'https://static.tb5632.com:7443/tb2d1/Downloads/dt.apk'
    },{
      icon:'GG',
      iconBg:'#4056ff',
      name:'GG客户端',
      desc:'',
      ios:'',
      android:'https://static.tb5632.com:7443/tb2d1/Downloads/ggfishing.apk'
    }
  ];
  },
  methods: {
    downNow(url){
      if(!url) return;
      this.openWin(url);
//      window.location.href = url;
    }
  },
  beforeRouteEnter(to,from, next){
    next(vm => {
      vm.$store.commit('setSiteConfig',{
        title:"下载专区",
        showMenu:true,
        showBack:false,
        showNav:true,
        showChat:true
      });
    })
  }
}
</script>

<style scoped lang="less">
.game-icon{
  width: 1.08rem;
  height: 1.08rem;
  line-height: 1.08rem;
  border-radius: 40%;
  text-align: center;
  margin-right:0.24rem;
  i{
      background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255,255,255,1)), to(rgba(255,255,255,.75)));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 1px 1px 3px rgba(0,0,0,.05);
  }
}
.cell-item{
  padding:.2rem 0 .2rem 0.22rem;
}
.title{
  display: block;
  color: #444;
  font-size: .24rem;
}
.desc{
  font-size:0.24rem;
  color: #999;
}
.btn-down{
  display: inline-block;
  text-align: center;
  margin-left:0.16rem;
  font-size: .22rem;
  height: .6rem;
  line-height: .6rem;
  color: #2ad4b6;
  width: 1.48rem;
  padding: 0;
  border-radius: .34rem;
  border:1px solid #4ce0c6;
  background: #eefcfa;
  /*background-image:linear-gradient(to bottom,#2ad4b6,#4ce0c6);*/
  box-shadow: 0 2px 8px rgba(76,224,198,.25);
  &.btn-iosapp{
    color: #fff;
    line-height: .62rem;
    border:none;
    background-image:linear-gradient(to bottom,#575167,#756d88);
    box-shadow: 0 2px 8px rgba(102,99,116,.2);
  }
}
</style>
