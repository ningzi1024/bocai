<template>
  <div class="setting-ok">
    <dl>
      <dt>
        <span class="ok-icon">
          <i class="icon tb icon-gou1"></i>
        </span>
      </dt>
      <dd><b>{{title}}</b></dd>
      <dd>{{ msg }}</dd>
    </dl>
    <tf-button size="large" class="backtouc" @click.native="routePath()">返回个人中心</tf-button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name:"setting-ok",
    created(){
      this.title = this.getMemberData().settingOkTitle||'操作成功';
      this.msg = this.getMemberData().settingOkMsg||'你当前操作已经成功！';
    },
    methods:{
      routePath(){
        this.$router.push('/memberCenter');
      },
      ...mapGetters({
        getMemberData:"getMemberData"
      })
    },
    beforeRouteEnter(to,from, next){
      next(vm => {
        vm.$store.commit('setSiteConfig',{
          title:"操作成功",
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
  }
</script>

<style scoped lang="less">
.setting-ok{
  font-size:.26rem;
  padding-top:1rem;
  background: #fff;
  height: 100%;
  position: relative;
  margin-bottom: -10rem;
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
.backtouc{
  width:90%;
  margin-left:5%;
  margin-top:.8rem;
  height: .88rem;
  border-radius: .88rem;
  /*border:1px solid #d0def3;
  background: #fff;
  color: #699deb;
  box-shadow: 0 .01rem .1rem rgba(105,157,235,.25);*/
  background-image:-webkit-linear-gradient(to bottom, #fff, #f6f6f6);
  background-image:linear-gradient(to bottom,#fff,#f6f6f6);
  color: #999;
  border:1px solid #e8e8e8;
  box-shadow: 0 4px 20px rgba(0,0,0,.06);
}
</style>
