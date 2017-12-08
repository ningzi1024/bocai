
import Vue from 'vue'
import App from './App'
import store from "./store"
import router from './router'
// import "./assets/fonts/material-icons.css"
// import 'muse-components/styles/base.less' // 加载基础的样式
// import 'babel-polyfill'
//屏幕适配
import adapterScreen from "./common/AdapterScreen.js"
//加载原生支持
import native from "./common/native-support"
import payFactory from "@/api/pay.factory"
//懒加载图片
import lazyLoad from "@/components/lazyload"
//手势插件
import AlloyFinger from "alloyfinger/alloy_finger"
import AlloyFingerVue from "alloyfinger/vue/alloy_finger.vue.js"

import config from "./common/evn.config"

import './tf-ui/styles/base.less';
import { NavBar, NavBarBackIcon, NavBarNextIcon } from './tf-ui/components/navbar';
import { TabBar, TabBarItem } from './tf-ui/components/tabbar';
import { Icons } from './tf-ui/components/icons';
import { Layout } from './tf-ui/components/layout';
import { CellGroup, CellItem } from './tf-ui/components/cell';
import { Confirm, Alert, Toast, Notify, Loading } from './tf-ui/components/dialog';
import { Input } from './tf-ui/components/input';
import { Button, ButtonGroup } from './tf-ui/components/button';
import { Popup } from './tf-ui/components/popup';
import { Badge } from './tf-ui/components/badge';
import { CitySelect } from './tf-ui/components/cityselect';
import { ProgressBar } from './tf-ui/components/progressbar';
import FastClick from "fastclick"

document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body);
}, false);

import gMixins from "./common/global.mixins"

Vue.component(Icons.name, Icons);
Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);
Vue.component(TabBar.name, TabBar);
Vue.component(TabBarItem.name, TabBarItem);
Vue.component(Layout.name, Layout);
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(Popup.name, Popup);
Vue.component(Badge.name, Badge);
Vue.component(CitySelect.name, CitySelect);
Vue.component(ProgressBar.name, ProgressBar);


Vue.prototype.$confirm = Confirm;
Vue.prototype.$alert = Alert;
Vue.prototype.$toast = Toast;
Vue.prototype.$notify = Notify;
Vue.prototype.$loading = Loading;
Vue.prototype.$payFactory = payFactory;
Vue.prototype.$native = native;

Vue.mixin(gMixins);
Vue.use(AlloyFingerVue, {
  AlloyFinger
})

let _vue;
// Vue.use(lazyLoad)

Vue.use(lazyLoad, {
  preLoad: 1.3,
  error: config.static + 'static/img/loading.gif',
  loading: config.static + 'static/img/loading.gif',
  attempt: 1
})
router.beforeEach((route, redirect, next) => {
  // console.log(_vue.$confirm)
  /* 显示加载中动画 */
  store.commit('setRouterLoading', true);
  store.commit('setUrlFrom', redirect.name);

  next();
});

router.afterEach(route => {
  /* 隐藏加载中动画 */
  store.commit('setRouterLoading', false);
});

adapterScreen();
/* eslint-disable no-new */
_vue = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  data: {
    bus: new Vue()
  }
})
// require("../static/css/XINSlotEvent.css")




