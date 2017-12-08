<!--
* 403
-->
<template>
    <div  class="container ">
        <div class="tb-403">
            <ul>
                <li><b>亲爱的用户：</b></li>
                <li>您当前所在地区限制，无法浏览您所尝试打开的网页。我们对您造成的不便表示万分歉意。如有任何的疑问，您可以拨打我们的客服热线：<br /><span class="red">400-842-7033</span> 或 <span class="red">13143969573</span>  <br/>或  <span class="red">0063-9152888266</span></li>
                <li style="margin-top:12px;"><b>Dear Valued Customers:</b></li>
                <li>Your current location is restricted to access our website.We apologize for any inconvenience caused.Should you have any inquiries, please contact our customer service：
                 <br /><span class="red">400-842-7033</span> or <span class="red">13143969573</span> <br/>or <span class="red">0063-9152888266</span></li>
            </ul>
        </div>
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
            vm.$store.commit('setSiteConfig', { title: "", showHeader:false,showMenu: false, showBack: false, showNav: false, showChat: false });
        });
    }
}
</script>
<style lang="less" scoped>
.container{
    /*background-color:#332f43;*/
    background-image:linear-gradient(to bottom,#332f43,#4f4966);
    width: 100%;
    height: 100%;
    position: relative;
    margin-bottom: -.5rem;
    .tb-403{
        width:100%;
        height:100%;
        margin: 0 auto;
        background:url(./assets/image/403.png) no-repeat center top;
        background-size:cover; 
        ul{
            position:absolute;
            margin:3.4rem 0 0 10%;
            width:80%;
            font-size:12px;
            li{
                list-style-type:none;
                line-height: .36rem;
                color:#888;
                font-size: .22rem;
                b{
                    font-weight: 400;
                    color: #332f43;
                    font-size: .26rem;
                    line-height: .36rem;
                }
            }
        }
    }
}

</style>
