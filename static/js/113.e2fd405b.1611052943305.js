webpackJsonp([113],{"1E/3":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("mvHQ"),o=n.n(i),s=n("5aCZ"),a=n("pL5J"),r=n("Q5rI"),l=n("jlNU"),c=n("gu65"),p={components:{Tinymce:s.a},props:["noticeId","noticeType","policyDetail","noticeName","noticeDetail"],data:function(){return{newNoticeId:"",supply_way_list:[{dictName:"事后补偿",dictId:"1"},{dictName:"无偿补偿",dictId:"2"},{dictName:"其他",dictId:"3"}],form:{},fileList:[],select_projects:[],isCreate:this.$route.query.is_create,isEdit:this.$route.query.is_edit,isCheck:this.$route.query.is_check}},activated:function(){},methods:{handlePoliceUpload:function(e){var t=this;if(!this.form.provinceId||""==this.form.provinceId)return this.$message.error("请先选择省"),void(this.fileList=JSON.parse(o()(this.fileList)));if(!this.form.publishDate||""==this.form.publishDate)return this.$message.error("请先选择发布日期"),void(this.fileList=JSON.parse(o()(this.fileList)));if(e.file.name.length>=150)return this.$message.error("文件名称超长，请检查"),void(this.fileList=JSON.parse(o()(this.fileList)));var n=e.file.size/1024;if(n>this.$store.getters.singleCapacity)return this.$message.error("文件大小超出限制，上传失败"),void(this.fileList=JSON.parse(o()(this.fileList)));if(n>this.$store.getters.totalCapacity)return this.$message.error("文件大小超出容量剩余空间，上传失败"),void(this.fileList=JSON.parse(o()(this.fileList)));var i=e.file.name.lastIndexOf("."),s=e.file.name.substring(0,i),a=e.file.name.substring(i+1,e.file.name.length),p=Object(c.f)(this.form.provinceName,this.form.cityName,this.form.publishDate,s)+"."+a;Object(l.a)(p,e.file,e).then(function(i){if(i){var s=[],l={fileName:e.file.name,filePath:p,fileSize:n,fileType:a,parentType:4};s.push(l);var c={companyId:t.$store.getters.companyId,companyName:t.$store.getters.companyName,addFileDtos:s,haveView:!0};Object(r.a)(c).then(function(e){200==e.code?(t.$message.success("上传成功"),t.fileList.push(e.data[0])):(t.$message.error("上传失败，请检查重新上传"),t.fileList=JSON.parse(o()(t.fileList)))})}else t.$message.error("文件出错或文件已存在，无法覆盖"),t.fileList=JSON.parse(o()(t.fileList))})},delFileHandle:function(e){this.fileList.splice(e,1)},policyHandSubmit:function(e){var t=this;this.$refs[e].validate(function(e,n){if(!e)return!1;if(void 0!=t.noticeName&&""!=t.noticeName)if(void 0!=t.form.publishOrgan&&""!=t.form.publishOrgan&&null!=t.form.publishOrgan)if(void 0!=t.form.publishDate&&""!=t.form.publishDate&&null!=t.form.publishDate)if(!t.$route.query.is_create||void 0!=t.noticeId&&""!=t.noticeId&&null!=t.noticeId){if(0!==t.fileList.length){var i=t.fileList.map(function(e){return e.fileId});t.form.fileIds=i.join(",")}else t.form.fileIds="";var o=[];t.select_projects.forEach(function(e){e.policyNoticeProjectRelList.forEach(function(e){var t={projectId:e.projectId,projectLevel:e.projectLevel,subsidyDesc:e.subsidyDesc,subsidyPriceMin:"",subsidyPriceMax:""};o.push(t)})}),t.form.policyNoticeProjectRelList=o,t.form.noticeType=t.noticeType,t.form.noticeName=t.noticeName,t.$route.query.is_edit?(t.form.noticeId=t.$route.query.noticeId,Object(a.b)(t.form).then(function(e){200==e.code&&(t.$message.success("编辑成功!"),t.form={noticeType:1,noticeContent:"",noticeSummary:""},t.project_list_query={page:0,pageSize:10},t.fileList=[],t.select_projects=[],t.tempProjectsList=[],t.$refs.policyNoticeeditor.setContent(""),t.$refs.policyNoticeeditor2.setContent(""),t.closeCurrent(t.$store.state.tagsView.visitedViews,t.$route,"/policy"))})):(t.form.parentId=t.noticeId,Object(a.h)(t.form).then(function(e){200==e.code&&(t.$message.success("新建成功!"),t.form={noticeType:1,noticeContent:"",noticeSummary:""},t.project_list_query={page:0,pageSize:10},t.fileList=[],t.select_projects=[],t.tempProjectsList=[],t.$refs.policyNoticeeditor.setContent(""),t.$refs.policyNoticeeditor2.setContent(""),t.$emit("naticeByValue",t.form),t.$store.commit("SET_POLICY_SCROLL",0),t.closeCurrent(t.$store.state.tagsView.visitedViews,t.$route,"/policy"))}))}else t.$message.warning("请选择相关政策");else t.$message.warning("请选择发布日期");else t.$message.warning("请输入发布单位");else t.$message.warning("请输入名称")})},getFileDetail:function(e){var t=this,n=e.split(",");Object(r.k)({fileIds:n,haveView:!1}).then(function(e){200==e.code?t.fileList=e.data:t.$message.warning(e.message)})},handlerCancel:function(){this.form={noticeType:1,noticeContent:"",noticeSummary:""},this.project_list_query={page:0,pageSize:10},this.fileList=[],this.select_projects=[],this.tempProjectsList=[],this.is_edit&&(this.$refs.policyNoticeeditor.setContent(""),this.$refs.policyNoticeeditor2.setContent("")),this.$emit("naticeByValue",this.form),this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,"/policy")},downFileHandle:function(e){var t=this;e.filePath&&Object(r.q)(e).then(function(e){if(200==e.code){var n=e.data.replace(/http/,"https");window.open(n),t.$message.success("下载成功")}})}},watch:{policyDetail:function(e,t){var n=this;if(void 0!==e&&"{}"!==o()(e)){this.form=e;var i={noticeId:this.noticeDetail.parentId,page:0,pageSize:10,noticeType:1};Object(a.e)(i).then(function(e){200==e.code&&(n.select_projects=n.form.policyNoticeProjectRelVos.map(function(e){return e.policyNoticeProjectSubsidyOrTimeVos.forEach(function(t){t.projectId=e.projectId}),e.policyNoticeProjectRelList=e.policyNoticeProjectSubsidyOrTimeVos,e.policyApplyMaterialListVos&&(0!==e.policyApplyMaterialListVos.length?e.policyApplyMaterialLists=e.policyApplyMaterialListVos.map(function(e){return e.templateFileIds&&""!==e.templateFileIds&&(e.templateFileIds=e.templateFileIds.split(","),Object(r.k)({fileIds:e.templateFileIds,haveView:!1}).then(function(t){200==t.code?e.templateFileIds=t.data:n.$message.warning(t.message)})),e}):n.$set(e,"policyApplyMaterialLists",[])),e}))})}}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"notice-form"},[i("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form,"label-width":"auto","label-position":"left"},nativeOn:{submit:function(e){e.preventDefault()}}},[i("el-card",{staticClass:"top-margin-10"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",{staticStyle:{color:"#6DDD81","font-weight":"bold",width:"3px"}},[e._v("|")]),e._v(" "),i("span",{staticClass:"index-content-title"},[e._v(" 基本信息")])]),e._v(" "),i("div",[i("el-row",{attrs:{type:"flex",gutter:10}},[i("el-col",{attrs:{span:10,offset:2}},[i("div",{staticClass:"address-bar",staticStyle:{"padding-left":"0"}},[i("label",{staticClass:"address-title"},[i("span",{staticStyle:{color:"#F56C6C"}},[e._v("*")]),e._v(" 发布单位：\n              ")]),e._v(" "),e.isCheck?i("div",[e._v(e._s(e.form.publishOrgan))]):i("el-input",{attrs:{placeholder:"请输入发布单位",maxlength:"50"},model:{value:e.form.publishOrgan,callback:function(t){e.$set(e.form,"publishOrgan","string"==typeof t?t.trim():t)},expression:"form.publishOrgan"}})],1)]),e._v(" "),i("el-col",{attrs:{span:10}},[i("div",{staticClass:"address-bar",staticStyle:{"padding-left":"0"}},[i("label",{staticClass:"address-title",staticStyle:{"padding-left":"20px"}},[i("span",{staticStyle:{color:"#F56C6C"}},[e._v("*")]),e._v(" 发布日期：\n              ")]),e._v(" "),e.isCheck?i("div",[e._v(e._s(e.form.publishDate))]):i("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:e.form.publishDate,callback:function(t){e.$set(e.form,"publishDate",t)},expression:"form.publishDate"}})],1)])],1),e._v(" "),i("el-row",{attrs:{type:"flex",gutter:10}},[i("el-col",{attrs:{span:10,offset:2}},[i("div",{staticClass:"address-bar",staticStyle:{"padding-left":"9px"}},[i("label",{staticClass:"address-title"},[e._v("\n                扶持方式：\n              ")]),e._v(" "),e.isCheck?i("div",[e._v(e._s(1==e.form.subsidyWay?"事后补偿":2==e.form.subsidyWay?"无偿补偿":3==e.form.subsidyWay?"其他":"-"))]):i("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"选择扶持方式"},model:{value:e.form.subsidyWay,callback:function(t){e.$set(e.form,"subsidyWay",t)},expression:"form.subsidyWay"}},e._l(e.supply_way_list,function(e){return i("el-option",{key:e.dictId,attrs:{value:e.dictId,label:e.dictName}})}),1)],1)])],1),e._v(" "),i("el-row",{attrs:{type:"flex",gutter:10}},[i("el-col",{attrs:{span:20,offset:2}},[i("el-form-item",{attrs:{label:"备注："}},[e.isCheck?i("span",[e._v(e._s(e.form.noticeRemark))]):i("el-input",{attrs:{type:"textarea",rows:3,placeholder:"请输入备注"},model:{value:e.form.noticeRemark,callback:function(t){e.$set(e.form,"noticeRemark",t)},expression:"form.noticeRemark"}})],1)],1)],1)],1)])],1),e._v(" "),i("el-card",{staticClass:"top-margin-10 project-massage"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("div",[i("span",{staticStyle:{color:"#05AAFF","font-weight":"bold",width:"3px"}},[e._v("|")]),e._v(" "),i("span",[e._v(" 补贴项目信息")])])]),e._v(" "),i("div",{staticClass:"list-box"},e._l(e.select_projects,function(t,n){return i("div",{staticClass:"item"},[i("div",{staticClass:"main-project"},[i("div",{staticClass:"left"},[i("div",{staticClass:"index"},[e._v(e._s(n+1))]),e._v(" "),i("div",{staticClass:"form-box"},[i("div",{staticClass:"project-form"},[i("div",{staticClass:"project-name"},[e._v("\n                  项目名称："+e._s(t.projectName)+"\n                ")]),e._v(" "),e._l(t.policyNoticeProjectRelList,function(t,n){return i("div",{staticClass:"project-sub-list"},[i("div",{staticClass:"left-sub"},[i("div",{staticClass:"three-input"},[i("div",{staticClass:"project-level"},[i("span",{staticClass:"xin"},[e._v("*")]),e._v("项目级别：\n                        "),e._v(" "),i("span",[e._v(e._s(1==t.projectLevel?"国家级":2==t.projectLevel?"省级":3==t.projectLevel?"市级":4==t.projectLevel?"区县级":5==t.projectLevel?"镇街级":""))])]),e._v(" "),i("div",{staticClass:"project-min-subsidy"},[i("span",{staticClass:"xin"},[e._v("*")]),e._v("最低补助：\n                        "),e._v(" "),i("span",[e._v(e._s(t.subsidyPriceMin)+"元")])]),e._v(" "),i("div",{staticClass:"project-max-subsidy"},[i("span",{staticClass:"xin"},[e._v("*")]),e._v("最高补助：\n                        "),e._v(" "),i("span",[e._v(e._s(t.subsidyPriceMax)+"元")])])]),e._v(" "),i("div",{staticClass:"remarks-form"},[e._v("\n                      补助详情：\n                      "),e._v(" "),i("span",{staticStyle:{"white-space":"initial"}},[e._v(e._s(t.subsidyDesc))])])])])})],2)])])]),e._v(" "),e._e(),e._v(" "),i("div",{staticClass:"main-declare",staticStyle:{"margin-top":"30px"}},[i("div",{staticClass:"title"},[i("div",{staticClass:"title-name"},[e._v("材料清单")])]),e._v(" "),i("div",{staticClass:"content"},e._l(t.policyApplyMaterialLists,function(t,n){return i("div",{staticClass:"list"},[i("div",{staticClass:"list-num",staticStyle:{"padding-top":"0"}},[e._v(e._s(n+1)+".")]),e._v(" "),i("div",{staticClass:"list-body"},[i("div",{staticClass:"term-title",staticStyle:{"align-items":"normal"}},[i("div",{staticClass:"file-type-bar"},[i("div",{staticStyle:{width:"33%"}},[e._v("附件分类："+e._s(t.materialTypeName))]),e._v(" "),i("div",{staticStyle:{width:"33%","padding-right":"20px"}},[e._v("要求："+e._s(t.materialDesc))]),e._v(" "),i("div",{staticClass:"file-model",staticStyle:{width:"33%"}},[i("div",{staticStyle:{"white-space":"nowrap"}},[e._v("模板文件：")]),e._v(" "),i("ul",{staticClass:"files-list"},e._l(t.templateFileIds,function(t,n){return i("li",[e._v("\n                          "+e._s(n+1)+"."+e._s(t.fileName)+"\n                        ")])}),0)])])])])])}),0)])])}),0)]),e._v(" "),i("el-card",{staticClass:"top-margin-10"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",{staticStyle:{color:"#FFA96A","font-weight":"bold",width:"3px"}},[e._v("|")]),e._v(" "),i("span",{staticClass:"index-content-title"},[e._v(" 政策解读")])]),e._v(" "),i("div",[i("el-row",{attrs:{gutter:12}},[i("el-col",{attrs:{span:20,offset:2}},[e.isCheck?i("p",{staticClass:"editorHtml",domProps:{innerHTML:e._s(e.form.noticeSummary)}},[e._v(e._s(e.form.noticeSummary))]):i("Tinymce",{ref:"policyNoticeeditor",attrs:{height:400},model:{value:e.form.noticeSummary,callback:function(t){e.$set(e.form,"noticeSummary",t)},expression:"form.noticeSummary"}})],1)],1)],1)]),e._v(" "),i("el-card",{staticClass:"top-margin-10"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",{staticStyle:{color:"#799CFF","font-weight":"bold",width:"3px"}},[e._v("|")]),e._v(" "),i("span",{staticClass:"index-content-title"},[e._v(" 原文")])]),e._v(" "),i("div",[i("el-row",{attrs:{gutter:12}},[i("el-col",{attrs:{span:20,offset:2}},[e.isCheck?i("p",{staticClass:"editorHtml",domProps:{innerHTML:e._s(e.form.noticeContent)}},[e._v(e._s(e.form.noticeContent))]):i("Tinymce",{ref:"policyNoticeeditor2",attrs:{height:400},model:{value:e.form.noticeContent,callback:function(t){e.$set(e.form,"noticeContent",t)},expression:"form.noticeContent"}})],1)],1),e._v(" "),i("el-row",{staticClass:"top-margin-10",attrs:{gutter:12}},[i("el-col",{attrs:{span:20,offset:2}},[i("el-form-item",{attrs:{label:"原文链接："}},[e.isCheck?i("span",[i("a",{attrs:{href:e.form.sourceUrl,target:"_blank"}},[e._v(e._s(e.form.sourceUrl))])]):i("input",{directives:[{name:"model",rawName:"v-model",value:e.form.sourceUrl,expression:"form.sourceUrl"}],staticClass:"input_text float-left width-800",attrs:{type:"text",placeholder:"请输入原文链接"},domProps:{value:e.form.sourceUrl},on:{input:function(t){t.target.composing||e.$set(e.form,"sourceUrl",t.target.value)}}})])],1)],1),e._v(" "),i("el-row",{attrs:{gutter:12}},[i("el-col",{attrs:{span:20,offset:2}},[i("el-form-item",{attrs:{label:"政府文件补充：",prop:"official_file"}},[e.isCheck?e._e():i("el-upload",{ref:"upload",staticClass:"upload-box upload-box-width",staticStyle:{display:"inline-block",width:"100%"},attrs:{"http-request":e.handlePoliceUpload,"file-list":e.fileList,action:"","show-file-list":!1}},[i("el-button",{attrs:{type:"primary",size:"small"}},[e._v("点击上传")])],1),e._v(" "),i("p",{staticStyle:{"margin-bottom":"10px","font-size":"12px",color:"#ff3f4b","line-height":"normal"}},[e._v("限制文件不超过"+e._s(e.$store.getters.singleCapacity/1024+"M"))]),e._v(" "),e._l(e.fileList,function(t,o){return i("div",{staticClass:"file-list"},[i("div",[e._v(e._s(t.fileName))]),e._v(" "),e.isCheck?i("img",{staticClass:"down-files",attrs:{src:n("LiIp"),alt:""},on:{click:function(n){return e.downFileHandle(t)}}}):i("i",{staticClass:"icon-del-file el-icon-circle-close",on:{click:function(t){return e.delFileHandle(o)}}})])})],2)],1)],1)],1)]),e._v(" "),i("div",{staticClass:"center-items top-margin-30"},[i("el-form-item",[e.isCreate?i("el-button",{directives:[{name:"preventReClick",rawName:"v-preventReClick"}],attrs:{type:"primary"},on:{click:function(t){return e.policyHandSubmit("form")}}},[e._v("确认")]):e._e(),e._v(" "),e.isEdit?i("el-button",{directives:[{name:"preventReClick",rawName:"v-preventReClick"}],attrs:{type:"primary"},on:{click:function(t){return e.policyHandSubmit("form")}}},[e._v("修改")]):e._e(),e._v(" "),i("el-button",{on:{click:e.handlerCancel}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var m=n("VU/8")(p,d,!1,function(e){n("8I7o")},null,null);t.default=m.exports},"8I7o":function(e,t,n){var i=n("v1hD");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("a1385df0",i,!0)},v1hD:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\nul li {\n  list-style: none;\n}\n.body {\n  width: 100%;\n  height: 100px;\n  overflow-y: hidden;\n  font-size: 12px;\n}\n.overflow-x {\n  overflow-x: hidden;\n}\n.overflow-y {\n  overflow-y: hidden;\n}\n.inline-block {\n  display: inline-block;\n}\n.text-align-center {\n  text-align: center;\n}\n.hover_cursor {\n  cursor: pointer;\n}\n.top-margin-30 {\n  margin-top: 30px;\n}\n.top-margin-10 {\n  margin-top: 10px;\n}\n.left-margin-5 {\n  margin-left: 5px;\n}\n.left-margin-10 {\n  margin-left: 10px;\n}\n.bottom-margin-30 {\n  margin-bottom: 30px;\n}\n.left-margin-20 {\n  margin-left: 20px;\n}\n.right-margin-10 {\n  margin-right: 10px;\n}\n.right-margin-20 {\n  margin-right: 20px;\n}\n.right-margin-30 {\n  margin-right: 30px;\n}\n.padding-0 {\n  padding: 0;\n}\n.padding-10 {\n  padding: 10px;\n}\n.padding-20 {\n  padding: 20px;\n}\n.center-items {\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.row-width-auto-margin-0-90 {\n  width: auto;\n  margin: auto 5%;\n}\n.float-right {\n  float: right;\n}\n.float-left {\n  float: left;\n}\n.padding-vertical-5 {\n  padding: 5px 0;\n}\n.padding-vertical-10 {\n  padding: 10px 0;\n}\n.padding-level-10 {\n  padding: 0 10px;\n}\n.bg_orange {\n  background: #FD903C;\n  color: #fff;\n}\n.bg_orange:hover {\n  background: #FD903C;\n  opacity: 0.5;\n}\n.bg_pink {\n  background: #ff709a;\n  color: #fff;\n}\n.bg_pink:hover {\n  background: rgba(255, 112, 154, 0.5);\n}\n.bg_gray {\n  background: #b4b4b4;\n  color: #ffffff;\n}\n.bg_gray:hover {\n  background: rgba(180, 180, 180, 0.5);\n}\n.bg_blue {\n  background: #05AAFF;\n  color: #fff;\n}\n.bg_blue:hover {\n  background: #05AAFF;\n  opacity: 0.5;\n}\n.bg_pale_blue {\n  background: #32b8ff;\n  color: #ffffff;\n}\n.bg_pale_blue:hover {\n  background: rgba(50, 184, 255, 0.5);\n}\n.bg_pale_orange {\n  background: #ffba88;\n  color: #ffffff;\n}\n.bg_pale_orange:hover {\n  background: rgba(255, 186, 136, 0.5);\n}\n.bg_pale_violet {\n  background: #799cff;\n  color: #ffffff;\n}\n.bg_pale_violet:hover {\n  background: rgba(121, 156, 255, 0.5);\n}\n.width-200 {\n  width: 200px;\n}\n.width-300 {\n  width: 300px;\n}\n.width-400 {\n  width: 400px;\n}\n.width-500 {\n  width: 500px;\n}\n.width-600 {\n  width: 600px;\n}\n.width-700 {\n  width: 700px;\n}\n.width-800 {\n  width: 800px;\n}\n.short_name_bg {\n  border-radius: 5px;\n  width: 78px;\n  height: 78px;\n  background: #69ccff;\n  opacity: 1;\n  font-size: 16px;\n  font-family: PingFang SC;\n  font-weight: 400;\n  line-height: 23px;\n  color: #ffffff;\n  letter-spacing: 2px;\n}\n.select_project_bt {\n  width: 80px;\n  height: 30px;\n  background: #05aaff;\n  font-size: 14px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 19px;\n  color: #ffffff;\n  opacity: 1;\n  border: none;\n  cursor: pointer;\n  outline: none;\n}\n.select_project_bt:active {\n  outline: none;\n  border: none;\n}\n.select_project_pray_bt {\n  width: 80px;\n  height: 30px;\n  background: #DFDFDF;\n  font-size: 14px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 19px;\n  color: #ffffff;\n  opacity: 1;\n  border: none;\n}\n.project_bg {\n  border-radius: 5px;\n  padding: 1px 10px;\n  width: 100%;\n  opacity: 1;\n}\n.projectListCont {\n  padding: 10px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.projectListCont span {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: relative;\n}\n.project_badge {\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  background: #91e5a1;\n  color: #ffffff;\n  border-radius: 50%;\n  opacity: 1;\n}\ninput:focus {\n  outline: none;\n}\n.input_text {\n  outline: none;\n  height: 30px;\n  line-height: 30px;\n  /*text-indent: 10px;*/\n  /*font-size: 18px;*/\n  border-color: #444444;\n  border-style: solid;\n  border-top-width: 0px;\n  border-right-width: 0px;\n  border-bottom-width: 1px;\n  border-left-width: 0px;\n  display: block;\n  margin: 0 auto;\n}\n.noticeName /deep/ .el-input__inner {\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid #444;\n}\n.project-modal /deep/ .el-dialog__body {\n  padding: 10px 20px;\n}\n.project-modal .search-num {\n  font-size: 14px;\n  margin-bottom: 10px;\n}\n.project-modal .search-num .num {\n  color: #f9a9a9;\n}\n.project-modal .dialog-footer .sub-btn {\n  background: #05AAFF;\n  color: #fff;\n}\n.project-modal .get-more {\n  margin-top: 10px;\n  text-align: center;\n}\n.project-modal .get-more span {\n  cursor: pointer;\n}\n.project-modal .project-table /deep/ .el-table__body-wrapper {\n  max-height: 300px;\n  overflow-y: auto;\n}\n.project-massage .clearfix {\n  position: relative;\n}\n.project-massage .clearfix .select-project {\n  border-radius: 4px;\n  position: absolute;\n  right: 0;\n  top: -5px;\n}\n.project-massage .list-box .item {\n  margin-bottom: 25px;\n}\n.project-massage .list-box .item .xin {\n  color: red;\n}\n.project-massage .list-box .item .main-project {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  margin-bottom: 20px;\n}\n.project-massage .list-box .item .main-project .left {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.project-massage .list-box .item .main-project .left .index {\n  width: 18px;\n  min-width: 18px;\n  height: 18px;\n  background: #91e5a1;\n  color: #ffffff;\n  border-radius: 50%;\n  opacity: 1;\n  text-align: center;\n  margin-right: 6px;\n}\n.project-massage .list-box .item .main-project .left .form-box {\n  width: 100%;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form {\n  margin-top: -9px;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-name {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  white-space: nowrap;\n  margin-bottom: 10px;\n  margin-top: 10px;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-name .right {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: -8px;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-name .right .del-project-btn {\n  height: 30px;\n  white-space: nowrap;\n  border: 0;\n  background: #ff0000;\n  color: #fff;\n  padding: 7px 10px;\n  border-radius: 4px;\n  font-size: 14px;\n  outline: none;\n  cursor: pointer;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-name .right .del-project-btn:active {\n  opacity: 0.5;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-name .right .del-project-btn.add-project-btn {\n  background: #05aaff;\n  margin-right: 4px;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-sub-list {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 10px;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-sub-list .left-sub {\n  width: 88%;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-sub-list .three-input {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-sub-list .del-sub-list {\n  color: red;\n  cursor: pointer;\n  font-size: 18px;\n  margin-top: 10px;\n  margin-left: 10px;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-sub-list:last-child {\n  margin-bottom: 0;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-level,\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-min-subsidy,\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-max-subsidy {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  white-space: nowrap;\n  margin-bottom: 10px;\n}\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-level .money-input,\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-min-subsidy .money-input,\n.project-massage .list-box .item .main-project .left .form-box .project-form .project-max-subsidy .money-input {\n  width: 170px;\n}\n.project-massage .list-box .item .main-project .left .form-box .remarks-form {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  white-space: nowrap;\n}\n.project-massage .list-box .item .main-project .left .form-box .remarks-form /deep/ .el-textarea__inner {\n  height: 80px;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding-left: 15px;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form .list {\n  width: 95%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form .list .item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  white-space: nowrap;\n  margin-bottom: 0;\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form .list .item .batch-select {\n  width: 200px;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form .list .item .date-select-form {\n  width: 280px;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form .list .item .date-select-form /deep/ .el-range-separator {\n  padding: 0;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form .del-batch-btn {\n  margin-top: 13px;\n}\n.project-massage .list-box .item .main-project .left .form-box .batch-form .del-batch-btn i {\n  font-size: 18px;\n  color: #ff0000;\n  cursor: pointer;\n}\n.project-massage .list-box .item .main-declare .title {\n  padding-bottom: 4px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #ccc;\n}\n.project-massage .list-box .item .main-declare .title .title-name {\n  color: #05aaff;\n}\n.project-massage .list-box .item .main-declare .title .add-term-btn {\n  background: #05aaff;\n  color: #FFF;\n  outline: none;\n  border: 0;\n  font-size: 14px;\n  cursor: pointer;\n  width: 80px;\n  height: 30px;\n  border-radius: 4px;\n}\n.project-massage .list-box .item .main-declare .title .add-term-btn:active {\n  opacity: 0.5;\n}\n.project-massage .list-box .item .main-declare .content {\n  font-size: 14px;\n}\n.project-massage .list-box .item .main-declare .content .list {\n  padding: 10px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.project-massage .list-box .item .main-declare .content .list .list-num {\n  padding-top: 5px;\n  padding-right: 3px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body {\n  width: 100%;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .title-btn-group {\n  font-size: 12px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .title-btn-group .btn {\n  cursor: pointer;\n  height: 26px;\n  background: #00A5FF;\n  color: #fff;\n  outline: none;\n  border: 0;\n  border-radius: 4px;\n  padding: 0 10px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .title-btn-group .btn:last-child {\n  background: #ff0000;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .title-btn-group .btn:active {\n  opacity: 0.5;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .file-type-bar {\n  width: 90%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .file-type-bar .file-model {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .file-type-bar .file-model .files-list li {\n  margin-bottom: 5px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .file-type-bar .file-model .files-list li:last-child {\n  margin-bottom: 0;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .term-title .file-type-bar .file-model .files-list .icon-del-file {\n  margin-left: 4px;\n  cursor: pointer;\n  color: red;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-title {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin: 5px 0;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-title div {\n  margin-right: 50px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  margin-bottom: 10px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item .left {\n  width: 90%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item .left div {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  white-space: nowrap;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item .right {\n  width: 92px;\n  min-width: 92px;\n  font-size: 12px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item .right .btn {\n  cursor: pointer;\n  height: 26px;\n  background: #00A5FF;\n  color: #fff;\n  outline: none;\n  border: 0;\n  border-radius: 4px;\n  padding: 0 10px;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item .right .btn:last-child {\n  background: #ff0000;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item .right .btn:active {\n  opacity: 0.5;\n}\n.project-massage .list-box .item .main-declare .content .list .list-body .sub-list .item:last-child {\n  margin-bottom: 0;\n}\n.project-massage .list-box .item:last-child {\n  margin-bottom: 0;\n}\n.project-massage .notice-list .left {\n  width: 85%;\n}\n.project-massage .notice-list .left .form-box .project-form {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.project-massage .notice-list .left .form-box .project-form .project-name,\n.project-massage .notice-list .left .form-box .project-form .project-level {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.project-massage .notice-list .right {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.project-massage .notice-list .right .del-project-btn.add {\n  margin-right: 5px;\n  background: #05aaff !important;\n}\n.table-radio /deep/ .el-radio__label {\n  display: none;\n}\n.projectChoose {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 20px;\n}\n/deep/ .el-table thead tr th .el-checkbox__input {\n  display: none;\n}\n.moreBat {\n  margin-right: 30px;\n  background: #05AAFF;\n  color: #fff;\n  width: 20px;\n  height: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-radius: 100%;\n  cursor: pointer;\n}\n.address-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.address-group .address-input {\n  width: 12%;\n  margin-right: 20px;\n}\n.editorUserModal /deep/ .el-dialog__header {\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n  padding: 20px 20px 16px;\n}\n.editorUserModal /deep/ .el-dialog__title {\n  line-height: 0;\n}\n.editorUserModal /deep/ .el-dialog__headerbtn {\n  top: 19px;\n}\n.editorUserModal /deep/ .el-dialog__body {\n  padding: 14px;\n}\n.editorUserModal /deep/ .el-form-item__label {\n  font-weight: normal;\n  color: rgba(68, 68, 68, 0.75);\n}\n.editorUserModal /deep/ .el-form-item__content {\n  width: 83%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.editorUserModal .user-input /deep/ .el-input__inner {\n  border: 0;\n  border-radius: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.editorUserModal .user-input.input {\n  width: 100%;\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.editorUserModal .user-input.input:focus {\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.editorUserModal .user-select {\n  width: 100%;\n}\n.editorUserModal .switch-btn {\n  font-size: 14px;\n  color: #fff;\n  background: #05aaff;\n  margin-left: 10px;\n}\n.editorUserModal .switch-btn:active {\n  opacity: 0.5;\n}\n.editorUserModal .modal-radio {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.editorUserModal .modal-radio /deep/ .el-form-item__content {\n  margin-left: 0 !important;\n}\n.editorUserModal .dialog-footer .setBtn {\n  color: #fff;\n  background: #05aaff;\n}\n.editorUserModal .dialog-footer .cananl {\n  background: #fff;\n  color: #444444;\n}\n.editorUserModal .system-btn {\n  text-align: right;\n  padding-right: 30px;\n}\n.editorUserModal .system-btn .btn {\n  width: 80px;\n  height: 30px;\n  background: #00A5FF;\n  color: #fff;\n  outline: none;\n  cursor: pointer;\n  border-radius: 4px;\n  border: 0;\n}\n.editorUserModal .system-btn .btn:active {\n  opacity: 0.5;\n}\n.ment-modal /deep/ .el-form-item__label {\n  line-height: 20px;\n}\n.system-model {\n  /*width: 400px;*/\n  /*height: 358px;*/\n  /*position: fixed;*/\n  /*top: 50%;*/\n  /*left: 50%;*/\n  /*transform: translate(-50%, -50%);*/\n  /*-webkit-transform: translate(-50%, -50%);*/\n  /*-moz-transform: translate(-50%, -50%);*/\n  /*background: #fff;*/\n  /*!*z-index: 3000;*!*/\n  /*box-shadow: 0 1px 3px rgba(0, 0, 0, .3);*/\n  /*border-radius: 2px;*/\n}\n.system-model .modal-heards {\n  cursor: move;\n  padding: 20px 20px 16px;\n  font-size: 18px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.system-model .modal-heards .icon-close {\n  cursor: pointer;\n  color: #909399;\n  font-size: 15px;\n}\n.address-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 22px;\n  padding-left: 28px;\n}\n.address-bar .address-title {\n  margin-right: 14px;\n  white-space: nowrap;\n  font-size: 14px;\n  color: #606266;\n}\n.file-list {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.file-list .icon-del-file {\n  cursor: pointer;\n  margin-left: 10px;\n  margin-top: 3px;\n}\n.file-list .down-files {\n  cursor: pointer;\n  margin-top: 2px;\n  margin-left: 10px;\n}\n.editorHtml .wscnph {\n  width: auto;\n  max-width: 100%;\n}\n.editorHtml .zw {\n  line-height: 26px;\n}\n.editorHtml p,\n.editorHtml li,\n.editorHtml span {\n  line-height: 26px;\n}\n",""])}});