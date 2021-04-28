<template>
  <div class="inside-box">
    <el-row :gutter="15">
      <el-col :span="15" :offset="1">

        <!--搜索栏-->
        <div class="cart search-bar" ref="search">
          <div>
            <ul class="search-nav-bar">
              <li :class="activeSearchNavBar === index ?'cur':''"
                  v-for="(item,index) in searchNavBarList"
                  @click="searchNavBarHandle(index)"
              >
                <span class="text">{{item}}</span>
                <img v-if="activeSearchNavBar === index" src="../../../../static/search_navbar_cur.png"/>
              </li>
            </ul>

            <div class="search-form">
              <el-input class="search-input"
                        v-model="searchValue"
                        :placeholder="search_placeholder_list[activeSearchNavBar]"
                        @keyup.enter.native="searchLinkHandle"
              />
              <button class="search-btn" @click="searchLinkHandle">搜一下</button>
            </div>

            <div class="search-hot" v-if="this.activeSearchNavBar == '0'">
              <div class="hot-text">热搜榜：</div>
              <ul class="hot-list">
                <li>高企</li>
                <li>工程中心</li>
                <li>技术中心</li>
                <li>高品</li>
              </ul>
            </div>
          </div>
        </div>

        <!--销售跟进-->
        <div class="cart cart-box" ref="sale" v-if="allowGetList.twoAllow">
          <div class="cart-title">
            <div class="line blue"></div>
            销售跟进
          </div>
          <div class="cart-salesFollow-body">

            <div class="item plan" @click="goSalesPlan(1)">
              <div class="left">
                <div class="num">{{salePlanData.myPlan && salePlanData.myPlan !=="" ? salePlanData.myPlan: 0}}</div>
                <div class="text">我的计划</div>
              </div>
              <img
                src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/6ITEoa9q_20200326091949_226_20200801000113_257.png"/>
            </div>

            <div class="item electric" @click="goSalesPlan(2)">
              <div class="left">
                <div class="num">{{salePlanData.telemarketingToday && salePlanData.telemarketingToday !== ""?
                  salePlanData.telemarketingToday : 0}}
                </div>
                <div class="text">今日电销</div>
              </div>
              <img
                src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/tUXorOea_20200325151015_759_20200801000202_442.png"/>
            </div>

            <div class="item visit" @click="goSalesPlan(3)">
              <div class="left">
                <div class="num">{{salePlanData.visitToday && salePlanData.visitToday !== "" ? salePlanData.visitToday :
                  0}}
                </div>
                <div class="text">今日拜访</div>
              </div>
              <img
                src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/4qu0Pp4d_20200324105637_104_20200801000239_533.png"/>
            </div>

            <div class="item intention" @click="goSalesPlan(4)">
              <div class="left">
                <div class="num">{{salePlanData.intentionsToday && salePlanData.intentionsToday !=="" ?
                  salePlanData.intentionsToday : 0}}
                </div>
                <div class="text">我的意向</div>
              </div>
              <img
                src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/E06CCspF_20200325152028_687_20200801000322_811.png"/>
            </div>

            <div class="item sign" @click="goSalesPlan(5)">
              <div class="left">
                <div class="num">{{salePlanData.signToday && salePlanData.signToday !== "" ? salePlanData.signToday:0}}
                </div>
                <div class="text">今日签单</div>
              </div>
              <img
                src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/佛山市顺德区环威电器有限公司/消息中心/KRYomTt1_20200325143501_376_20200801000420_373.png"/>
            </div>

          </div>
        </div>

        <!--综合看板-->
        <div ref="comprehensive" class="cart cart-box" style="padding-bottom: 0;">
          <div class="cart-title">
            <div class="line purple"></div>
            综合看板
          </div>

          <el-row class="cart-kanban-body">
            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban" @click.native="goCustomer"
                    v-if="allowCustomerCenter.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/G9FcMXwp_20200325152339_677_20200731234709_828.png"/>
              </div>
              <div class="num">{{boardData.myClientCount}}</div>
              <div class="text">我的客户</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban" @click.native="goContract"
                    v-if="allowContract.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/bfWC8JNz_20200325161423_631_20200731234804_277.png"/>
              </div>
              <div class="num">{{boardData.myContractCount}}</div>
              <div class="text">我的合同</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban" @click.native="goOrder"
                    v-if="allowOrder.twoAllow">
              <div class="icon">
                <div class="red-tip" v-if="boardData.newOrderFlagCount && boardData.newOrderFlagCount!==0"></div>
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/ZMQYoALf_20200325170310_960_20200731234842_718.png"/>
              </div>
              <div class="num">{{boardData.myOrderCount}}</div>
              <div class="text">全部订单</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban" @click.native="goOrderParams(8)"
                    v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/Fp4moyfX_20200509151928_214_20200731235343_779.png"/>
              </div>
              <div class="num">{{boardData.myAgendaCount}}</div>
              <div class="text">我的待办</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(0)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/bpmwk9xE_20200328115656_216_20200731234915_602.png"/>
              </div>
              <div class="num">{{boardData.immediatelyStopCount}}</div>
              <div class="text">马上截止</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(1)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/Oo7V15Ys_20200329200917_185_20200731235006_853.png"/>
              </div>
              <div class="num">{{boardData.notAllocationCount}}</div>
              <div class="text">未分配</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(2)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/IjopMtPq_20200325152454_580_20200731235037_787.png"/>
              </div>
              <div class="num">{{boardData.toEvaluateCount}}</div>
              <div class="text">待评估</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(3)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/J4rqKrDZ_20200330115605_753_20200731235108_355.png"/>
              </div>
              <div class="num">{{boardData.toAuditCount}}</div>
              <div class="text">待复审</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(4)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/8bgnUNtJ_20200330115704_756_20200731235139_124.png"/>
              </div>
              <div class="num">{{boardData.toBeCompletedCount}}</div>
              <div class="text">待完成</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(5)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/QeyNN4qu_20200330115852_446_20200731235210_961.png"/>
              </div>
              <div class="num">{{boardData.toSubmitCount}}</div>
              <div class="text">待提交</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(6)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/消息中心/内部/5b3KYl5D_20200330115941_845_20200731235241_614.png"/>
              </div>
              <div class="num">{{boardData.toProjectApprovalCount}}</div>
              <div class="text">已立项</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(7)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/FUcAuClE_20200325152507_304_20200731235312_470.png"/>
              </div>
              <div class="num">{{boardData.returnedMoneyCount}}</div>
              <div class="text">待回款</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goContractParams(0)" v-if="allowOrder.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/FUcAuClE_20200325152507_304_20200731235312_470.png"/>
              </div>
              <div class="num">{{boardData.payBackCount}}</div>
              <div class="text">已回款合同</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban"
                    @click.native="goOrderParams(9)">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/Oo7V15Ys_20200329200917_185_20200731235006_853.png"/>
              </div>
              <div class="num">{{boardData.paymentReviewCount}}</div>
              <div class="text">回款待审核</div>
            </el-col>

            <el-col :offset="1" :xs="12" :sm="8" :md="6" :lg="4" :xl="4" class="item-kanban" @click.native="goProject"
                    v-if="allowProject.twoAllow">
              <div class="icon">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/Fp4moyfX_20200509151928_214_20200731235343_779.png"/>
              </div>
              <div class="num">{{boardData.projectLibraryCount}}</div>
              <div class="text">项目库</div>
            </el-col>

          </el-row>
        </div>

        <div ref="comprehensive" class="cart cart-box" style="padding-bottom: 0;">
          <div class="cart-title">
            <div class="line purple"></div>
            回款情况看板
          </div>

