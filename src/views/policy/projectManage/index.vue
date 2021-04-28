<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-96" style="margin-bottom: 20px; font-size: 14px;">
      <!--搜索-->
      <el-card class="top-margin-10 center-items search-bar">
<!--        <div class="searchType">-->
<!--          <div :class="searchType == 1 ? 'active' : ''" @click="changeSearch(1)">项目名称</div>-->
<!--          <div :class="searchType == 2 ? 'active' : ''" @click="changeSearch(2)">项目别名</div>-->
<!--        </div>-->
        <el-input class="search" placeholder="项目名称" size="large" @keyup.enter.native="goSearch" v-model="listQuery.projectName" style="width: 500px;">
          <el-button slot="append" size="large" icon="el-icon-search" class="search-btn" @click="goSearch">搜一下</el-button>
        </el-input>
<!--        <el-input v-else class="search" placeholder="项目别名" size="large" @keyup.enter.native="goSearch"-->
<!--                  v-model="listQuery.projectAlias" style="width: 500px;">-->
<!--          <el-button slot="append" size="large" icon="el-icon-search" class="search-btn" @click="goSearch">搜一下-->
<!--          </el-button>-->
<!--        </el-input>-->
        <el-button size="large" class="filter-item search-btn add-btn" @click="toCreate" v-if="allowAdd.twoAllow">新增</el-button>
      </el-card>

      <!--已选条件-->
      <el-card class="top-margin-10 padding-0">
        <div class="screen-bar">
          <div class="left">
            <div class="screen-title">
              <span class="tag"></span>
              <span>已选条件：</span>
            </div>
            <div class="screen-list">
              <div class="padding-vertical-5 right-margin-10 item" v-for="(value, key) in select_conditions_list">
                {{value}}<img class="hover_cursor" @click="deleteOneClick(key)"
                              src="../../icons/enterprise/close_con.png"
                              style="vertical-align:middle; margin-left: 3px;"/>
              </div>
              <div class="padding-vertical-5 right-margin-10 screen-clear" @click="deleteAllClick"
                   v-if="Object.keys(select_conditions_list).length > 1">
                清空所有
              </div>
            </div>
          </div>
          <div class="right hover_cursor" @click="getMoreCondition">
            <img v-if="more_condition" src="../../icons/enterprise/close_icon.png"/>
            <img v-else src="../../icons/enterprise/open_icon.png"/>
            <span class="right-margin-10" style="color: #33B3EE;white-space: nowrap;">选择筛选条件</span>
          </div>
        </div>
        <div v-if="more_condition">
          <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"></div>
          <div class="left-margin-10">
            <div class="top-margin-10">
              <el-form :inline="true">
                <el-form-item label="筛选：" style="margin-bottom: 10px;display: flex;">
                  <el-select multiple @change='handleFilterProjectType' clearable size="mini"
                             class="inline-block float-left" v-model="listQuery.projectTypes" placeholder="项目分类">
                    <el-option v-for="item in type_list" :key="item.dictId" :value="item.dictId"
                               :label="item.dictName"></el-option>
                  </el-select>
                  <el-select multiple @change='handleFilterProjectLevel' clearable size="mini"
                             class="inline-block float-left" style="margin-left: 20px;" v-model="listQuery.areaLevel"
                             placeholder="项目级别">
                    <el-option v-for="item in levelList" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select @change='handleFilterOrderType' clearable size="mini"
                             class="inline-block float-left" style="margin-left: 20px;" v-model="listQuery.orderClass"
                             placeholder="订单类型">
                    <el-option v-for="item in orderTypeList" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select @change='handleFilterFlow' clearable size="mini" filterable
                             class="inline-block float-left" style="margin-left: 20px;" v-model="listQuery.flowId"
                             placeholder="订单流程">
                    <el-option v-for="item in flowList" :key="item.flowId" :label="item.flowName"
                               :value="item.flowId"></el-option>
                  </el-select>
                  <el-select @change='handleOftenProject' clearable size="mini" filterable
                             class="inline-block float-left" style="margin-left: 20px;"
                             v-model="listQuery.isOftenProject"
                             placeholder="是否常规可报项目">
                    <el-option v-for="item in oftenProjectList" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
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
                             v-model="listQuery.cityId" placeholder="城市" style="margin-left: 20px;">
                    <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='changeDistrict' clearable size="mini" class="inline-block input-150 float-left"
                             v-model="listQuery.districtId" placeholder="县区" style="margin-left: 20px;">
                    <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='getTownsId' clearable size="mini" class="inline-block input-150 float-left"
                             v-model="listQuery.townId" placeholder="镇街" style="margin-left: 20px;">
                    <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="top-margin-10 padding-0">
        <!--搜索到-->
        <div class="get-search-bar">
          <span style="color:rgba(68,68,68,0.75);">
            <span class="tag"></span>搜索到<span style="color:#F56C6C;"> {{total}} </span>条记录
            <span v-if="check_biz_ids.length > 0">已选中<span
              style="color:#F56C6C;"> {{check_biz_ids.length}} </span>条记录</span>
          </span>
          <el-button class="filter-item btn-item" size="mini" @click='checkAllOrNo' style="margin-left: 10px;">全选
          </el-button>
          <el-button class="filter-item btn-item left-margin-10" size="mini" @click="handleExport">导出</el-button>
          <el-button class="filter-item btn-item left-margin-10" size="mini" @click="handleDel"
                     v-if="allowDelete.twoAllow">删除
          </el-button>
          <!--v-if="can_delete"-->
          <span class="float-right" style="vertical-align:middle;">
            <el-select class="select-item" @change='handleOrder' size="mini" v-model="listQuery.orderNum" clearable
                       placeholder='默认排序'>
              <el-option v-for="(item,index) in order_list" :key="item.value" :label="item.label"
                         :value="index"> </el-option>
            </el-select>
          </span>
        </div>

        <div class="top-margin-10" style="height: 3px; background-color: #EDF4FF; width: 100%;"></div>

        <div class="list-bar top-margin-10 overflow-x" v-for="(item, index) in list">
          <div class="left float-left overflow-x">
            <div class="float-left center-items">
              <input type="checkbox" name="check_biz_ids" :value="item.projectId" v-model="check_biz_ids"
                     class="check"/>
            </div>
            <div class="bg_pale_blue ent_shorthand padding-10 float-left text-align-center hover_cursor"
                 v-if="index % 5 === 0 ">{{item.projectTitle ? item.projectTitle : '项目简称'}}
            </div>
            <div class="bg_pale_pink ent_shorthand padding-10 float-left text-align-center hover_cursor"
                 v-if="index % 5 === 1 ">{{item.projectTitle ? item.projectTitle : '项目简称'}}
            </div>
            <div class="bg_pale_yellow ent_shorthand padding-10 float-left text-align-center hover_cursor"
                 v-if="index % 5 === 2 ">{{item.projectTitle ? item.projectTitle : '项目简称'}}
            </div>
            <div class="bg_pale_green ent_shorthand padding-10 float-left text-align-center hover_cursor"
                 v-if="index % 5 === 3 ">{{item.projectTitle ? item.projectTitle : '项目简称'}}
            </div>
            <div class="bg_pale_violet ent_shorthand padding-10 float-left text-align-center hover_cursor"
                 v-if="index % 5 === 4 ">{{item.projectTitle ? item.projectTitle : '项目简称'}}
            </div>
          </div>

          <div class="float-left overflow-x" style="width: 70%;">
            <div>
              <!--              v-if="can_check"-->
              <span class="hover_cursor" style="font-size: 16px; font-weight: bolder;"
                    @click="toProject(item.projectId)">{{item.projectName}}</span>
              <span class="left-margin-10" style="height: 20px; line-height: 20px;" v-if="item.isOftenProject == 1">
                          <img src="@/views/icons/enterprise/often_project.png" style="vertical-align:middle; margin-left: 3px;"/>
                          </span>
              <span
                style="font-size: 14px; margin-left: 20px; background-color: #14DCDC; padding: 3px 5px; color: #ffffff;"
                v-if="item.isOftenApply">常年可报</span>
            </div>
            <div class="top-margin-10 overflow-x overflow-y">
              <div class="float-left inline-block" style="width: 100%;display: flex;justify-content: space-between;">
                <span style="flex: 1" class="inline-block">项目分类：<span class="color-05">{{item.projectTypeName}}</span></span>
                <span style="flex: 1" class="inline-block">订单类型：<span class="color-05">{{item.orderType == 0 ? '项目型订单' : item.orderType == 1 ? '知产型订单' : item.orderType == 2 ? '财务型订单' : item.orderType == 4 ? '项目审计型订单' : ''}}</span></span>
                <span style="flex: 1" class="inline-block">单价：{{item.unitPrice <=1 ? parseFloat((item.unitPrice * 100).toPrecision(12)) + '%' : item.unitPrice + '元'}}</span>
                <span style="flex: 1" class="inline-block" v-if="item.salesMinimumWay == 0">销售保底价：{{item.salesMinimum + '元'}} </span>
                <span style="flex: 1" class="inline-block" v-else>销售保底价：{{item.salesMinimum + '%'}} </span>
                <span style="flex: 1" class="inline-block" v-if="item.marketCommissioWay == 1">市场提成：{{item.marketCommissio}} %</span>
                <span style="flex: 1" class="inline-block" v-else>市场提成：{{item.marketCommissio}} 元</span>
                <span style="flex: 1" class="inline-block" v-if="item.projectCommissioWay == 1">项目提成：{{item.projectCommissioMoneyBill}} %</span>
                <span style="flex: 1" class="inline-block" v-else>项目提成：{{item.projectCommissioMoneyBill}} 元</span>
              </div>
            </div>
            <div class="top-margin-10 overflow-x overflow-y">
              <div class="float-left inline-block" style="width: 100%;display: flex;">
