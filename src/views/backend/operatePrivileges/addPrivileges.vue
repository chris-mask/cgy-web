<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>{{levelNum != undefined ? '添加子权限' : permissionId =='' || permissionId == undefined ? '新建权限' : '编辑权限'}}</span>
      </div>
      <div class="addUserContent">
        <el-form ref="privilegesForm" :model="privilegesForm" :rules="rules" class="demo-ruleForm">
          <el-row>
            <el-col :span="7">
              <el-form-item label="权限名称:" prop="permissionName">
                <el-input size='small' v-model="privilegesForm.permissionName" placeholder="请输入权限名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="标识符:" prop="permissionCode">
                <el-input size='small' v-model="privilegesForm.permissionCode" placeholder="请输入标识符"
                          :disabled="getDetail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="类型:" prop="permissionType">
                <!--                <span>{{privilegesForm.permissionType}}</span>-->
                <el-select size='small' v-model="privilegesForm.permissionType" placeholder="请选择类型"
                           :disabled="getDetail">
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="请求方法:" prop="requestMethod">
                <!--                <span>{{privilegesForm.requestMethod}}</span>-->
                <el-select size='small' v-model="privilegesForm.requestMethod" placeholder="请选择请求方法"
                           :disabled="getDetail">
                  <el-option
                    v-for="item in requestList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="请求URL:" prop="requestUrl">
                <el-input size='small' v-model="privilegesForm.requestUrl" placeholder="请输入请求URL"
                          :disabled="getDetail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="路由URL:" prop="webUrl">
                <el-input size='small' v-model="privilegesForm.webUrl" placeholder="请输入路由URL"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="权限范围:" prop="permissionScope">
                <el-select size='small' v-model="privilegesForm.permissionScope" placeholder="请选择权限范围"
                           :disabled="getDetail">
                  <el-option
                    v-for="item in permissionScopeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="请求目标:" prop="requestTarget">
                <el-input size='small' v-model="privilegesForm.requestTarget" placeholder="请输入请求目标"
                          :disabled="getDetail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="图标:" prop="icon">
                <el-input size='small' v-model="privilegesForm.icon" placeholder="请输入图标名称"
                          @change="iconHandle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="栏目名称:" prop="label">
                <el-input size='small' v-if="privilegesForm.icon != '' && privilegesForm.icon !== undefined"
                          v-model="privilegesForm.label" disabled></el-input>
                <el-input size='small' v-else disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="备注:" prop="permissionDesc">
