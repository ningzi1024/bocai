import axios from "axios"
import UA from "./../common/ua-parser"
import gVars from "./../common/GlobalVars"
import status2cnmsgHanlder from "./rep.status.js"
const axiosConfig = {
    baseURL: "/api.ashx",
    // timeout: 5000,
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        // JSON.stringify(data)
        if (data === null && data === undefined) {
            return data
        }
        if (typeof (data) === "string") {
            return "str=" + encodeURIComponent(data);
        } else {
            return "str=" + encodeURIComponent(JSON.stringify(data));
        }
    }],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {

        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                console.log("JSON解析失败", e);
            }
        }

        return data;
    },
    function (data) {
        // 对 data 进行任意转换处理
        if (data && data.row && data.row.SID) {
            gVars.SID = data.row.SID
        }
        if (data && data.row && data.row.Token) {
            gVars.Token = data.row.Token
        }
        return data;
    },
        status2cnmsgHanlder],
    // `headers` 是即将被发送的自定义请求头
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json'
}
if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == "production_td") {
    axiosConfig.baseURL = "/.api"
} else if (process.env.NODE_ENV == 'production_localtd') {
    axiosConfig.baseURL = "/webapp/api.ashx"
}

// let _ajax = axios.create(axiosConfig);
// const ajax = {
//     post(url,obj){
//         return _ajax.post(url,obj).then((rep)=>{
//             return rep;
//         }).catch(err=>{
//             console.log(err)
//             return err;
//         });
//     }
// };
const ajax = axios.create(axiosConfig);
const webUA = new UA();
let userAgent = {
    "BrowserInfo": window.navigator.userAgent,
    "Host": location.host,
    "BSCore": webUA.getEngine().name + "/" + webUA.getEngine().version,
    "OSVer": webUA.getOS().name + "/" + webUA.getOS().version,
    "Divice": "H5",
    "Phone": webUA.getDevice().model,
    "Terminal": webUA.getOS().name,
    "IP": "[*IP*]",
    "SID": gVars.SID,
    "Token": gVars.Token,
    "ACNT": gVars.ACNT
}

export { userAgent }
export default ajax;
export function extentdData(obj = {}) {
    userAgent.SID = gVars.SID;
    userAgent.Token = gVars.Token;
    if (!obj.ACNT) userAgent.ACNT = gVars.ACNT;
    else delete userAgent.ACNT;
    return Object.assign(obj, userAgent);
}
