import _ from "underscore"

const getters = {
    //未读消息数量
    unreadMsg: (state) => state.message.filter(item => item.IsRead == false).length,
    sortedMsgs: (state) => _(state.message).sortBy(item => item.IsRead)
}

export default getters;