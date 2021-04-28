<template>
  <div class="app-container">
    <el-card class="box-card box-margin" style="margin-bottom: 20px;">
      <div class="searchCont">
        <div class="searchLeft">
          <el-input size="small" placeholder="企业名称/社会信用代码" v-model="listQuery.companyName" @keyup.enter.native="goSearch"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search" @click="goSearch">搜索</el-button>
        </div>
        <div class="searchRig">
          <el-button type="primary" size="small" @click="checkSelect">查看已选择</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <div class="chooseCompany">
          <!--          <el-select size="small" filterable multiple v-model="listQuery.signCompanyIds" placeholder="签约公司" clearable @change="signCompanyChange">-->
          <!--            <el-option-->
          <!--              v-for="item in companyList"-->
          <!--              :key="item.companyId"-->
          <!--              :label="item.companyName"-->
          <!--              :value="item.companyId">-->
          <!--            </el-option>-->
          <!--          </el-select>-->
          <el-select size="small" filterable v-model="listQuery.deptIds" placeholder="选择部门" clearable multiple @change="deptmentChange">
            <el-option
              v-for="item in deptmentList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
          <el-select v-if="salePersonList.length != 0" filterable size="small" multiple v-model="listQuery.userIds" placeholder="选择人员" clearable @change="userChange">
            <el-option
              v-for="item in salePersonList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId">
            </el-option>
          </el-select>
          <el-select @change='handleFilterInvolved' multiple clearable size="small"
                     v-model="listQuery.businessIds"
                     placeholder="所属行业">
            <el-option v-for="item in industry_involved_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-date-picker @change='handleFilterEntYear' size="small" clearable v-model="listQuery.setUpTheYear" type="year" value-format="yyyy" placeholder="成立年份"></el-date-picker>
        </div>
        <div class="chooseCompany">
          <!--          <el-select multiple @change='handleFilterProjectType' clearable size="small"-->
          <!--                 v-model="listQuery.projectTypes" placeholder="项目分类">-->
          <!--            <el-option v-for="item in type_list" :key="item.dictId" :value="item.dictId"-->
          <!--                       :label="item.dictName"></el-option>-->
          <!--          </el-select>-->
          <el-select filterable multiple remote :remote-method="projectListMethod" v-loadMore="loadMore" :loading="loading" size="small" v-model="listQuery.projectIds" placeholder="项目名称" clearable @change="projectChange">
            <el-option
              v-for="item in projectList"
              :key="item.projectId"
              :label="item.projectName"
              :value="item.projectId">
            </el-option>
          </el-select>
          <el-select filterable multiple size="small" v-model="listQuery.projectLevels" placeholder="项目级别" clearable @change="projectLevelChange">
            <el-option
              v-for="item in projectLevelList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--          <el-select size="small" multiple v-model="listQuery.applyBatchNos" placeholder="批次" clearable @change="bathChange">-->
