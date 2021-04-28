const listLoad = {
  state: {
    orderScroll: 0,
    orderPage:0,
    contractScroll: 0,
    contractPage: 0,
    salePlanScroll: 0,
    salePlanPage: 0,
    customerScroll: 0,
    customerPage: 0,
    performanceScroll: 0,
    performancePage: 0,
    messageSendScroll: 0,
    messageSendPage: 0,
    patentScroll: 0,
    patentPage: 0,
    copyrightScroll: 0,
    copyrightPage: 0,
    trademarkScroll: 0,
    trademarkPage: 0,
    certificateScroll: 0,
    certificatePage: 0,
    policyScroll: 0,
    policyPage: 0,
    projectScroll: 0,
    projectPage: 0,
    approvalScroll: 0,
    approvalPage: 0,
    publicityResultScroll: 0,
    publicityResultPage: 0,
    declareScroll: 0,
    declarePage: 0,
    fileTypeScroll: 0,
    fileTypePage: 0,
    listLoad:false,
  },

  mutations: {
    SET_LEST_LOAD:(state, listLoad) => {
      state.listLoad = listLoad
    },

    SET_ORDER_SCROLL:(state, scroll) => {
      state.orderScroll = scroll
    },
    SET_ORDER_PAGE:(state, scroll) => {
      state.orderPage = scroll
    },

    SET_CONTRACT_SCROLL:(state, scroll) => {
      state.contractScroll = scroll
    },
    SET_CONTRACT_PAGE:(state, scroll) => {
      state.contractPage = scroll
    },

    SET_SALEPLAN_SCROLL:(state, scroll) => {
      state.salePlanScroll = scroll
    },
    SET_SALEPLAN_PAGE:(state, scroll) => {
      state.salePlanPage = scroll
    },

    SET_CUSTOMER_SCROLL:(state, scroll) => {
      state.customerScroll = scroll
    },
    SET_CUSTOMER_PAGE:(state, scroll) => {
      state.customerPage = scroll
    },

    SET_PERFORMANCE_SCROLL:(state, scroll) => {
      state.performanceScroll = scroll
    },
    SET_PERFORMANCE_PAGE:(state, scroll) => {
      state.performancePage = scroll
    },

    SET_MESSAGESEND_SCROLL:(state, scroll) => {
      state.messageSendScroll = scroll
    },
    SET_MESSAGESEND_PAGE:(state, scroll) => {
      state.messageSendPage = scroll
    },

    SET_PATENT_SCROLL:(state, scroll) => {
      state.patentScroll = scroll
    },
    SET_PATENT_PAGE:(state, scroll) => {
      state.patentPage = scroll
    },

    SET_COPYRIGHT_SCROLL:(state, scroll) => {
      state.copyrightScroll = scroll
    },
    SET_COPYRIGHT_PAGE:(state, scroll) => {
      state.copyrightPage = scroll
    },

    SET_TRADEMARK_SCROLL:(state, scroll) => {
      state.trademarkScroll = scroll
    },
    SET_TRADEMARK_PAGE:(state, scroll) => {
      state.trademarkPage = scroll
    },

    SET_CERTIFICATE_SCROLL:(state, scroll) => {
      state.certificateScroll = scroll
    },
    SET_CERTIFICATE_PAGE:(state, scroll) => {
      state.certificatePage = scroll
    },

    SET_POLICY_SCROLL:(state, scroll) => {
      state.policyScroll = scroll
    },
    SET_POLICY_PAGE:(state, scroll) => {
      state.policyPage = scroll
    },

    SET_PROJECT_SCROLL:(state, scroll) => {
      state.projectScroll = scroll
    },
    SET_PROJECT_PAGE:(state, scroll) => {
      state.projectPage = scroll
    },

    SET_APPROVAL_SCROLL:(state, scroll) => {
      state.approvalScroll = scroll
    },
    SET_APPROVAL_PAGE:(state, scroll) => {
      state.approvalPage = scroll
    },

    SET_PUBLICITYRESULT_SCROLL:(state, scroll) => {
      state.publicityResultScroll = scroll
    },
    SET_PUBLICITYRESULT_PAGE:(state, scroll) => {
      state.publicityResultPage = scroll
    },

    SET_DECLARE_SCROLL:(state, scroll) => {
      state.declareScroll = scroll
    },
    SET_DECLARE_PAGE:(state, scroll) => {
      state.declarePage = scroll
    },

    SET_FILETYPE_SCROLL:(state, scroll) => {
      state.fileTypeScroll = scroll
    },
    SET_FILETYPE_PAGE:(state, scroll) => {
      state.fileTypePage = scroll
    },
  },

  actions: {

  }
}

export default listLoad
