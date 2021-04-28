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


                <el-date-picker
                v-model="singnForm.searchDate"
                type="date"
                align="left"
                size="small"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                class="date-select"
                @change="selectDate"
                >
                </el-date-picker>

              </div>
            </el-col>
          </el-row>
          <el-row v-if="allowGetDeptList.twoAllow">
            <el-col>
              <div class="conditionBox" >
                <span>可选项目：</span>


                <div class="form-handle" v-if="allowGetDeptList.twoAllow">

                    <el-select class="select-input"
                            v-model="singnForm.deptIds"
                            size="small"
                            @change="selectCompanyHandle"
                            filterable
                            clearable multiple
                            placeholder="选择部门">
                    <el-option v-for="item in companyList"
                                :key="item.deptId"
                                :label="item.deptName"
                                :value="item.deptId"
                    />
                    </el-select>

                     <el-select @change="selectUserHandle"
                            size="small"
                            class="select-input" v-model="singnForm.userIds" filterable clearable multiple
                            placeholder="选择员工">
                    <el-option v-for="item in userList"
                                :key="item.userId"
                                :label="item.userName"
                                :value="item.userId"

                    />
                    </el-select>

                </div>




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
              <el-button type="primary" class="btn export" size="small" @click="showSalePlan">统计</el-button>
              <el-button type="primary" class="btn export" size="small" @click="handleExport">导出</el-button>
            </div>
          </div>
        </div>

        <div class="projectTable">
          <el-table :data="salePlan" border fit highlight-current-row ref="salePlan" @sort-change="topTableSort" :header-cell-class-name="handleTheadAddClass" class="table">
            <el-table-column label="用户名称" align="center" min-width="100" prop="userName" sortable="custom" >
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="部门名称" align="center" min-width="140"  >
              <template slot-scope="scope">
                <span>{{scope.row.depts}}</span>
              </template>
            </el-table-column>


            <el-table-column label="私海客户数" align="center" min-width="120" prop="privateCustomers" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.privateCustomers}}</span>
              </template>
            </el-table-column>
            <el-table-column label="30天内联系占比" align="center" min-width="160" prop="ratio_30" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.ratio_30}}</span>
              </template>
            </el-table-column>
            <el-table-column label="搜索选择日期" align="center" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.searchDate}}</span>
              </template>
            </el-table-column>

            <el-table-column label="今天联系数" align="center" min-width="120"  prop="nowadays" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.nowadays}}</span>
              </template>
            </el-table-column>

            <el-table-column label="昨天联系数" align="center" min-width="120"  prop="yesterday" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.yesterday}}</span>
              </template>
            </el-table-column>
            <el-table-column label="近7天联系数" align="center" min-width="120" prop="days_7" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.days_7}}</span>
              </template>
            </el-table-column>
            <el-table-column label="近30天联系数" align="center" min-width="140" prop="days_30" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.days_30}}</span>
              </template>
            </el-table-column>
          </el-table>


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
  import {querySignOrderStatistical,querySignOrderStatisticalExportForExcel} from '@/api/orderStatistics'
  import {queryAll} from '@/api/projectManage'
  import {getDepartmentTree} from '@/api/department.js'
  import {queryCompany} from '@/api/contractManage'
  import {queryUserComboInfo} from '@/api/customerCenter'

  import { getCompanyDeptTree,querySalePlanTable,exportSalePlanTable } from '@/api/sale_plan'

  export default {
    data(){
      return{
        btnFlag:0,
        singnForm:{
          page:0,
          pageSize:100000000,
          // paymentSituation:'',
        },
        total:0,
        projectList:[],
        deptmentList:[],
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
        listTotal: "",

        loading:false,
        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
        salePlan:[],

        //部门数据
        companyList: [],
        //员工数据
        userList: [],
        curThead: '',
      }
    },
    activated() {

      this.getCompanyDeptTrees();

      // this.getProjectList();
      // this.getCompanyList();
      // this.getDepartmentList();
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

      // 表格排序
      topTableSort({ column, prop, order }) {
        if (column) {
          if(column.label === '用户名称' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'userName';
          }
          if(column.label === '用户名称' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'userName';
          }

          if(column.label === '今天联系数' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'nowadays';
          }
          if(column.label === '今天联系数' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'nowadays';
          }

          if(column.label === '今天联系数' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'nowadays';
          }
          if(column.label === '今天联系数' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'nowadays';
          }


          if(column.label === '昨天联系数' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'yesterday';
          }
          if(column.label === '昨天联系数' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'yesterday';
          }


          if(column.label === '近7天联系数' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'days_7';
          }
          if(column.label === '近7天联系数' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'days_7';
          }

          if(column.label === '近30天联系数' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'days_30';
          }
          if(column.label === '近30天联系数' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'days_30';
          }

          if(column.label === '30天内联系占比' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'ratio_30';
          }
          if(column.label === '30天内联系占比' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'ratio_30';
          }

          if(column.label === '私海客户数' && order === 'descending'){
              this.singnForm.orderType = 'DESC';
              this.singnForm.orderField = 'privateCustomers';
          }
          if(column.label === '私海客户数' && order === 'ascending'){
            this.singnForm.orderType = 'ASC';
            this.singnForm.orderField = 'privateCustomers';
          }


          this.curThead = prop
          this.showSalePlan()
        }
      },

      handleTheadAddClass({row, column, rowIndex, columnIndex}){
        // console.log(column.property,"column==>",this.curThead,"this.curThead")
          if( column.property == this.curThead ){
            return 'active-thead'
          }
      },




      //获取统计列表
      showSalePlan(){
        // console.log(this.singnForm,"=====singnForm======>")

        if(this.singnForm.searchDate == '' || this.singnForm.searchDate == undefined){
          this.$message.warning('必选条件必须全选');
          return;
        }

        querySalePlanTable(this.singnForm).then(res=>{
          if(res.code == 200){

            this.salePlan=res.data.data
            this.total = res.data.total;
            // console.log( this.salePlan)
            this.salePlan.forEach(function (item) {
              let a="";
              if (item.depts.length>1) {
                  item.depts.forEach(function (itemIn) {
                  a = a+itemIn.deptName+','
                   });
              item.depts=a
              } else{  item.depts = item.depts[0].deptName }

              if (item.ratio_30>0) {
                item.ratio_30=item.ratio_30*100
                item.ratio_30=item.ratio_30.toFixed(2)
                // item.ratio_30=item.ratio_30*100+"%"
              } else{
                item.ratio_30=0
              }
              item.ratio_30=item.ratio_30+"%"
            });


          }
        })

      },


      //筛选栏-选择部门-操作
      selectCompanyHandle(val) {
        // console.log('=====selectCompanyHandle===== >')
        const arr = []
        if (val.length != 0) {
          this.companyList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'deptIds', `部门-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'deptIds')
          this.$delete(this.selectConditionsList, 'userIds')
          this.$delete(this.singnForm, 'userIds')
          this.userList = [];
        }

        this.getUserComboInfo(val);
        // this.handleFilter();
      },

      //筛选栏-选择员工-操作
      selectUserHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.userList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'userIds', `员工-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'userIds')
        }
        // this.handleFilter();
      },

      selectDate(val){
        // console.log(val)
        if (val) {
          this.$set(this.selectConditionsList, 'searchDate', `搜索日期-${val}`)
        } else {
          // console.log('=================>')
          this.$delete(this.selectConditionsList, 'searchDate')
          this.$delete(this.singnForm, 'searchDate')
        }


      },



      //筛选栏--获取企业列表
      getCompanyDeptTrees() {
        getCompanyDeptTree({
          'companyId': this.$store.getters.companyId

        }).then(res => {
          this.companyList = res.data.deptInfoTreeVos;
        })
      },

      //筛选栏--获取员工列表
      getUserComboInfo(deptIds) {
        //  console.log(deptIds,'=====getUserComboInfo=====>')
        let name = '业务员,业务主管';
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


        //筛选栏-筛选的多选，下拉，单选---操作
      handleFilter() {
        // this.selectConditionsList.page = 0
        if (this.allowGetList.twoAllow) {
          this.isCheckAll = false;
        } else {
          this.$message.warning('抱歉，您没有此权限')
        }
      },




      //列表---导出
      handleExport() {
        this.singnForm.page = 0;
        this.singnForm.pageSize = 100000000
        // let singnForm = JSON.parse(JSON.stringify(this.singnForm))
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });

        exportSalePlanTable(this.singnForm).then(res => {
          if (res.code === 200) {
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '销售统计表' + '.xlsx'
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


      //删除筛选调节
      deleteOneClick(item){
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.singnForm, item)

        if(item == 'signDate'){
          this.signDate = [];
          this.singnForm.signDateStart = '';
          this.singnForm.signDateEnd = '';
        }


        this.singnForm.page = 0;
        this.singnForm.pageSize = 100000000;
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
        this.singnForm.pageSize = 100000000;
        // this.showSignOrder();
      },
    }
  }
</script>



<style lang="less" scoped>
  .table {
     /deep/.cell{
       height: 35px;
       align-items: center;
       display: flex;
       text-align: center;
     }
      /deep/.descending{
        border-top-color: #fff ;
          /deep/.descending{
          border-top-color: #000 !important;
          }
          // border-top-color: red!important;
      }
     /deep/.ascending{
       border-bottom-color: #fff  ;
        /deep/.ascending{
        border-bottom-color: #000 !important;
        }
    }
    // /deep/.active-thead  .ascending{
    //   border-bottom-color: red;
    // }
    // /deep/.ascending{
    //   border-bottom-color: #fff  ;
    // }
    /deep/.descending{
      border-top-color: #fff ;
    }
  }


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
