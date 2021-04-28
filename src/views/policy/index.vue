<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-90" style="margin-bottom: 20px;">
      <!--搜索-->
      <el-card class="search-bar">
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item>
            <div class="search">
              <input @keyup.enter="goSearch" type="text" class="search_input" placeholder="输入名称/项目名称/发布单位"
                     v-model="listQuery.noticeName">
              <el-button class="btn bt_blue" @click="goSearch"><span class="bt_font">搜一下</span></el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button :class="is_delete?'btn bt_purple':'btn bt_blue'" @click="checkDeleteRecord"><span
              class="bt_font">已删除记录</span></el-button>
          </el-form-item>
          <!--          v-if="can_create"-->
          <el-form-item>
            <el-button v-if="allowAdd.twoAllow" class="btn bt_blue" @click="handleCreate()"><span
              class="bt_font">新增</span></el-button>
          </el-form-item>

          <!--新增公众号消息-->
          <el-form-item>
            <el-button v-if="allowAddTempMsg.twoAllow" class="btn bt_blue" style="width: 150px;" @click="addWxMpTemplateMsgHandle"><span
              class="bt_font">新增公众号消息</span></el-button>
          </el-form-item>

        </el-form>
      </el-card>

      <!--筛选-->
      <el-card class="screen-box">
        <div class="screen-bar">
          <div class="left">
            <div class="name"><span class="line"></span>已选条件：</div>
            <div class="screen-list">
              <div class="item" v-for="(value, key) in select_filter_list">
                {{value}}
                <span class="del" @click="clearThisSelect(key)">×</span>
              </div>
              <div class="clear" @click="clearAllSelect" v-if="Object.keys(select_filter_list).length > 1">清空所有</div>
            </div>
          </div>

          <span class="right float-right right-margin-10" @click="getMoreCondition">
            <img v-if="more_condition" src="../icons/enterprise/close_icon.png" style="vertical-align:middle;"/>
            <img v-else src="../icons/enterprise/open_icon.png" style="vertical-align:middle;"/>
            <span style="color: #33B3EE;white-space: nowrap;">选择筛选条件</span>
          </span>
        </div>

        <div v-if="more_condition">
          <div style="height: 3px; background-color: #EDF4FF; width: 100%;"></div>
          <div class="screen-form">
            <div class="top-margin-10">
              <el-form :inline="true">
                <el-form-item label="常用：" label-width="110px" class="bottom-margin-5">
                  <el-row>
                    <el-col>
                      <el-select @change='supplyIndustryChange' clearable multiple size="small"
                                 v-model="listQuery.supplyIndustry"
                                 placeholder="补贴行业">
                        <el-option v-for="item in supply_industry_list"
                                   :key="item.dictId"
                                   :label="item.dictName"
                                   :value="item.dictId">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="补贴地区：" label-width="110px" class="bottom-margin-5" style="display: flex">
                  <el-col :span="4">
                    <el-select @change='changeProvince' clearable v-model="listQuery.provinceId" size="small"
                               placeholder="省份">
                      <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select @change='changeCity' clearable v-model="listQuery.cityId" placeholder="城市" size="small"
                               style="margin-left: 20px;">
                      <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select @change='changeDistrict' clearable v-model="listQuery.districtId" placeholder="县区"
                               size="small"
                               style="margin-left: 20px;">
                      <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select @change='changeTown' clearable v-model="listQuery.townId" placeholder="镇街" size="small"
                               style="margin-left: 20px;">
                      <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="项目类型：" label-width="110px" class="bottom-margin-5" style="display: flex;">
                  <el-select @change='projectTypeChange' multiple clearable v-model="listQuery.projectTypes"
                             placeholder="项目类型" size="small">
                    <el-option v-for="item in project_type_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="补助金额：" label-width="110px" class="bottom-margin-5">
                  <moneySelect
                    ref="subsidyTotal"
                    :inputName="'补助金额'"
                    :moneyList="subsidy_total_list"
                    :rangeMoneyName="rangeMoneyName"
                    @handleMoney="handleMoney"
                    @handleClearMoney="handleClearMoney"
                    @handleMoneyRange="handleMoneyRange"
                  >
                  </moneySelect>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="线上截止时间：" label-width="110px" class="bottom-margin-5">
                  <!--                  <dateSelect-->
                  <!--                    ref="submitOnlineEnd"-->
                  <!--                    :inputName="'线上截止时间'"-->
                  <!--                    :dateList="date_list"-->
                  <!--                    :rangeDateName="rangeSubmitOnlineEnd"-->
                  <!--                    @handleDate="handleDate"-->
                  <!--                    @handleClearDate="handleClearDate"-->
                  <!--                    @handleDateRange="handleDateRange"-->
                  <!--                  >-->
                  <!--                  </dateSelect>-->
                  <el-date-picker
                    v-model="onlineDateEnd"
                    type="daterange"
                    align="left"
                    size="small"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    @change="onlineDateChange"
                    class="date-select"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="纸质截止时间：" label-width="110px" class="bottom-margin-5">
                  <!--                  <dateSelect-->
                  <!--                    ref="submitPaperEnd"-->
                  <!--                    :inputName="'纸质截止时间'"-->
                  <!--                    :dateList="date_list"-->
                  <!--                    :rangeDateName="rangeSubmitPaperEnd"-->
                  <!--                    @handleDate="handleDate"-->
                  <!--                    @handleClearDate="handleClearDate"-->
                  <!--                    @handleDateRange="handleDateRange"-->
                  <!--                  >-->
                  <!--                  </dateSelect>-->

                  <el-date-picker
                    v-model="paperDateEnd"
                    type="daterange"
                    align="left"
                    size="small"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    @change="paperDateChange"
                    class="date-select"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="发布时间：" label-width="110px" class="bottom-margin-5">
                  <!--                  <dateSelect-->
                  <!--                    ref="publishDate"-->
                  <!--                    :inputName="'发布时间'"-->
                  <!--                    :dateList="date_list"-->
                  <!--                    :rangeDateName="rangePublishDate"-->
                  <!--                    @handleDate="handleDate"-->
                  <!--                    @handleClearDate="handleClearDate"-->
                  <!--                    @handleDateRange="handleDateRange"-->
                  <!--                  >-->
                  <!--                  </dateSelect>-->

                  <el-date-picker
                    v-model="publishDate"
                    type="daterange"
                    align="left"
                    size="small"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    @change="publishDateChange"
                    class="date-select"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="申报状态：" label-width="110px" class="bottom-margin-5">
                  <el-radio-group v-model="listQuery.declareStatus" @change="declareStatusChange">
                    <el-radio :label="item.dictId" v-for="item in apply_state_list" :value="item.dictId"
                              :key="item.dictId">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <el-form :inline="true">
                <el-form-item label="类型：" label-width="110px" class="bottom-margin-5">
                  <el-radio-group v-model="listQuery.noticeType" @change="noticeTypeChange">
                    <el-radio :label="item.dictId" v-for="item in type_list" :key="item.dictId">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="top-margin-10 padding-0">
        <div>

          <span style="color: #03ADF4; font-weight: bold;">|</span>
          <span style="color: #ABABAB;">搜索到<span style="color:#F9A9A9;">{{total}}</span>条记录</span>
          <span style="color: #ABABAB;" v-if="check_biz_ids.length > 0">已选中<span style="color:#F9A9A9;">{{check_biz_ids.length}}</span>条记录</span>
          <a @click="checkAllOrNo" class="padding-5 right-margin-10 blue-border" v-if="listQuery.stateNum != 3">全选</a>
          <!--          v-if="can_delete"-->
          <a @click="handleDelete" class="padding-5 right-margin-10 red-border"
             v-if="listQuery.stateNum != 3 && allowDelete.twoAllow">删除</a>
          <span class="float-right right-margin-10" style="vertical-align:middle;margin-top: -10px;">
            <el-select @change='handleFilter'
                       clearable
                       v-model="orderType"
                       placeholder="默认排序"
                       @clear="setValueNull"
            >
              <el-option v-for="item in order_type_list" :key="item.id" :label="item.val" :value="item.id"></el-option>
            </el-select>
          </span>
        </div>
        <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 20px;"></div>

        <!-- class="top-margin-10" gray 过期 -->
        <div class="" style="padding-top: 20px; border-bottom: 2px solid #F1F0F2; overflow:hidden;"
             v-for="(item, index) in list"   :class="item.newData<1?'gray':''" >
