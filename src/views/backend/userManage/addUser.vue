<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>{{userId == '' || userId == undefined ? '添加用户' : '编辑用户'}}</span>
      </div>
      <div class="addUserContent">
        <el-form ref="addUserMan" :model="addUserMan" :rules="rules" class="demo-ruleForm">
<!--          <el-row>-->
<!--            <el-col :span="12">-->
<!--              <el-form-item label="用户账号:" prop="loginName">-->
<!--                <div class="userLogin" v-if="userId == undefined || userId == '' && !detail">-->
<!--                  <div class="chooseBox" v-for="item in this.addUserMan.userId">-->
<!--                    <span>{{item.userName}}</span>-->
<!--                    <i class="el-icon-close" @click="deleteUser(item)"></i>-->
<!--                  </div>-->
<!--                  <input type="text" v-model="addUserMan.loginName" @input="getUserInfo" placeholder="请输入账号(不少于6位字符)"/>-->
<!--                </div>-->
<!--                <span v-else>{{addUserMan.loginName}}</span>-->
<!--                <div class="userList" v-if="userList != ''">-->
<!--                  <i class="listJt el-icon-arrow-up"></i>-->
<!--                  <div class="userBox" v-for="item in userList" @click="chooseUser(item)">-->
<!--                    <div class="userAvatar">-->
<!--                      <el-avatar :size="40" :src="item.avatar ? item.avatar : circleUrl"></el-avatar>-->
<!--                    </div>-->
<!--                    <div class="userName">{{item.userName}}</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <div v-if="userId != undefined && userId != ''">-->
          <div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户账号:" prop="loginName">
                  <el-input v-if="userId == undefined || userId == ''" v-model.trim="addUserMan.loginName" maxlength="50" placeholder="请输入用户账号"></el-input>
                  <span v-else>{{addUserMan.loginName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户名称:" prop="userName">
                  <el-input v-if="userId == undefined || userId == ''" v-model.trim="addUserMan.userName" maxlength="50" placeholder="请输入用户名"></el-input>
                  <span v-else>{{addUserMan.userName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码:" prop="phoneNumber">
                  <el-input v-if="userId == undefined || userId == ''" type="number" v-model.trim="addUserMan.phoneNumber" maxlength="11" placeholder="请输入手机号码"></el-input>
                  <span v-else>{{addUserMan.phoneNumber}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="userId == undefined || userId == ''">
              <el-col :span="12">
                <el-form-item label="登录密码:" prop="loginPassword">
                  <el-input type="password" v-model.trim="addUserMan.loginPassword" maxlength="16" placeholder="请输入登录密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="userId == undefined || userId == ''">
              <el-col :span="12">
                <el-form-item label="确认密码:" prop="reLoginPassword">
                  <el-input type="password" v-model.trim="addUserMan.reLoginPassword" maxlength="16" placeholder="请再次确认密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
<!--              <el-col :span="7">-->
<!--                <el-form-item label="邮箱:" prop="userName">-->
<!--                  <span>{{addUserMan.userEmail}}</span>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
              <el-col :span="7">
                <el-form-item label="性别:" prop="userSex">
                  <el-radio-group v-if="userId == undefined || userId == ''" v-model="addUserMan.userSex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                  <span v-else>{{addUserMan.userSex == 1 ? '男' : addUserMan.userSex == 0 ? '女' : '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="7">
              <!--              v-model="addUserMan.defaultDeptId"-->
              <el-form-item label="默认部门:" prop="defaultDeptName">
                <el-cascader size='small' v-model="addUserMan.defaultDeptId" @change="chooseDept" ref="deptName"
                             placeholder="默认部门"
                             :options="companyList"
                             :props="{ checkStrictly: true,value:'deptId',label:'deptName',children:'child' }"
                             clearable v-if="!detail"></el-cascader>
                <span v-else>{{addUserMan.defaultDeptName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="其他部门:" prop="otherUserDepts">
                <div class="addRoleDept">
                  <div class="otherDept">
                    <div class="chooseBox" v-for="(item,index) in deptList" :key="index">
                      <span>{{item.deptName}}</span>
                      <i class="el-icon-close" @click="deleteDeptBox(index)" v-if="!detail"></i>
                    </div>
                  </div>
                  <el-button class="addBtn" size="small" type="primary" @click="addDepts" v-if="!detail">+</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色:" prop="roles">
                <div class="addRoleDept">
                  <div class="otherDept">
                    <div class="chooseBox" v-for="(item,index) in roles" :key="index">
                      <span>{{item.roleName}}</span>
                      <i class="el-icon-close" @click="deleteRole(item,index)" v-if="!detail"></i>
                    </div>
                  </div>
                  <el-button class="addBtn" size="small" type="primary" @click="addRoles" v-if="!detail">+</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="工号:" prop="jobNo">
                <el-input placeholder="请输入工号" v-model.trim="addUserMan.jobNo" maxlength="10"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="级别:" prop="jobLevel">
                <el-select v-model="addUserMan.jobLevel">
                  <el-option
                    v-for="item in userLevelList"
                    :label="item.dictName"
                    :value="item.dictId"
                    :key="item.dictId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位:" prop="jobPost">
                <el-select v-model="addUserMan.jobPost">
                  <el-option
                    v-for="item in userPositionList"
                    :label="item.dictName"
                    :value="item.dictId"
                    :key="item.dictId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="是否在职:">
                <el-select v-model="addUserMan.userStateNum">
                  <el-option v-for="item in isUserStateList"
                          :value="item.value"
                          :label="item.label"
                          :key="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--客户标签-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户标签:">
                <el-select  v-model="addUserMan.personnelTag" placeholder="用户标签" clearable multiple>
                  <el-option v-for="item in personnelTagList" :key="item.dictId" :label="item.dictName" :value="item.dictId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--简历-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="简历:">
<!--                +addUserMan.personnelResume.length-->
                <el-tooltip class="item" effect="light" :content="'字符长度'" placement="bottom-end">
                  <el-input type="textarea" placeholder="请输入简历,不得超过800字符" v-model="addUserMan.personnelResume" maxlength="800"/>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
<!--          &lt;!&ndash;备注&ndash;&gt;-->
<!--          <el-row>-->
<!--            <el-col :span="12">-->
<!--              <el-form-item label="备注:">-->
<!--                <el-input type="textarea" placeholder="请输入备注" v-model.trim="addUserMan.personnelRemarks" maxlength="500"/>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
          <!--头像-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="微信二维码:">
                <div style="display: flex;align-items: center;">
                  <ul class="file-list" style="margin: 0;padding: 0;">
                    <li v-for="(item,index) in wxImgList" @mousemove="filesWxImgOver(index)" @mouseout="filesWxImgOut(index)">
                      <el-image :src="item.fileUrl" :preview-src-list="[item.fileUrl]"  fit="cover"	  @click.stop="" style="width: 100px;height: 100px;line-height: 110px;" />
                    </li>
                  </ul>
                  <el-upload :http-request="handleCheckWxImgUpload" class="upload-pic" :file-list="wxImgList"
                             :show-file-list="false" action="" accept=".jpg,.png,.JPG,.JPEG">
                    <i class="icon-plus el-icon-plus"></i>
                  </el-upload>
                </div>
                <p style="font-size:12px;color:#ff3f4b;line-height: normal">
                  限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}
                </p>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="头像:">
                <div style="display: flex;align-items: center;">
                  <ul class="file-list" style="margin: 0;padding: 0;">
                    <li v-for="(item,index) in headImgList" @mousemove="filesHeadImgOver(index)" @mouseout="filesHeadImgOut(index)">
                      <el-image :src="item.fileUrl" :preview-src-list="[item.fileUrl]"  fit="cover"	  @click.stop="" style="width: 100px;height: 100px;line-height: 110px;" />
                    </li>
                  </ul>
                  <el-upload :http-request="handleCheckHeadImgUpload" class="upload-pic" :file-list="headImgList"
                             :show-file-list="false" action="" accept=".jpg,.png,.JPG,.JPEG">
                    <i class="icon-plus el-icon-plus"></i>
                  </el-upload>
                </div>
                <p style="font-size:12px;color:#ff3f4b;line-height: normal">
                  限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}
                </p>
              </el-form-item>
            </el-col>
          </el-row>
          <!--全身照-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="全身照:">
                <div style="display: flex;align-items: center;">
                  <ul class="file-list" style="margin: 0;padding: 0;">
                    <li v-for="(item,index) in bodyImgList" @mousemove="filesBodyImgOver(index)" @mouseout="filesBodyImgOut(index)">
                      <el-image :src="item.fileUrl" :preview-src-list="[item.fileUrl]"  fit="cover"	  @click.stop="" style="width: 100px;height: 100px;line-height: 110px;" />
                    </li>
                  </ul>
                  <el-upload :http-request="handleCheckBodyImgUpload" class="upload-pic" :file-list="bodyImgList"
                             :show-file-list="false" action="" accept=".jpg,.png,.JPG,.JPEG">
                    <i class="icon-plus el-icon-plus"></i>
                  </el-upload>
                </div>
                <p style="font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <el-button size='small' type="primary" @click="addUserData('addUserMan')"
                 v-if="userId == '' || userId == undefined && !detail && allowAdd.twoAllow">确定
      </el-button>
      <el-button size='small' type="primary" @click="editSubmit('addUserMan')"
                 v-if="userId != '' && userId != undefined && !detail && allowUpdate.twoAllow">修改
      </el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>

    <!--  部门添加弹窗  -->
    <el-dialog
      title="添加部门"
      :visible.sync="deptDialog"
      width="40%"
    >
      <el-tree
        :data="companyList"
        show-checkbox
        ref="dept"
        node-key="deptId"
        highlight-current
        :props="defaultPropsDept"
        :default-checked-keys="resourceCheckedKey"
        @check-change="checkChangeDept"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="cancelDialog(1)">取 消</el-button>
        <el-button size='small' type="primary" @click="okChoose(1)">确 定</el-button>
      </span>
    </el-dialog>

    <!--  角色添加弹窗  -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-tree
        :data="roleData"
        show-checkbox
        ref="role"
        node-key="roleId"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="defaultRole"
        @check-change="handleCheckChange"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' @click="cancelDialog(0)">取 消</el-button>
        <el-button size='small' type="primary" @click="okChoose(0)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="用户列表"
      :visible.sync="successData"
      width="50%"
    >
      <el-table
        :data="sucUserList"
        style="width: 100%">
        <el-table-column
          prop="loginName"
          label="登陆账号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userSex"
          label="性别"
          width="140"
        >
          <template slot-scope="scope">
            <span>{{scope.row.userSex == 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱">
        </el-table-column>
        <el-table-column label="提示">
          <template slot-scope="scope">
            <span>{{scope.row.existUser == 1 ? '该公司已存在此用户' : '添加成功'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
<!--        <el-button size='small' @click="cancelDialog(0)">取 消</el-button>-->
        <el-button size='small' type="primary" @click="userOkadd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {commonDict,getFileListWithFileIds,addFileBatch} from '@/api/utils.js'
  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {intellectualUpload} from '@/utils/uploadPathMethods'
  import {queryUser, addUser, getCompanyRole, getUserInfo, editUserById} from '@/api/userManage.js'
  import {getDepartmentTree, queryOtherDept} from '@/api/department.js'


  export default {
    // name: "addUser",
    data() {
      //验证密码
      const pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
      const isPwd = (rule, value, callback) => {
        if (!pwd.test(value)) {
          return callback(new Error('密码要求6-16个字符，至少1个大写字母和1个小写字母'))
        } else {
          callback()
        }
      }
      // 再次验证密码
      const validatePass2 = (rule, value, callback) => {
        if (value !== this.addUserMan.loginPassword) {
          return callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      // 手机号验证
      const telephone_number = /^1[3456789]\d{9}$/
      const isTelephoneNumber = (rule, value, callback) => {
        if (!telephone_number.test(value)) {
          return callback(new Error('请输入正确格式的手机号码'))
        } else {
          callback()
        }
      }
      return {
        addUserMan: {
          loginName: '',
          defaultDeptName: '',
          defaultDeptId: '',
          otherUserDepts: [],
          roles: [],
          userId: [{userId: -1}],
          phoneNumber: '',
          userEmail: '',
          userName: '',
          userSex: '',
          jobNo: "",
          jobPost: "",
          jobLevel: "",
          userStateNum:"",
          loginPassword:'',
          personnelResume:'',
        },
        rules: {
          loginName: [
            {required: true, message: '请输入用户账号', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          phoneNumber: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {validator: isTelephoneNumber, trigger: 'blur'}
          ],
          loginPassword: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度不能小于6位', trigger: 'blur'},
            {validator: isPwd, trigger: 'blur'}
          ],
          reLoginPassword: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度不能小于6位', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          defaultDeptName: [
            {required: true, message: '请选择默认部门', trigger: 'blur'},
          ],
          roles: [
            {required: true, message: '请选择角色，最少一个', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          // jobNo: [
          //   {required: true, message: '请填写工号', trigger: 'blur'}
          // ],
          // jobLevel: [
          //   {required: true, message: '请选择级别', trigger: 'blur'}
          // ],
          // jobPost: [
          //   {required: true, message: '请选择岗位', trigger: 'blur'}
          // ]
        },
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userList: [],
        // addUserList: [],
        companyList: [],
        dialogVisible: false,
        deptDialog: false,
        successData: false,
        roleData: [],
        defaultProps: {
          children: 'child',
          label: 'roleName',
          value: 'roleId'
        },
        defaultPropsDept: {
          children: 'child',
          label: 'deptName',
          value: 'deptId',
          checked: 'selected'
        },
        roles: [],
        deptList: [],
        tempRoles: [],
        tempDeptList: [],
        sucUserList: [],
        halfDept: [],
        newDeptList: [],
        userId: '',
        resourceCheckedKey: [],
        defaultRole: [],
        userLevelList: [],
        userPositionList: [],
        detail: false,
        isUserStateList: [
          {
            value: 2,
            label: '否'
          },
          {
            value: 1,
            label: '是'
          },
        ],
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MAAGE:INSERT'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:USER_MANAGE:MANAGE', 'SYSTEM:USER_MANAGE:UPDATE'),
        personnelTagList:[], // 用户标签
        wxImgList: [], // 微信二维码附件列表
        headImgList: [], // 头像附件列表
        bodyImgList: [], // 全身照附件列表
      }
    },
    activated() {
      this.getUserLevelDictory();
      this.companyId = this.$store.getters.companyId
      this.userId = this.$route.query.userId
      this.detail = this.$route.query.detail
      if (!this.detail) {
        this.getRoles()
      }
      if (this.userId != undefined && this.userId != '') {
        this.getUserDetail()
        this.getUserDept()
      } else {
        this.getCompanyList()
      }
    },
    methods: {
      //获取字典级别
      getUserLevelDictory() {
        commonDict({keyList: 'DICT:USER_LEVEL,DICT:USER_POSITION'}).then(res => {
          if (res.code === 200) {
            this.userLevelList = res.data['DICT:USER_LEVEL'];
            this.userPositionList = res.data['DICT:USER_POSITION']
          }
        })
        // 获取自定义字典
        commonDict({keyList: 'DICT:PERSONNEL_TAG', companyId: "697480101377343488"}).then(res => {
          if (res.code === 200) {
            this.personnelTagList = res.data['DICT:PERSONNEL_TAG']
          }
        })
      },
      // 返回
      cancelSub() {
        this.companyId = ''
        this.addUserMan.defaultDeptId = ''
        this.addUserMan.defaultDeptName = ''
        this.addUserMan.otherUserDepts = []
        this.addUserMan.roles = []
        this.addUserMan.userId = []
        this.addUserMan.loginName = ''
        this.roles = []
        this.deptList = []
        this.tempRoles = []
        this.tempDeptList = []
        this.sucUserList = []

        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/userManage');
      },

      // 获取用户信息列表
      // getUserInfo() {
      //   var params = {
      //     loginName: this.addUserMan.loginName
      //   }
      //   queryUser(params).then(res => {
      //     if (res.code == 200) {
      //       this.userList = res.data
      //     } else {
      //       this.$message({type: 'error', message: res.message})
      //     }
      //   })
      // },

      // 提交新增
      addUserData(formName) {
        // if (this.addUserMan.userId == '' || this.addUserMan.userId == undefined) {
        //   this.$message({ type: 'warning', message: '用户账号为空或没有此用户' })
        //   return
        // }
        // if (this.addUserMan.loginName == '' || this.addUserMan.loginName == undefined) {
        //   this.$message({type: 'warning', message: '请选择最少一个用户'})
        //   return
        // }
        // if (this.addUserMan.defaultDeptId == '' || this.addUserMan.defaultDeptId == undefined) {
        //   this.$message({type: 'warning', message: '请选择默认部门'})
        //   return
        // }
        if (this.addUserMan.roles == '' || this.addUserMan.roles == undefined) {
          this.$message({type: 'warning', message: '请选择角色'})
          return
        }
        if (this.addUserMan.otherUserDepts != '') {
          this.addUserMan.otherUserDepts.forEach(item => {
            if (this.addUserMan.defaultDeptId === item.deptId) { // 对象里的唯一标识id
              this.$message({type: 'warning', message: '默认部门跟其他部门不能相冲突！'})
              return
            }
          })
        }

        // 处理用户标签列表
        if(this.addUserMan.personnelTag){
          this.addUserMan.personnelTag = this.addUserMan.personnelTag.join(",")
        }
        // 微信二维码
        this.addUserMan.wxImg = ""
        if (this.wxImgList.length !== 0) {
          let fileIdArr = this.wxImgList.map(item => {
            return item.fileId
          })
          this.addUserMan.wxImg = fileIdArr.join(',')
        }
        // 头像
        this.addUserMan.headImg = ""
        if (this.headImgList.length !== 0) {
          let fileIdArr = this.headImgList.map(item => {
            return item.fileId
          })
          this.addUserMan.headImg = fileIdArr.join(',')
        }
        // 全身照
        this.addUserMan.bodyImg = ""
        if (this.bodyImgList.length !== 0) {
          let fileIdArr = this.bodyImgList.map(item => {
            return item.fileId
          })
          this.addUserMan.bodyImg = fileIdArr.join(',')
        }

        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            // const params = {
            //   companyId: this.companyId,
            //   defaultDeptId: this.addUserMan.defaultDeptId,
            //   defaultDeptName: this.addUserMan.defaultDeptName,
            //   otherUserDepts: this.addUserMan.otherUserDepts,
            //   roles: this.addUserMan.roles,
            //   userId: this.addUserMan.userId,
            //   jobNo: this.addUserMan.jobNo,
            //   jobLevel: this.addUserMan.jobLevel,
            //   jobPost: this.addUserMan.jobPost,
            //   userStateNum: this.addUserMan.userStateNum,
            //   userName: this.addUserMan.userName,
            //   phoneNumber: this.addUserMan.phoneNumber,
            //   loginPassword: this.addUserMan.loginPassword,
            //   userSex: this.addUserMan.userSex,
            //   loginName: this.addUserMan.loginName
            // };

            addUser(this.addUserMan).then(res => {
              if (res.code == 200) {
                // this.successData = true
                // this.sucUserList = res.data;
                this.companyId = ''
                this.addUserMan = {
                  loginName: '',
                  defaultDeptName: '',
                  defaultDeptId: '',
                  otherUserDepts: [],
                  roles: [],
                  userId: [{ userId: -1 }],
                  phoneNumber: '',
                  userEmail: '',
                  userName: '',
                  userSex: '',
                  jobNo: '',
                  jobPost: '',
                  jobLevel: '',
                  userStateNum: '',
                  loginPassword: '',
                  personnelResume: ''
                }
                this.roles = []
                this.deptList = []
                this.tempRoles = []
                this.tempDeptList = []
                this.sucUserList = []

                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/userManage');
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          } else {
            return false
          }
        })
      },

      // 编辑提交
      editSubmit() {
        // if (this.addUserMan.userId == '' || this.addUserMan.userId == undefined) {
        //   this.$message({type: 'warning', message: '用户账号为空'})
        //   return
        // }
        if (this.addUserMan.defaultDeptId == '' || this.addUserMan.defaultDeptId == undefined) {
          this.$message({type: 'warning', message: '请选择默认部门'})
          return
        }
        if (this.addUserMan.roles == '' || this.addUserMan.roles == undefined) {
          this.$message({type: 'warning', message: '请选择角色'})
          return
        }
        if (this.addUserMan.otherUserDepts != '') {
          this.addUserMan.otherUserDepts.forEach(item => {
            if (this.addUserMan.defaultDeptId === item.deptId) { // 对象里的唯一标识id
              this.$message({type: 'warning', message: '默认部门跟其他部门不能相冲突！'})
              return
            }
          })
        }

        const userId = {
          userId: this.userId
        }
        this.addUserMan.userId = []
        this.addUserMan.userId.push(userId)

        // const params = {
        //   companyId: this.companyId,
        //   defaultDeptId: this.addUserMan.defaultDeptId,
        //   defaultDeptName: this.addUserMan.defaultDeptName,
        //   otherUserDepts: this.addUserMan.otherUserDepts,
        //   roles: this.addUserMan.roles,
        //   userId: this.addUserMan.userId,
        //   jobNo: this.addUserMan.jobNo,
        //   jobLevel: this.addUserMan.jobLevel,
        //   jobPost: this.addUserMan.jobPost,
        //   userStateNum: this.addUserMan.userStateNum,
        //   userName: this.addUserMan.userName,
        //   phoneNumber: this.addUserMan.phoneNumber,
        //   loginPassword: this.addUserMan.loginPassword,
        //   userSex: this.addUserMan.userSex,
        // }

        // 处理用户标签列表
        if(this.addUserMan.personnelTag){
          this.addUserMan.personnelTag = this.addUserMan.personnelTag.join(",")
        }
        // 微信二维码
        this.addUserMan.wxImg = ""
        if (this.wxImgList.length !== 0) {
          let fileIdArr = this.wxImgList.map(item => {
            return item.fileId
          })
          this.addUserMan.wxImg = fileIdArr.join(',')
        }

        // 头像
        this.addUserMan.headImg = ""
        if (this.headImgList.length !== 0) {
          let fileIdArr = this.headImgList.map(item => {
            return item.fileId
          })
          this.addUserMan.headImg = fileIdArr.join(',')
        }
        // 全身照
        this.addUserMan.bodyImg = ""
        if (this.bodyImgList.length !== 0) {
          let fileIdArr = this.bodyImgList.map(item => {
            return item.fileId
          })
          this.addUserMan.bodyImg = fileIdArr.join(',')
        }

        editUserById(this.addUserMan).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.companyId = ''
            this.addUserMan = {
              loginName: '',
              defaultDeptName: '',
              defaultDeptId: '',
              otherUserDepts: [],
              roles: [],
              userId: [{ userId: -1 }],
              phoneNumber: '',
              userEmail: '',
              userName: '',
              userSex: '',
              jobNo: '',
              jobPost: '',
              jobLevel: '',
              userStateNum: '',
              loginPassword: '',
              personnelResume: ''
            }
            this.roles = []
            this.deptList = []
            this.tempRoles = []
            this.tempDeptList = []
            this.sucUserList = []

            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/userManage');
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // userOkadd() {
      //   this.successData = false;
      //   this.companyId = ''
      //   this.addUserMan.defaultDeptId = ''
      //   this.addUserMan.defaultDeptName = ''
      //   this.addUserMan.otherUserDepts = []
      //   this.addUserMan.roles = []
      //   this.addUserMan.userId = []
      //   this.addUserMan.loginName = ''
      //   this.roles = []
      //   this.deptList = []
      //   this.tempRoles = []
      //   this.tempDeptList = []
      //   this.sucUserList = []
      //
      //   this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/userManage');
      // },

      // 选择默认部门
      chooseDept(list) {
        if (list != undefined) {
          const last = list[list.length - 1]
          const name = this.$refs['deptName'].getCheckedNodes()[0].label
          this.addUserMan.defaultDeptId = last
          this.addUserMan.defaultDeptName = name
        }
      },

      // 选择用户
      // chooseUser(item) {
      //   if (JSON.stringify(this.addUserMan.userId).indexOf(JSON.stringify(item)) == -1) {
      //     this.addUserMan.userId.push(item) // 进行动态的操作
      //   }
      //   this.userList = ''
      // },

      // 删除用户
      // deleteUser(item) {
      //   this.addUserMan.userId.splice(item, 1)
      // },

      // 获取公司部门列表
      getCompanyList() {
        getDepartmentTree({}).then(res => {
          // const data = JSON.parse(secret.Decrypt(res.data))
          this.companyList = res.data.deptInfoTreeVos
          this.companyName = res.data.companyName
          this.companyId = res.data.companyId
        })
      },

      // 打开添加角色弹窗
      addRoles() {
        this.dialogVisible = true;
        this.getRoles();
      },

      // 获取角色列表
      getRoles() {
        const params = {
          companyId: this.companyId,
          userId: this.userId
        }
        // const enc = secret.Encrypt(JSON.stringify(params))
        getCompanyRole(params).then(res => {
          // getCompanyRole({ a: enc }).then(res => {
          if (res.code == 200) {
            // const data = JSON.parse(secret.Decrypt(res.data))
            this.roleData = res.data
            this.findAllChildren(this.roleData, this.defaultRole)
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 添加角色
      handleCheckChange(data, checked, indeterminate) {
        this.tempRoles = this.$refs.role.getHalfCheckedNodes().concat(this.$refs.role.getCheckedNodes())
        if (this.tempRoles != '') {
          this.defaultRole = []
        }
      },

      // 删除角色
      deleteRole(item, index) {
        this.roles.splice(index, 1)
        const rolesId = []
        for (let i = 0; i < this.roles.length; i++) {
          rolesId.push(this.roles[i].roleId)
        }
        this.$refs.role.setCheckedKeys(rolesId)
      },

      // 打开添加部门弹窗
      addDepts() {
        this.deptDialog = true
      },

      // 添加部门
      checkChangeDept(data, checked, indeterminate) {
        this.tempDeptList = this.$refs.dept.getHalfCheckedNodes().concat(this.$refs.dept.getCheckedNodes())
        if (this.tempDeptList != '') {
          this.resourceCheckedKey = []
        }
      },

      // 删除已选部门
      deleteDeptBox(index) {
        this.deptList.splice(index, 1)
        const deptId = []
        for (let i = 0; i < this.deptList.length; i++) {
          deptId.push(this.deptList[i].deptId)
        }
        this.$refs.dept.setCheckedKeys(deptId)
      },

      // 弹窗取消事件
      cancelDialog(num) {
        if (num == 0) {
          this.dialogVisible = false
        } else {
          this.deptDialog = false
        }
      },

      // 确定添加
      okChoose(num) {
        if (num == 0) {
          this.dialogVisible = false
          if (this.defaultRole.length != 0) {
            const _obj = JSON.stringify(this.$refs.role.getCheckedNodes())
            // this.deptList = JSON.parse(_obj);
            // this.addUserMan.otherUserDepts = this.deptList
          } else {
            const _obj = JSON.stringify(this.tempRoles)
            this.roles = JSON.parse(_obj)
            this.addUserMan.roles = this.roles
          }
        } else {
          this.deptDialog = false
          if (this.resourceCheckedKey.length != 0) {
            const _obj = JSON.stringify(this.$refs.dept.getCheckedNodes())
            // this.deptList = JSON.parse(_obj);
            // this.addUserMan.otherUserDepts = this.deptList
          } else {
            const _obj = JSON.stringify(this.tempDeptList)
            this.deptList = JSON.parse(_obj)
            this.addUserMan.otherUserDepts = this.deptList
          }
          // this.deptList = this.tempDeptList
        }
      },

      // 获取用户详情
      getUserDetail() {
        const params = {
          companyId: this.companyId,
          userId: this.userId
        }

        getUserInfo(params).then(res => {
          if (res.code == 200) {
            let data = JSON.parse(JSON.stringify(res.data));
            this.addUserMan = res.data;
            this.addUserMan.loginName = res.data.loginName
            this.addUserMan.defaultDeptName = res.data.defaultDeptName
            this.addUserMan.defaultDeptId = res.data.defaultDeptId
            this.addUserMan.otherUserDepts = res.data.userDeptViewVos
            this.addUserMan.roles = res.data.userRoleViewVos
            // this.addUserMan.userId = res.data.userId
            this.addUserMan.phoneNumber = res.data.phoneNumber
            this.addUserMan.userEmail = res.data.userEmail
            this.addUserMan.userName = res.data.userName
            if(res.data.userSex){
              this.addUserMan.userSex = JSON.parse(res.data.userSex)
            }

            this.addUserMan.jobNo = data.jobNo
            // this.addUserMan.jobPost = data.jobPost
            // this.addUserMan.jobLevel = data.jobLevel
            this.$set(this.addUserMan,'userStateNum',data.stateNum);
            this.$set(this.addUserMan,'jobPost',data.jobPost);
            this.$set(this.addUserMan,'jobLevel',data.jobLevel);

            this.deptList = res.data.userDeptViewVos
            this.roles = res.data.userRoleViewVos

            // 处理用户标签
            if(this.addUserMan.personnelTag){
              this.addUserMan.personnelTag = res.data.personnelTag?res.data.personnelTag.split(","):[]
            }
            // 处理微信二维码
            if (res.data.wxImg && res.data.wxImg !== "") {
              let fileArr = res.data.wxImg.split(',');
              getFileListWithFileIds({fileIds: fileArr, haveView: true}).then(res => {
                if (res.code == 200) {
                  res.data.forEach(item => {
                    item.isShowDan = false;
                  })
                  this.wxImgList = res.data;
                } else {
                  this.$message.warning(res.message)
                }
              })
            }
            // 处理头像
            if (res.data.headImg && res.data.headImg !== "") {
              let fileArr = res.data.headImg.split(',');
              getFileListWithFileIds({fileIds: fileArr, haveView: true}).then(res => {
                if (res.code == 200) {
                  res.data.forEach(item => {
                    item.isShowDan = false;
                  })
                  this.headImgList = res.data;
                } else {
                  this.$message.warning(res.message)
                }
              })
            }
            // 处理全身照
            if (res.data.bodyImg && res.data.bodyImg !== "") {
              let fileArr = res.data.bodyImg.split(',');
              getFileListWithFileIds({fileIds: fileArr, haveView: true}).then(res => {
                if (res.code == 200) {
                  res.data.forEach(item => {
                    item.isShowDan = false;
                  })
                  this.bodyImgList = res.data;
                } else {
                  this.$message.warning(res.message)
                }
              })
            }

          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 获取已选部门列表
      getUserDept() {
        const params = {
          companyId: this.companyId,
          userId: this.userId
        }
        queryOtherDept(params).then(res => {
          if (res.code == 200) {
            this.companyList = res.data
            this.findAllChildren(this.companyList, this.resourceCheckedKey)
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
            // console.log('213',item)
            if (item.roleId) {
              arr.push(item.roleId)
            } else {
              arr.push(item.deptId)
            }
          }
        })
      },

      // 微信二维码上传
      handleCheckWxImgUpload(option) {
        if (option.file.name.length >= 150) {
          this.$message.error('文件名称超长，请检查');
          this.wxImgList = JSON.parse(JSON.stringify(this.wxImgList))
          return;
        }
        let fileSize = option.file.size / 1024

        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.wxImgList = JSON.parse(JSON.stringify(this.wxImgList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.wxImgList = JSON.parse(JSON.stringify(this.wxImgList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = intellectualUpload(this.$store.getters.companyName, '头像', fileName) + '.' + fileType
        uploadFilesOss(filePath, option.file, option).then(res => {
          if (res) {
            let FileList = [];
            let addFile = {
              fileName: option.file.name,
              filePath: filePath,
              fileSize: fileSize,
              fileType: fileType,
              parentType: 4
            }
            FileList.push(addFile)
            let params = {
              companyId: this.$store.getters.companyId,
              companyName: this.$store.getters.companyName,
              addFileDtos: FileList,
              haveView: true
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                response.data[0].isShowDan = false;
                this.wxImgList = response.data;
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.wxImgList = JSON.parse(JSON.stringify(this.wxImgList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.wxImgList = JSON.parse(JSON.stringify(this.wxImgList))
          }
        })
      },
      //鼠标放到图片上的时候
      filesWxImgOver(index) {
        this.wxImgList[index].isShowDan = true
      },
      //鼠标离开图片上的时候
      filesWxImgOut(index) {
        this.wxImgList[index].isShowDan = false
      },

      // 头像上传
      handleCheckHeadImgUpload(option) {
        if (option.file.name.length >= 150) {
          this.$message.error('文件名称超长，请检查');
          this.headImgList = JSON.parse(JSON.stringify(this.headImgList))
          return;
        }
        let fileSize = option.file.size / 1024

        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.headImgList = JSON.parse(JSON.stringify(this.headImgList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.headImgList = JSON.parse(JSON.stringify(this.headImgList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = intellectualUpload(this.$store.getters.companyName, '头像', fileName) + '.' + fileType
        uploadFilesOss(filePath, option.file, option).then(res => {
          if (res) {
            let FileList = [];
            let addFile = {
              fileName: option.file.name,
              filePath: filePath,
              fileSize: fileSize,
              fileType: fileType,
              parentType: 4
            }
            FileList.push(addFile)
            let params = {
              companyId: this.$store.getters.companyId,
              companyName: this.$store.getters.companyName,
              addFileDtos: FileList,
              haveView: true
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                response.data[0].isShowDan = false;
                this.headImgList = response.data;
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.headImgList = JSON.parse(JSON.stringify(this.headImgList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.headImgList = JSON.parse(JSON.stringify(this.headImgList))
          }
        })
      },
      //鼠标放到图片上的时候
      filesHeadImgOver(index) {
        this.headImgList[index].isShowDan = true
      },
      //鼠标离开图片上的时候
      filesHeadImgOut(index) {
        this.headImgList[index].isShowDan = false
      },

      // 全身照上传
      handleCheckBodyImgUpload(option) {
        if (option.file.name.length >= 150) {
          this.$message.error('文件名称超长，请检查');
          this.bodyImgList = JSON.parse(JSON.stringify(this.bodyImgList))
          return;
        }
        let fileSize = option.file.size / 1024

        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.bodyImgList = JSON.parse(JSON.stringify(this.bodyImgList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.bodyImgList = JSON.parse(JSON.stringify(this.bodyImgList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = intellectualUpload(this.$store.getters.companyName, '全身照', fileName) + '.' + fileType
        uploadFilesOss(filePath, option.file, option).then(res => {
          if (res) {
            let FileList = [];
            let addFile = {
              fileName: option.file.name,
              filePath: filePath,
              fileSize: fileSize,
              fileType: fileType,
              parentType: 4
            }
            FileList.push(addFile)
            let params = {
              companyId: this.$store.getters.companyId,
              companyName: this.$store.getters.companyName,
              addFileDtos: FileList,
              haveView: true
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                response.data[0].isShowDan = false;
                this.bodyImgList = response.data;
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.bodyImgList = JSON.parse(JSON.stringify(this.bodyImgList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.bodyImgList = JSON.parse(JSON.stringify(this.bodyImgList))
          }
        })
      },
      //鼠标放到图片上的时候
      filesBodyImgOver(index) {
        this.bodyImgList[index].isShowDan = true
      },
      //鼠标离开图片上的时候
      filesBodyImgOut(index) {
        this.bodyImgList[index].isShowDan = false
      },
    }
  }
</script>

<style lang="less" scoped>
  .file-list {
    margin-right: 10px;
    display: flex;

    li {
      position: relative;
      margin-right: 10px;
      border-radius: 4px;
      width: 100px;
      height: 100px;
      border: 1px solid #c0ccda;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 8px;
      box-sizing: border-box;

      img {
        width: auto;
      }

      .transition-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          color: #fff;
          cursor: pointer;
          font-size: 22px;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .upload-pic {
    /deep/ .el-upload {
      width: 100px;
      height: 100px;
      line-height: 110px;
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;

      .icon-plus {
        color: #8c939d;
        font-size: 28px;
      }
    }

    /deep/ .el-upload-list--picture-card .el-upload-list__item {
      width: 100px;
      height: 100px;
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

  /deep/ .el-form-item {
    display: flex;
    margin-right: 115px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
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

  .addRoleDept {
    display: flex;
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

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }

  .userLogin {
    display: flex;
    /*align-items: center;*/
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    padding: 10px;
    flex-wrap: wrap;
  }

  .userLogin input {
    border: none;
    outline: none;
    flex: 1;
    line-height: normal;
  }

  .userList {
    border: 1px solid #DCDFE6;
    margin-top: 10px;
    border-radius: 4px;
    /*display: flex;*/
    position: relative;
  }

  /*.userList:before{*/
  /*  content:'';*/
  /*  width:0;*/
  /*  height:0;*/
  /*  border-left:30px solid transparent;*/
  /*  border-right:30px solid transparent;*/
  /*  border-bottom:30px solid #000;*/
  /*}*/

  .userBox {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    cursor: pointer;
  }

  .userBox:hover {
    background: rgba(44, 177, 245, 0.06);
    transition: all .2s ease-in;
  }

  .userBox:last-child {
    border-bottom: none;
  }

  .userAvatar {
    line-height: normal;
  }

  .userName {
    line-height: normal;
    text-align: center;
    margin-left: 10px;
  }

  .listJt {
    position: absolute;
    top: -10px;
    left: 10px;
    background: #fff;
    color: #DCDFE6;
  }

  .el-cascader {
    width: 100%;
  }
</style>
