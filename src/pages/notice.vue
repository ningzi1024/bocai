<template>
  <transition name="slide-left">
  <div class="notice">
    <div class="notcie-list" v-if="list.length">
      <div class="notice-list-item" v-for="item in list">
        <h3>{{item.Name}} <span></span></h3>
        <p>{{ item.Text }}</p>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
import config from 'common/config'
import { createDate } from 'common/date'
import AjaxCommon from 'common/ajaxCommon'

export default {
  name: "notice",
  mounted(){
    this.getAnno();
  },
  data(){
    return {
      list:[],
    }
  },
  methods:{
    getAnno(){
      AjaxCommon("GetAnno",{},1,this).then(res=>{
        this.list = res.row;
        localStorage.setItem('tengbo.notice.number',res.row.length);
        this.$store.commit("setNoticeNum",0);
      })
    },
    _createDate(){
        return createDate.apply(this,arguments)
    },
    ...mapMutations([
      "setNoticeNum"
    ]),
  },
  beforeRouteEnter(to,from, next){
    next(vm => {
      vm.$store.commit('setSiteConfig',{
        title:"公告信息",
        showMenu:false,
        showBack:true,
        showNav:false,
        showChat:false
      })
    })
  },
}
</script>

<style scoped lang="less">
.notice{
  background: #fff;
  padding-bottom:.4rem;
  margin-bottom: -0.5rem;
  &.slide-left-enter, &.slide-left-leave-to{
    transform: translate3d(100%,0, 0);
  }
  &.slide-left-enter-active, &.slide-left-leave-active{
    transition: all 0.3s ease;
  }
}
.notcie-list{
  padding:.15rem .25rem 0 .25rem;
  font-size:.24rem;
  color: #666;
  /*border-bottom:1px solid #ccc;*/
  .notice-list-item{
    width:100%;
    clear: both;
    overflow:hidden;
    h3{
      font-size:.26rem;
      color: #444;
      margin: .25rem 0 .2rem 0.2rem;
      font-weight: 600;
      span{
        color:#ccc;
        font-size:0.24rem;
        font-weight:500;
        margin-left:0.2rem;
      }
    }
    p{
      background: #f2f2f2;
      padding:0.25rem 0.2rem;
      border-radius: 12px;
      line-height:.4rem;
      color: #999;
      font-size:.24rem!important;
      margin-bottom: .3rem;
    }
  }
}
</style>
