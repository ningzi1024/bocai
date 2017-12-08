<!--
* 捕鱼游戏
-->
<template>
<div class="container">
  <!--捕鱼游戏-->
  <div class="tb-buyu boxshadow">
      <div class="tb-buyupic" @click="$router.push('/fishgame')">
        <img src="../assets/image/Fish-banner-a.jpg">
        <div class="egamepic-shadow"></div>
      </div>
      <div class="tb-title" ><label>随时随地 轻松畅玩</label></div>
      <div class="tb-newegame">
      <tf-flexbox>
          <tf-flexbox-item @click.native="openFishGame(11,6,false)" >
              <div class="tb-Negame"><img src="../assets/image/Fish-pt-ag.jpg"><div class="egamepic-shadow"></div></div>
              <h2 class="ov-h">捕鱼王二代</h2>
              <p>AG国际厅</p>
          </tf-flexbox-item>
          <tf-flexbox-item @click.native="openFishGame(20,101,false)">
              <div class="tb-Negame"><img src="../assets/image/Fish-pt-gg.jpg"><div class="egamepic-shadow"></div></div>
              <h2 class="ov-h">捕鱼天下</h2>
              <p>GG厅</p>
          </tf-flexbox-item>
          <tf-flexbox-item @click.native="playGame({trys:false,Gtype:22,code:'sw_fufish-jp'})">
              <div class="tb-Negame"><img src="../assets/image/Fish-pt-swdf.jpg"><div class="egamepic-shadow"></div></div>
              <h2 class="ov-h">捕鱼多福奖池</h2>
              <p>SW厅</p>
          </tf-flexbox-item>
      </tf-flexbox>

      <tf-flexbox>
          <tf-flexbox-item @click.native="playGame({trys:false,Gtype:22,code:'sw_fufish_intw'})" >
              <div class="tb-Negame"><img src="../assets/image/Fish-pt-sw.jpg"><div class="egamepic-shadow"></div></div>
              <h2 class="ov-h">捕鱼多福</h2>
              <p>SW厅</p>
          </tf-flexbox-item>
          <tf-flexbox-item @click.native="playGame({trys:false,Gtype:9,code:30})">
              <div class="tb-Negame"><img src="../assets/image/Fish-pt-bbin01.jpg"><div class="egamepic-shadow"></div></div>
              <h2 class="ov-h">捕鱼达人</h2>
              <p>波音厅</p>
          </tf-flexbox-item>
          <tf-flexbox-item @click.native="playGame({trys:false,Gtype:9,code:38})">
              <div class="tb-Negame"><img src="../assets/image/Fish-pt-bbin02.jpg"><div class="egamepic-shadow"></div></div>
              <h2 class="ov-h">捕鱼大师</h2>
              <p>波音厅</p>
          </tf-flexbox-item>
      </tf-flexbox>
      </div>
  </div>
</div>
</template>
<script>
import { mapMutations } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import gameMixins from "@/common/game.mixins";

import { Slider, SliderItem } from "@/tf-ui/components/slider";
import { FlexBox, FlexBoxItem } from "@/tf-ui/components/flexbox";

export default {
  mixins: [gameMixins],
  components: {
    [Slider.name]: Slider,
    [SliderItem.name]: SliderItem,
    [FlexBox.name]: FlexBox,
    [FlexBoxItem.name]: FlexBoxItem
  },
  data() {
    return {};
  },
  methods: {
    //获取mutation
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig"
    ])
  },
  created() {},
  mounted() {},
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: "捕鱼游戏",
        showMenu: true,
        showBack: false,
        showNav: true,
        showChat: true,
        //cssClass: "fish-header"
      });
    });
  },
  computed: {},
  destroyed() {}
};
</script>
<style scoped lang="less">
.container{
  position: relative;
  margin-bottom: -.5rem;
  .tb-buyu {
    width: 100%;
    overflow: hidden;
    background: #fff;
    .tb-buyupic {
      width: auto;
      margin: .16rem 2% 0rem 2%;
      /*margin:0 0 0rem 0;*/
      box-shadow: 1px 2px 12px rgba(0, 100, 255, 0.1);
      position: relative;
      border-radius:0px;
      overflow: hidden;
      z-index: 3;
      img {
        width: 100%;
        filter: sepia(0.15);
        -webkit-filter: sepia(0.15);
        -moz-filter: sepia(0.15);
        -o-filter: sepia(0.15);
        -ms-filter: sepia(0.15);
      }
      .egamepic-shadow {
        position: absolute;
        height: 40%;
        width: 100%;
        left: 0;
        bottom: 0;
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, .12) 100%
        );
      }
    }
  }

  .btn-link {
    display: inline-block;
    text-align: center;
    margin-top: .12rem;
    font-size: 0.24rem;
    height: 0.64rem;
    line-height: 0.64rem;
    color: #fff;
    width: 1.68rem;
    padding: 0;
    border-radius: 0.3rem;
    background-image: linear-gradient(to bottom, #ff2549, #ff9280);
    box-shadow: 0 2px 8px rgba(200, 0, 0, 0.2);
  }
  .tb-title {
    width: 100%;
    margin:0rem 0 0 0%;
    text-align:center;
    /*border-bottom: 1px solid #f5f5f5;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);*/
    > label {
      display: inline-block;
      font-size: 0.3rem;
      height: 0.28rem;
      line-height: 0.32rem;
      margin: .22rem 0 .12rem 0;
      color: #444;
      font-weight: 400;
      background-image: -webkit-gradient(linear, 0 0, 100% 100%, from(#09f), to(#0cf));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 1px 1px 2px rgba(0,155,255,.25);
      opacity: .8;
      /*padding-left: 0.16rem;
      border-left: 4px solid #06f;*/

    }
  }



.tb-newegame {
    overflow: hidden;
    padding-bottom: .1rem;
    .flexbox-item {
      text-align: center;
      .tb-Negame {
        width: 1.5rem;
        height: 1.5rem;
        background: #fff;
        box-shadow: 2px 2px 12px rgba(15, 55, 120, 0.25);
        margin: 0.24rem auto 0rem auto;
        overflow: hidden;
        border-radius: 16px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          margin: 0;
        }
        .egamepic-shadow {
          position: absolute;
          height: 50%;
          width: 100%;
          left: 0;
          bottom: 0;
          background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
      }
      h2 {
        color: #444;
        font-weight: 400;
        font-size: 0.24rem;
        line-height: 0.36rem;
        margin-top: .1rem;
      }
      p {
        font-size: 0.22rem;
        color: #bbb;
        padding-bottom: .1rem;
      }
    }
  }


}
</style>
