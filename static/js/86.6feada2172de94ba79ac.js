webpackJsonp([86],{"/Qqb":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),i=a.n(n),r=a("fZjL"),o=a.n(r),l=a("Q5rI"),s=a("AvzY"),d=a("ZWSL"),p=a("kvU2"),m=a.n(p),c=a("jlNU"),f=a("gu65"),b={data:function(){return{pageType:"",titleName:"",userNameList:[],userNameTotal:null,userParams:{page:0,pageSize:20},patentType:[],caseState:[],form:{crmCompanyId:"",crmCompanyName:"",patentName:"",patentNo:"",patentType:"",applyDate:"",publicDate:"",firstApplyName:"",inventorName:"",annualFeeDate:"",caseState:"",updateTime:"",patentRemark:"",file:""},rules:{crmCompanyId:[{required:!0,message:"请选择客户",trigger:"blur"}],patentName:[{required:!0,message:"请输入专利名称",trigger:"blur"}],patentNo:[{required:!0,message:"请输入申请号/专利号",trigger:"blur"}],patentType:[{required:!0,message:"请选择专利类型",trigger:"blur"}],caseState:[{required:!0,message:"请选择案件状态",trigger:"blur"}]},fileTemp:[],dialogImageUrl:"",dialogVisible:!1,picFormData:null,uploadDisabled:!1,patentTypeName:null,caseStateName:null,loading:!1,allowAdd:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:PROPERTY:PATENT:INSERT"),allowUpdate:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:PROPERTY:PATENT:UPDATE"),allowDetail:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:PROPERTY:PATENT:DETAILS")}},created:function(){this.getUserNameData()},mounted:function(){this.getPatentData(),this.getCaseData()},directives:{loadMore:{bind:function(e,t){e.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&t.value()})}}},activated:function(){var e=this;this.pageType=this.$route.query.type,this.getUserNameData(),this.isHeaderName(),this.form={crmCompanyId:"",crmCompanyName:"",patentName:"",patentNo:"",patentType:"",applyDate:"",publicDate:"",firstApplyName:"",inventorName:"",annualFeeDate:"",caseState:"",updateTime:"",patentRemark:"",file:""},this.fileTemp=[],this.dialogImageUrl="",this.$route.query.companyId&&(this.form.crmCompanyId=this.$route.query.companyId,this.form.crmCompanyName=this.$route.query.companyNames),"edit"!==this.pageType&&"read"!==this.pageType||setTimeout(function(){e.getFormDetail()},100),"read"===this.pageType&&(this.uploadDisabled=!0)},methods:{setCompanyNameHandle:function(e){var t=this;this.userNameList.forEach(function(a){a.crmCompanyId===e&&(t.form.crmCompanyName=a.companyName)})},getPatentData:function(){var e=this;Object(l.d)({keyList:"DICT:PATENT_TYPE"}).then(function(t){200===t.code&&(e.patentType=t.data["DICT:PATENT_TYPE"])})},getCaseData:function(){var e=this;Object(l.d)({keyList:"DICT:CASE_STATUS"}).then(function(t){200===t.code&&(e.caseState=t.data["DICT:CASE_STATUS"])})},getUserNameData:function(){var e=this;this.userParams.page=0,Object(s.h)(this.userParams).then(function(t){200===t.code&&(e.userNameList=t.data.data,e.userNameTotal=t.data.total)})},loadMore:function(){var e=this;this.userNameList.length>=this.userNameTotal||(this.userParams.page+=20,Object(s.h)(this.userParams).then(function(t){200===t.code&&(e.userNameList=e.userNameList.concat(t.data.data))}))},isHeaderName:function(){"read"===this.pageType?this.titleName="专利详情":"add"===this.pageType?this.titleName="新增专利":"edit"===this.pageType&&(this.titleName="编辑专利")},handleRemove:function(e,t){},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handlePic:function(e,t){var a=e.raw.name.substr(e.raw.name.lastIndexOf("."));".jpg"===a||".png"===a?(t.length>1&&t.splice(0,1),this.form.file=e.raw):this.$message({type:"warning",message:"请上传有效的.jpg或.png文件"})},handSubmit:function(e){var t=this;this.$refs[e].validate(function(e,a){if(!e)return t.callbackError(a),!1;o()(t.form).forEach(function(e){null!==t.form[e]&&void 0!==t.form[e]||(t.form[e]="")});var n=new FormData;if(n.append("companyId",t.form.crmCompanyId),n.append("companyName",t.form.crmCompanyName),n.append("patentName",t.form.patentName),n.append("patentNo",t.form.patentNo),n.append("patentType",t.form.patentType),n.append("applyDate",t.form.applyDate),n.append("publicDate",t.form.publicDate),n.append("firstApplyName",t.form.firstApplyName),n.append("inventorName",t.form.inventorName),n.append("annualFeeDate",t.form.annualFeeDate),n.append("caseState",t.form.caseState),n.append("updateTime",t.form.updateTime),n.append("patentRemark",t.form.patentRemark),0!==t.fileTemp.length){var i=t.fileTemp.map(function(e){return e.fileId});t.form.fileIds=i.join(",")}n.append("fileIds",t.form.fileIds),Object(d.t)(n).then(function(e){200===e.code&&(t.$message({type:"success",message:e.message}),t.form={},t.fileTemp=[],t.$store.commit("SET_PATENT_SCROLL",0),t.cananlHandle())})})},getFormDetail:function(){var e=this;this.allowDetail.twoAllow?Object(d.j)({patentId:this.$route.query.patentId}).then(function(t){if(200===t.code){var a=JSON.parse(i()(t.data));if(a.crmCompanyId=a.companyId,a.crmCompanyName=a.companyName,o()(e.form).forEach(function(e){a.hasOwnProperty(e)||(a[e]="")}),e.form=a,"read"===e.pageType&&(e.patentType.forEach(function(a){t.data.patentType==a.dictId&&(e.patentTypeName=m()(a.dictName))}),e.caseState.forEach(function(a){t.data.caseState==a.dictId&&(e.caseStateName=m()(a.dictName))})),t.data.fileIds&&""!==t.data.fileIds){var n=t.data.fileIds.split(",");Object(l.k)({fileIds:n,haveView:!0}).then(function(t){200==t.code?(t.data.forEach(function(e){e.isShowDan=!1}),e.fileTemp=t.data):e.$message.warning(t.message)})}}}):this.$message.warning("抱歉，您没有权限获取此详情")},handSubmitEdit:function(e){var t=this;this.$refs[e].validate(function(e,a){if(!e)return t.callbackError(a),!1;o()(t.form).forEach(function(e){null!==t.form[e]&&void 0!==t.form[e]||(t.form[e]="")});var n=new FormData;if(n.append("companyId",t.form.crmCompanyId),n.append("companyName",t.form.crmCompanyName),n.append("patentName",t.form.patentName),n.append("patentNo",t.form.patentNo),n.append("patentType",t.form.patentType),n.append("applyDate",t.form.applyDate),n.append("publicDate",t.form.publicDate),n.append("firstApplyName",t.form.firstApplyName),n.append("inventorName",t.form.inventorName),n.append("annualFeeDate",t.form.annualFeeDate),n.append("caseState",t.form.caseState),n.append("updateTime",t.form.updateTime),n.append("patentRemark",t.form.patentRemark),0!==t.fileTemp.length){var i=t.fileTemp.map(function(e){return e.fileId});t.form.fileIds=i.join(",")}n.append("fileIds",t.form.fileIds),n.append("patentId",t.$route.query.patentId),Object(d.x)(n).then(function(e){200===e.code&&(t.$message({type:"success",message:e.message}),t.form={},t.fileTemp=[],t.$store.commit("SET_PATENT_SCROLL",0),t.cananlHandle())})})},cananlHandle:function(){var e=this;this.$router.go(-1),this.$store.state.tagsView.visitedViews.forEach(function(t,a){"客户中心-专利详情"==t.name&&(sessionStorage.removeItem("demandForm"),e.$store.state.tagsView.visitedViews.splice(a,1))}),this.form={},this.fileTemp=[]},callbackError:function(e){for(var t in e){this.tempArr=e[t];break}this.$message({type:"error",message:this.tempArr[0].message})},resetCompanyHandle:function(){this.userParams.companyNameOnly="",this.getUserNameData()},remoteMethod:function(e){var t=this;""!==e?(this.loading=!0,setTimeout(function(){t.loading=!1,t.getCompanyData(e)},100)):(this.userParams.companyNameOnly="",this.loading=!0,setTimeout(function(){t.loading=!1,t.getUserNameData()},100))},getCompanyData:function(e){var t=this;this.userParams.page=0,this.userParams.companyNameOnly=e,Object(s.h)(this.userParams).then(function(e){200==e.code&&(t.userNameList=e.data.data,t.userNameTotal=e.data.total)})},handleCheckUpload:function(e){var t=this;if(e.file.name.length>=150)return this.$message.error("文件名称超长，请检查"),void(this.declareFileList=JSON.parse(i()(this.declareFileList)));var a=e.file.name.split("."),n=Object(f.f)(this.$store.getters.companyName,"专利",a[0])+"."+a[a.length-1];Object(c.a)(n,e.file,e).then(function(i){if(i){var r=[],o={fileName:e.file.name,filePath:n,fileSize:e.file.size,fileType:a[a.length-1],parentType:4};r.push(o);var s={companyId:t.$store.getters.companyId,companyName:t.$store.getters.companyName,addFileDtos:r,haveView:!0};Object(l.a)(s).then(function(e){200==e.code&&(t.$message.success("上传成功"),e.data[0].isShowDan=!1,t.fileTemp.push(e.data[0]))})}})},filesOver:function(e){this.fileTemp[e].isShowDan=!0},filesOut:function(e){this.fileTemp[e].isShowDan=!1},readBigPicHandle:function(e){this.dialogImageUrl=e.fileUrl,this.dialogVisible=!0},delFilePicHandle:function(e){this.fileTemp.splice(e,1)}}},A={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"patent-form"},[a("el-form",{ref:"ruleForm",staticClass:"form-box",attrs:{rules:e.rules,model:e.form,"label-width":"auto"}},[a("div",{staticClass:"cart-bar"},[a("div",{staticClass:"cart-title"},[a("div",{staticClass:"line"}),e._v(" "),a("div",{staticClass:"title-name"},[e._v("专利列表 - "+e._s(e.titleName))])]),e._v(" "),a("div",{staticClass:"cart-body"},[a("el-form-item",{staticClass:"form-input",attrs:{label:"客户名称：",prop:"crmCompanyId"}},["add"!=e.pageType||this.$route.query.companyNames?this.$route.query.companyNames?a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:this.$route.query.companyNames,callback:function(t){e.$set(this.$route.query,"companyNames",t)},expression:"this.$route.query.companyNames"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.companyName,callback:function(t){e.$set(e.form,"companyName",t)},expression:"form.companyName"}}):a("el-select",{directives:[{name:"loadMore",rawName:"v-loadMore",value:e.loadMore,expression:"loadMore"}],staticClass:"user-name-item",attrs:{placeholder:"请选择客户名称",disabled:this.$route.query.isUser,filterable:"",remote:"",loading:e.loading,"remote-method":e.remoteMethod,clearable:""},on:{change:e.setCompanyNameHandle,focus:e.resetCompanyHandle},model:{value:e.form.crmCompanyId,callback:function(t){e.$set(e.form,"crmCompanyId",t)},expression:"form.crmCompanyId"}},e._l(e.userNameList,function(e){return a("el-option",{key:e.crmCompanyId,attrs:{value:e.crmCompanyId,label:e.companyName}})}),1)],1),e._v(" "),a("el-form-item",{staticClass:"form-input",attrs:{label:"专利名称：",prop:"patentName"}},["read"!==e.pageType?a("el-input",{staticClass:"patent-name-item",attrs:{maxlength:"50",placeholder:"请输入专利名称"},model:{value:e.form.patentName,callback:function(t){e.$set(e.form,"patentName","string"==typeof t?t.trim():t)},expression:"form.patentName"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.patentName,callback:function(t){e.$set(e.form,"patentName",t)},expression:"form.patentName"}})],1)],1)]),e._v(" "),a("div",{staticClass:"cart-bar"},[a("div",{staticClass:"cart-body"},[a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{sm:24,md:12,lg:10}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"申请号/专利号：",prop:"patentNo"}},["read"!==e.pageType?a("el-input",{staticClass:"patent-name-item",attrs:{placeholder:"请输入申请号/专利号",maxlength:"50"},model:{value:e.form.patentNo,callback:function(t){e.$set(e.form,"patentNo","string"==typeof t?t.trim():t)},expression:"form.patentNo"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.patentNo,callback:function(t){e.$set(e.form,"patentNo",t)},expression:"form.patentNo"}})],1)],1),e._v(" "),a("el-col",{attrs:{sm:24,md:12,lg:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"专利类型：",prop:"patentType"}},["read"!==e.pageType?a("el-select",{staticClass:"user-name-item",attrs:{placeholder:"请选择专利类型"},model:{value:e.form.patentType,callback:function(t){e.$set(e.form,"patentType",t)},expression:"form.patentType"}},e._l(e.patentType,function(e){return a("el-option",{key:e.dictId,attrs:{value:e.dictId,label:e.dictName}})}),1):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.patentTypeName,callback:function(t){e.patentTypeName=t},expression:"patentTypeName"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{md:10}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"申请日："}},["read"!==e.pageType?a("el-date-picker",{staticClass:"select-date",attrs:{type:"date",placeholder:"选择申请日","value-format":"yyyy-MM-dd"},model:{value:e.form.applyDate,callback:function(t){e.$set(e.form,"applyDate",t)},expression:"form.applyDate"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.applyDate,callback:function(t){e.$set(e.form,"applyDate",t)},expression:"form.applyDate"}})],1)],1),e._v(" "),a("el-col",{attrs:{md:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"公开（公告）日："}},["read"!==e.pageType?a("el-date-picker",{staticClass:"select-date",attrs:{type:"date",placeholder:"选择公开（公告）日","value-format":"yyyy-MM-dd"},model:{value:e.form.publicDate,callback:function(t){e.$set(e.form,"publicDate",t)},expression:"form.publicDate"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.publicDate,callback:function(t){e.$set(e.form,"publicDate",t)},expression:"form.publicDate"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{md:10}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"第一申请人："}},["read"!==e.pageType?a("el-input",{staticClass:"patent-name-item",staticStyle:{width:"300px"},attrs:{maxlength:"50",placeholder:"请输入第一申请人",clearable:""},model:{value:e.form.firstApplyName,callback:function(t){e.$set(e.form,"firstApplyName",t)},expression:"form.firstApplyName"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.firstApplyName,callback:function(t){e.$set(e.form,"firstApplyName",t)},expression:"form.firstApplyName"}})],1)],1),e._v(" "),a("el-col",{attrs:{md:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"发明人："}},["read"!==e.pageType?a("el-input",{staticClass:"patent-name-item",staticStyle:{width:"300px"},attrs:{maxlength:"50",placeholder:"请输入发明人",clearable:""},model:{value:e.form.inventorName,callback:function(t){e.$set(e.form,"inventorName",t)},expression:"form.inventorName"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.inventorName,callback:function(t){e.$set(e.form,"inventorName",t)},expression:"form.inventorName"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{md:10}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"缴年费截止日："}},["read"!==e.pageType?a("el-date-picker",{staticClass:"select-date",attrs:{type:"date",placeholder:"选择截止日","value-format":"yyyy-MM-dd"},model:{value:e.form.annualFeeDate,callback:function(t){e.$set(e.form,"annualFeeDate",t)},expression:"form.annualFeeDate"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.annualFeeDate,callback:function(t){e.$set(e.form,"annualFeeDate",t)},expression:"form.annualFeeDate"}})],1)],1),e._v(" "),a("el-col",{attrs:{md:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"案件状态：",prop:"caseState"}},["read"!==e.pageType?a("el-select",{staticClass:"user-name-item",attrs:{placeholder:"请选择案件状态"},model:{value:e.form.caseState,callback:function(t){e.$set(e.form,"caseState",t)},expression:"form.caseState"}},e._l(e.caseState,function(e){return a("el-option",{key:e.dictId,attrs:{value:e.dictId,label:e.dictName}})}),1):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.caseStateName,callback:function(t){e.caseStateName=t},expression:"caseStateName"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{md:10}},["read"===e.pageType&&""!==e.pageType?a("el-form-item",{staticClass:"form-input",attrs:{label:"更新时间："}},[a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.updateTime,callback:function(t){e.$set(e.form,"updateTime",t)},expression:"form.updateTime"}})],1):e._e()],1),e._v(" "),a("el-col",{attrs:{md:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"摘要："}},["read"!==e.pageType?a("el-input",{staticClass:"patent-area",attrs:{type:"textarea",resize:"none"},model:{value:e.form.patentRemark,callback:function(t){e.$set(e.form,"patentRemark",t)},expression:"form.patentRemark"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:e.form.patentRemark,callback:function(t){e.$set(e.form,"patentRemark",t)},expression:"form.patentRemark"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{md:24}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"摘要附图："}},[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("ul",{staticClass:"file-list"},e._l(e.fileTemp,function(t,n){return a("li",{on:{mousemove:function(t){return e.filesOver(n)},mouseout:function(t){return e.filesOut(n)}}},[a("el-image",{attrs:{src:t.fileUrl,fit:e.contain}}),e._v(" "),a("transition",{attrs:{name:"el-fade-in-linear"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowDan,expression:"item.isShowDan"}],staticClass:"transition-box"},[a("i",{staticClass:"el-icon-zoom-in",on:{click:function(a){return e.readBigPicHandle(t)}}}),e._v(" "),"read"!==e.pageType?a("i",{staticClass:"el-icon-delete",staticStyle:{"margin-left":"12px"},on:{click:function(t){return e.delFilePicHandle(n)}}}):e._e()])])],1)}),0),e._v(" "),a("el-upload",{staticClass:"upload-pic",attrs:{"http-request":e.handleCheckUpload,"file-list":e.fileTemp,"show-file-list":!1,action:"",accept:".jpg,.png,.JPG,.JPEG"}},[a("i",{staticClass:"icon-plus el-icon-plus"})])],1)])],1)],1)],1)])]),e._v(" "),a("el-dialog",{staticClass:"pic-modal",attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"pic"},[a("img",{attrs:{src:e.dialogImageUrl}})])]),e._v(" "),a("div",{staticClass:"btn-group-handle"},["add"==e.pageType&&e.allowAdd.twoAllow?a("el-button",{directives:[{name:"preventReClick",rawName:"v-preventReClick"}],staticClass:"btn blue",on:{click:function(t){return e.handSubmit("ruleForm")}}},[e._v("确定\n    ")]):e._e(),e._v(" "),"edit"==e.pageType&&e.allowUpdate.twoAllow?a("el-button",{directives:[{name:"preventReClick",rawName:"v-preventReClick"}],staticClass:"btn blue",on:{click:function(t){return e.handSubmitEdit("ruleForm")}}},[e._v("确定\n    ")]):e._e(),e._v(" "),a("el-button",{staticClass:"btn cananl",on:{click:e.cananlHandle}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var u=a("VU/8")(b,A,!1,function(e){a("YGZd")},"data-v-4d2b3ebd",null);t.default=u.exports},"2QDs":function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,"\nul li[data-v-4d2b3ebd] {\n  list-style: none;\n}\n.patent-form[data-v-4d2b3ebd] {\n  margin: auto 5%;\n}\n.patent-form .title[data-v-4d2b3ebd] {\n  margin-top: 20px;\n  padding-left: 20px;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n}\n.patent-form .form-box .cart-bar[data-v-4d2b3ebd] {\n  background: #fff;\n  margin-top: 20px;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n  border-radius: 4px;\n}\n.patent-form .form-box .cart-bar .cart-title[data-v-4d2b3ebd] {\n  padding: 16px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbe9ff;\n}\n.patent-form .form-box .cart-bar .cart-title .line[data-v-4d2b3ebd] {\n  width: 3px;\n  height: 14px;\n  background: #05aaff;\n  margin-right: 10px;\n}\n.patent-form .form-box .cart-bar .cart-title .title-name[data-v-4d2b3ebd] {\n  font-size: 16px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  color: #042b40;\n}\n.patent-form .form-box .cart-bar .cart-body[data-v-4d2b3ebd] {\n  padding: 20px 0 1px 12px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-4d2b3ebd] .el-form-item__label {\n  font-weight: normal;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n  border-radius: 0;\n  white-space: nowrap;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-4d2b3ebd] {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-4d2b3ebd] .el-input {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-4d2b3ebd] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  color: #444444;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-name-item[data-v-4d2b3ebd] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] {\n  width: 300px !important;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] .el-input__inner,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] .el-date-editor.el-input,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] .el-date-editor.el-input__inner {\n  width: 300px !important;\n  border-radius: 0;\n  border: 0;\n  background: none;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-area[data-v-4d2b3ebd] .el-textarea__inner {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-4d2b3ebd] .el-input.is-disabled .el-input__inner {\n  color: #444;\n}\n.patent-form .upload-pic[data-v-4d2b3ebd] .el-upload {\n  width: 100px;\n  height: 100px;\n  line-height: 110px;\n  background-color: #fbfdff;\n  border: 1px dashed #c0ccda;\n  border-radius: 6px;\n}\n.patent-form .upload-pic[data-v-4d2b3ebd] .el-upload .icon-plus {\n  color: #8c939d;\n  font-size: 28px;\n}\n.patent-form .upload-pic[data-v-4d2b3ebd] .el-upload-list--picture-card .el-upload-list__item {\n  width: 100px;\n  height: 100px;\n}\n.patent-form .pic-modal .pic[data-v-4d2b3ebd] {\n  max-width: 920px;\n  max-height: 614px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.patent-form .pic-modal .pic .img[data-v-4d2b3ebd] {\n  width: auto;\n  height: 100%;\n}\n.patent-form .btn-group-handle[data-v-4d2b3ebd] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: 10px;\n}\n.patent-form .btn-group-handle .btn[data-v-4d2b3ebd] {\n  padding: 0;\n  width: 100px;\n  height: 38px;\n  font-size: 16px;\n}\n.patent-form .btn-group-handle .btn.blue[data-v-4d2b3ebd] {\n  color: #fff;\n  background: -webkit-gradient(linear, left top, left bottom, from(#9bddff), to(#37bbff));\n  background: linear-gradient(180deg, #9bddff 0%, #37bbff 100%);\n}\n.patent-form .btn-group-handle .btn.cananl[data-v-4d2b3ebd] {\n  color: #444444;\n  background: #ffffff;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n}\n.file-list[data-v-4d2b3ebd] {\n  margin-right: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.file-list li[data-v-4d2b3ebd] {\n  position: relative;\n  margin-right: 10px;\n  border-radius: 4px;\n  width: 100px;\n  height: 100px;\n  border: 1px solid #c0ccda;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n  padding: 8px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.file-list li img[data-v-4d2b3ebd] {\n  width: auto;\n}\n.file-list li .transition-box[data-v-4d2b3ebd] {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.file-list li .transition-box i[data-v-4d2b3ebd] {\n  color: #fff;\n  cursor: pointer;\n  font-size: 22px;\n}\n.file-list li[data-v-4d2b3ebd]:last-child {\n  margin-right: 0;\n}\n[data-v-4d2b3ebd] .disabled .el-upload--picture-card {\n  display: none !important;\n}\n[data-v-4d2b3ebd] .disabled .el-upload-list__item-delete {\n  display: none !important;\n}\n","",{version:3,sources:["H:/chengguoyun-web/src/views/customerManage/customerCenter/patentForm.vue"],names:[],mappings:";AACA;EACE,iBAAiB;CAClB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,iBAAiB;EACjB,mBAAmB;EACnB,gBAAgB;EAChB,8BAA8B;CAC/B;AACD;EACE,iBAAiB;EACjB,iBAAiB;EACjB,uDAAuD;UAC/C,+CAA+C;EACvD,mBAAmB;CACpB;AACD;EACE,cAAc;EACd,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,iCAAiC;CAClC;AACD;EACE,WAAW;EACX,aAAa;EACb,oBAAoB;EACpB,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,6BAA6B;EAC7B,iBAAiB;EACjB,eAAe;CAChB;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,oBAAoB;EACpB,gBAAgB;EAChB,8BAA8B;EAC9B,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,aAAa;CACd;AACD;EACE,aAAa;CACd;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,iBAAiB;EACjB,UAAU;EACV,eAAe;EACf,+CAA+C;CAChD;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,iBAAiB;EACjB,UAAU;EACV,+CAA+C;CAChD;AACD;EACE,wBAAwB;CACzB;AACD;;;EAGE,wBAAwB;EACxB,iBAAiB;EACjB,UAAU;EACV,iBAAiB;EACjB,+CAA+C;CAChD;AACD;EACE,aAAa;CACd;AACD;EACE,YAAY;CACb;AACD;EACE,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,0BAA0B;EAC1B,2BAA2B;EAC3B,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,aAAa;EACb,cAAc;CACf;AACD;EACE,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;CACjC;AACD;EACE,YAAY;EACZ,aAAa;CACd;AACD;EACE,iBAAiB;EACjB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;EAChC,oBAAoB;CACrB;AACD;EACE,WAAW;EACX,aAAa;EACb,aAAa;EACb,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,wFAAwF;EACxF,8DAA8D;CAC/D;AACD;EACE,eAAe;EACf,oBAAoB;EACpB,uDAAuD;UAC/C,+CAA+C;CACxD;AACD;EACE,mBAAmB;EACnB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;CACf;AACD;EACE,mBAAmB;EACnB,mBAAmB;EACnB,mBAAmB;EACnB,aAAa;EACb,cAAc;EACd,0BAA0B;EAC1B,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;EAChC,iBAAiB;EACjB,aAAa;EACb,+BAA+B;UACvB,uBAAuB;CAChC;AACD;EACE,YAAY;CACb;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,OAAO;EACP,+BAA+B;EAC/B,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;CACjC;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,gBAAgB;CACjB;AACD;EACE,gBAAgB;CACjB;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,yBAAyB;CAC1B",file:"patentForm.vue",sourcesContent:["\nul li[data-v-4d2b3ebd] {\n  list-style: none;\n}\n.patent-form[data-v-4d2b3ebd] {\n  margin: auto 5%;\n}\n.patent-form .title[data-v-4d2b3ebd] {\n  margin-top: 20px;\n  padding-left: 20px;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n}\n.patent-form .form-box .cart-bar[data-v-4d2b3ebd] {\n  background: #fff;\n  margin-top: 20px;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n  border-radius: 4px;\n}\n.patent-form .form-box .cart-bar .cart-title[data-v-4d2b3ebd] {\n  padding: 16px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbe9ff;\n}\n.patent-form .form-box .cart-bar .cart-title .line[data-v-4d2b3ebd] {\n  width: 3px;\n  height: 14px;\n  background: #05aaff;\n  margin-right: 10px;\n}\n.patent-form .form-box .cart-bar .cart-title .title-name[data-v-4d2b3ebd] {\n  font-size: 16px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  color: #042b40;\n}\n.patent-form .form-box .cart-bar .cart-body[data-v-4d2b3ebd] {\n  padding: 20px 0 1px 12px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-4d2b3ebd] .el-form-item__label {\n  font-weight: normal;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n  border-radius: 0;\n  white-space: nowrap;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-4d2b3ebd] {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-4d2b3ebd] .el-input {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-4d2b3ebd] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  color: #444444;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-name-item[data-v-4d2b3ebd] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] {\n  width: 300px !important;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] .el-input__inner,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] .el-date-editor.el-input,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-4d2b3ebd] .el-date-editor.el-input__inner {\n  width: 300px !important;\n  border-radius: 0;\n  border: 0;\n  background: none;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-area[data-v-4d2b3ebd] .el-textarea__inner {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-4d2b3ebd] .el-input.is-disabled .el-input__inner {\n  color: #444;\n}\n.patent-form .upload-pic[data-v-4d2b3ebd] .el-upload {\n  width: 100px;\n  height: 100px;\n  line-height: 110px;\n  background-color: #fbfdff;\n  border: 1px dashed #c0ccda;\n  border-radius: 6px;\n}\n.patent-form .upload-pic[data-v-4d2b3ebd] .el-upload .icon-plus {\n  color: #8c939d;\n  font-size: 28px;\n}\n.patent-form .upload-pic[data-v-4d2b3ebd] .el-upload-list--picture-card .el-upload-list__item {\n  width: 100px;\n  height: 100px;\n}\n.patent-form .pic-modal .pic[data-v-4d2b3ebd] {\n  max-width: 920px;\n  max-height: 614px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.patent-form .pic-modal .pic .img[data-v-4d2b3ebd] {\n  width: auto;\n  height: 100%;\n}\n.patent-form .btn-group-handle[data-v-4d2b3ebd] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: 10px;\n}\n.patent-form .btn-group-handle .btn[data-v-4d2b3ebd] {\n  padding: 0;\n  width: 100px;\n  height: 38px;\n  font-size: 16px;\n}\n.patent-form .btn-group-handle .btn.blue[data-v-4d2b3ebd] {\n  color: #fff;\n  background: -webkit-gradient(linear, left top, left bottom, from(#9bddff), to(#37bbff));\n  background: linear-gradient(180deg, #9bddff 0%, #37bbff 100%);\n}\n.patent-form .btn-group-handle .btn.cananl[data-v-4d2b3ebd] {\n  color: #444444;\n  background: #ffffff;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n}\n.file-list[data-v-4d2b3ebd] {\n  margin-right: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.file-list li[data-v-4d2b3ebd] {\n  position: relative;\n  margin-right: 10px;\n  border-radius: 4px;\n  width: 100px;\n  height: 100px;\n  border: 1px solid #c0ccda;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: hidden;\n  padding: 8px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.file-list li img[data-v-4d2b3ebd] {\n  width: auto;\n}\n.file-list li .transition-box[data-v-4d2b3ebd] {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.file-list li .transition-box i[data-v-4d2b3ebd] {\n  color: #fff;\n  cursor: pointer;\n  font-size: 22px;\n}\n.file-list li[data-v-4d2b3ebd]:last-child {\n  margin-right: 0;\n}\n[data-v-4d2b3ebd] .disabled .el-upload--picture-card {\n  display: none !important;\n}\n[data-v-4d2b3ebd] .disabled .el-upload-list__item-delete {\n  display: none !important;\n}\n"],sourceRoot:""}])},YGZd:function(e,t,a){var n=a("2QDs");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("db4a1e68",n,!0)}});
//# sourceMappingURL=86.6feada2172de94ba79ac.js.map