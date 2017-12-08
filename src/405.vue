<!--
* 405
-->
<template>
    <div class="container ">

        <div class="notfoundimg center-block"></div>
        <h2 class="txt-center center-block size3rem pbdot2rem">系统维护升级中...</h2>
        <p class="txt-center">
            <span class="grayColor">不便之处敬请谅解， </span><br/>
            <span class="grayColor"> 如有疑问，可拨打客服免费热线咨询</span>
        </p>

        <tf-button size="large" color="#09f" class="center-block" type="hollow">
            <a href="tel:4008427033"> 客服热线：400-842-7033</a>
        </tf-button>
        <tf-button size="large" color="#09f" class="center-block" type="hollow">
            <a href="tel:4008427033">手机：13143969573</a>
        </tf-button>
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
            vm.$store.commit('setSiteConfig', { title: "系统维护", showMenu: false, showBack: false, showNav: false, showChat: false });
        });
    }
}
</script>
<style lang="less" scoped>
.container {
    height: 100%;
    position: relative;
    box-sizing: border-box;
    padding-top: 1rem;
    background-color: #fff;
    h2{
        font-weight: 400;
    }
    p{
        font-size: .24rem;
        padding-bottom: .4rem;
    }
    button.center-block{
        width: 88%;
        height: .88rem;
        margin-top: .2rem;
        color: #3699ff;
        border-color: #8fc9ff;
        box-shadow: 0 2px 8px rgba(0,155,255,.1);
    }
}

.notfoundimg {
    width: 2.6rem;
    height: 2.6rem;
    margin-bottom: .5rem;
    background-image: url(./assets/image/405-ico.png);
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
