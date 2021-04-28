<template>
  <div class="sales-plan-box">
    <!--搜索-->
    <div class="search-bar">
      <div class="search">
        <el-input @keyup.enter="handleFilter" v-model="form.userName" class="search-input" placeholder="姓名"/>
        <el-button class="btn" @click="handleFilter">搜一下</el-button>
      </div>
      <el-button class="btn" @click="addPerformanceHandle" v-if="allowAdd.twoAllow">新增</el-button>
    </div>

    <!--筛选栏-->
    <div class="screen-bar">
      <div class="screen-title">
        <div class="name">
          <span class="line"></span>
          <span class="text">已选条件：</span>
        </div>
        <div class="selected-list">
          <div class="item" v-for="(item,index) in select_filter_list">
            <div class="text">{{item}}</div>
            <img :src="clearBlue" @click="deleteOneClick(index)"/>
          </div>
          <div class="item clear" @click="deleteAllClick" v-if="Object.keys(select_filter_list).length>0">清空所有</div>
        </div>
        <div class="screen-btn">
          <div class="btn" @click="isScreenShow = !isScreenShow">
            <img :src="isScreenShow?closeIcon:openIcon"/>
            <span class="text">{{!isScreenShow?'选择筛选条件':'收起筛选条件'}}</span>
          </div>
        </div>
      </div>
      <div class="screen-list" v-show="isScreenShow">
        <!--常用-->
        <div class="form-item">
          <span class="label-text">常用：</span>
          <div class="form-handle">
            <el-select size="small" v-model="form.deptIds" class="select-input" filterable clearable multiple placeholder="选择部门" v-if="allowGetDeptList.twoAllow"
                       @change="selectCompanyHandle">
              <el-option
                v-for="item in companyList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              />
            </el-select>
            <el-select size="small" @change='selectUserHandle'
                       v-model="form.userIds"
                       class="select-input"
                       filterable clearable multiple placeholder="选择员工">
              <el-option
                v-for="item in userList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>

            <el-select size="small" @change='selectAppraisalResultHandle' v-model="form.appraisalResult" class="select-input"
                       clearable
                       placeholder="选择考核结果">
              <el-option
                v-for="item in checkResultList"
                :key="item.keys"
                :label="item.name"
                :value="item.keys"
              />
            </el-select>
          </div>
        </div>

        <!--考核时间-->
        <div class="form-item">
          <span class="label-text">考核时间：</span>
          <el-date-picker
            style="margin-right: 10px;"
            v-model="year"
            type="year"
            placeholder="选择年"
            size="small"
            @change='selectYearHandle'
            value-format="yyyy"
          />

          <div v-if="activeNavBar == 0 || activeNavBar ==2" class="form-handle">
            <el-select size="small" @change='selectWeekHandle' class="select-input" v-model="form.appraisalPeriod" filterable
                       clearable
                       placeholder="选择月份">
              <el-option
                v-for="item in weekList"
                :key="item.keys"
                :label="item.name"
                :value="item.keys"
              />
            </el-select>
          </div>

          <div v-else class="form-handle">
            <el-select size="small" @change='selectQuarterHandle' class="select-input" v-model="form.appraisalPeriod" filterable
                       clearable
                       placeholder="选择季度">
              <el-option
                v-for="item in quarterList"
                :key="item.keys"
                :label="item.name"
                :value="item.keys"
              />
            </el-select>
          </div>

        </div>

        <!--销售额-->
        <div class="form-item">
          <span class="label-text">销售额：</span>
          <moneySelect
            ref="saleAmount"
            size="small"
            :inputName="'销售额'"
            :moneyList="saleAmountList"
            :rangeMoneyName="rangeMoneyName"
            @handleMoney="handleMoney"
            @handleClearMoney="handleClearMoney"
            @handleMoneyRange="handleMoneyRange"
          ></moneySelect>

        </div>

        <!--签单客户数-->
        <div class="form-item">
          <span class="label-text">签单客户数：</span>
          <div class="form-handle">
            <el-checkbox-group v-model="form.realSignCustomerNums" @change="selectHealSignHandle">
              <el-checkbox v-for="item in customerDataList" :label="item.keys" :key="item.keys">{{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!--新客户开发量-->
        <div class="form-item">
          <span class="label-text">新客户开发量：</span>
          <div class="form-handle">
            <el-checkbox-group v-model="form.realDevelopCustomerNums" @change="realDevelopHandle">
              <el-checkbox v-for="item in customerDataList" :label="item.keys" :key="item.keys">{{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

      </div>
    </div>

    <!--列表-->
    <div class="list">
      <div class="list-nav-bar">
        <div :class="item.keys === activeNavBar?'nav-item cur': 'nav-item'" v-for="item in navTab" :key="item.keys"
             @click="navTabHandle(item.keys)">
          {{item.name}}
        </div>
      </div>

      <div class="list-title">
        <div class="left">
          <div class="title-text">
            <span class="line"></span>
            <div class="search-total-num">搜索到 <span class="num">{{listTotal}}</span> 条记录</div>
            <div class="search-total-num" style="margin-left: 10px;" v-if="check_biz_ids.length > 0">已选中 <span class="num">{{check_biz_ids.length}}</span> 条记录</div>
          </div>
          <div class="title-btn-group">
            <div class="btn" @click="checkAllOrNo">
              {{isCheckAll?'取消全选':'全选'}}
            </div>
            <div class="btn" @click="handleExport">导出</div>
            <div class="btn del" @click="delPerformanceItem" v-if="allowDelete.twoAllow">删除</div>
          </div>
        </div>

        <div class="right">
          <!--排序-->
          <el-select v-model="form.orderField"
                     class="select-sort"
                     clearable
                     placeholder="默认排序"
                     @change="sortListHandle"
                     popper-class="select-sort-option"
                     :popper-append-to-body="false"
          >
            <el-option
              v-for="(item,index) in sortDataList"
              :value="item.id"
              :label="item.value"
              :key="index"
            />
          </el-select>
        </div>
      </div>

      <div class="list-detail">
        <div class="item" v-for="(item,index) in listData" :key="index">
          <div class="item-detail">

            <!--图片+多选-->
            <div class="pic">
              <input
                class="check-box"
                type="checkbox"
                name="check_biz_ids"
                :value="item.appraisalId"
                v-model="check_biz_ids"
                @change="checkOneOrNo"
              />
              <div class="img-box" :style="`background:${item.bgColor}`">
                {{item.userName}}
              </div>
            </div>

            <!--列表详情-->
            <div class="detail">
              <div class="title">
                <span class="text">{{item.userName}}</span>
              </div>
              <div class="user-conent">
                <div :class="item.appraisalResult === 1? 'item pass' : 'item'">
                  <div class="cate" style="min-width: 11%;">年度：<span>{{item.appraisalYear}}</span></div>
                  <div class="cate" style="min-width: 15%;">考核周期：<span>{{weekArrList[item.appraisalPeriod]}}</span>
                  </div>
                  <div class="cate" style="min-width: 18%;">销售额：<span>{{item.planSaleAmount}}元</span></div>

                  <div class="cate" v-if="activeNavBar === '2'" style="min-width: 20%;">团队签单客户数：<span>{{item.planSignCustomerNum}}</span>
                  </div>
                  <div class="cate" v-else style="min-width: 20%;">签单客户数：{{item.planSignCustomerNum}}<span></span></div>

                  <div class="cate" v-if="activeNavBar === '2'" style="min-width: 20%;">人均达标率：<span>{{item.planPerComplianceRate}}</span>
                  </div>
                  <div class="cate" v-else style="min-width: 20%;">新客户开发量：<span>{{item.planDevelopCustomerNum}}</span>
                  </div>


                  <div class="cate" style="min-width: 15%;">
                    考核结果：<span>{{checkResultList[item.appraisalResult].name}}</span></div>
                </div>
              </div>
              <!--标签-->
              <div class="bage">
                <img v-if="item.appraisalResult === 1" class="result-img"
                     src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案_20200515144809_175.png" alt=""/>
                <img v-if="item.appraisalResult === 0" class="result-img"
                     src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案(4)_20200515144901_178.png" alt=""/>
              </div>
            </div>
          </div>

          <!--操作按钮组-->
          <div class="handle-btn-group">
            <div>
              <div class="btn-img edit-img" @click="editModalHandle(item)" v-if="allowUpdate.twoAllow"></div>
            </div>
          </div>
        </div>
        <!--加载更多-->
        <div class="get-more" @click="loadMore">
          {{listData.length >= listTotal ? '没有更多' : '加载更多'}}
        </div>
      </div>
    </div>

    <!--置顶-->
    <div class="goTop">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../../icons/enterprise/back_top.png" alt="">
      </a>
    </div>

    <!--弹窗--编辑转正员工指标-->
    <el-dialog v-dialogDrag title="编辑转正员工指标" class="editorUserModal" :visible.sync="implementVisible" width="600px">
      <el-form ref="implementForm" :model="editUserForm" :rules="editUserRules" label-width="120px">
        <el-form-item label="姓名：">
          {{editUserForm.userName}}
        </el-form-item>
        <el-form-item label="考核年度：">
          <span>{{editUserForm.appraisalYear}}</span>
          <!--          <el-date-picker type="year" value-format="yyyy" placeholder="请选择年度"></el-date-picker>-->
        </el-form-item>


        <el-form-item label="考核周期：">
          <span>{{weekArrList[editUserForm.appraisalPeriod]}}</span>
          <!--          <el-select class="week" filterable clearable placeholder="请选择周期">-->
          <!--            <el-option>123</el-option>-->
          <!--          </el-select>-->
        </el-form-item>

        <el-form-item label="销售额：" prop="planSaleAmount">
          <el-input v-model="editUserForm.planSaleAmount" type="number" min="0">
            <template slot="append">万</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="activeNavBar === '2'" label="团队签单客户数：" prop="planSignCustomerNum">
          <el-input v-model="editUserForm.planSignCustomerNum" type="number" min="0">
            <template slot="append">家</template>
          </el-input>
        </el-form-item>

        <el-form-item v-else label="签单客户数：" prop="planSignCustomerNum">
          <el-input v-model="editUserForm.planSignCustomerNum" type="number" min="0">
            <template slot="append">家</template>
          </el-input>
        </el-form-item>


        <el-form-item v-if="activeNavBar === '2'" label="人均达标率：" prop="planPerComplianceRate">
          <el-input v-model="editUserForm.planPerComplianceRate" type="number" min="0">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item v-else label="新客户开发数：" prop="planDevelopCustomerNum">
          <el-input v-model="editUserForm.planDevelopCustomerNum" type="number" min="0">
            <template slot="append">家</template>
          </el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="setBtn" @click="setEditForm('implementForm')" v-preventReClick>确 定</el-button>
        <el-button class="cananl" @click="cananlModal">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import clearBlue from '../../icons/enterprise/clear_blue.png'
  import openIcon from '../../icons/enterprise/open_icon.png'
  import closeIcon from '../../icons/enterprise/close_icon.png'
  import {commonDictGetNameByCaChe, commonDict, downloadCrm} from '@/api/utils'
  import {getCompanyDeptTree, queryUserListByDepts} from '@/api/sale_plan'
  import {queryPerformance, editPerformance, queryAllUserOfLevel,batchDeletePerformance,exportPerformance} from "@/api/performanceMangae"
  import store from "../../../store";
  import moneySelect from '../../../components/timeMoneySelect/moneySelect'
  import {queryUserComboInfo} from '@/api/customerCenter'

  export default {
    data() {
      return {
        clearBlue,
        openIcon,
        closeIcon,
        // 列表--tab数据
        navTab: [
          {keys: '0', name: "转正员工"},
          {keys: '1', name: "试用员工"},
          {keys: '2', name: "团队经理"}
        ],
        activeNavBar: '0',
        //获取公司名称
        companyName: store.getters.companyName,


        //已选条件
        select_filter_list: {},

        // 筛选栏--显示/隐藏
        isScreenShow: false,
        //筛选集
        form: {
          page: 0,
          pageSize: 10,
          realSignCustomerNums: [],
          realDevelopCustomerNums: [],
        },
        //筛选--部门数据列表
        companyList: [],

        //筛选--员工数据列表
        userList: [],

        //筛选--考核结果数据列表
        checkResultList: [
          {keys: 0, name: '不及格'},
          {keys: 1, name: '及格'},
          {keys: 2, name: '未审核'},
        ],

        //筛选栏 -- 考核时间
        year: "",
        //筛选--月份列表
        weekList: [
          {keys: 1, name: "1月份"},
          {keys: 2, name: "2月份"},
          {keys: 3, name: "3月份"},
          {keys: 4, name: "4月份"},
          {keys: 5, name: "5月份"},
          {keys: 6, name: "6月份"},
          {keys: 7, name: "7月份"},
          {keys: 8, name: "8月份"},
          {keys: 9, name: "9月份"},
          {keys: 10, name: "10月份"},
          {keys: 11, name: "11月份"},
          {keys: 12, name: "12月份"},
        ],

        //筛选--季度列表
        quarterList: [
          {keys: 13, name: "1季度"},
          {keys: 14, name: "2季度"},
          {keys: 15, name: "3季度"},
          {keys: 16, name: "4季度"},
        ],

        //筛选--销售额列表
        saleAmountList: [
          {keys: "0", val: "0元"},
          {keys: "0,1", val: "0-1万"},
          {keys: "1,2", val: "1-2万"},
          {keys: "2,3", val: "2-3万"},
          {keys: "3,5", val: "3-5万"},
          {keys: "5,10", val: "5-10万"},
          {keys: "10,100000000", val: "10万以上"}
        ],
        // 自定义金额名称
        rangeMoneyName: '',

        //筛选--客户数列表
        customerDataList: [
          {keys: 0, name: '0家'},
          {keys: 1, name: '1家'},
          {keys: 2, name: '2家'},
          {keys: 3, name: '3家'},
          {keys: 4, name: '4家'},
          {keys: 5, name: '5家'},
          {keys: 6, name: '5家以上'},
        ],

        //筛选栏--排序
        sortDataList: [
          {id: 'su.username', value: "业务员顺序", type: "ASC"},
          {id: 'cpa.appraisalPeriod', value: "考核时间顺序", type: "ASC"},
          {id: '-cpa.appraisalPeriod', value: "考核时间倒序", type: "DESC"},
          {id: 'cpa.realSaleAmount', value: "销售额顺序", type: "ASC"},
          {id: '-cpa.realSaleAmount', value: "销售额倒序", type: "DESC"},
          {id: 'cpa.realSignCustomerNum', value: "签单客户顺序", type: "ASC"},
          {id: '-cpa.realSignCustomerNum', value: "签单客户倒序", type: "DESC"},
          {id: 'cpa.realDevelopCustomerNum', value: "新客户开发数顺序", type: "ASC"},
          {id: '-cpa.realDevelopCustomerNum', value: "新客户开发数倒序", type: "DESC"},
          {id: 'cpa.realPerComplianceRate', value: "人均达标率顺序", type: "ASC"},
          {id: '-cpa.realPerComplianceRate', value: "人均达标率倒序", type: "DESC"},
          {id: 'cpa.appraisalResult', value: "考核结果顺序", type: "ASC"},
          {id: '-cpa.appraisalResult', value: "考核结果倒序", type: "DESC"},
        ],

        //列表---级别tab
        levelNavTabList: [],

        //列表---数据
        listData: [],
        //列表总数据
        listTotal: "",

        //置顶按钮
        btnFlag: false,

        //列表框背景色
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],

        // 编辑弹窗-显示/隐藏
        implementVisible: false,
        editUserForm: {},

        //弹窗监听
        editUserRules: {
          planSaleAmount: [
            {required: true, message: '请输入销售额', trigger: 'blur'},
          ],
          planSignCustomerNum: [
            {required: true, message: '请输入签单客户数', trigger: 'blur'},
          ],
          planPerComplianceRate: [
            {required: true, message: '请输入人均达标率', trigger: 'blur'},
          ],
          planDevelopCustomerNum: [
            {required: true, message: '请输入新客户开发数', trigger: 'blur'},
          ],
        },

        //弹窗-人员列表
        modalUserList: [],
        // 是否已经全选
        isCheckAll: false,
        // 勾选行的biz_id
        check_biz_ids: [],

        //周期列表
        weekArrList: ['', '1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份', '9月份', '10月份', '11月份', '12月份', '1季度', '2季度', '3季度', '4季度'],
        //级别简称
        levelShortName: [
          {keys: 'tl', name: "团队经理"},
          {keys: 'h', name: "高级"},
          {keys: 'm', name: "中级"},
          {keys: 'l', name: "初级"},
          {keys: 't', name: "试用期"},
        ],

        allowGetUserList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:PERFORMANCE:MANAGE','SYSTEM:PERFORMANCE:USER:LIST'),//获取用户列表
        allowAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:PERFORMANCE:MANAGE','SYSTEM:PERFORMANCE:INSERT'),//新增绩效记录
        allowGetList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:PERFORMANCE:MANAGE','SYSTEM:PERFORMANCE:LIST'),//绩效记录列表查询
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:PERFORMANCE:MANAGE','SYSTEM:PERFORMANCE:UPDATE'),//绩效记录修改
        allowDelete: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:PERFORMANCE:MANAGE','SYSTEM:PERFORMANCE:USER:BATCHDEL'),//绩效记录批量删除

        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
      }
    },
    components: {moneySelect},
    mounted() {
      this.getCompanyDeptTree();
      if(this.allowGetUserList.twoAllow){
        this.getUserList();
      }else{
        this.$message.warning('抱歉，您没有获取用户列表权限')
      }
    },
    activated() {
      if(this.$store.getters.performancePage != 0){
        this.form.page = 0;
        this.form.pageSize = this.$store.getters.performancePage + 20;
        this.getDistoryData();
      }else{
        this.form.page = this.$store.getters.performancePage;
        this.form.pageSize = 20;
        this.getDistoryData();
      }

      this.getPersonList('业务员,业务主管')

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.performanceScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_PERFORMANCE_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_PERFORMANCE_PAGE', this.form.page) //离开路由时把位置存起来
      next()
    },
    methods: {
      //获取字典
      getDistoryData() {
        commonDict({keyList: 'DICT:USER_LEVEL'}).then(res => {
          if (res.code === 200) {
            let num = res.data['DICT:USER_LEVEL'];
            this.levelNavTabList = num;
            if(num){
              this.form.userTypes = [num[1].dictId, num[2].dictId, num[3].dictId];
            }
            this.getList()
          }
        })
      },
      //获取考核人员列表
      getUserList() {
        queryAllUserOfLevel({}).then(res => {
          if (res.code === 200) {
            let data = JSON.parse(JSON.stringify(res.data));
            data.forEach(item => {
              if(item !== null){
                if (item.jobLevel != null && item.jobLevel) {
                  commonDictGetNameByCaChe({dictId: item.jobLevel}).then(dic => {
                    item.levelName = dic.data;
                    item.newPersonnelName = `${item.personnelName}_${dic.data}`
                  })
                }
              }
            });
            setTimeout(() => {
              this.modalUserList = data;
            }, 100)
          }
        })
      },


      //跳转到新增
      addPerformanceHandle() {
        this.$router.push({
          path: '/customer/performanceManagement/form'
        })
      },

      //选择tab
      navTabHandle(val) {
        this.activeNavBar = val;
        this.form.appraisalPeriod = "";
        this.$delete(this.select_filter_list, 'appraisalPeriod')
        let num = this.levelNavTabList;
        if (val === '0') {
          this.form.userTypes = [num[1].dictId, num[2].dictId, num[3].dictId];
        } else if (val === '1') {
          this.form.userTypes = [num[0].dictId];
        } else if (val === '2') {
          this.form.userTypes = [num[4].dictId];
        }
        this.handleFilter();
      },

      handleFilter() {
        this.form.page = 0;
        this.getList()
      },

      //获取列表
      getList() {
        if(this.allowGetList.twoAllow){
          queryPerformance(this.form).then(res => {
            if (res.code === 200) {
              let list = res.data.data
              let newRes = []
              let R = [], F;
              for (F = 0; F < list.length;) R.push(list.slice(F, F += 5));
              R.forEach(item => {
                item.forEach((data, index) => {
                  this.picBackgroundList.forEach((val, key) => {
                    if (index === key) {
                      data.bgColor = val;
                    }
                  })
                })
              });
              R.forEach(item => {
                item.forEach(item => {
                  newRes.push(item);
                })
              });
              this.listData = newRes;
              this.listTotal = res.data.total
              this.check_biz_ids = [];

              if(this.$store.getters.performancePage != 0){
                this.form.page = this.$store.getters.performancePage;
                this.form.pageSize = 20;
              }

              let obj = {}
              this.listData = this.listData.reduce((cur, next) => {
                obj[next.crmCompanyId] ? '' : obj[next.crmCompanyId] = true && cur.push(next)
                return cur
              }, [])
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取绩效列表')
        }
      },


      //筛选栏--获取企业列表
      getCompanyDeptTree() {
        getCompanyDeptTree({
          'companyId': this.$store.getters.companyId,
          'companyName': this.companyName
        }).then(res => {
          this.companyList = res.data.deptInfoTreeVos;
        })
      },
      //筛选栏-选择部门-获取员工-操作
      selectCompanyHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.companyList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'deptIds', `${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'deptIds')
          this.$delete(this.select_filter_list, 'userIds')
          this.userList = [];
        }

        this.getPersonList('业务员,业务主管',val)
        this.handleFilter();
      },

      //根据角色获取人员列表
      getPersonList(name,deptIds){
        let formData = new FormData;
        formData.append('roleNameList',name)
        if(deptIds != undefined){
          formData.append('deptIdList',deptIds)
        }
        queryUserComboInfo(formData).then(res=>{
          if(res.code == 200){
            this.userList = res.data;
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //筛选栏-选择员工-操作
      selectUserHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.userList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'userIds', `${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'userIds')
        }
        this.handleFilter();
      },

      //筛选栏-考核结果-操作
      selectAppraisalResultHandle(val) {
        if (val.length != 0) {
          this.checkResultList.forEach(item => {
            if (item.keys == val) {
              this.$set(this.select_filter_list, 'appraisalResult', item.name)
            }
          })
        } else {
          this.$delete(this.select_filter_list, 'appraisalResult')
        }
        this.handleFilter();
      },

      //筛选栏-选择年
      selectYearHandle(data) {
        if (data !== "" && data) {
          this.form.appraisalYear = Number(data);
          this.$set(this.select_filter_list, 'appraisalYear', data)
        } else {
          this.form.appraisalYear = "";
          this.$delete(this.select_filter_list, 'appraisalYear')
        }
        this.handleFilter();
      },

      //筛选栏-选择月份
      selectWeekHandle(data) {
        if (data !== "" && data) {
          this.$set(this.select_filter_list, 'appraisalPeriod', `${data}月份`)
        } else {
          this.$delete(this.select_filter_list, 'appraisalPeriod')
        }
        this.handleFilter();
      },

      selectQuarterHandle(data) {
        if (data == 13) {
          this.$set(this.select_filter_list, 'appraisalPeriod', '1季度');
          this.handleFilter();
          return
        } else if (data == 14) {
          this.$set(this.select_filter_list, 'appraisalPeriod', '2季度')
          this.handleFilter();
          return
        } else if (data == 15) {
          this.$set(this.select_filter_list, 'appraisalPeriod', `3季度`)
          this.handleFilter();
          return
        } else if (data == 16) {
          this.$set(this.select_filter_list, 'appraisalPeriod', `4季度`)
          this.handleFilter();
          return
        } else {
          this.$delete(this.select_filter_list, 'appraisalPeriod')
          this.handleFilter();
        }
      },


      //筛选栏-排序
      sortListHandle(val) {
        this.sortDataList.forEach(item => {
          if (item.id === val) {
            if (item.type && item.type !== undefined) {
              this.form.orderType = item.type
            }
          }
        })
        if (val.includes('-')) {
          val = val.substr(1);
        }
        this.form.orderField = val;
        this.handleFilter();
      },
      //筛选栏---子组件--销售额--获取修改的值
      handleMoney(data) {
        if (data && data !== "") {
          let arr = []
          if (data.keys === "0") {
            this.form.realSaleAmountRangeStart = 0;
            this.form.realSaleAmountRangeEnd = 0;
            this.$set(this.select_filter_list, 'money', `销售额：${data.val}`)
            this.handleFilter();
            return
          }
          arr = data.keys.split(",");
          this.form.realSaleAmountRangeStart = Number(arr[0]) * 10000;
          this.form.realSaleAmountRangeEnd = Number(arr[1]) * 10000;
          this.$set(this.select_filter_list, 'money', `销售额：${data.val}`)
        } else {
          this.$delete(this.select_filter_list, 'money')
        }
        this.handleFilter();
      },
      // 筛选栏---清除选中的钱选项
      handleClearMoney() {
        this.form.realSaleAmountRangeStart = "";
        this.form.realSaleAmountRangeEnd = "";
        this.$delete(this.select_filter_list, 'money');
        this.handleFilter();
      },
      // 筛选栏---确定设置的范围值
      handleMoneyRange(data) {
        if (data.startMoney !== "" && data.endMoney !== "") {
          this.rangeMoneyName = `${data.startMoney}万-${data.endMoney}万`;
          this.form.realSaleAmountRangeStart = Number(data.startMoney) * 10000;
          this.form.realSaleAmountRangeEnd = Number(data.endMoney) * 10000;
          this.$set(this.select_filter_list, 'money', `销售额：${data.startMoney}万-${data.endMoney}万`)
        } else {
          this.$delete(this.select_filter_list, 'money')
        }
        this.handleFilter();
      },

      // 筛选栏---签单客户数
      selectHealSignHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.customerDataList.forEach(item => {
            val.forEach(val => {
              if (item.keys == val) {
                arr.push(item.name)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'realSignCustomerNums', `签单客户数：${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'realSignCustomerNums')
        }
        this.handleFilter();
      },

      // 筛选栏---新客户开发量
      realDevelopHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.customerDataList.forEach(item => {
            val.forEach(val => {
              if (item.keys == val) {
                arr.push(item.name)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'realDevelopCustomerNums', `新客户开发量：${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'realDevelopCustomerNums')
        }
        this.handleFilter();
      },

      //点击编辑弹窗
      editModalHandle(data) {
        this.editUserForm = data;
        this.implementVisible = true;
      },

      //确定修改
      setEditForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              appraisalId: this.editUserForm.appraisalId,
              appraisalYear: this.editUserForm.appraisalYear,
              indicators: [
                {
                  name: "",
                  appraisalType: this.editUserForm.appraisalType,
                  planSaleAmount: this.editUserForm.planSaleAmount,
                  planSignCustomerNum: this.editUserForm.planSignCustomerNum,
                }
              ],
              levelUsers: [
                {
                  levelId: "",
                  levelName: "",
                  userId: "",
                }
              ],
            };
            this.modalUserList.forEach(item => {
              if (item.userId == this.editUserForm.businessManagerId) {
                params.levelUsers[0].levelId = item.jobLevel;
                params.levelUsers[0].levelName = item.levelName;
                params.levelUsers[0].userId = item.userId;

                this.levelShortName.forEach(level => {
                  if (level.name == item.levelName) {
                    params.indicators[0].name = level.keys
                  }
                })
              }
            });

            if (this.activeNavBar === '1') {
              params.quarter = this.editUserForm.appraisalPeriod;
            } else {
              params.month = this.editUserForm.appraisalPeriod;
            }

            if (this.activeNavBar === '2') {
              params.indicators[0].planPerComplianceRate = this.editUserForm.planPerComplianceRate;

            } else {
              params.indicators[0].planDevelopCustomerNum = this.editUserForm.planDevelopCustomerNum
            }

            editPerformance(params).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.implementVisible = false;
                this.form.page = 0;
                this.getList();
              }
            })
          }
        })
      },

      //关闭弹窗
      cananlModal() {
        this.getList();
        this.implementVisible = false
      },

      //列表---点击加载更多
      loadMore() {
        this.form.page += 1
        if (this.listData.length < this.listTotal) {
          queryPerformance(this.form).then(res => {
            let list = res.data.data
            let newRes = []
            let R = [], F;
            for (F = 0; F < list.length;) R.push(list.slice(F, F += 5));
            R.forEach(item => {
              item.forEach((data, index) => {
                this.picBackgroundList.forEach((val, key) => {
                  if (index === key) {
                    data.bgColor = val;
                  }
                })
              })
            });
            R.forEach(item => {
              item.forEach(item => {
                newRes.push(item);
              })
            });
            this.listData = this.listData.concat(newRes)
          })
        }
      },

      //列表---为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop() {
        const that = this // 缓存当前this
        const scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scroll_top
        if (that.scrollTop > 0) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },

      //列表---回到顶部
      backTop() {
        const that = this
        const timer = setInterval(() => {
          const ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop =
            that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      //筛选栏-删除一个
      deleteOneClick(item) {
        this.list = [];
        this.$delete(this.select_filter_list, item);
        if (Array.isArray(this.form[item])) {
          this.form[item] = []
          this.getPersonList('业务员,业务主管')
        } else {
          if (item === 'appraisalResult') {
            this.form.appraisalResult = "";
          } else if (item === 'appraisalYear') {
            this.year = "";
            this.form.appraisalYear = "";
          } else if (item === 'appraisalPeriod') {
            this.form.appraisalPeriod = "";
          } else if (item === 'money') {
            this.$refs.saleAmount.clearMoney();
          } else if (item === 'deptIds') {
            this.getPersonList('业务员,业务主管')
          }
        }
        this.handleFilter();
      },

      //筛选栏-删除所有
      deleteAllClick() {
        let userTypes = this.form.userTypes;
        this.listData = []
        this.getPersonList('业务员,业务主管')
        this.select_filter_list = {}
        this.form = {
          page: 0,
          pageSize: 10,
          appraisalResult: "",
          appraisalYear: "",
          appraisalPeriod: "",
          realSaleAmountRangeStart: "",
          realSaleAmountRangeEnd: "",
          realSignCustomerNums: [],
          realDevelopCustomerNums: [],
          userTypes: userTypes
        };
        this.$refs.saleAmount.clearMoney();
        this.year = "";
        this.handleFilter()
      },


      //列表---全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          let _this = this
          this.listData.forEach((item, index) => {
            if (_this.check_biz_ids.indexOf(item.appraisalId) === -1) {
              _this.check_biz_ids.push(item.appraisalId)
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

      //列表-删除
      delPerformanceItem() {
        if (this.check_biz_ids.length === 0) {
          this.$message({
            message: '请勾选要删除的行！',
            type: 'warning'
          });
        } else {
          batchDeletePerformance(this.check_biz_ids).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              });
              this.form.page = 0;
              this.getList();
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
        }
      },

      //导出
      handleExport(){
        this.form.pageSize = this.listTotal;
        this.form.page = 0;
        this.form.exportUserIds = this.check_biz_ids;
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportPerformance(this.form).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              this.form.exportUserIds = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-绩效列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close();
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .sales-plan-box {
    margin: auto 5%;

    .search-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      padding: 20px 16px;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      border-radius: 4px;

      /deeep/ .el-button + .el-button {
        margin: 0;
      }

      .btn {
        height: 48px;
        border: 0;
        width: 120px;
        color: #fff;
        border-radius: 0;
        background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

        &:active {
          opacity: .5;
        }
      }

      .import-btn {
        margin-left: 20px;
        background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
      }

      .search {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 20px;
        width: 50%;

        .search-input {
          /deep/ .el-input__inner {
            height: 48px;
            border-radius: 0;
            border: 1px solid #05AAFF;
            border-right: 0;
          }
        }
      }

      .down-load-modal {
        color: #5883FF;
        font-size: 14px;
        margin-left: 14px;
        cursor: pointer;
        white-space: nowrap;

        .icon-down-load {
          vertical-align: middle;
        }
      }
    }

    .screen-bar {
      background: #fff;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

      .screen-title {
        display: flex;
        padding: 14px 16px;

        .name {
          color: #042B40;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          white-space: nowrap;
          margin-right: 10px;
          display: flex;
          align-items: center;

          .line {
            width: 3px;
            height: 14px;
            background: rgba(5, 170, 255, 1);
            display: inline-block;
            margin-right: 8px;
            margin-top: 4px;
          }

          .text {
            margin-top: 2px;
          }
        }

        .selected-list {
          width: 90%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 4px;

          .item {
            padding: 4px 6px;
            font-size: 12px;
            border: 1px solid #05AAFF;
            color: #05AAFF;
            margin-right: 13px;
            display: flex;
            align-items: center;

            .text {
              margin-top: 2px;
              margin-right: 6px;
            }

            img {
              cursor: pointer;
            }

            &.clear {
              padding: 5px 15px;
              cursor: pointer;
              color: #F56C6C;
              border: 1px solid #F56C6C;
            }
          }
        }

        .screen-btn {
          margin-top: 3px;

          .btn {
            cursor: pointer;
            white-space: nowrap;

            img {
              vertical-align: middle;
            }

            .text {
              margin-top: 1px;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
      }

      .screen-list {
        padding: 16px 16px 3px 25px;
        border-top: 1px solid rgba(219, 233, 255, 1);

        .form-item {
          display: flex;
          align-items: center;
          margin-bottom: 17px;

          .label-text {
            width: 100px;
            font-size: 14px;
            color: rgba(4, 43, 64, 1);
            white-space: nowrap;
            text-align: right;
            font-weight: 600;
            margin-right: 12px;
          }

          .form-handle {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .select-input {
              margin-right: 10px;

              /*/deep/ .el-input__inner {*/
              /*  height: 36px !important;*/
              /*}*/

              /deep/ .el-input__icon {
                line-height: 30px;
              }
            }
          }

          .date-select {
            margin-right: 10px;
            width: 200px;

            /deep/ .el-input__inner {
              width: 200px;
              height: 36px;
            }

            /deep/ .el-input__icon {
              line-height: 39px;
            }
          }
        }
      }
    }

    .list {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);
      margin-top: 16px;

      .list-nav-bar {
        display: flex;
        align-items: center;
        background: #E4F4FC;

        .nav-item {
          font-size: 14px;
          color: #444444;
          padding: 10px 16px;
          cursor: pointer;

          &.cur {
            color: #05AAFF;
            background: #fff;
          }
        }
      }

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

        .right {
          .select-sort {
            font-size: 16px;

            /deep/ .el-input__inner {
              border: 0;
              text-align: right;
            }

            /deep/ .el-popper[x-placement^=bottom] .popper__arrow {
              right: 35px;
              left: initial;
            }
          }
        }
      }

      .list-detail {
        .item {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          padding-bottom: 8px;
          position: relative;
          border-bottom: 1px solid #ddd;

          &:last-child {
            border-bottom: 0;
          }

          .item-detail {
            width: 100%;
            display: flex;
            align-items: flex-start;

            .pic {
              display: flex;
              align-items: center;
              margin-right: 20px;

              .check-box {
                width: 18px;
                height: 18px;
                cursor: pointer;
              }

              .img-box {
                width: 84px;
                height: 84px;
                border-radius: 4px;
                margin-left: 15px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }

            .detail {
              width: 100%;
              padding-top: 6px;
              position: relative;

              .text {
                margin-right: 18px;
              }

              .title {
                font-size: 18px;
                color: rgba(68, 68, 68, 1);
                font-weight: bold;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                cursor: pointer;
              }

              .user-conent {
                .item {
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  font-size: 14px;
                  justify-content: flex-start;
                  border-bottom: 0;
                  background: #FFEEEE;
                  padding: 11px 14px;
                  padding-bottom: 0;

                  .cate {
                    color: rgba(68, 68, 68, 0.75);
                    margin-bottom: 12px;
                    z-index: 2;

                    span {
                      color: rgba(68, 68, 68, 1);
                    }

                    .blue {
                      color: rgba(5, 170, 255, 1);
                      cursor: pointer;
                    }
                  }

                  &.pass {
                    background: #effaff;
                  }
                }
              }
            }
          }

          .bage {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
            opacity: 0.6;
          }

          .handle-btn-group {
            width: 98px;
            min-width: 98px;
            display: flex;
            align-items: center;
            justify-content: center;

            .btn-img {
              margin: 8px;
              cursor: pointer;
              width: 70px;
              height: 30px;

              &.read-img {
                background: url("../../icons/enterprise/read_icon.png") no-repeat;

                &:hover {
                  background: url("../../icons/enterprise/_read_icon.png") no-repeat;
                }
              }

              &.edit-img {
                background: url("../../icons/enterprise/edit_icon.png") no-repeat;

                &:hover {
                  background: url("../../icons/enterprise/_edit_icon.png") no-repeat;
                }
              }
            }
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
        white-space: nowrap;
        font-weight: normal;
        color: rgba(68, 68, 68, 0.75);
      }

      /deep/ .el-form-item__content {
        width: 73%;
        display: flex;
      }

      .week {
        /deep/ .el-input__inner {
          width: 220px;
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

  /deep/ .select-sort-option {
    z-index: 98 !important;

    /deep/ .popper__arrow {
      right: 40px !important;
      left: auto !important;
    }
  }

  .select-box{
    height: 32px !important;
  }
</style>
