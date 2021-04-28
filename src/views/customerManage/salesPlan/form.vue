<template>
  <div class="sale-plan-detail">
    <!--标题-->
    <div class="title-bar">
      销售计划 - 详情
    </div>

    <!--公司名-框-->
    <div class="company-bar">
      <div class="pic-box">
        {{planData.companyShortName && planData.companyShortName !==''?planData.companyShortName:'企业简称'}}
      </div>
      <div class="detail">
        <div class="name" @click="goCompanyDatail">
          {{planData.companyName}}
        </div>
        <div class="user-type">
          <span class="user-title">客户类别：</span>
          {{planData.companyType !== "" ?companyTypeList[planData.companyType].value: '' }}
        </div>
      </div>
    </div>

    <!--基础信息-->
    <div class="cart-bar">
      <div class="cart-title">
        <div class="title-name">
          <span class="line orange"></span>
          <div class="text">基础信息</div>
        </div>
        <div class="item-btn edit" v-if="!planData.executeTime && allowUpdate.twoAllow"
             @click="editPlanFormHandle"></div>
      </div>
      <div class="cart-body">
        <el-row class="cart-item">
          <el-col :lg="8" :xl="8">
            <span class="name">业务员：</span>
            <span class="blue" v-for="item in planData.salemanUsers" :key="item.userId">{{item.userName}}</span>
          </el-col>
          <el-col :lg="16" :xl="16"><span class="name">登记日期：</span>{{planData.createTime}}</el-col>
        </el-row>
        <el-row class="cart-item">
          <el-col :lg="8" :xl="8" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"><span class="name" :title="planData.contactName">联系人：<span style="color:#000">{{planData.contactName}}</span></span></el-col>
          <el-col :lg="16" :xl="16" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"><span class="name" :title="planData.contactPhone">联系电话：<span style="color:#000">{{planData.contactPhone}}</span></span></el-col>
        </el-row>
        <el-row class="cart-item">
          <el-col :lg="8" :xl="8"><span class="name">推广项目：</span>{{planData.projectName}}</el-col>
          <el-col :lg="16" :xl="16" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            <span class="name" :title="planData.projectBasis">
              推广依据：
              <span style="color:#000">{{planData.projectBasis}}</span>
            </span>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--实施情况-->
    <div class="cart-bar">
      <div class="cart-title">
        <div class="title-name">
          <span class="line green"></span>
          <div class="text">实施情况</div>
        </div>
        <div class="item-btn implement" @click="implementHandle" v-if="allowExecute.twoAllow"></div>
      </div>
      <div class="cart-body">
        <el-row class="cart-item">
          <el-col :lg="8" :xl="8"><span class="name">计划实施日期：</span><span>{{planData.planDate}}</span></el-col>
          <el-col :lg="16" :xl="16"><span class="name">实际实施时间：</span>
            {{planData.executeTime}}
          </el-col>
        </el-row>
        <el-row class="cart-item">
          <el-col :lg="8" :xl="8" class="col-item">
            <span class="name">实施类别：</span>
            <div class="select-list-detail">
              <div class="cate">
                {{planData.executeType !== undefined && planData.executeType !=="" ?
                executeTypeDetail[planData.executeType].value : ''}}
              </div>
            </div>
          </el-col>
          <el-col :lg="16" :xl="16" class="col-item">
            <span class="name">实施效果：</span>
            <div class="select-list-detail">
              <div class="cate">
                {{planData.executeResult !== undefined && planData.executeResult !=="" ?
                executeResultArr : ''}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="cart-item">
          <el-col :lg="8" :xl="8"><span class="name">实施结果：</span>{{planData.executeContent}}</el-col>
          <el-col :lg="16" :xl="16"></el-col>
        </el-row>
      </div>
    </div>

    <!--评论-->
    <div class="cart-bar" v-if="planData.executeTime">
      <div class="cart-title" style="height: 47px">
        <div class="title-name">
          <span class="line red"></span>
          <div class="text">评论</div>
        </div>
        <div class="item-btn remark" v-if="planData.executeTime && allowAppraise.twoAllow"
             @click="commentRemarkHandle"></div>
      </div>
      <div class="cart-body">
        <el-row class="cart-item">
          <el-col :md="24"><span class="name">评论：</span>{{planData.commentRemark}}</el-col>
        </el-row>
      </div>
    </div>

    <!--返回-->
    <div class="goPlanList">
      <el-button class="btn" @click="goPlanListHandle">返回</el-button>
    </div>


    <!--弹窗-->
    <!-- 新增/变更 -->
    <el-dialog :title="updatetitleName?'新增':'变更'" :visible.sync="updateVisible" class="editorUserModal" width="600px">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="120px" @submit.native.prevent>
        <el-form-item label="目标客户：" prop="companyName">
          <el-input v-model="updateForm.companyName"
                    v-if="!isUserWriteChoose"
                    class="user-input"
                    placeholder="请输入目标客户"
          />
          <el-select v-else
                     v-model="updateForm.companyName"
                     class="user-select"
                     filterable
                     clearable
                     placeholder="选择目标客户"
                     @change="addSelectCompanyHandle"
                     v-loadMore="loadMore"
                     @focus="handleSelectData('user')"
                     remote
                     :remote-method="remoteMethod"
          >
            <el-option
              v-for="(item,index) in companyNameList"
              :key="index"
              :label="item.companyName"
              :value="item.crmCompanyId"
            />
          </el-select>
          <el-button class="switch-btn" @click="switchCompanyHandle">
            {{isUserWriteChoose?'切换为输入':'切换为选择'}}
          </el-button>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input maxlength="50" class="user-input" v-model="updateForm.contactName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input maxlength="50" class="user-input" v-model="updateForm.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="计划实施日期：" prop="planDate">
          <el-date-picker type="date" v-model="updateForm.planDate" placeholder="选择日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="推广项目：" prop="projectName">
          <el-select v-if="isProjectWriteChoose"
                     v-model="updateForm.projectName"
                     class="user-select" filterable
                     clearable
                     placeholder="选择推广项目"
                     @change="addSelectProjectHandle"
                     v-loadMore="loadMore"
                     @focus="handleSelectData('project')"
          >
            <el-option
              v-for="(item,index) in projectWriteList"
              :key="index"
              :label="item.projectName"
              :value="item.projectId"
            />
          </el-select>
          <el-input maxlength="50" v-else class="user-input" v-model="updateForm.projectName" placeholder="请输入推广项目"></el-input>
          <el-button class="switch-btn" @click="switchProjectHandle">
            {{isProjectWriteChoose?'切换为输入':'切换为选择'}}
          </el-button>
        </el-form-item>

        <el-form-item label="客户信息：" prop="projectBasis">
          <el-input maxlength="1000" type="textarea" v-model="updateForm.projectBasis" resize="none" :rows="5"
                    placeholder="客户的什么信息，让你去推广该项目，请提前做好准备"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">

            <el-button class="setBtn" @click="setChangeFormHandle">确 定</el-button>

            <el-button class="cananl" @click="cananlUpdate">取 消</el-button>
          </span>
    </el-dialog>

    <!-- 实施 -->
    <el-dialog title="实施" class="editorUserModal" :visible.sync="implementVisible" width="600px">
      <el-form :model="implementForm" :rules="implementRules" ref="implementForm" label-width="120px">
        <el-form-item label="实际实施时间:" prop="executeTime">
          <el-date-picker v-model="implementForm.executeTime" type="datetime" placeholder="选择时间"
                          value-format="yyyy-MM-dd HH:mm:ss">

          </el-date-picker>
        </el-form-item>
        <el-form-item class="modal-radio" label="实施类别：" prop="executeType">
          <el-radio-group v-model="implementForm.executeType">
            <el-radio
              v-for="item in executeTypeDetail"
              :label="item.num"
              :key="item.num"
            >
              {{item.value}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="modal-radio shishi" style="width: 100%;">
          <div style="width: 108px;text-align: right;color: rgba(68, 68, 68, 0.75);margin-right: 12px;"><span
            style="color: #F56C6C;margin-right: 4px;">*</span>实施效果：
          </div>
          <el-checkbox-group v-model="executeModalSelect">
            <el-checkbox v-for="item in executeResultDetail" :label="item.num" :key="item.num">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="实施结果：">
          <el-input type="textarea" v-model="implementForm.executeContent" resize="none" :rows="5"
                    placeholder="请输入实施结果"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button class="setBtn" @click="setImplementFormHandle">确 定</el-button>
            <el-button class="cananl" @click="cananlImplementForm">取 消</el-button>
          </span>
    </el-dialog>

    <!-- 评论 -->
    <el-dialog title="评论" class="editorUserModal" :visible.sync="commentVisible" width="600px">
      <el-form :model="commentForm" :rules="commentRules" ref="commentForm" label-width="120px">
        <el-form-item label="评论：" prop="commentRemark">
          <el-input type="textarea" v-model="commentForm.commentRemark" resize="none" :rows="5"
                    placeholder="请输入评论"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="setBtn" @click="setCommentHandle">确 定</el-button>
        <el-button class="cananl" @click="cananlCommentHandle">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    updateChangeSalePlan,
    querySalePlanInfoById,
    updateExecuteSalePlan,
    updateAppraiseSalePlan,
    queryCrmCompanyInfoByCommon,
    queryAllProjectBySalePlan
  } from '@/api/sale_plan'

  export default {
    data() {
      return {
        //实施-图片
        carryImg: "https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/组 6735_20200515091733_233.png",
        //变更-图片
        changeImg: "https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/组 6737_20200515091806_636.png",
        //评价-图片
        appraiseImg: "https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/组 6738_20200515091840_313.png",

        //获取路由传过来的PlanId
        planId: this.$route.query.id,

        //详情值
        planData: {
          companyType: "",
          executeType: "",
          executeResult: ""
        },
        //客户类型--数据
        companyTypeList: [
          {num: "0", value: '已有客户'},
          {num: "1", value: '新开发'},
        ],
        //实施类别--数据
        executeTypeDetail: [
          {num: "0", value: '其他'},
          {num: "1", value: '电话联系'},
          {num: "2", value: '上门拜访'},
          {num: "3", value: '线上'},
        ],
        //实施效果--数据
        executeResultDetail: [
          {num: "0", value: '没有收获'},
          {num: "1", value: '加qq微信'},
          {num: "2", value: '有意向'},
          {num: "3", value: '签单'},
        ],

        //获取的数据
        executeResultArr: "",

        // <!-------  新增\变更---弹窗  -------->
        //输入的数据
        updateForm: {
          planDate: "",
          companyName: "",
          projectName: ""
        },
        //隐藏\显示--弹窗
        updateVisible: false,
        //判断显示标题名称（true为新增，false为变更）
        updatetitleName: null,
        //目标客户判断写入或者选择
        isUserWriteChoose: true,
        //推广项目判断写入或者选择
        isProjectWriteChoose: true,
        //输入框监听
        updateRules: {
          companyName: [
            {required: true, message: '请填写或者选择目标客户', trigger: 'blur'}
          ],
          planDate: [
            {required: true, message: '请选择计划实施日期', trigger: 'blur'}
          ],
          projectName: [
            {required: true, message: '请填写或者选择推广项目', trigger: 'blur'}
          ],
          promotion_basis: [
            {required: true, message: '请填写推广依据', trigger: 'blur'}
          ],
          projectBasis: [
            {required: true, message: '请填写客户信息', trigger: 'blur'}
          ]
        },
        //目标客户列表
        companyNameList: [],
        //推广项目列表
        projectWriteList: [
          {
            id: "0",
            name: "公司1"
          },
          {
            id: "1",
            name: "公司2"
          }
        ],
        //计划实施日期设置默认值
        timeDefaultShow: "",
        //当前选中的新增/编辑类型
        selectUserOrProject: null,
        //目标客户参数
        targetUserParam: {
          page: 0,
          pageSize: 10
        },
        //目标客户总数
        companyTotalList: null,
        //推广项目参数
        projectByParam: {
          page: 0,
          pageSize: 10
        },
        projectByParamTotal: null,


        // <!-------  实施---弹窗  -------->
        //隐藏\显示--弹窗
        implementVisible: false,
        //输入的数据
        implementForm: {
          executeResult: []
        },
        //输入框监听
        implementRules: {
          executeTime: [
            {required: true, message: '请选择实际实施时间', trigger: 'blur'}
          ],
          executeType: [
            {required: true, message: '请选择实施类别', trigger: 'blur'}
          ],
          // executeResult: [
          //   {required: true, message: '请选择实施效果', trigger: 'blur'}
          // ],
        },


        // <!-------  评论---弹窗  -------->
        //隐藏\显示--弹窗
        commentVisible: false,
        //输入的数据
        commentForm: {},
        //输入框监听
        commentRules: {
          commentRemark: [
            {required: true, message: '请填写评论内容', trigger: 'blur'}
          ]
        },
        executeModalSelect: [],
        allowDetails: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:DETAILS'),//查询销售计划详情信息
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:UPDATE'),//变更销售计划
        allowExecute: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:EXECUTE'),//实施销售计划
        allowAppraise: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:APPRAISE'),//评论销售计划
        allowGetCompanyList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:COMPANY:LIST'),//查询客户企业信息-下拉列表
        allowGetProjectList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:PROJECT:LIST'),//查询项目列表
      }
    },

    activated() {
      if (this.allowDetails.twoAllow) {
        this.getPlanDetail();
      } else {
        this.$message.warning('抱歉，您没有权限获取详情')
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
      //获取企业
      getCompanyData(query) {
        this.targetUserParam.page = 0;
        this.targetUserParam.companyNameOnly = query;
        queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
          if (res.code == 200) {
            this.companyNameList = res.data.data;
            this.companyTotalList = res.data.total;
          }
        })
      },

      //获取项目列表
      getProjectData() {
        queryAllProjectBySalePlan(this.projectByParam).then(res => {
          if (res.code === 200) {
            this.projectWriteList = res.data.data
          }
        })
      },
      //获取详情
      getPlanDetail() {
        querySalePlanInfoById({planId: this.planId}).then(res => {
          if (res.code === 200) {
            let data = JSON.parse(JSON.stringify(res.data));
            this.planData = {
              companyShortName: data.companyShortName,
              companyId: data.companyId,
              companyName: data.companyName,
              companyType: data.companyType,
              contactName: data.contactName,
              contactPhone: data.contactPhone,
              createTime: data.createTime,
              projectName: data.projectName,
              projectBasis: data.projectBasis,
              planDate: data.planDate,
              executeTime: data.executeTime,
              executeType: data.executeType,
              executeResult: data.executeResult,
              executeContent: data.executeContent,
              commentRemark: data.commentRemark,
              planId: data.planId,
              salemanUsers: data.salemanUsers
            };
            let arr = data.executeResult.split(",");
            let newArr = [];
            this.executeResultDetail.forEach(item => {
              arr.forEach(data => {
                if (item.num == data) {
                  newArr.push(item.value);
                }
              });
            });
            this.executeResultArr = newArr.join(',');
          }
        })
      },


      //变更---点击变更
      editPlanFormHandle() {
        this.updateForm = {
          companyName: this.planData.companyName,
          contactName: this.planData.contactName,
          contactPhone: this.planData.contactPhone,
          planDate: this.planData.planDate,
          projectName: this.planData.projectName,
          projectBasis: this.planData.projectBasis,
          planId: this.planData.planId
        };
        this.getCompanyData();
        this.getProjectData();
        this.updateVisible = true;
      },
      //变更---销售计划---切换目标客户--选择\输入
      switchCompanyHandle() {
        this.isUserWriteChoose = !this.isUserWriteChoose;
        this.updateForm.companyName = "";
      },
      //变更---销售计划---切换推广项目--选择\输入
      switchProjectHandle() {
        this.isProjectWriteChoose = !this.isProjectWriteChoose;
        this.updateForm.projectName = "";
      },
      //变更---销售计划---确定编辑
      setChangeFormHandle() {
        this.$refs['updateForm'].validate((valid, error) => {
          if (valid) {
            updateChangeSalePlan(this.updateForm).then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功')
                this.updateVisible = false
                // this.$store.commit('SET_SALEPLAN_SCROLL', 0)
                this.getPlanDetail()
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      //变更---销售计划---取消
      cananlUpdate() {
        this.updateVisible = false;
      },

      //变更---选择目标客户
      addSelectCompanyHandle(val) {
        this.selectUserOrProject = 'user';
        this.companyNameList.forEach(item => {
          if (item.crmCompanyId == val) {
            this.updateForm.companyName = item.companyName;
          }
        })
      },

      //变更--获取更多目标客户
      loadMore() {
        if (this.selectUserOrProject === 'user') {
          this.targetUserParam.page += 10;
          queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
            if (res.code == 200) {
              if (this.companyNameList.length >= res.data.total) {
                return false
              } else {
                this.companyNameList = this.companyNameList.concat(res.data.data)
              }
            }
          })
        } else if (this.selectUserOrProject === 'project') {
          this.projectByParam.page += 10;
          queryAllProjectBySalePlan(this.projectByParam).then(res => {
            if (res.code == 200) {
              if (this.projectWriteList.length >= res.data.total) {
                return false
              } else {
                this.projectWriteList = this.projectWriteList.concat(res.data.data)
              }
            }
          })
        }
      },

      //变更 点击推广项目
      handleSelectData(val) {
        this.selectUserOrProject = val;
      },

      //变更---选择推广项目
      addSelectProjectHandle(val) {
        this.selectUserOrProject = 'project';
        this.projectWriteList.forEach(item => {
          if (item.projectId == val) {
            this.updateForm.projectName = item.projectName;
          }
        })
      },

      //远程查询
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getCompanyData(query);
          }, 100);
        } else {
          this.userParams.companyNameOnly = "";
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getTargetUserList();
          }, 100);
        }
      },


      //实施---点击实施
      implementHandle() {
        this.executeModalSelect = [];
        if (this.planData.executeTime) {
          this.implementForm = {
            executeTime: this.planData.executeTime,
            executeType: JSON.stringify(this.planData.executeType),
            executeResult: this.planData.executeResult,
            executeContent: this.planData.executeContent,
            planId: this.planData.planId
          }
          if (this.planData.executeResult !== "") {
            this.executeModalSelect = this.planData.executeResult.split(',');
          }
        } else {
          this.implementForm = {
            executeResult: [],
            planId: this.planData.planId,
          };
        }
        this.implementVisible = true
      },
      //实施---确认实施
      setImplementFormHandle() {
        this.$refs['implementForm'].validate((valid, error) => {
          if (valid) {
            if (this.executeModalSelect.length == 0) {
              this.$message.warning('请选择实施效果');
              return
            }
            this.implementForm.executeResult = this.executeModalSelect.join(',');

            updateExecuteSalePlan(this.implementForm).then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功')
                this.implementVisible = false
                // this.$store.commit('SET_SALEPLAN_SCROLL', 0)
                this.getPlanDetail()
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      //实施---取消实施
      cananlImplementForm() {
        this.implementVisible = false;
      },


      //评论---点击评论
      commentRemarkHandle() {
        if (this.planData.commentRemark) {
          this.commentForm = {
            planId: this.planData.planId,
            commentRemark: this.planData.commentRemark
          }
        } else {
          this.commentForm.planId = this.planData.planId;
        }
        this.commentVisible = true
      },
      //评论---确定评论
      setCommentHandle() {
        this.$refs['commentForm'].validate((valid, error) => {
          if (valid) {
            updateAppraiseSalePlan(this.commentForm).then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功')
                this.commentVisible = false
                // this.$store.commit('SET_SALEPLAN_SCROLL', 0)
                this.getPlanDetail()
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      //评论---取消
      cananlCommentHandle() {
        this.commentVisible = false;
      },

      //返回列表页
      goPlanListHandle() {
        this.$router.push({
          path: '/customer/salesPlan'
        })
        this.$store.state.tagsView.visitedViews.forEach((item, key) => {
          if (item.name == '查看计划') {
            this.$store.state.tagsView.visitedViews.splice(key, 1)
          } else {
            return false
          }
        })
      },
      //跳转到企业信息
      goCompanyDatail() {
        this.$router.push({'path': '/customer/editCustomer', 'query': {'id': this.planData.companyId, 'check': true,isContractListSkipFlag: 1}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .sale-plan-detail {
    margin: auto 5%;

    .title-bar {
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);
      margin-top: 20px;
      padding-left: 20px;
    }

    .company-bar {
      background: #fff;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      padding: 16px 50px;
      display: flex;
      align-items: center;

      .pic-box {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        width: 78px;
        height: 78px;
        background: rgba(105, 204, 255, 1);
        opacity: 1;
        margin-right: 20px;
        border-radius: 6px;
        padding: 23px;
      }

      .detail {
        .name {
          font-size: 18px;
          color: rgba(68, 68, 68, 1);
          margin-bottom: 20px;
          cursor: pointer;
        }

        .user-type {
          font-size: 14px;

          .user-title {
            color: rgba(68, 68, 68, 0.75);
          }
        }
      }
    }

    .cart-bar {
      margin-top: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

      .cart-title {
        min-height: 47px;
        font-size: 16px;
        border-bottom: 1px solid rgba(219, 233, 255, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;

        .title-name {
          display: flex;
          align-items: center;

          .line {
            display: inline-block;
            width: 3px;
            height: 14px;
            margin-right: 10px;

            &.orange {
              background: rgba(255, 169, 106, 1);
            }

            &.green {
              background: rgba(72, 212, 98, 1);
            }

            &.red {
              background: rgba(254, 78, 126, 1);
            }
          }

          .text {
            margin-top: 2px;
          }
        }

        .btn-img {
          cursor: pointer;
        }

        .item-btn {
          width: 72px;
          height: 30px;
          background-image: url("../../../../static/sales_plan_sprite.png");
          cursor: pointer;
          background-size: cover;

          &.edit {
            background-position: -158px, 0;
            margin-right: 5px;
          }

          &.implement {
            background-position: -79px, 0;
          }

          &.remark {
            background-position: -237px, 0;
          }
        }

        .item-btn:hover {
          background-image: url("../../../../static/_sales_plan_sprite.png");
        }
      }

      .cart-body {
        padding: 16px 0 1px 165px;
        font-size: 14px;

        .cart-item {
          margin-bottom: 16px;

          .name {
            color: rgba(68, 68, 68, 0.75);
          }

          .blue {
            color: rgba(5, 170, 255, 1);
          }

          .col-item {
            display: flex;

            .select-list-detail {
              display: flex;
              align-items: center;
              color: rgba(5, 170, 255, 1);

              .cate {
                margin-right: 10px;
              }
            }
          }
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

    .goPlanList {
      margin-top: 20px;
      margin-bottom: 10px;
      text-align: center;

      .btn {
        padding: 0;
        width: 100px;
        height: 38px;
        background: rgba(255, 255, 255, 1);
        font-size: 16px;
        color: rgba(68, 68, 68, 1);
        box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
        cursor: pointer;

        &:active {
          opacity: 0.5;
        }
      }
    }

    .shishi {
      /deep/ .el-form-item__content {
        width: 100%;
      }
    }
  }
</style>
