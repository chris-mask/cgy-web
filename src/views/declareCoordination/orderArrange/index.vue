<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">已选条件:</span>
            <div class="conditionList">
              <div class="conditionBox" v-for="(value, key) in selectConditionsList">
                {{value}}<img class="hoverCursor" @click="deleteOneClick(key)" src="../../icons/enterprise/close_con.png"/>
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
                <el-select v-model="censusForm.projectIdList" filterable multiple remote :remote-method="projectListMethod" v-loadMore="loadMore" :loading="loading" :multiple-limit="10" size="small" placeholder="项目" clearable @change="projectChange">
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
                  v-model="censusForm.applyYear"
                  type="year"
                  value-format="yyyy"
                  placeholder="项目年度">
                </el-date-picker>
                <el-select size="small" v-model="censusForm.roleFlag" placeholder="统计角色" clearable @change="statRoleChange">
                  <el-option
                    v-for="item in statRoles"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" size="small" @click="getStatisticsList">统计</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选：</span>
                <el-select size="small" filterable multiple v-model="censusForm.signCompanyIdList" placeholder="签约公司" clearable @change="signCompanyChange">
                  <el-option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId">
                  </el-option>
                </el-select>
                <el-select size="small" filterable v-model="censusForm.deptIdList" placeholder="业务部门" clearable multiple @change="deptmentChange" v-if="allowGetDeptList.twoAllow">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select filterable multiple size="small" v-model="censusForm.applyLevelList" placeholder="项目级别" clearable @change="areaLevelChange">
                  <el-option
                    v-for="item in projectLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select filterable multiple size="small" v-model="censusForm.titleSeriesList" placeholder="职称系列" clearable @change="changeTitleSeries">
                  <el-option v-for="item in titleSeriesList" :label="item.dictName" :value="item.dictId" :key="item.dictId"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选：</span>
                <el-select size="small" v-model="censusForm.provinceId" placeholder="省份" clearable @change="changeProvince">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="censusForm.cityId" placeholder="城市" clearable @change="changeCity">
                  <el-option
                    v-for="item in cityList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="censusForm.districtId" placeholder="县区" clearable @change="changeDistrict">
                  <el-option
                    v-for="item in districtList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="censusForm.townId" placeholder="镇街" clearable @change="changeTown">
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
            <span class="conditionChoose orginLeft">搜索到 {{censusList.length}} 条记录</span>
            <div class="headBtn">
              <el-button type="primary" class="btn export" size="small" @click="handleExport">导出</el-button>
            </div>
          </div>
        </div>
        <div class="dataContent" v-if="censusList.length > 0">
          <div class="dataHead">
            <div class="dataHeadBox">{{censusForm.roleFlag == 1 ? '工程师' : '审计员'}}</div>
            <div class="dataHeadBox" v-for="item in censusHead">{{item.projectName}}</div>
<!--            <div class="dataHeadBox">合计</div>-->
          </div>
          <div class="dataList">
            <div class="dataBox" v-for="(item,index) in censusList">
              <div class="firDta">
                <span class="listNum">{{index+1}}</span>
                <div class="dataName">{{item.personnelName}}</div>
              </div>
              <div class="statistics" v-for="list in item.statisticsList">
                <div class="statisList">
                  <div class="statBox" v-if="list.oneBatchMap != ''">
                    <span class="rightIcon"></span>
                    <span>第一批安排：{{list.oneBatchMap.arrangeCount}}</span>
                    <span>第一批完成：{{list.oneBatchMap.completeCount}}</span>
                  </div>
                  <div class="statBox" v-if="list.oneBatchMap != ''">
                    <span class="rightIcon"></span>
                    <span>第二批安排：{{list.towBatchMap.arrangeCount}}</span>
                    <span>第二批完成：{{list.towBatchMap.completeCount}}</span>
                  </div>
                  <div class="statBox" v-if="list.oneBatchMap != ''">
                    <span class="rightIcon"></span>
                    <span>第三批安排：{{list.threeBatchMap.arrangeCount}}</span>
                    <span>第三批完成：{{list.threeBatchMap.completeCount}}</span>
                  </div>
                  <div class="statBox" v-if="list.oneBatchMap != ''">
                    <span class="rightIcon"></span>
                    <span>第四批安排：{{list.fourBatchMap.arrangeCount}}</span>
                    <span>第四批完成：{{list.fourBatchMap.completeCount}}</span>
                  </div>
                  <div class="statBox" v-if="list.oneBatchMap != ''">
                    <span class="rightIcon"></span>
                    <span>第五批安排：{{list.fiveBatchMap.arrangeCount}}</span>
                    <span>第五批完成：{{list.fiveBatchMap.completeCount}}</span>
                  </div>
                  <div class="statBox" v-if="list.oneBatchMap != ''">
                    <span class="rightIcon"></span>
                    <span>没有批次安排：{{list.notBatchMap.arrangeCount}}</span>
                    <span>没有批次完成：{{list.notBatchMap.completeCount}}</span>
                  </div>
                  <div class="statBox" v-if="list.oneBatchMap == ''">
                    <span class="rightIcon"></span>
                    <span>安排：{{list.arrangeCount}}</span>
                    <span>完成：{{list.completeCount}}</span>
                  </div>
                  <div class="statBox">
                    <span class="rightIcon"></span>
                    <span>小计</span>
                    <span>安排：{{list.subtotalMap.arrangeCount}}</span>
                    <span>完成：{{list.subtotalMap.completeCount}}</span>
                  </div>
                </div>
              </div>
