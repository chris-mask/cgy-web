webpackJsonp([47,48,52],{"1Rx3":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("bEjd"),s=e("7EAa"),r=e("+xof"),i=e("k96P"),l=e("Eoil"),o=e("Ndbe"),_=e("jfHn"),c=e("1uyy"),p={newVisitis:{expectedData:[100,120,161,134,105,160,165],actualData:[120,82,91,154,162,140,145]},messages:{expectedData:[200,192,120,144,160,130,140],actualData:[180,160,151,106,145,150,130]},purchases:{expectedData:[80,100,121,104,105,90,100],actualData:[120,90,100,138,142,130,130]},shoppings:{expectedData:[130,140,141,142,145,150,160],actualData:[120,82,91,154,162,140,130]}},d={name:"dashboard-admin",components:{PanelGroup:n.default,LineChart:s.default,RaddarChart:r.default,PieChart:i.default,BarChart:l.default,TransactionTable:o.default,TodoList:_.default,BoxCard:c.default},data:function(){return{lineChartData:p.newVisitis}},methods:{handleSetLineChartData:function(t){this.lineChartData=p[t]}}},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("github-corner",{staticStyle:{position:"absolute",top:"0px",border:"0",right:"0"}}),t._v(" "),e("panel-group",{on:{handleSetLineChartData:t.handleSetLineChartData}}),t._v(" "),e("el-row",{staticStyle:{background:"#fff",padding:"16px 16px 0","margin-bottom":"32px"}},[e("line-chart",{attrs:{"chart-data":t.lineChartData}})],1),t._v(" "),e("el-row",{attrs:{gutter:32}},[e("el-col",{attrs:{xs:24,sm:24,lg:8}},[e("div",{staticClass:"chart-wrapper"},[e("raddar-chart")],1)]),t._v(" "),e("el-col",{attrs:{xs:24,sm:24,lg:8}},[e("div",{staticClass:"chart-wrapper"},[e("pie-chart")],1)]),t._v(" "),e("el-col",{attrs:{xs:24,sm:24,lg:8}},[e("div",{staticClass:"chart-wrapper"},[e("bar-chart")],1)])],1),t._v(" "),e("el-row",{attrs:{gutter:8}},[e("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[e("transaction-table")],1),t._v(" "),e("el-col",{staticStyle:{"margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:12},md:{span:12},lg:{span:6},xl:{span:6}}},[e("todo-list")],1),t._v(" "),e("el-col",{staticStyle:{"margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:12},md:{span:12},lg:{span:6},xl:{span:6}}},[e("box-card")],1)],1)],1)},staticRenderFns:[]};var u=e("VU/8")(d,v,!1,function(t){e("HSJ2")},"data-v-d4940dfc",null);a.default=u.exports},ARoL:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("Dd8w"),s=e.n(n),r=e("NYxO"),i=e("1Rx3"),l=e("DY7s"),o=e("iub5"),_=e.n(o),c={name:"dashboard",components:{adminDashboard:i.default,editorDashboard:l.default,treeTransfer:_.a},data:function(){return{currentRole:"adminDashboard",activeNames:["1"],listQuery:{page:1,limit:999,state:"1"},boardData:{},to_do:{},today_sale_plan:{},msg_center:{},process_notice_count:0,maintenance_notice_count:0,task_count:0,is_enterprise:!1,NoticeList:[],kanBanVisible:!1,kan_ban_title:["可选看板","我的看板"],button_text:["添加","移除"],from_data:[],to_data:[]}},filters:{difficultyFilter:function(t){return{1:"普惠性",2:"竞争性"}[t]}},computed:s()({},Object(r.b)(["roles"])),mounted:function(){this.getNewsCount(),this.getList(),this.getBoard()},created:function(){this.roles.includes("admin")||(this.currentRole="editorDashboard")},methods:{getList:function(){this.listQuery.precision=!0},getNewsCount:function(){},getBoard:function(){},turnTo:function(t){1===t?this.$router.push("/project/process-mng/list"):2===t?this.$router.push("/maintenance/maintenance-update-mng/list"):3===t?this.$router.push("/development/my_matter/list"):4===t?this.$router.push("/project/report-mng/list?apply_report=3&report_review_state=1"):5===t?this.$router.push("/project/report-mng/list?apply_report=3&report_review_state=2"):6===t?this.$router.push("/contract/contract-mng/list?review_state=2"):7===t?this.$router.push("/contract/contract-mng/list?review_state=1"):8===t?this.$router.push("/enterprise/sale_plan/list?time_type=2"):9===t?this.$router.push("/message-center/list?active_name=first"):10===t&&this.$router.push("/message-center/list?active_name=second&read_or_not=1")},getArea:function(t){t.policy__apply_area_province_id&&(t.areaLevel="省级"),t.policy__apply_area_city_id&&(t.areaLevel="市级"),t.policy__apply_area_district_id&&(t.areaLevel="地区"),t.policy__apply_area_town_id&&(t.areaLevel="镇级")},getUserKanBan:function(){this.kanBanVisible=!0},add:function(t,a,e){this.to_data=a},remove:function(t,a,e){this.to_data=a},saveBindUser:function(){this.kanBanVisible=!1}}},p={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-container"},[e("el-card",{staticClass:"index-box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"index-content-title"},[t._v("简报看板")])]),t._v(" "),e("div",[e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/policy/policy-mng/list",query:{is_invisible_policy:"2",available:"1"}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("可申报的政策")]),t._v("（"+t._s(t.boardData.to_do_policy_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/policy/notice-mng/list",query:{state:"1"}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("可申报的通知")]),t._v("（"+t._s(t.boardData.to_do_notice_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/project/report-mng/list",query:{state:1}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("可申报的评估")]),t._v("（"+t._s(t.boardData.apply_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前高新技术产品数")]),t._v("（"+t._s(t.boardData.product_count)+"）")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前职工总数")]),t._v("（"+t._s(t.boardData.staff_count)+"）")])],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前科技人员数")]),t._v("（"+t._s(t.boardData.techenology_staff_count)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前使用设备数")]),t._v("（"+t._s(t.boardData.equipment_count)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前使用软件数")]),t._v("（"+t._s(t.boardData.software_count)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前项目备案数")]),t._v("（"+t._s(t.boardData.project_record_count)+"）")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前研发项目数")]),t._v("（"+t._s(t.boardData.dev_project_count)+"）")])],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/ipr/patent_info/list",query:{}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前授权专利数")]),t._v("（"+t._s(t.boardData.patent_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/ipr/copyright_info/list",query:{}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前著作权数")]),t._v("（"+t._s(t.boardData.copy_right_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/ipr/trademark_mng/list",query:{}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前商标数")]),t._v("（"+t._s(t.boardData.trademark_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/ipr/certificate_mng/list",query:{}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前企业证书数")]),t._v("（"+t._s(t.boardData.cert_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:4}},[e("router-link",{attrs:{target:"_blank",to:{path:"/maintenance/maintenance-mng/list",query:{}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前已立项数")]),t._v("（"+t._s(t.boardData.maintenance_count)+"）")])],1)],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/ipr/patent_info/list",query:{case_state:"1"}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前需缴费专利数")]),t._v("（"+t._s(t.boardData.pay_patent_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/ipr/trademark_mng/list",query:{valid_days_type:"5"}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当前需续展商标数")]),t._v("（"+t._s(t.boardData.develop_trademark_count)+"）")])],1)],1),t._v(" "),e("div",[t._v(" ")]),t._v(" "),e("div",[t._v(" ")]),t._v(" "),t.boardData.is_employee?e("div",[e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/free_sea/list",query:{}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("企业总数")]),t._v("（"+t._s(t.boardData.ent_data.total_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/free_sea/list",query:{ent_tech_type:"is_high_tech_ent"}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("高企总数")]),t._v("（"+t._s(t.boardData.ent_data.high_tech_total_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/free_sea/list",query:{ent_tech_type:"not_high_tech_ent"}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("非高企总数")]),t._v("（"+t._s(t.boardData.ent_data.not_high_tech_total_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{enterprise_scale:1}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("小型企业数")]),t._v("（"+t._s(t.boardData.ent_data.enterprise_scale_mini)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:4}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{enterprise_scale:2}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("中型企业数")]),t._v("（"+t._s(t.boardData.ent_data.enterprise_scale_middle)+"）")])],1)],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{enterprise_scale:3}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("大型企业数")]),t._v("（"+t._s(t.boardData.ent_data.enterprise_scale_large)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:1}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("上市企业数")]),t._v("（"+t._s(t.boardData.ent_data.is_listed_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:2}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("即将上市企业数")]),t._v("（"+t._s(t.boardData.ent_data.to_be_listed_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:3}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("成立3年内企业数")]),t._v("（"+t._s(t.boardData.ent_data.establishment_in_three_years)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:4}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:4}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("营收1亿以上企业数")]),t._v("（"+t._s(t.boardData.ent_data.annual_sales_above_hundred_million)+"）")])],1)],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:5}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("近七日业务员更替的企业")]),t._v("（"+t._s(t.boardData.ent_data.last_change_business_enterprise)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:6}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("近半个月业务员更替的企业")]),t._v("（"+t._s(t.boardData.ent_data.last_change_business_enterprise_half_month)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/project/process-mng/list",query:{other_filter:3}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("近半个月申报订单签订数")]),t._v("（"+t._s(t.boardData.ent_data.half_month_process_info_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/project/process-mng/list",query:{other_filter:2}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("近七日申报订单签订数")]),t._v("（"+t._s(t.boardData.ent_data.seven_days_process_info_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:4}},[e("router-link",{attrs:{target:"_blank",to:{path:"/project/process-mng/list",query:{other_filter:1}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("当日申报订单签订数")]),t._v("（"+t._s(t.boardData.ent_data.today_process_info_num)+"）")])],1)],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:7}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("专利数5个以上的企业数")]),t._v("（"+t._s(t.boardData.ent_data.patent_above_five_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:8}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("软著5个以上的企业数")]),t._v("（"+t._s(t.boardData.ent_data.copyright_above_five_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:9}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("人员规模1000以上的企业数")]),t._v("（"+t._s(t.boardData.ent_data.employee_scale_above_1000_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:10}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("年销售额500-2000w的企业数")]),t._v("（"+t._s(t.boardData.ent_data.enterprise_annual_sales_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:4}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/enterprise_list/list",query:{other_filter:11}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("年销售额2000w以上的企业数")]),t._v("（"+t._s(t.boardData.ent_data.enterprise_annual_sales_above_20mw_num)+"）")])],1)],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/free_sea/list",query:{project_center_type:1}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("工程中心企业数")]),t._v("（"+t._s(t.boardData.ent_data.project_center_ent_num)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:5}},[e("router-link",{attrs:{target:"_blank",to:{path:"/enterprise/free_sea/list",query:{tech_center_type:1}}}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("技术中心企业数")]),t._v("（"+t._s(t.boardData.ent_data.tech_center_ent_num)+"）")])],1)],1)],1):t._e(),t._v(" "),t.boardData.is_employee?e("span",[e("div",[t._v(" ")]),t._v(" "),e("div",[t._v(" ")]),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("昨日电话联系数")]),t._v("（"+t._s(t.boardData.contact_data.yesterday_contact_record_for_phone)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("今日电话联系数")]),t._v("（"+t._s(t.boardData.contact_data.today_contact_record_for_phone)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("上周电话联系数")]),t._v("（"+t._s(t.boardData.contact_data.last_week_contact_record_for_phone)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("本周电话联系数")]),t._v("（"+t._s(t.boardData.contact_data.this_week_contact_record_for_phone)+"）")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("上月电话联系数")]),t._v("（"+t._s(t.boardData.contact_data.last_month_contact_record_for_phone)+"）")])],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("本月电话联系数")]),t._v("（"+t._s(t.boardData.contact_data.this_month_contact_record_for_phone)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("昨日上门拜访数")]),t._v("（"+t._s(t.boardData.contact_data.yesterday_contact_record_for_visit)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("今日上门拜访数")]),t._v("（"+t._s(t.boardData.contact_data.today_contact_record_for_visit)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("上周上门拜访数")]),t._v("（"+t._s(t.boardData.contact_data.last_week_contact_record_for_visit)+"）")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("本周上门拜访数")]),t._v("（"+t._s(t.boardData.contact_data.this_week_contact_record_for_visit)+"）")])],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("上月上门拜访数")]),t._v("（"+t._s(t.boardData.contact_data.last_month_contact_record_for_visit)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("本月上门拜访数")]),t._v("（"+t._s(t.boardData.contact_data.this_month_contact_record_for_visit)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("昨日在线跟进数")]),t._v("（"+t._s(t.boardData.contact_data.yesterday_connect)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("今日在线跟进数")]),t._v("（"+t._s(t.boardData.contact_data.today_connect)+"）")]),t._v(" "),e("el-col",{attrs:{span:4}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("上周在线跟进数")]),t._v("（"+t._s(t.boardData.contact_data.last_week_connect)+"）")])],1),t._v(" "),e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("本周在线跟进数")]),t._v("（"+t._s(t.boardData.contact_data.this_week_connect)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("上月在线跟进数")]),t._v("（"+t._s(t.boardData.contact_data.last_month_connect)+"）")]),t._v(" "),e("el-col",{attrs:{span:5}},[e("span",{staticStyle:{"text-align":"right"}},[t._v("本月在线跟进数")]),t._v("（"+t._s(t.boardData.contact_data.this_month_connect)+"）")])],1)],1):t._e()],1)]),t._v(" "),e("el-card",{staticClass:"index-box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"index-content-title"},[t._v("最新沟通记录")])]),t._v(" "),e("div",[e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:8}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(1)}}},[t._v("申报订单沟通记录（"+t._s(t.process_notice_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:8}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(2)}}},[t._v("立项维护沟通记录（"+t._s(t.maintenance_notice_count)+"）")])],1)],1)],1)]),t._v(" "),t.is_enterprise?t._e():e("el-card",{staticClass:"index-box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"index-content-title"},[t._v("今日销售计划情况")])]),t._v(" "),e("div",[e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:24}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(8)}}},[t._v("\n            "+t._s(t.today_sale_plan.submit_employee_num)+"人提交, 共"+t._s(t.today_sale_plan.total_num)+"家, 已实施"+t._s(t.today_sale_plan.implement_num)+"家, 有意向"+t._s(t.today_sale_plan.intention_num)+"家\n          ")])],1)],1)],1)]),t._v(" "),t.is_enterprise?t._e():e("el-card",{staticClass:"index-box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"index-content-title"},[t._v("消息中心")])]),t._v(" "),e("div",[e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:6}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(9)}}},[t._v("跟进消息（"+t._s(t.msg_center.connect_msg_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:6}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(10)}}},[t._v("系统消息（"+t._s(t.msg_center.sys_msg_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:6}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.getUserKanBan()}}},[t._v(" 自定义看板")])],1)],1)],1)]),t._v(" "),e("el-card",{staticClass:"index-box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"index-content-title"},[t._v("我的"+t._s(t.is_enterprise?"任务":"")+"事项")])]),t._v(" "),t.is_enterprise?e("span",[e("div",[e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:5}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(3)}}},[t._v("待处理任务事项（"+t._s(t.task_count)+"）")])],1)],1)],1)]):t._e(),t._v(" "),t.is_enterprise?t._e():e("span",[e("div",[e("el-row",{staticClass:"index-content-row"},[e("el-col",{attrs:{span:6}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(4)}}},[t._v("待审核的订单评估（"+t._s(t.to_do.wait_review_apply_report_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:6}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(5)}}},[t._v("已审核的订单评估（"+t._s(t.to_do.review_pass_apply_report_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:6}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(6)}}},[t._v("待审核的合同（"+t._s(t.to_do.wait_review_contract_count)+"）")])],1),t._v(" "),e("el-col",{attrs:{span:6}},[e("el-link",{staticClass:"link-content",attrs:{type:"primary"},on:{click:function(a){return t.turnTo(7)}}},[t._v("已审核的合同（"+t._s(t.to_do.has_review_contract_count)+"）")])],1)],1)],1)])]),t._v(" "),e("el-card",{staticClass:"index-box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",{staticClass:"index-content-title"},[t._v("正在申报的通知")])]),t._v(" "),e("div",[e("el-collapse",{model:{value:t.activeNames,callback:function(a){t.activeNames=a},expression:"activeNames"}},t._l(t.NoticeList,function(a,n){return e("el-collapse-item",{key:n,attrs:{name:n}},[e("template",{slot:"title"},[e("span",{staticStyle:{width:"62%","line-height":"18px!important"}},[t._v(t._s(a.notice_title))]),t._v(" "),e("span",{staticStyle:{"text-align":"right",flex:"1"}},[e("span",{staticStyle:{"margin-left":"40px",width:"160px",display:"inline-block","text-align":"left"}},[t._v("发布时间："+t._s(a.policy__publish_date))]),t._v(" "),e("span",{staticStyle:{"margin-left":"40px",width:"80px",display:"inline-block","text-align":"left"}},[t._v(t._s(a.areaLevel))])])]),t._v(" "),e("p",{domProps:{innerHTML:t._s(a.apply_process)}}),t._v(" "),e("div",[e("span",[t._v("发布部门："+t._s(a.policy__publish_organ))]),t._v(" "),e("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(t._f("difficultyFilter")(a.policy__difficulty)))]),t._v(" "),e("span",{staticStyle:{"margin-left":"20px"}},[t._v(t._s(a.apply_type__type_name))])]),t._v(" "),e("div",[e("span",[t._v("最高补贴："+t._s(a.policy_project__sum_supply)+"万元")])]),t._v(" "),a.submit_online_start&&a.submit_online_end?e("div",[e("span",[t._v("线上提交时间："+t._s(a.submit_online_start)+"到"+t._s(a.submit_online_end))])]):t._e(),t._v(" "),a.submit_paper_start&&a.submit_paper_end?e("div",[e("span",[t._v("纸质提交时间："+t._s(a.submit_paper_start)+"到"+t._s(a.submit_paper_end))])]):t._e()],2)}),1)],1)]),t._v(" "),e("el-dialog",{attrs:{title:"自定义看板",visible:t.kanBanVisible},on:{"update:visible":function(a){t.kanBanVisible=a}}},[e("el-form",{staticStyle:{width:"600px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"80px"}},[e("el-row",[e("el-col",[e("tree-transfer",{attrs:{title:t.kan_ban_title,from_data:t.from_data,to_data:t.to_data,defaultProps:{label:"label"},button_text:t.button_text,width:"100%",filter:"",openAll:""},on:{addBtn:t.add,removeBtn:t.remove}})],1)],1)],1),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.kanBanVisible=!1}}},[t._v("取消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.saveBindUser}},[t._v("保存")])],1)],1)],1)},staticRenderFns:[]};var d=e("VU/8")(c,p,!1,function(t){e("uyvv")},"data-v-f9fd1136",null);a.default=d.exports},DY7s:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("Dd8w"),s=e.n(n),r=e("NYxO"),i={name:"dashboard-editor",data:function(){return{emptyGif:"https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"}},computed:s()({},Object(r.b)(["name","avatar","roles"]))},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("div",{staticClass:" clearfix"},[e("pan-thumb",{staticStyle:{float:"left"},attrs:{image:t.avatar}},[t._v(" Your roles:\n      "),t._l(t.roles,function(a){return e("span",{key:a,staticClass:"pan-info-roles"},[t._v(t._s(a))])})],2),t._v(" "),e("github-corner",{staticStyle:{position:"absolute",top:"0px",border:"0",right:"0"}}),t._v(" "),e("div",{staticClass:"info-container"},[e("span",{staticClass:"display_name"},[t._v(t._s(t.name))]),t._v(" "),e("span",{staticStyle:{"font-size":"20px","padding-top":"20px",display:"inline-block"}},[t._v("Editor's Dashboard")])])],1),t._v(" "),e("div",[e("img",{staticClass:"emptyGif",attrs:{src:t.emptyGif}})])])},staticRenderFns:[]};var o=e("VU/8")(i,l,!1,function(t){e("m9bK")},"data-v-555634db",null);a.default=o.exports},EnJr:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.emptyGif[data-v-555634db] {\n  display: block;\n  width: 45%;\n  margin: 0 auto;\n}\n.dashboard-editor-container[data-v-555634db] {\n  background-color: #e3e3e3;\n  min-height: 100vh;\n  padding: 50px 60px 0px;\n}\n.dashboard-editor-container .pan-info-roles[data-v-555634db] {\n    font-size: 12px;\n    font-weight: 700;\n    color: #333;\n    display: block;\n}\n.dashboard-editor-container .info-container[data-v-555634db] {\n    position: relative;\n    margin-left: 190px;\n    height: 150px;\n    line-height: 200px;\n}\n.dashboard-editor-container .info-container .display_name[data-v-555634db] {\n      font-size: 48px;\n      line-height: 48px;\n      color: #212121;\n      position: absolute;\n      top: 25px;\n}\n",""])},HSJ2:function(t,a,e){var n=e("MPjc");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("rjj0")("5b6eb496",n,!0)},MPjc:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.dashboard-editor-container[data-v-d4940dfc] {\n  padding: 32px;\n  background-color: #f0f2f5;\n}\n.dashboard-editor-container .chart-wrapper[data-v-d4940dfc] {\n    background: #fff;\n    padding: 16px 16px 0;\n    margin-bottom: 32px;\n}\n",""])},m9bK:function(t,a,e){var n=e("EnJr");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("rjj0")("aaac109e",n,!0)},uyvv:function(t,a,e){var n=e("xidX");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("rjj0")("62be0518",n,!0)},xidX:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.index-box-card[data-v-f9fd1136] {\n  margin: 30px;\n  width: 90%;\n}\n.content-div[data-v-f9fd1136] {\n  margin: 30px;\n  width: 90%;\n}\n.com_top_title[data-v-f9fd1136] {\n  background: #3A3A3A;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 5px 20px 5px 0;\n  margin-bottom: 20px;\n}\n.index-content-title[data-v-f9fd1136] {\n  font-size: 23px;\n  color: #a4c8cb;\n}\n.index-content-row[data-v-f9fd1136] {\n  margin: 10px;\n}\n.link-content[data-v-f9fd1136] {\n  font-size: 18px;\n}\n",""])}});