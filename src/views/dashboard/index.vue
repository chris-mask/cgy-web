<template>
  <div class="dashboard-container">
    <!--<component :is="currentRole"></component>-->

    <el-card class="index-box-card">
      <div slot="header" class="clearfix">
        <span class="index-content-title">简报看板</span>
      </div>
      <div>
        <el-row class="index-content-row">
           <el-col :span="5"><router-link target="_blank" :to="{path:'/policy/policy-mng/list',query:{'is_invisible_policy': '2', 'available':'1'}}"><span style="text-align: right">可申报的政策</span>（{{boardData.to_do_policy_count}}）</router-link></el-col>
           <el-col :span="5"><router-link target="_blank" :to="{path:'/policy/notice-mng/list',query:{'state': '1'}}"><span style="text-align: right">可申报的通知</span>（{{boardData.to_do_notice_count}}）</router-link></el-col>
           <el-col :span="5"><router-link target="_blank" :to="{path:'/project/report-mng/list',query:{'state': 1}}"><span style="text-align: right">可申报的评估</span>（{{boardData.apply_count}}）</router-link></el-col>
           <el-col :span="5"><span style="text-align: right">当前高新技术产品数</span>（{{boardData.product_count}}）</el-col>
           <el-col :span="4"><span style="text-align: right">当前职工总数</span>（{{boardData.staff_count}}）</el-col>
        </el-row>

        <el-row class="index-content-row">
          <el-col :span="5"><span style="text-align: right">当前科技人员数</span>（{{boardData.techenology_staff_count}}）</el-col>
           <el-col :span="5"><span style="text-align: right">当前使用设备数</span>（{{boardData.equipment_count}}）</el-col>
           <el-col :span="5"><span style="text-align: right">当前使用软件数</span>（{{boardData.software_count}}）</el-col>
          <el-col :span="5"><span style="text-align: right">当前项目备案数</span>（{{boardData.project_record_count}}）</el-col>
          <el-col :span="4"><span style="text-align: right">当前研发项目数</span>（{{boardData.dev_project_count}}）</el-col>
        </el-row>

        <el-row class="index-content-row">
          <el-col :span="5"><router-link target="_blank" :to="{path:'/ipr/patent_info/list',query:{}}"><span style="text-align: right">当前授权专利数</span>（{{boardData.patent_count}}）</router-link></el-col>
          <el-col :span="5"><router-link target="_blank" :to="{path:'/ipr/copyright_info/list',query:{}}"><span style="text-align: right">当前著作权数</span>（{{boardData.copy_right_count}}）</router-link></el-col>
          <el-col :span="5"><router-link target="_blank" :to="{path:'/ipr/trademark_mng/list',query:{}}"><span style="text-align: right">当前商标数</span>（{{boardData.trademark_count}}）</router-link></el-col>
          <el-col :span="5"><router-link target="_blank" :to="{path:'/ipr/certificate_mng/list',query:{}}"><span style="text-align: right">当前企业证书数</span>（{{boardData.cert_count}}）</router-link></el-col>
          <el-col :span="4"><router-link target="_blank" :to="{path:'/maintenance/maintenance-mng/list',query:{}}"><span style="text-align: right">当前已立项数</span>（{{boardData.maintenance_count}}）</router-link></el-col>
        </el-row>
        <el-row  class="index-content-row">
          <el-col :span="5"><router-link target="_blank" :to="{path:'/ipr/patent_info/list',query:{'case_state': '1'}}"><span style="text-align: right">当前需缴费专利数</span>（{{boardData.pay_patent_count}}）</router-link></el-col>
          <el-col :span="5"><router-link target="_blank" :to="{path:'/ipr/trademark_mng/list',query:{'valid_days_type': '5'}}"><span style="text-align: right">当前需续展商标数</span>（{{boardData.develop_trademark_count}}）</router-link></el-col>
        </el-row>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <!--只有内部员工可见-->
        <div v-if="boardData.is_employee">
          <el-row class="index-content-row">
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/free_sea/list',query:{}}"><span style="text-align: right">企业总数</span>（{{boardData.ent_data.total_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/free_sea/list',query:{'ent_tech_type':'is_high_tech_ent'}}"><span style="text-align: right">高企总数</span>（{{boardData.ent_data.high_tech_total_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/free_sea/list',query:{'ent_tech_type':'not_high_tech_ent'}}"><span style="text-align: right">非高企总数</span>（{{boardData.ent_data.not_high_tech_total_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'enterprise_scale':1}}"><span style="text-align: right">小型企业数</span>（{{boardData.ent_data.enterprise_scale_mini}}）</router-link></el-col>
            <el-col :span="4"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'enterprise_scale':2}}"><span style="text-align: right">中型企业数</span>（{{boardData.ent_data.enterprise_scale_middle}}）</router-link></el-col>
          </el-row>
          <el-row class="index-content-row">
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'enterprise_scale':3}}"><span style="text-align: right">大型企业数</span>（{{boardData.ent_data.enterprise_scale_large}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':1}}"><span style="text-align: right">上市企业数</span>（{{boardData.ent_data.is_listed_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':2}}"><span style="text-align: right">即将上市企业数</span>（{{boardData.ent_data.to_be_listed_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':3}}"><span style="text-align: right">成立3年内企业数</span>（{{boardData.ent_data.establishment_in_three_years}}）</router-link></el-col>
            <el-col :span="4"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':4}}"><span style="text-align: right">营收1亿以上企业数</span>（{{boardData.ent_data.annual_sales_above_hundred_million}}）</router-link></el-col>
          </el-row>
          <el-row class="index-content-row">
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':5}}"><span style="text-align: right">近七日业务员更替的企业</span>（{{boardData.ent_data.last_change_business_enterprise}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':6}}"><span style="text-align: right">近半个月业务员更替的企业</span>（{{boardData.ent_data.last_change_business_enterprise_half_month}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/project/process-mng/list',query:{'other_filter':3}}"><span style="text-align: right">近半个月申报订单签订数</span>（{{boardData.ent_data.half_month_process_info_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/project/process-mng/list',query:{'other_filter':2}}"><span style="text-align: right">近七日申报订单签订数</span>（{{boardData.ent_data.seven_days_process_info_num}}）</router-link></el-col>
            <el-col :span="4"><router-link target="_blank" :to="{path:'/project/process-mng/list',query:{'other_filter':1}}"><span style="text-align: right">当日申报订单签订数</span>（{{boardData.ent_data.today_process_info_num}}）</router-link></el-col>
          </el-row>
          <el-row class="index-content-row">
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':7}}"><span style="text-align: right">专利数5个以上的企业数</span>（{{boardData.ent_data.patent_above_five_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':8}}"><span style="text-align: right">软著5个以上的企业数</span>（{{boardData.ent_data.copyright_above_five_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':9}}"><span style="text-align: right">人员规模1000以上的企业数</span>（{{boardData.ent_data.employee_scale_above_1000_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':10}}"><span style="text-align: right">年销售额500-2000w的企业数</span>（{{boardData.ent_data.enterprise_annual_sales_num}}）</router-link></el-col>
            <el-col :span="4"><router-link target="_blank" :to="{path:'/enterprise/enterprise_list/list',query:{'other_filter':11}}"><span style="text-align: right">年销售额2000w以上的企业数</span>（{{boardData.ent_data.enterprise_annual_sales_above_20mw_num}}）</router-link></el-col>
          </el-row>
          <el-row class="index-content-row">
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/free_sea/list',query:{'project_center_type':1}}"><span style="text-align: right">工程中心企业数</span>（{{boardData.ent_data.project_center_ent_num}}）</router-link></el-col>
            <el-col :span="5"><router-link target="_blank" :to="{path:'/enterprise/free_sea/list',query:{'tech_center_type':1}}"><span style="text-align: right">技术中心企业数</span>（{{boardData.ent_data.tech_center_ent_num}}）</router-link></el-col>
          </el-row>
        </div>
        <span v-if="boardData.is_employee">
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <el-row class="index-content-row">
            <el-col :span="5"><span style="text-align: right">昨日电话联系数</span>（{{boardData.contact_data.yesterday_contact_record_for_phone}}）</el-col>
            <el-col :span="5"><span style="text-align: right">今日电话联系数</span>（{{boardData.contact_data.today_contact_record_for_phone}}）</el-col>
            <el-col :span="5"><span style="text-align: right">上周电话联系数</span>（{{boardData.contact_data.last_week_contact_record_for_phone}}）</el-col>
            <el-col :span="5"><span style="text-align: right">本周电话联系数</span>（{{boardData.contact_data.this_week_contact_record_for_phone}}）</el-col>
            <el-col :span="4"><span style="text-align: right">上月电话联系数</span>（{{boardData.contact_data.last_month_contact_record_for_phone}}）</el-col>
          </el-row>
          <el-row class="index-content-row">
            <el-col :span="5"><span style="text-align: right">本月电话联系数</span>（{{boardData.contact_data.this_month_contact_record_for_phone}}）</el-col>
            <el-col :span="5"><span style="text-align: right">昨日上门拜访数</span>（{{boardData.contact_data.yesterday_contact_record_for_visit}}）</el-col>
            <el-col :span="5"><span style="text-align: right">今日上门拜访数</span>（{{boardData.contact_data.today_contact_record_for_visit}}）</el-col>
            <el-col :span="5"><span style="text-align: right">上周上门拜访数</span>（{{boardData.contact_data.last_week_contact_record_for_visit}}）</el-col>
            <el-col :span="4"><span style="text-align: right">本周上门拜访数</span>（{{boardData.contact_data.this_week_contact_record_for_visit}}）</el-col>
          </el-row>
          <el-row class="index-content-row">
            <el-col :span="5"><span style="text-align: right">上月上门拜访数</span>（{{boardData.contact_data.last_month_contact_record_for_visit}}）</el-col>
            <el-col :span="5"><span style="text-align: right">本月上门拜访数</span>（{{boardData.contact_data.this_month_contact_record_for_visit}}）</el-col>
            <el-col :span="5"><span style="text-align: right">昨日在线跟进数</span>（{{boardData.contact_data.yesterday_connect}}）</el-col>
            <el-col :span="5"><span style="text-align: right">今日在线跟进数</span>（{{boardData.contact_data.today_connect}}）</el-col>
            <el-col :span="4"><span style="text-align: right">上周在线跟进数</span>（{{boardData.contact_data.last_week_connect}}）</el-col>
          </el-row>
          <el-row class="index-content-row">
            <el-col :span="5"><span style="text-align: right">本周在线跟进数</span>（{{boardData.contact_data.this_week_connect}}）</el-col>
            <el-col :span="5"><span style="text-align: right">上月在线跟进数</span>（{{boardData.contact_data.last_month_connect}}）</el-col>
            <el-col :span="5"><span style="text-align: right">本月在线跟进数</span>（{{boardData.contact_data.this_month_connect}}）</el-col>
          </el-row>
        </span>
      </div>
    </el-card>

    <el-card class="index-box-card">
      <div slot="header" class="clearfix">
        <span class="index-content-title">最新沟通记录</span>
      </div>
      <div>
        <el-row class="index-content-row">
          <el-col :span="8">
            <el-link class="link-content" type="primary" @click="turnTo(1)">申报订单沟通记录（{{process_notice_count}}）</el-link>
          </el-col>
          <el-col :span="8">
            <el-link class="link-content" type="primary" @click="turnTo(2)">立项维护沟通记录（{{maintenance_notice_count}}）</el-link>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="index-box-card" v-if="!is_enterprise">
      <div slot="header" class="clearfix">
        <span class="index-content-title">今日销售计划情况</span>
      </div>
      <div>
        <el-row class="index-content-row">
          <el-col :span="24">
            <el-link class="link-content" type="primary" @click="turnTo(8)">
              {{today_sale_plan.submit_employee_num}}人提交, 共{{today_sale_plan.total_num}}家, 已实施{{today_sale_plan.implement_num}}家, 有意向{{today_sale_plan.intention_num}}家
            </el-link>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="index-box-card" v-if="!is_enterprise">
      <div slot="header" class="clearfix">
        <span class="index-content-title">消息中心</span>
      </div>
      <div>
        <el-row class="index-content-row">
          <el-col :span="6">
            <el-link class="link-content" type="primary" @click="turnTo(9)">跟进消息（{{msg_center.connect_msg_count}}）</el-link>
          </el-col>
          <el-col :span="6">
            <el-link class="link-content" type="primary" @click="turnTo(10)">系统消息（{{msg_center.sys_msg_count}}）</el-link>
          </el-col>

          <el-col :span="6">
            <el-link class="link-content" type="primary" @click="getUserKanBan()"> 自定义看板</el-link>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-card class="index-box-card">
      <div slot="header" class="clearfix">
        <span class="index-content-title">我的{{is_enterprise ? '任务' : ''}}事项</span>
      </div>
      <!--企业端-->
      <span  v-if="is_enterprise">
        <div>
          <el-row class="index-content-row">
            <el-col :span="5">
              <el-link class="link-content" type="primary" @click="turnTo(3)">待处理任务事项（{{task_count}}）</el-link>
            </el-col>
          </el-row>
        </div>
      </span>
      <!--内部员工端-->
      <span v-if="!is_enterprise">
        <div>
          <el-row class="index-content-row">
            <el-col :span="6">
              <el-link class="link-content" type="primary" @click="turnTo(4)">待审核的订单评估（{{to_do.wait_review_apply_report_count}}）</el-link>
            </el-col>
            <el-col :span="6">
              <el-link class="link-content" type="primary" @click="turnTo(5)">已审核的订单评估（{{to_do.review_pass_apply_report_count}}）</el-link>
            </el-col>
            <el-col :span="6">
              <el-link class="link-content" type="primary" @click="turnTo(6)">待审核的合同（{{to_do.wait_review_contract_count}}）</el-link>
            </el-col>
            <el-col :span="6">
              <el-link class="link-content" type="primary" @click="turnTo(7)">已审核的合同（{{to_do.has_review_contract_count}}）</el-link>
            </el-col>
          </el-row>
        </div>
      </span>
    </el-card>

    <el-card class="index-box-card">
      <div slot="header" class="clearfix">
        <span class="index-content-title">正在申报的通知</span>
      </div>
      <div>
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="(item, index) in NoticeList"  :key="index"  :name="index">

            <template slot="title">
              <span style="width:62%;line-height:18px!important">{{item.notice_title}}</span>
              <span style="text-align:right;flex:1">
                <span style="margin-left: 40px;width:160px;display:inline-block;text-align:left">发布时间：{{item.policy__publish_date}}</span>
                <span style="margin-left: 40px;width:80px;display:inline-block;text-align:left">{{item.areaLevel}}</span>
              </span>
            </template>
            <p v-html="item.apply_process"></p>
            <div>
              <span>发布部门：{{item.policy__publish_organ}}</span>
              <span style="margin-left: 20px">{{item.policy__difficulty|difficultyFilter}}</span>
              <span style="margin-left: 20px">{{item.apply_type__type_name}}</span>
            </div>
            <div>
              <span>最高补贴：{{item.policy_project__sum_supply}}万元</span>
            </div>
            <div v-if="item.submit_online_start && item.submit_online_end">
              <span>线上提交时间：{{item.submit_online_start}}到{{item.submit_online_end}}</span>
            </div>
            <div v-if="item.submit_paper_start && item.submit_paper_end">
              <span>纸质提交时间：{{item.submit_paper_start}}到{{item.submit_paper_end}}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>

    <el-dialog title="自定义看板" :visible.sync="kanBanVisible">
      <el-form label-position="left" label-width="80px" style='width: 600px; margin-left:50px;'>
        <el-row>
          <el-col>
            <tree-transfer :title="kan_ban_title" :from_data='from_data' :to_data='to_data' :defaultProps="{label:'label'}"
                           @addBtn='add' @removeBtn='remove' :button_text="button_text" width="100%" filter openAll> </tree-transfer>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="kanBanVisible = false">取消</el-button>
        <el-button type="primary" @click="saveBindUser">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
// import { setTimerGetNews, gethasNews } from '@/utils/getNews'
// import { getNews, getBoardData } from '@/api/project'
// import { getNotice } from '@/api/notice'
// import { userKanBanMng, userKanBanSave } from '@/api/user_define'
import treeTransfer from 'el-tree-transfer'


export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard, treeTransfer },
  data() {
    return {
      currentRole: 'adminDashboard',
      activeNames: ['1'],
      listQuery: {
        page: 1,
        limit: 999,
        state: '1'
      },
      boardData: {},
      to_do: {},
      today_sale_plan: {},
      msg_center: {},
      process_notice_count: 0,
      maintenance_notice_count: 0,
      task_count: 0,
      is_enterprise: false,
      NoticeList: [],
      kanBanVisible: false,
      kan_ban_title: ['可选看板', '我的看板'],
      button_text: ['添加', '移除'],
      from_data: [],
      to_data: []
    }
  },
  filters: {
    difficultyFilter(state) {
      return {
        1: '普惠性',
        2: '竞争性'
      }[state]
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  mounted() {
    // setTimerGetNews(this)
    this.getNewsCount()
    this.getList()
    this.getBoard()
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    getList() {
      this.listQuery.precision = true
      // getNotice(this.listQuery).then(res => {
      //   if (res.data.code === 1) {
      //     this.NoticeList = res.data.data
      //     this.total = res.data.recordsTotal
      //     for (var item in this.NoticeList) {
      //       this.getArea(this.NoticeList[item])
      //     }
      //   }
      // })
    },
    getNewsCount() {
      // getNews().then(res => {
      //   if (res.data.code === 1) {
      //     this.process_notice_count = res.data.process_notice_count
      //     this.maintenance_notice_count = res.data.maintenance_notice_count
      //     this.task_count = res.data.task_count
      //     this.to_do = res.data.to_do
      //     this.today_sale_plan = res.data.today_sale_plan
      //     this.msg_center = res.data.msg_center
      //     this.is_enterprise = res.data.is_enterprise
      //   }
      // })
    },
    getBoard() {
      // getBoardData().then(res => {
      //   if (res.data.code === 1) {
      //     this.boardData = res.data.data
      //   }
      // })
    },
    turnTo(idx) {
      if (idx === 1) { // 申报订单沟通记录
        this.$router.push('/project/process-mng/list')
      } else if (idx === 2) { // 立项维护沟通记录
        this.$router.push('/maintenance/maintenance-update-mng/list')
      } else if (idx === 3) { // 我的事项
        this.$router.push('/development/my_matter/list')
      } else if (idx === 4) { // 待审核的订单评估
        this.$router.push('/project/report-mng/list?apply_report=3&report_review_state=1')
      } else if (idx === 5) { // 已审核的订单评估
        this.$router.push('/project/report-mng/list?apply_report=3&report_review_state=2')
      } else if (idx === 6) { // 待审核的合同
        this.$router.push('/contract/contract-mng/list?review_state=2')
      } else if (idx === 7) { // 待审核的合同
        this.$router.push('/contract/contract-mng/list?review_state=1')
      } else if (idx === 8) { // 今日销售计划情况
        this.$router.push('/enterprise/sale_plan/list?time_type=2')
      } else if (idx === 9) { // 跟进消息
        this.$router.push('/message-center/list?active_name=first')
      } else if (idx === 10) { // 系统消息
        this.$router.push('/message-center/list?active_name=second&read_or_not=1')
      }
    },
    getArea(data) {
      if (data.policy__apply_area_province_id) {
        data.areaLevel = '省级'
      }
      if (data.policy__apply_area_city_id) {
        data.areaLevel = '市级'
      }
      if (data.policy__apply_area_district_id) {
        data.areaLevel = '地区'
      }
      if (data.policy__apply_area_town_id) {
        data.areaLevel = '镇级'
      }
    },
    // 获取用户自定义看板
    getUserKanBan() {
      this.kanBanVisible = true
      // userKanBanMng({}).then(res => {
      //   if (res.data.code === 1) {
      //     this.from_data = res.data.can_choice_kan_ban
      //     this.to_data = res.data.user_kan_ban_list
      //   }
      // })
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      this.to_data = toData
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      this.to_data = toData
    },
    // 保存自定义看板
    saveBindUser() {
      this.kanBanVisible = false
      // userKanBanSave({ to_data: this.to_data }).then((res) => {
      //   if (res.data.code === 1) {
      //     this.dialogFormVisible = false
      //     this.$notify({
      //       title: '成功',
      //       message: '更新成功',
      //       type: 'success',
      //       duration: 2000
      //     })
      //     this.getList()
      //   } else {
      //     this.$notify({
      //       title: '失败',
      //       message: res.message,
      //       type: 'error',
      //       duration: 2000
      //     })
      //   }
      // })
    }
  }
}
</script>

<style lang="less" scoped>
  .index-box-card {
    margin: 30px;
    width: 90%;

  }
  .content-div {
    margin: 30px;
    width: 90%;
  }
  .com_top_title {
    background: #3A3A3A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px 5px 0;
    margin-bottom: 20px;
  }
  .index-content-title {
    font-size: 23px;
    color: #a4c8cb;
  }
  .index-content-row {
    margin: 10px;
  }
  .link-content {
    font-size: 18px;
  }
</style>