<!-- {{toDate}}--{{item.validDateEnd}} {{toDate>item.validDateEnd?'gray':''}} -->

          <!--logo-->
          <div style="width: 150px;">
            <div class="float-left center-items right-margin-10">
              <input type="checkbox" name="check_biz_ids" :value="item.noticeId" v-model="check_biz_ids"/>
            </div>
            <div class="float-left">
              <div
                :class="item.noticeType ==1?'type_bg center-items left-margin-10 right-margin-10 blue':'type_bg center-items left-margin-10 right-margin-10 green'">
                <div class="type_font">
                  {{item.noticeType == 1 ? '政策' : '通知'}}
                </div>
              </div>
            </div>
          </div>

          <!--内容div-->
          <div class="float-left overflow-x" style="width: 72%;">
            <div class="list-content">
              <div class="policy_notice_name" style="height: auto;">
                <a @click="handleCheck(item)">
                  {{item.noticeName}}
                </a>
<!--生成二维码-->
                <!-- <button    @click="chooseQrCode(item.noticeId)" class="qrCodeChoose float-right edit_bt bottom-margin-4" >生成二维码   -->


                <!-- v-if="item.noticeId==newNoticeId" -->
                  <!-- <div class="qrcode-out"  :class="qrCodeShowOrNo==true?'qrcode-out-show':'qrcode-out-no'"  >
                    <div class="qrcode" ref="qrCodeUrl"  >  </div>
                    <span  >用微信扫码二维码<br/>分享至好友和朋友圈 </span>
                  </div>
                </button>-->

              </div>

              <div style="margin: 10px auto;">
                <span class="normal_name right-margin-20" @click="clickPublishOrgan(item)">发布单位：<span class="can_click">{{item.publishOrgan}}</span></span>
                <span class="normal_name right-margin-20">录入时间：{{item.createTime}}</span>
                <span class="normal_name right-margin-20">发布日期：{{item.publishDate}}</span>
                <span class="normal_name right-margin-20">有效期：{{item.validDateBegin}} 至 {{item.validDateEnd}}</span>
                <!-- {{toDate}}  <span v-if="toDate>item.validDateEnd">---- </span> -->
                <span class="normal_name right-margin-20" @click="clickSupplyIndustry(item)">
                  补助行业：
                  <span class="can_click">{{item.subsidyIndustryName}}</span>
                </span>
              </div>
              <div style="margin: 10px auto;">
                <span class="normal_name right-margin-20">地区：<span>{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.townName}}</span></span>
              </div>

              <div v-if="item.policyNoticeProjectRelVos && item.policyNoticeProjectRelVos.length > 0">
                <div v-for="(project_item,num) in item.policyNoticeProjectRelVos"   >
                  <div class="bg-list">
                    <div class="third-list">
                      <div class="project_badge">{{num+1}}</div>
                      <div class="list">
                        <div class="item">项目名称：
                          <span class="can_click hover_cursor" @click="toProject(project_item.projectId)">
                            {{project_item.projectName}}
                          </span>

                        </div>



                        <div class="item">项目类别：<span
                          class="can_click">{{project_item.projectTypeName}}</span></div>
                        <div class="item">订单类型：<span
                          class="can_click">{{project_item.orderType==0?'项目型':project_item.orderType==1?'知识产权型':project_item.orderType==2?'财务型':project_item.orderType==4?'项目审计型':'-'}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="second-list">
                      <!--政策-->
                      <div class="policy-list" v-if="item.noticeType == 1 || item.noticeType == 3">
                        <template
                          v-if="project_item.policyNoticeProjectSubsidyOrTimeVos && project_item.policyNoticeProjectSubsidyOrTimeVos.length > 0">
                          <div class="item" v-for="(data,index) in project_item.policyNoticeProjectSubsidyOrTimeVos">
                            <div class="index" style="background: #6DDD81">{{index+1}}</div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType != 822466810090618880">
                              级别：{{data.projectLevel==1?'国家级':data.projectLevel==2?'省级':data.projectLevel==3?'市级':data.projectLevel==4?'区县级':data.projectLevel==5?'镇街级':'-'}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType == 822466810090618880">
                              职称专业：{{data.titleMajor ? data.titleMajor: '-'}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType == 822466810090618880">
                              职称系列：{{data.titleSeriesName}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType == 822466810090618880">
                              职称级别：{{data.titleLevelName}}
                            </div>
                            <div class="item-text">
                              补助金额：
                              <b style="color: red">{{data.subsidyPriceMin && data.subsidyPriceMin!=''?data.subsidyPriceMin/10000:'0'}}-{{data.subsidyPriceMax && data.subsidyPriceMax!=''?data.subsidyPriceMax/10000:'0'}}万元</b>
                            </div>
                            <div :title="data.subsidyDesc" class="item-text" style="text-overflow: ellipsis;overflow: hidden;">
                              补助详情：{{data.subsidyDesc}}
                            </div>
                          </div>



                        </template>
                      </div>

                      <!--通知-->
                      <div class="notice-list" v-if="item.noticeType == 2">
                        <template
                          v-if="project_item.policyNoticeProjectSubsidyOrTimeVos && project_item.policyNoticeProjectSubsidyOrTimeVos.length > 0">
                          <div class="item" v-for="(data,index) in project_item.policyNoticeProjectSubsidyOrTimeVos">
                            <div class="index">{{index+1}}</div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType != 822466810090618880">
                              级别：{{data.projectLevel==1?'国家级':data.projectLevel==2?'省级':data.projectLevel==3?'市级':data.projectLevel==4?'区县级':data.projectLevel==5?'镇街级':'-'}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType == 822466810090618880">
                              职称专业：{{data.titleMajor ? data.titleMajor: '-'}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType == 822466810090618880">
                              职称系列：{{data.titleSeriesName}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;margin-bottom: 10px;" v-if="project_item.projectType == 822466810090618880">
                              职称级别：{{data.titleLevelName}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;">
                              批次：{{data.projectBatchNo==0?'未指定':data.projectBatchNo==1?'第一批':data.projectBatchNo==2?'第二批':data.projectBatchNo==3?'第三批':data.projectBatchNo==4?'第四批':data.projectBatchNo==5?'第五批':'-'}}
                            </div>
                            <div class="item-text" style="margin-right: 10px;">
                              线上提交时间：{{data.onlineDateBegin && data.onlineDateBegin !=''?data.onlineDateBegin :'-'}} 至
                              {{data.onlineDateEnd && data.onlineDateEnd!=''?data.onlineDateEnd:'-'}}
                            </div>
                            <div class="item-text">
                              纸质提交时间：{{data.paperDateBegin && data.paperDateBegin !=''?data.paperDateBegin:'-'}} 至
                              {{data.paperDateEnd && data.paperDateEnd!=''?data.paperDateEnd:'-'}}
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!--操作div-->
          <div class="float-right right-margin-10 text-align-center overflow-x" style="width: 110px; min-height: 100px;">
            <button @click="copyHandle(item)" class="float-right edit_bt bottom-margin-4"
                    v-if="allowCopy.twoAllow">复制
            </button>
            <!--            v-if="can_edit"-->
            <button @click="handleUpdate(item)" class="float-right edit_bt bottom-margin-4"
                    v-if="listQuery.stateNum != 3 && allowUpdate.twoAllow">编辑
            </button>
            <button @click="matchingCompany(item.noticeId)" class="float-right edit_bt bottom-margin-4" v-if="listQuery.stateNum != 3">匹配企业</button>
            <button @click="chooseQrCode(item.noticeId,true)" class="qrCodeChoose float-right edit_bt bottom-margin-4" >生成二维码
            </button>
            <!--            v-if="can_sms"-->
            <!--            <button @click="handleSendSms(item)" class="float-right send_sms_bt">发送短信</button>-->
            <button @click="sendWxMpTemplateMsgHandle(item)" class="float-right edit_bt bottom-margin-4"
                    v-if="allowSendTempMsg.twoAllow">公众号消息
            </button>
          </div>
        </div>

        <!--加载更多-->
        <div class="padding-0" style="margin-top: 20px;">
          <div style="text-align: center; height: 40px; line-height: 30px;cursor: pointer;" @click="loadMore"
               v-if="total - list.length > 0">加载更多
          </div>
          <div style="text-align: center; height: 40px; line-height: 30px;" v-else>没有更多</div>
        </div>
      </el-card>
      <!--置顶-->
      <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
        <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
          <img src="../icons/enterprise/back_top.png" alt="">
        </a>
      </div>
    </el-row>
<el-dialog
  title="分享二维码"
  :visible.sync="qrCodeShowOrNo"
  width="30%"
  :before-close="handleClose">
  <div class="qrcode" ref="qrCodeUrl">   </div>
   <span  >用微信扫码二维码<br/>分享至好友和朋友圈 </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click=chooseQrCode(0,false)>取 消</el-button>
    <el-button type="primary" @click=chooseQrCode(0,false) >确 定</el-button>
  </span>
</el-dialog>

    <!--发送推广消息-->
    <el-dialog title="发送推广消息" :visible.sync="sendWxMpTemplateMsgVisible" width="30%">

      <el-radio-group v-model="wxSendMsgParams.templateId">
        <el-radio :label="item.dictValue" v-for="item in wxTemplatesList" :key="item.dictId">
          {{item.dictName}}
        </el-radio>
      </el-radio-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="sendWxMpTemplateMsgVisible=false">取 消</el-button>
        <el-button type="primary" @click="goSendWxMpTemplateMsg">确 定</el-button>
     </span>
    </el-dialog>

    <!--新增公众号消息-->
    <el-dialog title="新增公众号消息" :visible.sync="addWxMpTemplateMsgVisible" width="50%" show-close="true">

      <!--表单-->
      <el-form ref="form" :model="addWxMpTemplateMsgParams" label-width="180px" label-suffix=":">

        <el-form-item label="选择模板">
          <el-select v-model="addWxMpTemplateMsgParams.templateId" placeholder="请选择模板" filterable @change="changeTWxMpTemplate">
            <el-option
              v-for="item in WxMpAllPrivateTemplateList"
              :key="item.templateId"
              :label="item.title"
              :value="item.templateId">
            </el-option>
          </el-select>
        </el-form-item>

        <span v-if="addWxMpTemplateMsgParams.templateId">
          <el-form-item :label="item.label+'('+item.key+')'" v-for="(item,index) in selectedWxMpTemplate.valueList" :key="index">
            <el-input type="textarea" :rows="1" v-model="addWxMpTemplateMsgParams[item.key]"></el-input>
          </el-form-item>
          <el-form-item label="示例" v-if="selectedWxMpTemplate.content||selectedWxMpTemplate.example">
            <div style="display: flex;">
              <div v-if="selectedWxMpTemplate.content" v-html="selectedWxMpTemplate.content" style="width: 40%;word-wrap:break-word;word-break:break-all; overflow: hidden;"></div>
              <div v-if="selectedWxMpTemplate.example" v-html="selectedWxMpTemplate.example" style="word-wrap:break-word;word-break:break-all; overflow: hidden;"></div>
            </div>
          </el-form-item>
        </span>

      </el-form>

      <!--按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWxMpTemplateMsgVisible=false">取 消</el-button>
        <el-button type="primary" @click="goAddWxMpTemplateMsg">确 定</el-button>
     </span>

    </el-dialog>


  </div>
</template>

<script>
  // import { PolicyNoticeMng, PolicyNoticeFilter, PolicyNoticeDelete } from '@/api/policy_notice'
  // import { getProvince, getCity, getDistrict, getTown } from '@/api/area'
  import moneySelect from '../../components/timeMoneySelect/moneySelect'
  import dateSelect from '../../components/timeMoneySelect/dateSelect'
  import qs from 'qs'
  import {queryAuth} from '@/utils/auth'
  import {commonDictOfRegion, commonDict} from '@/api/utils'

  import {queryNoticeInfo, removeNoticeInfo, copyNoticeInfo,sendWxMpTemplateMsg,getWxMpAllPrivateTemplate,addWxMpTemplateMsg} from '@/api/policy'
  import { manualMatching } from '@/api/projectManage'
  import QRCode from "qrcodejs2";

  var initListQuery = {
    orderField: '',
    orderType: '',
    page: 0,
    pageSize: 20,
    // is_delete: false,
    subsidyTotal: '',
    publishDate: '',
    supplyIndustry: [],
    // declareStatus: [],
    // noticeType: [],
    // supply_industry_list: [],
    // province_list: [],
    // city_list: [],
    // district_list: [],
    // town_list: []
  }
  export default {
    // name: 'policy_notice',
    components: {
      moneySelect,
      dateSelect,
      QRCode
    },
    props: {},
    data() {
      return {
        btnFlag: 0,
        search_keyword: null,
        search_type: 'policy',
        hot_search_keyword_list: ['wtf', 'wtf'],
        search_placeholder_list: {'policy': '  输入名称/项目名称/发布单位', 'notice': '  输入名称/项目名称/发布单位'},
        search_placeholder: '  输入名称/项目名称/发布单位',
        more_condition: false,
        host: process.env.BASE_API,
        list: [],
        total: 0,
        count: 0,
        orderType: '',
        listQuery: JSON.parse(JSON.stringify(initListQuery)),
        noticeType: [],
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        isCheckDeleteRecord: false, // 是否查看已删除记录
        isCheckAll: false, // 是否已经全选
        check_biz_ids: [], // 勾选行的biz_id
        select_filter_list: {}, // 已选条件
        supply_industry_list: [], // 补贴行业
        project_type_list: [], // 项目类型
        subsidy_total_list: [
          {'key': '0:10', 'val': '10万内'},
          {'key': '10:100', 'val': '10万-100万'},
          {'key': '100', 'val': '100万以上'}
        ], // 补贴金额
        date_list: [
          {'key': '0:7', 'val': '1周内'},
          {'key': '0:14', 'val': '2周内'},
          {'key': '0:30', 'val': '1月内'},
          {'key': '0:60', 'val': '2月内'},
          {'key': '0:180', 'val': '半年内'},
          {'key': '0:365', 'val': '1年内'}
        ], // 时间区间,截止时间区间,发布时间区间
        apply_state_list: [
          {dictName: '未开始', dictId: 0},
          {dictName: '进行中', dictId: 1},
          {dictName: '已截止', dictId: 2}
        ], // 申报状态
        type_list: [
          {dictName: '政策', dictId: 1},
          {dictName: '通知', dictId: 2}
        ], // 数据类型
        order_type_list: [
          {key: 'ppT2PnptPaperDateEnd', val: '截止时间顺序', label: 'ASC', id: 1},
          {
            key: 'ppT2PnptPaperDateEnd',
            val: '截止时间倒序',
            label: 'DESC',
            id: 2
          },
          {key: 'publishDate', val: '发布时间顺序', label: 'ASC', id: 3},
          {
            key: 'publishDate',
            val: '发布时间倒序',
            label: 'DESC',
            id: 4
          },
          {key: 'ppT2PnptOnlineDateBegin', val: '线上提交时间顺序', label: 'ASC', id: 5},
          {
            key: 'ppT2PnptOnlineDateBegin',
            val: '线上提交时间倒序',
            label: 'DESC',
            id: 6
          },
          {key: 'ppT2PnptPaperDateBegin', val: '纸质提交时间顺序', label: 'ASC', id: 7},
          {
            key: 'ppT2PnptPaperDateBegin',
            val: '纸质提交时间倒序',
            label: 'DESC',
            id: 8
          }
          // { 'key': 'project_item_subsidy_total', 'val': '补助总金额顺序' },
          // {
          //   'key': '-project_item_subsidy_total',
          //   'val': '补助总金额倒序'
          // }
        ], // 排序
        // 权限控制
        can_create: queryAuth(this, 'create', '/policy_notice'),
        can_delete: queryAuth(this, 'delete', '/policy_notice'),
        can_edit: queryAuth(this, 'edit', '/policy_notice'),
        can_check: queryAuth(this, 'check', '/policy_notice'),
        can_sms: queryAuth(this, 'send_sms', '/policy/policy-mng') || queryAuth(this, 'send_sms', '/policy/notice-mng'),

        // 自定义金额名称
        rangeMoneyName: '',
        // 自定义-线上截止时间
        rangeSubmitOnlineEnd: '',
        // 自定义-纸质截止时间
        rangeSubmitPaperEnd: '',
        // 自定义-发布时间
        rangePublishDate: '',
        level: 3,
        parentId: 0,
        //日期范围设置
        pickerOptions: {
          shortcuts: [
            {
              text: '昨天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                end.setTime(end.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '今天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '上周',
              onClick(picker) {
                const oDate = new Date()
                oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7)

                let day = oDate.getDay()

                let start = new Date(),
                  end = new Date()
                if (day == 0) {
                  start.setDate(oDate.getDate())
                  end.setDate(oDate.getDate() + 6)
                } else {
                  start.setTime(oDate.getTime() - 3600 * 1000 * 24 * day)
                  end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (6 - day))
                }

                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '本周',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                let thisDay = start.getDay()
                let thisDate = start.getDate()
                if (thisDay != 0) {
                  start.setDate(thisDate - thisDay)
                }
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '上月',
              onClick(picker) {
                const oDate = new Date()
                var year = oDate.getFullYear()
                var month = oDate.getMonth()
                var start, end
                if (month == 0) {
                  year--
                  start = new Date(year, 11, 1)
                  end = new Date(year, 11, 31)
                } else {
                  start = new Date(year, month - 1, 1)
                  end = new Date(year, month, 0)
                }

                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '本月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setDate(1);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '去年',
              onClick(picker) {

                var oDate = new Date();
                var prevYear = oDate.getFullYear() - 1;
                const end = new Date();
                const start = new Date();
                start.setFullYear(prevYear);
                start.setMonth(0);
                start.setDate(1);

                end.setFullYear(prevYear);
                end.setMonth(11);
                end.setDate(31);

                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '今年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(0);
                start.setDate(1);
                picker.$emit('pick', [start, end]);
              }
            },
          ]
        },
        onlineDateEnd: '',
        paperDateEnd: '',
        publishDate: '',

        allowGetList: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:LIST'),//查询政策通知记录
        allowAdd: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:INSERT'),//新增政策通知
        allowUpdate: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:UPDATE'),//修改政策通知
        allowDelete: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:DELETE'),//删除政策通知
        allowGetProjectList: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:PROJECT:LIST'),//查询项目信息
        allowCancelFileRelation: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:DISASSOCIATE:FILES'),//取消文件关联
        allowCopy: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:COPY'),//复制功能
        allowSendTempMsg: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:SEND:WX:TEMPLATEMSG'),//发送微信模板信息
        allowAddTempMsg: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:ADD:WX:TEMPLATEMSG'),//新增公众号信息

        //二维码是否显示
        qrCodeShowOrNo:false,
        newNoticeId:'',
        toDate:"",
        // biJiaoTodate:"",

        // 发送推广消息
        sendWxMpTemplateMsgVisible: false,
        wxTemplatesList:[],
        wxSendMsgParams: {
          templateId: '',
          id:'',
          type: "policy_notice"
        },

        // 新增公众号消息
        addWxMpTemplateMsgVisible: false,
        WxMpAllPrivateTemplateList: [],
        addWxMpTemplateMsgParams:{
          templateId:'',
        },
        selectedWxMpTemplate: {},

      }
    },
    filters: {},
    mounted() {
      this.getCommonData();
      //  this.creatQrCode(1);

    },
    activated() {
      if (localStorage.getItem('searchName')) {
        this.$delete(this.listQuery, 'noticeName')
        if (localStorage.getItem('searchName') !== '') {
          this.select_filter_list = {};
          this.listQuery = {
            orderField: '',
            orderType: '',
            page: 0,
            pageSize: 20,
            subsidyTotal: '',
            publishDate: '',
            supplyIndustry: []
          }
          this.$set(this.listQuery, 'noticeName', localStorage.getItem('searchName'));
          this.getList();
        }
      } else {
        if(this.$store.getters.policyPage != 0){
          this.listQuery.page = 0;
          this.listQuery.pageSize = this.$store.getters.policyPage + 20;
          this.getList();
        }else{
          this.listQuery.page = this.$store.getters.policyPage;
          this.listQuery.pageSize = 20;
          this.getList();
        }
      }
      window.addEventListener('scroll', this.scrollToTop)

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.policyScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    deactivated() {
      localStorage.removeItem('searchName');
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_POLICY_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_POLICY_PAGE', this.listQuery.page) //离开路由时把位置存起来
      next()
    },
    methods: {
      // 新增公众号消息
      addWxMpTemplateMsgHandle() {
        getWxMpAllPrivateTemplate().then(res => {
          if (res.code === 200) {
            this.WxMpAllPrivateTemplateList = res.data
            this.WxMpAllPrivateTemplateList = this.WxMpAllPrivateTemplateList.filter(item=>{return item.title!=='订阅模板消息';})
            this.addWxMpTemplateMsgParams = {}
            this.addWxMpTemplateMsgVisible = true
          }
        })
      },
      changeTWxMpTemplate(val){ // 选择模板
        this.WxMpAllPrivateTemplateList.forEach(item => {
          if(item.templateId === val){
            this.selectedWxMpTemplate = item
            this.selectedWxMpTemplate.content = this.replaceText(this.selectedWxMpTemplate.content)
            this.selectedWxMpTemplate.example = this.replaceText(this.selectedWxMpTemplate.example)
          }
        })
      },
      replaceText(text) { // 替换
        return text.replace(/\\\\\r\\\\\n/g, '<br/>')
          .replace(/\\\\r\\\\n/g, '<br/>')
          .replace(/\\\r\\\n/g, '<br/>')
          .replace(/\\r\\n/g, '<br/>')
          .replace(/\r\n/g, '<br/>')
          .replace(/\\\\\n/g, '<br/>')
          .replace(/\\\\n/g, '<br/>')
          .replace(/\\\n/g, '<br/>')
          .replace(/\\n/g, '<br/>')
          .replace(/\n/g, '<br/>')
      },
      goAddWxMpTemplateMsg(){ // 发送消息
        if(!this.addWxMpTemplateMsgParams.templateId){
          this.$message.warning("请选择模板！")
          return
        }
        // 请求参数改为formData
        const formData = new FormData();
        Object.keys(this.addWxMpTemplateMsgParams).forEach((key) => {
          formData.append(key, this.addWxMpTemplateMsgParams[key]);
        });
        addWxMpTemplateMsg(formData).then(res=>{
          if(res.code === 200){
            this.$message.success(res.message?res.message:"操作成功")
            this.addWxMpTemplateMsgVisible = false
          }
        })
      },

      // 发送推广消息
      sendWxMpTemplateMsgHandle(data){
        var params = {
          keyList: 'DICT:WX:TEMPLATES',
          companyId: "697480101377343488",
        }
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.wxSendMsgParams.id = data.noticeId;
            this.wxTemplatesList = res.data['DICT:WX:TEMPLATES'];
            if(this.wxTemplatesList.length>0){
              this.wxSendMsgParams.templateId = this.wxTemplatesList[0].dictValue
            }
            this.sendWxMpTemplateMsgVisible = true;
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },
      // 发送推广消息
      goSendWxMpTemplateMsg(){
        if(!this.wxSendMsgParams.id){
          this.$message.error("请先选择政策！")
          return;
        }else if(!this.wxSendMsgParams.templateId){
          this.$message.error("请先选择模板！")
          return;
        }
        const formData = new FormData();
        formData.append("type", "policy_notice")
        formData.append("id", this.wxSendMsgParams.id)
        formData.append("templateId", this.wxSendMsgParams.templateId)
        sendWxMpTemplateMsg(formData).then(res=>{
          if(res.code==200){
            this.$message.success("操作成功!")
          }
          this.sendWxMpTemplateMsgVisible = false
        })
      },

      // 生成二维码
      creatQrCode(data) {

        let href = 'https://chengguoyun.cn/#/policy/detail?noticeId='+data+'&userId='+this.$store.state.user.userId;
        let qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: href, // 需要转换为二维码的内容
          width: 120,
          height: 120,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      // 创建验证码或关闭
      chooseQrCode(data,tureOrfalse){
        // this.qrCodeShowOrNo=!this.qrCodeShowOrNo
        this.qrCodeShowOrNo=tureOrfalse
        this.newNoticeId=data
        if(this.qrCodeShowOrNo==true){
          setTimeout(() => {
            this.creatQrCode(data)
          }, 500)

        }else{
          this.closeCode()
        }
      },

      // 关闭弹框,清除已经生成的二维码
      closeCode () {
        this.$refs.qrCodeUrl.innerHTML = ''
      },
      // 匹配企业
      matchingCompany(noticeId) {
        // 手动执行智能匹配
        manualMatching({noticeId: noticeId, userId: this.$store.getters.userId}).then(res => {
          if (res.code === 200) {
            this.$router.push({'path': '/policy/project/matchingCompany', 'query': {'id': noticeId, 'queryType': 'notice'}})
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
      // 开始搜索
      goSearch() {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 筛选更多条件
      getMoreCondition() {
        this.getRegionList()
        this.more_condition = !this.more_condition
      },
      handleFilter(e) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 10
        this.order_type_list.forEach(item => {
          if (item.id == e) {
            this.listQuery.orderType = item.label
            this.listQuery.orderField = item.key
          }
        })
        this.getList()
      },
      setValueNull() {
        this.listQuery.orderType = "";
        this.listQuery.orderField = "";
        this.getList();
      },
      getList() {
        // console.log("this.toDate==>")

        this.toDate = new Date()
        const year = this.toDate.getFullYear();
        const month = this.toDate.getMonth() + 1;
        const day = this.toDate.getDate();
        this.toDate = `${year}-${month}-${day}`

        this.listLoading = true
        // this.listQuery.page = 0;
        // this.listQuery.pageSize = 20;
        if (this.allowGetList.twoAllow) {
          queryNoticeInfo(this.listQuery).then(res => {
            if (res.code == 200) {
              res.data.data.forEach(item => {

                  // ((new Date(d1.replace(reg, '/'))) > (new Date(d2.replace(reg, '/'))))

                if (item.projectVoList && item.projectVoList.length !== 0) {
                  item.projectVoList.map(pro => {
                    if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0]) {
                      pro.subsidyTotal = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].subsidyTotal;

                      if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateStart) {
                        pro.onlineDateStart = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateStart;
                      }

                      if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateEnd) {
                        pro.onlineDateEnd = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateEnd;
                      }

                      if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateStart) {
                        pro.paperDateStart = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateStart;
                      }
                      if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateEnd) {
                        pro.paperDateEnd = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateEnd;
                      }
                    }
                    pro.provinceName = pro.policyProjectAreaVoList[0].provinceName;
                    pro.cityName = pro.policyProjectAreaVoList[0].cityName;
                    pro.districtName = pro.policyProjectAreaVoList[0].districtName;
                    pro.townName = pro.policyProjectAreaVoList[0].townName;
                    pro.applicationStatus = pro.policyProjectAreaVoList[0].applicationStatus;
                    return pro;
                  })
                }
              });



              if (this.listQuery.page > 0) {
                this.list = this.list.concat(res.data.data)
              } else {
                this.list = res.data.data;
                this.check_biz_ids = [];

                if(this.$store.getters.policyPage != 0){
                  this.listQuery.page = this.$store.getters.policyPage;
                  this.listQuery.pageSize = 20;
                }
              }

              let obj = {}
              let i=0
              let reg = new RegExp('-', 'g')
              this.list = this.list.reduce((cur, next) => {
                obj[next.noticeId] ? '' : obj[next.noticeId] = true && cur.push(next);
                if(cur[i].validDateEnd){
                  (new Date(cur[i].validDateEnd.replace(reg, '/'))) > (new Date(this.toDate.replace(reg, '/')))?cur[i].newData=1:cur[i].newData=0;
                  // console.log(cur[i].validDateEnd,"===?>cur.validDateEnd");
                }else{
                  cur[i].newData=1;
                }
                // cur.toDate
                i=i+1
                return cur
              }, [])
              this.total = res.data.total;
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取此列表')
        }
      },
      areaSetNull(level) {
        if (level === 3) {
          this.listQuery.city_list = []
          this.citys = []
        }
        if (level >= 2) {
          this.listQuery.district_list = []
          this.districts = []
        }
        if (level >= 1) {
          this.listQuery.town_list = []
          this.towns = []
        }
      },

      supplyIndustryChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.supply_industry_list.forEach(item => {
              if (item.dictId == val) {
                arr.push(item.dictName)
              }
            })
            const string = arr.join('，');
            this.$set(this.select_filter_list, 'supplyIndustry', `补贴行业 - ${string}`)
          })
        } else {
          this.$delete(this.select_filter_list, 'supplyIndustry')
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      changeProvince(val) {
        if (val) {
          this.$set(this.select_filter_list, 'provinceId', '省份 - ' + this.province_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_filter_list, 'provinceId')
        }

        this.$delete(this.select_filter_list, 'cityId')
        this.$delete(this.select_filter_list, 'districtId')
        this.$delete(this.select_filter_list, 'townId')

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 2
        this.getRegionList()
        this.getList()
      },
      changeCity(val) {
        if (val) {
          this.$set(this.select_filter_list, 'cityId', '城市 - ' + this.city_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_filter_list, 'cityId')
        }
        this.$delete(this.select_filter_list, 'districtId')
        this.$delete(this.select_filter_list, 'townId')
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 1
        this.getRegionList()
        this.getList()
      },
      changeDistrict(val) {
        if (val) {
          this.$set(this.select_filter_list, 'districtId', '区县 - ' + this.district_list.find(ele => ele.dictId === val).dictName)
          this.$delete(this.select_filter_list, 'townId')
        } else {
          this.$delete(this.select_filter_list, 'districtId')
          this.$delete(this.select_filter_list, 'townId')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 0
        this.getRegionList()
        this.getList()
      },
      changeTown(val) {
        if (val) {
          this.$set(this.select_filter_list, 'townId', '镇街 - ' + this.town_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_filter_list, 'townId')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      projectTypeChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.project_type_list.forEach(item => {
              if (item.dictId == val) {
                arr.push(item.dictName)
              }
            })

            const string = arr.join('，')
            this.$set(this.select_filter_list, 'projectTypes', `项目类型 - ${string}`)
          })

        } else {
          this.$delete(this.select_filter_list, 'projectTypes')
        }


        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      onlineDateChange(val) {
        if (val) {
          this.$set(this.select_filter_list, 'onlineDateEnd', '线上截止时间 - ' + val[0] + '-' + val[1])
          this.listQuery.onlineDateStart = val[0];
          this.listQuery.onlineDateEnd = val[1];
        } else {
          this.$delete(this.select_filter_list, 'onlineDateEnd')
          // this.listQuery.onlineDateEnd = '';
          this.listQuery.onlineDateEnd = '';
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      paperDateChange(val) {
        if (val) {
          this.$set(this.select_filter_list, 'paperDateEnd', '纸质截止时间 - ' + val[0] + '-' + val[1])
          this.listQuery.paperDateStart = val[0];
          this.listQuery.paperDateEnd = val[1];
        } else {
          this.$delete(this.select_filter_list, 'paperDateEnd')
          // this.listQuery.paperDateEnd = '';
          this.listQuery.paperDateEnd = '';
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      publishDateChange(val) {
        if (val) {
          this.$set(this.select_filter_list, 'publishDate', '发布时间 - ' + val[0] + '-' + val[1])
          this.listQuery.publishDateStart = val[0];
          this.listQuery.publishDateEnd = val[1];
        } else {
          this.$delete(this.select_filter_list, 'publishDate')
          this.listQuery.publishDateStart = '';
          this.listQuery.publishDateEnd = '';
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      declareStatusChange(val) {
        if (val !== "") {
          this.$set(this.select_filter_list, 'declareStatus', '申报状态 - ' + this.apply_state_list.find(ele => ele.dictId == val).dictName)
        } else {
          this.$delete(this.select_filter_list, 'declareStatus')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      noticeTypeChange(val) {
        if (val) {
          this.$set(this.select_filter_list, 'noticeType', '类型 - ' + this.type_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_filter_list, 'noticeType')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },

      // 清空已选条件
      clearAllSelect() {
        this.list = []
        this.onlineDateEnd = ''
        this.paperDateEnd = ''
        this.publishDate = ''
        this.select_filter_list = {}
        this.listQuery = {}
        this.listQuery.page = 0
        this.listQuery.pageSize = 20;
        this.getList()
      },
      // 删除当前已选条件
      clearThisSelect(item) {
        this.$delete(this.select_filter_list, item)
        this.$delete(this.listQuery, item)

        if (item == 'publishDate') {
          this.listQuery.publishDateStart = '';
          this.listQuery.publishDateEnd = '';
        }

        if (this.listQuery.onlineDateEnd == '' || this.listQuery.onlineDateEnd == undefined) {
          this.onlineDateEnd = ''
        }
        if (this.listQuery.paperDateEnd == '' || this.listQuery.paperDateEnd == undefined) {
          this.paperDateEnd = ''
        }
        if (this.listQuery.publishDate == '' || this.listQuery.publishDate == undefined) {
          this.publishDate = ''
        }

        if (item === 'subsidyTotal') {
          this.$refs.subsidyTotal.clearMoney();
        }

        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
      },
      // 全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.list.forEach(function (item, index) {
            if (_this.check_biz_ids.indexOf(item.noticeId) === -1) {
              _this.check_biz_ids.push(item.noticeId)
            }
            _this.isCheckAll = true
          })
        }
      },
      // 点击加载更多
      loadMore() {
        this.listQuery.page = this.listQuery.page + 20
        // this.listQuery.pageSize = this.listQuery.pageSize

        queryNoticeInfo(this.listQuery).then(res => {
          if (res.code == 200) {
            res.data.data.forEach(item => {
              if (item.projectVoList && item.projectVoList.length !== 0) {
                item.projectVoList.map(pro => {
                  pro.subsidyTotal = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].subsidyTotal;
                  pro.provinceName = pro.policyProjectAreaVoList[0].provinceName;
                  pro.cityName = pro.policyProjectAreaVoList[0].cityName;
                  pro.districtName = pro.policyProjectAreaVoList[0].districtName;
                  pro.townName = pro.policyProjectAreaVoList[0].townName;
                  pro.applicationStatus = pro.policyProjectAreaVoList[0].applicationStatus;

                  if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateStart) {
                    pro.onlineDateStart = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateStart;
                  }

                  if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateEnd) {
                    pro.onlineDateEnd = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].onlineDateEnd;
                  }

                  if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateStart) {
                    pro.paperDateStart = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateStart;
                  }
                  if (pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateEnd) {
                    pro.paperDateEnd = pro.policyProjectAreaVoList[0].policyProjectYearVoList[0].paperDateEnd;
                  }
                  return pro;
                })
              }
            });
            this.list = this.list.concat(res.data.data);



              let obj = {}
              let i=0
              let reg = new RegExp('-', 'g')
              this.list = this.list.reduce((cur, next) => {
                obj[next.noticeId] ? '' : obj[next.noticeId] = true && cur.push(next);
                if(cur[i].validDateEnd){
                  (new Date(cur[i].validDateEnd.replace(reg, '/'))) > (new Date(this.toDate.replace(reg, '/')))?cur[i].newData=1:cur[i].newData=0;
                  // console.log(cur[i].validDateEnd,"===?>cur.validDateEnd");
                }else{
                  cur[i].newData=1;
                }
                // cur.toDate
                i=i+1
                return cur
              }, [])
              this.total = res.data.total;



          }
        });
      },
      // 处理删除
      handleDelete() {
        if (this.check_biz_ids.length <= 0) {
          this.$message.error('请勾选删除的行!')
          return false
        }
        this.$confirm('您确定删除吗？').then(_ => {
          removeNoticeInfo({noticeId: this.check_biz_ids}).then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功！')
              this.check_biz_ids = []
              this.listQuery.page = 0;
              this.getList()
            }
          })
        })
      },
      // 查看已经删除记录
      checkDeleteRecord() {
        this.listQuery.page = 0;
        this.listQuery.pageSize = 10;
        this.is_delete = !this.is_delete;
        if (this.is_delete) {
          this.listQuery.stateNum = 3;
        } else {
          this.listQuery.stateNum = "";
        }
        this.listQuery.page = 0;
        this.getList()
      },
      // 新增
      handleCreate() {
        this.$router.push({'path': '/policy/addPolicy', 'query': {'is_create': true}})
      },
      // 查看
      handleCheck(data) {
        if (this.listQuery.stateNum == 3) {
          this.$router.push({
            'path': '/policy/detailPolicy',
            'query': {'noticeId': data.noticeId, 'is_check': true, 'stateNum': this.listQuery.stateNum}
          })
        } else {
          this.$router.push({'path': '/policy/detailPolicy', 'query': {'noticeId': data.noticeId, 'is_check': true}})
        }
        // var redirect_url = '/policy_notice/check?is_check=true&biz_id=' + data.biz_id
        // this.handleRedirect(redirect_url)
      },
      // 编辑
      handleUpdate(data) {
        if (this.listQuery.stateNum == 3) {
          this.$router.push({
            'path': '/policy/editPolicy',
            'query': {'noticeId': data.noticeId, 'is_edit': true, 'stateNum': this.listQuery.stateNum}
          })
        } else {
          this.$router.push({'path': '/policy/editPolicy', 'query': {'noticeId': data.noticeId, 'is_edit': true}})
        }

        // var redirect_url = '/policy_notice/edit?is_edit=true&biz_id=' + data.biz_id
        // this.handleRedirect(redirect_url)
      },

      //复制
      copyHandle(data) {
        this.$confirm('是否确定复制?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          copyNoticeInfo({noticeIds: [data.noticeId]}).then(res => {
            if(res.code === 200){
              this.$router.push({'path': '/policy/editPolicy', 'query': {'noticeId': res.data, 'is_edit': true}})
            }
            this.$message({type: 'success', message: '复制成功!'});
          })
        }).catch(() => {});
      },
      // 重定向
      handleRedirect(redirect_url) {
        if (!redirect_url) {
          redirect_url = '/policy_notice/create?is_create=true'
        }
        // const routeUrl = this.$router.resolve({ path: redirect_url })
        // window.open(routeUrl.href, '_blank')
      },
      // 搜索tab切换
      handleTabChange() {
        this.search_placeholder = this.search_placeholder_list[this.search_type]
        this.handleFilter()
      },
      // 发送信息
      handleSendSms(data) {
        if (data.type === 1) { // 给企业发送政策短信
          this.$router.push({
            'path': '/enterprise/batch-send-sms/choice-enterprise',
            'query': {'sms_type': '1', 'policy_id': data.noticeId, 'policy_name': data.name}
          })
        } else { // 给企业发送通知短信
          this.$router.push({
            'path': '/enterprise/batch-send-sms/choice-enterprise',
            'query': {'sms_type': '2', 'notice_id': data.noticeId, 'notice_title': data.name}
          })
        }
      },
      // 点击发布单位筛选
      clickPublishOrgan(data) {
        if (!data.publishOrgan) {
          return false
        }
        this.listQuery.name = data.publishOrgan
        this.listQuery.page = 0;
        this.getList()
      },
      // 点击补贴行业筛选
      clickSupplyIndustry(data) {
        if (!data.supply_industry) {
          return false
        }
        this.listQuery.supply_industry = String(data.supply_industry)
        this.listQuery.page = 0;
        this.getList()
      },
      // 点击申报状态筛选
      clickApplyState(data) {
        // var declareStatus = this.listQuery.declareStatus
        // if (declareStatus instanceof Array && declareStatus.indexOf(String(data.apply_state_tuple[0])) === -1) {
        //   this.listQuery.declareStatus.push(String(data.apply_state_tuple[0]))
        // }
        this.listQuery.page = 0;
        this.getList()
      },
      // 点击项目名称跳转详情
      toProject(id) {
        if (id) {
          this.$router.push({'path': '/policy/project/detail', 'query': {'check': true, 'id': id}})
        }
      },
      // 导出企业信息
      handleExport() {
        window.open(this.host + '/enterprise/export-enterprise-excel/?' + qs.stringify(this.listQuery))
      },

      // -----------------
      // 钱-子组件获取修改的值
      handleMoney(data) {
        this.listQuery.subsidyTotal = []
        if (data && data !== "") {
          let arr = []
          if (data.key === "100") {
            this.listQuery.subsidyTotalStart = Number(data.key);
            this.listQuery.subsidyTotalEnd = 1000000000000;
            this.$set(this.select_filter_list, 'subsidyTotal', '补助金额' + data.val)
            this.listQuery.page = 0;
            this.getList();
            return
          }
          arr = data.key.split(":");
          this.listQuery.subsidyTotalStart = Number(arr[0]);
          this.listQuery.subsidyTotalEnd = Number(arr[1]);
          this.$set(this.select_filter_list, 'subsidyTotal', '补助金额' + data.val);
        } else {
          this.$delete(this.select_filter_list, 'money')
        }
        this.listQuery.page = 0;
        this.getList();
      },
      // 钱-清除选中的钱选项
      handleClearMoney() {
        this.listQuery.subsidyTotalStart = "";
        this.listQuery.subsidyTotalEnd = "";
        this.$delete(this.select_filter_list, 'subsidyTotal')
        this.listQuery.page = 0;
        this.getList()
      },
      // 钱-确定设置的范围值
      handleMoneyRange(data) {
        // this.listQuery.subsidyTotal = []
        if (data.startMoney !== "" && data.endMoney !== "") {
          const newMoney = `${data.startMoney}:${data.endMoney}`
          const rangeMoneyName = `${data.startMoney}万-${data.endMoney}万`
          this.listQuery.subsidyTotalStart = Number(data.startMoney);
          this.listQuery.subsidyTotalEnd = Number(data.endMoney);
          this.rangeMoneyName = rangeMoneyName;
          this.$set(this.select_filter_list, 'subsidyTotal', `补助金额：${data.startMoney}万-${data.endMoney}万`)
        } else {
          this.$delete(this.select_filter_list, 'subsidyTotal')
        }
        this.listQuery.page = 0;
        this.getList()
      },

      // 选择时间
      handleDate(data) {
        if (data.labelName === '线上截止时间') {
          this.listQuery.onlineDateEnd = []
          this.listQuery.onlineDateEnd.push(data.key)
        } else if (data.labelName === '纸质截止时间') {
          this.listQuery.paperDateEnd = []
          this.listQuery.paperDateEnd.push(data.key)
        } else if (data.labelName === '发布时间') {
          this.listQuery.publishDate = []
          this.listQuery.publishDate.push(data.key)
        }
        this.listQuery.page = 0;
        this.getList()
      },
      handleClearDate(data) {
        if (data === '线上截止时间') {
          this.listQuery.onlineDateEnd = []
        } else if (data === '纸质截止时间') {
          this.listQuery.paperDateEnd = []
        } else if (data === '发布时间') {
          this.listQuery.publishDate = []
        }
        this.listQuery.page = 0;
        this.getList()
      },
      handleDateRange(data) {
        if (data.labelName === '线上截止时间') {
          this.listQuery.onlineDateEnd = []
          this.listQuery.onlineDateEnd.push(data)
          this.rangeSubmitOnlineEnd = data.rangeDateName
        } else if (data.labelName === '纸质截止时间') {
          this.listQuery.paperDateEnd = []
          this.listQuery.paperDateEnd.push(data)
          this.rangeSubmitPaperEnd = data.rangeDateName
        } else if (data.labelName === '发布时间') {
          this.listQuery.publishDate = []
          this.listQuery.publishDate.push(data)
          this.rangePublishDate = data.rangeDateName
        }
        this.listQuery.page = 0;
        this.getList()
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PROJECT_TYPE,DICT:SUBSIDYINDUSTRY_TYPE'
        }
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.project_type_list = res.data['DICT:PROJECT_TYPE']
            this.supply_industry_list = this.supply_industry_list.concat(res.data['DICT:SUBSIDYINDUSTRY_TYPE'])

          } else {
            this.$message({type: 'error', message: res.message})
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
      }

    }
  }
</script>

<style lang="less" scoped>
  .hover_cursor {
    cursor: pointer
  }

  .gray{
    // background: #ebeef5;
    .policy_notice_name{
      color: #ccc;
    }
    .type_bg.green{
      background: #ccc !important;
    }
    .type_bg.blue{
      background: #ccc !important;
    }
    .bg-list{
      //  background: #dadfe8 !important;
    }
  }

  .qrcode-out-show{
  display: inline-block;
  // overflow: hidden;
  }
  .qrcode-out-no{
  display: none;
  }
  .qrCodeChoose{
    position:relative;
    z-index: 0;
  }
  /deep/.el-dialog__close{
    display: none;
  }
  /deep/.el-dialog__body{
    display: flex;
    justify-content: center;
    text-align: center;
    flex-flow: column;

    .qrcode {
      display:block;
      text-align: center;
      width: 132px;
      margin: 0 auto;
      img {
        text-align: center;
        width: 132px;
        height: 132px;
        background-color: #fff; //设置白色背景色
        padding: 6px; // 利用padding的特性，挤出白边
        box-sizing: border-box;
      }
    }
  }

    span {
      white-space:nowrap;
      font-size: 12px;
      padding: 0;
      margin: 0;
    }





  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
  }

  .text-align-center {
    text-align: center;
  }

  .overflow-x {
    overflow-x: hidden;
  }

  .overflow-y {
    overflow-y: hidden;
  }

  .display_inline {
    display: inline;
  }

  .margin-0 {
    margin: 0px;
  }

  .all-width {
    width: 100%;
  }

  .width-50 {
    width: 50px;
  }

  .width-100 {
    width: 100px;
  }

  .width-200 {
    width: 200px;
  }

  .width-300 {
    width: 300px;
  }

  .width-400 {
    width: 400px;
  }

  .width-500 {
    width: 500px;
  }

  .width-600 {
    width: 600px;
  }

  .width-700 {
    width: 700px;
  }

  .width-800 {
    width: 800px;
  }

  .bottom-margin-2 {
    margin-bottom: 2px;
  }

  .bottom-margin-4 {
    margin-bottom: 4px;
  }

  .bottom-margin-5 {
    margin-bottom: 5px;
  }

  .bottom-margin-10 {
    margin-bottom: 10px;
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

  .right-margin-20 {
    margin-right: 20px;
  }

  .right-margin-30 {
    margin-right: 30px;
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
    font-size: 12px;
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

  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 5%;
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

  .padding-5 {
    padding: 5px;
  }

  .padding-vertical-10 {
    padding: 10px 0;
  }

  .padding-level-10 {
    padding: 0 10px;
  }

  .search_input {
    width: 600px;
    height: 48px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(5, 170, 255, 0.7294117647058823);
    opacity: 1;
  }

  .bg_blue {
    background: #05AAFF;
    color: #fff;

    &:hover {
      background: #05AAFF;
      opacity: 0.5;
    }
  }

  .bt_blue {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  .bt_purple {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  .bt_font {
    width: 96px;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  .type_bg {
    width: 84px;
    height: 84px;
    border-radius: 10px;
    opacity: 1;

    &.blue {
      background: #05aaff;
    }

    &.green {
      background: rgba(145, 229, 161, 1);
    }
  }

  .type_font {
    width: 36px;
    height: 50px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  .policy_notice_name {
    width: 100%;
    height: 24px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 24px;
    color: rgba(68, 68, 68, 1);
    opacity: 1;
  }

  .normal_name {
    width: 70px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(68, 68, 68, 0.75);
    opacity: 1;
  }

  .red_name {
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(245, 108, 108, 1);
    opacity: 1;
  }

  .can_click {
    width: 42px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgb(5, 170, 255);
    opacity: 1;
  }

  .project_bg {
    border-radius: 5px;
    padding: 1px 10px;
    width: 100%;
    background: rgba(239, 250, 255, 1);
    opacity: 1;
  }

  .project_badge {
    width: 18px;
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: #FFCBA6;
    color: #ffffff;
    border-radius: 2px;
    opacity: 1;
    display: inline-block;
    margin-right: 4px;
    margin-top: 6px;
  }

  .edit_bt {
    width: 90px;
    height: 30px;
    background: #ffffff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    border: 1px solid #33B3EE;
    color: #33B3EE;
    opacity: 1;
    cursor: pointer;
  }

  .disable_bt {
    width: 70px;
    height: 30px;
    background: #ffffff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    border: 1px solid #333333;
    color: #666666;
    opacity: 1;
  }

  .send_sms_bt {
    width: 70px;
    height: 30px;
    background: #ffffff;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    border: 1px solid #FFCBA6;
    color: #FFCBA6;
    opacity: 1;
  }

  .red-border {
    border: 1px solid #ff0000;
    color: #ff0000;
  }

  .blue-border {
    border: 1px solid #33B3EE;
    color: #33B3EE;
  }

  .orange-border {
    border: 1px solid #FFCBA6;
    color: #FFCBA6;
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


  /*---------------*/
  .list-content {
    overflow: hidden;

    .second-list {
      padding: 10px;
      margin-bottom: 4px;
      display: flex;
      font-size: 14px;
      flex-wrap: wrap;

      .policy-list, .notice-list {
        width: 100%;
        padding-left: 15px;

        .item {
          display: flex;
          margin-bottom: 10px;
          flex-wrap: wrap;

          .index {
            width: 18px;
            min-width: 18px;
            height: 18px;
            color: #fff;
            background: #91e5a1;
            border-radius: 50%;
            text-align: center;
            margin-right: 4px;
          }

          .item-text {
            flex: 1;
            white-space: nowrap;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .red {
        color: rgba(245, 108, 108, 1);
      }

      .back {
        color: rgba(68, 68, 68, 0.75);
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

    .third-list {
      display: flex;
      font-size: 12px;
      align-items: flex-start;
      /*padding-top: 11px;*/

      .can_click {
        font-size: 12px;
      }

      .list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        align-items: center;

        .item {
          flex: 1;
          margin-top: 6px;
        }
      }
    }
  }

  .amount-money {
    width: 143px;
    height: 36px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 15px;
    color: #c0c4cc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .list {
      min-width: 115px;
      background: #fff;
      position: absolute;
      bottom: -60px;
      z-index: 2005;
      border: 1px solid #E4E7ED;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border-radius: 4px;

      div {
        padding: 0 20px;
      }
    }
  }

  .search-bar {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    .btn {
      border: 0;
      border-radius: 0;
    }

    /deep/ .el-form-item {
      margin-bottom: 0;
    }

    .search {
      display: flex;

      .search_input {
        padding-left: 20px;
        border-right: 0;
      }
    }

    /deep/ .el-card__body {
      padding: 19px 20px;
    }
  }

  .screen-box {
    margin-top: 10px;

    .screen-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .left {
        display: flex;
        align-items: flex-start;

        .name {
          white-space: nowrap;

          .line {
            width: 3px;
            height: 14px;
            display: inline-block;
            background: rgba(5, 170, 255, 1);
            margin-right: 10px;
            vertical-align: middle;
            margin-top: -2px;
          }
        }

        .screen-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-top: -5px;
          margin-left: 10px;

          .item {
            margin-bottom: 10px;
            padding: 5px 6px 4px;
            font-size: 12px;
            display: flex;
            align-items: center;
            margin-right: 10px;
            color: #05AAFF;
            border: 1px solid #05AAFF;

            .del {
              margin-left: 8px;
              cursor: pointer;
              font-size: 16px;
            }
          }

          .clear {
            padding: 7px;
            font-size: 12px;
            border: 1px solid #F56C6C;
            color: #F56C6C;
            cursor: pointer;
            margin-bottom: 10px;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          margin-right: 4px;
        }
      }
    }
  }

  .screen-form {
    /deep/ .el-form-item__label {
      min-width: 110px;
    }
  }
</style>
