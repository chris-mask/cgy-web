webpackJsonp([41],{DfpI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),o=a.n(n),r=a("i3ot"),s={name:"index",data:function(){return{page:1,pageSize:10,parentId:0,roleName:"",total:0,rolesList:[],listLoading:!1,sortType:"",sortFieldName:"",allowGetList:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:LIST"),allowAdd:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:INSTER"),allowAddSon:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:INSTER","SYSTEM:ROLE:INSERTSON"),allowUpdate:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:EDIT"),allowDelete:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:DELETE"),allowUpDown:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:UPORDOWN"),allowDetail:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:ROLE:MANAGE","SYSTEM:ROLE:DETAILS")}},activated:function(){this.getRoles()},methods:{getRoles:function(){var e=this,t={page:this.page,pageSize:this.pageSize,parentId:this.parentId,roleName:this.roleName,companyId:this.$store.getters.companyId};Object(r.e)(t).then(function(t){200==t.code?(e.rolesList=t.data.data,e.rolesList.forEach(function(e){e.fatherId=e.parentId}),e.total=Number(t.data.total)):e.$message({type:"error",message:t.message})})},goSearch:function(){this.page=1,this.pageSize=10,this.getRoles()},addChildren:function(e){var t=this;this.parentId=e.roleId;var a={page:this.page,pageSize:this.pageSize,parentId:this.parentId,roleName:this.roleName};Object(r.e)(a).then(function(a){200==a.code?(0===a.data.data.length?t.$message.warning("当前角色没有子角色，请先进行添加"):(e.children=a.data.data,e.children.forEach(function(e){e.fatherId=e.parentId})),t.rolesList=JSON.parse(o()(t.rolesList)),t.parentId=0):t.$message({type:"error",message:a.message})})},deleteChildren:function(e){delete e.children,this.rolesList=JSON.parse(o()(this.rolesList))},goAddRoles:function(){this.$router.push({path:"/backend/addRole"})},goAddSonRoles:function(e,t){this.$router.push({path:"/backend/addSonRole",query:{parentId:e,parentIds:t}})},goEditRole:function(e){this.$router.push({path:"/backend/editRole",query:{roleId:e.roleId,parentId:e.fatherId,parentIds:e.parentIds}})},deleteRoleBox:function(e){var t=this,a={roleId:e,companyId:this.$store.getters.companyId};Object(r.b)(a).then(function(e){200==e.code?(t.$message({type:"success",message:"删除成功"}),t.parentId=0,t.getRoles()):t.$message({type:"error",message:e.message})})},dataUpDown:function(e,t){var a=this,n={operationType:t,parentId:e.fatherId,roleId:e.roleId};Object(r.f)(n).then(function(e){200==e.code?(a.$message({type:"success",message:e.message}),a.getRoles()):a.$message({type:"error",message:e.message})})},handleSortChange:function(e){this.sortFieldName=e.prop,"ascending"===e.order?this.sortType="ASC":"descending"===e.order?this.sortType="DESC":(this.sortType="",this.sortFieldName=""),this.getRoles()},handleSizeChange:function(e){this.pageSize=e,this.getRoles()},handleCurrentChange:function(e){this.page=e,this.getRoles()}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-card",{staticClass:"box-card box-margin"},[a("div",{staticClass:"clearfix headerTop",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"headerLeft"},[a("el-input",{staticClass:"searchInput",attrs:{size:"small",placeholder:"角色名称",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goSearch(t)}},model:{value:e.roleName,callback:function(t){e.roleName=t},expression:"roleName"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.goSearch}},[e._v("搜索")])],1),e._v(" "),a("div",{staticClass:"headerRig"},[e.allowAdd.twoAllow?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.goAddRoles}},[e._v("新建角色")]):e._e()],1)]),e._v(" "),a("div",{staticClass:"materielTable"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.rolesList,border:"",fit:"","highlight-current-row":"","row-key":"roleId","default-expand-all":"","tree-props":{children:"children"}},on:{"sort-change":e.handleSortChange}},[a("el-table-column",{attrs:{label:"序号",align:"center",type:"index",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"角色名称",sortable:"custom",prop:"roleName"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.permission?a("span",[e._v(e._s(t.row.roleName))]):a("span",{staticClass:"projectName"},[t.row.children?a("span",{staticClass:"showOrHiden",on:{click:function(a){return e.deleteChildren(t.row)}}},[e._v("-")]):a("span",{staticClass:"showOrHiden",on:{click:function(a){return e.addChildren(t.row)}}},[e._v("+")]),e._v(" "),a("span",[e._v(e._s(t.row.roleName))])])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"数据权限",sortable:"custom",prop:"dataPermissions"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v("\n              "+e._s(0==t.row.dataPermissions?"全部数据权限":-1==t.row.dataPermissions?"本部门及所有子部门数据权限":-2==t.row.dataPermissions?"本部门数据权限":-3==t.row.dataPermissions?"表示自己的数据权限":-4==t.row.dataPermissions?"自定义":-5==t.row.dataPermissions?"未知":"无")+"\n            ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"备注",sortable:"custom",prop:"roleDesc"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{innerHTML:e._s(t.row.roleDesc)}},[e._v(e._s(t.row.roleDesc))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"350px","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[(t.row.parentId=e.allowAddSon.threeAllow)?a("span",{staticClass:"spanButton col_skyblue",on:{click:function(a){return e.goAddSonRoles(t.row.roleId,t.row.parentIds)}}},[e._v("添加子角色")]):e._e(),e._v(" "),(t.row.parentId=e.allowAddSon.threeAllow)?a("span",{staticClass:"shu"},[e._v("|")]):e._e(),e._v(" "),e.allowUpdate.twoAllow?a("span",{staticClass:"spanButton col_skyblue",on:{click:function(a){return e.goEditRole(t.row)}}},[e._v("编辑")]):e._e(),e._v(" "),e.allowUpdate.twoAllow?a("span",{staticClass:"shu"},[e._v("|")]):e._e(),e._v(" "),e.allowDelete.twoAllow?a("el-popconfirm",{attrs:{confirmButtonText:"好的",cancelButtonText:"取消",icon:"el-icon-info",iconColor:"red",title:"是否确定删除？"},on:{onConfirm:function(a){return e.deleteRoleBox(t.row.roleId)}}},[a("span",{staticClass:"spanButton col_red",attrs:{slot:"reference"},slot:"reference"},[e._v("删除")])]):e._e(),e._v(" "),e.allowDelete.twoAllow?a("span",{staticClass:"shu"},[e._v("|")]):e._e(),e._v(" "),e.allowUpDown.twoAllow?a("span",{staticClass:"spanButton colUpDown",on:{click:function(a){return e.dataUpDown(t.row,1)}}},[e._v("上升")]):e._e(),e._v(" "),a("span",{staticClass:"shu"},[e._v("|")]),e._v(" "),e.allowUpDown.twoAllow?a("span",{staticClass:"spanButton colUpDown",on:{click:function(a){return e.dataUpDown(t.row,2)}}},[e._v("下降")]):e._e()]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("div",{staticClass:"totalText"},[a("span",[e._v("总数："+e._s(e.total))]),e._v(" "),a("span",[e._v("总页数:"+e._s(Math.ceil(e.total/e.pageSize)||Math.ceil(e.total/10)))]),e._v(" "),a("span",[e._v("当前页："+e._s(e.page||1))])]),e._v(" "),a("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[10,20,30,50],"page-size":e.pageSize,layout:"prev, pager, next, sizes, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])],1)},staticRenderFns:[]};var i=a("VU/8")(s,l,!1,function(e){a("NnTi")},"data-v-17327b70",null);t.default=i.exports},NnTi:function(e,t,a){var n=a("fzbJ");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("34c48cd9",n,!0)},fzbJ:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n[data-v-17327b70] .clearfix:after {\n  display: none;\n}\n[data-v-17327b70] .el-input {\n  width: auto;\n}\n.headerTop[data-v-17327b70] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.headerLeft .searchInput[data-v-17327b70] {\n  margin-right: 10px;\n}\n.headerRig .choose[data-v-17327b70] {\n  margin-right: 22px;\n}\n[data-v-17327b70] .el-table {\n  border: #d9f2ff 1px solid !important;\n}\n[data-v-17327b70] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-17327b70] .el-table--border th,[data-v-17327b70] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-17327b70] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-17327b70] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-17327b70] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-17327b70] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n.spanButton[data-v-17327b70] {\n  color: #05AAFF;\n}\n.shu[data-v-17327b70] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.col_red[data-v-17327b70] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-17327b70]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-17327b70] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-17327b70]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-17327b70] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-17327b70]:hover {\n  opacity: 0.5;\n}\n[data-v-17327b70] .pagination-container {\n  margin-top: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n[data-v-17327b70] .el-pagination__total {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.totalText[data-v-17327b70] {\n  font-size: 14px;\n  font-family: 'PingFang SC';\n  font-weight: 400;\n  line-height: 20px;\n  color: #444444;\n}\n.totalText span[data-v-17327b70] {\n  margin-right: 20px;\n}\n[data-v-17327b70] .el-pagination.is-background .btn-next,[data-v-17327b70] .el-pagination.is-background .btn-prev,[data-v-17327b70] .el-pagination.is-background .el-pager li {\n  background: none;\n  border: #D5D5D5 1px solid;\n  color: #8B8B8B;\n  font-size: 12px;\n  font-weight: normal;\n}\n[data-v-17327b70] .el-pagination.is-background .el-pager li.active {\n  background: #05AAFF;\n  color: #fff;\n  border: #05AAFF 1px solid;\n}\n[data-v-17327b70] .el-card.is-always-shadow,[data-v-17327b70] .el-card.is-hover-shadow:focus,[data-v-17327b70] .el-card.is-hover-shadow:hover {\n  -webkit-box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n          box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;\n}\n[data-v-17327b70] .el-table .sort-caret.ascending {\n  border-bottom-color: #fff;\n}\n[data-v-17327b70] .el-table .ascending .sort-caret.ascending {\n  border-bottom-color: #409EFF !important;\n}\n[data-v-17327b70] .el-table .descending .sort-caret.descending {\n  border-top-color: #409EFF !important;\n}\n[data-v-17327b70] .el-table .sort-caret.descending {\n  border-top-color: #fff;\n}\n[data-v-17327b70] .el-table .cell {\n  /*text-align: left;*/\n}\n[data-v-17327b70] .el-table .el-table__expand-icon {\n  display: none;\n}\n.projectName[data-v-17327b70] {\n  cursor: pointer;\n}\n.projectName .showOrHiden[data-v-17327b70] {\n  display: inline-block;\n  color: #333;\n  margin-right: 10px;\n}\n.productName[data-v-17327b70] {\n  padding-left: 24px;\n  color: #333;\n}\n.productName[data-v-17327b70]:hover {\n  opacity: 0.5;\n  cursor: pointer;\n  /*text-decoration: underline;*/\n}\n",""])}});