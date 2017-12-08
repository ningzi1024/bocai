<!--
* 首页
-->
<template>
    <div class="index-wrap">
        <div class="tb-nav"></div>
        <!--banner幻灯片-->
        <div class="banner">
            <tf-slider autoplay="5000">
                <tf-slider-item>
                    <a href="#">
                        <img src="../assets/image/mob-index-banner01.jpg">
                    </a>
                </tf-slider-item>
                <tf-slider-item>
                    <a href="#">
                        <img src="../assets/image/mob-index-banner02.jpg">
                    </a>
                </tf-slider-item>
                <tf-slider-item>
                    <a href="#">
                        <img src="../assets/image/mob-index-banner03.jpg">
                    </a>
                </tf-slider-item>
            </tf-slider>
            <div class="notice-wrap">
                <tf-icon name="comiisgonggao" class="icon-laba" size=".3rem"></tf-icon>
                <marquee behavior="scroll" align="left" scrollamount=4 marquee-speed=0 direction="left">
                    <span class="notice-scroll-text">
                        <span v-for="value in notice" v-bind:key="value.Text" class="content"> {{value.Text}} </span>
                    </span>
                </marquee>
            </div>
        </div>

        <!--第一屏快捷导航-->
        <tf-flexbox class="whiteGB txt-center ptdot2rem boxshadow fastbar">
            <tf-flexbox-item>
                <router-link tag="div" to="/discount">
                    <tf-icon class="fastbar-youhui" name="youhui" size=".4rem"></tf-icon><p>优惠</p>
                </router-link>
            </tf-flexbox-item>
            <tf-flexbox-item>
                <router-link tag="div" to="/download">
                    <tf-icon class="fastbar-xiazai" name="xiazai" size=".4rem"></tf-icon><p>下载</p>
                </router-link>
            </tf-flexbox-item>
            <tf-flexbox-item>
                <div @click="trygame">
                    <tf-icon class="fastbar-xima" name="youxi" size=".41rem"></tf-icon><p>试玩</p>
                </div>
            </tf-flexbox-item>
            <tf-flexbox-item>
                <router-link tag="div" to="/vipPlan">
                    <tf-icon class="fastbar-vip" name="VIP" size=".6rem"></tf-icon><p>VIP特权</p>
                </router-link>
            </tf-flexbox-item>
            <!-- <tf-flexbox-item v-if="isLogin">
                <router-link tag="div" to="/messagelist">
                    <tf-icon class="fastbar-gonggao" name="xiaoxi1" size=".4rem"></tf-icon><p>消息<span v-if="unreadMsg>0" class="msg-number">{{unreadMsg>=100?"..":unreadMsg}}</span></p>
                </router-link>
            </tf-flexbox-item>
            <tf-flexbox-item v-else>
                <router-link tag="div" to="/notice">
                    <tf-icon class="fastbar-gonggao" name="comiisgonggao" size=".4rem"></tf-icon><p>公告</p>
                </router-link>
            </tf-flexbox-item> -->
             <tf-flexbox-item >
                <router-link tag="div" to="/notice">
                    <tf-icon class="fastbar-gonggao" name="comiisgonggao" size=".4rem"></tf-icon><p>公告</p>
                </router-link>
            </tf-flexbox-item>
        </tf-flexbox>

        <!--最新电游-->
        <div class="tb-newegame boxshadow">
            <div class="tb-title"><label>最新电游</label></div>

            <tf-flexbox v-for="(group,index) in newGames" :key="index">                
                <tf-flexbox-item @click.native="playGame({'trys':false,'Gtype':item.GameType,'code':item.Code},$event)" v-for="item in group" :key="item.ID">
                    <div class="tb-Negame"><img v-lazy="item.img"><div class="egamepic-shadow"></div></div>
                    <h2 class="ov-h">{{item.CNName}}</h2>
                    <p>{{item.platform.dyname}}</p>
                </tf-flexbox-item>               
            </tf-flexbox>
        </div>

        <!--电游平台-->
        <div class="tb-egame boxshadow">
            <div class="tb-title"><label>电游平台</label></div>
             <tf-slider class="egame-slider" :stopNaTouch="false" autoplay="5000">
                <tf-slider-item>
                  <div class="scroll-egame-plt" @click="$router.push('/eplatform/15')">
                      <div class="tb-dypt-pic"><img src="../assets/image/tb-pt.jpg"></div>
                        <div class="tb-dypt-text">
                          <div class="left-icon game-platform-PT"><tf-icon name="PT" size=".4rem"></tf-icon></div>
                            <div class="bfc">
                              <h2>PT电游</h2>
                              <p>幸运大奖  等您击爆</p>
                            </div>
                        </div>
                  </div>
                  <div class="scroll-egame-plt" @click="$router.push('/eplatform/17')">
                    <div class="tb-dypt-pic"><img src="../assets/image/tb-mg.jpg"></div>
                    <div class="tb-dypt-text">
                        <div class="left-icon game-platform-MG"><tf-icon name="MG" size=".4rem"></tf-icon></div>
                        <div class="bfc">
                            <h2>MG国际厅</h2>
                            <p>劲爆刺激 大奖不断</p>
                        </div>
                    </div>
                  </div>
                </tf-slider-item>
                    
                <tf-slider-item>
                  <div class="scroll-egame-plt" @click="$router.push('/eplatform/18')">
                    <div class="tb-dypt-pic"><img src="../assets/image/tb-ttg.jpg"></div>
                        <div class="tb-dypt-text">
                            <div class="left-icon game-platform-TTG"><tf-icon name="TTG" size=".4rem"></tf-icon></div>
                            <div class="bfc">
                                <h2>TTG电游</h2>
                                <p>随时畅玩  爆奖不断</p>
                            </div>
                        </div>
                  </div>
                  <div class="scroll-egame-plt" @click="$router.push('/eplatform/12')">
                     <div class="tb-dypt-pic"><img src="../assets/image/tb-ag.jpg"></div>
                        <div class="tb-dypt-text">
                            <div class="left-icon game-platform-AG"><tf-icon name="AG" size=".4rem"></tf-icon></div>
                            <div class="bfc">
                                <h2>AG国际厅</h2>
                                <p>精彩游戏  激情动感</p>
                            </div>
                        </div>
                  </div>
                </tf-slider-item>
                 <tf-slider-item>
                   <div class="scroll-egame-plt" @click="$router.push('/eplatform/21')">
                     <div class="tb-dypt-pic"><img src="../assets/image/tb-dt.jpg"></div>
                        <div class="tb-dypt-text">
                            <div class="left-icon game-platform-DT"><tf-icon name="DT" size=".4rem"></tf-icon></div>
                            <div class="bfc">
                                <h2>DT电游</h2>
                                <p>激情PK  让热血再次燃烧</p>
                            </div>
                        </div>
                   </div>
                   <div class="scroll-egame-plt" @click="openBBin(3, false)">
                     <div class="tb-dypt-pic"><img src="../assets/image/tb-bbin.jpg"></div>
                        <div class="tb-dypt-text">
                            <div class="left-icon game-platform-BBIN"><tf-icon name="BBIN" size=".4rem"></tf-icon></div>
                            <div class="bfc">
                                <h2>波音电游</h2>
                                <p>亚洲最受欢迎的娱乐场</p>
                            </div>
                        </div>
                   </div>
                 </tf-slider-item>
                 <tf-slider-item>
                   <div class="scroll-egame-plt" @click="playGame({trys:false,Gtype:12,code:'YP800'})">
                     <div class="tb-dypt-pic"><img src="../assets/image/tb-py.jpg"></div>
                        <div class="tb-dypt-text">
                            <div class="left-icon game-platform-PY"><tf-icon name="PY" size=".4rem"></tf-icon></div>
                            <div class="bfc">
                                <h2>YP街机</h2>
                                <p>塑造不同凡响的街机体验</p>
                            </div>
                        </div>
                   </div>
                   <div class="scroll-egame-plt" @click="$router.push('/eplatform/22')">
                     <div class="tb-dypt-pic"><img src="../assets/image/tb-sw.jpg"></div>
                        <div class="tb-dypt-text">
                            <div class="left-icon game-platform-SW"><tf-icon name="SW" size=".4rem"></tf-icon></div>
                            <div class="bfc">
                                <h2>SW电游</h2>
                                <p>突破极限  博出精彩</p>
                            </div>
                        </div>
                   </div>
                 </tf-slider-item>
            </tf-slider>
        </div>

        <!--捕鱼游戏-->
        <div class="tb-buyu boxshadow">
            <div class="tb-title" ><label>捕鱼游戏</label></div>
            <div class="tb-buyupic" @click="$router.push('/fishgame')"><img src="../assets/image/tb-buyu.jpg"></div>
            <div class="tb-newegame">
            <tf-flexbox>
                <tf-flexbox-item @click.native="playGame({trys:false,Gtype:22,code:'sw_fufish-jp'})" >
                    <div class="tb-Negame"><img src="../assets/image/Fish-pt-swdf.jpg"><div class="egamepic-shadow"></div></div>
                    <h2 class="ov-h">捕鱼多福奖池</h2>
                    <p>SW厅</p>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="playGame({trys:false,Gtype:22,code:'sw_fufish_intw'})">
                    <div class="tb-Negame"><img src="../assets/image/Fish-pt-sw.jpg"><div class="egamepic-shadow"></div></div>
                    <h2 class="ov-h">捕鱼多福</h2>
                    <p>SW厅</p>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="playGame({trys:false,Gtype:9,code:30})">
                    <div class="tb-Negame"><img src="../assets/image/Fish-pt-bbin01.jpg"><div class="egamepic-shadow"></div></div>
                    <h2 class="ov-h">捕鱼达人</h2>
                    <p>波音厅</p>
                </tf-flexbox-item>
                <tf-flexbox-item  @click.native="playGame({trys:false,Gtype:9,code:38})">
                    <div class="tb-Negame"><img src="../assets/image/Fish-pt-bbin02.jpg"><div class="egamepic-shadow"></div></div>
                    <h2 class="ov-h">捕鱼大师</h2>
                    <p>波音厅</p>
                </tf-flexbox-item>
            </tf-flexbox>
            </div>
            <div class="tb-buyu" style="margin:0;">
                <div class="tb-buyupt">
                    <div class="fl"><div class="tb-buyuico"><img src="../assets/image/Fish-pt-ag.jpg"><div class="egamepic-shadow"></div></div>
                    <div class="fl"><h2>捕鱼王二代</h2><span>AG国际厅</span><p>我的渔场我做主</p></div></div>
                    <div class="fr" @click="openFishGame(11,6,false)"><div class="btn-link" >进入大厅</div></div>
                </div>
                <!-- <div class="tb-buyupt">
                    <div class="fl"><div class="tb-buyuico"><img src="../assets/image/tb-buyu-pt.jpg"><div class="egamepic-shadow"></div></div>
                    <div class="fl"><h2>深海大赢家</h2><span>PT厅</span><p>博财富成人生赢家</p></div></div>
                    <div class="fr" @click="openBBin(3, !isLogin)"><div class="btn-link">进入大厅</div></div>
                </div> -->
                <div class="tb-buyupt">
                    <div class="fl"><div class="tb-buyuico"><img src="../assets/image/Fish-pt-gg.jpg"><div class="egamepic-shadow"></div></div>
                    <div class="fl"><h2>捕鱼天下</h2><span>GG厅</span><p>轻松击爆大奖</p></div></div>
                    <div class="fr" @click="openFishGame(20,101,false)"><div class="btn-link" >进入大厅</div></div>
                </div>
            </div>
        </div>

        <!--真人娱乐-->
        <div class="tb-live boxshadow">
            <div class="tb-title"><label>真人娱乐</label></div>
            
            <div class="tb-livepic" @click="$router.push('/liveCasino')"><img src="../assets/image/tb-live.jpg"></div>
            <div class="tb-livept">
                <div class="fl"><div class="tb-liveico game-platform-AGIN-LIVE"><tf-icon name="AG" size=".72rem"></tf-icon></div>
                <div class="fl"><h2>AG国际厅</h2><p>现场360度视角<br/>实时显示输赢排行榜</p></div></div>
                <div class="fr" @click="openAGLiveCasino(12, false);"><div class="btn-link" >进入大厅</div></div>
            </div>
            <div class="tb-livept">
                <div class="fl"><div class="tb-liveico game-platform-MG-LIVE"><tf-icon name="MG" size=".72rem"></tf-icon></div>
                <div class="fl"><h2>MG国际厅</h2><p>兔女郎现场互动<br/>畅享刺激的游戏体验</p></div></div>
                <div class="fr" @click="playGame({trys: false,Gtype: 17,code: 'mgLiveGame',IsHtml5: false})"><div class="btn-link" >进入大厅</div></div>
            </div>
            <div class="tb-livept">
                <div class="fl"><div class="tb-liveico game-platform-BBIN-LIVE"><tf-icon name="BBIN" size=".72rem"></tf-icon></div>
                <div class="fl"><h2>波音厅</h2><p>体验多桌同时投注<br/>让您乐在其中</p></div></div>
                <div class="fr" @click="openBBin(3, false)"><div class="btn-link">进入大厅</div></div>
            </div>
        </div>

        <!--体育赛事-->
        <div class="tb-live boxshadow">
            <div class="tb-title"><label>体育赛事</label></div>
            <!-- <div class="tb-livepic"><img src="static/img/liveCasino-ag-01.jpg"></div> -->
            <div class="tb-livept">
                <div class="fl"><div class="tb-liveico game-platform-yu"><tf-icon name="BBIN" size=".72rem"></tf-icon></div>
                <div class="fl"><h2>波音体育</h2><p>赛事多多<br/>超高水位的奖金，万众瞩目的实况</p></div></div>
                <div class="fr" @click="openBBin(0, false)"><div class="btn-link">进入大厅</div></div>
            </div>
        </div>       
    </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import api from "@/api/User";