<!--          <div class="form-item" v-if="allowGetDeptList.twoAllow">-->
          <div class="form-item">
            <span class="label-text">部门：</span>
            <div class="form-handle">
              <el-select class="select-input"
                         v-model="queryPayBack.deptIds"
                         size="small"
                         @change="selectCompanyHandle"
                         @click.native="getCompanyDeptTrees"
                         filterable
                         clearable multiple
                         placeholder="选择部门">
                <el-option style="padding-left: 20px;" v-for="item in companyList"
                           :key="item.deptId"
                           :label="item.deptName"
                           :value="item.deptId"
                />
              </el-select>
              <el-select @change="selectUserHandle"
                         size="small"
                         class="select-input" v-model="queryPayBack.userIds" filterable clearable multiple
                         placeholder="选择员工">
                <el-option v-for="item in userList"
                           :key="item.userId"
                           :label="item.userName"
                           :value="item.userId"
                />
              </el-select>
            </div>
          </div>

          <div style="height: 280px;">
            <div id="payBackColumnarBoard" style="height: 270px; width: 65%; display: inline-flex;"></div>
            <div id="payBackCakeBoard"  style="height: 270px; width: 30%; display: inline-flex;"></div>
          </div>
        </div>

        <!--自定义模板-->
        <!--        <div class="cart">-->
        <!--          <div class="custom-plate">-->
        <!--            <span @click="customVisible = true">-->
        <!--              <img class="img" src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/YRZHLwgB_20200325084721_177.png">-->
        <!--              自定义看板-->
        <!--            </span>-->
        <!--          </div>-->

        <!--        </div>-->

      </el-col>

      <el-col :span="7">
        <!--我的事项-->
        <div class="cart cart-box" ref="userMatter" v-if="allowChar.oneAllow">
          <div class="cart-title">
            <div class="line blue"></div>
            我的事项
          </div>

          <div class="cart-myMatter-body">
            <div class="item-myMatter">
              <div class="left">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/STeG0Htc_20200325152527_352_20200731235448_613.png"/>
                <span class="text" @click="goMessage('two')">系统提醒</span>
              </div>
              <div class="right">
