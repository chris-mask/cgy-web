<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>个人信息</span>
      </div>
      <div class="addUserContent">
        <el-form ref="userInfo" :model="userInfo" :rules="rules" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="账号" prop="account">
                <span style="margin-right: 10px;">{{userInfo.account}}</span>
                <el-button type="primary" @click="goPhone" size="small">更换手机号码</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="userName">
                <el-input size='small' v-model="userInfo.userName" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="性别" prop="userSex">
                <el-radio v-model="userInfo.userSex" label="1">男</el-radio>
                <el-radio v-model="userInfo.userSex" label="0">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="userEmail">
                <el-input size='small' v-model="userInfo.userEmail" placeholder="请输入邮箱地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <el-button size='small' type="primary" @click="changeUserInfo('userInfo')">确定</el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {changePersonalInformation} from '@/api/userManage'
  import { callbackError } from '@/utils/callbackError'

  export default {
    data(){
      return{
        userInfo:{
          account: this.$store.getters.name,
          userId: this.$store.getters.userId,
          userEmail: this.$store.getters.email,
          userName: this.$store.getters.username,
          userSex: this.$store.getters.sex,
          avatar:''
        },
        rules: {
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          userSex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          userEmail: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        },
      }
    },
    methods:{
      // 修改信息提交
      changeUserInfo(formName){
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            var params = {
              avatar: this.userInfo.avatar,
              userEmail: this.userInfo.userEmail,
              userId: this.userInfo.userId,
              userName: this.userInfo.userName,
              userSex: this.userInfo.userSex,
            }
            changePersonalInformation(params).then(res=>{
              if(res.code == 200){
                this.$message({ type: 'success', message: "修改成功" });
                this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route);
                this.$router.push({ path: '/dashboard' })
              }else {
                this.$message({ type: 'error', message: res.message })
              }
            })
          } else {
            callbackError(this, error)
            return false
          }
        })
      },
      // 关闭页面
      cancelSub(){
        this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route);
        this.$router.push({ path: '/dashboard' })
      },
      // 跳转修改电话页面
      goPhone(){
        this.$router.push({
          path: '/changePhone'
        })
      },
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

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }

  .goPhone{
    color:#ccc;
    cursor: pointer;
  }
</style>
