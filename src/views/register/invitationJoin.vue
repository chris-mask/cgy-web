<template>
  <div class="register">
    <div class="title">
      <img :src="pdmLogo" width="35%"/>
    </div>
    <el-card>
      <div class="register_left">
        <img src="../../../static/register_left.png" alt="">
      </div>

      <!-- 加入 -->
      <div class="register_right" v-if="regType !='regOK'">
        <el-form
          ref="regForm"
          :model="regForm"
          :rules="rules"
          label-width="400px"
          label-position="top"
        >
          <div class="register_title">{{inviteUserName}}邀请您加入</div>
          <p><span style="color:#05aaff">{{regForm.inviteCompanyName}}</span></p>
          <el-form-item label="真实姓名:" prop="userName">
            <el-input size='small' v-model="regForm.userName" prefix-icon="iconfont icon-username"
                      placeholder="请输入姓名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phoneNumber">
            <el-input size='small' v-model="regForm.phoneNumber" prefix-icon="iconfont icon-shouji"
                      placeholder="请输入手机号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="verificationCode">
            <el-input size='small' style="width: 47%;" v-model="regForm.verificationCode"
                      prefix-icon="iconfont icon-yanzheng"
                      placeholder="请输入验证码" autocomplete="off"></el-input>
            <el-button @click="getCompanyCode"
                       :disabled="!showUserTime"
                       type="primary"
                       class="codeButton"
                       v-if="showUserTime"
            >

              <span>获取验证码</span>
            </el-button>
            <el-button :disabled="!showUserTime"
                       type="primary"
                       class="codeButton"
                       v-if="!showUserTime"
                       style="background-color: #ccc !important;border-color: #ccc !important;"
            >
              <span>{{count}}秒后重新发送</span>
            </el-button>
          </el-form-item>
<!--          <el-form-item label="申请理由(选填):" prop="phoneNumber">-->
<!--            <el-input size='small' v-model="regForm.phoneNumber" prefix-icon="el-input__icon el-icon-s-comment"-->
<!--                      placeholder="请输入申请理由" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
        <el-button class="bg_skyblue" @click="submitInvitation('regForm')">提交申请</el-button>
      </div>

      <!--注册成功-->
      <div class="register_right" v-if="regType == 'regOK'">
        <div class="reg-state">
          <i type="success" class="el-icon-success success"></i>
          <div class="mt_10">{{regTimeTitle}}</div>
          <div class="mt_10"><span style="color: #67c23a;">{{regCount}}</span> 秒后跳转到登陆页面</div>
        </div>
      </div>
    </el-card>
    <footer>
      <div class="footBottom">
        <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备19108476号</a>
      </div>
    </footer>
  </div>
</template>