<!--                <el-input size='small' type="textarea" v-model="privilegesForm.permissionDesc"-->
<!--                          placeholder="请输入备注"></el-input>-->
                <EditorText :id="editor1" :value="privilegesForm.permissionDesc" ref="editor" @changeValue="changeValue($event)"></EditorText>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <el-button size='small' type="primary" @click="addPrivilegesBtn"
                 v-if="permissionId == '' || permissionId == undefined && allowAdd.twoAllow">确定
      </el-button>
      <el-button size='small' type="primary" @click="editPrivileges"
                 v-if="permissionId != '' && permissionId != undefined && allowUpdate.twoAllow">修改
      </el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {addPermission, editPermission, getPrivilegesInfo} from '@/api/operatePrivileges.js'
  import EditorText from '@/components/EditorText/index'

  export default {
    components: {
      EditorText,
    },
    data() {
      return {
        privilegesForm: {
          permissionCode: '',
          permissionDesc: '',
          permissionName: '',
          permissionType: '',
          requestMethod: '',
          requestTarget: '',
          // permissionScope: '',
          requestUrl: '',
          webUrl: '',
          icon: "",
          lable: ""
        },
        rules: {
          permissionName: [
            {required: true, message: '请输入权限名称', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          permissionCode: [
            {required: true, message: '请选择标识符', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          permissionType: [
            {required: true, message: '请选择类型', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          requestMethod: [
            {required: true, message: '请选择请求方法', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          requestUrl: [
            {required: true, message: '请输入请求url', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          requestTarget: [
            {required: true, message: '请输入请求目标', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          permissionScope: [
            {required: true, message: '请选中权限范围', trigger: 'blur'}
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ]
        },
        levelNum: 1,
        parentId: 0,
        parentIds: 0,
        permissionId: '',
        dialogVisible: false,
        typeList: [
          {
            value: 1,
            label: '菜单'
          },
          {
            value: 2,
            label: '按钮'
          }
        ],
        requestList: [
          {
            value: 1,
            label: 'GET'
          },
          {
            value: 2,
            label: 'POST'
          },
          {
            value: 3,
            label: 'DELETE'
          },
          {
            value: 4,
            label: 'PUT'
          }
        ],
        permissionScopeList: [
          {
            value: '0',
            label: '系统级'
          },
          {
            value: '1',
            label: '应用级'
          },
        ],
        getDetail: false,
        editor1:'editor1',
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:PERMISSION:MANAGE', 'SYSTEM:PERMISSION:INSTER'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:PERMISSION:MANAGE', 'SYSTEM:PERMISSION:EDIT'),
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:PERMISSION:MANAGE', 'SYSTEM:PERMISSION:DETAILS'),
      }
    },
    activated() {
      this.parentId = this.$route.query.parentId;
      this.parentIds = this.$route.query.parentIds;
      this.permissionId = this.$route.query.permissionId;
      this.levelNum = this.$route.query.levelNum;
      if (this.permissionId != '' && this.permissionId != undefined && this.allowDetail.twoAllow) {
        this.getPrivilegesDetail()
      }

      this.$refs.editor.initCKEditor()
    },
    updated() {
      this.iconHandle();
    },
    methods: {
      //接收和更新富文本值
      changeValue($event) {
        this.privilegesForm.permissionDesc = $event
      },
      // 获取权限详情
      getPrivilegesDetail() {
        let params = {
          permissionId: this.permissionId
        }
        // const enc = secret.Encrypt(JSON.stringify(params))
        getPrivilegesInfo(params).then(res => {
          // getPrivilegesInfo({ a:enc }).then(res => {
          if (res.code == 200) {
            // this.levelNum = res.data.levelNum;
            // this.parentId = res.data.parentId;
            // this.parentIds = res.data.parentIds;
            // const data = JSON.parse(secret.Decrypt(res.data))
            this.privilegesForm.permissionCode = res.data.permissionCode;
            this.privilegesForm.permissionDesc = res.data.permissionDesc;
            this.privilegesForm.permissionName = res.data.permissionName;
            this.privilegesForm.permissionType = res.data.permissionType == 1 ? '菜单' : '按钮'
            this.privilegesForm.requestMethod = res.data.requestMethod == 1 ? 'GET' : res.data.requestMethod == 2 ? 'POST' : res.data.requestMethod == 3 ? 'DELETE' : res.data.requestMethod == 4 ? 'PUT' : res.data.requestMethod
            this.privilegesForm.requestTarget = res.data.requestTarget;
            this.privilegesForm.requestUrl = res.data.requestUrl;
            this.privilegesForm.webUrl = res.data.webUrl;
            this.privilegesForm.icon = res.data.meta.icon;
            // this.privilegesForm.label = res.data.meta.permissionName;
            this.privilegesForm.permissionScope = res.data.permissionScope;
            this.getDetail = true
            this.iconHandle();

            this.$refs.editor.initCKEditor()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 新建
      addPrivilegesBtn() {
        if (this.privilegesForm.icon == "") {
          this.privilegesForm.label == "";
        }
        if (this.privilegesForm.permissionName == '' || this.privilegesForm.permissionName == null) {
          this.$message({type: 'warning', message: '权限名称不能为空'})
          return
        }
        if (this.privilegesForm.permissionCode == '' || this.privilegesForm.permissionCode == null) {
          this.$message({type: 'warning', message: '标识符不能为空'})
          return
        }
        if (this.privilegesForm.permissionType == '' || this.privilegesForm.permissionType == null) {
          this.$message({type: 'warning', message: '请选择类型'})
          return
        }
        if (this.privilegesForm.requestMethod == '' || this.privilegesForm.requestMethod == null) {
          this.$message({type: 'warning', message: '请选择请求方法'})
          return
        }
        if (this.privilegesForm.requestUrl == '' || this.privilegesForm.requestUrl == null) {
          this.$message({type: 'warning', message: '请求URL不能为空'})
          return
        }
        if (this.privilegesForm.requestTarget == '' || this.privilegesForm.requestTarget == null) {
          this.$message({type: 'warning', message: '请求目标不能为空'})
          return
        }
        const params = {
          levelNum: this.levelNum == undefined ? 1 : this.levelNum,
          parentId: this.parentId == undefined ? 0 : this.parentId,
          parentIds: this.parentIds == undefined ? 0 : this.parentIds,
          permissionId: this.permissionId,
          permissionCode: this.privilegesForm.permissionCode,
          permissionDesc: this.privilegesForm.permissionDesc,
          permissionName: this.privilegesForm.permissionName,
          permissionType: this.privilegesForm.permissionType,
          requestMethod: this.privilegesForm.requestMethod,
          requestTarget: this.privilegesForm.requestTarget,
          requestUrl: this.privilegesForm.requestUrl,
          webUrl: this.privilegesForm.webUrl,
          permissionScope: this.privilegesForm.permissionScope,
          meta: {
            icon: this.privilegesForm.icon,
            label: this.privilegesForm.label
          }
        };
        addPermission(params).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '新建成功'
            })

            this.$refs.editor.destroyEditor();
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/operatePrivileges');
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 修改提交
      editPrivileges() {
        const params = {
          levelNum: this.levelNum == undefined ? 1 : this.levelNum,
          parentId: this.parentId == undefined ? 0 : this.parentId,
          parentIds: this.parentIds == undefined ? 0 : this.parentIds,
          permissionId: this.permissionId,
          permissionCode: this.privilegesForm.permissionCode,
          permissionDesc: this.privilegesForm.permissionDesc,
          permissionName: this.privilegesForm.permissionName,
          permissionType: this.privilegesForm.permissionType == '菜单' ? 1 : 2,
          requestMethod: this.privilegesForm.requestMethod == 'GET' ? 1 : this.privilegesForm.requestMethod == 'POST' ? 2 : this.privilegesForm.requestMethod == 'DELETE' ? 3 : this.privilegesForm.requestMethod == 'PUT' ? 4 : this.privilegesForm.requestMethod,
          requestTarget: this.privilegesForm.requestTarget,
          requestUrl: this.privilegesForm.requestUrl,
          webUrl: this.privilegesForm.webUrl,
          permissionScope: this.privilegesForm.permissionScope,
          meta: {
            icon: this.privilegesForm.icon,
            label: this.privilegesForm.label
          }
        }
        editPermission(params).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$refs.editor.destroyEditor();
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/operatePrivileges');
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 返回
      cancelSub() {
        this.$refs.editor.destroyEditor();
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/operatePrivileges');
      },


      //判断icon
      iconHandle(val) {
        if (this.privilegesForm.icon != "" && this.privilegesForm.icon !== undefined) {
          this.privilegesForm.label = this.privilegesForm.permissionName;
        } else {
          this.privilegesForm.label = "";
        }
      }
    }
  }
</script>

<style scoped>
  /*修改列表页面表格样式*/
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

</style>
