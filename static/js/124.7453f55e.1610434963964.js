webpackJsonp([124],{"J/kV":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("mvHQ"),i=l.n(a),s=l("c8+v"),n={data:function(){return{listParams:{page:0,pageSize:20},listData:{},form:{},rules:{},updateVisible:!1}},props:["id","isContractListSkipFlag"],mounted:function(){this.id&&this.getCompanyList()},filters:{lengthFilter:function(e){return void 0!=e&&""!=e&&null!=e&&e?e:"-"}},methods:{getCompanyList:function(){var e=this;this.listParams={page:0,pageSize:20},this.listParams.crmCompanyId=this.id,this.isContractListSkipFlag&&(this.listParams.isContractListSkipFlag=Number(this.isContractListSkipFlag)),Object(s.z)(this.listParams).then(function(t){200===t.code&&(e.listData=JSON.parse(i()(t.data.data[0])),e.form=t.data.data[0],t.data.data[0].socialSecurityNum&&""!=t.data.data[0].socialSecurityNum||e.$set(e.form,"socialSecurityNum",0),t.data.data[0].technologyNum&&""!=t.data.data[0].technologyNum||e.$set(e.form,"technologyNum",0),t.data.data[0].collegeNum&&""!=t.data.data[0].collegeNum||e.$set(e.form,"collegeNum",0),t.data.data[0].universityNum&&""!=t.data.data[0].universityNum||e.$set(e.form,"universityNum",0),t.data.data[0].masterNum&&""!=t.data.data[0].masterNum||e.$set(e.form,"masterNum",0),t.data.data[0].doctorNum&&""!=t.data.data[0].doctorNum||e.$set(e.form,"doctorNum",0),t.data.data[0].lowLevelNum&&""!=t.data.data[0].lowLevelNum||e.$set(e.form,"lowLevelNum",0),t.data.data[0].midLevelNum&&""!=t.data.data[0].midLevelNum||e.$set(e.form,"midLevelNum",0),t.data.data[0].highLevelNum&&""!=t.data.data[0].highLevelNum||e.$set(e.form,"highLevelNum",0))})},handleUpdate:function(){var e=this;this.form.crmCompanyId=this.id,""==this.form.socialSecurityNum&&(this.form.socialSecurityNum=0),""==this.form.technologyNum&&(this.form.technologyNum=0),""==this.form.collegeNum&&(this.form.collegeNum=0),""==this.form.universityNum&&(this.form.universityNum=0),""==this.form.masterNum&&(this.form.masterNum=0),""==this.form.doctorNum&&(this.form.doctorNum=0),""==this.form.lowLevelNum&&(this.form.lowLevelNum=0),""==this.form.midLevelNum&&(this.form.midLevelNum=0),""==this.form.highLevelNum&&(this.form.highLevelNum=0),Object(s.L)(this.form).then(function(t){200===t.code&&(e.$message.success(t.data.message?t.data.message:"保存成功!"),e.updateVisible=!1,e.getCompanyList())})},handleCancel:function(){this.updateVisible=!1,this.getCompanyList()}}},o={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"sales-plan-box"},[l("div",{staticClass:"list"},[l("div",{staticClass:"list-title"},[l("div",{staticClass:"left"},[l("div",{staticClass:"title-text"},[l("span",{staticClass:"line"}),e._v(" "),l("div",{staticClass:"btn",on:{click:function(t){e.updateVisible=!0}}},[e._v("编辑")])])])]),e._v(" "),l("div",{staticClass:"list-detail"},[l("table",[l("tr",[l("td",[e._v("参保人数："+e._s(e._f("lengthFilter")(e.listData.socialSecurityNum)))]),e._v(" "),l("td",[e._v("科技人数："+e._s(e._f("lengthFilter")(e.listData.technologyNum)))]),e._v(" "),l("td",[e._v("大专以上人数："+e._s(e._f("lengthFilter")(e.listData.collegeNum)))]),e._v(" "),l("td",[e._v("本科以上人数："+e._s(e._f("lengthFilter")(e.listData.universityNum)))]),e._v(" "),l("td",[e._v("硕士以上人数："+e._s(e._f("lengthFilter")(e.listData.masterNum)))])]),e._v(" "),l("tr",[l("td",[e._v("博士以上人数："+e._s(e._f("lengthFilter")(e.listData.doctorNum)))]),e._v(" "),l("td",[e._v("初级职称人数："+e._s(e._f("lengthFilter")(e.listData.lowLevelNum)))]),e._v(" "),l("td",[e._v("中级职称人数："+e._s(e._f("lengthFilter")(e.listData.midLevelNum)))]),e._v(" "),l("td",[e._v("高级职称人数："+e._s(e._f("lengthFilter")(e.listData.highLevelNum)))])])])])]),e._v(" "),l("el-dialog",{attrs:{title:"编辑",visible:e.updateVisible,width:"586px"},on:{"update:visible":function(t){e.updateVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"参保人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"参保人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.socialSecurityNum,callback:function(t){e.$set(e.form,"socialSecurityNum",t)},expression:"form.socialSecurityNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"科技人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"科技人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.technologyNum,callback:function(t){e.$set(e.form,"technologyNum",t)},expression:"form.technologyNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"大专以上人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"大专以上人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.collegeNum,callback:function(t){e.$set(e.form,"collegeNum",t)},expression:"form.collegeNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"本科以上人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"本科以上人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.universityNum,callback:function(t){e.$set(e.form,"universityNum",t)},expression:"form.universityNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"硕士以上人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"硕士以上人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.masterNum,callback:function(t){e.$set(e.form,"masterNum",t)},expression:"form.masterNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"博士以上人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"博士以上人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.doctorNum,callback:function(t){e.$set(e.form,"doctorNum",t)},expression:"form.doctorNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"初级职称人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"初级职称人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.lowLevelNum,callback:function(t){e.$set(e.form,"lowLevelNum",t)},expression:"form.lowLevelNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"中级职称人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"中级职称人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.midLevelNum,callback:function(t){e.$set(e.form,"midLevelNum",t)},expression:"form.midLevelNum"}})],1)],1),e._v(" "),l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[l("el-form-item",{attrs:{label:"高级职称人数:"}},[l("el-input",{attrs:{min:"0",type:"number",placeholder:"高级职称人数",oninput:"if(value.length>9)value=value.slice(0,9)",onKeypress:"return (/[\\d]/.test(String.fromCharCode(event.keyCode)))"},model:{value:e.form.highLevelNum,callback:function(t){e.$set(e.form,"highLevelNum",t)},expression:"form.highLevelNum"}})],1)],1),e._v(" "),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{staticClass:"bg_blue",on:{click:e.handleUpdate}},[e._v("确 定")]),e._v(" "),l("el-button",{on:{click:e.handleCancel}},[e._v("取 消")])],1)],1)],1)},staticRenderFns:[]};var r=l("VU/8")(n,o,!1,function(e){l("cFeM")},"data-v-2b984b35",null);t.default=r.exports},KGlU:function(e,t,l){(e.exports=l("FZ+f")(!1)).push([e.i,"\nul li[data-v-2b984b35] {\n  list-style: none;\n}\n.sales-plan-box[data-v-2b984b35] {\n  margin: auto 5%;\n}\n.sales-plan-box .list[data-v-2b984b35] {\n  background: #ffffff;\n  -webkit-box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);\n  margin-top: 16px;\n}\n.sales-plan-box .list .list-title[data-v-2b984b35] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 5px 16px;\n  -webkit-box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);\n}\n.sales-plan-box .list .list-title .left[data-v-2b984b35] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.sales-plan-box .list .list-title .left .title-text[data-v-2b984b35] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-right: 38px;\n}\n.sales-plan-box .list .list-title .left .title-text .line[data-v-2b984b35] {\n  margin-right: 8px;\n  display: inline-block;\n  width: 3px;\n  height: 14px;\n  background: #ffa96a;\n}\n.sales-plan-box .list .list-title .left .title-text .btn[data-v-2b984b35] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-right: 20px;\n  padding: 4px 9px;\n  font-size: 16px;\n  color: #05aaff;\n  border: 1px solid #05aaff;\n  border-radius: 2px;\n  cursor: pointer;\n}\n.sales-plan-box .list .list-title .left .title-text .btn[data-v-2b984b35]:hover {\n  color: #fff;\n  background: #05aaff;\n}\n.sales-plan-box .list .list-title .left .title-text .btn.del[data-v-2b984b35] {\n  border: 1px solid #f56c6c;\n  color: #f56c6c;\n}\n.sales-plan-box .list .list-title .left .title-text .btn.del[data-v-2b984b35]:hover {\n  color: #fff;\n  background: #f56c6c;\n}\n.sales-plan-box .list .list-title .left .title-text .btn[data-v-2b984b35]:active {\n  opacity: 0.5;\n}\n.sales-plan-box .list .list-detail[data-v-2b984b35] {\n  padding: 10px 40px;\n}\n.sales-plan-box .list .list-detail table[data-v-2b984b35] {\n  width: 100%;\n}\n.sales-plan-box .list .list-detail table tr[data-v-2b984b35] {\n  height: 30px;\n}\n.sales-plan-box .bg_blue[data-v-2b984b35] {\n  background: #05AAFF;\n  color: #fff;\n}\n.sales-plan-box .bg_blue[data-v-2b984b35]:hover {\n  background: #05AAFF;\n  opacity: 0.5;\n}\n",""])},cFeM:function(e,t,l){var a=l("KGlU");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);l("rjj0")("3bc3fea1",a,!0)}});