webpackJsonp([31],{HZod:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("mvHQ"),a=t.n(o),s=t("i3ot"),r=t("5ybE"),i=t("ms7A"),d=(t("Q5rI"),{components:{EditorText:t("3/OM").a},data:function(){return{dialogShow:!1,roleForm:{roleName:"",addRolePermissionDtos:[],addUserRoleDtos:[],dataPermissionsType:"",deptList:[],roleDesc:""},defaultRolePermissionDtos:[],defaultDeptList:[],levelNum:1,parentId:0,parentIds:"0",roleId:"",rules:{roleName:[{required:!0,message:"请输入角色名称",trigger:"blur"}],addRolePermissionDtos:[{required:!0,message:"请选择操作权限",trigger:"blur"}],dataPermissionsType:[{required:!0,message:"请选择数据权限",trigger:"blur"}]},dataOper:[{value:0,label:"全部数据"},{value:-1,label:"本部门及所有子部门数据"},{value:-2,label:"本部门数据"},{value:-3,label:"仅自己参与过的数据"},{value:-4,label:"自定义数据"}],defaultPropsOperation:{children:"child",label:"permissionName",value:"permissionId",checked:"selected"},defaultDept:{children:"child",label:"deptName",value:"deptId",checked:"selected"},checkList:[],userList:[],userCheckList:[],loginName:"",page:1,pageSize:20,userName:"",total:0,holdCheckUser:[],permissionsList:[],deptList:[],editor1:"editor1",deptIds:[],findChild:1,projectTypeList:[{dictId:"0",dictName:"项目型"},{dictId:"1",dictName:"知识产权型"},{dictId:"2",dictName:"财务型"},{dictId:"4",dictName:"项目审计型"}],checkedList:[],allowAdd:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:INSTER"),allowUpdate:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:EDIT"),allowDetail:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:DETAILS")}},activated:function(){this.parentId=this.$route.query.parentId,this.parentIds=this.$route.query.parentIds,this.roleId=this.$route.query.roleId,void 0!=this.roleId&&""!=this.roleId&&this.allowDetail.twoAllow?this.getRoleDetail():this.getPermissions(),this.getDataDeptList(),this.$refs.editor.initCKEditor()},methods:{changeValue:function(n){this.roleForm.roleDesc=n},addRoleInfo:function(){var n=this;if(""!=this.roleForm.roleName&&void 0!=this.roleForm.roleName)if(""!=this.roleForm.addRolePermissionDtos&&void 0!=this.roleForm.addRolePermissionDtos)if(""!==this.roleForm.dataPermissionsType&&void 0!==this.roleForm.dataPermissionsType){var e={parentId:void 0==this.parentId||null==this.parentId?0:this.parentId,parentIds:void 0==this.parentIds||null==this.parentIds?"0":this.parentIds,roleName:this.roleForm.roleName,addRolePermissionDtos:this.roleForm.addRolePermissionDtos,addUserRoleDtos:this.roleForm.addUserRoleDtos,dataPermissionsType:this.roleForm.dataPermissionsType,deptList:this.roleForm.deptList,roleDesc:this.roleForm.roleDesc};if(""!=this.checkedList&&0!=this.checkedList.length){var t={companyId:this.$store.getters.companyId};t.orderType=this.checkedList.join(","),e.orderTypeRoleDto=t}Object(s.a)(e).then(function(e){200==e.code?(n.$message({type:"success",message:"新建成功"}),n.roleForm.roleName="",n.roleForm.addRolePermissionDtos=[],n.roleForm.addUserRoleDtos=[],n.roleForm.dataPermissionsType="",n.roleForm.deptList=[],n.roleForm.roleDesc="",n.userList=[],n.defaultRolePermissionDtos=[],n.defaultDeptList=[],n.$refs.editor.destroyEditor(),n.closeCurrent(n.$store.state.tagsView.visitedViews,n.$route,"/backend/rolesManage")):n.$message({type:"error",message:e.message})})}else this.$message({type:"warning",message:"请选择数据权限"});else this.$message({type:"warning",message:"请选择操作权限"});else this.$message({type:"warning",message:"角色名称不能为空"})},editRoleBox:function(){var n=this;-4!=this.roleForm.dataPermissionsType&&(this.roleForm.deptList=[]),this.roleForm.addRolePermissionDtos.forEach(function(n){n.selected=!0});var e={parentId:void 0==this.parentId||null==this.parentId?0:this.parentId,parentIds:void 0==this.parentIds||null==this.parentIds?"0":this.parentIds,roleName:this.roleForm.roleName,addRolePermissionDtos:this.roleForm.addRolePermissionDtos,addUserRoleDtos:this.roleForm.addUserRoleDtos,dataPermissionsType:this.roleForm.dataPermissionsType,deptList:this.roleForm.deptList,roleDesc:this.roleForm.roleDesc,roleId:void 0==this.roleId?"":this.roleId};if(""!=this.checkedList&&0!=this.checkedList.length){var t={companyId:this.$store.getters.companyId,roleId:this.roleForm.roleId};this.roleForm.orderTypeRoleVo&&(t.sid=this.roleForm.orderTypeRoleVo.sid),t.orderType=this.checkedList.join(","),e.orderTypeRoleDto=t}else{var o={companyId:this.$store.getters.companyId,roleId:this.roleForm.roleId,orderType:""};this.roleForm.orderTypeRoleVo&&(o.sid=this.roleForm.orderTypeRoleVo.sid),e.orderTypeRoleDto=o}Object(s.d)(e).then(function(e){200==e.code?(n.$message({type:"success",message:"修改成功"}),n.roleForm.roleName="",n.roleForm.addRolePermissionDtos=[],n.roleForm.addUserRoleDtos=[],n.roleForm.dataPermissionsType="",n.roleForm.deptList=[],n.roleForm.roleDesc="",n.userList=[],n.defaultRolePermissionDtos=[],n.defaultDeptList=[],n.$refs.editor.destroyEditor(),n.closeCurrent(n.$store.state.tagsView.visitedViews,n.$route,"/backend/rolesManage")):n.$message({type:"error",message:e.message})})},getRoleDetail:function(){var n=this,e={roleId:this.roleId,companyId:this.$store.getters.companyId};Object(s.i)(e).then(function(e){200==e.code?(n.roleForm={roleName:e.data.roleName,addUserRoleDtos:e.data.roleUserVos,dataPermissionsType:parseInt(e.data.dataPermissions),roleDesc:e.data.roleDesc,orderTypeRoleVo:e.data.orderTypeRoleVo},n.permissionsList=e.data.permissionsInfoTreeVos,n.deptList=e.data.dataPermissionsInfoVos,n.findAllChildren(n.permissionsList,n.defaultRolePermissionDtos),n.findAllChildren(n.deptList,n.defaultDeptList),n.roleForm.deptList=JSON.parse(a()(n.defaultDeptList)),setTimeout(function(){n.roleForm.addRolePermissionDtos=n.$refs.Oper.getHalfCheckedNodes().concat(n.$refs.Oper.getCheckedNodes())},200),e.data.orderTypeRoleDto&&(n.checkedList=[],e.data.orderTypeRoleVo&&e.data.orderTypeRoleVo.orderType&&(n.checkedList=e.data.orderTypeRoleVo.orderType.split(","))),n.$refs.editor.initCKEditor()):n.$message({type:"error",message:e.message})})},findAllChildren:function(n,e){var t=this;void 0!=n&&n.forEach(function(n,o){n.child&&0!==n.child.length&&t.findAllChildren(n.child,e),n.permissionId?(n.child&&n.child.forEach(function(e){0==e.selected&&t.$set(n,"selected",!1)}),1==n.selected&&e.push(n.permissionId)):1==n.selected&&e.push(n.deptId)})},handleCheckedUserChange:function(n){var e=this;this.userList.forEach(function(t){n.forEach(function(n){t.userId==n&&e.userCheckList.push(t)})})},changeCheckUser:function(n){n.checked=!n.checked},chooseUserOk:function(){this.roleForm.addUserRoleDtos=this.userCheckList;var n={};this.roleForm.addUserRoleDtos=this.roleForm.addUserRoleDtos.reduce(function(e,t){return!n[t.userId]&&(n[t.userId]=e.push(t)),e},[]),this.userCheckList=[],this.dialogShow=!1},cancelCheck:function(){this.dialogShow=!1},deleteUser:function(n,e){this.roleForm.addUserRoleDtos.splice(e,1)},getUserList:function(){var n=this,e={deptIds:this.deptIds,findChild:this.findChild,page:this.page,pageSize:this.pageSize,userName:this.userName};Object(i.i)(e).then(function(e){200==e.code?(n.total=Number(e.data.total),n.page>1?n.userList=n.userList.concat(e.data.data):n.userList=e.data.data):n.$message({type:"error",message:e.message})})},openUserList:function(){var n=this;this.userList=[],this.userCheckList=[],this.checkList=[],this.page=1,this.pageSize=20,this.dialogShow=!0,this.roleForm.addUserRoleDtos.forEach(function(e){n.userCheckList.push(e),n.checkList.push(e.userId)}),this.getUserList()},cancelSub:function(){this.roleForm.roleName="",this.roleForm.addRolePermissionDtos=[],this.roleForm.addUserRoleDtos=[],this.roleForm.dataPermissionsType="",this.roleForm.deptList=[],this.roleForm.roleDesc="",this.userList=[],this.defaultRolePermissionDtos=[],this.defaultDeptList=[],this.$refs.editor.destroyEditor(),this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,"/backend/rolesManage")},getPermissions:function(){var n=this,e={companyId:this.$store.getters.companyId,roleId:void 0==this.roleId?"":this.roleId};Object(s.h)(e).then(function(e){200==e.code?n.permissionsList=e.data:n.$message({type:"error",message:e.message})})},changeDataType:function(n){-4==n&&this.getDataDeptList()},getDataDeptList:function(){var n=this;Object(r.f)({}).then(function(e){200==e.code?n.deptList=e.data.deptInfoTreeVos:n.$message({type:"error",message:e.message})})},deptChange:function(){this.getUserList()},userChange:function(){this.page=1,this.getUserList()},checkChangePermission:function(){var n=this,e=this.$refs.Oper.getHalfCheckedNodes(),t=this.$refs.Oper.getCheckedNodes();e.forEach(function(e){n.$set(e,"selected",!0)}),t.forEach(function(e){n.$set(e,"selected",!0)}),this.roleForm.addRolePermissionDtos=e.concat(t)},checkChangeDeptList:function(){this.roleForm.deptList=this.$refs.dept.getHalfCheckedKeys().concat(this.$refs.dept.getCheckedKeys())},handleSizeChange:function(n){this.pageSize=n,this.getUserList()},handleCurrentChange:function(n){this.page=n,this.getUserList()},getMore:function(){this.page=this.page+1,this.getUserList()}}}),l={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"app-container"},[t("el-card",{staticClass:"box-card box-margin"},[t("div",{staticClass:"clearfix headerTop",attrs:{slot:"header"},slot:"header"},[t("span",[n._v(n._s(void 0!=n.parentId?"添加子角色":""==n.roleId||void 0==n.roleId?"新建角色":"编辑角色"))])]),n._v(" "),t("div",{staticClass:"addUserContent"},[t("el-form",{ref:"roleForm",staticClass:"demo-ruleForm",attrs:{model:n.roleForm,rules:n.rules}},[t("el-row",[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"角色名称:",prop:"roleName"}},[t("el-input",{attrs:{size:"small",placeholder:"请输入角色名称",maxlength:"45"},model:{value:n.roleForm.roleName,callback:function(e){n.$set(n.roleForm,"roleName",e)},expression:"roleForm.roleName"}})],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"用户:",prop:"addUserRoleDtos"}},[t("div",{staticClass:"userCont"},[t("div",{staticClass:"userList"},[n._l(n.roleForm.addUserRoleDtos,function(e,o){return""!=n.roleForm.addUserRoleDtos?t("div",{staticClass:"userBox"},[t("span",[n._v(n._s(e.userName))]),n._v(" "),t("i",{staticClass:"el-icon-close",on:{click:function(t){return n.deleteUser(e,o)}}})]):n._e()}),n._v(" "),t("div",{staticClass:"userAddBtn",on:{click:n.openUserList}},[t("i",{staticClass:"el-icon-plus"})])],2)])])],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"操作权限:",prop:"addRolePermissionDtos"}},[t("div",{staticClass:"operDtosTree"},[t("el-tree",{ref:"Oper",attrs:{data:n.permissionsList,"show-checkbox":"","expand-on-click-node":!1,"node-key":"permissionId","highlight-current":"",props:n.defaultPropsOperation,"default-checked-keys":n.defaultRolePermissionDtos},on:{"check-change":n.checkChangePermission}})],1)])],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"数据权限:",prop:"dataPermissionsType"}},[t("el-select",{staticStyle:{width:"40%","margin-bottom":"10px"},attrs:{size:"small",clearable:"",placeholder:"请选择"},on:{change:n.changeDataType},model:{value:n.roleForm.dataPermissionsType,callback:function(e){n.$set(n.roleForm,"dataPermissionsType",e)},expression:"roleForm.dataPermissionsType"}},n._l(n.dataOper,function(n){return t("el-option",{key:n.value,attrs:{label:n.label,value:n.value}})}),1),n._v(" "),-4==n.roleForm.dataPermissionsType?t("div",{staticClass:"operDtosTree"},[t("el-tree",{ref:"dept",attrs:{data:n.deptList,"show-checkbox":"","expand-on-click-node":!1,"node-key":"deptId","highlight-current":"",props:n.defaultDept,"default-checked-keys":n.defaultDeptList},on:{"check-change":n.checkChangeDeptList}})],1):n._e()],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"允许查看的项目类型:"}},[t("el-checkbox-group",{on:{change:n.handleCheckedCitiesChange},model:{value:n.checkedList,callback:function(e){n.checkedList=e},expression:"checkedList"}},n._l(n.projectTypeList,function(e){return t("el-checkbox",{key:e.dictId,attrs:{label:e.dictId}},[n._v(n._s(e.dictName))])}),1)],1)],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-form-item",{attrs:{label:"备注:"}},[t("EditorText",{ref:"editor",attrs:{id:n.editor1,value:n.roleForm.roleDesc},on:{changeValue:function(e){return n.changeValue(e)}}})],1)],1)],1)],1)],1)]),n._v(" "),t("div",{staticClass:"btnList"},[void 0==n.roleId||""==n.roleId&&n.allowAdd.twoAllow?t("el-button",{attrs:{size:"small",type:"primary"},on:{click:n.addRoleInfo}},[n._v("确定")]):n._e(),n._v(" "),void 0!=n.roleId&&""!=n.roleId&&n.allowUpdate.twoAllow?t("el-button",{attrs:{size:"small",type:"primary"},on:{click:n.editRoleBox}},[n._v("修改")]):n._e(),n._v(" "),t("el-button",{attrs:{size:"small"},on:{click:n.cancelSub}},[n._v("取消")])],1),n._v(" "),t("el-dialog",{attrs:{title:"用户列表",visible:n.dialogShow,width:"40%"},on:{"update:visible":function(e){n.dialogShow=e}}},[t("div",{staticClass:"userCheckbox"},[t("div",{staticClass:"dialogChoose",staticStyle:{display:"flex"}},[t("el-select",{staticStyle:{"margin-right":"10px"},attrs:{multiple:"",size:"small",filterable:"",clearable:"",placeholder:"请选择部门"},on:{change:n.deptChange},model:{value:n.deptIds,callback:function(e){n.deptIds=e},expression:"deptIds"}},n._l(n.deptList,function(n){return t("el-option",{key:n.deptId,attrs:{label:n.deptName,value:n.deptId}})}),1),n._v(" "),t("el-input",{attrs:{size:"small",placeholder:"请输入用户名称"},on:{change:n.userChange},model:{value:n.userName,callback:function(e){n.userName=e},expression:"userName"}})],1),n._v(" "),t("el-checkbox-group",{on:{change:n.handleCheckedUserChange},model:{value:n.checkList,callback:function(e){n.checkList=e},expression:"checkList"}},n._l(n.userList,function(e){return t("el-checkbox",{key:e.userId,attrs:{label:e.userId,checked:e.checked},on:{change:function(t){return n.changeCheckUser(e)}}},[n._v("\n            "+n._s(e.userName)+"\n          ")])}),1)],1),n._v(" "),n.total-n.userList.length>0?t("div",{staticClass:"getMore",on:{click:n.getMore}},[n._v("加载更多")]):t("div",{staticClass:"getMore"},[n._v("没有更多")]),n._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{size:"small"},on:{click:n.cancelCheck}},[n._v("取 消")]),n._v(" "),t("el-button",{attrs:{size:"small",type:"primary"},on:{click:n.chooseUserOk}},[n._v("确 定")])],1)])],1)},staticRenderFns:[]};var A=t("VU/8")(d,l,!1,function(n){t("T+wD")},"data-v-24965de4",null);e.default=A.exports},"T+wD":function(n,e,t){var o=t("e84T");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);t("rjj0")("5f206d80",o,!0)},e84T:function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*// 修改列表页面表格样式*/\n[data-v-24965de4] .el-table {\n  border: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-24965de4] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-24965de4] .el-table--border th,[data-v-24965de4] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-24965de4] .el-table__row:nth-child(even) {\n  background: rgb(235, 248, 255) !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666666666666666);\n}\n[data-v-24965de4] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-24965de4] .el-table--border td:first-child {\n  border-right: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-24965de4] .el-table--border td:last-child {\n  border-left: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-24965de4] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 115px;\n}\n[data-v-24965de4] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  /*line-height: normal;*/\n}\n[data-v-24965de4] .el-form-item__label {\n  min-width: 77px;\n}\n.btnList[data-v-24965de4] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n[data-v-24965de4] .el-card__header {\n  color: #008DD6;\n}\n[data-v-24965de4] input::-webkit-outer-spin-button,[data-v-24965de4] input::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0;\n}\n.userCont[data-v-24965de4] {\n  border: 1px solid #DCDFE6;\n  border-radius: 4px;\n  padding: 10px 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 90px;\n}\n.userList[data-v-24965de4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  width: 100%;\n}\n.userBox[data-v-24965de4] {\n  background: rgba(253, 144, 60, 1);\n  padding: 7px 9px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 2px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  width: 22.5%;\n}\n.userBox span[data-v-24965de4] {\n  font-size: 12px;\n  color: #fff;\n  line-height: normal;\n  margin-right: 5px;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n  overflow: hidden;\n}\n.userBox i[data-v-24965de4] {\n  color: #fff;\n  font-size: 12px;\n  cursor: pointer;\n}\n.userAddBtn[data-v-24965de4] {\n  background: rgba(5, 170, 255, 1);\n  border-radius: 2px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #fff;\n  padding: 0 13px;\n  cursor: pointer;\n  height: 30px;\n}\n.operDtosTree[data-v-24965de4] {\n  border: 1px solid #DCDFE6;\n  border-radius: 4px;\n  padding: 10px 10px;\n}\n[data-v-24965de4] .pagination-container {\n  margin-top: 50px;\n  margin-bottom: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n[data-v-24965de4] .el-pagination__total {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1\n}\n.totalText[data-v-24965de4] {\n  font-size: 14px;\n  font-family: 'PingFang SC';\n  font-weight: 400;\n  line-height: 20px;\n  color: rgba(68, 68, 68, 1);\n}\n.totalText span[data-v-24965de4] {\n  margin-right: 20px;\n}\n[data-v-24965de4] .el-pagination.is-background .btn-next,[data-v-24965de4] .el-pagination.is-background .btn-prev,[data-v-24965de4] .el-pagination.is-background .el-pager li {\n  background: none;\n  border: #D5D5D5 1px solid;\n  color: #8B8B8B;\n  font-size: 12px;\n  font-weight: normal;\n}\n[data-v-24965de4] .el-pagination.is-background .el-pager li.active {\n  background: #05AAFF;\n  color: #fff;\n  border: #05AAFF 1px solid;\n}\n[data-v-24965de4] .el-card.is-always-shadow,[data-v-24965de4] .el-card.is-hover-shadow:focus,[data-v-24965de4] .el-card.is-hover-shadow:hover {\n  -webkit-box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n          box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n}\n[data-v-24965de4] .el-table .sort-caret.ascending {\n  border-bottom-color: #fff;\n}\n[data-v-24965de4] .el-table .ascending .sort-caret.ascending {\n  border-bottom-color: #409EFF !important;\n}\n[data-v-24965de4] .el-table .descending .sort-caret.descending {\n  border-top-color: #409EFF !important;\n}\n[data-v-24965de4] .el-table .sort-caret.descending {\n  border-top-color: #fff;\n}\n[data-v-24965de4] .el-table .cell {\n  /*text-align: left;*/\n}\n[data-v-24965de4] .el-table .el-table__expand-icon {\n  display: none;\n}\n.el-checkbox[data-v-24965de4] {\n  /*margin-bottom: 15px;*/\n}\n.getMore[data-v-24965de4] {\n  text-align: center;\n  padding: 10px 0;\n  cursor: pointer;\n}\n.userCheckbox[data-v-24965de4]{\n  max-height: 400px;\n  overflow: auto;\n}\n[data-v-24965de4] .el-dialog__body{\n  padding:0px 20px;\n}\n.dialogChoose[data-v-24965de4]{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 15px;\n}\n","",{version:3,sources:["H:/java/chengguoyun-web/src/views/backend/rolesManage/addRole.vue"],names:[],mappings:";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA6sBA,iBAAiB;AACjB;EACE,gDAAgD;CACjD;AACD;EACE,+BAA+B;CAChC;AACD;EACE,+BAA+B;EAC/B,YAAY;EACZ,iBAAiB;EACjB,kDAAkD;EAClD,eAAe;CAChB;AACD;EACE,0CAA0C;EAC1C,yDAAyD;CAC1D;AACD;EACE,aAAa;EACb,+BAA+B;UACvB,uBAAuB;CAChC;AACD;EACE,sDAAsD;CACvD;AACD;EACE,qDAAqD;CACtD;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,oBAAoB;CACrB;AACD;EACE,oBAAoB;MAChB,YAAY;UACR,QAAQ;EAChB,YAAY;EACZ,wBAAwB;CACzB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,iBAAiB;EACjB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;EAChC,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,oCAAoC;EACpC,UAAU;CACX;AACD;EACE,0BAA0B;EAC1B,mBAAmB;EACnB,mBAAmB;EACnB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,iBAAiB;CAClB;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,oBAAoB;MAChB,gBAAgB;EACpB,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;EAChC,YAAY;CACb;AACD;EACE,kCAAkC;EAClC,iBAAiB;EACjB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,+BAA+B;EACvC,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB;EACpB,aAAa;CACd;AACD;EACE,gBAAgB;EAChB,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,sBAAsB;EACtB,iBAAiB;CAClB;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,gBAAgB;CACjB;AACD;EACE,iCAAiC;EACjC,mBAAmB;EACnB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,YAAY;EACZ,gBAAgB;EAChB,gBAAgB;EAChB,aAAa;CACd;AACD;EACE,0BAA0B;EAC1B,mBAAmB;EACnB,mBAAmB;CACpB;AACD;EACE,iBAAiB;EACjB,oBAAoB;EACpB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,+BAA+B;CACxC;AACD;EACE,oBAAoB;MAChB,YAAY;UACR,OAAO;CAChB;AACD;EACE,gBAAgB;EAChB,2BAA2B;EAC3B,iBAAiB;EACjB,kBAAkB;EAClB,2BAA2B;CAC5B;AACD;EACE,mBAAmB;CACpB;AACD;EACE,iBAAiB;EACjB,0BAA0B;EAC1B,eAAe;EACf,gBAAgB;EAChB,oBAAoB;CACrB;AACD;EACE,oBAAoB;EACpB,YAAY;EACZ,0BAA0B;CAC3B;AACD;EACE,iEAAiE;UACzD,yDAAyD;CAClE;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,wCAAwC;CACzC;AACD;EACE,qCAAqC;CACtC;AACD;EACE,uBAAuB;CACxB;AACD;EACE,qBAAqB;CACtB;AACD;EACE,cAAc;CACf;AACD;EACE,wBAAwB;CACzB;AACD;EACE,mBAAmB;EACnB,gBAAgB;EAChB,gBAAgB;CACjB;AACD;EACE,kBAAkB;EAClB,eAAe;CAChB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,oBAAoB;CACrB",file:"addRole.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/*// 修改列表页面表格样式*/\n[data-v-24965de4] .el-table {\n  border: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-24965de4] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-24965de4] .el-table--border th,[data-v-24965de4] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-24965de4] .el-table__row:nth-child(even) {\n  background: rgb(235, 248, 255) !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666666666666666);\n}\n[data-v-24965de4] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-24965de4] .el-table--border td:first-child {\n  border-right: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-24965de4] .el-table--border td:last-child {\n  border-left: rgb(217, 242, 255) 1px solid !important;\n}\n[data-v-24965de4] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 115px;\n}\n[data-v-24965de4] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  /*line-height: normal;*/\n}\n[data-v-24965de4] .el-form-item__label {\n  min-width: 77px;\n}\n.btnList[data-v-24965de4] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n[data-v-24965de4] .el-card__header {\n  color: #008DD6;\n}\n[data-v-24965de4] input::-webkit-outer-spin-button,[data-v-24965de4] input::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0;\n}\n.userCont[data-v-24965de4] {\n  border: 1px solid #DCDFE6;\n  border-radius: 4px;\n  padding: 10px 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  min-height: 90px;\n}\n.userList[data-v-24965de4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  width: 100%;\n}\n.userBox[data-v-24965de4] {\n  background: rgba(253, 144, 60, 1);\n  padding: 7px 9px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 2px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  width: 22.5%;\n}\n.userBox span[data-v-24965de4] {\n  font-size: 12px;\n  color: #fff;\n  line-height: normal;\n  margin-right: 5px;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n  overflow: hidden;\n}\n.userBox i[data-v-24965de4] {\n  color: #fff;\n  font-size: 12px;\n  cursor: pointer;\n}\n.userAddBtn[data-v-24965de4] {\n  background: rgba(5, 170, 255, 1);\n  border-radius: 2px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #fff;\n  padding: 0 13px;\n  cursor: pointer;\n  height: 30px;\n}\n.operDtosTree[data-v-24965de4] {\n  border: 1px solid #DCDFE6;\n  border-radius: 4px;\n  padding: 10px 10px;\n}\n[data-v-24965de4] .pagination-container {\n  margin-top: 50px;\n  margin-bottom: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n[data-v-24965de4] .el-pagination__total {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1\n}\n.totalText[data-v-24965de4] {\n  font-size: 14px;\n  font-family: 'PingFang SC';\n  font-weight: 400;\n  line-height: 20px;\n  color: rgba(68, 68, 68, 1);\n}\n.totalText span[data-v-24965de4] {\n  margin-right: 20px;\n}\n[data-v-24965de4] .el-pagination.is-background .btn-next,[data-v-24965de4] .el-pagination.is-background .btn-prev,[data-v-24965de4] .el-pagination.is-background .el-pager li {\n  background: none;\n  border: #D5D5D5 1px solid;\n  color: #8B8B8B;\n  font-size: 12px;\n  font-weight: normal;\n}\n[data-v-24965de4] .el-pagination.is-background .el-pager li.active {\n  background: #05AAFF;\n  color: #fff;\n  border: #05AAFF 1px solid;\n}\n[data-v-24965de4] .el-card.is-always-shadow,[data-v-24965de4] .el-card.is-hover-shadow:focus,[data-v-24965de4] .el-card.is-hover-shadow:hover {\n  -webkit-box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n          box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n}\n[data-v-24965de4] .el-table .sort-caret.ascending {\n  border-bottom-color: #fff;\n}\n[data-v-24965de4] .el-table .ascending .sort-caret.ascending {\n  border-bottom-color: #409EFF !important;\n}\n[data-v-24965de4] .el-table .descending .sort-caret.descending {\n  border-top-color: #409EFF !important;\n}\n[data-v-24965de4] .el-table .sort-caret.descending {\n  border-top-color: #fff;\n}\n[data-v-24965de4] .el-table .cell {\n  /*text-align: left;*/\n}\n[data-v-24965de4] .el-table .el-table__expand-icon {\n  display: none;\n}\n.el-checkbox[data-v-24965de4] {\n  /*margin-bottom: 15px;*/\n}\n.getMore[data-v-24965de4] {\n  text-align: center;\n  padding: 10px 0;\n  cursor: pointer;\n}\n.userCheckbox[data-v-24965de4]{\n  max-height: 400px;\n  overflow: auto;\n}\n[data-v-24965de4] .el-dialog__body{\n  padding:0px 20px;\n}\n.dialogChoose[data-v-24965de4]{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 15px;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=31.192305d9673b435fbd76.js.map