webpackJsonp([113],{"88aI":function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\nul li[data-v-8234ec48] {\n  list-style: none;\n}\n.customer-files .up-file-btn[data-v-8234ec48] {\n  padding: 9px 15px;\n  background: #409EFF;\n  border: 0;\n  color: #fff;\n  margin-bottom: 10px;\n}\n.customer-files .up-file-btn[data-v-8234ec48]:active {\n  opacity: 0.5;\n}\n.customer-files .one-list[data-v-8234ec48] {\n  margin-bottom: 12px;\n  padding-left: 5px;\n}\n.customer-files .one-list .two-list[data-v-8234ec48] {\n  padding-left: 30px;\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list[data-v-8234ec48] {\n  padding-left: 40px;\n  margin-top: 5px;\n}\n.customer-files .one-list .three-list .file-list li[data-v-8234ec48] {\n  margin-top: 12px;\n}\n.customer-files .one-list .three-list .file-list .read[data-v-8234ec48] {\n  color: #409EFF;\n  cursor: pointer;\n  margin-left: 10px;\n}\n.customer-files .one-list .three-list .file-list .del[data-v-8234ec48] {\n  color: red;\n  cursor: pointer;\n  margin-left: 5px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-8234ec48] {\n  background: #05aaff;\n  color: #fff;\n  border: 0;\n  padding: 9px 15px;\n}\n.customer-files .editorUserModal .add-file-btn[data-v-8234ec48]:active {\n  opacity: 0.5;\n}\n.customer-files .editorUserModal .model-files-list li[data-v-8234ec48] {\n  color: #05aaff;\n}\n.customer-files .editorUserModal .model-files-list li .down[data-v-8234ec48] {\n  cursor: pointer;\n}\n.customer-files .editorUserModal .update-files-list .del-upFile[data-v-8234ec48] {\n  color: red;\n  cursor: pointer;\n}\n.customer-files .editorUserModal .dialog-footer .setBtn[data-v-8234ec48] {\n  color: #fff;\n  background: #05aaff;\n}\n.customer-files .editorUserModal .dialog-footer .cananl[data-v-8234ec48] {\n  background: #fff;\n  color: #444444;\n}\n.customer-files .update-file-form[data-v-8234ec48] .el-form-item__content {\n  margin-left: 0 !important;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n",""])},RuYI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),l=a("c8+v"),n=(a("/jS7"),a("Q5rI")),o=a("jlNU"),r=a("gu65"),d=a("kvU2"),c=a.n(d),p={data:function(){return{addAnnexModal:!1,listData:[],projectListData:[],annexTypeData:[],upFilesParams:{},annexList:[],fileList:[],modalList:[],isShowDownModel:!1,upFilesRules:{orderId:[{required:!0,message:"请选择项目",trigger:"blur"}],projectName:[{required:!0,message:"请输入项目名称",trigger:"blur"}],materialType:[{required:!0,message:"请选择附件分类",trigger:"blur"}]},downModalParams:{},allowDelApplyFile:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:APPLYFILE:DELETE")}},props:["id","companyNames","provinceId","cityId","districtId","townId"],mounted:function(){this.getMaterialList()},activated:function(){this.getMaterialList()},methods:{getMaterialList:function(){var e=this,t={companyId:this.id,page:0,pageSize:20};Object(l.B)(t).then(function(t){200===t.code&&(t.data.data.forEach(function(t){0!==t.crmProjectApplyFileVos.length&&t.crmProjectApplyFileVos.forEach(function(t){t.fileIds&&(t.fileIds=t.fileIds.split(","),Object(n.k)({fileIds:t.fileIds,haveView:!1}).then(function(a){200==a.code?t.fileIdsList=c()(a.data):e.$message.warning(a.message)}))})}),setTimeout(function(){e.listData=t.data.data},500))})},upFileBtnHandle:function(){var e=this;this.addAnnexModal=!0;var t={keyList:"DICT:MATERIALTYPE",companyId:this.$store.getters.companyId};Object(n.d)(t).then(function(t){200==t.code?e.annexTypeData=t.data["DICT:MATERIALTYPE"]:e.$message({type:"error",message:t.message})});var a={page:0,pageSize:30,companyId:this.id};Object(l.w)(a).then(function(t){200===t.code&&(t.data.data.forEach(function(e){e.projectName=e.projectName+"  "+(e.applyYear?"年份:"+e.applyYear:"")+"  "+(e.applyBatchNo?"批次:"+e.applyBatchNo:"")+" "}),e.projectListData=t.data.data)})},handleFilesUpload:function(e){var t=this;if(!this.companyNames||""==this.companyNames)return this.$message.error("企业名称为空，请检查"),void(this.fileList=JSON.parse(s()(this.fileList)));if(e.file.name.length>=150)return this.$message.error("文件名称超长，请检查"),void(this.fileList=JSON.parse(s()(this.fileList)));var a=e.file.size/1024;if(a>this.$store.getters.singleCapacity)return this.$message.error("文件大小超出限制，上传失败"),void(this.fileList=JSON.parse(s()(this.fileList)));if(a>this.$store.getters.totalCapacity)return this.$message.error("文件大小超出容量剩余空间，上传失败"),void(this.fileList=JSON.parse(s()(this.fileList)));var i=e.file.name.lastIndexOf("."),l=e.file.name.substring(0,i),d=e.file.name.substring(i+1,e.file.name.length),c=Object(r.b)(this.companyNames,l)+"."+d;Object(o.a)(c,e.file,e).then(function(i){if(i){var l=[],o={fileName:e.file.name,filePath:c,fileSize:a,fileType:d,parentType:4};l.push(o);var r={companyId:t.$store.getters.companyId,companyName:t.$store.getters.companyName,addFileDtos:l,haveView:!0};Object(n.a)(r).then(function(e){200==e.code?(t.$message.success("上传成功"),t.annexList.push(e.data[0])):(t.$message.error("上传失败，请检查重新上传"),t.fileList=JSON.parse(s()(t.fileList)))})}else t.$message.error("文件出错或文件已存在，无法覆盖"),t.fileList=JSON.parse(s()(t.fileList))})},delFilesUploadHandle:function(e,t){var a=this;this.annexList.forEach(function(t,i){e.name==t.fileName&&a.annexList.splice(i,1)})},projectChange:function(e){0!=e&&1!=e&&this.upFilesParams.materialType&&""!=this.upFilesParams.materialType?(this.isShowDownModel=!0,this.getModalList()):(this.isShowDownModel=!1,this.modalList=[],this.downModalParams={})},annaxChange:function(){this.upFilesParams.orderId&&""!=this.upFilesParams.orderId&&0!=this.upFilesParams.orderId&&1!=this.upFilesParams.orderId&&this.getModalList()},getModalList:function(){var e=this;this.projectListData.forEach(function(t){t.orderId==e.upFilesParams.orderId&&(e.downModalParams.projectId=t.projectId,e.downModalParams.applyYear=t.applyYear,e.downModalParams.applyLevel=t.applyLevel)}),this.downModalParams.materialType=this.upFilesParams.materialType,this.downModalParams.orderId=this.upFilesParams.orderId,this.downModalParams.provinceId=this.provinceId,this.downModalParams.cityId=this.cityId,this.downModalParams.districtId=this.districtId,this.downModalParams.townId=this.townId,Object(l.o)(this.downModalParams).then(function(t){if(200==t.code)if(t.data.templateFileIds){var a=t.data.templateFileIds.split(",");e.upFilesParams.materialId=t.data.materialId,Object(n.k)({fileIds:a,haveView:!1}).then(function(t){200==t.code?e.modalList=t.data:e.$message.warning(t.message)})}else e.modalList=[]})},setAddAnnex:function(){var e=this;this.$refs.upFilesModal.validate(function(t,a){if(t){if(0==e.annexList.length)return void e.$message.warning("请上传附件");var i=e.annexList.map(function(e){return e.fileId});e.upFilesParams.fileIds=i.join(","),e.upFilesParams.crmCompanyId=e.id,Object(l.M)(e.upFilesParams).then(function(t){200===t.code&&(e.getMaterialList(),e.upFilesParams={},e.downModalParams={},e.annexList=[],e.modalList=[],e.$refs.upload.clearFiles(),e.addAnnexModal=!1)})}})},cananlAddAnnex:function(){this.upFilesParams={},this.downModalParams={},this.annexList=[],this.modalList=[],this.addAnnexModal=!1},downFileHandle:function(e){var t=this;if(e.fileId||this.annexList.forEach(function(t){t.fileName==e.name&&(e=t)}),e.fileId){var a={companyId:this.$store.getters.companyId,fileId:e.fileId};Object(l.q)(a).then(function(e){if(200==e.code){var a=e.data.replace(/http/,"https");window.open(a)}else t.$message({type:"error",message:e.message})})}},delFileList:function(e,t,a){var i=this,s=t.fileIdsList.filter(function(e){if(e.fileId!==a.fileId)return e}).map(function(e){return e.fileId}).join(","),n={applyFileId:t.applyFileId,fileIds:s};Object(l.h)(n).then(function(e){200===e.code&&(i.getMaterialList(),i.$message.success("删除成功"))})}},filters:{toCN:function(e){var t=["一","二","三","四","五","六","七","八","九","十"],a=parseInt(e)+1;return a<=10?t[a-1]:a<=100?a<20?"十"+t[a%10-1]:a%10==0?t[Math.floor(a/10)-1]+"十":t[Math.floor(a/10)-1]+"十"+t[a%10-1]:void 0}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"customer-files"},[a("p",{staticStyle:{"margin-bottom":"10px","font-size":"12px",color:"#ff3f4b","line-height":"normal"}},[e._v("限制文件不超过"+e._s(e.$store.getters.singleCapacity/1024+"M"))]),e._v(" "),a("el-button",{staticClass:"up-file-btn",on:{click:e.upFileBtnHandle}},[e._v("上传附件")]),e._v(" "),e._l(e.listData,function(t,i){return a("div",{staticClass:"one-list"},[a("div",{staticClass:"title"},[e._v("\n      "+e._s(e._f("toCN")(i))+"、"+e._s(t.projectName)+"\n      "),t.applyYear||t.applyBatchNo?a("span",[e._v("\n        (年份："+e._s(t.applyYear&&""!==t.applyYear?t.applyYear:"-")+" 批次："+e._s(t.applyBatchNo&&""!==t.applyBatchNo?t.applyBatchNo:"-")+")\n      ")]):e._e()]),e._v(" "),e._l(t.crmProjectApplyFileVos,function(i,s){return a("div",{staticClass:"two-list"},[a("div",{staticClass:"title"},[e._v("\n        ("+e._s(s+1)+") 、"+e._s(i.materialTypeName)+"\n        "),a("div",{staticClass:"three-list"},[a("ul",{staticClass:"file-list"},e._l(i.fileIdsList,function(s,l){return a("li",[e._v("\n              "+e._s(l+1)+" . "+e._s(s.fileName)+"\n              "),a("span",{staticClass:"read",on:{click:function(t){return e.downFileHandle(s)}}},[e._v("下载")]),e._v(" "),e.allowDelApplyFile.twoAllow?a("span",{staticClass:"del",on:{click:function(a){return e.delFileList(t,i,s)}}},[e._v("删除")]):e._e()])}),0)])])])})],2)}),e._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],staticClass:"editorUserModal",attrs:{title:"上传附件","before-close":e.cananlAddAnnex,visible:e.addAnnexModal,width:"650px"},on:{"update:visible":function(t){e.addAnnexModal=t}}},[a("el-form",{ref:"upFilesModal",attrs:{model:e.upFilesParams,rules:e.upFilesRules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"项目：",prop:"orderId"}},[a("el-select",{on:{change:e.projectChange},model:{value:e.upFilesParams.orderId,callback:function(t){e.$set(e.upFilesParams,"orderId",t)},expression:"upFilesParams.orderId"}},e._l(e.projectListData,function(e,t){return a("el-option",{key:t,attrs:{value:e.orderId,label:e.projectName}})}),1)],1),e._v(" "),1==e.upFilesParams.orderId?a("el-form-item",{attrs:{label:"",prop:"projectName"}},[a("el-input",{attrs:{maxlength:"100",placeholder:"项目名称"},model:{value:e.upFilesParams.projectName,callback:function(t){e.$set(e.upFilesParams,"projectName",t)},expression:"upFilesParams.projectName"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"附件分类：",prop:"materialType"}},[a("el-select",{on:{change:e.annaxChange},model:{value:e.upFilesParams.materialType,callback:function(t){e.$set(e.upFilesParams,"materialType",t)},expression:"upFilesParams.materialType"}},e._l(e.annexTypeData,function(e){return a("el-option",{key:e.dictId,attrs:{value:e.dictId,label:e.dictName}})}),1)],1),e._v(" "),0!==e.modalList.length?a("el-form-item",{attrs:{label:"下载模板："}},[a("ul",{staticClass:"model-files-list"},e._l(e.modalList,function(t,i){return a("li",{key:i},[e._v("\n            "+e._s(i+1)+"."+e._s(t.fileName)+" "),a("span",{staticClass:"down",on:{click:function(a){return e.downFileHandle(t)}}},[e._v("下载")])])}),0)]):e._e(),e._v(" "),a("el-form-item",{staticClass:"update-file-form"},[a("div",{staticStyle:{width:"100px",color:"#606266","font-weight":"bold","padding-left":"7px"}},[a("span",{staticStyle:{color:"#F56C6C","margin-right":"4px"}},[e._v("*")]),e._v("上传附件：")]),e._v(" "),a("div",[a("el-upload",{ref:"upload",staticClass:"upload-box upload-box-width",staticStyle:{display:"inline-block",width:"100%"},attrs:{"http-request":e.handleFilesUpload,"on-remove":e.delFilesUploadHandle,"file-list":e.fileList,"show-file-list":!0}},[a("el-button",{staticClass:"add-file-btn"},[e._v("增加文件")])],1)],1)])],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"setBtn",on:{click:e.setAddAnnex}},[e._v("确 定")]),e._v(" "),a("el-button",{staticClass:"cananl",on:{click:e.cananlAddAnnex}},[e._v("取 消")])],1)],1)],2)},staticRenderFns:[]};var m=a("VU/8")(p,f,!1,function(e){a("tM/F")},"data-v-8234ec48",null);t.default=m.exports},"tM/F":function(e,t,a){var i=a("88aI");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a("rjj0")("63aab9ff",i,!0)}});