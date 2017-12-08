<template>
    <tf-popup class="selector-bank" :useLock="false" v-model="show"   :width="width" position="right">
        <tf-layout :style="{'height':screen.height+'px'}">
            <tf-navbar slot="navbar" fontsize=".3rem" title="请选择银行">
                <a @click="back" slot="left">
                    <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                </a>
            </tf-navbar>

            <tf-cell-group>
                <tf-cell-item type="label" @click.native="itemClick(item,$event)" v-for="item in items" :key="item.value">
                    <span slot="left">
                        <tf-symbol :name="item.icon" size="0.6rem"></tf-symbol>
                        <!-- <tf-icon class="iconcust" name="ucenter-outline" size=".6rem"></tf-icon> -->
                    </span>
                    <div class="right-item-content" slot="right">
                        <span>{{item.text}}</span>
                        <tf-icon v-show="selectedItem===item.value" name="checkoff" class="icon-custom-selected" size=".4rem"></tf-icon>
                    </div>
                </tf-cell-item>
            </tf-cell-group>
        </tf-layout>
    </tf-popup>
</template>
<script>
import { mapMutations, mapGetters } from "vuex"
import { Popup } from '@/tf-ui/components/popup';
import api from "@/api/User"
import apiNames from "@/api/API.list"
import symbolIcon from "@/components/custom-icon/icon-symbol"
export default {
    name: "tf-selector-bank",
    components: {
        [Popup.name]: Popup,
        [symbolIcon.name]: symbolIcon
    },
    data() {
        return {
            // currentValue:this.selectedItem,
            temp: this.selectedItem,
            show: this.value,
            items: this.items
        }
    },
    props: {
        width: {
            type: String,
            default: '100%'
        },
        value: {
            type: Boolean
        },
        items: {
            type: Array,
            default: () => {
                return []
            }
        },
        selectedItem: {
            type: String,
            default: ""
        }
        // show:Boolean
    },
    watch: {
        value(val) {
            this.show = val;
        }
    },
    data: () => {
        return {}
    },
    methods: {
        back() {
            this.show = false;
        },
        itemClick(item) {
            // debugger;
            this.temp = item.value;
            this.$emit("selected", item);
            this.show = false;
        }
    },
    computed: {
        show: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        },
        currentValue: {
            get: function() {
                return this.temp;
            }
        }
        // function(){
        //     console.log(this)
        //     return this.temp;
        // }
    },
    created() {
        this.temp = this.selectedItem;
    },
    mounted() {
    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
            //这里可以获取vm实例
            //vm.$store.commit('setSiteConfig', { title: "请选择银行", showMenu: false, showBack: true, showNav: false, showChat: false });
        });
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
        next();
    },
    destroyed() {
    }
}
</script>
<style lang="less">
@import './../../../tf-ui/styles/common/variables';
.selector-bank .popup-content {
    // padding-top: .88rem;
    .right-item-content {
        width: 100%;
        color: #333;
        padding-left: .2rem;
        text-align: left;
        position: relative;
        .icon-custom-selected {
            float: right;
            color: @btn-primary-bg;
        }
    }
}
</style>
