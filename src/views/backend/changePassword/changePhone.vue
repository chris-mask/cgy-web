<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>更换电话号码</span>
      </div>
<!--      <el-steps :active="active" finish-status="success">-->
<!--        <el-step title="步骤 1"></el-step>-->
<!--        <el-step title="步骤 2"></el-step>-->
<!--      </el-steps>-->
      <div class="addUserContent">
        <el-form ref="phoneInfo" :model="phoneInfo" :rules="rules" class="demo-ruleForm">
<!--          <el-row v-if="active == 0">-->
<!--            <el-col :span="12">-->
<!--              <el-form-item label="原手机号验证码" prop="oldPhoneCode">-->
<!--                <el-input size='small' v-model="phoneInfo.oldPhoneCode" placeholder="请输入验证码"></el-input>-->
<!--                <el-button size='small' v-show="oldSendShow" type="primary" @click="getCode">发送验证码</el-button>-->
<!--                <el-button size='small' v-show='!oldSendShow' :disabled="true">{{codeTime + 's'}}</el-button>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <el-row v-if="active == 1">-->
<!--            <el-col :span="12">-->
<!--              <el-form-item label="新手机号码" prop="newPhoneNum">-->
<!--                <el-input size='small' v-model="phoneInfo.newPhoneNum" placeholder="请新手机号码"></el-input>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="新手机号码" prop="newPhoneNum">
                <el-input maxlength="11" size='middle' v-model="phoneInfo.newPhoneNum" placeholder="请填写新手机号码"></el-input>
              </el-form-item>
              <el-form-item label="新手机号验证码" prop="newPhoneCode">
                <el-input size='middle' v-model="phoneInfo.newPhoneCode" placeholder="请输入手机号验证码"></el-input>
                <el-button size='small' v-show="newSendShow" @click="getCode" type="primary">发送验证码</el-button>
                <el-button size='small' v-show='!newSendShow' :disabled="true">{{codeTime + 's'}}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <!--<el-button size='small' type="primary">确定</el-button>-->
      <el-button size='small' @click="next" type="primary">提交</el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {getUserBindingNewPhoneCode,userConfirmChangePhone} from '@/api/userManage'

  export default {
    name: "change-phone",
    data(){
      // 验证码验证
      const verificationCode = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
      const isverificationCode = (rule, value, callback) => {
        if (!verificationCode.test(value)) {
          return callback(new Error('请输入正确验证码'))
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

      return{
        active: 0,
        codeTime:0,
        oldSendShow:true,
        newSendShow:true,
        phoneInfo:{
          oldPhoneCode:'',
          newPhoneNum:'',
          newPhoneCode:''
        },
        rules: {
          newPhoneNum: [
            { required: true, message: '请填写新手机号码', trigger: 'blur' },
            {min: 11, message: '手机号码不能小于11位', trigger: 'blur'},
            {validator: isTelephoneNumber, trigger: 'blur'}
          ],
          newPhoneCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            // {validator: isverificationCode, trigger: 'blur'}
          ]
        },
      }
    },
    methods:{
      //获取验证码
      getCode(){
        getUserBindingNewPhoneCode({phoneNumbers:this.phoneInfo.newPhoneNum}).then(res=>{
          if(res.code == 200){
            this.newSendShow = false;
            this.codeTime = 60;
            var auth_timetimer =  setInterval(()=>{
              this.codeTime--;
              if(this.codeTime<=0){
                this.newSendShow = true;
                clearInterval(auth_timetimer);
              }
            }, 1000)
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },
      //更换提交
      next() {
        this.$refs['phoneInfo'].validate((valid, error) => {
          if (valid) {
            var params ={
              phoneNumbers:this.phoneInfo.newPhoneNum,
              verificationCode: this.phoneInfo.newPhoneCode
            }
            userConfirmChangePhone(params).then(res=>{
              if(res.code == 200){
                this.$message({type: 'success', message: '更换成功'});
                this.phoneInfo = {
                  oldPhoneCode: '',
                  newPhoneNum: '',
                  newPhoneCode: ''
                }
                this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route);
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        })
      },

      cancelSub(){
        this.phoneInfo = {
          oldPhoneCode:'',
          newPhoneNum:'',
          newPhoneCode:''
        }
        this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route);
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

  .goPhone{
    color:#ccc;
    cursor: pointer;
  }
</style>
