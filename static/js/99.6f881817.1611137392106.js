webpackJsonp([99],{Keg9:function(e,t,i){var n=i("SxL1");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i("rjj0")("607bbbd2",n,!0)},SxL1:function(e,t,i){(e.exports=i("FZ+f")(!1)).push([e.i,"\n.download-btn[data-v-0a9e0f66] {\n  border: none;\n  background: none;\n}\n\n",""])},jVWq:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("cAgV"),a=i("mtWM"),l=i.n(a),r={name:"complexTable",directives:{waves:n.a},data:function(){return{count:1,tableKey:0,host:"https://chengguoyun.cn",upload_url:"/core/upload-files-api/",uploadData:{save_path:"project_material/"},limit:1,fileList:[],CollectList:[],total:null,listLoading:!1,num:1,project_name:"",material_type_list:[]}},filters:{},created:function(){},mounted:function(){this.$route.query.id&&(this.id=this.$route.query.id),this.getList()},methods:{getList:function(){},handlePreview:function(e){},handleRemove:function(e,t){this.ruleForm.official_file=null},removeFile:function(e){e.material_file_name=null,e.material_url=null},preview_one:function(e){this.a_downfile(this.host+e.material_url,e.material_file_name)},a_downfile:function(e,t){window.open(e,"_blank")},mydownfile:function(e,t){var i;(i=e,l()({url:i,method:"get",responseType:"blob"})).then(function(e){if(!e)return!1;var i=window.URL.createObjectURL(e.data),n=document.createElement("a");n.style.display="none",n.href=i,n.setAttribute("download",t),document.body.appendChild(n),n.click(),setTimeout(function(){n.parentNode.removeChild(n)},200)})},onUploadChange:function(e,t){var i=t;e.response&&(i.material_url=e.response.url,i.material_file_name=e.response.original)},handleFilter:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},AddMainItem:function(){var e={material_name:"",edit:!0,children:[],is_parent:!0,is_main:!0,idx:this.CollectList.length+1};this.setNum(e),this.CollectList.push(e)},ParentAddItem:function(e){var t={material_name:"",edit:!0,is_main:!1,material_need:"",remarks:"",file_mould:null};this.setNum(t),e.children.push(t)},goDel:function(e){var t=this.CollectList;for(var i in t){if(t[i].num===e){t.splice(i,1);break}if(t[i].children)for(var n in t[i].children)if(t[i].children[n].num===e)return void t[i].children.splice(n,1)}},submitForm:function(){if(this.checkList())this.CollectList;else this.$message.error("主项必须添加子项")},checkList:function(){for(var e in this.CollectList)if(this.CollectList[e].is_main&&0===this.CollectList[e].children.length)return!1;return!0},setNum:function(e){e.num=this.num,this.num+=1},initList:function(e){for(var t in e)if(e[t].edit=!1,this.setNum(e[t]),e[t].children)for(var i in e[t].children)e[t].children[i].edit=!1,this.setNum(e[t].children[i]);return e},goback:function(){this.$router.go(-1)},getArea:function(e){this.listQuery.areaId=e},goEdit:function(e){e.edit=!0},goSure:function(e){e.edit=!1},changeType:function(){var e=this.CollectList;for(var t in e)if(e[t].is_main)for(var i in e[t].children)e[t].children[i].material_type="";else e[t].material_type=""}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-row",{attrs:{gutter:10}},[i("el-col",{attrs:{span:10}},[i("el-input",{staticClass:"filter-item",attrs:{placeholder:"项目名称",readonly:""},model:{value:e.project_name,callback:function(t){e.project_name=t},expression:"project_name"}})],1),e._v(" "),i("el-col",{attrs:{span:3}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"100px"},attrs:{type:"success",icon:"el-icon-edit"},on:{click:e.AddMainItem}},[e._v("创建")])],1)],1)],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,ref:"collect_table",staticStyle:{width:"100%"},attrs:{data:e.CollectList,border:"",fit:"","row-key":"num","tree-props":{children:"children"},"default-expand-all":!0}},[i("el-table-column",{attrs:{align:"center",width:"65",label:"次序",type:"selection"},scopedSlots:e._u([{key:"default",fn:function(t){return t.row.is_parent?[t.row.edit?e._e():i("span",[e._v(e._s(t.row.idx))])]:void 0}}],null,!0)}),e._v(" "),i("el-table-column",{attrs:{"min-width":"120px","header-align":"center",label:"材料类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.edit?[t.row.edit&&t.row.is_main?i("el-select",{staticClass:"filter-item",attrs:{width:"80%",clearable:"",placeholder:"事件类型"},model:{value:t.row.material_type,callback:function(i){e.$set(t.row,"material_type",i)},expression:"scope.row.material_type"}},e._l(e.material_type_list,function(e){return i("el-option",{key:e.dict_value,attrs:{value:e.dict_value,label:e.dict_value}})}),1):e._e()]:i("span",[i("span",[e._v(e._s(t.row.material_type))]),e._v(" "),t.row.children?i("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-plus"},on:{click:function(i){return e.ParentAddItem(t.row)}}}):e._e()],1)]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"材料名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.is_main?e._e():[t.row.edit?i("el-input",{staticClass:"edit-input",staticStyle:{"margin-left":"10px",width:"90%"},attrs:{size:"small"},model:{value:t.row.material_name,callback:function(i){e.$set(t.row,"material_name",i)},expression:"scope.row.material_name"}}):i("span",[e._v(e._s(t.row.material_name))])]]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"资料所需要求"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.is_main?e._e():[t.row.edit?i("el-input",{staticClass:"edit-input",staticStyle:{"margin-left":"10px",width:"90%"},attrs:{size:"small"},model:{value:t.row.material_need,callback:function(i){e.$set(t.row,"material_need",i)},expression:"scope.row.material_need"}}):i("span",[e._v(e._s(t.row.material_need))])]]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"材料模板文件"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.is_main?e._e():[!t.row.material_url||t.row.edit?i("div",[i("el-upload",{staticClass:"upload-box upload-box-width",attrs:{action:e.host+e.upload_url,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"file-list":e.fileList,"on-change":function(i){return e.onUploadChange(i,t.row)},"show-file-list":!0,data:e.uploadData,limit:e.limit}},[i("i",{staticClass:"el-icon-upload"}),e._v(" "),i("span",{staticStyle:{margin:"10px",color:"gray",cursor:"default",display:"inline-block"}},[e._v(e._s(t.row.material_url?"已上传":"未上传")+"\n\n              ")])]),e._v(" "),t.row.material_url?i("i",{staticClass:"el-icon-error",on:{click:function(i){return e.removeFile(t.row)}}}):e._e()],1):i("el-popover",{attrs:{placement:"top-start",width:"200",trigger:"hover",content:t.row.material_file_name}},[i("el-button",{staticClass:"download-btn",attrs:{slot:"reference"},on:{click:function(i){return e.preview_one(t.row)}},slot:"reference"},[e._v(e._s(t.row.material_url?"下载":"未上传"))])],1)]]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.edit&!t.row.children?[i("el-input",{staticClass:"edit-input",staticStyle:{"margin-left":"10px",width:"90%"},attrs:{size:"small"},model:{value:t.row.remarks,callback:function(i){e.$set(t.row,"remarks",i)},expression:"scope.row.remarks"}})]:i("span",[e._v(e._s(t.row.remarks))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:"230px","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.edit?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){return e.goSure(t.row)}}},[e._v("确定")]):i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){return e.goEdit(t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){return e.goDel(t.row.num)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("div",{staticStyle:{"text-align":"right","margin-top":"50px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("保存")]),e._v(" "),i("el-button",{on:{click:e.goback}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var s=i("VU/8")(r,o,!1,function(e){i("Keg9")},"data-v-0a9e0f66",null);t.default=s.exports}});