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
                <span class="star">*</span>
                <span>必选：</span>
                <el-select size="small" filterable v-model="statisticsForm.deptIdList" placeholder="业务部门" clearable multiple v-if="allowGetDeptList.twoAllow"
                           @change="deptmentChange">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="deadlineDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="录入时间开始"
                  end-placeholder="录入时间结束"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="deadlineDateChange"
                  class="date-select"
                >
                </el-date-picker>
                <el-button type="primary" size="small" @click="getProjectReport">统计</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选签订：</span>
                <el-select size="small" filterable v-model="statisticsForm.signCompanyId" placeholder="签约公司"
                           clearable @change="signCompanyChange">
                  <el-option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" v-model="statisticsForm.signUserId" placeholder="选择签订人" clearable @change="userChange">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-date-picker
                  v-model="signTimeDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="签订时间开始"
                  end-placeholder="签订时间结束"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="signTimeDateChange"
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
                <el-select v-model="statisticsForm.projectId" filterable remote
                           :remote-method="projectListMethod" v-loadMore="loadMore" :loading="loading"
                           :multiple-limit="10" size="small" placeholder="项目" clearable @change="projectChange">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                  </el-option>
                </el-select>
                <el-date-picker
                  clearable
                  @change="projectYearChange"
                  size="small"
                  v-model="statisticsForm.projectYear"
                  type="year"
                  value-format="yyyy"
                  placeholder="项目年份">
                </el-date-picker>
                <el-select filterable size="small" v-model="statisticsForm.areaLevel" placeholder="项目级别"
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
                <el-select size="small" v-model="statisticsForm.batchNo" placeholder="批次" clearable @change="bathChange">
                  <el-option
                    v-for="item in batchNoList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose orginLeft">搜索到 {{projectReport.length}} 条记录</span>
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
            <el-table-column label="地区" align="center" min-width="150">
              <template slot-scope="scope">
                <span>{{scope.row.area}}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.projectName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单价(元)" align="center">
              <template slot-scope="scope">
                <span>{{!scope.row.unitPrice ? 0 : scope.row.unitPrice == 0 ? scope.row.unitPrice : scope.row.unitPrice < 1 ? parseFloat((scope.row.unitPrice * 100).toPrecision(13)) + '%' : scope.row.unitPrice + '元'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系人" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.companyContacts}}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话" align="center" min-width="140">
              <template slot-scope="scope">
                <span>{{scope.row.companyPhone}}</span>
              </template>
            </el-table-column>
            <el-table-column label="签约公司" align="center" min-width="300">
              <template slot-scope="scope">
                <span>{{scope.row.signCompanyName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="业务员" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.salesMan}}</span>
              </template>
            </el-table-column>
            <el-table-column label="合同编号" align="center" min-width="220">
              <template slot-scope="scope">
                <span>{{scope.row.contractCode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="签订时间" align="center" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.signDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="录入时间" align="center" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="工程师" align="center" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.engineer}}</span>
              </template>
            </el-table-column>
            <el-table-column label="申报时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.theTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="最新进度" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.currentNode}}</span>
              </template>
            </el-table-column>
            <el-table-column label="系统提交时间" align="center" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.submitTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="纸质提交时间" align="center" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.paperDateEnd}}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否立项" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.hasApproval}}</span>
              </template>
            </el-table-column>
            <el-table-column label="收款情况" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.accountReceivable}}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否渠道" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.isChannel}}</span>
              </template>
            </el-table-column>
            <el-table-column label="业务费" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.channelFee}}</span>
              </template>
            </el-table-column>
            <el-table-column label="其他费用" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.otherFee}}</span>
              </template>
            </el-table-column>
            <el-table-column label="新老客户" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.newOrOld}}</span>
              </template>
            </el-table-column>
          </el-table>

