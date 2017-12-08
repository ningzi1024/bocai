<!--
* 演示图
-->
<template>
    <img style="width:100%;" src="../assets/image/Sample-alipay-to-bank.jpg" alt="">
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import config from "../common/evn.config"
export default {
    components: {},
    data() {
        return {
            img:""
        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"])
    }, 
    created() {
    },   
    mounted() {
        this.img = config.resource+""
    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
           //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "演示图", showMenu: false, showBack: true, showNav: false, showChat: false });
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
