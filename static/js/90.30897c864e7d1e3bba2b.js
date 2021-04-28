webpackJsonp([90],{fAxJ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("mvHQ"),n=a.n(r),o=a("fZjL"),i=a.n(o),p=a("Q5rI"),s=a("AvzY"),l=a("ZWSL"),c={data:function(){return{pageType:"",titleName:"",userNameList:[],userNameTotal:null,userParams:{page:0,pageSize:20},workType:[],form:{},rules:{crmCompanyId:[{required:!0,message:"请选择客户",trigger:"blur"}],copyrightName:[{required:!0,message:"请输入著作权名称",trigger:"blur"}],copyrightType:[{required:!0,message:"请选择类别",trigger:"blur"}],registerNo:[{required:!0,message:"请输入登记号",trigger:"blur"}]},loading:!1,allowAdd:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:PROPERTY:Copyright:INSERT"),allowUpdate:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:PROPERTY:Copyright:UPDATE"),allowDetail:this.authorityControl("SYSTEM:CUSTOMER:MANAGE","SYSTEM:CUSTOMER:CENTER","SYSTEM:CUSTOMER:CENTER:PROPERTY:Copyright:DETAILS")}},created:function(){this.getCopyRightData(),this.pageType=this.$route.query.type},activated:function(){var t=this;this.isHeaderName(),this.getUserNameData(),this.form={crmCompanyId:"",copyrightName:"",copyrightOwner:"",copyrightType:"",registerNo:"",versionNo:"",approvalDate:"",publicDate:""},this.$route.query.companyId&&(this.form.crmCompanyId=this.$route.query.companyId),"edit"!==this.pageType&&"read"!==this.pageType||setTimeout(function(){t.getFormDetail()},150)},directives:{loadMore:{bind:function(t,e){t.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&e.value()})}}},methods:{getUserNameData:function(){var t=this;Object(s.h)(this.userParams).then(function(e){200===e.code&&(t.userNameList=e.data.data,t.userNameTotal=e.data.total)})},loadMore:function(){var t=this;this.userNameList.length>=this.userNameTotal||(this.userParams.page+=20,Object(s.h)(this.userParams).then(function(e){200===e.code&&(t.userNameList=t.userNameList.concat(e.data.data))}))},getCopyRightData:function(){var t=this;Object(p.d)({keyList:"DICT:COPYRIGHT_CATEGORY"}).then(function(e){200===e.code&&(t.workType=e.data["DICT:COPYRIGHT_CATEGORY"])})},setCompanyNameHandle:function(t){var e=this;this.userNameList.forEach(function(a){a.crmCompanyId===t&&(e.form.crmCompanyName=a.companyName)})},isHeaderName:function(){"read"===this.pageType?this.titleName="著作权详情":"add"===this.pageType?this.titleName="新增著作权":"edit"===this.pageType&&(this.titleName="编辑著作权")},handleRemove:function(t,e){},handlePictureCardPreview:function(t){this.dialogImageUrl=t.url,this.dialogVisible=!0},handlePic:function(t){var e=t.raw.name.substr(t.raw.name.lastIndexOf("."));if(".jpg"===e||".png"===e){var a=new FormData;a.append("file",t.raw),this.picFormData=a}else this.$message({type:"warning",message:"请上传有效的.jpg或.png文件"})},handSubmit:function(t){var e=this;this.$refs[t].validate(function(t,a){if(!t)return e.callbackError(a),!1;if(e.form.copyrightOwner.length>50)e.$message.warning("著作权人字符长度不能大于50");else if(e.form.copyrightName.length>50)e.$message.warning("著作名称字符长度不能大于50");else{i()(e.form).forEach(function(t){null!==e.form[t]&&void 0!==e.form[t]||(e.form[t]="")});var r=new FormData;r.append("companyId",e.form.crmCompanyId),r.append("companyName",e.form.crmCompanyName),r.append("copyrightName",e.form.copyrightName),r.append("copyrightOwner",e.form.copyrightOwner),r.append("copyrightType",e.form.copyrightType),r.append("registerNo",e.form.registerNo),r.append("versionNo",e.form.versionNo),r.append("approvalDate",e.form.approvalDate),r.append("publicDate",e.form.publicDate),Object(l.s)(r).then(function(t){200===t.code&&(e.$message({type:"success",message:t.message}),e.form={},e.$store.commit("SET_COPYRIGHT_SCROLL",0),e.cananlHandle())})}})},getFormDetail:function(){var t=this;this.allowDetail.twoAllow?Object(l.m)({copyrightId:this.$route.query.copyrightId}).then(function(e){if(200===e.code){var a=JSON.parse(n()(e.data));a.crmCompanyId=a.companyId,a.crmCompanyName=a.companyName,i()(t.form).forEach(function(t){a.hasOwnProperty(t)||(a[t]="")}),t.form=a,"read"===t.pageType&&t.workType.forEach(function(a){e.data.copyrightType===a.dictId&&(t.form.copyrightTypeName=a.dictName)})}}):this.$message.warning("抱歉，您没有权限获取此详情")},handSubmitEdit:function(t){var e=this;this.$refs[t].validate(function(t,a){if(!t)return e.callbackError(a),!1;if(e.form.copyrightOwner.length>50)e.$message.warning("著作权人字符长度不能大于50");else if(e.form.copyrightName.length>50)e.$message.warning("著作名称字符长度不能大于50");else{i()(e.form).forEach(function(t){null!==e.form[t]&&void 0!==e.form[t]||(e.form[t]="")});var r=new FormData;r.append("companyId",e.form.crmCompanyId),r.append("companyName",e.form.crmCompanyName),r.append("copyrightName",e.form.copyrightName),r.append("copyrightOwner",e.form.copyrightOwner),r.append("copyrightType",e.form.copyrightType),r.append("registerNo",e.form.registerNo),r.append("versionNo",e.form.versionNo),r.append("approvalDate",e.form.approvalDate),r.append("publicDate",e.form.publicDate),r.append("copyrightId",e.$route.query.copyrightId),Object(l.w)(r).then(function(t){200===t.code&&(e.$message({type:"success",message:t.message}),e.form={},e.$store.commit("SET_COPYRIGHT_SCROLL",0),e.cananlHandle())})}})},cananlHandle:function(){var t=this;this.$router.go(-1),this.$store.state.tagsView.visitedViews.forEach(function(e,a){"客户中心-著作权详情"==e.name&&t.$store.state.tagsView.visitedViews.splice(a,1)}),this.form={}},callbackError:function(t){for(var e in t){this.tempArr=t[e];break}this.$message({type:"error",message:this.tempArr[0].message})},resetCompanyHandle:function(){this.userParams.companyNameOnly="",this.getUserNameData()},remoteMethod:function(t){var e=this;""!==t?(this.loading=!0,setTimeout(function(){e.loading=!1,e.getCompanyData(t)},200)):(this.userParams.companyNameOnly="",this.loading=!0,setTimeout(function(){e.loading=!1,e.getUserNameData()},200))},getCompanyData:function(t){var e=this;this.userParams.page=0,this.userParams.companyNameOnly=t,Object(s.h)(this.userParams).then(function(t){200==t.code&&(e.userNameList=t.data.data,e.userNameTotal=t.data.total)})}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"patent-form"},[a("el-form",{ref:"ruleForm",staticClass:"form-box",attrs:{rules:t.rules,model:t.form,"label-width":"auto"}},[a("div",{staticClass:"cart-bar"},[a("div",{staticClass:"cart-title"},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"title-name"},[t._v("著作列表 - "+t._s(t.titleName))])]),t._v(" "),a("div",{staticClass:"cart-body"},[a("el-form-item",{staticClass:"form-input",attrs:{label:"客户名称：",prop:"crmCompanyId"}},["add"!=t.pageType||this.$route.query.companyNames?this.$route.query.companyNames?a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:this.$route.query.companyNames,callback:function(e){t.$set(this.$route.query,"companyNames",e)},expression:"this.$route.query.companyNames"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.companyName,callback:function(e){t.$set(t.form,"companyName",e)},expression:"form.companyName"}}):a("el-select",{directives:[{name:"loadMore",rawName:"v-loadMore",value:t.loadMore,expression:"loadMore"}],staticClass:"user-name-item",attrs:{placeholder:"请选择客户名称",disabled:this.$route.query.isUser,filterable:"",remote:"",loading:t.loading,"remote-method":t.remoteMethod,clearable:""},on:{change:t.setCompanyNameHandle,focus:t.resetCompanyHandle},model:{value:t.form.crmCompanyId,callback:function(e){t.$set(t.form,"crmCompanyId",e)},expression:"form.crmCompanyId"}},t._l(t.userNameList,function(t){return a("el-option",{key:t.crmCompanyId,attrs:{value:t.crmCompanyId,label:t.companyName}})}),1)],1),t._v(" "),a("el-form-item",{staticClass:"form-input",attrs:{label:"著作名称：",prop:"copyrightName"}},["read"!==t.pageType?a("el-input",{staticClass:"patent-name-item",attrs:{maxlength:"50",clearable:"",placeholder:"请输入著作名称"},model:{value:t.form.copyrightName,callback:function(e){t.$set(t.form,"copyrightName","string"==typeof e?e.trim():e)},expression:"form.copyrightName"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.copyrightName,callback:function(e){t.$set(t.form,"copyrightName",e)},expression:"form.copyrightName"}})],1)],1)]),t._v(" "),a("div",{staticClass:"cart-bar"},[a("div",{staticClass:"cart-body"},[a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{sm:24,md:12,lg:10}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"著作权人："}},["read"!==t.pageType?a("el-input",{staticClass:"patent-name-item",staticStyle:{width:"300px"},attrs:{clearable:"",maxlength:"50",placeholder:"请输入著作权人"},model:{value:t.form.copyrightOwner,callback:function(e){t.$set(t.form,"copyrightOwner",e)},expression:"form.copyrightOwner"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.copyrightOwner,callback:function(e){t.$set(t.form,"copyrightOwner",e)},expression:"form.copyrightOwner"}})],1)],1),t._v(" "),a("el-col",{attrs:{sm:24,md:12,lg:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"类别：",prop:"copyrightType"}},["read"!==t.pageType?a("el-select",{staticClass:"user-name-item",attrs:{placeholder:"请选择类别"},model:{value:t.form.copyrightType,callback:function(e){t.$set(t.form,"copyrightType",e)},expression:"form.copyrightType"}},t._l(t.workType,function(t){return a("el-option",{key:t.dictId,attrs:{value:t.dictId,label:t.dictName}})}),1):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.copyrightTypeName,callback:function(e){t.$set(t.form,"copyrightTypeName",e)},expression:"form.copyrightTypeName"}})],1)],1)],1),t._v(" "),a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{md:10}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"登记号：",prop:"registerNo"}},["read"!==t.pageType?a("el-input",{staticClass:"patent-name-item",staticStyle:{width:"300px"},attrs:{clearable:"",maxlength:"50",placeholder:"请输入登记号"},model:{value:t.form.registerNo,callback:function(e){t.$set(t.form,"registerNo","string"==typeof e?e.trim():e)},expression:"form.registerNo"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.registerNo,callback:function(e){t.$set(t.form,"registerNo",e)},expression:"form.registerNo"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"版本号："}},["read"!==t.pageType?a("el-input",{staticClass:"patent-name-item",staticStyle:{width:"300px"},attrs:{clearable:"",maxlength:"50",placeholder:"请输入版本号"},model:{value:t.form.versionNo,callback:function(e){t.$set(t.form,"versionNo",e)},expression:"form.versionNo"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.versionNo,callback:function(e){t.$set(t.form,"versionNo",e)},expression:"form.versionNo"}})],1)],1)],1),t._v(" "),a("el-row",{staticClass:"floor-form"},[a("el-col",{attrs:{md:10}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"登记批准日期："}},["read"!==t.pageType?a("el-date-picker",{staticClass:"select-date",attrs:{type:"date",placeholder:"选择登记批准日期","value-format":"yyyy-MM-dd"},model:{value:t.form.approvalDate,callback:function(e){t.$set(t.form,"approvalDate",e)},expression:"form.approvalDate"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.approvalDate,callback:function(e){t.$set(t.form,"approvalDate",e)},expression:"form.approvalDate"}})],1)],1),t._v(" "),a("el-col",{attrs:{md:14}},[a("el-form-item",{staticClass:"form-input",attrs:{label:"发布日期："}},["read"!==t.pageType?a("el-date-picker",{staticClass:"select-date",attrs:{type:"date",placeholder:"选择发布日期","value-format":"yyyy-MM-dd"},model:{value:t.form.publicDate,callback:function(e){t.$set(t.form,"publicDate",e)},expression:"form.publicDate"}}):a("el-input",{staticClass:"patent-name-item",attrs:{disabled:""},model:{value:t.form.publicDate,callback:function(e){t.$set(t.form,"publicDate",e)},expression:"form.publicDate"}})],1)],1)],1)],1)])]),t._v(" "),a("div",{staticClass:"btn-group-handle"},["add"==t.pageType&&t.allowAdd.twoAllow?a("el-button",{directives:[{name:"preventReClick",rawName:"v-preventReClick"}],staticClass:"btn blue",on:{click:function(e){return t.handSubmit("ruleForm")}}},[t._v("确定")]):t._e(),t._v(" "),"edit"==t.pageType&&t.allowUpdate.twoAllow?a("el-button",{directives:[{name:"preventReClick",rawName:"v-preventReClick"}],staticClass:"btn blue",on:{click:function(e){return t.handSubmitEdit("ruleForm")}}},[t._v("确定")]):t._e(),t._v(" "),a("el-button",{staticClass:"btn cananl",on:{click:t.cananlHandle}},[t._v("取消")])],1)],1)},staticRenderFns:[]};var d=a("VU/8")(c,m,!1,function(t){a("giKC")},"data-v-1c0b9959",null);e.default=d.exports},giKC:function(t,e,a){var r=a("wgAM");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("6e128676",r,!0)},wgAM:function(t,e,a){(t.exports=a("FZ+f")(!0)).push([t.i,"\n.patent-form[data-v-1c0b9959] {\n  margin: auto 5%;\n}\n.patent-form .title[data-v-1c0b9959] {\n  margin-top: 20px;\n  padding-left: 20px;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n}\n.patent-form .form-box .cart-bar[data-v-1c0b9959] {\n  background: #fff;\n  margin-top: 20px;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n  border-radius: 4px;\n}\n.patent-form .form-box .cart-bar .cart-title[data-v-1c0b9959] {\n  padding: 16px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbe9ff;\n}\n.patent-form .form-box .cart-bar .cart-title .line[data-v-1c0b9959] {\n  width: 3px;\n  height: 14px;\n  background: #05aaff;\n  margin-right: 10px;\n}\n.patent-form .form-box .cart-bar .cart-title .title-name[data-v-1c0b9959] {\n  font-size: 16px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  color: #042b40;\n}\n.patent-form .form-box .cart-bar .cart-body[data-v-1c0b9959] {\n  padding: 20px 0 1px 12px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-1c0b9959] .el-form-item__label {\n  font-weight: normal;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n  border-radius: 0;\n  white-space: nowrap;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-1c0b9959] {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-1c0b9959] .el-input {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-1c0b9959] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  color: #444444;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-name-item[data-v-1c0b9959] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] {\n  width: 300px !important;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] .el-input__inner,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] .el-date-editor.el-input,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] .el-date-editor.el-input__inner {\n  width: 300px !important;\n  border-radius: 0;\n  border: 0;\n  background: none;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-area[data-v-1c0b9959] .el-textarea__inner {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-1c0b9959] .el-input.is-disabled .el-input__inner {\n  color: #444;\n}\n.patent-form .upload-pic[data-v-1c0b9959] .el-upload--picture-card {\n  width: 100px;\n  height: 100px;\n  line-height: 110px;\n}\n.patent-form .upload-pic[data-v-1c0b9959] .el-upload-list--picture-card .el-upload-list__item {\n  width: 100px;\n  height: 100px;\n}\n.patent-form .pic-modal .pic[data-v-1c0b9959] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.patent-form .btn-group-handle[data-v-1c0b9959] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: 10px;\n}\n.patent-form .btn-group-handle .btn[data-v-1c0b9959] {\n  padding: 0;\n  width: 100px;\n  height: 38px;\n  font-size: 16px;\n}\n.patent-form .btn-group-handle .btn.blue[data-v-1c0b9959] {\n  color: #fff;\n  background: -webkit-gradient(linear, left top, left bottom, from(#9bddff), to(#37bbff));\n  background: linear-gradient(180deg, #9bddff 0%, #37bbff 100%);\n}\n.patent-form .btn-group-handle .btn.cananl[data-v-1c0b9959] {\n  color: #444444;\n  background: #ffffff;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n}\n","",{version:3,sources:["H:/java/chengguoyun-web/src/views/customerManage/customerCenter/copyrightForm.vue"],names:[],mappings:";AACA;EACE,gBAAgB;CACjB;AACD;EACE,iBAAiB;EACjB,mBAAmB;EACnB,gBAAgB;EAChB,8BAA8B;CAC/B;AACD;EACE,iBAAiB;EACjB,iBAAiB;EACjB,uDAAuD;UAC/C,+CAA+C;EACvD,mBAAmB;CACpB;AACD;EACE,cAAc;EACd,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,iCAAiC;CAClC;AACD;EACE,WAAW;EACX,aAAa;EACb,oBAAoB;EACpB,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,6BAA6B;EAC7B,iBAAiB;EACjB,eAAe;CAChB;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,oBAAoB;EACpB,gBAAgB;EAChB,8BAA8B;EAC9B,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,aAAa;CACd;AACD;EACE,aAAa;CACd;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,iBAAiB;EACjB,UAAU;EACV,eAAe;EACf,+CAA+C;CAChD;AACD;EACE,aAAa;EACb,iBAAiB;EACjB,iBAAiB;EACjB,UAAU;EACV,+CAA+C;CAChD;AACD;EACE,wBAAwB;CACzB;AACD;;;EAGE,wBAAwB;EACxB,iBAAiB;EACjB,UAAU;EACV,iBAAiB;EACjB,+CAA+C;CAChD;AACD;EACE,aAAa;CACd;AACD;EACE,YAAY;CACb;AACD;EACE,aAAa;EACb,cAAc;EACd,mBAAmB;CACpB;AACD;EACE,aAAa;EACb,cAAc;CACf;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;CACjC;AACD;EACE,iBAAiB;EACjB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;EAChC,oBAAoB;CACrB;AACD;EACE,WAAW;EACX,aAAa;EACb,aAAa;EACb,gBAAgB;CACjB;AACD;EACE,YAAY;EACZ,wFAAwF;EACxF,8DAA8D;CAC/D;AACD;EACE,eAAe;EACf,oBAAoB;EACpB,uDAAuD;UAC/C,+CAA+C;CACxD",file:"copyrightForm.vue",sourcesContent:["\n.patent-form[data-v-1c0b9959] {\n  margin: auto 5%;\n}\n.patent-form .title[data-v-1c0b9959] {\n  margin-top: 20px;\n  padding-left: 20px;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n}\n.patent-form .form-box .cart-bar[data-v-1c0b9959] {\n  background: #fff;\n  margin-top: 20px;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n  border-radius: 4px;\n}\n.patent-form .form-box .cart-bar .cart-title[data-v-1c0b9959] {\n  padding: 16px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #dbe9ff;\n}\n.patent-form .form-box .cart-bar .cart-title .line[data-v-1c0b9959] {\n  width: 3px;\n  height: 14px;\n  background: #05aaff;\n  margin-right: 10px;\n}\n.patent-form .form-box .cart-bar .cart-title .title-name[data-v-1c0b9959] {\n  font-size: 16px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  color: #042b40;\n}\n.patent-form .form-box .cart-bar .cart-body[data-v-1c0b9959] {\n  padding: 20px 0 1px 12px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-1c0b9959] .el-form-item__label {\n  font-weight: normal;\n  font-size: 14px;\n  color: rgba(68, 68, 68, 0.75);\n  border-radius: 0;\n  white-space: nowrap;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-1c0b9959] {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-1c0b9959] .el-input {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .user-name-item[data-v-1c0b9959] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  color: #444444;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-name-item[data-v-1c0b9959] .el-input__inner {\n  width: 300px;\n  background: none;\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] {\n  width: 300px !important;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] .el-input__inner,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] .el-date-editor.el-input,\n.patent-form .form-box .cart-bar .cart-body .form-input .select-date[data-v-1c0b9959] .el-date-editor.el-input__inner {\n  width: 300px !important;\n  border-radius: 0;\n  border: 0;\n  background: none;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.patent-form .form-box .cart-bar .cart-body .form-input .patent-area[data-v-1c0b9959] .el-textarea__inner {\n  width: 300px;\n}\n.patent-form .form-box .cart-bar .cart-body .form-input[data-v-1c0b9959] .el-input.is-disabled .el-input__inner {\n  color: #444;\n}\n.patent-form .upload-pic[data-v-1c0b9959] .el-upload--picture-card {\n  width: 100px;\n  height: 100px;\n  line-height: 110px;\n}\n.patent-form .upload-pic[data-v-1c0b9959] .el-upload-list--picture-card .el-upload-list__item {\n  width: 100px;\n  height: 100px;\n}\n.patent-form .pic-modal .pic[data-v-1c0b9959] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.patent-form .btn-group-handle[data-v-1c0b9959] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-bottom: 10px;\n}\n.patent-form .btn-group-handle .btn[data-v-1c0b9959] {\n  padding: 0;\n  width: 100px;\n  height: 38px;\n  font-size: 16px;\n}\n.patent-form .btn-group-handle .btn.blue[data-v-1c0b9959] {\n  color: #fff;\n  background: -webkit-gradient(linear, left top, left bottom, from(#9bddff), to(#37bbff));\n  background: linear-gradient(180deg, #9bddff 0%, #37bbff 100%);\n}\n.patent-form .btn-group-handle .btn.cananl[data-v-1c0b9959] {\n  color: #444444;\n  background: #ffffff;\n  -webkit-box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=90.30897c864e7d1e3bba2b.js.map