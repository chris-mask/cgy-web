<template>
  <div class="register">
    <div class="title">
      <img :src="pdmLogo" width="52%"/>
    </div>
    <el-card>
      <div class="register_left">
<!--        <img src="../../../static/registerBg.png" alt="">-->
        <el-image src="../../../static/registerBg.png" fit="fill" v-if="reg_part == 0 && regType != 'regOK'"></el-image>
        <el-image src="../../../static/registerBg2.png" fit="fill" v-if="reg_part == 1 && regType != 'regOK'"></el-image>
        <el-image src="../../../static/registerBg3.png" fit="fill" v-if="regType == 'regOK'"></el-image>
      </div>
      <!-- 注册企业 -->
      <div class="register_right" v-if="regType=='company'">
        <!-- 注册第一步 -->
        <el-form
          ref="regForm"
          :model="regForm"
          :rules="rules"
          label-width="400px"
          v-if="reg_part === 0"
          label-position="top"
        >
          <div class="register_title">请填写基本信息</div>
          <el-form-item label="企业名称:" prop="companyName">
            <el-input size='small' v-model="regForm.companyName" prefix-icon="iconfont icon-qiye"
                      placeholder="请输入企业名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码:" prop="companyCode">
            <el-input size='small' v-model="regForm.companyCode" prefix-icon="iconfont icon-xinyong"
                      placeholder="请输入统一社会信用代码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input size='small' v-model="regForm.phone" maxlength="20" prefix-icon="iconfont icon-shouji"
                      placeholder="请输入手机号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="verifyCode">
            <el-input size='small' style="width: 68%;" v-model="regForm.verifyCode" type="text" maxlength="16"
                      prefix-icon="iconfont icon-yanzheng"
                      placeholder="请输入验证码" autocomplete="off">
            </el-input>
            <el-button ref="companyCode"
                       @click="getCompanyCode"
                       :disabled="!showCompanyTime"
                       type="primary"
                       class="codeButton"
                       v-if="showCompanyTime"
            >
              <span>获取验证码</span>
            </el-button>
            <el-button :disabled="showCompanyTime" v-if="!showCompanyTime" class="codeButton" style="background: #ccc">
              <span>{{count}}秒后重新发送</span>
            </el-button>
          </el-form-item>
          <!--          <el-form-item label="注册资本:" prop="registeredCapital">-->
          <!--            <el-input size='small' v-model="regForm.registeredCapital" prefix-icon="iconfont icon-zijin"-->
          <!--            placeholder="请输入注册资金">-->
          <!--              <template slot="append">万元</template>-->
          <!--            </el-input>-->
        </el-form>
        <el-button class="bg_skyblue" v-if="reg_part === 0" @click="handleNext">下一步</el-button>
        <p class="goLogin" v-if="reg_part === 0">已有账号，现在 <a href="javascript:0" @click="hanldeLogin"> 去登陆</a></p>

        <!-- 注册第二步 -->
        <el-form
          ref="regForm"
          :model="regForm"
          :rules="rules"
          label-width="400px"
          v-if="reg_part === 1"
          label-position="top"
        >
          <div class="register_title">请填写账号密码</div>

          <el-form-item label="登陆账号:" prop="loginName">
            <el-input size='small' v-model="regForm.loginName" maxlength="20" prefix-icon="iconfont icon-username"
                      placeholder="请输入登陆账号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码:" prop="password">
            <el-input size='small' v-model="regForm.password" type="password" maxlength="16"
                      prefix-icon="iconfont icon-password"
                      placeholder="请输入登陆密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="rePassword">
            <el-input size='small' v-model="regForm.rePassword" type="password" maxlength="16"
                      prefix-icon="iconfont icon-password"
                      placeholder="请再次确认密码" autocomplete="off"></el-input>
          </el-form-item>
          <!--          <el-form-item label="确认密码:" prop="rePassword">-->
          <!--            <el-input v-model="regForm.rePassword" type="password" maxlength="16" prefix-icon="iconfont icon-password"-->
          <!--            placeholder="请再次确认密码"></el-input>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="验证码:" prop="verifyCode">-->
          <!--            <el-input v-model="regForm.verifyCode" class="capt_style" prefix-icon="iconfont icon-yanzheng"-->
          <!--            placeholder="请输入验证码"></el-input>-->
          <!--            &lt;!&ndash; <div class="codeImage"><img :src="codeUrl" alt=""></div>  &ndash;&gt;-->
          <!--            <a href="javascript:" class="changeOne">看不清楚，换一张</a>-->
          <!--          </el-form-item>-->
        </el-form>
        <el-button class="bg_skyblue" v-if="reg_part === 1" @click="handleSubmit">完成</el-button>
        <p class="goLogin" v-if="reg_part === 1" @click="handlePrev"><span>返回上一步</span></p>

        <!-- 注册第三步 -->
        <!--        <el-form-->
        <!--          ref="regForm"-->
        <!--          :model="regForm"-->
        <!--          :rules="rules"-->
        <!--          label-width="400px"-->
        <!--          v-if="reg_part === 2"-->
        <!--          label-position="top"-->
        <!--        >-->
        <!--          <div class="register_title">管理员信息</div>-->
        <!--          <el-form-item label="姓名:" prop="userName">-->
        <!--            <el-input v-model="regForm.userName" prefix-icon="iconfont icon-username"-->
        <!--            placeholder="请输入姓名"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="性别:" prop="sex">-->
        <!--            <el-radio-group v-model="regForm.sex">-->
        <!--              <el-radio label="0">男</el-radio>-->
        <!--              <el-radio label="1">女</el-radio>-->
        <!--            </el-radio-group>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="手机号:" prop="phone">-->
        <!--            <el-input v-model="regForm.phone" prefix-icon="iconfont icon-shouji"-->
        <!--            placeholder="请输入手机号">-->
        <!--            </el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="邮箱:" prop="userEmail">-->
        <!--            <el-input v-model="regForm.userEmail" prefix-icon="iconfont icon-youxiang"-->
        <!--            placeholder="请输入邮箱"></el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-form>-->
        <!--        <el-button class="bg_skyblue" v-if="reg_part === 2" @click="handleSubmit">完成</el-button>-->
        <!--        <p class="goLogin" v-if="reg_part === 2" @click="handlePrev"><span>返回上一步</span></p>-->
      </div>

      <!-- 注册个人 -->
      <div class="register_right" v-if="regType=='user'">
        <!-- 注册第一步 -->
        <el-form
          ref="regForm"
          :model="regForm"
          :rules="rules"
          label-width="400px"
          v-if="reg_part === 0"
          label-position="top"
        >
          <div class="register_title">请填写基本信息</div>
          <p v-if="regForm.inviteCompanyName" style="margin-bottom: 20px;">{{inviteUserName}}邀请您加入<span style="color:#05aaff">{{regForm.inviteCompanyName}}</span></p>
          <el-form-item label="名称:" prop="companyName">
            <el-input size='small' v-model="regForm.companyName" placeholder="请输入名称" autocomplete="off">
              <i slot="prefix" class="el-input__icon el-icon-user-solid" style="font-size: 20px;"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="身份证号码:" prop="idCard">
            <el-input size='small' v-model="regForm.idCard" prefix-icon="iconfont icon-xinyong"
                      placeholder="请输入身份证号码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input size='small' v-model="regForm.phone" prefix-icon="iconfont icon-shouji"
                      placeholder="请输入手机号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="verifyCode">
            <el-input size='small' style="width: 68%;" v-model="regForm.verifyCode"
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
        </el-form>
        <el-button class="bg_skyblue" v-if="reg_part === 0" @click="handleNext">下一步</el-button>
        <p class="goLogin" v-if="reg_part === 0">已有账号，现在 <a href="javascript:0" @click="hanldeLogin"> 去登陆</a></p>

        <!-- 注册第二步 -->
        <el-form
          ref="regForm"
          :model="regForm"
          :rules="rules"
          label-width="400px"
          v-if="reg_part === 1"
          label-position="top"
        >
          <div class="register_title">请填写账号密码</div>
          <el-form-item label="登陆账号:" prop="loginName">
            <el-input size='small' v-model="regForm.loginName" maxlength="20" prefix-icon="iconfont icon-username"
                      placeholder="请输入登陆账号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码:" prop="password">
            <el-input size='small' v-model="regForm.password" type="password" maxlength="16"
                      prefix-icon="iconfont icon-password"
                      placeholder="请输入登陆密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="rePassword">
            <el-input size='small' v-model="regForm.rePassword" type="password" maxlength="16"
                      prefix-icon="iconfont icon-password"
                      placeholder="请再次确认密码" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="bg_skyblue" v-if="reg_part === 1" @click="handleSubmit">完成</el-button>
        <p class="goLogin" v-if="reg_part === 1" @click="handlePrev"><span>返回上一步</span></p>

        <!-- 注册第三步 -->
        <!--        <el-form-->
        <!--          ref="regForm"-->
        <!--          :model="regForm"-->
        <!--          :rules="rules"-->
        <!--          label-width="400px"-->
        <!--          v-if="reg_part === 2"-->
        <!--          label-position="top"-->
        <!--        >-->
        <!--          <div class="register_title">管理员信息</div>-->
        <!--          <el-form-item label="姓名:" prop="userName">-->
        <!--            <el-input v-model="regForm.userName" prefix-icon="iconfont icon-username"-->
        <!--                      placeholder="请输入姓名"></el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="性别:" prop="sex">-->
        <!--            <el-radio-group v-model="regForm.sex">-->
        <!--              <el-radio label="0">男</el-radio>-->
        <!--              <el-radio label="1">女</el-radio>-->
        <!--            </el-radio-group>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="手机号:" prop="phone">-->
        <!--            <el-input v-model="regForm.phone" prefix-icon="iconfont icon-shouji"-->
        <!--                      placeholder="请输入手机号">-->
        <!--            </el-input>-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="邮箱:" prop="userEmail">-->
        <!--            <el-input v-model="regForm.userEmail" prefix-icon="iconfont icon-youxiang"-->
        <!--                      placeholder="请输入邮箱"></el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-form>-->
        <!--        <el-button class="bg_skyblue" v-if="reg_part === 2" @click="handleSubmit">完成</el-button>-->
        <!--        <p class="goLogin" v-if="reg_part === 2" @click="handlePrev"><span>返回上一步</span></p>-->
      </div>

      <!-- 忘记密码 -->
      <div class="register_right" v-if="regType=='reset'">
        <!-- 注册第一步 -->
        <el-form
          ref="regForm"
          :model="regForm"
          :rules="rules"
          label-width="400px"
          v-if="reg_part === 0"
          label-position="top"
        >
          <div class="register_title">重置密码</div>
          <el-form-item label="新密码:" prop="newPassword">
            <el-input size='small' v-model="regForm.newPassword" type="password" maxlength="16"
                      prefix-icon="iconfont icon-password"
                      placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="newRpassword">
            <el-input size='small' v-model="regForm.newRpassword" type="password" maxlength="16"
                      prefix-icon="iconfont icon-password"
                      placeholder="请再次确认密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input size='small' v-model="regForm.phone" prefix-icon="iconfont icon-shouji"
                      placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="verifyCode">
            <el-input size='small' style="width: 68%;" v-model="regForm.verifyCode"
                      prefix-icon="iconfont icon-yanzheng"
                      placeholder="请输入验证码"></el-input>
            <el-button @click="getCompanyCode"
                       :disabled="!showResetTime"
                       type="primary"
                       class="codeButton"
                       v-if="showResetTime"
            >
              <span>获取验证码</span>
            </el-button>
            <el-button :disabled="!showResetTime"
                       class="codeButton"
                       v-if="!showResetTime"
                       style="background: #ccc"
            >
              <span>{{count}}秒后重新发送</span>
            </el-button>
          </el-form-item>
        </el-form>
        <el-button class="bg_skyblue" v-if="reg_part === 0" @click="handleSubmit">重置密码</el-button>
        <p class="goLogin" v-if="reg_part === 0">已有账号，现在 <a href="javascript:0" @click="hanldeLogin"> 去登陆</a></p>
      </div>

      <!--注册成功 -->
      <div class="register_right" v-if="regType == 'regOK'">
        <div class="reg-state">
