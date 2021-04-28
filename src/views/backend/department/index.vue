<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="table-container">
        <div class="table-left">
          <div class="consumeType">
            <div class="typeTop">组织架构</div>
            <div class="typeCont">
              <el-tree :data="tableData"
                       node-key="deptId"
                       ref="tableData"
                       check-strictly
                       :props="defaultProps"
                       @node-click="treeSubHandle"
                       :expand-on-click-node="false"
                       :highlight-current="true"
              >
                <span class="span-ellipsis" slot-scope="{node,data}">
                  <span :title="node.label">{{node.label}}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </div>
        <div class="table-right">
          <el-row type="flex" justify="space-between" class="filterList character">
            <div class="df">
              <el-input size='small' class="filter-item" @keyup.enter.native="handleFilter" placeholder="部门名称" v-model="listQuery.deptName" clearable>
              </el-input>
              <el-button size='small' class="filter-item bg_blue" icon="el-icon-search" @click="handleFilter">搜索</el-button>
            </div>
            <div class="df">
              <el-button size='small' class="filter-item bg_blue" v-waves @click="handleCreate(8)" v-if="allowAdd.twoAllow">新建部门</el-button>
            </div>
          </el-row>
          <el-table :data="list" v-loading="listLoading" default-expand-all border fit highlight-current-row
                    row-key="deptId" :tree-props="{children: 'children'}"
                    @sort-change="handleSortChange" style="width: 100%;" @cell-dblclick="handleChecked">
            <el-table-column label="序号" type="index" width="100">
            </el-table-column>
            <el-table-column min-width="120px" label="部门名称" prop="deptName" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.deptName}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="80px" label="负责人" prop="leaderUserName" sortable="custom">
              <template slot-scope="scope">
                <span>{{scope.row.leaderUserName}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="100px" label="备注">
              <template slot-scope="scope">
                <span v-html="scope.row.deptDesc">{{scope.row.deptDesc}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="340px" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <span class="spanButton col_skyblue" @click="handleCreate(1,scope.row)">新建子部门</span>
                <span class="shu">|</span>
                <span class="spanButton col_skyblue" @click="handleUpdate(scope.row)" v-if="allowUpdate.twoAllow">编辑</span>
                <span class="shu">|</span>
                <span class="spanButton col_red" @click="handleDel(scope.row.deptId)" v-if="allowDelete.twoAllow">删除</span>
                <span class="shu" v-if="!isSearch && !scope.row.children || !isSearch && !scope.row.children.length && allowUpDown.twoAllow">|</span>
                <span class="spanButton col_orange" v-if="!isSearch && !scope.row.children || !isSearch && !scope.row.children.length && allowUpDown.twoAllow" @click="handleUp(scope.row.deptId,scope.row.parentId)">上升</span>
                <span class="shu" v-if="!isSearch && !scope.row.children || !isSearch && !scope.row.children.length && allowUpDown.twoAllow">|</span>
                <span class="spanButton col_orange" v-if="!isSearch && !scope.row.children || !isSearch && !scope.row.children.length && allowUpDown.twoAllow" @click="handleDown(scope.row.deptId,scope.row.parentId)">下降</span>
              </template>

            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <div class="totalText">
              <span>总数：{{ total }}</span>
              <span>总页数:{{ Math.ceil(total / listQuery.pageSize) || Math.ceil(total / 10) }}</span>
              <span>当前页：{{ listQuery.page || 1 }}</span>
            </div>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                           layout="prev, pager, next, sizes, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 新增/编辑部门详情弹出框 -->
    <el-dialog
      title="部门管理编辑"
      :visible.sync="departmentDetailDialogVisible"
      width="586px"
      v-dialogDrag
    >
      <el-form :model="detailForm" :rules="rules" ref="detailForm" label-width="100px">
        <el-form-item label="父部门名称:">
          <el-input size='small' v-model="detailForm.parentName" :disabled="true" v-if="!isChecked"></el-input>
          <span v-else>{{detailForm.parentName}}</span>
        </el-form-item>
        <el-form-item label="部门名称:" prop="deptName">
          <el-input size='small' v-model="detailForm.deptName" v-if="!isChecked"></el-input>
          <span v-else>{{detailForm.deptName}}</span>
        </el-form-item>
        <el-form-item label="负责人:" prop="leaderUserId">
          <el-select size='small' v-model="detailForm.leaderUserId" placeholder="请选择部门负责人" @change="departChange" v-if="!isChecked">
            <el-option v-for="item in departmentMembers" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
          </el-select>
          <span v-else>{{detailForm.leaderUserName}}</span>
        </el-form-item>
        <el-form-item label="备注:" prop="deptDesc">
<!--          <el-input size='small' type="textarea" v-model="detailForm.deptDesc" :disabled="isChecked"></el-input>-->
          <EditorText v-if="!isChecked" :id="editor1" :value="detailForm.deptDesc" ref="editor" @changeValue="changeValue($event)"></EditorText>
          <span v-else v-html="detailForm.deptDesc">{{detailForm.deptDesc}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' class="bg_blue" @click="handleSubmit" v-if="!isChecked">确 定</el-button>
        <el-button size='small' @click="cancelDept">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAllCompanyInfo,
    getDepartmentMembers,
    getDepartmentTree,
    getDepartmentInfo,
    addDept,
    deleteDept,
    goUpOrDown,
    getDepartmentDetail,
    updateDepartment
  } from '@/api/department.js'
  import {queryUserCompany} from '@/api/rolesManage'
  import waves from '@/directive/waves' // 水波纹指令

  import EditorText from '@/components/EditorText/index'

  export default {
    components: {
      EditorText,
    },
    data:function() {
      return {
        listQuery: {
          page: 1,
          pageSize: 10,
        }, // 筛选条件对象
        companyName: '', // 缓存当前公司名，提供给根节点做父节点
        companyId: '', // 缓存当前公司id，提供给根节点做父节点
        departmentList: null, // 部门列表
        total: 0, // 表格数据总条数
        company_list: [], // 切换企业数组，后期放菜单栏
        tableData: [], // 分类管理树形表格数据
        list: [], // 部门表格数据
        listLoading: false, // 部门表格加载loading
        departmentDetailDialogVisible: false, // 新增/编辑部门详情弹出框是否显示
        detailForm: {}, // 新增/编辑部门详情表单对象
        departmentMembers: [], // 部门成员列表
        rules: {
          deptName: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
          leaderUserId: [{required: true, message: '请选择部门负责人', trigger: 'blur'}],
        }, // 表单验证对象
        parentIdArr: [], // 父节点id集合
        isChecked: false, // 查看状态 => 查看状态时表格禁用状态
        isSearch: false, // 搜索状态 => 搜索状态时升序降序不可见
        isEdit: false, // 编辑状态
        companyDto: false,
        companyTree:'',
        defaultProps: {
          children: 'child',
          label: 'deptName'
        },
        editor1:'editor1',
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),
        
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:INSTER'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:EDIT:UPDATE'),
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:DELETE'),
        allowUpDown: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTME:DEPT:UOORDOWN'),
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:DETAILS'),
      }
    },
    directives: {
      waves
    },
    activated() {
      if(this.allowGetList.twoAllow){
        this.getList();
      }
      this.getDepartmentTree()
      this.isSearch = false
    },
    // mounted() {
    //   // 获取所有拥有操作权限的公司数组 -- 位置待定
    //   // getAllCompanyInfo({}).then(res => {
    //   //   let data = JSON.parse(secret.Decrypt(res.data));
    //   //   // console.log('222',res)
    //   //   this.company_list = data
    //   // })
    //   if(this.allowGetList.twoAllow){
    //     this.getList();
    //   }
    //   this.getDepartmentTree()
    //   this.isSearch = false
    // },
    methods: {
      //接收和更新富文本值
      changeValue($event) {
        this.detailForm.deptDesc = $event
      },
      // 获取分类管理树形结构数据
      getDepartmentTree() {
        this.tableData = [];
        setTimeout(() => {
          getDepartmentTree({}).then(res => {
            this.companyTree = res.data;
            this.companyName = res.data.companyName;
            this.companyId = res.data.companyId;
            if(res.data.deptInfoTreeVos == ''){
              this.companyDto = true;
              let compdata = {
                deptName: res.data.companyName,
                deptId: res.data.companyId,
              };
              this.tableData.push(compdata)
            }else{
              this.companyDto = false;
              this.tableData = res.data.deptInfoTreeVos;
            }
          })
        }, 200)
      },
      // 获取部门表格数据
      getList() {
        getDepartmentInfo(this.listQuery).then(res => {
          this.list = res.data.data;
          // 处理后台返回的数据，拼接成树形
          for (let i = 1; i < this.list.length; i++) {
            if (this.list[i].parentId === this.list[0].deptId) {
              this.list[0].children = this.list.splice(i)
            }
          }
          this.total = Number(res.data.total)
        })
      },

      /**
       * 递归找parentId
       * currentNode => 当前节点
       * tree => 树形数据
       */
      findParentId(currentNode, treeData) {
        if (currentNode.parentId !== '0') {
          const parentNode = treeData.find(v => {
            if (v.child.length > 0) {
              this.findParentId(currentNode, v.child)
            }
            return v.deptId === currentNode.parentId
          })
          if (parentNode) {
            this.parentIdArr.push(parentNode.deptId)
            if (parentNode.parentId) {
              this.findParentId(parentNode, this.tableData)
            }
          }
        }
      },
      // 搜索功能 -- 隐藏升序降序
      handleFilter() {
        this.isSearch = true;
        this.listQuery.page = 1;
        this.listQuery.deptId = '';
        this.getList()
      },
      // 表格标题栏排序功能
      handleSortChange(column) {
        this.listQuery.sortFieldName = column.prop
        if (column.order === 'ascending') {
          this.listQuery.sortType = 'ASC'
        } else if (column.order === 'descending') {
          this.listQuery.sortType = 'DESC'
        } else {
          this.listQuery.sortType = ''
        }
        this.isSearch = false
        this.getList()
      },

      //点击树某个节点
      treeSubHandle(data) {
        this.listQuery.deptId = this.listQuery.deptId = data.deptId;
        this.parentIdArr = [data.parentId]
        this.findParentId(data, this.tableData)
        this.detailForm.parentIds = this.parentIdArr.join(',')
        this.isSearch = false
        if (this.allowGetList.twoAllow) {
          this.getList()
        }
      },

      // 新增子项功能
      handleCreate(num,row) {
        this.listQuery.parentId = '';
        this.detailForm.parentName = '';
        this.detailForm.parentId = '';

        //0-新建父部门  1-新建子部门
        if(num == 1){
          this.listQuery.parentId = row.parentId;
          this.detailForm.parentName = row.deptName;
          this.detailForm.parentId = row.deptId;
          this.listQuery.deptId = row.deptId;
          this.parentIdArr = [row.parentId];
        }
        this.isChecked = false
        this.detailForm.parentName = this.detailForm.parentName || this.companyName
        this.detailForm.parentId = this.detailForm.parentId || '0'
        this.departmentDetailDialogVisible = true
        // 获取部门成员列表
        var params = {
          page:1,
          pageSize:1000000
        };
        queryUserCompany(params).then(res=>{
          this.departmentMembers = res.data.data
        })

        setTimeout(()=>{
          this.$refs.editor.initCKEditor()
        })
      },

      //选择负责人
      departChange(e){
        for(var i=0;i<this.departmentMembers.length;i++){
          if(e == this.departmentMembers[i].userId){
            this.detailForm.leaderUserName = this.departmentMembers[i].userName
          }
        }
      },

      // 新增子项/编辑提交
      async handleSubmit() {
        this.detailForm.parentIds = this.parentIdArr.join(',')
        this.detailForm.parentIds = this.detailForm.parentIds || '0'

        if(this.detailForm.deptName == '' || this.detailForm.deptName == undefined){
          this.$message.warning('请输入部门名称');
          return;
        }
        if(this.detailForm.leaderUserId == '' || this.detailForm.leaderUserId == undefined){
          this.$message.warning('请选择部门负责人');
          return;
        }

        if (this.isEdit) {
          // 更新部门接口
          await updateDepartment(this.detailForm).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getDepartmentTree()
            this.getList()
          })
        } else {
          // 新增部门接口
          await addDept(this.detailForm).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getDepartmentTree()
            this.getList()
          })
        }
        this.departmentDetailDialogVisible = false
        this.isSearch = false

        this.$refs.editor.destroyEditor();
      },

      cancelDept(){
        this.departmentDetailDialogVisible = false
        this.$refs.editor.destroyEditor();
      },

      // 获取部门详细信息
      getDepartmentDetail(deptId) {
        const params = {
          deptId: deptId,
        }
        getDepartmentDetail(params).then(res => {
          this.detailForm = res.data
          this.detailForm.parentName = this.detailForm.parentName || this.companyName
          this.detailForm.parentId = this.detailForm.parentId || '0'
          this.departmentDetailDialogVisible = true

          setTimeout(()=>{
            this.$refs.editor.initCKEditor()
          },100)
        })
      },
      // 编辑部门
      handleUpdate(item) {
        this.isChecked = false;
        this.isEdit = true;
        if(item.parentId == '0'){
          var params = {
            page:1,
            pageSize:1000000
          };
          queryUserCompany(params).then(res=>{
            this.departmentMembers = res.data.data
          })
        }else{
          var params = {
            deptId: item.deptId,
            companyId: this.$store.getters.companyId
          };
          getDepartmentMembers(params).then(res => {
            this.departmentMembers = res.data
          })
        }

        this.getDepartmentDetail(item.deptId)
      },
      // 查看部门
      handleChecked(row) {
        if(this.allowDetail.twoAllow){
          this.isChecked = true
          this.getDepartmentDetail(row.deptId)
        }
      },
      // 删除部门
      handleDel(deptId) {
        this.$confirm('此操作将删除该节点和其子节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            deptId,
            companyId: this.$store.getters.companyId
          }
          deleteDept(params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 若当前页只剩一条数据则返回上一页
            this.listQuery.page = Math.ceil((this.total - 1) / this.listQuery.pageSize) < this.listQuery.page ? --this.listQuery.page : this.listQuery.page
            this.getDepartmentTree()
            this.isSearch = false
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 部门升序
      handleUp(deptId, parentId) {
        var params = {
          deptId,
          parentId,
          operationType: 1,
          companyId: this.$store.getters.companyId
        }
        goUpOrDown(params).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getDepartmentTree()
          this.getList()
        })
      },
      // 部门降序
      handleDown(deptId, parentId) {
        var params = {
          deptId,
          parentId,
          operationType: 2,
          companyId: this.$store.getters.companyId
        }
        // const enc = secret.Encrypt(JSON.stringify(params))
        // goUpOrDown({a: enc}).then(res => {
        goUpOrDown(params).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getDepartmentTree()
          this.getList()
        })
      },
      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    },
    watch: {
      // 当弹出框关闭的时候，初始化表单对象
      departmentDetailDialogVisible: function (newVal) {
        if (!newVal) {
          this.isEdit = false
          this.$set(this.detailForm, 'deptName', '')
          this.$set(this.detailForm, 'deptId', '')
          this.$set(this.detailForm, 'leaderUserName', '')
          this.$set(this.detailForm, 'leaderUserId', '')
          this.$set(this.detailForm, 'deptDesc', '')
        }
      }
    },

  }
