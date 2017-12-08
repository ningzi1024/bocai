
import UA from "./ua-parser"
import config from "./evn.config"

class Native {
    static IsNative = false;
    static Version = "";
    static _onready_callback = [];
    static exitApp = () => { };
    static back = () => { };
    static screenShow = () => { };
    static screenClose = () => { };
    static photoLibrary = null;

    static onready(func) {
        if (typeof func === "function") {
            this._onready_callback.push(func);
        }
    }
    static _init() {

        const webUA = new UA();
        let _result = window.navigator.userAgent.match(/\((TENGBOAPP)\/(\d+)\)/);
        if (_result && _result.length >= 3) {
            this.IsNative = true;
            this.Version = _result[2];
        }

        if (this.IsNative) {
            let _path = config.static
            if (webUA.getOS().name === "Android") {
                this._loadScript(_path + "static/cordova/android/cordova.js", this._setCordova.bind(this))
            } else {
                this._loadScript(_path + "static/cordova/IOS/cordova.js", this._setCordova.bind(this))
            }
        }

    }

    static _setCordova() {
        console.log("Native support has loaded")
        this.exitApp = () => {
            window.navigator.app.exitApp()
        }
        this.back = () => {
            window.navigator.app.backHistory()
        }
        this.screenShow = () => {
            window.navigator.splashscreen.show();
        }
        this.screenClose = () => {
            window.navigator.splashscreen.hide();
        }
        this.hidebar = () => {
            window.navigator.splashscreen.hide();
        }

        this.showbar = () => {
            window.navigator.splashscreen.hide();
        }

        this.onready(() => {
            this.screenClose()

        });


        this.onready(() => {
            window.screen.orientation.lock('portrait');
            if (cordova && cordova.plugins && cordova.plugins.photoLibrary) {

                this.photoLibrary = cordova.plugins.photoLibrary;
            }
        })
    
        document.addEventListener("deviceready", () => {
            setTimeout(() => {
                this._onready_callback.forEach(func => {
                    func();
                })
            }, 200)
        }, false);



    }
    static _loadScript(src, callback) {
        let script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0];
        script.type = 'text/javascript';
        script.charset = 'UTF-8';
        script.src = src;
        if (script.addEventListener) {
            script.addEventListener('load', () => {
                callback();
            }, false);
        } else if (script.attachEvent) {
            script.attachEvent('onreadystatechange', () => {
                let target = window.event.srcElement;
                if (target.readyState == 'loaded') {
                    callback();
                }
            });
        }
        head.appendChild(script);
    }
}
Native._init();
export default Native;