webpackJsonp([31],{"4QHr":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("Q5rI"),i=(t("evsg"),t("uB1z"),t("rN1C"),t("5ybE"),t("l8D1"),t("c8+v")),o=t("AvzY"),s={data:function(){return{btnFlag:0,singnForm:{page:0,pageSize:1e8},total:0,projectList:[],deptmentList:[],selectConditionsList:{},signDate:[],entryDate:[],projectReport:[],provinceList:[],cityList:[],districtList:[],townList:[],level:3,parentId:0,listTotal:"",loading:!1,allowGetDeptList:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:DEPT:MANAGE","SYSTEM:DEPT:LIST"),salePlan:[],companyList:[],userList:[],curThead:""}},activated:function(){this.getCompanyDeptTrees()},directives:{loadMore:{bind:function(e,n){e.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&n.value()})}}},methods:{backTop:function(){var e=this,n=setInterval(function(){var t=Math.floor(-e.scrollTop/5);document.documentElement.scrollTop=document.body.scrollTop=e.scrollTop+t,0===e.scrollTop&&clearInterval(n)},16)},scrollToTop:function(){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollTop=e,this.scrollTop>0?this.btnFlag=!0:this.btnFlag=!1},topTableSort:function(e){var n=e.column,t=e.prop,a=e.order;n&&("用户名称"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="userName"),"用户名称"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="userName"),"今天联系数"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="nowadays"),"今天联系数"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="nowadays"),"今天联系数"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="nowadays"),"今天联系数"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="nowadays"),"昨天联系数"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="yesterday"),"昨天联系数"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="yesterday"),"近7天联系数"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="days_7"),"近7天联系数"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="days_7"),"近30天联系数"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="days_30"),"近30天联系数"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="days_30"),"30天内联系占比"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="ratio_30"),"30天内联系占比"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="ratio_30"),"私海客户数"===n.label&&"descending"===a&&(this.singnForm.orderType="DESC",this.singnForm.orderField="privateCustomers"),"私海客户数"===n.label&&"ascending"===a&&(this.singnForm.orderType="ASC",this.singnForm.orderField="privateCustomers"),this.curThead=t,this.showSalePlan())},handleTheadAddClass:function(e){e.row;var n=e.column;e.rowIndex,e.columnIndex;if(n.property==this.curThead)return"active-thead"},showSalePlan:function(){var e=this;""!=this.singnForm.searchDate&&void 0!=this.singnForm.searchDate?Object(o.l)(this.singnForm).then(function(n){200==n.code&&(e.salePlan=n.data.data,e.total=n.data.total,e.salePlan.forEach(function(e){var n="";e.depts.length>1?(e.depts.forEach(function(e){n=n+e.deptName+","}),e.depts=n):e.depts=e.depts[0].deptName,e.ratio_30>0?(e.ratio_30=100*e.ratio_30,e.ratio_30=e.ratio_30.toFixed(2)):e.ratio_30=0,e.ratio_30=e.ratio_30+"%"}))}):this.$message.warning("必选条件必须全选")},selectCompanyHandle:function(e){var n=this,t=[];0!=e.length?this.companyList.forEach(function(a){e.forEach(function(e){if(a.deptId==e){t.push(a.deptName);var i=t.join("，");n.$set(n.selectConditionsList,"deptIds","部门-"+i)}})}):(this.$delete(this.selectConditionsList,"deptIds"),this.$delete(this.selectConditionsList,"userIds"),this.$delete(this.singnForm,"userIds"),this.userList=[]),this.getUserComboInfo(e)},selectUserHandle:function(e){var n=this,t=[];0!=e.length?this.userList.forEach(function(a){e.forEach(function(e){if(a.userId==e){t.push(a.userName);var i=t.join("，");n.$set(n.selectConditionsList,"userIds","员工-"+i)}})}):this.$delete(this.selectConditionsList,"userIds")},selectDate:function(e){e?this.$set(this.selectConditionsList,"searchDate","搜索日期-"+e):(this.$delete(this.selectConditionsList,"searchDate"),this.$delete(this.singnForm,"searchDate"))},getCompanyDeptTrees:function(){var e=this;Object(o.e)({companyId:this.$store.getters.companyId}).then(function(n){e.companyList=n.data.deptInfoTreeVos})},getUserComboInfo:function(e){var n=this,t=new FormData;t.append("roleNameList","业务员,业务主管"),void 0!=e&&t.append("deptIdList",e),Object(i.E)(t).then(function(e){200==e.code?n.userList=e.data:n.$message.warning(e.message)})},handleFilter:function(){this.allowGetList.twoAllow?this.isCheckAll=!1:this.$message.warning("抱歉，您没有此权限")},handleExport:function(){var e=this;this.singnForm.page=0,this.singnForm.pageSize=1e8;var n=this.$loading({lock:!0,text:"导出中，请稍等..."});Object(o.d)(this.singnForm).then(function(t){if(200===t.code){var i={fileName:t.message,delete:!0};Object(a.g)(i).then(function(t){var a=window.URL.createObjectURL(t),i=document.createElement("a");document.body.appendChild(i);var o=(new Date).getFullYear()+""+((new Date).getMonth()+1)+(new Date).getDate()+(new Date).getHours()+(new Date).getMinutes()+"销售统计表.xlsx";i.href=a,i.download=o,i.click(),window.URL.revokeObjectURL(a),n.close(),e.$message.success("导出成功！")})}else e.$message.warning(t.message)})},deleteOneClick:function(e){this.$delete(this.selectConditionsList,e),this.$delete(this.singnForm,e),"signDate"==e&&(this.signDate=[],this.singnForm.signDateStart="",this.singnForm.signDateEnd=""),this.singnForm.page=0,this.singnForm.pageSize=1e8},deleteAllClick:function(){this.selectConditionsList={},this.singnForm={},this.signDate=[],this.entryDate=[],this.singnForm.signDateStart="",this.singnForm.signDateEnd="",this.singnForm.entryDateStart="",this.singnForm.entryDateEnd="",this.singnForm.page=0,this.singnForm.pageSize=1e8}}},d={render:function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"row-width-auto-margin-0-90"},[a("el-card",{staticClass:"box-card cardCont"},[a("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"headerLeft"},[a("span",{staticClass:"conditionChoose"},[e._v("已选条件:")]),e._v(" "),a("div",{staticClass:"conditionList"},[e._l(e.selectConditionsList,function(n,i){return a("div",{key:i,staticClass:"conditionBox"},[e._v(" \n              "+e._s(n)),a("img",{staticClass:"hoverCursor",attrs:{src:t("cFCn")},on:{click:function(n){return e.deleteOneClick(i)}}})])}),e._v(" "),Object.keys(e.selectConditionsList).length>1?a("div",{staticClass:"conditionClear",on:{click:e.deleteAllClick}},[e._v("\n              清空所有\n            ")]):e._e()],2)])]),e._v(" "),a("div",{staticClass:"conditionCont"},[a("el-row",[a("el-col",[a("div",{staticClass:"conditionBox"},[a("span",[e._v("必选：")]),e._v(" "),a("el-date-picker",{staticClass:"date-select",attrs:{type:"date",align:"left",size:"small",placeholder:"选择日期时间","value-format":"yyyy-MM-dd"},on:{change:e.selectDate},model:{value:e.singnForm.searchDate,callback:function(n){e.$set(e.singnForm,"searchDate",n)},expression:"singnForm.searchDate"}})],1)])],1),e._v(" "),e.allowGetDeptList.twoAllow?a("el-row",[a("el-col",[a("div",{staticClass:"conditionBox"},[a("span",[e._v("可选项目：")]),e._v(" "),e.allowGetDeptList.twoAllow?a("div",{staticClass:"form-handle"},[a("el-select",{staticClass:"select-input",attrs:{size:"small",filterable:"",clearable:"",multiple:"",placeholder:"选择部门"},on:{change:e.selectCompanyHandle},model:{value:e.singnForm.deptIds,callback:function(n){e.$set(e.singnForm,"deptIds",n)},expression:"singnForm.deptIds"}},e._l(e.companyList,function(e){return a("el-option",{key:e.deptId,attrs:{label:e.deptName,value:e.deptId}})}),1),e._v(" "),a("el-select",{staticClass:"select-input",attrs:{size:"small",filterable:"",clearable:"",multiple:"",placeholder:"选择员工"},on:{change:e.selectUserHandle},model:{value:e.singnForm.userIds,callback:function(n){e.$set(e.singnForm,"userIds",n)},expression:"singnForm.userIds"}},e._l(e.userList,function(e){return a("el-option",{key:e.userId,attrs:{label:e.userName,value:e.userId}})}),1)],1):e._e()])])],1):e._e()],1)]),e._v(" "),a("el-card",{staticClass:"box-card cardCont"},[a("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"headerLeft"},[a("span",{staticClass:"conditionChoose orginLeft"},[e._v("搜索到 "+e._s(e.total)+" 条记录")]),e._v(" "),a("div",{staticClass:"headBtn"},[a("el-button",{staticClass:"btn export",attrs:{type:"primary",size:"small"},on:{click:e.showSalePlan}},[e._v("统计")]),e._v(" "),a("el-button",{staticClass:"btn export",attrs:{type:"primary",size:"small"},on:{click:e.handleExport}},[e._v("导出")])],1)])]),e._v(" "),a("div",{staticClass:"projectTable"},[a("el-table",{ref:"salePlan",staticClass:"table",attrs:{data:e.salePlan,border:"",fit:"","highlight-current-row":"","header-cell-class-name":e.handleTheadAddClass},on:{"sort-change":e.topTableSort}},[a("el-table-column",{attrs:{label:"用户名称",align:"center","min-width":"100",prop:"userName",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.userName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"部门名称",align:"center","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.depts))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"私海客户数",align:"center","min-width":"120",prop:"privateCustomers",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.privateCustomers))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"30天内联系占比",align:"center","min-width":"160",prop:"ratio_30",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.ratio_30))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"搜索选择日期",align:"center","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.searchDate))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"今天联系数",align:"center","min-width":"120",prop:"nowadays",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.nowadays))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"昨天联系数",align:"center","min-width":"120",prop:"yesterday",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.yesterday))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"近7天联系数",align:"center","min-width":"120",prop:"days_7",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.days_7))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"近30天联系数",align:"center","min-width":"140",prop:"days_30",sortable:"custom"},scopedSlots:e._u([{key:"default",fn:function(n){return[a("span",[e._v(e._s(n.row.days_30))])]}}])})],1)],1)])],1),e._v(" "),a("div",{staticStyle:{height:"60px",position:"fixed",bottom:"20px",right:"0",width:"80px"}},[e.btnFlag?a("a",{attrs:{href:"javascript:",target:"_self"},on:{click:e.backTop}},[a("img",{attrs:{src:t("1XGe"),alt:""}})]):e._e()])])},staticRenderFns:[]};var r=t("VU/8")(s,d,!1,function(e){t("Tb/c")},"data-v-4f75db6d",null);n.default=r.exports},"Tb/c":function(e,n,t){var a=t("oQwG");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("806ac634",a,!0)},oQwG:function(e,n,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\n.table[data-v-4f75db6d] .cell {\n  height: 35px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  text-align: center;\n}\n.table[data-v-4f75db6d] .descending {\n  border-top-color: #fff;\n}\n.table[data-v-4f75db6d] .descending /deep/ .descending {\n  border-top-color: #000 !important;\n}\n.table[data-v-4f75db6d] .ascending {\n  border-bottom-color: #fff;\n}\n.table[data-v-4f75db6d] .ascending /deep/ .ascending {\n  border-bottom-color: #000 !important;\n}\n.table[data-v-4f75db6d] .descending {\n  border-top-color: #fff;\n}\n.row-width-auto-margin-0-90[data-v-4f75db6d] {\n  width: auto;\n  margin: auto 1%;\n}\n[data-v-4f75db6d] .el-card__header {\n  padding: 10px 20px;\n}\n.cardCont[data-v-4f75db6d] {\n  margin-bottom: 15px;\n}\n.cardCont[data-v-4f75db6d] .el-card__body {\n  padding: 0;\n}\n.headerTop[data-v-4f75db6d] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.form-handle[data-v-4f75db6d] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.form-handle .select-input[data-v-4f75db6d] {\n  margin-right: 20px;\n}\n.form-handle .select-input[data-v-4f75db6d] .el-input__inner {\n  min-height: 32px;\n}\n.form-handle .select-input[data-v-4f75db6d] .el-input__icon {\n  line-height: 30px;\n}\n.headerLeft[data-v-4f75db6d] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.headerLeft span[data-v-4f75db6d] {\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n  border-left: 2px solid #05AAFF;\n  padding-left: 10px;\n}\n.headerLeft span span[data-v-4f75db6d] {\n  color: #F56C6C;\n}\n.headerLeft .orginLeft[data-v-4f75db6d] {\n  border-left: 2px solid #FFA96A;\n}\n.headerLeft .headBtn[data-v-4f75db6d] {\n  margin-left: 40px;\n  font-size: 14px;\n}\n.headerLeft .headBtn .allChoose[data-v-4f75db6d] {\n  padding: 6px 8px;\n  color: #05AAFF;\n  border: 1px solid #05AAFF;\n  background-color: #fff;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .export[data-v-4f75db6d] {\n  padding: 6px 8px;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .allDelete[data-v-4f75db6d] {\n  padding: 6px 8px;\n  color: #fff;\n  border: 1px solid #FF8585;\n  background-color: #FF8585;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .originBtn[data-v-4f75db6d] {\n  padding: 6px 8px;\n  color: #fff;\n  border: 1px solid #FD903C;\n  background-color: #FD903C;\n  border-radius: 2px;\n}\n.conditionCont[data-v-4f75db6d] {\n  padding: 10px 20px;\n}\n.conditionCont .conditionBox[data-v-4f75db6d] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 10px;\n  position: relative;\n}\n.conditionCont .conditionBox span[data-v-4f75db6d] {\n  font-size: 14px;\n  color: #606266;\n  margin-right: 10px;\n  min-width: 70px;\n}\n.conditionCont .conditionBox .el-select[data-v-4f75db6d] {\n  margin-right: 10px;\n}\n.conditionCont .conditionBox .el-date-editor[data-v-4f75db6d] {\n  margin-right: 10px;\n}\n.star[data-v-4f75db6d] {\n  color: #ff3d4c !important;\n  position: absolute;\n  left: -8px;\n}\n.dataHead[data-v-4f75db6d] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.14901961);\n  padding: 0 20px;\n  /*overflow: auto;*/\n}\n.dataHead[data-v-4f75db6d]::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px;\n  /*高宽分别对应横竖滚动条的尺寸*/\n  height: 2px;\n}\n.dataHead[data-v-4f75db6d]::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 50px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(5, 170, 255, 0.75);\n}\n.dataHead[data-v-4f75db6d]::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 50px;\n  background: #f9f9f9;\n}\n.dataHead .dataHeadBox[data-v-4f75db6d] {\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n  text-align: center;\n  padding: 15px 0;\n  font-weight: bold;\n  /*min-width: 300px;*/\n}\n.dataHead .dataHeadBox[data-v-4f75db6d]:first-child {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  min-width: 174px;\n}\n.conditionList[data-v-4f75db6d] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-left: 10px;\n}\n.conditionList .conditionBox[data-v-4f75db6d] {\n  border: 1px solid #33B3EE;\n  font-size: 12px;\n  color: #33B3EE;\n  padding: 5px;\n  margin-right: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.conditionClear[data-v-4f75db6d] {\n  border: 1px solid #ff0000;\n  font-size: 12px;\n  color: #ff0000;\n  padding: 5px;\n  cursor: pointer;\n}\n[data-v-4f75db6d] .el-table {\n  border: #d9f2ff 1px solid !important;\n}\n[data-v-4f75db6d] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-4f75db6d] .el-table--border th,[data-v-4f75db6d] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-4f75db6d] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-4f75db6d] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-4f75db6d] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-4f75db6d] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n[data-v-4f75db6d] .el-table--scrollable-x .el-table__body-wrapper {\n  max-height: 50vh;\n  overflow-y: auto;\n}\n.spanButton[data-v-4f75db6d] {\n  color: #05AAFF;\n}\n.shu[data-v-4f75db6d] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.col_red[data-v-4f75db6d] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-4f75db6d]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-4f75db6d] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-4f75db6d]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-4f75db6d] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-4f75db6d]:hover {\n  opacity: 0.5;\n}\n.projectTable[data-v-4f75db6d] {\n  padding: 10px;\n}\n.noMore[data-v-4f75db6d] {\n  text-align: center;\n  padding: 20px 0;\n  cursor: pointer;\n  font-size: 14px;\n}\n",""])}});