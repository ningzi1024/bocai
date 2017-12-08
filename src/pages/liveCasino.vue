<template>
  <div class="liveCasino">
    <div class="list boxshadow" v-for="item in list" @click="openGame(item.id)">
      <div class="banner">
        <img v-lazy="item.imgurl" />
        <div class="egamepic-shadow"></div>
      </div>
      <div class="live-text">
        <!-- <div class="game-icon fl"><div class="egamepic-shadow"></div></div> -->

        <span slot="left" :class="['game-icon','game-icon','fl','game-platform-'+item.icon]">
          <tf-icon :name="item.icon2" size=".6rem"></tf-icon>
        </span>
        <tf-icon class="fr play-ico" name="jiantou" size=".48rem" color="#bbb"></tf-icon>
        <div class="egame-glist bfc">
          <h2>{{item.title}}</h2>
          <p>{{item.intr}}</p>
        </div>
      </div>
      <!-- <div class="title">
          <span>{{item.title}}</span>
        </div> -->
    </div>
    <div ref="form"></div>
  </div>
</template>

<script>
import ajaxCommon from "../common/ajaxCommon";
import gvars from "common/GlobalVars";
import gameMixins from "@/common/game.mixins";
export default {
  mixins: [gameMixins],
  data() {
    return {
      list: []
      // isLogin:false
    };
  },
  created() {
    this.list = [
      {
        id: 12,
        imgurl: require("../../static/img/liveCasino-ag-01.jpg"),
        icon: "AGIN-LIVE",
        icon2: "AG",
        title: "AG国际厅",
        intr: "现场360度视角，实时显示输赢排行榜"
      },
      //      {
      //        id:11,
      //        imgurl:"static/img/liveCasino-ag-02.jpg",
      //        title:"AG旗舰厅"
      //      },
      {
        id: 17,
        imgurl: require("../../static/img/liveCasino-mg.jpg"),
        icon: "MG-LIVE",
        icon2: "MG",
        title: "MG国际厅",
        intr: "花花公子主题厅，兔女郎性感火爆"
      },
      {
        id: 9,
        imgurl: require("../../static/img/liveCasino-bbing.jpg"),
        icon: "BBIN-LIVE",
        icon2: "BBIN",
        title: "波音厅",
        intr: "体验多桌同时投注，让您乐在其中"
      }
    ];
  },
  methods: {
    //打开游戏入口
    openGame(id) {
      if (!id) return;
      if (id == 9) {
        this.openBBin(3, !this.isLogin);
      } else if (id == 17) {
        this.playGame({
          trys: false,
          Gtype: 17,
          code: "mgLiveGame",
          IsHtml5: false
        });
      } else {
        this.openAGLiveCasino(id, !this.isLogin);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("setSiteConfig", {
        title: "真人娱乐",
        showMenu: true,
        showBack: false,
        showNav: true,
        showChat: true
      });
    });
  }
};
</script>

<style scoped lang="less">
.liveCasino {
  position: relative;
  margin-bottom: -0.4rem;
  img[lazy="error"],
  img[lazy="loading"] {
    display: block;
    margin: 0 auto;
    height: 2rem;
    width: auto !important;
  }
  .list {
    /*width:96%;
    margin:0.2rem 0 0 2%;*/
    width: 100%;
    margin-bottom: 0.2rem;
    padding-bottom: 0.24rem;
    background: #fff;
    overflow: hidden;
    position: relative;
    .banner {
      width: 100%;
      padding: 0.18rem 0.14rem 0.24rem 0.14rem;
      img {
        overflow: hidden;
        clear: both;
        width: 100%;
        margin: 0 0%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      }
    }

    .live-text {
      width: 100%;
      padding: 0.04rem 2% 0.08rem 2%;
      .game-icon {
        // display: ;
        width: 0.88rem;
        height: 0.88rem;
        line-height: 0.88rem;
        border-radius: 40%;
        text-align: center;
        margin-right: 0.24rem;
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
      .play-ico {
        margin-top: 0.2rem;
      }
      h2 {
        font-size: 0.26rem;
        font-weight: 500;
        color: #444;
        margin-top: 0.06rem;
      }
      p {
        font-size: 0.22rem;
        margin-top: 0.06rem;
        color: #ccc;
      }
    }

    /*.title{
      width:100%;
      text-align: center;
      position: absolute;
      height:0.48rem;
      bottom:0;
      left:0;
      line-height:0.5rem;
      background: #222;
      opacity: 0.85;
      span{
        color: #fff;
      }
    }*/
  }
}
</style>
