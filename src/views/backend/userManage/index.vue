<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <div class="headerLeft">
          <el-input size='small' class="searchInput" v-model="userName" placeholder="用户名称"
                    @keyup.enter.native="searchUserList"
                    clearable></el-input>
          <el-select class="searchInput" size='small' v-model="stateNum" placeholder="是否在职" clearable>
            <el-option :value="1" :label="'是'"></el-option>
            <el-option :value="2" :label="'否'"></el-option>
          </el-select>
          <el-button size='small' type="primary" icon="el-icon-search" @click="searchUserList">搜索</el-button>
        </div>
        <div class="headerRig">
          <el-checkbox class="choose" v-model="findChild" true-label="1" false-label="0" @change="findChildChange">
            包括子部门用户
          </el-checkbox>
          <el-button size='small' type="primary" @click="goSelectUserData" v-if="isSelectUser">确定</el-button>
          <el-button size='small' type="danger" @click="goSelectUserCanacel" v-if="isSelectUser">取消</el-button>
          <el-button size='small' type="primary" @click="goInvitation">邀请新用户</el-button>
          <el-button size='small' type="primary" @click="goAddUser" v-if="allowAdd.twoAllow">新增用户</el-button>
        </div>
      </div>
      <div class="userManageCont">
        <div class="table-left">
          <div class="consumeType">
            <div class="typeTop">组织架构</div>
            <div class="typeCont">
              <el-tree :data="companyList"
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
          <div class="materielTable">
            <el-table :data="userList" v-loading="listLoading" border fit highlight-current-row
                      @selection-change="handleSelectionChange" ref="userTable" @sort-change="handleSortChange">
              <el-table-column type="selection" width="35" v-if="isSelectUser"></el-table-column>
              <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
              <el-table-column align="center" min-width="160px" label="用户名称" sortable="custom" prop="userName">
                <template slot-scope="scope">
                  <span>{{scope.row.userName}}</span>
                </template>
              </el-table-column>
