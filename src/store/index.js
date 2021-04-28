import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import listLoad from './modules/listLoad'
import saveState from './modules/saveState'
import tree from './modules/tree'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的user
        user: val.user
      }
    }
  })],
  state: {
    pagePath: ''
  },
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    listLoad,
    saveState,
    tree
  },
  getters
})
export default store
