webpackJsonp([120],{RuYI:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("mvHQ"),n=t.n(i),s=t("c8+v"),l=(t("/jS7"),t("Q5rI")),o=t("jlNU"),r=t("gu65"),d=t("kvU2"),c=t.n(d),p={data:function(){return{addAnnexModal:!1,listData:[],projectListData:[],annexTypeData:[],upFilesParams:{},annexList:[],fileList:[],modalList:[],isShowDownModel:!1,upFilesRules:{orderId:[{required:!0,message:"请选择项目",trigger:"blur"}],projectName:[{required:!0,message:"请输入项目名称",trigger:"blur"}],materialType:[{required:!0,message:"请选择附件分类",trigger:"blur"}]},downModalParams:{},allowDelApplyFile:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:APPLYFILE:DELETE")}},props:["id","companyNames","provinceId","cityId","districtId","townId"],mounted:function(){this.getMaterialList()},activated:function(){this.getMaterialList()},methods:{getMaterialList:function(){var a=this,e={companyId:this.id,page:0,pageSize:20};Object(s.A)(e).then(function(e){200===e.code&&(e.data.data.forEach(function(e){0!==e.crmProjectApplyFileVos.length&&e.crmProjectApplyFileVos.forEach(function(e){e.fileIds&&(e.fileIds=e.fileIds.split(","),Object(l.k)({fileIds:e.fileIds,haveView:!1}).then(function(t){200==t.code?e.fileIdsList=c()(t.data):a.$message.warning(t.message)}))})}),setTimeout(function(){a.listData=e.data.data},500))})},upFileBtnHandle:function(){var a=this;this.addAnnexModal=!0;var e={keyList:"DICT:MATERIALTYPE",companyId:this.$store.getters.companyId};Object(l.d)(e).then(function(e){200==e.code?a.annexTypeData=e.data["DICT:MATERIALTYPE"]:a.$message({type:"error",message:e.message})});var t={page:0,pageSize:30,companyId:this.id};Object(s.v)(t).then(function(e){200===e.code&&(e.data.data.forEach(function(a){a.projectName=a.projectName+"  "+(a.applyYear?"年份:"+a.applyYear:"")+"  "+(a.applyBatchNo?"批次:"+a.applyBatchNo:"")+" "}),a.projectListData=e.data.data)})},handleFilesUpload:function(a){var e=this;if(a.file.name.length>=150)return this.$message.error("文件名称超长，请检查"),void(this.fileList=JSON.parse(n()(this.fileList)));var t=a.file.name.split("."),i=Object(r.c)(this.companyNames,t[0])+"."+t[t.length-1];Object(o.a)(i,a.file,a).then(function(n){if(n){var s=[],o={fileName:a.file.name,filePath:i,fileSize:a.file.size,fileType:t[t.length-1],parentType:4};s.push(o);var r={companyId:e.$store.getters.companyId,companyName:e.$store.getters.companyName,addFileDtos:s,haveView:!0};Object(l.a)(r).then(function(a){200==a.code&&(e.$message.success("上传成功"),e.annexList.push(a.data[0]))})}})},delFilesUploadHandle:function(a,e){var t=this;this.annexList.forEach(function(e,i){a.name==e.fileName&&t.annexList.splice(i,1)})},projectChange:function(a){0!=a&&1!=a&&this.upFilesParams.materialType&&""!=this.upFilesParams.materialType?(this.isShowDownModel=!0,this.getModalList()):(this.isShowDownModel=!1,this.modalList=[],this.downModalParams={})},annaxChange:function(){this.upFilesParams.orderId&&""!=this.upFilesParams.orderId&&0!=this.upFilesParams.orderId&&1!=this.upFilesParams.orderId&&this.getModalList()},getModalList:function(){var a=this;this.projectListData.forEach(function(e){e.orderId==a.upFilesParams.orderId&&(a.downModalParams.projectId=e.projectId,a.downModalParams.applyYear=e.applyYear,a.downModalParams.applyLevel=e.applyLevel)}),this.downModalParams.materialType=this.upFilesParams.materialType,this.downModalParams.orderId=this.upFilesParams.orderId,this.downModalParams.provinceId=this.provinceId,this.downModalParams.cityId=this.cityId,this.downModalParams.districtId=this.districtId,this.downModalParams.townId=this.townId,Object(s.n)(this.downModalParams).then(function(e){if(200==e.code)if(e.data.templateFileIds){var t=e.data.templateFileIds.split(",");a.upFilesParams.materialId=e.data.materialId,Object(l.k)({fileIds:t,haveView:!1}).then(function(e){200==e.code?a.modalList=e.data:a.$message.warning(e.message)})}else a.modalList=[]})},setAddAnnex:function(){var a=this;this.$refs.upFilesModal.validate(function(e,t){if(e){if(0==a.annexList.length)return void a.$message.warning("请上传附件");var i=a.annexList.map(function(a){return a.fileId});a.upFilesParams.fileIds=i.join(","),a.upFilesParams.crmCompanyId=a.id,Object(s.L)(a.upFilesParams).then(function(e){200===e.code&&(a.getMaterialList(),a.upFilesParams={},a.downModalParams={},a.annexList=[],a.modalList=[],a.$refs.upload.clearFiles(),a.addAnnexModal=!1)})}})},cananlAddAnnex:function(){this.upFilesParams={},this.downModalParams={},this.annexList=[],this.fileList=[],this.modalList=[],this.addAnnexModal=!1},downFileHandle:function(a){var e=this;if(a.fileId||this.annexList.forEach(function(e){e.fileName==a.name&&(a=e)}),a.fileId){var t={companyId:this.$store.getters.companyId,fileId:a.fileId};Object(s.p)(t).then(function(a){if(200==a.code){var t=a.data.replace(/http/,"https");window.open(t)}else e.$message({type:"error",message:a.message})})}},delFileList:function(a,e,t){var i=this,n=e.fileIdsList.filter(function(a){if(a.fileId!==t.fileId)return a}).map(function(a){return a.fileId}).join(","),l={applyFileId:e.applyFileId,fileIds:n};Object(s.h)(l).then(function(a){200===a.code&&(i.getMaterialList(),i.$message.success("删除成功"))})}},filters:{toCN:function(a){var e=["一","二","三","四","五","六","七","八","九","十"],t=parseInt(a)+1;return t<=10?e[t-1]:t<=100?t<20?"十"+e[t%10-1]:t%10==0?e[Math.floor(t/10)-1]+"十":e[Math.floor(t/10)-1]+"十"+e[t%10-1]:void 0}}},f={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"customer-files"},[t("el-button",{staticClass:"up-file-btn",on:{click:a.upFileBtnHandle}},[a._v("上传附件")]),a._v(" "),a._l(a.listData,function(e,i){return t("div",{staticClass:"one-list"},[t("div",{staticClass:"title"},[a._v("\n      "+a._s(a._f("toCN")(i))+"、"+a._s(e.projectName)+"\n      "),e.applyYear||e.applyBatchNo?t("span",[a._v("\n        (年份："+a._s(e.applyYear&&""!==e.applyYear?e.applyYear:"-")+" 批次："+a._s(e.applyBatchNo&&""!==e.applyBatchNo?e.applyBatchNo:"-")+")\n      ")]):a._e()]),a._v(" "),a._l(e.crmProjectApplyFileVos,function(i,n){return t("div",{staticClass:"two-list"},[t("div",{staticClass:"title"},[a._v("\n        ("+a._s(n+1)+") 、"+a._s(i.materialTypeName)+"\n        "),t("div",{staticClass:"three-list"},[t("ul",{staticClass:"file-list"},a._l(i.fileIdsList,function(n,s){return t("li",[a._v("\n              "+a._s(s+1)+" . "+a._s(n.fileName)+"\n              "),t("span",{staticClass:"read",on:{click:function(e){return a.downFileHandle(n)}}},[a._v("下载")]),a._v(" "),a.allowDelApplyFile.twoAllow?t("span",{staticClass:"del",on:{click:function(t){return a.delFileList(e,i,n)}}},[a._v("删除")]):a._e()])}),0)])])])})],2)}),a._v(" "),t("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],staticClass:"editorUserModal",attrs:{title:"上传附件","before-close":a.cananlAddAnnex,visible:a.addAnnexModal,width:"650px"},on:{"update:visible":function(e){a.addAnnexModal=e}}},[t("el-form",{ref:"upFilesModal",attrs:{model:a.upFilesParams,rules:a.upFilesRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"项目：",prop:"orderId"}},[t("el-select",{on:{change:a.projectChange},model:{value:a.upFilesParams.orderId,callback:function(e){a.$set(a.upFilesParams,"orderId",e)},expression:"upFilesParams.orderId"}},a._l(a.projectListData,function(a,e){return t("el-option",{key:e,attrs:{value:a.orderId,label:a.projectName}})}),1)],1),a._v(" "),1==a.upFilesParams.orderId?t("el-form-item",{attrs:{label:"",prop:"projectName"}},[t("el-input",{attrs:{maxlength:"100",placeholder:"项目名称"},model:{value:a.upFilesParams.projectName,callback:function(e){a.$set(a.upFilesParams,"projectName",e)},expression:"upFilesParams.projectName"}})],1):a._e(),a._v(" "),t("el-form-item",{attrs:{label:"附件分类：",prop:"materialType"}},[t("el-select",{on:{change:a.annaxChange},model:{value:a.upFilesParams.materialType,callback:function(e){a.$set(a.upFilesParams,"materialType",e)},expression:"upFilesParams.materialType"}},a._l(a.annexTypeData,function(a){return t("el-option",{key:a.dictId,attrs:{value:a.dictId,label:a.dictName}})}),1)],1),a._v(" "),0!==a.modalList.length?t("el-form-item",{attrs:{label:"下载模板："}},[t("ul",{staticClass:"model-files-list"},a._l(a.modalList,function(e,i){return t("li",[a._v("\n            "+a._s(i+1)+"."+a._s(e.fileName)+" "),t("span",{staticClass:"down",on:{click:function(t){return a.downFileHandle(e)}}},[a._v("下载")])])}),0)]):a._e(),a._v(" "),t("el-form-item",{staticClass:"update-file-form"},[t("div",{staticStyle:{width:"100px",color:"#606266","font-weight":"bold","padding-left":"7px"}},[t("span",{staticStyle:{color:"#F56C6C","margin-right":"4px"}},[a._v("*")]),a._v("上传附件：\n        ")]),a._v(" "),t("div",[t("el-upload",{ref:"upload",staticClass:"upload-box upload-box-width",staticStyle:{display:"inline-block",width:"100%"},attrs:{"http-request":a.handleFilesUpload,"on-remove":a.delFilesUploadHandle,"show-file-list":!0}},[t("el-button",{staticClass:"add-file-btn"},[a._v("增加文件")])],1)],1)])],1),a._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{staticClass:"setBtn",on:{click:a.setAddAnnex}},[a._v("确 定")]),a._v(" "),t("el-button",{staticClass:"cananl",on:{click:a.cananlAddAnnex}},[a._v("取 消")])],1)],1)],2)},staticRenderFns:[]};var m=t("VU/8")(p,f,!1,function(a){t("WN++")},"data-v-1aaad138",null);e.default=m.exports},"WN++":function(a,e,t){var i=t("s62J");"string"==typeof i&&(i=[[a.i,i,""]]),i.locals&&(a.exports=i.locals);t("rjj0")("0794aa0c",i,!0)},s62J:function(a,e,t){(a.exports=t("FZ+f")(!0)).push([a.i,"\nul li[data-v-1aaad138] {\n  list-style: none;\n}\n.customer-files .up-file-btn[data-v-1aaad138] {\n  padding: 9px 15px;\n  background: #409EFF;\n  border: 0;\n  color: #fff;\n  margin-bottom: 10px;\n}\n.customer-files .up-file-btn[data-v-1aaad138]:active {\n  opacity: 0.5;\n}\n.customer-files .one-list[data-v-1aaad138] {\n  margin-bottom: 12px;\n  padding-left: 5px;\n}\n.customer-files .one-list .two-list[data-v-1aaad138] {\n  padding-left: 30px;\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list[data-v-1aaad138] {\n  padding-left: 40px;\n  margin-top: 5px;\n}\n.customer-files .one-list .three-list .file-list li[data-v-1aaad138] {\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list .file-list .read[data-v-1aaad138] {\n  color: #409EFF;\n  cursor: pointer;\n  margin-left: 10px;\n}\n.customer-files .one-list .three-list .file-list .del[data-v-1aaad138] {\n  color: red;\n  cursor: pointer;\n  margin-left: 5px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-1aaad138] {\n  background: #05aaff;\n  color: #fff;\n  border: 0;\n  padding: 9px 15px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-1aaad138]:active {\n  opacity: 0.5;\n}\n.customer-files .editorUserModal .model-files-list li[data-v-1aaad138] {\n  color: #05aaff;\n}\n.customer-files .editorUserModal .model-files-list li .down[data-v-1aaad138] {\n  cursor: pointer;\n}\n.customer-files .editorUserModal .update-files-list .del-upFile[data-v-1aaad138] {\n  color: red;\n  cursor: pointer;\n}\n.customer-files .editorUserModal .dialog-footer .setBtn[data-v-1aaad138] {\n  color: #fff;\n  background: #05aaff;\n}\n.customer-files .editorUserModal .dialog-footer .cananl[data-v-1aaad138] {\n  background: #fff;\n  color: #444444;\n}\n.customer-files .update-file-form[data-v-1aaad138] .el-form-item__content {\n  margin-left: 0 !important;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n","",{version:3,sources:["H:/chengguoyun-web/src/views/project/customer_detail/list.vue"],names:[],mappings:";AACA;EACE,iBAAiB;CAClB;AACD;EACE,kBAAkB;EAClB,oBAAoB;EACpB,UAAU;EACV,YAAY;EACZ,oBAAoB;CACrB;AACD;EACE,aAAa;CACd;AACD;EACE,oBAAoB;EACpB,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,iBAAiB;CAClB;AACD;EACE,mBAAmB;EACnB,gBAAgB;CACjB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,WAAW;EACX,gBAAgB;EAChB,iBAAiB;CAClB;AACD;EACE,oBAAoB;EACpB,YAAY;EACZ,UAAU;EACV,kBAAkB;CACnB;AACD;EACE,aAAa;CACd;AACD;EACE,eAAe;CAChB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,WAAW;EACX,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,oBAAoB;CACrB;AACD;EACE,iBAAiB;EACjB,eAAe;CAChB;AACD;EACE,0BAA0B;EAC1B,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;CACf",file:"list.vue",sourcesContent:["\nul li[data-v-1aaad138] {\n  list-style: none;\n}\n.customer-files .up-file-btn[data-v-1aaad138] {\n  padding: 9px 15px;\n  background: #409EFF;\n  border: 0;\n  color: #fff;\n  margin-bottom: 10px;\n}\n.customer-files .up-file-btn[data-v-1aaad138]:active {\n  opacity: 0.5;\n}\n.customer-files .one-list[data-v-1aaad138] {\n  margin-bottom: 12px;\n  padding-left: 5px;\n}\n.customer-files .one-list .two-list[data-v-1aaad138] {\n  padding-left: 30px;\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list[data-v-1aaad138] {\n  padding-left: 40px;\n  margin-top: 5px;\n}\n.customer-files .one-list .three-list .file-list li[data-v-1aaad138] {\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list .file-list .read[data-v-1aaad138] {\n  color: #409EFF;\n  cursor: pointer;\n  margin-left: 10px;\n}\n.customer-files .one-list .three-list .file-list .del[data-v-1aaad138] {\n  color: red;\n  cursor: pointer;\n  margin-left: 5px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-1aaad138] {\n  background: #05aaff;\n  color: #fff;\n  border: 0;\n  padding: 9px 15px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-1aaad138]:active {\n  opacity: 0.5;\n}\n.customer-files .editorUserModal .model-files-list li[data-v-1aaad138] {\n  color: #05aaff;\n}\n.customer-files .editorUserModal .model-files-list li .down[data-v-1aaad138] {\n  cursor: pointer;\n}\n.customer-files .editorUserModal .update-files-list .del-upFile[data-v-1aaad138] {\n  color: red;\n  cursor: pointer;\n}\n.customer-files .editorUserModal .dialog-footer .setBtn[data-v-1aaad138] {\n  color: #fff;\n  background: #05aaff;\n}\n.customer-files .editorUserModal .dialog-footer .cananl[data-v-1aaad138] {\n  background: #fff;\n  color: #444444;\n}\n.customer-files .update-file-form[data-v-1aaad138] .el-form-item__content {\n  margin-left: 0 !important;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=120.b0b99b6fc3db0a6e6354.js.map