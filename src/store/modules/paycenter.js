
import moment from "moment"
import ajaxName from "@/api/API.list"
import ajax from "@/api/User"
import config from "@/common/evn.config"
const constructionName = {
    "绿色通道": "green",
    "QQ钱包": "qqscan",
    "微支付": "wechatscan",
    "支付宝扫码": "aliscan",
    "支付宝转支付宝": "ali2ali",
    "支付宝转银行卡": "ali2card",
    "银联支付": "union",
    "点卡支付": "point",
    "第三方网银": "third",
    "银联扫码支付": "UnionScanPay",
    "京东钱包": "JDPay",

    "UnionScanPay": "银联扫码支付",
    "JDPay": "京东钱包",
    "green": "绿色通道",
    "qqscan": "QQ钱包",
    "wechatscan": "微支付",
    "aliscan": "支付宝扫码",
    "ali2ali": "支付宝转支付宝",
    "ali2card": "支付宝转银行卡",
    "union": "银联支付",
    "point": "点卡支付",
    "third": "第三方网银"

}

const UpdateOutTime = 0;//更新渠道间隔时间

const state = {
    action_url: config.action_url,
    error_status: 1,
    isLoading: false,
    updateTime: null,
    channel: {
        green: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        qqscan: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        wechatscan: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        aliscan: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        ali2ali: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        ali2card: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        union: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        point: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        third: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        UnionScanPay: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        },
        JDPay: {
            canuse: false,
            Minimum: 0,
            Maximum: 0
        }
    }
}

const getters = {
    getChannel: state => state.channel
}

const mutations = {
    setBaseValue(state, {
        error_status = 1,
        isLoading = false,
        updateTime = null
    }) {
        state.error_status = error_status;
        state.isLoading = isLoading;
        if (updateTime) state.updateTime = updateTime;
    },
    initValue(state, values = {}) {
        for (let name in values) {
            let currentPaychannel = values[name]
            let channelInfo = {}, temp = [];
            let saveName = constructionName[name]
            // debugger;
            if (saveName) {
                if (typeof (currentPaychannel) === "string") {
                    temp = currentPaychannel.split("|");
                } else if (typeof (currentPaychannel) === "number") {
                    state.channel[saveName].type = currentPaychannel;
                    if (currentPaychannel != 0)
                        state.channel[saveName].canuse = true;
                    else state.channel[saveName].canuse = false;
                }

                if (temp.length > 0) {
                    state.channel[saveName].type = temp[0];
                    state.channel[saveName].params = temp;
                    if (temp[0] != 0) {
                        state.channel[saveName].canuse = true;
                    } else state.channel[saveName].canuse = false;
                }

                //设置最大最小值
                let moneyRule = [];
                // debugger
                if (typeof (currentPaychannel) === "string") {
                    moneyRule = values.PayConfig.filter(item => item.TypeName === state.channel[saveName].params[4])

                } else if (typeof (currentPaychannel) === "number") {
                    let __key;
                    if (saveName === "green")
                        __key = 100001
                    else if (saveName === "ali2card")
                        __key = 100002
                    moneyRule = values.PayConfig.filter(item => item.TypeID === __key)
                }

                if (moneyRule.length > 0) {
                    state.channel[saveName].Minimum = moneyRule[0].Minimum;
                    state.channel[saveName].Maximum = moneyRule[0].Maximum;
                }

                //绿色通道支付，添加银行限制
                if (saveName === "green") {
                    let allowBank = values["绿通银行"]
                    if (allowBank) {
                        state.channel[saveName].allowBank = allowBank.split(",")
                    }
                }
            }
        }

        // console.log(state);
    }
}

const actions = {
    //获取渠道
    initChannel({ commit, state }) {
        let updateTime = state.updateTime;
        let isUpdateState = false;//是否更新渠道
        let nowDate = moment()

        if (!isUpdateState &&
            (updateTime === null || updateTime === undefined)) {
            isUpdateState = true;
        }

        if (!isUpdateState && typeof updateTime === "string") {
            updateTime = moment(state.updateTime);
            // commit("setBaseValue", { updateTime: updateTime })
        }
        if (!isUpdateState && updateTime instanceof moment) {

            if (!updateTime.add(UpdateOutTime, "m").isAfter(nowDate)) {
                isUpdateState = true;

                // console.log("更新时间", updateTime.add(UpdateOutTime, "m").format('YYYY/MM/DD HH:mm:ss'));
                // console.log("当前时间", nowDate.format('YYYY/MM/DD HH:mm:ss'));
                // console.log("比较结果", updateTime.add(UpdateOutTime, "m").isAfter(nowDate));
            }
        }

        if (isUpdateState) {
            // console.log("ajax 更新")

            commit("setBaseValue", { isLoading: true })
            ajax[ajaxName.GetCashChannel]().then(rep => {
                let data = rep.data;
                // debugger;
                if (data.Status === 1) {
                    if (typeof data.row === "string" && data.row.length > 0) {
                        let jsonData = JSON.parse(data.row);
                        // console.log(jsonData)
                        commit("initValue", jsonData);
                        commit("setBaseValue", { updateTime: moment().format(), isLoading: false });
                    }
                } else {
                    commit("setBaseValue", { isLoading: false })
                }
            }).catch(err => {

                commit("setBaseValue", { error_status: -9, isLoading: false });
            });
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}