import evn_config from './evn.config'
import ajaxCommon from 'common/ajaxCommon'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import api from "@/api/User"
import apiNames from "@/api/API.list"
import gVars from "@/common/GlobalVars"
import moment from "moment"
function getRootScroll() {
    let scrollEl = document.querySelectorAll("body>.g-flexview>.g-scrollview");
    if (scrollEl.length > 0) scrollEl = scrollEl[0];
    return scrollEl
}
function getHeader() {
    let appHeader = document.querySelectorAll("body>.g-flexview>header");
    if (appHeader.length > 0) appHeader = appHeader[0];
    return appHeader
}
export default {
    data() {
        return {
            imgRoot: evn_config.imgRoot,
        }
    },
    computed: {
        ...mapState(["isLogin", "user", "hideACNT", "message"]),
        ...mapGetters(["unreadMsg", "sortedMsgs"]),
        screen: function () {
            // return window.document.documentElement.getBoundingClientRect();
            return {
                // width: window.screen.availWidth,
                // height: window.screen.availHeight
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        },
        rootFontSize: function () {
            let rootSize = document.documentElement.style.fontSize.replace("px", "");
            return parseFloat(rootSize);
        }
    },
    methods: {
        ...mapActions(["getBalance", "getMessages"]),
        ...mapMutations(["setUser"]),
        DateFormat(time, format) {
            if (time) {
                return moment(time).format(format);
            } else {
                return "";
            }
        },
        lockRootScrool() {
            let scrollEl = getRootScroll();
            scrollEl.style.overflow = "hidden"
        },
        unlockRootScrool() {
            let scrollEl = getRootScroll();
            scrollEl.style.overflow = "auto"
        },
        getRootScrollHeight(haseHeader = true) {
            let scrollEl = getRootScroll();
            let appHeader = getHeader();

            let headerHeight = parseInt(document.defaultView.getComputedStyle(appHeader).height.replace("px"));

            let scrollHeight = parseInt(document.defaultView.getComputedStyle(scrollEl).height.replace("px"));
            // console.log("####"+document.body.offsetHeight)
            if (haseHeader) return document.body.offsetHeight - headerHeight
            else return document.body.offsetHeight

        },
        /**
         * 跳转登录页
         */
        goLogin() {
            this.$router.push({ name: "login" })
        },
        goHome() {
            this.$router.push({ name: "home" })
        },
        needLogin(returnNow) {
            this.confirm({
                title: "未登录或登录超时",
                mes: '请您登录，再进行操作！',
                icon: "warn",
                opts: [

                    {
                        txt: "前往登录",
                        color: true,
                        callback: () => {
                            // if (this.$native.IsNative === true) {
                            //     location.href = "tengbo/login"
                            // } else
                            this.goLogin();
                        }
                    }, {
                        txt: returnNow === true ? "知道了" : "返回首页",
                        color: false,
                        callback: () => {
                            // if (this.$native.IsNative === true) {
                            //     location.href = "tengbo/index"
                            // } else
                            returnNow === true ? "" : this.goHome();

                        }
                    }
                ]
            })
        },
        needLoginCheck(status) {
            return new Promise((resolve, reject) => {
                if (status === 16 || status === -6) {
                    this.setUser({ isLogin: false });
                    this.needLogin();
                    resolve(false);
                } else {
                    resolve(true);
                }
            });

            // return promise();
        },
        sysErrCheck(status) {
            return new Promise((resolve, reject) => {
                if (status === 16 || status === -6) {
                    this.needLogin();
                    resolve(false);
                } else if (status === -9) {
                    this.confirm({
                        title: "系统错误",
                        mes: '系统错误，请刷新重试',
                        opts: [
                            {
                                txt: "回首页",
                                color: true,
                                callback: () => {
                                    this.goHome();
                                }
                            },
                            {
                                txt: "刷新",
                                color: false,
                                callback: () => {
                                    location.reload();
                                }
                            }
                        ]
                    })
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        },
        confirm(settings) {
            this.$confirm(settings);
        },
        alert(settings) {
            this.$alert(settings)
        },
        toast() {

        },
        loading() {
            this.$loading.open();
        },
        loadingClose() {
            this.$loading.close();
        },
        /**
         * 打开新的web窗体
         * @param {String} 打开的URL地址
         */
        openWin(url = "static/loading.html", name = "newweb", type = "_blank") {
            let win = window.open(url, name, type);
            return win;
        },
        //QQ客服
        onlineQQService() {
            let link = [
                "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDE1NTI2OF80NTAyMDNfODAwMTU1MjY4XzJf",
                "http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDAzMTc1OV80NTAyMDVfODAwMDMxNzU5XzJf"];
            this.openWin(link[Math.floor(Math.random() * link.length)]);

        },
        //在线客服
        onlineService() {
            this.openLauncher({
                launchFun: `_launcher._onlineService();`,
                title: "正在加载，请稍候...",
                to: "onlineService"
            })
        },
        _onlineService() {
            ajaxCommon("OnlineServices", {}, 1, this).then(res => {
                let chatType = res.row;
                let url = 'https://secure.livechatinc.com/licence/8699606/open_chat.cgi';
                if (chatType === "Live800") {
                    url = 'http://vftb18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=293933&configID=54000&jid=8086264846&lan=zh';
                }
                this._gotoGameUrl(url);
            })
        },

        //获取登录状态
        getLoginStatu() {
            return api[apiNames.LoginState]().then((rep) => {
                let data = rep.data;

                if (data.Status === 1) {
                    if (data.row === "Successed") {
                        this.setUser({
                            userName: gVars.ACNT,
                            hideACNT: gVars.hideACNT,
                            isLogin: true
                        })
                        gVars.loginStatu = true;
                    } else {
                        this.setUser({ isLogin: false })
                        gVars.loginStatu = false;
                    }
                } else {
                    this.setUser({ isLogin: false })
                    gVars.loginStatu = false;
                }
                // resolve(rep)
                return rep
            })
        },
        loginOut() {
            return new Promise((reslove) => {
                gVars.ACNT = "";
                gVars.Token = "";
                gVars.hideACNT = "";
                gVars.GroupID = "";
                gVars.loginStatu = false;
                this.setUser({
                    userName: gVars.ACNT,
                    hideACNT: gVars.hideACNT,
                    isLogin: false
                })
                reslove();
            });

        },
        /**
         *
         * @param {Object} launchFun 打开后执行的函数，title 打开时显示的文字
         */
        openLauncher({ launchFun = "", title = "正在加载...", to = "" }) {
            let _luncher = encodeURIComponent((launchFun && typeof launchFun === "string") ? launchFun : "");
            let _title = encodeURIComponent(title);
            let url = `/launcher?_luncher=${_luncher}&_title=${_title}`;

            // debugger;
            if (this.$native.IsNative === true) {

                switch (to) {
                    case "bbin":
                        if (this.isLogin !== true)
                            this.needLogin(true);
                        else
                            window.open(url, "_blank", "location=no,hardwareback=no")
                        break;
                    default:
                        this.$loading.open();
                        let func = decodeURIComponent(_luncher);
                        let _launcher = this;
                        if (func) {
                            try {
                                eval(func)
                            } catch (error) {
                                // console.log(error);
                            }
                        }
                        break;
                }
                // debugger;

                // window.open(url, "_blank", "location=no,hardwareback=no")
            } else {
                window.open(url, "", "_blank")
            }

        }
    }
}
