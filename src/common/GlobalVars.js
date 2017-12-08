import base64 from "./base64"

/**
 * 是否使用base64
 */
const _use_base64 = false;
/**
 * 保存key的前缀,可能版本不同而修改
 */
const _key_prefix = "29ydCI"

/**
 * 取值入口
 * @param {String} key
 */
function _getValue(key) {
    let value = localStorage.getItem(_key_prefix + key)
    if (_use_base64) {
        value = base64.decode(value);
    }
    return value;
}

/**
 * 设值入口
 * @param {String} key 
 * @param {String} value 
 */
function _setValue(key, value) {
    let saveValue = value;
    if (typeof value !== "string") throw "value must be string type"
    if (_use_base64) {
        saveValue = base64.encode(value);
    }
    localStorage.setItem(_key_prefix + key, saveValue)
}


const keys = {
    SID: "01",
    Token: "02",
    ACNT: "03",
    isNeedVcode: "04",
    GroupID: "05",
    _Games_Cache_key_: "06",//空
    userPwd: "07",
    ptAccount: "08",
    hideACNT: "09",
    loginStatu: '10'
}

class GlobalVars {

    /**
     * 客户端唯一标识
     */
    static get SID() {
        return _getValue(keys.SID) || ""
    }
    static set SID(value) {
        _setValue(keys.SID, value)
    }

    /**
     * 登录Token
     */
    static get Token() {
        return _getValue(keys.Token)
    }

    static set Token(value) {
        _setValue(keys.Token, value)
    }

    /**
     * 用户名
     */
    static get ACNT() {
        return _getValue(keys.ACNT) || ""
    }
    static set ACNT(value) {
        _setValue(keys.ACNT, value)
    }
    /**
     * 用户名隐藏
     */
    static get hideACNT() {
        return _getValue(keys.hideACNT) || ""
    }
    static set hideACNT(value) {
        _setValue(keys.hideACNT, value)
    }
    /**
     * 是否需要验证码
     */
    static get isNeedVcode() {
        let value = _getValue(keys.isNeedVcode) || "";
        if (value === "true") {
            return true;
        }
        else {
            return false;
        }
    }
    static set isNeedVcode(value) {
        _setValue(keys.isNeedVcode, value.toString())
    }

    /**
     * 组ID
     */
    static get GroupID() {
        return _getValue(keys.GroupID) || ""
    }
    static set GroupID(value) {
        _setValue(keys.GroupID, value.toString())
    }

    /**
     * 用户密码
     */
    static get userPwd() {
        debugger
        let value = '';
        value = _getValue(keys.userPwd) || '';
        if (!_use_base64) { value = base64.decode(value); }
        return value;
    }
    static set userPwd(value) {
        let v = value;
        if (!_use_base64) { v = base64.encode(value); }
        _setValue(keys.userPwd, v);
    }

    /**
     * PT账号
     */
    static get ptAccount() {
        return _getValue(keys.ptAccount) || ""
    }
    static set ptAccount(value) {
        _setValue(keys.ptAccount, value.toString())
    }

    /**
     * 登录状态
     */
    static get loginStatu() {
        let _ = _getValue(keys.loginStatu);
        if (_ === "true") return true;
        else return false;
        // return _getValue(keys.loginStatu) || ""
    }
    static set loginStatu(value) {
        _setValue(keys.loginStatu, value.toString())
    }

}

// const _GlobalVars = new GlobalVars();
export default GlobalVars;
