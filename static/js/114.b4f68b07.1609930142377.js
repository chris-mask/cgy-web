webpackJsonp([114],{fSHI:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n("mvHQ"),i=n.n(e),o=n("tZro"),s=n("Nr9A"),r=n.n(s),l={data:function(){return{del_icon:r.a,activedNavTab:1,searchForm:{companyId:"",chatContent:"",startDate:"",endDate:"",page:0,pageSize:10,labelValue:1},chatContent:"",chatData:[],isShowMoreNews:!0,fileTemp:[],fileIds:"",rightNavTab:[{key:1,name:"全部"},{key:2,name:"客户消息"},{key:3,name:"内部消息"},{key:4,name:"我的消息"}]}},props:{id:{type:String}},mounted:function(){this.getChatList()},methods:{getChatList:function(){var t=this;this.searchForm.page=0,this.searchForm.companyId=this.id,Object(o.j)(this.searchForm).then(function(a){200===a.code&&(t.chatData=a.data.msgChatListVos,t.$nextTick(function(){t.$refs.dialog.scrollTop=t.$refs.dialog.scrollHeight}))})},sendData:function(){var t=this;if(""!=this.chatContent){var a={chatContent:this.chatContent,toCompanyId:this.id,companyId:this.$store.getters.companyId};""!==this.fileIds&&(a.fileIds=this.fileIds),Object(o.a)(a).then(function(a){200===a.code&&(t.fileTemp=[],t.fileIds="",t.chatContent="",t.getChatList())})}else this.$message.warning("请输入沟通内容")},getMore:function(){var t=this;this.searchForm.page+=1,Object(o.j)(this.searchForm).then(function(a){200===a.code&&(0!==a.data.msgChatListVos.length?JSON.parse(i()(a.data)).reverse().forEach(function(a){t.chatData.unshift(a),t.$nextTick(function(){var a=t.$refs.dialog.clientHeight;t.$refs.dialog.scrollTop=t.$refs.dialog.scrollHeight/2+a})}):t.isShowMoreNews=!1)})},handleKeyCode:function(t){13==t.keyCode&&t.ctrlKey?this.chatContent+="\n":13==t.keyCode&&(this.sendData(),t.preventDefault())},fileChange:function(t,a){var n=this,e=new FormData;e.append("companyId",this.id),e.append("files",t.raw),a.length>1&&a.splice(0,1),Object(o.b)(e).then(function(t){200===t.code&&(n.fileIds=t.data)})},handleRemove:function(t,a){this.fileIds=""},delChat:function(t){var a=this;this.$confirm("此操作将永久删除该消息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.d)({chatId:t.chatId}).then(function(n){200===n.code&&(a.chatData.forEach(function(n,e){t.chatId==n.chatId&&a.chatData.splice(e,1)}),a.$message({type:"success",message:"删除成功!"}))})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},downHandle:function(t){window.location.href=t},selectNavTab:function(t){this.activedNavTab=t.key,this.searchForm.page=0,this.searchForm.labelValue=t.key,this.getChatList()}},filters:{titleSize:function(t){return t.substring(0,1)}}},c={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{ref:"rightBox",staticClass:"right-box"},[n("div",{ref:"rightSearchHeard",staticClass:"search-heard"},[n("div",{staticClass:"left"},t._l(t.rightNavTab,function(a){return n("div",{key:a.key,class:t.activedNavTab===a.key?"tab-list cur":"tab-list",on:{click:function(n){return t.selectNavTab(a)}}},[t._v("\n        "+t._s(a.name)+"\n      ")])}),0),t._v(" "),n("div",{staticClass:"right"},[n("el-input",{staticClass:"chatRecord",attrs:{placeholder:"搜索记录"},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.getChatList(a)}},model:{value:t.searchForm.chatContent,callback:function(a){t.$set(t.searchForm,"chatContent",a)},expression:"searchForm.chatContent"}}),t._v(" "),n("el-date-picker",{staticClass:"time",attrs:{type:"date",placeholder:"开始日期","value-format":"yyyy-MM-dd"},model:{value:t.searchForm.startDate,callback:function(a){t.$set(t.searchForm,"startDate",a)},expression:"searchForm.startDate"}}),t._v("\n      至\n      "),n("el-date-picker",{staticClass:"time",attrs:{type:"date",placeholder:"结束日期","value-format":"yyyy-MM-dd"},model:{value:t.searchForm.endDate,callback:function(a){t.$set(t.searchForm,"endDate",a)},expression:"searchForm.endDate"}}),t._v(" "),n("el-button",{staticClass:"filter-item search-btn",on:{click:t.getChatList}},[t._v("搜索")])],1)]),t._v(" "),n("div",{staticClass:"dialog-box"},[n("div",{ref:"dialog",staticClass:"dialog"},[t.isShowMoreNews?n("div",{staticClass:"has-more-news",on:{click:t.getMore}},[n("span",[t._v("查看更多消息")])]):n("div",{staticClass:"has-more-news not_more"},[t._v("没有多消息了")]),t._v(" "),n("div",{staticClass:"connect-div"},[t._l(t.chatData,function(a){return["left"===a.msgPosition?n("div",{staticClass:"left-massage"},[n("div",{staticClass:"title"},[n("div",{staticClass:"pic"},[t._v(t._s(t._f("titleSize")(a.userName)))]),t._v(" "),n("div",{staticClass:"text"},[t._v(t._s(a.userName))]),t._v(" "),n("div",{staticClass:"time"},[t._v(t._s(a.sendTime))])]),t._v(" "),n("div",{staticClass:"content"},[t._v(t._s(a.chatContent))]),t._v(" "),a.appFileVoList&&0!==a.appFileVoList.length?t._l(a.appFileVoList,function(a){return n("div",{key:a.fileId,staticClass:"down-content"},[t._v("\n                附件："+t._s(a.fileName)+"."+t._s(a.fileType)+"\n                "),n("button",{staticClass:"down-btn",on:{click:function(n){return t.downHandle(a.fileUrl)}}},[t._v("下载")])])}):t._e()],2):t._e(),t._v(" "),"right"===a.msgPosition?n("div",{staticClass:"right-massage"},[n("div",{staticClass:"title"},[n("img",{staticClass:"del-icon",attrs:{src:t.del_icon},on:{click:function(n){return t.delChat(a)}}}),t._v(" "),n("div",{staticClass:"time"},[t._v(t._s(a.sendTime))]),t._v(" "),n("div",{staticClass:"text"},[t._v(t._s(a.userName))]),t._v(" "),n("div",{staticClass:"pic"},[t._v(t._s(t._f("titleSize")(a.userName)))])]),t._v(" "),n("div",{staticClass:"content"},[t._v("\n              "+t._s(a.chatContent)+"\n            ")]),t._v(" "),a.appFileVoList&&0!==a.appFileVoList.length?t._l(a.appFileVoList,function(a){return n("div",{key:a.fileId,staticClass:"down-content"},[t._v("\n                附件："+t._s(a.fileName)+t._s(a.fileType)+"\n                "),n("button",{directives:[{name:"preventReClick",rawName:"v-preventReClick"}],staticClass:"down-btn",on:{click:function(n){return t.downHandle(a.fileUrl)}}},[t._v("下载")])])}):t._e()],2):t._e()]})],2)]),t._v(" "),n("div",{ref:"dialogInput",staticClass:"dialog-input"},[n("el-input",{staticClass:"text-input",attrs:{autofocus:"true",type:"textarea",autosize:{minRows:3,maxRows:5},placeholder:"输入沟通内容..."},nativeOn:{keydown:function(a){return t.handleKeyCode(a)}},model:{value:t.chatContent,callback:function(a){t.chatContent=a},expression:"chatContent"}}),t._v(" "),n("div",{staticClass:"btn-group"},[n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-upload",{staticClass:"upload-box upload-box-width",attrs:{action:"#","auto-upload":!1,"file-list":t.fileTemp,"on-remove":t.handleRemove,"on-change":t.fileChange}},[n("el-button",{staticClass:"update-files-btn",attrs:{type:"info"}},[t._v("附件上传"),n("i",{staticClass:"el-icon-upload el-icon--right"})])],1)],1),t._v(" "),n("div",[n("span",{staticClass:"send-tap"},[t._v("Enter发送，Ctrl+Enter换行")]),t._v(" "),n("el-button",{staticClass:"send-btn",attrs:{type:"primary"},on:{click:t.sendData}},[t._v("发 送")])],1)])],1)])])},staticRenderFns:[]};var d=n("VU/8")(l,c,!1,function(t){n("uCp/")},"data-v-5bf5a65c",null);a.default=d.exports},fbqJ:function(t,a,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.right-box[data-v-5bf5a65c] {\n  width: 100%;\n  margin-top: 2px;\n  border: 1px solid #CDEEFF;\n}\n.right-box .company-name[data-v-5bf5a65c] {\n  height: 50px;\n  line-height: 50px;\n  color: #444444;\n  font-size: 18px;\n  font-weight: bold;\n  text-align: center;\n  border-bottom: 1px solid #CDEEFF;\n}\n.right-box .search-heard[data-v-5bf5a65c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  height: 54px;\n  border-bottom: 1px solid #CDEEFF;\n}\n.right-box .search-heard .left[data-v-5bf5a65c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  color: rgba(68, 68, 68, 0.6);\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.right-box .search-heard .left .tab-list[data-v-5bf5a65c] {\n  font-size: 14px;\n  cursor: pointer;\n  margin-left: 20px;\n  white-space: nowrap;\n}\n.right-box .search-heard .left .tab-list.cur[data-v-5bf5a65c] {\n  color: #05AAFF;\n}\n.right-box .search-heard .right[data-v-5bf5a65c] {\n  margin-right: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.right-box .search-heard .right .chatRecord[data-v-5bf5a65c] {\n  width: 160px;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.29803922);\n  margin-right: 20px;\n}\n.right-box .search-heard .right .chatRecord[data-v-5bf5a65c] .el-input__inner {\n  border: 0;\n  padding-right: 0;\n}\n.right-box .search-heard .right .time[data-v-5bf5a65c] {\n  width: 140px;\n  border: 0;\n  border-bottom: 1px solid rgba(68, 68, 68, 0.29803922);\n}\n.right-box .search-heard .right .time[data-v-5bf5a65c] .el-input__inner {\n  border: 0;\n  padding-right: 0;\n}\n.right-box .search-heard .right .search-btn[data-v-5bf5a65c] {\n  width: 60px;\n  height: 30px;\n  color: #fff;\n  padding: 0;\n  background: -webkit-gradient(linear, left top, left bottom, from(#69ccff), to(#05aaff));\n  background: linear-gradient(180deg, #69ccff 0%, #05aaff 100%);\n}\n.right-box .dialog-box .has-more-news[data-v-5bf5a65c] {\n  text-align: center;\n  color: #37BBFF;\n  font-size: 12px;\n}\n.right-box .dialog-box .has-more-news.not_more[data-v-5bf5a65c] {\n  color: rgba(68, 68, 68, 0.5);\n}\n.right-box .dialog-box .has-more-news span[data-v-5bf5a65c] {\n  cursor: pointer;\n}\n.right-box .dialog-box .dialog[data-v-5bf5a65c] {\n  height: 400px;\n  overflow-y: auto;\n  padding: 10px;\n  /*滚动条整体样式*/\n  /*滚动条里面小方块*/\n  /*滚动条里面轨道*/\n}\n.right-box .dialog-box .dialog .connect-div .left-massage[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage[data-v-5bf5a65c] {\n  margin-top: 10px;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .title[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .title[data-v-5bf5a65c] {\n  width: 50%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .title .pic[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .title .pic[data-v-5bf5a65c] {\n  width: 24px;\n  height: 24px;\n  background: #37BBFF;\n  color: #fff;\n  font-size: 12px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  border-radius: 50%;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .title .text[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .title .text[data-v-5bf5a65c] {\n  color: #444;\n  font-size: 14px;\n  margin: 0 10px;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .title .time[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .title .time[data-v-5bf5a65c] {\n  color: #FFA96A;\n  font-size: 14px;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .title .del-icon[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .title .del-icon[data-v-5bf5a65c] {\n  cursor: pointer;\n  margin-left: 10px;\n  width: 16px;\n  display: none;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .title:hover .del-icon[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .title:hover .del-icon[data-v-5bf5a65c] {\n  display: block;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .content[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .content[data-v-5bf5a65c] {\n  margin-top: 10px;\n  width: 50%;\n  color: rgba(68, 68, 68, 0.75);\n  max-width: 680px;\n  background: #EEF9FF;\n  font-size: 14px;\n  padding: 10px;\n  border-radius: 4px;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .down-content[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .down-content[data-v-5bf5a65c] {\n  margin-top: 10px;\n  font-size: 14px;\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .down-content .down-btn[data-v-5bf5a65c],\n.right-box .dialog-box .dialog .connect-div .right-massage .down-content .down-btn[data-v-5bf5a65c] {\n  width: 70px;\n  height: 30px;\n  color: #fff;\n  cursor: pointer;\n  outline: none;\n  border: 0;\n  border-radius: 4px;\n  margin-left: 10px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#69ccff), to(#05aaff));\n  background: linear-gradient(180deg, #69ccff 0%, #05aaff 100%);\n}\n.right-box .dialog-box .dialog .connect-div .left-massage .down-content .down-btn[data-v-5bf5a65c]:active,\n.right-box .dialog-box .dialog .connect-div .right-massage .down-content .down-btn[data-v-5bf5a65c]:active {\n  opacity: 0.5;\n}\n.right-box .dialog-box .dialog .connect-div .right-massage[data-v-5bf5a65c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n}\n.right-box .dialog-box .dialog .connect-div .right-massage .title[data-v-5bf5a65c] {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n.right-box .dialog-box .dialog .connect-div .right-massage .content[data-v-5bf5a65c] {\n  text-align: right;\n}\n.right-box .dialog-box .dialog .connect-div .right-massage .del-icon[data-v-5bf5a65c] {\n  margin-right: 10px;\n}\n.right-box .dialog-box .dialog[data-v-5bf5a65c]::-webkit-scrollbar {\n  width: 8px;\n  height: 1px;\n}\n.right-box .dialog-box .dialog[data-v-5bf5a65c]::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  background: #69CCFF;\n}\n.right-box .dialog-box .dialog[data-v-5bf5a65c]::-webkit-scrollbar-track {\n  border-radius: 10px;\n  background: #CDEEFF;\n}\n.right-box .dialog-box .dialog-input[data-v-5bf5a65c] {\n  height: 145px;\n  border: 1px solid #37BBFF;\n}\n.right-box .dialog-box .dialog-input[data-v-5bf5a65c] .el-textarea__inner {\n  border: 0;\n  resize: none;\n}\n.right-box .dialog-box .dialog-input .text-input[data-v-5bf5a65c] {\n  height: 100px;\n}\n.right-box .dialog-box .dialog-input .btn-group[data-v-5bf5a65c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 0 15px;\n}\n.right-box .dialog-box .dialog-input .btn-group[data-v-5bf5a65c] .el-button {\n  border: 0;\n}\n.right-box .dialog-box .dialog-input .btn-group .update-files-btn[data-v-5bf5a65c] {\n  background: -webkit-gradient(linear, left top, left bottom, from(#98b1fa), to(#5883ff));\n  background: linear-gradient(180deg, #98b1fa 0%, #5883ff 100%);\n}\n.right-box .dialog-box .dialog-input .btn-group .send-tap[data-v-5bf5a65c] {\n  font-size: 14px;\n  color: #00A5FF;\n  margin-right: 10px;\n}\n.right-box .dialog-box .dialog-input .btn-group .send-btn[data-v-5bf5a65c] {\n  background: -webkit-gradient(linear, left top, left bottom, from(#69ccff), to(#05aaff));\n  background: linear-gradient(180deg, #69ccff 0%, #05aaff 100%);\n}\n.upload-box[data-v-5bf5a65c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n",""])},"uCp/":function(t,a,n){var e=n("fbqJ");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("rjj0")("3254fa9e",e,!0)}});