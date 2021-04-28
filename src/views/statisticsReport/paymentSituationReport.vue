<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">已选条件:</span>
            <div class="conditionList">
              <div class="conditionBox" v-for="(value, key) in selectConditionsList">
                {{value}}<img class="hoverCursor" @click="deleteOneClick(key)" src="../icons/enterprise/close_con.png"/>
              </div>
              <div class="conditionClear" @click="deleteAllClick" v-if="Object.keys(selectConditionsList).length > 1">
                清空所有
              </div>
            </div>
          </div>
        </div>
        <div class="conditionCont">
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选常用：</span>
                <el-select size="small" filterable v-model="statisticsForm.signCompanyId" placeholder="签约公司"
                           clearable @change="signCompanyChange">
                  <el-option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId">
                  </el-option>
                </el-select>
                <el-select size="small" filterable v-model="statisticsForm.deptIds" placeholder="选择部门" clearable multiple
                           @change="deptmentChange">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" multiple v-model="statisticsForm.signUserId" placeholder="选择签订人"
                           clearable @change="userChange">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="signDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="签单开始日期"
                  end-placeholder="签单结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="signDateChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选项目：</span>
                <el-select v-model="statisticsForm.projectIds" filterable remote multiple
                           :remote-method="projectListMethod" v-loadMore="loadMore" :loading="loading"
                           :multiple-limit="10" size="small" placeholder="项目" clearable @change="projectChange">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                  </el-option>
                </el-select>
<!--                <el-date-picker-->
<!--                  @change="projectYearChange"-->
<!--                  clearable-->
<!--                  size="small"-->
<!--                  v-model="statisticsForm.applyYear"-->
<!--                  type="year"-->
<!--                  value-format="yyyy"-->
<!--                  placeholder="项目年份">-->
<!--                </el-date-picker>-->
                <el-select size="small" filterable @change='projectYearChange' v-model="statisticsForm.projectYears"
                           placeholder="项目年度" clearable multiple>
                  <el-option
                    v-for="item in yearList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <el-select filterable size="small" v-model="statisticsForm.areaLevels" multiple placeholder="项目级别"
                           clearable @change="areaLevelChange">
                  <el-option
                    v-for="item in projectLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select filterable multiple size="small" v-model="statisticsForm.titleSeriesList" placeholder="职称系列" clearable @change="changeTitleSeries">
                  <el-option v-for="item in titleSeriesList" :label="item.dictName" :value="item.dictId" :key="item.dictId"></el-option>
                </el-select>
                <el-select size="small" v-model="statisticsForm.batchs" placeholder="批次" multiple clearable @change="bathChange">
                  <el-option
                    v-for="item in batchNoList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select size="small" @change='changeProjectBegin' v-if="!showFour" v-model="approvedInfo" placeholder="立项情况" clearable multiple>
                  <el-option label="未办结" value="unsettled"></el-option>
                  <el-option label="已办结" value="completed"></el-option>
                  <el-option label="未立项" value="notApproved"></el-option>
                  <el-option label="已立项" value="hasApproved"></el-option>
                </el-select>
