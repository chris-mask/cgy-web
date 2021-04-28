<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-96" style="margin-bottom: 20px;">
      <!--搜索-->
      <el-card class="top-margin-10 center-items search-bar">
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-input placeholder="输入企业名称/统一社会信用代码/项目名称" @keyup.enter.native="goSearch" size="large"
                      v-model="listQuery.companyName" class="search-input" style="width: 500px;">
              <el-button slot="append" size="large" icon="el-icon-search" class="search-btn" @click="goSearch"
                         style="color: #fff; background-color: #05AAFF;">
                搜一下
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" class="filter-item search-company-btn" @click="goCheckEntIsUnique">企业查重</el-button>
            <el-button size="large" class="filter-item add-company-btn" style="margin-left: 10px;" @click="toCreate(false)" v-if="allowAdd.twoAllow">
              新增企业
            </el-button>
            <el-button size="large" class="filter-item add-company-btn" style="margin-left: 10px;" v-if="allowAddPerson.twoAllow" @click="toCreate(true)">
              新增个人
            </el-button>
            <el-button size="large" class="filter-item add-company-btn" style="margin-left: 10px;" @click="getImportTemplate">
              获取导入模板
            </el-button>
            <el-upload
              style="display: inline-block;"
              class="upload-demo"
              :limit=limitNum
              :disabled="exportShow"
              :show-file-list="false"
              :auto-upload="false"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              :before-upload="beforeUploadFile"
              :on-change="importFileChange"
              :on-exceed="exceedFile"
              :file-list="importFileList">
              <el-button size="large" class="filter-item add-company-btn" style="margin-left: 10px;" :disabled="exportShow">导入企业</el-button>
            </el-upload>
            <el-button size="large"
                       class="filter-item add-company-btn"
                       style="margin-left: 10px;"
                       @click="getUserTemplate">
              获取联系人模板
            </el-button>
            <el-upload
              style="display: inline-block;"
              class="upload-demo"
              :limit=limitNum
              :disabled="exportShow"
              :show-file-list="false"
              :auto-upload="false"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              :before-upload="beforeUploadFile"
              :on-change="importUserChange"
              :on-exceed="exceedFile"
              :file-list="importUserList">
              <el-button size="large" class="filter-item add-company-btn" style="margin-left: 10px;" :disabled="exportShow">导入联系人</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <!--        <div style="float: left" class="top-margin-15">-->
        <!--          <span class="hot-search">热搜榜：</span>-->
        <!--          <span class="hot-search-kw hover_cursor" @click="highTechClick" v-if="high_tech_click"-->
        <!--                style="color: #2cb1f5;">高企</span>-->
        <!--          <span class="hot-search-kw hover_cursor" @click="highTechClick" v-else>高企</span>-->
        <!--          <span class="hot-search-kw hover_cursor" @click="projectCenterTypeClick" v-if="project_center_type_click"-->
        <!--                style="color: #2cb1f5;">工程中心</span>-->
        <!--          <span class="hot-search-kw hover_cursor" @click="projectCenterTypeClick" v-else>工程中心</span>-->
        <!--          <span class="hot-search-kw hover_cursor" @click="techCenterTypeClick" v-if="tech_center_type_click"-->
        <!--                style="color: #2cb1f5;">技术中心</span>-->
        <!--          <span class="hot-search-kw hover_cursor" @click="techCenterTypeClick" v-else>技术中心</span>-->
        <!--        </div>-->
      </el-card>

      <el-alert
        v-if="exportShow"
        title="正在导入文件，请稍等..."
        style="margin-top:10px;"
        type="warning"
        effect="dark">
      </el-alert>

      <el-alert
        v-if="exportFailShow"
        :title="exportFailMsg.taskTitle"
        type="error"
        effect="dark"
        style="margin-top:10px;"
        :description="exportFailMsg.taskMessage"
        @close="closeExportFail"
        show-icon>
      </el-alert>

      <el-alert
        v-if="exportSuccessShow"
        :title="exportSuccessMsg.taskTitle"
        type="success"
        effect="dark"
        style="margin-top:10px;"
        :description="exportSuccessMsg.taskMessage"
        @close="closeExportSuccess"
        show-icon>
      </el-alert>

      <!--筛选栏-->
      <el-card class="screen-box top-margin-10 padding-0">
        <div class="screen-top">
          <div class="screen-list">
            <div style="min-width: 89px;">
              <span style="color: #03ADF4; font-weight: bold;">|</span>
              <span style="vertical-align: middle;">已选条件：</span>
            </div>
            <div class="screen-change-list">
              <div class="padding-vertical-5" v-for="(value, key) in select_conditions_list" style="border: 1px solid #33B3EE; font-size: 12px; color: #33B3EE; padding-left: 5px; padding-right: 2px;height: 24px;">
                {{value}}
                <img class="hover_cursor" @click="deleteOneClick(key)" src="../../icons/enterprise/close_con.png" style="vertical-align:middle; margin-left: 3px;"/>
              </div>
              <div class="padding-vertical-5" @click="deleteAllClick"
                   v-if="Object.keys(select_conditions_list).length > 1"
                   style="cursor:pointer;border: 1px solid #ff0000; font-size: 12px; color: #ff0000; padding-left: 5px; padding-right: 2px;height: 24px;">
                清空所有
              </div>
            </div>
          </div>
          <span class="screen-term" @click="getMoreCondition">
            <img v-if="more_condition" src="../../icons/enterprise/close_icon.png" style="margin-right: 8px;"/>
            <img v-else src="../../icons/enterprise/open_icon.png" style="margin-right: 8px;"/>
            <span style="color: #33B3EE;">选择筛选条件</span>
          </span>
        </div>

        <div v-if="more_condition">
          <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"></div>
          <div class="screen-group left-margin-10">
            <div class="top-margin-10">
              <el-form :inline="true">
                <el-form-item label="常用：">
                  <el-select multiple filterable @change='handleFilterDepartment' clearable size="mini" v-if="allowGetDeptList.twoAllow"
                             class="inline-block input-150 float-left" v-model="listQuery.deptIds"
                             placeholder="选择部门">
                    <el-option v-for="item in filter_department_list" :key="item.deptId" :label="item.deptName"
                               :value="item.deptId"></el-option>
                  </el-select>
                  <el-select multiple @change='handleFilterUser' clearable size="mini" filterable
                             class="inline-block input-150 float-left" v-model="listQuery.userIds" placeholder="选择业务人员" >
                    <el-option v-for="item in salePersonList" :key="item.userId" :label="item.userName"
                               :value="item.userId"></el-option>
                  </el-select>
                  <el-select @change='handleFilterInvolved' multiple clearable size="mini"
                             class="inline-block input-150 float-left" v-model="listQuery.businessIds"
                             placeholder="所属行业">
                    <el-option v-for="item in industry_involved_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-date-picker @change='handleFilterEntYear' size="mini" class="inline-block input-150 float-left"
                                  clearable v-model="listQuery.setUpTheYear" type="year" value-format="yyyy"
                                  placeholder="成立年份"></el-date-picker>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="项目：">
                  <el-select @change='handleFilterProjectName' remote :remote-method="projectListMethod" multiple
                             size="mini" style="width: 350px;" filterable
                             v-loadMore="loadMore" :loading="loading"
                             class="inline-block float-left" clearable v-model="listQuery.projectIds"
                             placeholder="项目名称">
                    <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName"
                               :value="item.projectId"></el-option>
                  </el-select>
                  <el-select @change='handleFilterProjectLevel' multiple clearable size="mini"
                             class="inline-block input-150 float-left" v-model="listQuery.projectLevels"
                             placeholder="项目级别">
                    <el-option v-for="item in projectLevelList" :key='item.value' :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select size="mini"  class="inline-block input-150 float-left" @change='changeTitleSeries' v-model="listQuery.titleSeriesList" placeholder="职称系列" clearable multiple>
                    <el-option v-for="item in titleSeriesList" :label="item.dictName" :value="item.dictId" :key="item.dictId"></el-option>
                  </el-select>
                  <el-select size="small" class="inline-block input-150 float-left" filterable @change='handleFilterYear' v-model="listQuery.projectYears"
                             placeholder="项目年度" clearable multiple>
                    <el-option
                      v-for="item in yearList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-checkbox v-model="nowProject" @change="changeProjectBegin(1)" :disabled="showFour">在报项目</el-checkbox>
                  <el-checkbox v-model="alreadyProject" @change="changeProjectBegin(2)" :disabled="showFour">已报项目</el-checkbox>
                </el-form-item>
              </el-form>
            </div>
