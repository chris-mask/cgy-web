webpackJsonp([76],{"1Eu/":function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__=__webpack_require__("mvHQ"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__),__WEBPACK_IMPORTED_MODULE_1__api_customerCenter__=__webpack_require__("c8+v"),__WEBPACK_IMPORTED_MODULE_2__api_contractManage__=__webpack_require__("l8D1"),__WEBPACK_IMPORTED_MODULE_3__api_department_js__=__webpack_require__("5ybE"),__WEBPACK_IMPORTED_MODULE_4__api_utils__=__webpack_require__("Q5rI"),__WEBPACK_IMPORTED_MODULE_5__api_projectManage__=__webpack_require__("rN1C"),__WEBPACK_IMPORTED_MODULE_6__api_orderManage__=__webpack_require__("fksm"),__WEBPACK_IMPORTED_MODULE_7__api_messageCenter__=__webpack_require__("tZro");__webpack_exports__.a={data:function(){return{enterprise_list:[],sign_company_list:[],companyTotal:0,companyPage:0,companyPageSize:20,createForm:{projectIds:[]},createVisible:!1,createRule:{crmCompanyIdList:[{required:!0,message:"请选择企业",trigger:"blur"}],signUserId:[{required:!0,message:"请选择签订人",trigger:"blur"}],signDate:[{required:!0,message:"请选择签订日期",trigger:"blur"}],signCompanyId:[{required:!0,message:"请选择签订公司",trigger:"blur"}]},listQuery:{page:0,pageSize:20,isPrivate:1,companyPosition:[]},salePersonList:[],projectForm:{page:0,pageSize:20,orderField:"sales",orderType:"DESC"},projectList:[],loading:!1,projectLevelList:[{label:"国家级",value:1},{label:"省级",value:2},{label:"市级",value:3},{label:"区县级",value:4},{label:"镇街级",value:5}],batchNoList:[{label:"未指定",value:0},{label:"第一批",value:1},{label:"第二批",value:2},{label:"第三批",value:3},{label:"第四批",value:4},{label:"第五批",value:5}],enterprise_annual_sales_list:[{value:"1000万以下",min:0,max:1e7},{value:"1000万-2000万",min:1e7,max:2e7},{value:"2000万-5000万",min:2e7,max:5e7},{value:"5000万-2亿",min:5e7,max:2e8},{value:"2亿以上",min:2e8,max:1e10}],is_new_or_not_list:[{label:"老客户",value:1},{label:"新客户",value:0}],sign_customer_list:[{label:"签单客户",value:1},{label:"潜在客户",value:0}],level:3,parentId:0,province_list:[],city_list:[],district_list:[],town_list:[],chooseCompanyList:[],storgCompanyList:[],dialogVisible:!1,btnFlag:0,messageTemplateList:[],selectTemplate:"",signNameList:[],allowGetRoleUserList:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:ROLE:USER:LIST")}},directives:{loadMore:{bind:function(e,t){e.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&t.value()})}}},activated:function(){this.createForm={},this.getCompanyData(),this.getCompanyList(),this.getCompanyDeptList(),this.getCommonData(),this.getProjectList(),this.getRegionList(),this.getSignerData(),this.getSignName(),window.addEventListener("scroll",this.scrollToTop)},destroyed:function(){clearInterval(this.timer),window.removeEventListener("scroll",this.scrollToTop)},methods:{backTop:function(){var e=this,t=setInterval(function(){var a=Math.floor(-e.scrollTop/5);document.documentElement.scrollTop=document.body.scrollTop=e.scrollTop+a,0===e.scrollTop&&clearInterval(t)},16)},scrollToTop:function(){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollTop=e,this.scrollTop>0?this.btnFlag=!0:this.btnFlag=!1},projectChange:function(){this.getCompanyData()},getSignName:function(){var e=this;Object(__WEBPACK_IMPORTED_MODULE_4__api_utils__.d)({keyList:"SMS_SIGN",companyId:"697480101377343488"}).then(function(t){200===t.code?e.signNameList=t.data.SMS_SIGN:e.$message({type:"error",message:t.message})})},getCompanyData:function(){var e=this;Object(__WEBPACK_IMPORTED_MODULE_1__api_customerCenter__.z)(this.listQuery).then(function(t){200==t.code?(e.listQuery.page>0?(e.enterprise_list=e.enterprise_list.concat(t.data.data),e.companyTotal=t.data.total):(e.enterprise_list=t.data.data,e.companyTotal=t.data.total),e.enterprise_list.forEach(function(t){e.$set(t,"selected",!1),e.storgCompanyList.forEach(function(a){a.crmCompanyId==t.crmCompanyId&&(e.$set(t,"selected",!0),setTimeout(function(){e.$refs.enterpriseTable.toggleRowSelection(t)},100))})})):e.$message.warning(t.message)}),this.enterprise_list.forEach(function(t){e.storgCompanyList.forEach(function(a){t.crmCompanyId==a.crmCompanyId&&e.$set(t,"selected",!0)})})},pageDown:function(){this.listQuery.page=this.listQuery.page+20,this.getCompanyData()},goSearch:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},getCompanyList:function(){var e=this;Object(__WEBPACK_IMPORTED_MODULE_2__api_contractManage__.p)().then(function(t){200==t.code?e.sign_company_list=t.data:e.$message.warning(t.message)})},getCompanyDeptList:function(){var e=this;Object(__WEBPACK_IMPORTED_MODULE_3__api_department_js__.f)({}).then(function(t){200==t.code?e.deptmentList=t.data.deptInfoTreeVos:e.$message.warning(t.message)})},getPersonList:function(e,t){var a=this,i=new FormData;i.append("roleNameList",e),void 0!=t&&i.append("deptIdList",t),this.allowGetRoleUserList.twoAllow?Object(__WEBPACK_IMPORTED_MODULE_1__api_customerCenter__.E)(i).then(function(e){200==e.code?(a.personList=e.data,a.salePersonList=e.data):a.$message.warning(e.message)}):this.$message.warning("抱歉，您没有权限获取角色用户列表")},getCommonData:function(){var e=this;Object(__WEBPACK_IMPORTED_MODULE_4__api_utils__.d)({keyList:"DICT:CUSTOMER_LEVEL,DICT:INDUSTRY_INVOLVED,DICT:TECHNOLOGY_TYPE,"}).then(function(t){200==t.code?(e.customer_classification_list=t.data["DICT:CUSTOMER_LEVEL"],e.industry_involved_list=t.data["DICT:INDUSTRY_INVOLVED"],e.technologyTypeList=t.data["DICT:TECHNOLOGY_TYPE"]):e.$message({type:"error",message:t.message})})},getSignerData:function(){var e=this,t=new FormData;t.append("roleName","业务员"),Object(__WEBPACK_IMPORTED_MODULE_4__api_utils__.u)(t).then(function(t){200==t.code&&(e.user_list=t.data.data)})},getProjectList:function(){var e=this;Object(__WEBPACK_IMPORTED_MODULE_5__api_projectManage__.e)(this.projectForm).then(function(t){200==t.code?e.projectForm.page>0?e.projectList=e.projectList.concat(t.data.data):e.projectList=t.data.data:e.$message.warning(t.message)})},projectListMethod:function(e){var t=this;this.projectForm.page=0,this.projectForm.projectName=e,this.loading=!0,setTimeout(function(){t.loading=!1,t.getProjectList(e)},200)},loadMore:function(){this.projectForm.page=this.projectForm.page+20,this.getProjectList()},dialogLoadMore:function(){this.projectForm.page=this.projectForm.page+20,this.getProjectList()},getRegionList:function(){var e=this;void 0!=this.level&&null!=this.level||(this.level=3),void 0!=this.parentId&&""!=this.parentId||(this.level=3,this.parentId=0);var t={level:this.level,parentId:this.parentId};Object(__WEBPACK_IMPORTED_MODULE_4__api_utils__.f)(t).then(function(t){200==t.code?(3==e.level&&(e.province_list=t.data),2==e.level&&(e.city_list=t.data),1==e.level&&(e.district_list=t.data),0==e.level&&(e.town_list=t.data)):e.$message({type:"error",message:t.message})})},getMessageTemplate:function(){var e=this;Object(__WEBPACK_IMPORTED_MODULE_7__api_messageCenter__.p)().then(function(t){200==t.code&&(e.messageTemplateList=t.data)})},deptmentChange:function(e){this.getPersonList("业务员,业务主管",e),this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},userChange:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterInvolved:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterYearSales:function(e){var t=this;e?this.enterprise_annual_sales_list.forEach(function(a){e==a.value&&(t.listQuery.companySalesStart=a.min,t.listQuery.companySalesEnd=a.max)}):(this.listQuery.companySalesStart="",this.listQuery.companySalesEnd=""),this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterEntYear:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},projectLevelChange:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},bathChange:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterYear:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterTechType:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterIsNewOrNot:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterCustomerClassification:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterSignCustomer:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},changeProvince:function(e){this.listQuery.page=0,this.listQuery.pageSize=20,this.listQuery.cityId="",this.listQuery.districtId="",this.listQuery.townId="",this.parentId=e,this.level=2,this.getRegionList(),this.getCompanyData()},changeCity:function(e){this.listQuery.districtId="",this.listQuery.townId="",this.listQuery.page=0,this.listQuery.pageSize=20,this.parentId=e,this.level=1,this.getRegionList(),this.getCompanyData()},changeDistrict:function(e){this.listQuery.page=0,this.listQuery.pageSize=20,this.parentId=e,this.level=0,this.getRegionList(),this.getCompanyData()},getTownsId:function(e){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},chooseCompany:function(e,t){var a=this;Object(__WEBPACK_IMPORTED_MODULE_7__api_messageCenter__.i)({companyId:e.crmCompanyId}).then(function(i){200==i.code&&(1==i.data?0==t?(a.$set(e,"selected",!0),a.storgCompanyList.push(e)):(a.$set(e,"selected",!1),a.storgCompanyList.forEach(function(t,i){t.crmCompanyId==e.crmCompanyId&&a.storgCompanyList.splice(i,1)})):a.$message.warning("抱歉，该企业没有接收短信号码，无法发送信息"))})},onTableSelect:function(e,t){var a=this;Object(__WEBPACK_IMPORTED_MODULE_7__api_messageCenter__.i)({companyId:t.crmCompanyId}).then(function(e){200==e.code&&(1==e.data?!0===t.selected?a.storgCompanyList.forEach(function(e,i){e.crmCompanyId==t.crmCompanyId&&(a.$set(t,"selected",!1),a.storgCompanyList.splice(i,1))}):(a.storgCompanyList.push(t),a.$set(t,"selected",!0)):(a.$refs.enterpriseTable.toggleRowSelection(t,!1),a.$message.warning("抱歉，该企业没有接收短信号码，无法发送信息")))})},allSelectTable:function(e){var t=this;0!=e.length?(e.forEach(function(e){t.$set(e,"selected",!0)}),this.storgCompanyList=e):(this.storgCompanyList=e,this.enterprise_list.forEach(function(e){t.$set(e,"selected",!1)}))},checkSelect:function(){this.storgCompanyList.length<=0?this.$message.warning("请先选择企业！"):(this.dialogVisible=!0,this.chooseCompanyList=JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.storgCompanyList)))},handleClose:function(){this.dialogVisible=!1,this.chooseCompanyList=[]},createFreeOrder:function(){this.storgCompanyList.length<=0?this.$message.warning("请先选择企业！"):(this.$set(this.createForm,"canRepeat","1"),this.$set(this.createForm,"isTiming","1"),this.createVisible=!0,this.getMessageTemplate())},cancel:function(){this.listQuery={page:0,pageSize:20,companyPosition:[]},this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route)},templateChange:function(e){var t=this;""==e&&(this.selectTemplate=""),this.messageTemplateList.forEach(function(a){a.dictCode==e&&(t.selectTemplate=a)})},saveCreateOrder:function saveCreateOrder(formName){var _this17=this;if(1==this.createForm.canRepeat||this.createForm.projectIds&&!(this.createForm.projectIds.length<1))if(this.storgCompanyList.length<=0)this.$message.warning("请先选择企业！");else if(""!=this.createForm.tempCode&&void 0!=this.createForm.tempCode)if(""!=this.createForm.smsSignName&&void 0!=this.createForm.smsSignName){if(2==this.createForm.isTiming){if(this.createForm.tempCode=this.createForm.tempCode,!this.createForm.sendTime)return void this.$message.warning("请先定时发送时间");if(new Date(this.createForm.sendTime)<new Date)return void this.$message.warning("定时发送时间必须大于当前时间");var dateArray=this.createForm.sendTime.toString().split(" ");if(new Date(this.createForm.sendTime)<new Date(dateArray[0]+" 09:00:00")||new Date(this.createForm.sendTime)>new Date(dateArray[0]+" 12:30:00")&&new Date(this.createForm.sendTime)<new Date(dateArray[0]+" 14:00:00")||new Date(this.createForm.sendTime)>new Date(dateArray[0]+" 22:00:00"))return void this.$message.warning("定时发送时间请设置在上午9点至12点半，下午两点晚上10点之间")}this.createForm.smsMsgParams=[];var str={};this.selectTemplate.smsMsgParams.forEach(function(list){if("name"==list.label&&(""==_this17.createForm.name||void 0==_this17.createForm.name))throw _this17.$message.warning("请选择称呼方式"),new Error;if("projectName"==list.label&&(""==_this17.createForm.projectName||void 0==_this17.createForm.projectName))throw _this17.$message.warning("请输入项目名称"),new Error;if("phone"==list.label){var telephone_number=/^1[3456789]\d{9}$/;if(!telephone_number.test(_this17.createForm.phone))throw _this17.$message.warning("电话号码为空或格式错误"),new Error}if("price"==list.label){var patrn=/^(-)?\d+(\.\d+)?$/;if(null==patrn.exec(_this17.createForm.price)||""==_this17.createForm.price||void 0==_this17.createForm.price)throw _this17.$message.warning("金额为空或输入非数字"),new Error}if("userName"==list.label&&(""==_this17.createForm.userName||void 0==_this17.createForm.userName))throw _this17.$message.warning("请输入项目工程师"),new Error;if("endTime"==list.label){if(""==_this17.createForm.endTime||void 0==_this17.createForm.endTime)throw _this17.$message.warning("请输入验收时间"),new Error;var regex=/[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}/;if(!regex.test(_this17.createForm.endTime))throw _this17.$message.warning("请保证输入的日期格式为yyyy-mm-dd或正确的日期!"),new Error;var noArr=_this17.createForm.endTime.split("-");0==noArr[1][0]&&(noArr[1]=noArr[1].substr(1)),0==noArr[2][0]&&(noArr[2]=noArr[1].substr(1));var year=eval(noArr[0]),month=eval(noArr[1]),day=eval(noArr[2]);if(year<1||month<1||month>12||day<1||day>31)throw _this17.$message.warning("请保证输入的日期格式为yyyy-mm-dd或正确的日期!"),new Error;if((4==month||6==month||9==month||11==month)&&day>30)throw _this17.$message.warning("请保证输入的日期格式为yyyy-mm-dd或正确的日期!"),new Error;if(2==month){if(year%4!=0&&day>29)throw _this17.$message.warning("请保证输入的日期格式为yyyy-mm-dd或正确的日期!"),new Error;if(year%4==0){if(year%100==0&&year%400!=0&&day>29)throw _this17.$message.warning("请保证输入的日期格式为yyyy-mm-dd或正确的日期!"),new Error;if(day>28)throw _this17.$message.warning("请保证输入的日期格式为yyyy-mm-dd或正确的日期!"),new Error}}}for(var key in list)for(var k in _this17.createForm)list[key]==k&&(str[list[key]]=_this17.createForm[k])}),this.createForm.smsMsgParams=str,this.createForm.toCompanyIds=[],this.createForm.personType=3,this.createForm.smsType=1,this.storgCompanyList.forEach(function(e){_this17.createForm.toCompanyIds.push(e.crmCompanyId)}),Object(__WEBPACK_IMPORTED_MODULE_7__api_messageCenter__.c)(this.createForm).then(function(e){200==e.code&&(_this17.createVisible=!1,_this17.createForm={},_this17.selectTemplate="",_this17.closeCurrent(_this17.$store.state.tagsView.visitedViews,_this17.$route),_this17.$message.success("操作成功"))})}else this.$message.warning("请先选择短信签名");else this.$message.warning("请先选择模板");else this.$message.warning("当同项目已接收短信企业可再发送短信时，关联项目必选")},deleteChoiced:function(e,t){var a=this;this.chooseCompanyList.splice(t,1),this.storgCompanyList=JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.chooseCompanyList)),this.enterprise_list.forEach(function(t){t.crmCompanyId==e.crmCompanyId&&(a.$set(t,"selected",!1),a.$refs.enterpriseTable.toggleRowSelection(t,!1))})},createClose:function(){this.createForm={},this.selectTemplate="",this.createVisible=!1}}}},GwzY:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("1Eu/"),s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-card",{staticClass:"box-card box-margin",staticStyle:{"margin-bottom":"20px"}},[i("div",{staticClass:"searchCont"},[i("div",{staticClass:"searchLeft"},[i("el-input",{attrs:{size:"small",placeholder:"企业名称/社会信用代码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goSearch(t)}},model:{value:e.listQuery.companyName,callback:function(t){e.$set(e.listQuery,"companyName",t)},expression:"listQuery.companyName"}}),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.goSearch}},[e._v("搜索")])],1),e._v(" "),i("div",{staticClass:"searchRig"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.checkSelect}},[e._v("查看已选择")])],1)])]),e._v(" "),i("el-card",{staticClass:"box-card box-margin"},[i("div",{staticClass:"clearfix headerTop",attrs:{slot:"header"},slot:"header"},[i("div",{staticClass:"chooseCompany"},[i("el-select",{attrs:{size:"small",filterable:"",placeholder:"选择部门",clearable:"",multiple:""},on:{change:e.deptmentChange},model:{value:e.listQuery.deptIds,callback:function(t){e.$set(e.listQuery,"deptIds",t)},expression:"listQuery.deptIds"}},e._l(e.deptmentList,function(e){return i("el-option",{key:e.deptId,attrs:{label:e.deptName,value:e.deptId}})}),1),e._v(" "),0!=e.salePersonList.length?i("el-select",{attrs:{filterable:"",size:"small",multiple:"",placeholder:"选择人员",clearable:""},on:{change:e.userChange},model:{value:e.listQuery.userIds,callback:function(t){e.$set(e.listQuery,"userIds",t)},expression:"listQuery.userIds"}},e._l(e.salePersonList,function(e){return i("el-option",{key:e.userId,attrs:{label:e.userName,value:e.userId}})}),1):e._e(),e._v(" "),i("el-select",{attrs:{multiple:"",clearable:"",size:"small",placeholder:"所属行业"},on:{change:e.handleFilterInvolved},model:{value:e.listQuery.businessIds,callback:function(t){e.$set(e.listQuery,"businessIds",t)},expression:"listQuery.businessIds"}},e._l(e.industry_involved_list,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),i("el-date-picker",{attrs:{size:"small",clearable:"",type:"year","value-format":"yyyy",placeholder:"成立年份"},on:{change:e.handleFilterEntYear},model:{value:e.listQuery.setUpTheYear,callback:function(t){e.$set(e.listQuery,"setUpTheYear",t)},expression:"listQuery.setUpTheYear"}})],1),e._v(" "),i("div",{staticClass:"chooseCompany"},[i("el-select",{directives:[{name:"loadMore",rawName:"v-loadMore",value:e.loadMore,expression:"loadMore"}],attrs:{filterable:"",multiple:"",remote:"","remote-method":e.projectListMethod,loading:e.loading,size:"small",placeholder:"项目名称",clearable:""},on:{change:e.projectChange},model:{value:e.listQuery.projectIds,callback:function(t){e.$set(e.listQuery,"projectIds",t)},expression:"listQuery.projectIds"}},e._l(e.projectList,function(e){return i("el-option",{key:e.projectId,attrs:{label:e.projectName,value:e.projectId}})}),1),e._v(" "),i("el-select",{attrs:{filterable:"",multiple:"",size:"small",placeholder:"项目级别",clearable:""},on:{change:e.projectLevelChange},model:{value:e.listQuery.projectLevels,callback:function(t){e.$set(e.listQuery,"projectLevels",t)},expression:"listQuery.projectLevels"}},e._l(e.projectLevelList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),i("el-date-picker",{attrs:{size:"small",clearable:"",type:"year","value-format":"yyyy",placeholder:"项目年度"},on:{change:e.handleFilterYear},model:{value:e.listQuery.projectYear,callback:function(t){e.$set(e.listQuery,"projectYear",t)},expression:"listQuery.projectYear"}})],1),e._v(" "),i("div",{staticClass:"chooseCompany"},[i("el-input",{attrs:{size:"small",placeholder:"社保人数"},on:{change:e.userChange},model:{value:e.listQuery.socialSecurityNum,callback:function(t){e.$set(e.listQuery,"socialSecurityNum",t)},expression:"listQuery.socialSecurityNum"}}),e._v(" "),i("el-input",{staticClass:"inline-block input-150 float-left screen-input",attrs:{size:"small",oninput:"value=value.replace(/[^0-9]/g,'')",clearable:"",placeholder:"专利数量"},on:{change:e.userChange},model:{value:e.listQuery.patentNum,callback:function(t){e.$set(e.listQuery,"patentNum",t)},expression:"listQuery.patentNum"}}),e._v(" "),i("el-input",{staticClass:"inline-block input-150 float-left screen-input",attrs:{size:"small",oninput:"value=value.replace(/[^0-9]/g,'')",clearable:"",placeholder:"商标数量"},on:{change:e.userChange},model:{value:e.listQuery.trademarkNum,callback:function(t){e.$set(e.listQuery,"trademarkNum",t)},expression:"listQuery.trademarkNum"}}),e._v(" "),i("el-input",{staticClass:"inline-block input-150 float-left screen-input",attrs:{size:"small",oninput:"value=value.replace(/[^0-9]/g,'')",clearable:"",placeholder:"软著数量"},on:{change:e.userChange},model:{value:e.listQuery.copyrightNum,callback:function(t){e.$set(e.listQuery,"copyrightNum",t)},expression:"listQuery.copyrightNum"}}),e._v(" "),i("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"年销售额范围"},on:{change:e.handleFilterYearSales},model:{value:e.listQuery.year_sales,callback:function(t){e.$set(e.listQuery,"year_sales",t)},expression:"listQuery.year_sales"}},e._l(e.enterprise_annual_sales_list,function(e){return i("el-option",{key:e.value,attrs:{label:e.value,value:e.value}})}),1)],1),e._v(" "),i("div",{staticClass:"chooseCompany"},[i("el-select",{attrs:{size:"small",multiple:"",clearable:"",placeholder:"企业标签"},on:{change:e.handleFilterTechType},model:{value:e.listQuery.companyTag,callback:function(t){e.$set(e.listQuery,"companyTag",t)},expression:"listQuery.companyTag"}},e._l(e.technologyTypeList,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),i("el-select",{staticClass:"inline-block input-150 float-left",attrs:{size:"small",clearable:"",placeholder:"新老客户"},on:{change:e.handleFilterIsNewOrNot},model:{value:e.listQuery.newOrOld,callback:function(t){e.$set(e.listQuery,"newOrOld",t)},expression:"listQuery.newOrOld"}},e._l(e.is_new_or_not_list,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),i("el-select",{attrs:{size:"small",clearable:"",placeholder:"客户级别"},on:{change:e.handleFilterCustomerClassification},model:{value:e.listQuery.companyLevel,callback:function(t){e.$set(e.listQuery,"companyLevel",t)},expression:"listQuery.companyLevel"}},e._l(e.customer_classification_list,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),i("el-select",{staticClass:"inline-block input-150 float-left",attrs:{size:"small",filterable:"",clearable:"",placeholder:"是否签单"},on:{change:e.handleFilterSignCustomer},model:{value:e.listQuery.isSigning,callback:function(t){e.$set(e.listQuery,"isSigning",t)},expression:"listQuery.isSigning"}},e._l(e.sign_customer_list,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),i("div",{staticClass:"chooseCompany"},[i("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"省份"},on:{change:e.changeProvince},model:{value:e.listQuery.provinceId,callback:function(t){e.$set(e.listQuery,"provinceId",t)},expression:"listQuery.provinceId"}},e._l(e.province_list,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),i("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"城市"},on:{change:e.changeCity},model:{value:e.listQuery.cityId,callback:function(t){e.$set(e.listQuery,"cityId",t)},expression:"listQuery.cityId"}},e._l(e.city_list,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),i("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"县区"},on:{change:e.changeDistrict},model:{value:e.listQuery.districtId,callback:function(t){e.$set(e.listQuery,"districtId",t)},expression:"listQuery.districtId"}},e._l(e.district_list,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),i("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"镇街"},on:{change:e.getTownsId},model:{value:e.listQuery.townId,callback:function(t){e.$set(e.listQuery,"townId",t)},expression:"listQuery.townId"}},e._l(e.town_list,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1)],1)]),e._v(" "),i("div",[i("el-button",{staticStyle:{"margin-bottom":"10px",float:"right"},attrs:{type:"primary",size:"small"},on:{click:e.createFreeOrder}},[e._v("确定")]),e._v(" "),i("el-button",{staticStyle:{"margin-bottom":"10px",float:"right","margin-right":"10px"},attrs:{size:"small"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),i("el-table",{ref:"enterpriseTable",attrs:{data:e.enterprise_list,border:"",fit:"","highlight-current-row":"","row-key":"crmCompanyId","reserve-selection":!0},on:{select:e.onTableSelect,"select-all":e.allSelectTable}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),i("el-table-column",{attrs:{align:"center","min-width":"160px",label:"企业名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.companyName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"成立时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.setupDate))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"主营产品"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.mainProducts))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"所在地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.provinceName)+e._s(t.row.cityName)+e._s(t.row.districtName)+e._s(t.row.townName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"业务人员"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.traceSalesManName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"联系电话"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.phoneNumber))])]}}])})],1),e._v(" "),e.companyTotal-e.enterprise_list.length>0?i("div",{staticClass:"noMore",on:{click:e.pageDown}},[e._v("\n          点击加载更多\n        ")]):i("div",{staticClass:"noMore"},[e._v("没有更多数据了")])],1)]),e._v(" "),i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"查看已选",visible:e.dialogVisible,width:"60%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticStyle:{"max-height":"400px",overflow:"auto"}},[i("el-table",{ref:"userTable",attrs:{data:e.chooseCompanyList,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"序号",align:"center",type:"index",width:"60"}}),e._v(" "),i("el-table-column",{attrs:{align:"center","min-width":"160px",label:"企业名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.companyName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"成立时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.setupDate))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"主营产品"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.mainProducts))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"所在地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.provinceName)+e._s(t.row.cityName)+e._s(t.row.districtName)+e._s(t.row.townName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"业务人员"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.traceSalesManName))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",{staticClass:"spanButton",staticStyle:{color:"#ff464d"},on:{click:function(a){return e.deleteChoiced(t.row,t.$index)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)]),e._v(" "),i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"短信群发",visible:e.createVisible,width:"50%","before-close":e.createClose},on:{"update:visible":function(t){e.createVisible=t}}},[i("el-form",{ref:"createForm",attrs:{model:e.createForm,rules:e.createRule}},[i("el-divider",{attrs:{"content-position":"center"}},[i("span",{staticStyle:{color:"red"}},[e._v("*所有信息（除关联项目外）都是必填项")])]),e._v(" "),i("el-row",[i("el-col",[i("el-form-item",{attrs:{label:"选择模板","label-width":"120px"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择模板",size:"small",clearable:""},on:{change:e.templateChange},model:{value:e.createForm.tempCode,callback:function(t){e.$set(e.createForm,"tempCode",t)},expression:"createForm.tempCode"}},e._l(e.messageTemplateList,function(e){return i("el-option",{key:e.dictCode,attrs:{label:e.dictName,value:e.dictCode}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"关联项目","label-width":"120px"}},[i("el-select",{directives:[{name:"loadMore",rawName:"v-loadMore",value:e.dialogLoadMore,expression:"dialogLoadMore"}],attrs:{multiple:"",filterable:"","remote-method":e.projectListMethod,remote:"",loading:e.loading,size:"small",placeholder:"请选择关联项目"},model:{value:e.createForm.projectIds,callback:function(t){e.$set(e.createForm,"projectIds",t)},expression:"createForm.projectIds"}},e._l(e.projectList,function(e){return i("el-option",{key:e.projectId,attrs:{label:e.projectName,value:e.projectId}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"重复发送","label-width":"120px"}},[i("el-radio-group",{model:{value:e.createForm.canRepeat,callback:function(t){e.$set(e.createForm,"canRepeat",t)},expression:"createForm.canRepeat"}},[i("el-radio",{attrs:{label:"1",border:""}},[e._v("同项目已接收短信企业不再发送")]),e._v(" "),i("el-radio",{attrs:{label:"2",border:""}},[e._v("同项目半年前接收的企业可发送")]),e._v(" "),i("el-radio",{attrs:{label:"3",border:""}},[e._v("同项目一年前接收的企业可发送")]),e._v(" "),i("el-radio",{attrs:{label:"4",border:""}},[e._v("同项目两年前接收的企业可发送")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"选择签名","label-width":"120px"}},[i("el-select",{attrs:{filterable:"",placeholder:"选择签名",size:"small"},model:{value:e.createForm.smsSignName,callback:function(t){e.$set(e.createForm,"smsSignName",t)},expression:"createForm.smsSignName"}},e._l(e.signNameList,function(e){return i("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictName}})}),1)],1),e._v(" "),i("el-form-item",{attrs:{label:"是否定时发送","label-width":"120px"}},[i("el-radio-group",{model:{value:e.createForm.isTiming,callback:function(t){e.$set(e.createForm,"isTiming",t)},expression:"createForm.isTiming"}},[i("el-radio",{attrs:{label:"1",border:""}},[e._v("立即发送")]),e._v(" "),i("el-radio",{attrs:{label:"2",border:""}},[e._v("定时发送")])],1)],1),e._v(" "),2==e.createForm.isTiming?i("el-form-item",{attrs:{label:"定时发送时间","label-width":"120px"}},[i("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:00:00",placeholder:"选择定时发送时间"},model:{value:e.createForm.sendTime,callback:function(t){e.$set(e.createForm,"sendTime",t)},expression:"createForm.sendTime"}})],1):e._e(),e._v(" "),e._l(e.selectTemplate.smsMsgParams,function(t){return i("el-form-item",{key:t.label,attrs:{label:t.value,"label-width":"120px"}},["endTime"==t.label?i("el-date-picker",{attrs:{type:"date",size:"small","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.createForm[t.label],callback:function(a){e.$set(e.createForm,t.label,a)},expression:"createForm[item.label]"}}):e._e(),e._v(" "),t.chooseArr||"endTime"==t.label?e._e():i("el-input",{attrs:{maxlength:"100",size:"small",placeholder:"请输入"+t.value},model:{value:e.createForm[t.label],callback:function(a){e.$set(e.createForm,t.label,a)},expression:"createForm[item.label]"}},["price"==t.label?i("template",{slot:"append"},[e._v("万元")]):e._e()],2),e._v(" "),t.chooseArr?i("el-radio-group",{attrs:{size:"small"},model:{value:e.createForm[t.label],callback:function(a){e.$set(e.createForm,t.label,a)},expression:"createForm[item.label]"}},e._l(t.chooseArr,function(t){return i("el-radio",{key:t,attrs:{label:t}},[e._v(e._s(t))])}),1):e._e()],1)}),e._v(" "),""!=e.selectTemplate?i("div",{staticStyle:{display:"flex"}},[i("span",[e._v("短信效果：")]),e._v(" "),i("p",{staticStyle:{flex:"1"}},[e._v(e._s(e.selectTemplate.smsMsgEffect))])]):e._e()],2)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.createClose}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveCreateOrder("createForm")}}},[e._v("确 定")])],1)],1),e._v(" "),i("div",{staticStyle:{height:"60px",position:"fixed",bottom:"100px",right:"0",width:"80px"}},[e.btnFlag?i("a",{attrs:{href:"javascript:",target:"_self"},on:{click:e.backTop}},[i("img",{attrs:{src:a("1XGe"),alt:""}})]):e._e()])],1)},staticRenderFns:[]};var l=function(e){a("bydX")},r=a("VU/8")(i.a,s,!1,l,"data-v-4bd88b76",null);t.default=r.exports},PCkN:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.searchCont[data-v-4bd88b76] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.searchCont .searchLeft[data-v-4bd88b76] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-v-4bd88b76] .el-input {\n  width: auto;\n  margin-right: 10px;\n}\n[data-v-4bd88b76] .el-table {\n  border: #d9f2ff 1px solid !important;\n}\n[data-v-4bd88b76] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-4bd88b76] .el-table--border th,[data-v-4bd88b76] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-4bd88b76] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-4bd88b76] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-4bd88b76] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-4bd88b76] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n.spanButton[data-v-4bd88b76] {\n  color: #05AAFF;\n}\n.shu[data-v-4bd88b76] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.col_red[data-v-4bd88b76] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-4bd88b76]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-4bd88b76] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-4bd88b76]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-4bd88b76] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-4bd88b76]:hover {\n  opacity: 0.5;\n}\n.chooseCompany[data-v-4bd88b76] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 10px;\n}\n[data-v-4bd88b76] .el-select {\n  /*margin-right: 10px;*/\n}\n.noMore[data-v-4bd88b76] {\n  text-align: center;\n  font-size: 14px;\n  padding: 10px 0;\n  cursor: pointer;\n}\n[data-v-4bd88b76] .el-dialog__header {\n  background: #05AAFF;\n  padding: 20px;\n}\n[data-v-4bd88b76] .el-dialog__header /deep/ .el-dialog__title {\n  color: #fff;\n  font-size: 16px;\n}\n[data-v-4bd88b76] .el-dialog__header /deep/ .el-dialog__headerbtn {\n  border-radius: 50%;\n  background: #fff;\n  padding: 4px;\n  font-size: 12px;\n  font-weight: 400;\n}\n[data-v-4bd88b76] .el-dialog__header /deep/ .el-dialog__headerbtn /deep/ .el-dialog__close {\n  color: #05AAFF;\n}\n[data-v-4bd88b76] .el-dialog__body {\n  padding: 10px 20px;\n}\n[data-v-4bd88b76] .el-dialog__footer {\n  text-align: center;\n}\n[data-v-4bd88b76] .el-dialog__footer /deep/ .el-button {\n  border-radius: 2px;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 20px;\n}\n",""])},bydX:function(e,t,a){var i=a("PCkN");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("895c3afe",i,!0)}});