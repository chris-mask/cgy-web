webpackJsonp([82],{"2JKf":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("vLgD"),i=a("s01O");var s=a("Q5rI"),l={data:function(){return{listData:[],dialogVisible:!1,ruleForm:{},rules:{websiteName:[{required:!0,message:"请输入官方平台名称",trigger:"blur"}],websiteUrl:[{required:!0,message:"请输入官方平台网址",trigger:"blur"}]},updatetitleName:null,websiteList:[],check_biz_ids:[],isCheckAll:!1}},props:["id"],mounted:function(){this.getListData()},methods:{getListData:function(){var t,e=this;(t={companyId:this.id},Object(n.a)({url:"/crm/api/crm/appWebsiteAccount/queryWebsiteAccountList",method:"POST",data:t})).then(function(t){200===t.code&&(e.listData=t.data,e.$emit("accountTotal",e.listData.length))})},getSteamList:function(){var t=this,e={keyList:"DICT:WEBSITEACCOUNT",companyId:this.$store.getters.companyId};Object(s.d)(e).then(function(e){200===e.code&&(t.websiteList=e.data["DICT:WEBSITEACCOUNT"])})},websiteHandle:function(t){var e=this;this.websiteList.forEach(function(a){t===a.dictName&&(e.ruleForm.websiteUrl=a.dictValue)})},btnHandle:function(t,e){var a=this;this.ruleForm={},this.dialogVisible=!0,this.updatetitleName=t,this.getSteamList(),!1===t&&function(t){return Object(n.a)({url:"/crm/api/crm/appWebsiteAccount/queryWebsiteAccountInfoById",method:"get",params:t})}({accountId:e.accountId}).then(function(t){200===t.code&&(a.ruleForm=t.data)})},setBtnHandle:function(t){var e=this;this.ruleForm.companyId=this.id,this.$refs[t].validate(function(t,a){var n;t&&(e.updatetitleName?(n=e.ruleForm,Object(i.a)({url:"/crm/api/crm/appWebsiteAccount/saveWebsiteAccount",method:"POST",data:n})).then(function(t){200===t.code&&(e.$message({type:"success",message:t.message}),e.dialogVisible=!1,e.getListData())}):function(t){return Object(i.a)({url:"/crm/api/crm/appWebsiteAccount/updateWebsiteAccount",method:"POST",data:t})}(e.ruleForm).then(function(t){200===t.code&&(e.$message({type:"success",message:t.message}),e.dialogVisible=!1,e.getListData())}))})},checkAllOrNo:function(){if(this.isCheckAll)this.check_biz_ids=[],this.isCheckAll=!1;else{var t=this;this.listData.forEach(function(e,a){-1===t.check_biz_ids.indexOf(e.accountId)&&t.check_biz_ids.push(e.accountId),t.isCheckAll=!0})}},checkOneOrNo:function(){this.check_biz_ids.length===this.listData.length?this.isCheckAll=!0:this.isCheckAll=!1},delAccountHandle:function(){var t,e=this;0===this.check_biz_ids.length?this.$message({message:"请勾选要删除的行！",type:"warning"}):(t=this.check_biz_ids,Object(i.a)({url:"/crm/api/crm/appWebsiteAccount/deleteWebsiteAccountByIds",method:"POST",data:t})).then(function(t){200===t.code&&(e.$message({type:"success",message:t.message}),e.isCheckAll=!1,e.getListData())})}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sales-plan-box"},[a("div",{staticClass:"list"},[a("div",{staticClass:"list-title"},[a("div",{staticClass:"left"},[a("div",{staticClass:"title-text"},[a("span",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"search-total-num"},[t._v("搜索到 "),a("span",{staticClass:"num"},[t._v(t._s(t.listData.length))]),t._v(" 条记录")])]),t._v(" "),a("div",{staticClass:"title-btn-group"},[a("div",{staticClass:"btn",on:{click:t.checkAllOrNo}},[t._v(" "+t._s(t.isCheckAll?"取消全选":"全选"))]),t._v(" "),a("div",{staticClass:"btn",on:{click:function(e){return t.btnHandle(!0)}}},[t._v("新增")]),t._v(" "),a("div",{staticClass:"btn del",on:{click:t.delAccountHandle}},[t._v("删除")])])])]),t._v(" "),a("div",{staticClass:"list-detail bg-list"},[0===t.listData.length?a("div",{staticClass:"no-data"},[t._v("暂无数据")]):t._l(t.listData,function(e,n){return a("div",{staticClass:"item bg-list"},[a("div",{staticClass:"check-num"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.check_biz_ids,expression:"check_biz_ids"}],staticClass:"check-box",attrs:{type:"checkbox"},domProps:{value:e.accountId,checked:Array.isArray(t.check_biz_ids)?t._i(t.check_biz_ids,e.accountId)>-1:t.check_biz_ids},on:{change:[function(a){var n=t.check_biz_ids,i=a.target,s=!!i.checked;if(Array.isArray(n)){var l=e.accountId,o=t._i(n,l);i.checked?o<0&&(t.check_biz_ids=n.concat([l])):o>-1&&(t.check_biz_ids=n.slice(0,o).concat(n.slice(o+1)))}else t.check_biz_ids=s},t.checkOneOrNo]}}),t._v(" "),a("span",{staticClass:"item-num"},[t._v(t._s(n+1))])]),t._v(" "),a("div",{staticClass:"item-body"},[a("div",{staticClass:"cate",attrs:{title:e.websiteName}},[t._v("官方平台名称："),a("span",[t._v(t._s(e.websiteName))])]),t._v(" "),a("div",{staticClass:"cate",attrs:{title:e.websiteUrl}},[t._v("官方平台网址："),a("span",[t._v(t._s(e.websiteUrl))])]),t._v(" "),a("div",{staticClass:"cate"},[t._v("账号："),a("span",[t._v(t._s(e.accountLoginname))])]),t._v(" "),a("div",{staticClass:"cate"},[t._v("密码："),a("span",[t._v(t._s(e.accountPassword))])]),t._v(" "),a("div",{staticClass:"cate"},[t._v("其他(备注)："),a("span",[t._v(t._s(e.accountDesc))])])]),t._v(" "),a("div",{staticClass:"handle-btn-group"},[a("div",{staticClass:"btn-img edit-img",staticStyle:{"background-size":"contain"},on:{click:function(a){return t.btnHandle(!1,e)}}})])])})],2)]),t._v(" "),a("el-dialog",{staticClass:"editorUserModal",attrs:{title:t.updatetitleName?"申报账号-新增":"申报账号-编辑",visible:t.dialogVisible,width:"600px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"120px"},nativeOn:{submit:function(t){t.preventDefault()}}},[a("el-form-item",{attrs:{label:"官方平台名称：",prop:"websiteName"}},[a("el-select",{staticClass:"user-input",staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择官方平台名称"},on:{change:t.websiteHandle},model:{value:t.ruleForm.websiteName,callback:function(e){t.$set(t.ruleForm,"websiteName",e)},expression:"ruleForm.websiteName"}},t._l(t.websiteList,function(t){return a("el-option",{key:t.dictId,attrs:{value:t.dictName,label:t.dictName}})}),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"官方平台网址：",prop:"websiteUrl"}},[a("el-input",{staticClass:"user-input",attrs:{readonly:"",placeholder:"请输入官方平台网址",maxlength:"100"},model:{value:t.ruleForm.websiteUrl,callback:function(e){t.$set(t.ruleForm,"websiteUrl",e)},expression:"ruleForm.websiteUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"账号："}},[a("el-input",{staticClass:"user-input",attrs:{placeholder:"请输入账号",maxlength:"50"},model:{value:t.ruleForm.accountLoginname,callback:function(e){t.$set(t.ruleForm,"accountLoginname",e)},expression:"ruleForm.accountLoginname"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"密码："}},[a("el-input",{staticClass:"user-input",attrs:{placeholder:"请输入密码",maxlength:"50"},model:{value:t.ruleForm.accountPassword,callback:function(e){t.$set(t.ruleForm,"accountPassword",e)},expression:"ruleForm.accountPassword"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"其它(备注)："}},[a("el-input",{attrs:{type:"textarea",resize:"none",rows:5,maxlength:"100",placeholder:"请输入其它(备注)"},model:{value:t.ruleForm.accountDesc,callback:function(e){t.$set(t.ruleForm,"accountDesc",e)},expression:"ruleForm.accountDesc"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{staticClass:"cananl",on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{staticClass:"setBtn",on:{click:function(e){return t.setBtnHandle("ruleForm")}}},[t._v("保 存")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(l,o,!1,function(t){a("86CE")},"data-v-6f881cbf",null);e.default=c.exports},"86CE":function(t,e,a){var n=a("Z1aq");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("3f23f408",n,!0)},Z1aq:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.sales-plan-box[data-v-6f881cbf] {\n  margin: auto 5%;\n}\n.sales-plan-box .list[data-v-6f881cbf] {\n  background: #ffffff;\n  -webkit-box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);\n  margin-top: 16px;\n}\n.sales-plan-box .list .list-title[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 5px 16px;\n  -webkit-box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);\n          box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);\n}\n.sales-plan-box .list .list-title .left[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.sales-plan-box .list .list-title .left .title-text[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-right: 38px;\n}\n.sales-plan-box .list .list-title .left .title-text .line[data-v-6f881cbf] {\n  margin-right: 8px;\n  display: inline-block;\n  width: 3px;\n  height: 14px;\n  background: #ffa96a;\n}\n.sales-plan-box .list .list-title .left .title-text .search-total-num[data-v-6f881cbf] {\n  font-size: 14px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  color: rgba(68, 68, 68, 0.75);\n}\n.sales-plan-box .list .list-title .left .title-text .search-total-num .num[data-v-6f881cbf] {\n  color: #FF6C6C;\n}\n.sales-plan-box .list .list-title .left .title-btn-group[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 50px;\n}\n.sales-plan-box .list .list-title .left .title-btn-group .btn[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-right: 20px;\n  padding: 4px 9px;\n  font-size: 16px;\n  color: #05aaff;\n  border: 1px solid #05aaff;\n  border-radius: 2px;\n  cursor: pointer;\n}\n.sales-plan-box .list .list-title .left .title-btn-group .btn[data-v-6f881cbf]:hover {\n  color: #fff;\n  background: #05aaff;\n}\n.sales-plan-box .list .list-title .left .title-btn-group .btn.del[data-v-6f881cbf] {\n  border: 1px solid #f56c6c;\n  color: #f56c6c;\n}\n.sales-plan-box .list .list-title .left .title-btn-group .btn.del[data-v-6f881cbf]:hover {\n  color: #fff;\n  background: #f56c6c;\n}\n.sales-plan-box .list .list-title .left .title-btn-group .btn[data-v-6f881cbf]:active {\n  opacity: 0.5;\n}\n.sales-plan-box .list .list-detail .item[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 10px 20px;\n  padding-bottom: 2px;\n  padding-right: 4px;\n  position: relative;\n}\n.sales-plan-box .list .list-detail .item .check-num[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-right: 10px;\n}\n.sales-plan-box .list .list-detail .item .check-num .check-box[data-v-6f881cbf] {\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n  margin-right: 10px;\n  margin-top: 1px;\n}\n.sales-plan-box .list .list-detail .item .check-num .item-num[data-v-6f881cbf] {\n  width: 18px;\n  height: 18px;\n  background: #91e5a1;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 14px;\n  border-radius: 50%;\n}\n.sales-plan-box .list .list-detail .item .item-body[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  font-size: 14px;\n  width: 90%;\n}\n.sales-plan-box .list .list-detail .item .item-body .cate[data-v-6f881cbf] {\n  min-width: 20%;\n  padding-right: 10px;\n  white-space: nowrap;\n  margin-bottom: 10px;\n  color: rgba(68, 68, 68, 0.75);\n}\n.sales-plan-box .list .list-detail .item .item-body .cate span[data-v-6f881cbf] {\n  color: #444;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 90%;\n  display: inline-block;\n}\n.sales-plan-box .list .list-detail .item .handle-btn-group[data-v-6f881cbf] {\n  width: 70px;\n  min-width: 70px;\n  margin-top: -5px;\n}\n.sales-plan-box .list .list-detail .item .handle-btn-group .btn-img[data-v-6f881cbf] {\n  cursor: pointer;\n  width: 66px;\n  height: 26px;\n}\n.sales-plan-box .list .list-detail .item .handle-btn-group .btn-img.edit-img[data-v-6f881cbf] {\n  background-size: contain;\n  background: url("+a("cuAl")+") no-repeat;\n}\n.sales-plan-box .list .list-detail .item .handle-btn-group .btn-img.edit-img[data-v-6f881cbf]:hover {\n  background-size: contain;\n  background: url("+a("L74e")+") no-repeat;\n}\n.sales-plan-box .list .list-detail .bg-list[data-v-6f881cbf]:nth-child(even) {\n  background: #dee6ff;\n}\n.sales-plan-box .list .list-detail .bg-list[data-v-6f881cbf]:nth-child(even):hover {\n  background: #C5D4FF;\n}\n.sales-plan-box .list .list-detail .bg-list[data-v-6f881cbf]:nth-child(odd) {\n  background: #effaff;\n}\n.sales-plan-box .list .list-detail .bg-list[data-v-6f881cbf]:nth-child(odd):hover {\n  background: #CDEEFF;\n}\n.sales-plan-box .list .list-detail .no-data[data-v-6f881cbf] {\n  padding: 10px;\n  text-align: center;\n}\n.sales-plan-box .editorUserModal[data-v-6f881cbf] .el-dialog__header {\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n  padding: 20px 20px 16px;\n}\n.sales-plan-box .editorUserModal[data-v-6f881cbf] .el-dialog__title {\n  line-height: 0;\n}\n.sales-plan-box .editorUserModal[data-v-6f881cbf] .el-dialog__headerbtn {\n  top: 19px;\n}\n.sales-plan-box .editorUserModal[data-v-6f881cbf] .el-dialog__body {\n  padding: 14px;\n}\n.sales-plan-box .editorUserModal[data-v-6f881cbf] .el-form-item__label {\n  font-weight: normal;\n  color: rgba(68, 68, 68, 0.75);\n}\n.sales-plan-box .editorUserModal[data-v-6f881cbf] .el-form-item__content {\n  width: 73%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.sales-plan-box .editorUserModal .user-input[data-v-6f881cbf] .el-input__inner {\n  border: 0;\n  border-radius: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.sales-plan-box .editorUserModal .user-input.input[data-v-6f881cbf] {\n  width: 100%;\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.sales-plan-box .editorUserModal .user-input.input[data-v-6f881cbf]:focus {\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.3);\n}\n.sales-plan-box .editorUserModal .user-select[data-v-6f881cbf] {\n  width: 100%;\n}\n.sales-plan-box .editorUserModal .switch-btn[data-v-6f881cbf] {\n  font-size: 14px;\n  color: #fff;\n  background: #05aaff;\n  margin-left: 10px;\n}\n.sales-plan-box .editorUserModal .switch-btn[data-v-6f881cbf]:active {\n  opacity: 0.5;\n}\n.sales-plan-box .editorUserModal .modal-radio[data-v-6f881cbf] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.sales-plan-box .editorUserModal .modal-radio[data-v-6f881cbf] .el-form-item__content {\n  margin-left: 0 !important;\n}\n.sales-plan-box .editorUserModal .dialog-footer .setBtn[data-v-6f881cbf] {\n  color: #fff;\n  background: #05aaff;\n}\n.sales-plan-box .editorUserModal .dialog-footer .cananl[data-v-6f881cbf] {\n  background: #fff;\n  color: #444444;\n}\n",""])}});