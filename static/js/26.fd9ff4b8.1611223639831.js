webpackJsonp([26],{eclj:function(n,e,t){var a=t("zIbf");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("rjj0")("1010045f",a,!0)},tqDa:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("vLgD");t("s01O");function o(n){return Object(a.a)({url:"/message/api/portalpublic/socket/queryUserOnlineCount",method:"get",params:n})}var r={name:"index",data:function(){return{onlineUserList:[],innerUserCount:0,listLoading:!1}},mounted:function(){this.getOnlineUserList()},methods:{getOnlineUserList:function(){var n=this;this.listLoading=!0,o({}).then(function(e){200===e.code&&(n.onlineUserList=e.data.innerUserList,o({}).then(function(e){if(200===e.code){var t=e.data.innerUserList;t.map(function(e,a){n.onlineUserList.find(function(n){return n.userId==e.userId})||n.onlineUserList.push(t[a])})}n.listLoading=!1,n.innerUserCount=n.onlineUserList.length}))})}}},i={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"app-container"},[t("el-card",{staticClass:"box-card box-margin"},[t("div",{staticClass:"materielTable"},[t("div",[n._v("当前在线人数："),t("span",{staticStyle:{color:"red"}},[n._v(n._s(n.innerUserCount))]),n._v("人")]),n._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:n.listLoading,expression:"listLoading"}],attrs:{data:n.onlineUserList,border:"",fit:"","highlight-current-row":"","row-key":"roleId"}},[t("el-table-column",{attrs:{label:"序号",align:"center",type:"index",width:"100"}}),n._v(" "),t("el-table-column",{attrs:{align:"center","min-width":"100px",label:"公司名称",prop:"companyName"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",[n._v(n._s(e.row.companyName))])]}}])}),n._v(" "),t("el-table-column",{attrs:{align:"center","min-width":"100px",label:"登录名称",prop:"loginName"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",[n._v(n._s(e.row.loginName))])]}}])}),n._v(" "),t("el-table-column",{attrs:{align:"center","min-width":"100px",label:"用户名称",prop:"userName"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",[n._v(n._s(e.row.userName))])]}}])}),n._v(" "),t("el-table-column",{attrs:{align:"center","min-width":"100px",label:"电话号码",prop:"phoneNumber"},scopedSlots:n._u([{key:"default",fn:function(e){return[t("span",[n._v(n._s(e.row.phoneNumber))])]}}])})],1)],1)])],1)},staticRenderFns:[]};var d=t("VU/8")(r,i,!1,function(n){t("eclj")},"data-v-64db949e",null);e.default=d.exports},zIbf:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n[data-v-64db949e] .clearfix:after {\n  display: none;\n}\n[data-v-64db949e] .el-input {\n  width: auto;\n}\n.headerTop[data-v-64db949e] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.headerLeft .searchInput[data-v-64db949e] {\n  margin-right: 10px;\n}\n.headerRig .choose[data-v-64db949e] {\n  margin-right: 22px;\n}\n[data-v-64db949e] .el-table {\n  border: #d9f2ff 1px solid !important;\n}\n[data-v-64db949e] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-64db949e] .el-table--border th,[data-v-64db949e] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-64db949e] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-64db949e] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-64db949e] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-64db949e] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n.spanButton[data-v-64db949e] {\n  color: #05AAFF;\n}\n.shu[data-v-64db949e] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.col_red[data-v-64db949e] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-64db949e]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-64db949e] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-64db949e]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-64db949e] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-64db949e]:hover {\n  opacity: 0.5;\n}\n[data-v-64db949e] .pagination-container {\n  margin-top: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n[data-v-64db949e] .el-pagination__total {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.totalText[data-v-64db949e] {\n  font-size: 14px;\n  font-family: 'PingFang SC';\n  font-weight: 400;\n  line-height: 20px;\n  color: #444444;\n}\n.totalText span[data-v-64db949e] {\n  margin-right: 20px;\n}\n[data-v-64db949e] .el-pagination.is-background .btn-next,[data-v-64db949e] .el-pagination.is-background .btn-prev,[data-v-64db949e] .el-pagination.is-background .el-pager li {\n  background: none;\n  border: #D5D5D5 1px solid;\n  color: #8B8B8B;\n  font-size: 12px;\n  font-weight: normal;\n}\n[data-v-64db949e] .el-pagination.is-background .el-pager li.active {\n  background: #05AAFF;\n  color: #fff;\n  border: #05AAFF 1px solid;\n}\n[data-v-64db949e] .el-card.is-always-shadow,[data-v-64db949e] .el-card.is-hover-shadow:focus,[data-v-64db949e] .el-card.is-hover-shadow:hover {\n  -webkit-box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n          box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n}\n[data-v-64db949e] .el-table .sort-caret.ascending {\n  border-bottom-color: #fff;\n}\n[data-v-64db949e] .el-table .ascending .sort-caret.ascending {\n  border-bottom-color: #409EFF !important;\n}\n[data-v-64db949e] .el-table .descending .sort-caret.descending {\n  border-top-color: #409EFF !important;\n}\n[data-v-64db949e] .el-table .sort-caret.descending {\n  border-top-color: #fff;\n}\n[data-v-64db949e] .el-table .cell {\n  /*text-align: left;*/\n}\n[data-v-64db949e] .el-table .el-table__expand-icon {\n  display: none;\n}\n.projectName[data-v-64db949e] {\n  cursor: pointer;\n}\n.projectName .showOrHiden[data-v-64db949e] {\n  display: inline-block;\n  color: #333;\n  margin-right: 10px;\n}\n.productName[data-v-64db949e] {\n  padding-left: 24px;\n  color: #333;\n}\n.productName[data-v-64db949e]:hover {\n  opacity: 0.5;\n  cursor: pointer;\n  /*text-decoration: underline;*/\n}\n",""])}});