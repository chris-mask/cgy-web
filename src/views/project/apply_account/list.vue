<template>
  <div class="sales-plan-box">
    <!--列表-->
    <div class="list">
      <div class="list-title">
        <div class="left">
          <div class="title-text">
            <span class="line"></span>
            <div class="search-total-num">搜索到 <span class="num">{{listData.length}}</span> 条记录</div>
          </div>
          <div class="title-btn-group">
            <div class="btn" @click="checkAllOrNo"> {{isCheckAll?'取消全选':'全选'}}</div>
            <div class="btn" @click="btnHandle(true)">新增</div>
            <div class="btn del" @click="delAccountHandle">删除</div>
          </div>
        </div>
      </div>

      <div class="list-detail bg-list">
        <div v-if="listData.length === 0" class="no-data">暂无数据</div>
        <div v-else class="item bg-list" v-for="(item,index) in listData">
          <div class="check-num">
            <input class="check-box" type="checkbox" :value="item.accountId" v-model="check_biz_ids"
                   @change="checkOneOrNo">
            <span class="item-num">{{index+1}}</span>
          </div>
          <div class="item-body">
            <div class="cate" :title="item.websiteName">官方平台名称：<span>{{item.websiteName}}</span></div>
            <div class="cate" :title="item.websiteUrl">官方平台网址：<span>{{item.websiteUrl}}</span></div>
            <div class="cate">账号：<span>{{item.accountLoginname}}</span></div>
            <div class="cate">密码：<span>{{item.accountPassword}}</span></div>
            <!--            <div class="cate">账号角色：<span>121231233</span></div>-->
            <div class="cate">其他(备注)：<span>{{item.accountDesc}}</span></div>
          </div>
          <div class="handle-btn-group">
            <!--编辑-->
            <div class="btn-img edit-img" style="background-size: contain;" @click="btnHandle(false,item)"></div>
          </div>
        </div>
      </div>
    </div>

    <!--弹窗-->
    <!-- 新增/编辑 -->
    <el-dialog :title="updatetitleName?'申报账号-新增':'申报账号-编辑'" :visible.sync="dialogVisible" class="editorUserModal"
               width="600px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" @submit.native.prevent>
        <el-form-item label="官方平台名称：" prop="websiteName">

          <!--          <el-input class="user-input" v-model="ruleForm.websiteName"  maxlength="50" />-->
          <el-select filterable style="width: 100%;" class="user-input" v-model.native="ruleForm.websiteName" placeholder="请选择官方平台名称"
                     @change="websiteHandle">
            <el-option v-for="item in websiteList" :value="item.dictName" :label="item.dictName" :key="item.dictId"/>
          </el-select>

        </el-form-item>
        <el-form-item label="官方平台网址：" prop="websiteUrl">
          <el-input class="user-input" v-model="ruleForm.websiteUrl" readonly placeholder="请输入官方平台网址"
                    maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input class="user-input" v-model="ruleForm.accountLoginname" placeholder="请输入账号"
                    maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input class="user-input" v-model="ruleForm.accountPassword" placeholder="请输入密码" maxlength="50"></el-input>
        </el-form-item>
        <!--        <el-form-item label="账号角色：">-->
        <!--          <el-input class="user-input" v-model="ruleForm.user" placeholder="请输入账号角色"></el-input>-->
        <!--        </el-form-item>-->

        <el-form-item label="其它(备注)：">
          <el-input type="textarea" v-model="ruleForm.accountDesc" resize="none" :rows="5" maxlength="100"
                    placeholder="请输入其它(备注)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button class="cananl" @click="dialogVisible = false">取 消</el-button>
            <el-button class="setBtn" @click="setBtnHandle('ruleForm')">保 存</el-button>
          </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    queryWebsiteAccountList,
    saveWebsiteAccount,
    updateWebsiteAccount,
    deleteWebsiteAccountByIds,
    queryWebsiteAccountInfoById
  } from '@/api/applyAccount'
  import {commonDict} from '@/api/utils'

  export default {
    data() {
      return {
        listData: [],
        dialogVisible: false,
        ruleForm: {},
        rules: {
          websiteName: [
            {required: true, message: '请输入官方平台名称', trigger: 'blur'}
          ],
          websiteUrl: [
            {required: true, message: '请输入官方平台网址', trigger: 'blur'}
          ]
        },
        updatetitleName: null,

        websiteList: [],
        check_biz_ids: [],
        isCheckAll: false, // 是否已经全选
      }
    },
    props: ['id'],

    mounted() {
      this.getListData();
    },

    methods: {
      // 获取列表
      getListData() {
        queryWebsiteAccountList({companyId: this.id}).then(res => {
          if (res.code === 200) {
            this.listData = res.data;
            this.$emit('accountTotal', this.listData.length);
          }
        })
      },

      //字典--获取官方平台名称
      getSteamList() {
        let params = {
          keyList: 'DICT:WEBSITEACCOUNT',
          companyId:this.$store.getters.companyId
        };
        commonDict(params).then(res => {
          if (res.code === 200) {
            this.websiteList = res.data['DICT:WEBSITEACCOUNT'];
          }
        })
      },

      //选中官方平台名称联动平台网址
      websiteHandle(data) {
        this.websiteList.forEach(item => {
          if (data === item.dictName) {
            this.ruleForm.websiteUrl = item.dictValue;
          }
        })
      },

      //点击新增/编辑
      btnHandle(val, data) {
        this.ruleForm = {}
        this.dialogVisible = true;
        this.updatetitleName = val;
        this.getSteamList();

        if (val === false) {
          queryWebsiteAccountInfoById({accountId: data.accountId}).then(res => {
            if (res.code === 200) {
              this.ruleForm = res.data;
            }
          })
        }
      },


      //新增
      setBtnHandle(formName) {
        this.ruleForm.companyId = this.id;
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            if (this.updatetitleName) {
              saveWebsiteAccount(this.ruleForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: res.message
                  })
                  this.dialogVisible = false;
                  this.getListData()
                }
              })
            } else {
              updateWebsiteAccount(this.ruleForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: res.message
                  })
                  this.dialogVisible = false;
                  this.getListData()
                }
              })
            }
          }
        })
      },


      // 全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          var _this = this;
          this.listData.forEach(function (item, index) {
            if (_this.check_biz_ids.indexOf(item.accountId) === -1) {
              _this.check_biz_ids.push(item.accountId)
            }
            _this.isCheckAll = true
          })
        }
      },

      //列表---单选一个
      checkOneOrNo() {
        if (this.check_biz_ids.length === this.listData.length) {
          this.isCheckAll = true
        } else {
          this.isCheckAll = false
        }
      },

      //删除
      delAccountHandle() {
        if (this.check_biz_ids.length === 0) {
          this.$message({
            message: '请勾选要删除的行！',
            type: 'warning'
          });
        } else {
          deleteWebsiteAccountByIds(this.check_biz_ids).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: res.message
              });
              this.isCheckAll = false;
              this.getListData();
            }
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .sales-plan-box {
    margin: auto 5%;

    .list {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);
      margin-top: 16px;

      .list-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 16px;
        box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);

        .left {
          display: flex;
          align-items: center;

          .title-text {
            display: flex;
            align-items: center;
            margin-right: 38px;

            .line {
              margin-right: 8px;
              display: inline-block;
              width: 3px;
              height: 14px;
              background: rgba(255, 169, 106, 1);
            }

            .search-total-num {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(68, 68, 68, 0.75);

              .num {
                color: #FF6C6C;
              }
            }
          }

          .title-btn-group {
            display: flex;
            align-items: center;
            height: 50px;

            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 20px;
              padding: 4px 9px;
              font-size: 16px;
              color: rgba(5, 170, 255, 1);
              border: 1px solid rgba(5, 170, 255, 1);
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                color: #fff;
                background: rgba(5, 170, 255, 1);
              }

              &.del {
                border: 1px solid rgba(245, 108, 108, 1);
                color: rgba(245, 108, 108, 1);

                &:hover {
                  color: #fff;
                  background: rgba(245, 108, 108, 1);
                }
              }

              &:active {
                opacity: .5;
              }
            }
          }
        }

      }

      .list-detail {
        .item {
          display: flex;
          padding: 10px 20px;
          padding-bottom: 2px;
          padding-right: 4px;
          position: relative;

          .check-num {
            display: flex;
            margin-right: 10px;

            .check-box {
              width: 16px;
              height: 16px;
              cursor: pointer;
              margin-right: 10px;
              margin-top: 1px;
            }

            .item-num {
              width: 18px;
              height: 18px;
              background: #91e5a1;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              border-radius: 50%;
            }
          }

          .item-body {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            font-size: 14px;
            width: 90%;

            .cate {
              min-width: 20%;
              padding-right: 10px;
              white-space: nowrap;
              margin-bottom: 10px;
              color: rgba(68, 68, 68, 0.75);

              span {
                color: #444;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 90%;
                display: inline-block;
              }
            }
          }

          .handle-btn-group {
            width: 70px;
            min-width: 70px;
            margin-top: -5px;

            .btn-img {
              cursor: pointer;
              width: 66px;
              height: 26px;

              &.edit-img {
                background-size: contain;
                background: url("../../icons/enterprise/edit_icon.png") no-repeat;

                &:hover {
                  background-size: contain;
                  background: url("../../icons/enterprise/_edit_icon.png") no-repeat;
                }
              }
            }
          }
        }

        .bg-list:nth-child(even) {
          background: #dee6ff;

          &:hover {
            background: #C5D4FF;
          }
        }

        .bg-list:nth-child(odd) {
          background: #effaff;

          &:hover {
            background: #CDEEFF;
          }
        }

        .no-data {
          padding: 10px;
          text-align: center;
        }
      }
    }

    .editorUserModal {
      /deep/ .el-dialog__header {
        border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        padding: 20px 20px 16px;
      }

      /deep/ .el-dialog__title {
        line-height: 0;
      }

      /deep/ .el-dialog__headerbtn {
        top: 19px;
      }

      /deep/ .el-dialog__body {
        padding: 14px;
      }

      /deep/ .el-form-item__label {
        font-weight: normal;
        color: rgba(68, 68, 68, 0.75);
      }

      /deep/ .el-form-item__content {
        width: 73%;
        display: flex;
      }

      .user-input {
        /deep/ .el-input__inner {
          border: 0;
          border-radius: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        }

        &.input {
          width: 100%;
          border-radius: 0;
          border: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.3);

          &:focus {
            border: 0;
            border-bottom: 1px solid rgba(68, 68, 68, 0.3);
          }
        }
      }

      .user-select {
        width: 100%;
      }

      .switch-btn {
        font-size: 14px;
        color: #fff;
        background: rgba(5, 170, 255, 1);
        margin-left: 10px;

        &:active {
          opacity: .5;
        }
      }

      .modal-radio {
        display: flex;
        align-items: center;

        /deep/ .el-form-item__content {
          margin-left: 0 !important;
        }
      }

      .dialog-footer {
        .setBtn {
          color: #fff;
          background: rgba(5, 170, 255, 1);
        }

        .cananl {
          background: #fff;
          color: rgba(68, 68, 68, 1);
        }
      }
    }

  }

</style>