<!--                <span class="nun-background">{{businessData.remindNum}}</span>-->
                <el-badge :value="businessData.remindNum" class="item"></el-badge>
              </div>
            </div>
          </div>

          <div class="cart-myMatter-body">
            <div class="item-myMatter">
              <div class="left">
                <img
                  src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/e0oCDvSo_20200324152147_345_20200731235518_154.png"/>
                <span class="text" @click="goMessage('one')">沟通消息</span>
              </div>
              <div class="right">
<!--                <span class="nun-background">{{businessData.chatNum}}</span>-->
                <el-badge :value="businessData.chatNum" class="item"></el-badge>
              </div>
            </div>
          </div>

        </div>

        <!--政策通知-->
        <div class="cart cart-box" style="padding-bottom: 0" v-if="allowPolicy.twoAllow">
          <div class="cart-title sb">
            <div class="left-title">
              <div class="line red"></div>
              政策通知
            </div>
            <div class="more" @click="goPolicy">更多 ></div>
          </div>

          <vue-seamless-scroll
            :data="policylist"
            :class-option="optionSetting"
            :style="NoticeListView"
            class="scroll-list"
          >
            <ul class="cart-policyNotice-body">
              <li v-for="item in policylist">
                <div class="top-text">
                  <span v-if="item.areaLevel===0" class="level orange">其他</span>
                  <span v-if="item.areaLevel===1" class="level green">省级</span>
                  <span v-if="item.areaLevel===2" class="level red">市级</span>
                  <span v-if="item.areaLevel===3" class="level blue">区级</span>
                  <span class="text" @click="goPolicyDetail(item)">{{item.noticeName}}</span>
                </div>
                <div class="date-time">
                  <div class="date">{{item.publishDate}}</div>
                  <div class="date-state" v-if="item.day>0">
                    距申报截止<span class="date-num">{{item.day}}</span>天(进行中)
                  </div>
                  <div class="date-state" v-else>已截止</div>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>

        <!--立项公示-->
        <div class="cart cart-box" style="padding-bottom: 0" v-if="allowApproval.twoAllow">
          <div class="cart-title sb">
            <div class="left-title">
              <div class="line orange"></div>
              政府立项公示文件
            </div>
            <div class="more" @click="goPublicityResult">更多 ></div>
          </div>

          <vue-seamless-scroll
            :data="projectList"
            :class-option="optionSetting"
            :style="MaintenanceListView"
            class="scroll-list"
          >
            <ul class="cart-policyNotice-body">
              <li v-for="item in projectList">
                <div class="top-text">
                  <span class="level">
                    {{item.publicityState==0  ? '公示中':'已结束'}}
                  </span>
                  <span class="text" @click="goProjectDetail(item)">
                    {{item.projectName}}
                  </span>
                </div>
                <div class="date-time">
                  <div></div>
                  <div class="date">{{item.publicityDate}}到{{item.endDate}}</div>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="自定义看板"
      :visible.sync="customVisible"
      class="custom-modal"
      v-dialogDrag
    >

      <tree-transfer
        :title="kan_ban_title"
        :from_data='from_data'
        :to_data='to_data'
        :defaultProps="{label:'label'}"
        @addBtn='add' @removeBtn='remove' :button_text="button_text" width="100%" filter
        openAll
      />

      <div slot="footer" class="dialog-footer">
        <el-button @click="customVisible = false">取 消</el-button>
        <el-button type="primary" @click="customVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {
    querySalePlanIndexCount,
    queryPayBackBoardData,
    queryMsgChatIndexCount,
    backgroundBoardData,
    queryAlreadyApprovalOrderIdList,
    queryImmediatelyStopOrderIdList,
    queryStayAssessOrderIdList,
    queryToAuditOrderIdList,
    queryToBeCompletedOrderIdList,
    queryToSubmitOrderIdList,
    querynotAllocationOrderIdList,
    queryMyAgendaOrderIdList,
    queryRecheckcontractIdList,
    queryPayBackContractIdList
  } from '@/api/home'

  import {
    getCompanyDeptTree,
  } from '@/api/sale_plan'

  import {queryUserComboInfo} from '@/api/customerCenter'
  import {findApprovalPublicity} from '@/api/publicityResult'
  import treeTransfer from 'el-tree-transfer'
  import echarts from 'echarts'
  import store from '@/store'


  export default {
    components: {treeTransfer},
    data() {
      return {
        socket: null,
        user: store.getters.companyId.toString() + "::" + store.getters.userId.toString() + "::" + store.getters.name.toString(),
        //销售跟进--数据
        salePlanData: {},
        //我的事项--数据
        businessData: {},
        //搜索栏---当前tab选中的值
        activeSearchNavBar: 0,
        //搜索栏---tab数据
        searchNavBarList: ['搜客户', '搜合同', '搜订单', '搜政策通知', '搜立项'],
        //搜索栏---input的placeholder
        search_placeholder_list: ['请输入企业名称/信用代码', '请输入企业名称/合同编号/项目名称', '请输入企业名称/项目名称', '请输入政策通知名称/项目名称', '请输入企业名称/项目名称'],
        NoticeListView: '', // 政策通知可视窗口高度
        MaintenanceListView: '', // 立项公示可视窗口高度
        //自定义模板
        customVisible: false,
        kan_ban_title: ['可选看板', '我的看板'],
        button_text: ['添加', '移除'],
        to_data: [],
        from_data: [],

        //搜索的文字
        searchValue: "",

        //政策通知列表 0:其他 1:省级 2:市级 3:区级
        policylist: [],

        //立项公式列表
        projectList: [],

        //综合看板数据
        boardData: {
          // immediatelyStopCount:0,     //马上截止
          // myClientCount:0,            //客户数量
          // myContractCount:0,          //合同数量
          // myOrderCount:0,             //订单数量
          // notAllocationCount:0,       //未分配
          // projectLibraryCount:0,      //项目库
          // returnedMoneyCount:0,       //待回款
          // toAuditCount:0,             //待复审
          // toBeCompletedCount:0,       //待完成
          // toEvaluateCount:0,          //待评估
          // toProjectApprovalCount:0,   //已立项
          // toSubmitCount:0,            //待提交
        },

        //部门数据
        companyList: [],
        userList: [],
        queryPayBack: {
          deptIds: [],
          userIds: [],
        },

        //回款看板数据
        payBackData: {
          monitorBos: [],
          cakeGraph: [],
          barGraph: {
            x: [],
            y: []
          },
        },

        allowCustomerCenter: "",//我的客户
        allowContract: "",//我的合同
        allowOrder: "",//我的订单
        allowProject: "",//项目库
        allowChar: "",//我的事项
        allowPolicy: "",//政策通知
        allowApproval: "",//政府立项公示文件
        allowGetList: '',

        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:DEPT:MANAGE', 'SYSTEM:DEPT:LIST'),//部门列表

      }
    },

    beforeMount() {
      setTimeout(() => {
        this.allowGetList = this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:LIST');
        this.allowCustomerCenter = this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:ROLE:USER:LIST');
        this.allowContract = this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:LIST');
        this.allowOrder = this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:LIST');
        this.allowProject = this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:LIST');
        this.allowChar = this.authorityControl('SYSTEM:MESSAGE:MANAGE', 'SYSTEM:MESSAGE:CHAT:LIST');
        this.allowPolicy = this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:LIST');
        this.allowApproval = this.authorityControl('SYSTEM:COLLABORATION:SYNERGY', 'SYSTEM:SYNERGY:MANAGE', 'SYSTEM:SYNERGY:MANAGE:LIST');
      }, 1500)
    },

    mounted() {
      // this.getPubilcList();
      // this.getBackgroundBoardData();
    },

    created(){

    },

    activated() {
      this.getPubilcList();
      this.getBusinessData();
      this.getSalesFollowData();
      this.getPayBackBoardData();

      this.getBackgroundBoardData();
      // this.openSocket()

      this.renderingPaybackData()

    },

    computed: {
      optionSetting() {
        return {
          step: 0.5, // 数值越大速度滚动越快
          limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1 // 0向下 1向上 2向左 3向右
        }
      }
    },

    methods: {
      // websocket 统计在线人数
      openSocket() {
        if(typeof(WebSocket) == "undefined") {
          console.log("浏览器不支持WebSocket");
        }else{
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          if(this.socket != null){
            this.socket.close();
            this.socket = null;
          }
          this.socket = new WebSocket("ws://192.168.1.10:8888/message/api/portalpublic/webSocket/"+ this.user);
          //打开事件
          this.socket.onopen = function() {
            console.log("websocket已打开");
          };
          //获得消息事件
          this.socket.onmessage = function(msg) {
            console.log("收到服务端信息：" + msg.data);
          };
          //关闭事件
          this.socket.onclose = function() {
            console.log("websocket已关闭");
          };
          //发生了错误事件
          this.socket.onerror = function() {
            console.log("websocket发生了错误");
          }
        }
      },
      //点击切换--搜索tab
      searchNavBarHandle(index) {
        this.activeSearchNavBar = index;
        this.searchValue = "";
      },

      //销售跟进--值
      getSalesFollowData() {
        querySalePlanIndexCount({}).then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.salePlanData = res.data;
              setTimeout(() => {
                this.getListHeight()
              }, 200)
            }
          }
        });
      },

      //回款情况看板--值
      getPayBackBoardData(t) {
        queryPayBackBoardData(this.queryPayBack).then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.payBackData = res.data;
              let cakeGraph = [
                { value: this.payBackData.receivableTotal, name: '总应收款' },
                { value: this.payBackData.receivedTotal, name: '总已收款' }
              ];

              this.payBackData.cakeGraph = cakeGraph;
              let x = [];
              let y = [];
              this.payBackData.monitorBos.forEach(function (item, index) {
                x.push(item.x);
                y.push(item.y);
              });
              let barGraph = {
                  x: x,
                  y: y
                };
              this.payBackData.barGraph = barGraph;


              setTimeout(() => {
                this.getListHeight()
              }, 200)

              this.renderingPaybackData()

            }
          }
        });
      },


      //筛选栏--获取企业列表
      getCompanyDeptTrees() {
        getCompanyDeptTree({
          'companyId': this.$store.getters.companyId,
          'companyName': this.companyName
        }).then(res => {
          this.companyList = res.data.deptInfoTreeVos;
        })
      },

      //根据角色获取人员列表
      getPersonList(name, deptIds,isResign,isExcludePermission) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (isResign != undefined) {
          formData.append('isResign', isResign)
        }
        if (deptIds != undefined) {
          formData.append('deptIdList', deptIds)
        }
        if(isExcludePermission != undefined){
          formData.append('isExcludePermission', isExcludePermission)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            this.userList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //筛选栏-选择部门-操作
      selectCompanyHandle(val) {
        const deptIds = [];
        const deptNames = [];
        if (val.length != 0) {
          this.companyList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                deptIds.push(item.deptId);
                deptNames.push(item.deptName);
              }
            })
          })
        }
        this.getPersonList('业务员,业务主管', val,false, true)

        this.queryPayBack.deptIds = deptIds;
        this.getPayBackBoardData(this.queryPayBack);
      },

      //筛选栏-选择员工-操作
      selectUserHandle(val) {
        const userIds = [];
        if (val.length != 0) {
          this.userList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                userIds.push(item.userId)
              }
            })
          })
        }

        this.queryPayBack.userIds = userIds;
        this.getPayBackBoardData(this.queryPayBack);
      },

      renderingPaybackData() {
        setTimeout(() => {
          echarts.init(
            document.getElementById('payBackColumnarBoard')).setOption({
              title: {
                text: '',
                subtext: ''
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'          // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              color: ['#5AD871'],
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: this.payBackData.barGraph.x,
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '已收',
                  type: 'bar',
                  barWidth: '60%',
                  data: this.payBackData.barGraph.y
                }
              ]
            }
          )
        }, 0)

        setTimeout(() => {
          echarts.init(
            document.getElementById('payBackCakeBoard')).setOption({
              title: {
                text: '',
                subtext: '',
                left: 'center'
              },
              color: ['#FE5A87', '#7296DE'],
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '收款情况统计',
                  type: 'pie',
                  radius: '50%',
                  data: this.payBackData.cakeGraph,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
          )
        }, 0)
      },

      //我的事项--值
      getBusinessData() {
        queryMsgChatIndexCount({}).then(res => {
          if (res.code === 200) {
            this.businessData = res.data;
          }
        });
      },

      //综合看板--值
      getBackgroundBoardData() {
        backgroundBoardData({}).then(res => {
          if (res.code == 200) {
            let params = {
              immediatelyStopCount: res.data.immediatelyStopCount,      //马上截止
              myClientCount: res.data.myClientCount,                    //客户数量
              myContractCount: res.data.myContractCount,                //合同数量
              newOrderFlagCount: res.data.newOrderFlagCount,            //合同红点
              myOrderCount: res.data.myOrderCount,                      //订单数量
              notAllocationCount: res.data.notAllocationCount,          //未分配
              projectLibraryCount: res.data.projectLibraryCount,        //项目库
              returnedMoneyCount: res.data.returnedMoneyCount,          //待回款
              payBackCount: res.data.payBackCount,                      //已回款
              myAgendaCount: res.data.myAgendaCount,                    //我的待办
              toAuditCount: res.data.toAuditCount,                      //待复审
              toBeCompletedCount: res.data.toBeCompletedCount,          //待完成
              toEvaluateCount: res.data.toEvaluateCount,                //待评估
              toProjectApprovalCount: res.data.toProjectApprovalCount,  //已立项
              toSubmitCount: res.data.toSubmitCount,                    //待提交
              paymentReviewCount: res.data.paymentReviewCount,          //回款待审核
            };
            this.boardData = params;

            let day2 = new Date();
            day2.setTime(day2.getTime());
            let y = day2.getFullYear();
            let m = day2.getMonth() + 1 < 10 ? "0" + (day2.getMonth() + 1) : day2.getMonth() + 1;
            let d = day2.getDate() < 10 ? "0" + day2.getDate() : day2.getDate();
            let nowData = `${y}-${m}-${d}`;

            res.data.noticeInfoList.forEach(item => {
              if (item.onlineDateEnd && !item.paperDateEnd) {
                item.newData = item.onlineDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return;
              } else if (!item.onlineDateEnd && item.paperDateEnd) {
                item.newData = item.paperDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24);
                return;
              } else if (!item.onlineDateEnd && !item.paperDateEnd) {
                return
              } else if (item.onlineDateEnd.replace(/\-/g, "") > item.paperDateEnd.replace(/\-/g, "")) {
                item.newData = item.paperDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return
              } else if (item.onlineDateEnd.replace(/\-/g, "") < item.paperDateEnd.replace(/\-/g, "")) {
                item.newData = item.onlineDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return
              } else if (item.onlineDateEnd.replace(/\-/g, "") == item.paperDateEnd.replace(/\-/g, "")) {
                item.newData = item.onlineDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return
              }
            });

            this.policylist = res.data.noticeInfoList;

            setTimeout(() => {
              this.getListHeight()
            }, 200)

          }
        })
      },

      //政策通知列表--跳转到详情
      goPolicyDetail(data) {
        this.$router.push({'path': '/policy/detailPolicy', 'query': {'noticeId': data.noticeId, 'is_check': true}})
      },

      //政府立项公示文件--值
      getPubilcList() {
        let params = {
          page: 0,
          pageSize: 20,
        }
        findApprovalPublicity(params).then(res => {
          if (res.code == 200) {
            this.projectList = res.data.data;
          }
        })
      },

      //政府立项公示文件--跳转到详情
      goProjectDetail(data) {
        this.$router.push({
          path: '/approvalCollaborative/publicityResult/addPublic',
          query: {
            publicityId: data.publicityId,
            isShow: true
          }
        })
      },

      // 设置政策通知和立项公示高度
      getListHeight() {
        const searchHeight = this.$refs.search.clientHeight;

        // let saleHeight = this.$refs.sale.clientHeight != undefined ? this.$refs.sale.clientHeight : 0;

        let saleHeight;
        if (this.$refs.sale == undefined) {
          saleHeight = -14
        } else {
          saleHeight = this.$refs.sale.clientHeight
        }

        const comprehensiveHeight = this.$refs.comprehensive.clientHeight
        let userMatterHeight = 0;
        if(this.$refs.userMatter && this.$refs.userMatter.clientHeight){
          userMatterHeight = this.$refs.userMatter.clientHeight
        }

        if (saleHeight === 0 && comprehensiveHeight == 0) {
          this.NoticeListView = {'height': '300px', 'overflow': "hidden"}
          this.MaintenanceListView = {'height': '300px', 'overflow': "hidden"}
        } else {
          const listHeight = ((searchHeight + saleHeight + comprehensiveHeight - userMatterHeight + 463) / 2) + 'px'
          this.NoticeListView = {'height': listHeight, 'overflow': 'hidden'};
          this.MaintenanceListView = {'height': listHeight, 'overflow': 'hidden'}
        }
        window.onresize = () => {
          return (() => {
            const searchHeight = this.$refs.search.clientHeight
            // const saleHeight = this.$refs.sale.clientHeight
            let saleHeight;
            if (this.$refs.sale == undefined) {
              saleHeight = -14
            } else {
              saleHeight = this.$refs.sale.clientHeight
            }
            const comprehensiveHeight = this.$refs.comprehensive.clientHeight
            const userMatterHeight = this.$refs.userMatter.clientHeight

            if (saleHeight === 0 && comprehensiveHeight == 0) {
              this.NoticeListView = {'height': '300px'}
              this.MaintenanceListView = {'height': '300px'}
            } else {
              const listHeight = ((searchHeight + saleHeight + comprehensiveHeight - userMatterHeight + 463) / 2) + 'px'
              this.NoticeListView = {'height': listHeight}
              this.MaintenanceListView = {'height': listHeight}
            }
          })()
        }
      },

      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        this.to_data = toData
      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        this.to_data = toData
      },

      //跳转到销售计划
      goSalesPlan(num) {
        this.$router.push({
          path: '/customer/salesPlan',
        });
        localStorage.setItem('planStatus', num)

      },

      //跳转到消息
      goMessage(data) {
        this.$router.push({
          path: '/message/list',
          query: {
            name: data
          }
        })
      },

      //搜索跳转
      searchLinkHandle() {
        let index = this.activeSearchNavBar;
        if (this.searchValue === "") {
          this.$message.warning('请输入您要搜索的内容！');
          return
        }

        switch (index) {
          case 0:
            this.$router.push({path: '/customer'});
            localStorage.setItem('searchName', this.searchValue);
            break;
          case 1:
            this.$router.push({path: '/contract'});
            localStorage.setItem('searchName', this.searchValue);
            break;
          case 2:
            this.$router.push({path: '/declareCoordination/orderManage'});
            localStorage.setItem('searchName', this.searchValue);
            break;
          case 3:
            this.$router.push({path: '/policy'});
            localStorage.setItem('searchName', this.searchValue);
            break;
          case 4:
            this.$router.push({path: '/approvalCollaborative'});
            localStorage.setItem('searchName', this.searchValue);
            break;
        }
      },

      //跳转到政策通知
      goPolicy() {
        this.$router.push({path: '/policy'});
      },

      //跳转到立项公示
      goPublicityResult() {
        this.$router.push({path: '/approvalCollaborative/publicityResult'});
      },

      //跳转到客户中心
      goCustomer() {
        this.$router.push({path: '/customer'});
        localStorage.setItem('customerPosition', '1');
      },

      //跳转到合同
      goContract() {
        this.$router.push({path: '/contract'});
        localStorage.setItem('searchName', '');
      },

      //跳转到我的订单
      goOrder() {
        this.$router.push({path: '/declareCoordination/orderManage'});
        let params = {arr: [], num: ''};
        localStorage.setItem('orderParams', JSON.stringify(params));
      },

      //跳转到我的订单-筛选
      goOrderParams(num) {
        switch (num) {
          case 0:
            queryImmediatelyStopOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 1:
            querynotAllocationOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 2:
            queryStayAssessOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 3:
            queryToAuditOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 4:
            queryToBeCompletedOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 5:
            queryToSubmitOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 6:
            queryAlreadyApprovalOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 8:
            queryMyAgendaOrderIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/declareCoordination/orderManage'});
              }
            });
            break;
          case 9:
            queryRecheckcontractIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if(data.length == 0){
                  data = ['0'];
                }

                let params = {arr: data, num: num};
                localStorage.setItem('orderParams', JSON.stringify(params));
                this.$router.push({path: '/contract'});
              }
            });
            break;
          case 7:
            this.$message.warning('暂未有功能!');
            break;
        }
      },



      //跳转到我的合同-筛选
      goContractParams(num) {
        switch (num) {
          case 0:
            queryPayBackContractIdList({}).then(res => {
              if (res.code === 200) {
                let data = res.data
                if (data.length == 0) {
                  data = ['0'];
                }

                let params = { arr: data, num: num };
                localStorage.setItem('contractParams', JSON.stringify(params));
                this.$router.push({ path: '/contract' });
              }
            });
            break;
        }
      },

      //跳转到项目库
      goProject() {
        this.$router.push({path: '/policy/project/list'});
        localStorage.setItem('searchName', '');
      }
    },
    computed: {
      myValue() {
        return this.$store.getters.newMessage
      }
    },
    watch:{
      myValue: function(newVal, oldVal) {
        //其他业务代码
        this.getBusinessData();
      }
    },
  }
