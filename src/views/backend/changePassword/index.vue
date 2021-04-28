<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <el-form ref="changeList" :model="changeList" :rules="rules" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input size='small' type="password" v-model="changeList.oldPassword" placeholder="请输入原密码" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="新密码" prop="newPassword">
              <el-input size='small' type="password" v-model="changeList.newPassword" placeholder="请输入新密码" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="确认新密码" prop="confPassword">
              <el-input size='small' type="password" v-model="changeList.confPassword" placeholder="请确认新密码" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btnList">
        <el-button size='small' type="primary" @click="confirmEdit('changeList')">确定</el-button>
        <el-button size='small' @click="cancelSub">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { changePassWord } from '@/api/userManage.js'

export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else if (value !== this.changeList.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      //验证密码
      const pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
      const isPwd = (rule, value, callback) => {
        if (!pwd.test(value)) {
          return callback(new Error('密码要求8-16个字符，至少1个大写字母和1个小写字母'))
        } else {
          callback()
        }
      }
      return {
        changeList: {
          oldPassword: '',
          newPassword: '',
          confPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
            // {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            {min: 8, max: 16, message: '密码长度不能小于8位，不能大于16位', trigger: 'blur'},
            {validator: isPwd, trigger: 'blur'}
          ],
          confPassword: [
            { validator: validatePass, trigger: 'blur' },
            {min: 8, max: 16, message: '密码长度不能小于8位，不能大于16位', trigger: 'blur'},
            {validator: isPwd, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      //提交按钮
      confirmEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = {
              newPassword: this.changeList.newPassword,
              oldPassword: this.changeList.oldPassword
            }
            changePassWord(params).then(res => {
              if (res.code == 200) {
                this.$message({ type: 'success', message: res.message })
                this.$store.dispatch('logOut').then(() => {
                  location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                })
              } else {
                this.$message({ type: 'error', message: res.message })
              }
            })
          }
        })
        // if (this.changeList.oldPassword == '' || this.changeList.oldPassword == undefined) {
        //   this.$message({ type: 'warning', message: '旧密碼不能为空' })
        //   return
        // }
        // if (this.changeList.newPassword == '' || this.changeList.newPassword == undefined) {
        //   this.$message({ type: 'warning', message: '新密碼不能为空' })
        //   return
        // }
        // if (this.changeList.confPassword == '' || this.changeList.confPassword == undefined) {
        //   this.$message({ type: 'warning', message: '请确认新密码' })
        //   return
        // }
        //
        // if(this.changeList.newPassword != this.changeList.confPassword){
        //   this.$message({ type: 'warning', message: '新密码与确认新密码不一致' })
        //   return
        // }
      },

      // 返回
      cancelSub() {
        this.changeList = {
          oldPassword: '',
          newPassword: '',
          confPassword: ''
        }

        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route);
      }
    }
  }
</script>

<style scoped>
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
    min-width: 83px;
  }

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }
</style>
