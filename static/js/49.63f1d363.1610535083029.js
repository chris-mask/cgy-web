webpackJsonp([49],{"6HOj":function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n[data-v-b9ff4424] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 20px;\n}\n[data-v-b9ff4424] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  line-height: normal;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-v-b9ff4424] .el-form-item__label {\n  min-width: 140px;\n  font-weight: normal;\n}\n.btnList[data-v-b9ff4424] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n.publicTit[data-v-b9ff4424] {\n  font-size: 16px;\n  border-left: 2px solid #05AAFF;\n  padding-left: 10px;\n}\n",""])},gRa6:function(t,e,i){var l=i("6HOj");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);i("rjj0")("6ee621de",l,!0)},s0Py:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=i("mvHQ"),s=i.n(l),a=i("5aCZ"),o=i("4Rl0"),r=i("Q5rI"),c={components:{Tinymce:a.a},data:function(){return{publicForm:{},rules:{projectName:[{required:!0,message:"请输入公示标题",trigger:"blur"}],publicityState:[{required:!0,message:"请选择公示状态",trigger:"blur"}],projectYear:[{required:!0,message:"请选择年份",trigger:"blur"}],publicityDate:[{required:!0,message:"请选择公示开始日期",trigger:"blur"}],endDate:[{required:!0,message:"请选择公示结束日期",trigger:"blur"}]},provinceList:[],cityList:[],districtList:[],townList:[],fileList:[],parentId:0,level:3,publicityId:"",isShow:!1,allowAdd:this.authorityControl("SYSTEM:COLLABORATION:SYNERGY","SYSTEM:PUBLIC:RESULT","SYSTEM:PUBLIC:RESULT:INSERT"),allowUpdate:this.authorityControl("SYSTEM:COLLABORATION:SYNERGY","SYSTEM:PUBLIC:RESULT","SYSTEM:PUBLIC:RESULT:UPDATE"),allowDetail:this.authorityControl("SYSTEM:COLLABORATION:SYNERGY","SYSTEM:PUBLIC:RESULT","SYSTEM:PUBLIC:RESULT:DETAILS"),allowUpload:this.authorityControl("SYSTEM:COLLABORATION:SYNERGY","SYSTEM:PUBLIC:RESULT","SYSTEM:PUBLIC:RESULT:UPLOAD")}},activated:function(){this.publicityId=this.$route.query.publicityId,this.isShow=this.$route.query.isShow,this.publicityId&&this.getDetail()},mounted:function(){this.getRegionList()},methods:{getDetail:function(){var t=this,e={page:0,pageSize:10,publicityId:this.publicityId};this.allowDetail.twoAllow?Object(o.d)(e).then(function(e){if(200==e.code){t.publicForm=e.data.data[0],-1!=e.data.data[0].fileIds.indexOf(",")&&(e.data.data[0].fileIds=e.data.data[0].fileIds.substr(0,e.data.data[0].fileIds.length-1));var i=e.data.data[0].fileIds.split(",");e.data.data[0].fileIds&&""!=e.data.data[0].fileIds&&t.getFileDetail(i),t.getAddressDetail()}else t.$message.warning(e.message)}):this.$message.warning("抱歉，您没有权限获取此详情")},getFileDetail:function(t){var e=this;Object(r.k)({fileIds:t,haveView:!1}).then(function(t){200==t.code?e.fileList=t.data.map(function(t){return t.name=t.fileName,t}):e.$message.warning(t.message)})},downloadFile:function(t){var e=this;t.filePath&&Object(r.q)(t).then(function(t){if(200==t.code){var i=t.data.replace(/http/,"https");window.open(i),e.$message.success("下载成功")}})},submitResult:function(t){var e=this;if(this.publicForm.publicityDate>this.publicForm.endDate)this.$message.warning("公示开始日期不得大于公示结束日期");else{var i="";this.fileList.length>0&&this.fileList.forEach(function(t){i+=t.fileId+","}),this.publicForm.fileIds=i,this.$refs[t].validate(function(t,i){t&&Object(o.f)(e.publicForm).then(function(t){200==t.code?(e.$message.success("新建成功"),e.publicForm={},e.fileList=[],e.$store.commit("SET_PUBLICITYRESULT_SCROLL",0),e.closeCurrent(e.$store.state.tagsView.visitedViews,e.$route,"/approvalCollaborative/publicityResult")):e.$message.warning(t.message)})})}},editResult:function(t){var e=this;if(this.publicForm.publicityDate>this.publicForm.endDate)this.$message.warning("公示开始日期不得大于公示结束日期");else{var i="";this.fileList.length>0&&this.fileList.forEach(function(t){i+=t.fileId+","}),this.publicForm.fileIds=i,this.$refs[t].validate(function(t,i){t&&Object(o.b)(e.publicForm).then(function(t){200==t.code?(e.$message.success("修改成功"),e.publicForm={},e.fileList=[],e.closeCurrent(e.$store.state.tagsView.visitedViews,e.$route,"/approvalCollaborative/publicityResult")):e.$message.warning(t.message)})})}},handlePreview:function(t){var e=this;if(t.name.length>=150)return this.$message("文件名称超长，请检查"),void(this.fileList=JSON.parse(s()(this.fileList)));if(""==this.publicForm.provinceName||void 0==this.publicForm.provinceName)return this.$message.warning("请先选择省"),void(this.fileList=JSON.parse(s()(this.fileList)));if(""==this.publicForm.publicityDate||void 0==this.publicForm.publicityDate)return this.$message.warning("请先选择公示开始日期"),void(this.fileList=JSON.parse(s()(this.fileList)));var i=new FormData;i.append("file",t),i.append("provinceName",this.publicForm.provinceName),this.publicForm.cityName&&i.append("cityName",this.publicForm.cityName),i.append("publicityDate",this.publicForm.publicityDate),Object(o.g)(i).then(function(i){if(200==i.code){var l={fileId:i.data[0],name:t.name,uid:t.uid,fileName:t.name};e.fileList.push(l),e.$message.success("上传成功!")}else e.$message.warning(i.message),e.fileList=JSON.parse(s()(e.fileList))})},handleRemove:function(t,e){this.$message.success("删除成功！"),this.fileList=e},beforeRemove:function(t,e){return this.$confirm("是否确定删除此文件，解除关联 "+t.name+"？")},UploadUrl:function(){return"/policy/api/policy/policyNoticeInfo/uploadFile"},onUploadChange:function(t,e){this.handlePreview(t.raw)},getRegionList:function(t,e){var i=this;void 0!=t&&null!=t||(t=3),void 0!=e&&""!=e||(t=3,e=0);var l={level:t,parentId:e};Object(r.f)(l).then(function(e){200==e.code?(3==t&&(i.provinceList=e.data),2==t&&(i.cityList=e.data),1==t&&(i.districtList=e.data),0==t&&(i.townList=e.data)):i.$message({type:"error",message:e.message})})},changeProvince:function(t){var e=this;""!=t&&void 0!=t||(this.cityList=[],this.districtList=[],this.townList=[],this.publicForm.cityId="",this.publicForm.districtId="",this.$set(this.publicForm,"townId",""),this.publicForm.cityName=""),this.publicForm.cityId="",this.publicForm.districtId="",this.$set(this.publicForm,"townId",""),this.provinceList.forEach(function(i){i.dictId==t&&(e.publicForm.provinceName=i.dictName)}),this.getRegionList(2,t)},cityChange:function(t){var e=this;this.publicForm.districtId="",this.$set(this.publicForm,"townId",""),this.cityList.forEach(function(i){i.dictId==t&&(e.publicForm.cityName=i.dictName)}),this.getRegionList(1,t)},districtChange:function(t){this.$set(this.publicForm,"townId",""),this.getRegionList(0,t)},getAddressDetail:function(){this.getRegionList(3,0),this.publicForm.provinceId&&this.getRegionList(2,this.publicForm.provinceId),this.publicForm.cityId&&this.getRegionList(1,this.publicForm.cityId),this.publicForm.districtId&&this.getRegionList(0,this.publicForm.districtId)},cancelSub:function(){this.publicForm={},this.fileList=[],this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route)}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[i("p",{staticClass:"publicTit"},[t._v("公示结果详情")])]),t._v(" "),i("div",{staticClass:"form-control"},[i("el-form",{ref:"publicForm",attrs:{model:t.publicForm,rules:t.rules}},[i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"公示标题：",prop:"projectName"}},[t.isShow?i("span",[t._v(t._s(t.publicForm.projectName))]):i("el-input",{attrs:{size:"small",maxlength:"100",clearable:""},model:{value:t.publicForm.projectName,callback:function(e){t.$set(t.publicForm,"projectName","string"==typeof e?e.trim():e)},expression:"publicForm.projectName"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"主管部门：",prop:"publicityOrgan"}},[t.isShow?i("span",[t._v(t._s(t.publicForm.publicityOrgan))]):i("el-input",{attrs:{size:"small",maxlength:"100",clearable:""},model:{value:t.publicForm.publicityOrgan,callback:function(e){t.$set(t.publicForm,"publicityOrgan","string"==typeof e?e.trim():e)},expression:"publicForm.publicityOrgan"}})],1)],1)],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"公示状态：",prop:"publicityState"}},[t.isShow?i("span",[t._v(t._s(0==t.publicForm.publicityState?"公示中":"公示结束"))]):i("el-select",{attrs:{placeholder:"请选择公示状态",size:"small",clearable:""},model:{value:t.publicForm.publicityState,callback:function(e){t.$set(t.publicForm,"publicityState",e)},expression:"publicForm.publicityState"}},[i("el-option",{key:0,attrs:{label:"公示中",value:0}}),t._v(" "),i("el-option",{key:1,attrs:{label:"公示结束",value:1}})],1)],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"年份：",prop:"projectYear"}},[t.isShow?i("span",[t._v(t._s(t.publicForm.projectYear))]):i("el-date-picker",{attrs:{size:"small",type:"year","value-format":"yyyy",placeholder:"选择年份"},model:{value:t.publicForm.projectYear,callback:function(e){t.$set(t.publicForm,"projectYear",e)},expression:"publicForm.projectYear"}})],1)],1)],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"地区："}},[t.isShow?t._e():i("el-select",{attrs:{clearable:"",placeholder:"省份",size:"small"},on:{change:t.changeProvince},model:{value:t.publicForm.provinceId,callback:function(e){t.$set(t.publicForm,"provinceId",e)},expression:"publicForm.provinceId"}},t._l(t.provinceList,function(t){return i("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1),t._v(" "),t.isShow?t._e():i("el-select",{staticStyle:{"margin-left":"10px"},attrs:{clearable:"",placeholder:"城市",size:"small"},on:{change:t.cityChange},model:{value:t.publicForm.cityId,callback:function(e){t.$set(t.publicForm,"cityId",e)},expression:"publicForm.cityId"}},t._l(t.cityList,function(t){return i("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1),t._v(" "),t.isShow?t._e():i("el-select",{staticStyle:{"margin-left":"10px"},attrs:{clearable:"",placeholder:"区",size:"small"},on:{change:t.districtChange},model:{value:t.publicForm.districtId,callback:function(e){t.$set(t.publicForm,"districtId",e)},expression:"publicForm.districtId"}},t._l(t.districtList,function(t){return i("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1),t._v(" "),t.isShow?i("span",[t._v(t._s(t.publicForm.provinceName)+t._s(t.publicForm.cityName)+t._s(t.publicForm.districtName)+t._s(t.publicForm.townName))]):i("el-select",{staticStyle:{"margin-left":"10px"},attrs:{clearable:"",placeholder:"镇",size:"small"},model:{value:t.publicForm.townId,callback:function(e){t.$set(t.publicForm,"townId",e)},expression:"publicForm.townId"}},t._l(t.townList,function(t){return i("el-option",{key:t.dictId,attrs:{label:t.dictName,value:t.dictId}})}),1)],1)],1)],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"公示开始日期：",prop:"publicityDate"}},[t.isShow?i("span",[t._v(t._s(t.publicForm.publicityDate))]):i("el-date-picker",{attrs:{size:"small",type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:t.publicForm.publicityDate,callback:function(e){t.$set(t.publicForm,"publicityDate",e)},expression:"publicForm.publicityDate"}})],1)],1),t._v(" "),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"公示结束日期：",prop:"endDate"}},[t.isShow?i("span",[t._v(t._s(t.publicForm.endDate))]):i("el-date-picker",{attrs:{size:"small",type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:t.publicForm.endDate,callback:function(e){t.$set(t.publicForm,"endDate",e)},expression:"publicForm.endDate"}})],1)],1)],1),t._v(" "),i("el-row",[i("el-col",[i("el-form-item",{attrs:{label:"公示原文："}},[t.isShow?i("p",{domProps:{innerHTML:t._s(t.publicForm.publicityContent)}},[t._v(t._s(t.publicForm.publicityContent))]):i("Tinymce",{ref:"editor",attrs:{height:400},model:{value:t.publicForm.publicityContent,callback:function(e){t.$set(t.publicForm,"publicityContent",e)},expression:"publicForm.publicityContent"}})],1)],1)],1),t._v(" "),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"公示原文链接："}},[t.isShow?i("span",[t._v(t._s(t.publicForm.sourceUrl))]):i("el-input",{attrs:{size:"small"},model:{value:t.publicForm.sourceUrl,callback:function(e){t.$set(t.publicForm,"sourceUrl",e)},expression:"publicForm.sourceUrl"}})],1)],1)],1),t._v(" "),t.allowUpload.twoAllow?i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"文件补充："}},[t.isShow?t._l(t.fileList,function(e,l){return i("p",{staticStyle:{cursor:"pointer"},on:{click:function(i){return t.downloadFile(e)}}},[t._v("\n                "+t._s(l+1+"、"+e.name)+"\n              ")])}):i("el-upload",{ref:"upload",staticClass:"upload-box upload-box-width",staticStyle:{display:"inline-block"},attrs:{action:t.UploadUrl(),"auto-upload":!1,"on-remove":t.handleRemove,"before-remove":t.beforeRemove,"file-list":t.fileList,"on-change":t.onUploadChange,"show-file-list":!0}},[i("el-button",{attrs:{type:"primary",size:"small"}},[t._v("点击上传")]),t._v(" "),t.fileList&&0===t.fileList.length?i("div",{staticStyle:{margin:"0 10px",color:"gray",cursor:"default",display:"inline-block"}},[t._v("未上传\n                ")]):t._e()],1),t._v(" "),i("p",{staticStyle:{"font-size":"12px",color:"#ff3f4b","line-height":"normal"}},[t._v("限制文件不超过"+t._s(t.$store.getters.singleCapacity/1024+"M"))])],2)],1)],1):t._e()],1)],1),t._v(" "),i("div",{staticClass:"btnList"},[t.publicityId||t.isShow||!t.allowAdd.twoAllow?t._e():i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.submitResult("publicForm")}}},[t._v("确定")]),t._v(" "),t.publicityId&&!t.isShow&&t.allowUpdate.twoAllow?i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.editResult("publicForm")}}},[t._v("修改")]):t._e(),t._v(" "),i("el-button",{attrs:{size:"small"},on:{click:t.cancelSub}},[t._v("取消")])],1)])],1)},staticRenderFns:[]};var p=i("VU/8")(c,n,!1,function(t){i("gRa6")},"data-v-b9ff4424",null);e.default=p.exports}});