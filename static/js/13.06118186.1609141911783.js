webpackJsonp([13],{XT9Z:function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=i("phCv"),r={components:{EditorText:i("3/OM").a},data:function(){return{privilegesForm:{permissionCode:"",permissionDesc:"",permissionName:"",permissionType:"",requestMethod:"",requestTarget:"",requestUrl:"",webUrl:"",icon:"",lable:""},rules:{permissionName:[{required:!0,message:"请输入权限名称",trigger:"blur"}],permissionCode:[{required:!0,message:"请选择标识符",trigger:"blur"}],permissionType:[{required:!0,message:"请选择类型",trigger:"blur"}],requestMethod:[{required:!0,message:"请选择请求方法",trigger:"blur"}],requestUrl:[{required:!0,message:"请输入请求url",trigger:"blur"}],requestTarget:[{required:!0,message:"请输入请求目标",trigger:"blur"}],permissionScope:[{required:!0,message:"请选中权限范围",trigger:"blur"}]},levelNum:1,parentId:0,parentIds:0,permissionId:"",dialogVisible:!1,typeList:[{value:1,label:"菜单"},{value:2,label:"按钮"}],requestList:[{value:1,label:"GET"},{value:2,label:"POST"},{value:3,label:"DELETE"},{value:4,label:"PUT"}],permissionScopeList:[{value:"0",label:"系统级"},{value:"1",label:"应用级"}],getDetail:!1,editor1:"editor1",allowAdd:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:PERMISSION:MANAGE","SYSTEM:PERMISSION:INSTER"),allowUpdate:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:PERMISSION:MANAGE","SYSTEM:PERMISSION:EDIT"),allowDetail:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:PERMISSION:MANAGE","SYSTEM:PERMISSION:DETAILS")}},activated:function(){this.parentId=this.$route.query.parentId,this.parentIds=this.$route.query.parentIds,this.permissionId=this.$route.query.permissionId,this.levelNum=this.$route.query.levelNum,""!=this.permissionId&&void 0!=this.permissionId&&this.allowDetail.twoAllow&&this.getPrivilegesDetail(),this.$refs.editor.initCKEditor()},updated:function(){this.iconHandle()},methods:{changeValue:function(e){this.privilegesForm.permissionDesc=e},getPrivilegesDetail:function(){var e=this,n={permissionId:this.permissionId};Object(s.d)(n).then(function(n){200==n.code?(e.privilegesForm.permissionCode=n.data.permissionCode,e.privilegesForm.permissionDesc=n.data.permissionDesc,e.privilegesForm.permissionName=n.data.permissionName,e.privilegesForm.permissionType=1==n.data.permissionType?"菜单":"按钮",e.privilegesForm.requestMethod=1==n.data.requestMethod?"GET":2==n.data.requestMethod?"POST":3==n.data.requestMethod?"DELETE":4==n.data.requestMethod?"PUT":n.data.requestMethod,e.privilegesForm.requestTarget=n.data.requestTarget,e.privilegesForm.requestUrl=n.data.requestUrl,e.privilegesForm.webUrl=n.data.webUrl,e.privilegesForm.icon=n.data.meta.icon,e.privilegesForm.permissionScope=n.data.permissionScope,e.getDetail=!0,e.iconHandle(),e.$refs.editor.initCKEditor()):e.$message({type:"error",message:n.message})})},addPrivilegesBtn:function(){var e=this;if(""==this.privilegesForm.icon&&this.privilegesForm.label,""!=this.privilegesForm.permissionName&&null!=this.privilegesForm.permissionName)if(""!=this.privilegesForm.permissionCode&&null!=this.privilegesForm.permissionCode)if(""!=this.privilegesForm.permissionType&&null!=this.privilegesForm.permissionType)if(""!=this.privilegesForm.requestMethod&&null!=this.privilegesForm.requestMethod)if(""!=this.privilegesForm.requestUrl&&null!=this.privilegesForm.requestUrl)if(""!=this.privilegesForm.requestTarget&&null!=this.privilegesForm.requestTarget){var n={levelNum:void 0==this.levelNum?1:this.levelNum,parentId:void 0==this.parentId?0:this.parentId,parentIds:void 0==this.parentIds?0:this.parentIds,permissionId:this.permissionId,permissionCode:this.privilegesForm.permissionCode,permissionDesc:this.privilegesForm.permissionDesc,permissionName:this.privilegesForm.permissionName,permissionType:this.privilegesForm.permissionType,requestMethod:this.privilegesForm.requestMethod,requestTarget:this.privilegesForm.requestTarget,requestUrl:this.privilegesForm.requestUrl,webUrl:this.privilegesForm.webUrl,permissionScope:this.privilegesForm.permissionScope,meta:{icon:this.privilegesForm.icon,label:this.privilegesForm.label}};Object(s.a)(n).then(function(n){200==n.code?(e.$message({type:"success",message:"新建成功"}),e.$refs.editor.destroyEditor(),e.closeCurrent(e.$store.state.tagsView.visitedViews,e.$route,"/backend/operatePrivileges")):e.$message({type:"error",message:n.message})})}else this.$message({type:"warning",message:"请求目标不能为空"});else this.$message({type:"warning",message:"请求URL不能为空"});else this.$message({type:"warning",message:"请选择请求方法"});else this.$message({type:"warning",message:"请选择类型"});else this.$message({type:"warning",message:"标识符不能为空"});else this.$message({type:"warning",message:"权限名称不能为空"})},editPrivileges:function(){var e=this,n={levelNum:void 0==this.levelNum?1:this.levelNum,parentId:void 0==this.parentId?0:this.parentId,parentIds:void 0==this.parentIds?0:this.parentIds,permissionId:this.permissionId,permissionCode:this.privilegesForm.permissionCode,permissionDesc:this.privilegesForm.permissionDesc,permissionName:this.privilegesForm.permissionName,permissionType:"菜单"==this.privilegesForm.permissionType?1:2,requestMethod:"GET"==this.privilegesForm.requestMethod?1:"POST"==this.privilegesForm.requestMethod?2:"DELETE"==this.privilegesForm.requestMethod?3:"PUT"==this.privilegesForm.requestMethod?4:this.privilegesForm.requestMethod,requestTarget:this.privilegesForm.requestTarget,requestUrl:this.privilegesForm.requestUrl,webUrl:this.privilegesForm.webUrl,permissionScope:this.privilegesForm.permissionScope,meta:{icon:this.privilegesForm.icon,label:this.privilegesForm.label}};Object(s.c)(n).then(function(n){200==n.code?(e.$message({type:"success",message:"修改成功"}),e.$refs.editor.destroyEditor(),e.closeCurrent(e.$store.state.tagsView.visitedViews,e.$route,"/backend/operatePrivileges")):e.$message({type:"error",message:n.message})})},cancelSub:function(){this.$refs.editor.destroyEditor(),this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,"/backend/operatePrivileges")},iconHandle:function(e){""!=this.privilegesForm.icon&&void 0!==this.privilegesForm.icon?this.privilegesForm.label=this.privilegesForm.permissionName:this.privilegesForm.label=""}}},t={render:function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"app-container"},[i("el-card",{staticClass:"box-card box-margin"},[i("div",{staticClass:"clearfix headerTop",attrs:{slot:"header"},slot:"header"},[i("span",[e._v(e._s(void 0!=e.levelNum?"添加子权限":""==e.permissionId||void 0==e.permissionId?"新建权限":"编辑权限"))])]),e._v(" "),i("div",{staticClass:"addUserContent"},[i("el-form",{ref:"privilegesForm",staticClass:"demo-ruleForm",attrs:{model:e.privilegesForm,rules:e.rules}},[i("el-row",[i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"权限名称:",prop:"permissionName"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入权限名称"},model:{value:e.privilegesForm.permissionName,callback:function(n){e.$set(e.privilegesForm,"permissionName",n)},expression:"privilegesForm.permissionName"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"标识符:",prop:"permissionCode"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入标识符",disabled:e.getDetail},model:{value:e.privilegesForm.permissionCode,callback:function(n){e.$set(e.privilegesForm,"permissionCode",n)},expression:"privilegesForm.permissionCode"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"类型:",prop:"permissionType"}},[i("el-select",{attrs:{size:"small",placeholder:"请选择类型",disabled:e.getDetail},model:{value:e.privilegesForm.permissionType,callback:function(n){e.$set(e.privilegesForm,"permissionType",n)},expression:"privilegesForm.permissionType"}},e._l(e.typeList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value,disabled:e.disabled}})}),1)],1)],1),e._v(" "),i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"请求方法:",prop:"requestMethod"}},[i("el-select",{attrs:{size:"small",placeholder:"请选择请求方法",disabled:e.getDetail},model:{value:e.privilegesForm.requestMethod,callback:function(n){e.$set(e.privilegesForm,"requestMethod",n)},expression:"privilegesForm.requestMethod"}},e._l(e.requestList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value,disabled:e.disabled}})}),1)],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"请求URL:",prop:"requestUrl"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入请求URL",disabled:e.getDetail},model:{value:e.privilegesForm.requestUrl,callback:function(n){e.$set(e.privilegesForm,"requestUrl",n)},expression:"privilegesForm.requestUrl"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"路由URL:",prop:"webUrl"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入路由URL"},model:{value:e.privilegesForm.webUrl,callback:function(n){e.$set(e.privilegesForm,"webUrl",n)},expression:"privilegesForm.webUrl"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"权限范围:",prop:"permissionScope"}},[i("el-select",{attrs:{size:"small",placeholder:"请选择权限范围",disabled:e.getDetail},model:{value:e.privilegesForm.permissionScope,callback:function(n){e.$set(e.privilegesForm,"permissionScope",n)},expression:"privilegesForm.permissionScope"}},e._l(e.permissionScopeList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value,disabled:e.disabled}})}),1)],1)],1),e._v(" "),i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"请求目标:",prop:"requestTarget"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入请求目标",disabled:e.getDetail},model:{value:e.privilegesForm.requestTarget,callback:function(n){e.$set(e.privilegesForm,"requestTarget",n)},expression:"privilegesForm.requestTarget"}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"图标:",prop:"icon"}},[i("el-input",{attrs:{size:"small",placeholder:"请输入图标名称"},on:{change:e.iconHandle},model:{value:e.privilegesForm.icon,callback:function(n){e.$set(e.privilegesForm,"icon",n)},expression:"privilegesForm.icon"}})],1)],1),e._v(" "),i("el-col",{attrs:{span:7}},[i("el-form-item",{attrs:{label:"栏目名称:",prop:"label"}},[""!=e.privilegesForm.icon&&void 0!==e.privilegesForm.icon?i("el-input",{attrs:{size:"small",disabled:""},model:{value:e.privilegesForm.label,callback:function(n){e.$set(e.privilegesForm,"label",n)},expression:"privilegesForm.label"}}):i("el-input",{attrs:{size:"small",disabled:""}})],1)],1)],1),e._v(" "),i("el-row",[i("el-col",{attrs:{span:14}},[i("el-form-item",{attrs:{label:"备注:",prop:"permissionDesc"}},[i("EditorText",{ref:"editor",attrs:{id:e.editor1,value:e.privilegesForm.permissionDesc},on:{changeValue:function(n){return e.changeValue(n)}}})],1)],1)],1)],1)],1)]),e._v(" "),i("div",{staticClass:"btnList"},[""==e.permissionId||void 0==e.permissionId&&e.allowAdd.twoAllow?i("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.addPrivilegesBtn}},[e._v("确定\n      ")]):e._e(),e._v(" "),""!=e.permissionId&&void 0!=e.permissionId&&e.allowUpdate.twoAllow?i("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.editPrivileges}},[e._v("修改\n      ")]):e._e(),e._v(" "),i("el-button",{attrs:{size:"small"},on:{click:e.cancelSub}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var l=i("VU/8")(r,t,!1,function(e){i("y8sy")},"data-v-648b13ba",null);n.default=l.exports},gDIe:function(e,n,i){(e.exports=i("FZ+f")(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*修改列表页面表格样式*/\n[data-v-648b13ba] .el-table {\n  border: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-648b13ba] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-648b13ba] .el-table--border th,[data-v-648b13ba] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-648b13ba] .el-table__row:nth-child(even) {\n  background: rgb(235, 248, 255) !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666666666666666);\n}\n[data-v-648b13ba] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-648b13ba] .el-table--border td:first-child {\n  border-right: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-648b13ba] .el-table--border td:last-child {\n  border-left: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-648b13ba] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 115px;\n}\n[data-v-648b13ba] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n}\n[data-v-648b13ba] .el-form-item__label {\n  min-width: 77px;\n}\n.btnList[data-v-648b13ba] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n[data-v-648b13ba] .el-card__header {\n  color: #008DD6;\n}\n[data-v-648b13ba] input::-webkit-outer-spin-button,[data-v-648b13ba] input::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0;\n}\n.addRoleDept[data-v-648b13ba] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.otherDept[data-v-648b13ba] {\n  border: 1px solid #C0C4CC;\n  padding: 10px;\n  border-radius: 4px;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-right: 15px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.chooseBox[data-v-648b13ba] {\n  background: #FD903C;\n  color: #fff;\n  line-height: normal;\n  padding: 5px 10px;\n  border-radius: 4px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n.chooseBox[data-v-648b13ba]:last-child {\n  margin-right: 0;\n}\n.chooseBox i[data-v-648b13ba] {\n  cursor: pointer;\n}\n.addBtn[data-v-648b13ba] {\n  height: 35px;\n  font-size: 16px;\n}\n\n",""])},phCv:function(e,n,i){"use strict";n.e=function(e){return Object(s.a)({url:"/center/permission/user/queryPermissionInfoList",method:"post",data:e})},n.d=function(e){return Object(s.a)({url:"/center/permission/user/queryPermissionInfo",method:"get",params:e})},n.c=function(e){return Object(r.a)({url:"/center/permission/user/editPermission",method:"post",data:e})},n.b=function(e){return Object(r.a)({url:"/center/permission/user/deletePermissionInfo",method:"get",params:e})},n.a=function(e){return Object(r.a)({url:"/center/permission/user/addPermission",method:"post",data:e})},n.f=function(e){return Object(s.a)({url:"/center/permission/user/goUpOrDown",method:"post",data:e})};var s=i("vLgD"),r=i("s01O")},y8sy:function(e,n,i){var s=i("gDIe");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);i("rjj0")("dfe77362",s,!0)}});