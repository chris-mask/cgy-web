webpackJsonp([109],{RuYI:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t("mvHQ"),s=t.n(i),l=t("c8+v"),n=(t("/jS7"),t("Q5rI")),o=t("jlNU"),r=t("gu65"),d=t("kvU2"),c=t.n(d),p={data:function(){return{addAnnexModal:!1,listData:[],projectListData:[],annexTypeData:[],upFilesParams:{},annexList:[],fileList:[],modalList:[],isShowDownModel:!1,upFilesRules:{orderId:[{required:!0,message:"请选择项目",trigger:"blur"}],projectName:[{required:!0,message:"请输入项目名称",trigger:"blur"}],materialType:[{required:!0,message:"请选择附件分类",trigger:"blur"}]},downModalParams:{},allowDelApplyFile:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:APPLYFILE:DELETE")}},props:["id","companyNames","provinceId","cityId","districtId","townId"],mounted:function(){this.getMaterialList()},activated:function(){this.getMaterialList()},methods:{getMaterialList:function(){var e=this,a={companyId:this.id,page:0,pageSize:20};Object(l.A)(a).then(function(a){200===a.code&&(a.data.data.forEach(function(a){0!==a.crmProjectApplyFileVos.length&&a.crmProjectApplyFileVos.forEach(function(a){a.fileIds&&(a.fileIds=a.fileIds.split(","),Object(n.k)({fileIds:a.fileIds,haveView:!1}).then(function(t){200==t.code?a.fileIdsList=c()(t.data):e.$message.warning(t.message)}))})}),setTimeout(function(){e.listData=a.data.data},500))})},upFileBtnHandle:function(){var e=this;this.addAnnexModal=!0;var a={keyList:"DICT:MATERIALTYPE",companyId:this.$store.getters.companyId};Object(n.d)(a).then(function(a){200==a.code?e.annexTypeData=a.data["DICT:MATERIALTYPE"]:e.$message({type:"error",message:a.message})});var t={page:0,pageSize:30,companyId:this.id};Object(l.v)(t).then(function(a){200===a.code&&(a.data.data.forEach(function(e){e.projectName=e.projectName+"  "+(e.applyYear?"年份:"+e.applyYear:"")+"  "+(e.applyBatchNo?"批次:"+e.applyBatchNo:"")+" "}),e.projectListData=a.data.data)})},handleFilesUpload:function(e){var a=this;if(e.file.name.length>=150)return this.$message.error("文件名称超长，请检查"),void(this.fileList=JSON.parse(s()(this.fileList)));var t=e.file.name.split("."),i=Object(r.c)(this.companyNames,t[0])+"."+t[t.length-1];Object(o.a)(i,e.file,e).then(function(s){if(s){var l=[],o={fileName:e.file.name,filePath:i,fileSize:e.file.size,fileType:t[t.length-1],parentType:4};l.push(o);var r={companyId:a.$store.getters.companyId,companyName:a.$store.getters.companyName,addFileDtos:l,haveView:!0};Object(n.a)(r).then(function(e){200==e.code&&(a.$message.success("上传成功"),a.annexList.push(e.data[0]))})}})},delFilesUploadHandle:function(e,a){var t=this;this.annexList.forEach(function(a,i){e.name==a.fileName&&t.annexList.splice(i,1)})},projectChange:function(e){0!=e&&1!=e&&this.upFilesParams.materialType&&""!=this.upFilesParams.materialType?(this.isShowDownModel=!0,this.getModalList()):(this.isShowDownModel=!1,this.modalList=[],this.downModalParams={})},annaxChange:function(){this.upFilesParams.orderId&&""!=this.upFilesParams.orderId&&0!=this.upFilesParams.orderId&&1!=this.upFilesParams.orderId&&this.getModalList()},getModalList:function(){var e=this;this.projectListData.forEach(function(a){a.orderId==e.upFilesParams.orderId&&(e.downModalParams.projectId=a.projectId,e.downModalParams.applyYear=a.applyYear,e.downModalParams.applyLevel=a.applyLevel)}),this.downModalParams.materialType=this.upFilesParams.materialType,this.downModalParams.orderId=this.upFilesParams.orderId,this.downModalParams.provinceId=this.provinceId,this.downModalParams.cityId=this.cityId,this.downModalParams.districtId=this.districtId,this.downModalParams.townId=this.townId,Object(l.n)(this.downModalParams).then(function(a){if(200==a.code)if(a.data.templateFileIds){var t=a.data.templateFileIds.split(",");e.upFilesParams.materialId=a.data.materialId,Object(n.k)({fileIds:t,haveView:!1}).then(function(a){200==a.code?e.modalList=a.data:e.$message.warning(a.message)})}else e.modalList=[]})},setAddAnnex:function(){var e=this;this.$refs.upFilesModal.validate(function(a,t){if(a){if(0==e.annexList.length)return void e.$message.warning("请上传附件");var i=e.annexList.map(function(e){return e.fileId});e.upFilesParams.fileIds=i.join(","),e.upFilesParams.crmCompanyId=e.id,Object(l.L)(e.upFilesParams).then(function(a){200===a.code&&(e.getMaterialList(),e.upFilesParams={},e.downModalParams={},e.annexList=[],e.modalList=[],e.$refs.upload.clearFiles(),e.addAnnexModal=!1)})}})},cananlAddAnnex:function(){this.upFilesParams={},this.downModalParams={},this.annexList=[],this.fileList=[],this.modalList=[],this.addAnnexModal=!1},downFileHandle:function(e){var a=this;if(e.fileId||this.annexList.forEach(function(a){a.fileName==e.name&&(e=a)}),e.fileId){var t={companyId:this.$store.getters.companyId,fileId:e.fileId};Object(l.p)(t).then(function(e){if(200==e.code){var t=e.data.replace(/http/,"https");window.open(t)}else a.$message({type:"error",message:e.message})})}},delFileList:function(e,a,t){var i=this,s=a.fileIdsList.filter(function(e){if(e.fileId!==t.fileId)return e}).map(function(e){return e.fileId}).join(","),n={applyFileId:a.applyFileId,fileIds:s};Object(l.h)(n).then(function(e){200===e.code&&(i.getMaterialList(),i.$message.success("删除成功"))})}},filters:{toCN:function(e){var a=["一","二","三","四","五","六","七","八","九","十"],t=parseInt(e)+1;return t<=10?a[t-1]:t<=100?t<20?"十"+a[t%10-1]:t%10==0?a[Math.floor(t/10)-1]+"十":a[Math.floor(t/10)-1]+"十"+a[t%10-1]:void 0}}},f={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"customer-files"},[t("el-button",{staticClass:"up-file-btn",on:{click:e.upFileBtnHandle}},[e._v("上传附件")]),e._v(" "),e._l(e.listData,function(a,i){return t("div",{staticClass:"one-list"},[t("div",{staticClass:"title"},[e._v("\n      "+e._s(e._f("toCN")(i))+"、"+e._s(a.projectName)+"\n      "),a.applyYear||a.applyBatchNo?t("span",[e._v("\n        (年份："+e._s(a.applyYear&&""!==a.applyYear?a.applyYear:"-")+" 批次："+e._s(a.applyBatchNo&&""!==a.applyBatchNo?a.applyBatchNo:"-")+")\n      ")]):e._e()]),e._v(" "),e._l(a.crmProjectApplyFileVos,function(i,s){return t("div",{staticClass:"two-list"},[t("div",{staticClass:"title"},[e._v("\n        ("+e._s(s+1)+") 、"+e._s(i.materialTypeName)+"\n        "),t("div",{staticClass:"three-list"},[t("ul",{staticClass:"file-list"},e._l(i.fileIdsList,function(s,l){return t("li",[e._v("\n              "+e._s(l+1)+" . "+e._s(s.fileName)+"\n              "),t("span",{staticClass:"read",on:{click:function(a){return e.downFileHandle(s)}}},[e._v("下载")]),e._v(" "),e.allowDelApplyFile.twoAllow?t("span",{staticClass:"del",on:{click:function(t){return e.delFileList(a,i,s)}}},[e._v("删除")]):e._e()])}),0)])])])})],2)}),e._v(" "),t("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],staticClass:"editorUserModal",attrs:{title:"上传附件","before-close":e.cananlAddAnnex,visible:e.addAnnexModal,width:"650px"},on:{"update:visible":function(a){e.addAnnexModal=a}}},[t("el-form",{ref:"upFilesModal",attrs:{model:e.upFilesParams,rules:e.upFilesRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"项目：",prop:"orderId"}},[t("el-select",{on:{change:e.projectChange},model:{value:e.upFilesParams.orderId,callback:function(a){e.$set(e.upFilesParams,"orderId",a)},expression:"upFilesParams.orderId"}},e._l(e.projectListData,function(e,a){return t("el-option",{key:a,attrs:{value:e.orderId,label:e.projectName}})}),1)],1),e._v(" "),1==e.upFilesParams.orderId?t("el-form-item",{attrs:{label:"",prop:"projectName"}},[t("el-input",{attrs:{maxlength:"100",placeholder:"项目名称"},model:{value:e.upFilesParams.projectName,callback:function(a){e.$set(e.upFilesParams,"projectName",a)},expression:"upFilesParams.projectName"}})],1):e._e(),e._v(" "),t("el-form-item",{attrs:{label:"附件分类：",prop:"materialType"}},[t("el-select",{on:{change:e.annaxChange},model:{value:e.upFilesParams.materialType,callback:function(a){e.$set(e.upFilesParams,"materialType",a)},expression:"upFilesParams.materialType"}},e._l(e.annexTypeData,function(e){return t("el-option",{key:e.dictId,attrs:{value:e.dictId,label:e.dictName}})}),1)],1),e._v(" "),0!==e.modalList.length?t("el-form-item",{attrs:{label:"下载模板："}},[t("ul",{staticClass:"model-files-list"},e._l(e.modalList,function(a,i){return t("li",[e._v("\n            "+e._s(i+1)+"."+e._s(a.fileName)+" "),t("span",{staticClass:"down",on:{click:function(t){return e.downFileHandle(a)}}},[e._v("下载")])])}),0)]):e._e(),e._v(" "),t("el-form-item",{staticClass:"update-file-form"},[t("div",{staticStyle:{width:"100px",color:"#606266","font-weight":"bold","padding-left":"7px"}},[t("span",{staticStyle:{color:"#F56C6C","margin-right":"4px"}},[e._v("*")]),e._v("上传附件：\n        ")]),e._v(" "),t("div",[t("el-upload",{ref:"upload",staticClass:"upload-box upload-box-width",staticStyle:{display:"inline-block",width:"100%"},attrs:{"http-request":e.handleFilesUpload,"on-remove":e.delFilesUploadHandle,"show-file-list":!0}},[t("el-button",{staticClass:"add-file-btn"},[e._v("增加文件")])],1)],1)])],1),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{staticClass:"setBtn",on:{click:e.setAddAnnex}},[e._v("确 定")]),e._v(" "),t("el-button",{staticClass:"cananl",on:{click:e.cananlAddAnnex}},[e._v("取 消")])],1)],1)],2)},staticRenderFns:[]};var m=t("VU/8")(p,f,!1,function(e){t("oru/")},"data-v-7a2b5b7c",null);a.default=m.exports},fiRr:function(e,a,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\nul li[data-v-7a2b5b7c] {\n  list-style: none;\n}\n.customer-files .up-file-btn[data-v-7a2b5b7c] {\n  padding: 9px 15px;\n  background: #409EFF;\n  border: 0;\n  color: #fff;\n  margin-bottom: 10px;\n}\n.customer-files .up-file-btn[data-v-7a2b5b7c]:active {\n  opacity: 0.5;\n}\n.customer-files .one-list[data-v-7a2b5b7c] {\n  margin-bottom: 12px;\n  padding-left: 5px;\n}\n.customer-files .one-list .two-list[data-v-7a2b5b7c] {\n  padding-left: 30px;\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list[data-v-7a2b5b7c] {\n  padding-left: 40px;\n  margin-top: 5px;\n}\n.customer-files .one-list .three-list .file-list li[data-v-7a2b5b7c] {\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list .file-list .read[data-v-7a2b5b7c] {\n  color: #409EFF;\n  cursor: pointer;\n  margin-left: 10px;\n}\n.customer-files .one-list .three-list .file-list .del[data-v-7a2b5b7c] {\n  color: red;\n  cursor: pointer;\n  margin-left: 5px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-7a2b5b7c] {\n  background: #05aaff;\n  color: #fff;\n  border: 0;\n  padding: 9px 15px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-7a2b5b7c]:active {\n  opacity: 0.5;\n}\n.customer-files .editorUserModal .model-files-list li[data-v-7a2b5b7c] {\n  color: #05aaff;\n}\n.customer-files .editorUserModal .model-files-list li .down[data-v-7a2b5b7c] {\n  cursor: pointer;\n}\n.customer-files .editorUserModal .update-files-list .del-upFile[data-v-7a2b5b7c] {\n  color: red;\n  cursor: pointer;\n}\n.customer-files .editorUserModal .dialog-footer .setBtn[data-v-7a2b5b7c] {\n  color: #fff;\n  background: #05aaff;\n}\n.customer-files .editorUserModal .dialog-footer .cananl[data-v-7a2b5b7c] {\n  background: #fff;\n  color: #444444;\n}\n.customer-files .update-file-form[data-v-7a2b5b7c] .el-form-item__content {\n  margin-left: 0 !important;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n",""])},"oru/":function(e,a,t){var i=t("fiRr");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);t("rjj0")("67eef395",i,!0)}});