<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>{{companyName}}</span>
      </div>
      <div class="addUserContent">
        <el-form ref="roleForm" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色名称:">
                <el-input size='small' v-model="pageData.roleName" readonly maxlength="45"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户:">
                <div class="userCont">
                  <div class="userList">
                    <div class="userBox" v-for="item in pageData.roleUserVos" :key="item.userId">
                      <span>{{item.userName}}</span>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="操作权限:" prop="addRolePermissionDtos">
                <div class="operDtosTree">
                  <el-tree
                    :data="pageData.permissionsInfoTreeVos"
                    show-checkbox
                    :expand-on-click-node="false"
                    ref="Oper"
                    node-key="permissionId"
                    highlight-current
                    :props="defaultPropsOperation"
                    :default-checked-keys="defaultRolePermissionDtos"
                    @check-change="checkChangePermission"
                  ></el-tree>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据权限:" prop="dataPermissionsType">
                <el-select size='small' v-model="roleForm.dataPermissionsType" disabled clearable placeholder="请选择"
                           @change="changeDataType"
                           style="width: 40%;margin-bottom:10px;">
                  <el-option
                    v-for="item in dataOper"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div class="operDtosTree" v-if="roleForm.dataPermissionsType == -4">
                  <el-tree
                    :data="deptList"
                    show-checkbox
                    :expand-on-click-node="false"
                    ref="dept"
                    node-key="deptId"
                    highlight-current
                    :props="defaultDept"
                    :default-checked-keys="defaultDeptList"
                    @check-change="checkChangeDeptList"
                  ></el-tree>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注:">
                <EditorText :id="editor1" :value="roleForm.roleDesc" ref="editor"
                            @changeValue="changeValue($event)"></EditorText>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <el-button size='small' type="primary" @click="addRoleInfo"
                 v-if="roleId == undefined || roleId == '' && allowAdd.twoAllow ">确定
      </el-button>
      <!--修改-->
      <el-button size='small' type="primary" @click="editRoleBox"
                 v-if="roleId != undefined && roleId != '' && allowUpdate.twoAllow ">确定
      </el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>

    <!--  用户列表弹窗  -->
    <el-dialog
      title="用户列表"
      :visible.sync="dialogShow"
      width="40%"
    >
      <div class="userCheckbox">
        <div class="dialogChoose" style="display: flex;">
          <el-select style="margin-right: 10px;" v-model="deptIds" multiple size="small" filterable clearable
                     placeholder="请选择部门" @change="deptChange">
            <el-option
              v-for="item in deptList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
          <el-input size="small" v-model="userName" placeholder="请输入用户名称" @change="userChange"></el-input>
        </div>
        <el-checkbox-group v-model="checkList" @change="handleCheckedUserChange">
          <el-checkbox v-for="item in userList" :label="item.userId" :key="item.userId" @change="changeCheckUser(item)"
                       :checked="item.checked">
            {{item.userName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="getMore" v-if="total - userList.length > 0" @click="getMore">加载更多</div>
      <div class="getMore" v-else>没有更多</div>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="cancelCheck">取 消</el-button>
        <el-button size='small' type="primary" @click="chooseUserOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {queryCompanyAdminPermissions, editCompanyAdminRole} from '@/api/rolesManage'

  import {getDepartmentTree} from '@/api/department.js'
  import {getUserList} from '@/api/userManage.js'

  import EditorText from '@/components/EditorText/index'

  export default {
    components: {
      EditorText,
    },
    data() {
      return {
        //企业名称
        companyName: this.$route.query.companyName,
        //页面数据
        pageData: {},
        roleForm: {
          roleName: '',
          addRolePermissionDtos: [],
          addUserRoleDtos: [],
          dataPermissionsType: 0,
          deptList: [],
          roleDesc: ''
        },

        dialogShow: false,

        defaultRolePermissionDtos: [],
        defaultDeptList: [],
        levelNum: 1,
        parentId: 0,
        parentIds: '0',
        roleId: '',
        roleIds: '',
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          addRolePermissionDtos: [
            {required: true, message: '请选择操作权限', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          dataPermissionsType: [
            {required: true, message: '请选择数据权限', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
        },
        dataOper: [
          {value: 0, label: '全部数据'},
          {value: -1, label: '本部门及所有子部门数据'},
          {value: -2, label: '本部门数据'},
          {value: -3, label: '表示自己的数据权限'},
          {value: -4, label: '自定义数据'},
          {value: -5, label: '未知'}
        ],
        defaultPropsOperation: {
          children: 'child',
          label: 'permissionName',
          value: 'permissionId',
          checked: 'selected'
        },
        defaultDept: {
          children: 'child',
          label: 'deptName',
          value: 'deptId',
          checked: 'selected'
        },
        checkList: [],
        userList: [],
        userCheckList: [],
        loginName: '',
        page: 1,
        pageSize: 20,
        userName: '',
        total: 0,
        holdCheckUser: [],
        permissionsList: [],
        deptList: [],
        editor1: 'editor1',
        deptIds: [],
        findChild: 1,
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:ROLE:MANAGE', 'SYSTEM:ROLE:INSTER'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:ROLE:MANAGE', 'SYSTEM:ROLE:EDIT'),
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:ROLE:MANAGE', 'SYSTEM:ROLE:DETAILS'),
      }
    },
    mounted() {

    },
    activated() {
      this.parentId = this.$route.query.parentId
      this.parentIds = this.$route.query.parentIds
      this.roleId = this.$route.query.id
      // if (this.roleId != undefined && this.roleId != '' && this.allowDetail.twoAllow) {
      //   this.getRoleDetail()
      // } else {
      //   this.getPermissions()
      // }
      this.getCompanyAdminPermiss();
      // this.getDataDeptList();

      this.$refs.editor.initCKEditor()
    },
    methods: {
      //获取企业管理员权限
      getCompanyAdminPermiss() {
        queryCompanyAdminPermissions({companyId: this.$route.query.id}).then(res => {
          if (res.code === 200) {
            this.roleForm = {
              roleName: res.data.roleName,
              addUserRoleDtos: res.data.roleUserVos,
              dataPermissionsType: parseInt(res.data.dataPermissions),
              roleDesc: JSON.parse(JSON.stringify(res.data.roleDesc)),
            };
            this.roleIds = res.data.roleId;
            this.pageData = res.data;
            this.findAllChildren(this.pageData.permissionsInfoTreeVos, this.defaultRolePermissionDtos);
            setTimeout(() => {
              this.roleForm.addRolePermissionDtos = this.$refs.Oper.getHalfCheckedNodes().concat(this.$refs.Oper.getCheckedNodes());
            }, 200)
            this.$refs.editor.initCKEditor();
          }
        })
      },


      //接收和更新富文本值
      changeValue($event) {
        this.roleForm.roleDesc = $event
      },
      // 新建角色
      addRoleInfo() {
        if (this.roleForm.roleName == '' || this.roleForm.roleName == undefined) {
          this.$message({type: 'warning', message: '角色名称不能为空'})
          return
        }
        if (this.roleForm.addRolePermissionDtos == '' || this.roleForm.addRolePermissionDtos == undefined) {
          this.$message({type: 'warning', message: '请选择操作权限'})
          return
        }

        if (this.roleForm.dataPermissionsType === '' || this.roleForm.dataPermissionsType === undefined) {
          this.$message({type: 'warning', message: '请选择数据权限'})
          return
        }
        const params = {
          parentId: this.parentId == undefined || this.parentId == null ? 0 : this.parentId,
          parentIds: this.parentIds == undefined || this.parentIds == null ? '0' : this.parentIds,
          roleName: this.roleForm.roleName,
          addRolePermissionDtos: this.roleForm.addRolePermissionDtos,
          addUserRoleDtos: this.roleForm.addUserRoleDtos,
          dataPermissionsType: this.roleForm.dataPermissionsType,
          deptList: this.roleForm.deptList,
          roleDesc: this.roleForm.roleDesc
        }
        addRole(params).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '新建成功'
            })

            this.roleForm.roleName = ''
            this.roleForm.addRolePermissionDtos = []
            this.roleForm.addUserRoleDtos = []
            this.roleForm.dataPermissionsType = ''
            this.roleForm.deptList = []
            this.roleForm.roleDesc = ''
            this.userList = []
            this.defaultRolePermissionDtos = []
            this.defaultDeptList = []

            this.$refs.editor.destroyEditor();

            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/rolesManage');
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 编辑角色
      editRoleBox() {
        if (this.roleForm.dataPermissionsType != -4) {
          this.roleForm.deptList = [];
        }
        const params = {
          parentId: this.parentId == undefined || this.parentId == null ? 0 : this.parentId,
          parentIds: this.parentIds == undefined || this.parentIds == null ? '0' : this.parentIds,
          companyId:this.$route.query.id,
          roleName: this.pageData.roleName,
          addRolePermissionDtos: this.roleForm.addRolePermissionDtos,
          addUserRoleDtos: this.roleForm.addUserRoleDtos,
          dataPermissionsType: this.roleForm.dataPermissionsType,
          deptList: this.roleForm.deptList,
          roleDesc: this.roleForm.roleDesc,
          roleId: this.roleIds == undefined ? '' : this.roleIds,
          userName: this.$route.query.companyName,
        };
        editCompanyAdminRole(params).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })

            this.roleForm.roleName = ''
            this.roleForm.addRolePermissionDtos = []
            this.roleForm.addUserRoleDtos = []
            this.roleForm.dataPermissionsType = ''
            this.roleForm.deptList = []
            this.roleForm.roleDesc = ''
            this.userList = []
            this.defaultRolePermissionDtos = []
            this.defaultDeptList = []

            this.$refs.editor.destroyEditor();

            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/enterpriseList');
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 获取角色详情
      getRoleDetail() {
        const params = {
          roleId: this.roleId,
          companyId: this.$store.getters.companyId
        }
        queryRoleInfoById(params).then(res => {
          if (res.code == 200) {
            this.roleForm = {
              roleName: res.data.roleName,
              addUserRoleDtos: res.data.roleUserVos,
              dataPermissionsType: parseInt(res.data.dataPermissions),
              roleDesc: res.data.roleDesc
            }
            this.permissionsList = res.data.permissionsInfoTreeVos
            this.deptList = res.data.dataPermissionsInfoVos;
            // let permissionList = [];
            this.findAllChildren(this.permissionsList, this.defaultRolePermissionDtos);
            this.findAllChildren(this.deptList, this.defaultDeptList);
            this.roleForm.deptList = JSON.parse(JSON.stringify(this.defaultDeptList));

            setTimeout(() => {
              this.roleForm.addRolePermissionDtos = this.$refs.Oper.getHalfCheckedNodes().concat(this.$refs.Oper.getCheckedNodes());
            }, 200)

            this.$refs.editor.initCKEditor()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 遍历找出所有子节点
      findAllChildren(data, arr) {
        if (data != undefined) {
          data.forEach((item, index) => {
            if (item.child) {
              if (item.child.length !== 0) {
                this.findAllChildren(item.child, arr)
              }
            }
            if (item.permissionId) {
              if (item.child) {
                item.child.forEach(list => {
                  if (list.selected == false) {
                    this.$set(item, 'selected', false)
                  }
                })
              }
              if (item.selected == true) {
                arr.push(item.permissionId);
              }
            } else {
              if (item.selected == true) {
                arr.push(item.deptId)
              }
            }
          })
        }
      },

      // 选择用户
      handleCheckedUserChange(value) {
        this.userList.forEach(item => {
          value.forEach(list => {
            if (item.userId == list) {
              this.userCheckList.push(item)
            }
          })
        })
        // this.userCheckList = value

        // let obj = {};
        // this.userCheckList = this.userCheckList.reduce((cur, next) => {
        //   obj[next] ? '' : obj[next] = true && cur.push(next)
        //   return cur
        // }, []);

      },

      changeCheckUser(value) {
        value.checked = !value.checked
      },

      // 确定选择
      chooseUserOk() {
        // this.roleForm.addUserRoleDtos = [];
        // this.userList.forEach(item=>{
        //   this.userCheckList.forEach(list=>{
        //     if(item.userId == list){
        //       this.roleForm.addUserRoleDtos.push(item)
        //     }
        //   })
        // })

        this.roleForm.addUserRoleDtos = this.userCheckList

        let obj = {};
        this.roleForm.addUserRoleDtos = this.roleForm.addUserRoleDtos.reduce((cur, next) => {
          obj[next.userId] ? '' : obj[next.userId] = true && cur.push(next)
          return cur
        }, []);
        //
        // this.checkList = [];
        this.userCheckList = [];
        this.dialogShow = false
      },

      // 取消选择
      cancelCheck() {
        this.dialogShow = false
      },


      // 删除已选用户
      deleteUser(item, index) {
        this.roleForm.addUserRoleDtos.splice(index, 1)
        // this.holdCheckUser.splice(index, 1)
        // for (let i = 0; i < this.userList.length; i++) {
        //   if (item.userId == this.userList[i].userId) {
        //     this.userList[i].checked = false
        //   }
        // }
        //
        // const checkIdList = []
        // for (let a = 0; a < this.roleForm.addUserRoleDtos.length; a++) {
        //   checkIdList.push(this.roleForm.addUserRoleDtos[a].userId)
        // }
        // this.checkList = checkIdList
        // this.userList = JSON.parse(JSON.stringify(this.userList))
      },

      // 获取用户列表
      getUserList() {
        const params = {
          // companyId: this.companyId,
          deptIds: this.deptIds,
          findChild: this.findChild,
          page: this.page,
          pageSize: this.pageSize,
          userName: this.userName
        }

        getUserList(params).then(res => {
          if (res.code == 200) {
            this.total = Number(res.data.total)
            if (this.page > 1) {
              this.userList = this.userList.concat(res.data.data);
            } else {
              this.userList = res.data.data;
            }
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 打开弹窗
      openUserList() {
        this.userList = [];
        this.userCheckList = [];
        this.checkList = [];
        this.page = 1;
        this.pageSize = 20;
        this.dialogShow = true;
        this.roleForm.addUserRoleDtos.forEach(item => {
          this.userCheckList.push(item)
          this.checkList.push(item.userId)
        })

        this.getUserList()
      },

      // 返回
      cancelSub() {
        this.roleForm.roleName = '';
        this.roleForm.addRolePermissionDtos = [];
        this.roleForm.addUserRoleDtos = [];
        this.roleForm.dataPermissionsType = '';
        this.roleForm.deptList = [];
        this.roleForm.roleDesc = '';
        this.userList = [];
        this.defaultRolePermissionDtos = [];
        this.defaultDeptList = [];
        this.$refs.editor.destroyEditor();
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/enterpriseList');
      },

      // 获取操作权限列表
      getPermissions() {
        const params = {
          companyId: this.$store.getters.companyId,
          roleId: this.roleId == undefined ? '' : this.roleId
        }

        queryCompanyPermissions(params).then(res => {
          if (res.code == 200) {
            this.permissionsList = res.data
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      changeDataType(e) {
        if (e == -4) {
          this.getDataDeptList();
        }
      },

      // 当自定义时获取部门列表
      getDataDeptList() {
        getDepartmentTree({companyId: this.roleId}).then(res => {
          if (res.code == 200) {
            // const data = JSON.parse(secret.Decrypt(res.data));
            this.deptList = res.data.deptInfoTreeVos;
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      deptChange() {
        this.getUserList()
      },

      userChange() {
        this.page = 1;
        this.getUserList()
      },

      // 选中权限
      checkChangePermission() {
        let faList = this.$refs.Oper.getHalfCheckedNodes();
        let sonList = this.$refs.Oper.getCheckedNodes();
        faList.forEach(item => {
          this.$set(item, 'selected', true)
        })
        sonList.forEach(item => {
          this.$set(item, 'selected', true)
        })

        // this.roleForm.addRolePermissionDtos = this.$refs.Oper.getHalfCheckedNodes().concat(sonList)
        this.roleForm.addRolePermissionDtos = faList.concat(sonList)
      },

      // 选择部门
      checkChangeDeptList() {
        this.roleForm.deptList = this.$refs.dept.getHalfCheckedKeys().concat(this.$refs.dept.getCheckedKeys())
        // this.roleForm.deptList = this.$refs.dept.getCheckedKeys()
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

      getMore() {
        this.page = this.page + 1;
        this.getUserList()
      },

      // 获取数据权限部门列表--用于回显
      // getDataDeptListBlock() {
      //   let params = {
      //     roleId: this.roleId,
      //   };
      //   queryDataPermissions(params).then(res => {
      //     if (res.code == 200) {
      //
      //     } else {
      //       this.$message({type: 'error', message: res.message});
      //     }
      //   })
      // }
    }
  }
</script>

<style scoped>
  /*// 修改列表页面表格样式*/
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

  /deep/ .el-form-item {
    display: flex;
    margin-right: 115px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    line-height: normal;
  }

  /deep/ .el-form-item__label {
    min-width: 77px;
  }

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }

  /deep/ .el-card__header {
    color: #008DD6;
  }

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  .userCont {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 10px 10px;
    display: flex;
    min-height: 90px;
  }

  .userList {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
  }

  .userBox {
    background: rgba(253, 144, 60, 1);
    padding: 7px 9px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 2px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 22.5%;
  }

  .userBox span {
    font-size: 12px;
    color: #fff;
    line-height: normal;
    margin-right: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .userBox i {
    color: #fff;
    font-size: 12px;
    cursor: pointer;
  }

  .userAddBtn {
    background: rgba(5, 170, 255, 1);
    border-radius: 2px;
    display: flex;
    align-items: center;
    color: #fff;
    padding: 0 13px;
    cursor: pointer;
    height: 30px;
  }

  .operDtosTree {
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 10px 10px;
  }

  /deep/ .pagination-container {
    margin-top: 50px;
    margin-bottom: 30px;
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

  .el-checkbox {
    margin-bottom: 15px;
  }

  .getMore {
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
  }

  .userCheckbox {
    max-height: 400px;
    overflow: auto;
  }

  /deep/ .el-dialog__body {
    padding: 0px 20px;
  }

  .dialogChoose {
    display: flex;
    margin-bottom: 15px;
  }
</style>
