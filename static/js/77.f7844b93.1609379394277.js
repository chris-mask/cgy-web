webpackJsonp([77],{NgDD:function(e,t,n){var a=n("ZuHW");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("39c15ebc",a,!0)},X6Fl:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("rN1C"),o={data:function(){return{projectId:"",noticeId:"",companyList:[],companyName:"",matchingCompanyInfoList:[],dialogVisible:!1,total:0,listQuery:{page:0,pageSize:20,companyPosition:[]},loading:!1,btnFlag:0}},directives:{loadMore:{bind:function(e,t){e.querySelector(".el-select-dropdown .el-select-dropdown__wrap").addEventListener("scroll",function(){this.scrollHeight-this.scrollTop<=this.clientHeight&&t.value()})}}},activated:function(){"notice"==this.$route.query.queryType?(this.noticeId=this.$route.query.id,this.projectId=""):(this.noticeId="",this.projectId=this.$route.query.id),this.getCompanyData(),window.addEventListener("scroll",this.scrollToTop)},destroyed:function(){clearInterval(this.timer),window.removeEventListener("scroll",this.scrollToTop)},methods:{backTop:function(){var e=this,t=setInterval(function(){var n=Math.floor(-e.scrollTop/5);document.documentElement.scrollTop=document.body.scrollTop=e.scrollTop+n,0===e.scrollTop&&clearInterval(t)},16)},scrollToTop:function(){var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scrollTop=e,this.scrollTop>0?this.btnFlag=!0:this.btnFlag=!1},pageDown:function(){this.listQuery.page=this.listQuery.page+20,this.getCompanyData()},goSearch:function(){this.listQuery.page=0,this.listQuery.pageSize=20,this.getCompanyData()},getCompanyData:function(){var e=this;this.listQuery.projectId=this.projectId,this.listQuery.noticeId=this.noticeId,Object(a.b)(this.listQuery).then(function(t){200===t.code&&(e.total=t.data.total,e.listQuery.page>0?e.companyList=e.companyList.concat(t.data.data):e.companyList=t.data.data)})},getMatchingCompanyInfo:function(e){var t=this;this.dialogVisible=!0,this.companyName='" '+e.companyName+' "的匹配详情',Object(a.d)({projectId:e.projectId,companyId:e.companyId,noticeId:e.noticeId}).then(function(n){200===n.code&&(t.matchingCompanyInfoList=n.data,t.matchingCompanyInfoList.forEach(function(n){n.projectId=e.projectId,n.noticeId=e.noticeId,n.getScore=n.getScore>0?t.$set(n,"getScore",n.getScore):t.$set(n,"getScore",0),n.isPass=n.isPass>0?t.$set(n,"isPass",1):t.$set(n,"isPass",0)}))})},updateGetScore:function(){var e=this,t=!1,n=0,o=/^\d+$/;this.matchingCompanyInfoList.forEach(function(e){o.test(e.getScore)?n+=Number(e.getScore):t=!0}),t?this.$message.error("已得分必须为正数或0"):n>100?this.$message.error("所有条件总得分不能超过100分"):Object(a.l)(this.matchingCompanyInfoList).then(function(t){200===t.code&&(e.companyName="",e.getCompanyData(),e.$message.success("修改成功"),e.dialogVisible=!1)})},toCompany:function(e){this.$router.push({path:"/customer/editCustomer",query:{id:e,tip:!0,check:!0,is_personal:!1}})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-card",{staticClass:"box-card box-margin",staticStyle:{"margin-bottom":"20px"}},[a("div",{staticClass:"searchCont"},[a("div",{staticClass:"searchLeft"},[a("el-input",{attrs:{size:"small",placeholder:"企业名称/社会信用代码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goSearch(t)}},model:{value:e.listQuery.companyName,callback:function(t){e.$set(e.listQuery,"companyName",t)},expression:"listQuery.companyName"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"},on:{click:e.goSearch}},[e._v("搜索")])],1)])]),e._v(" "),a("el-card",{staticClass:"box-card box-margin"},[a("div",[a("el-table",{ref:"companyTable",attrs:{data:e.companyList,border:"",fit:"","highlight-current-row":"","row-key":"companyId","reserve-selection":!0}},[a("el-table-column",{attrs:{align:"center","min-width":"130px",label:"政策名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.noticeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"110px",label:"项目名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.projectName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"130px",label:"企业名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{cursor:"pointer"},on:{click:function(n){return e.toCompany(t.row.companyId)}}},[e._v(e._s(t.row.companyName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"80px",label:"企业位置"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.companyPosition?a("span",[e._v("私海")]):a("span",[e._v("公海")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"160px",label:"企业地区"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.provinceName?a("span",[e._v(e._s(t.row.provinceName))]):e._e(),e._v(" "),t.row.cityName?a("span",[e._v(" - "+e._s(t.row.cityName))]):e._e(),e._v(" "),t.row.districtName?a("span",[e._v(" - "+e._s(t.row.districtName))]):e._e(),e._v(" "),t.row.townName?a("span",[e._v(" - "+e._s(t.row.townName))]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"80px",label:"业务员"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.userName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"联系人：联系号码"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.personnelName))]),e._v(" "),t.row.personnelMobile&&t.row.personnelName?a("span",[e._v("：")]):e._e(),e._v(" "),a("span",[e._v(e._s(t.row.personnelMobile))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"100px",label:"成立时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.registerTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"60px",label:"得分"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.totalScore))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"spanButton",on:{click:function(n){return e.getMatchingCompanyInfo(t.row)}}},[e._v("编辑")])]}}])})],1),e._v(" "),e.total-e.companyList.length>0?a("div",{staticClass:"noMore",on:{click:e.pageDown}},[e._v("\n          点击加载更多\n        ")]):a("div",{staticClass:"noMore"},[e._v("没有更多数据了")])],1)]),e._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:e.companyName,visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-table",{attrs:{data:e.matchingCompanyInfoList,border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"所属政策",prop:"noticeName"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.noticeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"条件描述",prop:"conditionDesc"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.conditionDesc))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"匹配方式",prop:"autoMatch",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.autoMatch?a("span",[e._v("人工判断")]):a("span",[e._v("自动匹配")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否符合",prop:"weightScore",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[1===t.row.isPass?a("span",[e._v("符合")]):a("span",[e._v("不符合")]),e._v(" "),a("span")]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"条件总分",prop:"weightScore",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.weightScore))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"已得分",prop:"getScore",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{type:"number"},model:{value:t.row.getScore,callback:function(n){e.$set(t.row,"getScore",n)},expression:"scope.row.getScore"}})]}}])})],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"medium"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.updateGetScore}},[e._v("修改已得分")])],1)],1),e._v(" "),a("div",{staticStyle:{height:"60px",position:"fixed",bottom:"100px",right:"0",width:"80px"}},[e.btnFlag?a("a",{attrs:{href:"javascript:",target:"_self"},on:{click:e.backTop}},[a("img",{attrs:{src:n("1XGe"),alt:""}})]):e._e()])],1)},staticRenderFns:[]};var r=n("VU/8")(o,i,!1,function(e){n("NgDD")},"data-v-b4ab2eb4",null);t.default=r.exports},ZuHW:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.searchCont[data-v-b4ab2eb4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.searchCont .searchLeft[data-v-b4ab2eb4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-v-b4ab2eb4] .el-input {\n  width: auto;\n  margin-right: 10px;\n}\n[data-v-b4ab2eb4] .el-table {\n  border: #d9f2ff 1px solid !important;\n}\n[data-v-b4ab2eb4] .el-table th.gutter {\n  display: table-cell !important;\n}\n[data-v-b4ab2eb4] .el-table--border th,[data-v-b4ab2eb4] .el-table th {\n  background: #2CB1F5 !important;\n  color: #fff;\n  font-weight: 400;\n  border-right: 1px solid rgba(220, 223, 230, 0.21);\n  padding: 7px 0;\n}\n[data-v-b4ab2eb4] .el-table__row:nth-child(even) {\n  background: #ebf8ff !important;\n  border: 1px solid rgba(0, 141, 214, 0.26666667);\n}\n[data-v-b4ab2eb4] .el-table--border td {\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n[data-v-b4ab2eb4] .el-table--border td:first-child {\n  border-right: #d9f2ff 1px solid !important;\n}\n[data-v-b4ab2eb4] .el-table--border td:last-child {\n  border-left: #d9f2ff 1px solid !important;\n}\n.spanButton[data-v-b4ab2eb4] {\n  color: #05AAFF;\n}\n.shu[data-v-b4ab2eb4] {\n  margin: 0 10px;\n  color: #ccc;\n}\n.col_red[data-v-b4ab2eb4] {\n  color: #FF6B6B !important;\n}\n.col_red[data-v-b4ab2eb4]:hover {\n  opacity: 0.5;\n}\n.col_skyblue[data-v-b4ab2eb4] {\n  color: #05AAFF !important;\n}\n.col_skyblue[data-v-b4ab2eb4]:hover {\n  opacity: 0.5;\n}\n.colUpDown[data-v-b4ab2eb4] {\n  color: #FD903C !important;\n}\n.colUpDown[data-v-b4ab2eb4]:hover {\n  opacity: 0.5;\n}\n.chooseCompany[data-v-b4ab2eb4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 10px;\n}\n[data-v-b4ab2eb4] .el-select {\n  /*margin-right: 10px;*/\n}\n.noMore[data-v-b4ab2eb4] {\n  text-align: center;\n  font-size: 14px;\n  padding: 10px 0;\n  cursor: pointer;\n}\n[data-v-b4ab2eb4] .el-dialog__header {\n  background: #05AAFF;\n  padding: 20px;\n}\n[data-v-b4ab2eb4] .el-dialog__header /deep/ .el-dialog__title {\n  color: #fff;\n  font-size: 16px;\n}\n[data-v-b4ab2eb4] .el-dialog__header /deep/ .el-dialog__headerbtn {\n  border-radius: 50%;\n  background: #fff;\n  padding: 4px;\n  font-size: 12px;\n  font-weight: 400;\n}\n[data-v-b4ab2eb4] .el-dialog__header /deep/ .el-dialog__headerbtn /deep/ .el-dialog__close {\n  color: #05AAFF;\n}\n[data-v-b4ab2eb4] .el-dialog__body {\n  padding: 10px 20px;\n}\n[data-v-b4ab2eb4] .el-dialog__footer {\n  text-align: center;\n}\n[data-v-b4ab2eb4] .el-dialog__footer /deep/ .el-button {\n  border-radius: 2px;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 20px;\n}\n",""])}});