<!--          <el-upload-->
<!--            :http-request="handleUpload"-->
<!--            :before-upload="beforeUpload"-->
<!--            class="image-uploader"-->
<!--            :file-list="fileList"-->
<!--            action=""-->
<!--          >-->
<!--            <el-button type="primary" class="btn export" size="small">上传</el-button>-->
<!--          </el-upload>-->
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
  import { uploadFilesOss } from '@/utils/uploadFilesOss'
  import { businessUpload } from '@/utils/uploadPathMethods'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import {queryCompany} from '@/api/contractManage'
  import {getDepartmentTree} from '@/api/department.js'
  import { commonDictOfRegion,downloadCrm } from '@/api/utils'
  import {queryUserComboInfo} from '@/api/customerCenter'
  import {queryOrderProjectStatistics,exportOrderProjectStatistics} from '@/api/statisticsReport'

  export default {
    name: 'projectReport',
    data() {
      return {
        statisticsForm: {},
        fileList: [],
        titleSeriesList: [],
        projectReport: [],
        btnFlag: 0,
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
        projectForm:{
          page:0,
          pageSize:20,
          orderField:'sales',
          orderType: 'DESC'
        },
        loading: false,
        selectConditionsList:{},
        projectList:[],
        companyList:[],
        deptmentList:[],
        parentId:0,
        level:3,
        provinceList:[],
        cityList:[],
        districtList:[],
        townList:[],
        userList:[],
        deadlineDate:'',
        signTimeDate:'',
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
        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
        baseAli: 'http://chengguoyun-java.oss-cn-shenzhen.aliyuncs.com/',
      }
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
    activated() {
      this.getDepartmentList();
      this.getCompanyList();
      this.getPersonList('业务主管,业务员');
      this.getProjectList();
      this.getRegionList();
      this.getTitleSeries();
    },
    methods: {
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
      },


      deptmentChange(val){
        const arr = []
        if (val.length != 0) {
          this.deptmentList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'deptIdList',  `业务部门 - ${string}`)
              }
            })
          })

        } else {
          this.$delete(this.selectConditionsList, 'deptIdList')
        }
      },

      deadlineDateChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'deadlineDate', '录入时间 - ' + val[0] + '-' + val[1])
          this.statisticsForm.createTimeStart = val[0] + ' ' + '00:00:00';
          this.statisticsForm.createTimeEnd = val[1] + ' ' + '23:59:59';
        } else {
          this.$delete(this.selectConditionsList, 'deadlineDate')
          this.statisticsForm.createTimeStart = '';
          this.statisticsForm.createTimeEnd = '';
        }
      },

      signCompanyChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'signCompanyId', '签约公司 - ' + this.companyList.find(ele => ele.companyId === val).companyName)
        } else {
          this.$delete(this.selectConditionsList, 'signCompanyId')
        }
      },

      userChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'signUserId', '签订人 - ' + this.userList.find(ele => ele.userId === val).userName)
        } else {
          this.$delete(this.selectConditionsList, 'signUserId')
        }
      },

      signTimeDateChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'signTimeDate', '签订时间 - ' + val[0] + '-' + val[1])
          this.statisticsForm.signDateStart = val[0] + ' ' + '00:00:00';
          this.statisticsForm.signDateEnd = val[1] + ' ' + '23:59:59';
        } else {
          this.$delete(this.selectConditionsList, 'signTimeDate')
          this.statisticsForm.signDateStart = '';
          this.statisticsForm.signDateEnd = '';
        }
      },

      projectYearChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'projectYear', '项目年份 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'projectYear')
        }
      },

      areaLevelChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'areaLevel', '项目级别 - ' + this.projectLevelList.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'areaLevel')
        }
      },

      projectChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'projectId', '项目 - ' + this.projectList.find(ele => ele.projectId === val).projectName)
        } else {
          this.$delete(this.selectConditionsList, 'projectId')
          this.projectForm.page = 0;
          this.projectForm.projectName = '';
          this.getProjectList();
        }
      },

      bathChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'batchNo', '批次 - ' + this.batchNoList.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'batchNo')
        }
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
      },
      changeTown(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'townId', '镇街 - ' + this.townList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'townId')
        }
      },

      //删除筛选调节
      deleteOneClick(item){
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.statisticsForm, item)
        if(item == 'deadlineDate'){
          this.deadlineDate = '';
        }
        if(item == 'signTimeDate'){
          this.signTimeDate = '';
        }
      },

      //清除所有条件
      deleteAllClick(){
        this.selectConditionsList = {}
        this.statisticsForm = {}
        this.deadlineDate = '';
        this.signTimeDate = '';
      },

      // 获取左侧公司部门列表
      getDepartmentList() {
        getDepartmentTree({}).then(res => {
          if(res.code == 200){
            this.deptmentList = res.data.deptInfoTreeVos;
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //获取签约公司
      getCompanyList(){
        queryCompany({}).then(res => {
          if (res.code == 200) {
            this.companyList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name,deptIds){
        let formData = new FormData;
        formData.append('roleNameList',name)
        if(deptIds != undefined){
          formData.append('deptIdList',deptIds)
        }
        queryUserComboInfo(formData).then(res=>{
          if(res.code == 200){
            this.userList = res.data;
          }else{
            this.$message.warning(res.message)
          }
        })
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

      //获取统计列表
      getProjectReport(){
        if(this.allowGetDeptList.twoAllow){
          if(this.statisticsForm.deptIdList == '' || this.statisticsForm.deptIdList == undefined){
            this.$message.warning('必选条件必须全选');
            return;
          }
        }
        if(this.statisticsForm.createTimeStart == '' || this.statisticsForm.createTimeStart == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.statisticsForm.createTimeEnd == '' || this.statisticsForm.createTimeEnd == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        queryOrderProjectStatistics(this.statisticsForm).then(res=>{
          if(res.code == 200){
            this.projectReport = res.data
          }
        })
      },

      //导出
      handleExport(){
        if(this.statisticsForm.deptIdList == '' || this.statisticsForm.deptIdList == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.statisticsForm.createTimeStart == '' || this.statisticsForm.createTimeStart == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.statisticsForm.createTimeEnd == '' || this.statisticsForm.createTimeEnd == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }

        exportOrderProjectStatistics(this.statisticsForm).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-项目进度跟踪报表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              this.$message.success('导出成功！')
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      // handleUpload(option){
      //   // 调用 ali-oss 中的方法
      //   let fileName = option.file.name.split('.');
      //   let filePath = businessUpload('至秦大公司',fileName[0]) + '.' + fileName[1]
      //   uploadFilesOss(filePath, option.file, option).then(res => {
      //     console.log('111', res)
      //   })
      // },
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
</style>
