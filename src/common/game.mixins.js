
import apiNames from "@/api/API.list"
import game from "@/api/game"
import api from "@/api/User"
import { platformKV } from "@/common/games.platform"
import gVars from "./GlobalVars"
import qs from "qs"
export default {
    methods: {
        /**
         * 打开窗体玩电游
         * @param {*JSON} param0 try: 是否使用 Gtype: 平台类型 IsHtml5:是否html5
         * @param {*} event 
         */
        playGame({ trys = false, Gtype, code, IsHtml5 = false }, event) {
            //debugger;
            if (!this.isLogin && !trys) {
                this.confirm({
                    title: "未登录或登录超时",
                    mes: '请您登录，再进行操作！',
                    icon: "warn",
                    opts: [
                        {
                            txt: "前往登录",
                            color: true,
                            callback: () => {
                                this.goLogin();
                            }
                        },
                        {
                            txt: "知道了",
                            color: false,
                            callback: () => {
                                // this.goHome();
                            }
                        }
                    ]
                })
            } else {
                // this.$loading.open();
                this.openLauncher({
                    launchFun: `_launcher._getEntryPromise(${trys}, ${Gtype}, '${code}', ${IsHtml5});`,
                    title: "正在加载游戏，请稍候...",
                    to: Gtype
                })
                // this._getEntryPromise(trys, Gtype, code, IsHtml5);
            }
        },
        _getEntryPromise(trys, Gtype, code, IsHtml5) {
            let entryName = platformKV[Gtype.toString()].entry;//入口名称
            let parameter = {
                GameCode: code, IsMobile: true, IsTrial: trys, IsHtml5: IsHtml5.toString()
            }
            if (entryName === "GetAGXINEntry") {
                parameter.trial = trys;
                parameter.Type = '';
            } else if (entryName === "GetMGEntry") {
                delete parameter.IsTrial;
            }


            this._getGameConfig(Gtype, parameter).then(data => {
                if (typeof data.row !== "string") {
                    this.alert({ mes: "跳转失败，未获取到游戏链接" })
                } else {
                    this._openGame(Gtype, trys, data.row, code)
                }
            }).catch(err => {

            })

        },
        _openGame(Gtype, trys, url, code) {

            debugger;
            switch (Gtype.toString()) {
                case "15"://pt 验证后跳网页
                    if (trys) {//直接跳转
                        // this.openWin(url)
                        this._gotoGameUrl(url)
                    } else {
                        this._ptOpener(url)
                    }
                    break;
                // case "11"://ag旗舰 
                case "12"://ag 
                case "18"://ttg
                case "19"://bsg
                case "20"://gg捕鱼
                case "22"://SW 
                case "9"://BBIn 
                    this._gotoGameUrl(url)
                    break;
                case "16"://mg
                case "17"://mgin 
                    if (code === "mgLiveGame") {
                        url = url.replace("[lobbyURL]", encodeURIComponent(location.origin))
                    } else {
                        url = url.replace("[lobbyURL]", encodeURIComponent(location.origin + '/eplatform/17/home')).
                            replace("[bankingURL]", encodeURIComponent(location.origin + '/deposit'))
                    }
                    this._gotoGameUrl(url)
                    break;

                case "21"://dt
                    url = url.replace("[closeUrl]", encodeURIComponent(location.origin));
                    this._gotoGameUrl(url)
                    break;
                default:
                    break;
            }
        },
        _ptOpener(url) {
            debugger;
            //验证，
            let _URL = encodeURIComponent(url);
            let ptAccount = encodeURIComponent(gVars.ptAccount);
            let pwd = encodeURIComponent(gVars.userPwd);
            let _gotoUrl = `static/PTloader.html?_1=${_URL}&_2=${ptAccount}&_3=${pwd}`
            if (ptAccount == "" || pwd == "") {
                this.sysErrCheck(-6);//取登录
            } else {
                console.log(_gotoUrl)
                // this.openWin(_gotoUrl);
                this._gotoGameUrl(_gotoUrl)
            }
        },
        _getGameConfig(plateformID, params, liveCasion) {
            let entryName = platformKV[plateformID.toString()].entry;//入口名称
            if (liveCasion && plateformID == 12) {
                entryName = "GetAGINEntry"
            }
            return new Promise((next, err) => {
                api[apiNames.GameStateList]({ gameId: plateformID }).then(res => {
                    // debugger;
                    let resdata = res.data;

                    if (resdata.Status === 1) {
                        if (resdata.row.Locked == 1) {
                            this.$loading.close()
                            this.alert({ mes: resdata.row.MaintainMsg })
                        } else if (resdata.row.Locked == 2) {
                            this.$loading.close()
                            this.alert({ mes: "游戏平台维护中" })
                        } else {
                            game[apiNames[entryName]](params).then(rep => {
                                let data = rep.data;
                                if (data.Status === 1) {
                                    next(data);
                                } else {
                                    this.$loading.close()
                                    this.sysErrCheck(data.Status).then(canrun => {
                                        if (canrun) {
                                            this.alert({ mes: data.CNMessage, })
                                        }
                                    });
                                }
                            }).catch(err => {
                                this.$loading.close()
                                this.sysErrCheck(-9);
                            })
                        }
                    } else {
                        this.sysErrCheck(resdata.Status).then(canrun => {
                            if (canrun) {
                                this.alert({ mes: resdata.CNMessage, })
                            }
                        });
                    }
                }).catch(err => {
                    this.sysErrCheck(-9);
                })
            })
        },
        /**
         * 打开真人视讯
         */
        openAGLiveCasino(plateformID, isTry) {
            // this.$loadingthis.$loading.open();          
            if (plateformID == 11) {
                this.$loading.close()
                this.alert({ mes: "该厅目前不支持移动设备！" });
                return;
            }
            if (!isTry && !this.isLogin) this.needLogin();
            else
                this.openLauncher({
                    launchFun: `_launcher._openAGLiveCasino(${plateformID}, ${isTry});`,
                    title: "正在加载游戏，请稍候...",
                    to: plateformID
                })


        },
        _openAGLiveCasino(plateformID, isTry) {
            this._getGameConfig(plateformID, { IsTrial: isTry }, true).then(data => {
                if (data.Status === 1) {
                    this._gotoGameUrl(data.row);
                }
            }).catch(err => {

            })
        },
        /**
         * 打开波音厅
         * @param {*} page_site 真人3 体育大厅0 电游4
         */
        openBBin(page_site = 0, isTry) {
            // debugger;
            // this.$loading.open();
            if (!isTry && !this.isLogin) this.needLogin();
            else if(this.$native.IsNative){
                this.$loading.open();
                this._openBBin(page_site,isTry);
            }else{
                this.openLauncher({
                    launchFun: `_launcher._openBBin(${page_site}, ${isTry});`,
                    title: "正在加载游戏，请稍候...",
                    to: "bbin"
                })
            }
        },

        _openBBin(page_site = 0, isTry) {

            if (isTry) {
                this._gotoGameUrl("http://777.x0day.net/");
                // location.replace("http://777.x0day.net/")
            } else {

                this._getGameConfig(9, { page_site: page_site }).then(data => {
                    if (data.Status === 1) {
                        if(this.$native.IsNative){
                            this.$loading.close();
                            let fromHtml = encodeURIComponent(data.row);
                            let url = `/static/BBIn_Loader.html?fromhtml=${fromHtml}`;
                            window.open(url, "_system", "location=no,hardwareback=no")
                        }else{
                            let el = document.createElement("p");
                            // el.style.display = "none";
                            el.innerHTML = data.row;
                            document.body.appendChild(el);
                            document.forms[0].submit();
                        }
                    }
                }).catch(err => {

                })
            }
        },

        openFishGame(platformID, code, isTry) {
            if (!isTry && !this.isLogin) this.needLogin(true);
            else
                this.openLauncher({
                    launchFun: `_launcher._openFishGame(${platformID}, '${code}',${isTry});`,
                    title: "正在加载游戏，请稍候...",
                    to: platformID
                })

            // this.$loading.open();

        },
        _openFishGame(platformID, code, isTry) {
            this._getGameConfig(platformID, { GameCode: code.toString(), IsTrial: isTry, "trial": isTry, IsHtml5: "false", "Type": "" }).then(data => {
                if (data.Status === 1) {
                    this._gotoGameUrl(data.row)
                }
            }).catch(err => {

            })
        },
        _gotoGameUrl(url) {
            if (this.$native.IsNative === true) {
                this.$loading.close();
                let ref = window.open(url, "_system", "location=no,hardwareback=no")
                ref.addEventListener('loadstart', (even) => {
                    window.screen.orientation.unlock()
                    // tengbo/index
                    if (even.url.match("tengbo/index")) {
                        ref.close();
                        this.$router.push("/");
                    }
                    if (even.url.match("tengbo/login")) {
                        ref.close()
                        this.$router.push("/login");
                    }

                });
                ref.addEventListener('loadstop', () => {

                });
                ref.addEventListener('exit', () => {
                    window.screen.orientation.lock('portrait');
                    ref.removeEventListener("loadstart")
                    ref.removeEventListener("exit")
                });
            } else {
                location.replace(url);
            }
        }

    }
}