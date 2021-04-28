<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>{{folderId != '' && folderId != undefined ? '编辑分类' : parentId != '' && parentId != undefined ? '添加子分类' :'新建分类'}}</span>
      </div>
      <div class="addUserContent">
        <el-form ref="categoryForm" :model="categoryForm" :rules="rules" class="demo-ruleForm">
          <el-row v-if="parentId != '' && parentId != undefined && parentName != undefined">
            <el-col :span="10">
              <el-form-item label="父部门名称:">
                <span class="fuName">{{parentName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="分类名称:" prop="folderName">
                <el-input size='small' v-model="categoryForm.folderName" placeholder="请输入分类名称" maxLength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="分类管理角色:" prop="folderManageRoleNames">
                <div class="addRoleDept">
                  <div class="otherDept">
                    <div class="chooseBox" v-for="(item,index) in cateManageList">
                      <span>{{item.roleName}}</span>
                      <i class="el-icon-close" @click="deleteCateManage(item,index)"></i>
                    </div>
                  </div>
                  <el-button class="addBtn" size="small" type="primary" @click="cateManageAdd(0)">+</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="分类查看角色:" prop="folderViewRoleNames">
                <div class="addRoleDept">
                  <div class="otherDept">
                    <div class="chooseBox" v-for="(item,index) in cateViewList">
                      <span>{{item.roleName}}</span>
                      <i class="el-icon-close" @click="deleteCateView(item,index)"></i>
                    </div>
                  </div>
                  <el-button class="addBtn" size="small" type="primary" @click="cateManageAdd(1)">+</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="文件管理角色:" prop="fileManageRoleNames">
                <div class="addRoleDept">
                  <div class="otherDept">
                    <div class="chooseBox" v-for="(item,index) in filesManageList">
                      <span>{{item.roleName}}</span>
                      <i class="el-icon-close" @click="deleteFileManage(item,index)"></i>
                    </div>
                  </div>
                  <el-button class="addBtn" size="small" type="primary" @click="cateManageAdd(2)">+</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="文件查看角色:" prop="fileViewRoleNames">
                <div class="addRoleDept">
                  <div class="otherDept">
                    <div class="chooseBox" v-for="(item,index) in filesViewList">
                      <span>{{item.roleName}}</span>
                      <i class="el-icon-close" @click="deleteFileView(item,index)"></i>
                    </div>
                  </div>
                  <el-button class="addBtn" size="small" type="primary" @click="cateManageAdd(3)">+</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!--密码-->
          <span v-if="allowSetPassword.twoAllow">
            <el-row>
              <el-col :span="10">
                <el-form-item label="新密码:" prop="password">
                  <el-input type="password" size='small' auto-complete="off" v-model="categoryForm.password" placeholder="请输入新密码"
                            maxLength="100"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="确认密码:" prop="confirmPassword">
                  <el-input type="password" size='small' auto-complete="off" v-model="categoryForm.confirmPassword" placeholder="请输入确认密码" maxLength="100"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </span>

        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <el-button size='small' type="primary" @click="addCateSubmit" v-if="folderId == '' || folderId == undefined && allowAdd.twoAllow">确定</el-button>
      <el-button size='small' type="primary" @click="editBtn" v-if="folderId != '' && folderId != undefined && allowUpdate.twoAllow">修改</el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>

    <!--  添加分类管理角色  -->
    <el-dialog
      title="添加分类管理角色"
      :visible.sync="cateManageShow"
      width="40%"
      v-dialogDrag
    >
      <el-tree
        :data="roleData"
        show-checkbox
        :expand-on-click-node="false"
        ref="cateManage"
        node-key="roleId"
        highlight-current
        :props="defaultPropsOperation"
        :default-checked-keys="cateManageRoles"
        @check-change="cateManageCheck"
      ></el-tree>
      <!--                  @check-change="checkChangePermission"-->
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="cateManageCancel(0)">取 消</el-button>
        <el-button size='small' type="primary" @click="cateManageOk(0)">确 定</el-button>
      </span>
    </el-dialog>

    <!--  添加分类查看角色  -->
    <el-dialog
      title="添加分类查看角色"
      :visible.sync="cateViewShow"
      width="40%"
      v-dialogDrag
    >
      <el-tree
        :data="roleData"
        show-checkbox
        :expand-on-click-node="false"
        ref="cateView"
        node-key="roleId"
        highlight-current
        :props="defaultPropsOperation"
        :default-checked-keys="cateViewRoles"
        @check-change="cateViewCheck"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="cateManageCancel(1)">取 消</el-button>
        <el-button size='small' type="primary" @click="cateManageOk(1)">确 定</el-button>
      </span>
    </el-dialog>

    <!--  添加文件管理角色  -->
    <el-dialog
      title="添加文件管理角色"
      :visible.sync="filesManageShow"
      width="40%"
      v-dialogDrag
    >
      <el-tree
        :data="roleData"
        show-checkbox
        :expand-on-click-node="false"
        ref="filesManage"
        node-key="roleId"
        highlight-current
        :props="defaultPropsOperation"
        :default-checked-keys="filesManageRoles"
        @check-change="filesManageCheck"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="cateManageCancel(2)">取 消</el-button>
        <el-button size='small' type="primary" @click="cateManageOk(2)">确 定</el-button>
      </span>
    </el-dialog>

    <!--  添加文件查看角色  -->
    <el-dialog
      title="添加文件查看角色"
      :visible.sync="filesViewShow"
      width="40%"
      v-dialogDrag
    >
      <el-tree
        :data="roleData"
        show-checkbox
        :expand-on-click-node="false"
        ref="filesView"
        node-key="roleId"
        highlight-current
        :props="defaultPropsOperation"
        :default-checked-keys="filesViewRoles"
        @check-change="filesViewCheck"
      ></el-tree>
      <!--                  @check-change="checkChangePermission"-->
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="cateManageCancel(3)">取 消</el-button>
        <el-button size='small' type="primary" @click="cateManageOk(3)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {addCategory, updateCategory, getCategoryInfo, getCateRoleList} from '@/api/fileManage'


  export default {
    name: 'AddClassify',
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.categoryForm.password && value === '') {
          callback(new Error('请输入新密码'))
        } else if (this.categoryForm.password && value !== this.categoryForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        categoryForm: {
          folderName: '',
          folderManageRoleIds: '',
          folderManageRoleNames: '',
          folderViewRoleIds: '',
          folderViewRoleNames: '',
          fileViewRoleIds: '',
          fileViewRoleNames: '',
          fileManageRoleIds: '',
          fileManageRoleNames: ''
        },
        rules: {
          folderName: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          password: [
            // { required: true, message: '请输入新密码', trigger: 'blur' },
            {min: 6, max: 16, message: '密码长度不能小于6位，不能大于16位', trigger: 'blur'},
          ],
          confirmPassword: [
            { validator: validatePass, trigger: 'blur' },
            // { required: true, message: '请输入确认密码', trigger: 'blur' },
            {min: 6, max: 16, message: '密码长度不能小于6位，不能大于16位', trigger: 'blur'},
          ]
        },
        folderId: '',
        levelNum: 0,
        parentId: 0,
        parentIds: '',
        defaultPropsOperation: {
          children: 'child',
          label: 'roleName',
          value: 'roleId'
        },
        cateManageRoles: [],
        cateViewRoles: [],
        filesManageRoles: [],
        filesViewRoles: [],
        roleData: [],
        cateManageShow: false,
        cateViewShow: false,
        filesManageShow: false,
        filesViewShow: false,
        cateManageList: [],
        storageCateManageList: [],
        cateViewList: [],
        storageCateViewList: [],
        filesManageList: [],
        storageFilesManageList: [],
        filesViewList: [],
        storageFilesViewList: [],
        allowAdd: this.authorityControl('SYSTEM:FILE:MANAGE','SYSTEM:FILE:FILECLASS','SYSTEM:FILE:FILECLASS:INSERT'),//新建文件分类
        allowUpdate: this.authorityControl('SYSTEM:FILE:MANAGE','SYSTEM:FILE:FILECLASS','SYSTEM:FILE:FILECLASS:UPDATE'),//更新文件分类
        allowDetail: this.authorityControl('SYSTEM:FILE:MANAGE','SYSTEM:FILE:FILECLASS','SYSTEM:FILE:FILECLASS:DETAILS'),//查看文件分类详情
        allowSetPassword: this.authorityControl('SYSTEM:FILE:MANAGE','SYSTEM:FILE:FILECLASS','SYSTEM:FILE:FILECLASS:SETPASSWORD'),//设置密码
      }
    },
    activated() {
      this.folderId = this.$route.query.folderId
      this.parentId = this.$route.query.parentId
      this.parentIds = this.$route.query.parentIds
      this.levelNum = this.$route.query.levelNum
      this.parentName = this.$route.query.parentName
      this.categoryForm.folderName = this.$route.query.folderName
      // && this.allowDetail.twoAllow
      if (this.folderId != undefined && this.folderId != '') {
        this.getCategoryDetail()
      }
    },
    // mounted() {
    //   this.folderId = this.$route.query.folderId
    //   this.parentId = this.$route.query.parentId
    //   this.parentIds = this.$route.query.parentIds
    //   this.levelNum = this.$route.query.levelNum
    //   this.parentName = this.$route.query.parentName
    //   this.categoryForm.folderName = this.$route.query.folderName
    //   if (this.folderId != undefined && this.folderId != '') {
    //     this.getCategoryDetail()
    //   }
    //   // this.getRoles();
    // },
    methods: {
      // 获取角色列表
      getRoles(num) {
        const params = {
          authorityType: num,
          companyId: this.$store.getters.companyId,
          folderId: this.folderId
        };
        getCateRoleList(params).then(res => {
          if (res.code == 200) {
            this.roleData = res.data;
            if (num == 1) {
              this.findAllChildren(this.roleData, this.cateManageRoles)
              // console.log('123',this.cateManageRoles);
            } else if (num == 2) {
              this.findAllChildren(this.roleData, this.cateViewRoles)
            } else if (num == 3) {
              this.findAllChildren(this.roleData, this.filesManageRoles)
            } else if (num == 4) {
              this.findAllChildren(this.roleData, this.filesViewRoles)
            }
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 遍历找出所有子节点
      findAllChildren(data, arr) {
        data.forEach((item, index) => {
          if (item.child) {
            if (item.child.length !== 0) {
              this.findAllChildren(item.child, arr)
            }
          }
          if (item.selected == true) {
            arr.push(item.roleId)
          }
        })
      },

      // 把两个数组组装成数组对象
      dataMerge(arr1, arr2) {
        let list = [];
        // for (let i = 0; i < arr1.length; i++) {
        //   const arr3 = []
        //   for (let k = 0; k < arr2.length; k++) {
        //     const rolesBox = {
        //       roleId: arr1[i],
        //       roleName: arr2[k]
        //     }
        //     arr3.push(rolesBox)
        //   }
        //   // return arr3
        //   list = arr3
        // }
        arr1.forEach((lists,index)=>{
          let arr3 = '';
          arr2.forEach((item,i) => {
            if(index == i){
              const rolesBox = {
                roleId: lists,
                roleName: item
              }
              arr3 = rolesBox
            }
          })
          list.push(arr3)
        })

        return list;
      },

      // 新增提交
      addCateSubmit() {
        this.$refs["categoryForm"].validate((valid) => {
          if(valid){
            if (this.categoryForm.folderName == '' || this.categoryForm.folderName == undefined) {
              this.$message({type: 'warning', message: '分类名称不能为空'})
              return
            }
            const params = {
              folderName: this.categoryForm.folderName,
              folderManageRoleIds: this.categoryForm.folderManageRoleIds,
              folderManageRoleNames: this.categoryForm.folderManageRoleNames,
              folderViewRoleIds: this.categoryForm.folderViewRoleIds,
              folderViewRoleNames: this.categoryForm.folderViewRoleNames,
              fileViewRoleIds: this.categoryForm.fileViewRoleIds,
              fileViewRoleNames: this.categoryForm.fileViewRoleNames,
              fileManageRoleIds: this.categoryForm.fileManageRoleIds,
              fileManageRoleNames: this.categoryForm.fileManageRoleNames,
              levelNum: this.levelNum == undefined || this.levelNum == '' ? 0 : this.levelNum,
              parentId: this.parentId == undefined || this.parentId == '' ? 0 : this.parentId,
              parentIds: this.parentIds == undefined || this.parentIds == '' ? '' : this.parentIds,
              companyId: this.$store.getters.companyId,
              password: this.categoryForm.password?this.categoryForm.password:"",
            }
            addCategory(params).then(res => {
              if (res.code == 200) {
                this.$message({type: 'success', message: '新建成功'})
                this.categoryForm = {
                  folderName: '',
                  folderManageRoleIds: '',
                  folderManageRoleNames: '',
                  folderViewRoleIds: '',
                  folderViewRoleNames: '',
                  fileViewRoleIds: '',
                  fileViewRoleNames: '',
                  fileManageRoleIds: '',
                  fileManageRoleNames: ''
                }
                this.cateManageList = []
                this.storageCateManageList = []
                this.cateViewList = []
                this.storageCateViewList = []
                this.filesManageList = []
                this.storageFilesManageList = []
                this.filesViewList = []
                this.storageFilesViewList = []
                this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/file/fileType');
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        })
      },

      // 编辑提交
      editBtn() {
        this.$refs["categoryForm"].validate((valid) => {
          if(valid){
            if (this.categoryForm.folderName == '' || this.categoryForm.folderName == undefined) {
              this.$message({type: 'warning', message: '分类名称不能为空'})
              return
            }
            const params = {
              folderName: this.categoryForm.folderName,
              folderId: this.folderId,
              folderManageRoleIds: this.categoryForm.folderManageRoleIds,
              folderManageRoleNames: this.categoryForm.folderManageRoleNames,
              folderViewRoleIds: this.categoryForm.folderViewRoleIds,
              folderViewRoleNames: this.categoryForm.folderViewRoleNames,
              fileViewRoleIds: this.categoryForm.fileViewRoleIds,
              fileViewRoleNames: this.categoryForm.fileViewRoleNames,
              fileManageRoleIds: this.categoryForm.fileManageRoleIds,
              fileManageRoleNames: this.categoryForm.fileManageRoleNames,
              levelNum: this.levelNum == undefined || this.levelNum == '' ? 0 : this.levelNum,
              parentId: this.parentId == undefined || this.parentId == '' ? 0 : this.parentId,
              parentIds: this.parentIds == undefined || this.parentIds == '' ? '' : this.parentIds,
              companyId: this.$store.getters.companyId,
              password: this.categoryForm.password?this.categoryForm.password:"",
            };
            // const enc = secret.Encrypt(JSON.stringify(params))
            updateCategory(params).then(res => {
              // updateCategory({a:enc}).then(res => {
              if (res.code == 200) {
                this.$message({type: 'success', message: '修改成功'})
                this.categoryForm = {
                  folderName: '',
                  folderManageRoleIds: '',
                  folderManageRoleNames: '',
                  folderViewRoleIds: '',
                  folderViewRoleNames: '',
                  fileViewRoleIds: '',
                  fileViewRoleNames: '',
                  fileManageRoleIds: '',
                  fileManageRoleNames: ''
                }
                this.cateManageList = []
                this.storageCateManageList = []
                this.cateViewList = []
                this.storageCateViewList = []
                this.filesManageList = []
                this.storageFilesManageList = []
                this.filesViewList = []
                this.storageFilesViewList = []
                this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/file/fileType');
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        })
      },

      // 分类管理打开弹窗 0:分类管理 1：分类查看 2：文件管理 3：文件查看
      cateManageAdd(num) {
        if (this.categoryForm.folderName == '' || this.categoryForm.folderName == undefined) {
          this.$message({type: 'warning', message: '请先填写分类名称'})
          return
        }

        this.getRoles(num + 1)
        if (num == 0) {
          this.cateManageShow = true
        } else if (num == 1) {
          this.cateViewShow = true
        } else if (num == 2) {
          this.filesManageShow = true
        } else if (num == 3) {
          this.filesViewShow = true
        }
      },

      // 弹窗确定按钮 0:分类管理 1：分类查看 2：文件管理 3：文件查看
      cateManageOk(num) {
        if (num == 0) {
          this.cateManageShow = false
          this.cateManageList = JSON.parse(JSON.stringify(this.storageCateManageList))
        } else if (num == 1) {
          this.cateViewShow = false
          this.cateViewList = JSON.parse(JSON.stringify(this.storageCateViewList))
        } else if (num == 2) {
          this.filesManageShow = false
          this.filesManageList = JSON.parse(JSON.stringify(this.storageFilesManageList))
        } else if (num == 3) {
          this.filesViewShow = false
          this.filesViewList = JSON.parse(JSON.stringify(this.storageFilesViewList))
        }

        // this.changeRole()
        if (this.cateManageList.length != 0) {
          let cateId = ''
          let cateName = ''
          for (let i = 0; i < this.cateManageList.length; i++) {
            cateId += this.cateManageList[i].roleId + ','
            cateName += this.cateManageList[i].roleName + ','
          }
          if (cateId.length > 0) {
            cateId = cateId.substr(0, cateId.length - 1)
          }
          if (cateName.length > 0) {
            cateName = cateName.substr(0, cateName.length - 1)
          }
          this.categoryForm.folderManageRoleIds = JSON.parse(JSON.stringify(cateId))
          this.categoryForm.folderManageRoleNames = JSON.parse(JSON.stringify(cateName))
        }
        if (this.cateViewList.length != 0) {
          let cateId = ''
          let cateName = ''
          for (let i = 0; i < this.cateViewList.length; i++) {
            cateId += this.cateViewList[i].roleId + ','
            cateName += this.cateViewList[i].roleName + ','
          }
          if (cateId.length > 0) {
            cateId = cateId.substr(0, cateId.length - 1)
          }
          if (cateName.length > 0) {
            cateName = cateName.substr(0, cateName.length - 1)
          }
          this.categoryForm.folderViewRoleIds = JSON.parse(JSON.stringify(cateId))
          this.categoryForm.folderViewRoleNames = JSON.parse(JSON.stringify(cateName))
        }
        if (this.filesManageList.length != 0) {
          let cateId = ''
          let cateName = ''
          // console.log(this.storageCateManageList)
          for (let i = 0; i < this.filesManageList.length; i++) {
            cateId += this.filesManageList[i].roleId + ','
            cateName += this.filesManageList[i].roleName + ','
          }
          if (cateId.length > 0) {
            cateId = cateId.substr(0, cateId.length - 1)
          }
          if (cateName.length > 0) {
            cateName = cateName.substr(0, cateName.length - 1)
          }
          this.categoryForm.fileManageRoleIds = JSON.parse(JSON.stringify(cateId))
          this.categoryForm.fileManageRoleNames = JSON.parse(JSON.stringify(cateName))
        }
        if (this.filesViewList.length != 0) {
          let cateId = ''
          let cateName = ''
          // console.log(this.storageCateManageList)
          for (let i = 0; i < this.filesViewList.length; i++) {
            cateId += this.filesViewList[i].roleId + ','
            cateName += this.filesViewList[i].roleName + ','
          }
          if (cateId.length > 0) {
            cateId = cateId.substr(0, cateId.length - 1)
          }
          if (cateName.length > 0) {
            cateName = cateName.substr(0, cateName.length - 1)
          }
          this.categoryForm.fileViewRoleIds = JSON.parse(JSON.stringify(cateId))
          this.categoryForm.fileViewRoleNames = JSON.parse(JSON.stringify(cateName))
        }
      },

      // 弹窗取消按钮 0:分类管理 1：分类查看 2：文件管理 3：文件查看
      cateManageCancel(num) {
        if (num == 0) {
          this.cateManageShow = false
        } else if (num == 1) {
          this.cateViewShow = false
        } else if (num == 2) {
          this.filesManageShow = false
        } else if (num == 3) {
          this.filesViewShow = false
        }
      },

      // 确定选择角色和删除已选角色使用
      // changeRole() {
      //   const params = {
      //     folderName: this.categoryForm.folderName,
      //     folderId: this.folderId,
      //     folderManageRoleIds: this.categoryForm.folderManageRoleIds,
      //     folderManageRoleNames: this.categoryForm.folderManageRoleNames,
      //     folderViewRoleIds: this.categoryForm.folderViewRoleIds,
      //     folderViewRoleNames: this.categoryForm.folderViewRoleNames,
      //     fileViewRoleIds: this.categoryForm.fileViewRoleIds,
      //     fileViewRoleNames: this.categoryForm.fileViewRoleNames,
      //     fileManageRoleIds: this.categoryForm.fileManageRoleIds,
      //     fileManageRoleNames: this.categoryForm.fileManageRoleNames,
      //     levelNum: this.levelNum == undefined || this.levelNum == '' ? 0 : this.levelNum,
      //     parentId: this.parentId == undefined || this.parentId == '' ? 0 : this.parentId,
      //     parentIds: this.parentIds == undefined || this.parentIds == '' ? '' : this.parentIds
      //   };
      //   // const enc = secret.Encrypt(JSON.stringify(params))
      //   updateCategory(params).then(res => {
      //     if (res.code == 200) {
      //
      //     }else{
      //       // this.$message({ type: 'error', message: 'sss' })
      //     }
      //   })
      // },

      // 分类管理树形
      cateManageCheck() {
        this.storageCateManageList = this.$refs.cateManage.getHalfCheckedNodes().concat(this.$refs.cateManage.getCheckedNodes());
        // let cateId = ''
        // let cateName = ''
        // // console.log(this.storageCateManageList)
        // for (let i = 0; i < this.storageCateManageList.length; i++) {
        //   cateId += this.storageCateManageList[i].roleId + ','
        //   cateName += this.storageCateManageList[i].roleName + ','
        // }
        // if (cateId.length > 0) {
        //   cateId = cateId.substr(0, cateId.length - 1)
        // }
        // if (cateName.length > 0) {
        //   cateName = cateName.substr(0, cateName.length - 1)
        // }
        // this.categoryForm.folderManageRoleIds = JSON.parse(JSON.stringify(cateId))
        // this.categoryForm.folderManageRoleNames = JSON.parse(JSON.stringify(cateName))
      },

      // 分类管理已选删除
      deleteCateManage(item, index) {
        this.cateManageList.splice(index, 1)
        const rolesId = []
        let cateId = ''
        let cateName = ''
        for (let i = 0; i < this.cateManageList.length; i++) {
          rolesId.push(this.cateManageList[i].roleId)
          cateId += this.cateManageList[i].roleId + ','
          cateName += this.cateManageList[i].roleName + ','
        }
        if (cateId.length > 0) {
          cateId = cateId.substr(0, cateId.length - 1)
        }
        if (cateName.length > 0) {
          cateName = cateName.substr(0, cateName.length - 1)
        }
        this.categoryForm.folderManageRoleIds = JSON.parse(JSON.stringify(cateId))
        this.categoryForm.folderManageRoleNames = JSON.parse(JSON.stringify(cateName))
        this.$refs.cateManage.setCurrentKey(rolesId)
        // this.changeRole()
      },

      // 分类查看角色树形
      cateViewCheck() {
        this.storageCateViewList = this.$refs.cateView.getHalfCheckedNodes().concat(this.$refs.cateView.getCheckedNodes())
        // let cateId = ''
        // let cateName = ''
        // for (let i = 0; i < this.storageCateViewList.length; i++) {
        //   cateId += this.storageCateViewList[i].roleId + ','
        //   cateName += this.storageCateViewList[i].roleName + ','
        // }
        // if (cateId.length > 0) {
        //   cateId = cateId.substr(0, cateId.length - 1)
        // }
        // if (cateName.length > 0) {
        //   cateName = cateName.substr(0, cateName.length - 1)
        // }
        // this.categoryForm.folderViewRoleIds = JSON.parse(JSON.stringify(cateId))
        // this.categoryForm.folderViewRoleNames = JSON.parse(JSON.stringify(cateName))
      },

      // 分类查看已选删除
      deleteCateView(item, index) {
        this.cateViewList.splice(index, 1)
        const rolesId = []
        let cateId = ''
        let cateName = ''
        for (let i = 0; i < this.cateViewList.length; i++) {
          rolesId.push(this.cateViewList[i].roleId)
          cateId += this.cateViewList[i].roleId + ','
          cateName += this.cateViewList[i].roleName + ','
        }
        if (cateId.length > 0) {
          cateId = cateId.substr(0, cateId.length - 1)
        }
        if (cateName.length > 0) {
          cateName = cateName.substr(0, cateName.length - 1)
        }
        this.categoryForm.folderViewRoleIds = JSON.parse(JSON.stringify(cateId))
        this.categoryForm.folderViewRoleNames = JSON.parse(JSON.stringify(cateName))
        this.$refs.cateView.setCheckedKeys(rolesId)
        // this.changeRole()
      },

      // 文件管理角色树形
      filesManageCheck() {
        this.storageFilesManageList = this.$refs.filesManage.getHalfCheckedNodes().concat(this.$refs.filesManage.getCheckedNodes())
        // let fileId = ''
        // let fileName = ''
        // for (let i = 0; i < this.storageFilesManageList.length; i++) {
        //   fileId += this.storageFilesManageList[i].roleId + ','
        //   fileName += this.storageFilesManageList[i].roleName + ','
        // }
        // if (fileId.length > 0) {
        //   fileId = fileId.substr(0, fileId.length - 1)
        // }
        // if (fileName.length > 0) {
        //   fileName = fileName.substr(0, fileName.length - 1)
        // }
        // this.categoryForm.fileManageRoleIds = JSON.parse(JSON.stringify(fileId))
        // this.categoryForm.fileManageRoleNames = JSON.parse(JSON.stringify(fileName))
      },

      // 文件管理已选删除
      deleteFileManage(item, index) {
        this.filesManageList.splice(index, 1)
        const rolesId = []
        let cateId = ''
        let cateName = ''
        for (let i = 0; i < this.filesManageList.length; i++) {
          rolesId.push(this.filesManageList[i].roleId)
          cateId += this.filesManageList[i].roleId + ','
          cateName += this.filesManageList[i].roleName + ','
        }
        if (cateId.length > 0) {
          cateId = cateId.substr(0, cateId.length - 1)
        }
        if (cateName.length > 0) {
          cateName = cateName.substr(0, cateName.length - 1)
        }
        this.categoryForm.fileManageRoleIds = JSON.parse(JSON.stringify(cateId))
        this.categoryForm.fileManageRoleNames = JSON.parse(JSON.stringify(cateName))
        this.$refs.filesManage.setCheckedKeys(rolesId)
        // this.changeRole()
      },

      // 文件查看角色树形
      filesViewCheck() {
        this.storageFilesViewList = this.$refs.filesView.getHalfCheckedNodes().concat(this.$refs.filesView.getCheckedNodes())
        // let fileId = ''
        // let fileName = ''
        // for (let i = 0; i < this.storageFilesViewList.length; i++) {
        //   fileId += this.storageFilesViewList[i].roleId + ','
        //   fileName += this.storageFilesViewList[i].roleName + ','
        // }
        // if (fileId.length > 0) {
        //   fileId = fileId.substr(0, fileId.length - 1)
        // }
        // if (fileName.length > 0) {
        //   fileName = fileName.substr(0, fileName.length - 1)
        // }
        // this.categoryForm.fileViewRoleIds = JSON.parse(JSON.stringify(fileId))
        // this.categoryForm.fileViewRoleNames = JSON.parse(JSON.stringify(fileName))
      },

      // 文件查看已选删除
      deleteFileView(item, index) {
        this.filesViewList.splice(index, 1)
        const rolesId = []
        let cateId = ''
        let cateName = ''
        for (let i = 0; i < this.filesViewList.length; i++) {
          rolesId.push(this.filesViewList[i].roleId)
          cateId += this.filesViewList[i].roleId + ','
          cateName += this.filesViewList[i].roleName + ','
        }
        if (cateId.length > 0) {
          cateId = cateId.substr(0, cateId.length - 1)
        }
        if (cateName.length > 0) {
          cateName = cateName.substr(0, cateName.length - 1)
        }
        this.categoryForm.fileViewRoleIds = JSON.parse(JSON.stringify(cateId))
        this.categoryForm.fileViewRoleNames = JSON.parse(JSON.stringify(cateName))
        this.$refs.filesView.setCheckedKeys(rolesId)
        // this.changeRole()
      },

      // 获取分类详情
      getCategoryDetail() {
        const params = {
          folderId: this.folderId,
          folderName: this.categoryForm.folderName
        }

        if(this.allowDetail.twoAllow){
          getCategoryInfo(params).then(res => {
            if (res.code == 200) {
              this.categoryForm = {
                folderName: res.data.folderName,
                folderManageRoleIds: res.data.folderManageRoleIds,
                folderManageRoleNames: res.data.folderManageRoleNames,
                folderViewRoleIds: res.data.folderViewRoleIds,
                folderViewRoleNames: res.data.folderViewRoleNames,
                fileManageRoleIds: res.data.fileManageRoleIds,
                fileManageRoleNames: res.data.fileManageRoleNames,
                fileViewRoleIds: res.data.fileViewRoleIds,
                fileViewRoleNames: res.data.fileViewRoleNames
              }
              // this.categoryForm.folderName = data.folderName
              // this.categoryForm.folderManageRoleIds = data.folderManageRoleIds
              // this.categoryForm.folderManageRoleNames = data.folderManageRoleNames
              // this.categoryForm.folderViewRoleIds = data.folderViewRoleIds
              // this.categoryForm.folderViewRoleNames = data.folderViewRoleNames
              // this.categoryForm.fileManageRoleIds = data.fileManageRoleIds
              // this.categoryForm.fileManageRoleNames = data.fileManageRoleNames
              // this.categoryForm.fileViewRoleIds = data.fileViewRoleIds
              // this.categoryForm.fileViewRoleNames = data.fileViewRoleNames
              if (res.data.folderManageRoleIds != null) {
                if (res.data.folderManageRoleIds.indexOf(',') != -1) {
                  var cateManageIdList = res.data.folderManageRoleIds.split(',')
                } else {
                  var cateManageIdList = [res.data.folderManageRoleIds]
                }
              }

              if (res.data.folderManageRoleNames != null) {
                if (res.data.folderManageRoleNames.indexOf(',') != -1) {
                  var cateManageNameList = res.data.folderManageRoleNames.split(',')
                } else {
                  var cateManageNameList = [res.data.folderManageRoleNames]
                }
              }

              if (res.data.folderViewRoleIds != null) {
                if (res.data.folderViewRoleIds.indexOf(',') != -1) {
                  var cateViewIdList = res.data.folderViewRoleIds.split(',')
                } else {
                  var cateViewIdList = [res.data.folderViewRoleIds]
                }
              }

              if (res.data.folderViewRoleNames != null) {
                if (res.data.folderViewRoleNames.indexOf(',') != -1) {
                  var cateViewNameList = res.data.folderViewRoleNames.split(',')
                } else {
                  var cateViewNameList = [res.data.folderViewRoleNames]
                }
              }

              if (res.data.fileManageRoleIds != null) {
                if (res.data.fileManageRoleIds.indexOf(',') != -1) {
                  var fileManageIdList = res.data.fileManageRoleIds.split(',')
                } else {
                  var fileManageIdList = [res.data.fileManageRoleIds]
                }
              }

              if (res.data.fileManageRoleNames != null) {
                if (res.data.fileManageRoleNames.indexOf(',') != -1) {
                  var fileManageNameList = res.data.fileManageRoleNames.split(',')
                } else {
                  var fileManageNameList = [res.data.fileManageRoleNames]
                }
              }

              if (res.data.fileViewRoleIds != null) {
                if (res.data.fileViewRoleIds.indexOf(',') != -1) {
                  var fileViewIdList = res.data.fileViewRoleIds.split(',')
                } else {
                  var fileViewIdList = [res.data.fileViewRoleIds]
                }
              }

              if (res.data.fileViewRoleNames != null) {
                if (res.data.fileViewRoleNames.indexOf(',') != -1) {
                  var fileViewNameList = res.data.fileViewRoleNames.split(',')
                } else {
                  var fileViewNameList = [res.data.fileViewRoleNames]
                }
              }

              if (cateManageIdList != '' && cateManageIdList != null && cateManageIdList != undefined) {
                this.cateManageList = this.dataMerge(cateManageIdList, cateManageNameList)
              }
              // console.log('222',cateViewIdList)
              if (cateViewIdList != '' && cateViewIdList != null && cateViewIdList != undefined) {
                this.cateViewList = this.dataMerge(cateViewIdList, cateViewNameList)
              }
              if (fileManageIdList != '' && fileManageIdList != null && fileManageIdList != undefined) {
                this.filesManageList = this.dataMerge(fileManageIdList, fileManageNameList)
              }
              if (fileViewIdList != '' && fileViewIdList != null && fileViewIdList != undefined) {
                this.filesViewList = this.dataMerge(fileViewIdList, fileViewNameList)
              }



            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取此详情')
        }
      },

      // 返回
      cancelSub() {
        this.categoryForm = {
          folderName: '',
          folderManageRoleIds: '',
          folderManageRoleNames: '',
          folderViewRoleIds: '',
          folderViewRoleNames: '',
          fileViewRoleIds: '',
          fileViewRoleNames: '',
          fileManageRoleIds: '',
          fileManageRoleNames: ''
        }
        this.cateManageList = []
        this.storageCateManageList = []
        this.cateViewList = []
        this.storageCateViewList = []
        this.filesManageList = []
        this.storageFilesManageList = []
        this.filesViewList = []
        this.storageFilesViewList = []
        this.folderId = ''
        this.levelNum = 0
        this.parentId = 0
        this.parentIds = ''
        this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/file/fileType');
      }
    }
  }
</script>

<style scoped>
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

  /deep/ .el-form-item {
    display: flex;
    margin-right: 115px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    line-height: normal;
    align-items: center;
    display: flex;
  }

  /deep/ .el-form-item__label {
    min-width: 107px;
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

  .fuName {
    font-size: 14px;
    color: #ccc;
  }

  .chooseRoleTree {
    border: 1px solid #DCDFE6;
    padding: 10px;
    border-radius: 4px;
    width: 100%;
  }

  .addRoleDept {
    display: flex;
    flex: 1;
  }

  .otherDept {
    border: 1px solid #C0C4CC;
    padding: 10px;
    border-radius: 4px;
    flex: 1;
    margin-right: 15px;
    display: flex;
    flex-wrap: wrap;
  }

  .chooseBox {
    background: #FD903C;
    color: #fff;
    line-height: normal;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .chooseBox:last-child {
    margin-right: 0;
  }

  .chooseBox i {
    cursor: pointer;
  }

  .addBtn {
    height: 35px;
    font-size: 16px;
  }

</style>
