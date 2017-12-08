<!--
* 注册会员
-->
<template>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import AjaxCommon from '../common/ajaxCommon'
import gvars from "common/GlobalVars"
export default {
    components: {},
    data() {
        return {
        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig","setVerifyStr","setScrollTop"])
    },
    created() {
    },
    mounted() {
      AjaxCommon("Logout",{},1,this).then(res=>{
        if(res){
          gvars.Token = "";
          gvars.SID = "";
          gvars.ACNT = "";
          gvars.GroupID = "";
          this.$store.commit("setVerifyStr","");
          this.$store.commit("setScrollTop",0);
          setTimeout(()=>{
            this.$router.push('/');
          },20)
        }

      });

    },
    methods:{

    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
           //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "注册会员", showMenu: false, showBack: true, showNav: false, showChat: false });
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
</style>
