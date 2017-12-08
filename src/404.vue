<!--
* 404
-->
<template>
    <div  class="container ">

        <div class="notfoundimg center-block"></div>
        <h2 class="txt-center center-block size3rem pbdot2rem">页面不存在或已丢失</h2>
        <p class="txt-center">
            <span class="grayColor">检查您的网址拼写是否正确 </span><br/>
            <span class="grayColor"> 检查您是否使用了错误的网址链接</span>
        </p>
        <tf-button size="large" @click.native="$router.push('/')" class="center-block back-home" type="hollow">返回首页</tf-button>
        <tf-button size="large" @click.native="$router.back" class="center-block" type="hollow">返回上一页</tf-button>
    </div>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
export default {
    components: {},
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
        this.currentHeight = document.getElementById("scrollView").getBoundingClientRect().height;
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
            //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "未能找到页面", showMenu: false, showBack: true, showNav: false, showChat: false });
        });
    }
}
</script>
<style lang="less" scoped>
.container {
    h2{
        font-weight: 400;
    }
    p{
        font-size: .24rem;
        padding-bottom: .4rem;
    }
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: .8rem;
    background-color: #fff;
    button.center-block{
        color: #888;
        width: 88%;
        height: .88rem;
        border:1px solid #eee;
        margin-top: .2rem;
        box-shadow: 0 2px 6px rgba(0,0,0,.05);
        &.back-home{
            color: #3699ff;
            border-color: #8fc9ff;
            box-shadow: 0 2px 8px rgba(0,155,255,.1);
        }
    }
}

.notfoundimg {
    width: 3rem;
    height: 3rem;
    margin-bottom: .5rem; 
    background-image: url(./assets/image/404-ico.png);
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
