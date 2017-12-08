import gVar from "../common/GlobalVars"
const mutations = {
    showLoading(state, isShow) {
        state.showLoading = isShow;
    },
    globalStatus(state, number) {
        state.globalStatus = number;
    },
    setBalance(state, number) {
        state.balance = number;
    },
    setRouterLoading(state, isLoading) {
        state.routerLoading = isLoading;
    },
    setUser(state, { userName = null, hideACNT = null, isLogin = false }) {
        state.user = userName;
        state.hideACNT = hideACNT;
        state.isLogin = isLogin;
        // console.log("####"+state.user,state.hideACNT)
    },
    setUrlFrom(state, from = null) {
        state.urlFrom = from;
    },
    setMessage(state, msg = []) {
        state.message = msg;
    },
    pushMsg(state, msg = null) {
        // debugger;
        if (msg !== null) {
            let localObj = state.message.find(item => item.ID === msg.ID)
            if (!localObj) state.message.unshift(msg);
            console.log(state.message)
        }
    },
    setMsgRead(state,id=null){
        if (id !== null) {
            let localObj = state.message.find(item => item.ID == id)
            if (localObj) localObj.IsRead = true;
        }
    }
}

export default mutations;