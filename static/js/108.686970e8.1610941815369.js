webpackJsonp([108],{GKEs:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("tZro"),r={data:function(){return{companyId:this.$store.getters.companyId,startDate:"",endDate:"",remindType:0,allNumber:"",noReadNumber:"",listData:[],remindCount:{upcoming:0,maturity:0,remind:0},sysVisible:!1,sysModalData:{},page:0,pageSize:20,isShowGetMore:!0}},mounted:function(){this.getList()},methods:{getList:function(){var e=this,t={companyId:this.companyId,remindType:this.remindType,markRead:!1,startDate:this.startDate,endDate:this.endDate,page:this.page,pageSize:this.pageSize};Object(n.m)(t).then(function(t){if(200===t.code&&(e.listData=t.data.remindList,t.data.remindCount))switch(e.remindCount=t.data.remindCount,e.allNumber=Number(t.data.remindCount.upcoming)+Number(t.data.remindCount.maturity)+Number(t.data.remindCount.remind),e.remindType){case 1:e.noReadNumber=Number(t.data.remindCount.upcomingUnread);break;case 2:e.noReadNumber=Number(t.data.remindCount.maturityUnread);break;case 3:e.noReadNumber=Number(t.data.remindCount.remindUnread);break;default:e.noReadNumber=Number(t.data.remindCount.upcomingUnread)+Number(t.data.remindCount.maturityUnread)+Number(t.data.remindCount.remindUnread)}})},tabHandle:function(e){this.page=0,this.pageSize=20,this.isShowGetMore=!0,this.remindType=e,this.getList()},titleHandle:function(e){this.sysModalData=e,this.sysVisible=!0},readAllHandle:function(){var e=this,t={companyId:this.companyId,remindType:this.remindType,markRead:!0,startDate:this.startDate,endDate:this.endDate,page:this.page,pageSize:this.pageSize};Object(n.s)(t).then(function(t){200===t.code&&e.getList()})},getDetailHandle:function(e){var t=this;Object(n.l)({remindId:e}).then(function(a){if(200===a.code)switch(t.listData.forEach(function(t){t.remindId===e&&(t.isRead=1)}),a.data.relType){case 1:t.$router.push({path:"/contract/checkContract",query:{contractId:a.data.relId,isCheck:!0}});break;case 2:t.$router.push({path:"/declareCoordination/orderManage/orderDetail",query:{orderId:a.data.relId,isCheck:!0}});break;case 3:t.$router.push({path:"/ipr/patent/form/detail",query:{type:"read",patentId:a.data.relId}});break;case 4:t.$router.push({path:"/ipr/trademark/form/detail",query:{type:"read",trademarkId:a.data.relId}});break;case 5:t.$router.push({path:"/declareCoordination/orderManage/orderDetail",query:{orderId:a.data.relId,isCheck:!0}})}})},getMore:function(){var e=this;this.page+=20,this.pageSize+=20;var t={companyId:this.companyId,remindType:this.remindType,markRead:!0,startDate:this.startDate,endDate:this.endDate,page:this.page,pageSize:this.pageSize};Object(n.m)(t).then(function(t){if(200===t.code){if(0===t.data.remindList.length)return e.isShowGetMore=!1,!1;e.listData=e.listData.concat(t.data.remindList)}})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-card",{staticClass:"system-card"},[a("div",{ref:"navBarHeight",staticClass:"system-nav-bar"},[a("div",{staticClass:"left"},[a("div",{class:0===e.remindType?"all cur":"all",on:{click:function(t){return e.tabHandle(0)}}},[e._v("全部("+e._s(e.allNumber?e.allNumber:0)+")")]),e._v(" "),a("div",{class:-1===e.remindType?"unread cur":"unread",on:{click:function(t){return e.tabHandle(-1)}}},[e._v("未读("+e._s(e.noReadNumber?e.noReadNumber:0)+")")]),e._v(" "),a("span",{staticClass:"line-center"},[e._v("|")]),e._v(" "),a("div",{class:1===e.remindType?"done cur":"done",on:{click:function(t){return e.tabHandle(1)}}},[e._v("\n          待办消息("+e._s(e.remindCount.upcoming)+")\n        ")]),e._v(" "),a("div",{class:2===e.remindType?"expire cur":"expire",on:{click:function(t){return e.tabHandle(2)}}},[e._v("\n          到期消息("+e._s(e.remindCount.maturity)+")\n        ")]),e._v(" "),a("span",{staticClass:"line-center"},[e._v("|")]),e._v(" "),a("div",{on:{click:e.readAllHandle}},[e._v("全部标为已读")])]),e._v(" "),a("div",{staticClass:"right"},[a("el-date-picker",{staticClass:"time",attrs:{type:"date",placeholder:"开始日期","value-format":"yyyy-MM-dd"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}}),e._v("\n        至\n        "),a("el-date-picker",{staticClass:"time",attrs:{type:"date",placeholder:"结束日期","value-format":"yyyy-MM-dd"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}}),e._v(" "),a("el-button",{staticClass:"filter-item search-btn",on:{click:e.getList}},[e._v("搜索")])],1)]),e._v(" "),a("div",{staticClass:"system-list"},[e._l(e.listData,function(t,n){return a("div",{key:n,staticClass:"item",on:{click:function(a){return e.getDetailHandle(t.remindId)}}},[a("div",{staticClass:"left"},[a("div",{class:0===t.remindType?"pic blue":1===t.remindType?"pic orange":3===t.remindType?"pic green":"pic"},[e._v("\n            "+e._s(0===t.remindType?"待办消息":1===t.remindType?"到期消息":3===t.remindType?"提醒消息":"")+"\n            "),0===t.isRead?a("div",{staticClass:"tip"}):e._e()])]),e._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"title"},[a("span",{class:0===t.remindType?"system-type blue":1===t.remindType?"system-type orange":3===t.remindType?"system-type green":"system-type",on:{click:function(a){return a.stopPropagation(),e.titleHandle(t)}}},[e._v("\n              "+e._s(0===t.remindType?"待办消息":1===t.remindType?"到期消息":3===t.remindType?"提醒消息":"")+"\n            ")]),e._v("\n            "+e._s(t.companyName)+"\n          ")]),e._v(" "),a("div",{staticClass:"text"},[e._v("\n            "+e._s(t.remindContent)+"\n          ")])])])}),e._v(" "),a("div",{staticClass:"get-more-data"},[e.isShowGetMore?a("span",{on:{click:e.getMore}},[e._v("点击加载更多")]):a("div",{staticClass:"no-more"},[e._v("没有更多数据了")])])],2),e._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],staticClass:"editorUserModal",attrs:{title:"查看",visible:e.sysVisible,width:"600px"},on:{"update:visible":function(t){e.sysVisible=t}}},[a("el-form",{ref:"implementForm",attrs:{"label-width":"120px"}},[a("el-form-item",{attrs:{label:"消息类型："}},[a("span",[e._v("\n            "+e._s(0===e.sysModalData.remindType?"待办消息":1===e.sysModalData.remindType?"到期消息":3===e.sysModalData.remindType?"提醒消息":"")+"\n          ")])]),e._v(" "),a("el-form-item",{attrs:{label:"消息内容："}},[a("span",[e._v("您的客户："+e._s(e.sysModalData.remindContent))])]),e._v(" "),a("el-form-item",{attrs:{label:"提醒时间："}},[a("span",[e._v(e._s(e.sysModalData.sendTime))])])],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"cananl",on:{click:function(t){e.sysVisible=!1}}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(r,s,!1,function(e){a("RYbD")},"data-v-d5cb8b0a",null);t.default=d.exports},RYbD:function(e,t,a){var n=a("e754");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("9a6ab24a",n,!0)},e754:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.system-card[data-v-d5cb8b0a] {\n  border: 0;\n}\n.system-card[data-v-d5cb8b0a] .el-card__body {\n  padding: 0;\n}\n.system-card .system-nav-bar[data-v-d5cb8b0a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  border-bottom: 1px solid #DBE9FF;\n  padding: 10px 20px;\n}\n.system-card .system-nav-bar .left[data-v-d5cb8b0a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.system-card .system-nav-bar .left div[data-v-d5cb8b0a] {\n  height: 30px;\n  line-height: 30px;\n  margin-right: 14px;\n  border: 1px solid;\n  font-size: 16px;\n  text-align: center;\n  padding: 0 10px;\n  border-radius: 2px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.system-card .system-nav-bar .left .line-center[data-v-d5cb8b0a] {\n  color: rgba(68, 68, 68, 0.29803922);\n  margin-right: 14px;\n}\n.system-card .system-nav-bar .left .all[data-v-d5cb8b0a] {\n  border-color: #05AAFF;\n  color: #05AAFF;\n}\n.system-card .system-nav-bar .left .all.cur[data-v-d5cb8b0a] {\n  background: #05AAFF;\n  color: #fff;\n}\n.system-card .system-nav-bar .left .unread[data-v-d5cb8b0a] {\n  border-color: #F56C6C;\n  color: #F56C6C;\n}\n.system-card .system-nav-bar .left .unread.cur[data-v-d5cb8b0a] {\n  background: #F56C6C;\n  color: #fff;\n}\n.system-card .system-nav-bar .left .done[data-v-d5cb8b0a] {\n  border-color: #05AAFF;\n  color: #05AAFF;\n}\n.system-card .system-nav-bar .left .done.cur[data-v-d5cb8b0a] {\n  background: #05AAFF;\n  color: #fff;\n}\n.system-card .system-nav-bar .left .expire[data-v-d5cb8b0a] {\n  border-color: #FFA96A;\n  color: #FFA96A;\n}\n.system-card .system-nav-bar .left .expire.cur[data-v-d5cb8b0a] {\n  background: #FFA96A;\n  color: #fff;\n}\n.system-card .system-nav-bar .left .warn[data-v-d5cb8b0a] {\n  border-color: #48D462;\n  color: #48D462;\n}\n.system-card .system-nav-bar .left .warn.cur[data-v-d5cb8b0a] {\n  background: #48D462;\n  color: #fff;\n}\n.system-card .system-nav-bar .right[data-v-d5cb8b0a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.system-card .system-nav-bar .right .time[data-v-d5cb8b0a] {\n  width: 140px;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.29803922);\n}\n.system-card .system-nav-bar .right .time[data-v-d5cb8b0a] .el-input__inner {\n  border: 0;\n  padding-right: 0;\n}\n.system-card .system-nav-bar .right .search-btn[data-v-d5cb8b0a] {\n  width: 60px;\n  height: 30px;\n  padding: 0;\n  border-radius: 4px;\n  color: #fff;\n  border: 0;\n  background: -webkit-gradient(linear, left top, left bottom, from(#69ccff), to(#05aaff));\n  background: linear-gradient(180deg, #69ccff 0%, #05aaff 100%);\n}\n.system-card .system-list[data-v-d5cb8b0a] {\n  overflow-y: auto;\n}\n.system-card .system-list .item[data-v-d5cb8b0a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.14901961);\n  padding: 20px;\n  cursor: pointer;\n}\n.system-card .system-list .item .left[data-v-d5cb8b0a] {\n  margin-right: 30px;\n}\n.system-card .system-list .item .left .pic[data-v-d5cb8b0a] {\n  min-width: 70px;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  color: #fff;\n  position: relative;\n  font-size: 14px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 15px;\n  text-align: center;\n}\n.system-card .system-list .item .left .pic .tip[data-v-d5cb8b0a] {\n  width: 12px;\n  height: 12px;\n  background: #F56C6C;\n  position: absolute;\n  right: 5px;\n  top: 2px;\n  border-radius: 50%;\n}\n.system-card .system-list .item .left .pic.blue[data-v-d5cb8b0a] {\n  background: #05AAFF;\n}\n.system-card .system-list .item .left .pic.orange[data-v-d5cb8b0a] {\n  background: #FFA96A;\n}\n.system-card .system-list .item .left .pic.green[data-v-d5cb8b0a] {\n  background: #48D462;\n}\n.system-card .system-list .item .right[data-v-d5cb8b0a] {\n  font-size: 14px;\n}\n.system-card .system-list .item .right .title[data-v-d5cb8b0a] {\n  color: rgba(68, 68, 68, 0.75);\n  margin-bottom: 14px;\n}\n.system-card .system-list .item .right .title .system-type[data-v-d5cb8b0a] {\n  margin-right: 14px;\n}\n.system-card .system-list .item .right .title .system-type.blue[data-v-d5cb8b0a] {\n  color: #05AAFF;\n}\n.system-card .system-list .item .right .title .system-type.orange[data-v-d5cb8b0a] {\n  color: #FFA96A;\n}\n.system-card .system-list .item .right .title .system-type.green[data-v-d5cb8b0a] {\n  color: #48D462;\n}\n.system-card .system-list .item .right .text[data-v-d5cb8b0a] {\n  color: #444;\n}\n.system-card .system-list .get-more-data[data-v-d5cb8b0a] {\n  padding: 20px 0;\n  text-align: center;\n}\n.system-card .system-list .get-more-data .no-more[data-v-d5cb8b0a] {\n  color: #ccc;\n}\n.system-card .system-list .get-more-data span[data-v-d5cb8b0a] {\n  cursor: pointer;\n}\n.system-card .editorUserModal[data-v-d5cb8b0a] .el-dialog__header {\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n  padding: 20px 20px 16px;\n}\n.system-card .editorUserModal[data-v-d5cb8b0a] .el-dialog__title {\n  line-height: 0;\n}\n.system-card .editorUserModal[data-v-d5cb8b0a] .el-dialog__headerbtn {\n  top: 19px;\n}\n.system-card .editorUserModal[data-v-d5cb8b0a] .el-dialog__body {\n  padding: 14px;\n}\n.system-card .editorUserModal[data-v-d5cb8b0a] .el-form-item__label {\n  font-weight: normal;\n  color: rgba(68, 68, 68, 0.75);\n}\n.system-card .editorUserModal[data-v-d5cb8b0a] .el-form-item__content {\n  width: 73%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.system-card .editorUserModal .user-input[data-v-d5cb8b0a] .el-input__inner {\n  border: 0;\n  border-radius: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.system-card .editorUserModal .user-input.input[data-v-d5cb8b0a] {\n  width: 100%;\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.system-card .editorUserModal .user-input.input[data-v-d5cb8b0a]:focus {\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.system-card .editorUserModal .user-select[data-v-d5cb8b0a] {\n  width: 100%;\n}\n.system-card .editorUserModal .switch-btn[data-v-d5cb8b0a] {\n  font-size: 14px;\n  color: #fff;\n  background: #05aaff;\n  margin-left: 10px;\n}\n.system-card .editorUserModal .switch-btn[data-v-d5cb8b0a]:active {\n  opacity: 0.5;\n}\n.system-card .editorUserModal .modal-radio[data-v-d5cb8b0a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.system-card .editorUserModal .modal-radio[data-v-d5cb8b0a] .el-form-item__content {\n  margin-left: 0 !important;\n}\n.system-card .editorUserModal .dialog-footer .setBtn[data-v-d5cb8b0a] {\n  color: #fff;\n  background: #05aaff;\n}\n.system-card .editorUserModal .dialog-footer .cananl[data-v-d5cb8b0a] {\n  background: #fff;\n  color: #444444;\n}\n.system-card .noData[data-v-d5cb8b0a] {\n  text-align: center;\n  color: #909399;\n  height: 50px;\n  line-height: 50px;\n  font-size: 14px;\n}\n",""])}});