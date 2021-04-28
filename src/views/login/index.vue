<template>
  <div class="login">
    <div class="title">
      <!-- 左上角LOGO-->
      <img :src="logo" width="35%"/>
    </div>
    <div class="login_tips">{{ todayTips }}</div>
    <!-- 右边登录框-->
    <el-card style="max-width: 520px;max-height: 560px;margin-left: 300px;">
      <!--
      <div class="login_left">
        <el-image :src="bgImg" fit="fill"></el-image>
      </div>-->

      <!-- 登陆表单 -->
      <div class="login_right">
        <div class="login_title">后台登录<!--<img :src="logo" width="35%"/>--></div>
        <div class="loginStyle">
          <span :class="loginMode == 0 ? 'active' : '' " @click="changeLoginMode(0)">账号密码登录</span>
          <span :class="loginMode == 1 ? 'active' : '' " @click="changeLoginMode(1)">手机号码登录</span>
        </div>
        <div v-if='loginMode == 0'>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            label-width="400px"
            label-position="top"
          >
            <el-form-item label="账号:" prop="username">
              <el-input class="inputData" size='small' v-model="loginForm.username" prefix-icon="iconfont icon-username"
                        placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password" v-if="visibles">
              <el-input size='small' v-model="loginForm.password" type="password" maxlength="16"
                        prefix-icon="iconfont icon-password"
                        placeholder="请输入密码" @keyup.enter.native="handleSubmit">
                <i slot="suffix" title="显示密码" style="cursor:pointer;"
                   class="pwd-icon pwd_show" @click="changePass('show')"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password" v-else>
              <el-input size='small' v-model="loginForm.password" type="text" maxlength="16"
                        prefix-icon="iconfont icon-password"
                        placeholder="请输入密码" @keyup.enter.native="handleSubmit">
                <i slot="suffix" title="隐藏密码" style="cursor:pointer;"
                   class="pwd-icon pwd_hide" @click="changePass('hide')"></i>
              </el-input>
            </el-form-item>
            <!--            <el-form-item label="验证码:" prop="verificationCode">-->
            <!--              <el-input size='small' v-model="loginForm.verificationCode" class="capt_style capt_style2"-->
            <!--                        prefix-icon="iconfont icon-yanzheng"-->
            <!--                        placeholder="请输入验证码"></el-input>-->
            <!--               <div class="codeImage"><img :src="codeUrl" alt=""></div>-->
            <!--              <a href="javascript:" class="changeOne getCode">看不清楚，换一张</a>-->
            <!--            </el-form-item>-->
          </el-form>
        </div>

        <div v-if='loginMode == 1'>
          <el-form
            ref="loginPhoneForm"
            :model="loginPhoneForm"
            :rules="rulesPhone"
            label-width="400px"
            label-position="top"
          >
            <el-form-item label="手机号码:" prop="phoneNumbers">
              <el-input size='small' v-model="loginPhoneForm.phoneNumbers" maxlength="11"
                        prefix-icon="iconfont icon-username"
                        placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" prop="verCode">
              <el-input size='small' v-model="loginPhoneForm.verCode" type="number" class="capt_style" maxlength="8"
                        prefix-icon="iconfont icon-yanzheng" placeholder="请输入验证码"></el-input>
              <el-button v-show='sendShow' type="primary" size="small" class="getCode" @click="getVerCode">发送验证码
              </el-button>
              <el-button v-show='!sendShow' size="small" :disabled="true" class="getCode" style="color:#dcdcdc;">
                {{codeTime + 's'}}
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-button size='small' class="bg_skyblue" @click="handleSubmit" :disabled="isLogin">
          <span v-if="!isLogin">登 陆</span>
          <span v-else>登 陆 中...</span>
        </el-button>

<!--        <p class="goReg">暂无账号，现在<a style="color: #05aaff" @click="handleRegister('company')">注册</a></p>-->