<!--            <div>-->
<!--              <el-form :inline="true">-->
<!--                <el-form-item label="已报项目：">-->
<!--                  <el-select @change='handleFilterProjectName2' remote :remote-method="projectListMethod" multiple-->
<!--                             size="mini" style="width: 350px;" filterable-->
<!--                             v-loadMore="loadMore" :loading="loading"-->
<!--                             class="inline-block float-left" clearable v-model="listQuery.alreadyReportProjectNames"-->
<!--                             placeholder="已报项目名称">-->
<!--                    <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName"-->
<!--                               :value="item.projectName"></el-option>-->
<!--                  </el-select>-->
<!--                  <el-select @change='handleFilterProjectLevel2' multiple clearable size="mini"-->
<!--                             class="inline-block input-150 float-left" v-model="listQuery.alreadyReportProjectLevelList"-->
<!--                             placeholder="已报项目级别">-->
<!--                    <el-option v-for="item in projectLevelList" :key='item.value' :label="item.label"-->
<!--                               :value="item.value"></el-option>-->
<!--                  </el-select>-->
<!--&lt;!&ndash;                  <el-date-picker @change='handleFilterYear2' size="mini" class="inline-block input-150 float-left"&ndash;&gt;-->
<!--&lt;!&ndash;                                  clearable v-model="listQuery.alreadyReportProjectYearList" type="year" value-format="yyyy"&ndash;&gt;-->
<!--&lt;!&ndash;                                  placeholder="立项项目年度"></el-date-picker>&ndash;&gt;-->
<!--                  <el-select size="small" class="inline-block input-150 float-left" filterable @change='handleFilterYear2' v-model="listQuery.alreadyReportProjectYearList"-->
<!--                             placeholder="已报项目年度" clearable multiple>-->
<!--                    <el-option-->
<!--                      v-for="item in yearList"-->
<!--                      :key="item"-->
<!--                      :label="item"-->
<!--                      :value="item">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </el-form>-->
<!--            </div>-->
            <div>
              <el-form :inline="true">
                <el-form-item label="规模：">
                  <el-select @change='handleFilterYearSales'
                             clearable size="mini"
                             class="inline-block input-150 float-left"
                             v-model="listQuery.year_sales"
                             placeholder="近一年销售额范围"
                  >
                    <el-option v-for="item in enterprise_annual_sales_list" :key="item.value" :label="item.value"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select @change='handleFilterEmployeeScale' size="mini" class="inline-block input-150 float-left"
                             filterable clearable v-model="listQuery.personnelScale" placeholder="人数范围">
                    <el-option v-for="item in employee_scale_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='handleFilterEnterpriseScale' size="mini" class="inline-block input-150 float-left"
                             clearable v-model="listQuery.companyScale" placeholder="规模">
                    <el-option v-for="item in companyScaleList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="地区：">
                  <el-select @change='changeProvince' clearable size="mini" class="inline-block input-150 float-left"
                             v-model="listQuery.provinceId" placeholder="省份">
                    <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='changeCity' clearable size="mini" class="inline-block input-150 float-left"
                             v-model="listQuery.cityId" placeholder="城市">
                    <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='changeDistrict' clearable size="mini" class="inline-block input-150 float-left"
                             v-model="listQuery.districtId" placeholder="县区">
                    <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='getTownsId' clearable size="mini" class="inline-block input-150 float-left"
                             v-model="listQuery.townId" placeholder="镇街">
                    <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="类型：">
                  <el-select @change='handleFilterTechType' size="mini" class="inline-block input-150 float-left"
                             multiple
                             clearable v-model="listQuery.technologyType" placeholder="科技类型">
                    <el-option v-for="item in technologyTypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='handleFilterIsNewOrNot' size="mini" class="inline-block input-150 float-left"
                             clearable v-model="listQuery.newOrOld" placeholder="新老客户">
                    <el-option v-for="item in is_new_or_not_list" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select @change='handleFilterCustomerClassification' size="mini"
                             class="inline-block input-150 float-left" clearable
                             v-model="listQuery.companyLevel" placeholder="客户级别">
                    <el-option v-for="item in customer_classification_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>

                  <el-select @change='handleFilterSignCustomer' size="mini" class="inline-block input-150 float-left"
                             filterable clearable
                             v-model="listQuery.isSigning" placeholder="是否签单">
                    <el-option v-for="item in sign_customer_list" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="知产：">
                  <el-select @change='handlePatent' size="mini" class="inline-block input-150 float-left"
                             clearable v-model="listQuery.patentExpired" placeholder="专利到期">
                    <el-option v-for="item in patentExpire" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select @change='handleTrademark' size="mini" class="inline-block input-150 float-left"
                             clearable v-model="listQuery.trademarkExpires" placeholder="商标到期">
                    <el-option v-for="item in trademarkExpire" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select multiple @change='handlePatentType' size="mini" class="inline-block input-150 float-left"
                             clearable v-model="listQuery.patentTypes" placeholder="专利类型">
                    <el-option v-for="item in patentList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>

                  <el-input oninput="value=value.replace(/[^0-9]/g,'')" size="mini" @input="handlePatentNum" v-model="listQuery.patentNum" clearable class="inline-block input-150 float-left screen-input" placeholder="专利数量"/>
                  <el-input oninput="value=value.replace(/[^0-9]/g,'')" size="mini" @input="handleTrademarkNum" v-model="listQuery.trademarkNum" clearable class="inline-block input-150 float-left screen-input" placeholder="商标数量"/>
                  <el-input oninput="value=value.replace(/[^0-9]/g,'')" size="mini" @input="handleCopyrightNum" v-model="listQuery.copyrightNum" clearable class="inline-block input-150 float-left screen-input" placeholder="软著数量"/>

                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="其他：">
                  <el-select @change='handleFilterOptions2' size="mini" class="inline-block input-150 float-left"
                             clearable v-model="listQuery.highestEducation" placeholder="学历">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label"
                               :value="item.label"></el-option>
                  </el-select>
                  <el-select @change='handleFilterOptions1' size="mini" class="inline-block input-150 float-left"
                             clearable v-model="listQuery.jobProfessional" placeholder="职称">
                    <el-option v-for="item in jobProfessionalList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div class="check-list">
              <el-form :inline="true">
                <el-form-item label="位置：">
                  <!--                  <el-select @change='handleCompanyPosition' size="mini" class="inline-block input-150 float-left"-->
                  <!--                             clearable v-model="listQuery.isPublic" placeholder="客户位置">-->
                  <!--                    <el-option v-for="item in positionList" :key="item.value" :label="item.label"-->
                  <!--                               :value="item.value"></el-option>-->
                  <!--                  </el-select>-->

                  <el-checkbox-group v-model="listQuery.companyPosition" @change="handlePosition">
                    <el-checkbox v-for="item in positionCheckList" :label="item.keys" :key="item.keys" :value="item.keys">
                      {{item.name}}
                    </el-checkbox>
                  </el-checkbox-group>
                  <!--                  <el-checkbox class="float-left inline-block span-input" @change="handleFilterPublicSea1"-->
                  <!--                               v-model="isPrivate">私海-->
                  <!--                  </el-checkbox>-->
                  <!--                  <el-checkbox class="float-left inline-block span-input" @change="handleFilterPublicSea2"-->
                  <!--                               v-model="isPublic">公海-->
                  <!--                  </el-checkbox>-->
                  <!--                  <el-checkbox class="float-left inline-block span-input" @change="handleFilterPublicSea3"-->
                  <!--                               v-model="companyOrPersonal	">个人-->
                  <!--                  </el-checkbox>-->
                  <!--                  <el-checkbox class="float-left inline-block span-input" @change="handleFilterPublicSea4"-->
                  <!--                               v-model="isChannel">渠道-->
                  <!--                  </el-checkbox>-->
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-card>

      <!--批量操作-->
      <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #03ADF4; font-weight: bold;">|</span>
          <span class="padding-vertical-10">
            <span>批量操作：</span>
            <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" v-if="allowBatchFollowUser.twoAllow"
                       @click="goBatchChange">设置业务员</el-button>
            <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" v-if="allowBatchEngineer.twoAllow"
                       @click="goBatchProjectChange">设置项目员</el-button>
            <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" v-if="allowBatchIntellectualEngineer.twoAllow"
                       @click="goBatchintellectualChange">设置专利员</el-button>
            <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" v-if="allowBatchAuditor.twoAllow"
                       @click="goBatchAuditChange">设置审计员</el-button>
            <el-button size="mini" class="filter-item bg_pale_violet left-margin-10" v-if="allowSyncIntellectual.twoAllow"
                       @click="goBatchSyncIpr">同步知识产权</el-button>
            <el-button size="mini" class="filter-item bg_pale_violet left-margin-10" @click="goBatchSyncBasicInfo" v-if="allowBatchCompanyInfo.twoAllow">同步企业信息</el-button>
            <el-button size="mini" class="filter-item bg_pale_purple left-margin-10" @click="syncPolicyApprovalList" v-if="allowSyncPolicyApprovalList.twoAllow">同步立项</el-button>
            <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" v-if="allowIsproxy.twoAllow"
                       @click="setChannel">设置渠道</el-button>
            <el-button size="mini" class="filter-item bg_gray left-margin-10" @click="cancelSetChannel" v-if="allowIsproxy.twoAllow">取消渠道</el-button>
            <el-button size="mini" class="filter-item bg_pink left-margin-10" v-if="allowPutCompanyToFreesesea.twoAllow"
                       @click="handlePutIntoFreeSea">投入公海</el-button>
            <el-button size="mini" class="filter-item bg_pale_violet left-margin-10" @click="addListHandle" v-if="allowAdd.twoAllow">新增销售计划</el-button>
            <el-button size="mini" class="filter-item bg_gray left-margin-10" @click="delEnterprise" v-if="allowDelete.twoAllow">删除</el-button>
          </span>
        </div>
      </el-card>

      <!--列表-->
      <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #ABABAB;">搜索到<span style="color:#F9A9A9;">{{total}}</span>条记录</span>
          <span v-if="check_biz_ids.length > 0" style="color: #ABABAB;">已选中<span style="color:#F9A9A9;">{{check_biz_ids.length}}</span>条记录</span>
          <el-button class="filter-item bg_blue" size="mini" @click='checkAllOrNo' style="margin-left: 10px;">全选
          </el-button>
          <!-- <el-button class="filter-item bg_blue left-margin-10" size="mini" @click="handleExport">导出</el-button> -->
          <el-button class="filter-item bg_blue left-margin-10" size="mini" @click="getExportField">导出</el-button>
          <span class="float-right right-margin-10" style="vertical-align:middle;">
            <el-select @change='handleOrder'
                       @clear="handleClearSort"
                       size="mini"
                       v-model="order"
                       clearable
                       placeholder='默认排序'
            >
              <el-option v-for="(item,index) in order_list" :key="item.value" :label="item.label" :value="index"> </el-option>
            </el-select>
          </span>
        </div>
        <div class="top-margin-10" style="height: 3px; background-color: #EDF4FF; width: 100%; "></div>
        <div class="top-margin-10 overflow-x" style="padding-bottom: 20px; border-bottom: 2px solid #F1F0F2;" v-loading="listLoading" v-for="(item, index) in list">
          <span v-if="item.companyOrPersonal == 1">
            <div class="float-left overflow-x" style="width: 90px; min-height: 100px;">
              <div class="float-left center-items">
                <input type="checkbox" name="check_biz_ids" :value="item.crmCompanyId" v-model="check_biz_ids"/>
              </div>
              <div
                class="bg_pale_blue ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                style="width : 60px; height: 60px;" @click="toCheck(item)">
                {{item.companyShortName ? item.companyShortName : '个人客户'}}
              </div>
            </div>
            <div class="float-left overflow-x overflow-y" style="width: 80%; font-size: 14px;position: relative;">
              <div>
                <span class="hover_cursor" style="font-size: 16px; font-weight: bolder;" @click="toCheck(item)">{{item.companyName}}</span>
                <span
                  style="background-color: #FF8585; padding: 3px 7px; height: 20px; width: 30px; line-height: 20px; color: #ffffff; margin-left: 13px; border-radius:10px;"
                  v-if="item.newOrOld == 0">new</span>
                <span class="left-margin-10" style="height: 20px; line-height: 20px;"
                      v-if="item.companyLevelName == '优质客户'">
                  <img src="../../icons/enterprise/customer_2.png" style="vertical-align:middle; margin-left: 3px;"/>
                  <!--                  <span class="companyTypeGreen">有限责任</span>-->
                </span>
                <span class="left-margin-10" style="height: 20px; line-height: 20px;"
                      v-else-if="item.companyLevelName == '重点客户'">
                  <img src="../../icons/enterprise/customer_3.png" style="vertical-align:middle; margin-left: 3px;"/>
                  <!--                  <span class="companyTypeZhi">股份有限</span>-->
                </span>
                <span class="left-margin-10" style="height: 20px; line-height: 20px;" v-if="item.isChannel == 1">
                  <img src="../../icons/enterprise/channel.png" style="vertical-align:middle; margin-left: 3px;"/>
                </span>
              </div>
              <div>
                <div class="item-type-list top-margin-10">
                  <div class="item-type bottom-margin-10 inline-block bottom-margin-10 overflow-x overflow-y">
                    <span class="title">创建时间：</span>
                    {{item.createTime}}
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">性别：</span>
                    {{item.personnelSex == 1 ? '男' : item.personnelSex == 0 ? '女' : ''}}
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">手机号：</span>
                    {{item.personnelMobile}}
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">出生日期：</span>
                    {{item.birthDate}}
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">身份证号码：</span>
                    {{item.idCard}}
                  </div>
                </div>
                <div class="item-type-list">
                  <div class="item-type bottom-margin-10 inline-block bottom-margin-10 overflow-x overflow-y">
                    <span class="title">籍贯：</span>{{item.nativePlace}}
                  </div>
                  <div class="item-type inline-block width-0-20">
                    <span class="title">地址：</span>
                    <span>{{item.provinceName}}/</span>
                    <span v-if="item.cityId">{{item.cityName}}/</span>
                    <span v-if="item.districtId">{{item.districtName}}/</span>
                    <span v-if="item.townId">{{item.townName}}</span>
                  </div>
                  <div class="item-type inline-block width-0-20">
                    <span class="title">从事行业：</span>{{item.industryInvolvedName}}
                  </div>
                  <!--                  <div class="item-type inline-block width-0-15">-->
                  <!--                    <span class="title">所属单位：</span>-->
                  <!--                    {{item.regist_authority}}-->
                  <!--                  </div>-->
                </div>
                <div class="item-type-list">
                  <!--<div class="item-type bottom-margin-10 inline-block overflow-x overflow-y">-->
                  <!--<span class="title">可申报数：</span>-->
                  <!--{{item.can_report_num}}-->
                  <!--</div>-->
                  <!--<div class="item-type inline-block width-0-15 ">-->
                  <div class="item-type bottom-margin-10 inline-block">
                    <span class="title">专利数：</span>
                    <!--                    <span class="color-05 hover_cursor" @click="toPatent(item.crmCompanyId)">-->
                    <span class="color-05 hover_cursor">
                      {{item.patentCount ? item.patentCount : 0}}
                    </span>
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">商标数：</span>
                    <!--                    <span class="color-05 hover_cursor" @click="toTrademark(item.crmCompanyId)">-->
                    <span class="color-05 hover_cursor">
                    {{item.trademarkCount ? item.trademarkCount : 0}}
                    </span>
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">著作权数：</span>
                    <!--                    <span class="color-05 hover_cursor" @click="toCopyright(item.crmCompanyId)">-->
                    <span class="color-05 hover_cursor">
                    {{item.copyrightCount ? item.copyrightCount : 0}}
                    </span>
                  </div>
                </div>
                <div class="item-type-list">
                  <div class="item-type inline-block width-0-15">
                    <span class="title">业务人员：</span>
                    <span class="color-05" @click="toChatList(item,'business')">
                      {{item.traceSalesManName ? item.traceSalesManName : '-'}}
                    </span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title">项目人员：</span>
                    <span class="color-05" @click="toChatList(item,'project')">
                      {{item.projectMan ? item.projectMan : '-'}}
                    </span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title">专利员：</span>
                    <span class="color-05" @click="toChatList(item,'project')">
                      {{item.propertyMan ? item.propertyMan : '-'}}
                    </span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title">审计人员：</span>
                    <span class="color-05" @click="toChatList(item,'audit')">
                      {{item.auditMan ? item.auditMan : '-'}}
                    </span>
                  </div>
                  <div class="item-type inline-block width-0-25" style="width: auto;" v-if="item.isChannel == 1">
                    <span class="title">加入渠道时间：</span>
                    <span class="color-05">{{item.proxyBeginDate}}</span>
                  </div>
                </div>
              </div>
              <div class="float-left inline-block" style="position: absolute;right: 0;top: 0"
                   v-if="item.companyOrPersonal == 1">
                  <img src="../../icons/enterprise/personal_ent.png"
                       style="vertical-align:middle;width: 100px;margin-top: 20px;"/>
              </div>
            </div>
          </span>
          <span v-else>
            <div class="float-left overflow-x" style="width: 90px; min-height: 100px;">
              <div class="float-left center-items">
                <input type="checkbox" name="check_biz_ids" :value="item.crmCompanyId" v-model="check_biz_ids"/>
              </div>
              <div
                class="bg_pale_blue ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                style="width : 60px; height: 60px;" @click="toCheck(item)" v-if="index % 5 === 0 ">
                {{item.companyShortName ? item.companyShortName : '企业简称'}}
              </div>
              <div
                class="bg_pale_pink ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                style="width : 60px; height: 60px;" @click="toCheck(item)" v-if="index % 5 === 1 ">
                {{item.companyShortName ? item.companyShortName : '企业简称'}}
              </div>
              <div
                class="bg_pale_yellow ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                style="width : 60px; height: 60px;" @click="toCheck(item)" v-if="index % 5 === 2 ">{{item.companyShortName
                ? item.companyShortName : '企业简称'}}
              </div>
              <div
                class="bg_pale_green ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                style="width : 60px; height: 60px;" @click="toCheck(item)" v-if="index % 5 === 3 ">
                {{item.companyShortName ? item.companyShortName : '企业简称'}}
              </div>
              <div
                class="bg_pale_violet ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                style="width : 60px; height: 60px;" @click="toCheck(item)" v-if="index % 5 === 4 ">{{item.companyShortName
                ? item.companyShortName : '企业简称'}}
              </div>
            </div>
            <div class="float-left overflow-x overflow-y" style="width: 80%; font-size: 14px;">
              <div>
                <span class="hover_cursor" style="font-size: 16px; font-weight: bolder;" @click="toCheck(item)">{{item.companyName}}</span>
                <span
                  style="background-color: #FF8585; padding: 3px 7px; height: 20px; width: 30px; line-height: 20px; color: #ffffff; margin-left: 13px; border-radius:10px;"
                  v-if="item.newOrOld == 0">new</span>
                <span class="left-margin-10" style="height: 20px; line-height: 20px;"
                      v-if="item.companyLevelName == '优质客户'">
                  <img src="../../icons/enterprise/customer_2.png" style="vertical-align:middle; margin-left: 3px;"/>
                  <!--                  <span class="companyTypeGreen">有限责任</span>-->
                </span>
                <span class="left-margin-10" style="height: 20px; line-height: 20px;"
                      v-else-if="item.companyLevelName == '重点客户'">
                  <img src="../../icons/enterprise/customer_3.png" style="vertical-align:middle; margin-left: 3px;"/>
                  <!--                  <span class="companyTypeZhi">股份有限</span>-->
                </span>
                <span class="left-margin-10" style="height: 20px; line-height: 20px;" v-if="item.isChannel == 1">
                  <img src="../../icons/enterprise/channel.png" style="vertical-align:middle; margin-left: 3px;"/>
                </span>
              </div>
              <div v-if="item.companyPosition == 1">
                <div class="top-margin-10 overflow-x overflow-y flex">
                  <div class="float-left color-05 dq inline-block overflow-y" style="width: auto;">
                    <span class="bg_dq">所在地区：
                      <span>{{item.provinceName ? item.provinceName : '-'}}</span>
                      <span v-if="item.cityId">/{{item.cityName}}</span>
                      <span v-if="item.districtId">/{{item.districtName}}</span>
                      <span v-if="item.townId">/{{item.townName}}</span>
                      <!--                      <span v-if="item.companyAddress">{{item.companyAddress}}</span>-->
                    </span>
                  </div>
                  <div class="float-left left-margin-10 inline-block zy"
                       style="width: 45%;text-overflow: ellipsis;overflow: hidden;">
                    <span class="bg_zy"
                          style="width:100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">主营：{{item.mainProducts ? item.mainProducts : '-'}}</span>
                  </div>
                </div>
                <div class="item-type-list top-margin-10">

                  <div class="item-type bottom-margin-10 inline-block bottom-margin-10 overflow-x overflow-y">
                    <span class="title">成立时间：</span>
                    {{item.setupDate}}
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title">注册资金：</span>
                    <span v-if="item.registerMoney">{{item.registerMoney / 10000}}万</span>
                    <span v-else>暂无数据</span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title">销售额：</span>
                    <span v-if="item.companySalesName">{{item.companySalesName}}</span>
                    <span v-else>暂无数据</span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title" @click="handleShowConnectContentListPeople(item,0)">业务人员：</span>
                    <span class="color-05" @click="handleShowConnectContentListPeople(item,0)">
                    <!-- <span class="color-05" @click="toChatList(item,'business')">   -->
                      {{item.traceSalesManName ? item.traceSalesManName : '暂无'}}
                    </span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title" @click="handleShowConnectContentListPeople(item,1)">项目人员：</span>
                    <span class="color-05" @click="handleShowConnectContentListPeople(item,1)">
                      <!-- <span class="color-05" @click="toChatList(item,'project')"> -->
                      {{item.projectMan ? item.projectMan : '-'}}
                    </span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title" @click="handleShowConnectContentListPeople(item,2)">专利员：</span>
                    <span class="color-05" @click="handleShowConnectContentListPeople(item,2)">
                    <!-- <span class="color-05" @click="toChatList(item,'project')">  -->
                      {{item.propertyMan ? item.propertyMan : '-'}}
                    </span>
                  </div>

                  <div class="item-type inline-block width-0-15">
                    <span class="title" @click="handleShowConnectContentListPeople(item,3)">审计人员：</span>
                    <span class="color-05" @click="handleShowConnectContentListPeople(item,3)">
                    <!-- <span class="color-05" @click="toChatList(item,'audit')">   -->
                      {{item.auditMan ? item.auditMan : '-'}}
                    </span>
                  </div>
                </div>

                <div class="item-type-list">
<!--                  <div class="item-type inline-block width-0-15">-->
                  <!--                    <span class="title">可申报数：</span>-->
                  <!--                    {{item.can_report_num ? item.can_report_num : 0}}-->
                  <!--                  </div>-->
                  <div class="item-type inline-block width-0-15">
                    <span class="title">专利数：</span>
                    <!--                    <span class="color-05 hover_cursor" @click="toPatent(item.crmCompanyId)">-->
                    <span class="color-05 hover_cursor">
                      {{item.patentCount ? item.patentCount : 0}}
                    </span>
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">商标数：</span>
                    <!--                    <span class="color-05 hover_cursor" @click="toTrademark(item.crmCompanyId)">-->
                    <span class="color-05 hover_cursor">
                      {{item.trademarkCount ? item.trademarkCount : 0}}
                    </span>
                  </div>
                  <div class="item-type inline-block width-0-15">
                    <span class="title">著作权数：</span>
                    <!--                    <span class="color-05 hover_cursor" @click="toCopyright(item.crmCompanyId)">-->
                    <span class="color-05 hover_cursor">
                     {{item.copyrightCount ? item.copyrightCount : 0}}
                    </span>
                  </div>
                  <!--                  <div class="item-type inline-block width-0-15">-->
                  <!--                    <span class="title">研发项目数：</span>-->
                  <!--                    <span class="color-05">-->
                  <!--                    {{item.project_num}}-->
                  <!--                    </span>-->
                  <!--                  </div>-->

                  <div class="item-type inline-block width-0-25" style="width: auto;" v-if="item.isChannel == 1">
                    <span class="title">加入渠道时间：</span>
                    <span class="color-05">{{item.proxyBeginDate}}</span>
                  </div>
                </div>

                <div class="item-type-list">
                  <div class="item-type inline-block overflow-x overflow-y" style="width: auto;margin-right: 30px;">
                    <span class="title">在报项目：</span>
                    <span v-if="item.publishProjectName">
                      <span :title="item.publishProjectName">{{item.publishProjectName}}</span>
                      <!--                      <span class="left-margin-10 color-F5 overflow-x overflow-y"-->
                      <!--                            v-for="now_item in item.now_apply_order">{{now_item.project_library__project_name}}</span>-->
                    </span>
                    <span v-else class="left-margin-10 color-F5 overflow-x overflow-y">暂无在报项目</span>
                  </div>

                  <div class="item-type left-margin-10 inline-block" style="width: auto;margin-left: 0">已立项项目：
                    <span v-if="item.notPublishProjectName">
                      <span :title="item.notPublishProjectName">{{item.notPublishProjectName}}</span>
                      <!--                      <span class="left-margin-10 color-F5 overflow-x overflow-y"-->
                      <!--                            v-for="already_item in item.already_apply_order">{{already_item.project_name}}</span>-->
                    </span>
                    <span class="left-margin-10 color-F5 overflow-x overflow-y" v-else>暂无已立项项目</span>
                  </div>

                </div>
              </div>
              <div style="position: relative" v-if="item.companyPosition == 0">
                <div class="top-margin-10 overflow-x overflow-y flex">
                  <div class="float-left color-05 dq inline-block overflow-y" style="width: auto;">
                    <span class="bg_dq">所在地区：
                      <span>{{item.provinceName ? item.provinceName : '-'}}</span>
                      <span v-if="item.cityId">/{{item.cityName}}</span>
                      <span v-if="item.districtId">/{{item.districtName}}</span>
                      <span v-if="item.townId">/{{item.townName}}</span>
                      <!--                      <span v-if="item.companyAddress">{{item.companyAddress}}</span>-->
                    </span>
                  </div>
                </div>
                <div class="float-left inline-block" style="width: 60%;">
                  <div class="top-margin-10">
                    <span class="inline-block" style="white-space: nowrap;">成立时间：{{item.setupDate}}</span>
                    <span class="inline-block left-margin-10" style="white-space: nowrap;">注册资金：{{item.registerMoney ? item.registerMoney / 10000 + '万' : '暂无数据'}}</span>
                  </div>
                  <div class="top-margin-10">
