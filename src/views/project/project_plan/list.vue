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
            <div class="btn" @click="btnHandle(true)" v-if="allowAdd.twoAllow">新增</div>
            <div class="btn del" @click="delAccountHandle" v-if="allowDelete.twoAllow">删除</div>
          </div>
        </div>
      </div>

      <div class="list-detail bg-list">
        <div class="item bg-list" v-for="(item,index) in listData">
          <div class="check-num">
            <input class="check-box" type="checkbox" :value="item.planId" v-model="check_biz_ids"
                   @change="checkOneOrNo">
            <span class="item-num">{{index+1}}</span>
          </div>
          <div class="item-body">
            <div class="cate" :title="item.projectName">项目名称：<span>{{item.projectName}}</span></div>
            <div class="cate" :title="item.policyInfo">政策信息：<span>{{item.policyInfo}}</span></div>
            <div class="cate" :title="item.planRemark">备注：<span>{{item.planRemark}}</span></div>
          </div>
          <div class="handle-btn-group">
            <!--编辑-->
            <div class="btn-img edit-img"
                 @click="btnHandle(false,item)"
                 v-if="allowUpdate.twoAllow">
            </div>
          </div>
        </div>
        <!--加载更多-->
        <div class="get-more" v-if="listData.length >= listTotal">
          没有更多
        </div>
        <div class="get-more" @click="getMore" v-else>
          加载更多
        </div>
      </div>
    </div>

    <!--弹窗-->
    <!-- 新增/编辑 -->
    <el-dialog :title="updatetitleName?'项目规划-新增':'项目规划-编辑'" :visible.sync="dialogVisible" class="editorUserModal"
               width="600px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" @submit.native.prevent>
        <el-form-item label="项目名称：" prop="projectId">
          <el-select
            @focus="getFocusProject"
            @blur="removeProjectList"
            remote
            :remote-method="projectListMethod"
            filterable
            v-loadMore="loadMore" :loading="loading"
            class="inline-block float-left"
            placeholder="项目名称"
            v-model="ruleForm.projectId"
          >
            <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName"
                       :value="item.projectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="政策信息：" prop="policyInfo">
          <el-input type="textarea" v-model="ruleForm.policyInfo" resize="none" :rows="5" maxlength="100"
                    placeholder="请输入政策信息"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="ruleForm.planRemark" resize="none" :rows="5" maxlength="100"
                    placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button class="cananl" @click="cananlHandle">取 消</el-button>
            <el-button class="setBtn" @click="setBtnHandle('ruleForm')">保 存</el-button>
          </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    saveProjectPlan,
    updateProjectPlan,
    queryProjectPlanList,
    deleteProjectPlanByIds
  } from '@/api/projectPlan'

  import {queryAll} from '@/api/projectManage'

  export default {
    data() {
      return {
        //项目列表
        projectList: [],
        //获取项目列表参数
        projectForm: {
          page: 0,
          pageSize: 20
        },

        //获取项目规划列表参数
        projectPlanParams: {
          page: 0,
          pageSize: 20,
        },

        listData: [],
        listTotal: "",
        dialogVisible: false,
        ruleForm: {},
        rules: {
          projectId: [
            {required: true, message: '请选择项目名称', trigger: 'blur'}
          ],
          policyInfo: [
            {required: true, message: '请输入政策信息', trigger: 'blur'}
          ]
        },
        updatetitleName: null,

        check_biz_ids: [],
        isCheckAll: false, // 是否已经全选

        allowGetProjectplanList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CRM:PROJECTPLAN:LIST'),//项目规划列表
        allowAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CRM:PROJECTPLAN:INSERT'),//新增项目规划
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CRM:PROJECTPLAN:UPDATE'),//修改项目规划
        allowDelete: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CRM:PROJECTPLAN:DELETED'),//删除项目规划
      }
    },
    props: ['id'],

    mounted() {
      if (this.allowGetProjectplanList.twoAllow) {
        this.getListData();
      }
    },

    directives: {
      loadMore: {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
          SELECTWRAP_DOM.addEventListener('scroll', function () {

            const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
            if (CONDITION) {
              binding.value()
            }
          })
        }
      }
    },

    methods: {
      //获取项目列表
      getProjectList() {
        queryAll(this.projectForm).then(response => {
          if (response.code == 200) {
            if (this.projectForm.page > 0) {
              this.projectList = this.projectList.concat(response.data.data)
            } else {
              this.projectList = response.data.data
            }
          } else {
            this.$message.warning(response.message)
          }
        })
      },
      //项目列表--远程搜索
      projectListMethod(query) {
        this.projectForm.page = 0
        this.projectForm.projectName = query
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.getProjectList(query)
        }, 200)
      },
      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      //项目列表--失去焦点
      removeProjectList() {
        this.projectForm.page = 0;
        this.projectForm.projectName = "";
      },

      // 获取列表
      getListData() {
        this.projectPlanParams.companyId = this.id
        queryProjectPlanList(this.projectPlanParams).then(res => {
          if (res.code === 200) {
            this.$emit('projectPlanTotal', res.data.total);
            if (this.projectPlanParams.page > 0) {
              this.listData = this.listData.concat(res.data.data);
              this.listTotal = res.data.total;
            } else {
              this.listData = res.data.data;
              this.listTotal = res.data.total;
            }
          }
        })
      },

      //点击新增/编辑
      btnHandle(val, data) {
        this.ruleForm = {}
        this.dialogVisible = true;
        this.updatetitleName = val;

        if (val === false) {
          this.ruleForm = JSON.parse(JSON.stringify(data));
          this.projectListMethod(this.ruleForm.projectName);
          this.getProjectList();
        }
      },

      //点击获取
      getFocusProject() {
        if (this.ruleForm.planId) {
          this.projectForm.projectName = "";
        }
        this.getProjectList();
      },

      //取消
      cananlHandle() {
        this.ruleForm = {};
        this.dialogVisible = false
      },

      //新增
      setBtnHandle(formName) {
        this.ruleForm.companyId = this.id;
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            if (this.updatetitleName) {
              saveProjectPlan(this.ruleForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: res.message
                  })
                  this.dialogVisible = false;
                  this.ruleForm = {};
                  this.getListData()
                }
              })
            } else {
              updateProjectPlan(this.ruleForm).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: res.message
                  })
                  this.ruleForm = {};
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
            if (_this.check_biz_ids.indexOf(item.planId) === -1) {
              _this.check_biz_ids.push(item.planId)
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
          deleteProjectPlanByIds(this.check_biz_ids).then(res => {
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
      },
      //加载更多
      getMore() {
        this.projectPlanParams.page += 20;
        if (this.listData.length < this.listTotal) {
          this.getListData();
        }
      },
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
              width: 33%;
              padding-right: 10px;
              white-space: nowrap;
              margin-bottom: 10px;
              color: rgba(68, 68, 68, 0.75);
              display: flex;

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
              width: 70px;
              height: 30px;

              &.edit-img {
                background-size: cover;
                background: url("../../icons/enterprise/edit_icon.png") no-repeat;

                &:hover {
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

        .get-more {
          padding: 30px 0;
          text-align: center;
          cursor: pointer;
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
