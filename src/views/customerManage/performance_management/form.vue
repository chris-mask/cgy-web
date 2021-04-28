<template>
  <div class="sale-plan-detail">
    <!--标题-->
    <div class="title-bar">
      绩效管理列表 - 新增
    </div>

    <el-form class="form-box" ref="form" :model="form" :rules="rules">

      <!--基础信息-->
      <div class="cart-bar">
        <div class="cart-body">
          <el-row style="margin-bottom: 10px;">
            <el-col :span="7">
              <el-form-item class="form-item" label="考核人员：">
                <el-select multiple filterable clearable
                           v-model="form.levelUsers"
                           class="select-user"
                           placeholder="请选择考核人员"
                           @change="levelUsersHandle"
                >
                  <el-option
                    v-for="item in userList"
                    :value="item.jobLevel"
                    :label="item.newPersonnelName"
                    :key="item.jobLevel"
                  />
                </el-select>
              </el-form-item>
              <span class="tips">提示：默认全部业务员！</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item class="form-item" label="考核年度：" prop="appraisalYear">
                <el-date-picker class="date" type="year" v-model="form.appraisalYear" value-format="yyyy"
                                placeholder="请选择年度" style="width: auto;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="考核季度：" prop="quarter">
                <el-select class="select-sort" v-model="form.quarter" clearable placeholder="请选择考核季度">
                  <el-option
                    v-for="item in quarterList"
                    :label="item.name"
                    :value="item.keys"
                    :key="item.keys"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="考核月度：" prop="month">
                <el-select class="select-sort" v-model="form.month" clearable placeholder="请选择考核月度">
                  <el-option
                    v-for="item in monthlyList"
                    :label="item.name"
                    :value="item.keys"
                    :key="item.keys"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--团队经理考核指标-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="title-name">
            <span class="line orange"></span>
            <div class="text">团队经理考核指标</div>
          </div>
        </div>
        <div class="cart-body">
          <el-row>
            <el-col :span="7">
              <el-form-item class="form-item" label="销售额(万元)：" prop="tl_planSaleAmount">
                <el-input v-model="form.tl_planSaleAmount"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="团队签单客户数(家)：" prop="tl_planSignCustomerNum">
                <el-input v-model="form.tl_planSignCustomerNum"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="人均达标率(%)：" prop="tl_planPerComplianceRate">
                <el-input v-model="form.tl_planPerComplianceRate"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--高级业务员考核指标-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="title-name">
            <span class="line blue"></span>
            <div class="text">高级业务员考核指标</div>
          </div>
        </div>
        <div class="cart-body">
          <el-row>
            <el-col :span="7">
              <el-form-item class="form-item" label="销售额(万元)：" prop="h_planSaleAmount">
                <el-input v-model="form.h_planSaleAmount"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="签单客户数(家)：" prop="h_planSignCustomerNum">
                <el-input v-model="form.h_planSignCustomerNum"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="新客户开发量(家)：" prop="h_planDevelopCustomerNum">
                <el-input v-model="form.h_planDevelopCustomerNum"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--中级业务员考核指标-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="title-name">
            <span class="line green"></span>
            <div class="text">中级业务员考核指标</div>
          </div>
        </div>
        <div class="cart-body">
          <el-row>
            <el-col :span="7">
              <el-form-item class="form-item" label="销售额(万元)：" prop="m_planSaleAmount">
                <el-input v-model="form.m_planSaleAmount"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="签单客户数(家)：" prop="m_planSignCustomerNum">
                <el-input v-model="form.m_planSignCustomerNum"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="新客户开发量(家)：" prop="m_planDevelopCustomerNum">
                <el-input v-model="form.m_planDevelopCustomerNum"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--初级业务员考核指标-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="title-name">
            <span class="line orange"></span>
            <div class="text">初级业务员考核指标</div>
          </div>
        </div>
        <div class="cart-body">
          <el-row>
            <el-col :span="7">
              <el-form-item class="form-item" label="销售额(万元)：" prop="l_planSaleAmount">
                <el-input v-model="form.l_planSaleAmount"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="签单客户数(家)：" prop="l_planSignCustomerNum">
                <el-input v-model="form.l_planSignCustomerNum"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="新客户开发量(家)：" prop="l_planDevelopCustomerNum">
                <el-input v-model="form.l_planDevelopCustomerNum"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--试用期业务员考核指标-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="title-name">
            <span class="line blue"></span>
            <div class="text">试用期业务员考核指标</div>
          </div>
        </div>
        <div class="cart-body">
          <el-row>
            <el-col :span="7">
              <el-form-item class="form-item" label="销售额(万元)：" prop="t_planSaleAmount">
                <el-input v-model="form.t_planSaleAmount"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="签单客户数(家)：" prop="t_planSignCustomerNum">
                <el-input v-model="form.t_planSignCustomerNum"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item class="form-item" label="新客户开发量(家)：" prop="t_planDevelopCustomerNum">
                <el-input v-model="form.t_planDevelopCustomerNum"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>

    </el-form>


    <!--返回-->
    <div class="goPlanList">
      <el-button class="btn blue" v-preventReClick @click="addPerformanceHandle('form')" v-if="allowAdd.twoAllow">确定</el-button>
      <el-button class="btn" @click="goBackList">返回</el-button>
    </div>

  </div>
