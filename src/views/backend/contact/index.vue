<template>
    <div class="app-container">
      <el-card class="box-card box-margin">
        <div slot="header" class="clearfix headerTop">
          <div class="headerLeft"> 

            <el-select size='small' v-model="queryFrom.alreadyContacted" placeholder="是否已联系"   clearable  >
              <el-option
                v-for="item in alreadyContacted"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
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

            <el-button size='small' type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="goSearch">搜索</el-button>
          </div>
          <div class="headerRig">
          </div>
        </div>
        <div class="materielTable">
 
          <el-table :data="contactList" v-loading="listLoading" border fit highlight-current-row >
            <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
            <!-- <el-table-column align="center" min-width="100px" label="客户联系ID"   prop="contactId">
              <template slot-scope="scope">
                <span >{{scope.row.contactId}}</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center" min-width="100px" label="联系方式"   prop="contactWay">
              <template slot-scope="scope">
                <span>{{scope.row.contactWay}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="100px" label="创建时间	"  prop="createTime">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="100px" label="客户留言"   prop="serverUserName">
              <template slot-scope="scope">
                <span>{{scope.row.leaveMessage}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="100px" label="是否已联系" prop="alreadyContacted">
              <template slot-scope="scope">
                <span>{{scope.row.alreadyContacted==0?'没联系':'已联系'}}</span> 
              </template>
            </el-table-column> 

            <el-table-column align="center" min-width="100px" label="是否已联系"  >
              <template slot-scope="scope">
                 <span class="spanButton" @click="goEmpowerHandle(scope.row)">已联系</span>
              </template>
            </el-table-column> 


          </el-table>
          <div class="pagination-container">
            <div class="totalText">
              <span>总数：{{ total }}</span>
              <span>总页数:{{ Math.ceil(total / pageSize) || Math.ceil(total / 10) }}</span>
              <span>当前页：{{ page || 1 }}</span>
            </div>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="page" :page-sizes="[10,20,30, 50]"
                           :page-size="pageSize"
                           layout="prev, pager, next, sizes, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </el-card>


      <el-dialog
        title="是否已联系"
        :visible.sync="centerDialogVisible"
        width="500px"
        center> 
            <span>
              请确定是否已联系当前客户({{phone}})
            </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeDialog">确 定</el-button>
        </span>
      </el-dialog>
      

    </div>
</template>
 
<script>
  import {queryContactList,updateContact} from '@/api/policy'

  export default {
    data() {
      return {
        enterpriseList: [],
        listLoading: false,

        alreadyContacted: [
          {label: '已联系', value: 1},
          {label: '没有联系', value: 0}, 
        ],

        queryFrom:{  
          page: 1,
          pageSize: 20,
          sort: ""
        },
        contactList:[],
        page:1,
        pageSize:20,  

        total:0,
        centerDialogVisible: false,
        change:{},
        dateTime: '',
        phone:''
      }
    },
    activated() { 
        this.getEnterList(); 
    },
    methods: {


 
      // 处理节点设置日期筛选
      handleDateFilter(date) {
        if(date != null){ 
          this.queryFrom.createTimeStart = date[0] ;
          this.queryFrom.createTimeEnd = date[1];  
        }else{ 
          this.queryFrom.createTimeEnd =  '';
          this.queryFrom.createTimeStart =  '';
        }
      },
      

      //获取列表
      getEnterList() {
        this.queryFrom.pageSize = this.pageSize;
        this.queryFrom.page = this.page;  
        queryContactList(this.queryFrom).then(res => {
          if (res.code == 200) {
            this.contactList = res.data.data
            this.total = res.data.total
            // console.log(this.contactList,'==this.contactList==>')
          }
        })
      },

      //搜索
      goSearch() {
        this.page = 1;
        this.getEnterList();
      },
 
      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.getEnterList()
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        this.getEnterList()
      },

      goEmpowerHandle(data) {
        this.centerDialogVisible=true;
        this.phone=data.contactWay
        // console.log(data,"==data=>")
        this.change={};
        this.change=data;
        // this.changeDialog(); 
      },

      changeDialog(){
        var params = { 
          contactId: this.change.contactId,
          alreadyContacted: 1,
          // serverUserName:this.change.serverUserName,
          // serverUserId:this.change.serverUserId,
          // createTime:this.change.createTime,
          // contactWay:this.change.contactWay,
           
        } 
        updateContact(params).then(res => {
          if (res.code == 200) {
            this.centerDialogVisible = false;
            this.getEnterList(); 
          }
        })



      },



    }
  }
</script>

<style lang="less" scoped>
  /deep/.cell{
    text-align: center !important;
    span{
      text-align: center !important;
    }
  }
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
