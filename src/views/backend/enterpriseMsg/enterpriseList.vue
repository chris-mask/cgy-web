<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <div class="headerLeft">
          <el-input size='small' class="searchInput" v-model="companyName" placeholder="企业名称"
                    @keyup.enter.native="goSearch" clearable></el-input>
          <el-input size='small' class="searchInput" v-model="companyAddress" placeholder="地址"
                    @keyup.enter.native="goSearch" clearable></el-input>
          <el-input size='small' class="searchInput" v-model="companyLeader" placeholder="法人"
                    @keyup.enter.native="goSearch" clearable></el-input>
          <el-input size='small' class="searchInput" v-model="companyContacts" placeholder="联系人"
                    @keyup.enter.native="goSearch" clearable></el-input>
          <el-checkbox size="small" class="searchInput" v-model="companyType" @change="goSearch">内部企业</el-checkbox>
          <el-button size='small' type="primary" icon="el-icon-search" @click="goSearch">搜索</el-button>
        </div>
        <div class="headerRig">
          <!--          <el-button type="primary">threeAllow</el-button>-->
        </div>
      </div>
      <div class="materielTable">
        <el-table :data="enterpriseList" v-loading="listLoading" border fit highlight-current-row
                  @sort-change="handleSortChange">
          <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
          <el-table-column align="center" min-width="300px" label="企业名称" sortable="custom" prop="companyName">
            <template slot-scope="scope">
              <span class="spanButton" @click="goEnterDetail(scope.row)">{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="法人代表" sortable="custom" prop="companyLeader">
            <template slot-scope="scope">
              <span>{{scope.row.companyLeader}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="注册资本" sortable="custom" prop="registerMoney">
            <template slot-scope="scope">
              <span>{{scope.row.registerMoney ? scope.row.registerMoney : 0}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160px" label="信用代码" sortable="custom" prop="companyCode">
            <template slot-scope="scope">
              <span>{{scope.row.companyCode}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="联系人" sortable="custom" prop="companyContacts">
            <template slot-scope="scope">
              <span>{{scope.row.companyContacts}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="地址" sortable="custom" prop="companyAddress">
            <template slot-scope="scope">
              <span>{{scope.row.companyAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="授权截止" sortable="custom" prop="permissionToTime">
            <template slot-scope="scope">
              <span>{{scope.row.permissionToTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="授权状态" sortable="custom" prop="permissionState">
            <template slot-scope="scope">
              <!--              <span>{{scope.row.permissionState}}</span>-->
              <span class="spanButton" @click="goEmpowerHandle(scope.row)">授权</span>
            </template>
          </el-table-column>
          <!--          <el-table-column align="center" min-width="100px" label="备注" sortable="custom" prop="companyDesc">-->
          <!--            <template slot-scope="scope">-->
          <!--              <span>{{scope.row.companyDesc}}</span>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column align="center" label="操作" width="200px" class-name="small-padding fixed-width">-->
          <!--            <template slot-scope="scope">-->
          <!--              <div class="btnList">-->
          <!--                <span class="spanButton col_skyblue payBtn" v-if="allowPay.twoAllow" @click="goPay(scope.row)">支付</span>-->
          <!--                &lt;!&ndash;              <span class="spanButton col_skyblue" v-if="allowStop.twoAllow">停用</span>&ndash;&gt;-->
          <!--                &lt;!&ndash;              <span class="shu" v-if="allowStop.twoAllow">|</span>&ndash;&gt;-->
          <!--                &lt;!&ndash;              <el-popconfirm&ndash;&gt;-->
          <!--                &lt;!&ndash;                v-if="allowDelete.twoAllow"&ndash;&gt;-->
          <!--                &lt;!&ndash;                confirmButtonText='好的'&ndash;&gt;-->
          <!--                &lt;!&ndash;                cancelButtonText='取消'&ndash;&gt;-->
          <!--                &lt;!&ndash;                icon="el-icon-info"&ndash;&gt;-->
          <!--                &lt;!&ndash;                iconColor="red"&ndash;&gt;-->
          <!--                &lt;!&ndash;                title="是否确定删除？"&ndash;&gt;-->
          <!--                &lt;!&ndash;                @onConfirm="deletePrivileges(scope.row)"&ndash;&gt;-->
          <!--                &lt;!&ndash;              >&ndash;&gt;-->
          <!--                &lt;!&ndash;                <span class="spanButton col_red" slot="reference">删除</span>&ndash;&gt;-->
          <!--                &lt;!&ndash;              </el-popconfirm>&ndash;&gt;-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
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
  </div>
</template>

<script>
  import {getCompanyList} from '@/api/enterpriseMsg'

  export default {
    data() {
      return {
        enterpriseList: [],
        listLoading: false,
        companyAddress: '',
        companyContacts: '',
        companyLeader: '',
        companyName: '',
        companyType: '',
        page: 1,
        pageSize: 10,
        total: 10,
        sortFieldName: '',
        sortType: '',
        allowStop: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:COMAPNY:LISTMENU', 'SYSTEM:COMAPNY:STOP'),
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:COMAPNY:LISTMENU', 'SYSTEM:COMPANY:DELETE'),
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:COMAPNY:LISTMENU', 'SYSTEM:COMPANY:.LIST'),
        allowPay: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:COMAPNY:LISTMENU', 'SYSTEM:COMPANY:PAYMENT:PAY'),
      }
    },
    activated() {
      if (this.allowGetList.twoAllow) {
        this.getEnterList();
      }
    },
    methods: {
      //获取列表
      getEnterList() {
        var params = {
          companyAddress: this.companyAddress,
          companyContacts: this.companyContacts,
          companyLeader: this.companyLeader,
          companyName: this.companyName,
          page: this.page,
          pageSize: this.pageSize,
          sortFieldName: this.sortFieldName,
          sortType: this.sortType,
        };
        if(this.companyType){
          params.companyType = 1
        }
        getCompanyList(params).then(res => {
          if (res.code == 200) {
            res.data.data.forEach(item => {
              if (item.registerMoney) {
                if (item.registerMoney > 10000) {
                  item.registerMoney = item.registerMoney / 10000 + '万元'
                } else {
                  item.registerMoney = item.registerMoney + '元'
                }
              }
            })
            this.enterpriseList = JSON.parse(JSON.stringify(res.data.data));
            this.total = Number(res.data.total);
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //搜索
      goSearch() {
        this.page = 1;
        this.getEnterList();
      },

      //调整到企业详情
      goEnterDetail(row) {
        this.$router.push({
          path: '/backend/enterpriseDetail',
          query: {
            companyId: row.companyId
          }
        })
      },

      //跳转到支付页面
      goPay(row) {
        this.$router.push({
          path: '/backend/enterprisePay',
          query: {
            companyId: row.companyId,
            companyName: row.companyName,
          }
        })
      },

      // 排序
      handleSortChange(column) {
        this.sortFieldName = column.prop;
        if (column.order === 'ascending') {
          this.sortType = 'ASC'
        } else if (column.order === 'descending') {
          this.sortType = 'DESC'
        } else {
          this.sortType = '';
          this.sortFieldName = ''
        }
        this.getEnterList()
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
        this.$router.push({
          path: '/backend/enterpriseEmpower',
          query: {
            id:data.companyId,
            companyName:data.companyName
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
