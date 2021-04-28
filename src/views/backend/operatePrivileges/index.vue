<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <div class="headerLeft">
          <el-input size='small' class="searchInput" v-model="permissionName" placeholder="操作权限管理" @keyup.enter.native="goSearch" clearable></el-input>
          <el-button size='small' type="primary" icon="el-icon-search" @click="goSearch">搜索</el-button>
        </div>
        <div class="headerRig">
          <el-button size='small' type="primary" @click="goAddPrivileges" v-if="allowAdd.twoAllow">新建权限</el-button>
        </div>
      </div>
      <div class="materielTable">
        <el-table :data="privilegesList" v-loading="listLoading" border fit highlight-current-row row-key="permissionId"
                  default-expand-all :tree-props="{children: 'children'}" @sort-change="handleSortChange">
          <el-table-column label="序号" align="center" type="index" width="100">
            <!--            <template slot-scope="scope">-->
            <!--              <span>{{scope.row.idx}}</span>-->
            <!--            </template>-->
          </el-table-column>
          <el-table-column align="center" min-width="200px" label="权限名称" sortable="custom" prop="permissionName">
            <template slot-scope="scope">
              <span class="projectName" v-if="!scope.row.permission">
               <span v-if="!scope.row.children" @click="addChildren(scope.row)" class="showOrHiden">+</span>
               <span v-else @click="deleteChildren(scope.row)" class="showOrHiden">-</span>
               <span>{{scope.row.permissionName}}</span>
              </span>
              <span class="productName" v-else>{{scope.row.permissionName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="200px" label="对象标识符" sortable="custom" prop="permissionCode">
            <template slot-scope="scope">
              <span>{{scope.row.permissionCode}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="类型" sortable="custom" prop="permissionType">
            <template slot-scope="scope">
              <span>{{scope.row.permissionType == 1 ? '菜单' : '按钮'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="请求方法" sortable="custom" prop="requestMethod">
            <template slot-scope="scope">
              <span>{{scope.row.requestMethod == 1 ? 'GET' : scope.row.requestMethod == 2 ? 'POST' : scope.row.requestMethod == 3 ? 'DELETE' : scope.row.requestMethod == 4 ? 'PUT' : '无'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="180px" label="请求URL" sortable="custom" prop="requestUrl">
            <template slot-scope="scope">
              <span>{{scope.row.requestUrl}}</span>
            </template>
          </el-table-column>
<!--          <el-table-column align="center" min-width="140px" label="路由URL" sortable="custom" prop="webUrl">-->
<!--            <template slot-scope="scope">-->
<!--              <span>{{scope.row.webUrl}}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column align="center" min-width="100px" label="请求目标" sortable="custom" prop="requestTarget">
            <template slot-scope="scope">
              <span>{{scope.row.requestTarget}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="140px" label="备注" sortable="custom" prop="permissionDesc">
            <template slot-scope="scope">
              <span v-html="scope.row.permissionDesc">{{scope.row.permissionDesc}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="330px" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <span class="spanButton col_skyblue" v-if="scope.row.parentId = '0' && allowAddSon.threeAllow" @click="goAddSonPri(scope.row.permissionId,scope.row.parentIds,scope.row.levelNum)">添加子权限</span>
              <span class="shu" v-if="scope.row.parentId = '0' && allowAddSon.threeAllow">|</span>
              <span class="spanButton col_skyblue" v-if="allowUpdate.twoAllow" @click="goEditPrivileges(scope.row.permissionId)">编辑</span>
              <span class="shu" v-if="allowUpdate.twoAllow">|</span>
              <el-popconfirm
                v-if="allowDelete.twoAllow"
                confirmButtonText='好的'
                cancelButtonText='取消'
                icon="el-icon-info"
                iconColor="red"
                title="是否确定删除？"
                @onConfirm="deletePrivileges(scope.row)"
              >
                <span class="spanButton col_red" slot="reference">删除</span>
              </el-popconfirm>
              <span class="shu" v-if="allowDelete.twoAllow">|</span>
              <span class="spanButton colUpDown" v-if="allowUpDown.twoAllow" @click="dataUpDown(scope.row,1)">上升</span>
              <span class="shu" v-if="allowUpDown.twoAllow">|</span>
              <span class="spanButton colUpDown" v-if="allowUpDown.twoAllow" @click="dataUpDown(scope.row,2)">下降</span>
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
                         :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="pageSize"
                         layout="prev, pager, next, sizes, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getPrivilegesList, deletePermission, goUpOrDown} from '@/api/operatePrivileges'


  export default {
    data() {
      return {
        permissionName: '',
        total: 0,
        page: 1,
        pageSize: 10,
        privilegesList: [],
        listLoading: false,
        sortFieldName: '', // 排序字段
        sortType: '', // 排序方式：DESC（降序），ASC（降序）或者desc，asc
        parentId: 0,
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:PERMISSION:MANAGE','SYSTEM:PERMISSION:LIST'),
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:PERMISSION:MANAGE','SYSTEM:PERMISSION:INSTER'),
        allowAddSon: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:PERMISSION:MANAGE','SYSTEM:PERMISSION:INSTER','SYSTEM:PERMISSION:INSERTSON'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:PERMISSION:MANAGE','SYSTEM:PERMISSION:EDIT'),
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:PERMISSION:MANAGE','SYSTEM:PERMISSION:DELETE'),
        allowUpDown: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:PERMISSION:MANAGE','SYSTEM:PERMISSION:UPORDOWN'),
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:PERMISSION:MANAGE','SYSTEM:PERMISSION:DETAILS'),
      }
    },
    activated() {
      if(this.allowGetList.twoAllow){
        this.getPriList()
      }
    },
    // mounted() {
    //   this.getPriList()
    // },
    methods: {
      // 获取权限列表
      getPriList(num) {
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          parentId: num == 1 ? undefined : this.parentId,
          permissionName: this.permissionName,
          sortFieldName: this.sortFieldName,
          sortType: this.sortType
        }
        getPrivilegesList(params).then(res => {
          if (res.code == 200) {
            this.privilegesList = res.data.data
            this.privilegesList.forEach(item=>{
              item.fatherId = item.parentId
            })
            this.total = Number(res.data.total)
          } else {
            this.$message({type: 'error', message: res.message})
            this.sortFieldName = ''
            this.sortType = ''
          }
        })
      },

      //搜索
      goSearch(){
        this.page = 1;
        this.getPriList(1)
      },

      addChildren(row) {
        const params = {
          page: this.page,
          pageSize: 100,
          parentId: row.permissionId,
          permissionName: this.permissionName,
          sortFieldName: this.sortFieldName,
          sortType: this.sortType
        }

        // const enc = secret.Encrypt(JSON.stringify(params))
        getPrivilegesList(params).then(res => {
          // getPrivilegesList({a:enc}).then(res => {
          if (res.code == 200) {
            // const data = JSON.parse(secret.Decrypt(res.data))
            // this.privilegesList = res.data.data;
            if (res.data.data.length === 0) {
              this.$message.warning('当前权限没有子权限，请先进行添加')
            } else {
              row.children = res.data.data
              row.children.forEach(item=>{
                item.fatherId = row.permissionId
              })
            }
            this.privilegesList = JSON.parse(JSON.stringify(this.privilegesList))
            this.parentId = 0;
          } else {
            this.$message({type: 'error', message: res.message})
            this.sortFieldName = ''
            this.sortType = ''
          }
        })
      },

      // 点击折叠行的时候删除数据
      deleteChildren(row) {
        delete row.children
        this.privilegesList = JSON.parse(JSON.stringify(this.privilegesList))
      },

      // 删除权限
      deletePrivileges(row) {
        const params = {
          permissionId: row.permissionId
        }
        // const enc = secret.Encrypt(JSON.stringify(params))
        deletePermission(params).then(res => {
          // deletePermission({a:enc}).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: '删除成功'})
            this.getPriList()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 跳转到新建权限页面 addPrivileges
      goAddPrivileges() {
        this.$router.push({
          path: '/backend/operatePrivileges/addPrivileges'
        })
      },

      // 跳转到编辑权限页面
      goEditPrivileges(id) {
        this.$router.push({
          path: '/backend/operatePrivileges/editPrivileges',
          query: {
            permissionId: id
          }
        })
      },

      // 跳转到添加子权限页面
      goAddSonPri(id, ids, level) {
        this.$router.push({
          path: '/backend/operatePrivileges/addSonPrivileges',
          query: {
            parentId: id,
            parentIds: ids,
            levelNum: level
          }
        })
      },

      // 排序
      handleSortChange(column) {
        this.sortFieldName = column.prop
        if (column.order === 'ascending') {
          this.sortType = 'ASC'
        } else if (column.order === 'descending') {
          this.sortType = 'DESC'
        } else {
          this.sortType = ''
          this.sortFieldName = ''
        }
        this.getPriList()
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.getPriList()
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        this.getPriList()
      },

      // 上升和下降
      dataUpDown(row, num) {
        const params = {
          operationType: num,
          permissionId: row.permissionId,
          parentId: row.fatherId
        }
        // const enc = secret.Encrypt(JSON.stringify(params))
        goUpOrDown(params).then(res => {
        // goUpOrDown({a:enc}).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: res.message})
            this.getPriList()
          } else {
            this.$message({type: 'error', message: res.message})
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

  // 针对本页面项目名称和产品名称单独设置
  .projectName {
    cursor: pointer;

    .showOrHiden {
      display: inline-block;
      color: #333;
      margin-right: 10px;
    }
  }

  .productName {
    padding-left: 24px;
    color: #333;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
      /*text-decoration: underline;*/
    }
  }


</style>
