<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">已选条件:</span>
            <div class="conditionList">
              <div class="conditionBox" v-for="( value, key) in selectConditionsList" :key="key" >
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
                <span>必选：</span>

                <el-select size="small" filterable v-model="singnForm.deptId" placeholder="选择部门" clearable
                           @change="deptmentChange" v-if="allowGetDeptList.twoAllow">
                            <!-- multiple -->
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>

                <el-date-picker
                  v-model="entryDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="分配时间段"
                  end-placeholder="分配时间段"
                  value-format="yyyy-MM-dd"
                  @change="entryDateChange"
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




                <el-select filterable size="small"  v-model="singnForm.signUserId" placeholder="工程师"
                           clearable @change="userChange">
                           <!-- multiple -->
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName"

                    :value="item.userId">
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
            <span class="conditionChoose orginLeft">搜索到 {{total}} 条记录</span>
            <div class="headBtn">
              <el-button type="primary" class="btn export" size="small" @click="showSignOrder">统计</el-button>
              <el-button type="primary" class="btn export" size="small" @click="handleExport">导出</el-button>
            </div>
          </div>
        </div>
        <div class="projectTable">
          <el-table :data="signReport" border fit highlight-current-row ref="signReport">
            <el-table-column label="用户名称" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="部门名称" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.deptName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="立项数量" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.approvalCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="高企认定复审数" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.companyAffirmCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="完成提交数" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.endProcessCount}}</span>
              </template>
            </el-table-column>


            <el-table-column label="财务审计数" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.financeCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="进度在第一环节数" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.firstProcessCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="知识产权数" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.intellectualCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="其他重点项目数" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.otherProjectCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="立项数" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.projectApprovalCount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.projectName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{scope.row.signCount}}</span>
              </template>
            </el-table-column>
          </el-table>

          <!-- <div v-if="projectReport.length != 0">
            <div class="noMore" @click="getMore" v-if="total - projectReport.length > 0">
              加载更多
            </div>
            <div class="noMore" v-else>
              没有更多
            </div>
          </div> -->
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
  import {commonDict,commonDictOfRegion,downloadCrm } from '@/api/utils'
  import {queryReceiptStatisticsTable,exportReceiptStatisticsTable} from '@/api/statisticsReport'
  import {queryWorkOrderStatistical,queryWorkOrderStatisticalExportForExcel} from '@/api/orderStatistics'
  import {queryAll} from '@/api/projectManage'
  import {getDepartmentTree} from '@/api/department.js'
  import {queryCompany} from '@/api/contractManage'
  import {queryUserComboInfo} from '@/api/customerCenter'

  export default {
    data(){
      return{
        btnFlag:0,
        singnForm:{
          page:0,
          pageSize:20,
          // paymentSituation:'',
        },
        total:0,
        projectList:[],
        deptmentList:[],
        companyList:[],
        userList:[],
        selectConditionsList:{},
        signDate:[],
        entryDate:[],
        projectReport:[],
        provinceList:[],
        cityList:[],
        districtList:[],
        townList:[],
        level:3,
        parentId:0,

        projectForm:{
          page:0,
          pageSize:10000000,
          orderField:'sales',
          orderType: 'DESC'
        },

        loading:false,
        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
        signReport:[],

      }
    },
    activated() {

      this.getProjectList();
      this.getCompanyList();

      this.getDepartmentList();
      //获取统计列表
      // this.showSignOrder();
      // this.getPersonList('业务员,业务主管');
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


      //获取统计列表
      showSignOrder(){

        if(this.singnForm.deptId == '' || this.singnForm.deptId == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.entryDate == '' || this.entryDate == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        // this.singnForm.deptId = this.singnForm.deptId.join(",")
        // this.singnForm.signUserId = this.singnForm.signUserId.join(",")

        console.log( this.singnForm, "==singnForm=>")
        queryWorkOrderStatistical(this.singnForm).then(res=>{
          if(res.code == 200){
            console.log(res.data)
            this.signReport=res.data
          }
        })
      },

      //加载更多
      getMore(){
        this.singnForm.page = this.singnForm.page + 20;
        this.showSignOrder();
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

      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
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
         if(this.singnForm.deptId == '' || this.singnForm.deptId == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        if(this.entryDate == '' || this.entryDate == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });

        queryWorkOrderStatisticalExportForExcel(this.singnForm).then(res=>{
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
              const fileName = date + '-工单统计表' + '.xlsx'
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
      },

      // 项目年份
      projectYearChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'applyYear', '项目年份 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'applyYear')
        }

        this.singnForm.page = 0;
        // this.showSignOrder();
      },

      // 签约公司
      signCompanyChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signCompanyId', '签约公司 - ' + this.companyList.find(ele => ele.companyId === val).companyName)

          this.getPersonList('项目主管,项目员,专利主管,专利员,审计员');
        } else {
          this.$delete(this.selectConditionsList, 'signCompanyId')
        }

        this.singnForm.page = 0;
        // this.showSignOrder();
      },

      // 部门
      deptmentChange(val) {
        const arr = []


        if (val) {
          this.deptmentList.forEach(item => {
              if (item.deptId == val) {
                // arr.push(item.deptName)
                // const string = arr.join('，')
                this.$set(this.selectConditionsList, 'deptIds', `部门 - ${item.deptName}`)
                 console.log(this.selectConditionsList)
              }
          })
        } else {
          this.$delete(this.selectConditionsList, 'deptIds')
        }

        this.getPersonList('项目主管,项目员,专利主管,专利员,审计员', val)
        this.singnForm.page = 0;
        // this.showSignOrder();
      },

      // 工程师
      userChange(val) {
        const arr = []
        if (val.length != 0) {
          // this.userList.forEach(item => {
          //   val.forEach(val => {
          //     if (item.userId == val) {
          //       arr.push(item.userName)
          //       const string = arr.join('，')
          //       this.$set(this.selectConditionsList, 'signUserId', `签订人 - ${string}`)
          //     }
          //   })
          // })

          this.userList.forEach(item => {
              if (item.userId == val) {
                // arr.push(item.userName)
                // const string = arr.join('，')
                this.$set(this.selectConditionsList, 'signUserId', `工程师 - ${item.userName}`)
              }

          })
        } else {
          this.$delete(this.selectConditionsList, 'signUserId')
        }

        this.singnForm.page = 0;
        // this.showSignOrder();
      },

      // 签单时间
      signDateChange(val) {
        if (val) {
           this.$set(this.selectConditionsList, 'signDate', '签单时间 - ' + val[0] + '-' + val[1])
          this.singnForm.signDateStart = val[0];
          this.singnForm.signDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'signDate')
          this.singnForm.signDateStart = '';
          this.singnForm.signDateEnd = '';
        }

        this.singnForm.page = 0;
        // this.showSignOrder();
      },

      //录入时间
      entryDateChange(val) {

        if (val) {
          console.log(val)
          this.$set(this.selectConditionsList, 'entryDate', '录入时间 - ' + val[0] + '-' + val[1])
          this.singnForm.entryDateStart = val[0];
          this.singnForm.entryDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'entryDate')
          this.singnForm.entryDateStart = '';
          this.singnForm.entryDateEnd = '';
        }
        // this.$set(this.selectConditionsList, 'entryDate', `录入时间 - ${this.statisticsForm.entryDateStart}-${this.statisticsForm.entryDateEnd}`)
        this.singnForm.page = 0;
        // this.showSignOrder();
      },

      //删除筛选调节
      deleteOneClick(item){
                // console.log(item,'=======deleteOneClick=========>')
        this.$delete(this.selectConditionsList, item)
        if(item=='deptIds'){
          this.$delete(this.singnForm, 'deptId')
        }else{
          this.$delete(this.singnForm, item)
        }

        //  console.log(this.selectConditionsList,'=======selectConditionsList=========>',this.singnForm,'==this.singnForm==>')
        if(item == 'signDate'){
          this.signDate = [];
          this.singnForm.signDateStart = '';
          this.singnForm.signDateEnd = '';
        }
        if(item == 'entryDate'){
          this.entryDate = [];
          this.singnForm.entryDateStart = '';
          this.singnForm.entryDateEnd = '';
        }

        this.singnForm.page = 0;
        this.singnForm.pageSize = 20;
        // this.showSignOrder();
      },

      //清除所有条件
      deleteAllClick(){
        this.selectConditionsList = {}
        this.singnForm = {}
        this.signDate = [];
        this.entryDate = [];
        this.singnForm.signDateStart = '';
        this.singnForm.signDateEnd = '';
        this.singnForm.entryDateStart = '';
        this.singnForm.entryDateEnd = '';

        this.singnForm.page = 0;
        this.singnForm.pageSize = 20;
        // this.showSignOrder();
      },
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