import apiNames from "@/api/API.list";
import gameMixins from "@/common/game.mixins";
import { platformKV } from "../common/games.platform";
import config from "../common/evn.config";
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
    return {
      notice: [],
      newGames: [],
      platformScroll: {
        style: {
          transform: "translate3d(0,0,0)",
          "transition-duration": "0ms"
        },
        x: 0,
        s_x: 0
      }
    };
  },
  methods: {
    //获取mutation
    ...mapMutations([
      "setTitle",
      "setShowNav",
      "setShowHeader",
      "setSiteConfig",
      "setUser",
      "setNoticeNum"
    ]),
    getNotice() {
      api[apiNames.GetAnno]()
        .then(rep => {
          let data = rep.data;
          if (data.Status === 1) {
            this.notice = data.row;
            let len = localStorage.getItem("tengbo.notice.number")
              ? localStorage.getItem("tengbo.notice.number")
              : 0;
            this.$store.commit("setNoticeNum", this.notice.length - len);
          } else {
          }
        })
        .catch(err => {});
    },
    GetNewGameList() {
      api[apiNames.GetNewGameList]({IsMobile:true})
        .then(rep => {
          let data = rep.data;
          if (data.Status === 1) {
            if (data.row && data.row.length > 0) {
              let temp = [];
              data.row.forEach((item, index) => {
                item.platform = platformKV[item.GameType];
                item.img =
                  config.imgRoot +
                  platformKV[item.GameType].item_icon_root +
                  "/" +
                  item.Code +
                  ".png";
                temp.push(item);
                if (temp.length >= 4 || index + 1 === data.row.length) {
                  this.newGames.push(temp);
                  temp = [];
                }
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
    },
    egameSlider(e) {
      // console.log(e);
    },
    trygame(){
      if(this.isLogin){
        //对不起，您当前已登录，无法进行游戏试玩
        // this.$alert({mes:"对不起，您当前已登录，无法进行游戏试玩",title:"duibuqo"})
        this.confirm({
                title: "已登录，禁止试玩",
                mes: '对不起，您当前已登录，无法进行游戏试玩！',
                icon: "warn",
                opts: [
                    
                    {
                        txt: "确定",
                        color: true,
                        callback: () => {
                            // if (this.$native.IsNative === true) {
                            //     location.href = "tengbo/login"
                            // } else
                            // this.goLogin();
                        }
                    }
                ]
            })
      }else{
        this.$router.push("/trygames")
      }
    }
  },
  created() {
    console.log(this.isLogin);
    this.getNotice();
    this.GetNewGameList();
  },
  mounted() {},
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 页面进入时触发
    next(vm => {
      //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
      vm.$store.commit("setSiteConfig", {
        title: "腾博会",
        showMenu: true,
        showBack: false,
        showNav: true,
        showChat: true
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
.index-wrap {
  position: relative;
  margin-bottom: -0.3rem;
  > .tb-nav {
    display: block;
    position: absolute;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 10%,
      rgba(0, 0, 0, 0) 100%
    );
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    z-index: 9;
    .flexbox-item {
      color: #fff;
      display: none;
      font-size: 0.26rem;
      &.on {
        color: #f01924;
      }
    }
  }

  > .banner {
    position: relative;
    width: 100%;
    min-height: 3.4rem;
    overflow: hidden;
    .m-slider {
      /*height: 100%;*/
      .slider-pagination {
        bottom: 0.54rem;
      }
      .slider-item img {
        /*height: 3.6rem;*/
      }
    }

    .notice-wrap {
      position: absolute;
      z-index: 3;
      height: 0.5rem;
      width: 100%;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.15) 0%,
        rgba(0, 0, 0, 0.3) 100%
      );
      padding-left: 0.6rem;
      box-sizing: border-box;
      bottom: 0;
      .icon-laba {
        display: inline-block;
        position: absolute;
        height: 100%;
        width: 0.6rem;
        top: 0;
        left: 0;
        line-height: 0.48rem;
        background-image: linear-gradient(
          to bottom,
          rgba(240, 25, 36, 0.15) 0%,
          rgba(240, 25, 36, 0.25) 100%
        );
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
      }
      .notice-scroll-text {
        font-size: 0.22rem;
        line-height: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
        text-align: initial;
        white-space: nowrap;
        .content {
          padding-right: 0.5rem;
        }
      }
    }
  }

  .fastbar {
    i {
      display: inline-block;
      height: 0.76rem;
      width: 0.76rem;
      margin: 0.02rem 0 0.04rem 0;
      box-sizing: border-box;
      border-radius: 44%;
      color: #fff;
      line-height: 0.76rem;
      background: #dcdcdc;
      &:before {
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
      &.fastbar-youhui {
        background-image: linear-gradient(to right bottom, #6b83fa, #caa2fd);
        box-shadow: 1px 2px 10px rgba(107, 131, 250, 0.3);
      }
      &.fastbar-xiazai {
        background-image: linear-gradient(to right bottom, #47c0f5, #3eeac4);
        box-shadow: 1px 2px 10px rgba(71, 192, 245, 0.3);
      }
      &.fastbar-xima {
        background-image: linear-gradient(to right bottom, #ff2549, #ff8080);
        box-shadow: 1px 2px 10px rgba(255, 120, 120, 0.3);
      }
      &.fastbar-vip {
        background-image: linear-gradient(to right bottom, #4d90ff, #87d3ff);
        box-shadow: 1px 2px 10px rgba(80, 155, 255, 0.3);
      }
      &.fastbar-gonggao {
        background-image: linear-gradient(to right bottom, #ff9d0b, #ffdd57);
        box-shadow: 1px 2px 10px rgba(255, 150, 10, 0.3);
      }
    }
    p {
      position: relative;
      line-height: 0.48rem;
      color: #444;
      font-size: 0.24rem;
      height: 0.64rem;
      .msg-number{
        position: absolute;
        display: inline-block;
        margin: -45px 0 0 -5px;
        font-size: .2rem;
        line-height: .32rem;
        height: .3rem;
        min-width: .3rem;
        padding: 0 .12rem;
        background-image:linear-gradient(to right bottom,#f81521,#ff404a);
  box-shadow: 1px 1px 4px rgba(255,138,136,.3);
        color: #fff;
        border-radius:16px;
      }
    }
  }

  .tb-title {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.04);
    > label {
      display: inline-block;
      font-size: 0.28rem;
      height: 0.36rem;
      line-height: 0.42rem;
      margin: 0.3rem 0;
      color: #333;
      padding-left: 0.16rem;
      border-left: 5px solid #d00;
    }
  }

  .tb-newegame {
    overflow: hidden;
    background: #fcfcfc;
    margin-top: 0.2rem;
    padding-bottom: 0.24rem;
    .flexbox-item {
      text-align: center;
      .tb-Negame {
        width: 1.28rem;
        height: 1.28rem;
        background: #333;
        border: 1px solid #e6e6e6;
        box-shadow: 2px 2px 8px rgba(80, 0, 0, 0.15);
        margin: 0.28rem auto 0rem auto;
        overflow: hidden;
        border-radius: 16px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          margin: 0;
          filter: sepia(0.2);
          -webkit-filter: sepia(0.2);
          -moz-filter: sepia(0.2);
          -o-filter: sepia(0.2);
          -ms-filter: sepia(0.2);
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
            rgba(0, 0, 0, 0.25) 100%
          );
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
      }
      h2 {
        color: #111;
        font-weight: 400;
        font-size: 0.24rem;
        line-height: 0.32rem;
        margin-top: 0.14rem;
      }
      p {
        font-size: 0.22rem;
        color: #ccc;
      }
    }
  }

  .tb-egame {
    width: 100%;
    overflow: hidden;
    background: #fcfcfc;
    margin-top: 0.2rem;
    padding-bottom: 0.14rem;
    .egame-slider {
      // touch-action: pan-y!important;
      .slider-wrapper {
        padding-bottom: 0.26rem;
      }
      .slider-pagination {
        bottom: 0;
        .slider-pagination-item {
          width: 1.08rem;
          height: 2px;
          border-radius: 2px;
          margin: 0 0.05rem;
          background: #e6e6e6;
          &.slider-pagination-item-active {
            background: #ff3a2b;
          }
        }
      }
    }
    .scroll-egame-plt {
      float: left;
      box-sizing: border-box;
      padding: 0.3rem 0.1rem 0rem 0.1rem;
      width: 50%;
      .tb-dypt-pic {
        width: 100%;
        // height: 2.3rem;
        background: #444;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 2px 2px 8px rgba(80, 0, 0, 0.25);
        img {
          width: 100%;
        }
      }
      .tb-dypt-text {
        padding: 0.1rem 0 0.1rem 0;
        .left-icon {
          float: left;
          width: 0.64rem;
          height: 0.64rem;
          line-height: 0.64rem;
          border-radius: 42%;
          text-align: center;
          color: #fff;
          margin-top: 2px;
          margin-right: 0.14rem;
          // display: ;
          opacity: 0.8;
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
        .bfc {
          padding-left: 0rem;
          line-height: 0.32rem;
          h2 {
            margin-top: 0.08rem;
            font-size: 0.26rem;
            font-weight: 400;
            color: #111;
          }
          p {
            font-size: 0.22rem;
            color: #ccc;
          }
        }
      }
      .tb-dypt-an {
        text-align: center;
        width: 100%;
        line-height: 0.64rem;
        display: none;
        color: rgb(11, 200, 166);
        border-width: 1px;
        border-style: solid;
        border-color: rgb(11, 200, 166);
        border-image: initial;
        border-radius: 4px;
        font-size: 0.24rem;
      }
    }
    .tb-dypt-gd {
      float: left;
      width: 100%;
      //   overflow: scroll;
      padding-bottom: 0.16rem;
      filter: sepia(0.25);
      -webkit-filter: sepia(0.25);
      -moz-filter: sepia(0.25);
      -o-filter: sepia(0.25);
      -ms-filter: sepia(0.25);
      .tb-dypt-ul {
        width: 30rem;
        overflow: hidden;
        > li {
          box-sizing: border-box;
          padding: 0.3rem 0.1rem 0rem 0.1rem;
          width: 3.75rem;
          .tb-dypt-pic {
            width: 100%;
            // height: 2.3rem;
            background: #444;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 2px 2px 8px rgba(80, 0, 0, 0.25);
            img {
              width: 100%;
            }
          }
          .tb-dypt-text {
            padding: 0.1rem 0 0.1rem 0;
            .left-icon {
              float: left;
              width: 0.64rem;
              height: 0.64rem;
              line-height: 0.64rem;
              border-radius: 42%;
              text-align: center;
              color: #fff;
              margin-top: 2px;
              margin-right: 0.14rem;
              // display: ;
              opacity: 0.8;
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
            .bfc {
              padding-left: 0rem;
              line-height: 0.32rem;
              h2 {
                margin-top: 0.08rem;
                font-size: 0.26rem;
                font-weight: 400;
                color: #111;
              }
              p {
                font-size: 0.22rem;
                color: #ccc;
              }
            }
          }
          .tb-dypt-an {
            text-align: center;
            width: 100%;
            line-height: 0.64rem;
            display: none;
            color: rgb(11, 200, 166);
            border-width: 1px;
            border-style: solid;
            border-color: rgb(11, 200, 166);
            border-image: initial;
            border-radius: 4px;
            font-size: 0.24rem;
          }
        }
      }
    }
  }

  .tb-live {
    width: 100%;
    overflow: hidden;
    background: #fcfcfc;
    margin-top: 0.2rem;
    .tb-livepic {
      width: auto;
      margin: 0.12rem 0.1rem 0.1rem 0.1rem;
      background: #fff;
      img {
        width: 100%;
        box-shadow: 0px 2px 8px rgba(50, 0, 0, 0.2);
        filter: sepia(0.1);
        -webkit-filter: sepia(0.1);
        -moz-filter: sepia(0.1);
        -o-filter: sepia(0.1);
        -ms-filter: sepia(0.1);
      }
    }
    .tb-livept {
      width: auto;
      overflow: hidden;
      clear: both;
      margin: 0 0.2rem;
      border-bottom: 1px solid #f2f2f2;
      padding: 0.2rem 0;
      &:last-child {
        border-bottom: none;
      }
      > .fl {
        .tb-liveico {
          float: left;
          width: 1.28rem;
          height: 1.28rem;
          line-height: 1.28rem;
          border-radius: 16px;
          text-align: center;
          color: #666;
          margin-top: 2px;
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
          img {
            width: 100%;
            height: 100%;
            border-radius: 16px;
            margin: 0;
            filter: sepia(0.2);
            -webkit-filter: sepia(0.2);
            -moz-filter: sepia(0.2);
            -o-filter: sepia(0.2);
            -ms-filter: sepia(0.2);
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
              rgba(0, 0, 0, 0.5) 100%
            );
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
          }
        }
        > .fl {
          h2 {
            font-weight: 400;
            font-size: 0.26rem;
            color: #111;
            line-height: 0.36rem;
            margin-top: 0.14rem;
          }
          p {
            font-size: 0.22rem;
            color: #ccc;
            margin-top: 0.1rem;
            line-height: 0.32rem;
          }
        }
      }
    }
  }

  .tb-buyu {
    width: 100%;
    overflow: hidden;
    background: #fcfcfc;
    margin-top: 0.2rem;
    .tb-buyupic {
      width: auto;
      margin: 0.12rem 0.1rem 0rem 0.1rem;
      box-shadow: 0px 2px 6px rgba(0, 0, 50, 0.25);
      background: #fff;
      position: relative;
      z-index: 3;
      img {
        width: 100%;
        filter: sepia(0.15);
        -webkit-filter: sepia(0.15);
        -moz-filter: sepia(0.15);
        -o-filter: sepia(0.15);
        -ms-filter: sepia(0.15);
      }
    }

    .tb-newegame {
      margin-top: 0;
      padding-top: 0.1rem;
      border-bottom: 1px solid #f3f3f3;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 2;
      background: none;
      .flexbox-item {
        .tb-Negame {
          img {
            filter: sepia(0.1);
            -webkit-filter: sepia(0.1);
            -moz-filter: sepia(0.1);
            -o-filter: sepia(0.1);
            -ms-filter: sepia(0.1);
          }
          .egamepic-shadow {
            background-image: -webkit-gradient(
              linear,
              left top,
              left bottom,
              from(rgba(0, 0, 0, 0.2)),
              to(rgba(0, 0, 0, 0))
            );
            background-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.2) 100%
            );
          }
        }
      }
    }

    .tb-buyupt {
      width: auto;
      overflow: hidden;
      clear: both;
      margin: 0 0.2rem;
      border-bottom: 1px solid #f2f2f2;
      padding: 0.2rem 0;
      &:last-child {
        border-bottom: none;
      }
      > .fl {
        .tb-buyuico {
          float: left;
          width: 1.28rem;
          height: 1.28rem;
          line-height: 1.28rem;
          border-radius: 16px;
          text-align: center;
          background: #444;
          color: #666;
          margin-top: 2px;
          margin-right: 0.24rem;
          box-shadow: 2px 2px 8px rgba(80, 0, 0, 0.15);
          overflow: hidden;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 16px;
            margin: 0;
            filter: sepia(0.1);
            -webkit-filter: sepia(0.1);
            -moz-filter: sepia(0.1);
            -o-filter: sepia(0.1);
            -ms-filter: sepia(0.1);
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
              rgba(0, 0, 0, 0.5) 100%
            );
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
          }
        }
        > .fl {
          h2 {
            font-weight: 400;
            font-size: 0.26rem;
            color: #111;
            line-height: 0.36rem;
            margin-top: 0.14rem;
          }
          span {
            line-height: 0.36rem;
            font-size: 0.24rem;
            color: #aaa;
            display: block;
            padding-top: 0.02rem;
          }
          p {
            font-size: 0.24rem;
            color: #ccc;
            height: 0.3rem;
            line-height: 0.4rem;
          }
        }
      }
    }
  }

  .btn-link {
    display: inline-block;
    text-align: center;
    margin-top: 0.32rem;
    font-size: 0.24rem;
    height: 0.64rem;
    line-height: 0.64rem;
    color: #fff;
    width: 1.68rem;
    padding: 0;
    border-radius: 0.34rem;
    background-image: linear-gradient(to bottom, #ff2549, #ff9280);
    box-shadow: 0 2px 8px rgba(200, 0, 0, 0.2);
  }
}
</style>
