<template>
  <transition name="slide-left">
  <div class="safetyCenter">
    <ul class="safeInfo boxshadow">
      <li>您的安全等级：<span>{{ safeLevelName[sleverNameIndex] }}</span></li>
      <li class="progress">
        <tf-progressbar type="line" :progress="myProgress" trailWidth="2" trailColor="#ff3a2b"></tf-progressbar>
      </li>
      <li>还有<span>{{ residualNum }}</span>项未通过验证/设定</li>
    </ul>
    <tf-cell-group>
      <div class="warnText">
        <span>安全验证项</span>
      </div>
      <tf-cell-item class="acc-set-higt" @click.native="routeToCheck('mail',checkedArr.mail)">
        <div slot="left" class="myIcon">
          <tf-icon name="youxiang" color="#fff" size=".38rem"></tf-icon>
        </div>
        <div slot="left" class="content">
          <span slot="left" class="title">邮箱验证</span>
          <div slot="left" class="unChecked" v-bind:class="{checked: checkedArr.mail }">{{ checkedArr.mail?"已验证":"未验证" }}</div>
          <span class="desc">绑定邮箱可帮助您取回登录密码</span>
        </div>
        <tf-icon slot="right" v-show="!checkedArr.mail" name="jiantou" color="#999" size=".4rem"></tf-icon>
      </tf-cell-item>
      <tf-cell-item class="acc-set-higt" @click.native="routeToCheck('mobile',checkedArr.mobile)">
        <div slot="left" class="myIcon mobile">
          <tf-icon name="shouji" color="#fff" size=".4rem"></tf-icon>
        </div>
        <div slot="left" class="content">
          <span class="title">手机验证</span>
          <div slot="right" class="unChecked" v-bind:class="{checked: checkedArr.mobile }">{{ checkedArr.mobile?"已验证":"未验证" }}</div>
          <span class="desc">帮助您在重要操作中接收短信</span>
        </div>
        <tf-icon slot="right" v-show="!checkedArr.mobile" name="jiantou" color="#999" size=".4rem"></tf-icon>
      </tf-cell-item>
      <tf-cell-item class="acc-set-higt" @click.native="routeToCheck('bankCard',checkedArr.bankCard)">
        <div slot="left" class="myIcon bankCard">
          <tf-icon name="yinhangqia" color="#fff" size=".48rem"></tf-icon>
        </div>
        <div slot="left" class="content">
          <span class="title">绑定银行卡</span>
          <div slot="right" class="unChecked" v-bind:class="{checked: checkedArr.bankCard }">{{ checkedArr.bankCard?"已验证":"未验证" }}</div>
          <span class="desc">绑定银行卡后，用户才能操作提款</span>
        </div>
        <tf-icon slot="right" v-show="!checkedArr.bankCard" name="jiantou" color="#999" size=".4rem"></tf-icon>
      </tf-cell-item>
      <tf-cell-item class="acc-set-higt" @click.native="routeToCheck('safePass',checkedArr.safePass)">
        <div slot="left" class="myIcon safePass">
          <tf-icon name="mimaguanli" color="#fff" size=".4rem"></tf-icon>
        </div>
        <div slot="left" class="content">
          <span class="title">安全密码</span>
          <div slot="right" class="unChecked" v-bind:class="{checked: checkedArr.safePass }">{{ checkedArr.safePass?"已验证":"未验证" }}</div>
          <span class="desc">提高资金操作的安全性</span>
        </div>
        <tf-icon slot="right" v-show="!checkedArr.safePass" name="jiantou" color="#999" size=".4rem"></tf-icon>
      </tf-cell-item>
    </tf-cell-group>
  </div>
  </transition>
</template>

