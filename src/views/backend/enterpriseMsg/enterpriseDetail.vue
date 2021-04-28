<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>企业信息</span>
      </div>
      <div class="addUserContent">
        <el-form ref="enterpriseForm" :model="enterpriseForm" :rules="rules" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称:" prop="companyName">
                <el-input size='small' v-model="enterpriseForm.companyName" placeholder="请输入企业名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="15" class="text-right">
              <el-button type="primary" size="small" style="margin-left:10px;padding: 12px 10px;" @click="goChangeWar"
                         v-if="allowChangeMange.twoAllow">更换管理员
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="法定代表人:" prop="companyLeader">
                <el-input size='small' v-model="enterpriseForm.companyLeader" placeholder="请输入法定代表人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="注册资本:" prop="registerMoney">
                <el-input size='small' v-model="enterpriseForm.registerMoney" placeholder="请输入注册资本">
                  <template slot="append">元</template>
                  -->
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" prop="companyCode">
                <!--                <el-input size='small' v-model="enterpriseForm.companyCode" placeholder="请输入统一社会信用代码"></el-input>-->
                <span>{{enterpriseForm.companyCode}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系人:" prop="companyContacts">
                <el-input size='small' v-model="enterpriseForm.companyContacts" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话:" prop="companyPhone">
                <el-input size='small' v-model="enterpriseForm.companyPhone" placeholder="请输入联系电话" type='phone'
                          maxLength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系地址:" prop="companyAddress">
                <el-input size='small' v-model="enterpriseForm.companyAddress" placeholder="请输入联系地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系邮箱:" prop="companyEmail">
                <el-input size='small' v-model="enterpriseForm.companyEmail" placeholder="请输入联系邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="排序:" prop="sortNum">
                <el-input size='small' type="number" v-model="enterpriseForm.sortNum" placeholder="请输入排序"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业类型:" prop="companyType">
                <el-select v-model="enterpriseForm.companyType" size="small" placeholder="请选择" style="margin-bottom:10px;width: 100%">
                  <el-option
                    v-for="item in companyTypeList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--            <el-col:span="8">-->
            <!--              <el-form-item label="所属行业" prop="permissionName">-->
            <!--                <el-input size='small' v-model="enterpriseForm.permissionName" placeholder="请输入所属行业"></el-input>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--          </el-row>-->
            <!--          <el-row>-->
            <!--            <el-col:span="8">-->
            <!--              <el-form-item label="主营业务" prop="permissionName">-->
            <!--                <el-input size='small' type="textarea" v-model="enterpriseForm.permissionName" placeholder="请输入主营业务"></el-input>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--          </el-row>-->
            <!--          <el-row>-->
            <el-col :span="8">
              <el-form-item label="备注:" prop="companyDesc">
<!--                <el-input size='small' type="textarea" :rows="4" v-model="enterpriseForm.companyDesc" placeholder="请输入备注"></el-input>-->
                <EditorText :id="editor1" :value="enterpriseForm.companyDesc" ref="editor" @changeValue="changeValue($event)"></EditorText>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <el-button type="primary" size="small" @click="editCompanyDetail('enterpriseForm')">确定</el-button>
      <el-button size="small" @click="cancelSub">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {queryCompanyDetails, queryCurrentCompanyDetails, editCompanyInfo} from '@/api/enterpriseMsg'
  import EditorText from '@/components/EditorText/index'

  export default {
    components: {
      EditorText,
    },
    data() {
      return {
        enterpriseForm: {
          companyId: '',
          companyAddress: "",
          companyCode: "",
          companyContacts: "",
          companyDesc: "",
          companyLeader: "",
          companyName: "",
          companyPhone: "",
          registerMoney: 0,
          companyEmail: '',
        },
        rules: {
          companyName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'}
          ],
          companyLeader: [
            {required: true, message: '请输入法定代表人', trigger: 'blur'}
          ],
          registerMoney: [
            {required: true, message: '请输入注册资本', trigger: 'blur'}
          ],
          companyCode: [
            {required: true, message: '请输入统一社会信用代码', trigger: 'blur'}
          ],
          companyContacts: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          companyPhone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            {min: 11, message: '联系电话不能小于11位', trigger: 'blur'}
          ],
          companyAddress: [
            {required: true, message: '请输入联系地址', trigger: 'blur'}
          ],
          // companyEmail: [
          //   {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          //   {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          // ]
        },
        companyTypeList:[
          {"dictId": 1, "dictName": "内部企业"},
          {"dictId": 2, "dictName": "外部企业"},
        ],
        editor1:'editor1',
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:COMPANY:MANAGE', 'SYSTEM:COMPANY:DETAILS'),
        allowChangeMange: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:COMPANY:MANAGE', 'SYSTEM:BACKGROU:CHANGE'),
      }
    },
    activated() {
      if (this.allowDetail.twoAllow) {
        if (this.$route.query.companyId == undefined) {
          this.enterpriseForm.companyId = this.$store.getters.companyId
        } else {
          this.enterpriseForm.companyId = this.$route.query.companyId;
        }

        if (this.$store.getters.username == '超级管理员') {
          this.getCompanyDetail()
        } else {
          this.getCompanyInfo();
        }
      }
    },
    methods: {
      //接收和更新富文本值
      changeValue($event) {
        this.enterpriseForm.companyDesc = $event
      },
      //获取公司详情信息 --企业管理员
      getCompanyInfo() {
        queryCurrentCompanyDetails({}).then(res => {
          if (res.code == 200) {
            this.enterpriseForm = res.data
            this.$refs.editor.initCKEditor()
          } else {
            this.$message({type: 'warning', message: res.message})
          }
        })
      },

      editCompanyDetail(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (this.enterpriseForm.companyEmail != '' && this.enterpriseForm.companyEmail != undefined) {
              if(!regEmail.test(this.enterpriseForm.companyEmail)){
                this.$message({
                  message: '邮箱格式不正确',
                  type: 'warning'
                });
                // this.enterpriseForm.companyEmail = '';
                return;
              }
            }

            editCompanyInfo(this.enterpriseForm).then(res => {
              if (res.code == 200) {
                this.$message({type: 'success', message: '修改成功'});
                this.$refs.editor.destroyEditor();
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route);
              } else {
                this.$message({type: 'warning', message: res.message})
              }
            })
          }
        })
      },

      //获取公司详情 -- 超级管理员
      getCompanyDetail() {
        var params = {
          companyId: this.enterpriseForm.companyId,
        }
        queryCompanyDetails(params).then(res => {
          if (res.code == 200) {
            this.enterpriseForm = res.data;
            this.$refs.editor.initCKEditor()
          } else {
            this.$message({type: 'warning', message: res.message})
          }
        })
      },

      //跳转到更换管理员页面
      goChangeWar() {
        this.$router.push({
          path: '/backend/changeWarden'
        })
      },
      // 返回
      cancelSub() {
        this.$refs.editor.destroyEditor();
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route);
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
    display: flex;
  }

  /deep/ .el-form-item__label {
    min-width: 127px;
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

  .text-right {
    text-align: right;
  }
</style>