<!--                <el-checkbox v-model="unsettled" @change="changeProjectBegin" :disabled="showFour">未办结</el-checkbox>-->
<!--                <el-checkbox v-model="completed" @change="changeProjectBegin" :disabled="showFour">已办结</el-checkbox>-->
<!--                <el-checkbox v-model="notApproved" @change="changeProjectBegin" :disabled="showFour">未立项</el-checkbox>-->
<!--                <el-checkbox v-model="hasApproved" @change="changeProjectBegin" :disabled="showFour">已立项</el-checkbox>-->
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选地区：</span>
                <el-select size="small" v-model="statisticsForm.provinceId" placeholder="省份" clearable @change="changeProvince">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="statisticsForm.cityId" placeholder="城市" clearable @change="changeCity">
                  <el-option
                    v-for="item in cityList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="statisticsForm.districtId" placeholder="县区" clearable
                           @change="changeDistrict">
                  <el-option
                    v-for="item in districtList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="statisticsForm.townId" placeholder="镇街" clearable @change="changeTown">
                  <el-option
                    v-for="item in townList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>回款情况：</span>
                <el-radio-group @change="paymentSituationChange" v-model="statisticsForm.paymentSituation">
                  <el-radio v-for="item in paymentSituationList" :label="item.value" :value="item.value" :key="item.value">
                    {{item.label}}
                  </el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>回款日期：</span>
                <el-date-picker
                  v-model="payMentBackDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="回款开始日期"
                  end-placeholder="回款结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="payMentBackDateChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose orginLeft">搜索到 {{total}} 条记录</span>
            <div class="headBtn">
              <el-button type="primary" class="btn export" size="small" @click="handleExport">导出</el-button>
            </div>
          </div>
        </div>
        <div class="projectTable">
          <el-table :data="projectReport" border fit highlight-current-row ref="projectReport">
            <el-table-column label="企业名称" align="center" min-width="300">
              <template slot-scope="scope">
                <span>{{scope.row.companyName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center" min-width="260">
              <template slot-scope="scope">
                <span>{{scope.row.projectName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="地区" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.applyArea}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.applyNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目年份" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.year}}</span>
              </template>
            </el-table-column>
            <el-table-column label="批次" align="center" min-width="140">
              <template slot-scope="scope">
                <span v-if="scope.row.applyBatchNo == 0"> 未指定 </span>
                <span v-else-if="scope.row.applyBatchNo > 0"> 第 {{ scope.row.applyBatchNo }} 批</span>
                <span v-else> - </span>
              </template>
            </el-table-column>
            <el-table-column label="级别" align="center" min-width="140">
              <template slot-scope="scope">
                <span>
                  {{
                    scope.row.applyLevel == 1 ? '国家级' :
                    scope.row.applyLevel == 2 ? '省级' :
                    scope.row.applyLevel == 3 ? '市级' :
                    scope.row.applyLevel == 4 ? '区县级' :
                    scope.row.applyLevel == 5 ? '镇街级' : '-'
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="收款条例" align="center" min-width="140">
              <template slot-scope="scope">
                <span v-for="item in scope.row.agreementList">{{item}}<br></span>
              </template>
            </el-table-column>
            <el-table-column label="单价/比例" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.unitPrice}}</span>
              </template>
            </el-table-column>
<!--            <el-table-column label="业务费比例" align="center" min-width="140">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{scope.row.proxyPriceRatio ? scope.row.proxyPriceRatio * 100 + '%' : '-'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column label="业务费" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.proxyPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="委外费" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.outsourcePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审计费" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.auditPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="知产费" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.iprPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="其他费" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.otherPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="应收款" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.receivablesMoney ? scope.row.receivablesMoney : '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="已审核已收款" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.totalCheckPayment}}</span>
              </template>
            </el-table-column>
            <el-table-column label="未审核已收款" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.totalNotCheckPayment}}</span>
              </template>
            </el-table-column>
            <el-table-column label="未收款" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.unPayment}}</span>
              </template>
            </el-table-column>
            <el-table-column label="提成比例" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.commissionRatio ? scope.row.commissionRatio : '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="提成" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.resultCommission + '元'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="业务员" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.signUserName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="新老客户" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.newOrOld == 1 ? '老客户' : scope.row.newOrOld == 0 ? '新客户' : '-'}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="projectReport.length != 0">
            <div class="noMore" @click="getMore" v-if="total - projectReport.length > 0">
              加载更多
            </div>
            <div class="noMore" v-else>
              没有更多
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!--置顶-->
    <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../icons/enterprise/back_top.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
  import { commonDict,commonDictOfRegion,downloadCrm } from '@/api/utils'
  import {queryReceiptStatisticsTable,exportReceiptStatisticsTable} from '@/api/statisticsReport'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import {getDepartmentTree} from '@/api/department.js'
  import {queryCompany} from '@/api/contractManage'
  import {queryUserComboInfo} from '@/api/customerCenter'

  export default {
    data(){
      return{
        btnFlag:0,
        approvedInfo:'',
        statisticsForm:{
          page:0,
          pageSize:20,
          paymentSituation:'',
          companyId: '0',
        },
        yearList:[],
        showFour: true,
        unsettled: false,
        completed: false,
        notApproved: false,
        hasApproved: false,
        total:0,
        projectList:[],
        deptmentList:[],
        companyList:[],
        userList:[],
        selectConditionsList:{},
        signDate:[],
        projectReport:[],
        provinceList:[],
        cityList:[],
        districtList:[],
        townList:[],
        level:3,
        parentId:0,
        projectLevelList: [
          { 'label': '国家级', 'value': 1 },
          { 'label': '省级', 'value': 2 },
          { 'label': '市级', 'value': 3 },
          { 'label': '区县级', 'value': 4 },
          { 'label': '镇街级', 'value': 5 }
        ],
        batchNoList:[
          { 'label': '未指定', 'value': 0 },
          { 'label': '第1批', 'value': 1 },
          { 'label': '第2批', 'value': 2 },
          { 'label': '第3批', 'value': 3 },
          { 'label': '第4批', 'value': 4 },
          { 'label': '第5批', 'value': 5 },
          { 'label': '第6批', 'value': 6 },
          { 'label': '第7批', 'value': 7 },
          { 'label': '第8批', 'value': 8 },
          { 'label': '第9批', 'value': 9 },
          { 'label': '第10批', 'value': 10 }
        ],
        paymentSituationList:[
          {label:'显示全部记录', value: 1},
          {label:'只显示从未收款记录', value: 2},
          {label:'只显示有回款但未完毕记录', value: 3},
          {label:'只显示已回款完毕记录', value: 4},
        ],
        projectForm:{
          page:0,
          pageSize:20,
          orderField:'sales',
          orderType: 'DESC'
        },
        //日期范围设置
        pickerOptions: {
          shortcuts: [
            {
              text: '昨天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                end.setTime(end.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '今天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '上周',
              onClick(picker) {
                const oDate = new Date()
                oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7)

                let day = oDate.getDay()

                let start = new Date(),
                  end = new Date()
                if (day == 0) {
                  start.setDate(oDate.getDate())
                  end.setDate(oDate.getDate() + 6)
                } else {
                  start.setTime(oDate.getTime() - 3600 * 1000 * 24 * day)
                  end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (6 - day))
                }

                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '本周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                let thisDay = start.getDay()
                let thisDate = start.getDate()
                if (thisDay != 0) {
                  start.setDate(thisDate - thisDay)
                }
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '上月',
              onClick(picker) {
                const oDate = new Date()
                var year = oDate.getFullYear()
                var month = oDate.getMonth()
                var start, end
                if (month == 0) {
                  year--
                  start = new Date(year, 11, 1)
                  end = new Date(year, 11, 31)
                } else {
                  start = new Date(year, month - 1, 1)
                  end = new Date(year, month, 0)
                }

                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '本月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setDate(1);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '去年',
              onClick(picker) {

                var oDate = new Date();
                var prevYear = oDate.getFullYear() - 1;
                const end = new Date();
                const start = new Date();
                start.setFullYear(prevYear);
                start.setMonth(0);
                start.setDate(1);

                end.setFullYear(prevYear);
                end.setMonth(11);
                end.setDate(31);

                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '今年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(0);
                start.setDate(1);
                picker.$emit('pick', [start, end]);
              }
            },
          ]
        },
        loading:false,
        payMentBackDate: [],
        // allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
      }
    },
    activated() {
      this.getRegionList();
      this.getProjectList();
      this.getCompanyList();
      this.getDepartmentList();
      this.getPaymentReport();
      this.getAllYearList();
      this.getTitleSeries();
      this.getPersonList('业务员,业务主管');
    },
    directives: {
      loadMore: {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
          SELECTWRAP_DOM.addEventListener('scroll', function() {

            const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
            if (CONDITION) {
              binding.value()
            }
          })
        }
      }
    },
    methods:{
      // 回到顶部
      backTop() {
        const that = this
        const timer = setInterval(() => {
          const ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop =
            that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop() {
        const that = this // 缓存当前this
        const scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scroll_top
        if (that.scrollTop > 0) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },

      //判断数字大小
      judgemNumber(number){
        if(number && number < 1){
          number = parseFloat((number * 100).toPrecision(12)) + '%'
        }else if(number && number > 1){
          if (number > 100000000){
            number = this.except(number, 100000000)
            number = String(number).replace(/^(.*\..{6}).*$/, "$1")
            number = number + '亿元'
          }else if(number > 10000){
            number = this.except(number, 10000)
            number = String(number).replace(/^(.*\..{6}).*$/, "$1")
            number = number + '万元'
          }else{
            number = String(number).replace(/^(.*\..{4}).*$/, "$1")
            number = number + '元'
          }
        }

        return number;
      },

      //解决除法精度问题
      except(arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
          t1 = arg1.toString().split(".")[1].length
        } catch (e) {
        }
        try {
          t2 = arg2.toString().split(".")[1].length
        } catch (e) {
        }
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * Math.pow(10, t2 - t1);
      },


      // 获取职称系列
      getTitleSeries() {
        queryTitleSeriesOrLevel({}).then(res =>{
          if (res.code === 200){
            this.titleSeriesList = res.data
          }
        })

      },

      // 职称筛选
      changeTitleSeries(val){
        const arr = []
        if (val.length != 0) {
          this.titleSeriesList.forEach(item => {
            val.forEach(val => {
              if (item.dictId == val) {
                arr.push(item.dictName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'titleSeries',  `职称系列 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'titleSeries')
        }
        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },


      //获取统计列表
      getPaymentReport(){
        queryReceiptStatisticsTable(this.statisticsForm).then(res=>{
          if(res.code == 200){
            if (this.statisticsForm.page > 0) {
              this.projectReport.splice(this.projectReport.length-2,2)
              this.projectReport = this.projectReport.concat(res.data.receiptTableVos.data);
            } else {
              this.projectReport = res.data.receiptTableVos.data;
            }

            // this.projectReport = res.data.receiptTableVos.data;
            this.total = res.data.receiptTableVos.total;

            this.projectReport.forEach(item=>{
              item.auditPrice = this.judgemNumber(item.auditPrice)
              item.iprPrice = this.judgemNumber(item.iprPrice)
              item.otherPrice = this.judgemNumber(item.otherPrice)
              item.outsourcePrice = this.judgemNumber(item.outsourcePrice)
              item.proxyPrice = this.judgemNumber(item.proxyPrice)
              item.unitPrice = this.judgemNumber(item.unitPrice)
              item.receivablesMoney = this.judgemNumber(item.receivablesMoney)
              item.totalCheckPayment = this.judgemNumber(item.totalCheckPayment)
              item.unPayment = this.judgemNumber(item.unPayment)
            })

            res.data.receiptPageSum.auditPrice = this.judgemNumber(res.data.receiptPageSum.auditPrice)
            res.data.receiptPageSum.iprPrice = this.judgemNumber(res.data.receiptPageSum.iprPrice)
            res.data.receiptPageSum.otherPrice = this.judgemNumber(res.data.receiptPageSum.otherPrice)
            res.data.receiptPageSum.outsourcePrice = this.judgemNumber(res.data.receiptPageSum.outsourcePrice)
            res.data.receiptPageSum.proxyPrice = this.judgemNumber(res.data.receiptPageSum.proxyPrice)
            res.data.receiptPageSum.unitPrice = this.judgemNumber(res.data.receiptPageSum.unitPrice)
            res.data.receiptPageSum.receivablesMoney = this.judgemNumber(res.data.receiptPageSum.receivablesMoney)
            res.data.receiptPageSum.totalCheckPayment = this.judgemNumber(res.data.receiptPageSum.totalCheckPayment)
            res.data.receiptPageSum.unPayment = this.judgemNumber(res.data.receiptPageSum.unPayment)

            res.data.receiptTotalSum.auditPrice = this.judgemNumber(res.data.receiptTotalSum.auditPrice)
            res.data.receiptTotalSum.iprPrice = this.judgemNumber(res.data.receiptTotalSum.iprPrice)
            res.data.receiptTotalSum.otherPrice = this.judgemNumber(res.data.receiptTotalSum.otherPrice)
            res.data.receiptTotalSum.outsourcePrice = this.judgemNumber(res.data.receiptTotalSum.outsourcePrice)
            res.data.receiptTotalSum.proxyPrice = this.judgemNumber(res.data.receiptTotalSum.proxyPrice)
            res.data.receiptTotalSum.unitPrice = this.judgemNumber(res.data.receiptTotalSum.unitPrice)
            res.data.receiptTotalSum.receivablesMoney = this.judgemNumber(res.data.receiptTotalSum.receivablesMoney)
            res.data.receiptTotalSum.totalCheckPayment = this.judgemNumber(res.data.receiptTotalSum.totalCheckPayment)
            res.data.receiptTotalSum.unPayment = this.judgemNumber(res.data.receiptTotalSum.unPayment)

            this.thisPageTotal = res.data.receiptPageSum
            this.allTotal = res.data.receiptTotalSum

            this.projectReport.push(this.thisPageTotal)
            this.projectReport.push(this.allTotal)
          }
        })
      },

      //加载更多
      getMore(){
        this.statisticsForm.page = this.statisticsForm.page + 20;
        this.getPaymentReport();
      },

      //获取项目列表
      getProjectList(query) {
        if(query){
          this.projectForm.projectName = query;
        }else{
          this.projectForm.projectName = '';
        }
        queryAll(this.projectForm).then(response => {
          if(response.code == 200){
            if(this.projectForm.page > 0){
              this.projectList = this.projectList.concat(response.data.data)
            }else{
              this.projectList = response.data.data
            }
          }else{
            this.$message.warning(response.message)
          }
        })
      },

      //远程搜索
      projectListMethod(query){
        this.projectForm.page = 0
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.getProjectList(query)
          }, 200)
        } else {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.getProjectList()
          }, 200)
        }
      },

      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      //获取地区信息
      getRegionList() {
        if (this.level == undefined || this.level == null) {
          this.level = 3
        }

        if (this.parentId == undefined || this.parentId == '') {
          this.level = 3
          this.parentId = 0
        }

        let params = {
          level: this.level,
          parentId: this.parentId
        }

        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (this.level == 3) {
              this.provinceList = res.data
            }
            if (this.level == 2) {
              this.cityList = res.data
            }
            if (this.level == 1) {
              this.districtList = res.data
            }
            if (this.level == 0) {
              this.townList = res.data
            }

          } else {
            this.$message({ type: 'error', message: res.message })
          }
        })
      },

      //获取签约公司
      getCompanyList() {
        queryCompany({}).then(res => {
          if (res.code == 200) {
            this.companyList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // 获取左侧公司部门列表
      getDepartmentList() {
        getDepartmentTree({}).then(res => {
          if (res.code == 200) {
            this.deptmentList = res.data.deptInfoTreeVos;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name, deptIds) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (deptIds != undefined) {
          formData.append('deptIdList', deptIds)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            this.userList = res.data;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //导出
      handleExport(){
        this.statisticsForm.page = 0;
        this.statisticsForm.pageSize = this.total;
        exportReceiptStatisticsTable(this.statisticsForm).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              this.statisticsForm.pageSize = 20;
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-回款情况统计表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url);
              this.statisticsForm.pageSize = 20

              this.$message.success('导出成功！')
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      projectChange(val){
        const arr = []
        this.statisticsForm.projectNames = []
        if (val.length != 0) {
          this.projectList.forEach(item => {
            val.forEach(val => {
              if (item.projectId == val) {
                arr.push(item.projectName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'projectIds', `项目 - ${string}`)
                this.statisticsForm.projectNames.push(item.projectName)
              }
            })
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'projectIds')
          this.$delete(this.statisticsForm, 'projectNames')
          if(this.statisticsForm.projectIds == '' && this.statisticsForm.areaLevels == '' && this.statisticsForm.projectYears == '' && this.statisticsForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.statisticsForm, 'searchNotFinished')
            this.$delete(this.statisticsForm, 'searchFinished')
            this.$delete(this.statisticsForm, 'searchNowReport')
            this.$delete(this.statisticsForm, 'searchAlreadyReport')
          }
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      projectYearChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.yearList.forEach(item => {
              if (item == val) {
                arr.push(item)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectYears', `项目年度 - ${string}`)
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'projectYears')
          if(this.statisticsForm.projectIds == '' && this.statisticsForm.areaLevels == '' && this.statisticsForm.projectYears == '' && this.statisticsForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.statisticsForm, 'searchNotFinished')
            this.$delete(this.statisticsForm, 'searchFinished')
            this.$delete(this.statisticsForm, 'searchNowReport')
            this.$delete(this.statisticsForm, 'searchAlreadyReport')
          }
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      areaLevelChange(val){
        const arr = []
        if (val.length != 0) {
          this.projectLevelList.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'areaLevels', `项目级别 - ${string}`)
              }
            })
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'areaLevels')
          if(this.statisticsForm.projectIds == '' && this.statisticsForm.areaLevels == '' && this.statisticsForm.projectYears == '' && this.statisticsForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.statisticsForm, 'searchNotFinished')
            this.$delete(this.statisticsForm, 'searchFinished')
            this.$delete(this.statisticsForm, 'searchNowReport')
            this.$delete(this.statisticsForm, 'searchAlreadyReport')
          }
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      bathChange(val){
        const arr = []
        if (val.length != 0) {
          this.batchNoList.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'batchs', `项目批次 - ${string}`)
              }
            })
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'batchs')
          if(this.statisticsForm.projectIds == '' && this.statisticsForm.areaLevels == '' && this.statisticsForm.projectYears == '' && this.statisticsForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.statisticsForm, 'searchNotFinished')
            this.$delete(this.statisticsForm, 'searchFinished')
            this.$delete(this.statisticsForm, 'searchNowReport')
            this.$delete(this.statisticsForm, 'searchAlreadyReport')
          }
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      changeProjectBegin(){

        if (this.approvedInfo.includes('unsettled')){
          this.statisticsForm.searchNotFinished = 1
        } else {
          this.$delete(this.statisticsForm, 'searchNotFinished')
        }
        if (this.approvedInfo.includes('completed')) {
          this.statisticsForm.searchFinished = 1
        } else {
          this.$delete(this.statisticsForm, 'searchFinished')
        }
        if (this.approvedInfo.includes('notApproved')) {
          this.statisticsForm.searchNowReport = 1
        } else {
          this.$delete(this.statisticsForm, 'searchNowReport')
        }
        if (this.approvedInfo.includes('hasApproved')) {
          this.statisticsForm.searchAlreadyReport = 1
        } else {
          this.$delete(this.statisticsForm, 'searchAlreadyReport')
        }

        // if(this.unsettled == true){
        //   this.statisticsForm.searchNotFinished = 1
        // }else{
        //   this.$delete(this.statisticsForm, 'searchNotFinished')
        // }
        //
        // if(this.completed == true){
        //   this.statisticsForm.searchFinished = 1
        // }else{
        //   this.$delete(this.statisticsForm, 'searchFinished')
        // }
        //
        // if(this.notApproved == true){
        //   this.statisticsForm.searchNowReport = 1
        // }else{
        //   this.$delete(this.statisticsForm, 'searchNowReport')
        // }
        //
        // if(this.hasApproved == true){
        //   this.statisticsForm.searchAlreadyReport = 1
        // }else{
        //   this.$delete(this.statisticsForm, 'searchAlreadyReport')
        // }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      changeProvince(val){
        if (val) {
          this.$set(this.selectConditionsList, 'provinceId', '省份 - ' + this.provinceList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'provinceId')
        }

        this.$delete(this.selectConditionsList, 'cityId')
        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.parentId = val
        this.level = 2
        this.getRegionList()

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },
      changeCity(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'cityId', '城市 - ' + this.cityList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'cityId')
        }

        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.parentId = val
        this.level = 1
        this.getRegionList()

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },
      changeDistrict(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'districtId', '区县 - ' + this.districtList.find(ele => ele.dictId === val).dictName)
          this.$delete(this.selectConditionsList, 'townId')
        } else {
          this.$delete(this.selectConditionsList, 'districtId')
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.parentId = val
        this.level = 0
        this.getRegionList()

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },
      changeTown(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'townId', '镇街 - ' + this.townList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      paymentSituationChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'paymentSituation', '回款情况 - ' + this.paymentSituationList.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'paymentSituation')
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      signCompanyChange(val) {
        // const arr = [];
        // if (val.length != 0) {
        //   this.companyList.forEach(item => {
        //     val.forEach(val => {
        //       if (item.companyId == val) {
        //         arr.push(item.companyName)
        //         const string = arr.join('，')
        //         this.$set(this.selectConditionsList, 'signCompanyId', '签约公司 - ' + string);
        //       }
        //     })
        //   })
        // } else {
        //   this.$delete(this.selectConditionsList, 'signCompanyIds')
        // }

        if (val) {
          this.$set(this.selectConditionsList, 'signCompanyId', '签约公司 - ' + this.companyList.find(ele => ele.companyId === val).companyName)
        } else {
          this.$delete(this.selectConditionsList, 'signCompanyId')
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      deptmentChange(val) {
        const arr = []
        if (val.length != 0) {
          this.deptmentList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'deptIds', `部门 - ${string}`)
              }
            })
          })

        } else {
          this.userList = [];
          this.$delete(this.selectConditionsList, 'deptIds')
          this.$delete(this.selectConditionsList, 'signUserIdList')
        }

        this.getPersonList('业务员,业务主管', val)

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      userChange(val) {
        const arr = []
        if (val.length != 0) {
          this.userList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'signUserId', `签订人 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'signUserId')
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      signDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signDate', '签单时间 - ' + val[0] + '-' + val[1])
          this.statisticsForm.signDateStart = val[0];
          this.statisticsForm.signDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'signDate')
          this.statisticsForm.signDateStart = '';
          this.statisticsForm.signDateEnd = '';
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      payMentBackDateChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'payMentBackDate', '回款日期 - ' + val[0] + '-' + val[1])
          this.statisticsForm.paymentDateStart = val[0];
          this.statisticsForm.paymentDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'payMentBackDate')
          this.statisticsForm.paymentDateStart = '';
          this.statisticsForm.paymentDateEnd = '';
        }

        this.statisticsForm.page = 0;
        this.getPaymentReport();
      },

      //删除筛选调节
      deleteOneClick(item){
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.statisticsForm, item)
        if(item == 'signDate'){
          this.signDate = [];
          this.statisticsForm.signDateStart = '';
          this.statisticsForm.signDateEnd = '';
        }
        if(item == 'payMentBackDate'){
          this.payMentBackDate = [];
          this.statisticsForm.paymentDateStart = '';
          this.statisticsForm.paymentDateEnd = '';
        }

        if(item == 'projectIds'){
          this.$delete(this.statisticsForm, 'projectNames')
        }

        if((!this.statisticsForm.projectIds || this.statisticsForm.projectIds == '') && (!this.statisticsForm.areaLevels || this.statisticsForm.areaLevels == '') && (!this.statisticsForm.projectYears || this.statisticsForm.projectYears == '') && (!this.statisticsForm.batchs || this.statisticsForm.batchs == '')){
          this.showFour = true;
          this.unsettled = false;
          this.completed = false;
          this.notApproved = false;
          this.hasApproved = false;
          this.$delete(this.statisticsForm, 'searchNotFinished')
          this.$delete(this.statisticsForm, 'searchFinished')
          this.$delete(this.statisticsForm, 'searchNowReport')
          this.$delete(this.statisticsForm, 'searchAlreadyReport')
        }

        this.statisticsForm.page = 0;
        this.statisticsForm.pageSize = 20;
        this.getPaymentReport();
      },

      //清除所有条件
      deleteAllClick(){
        this.selectConditionsList = {}
        this.statisticsForm = {}
        this.signDate = [];
        this.payMentBackDate = [];
        this.deadlineDate = '';
        this.signTimeDate = '';
        this.showFour = true;
        this.unsettled = false;
        this.completed = false;
        this.notApproved = false;
        this.hasApproved = false;
        this.statisticsForm.page = 0;
        this.statisticsForm.pageSize = 20;
        this.getPaymentReport();
      },

      getAllYearList(){
        this.yearList = [];
        //设置年份的选择
        var myDate= new Date();
        var startYear=myDate.getFullYear()-5;//起始年份
        var endYear=myDate.getFullYear()+10;//结束年份
        // var obj=document.getElementById('myYear')
        for (var i=startYear;i<=endYear;i++) {
          this.yearList.push(i);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 1%;
  }

  /deep/ .el-card__header {
    padding: 10px 20px;
  }

  .cardCont {
    margin-bottom: 15px;

    /deep/ .el-card__body {
      padding: 0;
    }
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);
      border-left: 2px solid #05AAFF;
      padding-left: 10px;

      span {
        color: #F56C6C;
      }
    }

    .orginLeft {
      border-left: 2px solid #FFA96A;
    }

    .headBtn {
      margin-left: 40px;
      font-size: 14px;

      .allChoose {
        padding: 6px 8px;
        color: #05AAFF;
        border: 1px solid #05AAFF;
        background-color: #fff;
        border-radius: 2px;
      }

      .export {
        padding: 6px 8px;
        border-radius: 2px;
      }

      .allDelete {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FF8585;
        background-color: #FF8585;
        border-radius: 2px;
      }

      .originBtn {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FD903C;
        background-color: #FD903C;
        border-radius: 2px;
      }
    }
  }

  .conditionCont {
    padding: 10px 20px;

    .conditionBox {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;

      span {
        font-size: 14px;
        color: #606266;
        margin-right: 10px;
        min-width: 70px;
      }

      .el-select {
        margin-right: 10px;
      }

      .el-date-editor {
        margin-right: 10px;
      }
    }
  }

  .star {
    color: #ff3d4c !important;
    position: absolute;
    left: -8px;
  }

  .dataHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(68, 68, 68, 0.14901961);
    padding: 0 20px;
    /*overflow: auto;*/

    &::-webkit-scrollbar { /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 2px;
    }

    &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
      border-radius: 50px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(5, 170, 255, 0.75);
    }

    &::-webkit-scrollbar-track { /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 50px;
      background: #f9f9f9;
    }

    .dataHeadBox {
      flex: 3;
      text-align: center;
      padding: 15px 0;
      font-weight: bold;
      /*min-width: 300px;*/

      &:first-child {
        flex: 1;
        min-width: 174px;
      }
    }
  }

  .conditionList {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .conditionBox {
      border: 1px solid #33B3EE;
      font-size: 12px;
      color: #33B3EE;
      padding: 5px;
      margin-right: 10px;
      display: flex;
    }
  }

  .conditionClear {
    border: 1px solid rgb(255, 0, 0);
    font-size: 12px;
    color: rgb(255, 0, 0);
    padding: 5px;
    cursor: pointer;
  }

  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }

  /deep/ .el-table--border th,
  /deep/ .el-table th {
    background: #2CB1F5 !important;
    color: #fff;
    font-weight: 400;
    border-right: 1px solid rgba(220, 223, 230, 0.21);
    padding: 7px 0;
  }

  /deep/ .el-table__row:nth-child(even) {
    background: rgb(235, 248, 255) !important;
    border: 1px solid rgba(0, 141, 214, 0.26666666666666666);
  }

  /deep/ .el-table--border td {
    border: none;
    box-sizing: border-box;
  }

  /deep/ .el-table--border td:first-child {
    border-right: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table--border td:last-child {
    border-left: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table--scrollable-x .el-table__body-wrapper{
    max-height: 50vh;
    overflow-y: auto;
  }

  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  .col_red {
    color: #FF6B6B !important;
  }

  .col_red:hover {
    opacity: 0.5;
  }

  .col_skyblue {
    color: #05AAFF !important;
  }

  .col_skyblue:hover {
    opacity: 0.5;
  }

  .colUpDown {
    color: #FD903C !important;
  }

  .colUpDown:hover {
    opacity: 0.5;
  }

  .projectTable{
    padding:10px;
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
    cursor: pointer;
    font-size:14px;
  }
</style>