<!--              <div class="statistics">-->
<!--                <div class="statisList">-->
<!--                  <div class="statBox">-->
<!--                    <span class="rightIcon"></span>-->
<!--                    <span>安排：0</span>-->
<!--                    <span>完成：0</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
        </div>

      </el-card>
    </div>

    <!--置顶-->
    <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../../icons/enterprise/back_top.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import {queryCompany} from '@/api/contractManage'
  import {getDepartmentTree} from '@/api/department.js'
  import { commonDictOfRegion,downloadCrm } from '@/api/utils'
  import {queryOrderStatistics,exportOrderStatistics} from '@/api/orderArrange'

  export default {
    data(){
      return{
        btnFlag: 0,
        projectLevelList: [
          { 'label': '国家级', 'value': 1 },
          { 'label': '省级', 'value': 2 },
          { 'label': '市级', 'value': 3 },
          { 'label': '区县级', 'value': 4 },
          { 'label': '镇街级', 'value': 5 }
        ],
        titleSeriesList: [],
        projectForm:{
          page:0,
          pageSize:20,
          orderField:'sales',
          orderType: 'DESC'
        },
        loading: false,
        selectConditionsList:{},
        projectList:[],
        statRoles:[
          {label:'工程师',value:1},
          {label:'审计员',value:2}
        ],
        companyList:[],
        deptmentList:[],
        parentId:0,
        level:3,
        provinceList:[],
        cityList:[],
        districtList:[],
        townList:[],
        censusForm:{
          // page:0,
          // pageSize:20
        },
        censusList:[],
        censusHead:[],

        allowGetList: this.authorityControl('SYSTEM:STATISTICS:REPORT','SYSTEM:DECLARE:ORDER:COUNT','SYSTEM:DECLARE:ORDER:LIST'),//查询订单列表
        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
      }
    },
    directives: {
      loadMore: {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
          SELECTWRAP_DOM.addEventListener('scroll', function () {

            const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
            if (CONDITION) {
              binding.value()
            }
          })
        }
      }
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    activated() {
      this.getProjectList()
      this.getCompanyList()
      this.getRegionList()
      this.getDepartmentList()
      this.getTitleSeries()
      window.addEventListener('scroll', this.scrollToTop);
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

      //获取订单安排统计列表
      getStatisticsList(){
        if(this.censusForm.projectIdList == '' || this.censusForm.projectIdList == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.censusForm.applyYear == '' || this.censusForm.applyYear == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.censusForm.roleFlag == '' || this.censusForm.roleFlag == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        queryOrderStatistics(this.censusForm).then(res=>{
          if(res.code == 200){
            this.censusList = res.data.resultPersonnelList
            this.censusList.forEach(item=>{
              item.statisticsList.forEach(list=>{
                if(Array.isArray(list.oneBatchMap) == true){
                  this.$set(list, 'oneBatchMap', '')
                }
              })
            })

            this.censusHead = res.data.resultPersonnelList[0].statisticsList
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

      // 加载更多
      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      // 选择项目
      projectChange(val){
        const arr = []
        if (val.length != 0) {
          this.projectList.forEach(item => {
            val.forEach(val => {
              if (item.projectId == val) {
                arr.push(item.projectName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'projectIdList',  `项目 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'projectIdList')
        }

        // if (val) {
        //   this.$set(this.selectConditionsList, 'projectId', '项目 - ' + this.projectList.find(ele => ele.projectId === val).projectName)
        // } else {
        //   this.$delete(this.selectConditionsList, 'projectId')
        // }
      },

      // 项目年度
      projectYearChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'applyYear', '项目年度 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'applyYear')
        }

      },

      // 统计角色
      statRoleChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'roleFlag', '统计角色 - ' + this.statRoles.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'roleFlag')
        }
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

      //签约公司
      signCompanyChange(val){
        const arr = [];
        if (val.length != 0) {
          this.companyList.forEach(item => {
            val.forEach(val => {
              if (item.companyId == val) {
                arr.push(item.companyName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'signCompanyIdList', '签约公司 - ' + string);
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'signCompanyIdList')
        }

      },

      // 业务部门
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

      // 项目级别
      areaLevelChange(val){
        const arr = []
        if (val.length != 0) {
          this.projectLevelList.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'applyLevelList',  `项目级别 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'applyLevelList')
        }
        // if (val) {
        //   this.$set(this.selectConditionsList, 'areaLevel', '项目级别 - ' + this.projectLevelList.find(ele => ele.value === val).label)
        // } else {
        //   this.$delete(this.selectConditionsList, 'areaLevel')
        // }
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

      // 省份
      changeProvince(val) {
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
      // 城市
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
      //区县
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
      // 镇街
      changeTown(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'townId', '镇街 - ' + this.townList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'townId')
        }
      },

      //删除筛选调节
      deleteOneClick(item){
        this.orderList = []
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.censusForm, item)
      },

      //清除所有条件
      deleteAllClick(){
        this.selectConditionsList = {}
        this.censusForm = {}
      },

      //导出
      handleExport(){
        if(this.censusForm.projectIdList == '' || this.censusForm.projectIdList == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.censusForm.applyYear == '' || this.censusForm.applyYear == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.censusForm.roleFlag == '' || this.censusForm.roleFlag == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportOrderStatistics(this.censusForm).then(res=>{
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
              const fileName = date + '-订单统计列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close();
              this.$message.success('导出成功！')
            })
          }else{
            this.$message.warning(res.message)
          }
        })
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

    .orginLeft{
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

      .export{
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

      .originBtn{
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FD903C;
        background-color: #FD903C;
        border-radius: 2px;
      }
    }
  }

  .conditionCont{
    padding:10px 20px;
    .conditionBox{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;
      span{
        font-size: 14px;
        color: #606266;
        margin-right: 10px;
      }
      .el-select{
        margin-right: 10px;
      }
      .el-date-editor{
        margin-right: 10px;
      }
    }
  }

  .star{
    color: #ff3d4c !important;
    position: absolute;
    left: -8px;
  }

  .dataHead{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(68, 68, 68, 0.14901961);
    padding:0 20px;
    /*overflow: auto;*/
    &::-webkit-scrollbar {/*滚动条整体样式*/
      width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 2px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 50px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(5, 170, 255, 0.75);
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 50px;
      background: #f9f9f9;
    }
    .dataHeadBox{
      flex: 3;
      text-align: center;
      padding: 15px 0;
      font-weight: bold;
      /*min-width: 300px;*/
      &:first-child{
        flex:1;
        min-width: 174px;
      }
    }
  }

  .dataList{
    .dataBox{
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 2px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 50px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(5, 170, 255, 0.75);
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 50px;
        background: #f9f9f9;
      }
      /*overflow: auto;*/
      display: flex;
      padding:0 20px;
      /*align-items: center;*/
      padding-bottom:20px;
      padding-top: 20px;
      .firDta{
        display: flex;
        align-items: center;
        flex: 1;
      }
      .listNum{
        width: 20px;
        height: 20px;
        background: #69CCFF;
        color:#fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        margin-right: 54px;
        font-size:12px;
      }
      .dataName{
        width: 84px;
        min-width: 84px;
        height: 84px;
        background: #9bb5ff;
        color: #fff;
        font-size: 18px;
        border-radius: 4px;
        text-align: center;
        line-height: 84px;
        margin-right: 16px;
      }
      .statistics{
        min-height: 136px;
        background: #EFFAFF;
        padding: 15px;
        flex:3;
        /*min-width: 300px;*/
        .statisList{
          .statBox{
            font-size:14px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            flex-wrap: wrap;
            .rightIcon{
              width: 7px;
              height: 7px;
              background: #05AAFF;
              margin-right: 6px;
              display: inline-block;
            }
            span{
              margin-right: 28px;
            }
          }
        }
      }
      .statistics:nth-child(odd){
        background: #F1F4FF;
      }
      .statistics:nth-child(even){
        background: #EFFAFF;
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

  /*/deep/ .el-date-editor {*/
  /*  .el-input__inner {*/
  /*    padding: 0 30px;*/
  /*  }*/
  /*}*/
</style>