<!--            <el-option-->
<!--              v-for="item in batchNoList"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
          <el-date-picker @change='handleFilterYear' size="small" clearable v-model="listQuery.projectYear" type="year" value-format="yyyy" placeholder="项目年度"></el-date-picker>
        </div>
        <div class="chooseCompany">
          <el-input size="small" placeholder="社保人数" v-model="listQuery.socialSecurityNum" @change="userChange"></el-input>
          <el-input size="small" @change="userChange" oninput="value=value.replace(/[^0-9]/g,'')" v-model="listQuery.patentNum" clearable class="inline-block input-150 float-left screen-input" placeholder="专利数量"/>
          <el-input size="small" @change="userChange" oninput="value=value.replace(/[^0-9]/g,'')" v-model="listQuery.trademarkNum" clearable class="inline-block input-150 float-left screen-input" placeholder="商标数量"/>
          <el-input size="small" @change="userChange" oninput="value=value.replace(/[^0-9]/g,'')" v-model="listQuery.copyrightNum" clearable class="inline-block input-150 float-left screen-input" placeholder="软著数量"/>
          <el-select @change='handleFilterYearSales'
                     clearable size="small"
                     class="inline-block input-150 float-left"
                     v-model="listQuery.year_sales"
                     placeholder="年销售额范围"
          >
            <el-option v-for="item in enterprise_annual_sales_list" :key="item.value" :label="item.value"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="chooseCompany">
          <el-select @change='handleFilterTechType' size="small" multiple
                     clearable v-model="listQuery.companyTag" placeholder="企业标签">
            <el-option v-for="item in technologyTypeList" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='handleFilterIsNewOrNot' size="small" class="inline-block input-150 float-left"
                     clearable v-model="listQuery.newOrOld" placeholder="新老客户">
            <el-option v-for="item in is_new_or_not_list" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <el-select @change='handleFilterCustomerClassification' size="small" clearable
                     v-model="listQuery.companyLevel" placeholder="客户级别">
            <el-option v-for="item in customer_classification_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>

          <el-select @change='handleFilterSignCustomer' size="small" class="inline-block input-150 float-left"
                     filterable clearable
                     v-model="listQuery.isSigning" placeholder="是否签单">
            <el-option v-for="item in sign_customer_list" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <!--          <el-select @change="isChannelChange" size="small" v-model="listQuery.companyPosition" placeholder="是否渠道单"-->
          <!--                     clearable>-->
          <!--            <el-option-->
          <!--              label="不是"-->
          <!--              :value="0">-->
          <!--            </el-option>-->
          <!--            <el-option-->
          <!--              label="是"-->
          <!--              :value="4">-->
          <!--            </el-option>-->
          <!--          </el-select>-->
        </div>
        <div class="chooseCompany">
          <el-select @change='changeProvince' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.provinceId" placeholder="省份">
            <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='changeCity' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.cityId" placeholder="城市">
            <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='changeDistrict' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.districtId" placeholder="县区">
            <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='getTownsId' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.townId" placeholder="镇街">
            <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <el-button style="margin-bottom: 10px;float: right" type="primary" size="small" @click="createFreeOrder">确定</el-button>
        <el-button style="margin-bottom: 10px;float: right;margin-right: 10px;" size="small" @click="cancel">取消</el-button>
        <el-table :data="enterprise_list" border fit highlight-current-row ref="enterpriseTable" @select="onTableSelect" @select-all="allSelectTable" row-key="crmCompanyId" :reserve-selection="true">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" min-width="160px" label="企业名称">
            <template slot-scope="scope">
              <span>{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="成立时间">
            <template slot-scope="scope">
              <span>{{scope.row.setupDate}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主营产品">
            <template slot-scope="scope">
              <span>{{scope.row.mainProducts}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="所在地区">
            <template slot-scope="scope">
              <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.districtName}}{{scope.row.townName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="业务人员">
            <template slot-scope="scope">
              <span>{{scope.row.traceSalesManName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="联系电话">
            <template slot-scope="scope">
              <span>{{scope.row.phoneNumber}}</span>
            </template>
          </el-table-column>
<!--          <el-table-column align="center" label="操作" class-name="small-padding fixed-width">-->
<!--            <template slot-scope="scope">-->
<!--              <span class="spanButton" v-if="!scope.row.selected" @click="chooseCompany(scope.row,0)">选择</span>-->
<!--              <span style="cursor: pointer" v-else @click="chooseCompany(scope.row,1)">取消</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
        <div class="noMore" @click="pageDown" v-if="companyTotal - enterprise_list.length > 0">
          点击加载更多
        </div>
        <div class="noMore" v-else>没有更多数据了</div>
      </div>
    </el-card>

    <el-dialog
      title="查看已选"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div style="max-height: 400px;overflow: auto">
        <el-table :data="chooseCompanyList" border fit highlight-current-row ref="userTable">
          <el-table-column label="序号" align="center" type="index" width="60"></el-table-column>
          <el-table-column align="center" min-width="160px" label="企业名称">
            <template slot-scope="scope">
              <span>{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="成立时间">
            <template slot-scope="scope">
              <span>{{scope.row.setupDate}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="主营产品">
            <template slot-scope="scope">
              <span>{{scope.row.mainProducts}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="所在地区">
            <template slot-scope="scope">
              <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.districtName}}{{scope.row.townName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="业务人员">
            <template slot-scope="scope">
              <span>{{scope.row.traceSalesManName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span class="spanButton" style="color:#ff464d" @click="deleteChoiced(scope.row,scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="短信群发" :visible.sync="createVisible" width="50%" :before-close="createClose" v-dialogDrag>
      <el-form :model="createForm" ref="createForm" :rules="createRule">
        <el-divider content-position="center"><span style="color: red;">*所有信息（除关联项目外）都是必填项</span></el-divider>
        <el-row>
          <el-col>
            <el-form-item label="选择模板" label-width="120px">
              <el-select v-model="createForm.tempCode" filterable placeholder="请选择模板" size="small" clearable @change="templateChange">
                <el-option v-for="item in messageTemplateList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联项目" label-width="120px">
              <el-select multiple filterable v-model="createForm.projectIds" :remote-method="projectListMethod" remote v-loadMore="dialogLoadMore" :loading="loading" size="small" placeholder="请选择关联项目">
                <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="重复发送" label-width="120px">
              <el-radio-group v-model="createForm.canRepeat">
                <el-radio label="1" border>同项目已接收短信企业不再发送</el-radio>
                <el-radio label="2" border>同项目半年前接收的企业可发送</el-radio>
                <el-radio label="3" border>同项目一年前接收的企业可发送{{selectTemplate.isQM}}</el-radio>
                <el-radio label="4" border>同项目两年前接收的企业可发送</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="选择签名" label-width="120px" v-if="selectTemplate.isQM">
              <el-select v-model="createForm.smsSignName" filterable placeholder="选择签名" size="small">
                <el-option v-for="item in signNameList" :key="item.dictId" :label="item.dictName" :value="item.dictName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否定时发送" label-width="120px">
              <el-radio-group v-model="createForm.isTiming">
                <el-radio label="1" border>立即发送</el-radio>
                <el-radio label="2" border v-if="selectTemplate.isQM">定时发送</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="定时发送时间" label-width="120px" v-if="createForm.isTiming == 2 && selectTemplate.isQM">
              <el-date-picker v-model="createForm.sendTime" type="datetime" value-format="yyyy-MM-dd HH:mm:00" placeholder="选择定时发送时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="item.value" label-width="120px" v-for="item in selectTemplate.smsMsgParams" :key="item.label">
              <el-date-picker
                v-if="item.label == 'endTime'"
                v-model="createForm[item.label]"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              <el-input maxlength="100" size="small" v-if="!item.chooseArr && item.label != 'endTime'" v-model="createForm[item.label]" :placeholder="'请输入' + item.value">
                <template slot="append" v-if="item.label == 'price'">万元</template>
              </el-input>
              <el-radio-group v-if="item.chooseArr" v-model="createForm[item.label]" size="small">
                <el-radio v-for="list in item.chooseArr" :label="list" :key="list">{{list}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <div style="display: flex" v-if="selectTemplate != ''">
              <span>短信效果：</span>
              <p style="flex: 1">{{selectTemplate.smsMsgEffect}}</p>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createClose">取 消</el-button>
        <el-button type="primary" @click="saveCreateOrder('createForm')">确 定</el-button>
      </div>
    </el-dialog>

    <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;bottom: 100px;">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../../icons/enterprise/back_top.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
  import { queryCrmCompanyInfo, queryUserComboInfo } from '@/api/customerCenter'
  import {selectCompany,queryCompany} from '@/api/contractManage'
  import {getDepartmentTree} from '@/api/department.js'
  import {
    commonDict,
    commonDictOfRegion,
    queryUserInfoRole
  } from '@/api/utils'
  import {queryAll} from '@/api/projectManage'
  import {saveFreeOrderOfProject} from '@/api/orderManage'
  import {queryMsgSmsTemplateList,addMsgSmsSend,queryCompanyCanSend} from '@/api/messageCenter'

  export default {
    data(){
      return{
        enterprise_list:[],
        sign_company_list:[],
        companyTotal:0,
        companyPage: 0,
        companyPageSize:20,
        createForm: {
          projectIds: []
        },
        createVisible: false,
        createRule: {
          crmCompanyIdList: [
            {required: true, message: '请选择企业', trigger: 'blur'}
          ],
          signUserId: [
            {required: true, message: '请选择签订人', trigger: 'blur'}
          ],
          signDate: [
            {required: true, message: '请选择签订日期', trigger: 'blur'}
          ],
          signCompanyId: [
            {required: true, message: '请选择签订公司', trigger: 'blur'}
          ],
        },
        listQuery: {
          page: 0,
          pageSize: 20,
          isPrivate: 1,
          companyPosition: []
        },
        salePersonList:[],
        projectForm:{
          page:0,
          pageSize:20,
          orderField:'sales',
          orderType: 'DESC'
        },
        projectList:[],
        loading:false,
        projectLevelList: [
          {label: '国家级', value: 1},
          {label: '省级', value: 2},
          {label: '市级', value: 3},
          {label: '区县级', value: 4},
          {label: '镇街级', value: 5}
        ],
        batchNoList:[
          { 'label': '未指定', 'value': 0 },
          { 'label': '第1批', 'value': 1 },
          { 'label': '第2批', 'value': 2 },
          { 'label': '第3批', 'value': 3 },
          { 'label': '第4批', 'value': 4 },
          { 'label': '第5批', 'value': 5 },
          { 'label': '第6批', 'value': 6 },
          { 'label': '第7批', 'value': 7 },
          { 'label': '第8批', 'value': 8 },
          { 'label': '第9批', 'value': 9 },
          { 'label': '第10批', 'value': 10 },
        ],
        enterprise_annual_sales_list: [
          {value: '1000万以下', min: 0, max: 10000000},
          {value: '1000万-2000万', min: 10000000, max: 20000000},
          {value: '2000万-5000万', min: 20000000, max: 50000000},
          {value: '5000万-2亿', min: 50000000, max: 200000000},
          {value: '2亿以上', min: 200000000, max: 10000000000}
        ],
        is_new_or_not_list: [{'label': '老客户', 'value': 1}, {'label': '新客户', 'value': 0}], // 新老客户
        sign_customer_list: [{'label': '签单客户', 'value': 1}, {'label': '潜在客户', 'value': 0}], // 是否签单
        level:3,
        parentId:0,
        province_list:[],
        city_list:[],
        district_list:[],
        town_list:[],
        chooseCompanyList:[],
        storgCompanyList:[],
        dialogVisible:false,
        btnFlag: 0,
        messageTemplateList:[],
        selectTemplate: '',
        signNameList:[],

        allowGetRoleUserList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:ROLE:USER:LIST'),//获取指定角色用户列表
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
    activated() {
      this.createForm = {}
      this.getCompanyData();
      this.getCompanyList();
      this.getCompanyDeptList();
      this.getCommonData();
      this.getProjectList();
      this.getRegionList();
      this.getSignerData();
      this.getSignName()
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods:{
      // 回到顶部
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

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
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
      projectChange() {
        this.getCompanyData()
      },
      // 获取短信签名信息
      getSignName() {
        var signParams = {
          keyList: 'SMS_SIGN',
          companyId: '697480101377343488',
        };
        commonDict(signParams).then(res => {
          if (res.code === 200) {
            this.signNameList = res.data['SMS_SIGN'];
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取企业
      getCompanyData() {
        queryCrmCompanyInfo(this.listQuery).then(response => {
          if (response.code == 200) {
            if (this.listQuery.page > 0) {
              this.enterprise_list = this.enterprise_list.concat(response.data.data);
              this.companyTotal = response.data.total;
            } else {
              this.enterprise_list = response.data.data;
              this.companyTotal = response.data.total;
            }

            this.enterprise_list.forEach(list=>{
              this.$set(list, 'selected', false)
              this.storgCompanyList.forEach(item=>{
                if(item.crmCompanyId == list.crmCompanyId){
                  this.$set(list, 'selected', true)
                  setTimeout(()=>{
                    this.$refs.enterpriseTable.toggleRowSelection(list)
                  },100)
                }
              })
            })
          } else {
            this.$message.warning(response.message)
          }
        })

        // this.storgCompanyList = [];
        this.enterprise_list.forEach(item=>{
          this.storgCompanyList.forEach(list=>{
            if(item.crmCompanyId == list.crmCompanyId){
              this.$set(item,'selected',true)
            }
          })
          // this.$set(item,'selected',false)
        })
      },

      // 分页
      pageDown(){
        this.listQuery.page = this.listQuery.page + 20
        this.getCompanyData()
      },

      // 开始搜索
      goSearch() {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      //获取签约公司
      getCompanyList() {
        queryCompany().then(res=>{
          if(res.code == 200){
            this.sign_company_list = res.data
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      // 获取左侧公司部门列表
      getCompanyDeptList() {
        getDepartmentTree({}).then(res => {
          if (res.code == 200) {
            this.deptmentList = res.data.deptInfoTreeVos;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name,deptIds) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if(deptIds != undefined){
          formData.append('deptIdList',deptIds)
        }
        if(this.allowGetRoleUserList.twoAllow){
          queryUserComboInfo(formData).then(res => {
            if (res.code == 200) {
              this.personList = res.data;
              this.salePersonList = res.data;
            } else {
              this.$message.warning(res.message)
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取角色用户列表')
        }
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:CUSTOMER_LEVEL,DICT:INDUSTRY_INVOLVED,DICT:TECHNOLOGY_TYPE,',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.customer_classification_list = res.data['DICT:CUSTOMER_LEVEL'];
            this.industry_involved_list = res.data['DICT:INDUSTRY_INVOLVED'];
            this.technologyTypeList = res.data['DICT:TECHNOLOGY_TYPE'];
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取签订人
      getSignerData() {
        let formData = new FormData;
        formData.append('roleName','业务员')
        queryUserInfoRole(formData).then(res => {
          if (res.code == 200) {
            this.user_list = res.data.data;
          }
        })
      },

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
      //远程搜索
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
      // 新增短信时项目下拉框
      dialogLoadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      //获取地区信息
      getRegionList() {
        if (this.level == undefined || this.level == null) {
          this.level = 3
        }

        if (this.parentId == undefined || this.parentId == '') {
          this.level = 3
          this.parentId = 0
        }

        let params = {
          level: this.level,
          parentId: this.parentId
        }

        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (this.level == 3) {
              this.province_list = res.data
            }
            if (this.level == 2) {
              this.city_list = res.data
            }
            if (this.level == 1) {
              this.district_list = res.data
            }
            if (this.level == 0) {
              this.town_list = res.data
            }

          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //获取短信模板列表
      getMessageTemplate(){
        queryMsgSmsTemplateList().then(res=>{
          if(res.code == 200){
            this.messageTemplateList = res.data
          }
        })
      },

      // 选择部门
      deptmentChange(val){
        this.getPersonList('业务员,业务主管',val)
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择用户
      userChange(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择行业
      handleFilterInvolved(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择年销售额范围
      handleFilterYearSales(val){
        if(val){
          this.enterprise_annual_sales_list.forEach(item => {
            if (val == item.value) {
              this.listQuery.companySalesStart = item.min;
              this.listQuery.companySalesEnd = item.max;
            }
          })
        } else {
          this.listQuery.companySalesStart = '';
          this.listQuery.companySalesEnd = '';
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择成立年份
      handleFilterEntYear(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择项目级别
      projectLevelChange(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择批次
      bathChange(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择项目年度
      handleFilterYear(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 项目标签
      handleFilterTechType(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 选择新老客户
      handleFilterIsNewOrNot(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 客户级别
      handleFilterCustomerClassification(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 是否签单
      handleFilterSignCustomer(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 省
      changeProvince(val) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.listQuery.cityId = '';
        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.parentId = val
        this.level = 2;
        this.getRegionList()
        this.getCompanyData()
      },
      // 市
      changeCity(val) {
        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 1;
        this.getRegionList()
        this.getCompanyData()
      },
      // 区县
      changeDistrict(val) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 0;
        this.getRegionList()
        this.getCompanyData()
      },
      // 镇
      getTownsId(val) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      //选择企业 0-选择 1-取消
      chooseCompany(row,num){
        queryCompanyCanSend({companyId:row.crmCompanyId}).then(res=>{
          if(res.code == 200){
            if(res.data == true){
              if(num == 0){
                this.$set(row,'selected',true)
                this.storgCompanyList.push(row)
              }else{
                this.$set(row,'selected',false)
                this.storgCompanyList.forEach((item,index)=>{
                  if(item.crmCompanyId == row.crmCompanyId){
                    this.storgCompanyList.splice(index,1)
                  }
                })
              }
            }else{
              this.$message.warning('抱歉，该企业没有接收短信号码，无法发送信息')
            }
          }
        })
      },

      // 表格选择
      onTableSelect(selection,row){
        queryCompanyCanSend({companyId:row.crmCompanyId}).then(res=>{
          if(res.code == 200){
            if(res.data == true){
              if(row.selected === true){
                this.storgCompanyList.forEach((item,index)=>{
                  if(item.crmCompanyId == row.crmCompanyId){
                    this.$set(row,'selected', false)
                    this.storgCompanyList.splice(index,1)
                  }
                })
              }else{
                this.storgCompanyList.push(row)
                this.$set(row,'selected', true)
              }
            }else{
              this.$refs.enterpriseTable.toggleRowSelection(row, false)
              this.$message.warning('抱歉，该企业没有接收短信号码，无法发送信息')
            }
          }
        })
      },

      //全选
      allSelectTable(selection){
        if(selection.length != 0){
          selection.forEach(item=>{
            this.$set(item,'selected', true)
          })

          this.storgCompanyList = selection
        }else{
          this.storgCompanyList = selection;
          this.enterprise_list.forEach(list=>{
            this.$set(list,'selected', false)
          })
        }
      },

      //查看已选择
      checkSelect(){
        if(this.storgCompanyList.length <= 0){
          this.$message.warning('请先选择企业！');
          return;
        }
        this.dialogVisible = true;
        this.chooseCompanyList = JSON.parse(JSON.stringify(this.storgCompanyList))
      },

      // 关闭弹窗
      handleClose(){
        this.dialogVisible = false;
        this.chooseCompanyList = [];
      },

      // 打开创建免费订单弹窗
      createFreeOrder(){
        if(this.storgCompanyList.length <= 0){
          this.$message.warning('请先选择企业！');
          return;
        }
        this.$set(this.createForm,'canRepeat', "1")
        this.$set(this.createForm,'isTiming', "1")
        this.createVisible = true;
        this.getMessageTemplate();
      },

      // 关闭页面
      cancel(){
        this.listQuery = {
          page: 0,
          pageSize: 20,
          companyPosition: []
        }
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route);
      },

      // 选择模板
      templateChange(val){
        this.selectTemplate = '';
        this.createForm = {
          projectIds: [],
          tempCode: val
        }
        this.messageTemplateList.forEach(item=>{
          if(item.dictCode == val){
            this.selectTemplate = item;
            if (item.parentId == "1290212160117944322") {
              this.$set(this.selectTemplate, 'isQM', true)
            } else {
              this.$set(this.selectTemplate, 'isQM', false)
            }
          }
        })
      },

      // 发送信息
      saveCreateOrder(formName) {
        if (this.createForm.canRepeat != 1 && (!this.createForm.projectIds || this.createForm.projectIds.length < 1)) {
          this.$message.warning("当同项目已接收短信企业可再发送短信时，关联项目必选")
          return;
        }
        if(this.storgCompanyList.length <= 0){
          this.$message.warning('请先选择企业！');
          return;
        }
        if(this.createForm.tempCode == '' || this.createForm.tempCode == undefined){
          this.$message.warning('请先选择模板');
          return;
        }
        if (this.selectTemplate.isMQ) {
          if(this.createForm.smsSignName == '' || this.createForm.smsSignName == undefined){
            this.$message.warning('请先选择短信签名');
            return;
          }

          if (this.createForm.isTiming == 2) {
            this.createForm.tempCode = this.createForm.tempCode
            if (!this.createForm.sendTime) {
              this.$message.warning('请先定时发送时间');
              return;
            }
            if (new Date(this.createForm.sendTime) < new Date()) {
              this.$message.warning('定时发送时间必须大于当前时间');
              return;
            }

            let dateArray = this.createForm.sendTime.toString().split(' ')

            if (new Date(this.createForm.sendTime) < new Date(dateArray[0] + " 09:00:00") || ( new Date(this.createForm.sendTime) > new Date(dateArray[0] + " 12:30:00") && new Date(this.createForm.sendTime) < new Date(dateArray[0] + " 14:00:00")) || new Date(this.createForm.sendTime) > new Date(dateArray[0] + " 22:00:00")) {
              this.$message.warning('定时发送时间请设置在上午9点至12点半，下午两点晚上10点之间');
              return;
            }
          }
        } else {
          this.createForm.isTiming = 1
        }

        this.createForm.smsMsgParams = [];
        var str = {};
        this.selectTemplate.smsMsgParams.forEach(list=>{
          if(list.label == 'name'){
            if(this.createForm.name == '' || this.createForm.name == undefined){
              this.$message.warning('请选择称呼方式');
              throw new Error()
            }
          }
          if(list.label == 'projectName'){
            if(this.createForm.projectName == '' || this.createForm.projectName == undefined){
              this.$message.warning('请输入项目名称');
              throw new Error()
            }
          }
          if(list.label == 'phone'){
            const telephone_number = /^1[3456789]\d{9}$/
            if (!telephone_number.test(this.createForm.phone)) {
              this.$message.warning('电话号码为空或格式错误');
              throw new Error()
            }
          }
          if(list.label == 'price'){
            var patrn = /^(-)?\d+(\.\d+)?$/;
            if (patrn.exec(this.createForm.price) == null || this.createForm.price == '' || this.createForm.price == undefined) {
              this.$message.warning('金额为空或输入非数字');
              throw new Error()
            }
          }
          if(list.label == 'userName'){
            if(this.createForm.userName == '' || this.createForm.userName == undefined){
              this.$message.warning('请输入项目工程师');
              throw new Error()
            }
          }
          if(list.label == 'endTime'){
            if(this.createForm.endTime == '' || this.createForm.endTime == undefined){
              this.$message.warning('请输入验收时间');
              throw new Error()
            }
            var regex = /[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}/;   //可按具体格式修改
            if( regex.test(this.createForm.endTime) ) {
              var noArr = this.createForm.endTime.split("-");
              if(noArr[1][0] == 0){
                noArr[1] = noArr[1].substr(1)
              }
              if(noArr[2][0] == 0){
                noArr[2] = noArr[1].substr(1)
              }
              var year = eval(noArr[0]);
              var month = eval(noArr[1]);
              var day = eval(noArr[2]);

              if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) {
                this.$message.warning('请保证输入的日期格式为yyyy-mm-dd或正确的日期!');
                throw new Error()
              }
              if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
                this.$message.warning('请保证输入的日期格式为yyyy-mm-dd或正确的日期!');
                throw new Error()
              }
              if (month == 2) {
                if ((year % 4 != 0) && day > 29) {
                  this.$message.warning('请保证输入的日期格式为yyyy-mm-dd或正确的日期!');
                  throw new Error()
                }
                if (year % 4 == 0) {
                  if (year % 100 == 0 && year % 400 != 0 && day > 29) {
                    this.$message.warning('请保证输入的日期格式为yyyy-mm-dd或正确的日期!');
                    throw new Error()
                  } else if (day > 28) {
                    this.$message.warning('请保证输入的日期格式为yyyy-mm-dd或正确的日期!');
                    throw new Error()
                  }
                }
              }
            }else{
              this.$message.warning('请保证输入的日期格式为yyyy-mm-dd或正确的日期!');
              throw new Error()
            }
          }
          for(var key in list) {
            for(var k in this.createForm){
              if(list[key] == k){
                str[list[key]] = this.createForm[k];
              }
            }
          }
          // this.createForm.smsMsgParams.push(str)
        })

        this.createForm.smsMsgParams = str

        this.createForm.toCompanyIds = [];
        this.createForm.personType = 3;
        this.createForm.smsType = 1;
        this.storgCompanyList.forEach(item=>{
          this.createForm.toCompanyIds.push(item.crmCompanyId)
        })

        addMsgSmsSend(this.createForm).then(response => {
          if (response.code == 200) {
            this.createVisible = false;
            this.createForm = {};
            this.selectTemplate = ''
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route);
            this.$message.success('操作成功')
          }
        })
      },

      //删除已选企业
      deleteChoiced(row,index){
        this.chooseCompanyList.splice(index,1);
        this.storgCompanyList = JSON.parse(JSON.stringify(this.chooseCompanyList))

        this.enterprise_list.forEach(item=>{
          if(item.crmCompanyId == row.crmCompanyId){
            this.$set(item, 'selected', false);
            this.$refs.enterpriseTable.toggleRowSelection(item, false)
          }
        })
      },

      //关闭弹窗
      createClose(){
        this.createForm = {};
        this.selectTemplate = ''
        this.createVisible = false;
      },
    }
  }
</script>

<style lang="less" scoped>
  .searchCont{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .searchLeft{
      display: flex;
    }
  }

  /deep/ .el-input{
    width:auto;
    margin-right: 10px;
  }

  // 修改列表页面表格样式
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

  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  .col_red {
    color: #FF6B6B !important;
  }

  .col_red:hover {
    opacity: 0.5;
  }

  .col_skyblue {
    color: #05AAFF !important;
  }

  .col_skyblue:hover {
    opacity: 0.5;
  }

  .colUpDown {
    color: #FD903C !important;
  }

  .colUpDown:hover {
    opacity: 0.5;
  }

  .chooseCompany{
    display: flex;
    margin-bottom: 10px;
  }

  /deep/ .el-select{
    /*margin-right: 10px;*/
  }

  .noMore{
    text-align: center;
    font-size:14px;
    padding:10px 0;
    cursor: pointer;
  }

  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding: 20px;
    /deep/ .el-dialog__title {
      color: #fff;
      font-size: 16px;
    }

    /deep/ .el-dialog__headerbtn {
      border-radius: 50%;
      background: #fff;
      padding: 4px;
      font-size: 12px;
      font-weight: 400;

      /deep/ .el-dialog__close {
        color: #05AAFF;
      }
    }
  }

  /deep/ .el-dialog__body{
    padding: 10px 20px;
  }

  /deep/ .el-dialog__footer {
    text-align: center;

    /deep/ .el-button {
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }
</style>
