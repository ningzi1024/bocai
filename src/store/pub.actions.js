import moment from "moment"
import ajaxName from "@/api/API.list"
import ajax from "@/api/User"

let lastUpdateTime = null;
let updateSpeed = 0;
let isLoadingData = false;
const actions = {
    /**
     * 获取账户余额
     * @param {*无参数}
     */
    getBalance({ commit, state }) {
        let isSendAjax = false;
        if (!isSendAjax && lastUpdateTime === null) isSendAjax = true;
        if (!isSendAjax && lastUpdateTime && lastUpdateTime.add(updateSpeed, "m").isBefore(Date.now())) isSendAjax = true;
        if (isSendAjax && !isLoadingData) {
            // console.log('更新Balance');
            commit("showLoading", true);
            isLoadingData = true;
            ajax[ajaxName.UserBalance]().then(rep => {
                let data = rep.data;
                isLoadingData = false;
                commit("showLoading", false);
                if (data.Status === 1) {
                    let _balance = 0;
                    // debugger;
                    if (data.row) _balance =data.row !== ""? parseFloat( data.row.replace(/,/g,"")) : 0;
                    commit("setBalance", _balance);
                    lastUpdateTime = moment(Date.now());
                } else {
                    commit("globalStatus", data.Status);
                }
            }).catch(err => {
                commit("globalStatus", -9);
                commit("showLoading", false);
            });
        }
    },
    /**
     * 获取消息
     */
    getMessages({ commit, state }){
        ajax[ajaxName.GetMemberMsg]().then(rep => {
            let data = rep.data;
            if (data.Status === 1) {
                commit("setMessage",data.row)
            } else {
                this.sysErrCheck(data.Status).then(canrun => {
                    if (canrun) {
                        this.alert({ mes: data.CNMessage, })
                    }
                });
            }
        }).catch(err => {
            // this.sysErrCheck(-9);
        })
    }
}

export default actions;