<script>
  import logo from '../../../static/pdmLogo.png'
  import {getinviteinfo,getInviteUserPhoneValidCode,inviteUserAddCompany} from '@/api/utils'
  const TIME_SUCCESS = 3; //注册成功倒计时
  const TIME_COUNT = 60; //验证码倒计时时间
  export default {
    data(){
      // 手机号验证
      const telephone_number = /^1[3456789]\d{9}$/
      const isTelephoneNumber = (rule, value, callback) => {
        if (!telephone_number.test(value)) {
          return callback(new Error('请输入正确格式的手机号码'))
        } else {
          callback()
        }
      }

      // 验证码验证
      const verificationCode = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
      const isverificationCode = (rule, value, callback) => {
        if (!verificationCode.test(value)) {
          return callback(new Error('请输入正确验证码'))
        } else {
          callback()
        }
      }
      return{
        pdmLogo: logo,
        regForm:{},
        rules: {
          verificationCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            // {validator: isverificationCode, trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          phoneNumber: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: isTelephoneNumber, trigger: 'blur'}
          ]
        },
        regType: '',
        regTimeTitle: "",
        showUserTime: true,  // 初始启用用户按钮
        count: '',   // 初始化次数
        inviteUserName:'',
        inviteCode:'',
        inviteCompanyId:'',
        regCount:'',
        regTime:'',
      }
    },
    activated() {
      this.inviteCode = this.$route.query.inviteCode;
      if(this.inviteCode){
        this.getInviteRecord();
      }
    },
    methods:{
      //获取验证码
      getCompanyCode() {
        let params = {
          phoneNumbers: this.regForm.phoneNumber,
          companyId: this.regForm.inviteCompanyId
        };
        if (this.regForm.phoneNumber == '' || this.regForm.phoneNumber == undefined) {
          this.$message({type: 'warning', message: '电话号码不能为空'});
          return false
        }

        getInviteUserPhoneValidCode(params).then(res => {
          if (res.code == 200) {
            this.showUserTime = false;
            this.timeBack();
          }
        })

      },

      //时间倒数
      timeBack() {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--
            } else {
              this.showUserTime = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },

      //获取邀请详情
      getInviteRecord(){
        getinviteinfo({inviteCode:this.inviteCode}).then(res=>{
          if(res.code == 200){
            this.regForm.inviteCompanyId = res.data.inviteCompanyid;
            this.regForm.inviteCompanyName = res.data.inviteCompanyName;
            this.inviteUserName = res.data.inviteUserName;
            this.regForm.inviteCode = this.inviteCode;
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //提交申请
      submitInvitation(formName){
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            let params = {
              inviteCode: this.regForm.inviteCode,
              phone: this.regForm.phoneNumber,
              validCode: this.regForm.verificationCode,
              companyId: this.regForm.inviteCompanyId
            }
            inviteUserAddCompany(params).then(res=>{
              if(res.code == 200){
                this.$message({
                  type: 'success',
                  message: '提交成功'
                })
                this.regForm = {};
                this.regTimeTitle = '提交成功';
                this.regType = 'regOK';
                this.regSuccessTimeBack();
                setTimeout(() => {
                  this.$router.push({path: '/login',});
                  this.regType = '';
                  this.regTimeTitle = '';
                }, 2000)
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        })
      },

      //注册成功倒计时
      regSuccessTimeBack() {
        this.regCount = TIME_SUCCESS;
        this.regTime = setInterval(() => {
          if (this.regCount > 0 && this.regCount <= TIME_COUNT) {
            this.regCount--
          } else {
            clearInterval(this.regTime);
            this.regTime = null;
          }
        }, 1000)
      },
    }
  }
</script>

<style lang="less" scoped>
  @hoverColor: #00A8FF; // 定义一个全局鼠标移入颜色
  .register {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;

    .title {
      position: absolute;
      top: 20px;
      left: 120px;
    }

    .el-card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1030px;
      height: 690px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 18px rgba(68, 68, 68, 0.2);
      opacity: 1;

      /deep/ .el-card__body {
        display: flex;
        padding: 0;
      }

      .register_left {
        position: relative;

        .goLogin {
          position: absolute;
          bottom: 70px;
          left: 76px;
          color: #ccc;
          font-size: 16px;

          a {
            color: #008dd6;

            &:hover {
              color: @hoverColor
            }
          }
        }
      }
    }

    .register_right {
      flex: 1;
      text-align: center;

      .register_title {
        margin: 30px 0 30px;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 50px;
        color: rgba(5, 170, 255, 1);
        opacity: 1;
      }

      /deep/ .el-form-item {
        margin-top: 20px;

        &:first-child {
          margin-top: 30px;
        }

        .el-radio-group {
          width: 400px;
          text-align: left;
          padding-left: 10px;
        }

        .el-form-item__label {
          width: 400px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          text-align: left;
          font-weight: 400;
          line-height: 16px;
          color: rgba(68, 68, 68, 1);
        }

        .el-input {
          width: 400px;

          .el-input__prefix {
            position: absolute;
            left: 10px;
            line-height: 30px;

            .el-input__icon {
              line-height: 30px;
            }
          }

          .el-input-group__append {
            background: #fff;
            color: #444;
            border: none;
            border-bottom: 1px solid #DFDFDF;
          }

          .el-input__inner {
            height: 40px;
            border: none;
            text-indent: 20px;
            border-radius: 0;
            border-bottom: 1px solid #DFDFDF;

            &:focus {
              border-bottom: 1px solid #DFDFDF;
              color: #444;
            }
          }
        }

        .el-form-item__error {
          margin-left: 138px;
        }

        .capt_style {
          width: 149px;
          margin-left: -150px;
        }
      }

      .button-list {
        float: right;

        .returnPrev {
          background: #fff;
          color: #DFDFDF;
          border: 1px solid #DFDFDF;
          border-radius: 5px;

          &:hover {
            background: #E5F6FF !important;
          }
        }
      }

      /deep/ .el-button {
        margin-top: 10px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        opacity: 1;
      }

      .goLogin {
        margin-top: 30px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 16px;
        color: rgba(68, 68, 68, .4);

        a {
          color: rgba(5, 170, 255, 1);

          &:hover {
            color: rgba(5, 170, 255, .5);
          }
        }

        span {
          &:hover {
            color: @hoverColor !important;
            cursor: pointer;
          }
        }
      }
    }

    footer {
      position: fixed;
      left: 0;
      bottom: 0px;
      /*transform: translateX(-50%);*/
      width: 100%;
      text-align: center;
      margin: 0 auto;
    }
  }

  .bg_skyblue {
    width: 400px;
    height: 50px;
    background: rgba(5, 170, 255, 1);
    opacity: 1;
    border-radius: 2px;

    &:hover {
      background: rgba(5, 170, 255, .7);
    }
  }

  // 验证码的大小设置
  .codeImage {
    display: inline-block;
    width: 108px;
    height: 30px;
    vertical-align: middle;
  }

  .changeOne {
    font-size: 12px;
    color: #666;
    line-height: 40px;

    &:hover {
      color: @hoverColor
    }
  }

  .footBottom {
    background-color: #003C5C;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    /*line-height: 60px;*/
    margin-top: 20px;

    a {
      margin: 0 auto;
      display: table
    }
  }

  .codeButton {
    width: 122px;
    height: 36px;
    padding: 0;
  }

  .reg-state {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .success {
      font-size: 50px;
      color: #67c23a;
    }

    .mt_10 {
      margin-top: 10px;
    }
  }

</style>
