webpackJsonp([16],{"6yUY":function(e,o,t){var n=t("m2HU");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);t("rjj0")("5749be43",n,!0)},MOZa:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=t("mvHQ"),a=t.n(n),l=t("MdFA"),r=t("c8+v"),i=t("5ybE"),s=t("Q5rI"),c=t("i3ot"),d={components:{EditorText:t("3/OM").a},data:function(){return{processForm:{appNodeDtoList:[{nodeName:"开始",firstTrial:0,recheck:0,opinion:0,accessory:0,nodeDesc:""},{nodeName:"结束",firstTrial:0,recheck:0,opinion:0,accessory:0,nodeDesc:""}]},maxlength:200,appNodeNum:0,nodeList:[],flowForm:{},rules:{flowName:[{required:!0,message:"请输入流程名称",trigger:"blur"}],timeLimit:[{required:!0,message:"请输入时限",trigger:"blur"}],appNodeDtoList:[{required:!0,message:"请添加环节",trigger:"blur"}]},nodeRules:{nodeName:[{required:!0,message:"请输入流程节点名称",trigger:"blur"}]},tableData:[],dialogVisible:!1,checkList:[],editor1:"editor1",flowId:"",detail:"",handlerTypeList:[{label:"当前工程师",value:0},{label:"手动指定用户",value:1},{label:"指定用户",value:2},{label:"指定部门",value:3},{label:"指定角色",value:4},{label:"开始创建人",value:5}],goToTypeList:[{label:"不跳转",value:0},{label:"正常通过跳转",value:1},{label:"审批不通过跳转",value:2},{label:"条件跳转",value:3}],departmentListQuery:{page:1,pageSize:100},departmentList:[],rolesList:[],processNameList:[],allowAdd:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:FLOW:MANAGE","SYSTEM:FLOW:INSERT"),allowUpdate:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:FLOW:MANAGE","SYSTEM:FLOW:UPDATE"),allowDetail:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:FLOW:MANAGE","SYSTEM:FLOW:DETAILS"),allowUploadOrder:this.authorityControl("SYSTEM:BACKGROUND:MANAGE","SYSTEM:FLOW:MANAGE","SYSTEM:FLOW:UPDATEFLOWANDUPDATEORDER")}},activated:function(){this.processForm={appNodeDtoList:[{nodeName:"开始",firstTrial:0,recheck:0,opinion:0,accessory:0,nodeDesc:""},{nodeName:"结束",firstTrial:0,recheck:0,opinion:0,accessory:0,nodeDesc:""}]},this.detail=this.$route.query.detail,this.$route.query.flowId?(this.flowId=this.$route.query.flowId,this.getDetail()):(this.$refs.editor.initCKEditor(),this.appNodeNum=this.processForm.appNodeDtoList.length),this.getPersonList(""),this.getDepartmentList(),this.getCommonData(),this.getRoles()},methods:{changeValue:function(e){this.processForm.flowDesc=e},getDetail:function(){var e=this;if(this.allowDetail.twoAllow){var o={page:0,pageSize:10,flowId:this.flowId};Object(l.f)(o).then(function(o){200==o.code?(e.processForm=o.data,""!=o.data?(e.processForm.appNodeDtoList=o.data.nodeVoList,e.appNodeNum=e.processForm.appNodeDtoList.length):e.closeCurrent(e.$store.state.tagsView.visitedViews,e.$route,"/backend/process"),e.detail||e.$refs.editor.initCKEditor()):e.$message.warning(o.message)})}else this.$message.warning("抱歉，您没有权限获取此详情")},addProcess:function(e){var o=this;this.processForm.appNodeDtoList.forEach(function(e,o){e.sortNum=o+1,void 0!=e.goToType&&""!=e.goToType||(e.goToType=0),void 0!=e.handlerType&&""!=e.handlerType||(e.handlerType=0),void 0!=e.recheck&&""!=e.recheck||(e.recheck=0),1==e.firstTrial?e.firstTrial=1:(e.firstTrial=0,e.recheck=0),1==e.opinion?e.opinion=1:e.opinion=0,1==e.accessory?e.accessory=1:e.accessory=0}),this.$refs[e].validate(function(e){e&&Object(l.h)(o.processForm).then(function(e){200==e.code?(o.$message.success("新建成功"),o.$refs.editor.destroyEditor(),o.closeCurrent(o.$store.state.tagsView.visitedViews,o.$route,"/backend/process")):o.$message.warning(e.message)})})},editFlow:function(e){var o=this;this.processForm.appNodeDtoList.forEach(function(e,o){e.sortNum=o+1,void 0!=e.goToType&&""!=e.goToType||(e.goToType=0),void 0!=e.handlerType&&""!=e.handlerType||(e.handlerType=0),void 0!=e.recheck&&""!=e.recheck||(e.recheck=0),1==e.firstTrial?e.firstTrial=1:(e.firstTrial=0,e.recheck=0),1==e.opinion?e.opinion=1:e.opinion=0,1==e.accessory?e.accessory=1:e.accessory=0}),this.allowUpdate.twoAllow?Object(l.c)(this.processForm).then(function(e){200==e.code?(o.$message.success("修改成功"),o.$refs.editor.destroyEditor(),o.closeCurrent(o.$store.state.tagsView.visitedViews,o.$route,"/backend/process")):o.$message.warning(e.message)}):this.$message.warning("抱歉，您没有此权限")},addProcessBox:function(e){var o=this;this.$refs[e].validate(function(e){if(e){if(2==o.flowForm.handlerType&&(""==o.flowForm.handlerId||void 0==o.flowForm.handlerId))return void o.$message.warning("请选择指定用户");if(3==o.flowForm.handlerType&&(""==o.flowForm.handlerId||void 0==o.flowForm.handlerId))return void o.$message.warning("请选择指定部门");if(4==o.flowForm.handlerType&&(""==o.flowForm.handlerId||void 0==o.flowForm.handlerId))return void o.$message.warning("请选择指定角色");void 0!=o.flowForm.goToType&&""!=o.flowForm.goToType||(o.flowForm.goToType=0),void 0!=o.flowForm.recheck&&""!=o.flowForm.recheck||(o.flowForm.recheck=0),1==o.flowForm.firstTrial?o.flowForm.firstTrial=1:(o.flowForm.firstTrial=0,o.flowForm.recheck=0),1==o.flowForm.opinion?o.flowForm.opinion=1:o.flowForm.opinion=0,1==o.flowForm.accessory?o.flowForm.accessory=1:o.flowForm.accessory=0;var t=o.flowForm,n=JSON.parse(a()(o.processForm.appNodeDtoList));n.splice(o.appNodeNum-1,0,t),o.processForm.appNodeDtoList=JSON.parse(a()(n)),o.processForm.appNodeDtoList.forEach(function(e,o){e.sortNum=o+1}),o.appNodeNum=o.processForm.appNodeDtoList.length,o.dialogVisible=!1,o.flowForm={firstTrial:!1,opinion:!1,accessory:!1}}})},editProcessBox:function(e){var o=this;this.$refs[e].validate(function(e){if(e){if(2==o.flowForm.handlerType&&(""==o.flowForm.handlerId||void 0==o.flowForm.handlerId))return void o.$message.warning("请选择指定用户");if(3==o.flowForm.handlerType&&(""==o.flowForm.handlerId||void 0==o.flowForm.handlerId))return void o.$message.warning("请选择指定部门");if(4==o.flowForm.handlerType&&(""==o.flowForm.handlerId||void 0==o.flowForm.handlerId))return void o.$message.warning("请选择指定角色");void 0!=o.flowForm.goToType&&""!=o.flowForm.goToType||(o.flowForm.goToType=0),void 0!=o.flowForm.recheck&&""!=o.flowForm.recheck||(o.flowForm.recheck=0),1==o.flowForm.firstTrial?o.flowForm.firstTrial=1:(o.flowForm.firstTrial=0,o.flowForm.recheck=0),1==o.flowForm.opinion?o.flowForm.opinion=1:o.flowForm.opinion=0,1==o.flowForm.accessory?o.flowForm.accessory=1:o.flowForm.accessory=0;var t=o.flowForm,n=o.processForm.appNodeDtoList.map(function(e,o){return o==t.index&&delete(e=t).index,e});o.processForm.appNodeDtoList=JSON.parse(a()(n)),o.dialogVisible=!1,o.flowForm={firstTrial:!1,opinion:!1,accessory:!1}}})},editorNode:function(e,o){e.index=o,1==e.firstTrial?e.firstTrial=!0:(e.firstTrial=!1,e.recheck=0),1==e.opinion?e.opinion=!0:e.opinion=!1,1==e.accessory?e.accessory=!0:e.accessory=!1,this.flowForm=JSON.parse(a()(e)),this.dialogVisible=!0},openAddNode:function(){this.dialogVisible=!0},handleClose:function(e){this.dialogVisible=!1},cancelNode:function(){this.dialogVisible=!1,this.flowForm={firstTrial:!1,opinion:!1,accessory:!1}},deleteNodeBox:function(e,o){var t=this;this.$confirm("是否确定删除此节点","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.nodeId?Object(l.b)({nodeId:e.nodeId}).then(function(e){200==e.code&&(t.processForm.appNodeDtoList.splice(o,1),t.appNodeNum=t.processForm.appNodeDtoList.length,t.$message.success("删除成功"))}):(t.processForm.appNodeDtoList.splice(o,1),t.appNodeNum=t.processForm.appNodeDtoList.length,t.$message.success("删除成功")),t.appNodeNum=t.processForm.appNodeDtoList.length})},onUpItem:function(e,o){this.appNodeNum>=2&&1==o?this.$message({type:"warning",message:"已经是第一，无法上升"}):(this.processForm.appNodeDtoList.splice(o-1,0,e),this.processForm.appNodeDtoList.splice(o+1,1))},onDownItem:function(e,o){this.appNodeNum>=2&&e==this.processForm.appNodeDtoList[this.processForm.appNodeDtoList.length-2]?this.$message({type:"warning",message:"已经是最后，无法下降"}):(this.processForm.appNodeDtoList.splice(o+2,0,e),this.processForm.appNodeDtoList.splice(o,1))},cancelSub:function(){this.detail||this.$refs.editor.destroyEditor(),this.processForm={appNodeDtoList:[{nodeName:"开始",firstTrial:0,recheck:0,opinion:0,accessory:0,nodeDesc:"",goToType:0,handlerType:0},{nodeName:"结束",firstTrial:0,recheck:0,opinion:0,accessory:0,nodeDesc:"",goToType:0,handlerType:0}]},this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,"/backend/process")},getPersonList:function(e){var o=this,t=new FormData;t.append("roleNameList",e),Object(r.D)(t).then(function(e){200==e.code?o.projectPersonList=e.data:o.$message.warning(e.message)})},handlerTypeChange:function(){this.$set(this.flowForm,"handlerId","")},getDepartmentList:function(){var e=this;Object(i.f)({}).then(function(o){200==o.code&&(e.departmentList=o.data.deptInfoTreeVos)})},getCommonData:function(){var e=this;Object(s.d)({keyList:"DICT:FLOW_NAME",companyId:"697480101377343488"}).then(function(o){200==o.code?e.processNameList=o.data["DICT:FLOW_NAME"]:e.$message({type:"error",message:o.message})})},getRoles:function(){var e=this,o={page:1,pageSize:1e3,roleName:this.roleName,parentId:0};Object(c.e)(o).then(function(o){200==o.code?e.rolesList=o.data.data:e.$message({type:"error",message:o.message})})},firstChange:function(e){0==e&&(this.flowForm.recheck=0)}}},p={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"app-container"},[t("el-card",{staticClass:"box-card box-margin"},[t("div",{staticClass:"addUserContent"},[t("el-form",{ref:"processForm",staticClass:"demo-ruleForm",attrs:{model:e.processForm,rules:e.rules}},[t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:"流程名称:",prop:"flowName"}},[e.detail?t("span",[e._v(e._s(e.processForm.flowName))]):t("el-input",{staticClass:"searchInput",attrs:{size:"small",maxlength:"200",placeholder:"流程名称"},model:{value:e.processForm.flowName,callback:function(o){e.$set(e.processForm,"flowName","string"==typeof o?o.trim():o)},expression:"processForm.flowName"}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:"时限:",prop:"timeLimit"}},[e.detail?t("span",[e._v(e._s(e.processForm.timeLimit))]):t("el-input",{staticClass:"searchInput",attrs:{size:"small",type:"number",oninput:"if(value>10000)value=10000",placeholder:"流程时限"},model:{value:e.processForm.timeLimit,callback:function(o){e.$set(e.processForm,"timeLimit",o)},expression:"processForm.timeLimit"}},[t("template",{slot:"append"},[e._v("小时")])],2)],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:10}},[t("el-form-item",{attrs:{label:"备注:",prop:"flowDesc"}},[e.detail?t("span",{domProps:{innerHTML:e._s(e.processForm.flowDesc)}},[e._v(e._s(e.processForm.flowDesc))]):t("EditorText",{ref:"editor",attrs:{id:e.editor1,value:e.processForm.flowDesc,maxlength:e.maxlength},on:{changeValue:function(o){return e.changeValue(o)}}})],1)],1)],1),e._v(" "),t("el-row",[t("el-col",{attrs:{span:24}},[t("el-form-item",{attrs:{prop:"appNodeDtoList"}},[e.detail?e._e():t("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.openAddNode}},[e._v("新建环节")]),e._v(" "),t("el-table",{attrs:{data:e.processForm.appNodeDtoList,border:"","default-expand-all":!1}},[t("el-table-column",{attrs:{label:"序号",align:"center",type:"index",width:"100"}}),e._v(" "),t("el-table-column",{attrs:{label:"环节名称"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(o.row.nodeName))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"初审"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(1==o.row.firstTrial?"是":"否"))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"复审",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v("\n                        "+e._s(0==o.row.recheck?"不需要复审":1==o.row.recheck?"初审通过时需要复审":2==o.row.recheck?"初审不通过时需要复审":"不需要复审")+"\n                      ")])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"意见"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(1==o.row.opinion?"是":"否"))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"附件"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(1==o.row.accessory?"是":"否"))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"处理人",width:"120px"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v("\n                        "+e._s(0==o.row.handlerType?"当前工程师":1==o.row.handlerType?"手动指定用户":2==o.row.handlerType?"指定用户":3==o.row.handlerType?"指定部门":4==o.row.handlerType?"指定角色":5==o.row.handlerType?"开始创建人":"-")+"\n                      ")])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"前置接口"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(o.row.autoInterfaceBefore))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"后置接口"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(o.row.autoInterfaceAfter))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"后续跳转"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(0==o.row.goToType?"不跳转":1==o.row.goToType?"正常通过跳转":2==o.row.goToType?"审批不通过跳转":3==o.row.goToType?"条件跳转":"不跳转"))])]}}])}),e._v(" "),t("el-table-column",{attrs:{label:"备注"},scopedSlots:e._u([{key:"default",fn:function(o){return[t("span",[e._v(e._s(o.row.nodeDesc))])]}}])}),e._v(" "),e.detail?e._e():t("el-table-column",{attrs:{label:"操作",width:"230px"},scopedSlots:e._u([{key:"default",fn:function(o){return[o.$index+1!=1&&o.$index+1!=e.appNodeNum?t("span",{staticClass:"spanButton spanHeng",on:{click:function(t){return e.editorNode(o.row,o.$index)}}},[e._v("编辑")]):e._e(),e._v(" "),o.$index+1!=1&&o.$index+1!=e.appNodeNum?t("span",{staticClass:"spanButton col_red spanHeng",on:{click:function(t){return e.deleteNodeBox(o.row,o.$index)}}},[e._v("删除")]):e._e(),e._v(" "),o.$index+1!=1&&o.$index+1!=e.appNodeNum?t("span",{staticClass:"spanButton colUpDown spanHeng",on:{click:function(t){return e.onUpItem(o.row,o.$index)}}},[e._v("上升")]):e._e(),e._v(" "),o.$index+1!=1&&o.$index+1!=e.appNodeNum?t("span",{staticClass:"spanButton colUpDown spanHeng",on:{click:function(t){return e.onDownItem(o.row,o.$index)}}},[e._v("下降")]):e._e()]}}],null,!1,1208943790)})],1)],1)],1)],1)],1)],1)]),e._v(" "),t("div",{staticClass:"btnList"},[!e.flowId&&""==e.flowId&&e.allowAdd.twoAllow?t("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(o){return e.addProcess("processForm")}}},[e._v("确定")]):e._e(),e._v(" "),e.flowId&&!e.detail?t("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(o){return e.editFlow("processForm")}}},[e._v("修改")]):e._e(),e._v(" "),t("el-button",{attrs:{size:"small"},on:{click:e.cancelSub}},[e._v("取消")])],1),e._v(" "),t("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],staticClass:"huanjie",attrs:{title:"环节信息",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(o){e.dialogVisible=o}}},[t("div",[t("el-form",{ref:"flowForm",staticClass:"demo-ruleForm",attrs:{model:e.flowForm,rules:e.nodeRules}},[t("el-form-item",{attrs:{label:"环节名称:",prop:"nodeName"}},[t("el-select",{attrs:{size:"small",placeholder:"环节名称",clearable:"",filterable:""},model:{value:e.flowForm.nodeName,callback:function(o){e.$set(e.flowForm,"nodeName",o)},expression:"flowForm.nodeName"}},e._l(e.processNameList,function(e){return t("el-option",{key:e.dictName,attrs:{label:e.dictName,value:e.dictName}})}),1)],1),e._v(" "),t("el-form-item",[t("div",[t("el-checkbox",{attrs:{label:"初审（通过，不通过）"},on:{change:e.firstChange},model:{value:e.flowForm.firstTrial,callback:function(o){e.$set(e.flowForm,"firstTrial",o)},expression:"flowForm.firstTrial"}})],1),e._v(" "),t("div",[1==e.flowForm.firstTrial?t("el-radio-group",{model:{value:e.flowForm.recheck,callback:function(o){e.$set(e.flowForm,"recheck",o)},expression:"flowForm.recheck"}},[t("el-radio",{attrs:{label:0}},[e._v("不需要复审")]),e._v(" "),t("el-radio",{attrs:{label:1}},[e._v("复审(初审通过时需要复审)")]),e._v(" "),t("el-radio",{attrs:{label:2}},[e._v("复审(初审不通过时需要复审)")])],1):e._e()],1),e._v(" "),t("div",[t("el-checkbox",{attrs:{label:"显示意见"},model:{value:e.flowForm.opinion,callback:function(o){e.$set(e.flowForm,"opinion",o)},expression:"flowForm.opinion"}})],1),e._v(" "),t("div",[t("el-checkbox",{attrs:{label:"显示附件"},model:{value:e.flowForm.accessory,callback:function(o){e.$set(e.flowForm,"accessory",o)},expression:"flowForm.accessory"}})],1)]),e._v(" "),t("el-form-item",{attrs:{label:"环节处理人:"}},[t("el-select",{attrs:{size:"small",placeholder:"环节处理人",clearable:""},on:{change:e.handlerTypeChange},model:{value:e.flowForm.handlerType,callback:function(o){e.$set(e.flowForm,"handlerType",o)},expression:"flowForm.handlerType"}},e._l(e.handlerTypeList,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),2==e.flowForm.handlerType?t("el-select",{attrs:{size:"small",placeholder:"指定用户",clearable:"",filterable:""},model:{value:e.flowForm.handlerId,callback:function(o){e.$set(e.flowForm,"handlerId",o)},expression:"flowForm.handlerId"}},e._l(e.projectPersonList,function(e){return t("el-option",{key:e.userId,attrs:{label:e.userName+"_"+e.roleName,value:e.userId}})}),1):e._e(),e._v(" "),3==e.flowForm.handlerType?t("el-cascader",{ref:"type",staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"指定部门",options:e.departmentList,clearable:"","show-all-levels":!1,props:{checkStrictly:!0,emitPath:!1,children:"child",label:"deptName",value:"deptId"}},model:{value:e.flowForm.handlerId,callback:function(o){e.$set(e.flowForm,"handlerId",o)},expression:"flowForm.handlerId"}}):e._e(),e._v(" "),4==e.flowForm.handlerType?t("el-select",{attrs:{size:"small",placeholder:"指定角色",clearable:""},model:{value:e.flowForm.handlerId,callback:function(o){e.$set(e.flowForm,"handlerId",o)},expression:"flowForm.handlerId"}},e._l(e.rolesList,function(e){return t("el-option",{key:e.roleId,attrs:{label:e.roleName,value:e.roleId}})}),1):e._e()],1),e._v(" "),t("el-form-item",{attrs:{label:"前置接口:"}},[t("el-input",{attrs:{size:"small"},model:{value:e.flowForm.autoInterfaceBefore,callback:function(o){e.$set(e.flowForm,"autoInterfaceBefore",o)},expression:"flowForm.autoInterfaceBefore"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"后置接口:"}},[t("el-input",{attrs:{size:"small"},model:{value:e.flowForm.autoInterfaceAfter,callback:function(o){e.$set(e.flowForm,"autoInterfaceAfter",o)},expression:"flowForm.autoInterfaceAfter"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"后续跳转:"}},[t("el-select",{attrs:{size:"small",placeholder:"后续跳转",clearable:""},model:{value:e.flowForm.goToType,callback:function(o){e.$set(e.flowForm,"goToType",o)},expression:"flowForm.goToType"}},e._l(e.goToTypeList,function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),t("el-form-item",{attrs:{label:"备注:",prop:"nodeDesc"}},[t("el-input",{staticClass:"searchInput",attrs:{type:"textarea",rows:4,size:"small",placeholder:"备注",maxlength:"200"},model:{value:e.flowForm.nodeDesc,callback:function(o){e.$set(e.flowForm,"nodeDesc",o)},expression:"flowForm.nodeDesc"}})],1)],1)],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.cancelNode}},[e._v("取 消")]),e._v(" "),void 0==e.flowForm.index?t("el-button",{attrs:{type:"primary"},on:{click:function(o){return e.addProcessBox("flowForm")}}},[e._v("确 定")]):t("el-button",{attrs:{type:"primary"},on:{click:function(o){return e.editProcessBox("flowForm")}}},[e._v("修 改")])],1)])],1)},staticRenderFns:[]};var m=t("VU/8")(d,p,!1,function(e){t("6yUY")},"data-v-e1c38106",null);o.default=m.exports},m2HU:function(e,o,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n[data-v-e1c38106] .el-table {\n  border: #d9f2ff 1px solid !important;\n  margin-top: 10px;\n}\n[data-v-e1c38106] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-e1c38106] .el-table--border th,[data-v-e1c38106] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-e1c38106] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-e1c38106] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-e1c38106] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-e1c38106] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n[data-v-e1c38106] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 14px;\n}\n[data-v-e1c38106] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n}\n[data-v-e1c38106] .el-form-item__label {\n  min-width: 75px;\n}\n.btnList[data-v-e1c38106] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n[data-v-e1c38106] .el-card__header {\n  color: #008DD6;\n}\n[data-v-e1c38106] input::-webkit-outer-spin-button,[data-v-e1c38106] input::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0;\n}\n[data-v-e1c38106] .el-table__indent,[data-v-e1c38106] .el-table__placeholder {\n  /*display: none;*/\n}\n[data-v-e1c38106] .el-table .cell {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n[data-v-e1c38106] .el-table .cell span:last-child::after {\n  display: none;\n}\n.col_red[data-v-e1c38106] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-e1c38106]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-e1c38106] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-e1c38106]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-e1c38106] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-e1c38106]:hover {\n  opacity: 0.5;\n}\n.linkBox[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 10px;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  border-bottom: 1px solid #dfdfdf;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: start;\n}\n.linkBox .boxFlex[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.linkBox .linkMsg[data-v-e1c38106] {\n  /*min-width:200px;*/\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  /*flex:1;*/\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.linkBox .linkMsg .processInput[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.linkBox .linkMsg .el-input[data-v-e1c38106] {\n  width: auto;\n}\n.linkBox span[data-v-e1c38106] {\n  margin-right: 10px;\n}\n.linkBox[data-v-e1c38106] .el-input {\n  margin-right: 10px;\n  margin-bottom: 10px;\n  width: auto;\n}\n.linkBox .el-button[data-v-e1c38106] {\n  max-height: 40px;\n}\n.linkTitle[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.linkTitle div[data-v-e1c38106] {\n  width: 178px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  font-weight: bold;\n  text-align: center;\n}\n.spanButton[data-v-e1c38106] {\n  color: #05AAFF;\n}\n.shu[data-v-e1c38106] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.spanHeng[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spanHeng[data-v-e1c38106]::after {\n  content: '';\n  width: 2px;\n  height: 13px;\n  background: #ccc;\n  display: inline-block;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.huanjie[data-v-e1c38106] .el-dialog__header {\n  border-bottom: 1px solid #ccc;\n}\n","",{version:3,sources:["H:/java/chengguoyun-web/src/views/backend/processManage/addProcess.vue"],names:[],mappings:";AACA;EACE,qCAAqC;EACrC,iBAAiB;CAClB;AACD;EACE,+BAA+B;CAChC;AACD;EACE,+BAA+B;EAC/B,YAAY;EACZ,iBAAiB;EACjB,kDAAkD;EAClD,eAAe;CAChB;AACD;EACE,+BAA+B;EAC/B,gDAAgD;CACjD;AACD;EACE,aAAa;EACb,+BAA+B;UACvB,uBAAuB;CAChC;AACD;EACE,2CAA2C;CAC5C;AACD;EACE,0CAA0C;CAC3C;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,mBAAmB;CACpB;AACD;EACE,oBAAoB;MAChB,YAAY;UACR,QAAQ;EAChB,YAAY;CACb;AACD;EACE,gBAAgB;CACjB;AACD;EACE,iBAAiB;EACjB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;EAChC,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,oCAAoC;EACpC,UAAU;CACX;AACD;EACE,kBAAkB;CACnB;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;CAC7B;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,aAAa;CACd;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,aAAa;CACd;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,aAAa;CACd;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,iBAAiB;EACjB,oBAAoB;MAChB,gBAAgB;EACpB,iCAAiC;EACjC,yBAAyB;MACrB,sBAAsB;UAClB,mBAAmB;CAC5B;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,oBAAoB;MAChB,gBAAgB;EACpB,oBAAoB;MAChB,YAAY;UACR,QAAQ;CACjB;AACD;EACE,oBAAoB;EACpB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,WAAW;EACX,oBAAoB;MAChB,gBAAgB;CACrB;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;CACf;AACD;EACE,YAAY;CACb;AACD;EACE,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,oBAAoB;EACpB,YAAY;CACb;AACD;EACE,iBAAiB;CAClB;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;CACf;AACD;EACE,aAAa;EACb,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;EACf,YAAY;CACb;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;CAC7B;AACD;EACE,YAAY;EACZ,WAAW;EACX,aAAa;EACb,iBAAiB;EACjB,sBAAsB;EACtB,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,8BAA8B;CAC/B",file:"addProcess.vue",sourcesContent:["\n[data-v-e1c38106] .el-table {\n  border: #d9f2ff 1px solid !important;\n  margin-top: 10px;\n}\n[data-v-e1c38106] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-e1c38106] .el-table--border th,[data-v-e1c38106] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-e1c38106] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-e1c38106] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-e1c38106] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-e1c38106] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n[data-v-e1c38106] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 14px;\n}\n[data-v-e1c38106] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n}\n[data-v-e1c38106] .el-form-item__label {\n  min-width: 75px;\n}\n.btnList[data-v-e1c38106] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n[data-v-e1c38106] .el-card__header {\n  color: #008DD6;\n}\n[data-v-e1c38106] input::-webkit-outer-spin-button,[data-v-e1c38106] input::-webkit-inner-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0;\n}\n[data-v-e1c38106] .el-table__indent,[data-v-e1c38106] .el-table__placeholder {\n  /*display: none;*/\n}\n[data-v-e1c38106] .el-table .cell {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n[data-v-e1c38106] .el-table .cell span:last-child::after {\n  display: none;\n}\n.col_red[data-v-e1c38106] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-e1c38106]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-e1c38106] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-e1c38106]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-e1c38106] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-e1c38106]:hover {\n  opacity: 0.5;\n}\n.linkBox[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 10px;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  border-bottom: 1px solid #dfdfdf;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: start;\n}\n.linkBox .boxFlex[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.linkBox .linkMsg[data-v-e1c38106] {\n  /*min-width:200px;*/\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  /*flex:1;*/\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.linkBox .linkMsg .processInput[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.linkBox .linkMsg .el-input[data-v-e1c38106] {\n  width: auto;\n}\n.linkBox span[data-v-e1c38106] {\n  margin-right: 10px;\n}\n.linkBox[data-v-e1c38106] .el-input {\n  margin-right: 10px;\n  margin-bottom: 10px;\n  width: auto;\n}\n.linkBox .el-button[data-v-e1c38106] {\n  max-height: 40px;\n}\n.linkTitle[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.linkTitle div[data-v-e1c38106] {\n  width: 178px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  font-weight: bold;\n  text-align: center;\n}\n.spanButton[data-v-e1c38106] {\n  color: #05AAFF;\n}\n.shu[data-v-e1c38106] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.spanHeng[data-v-e1c38106] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.spanHeng[data-v-e1c38106]::after {\n  content: '';\n  width: 2px;\n  height: 13px;\n  background: #ccc;\n  display: inline-block;\n  margin-left: 10px;\n  margin-right: 10px;\n}\n.huanjie[data-v-e1c38106] .el-dialog__header {\n  border-bottom: 1px solid #ccc;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=16.8f8e4cd6d2d801748219.js.map