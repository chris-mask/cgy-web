import {getUserInfo, changeMyPassword, logout, getNavigationMenu} from '@/api/user'
import {queryCompanyOssRemainingCapacity} from '@/api/utils'
import router from '../../router/index'


const user = {
  state: {
    name: '',
    accessToken: '',
    tokenType: '',
    refreshToken: '',
    companyId: '',
    companyName: '',
    companyType: '',
    username: '',
    email: '',
    sex: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    userId: '',
    secretKey: '',
    iv: '',
    userSelectData: [],
    userProductSelectData: [],
    navList: [],
    colList: [],
    permissionState: '',
    permissionTime: '',
    encryptOpen: '',
    notEncUrls: [],
    approvalTaskMsg: {},
    customerTaskMsg: {},
    saleplanTaskMsg: {},
    publicDer: '',
    privateDer: '',
    singleCapacity: '',
    totalCapacity: ''
  },

  mutations: {
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    },
    SET_TOKEN_TYPE: (state, tokenType) => {
      state.tokenType = tokenType
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    SET_COMPANY_ID: (state, companyId) => {
      state.companyId = companyId
    },
    SET_COMPANY_NAME: (state, companyName) => {
      state.companyName = companyName
    },
    SET_COMPANY_TYPE: (state, companyType) => {
      state.companyType = companyType;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_SEX: (state, sex) => {
      state.sex = sex
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.userId = id
    },
    SET_SECRETKEY: (state, key) => {
      state.secretKey = key
    },
    SET_IV: (state, iv) => {
      state.iv = iv
    },
    SET_PERMISSION_STATE: (state, permissionState) => {
      state.permissionState = permissionState;
    },
    SET_PERMISSION_TIME: (state, permissionTime) => {
      state.permissionTime = permissionTime
    },

    //立项暂存导入Id
    SET_APPROVAL_TASKMSG: (state, approvalTaskMsg) => {
      state.approvalTaskMsg = approvalTaskMsg;
    },
    //立项暂存导入Id
    SET_CUSTOMER_TASKMSG: (state, customerTaskMsg) => {
      state.customerTaskMsg = customerTaskMsg;
    },
    //立项暂存导入Id
    SET_SALEPLAN_TASKMSG: (state, saleplanTaskMsg) => {
      state.saleplanTaskMsg = saleplanTaskMsg;
    },

    //项目用户
    SET_USER_DATA: (state, files) => {
      state.userSelectData = files
    },
    GET_USER_DATA: (state, files) => {
      state.userSelectData = []
    },
    DEL_USER_DATA: (state, files) => {
      state.userSelectData = files
    },

    //产品用户
    SET_PRODUCTUSER_DATA: (state, files) => {
      state.userProductSelectData = files
    },
    GET_SET_PRODUCTUSER_DATA_FILE: (state, files) => {
      state.userProductSelectData = []
    },
    DEL_SET_PRODUCTUSER_DATA_FILE: (state, files) => {
      state.userProductSelectData = files
    },

    //权限判定数据
    GET_NAV_DATA: (state, data) => {
      // data.forEach(item=>{
      //   if(item.permissionCode =='SYSTEM:BACKGROUND:MANAGE'){
      //     item.meta = {
      //       icon:"background",
      //       title:"后台管理"
      //     }
      //   }
      // });
      state.navList = data;
    },

    SET_ENCRYPTOPEN: (state, encryptOpen) => {
      state.encryptOpen = encryptOpen
    },
    SET_NOTENCURLS: (state, notEncUrls) => {
      state.notEncUrls = notEncUrls
    },

    SET_PUBLICDER: (state, key) => {
      state.publicDer = key
    },
    SET_PRIVATEDER: (state, key) => {
      state.privateDer = key
    },

    SET_SINGLECAPACITY:(state, key)=>{
      state.singleCapacity = key
    },
    SET_TOTALCAPACITY:(state, key)=>{
      state.totalCapacity = key
    },

    //页面左侧栏数据
    GET_COL_LIST: (state, data) => {
      let navData = JSON.parse(JSON.stringify(data));
      if (state.username == '超级管理员' || state.userId == '653643000376107008') {
        navData.forEach(item => {
          if (item.webUrl != null && item.webUrl !== "") {
            item.path = item.webUrl;
            item.isShow = "1"
          } else {
            item.isShow = "2"
          }
          if (item.child.length != 0) {
            item.child.forEach((child, key) => {
              if (child.permissionType == "2") {
                item.child.splice(key, 1);
              }
            })
          }
        })

        state.colList = navData;
      } else {
        navData.forEach((item, index) => {
          if (state.permissionState == 0) {
            if (item.permissionCode == "SYSTEM:RESEARCH:MANAGE") {
              navData.splice(index, 1)
            }
          }
          if (state.permissionState == 1 || state.permissionState == 3) {
            item.webUrl = '/tips';
            item.hideColor = true;
            if (item.child.length != 0) {
              item.child.forEach((child, key) => {
                child.webUrl = '/tips';
                child.hideColor = true;
              })
            }
          }
        });
        let navList = JSON.parse(JSON.stringify(navData));
        navList.forEach(item => {
          if (item.webUrl != null && item.webUrl !== "") {
            item.path = item.webUrl;
            item.isShow = "1"
          } else {
            item.isShow = "2"
          }
          if (item.child.length != 0) {
            item.child.forEach((child, key) => {
              if (child.permissionType == "2") {
                item.child.splice(key, 1);
              }
            })
          }
        })

        state.colList = navList;
      }
    }
  },

  actions: {
    // 动态修改权限
    ChangeRoles({commit}, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.user.username)
          resolve()
        })
      })
    },
    // 修改密码
    ChangeMyPassword({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        changeMyPassword(userInfo.password, userInfo.new_pwd, userInfo.confirm_pwd, user.state.token).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出登陆
    logOut({commit}) {
      return new Promise((resolve, reject) => {
        logout({}).then(() => {
          sessionStorage.removeItem('vuex')
          sessionStorage.removeItem('secretKey')
          sessionStorage.removeItem('iv')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //获取左侧列表数据
    getNavsData({commit}, data) {
      getNavigationMenu(data).then(res => {
        if (res.code == 200) {
          commit('GET_NAV_DATA', res.data);
          commit('GET_COL_LIST', res.data);
        }
      })
    },

    //查询企业Oss企业剩余容量 单位 Byte
    getUploadFileCapacity({commit}){
      queryCompanyOssRemainingCapacity({companyId: user.state.companyId}).then(res=>{
        if(res.code == 200){
          commit('SET_SINGLECAPACITY',res.data.singleCapacity)
          commit('SET_TOTALCAPACITY',res.data.totalCapacity)
        }
      })
    },
  }
}

export default user
