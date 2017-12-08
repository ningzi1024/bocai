import Vue from 'vue'
import Vuex from 'vuex'
import SiteConfig from "./modules/siteConfig.js"
import paycenter from "./modules/paycenter.js"
import Records from "./modules/records.js"
import pubState from "./pub.state"
import pubGetters from "./pub.getters"
import pubMutations from "./pub.mutations"
import pubActions from "./pub.actions"
import member from "./modules/member"

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
        SiteConfig,
        paycenter,
        Records,
        member
    },
    state: pubState,
    getters: pubGetters,
    mutations:pubMutations,
    actions:pubActions,
    strict: debug
})
