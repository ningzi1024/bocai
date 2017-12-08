<!--
* 游戏试玩
-->
<template>
    <div class="tb-live boxshadow">
        <div class="tb-livept">
            <div class="fl"><div class="tb-liveico game-platform-SW"><tf-icon name="SW" size=".6rem"></tf-icon></div>
            <div class="fl"><h2>SW厅</h2><p>突破极限  博出精彩</p></div></div>
            <div class="fr" @click="$router.push('/eplatform/22')"><div class="btn-link">试玩游戏</div></div>
        </div>
        <div class="tb-livept">
            <div class="fl"><div class="tb-liveico game-platform-MG"><tf-icon name="MG" size=".6rem"></tf-icon></div>
            <div class="fl"><h2>MG国际厅</h2><p>劲爆刺激  大奖不断</p></div></div>
            <div class="fr"  @click="$router.push('/eplatform/17')"><div class="btn-link">试玩游戏</div></div>
        </div>
        <div class="tb-livept">
            <div class="fl"><div class="tb-liveico game-platform-TTG"><tf-icon name="TTG" size=".6rem"></tf-icon></div>
            <div class="fl"><h2>TTG厅</h2><p>随时随地 自由畅玩</p></div></div>
            <div class="fr" @click="$router.push('/eplatform/18')"><div class="btn-link">试玩游戏</div></div>
        </div>
        <div class="tb-livept">
            <div class="fl"><div class="tb-liveico game-platform-AG"><tf-icon name="AG" size=".6rem"></tf-icon></div>
            <div class="fl"><h2>AG国际厅</h2><p>精彩游戏  激情动感</p></div></div>
            <div class="fr" @click="openAGLiveCasino(12, true);"><div class="btn-link" >试玩游戏</div></div>
        </div>
        <div class="tb-livept">
            <div class="fl"><div class="tb-liveico game-platform-GG"><tf-icon name="GG" size=".6rem"></tf-icon></div>
            <div class="fl"><h2>GG捕鱼</h2><p>全民捕鱼  欢乐连连</p></div></div>
            <div class="fr"  @click="openFishGame(20,101,true)"><div class="btn-link">试玩游戏</div></div>
        </div>
        <div class="tb-livept">
            <div class="fl"><div class="tb-liveico game-platform-DT"><tf-icon name="DT" size=".6rem"></tf-icon></div>
            <div class="fl"><h2>DT厅</h2><p>激情PK  让热血再次燃烧</p></div></div>
            <div class="fr" @click="$router.push('/eplatform/21')"><div class="btn-link" >试玩游戏</div></div>
        </div>
        <!-- <div class="tb-livept">
            <div class="fl"><div class="tb-liveico game-platform-BBIN"><tf-icon name="BBIN" size=".6rem"></tf-icon></div>
            <div class="fl"><h2>波音厅</h2><p>亚洲最受欢迎的娱乐场</p></div></div>
            <div class="fr" @click="openBBin(3, true)"><div class="btn-link">试玩游戏</div></div>
        </div> -->
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import gameMixins from "@/common/game.mixins";
export default {
  mixins: [gameMixins],
  components: {},
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
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: "游戏试玩",
        showMenu: false,
        showBack: true,
        showNav: false,
        showChat: false
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // this.store.commit(setSiteConfig, { showBack: false, showNav: true });
    next();
  },
  computed: {},
  destroyed() {}
};
</script>
<style lang="less">
.tb-live {
  width: 100%;
  overflow: hidden;
  background: #fff;
  margin-top: 0rem;
  position: relative;
  margin-bottom: -0.3rem;
}

.tb-livept {
  width: auto;
  overflow: hidden;
  clear: both;
  margin: 0 0.2rem;
  border-bottom: 1px solid #f4f4f4;
  padding: 0.28rem 0;
  &:last-child {
    border-bottom: none;
  }
  > .fl {
    .tb-liveico {
      float: left;
      width: 1.08rem;
      height: 1.08rem;
      line-height: 1.08rem;
      border-radius: 16px;
      text-align: center;
      color: #666;
      margin-top: 2px;
      margin-right: 0.24rem;
      filter: sepia(0.15);
      -webkit-filter: sepia(0.1);
      -moz-filter: sepia(0.1);
      -o-filter: sepia(0.1);
      -ms-filter: sepia(0.1);
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
    > .fl {
      h2 {
        font-weight: 400;
        font-size: 0.26rem;
        color: #111;
        line-height: 0.36rem;
        margin-top: 0.2rem;
      }
      p {
        font-size: 0.24rem;
        color: #ccc;
        margin-top: 0.1rem;
        line-height: 0.32rem;
      }
    }
  }
}
.btn-link {
  display: inline-block;
  text-align: center;
  margin-top: 0.24rem;
  font-size: 0.24rem;
  height: 0.64rem;
  line-height: 0.64rem;
  color: #fff;
  width: 1.68rem;
  padding: 0;
  border-radius: 0.34rem;
  background-image: linear-gradient(to bottom, #ff2549, #ff9280);
  box-shadow: 0 2px 8px rgba(200, 0, 0, 0.2);
  filter: sepia(0.1);
  -webkit-filter: sepia(0.1);
  -moz-filter: sepia(0.1);
  -o-filter: sepia(0.1);
  -ms-filter: sepia(0.1);
}
</style>
