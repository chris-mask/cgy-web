webpackJsonp([102],{CKkn:function(a,e,l){(a.exports=l("FZ+f")(!1)).push([a.i,"\n.row-width-auto-margin-0-90[data-v-03364761] {\n  width: auto;\n  margin: auto 4%;\n}\n[data-v-03364761] .el-card {\n  margin-bottom: 20px;\n}\n[data-v-03364761] .el-form-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 20px;\n  margin-right: 30px;\n}\n[data-v-03364761] .el-form-item__content {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%;\n  line-height: normal;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-v-03364761] .el-form-item__label {\n  font-weight: normal;\n  min-width: 110px;\n}\n.btnList[data-v-03364761] {\n  margin-top: 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  /*width: 60%;*/\n}\n.publicTit[data-v-03364761] {\n  font-size: 16px;\n  border-left: 2px solid #05AAFF;\n  padding-left: 10px;\n}\n",""])},Cdql:function(a,e,l){var o=l("CKkn");"string"==typeof o&&(o=[[a.i,o,""]]),o.locals&&(a.exports=o.locals);l("rjj0")("7e7071f4",o,!0)},edRd:function(a,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=l("UZ0P"),r={data:function(){return{approvalForm:{},approvalId:"",projectId:"",isShow:!1,isEdit:!1,projectBatchNoList:[{value:"0",label:"未指定"},{value:"1",label:"第一批"},{value:"2",label:"第二批"},{value:"3",label:"第三批"},{value:"4",label:"第四批"},{value:"5",label:"第五批"},{value:"6",label:"第六批"},{value:"7",label:"第七批"},{value:"8",label:"第八批"}],projectLevelList:[{value:"1",label:"国家级"},{value:"2",label:"省级"},{value:"3",label:"市级"},{value:"4",label:"区县级"},{value:"5",label:"镇街级"}]}},activated:function(){this.approvalId=this.$route.query.approvalId,this.projectId=this.$route.query.projectId,this.isShow=this.$route.query.isShow,this.isEdit=this.$route.query.isEdit,this.approvalId&&this.getDetail()},methods:{getDetail:function(){var a=this;Object(o.e)({approvalId:this.approvalId,page:0,pageSize:10}).then(function(e){200==e.code?a.approvalForm=e.data:a.$message.warning(e.message)})},editHandle:function(){var a=this;this.approvalForm.projectYear=this.approvalForm.year,this.$delete(this.approvalForm,"year"),Object(o.g)(this.approvalForm).then(function(e){200===e.code&&(a.$message.success("修改成功"),a.cancelSub())})},cancelSub:function(){this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,"/approvalCollaborative")},goCompanyDatail:function(){this.$router.push({path:"/customer/editCustomer",query:{id:this.approvalForm.companyId,check:!0}})}}},t={render:function(){var a=this,e=a.$createElement,l=a._self._c||e;return l("div",{staticClass:"app-container"},[l("div",{staticClass:"row-width-auto-margin-0-90"},[l("el-form",{ref:"approvalForm",attrs:{model:a.approvalForm,rules:a.rules}},[l("el-card",{staticClass:"box-card"},[l("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[l("p",{staticClass:"publicTit"},[a._v(a._s(a.isEdit?"立项编辑":"立项公示详情"))])]),a._v(" "),l("div",{staticClass:"form-control"},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"客户名称：",prop:"companyName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.companyName,callback:function(e){a.$set(a.approvalForm,"companyName",e)},expression:"approvalForm.companyName"}}):l("span",{staticStyle:{cursor:"pointer"},on:{click:a.goCompanyDatail}},[a._v(a._s(a.approvalForm.companyName?a.approvalForm.companyName:"-"))])],1)],1)],1),a._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"项目名称：",prop:"projectName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.projectName,callback:function(e){a.$set(a.approvalForm,"projectName",e)},expression:"approvalForm.projectName"}}):l("span",[a._v(a._s(a.approvalForm.projectName?a.approvalForm.projectName:"-"))])],1)],1)],1),a._v(" "),l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"相关政策：",prop:"noticeName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.noticeName,callback:function(e){a.$set(a.approvalForm,"noticeName",e)},expression:"approvalForm.noticeName"}}):l("span",[a._v(a._s(a.approvalForm.noticeName?a.approvalForm.noticeName:"-"))])],1)],1)],1)],1)]),a._v(" "),l("el-card",{staticClass:"box-card"},[l("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[l("p",{staticClass:"publicTit"},[a._v("基本信息")])]),a._v(" "),l("div",{staticClass:"form-control"},[l("el-row",[l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"签约公司：",prop:"signCompanyName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.signCompanyName,callback:function(e){a.$set(a.approvalForm,"signCompanyName",e)},expression:"approvalForm.signCompanyName"}}):l("span",[a._v(a._s(a.approvalForm.signCompanyName?a.approvalForm.signCompanyName:"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"签订人：",prop:"signUserName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.signUserName,callback:function(e){a.$set(a.approvalForm,"signUserName",e)},expression:"approvalForm.signUserName"}}):l("span",[a._v(a._s(a.approvalForm.signUserName?a.approvalForm.signUserName:"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"签订日期：",prop:"signDate"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.signDate,callback:function(e){a.$set(a.approvalForm,"signDate",e)},expression:"approvalForm.signDate"}}):l("span",[a._v(a._s(a.approvalForm.signDate?a.approvalForm.signDate:"-"))])],1)],1)],1),a._v(" "),l("el-row",[l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"项目工程师：",prop:"engineerUserName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.engineerUserName,callback:function(e){a.$set(a.approvalForm,"engineerUserName",e)},expression:"approvalForm.engineerUserName"}}):l("span",[a._v(a._s(a.approvalForm.engineerUserName?a.approvalForm.engineerUserName:"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"财务审计人员：",prop:"auditUserName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.auditUserName,callback:function(e){a.$set(a.approvalForm,"auditUserName",e)},expression:"approvalForm.auditUserName"}}):l("span",[a._v(a._s(a.approvalForm.auditUserName?a.approvalForm.auditUserName:"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"是否渠道合同：",prop:"isChannel"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.isChannel,callback:function(e){a.$set(a.approvalForm,"isChannel",e)},expression:"approvalForm.isChannel"}}):l("span",[a._v(a._s(0==a.approvalForm.isChannel?"不是":1==a.approvalForm.isChannel?"是":"-"))])],1)],1)],1),a._v(" "),l("el-row",[l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"渠道名称：",prop:"channelName"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.channelName,callback:function(e){a.$set(a.approvalForm,"channelName",e)},expression:"approvalForm.channelName"}}):l("span",[a._v(a._s(a.approvalForm.channelName?a.approvalForm.channelName:"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"通过数量："}},[a.isShow?l("el-input",{attrs:{size:"small",type:"number",clearable:""},model:{value:a.approvalForm.projectNum,callback:function(e){a.$set(a.approvalForm,"projectNum",e)},expression:"approvalForm.projectNum"}}):l("span",[a._v(a._s(a.approvalForm.projectNum?a.approvalForm.projectNum:1))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"扶持金额：",prop:"subsidyTotal"}},[a.isShow?l("el-input",{attrs:{size:"small",clearable:""},model:{value:a.approvalForm.subsidyTotal,callback:function(e){a.$set(a.approvalForm,"subsidyTotal",e)},expression:"approvalForm.subsidyTotal"}}):l("span",[a._v(a._s(a.approvalForm.subsidyTotal?a.approvalForm.subsidyTotal:"-"))])],1)],1)],1)],1)]),a._v(" "),l("el-card",{staticClass:"box-card"},[l("div",{staticClass:"headerTop",attrs:{slot:"header"},slot:"header"},[l("p",{staticClass:"publicTit"},[a._v("立项信息")])]),a._v(" "),l("div",{staticClass:"form-control"},[l("el-row",[l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"立项日期：",prop:"approvalDate"}},[a.isShow||a.isEdit?l("el-date-picker",{attrs:{size:"small",type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:a.approvalForm.approvalDate,callback:function(e){a.$set(a.approvalForm,"approvalDate",e)},expression:"approvalForm.approvalDate"}}):l("span",[a._v(a._s(a.approvalForm.approvalDate?a.approvalForm.approvalDate:"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"级别：",prop:"projectLevel"}},[a.isShow||a.isEdit?l("el-select",{attrs:{size:"small"},model:{value:a.approvalForm.projectLevel,callback:function(e){a.$set(a.approvalForm,"projectLevel",e)},expression:"approvalForm.projectLevel"}},a._l(a.projectLevelList,function(a){return l("el-option",{key:a.value,attrs:{value:a.value,label:a.label}})}),1):l("span",[a._v(a._s(1==a.approvalForm.projectLevel?"国家级":2==a.approvalForm.projectLevel?"省级":3==a.approvalForm.projectLevel?"市级":4==a.approvalForm.projectLevel?"区县级":5==a.approvalForm.projectLevel?"镇街级":"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"年份：",prop:"year"}},[a.isShow||a.isEdit?l("el-date-picker",{attrs:{size:"small",type:"year",placeholder:"选择年份","value-format":"yyyy"},model:{value:a.approvalForm.year,callback:function(e){a.$set(a.approvalForm,"year",e)},expression:"approvalForm.year"}}):l("span",[a._v(a._s(a.approvalForm.year?a.approvalForm.year:"-"))])],1)],1)],1),a._v(" "),l("el-row",[l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"批次：",prop:"projectBatchNo"}},[a.isShow||a.isEdit?l("el-select",{attrs:{size:"small"},model:{value:a.approvalForm.projectBatchNo,callback:function(e){a.$set(a.approvalForm,"projectBatchNo",e)},expression:"approvalForm.projectBatchNo"}},a._l(a.projectBatchNoList,function(a){return l("el-option",{key:a.value,attrs:{value:a.value,label:a.label}})}),1):l("span",[a._v("\n                    "+a._s(0==a.approvalForm.projectBatchNo?"未指定":1==a.approvalForm.projectBatchNo?"第一批":2==a.approvalForm.projectBatchNo?"第二批":3==a.approvalForm.projectBatchNo?"第三批":4==a.approvalForm.projectBatchNo?"第四批":5==a.approvalForm.projectBatchNo?"第五批":6==a.approvalForm.projectBatchNo?"第六批":7==a.approvalForm.projectBatchNo?"第七批":8==a.approvalForm.projectBatchNo?"第八批":"-")+"\n                  ")])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"数量：",prop:"applyNum"}},[a.isShow||a.isEdit?l("el-input",{staticStyle:{width:"auto"},attrs:{maxlength:"8",oninput:"value=value.replace(/[^0-9]/g,'')",size:"small",clearable:""},model:{value:a.approvalForm.applyNum,callback:function(e){a.$set(a.approvalForm,"applyNum",e)},expression:"approvalForm.applyNum"}}):l("span",[a._v(a._s(a.approvalForm.applyNum?a.approvalForm.applyNum:1))])],1)],1)],1),a._v(" "),l("el-row",[l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"批准金额：",prop:"approvalMoney"}},[a.isShow||a.isEdit?l("el-input",{staticStyle:{width:"auto"},attrs:{maxlength:"8",size:"small",oninput:"value=value.replace(/[^0-9]/g,'')",clearable:""},model:{value:a.approvalForm.approvalMoney,callback:function(e){a.$set(a.approvalForm,"approvalMoney",e)},expression:"approvalForm.approvalMoney"}}):l("span",[a._v(a._s(a.approvalForm.approvalMoney>99999999?a.approvalForm.approvalMoney/1e8+"亿":a.approvalForm.approvalMoney?a.approvalForm.approvalMoney/1e4+"万元":"-"))])],1)],1),a._v(" "),l("el-col",{attrs:{span:8}},[l("el-form-item",{attrs:{label:"公示结果：",prop:"approvalResult"}},[a.isShow||a.isEdit?l("el-select",{attrs:{size:"small"},model:{value:a.approvalForm.approvalResult,callback:function(e){a.$set(a.approvalForm,"approvalResult",e)},expression:"approvalForm.approvalResult"}},[l("el-option",{attrs:{label:"通过",value:1}}),a._v(" "),l("el-option",{attrs:{label:"不通过",value:0}})],1):l("span",[a._v(a._s(0==a.approvalResult?"不通过":1==a.approvalResult?"通过":"-"))])],1)],1)],1)],1)]),a._v(" "),l("div",{staticClass:"btnList"},[!a.approvalId&&a.isShow?l("el-button",{attrs:{size:"small",type:"primary"}},[a._v("确定")]):a._e(),a._v(" "),a.isEdit?l("el-button",{attrs:{size:"small",type:"primary"},on:{click:a.editHandle}},[a._v("修改")]):a._e(),a._v(" "),l("el-button",{attrs:{size:"small"},on:{click:a.cancelSub}},[a._v("取消")])],1)],1)],1)])},staticRenderFns:[]};var p=l("VU/8")(r,t,!1,function(a){l("Cdql")},"data-v-03364761",null);e.default=p.exports}});