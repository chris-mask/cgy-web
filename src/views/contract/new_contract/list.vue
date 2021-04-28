<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-96" style="margin-bottom: 20px; font-size: 14px;">
      <!--搜索-->
      <el-card class="top-margin-10 center-items" v-if="ent_form_id === ''||ent_form_id===undefined">
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item>
            <el-input placeholder="请输入企业名称/项目名称/合同编号" @keyup.enter.native="goSearch" size="large" v-model="listQuery.contract_name" style="width: 500px;">
              <el-button slot="append" size="large" icon="el-icon-search" class="bg_pale_blue" @click="goSearch" style="color: #fff; background-color: #05AAFF;">搜一下</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" class="filter-item bg_pale_blue" style="margin-left: 10px;" v-if="can_create" @click="toCreate">+新增</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="top-margin-10 padding-0" v-if="ent_form_id === ''||ent_form_id===undefined">
        <div class="screen-box">
          <div class="left">
            <span style="margin-top: 4px;white-space: nowrap;"><span style="color: #03ADF4; font-weight: bold;">|</span>已选条件：</span>
            <div class="screen-list">
            <span class="padding-vertical-5 left-margin-10" v-for="(value, key) in select_conditions_list"
                  style="border: 1px solid #33B3EE; font-size: 12px; color: #33B3EE; padding-left: 5px; padding-right: 2px;margin-bottom: 10px;">
              {{value}}<img class="hover_cursor" @click="deleteOneClick(key)" src="../../icons/enterprise/close_con.png"
                            style="vertical-align:middle; margin-left: 3px;"/>
            </span>
              <span class="padding-vertical-5 left-margin-10" @click="deleteAllClick"
                    v-if="Object.keys(select_conditions_list).length > 1"
                    style="border: 1px solid #ff0000; font-size: 12px; color: #ff0000; padding-left: 5px; padding-right: 2px;cursor: pointer;margin-bottom: 10px;">
               清空所有
            </span>
            </div>
          </div>

          <span class="right float-right right-margin-10 hover_cursor" @click="getMoreCondition">
            <img v-if="more_condition" src="../../icons/enterprise/close_icon.png" style="vertical-align:middle;"/>
            <img v-else src="../../icons/enterprise/open_icon.png" style="vertical-align:middle;"/>
            <span style="color: #33B3EE;white-space: nowrap;">选择筛选条件</span>
          </span>
        </div>

        <div v-if="more_condition">
          <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"> </div>
          <div class="left-margin-10">
            <div class="top-margin-10">
              <el-form :inline="true">
                <el-form-item label="常用：" style="margin-bottom: 10px;display: flex;">
                  <el-select multiple @change='handleFilterDepartment' filterable clearable size="mini" class="inline-block float-left right-margin-10" @blur="clearUser" v-model="listQuery.department" placeholder="选择部门">
                    <el-option v-for="item in filter_department_list" :key="item.biz_id" :label="item.department_name" :value="item.biz_id"> </el-option>
                  </el-select>
                  <el-select multiple @change='handleFilterUser' size="mini" filterable clearable class="inline-block float-left right-margin-10" v-model="listQuery.sys_user" placeholder="选择签订人">
                    <el-option v-for="item in filter_user_list" :key="item.biz_id" :label="item.user_name" :value="item.biz_id"> </el-option>
                  </el-select>
                  <el-date-picker @change='handleFilterSignDate' size="mini" class="inline-block float-left right-margin-10" clearable v-model="listQuery.sign_date_start" type="date" value-format="yyyy-MM-dd" placeholder="签订开始时间"> </el-date-picker>
                  <el-date-picker @change='handleFilterSignDate' size="mini" class="inline-block float-left right-margin-10" clearable v-model="listQuery.sign_date_end" type="date" value-format="yyyy-MM-dd" placeholder="签订结束时间"> </el-date-picker>
                  <el-select multiple @change='handleFilterPerformStateList' size="mini" filterable clearable class="inline-block float-left" v-model="listQuery.perform_state" placeholder="履行状态">
                    <el-option v-for="item in perform_state_list" :key="item.id" :label="item.dict_value" :value="item.dict_value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="项目：" style="margin-bottom: 10px;display: flex;">
                  <el-select multiple class="inline-block input-150 float-left right-margin-10" size="mini" @change='handleFilterProject' filterable clearable v-model="listQuery.project_id" placeholder="项目">
                    <el-option v-for="item in project_list" :key="item.biz_id" :label="item.project_name" :value="item.biz_id"> </el-option>
                  </el-select>
                  <el-date-picker @change='handleFilterApplyYear' size="mini" class="inline-block input-150 float-left right-margin-10" clearable v-model="listQuery.apply_year" type="year" value-format="yyyy" placeholder="项目年度"> </el-date-picker>
                  <el-select multiple class="inline-block float-left right-margin-10" size="mini" @change='handleFilterProjectLevel' filterable clearable v-model="listQuery.project_level" placeholder="项目级别">
                    <el-option v-for="item in project_level_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="地区：" style="margin-bottom: 10px;display: flex;">
                  <el-select @change='changeProvince' size="mini" clearable class="inline-block input-150 float-left right-margin-10"  v-model="listQuery.province_id" placeholder="省份">
                    <el-option v-for="item in province_list" :key="item.pk" :label="item.province_name" :value="item.pk"> </el-option>
                  </el-select>
                  <el-select @change='changeCity' size="mini" clearable class="inline-block input-150 float-left right-margin-10" v-model="listQuery.city_id" placeholder="城市">
                    <el-option v-for="item in city_list" :key="item.pk" :label="item.city_name" :value="item.pk"> </el-option>
                  </el-select>
                  <el-select @change='changeDistrict' size="mini" clearable class="inline-block input-150 float-left right-margin-10" v-model="listQuery.district_id" placeholder="县区">
                    <el-option v-for="item in district_list" :key="item.pk" :label="item.district_name" :value="item.pk"> </el-option>
                  </el-select>
                  <el-select @change='getTownsId' size="mini" clearable class="inline-block input-150 float-left" v-model="listQuery.town_id" placeholder="镇街">
                    <el-option v-for="item in town_list" :key="item.pk" :label="item.town_name" :value="item.pk"> </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="性质：" style="margin-bottom: 10px;display: flex;">
                  <el-select multiple @change='handleFilterIsNewOrNot' size="mini" class="inline-block float-left right-margin-10" clearable v-model="listQuery.is_new_or_not" placeholder="新老客户">
                    <el-option v-for="item in is_new_or_not_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                  <el-select multiple @change='handleFilterCustomerClassification' size="mini" class="inline-block float-left right-margin-10" clearable v-model="listQuery.customer_classification" placeholder="客户级别">
                    <el-option v-for="item in customer_classification_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                  <el-select multiple @change='handleFilterIsChannel' size="mini" class="inline-block float-left" clearable v-model="listQuery.is_channel" placeholder="是否渠道">
                    <el-option v-for="item in is_channel_list" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="top-margin-10 padding-0">
        <div v-if="ent_form_id === '' || ent_form_id === undefined">
          <span style="color: #ABABAB;">搜索到<span style="color:#F9A9A9;">{{total}}</span>条记录</span>
          <el-button class="filter-item bg_blue" size="mini" @click='checkAllOrNo' style="margin-left: 10px;">全选</el-button>
          <el-button class="filter-item bg_blue left-margin-10" size="mini" @click="handleExport">导出</el-button>
          <el-button class="filter-item bg_gray left-margin-10" size="mini" v-if="can_delete" @click="handleDel">删除</el-button>
          <el-button class="filter-item bg_orange left-margin-10" size="mini" v-if="can_change_sign" @click="handleChangeSignUser">修改签订人</el-button>
          <span class="float-right right-margin-10" style="vertical-align:middle;">
            <el-select @change='handleOrder' size="mini" v-model="listQuery.order" clearable placeholder='默认排序'>
              <el-option v-for="item in order_list"  :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </span>
        </div>
        <div class="top-margin-10" style="height: 3px; background-color: #EDF4FF; width: 100%;"> </div>
        <div class="top-margin-10 overflow-x" style="padding-bottom: 20px; border-bottom: 2px solid #F1F0F2;" v-for="(item, index) in list">
          <div class="float-left overflow-x" style="width: 90px; min-height: 100px;" v-if="ent_form_id === '' || ent_form_id === undefined">
            <div class="float-left center-items">
              <input type="checkbox" name="check_biz_ids" :value="item.biz_id" v-model="check_biz_ids"/>
            </div>
            <div class="bg_pale_blue ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                 style="width : 60px; height: 60px;" @click="toCheck(item.biz_id)" v-if="index % 5 === 0 ">{{item.enterprise__sub_title ? item.enterprise__sub_title : '企业简称'}}</div>
            <div class="bg_pale_pink ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                 style="width : 60px; height: 60px;" @click="toCheck(item.biz_id)" v-if="index % 5 === 1 ">{{item.enterprise__sub_title ? item.enterprise__sub_title : '企业简称'}}</div>
            <div class="bg_pale_yellow ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                 style="width : 60px; height: 60px;" @click="toCheck(item.biz_id)" v-if="index % 5 === 2 ">{{item.enterprise__sub_title ? item.enterprise__sub_title : '企业简称'}}</div>
            <div class="bg_pale_green ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                 style="width : 60px; height: 60px;" @click="toCheck(item.biz_id)" v-if="index % 5 === 3 ">{{item.enterprise__sub_title ? item.enterprise__sub_title : '企业简称'}}</div>
            <div class="bg_pale_violet ent_shorthand left-margin-10 padding-10 float-left text-align-center hover_cursor"
                 style="width : 60px; height: 60px;" @click="toCheck(item.biz_id)" v-if="index % 5 === 4 ">{{item.enterprise__sub_title ? item.enterprise__sub_title : '企业简称'}}</div>
          </div>
          <div class="float-left overflow-x" style="width: 80%;">
            <div v-if="ent_form_id === '' || ent_form_id === undefined">
              <span class="hover_cursor" style="font-size: 16px; font-weight: bolder;"  @click="toEnterprise(item.enterprise__biz_id)">{{item.enterprise__enterprise_name}}</span>
              <span
                style="background-color: #FF8585; padding: 3px 7px; height: 20px; width: 30px; line-height: 20px; color: #ffffff; margin-left: 13px; border-radius:10px;" v-if="item.enterprise__is_new_or_not">new</span>
            </div>
            <div class="top-margin-10 overflow-x overflow-y">
              <div class="float-left inline-block" style="width: 100%;">
                <span class="inline-block width-0-25">合同编号：{{ item.contract_code }}</span>
                <span class="width-0-15 inline-block">创建时间：{{item.create_time | parseTime('{y}-{m}-{d}')}}</span>
                <span class="width-0-15 inline-block">有效期：{{item.available_year}}年</span>
                <span class="width-0-15 inline-block" v-if="item.is_channel">渠道：{{item.channel_enterprise__enterprise_name}}</span>
              </div>
            </div>
            <div class="top-margin-10 overflow-x overflow-y">
              <div class="float-left inline-block" style="width: 100%;">
                <span class="width-0-25 inline-block">签约公司：{{ item.sign_company__enterprise_name }}</span>
                <span class="width-0-15 inline-block">签订日期：{{item.sign_date}}</span>
                <span class="width-0-15 inline-block">签订人&nbsp;：{{item.sign_user__user_name}}</span>
                <span class="width-0-15 inline-block">履行状态：{{item.perform_state}}</span>
              </div>
            </div>
            <div class="top-margin-10 overflow-x overflow-y">
              <div style="width: 100%; color: #444444; margin-bottom: 10px;">
                <div class="left-margin-10 top-bottom-10 bg-list" style="width: 100%;" v-for="(children_item, children_index) in item.item_list">
                  <div class="item-bg-list" style="float: left; width: 95%;padding-top: 12px;">
                    <div style="width: 100%; float: left; font-size: 12px;">
                      <div class="first-list">
                        <span class="float-left right-margin-10 text-align-center item-num">{{ children_index + 1 }}</span>
                        <div class="item-list">
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 25%">
                            <span class="float-left">项目：</span>
                            <span class="float-left hover_cursor project-num" style="color: #05AAFF;" @click="toProject(children_item.project_library__biz_id)" :title="children_item.project_library__project_name">
                            {{children_item.project_library__project_name}}
                          </span>
                          </div>
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 10%" v-if="children_item.contract_price_or_bill === '1'">比例：{{children_item.price_and_bill}}%</div>
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 10%" v-else >金额：{{children_item.price_and_bill}}万元</div>
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 12%">开始日期：{{children_item.project_year_item__online_date_start}}</div>
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 12%">截止日期：{{children_item.project_year_item__online_date_end}}</div>
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 12%">工程师：{{children_item.project_user}}</div>
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 12%">审计人员：{{children_item.finance_user}}</div>
                          <div class="item inline-block overflow-x overflow-y right-margin-10" style="min-width: 10%">当前进度：{{children_item.order_info ? children_item.order_info.now_state : ''}}</div>
                        </div>

                        <div class="inline-block overflow-x overflow-y hover_cursor" style="color: #5883FF;width: auto;min-width: 5%" @click="goOrder(children_item.order_info.biz_id)">
                          查看订单
                        </div>

                        <div class="inline-block overflow-x overflow-y hover_cursor" style="color: #5883FF;width: auto;min-width: 5%" @click="cratePlanBack(item.enterprise__enterprise_name, children_item.project_library__project_name, children_item.id)">
                          计划回款
                        </div>

                      </div>
                      <div class="line-height-20" style="margin-bottom:10px;margin-left: 30px;">
                        <span class="inline-block overflow-x overflow-y" style="min-width: 12%">年份：{{children_item.apply_year}}</span>
                        <span class="inline-block overflow-x overflow-y" style="min-width: 12%" v-if="children_item.order_info && children_item.order_info.high_tech">批次：{{children_item.order_info.high_tech}}</span>
                        <span class="inline-block overflow-x overflow-y" style="min-width: 12%">级别：{{children_item.level}}</span>
                        <span class="inline-block overflow-x overflow-y" style="min-width: 12%">数量：{{children_item.num}}</span>
                        <span class="inline-block overflow-x overflow-y" v-if="children_item.publicity_date" style="min-width: 12%">公示日期：{{children_item.publicity_date}}</span>
                        <span class="inline-block overflow-x overflow-y" v-if="children_item.publicity_date" style="min-width: 12%">批准金额：{{children_item.approval_money}}万元</span>
                        <span class="inline-block overflow-x overflow-y" v-if="children_item.publicity_date" style="min-width: 12%">待收金额：{{children_item.no_back_money_total}}万元</span>
                      </div>
                      <div style="padding-left: 35px" v-for="cash_back_item in children_item.cash_back_list">

                        <div class="second-list">
                          <div class="inline-block overflow-x overflow-y item-num">
                            {{cash_back_item.string_letters}}.
                          </div>

                          <div class="list-content">
                            <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 20%;margin-bottom: 0;">
                              计划回款日期：{{cash_back_item.plan_payment_date}}
                            </div>
                            <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 18%;margin-bottom: 0;">
                              计划回款金额：{{cash_back_item.plan_payment_amount}}万元
                            </div>
                            <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 15%;display: flex;margin-bottom: 0;">
                              财政级别：
                              <span v-if="cash_back_item.contract_item__project_item__level === 1">国家级</span>
                              <span v-else-if="cash_back_item.contract_item__project_item__level === 2">省级</span>
                              <span v-else-if="cash_back_item.contract_item__project_item__level === 3">市级</span>
                              <span v-else-if="cash_back_item.contract_item__project_item__level === 4">区县级</span>
                              <span v-else>镇街级</span>
                            </div>
                            <div class="item inline-block overflow-x overflow-y" style="min-width: 15%;">
                              计划人：{{cash_back_item.creator__user_name}}
                            </div>
                            <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 15%;margin-bottom: 10px;">
                              计划日期：{{cash_back_item.create_time | parseTime('{y}-{m}-{d}')}}
                            </div>
                          </div>

                          <div class="inline-block overflow-x overflow-y" style="min-width:23%;color: #5883FF;">
                            <span class="right-margin-5 hover_cursor" @click="checkedPlanBack(cash_back_item.biz_id, item.enterprise__enterprise_name, children_item.project_library__project_name, 1)">查看</span>
                            <span class="right-margin-5 hover_cursor" @click="checkedPlanBack(cash_back_item.biz_id, item.enterprise__enterprise_name, children_item.project_library__project_name, 2)">编辑</span>
                            <span class="right-margin-5 hover_cursor" @click="delPlanBack(cash_back_item.biz_id)">删除</span>
                            <span class="right-margin-5 hover_cursor" @click="createRelBack(item.enterprise__enterprise_name, children_item.project_library__project_name, cash_back_item)">回款</span>
                            <span class="right-margin-5 hover_cursor" @click="createOpenInvoice(item.enterprise__enterprise_name, children_item.project_library__project_name, cash_back_item)">开票</span>
                          </div>
                        </div>

                        <div class="second-list" style="display: inline-block;width: 100%;" v-for="back_record_item in cash_back_item.back_record_list">


                          <div style="display: flex">
                            <div class="inline-block overflow-x overflow-y" style="min-width: 20px; max-width: 3%;">
                              &nbsp;
                            </div>
                            <div class="list-content">
                              <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 20%;">
                                实际回款日期：{{back_record_item.payment_date }}
                              </div>
                              <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 18%;">
                                实际回款金额：{{back_record_item.payment_amount}}万元
                              </div>
                              <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 15%;display: flex;">财政级别：
                                <span v-if="cash_back_item.contract_item__project_item__level === 1">国家级</span>
                                <span v-else-if="cash_back_item.contract_item__project_item__level === 2">省级</span>
                                <span v-else-if="cash_back_item.contract_item__project_item__level === 3">市级</span>
                                <span v-else-if="cash_back_item.contract_item__project_item__level === 4">区县级</span>
                                <span v-else>镇街级</span>
                              </div>
                              <div class="item inline-block overflow-x overflow-y" style="min-width: 15%;">
                                经手人：{{back_record_item.creator__user_name}}
                              </div>
                              <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 15%;">
                                登记日期：{{back_record_item.create_time | parseTime('{y}-{m}-{d}')}}
                              </div>
                            </div>


                            <div class="inline-block overflow-x overflow-y" style="color: #5883FF;min-width: 23%;">
                              <span class="right-margin-5 hover_cursor">查看凭证</span>
                              <span class="right-margin-5 hover_cursor"
                                    @click="checkedRelBack(item, children_item, cash_back_item, back_record_item, 1)">查看</span>
                              <span class="right-margin-5 hover_cursor"
                                    @click="checkedRelBack(item, children_item, cash_back_item, back_record_item, 2)">编辑</span>
                              <span class="right-margin-5 hover_cursor"
                                    @click="delRelBack(back_record_item.biz_id)">删除</span>
                            </div>
                          </div>

                          <div class="second-list" v-for="contrac_troyalty_item in back_record_item.contrac_troyalty_list">
                            <div class="inline-block overflow-x overflow-y" style="min-width: 20px; max-width: 3%;">&nbsp;</div>
                            <div class="list-content">
                              <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 25%;">
                                业务提成金额：{{contrac_troyalty_item.business_royalty_money}}元
                                <span v-if="contrac_troyalty_item.business_already_receive" class="hover_cursor color-05" @click="businessReceiveCheck(contrac_troyalty_item.receive_img, 0)">（已提成）查看凭证</span>
                                <span class="hover_cursor color-05" v-else @click="businessReceive(contrac_troyalty_item.biz_id)">提成</span>
                              </div>
                              <div class="item inline-block overflow-x overflow-y right-margin-20" style="min-width: 25%;">
                                经理提成金额：{{contrac_troyalty_item.leader_royalty_money}}元
                                <span class="hover_cursor color-05" v-if="contrac_troyalty_item.leader_already_receive" @click="leaderReceiveCheck(contrac_troyalty_item.royalty_business_id, contrac_troyalty_item.royalty_leader_id, contrac_troyalty_item.leader_receive_img, 1)">（已提成）查看凭证</span>
                                <span class="hover_cursor color-05" v-else @click="leaderReceive(contrac_troyalty_item.biz_id)">提成</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="line-height-20" v-for="invoice_item in cash_back_item.invoice_list">
                          <span  class="inline-block overflow-x overflow-y" style="min-width: 20px; max-width: 3%;">&nbsp;</span>
                          <span class="inline-block overflow-x overflow-y width-0-15">开票日期：{{invoice_item.invoice_date }}</span>
                          <span class="inline-block overflow-x overflow-y width-0-15">开票金额：{{invoice_item.invoice_money}}万元</span>
                          <span class="inline-block overflow-x overflow-y width-0-12">发票类型：{{invoice_item.invoice_type}}</span>
                          <span class="inline-block overflow-x overflow-y width-0-12">经手人：{{invoice_item.creator__user_name}}</span>
                          <span class="inline-block overflow-x overflow-y width-0-15">登记日期：{{invoice_item.create_time | parseTime('{y}-{m}-{d}')}}</span>
                          <span class="inline-block overflow-x overflow-y width-0-23" style="color: #5883FF;">
                            <span class="left-margin-10 hover_cursor">查看凭证</span>
                            <span class="left-margin-10 hover_cursor" @click="checkedOpenInvoice(item, children_item, cash_back_item, invoice_item, 1)">查看</span>
                            <span class="left-margin-10 hover_cursor" @click="checkedOpenInvoice(item, children_item, cash_back_item, invoice_item, 2)">编辑</span>
                            <span class="left-margin-10 hover_cursor" @click="delOpenInvoice(invoice_item.biz_id)">删除</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="float-right text-align-center overflow-x" style="width: 100px; min-height: 100px;">
            <el-button class="bg_pale_violet left-margin-10 text-align-center" style="width: 60px; font-size: 12px; padding: 7px 10px;" @click="toCheck(item.biz_id)">查看</el-button>
            <el-button class="bg_blue left-margin-10 top-margin-10 text-align-center"  v-if="can_edit"  style="width: 60px; font-size: 12px; padding: 7px 10px;" @click="handleUpdate(item.biz_id)">编辑</el-button>
            <el-button class="bg_pale_yellow left-margin-10 top-margin-10 text-align-center" v-if="can_edit" style="width: 70px; font-size: 12px; padding: 7px 10px;" @click="handleState(item.perform_state, item.biz_id)">更新状态</el-button>
          </div>
        </div>
        <div class="padding-0" style="margin-top: 20px;">
          <div class="text-align-center" style="height: 40px; line-height: 30px;" @click="pageDown" v-if="total - list.length > 0">点击加载更多</div>
          <div class="text-align-center" style="height: 40px; line-height: 30px;" @click="pageDown" v-else>没有更多数据了</div>
        </div>
      </el-card>

      <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;" v-if="ent_form_id === ''|| ent_form_id===undefined">
        <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop" >
          <img src="../../icons/enterprise/back_top.png" alt="">
        </a>
      </div>
    </el-row>

    <el-dialog title="更新状态" :visible.sync="visible" v-dialogDrag>
      <el-form :model="stateForm" ref="stateForm">
        <el-divider content-position="center">更新状态</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="当前状态" :label-width="formLabelWidth" prop="cur_process_state">
              <span>{{stateForm.before_perform_state}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="修改新状态" :label-width="formLabelWidth" prop="process_state">
              <el-select filterable clearable v-model="stateForm.perform_state" placeholder="请选择">
                <el-option
                  v-for="item in perform_state_list"
                  :key="item.id"
                  :label="item.dict_value"
                  :value="item.dict_value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="goEditState">确 定</el-button>
      </div>
    </el-dialog>
    <!--弹窗-->
    <el-dialog title="计划回款" :visible.sync="planBackVisible" width="586px" v-dialogDrag>
      <el-form :model="planBackForm" :rules="planBackRules" ref="planBackForm" label-width="140px">
        <el-form-item label="企业名称" prop="enterprise_name">
          <el-input v-model="planBackForm.enterprise_name" readonly> </el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="planBackForm.project_name" readonly> </el-input>
        </el-form-item>
        <el-form-item label="项目立项批准金额" prop="approval_money">
          <el-input type="number" min="0" v-model="planBackForm.approval_money" :readonly="isChecked">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="计划回款日期" prop="plan_payment_date">
          <el-date-picker v-model="planBackForm.plan_payment_date" type="date" value-format="yyyy-MM-dd" placeholder="请选择计划回款日期"
                          :readonly="isChecked"> </el-date-picker>
        </el-form-item>
        <el-form-item label="计划回款金额" prop="plan_payment_amount">
          <el-input type="number" min="0" v-model="planBackForm.plan_payment_amount" :readonly="isChecked">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="planBackVisible = false">取 消</el-button>
        <el-button class="bg_blue" @click="savePlanBack" v-if="!isChecked">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="项目回款" :visible.sync="backVisible" width="586px" v-dialogDrag>
    <el-form :model="relBackForm" ref="relBackForm" label-width="120px">
      <el-form-item label="企业名称" prop="enterprise_name">
        <el-input v-model="relBackForm.enterprise_name" readonly> </el-input>
      </el-form-item>
      <el-form-item label="项目名称" prop="project_name">
        <el-input v-model="relBackForm.project_name" readonly> </el-input>
      </el-form-item>
      <el-form-item label="计划人" prop="project_name">
        <el-input v-model="relBackForm.plan_user_name" readonly> </el-input>
      </el-form-item>
      <el-form-item label="经手人" prop="user_name" v-if="relBackForm.user_name">
        <el-input v-model="relBackForm.user_name" readonly> </el-input>
      </el-form-item>
      <el-form-item label="计划回款日期" prop="plan_payment_date">
        <el-date-picker v-model="relBackForm.plan_payment_date" type="date" value-format="yyyy-MM-dd" readonly> </el-date-picker>
      </el-form-item>
      <el-form-item label="计划回款金额" prop="plan_payment_amount">
        <el-input type="number" min="0" v-model="relBackForm.plan_payment_amount" readonly>
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="本次回款日期" prop="real_payment_date">
        <el-date-picker v-model="relBackForm.payment_date" type="date" value-format="yyyy-MM-dd" placeholder="本次回款日期" :readonly="isChecked"> </el-date-picker>
      </el-form-item>
      <el-form-item label="本次回款金额" prop="real_payment_amount">
        <el-input type="number" min="0" v-model="relBackForm.payment_amount" placeholder="本次回款金额" :readonly="isChecked">
          <template slot="append">万元</template>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="backVisible = false">取 消</el-button>
        <el-button class="bg_blue" @click="saveRealBack" v-if="!isChecked">确 定</el-button>
      </span>
  </el-dialog>

    <el-dialog title="项目开票" :visible.sync="openInvoiceVisible" width="586px" v-dialogDrag>
      <el-form :model="openInvoiceForm" ref="openInvoiceForm" label-width="120px">
        <el-form-item label="企业名称" prop="enterprise_name">
          <el-input v-model="openInvoiceForm.enterprise_name" readonly> </el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="openInvoiceForm.project_name" readonly> </el-input>
        </el-form-item>
        <el-form-item label="计划人" prop="project_name">
          <el-input v-model="openInvoiceForm.plan_user_name" readonly> </el-input>
        </el-form-item>
        <el-form-item label="经手人" prop="user_name" v-if="openInvoiceForm.user_name">
          <el-input v-model="openInvoiceForm.user_name" readonly> </el-input>
        </el-form-item>
        <el-form-item label="计划回款日期" prop="plan_payment_date">
          <el-date-picker v-model="openInvoiceForm.plan_payment_date" type="date" value-format="yyyy-MM-dd" readonly> </el-date-picker>
        </el-form-item>
        <el-form-item label="计划回款金额" prop="plan_payment_amount">
          <el-input min="0" v-model="openInvoiceForm.plan_payment_amount" readonly>
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="本次开票金额" prop="real_payment_amount">
          <el-input type="number" min="0" v-model="openInvoiceForm.invoice_money" placeholder="本次开票金额" :readonly="isChecked">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="本次开票类型" prop="real_payment_amount">
          <el-select clearable class="filter-item input-150" v-model="openInvoiceForm.invoice_type" placeholder="选择开票类型" :readonly="isChecked">
            <el-option v-for="item in invoice_type_list" :key="item.biz_id" :label="item.dict_value" :value="item.dict_value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本次开票日期" prop="real_payment_date">
          <el-date-picker v-model="openInvoiceForm.invoice_date" type="date" value-format="yyyy-MM-dd" placeholder="本次开票日期"
                          :readonly="isChecked"> </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openInvoiceVisible = false">取 消</el-button>
        <el-button class="bg_blue" @click="saveOpenInvoice" v-if="!isChecked">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改签订人" :visible.sync="changeUserVisible" width="586px" v-dialogDrag>
      <el-form :model="changeUserForm" ref="changeUserForm" label-width="120px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="签订人" label-width="120px">
              <el-select v-model="changeUserForm.user_biz_id" filterable placeholder="请选择签订人">
                <el-option v-for="item in reviewer_user_list" :key="item.user__biz_id" :label="item.user__user_name" :value="item.user__biz_id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeUserVisible = false">取 消</el-button>
        <el-button class="bg_blue" @click="saveChangeUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog  title="业绩提成" :visible.sync="contractRoyaltyVisible" width="900px" v-dialogDrag>
      <el-form :model="contractRoyaltyForm" ref="contractRoyaltyForm" label-width="180px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="本次回款金额：" prop="subsidy_total">
              <el-input v-model="contractRoyaltyForm.payment_amount" disabled>
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="回款日期：" prop="approval_money">
              <el-date-picker v-model="contractRoyaltyForm.payment_date" type="date" value-format="yyyy-MM-dd" placeholder="本次回款日期" readonly> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!read_leader_receive">
          <el-col :span="10">
            <el-form-item label="业务提成金额：" prop="contacts_phone">
              <el-input v-model="contractRoyaltyForm.business_royalty_money" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="提成日期：" prop="approval_money">
              <el-date-picker v-model="contractRoyaltyForm.business_receive_date" type="date" value-format="yyyy-MM-dd" placeholder="提成日期"> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!read_leader_receive">
          <el-col :span="10">
            <el-form-item label="合同签订签订人" prop="contacts_phone">
              <el-input v-model="contractRoyaltyForm.business_user" disabled> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="签订人确认签字图片：" prop="receive_img">
            <el-upload class="upload-demo"
                       :action="host + '/core/upload-files/'"
                       :on-preview="handlePreview"
                       :data="uploadData"
                       :limit="1"
                       :on-remove="handleRemove"
                       :before-upload="beforeUpload"
                       :on-success="handleAbstractSuccess"
                       :file-list="abstractPicList"
                       list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="read_leader_receive">
          <el-col :span="10">
            <el-form-item label="经理提成金额：" prop="leader_royalty_money">
              <el-input v-model="contractRoyaltyForm.leader_royalty_money" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="提成日期：" prop="approval_money">
              <el-date-picker v-model="contractRoyaltyForm.leader_receive_date" type="date" value-format="yyyy-MM-dd" placeholder="提成日期"> </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="read_leader_receive">
          <el-col :span="10">
            <el-form-item label="合同签订签订人" prop="contacts_phone">
              <el-input v-model="contractRoyaltyForm.leader_user" disabled>
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="经理确认签字图片：" prop="leader_receive_img">
              <el-upload class="upload-demo" :action="host + '/core/upload-files/'"
                         :on-preview="handlePreview1"
                         :data="uploadData1"
                         :limit="1"
                         :on-remove="handleRemove1"
                         :before-upload="beforeUpload1"
                         :on-success="handleAbstractSuccess1"
                         :file-list="abstractPicList1"
                         list-type="picture-card">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="bg_blue" @click="saveContractRoyalty">确 定</el-button>
        <el-button @click="contractRoyaltyVisible = false">取 消</el-button>
      </span>
    </el-dialog>


    <el-dialog :visible.sync="isReceiveImg" width="900px" v-dialogDrag>
        <div v-if="picNum === '0'">
          <img :src="receive_img">
        </div>
        <div v-else>
          <img :src="leader_receive_img">
        </div>
    </el-dialog>

  </div>

</template>

<script>
  // import { enterpriseFilterList, getDepartmentUser } from '@/api/enterprise_app'
  // import { contractList, editPerformState, contractInvoiceEdit, contractInvoiceSave, contractInvoiceDelete, contractDelete, changeSignUser, contractRoyaltyEdit, contractRoyaltySave } from '@/api/contract'
  // import { getProvince, getCity, getDistrict, getTown } from '@/api/area'
  // import { getCashBackPlan, saveCashBackPlan, deleteCashBackPlan, getCashBackRecord, saveCashBackRecord, deleteCashBackRecord } from '@/api/crm'
  import { queryAuth } from '@/utils/auth'
  import ElRow from 'element-ui/packages/row/src/row'
  var order_list = [{ 'label': '签约日期倒序', 'value': 1 }, { 'label': '签约日期顺序', 'value': 2 }]

  export default {
    name: 'dashboard',
    components: { ElRow },
    props: {
      ent_form_id: {
        type: String
      }
    },
    data() {
      return {
        host: process.env.BASE_API,
        btnFlag: 0,
        checked: '',
        more_condition: false,
        formLabelWidth: '120px',
        // 更新状态
        visible: false,
        stateForm: {},
        // 回款计划
        planBackVisible: false,
        isChecked: false,
        planBackForm: {},
        planBackRules: {
          user_name: [
            { required: true, message: '请填写计划人', trigger: 'blur' }
          ],
          plan_payment_date: [
            { required: true, message: '请填写计划回款日期', trigger: 'blur' }
          ],
          plan_payment_amount: [
            { required: true, message: '请填写计划回款金额', trigger: 'blur' }
          ],
          approval_money: [
            { required: true, message: '请填写批准金额', trigger: 'blur' }
          ]
        },
        // 项目回款
        backVisible: false,
        relBackForm: {},
        // 开票
        openInvoiceVisible: false,
        openInvoiceForm: {},
        // 条件筛选
        click_more_condition: false,
        select_conditions_list: {},
        list: [],
        cur_list: [],
        check_biz_ids: [],
        filter_department_list: [],
        filter_user_list: [],
        perform_state_list: [],
        project_list: [],
        customer_classification_list: [],
        is_new_or_not_list: [{ 'label': '老客户', 'value': 0 }, { 'label': '新客户', 'value': 1 }], // 新老客户
        is_channel_list: [{ 'label': '渠道客户', 'value': 1 }, { 'label': '非渠道客户', 'value': 0 }], // 是否渠道合同
        project_level_list: [{ 'label': '国家级', 'value': 1 }, { 'label': '省级', 'value': 2 }, { 'label': '市级', 'value': 3 }, { 'label': '区县级', 'value': 4 }, { 'label': '镇街级', 'value': 5 }], // 新老客户
        total: 0,
        listQuery: {
          page: 1,
          limit: 20
        },
        order_list: order_list,
        province_list: [],
        invoice_type_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        // 修改签订人
        reviewer_user_list: [],
        changeUserForm: {},
        changeUserVisible: false,
        // 提成
        read_leader_receive: false, // 是否领导提成弹框
        contractRoyaltyForm: {},
        contractRoyaltyVisible: false,
        abstractPicList: [], // 业务员提成附图
        abstractPicList1: [], // 经理提成附图
        uploadData: { save_path: 'contract/contract_royalty/', allow_type: ['jpg', 'png', 'jpge'] },
        uploadData1: { save_path: 'contract/contract_royalty/', allow_type: ['jpg', 'png', 'jpge'] },
        dialogImageUrl: '',
        dialogImageUrl1: '',
        dialogVisible: false,
        dialogVisible1: false,
        // 权限控制
        can_check_project: false,
        can_edit: queryAuth(this, 'edit', null) || queryAuth(this, 'channel-contract-edit', '/channel-mng/channel-contrat/list'),
        can_create: queryAuth(this, 'create', null),
        can_change_sign: queryAuth(this, 'change-sign-user', null),
        can_delete: queryAuth(this, 'delete', null),

        // 0：业务图片 1：经理图片
        imgNum: '',
        // 业务提成金额图片
        receive_img: '',
        // 经理提成金额图片
        leader_receive_img: '',
        // 业务提成弹窗
        isReceiveImg: false,

        picNum: ''

      }
    },
    mounted() {
      // 名称
      if (this.$route.query.contract_name) {
        this.$set(this.listQuery, 'contract_name', this.$route.query.contract_name)
      }
      this.getList()
      this.judgePermissions()
      window.addEventListener('scroll', this.scrollToTop)
    },
    activated() {
      this.getList()
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
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
        this.listQuery.page = 1
        this.list = []
        this.getList()
      },
      judgePermissions() {
        this.can_check_project = queryAuth(this, 'check', '/sys-setup/grp-project-mng/list')
      },
      // 查看
      toCheck(biz_id) {
        this.$router.push({ 'path': '/contract/contract-mng/check', 'query': { 'id': biz_id, 'check': true }})
      },
      // 查看订单
      goOrder(biz_id) {
        this.$router.push({ 'path': '/project/process-mng/check', 'query': { 'id': biz_id, 'check': true }})
      },
      // 查看企业
      toEnterprise(biz_id) {
        this.$router.push({ 'path': '/enterprise/enterprise_list/check', 'query': { 'id': biz_id, 'check': true }})
      },
      // 查看项目
      toProject(biz_id) {
        if (this.can_check_project) {
          this.$router.push({ 'path': '/sys-setup/grp-project-mng/check', 'query': { 'id': biz_id, 'check': true }})
        } else {
          this.$message.error('您还没有查看项目的权限哦！')
        }
      },
      // 编辑
      handleUpdate(biz_id) {
        this.$router.push({ 'path': '/contract/contract-mng/edit', 'query': { 'id': biz_id }})
      },
      // 新增
      toCreate() {
        this.$router.push({ 'path': '/contract/contract-mng/create', 'query': { 'create': true }})
      },
      // 删除
      handleDel() {
        if (this.check_biz_ids.length === 0) {
          this.$message.error('至少勾选一个合同')
          return
        }
        this.$confirm('您确定删除吗？').then(_ => {
          // contractDelete({ ids: this.check_biz_ids }).then(response => {
          //   if (response.data.code === 1) {
          //     this.$message.success('删除成功')
          //     this.list = []
          //     this.getList()
          //   }
          // })
        })
      },
      // 编辑状态
      handleState(perform_state, biz_id) {
        this.visible = true
        this.stateForm.before_perform_state = perform_state
        this.stateForm.id = biz_id
      },
      goEditState() {
        // editPerformState(this.stateForm).then(response => {
        //   if (response.data.code === 1) {
        //     this.$message.success('修改成功')
        //     this.visible = false
        //     this.list = []
        //     this.getList()
        //   }
        // })
      },
      // 回款计划
      cratePlanBack(enterprise_name, project_name, id) {
        this.planBackForm.enterprise_name = enterprise_name
        this.planBackForm.project_name = project_name
        this.planBackForm.contract_item = id
        this.planBackVisible = true
      },
      savePlanBack() {
        this.$refs['planBackForm'].validate((valid, error) => {
          if (valid) {
            // saveCashBackPlan(this.planBackForm).then(res => {
            //   if (res.data.code === 1) {
            //     this.$message.success(res.data.message)
            //     this.planBackVisible = false
            //     this.planBackForm = {}
            //     this.list = []
            //     this.getList()
            //   }
            // })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      checkedPlanBack(biz_id, enterprise_name, project_name, check_type) {
        if (check_type === 1) {
          this.isChecked = true
        } else {
          this.isChecked = false
        }
        this.planBackForm = {}
        // getCashBackPlan({ biz_id: biz_id }).then(res => {
        //   if (res.data.code === 1) {
        //     this.planBackForm = res.data.data
        //     this.planBackForm.biz_id = biz_id
        //     this.planBackForm.enterprise_name = enterprise_name
        //     this.planBackForm.project_name = project_name
        //     this.planBackVisible = true
        //   } else {
        //     this.$message.error(res.data.message)
        //   }
        // })
      },
      delPlanBack(biz_id) {
        this.$confirm('确定删除?', '提示', { center: true, confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(_ => {
          // deleteCashBackPlan({ biz_id: biz_id }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message.success(res.data.message ? res.data.message : '删除成功!')
          //     this.list = []
          //     this.getList()
          //   } else {
          //     this.$message.error(res.data.message ? res.data.message : '删除失败!')
          //   }
          // })
        })
      },
      // 实际回款
      createRelBack(enterprise_name, project_name, cash_back_item) {
        this.relBackForm = {}
        this.relBackForm.enterprise_name = enterprise_name
        this.relBackForm.project_name = project_name
        this.relBackForm.plan_payment_amount = cash_back_item.plan_payment_amount
        this.relBackForm.plan_payment_date = cash_back_item.plan_payment_date
        this.relBackForm.plan_back_id = cash_back_item.biz_id
        this.relBackForm.plan_user_name = cash_back_item.creator__user_name
        this.backVisible = true
      },
      checkedRelBack(item, children_item, cash_back_item, back_record_item, check_type) {
        if (check_type === 1) {
          this.isChecked = true
        } else {
          this.isChecked = false
        }
        this.relBackForm = {}
        // getCashBackRecord({ plan_back_id: cash_back_item.biz_id, biz_id: back_record_item.biz_id }).then(res => {
        //   if (res.data.code === 1) {
        //     this.relBackForm = res.data.data
        //     this.relBackForm.enterprise_name = item.enterprise__enterprise_name
        //     this.relBackForm.project_name = children_item.project_library__project_name
        //     this.relBackForm.plan_user_name = cash_back_item.creator__user_name
        //     this.relBackForm.plan_back_id = cash_back_item.biz_id
        //     this.relBackForm.biz_id = back_record_item.biz_id
        //     this.relBackForm.plan_payment_amount = cash_back_item.plan_payment_amount
        //     this.relBackForm.plan_payment_date = cash_back_item.plan_payment_date
        //     this.backVisible = true
        //   } else {
        //     this.$message.error(res.data.message ? res.data.message : '系统发生异常, 请联系系统管理员!')
        //   }
        // })
      },
      saveRealBack() {
        // saveCashBackRecord(this.relBackForm).then(res => {
        //   if (res.data.code === 1) {
        //     this.$message.success(res.data.message)
        //     this.backVisible = false
        //     this.list = []
        //     this.getList()
        //   } else {
        //     this.$message.error(res.data.message ? res.data.message : '保存失败!')
        //   }
        // })
      },
      delRelBack(biz_id) {
        this.$confirm('确定删除?', '提示', { center: true, confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(_ => {
          // deleteCashBackRecord({ biz_id: biz_id }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message.success(res.data.message ? res.data.message : '删除成功!')
          //     this.list = []
          //     this.getList()
          //   } else {
          //     this.$message.error(res.data.message ? res.data.message : '删除失败!')
          //   }
          // })
        })
      },
      // 开票
      createOpenInvoice(enterprise_name, project_name, cash_back_item) {
        this.openInvoiceForm = {}
        this.openInvoiceForm.enterprise_name = enterprise_name
        this.openInvoiceForm.project_name = project_name
        this.openInvoiceForm.plan_payment_amount = cash_back_item.plan_payment_amount
        this.openInvoiceForm.plan_payment_date = cash_back_item.plan_payment_date
        this.openInvoiceForm.plan_back_id = cash_back_item.biz_id
        this.openInvoiceForm.plan_user_name = cash_back_item.creator__user_name
        this.openInvoiceVisible = true
      },
      checkedOpenInvoice(item, children_item, cash_back_item, invoice_item, check_type) {
        if (check_type === 1) {
          this.isChecked = true
        } else {
          this.isChecked = false
        }
        this.openInvoiceForm = {}
        // contractInvoiceEdit({ plan_back_id: cash_back_item.biz_id, biz_id: invoice_item.biz_id }).then(res => {
        //   if (res.data.code === 1) {
        //     this.openInvoiceForm = res.data.data
        //     this.openInvoiceForm.enterprise_name = item.enterprise__enterprise_name
        //     this.openInvoiceForm.project_name = children_item.project_library__project_name
        //     this.openInvoiceForm.plan_user_name = cash_back_item.creator__user_name
        //     this.openInvoiceForm.plan_back_id = cash_back_item.biz_id
        //     this.openInvoiceForm.plan_payment_amount = cash_back_item.plan_payment_amount
        //     this.openInvoiceForm.plan_payment_date = cash_back_item.plan_payment_date
        //     this.openInvoiceVisible = true
        //   } else {
        //     this.$message.error(res.data.message ? res.data.message : '系统发生异常, 请联系系统管理员!')
        //   }
        // })
      },
      saveOpenInvoice() {
        // contractInvoiceSave(this.openInvoiceForm).then(res => {
        //   if (res.data.code === 1) {
        //     this.$message.success('保存成功!')
        //     this.openInvoiceVisible = false
        //     this.list = []
        //     this.getList()
        //   } else {
        //     this.$message.error(res.data.message ? res.data.message : '保存失败!')
        //   }
        // })
      },
      delOpenInvoice(biz_id) {
        this.$confirm('确定删除?', '提示', { center: true, confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(_ => {
          // contractInvoiceDelete({ biz_id: biz_id }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message.success(res.data.message ? res.data.message : '删除成功!')
          //     this.list = []
          //     this.getList()
          //   } else {
          //     this.$message.error(res.data.message ? res.data.message : '删除失败!')
          //   }
          // })
        })
      },
      // 全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.list.forEach(function(item, index) {
            if (_this.check_biz_ids.indexOf(item.biz_id) === -1) {
              _this.check_biz_ids.push(item.biz_id)
            }
            _this.isCheckAll = true
          })
        }
      },
      // 排序
      handleOrder() {
        this.listQuery.page = 1
        this.list = []
        this.getList()
      },
      // 清空一个
      deleteOneClick(item) {
        this.list = []
        this.$delete(this.select_conditions_list, item)
        this.$delete(this.listQuery, item)
        this.listQuery.page = 1
        this.getList()
      },
      // 清空所有
      deleteAllClick() {
        this.list = []
        this.select_conditions_list = {}
        this.listQuery = {}
        this.listQuery.page = 1
        this.getList()
      },
      // 筛选更多条件
      getMoreCondition() {
        this.more_condition = !this.more_condition
        if (!this.click_more_condition) {
          this.click_more_condition = true
          this.getProvinces()
          this.getDepartmentUser()
          this.enterpriseFilterList()
        }
      },
      // 筛选条件获取
      enterpriseFilterList() {
        // enterpriseFilterList(this.listQuery).then(response => {
        //   this.reviewer_user_list = response.data.reviewer_user_list
        //   this.audit_user_list = response.data.audit_user_list
        //   this.project_user_list = response.data.project_user_list
        //   this.commercial_user_list = response.data.commercial_user_list
        //   this.project_list = response.data.project_list
        //   this.industry_involved_list = response.data.industry_involved_list
        //   this.enterprise_scale_list = response.data.enterprise_scale_list
        //   this.ent_tech_type_list = response.data.ent_tech_type_list
        //   this.customer_classification_list = response.data.customer_classification_list
        //   this.other_filter_list = response.data.other_filter_list
        // })
      },
      getDepartmentUser() {
        // getDepartmentUser(this.listQuery).then(response => {
        //   this.filter_department_list = response.data.filter_department_list
        //   this.filter_user_list = response.data.filter_user_list
        // })
      },
      handleFilterDepartment(val) {
        const arr = []
        if (val.length != 0) {
          this.filter_department_list.forEach(item => {
            val.forEach(val => {
              if (item.biz_id == val) {
                arr.push(item.department_name)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'department', `${string}`)
              }
            })
          })
          // this.$set(this.select_conditions_list, 'department', this.filter_department_list.find(ele => ele.biz_id === val).department_name)
        } else {
          this.$delete(this.select_conditions_list, 'department')
        }
        this.getDepartmentUser()
        this.listQuery.page = 1
        this.list = []
        this.getList()
      },
      handleFilterUser(val) {
        const arr = []
        if (val.length != 0) {
          this.filter_user_list.forEach(item => {
            val.forEach(val => {
              if (item.biz_id == val) {
                arr.push(item.user_name)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'sys_user', `${string}`)
              }
            })
          })
        // this.$set(this.select_conditions_list, 'sys_user', this.filter_user_list.find(ele => ele.biz_id === val).user_name)
        } else {
          this.$delete(this.select_conditions_list, 'sys_user')
        }
        this.listQuery.page = 1
        this.list = []
        this.getList()
      },
      handleFilterSignDate(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'sign_date', '签订日期 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'sign_date')
        }
        this.listQuery.page = 1
        this.list = []
        this.getList()
      },
      handleFilterPerformStateList(val) {
        const arr = []
        if (val.length != 0) {
          this.filter_user_list.forEach(item => {
            val.forEach(val => {
              if (item.dict_value == val) {
                arr.push(item.dict_value)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'sign_date', `${string}`)
              }
            })
          })
        // this.$set(this.select_conditions_list, 'sign_date', this.perform_state_list.find(ele => ele.dict_value === val).dict_value)
        } else {
          this.$delete(this.select_conditions_list, 'sign_date')
        }
        this.listQuery.page = 1
        this.list = []
        this.getList()
      },
      handleFilterProject(val) {
        const arr = []
        if (val.length != 0) {
          this.project_list.forEach(item => {
            val.forEach(val => {
              if (item.biz_id == val) {
                arr.push(item.project_name)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'project_id', `${string}`)
              }
            })
          })
        // this.$set(this.select_conditions_list, 'project_id', this.project_list.find(ele => ele.biz_id === val).project_name)
        } else {
          this.$delete(this.select_conditions_list, 'project_id')
        }
        this.listQuery.page = 1
        this.list = []
        this.getList()
      },
      handleFilterProjectLevel(val) {
        const arr = []
        if (val.length != 0) {
          this.project_level_list.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'project_level', `${string}`)
              }
            })
          })
        // this.$set(this.select_conditions_list, 'project_level', this.project_level_list.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.select_conditions_list, 'project_level')
        }
        this.list = []
        this.listQuery.page = 1
        this.getList()
      },
      handleFilterApplyYear(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'apply_year', '项目年度 - ' + val)
        } else {
          this.$delete(this.select_conditions_list, 'apply_year')
        }
        this.list = []
        this.listQuery.page = 1
        this.getList()
      },
      handleFilterIsNewOrNot(val) {
        // val === 0 || val === 1
        const arr = []
        if (val.length != 0) {
          this.is_new_or_not_list.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'is_new_or_not', `${string}`)
              }
            })
          })
        // this.$set(this.select_conditions_list, 'is_new_or_not', this.is_new_or_not_list.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.select_conditions_list, 'is_new_or_not')
        }
        this.list = []
        this.listQuery.page = 1
        this.getList()
      },
      handleFilterCustomerClassification(val) {
        const arr = []
        if (val.length != 0) {
          this.customer_classification_list.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'customer_classification', `${string}`)
              }
            })
          })
        // this.$set(this.select_conditions_list, 'customer_classification', this.customer_classification_list.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.select_conditions_list, 'customer_classification')
        }
        this.list = []
        this.listQuery.page = 1
        this.getList()
      },
      handleFilterIsChannel(val) {
        const arr = []
        if (val.length != 0) {
          this.is_channel_list.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.select_conditions_list, 'is_channel', `${string}`)
              }
            })
          })
        // this.$set(this.select_conditions_list, 'is_channel', this.is_channel_list.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.select_conditions_list, 'customer_classification')
        }
        this.list = []
        this.listQuery.page = 1
        this.getList()
      },
      changeProvince(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'province_id', '省份 - ' + this.province_list.find(ele => ele.pk === val).province_name)
        } else {
          this.$delete(this.select_conditions_list, 'province_id')
        }
        this.list = []
        this.listQuery.page = 1
        this.$delete(this.select_conditions_list, 'city_id')
        this.$delete(this.select_conditions_list, 'district_id')
        this.$delete(this.select_conditions_list, 'town_id')
        this.areaSetNull(3)
        this.getCitys()
        this.getList()
      },
      changeCity(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'city_id', '城市 - ' + this.city_list.find(ele => ele.pk === val).city_name)
        } else {
          this.$delete(this.select_conditions_list, 'city_id')
        }
        this.list = []
        this.$delete(this.select_conditions_list, 'district_id')
        this.$delete(this.select_conditions_list, 'town_id')
        this.listQuery.page = 1
        this.areaSetNull(2)
        this.getDistricts()
        this.getList()
      },
      changeDistrict(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'district_id', '区县 - ' + this.district_list.find(ele => ele.pk === val).district_name)
          this.$delete(this.select_conditions_list, 'town_id')
        } else {
          this.$delete(this.select_conditions_list, 'district_id')
          this.$delete(this.select_conditions_list, 'town_id')
        }
        this.list = []
        this.listQuery.page = 1
        this.areaSetNull(1)
        this.getTowns()
        this.getList()
      },
      getTownsId(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'town_id', '镇街 - ' + this.town_list.find(ele => ele.pk === val).town_name)
        } else {
          this.$delete(this.select_conditions_list, 'town_id')
        }
        this.list = []
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        if (this.ent_form_id) {
          this.listQuery.ent_form_id = this.ent_form_id
        }
        // contractList(this.listQuery).then(response => {
        //   this.cur_list = response.data.data
        //   this.perform_state_list = response.data.perform_state_list
        //   this.invoice_type_list = response.data.invoice_type_list
        //   this.reviewer_user_list = response.data.reviewer_user_list
        //   this.total = response.data.recordsTotal
        //   this.listQuery.page = response.data.draw
        //   this.cur_list.forEach(item => {
        //     item.item_list.forEach(i => {
        //       i.contract_price_or_bill = i.contract_price_or_bill ? '1' : '0'
        //     })
        //     this.list.push(item)
        //   })
        // })
      },
      getProvinces() {
        // getProvince({}).then(response => {
        //   this.province_list = response.data.provinces
        // })
      },
      areaSetNull(level) {
        if (level === 3) {
          this.listQuery.city_id = ''
          this.citys = []
        }
        if (level >= 2) {
          this.listQuery.district_id = ''
          this.districts = []
        }
        if (level >= 1) {
          this.listQuery.town_id = ''
          this.towns = []
        }
      },
      getCitys() {
        // getCity({ 'provinceId': this.listQuery.province_id }).then(response => {
        //   this.city_list = response.data.cities
        // })
      },
      getDistricts() {
        // getDistrict({ 'cityId': this.listQuery.city_id }).then(response => {
        //   this.district_list = response.data.districts
        // })
      },
      getTowns() {
        // getTown({ 'districtId': this.listQuery.district_id }).then(response => {
        //   this.town_list = response.data.town
        // })
      },
      clearUser() {
        this.listQuery.sys_user = null
      },
      // 导出
      handleExport() {
        var new_query = this.listQuery
        new_query.is_export = true
        new_query.check_biz_ids = this.check_biz_ids
        // contractList(new_query).then(res => {
        //   if (res.data.code === 1) {
        //     window.open(res.data.oss_object_url)
        //     this.$message.success('导出成功')
        //   }
        // })
      },
      // 点击翻页
      pageDown() {
        var cur_page = this.listQuery.page
        if (cur_page * 20 <= this.total) {
          this.listQuery.page = parseInt(this.listQuery.page) + 1
          this.getList()
        }
      },
      // 修改签订人
      handleChangeSignUser() {
        this.changeUserForm = {}
        if (this.check_biz_ids.length === 0) {
          this.$message.error('至少勾选一个合同')
          return
        }
        this.changeUserVisible = true
        this.changeUserForm.biz_ids = this.check_biz_ids
      },
      saveChangeUser() {
        this.changeUserVisible = false
        // changeSignUser(this.changeUserForm).then(response => {
        //   if (response.data.code === 1) {
        //     this.$message.success('操作成功')
        //     this.list = []
        //     this.getList()
        //   }
        // })
      },
      // 提成
      businessReceive(biz_id) {
        this.contractRoyaltyVisible = true
        this.read_leader_receive = false
        this.getContractRoyalty(biz_id)
      },
      leaderReceive(biz_id) {
        this.contractRoyaltyVisible = true
        this.read_leader_receive = true
        this.getContractRoyalty(biz_id)
      },
      getContractRoyalty(biz_id) {
        this.contractRoyaltyForm = {}
        // contractRoyaltyEdit({ id: biz_id }).then(res => {
        //   if (res.data.code === 1) {
        //     this.contractRoyaltyForm = res.data.data
        //   }
        // })
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemove(file, fileList) {
        this.abstractPicList.splice(this.contains(this.abstractPicList, { 'url': file.url }), 1)
      },
      beforeUpload(file) {
        // const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isLt2M) {
        //   this.$message.error('上传文件大小不能超过 2MB!')
        //   return false
        // }
        // return true
      },
      // 处理图片格式 返回格式： /xxx/xxx/xxx.png;/xxx/xxx/xxx.png;
      handleImgList(imgList) {
        var imgListStr = ''
        if (imgList.length > 0) {
          for (var i = 0; i < imgList.length; i++) {
            if (imgList.length - 1 === i) {
              imgListStr += imgList[i]['url'].replace(this.host, '')
            } else {
              imgListStr += imgList[i]['url'].replace(this.host, '') + ';'
            }
          }
        }
        return imgListStr
      },
      handleAbstractSuccess(res, file, fileList) {
        // 业务员领款附图
        if (file.response.code === 1) {
          this.abstractPicList.push({ 'url': this.host + file.response.url })
        } else {
          this.$message.error(file.response.message ? file.response.message : '上传经理确认签字图片失败!')
        }
      },
      handlePreview1(file) {
        this.dialogImageUrl1 = file.url
        this.dialogVisible1 = true
      },
      handleRemove1(file, fileList) {
        this.abstractPicList1.splice(this.contains(this.abstractPicList1, { 'url': file.url }), 1)
      },
      beforeUpload1(file) {
        // const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isLt2M) {
        //   this.$message.error('上传文件大小不能超过 2MB!')
        //   return false
        // }
        // return true
      },
      handleAbstractSuccess1(res, file, fileList) {
        // 业务员领款附图
        if (file.response.code === 1) {
          this.abstractPicList1.push({ 'url': this.host + file.response.url })
        } else {
          this.$message.error(file.response.message ? file.response.message : '上传经理确认签字图片失败!')
        }
      },
      saveContractRoyalty() {
        this.contractRoyaltyForm.receive_img = this.handleImgList(this.abstractPicList)
        this.contractRoyaltyForm.leader_receive_img = this.handleImgList(this.abstractPicList1)
        if (this.read_leader_receive) {
          this.contractRoyaltyForm.is_leader = true
          if (!this.contractRoyaltyForm.leader_receive_img || !this.contractRoyaltyForm.leader_receive_date) {
            this.$message.error('确认签字图片和提成日期必须填写')
            return
          }
        } else {
          this.contractRoyaltyForm.is_leader = false
          if (!this.contractRoyaltyForm.receive_img || !this.contractRoyaltyForm.business_receive_date) {
            this.$message.error('确认签字图片和提成日期必须填写')
            return
          }
        }
        this.$refs['contractRoyaltyForm'].validate((valid, error) => {
          if (valid) {
            // contractRoyaltySave(this.contractRoyaltyForm).then(res => {
            //   if (res.data.code === 1) {
            //     this.$message.success('操作成功')
            //     this.list = []
            //     this.getList()
            //     this.contractRoyaltyVisible = false
            //   }
            // })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      // 提成凭证
      businessReceiveCheck(receive_img, num) {
        this.picNum = num
        this.isReceiveImg = true
        this.receive_img = this.host + receive_img
      },

      leaderReceiveCheck(royalty_business_id, royalty_leader_id, leader_receive_img, num) {
        if (royalty_business_id === royalty_leader_id) {
          this.$message.error('签订人是团队经理时，只有业务提成，没有经理提成！')
        } else {
          this.picNum = num
          this.isReceiveImg = true
          this.leader_receive_img = this.host + leader_receive_img
        }
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
    overflow-y:hidden;
  }
  .width-0-5 {
    width: 5%;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-7 {
    width: 7%;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-10 {
    width: 10%;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-12 {
    width: 12%;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-15 {
    width: 15%;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-18 {
    width: 18%;
    height: 20px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-20 {
    width: 20%;
    height: 20px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-23 {
    width: 23%;
    height: 20px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-25 {
    width: 25%;
    height: 20px;
    line-height: 20px;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .width-0-28 {
    width: 28%;
    height: 18px;
    line-height: 18px;
    overflow-y: hidden;
    overflow-x: hidden;
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
  .inline-block{
    display: inline-block;
  }
  .text-align-center{
    text-align: center;
  }
  .hover_cursor{
    cursor:pointer
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
    background-color: #3ABBFD; border: none; color: white;
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
  .padding-vertical-10{
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
  .bg_pale_green{
    background: rgb(145, 229, 161);
    color: rgb(255, 255, 255, 1);
    &:hover {
      background: rgba(145, 229, 161, .5);
    }
  }
  .bg_pale_yellow{
    background: rgb(255, 203, 166);
    color: rgb(255, 255, 255, 1);
    &:hover {
      background: rgba(255, 203, 166, .5);
    }
  }
  .bg_pale_pink{
    background: rgb(254, 149, 178);
    color: rgb(255, 255, 255, 1);
    &:hover {
      background: rgba(254, 149, 178, .5);
    }
  }
  .bg_pale_violet{
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
    font-size: 16px;
    color: #f0f7ff;
  }
  .input-150{
    width: 150px;
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


  /*-----------------------*/
  .right-margin-20{
    margin-right: 20px;
  }
  .right-margin-5{
    margin-right: 5px;
  }
  .first-list{
    display: flex;
    .item-num {
      width: 20px;
      height: 20px;
      line-height: 20px;
      background: #FE95B2;
      border-radius: 50%;
      color: #ffffff;
      margin-top: -4px;
    }
    .item-list{
      width: 89%;
      display: flex;
      flex-wrap: wrap;
      .item{
        white-space: nowrap;
        margin-bottom: 10px;
      }
    }
    .project-num{
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
  .second-list {
    display: flex;
    .item-num {
      min-width: 20px;
      max-width: 3%;
      text-align: center;
      color: #00A5FF;
    }

    .list-content {
      width: 90%;
      display: flex;
      flex-wrap: wrap;
      .item{
        margin-bottom: 10px;
      }
    }
  }
  .screen-box{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left{
      display: flex;
      .screen-list{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }
    .right{
      display: flex;
      align-items: center;
      cursor: pointer;
      img{
        margin-right: 4px;
      }
    }
  }

  .bg-list:nth-child(even) {
    .item-bg-list {
      background: #DEE6FF;
      &:hover{
        background: #C5D4FF;
      }
    }
  }

  .bg-list:nth-child(odd) {
    .item-bg-list {
      background: #EFFAFF;
      &:hover{
        background: #CDEEFF;
      }
    }
  }
</style>
