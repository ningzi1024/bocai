<template>
<transition name="slide-left">
<div class="promotion">
<div class="title">
  <h3>{{ data.title }}</h3>
  <span>{{data.validTime}}</span>
</div>
<div class="content" v-html="data.content"></div>
</div>
</transition>
</template>

<script>
  export default {
    data(){
      return {
        data:{}
      }
    },
    created(){
      this.id = this.$route.params.id;
      let id = parseInt(this.id);
      if(isNaN(id) || this.id<1 || this.id>11){
        this.$router.push('/discount');
        return ;
      }
      this.text = require('common/discount/'+this.id+'.js');
      this.data = this.text.data;
    },
    beforeRouteEnter(to,from, next){
      document.getElementById('scrollView').scrollTop = 0;
        next(vm => {
        vm.$store.commit('setSiteConfig',{title:vm.data.topTitle,showMenu:false,showNav:false,showBack:true});
      })
    },
    beforeRouteLeave(to,from,next){
      next();
    }
  }
</script>

<style scoped lang="less">
.promotion{
  color:#7f7f7f;
  font-size:0.24rem;
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
  .title{
    background: #fff;
    padding:0.3rem 0;
    text-align: center;
    overflow: hidden;
    h3{
      font-size:0.32rem;
      color: #222;
      margin-bottom:0.1rem;
    }
  }
  .content{
    background: #fff;
    margin-top:0.1rem;
    padding:0.15rem 0.25rem;
  }
}
</style>
