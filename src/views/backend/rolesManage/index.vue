<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <div class="headerLeft">
          <el-input size='small' class="searchInput" v-model="roleName" placeholder="角色名称" @keyup.enter.native="goSearch" clearable></el-input>
          <el-button size='small' type="primary" icon="el-icon-search" @click="goSearch">搜索</el-button>
        </div>
        <div class="headerRig">
          <el-button size='small' type="primary" @click="goAddRoles" v-if="allowAdd.twoAllow">新建角色</el-button>
        </div>
      </div>
      <div class="materielTable">
        <el-table :data="rolesList" v-loading="listLoading" border fit highlight-current-row row-key="roleId"
                  default-expand-all :tree-props="{children: 'children'}" @sort-change="handleSortChange">
          <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
          <el-table-column align="center" min-width="100px" label="角色名称" sortable="custom" prop="roleName">
            <template slot-scope="scope">
              <span class="projectName" v-if="!scope.row.permission">
               <span v-if="!scope.row.children" @click="addChildren(scope.row)" class="showOrHiden">+</span>
               <span v-else @click="deleteChildren(scope.row)" class="showOrHiden">-</span>
               <span>{{scope.row.roleName}}</span>
              </span>
              <span v-else>{{scope.row.roleName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="数据权限" sortable="custom" prop="dataPermissions">
            <template slot-scope="scope">
              <span>
                {{
                  scope.row.dataPermissions == 0 ? '全部数据权限' :
                  scope.row.dataPermissions == -1 ? '本部门及所有子部门数据权限' :
                  scope.row.dataPermissions == -2 ? '本部门数据权限' :
                  scope.row.dataPermissions == -3 ? '表示自己的数据权限' :
                  scope.row.dataPermissions == -4 ? '自定义' :
                  scope.row.dataPermissions == -5 ? '未知' : '无'
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="备注" sortable="custom" prop="roleDesc">
            <template slot-scope="scope">
              <span v-html="scope.row.roleDesc">{{scope.row.roleDesc}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="350px" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <span class="spanButton col_skyblue" v-if="scope.row.parentId = '0' && allowAddSon.threeAllow" @click="goAddSonRoles(scope.row.roleId,scope.row.parentIds)">添加子角色</span>
              <span class="shu" v-if="scope.row.parentId = '0' && allowAddSon.threeAllow">|</span>
              <span class="spanButton col_skyblue" v-if="allowUpdate.twoAllow" @click="goEditRole(scope.row)">编辑</span>
              <span class="shu" v-if="allowUpdate.twoAllow">|</span>
              <el-popconfirm
                v-if="allowDelete.twoAllow"
                confirmButtonText='好的'
                cancelButtonText='取消'
                icon="el-icon-info"
                iconColor="red"
                title="是否确定删除？"
                @onConfirm="deleteRoleBox(scope.row.roleId)"
              >
                <span class="spanButton col_red" slot="reference">删除</span>
              </el-popconfirm>
              <span class="shu" v-if="allowDelete.twoAllow">|</span>
              <span class="spanButton colUpDown" v-if="allowUpDown.twoAllow" @click="dataUpDown(scope.row,1)">上升</span>
              <span class="shu">|</span>
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
  import {getRolesList, deleteRole, goUpOrDown} from '@/api/rolesManage'


  export default {
    name: 'index',
    data() {
      return {
        page: 1,
        pageSize: 10,
        parentId: 0,
        roleName: '',
        total: 0,
        rolesList: [],
        listLoading: false,
        sortType: '',
        sortFieldName: '',
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:ROLE:MANAGE','SYSTEM:ROLE:LIST'),
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:ROLE:MANAGE','SYSTEM:ROLE:INSTER'),
        allowAddSon: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:ROLE:MANAGE','SYSTEM:ROLE:INSTER','SYSTEM:ROLE:INSERTSON'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:ROLE:MANAGE','SYSTEM:ROLE:EDIT'),
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:ROLE:MANAGE','SYSTEM:ROLE:DELETE'),
        allowUpDown: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:ROLE:MANAGE','SYSTEM:ROLE:UPORDOWN'),
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:ROLE:MANAGE','SYSTEM:ROLE:DETAILS'),
      }
    },
    activated() {
      this.getRoles()
    },
    // watch: {
    //   $route: function() {
    //     this.getRoles()
    //   }
    // },
    // mounted() {
    //   this.getRoles()
    // },
    methods: {
      // 获取角色列表
      getRoles() {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
          parentId: this.parentId,
          roleName: this.roleName,
          companyId: this.$store.getters.companyId
        }
        getRolesList(params).then(res => {
          if (res.code == 200) {
            this.rolesList = res.data.data;
            this.rolesList.forEach(item=>{
              item.fatherId = item.parentId
            })
            this.total = Number(res.data.total)
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      goSearch(){
        this.page=1;
        this.pageSize=10;
        this.getRoles();
      },

      // 点击展开子角色列表
      addChildren(row) {
        this.parentId = row.roleId
        const params = {
          page: this.page,
          pageSize: this.pageSize,
          parentId: this.parentId,
          roleName: this.roleName
        };
        getRolesList(params).then(res => {
          if (res.code == 200) {
            if (res.data.data.length === 0) {
              this.$message.warning('当前角色没有子角色，请先进行添加')
            } else {
              row.children = res.data.data
              row.children.forEach(item=>{
                item.fatherId = item.parentId
                // this.$set(item,'fatherId',item.parentId)
              })
            }
            this.rolesList = JSON.parse(JSON.stringify(this.rolesList))
            this.parentId = 0
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 点击折叠行的时候删除数据
      deleteChildren(row) {
        delete row.children
        this.rolesList = JSON.parse(JSON.stringify(this.rolesList))
      },

      // 跳转到新建角色页面
      goAddRoles() {
        this.$router.push({
          path: '/backend/addRole'
        })
      },

      // 添加子权限
      goAddSonRoles(id, ids) {
        this.$router.push({
          path: '/backend/addSonRole',
          query: {
            parentId: id,
            parentIds: ids
          }
        })
      },

      // 编辑角色
      goEditRole(row) {
        this.$router.push({
          path: '/backend/editRole',
          query: {
            roleId: row.roleId,
            parentId: row.fatherId,
            parentIds: row.parentIds
          }
        })
      },

      // 删除角色
      deleteRoleBox(id) {
        const params = {
          roleId: id,
          companyId: this.$store.getters.companyId
        }
        // console.log('122',params)
        // const enc = secret.Encrypt(JSON.stringify(params))
        deleteRole(params).then(res => {
          // deleteRole({ a: enc }).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: '删除成功'})
            this.parentId = 0
            this.getRoles()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 上升下降
      dataUpDown(row, status) {
        const params = {
          operationType: status,
          parentId: row.fatherId,
          roleId: row.roleId
          // companyId:this.$store.getters.companyId
        }
        goUpOrDown(params).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: res.message})
            this.getRoles()
          } else {
            this.$message({type: 'error', message: res.message})
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
        this.getRoles()
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.getRoles()
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        this.getRoles()
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
