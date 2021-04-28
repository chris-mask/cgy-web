<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>更换管理员</span>
      </div>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
      </el-steps>
      <div class="addUserContent">
        <el-form ref="primaryManage" :model="primaryManage" :rules="rulesOld" class="demo-ruleForm" v-if="active == 0">
          <el-row>
            <el-col :span="12">
              <el-form-item label="原管理员账号:" prop="loginName">
                <el-input size='small' v-model="primaryManage.loginName" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="原管理员姓名:" prop="userName">
                <el-input size='small' v-model="primaryManage.userName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="验证码:" prop="verificationCode">
                <el-input size='small' v-model="primaryManage.verificationCode" placeholder="请输入验证码"></el-input>
                <el-button size='small' v-show="oldSendShow" type="primary" @click="getCode(1)">发送验证码</el-button>
                <el-button size='small' v-show='!oldSendShow' :disabled="true">{{codeTime + 's'}}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form ref="newManage" :model="newManage" :rules="rulesNew" class="demo-ruleForm" v-if="active == 1">
          <el-row>
            <el-col :span="12">
              <el-form-item label="新管理员账号:" prop="loginName">
                <el-input size='small' v-model="newManage.loginName" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="新管理员姓名:" prop="userName">
                <el-input size='small' v-model="newManage.userName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="验证码:" prop="verificationCode">
                <el-input size='small' v-model="newManage.verificationCode" placeholder="请输入验证码"></el-input>
                <el-button size='small' v-show="newSendShow" type="primary" @click="getCode(2)">发送验证码</el-button>
                <el-button size='small' v-show='!newSendShow' :disabled="true">{{codeTimeNew + 's'}}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <!--<el-button size='small' type="primary">确定</el-button>-->
      <el-button size='small' @click="next" type="primary">{{this.active >= 1 ? '提交' : '下一步'}}</el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {getCompanyManagerCode,nextStep,confirmReplacement} from '@/api/enterpriseMsg'

  export default {
    data(){
      return{
        active: 0,
        codeTime:0,
        codeTimeNew:0,
        oldSendShow:true,
        newSendShow:true,
        primaryManage:{
          loginName:'',
          userName:'',
          verificationCode:''
        },
        newManage:{
          loginName:'',
          userName:'',
          verificationCode:''
        },
        rulesOld: {
          loginName:[
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        rulesNew: {
          loginName:[
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        companyId: this.$store.getters.companyId
      }
    },
    methods:{
      //获取验证码  1-获取原管理员验证码 2-获取新管理员验证码
      getCode(num){
        if(this.active == 0){
          if(num == 1){
            var params = {
              companyId: this.companyId,
              loginName: this.primaryManage.loginName,
              userName: this.primaryManage.userName,
              operationType: num,
            }
            getCompanyManagerCode(params).then(res=>{
              if(res.code == 200){
                this.oldSendShow = false;
                this.codeTime = 60;
                var auth_timetimer =  setInterval(()=>{
                  this.codeTime--;
                  if(this.codeTime<=0){
                    this.oldSendShow = true;
                    clearInterval(auth_timetimer);
                  }
                }, 1000)
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        }else{
          if(num == 2){
            var params = {
              companyId: this.companyId,
              loginName: this.newManage.loginName,
              userName: this.newManage.userName,
              operationType: num,
            }
            getCompanyManagerCode(params).then(res=>{
              if(res.code == 200){
                this.newSendShow = false;
                this.codeTimeNew = 60;
                var auth_timetimer =  setInterval(()=>{
                  this.codeTimeNew--;
                  if(this.codeTimeNew<=0){
                    this.newSendShow = true;
                    clearInterval(auth_timetimer);
                  }
                }, 1000)
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        }
      },
      next() {
        if (this.active == 0){
          if(this.primaryManage.loginName == ''){
            this.$message({type: 'warning', message: '账号不能为空！'});
            return;
          }
          if(this.primaryManage.userName == ''){
            this.$message({type: 'warning', message: '用户名不能为空！'});
            return;
          }
          if(this.primaryManage.verificationCode == ''){
            this.$message({type: 'warning', message: '验证码不能为空！'});
            return;
          }
          var params = {
            loginName: this.primaryManage.loginName,
            userName: this.primaryManage.userName,
            verificationCode: this.primaryManage.verificationCode,
            companyId: this.companyId
          }
          nextStep(params).then(res=>{
            if(res.code == 200){
              this.active++
            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        }else{
          if(this.newManage.loginName == ''){
            this.$message({type: 'warning', message: '账号不能为空！'});
            return;
          }
          if(this.newManage.userName == ''){
            this.$message({type: 'warning', message: '用户名不能为空！'});
            return;
          }
          if(this.newManage.verificationCode == ''){
            this.$message({type: 'warning', message: '验证码不能为空！'});
            return;
          }
          var params ={
            companyId: this.companyId,
            oldLoginName: this.primaryManage.loginName,
            oldUserName: this.primaryManage.userName,
            oldVerificationCode: this.primaryManage.verificationCode,
            newLoginName: this.newManage.loginName,
            newUserName: this.newManage.userName,
            newVerificationCode: this.newManage.verificationCode,
          }
          confirmReplacement(params).then(res=>{
            if(res.code == 200){
              this.$message({type: 'success', message: '更换成功'});
              this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/backend/enterpriseDetail');
            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        }
      },

      cancelSub(){
        this.primaryManage = {};
        this.newManage = {};
        this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/backend/enterpriseDetail');
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
    display: flex
  }

  .el-input{
    margin-right: 10px;
  }

  /deep/ .el-form-item__label {
    min-width: 130px;
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
</style>
