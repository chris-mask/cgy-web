<template>
    <div class="app-container">
      <el-card class="box-card box-margin">
        <div slot="header" class="clearfix headerTop">
          <div class="headerLeft">
            <el-input size='small' class="searchInput" v-model="queryFrom.userName" placeholder="用户名称" @keyup.enter.native="goSearch" clearable></el-input>
            <el-input size='small' class="searchInput" v-model="queryFrom.mobileNumber" placeholder="联系电话" @keyup.enter.native="goSearch" clearable></el-input>
            <el-select size='small' v-model="queryFrom.level" placeholder="级别" @change="goSearch" style="margin-left: 10px;"  clearable  >
              <el-option label="初级" value="0"> </el-option>
              <el-option label="中级" value="1"> </el-option>
              <el-option label="高级" value="2"> </el-option>
            </el-select>
            <el-select size='small' v-model="queryFrom.education" placeholder="学历" @change="goSearch" style="margin-left: 10px;"  clearable  >
              <el-option label="小学" value="0"> </el-option>
              <el-option label="初中" value="1"> </el-option>
              <el-option label="中专" value="2"> </el-option>
              <el-option label="高中" value="3"> </el-option>
              <el-option label="大专" value="4"> </el-option>
              <el-option label="本科" value="5"> </el-option>
              <el-option label="硕士" value="6"> </el-option>
              <el-option label="博士" value="7"> </el-option>
            </el-select>
            <el-input size='small' class="searchInput" v-model="queryFrom.area" placeholder="地区" @keyup.enter.native="goSearch" clearable></el-input>
            <el-select size='small' v-model="queryFrom.isDeal" placeholder="是否已处理" @change="goSearch" style="margin-left: 10px;"  clearable  >
              <el-option v-for="item in isDeal" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>

            <el-date-picker
              size="small"
              style="margin-left: 20px;"
              v-model="dateTime"
              @change="handleDateFilter"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>

            <el-button size='small' style="margin-left: 20px;"  type="primary" icon="el-icon-search" @click="goSearch">搜索</el-button>
          </div>
          <div class="headerRig">
          </div>
        </div>
        <div class="materielTable">

          <el-table :data="messageList"   border fit highlight-current-row >
            <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
            <el-table-column align="center" min-width="80px" label="姓名" prop="userName">
              <template slot-scope="scope">
                <span>{{scope.row.userName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="60px" label="年龄"  prop="age">
              <template slot-scope="scope">
                <span >{{scope.row.age}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="60px" label="学历"  prop="userName">
              <template slot-scope="scope">
                <span>{{
                  scope.row.education == 0 ? '小学' : scope.row.education == 1 ? '初中'
                  : scope.row.education == 2 ? '中专'  : scope.row.education == 3 ? '高中'
                  : scope.row.education == 4 ? '大专'  : scope.row.education == 5 ? '本科'
                  : scope.row.education == 6 ? '硕士' : scope.row.education == 7 ? '博士' : ' - '
                  }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="60px" label="申报等级" prop="level">
              <template slot-scope="scope">
                <span>{{
                  scope.row.level == 0 ? '初级' : scope.row.level == 1 ? '中级'
                  : scope.row.level == 2 ? '高级'  : ' - '
                  }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="80px" label="电话号码" prop="mobileNumber">
              <template slot-scope="scope">
                <span>{{scope.row.mobileNumber}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="80px" label="地区" prop="area">
              <template slot-scope="scope">
                <span>{{scope.row.area}}</span>
              </template>
            </el-table-column>

             <el-table-column align="center" min-width="80px" label="咨询时间" prop="createTime">
              <template slot-scope="scope">
                <span>{{scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="60px" label="是否处理"  prop="isDeal">
              <template slot-scope="scope">
                <span>{{scope.row.isDeal == 0 ? '未处理' : '已处理'}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="80px" label="处理人"  prop="dealUserName">
              <template slot-scope="scope">
                <span>{{scope.row.dealUserName}}</span>
              </template>
            </el-table-column>

             <el-table-column align="center" min-width="140px" label="处理备注"  prop="dealRemarks">
              <template slot-scope="scope">
                <span>{{scope.row.dealRemarks}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="60px" label="处理">
              <template slot-scope="scope">
                 <span class="spanButton" @click="goEmpowerHandle(scope.row)">处理</span>
              </template>
            </el-table-column>

          </el-table>
          <div class="pagination-container">
            <div class="totalText">
              <span>总数：{{ total }}</span>
              <span>总页数:{{ Math.ceil(total / queryFrom.pageSize) || Math.ceil(total / 10) }}</span>
              <span>当前页：{{ queryFrom.page || 1 }}</span>
            </div>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[10,20,30,50]"
                           :page-size="queryFrom.pageSize"
                           layout="prev, pager, next, sizes, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </el-card>

      <el-dialog
        title="处理结果"
        :visible.sync="centerDialogVisible"
        width="500px"
        center>
            <el-select size='small' v-model="change.isDeal" placeholder="是否已处理" >
              <el-option
                v-for="item in isDeal"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input
              type="textarea"
              style="margin-top: 20px;"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="change.dealRemarks">
            </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeDialog">确 定</el-button>
        </span>
      </el-dialog>


    </div>
</template>

<script>
  import { queryLeaveMessage, handleLeaveMessage } from '@/api/leaveMessage'

  export default {
    data() {
      return {
        listLoading: false,
        queryFrom:{
          page: 0,
          pageSize: 20,
          sort: ""
        },
        currentPage: 1,
        messageList:[],
        total:0,
        centerDialogVisible: false,
        change:{},
        isDeal: [
          {label: '未处理', value: 0},
          {label: '已处理', value: 1},
        ],
        dateTime: '',

      }
    },
    activated() {
        this.getLeaveMessage();
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 10) {
          // return value.slice(0,10) + '...'
          return value.slice(0,10)
        }
        return value
      }
    },

    methods: {

      // 处理节点设置日期筛选
      handleDateFilter(date) {
        if(date != null){
          this.queryFrom.startDate = date[0] + ' 00:00:00' ;
          this.queryFrom.endDate = date[1] + ' 23:59:59';
        }else{
          this.queryFrom.startDate =  '';
          this.queryFrom.endDate =  '';
        }
        this.getLeaveMessage();
      },

      // 获取列表
      getLeaveMessage() {
        queryLeaveMessage(this.queryFrom).then(res => {
          if (res.code === 200) {
            this.messageList = res.data.data
            this.total = res.data.total
          }
        })
      },

      //搜索
      goSearch() {
        this.queryFrom.page = 0;
        this.getLeaveMessage();
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.queryFrom.pageSize = val
        this.getLeaveMessage()
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.queryFrom.page = (val - 1) * this.queryFrom.pageSize

        this.getLeaveMessage()
      },

      goEmpowerHandle(data) {
        this.centerDialogVisible=true;
        this.change={};
        this.change=data;
      },


      changeDialog(){
        handleLeaveMessage(this.change).then(res => {
          if (res.code == 200) {
            this.centerDialogVisible = false;
          }
        })

      }

    }
  }
</script>

<style lang="less" scoped>
  /deep/ .clearfix:after {
    display: none;


  }

  /deep/ .el-input {
    width: auto;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    display: flex;
    .searchInput {
      margin-right: 10px;
    }
  }

  .headerRig {
    .choose {
      margin-right: 22px;
    }
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

  .spanButton {
    color: #fff;
    padding: 10px 15px;
    border-radius: 10px;
    background: #05AAFF;
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

  // 分页样式
  /deep/ .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  /deep/ .el-pagination__total {
    flex: 1
  }

  .totalText {
    font-size: 14px;
    font-family: 'PingFang SC';
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
  }

  .totalText span {
    margin-right: 20px;
  }

  /deep/ .el-pagination.is-background .btn-next,
  /deep/ .el-pagination.is-background .btn-prev,
  /deep/ .el-pagination.is-background .el-pager li {
    background: none;
    border: #D5D5D5 1px solid;
    color: #8B8B8B;
    font-size: 12px;
    font-weight: normal;
  }

  /deep/ .el-pagination.is-background .el-pager li.active {
    background: #05AAFF;
    color: #fff;
    border: #05AAFF 1px solid;
  }

  /deep/ .el-card.is-always-shadow,
  /deep/ .el-card.is-hover-shadow:focus,
  /deep/ .el-card.is-hover-shadow:hover {
    box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;
  }

  /deep/ .el-table .sort-caret.ascending {
    border-bottom-color: #fff;
  }

  /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #409EFF !important;
  }

  /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: #409EFF !important;
  }

  /deep/ .el-table .sort-caret.descending {
    border-top-color: #fff;
  }

  /deep/ .el-table .cell {
    /*text-align: left;*/
  }

  /deep/ .el-table .el-table__expand-icon {
    display: none;
  }

  .btnList .payBtn:last-child {
    border-right: none;
    padding-right: 0px;
  }

  .payBtn {
    border-right: 1px solid #ccc;
    padding-right: 15px;
  }
</style>