<!--                    <span class="inline-block width-0-18">可申报数：{{item.can_report_num}}</span>-->
                    <span class="inline-block width-0-18">专利数：<span class="color-05">{{item.patentCount ? item.patentCount : 0}}</span></span>
                    <span class="left-margin-10 inline-block width-0-15">商标数：<span class="color-05">{{item.trademarkCount ? item.trademarkCount : 0}}</span></span>
                    <span class="left-margin-10 inline-block width-0-15">著作权数：<span class="color-05">{{item.copyrightCount ? item.copyrightCount : 0}}</span></span>
                  </div>

                  <div class="item-type inline-block overflow-x overflow-y top-margin-10" style="width: auto;margin-right: 30px;">
                    <span class="title">在报项目：</span>
                    <span v-if="item.publishProjectName">
                      <span :title="item.publishProjectName">{{item.publishProjectName}}</span>
                      <!--                      <span class="left-margin-10 color-F5 overflow-x overflow-y"-->
                      <!--                            v-for="now_item in item.now_apply_order">{{now_item.project_library__project_name}}</span>-->
                    </span>
                    <span v-else class="left-margin-10 color-F5 overflow-x overflow-y">暂无在报项目</span>
                  </div>

                  <div class="item-type left-margin-10 inline-block top-margin-10" style="width: auto;margin-left: 0">已立项项目：
                    <span v-if="item.notPublishProjectName">
                      <span :title="item.notPublishProjectName">{{item.notPublishProjectName}}</span>
                      <!--                      <span class="left-margin-10 color-F5 overflow-x overflow-y"-->
                      <!--                            v-for="already_item in item.already_apply_order">{{already_item.project_name}}</span>-->
                    </span>
                    <span class="left-margin-10 color-F5 overflow-x overflow-y" v-else>暂无已立项项目</span>
                  </div>
                </div>
                <div class="float-left inline-block" style="position: absolute;right: 0;"
                     v-if="item.companyPosition == 0">
                  <img src="../../icons/enterprise/sea_customer1.png" style="vertical-align:middle;"/>
                </div>
              </div>
            </div>
          </span>

          <div class="float-right right-margin-10 text-align-center overflow-x" style="width: 90px; min-height: 100px;">
            <!--            v-if="item.businessScope !== '' && can_create"-->
            <el-button class="filter-item bg_blue left-margin-10 top-margin-10" v-if="allowUpdate.twoAllow"
                       style="width: 60px; font-size: 12px; padding: 7px 10px;" @click="handleUpdate(item)">编辑
            </el-button>
            <el-button v-if="item.companyPosition == 1"
                       class="filter-item bg_pale_orange top-margin-10 left-margin-10"
                       style="width: 60px; font-size: 12px; padding: 7px 10px;"
                       @click="handleShowConnectContentList(item.crmCompanyId)">跟进
            </el-button>
            <el-button v-if="item.companyPosition == 0 && allowbatchGrabCompany.twoAllow"
                       class="filter-item bg_pale_purple top-margin-10 left-margin-10"
                       style="width: 60px; font-size: 12px; padding: 7px 10px;"
                       @click="grabFreeSeaCustomer(item.crmCompanyId)">抢客户
            </el-button>
          </div>
        </div>
        <div class="padding-0" style="margin-top: 20px;">
          <div class="text-align-center" style="height: 40px; line-height: 30px;cursor: pointer" @click="pageDown"
               v-if="total - list.length > 0">点击加载更多
          </div>
          <div class="text-align-center" style="height: 40px; line-height: 30px;" v-else>没有更多数据了</div>
        </div>
      </el-card>
    </el-row>

    <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../../icons/enterprise/back_top.png" alt="">
      </a>
    </div>

    <!--弹窗 新增销售计划-->
    <!--批量新增--弹窗-->
    <el-dialog :before-close="cananlMoreSaleHandle" class="add-sale-modal" title="新增计划"
               :visible.sync="addSaleDialogVisible" width="80%" v-dialogDrag>
<!--      <el-button type="primary" @click="addSaleRowHandle" size="medium" style="margin-bottom: 10px;float: right">新增一行-->
<!--      </el-button>-->
      <el-table :header-cell-class-name='must' class="add-sale-table" :data="addMoreSale" border highlight-current-row>

        <!--目标客户-->
        <!--目标客户-->
        <el-table-column align="center" :label="`目标客户`" prop="userName">
          <span class="star" style="margin-left: -37px;left: 50%;">*</span>
          <template slot-scope="scope">
            <div class="flex-center">
              <el-input :readonly="true" v-model="scope.row.companyName" v-if="!scope.row.isSelectUser" class="user-input"
                        placeholder="请输入目标客户"/>
              <el-select v-else v-model="scope.row.crmCompanyId"
                         class="user-select"
                         filterable
                         clearable
                         placeholder="选择目标客户"
                         @change="addSelectMoreCompanyHandle($event,scope.row)"
                         v-loadMore="loadMore2"
                         @focus="handleMoreSelectData(scope.row,'moreUser',scope.$index)"
                         @blur="handleSelectMoreDataBlue"
                         remote
                         :remote-method="remoteMethod"
              >
                <!--                @focus="handleSelectData('user')"-->
                <el-option
                  v-for="(item,index) in scope.row.companyUserList"
                  :key="index"
                  :label="item.companyName"
                  :value="item.crmCompanyId"
                />
              </el-select>
<!--              <i :title="'选择客户'" v-if="!scope.row.isSelectUser" class="el-icon-s-operation"-->
<!--                 @click="switchMoreCompanyHandle(scope.row)"></i>-->
<!--              <i :title="'输入客户'" v-else class="el-icon-edit" @click="switchMoreCompanyHandle(scope.row)"></i>-->
            </div>
          </template>
        </el-table-column>

        <!--联系人-->
        <el-table-column width="150" align="center" label="联系人" prop="userName">
          <span class="star" style="margin-left: -23px;left: 50%;">*</span>
          <template slot-scope="scope">
            <el-input class="user-input" maxlength="50" v-model="scope.row.contactName"></el-input>
          </template>
        </el-table-column>

        <!--联系电话-->
        <el-table-column width="150" align="center" label="联系电话" prop="userName">
          <template slot-scope="scope">
            <el-input class="user-input" maxlength="50" v-model="scope.row.contactPhone"></el-input>
          </template>
        </el-table-column>

        <!--计划实施时间-->
        <el-table-column width="160" align="center" label="计划实施时间" prop="userName">
          <template slot-scope="scope">
            <el-date-picker style="width: 100%;" type="date" v-model="scope.row.planDate" placeholder="选择日期"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </template>
        </el-table-column>

        <!--推广项目-->
        <el-table-column align="center" label="推广项目" prop="userName">
          <template slot-scope="scope">
            <div class="flex-center">
              <el-select v-if="scope.row.isSelectProject"
                         v-model="scope.row.projectName"
                         class="user-select"
                         filterable
                         clearable placeholder="选择推广项目"
                         @change="addSelectMoreProjectHandle($event,scope.row)"
                         v-loadMore="loadMore3"
                         @focus="handleSelectData('project')"
                         @blur="handleSelectProjectBlue"
                         remote
                         :remote-method="remoteProject"
              >
                <el-option
                  v-for="(item,index) in projectWriteList"
                  :key="index"
                  :label="item.projectName"
                  :value="item.projectId"
                />
              </el-select>
              <el-input v-else class="user-input" v-model="scope.row.projectName" placeholder="请输入推广项目"
                        maxlength="50"></el-input>
              <i :title="'选择项目'" v-if="!scope.row.isSelectProject" class="el-icon-s-operation"
                 @click="switchMoreProjectHandle(scope.row)"></i>
              <i :title="'输入项目'" v-else class="el-icon-edit" @click="switchMoreProjectHandle(scope.row)"></i>
            </div>
          </template>
        </el-table-column>

        <!--客户信息-->
        <el-table-column align="center" label="客户信息" prop="userName">
          <template slot-scope="scope">
            <el-input maxlength="1000" type="textarea" v-model="scope.row.projectBasis" resize="none" :rows="5"
                      placeholder="客户的什么信息，让你去推广该项目，请提前做好准备"></el-input>
          </template>
        </el-table-column>

        <!--操作-->
        <el-table-column width="35" align="center" label="操作" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <i class="icon-sale-del el-icon-delete" @click="delSaleMoreHandle(scope.$index)"></i>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cananlMoreSaleHandle" size="medium">取 消</el-button>
        <el-button @click="setMoreSaleHandle" type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>

    <!--跟进消息-->
    <el-dialog title="跟进消息" class="chat-modal" :visible.sync="ConnectContentDialogVisible" width="40%">
      <div class="dialog-box">
        <div class="dialog" ref="dialog">
          <div class="has-more-news" v-if="isShowMoreNews" @click="getMore"><span>查看更多消息</span></div>
          <div class="has-more-news not_more" v-else>没有多消息了</div>
          <div class="connect-div">
            <template v-for="item in chatData">
              <div class="left-massage" v-if="item.msgPosition === 'left'">
                <div class="title">
                  <div class="pic">{{item.userName|titleSize}}</div>
                  <div class="text">{{item.userName}}</div>
                  <div class="time">{{item.sendTime}}</div>
                </div>
                <div class="content">
                  {{item.chatContent}}
                </div>

                <template v-if="item.appFileVoList && item.appFileVoList.length !== 0">
                  <div class="down-content" v-for="item in item.appFileVoList" :key="item.fileId">
                    附件：{{item.fileName}}.{{item.fileType}}
                    <button class="down-btn" @click="downHandle(item.fileUrl)">下载</button>
                  </div>
                </template>
              </div>

              <div class="right-massage" v-if="item.msgPosition === 'right'">
                <div class="title">
                  <img class="del-icon" :src="del_icon" @click="delChat(item)"/>
                  <div class="time">{{item.sendTime}}</div>
                  <div class="text">{{item.userName}}</div>
                  <div class="pic">{{item.userName|titleSize}}</div>
                </div>
                <div class="content">
                  {{item.chatContent}}
                </div>
                <template v-if="item.appFileVoList &&item.appFileVoList.length !== 0">
                  <div class="down-content" v-for="item in item.appFileVoList" :key="item.fileId">
                    附件：{{item.fileName}}{{item.fileType}}
                    <button class="down-btn" @click="downHandle(item.fileUrl)" v-preventReClick>下载</button>
                  </div>
                </template>
              </div>


            </template>
          </div>
        </div>

        <div class="dialog-input" ref="dialogInput">
          <el-input
            autofocus="true"
            class="text-input"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            placeholder="输入沟通内容..."
            v-model="chatContent"
            @keydown.native="handleKeyCode($event)"
          >
          </el-input>
          <div class="btn-group">
            <div slot="footer" class="dialog-footer" style="width: 50%;">
              <el-upload action="#"
                         class="upload-box upload-box-width"
                         :auto-upload="false"
                         :file-list="fileTemp"
                         :on-remove="handleRemove"
                         :on-change="fileChange"
              >
                <el-button type="info" class="update-files-btn">附件上传<i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </div>
            <div style="display: flex;align-items: center;">
              <span class="send-tap">Enter发送，Ctrl+Enter换行</span>
              <el-button class="send-btn" type="primary" @click="sendData">发 送</el-button>
            </div>
          </div>
        </div>

      </div>
    </el-dialog>

    <!--设置业务员-->
    <el-dialog title="设置业务员" :visible.sync="batchChangeDialogVisible" width="30%">
      <el-select filterable clearable multiple style="width: 100%" class="filter-item" v-model="batchChangeFrom.userId"
                 placeholder="选择关联业务员">
        <el-option v-for="item in personList" :key="item.userId + Math.random()"
                   :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="batchChangeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBatchChange(0)">确 定</el-button>
      </span>
    </el-dialog>

    <!--设置项目员-->
    <el-dialog title="设置项目员" :visible.sync="batchChangeProjectDialogVisible" width="30%">
      <el-select filterable clearable style="width: 100%" class="filter-item" v-model="batchChangeFrom.userId"
                 placeholder="选择关联项目人员">
        <el-option v-for="item in personList" :key="item.userId + Math.random()" :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="batchChangeProjectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBatchChange(1)">确 定</el-button>
      </span>
    </el-dialog>

    <!--设置项目员-->
    <el-dialog title="设置知识产权工程师" :visible.sync="IntellectualDialogVisible" width="30%">
      <el-select filterable clearable style="width: 100%" class="filter-item" v-model="batchChangeFrom.userId"
                 placeholder="选择关联项目人员">
        <el-option v-for="item in personList" :key="item.userId + Math.random()" :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="IntellectualDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBatchChange(2)">确 定</el-button>
      </span>
    </el-dialog>

    <!--设置审计人员-->
    <el-dialog title="关联审计人员" :visible.sync="auditDialogVisible" width="30%">
      <el-select clearable filterable style="width: 100%" class="filter-item" v-model="batchChangeFrom.userId"
                 placeholder="选择关联审计人员">
        <el-option v-for="item in personList" :key="item.userId + Math.random()" :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="auditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBatchChange(3)">确 定</el-button>
      </span>
    </el-dialog>


    <!--设置导出字段-->
    <el-dialog title="请选择导出字段" :visible.sync="exportDialogVisible" width="600px">


      <!-- {{item}}- -->
      <el-checkbox-group v-model="radioChoose" class="checkboxChoose" @change="checkChoose">
        <el-checkbox v-for="(item, key, index ) in exportChoose" :label="item.fieldName" disabled :key="index">{{key}}
        </el-checkbox>
        <el-checkbox v-for="(item, key, index ) in exportOther" :label="item.fieldName" :key="index">{{key}}
        </el-checkbox>
        <el-checkbox v-for="(item, key, index ) in exportNumber" :label="item.fieldName" :key="index">{{key}}
        </el-checkbox>
        <el-checkbox v-for="(item, key, index ) in exportPeople" :label="item.fieldName" :key="index">{{key}}
        </el-checkbox>
      </el-checkbox-group>
      <div class="Choose"></div>
      <el-checkbox-group v-model="radioAllChoose" :indeterminate="isIndeterminate" class="checkboxChoose"
                         @change="allChoose">
        <el-checkbox label="全选"> 全选</el-checkbox>
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
            <el-button @click="exportDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="exportChooseShow">确 定</el-button>
          </span>
    </el-dialog>
  </div>

</template>

