<template>
  <div class="patent-form">

    <!--    内容-->
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="auto" class="form-box">

      <!--      上面的form-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="line"></div>
          <div class="title-name">常见问题列表 - {{titleName}}</div>
        </div>
        <div class="cart-body">

          <el-form-item class="form-input" label="问题分类：" prop="questionType">
            <el-cascader v-if="pageType !=='read'" v-model="form.questionType" @change="handleCascaderChange" placeholder="请选择问题分类"
                         :options="workType" :props="{ checkStrictly: true,value: 'dictId', label: 'dictName', children: 'child' }"
                         clearable class="user-name-item"></el-cascader>
            <el-input v-else v-model="form.questionTypeName" class="patent-name-item" disabled></el-input>
          </el-form-item>

          <el-form-item class="form-input" label="问题内容：" prop="questionContent">
            <el-input v-if="pageType !=='read'" v-model.trim="form.questionContent" class="patent-name-item" maxlength="100" clearable
                      placeholder="请输入问题内容"></el-input>
            <el-input v-else disabled v-model="form.questionContent" class="patent-name-item"></el-input>
          </el-form-item>

          <el-form-item class="form-input" label="问题解答：" prop="questionAnswer">
            <el-col :span="12">
              <el-tooltip class="item" effect="light" :content="'字符长度'+form.questionAnswer.length" placement="bottom-end">
                <el-input v-if="pageType !=='read'" v-model.trim="form.questionAnswer" class="patent-name-item" maxlength="2000" clearable
                          placeholder="请输入问题解答,不超过2000字符" type="textarea" :rows="12"></el-input>
                <el-input v-else disabled v-model="form.questionAnswer" class="patent-name-item" type="textarea" :rows="12"></el-input>
              </el-tooltip>
            </el-col>

          </el-form-item>

        </div>
      </div>
    </el-form>


    <!-- 操作按钮-->
    <div class="btn-group-handle">
      <el-button class="btn blue" v-if="pageType == 'add' && allowAdd.twoAllow" v-preventReClick @click="handSubmit('ruleForm')">确定</el-button>
      <el-button class="btn blue" v-if="pageType == 'edit' && allowUpdate.twoAllow" v-preventReClick @click="handSubmitEdit('ruleForm')">确定
      </el-button>
      <el-button class="btn cananl" @click="cananlHandle">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {commonDict} from '@/api/utils'
  import {queryCrmFaqList, saveCrmFaq, updateCrmFaqByIds} from '@/api/faq'

  export default {

    data() {
      return {
        //页面入来的时候的类型
        pageType: "",

        //标题名称
        titleName: "",

        //客户名称
        userNameList: [],
        //客户总数
        userNameTotal: null,
        //客户列表参数
        userParams: {
          page: 0,
          pageSize: 20,
        },
        //类型
        workType: [],
        //form值
        form: {
          questionType: null,
          questionAnswer: '',
        },
        //监听form
        rules: {
          questionType: [
            {required: true, message: '请选择问题分类', trigger: 'blur'}
          ],
          questionContent: [
            {required: true, message: '请输入问题内容', trigger: 'blur'}
          ],
          questionAnswer: [
            {required: true, message: '请输入问题解答', trigger: 'blur'}
          ]
        },

        loading: false,

        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:INSERT'),//新增常见问题
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:UPDATE'),//编辑常见问题
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:LIST'),//查询常见问题
      }
    },
    created() {
      this.pageType = this.$route.query.type;
    },
    mounted() {
      this.getCommonDict();
    },
    activated() {
      this.isHeaderName();
      this.form = {
        faqId: "",
        questionType: "",
        questionContent: "",
        questionAnswer: "",
      };

      if (this.$route.query.faqId) {
        this.form.faqId = this.$route.query.faqId;
      }

      if (this.pageType === "edit" || this.pageType === "read") {
        setTimeout(() => {
          this.getFormDetail()
        }, 500)
      }

    },
    directives: {},
    methods: {
      //点击取消
      cananlHandle() {
        this.$router.go(-1);
        this.form = {};
      },

      // 错误提示
      callbackError(error) {
        for (var key in error) {
          this.tempArr = error[key]
          break
        }
        this.$message({
          type: 'error',
          message: this.tempArr[0].message
        })
      },

      //获取字典类别
      getCommonDict() {
        let params = {
          keyList: 'DICT:QUESTION_TYPE',
          companyId :'697480101377343488'
        };
        commonDict(params).then(res => {
          if (res.code === 200) {
            this.workType = res.data['DICT:QUESTION_TYPE'];
          }
        })
      },

      //判断头部名称
      isHeaderName() {
        if (this.pageType === 'read') {
          this.titleName = '常见问题详情'
        } else if (this.pageType === 'add') {
          this.titleName = '新增常见问题'
        } else if (this.pageType === 'edit') {
          this.titleName = '编辑常见问题'
        }
      },

      // 确认提交---新增
      handSubmit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            if (this.form.questionContent.length > 100) {
              this.$message.warning('问题内容字符长度不能大于100')
              return
            }
            if (this.form.questionAnswer.length > 2000) {
              this.$message.warning('问题解答字符长度不能大于2000')
              return
            }
            Object.keys(this.form).forEach(item => {
              if (this.form[item] === null || this.form[item] === undefined) {
                this.form[item] = "";
              }
            });
            saveCrmFaq(this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.form = {};
                this.cananlHandle();
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },

      //编辑--获取详情
      getFormDetail() {
        if (this.allowDetail.twoAllow) {
          queryCrmFaqList({page:0,pageSize:20,faqId: this.$route.query.faqId}).then(res => {
            if (res.code === 200 && res.data.data.length > 0) {
              let form = JSON.parse(JSON.stringify(res.data.data[0]));
              Object.keys(this.form).forEach(item => {
                if (!form.hasOwnProperty(item)) {
                  form[item] = ""
                }
              });
              this.form = form;
              if (this.pageType === 'read') {
                this.workType.forEach(item => {
                  if (res.data.questionType === item.dictId) {
                    this.form.questionTypeName = item.dictName
                  }
                })
              }
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取此详情')
        }
      },

      // 确认提交---编辑
      handSubmitEdit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            if (this.form.questionContent.length > 100) {
              this.$message.warning('问题内容字符长度不能大于100')
              return
            }
            if (this.form.questionAnswer.length > 2000) {
              this.$message.warning('问题解答字符长度不能大于2000')
              return
            }
            Object.keys(this.form).forEach(item => {
              if (this.form[item] === null || this.form[item] === undefined) {
                this.form[item] = "";
              }
            });
            updateCrmFaqByIds(this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.form = {};
                this.cananlHandle();
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      // 级联选择器选择
      handleCascaderChange(chooseList){
        if (chooseList && chooseList.length > 0) {
          this.form.questionType = chooseList[chooseList.length - 1]
        }
      }

    }
  }
</script>

<style lang="less" scoped>
  .patent-form {
    margin: auto 5%;

    .title {
      margin-top: 20px;
      padding-left: 20px;
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);
    }

    .form-box {
      .cart-bar {
        background: #fff;
        margin-top: 20px;
        box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
        border-radius: 4px;

        .cart-title {
          padding: 16px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(219, 233, 255, 1);;

          .line {
            width: 3px;
            height: 14px;
            background: rgba(5, 170, 255, 1);
            margin-right: 10px;
          }

          .title-name {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(4, 43, 64, 1);
          }
        }

        .cart-body {
          padding: 20px 0 1px 12px;

          .form-input {
            /deep/ .el-form-item__label {
              font-weight: normal;
              font-size: 14px;
              color: rgba(68, 68, 68, 0.75);
              border-radius: 0;
              white-space: nowrap;
            }

            .user-name-item {
              width: 300px;

              /deep/ .el-input {
                width: 300px;
              }

              /deep/ .el-input__inner {
                width: 300px;
                background: none;
                border-radius: 0;
                border: 0;
                color: #444444;
                border-bottom: 1px solid rgba(68, 68, 68, .3);
              }
            }

            .patent-name-item {
              /deep/ .el-input__inner {
                width: 300px;
                background: none;
                border-radius: 0;
                border: 0;
                border-bottom: 1px solid rgba(68, 68, 68, .3);
              }
            }

            .select-date {
              width: 300px !important;

              /deep/ .el-input__inner, /deep/ .el-date-editor.el-input, /deep/ .el-date-editor.el-input__inner {
                width: 300px !important;
                border-radius: 0;
                border: 0;
                background: none;
                border-bottom: 1px solid rgba(68, 68, 68, .3);
              }
            }

            .patent-area {
              /deep/ .el-textarea__inner {
                width: 300px;
              }
            }

            /deep/ .el-input.is-disabled .el-input__inner {
              color: #444;
            }

          }
        }
      }
    }

    .upload-pic {
      /deep/ .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 110px;
      }

      /deep/ .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
      }
    }

    .pic-modal {
      .pic {
        display: flex;
        align-items: center;
        justify-content: center
      }
    }

    .btn-group-handle {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      .btn {
        padding: 0;
        width: 100px;
        height: 38px;
        font-size: 16px;

        &.blue {
          color: #fff;
          background: linear-gradient(180deg, rgba(155, 221, 255, 1) 0%, rgba(55, 187, 255, 1) 100%);
        }

        &.cananl {
          color: rgba(68, 68, 68, 1);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
        }
      }
    }
  }

</style>
