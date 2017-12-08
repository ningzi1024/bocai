const state = {
    title: "腾博会",
    showHeader: false,
    showNav: false,
    showMenu: false,
    showBack: false,
    showChat:false,
    style:{},
    cssClass:""

}
const getters = {
    getAll: state => state
}

const mutations = {
    setTitle(state, { title }) {
        state.title = title;
    },
    setShowNav(state, { showNav }) {
        state.showNav = showNav;
    },

    setShowHeader(state, { showHeader }) {
        state.showHeader = showHeader;
    },
    setSiteConfig(state, { 
        title = "腾博会",
        showHeader = true,
        showNav = true,
        showMenu = true,
        showBack = false,
        showChat = true ,
        style = {},
        cssClass="",
        backname=""}) {

        state.title = title;
        state.showHeader = showHeader;
        state.showNav = showNav;
        state.showMenu = showMenu;
        state.showBack = showBack;
        state.showChat = showChat;
        state.style = style;
        state.cssClass = cssClass;

    }



}

const actions = {
    refreshConfig({ commit, state }) {

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}