<script>
  import {
    queryCrmCompanyInfo,
    deleteCrmCompanyInfo,
    batchFollowUser,
    queryUserComboInfo,
    putCompanyToFreeSea,
    updateCrmCompanyIsProxy,
    exportCrmCompanyInfo,
    getCrmCompanyInfoTemplate,
    importCrmCompanyInfoList,
    batchGrabCompany,
    checkCompnayCodeExist,
    queryCompanyContactInfo,
    getExcelExportField
  } from '@/api/customerCenter'

  import {
    saveSalePlan,
    queryCrmCompanyInfoByCommon,
    queryAllProjectBySalePlan,
    querySalePlanListByEnterpriseDimension,
    saveSalePlanBatch,
  } from '@/api/sale_plan'
  import {queryMessageList, deleteChatById, addChat, addChatFile,importCrmCompanyPersonnel,getCrmCompanyPersonnelTemplate} from '@/api/messageCenter'
  import {
    commonDict,
    commonDictOfRegion,
    batchQueryCompanyInfoFromQichacha,
    batchQueryIntellectualPropertyRights,
    downloadCrm,
    queryTaskProcessInfo
  } from '@/api/utils'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import del_icon from '../../../../static/del_icon.png'
  import {queryPolicyApprovalList} from '@/api/approval'
  import {getNowTime} from '@/utils/auth'


  var year_sales_list = [
    {key: '0,1000', value: '1000万以下', min: 0, max: 10000000, id: 1},
    {key: '1000,2000', value: '1000万-2000万', min: 10000000, max: 20000000, id: 2},
    {key: '2000,5000', value: '2000万-5000万', min: 20000000, max: 50000000, id: 3},
    {key: '5000,20000', value: '5000万-2亿', min: 50000000, max: 200000000, id: 4},
    {key: '20000,', value: '2亿及以上', min: 200000000, max: 1000000000, id: 5}
  ]
  var corporate_income_tax_list = [
    {key: '0,1000000', value: 'X<=100万'},
    {key: '1000000,5000000', value: '100万<X<=500万'},
    {key: '5000000,10000000', value: '500万<X<=1000万'},
    {key: '10000000,20000000', value: '1000万<X<=2000万'},
    {key: '20000000,30000000', value: '2000万<X<=3000万'},
    {key: '30000000,50000000', value: '3000万<X<=5000万'},
    {key: '50000000,100000000', value: '5000万<X<=1亿'},
    {key: '100000000,', value: 'X>1亿'}
  ]
  var total_tax_list = [
    {key: '0,1000000', value: 'X<=100万'},
    {key: '1000000,5000000', value: '100万<X<=500万'},
    {key: '5000000,10000000', value: '500万<X<=1000万'},
    {key: '10000000,20000000', value: '1000万<X<=2000万'},
    {key: '20000000,30000000', value: '2000万<X<=3000万'},
    {key: '30000000,50000000', value: '3000万<X<=5000万'},
    {key: '50000000,100000000', value: '5000万<X<=1亿'},
    {key: '100000000,', value: 'X>1亿'}
  ]
  var RDequipment_original_value_list = [
    {key: '0,10000000', value: '1000万以下'},
    {key: '10000000,20000000', value: '1000万<=X<2000万'},
    {key: '20000000,50000000', value: '2000万<=X<5000万'},
    {key: '50000000,100000000', value: '5000万<=X<1亿'},
    {key: '100000000,', value: '1亿及以上'}
  ]
  var PRequipment_original_value_list = [
    {key: '0,10000000', value: '1000万以下'},
    {key: '10000000,20000000', value: '1000万<=X<2000万'},
    {key: '20000000,50000000', value: '2000万<=X<5000万'},
    {key: '50000000,100000000', value: '5000万<=X<1亿'},
    {key: '100000000,', value: '1亿及以上'}
  ]
  var research_development_expense_ratio_list = [
    {key: '3,4', value: '4%>X>=3%'},
    {key: '4,5', value: '5%>X>=4%'},
    {key: '5,', value: 'X>=5%'}
  ]
  var order_list = [
    {'label': '客户级别倒序', 'value': 'company.companyLevel', type: 'DESC'},
    {'label': '客户级别顺序', 'value': 'company.companyLevel', type: 'ASC'},
    {'label': '成立时间倒序', 'value': 'company.setupDate', type: 'DESC'},
    {'label': '成立时间顺序', 'value': 'company.setupDate', type: 'ASC'},
    {'label': '注册资金倒序', 'value': 'syscompany.registerMoney', type: 'DESC'},
    {'label': '注册资金顺序', 'value': 'syscompany.registerMoney', type: 'ASC'},
    {'label': '录入时间倒序', 'value': 'company.createTime', type: 'DESC'},
    {'label': '录入时间顺序', 'value': 'company.createTime', type: 'ASC'},

  ]

  import {getDepartmentTree} from '@/api/department.js'

  export default {
    props: {},
    data() {
      return {
        del_icon,
        btnFlag: 0,
        checked: '',
        more_condition: false,
        listLoading: false,
        click_more_condition: false,
        high_tech_click: false,
        project_center_type_click: false,
        tech_center_type_click: false,
        host: process.env.BASE_API,
        select_conditions_list: {}, // 选中的条件
        list: [],
        cur_list: [],
        check_biz_ids: [],
        total: 0,
        count: 0,
        listQuery: {
          page: 0,
          pageSize: 20,
          companyPosition: []
        },
        //获取导出企业字段
        exportField: {
          companyId: []
        },
        exportDialogVisible:false,
        exportChoose:{},

        exportPeople:{},
        exportDefault:{},
        exportNumber:{},
        exportOther:{},
        radioAllChoose:[],
        radioChoose:[],
        choosenum:0,
        isIndeterminate:  false,

        //新增弹窗
        addSaleDialogVisible: false,
        order_list: order_list,
        industry_involved_list: [], // 行业
        filter_department_list: [], // 部门
        filter_user_list: [], // 员工
        is_new_or_not_list: [{'label': '老客户', 'value': 1}, {'label': '新客户', 'value': 0}], // 新老客户
        sign_customer_list: [{'label': '签单客户', 'value': 1}, {'label': '潜在客户', 'value': 0}], // 是否签单
        customer_classification_list: [], // 客户分类
        options1: [{label: '中级职称', value: 1}, {label: '高级职称', value: 2}], // 职称
        options2: [{label: '大专', value: 1}, {label: '本科', value: 2}, {label: '硕士', value: 3}, {label: '博士', value: 4}], // 学历
        positionList: [{label: '公海', value: 1}, {label: '私海', value: 0}],//位置
        projectLevelList: [
          {label: '国家级', value: 1},
          {label: '省级', value: 2},
          {label: '市级', value: 3},
          {label: '区县级', value: 4},
          {label: '镇街级', value: 5}
        ],
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        ent_tech_type_list: [],
        project_list: [],
        employee_scale_list: [],
        reviewer_user_list: [],
        project_user_list: [],
        audit_user_list: [],
        projectList: [],
        titleSeriesList: [],
        projectForm: {
          page: 0,
          pageSize: 20,
          orderField:'sales',
          orderType: 'DESC'
        },
        loading: false,
        year_sales_list: year_sales_list,
        //批量新增
        addMoreSale: [],
        corporate_income_tax_list: corporate_income_tax_list,
        RDequipment_original_value_list: RDequipment_original_value_list,
        PRequipment_original_value_list: PRequipment_original_value_list,
        research_development_expense_ratio_list: research_development_expense_ratio_list,
        total_tax_list: total_tax_list,
        // 跟进消息
        upload_url: '/core/upload-files-api/',
        uploadData: {save_path: 'enterprise_info/enterprise_chat/'},
        fileList: [],
        ConnectContentDialogVisible: false,
        connectList: [],
        connectListQuery: {
          page: 0,
          pageSize: 20,
        },
        connectTotal: 0,
        connectContentForm: {},
        // 批量关联业务员
        batchChangeDialogVisible: false,
        batchChangeFrom: {},
        // 批量关联项目员
        batchChangeProjectDialogVisible: false,
        batchChangeProjectFrom: {},
        // 批量关联审计人员
        auditDialogVisible: false,
        IntellectualDialogVisible:false,
        auditForm: {},
        // 默认工时
        hourForm: {},
        hourRules: {},
        level: 3,
        parentId: 0,
        companyTypeList: [],
        technologyTypeList: [],
        companyScaleList: [],
        jobProfessionalList: [],
        syName: '',
        enterprise_annual_sales_list: [
          {value: '1000万以下', min: 0, max: 10000000},
          {value: '1000万-2000万', min: 10000000, max: 20000000},
          {value: '2000万-5000万', min: 20000000, max: 50000000},
          {value: '5000万-2亿', min: 50000000, max: 200000000},
          {value: '2亿以上', min: 200000000, max: 10000000000}
        ],
        personList: [],
        salePersonList: [],
        isPrivate: "",
        isPublic: "",
        companyOrPersonal: "",
        isChannel: "",
        positionCheckList: [
          {keys: 1, name: '私海'},
          {keys: 2, name: '公海'},
          {keys: 3, name: '个人'},
          {keys: 4, name: '渠道'},
        ],

        //跟进--获取列表信息参数
        searchForm: {
          companyId: "",
          page: 0,
          pageSize: 10,
          labelValue: 1,
        },
        //跟进--对话窗口数据
        chatData: [],
        //跟进--判断是否显示查看更多
        isShowMoreNews: true,
        //跟进--消息内容
        chatContent: "",
        //跟进--文件存
        fileTemp: [],

        limitNum: 1,
        importFileList:[],
        importFileTemp: '',

        importUserList:[],
        importUserTemp: '',

        patentExpire:[
          {label: '一周内到期', value: 7},
          {label: '两周内到期', value: 14},
          {label: '一月内到期', value: 30},
          // {label: '已经超期', value: -1}
        ],
        trademarkExpire:[
          {label: '一周内到期', value: 7},
          {label: '一月内到期', value: 30},
          {label: '三月内到期', value: 90},
          {label: '半年内到期', value: 182},
          {label: '一年内到期', value: 365},
          {label: '已经超期', value: -1},
        ],
        exportShow:false,
        exportFailShow:false,
        exportSuccessShow:false,
        exportFailMsg: {},
        exportSuccessMsg: {},


        // <!-------  新增\变更---弹窗  -------->
        //输入的数据
        updateForm: {
          crmCompanyId: "",
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
        //目标客户总数
        companyTotalList: null,
        //推广项目列表
        projectWriteList: [],
        //计划实施日期设置默认值
        timeDefaultShow: "",
        //目标客户参数
        targetUserParam: {
          page: 0,
          pageSize: 10,
        },
        //目标客户总数
        targetUserTotal: null,
        //推广项目参数
        projectByParam: {
          page: 0,
          pageSize: 10
        },
        projectByParamTotal: null,
        //当前选中的新增/编辑类型
        selectUserOrProject: null,

        isAgailCompanyId: '',

        //新增弹窗
        addSaleDialogVisible: false,
        //批量新增
        addMoreSale: [],
        //批量新增--表格获取第几条
        saleIndex: '',


        // <!-------  实施---弹窗  -------->
        //隐藏\显示--弹窗
        implementVisible: false,
        //输入的数据
        implementForm: {
          executeResult: [],
          executeTime: "",
          executeModalSelect: [],
        },
        executeModalSelect: [],
        //输入框监听
        implementRules: {
          executeTime: [
            {required: true, message: '请选择实际实施时间', trigger: 'blur'}
          ],
          executeType: [
            {required: true, message: '请选择实施类别', trigger: 'blur'}
          ],
          executeModalSelect: [
            {required: true, message: '请选择实施效果', trigger: 'blur'}
          ],
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

        yearList:[],
        nowProject: false,
        alreadyProject: false,
        projectIds:[],
        projectLevels:[],
        projectYears:[],

        //专利类型
        patentList:[],
        allowAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:INSERT','SYSTEM:CUSTOMER:SALEPLAN:INSERT'),//新增企业客户// 新增销售计划
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:UPDATE'),//编辑企业客户
        allowDelete: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:DELETE'),//删除企业客户
        allowDetail: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:DETAILS'),//查询企业客户信息
        allowGetCustomerList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:LIST'),//查询客户企业信息-下拉列表
        allowGetRoleUserList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:ROLE:USER:LIST'),//获取指定角色用户列表
        allowBatchFollowUser: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:BATCHFOLLOWUSER'),//批量修改客户企业跟进人员

        allowBatchEngineer: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:BATCH:EDIT:ENGINEER'),//批量设置项目员
        allowBatchIntellectualEngineer: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:BATCH:EDIT:INTELLECTUAL:ENGINEER'),//批量设置专利员
        allowBatchAuditor: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:BATCH:EDIT:AUDITOR'),//批量设置审计员

        allowSyncIntellectual: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:BATCHSYNCINTELLECTUALPROPERTYRIGHTS'),//批量同步企业知识产权
        allowBatchCompanyInfo: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:BATCHSYNCCOMPANYINFO'),//批量同步企业信息
        allowIsproxy: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:COMPANYISPROXY:UPDATE'),//设置/取消渠道
        allowAddSyncQiChaCha: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:SYNCQICHACHA:ADDCOMPANY'),//新增企业页面同步企查查
        allowDetailApproval: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:DETAIL:APPROVALLIST'),//查询客户详情-立项信息
        allowDetailContract: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:DETAIL:CONTRACTINFO'),//查询客户详情-合同信息
        allowDetailOrder: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:DETAIL:ORDERINFO'),//查询客户详情-订单信息
        allowDetailAddWeb: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:ADD'),//新增网站帐号
        allowDetailEditWeb: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:EDIT'),//变更网站帐号
        allowDetailWebDetail: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:DETAILS'),//查询网站帐号详情信息
        allowDetailWebDelete: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:DELETE'),//删除网站帐号记录[批量]
        allowDetailWebList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:LIST'),//查询网站帐号列表
        allowAddPerson: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMERPERSON:INSERT'),//新增个人客户
        allowPutCompanyToFreesesea: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:PUTCOMPANYTOFREESEA'),//投入公海
        allowbatchGrabCompany: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:BATCHGRABCOMPANY'),//抢客户

        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
        allowGetCompanyList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:COMPANY:LIST'),//查询客户企业信息-下拉列表
        allowGetProjectList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:PROJECT:LIST'),//查询项目列表
        allowSyncPolicyApprovalList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:SYNCPOLICYAPPROVALLIST'),//同步立项数据

        toUserId:0, //消息接收人id
        toUserName:'',
        toCompanyId:0, //消息接收人公司ID
        fromcompanyId:0, //消息发出人公司ID
        showFour: false,
      }
    },

    filters: {
      // 过滤 圈内只显示一个字
      titleSize(val) {
        return val.substring(0, 1);
      },
    },
    activated() {
      this.getCommonData()
      // 私海
      if (localStorage.getItem('customerPosition')) {
        this.select_conditions_list = {};
        this.listQuery = {page: 0, pageSize: 20, companyPosition: []};
        this.$set(this.listQuery, 'companyPosition', [1]);
        this.$set(this.select_conditions_list, 'companyPosition', '位置-私海')
        this.$set(this.listQuery, 'companyName', '')
      }

      if (localStorage.getItem('searchName')) {
        if(localStorage.getItem('searchName') !== ''){
          this.select_conditions_list = {};
          this.listQuery = {page: 0, pageSize: 20, companyPosition: []}
          this.$set(this.listQuery, 'companyName', localStorage.getItem('searchName'));
        }
      }

      if(this.$store.getters.customerTaskMsg && this.$store.getters.customerTaskMsg.taskId){
        this.getTaskInfo();
      }

      if(this.$store.getters.customerPage != 0){
        this.listQuery.page = 0
        this.listQuery.pageSize = this.$store.getters.customerPage + 20
        this.getList();
      }else{
        this.listQuery.page = this.$store.getters.customerPage
        this.listQuery.pageSize = 20
        this.getList();
      }

      window.addEventListener('scroll', this.scrollToTop)

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.customerScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    deactivated() {
      localStorage.removeItem('customerPosition');
      localStorage.removeItem('searchName');
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
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_CUSTOMER_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_CUSTOMER_PAGE', this.listQuery.page) //离开路由时把位置存起来
      next()
    },
    methods: {

      //新增/变更 获取更多目标客户
      loadMore3() {
        this.projectByParam.page += 10
        queryAllProjectBySalePlan(this.projectByParam).then(res => {
          if (res.code == 200) {
            if (this.projectWriteList.length >= res.data.total) {
              return false
            } else {
              this.projectWriteList = this.projectWriteList.concat(res.data.data)
            }
          }
        })
      },

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
      checkChoose(){
        if(this.radioChoose.length == this.choosenum ){
           this.radioAllChoose = ["全选"];
           this.isIndeterminate = true;
          }else{
            this.isIndeterminate = false;
            this.radioAllChoose = [];
          }
      },
      //全选
      allChoose() {
        let that = this
        if (that.radioAllChoose[0] == '全选') {
          this.isIndeterminate = true
          that.radioChoose = []
          Object.keys(that.exportChoose).forEach(function(key) {
            that.radioChoose.push(that.exportChoose[key].fieldName)
          })

          Object.keys(that.exportOther).forEach(function(key) {
            that.radioChoose.push(that.exportOther[key].fieldName)
          })

          Object.keys(that.exportNumber).forEach(function(key) {
            that.radioChoose.push(that.exportNumber[key].fieldName)
          })

          Object.keys(that.exportPeople).forEach(function(key) {
            that.radioChoose.push(that.exportPeople[key].fieldName)
          })

        } else {
          this.isIndeterminate = false
          that.radioChoose = []
          Object.keys(that.exportChoose).forEach(function(key) {
            that.radioChoose.push(that.exportChoose[key].fieldName)
          })
        }
      },
      //检测导入的文件是否上传完成
      getTaskInfo(){
        queryTaskProcessInfo({taskId: this.$store.getters.customerTaskMsg.taskId}).then(res=>{
          if(res.code == 200){
            if(res.data.taskStatus == 'FAILURE'){
              let taskMsg = {
                taskId: res.data.taskId,
                taskMessage: res.data.taskMessage,
                taskTitle: res.data.taskType,
                taskStatus: res.data.taskStatus
              }
              this.exportShow = false;
              this.exportFailShow = true;
              this.exportSuccessShow = false;
              this.exportFailMsg = taskMsg;
              this.$store.commit('SET_CUSTOMER_TASKMSG', taskMsg);
            }else if(res.data.taskStatus == 'SUCCESS'){
              let taskMsg = {
                taskId: res.data.taskId,
                taskMessage: res.data.taskMessage,
                taskTitle: res.data.taskType,
                taskStatus: res.data.taskStatus
              }
              this.exportShow = false;
              this.exportFailShow = false;
              this.exportSuccessShow = true;
              this.exportFailMsg = {};
              this.exportSuccessMsg = taskMsg;
              this.$store.commit('SET_CUSTOMER_TASKMSG', taskMsg);
            }else{
              this.exportShow = false;
              this.exportFailShow = false;
              this.exportSuccessShow = false;
              this.exportFailMsg = {};
              this.exportSuccessMsg = {};
              this.$store.commit('SET_CUSTOMER_TASKMSG', {});
            }
          }
        })
      },

      //关闭失败提示
      closeExportFail(){
        this.exportShow = false;
        this.exportFailShow = false;
        this.exportSuccessShow = false;
        this.exportFailMsg = {};
        this.$store.commit('SET_CUSTOMER_TASKMSG', {});
      },

      //关闭成功提示
      closeExportSuccess(){
        this.exportShow = false;
        this.exportFailShow = false;
        this.exportSuccessShow = false;
        this.exportSuccessMsg = {};
        this.$store.commit('SET_CUSTOMER_TASKMSG', {});
      },

      // 获取职称系列
      getTitleSeries() {
        queryTitleSeriesOrLevel().then(res =>{
          if (res.code === 200){
            this.titleSeriesList = res.data
          }
        })
      },

      // 筛选职称系列
      changeTitleSeries(val) {
        const arr = []
        if (val.length != 0) {
          this.titleSeriesList.forEach(item => {
            val.forEach(val => {
              if (item.dictId == val) {
                arr.push(item.dictName)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'titleSeriesList', `职称系列 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_conditions_list, 'titleSeriesList')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      // 开始搜索
      goSearch() {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
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
      //获取更多
      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },
      // 查看
      toCheck(data) {
        sessionStorage.setItem('listQuery', JSON.stringify(this.listQuery))
        sessionStorage.setItem('selectConditionsList', JSON.stringify(this.select_conditions_list))
        if(this.allowDetail.twoAllow){
          this.$router.push({'path': '/customer/editCustomer', 'query': {'id': data.crmCompanyId, 'check': false,'tip':true}})
        }else{
          this.$message.warning('抱歉，您没有权限查看详情')
        }

      },
      // 编辑
      handleUpdate(data) {
        this.$router.push({
          'path': '/customer/editCustomer',
          'query': {'id': data.crmCompanyId,'tip':true, 'check': true, 'is_personal': data.companyOrPersonal == 1 ? true : false}
        })
      },
      // 新增
      toCreate(is_personal) {
        sessionStorage.setItem('listQuery', JSON.stringify(this.listQuery))
        sessionStorage.setItem('selectConditionsList', JSON.stringify(this.select_conditions_list))
        if (is_personal == false) {
          this.$router.push({'path': '/customer/addCustomer', 'query': {'is_personal': is_personal, check: true}})
        } else {
          this.$router.push({'path': '/customer/addCustomerPerson', 'query': {'is_personal': is_personal, check: true}})
        }
      },
      // 去专利
      toPatent(id) {
        this.$router.push({'path': '/ipr/patent_info/list', 'query': {'ent_biz_id': id}})
      },
      // 去商标
      toTrademark(id) {
        this.$router.push({'path': '/ipr/trademark_mng/list', 'query': {'ent_biz_id': id}})
      },
      // 去著作权
      toCopyright(id) {
        this.$router.push({'path': '/ipr/copyright_info/list', 'query': {'ent_biz_id': id}})
      },
/*
      // 去消息中心沟通
      toChatList(data, userType) {
        // 项目人员
        if (data.business_manager__biz_id && userType === 'business') {
          this.$router.push({'path': '/message-center/list', 'query': {'user__biz_id': data.business_manager__biz_id}})
        } else if (data.project_manager__biz_id && userType === 'project') {
          this.$router.push({'path': '/message-center/list', 'query': {'user__biz_id': data.project_manager__biz_id}})
        } else if (data.audit_manager__biz_id && userType === 'audit') {
          this.$router.push({'path': '/message-center/list', 'query': {'user__biz_id': data.audit_manager__biz_id}})
        }
      },
*/
      // 全选、 反全选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.list.forEach(function (item, index) {
            if (_this.check_biz_ids.indexOf(item.crmCompanyId) === -1) {
              _this.check_biz_ids.push(item.crmCompanyId)
            }
            _this.isCheckAll = true
          })
        }
      },
      // 排序
      handleOrder(e) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.order_list.forEach((item, index) => {
          if (index == e) {
            this.listQuery.orderField = item.value;
            this.listQuery.orderType = item.type;
          }
        })
        this.getList()
      },
      handleClearSort() {
        this.listQuery.orderField = "";
        this.listQuery.orderType = "";
        this.getList()
      },
      // 清空一个
      deleteOneClick(item) {
        this.$delete(this.select_conditions_list, item)
        this.$delete(this.listQuery, item)
        if (item === 'is_high_tech_or_not') {
          this.high_tech_click = false
        }
        if (item === 'project_center_type') {
          this.project_center_type_click = false
        }
        if (item === 'tech_center_type') {
          this.tech_center_type_click = false
        }
        if(item == 'deptIds'){
          this.getPersonList('业务员,业务主管','',true)
        }
        if(item == 'projectIds'){
          this.projectIds = [];
          this.listQuery.nowReportProjectIds = [];
          this.listQuery.alreadyReportProjectNames = [];
        }
        if(item == 'projectLevels'){
          this.projectLevels = [];
          this.listQuery.nowReportProjectLevelList = [];
          this.listQuery.alreadyReportProjectLevelList = [];
        }
        if(item == 'projectYears'){
          this.projectYears = [];
          this.listQuery.nowReportProjectYearList = [];
          this.listQuery.alreadyReportProjectYearList = [];
        }
        // if (item === 'public_sea1') {
        //   this.$set(this.listQuery, 'public_sea1', false)
        // }
        // if (item === 'public_sea2') {
        //   this.$set(this.listQuery, 'public_sea2', false)
        // }
        // if (item === 'public_sea3') {
        //   this.$set(this.listQuery, 'public_sea3', false)
        // }
        // if (item === 'public_sea4') {
        //   this.$set(this.listQuery, 'public_sea4', false)
        // }
        if (item === 'companyPosition') {
          this.$set(this.listQuery, 'companyPosition', [])
        }
        localStorage.removeItem('customerPosition')
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 清空所有
      deleteAllClick() {
        this.select_conditions_list = {}
        this.projectIds = [];
        this.projectLevels = [];
        this.projectYears = [];
        this.getPersonList('业务员,业务主管','',true)
        this.listQuery = {
          page: 0,
          pageSize: 20,
          companyPosition: []
        }
        this.getList()
      },
      // 筛选更多条件
      getMoreCondition() {
        this.more_condition = !this.more_condition
        if (!this.click_more_condition) {
          this.click_more_condition = true
        }
        this.salePersonList = [];
        this.getProjectList();
        this.getCompanyList()
        this.getRegionList();
        this.getAllYearList();
        this.getTitleSeries();
        this.getPersonList('业务员,业务主管','',true)
      },
      highTechClick() {
        this.high_tech_click = !this.high_tech_click
        if (this.high_tech_click) {
          this.$set(this.select_conditions_list, 'is_high_tech_or_not', '高企')
          this.listQuery.is_high_tech_or_not = this.high_tech_click
        } else {
          this.$delete(this.select_conditions_list, 'is_high_tech_or_not')
          this.$delete(this.listQuery, 'is_high_tech_or_not')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      projectCenterTypeClick() {
        this.project_center_type_click = !this.project_center_type_click
        if (this.project_center_type_click) {
          this.$set(this.select_conditions_list, 'project_center_type', '工程中心')
          this.listQuery.project_center_type = this.project_center_type_click
        } else {
          this.$delete(this.select_conditions_list, 'project_center_type')
          this.$delete(this.listQuery, 'project_center_type')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      techCenterTypeClick() {
        this.tech_center_type_click = !this.tech_center_type_click
        if (this.tech_center_type_click) {
          this.$set(this.select_conditions_list, 'tech_center_type', '技术中心')
          this.listQuery.tech_center_type = this.tech_center_type_click
        } else {
          this.$delete(this.select_conditions_list, 'tech_center_type')
          this.$delete(this.listQuery, 'tech_center_type')
        }
        this.listQuery.page = 0
        this.getList()
      },
      //选择部门
      handleFilterDepartment(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.filter_department_list.forEach(item => {
              if (item.deptId == val) {
                arr.push(item.deptName)
              }
            })

            const string = arr.join('，')
            this.$set(this.select_conditions_list, 'deptIds', `部门 - ${string}`)
          })
        } else {
          this.$delete(this.select_conditions_list, 'deptIds')
          this.$delete(this.select_conditions_list, 'userIds')
          this.salePersonList = [];
        }

        this.getPersonList('业务员,业务主管',val,true)
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //选择业务人员
      handleFilterUser(val) {
        const arr = []
        if (val.length != 0) {
          this.salePersonList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'userIds', `业务员-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_conditions_list, 'userIds')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //所属行业
      handleFilterInvolved(val) {
        const arr = []
        if (val.length != 0) {
          this.industry_involved_list.forEach(item => {
            val.forEach(val => {
              if (item.dictId == val) {
                arr.push(item.dictName)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'businessIds', `所属行业 - ${string}`)
              }
            })
          })
          // this.$set(this.select_conditions_list, 'industry_involved', '所属行业 - ' + this.industry_involved_list.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.select_conditions_list, 'businessIds')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //成立年份
      handleFilterEntYear(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'setUpTheYear', '成立年份 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'setUpTheYear')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //选择项目
      handleFilterProjectName(val) {
        // if(!this.nowProject && !this.alreadyProject){
        //   this.listQuery.projectIds = [];
        //   this.listQuery.projectNames = []
        //   this.$message.error('请勾选在报或者已报，否则无法搜索')
        //   return;
        // }
        const arr = []
        this.listQuery.projectNames = []
        // this.listQuery.alreadyReportProjectNames = [];
        // this.listQuery.nowReportProjectIds = [];
        if (val.length != 0) {
          this.projectList.forEach(item => {
            val.forEach(val => {
              if (item.projectId == val) {
                arr.push(item.projectName)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'projectIds', `项目名称-${string}`)
                this.listQuery.projectNames.push(item.projectName)
                // if(this.nowProject == true){
                //   this.listQuery.nowReportProjectIds.push(item.projectId)
                // }
                // if(this.alreadyProject == true){
                //   this.listQuery.alreadyReportProjectNames.push(item.projectName)
                // }
              }
            })
          })
          // this.showFour = false;
        } else {
          this.$delete(this.select_conditions_list, 'projectIds')
          this.$delete(this.listQuery, 'projectNames')
          // if(this.listQuery.projectIds.length == 0 && this.listQuery.projectLevels.length == 0 && this.listQuery.projectYears.length == 0){
          //   // this.showFour = true;
          //   this.nowProject = false;
          //   this.alreadyProject = false;
          //   this.$delete(this.listQuery, 'searchNowReport')
          //   this.$delete(this.listQuery, 'searchAlreadyReport')
          // }
          // this.$delete(this.listQuery,'nowReportProjectIds')
          // this.$delete(this.listQuery, 'alreadyReportProjectNames')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //项目级别
      handleFilterProjectLevel(val) {
        // if(!this.nowProject && !this.alreadyProject){
        //   this.projectLevels = [];
        //   this.$message.error('请勾选在报或者已报，否则无法搜索')
        //   return;
        // }
        const arr = []
        if (val.length != 0) {
          this.projectLevelList.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'projectLevels', `项目级别-${string}`)
              }
            })
          })

          // if(this.nowProject == true){
          //   this.listQuery.nowReportProjectLevelList = val
          // }
          // if(this.alreadyProject == true){
          //   this.listQuery.alreadyReportProjectLevelList = val
          // }
          // this.$set(this.select_conditions_list, 'project_level', '项目级别 - ' + val)
          // this.showFour = false;
        } else {
          this.$delete(this.select_conditions_list, 'projectLevels')
          // if(this.listQuery.projectIds.length == 0 && this.listQuery.projectLevels.length == 0 && this.listQuery.projectYears.length == 0){
          //   // this.showFour = true;
          //   this.nowProject = false;
          //   this.alreadyProject = false;
          //   this.$delete(this.listQuery, 'searchNowReport')
          //   this.$delete(this.listQuery, 'searchAlreadyReport')
          // }
          // this.$delete(this.listQuery,'nowReportProjectLevelList')
          // this.$delete(this.listQuery, 'alreadyReportProjectLevelList')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //项目年度
      handleFilterYear(val) {
        // if(!this.nowProject && !this.alreadyProject){
        //   this.projectYears = [];
        //   this.$message.error('请勾选在报或者已报，否则无法搜索')
        //   return;
        // }
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.yearList.forEach(item => {
              if (item == val) {
                arr.push(item)
              }
            })

            const string = arr.join('，')
            this.$set(this.select_conditions_list, 'projectYears', `项目年度 - ${string}`)
          })

          // if(this.nowProject == true){
          //   this.listQuery.nowReportProjectYearList = val
          // }
          // if(this.alreadyProject == true){
          //   this.listQuery.alreadyReportProjectYearList = val
          // }
          // this.showFour = false;
        } else {
          this.$delete(this.select_conditions_list, 'projectYears')
          // if(this.listQuery.projectIds.length == 0 && this.listQuery.projectLevels.length == 0 && this.listQuery.projectYears.length == 0){
          //   this.showFour = true;
          //   this.nowProject = false;
          //   this.alreadyProject = false;
          //   this.$delete(this.listQuery, 'searchNowReport')
          //   this.$delete(this.listQuery, 'searchAlreadyReport')
          // }
          // this.$delete(this.listQuery,'nowReportProjectYearList')
          // this.$delete(this.listQuery, 'alreadyReportProjectYearList')
        }

        // if (val) {
        //   this.$set(this.select_conditions_list, 'projectYears', '在报项目年度 - ' + val)
        // } else {
        //   this.$delete(this.select_conditions_list, 'projectYears')
        // }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      //选择在报已报
      changeProjectBegin(num){
        if(this.nowProject == true){
          this.listQuery.searchNowReport = 1;
        }else{
          this.$delete(this.listQuery, 'searchNowReport')
        }
        if(this.alreadyProject == true){
          this.listQuery.searchAlreadyReport = 1;
        }else{
          this.$delete(this.listQuery, 'searchAlreadyReport')
        }
        // if(!this.nowProject && !this.alreadyProject){
        //   for(var item in this.select_conditions_list){
        //     this.$delete(this.select_conditions_list, item)
        //   }
        //   this.projectIds = [];
        //   this.projectLevels = [];
        //   this.projectYears = [];
        //   this.listQuery.nowReportProjectIds = [];
        //   this.listQuery.nowReportProjectLevelList = [];
        //   this.listQuery.nowReportProjectYearList = [];
        //   this.listQuery.alreadyReportProjectNames = [];
        //   this.listQuery.alreadyReportProjectLevelList = [];
        //   this.listQuery.alreadyReportProjectYearList = [];
        //   this.$message.error('请勾选其中一个，否则无法搜索')
        //   return;
        // }
        //
        // // if(this.projectIds == '' && this.projectLevels == '' && this.projectYears == ''){
        // //   this.$message.error('请选择项目选项')
        // //   return;
        // // }
        //
        // if(this.nowProject == true){
        //   this.projectList.forEach(item => {
        //     this.projectIds.forEach(val => {
        //       if (item.projectId == val) {
        //         this.listQuery.nowReportProjectIds.push(item.projectId)
        //       }
        //     })
        //   })
        //
        //   this.listQuery.nowReportProjectLevelList = this.projectLevels
        //   this.listQuery.nowReportProjectYearList = this.projectYears
        //
        //   //去重
        //   if(this.listQuery.nowReportProjectIds && this.listQuery.nowReportProjectIds.length != 0){
        //     let obj = {}
        //     this.listQuery.nowReportProjectIds = this.listQuery.nowReportProjectIds.reduce((cur, next) => {
        //       obj[next] ? '' : obj[next] = true && cur.push(next)
        //       return cur
        //     }, [])
        //   }
        // }else{
        //   this.listQuery.nowReportProjectIds = [];
        //   this.listQuery.nowReportProjectLevelList = [];
        //   this.listQuery.nowReportProjectYearList = [];
        // }
        //
        // if(this.alreadyProject == true){
        //   this.projectList.forEach(item => {
        //     this.projectIds.forEach(val => {
        //       if (item.projectId == val) {
        //         this.listQuery.alreadyReportProjectNames.push(item.projectName)
        //       }
        //     })
        //   })
        //
        //   this.listQuery.alreadyReportProjectLevelList = this.projectLevels
        //   this.listQuery.alreadyReportProjectYearList = this.projectYears
        //
        //   //去重
        //   if(this.listQuery.alreadyReportProjectNames && this.listQuery.alreadyReportProjectNames.length != 0){
        //     let obj = {}
        //     this.listQuery.alreadyReportProjectNames = this.listQuery.alreadyReportProjectNames.reduce((cur, next) => {
        //       obj[next] ? '' : obj[next] = true && cur.push(next)
        //       return cur
        //     }, [])
        //   }
        //
        // }else{
        //   this.listQuery.alreadyReportProjectNames = [];
        //   this.listQuery.alreadyReportProjectLevelList = [];
        //   this.listQuery.alreadyReportProjectYearList = [];
        // }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      // handleFilterProjectName2(val) {
      //   const arr = []
      //   if (val.length != 0) {
      //     this.projectList.forEach(item => {
      //       val.forEach(val => {
      //         if (item.projectName == val) {
      //           arr.push(item.projectName)
      //           const string = arr.join('，')
      //           this.$set(this.select_conditions_list, 'alreadyReportProjectNames', `已报项目名称-${string}`)
      //         }
      //       })
      //     })
      //     // this.$set(this.select_conditions_list, 'project_name', '项目名称 - ' + this.project_list.find(ele => ele.biz_id === val).project_name)
      //   } else {
      //     this.$delete(this.select_conditions_list, 'alreadyReportProjectNames')
      //   }
      //   this.listQuery.page = 0
      //   this.listQuery.pageSize = 20
      //   this.getList()
      // },
      // handleFilterProjectLevel2(val) {
      //   const arr = []
      //   if (val.length != 0) {
      //     this.projectLevelList.forEach(item => {
      //       val.forEach(val => {
      //         if (item.value == val) {
      //           arr.push(item.label)
      //           const string = arr.join('，')
      //           this.$set(this.select_conditions_list, 'alreadyReportProjectLevelList', `已报项目级别-${string}`)
      //         }
      //       })
      //     })
      //     // this.$set(this.select_conditions_list, 'project_level', '项目级别 - ' + val)
      //   } else {
      //     this.$delete(this.select_conditions_list, 'alreadyReportProjectLevelList')
      //   }
      //   this.listQuery.page = 0
      //   this.listQuery.pageSize = 20
      //   this.getList()
      // },
      // handleFilterYear2(val) {
      //   const arr = []
      //   if (val.length != 0) {
      //     val.forEach(val => {
      //       this.yearList.forEach(item => {
      //         if (item == val) {
      //           arr.push(item)
      //         }
      //       })
      //
      //       const string = arr.join('，')
      //       this.$set(this.select_conditions_list, 'alreadyReportProjectYearList', `已报项目年度 - ${string}`)
      //     })
      //
      //   } else {
      //     this.$delete(this.select_conditions_list, 'alreadyReportProjectYearList')
      //   }
      //
      //   // if (val) {
      //   //   this.$set(this.select_conditions_list, 'alreadyReportProjectYearList', '立项项目年度 - ' + val)
      //   // } else {
      //   //   this.$delete(this.select_conditions_list, 'alreadyReportProjectYearList')
      //   // }
      //   this.listQuery.page = 0
      //   this.listQuery.pageSize = 20
      //   this.getList()
      // },

      // 近一年销售额范围
      handleFilterYearSales(val) {
        if (val) {
          this.enterprise_annual_sales_list.forEach(item => {
            if (val == item.value) {
              this.$set(this.select_conditions_list, 'year_sales', `近一年销售额 -` + this.enterprise_annual_sales_list.find(ele => ele.value === val).value)
              this.listQuery.companySalesStart = item.min;
              this.listQuery.companySalesEnd = item.max;
            }
          })

          // this.$set(this.select_conditions_list, 'year_sales', '近一年销售额 - ' + this.year_sales_list.find(ele => ele.key === val).value)
        } else {
          this.$delete(this.select_conditions_list, 'year_sales');
          this.listQuery.companySalesStart = '';
          this.listQuery.companySalesEnd = '';
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 省份
      changeProvince(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'provinceId', '省份 - ' + this.province_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'provinceId')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.$delete(this.select_conditions_list, 'cityId')
        this.$delete(this.select_conditions_list, 'districtId')
        this.$delete(this.select_conditions_list, 'townId')
        this.listQuery.cityId = '';
        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.parentId = val
        this.level = 2;
        this.getRegionList()
        this.getList()
      },
      // 市
      changeCity(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'cityId', '城市 - ' + this.city_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'cityId')
        }
        this.$delete(this.select_conditions_list, 'districtId')
        this.$delete(this.select_conditions_list, 'townId')

        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 1;
        this.getRegionList()
        this.getList()
      },
      // 区县
      changeDistrict(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'districtId', '区县 - ' + this.district_list.find(ele => ele.dictId === val).dictName)
          this.$delete(this.select_conditions_list, 'townId')
        } else {
          this.$delete(this.select_conditions_list, 'districtId')
          this.$delete(this.select_conditions_list, 'townId')

          this.listQuery.townId = '';
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 0;
        this.getRegionList()
        this.getList()
      },
      // 镇
      getTownsId(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'townId', '镇街 - ' + this.town_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'townId')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 科技类型
      handleFilterTechType(val) {
        // if (val) {
        //   this.$set(this.select_conditions_list, 'technologyType', '科技类型 - ' + this.technologyTypeList.find(ele => ele.dictId === val).dictName)
        // } else {
        //   this.$delete(this.select_conditions_list, 'technologyType')
        // }
        const arr = []
        if (val.length != 0) {
          this.technologyTypeList.forEach(item => {
            val.forEach(val => {
              if (item.dictId == val) {
                arr.push(item.dictName)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'companyTags', `科技类型 - ${string}`)
              }
            })
          })
          // this.$set(this.select_conditions_list, 'ent_tech_type', '科技类型 - ' + this.ent_tech_type_list.find(ele => ele.dict_code === val).dict_value)
        } else {
          this.$delete(this.select_conditions_list, 'companyTags')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 新老客户
      handleFilterIsNewOrNot(val) {
        if (val != undefined) {
          if (val === '') {
            this.$delete(this.select_conditions_list, 'newOrOld')
          } else {
            this.$set(this.select_conditions_list, 'newOrOld', '新老客户 - ' + this.is_new_or_not_list.find(ele => ele.value === val).label)
          }
        } else {
          this.$delete(this.select_conditions_list, 'newOrOld')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 客户级别
      handleFilterCustomerClassification(val) {
        // const arr = []
        // if (val.length != 0) {
        //   this.customer_classification_list.forEach(item => {
        //     val.forEach(val => {
        //       if (item.dictId == val) {
        //         arr.push(item.dictName)
        //         const string = arr.join('，')
        //         this.$set(this.select_conditions_list, 'companyLevel', `${string}`)
        //       }
        //     })
        //   })
        //   // this.$set(this.select_conditions_list, 'customer_classification', this.customer_classification_list.find(ele => ele.value === val).label)
        // } else {
        //   this.$delete(this.select_conditions_list, 'companyLevel')
        // }
        if (val) {
          this.$set(this.select_conditions_list, 'companyLevel', '客户级别 - ' + this.customer_classification_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'companyLevel')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 是否签单
      handleFilterSignCustomer(val) {
        if (val != undefined) {
          if (val === '') {
            this.$delete(this.select_conditions_list, 'isSigning')
          } else {
            this.$set(this.select_conditions_list, 'isSigning', '是否签单 - ' + this.sign_customer_list.find(ele => ele.value === val).label)
          }
        } else {
          this.$delete(this.select_conditions_list, 'isSigning')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      //专利到期
      handlePatent(val){
        if (val != undefined) {
          if (val === '') {
            this.$delete(this.select_conditions_list, 'patentExpired')
          } else {
            this.$set(this.select_conditions_list, 'patentExpired', '专利到期 - ' + this.patentExpire.find(ele => ele.value === val).label)
          }
        } else {
          this.$delete(this.select_conditions_list, 'patentExpired')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      //商标到期
      handleTrademark(val){
        if (val != undefined) {
          if (val === '') {
            this.$delete(this.select_conditions_list, 'trademarkExpires')
          } else {
            this.$set(this.select_conditions_list, 'trademarkExpires', '商标到期 - ' + this.trademarkExpire.find(ele => ele.value === val).label)
          }
        } else {
          this.$delete(this.select_conditions_list, 'trademarkExpires')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      //人数范围
      handleFilterEmployeeScale(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'personnelScale', '人数范围 - ' + this.employee_scale_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'personnelScale')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //规模
      handleFilterEnterpriseScale(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'companyScale', '规模 - ' + this.companyScaleList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'companyScale')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 学历
      handleFilterOptions2(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'highestEducation', '学历 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'highestEducation')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //职称
      handleFilterOptions1(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'jobProfessional', '职称 - ' + this.jobProfessionalList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'jobProfessional')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      //专利类型
      handlePatentType(val) {
        const arr = []
        if (val.length != 0) {
          this.patentList.forEach(item => {
            val.forEach(val => {
              if (item.dictId == val) {
                arr.push(item.dictName)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'patentTypes', `专利类型 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_conditions_list, 'patentTypes')
        }
        this.getList()
      },

      // 专利数量
      handlePatentNum(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'patentNum', '专利数量 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'patentNum')
        }
        this.getList();
      },

      //商标数量
      handleTrademarkNum(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'trademarkNum', '商标数量 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'trademarkNum')
        }
        this.getList();
      },

      //软著数量
      handleCopyrightNum(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'copyrightNum', '软著数量 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'copyrightNum')
        }
        this.getList();
      },

      //客户位置
      handleCompanyPosition(val) {
        if (val != undefined) {
          if (val === '') {
            this.$delete(this.select_conditions_list, 'companyPosition')
          } else {
            this.$set(this.select_conditions_list, 'companyPosition', `客户位置 - ` + this.positionList.find(ele => ele.value === val).label)
          }
        } else {
          this.$delete(this.select_conditions_list, 'companyPosition')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      //私海
      handleFilterPublicSea1(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'companyPosition', '私海');
          this.listQuery.isPrivate = 1;
        } else {
          this.$delete(this.select_conditions_list, 'companyPosition');
          this.$delete(this.listQuery, 'isPrivate');
          this.isPrivate = false
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //公海客户
      handleFilterPublicSea2(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'public_sea2', '公海客户');
          this.listQuery.isPublic = 1;
        } else {
          this.$delete(this.select_conditions_list, 'public_sea2');
          this.$delete(this.listQuery, 'isPublic');
          this.isPrivate = false
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      //选择个人
      handleFilterPublicSea3(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'public_sea3', '个人')
          this.listQuery.companyOrPersonal = 1
        } else {
          this.$delete(this.select_conditions_list, 'public_sea3')
          this.$delete(this.listQuery, 'companyOrPersonal');
          this.isPrivate = false
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 渠道
      handleFilterPublicSea4(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'public_sea4', '渠道')
          this.listQuery.isChannel = 1
        } else {
          this.$delete(this.select_conditions_list, 'public_sea4')
          this.$delete(this.listQuery, 'isChannel');
          this.isPrivate = false
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      // 获取列表数据
      getList() {
        this.$delete(this.listQuery, 'companyFindingDuplicate');
        queryCrmCompanyInfo(this.listQuery).then(response => {
          if (response.code == 200) {
            if (this.listQuery.page > 0) {
              this.list = this.list.concat(response.data.data);
              this.total = response.data.total;
            } else {
              this.list = response.data.data;
              this.total = response.data.total;

              if(this.$store.getters.customerPage != 0){
                this.listQuery.page = this.$store.getters.customerPage;
                this.listQuery.pageSize = 20;
              }

              this.check_biz_ids = [];
            }

            this.list.forEach(val => {
              if (val.companyOrPersonal == 1) {
                // if(val.companyPersonnelVoList.length > 1){
                //   this.$message.warning('系统繁忙，个人用户信息错误');
                //   throw new Error();
                // }
                val.companyPersonnelVoList.forEach(item => {
                  val.birthDate = item.birthDate;
                  val.idCard = item.idCard;
                  val.nativePlace = item.nativePlace;
                  val.personnelId = item.personnelId;
                  val.personnelMobile = item.personnelMobile;
                  val.personnelSex = item.personnelSex;
                })
              }

              if(this.customer_classification_list){
                this.customer_classification_list.forEach(item => {
                  if (val.companyLevel == item.dictId) {
                    val.companyLevelName = item.dictName
                  }
                })
              }

              if(this.enterprise_annual_sales_list){
                this.enterprise_annual_sales_list.forEach(item => {
                  if (val.companySales && val.companySalesMax) {
                    if (item.min == val.companySales && item.max == val.companySalesMax) {
                      val.companySalesName = item.value;
                    }
                  }
                })
              }

              if(this.industry_involved_list){
                this.industry_involved_list.forEach(item => {
                  if (val.industryInvolved == item.dictId) {
                    val.industryInvolvedName = item.dictName;
                  }
                })
              }
            })

            let obj = {}
            this.list = this.list.reduce((cur, next) => {
              obj[next.crmCompanyId] ? '' : obj[next.crmCompanyId] = true && cur.push(next)
              return cur
            }, [])
          } else {
            this.$message.warning(response.message)
          }
        })
      },
      getProvinces() {
        // getProvince({}).then(response => {
        //   this.province_list = response.data.provinces
        // })
      },
      // areaSetNull(level) {
      //   if (level === 3) {
      //     this.listQuery.cityId = ''
      //     this.citys = []
      //   }
      //   if (level >= 2) {
      //     this.listQuery.districtId = ''
      //     this.districts = []
      //   }
      //   if (level >= 1) {
      //     this.listQuery.townId = ''
      //     this.towns = []
      //   }
      // },
      // 企业查重
      goCheckEntIsUnique() {
        if(this.listQuery.companyName == '' || this.listQuery.companyName == undefined){
          this.$message.warning('请输入企业全称或者统一社会信用代码');
          return;
        }
        checkCompnayCodeExist({companyCode: this.listQuery.companyName}).then(res => {
          if (res.code == 200) {
            if (res.data == true) {
              this.$message.success('该企业不存在! 提示:请输入企业全称或者统一社会信用代码')
            }
            //   let arr = []
            //   res.data.data.forEach(item => {
            //     arr.push(`企业名称：${item.companyName}，业务人员：${item.traceSalesManName !== undefined ? item.traceSalesManName : ''}，项目人员：${item.projectMan !== undefined ? item.projectMan : ''}`)
            //   });
            //   arr.unshift('系统已存在该企业：');
            //   let str = arr.join(' <br/> ');
            //   this.$message({
            //     dangerouslyUseHTMLString: true,
            //     message: str,
            //     type: 'success'
            //   });
            //
            // } else {
            //   this.$message.warning('该企业不存在')
            // }
          }
        })
      },
      // 新导出企业信息
      exportChooseShow(){
        this.exportDialogVisible=false;
        this.listQuery.page = 0;
        this.listQuery.pageSize = this.total;
        this.listQuery.crmCompanyIds = this.check_biz_ids;
        this.listQuery.excelExportFields = this.radioChoose
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportCrmCompanyInfo(this.listQuery).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              this.listQuery.crmCompanyIds = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-客户列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close();
              this.radioChoose=[];
              this.radioAllChoose=[];

            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //获取导出企业字段信息
      getExportField(){
        this.exportField.companyId =  this.$store.getters.companyId;
        getExcelExportField(this.exportField).then(res=>{
            if(res.code == 200){
            //  console.log(res.data,"=========res.data>")
            //  this.exportChoose = res.data;


              let that = this;
              that.choosenum=0
              Object.keys(res.data).forEach( function(key){

                that.choosenum=that.choosenum+1
                // console.log( key,res.data[key], "=========>")
                if(res.data[key].isDefault== true){
                   that.exportChoose[key]=res.data[key];
                   that.radioChoose.push(res.data[key].fieldName);
                }else{
                  if(key.indexOf("人数") != -1 ){
                    that.exportPeople[key]=res.data[key];
                  }else{

                    if(key.indexOf("数") != -1 ){
                      that.exportNumber[key]=res.data[key];
                    }else{
                      if( key =='新老客户::0新客户，1老客户'){
                        that.exportOther['是否新客户']=res.data[key];
                      }else{
                        that.exportOther[key]=res.data[key];
                      }
                    }
                  }
                }
              })
             that.exportDialogVisible=true;
            }
        })
      },

      // 导出企业信息
      handleExport() {
        this.listQuery.page = 0;
        this.listQuery.pageSize = this.total;
        this.listQuery.crmCompanyIds = this.check_biz_ids;
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportCrmCompanyInfo(this.listQuery).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              this.listQuery.crmCompanyIds = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-客户列表' + '.xlsx'
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

      //获取导入模板
      getImportTemplate(){
        getCrmCompanyInfoTemplate({}).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.data,
              delete: true
            }
            downloadCrm(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-导入客户信息模板' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      // 文件超出个数限制时的钩子
      exceedFile(files, fileList) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
      },

      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
        const size = file.size / 1024 / 1024
        this.fileTemp = ''
        this.fileList = []
        if (extension !== 'xlsx') {
          this.$message.warning('只能上传后缀是.xlsx的文件')
          this.fileTemp = ''
          this.fileList = []
        }
        if (size > 10) {
          this.$message.warning('文件大小不得超过10M')
          this.importFileTemp = ''
          this.importFileList = []
        }
      },

      // 文件状态改变时的钩子
      importFileChange(file, fileList) {
        this.importFileTemp = ''
        this.importFileList = []

        this.importFileTemp = file.raw
        if (this.importFileTemp) {
          const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
          if (extension !== 'xlsx') {
            this.$message.warning('只能上传后缀是.xlsx的文件');
            this.importFileTemp = '';
            this.importFileList = []
          } else {
            this.importMaterielList(this.importFileTemp)
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请上传文件！'
          })
          this.importFileTemp = ''
          this.importFileList = []
        }
      },

      //上传文件动作
      importMaterielList(obj){
        const formData = new FormData()
        formData.append('file', obj)
        importCrmCompanyInfoList(formData).then(res => {
          if (res.code == 200) {
            this.importFileTemp = ''
            this.importFileList = []
            this.$message({
              type: 'success',
              message: res.message
            })

            this.exportFailShow = false;
            this.exportFailMsg = {};

            let taskMsg = {
              taskId: res.data.taskId
            };

            this.$store.commit('SET_CUSTOMER_TASKMSG', taskMsg);
            this.exportShow = true;
            this.getTaskInfo();

            this.getList()
          } else {
            this.importFileTemp = ''
            this.importFileList = []
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },

      // 点击翻页
      pageDown() {
        this.listQuery.page = this.listQuery.page + 20
        // this.listQuery.pageSize = this.listQuery.pageSize + 10
        this.getList()
      },
      //跟进--点击人员按钮 沟通
      handleShowConnectContentListPeople(data,i){
        let newformData = new FormData
        switch (i) {
          case 0:
            newformData.append('roleNameList', '业务员,业务主管')
            break
          case 1:
            newformData.append('roleNameList', '项目主管,项目员')
            break
          case 2:
            newformData.append('roleNameList', '专利员,专利主管')
            break
          case 3:
            newformData.append('roleNameList', '审计员')
            break
        }

        queryUserComboInfo(newformData).then(res => {
          if (res.code == 200) {
            this.personList = res.data
          } else {
            this.$message.warning(res.message)
          }
        }).then(() => {
          // console.log(this.personList)
          switch (i) {
            case 0:
              if (data.traceSalesManName == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.traceSalesManName)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.traceSalesManName

              break
            case 1:
              if (data.projectMan == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.projectMan)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.projectMan
              break
            case 2:
              if (data.propertyMan == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.propertyMan)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.propertyMan
              break
            case 3:
              if (data.auditMan == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.auditMan)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.auditMan
              break
          }
          this.ConnectContentDialogVisible = true
          this.searchForm.companyId = this.$store.getters.companyId
          this.isShowMoreNews = true
          this.getConnectList()
        })
      },

      //跟进--点击跟进按钮
      handleShowConnectContentList(id) {
        this.ConnectContentDialogVisible = true
        this.connectListQuery.msgCompanyId = id
        this.connectContentForm.msgCompanyId = id
        this.searchForm.companyId = id;
        this.isShowMoreNews = true;
        this.getConnectList()
      },

      //跟进--获取沟通列表
      getConnectList() {
        this.searchForm.page = 0;
        this.searchForm.pageSize = 10;

        if(this.toUserId!=0){
          this.searchForm.companyName="科策集团";
          this.searchForm.name = this.toUserName;
          this.searchForm.userId = this.toUserId;
          this.searchForm.messageType=0;
        }

        queryMessageList(this.searchForm).then(res => {
          if (res.code === 200) {
            this.chatData = res.data.msgChatListVos;
            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            })
          } else {
            this.$message.error(res.message)
          }
        })
      },

      //跟进--点击查看更多
      getMore() {
        this.searchForm.page += 1;
        // if(this.toUserId!=0){
        //   this.searchForm.companyName="科策集团";
        //   this.searchForm.name = "刘宏信";
        //   this.searchForm.userId = this.toUserName;
        //   this.searchForm.messageType=0;
        // }
        queryMessageList(this.searchForm).then(res => {
          if (res.code === 200) {
            if (res.data.msgChatListVos.length !== 0) {
              let dataList = JSON.parse(JSON.stringify(res.data.msgChatListVos)).reverse();
              dataList.forEach(item => {
                this.chatData.unshift(item)
                this.$nextTick(() => {
                  const dialogHeight = this.$refs.dialog.clientHeight;
                  this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight / 2 + dialogHeight;
                });
              })
            } else {
              this.isShowMoreNews = false;
            }
          }
        })
      },

      //跟进--发送信息
      sendData() {
        if (this.chatContent == '') {
          this.$message.warning(`请输入沟通内容`)
          return
        }
        let params
        if (this.toUserId != 0) {
          // console.log(this.toUserId,"toUserId=>")
          params = {
            companyId: this.$store.getters.companyId,
            chatContent: this.chatContent,
            // toCompanyId: this.searchForm.companyId,
            toUserId: this.toUserId
          }
        } else {
          params = {
            companyId: this.$store.getters.companyId,
            chatContent: this.chatContent,
            toCompanyId: this.searchForm.companyId
          }
        }

        if (this.fileIds !== '') {
          params.fileIds = this.fileIds
        }
        // console.log(params,"params=>")

        let date = getNowTime()
        let data = {
          sendUserId: this.$store.getters.userId,
          sendCompanyId: this.$store.getters.companyId,
          reciveUserId: this.toUserId,
          reciveCompanyId: this.searchForm.companyId,
          sendTime: date,
          msgType: "3",
          fileIds: this.fileIds && this.fileIds != '' ? this.fileIds : undefined,
          sendText: this.chatContent
        };

        this.sendMsg(data,ev=>{
          console.log(JSON.parse(ev.data),'K线相关数据')
          if(ev.data){
            this.chatContent = ''
            this.fileTemp = []
            this.fileIds = ''
            this.getConnectList()
            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            });
          }
        })

        this.chatContent = ''
        this.fileTemp = []
        this.fileIds = ''
        this.getConnectList()
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
        });

        // addChat(params).then(res => {
        //   if (res.code === 200) {
        //     this.chatContent = ''
        //     this.fileTemp = []
        //     this.fileIds = ''
        //     this.getConnectList()
        //   }
        // })
      },

      //跟进--上传文件
      fileChange(file, fileList) {
        if(file.name.length >= 150){
          this.$message('文件名称超长，请检查');
          this.fileTemp = JSON.parse(JSON.stringify(this.fileTemp))
          return;
        }
        const formData = new FormData();

        formData.append('companyId', this.searchForm.companyId);
        formData.append('files', file.raw);

        if (fileList.length > 1) {
          fileList.splice(0, 1);
        }

        addChatFile(formData).then(res => {
          if (res.code === 200) {
            this.fileIds = res.data;
          }
        })
      },

      //跟进--删除聊天
      delChat(data) {
        this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteChatById({chatId: data.chatId}).then(res => {
            if (res.code === 200) {
              this.chatData.forEach((item, index) => {
                if (data.chatId == item.chatId) {
                  this.chatData.splice(index, 1);
                }
              });
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //跟进--键盘回车事件
      handleKeyCode(event) {
        if (event.keyCode == 13 && event.ctrlKey) {
          this.chatContent += "\n"; //换行
        } else if (event.keyCode == 13) {
          this.sendData(); //提交的执行函数
          event.preventDefault();//禁止回车的默认换行
        }
      },

      //跟进--下载文件
      downHandle(url) {
        let urls = url.replace(/http/,'https')
        window.location.href = urls;
      },

      // handleConnectCurrentChange(val) {
      //   this.connectListQuery.page = val
      //   this.getConnectList()
      // },
      submitConnectContentForm() {
        // saveConnectContent(this.connectContentForm).then(res => {
        //   if (res.data.code === 1) {
        //     this.$message.success(res.data.message ? res.data.message : '保存成功!')
        //     this.getConnectList()
        //     // 必须单独设置为null,因为其他变量要保留
        //     this.connectContentForm.connect_content = null
        //     this.connectContentForm.file_url = null
        //     this.connectContentForm.file_name = null
        //     this.fileList = []
        //   } else {
        //     this.$message.error(res.data.message ? res.data.message : '保存失败!')
        //   }
        // })
      },
      // onUploadChange(file) {
      //   var form = this.connectContentForm
      //   if (file.response) {
      //     form.file_url = file.response.url
      //     form.file_name = file.response.original
      //   }
      // },
      // preview_one(file_obj) {
      //   this.a_downfile(this.host + file_obj.upload_file__file_url, file_obj.upload_file__file_name)
      // },
      // a_downfile(path, filename) {
      //   window.open(path, '_blank')
      // },
      // 批量关联业务员
      goBatchChange() {
        if (this.check_biz_ids.length === 0) {
          this.$message.error('至少勾选一个企业')
          return
        }

        this.getPersonList('业务员,业务主管')
        this.batchChangeFrom = {};
        this.batchChangeDialogVisible = true
        this.batchChangeFrom.companyIds = this.check_biz_ids
      },
      //确定设置业务员 num 0：业务员 1：工程师 2:知识产权工程师 3：审计员
      handleBatchChange(num) {
        // if(this.batchChangeFrom.userId == '' || this.batchChangeFrom.userId == undefined){
        //   this.$message.warning('请选择人员！');
        //   return;
        // }
        let formData = new FormData;
        let userId = [];
        userId.push(this.batchChangeFrom.userId)
        formData.append('userIds', userId)
        formData.append('userType', num)
        formData.append('companyIds', this.batchChangeFrom.companyIds)
        batchFollowUser(formData).then(res => {
          if (res.code == 200) {
            this.$message.success('设置成功')
            this.personList = [];
            this.check_biz_ids = [];
            this.batchChangeFrom = {};

            if (num == 0) {
              this.batchChangeDialogVisible = false
            } else if (num == 1) {
              this.batchChangeProjectDialogVisible = false;
            } else if (num == 2) {
              this.IntellectualDialogVisible = false;
            } else {
              this.auditDialogVisible = false;
            }

            this.listQuery.page = 0;
            this.getList()
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name,deptIds,isExcludePermission) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if(deptIds != undefined){
          formData.append('deptIdList',deptIds)
        }
        if(isExcludePermission != undefined){
          formData.append('isExcludePermission', isExcludePermission)
        }
        if(this.allowGetRoleUserList.twoAllow){
          queryUserComboInfo(formData).then(res => {
            if (res.code == 200) {
              // console.log(this.personList)
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

      // 批量关联项目员
      goBatchProjectChange() {
        if (this.check_biz_ids.length === 0) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.getPersonList('项目员')
        this.batchChangeFrom = {};
        this.batchChangeProjectDialogVisible = true
        this.batchChangeFrom.companyIds = this.check_biz_ids
      },
      //设置专利员
      goBatchintellectualChange(){
        if (this.check_biz_ids.length === 0) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.getPersonList('专利员,专利主管')
        this.batchChangeFrom = {};
        this.IntellectualDialogVisible = true
        this.batchChangeFrom.companyIds = this.check_biz_ids
      },
      // handleBatchProjectChange() {
      //   // changeProject(this.batchChangeProjectFrom).then(res => {
      //   //   if (res.data.code === 1) {
      //   //     this.$message.success('关联成功')
      //   //     this.list = []
      //   //     this.getList()
      //   //   }
      //   // })
      //   this.batchChangeProjectDialogVisible = false
      // },
      // 批量关联审计人员
      goBatchAuditChange() {
        if (this.check_biz_ids.length === 0) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.getPersonList('审计员')
        this.batchChangeFrom = {};
        this.auditDialogVisible = true
        this.batchChangeFrom.companyIds = this.check_biz_ids
      },
      // handleBatchAuditorChange() {
      //   // changeEnterpriseAuditor(this.auditForm).then(res => {
      //   //   if (res.data.code === 1) {
      //   //     this.$message.success('关联审计人员成功!')
      //   //     this.auditDialogVisible = false
      //   //     this.list = []
      //   //     this.getList()
      //   //   }
      //   // })
      //   this.batchChangeProjectDialogVisible = false
      // },
      //  批量同步企业知识产权信息
      goBatchSyncIpr() {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return;
        }
        let arr = [];
        let newList = this.list.filter(item => {
          return this.check_biz_ids.includes(item.crmCompanyId);
        });
        newList.forEach(item => {
          let obj = {};
          obj.companyName = item.companyName
          obj.crmCompanyId = item.crmCompanyId
          arr.push(obj);
        })
        this.$confirm('确定同步该企业的知识产权信息？').then(res => {
          batchQueryIntellectualPropertyRights({companyList: arr}).then(response => {
            if (response.code == 200) {
              this.$message.success(response.message);
              this.check_biz_ids = [];
              this.listQuery.page = 0;
              this.getList();
            }
          })
        })
      },
      // 批量同步企查查基本信息
      goBatchSyncBasicInfo() {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.$confirm('确定同步企查查基本信息？').then(_ => {
          var formData = new FormData
          formData.append('companyIds', this.check_biz_ids)
          batchQueryCompanyInfoFromQichacha(formData).then(response => {
            if (response.code == 200) {
              this.$message.success(response.message)
              this.check_biz_ids = [];
              this.listQuery.page = 0;
              this.getList()
            } else {
              this.$message.error(response.message)
            }
          })
        })
      },
      /**
       * 同步立项
       */
      syncPolicyApprovalList(){
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.$confirm('确定同步该企业的立项信息？').then(res => {
          queryPolicyApprovalList({companyIds: this.check_biz_ids}).then(response => {
            if (response.code == 200) {
              this.$message.success(response.message);
              this.listQuery.page = 0;
              this.getList();
            }
          })
        })
      },
      // 抢客户
      grabFreeSeaCustomer(id) {
        this.$confirm('确定抢此客户?').then(_ => {
          let formData = new FormData;
          formData.append('companyIds',id)
          batchGrabCompany(formData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.data.message ? res.data.message : '抢客户成功!')
              this.listQuery.page = 0;
              this.getList()
            } else {
              this.$message.error(res.data.messages ? res.data.messages : '抢客户失败!')
            }
          })
        })
      },
      //  删除客户
      delEnterprise() {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.$confirm('确定删除客户?').then(_ => {
          deleteCrmCompanyInfo({CompanyIds: this.check_biz_ids}).then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功!')
              this.listQuery.page = 0;
              this.getList()
            }
          })
        })
      },
      // 设置渠道
      setChannel() {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.$confirm('确定将客户设置为渠道身份?').then(_ => {
          let formData = new FormData;
          formData.append('crmCompanyIds', this.check_biz_ids);
          formData.append('isProxy', 1);
          updateCrmCompanyIsProxy(formData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message ? res.message : '操作成功!')
              this.listQuery.page = 0;
              this.getList()
            }
            this.check_biz_ids = []
          })
        })
      },
      //取消渠道
      cancelSetChannel() {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.$confirm('确定取消客户的渠道身份?').then(_ => {
          let formData = new FormData;
          formData.append('crmCompanyIds', this.check_biz_ids);
          formData.append('isProxy', 0);
          updateCrmCompanyIsProxy(formData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message ? res.message : '操作成功!')
              this.listQuery.page = 0;
              this.getList()
            }
            this.check_biz_ids = []
          })
        })
      },

      //点击新增销售计划
      addListHandle() {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return
        }

        // 客户中心批量新增销售计划联系人信息回显
        let formData = new FormData;
        formData.append('crmCompanyIds', this.check_biz_ids)
        queryCompanyContactInfo(formData).then(res => {
            if (res.code == 200) {
              ///////
              this.addMoreSale = res.data;
            } else {
              this.$message.warning(res.message)
            }
        })

        this.updateForm = {
          crmCompanyId: "",
          planDate: "",
          companyName: "",
          projectName: ""
        };
        this.targetUserParam.page = 0;
        this.projectByParam.page = 0;
        this.getTargetUserList();
        this.getProjectData();
        this.timeDefault();

        let obj = {
          companyName: "",
          contactName: "",
          contactPhone: "",
          planDate: this.updateForm.planDate,
          projectName: "",
          projectBasis: "",
          isSelectUser: true,
          isSelectProject: true,
          companyUserList: [],
        };
        this.addMoreSale.push(obj);

        this.addSaleDialogVisible = true;
      },


      //批量新增计划--新增一行
      addSaleRowHandle() {
        let obj = {
          companyName: "",
          contactName: "",
          contactPhone: "",
          planDate: this.updateForm.planDate,
          projectName: "",
          projectBasis: "",
          isSelectUser: true,
          isSelectProject: true,
          companyUserList: [],
        };
        this.addMoreSale.push(obj);
      },

      //取消新增销售计划
      cananlMoreSaleHandle() {
        this.addMoreSale = [];
        this.addSaleDialogVisible = false;
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
          this.targetUserParam.companyNameOnly = "";
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getTargetUserList();
          }, 100);
        }
      },

      //选择目标客户--焦点离开的时候
      handleSelectDataBlue() {
        this.targetUserParam.companyNameOnly = "";
        this.getTargetUserList();
      },

      handleSelectMoreDataBlue() {
        this.targetUserParam.companyNameOnly = "";
        this.targetUserParam.page = 0;
        this.saleIndex = '';
        this.getTargetUserList();
      },


      //新增/变更 点击推广项目
      handleSelectData(val) {
        this.selectUserOrProject = val;
      },

      //新增多条计划--点击获取焦点的时候
      handleMoreSelectData(data, val, index) {
        this.selectUserOrProject = val;
        this.saleIndex = index;
        this.getTargetUserList();
        setTimeout(() => {
          data.companyUserList = this.companyNameList
        }, 500)
      },

      // 新增/变更销售计划---切换目标客户--选择\输入
      switchCompanyHandle() {
        this.isUserWriteChoose = !this.isUserWriteChoose;
        this.updateForm.companyName = "";
      },
      // 新增/变更销售计划---切换推广项目--选择\输入
      switchProjectHandle() {
        this.isProjectWriteChoose = !this.isProjectWriteChoose;
        this.updateForm.projectName = "";
      },
      // 新增/变更销售计划---计划实施日期设置默认值
      timeDefault() {
        let data = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let y = data.getFullYear();
        let m = data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
        let d = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
        let newData = `${y}-${m}-${d}`
        this.updateForm.planDate = JSON.parse(JSON.stringify(newData));
      },
      // 新增/变更销售计划---取消
      cananlUpdate() {
        this.updateVisible = false;
        this.updateForm = {
          planDate: "",
          companyName: "",
          projectName: ""
        };
        this.timeDefault();
      },
      //新增/变更销售计划---获取目标客户列表
      getTargetUserList() {
        if (this.allowGetCompanyList.twoAllow) {
          queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
            if (res.code === 200) {
              this.companyNameList = res.data.data;
              this.companyTotalList = res.data.total;
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取企业列表')
        }
      },

      //批量新增计划--新增一行
      addSaleRowHandle() {
        let obj = {
          companyName: "",
          contactName: "",
          contactPhone: "",
          planDate: this.updateForm.planDate,
          projectName: "",
          projectBasis: "",
          isSelectUser: true,
          isSelectProject: true,
          companyUserList: [],
        };
        this.addMoreSale.push(obj);
      },

      //批量新增计划--目标客户点击切换
      switchMoreCompanyHandle(data) {
        data.isSelectUser = !data.isSelectUser;
        data.companyName = "";
        data.crmCompanyId = "";
      },

      //批量新增计划--推广项目点击切换
      switchMoreProjectHandle(data) {
        this.$set(data,'isSelectProject',!data.isSelectProject)
        data.projectName = "";
      },


      //批量新增计划--选择目标客户
      addSelectMoreCompanyHandle(val, data) {
        this.companyNameList.forEach(item => {
          if (item.crmCompanyId == val) {
            data.companyName = item.companyName;
          }
        })
      },

      //获取项目列表
      getProjectData() {
        if (this.allowGetProjectList.twoAllow) {
          queryAllProjectBySalePlan(this.projectByParam).then(res => {
            if (res.code === 200) {
              this.projectWriteList = res.data.data
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取项目列表')
        }
      },

      //获取企业
      getCompanyData(query) {
        this.targetUserParam.page = 0;
        this.targetUserParam.companyNameOnly = query;
        queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
          if (res.code == 200) {
            this.companyNameList = res.data.data;
            this.companyTotalList = res.data.total;

            if (this.saleIndex !== "") {
              this.addMoreSale[this.saleIndex].companyUserList = res.data.data;
            }
          }
        })
      },

      //新增/变更 获取更多目标客户
      loadMore2() {
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


        if (this.selectUserOrProject === 'moreUser') {
          this.targetUserParam.page += 10;
          queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
            if (res.code == 200) {
              if (this.addMoreSale[this.saleIndex]) {
                if (this.addMoreSale[this.saleIndex].companyUserList.length >= res.data.total) {
                  return false
                } else {
                  this.addMoreSale[this.saleIndex].companyUserList = this.addMoreSale[this.saleIndex].companyUserList.concat(res.data.data)
                }
              }
            }
          })
        }
      },

      //批量新增计划--选择推广项目
      addSelectMoreProjectHandle(val, data) {
        this.projectWriteList.forEach(item => {
          if (item.projectId == val) {
            // data.projectName = item.projectName;
            this.$set(data,'projectName',item.projectName)
          }
        })
      },

      //批量新增计划--删除计划
      delSaleMoreHandle(index) {
        this.addMoreSale.splice(index, 1);
      },

      //批量新增计划--批量新增计划
      setMoreSaleHandle() {
        if (this.addMoreSale.length == 0) {
          this.$message.warning('请新增计划');
          return;
        }
        this.addMoreSale.forEach(item => {

          if (item.crmCompanyId == '' && item.companyName == '') {
            this.$message.warning('请选择或输入目标客户');
            throw new Error();
          }


          if (item.planDate == '' || item.planDate == null) {
            this.$message.warning('请选择计划实施时间');
            throw new Error();
          }

          if (item.projectName == '') {
            this.$message.warning('请选择推广项目');
            throw new Error();
          }

          if (item.projectBasis == '') {
            this.$message.warning('请输入客户信息');
            throw new Error();
          }
        })


        let params = this.addMoreSale;
        saveSalePlan({salePlanDtos: params}).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功');
            this.addSaleDialogVisible = false;
            this.addMoreSale = [];
            this.listQuery.page = 0;
            this.getList();
          }
        })

        //跳转到销售计划
        this.$router.push({
          path: '/customer/salesPlan',
        });
        localStorage.setItem('planStatus', 1)

      },


      // 投入公海
      handlePutIntoFreeSea() {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('至少勾选一个企业')
          return
        }
        this.$confirm('确定将该企业投入公海？').then(_ => {
          let formData = new FormData;
          formData.append('crmCompanyIds', this.check_biz_ids)
          putCompanyToFreeSea(formData).then(res => {
            if (res.code == 200) {
              this.$message.success('投入公海成功!')
            } else {
              this.$message.error(res.message)
            }
            this.check_biz_ids = []
            this.listQuery.page = 0;
            this.getList()
          })
        })
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'ENTERPRISE_REGISTRATION_STATUS,DICT:CUSTOMER_LEVEL,DICT:ANNUAL_SALES,DICT:STAFF_SIZE,DICT:INDUSTRY_INVOLVED,DICT:COMPANY_TYPE,DICT:TECHNOLOGY_TYPE,DICT:COMPANY_SCALE,DICT:JOB_PROFESSIONAL,DICT:PATENT_TYPE',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.customer_classification_list = res.data['DICT:CUSTOMER_LEVEL'];
            // this.enterprise_annual_sales_list = res.data['DICT:ANNUAL_SALES'];
            this.employee_scale_list = res.data['DICT:STAFF_SIZE'];
            this.industry_involved_list = res.data['DICT:INDUSTRY_INVOLVED'];
            // this.companyTypeList = res.data['DICT:COMPANY_TYPE'];
            this.technologyTypeList = res.data['DICT:TECHNOLOGY_TYPE'];
            this.companyScaleList = res.data['DICT:COMPANY_SCALE'];
            this.jobProfessionalList = res.data['DICT:JOB_PROFESSIONAL'];
            this.patentList = res.data['DICT:PATENT_TYPE'];

          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
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

      // 获取左侧公司部门列表
      getCompanyList() {
        getDepartmentTree({}).then(res => {
          if (res.code == 200) {
            this.filter_department_list = res.data.deptInfoTreeVos;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // 选择位置
      handlePosition(val) {
        const arr = [];
        if (val.length != 0) {
          this.positionCheckList.forEach(item => {
            val.forEach(val => {
              if (item.keys == val) {
                arr.push(item.name);
                const string = arr.join('，');
                this.$set(this.select_conditions_list, 'companyPosition', `位置-${string}`);
              }
            })
          })
        } else {
          this.$delete(this.select_conditions_list, 'companyPosition');
          this.$set(this.listQuery, 'companyPosition', []);
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList();
      },

      //获取联系人模板
      getUserTemplate(){
        getCrmCompanyPersonnelTemplate().then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.data,
              delete: true
            }
            downloadCrm(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-导入客户信息模板' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //导入联系人
      importUserChange(file, fileList){
        this.importUserTemp = ''
        this.importUserList = []

        this.importUserTemp = file.raw
        if (this.importUserTemp) {
          const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
          if (extension !== 'xlsx') {
            this.$message.warning('只能上传后缀是.xlsx的文件');
            this.importUserTemp = '';
            this.importUserList = []
          } else {
            this.importUserListFn(this.importUserTemp)
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请上传文件！'
          })
          this.importUserTemp = ''
          this.importUserList = []
        }
      },

      importUserListFn(obj){
        const formData = new FormData()
        formData.append('file', obj)
        importCrmCompanyPersonnel(formData).then(res => {
          if (res.code == 200) {
            this.importUserTemp = ''
            this.importUserList = []
            this.$message({
              type: 'success',
              message: res.message
            })

            this.exportFailShow = false;
            this.exportFailMsg = {};

            let taskMsg = {
              taskId: res.data.taskId
            };

            this.$store.commit('SET_CUSTOMER_TASKMSG', taskMsg);
            // this.exportShow = true;
            // this.getTaskInfo();

            this.getList()
          } else {
            this.importUserTemp = ''
            this.importUserList = []
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
      },

      //获取年份列表
      getAllYearList(){
        this.yearList = [];
        //设置年份的选择
        var myDate= new Date();
        var startYear=myDate.getFullYear()-5;//起始年份
        var endYear=myDate.getFullYear()+10;//结束年份
        // var obj=document.getElementById('myYear')
        for (var i=startYear;i<=endYear;i++) {
          this.yearList.push(i);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.Choose{
  border-bottom: #ccc dashed 1px;
  height: 1px;
  width: 100%;
  margin: 10px 0px;
}
.checkboxChoose{
  display: flex;
  flex-flow: wrap;
  /deep/label{
    width: 30%;
    height: 28px;
    overflow: hidden;
  }
  /deep/.el-checkbox{
    margin-right: 15px;
  }



}
  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
    font-size: 12px;
  }

  .center-items {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .backTop {
    position: fixed;
    bottom: 30px;
    right: 83px;
  }

  .overflow-x {
    overflow-x: hidden;
  }

  .overflow-y {
    overflow-y: hidden;
  }

  .width-0-15 {
    width: 15%;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .width-0-18 {
    width: 18%;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .width-0-20 {
    width: 20%;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .width-0-25 {
    width: 25%;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .dq {
    width: 28%;
    height: 18px;
    line-height: 18px;
  }

  .bg_dq {
    padding: 2px 10px;
    background-color: #CDEEFF;
  }

  .zy {
    width: 65%;
    height: 18px;
    line-height: 18px;
  }

  .bg_zy {
    padding: 2px 10px;
    background-color: #DEE6FF;
    color: #88A0E9;
  }

  .color-05 {
    color: #05AAFF;
  }

  .color-F5 {
    color: #F56C6C;
  }

  .bg_pink {
    background: rgb(255, 112, 154);
    color: #fff;

    &:hover {
      background: rgba(255, 112, 154, .5);
    }
  }

  .inline-block {
    display: inline-block;
  }

  .text-align-center {
    text-align: center;
  }

  .hover_cursor {
    cursor: pointer
  }

  .top-margin-10 {
    margin-top: 10px;
  }

  .left-margin-10 {
    margin-left: 10px;
  }

  .right-margin-10 {
    margin-right: 10px;
  }

  .padding-0 {
    padding: 0;
  }

  .padding-10 {
    padding: 10px;
  }

  .hot-search {
    width: 48px;
    height: 17px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: #042B40;
    opacity: 1;
    font-size: 12px;
  }

  .hot-search-kw {
    margin: auto 10px;
    width: 24px;
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: #979797;
    opacity: 1;
  }

  .row-width-auto-margin-0-96 {
    width: auto;
    margin: auto 2%;
    min-width: 1000px;
  }

  .search-background {
    background-color: #3ABBFD;
    border: none;
    color: white;
  }

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  .padding-vertical-5 {
    padding: 5px 0;
  }

  .padding-vertical-10 {
    padding: 10px 0;
  }

  .padding-level-10 {
    padding: 0 10px;
  }

  .bg_orange {
    background: #FD903C;
    color: #fff;

    &:hover {
      background: #FD903C;
      opacity: 0.5;
    }
  }

  .bg_gray {
    background: rgb(180, 180, 180);
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba(180, 180, 180, .5);
    }
  }

  .bg_blue {
    background: #05AAFF;
    color: #fff;

    &:hover {
      background: #05AAFF;
      opacity: 0.5;
    }
  }

  .bg_pale_blue {
    background: rgb(105, 204, 255);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(105, 204, 255, .5);
    }
  }

  .bg_pale_violet {
    background: rgb(155, 181, 255);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(155, 181, 255, .5);
    }
  }

  .bg_pale_green {
    background: rgb(145, 229, 161);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(145, 229, 161, .5);
    }
  }

  .bg_pale_yellow {
    background: rgb(255, 203, 166);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(255, 203, 166, .5);
    }
  }

  .bg_pale_pink {
    background: rgb(254, 149, 178);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(254, 149, 178, .5);
    }
  }

  .bg_pale_purple {
    background: rgb(88, 131, 255);
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba(88, 131, 255, .5);
    }
  }

  .bg_pale_orange {
    background: rgb(255, 186, 136);
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba(255, 186, 136, .5);
    }
  }

  .bg_pale_violet {
    background: rgb(121, 156, 255);
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba(121, 156, 255, .5);
    }
  }

  .ent_shorthand {
    font-size: 16px;
    color: #f0f7ff;
  }

  .input-150 {
    width: 150px;
  }
  .screen-input{
    margin-right: 20px;
    .el-input__inner{
      height: 28px;
    }
  }

  /*-------------------------*/
  .flex {
    display: flex;
  }

  .flex_warp {
    display: flex;
    flex-wrap: wrap;
  }

  .screen-box {
    .screen-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .screen-list {
        display: flex;

        .screen-change-list {
          margin-top: -3px;
          display: flex;
          flex-wrap: wrap;

          div {
            height: 26px;
            margin-right: 10px;
            margin-bottom: 8px;
          }
        }
      }

      .screen-term {
        display: flex;
        align-items: center;
        min-width: 130px;
        margin-top: -2px;
        cursor: pointer;
      }
    }

    .screen-group {
      .el-form-item {
        margin-bottom: 0;
        min-height: 40px;
        display: flex;

        .el-form-item__label {
          min-width: 54px;
        }

        .el-select {
          margin-right: 20px;
        }
      }

      .check-list {
        .el-checkbox {
          margin-bottom: 10px;
        }
      }
    }
  }


  .item-type-list {
    display: flex;
    flex-wrap: wrap;

    .item-type {
      width: auto;
      min-width: 170px;
      white-space: nowrap;
      margin-bottom: 10px;
      margin-right: 35px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;

      .title {
        text-align: right;
        display: inline-block;
        min-width: 70px;
      }
    }
  }

  .search-bar {
    .el-form-item {
      margin-bottom: 8px;
    }

    .search-input {
      .el-input__inner {
        height: 38px;
        border-radius: 0;
        border: 1px solid rgba(5, 170, 255, 0.7294117647058823);
        border-right: 0;
      }

      .el-input-group__append {
        border: 0 !important;
        border-radius: 0;
        /*background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);*/
      }

    }

    .search-company-btn {
      color: rgba(255, 255, 255, 1);
      border-radius: 2px;
      background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
    }

    .add-company-btn {
      color: rgba(255, 255, 255, 1);
      border-radius: 2px;
      background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    }
  }

  .companyTypeGreen {
    background: #b6eec0;
    border-radius: 10px;
    padding: 3px 16px;
    font-size: 12px;
    color: #48aa5a;
  }

  .companyTypeZhi {
    background: #ffddc3;
    border-radius: 10px;
    padding: 3px 16px;
    font-size: 12px;
    color: #c6895c;
  }

  .chat-modal {
    /deep/ .el-dialog__body {
      padding-top: 0;
    }
  }

  .dialog-box {
    .has-more-news {
      text-align: center;
      color: #37BBFF;
      font-size: 12px;

      &.not_more {
        color: rgba(68, 68, 68, 0.50);
      }

      span {
        cursor: pointer;
      }
    }

    .dialog {
      height: 300px;
      overflow-y: auto;
      padding: 10px;
      border: 1px solid #37BBFF;
      border-bottom: 0;

      .connect-div {
        .left-massage, .right-massage {
          margin-top: 10px;

          .title {
            width: 50%;
            display: flex;
            align-items: center;

            .pic {
              min-width: 24px;
              width: 24px;
              height: 24px;
              background: #37BBFF;
              color: #fff;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .text {
              color: #444;
              font-size: 14px;
              margin: 0 10px;
              white-space: nowrap;
            }

            .time {
              color: #FFA96A;
              font-size: 14px;
              white-space: nowrap;
            }

            .del-icon {
              cursor: pointer;
              margin-left: 10px;
              width: 16px;
              display: none;
            }

            &:hover {
              .del-icon {
                display: block;
              }
            }
          }

          .content {
            margin-top: 10px;
            width: 50%;
            color: rgba(68, 68, 68, 0.75);
            max-width: 680px;
            background: #EEF9FF;
            font-size: 14px;
            padding: 10px;
            border-radius: 4px;

          }

          .down-content {
            margin-top: 10px;
            font-size: 14px;

            .down-btn {
              width: 70px;
              height: 30px;
              color: #fff;
              cursor: pointer;
              outline: none;
              border: 0;
              border-radius: 4px;
              margin-left: 10px;
              background: linear-gradient(180deg, #69ccff 0%, #05aaff 100%);

              &:active {
                opacity: .5;
              }
            }
          }
        }

        .right-massage {
          display: flex;
          flex-direction: column;
          align-items: flex-end;

          .title {
            justify-content: flex-end;
          }

          .content {
            text-align: right;
          }

          .del-icon {
            margin-right: 10px;
          }
        }
      }

      /*滚动条整体样式*/

      &::-webkit-scrollbar {
        width: 8px;
        height: 1px;
      }

      /*滚动条里面小方块*/

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #69CCFF;
      }

      /*滚动条里面轨道*/

      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: #CDEEFF;
      }
    }

    .dialog-input {
      height: 120px;
      border: 1px solid #37BBFF;

      /deep/ .el-textarea__inner {
        border: 0;
        resize: none;
      }

      .btn-group {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0 15px;

        /deep/ .el-button {
          border: 0;
        }

        .update-files-btn {
          background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
        }

        .send-tap {
          white-space: nowrap;
          font-size: 14px;
          color: #00A5FF;
          margin-right: 10px;
        }

        .send-btn {
          background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
        }
      }
    }
  }

  .el-button.is-disabled{
    color: #fff;
    background-image: none;
    background-color: #C0C4CC;
  }

  .add-sale-modal {
    /deep/ .el-dialog__header {
      border-bottom: 1px solid #ccc;
    }

    .add-sale-table {
      .flex-center {
        display: flex;
        align-items: center;

        i {
          font-size: 14px;
          color: #00A5FF;
          cursor: pointer;
        }
      }

      .icon-sale-del {
        color: red;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }

  .star{
    color: #ff3d4c !important;
    position: absolute;
    left: -8px;
  }

/deep/ .el-date-editor {
  .el-input__inner {
    padding: 0 30px;
  }
}
</style>
