import base64 from "./base64"
import moment from "moment"
class LocalCache {

    /**
     * 本地缓存构造函数
     * @param {JSON} param0  
     * { 
     *   key 存储关键key
     *   prefix = "_CNZZDATA_",  //存储Key前缀,有默认值
     *   useBase64 = true, //是否使用Base64加密value
     *   beat = 3  //缓存时间，心跳时间
     * }
     */
    constructor({ prefix = "_CNZZDATA_", key, useBase64 = true, beat = 3 }) {
        this.prefix = prefix;
        this.useBase64 = useBase64;
        this.cacheBeat = this.beat;
        this.key = this.prefix + key;
        this.beat = beat;
    }

    _wrapValue(value) {
        let _wrapV = {
            value: value,
            cacheTime: Date.now()
        };
        return _wrapV
    }

    /**
     * 获取缓存
     */
    getCache(time) {
        let _str_value = localStorage.getItem(this.key), _obj = {}, data;
        if (_str_value && this.useBase64) {
            _str_value = base64.decode(_str_value)
        }

        if (_str_value) {
            try {
                data = JSON.parse(_str_value)
                _obj = data.value;

            } catch (error) { }
        }

        if (time) {
            if (_str_value)
                _obj = data.cacheTime;
            else {
                _obj = null;
            }

        }

        return _obj;
    }

    /**
     * 设置缓存
     */
    setCache(value) {
        let saveValue = this._wrapValue(value), _str_v = JSON.stringify(saveValue);

        if (this.useBase64) {
            _str_v = base64.encode(_str_v);
        }

        localStorage.setItem(this.key, _str_v);
    }
    /**
     * 当前时间是否使用缓存
     */
    get isUseCache() {
        let value = this.getCache(true);
        let useCache = false;
        if (value) {
            useCache = moment(value).add(this.beat, "m").isAfter(moment(Date.now()));
        }
        return useCache
    }

}

export default LocalCache;