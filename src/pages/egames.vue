<!--
* 电游
-->
<template>
    <div class="e-games">
        <div class="search-warp">
            <div class="input-style" @click="isShowSearch=true;">
                <tf-flexbox>
                    <tf-flexbox-item class="egame-query">
                        输入想找的游戏名称
                    </tf-flexbox-item>
                    <tf-icon size=".4rem" name="fangdajing" color="#ccc"></tf-icon>
                </tf-flexbox>
            </div>
        </div>
        <div class="game-platform">
            <tf-flexbox>
                <tf-flexbox-item @click.native="goPlatform(15)">
                    <div class="left-icon game-platform-PT">
                        <tf-icon name="PT" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">PT厅</span>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="goPlatform(17)">
                    <div class="left-icon game-platform-MG_IN">
                        <tf-icon name="MG_IN" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">MG国际厅</span>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="goPlatform(18)">
                    <div class="left-icon game-platform-TTG">
                        <tf-icon name="TTG" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">TTG厅</span>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="goPlatform(12)">
                    <div class="left-icon game-platform-AG_AGIN">
                        <tf-icon name="AG_AGIN" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">AG国际厅</span>
                </tf-flexbox-item>
            </tf-flexbox>
            <tf-flexbox>
                <tf-flexbox-item @click.native="goPlatform(21)">
                    <div class="left-icon game-platform-DT">
                        <tf-icon name="DT" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">DT厅</span>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="goPlatform(9)">
                    <div class="left-icon game-platform-BBIN">
                        <tf-icon name="BBIN" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">波音厅</span>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="playGame({trys:!isLogin,Gtype:12,code:'YP800'})">
                    <div class="left-icon game-platform-GG">
                        <tf-icon name="PY" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">YP街机</span>
                </tf-flexbox-item>
                <tf-flexbox-item @click.native="goPlatform(22)">
                    <div class="left-icon game-platform-AG_BUYU">
                        <tf-icon name="SW" size=".6rem"></tf-icon>
                    </div>
                    <span class="egame-g-bt">SW厅</span>
                </tf-flexbox-item>
            </tf-flexbox>
        </div>
        <div class="new-win boxshadow">
            <div class="group-title">
                <label>最新中奖</label>
            </div>
            <div class="egame-new-win">
                <div class="wraper" ref="new_wraper" :style="new_transform">
                    <div class="egame-wininfo" v-for="item in WinRecord" v-bind:key="item.ID"  @click="playGame({'trys':false,'Gtype':item.GamePlatform,'code':item.GameCode,'IsHtml5':false},$event)">
                        <div class="egame-winpic"><img :src="item.icon">
                            <div class="egamepic-shadow"></div>
                        </div>
                        <div class="egame-wintext">
                            <h2>{{item.GameName}}</h2>
                            <h3>
                                <span>{{item.MemberACNT}}</span>
                            </h3>
                            <p>
                                <tf-icon name="tubiaozhizuomoban" size="0.22rem"></tf-icon>
                                <span>{{item.Amount}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showPlat_list_ready">
            <div v-for="(item,index) in showPlat_list" v-bind:key="item.id" class="platfrom-induce boxshadow">
                <div class="platfrom-induce-item">
                    <div class="banner" @click="goPlatform(item.id)">
                        <img :src="item.egbanner" alt="">
                    </div>
                    <tf-flexbox v-for="game in item.itemList" v-bind:key="game.Code" style="width:100%;">
                        <tf-icon @click.native="heartClick(game,index,item)" name="like" :color="game.like?'#ff3a2b':'#e8e8e8'" size=".44rem"></tf-icon>
                        <div class="game-icon"><img v-lazy="imgRoot+item.item_icon_root+'/' + game.Code+'.png'">
                            <div class="egamepic-shadow"></div>
                        </div>
                        <tf-flexbox-item class="egame-glist">
                            <h2>{{game.CNName}}</h2>
                            <p>{{item.name.replace("_IN",'') +'电游'}}</p>
                        </tf-flexbox-item>
                        <tf-button v-show="item.id!=15" v-if="!isLogin" class="try-game" @click.native="playGame({'trys':true,'Gtype':item.id,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)" type="hollow">试玩</tf-button>
                        <tf-button class="play-game" @click.native="playGame({'trys':false,'Gtype':item.id,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)">开始游戏</tf-button>

                    </tf-flexbox>

                </div>
            </div>
        </div>

        <!-- 查找 -->
        <tf-popup v-model="isShowSearch" :useLock="false" contentClass="grayBG" position="right" width="100%">
            <tf-layout :style="{'height':screen.height+'px'}">
                <tf-navbar slot="navbar" fontsize=".3rem" title="搜索">
                    <a @click="isShowSearch=false" slot="left">
                        <tf-navbar-back-icon>返回</tf-navbar-back-icon>
                    </a>
                </tf-navbar>
                <div class="search-warp" style="background:none;">
                    <div class="input-style">
                        <tf-flexbox style="background: #fff;border-radius: 4px;border:1px solid #f2f2f2;box-shadow: 0 0 5px rgba(0,0,0,.02);">
                            <tf-flexbox-item class="grayColor">
                                <input type="text" v-model="sear_keyword" placeholder="请输入您想要查找的游戏">
                            </tf-flexbox-item>
                            <tf-icon size=".4rem" name="fangdajing" color="#bbb"></tf-icon>
                        </tf-flexbox>
                    </div>
                </div>
                <div class="platfrom-induce boxshadow">
                    <div class="platfrom-induce-item">
                        <tf-flexbox v-for="game in search_result" v-bind:key="game.Code" style="width:100%;">
                            <div class="game-icon">
                                <img v-lazy="imgRoot+game.icon_f+'/' + game.Code+'.png'">
                                <div class="egamepic-shadow"></div>
                            </div>
                            <tf-flexbox-item class="egame-glist">
                                <h2>{{game.CNName}}</h2>
                                <p>{{game.platform.replace("_IN",'') +'电游'}}</p>
                            </tf-flexbox-item>
                            <tf-button v-if="!isLogin" class="try-game" color="#09f" @click.native="playGame({'trys':true,'Gtype':game.GameType,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)" type="hollow">试玩</tf-button>
                            <tf-button class="play-game" @click.native="playGame({'trys':false,'Gtype':game.GameType,'code':game.Code,'IsHtml5':game.Html5 === 1?true:false},$event)">开始游戏</tf-button>
                        </tf-flexbox>
                    </div>
                </div>
            </tf-layout>
        </tf-popup>
    </div>
</template>
<script>
import { mapMutations } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import game from "@/api/game"
import gameCache from "@/common/games.cache"
import gamePlatform from "@/common/games.platform"
import { platformKV } from "@/common/games.platform"
import gameMixins from "@/common/game.mixins"

import underscore from "underscore"
import { FlexBox, FlexBoxItem } from '@/tf-ui/components/flexbox';
import { GridsItem, GridsGroup } from '@/tf-ui/components/grids';
import { RollNotice, RollNoticeItem } from '@/tf-ui/components/rollnotice';
import { BackTop } from '@/tf-ui/components/backtop';
export default {
    mixins: [gameMixins],
    components: {
        [FlexBox.name]: FlexBox,
        [FlexBoxItem.name]: FlexBoxItem,
        [RollNotice.name]: RollNotice,
        [RollNoticeItem.name]: RollNoticeItem,
        [BackTop.name]: BackTop,
    },
    data() {
        return {
            gamePlatform: [],//所有游戏平台
            showPlat: [],//分组显示两行
            showPlat_list: [],//除去GG，波音
            showPlat_list_ready: false,
            WinRecord: [],
            search_source: [],
            search_result: [],
            // isLogin: false,
            isShowSearch: false,
            sear_keyword: "",
            isSearching: false,
            new_transform: {
                transitionDuration: "300ms",
                transform: ""
            },
            new_index: 0,
            new_count: 1,
            new_speed: 3000,
        }
    },
    watch: {
        sear_keyword(value) {
            // debugger debugger
            if (value.length > 0) {
                if (!this.isSearching) {
                    this.isSearching = true;
                    this.search_result = this.search_source.filter(item => item.CNName.indexOf(value) != -1)
                    this.isSearching = false;
                }
            } else {
                this.search_result = []
            }
        }
    },
    methods: {
        //获取mutation
        ...mapMutations(["setTitle", "setShowNav", "setShowHeader", "setSiteConfig"]),
        autoPlay() {
            if (this.new_count === 1) return;
            else {
                if (this.new_index >= this.new_count) {
                    this.new_index = 0;
                    this.new_transform.transitionDuration = "0ms";
                } else {
                    this.new_transform.transitionDuration = "300ms";
                }

                this.new_transform.transform = 'translate3d( -' + this.new_index * this.screen.width + 'px,0, 0)';

                setTimeout(() => {
                    this.new_index++;
                    this.autoPlay();
                }, this.new_speed)
            }
        },
        //获取最新中奖信息
        getNewWin() {
            this.$loading.open();
            game[apiNames.WinRecord]({"IsMobile":true}).then(rep => {
                // console.log(gamePlatform)
                // this.$loading.close();
                let data = rep.data;
                if (data.Status === 1) {
                    data.row.forEach(item => {
                        let searchitem = gamePlatform.filter(value => value.id == item.GamePlatform);
                        if (searchitem.length > 0) {
                            item.icon = this.imgRoot + searchitem[0].item_icon_root + "/" + item.GameCode + ".png"
                        } else {
                            item.icon = "";
                        }
                    });
                    // debugger;
                    this.WinRecord = data.row;
                    if (this.WinRecord.length % 4 > 0) {
                        this.new_count = parseInt(this.WinRecord.length / 4) + 1
                    } else {
                        this.new_count = this.WinRecord.length / 4;
                    }
                    setTimeout(() => {
                        this.autoPlay();
                    }, this.new_speed);
                } else {
                    this.sysErrCheck(data.Status).then(canrun => {
                        if (canrun) {
                            this.alert({ mes: data.CNMessage, })
                        }
                    });
                }
            }).catch(err => {
                this.$loading.close();
                this.sysErrCheck(-9);
            })
        },
        //获取所有平台游戏
        getGamesAll() {

            this.$loading.open();
            let allPromise = [];
            // console.log(gamePlatform)
            let tempShowHot = gamePlatform.filter(item => !!item.egbanner && item.id !== 20 && item.id !== 9);
            tempShowHot.forEach(item => item.itemList = []);
            tempShowHot.forEach(item => {
                allPromise.push(gameCache.getGameList(item.id));
            })
            let tempAllGames = []
            Promise.all(allPromise).then(reps => {
                reps.forEach(rep => {
                    let data = rep.data;
                    data.row.GameList.forEach(item => {
                        item.GameType = data.GameType;
                        item.icon_f = platformKV[item.GameType].item_icon_root
                        item.platform = platformKV[item.GameType].name
                        // console.log(platformKV[item.GameType]);

                    });
                    tempAllGames = tempAllGames.concat(data.row.GameList);
                    // console.log(data);

                    data.row.hot.forEach(item => {
                        item.like = false;
                    });

                    if (data.Status === 1) {
                        let result = tempShowHot.filter(item => item.id == data.GameType);
                        // debugger;
                        if (result.length > 0) result[0].itemList = data.row.hot;
                        // console.log(data);
                    }
                });

                this.showPlat_list = tempShowHot;
                this.search_source = tempAllGames;
                this.showPlat_list_ready = true;
                this.$loading.close();
            })
        },
        //设置数据
        setPlatformData() {
            let usePlat = gamePlatform.filter(item => !!item.egbanner);
            gamePlatform.forEach(item => {
                item.cnname = item.cnname.replace("国际", "")
            });
            // openFishGame(11,6,!isLogin)
            // this.gamePlatform.push()
            this.gamePlatform = usePlat;
            this.showPlat.push({ key: 0, value: this.gamePlatform.slice(0, 4) });
            let temp = this.gamePlatform.slice(4, this.gamePlatform.length);
            temp.push({ id: 12, name: "AG_AGIN", cnname: "AG捕鱼", dyname: "AG电游", egbanner: "static/img/Eg-Pic-AG_AGIN.jpg", item_icon_root: "agg", entry: "GetAGXINEntry" });
            this.showPlat.push({ key: 0, value: temp })

        },
        // //获取登录状态
        // getLoginStatu() {
        //     api[apiNames.LoginState]().then(rep => {
        //         let data = rep.data;
        //         if (data.Status === 1) {
        //             if (data.row === "Successed") {
        //                 this.isLogin = true;
        //             }
        //         }
        //     }).catch(err => {
        //     })
        // },
        heartClick(g, index, item) {
            if (!this.isLogin) {
                this.confirm({
                    title: "未登录或登录超时",
                    mes: '请您登录，再进行操作！',
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
                })
            } else {
                if (g.like) {
                    this.delFavorite(g, index, item);
                } else {
                    this.addFavorite(g, index, item);
                }
            }
        },
        //收藏游戏
        addFavorite(g, index, item) {

            console.log(g, index, item);
            game[apiNames.AddGameFavorite]({ GameID: g.ID }).then(rep => {
                let data = rep.data;
                if (data.Status === 1) {
                    if (data.row === "Successed") {
                        g.like = true;
                        this.$set(this.showPlat_list, index, item)
                        this.$notify({
                            mes: '收藏成功',
                            timeout: 2000,
                        });
                    }
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
        },
        //取消收藏
        delFavorite(g, index, item) {
            game[apiNames.DeleteGameFavorite]({ GameID: g.ID }).then(rep => {
                let data = rep.data;
                if (data.Status === 1) {
                    if (data.row === "Successed") {
                        g.like = false;
                        this.$set(this.showPlat_list, index, item)
                        this.$notify({
                            mes: '已取消收藏',
                            timeout: 2000,
                            callback: () => {
                            }
                        });
                    }
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
        },
        goPlatform(id) {
            if (id == 9) {
                if (!this.isLogin) {
                    this.confirm({
                        title: "未登录或登录超时",
                        mes: '请您登录，再进行操作！',
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
                    })
                } else {
                    this.openBBin(3, false)
                }
            } else {
                this.$router.push("/eplatform/" + id)
            }

        }
    },
    created() {
        this.setPlatformData();
        this.getNewWin();
        this.getGamesAll();
        // this.getLoginStatu();
    },
    mounted() {

    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    beforeRouteEnter(to, from, next) {
        // 页面进入时触发
        next(vm => {
            //这里可以获取vm实例 vm.store.commit('setSiteConfig', { title: "", showMenu: false, showBack: true, showNav: false, showChat: false });
            vm.$store.commit('setSiteConfig', { title: "电子游艺", showMenu: true, showBack: false, showNav: true, showChat: true });
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
    destroyed() {
    }
}
</script>
<style lang="less" scoped>
img[lazy=loading],
img[lazy=error] {
    border: solid 1px #f5f5f5;
}

.e-games {
    .search-warp {
        position: relative;
        z-index: 3;
        box-sizing: border-box;
        width: 100%;
        height: .92rem;
        padding: .2rem .24rem 0rem .24rem;
        background: #fff;
        .input-style {
            width: 100%;
            height: .68rem;
            background-color: #f2f2f2;
            /*border:1px solid #eee;
            box-shadow:0 1px 4px rgba(0,0,0,.04);*/
            border-radius: 4px;
            input {
                width: 100%;
                border: none;
                font-size: .26rem;
                padding-left: .15rem;
                background: transparent;
                color: #555;
                align-items: center;
                text-align: left;
                /* fuck UC */
            }
            .icon-fangdajing {
                padding: .1rem;
            }
        }
    }
    .egame-query {
        color: #bbb;
        font-size: .24rem;
        padding-left: 5px;
    }

    .game-platform {
        background-color: #fff;
        padding-bottom: .1rem;
        padding-top: .25rem;
        box-shadow: 0 1px .25rem rgba(0, 0, 0, .06);
        .left-icon {
            width: 1rem;
            height: 1rem;
            line-height: 1rem;
            border-radius: 40%;
            /*width: .88rem;
            height: .88rem;
            line-height: .88rem;
            border-radius: 40%;*/
            text-align: center;
            color: #fff;
            margin-left: auto;
            margin-right: auto;
            margin-top: 2px;
            i {
                background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(rgba(255, 255, 255, .75)));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 1px 1px 3px rgba(0, 0, 0, .05);
            }
        }
        .egame-g-bt {
            display: block;
            padding-top: 5px;
            font-size: .22rem;
            color: #808080;
        }
        .m-flexbox {
            padding-bottom: .2rem;
        }
        .flexbox-item {
            text-align: center;
        }
    }

    .new-win {
        margin-top: .2rem;
        /*.img-show {
            width: 1rem;
            height: 1rem;
            margin-left: .24rem;
            margin-right: .2rem;
            border-radius: 30%;
        }*/
        .play-win-game {
            font-size: .24rem;
            margin-right: .24rem; // height: .5rem;
            border-radius: .3rem;
        }
    }

    .platfrom-induce {
        margin-top: .2rem;
        background-color: #fff;
        .platfrom-induce-item {
            .banner {
                width: 100%;
                padding: .18rem .14rem .06rem .14rem;
                img {
                    overflow: hidden;
                    clear: both;
                    width: 100%;
                    margin: 0 0%;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
                }
            }
            .m-flexbox {
                padding-top: .28rem;
                padding-bottom: .28rem;
                padding-left: .2rem;
                &.m-flexbox:not(:last-child) {
                    border-bottom: #f6f6f6 1px solid;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, .025);
                }
                .game-icon {
                    width: 1.24rem;
                    height: 1.24rem;
                    margin-left: .2rem;
                    margin-right: .2rem;
                    border-radius: 18px;
                    border: 1px solid #e6e6e6;
                    box-shadow: 0px 1px 12px rgba(0, 0, 0, .12);
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
                        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .7) 100%);
                        border-bottom-left-radius: 16px;
                        border-bottom-right-radius: 16px;
                    }
                }
                .try-game,
                .play-game {
                    font-size: .22rem;
                    margin-right: .22rem;
                    height: .6rem;
                    width: 1.46rem;
                    padding: 0;
                    border-radius: .34rem;
                    background-image: linear-gradient(to bottom, #ff2549, #ff9280);
                    box-shadow: 0 2px 8px rgba(200, 0, 0, .2);
                }
                .try-game {
                    border: 1px solid #bcd4f5;
                    color: #75a4e5;
                    box-sizing: border-box;
                    margin-right: .15rem;
                    background-image: linear-gradient(to bottom, #f9fbfe, #eef4fb);
                    box-shadow: 0 2px 8px rgba(92, 161, 255, .2);
                }
                .egame-glist {
                    overflow: hidden;
                    h2 {
                        color: #333;
                        font-weight: 500;
                        font-size: .24rem;
                    }
                    p {
                        color: #ccc;
                        font-size: .22rem;
                    }
                }
            }
        }
    }

    .egame-new-win {
        overflow: hidden;
        clear: both;
        width: 100%;
        background: #fff;
        height: 3rem;
        /*display: flex;
        flex-direction: row;
        flex-wrap: wrap;*/
        .wraper {
            height: 100%;
            width: auto; // overflow: hidden;
            white-space: nowrap;
        }
        .egame-wininfo {
            /*flex: auto;
            width: 33.3%;*/
            // float: left;
            display: inline-block;
            width: 1.87rem;
            text-align: center;
            font-size: .24rem;
            margin-bottom: .4rem;
            .egame-winpic {
                width: 1.24rem;
                height: 1.24rem;
                /*background: #221f1e;*/
                border: 1px solid #e6e6e6;
                box-shadow: 1px 2px 12px rgba(0, 0, 0, .1);
                margin: .4rem auto 0rem auto;
                overflow: hidden;
                border-radius: 18px;
                position: relative;
                img {
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                }
                .egamepic-shadow {
                    position: absolute;
                    height: 60%;
                    width: 100%;
                    left: 0;
                    bottom: 0;
                    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, .75) 100%);
                    border-bottom-left-radius: 16px;
                    border-bottom-right-radius: 16px;
                }
            }
            .egame-wintext {
                h2 {
                    font-weight: 500;
                    margin-top: 4px;
                    font-size: .22rem;
                    color: #333;
                }
                h3 {
                    margin-top: 2px;
                    font-size: .22rem;
                    font-weight: 500;
                    color: #bbb;
                    span {
                        color: #bbb;
                    }
                }
                p {
                    font-size: .22rem;
                    color: #bbb;
                    margin: 2px 12% 0 12%;
                    display: block;
                    height: .36rem;
                    line-height: .38rem;
                    border-radius: .36rem;
                    background-image: linear-gradient(to right, #ff6c44, #ff5144);
                    box-shadow: 1px 1px 5px rgba(0, 0, 0, .12);
                    color: #fff;
                    overflow: hidden;
                    clear: both;
                    position: relative;
                    span {
                        color: #fff;
                        width: auto;
                        overflow: hidden;
                        padding-left: 5px;
                    }
                    i {
                        position: absolute;
                        left: 0;
                        margin-left: 3px;
                        float: left;
                    }
                }
            }
        }
    }
}

.m-grids-3 .grids-item:not(:nth-child(3n)):before,
.m-grids-4 .grids-item:not(:nth-child(4n)):before {
    border-right: none!important;
}
</style>