</template>

<script>
  import {queryAllUserOfLevel, savePerformance} from "@/api/performanceMangae"
  import {commonDictGetNameByCaChe,commonDict} from "@/api/utils"


  export default {
    data() {
      return {
        value2: [],
        userList: [],

        //季度列表
        quarterList: [
          {keys: "1", name: "1季度"},
          {keys: "2", name: "2季度"},
          {keys: "3", name: "3季度"},
          {keys: "4", name: "4季度"},
        ],

        //月度列表
        monthlyList: [
          {keys: "1", name: "1月份"},
          {keys: "2", name: "2月份"},
          {keys: "3", name: "3月份"},
          {keys: "4", name: "4月份"},
          {keys: "5", name: "5月份"},
          {keys: "6", name: "6月份"},
          {keys: "7", name: "7月份"},
          {keys: "8", name: "8月份"},
          {keys: "9", name: "9月份"},
          {keys: "10", name: "10月份"},
          {keys: "11", name: "11月份"},
          {keys: "12", name: "12月份"},
        ],

        //表单
        form: {
          levelUsers: [],
          appraisalYear:"",
          quarter:"",
          month:"",
          tl_planSaleAmount: 40,
          tl_planSignCustomerNum: 10,
          tl_planPerComplianceRate: 80,
          h_planSaleAmount: 5,
          h_planSignCustomerNum: 3,
          h_planDevelopCustomerNum: 1,
          m_planSaleAmount: 3,
          m_planSignCustomerNum: 2,
          m_planDevelopCustomerNum: 1,
          l_planSaleAmount: 2,
          l_planSignCustomerNum: 1,
          l_planDevelopCustomerNum: 0,
          t_planSaleAmount: 1,
          t_planSignCustomerNum: 1,
          t_planDevelopCustomerNum: 1,
        },
        rules: {
          appraisalYear: [
            {required: true, message: '请选择年度', trigger: 'blur'},
          ],
          quarter: [
            {required: true, message: '请选择季度', trigger: 'blur'},
          ],
          month: [
            {required: true, message: '请选择月度', trigger: 'blur'},
          ],
          tl_planSaleAmount: [
            {required: true, message: '请输入销售额', trigger: 'blur'},
          ],
          tl_planSignCustomerNum: [
            {required: true, message: '请输入团队签单客户数', trigger: 'blur'},
          ],
          tl_planPerComplianceRate: [
            {required: true, message: '请输入人均达标率', trigger: 'blur'},
          ],
          h_planSaleAmount: [
            {required: true, message: '请输入销售额', trigger: 'blur'},
          ],
          h_planSignCustomerNum: [
            {required: true, message: '请输入签单客户数', trigger: 'blur'},
          ],
          h_planDevelopCustomerNum: [
            {required: true, message: '请输入新客户开发量', trigger: 'blur'},
          ],
          m_planSaleAmount: [
            {required: true, message: '请输入销售额', trigger: 'blur'},
          ],
          m_planSignCustomerNum: [
            {required: true, message: '请输入签单客户数', trigger: 'blur'},
          ],
          m_planDevelopCustomerNum: [
            {required: true, message: '请输入新客户开发量', trigger: 'blur'},
          ],
          l_planSaleAmount: [
            {required: true, message: '请输入销售额', trigger: 'blur'},
          ],
          l_planSignCustomerNum: [
            {required: true, message: '请输入签单客户数', trigger: 'blur'},
          ],
          l_planDevelopCustomerNum: [
            {required: true, message: '请输入新客户开发量', trigger: 'blur'},
          ],
          t_planSaleAmount: [
            {required: true, message: '请输入销售额', trigger: 'blur'},
          ],
          t_planSignCustomerNum: [
            {required: true, message: '请输入签单客户数', trigger: 'blur'},
          ],
          t_planDevelopCustomerNum: [
            {required: true, message: '请输入新客户开发量', trigger: 'blur'},
          ],
        },
        levelList:[],
        endSelectLevelUsers: [],

        allowAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:PERFORMANCE:MANAGE','SYSTEM:PERFORMANCE:INSERT'),//新增绩效记录
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:PERFORMANCE:MANAGE','SYSTEM:PERFORMANCE:UPDATE'),//绩效记录修改
      }
    },
    created() {
      this.getLevelDictory();
    },
    mounted() {
      this.getUserList();
    },
    activated() {
      this.form.levelUsers = [],
      this.form.appraisalYear = "";
      this.form.quarter = "";
      this.form.month = ""
    },

    methods: {
      //获取级别字典
      getLevelDictory(){
        commonDict({keyList: 'DICT:USER_LEVEL'}).then(res=>{
            if(res.code === 200){
              this.levelList = res.data['DICT:USER_LEVEL'];
            }
        })
      },

      //获取考核人员列表
      getUserList() {
        queryAllUserOfLevel().then(res => {
          if (res.code === 200) {
            let data = JSON.parse(JSON.stringify(res.data));
            data.forEach(item => {
              if (item.jobLevel) {
                commonDictGetNameByCaChe({dictId: item.jobLevel}).then(dic => {
                  item.levelName = dic.data;
                  item.newPersonnelName = `${item.personnelName}_${dic.data}`
                })
              }
            });
            setTimeout(() => {
              this.userList = data;
            }, 100)
          }
        })
      },

      //选择考核人员
      levelUsersHandle(e) {
        let data = this.userList.filter(item => e.includes(item.jobLevel));
        if (data.length !== 0) {
          let obj = {};
          this.endSelectLevelUsers = data.map(item => {
            obj.levelId = item.jobLevel;
            obj.levelName = item.levelName;
            obj.userId = item.userId;
            return obj;
          });
        }
        this.endSelectLevelUsers = this.endSelectLevelUsers.filter(item => e.includes(item.levelId));
      },

      //添加绩效
      addPerformanceHandle(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.levelUsers.length === 0) {
              let obj = {};
              this.userList.forEach(item=>{
                obj.levelId = item.jobLevel;
                obj.levelName = item.levelName;
                obj.userId = item.userId;
              });
              this.endSelectLevelUsers.push(obj);
            }
            let params = {
              "appraisalYear": Number(this.form.appraisalYear),
              "indicators": [
                {
                  appraisalType:this.levelList[4].dictId,
                  "name": "tl",
                  planSaleAmount: this.form.tl_planSaleAmount * 10000,
                  planSignCustomerNum: this.form.tl_planSignCustomerNum,
                  planPerComplianceRate: this.form.tl_planPerComplianceRate,
                },
                {
                  appraisalType:this.levelList[3].dictId,
                  "name": "h",
                  planSaleAmount: this.form.h_planSaleAmount * 10000,
                  planSignCustomerNum: this.form.h_planSignCustomerNum,
                  planDevelopCustomerNum: this.form.h_planDevelopCustomerNum,
                },
                {
                  appraisalType:this.levelList[2].dictId,
                  "name": "m",
                  planSaleAmount: this.form.m_planSaleAmount * 10000,
                  planSignCustomerNum: this.form.m_planSignCustomerNum,
                  planDevelopCustomerNum: this.form.m_planDevelopCustomerNum,
                },
                {
                  appraisalType:this.levelList[1].dictId,
                  "name": "l",
                  planSaleAmount: this.form.l_planSaleAmount * 10000,
                  planSignCustomerNum: this.form.l_planSignCustomerNum,
                  planDevelopCustomerNum: this.form.l_planDevelopCustomerNum,
                },
                {
                  appraisalType:this.levelList[0].dictId,
                  "name": "t",
                  planSaleAmount: this.form.t_planSaleAmount * 10000,
                  planSignCustomerNum: this.form.t_planSignCustomerNum,
                  planDevelopCustomerNum: this.form.t_planDevelopCustomerNum,
                }
              ],
              "levelUsers": this.endSelectLevelUsers,
              "month": Number(this.form.month),
              "quarter": Number(this.form.quarter)
            };
            savePerformance(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.$router.push({ 'path': '/customer/performanceManagement'})
                this.$store.state.tagsView.visitedViews.forEach((item, key) => {
                  if (item.name === '新增绩效') {
                    this.$store.state.tagsView.visitedViews.splice(key, 1)
                  } else {
                    return false
                  }
                });
                this.$store.commit('SET_PERFORMANCE_SCROLL', 0)
              }
            })

          } else {
            return false;
          }
        });
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
      goBackList() {
        this.$router.push({
          'path': '/customer/performanceManagement',
        })
        this.$store.state.tagsView.visitedViews.forEach((item, key) => {
          if (item.name == '新增绩效') {
            sessionStorage.removeItem('demandForm');
            this.$store.state.tagsView.visitedViews.splice(key, 1)
          } else {
            return false
          }
        });
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
            margin-top: 1px;

            &.orange {
              background: rgba(255, 169, 106, 1);
            }

            &.green {
              background: rgba(72, 212, 98, 1);
            }

            &.red {
              background: rgba(254, 78, 126, 1);
            }

            &.blue {
              background: rgba(88, 131, 255, 1);
            }
          }

          .text {
            margin-top: 2px;
          }
        }

        .btn-img {
          cursor: pointer;
        }
      }

      .cart-body {
        font-size: 14px;
        padding: 16px;
        padding-left: 32px;

        /deep/ .el-form-item {
          margin-bottom: 0;
        }

        .form-item {
          display: flex;
          align-items: center;

          /deep/ .el-form-item__label {
            white-space: nowrap;
          }

          /deep/ .el-form-item__label {
            font-size: 14px;
            font-weight: 400;
            color: rgba(68, 68, 68, 0.75);
          }

          /deep/ .el-input__inner {
            width: 160px;
            height: 30px;
            border-radius: 0;
            border: 0;
            color: #444;
            padding-left: 3px;
            border-bottom: 1px solid rgba(68, 68, 68, 0.3);
          }

          .date {
            /deep/ .el-input__inner {
              padding-left: 30px;
            }
          }

          .select-user {
            /deep/ .el-input__inner {
              min-width: 348px;
            }
          }
        }

        .tips {
          color: #ff0000;
          margin-left: 85px;
        }
      }
    }

    .goPlanList {
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;

      .btn {
        width: 120px;
        height: 48px;
        background: rgba(255, 255, 255, 1);
        font-size: 16px;
        color: rgba(68, 68, 68, 1);
        box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
        cursor: pointer;

        &.blue {
          color: #fff;
          background: linear-gradient(180deg, rgba(155, 221, 255, 1) 0%, rgba(55, 187, 255, 1) 100%);
        }

        &:active {
          opacity: 0.5;
        }
      }
    }
  }
</style>