<script>
  import Api from "api/User"
  import ApiNames from "api/API.list"
  import config from 'common/config'
  export default {
    name:'safetyCenter',
    created(){
      this.safeLevelName = ['低','中','高'];
    },
    data(){
      return {
        myProgress:0,
        checkedArr:{
          mail:false,
          mobile: false,
          bankCard: false,
          safePass: false
        },
        sleverNameIndex: -1,
        residualNum: 0
      }
    },
    mounted(){
      setTimeout(()=>{
        this.getSafeData();
      },20)
    },
    methods:{
      getSafeData(){
        this.$loading.open();
        Api[ApiNames.SleVerification]().then(res=>{
          this.$loading.close();
          let data = res.data;
          if(data.Status=== config.ERR_OK){
            let dataArray;
            let verifyNum = 4;
            if (data.row == undefined)
              return;
            else
              dataArray = JSON.parse(data.row);
            let parent = dataArray.length/verifyNum;
            this.residualNum = verifyNum-dataArray.length
            this.myProgress = parent;
            if (parent < 0.5) {
              // 低
              this.sleverNameIndex = 0;
            }
            else if (0.5 <= parent && parent <= 0.7) {
              // 中
              this.sleverNameIndex = 1;
            }
            else {
              // 高
              this.sleverNameIndex = 2;
            }
            for (var i = 0; i < dataArray.length; i++) {
              if (dataArray[i].SecType == 1) {// 安全密码
                this.checkedArr.safePass = true;
              }
              else if (dataArray[i].SecType == 3) {// 邮箱验证
                this.checkedArr.mail = true;
              }
              else if (dataArray[i].SecType == 4) {// 手机验证
                this.checkedArr.mobile = true;
              }
              else if (dataArray[i].SecType == 5) {// 银行卡验证
                this.checkedArr.bankCard = true;
              }
            }
          }
        });
      },

      //路由跳转
      routeToCheck(name,flag){
        flag = flag || false;
        if(!name || flag) return false;
        if(name == "mail" || name == "mobile"){
          this.$router.push('/safetyCenter/safeCheck/'+name);
        }else if(name == "bankCard"){
          this.$router.push("/bankInfo");
        }else if(name == "safePass"){
          this.$router.push("/safetyCenter/safePassCheck");
        }
      }

    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"安全验证",
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
    }
  }
</script>

<style scoped lang="less">
.safetyCenter{
  font-size:.26rem;
  color: #333;
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
  .safeInfo{
    background:#fff;
    margin:0rem 0 .2rem 0;
    padding:0.2rem .3rem;
    text-align: left;
    position: relative;
    z-index: 6;
    li{
      padding:.05rem 0;
      span{
        color: #ff3a2b;
      }
      &:last-child{
        color: #ababab;
        font-size:.24rem;
        span{
          font-size:.26rem;
          margin:0 .05rem;
          font-weight:600;
        }
      }
      &.progress{
        height: 0.22rem;
        margin-bottom:0.15rem;
        overflow: hidden;
      }
    }
  }
  .myIcon{
    width:.8rem;
    height:.8rem;
    background: #f01924;
    border-radius:32%;
    box-shadow: 0 2px 8px rgba(0,0,0,.12);
    text-align: center;
    i{
      line-height:0.8rem;
    }
  }
  .acc-set-higt{
    height: 1.42rem;
  }
  .mobile{
    background: #7066b7;
  }
  .bankCard{
    background: #24c6b4;
  }
  .safePass{
    background: #236bf8;
  }
  .content{
    margin-left:0.25rem;
    .title{
      float: left;
      display: block;
      color: #333;
      font-size:.26rem;
      text-align: left;
      padding-bottom: .025rem;
      margin-right: .25rem;
      width:1.2rem;
    }
    .desc{
      font-size:.24rem;
      color: #ababab;
      clear: both;
      display:block;
    }
  }
  .unChecked{
    float: left;
    width:.88rem;
    height: .32rem;
    line-height: .32rem;
    box-shadow: 0 1px 4px rgba(0,0,0,.08);
    margin-top: 1px;
    text-align: center;
    background: #ff5c50;
    border-radius:.32rem;
    font-size:.22rem;
    color: #fff;
    white-space:nowrap;
    opacity:1;
  }
  .checked{
    background: #58dbcc;
  }
  .warnText{
    width: 100%;
    border-bottom:1px solid #f2f2f2;
    padding:0.3rem 0 .3rem 0;
    overflow: hidden;
    span{
      display: inline-block;
      border-left:4px solid #f01924;
      padding-left:.28rem;
      color: #333;
      font-size:0.26rem;
    }
  }
}
</style>
