import Vue from 'vue'
const TEST_KEY = 'TEST_KEY'
const REMOVE_NAV_TAB_KEY = 'REMOVE_NAV_TAB_KEY'
const appStore = {
  state: {
    test: {
      value: !+localStorage.getItem(TEST_KEY)
    },
    removeNavTab: ''
  },
  mutations: {
    TEST_CHANGE: (state, value) => {
      localStorage.setItem(TEST_KEY, value)
      state.test.value = value

      // 对象需强制更新视图
      Vue.set(state, 'test', state.test)
    },
    REMOVE_NAV_TAB_KEY: (state, value) => {
      state.removeNavTab = value
    }
  },
  actions: {
    changeTestValue: ({ commit }) => {
      commit('TEST_CHANGE', Date.now())
    },
    removeNavTab: ({ commit }, tabName) => {
      commit(REMOVE_NAV_TAB_KEY, tabName)
    }
  }
}
export default appStore