<!--          <i type="success" class="el-icon-success success"></i>-->
          <img src="../../../static/registerSuc.png" width="40%">
          <div class="mt_10">{{regTimeTitle}}</div>
          <p style="font-size:16px;color:#BDBDBD;line-height:26px;">感谢您的注册，愿与您风雨同舟砥砺前行！</p>
          <div class="mt_10"><span style="color: #67c23a;">{{regCount}}</span> 秒后跳转到登陆页面</div>
        </div>
      </div>


    </el-card>
<!--    <footer>-->
<!--      &lt;!&ndash;<img src="../../../static/register_footer.png" alt="">&ndash;&gt;-->
<!--      <div class="footBottom">-->
<!--        <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备19108476号</a>-->
<!--      </div>-->
<!--    </footer>-->
  </div>
</template>

<script>
  import {
    register,
    getRegisterCompanyVerificationCode,
    getRegisterUserVerificationCode,
    getRetrievePasswordCode,
    registerCompany,
    retrievePassword,
    checkCompanyCodeUnique,
    checkCompanyNameUnique,
    checkCompanyOrPersonnelPhoneUnique,
    checkPersonnelIdCode,
    checkLoginNameUnique
  } from '@/api/user.js'
  import {getinviteinfo} from '@/api/utils'
  import {callbackError} from '@/utils/callbackError'
  import logo from '../../../static/pdmLogo.png'

  const TIME_SUCCESS = 2; //注册成功倒计时
  const TIME_COUNT = 60; //验证码倒计时时间
  export default {

    data() {

      // 校验字段是否中文字符
      const Chinese = /[\u4e00-\u9fa5]/
      const isChinese = (rule, value, callback) => {
        checkCompanyNameUnique({companyName:value}).then(res=>{
          if(res.code == 200){
            if(res.data != 0){
              return callback(new Error('此用户已存在'))
            } else {
              callback()
            }
            if (!Chinese.test(value)) {
              return callback(new Error('名称只能输入中文字符!'))
            } else {
              callback()
            }
          }
        })
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
      // 再次验证密码
      const validatePass2 = (rule, value, callback) => {
        if (value !== this.regForm.password) {
          return callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      const validatePass3 = (rule, value, callback) => {
        if (value !== this.regForm.newPassword) {
          return callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      // 注册资本为数字，正则表达验证
      const num = /[1-9]\d*.\d*|0\.\d*[1-9]\d*|[1-9]\d*/
      const isNum = (rule, value, callback) => {
        if (!num.test(value)) {
          return callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      // 统一社会信用代码正则表达验证
      const credit_code = /[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/
      const isCreditCode = (rule, value, callback) => {
        checkCompanyCodeUnique({companyCode:value}).then(res=>{
          if(res.code == 200){
            if(res.data != 0){
              return callback(new Error('此企业已存在'))
            } else {
              callback()
            }

            if (!credit_code.test(value)) {
              return callback(new Error('请输入正确格式的统一社会信用代码'))
            } else {
              callback()
            }
          }
        })
      }
      // 手机号验证
      const telephone_number = /^1[3456789]\d{9}$/
      const isTelephoneNumber = (rule, value, callback) => {
        if(this.regType != 'reset'){
          checkCompanyOrPersonnelPhoneUnique({phone:value}).then(res=>{
            if(res.code == 200){
              if(res.data != 0){
                return callback(new Error('此电话号码已存在'))
              } else {
                callback()
              }

              if (!telephone_number.test(value)) {
                return callback(new Error('请输入正确格式的手机号码'))
              } else {
                callback()
              }
            }
          })
        }else{
          if (!telephone_number.test(value)) {
            return callback(new Error('请输入正确格式的手机号码'))
          } else {
            callback()
          }
        }
      }
      // 邮箱验证
      const email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      const isEmail = (rule, value, callback) => {
        if (!email.test(value)) {
          return callback(new Error('请输入正确格式的邮箱'))
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

      //身份证号码验证
      const idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      const isIdCard = (rule, value, callback) => {
        checkPersonnelIdCode({idCard:value}).then(res=>{
          if(res.code == 200){
            if(res.data != 0){
              return callback(new Error('此身份证号码已存在'))
            } else {
              callback()
            }

            if (!value) {
              return callback(new Error('证件号码不能为空'))
            } else if (!idCard.test(value)) {
              return callback(new Error('证件号码不正确'))
            } else {
              callback()
            }
          }
        })
      }

      //用户验证
      const isLoginName = (rule, value, callback) => {
        checkLoginNameUnique({loginName:value}).then(res=>{
          if(res.code == 200){
            if(res.data != 0){
              return callback(new Error('此用户名已存在'))
            } else {
              callback()
            }
          }
        })
      }


      return {
        pdmLogo: logo,
        regType: '',
        regForm: {
          // companyName: "",
          // code: "",
          // phoneNumber: "",
          // verificationCode: "",
          // userName: "",
          // sex: "1",
          // userEmail: "",
          // loginName: "",
          // password: "",
          // repassword: "",
          // newPassword: "",
          // newRpassword: "",
        }, // 注册表单对象
        reg_part: 0, // 当前注册步骤
        // 表单校验数组
        rules: {
          companyName: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {validator: isChinese, trigger: 'blur'}
          ],
          legalRepresentative: [
            {required: true, message: '请输入法定代表人', trigger: 'blur'}
          ],
          registeredCapital: [
            {required: true, message: '请输入注册资本', trigger: 'blur'},
            {validator: isNum, trigger: 'blur'}
          ],
          companyCode: [
            {required: true, message: '请输入统一社会信用代码', trigger: 'blur'},
            {max: 18, message: '请输入正确格式的统一社会信用代码', trigger: 'blur'},
            {validator: isCreditCode, trigger: 'blur'}
          ],
          idCard: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            {max: 18, message: '请输入身份证号码', trigger: 'blur'},
            {validator: isIdCard, trigger: 'blur'}
          ],
          loginName: [
            {required: true, message: '请输入登陆账号', trigger: 'blur'},
            {min: 6, message: '账户长度不能小于6位', trigger: 'blur'},
            {validator: isLoginName, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登陆密码', trigger: 'blur'},
            {min: 8, max: 16, message: '密码长度不能小于8位', trigger: 'blur'},
            {validator: isPwd, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入登陆密码', trigger: 'blur'},
            {min: 8, max: 16, message: '密码长度不能小于8位', trigger: 'blur'},
            {validator: isPwd, trigger: 'blur'}
          ],
          rePassword: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {min: 8, max: 16, message: '密码长度不能小于8位', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ],
          newRpassword: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {min: 8, max: 16, message: '密码长度不能小于8位', trigger: 'blur'},
            {validator: validatePass3, trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            // {validator: isverificationCode, trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: isTelephoneNumber, trigger: 'blur'}
          ],
          userEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: isEmail, trigger: 'blur'}
          ]
        },
        showUserTime: true,  // 初始启用用户按钮
        showCompanyTime: true,  // 初始启用企业按钮
        showResetTime: true,  // 初始启用重置按钮
        count: '',   // 初始化次数
        timer: null,
        regCount: '',
        regTime: null,
        regTimeTitle: "",
        invite:'',
        inviteUserName:'',
        inviteCode:'',
        inviteCompanyId:'',
      }
    },
    mounted() {
      this.reg_part = 0;
      this.regForm = {};
      this.regType = this.$route.query.name;
      this.invite = this.$route.query.invite;
      this.inviteCode = this.$route.query.inviteCode;
      if (this.$refs.regForm !== undefined) {
        this.$refs.regForm.resetFields();
      }

      if(this.invite){
        this.getInviteRecord();
      }
    },
    // activated() {
    //   this.reg_part = 0;
    //   this.regForm = {};
    //   this.regType = this.$route.query.name;
    //   this.invite = this.$route.query.invite;
    //   this.inviteCode = this.$route.query.inviteCode;
    //   if (this.$refs.regForm !== undefined) {
    //     this.$refs.regForm.resetFields();
    //   }
    //
    //   if(this.invite){
    //     this.getInviteRecord();
    //   }
    // },
    methods: {
      // 去登陆
      hanldeLogin() {
        this.$router.push({path: '/login'})
      },
      // 处理下一步
      handleNext() {
        this.$refs['regForm'].validate((valid, error) => {
          if (valid) {
            this.reg_part++;
          }
        })
      },
      // 返回上一步
      handlePrev() {
        this.reg_part--;
        this.$refs.regForm.resetFields();
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
              if (this.regType == 'user') {
                this.showUserTime = true;
              } else if (this.regType == 'company') {
                this.showCompanyTime = true;
              } else if (this.regType == 'reset') {
                this.showResetTime = true;
              }
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
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

      //获取注册企业验证码
      getCompanyCode() {
        if (this.regForm.phone == '' || this.regForm.phone == undefined) {
          this.$message({type: 'warning', message: '电话号码不能为空'});
          return false
        }
        if (this.regType == 'user') {
          let params = {
            phoneNumbers: this.regForm.phone,
            tempCode: 'SMS_180455055'
          };
          getRegisterUserVerificationCode(params).then(res => {
            if (res.code == 200) {
              this.showUserTime = false;
              this.timeBack();
            }
          })
        } else if (this.regType == 'company') {
          let params = {
            phoneNumbers: this.regForm.phone,
            tempCode: 'SMS_182672860'
          };
          getRegisterCompanyVerificationCode(params).then(res => {
            if (res.code == 200) {
              this.showCompanyTime = false;
              this.timeBack();
            }
          })
          // getRegisterUserVerificationCode(params).then(res => {
          //   if (res.code == 200) {
          //     this.showCompanyTime = false;
          //     this.timeBack();
          //   }
          // })
        } else if (this.regType == 'reset') {
          let params = {
            verificationCode: this.regForm.verifyCode,
            phoneNumbers: this.regForm.phone,
          };
          // this.regForm.verificationCode = this.regForm.verifyCode
          // this.regForm.phoneNumber = this.regForm.phone
          getRetrievePasswordCode(params).then(res => {
            if (res.code == 200) {
              this.showResetTime = false;
              this.timeBack();
            }
          })
        }

      },
      // 完成注册
      handleSubmit() {
        this.$refs['regForm'].validate((valid, error) => {
          if (valid) {
            if (this.regType == 'user') {
              this.regForm.registerType = 'personnel'
              this.regForm.templateCode = 'SMS_180455055'
              registerCompany(this.regForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '注册成功'
                  })
                  this.regForm = {};
                  this.regTimeTitle = '恭喜您！注册成功';
                  this.regType = 'regOK';
                  this.regSuccessTimeBack();
                  setTimeout(() => {
                    this.$router.push({path: '/login',});
                    this.regType = '';
                    this.regTimeTitle = '';
                  }, 2000)
                }
              }).catch(() => {
              })
            } else if (this.regType == 'company') {
              this.regForm.registerType = 'company'
              this.regForm.templateCode = 'SMS_182672860'
              registerCompany(this.regForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '注册成功'
                  })
                  this.regForm = {};
                  this.regTimeTitle = '恭喜您！注册成功';
                  this.regType = 'regOK';
                  this.regSuccessTimeBack();
                  setTimeout(() => {
                    this.$router.push({path: '/login',})
                    this.regType = '';
                    this.regTimeTitle = '';
                  }, 2000)
                }
              })
            } else if (this.regType == 'reset') {
              this.regForm.verificationCode = this.regForm.verifyCode
              this.regForm.phoneNumber = this.regForm.phone
              retrievePassword(this.regForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '重置成功'
                  })
                  this.regForm = {};
                  this.regTimeTitle = '重置成功';
                  this.regType = 'regOK';
                  this.regSuccessTimeBack();
                  setTimeout(() => {
                    this.$router.push({path: '/login',});
                    this.regType = '';
                    this.regTimeTitle = '';
                  }, 2000)
                }
              })
            }

          } else {
            callbackError(this, error)
            return false
          }
        })
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
      width: 772px;
      height: 600px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 18px rgba(68, 68, 68, 0.2);
      opacity: 1;

      /deep/ .el-card__body {
        display: flex;
        padding: 0;
        height: 100%;
      }

      .register_left {
        position: relative;
        flex:1.6;
        .el-image{
          height: 100%;
        }
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

      .register_right {
        flex: 2.5;
        text-align: center;

        .register_title {
          margin: 20px 0 20px;
          font-size:18px;
          font-weight:400;
          color:rgba(68,68,68,1);
        }

        /deep/ .el-form-item {
          /*margin-top: 20px;*/
          display: table;
          margin: 0 auto;
          margin-bottom: 24px;
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
            /*margin-left: 45px;*/
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
