webpackJsonp([109],{cxk9:function(t,i,e){var n=e("u2a9");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("rjj0")("3a0a8e2f",n,!0)},l0Gl:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("mvHQ"),a=e.n(n),o=e("TIfe"),r={page:1,limit:20},l={name:"apply_account_list",components:{},props:{id:{type:String}},data:function(){return{search_keyword:null,search_type:"policy",hot_search_keyword_list:["wtf","wtf"],search_placeholder_list:{},search_placeholder:"",more_condition:!1,host:"https://chengguoyun.cn",list:[],total:0,count:0,listQuery:JSON.parse(a()(r)),province_list:[],city_list:[],district_list:[],town_list:[],isCheckDeleteRecord:!1,isCheckAll:!1,check_biz_ids:[],select_filter_list:[],ent_list:[],order_type_list:[],dialogVisible:!1,ruleForm:{},rules:{enterprise:[{required:!0,message:"请输入企业名称",trigger:"change"}],official_name:[{required:!0,message:"请输入官方平台名称",trigger:"blur"}],official_url:[{required:!0,message:"请输入官方平台网址",trigger:"blur"}]},can_create:Object(o.d)(this,"create","/project/account-mng"),can_delete:Object(o.d)(this,"delete","/project/account-mng"),can_edit:Object(o.d)(this,"edit","/project/account-mng")}},filters:{},mounted:function(){this.$route.query.ent_biz_id&&(this.id=this.$route.query.ent_biz_id),this.getListFilter(),this.getList()},methods:{callbackError:function(t){for(var i in t){this.tempArr=t[i];break}this.$message({type:"error",message:this.tempArr[0].message})},goSearch:function(){},getMoreCondition:function(){this.more_condition=!this.more_condition},handleFilter:function(){this.listQuery.page=1,this.getList()},getList:function(){this.listLoading=!0,JSON.parse(a()(this.listQuery)).ent_biz_id=this.id},getProvinces:function(){},areaSetNull:function(t){3===t&&(this.listQuery.city_id="",this.citys=[]),t>=2&&(this.listQuery.district_id="",this.districts=[]),t>=1&&(this.listQuery.town_id="",this.towns=[])},changeProvince:function(){this.listQuery.page=1,this.areaSetNull(3),this.getCitys(),this.getList()},getCitys:function(){},changeCity:function(){this.listQuery.page=1,this.areaSetNull(2),this.getDistricts(),this.getList()},getDistricts:function(){},changeDistrict:function(){this.listQuery.page=1,this.areaSetNull(1),this.getTowns(),this.getList()},changeTown:function(){this.listQuery.page=1,this.getList()},getTowns:function(){},clearAllSelect:function(){this.listQuery=JSON.parse(a()(r)),this.getList()},clearThisSelect:function(t){if(t.key in this.listQuery){var i=this.listQuery[t.key];i instanceof Array&&-1!==i.indexOf(t.val)?i.splice(i.indexOf(t.val),1):delete this.listQuery[t.key]}this.getList()},checkAllOrNo:function(){if(this.isCheckAll)this.check_biz_ids=[],this.isCheckAll=!1;else{var t=this;this.list.forEach(function(i,e){-1===t.check_biz_ids.indexOf(i.biz_id)&&t.check_biz_ids.push(i.biz_id),t.isCheckAll=!0})}},getListFilter:function(){},loadMore:function(){this.listQuery.page+=1,this.listLoading=!0,this.list.length,this.total},handleDelete:function(){if(this.check_biz_ids.length<=0)return this.$message.error("请勾选删除的行!"),!1;this.$confirm("您确定删除吗？").then(function(t){})},checkDeleteRecord:function(){this.listQuery.is_delete=!this.listQuery.is_delete,this.getList()},handleCreate:function(t){this.ruleForm={},this.dialogVisible=!0,this.id&&(this.ruleForm.ent_biz_id=this.id)},handleCheck:function(t){},handleUpdate:function(t){this.dialogVisible=!0,this.ruleForm=t,this.id&&(this.ruleForm.ent_biz_id=this.id)},submitForm:function(t){var i=this;this.$refs[t].validate(function(t,e){if(!t)return i.callbackError(e),!1;if(i.ruleForm.admin_account&&i.ruleForm.admin_password||i.ruleForm.apply_account&&i.ruleForm.apply_password)i.ruleForm;else i.$message({type:"error",message:"管理员账号密码和申请人账号密码至少填写一项"})})},handleRedirect:function(t){t||(t="/ipr/patent_info/edit");var i=this.$router.resolve({path:t});window.open(i.href,"_blank")},handleTabChange:function(){this.search_placeholder=this.search_placeholder_list[this.search_type],this.handleFilter()},handleExport:function(){var t=JSON.parse(a()(this.listQuery));t.is_export=!0,t.check_biz_ids=this.check_biz_ids,this.id&&(t.ent_biz_id=this.id)}}},s={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"dashboard-container",staticStyle:{overflow:"auto","overflow-x":"hidden",height:"100%"}},[e("el-row",{staticStyle:{"margin-bottom":"20px"}},[e("div"),t._v(" "),e("el-card",{staticClass:"top-margin-10 padding-0"},[e("div",[e("span",{staticStyle:{color:"#03ADF4","font-weight":"bold"}},[t._v("|")]),t._v(" "),e("span",{staticStyle:{color:"#ABABAB"}},[t._v("搜索到"),e("span",{staticStyle:{color:"#F9A9A9"}},[t._v(t._s(t.total))]),t._v("条记录")]),t._v(" "),e("a",{staticClass:"padding-5 right-margin-10 blue-border",on:{click:t.checkAllOrNo}},[t._v("全选")]),t._v(" "),t.can_create?e("a",{staticClass:"padding-5 right-margin-10 blue-border",on:{click:t.handleCreate}},[t._v("新增")]):t._e(),t._v(" "),t.can_delete?e("a",{staticClass:"padding-5 right-margin-10 red-border",on:{click:t.handleDelete}},[t._v("删除")]):t._e(),t._v(" "),e("span",{staticClass:"float-right right-margin-10",staticStyle:{"vertical-align":"middle","margin-top":"-10px"}},[t.order_type_list&&t.order_type_list.length>0?e("el-select",{attrs:{clearable:"",placeholder:"默认排序"},on:{change:t.handleFilter},model:{value:t.listQuery.order_type,callback:function(i){t.$set(t.listQuery,"order_type",i)},expression:"listQuery.order_type"}},t._l(t.order_type_list,function(t){return e("el-option",{key:t.key,attrs:{label:t.val,value:t.key}})}),1):t._e()],1)]),t._v(" "),e("div",{staticStyle:{height:"3px","background-color":"#EDF4FF",width:"100%","margin-top":"20px"}}),t._v(" "),t._l(t.list,function(i,n){return e("div",{staticClass:"top-margin-10",staticStyle:{"padding-bottom":"20px","border-bottom":"2px solid #F1F0F2",overflow:"hidden"}},[e("div",{staticClass:"float-left overflow-x content-font overflow-y",staticStyle:{width:"90%"}},[e("el-row",{staticClass:"top-margin-10",attrs:{gutter:20}},[e("el-col",{attrs:{span:4}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.check_biz_ids,expression:"check_biz_ids"}],attrs:{type:"checkbox",name:"check_biz_ids"},domProps:{value:i.biz_id,checked:Array.isArray(t.check_biz_ids)?t._i(t.check_biz_ids,i.biz_id)>-1:t.check_biz_ids},on:{change:function(e){var n=t.check_biz_ids,a=e.target,o=!!a.checked;if(Array.isArray(n)){var r=i.biz_id,l=t._i(n,r);a.checked?l<0&&(t.check_biz_ids=n.concat([r])):l>-1&&(t.check_biz_ids=n.slice(0,l).concat(n.slice(l+1)))}else t.check_biz_ids=o}}}),t._v(" "),e("div",{staticClass:"project_badge",staticStyle:{display:"inline-block"}},[t._v(t._s(n+1))]),t._v("\n              官方平台名称:"+t._s(i.official_name)+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:4}},[t._v("\n              官方平台网址:"+t._s(i.official_url)+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:4}},[t._v("\n              账号:"+t._s(i.admin_account)+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:3}},[t._v("\n              密码:"+t._s(i.admin_password)+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:3}},[t._v("\n              账号角色:"+t._s(i.admin_job)+"\n            ")]),t._v(" "),e("el-col",{attrs:{span:3}},[t._v("\n              其它(备注):"+t._s(i.remarks)+"\n            ")])],1)],1),t._v(" "),e("div",{staticClass:"float-right right-margin-10 text-align-center overflow-x overflow-y",staticStyle:{width:"100px"}},[e("div",{staticClass:"top-margin-10",staticStyle:{"margin-bottom":"2px"}},[t.can_edit?e("span",{staticClass:"blue-border",on:{click:function(e){return t.handleUpdate(i)}}},[t._v("编辑")]):t._e()])])])}),t._v(" "),e("div",{staticClass:"padding-0",staticStyle:{"margin-top":"20px"}},[e("div",{staticStyle:{"text-align":"center",height:"40px","line-height":"30px"},on:{click:t.loadMore}},[t._v(t._s(t.list.length>=t.total?"没有更多":"加载更多"))])])],2)],1),t._v(" "),e("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"申报账号",visible:t.dialogVisible,width:"50%","append-to-body":""},on:{"update:visible":function(i){t.dialogVisible=i}}},[e("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",staticStyle:{"margin-bottom":"70px"},attrs:{model:t.ruleForm,rules:t.rules,"label-width":"140px"}},[t.id?t._e():e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"企业名称",prop:"enterprise"}},[e("el-select",{ref:"enterprise",staticStyle:{width:"300px"},attrs:{filterable:"",placeholder:"请选择"},model:{value:t.ruleForm.enterprise,callback:function(i){t.$set(t.ruleForm,"enterprise",i)},expression:"ruleForm.enterprise"}},t._l(t.ent_list,function(t){return e("el-option",{key:t.pk,attrs:{label:t.enterprise_name,value:t.pk}})}),1)],1),t._v(" "),e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"官方平台名称",prop:"official_name"}},[e("el-input",{ref:"official_name",staticStyle:{width:"300px"},model:{value:t.ruleForm.official_name,callback:function(i){t.$set(t.ruleForm,"official_name",i)},expression:"ruleForm.official_name"}})],1),t._v(" "),e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"官方平台网址",prop:"official_url"}},[e("el-input",{ref:"official_url",staticStyle:{width:"300px"},attrs:{type:"textarea",row:1},model:{value:t.ruleForm.official_url,callback:function(i){t.$set(t.ruleForm,"official_url",i)},expression:"ruleForm.official_url"}})],1),t._v(" "),e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"账号",prop:"admin_account"}},[e("el-input",{staticStyle:{width:"300px"},model:{value:t.ruleForm.admin_account,callback:function(i){t.$set(t.ruleForm,"admin_account",i)},expression:"ruleForm.admin_account"}})],1),t._v(" "),e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"密码",prop:"admin_password"}},[e("el-input",{staticStyle:{width:"300px"},model:{value:t.ruleForm.admin_password,callback:function(i){t.$set(t.ruleForm,"admin_password",i)},expression:"ruleForm.admin_password"}})],1),t._v(" "),e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"账号角色",prop:"apply_account"}},[e("el-input",{staticStyle:{width:"300px"},model:{value:t.ruleForm.admin_job,callback:function(i){t.$set(t.ruleForm,"admin_job",i)},expression:"ruleForm.admin_job"}})],1),t._v(" "),e("el-form-item",{staticStyle:{display:"inline-block"},attrs:{label:"其它(备注)",prop:"project_name"}},[e("el-input",{staticStyle:{width:"300px"},attrs:{type:"textarea",row:1},model:{value:t.ruleForm.remarks,callback:function(i){t.$set(t.ruleForm,"remarks",i)},expression:"ruleForm.remarks"}})],1)],1),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(i){return t.submitForm("ruleForm")}}},[t._v("保 存")])],1)],1)],1)},staticRenderFns:[]};var c=e("VU/8")(l,s,!1,function(t){e("cxk9")},"data-v-97925698",null);i.default=c.exports},u2a9:function(t,i,e){(t.exports=e("FZ+f")(!1)).push([t.i,'\n.body[data-v-97925698] {\n  width: 100%;\n  height: 100px;\n  overflow-y: hidden;\n}\n.content-font[data-v-97925698] {\n  font-size: 14px;\n  font-weight: 400;\n}\n.text-align-center[data-v-97925698] {\n  text-align: center;\n}\n.overflow-x[data-v-97925698] {\n  overflow-x: hidden;\n}\n.overflow-y[data-v-97925698] {\n  overflow-y: hidden;\n}\n.display_inline[data-v-97925698] {\n  display: inline;\n}\n.margin-0[data-v-97925698] {\n  margin: 0px;\n}\n.all-width[data-v-97925698] {\n  width: 100%;\n}\n.width-50[data-v-97925698] {\n  width: 50px;\n}\n.width-100[data-v-97925698] {\n  width: 100px;\n}\n.width-200[data-v-97925698] {\n  width: 200px;\n}\n.width-300[data-v-97925698] {\n  width: 300px;\n}\n.width-400[data-v-97925698] {\n  width: 400px;\n}\n.width-500[data-v-97925698] {\n  width: 500px;\n}\n.width-600[data-v-97925698] {\n  width: 600px;\n}\n.width-700[data-v-97925698] {\n  width: 700px;\n}\n.width-800[data-v-97925698] {\n  width: 800px;\n}\n.bottom-margin-2[data-v-97925698] {\n  margin-bottom: 2px;\n}\n.bottom-margin-4[data-v-97925698] {\n  margin-bottom: 4px;\n}\n.bottom-margin-5[data-v-97925698] {\n  margin-bottom: 5px;\n}\n.top-margin-10[data-v-97925698] {\n  margin-top: 10px;\n}\n.left-margin-10[data-v-97925698] {\n  margin-left: 10px;\n}\n.right-margin-10[data-v-97925698] {\n  margin-right: 10px;\n}\n.right-margin-20[data-v-97925698] {\n  margin-right: 20px;\n}\n.right-margin-30[data-v-97925698] {\n  margin-right: 30px;\n}\n.padding-0[data-v-97925698] {\n  padding: 0;\n}\n.padding-10[data-v-97925698] {\n  padding: 10px;\n}\n.hot-search[data-v-97925698] {\n  width: 48px;\n  height: 17px;\n  font-size: 12px;\n  font-family: PingFang SC;\n  font-weight: 400;\n  line-height: 17px;\n  color: #042b40;\n  opacity: 1;\n}\n.hot-search-kw[data-v-97925698] {\n  margin: auto 10px;\n  width: 24px;\n  height: 16px;\n  font-size: 12px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 16px;\n  color: #979797;\n  opacity: 1;\n}\n.center-items[data-v-97925698] {\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.row-width-auto-margin-0-90[data-v-97925698] {\n  width: auto;\n  margin: auto 5%;\n}\n.float-right[data-v-97925698] {\n  float: right;\n}\n.float-left[data-v-97925698] {\n  float: left;\n}\n.padding-vertical-5[data-v-97925698] {\n  padding: 5px 0;\n}\n.padding-5[data-v-97925698] {\n  padding: 5px;\n}\n.padding-vertical-10[data-v-97925698] {\n  padding: 10px 0;\n}\n.padding-level-10[data-v-97925698] {\n  padding: 0 10px;\n}\n.search_input[data-v-97925698] {\n  width: 600px;\n  height: 48px;\n  background: #ffffff;\n  border: 1px solid rgba(5, 170, 255, 0.72941176);\n  opacity: 1;\n}\n.bg_blue[data-v-97925698] {\n  background: #05AAFF;\n  color: #fff;\n}\n.bg_blue[data-v-97925698]:hover {\n  background: #05AAFF;\n  opacity: 0.5;\n}\n.bt_blue[data-v-97925698] {\n  width: 120px;\n  height: 48px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#69ccff), to(#05aaff));\n  background: linear-gradient(180deg, #69ccff 0%, #05aaff 100%);\n  opacity: 1;\n  border-radius: 2px;\n}\n.bt_purple[data-v-97925698] {\n  width: 120px;\n  height: 48px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#98b1fa), to(#5883ff));\n  background: linear-gradient(180deg, #98b1fa 0%, #5883ff 100%);\n  opacity: 1;\n  border-radius: 2px;\n}\n.bt_font[data-v-97925698] {\n  width: 96px;\n  height: 22px;\n  font-size: 16px;\n  font-family: PingFang SC;\n  font-weight: 400;\n  line-height: 22px;\n  color: #ffffff;\n  opacity: 1;\n}\n.type_bg[data-v-97925698] {\n  width: 84px;\n  height: 84px;\n  background: #91e5a1;\n  border-radius: 10px;\n  opacity: 1;\n}\n.type_font[data-v-97925698] {\n  width: 36px;\n  height: 50px;\n  font-size: 18px;\n  font-family: PingFang SC;\n  font-weight: 400;\n  line-height: 50px;\n  color: #ffffff;\n  opacity: 1;\n}\n.policy_notice_name[data-v-97925698] {\n  height: 24px;\n  font-size: 18px;\n  font-family: Microsoft YaHei;\n  font-weight: bold;\n  line-height: 24px;\n  color: #444444;\n  opacity: 1;\n}\n.normal_name[data-v-97925698] {\n  width: 70px;\n  height: 19px;\n  font-size: 14px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 19px;\n  color: rgba(68, 68, 68, 0.75);\n  opacity: 1;\n}\n.red_name[data-v-97925698] {\n  height: 19px;\n  font-size: 14px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 19px;\n  color: #f56c6c;\n  opacity: 1;\n}\n.can_click[data-v-97925698] {\n  width: 42px;\n  height: 19px;\n  font-size: 14px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 19px;\n  color: #05aaff;\n  opacity: 1;\n}\n.project_bg[data-v-97925698] {\n  border-radius: 5px;\n  padding: 1px 10px;\n  width: 100%;\n  background: #effaff;\n  opacity: 1;\n}\n.project_badge[data-v-97925698] {\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  background: #91e5a1;\n  color: #ffffff;\n  border-radius: 50%;\n  opacity: 1;\n}\n.edit_bt[data-v-97925698] {\n  width: 70px;\n  height: 30px;\n  background: #ffffff;\n  font-size: 14px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 19px;\n  border: 1px solid #33B3EE;\n  color: #33B3EE;\n  opacity: 1;\n}\n.send_sms_bt[data-v-97925698] {\n  width: 70px;\n  height: 30px;\n  background: #ffffff;\n  font-size: 12px;\n  font-family: Microsoft YaHei;\n  font-weight: 400;\n  line-height: 19px;\n  border: 1px solid #FFCBA6;\n  color: #FFCBA6;\n  opacity: 1;\n}\n.red-border[data-v-97925698] {\n  border: 1px solid #ff0000;\n  color: #ff0000;\n}\n.blue-border[data-v-97925698] {\n  border: 1px solid #33B3EE;\n  color: #33B3EE;\n}\n.orange-border[data-v-97925698] {\n  border: 1px solid #FFCBA6;\n  color: #FFCBA6;\n}\ninput[type="checkbox"][data-v-97925698] {\n  width: 15px;\n  height: 15px;\n  display: inline-block;\n  text-align: center;\n  vertical-align: middle;\n  line-height: 15px;\n  position: relative;\n}\ninput[type="checkbox"][data-v-97925698]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: #fff;\n  width: 100%;\n  height: 100%;\n  border: 1px solid #d9d9d9;\n}\ninput[type="checkbox"][data-v-97925698]:checked::before {\n  content: "\\2713";\n  background-color: #05AAFF;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  border: 1px solid #05AAFF;\n  color: #ffffff;\n  font-size: 15px;\n  font-weight: bold;\n}\n',""])}});