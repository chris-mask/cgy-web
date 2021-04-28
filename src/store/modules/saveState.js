const saveState = {
  // 企业列表模块 -- 页面跳转需求
  state: {
    isSave: true, // 离开页面时候是否需要弹框提示
    newMessage: '',
  },

  mutations: {
    setIsSave(state, data) {
      state.isSave = data
    },

    SET_MESSAGE_NEW_TIPS: (state, newMessage) => {
      state.newMessage = newMessage
    },
  }
}

export default saveState

