webpackJsonp([71],{"4pxI":function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.searchCont[data-v-fc3e7bfc] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.searchCont .searchLeft[data-v-fc3e7bfc] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-v-fc3e7bfc] .el-input {\n  width: auto;\n  margin-right: 10px;\n}\n[data-v-fc3e7bfc] .el-table {\n  border: #d9f2ff 1px solid !important;\n}\n[data-v-fc3e7bfc] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-fc3e7bfc] .el-table--border th,[data-v-fc3e7bfc] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-fc3e7bfc] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-fc3e7bfc] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-fc3e7bfc] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-fc3e7bfc] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n.spanButton[data-v-fc3e7bfc] {\n  color: #05AAFF;\n}\n.shu[data-v-fc3e7bfc] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.col_red[data-v-fc3e7bfc] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-fc3e7bfc]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-fc3e7bfc] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-fc3e7bfc]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-fc3e7bfc] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-fc3e7bfc]:hover {\n  opacity: 0.5;\n}\n.chooseCompany[data-v-fc3e7bfc] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 10px;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n[data-v-fc3e7bfc] .el-select {\n  margin-right: 10px;\n}\n.noMore[data-v-fc3e7bfc] {\n  text-align: center;\n  font-size: 14px;\n  padding: 10px 0;\n  cursor: pointer;\n}\n[data-v-fc3e7bfc] .el-dialog__header {\n  background: #05AAFF;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n[data-v-fc3e7bfc] .el-dialog__header /deep/ .el-dialog__title {\n  color: #fff;\n  font-size: 16px;\n}\n[data-v-fc3e7bfc] .el-dialog__header /deep/ .el-dialog__headerbtn {\n  border-radius: 50%;\n  background: #fff;\n  padding: 4px;\n  font-size: 12px;\n  font-weight: 400;\n}\n[data-v-fc3e7bfc] .el-dialog__header /deep/ .el-dialog__headerbtn /deep/ .el-dialog__close {\n  color: #05AAFF;\n}\n[data-v-fc3e7bfc] .el-dialog__footer {\n  text-align: center;\n}\n[data-v-fc3e7bfc] .el-dialog__footer /deep/ .el-button {\n  border-radius: 2px;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 20px;\n}\n",""])},MwCE:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mvHQ"),s=a.n(l),i=a("c8+v"),n=a("l8D1"),o=a("5ybE"),r=a("Q5rI"),c=a("rN1C"),d=a("fksm"),p={name:"addFreeOrder",data:function(){return{enterprise_list:[],sign_company_list:[],companyTotal:0,companyPage:0,companyPageSize:20,createForm:{},createVisible:!1,createRule:{crmCompanyIdList:[{required:!0,message:"请选择企业",trigger:"blur"}],signUserId:[{required:!0,message:"请选择签订人",trigger:"blur"}],signDate:[{required:!0,message:"请选择签订日期",trigger:"blur"}],signCompanyId:[{required:!0,message:"请选择签订公司",trigger:"blur"}]},listQuery:{page:0,pageSize:20,companyPosition:[1]},salePersonList:[],personList:[],projectForm:{page:0,pageSize:20},projectList:[],loading:!1,projectLevelList:[{label:"国家级",value:1},{label:"省级",value:2},{label:"市级",value:3},{label:"区县级",value:4},{label:"镇街级",value:5}],batchNoList:[{label:"未指定",value:0},{label:"第一批",value:1},{label:"第二批",value:2},{label:"第三批",value:3},{label:"第四批",value:4},{label:"第五批",value:5}],is_new_or_not_list:[{label:"老客户",value:1},{label:"新客户",value:0}],sign_customer_list:[{label:"签单客户",value:1},{label:"潜在客户",value:0}],level:3,parentId:0,province_list:[],city_list:[],district_list:[],town_list:[],chooseCompanyList:[],storgCompanyList:[],dialogVisible:!1,btnFlag:0,allowGetRoleUserList:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:ROLE:USER:LIST")}},directives:{loadMore:{bind:function(e,t){e.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&t.value()})}}},activated:function(){this.$route.query.projectBox&&(this.projectBox=JSON.parse(this.$route.query.projectBox)),this.getCompanyData(),this.getCompanyList(),this.getCompanyDeptList(),this.getCommonData(),this.getProjectList(),this.getRegionList(),this.getSignerData(),window.addEventListener("scroll",this.scrollToTop)},destroyed:function(){clearInterval(this.timer),window.removeEventListener("scroll",this.scrollToTop)},methods:{backTop:function(){var e=this,t=setInterval(function(){var a=Math.floor(-e.scrollTop/5);document.documentElement.scrollTop=document.body.scrollTop=e.scrollTop+a,0===e.scrollTop&&clearInterval(t)},16)},scrollToTop:function(){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollTop=e,this.scrollTop>0?this.btnFlag=!0:this.btnFlag=!1},getCompanyData:function(){var e=this;Object(i.y)(this.listQuery).then(function(t){200==t.code?(e.listQuery.page>0?(e.enterprise_list=e.enterprise_list.concat(t.data.data),e.companyTotal=t.data.total):(e.enterprise_list=t.data.data,e.companyTotal=t.data.total),e.enterprise_list.forEach(function(t){e.$set(t,"selected",!1),e.storgCompanyList.forEach(function(a){t.crmCompanyId==a.crmCompanyId&&(e.$set(t,"selected",!0),setTimeout(function(){e.$refs.enterpriseTable.toggleRowSelection(t)},100))})})):e.$message.warning(t.message)})},pageDown:function(){this.listQuery.page=this.listQuery.page+20,this.getCompanyData()},goSearch:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},getCompanyList:function(){var e=this;Object(n.o)().then(function(t){200==t.code?e.sign_company_list=t.data:e.$message.warning(t.message)})},getCompanyDeptList:function(){var e=this;Object(o.f)({}).then(function(t){200==t.code?e.deptmentList=t.data.deptInfoTreeVos:e.$message.warning(t.message)})},getPersonList:function(e,t){var a=this,l=new FormData;l.append("roleNameList",e),void 0!=t&&l.append("deptIdList",t),this.allowGetRoleUserList.twoAllow?Object(i.D)(l).then(function(e){200==e.code?t?a.salePersonList=e.data:a.personList=e.data:a.$message.warning(e.message)}):this.$message.warning("抱歉，您没有权限获取角色用户列表")},getCommonData:function(){var e=this;Object(r.d)({keyList:"ENTERPRISE_REGISTRATION_STATUS,DICT:CUSTOMER_LEVEL,DICT:ANNUAL_SALES,DICT:STAFF_SIZE,DICT:INDUSTRY_INVOLVED,DICT:COMPANY_TYPE,DICT:TECHNOLOGY_TYPE,DICT:COMPANY_SCALE,DICT:JOB_PROFESSIONAL"}).then(function(t){200==t.code?(e.customer_classification_list=t.data["DICT:CUSTOMER_LEVEL"],e.industry_involved_list=t.data["DICT:INDUSTRY_INVOLVED"],e.technologyTypeList=t.data["DICT:TECHNOLOGY_TYPE"]):e.$message({type:"error",message:t.message})})},getSignerData:function(){var e=this,t=new FormData;t.append("roleName","业务员"),Object(r.s)(t).then(function(t){200==t.code&&(e.user_list=t.data.data)})},getProjectList:function(){var e=this;Object(c.e)(this.projectForm).then(function(t){200==t.code?e.projectForm.page>0?e.projectList=e.projectList.concat(t.data.data):e.projectList=t.data.data:e.$message.warning(t.message)})},projectListMethod:function(e){var t=this;this.projectForm.page=0,this.projectForm.projectName=e,this.loading=!0,setTimeout(function(){t.loading=!1,t.getProjectList(e)},200)},loadMore:function(){this.projectForm.page=this.projectForm.page+20,this.getProjectList()},projectChange:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},getRegionList:function(){var e=this;void 0!=this.level&&null!=this.level||(this.level=3),void 0!=this.parentId&&""!=this.parentId||(this.level=3,this.parentId=0);var t={level:this.level,parentId:this.parentId};Object(r.f)(t).then(function(t){200==t.code?(3==e.level&&(e.province_list=t.data),2==e.level&&(e.city_list=t.data),1==e.level&&(e.district_list=t.data),0==e.level&&(e.town_list=t.data)):e.$message({type:"error",message:t.message})})},deptmentChange:function(e){this.getPersonList("业务员,业务主管",e),this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},userChange:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterInvolved:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterEntYear:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},projectLevelChange:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},bathChange:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterYear:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterTechType:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterIsNewOrNot:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterCustomerClassification:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},handleFilterSignCustomer:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},changeProvince:function(e){this.listQuery.page=0,this.listQuery.pageSize=20,this.listQuery.cityId="",this.listQuery.districtId="",this.listQuery.townId="",this.parentId=e,this.level=2,this.getRegionList(),this.getCompanyData()},changeCity:function(e){this.listQuery.districtId="",this.listQuery.townId="",this.listQuery.page=0,this.listQuery.pageSize=20,this.parentId=e,this.level=1,this.getRegionList(),this.getCompanyData()},changeDistrict:function(e){this.listQuery.page=0,this.listQuery.pageSize=20,this.parentId=e,this.level=0,this.getRegionList(),this.getCompanyData()},getTownsId:function(e){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},chooseCompany:function(e,t){var a=this;0==t?(this.$set(e,"selected",!0),this.storgCompanyList.push(e)):(this.$set(e,"selected",!1),this.storgCompanyList.forEach(function(t,l){t.crmCompanyId==e.crmCompanyId&&a.storgCompanyList.splice(l,1)}))},onTableSelect:function(e,t){var a=this;!0===t.selected?this.storgCompanyList.forEach(function(e,l){e.crmCompanyId==t.crmCompanyId&&(a.$set(t,"selected",!1),a.storgCompanyList.splice(l,1))}):(this.storgCompanyList.push(t),this.$set(t,"selected",!0))},allSelectTable:function(e){var t=this;0!=e.length?(e.forEach(function(e){t.$set(e,"selected",!0)}),this.storgCompanyList=e):(this.storgCompanyList=e,this.enterprise_list.forEach(function(e){t.$set(e,"selected",!1)}))},deleteChoiced:function(e,t){var a=this;this.chooseCompanyList.splice(t,1),this.storgCompanyList=JSON.parse(s()(this.chooseCompanyList)),this.enterprise_list.forEach(function(t){t.crmCompanyId==e.crmCompanyId&&(a.$set(t,"selected",!1),a.$refs.enterpriseTable.toggleRowSelection(t,!1))})},checkSelect:function(){this.storgCompanyList.length<=0?this.$message.warning("请先选择企业！"):(this.dialogVisible=!0,this.chooseCompanyList=JSON.parse(s()(this.storgCompanyList)))},handleClose:function(){this.dialogVisible=!1,this.chooseCompanyList=[]},createFreeOrder:function(){this.storgCompanyList.length<=0?this.$message.warning("请先选择企业！"):(this.getPersonList("业务员,业务主管"),this.createForm.projectName=this.$route.query.projectName,this.createForm.projectId=this.$route.query.projectId,this.createForm.projectList=[],this.createForm.projectList.push(this.projectBox),this.createVisible=!0)},cancel:function(){this.listQuery={page:0,pageSize:20,companyPosition:[]},this.storgCompanyList=[],this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,"/policy/project/list")},saveCreateOrder:function(e){var t=this;this.storgCompanyList.length<=0?this.$message.warning("请先选择企业！"):(this.createForm.crmCompanyIdList=[],this.storgCompanyList.forEach(function(e){t.createForm.crmCompanyIdList.push(e.crmCompanyId)}),this.$refs[e].validate(function(e){if(!e)return!1;Object(d.u)(t.createForm).then(function(e){200==e.code&&(t.createVisible=!1,t.createForm={},t.storgCompanyList=[],t.closeCurrent(t.$store.state.tagsView.visitedViews,t.$route,"/declareCoordination/orderManage"),t.$message.success("操作成功"))})}))},createClose:function(){this.createForm={},this.createVisible=!1}}},u={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"app-container"},[l("el-card",{staticClass:"box-card box-margin",staticStyle:{"margin-bottom":"20px"}},[l("div",{staticClass:"searchCont"},[l("div",{staticClass:"searchLeft"},[l("el-input",{attrs:{size:"small",placeholder:"企业名称/社会信用代码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goSearch(t)}},model:{value:e.listQuery.companyName,callback:function(t){e.$set(e.listQuery,"companyName",t)},expression:"listQuery.companyName"}}),e._v(" "),l("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.goSearch}},[e._v("搜索")])],1),e._v(" "),l("div",{staticClass:"searchRig"},[l("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.checkSelect}},[e._v("查看已选择")])],1)])]),e._v(" "),l("el-card",{staticClass:"box-card box-margin"},[l("div",{staticClass:"clearfix headerTop",attrs:{slot:"header"},slot:"header"},[l("div",{staticClass:"chooseCompany"},[l("el-select",{attrs:{size:"small",filterable:"",placeholder:"选择部门",clearable:"",multiple:""},on:{change:e.deptmentChange},model:{value:e.listQuery.deptIds,callback:function(t){e.$set(e.listQuery,"deptIds",t)},expression:"listQuery.deptIds"}},e._l(e.deptmentList,function(e){return l("el-option",{key:e.deptId,attrs:{label:e.deptName,value:e.deptId}})}),1),e._v(" "),0!=e.salePersonList.length?l("el-select",{attrs:{filterable:"",size:"small",multiple:"",placeholder:"选择人员",clearable:""},on:{change:e.userChange},model:{value:e.listQuery.userIds,callback:function(t){e.$set(e.listQuery,"userIds",t)},expression:"listQuery.userIds"}},e._l(e.salePersonList,function(e){return l("el-option",{key:e.userId,attrs:{label:e.userName,value:e.userId}})}),1):e._e(),e._v(" "),l("el-select",{attrs:{multiple:"",clearable:"",size:"small",placeholder:"所属行业"},on:{change:e.handleFilterInvolved},model:{value:e.listQuery.businessIds,callback:function(t){e.$set(e.listQuery,"businessIds",t)},expression:"listQuery.businessIds"}},e._l(e.industry_involved_list,function(e){return l("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),l("el-date-picker",{attrs:{size:"small",clearable:"",type:"year","value-format":"yyyy",placeholder:"成立年份"},on:{change:e.handleFilterEntYear},model:{value:e.listQuery.setUpTheYear,callback:function(t){e.$set(e.listQuery,"setUpTheYear",t)},expression:"listQuery.setUpTheYear"}})],1),e._v(" "),l("div",{staticClass:"chooseCompany"},[l("el-select",{directives:[{name:"loadMore",rawName:"v-loadMore",value:e.loadMore,expression:"loadMore"}],attrs:{filterable:"",multiple:"",remote:"","remote-method":e.projectListMethod,loading:e.loading,size:"small",placeholder:"项目名称",clearable:""},on:{change:e.projectChange},model:{value:e.listQuery.projectIds,callback:function(t){e.$set(e.listQuery,"projectIds",t)},expression:"listQuery.projectIds"}},e._l(e.projectList,function(e){return l("el-option",{key:e.projectId,attrs:{label:e.projectName,value:e.projectId}})}),1),e._v(" "),l("el-select",{attrs:{filterable:"",multiple:"",size:"small",placeholder:"项目级别",clearable:""},on:{change:e.projectLevelChange},model:{value:e.listQuery.projectLevels,callback:function(t){e.$set(e.listQuery,"projectLevels",t)},expression:"listQuery.projectLevels"}},e._l(e.projectLevelList,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),l("el-date-picker",{attrs:{size:"small",clearable:"",type:"year","value-format":"yyyy",placeholder:"项目年度"},on:{change:e.handleFilterYear},model:{value:e.listQuery.projectYear,callback:function(t){e.$set(e.listQuery,"projectYear",t)},expression:"listQuery.projectYear"}})],1),e._v(" "),l("div",{staticClass:"chooseCompany"},[l("el-select",{attrs:{size:"small",multiple:"",clearable:"",placeholder:"科技类型"},on:{change:e.handleFilterTechType},model:{value:e.listQuery.technologyType,callback:function(t){e.$set(e.listQuery,"technologyType",t)},expression:"listQuery.technologyType"}},e._l(e.technologyTypeList,function(e){return l("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),l("el-select",{staticClass:"inline-block input-150 float-left",attrs:{size:"small",clearable:"",placeholder:"新老客户"},on:{change:e.handleFilterIsNewOrNot},model:{value:e.listQuery.newOrOld,callback:function(t){e.$set(e.listQuery,"newOrOld",t)},expression:"listQuery.newOrOld"}},e._l(e.is_new_or_not_list,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),l("el-select",{attrs:{size:"small",clearable:"",placeholder:"客户级别"},on:{change:e.handleFilterCustomerClassification},model:{value:e.listQuery.companyLevel,callback:function(t){e.$set(e.listQuery,"companyLevel",t)},expression:"listQuery.companyLevel"}},e._l(e.customer_classification_list,function(e){return l("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),l("el-select",{staticClass:"inline-block input-150 float-left",attrs:{size:"small",filterable:"",clearable:"",placeholder:"是否签单"},on:{change:e.handleFilterSignCustomer},model:{value:e.listQuery.isSigning,callback:function(t){e.$set(e.listQuery,"isSigning",t)},expression:"listQuery.isSigning"}},e._l(e.sign_customer_list,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("div",{staticClass:"chooseCompany"},[l("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"省份"},on:{change:e.changeProvince},model:{value:e.listQuery.provinceId,callback:function(t){e.$set(e.listQuery,"provinceId",t)},expression:"listQuery.provinceId"}},e._l(e.province_list,function(e){return l("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),l("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"城市"},on:{change:e.changeCity},model:{value:e.listQuery.cityId,callback:function(t){e.$set(e.listQuery,"cityId",t)},expression:"listQuery.cityId"}},e._l(e.city_list,function(e){return l("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),l("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"县区"},on:{change:e.changeDistrict},model:{value:e.listQuery.districtId,callback:function(t){e.$set(e.listQuery,"districtId",t)},expression:"listQuery.districtId"}},e._l(e.district_list,function(e){return l("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1),e._v(" "),l("el-select",{staticClass:"inline-block input-150 float-left",attrs:{clearable:"",size:"small",placeholder:"镇街"},on:{change:e.getTownsId},model:{value:e.listQuery.townId,callback:function(t){e.$set(e.listQuery,"townId",t)},expression:"listQuery.townId"}},e._l(e.town_list,function(e){return l("el-option",{key:e.dictId,attrs:{label:e.dictName,value:e.dictId}})}),1)],1)]),e._v(" "),l("div",[l("el-button",{staticStyle:{"margin-bottom":"10px",float:"right"},attrs:{type:"primary",size:"small"},on:{click:e.createFreeOrder}},[e._v("确定")]),e._v(" "),l("el-button",{staticStyle:{"margin-bottom":"10px",float:"right","margin-right":"10px"},attrs:{size:"small"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),l("el-table",{ref:"enterpriseTable",attrs:{data:e.enterprise_list,border:"",fit:"","highlight-current-row":"","row-key":"crmCompanyId","reserve-selection":!0},on:{select:e.onTableSelect,"select-all":e.allSelectTable}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),l("el-table-column",{attrs:{align:"center","min-width":"160px",label:"企业名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.companyName))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"成立时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.setupDate))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"主营产品"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.mainProducts))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"所在地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.provinceName)+e._s(t.row.cityName)+e._s(t.row.districtName)+e._s(t.row.townName))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"业务人员"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.traceSalesManName))])]}}])})],1),e._v(" "),0!=e.enterprise_list.length?l("div",[e.companyTotal-e.enterprise_list.length>0?l("div",{staticClass:"noMore",on:{click:e.pageDown}},[e._v("\n            点击加载更多\n          ")]):l("div",{staticClass:"noMore"},[e._v("没有更多数据了")])]):e._e()],1)]),e._v(" "),l("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"查看已选",visible:e.dialogVisible,width:"60%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("div",{staticStyle:{"max-height":"400px",overflow:"auto"}},[l("el-table",{ref:"userTable",attrs:{data:e.chooseCompanyList,border:"",fit:"","highlight-current-row":""}},[l("el-table-column",{attrs:{label:"序号",align:"center",type:"index",width:"60"}}),e._v(" "),l("el-table-column",{attrs:{align:"center","min-width":"160px",label:"企业名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.companyName))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"成立时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.setupDate))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"主营产品"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.mainProducts))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"所在地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.provinceName)+e._s(t.row.cityName)+e._s(t.row.districtName)+e._s(t.row.townName))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"业务人员"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.traceSalesManName))])]}}])}),e._v(" "),l("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticClass:"spanButton",staticStyle:{color:"#ff464d"},on:{click:function(a){return e.deleteChoiced(t.row,t.$index)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:e.handleClose}},[e._v("取 消")])],1)]),e._v(" "),l("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"创建免费订单",visible:e.createVisible,width:"800px","before-close":e.createClose},on:{"update:visible":function(t){e.createVisible=t}}},[l("el-form",{ref:"createForm",attrs:{model:e.createForm,rules:e.createRule}},[l("el-row",[l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"项目名称","label-width":"120px"}},[l("span",[e._v(e._s(e.createForm.projectName))])])],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"签订人","label-width":"120px",prop:"signUserId"}},[l("el-select",{attrs:{filterable:"",placeholder:"请选择签订人",size:"small",clearable:""},model:{value:e.createForm.signUserId,callback:function(t){e.$set(e.createForm,"signUserId",t)},expression:"createForm.signUserId"}},e._l(e.personList,function(e){return l("el-option",{key:e.userId,attrs:{label:e.userName,value:e.userId}})}),1)],1)],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"签订日期","label-width":"120px",prop:"signDate"}},[l("el-date-picker",{attrs:{size:"small",type:"date","value-format":"yyyy-MM-dd",clearable:"",placeholder:"签订日期"},model:{value:e.createForm.signDate,callback:function(t){e.$set(e.createForm,"signDate",t)},expression:"createForm.signDate"}})],1)],1)],1),e._v(" "),l("el-row",[l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"签订公司","label-width":"120px",prop:"signCompanyId"}},[l("el-select",{attrs:{size:"small",placeholder:"我方签约公司",clearable:""},model:{value:e.createForm.signCompanyId,callback:function(t){e.$set(e.createForm,"signCompanyId",t)},expression:"createForm.signCompanyId"}},e._l(e.sign_company_list,function(e){return l("el-option",{key:e.companyId,attrs:{label:e.companyName,value:e.companyId}})}),1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:e.createClose}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveCreateOrder("createForm")}}},[e._v("确 定")])],1)],1),e._v(" "),l("div",{staticStyle:{height:"60px",position:"fixed",bottom:"100px",right:"0",width:"80px"}},[e.btnFlag?l("a",{attrs:{href:"javascript:",target:"_self"},on:{click:e.backTop}},[l("img",{attrs:{src:a("1XGe"),alt:""}})]):e._e()])],1)},staticRenderFns:[]};var h=a("VU/8")(p,u,!1,function(e){a("vweq")},"data-v-fc3e7bfc",null);t.default=h.exports},vweq:function(e,t,a){var l=a("4pxI");"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a("rjj0")("0966c514",l,!0)}});