<!--                <span style="flex: 1" class="inline-block">订单类型：<span>{{item.orderType==0?'项目型':item.orderType==1?'知识产权型':item.orderType==2?'财务型':'-'}}</span></span>-->
                <span class="inline-block">订单流程：
                  <span>
                   {{item.flowName}}
                  </span>
                </span>
                <span style="flex: 1" class="inline-block"></span>
                <span style="flex: 1" class="inline-block"></span>
                <span style="flex: 1" class="inline-block"></span>
              </div>
            </div>
            <div class="top-margin-10 overflow-x overflow-y" style="background-color: #EFFAFF;"
                 v-for="(children_item, children_index) in item.policyNoticeInfoVos">
              <div style="width: 100%; color: #444444;display: flex;align-items:flex-start">
                <div class="right-margin-10 text-align-center list-num left-margin-10 top-margin-10"
                     style="min-width:20px;width: 20px;height: 20px;display: flex;align-items: center;justify-content: center; background: #FFCBA6; border-radius: 50% / 50%; color: #ffffff;">
                  {{ children_index + 1 }}
                </div>
                <div>
                  <div
                    :class="children_item.isOverdue? 'top-margin-10 inline-list is-overdue' : 'top-margin-10 inline-list'">
                    <div class="policy" @click="handleCheck(children_item)">
                      {{children_item.noticeType==1?'政策':'通知'}}：{{children_item.noticeName}}
                    </div>
                    <div class="list">
                      <div class="item">
                        <span>发布单位：{{children_item.publishOrgan?children_item.publishOrgan:'-'}}</span>
                      </div>
                      <div class="item">
                        <span>发布日期：{{children_item.publishDate?children_item.publishDate:'-'}}</span>
                      </div>
                      <div class="item">
                        <span>有效期：{{children_item.validDateBegin ? children_item.validDateBegin : '-'}} 至 {{children_item.validDateEnd? children_item.validDateEnd : '-'}}</span>
                      </div>
                      <div class="item">
                         <span>地区：{{children_item.provinceName}}
                        {{children_item.cityName ? '/' + children_item.cityName : '' }}
                        {{children_item.districtName ? '/' + children_item.districtName : ''}}
                        {{children_item.townName ? '/' + children_item.townName : ''}}
                        </span>
                      </div>
                      <div class="item">
                        <span>
                          补助金额：
                          <b style="color: red;">{{children_item.subsidyPriceMin && children_item.subsidyPriceMin !=='' ? children_item.subsidyPriceMin / 10000 : 0}}
                          -
                          {{children_item.subsidyPriceMax && children_item.subsidyPriceMax !==''? children_item.subsidyPriceMax /10000 : 0}}
                          万元</b>
                        </span>
                      </div>
                      <!--                      <div class="item">-->
                      <!--                        级别：-->
                      <!--                        <span v-if="children_item.areaLevel === 1">国家</span>-->
                      <!--                        <span v-else-if="children_item.areaLevel === 2">省级</span>-->
                      <!--                        <span v-else-if="children_item.areaLevel === 3">市级</span>-->
                      <!--                        <span v-else-if="children_item.areaLevel === 4">区县</span>-->
                      <!--                        <span v-else>镇街</span>-->
                      <!--                      </div>-->
                      <!--                      <div class="item">-->
                      <!--                        补贴金额：-->
                      <!--                        <span v-if="list.subsidyType == 0">{{list.subsidyTotal ? list.subsidyTotal + '万' : '-'}} </span>-->
                      <!--                        <span v-else>按企业实际情况补助</span>-->
                      <!--                      </div>-->
                      <!--                      <div class="item">年度：{{list.applyYear}}</div>-->
                      <!--                      <div class="item">线上提交日期：{{list.onlineDateStart ? list.onlineDateStart : ' - '}} 至-->
                      <!--                        {{list.onlineDateEnd ? list.onlineDateEnd : ' - '}}-->
                      <!--                      </div>-->
                      <!--                      <div class="item">纸质提交日期：{{list.paperDateStart ? list.paperDateStart : ' - '}} 至-->
                      <!--                        {{list.paperDateEnd ? list.paperDateEnd : ' - '}}-->
                      <!--                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="right float-right text-align-center overflow-x" style="width:17%;min-height: 100px;">
            <div class="float-left">
              <el-button class="filter-item border-blue" icon="el-icon-edit" size="mini"
                         @click="handleUpdate(item.projectId)" v-if="allowUpdate.twoAllow">编辑
              </el-button>
              <el-button @click="matchingCompany(item.projectId)" size="mini" style="margin-bottom: 10px;"class="filter-item border-blue" >匹配企业</el-button>
              <el-button class="filter-item border-blue" style="padding: 8px 3px;margin-bottom: 10px;" size="mini"
                         @click="createFreeOrder(item)" v-if="allowAddOrder.twoAllow">+创建免费订单
              </el-button>
            </div>
          </div>
        </div>
        <div class="padding-0" style="margin-top: 20px;">
          <div class="text-align-center" style="height: 40px; line-height: 30px;cursor: pointer" @click="pageDown"
               v-if="total - list.length > 0">点击加载更多
          </div>
          <div class="text-align-center" style="height: 40px; line-height: 30px;" v-else>没有更多数据了</div>
        </div>
      </el-card>

      <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;bottom: 100px;">
        <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
          <img src="../../icons/enterprise/back_top.png" alt="">
        </a>
      </div>
    </el-row>

    <el-dialog title="相关企业" :visible.sync="tableVisiable" width="800px" v-dialogDrag>
      <div style="margin-bottom:20px;">
        <el-input
          v-model="listEnterpriseQuery.enterpriseName" style="width: 400px;" placeholder="输入企业名称搜索">
          <el-button slot="append" icon="el-icon-search" @click="getEnterpriseList()"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <el-table :data="enterpriseList" border style="width: 100%">
        <el-table-column label="企业名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.enterprise__enterprise_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.project_library__project_name}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="enterpriseSizeChange" @current-change="enterpriseCurrentChange"
                       :current-page="listEnterpriseQuery.page" :page-sizes="[10,20,30, 50]"
                       :page-size="listEnterpriseQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="enterpriseTotal">
        </el-pagination>
      </div>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="tableVisiable = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="申报条件" :visible.sync="conditionVisiable" width="800px" v-dialogDrag>
      <!-- 表格 -->
      <el-table :data="conditionList" border style="width: 100%">
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.app_label_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据表" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.model_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="字段" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.field_zh_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="对比符" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.judge_condition}}</span>
          </template>
        </el-table-column>
        <el-table-column label="条件值" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.condition_value}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否统计" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.is_count ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否必选" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.is_must ? '是' : '否'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination background @size-change="conditionSizeChange" @current-change="conditionCurrentChange"
                       :current-page="listConditionQuery.page" :page-sizes="[10,20,30, 50]"
                       :page-size="listConditionQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="conditionTotal">
        </el-pagination>
      </div>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="conditionVisiable = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="创建免费订单" :visible.sync="createVisible" width="800px" :before-close="createClose" v-dialogDrag>
      <el-form :model="createForm" ref="createForm" :rules="createRule">
        <!--        <el-divider content-position="center"><span style="color: red;">*如果不选签订人，则取对应企业默认的业务跟踪员</span></el-divider>-->
        <el-row>
          <el-col :span="20">
            <el-form-item label="项目名称" label-width="120px">
              <span>{{createForm.projectName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="选择企业" label-width="120px" prop="crmCompanyIdList">
              <el-select v-model="createForm.crmCompanyIdList" multiple remote
                         :remote-method="companyRemoteMethod" :loading="loading"
                         filterable placeholder="请选择企业" size="small" clearable
                         v-loadMore="loadMore">
                <el-option v-for="item in enterprise_list"
                           :key="item.crmCompanyId"
                           :label="item.companyName"
                           :value="item.crmCompanyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="签订人" label-width="120px" prop="signUserId">
              <el-select v-model="createForm.signUserId" filterable placeholder="请选择签订人" size="small" clearable>
                <el-option v-for="item in user_list" :key="item.userId" :label="item.userName"
                           :value="item.userId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="签订日期" label-width="120px" prop="signDate">
              <el-date-picker size="small" v-model="createForm.signDate" type="date" value-format="yyyy-MM-dd" clearable
                              placeholder="签订日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="签订公司" label-width="120px" prop="signCompanyId">
              <el-select size="small" v-model="createForm.signCompanyId" placeholder="我方签约公司" clearable>
                <el-option v-for="item in sign_company_list" :key="item.companyId"
                           :label="item.companyName" :value="item.companyId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createClose">取 消</el-button>
        <el-button type="primary" @click="saveCreateOrder('createForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {queryAll, removelibrary, exportPolicyProject, manualMatching } from '@/api/projectManage'
  import {saveFreeOrderOfProject} from '@/api/orderManage'
  import {selectCompany, queryCompany} from '@/api/contractManage'
  import {queryFlowInfoNotAuthUrl} from '@/api/processManage'
  import {commonDictOfRegion, commonDict, queryUserInfoRole, downloadPolicy} from '@/api/utils'

  var order_list = [
    {'label': '创建时间顺序', 'value': 'project.createTime', type: 'ASC'},
    {'label': '创建时间倒序', 'value': 'project.createTime', type: 'DESC'},
    {'label': '单价顺序', 'value': 'project.unitPrice', type: 'ASC'},
    {'label': '单价倒序', 'value': 'project.unitPrice', type: 'DESC'},
    {'label': '销量倒序', 'value': 'sales', type: 'DESC'},
  ]

  export default {
    components: {},
    props: {},
    data() {
      return {
        btnFlag: 0,
        checked: '',
        more_condition: false,
        click_more_condition: false,
        select_conditions_list: {}, // 选中的条件
        // list: [{"biz_id":"717a872444dc468f883430f98e8f1cd7","projectName":"人才租房补贴","project_type":"","id":709,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"283709d34bbd4288988ef47106546a17","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"26dea95e9f0149c3b60815720bce2a51","projectName":"创业失败社会保险补贴","project_type":"","id":708,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"3c06d46b79f348339731e0cb1a0866b2","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"ec4b36f1619a4808a7d1e661e740d095","projectName":"高质量专利培育项目入库","project_type":"知识产权","id":707,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"9acd64687cd441d9ab96c9e9e595ff92","level":3,"province__province_name":"广东省","city__city_name":"佛山市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":50.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"6221c10fc2fb4848a3711cd43135bd96","projectName":"初创企业社会保险补贴","project_type":"","id":706,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"b97cbe22158a464ea94ce45bd1a876f8","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"2305e8968036408abb956b2fb018dcd0","projectName":"租金补贴","project_type":"","id":705,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"85f4d84684ee49ae99fe11a54254b3cc","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"bba064409cbc4e9989b499e17b7e343a","projectName":"一次性综合创业资助","project_type":"","id":704,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"89ca7d13411446999ebaa4f831925afd","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"ac5aca1caf394a228b0ab37d54a004f1","projectName":"创业资助","project_type":"","id":703,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"bb7b43d32eec49a39d0af4d22ec36b3f","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"a9d4caecbb2140829fa7b24d8f02fc78","projectName":"创业实训补贴","project_type":"","id":702,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"f920b02415c940759e2bda8a7a1dbb7b","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"79e7f903d8684976920c1f6b88a6e4d7","projectName":"创业培训补贴","project_type":"","id":701,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"df802def91cf4b34adf46a76000261cf","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"c0c105ff1d82422e87cb3ba451741979","projectName":"佛山市中小微企业合作服务机构产品上架","project_type":"科技项目类","id":699,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"15696c4a6e734e3b82aafbdac113d8b5","level":3,"province__province_name":"广东省","city__city_name":"佛山市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":"2020-05-08","online_date_end":"2020-05-15","paper_date_start":null,"paper_date_end":null}]},{"biz_id":"3606c46427c74cbfa933091dd2c1990f","projectName":"产学研合作专项资金","project_type":"科技项目类","id":697,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"6e249b118d27474f8ce16553668bbf7b","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":"2020","online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"50e2563bba2d4e45ba2cec9f30bb1772","projectName":"专利申请（实用新型）","project_type":"知识产权","id":696,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"a7244ab432614aa59df3d684ed84f621","level":2,"province__province_name":"广东省","city__city_name":null,"district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null},{"biz_id":"bb603610df8d4e44969f2ea193de0d6a","level":4,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":"金湾区","town__town_name":null,"subsidy_type":0,"subsidy_total":0.2,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"5d567171cb9f4c58a2801dcf0d22decd","projectName":"集成电路企业研发应用补贴","project_type":"科技项目类","id":694,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"aaa03a7a34ec4a80910147265b507462","level":3,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":1,"subsidy_total":0.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"9fc1abc808514b74b6301c4943ff3dae","projectName":"工业互联网产业示范基地","project_type":"科技项目类","id":693,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"5d8771962d2e4ef1b3fa81e30b9dc798","level":1,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":800.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null},{"biz_id":"cf1a23b85349485885b74f1733cc49f1","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":500.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"3c4c08390b5e4fb7be66c0eb3feda88d","projectName":"工业互联网标杆示范项目","project_type":"科技项目类","id":692,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"4baa6cef3cc64aa981451583d74d0bf6","level":3,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":150.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"8f54687e8f38428c8d772d41ec377b54","projectName":"工业互联网平台","project_type":"科技项目类","id":691,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"cc20e2fa95254bfaa6f5c61e9d949509","level":3,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":300.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"e69696404b3e42b8b898021cfe2001b1","projectName":"两化融合管理体系达标认定辅导（机构）","project_type":"科技项目类","id":690,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"9852a563a63143439021d19f97fd0d32","level":1,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":8.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null},{"biz_id":"1c0073d1fa144ea18c6b477a605b3872","level":3,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":"金湾区","town__town_name":null,"subsidy_type":0,"subsidy_total":5.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"566c55922fbf48018e8e291566b9b22b","projectName":"两化融合管理体系达标认定","project_type":"科技项目类","id":689,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"506e14b9484c4e7e93f1a48db49aac2b","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":50.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null},{"biz_id":"49dde483b9c346d09b4df6e604099955","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":"金湾区","town__town_name":null,"subsidy_type":0,"subsidy_total":35.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"898f0cde920d4fe3bf145720b84d488d","projectName":"广东省服务外包重点培育企业认定","project_type":"科技项目类","id":688,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"bd5ebfab89de4030982a7b045eb41bf4","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":10.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]},{"biz_id":"7ab9c2a2275640238f0107d0536c220d","projectName":"技术先进型服务企业认定","project_type":"科技项目类","id":687,"sub_title":"","unit_price":0.0,"sales_minimum_price":0.0,"sales_minimum_bill":0.0,"market_royalty_way":true,"market_royalty_money_bill":0.0,"project_royalty_way":true,"engineer_royalty_all":true,"is_often_apply":false,"project_royalty_money_bill":0.0,"children_list":[{"biz_id":"d143115299584eb1a9c923bd5d284fbb","level":2,"province__province_name":"广东省","city__city_name":"珠海市","district__district_name":null,"town__town_name":null,"subsidy_type":0,"subsidy_total":20.0,"apply_year":null,"online_date_start":null,"online_date_end":null,"paper_date_start":null,"paper_date_end":null}]}],
        list: [],
        cur_list: [],
        type_list: [],
        check_biz_ids: [],
        total: 0,
        listQuery: {
          page: 0,
          pageSize: 20,
          orderField:'sales',
          orderType: 'DESC',
          orderNum: 4,
        },
        order_list: order_list,
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        // 相关企业
        tableVisiable: false,
        enterpriseTotal: null,
        enterpriseList: [],
        listEnterpriseQuery: {
          page: 1,
          limit: 10,
          sort: '+id'
        },
        // 申报条件
        conditionVisiable: false,
        conditionTotal: null,
        conditionList: [],
        listConditionQuery: {
          page: 1,
          limit: 10
        },
        // 创建免费订单
        createVisible: false,
        createForm: {},
        ent_list: [],
        enterprise_list: [],
        user_list: [],
        sign_company_list: [],
        level: 3,
        parentId: '0',
        levelList: [
          {label: '国家级', value: 1},
          {label: '省级', value: 2},
          {label: '市级', value: 3},
          {label: '区县级', value: 4},
          {label: '镇街级', value: 5},
        ],
        orderTypeList: [
          {label: '项目型订单', value: 0},
          {label: '知产型订单', value: 1},
          {label: '财务型订单', value: 2},
          {label: '项目审计型订单', value: 4},
        ],
        oftenProjectList: [
          {label: '不是', value: 0},
          {label: '是', value: 1},
        ],
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
        companyPage: 0,
        companyPageSize: 20,
        companyTotal: "",
        loading: false,
        selectCompany: [],
        flowList: [],
        flowPage:1,
        flowPageSize: 100,
        searchType:1,
        // 权限
        allowGetProjectContract: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:PROJECT:CONTRACT'),//查询项目关联信息-供给合同模块
        allowAdd: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:INSERT'),//新增项目
        allowUpdate: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:UPDATE'),//修改项目
        allowGetList: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:LIST'),//查询所有项目库信息
        allowDeleteSon: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:DELETE:CHILD'),//删除项目库子项
        allowDelete: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:DELETE'),//删除项目记录
        allowAddOrder: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:FREEORDER:ADD'),//从项目库添加免费订单
      }
    },
    activated() {
      // this.listQuery.page = 0;
      // this.listQuery.pageSize = 10;
      if (localStorage.getItem('searchName') == '') {
        this.$set(this.listQuery, 'projectName', '');
      }
      this.getCommonData();

      if(this.$store.getters.projectPage != 0){
        this.listQuery.page = 0;
        this.listQuery.pageSize = this.$store.getters.projectPage + 20;
        this.getList()
      }else{
        this.listQuery.page = this.$store.getters.projectPage;
        this.listQuery.pageSize = 20;
        this.getList()
      }

      window.addEventListener('scroll', this.scrollToTop)

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.projectScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    deactivated() {
      localStorage.removeItem('searchName')
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
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
      this.$store.commit('SET_PROJECT_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_PROJECT_PAGE', this.listQuery.page) //离开路由时把位置存起来
      next()
    },
    methods: {

      // 匹配企业
      matchingCompany(projectId) {
        // 手动执行智能匹配
        manualMatching({projectId: projectId}).then(res => {
          if (res.code === 200) {
            this.$router.push({'path': '/policy/project/matchingCompany', 'query': {'id': projectId, 'queryType': 'project'}})
          }
        })
      },

      loadMore() {
        this.companyPage = this.companyPage + 20;
        // this.companyPageSize = this.companyPageSize + 10;
        let params = {
          page: this.companyPage,
          pageSize: this.companyPageSize,
          queryExistSalesman: 1
        };
        selectCompany(params).then(res => {
          if (res.code == 200) {
            this.enterprise_list = this.enterprise_list.concat(res.data.data)
          }
        })
      },

      //企业远程搜索
      companyRemoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getCompanyData(query);
          }, 200);
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getCompanyData();
          }, 200);
        }
      },

      //获取企业
      getCompanyData(query) {
        this.companyPage = 0;
        this.companyPageSize = 20;
        let params = {
          page: this.companyPage,
          pageSize: this.companyPageSize,
          queryExistSalesman: 1,
          companyName: query
        };
        selectCompany(params).then(res => {
          if (res.code == 200) {
            this.enterprise_list = res.data.data;
            this.companyTotal = res.data.total;
          }
        })
      },

      //获取签订人
      getSignerData() {
        let formData = new FormData;
        formData.append('roleName', '业务员')
        queryUserInfoRole(formData).then(res => {
          if (res.code == 200) {
            this.user_list = res.data.data;
          }
        })
      },
      //获取签约公司
      getCompanyList() {
        queryCompany().then(res => {
          if (res.code == 200) {
            this.sign_company_list = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //关闭弹窗
      createClose() {
        this.enterprise_list = [];
        this.createForm = {};
        this.createVisible = false;
      },

      // 删除
      handleDel(id) {
        if (this.check_biz_ids.length < 1) {
          this.$message.error('请选择想要删除的项目')
          return
        }

        this.$confirm('您确定删除吗？').then(_ => {
          removelibrary({projectId: this.check_biz_ids}).then(response => {
            if (response.code == 200) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.list = [];
              this.check_biz_ids = [];
              this.listQuery.page = 0
              this.listQuery.pageSize = 20;
              this.getList()
            }
          })
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
      // 开始搜索
      goSearch() {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.list = []
        this.getList()
      },
      // 查看
      toProject(id) {
        this.$router.push({'path': '/policy/project/detail', 'query': {'id': id, 'check': true}})
        // if (this.can_check_project) {
        //   this.$router.push({ 'path': '/sys-setup/grp-project-mng/check', 'query': { 'id': id, 'check': true }})
        // } else {
        //   this.$message.error('您还没有查看项目的权限哦！')
        // }
      },
      // 编辑
      handleUpdate(id) {
        // this.$router.push({ 'path': '/sys-setup/grp-project-mng/edit', 'query': { 'id': biz_id }})
        this.$router.push({'path': '/policy/project/edit', 'query': {'id': id}})
      },
      // 新增
      toCreate() {
        // this.$router.push({ 'path': '/sys-setup/grp-project-mng/create' })
        this.$router.push({'path': '/policy/project/create'})
      },
      // 确定要收集的资料资料
      handleCollect(id) {
        // this.$router.push({ 'path': '/sys-setup/grp-project-mng/collect' })
        this.$router.push({'path': '/policy/project/collect'})
      },
      // 全选、 反全选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.list.forEach(function (item, index) {
            if (_this.check_biz_ids.indexOf(item.projectId) === -1) {
              _this.check_biz_ids.push(item.projectId)
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
      // 清空一个
      deleteOneClick(item) {
        this.list = []
        this.$delete(this.select_conditions_list, item)
        this.$delete(this.listQuery, item)
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },
      // 清空所有
      deleteAllClick() {
        this.list = []
        this.select_conditions_list = {}
        this.listQuery = {}
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },
      // 筛选更多条件
      getMoreCondition() {
        this.more_condition = !this.more_condition
        if (!this.click_more_condition) {
          this.click_more_condition = true
          this.getCommonData();
          this.getRegionList();
          this.getFlowList();
        }
      },
      handleFilterProjectType(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.type_list.forEach(item => {
              if (val == item.dictId) {
                arr.push(item.dictName)
              }
            })

            const string = arr.join('，')
            this.$set(this.select_conditions_list, 'projectTypes', `项目分类 - ${string}`)
          })
          // this.$set(this.select_conditions_list, 'type_name', '项目分类 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'projectTypes')
        }

        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },
      handleFilterProjectLevel(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.levelList.forEach(item => {
              if (val == item.value) {
                arr.push(item.label)
              }
            })
            const string = arr.join('，')
            this.$set(this.select_conditions_list, 'areaLevel', `项目级别 - ${string}`)
          })
          // this.$set(this.select_conditions_list, 'project_level', '项目级别 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'areaLevel')
        }
        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },

      handleFilterOrderType(val){
        if(val !== 0 && val == ''){
          this.$delete(this.select_conditions_list, 'orderClass')
        }else{
          this.$set(this.select_conditions_list, 'orderClass', '订单类型 - ' + this.orderTypeList.find(ele => ele.value === val).label)
        }

        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },

      handleOftenProject(val){
        if(val !== 0 && val == ''){
          this.$delete(this.select_conditions_list, 'isOftenProject')
        }else{
          this.$set(this.select_conditions_list, 'isOftenProject', '是否常规可报项目 - ' + this.oftenProjectList.find(ele => ele.value === val).label)
        }

        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },

      handleFilterFlow(val){
        if(val !== 0 && val == ''){
          this.$delete(this.select_conditions_list, 'flowId')
        }else{
          this.$set(this.select_conditions_list, 'flowId', '订单流程 - ' + this.flowList.find(ele => ele.flowId === val).flowName)
        }

        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },

      changeProvince(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'provinceId', '省份 - ' + this.province_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'provinceId')
          this.$delete(this.listQuery, 'cityId')
          this.$delete(this.listQuery, 'districtId')
          this.$delete(this.listQuery, 'townId')
        }
        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.$delete(this.select_conditions_list, 'cityId')
        this.$delete(this.select_conditions_list, 'districtId')
        this.$delete(this.select_conditions_list, 'townId')
        // this.areaSetNull(3)
        // this.getCitys()
        this.parentId = val
        this.level = 2;
        this.getRegionList()
        this.getList()
      },
      changeCity(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'cityId', '城市 - ' + this.city_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'cityId')
          this.$delete(this.listQuery, 'districtId')
          this.$delete(this.listQuery, 'townId')
        }
        this.list = []
        this.$delete(this.select_conditions_list, 'districtId')
        this.$delete(this.select_conditions_list, 'townId')
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        // this.areaSetNull(2)
        // this.getDistricts()
        this.parentId = val
        this.level = 1;
        this.getRegionList()
        this.getList()
      },
      changeDistrict(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'districtId', '区县 - ' + this.district_list.find(ele => ele.dictId === val).dictName)
          this.$delete(this.select_conditions_list, 'townId')
        } else {
          this.$delete(this.select_conditions_list, 'districtId')
          this.$delete(this.select_conditions_list, 'townId')
          this.$delete(this.listQuery, 'townId')
        }
        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.parentId = val
        this.level = 0;

        this.getRegionList()
        this.getList()
      },
      getTownsId(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'townId', '镇街 - ' + this.town_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'townId')
        }
        this.list = []
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },
      getList() {
        if (this.allowGetList.twoAllow) {
          queryAll(this.listQuery).then(response => {
            if (this.listQuery.page > 0) {
              this.list = this.list.concat(response.data.data)
            } else {
              this.list = response.data.data;
              this.check_biz_ids = [];

              if(this.$store.getters.projectPage != 0){
                this.listQuery.page = this.$store.getters.projectPage;
                this.listQuery.pageSize = 20;
              }
            }
            this.total = response.data.total
            this.list.forEach(item => {
              if (item.marketCommissio <= 1) {
                item.marketCommissio = parseFloat((item.marketCommissio * 100).toPrecision(12))
                item.marketCommissioWay = 1
              } else {
                item.marketCommissioWay = 0
              }
              if (item.projectCommissioMoneyBill <= 1) {
                item.projectCommissioMoneyBill = parseFloat((item.projectCommissioMoneyBill * 100).toPrecision(12))
                item.projectCommissioWay = 1
              } else {
                item.projectCommissioWay = 0
              }
              if (item.salesMinimum <= 1) {
                item.salesMinimum = parseFloat((item.salesMinimum * 100).toPrecision(12))
                item.salesMinimumWay = 1
              } else {
                item.salesMinimumWay = 0
              }


              if (item.policyNoticeInfoVos.length > 0) {
                item.policyNoticeInfoVos.forEach(data => {
                  if (data.validDateEnd) {
                    let day2 = new Date();
                    day2.setTime(day2.getTime());
                    let y = day2.getFullYear();
                    let m = day2.getMonth() + 1 < 10 ? "0" + (day2.getMonth() + 1) : day2.getMonth() + 1;
                    let d = day2.getDate() < 10 ? "0" + day2.getDate() : day2.getDate();
                    let nowData = `${y}-${m}-${d}`;

                    if (data.validDateEnd.replace(/\-/g, "") < nowData.replace(/\-/g, "")) {
                      data.isOverdue = true;
                    }
                  }
                });
              }

              this.type_list.forEach(data => {
                if (item.projectType == data.dictId) {
                  item.projectTypeName = data.dictName
                }
              })
            })

            let obj = {}
            this.list = this.list.reduce((cur, next) => {
              obj[next.projectId] ? '' : obj[next.projectId] = true && cur.push(next)
              return cur
            }, [])
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取列表')
        }
      },

      // 导出
      handleExport() {
        this.listQuery.pageSize = this.total;
        this.listQuery.page = 0;
        this.listQuery.projectIds = this.check_biz_ids;
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportPolicyProject(this.listQuery).then(res => {
          if (res.code == 200) {
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadPolicy(parData).then(response => {
              this.listQuery.projectIds = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-项目列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close();
            })
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      // 点击翻页
      pageDown() {
        this.listQuery.page = this.listQuery.page + 20;
        this.listQuery.pageSize = 20;
        this.getList()
      },
      // 相关企业
      enterpriseSizeChange(val) {
        this.listEnterpriseQuery.limit = val
        this.getEnterpriseList()
      },
      enterpriseCurrentChange(val) {
        this.listEnterpriseQuery.page = val
        this.getEnterpriseList()
      },
      getEnterpriseInfo(biz_id) {
        this.listEnterpriseQuery.id = biz_id
        this.getEnterpriseList()
      },
      getEnterpriseList() {
        this.tableVisiable = true
        // getEnterpriseInfo(this.listEnterpriseQuery).then(response => {
        //   this.enterpriseList = response.data.data
        //   this.enterpriseTotal = response.data.recordsTotal
        // })
      },
      // 申报条件
      conditionSizeChange(val) {
        this.listConditionQuery.limit = val
        this.getConditionList()
      },
      conditionCurrentChange(val) {
        this.listConditionQuery.page = val
        this.getConditionList()
      },
      handleCondition(biz_id) {
        this.listConditionQuery.id = biz_id
        this.getConditionList()
      },
      getConditionList() {
        this.conditionVisiable = true
        // getConditionInfo(this.listConditionQuery).then(response => {
        //   this.conditionList = response.data.data
        //   this.conditionTotal = response.data.recordsTotal
        // })
      },

      // 打开创建免费订单弹窗
      createFreeOrder(item) {
        this.$router.push({
          path: '/policy/project/addFreeOrder',
          query: {
            projectBox: JSON.stringify(item),
            projectId: item.projectId,
            projectName: item.projectName
          }
        })
        // this.createForm = {}
        // this.createVisible = true
        // this.getCompanyData();
        // this.getSignerData();
        // this.getCompanyList();
        // this.createForm.projectName = item.projectName
        // this.createForm.projectId = item.projectId
        // this.createForm.projectList = [];
        // item.policyProjectAreaVoList.forEach(list=>{
        //   list.policyProjectYearVoList.forEach(data=>{
        //     let str = {
        //       applyBatchNo: data.applyBatchNo,
        //       applyNum: 1,
        //       applyYear: data.applyYear,
        //       areaId: data.areaId,
        //       areaLevel: list.areaLevel,
        //       cityId: list.cityId,
        //       districtId: list.districtId,
        //       flowId: item.flowId,
        //       onlineDate: data.onlineDateStart,
        //       onlineDateEnd: data.onlineDateEnd,
        //       orderType: item.orderType,
        //       paperDateEnd: data.paperDateEnd,
        //       paperDateStart: data.paperDateStart,
        //       projectId: item.projectId,
        //       projectName: item.projectName,
        //       projectType: item.projectType,
        //       provinceId: list.provinceId,
        //       subsidyTotal: data.subsidyTotal,
        //       townId: list.townId,
        //       unitPrice: item.unitPrice,
        //       yearId: data.yearId
        //     }
        //
        //     this.createForm.projectList.push(str);
        //   })
        // })
      },
      // 创建免费订单
      saveCreateOrder(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            saveFreeOrderOfProject(this.createForm).then(response => {
              if (response.code == 200) {
                this.createVisible = false;
                this.createForm = {};
                this.$message.success('操作成功')
              }
            })
          } else {
            return false;
          }
        })
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PROJECT_TYPE',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.type_list = res.data['DICT:PROJECT_TYPE']
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取地区信息
      getRegionList() {
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
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //跳转到政策/通知详情
      handleCheck(data) {
        if (data.noticeType == 1) {
          this.$router.push({
            'path': '/policy/detailPolicy',
            'query': {'noticeId': data.noticeId, 'is_check': true}
          })
        } else {
          this.$router.push({'path': '/policy/detailPolicy', 'query': {'noticeId': data.noticeId, 'is_check': true}})
        }
      },

      //获取流程列表
      getFlowList(){
        var params = {
          page: this.flowPage,
          pageSize: this.flowPageSize,
        }
        queryFlowInfoNotAuthUrl(params).then(res=>{
          if(res.code == 200){
            this.flowList = res.data.data
          }
        })
      },

      changeSearch(num){
        this.searchType = num;
      }
    }
  }
</script>

<style lang="less" scoped>
  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
    font-size: 12px;
  }

  .overflow-x {
    overflow-x: hidden;
  }

  .overflow-y {
    overflow-y: hidden;
  }

  .width-0-15 {
    width: 15%;
    height: 18px;
    line-height: 18px;
    overflow-y: hidden;
    overflow-x: hidden;
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

  .line-height-20 {
    height: 20px;
    line-height: 20px;
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

  .top-bottom-10 {
    margin-bottom: 10px;
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
    color: rgba(4, 43, 64, 1);
    opacity: 1;
  }

  .hot-search-kw {
    margin: auto 10px;
    width: 24px;
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: rgba(151, 151, 151, 1);
    opacity: 1;
  }

  .center-items {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
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

  .bg_pale_violet {
    background: rgb(155, 181, 255);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(155, 181, 255, .5);
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
    width: 60px;
    min-width: 60px;
    height: 60px;
    font-size: 16px;
    color: #f0f7ff;
    margin-left: 15px;
    margin-right: 11px;
    border-radius: 4px;
    word-break: break-all;
    overflow: hidden;
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

  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 15px;
    position: relative;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9
  }

  input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #05AAFF;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid #05AAFF;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
  }


  /*--------------------------------*/
  .search-bar {
    .searchType{
      display: flex;
      div{
        padding: 10px;
        background:#fff;
        cursor: pointer;
        border: 1px solid #05AAFF;
        border-bottom: none;
      }
      .active{
        background:#00a5ff;
        color:#fff;
      }
    }

    .search {
      /deep/ .el-input__inner {
        border: 1px solid #05AAFF;
        border-radius: 0;
        height: 38px;
        border-right: 0;
      }

      /deep/ .el-input-group__append{
        padding: 0 20px;
      }
    }

    .search-btn {
      border-radius: 0;
      background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
      color: #fff;

      &.search-btn:hover {
        background: linear-gradient(180deg, rgba(105, 204, 255, 0.5) 0%, rgba(5, 170, 255, .5) 100%);
      }
    }

    .add-btn {
      border: 0;
      border-radius: 2px;
      height: 38px;
      margin-left: 10px;
    }
  }

  .screen-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .left {
      display: flex;

      .screen-title {
        white-space: nowrap;
        margin-top: 3px;

        .tag {
          display: inline-block;
          width: 3px;
          height: 14px;
          background: #03ADF4;
          vertical-align: middle;
          margin-top: -2px;
        }
      }

      .screen-list {
        display: flex;
        flex-wrap: wrap;

        .item {
          border: 1px solid #33B3EE;
          font-size: 12px;
          color: #33B3EE;
          padding-left: 5px;
          padding-right: 2px;
          margin-bottom: 10px;
        }

        .screen-clear {
          cursor: pointer;
          border: 1px solid #ff0000;
          font-size: 12px;
          color: #ff0000;
          padding-left: 5px;
          padding-right: 2px;
          margin-bottom: 10px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      img {
        margin-right: 4px;
      }
    }
  }

  .get-search-bar {
    .tag {
      display: inline-block;
      width: 3px;
      height: 14px;
      background: #FFA96A;
      margin-right: 5px;
      vertical-align: middle;
      margin-top: -2px;
    }

    .btn-item {
      border: 1px solid #05AAFF;
      color: #05AAFF;
    }

    .select-item {
      /deep/ .el-input__inner {
        border: 0;
        color: #05AAFF;
        text-align: right;
        font-size: 14px
      }
    }
  }

  .list-bar {
    width: 100%;
    min-width: 1000px;
    padding-bottom: 20px;
    border-bottom: 2px solid #F1F0F2;
    padding-left: 8px;

    .left {
      display: flex;
      align-items: center;

      .check {
        cursor: pointer;
        margin-top: 24%;
      }
    }

    .right {
      width: 10%;
      display: flex;
      justify-content: flex-end;

      .border-blue {
        border: 1px solid #05AAFF;
        color: #05AAFF;

        &:hover {
          background: none;
        }
      }

      .disable_bt {
        border: 1px solid #555555;
        color: #555555;

        &:hover {
          background: none;
        }
      }

      .border_pink {
        border: 1px solid rgb(254, 149, 178);
        color: rgb(254, 149, 178);

        &:hover {
          background: none;
        }
      }

      .border_yellow {
        border: 1px solid rgb(255, 203, 166);
        color: rgb(255, 203, 166);

        &:hover {
          background: none;
        }
      }

      .border_violet {
        border: 1px solid rgb(155, 181, 255);
        color: rgb(155, 181, 255);

        &:hover {
          background: none;
        }
      }
    }
  }

  .inline-list {
    .list-num {
      min-width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -2px;
    }

    .policy {
      font-size: 15px;
      color: #05AAFF;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .item {
        margin-right: 40px;
        margin-bottom: 10px;
      }
    }
  }

  .is-overdue {
    color: #ccc !important;

    .policy {
      color: #ccc !important;
    }
  }
</style>
