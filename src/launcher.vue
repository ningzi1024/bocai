<!--
* 启动器
-->
<template>
    <div class="loading">
        <span class="ico-loading-loader">
        </span><br/>
        <span class="grayColor">{{title}}</span>
    </div>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import gameMixins from "@/common/game.mixins"
export default {
    mixins: [gameMixins],
    components: {},
    data() {
        return {
            title: ""
        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"])
    },
    created() {
        if (this.$route.query._title)
            this.title = decodeURIComponent(this.$route.query._title)

    },
    mounted() {
        // debugger;

        let func = decodeURIComponent(this.$route.query._luncher);
        let _launcher = this;
        this.getLoginStatu().then(() => {
            if (func) {
                try {
                    eval(func)
                } catch (error) {
                    // console.log(error);
                }
            }
        });


    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
            //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "启动器", showMenu: false, showBack: true, showNav: false, showHeader: false, showChat: false });
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
    destroyed() {
    }
}
</script>
<style scoped lang="less">
@import "./assets/css/app.less";
.loading {
    position: absolute;
    height: 2rem;
    width: 80%;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -60%);
    text-align: center;
    .ico-loading-loader {
        width: .6rem;
        height: .6rem;
        display: inline-block;
        background-image: url("./assets/image/router-loading.png");
        background-size: cover;
        background-repeat: no-repeat;
        animation: rotate-loading .8s linear forwards infinite;
    }
}
</style>
