<!--
* 消息列表
-->
<template>
    <div class="container">
        <tf-pullrefresh :onInfinite="reload" ref="pullrefreshDemo">
        <ul class="m-email boxshadow">
            <li @click="$router.push('message/'+msg.ID)" v-if="sortedMsgs.length>0" :class="{'m-email-li':true, 'ok':msg.IsRead}" v-for="msg in sortedMsgs" :key="msg.ID">
                <span class="m-email-ico fl"><tf-icon name="youxiang" size=".32rem"></tf-icon></span>
                <div class="m-email-text bfc">
                    <div class="m-email-bt"><div class="fr"><tf-icon name="time" size=".24rem"></tf-icon><span>{{DateFormat(msg.CreateTime,"MM-DD HH:mm")}}</span></div><h2 class="bfc">{{msg.SendTitle}}</h2></div>
                    <p class="m-email-nr">{{msg.SendContent}}</p>
                </div>
            </li>
            <li v-else class="m-email-li">
                <div style="text-align: center;color: #ccc;">暂无消息</div>
            </li>
        </ul>
        </tf-pullrefresh>
    </div>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import _moment from 'moment'
import { PullRefresh } from '@/tf-ui/components/pullrefresh';
export default {
    components: {
        [PullRefresh.name]:PullRefresh
    },
    data() {
        return {}
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"]),
        formatDate(date){
            return _moment(date).format("MM-DD HH:mm")
        },
        reload(){
            this.getMessages();
            this.$refs.pullrefreshDemo.$emit('tf.pullrefresh.finishLoad');
        }
    }, 
    created() {
    },   
    mounted() {
        if(this.message.length<=0)
            this.getMessages();
    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
           //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "消息列表", showMenu: false, showBack: true, showNav: false, showChat: false });
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
.container{
    margin-bottom: -.3rem;
    background: #fff;
    .m-email{
        overflow: hidden;
        .m-email-li{
            width: auto;
            overflow: hidden;
            clear: both;
            margin:0 ;
            padding: .42rem .22rem;
            border-bottom: 1px solid #f5f5f5;
            box-shadow: 0 1px 3px rgba(0,0,0,.02);
            &:last-child {
                border-bottom: none;
            }
            .m-email-ico{
                width: .68rem;
                height: .68rem;
                line-height: .68rem;
                background-image:linear-gradient(to right bottom,#ff9d0b,#ffdd57);
                box-shadow: 1px 2px 10px rgba(255,150,10,.3);
                border-radius: 42%;
                text-align: center;
                color: #fff;
                margin-right: .22rem;
                  i {
                    background-image: -webkit-gradient(
                      linear,
                      0 0,
                      0 bottom,
                      from(rgba(255, 255, 255, 1)),
                      to(rgba(255, 255, 255, 0.75))
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
                  }
            }
            .m-email-text{
                .m-email-bt{
                    width: 100%;
                    overflow: hidden;
                    clear: both;
                    line-height: .32rem;
                    >h2.bfc{
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        font-weight: 600;
                        font-size: .24rem;
                        color: #444;
                    }
                    >div.fr{
                        font-size: .22rem;
                        color: #bbb;
                        margin-left: .24rem;
                        span{
                            position: relative;
                            top: -1px;
                            margin-left: .04rem;
                        }
                    }
                }
                .m-email-nr{
                    overflow: hidden;
                    clear: both;
                    display: block;
                    text-align: left;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    font-size: .24rem;
                    color: #ccc;
                    line-height: .26rem;
                    margin-top: .12rem;
                }
            }
            &.ok{
                .m-email-ico{
                    background: #dcdcdc;
                    box-shadow: 1px 2px 10px rgba(0,0,0,.06);
                    /*background-image:linear-gradient(to right bottom,#ff9d0b,#ffdd57);
                    box-shadow: 1px 2px 10px rgba(255,150,10,.3);*/
                    color: #fff;
                }
                .m-email-text{
                    .m-email-bt{
                        >h2.bfc{
                            font-weight: 400;
                            color: #606060;
                        }
                        >div.fr{
                            color: #ddd;
                            margin-left: .24rem;
                            span{
                                position: relative;
                                top: -1px;
                                margin-left: .04rem;
                            }
                        }
                    }
                    .m-email-nr{
                        color: #ddd;
                    }
                }
            }
        }
    }
}



</style>
`