webpackJsonp([97],{"2l3G":function(e,n,a){var t=a("qQG2");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a("rjj0")("c5de6dcc",t,!0)},ksyD:function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=a("7TQO"),i={data:function(){return{active:0,codeTime:0,codeTimeNew:0,oldSendShow:!0,newSendShow:!0,primaryManage:{loginName:"",userName:"",verificationCode:""},newManage:{loginName:"",userName:"",verificationCode:""},rulesOld:{loginName:[{required:!0,message:"请输入账号",trigger:"blur"}],userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],verificationCode:[{required:!0,message:"请输入验证码",trigger:"blur"}]},rulesNew:{loginName:[{required:!0,message:"请输入账号",trigger:"blur"}],userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],verificationCode:[{required:!0,message:"请输入验证码",trigger:"blur"}]},companyId:this.$store.getters.companyId}},methods:{getCode:function(e){var n=this;if(0==this.active){if(1==e){var a={companyId:this.companyId,loginName:this.primaryManage.loginName,userName:this.primaryManage.userName,operationType:e};Object(t.f)(a).then(function(e){if(200==e.code){n.oldSendShow=!1,n.codeTime=60;var a=setInterval(function(){n.codeTime--,n.codeTime<=0&&(n.oldSendShow=!0,clearInterval(a))},1e3)}else n.$message({type:"error",message:e.message})})}}else if(2==e){a={companyId:this.companyId,loginName:this.newManage.loginName,userName:this.newManage.userName,operationType:e};Object(t.f)(a).then(function(e){if(200==e.code){n.newSendShow=!1,n.codeTimeNew=60;var a=setInterval(function(){n.codeTimeNew--,n.codeTimeNew<=0&&(n.newSendShow=!0,clearInterval(a))},1e3)}else n.$message({type:"error",message:e.message})})}},next:function(){var e=this;if(0==this.active){if(""==this.primaryManage.loginName)return void this.$message({type:"warning",message:"账号不能为空！"});if(""==this.primaryManage.userName)return void this.$message({type:"warning",message:"用户名不能为空！"});if(""==this.primaryManage.verificationCode)return void this.$message({type:"warning",message:"验证码不能为空！"});var n={loginName:this.primaryManage.loginName,userName:this.primaryManage.userName,verificationCode:this.primaryManage.verificationCode,companyId:this.companyId};Object(t.g)(n).then(function(n){200==n.code?e.active++:e.$message({type:"error",message:n.message})})}else{if(""==this.newManage.loginName)return void this.$message({type:"warning",message:"账号不能为空！"});if(""==this.newManage.userName)return void this.$message({type:"warning",message:"用户名不能为空！"});if(""==this.newManage.verificationCode)return void this.$message({type:"warning",message:"验证码不能为空！"});n={companyId:this.companyId,oldLoginName:this.primaryManage.loginName,oldUserName:this.primaryManage.userName,oldVerificationCode:this.primaryManage.verificationCode,newLoginName:this.newManage.loginName,newUserName:this.newManage.userName,newVerificationCode:this.newManage.verificationCode};Object(t.b)(n).then(function(n){200==n.code?(e.$message({type:"success",message:"更换成功"}),e.closeCurrent(e.$store.state.tagsView.visitedViews,e.$route,"/backend/enterpriseDetail")):e.$message({type:"error",message:n.message})})}},cancelSub:function(){this.primaryManage={},this.newManage={},this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,"/backend/enterpriseDetail")}}},r={render:function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"app-container"},[a("el-card",{staticClass:"box-card box-margin"},[a("div",{staticClass:"clearfix headerTop",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("更换管理员")])]),e._v(" "),a("el-steps",{attrs:{active:e.active,"finish-status":"success"}},[a("el-step",{attrs:{title:"步骤 1"}}),e._v(" "),a("el-step",{attrs:{title:"步骤 2"}})],1),e._v(" "),a("div",{staticClass:"addUserContent"},[0==e.active?a("el-form",{ref:"primaryManage",staticClass:"demo-ruleForm",attrs:{model:e.primaryManage,rules:e.rulesOld}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"原管理员账号:",prop:"loginName"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入账号"},model:{value:e.primaryManage.loginName,callback:function(n){e.$set(e.primaryManage,"loginName",n)},expression:"primaryManage.loginName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"原管理员姓名:",prop:"userName"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入姓名"},model:{value:e.primaryManage.userName,callback:function(n){e.$set(e.primaryManage,"userName",n)},expression:"primaryManage.userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"验证码:",prop:"verificationCode"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入验证码"},model:{value:e.primaryManage.verificationCode,callback:function(n){e.$set(e.primaryManage,"verificationCode",n)},expression:"primaryManage.verificationCode"}}),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.oldSendShow,expression:"oldSendShow"}],attrs:{size:"small",type:"primary"},on:{click:function(n){return e.getCode(1)}}},[e._v("发送验证码")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.oldSendShow,expression:"!oldSendShow"}],attrs:{size:"small",disabled:!0}},[e._v(e._s(e.codeTime+"s"))])],1)],1)],1)],1):e._e(),e._v(" "),1==e.active?a("el-form",{ref:"newManage",staticClass:"demo-ruleForm",attrs:{model:e.newManage,rules:e.rulesNew}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"新管理员账号:",prop:"loginName"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入账号"},model:{value:e.newManage.loginName,callback:function(n){e.$set(e.newManage,"loginName",n)},expression:"newManage.loginName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"新管理员姓名:",prop:"userName"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入姓名"},model:{value:e.newManage.userName,callback:function(n){e.$set(e.newManage,"userName",n)},expression:"newManage.userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"验证码:",prop:"verificationCode"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入验证码"},model:{value:e.newManage.verificationCode,callback:function(n){e.$set(e.newManage,"verificationCode",n)},expression:"newManage.verificationCode"}}),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.newSendShow,expression:"newSendShow"}],attrs:{size:"small",type:"primary"},on:{click:function(n){return e.getCode(2)}}},[e._v("发送验证码")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.newSendShow,expression:"!newSendShow"}],attrs:{size:"small",disabled:!0}},[e._v(e._s(e.codeTimeNew+"s"))])],1)],1)],1)],1):e._e()],1)],1),e._v(" "),a("div",{staticClass:"btnList"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.next}},[e._v(e._s(this.active>=1?"提交":"下一步"))]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:e.cancelSub}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,r,!1,function(e){a("2l3G")},"data-v-0276faaa",null);n.default=s.exports},qQG2:function(e,n,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*修改列表页面表格样式*/\n[data-v-0276faaa] .el-table {\n  border: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-0276faaa] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-0276faaa] .el-table--border th,[data-v-0276faaa] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-0276faaa] .el-table__row:nth-child(even) {\n  background: rgb(235, 248, 255) !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666666666666666);\n}\n[data-v-0276faaa] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-0276faaa] .el-table--border td:first-child {\n  border-right: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-0276faaa] .el-table--border td:last-child {\n  border-left: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-0276faaa] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 115px;\n}\n[data-v-0276faaa] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex\n}\n.el-input[data-v-0276faaa]{\n  margin-right: 10px;\n}\n[data-v-0276faaa] .el-form-item__label {\n  min-width: 130px;\n}\n.btnList[data-v-0276faaa] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n[data-v-0276faaa] .el-card__header {\n  color: #008DD6;\n}\n[data-v-0276faaa] input::-webkit-outer-spin-button,[data-v-0276faaa] input::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0;\n}\n.btnList[data-v-0276faaa] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n",""])}});