webpackJsonp([97],{kEQH:function(n,e,t){var r=t("lM7v");"string"==typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);t("rjj0")("c68278fe",r,!0)},lM7v:function(n,e,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*修改列表页面表格样式*/\n[data-v-0955d157] .el-table {\n  border: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-0955d157] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-0955d157] .el-table--border th,[data-v-0955d157] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-0955d157] .el-table__row:nth-child(even) {\n  background: rgb(235, 248, 255) !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666666666666666);\n}\n[data-v-0955d157] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-0955d157] .el-table--border td:first-child {\n  border-right: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-0955d157] .el-table--border td:last-child {\n  border-left: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-0955d157] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 115px;\n}\n[data-v-0955d157] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-v-0955d157] .el-form-item__label {\n  min-width: 127px;\n}\n.btnList[data-v-0955d157] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n[data-v-0955d157] .el-card__header {\n  color: #008DD6;\n}\n[data-v-0955d157] input::-webkit-outer-spin-button,[data-v-0955d157] input::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0;\n}\n.addRoleDept[data-v-0955d157] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.otherDept[data-v-0955d157] {\n  border: 1px solid #C0C4CC;\n  padding: 10px;\n  border-radius: 4px;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-right: 15px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.chooseBox[data-v-0955d157] {\n  background: #FD903C;\n  color: #fff;\n  line-height: normal;\n  padding: 5px 10px;\n  border-radius: 4px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n.chooseBox[data-v-0955d157]:last-child {\n  margin-right: 0;\n}\n.chooseBox i[data-v-0955d157] {\n  cursor: pointer;\n}\n.addBtn[data-v-0955d157] {\n  height: 35px;\n  font-size: 16px;\n}\n.text-right[data-v-0955d157] {\n  text-align: right;\n}\n",""])},vDG6:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("7TQO"),a={components:{EditorText:t("3/OM").a},data:function(){return{enterpriseForm:{companyId:"",companyAddress:"",companyCode:"",companyContacts:"",companyDesc:"",companyLeader:"",companyName:"",companyPhone:"",registerMoney:0,companyEmail:""},rules:{companyName:[{required:!0,message:"请输入企业名称",trigger:"blur"}],companyLeader:[{required:!0,message:"请输入法定代表人",trigger:"blur"}],registerMoney:[{required:!0,message:"请输入注册资本",trigger:"blur"}],companyCode:[{required:!0,message:"请输入统一社会信用代码",trigger:"blur"}],companyContacts:[{required:!0,message:"请输入联系人",trigger:"blur"}],companyPhone:[{required:!0,message:"请输入联系电话",trigger:"blur"},{min:11,message:"联系电话不能小于11位",trigger:"blur"}],companyAddress:[{required:!0,message:"请输入联系地址",trigger:"blur"}]},companyTypeList:[{dictId:1,dictName:"内部企业"},{dictId:2,dictName:"外部企业"}],editor1:"editor1",allowDetail:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:COMPANY:MANAGE","SYSTEM:COMPANY:DETAILS"),allowChangeMange:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:COMPANY:MANAGE","SYSTEM:BACKGROU:CHANGE")}},activated:function(){this.allowDetail.twoAllow&&(void 0==this.$route.query.companyId?this.enterpriseForm.companyId=this.$store.getters.companyId:this.enterpriseForm.companyId=this.$route.query.companyId,"超级管理员"==this.$store.getters.username?this.getCompanyDetail():this.getCompanyInfo())},methods:{changeValue:function(n){this.enterpriseForm.companyDesc=n},getCompanyInfo:function(){var n=this;Object(r.j)({}).then(function(e){200==e.code?(n.enterpriseForm=e.data,n.$refs.editor.initCKEditor()):n.$message({type:"warning",message:e.message})})},editCompanyDetail:function(n){var e=this;this.$refs[n].validate(function(n){if(n){if(""!=e.enterpriseForm.companyEmail&&void 0!=e.enterpriseForm.companyEmail&&!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e.enterpriseForm.companyEmail))return void e.$message({message:"邮箱格式不正确",type:"warning"});Object(r.d)(e.enterpriseForm).then(function(n){200==n.code?(e.$message({type:"success",message:"修改成功"}),e.$refs.editor.destroyEditor(),e.closeCurrent(e.$store.state.tagsView.visitedViews,e.$route)):e.$message({type:"warning",message:n.message})})}})},getCompanyDetail:function(){var n=this,e={companyId:this.enterpriseForm.companyId};Object(r.i)(e).then(function(e){200==e.code?(n.enterpriseForm=e.data,n.$refs.editor.initCKEditor()):n.$message({type:"warning",message:e.message})})},goChangeWar:function(){this.$router.push({path:"/backend/changeWarden"})},cancelSub:function(){this.$refs.editor.destroyEditor(),this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route)}}},o={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"app-container"},[t("el-card",{staticClass:"box-card box-margin"},[t("div",{staticClass:"clearfix headerTop",attrs:{slot:"header"},slot:"header"},[t("span",[n._v("企业信息")])]),n._v(" "),t("div",{staticClass:"addUserContent"},[t("el-form",{ref:"enterpriseForm",staticClass:"demo-ruleForm",attrs:{model:n.enterpriseForm,rules:n.rules}},[t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"企业名称:",prop:"companyName"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入企业名称"},model:{value:n.enterpriseForm.companyName,callback:function(e){n.$set(n.enterpriseForm,"companyName",e)},expression:"enterpriseForm.companyName"}})],1)],1),n._v(" "),t("el-col",{staticClass:"text-right",attrs:{span:15}},[n.allowChangeMange.twoAllow?t("el-button",{staticStyle:{"margin-left":"10px",padding:"12px 10px"},attrs:{type:"primary",size:"small"},on:{click:n.goChangeWar}},[n._v("更换管理员\n              ")]):n._e()],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"法定代表人:",prop:"companyLeader"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入法定代表人"},model:{value:n.enterpriseForm.companyLeader,callback:function(e){n.$set(n.enterpriseForm,"companyLeader",e)},expression:"enterpriseForm.companyLeader"}})],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"注册资本:",prop:"registerMoney"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入注册资本"},model:{value:n.enterpriseForm.registerMoney,callback:function(e){n.$set(n.enterpriseForm,"registerMoney",e)},expression:"enterpriseForm.registerMoney"}},[t("template",{slot:"append"},[n._v("元")]),n._v("\n                  --\x3e\n                ")],2)],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"统一社会信用代码:",prop:"companyCode"}},[t("span",[n._v(n._s(n.enterpriseForm.companyCode))])])],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"联系人:",prop:"companyContacts"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入联系人"},model:{value:n.enterpriseForm.companyContacts,callback:function(e){n.$set(n.enterpriseForm,"companyContacts",e)},expression:"enterpriseForm.companyContacts"}})],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"联系电话:",prop:"companyPhone"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入联系电话",type:"phone",maxLength:"11"},model:{value:n.enterpriseForm.companyPhone,callback:function(e){n.$set(n.enterpriseForm,"companyPhone",e)},expression:"enterpriseForm.companyPhone"}})],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"联系地址:",prop:"companyAddress"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入联系地址"},model:{value:n.enterpriseForm.companyAddress,callback:function(e){n.$set(n.enterpriseForm,"companyAddress",e)},expression:"enterpriseForm.companyAddress"}})],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"联系邮箱:",prop:"companyEmail"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入联系邮箱"},model:{value:n.enterpriseForm.companyEmail,callback:function(e){n.$set(n.enterpriseForm,"companyEmail",e)},expression:"enterpriseForm.companyEmail"}})],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"排序:",prop:"sortNum"}},[t("el-input",{attrs:{size:"small",type:"number",placeholder:"请输入排序"},model:{value:n.enterpriseForm.sortNum,callback:function(e){n.$set(n.enterpriseForm,"sortNum",e)},expression:"enterpriseForm.sortNum"}})],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"企业类型:",prop:"companyType"}},[t("el-select",{staticStyle:{"margin-bottom":"10px",width:"100%"},attrs:{size:"small",placeholder:"请选择"},model:{value:n.enterpriseForm.companyType,callback:function(e){n.$set(n.enterpriseForm,"companyType",e)},expression:"enterpriseForm.companyType"}},n._l(n.companyTypeList,function(n){return t("el-option",{key:n.dictId,attrs:{label:n.dictName,value:n.dictId}})}),1)],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:8}},[t("el-form-item",{attrs:{label:"备注:",prop:"companyDesc"}},[t("EditorText",{ref:"editor",attrs:{id:n.editor1,value:n.enterpriseForm.companyDesc},on:{changeValue:function(e){return n.changeValue(e)}}})],1)],1)],1)],1)],1)]),n._v(" "),t("div",{staticClass:"btnList"},[t("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return n.editCompanyDetail("enterpriseForm")}}},[n._v("确定")]),n._v(" "),t("el-button",{attrs:{size:"small"},on:{click:n.cancelSub}},[n._v("取消")])],1)],1)},staticRenderFns:[]};var s=t("VU/8")(a,o,!1,function(n){t("kEQH")},"data-v-0955d157",null);e.default=s.exports}});