webpackJsonp([38],{bGqq:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("rN1C"),i=e("l8D1"),s=e("5ybE"),o=e("Q5rI"),l=e("vLgD"),d=e("s01O"),r="/crm";var c={data:function(){return{btnFlag:0,projectLevelList:[{label:"国家级",value:1},{label:"省级",value:2},{label:"市级",value:3},{label:"区县级",value:4},{label:"镇街级",value:5}],projectForm:{page:0,pageSize:20,orderField:"sales",orderType:"DESC"},loading:!1,selectConditionsList:{},projectList:[],statRoles:[{label:"工程师",value:1},{label:"审计员",value:2}],companyList:[],deptmentList:[],parentId:0,level:3,provinceList:[],cityList:[],districtList:[],townList:[],censusForm:{},censusList:[],censusHead:[],allowGetList:this.authorityControl("SYSTEM:STATISTICS:REPORT","SYSTEM:DECLARE:ORDER:COUNT","SYSTEM:DECLARE:ORDER:LIST"),allowGetDeptList:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:DEPT:MANAGE","SYSTEM:DEPT:LIST")}},directives:{loadMore:{bind:function(t,n){t.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&n.value()})}}},destroyed:function(){clearInterval(this.timer),window.removeEventListener("scroll",this.scrollToTop)},activated:function(){this.getProjectList(),this.getCompanyList(),this.getRegionList(),this.getDepartmentList(),window.addEventListener("scroll",this.scrollToTop)},methods:{backTop:function(){var t=this,n=setInterval(function(){var e=Math.floor(-t.scrollTop/5);document.documentElement.scrollTop=document.body.scrollTop=t.scrollTop+e,0===t.scrollTop&&clearInterval(n)},16)},scrollToTop:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollTop=t,this.scrollTop>0?this.btnFlag=!0:this.btnFlag=!1},getStatisticsList:function(){var t,n=this;""!=this.censusForm.projectIdList&&void 0!=this.censusForm.projectIdList?""!=this.censusForm.applyYear&&void 0!=this.censusForm.applyYear&&""!=this.censusForm.roleFlag&&void 0!=this.censusForm.roleFlag?(t=this.censusForm,Object(l.a)({url:r+"/api/crm/orderstatistics/queryOrderStatistics",method:"post",data:t})).then(function(t){200==t.code&&(n.censusList=t.data.resultPersonnelList,n.censusList.forEach(function(t){t.statisticsList.forEach(function(t){1==Array.isArray(t.oneBatchMap)&&n.$set(t,"oneBatchMap","")})}),n.censusHead=t.data.resultPersonnelList[0].statisticsList)}):this.$message.warning("必选条件必须全选"):this.$message.warning("必选条件必须全选")},getProjectList:function(t){var n=this;this.projectForm.projectName=t||"",Object(a.e)(this.projectForm).then(function(t){200==t.code?n.projectForm.page>0?n.projectList=n.projectList.concat(t.data.data):n.projectList=t.data.data:n.$message.warning(t.message)})},projectListMethod:function(t){var n=this;this.projectForm.page=0,""!==t?(this.loading=!0,setTimeout(function(){n.loading=!1,n.getProjectList(t)},200)):(this.loading=!0,setTimeout(function(){n.loading=!1,n.getProjectList()},200))},loadMore:function(){this.projectForm.page=this.projectForm.page+20,this.getProjectList()},projectChange:function(t){var n=this,e=[];0!=t.length?this.projectList.forEach(function(a){t.forEach(function(t){if(a.projectId==t){e.push(a.projectName);var i=e.join("，");n.$set(n.selectConditionsList,"projectIdList","项目 - "+i)}})}):this.$delete(this.selectConditionsList,"projectIdList")},projectYearChange:function(t){t?this.$set(this.selectConditionsList,"applyYear","项目年度 - "+t):this.$delete(this.selectConditionsList,"applyYear")},statRoleChange:function(t){t?this.$set(this.selectConditionsList,"roleFlag","统计角色 - "+this.statRoles.find(function(n){return n.value===t}).label):this.$delete(this.selectConditionsList,"roleFlag")},getCompanyList:function(){var t=this;Object(i.o)().then(function(n){200==n.code?t.companyList=n.data:t.$message.warning(n.message)})},getDepartmentList:function(){var t=this;Object(s.f)({}).then(function(n){200==n.code?t.deptmentList=n.data.deptInfoTreeVos:t.$message.warning(n.message)})},signCompanyChange:function(t){var n=this,e=[];0!=t.length?this.companyList.forEach(function(a){t.forEach(function(t){if(a.companyId==t){e.push(a.companyName);var i=e.join("，");n.$set(n.selectConditionsList,"signCompanyIdList","签约公司 - "+i)}})}):this.$delete(this.selectConditionsList,"signCompanyIdList")},deptmentChange:function(t){var n=this,e=[];0!=t.length?this.deptmentList.forEach(function(a){t.forEach(function(t){if(a.deptId==t){e.push(a.deptName);var i=e.join("，");n.$set(n.selectConditionsList,"deptIdList","业务部门 - "+i)}})}):this.$delete(this.selectConditionsList,"deptIdList")},areaLevelChange:function(t){var n=this,e=[];0!=t.length?this.projectLevelList.forEach(function(a){t.forEach(function(t){if(a.value==t){e.push(a.label);var i=e.join("，");n.$set(n.selectConditionsList,"applyLevelList","项目级别 - "+i)}})}):this.$delete(this.selectConditionsList,"applyLevelList")},getRegionList:function(){var t=this;void 0!=this.level&&null!=this.level||(this.level=3),void 0!=this.parentId&&""!=this.parentId||(this.level=3,this.parentId=0);var n={level:this.level,parentId:this.parentId};Object(o.f)(n).then(function(n){200==n.code?(3==t.level&&(t.provinceList=n.data),2==t.level&&(t.cityList=n.data),1==t.level&&(t.districtList=n.data),0==t.level&&(t.townList=n.data)):t.$message({type:"error",message:n.message})})},changeProvince:function(t){t?this.$set(this.selectConditionsList,"provinceId","省份 - "+this.provinceList.find(function(n){return n.dictId===t}).dictName):this.$delete(this.selectConditionsList,"provinceId"),this.$delete(this.selectConditionsList,"cityId"),this.$delete(this.selectConditionsList,"districtId"),this.$delete(this.selectConditionsList,"townId"),this.parentId=t,this.level=2,this.getRegionList()},changeCity:function(t){t?this.$set(this.selectConditionsList,"cityId","城市 - "+this.cityList.find(function(n){return n.dictId===t}).dictName):this.$delete(this.selectConditionsList,"cityId"),this.$delete(this.selectConditionsList,"districtId"),this.$delete(this.selectConditionsList,"townId"),this.parentId=t,this.level=1,this.getRegionList()},changeDistrict:function(t){t?(this.$set(this.selectConditionsList,"districtId","区县 - "+this.districtList.find(function(n){return n.dictId===t}).dictName),this.$delete(this.selectConditionsList,"townId")):(this.$delete(this.selectConditionsList,"districtId"),this.$delete(this.selectConditionsList,"townId")),this.parentId=t,this.level=0,this.getRegionList()},changeTown:function(t){t?this.$set(this.selectConditionsList,"townId","镇街 - "+this.townList.find(function(n){return n.dictId===t}).dictName):this.$delete(this.selectConditionsList,"townId")},deleteOneClick:function(t){this.orderList=[],this.$delete(this.selectConditionsList,t),this.$delete(this.censusForm,t)},deleteAllClick:function(){this.selectConditionsList={},this.censusForm={}},handleExport:function(){var t=this;if(""!=this.censusForm.projectIdList&&void 0!=this.censusForm.projectIdList)if(""!=this.censusForm.applyYear&&void 0!=this.censusForm.applyYear)if(""!=this.censusForm.roleFlag&&void 0!=this.censusForm.roleFlag){var n,e=this.$loading({lock:!0,text:"导出中，请稍等..."});(n=this.censusForm,Object(d.a)({url:r+"/api/crm/orderstatistics/exportOrderStatistics",method:"post",data:n})).then(function(n){if(200==n.code){var a={fileName:n.message,delete:!0};Object(o.g)(a).then(function(n){var a=window.URL.createObjectURL(n),i=document.createElement("a");document.body.appendChild(i);var s=(new Date).getFullYear()+""+((new Date).getMonth()+1)+(new Date).getDate()+(new Date).getHours()+(new Date).getMinutes()+"-订单统计列表.xlsx";i.href=a,i.download=s,i.click(),window.URL.revokeObjectURL(a),e.close(),t.$message.success("导出成功！")})}else t.$message.warning(n.message)})}else this.$message.warning("必选条件必须全选");else this.$message.warning("必选条件必须全选");else this.$message.warning("必选条件必须全选")}}},A={render:function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"row-width-auto-margin-0-90"},[a("el-card",{staticClass:"box-card cardCont"},[a("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"headerLeft"},[a("span",{staticClass:"conditionChoose"},[t._v("已选条件:")]),t._v(" "),a("div",{staticClass:"conditionList"},[t._l(t.selectConditionsList,function(n,i){return a("div",{staticClass:"conditionBox"},[t._v("\n                "+t._s(n)),a("img",{staticClass:"hoverCursor",attrs:{src:e("cFCn")},on:{click:function(n){return t.deleteOneClick(i)}}})])}),t._v(" "),Object.keys(t.selectConditionsList).length>1?a("div",{staticClass:"conditionClear",on:{click:t.deleteAllClick}},[t._v("\n                清空所有\n              ")]):t._e()],2)])]),t._v(" "),a("div",{staticClass:"conditionCont"},[a("el-row",[a("el-col",[a("div",{staticClass:"conditionBox"},[a("span",{staticClass:"star"},[t._v("*")]),t._v(" "),a("span",[t._v("必选：")]),t._v(" "),a("el-select",{directives:[{name:"loadMore",rawName:"v-loadMore",value:t.loadMore,expression:"loadMore"}],attrs:{filterable:"",multiple:"",remote:"","remote-method":t.projectListMethod,loading:t.loading,"multiple-limit":10,size:"small",placeholder:"项目",clearable:""},on:{change:t.projectChange},model:{value:t.censusForm.projectIdList,callback:function(n){t.$set(t.censusForm,"projectIdList",n)},expression:"censusForm.projectIdList"}},t._l(t.projectList,function(t){return a("el-option",{key:t.projectId,attrs:{label:t.projectName,value:t.projectId}})}),1),t._v(" "),a("el-date-picker",{attrs:{clearable:"",size:"small",type:"year","value-format":"yyyy",placeholder:"项目年度"},on:{change:t.projectYearChange},model:{value:t.censusForm.applyYear,callback:function(n){t.$set(t.censusForm,"applyYear",n)},expression:"censusForm.applyYear"}}),t._v(" "),a("el-select",{attrs:{size:"small",placeholder:"统计角色",clearable:""},on:{change:t.statRoleChange},model:{value:t.censusForm.roleFlag,callback:function(n){t.$set(t.censusForm,"roleFlag",n)},expression:"censusForm.roleFlag"}},t._l(t.statRoles,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.getStatisticsList}},[t._v("统计")])],1)])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"conditionBox"},[a("span",[t._v("可选：")]),t._v(" "),a("el-select",{attrs:{size:"small",filterable:"",multiple:"",placeholder:"签约公司",clearable:""},on:{change:t.signCompanyChange},model:{value:t.censusForm.signCompanyIdList,callback:function(n){t.$set(t.censusForm,"signCompanyIdList",n)},expression:"censusForm.signCompanyIdList"}},t._l(t.companyList,function(t){return a("el-option",{key:t.companyId,attrs:{label:t.companyName,value:t.companyId}})}),1),t._v(" "),t.allowGetDeptList.twoAllow?a("el-select",{attrs:{size:"small",filterable:"",placeholder:"业务部门",clearable:"",multiple:""},on:{change:t.deptmentChange},model:{value:t.censusForm.deptIdList,callback:function(n){t.$set(t.censusForm,"deptIdList",n)},expression:"censusForm.deptIdList"}},t._l(t.deptmentList,function(t){return a("el-option",{key:t.deptId,attrs:{label:t.deptName,value:t.deptId}})}),1):t._e(),t._v(" "),a("el-select",{attrs:{filterable:"",multiple:"",size:"small",placeholder:"项目级别",clearable:""},on:{change:t.areaLevelChange},model:{value:t.censusForm.applyLevelList,callback:function(n){t.$set(t.censusForm,"applyLevelList",n)},expression:"censusForm.applyLevelList"}},t._l(t.projectLevelList,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"conditionBox"},[a("span",[t._v("可选：")]),t._v(" "),a("el-select",{attrs:{size:"small",placeholder:"省份",clearable:""},on:{change:t.changeProvince},model:{value:t.censusForm.provinceId,callback:function(n){t.$set(t.censusForm,"provinceId",n)},expression:"censusForm.provinceId"}},t._l(t.provinceList,function(t){return a("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1),t._v(" "),a("el-select",{attrs:{size:"small",placeholder:"城市",clearable:""},on:{change:t.changeCity},model:{value:t.censusForm.cityId,callback:function(n){t.$set(t.censusForm,"cityId",n)},expression:"censusForm.cityId"}},t._l(t.cityList,function(t){return a("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1),t._v(" "),a("el-select",{attrs:{size:"small",placeholder:"县区",clearable:""},on:{change:t.changeDistrict},model:{value:t.censusForm.districtId,callback:function(n){t.$set(t.censusForm,"districtId",n)},expression:"censusForm.districtId"}},t._l(t.districtList,function(t){return a("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1),t._v(" "),a("el-select",{attrs:{size:"small",placeholder:"镇街",clearable:""},on:{change:t.changeTown},model:{value:t.censusForm.townId,callback:function(n){t.$set(t.censusForm,"townId",n)},expression:"censusForm.townId"}},t._l(t.townList,function(t){return a("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1)],1)])],1)],1)]),t._v(" "),a("el-card",{staticClass:"box-card cardCont"},[a("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"headerLeft"},[a("span",{staticClass:"conditionChoose orginLeft"},[t._v("搜索到 "+t._s(t.censusList.length)+" 条记录")]),t._v(" "),a("div",{staticClass:"headBtn"},[a("el-button",{staticClass:"btn export",attrs:{type:"primary",size:"small"},on:{click:t.handleExport}},[t._v("导出")])],1)])]),t._v(" "),t.censusList.length>0?a("div",{staticClass:"dataContent"},[a("div",{staticClass:"dataHead"},[a("div",{staticClass:"dataHeadBox"},[t._v(t._s(1==t.censusForm.roleFlag?"工程师":"审计员"))]),t._v(" "),t._l(t.censusHead,function(n){return a("div",{staticClass:"dataHeadBox"},[t._v(t._s(n.projectName))])})],2),t._v(" "),a("div",{staticClass:"dataList"},t._l(t.censusList,function(n,e){return a("div",{staticClass:"dataBox"},[a("div",{staticClass:"firDta"},[a("span",{staticClass:"listNum"},[t._v(t._s(e+1))]),t._v(" "),a("div",{staticClass:"dataName"},[t._v(t._s(n.personnelName))])]),t._v(" "),t._l(n.statisticsList,function(n){return a("div",{staticClass:"statistics"},[a("div",{staticClass:"statisList"},[""!=n.oneBatchMap?a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("第一批安排："+t._s(n.oneBatchMap.arrangeCount))]),t._v(" "),a("span",[t._v("第一批完成："+t._s(n.oneBatchMap.completeCount))])]):t._e(),t._v(" "),""!=n.oneBatchMap?a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("第二批安排："+t._s(n.towBatchMap.arrangeCount))]),t._v(" "),a("span",[t._v("第二批完成："+t._s(n.towBatchMap.completeCount))])]):t._e(),t._v(" "),""!=n.oneBatchMap?a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("第三批安排："+t._s(n.threeBatchMap.arrangeCount))]),t._v(" "),a("span",[t._v("第三批完成："+t._s(n.threeBatchMap.completeCount))])]):t._e(),t._v(" "),""!=n.oneBatchMap?a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("第四批安排："+t._s(n.fourBatchMap.arrangeCount))]),t._v(" "),a("span",[t._v("第四批完成："+t._s(n.fourBatchMap.completeCount))])]):t._e(),t._v(" "),""!=n.oneBatchMap?a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("第五批安排："+t._s(n.fiveBatchMap.arrangeCount))]),t._v(" "),a("span",[t._v("第五批完成："+t._s(n.fiveBatchMap.completeCount))])]):t._e(),t._v(" "),""!=n.oneBatchMap?a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("没有批次安排："+t._s(n.notBatchMap.arrangeCount))]),t._v(" "),a("span",[t._v("没有批次完成："+t._s(n.notBatchMap.completeCount))])]):t._e(),t._v(" "),""==n.oneBatchMap?a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("安排："+t._s(n.arrangeCount))]),t._v(" "),a("span",[t._v("完成："+t._s(n.completeCount))])]):t._e(),t._v(" "),a("div",{staticClass:"statBox"},[a("span",{staticClass:"rightIcon"}),t._v(" "),a("span",[t._v("小计")]),t._v(" "),a("span",[t._v("安排："+t._s(n.subtotalMap.arrangeCount))]),t._v(" "),a("span",[t._v("完成："+t._s(n.subtotalMap.completeCount))])])])])})],2)}),0)]):t._e()])],1),t._v(" "),a("div",{staticStyle:{height:"60px",position:"fixed",bottom:"20px",right:"0",width:"80px"}},[t.btnFlag?a("a",{attrs:{href:"javascript:",target:"_self"},on:{click:t.backTop}},[a("img",{attrs:{src:e("1XGe"),alt:""}})]):t._e()])])},staticRenderFns:[]};var p=e("VU/8")(c,A,!1,function(t){e("lrVL")},"data-v-0f3b767b",null);n.default=p.exports},lrVL:function(t,n,e){var a=e("qjMR");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("2544bfa5",a,!0)},qjMR:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.row-width-auto-margin-0-90[data-v-0f3b767b] {\n  width: auto;\n  margin: auto 1%;\n}\n[data-v-0f3b767b] .el-card__header {\n  padding: 10px 20px;\n}\n.cardCont[data-v-0f3b767b] {\n  margin-bottom: 15px;\n}\n.cardCont[data-v-0f3b767b] .el-card__body {\n  padding: 0;\n}\n.headerTop[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.headerLeft[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.headerLeft span[data-v-0f3b767b] {\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n  border-left: 2px solid #05AAFF;\n  padding-left: 10px;\n}\n.headerLeft span span[data-v-0f3b767b] {\n  color: #F56C6C;\n}\n.headerLeft .orginLeft[data-v-0f3b767b] {\n  border-left: 2px solid #FFA96A;\n}\n.headerLeft .headBtn[data-v-0f3b767b] {\n  margin-left: 40px;\n  font-size: 14px;\n}\n.headerLeft .headBtn .allChoose[data-v-0f3b767b] {\n  padding: 6px 8px;\n  color: #05AAFF;\n  border: 1px solid #05AAFF;\n  background-color: #fff;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .export[data-v-0f3b767b] {\n  padding: 6px 8px;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .allDelete[data-v-0f3b767b] {\n  padding: 6px 8px;\n  color: #fff;\n  border: 1px solid #FF8585;\n  background-color: #FF8585;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .originBtn[data-v-0f3b767b] {\n  padding: 6px 8px;\n  color: #fff;\n  border: 1px solid #FD903C;\n  background-color: #FD903C;\n  border-radius: 2px;\n}\n.conditionCont[data-v-0f3b767b] {\n  padding: 10px 20px;\n}\n.conditionCont .conditionBox[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 10px;\n  position: relative;\n}\n.conditionCont .conditionBox span[data-v-0f3b767b] {\n  font-size: 14px;\n  color: #606266;\n  margin-right: 10px;\n}\n.conditionCont .conditionBox .el-select[data-v-0f3b767b] {\n  margin-right: 10px;\n}\n.conditionCont .conditionBox .el-date-editor[data-v-0f3b767b] {\n  margin-right: 10px;\n}\n.star[data-v-0f3b767b] {\n  color: #ff3d4c !important;\n  position: absolute;\n  left: -8px;\n}\n.dataHead[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.14901961);\n  padding: 0 20px;\n  /*overflow: auto;*/\n}\n.dataHead[data-v-0f3b767b]::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px;\n  /*高宽分别对应横竖滚动条的尺寸*/\n  height: 2px;\n}\n.dataHead[data-v-0f3b767b]::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 50px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(5, 170, 255, 0.75);\n}\n.dataHead[data-v-0f3b767b]::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 50px;\n  background: #f9f9f9;\n}\n.dataHead .dataHeadBox[data-v-0f3b767b] {\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n  text-align: center;\n  padding: 15px 0;\n  font-weight: bold;\n  /*min-width: 300px;*/\n}\n.dataHead .dataHeadBox[data-v-0f3b767b]:first-child {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  min-width: 174px;\n}\n.dataList .dataBox[data-v-0f3b767b] {\n  /*overflow: auto;*/\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0 20px;\n  /*align-items: center;*/\n  padding-bottom: 20px;\n  padding-top: 20px;\n}\n.dataList .dataBox[data-v-0f3b767b]::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px;\n  /*高宽分别对应横竖滚动条的尺寸*/\n  height: 2px;\n}\n.dataList .dataBox[data-v-0f3b767b]::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 50px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(5, 170, 255, 0.75);\n}\n.dataList .dataBox[data-v-0f3b767b]::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 50px;\n  background: #f9f9f9;\n}\n.dataList .dataBox .firDta[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.dataList .dataBox .listNum[data-v-0f3b767b] {\n  width: 20px;\n  height: 20px;\n  background: #69CCFF;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 100%;\n  margin-right: 54px;\n  font-size: 12px;\n}\n.dataList .dataBox .dataName[data-v-0f3b767b] {\n  width: 84px;\n  min-width: 84px;\n  height: 84px;\n  background: #9bb5ff;\n  color: #fff;\n  font-size: 18px;\n  border-radius: 4px;\n  text-align: center;\n  line-height: 84px;\n  margin-right: 16px;\n}\n.dataList .dataBox .statistics[data-v-0f3b767b] {\n  min-height: 136px;\n  background: #EFFAFF;\n  padding: 15px;\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n  /*min-width: 300px;*/\n}\n.dataList .dataBox .statistics .statisList .statBox[data-v-0f3b767b] {\n  font-size: 14px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 10px;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.dataList .dataBox .statistics .statisList .statBox .rightIcon[data-v-0f3b767b] {\n  width: 7px;\n  height: 7px;\n  background: #05AAFF;\n  margin-right: 6px;\n  display: inline-block;\n}\n.dataList .dataBox .statistics .statisList .statBox span[data-v-0f3b767b] {\n  margin-right: 28px;\n}\n.dataList .dataBox .statistics[data-v-0f3b767b]:nth-child(odd) {\n  background: #F1F4FF;\n}\n.dataList .dataBox .statistics[data-v-0f3b767b]:nth-child(even) {\n  background: #EFFAFF;\n}\n.conditionList[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-left: 10px;\n}\n.conditionList .conditionBox[data-v-0f3b767b] {\n  border: 1px solid #33B3EE;\n  font-size: 12px;\n  color: #33B3EE;\n  padding: 5px;\n  margin-right: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.conditionClear[data-v-0f3b767b] {\n  border: 1px solid #ff0000;\n  font-size: 12px;\n  color: #ff0000;\n  padding: 5px;\n  cursor: pointer;\n}\n","",{version:3,sources:["H:/chengguoyun-web/src/views/declareCoordination/orderArrange/index.vue"],names:[],mappings:"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",file:"index.vue",sourcesContent:["\n.row-width-auto-margin-0-90[data-v-0f3b767b] {\n  width: auto;\n  margin: auto 1%;\n}\n[data-v-0f3b767b] .el-card__header {\n  padding: 10px 20px;\n}\n.cardCont[data-v-0f3b767b] {\n  margin-bottom: 15px;\n}\n.cardCont[data-v-0f3b767b] .el-card__body {\n  padding: 0;\n}\n.headerTop[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.headerLeft[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.headerLeft span[data-v-0f3b767b] {\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n  border-left: 2px solid #05AAFF;\n  padding-left: 10px;\n}\n.headerLeft span span[data-v-0f3b767b] {\n  color: #F56C6C;\n}\n.headerLeft .orginLeft[data-v-0f3b767b] {\n  border-left: 2px solid #FFA96A;\n}\n.headerLeft .headBtn[data-v-0f3b767b] {\n  margin-left: 40px;\n  font-size: 14px;\n}\n.headerLeft .headBtn .allChoose[data-v-0f3b767b] {\n  padding: 6px 8px;\n  color: #05AAFF;\n  border: 1px solid #05AAFF;\n  background-color: #fff;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .export[data-v-0f3b767b] {\n  padding: 6px 8px;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .allDelete[data-v-0f3b767b] {\n  padding: 6px 8px;\n  color: #fff;\n  border: 1px solid #FF8585;\n  background-color: #FF8585;\n  border-radius: 2px;\n}\n.headerLeft .headBtn .originBtn[data-v-0f3b767b] {\n  padding: 6px 8px;\n  color: #fff;\n  border: 1px solid #FD903C;\n  background-color: #FD903C;\n  border-radius: 2px;\n}\n.conditionCont[data-v-0f3b767b] {\n  padding: 10px 20px;\n}\n.conditionCont .conditionBox[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 10px;\n  position: relative;\n}\n.conditionCont .conditionBox span[data-v-0f3b767b] {\n  font-size: 14px;\n  color: #606266;\n  margin-right: 10px;\n}\n.conditionCont .conditionBox .el-select[data-v-0f3b767b] {\n  margin-right: 10px;\n}\n.conditionCont .conditionBox .el-date-editor[data-v-0f3b767b] {\n  margin-right: 10px;\n}\n.star[data-v-0f3b767b] {\n  color: #ff3d4c !important;\n  position: absolute;\n  left: -8px;\n}\n.dataHead[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.14901961);\n  padding: 0 20px;\n  /*overflow: auto;*/\n}\n.dataHead[data-v-0f3b767b]::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px;\n  /*高宽分别对应横竖滚动条的尺寸*/\n  height: 2px;\n}\n.dataHead[data-v-0f3b767b]::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 50px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(5, 170, 255, 0.75);\n}\n.dataHead[data-v-0f3b767b]::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 50px;\n  background: #f9f9f9;\n}\n.dataHead .dataHeadBox[data-v-0f3b767b] {\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n  text-align: center;\n  padding: 15px 0;\n  font-weight: bold;\n  /*min-width: 300px;*/\n}\n.dataHead .dataHeadBox[data-v-0f3b767b]:first-child {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  min-width: 174px;\n}\n.dataList .dataBox[data-v-0f3b767b] {\n  /*overflow: auto;*/\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0 20px;\n  /*align-items: center;*/\n  padding-bottom: 20px;\n  padding-top: 20px;\n}\n.dataList .dataBox[data-v-0f3b767b]::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  width: 10px;\n  /*高宽分别对应横竖滚动条的尺寸*/\n  height: 2px;\n}\n.dataList .dataBox[data-v-0f3b767b]::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 50px;\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  background: rgba(5, 170, 255, 0.75);\n}\n.dataList .dataBox[data-v-0f3b767b]::-webkit-scrollbar-track {\n  /*滚动条里面轨道*/\n  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);\n  border-radius: 50px;\n  background: #f9f9f9;\n}\n.dataList .dataBox .firDta[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.dataList .dataBox .listNum[data-v-0f3b767b] {\n  width: 20px;\n  height: 20px;\n  background: #69CCFF;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 100%;\n  margin-right: 54px;\n  font-size: 12px;\n}\n.dataList .dataBox .dataName[data-v-0f3b767b] {\n  width: 84px;\n  min-width: 84px;\n  height: 84px;\n  background: #9bb5ff;\n  color: #fff;\n  font-size: 18px;\n  border-radius: 4px;\n  text-align: center;\n  line-height: 84px;\n  margin-right: 16px;\n}\n.dataList .dataBox .statistics[data-v-0f3b767b] {\n  min-height: 136px;\n  background: #EFFAFF;\n  padding: 15px;\n  -webkit-box-flex: 3;\n      -ms-flex: 3;\n          flex: 3;\n  /*min-width: 300px;*/\n}\n.dataList .dataBox .statistics .statisList .statBox[data-v-0f3b767b] {\n  font-size: 14px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 10px;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.dataList .dataBox .statistics .statisList .statBox .rightIcon[data-v-0f3b767b] {\n  width: 7px;\n  height: 7px;\n  background: #05AAFF;\n  margin-right: 6px;\n  display: inline-block;\n}\n.dataList .dataBox .statistics .statisList .statBox span[data-v-0f3b767b] {\n  margin-right: 28px;\n}\n.dataList .dataBox .statistics[data-v-0f3b767b]:nth-child(odd) {\n  background: #F1F4FF;\n}\n.dataList .dataBox .statistics[data-v-0f3b767b]:nth-child(even) {\n  background: #EFFAFF;\n}\n.conditionList[data-v-0f3b767b] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-left: 10px;\n}\n.conditionList .conditionBox[data-v-0f3b767b] {\n  border: 1px solid #33B3EE;\n  font-size: 12px;\n  color: #33B3EE;\n  padding: 5px;\n  margin-right: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.conditionClear[data-v-0f3b767b] {\n  border: 1px solid #ff0000;\n  font-size: 12px;\n  color: #ff0000;\n  padding: 5px;\n  cursor: pointer;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=38.9d4b8771c99cf559c8ce.js.map