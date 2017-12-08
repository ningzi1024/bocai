<!--
* 消息中心
-->
<template>
    <transition name="slide-left">
        <div class="notice">
            <div class="notcie-list">
                <div class="notice-list-item">
                    <h3>{{title}}<span>{{time}}</span></h3>
                    <p>{{content}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import moment from 'moment'
export default {
    components: {},
    data() {
        return {
            ID:"",
            title:"",
            time:"",
            content:""
        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig","setMsgRead"]),
        getMsgInfo(){
            if(this.$route.params.id){
                let msg = this.message.find(item=>item.ID == this.$route.params.id)
                this.ID = this.$route.params.id;
                this.title = msg.SendTitle
                this.content = msg.SendContent
                this.time = moment(msg.CreateTime).format("YYYY-MM-DD HH:mm")
                if(!msg.IsRead){
                    
                    api[apiNames.MemberMsgRead]({msgID:this.ID}).then(rep => {
                        let data = rep.data;
                        if (data.Status === 1) {
                            
                        } else {
                            this.sysErrCheck(data.Status).then(canrun => {
                                if (canrun) {
                                    this.alert({ mes: data.CNMessage, })
                                }
                            });
                        }
                    }).catch(err => {
                        this.sysErrCheck(-9);
                    })
                    this.setMsgRead(this.ID)
                }
            }
        }
    }, 
    watch:{
        message(value) {
            this.getMsgInfo();            
        }
    },
    created() {
        
    },   
    mounted() {
        if(this.message.length<=0) {
            this.getMessages();
        }
        this.getMsgInfo();
        
    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
           //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "消息详情", showMenu: false, showBack: true, showNav: false, showChat: false });
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

<style lang="less" scoped>
.notice{
  background: #fff;
  padding-bottom:.4rem;
  margin-bottom: -0.5rem;
  min-height: 100%;
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