</script>

<style lang="less" scoped>
  // 全局文字颜色和背景颜色的公用样式
  .col_skyblue {
    color: #05AAFF !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_green {
    color: rgb(133, 206, 97) !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_blue {
    color: #008DD6 !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_orange {
    color: #FF8527 !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_red {
    color: #FF6B6B !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .col_black {
    color: rgb(180, 180, 180) !important;

    &:hover {
      opacity: 0.5;
    }
  }

  .bg_orange {
    background: #FD903C;
    color: #fff;

    &:hover {
      background: #FD903C;
      opacity: 0.5;
    }
  }

  .bg_gray {
    background: rgb(180, 180, 180);
    color: #fff;

    &:hover {
      background: rgba(180, 180, 180, .5);
    }
  }

  .bg_blue {
    background: #05AAFF;
    color: #fff;

    &:hover {
      background: #05AAFF;
      opacity: 0.5;
    }
  }

  .header {
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;

    /deep/ .el-button {
      border-radius: 0;
    }
  }

  // 更多操作按钮框
  .moreOperoBox {
    position: absolute;
    left: 113px;
    top: 65px;
    width: 130px;
    background: #fff;
    text-align: center;
    z-index: 3;
    box-shadow: 0px 6px 10px rgba(28, 28, 28, 0.18);

    .spanButton {
      height: 36px;
      line-height: 36px;
    }
  }

  // 修改筛选条件框框样式
  .box-card {
    margin-bottom: 14px;

    /deep/ .el-button {
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }

    .filterList {
      /deep/ .el-input {
        min-width: 140px;
        max-width: 200px;
        margin-right: 10px;
      }

      /deep/ .el-input__inner {
        border-radius: 0;
        height: 36px;
        line-height: 36px;
      }

      /deep/ .filter-item {
        margin-bottom: 0 !important;
      }
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
  }

  /deep/ .el-table__row {
    &:nth-child(even) {
      background: rgb(235, 248, 255) !important;
    }
  }

  /deep/ .el-table--border td {
    border: none;
    box-sizing: border-box;

    &:first-child {
      border-right: rgb(217, 242, 255) 1px solid !important;
    }

    &:last-child {
      border-left: rgb(217, 242, 255) 1px solid !important;
    }
  }

  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  // 分页样式
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    /deep/ .el-pagination__total {
      flex: 1
    }

    .totalText {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 20px;
      color: rgba(68, 68, 68, 1);

      span {
        margin-right: 20px;
      }
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
  }

  .upload-demo {
    /*float:right;*/
    /*margin-bottom:20px;*/
    display: flex;
    flex-direction: row-reverse;
    margin-left: 20px
  }

  .app-container .el-table__header {
    background-color: #f5f7fa;
  }

  /deep/ .el-table__header {
    .gutter {
      display: block !important;
      width: 17px !important;
    }
  }

  // 表格显示列
  .showColParent {
    cursor: pointer;
    font-size: 20px;
    line-height: 32px;
    position: relative;

    &:hover {
      color: #409EFF;
    }

    // 筛选表格列框
    .showColBox {
      position: absolute;
      left: -74px;
      top: 45px;
      width: 200px;
      height: 300px;
      background: #fff;
      text-align: left;
      padding-left: 15px;
      z-index: 99;
      box-shadow: 0px 6px 10px rgba(28, 28, 28, 0.18);
      overflow: scroll;
    }
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .character {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }

  .df {
    display: flex;
  }

  // 针对本页面内容分两个表格单独设置
  .table-container {
    overflow: hidden;

    .table-left {
      width: 220px;
      margin-right: 10px;
      float: left;
      .consumeType {
        margin-right: 14px;
        border:1px solid rgba(0, 141, 214, 0.2);
        .typeTop {
          background: #2CB1F5;
          padding: 15px 12px;
          font-size: 14px;
          color: #fff;
        }

        .typeCont {
          /*border: 1px solid rgba(0, 141, 214, 0.2);*/

          .el-table--fit {
            margin-bottom: 0 !important;
          }
        }
      }
    }

    .table-right {
      overflow: hidden;
    }
  }

  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding: 20px;
    margin-bottom: 20px;

    /deep/ .el-dialog__title {
      color: #fff;
      font-size: 16px;
    }

    /deep/ .el-dialog__headerbtn {
      border-radius: 50%;
      background: #fff;
      padding: 4px;
      font-size: 12px;
      font-weight: 400;

      /deep/ .el-dialog__close {
        color: #05AAFF;
      }
    }
  }

  /deep/ .el-dialog__footer {
    text-align: center;

    /deep/ .el-button {
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }

  /deep/ .el-table .sort-caret.ascending {
    border-bottom-color: #fff;
  }

  /deep/ .el-table .sort-caret.descending {
    border-top-color: #fff;
  }
</style>
