webpackJsonp([34],{Jepm:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("tZro"),o=a("rN1C"),s={data:function(){return{loading:!1,currentPage:1,currentPage1:1,messageForm:{page:0,pageSize:15},projectList:[],messageTemplateList:[],messageCompanyList:[],messageDetailList:[],msgDetailTotal:0,total:0,dialogVisible:!1,allowGetRoleUserList:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:ROLE:USER:LIST"),msgDetailForm:{page:0,pageSize:10},projectForm:{page:0,pageSize:15}}},activated:function(){this.getSendList(),this.getProjectList(),this.getMessageTemplate(),this.$nextTick(function(){var e=this.$store.getters.messageSendScroll;document.documentElement.scrollTop=document.body.scrollTop=e})},directives:{loadMore:{bind:function(e,t){e.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&t.value()})}}},beforeRouteLeave:function(e,t,a){var n=document.documentElement.scrollTop;this.$store.commit("SET_MESSAGESEND_SCROLL",n),this.$store.commit("SET_MESSAGESEND_PAGE",this.messageForm.page),a()},methods:{getProjectList:function(){var e=this;Object(o.e)(this.projectForm).then(function(t){200===t.code&&(e.projectForm.page>0?e.projectList=e.projectList.concat(t.data.data):e.projectList=t.data.data)})},loadMore:function(){this.projectForm.page=this.projectForm.page+15,this.getProjectList()},projectListMethod:function(e){var t=this;this.projectForm.page=0,this.projectForm.projectName=e,this.loading=!0,setTimeout(function(){t.loading=!1,t.getProjectList(e)},200)},getMessageTemplate:function(){var e=this;Object(n.p)().then(function(t){200===t.code&&(e.messageTemplateList=t.data)})},goSearch:function(){this.messageForm.page=0,this.messageForm.pageSize=15,this.getSendList()},getSendList:function(){var e=this;Object(n.o)(this.messageForm).then(function(t){200===t.code&&(e.messageCompanyList=t.data.data,e.total=t.data.total)})},handleCurrentChange:function(e){this.messageForm.page=(e-1)*this.messageForm.pageSize,this.getSendList()},handleSizeChange:function(e){this.messageForm.pageSize=e,this.getSendList()},getMsgDetailList:function(){var e=this;Object(n.n)(this.msgDetailForm).then(function(t){200===t.code&&(e.messageDetailList=t.data.data,e.msgDetailTotal=t.data.total)})},handleSearch:function(){this.msgDetailForm.page=0,this.getMsgDetailList()},handleSizeChange1:function(e){this.msgDetailForm.pageSize=e,this.getMsgDetailList()},handleCurrentChange1:function(e){this.msgDetailForm.page=(e-1)*this.msgDetailForm.pageSize,this.getMsgDetailList()},goSelectCompany:function(){this.$router.push({path:"/customer/messageMassSend/addNewMessage"})},openSendDetail:function(e){this.dialogVisible=!0,this.msgDetailForm={},this.msgDetailForm.page=0,this.msgDetailForm.pageSize=10,this.msgDetailForm.smsTemplate=e.smsTemplate,this.msgDetailForm.sendTime=e.sendTime,this.msgDetailForm.projectIds=e.projectIds,this.msgDetailForm.userId=e.userId,this.getMsgDetailList()},handleClose:function(){this.dialogVisible=!1},goCompanyDatail:function(e){this.$router.push({path:"/customer/editCustomer",query:{id:e.companyId,check:!0}})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-card",{staticClass:"box-card box-margin",staticStyle:{"margin-bottom":"20px"}},[a("div",{staticClass:"searchCont"},[a("div",{staticClass:"searchLeft"},[a("el-select",{directives:[{name:"loadMore",rawName:"v-loadMore",value:e.loadMore,expression:"loadMore"}],attrs:{filterable:"",multiple:"",remote:"","remote-method":e.projectListMethod,loading:e.loading,size:"small",placeholder:"项目名称",clearable:""},on:{change:e.goSearch},model:{value:e.messageForm.projectIds,callback:function(t){e.$set(e.messageForm,"projectIds",t)},expression:"messageForm.projectIds"}},e._l(e.projectList,function(e){return a("el-option",{key:e.projectId,attrs:{label:e.projectName,value:e.projectId}})}),1),e._v(" "),a("el-select",{attrs:{filterable:"",multiple:"",size:"small",placeholder:"短信模板",clearable:""},on:{change:e.goSearch},model:{value:e.messageForm.smsTemplateList,callback:function(t){e.$set(e.messageForm,"smsTemplateList",t)},expression:"messageForm.smsTemplateList"}},e._l(e.messageTemplateList,function(e){return a("el-option",{key:e.dictCode,attrs:{label:e.dictName,value:e.dictName}})}),1),e._v(" "),a("el-date-picker",{attrs:{type:"date",size:"small","value-format":"yyyy-MM-dd",placeholder:"选择发送日期"},on:{change:e.goSearch},model:{value:e.messageForm.sendTime,callback:function(t){e.$set(e.messageForm,"sendTime",t)},expression:"messageForm.sendTime"}})],1),e._v(" "),a("div",{staticClass:"searchRig"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.goSelectCompany}},[e._v("新建短信")])],1)])]),e._v(" "),a("el-card",{staticClass:"box-card box-margin"},[a("div",[a("el-table",{ref:"messageCompanyList",attrs:{data:e.messageCompanyList,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"短信模板"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.smsTemplate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"关联项目"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.projectNames))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"发送日期"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("parseTime")(t.row.sendTime,"{y}-{m}-{d}")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否定时发送"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.isTiming?a("span",{staticStyle:{color:"red"}},[e._v("是")]):a("span",[e._v("否")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"发送人"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sendUserName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"接收企业数"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.companyNum))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"发送短信数"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.smsSendNum))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"spanButton",on:{click:function(a){return e.openSendDetail(t.row)}}},[e._v("发送详情")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[15,30,60,90],"page-size":e.messageForm.pageSize,layout:"prev, pager, next,sizes, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)]),e._v(" "),a("el-dialog",{attrs:{title:"短信发送详情",visible:e.dialogVisible,width:"70%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",[a("el-input",{staticStyle:{width:"20%"},attrs:{placeholder:"企业名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSearch(t)}},model:{value:e.msgDetailForm.companyName,callback:function(t){e.$set(e.msgDetailForm,"companyName",t)},expression:"msgDetailForm.companyName"}}),e._v(" "),a("el-button",{staticClass:"filter-item bg_blue",attrs:{icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("搜索")])],1),e._v(" "),a("div",[a("el-table",{ref:"messageDetailList",attrs:{data:e.messageDetailList,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"企业名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.companyName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"160px",label:"短信内容（该企业接收到多条时，只列出其中一条）"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.smsContent))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"短信接收人"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.userName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"接收号码"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.toMobile))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"定时发送时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.isTiming?a("span",[e._v(e._s(t.row.sendTime))]):a("span",[e._v("非定时发送短信")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage1,"page-sizes":[10,30,50,100],"page-size":e.msgDetailForm.pageSize,layout:"prev, pager, next,sizes, jumper",total:e.msgDetailTotal},on:{"size-change":e.handleSizeChange1,"current-change":e.handleCurrentChange1,"update:currentPage":function(t){e.currentPage1=t},"update:current-page":function(t){e.currentPage1=t}}})],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)])],1)},staticRenderFns:[]};var l=a("VU/8")(s,i,!1,function(e){a("kXB9")},"data-v-392d61bd",null);t.default=l.exports},iTkU:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.searchCont[data-v-392d61bd] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.searchCont .searchLeft[data-v-392d61bd] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-v-392d61bd] .el-input {\n  width: auto;\n  margin-right: 10px;\n}\n[data-v-392d61bd] .el-table {\n  border: #d9f2ff 1px solid !important;\n}\n[data-v-392d61bd] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-392d61bd] .el-table--border th,[data-v-392d61bd] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-392d61bd] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-392d61bd] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-392d61bd] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-392d61bd] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n[data-v-392d61bd] .el-dialog__header {\n  background: #05AAFF;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n[data-v-392d61bd] .el-dialog__header /deep/ .el-dialog__title {\n  color: #fff;\n  font-size: 16px;\n}\n[data-v-392d61bd] .el-dialog__header /deep/ .el-dialog__headerbtn {\n  border-radius: 50%;\n  background: #fff;\n  padding: 4px;\n  font-size: 12px;\n  font-weight: 400;\n}\n[data-v-392d61bd] .el-dialog__header /deep/ .el-dialog__headerbtn /deep/ .el-dialog__close {\n  color: #05AAFF;\n}\n[data-v-392d61bd] .el-dialog__footer {\n  text-align: center;\n}\n[data-v-392d61bd] .el-dialog__footer /deep/ .el-button {\n  border-radius: 2px;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 20px;\n}\n.spanButton[data-v-392d61bd] {\n  color: #05AAFF;\n}\n.shu[data-v-392d61bd] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.col_red[data-v-392d61bd] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-392d61bd]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-392d61bd] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-392d61bd]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-392d61bd] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-392d61bd]:hover {\n  opacity: 0.5;\n}\n[data-v-392d61bd] .el-select {\n  margin-right: 10px;\n}\n.headerTop[data-v-392d61bd] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.noMore[data-v-392d61bd] {\n  text-align: center;\n  font-size: 14px;\n  padding: 10px 0;\n  cursor: pointer;\n}\n.el-pagination[data-v-392d61bd] {\n  margin: 0 auto;\n  text-align: center;\n  margin-top: 20px;\n}\n.el-pagination__jump[data-v-392d61bd] {\n  margin-left: 0;\n}\n",""])},kXB9:function(e,t,a){var n=a("iTkU");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("8c012326",n,!0)}});