</script>

<style lang="less" scoped>
  ul li {
    margin: 0;
    /*padding: 0;*/
    list-style: none;
  }

  .inside-box {
    padding-top: 10px;

    .cart {
      width: 100%;
      margin-bottom: 14px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      overflow: hidden;

      .custom-plate {
        padding: 10px;
        text-align: center;

        span {
          img {
            margin-top: -2px;
            vertical-align: middle;
          }

          cursor: pointer;
        }
      }
    }

    .search-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;

      .search-nav-bar {
        display: flex;
        font-size: 14px;
        height: 32px;

        li {
          white-space: nowrap;
          width: 100px;
          height: 100%;
          padding: 6px 17px;
          color: rgba(68, 68, 68, 0.75);
          border: 1px solid rgba(241, 241, 241, 1);
          border-right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;

          .text {
            z-index: 3;
          }

          img {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
          }

          &.cur {
            border: 0;
            color: #fff;
          }

          &:last-child {
            border-right: 1px solid rgba(241, 241, 241, 1);
          }
        }
      }

      .search-form {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;

        .search-input {
          width: 510px;

          /deep/ .el-input__inner {
            width: 510px;
            height: 40px;
            border: 1px solid #05AAFF;
            border-radius: 0;
            border-right: 0;
          }
        }

        .search-btn {
          width: 100px;
          height: 40px;
          color: #fff;
          border: 0;
          outline: none;
          cursor: pointer;
          font-size: 14px;
          background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

          &:active {
            background: linear-gradient(180deg, rgba(105, 204, 255, .5) 0%, rgba(5, 170, 255, .5) 100%);
          }
        }
      }

      .search-hot {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-top: 14px;

        .hot-text {
          color: #042B40;
          margin-right: 10px;
        }

        .hot-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 1px;
          color: rgba(151, 151, 151, 1);

          li {
            margin-right: 10px;
            cursor: pointer;

            &:hover {
              color: #05AAFF;
            }
          }
        }
      }
    }

    .cart-box {
      padding: 16px;

      .cart-title {
        display: flex;
        align-items: center;

        .line {
          width: 3px;
          height: 14px;
          margin-right: 10px;
          vertical-align: middle;
          margin-top: -2px;

          &.blue {
            background: #05AAFF;
          }

          &.purple {
            background: #5883FF;
          }

          &.red {
            background: #FE4E7E;
          }

          &.orange {
            background: #FFA96A;
          }
        }

        font-size: 16px;
        color: #042B40;

        .left-title {
          display: flex;
          align-items: center;
        }

        .more {
          cursor: pointer;
          font-size: 14px;
          color: rgba(68, 68, 68, 0.50);
        }

        &.sb {
          justify-content: space-between;
        }
      }

      .cart-kanban-body {
        text-align: center;
        padding-top: 20px;

        .item-kanban {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;


          .icon {
            width: 42px;
            height: 42px;
            position: relative;

            img {
              width: 100%;
              height: auto;
            }

            .red-tip {
              position: absolute;
              width: 10px;
              height: 10px;
              background: red;
              border-radius: 50%;
              right: 0;
            }
          }

          .num {
            font-size: 32px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000;
            margin-top: 10px;
            margin-bottom: 14px;
          }

          .text {
            font-size: 16px;
            font-family: Microsoft YaHei;
            color: rgba(68, 68, 68, 0.75);
          }

        }

        /deep/ .el-col-offset-1 {
          margin-left: 3.16667%;
        }
      }

      .cart-salesFollow-body {
        display: flex;
        align-items: center;
        padding-top: 15px;

        .item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          padding-bottom: 27px;
          box-sizing: border-box;
          flex: 1;
          max-width: 210px;
          height: auto;
          margin-right: 10px;
          background-size: cover;
          cursor: pointer;
          border-radius: 4px;
          overflow: hidden;

          .left {
            color: #fff;

            .num {
              font-size: 1.5vw;
              margin-bottom: 6px;
            }

            .text {
              font-size: 0.85vw;
            }
          }

          img {
            width: 2.6vw;
            max-width: 36px;
          }

          &.plan {
            background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/IrwwmFeY_20200326091500_457.png") no-repeat;
          }

          &.electric {
            background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/iucBhF23_20200326093649_935.png") no-repeat;
          }

          &.visit {
            background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/mnVEjNJc_20200326093718_403.png") no-repeat;
          }

          &.intention {
            background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/4B2MZpIP_20200324110316_886.png") no-repeat;
          }

          &.sign {
            background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/zd11QkvJ_20200324110350_190.png") no-repeat;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .cart-myMatter-body {
        margin-top: 20px;

        .item-myMatter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 20px;

          .left {
            font-size: 16px;
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 20px;
              vertical-align: middle;
              margin-top: -4px;
            }

            .text {
              cursor: pointer;
              color: rgba(68, 68, 68, 1);
              margin-left: 10px;

              &:hover {
                color: #05AAFF;
              }
            }
          }

          .right {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;

            .nun-background {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 18px;
              height: 18px;
              padding-left: 1px;
              background: red;
              color: #fff;
              border-radius: 50%;
            }
          }
        }
      }

      #policyRoll, #projectRoll {
        overflow: hidden;
        margin-top: 20px;
      }

      .scroll-list {
        margin-top: 10px;
        overflow: hidden;
      }

      .cart-policyNotice-body {
        li {
          color: #444;
          font-size: 14px;
          padding-left: 14px;
          margin-bottom: 16px;

          .top-text {
            .level {
              display: inline-block;
              text-align: center;
              line-height: 20px;
              min-width: 40px;
              width: 40px;
              height: 20px;
              font-size: 12px;
              color: #fff;
              margin-right: 4px;
              background: rgb(5, 170, 255);

              &.orange {
                background: rgba(255, 186, 136, 1);
              }

              &.green {
                background: rgb(145, 229, 161);
              }

              &.red {
                background: rgb(254, 149, 178);
              }

              &.blue {
                background: rgb(155, 181, 255);
              }
            }

            .text {
              cursor: pointer;

              &:hover {
                color: #05AAFF;
              }
            }
          }

          .date-time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 6px;

            .date {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(68, 68, 68, 0.60);
            }

            .date-state {
              font-size: 14px;
              font-weight: 400;
              color: #05AAFF;

              .date-num {
                color: #F56C6C;
              }
            }
          }
        }
      }
    }

    .custom-modal {
      /deep/ .el-dialog__header {
        border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        padding: 20px 20px 16px;
      }
    }
  }

  .form-item {
    display: flex;
    align-items: center;
    margin-left: -35px;
    margin-bottom: -20px;
    margin-top: 20px;

    .label-text {
      width: 100px;
      font-size: 14px;
      color: rgba(4, 43, 64, 1);
      white-space: nowrap;
      text-align: right;
      font-weight: 600;
      margin-right: 12px;
    }

    .form-handle {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .select-input {
        margin-right: 20px;

        /deep/ .el-input__inner {
          min-height: 32px;
        }

        /deep/ .el-input__icon {
          line-height: 30px;
        }
      }
    }

    .date-select {
      width: 290px;

      /deep/ .el-range-separator {
        padding: 0;
        line-height: 33px;
      }

      /deep/ .el-date-editor .el-range__close-icon {
        line-height: 34px;
      }
    }
  }

  /deep/ .el-badge__content{
    height: auto;
  }

</style>
