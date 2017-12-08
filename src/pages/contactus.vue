<!--
* 联系我们
-->
<template>
<div class="selector-bank boxshadow">
      <div class="serviceWraper">
        <h2 class="service-title">在线客服</h2>
        <tf-flexbox class="ptdot2rem">
            <tf-flexbox-item @click.native="onlineService" class="txt-center">
               <div class="mob-tb-kf fl zxkf"><tf-icon name="kefu51" size=".56rem"></tf-icon><p>在线客服</p></div>
            </tf-flexbox-item>

            <tf-flexbox-item @click.native="onlineQQService" class="txt-center">
               <div class="mob-tb-kf fr qqkf"><tf-icon name="qq1" size=".48rem"></tf-icon><p>QQ客服</p></div>
            </tf-flexbox-item>
        </tf-flexbox>
        <h2 class="service-title pbdot2rem">客服免费热线</h2>
        <p class="service-call txt-center blueColor"><a href="tel:4008427033">400-842-7033</a> </p>
        <p class="service-call txt-center blueColor"><a href="tel:13143969573">13143969573</a></p>
        <p class="service-call txt-center blueColor">
            <!-- <tf-icon name="guojichangtudianhua" size=".38rem" style="position: relative;bottom:-2px;margin-right:-4px;color: #ccc;"></tf-icon> -->
            <span style="font-size: .26rem;color: #ccc;">国际长途</span>
            <a href="tel:00639152888266">0063-9152888266</a>
        </p>
      </div>
</div>

</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import { FlexBox, FlexBoxItem } from "@/tf-ui/components/flexbox";
export default {
    components: {
    [FlexBox.name]: FlexBox,
    [FlexBoxItem.name]: FlexBoxItem,},
    data() {
        return {}
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"])
    }, 
    created() {
    },   
    mounted() {
        
    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
           //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "联系我们", showMenu: true, showBack: false, showNav: true, showChat: false });
        });
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
        next();
    },
    computed: {
    },
    destroyed(){
    }
}
</script>
<style lang="less">
.selector-bank{
    background: #fff;
    .service-title{
      font-size: .26rem;
      font-weight: 400;
      line-height: .32rem;
      color: #999;
      margin-top: .1rem;
      text-align: center;
      overflow: hidden;
      clear: both;
    }
    .mob-tb-kf{
      width: 94%;
      height: 1.28rem;
      line-height: 1.28rem;
      background: #ccc;
      margin: 15px 1% 30px 1%;
      border-radius: 8px;
      &.zxkf{
        background-image:linear-gradient(to right,#ffaa57,#fe5c76);
        box-shadow: 0 .06rem .2rem rgba(255,129,103,.35);
      }
      &.qqkf{
        background-image:linear-gradient(to right,#9c5bfe,#3990fe);
        box-shadow: 0 .06rem .2rem rgba(103,119,254,.35);
      }
      i{
        display: inline-block;
        background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, .9)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p{
        display: inline-block;
        color: #fff;
        font-size: .26rem;
        position: relative;
        top: -4px;
        margin-left: 4px;
      }
    }
    .service-call{
      line-height: 1rem;
      font-size: .3rem;
      color: #699deb;
      border-top: 1px solid #f3f3f3;
      box-shadow:inset 0px 1px 1px rgba(0,0,0,.02);
    }

}
</style>