<!--              <el-table-column align="center" label="默认部门" sortable="custom" prop="defaultDeptName">-->
<!--                <template slot-scope="scope">-->
<!--                  <span>{{scope.row.defaultDeptName == null ? '无' : scope.row.defaultDeptName}}</span>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column align="center" label="其他部门" sortable="custom" prop="userDeptViewVos">-->
<!--                <template slot-scope="scope">-->
<!--                  <span>{{scope.row.userDeptViewVos}}</span>-->
<!--                </template>-->
<!--              </el-table-column>-->
              <el-table-column align="center" label="性别" sortable="custom" prop="userSex">
                <template slot-scope="scope">
                  <span>{{scope.row.userSex == 1 ? '男' : '女'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="账号" sortable="custom" prop="loginName">
                <template slot-scope="scope">
                  <span>{{scope.row.loginName}}</span>
                </template>
              </el-table-column>
<!--              <el-table-column align="center" min-width="160px" label="角色" sortable="custom" prop="userRoleViewVos">-->
<!--                <template slot-scope="scope">-->
<!--                  <span>{{scope.row.userRoleViewVos}}</span>-->
<!--                </template>-->
<!--              </el-table-column>-->
              <el-table-column align="center" label="电话" sortable="custom" prop="phoneNumber">
                <template slot-scope="scope">
                  <span>{{scope.row.phoneNumber}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="是否在职" sortable="custom" prop="phoneNumber">
                <template slot-scope="scope">
                  <span>{{scope.row.stateNum == 2?'否':'是'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="级别" sortable="custom" prop="phoneNumber">
                <template slot-scope="scope">
                  <span>{{scope.row.jobLevelName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="岗位" sortable="custom" prop="phoneNumber">
                <template slot-scope="scope">
                  <span>{{scope.row.jobPostName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                <template slot-scope="scope" v-if="!isSelectUser">
                  <span class="spanButton col_skyblue" @click="editUserInfo(scope.row.userId)"
                        v-if="allowUpdate.twoAllow">编辑</span>
                  <span class="shu" v-if="allowUpdate.twoAllow">|</span>
                  <el-popconfirm
                    v-if="allowDelete.twoAllow"
                    confirmButtonText='好的'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="是否确定删除？"
                    @onConfirm="deleteUser(scope.row.userId)"
                  >
                    <span class="spanButton col_red" slot="reference">删除</span>
                  </el-popconfirm>
                  <span class="shu" v-if="findChild == 0 && allowUpDown.twoAllow">|</span>
                  <span class="spanButton colUpDown" v-if="findChild == 0 && allowUpDown.twoAllow && showUpDown"
                        @click="dataUpDown(scope.row.userId,1)">上升</span>
                  <span class="shu" v-if="findChild == 0 && allowUpDown.twoAllow  && showUpDown">|</span>
                  <span class="spanButton colUpDown" v-if="findChild == 0 && allowUpDown.twoAllow  && showUpDown"
                        @click="dataUpDown(scope.row.userId,2)">下降</span>
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
        </div>
      </div>
    </el-card>

    <el-dialog
      title="邀请新用户"
      :visible.sync="dialogVisible"
      width="30%"
      v-dialogDrag
      :before-close="handleClose">
      <div class="invitation">
        <el-radio-group v-model="inviiteType" class="invRadio" @change="getInviteCode">
          <el-radio :label="1">邀请注册</el-radio>
          <el-radio :label="2">邀请加入</el-radio>
        </el-radio-group>
        <el-input type="textarea" disabled :rowS="5" resize="none" v-model="inviteReg"></el-input>
        <div class="invCopy">
          <el-button size="small" type="info" v-clipboard:copy="inviteReg" v-clipboard:success="onCopy">复制链接</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserList, deleteUser, goUpOrDown, queryUserList} from '@/api/userManage.js'
  import {getDepartmentTree} from '@/api/department.js'
  import {generateInviteCode, commonDictGetNameByCaChe} from '@/api/utils.js'

  export default {
    name: 'userManage',
    data() {
      return {
        host: location.host,
        findChild: '1',
        listLoading: false,
        keyWork: '',
        total: 1,
        page: 1,
        pageSize: 10,
        userList: [],
        companyList: [
          // {deptId: '1', parentId: '0', deptName: '父部门1', child: []}
        ],
        companyId: '',
        sortFieldName: '', // 排序字段
        sortType: '', // 排序方式：DESC（降序），ASC（降序）或者desc，asc
        userName: '',
        stateNum: '',
        selectUserList: [],
        isSelectUser: null,
        getRouteType: '',
        companyDto: false,
        showUpDown: false,
        defaultProps: {
          children: 'child',
          label: 'deptName'
        },
        dialogVisible: false,
        companyType: 1,
        inviiteType: 1,
        inviteCode: '',
        inviteReg: '',
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MANAGE:LIST'),
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MAAGE:INSERT'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MANAGE:UPDATE'),
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MANAGE:DELETE'),
        allowUpDown: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MANAGE:GOORDOWN'),
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MANAGE:DETAILS'),
      }
    },
    watch: {
      $route() {
        // this.$refs.fliesTable.clearSelection()
        this.selectUserList = []
      }
    },
    activated() {
      this.getCompanyList()
      if (this.allowGetList.twoAllow) {
        this.getUserList()
      }
      if (this.$route.query.isSelect) {
        this.isSelectUser = true
      } else {
        this.isSelectUser = false
        return false
      }
      if (this.$route.query.isType != undefined) {
        this.getRouteType = this.$route.query.isType
      }

    },
    methods: {
      // 获取左侧公司部门列表
      getCompanyList() {
        getDepartmentTree({}).then(res => {
          this.companyName = res.data.companyName;
          this.companyId = res.data.companyId;
          if (res.data.deptInfoTreeVos == '') {
            this.companyList = [];
            this.companyDto = true;
            let compdata = {
              deptName: res.data.companyName,
              deptId: res.data.companyId,
            };
            this.companyList.push(compdata)
          } else {
            this.companyDto = false;
            this.companyList = res.data.deptInfoTreeVos;
          }
        })
      },

      //点击树某个节点
      treeSubHandle(data) {
        if (!this.companyDto) {
          this.deptId = this.deptId = [data.deptId];
          this.page = 1;
          if (this.allowGetList.twoAllow) {
            this.getUserList()
          }
          // this.findChild = '0';
          this.showUpDown = true
        }
      },

      // 获取用户列表
      getUserList() {
        const params = {
          companyId: this.companyId,
          deptIds: this.deptId,
          findChild: this.findChild,
          page: this.page <= 0 ? 1 : this.page,
          pageSize: this.pageSize,
          sortFieldName: this.sortFieldName,
          sortType: this.sortType,
          userName: this.userName,
          stateNum:this.stateNum
        }
        if (this.$route.query.isSelect || this.$route.query.isSelect == true) {
          queryUserList(params).then(res => {
            if (res.code == 200) {
              this.total = Number(res.data.total);
              for (let i = 0; i < res.data.data.length; i++) {
                let otherDept = ''
                let roleList = ''
                if (res.data.data[i].userRoleViewVos) {
                  for (let b = 0; b < res.data.data[i].userRoleViewVos.length; b++) {
                    roleList += res.data.data[i].userRoleViewVos[b].roleName + ','
                  }
                  if (roleList.length > 0) {
                    roleList = roleList.substr(0, roleList.length - 1);
                  }
                  res.data.data[i].userRoleViewVos = roleList
                }
                if (res.data.data[i].userDeptViewVos) {
                  for (let k = 0; k < res.data.data[i].userDeptViewVos.length; k++) {
                    otherDept += res.data.data[i].userDeptViewVos[k].deptName + ','
                  }
                  if (otherDept.length > 0) {
                    otherDept = otherDept.substr(0, otherDept.length - 1);
                  }
                  res.data.data[i].userDeptViewVos = otherDept
                }
              }
              res.data.data.forEach(item => {
                if (item.jobLevel && item.jobLevel !== "") {
                  commonDictGetNameByCaChe({dictId: item.jobLevel}).then(res => {
                    item.jobLevelName = res.data;
                  })
                }
              });
              res.data.data.forEach(item => {
                if (item.jobPost && item.jobPost !== "") {
                  commonDictGetNameByCaChe({dictId: item.jobPost}).then(res => {
                    item.jobPostName = res.data
                  })
                }
              });

              this.userList = res.data.data;
              this.sortFieldName = ''
              this.sortType = ''
            } else {
              this.$message({type: 'error', message: res.message});
              this.sortFieldName = '';
              this.sortType = ''
            }
          })
          return false
        } else {
          getUserList(params).then(res => {
            if (res.code == 200) {
              this.total = Number(res.data.total)
              for (let i = 0; i < res.data.data.length; i++) {
                let otherDept = ''
                let roleList = ''

                if (res.data.data[i].userRoleViewVos) {
                  for (let b = 0; b < res.data.data[i].userRoleViewVos.length; b++) {
                    roleList += res.data.data[i].userRoleViewVos[b].roleName + ','
                  }
                  if (roleList.length > 0) {
                    roleList = roleList.substr(0, roleList.length - 1);
                  }
                  res.data.data[i].userRoleViewVos = roleList
                }
                if (res.data.data[i].userDeptViewVos) {
                  for (let k = 0; k < res.data.data[i].userDeptViewVos.length; k++) {
                    otherDept += res.data.data[i].userDeptViewVos[k].deptName + ','
                  }
                  if (otherDept.length > 0) {
                    otherDept = otherDept.substr(0, otherDept.length - 1);
                  }
                  res.data.data[i].userDeptViewVos = otherDept
                }
              }


              res.data.data.forEach(item => {
                if (item.jobLevel && item.jobLevel !== "") {
                  commonDictGetNameByCaChe({dictId: item.jobLevel}).then(res => {
                    item.jobLevelName = res.data
                  })
                }
              });
              res.data.data.forEach(item => {
                if (item.jobPost && item.jobPost !== "") {
                  commonDictGetNameByCaChe({dictId: item.jobPost}).then(res => {
                    item.jobPostName = res.data
                  })
                }
              });

              setTimeout(() => {
                this.userList = res.data.data;
              }, 200)


              this.sortFieldName = ''
              this.sortType = ''
            } else {
              this.$message({type: 'error', message: res.message})
              this.sortFieldName = ''
              this.sortType = ''
            }
          })
        }
      },

      // 删除用户
      deleteUser(id) {
        var params = {
          companyId: this.companyId,
          userId: id
        }
        deleteUser(params).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: '删除成功'})
            this.getUserList()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 上升和下降
      dataUpDown(userId, num) {
        const params = {
          companyId: this.companyId,
          deptId: this.deptId,
          operationType: num,
          userId: userId
        };
        goUpOrDown(params).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: res.message})
            this.getUserList()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 选择框
      findChildChange(e) {
        this.findChild = e;
        if (e == 0) {
          this.showUpDown = true
        } else {
          this.showUpDown = false
        }
        this.getUserList()
      },

      // 跳转到新建用户页面
      goAddUser() {
        this.$router.push({
          path: '/backend/userManage/addUser',
          query: {
            companyId: this.companyId
          }
        })
      },

      // 跳转到用户编辑页面
      editUserInfo(id) {
        this.$router.push({
          path: '/backend/userManage/editUser',
          query: {
            userId: id,
            companyId: this.companyId
          }
        })
      },

      goUserInfo(id) {
        if (this.allowDetail.twoAllow) {
          this.$router.push({
            path: '/backend/userManage/editUser',
            query: {
              userId: id,
              companyId: this.companyId,
              detail: true
            }
          })
        }
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
        this.getUserList()
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.getUserList()
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        this.getUserList()
      },

      //选择列表某条数据
      handleSelectionChange(val) {
        this.selectUserList = val
      },

      //选择后跳转到需求管理新增页面
      goSelectUserData() {
        if (this.selectUserList.length > 0) {
          if (this.getRouteType == 'project_detail') {
            this.$store.commit('SET_USER_DATA', this.selectUserList)
            this.$router.push({
              path: '/project/create',
              query: {
                // projectCode: this.$route.query.projectCode,
                // projectName: this.$route.query.projectName,
                // devType: this.$route.query.devType,
                // leaderUserId: this.$route.query.leaderUserId,
                // leaderUserName: this.$route.query.leaderUserName,
                // projectDate: this.$route.query.projectDate,
                // startupDate: this.$route.query.startupDate,
                // planStopDate: this.$route.query.planStopDate,
                // realityStopDate: this.$route.query.realityStopDate,
                // planAmount: this.$route.query.planAmount,
                // requireTarget: this.$route.query.requireTarget,
                // acceptStandard: this.$route.query.acceptStandard,
                id: this.$route.query.id,
                userEdit: true
              }
            })
            this.isSelectUser = null
          } else if (this.getRouteType == 'project_edit') {
            this.$store.commit('SET_USER_DATA', this.selectUserList)
            this.$router.push({
              path: '/project/edit',
              query: {
                // projectCode: this.$route.query.projectCode,
                // projectName: this.$route.query.projectName,
                // devType: this.$route.query.devType,
                // leaderUserId: this.$route.query.leaderUserId,
                // leaderUserName: this.$route.query.leaderUserName,
                // projectDate: this.$route.query.projectDate,
                // startupDate: this.$route.query.startupDate,
                // planStopDate: this.$route.query.planStopDate,
                // realityStopDate: this.$route.query.realityStopDate,
                // planAmount: this.$route.query.planAmount,
                // requireTarget: this.$route.query.requireTarget,
                // acceptStandard: this.$route.query.acceptStandard,
                id: this.$route.query.id,
                userEdit: true
              }
            })
            this.isSelectUser = null
          } else if (this.getRouteType == 'product_detail') {
            this.$store.commit('SET_PRODUCTUSER_DATA', this.selectUserList)
            this.$router.push({
              path: '/product/create',
              query: {
                // productCode: this.$route.query.productCode,
                // productName: this.$route.query.productName,
                // devType: this.$route.query.devType,
                // leaderUserId: this.$route.query.leaderUserId,
                // leaderUserName: this.$route.query.leaderUserName,
                // planStartDate: this.$route.query.planStartDate,
                // startupDate: this.$route.query.startupDate,
                // planStopDate: this.$route.query.planStopDate,
                // realityStartDate: this.$route.query.realityStartDate,
                // realityStopDate: this.$route.query.realityStopDate,
                // requireTarget: this.$route.query.requireTarget,
                // acceptStandard: this.$route.query.acceptStandard,
                projectId: this.$route.query.projectId,
                id: this.$route.query.id,
                userEdit: true
              }
            });
            this.isSelectUser = null
          } else if (this.getRouteType == 'product_edit') {
            this.$store.commit('SET_PRODUCTUSER_DATA', this.selectUserList)
            this.$router.push({
              path: '/product/edit',
              query: {
                // productCode: this.$route.query.productCode,
                // productName: this.$route.query.productName,
                // devType: this.$route.query.devType,
                // leaderUserId: this.$route.query.leaderUserId,
                // leaderUserName: this.$route.query.leaderUserName,
                // planStartDate: this.$route.query.planStartDate,
                // startupDate: this.$route.query.startupDate,
                // planStopDate: this.$route.query.planStopDate,
                // realityStartDate: this.$route.query.realityStartDate,
                // realityStopDate: this.$route.query.realityStopDate,
                // requireTarget: this.$route.query.requireTarget,
                // acceptStandard: this.$route.query.acceptStandard,
                projectId: this.$route.query.projectId,
                id: this.$route.query.id,
                userEdit: true
              }
            });
            this.isSelectUser = null
          }

          //关闭当前页面
          this.$store.state.tagsView.visitedViews.forEach((item, key) => {
            if (item.name == '用户管理') {
              this.$store.state.tagsView.visitedViews.splice(key, 1)
            } else {
              return false
            }
          })

        } else {
          this.$message({type: 'error', message: '请先选择用户'})
        }
      },

      //取消选择用户
      goSelectUserCanacel() {
        if (this.getRouteType == 'project_detail') {
          this.$router.push({
            path: '/project/create',
            query: {
              // projectCode: this.$route.query.projectCode,
              // projectName: this.$route.query.projectName,
              // devType: this.$route.query.devType,
              // leaderUserId: this.$route.query.leaderUserId,
              // leaderUserName: this.$route.query.leaderUserName,
              // projectDate: this.$route.query.projectDate,
              // startupDate: this.$route.query.startupDate,
              // planStopDate: this.$route.query.planStopDate,
              // realityStopDate: this.$route.query.realityStopDate,
              // planAmount: this.$route.query.planAmount,
              // requireTarget: this.$route.query.requireTarget,
              // acceptStandard: this.$route.query.acceptStandard,
              id: this.$route.query.id,
              userEdit: true
            }
          })
          this.isSelectUser = null
        } else if (this.getRouteType == 'project_edit') {
          this.$router.push({
            path: '/project/edit',
            query: {
              // projectCode: this.$route.query.projectCode,
              // projectName: this.$route.query.projectName,
              // devType: this.$route.query.devType,
              // leaderUserId: this.$route.query.leaderUserId,
              // leaderUserName: this.$route.query.leaderUserName,
              // projectDate: this.$route.query.projectDate,
              // startupDate: this.$route.query.startupDate,
              // planStopDate: this.$route.query.planStopDate,
              // realityStopDate: this.$route.query.realityStopDate,
              // planAmount: this.$route.query.planAmount,
              // requireTarget: this.$route.query.requireTarget,
              // acceptStandard: this.$route.query.acceptStandard,
              id: this.$route.query.id,
              userEdit: true
            }
          })
          this.isSelectUser = null
        } else if (this.getRouteType == 'product_detail') {
          this.$router.push({
            path: '/product/create',
            query: {
              // productCode: this.$route.query.productCode,
              // productName: this.$route.query.productName,
              // devType: this.$route.query.devType,
              // leaderUserId: this.$route.query.leaderUserId,
              // leaderUserName: this.$route.query.leaderUserName,
              // planStartDate: this.$route.query.planStartDate,
              // startupDate: this.$route.query.startupDate,
              // planStopDate: this.$route.query.planStopDate,
              // realityStartDate: this.$route.query.realityStartDate,
              // realityStopDate: this.$route.query.realityStopDate,
              // requireTarget: this.$route.query.requireTarget,
              // acceptStandard: this.$route.query.acceptStandard,
              // projectId: this.$route.query.projectId,
              id: this.$route.query.id,
              userEdit: true
            }
          });
          this.isSelectUser = null
        } else if (this.getRouteType == 'product_edit') {
          this.$router.push({
            path: '/product/edit',
            query: {
              // productCode: this.$route.query.productCode,
              // productName: this.$route.query.productName,
              // devType: this.$route.query.devType,
              // leaderUserId: this.$route.query.leaderUserId,
              // leaderUserName: this.$route.query.leaderUserName,
              // planStartDate: this.$route.query.planStartDate,
              // startupDate: this.$route.query.startupDate,
              // planStopDate: this.$route.query.planStopDate,
              // realityStartDate: this.$route.query.realityStartDate,
              // realityStopDate: this.$route.query.realityStopDate,
              // requireTarget: this.$route.query.requireTarget,
              // acceptStandard: this.$route.query.acceptStandard,
              // projectId: this.$route.query.projectId,
              id: this.$route.query.id,
              userEdit: true
            }
          });
          this.isSelectUser = null
        }

        this.selectUserList = [];

        //关闭当前页面
        this.$store.state.tagsView.visitedViews.forEach((item, key) => {
          if (item.name == '用户管理') {
            this.$store.state.tagsView.visitedViews.splice(key, 1)
          } else {
            return false
          }
        })
      },

      //搜索点击
      searchUserList() {
        this.deptId = [];
        this.page = 1;
        this.$refs.tableData.setCurrentKey(null)
        this.getUserList()
      },

      //跳转邀请页面
      goInvitation() {
        this.dialogVisible = true
        this.getInviteCode();
      },

      getInviteCode() {
        let params = {
          companyType: this.companyType,
          inviiteType: this.inviiteType,
          inviteCompanyid: this.$store.getters.companyId,
          inviteCompanyName: this.$store.getters.companyName
        }
        generateInviteCode(params).then(res => {
          if (res.code == 200) {
            this.inviteCode = res.data.inviteCode;
            if (this.inviiteType == '1') {
              this.inviteReg = this.host + '/admin/#/registerJoin?name=user&invite=true&inviteCode=' + this.inviteCode
            } else {
              this.inviteReg = this.host + '/admin/#/invitationJoin?inviteCode=' + this.inviteCode
            }

          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      onCopy() {
        this.$message.success("链接已复制到剪切板！")
      },

      handleClose() {
        this.dialogVisible = false
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

  .userManageCont {
    display: flex;

    .table-left {
      min-width: 220px;

      .consumeType {
        margin-right: 14px;

        .typeTop {
          background: #05AAFF;
          padding: 15px 12px;
          font-size: 14px;
          color: #fff;
        }

        .typeCont {
          border: 1px solid rgba(0, 141, 214, 0.2);

          .el-table--fit {
            margin-bottom: 0 !important;
          }
        }
      }
    }

    .table-right {
      flex: 1;
      overflow: auto;
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

  /deep/ .el-table .sort-caret.descending {
    border-top-color: #fff;
  }

  /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #409EFF !important;
  }

  /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: #409EFF !important;
  }

  .invRadio {
    margin-bottom: 10px;
  }

  .invCopy {
    text-align: center;
    padding-top: 10px;
  }
</style>
