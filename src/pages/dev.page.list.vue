<template>
    <div class="list">
        <router-link to="/">
            <button>首页</button>
        </router-link>
        <router-link to="/signup">
            <button>注册</button>
        </router-link>
        <router-link to="/login">
            <button>登录</button>
        </router-link>
        <router-link to="/download">
            <button>客户端下载</button>
        </router-link>
        <router-link to="/viprank">
            <button>客户端下载</button>
        </router-link>
        <router-link to="/e-games">
            <button>客户端下载</button>
        </router-link>
        <router-link to="/specialOffer">
            <button>客户端下载</button>
        </router-link>
        <button @click="click">测试打开窗体</button>
        <button @click="popup=true">测试打开窗体</button>
        <tf-popup v-model="popup" contentClass="grayBG" position="right" width="100%">
            <tf-layout>
                <tf-navbar :fixed="true" slot="navbar" fontsize=".3rem" title="请选择银行">
                    <a @click="popup=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <p style="line-height:1rem;font-size:50px;">
                    12232<br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/>12232<br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/>12232<br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/> 12232
                    <br/>

                </p>
                <button @click="popup=false">测试打开窗体</button>
            </tf-layout>
        </tf-popup>

    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            popup: false
        }
    },
    methods: {
        click() {
            let win = window.open("static/loading.html");
            win.document.write(`<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body onload='document.post_form.submit();'><form id='post_form' name='post_form' method=post action='https://777.bbingames.net' ><input name=uid  type='hidden' value='7e1bd83721f50c6f0c5800f344b9444a441722ef'><input name=langx type='hidden' value='zh-cn'><input name=page_site type='hidden' value='game'></form></body></html>`);
            win.document.forms[0].submit()
        }
    }
}
</script>
<style scoped>
.list {
    padding: 10px 5px;
}
</style>


