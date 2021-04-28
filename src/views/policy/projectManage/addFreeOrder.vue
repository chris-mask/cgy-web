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
          <el-select size="small" filterable v-model="listQuery.deptIds" placeholder="选择部门" clearable multiple @change="deptmentChange">
            <el-option
              v-for="item in deptmentList"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
          <!-- v-if="salePersonList.length != 0" -->
          <el-select  filterable size="small" multiple v-model="listQuery.userIds" placeholder="选择人员" clearable @change="userChange">
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
          <el-select @change='handleFilterEntYear' multiple clearable size="small"
                     v-model="listQuery.setUpTheYearList"
                     placeholder="成立年份">
            <el-option v-for="item in industry_yeart" :key="item.label" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="chooseCompany">
          <el-select filterable multiple remote :remote-method="projectListMethod" v-loadMore="loadMore"
                     :loading="loading" size="small" v-model="projectIds" placeholder="项目名称"
                     clearable @change="nowProjectChange">
            <el-option
              v-for="item in projectList"
              :key="item.projectId"
              :label="item.projectName"
              :value="item.projectId">
            </el-option>
          </el-select>
          <el-select filterable multiple size="small" v-model="projectLevels" placeholder="项目级别"
                     clearable @change="nowProjectLevelChange">
            <el-option
              v-for="item in projectLevelList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select @change='nowHandleFilterYear' multiple clearable size="small"
                     v-model="projectYears"
                     placeholder="项目年度">
            <el-option v-for="item in industry_yeart" :key="item.label" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <el-checkbox v-model="nowProject" @change="changeProjectBegin(1)">在报项目</el-checkbox>
          <el-checkbox v-model="alreadyProject" @change="changeProjectBegin(2)">已报项目</el-checkbox>
        </div>
        <div class="chooseCompany">
          <el-select @change='handleFilterTechType' size="small" multiple
                     clearable v-model="listQuery.technologyType" placeholder="科技类型">
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
        <div class="chooseCompany">
          <span>位置：</span>
          <el-checkbox-group v-model="listQuery.companyPosition" @change="handlePosition">
            <el-checkbox v-for="item in positionCheckList" :label="item.keys" :key="item.keys" :value="item.keys">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <el-button style="margin-bottom: 10px;float: right" type="primary" size="small" @click="createFreeOrder">确定</el-button>
        <el-button style="margin-bottom: 10px;float: right;margin-right: 10px;" size="small" @click="cancel">取消</el-button>
        <el-table :data="enterprise_list" border fit highlight-current-row ref="enterpriseTable" @select="onTableSelect" @select-all="allSelectTable" row-key="crmCompanyId" :reserve-selection="true">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" min-width="160px" label="企业名称">
            <template slot-scope="scope">
              <span @click="goCompanyName(scope.row.crmCompanyId)"   class="chooseCompanyId" >{{scope.row.companyName}}</span>
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
<!--          <el-table-column align="center" label="操作" class-name="small-padding fixed-width">-->
<!--            <template slot-scope="scope">-->
<!--              <span class="spanButton" v-if="!scope.row.selected" @click="chooseCompany(scope.row,0)">选择</span>-->
<!--              <span style="cursor: pointer" v-else @click="chooseCompany(scope.row,1)">取消</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
        <div v-if="enterprise_list.length != 0">
          <div class="noMore" @click="pageDown" v-if="companyTotal - enterprise_list.length > 0">
            点击加载更多
          </div>
          <div class="noMore" v-else>没有更多数据了</div>
        </div>
      </div>
    </el-card>

    <el-dialog
      title="查看已选"
      :visible.sync="dialogVisible"
      width="60%"
      v-dialogDrag
      :before-close="handleClose">
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
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="创建免费订单" :visible.sync="createVisible" width="800px" :before-close="createClose" v-dialogDrag>
      <el-form :model="createForm" ref="createForm" :rules="createRule">
        <!--        <el-divider content-position="center"><span style="color: red;">*如果不选签订人，则取对应企业默认的业务跟踪员</span></el-divider>-->
        <el-row>
          <el-col :span="20">
            <el-form-item label="项目名称：" label-width="120px">
              <span>{{createForm.projectName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="签订人：" label-width="120px" prop="signUserId">
              <el-select v-model="createForm.signUserId" filterable placeholder="请选择签订人" size="small" clearable>
                <el-option v-for="item in personList" :key="item.userId" :label="item.userName"
                           :value="item.userId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="签订日期：" label-width="120px" prop="signDate">
              <el-date-picker size="small" v-model="createForm.signDate" type="date" value-format="yyyy-MM-dd" clearable
                              placeholder="签订日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="签订公司：" label-width="120px" prop="signCompanyId">
              <el-select size="small" v-model="createForm.signCompanyId" placeholder="我方签约公司" clearable>
                <el-option v-for="item in sign_company_list" :key="item.companyId"
                           :label="item.companyName" :value="item.companyId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="年份：" label-width="120px" prop="applyYear">
              <el-date-picker size="small" clearable v-model="createForm.applyYear" type="year" value-format="yyyy" placeholder="年份"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="projectType != 822466810090618880">
            <el-form-item label="级别：" label-width="120px" prop="applyLevel">
              <el-select size="small" v-model="createForm.applyLevel" placeholder="级别" clearable>
                <el-option
                  v-for="item in projectLevelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-else>
            <el-form-item label="职称专业：" label-width="120px" prop="titleMajor">
              <el-input size="small" v-model="createForm.titleMajor" placeholder="职称专业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="批次：" label-width="120px" prop="applyBatchNo">
              <el-select size="small" v-model="createForm.applyBatchNo" placeholder="批次" clearable>
                <el-option
                  v-for="item in batchNoList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="projectType == 822466810090618880">
          <el-col :span="12">
            <el-form-item label="职称系列：" label-width="120px" prop="titleSeries">
              <el-select size="small" v-model="createForm.titleSeries" @change="getTitleLevel" placeholder="职称系列" clearable>
                <el-option
                  v-for="item in titleSeriesList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="职称级别：" label-width="120px" prop="titleLevel">
              <el-select size="small" v-model="createForm.titleLevel" placeholder="职称级别" clearable>
                <el-option
                  v-for="item in titleLevelList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数量：" label-width="120px" prop="applyNum">
              <el-input size="small" maxlength="8" oninput="value=value.replace(/[^0-9]/g,'');if(value > 9999){value = 9999}" v-model="createForm.applyNum" placeholder="数量"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="单价：" label-width="120px" prop="unitPrice">
              <span>{{createForm.unitPrice}}</span>
            </el-form-item>
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
  import {queryAll, queryProjectMaxBatch, queryTitleSeriesOrLevel, } from '@/api/projectManage'
  import {saveFreeOrderOfProject} from '@/api/orderManage'

  export default {
    name: 'addFreeOrder',
    data(){
      return{
        enterprise_list:[],
        sign_company_list:[],
        companyTotal:0,
        companyPage: 0,
        projectType: '',
        titleSeriesList: [],
        titleLevelList: [],
        companyPageSize:20,
        createForm: {
          unitPrice: 0
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
          applyYear: [
            {required: true, message: '请选择年份', trigger: 'blur'}
          ],
          applyLevel: [
            {required: this.projectType != 822466810090618880, message: '请选择级别', trigger: 'blur'}
          ],
          applyBatchNo: [
            {required: true, message: '请选择批次', trigger: 'blur'}
          ],
          applyNum: [
            {required: true, message: '请填写数量', trigger: 'blur'}
          ],
        },
        listQuery: {
          page: 0,
          pageSize: 20,
          companyPosition: [1],
        },
        nowProject: true,
        alreadyProject: false,
        projectIds:[],
        projectLevels:[],
        projectYears:[],
        salePersonList:[],
        personList:[],
        projectForm:{
          page:0,
          pageSize:20
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
        ],
        industry_yeart:[
          { 'label': '2021', 'value': '2021' },
          { 'label': '2020', 'value': '2020' },
          { 'label': '2019', 'value': '2019' },
          { 'label': '2018', 'value': '2018' },
          { 'label': '2017', 'value': '2017' },
          { 'label': '2016', 'value': '2016' },
          { 'label': '2015', 'value': '2015' },
          { 'label': '2014', 'value': '2014' },
          { 'label': '2013', 'value': '2013' },
          { 'label': '2012', 'value': '2012' },
          { 'label': '2011', 'value': '2011' },
          { 'label': '2010', 'value': '2010' },
          { 'label': '2009', 'value': '2009' },
          { 'label': '2008', 'value': '2008' },
          { 'label': '2007', 'value': '2007' },
          { 'label': '2006', 'value': '2006' },
          { 'label': '2005', 'value': '2005' },
          { 'label': '2004', 'value': '2004' },
          { 'label': '2003', 'value': '2003' },
          { 'label': '2002', 'value': '2002' },
          { 'label': '2001', 'value': '2001' },
          { 'label': '2000', 'value': '2000' },
          { 'label': '1999', 'value': '1999' },
          { 'label': '1998', 'value': '1998' },
          { 'label': '1997', 'value': '1997' },
          { 'label': '1996', 'value': '1996' },
          { 'label': '1995', 'value': '1995' },
          { 'label': '1994', 'value': '1994' },
          { 'label': '1993', 'value': '1993' },
          { 'label': '1992', 'value': '1992' },
          { 'label': '1991', 'value': '1991' },
          { 'label': '1990', 'value': '1990' },
          { 'label': '1989', 'value': '1989' },
          { 'label': '1988', 'value': '1988' },
          { 'label': '1987', 'value': '1987' },
          { 'label': '1986', 'value': '1986' },
          { 'label': '1985', 'value': '1985' },
          { 'label': '1984', 'value': '1984' },
          { 'label': '1983', 'value': '1983' },
          { 'label': '1982', 'value': '1982' },
          { 'label': '1981', 'value': '1981' },
          { 'label': '1980', 'value': '1980' },
          { 'label': '1979', 'value': '1979' },
          { 'label': '1978', 'value': '1978' },
          { 'label': '1977', 'value': '1977' },
          { 'label': '1976', 'value': '1976' },
          { 'label': '1975', 'value': '1975' },
          { 'label': '1974', 'value': '1974' },
          { 'label': '1973', 'value': '1973' },
          { 'label': '1972', 'value': '1972' },
          { 'label': '1971', 'value': '1971' },
          { 'label': '1970', 'value': '1970' },
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
        positionCheckList: [
          {keys: 1, name: '私海'},
          {keys: 2, name: '公海'},
          {keys: 3, name: '个人'},
          {keys: 4, name: '渠道'},
        ],
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
      if(this.$route.query.projectBox){
        this.projectBox = JSON.parse(this.$route.query.projectBox);
        this.projectType = this.projectBox.projectType
        if (this.projectType == 822466810090618880) {
          this.getTitleSeries()
        }
      }

      if(this.$route.query.projectId) {
        this.getProjectMaxBatch(this.$route.query.projectId)
      }


      this.getCompanyData();
      this.getCompanyList();
      this.getCompanyDeptList();
      this.getCommonData();
      this.getProjectList();
      this.getRegionList();
      this.getSignerData();

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
      //公司跳转
      goCompanyName(Id){
        this.$router.push({
          path: "/customer/editCustomer",
          query: {id:Id, check:false, tip:true }
        })
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

            this.enterprise_list.forEach(item=>{
              this.$set(item, 'selected', false)
              this.storgCompanyList.forEach(list=>{
                if(item.crmCompanyId == list.crmCompanyId){
                  this.$set(item,'selected',true)
                  setTimeout(()=>{
                    this.$refs.enterpriseTable.toggleRowSelection(item)
                  },100)
                }
              })
              // this.$set(item,'selected',false)
            })
          } else {
            this.$message.warning(response.message)
          }
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
              if(deptIds){
                this.salePersonList = res.data;
              }else{
                this.personList = res.data;
              }
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
          keyList: 'ENTERPRISE_REGISTRATION_STATUS,DICT:CUSTOMER_LEVEL,DICT:ANNUAL_SALES,DICT:STAFF_SIZE,DICT:INDUSTRY_INVOLVED,DICT:COMPANY_TYPE,DICT:TECHNOLOGY_TYPE,DICT:COMPANY_SCALE,DICT:JOB_PROFESSIONAL',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.customer_classification_list = res.data['DICT:CUSTOMER_LEVEL'];
            // this.enterprise_annual_sales_list = res.data['DICT:ANNUAL_SALES'];
            this.industry_involved_list = res.data['DICT:INDUSTRY_INVOLVED'];
            // this.companyTypeList = res.data['DICT:COMPANY_TYPE'];
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
        if (query !== '') {
          this.projectForm.page = 0
          this.projectForm.projectName = query
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.getProjectList(query)
          }, 200)
        }
      },
      //加载更多
      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      // alreadyProjectChange(){
      //   this.listQuery.page = 0
      //   this.listQuery.pageSize = 20
      //   this.getCompanyData()
      // },

      // 选择项目
      nowProjectChange(val){
        if(!this.nowProject && !this.alreadyProject){
          this.projectIds = [];
          this.$message.error('请勾选在报或者已报，否则无法搜索')
          return;
        }
        this.listQuery.alreadyReportProjectNames = [];
        this.listQuery.nowReportProjectIds = [];
        if (val.length != 0) {
          this.projectList.forEach(item => {
            val.forEach(val => {
              if (item.projectId == val) {
                if(this.nowProject == true){
                  this.listQuery.nowReportProjectIds.push(item.projectId)
                }
                if(this.alreadyProject == true){
                  this.listQuery.alreadyReportProjectNames.push(item.projectName)
                }
              }
            })
          })
          // this.$set(this.select_conditions_list, 'project_name', '项目名称 - ' + this.project_list.find(ele => ele.biz_id === val).project_name)
        } else {
          this.$delete(this.listQuery,'nowReportProjectIds')
          this.$delete(this.listQuery, 'alreadyReportProjectNames')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
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

      // 成立年份
      handleFilterEntYear(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // alreadyProjectLevelChange(){
      //   this.listQuery.page = 0
      //   this.listQuery.pageSize = 20
      //   this.getCompanyData()
      // },
      // 项目级别
      nowProjectLevelChange(val){
        if(!this.nowProject && !this.alreadyProject){
          this.projectLevels = [];
          this.$message.error('请勾选在报或者已报，否则无法搜索')
          return;
        }
        if (val.length != 0) {
          if(this.nowProject == true){
            this.listQuery.nowReportProjectLevelList = val
          }
          if(this.alreadyProject == true){
            this.listQuery.alreadyReportProjectLevelList = val
          }
        } else {
          this.$delete(this.listQuery,'nowReportProjectLevelList')
          this.$delete(this.listQuery, 'alreadyReportProjectLevelList')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      //批次
      bathChange(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 项目年度
      nowHandleFilterYear(val){
        if(!this.nowProject && !this.alreadyProject){
          this.projectYears = [];
          this.$message.error('请勾选在报或者已报，否则无法搜索')
          return;
        }
        if (val.length != 0) {
          if(this.nowProject == true){
            this.listQuery.nowReportProjectYearList = val
          }
          if(this.alreadyProject == true){
            this.listQuery.alreadyReportProjectYearList = val
          }
        } else {
          this.$delete(this.listQuery,'nowReportProjectYearList')
          this.$delete(this.listQuery, 'alreadyReportProjectYearList')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 在报已报
      changeProjectBegin(num){
        if(!this.nowProject && !this.alreadyProject){
          this.$message.error('请勾选其中一个，否则无法搜索')
          this.projectIds = [];
          this.projectLevels = [];
          this.projectYears = [];
          this.listQuery.nowReportProjectIds = [];
          this.listQuery.nowReportProjectLevelList = [];
          this.listQuery.nowReportProjectYearList = [];
          this.listQuery.alreadyReportProjectNames = [];
          this.listQuery.alreadyReportProjectLevelList = [];
          this.listQuery.alreadyReportProjectYearList = [];
          return;
        }

        if(this.projectIds == '' && this.projectLevels == '' && this.projectYears == ''){
          this.$message.error('请先选择项目选项')
          return;
        }

        if(this.nowProject == true){
          this.projectList.forEach(item => {
            this.projectIds.forEach(val => {
              if (item.projectId == val) {
                this.listQuery.nowReportProjectIds.push(item.projectId)
              }
            })
          })

          this.listQuery.nowReportProjectLevelList = this.projectLevels
          this.listQuery.nowReportProjectYearList = this.projectYears

          //去重
          if(this.listQuery.nowReportProjectIds && this.listQuery.nowReportProjectIds.length != 0){
            let obj = {}
            this.listQuery.nowReportProjectIds = this.listQuery.nowReportProjectIds.reduce((cur, next) => {
              obj[next] ? '' : obj[next] = true && cur.push(next)
              return cur
            }, [])
          }
        }else{
          this.listQuery.nowReportProjectIds = [];
          this.listQuery.nowReportProjectLevelList = [];
          this.listQuery.nowReportProjectYearList = [];
        }

        if(this.alreadyProject == true){
          this.projectList.forEach(item => {
            this.projectIds.forEach(val => {
              if (item.projectId == val) {
                this.listQuery.alreadyReportProjectNames.push(item.projectName)
              }
            })
          })

          this.listQuery.alreadyReportProjectLevelList = this.projectLevels
          this.listQuery.alreadyReportProjectYearList = this.projectYears

          //去重
          if(this.listQuery.alreadyReportProjectNames && this.listQuery.alreadyReportProjectNames.length != 0){
            let obj = {}
            this.listQuery.alreadyReportProjectNames = this.listQuery.alreadyReportProjectNames.reduce((cur, next) => {
              obj[next] ? '' : obj[next] = true && cur.push(next)
              return cur
            }, [])
          }

        }else{
          this.listQuery.alreadyReportProjectNames = [];
          this.listQuery.alreadyReportProjectLevelList = [];
          this.listQuery.alreadyReportProjectYearList = [];
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // alreadyHandleFilterYear(){
      //   this.listQuery.page = 0
      //   this.listQuery.pageSize = 20
      //   this.getCompanyData()
      // },

      // 科技类型
      handleFilterTechType(){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      // 新老客户
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
      // 城市
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

      // 企业位置
      handlePosition(val){
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getCompanyData()
      },

      //选择企业 0-选择 1-取消
      chooseCompany(row,num){
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
      },

      // 表格选择
      onTableSelect(selection,row){
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

      //查看已选择
      checkSelect(){
        if(this.storgCompanyList.length <= 0){
          this.$message.warning('请先选择企业！');
          return;
        }

        this.dialogVisible = true;
        this.chooseCompanyList = JSON.parse(JSON.stringify(this.storgCompanyList))
      },

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
        this.getPersonList('业务员,业务主管');
        this.createForm.projectName = this.$route.query.projectName;
        this.createForm.projectId = this.$route.query.projectId;
        this.createForm.projectList = [];
        this.createForm.projectList.push(this.projectBox)
        this.createVisible = true
      },

      cancel(){
        this.listQuery = {
          page: 0,
          pageSize: 20,
          companyPosition: []
        }
        this.storgCompanyList = [];
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy/project/list');
      },

      // 创建免费订单
      saveCreateOrder(formName) {
        if(this.storgCompanyList.length <= 0){
          this.$message.warning('请先选择企业！');
          return;
        }
        if(this.projectType == 822466810090618880 && !this.createForm.titleSeries){
          this.$message.warning('请先选择职称系列！');
          return;
        }
        if(this.projectType == 822466810090618880 && !this.createForm.titleLevel){
          this.$message.warning('请先选择职称级别！');
          return;
        }
        this.createForm.crmCompanyIdList = [];
        this.storgCompanyList.forEach(item=>{
          this.createForm.crmCompanyIdList.push(item.crmCompanyId)
        })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            saveFreeOrderOfProject(this.createForm).then(response => {
              if (response.code == 200) {
                this.createVisible = false;
                this.createForm = {unitPrice: 0};
                this.storgCompanyList = [];
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/declareCoordination/orderManage');
                this.$message.success('操作成功')
              }
            })
          } else {
            return false;
          }
        })
      },

      // 获取最大的批次
      getProjectMaxBatch(projectId) {
        if (this.batchNoList.length == 1) {
          queryProjectMaxBatch({projectId: projectId}).then(res => {
            if (res.data > 0) {
              for (var i=1; i< res.data + 1; i++) {
                this.batchNoList.push({'label': '第' + i + '批', 'value':i},)
              }
            }

          })
        }
      },

      // 获取职称系列
      getTitleSeries() {
        queryTitleSeriesOrLevel({}).then(res =>{
          if (res.code === 200){
            this.titleSeriesList = res.data
          }
        })
      },

      // 获取职称级别
      getTitleLevel(){
        this.$set(this.createForm, 'titleLevel', '')
        queryTitleSeriesOrLevel({parentId: this.createForm.titleSeries}).then(res =>{
          if (res.code === 200){
            this.titleLevelList = res.data
          }
        })
      },

      //关闭弹窗
      createClose(){
        this.createForm = {unitPrice: 0};
        this.createVisible = false;
      },
    }
  }
</script>

<style lang="less" scoped>
  /deep/.chooseCompanyId{
    cursor:pointer
  }
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
    align-items: flex-start;
  }

  /deep/ .el-select{
    margin-right: 10px;
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
    margin-bottom: 20px;

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
