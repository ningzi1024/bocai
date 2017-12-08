<!--
* 电子游艺平台
-->
<template>
    <div class="container">
        <div ref="fixedwrap" class="fixed-wrap">
            <tf-flexbox class="header boxshadow">
                <tf-flexbox-item>
                    <div @click="groupClick('all')" :class="{'groupitem':true, 'active':current==='all'}">
                        全部游戏
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div @click="groupClick('new')" :class="{'groupitem':true, 'active':current==='new'}">
                        最新上线
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div @click="cacegroy.show=true" :class="{'groupitem':true, 'active':current.indexOf('category') !=-1}">
                        选择分类
                        <tf-icon name="right-copy" color="#aaa" style="padding-left:.04rem;" size=".22rem"></tf-icon>
                    </div>
                </tf-flexbox-item>
                <tf-flexbox-item>
                    <div @click="groupClick('favorite')" :class="{'groupitem':true, 'active':current==='favorite'}">
                        我的收藏
                        <tf-icon name="like" color="#ff3a2b" style="padding-right:.08rem;" size=".22rem"></tf-icon>
                    </div>
                </tf-flexbox-item>
            </tf-flexbox>
            <div class="search-warp">
                <div class="input-style" @click="isShowSearch=true;">
                    <tf-flexbox>
                        <tf-flexbox-item class="egame-query">
                            输入想找的游戏名称
                        </tf-flexbox-item>
                        <tf-icon size=".4rem" color="#ccc" name="fangdajing"></tf-icon>
                    </tf-flexbox>
                </div>
            </div>
        </div>
        <!-- <div class="gamelist boxshadow" :style="{'padding-top':listPaddingtop+'px'}"> -->
        <div ref="gamelist" class="gamelist boxshadow">
            <tf-flexbox v-if="resultGames.length" v-for="(game,index) in resultGames" v-bind:key="game.code"  style="width:100%;">
                <tf-icon @click.native="heartClick(game,index)" name="like" :color="game.like?'#ff3a2b':'#e8e8e8'" size=".44rem"></tf-icon>
                <div class="game-icon"><img v-lazy="imgRoot + platformInfo.item_icon_root + '/' + game.Code+'.png'"><div class="egamepic-shadow"></div></div>
                <tf-flexbox-item class="egame-glist">
                    <h2>{{game.CNName}}</h2>
                </tf-flexbox-item>
                <tf-button v-if="!isLogin && platformID!='15'" class="try-game" @click.native="playGame({'trys':true,'Gtype':platformID,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)" type="hollow">试玩</tf-button>
                <tf-button class="play-game" @click.native="playGame({'trys':false,'Gtype':platformID,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)">开始游戏</tf-button>
            </tf-flexbox>
        </div>
        <tf-actionsheet :items="cacegroy.list" v-model="cacegroy.show"></tf-actionsheet>
        <tf-popup v-model="isShowSearch" :useLock="false" contentClass="grayBG" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar slot="navbar" fontsize=".3rem" title="搜索">
                    <a @click="isShowSearch=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div class="search-warp" style="top: 0;">
                    <div class="input-style">
                        <tf-flexbox>
                            <tf-flexbox-item class="grayColor">
                                <input type="text" v-model="sear_keyword" placeholder="请输入您想要查找的游戏">
                            </tf-flexbox-item>
                            <tf-icon size=".4rem" color="#ccc" name="fangdajing"></tf-icon>
                        </tf-flexbox>
                    </div>
                </div>
                <div class="gamelist" style="border-bottom: none;background-color:#fff;padding-top: 0;">
                    <div class="platfrom-induce-item">
                        <tf-flexbox v-for="game in search_result" v-bind:key="game.Code" style="width:100%;">
                            <div class="game-icon">
                                <img v-lazy="imgRoot+platformInfo.item_icon_root+'/' + game.Code+'.png'">
                                <div class="egamepic-shadow"></div>
                            </div>
                            <tf-flexbox-item class="egame-glist">
                                <h2>{{game.CNName}}</h2>
                            </tf-flexbox-item>
                            <tf-button v-if="!isLogin && platformID!='15'" class="try-game" @click.native="playGame({'trys':true,'Gtype':platformID,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)" type="hollow">试玩</tf-button>
                            <tf-button class="play-game" @click.native="playGame({'trys':false,'Gtype':platformID,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)">开始游戏</tf-button>
                        </tf-flexbox>
                    </div>
                </div>
            </tf-layout>
        </tf-popup>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import gameMixins from "@/common/game.mixins";
import { platformKV } from "@/common/games.platform";
import gameCache from "@/common/games.cache";
import underscore from "underscore";
import game from "@/api/game";

