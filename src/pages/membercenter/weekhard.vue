<!--
* 周勤好礼
-->
<template>
    <div class="container">
        <tf-notice title="温馨提示：" content="每天14点统计更新上一天的有效投注额！"></tf-notice>
        <div class="group-title">
            <label>
                本周周勤
            </label>
            <span class="pullright">
                已出勤
                <span class="redColor">3</span>天！累计投注
                <span class="redColor">20000</span>

            </span>
            <tf-flexbox>
                <tf-flexbox-item>
                    <div class="day-warp">
                        <div class="circle complate">
                        周<br/>完成
                        </div>
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div class="day-warp">
                        周<br/>完成
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div class="day-warp">
                        周<br/>完成
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div class="day-warp">
                        周<br/>完成
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>

                    <div class="day-warp">
                        周<br/>&nbsp;
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div class="day-warp">
                        周<br/>完成
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div class="day-warp">
                        周<br/>完成
                    </div>
                </tf-flexbox-item>
            </tf-flexbox>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import notice from "@/components/notice"
import { FlexBox, FlexBoxItem } from '@/tf-ui/components/flexbox';
export default {
    components: {
        [notice.name]: notice,
        [FlexBox.name]: FlexBox,
        [FlexBoxItem.name]: FlexBoxItem
    },
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
            vm.$store.commit('setSiteConfig', { title: "周勤好礼", showMenu: false, showBack: true, showNav: false, showChat: false });
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
<style lang="less" scoped>
.container{
    .day-warp{
        box-sizing: border-box;
        // padding-left:.24rem;
        text-align: center;
        .circle{
            width:.8rem;
            height:.8rem;
            margin-left:auto;
            margin-right: auto;
            border-radius: 50%;
        }
        .complate{
            background-color: #3bcd94;
            color: #fff;
        }
        .selected{
            background-color: #fff;
        }
    }
}
</style>