<!--        <p class="chengguoTis">提供跨部门的协同服务和研发管理工具</p>-->
        <div class="explain">
          <ul>
            <li>
              <span class="num-icon" style="background: #69CCFF;">1</span>
              <div>如果你想以企业的名义使用平台，且没有企业账号：<a style="color: #05aaff" @click="handleRegister('company')">企业注册</a>；</div>
            </li>
            <li>
              <span class="num-icon" style="background: #91E5A1;">2</span>
              有了企业账号后，登录后到”后台管理->用户管理“下新增用户；
            </li>
            <li>
              <span class="num-icon" style="background: #9BB5FF;">3</span>
              如果你想以个人的名义使用平台，且还没有个人账号：<a style="color: #05aaff" @click="handleRegister('user')">个人注册</a>。
            </li>

            <!--            <li>-->
            <!--              <span class="num-icon" style="background: #FFCBA6;">4</span>-->
            <!--              123456-->
            <!--            </li>-->
          </ul>
        </div>
        <div class="goRegister">
          <div>
            <!--            <a @click="handleRegister('user')">个人注册</a>-->
            <!--            <span>/</span>-->
            <!--            <a @click="handleRegister('company')">企业注册</a>-->
          </div>
          <span @click="handleRegister('reset')">忘记密码</span>
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
  import {login, getUserInfo, getLoginVerificationCode, phoneToken,getCompanyMenu} from '@/api/user.js'
  import {callbackError} from '@/utils/callbackError'
  import {getSecretKey,getEncryptInfo,getRsaPKey,saveClientPKey,queryCompanyOssRemainingCapacity} from '@/api/utils'

  import logo from '../../../static/logo.png'
  import bgImg from '../../../static/loginBg.png'
  import {MessageBox} from "element-ui";
  import secret from '@/utils/secret'
  import { Base64 } from 'js-base64'

  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以我就在前面加了一个+实现隐式转换

          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('电话号码格式不正确'))
            }
          }
        }, 100)
      }
      return {
        nowDate: "", // 当前日期
        todayTips:"bbbbbbbbb* 我今天的小目标是什么？",//激励小提示
        logo: logo,
        bgImg:bgImg,
        loginMode: 0,
        sendShow: true,
        codeTime: 0,
        loginPhoneForm: {
          phoneNumbers: '',
          verCode: ''
        },
        rulesPhone: {
          phoneNumbers: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {min: 11, message: '账户长度不能小于11位', trigger: 'blur'}
          ],
          verCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 6, max: 8, message: '验证码长度不能小于6位', trigger: 'blur'}
          ]
        },
        loginForm: {
          grantType: 'password',
          password: '',
          verificationCode: '1234',
          username: ''
        }, // 登陆表单对象
        // 表单校验数组
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 4, message: '账户长度不能小于6位', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码长度不能小于6位', trigger: 'blur'}
          ],
          verificationCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        companyId: "",
        companyName: "",
        companyType: "",
        isLogin: false,
        visibles: true
      }
    },

    activated() {
      this.$refs.loginForm.resetFields();
    },

    methods: {
      // 更换登陆方式
      changeLoginMode(num) {
        if (num == 0) {
          this.loginMode = 0
        }
        if (num == 1) {
          this.loginMode = 1
        }
      },

      // 获取验证码
      getVerCode() {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!this.loginPhoneForm.phoneNumbers) {
          this.$message({type: 'warning', message: '电话号码不能为空'})
          return
        }
        if (!Number.isInteger(+this.loginPhoneForm.phoneNumbers)) {
          this.$message({type: 'warning', message: '请输入数字值'})
          return
        } else {
          if (phoneReg.test(this.loginPhoneForm.phoneNumbers)) {
          } else {
            this.$message({type: 'warning', message: '电话号码格式不正确'})
            return
          }
        }

        var params = {
          phoneNumbers: this.loginPhoneForm.phoneNumbers
        }
        getLoginVerificationCode(params).then(res => {
          if (res.code == 200) {
            this.sendShow = false
            this.codeTime = 60
            var auth_timetimer = setInterval(() => {
              this.codeTime--
              if (this.codeTime <= 0) {
                this.sendShow = true
                clearInterval(auth_timetimer)
              }
            }, 1000)
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 现在注册
      handleRegister(data) {
        if (data == 'company') {
          this.$router.push({path: '/register', query: {name: data}})
        } else if (data == "user") {
          this.$router.push({path: '/register', query: {name: data}})
        } else if (data == "reset") {
          this.$router.push({path: '/register', query: {name: data}})
        }
      },

      compare(attr) {
        return function (a, b) {
          var val1 = a[attr];
          var val2 = b[attr];
          return val1 - val2;
        }
      },

      //获取默认公司id
      getCompanyId() {
        let that = this
        var params = {}
        getCompanyMenu(params).then(res => {
          if (res.code == 200) {
            if (JSON.stringify(res.data) === '{}') {
              this.companyId = '';
            } else {
              let newArr = Object.values(res.data);
              newArr.sort(that.compare('companyType'));
              this.companyId = newArr[0].companyId;
              this.companyName = newArr[0].companyName;
              this.companyType = newArr[0].companyType;
              this.$store.commit('SET_PERMISSION_STATE', newArr[0].permissionState);
              this.$store.commit('SET_PERMISSION_TIME', newArr[0].permissionToTime);
            }
          }
        });
      },

      // 完成登陆
      handleSubmit() {
        if (this.loginMode == 0) {
          this.$refs['loginForm'].validate((valid, error) => {
            if (valid) {
              this.isLogin = true;
              console.log('asddaaa')
              login(this.loginForm).then(res => {
                console.log('aaa',res)
                if (res.code === 200) {
                  this.$store.commit('SET_NAME', this.loginForm.username);
                  this.$store.commit('SET_ACCESS_TOKEN', res.accessToken);
                  this.$store.commit('SET_TOKEN_TYPE', res.tokenType);
                  this.$store.commit('SET_REFRESH_TOKEN', res.refreshToken);
                  getCompanyMenu({}).then(response => {
                    if (response.code === 200) {
                      if (JSON.stringify(response.data) === '{}') {
                        this.companyId = '';
                      } else {
                        let newArr = Object.values(response.data);
                        let that = this;
                        newArr.sort(that.compare('companyType'));
                        this.companyId = newArr[0].companyId;
                        this.companyName = newArr[0].companyName;
                        this.companyType = newArr[0].companyType;
                        this.$store.commit('SET_PERMISSION_STATE', newArr[0].permissionState);
                        this.$store.commit('SET_PERMISSION_TIME', newArr[0].permissionToTime);
                        this.$store.commit('SET_COMPANY_ID', this.companyId);
                        this.$store.commit('SET_COMPANY_NAME', this.companyName);
                        this.$store.commit('SET_COMPANY_TYPE', this.companyType);
                      }
                      if (this.companyId != 697480101377343488) {
                        this.$store.commit('SET_NAME', '');
                        this.$store.commit('SET_ACCESS_TOKEN', '');
                        this.$store.commit('SET_TOKEN_TYPE', '');
                        this.$store.commit('SET_REFRESH_TOKEN', '');
                        this.$store.commit('SET_PERMISSION_STATE', '');
                        this.$store.commit('SET_PERMISSION_TIME', '');
                        // 去后台登录
                        MessageBox.confirm('该账户不是内部账号, 现跳转到企业登录页面？', '确认跳转', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          location.href = 'https://chengguoyun.cn/#/login'
                        }).catch(() => {
                          this.$message.info("关闭")
                          location.reload()
                        })
                      } else {
                        this.getEncrypt();
                        // 获取当前用户信息，如果是超级管理员把id存起来
                        let params = {
                          name: this.$store.state.user.name
                        }

                        setTimeout(() => {
                          if (this.companyId != "") {
                            getUserInfo(params).then(response => {
                              this.$store.commit('SET_ID', response.data.id);
                              this.$store.commit('SET_USERNAME', response.data.userName);
                              this.$store.commit('SET_EMAIL', response.data.email);
                              this.$store.commit('SET_SEX', response.data.userSex);
                              this.$message({
                                type: 'success',
                                message: '登陆成功'
                              })

                              setTimeout(()=>{
                                this.$router.push({path: '/dashboard'});
                              }, 1500)

                              // location.reload();
                              this.isLogin = false;
                              this.getUploadFileCapacity(this.companyId)

                              this.createSocket(this.getWebIP());
                            })
                          } else {
                            setTimeout(()=>{
                              this.$router.push({path: '/dashboard'});
                            }, 1500)
                            // location.reload();
                            this.isLogin = false;
                          }
                        }, 300)
                      }
                    }
                  })
                }
              }).catch(() => {
                this.isLogin = false;
              })
            } else {
              this.isLogin = false;
              callbackError(this, error);
              return false
            }
          })
        } else {
          const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
          if (!this.loginPhoneForm.phoneNumbers) {
            this.$message({type: 'warning', message: '电话号码不能为空'})
            return
          }
          if (!Number.isInteger(+this.loginPhoneForm.phoneNumbers)) {
            this.$message({type: 'warning', message: '请输入数字值'})
            return
          } else {
            if (phoneReg.test(this.loginPhoneForm.phoneNumbers)) {
            } else {
              this.$message({type: 'warning', message: '电话号码格式不正确'})
              return
            }
          }

          if (this.loginPhoneForm.verCode == '' || this.loginPhoneForm.verCode == undefined) {
            this.$message({type: 'warning', message: '验证码不能为空'})
            return
          }

          const verCodeReg = /^[0-9]{6}$/
          if (verCodeReg.test(this.loginPhoneForm.verCode)) {
          } else {
            this.$message({type: 'warning', message: '验证码格式不正确'})
            return
          }

          var params = {
            phoneNum: this.loginPhoneForm.phoneNumbers,
            verificationCode: this.loginPhoneForm.verCode
          }
          phoneToken(params).then(res => {
            this.isLogin = true;
            if (res.code == 200) {
              this.$store.commit('SET_NAME', this.loginForm.username);
              this.$store.commit('SET_ACCESS_TOKEN', res.accessToken);
              this.$store.commit('SET_TOKEN_TYPE', res.tokenType);
              this.$store.commit('SET_REFRESH_TOKEN', res.refreshToken);
              this.getCompanyId();

              getCompanyMenu({}).then(response => {
                if (response.code === 200) {
                  if (JSON.stringify(response.data) === '{}') {
                    this.companyId = '';
                  } else {
                    let newArr = Object.values(response.data);
                    let that = this;
                    newArr.sort(that.compare('companyType'));
                    this.companyId = newArr[0].companyId;
                    this.companyName = newArr[0].companyName;
                    this.companyType = newArr[0].companyType;
                    this.$store.commit('SET_PERMISSION_STATE', newArr[0].permissionState);
                    this.$store.commit('SET_PERMISSION_TIME', newArr[0].permissionToTime);
                    this.$store.commit('SET_COMPANY_ID', this.companyId);
                    this.$store.commit('SET_COMPANY_NAME', this.companyName);
                    this.$store.commit('SET_COMPANY_TYPE', this.companyType);
                  }
                  if (this.companyId != 697480101377343488) {
                    this.$store.commit('SET_NAME', '');
                    this.$store.commit('SET_ACCESS_TOKEN', '');
                    this.$store.commit('SET_TOKEN_TYPE', '');
                    this.$store.commit('SET_REFRESH_TOKEN', '');
                    this.$store.commit('SET_PERMISSION_STATE', '');
                    this.$store.commit('SET_PERMISSION_TIME', '');
                    // 去后台登录
                    MessageBox.confirm('该账户不是内部账号, 现跳转到企业登录页面？', '确认跳转', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      location.href = 'https://chengguoyun.cn/#/login'
                    }).catch(() => {
                      this.$message.info("关闭")
                      location.reload()
                    })
                  } else {
                    this.getEncrypt();
                    setTimeout(() => {
                      // 获取当前用户信息，如果是超级管理员把id存起来
                      if (this.companyId != "") {
                        getUserInfo({name: this.$store.state.user.name}).then(response => {
                          this.$store.commit('SET_ID', response.data.id);
                          this.$store.commit('SET_USERNAME', response.data.userName);
                          this.$store.commit('SET_EMAIL', response.data.email);
                          this.$store.commit('SET_SEX', response.data.userSex);
                          this.$message({
                            type: 'success',
                            message: '登陆成功'
                          })

                          // window.location.reload()
                          setTimeout(()=>{
                            this.$router.push({path: '/dashboard'});
                          }, 1500)
                          this.isLogin = false;
                          this.getUploadFileCapacity(this.companyId)

                          this.createSocket(this.getWebIP());
                        })
                      } else {
                        setTimeout(()=>{
                          this.$router.push({path: '/dashboard'});
                          // location.reload();
                        }, 1500)
                        this.isLogin = false;
                      }
                    }, 300)
                  }
                }
              })
            } else {
              this.$message({type: 'error', message: res.message})
              this.isLogin = false;
            }
          })
        }
      },

      //控制密码显示隐藏
      changePass(value, kind) {
        this.visibles = !(value === 'show');
      },

      //获取白名单
      getEncrypt(){
        getEncryptInfo({}).then(res=>{
          if(res.code == 200){
            this.$store.commit('SET_ENCRYPTOPEN', res.data.isGlobalEncrypt);
            this.$store.commit('SET_NOTENCURLS', res.data.notEncryptUrls);

            if(res.data.isGlobalEncrypt == true){
              this.getRasKeyData();
            }
          }
        })
      },

      // 获取秘钥
      getRasKeyData() {
        getRsaPKey({}).then(res => {
          if (res.code == 200) {
            // let aaa = Base64.btoa(res.data.p) // 编码
            // console.log('aaa', res.data.p)
            // let bbb = Base64.atob(res.data.p) // 解码
            // console.log('bbb', bbb)
            this.createKey()
            let encKey = this.getRsaEncryption(this.$store.getters.publicDer,res.data.p)

            saveClientPKey({pkey: encKey}).then(response=>{
              if(response.code == 200){
                if(response.data.saveFinished){
                  getSecretKey({}).then(data => {
                    if (data.code == 200) {
                      let secretKey = this.getRsaDecrypt(data.data.secretKey, this.$store.getters.privateDer)
                      let vi = this.getRsaDecrypt(data.data.vi, this.$store.getters.privateDer)

                      this.$store.commit('SET_SECRETKEY', secretKey)
                      this.$store.commit('SET_IV', vi)
                      // sessionStorage.setItem('secretKey', secretKey)
                      // sessionStorage.setItem('iv', vi)
                    } else {
                      this.$message({type: 'error', message: data.message})
                    }
                  })
                }
              }
            })
          }
        })
      },

      // 获取上传文件限制大小
      getUploadFileCapacity(companyId){
        queryCompanyOssRemainingCapacity({companyId: companyId}).then(res=>{
          if(res.code == 200){
            this.$store.commit('SET_SINGLECAPACITY', res.data.singleCapacity);
            this.$store.commit('SET_TOTALCAPACITY', res.data.totalCapacity);
          }
        })
      },

      //当前时间
      currentTime() {
        setInterval(this.formatDate, 500);
      },
      //格式化时间
      formatDate() {
        let date = new Date();
        let year = date.getFullYear(); // 年
        let month = date.getMonth() + 1; // 月
        let day = date.getDate(); // 日
        let week = date.getDay(); // 星期
        let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
        let hour = date.getHours(); // 时
        hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
        let minute = date.getMinutes(); // 分
        minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
        let second = date.getSeconds(); // 秒
        second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
        this.nowDate = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`;
      },
      //计算当前显示的激励小提示
      show_tips(){
        /*let date = new Date();
        let week = date.getDay(); // 星期
        if(week==1){this.todayTips="*有志者事竟成,破釜沉舟,百二秦关终属楚; 苦心人天不负,卧薪尝胆,三千越甲可吞吴。";}
        else if(week==2){this.todayTips="*我向自己保证，今天必须完成任务！";}
        else if(week==3){this.todayTips="*老师说过：今天的付出，决定明天的收入。那你准备付出多少？";}
        else if(week==4){this.todayTips="*有志者自有千计万计，无志者只感千难万难。";}
        else if(week==5){this.todayTips="*滴水穿石,不是力量大,而是功夫深。";}
        else if(week==6){this.todayTips="*人生就是一场体育比赛，今天不努力，明天就要出局！";}
        else{this.todayTips="*王总问：你今天的小目标是什么？";}*/

        let tips=[];
        tips.push("有志者事竟成,破釜沉舟,百二秦关终属楚; 苦心人天不负,卧薪尝胆,三千越甲可吞吴。——蒲松龄");
        tips.push("三军可夺帅也，匹夫不可夺志也。 —— 孔丘");
        tips.push("老师说过：今天的付出，决定明天的收入。那么你准备付出多少？");
        tips.push("有志者自有千计万计，无志者只感千难万难。");
        tips.push("滴水穿石,不是力量大,而是功夫深。");
        tips.push("人生就是一场体育比赛，今天不努力，明天就要出局！");
        tips.push("王总问：你今天的小目标是什么？");
        tips.push("谁若游戏人生，他就一事无成；谁不能主宰自己，便永远是一个奴隶。——歌德");
        tips.push("不要去听别人的忽悠，你人生的每一步都必须靠自己去实现。");
        tips.push("再长的路，一步步也能走完，再短的路，不迈开双脚也无法到达。");
        tips.push("不是每一次努力都有收获，但是，每一次收获都必须先努力。");
        tips.push("世上没有绝望的处境，只有对处境绝望的人。");
        tips.push("人在旅途，难免会遇到荆棘和坎坷，但风雨过后，一定会有美丽的彩虹。");
        tips.push("要想改变命运，首先改变自己。");
        tips.push("思路决定出路，气度决定高度，细节决定成败，性格决定命运。");
        tips.push("智者创造机会，强者把握机会，弱者坐等机会。");
        tips.push("遇到困难时不要抱怨，既然改变不了过去，那么就努力改变未来。");
        tips.push("人生的道路不会一帆风顺，事业的征途也充满崎岖艰险，只有奋斗，只有拼搏，才会到达成功的彼岸。");
        tips.push("除了自己，任何人都无法给你力量。没有口水与汗水，就没有成功的薪水。");
        tips.push("一个人，要是不逼自己一把，根本不知道自己有多优秀。");
        tips.push("宝剑锋从磨砺出，梅花香自苦寒来。");
        tips.push("如果你坚信石头会开花，那么开花的不仅仅是石头。");
        tips.push("天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤。");
        tips.push("伟大的人物都是先走过了荒沙大漠，才能登上光荣的高峰。——巴尔扎克");
        tips.push("雄心壮志是茫茫黑夜中的北斗星。——勃朗宁");
        tips.push("如果一个想法在一开始不是荒谬的，那它就是没有希望的。—爱因斯坦");
        tips.push("读书使人充实，思考使人深邃，交谈使人清醒。 —富兰克林");
        tips.push("活着就是为了改变世界，难道还有其他原因吗？ —乔布斯");
        tips.push("老骥伏枥，志在千里；烈士暮年，壮心不已。 —— 曹操");
        tips.push("路是脚踏出来的，历史是人写出来的，人的每一步行动都在书写自己的历史。 —— 吉鸿昌");
        let index=Math.round(Math.random()*(tips.length-1));
        this.todayTips="* "+tips[index];
      }
    },

    mounted() {
      this.show_tips();
    },

    // 销毁定时器
    beforeDestroy() {
      if (this.formatDate) {
        clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
      }
    }
  }
</script>

<style lang="less" scoped>
  @hoverColor: #00A8FF; // 定义一个全局鼠标移入颜色
  .login {
    width: 100vw;
    height: 100vh;
    position: relative;

    background: url("../../../static/loginBg.png") no-repeat;
    background-position: center;
    background-size: cover;

    .title {
      position: absolute;
      top: 20px;
      left: 120px;
      width: 400px;
    }

    .login_tips {
      position: absolute;
      bottom: 50px;
      left: 100px;
      width: 90%;
      font-size: 26px;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      opacity: 1;
      display: flex;
    }

    .el-card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1030px;
      height: 610px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 18px rgba(68, 68, 68, 0.2);
      opacity: 1;

      /deep/ .el-card__body {
        display: flex;
        padding: 0;
        height: 100%;
      }

      .login_left {
        position: relative;
        flex: 1;
        .el-image{
          height: 100%;
        }
      }

      .login_right {
        flex: 2;
        text-align: center;

        .getCode {
          margin-left: 10px;
          width: 112px;
        }

        .loginStyle {
          display: flex;
          justify-content: center;
          align-items: center;
          /*padding-top: 80px;*/

          span {
            margin: 0 10px;
            font-size: 14px;
            padding-bottom: 10px;
            cursor: pointer;
          }

          .active {
            border-bottom: 2px solid #05aaff;
          }
        }

        .login_title {
          margin-top:35px;
          margin-bottom:30px;
          font-size: 32px;
          justify-content: center;
          align-items: center;
          color: #05AAFF;
          opacity: 1;
          display: flex;
          span:before{
            content: "";
            width: 5px;
            height: 5px;
            border-radius:100%;
            background: #05AAFF;
            display: inline-block;
            margin: 0 10px;
            margin-bottom: 4px;
          }
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
            left: 23%;
          }

          .capt_style {
            width: 200px;
            margin-left: -70px;
          }

          .capt_style2 {
            margin-left: -82px;
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

        .goRegister {
          display: flex;
          justify-content: space-between;
          width: 400px;
          margin: 20px auto 0;
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
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
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

    &:hover, &:disabled {
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

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  .explain {
    margin-top: 20px;
    display: flex;
    padding: 0 50px;

    ul, li {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    li {
      display: flex;
      margin-bottom: 10px;
      text-align: left;
      justify-content: flex-start;
      font-size: 12px;
      align-items: center;

      .num-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 1px;
        width: 20px;
        min-width: 20px;
        height: 20px;
        border-radius: 50%;
        background: red;
        color: #fff;
        margin-right: 6px;
      }
    }

  }


  .pwd-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-top: 8px;
  }

  .pwd_show {
    color: rgba(5, 170, 255, 0.7);
    background: url("../../../static/pwd_show.png");
  }

  .pwd_hide {
    background: url("../../../static/pwd_hide.png");
  }

  .goReg{
    font-size:14px;
    margin-top:20px;
    color:#BDBDBD;
  }

  .chengguoTis{
    font-size:12px;
    font-weight:400;
    line-height:16px;
    color:rgba(5,170,255,1);
    padding-top: 50px;
  }
</style>