import { FlexBox, FlexBoxItem } from "@/tf-ui/components/flexbox";
import { ActionSheet } from "@/tf-ui/components/actionsheet";
export default {
  mixins: [gameMixins],
  components: {
    [FlexBox.name]: FlexBox,
    [FlexBoxItem.name]: FlexBoxItem,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      isShowSearch: false,
      platformID: null,
      platformInfo: {},
      titleName: "",
      current: "",
      cacegroy: {
        show: false,
        value: null,
        list: []
      },
      cacegroyValue: null,
      allGames: [],
      resultGames: [],
      favoriteList: [],
      listPaddingtop: 0,
      search_result: [],
      sear_keyword: "",
      isSearching: false
    };
  },
  watch: {
    current: function(value) {
      let source = underscore.chain(this.allGames);
      switch (value) {
        case "all":
          this.resultGames = source.value();
          break;
        case "new":
          this.resultGames = source.where({ New: 1 }).value();
          break;
        case "favorite":
          if (this.isLogin) this.resultGames = this.favoriteList;
          break;
        default:
          if (value.indexOf("category") != -1 && this.cacegroyValue !== null) {
            this.resultGames = source
              .filter(item => item.Category == this.cacegroyValue.ID)
              .value();
          } else {
            this.resultGames = this.allGames;
          }
          break;
      }
    },
    sear_keyword(value) {
      // debugger
      if (value.length > 0) {
        if (!this.isSearching) {
          this.isSearching = true;
          this.search_result = this.allGames.filter(
            item => item.CNName.indexOf(value) != -1
          );
          this.isSearching = false;
        }
      } else {
        this.search_result = [];
      }
    }
  },
  methods: {
    //获取mutation
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig"
    ]),
    //获取登录状态
    // getLoginStatu() {
    //     api[apiNames.LoginState]().then(rep => {
    //         let data = rep.data;
    //         this.getGames();
    //         if (data.Status === 1) {
    //             if (data.row === "Successed") {
    //                 this.isLogin = true;
    //                 this.getFavorite();
    //             }
    //         }
    //     }).catch(err => {

    //     })
    // },
    // 点击收藏
    heartClick(value, index) {
      //未登录，
      if (this.isLogin) {
        this.$loading.open();
        if (value.like === true) {
          //取消收藏
          game[apiNames.DeleteGameFavorite]({ GameID: value.ID })
            .then(rep => {
              let data = rep.data;
              if (data.Status === 1) {
                if (data.row === "Successed") {
                  this.getFavorite();
                  value.like = false;
                  this.$set(this.resultGames, index, value);
                  this.$notify({
                    mes: "已取消收藏",
                    timeout: 1000,
                    callback: () => {}
                  });
                }
              } else {
                this.sysErrCheck(data.Status).then(canrun => {
                  if (canrun) {
                    this.alert({ mes: data.CNMessage });
                  }
                });
              }
            })
            .catch(err => {
              this.sysErrCheck(-9);
            });
        } else {
          //添加收藏
          game[apiNames.AddGameFavorite]({ GameID: value.ID })
            .then(rep => {
              let data = rep.data;
              if (data.Status === 1) {
                if (data.row === "Successed") {
                  this.getFavorite();
                  value.like = true;
                  this.$set(this.resultGames, index, value);
                  this.$notify({
                    mes: "收藏成功",
                    timeout: 1000
                  });
                }
              } else {
                this.sysErrCheck(data.Status).then(canrun => {
                  if (canrun) {
                    this.alert({ mes: data.CNMessage });
                  }
                });
              }
            })
            .catch(err => {
              this.sysErrCheck(-9);
            });
        }
      } else {
        this.confirm({
          title: "未登录或登录超时",
          mes: "请您登录，再进行操作！",
          icon: "warn",
          opts: [
            {
              txt: "知道了",
              color: false,
              callback: () => {
                // this.goHome();
              }
            },
            {
              txt: "前往登录",
              color: true,
              callback: () => {
                this.goLogin();
              }
            }
          ]
        });
      }
    },
    //获取游戏
    getGames() {
      this.$loading.open();
      gameCache
        .getGameList(this.platformID)
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            this.allGames = data.row.GameList;
            this.current = "all";
            // if (!this.isLogin) this.current = "all"
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    },
    //分类点击
    groupClick(name) {
      if (name === "favorite") {
        if (!this.isLogin) {
          this.confirm({
            title: "未登录或登录超时",
            mes: "请您登录，再进行操作！",
            icon: "warn",
            opts: [
              {
                txt: "知道了",
                color: false,
                callback: () => {
                  // this.goHome();
                }
              },
              {
                txt: "前往登录",
                color: true,
                callback: () => {
                  this.goLogin();
                }
              }
            ]
          });
        } else {
          this.getFavorite(true);
        }
      } else {
        this.current = name;
      }
    },
    //获取平台分类
    getCategory() {
      this.$loading.open();
      gameCache
        .getCategory(this.platformID)
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            this.getGames();
            data.row.forEach(item => {
              this.cacegroy.list.push({
                label: item.CNName,
                method: () => {
                  this.current = "category_" + item.ID;
                  this.cacegroyValue = item;
                }
              });
            });
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    },
    //获取收藏
    getFavorite(fresh) {
      this.$loading.open();
      game[apiNames.GetGameFavorite]({
        GameType: this.platformID,
        IsMobile: true
      })
        .then(rep => {
          this.$loading.close();
          let data = rep.data;
          if (data.Status === 1) {
            data.row.forEach(item => {
              item.like = true;
              //更新源数据like
              this.allGames.forEach(game => {
                if (game.ID === item.ID) {
                  game.like = true;
                  // this.$set(this.allGames.)
                }
              });
            });
            this.favoriteList = data.row;
            if (fresh) {
              this.current = "favorite";
            }
            //跟新到本地缓存
            if (this.current === "") this.current = "all";
          } else {
            this.sysErrCheck(data.Status).then(canrun => {
              if (canrun) {
                this.alert({ mes: data.CNMessage });
              }
            });
          }
        })
        .catch(err => {
          this.$loading.close();
          this.sysErrCheck(-9);
        });
    }
  },
  created() {
    this.$loading.open();
    // this.getLoginStatu();
    if (this.$route.params.id) {
      this.platformID = this.$route.params.id;
      this.platformInfo = platformKV[this.platformID];
      this.titleName = this.platformInfo.dyname;
      this.getCategory();
    }
    if(this.$route.params.back){
      this.$store.commit("setSiteConfig", {
        title: this.titleName,
        showMenu: false,
        showBack: true,
        showNav: false,
        showChat: false,
        backname:this.$route.params.back
      });
    }
  },
  mounted() {
    // this.listPaddingtop = document
    //   .querySelectorAll(".fixed-wrap")[0]
    //   .getBoundingClientRect().height;
    if (document.documentElement.classList.contains("ios")) {
      this.lockRootScrool();
      let list = this.$refs.gamelist;
      let fixed = this.$refs.fixedwrap;
      list.style.overflow = "auto";
      list.style.height = this.getRootScrollHeight()+ "px";
      console.log(
        this.getRootScrollHeight());
    }
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: vm.titleName,
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
  destroyed() {
    if (document.documentElement.classList.contains("ios")) {
      this.unlockRootScrool();
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .fixed-wrap {
    position: fixed;
    width: 100%;
    height: 1.9rem;
    z-index: 199;
    background: #f5f5f5;
  }
  .search-warp {
    // top: 0.88rem;
    position: relative;
    z-index: 3;
    box-sizing: border-box;
    width: 100%;
    height: 1.08rem;
    padding: 0.2rem 0.24rem 0rem 0.24rem;
    background: #f5f5f5;
    .input-style {
      width: 100%;
      height: 0.68rem;
      background-color: #fff;
      border: 1px solid #f2f2f2;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.02);
      border-radius: 4px;
      input {
        width: 100%;
        border: none;
        font-size: 0.26rem;
        padding-left: 0.15rem;
        background: transparent;
        color: #555;
        align-items: center;
        text-align: left;
        /* fuck UC */
      }
      .icon-fangdajing {
        padding: 0.1rem;
      }
    }
  }
  .header {
    width: 100%;
    margin-top: 0;
    background-color: #fff;
    // position: fixed;
    z-index: 4;
    .groupitem {
      box-sizing: border-box;
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.24rem;
      color: #666;
      text-align: center;
      &.active {
        color: #f01924;
        border-bottom: solid 4px #ff3a2b;
      }
    }
  }
  .flexbox-item {
  }
  .gamelist {
    padding-top: 1.9rem;
    background-color: #fff;
    .m-flexbox {
      padding-top: 0.28rem;
      padding-bottom: 0.28rem;
      padding-left: 0.2rem;
      &.m-flexbox:not(:last-child) {
        border-bottom: #f6f6f6 1px solid;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.025);
      }
      .game-icon {
        width: 1.24rem;
        height: 1.24rem;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        border-radius: 18px;
        border: 1px solid #e6e6e6;
        box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.12);
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          margin: 0;
        }
        .egamepic-shadow {
          position: absolute;
          height: 60%;
          width: 100%;
          left: 0;
          bottom: 0;
          background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.7) 100%
          );
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
      }
      .try-game,
      .play-game {
        font-size: 0.22rem;
        margin-right: 0.22rem;
        height: 0.6rem;
        width: 1.46rem;
        padding: 0;
        border-radius: 0.34rem;
        background-image: linear-gradient(to bottom, #ff2549, #ff9280);
        box-shadow: 0 2px 8px rgba(200, 0, 0, 0.2);
      }
      .try-game {
        border: 1px solid #bcd4f5;
        color: #75a4e5;
        box-sizing: border-box;
        margin-right: 0.15rem;
        background-image: linear-gradient(to bottom, #f9fbfe, #eef4fb);
        box-shadow: 0 2px 8px rgba(92, 161, 255, 0.2);
      }
      .egame-glist {
        overflow: hidden;
        h2 {
          color: #333;
          font-weight: 500;
          font-size: 0.24rem;
        }
        p {
          color: #ccc;
          font-size: 0.22rem;
        }
      }
    }
  }
  .egame-query {
    color: #bbb;
    font-size: 0.24rem;
    padding-left: 5px;
  }
}
</style>
