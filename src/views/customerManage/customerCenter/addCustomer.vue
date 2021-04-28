<template>
  <div class="dashboard-container" style="overflow: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-90" style="margin-bottom: 20px;">
      <div v-if="is_personal == true || is_personal == 'true' ">
        <el-card class="top-margin-10 padding-0">
          <div>
            <span style="color: #03ADF4; font-weight: bold;">|</span>
            <span class="left-margin-10" style="color: #263B45;">基本信息</span>
            <span class="float-right right-margin-10">
              <span>
                <el-button v-if="!ruleForm.crmCompanyId && allowAdd.twoAllow" size="mini"
                           class="filter-item bg_pale_purple left-margin-10"
                           @click="changeType">新增客户</el-button>
              </span>
            </span>
          </div>
        </el-card>
        <el-card class="rule-form-box">
          <div class="float-left" style="width: 5%; min-width: 90px;">
            <div class="ent_shorthand left-margin-10 padding-20 float-left text-align-center">
              {{ruleForm.companyShortName ? ruleForm.companyShortName : '个人客户'}}
            </div>
          </div>
          <div class="float-left left-margin-10" style="width: 90%; position: relative;">
            <div class="edit-ruleForm" style="width: 100%">
              <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :inline="true">
                <el-row>
                  <div class="float-left inline-block width-0-3" style="display: flex;">
                    <span class="font-red">*</span>
                    <el-input v-if="check" size="mini" v-model.trim="ruleForm.companyName" placeholder="输入客户名称"
                              maxlength="50"
                              class="float-left company-name inline-block left-margin-5"></el-input>
                    <span v-else>
                      {{ruleForm.companyName}}
                      <img class="hover_cursor" v-if="!check && powerEdit && allowUpdate.twoAllow" @click="toEdit" src="../../icons/enterprise/edit.png"
                           style="vertical-align:middle; margin-left: 3px;"/>
                    </span>
                  </div>
                  <div class="float-left inline-block width-0-3 left-margin-50">
                    <span class="float-left inline-block span-input"><span class="font-red">*</span>客户级别：</span>
                    <div v-if="check">
                      <el-select size="mini" v-model="ruleForm.companyLevel" placeholder="客户级别"
                                 class="register-status float-left inline-block left-margin-5 input-120">
                        <el-option v-for="item in customer_classification_list" :key="item.dictId"
                                   :label="item.dictName"
                                   :value="item.dictId"></el-option>
                      </el-select>
                    </div>
                    <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.companyLevelName}}</span>
                  </div>
                </el-row>
                <el-row v-if="ruleForm.crmCompanyId">
                  <div class="float-left inline-block top-margin-10 width-0-3">
                    <span class="float-left inline-block span-input">创建时间：</span>
                    <span class="float-left inline-block left-margin-5 span-input">{{ruleForm.createTime}}</span>
                  </div>
                </el-row>
                <el-row>
                  <div class="float-left inline-block top-margin-10 width-0-3">
                    <span class="float-left inline-block span-input">性别：</span>
                    <div v-if="check">
                      <el-select size="mini" v-model="ruleForm.personnelSex" placeholder="性别"
                                 class="register-status float-left inline-block left-margin-5 input-120">
                        <el-option v-for="item in gender_list" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.personnelSex == 1 ? '男' : ruleForm.personnelSex == 0 ? '女' : ''}}</span>
                  </div>
                  <div class="float-left inline-block top-margin-10 width-0-6 left-margin-50">
                    <span class="float-left inline-block span-input">手机号码：</span>
                    <el-input size="mini" v-if="check" v-model="ruleForm.personnelMobile" placeholder="手机号码"
                              class="float-left inline-block left-margin-5 input-180"></el-input>
                    <span v-else
                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.personnelMobile}}</span>
                  </div>
                </el-row>
                <el-row>
                  <div class="float-left inline-block top-margin-10 width-0-3">
                    <span class="float-left inline-block span-input">出生日期：</span>
                    <el-date-picker v-if="check" size="mini" v-model="ruleForm.birthDate"
                                    class="float-left inline-block left-margin-5 input-180" type="date"
                                    value-format="yyyy-MM-dd" placeholder="出生日期"></el-date-picker>
                    <span v-else
                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.birthDate}}</span>
                  </div>
                  <div class="float-left inline-block top-margin-10 width-0-6 left-margin-50">
                    <span class="float-left inline-block span-input">身份证号码：</span>
                    <el-input size="mini" v-if="check" v-model="ruleForm.idCard" placeholder="身份证号码" maxlength="40"
                              class="float-left inline-block left-margin-5 input-180"></el-input>
                    <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.idCard}}</span>
                  </div>
                </el-row>
                <el-row>
                  <div class="float-left inline-block top-margin-10 width-0-3">
                    <span class="float-left inline-block span-input">籍贯：</span>
                    <el-input size="mini" v-if="check" v-model="ruleForm.nativePlace" placeholder="籍贯" maxlength="18"
                              class="float-left inline-block left-margin-5 input-180"></el-input>
                    <span v-else
                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.nativePlace}}</span>
                  </div>
                  <div class="float-left inline-block top-margin-10 width-0-6">
                    <span class="float-left inline-block span-input">地址：</span>
                    <div v-if="check" style="display: inline-block">
                      <el-select size="mini" class="float-left inline-block left-margin-5 input-90"
                                 v-model="ruleForm.provinceId" :clearable="true" placeholder="省"
                                 @change="changeProvince">
                        <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                                   :value="item.dictId"></el-option>
                      </el-select>
                      <el-select size="mini" class="float-left inline-block left-margin-5 input-90"
                                 v-model="ruleForm.cityId" :clearable="true" placeholder="市" @change="changeCity">
                        <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                                   :value="item.dictId"></el-option>
                      </el-select>
                      <el-select size="mini" class="float-left inline-block left-margin-5 input-90"
                                 v-model="ruleForm.districtId" :clearable="true" placeholder="区"
                                 @change="changeDistrict">
                        <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                                   :value="item.dictId"></el-option>
                      </el-select>
                      <el-select size="mini" class="float-left inline-block left-margin-5 input-90"
                                 v-model="ruleForm.townId" :clearable="true" placeholder="镇" @change="changeTowns">
                        <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                                   :value="item.dictId"></el-option>
                      </el-select>
                      <el-input size="mini" v-model="ruleForm.companyAddress" placeholder="详细地址"
                                class="float-left inline-block left-margin-5 input-200"></el-input>
                    </div>
                    <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.provinceName}}{{ruleForm.cityName}}{{ruleForm.districtName}}{{ruleForm.townName}}{{ruleForm.companyAddress}}</span>
                  </div>
                </el-row>
                <el-row>
                  <div class="float-left inline-block top-margin-10 width-0-6">
                    <span class="float-left inline-block span-input">所属行业：</span>
                    <div v-if="check" style="display: inline-block">
                      <el-select size="mini" v-model="ruleForm.industryInvolved" placeholder="所属行业"
                                 class="input-color-blue float-left inline-block left-margin-5 input-360">
                        <el-option v-for="item in industry_involved_list" :key="item.dictId" :label="item.dictName"
                                   :value="item.dictId"></el-option>
                      </el-select>
                    </div>
                    <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.industryInvolvedName}}</span>
                  </div>
                  <!--                  <div class="float-left inline-block top-margin-10 width-0-6 left-margin-10">-->
                  <!--                    <span class="float-left inline-block span-input">所属单位：</span>-->
                  <!--                    <el-input size="mini" v-if="check" v-model="ruleForm.regist_authority" placeholder="所属单位"-->
                  <!--                              class="float-left inline-block left-margin-5 input-180"></el-input>-->
                  <!--                    <span v-else-->
                  <!--                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.regist_authority}}</span>-->
                  <!--                  </div>-->
                </el-row>
                <el-row v-if="id">
                  <div class="float-left inline-block top-margin-10 width-0-3">
                    <span class="float-left inline-block span-input">可申报数：</span>
                    <span class="float-left inline-block left-margin-5 span-input">{{ruleForm.can_report_num}}</span>
                  </div>
                  <div class="float-left inline-block top-margin-10 width-0-6 left-margin-50">
                    <span class="float-left inline-block span-input">专利数：</span>
                    <span class="float-left inline-block left-margin-5 span-input">{{ruleForm.patent_num}}</span>
                  </div>
                </el-row>
                <el-row v-if="id">
                  <div class="float-left inline-block top-margin-10 width-0-3">
                    <span class="float-left inline-block span-input">商标数：</span>
                    <span class="float-left inline-block left-margin-5 span-input">{{ruleForm.trademark_num}}</span>
                  </div>
                  <div class="float-left inline-block top-margin-10 width-0-6 left-margin-50">
                    <span class="float-left inline-block span-input">著作权数：</span>
                    <span class="float-left inline-block left-margin-5 span-input">{{ruleForm.copyright_num}}</span>
                  </div>
                </el-row>
              </el-form>
            </div>
            <div style="width: 200px; height: 100px; position:absolute; top: 20px; right: 50px; z-index: 1000"
                 v-if="ruleForm.is_personal&&ruleForm.crmCompanyId">
              <img src="../../icons/enterprise/personal_ent.png"/>
            </div>
          </div>
        </el-card>
      </div>
      <div v-else>
        <el-card class="top-margin-10 padding-0">
          <div>
            <span style="color: #263B45;">
              企业信息
                <img class="hover_cursor"
                     v-if="!check && powerEdit && allowUpdate.twoAllow"
                     @click="toEdit"
                     src="../../../../static/edit_pen.png"
                     style="width: 14px;margin-left: 5px;vertical-align: middle;margin-top: -2px;"
                />
            </span>
            <span class="float-right right-margin-10">
              <span class="padding-vertical-10" v-if="ruleForm.traceSalesManName">
                <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" @click="goChange"
                           v-if="allowBatchFollowUser.twoAllow && powerEdit">设置业务员</el-button>
                <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" @click="changeProject"
                           v-if="allowBatchEngineer.twoAllow && powerEdit">设置项目员</el-button>
                <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" @click="changeIntellectual"
                           v-if="allowBatchIntellectualEngineer.twoAllow && powerEdit">设置专利员</el-button>
                <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" @click="changeAudit"
                           v-if="allowBatchAuditor.twoAllow && powerEdit">设置审计员</el-button>
                <el-button size="mini" class="filter-item bg_pale_violet left-margin-10" @click="syncIpr"
                           v-if="allowSyncIntellectual.twoAllow && powerEdit">同步知识产权</el-button>
                <el-button size="mini" class="filter-item bg_pale_violet left-margin-10" @click="goSyncBasicInfo"
                           v-if="allowBatchCompanyInfo.twoAllow && powerEdit">同步企业信息</el-button>
                <el-button size="mini" class="filter-item bg_pale_orange left-margin-10"
                           v-if="!ruleForm.isChannel && allowIsproxy.twoAllow && powerEdit" @click="setChannel">设置渠道</el-button>
                <el-button size="mini" class="filter-item bg_gray left-margin-10"
                           v-if="ruleForm.isChannel && allowIsproxy.twoAllow && powerEdit" @click="cancelSetChannel">取消渠道</el-button>
                <el-button size="mini" class="filter-item bg_pink left-margin-10" v-if="allowPutCompanyToFreesesea.twoAllow && powerEdit"
                           @click="handlePutIntoFreeSea">投入公海</el-button>
              </span>
              <span v-else>
                <el-button v-if="ruleForm.crmCompanyId && powerEdit && allowbatchGrabCompany.twoAllow" size="mini"
                           class="filter-item bg_pale_purple left-margin-10"
                           @click="grabFreeSeaCustomer(ruleForm.crmCompanyId)">抢客户</el-button>
                <el-button v-if="!ruleForm.crmCompanyId && allowAddSyncQiChaCha.twoAllow && powerEdit" size="mini"
                           class="filter-item bg_pale_purple left-margin-10"
                           @click="syncQccBasicInfo">同步企查查</el-button>
                <el-button v-if="!ruleForm.crmCompanyId && allowAddPerson.twoAllow" size="mini"
                           class="filter-item bg_pale_purple left-margin-10" @click="changeType">新增个人</el-button>
              </span>
               <el-button v-if="!check" size="mini" class="filter-item bg_pink left-margin-10"
                          @click="goEnterpriseComplexInfo">客户综合信息表</el-button>

                <el-button size="mini" class="filter-item bg_pale_purple left-margin-10" @click="syncPolicyApprovalList"
                           v-if="allowSyncPolicyApprovalList.twoAllow && powerEdit">同步立项</el-button>
            </span>
          </div>
        </el-card>
        <el-card class="rule-form-box">
          <div class="float-left" style="width: 5%; min-width: 90px;">
            <div class="ent_shorthand left-margin-10 padding-20 float-left text-align-center">
              {{ruleForm.companyShortName ? ruleForm.companyShortName : '企业简称'}}
            </div>
          </div>

          <div class="float-left left-margin-10" style="width: 90%; position: relative;">
            <div class="edit-ruleForm" style="width: 100%">
              <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :inline="true">


                <div class="rule-forms">
                  <div class="rule-form-left">
                    <!--客户名称-->
                    <div class="flex">
                      <span class="font-red">*</span>
                      <el-input v-if="check" size="mini" v-model.trim="ruleForm.companyName" maxlength="100"
                                show-word-limit placeholder="输入企业名称"
                                class="company-name left-margin-5" style="max-width: 328px;"></el-input>
                      <div v-else>
                        {{ruleForm.companyName}}
                      </div>
                    </div>

                    <div class="flex" style="margin-top: 10px;">
                      <!--企业简称-->
                      <div class="flex">
                        <span class="span-input"><span class="font-red">*</span>企业简称：</span>
                        <el-input size="mini" v-if="check" maxlength="4" show-word-limit
                                  v-model.trim="ruleForm.companyShortName"
                                  placeholder="企业简称" class="left-margin-5 input-180"></el-input>
                        <span v-else class="left-margin-5 span-input">{{ruleForm.companyShortName}}</span>
                      </div>

                      <!--登记状态-->
                      <div class="flex">
                        <span class="span-input"><span class="font-red">*</span></span>
                        <div v-if="check">
                          <el-select size="mini" v-model="ruleForm.registerStatus"
                                     placeholder="登记状态"
                                     class="register-status left-margin-5 input-180 register-select"
                                     style="width: 80px;padding-left: 0;">
                            <el-option v-for="item in regist_status_list" :key="item.dictId" :label="item.dictName"
                                       :value="item.dictId"></el-option>
                          </el-select>
                        </div>
                        <span v-if="!check" class="left-margin-5 span-input">{{ruleForm.registerStatusName}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="rule-form-right">
                    <div class="flex" style="justify-content: space-between">
                      <!--客户级别-->
                      <div class="flex">
                        <span class="span-input"><span class="font-red">*</span>客户级别：</span>
                        <div v-if="check">
                          <el-select size="mini" v-model="ruleForm.companyLevel" placeholder="客户级别"
                                     class="register-status left-margin-5 input-120"
                                     style="border-bottom: 1px solid #ccc;">
                            <el-option v-for="item in customer_classification_list" :key="item.dictId"
                                       :label="item.dictName"
                                       :value="item.dictId"></el-option>
                          </el-select>
                        </div>
                        <span v-if="!check" class="left-margin-5 span-input">{{ruleForm.companyLevelName}}</span>
                      </div>

                      <!--客户标签-->
                      <div class="flex">
                        <span class="span-input"><span class="font-red"
                                                   style="visibility:hidden">*</span>客户标签：</span>
                        <el-select size="mini" v-model="ruleForm.companyTag" placeholder="客户标签" v-if="check" clearable
                                   multiple
                                   class="register-status left-margin-5 input-180"
                                   style="border-bottom: 1px solid #ccc;">
                          <el-option v-for="item in companyTagList" :key="item.dictId" :label="item.dictName"
                                     :value="item.dictId"></el-option>
                        </el-select>
                        <span v-else class="left-margin-5 span-input">{{ruleForm.companyTagName}}</span>
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="flex" style="justify-content: space-between;flex-wrap: wrap;">
                      <!--业务员-->
                      <div class="flex top-margin-10 width-0-18" style="min-width: 180px;" >
                        <span class="float-left inline-block span-input" >
                          <span class="font-red"  style="visibility:hidden">*</span>业务员：
                        </span>
                       <!--  -->
                        <span class="left-margin-5 span-input class-pointer " v-for="(item,index) in traceSalesManName" :key="index" @click="handleShowConnectContentListPeople(item,4)">
                      {{item + ','}}
                        </span>
                      <el-popover
                        placement="bottom"
                        width="550"
                        v-if="tips"
                        trigger="hover">
                           <el-table :data="companyTipsData[0]" height="300" style="width: 100%;">
                            <el-table-column
                              prop="userName"
                              label="人员">
                            </el-table-column>
                            <el-table-column
                              prop="createTime"
                              label="开始时间">
                            </el-table-column>
                            <el-table-column
                              prop="deleteTime"
                              label="结束时间">
                            </el-table-column>
                          </el-table>

                      <i slot="reference" class="icon-chat el-icon-chat-line-square"></i>
                      </el-popover>

                      </div>
                      <!--工程师 @click="handleShowConnectContentListPeople(ruleForm,1)"  -->
                      <div class="top-margin-10 width-0-18" style="min-width: 180px;" >
                        <span class="float-left inline-block span-input" >工程师：</span>
<!--                        <span class="float-left inline-block left-margin-5 span-input  class-pointer">{{ruleForm.projectMan}}</span>-->
                        <span class="left-margin-5 span-input class-pointer " v-for="(item,index) in projectMan" :key="index" @click="handleShowConnectContentListPeople(item,1)">
                      {{item + ','}}
                        </span>
                     <el-popover
                       placement="bottom"
                       width="550"
                       v-if="tips"
                       trigger="hover">
                           <el-table :data="companyTipsData[1]" height="300" style="width: 100%">
                            <el-table-column
                              prop="userName"
                              label="人员">
                            </el-table-column>
                            <el-table-column

                              prop="createTime"
                              label="开始时间">
                            </el-table-column>
                            <el-table-column
                              prop="deleteTime"
                              label="结束时间">
                            </el-table-column>
                          </el-table>
                      <i slot="reference" class="icon-chat el-icon-chat-line-square"></i>
                      </el-popover>
                      </div>
                      <!--专利员-->
                      <div class="top-margin-10 width-0-18" style="min-width: 180px;" @click="handleShowConnectContentListPeople(ruleForm,2)">
                        <span class="float-left inline-block span-input " >专利员：</span>
<!--                        <span class="float-left inline-block left-margin-5 span-input  class-pointer">{{ruleForm.propertyMan}}</span>-->
                        <span class="left-margin-5 span-input class-pointer " v-for="(item,index) in propertyMan" :key="index" @click="handleShowConnectContentListPeople(item,2)">
                          {{item + ','}}
                        </span>
                     <el-popover
                       placement="bottom"
                       width="550"
                       v-if="tips"
                       trigger="hover">
                           <el-table :data="companyTipsData[2]" height="300" style="width: 100%">
                            <el-table-column
                              prop="userName"
                              label="人员">
                            </el-table-column>
                            <el-table-column
                              prop="createTime"
                              label="开始时间">
                            </el-table-column>
                            <el-table-column
                              prop="deleteTime"
                              label="结束时间">
                            </el-table-column>
                          </el-table>

                      <i slot="reference" class="icon-chat el-icon-chat-line-square"></i>
                      </el-popover>
                      </div>
                      <!--审计员-->
                      <div class="top-margin-10 width-0-18" style="min-width: 180px;"  @click="handleShowConnectContentListPeople(ruleForm,3)">
                        <span class="span-input ">审计员：</span>
<!--                        <span class="left-margin-5 span-input  class-pointer">{{ruleForm.auditMan}}</span>-->
                        <span class="left-margin-5 span-input class-pointer " v-for="(item,index) in auditMan" :key="index" @click="handleShowConnectContentListPeople(item,3)">
                          {{item + ','}}
                        </span>
                        <el-popover
                          placement="bottom"
                          v-if="tips"
                          width="550"
                          trigger="hover">
                          <el-table :data="companyTipsData[3]" height="300" style="width: 100%">
                            <el-table-column
                              prop="userName"
                              label="人员">
                            </el-table-column>
                            <el-table-column
                              prop="createTime"
                              label="开始时间">
                            </el-table-column>
                            <el-table-column
                              prop="deleteTime"
                              label="结束时间">
                            </el-table-column>
                          </el-table>

                          <i slot="reference" class="icon-chat el-icon-chat-line-square"></i>
                        </el-popover>
                      </div>
                    </div>
                  </div>
                </div>


                <!--                <el-row>-->
                <!--                  <div class="float-left inline-block top-margin-10"-->
                <!--                       style="width: 30.2%;display:flex;white-space: nowrap;">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red"-->
                <!--                                                                           style="visibility:hidden">*</span>法人代表：</span>-->
                <!--                    <el-input size="mini" v-if="check" v-model.trim="ruleForm.companyLeader" placeholder="法人代表"-->
                <!--                              maxlength="20"-->
                <!--                              class="float-left inline-block left-margin-5 input-180"></el-input>-->
                <!--                    <span v-else-->
                <!--                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.companyLeader}}</span>-->
                <!--                  </div>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-6"-->
                <!--                       style="width: 30%;display: flex;white-space: nowrap;">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red">*</span>统一社会信用代码：</span>-->
                <!--                    <el-input size="mini" v-if="check" maxlength="30" v-model.trim="ruleForm.companyCode"-->
                <!--                              placeholder="统一社会信用代码"-->
                <!--                              class="float-left inline-block left-margin-5 input-180 unified-code"></el-input>-->
                <!--                    <span v-else-->
                <!--                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.companyCode}}</span>-->
                <!--                  </div>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-6">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red"-->
                <!--                                                                           style="visibility:hidden">*</span>官网：</span>-->
                <!--                    <el-input size="mini" v-if="check" v-model.trim="ruleForm.officialWebsite" placeholder="官网"-->
                <!--                              maxlength="50"-->
                <!--                              class="float-left inline-block left-margin-5 input-180"></el-input>-->
                <!--                    <span v-else-->
                <!--                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.officialWebsite}}</span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

                <!--                <el-row>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-3"-->
                <!--                       style="display: flex;white-space: nowrap;">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red">*</span>成立时间：</span>-->
                <!--                    <el-date-picker v-if="check" size="mini" v-model="ruleForm.setupDate"-->
                <!--                                    class="float-left inline-block left-margin-5 input-180" type="date"-->
                <!--                                    value-format="yyyy-MM-dd" placeholder="成立时间"></el-date-picker>-->
                <!--                    <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.setupDate}}</span>-->
                <!--                  </div>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-3">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red">*</span>年销售额：</span>-->
                <!--                    <div v-if="check">-->
                <!--                      <el-select size="mini" v-model="ruleForm.companySalesName" placeholder="年销售额"-->
                <!--                                 @change="companySaleChange"-->
                <!--                                 class="float-left inline-block left-margin-5 input-120">-->
                <!--                        <el-option v-for="item in enterprise_annual_sales_list" :key="item.value"-->
                <!--                                   :label="item.value"-->
                <!--                                   :value="item.value"></el-option>-->
                <!--                      </el-select>-->
                <!--                    </div>-->
                <!--                    <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.companySalesName}}</span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

                <!--                <el-row>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-3">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red">*</span>注册资本(万元)：</span>-->
                <!--                    <el-input size="mini" type="number" v-if="check" v-model="ruleForm.registerMoney"-->
                <!--                              @input.native="inputXz" oninput="if(value>1000000000)value=1000000000"-->
                <!--                              placeholder="注册资本" class="float-left inline-block left-margin-5 input-120"></el-input>-->
                <!--                    <span v-else-->
                <!--                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.registerMoney}}万元</span>-->
                <!--                  </div>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-3">-->
                <!--                    <span class="float-left inline-block span-input">实缴资本(万元)：</span>-->
                <!--                    <el-input size="mini" type="number" v-if="check" v-model="ruleForm.realityCmoney"-->
                <!--                              @input.native="inputXz" oninput="if(value && value>1000000000)value=1000000000"-->
                <!--                              placeholder="实缴资本" class="float-left inline-block left-margin-5 input-120"></el-input>-->
                <!--                    <span v-else-->
                <!--                          class="float-left inline-block left-margin-5 span-input">{{ruleForm.realityCmoney}}万元</span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

                <!--                <el-row>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-3">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red"-->
                <!--                                                                           style="visibility:hidden">*</span>员工规模：</span>-->
                <!--                    <span v-if="check">-->
                <!--                      <el-select size="mini" v-model="ruleForm.personnelScale" placeholder="员工规模"-->
                <!--                                 class="float-left inline-block left-margin-5 input-120">-->
                <!--                        <el-option v-for="item in employee_scale_list" :key="item.dictId" :label="item.dictName"-->
                <!--                                   :value="item.dictId" :disabled="!check"> </el-option>-->
                <!--                      </el-select>-->
                <!--                    </span>-->
                <!--                    <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.personnelScaleName}}</span>-->

                <!--                  </div>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-3">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red"-->
                <!--                                                                           style="visibility:hidden">*</span>参保人数：</span>-->
                <!--                    <el-input size="mini" v-if="check" type="number" v-model="ruleForm.socialSecurityNum"-->
                <!--                              @input.native="inputXz($event,1)" oninput="if(value>100000000)value=100000000"-->
                <!--                              placeholder="参保人数" class="float-left inline-block left-margin-5 input-120"></el-input>-->
                <!--                    <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.socialSecurityNum ? ruleForm.socialSecurityNum + '人' : 0}} </span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

                <!--                <el-row>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-6">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red"-->
                <!--                                                                           style="visibility:hidden">*</span>公司地址：</span>-->
                <!--                    <div v-if="check" style="display: inline-block">-->
                <!--                      <el-select size="mini" class="float-left inline-block left-margin-5 input-90"-->
                <!--                                 v-model="ruleForm.provinceId" :clearable="true" placeholder="省"-->
                <!--                                 @change="changeProvince">-->
                <!--                        <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"-->
                <!--                                   :value="item.dictId"></el-option>-->
                <!--                      </el-select>-->
                <!--                      <el-select size="mini" class="float-left inline-block left-margin-5 input-120"-->
                <!--                                 v-model="ruleForm.cityId" :clearable="true" placeholder="市" @change="changeCity">-->
                <!--                        <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"-->
                <!--                                   :value="item.dictId"></el-option>-->
                <!--                      </el-select>-->
                <!--                      <el-select size="mini" class="float-left inline-block left-margin-5 input-120"-->
                <!--                                 v-model="ruleForm.districtId" :clearable="true" placeholder="区"-->
                <!--                                 @change="changeDistrict">-->
                <!--                        <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"-->
                <!--                                   :value="item.dictId"></el-option>-->
                <!--                      </el-select>-->
                <!--                      <el-select size="mini" class="float-left inline-block left-margin-5 input-180"-->
                <!--                                 v-model="ruleForm.townId" :clearable="true" placeholder="镇" @change="changeTowns">-->
                <!--                        <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"-->
                <!--                                   :value="item.dictId"></el-option>-->
                <!--                      </el-select>-->
                <!--                      <el-input size="mini" v-model="ruleForm.companyAddress" placeholder="详细地址"-->
                <!--                                class="float-left inline-block left-margin-5 input-200"></el-input>-->
                <!--                    </div>-->
                <!--                    <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.provinceName}}{{ruleForm.cityName}}{{ruleForm.districtName}}{{ruleForm.townName}}{{ruleForm.companyAddress}}</span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

                <!--                <el-row>-->
                <!--                  <div class="float-left inline-block top-margin-10 width-0-6">-->
                <!--                    <span class="float-left inline-block span-input"><span class="font-red"-->
                <!--                                                                           style="visibility:hidden">*</span>所属行业：</span>-->
                <!--                    <div v-if="check" style="display: inline-block">-->
                <!--                      <el-select size="mini" v-model="ruleForm.industryInvolved" placeholder="所属行业"-->
                <!--                                 class="input-color-blue float-left inline-block left-margin-5 input-360">-->
                <!--                        <el-option v-for="item in industry_involved_list" :key="item.dictId" :label="item.dictName"-->
                <!--                                   :value="item.dictId"></el-option>-->
                <!--                      </el-select>-->
                <!--                    </div>-->
                <!--                    <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.industryInvolvedName}}</span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

                <!--                <el-row>-->
                <!--                  <div class="top-margin-10 width-0-6" style="display: flex;">-->
                <!--                    <span class="inline-block" style="font-size: 14px;"><span class="font-red">*</span>主营产品：</span>-->
                <!--                    <el-input size="mini" v-if="check" v-model.trim="ruleForm.mainProducts" placeholder="主营产品"-->
                <!--                              maxlength="100"-->
                <!--                              class="input-color-blue float-left inline-block left-margin-5 input-360"></el-input>-->
                <!--                    <span v-else class="inline-block left-margin-5" style="font-size: 14px;flex:1;">{{ruleForm.mainProducts}}</span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

                <!--                <el-row>-->
                <!--                  <div class="inline-block top-margin-10 width-0-6" style="display: flex;">-->
                <!--                    <span class="inline-block" style="font-size: 14px;"><span class="font-red"-->
                <!--                                                                              style="visibility:hidden">*</span>经营范围：</span>-->
                <!--                    <el-input type="textarea" v-if="check" :autosize="{ minRows: 3, maxRows: 5}"-->
                <!--                              v-model="ruleForm.businessScope" placeholder="经营范围"-->
                <!--                              class="float-left inline-block left-margin-5 input-460"></el-input>-->
                <!--                    <span v-else class="inline-block left-margin-5"-->
                <!--                          style="font-size: 14px; width: 560px;flex:1;">{{ruleForm.businessScope}}</span>-->
                <!--                  </div>-->
                <!--                </el-row>-->

              </el-form>
            </div>
            <div style="width: 200px; height: 100px; position:absolute; top: 170px; right: 50px; z-index: 97"
                 v-if="ruleForm.companyPosition == 0">
              <img src="../../icons/enterprise/sea_customer.png"/>
            </div>
          </div>
        </el-card>


        <div class="projectApply" v-if="ruleForm.crmCompanyId">
          <el-card class="top-margin-10 projectApplyLeft">
            <div slot="header" class="headerTop">
              <span>项目申请情况</span>
            </div>
            <div class="projectHeartCont">
              <div class="heartLeft">
                <div class="applyProjectBox">
                  <div class="projectBoxTit">未报项目({{companyProjectDeclare.weiBaoNum}})</div>
                  <div class="projectBoxList">
                    <div class="projectBox" :class="item.active ? 'active' : ''" v-for="item in companyProjectDeclare.weiBaoList" @click="showProjectBrief(item,item.type)">{{item.projectName}}</div>
                    <p v-if="companyProjectDeclare.weiBaoList == ''">暂无项目</p>
                  </div>
                </div>
                <div class="applyProjectBox projectBlue">
                  <div class="projectBoxTit">在报项目({{companyProjectDeclare.zaiBaoNum}})</div>
                  <div class="projectBoxList">
                    <div class="projectBox" :class="item.active ? 'active' : ''" v-for="item in companyProjectDeclare.zaiBaoList" @click="showProjectBrief(item,item.type)">{{item.projectName}}</div>
                    <p v-if="companyProjectDeclare.zaiBaoList == ''">暂无项目</p>
                  </div>
                </div>
              </div>
              <div class="heartCenter">
                <div class="imgFlex">
                  <img src="@/views/icons/enterprise/red.png">
                  <img src="@/views/icons/enterprise/green.png">
                </div>
                <div class="projectContractCenter">
                  <h3>项目总概</h3>
                  <div class="projectTotal">
                    <span>未报:{{companyProjectDeclare.weiBaoNum}}</span>
                    <span>可报:{{companyProjectDeclare.keBaoNum}}</span>
                    <span>在报:{{companyProjectDeclare.zaiBaoNum}}</span>
                    <span>已报:{{companyProjectDeclare.yiBaoNum}}</span>
                  </div>
                </div>
                <div class="imgFlex">
                  <img src="@/views/icons/enterprise/blue.png" alt="">
                  <img src="@/views/icons/enterprise/orange.png" alt="">
                </div>
              </div>
              <div class="heartLeft">
                <div class="applyProjectBox projectGreen">
                  <div class="projectBoxTit">可报项目({{companyProjectDeclare.keBaoNum}})</div>
                  <div class="projectBoxList">
                    <div class="projectBox" :class="item.active ? 'active' : ''" v-for="item in companyProjectDeclare.keBaoList" @click="showProjectBrief(item,item.type)">{{item.projectName}}</div>
                    <p v-if="companyProjectDeclare.keBaoList == ''">暂无项目</p>
                  </div>
                </div>
                <div class="applyProjectBox projectOrange">
                  <div class="projectBoxTit">已报项目({{companyProjectDeclare.yiBaoNum}})</div>
                  <div class="projectBoxList">
                    <div class="projectBox" :class="item.active ? 'active' : ''" v-for="item in companyProjectDeclare.yiBaoList" @click="showProjectBrief(item,item.type)">{{item.projectName}}</div>
                    <p v-if="companyProjectDeclare.yiBaoList == ''">暂无项目</p>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <div class="projectApplyRig">
            <!--     未报       -->
            <div v-show="showType == 1 && brieform != ''">
              <el-card class="top-margin-10 applyRig">
                <div class="projectMsgCont">
                  <div class="projectMsgFirst">
                            <!--                    <div class="projectMsgLeft">-->
                            <!--                      <div id="echart4" class="care"></div>-->
                            <!--                    </div>-->
                    <div class="projectMsgRig">
                      <h3><span>未报</span> {{brieform.projectName}}</h3>
                      <div class="msgData">
                        <p>项目分类：<span style="color:#05AAFF;">{{brieform.projectTypeName}}</span></p>
                        <p>单价：<span style="color:#FF8585;">{{brieform.unitPrice < 1 ? brieform.unitPrice * 100 + '%' : brieform.unitPrice + '元'}}</span></p>
                        <p>订单流程：<span>{{brieform.flowName}}</span></p>
                      </div>
                    </div>
                  </div>
                  <div class="projectBtn">
                    <div class="projectGreenBtn" @click="openSetCanApply(brieform,1)">
                      <img src="@/views/icons/enterprise/canApply.png" alt="">
                      设为可报项目
                    </div>
                    <div class="projectOrangeBtn" @click="openSetCanApply(brieform,2)">
                      <img src="@/views/icons/enterprise/appled.png" alt="">
                      设为已报项目
                    </div>
                  </div>
                </div>
              </el-card>
              <el-card class="top-margin-10 policyCard">
                <div slot="header" class="headerTop">
                  <span>相关政策</span>
                </div>
                <div class="projectPolicyList">
                  <div class="projectPolicyBox" v-for="list of policyList">
                    <h3 @click="goPolicy(list.noticeId)"><span>{{list.noticeType == 1 ? '政策' : '通知'}}</span>{{list.noticeName}}</h3>
                    <div class="policyMsg">
                      <p class="policyLeft">补助金额：<span> {{list.subsidyPriceMin}}-{{list.subsidyPriceMax}}</span></p>
                      <p class="policyRig">
                        距申报截止<span>{{list.endToDays}}</span>天(进行中)
                      </p>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
            <!--     可报       -->
            <div v-show="showType == 2 && brieform != ''">
              <el-card class="top-margin-10 applyRig canApply">
                <div class="projectMsgCont">
                  <div class="projectMsgFirst">
                                  <!--                    <div class="projectMsgLeft">-->
                                  <!--                      <div id="echart3" class="care"></div>-->
                                  <!--                    </div>-->
                    <div class="projectMsgRig">
                      <h3><span>可报</span> {{brieform.projectName}}</h3>
                      <div class="msgData">
                        <p>项目分类：<span style="color:#05AAFF;">{{brieform.projectTypeName}}</span></p>
                        <p>单价：<span style="color:#FF8585;">{{brieform.unitPrice < 1 ? brieform.unitPrice * 100 + '%' : brieform.unitPrice + '元'}}</span></p>
                        <p>订单流程：<span>{{brieform.flowName}}</span></p>
                      </div>
                    </div>
                  </div>
                  <div class="projectBtn">
                    <div class="projectOrangeBtn" @click="openSetCanApply(brieform,2)">
                      <img src="@/views/icons/enterprise/appled.png" alt="">
                      设为已报项目
                    </div>
                  </div>
                </div>
              </el-card>
              <el-card class="top-margin-10 policyCard">
                <div slot="header" class="headerTop">
                  <span>相关政策</span>
                </div>
                <div class="projectPolicyList">
                  <div class="projectPolicyBox" v-for="list of policyList">
                    <h3 @click="goPolicy(list.noticeId)"><span>{{list.noticeType == 1 ? '政策' : '通知'}}</span>{{list.noticeName}}</h3>
                    <div class="policyMsg">
                      <p class="policyLeft">补助金额：<span> {{list.subsidyPriceMin}}-{{list.subsidyPriceMax}}</span></p>
                      <p class="policyRig">
                        距申报截止<span>{{list.endToDays}}</span>天(进行中)
                      </p>
                    </div>
                    <div class="projectBtn" v-if="list.hasMatch == 1">
                      <div class="projectRedBtn" @click="openGetScore(list.noticeId)">
                        <img src="@/views/icons/enterprise/notApply.png" alt="">
                        查看得分情况
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
            <!--     已报       -->
            <div v-show="showType == 4 && brieform != ''">
              <el-card class="top-margin-10 applyRig applEd">
                <div class="projectMsgCont">
                  <div class="projectMsgFirst">
                          <!--                    <div class="projectMsgLeft">-->
                          <!--                      <div id="echart2" class="care"></div>-->
                          <!--                    </div>-->
                    <div class="projectMsgRig">
                      <h3><span>已报</span> {{brieform.projectName}}</h3>
                    </div>
                  </div>
                  <div class="approvalList">
                    <p>立项时间：<span>{{approvalMsg && approvalMsg.approvalDate ? approvalMsg.approvalDate : ''}}</span></p>
                    <p>年份：<span>{{approvalMsg && approvalMsg.projectYear ? approvalMsg.projectYear : ''}}</span></p>
                    <p>
                      批次：
                      <span v-if="approvalMsg.projectBatchNo == 0"> 未指定 </span>
                      <span v-else-if="approvalMsg.projectBatchNo > 0"> 第{{approvalMsg.projectBatchNo}} 批</span>
                      <span v-else> - </span>
                    </p>
                    <p>批准金额：<span>{{approvalMsg && approvalMsg.approvalMoney ? approvalMsg.approvalMoney + '元' : ''}}</span></p>
                    <p v-if="!approvalMsg.titleSeries">
                      级别：
                      <span>
                        {{approvalMsg && approvalMsg.projectLevel == 1 ? '国家级' :
                          approvalMsg && approvalMsg.projectLevel == 2 ? '省级' :
                          approvalMsg && approvalMsg.projectLevel == 3 ? '市级' :
                          approvalMsg && approvalMsg.projectLevel == 4 ? '区县级' :
                          approvalMsg && approvalMsg.projectLevel == 5 ? '镇街级' :''
                        }}
                      </span>
                    </p>
                    <p v-if="approvalMsg.titleSeries">
                      职称系列：
                      <span>{{approvalMsg.titleSeriesName}}</span>
                    </p>
                    <p v-if="approvalMsg.titleSeries">
                      职称级别：
                      <span>{{approvalMsg.titleLevelName}}</span>
                    </p>
                    <p>业务员：<span>{{approvalMsg ? approvalMsg.signUserName : ''}}</span></p>
                    <p v-if="approvalMsg.workAllocationInfoVo">工程师：
                      <span v-for="list in approvalMsg.workAllocationInfoVo.allAllocationUserList">{{list.userName}}</span>
                    </p>
                  </div>
                </div>
              </el-card>
            </div>

            <!--     在报       -->
            <div v-show="showType == 3 && brieform != ''">
              <el-card class="top-margin-10 applyRig appling">
                <div class="projectMsgCont">
                    <div class="projectMsgFirst">
                                <!--                    <div class="projectMsgLeft">-->
                                <!--                      <div id="echart1" class="care"></div>-->
                                <!--                    </div>-->
                    <div class="projectMsgRig">
                      <h3><span>可报</span> {{brieform.projectName}}</h3>
                      <div class="msgData">
                        <p>项目分类：<span style="color:#05AAFF;">{{brieform.projectTypeName}}</span></p>
                        <p>单价：<span style="color:#FF8585;">{{brieform.unitPrice < 1 ? brieform.unitPrice * 100 + '%' : brieform.unitPrice + '元'}}</span></p>
                        <p>订单流程：<span>{{brieform.flowName}}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
              <el-card class="top-margin-10 processCard">
                <div slot="header" class="headerTop">
                  <span>项目进度</span>
                </div>
                <div class="projectProcessList">
                  <el-select v-model="processWorkId" size="small" placeholder="请选择" style="margin-bottom:10px;"
                             @change="changeProcessUser">
                    <el-option
                      v-for="item in userFlowList"
                      :key="item.userName"
                      :label="item.userName"
                      :value="item.workId">
                    </el-option>
                  </el-select>
                  <div class="firstProcessBox">
                    <img src="@/views/icons/enterprise/proceStartIcon.png" alt="">
                    <span>{{processForm.userName}}</span>
                    <p>分配时间：{{processForm.signTime}}</p>
                  </div>
                  <div class="processBox"
                       :class="!item.signTime ? '' :item.recheckResult == 1 ? 'processBoxOrange' :item.checkResult == 2 || item.recheckResult == 2 ? 'processBoxRed' : item.signTime && !item.sendTime ? 'processBoxBlue' : item.signTime && item.sendTime=='进行中...' ?  'processBoxBlue' :item.signTime && item.sendTime ? 'processBoxOrange' : ''"
                       v-for="item in processForm.orderProcessVoList">
                    <div class="processHeader">
                      <div class="processName">{{item.nodeName}}</div>
                      <div class="processMsg">
                        <!--                        <p>计划完成时间：<span>{{item.realityStopTime}}</span></p>-->
                        <p class="flex-column">
                          <span>实际完成时间：</span>
                          <!-- :class="item.sendTime=='进行中...'?'ongoing':''" -->
                          <span>{{item.sendTime}}</span>
                        </p>
                        <!--                        <p>实际完成时间：<span>{{item.sendTime}}</span></p>-->
                        <p v-if="item.checkComment && item.opinion == 1">意见：<span>{{item.checkComment}}</span></p>
                        <p v-if="(item.accessory == 1 || item.isMustUploadAccessory == 1) && item.fileIds">
                          附件：
                          <span v-for="file in item.fileList" @click="downloadFile(file)">{{file.fileName +  '.' + file.fileType}}</span>
                          <i class="el-icon-download"></i>
                        </p>
                      </div>
                    </div>
                    <div class="processResult"
                         v-if="(item.needCheck == 1 || item.needRecheck != 0) && (item.checkResult || item.recheckResult)">
                      <p v-if="item.needCheck == 1 && item.checkResult">
                        <el-icon class="el-icon-success" v-if="item.checkResult == 1"></el-icon>
                        <el-icon class="el-icon-circle-close" v-if="item.checkResult == 2"></el-icon>
                        <span>初审结果：{{item.checkResult == 0 ? '未审' : item.checkResult == 1 ? '已审通过' : item.checkResult == 2 ? '已审不通过' : ''}}</span>
                      </p>
                      <p v-if="item.needRecheck != 0 && (item.recheckResult && item.recheckResult != 0)">
                        <el-icon class="el-icon-success" v-if="item.recheckResult == 1"></el-icon>
                        <el-icon class="el-icon-circle-close" v-if="item.recheckResult == 2"></el-icon>
                        <span>复审结果：{{item.recheckResult == 0 ? '未审' : item.recheckResult == 1 ? '已审通过' : item.recheckResult == 2 ? '已审不通过' : ''}}</span>
                      </p>
                    </div>
                    <img class="nextJian" src="@/views/icons/enterprise/companyProcessNext.png" alt="">
                  </div>
                  <div class="endProcessBox"
                       :class="processForm.lastFlow && processForm.lastFlow[0].signTime && processForm.lastFlow[0].sendTime ? 'endProcessSuccessBox' : ''">
                    <img src="@/views/icons/enterprise/compProcessEndIconOn.png"
                         v-if="processForm.lastFlow && processForm.lastFlow[0].signTime && processForm.lastFlow[0].sendTime">
                    <img src="@/views/icons/enterprise/compProcessEndIconIn.png" v-else>
                    <span>结束</span>
                  </div>
                </div>
              </el-card>
            </div>

            <el-card class="top-margin-10" v-if="brieform == ''">
              <p style="text-align: center;">暂无数据</p>
            </el-card>
          </div>
        </div>

        <el-card class="top-margin-10" style="overflow: inherit;">
          <el-tabs type="border-card" class="customer-tabs" v-model="activeName" @tab-click="handleTabClick"
                   style="font-size: 14px;">

            <!--基本信息-->
            <el-tab-pane :label="customer_news" name="seventeen" >
              <div class="edit-ruleForm-tab" style="width: 100%">
                <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :inline="true">

                  <!--法人代表 + 统一社会信用代码-->
                  <el-row>
                    <div class="float-left inline-block top-margin-10"
                         style="width: 50%;display:flex;white-space: nowrap;">
                    <span class="float-left inline-block span-input"><span class="font-red"
                                                                           style="visibility:hidden">*</span>法人代表：</span>
                      <el-input size="mini" v-if="check" v-model.trim="ruleForm.companyLeader" placeholder="法人代表"
                                maxlength="20"
                                class="float-left inline-block left-margin-5 input-180"></el-input>
                      <span v-else
                            class="float-left inline-block left-margin-5 span-input">{{ruleForm.companyLeader}}</span>
                    </div>
                    <div class="float-left inline-block top-margin-10 width-0-6"
                         style="width: 50%;display: flex;white-space: nowrap;">
                      <span class="float-left inline-block span-input"><span class="font-red">*</span>统一社会信用代码：</span>
                      <el-input size="mini" v-if="check" maxlength="30" v-model.trim="ruleForm.companyCode"
                                placeholder="统一社会信用代码"
                                class="float-left inline-block left-margin-5 input-180 unified-code"></el-input>
                      <span v-else
                            class="float-left inline-block left-margin-5 span-input">{{ruleForm.companyCode}}</span>
                    </div>
                  </el-row>

                  <!--成立时间 + 年销售额-->
                  <el-row>
                    <div class="float-left inline-block top-margin-10 width-0-5"
                         style="display: flex;white-space: nowrap;">
                      <span class="float-left inline-block span-input"><span class="font-red">*</span>成立时间：</span>
                      <el-date-picker v-if="check" size="mini" v-model="ruleForm.setupDate"
                                      class="float-left inline-block left-margin-5 input-180" type="date"
                                      value-format="yyyy-MM-dd" placeholder="成立时间"></el-date-picker>
                      <span v-else
                            class="float-left inline-block left-margin-5 span-input">{{ruleForm.setupDate}}</span>
                    </div>
                    <div class="float-left inline-block top-margin-10 width-0-5">
                      <span class="float-left inline-block span-input"><span class="font-red">*</span>年销售额：</span>
                      <div v-if="check">
                        <el-select size="mini" v-model="ruleForm.companySalesName" placeholder="年销售额"
                                   @change="companySaleChange"
                                   class="float-left inline-block left-margin-5 input-120">
                          <el-option v-for="item in enterprise_annual_sales_list" :key="item.value"
                                     :label="item.value"
                                     :value="item.value"></el-option>
                        </el-select>
                      </div>
                      <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.companySalesName}}</span>
                    </div>
                  </el-row>

                  <!--注册资本 + 实缴资本-->
                  <el-row>
                    <div class="float-left inline-block top-margin-10 width-0-5">
                      <span class="float-left inline-block span-input"><span class="font-red">*</span>注册资本(万元)：</span>
                      <el-input size="mini" type="number" v-if="check" v-model="ruleForm.registerMoney"
                                @input.native="inputXz" oninput="if(value>100000)value=100000"
                                placeholder="注册资本" class="float-left inline-block left-margin-5 input-120"></el-input>
                      <span v-else
                            class="float-left inline-block left-margin-5 span-input">{{ruleForm.registerMoney}}万元</span>
                    </div>
                    <div class="float-left inline-block top-margin-10 width-0-5">
                      <span class="float-left inline-block span-input">实缴资本(万元)：</span>
                      <el-input size="mini" type="number" v-if="check" v-model="ruleForm.realityCmoney"
                                @input.native="inputXz" oninput="if(value && value>100000)value=100000"
                                placeholder="实缴资本" class="float-left inline-block left-margin-5 input-120"></el-input>
                      <span v-else
                            class="float-left inline-block left-margin-5 span-input">{{ruleForm.realityCmoney}}万元</span>
                    </div>
                  </el-row>

                  <!--员工规模 + 企业类型-->
                  <el-row>
                    <div class="float-left inline-block top-margin-10 width-0-5">
                    <span class="float-left inline-block span-input"><span class="font-red"
                                                                           style="visibility:hidden">*</span>员工规模：</span>
                      <span v-if="check">
                      <el-select size="mini" v-model="ruleForm.personnelScale" placeholder="员工规模"
                                 class="float-left inline-block left-margin-5 input-120">
                        <el-option v-for="item in employee_scale_list" :key="item.dictId" :label="item.dictName"
                                   :value="item.dictId" :disabled="!check"> </el-option>
                      </el-select>
                    </span>
                      <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.personnelScaleName}}</span>
                    </div>
                    <div class="float-left inline-block top-margin-10 width-0-5">
                      <span class="float-left inline-block span-input"><span class="font-red">*</span>企业类型：</span>
                      <el-select size="mini" v-model="ruleForm.companyClass" placeholder="企业类型" v-if="check"
                                 class="register-status float-left inline-block left-margin-5 input-180">
                        <el-option v-for="item in companyTypeList" :key="item.dictId" :label="item.dictName"
                                   :value="item.dictId"></el-option>
                      </el-select>
                      <span v-else
                            class="float-left inline-block left-margin-5 span-input">{{ruleForm.companyClassName}}</span>
                    </div>
                  </el-row>

                  <!--官网-->
                  <el-row>
                    <div class="float-left inline-block top-margin-10 width-0-5">
                    <span class="float-left inline-block span-input"><span class="font-red"
                                                                           style="visibility:hidden">*</span>官网：</span>
                      <el-input size="mini" v-if="check" v-model.trim="ruleForm.officialWebsite" placeholder="官网"
                                maxlength="50"
                                class="float-left inline-block left-margin-5 input-180"></el-input>
                      <span v-else
                            class="float-left inline-block left-margin-5 span-input">{{ruleForm.officialWebsite}}</span>
                    </div>
                  </el-row>

                  <!--公司地址-->
                  <el-row>
                    <div class="float-left inline-block top-margin-10">
                    <span class="float-left inline-block span-input"><span class="font-red">*</span>公司地址：</span>
                      <div v-if="check" style="display: inline-block">
                        <el-select size="mini" class="float-left inline-block left-margin-5 input-90"
                                   v-model="ruleForm.provinceId" :clearable="true" placeholder="省"
                                   @change="changeProvince">
                          <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                                     :value="item.dictId"></el-option>
                        </el-select>
                        <el-select size="mini" class="float-left inline-block left-margin-5 input-100"
                                   v-model="ruleForm.cityId" :clearable="true" placeholder="市" @change="changeCity">
                          <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                                     :value="item.dictId"></el-option>
                        </el-select>
                        <el-select size="mini" class="float-left inline-block left-margin-5 input-100"
                                   v-model="ruleForm.districtId" :clearable="true" placeholder="区"
                                   @change="changeDistrict">
                          <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                                     :value="item.dictId"></el-option>
                        </el-select>
                        <el-select size="mini" class="float-left inline-block left-margin-5 input-100"
                                   v-model="ruleForm.townId" :clearable="true" placeholder="镇" @change="changeTowns">
                          <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                                     :value="item.dictId"></el-option>
                        </el-select>
                        <el-input size="mini" v-model="ruleForm.companyAddress" placeholder="详细地址"
                                  class="float-left inline-block left-margin-5 input-200"></el-input>
                      </div>
                      <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.provinceName}}{{ruleForm.cityName}}{{ruleForm.districtName}}{{ruleForm.townName}}{{ruleForm.companyAddress}}</span>
                    </div>
                  </el-row>

                  <!--所属行业-->
                  <el-row>
                    <div class="float-left inline-block top-margin-10 width-0-6">
                    <span class="float-left inline-block span-input"><span class="font-red"
                                                                           style="visibility:hidden">*</span>所属行业：</span>
                      <div v-if="check" style="display: inline-block">
                        <el-select size="mini" v-model="ruleForm.industryInvolved" placeholder="所属行业"
                                   class="input-color-blue float-left inline-block left-margin-5 input-360">
                          <el-option v-for="item in industry_involved_list" :key="item.dictId" :label="item.dictName"
                                     :value="item.dictId"></el-option>
                        </el-select>
                      </div>
                      <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.industryInvolvedName}}</span>
                    </div>
                  </el-row>

                  <!--主营产品-->
                  <el-row>
                    <div class="top-margin-10 width-0-6" style="display: flex;">
                      <span class="inline-block" style="font-size: 14px;"><span class="font-red">*</span>主营产品：</span>
                      <el-input size="mini" v-if="check" v-model.trim="ruleForm.mainProducts" placeholder="主营产品"
                                maxlength="100"
                                class="input-color-blue float-left inline-block left-margin-5 input-360"></el-input>
                      <span v-else class="inline-block left-margin-5" style="font-size: 14px;flex:1;">{{ruleForm.mainProducts}}</span>
                    </div>
                  </el-row>

                  <!--经营范围-->
                  <el-row>
                    <div class="inline-block top-margin-10 width-0-6" style="display: flex;">
                      <span class="inline-block" style="font-size: 14px;"><span class="font-red"
                                                                                style="visibility:hidden">*</span>经营范围：</span>
                      <el-input type="textarea" v-if="check" :autosize="{ minRows: 3, maxRows: 5}"
                                v-model="ruleForm.businessScope" placeholder="经营范围"
                                class="float-left inline-block left-margin-5 input-460"></el-input>
                      <span v-else class="inline-block left-margin-5"
                            style="font-size: 14px; width: 560px;flex:1;">{{ruleForm.businessScope}}</span>
                    </div>
                  </el-row>

                  <!--客户简介-->
                  <el-row>
                    <div class="inline-block top-margin-10 width-0-6" style="display: flex;">
                      <span class="inline-block" style="font-size: 14px;white-space: nowrap;"><span class="font-red" style="visibility:hidden">*</span>客户简介：</span>
                      <span v-if="!check && !ruleForm.companyContent">暂无简介</span>
                      <el-input class="float-left inline-block left-margin-5 input-460" v-if="check" type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                v-model="ruleForm.companyContent"></el-input>
                      <span v-else>{{ruleForm.companyContent}}</span>
                    </div>
                  </el-row>

                  <!--人员统计-->
                  <div class="inline-block" style="margin-top: 30px;width: 100%;">
                    <div
                      style="font-size: 14px;white-space: nowrap; border-bottom: 1px solid #ccc;padding-bottom: 5px;">
                      <span class="font-red" style="visibility:hidden">*</span>
                      人员统计
                    </div>
                    <div class="list-detail">
                      <table>
                        <tr>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              参保人数：
                              <span v-if="!check">{{ruleForm.socialSecurityNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.socialSecurityNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="参保人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              科技人数：
                              <span v-if="!check">{{ruleForm.technologyNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.technologyNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="科技人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              大专以上人数：
                              <span v-if="!check">{{ruleForm.collegeNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.collegeNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="大专以上人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              本科以上人数：
                              <span v-if="!check">{{ruleForm.universityNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.universityNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="本科以上人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="td-item">
                              <!--                              <span class="xin">*</span>-->
                              硕士以上人数：
                              <span v-if="!check">{{ruleForm.masterNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.masterNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="硕士以上人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              博士以上人数：
                              <span v-if="!check">{{ruleForm.doctorNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.doctorNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="博士以上人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              初级职称人数：
                              <span v-if="!check">{{ruleForm.lowLevelNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.lowLevelNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="初级职称人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              中级职称人数：
                              <span v-if="!check">{{ruleForm.midLevelNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.midLevelNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="中级职称人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                          <td>
                            <div class="td-item">
                              <!--                            <span class="xin">*</span>-->
                              高级职称人数：
                              <span v-if="!check">{{ruleForm.highLevelNum|lengthFilter}}</span>
                              <el-input v-else
                                        v-model="ruleForm.highLevelNum"
                                        min="0"
                                        type="number"
                                        class="num-input"
                                        placeholder="高级职称人数"
                                        oninput="if(value.length>9)value=value.slice(0,9)"
                                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                              />
                            </div>
                          </td>
                        </tr>
                      </table>

                    </div>
                  </div>

                </el-form>
              </div>
            </el-tab-pane>

            <!--联系人-->
            <el-tab-pane :label="contacts_people" name="sixteen" v-if="ruleForm.crmCompanyId">
              <span>搜索到 <b style="color:red;">{{contactsUserTotal}}</b> 条记录</span>
              <el-button class="add-contact-user" @click="addEditContactHandle(false)" v-if="contactsUserAdd.twoAllow">
                新增
              </el-button>
              <el-button class="add-contact-user" @click="exportContactList">导出</el-button>
              <el-table
                :data="contactsUserData"
                border
                style="width: 100%"
                v-show="activeName === 'sixteen'"
              >
                <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                <el-table-column prop="date" label="类别">
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.personnelType ==0?'普通人员':scope.row.personnelType ==1?'法人':scope.row.personnelType ==2?'主要人员':scope.row.personnelType ==3?'业务联系人':scope.row.personnelType ==4?'技术人员':scope.row.personnelType ==5?'项目负责人':'-'}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="personnelName" label="姓名"></el-table-column>
                <el-table-column prop="personnelMobile" label="电话"></el-table-column>
                <el-table-column prop="personnelRemarks" label="备注"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span v-if="contactsUserEdit.twoAllow" @click="addEditContactHandle(true,scope.row)"
                          style="margin-right: 10px;cursor: pointer;color:#03ADF4;">编辑</span>
                    <span v-if="contactsUserDel.twoAllow" @click="delContanctHandle(scope.row)"
                          style="cursor: pointer;color: red;">删除</span>
                  </template>
                </el-table-column>
              </el-table>
              <!--加载更多-->
              <div class="get-more" v-if="contactsUserData.length >= contactsUserTotal">
                没有更多
              </div>
              <div class="get-more" @click="contactUserGetMore" v-else>
                加载更多
              </div>
            </el-tab-pane>

            <!--订单-->
            <el-tab-pane name="second" :label="order_name + '(' + orderTotal + ')'" v-if="allowDetailOrder.twoAllow && ruleForm.crmCompanyId">
              <el-button type="primary" class="btn export" size="small" @click="handleExport">导出</el-button>
              <div class="top-margin-10" style="background-color: #EFFAFF;" v-if="orderList.length > 0">
                <div style="width: 100%; color: #444444;padding: 10px;padding-bottom: 0;">
                  <div v-for="(item, index) in orderList"
                       style="display: flex;justify-content: space-between;align-items: flex-start;margin-bottom: 10px;">
                   <span class="float-left inline-block text-align-center"
                         style="display:flex;justify-content:center;align-items:center;margin-top:-2px;min-width:20px;width: 20px;height: 20px; background: #FE95B2; border-radius: 50% / 50%; color: #ffffff;margin-right: 4px;">
                      {{ index + 1 }}
                    </span>
                    <div style="display: flex;align-items: center;flex-wrap: wrap;width: 94%;">
                      <span class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10" style="display: flex;align-items: center;min-width: 20%;">
                        <span class="float-left" style="white-space: nowrap">项目：</span>
                        <span class="float-left hover_cursor" style="color: #05AAFF;flex:1;text-overflow: ellipsis;overflow: hidden;white-space: nowrap" :title="item.projectName" @click="toProject(item.projectId)">
                          {{item.projectName}}
                        </span>
                      </span>
                      <span v-if="item.projectType != 822466810090618880" class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10" style="min-width: 10%;">
                        申报级别：<span>{{item.applyLevel == 1 ? '国家级' : item.applyLevel == 2 ? '省级' : item.applyLevel == 3 ? '市级' : item.applyLevel == 4 ? '区县级' : item.applyLevel == 5 ? '镇街级' : '-'}}</span>
                      </span>
                      <span v-if="item.projectType == 822466810090618880" class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10" style="min-width: 10%;">
                        职称系列：<span>{{item.titleSeriesName}}</span>
                      </span>
                      <span v-if="item.projectType == 822466810090618880" class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10" style="min-width: 10%;">
                        职称级别：<span>{{item.titleLevelName}}</span>
                      </span>
                      <span class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10" style="min-width: 10%;">
                        申报年份：<span>{{item.applyYear}}</span>
                      </span>
                      <span class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10"
                            style="min-width: 10%;">
                        签订人：<span>{{item.signUserName}}</span>
                      </span>

                      <span class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10"
                            style="min-width: 16%;">线上时间：
                        <span style="font-size: 10px;" v-if="item.onlineDate && item.onlineDateEnd">{{item.onlineDate + '-' + item.onlineDateEnd}}</span>
                        <span style="font-size: 10px;" v-else>-</span>
                      </span>
                      <span class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10"
                            style="min-width: 16%;">纸质时间：
                        <span style="font-size: 10px;" v-if="item.paperDateStart && item.paperDateEnd">{{item.paperDateStart + '-' + item.paperDateEnd}}</span>
                        <span style="font-size: 10px;" v-else>-</span>
                      </span>
                      <span class="inline-block overflow-x overflow-y bottom-margin-10 right-margin-10" style="min-width: 10%;">
                        进度与处理人：{{item.currentEngineerAndProcessName ? item.currentEngineerAndProcessName : '-'}}
                        <!--                        <i class="el-icon-edit" style="color: #FFA96A;cursor: pointer;" @click="handleState(item)"></i>-->
                      </span>
                      <span class="inline-block overflow-x overflow-y bottom-margin-10">
                        是否免费合同：{{item.contractType == 1 ? '是' : '否'}}
                      </span>
                    </div>
                    <span class="inline-block overflow-x overflow-y">
                    <span class="left-margin-5 hover_cursor" style="color: #5883FF;white-space: nowrap;"
                          @click="goOrderDetail(item.orderId)">查看</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="noMore" style="cursor: pointer" v-if="orderTotal - orderList.length > 0" @click="getMore(1)">
                点击加载更多
              </div>
              <div class="noMore" v-else>
                没有更多
              </div>
            </el-tab-pane>

            <!--合同-->
            <el-tab-pane name="three" :label="contract_name + '(' + contractTotal + ')'"
                         v-if="allowDetailContract.twoAllow && ruleForm.crmCompanyId">
              <div class="customerContract" v-if="activeName === 'three'">
                <el-button type="primary" class="btn export" size="small" @click="exportContractList">
                  导出
                </el-button>
                <div class="cusConLine"></div>
                <div class="cusContractList" v-for="item in contractList">
                  <div class="cusContractLeft">
                    <div class="cusContractMsg">
                      <span>合同编号：{{item.contractCode}}</span>
                      <span>创建时间：{{item.createTime}}</span>
                      <span>有效期：{{item.availableYear}}年</span>
                    </div>
                    <div class="cusContractMsg">
                      <span>签约公司：{{item.signCompanyId != 0 ?item.signCompanyName : '其他'}}</span>
                      <span>签订日期：{{item.signDate}}</span>
                      <span>签订人 ：{{item.signUserName}}</span>
                      <span>履行状态：
                        {{
                          item.contractState == -1 ? '已完成' :
                          item.contractState == 0 ? '履行中' :
                          item.contractState == 1 ? '解约' :
                          item.contractState == 2 ? '作废' :
                          item.contractState == 3 ? '终止' : '-'
                        }}
                      </span>
                    </div>
                    <div class="cusContractProject" v-if="item.innerProjectInfoVoList.length > 0">
                      <div class="curConProjectBox" v-for="(list,index) in item.innerProjectInfoVoList">
                        <span class="conProjectNum">{{index+1}}</span>
                        <div class="conProjectLeftRig">
                          <div class="conProjectLeft">
                            <div class="conProjectMsg">
                              <span>项目：<span @click="toProject(list.projectId)" :title="list.projectName">{{list.projectName}}</span></span>
                              <span>
                                {{list.unitPrice > 1?'金额：':'比例：'}}
                                  {{list.unitPrice > 1 ? list.unitPrice/10000 + '万元' : list.unitPrice < 1 ? parseFloat((list.unitPrice * 100).toPrecision(13)) + '%' : '-'}}
                              </span>
                              <span>开始日期：{{list.onlineDateStart ? list.onlineDateStart : '-'}}</span>
                              <span>截止日期：{{list.paperDateEnd ? list.paperDateEnd : '-'}}</span>
                            </div>
                            <div class="conProjectMsg">
                              <span>进度与处理人：{{list.currentEngineerAndProcessName ? list.currentEngineerAndProcessName : '-'}}</span>
                              <span>年份：{{list.applyYear}}</span>
                              <span v-if="list.projectType != 822466810090618880">级别：
                                {{
                                  list.applyLevel == 1 ? '国家' :
                                  list.applyLevel == 2 ? '省级' :
                                  list.applyLevel == 3 ? '市级' :
                                  list.applyLevel == 4 ? '区县级' :
                                  list.applyLevel == 5 ? '镇街级' : '-'
                                }}
                              </span>
                              <span  v-if="list.projectType == 822466810090618880">职称系列：{{list.titleSeriesName}}</span>
                              <span  v-if="list.projectType == 822466810090618880">职称级别：{{list.titleLevelName}}</span>
                              <span>数量：{{list.applyNum}}</span>
                            </div>
                          </div>
                          <div class="conProjectRig">
                            <span class="conProBtn" @click="goOrderDetail(list.orderId)">查看订单</span>
                            <!--                            <span class="conProBtn">计划回款</span>-->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cusContractRig">
                    <div class="cusContractBtn">
                      <el-button class="violet" size="mini" @click="goCheckContract(item.contractId)">查看</el-button>
                    </div>
                    <div class="cusContractBtn">
                      <el-button class="primary" size="mini" @click="goEditContract(item.contractId)">编辑</el-button>
                    </div>
                    <!--                    <div class="cusContractBtn"><el-button class="origin" size="mini">更新状态</el-button></div>-->
                  </div>
                  <img class="freeContract" v-if="item.contractType == 1"
                       src="@/views/icons/enterprise/freeContract.png">
                </div>
              </div>
              <div class="noMore" style="cursor: pointer" v-if="contractTotal - contractList.length > 0"
                   @click="getMore(0)">
                点击加载更多
              </div>
              <div class="noMore" v-else>
                没有更多
              </div>
            </el-tab-pane>

            <!--沟通-->
            <el-tab-pane name="four" :label="content_name" v-if="ruleForm.crmCompanyId">
              <char-window :id="ruleForm.crmCompanyId" v-show="activeName === 'four'"></char-window>
            </el-tab-pane>

            <!--可申报-->
            <!--            <el-tab-pane ref="five" :label="can_apply_name">-->
            <!--              <CanApplyProject :id="ruleForm.crmCompanyId" v-if="activeName === 'five'"></CanApplyProject>-->
            <!--            </el-tab-pane>-->

            <!--知识产权-->
            <el-tab-pane name="six" v-if="ruleForm.crmCompanyId" :label="`${intellectual_name}(${patentTotal+trademarkTotal+copyrightTotal+certTotal})`">

              <ul class="ulIntellectual">
                <li @click="colorChange(1)" :class="changeColor==1?'changeColor':''" >专利({{patentTotal}}) </li>
                <li @click="colorChange(2)" :class="changeColor==2?'changeColor':''" > 商标({{trademarkTotal}})</li>
                <li @click="colorChange(3)" :class="changeColor==3?'changeColor':''" >著作权({{copyrightTotal}})</li>
                <li @click="colorChange(4)" :class="changeColor==4?'changeColor':''" >证书({{certTotal}})</li>
              </ul>


              <IprPatentList
                ref="patent"
                :id="ruleForm.crmCompanyId"
                :companyNames="ruleForm.companyName"
                :powerEdit="powerEdit"
                @patentTotal="getPatentTotal"
                v-show="changeColor == 1"
              ></IprPatentList>

              <IprTrademarkList
                @trademarkTotal="getTrademarkTotal"
                :id="ruleForm.crmCompanyId"
                :companyNames="ruleForm.companyName"
                :powerEdit="powerEdit"
                v-show="changeColor == 2"
                ref="trademark"
              />

              <IprCopyrightList
                @copyrightTotal="getCopyrightTotal"
                :id="ruleForm.crmCompanyId"
                :companyNames="ruleForm.companyName"
                v-show="changeColor == 3"
                :powerEdit="powerEdit"
                ref="copyright"
              />

              <IprCertList
                @certificateTotal="getCertificateTotal"
                :id="ruleForm.crmCompanyId"
                :companyNames="ruleForm.companyName"
                :powerEdit="powerEdit"
                v-show="changeColor == 4"
                ref="certificate"
              />
            </el-tab-pane>



            <!--销售跟进 sales_name -->
            <el-tab-pane name="seven" v-if="ruleForm.crmCompanyId" :label="`${sales_name}(${salesTotal})`">
              <SalesList
                ref="sales"
                :companyNames="ruleForm.companyName"
                @salesTotal="getSalesTotal"
                :crmCompanyId="ruleForm.crmCompanyId"
                v-show="activeName === 'seven'"
              ></SalesList>
            </el-tab-pane>


            <!--账号-->
            <el-tab-pane name="ten" :label="`${account_name}(${accountTotal})`" v-if="allowDetailWebList.twoAllow && ruleForm.crmCompanyId">
              <ApplyAccountList
                @accountTotal="getAccountTotal"
                :id="ruleForm.crmCompanyId"
                v-show="activeName === 'ten'"
                ref="account"
              />
            </el-tab-pane>
            <!--项目规划-->
            <el-tab-pane name="eleven" :label="`${projectPlan_name}(${projectPlanTotal})`"
                         v-if="allowGetProjectplanList.twoAllow && ruleForm.crmCompanyId">
              <!--              @accountTotal="getAccountTotal"-->
              <ProjectPlanList
                @projectPlanTotal="getProjectPlanTotal"
                :id="ruleForm.crmCompanyId"
                v-show="activeName === 'eleven'"
                ref="projectPlan"
              />
            </el-tab-pane>

            <!--立项-->
            <el-tab-pane name="first" :label="maintenance_name + '(' + mainTotal + ')'"
                         v-if="allowDetailApproval.twoAllow && ruleForm.crmCompanyId">
              <div class="approvalContent">
                <div class="approvalTit">
                  <span style="color: #03ADF4; font-weight: bold;">|</span>
                  <span>搜索到{{mainTotal}}条记录</span>
                  <el-button type="primary" class="btn allChoose" size="small" @click="allApprovalSelect">全选</el-button>
                  <el-button type="primary" class="btn allChoose" size="small" v-if="powerEdit"
                             @click="openAddApproval">新增
                  </el-button>
                  <el-button type="primary" class="btn allChoose" size="small" v-if="powerEdit"
                             @click="exportApproval">导出
                  </el-button>
                  <el-button type="primary" class="btn allDelete" size="small" v-if="powerEdit"
                             @click="batchDeleteApproval">删除
                  </el-button>
                </div>
                <div class="cusConLine"></div>
                <div class="approvalList" v-if="maintenanceList.length > 0">
                  <el-checkbox-group v-model="approvalCheckList">
                    <div class="approvalBox" v-for="(item, index) in maintenanceList">
                      <el-checkbox :label="item.approvalId" style="width: 100%" @change="checkApprovalChange($event, item)">
                        <div class="approvalBoxData">
                          <div class="approvalBoxLeft">
                            <div class="approvalTitle">立项</div>
                            <div class="approvalData">
                              <p>项目： <span @click="toProject(item.projectId)" :title="item.projectName">{{item.projectName === '' ?'无':item.projectName}}</span>
                              </p>
                              <p>级别：{{item.projectLevel == 1 ? '国家级' : item.projectLevel == 2 ? '省级' : item.projectLevel
                                == 3 ? '市级' : item.projectLevel == 4 ? '区县级' : item.projectLevel == 5 ? '镇街级' :
                                '-'}}</p>
                              <p>数量：{{!item.projectNum ?'无':item.projectNum}}</p>
                              <p>年份：{{!item.projectYear ? '无' :item.projectYear}}</p>
                              <p>批次：
                                <span v-if="item.projectBatchNo == 0"> 未指定 </span>
                                <span v-if="item.projectBatchNo > 0"> 第{{item.projectBatchNo}} 批 </span>
                                <span v-else> - </span>
                              </p>
                              <p>业务员：{{!item.businessManagerName ? '无':item.businessManagerName}}</p>
                              <p style="width: 15%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"
                                 :title="item.engineerUserName">工程师：{{item.engineerUserName === '' ?'无'
                                :item.engineerUserName}}</p>
                            </div>
                          </div>
                          <div class="approvalBoxRig">
                            <el-button type="primary" class="btn dataCheck" size="small"
                                       @click="goApprovalDetail(item.approvalId)">查看
                            </el-button>
                          </div>
                        </div>
                      </el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
                <div class="noMore" style="cursor: pointer" v-if="mainTotal - maintenanceList.length > 0"
                     @click="getMore(2)">
                  点击加载更多
                </div>
                <div class="noMore" v-else>
                  没有更多
                </div>
              </div>
            </el-tab-pane>

            <!--客户资料-->
            <el-tab-pane name="fifteen" :label="'客户资料'" v-if="ruleForm.crmCompanyId">
              <customerDetailList
                :id="ruleForm.crmCompanyId"
                :companyNames="ruleForm.companyName"
                :provinceId="ruleForm.provinceId"
                :cityId="ruleForm.cityId"
                :districtId="ruleForm.districtId"
                :townId="ruleForm.townId"
                v-show="activeName === 'fifteen'"
                ref="customerDetail"></customerDetailList>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>

      <el-card class="top-margin-10">
        <div class="center-items">
          <el-button size="large" class="filter-item bg_pale_blue" v-if="!ruleForm.crmCompanyId" @click="saveForm">确定</el-button>
          <el-button size="large" class="filter-item bg_pale_blue" v-if="check && ruleForm.crmCompanyId && allowUpdate.twoAllow" @click="editForm">修改</el-button>
          <el-button size="large" class="filter-item bg_pale_blue left-margin-50" @click="cancel">取消</el-button>
        </div>
      </el-card>
    </el-row>


    <!-- 关联业务员 -->
    <el-dialog title="设置业务员" :visible.sync="dialogVisible" width="30%" v-dialogDrag>
      <p style="margin-bottom: 10px;">企业名字：{{batchChangeFrom.companyName}}</p>
      <p style="margin-bottom: 10px;">当前业务员：{{batchChangeFrom.traceSalesManName}}</p>
      <el-select clearable style="width: 100%" class="filter-item" filterable multiple
                 v-model="batchChangeFrom.userId" placeholder="员工筛选">
        <el-option v-for="item in personList" :key="item.userId"
                   :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="relReviewer(0)" v-preventReClick>确 定</el-button>
      </span>
    </el-dialog>
    <!--关联审计人员-->
    <el-dialog title="设置审计人员" :visible.sync="auditDialogVisible" width="30%" v-dialogDrag>
      <p style="margin-bottom: 10px;">企业名字：{{batchChangeFrom.companyName}}</p>
      <p style="margin-bottom: 10px;">当前审计人员：{{batchChangeFrom.auditMan}}</p>
      <el-select clearable class="filter-item" filterable v-model="batchChangeFrom.userId" placeholder="员工筛选">
        <el-option v-for="item in personList" :key="item.userId" :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="auditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="relAuditor(3)" v-preventReClick>确 定</el-button>
      </span>
    </el-dialog>
    <!--关联项目人员-->
    <el-dialog title="设置项目人员" :visible.sync="projectDialogVisible" width="30%" v-dialogDrag>
      <p style="margin-bottom: 10px;">企业名字：{{batchChangeFrom.companyName}}</p>
      <p style="margin-bottom: 10px;">当前项目人员：{{batchChangeFrom.projectMan}}</p>
      <el-select clearable class="filter-item" filterable v-model="batchChangeFrom.userId"
                 placeholder="员工筛选">
        <el-option v-for="item in personList" :key="item.userId" :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="projectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="relProject(1)" v-preventReClick>确 定</el-button>
      </span>
    </el-dialog>
    <!--关联知识产权工程师-->
    <el-dialog title="设置专利员" :visible.sync="intellectualDialogVisible" width="30%" v-dialogDrag>
      <p style="margin-bottom: 10px;">企业名字：{{batchChangeFrom.companyName}}</p>
      <p style="margin-bottom: 10px;">当前知识产权工程师：{{batchChangeFrom.propertyMan}}</p>
      <el-select clearable class="filter-item" filterable v-model="batchChangeFrom.userId"
                 placeholder="员工筛选">
        <el-option v-for="item in personList" :key="item.userId" :value="item.userId"
                   :label="item.userName+'_'+item.deptName+'-'+item.roleName">
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="intellectualDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="relIntellectual(2)" v-preventReClick>确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改默认工时 -->
    <el-dialog title="修改默认工时" :visible.sync="hourDialogVisible" width="30%" v-dialogDrag>
      <el-form :rules="hourRules" ref="hourForm" :model="hourForm" class="demo-form-inline">
        <el-form-item label="每天工作时间">
          <el-input type="number" style="width: 25%" step="0.5" max="24" v-model="hourForm.work_hour"
                    placeholder="工作时间"></el-input>
          小时
        </el-form-item>
        <el-form-item label="工作时间类型">
          <el-radio-group v-model="hourForm.work_time_type">
            <el-radio :label="1">单休</el-radio>
            <el-radio :label="2">大小周</el-radio>
            <el-radio :label="3">双休</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hourDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveHourForm('hourForm')" v-preventReClick>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="指派工程师" :visible.sync="changeVisible" v-dialogDrag>
      <el-form :model="batchChangeFrom" ref="batchChangeFrom">
        <el-divider content-position="center">指派工程师</el-divider>
        <el-row>
          <el-col :span="18">
            <el-form-item label="指派项目工程师" label-width="200px">
              <el-select v-model="batchChangeFrom.assignUserId" placeholder="请选择" filterable>
                <el-option v-for="item in personList" :key="item.userId" :label="item.userName"
                           :value="item.userId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveProjectUser(1)" v-preventReClick>确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新状态" :visible.sync="visible" v-dialogDrag>
      <el-form :model="stateForm" ref="stateForm">
        <el-divider content-position="center">更新状态</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单状态" :label-width="formLabelWidth" prop="process_state">
            <span v-for="item in order_state_list">
              <el-radio class="float-left inline-block left-margin-10" v-model="stateForm.process_state"
                        :label="item.process_state">{{item.process_state_name}}</el-radio>
            </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态备注" :label-width="formLabelWidth" prop="process_state">
              <el-input class="inline-block line-height-30 input-180" type="textarea" maxlength="200"
                        show-word-limit size="mini" v-model="stateForm.process_state_remarks"
                        placeholder="状态备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="goEditState" v-preventReClick>确 定</el-button>
      </div>
    </el-dialog>

    <!--  新增立项  -->
    <el-dialog title="新增" :visible.sync="addApprovalDialogVisible" width="50%" v-dialogDrag>
      <el-button type="primary" size="medium" style="margin-bottom: 10px;float: right" @click="addLine">新增一行</el-button>
      <el-table :data="addApprovalData" border highlight-current-row>
        <el-table-column align="center" label="项目名称" prop="userName">
          <span class="star" style="margin-left: -37px;left: 50%;">*</span>
          <template slot-scope="scope">
            <!--            <el-input size="small" placeholder="请输入项目名称" v-model="scope.row.projectName"></el-input>-->
            <el-select remote :remote-method="projectListMethod" size="small" filterable
                       v-loadMore="loadMore" :loading="loading"
                       @change="changeProjectName(scope.row)"
                       class="inline-block float-left" clearable v-model="scope.row.projectName"
                       placeholder="项目名称">
              <el-option v-for="item in projectList" :key="item.projectName" :label="item.projectName"
                         :value="item.projectName"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="年度" prop="userName">
          <span class="star" style="margin-left: -23px;left: 50%;">*</span>
          <template slot-scope="scope">
            <el-date-picker
              size="small"
              v-model="scope.row.projectYear"
              type="year"
              value-format="yyyy"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column align="center" label="级别" prop="userName">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.projectLevel" placeholder="级别" clearable>
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="批次" prop="userName">
          <template slot-scope="scope">
            <el-select size="small" v-if="scope.row.projectName" v-model="scope.row.projectBatchNo" placeholder="批次" clearable>
              <el-option
                v-for="item in scope.row.batchNoList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <span class="spanDelete" @click="deleteApproval(scope.$index)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addApprovalDialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="addApproval">确 定</el-button>
      </span>
    </el-dialog>

    <!--客户基本信息表-->
    <el-dialog title="选择文档类型" :visible.sync="complexInfoVisible" width="600px" v-dialogDrag>
      <el-form :model="complexInfoForm" :rules="complexInfoRules" ref="complexInfoForm" label-width="150px">
        <el-form-item label="文档类型：">
          <el-radio-group v-model="complexInfoForm.fileType">
            <el-radio v-for="item in suffix_type_list" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="bg_blue" @click="handleEnterpriseComplexInfo">确 定</el-button>
        <el-button @click="complexInfoVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!--联系人-->
    <el-dialog :before-close="cananlContact" :title="isContactEdit ?'编辑联系人': '新增联系人'"
               :visible.sync="contactsUserVisible" v-dialogDrag>
      <el-form :rules="contactsUserRules" :model="contactsUserFrom" ref="contactsUser">
        <el-row>
          <el-col :span="18">
            <el-form-item label="联系人员类别：" label-width="200px" prop="personnelType">
              <el-select v-model="contactsUserFrom.personnelType" placeholder="请选择" filterable>
                <el-option v-for="item in contactType" :key="item.value" :label="item.lable"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="联系人姓名：" label-width="200px" prop="personnelName">
              <el-input maxlength="20" v-model.trim="contactsUserFrom.personnelName"/>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="手机/电话：" label-width="200px" prop="personnelMobile">
              <el-input maxlength="40" v-model="contactsUserFrom.personnelMobile"/>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="备注：" label-width="200px">
              <el-input maxlength="500" v-model="contactsUserFrom.personnelRemarks" class="remark" type="textarea"
                        autosize="none"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cananlContact">取 消</el-button>
        <el-button type="primary" @click="contactsUserSubmit" v-preventReClick>确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="canApplyForm.num == 1 ? '设为可报' : '设为已报'" :visible.sync="setCanApplyDiog" class="editorUserModal"
               width="600px">
      <el-form :model="canApplyForm" :rules="canApplyRules" ref="canApplyForm" label-width="120px" @submit.native.prevent>
        <el-form-item label="项目名称：" prop="projectId">
          <span>{{canApplyForm.projectName}}</span>
        </el-form-item>
        <el-form-item label="年度：" prop="projectYear" v-if="canApplyForm.num == 2">
          <el-date-picker
            size="small"
            v-model="canApplyForm.projectYear"
            type="year"
            value-format="yyyy"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="级别：" v-if="canApplyForm.num == 2 && canApplyForm.projectType != 822466810090618880">
          <el-select size="small" v-model="canApplyForm.projectLevel" placeholder="级别" clearable>
            <el-option
              v-for="item in levelList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职称专业：" v-if="canApplyForm.num == 2 && canApplyForm.projectType == 822466810090618880">
          <el-input size="small" v-model="canApplyForm.titleMajor" placeholder="职称专业"></el-input>
        </el-form-item>
        <el-form-item label="职称系列：" v-if="canApplyForm.num == 2 && canApplyForm.projectType == 822466810090618880">
          <el-select size="small" v-model="canApplyForm.titleSeries" placeholder="职称系列" @change="changeTitleSeries" clearable>
            <el-option
              v-for="item in titleSeriesList"
              :key="item.dictId"
              :label="item.dictName"
              :value="item.dictId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职称级别：" v-if="canApplyForm.num == 2 && canApplyForm.projectType == 822466810090618880">
          <el-select size="small" v-model="canApplyForm.titleLevel" placeholder="职称级别" clearable>
            <el-option
              v-for="item in titleLevelList"
              :key="item.dictId"
              :label="item.dictName"
              :value="item.dictId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="批次：" v-if="canApplyForm.num == 2">
          <el-select size="small" v-model="canApplyForm.projectBatchNo" placeholder="批次" clearable>
            <el-option
              v-for="item in batchNoList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="政策信息：" prop="policyInfo" v-if="canApplyForm.num == 1">
          <el-input type="textarea" v-model="canApplyForm.policyInfo" resize="none" :rows="5" maxlength="100"
                    placeholder="请输入政策信息"></el-input>
        </el-form-item>
        <el-form-item label="备注：" v-if="canApplyForm.num == 1">
          <el-input type="textarea" v-model="canApplyForm.planRemark" resize="none" :rows="5" maxlength="100"
                    placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="cananl" @click="cancelSelCan">取 消</el-button>
        <el-button class="setBtn" v-if="canApplyForm.num == 1" @click="setCanSetApply('canApplyForm')">保 存</el-button>
        <el-button class="setBtn" v-if="canApplyForm.num == 2" @click="setSetApplied('canApplyForm')">保 存</el-button>
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
            :autosize="{ minRows: 3, maxRows: 3}"
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

    <!--  得分信息  -->
    <el-dialog title="项目匹配得分信息" :visible.sync="matchingDialogVisible" width="80%" v-dialogDrag>
      <el-table :data="matchingCompanyInfoList" border highlight-current-row>
        <el-table-column align="center" label="所属政策" prop="noticeName">
          <template slot-scope="scope">
            <span>{{ scope.row.noticeName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="条件描述" prop="conditionDesc">
          <template slot-scope="scope">
            <span>{{scope.row.conditionDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="匹配方式" prop="autoMatch" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.autoMatch == 0">人工判断</span>
            <span v-else>自动匹配</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否符合" prop="weightScore" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.isPass === 1">符合</span>
            <span v-else>不符合</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="条件总分" prop="weightScore" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.weightScore}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="已得分" prop="getScore" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.getScore" type="number"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="matchingDialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="updateGetScore">修改已得分</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import IprPatentList from '../customerCenter/patentList'
  import SalesList from '../customerCenter/salesList'
  import IprCopyrightList from '../customerCenter/copyrightList'
  import IprTrademarkList from '../customerCenter/trademarkList'
  import IprCertList from '../customerCenter/certificateList'
  import ApplyAccountList from '../../project/apply_account/list'
  import ProjectPlanList from '../../project/project_plan/list'
  import personnelList from '../../project/personnel/list'
  import customerDetailList from '../../project/customer_detail/list'
  import charWindow from '../../enterprise_info/message_center/chat_window'
  import {getNowTime} from '@/utils/auth'
  import {queryMessageList, deleteChatById, addChat, addChatFile,importCrmCompanyPersonnel,getCrmCompanyPersonnelTemplate} from '@/api/messageCenter'
  import {
    saveCrmCompanyInfo,
    queryCrmCompanyInfo,
    updateCrmCompanyInfo,
    queryCompanyDetailContractInfo,
    queryCompanyDetailOrderInfo,
    queryUserComboInfo,
    batchFollowUser,
    updateCrmCompanyIsProxy,
    putCompanyToFreeSea,
    queryCompanyDetailApprovalListInfo,
    // checkCompnayCodeExist,
    batchGrabCompany,
    createCompanyComplexInfo,
    queryCrmCompanyFollowHistory,
    saveCrmCompanyPersonnel,
    queryCrmCompanyPersonnelList,
    updateCrmCompanyPersonnel,
    delCrmCompanyPersonnelByIds,
    updateCrmCompanyPersonnelStatistics,
    exportCompanyDetailApprovalListInfo,
    exportCrmCompanyPersonnelList,
    exportCompanyDetailOrderInfo,
    queryCompanyProjectDeclare,
    queryProjectDeclareInfo,
    queryProjectRelatedPolicy,
    queryYiBaoProjectInfo,
    addPolicyApprovalSetReported
  } from '@/api/customerCenter'
  import {
    commonDict,
    commonDictOfRegion,
    commonDictGetNameByCaChe,
    batchQueryCompanyInfoFromQichacha,
    queryCompanyInfoFromQichacha,
    batchQueryIntellectualPropertyRights,
    downloadCrm,
    getFileListWithFileIds,
    ossFileSystemFileDownload
  } from '@/api/utils'
  import {assignOrderEngineer,queryOrderDetail} from '@/api/orderManage'
  import {exportContract} from '@/api/contractManage'
  import {deletePolicyApproval, addPolicyApproval, queryPolicyApprovalList, queryPolicyApprovalListByCompanyName} from '@/api/approval'
  import {queryAll, matchingCompanyInfo, updateMatchingCompanyGetScore, queryProjectMaxBatch, queryTitleSeriesOrLevel } from '@/api/projectManage'
  import { saveProjectPlan } from '@/api/projectPlan'

  import echarts from 'echarts'

  export default {
    components: {
      IprPatentList,
      SalesList,
      IprCopyrightList,
      IprTrademarkList,
      IprCertList,
      ApplyAccountList,
      charWindow,
      ProjectPlanList,
      personnelList,
      customerDetailList
    },
    props: {},
    data() {
      return {
        titleSeriesList: [],
        titleLevelList: [],
        // 项目得分信息
        matchingCompanyInfoList: [],
        matchingDialogVisible: false,
        // 点击可报的项目信息
        keBaoData: {},

        addEd: {},
        companyType: this.$store.getters.companyType,
        id: '',
        formLabelWidth: '120px',
        activeName: 'seventeen',
        check: true,
        is_personal: false,
        customer_news: "基本信息",
        contacts_people: "联系人",
        maintenance_name: '立项',
        order_name: '订单',
        contract_name: '合同',
        content_name: '沟通',
        can_apply_name: '可申报',
        intellectual_name:'知识产权',
        patent_name: '专利',
        sales_name:'销售跟进',
        trademark_name: '商标',
        copyright_name: '著作权',
        account_name: '账号',
        projectPlan_name: '项目规划',
        shareholder_name: '股东信息',
        project_name: '研发',
        briefing_name: '客户简介',
        audit_user: '',
        certificate_name: '证书',
        project_user: '',
        ruleForm: {
          page: 0,
          pageSize: 10,
          realityCmoney: '',
        },
        contactsList: [
          {personnelName: '', personnelMobile: '', personnelType: 3},
          {personnelName: '', personnelMobile: '', personnelType: 3}
        ],
        regist_status_list: [],
        employee_scale_list: [],
        industry_involved_list: [],
        enterprise_annual_sales_list: [
          {value: '1000万以下', min: 0, max: 10000000},
          {value: '1000万-2000万', min: 10000000, max: 20000000},
          {value: '2000万-5000万', min: 20000000, max: 50000000},
          {value: '5000万-2亿', min: 50000000, max: 200000000},
          {value: '2亿以上', min: 200000000, max: 10000000000}
        ],
        customer_classification_list: [],
        gender_list: [
          {label: '男', value: 1},
          {label: '女', value: 0},
        ],
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        // 关联业务员
        reviewer_user_list: [],
        dialogVisible: false,
        reviewerForm: {
          companyName: '',
          business_name: '',
          id: '',
          user_id: ''
        },
        // 关联审计人员
        auditDialogVisible: false,
        auditForm: {
          companyName: '',
          audit_name: '',
          id: '',
          user_id: ''
        },
        audit_user_list: [],
        // 关联项目人员
        projectDialogVisible: false,
        intellectualDialogVisible: false,
        projectForm: {
          page: 0,
          pageSize: 20
        },
        projectList: [],
        loading: false,
        project_user_list: [],
        // 默认工时
        hourDialogVisible: false,
        hourForm: {},
        hourRules: {},
        // 页签
        maintenanceList: [],
        mainPage: 0,
        mainPageSize: 10,
        mainTotal: 0,
        order_list: [],
        contract_list: [],
        content_list: [],
        patent_list: [],
        copyright_list: [],
        trademark_list: [],
        certificate_list: [],
        account_list: [],
        shareholder_list: [],
        dev_project_list: [],
        briefing_list: [],
        companyTypeList: [],
        companyTagList: [],
        // 指派工程师
        changeVisible: false,
        changeForm: {},
        // 更新状态
        order_state_list: [],
        visible: false,
        perform_state: '',
        stateForm: {},
        level: 3,
        parentId: 0,
        contractList: [],
        orderList: [],
        batchChangeFrom: {},
        personList: [],
        contractForm: {
          page: 0,
          pageSize: 20,
        },
        mainForm: {
          page: 0,
          pageSize: 20
        },
        contractTotal: 0,
        orderForm: {
          page: 0,
          pageSize: 20,
        },
        orderTotal: 0,

        //专利总条数
        patentTotal: "",
        //商标总条数
        trademarkTotal: "",
        //销售跟进条数
        salesTotal:0,
        //著作权总条数
        copyrightTotal: "",
        //证书总条数
        certTotal: "",
        //账号总条数
        accountTotal: "",
        //项目规划总条数
        projectPlanTotal: "",
        approvalCheckList: [],
        holdDelList: [],
        addApprovalData: [
          {}
        ],
        levelList: [
          {'label': '国家级', 'value': 1},
          {'label': '省级', 'value': 2},
          {'label': '市级', 'value': 3},
          {'label': '区县级', 'value': 4},
          {'label': '镇街级', 'value': 5}
        ],
        batchNoList: [],

        addApprovalDialogVisible: false,

        // 客户基本信息表
        complexInfoForm: {
          fileType: 1
        },
        complexInfoVisible: false,
        complexInfoRules: {},
        suffix_type_list: [
          {value: 1, label: 'word'},
          {value: 2, label: 'excel'},
        ],

        companyTipsData: {},
        powerEdit: true,

        tips: this.$route.query.tip,

        // 联系人监听
        contactsUserRules: {
          personnelType: [
            {required: true, message: '请选择联系人员类别', trigger: 'blur'}
          ],
          personnelName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          personnelMobile: [
            {required: true, message: '请输入手机/电话', trigger: 'blur'}
          ],
        },

        // 联系人参数
        contactsUserFrom: {},

        //联系人类别数据
        contactType: [
          {value: 0, lable: '普通人员'},
          {value: 1, lable: '法人'},
          {value: 2, lable: '主要人员'},
          {value: 3, lable: '业务联系人'},
          {value: 4, lable: '技术人员'},
          {value: 5, lable: '项目负责人'},
        ],

        //获取列表数据参数
        contactListParams: {
          page: 0,
          pageSize: 20,
        },

        //联系人数据
        contactsUserData: [],
        //联系人--弹窗--显示/隐藏
        contactsUserVisible: false,

        //判断新增/编辑
        isContactEdit: true,

        //人员总条数
        contactsUserTotal: "",

        //列表参数
        listParams: {
          page: 0,
          pageSize: 20
        },

        //获取列表数据的字段
        listData: {},

        //人员统计--提交的字段
        poroleForm: {},

        companyProjectDeclare:{},
        showType: 1,
        brieform: '',
        policyList: [],
        approvalMsg: {},
        userFlowList:[],
        orderDetailForm: {},
        processWorkId:'',
        processForm:{},
        setCanApplyDiog: false,
        canApplyForm:{},
        canApplyRules:{
          projectId: [
            {required: true, message: '请选择项目名称', trigger: 'blur'}
          ],
          // projectYear: [
          //   {required: true, message: '请选择年度', trigger: 'blur'}
          // ],
          policyInfo: [
            {required: true, message: '请输入政策信息', trigger: 'blur'}
          ]
        },

        allowAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:INSERT'),//新增企业客户
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:UPDATE'),//编辑企业客户
        allowDetail: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:DETAILS'),//查询企业客户信息
        allowGetRoleUserList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:ROLE:USER:LIST'),//获取指定角色用户列表
        allowBatchFollowUser: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:BATCHFOLLOWUSER'),//批量修改客户企业跟进人员
        allowSyncIntellectual: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:BATCHSYNCINTELLECTUALPROPERTYRIGHTS'),//批量同步企业知识产权
        allowBatchCompanyInfo: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:BATCHSYNCCOMPANYINFO'),//批量同步企业信息
        allowIsproxy: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:COMPANYISPROXY:UPDATE'),//设置/取消渠道
        allowAddSyncQiChaCha: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:SYNCQICHACHA:ADDCOMPANY'),//新增企业页面同步企查查
        allowDetailApproval: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:DETAIL:APPROVALLIST'),//查询客户详情-立项信息
        allowDetailContract: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:DETAIL:CONTRACTINFO'),//查询客户详情-合同信息
        allowDetailOrder: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:DETAIL:ORDERINFO'),//查询客户详情-订单信息
        allowDetailAddWeb: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:ADD'),//新增网站帐号
        allowDetailEditWeb: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:EDIT'),//变更网站帐号
        allowDetailWebDetail: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:DETAILS'),//查询网站帐号详情信息
        allowDetailWebDelete: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:DELETE'),//删除网站帐号记录[批量]
        allowDetailWebList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:WEBSITEACCOUNT:LIST'),//查询网站帐号列表
        allowAddPerson: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMERPERSON:INSERT'),//新增个人客户
        allowPutCompanyToFreesesea: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:PUTCOMPANYTOFREESEA'),//投入公海
        allowbatchGrabCompany: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:BATCHGRABCOMPANY'),//抢客户
        allowOrderDetail: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:DETAILS'),//查看订单详情


        allowBatchEngineer: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:BATCH:EDIT:ENGINEER'),//批量设置项目员
        allowBatchIntellectualEngineer: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:BATCH:EDIT:INTELLECTUAL:ENGINEER'),//批量设置专利员
        allowBatchAuditor: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:BATCH:EDIT:AUDITOR'),//批量设置审计员

        allowGetPatentList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:PROPERTY:PATENT:LIST'),//专利列表
        allowGetTrademarkList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:PROPERTY:Trademark:LIST'),//商标列表
        allowGetCopyrightList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:PROPERTY:Copyright:LIST'),//著作权列表
        allowGetCertificateList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:PROPERTY:Certificate:LIST'),//证书列表
        allowGetProjectplanList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CRM:PROJECTPLAN:LIST'),//项目规划列表

        contactsUserAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER: CRMCOMPANYPERSONNEL:INSERT'),//联系人新增
        contactsUserEdit: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER: CRMCOMPANYPERSONNEL:EDIT'),//联系人编辑
        contactsUserDel: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER: CRMCOMPANYPERSONNEL:DELETE'),//联系人删除

        allowSyncPolicyApprovalList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER',
          'SYSTEM:CUSTOMER:CENTER:SYNCPOLICYAPPROVALLIST'),//同步立项数据

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

        toUserId:0, //消息接收人id
        toUserName:'',
        toCompanyId:0, //消息接收人公司ID
        fromcompanyId:0, //消息发出人公司ID

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
        traceSalesManName:[],
        roleNameList:"业务员,业务主管",

        changeColor:1,



      }
    },
    filters: {
      lengthFilter(val) {
        if (val == undefined || val == "" || val == null || !val) {
          return '-'
        } else {
          return val
        }
      },
      titleSize(val) {
        return val.substring(0, 1);
      },
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
      this.getCommonData();
      this.getTitleSeries();
      this.getRegionList(this.level, this.parentId)
      this.ruleForm.crmCompanyId = this.$route.query.id

      this.check = this.$route.query.check

      if (this.$route.query.isContractListSkipFlag) {
        this.ruleForm.isContractListSkipFlag = this.$route.query.isContractListSkipFlag
      }

      // 创建个人客户
      this.is_personal = this.$route.query.is_personal

      if (this.is_personal == true || this.is_personal == 'true') {
        this.ruleForm.companyOrPersonal = 1;
      } else {
        this.ruleForm.companyOrPersonal = 0;
      }

      // 编辑/查看
      if (this.ruleForm.crmCompanyId) {
        this.getDetail();

        // 同步立项
        // this.syncPolicyApprovalListByCompanyName();

        if(this.allowDetailApproval.twoAllow){
          this.getMaintenanceList()
        }

        if(this.allowDetailContract.twoAllow){
          this.getContract();
        }

        if(this.allowDetailOrder.twoAllow){
          this.getOrderList();
        }

        // this.getCompanyList();

        this.getCompanyProjectData();
      }
      this.getContactUserData();
    },

    methods: {

      // 获取职称系列
      getTitleSeries() {
        queryTitleSeriesOrLevel({}).then(res =>{
          if (res.code === 200){
            this.titleSeriesList = res.data
          }
        })
      },
      // 修改职称系列
      changeTitleSeries() {
        this.$set(this.canApplyForm, 'titleLevel', '')
        queryTitleSeriesOrLevel({parentId: this.canApplyForm.titleSeries}).then(res =>{
          if (res.code === 200){
            this.titleLevelList = res.data
          }
        })
      },

      //知识产权选择
      colorChange(data){
        this.changeColor=data
      },

      //跟进--点击人员按钮 沟通
      handleShowConnectContentListPeople(data,i){
        let newformData = new FormData;
        switch(i) {
          case 4:
              newformData.append('roleNameList', "业务员,业务主管")
              this.roleNameList="业务员,业务主管"
              break;
          case 0:
              newformData.append('roleNameList', "业务员,业务主管")
               this.roleNameList="业务员,业务主管"
              break;
          case 1:
              newformData.append('roleNameList', "项目主管,项目员")
               this.roleNameList="项目主管,项目员"
              break;
          case 2:
              newformData.append('roleNameList', "专利员,专利主管")
               this.roleNameList="专利员,专利主管"
              break;
          case 3:
              newformData.append('roleNameList', "审计员")
               this.roleNameList="审计员"
              break
        }

        queryUserComboInfo(newformData).then(res => {
          if (res.code == 200) {
            this.personList = res.data
          } else {
            this.$message.warning(res.message)
          }
        }).then(() => {
          switch (i) {
            case 4:
              if (data == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data)
              this.toUserId = this.personList[a].userId
              this.toUserName = data

              break
            case 0:
              if (data.traceSalesManName == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.traceSalesManName)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.traceSalesManName

              break
            case 1:
              if (data == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.projectMan
              break
            case 2:
              if (data == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.propertyMan
              break
            case 3:
              if (data == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.auditMan
              break
          }
          // console.log( this.toUserName ,this.projectMan ,this.propertyMan ,this.auditMan ,"====auditMan==>>>"  );
          this.searchForm.toUserId = this.toUserId
          this.ConnectContentDialogVisible = true
          this.searchForm.companyId = this.$store.getters.companyId
          this.isShowMoreNews = true
          this.getConnectList()
        })
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

      // 重定向
      handleRedirect(redirect_url, query) {
        const routerJump = this.$router.resolve({
          path: redirect_url,
          query: query
        })
        window.open(routerJump.href, '_blank')
      },

      //获取客户详情
      getDetail() {
        if (this.allowDetail.twoAllow) {
          queryCrmCompanyInfo({
            page: 0,
            pageSize: 10,
            crmCompanyId: this.ruleForm.crmCompanyId,
            isContractListSkipFlag: this.ruleForm.isContractListSkipFlag
          }).then(res => {
            if (res.code == 200) {
              this.getRegionList(3, 0)
              if (res.data.data[0].provinceId) {
                this.getRegionList(2, res.data.data[0].provinceId)
                // let sheng = res.data.data[0].companyAddress.indexOf('省') + 1
                // res.data.data[0].companyAddress = res.data.data[0].companyAddress.substring(sheng)
              }
              if (res.data.data[0].cityId) {
                this.getRegionList(1, res.data.data[0].cityId)
                if(res.data.data[0].companyAddress && res.data.data[0].companyAddress.indexOf('市')){
                  let shi = res.data.data[0].companyAddress.indexOf('市') + 1
                  res.data.data[0].companyAddress = res.data.data[0].companyAddress.substring(shi)
                }
              }
              if (res.data.data[0].districtId) {
                this.getRegionList(0, res.data.data[0].districtId)
                if(res.data.data[0].companyAddress && res.data.data[0].companyAddress.indexOf('区')){
                  let qu = res.data.data[0].companyAddress.indexOf('区') + 1
                  res.data.data[0].companyAddress = res.data.data[0].companyAddress.substring(qu)
                }
              }

              // if(res.data.data[0].traceSalesManName != this.$store.getters.username){
              //   this.powerEdit = false;
              // }

              // 同步立项
              queryPolicyApprovalListByCompanyName({companyName: res.data.data[0].companyName}).then(r => {})

              if (res.data.data[0].companyOrPersonal == 1) {
                res.data.data[0].companyPersonnelVoList.forEach(item => {
                  res.data.data[0].birthDate = item.birthDate;
                  res.data.data[0].idCard = item.idCard;
                  res.data.data[0].nativePlace = item.nativePlace;
                  res.data.data[0].personnelId = item.personnelId;
                  res.data.data[0].personnelMobile = item.personnelMobile;
                  res.data.data[0].personnelSex = item.personnelSex;
                })
              }

              if (res.data.data[0].companyPersonnelVoList && res.data.data[0].companyPersonnelVoList.length != 0) {
                this.contactsList = res.data.data[0].companyPersonnelVoList
                if (this.contactsList.length < 2) {
                  let str = {personnelName: '', personnelMobile: '', personnelType: 3}
                  this.contactsList.push(str)
                }
              } else {
                this.contactsList = [
                  {personnelName: '', personnelMobile: '', personnelType: 3},
                  {personnelName: '', personnelMobile: '', personnelType: 3}
                ]
              }
              if (res.data.data[0].companyOrPersonal == 0) {
                setTimeout(() => {
                  if (res.data.data[0].companyTag) {
                    let companyTag = res.data.data[0].companyTag.split(',')
                    this.$set(this.ruleForm, 'companyTag', companyTag)
                  }

                  if (res.data.data[0].registerStatus) {
                    commonDictGetNameByCaChe({dictId: res.data.data[0].registerStatus}).then(response => {
                      // res.data.data[0].registerStatusName = response.data
                      this.$set(this.ruleForm, 'registerStatusName', response.data)
                    })
                  }
                  if (res.data.data[0].companyClass) {
                    commonDictGetNameByCaChe({dictId: res.data.data[0].companyClass}).then(response => {
                      // res.data.data[0].companyClassName = response.data
                      this.$set(this.ruleForm, 'companyClassName', response.data)
                    })
                  }
                  if (res.data.data[0].personnelScale != '' && res.data.data[0].personnelScale != undefined) {
                    commonDictGetNameByCaChe({dictId: res.data.data[0].personnelScale}).then(response => {
                      // res.data.data[0].personnelScaleName = response.data
                      this.$set(this.ruleForm, 'personnelScaleName', response.data)
                    })
                  }
                }, 200)
              }

              setTimeout(() => {
                if (res.data.data[0].companyLevel != '' && res.data.data[0].companyLevel != undefined) {
                  commonDictGetNameByCaChe({dictId: res.data.data[0].companyLevel}).then(response => {
                    this.$set(this.ruleForm, 'companyLevelName', response.data)
                  })
                }

                if (res.data.data[0].industryInvolved != '' && res.data.data[0].industryInvolved != undefined) {
                  commonDictGetNameByCaChe({dictId: res.data.data[0].industryInvolved}).then(response => {
                    // res.data.data[0].industryInvolvedName = response.data
                    this.$set(this.ruleForm, 'industryInvolvedName', response.data)
                  })
                }
              }, 200)

              this.is_personal = res.data.data[0].companyOrPersonal == 1 ? true : false;
              this.ruleForm = res.data.data[0]
              if (this.ruleForm.registerMoney) {
                this.$set(this.ruleForm, 'registerMoney', this.ruleForm.registerMoney / 10000)
              }
              if (this.ruleForm.realityCmoney) {
                this.$set(this.ruleForm, 'realityCmoney', this.ruleForm.realityCmoney / 10000)
              }
              this.enterprise_annual_sales_list.forEach(item => {
                if (res.data.data[0].companySales && res.data.data[0].companySalesMax) {
                  if (item.min == res.data.data[0].companySales && item.max == res.data.data[0].companySalesMax) {
                    this.$set(this.ruleForm, 'companySalesName', item.value)
                  }
                }
              })
              this.traceSalesManName= this.ruleForm.traceSalesManName ? this.ruleForm.traceSalesManName.split(",") : undefined;
              this.projectMan=this.ruleForm.projectMan ? this.ruleForm.projectMan.split(",") : undefined;
              this.propertyMan=this.ruleForm.propertyMan ? this.ruleForm.propertyMan.split(",") : undefined;
              this.auditMan=this.ruleForm.auditMan ? this.ruleForm.auditMan.split(",") : undefined;

              queryCrmCompanyFollowHistory({crmCompanyId: res.data.data[0].crmCompanyId}).then(res => {
                if (res.code == 200) {
                  this.companyTipsData = res.data;
                }
              })

            } else {
              this.$message.warning(res.message)
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取此详情')
        }

      },

      //编辑确定
      editForm() {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (this.is_personal == true || this.is_personal == 'true') {
          if (this.ruleForm.companyName == '' || this.ruleForm.companyName == undefined) {
            this.$message.warning('请输入客户名称');
            return;
          }

          if (this.ruleForm.personnelMobile != '' && this.ruleForm.personnelMobile != undefined) {
            if (phoneReg.test(this.ruleForm.personnelMobile)) {
            } else {
              this.$message({type: 'warning', message: '电话号码格式不正确'})
              return;
            }
          }

        } else {
          // 统一社会信用代码正则表达验证
          const credit_code = /[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/;
          if (!credit_code.test(this.ruleForm.companyCode)) {
            this.$message.warning('请输入正确格式的统一社会信用代码');
            return;
          }

          if (this.ruleForm.companyName == '' || this.ruleForm.companyName == undefined) {
            this.$message.warning('请输入企业名称');
            return;
          }

          if (this.ruleForm.registerStatus == '' || this.ruleForm.registerStatus == undefined) {
            this.$message.warning('请选择登记状态');
            return;
          }
          if (this.ruleForm.companyClass == '' || this.ruleForm.companyClass == undefined) {
            this.$message.warning('请选择企业类型');
            return;
          }
          if (this.ruleForm.companyShortName == '' || this.ruleForm.companyShortName == undefined) {
            this.$message.warning('请输入公司简称');
            return;
          }
          if (this.ruleForm.companySalesName == '' || this.ruleForm.companySalesName == undefined) {
            this.$message.warning('请选择年销售额');
            return;
          }
          if (this.ruleForm.setupDate == '' || this.ruleForm.setupDate == undefined) {
            this.$message.warning('请输入成立时间');
            return;
          }

          if (this.ruleForm.registerMoney == '' || this.ruleForm.registerMoney == undefined) {
            this.$message.warning('请输入注册资本');
            return;
          }

          if (this.ruleForm.provinceId == '' || this.ruleForm.provinceId == undefined || this.ruleForm.cityId == '' || this.ruleForm.cityId == undefined || this.ruleForm.districtId == '' || this.ruleForm.districtId == undefined  || this.ruleForm.townId == '' || this.ruleForm.townId == undefined || this.ruleForm.companyAddress == '' || this.ruleForm.companyAddress == undefined   ) {
            this.$message.warning('请输入公司详细地址');
            return;
          }

          if (this.ruleForm.mainProducts == '' || this.ruleForm.mainProducts == undefined) {
            this.$message.warning('请输入主营产品');
            return;
          }

          //联系人电话号码验证
          this.ruleForm.companyPersonnelDtoList = JSON.parse(JSON.stringify(this.contactsList))
          this.ruleForm.companyPersonnelDtoList.forEach((item, index) => {
            if (item.personnelName == '' && item.personnelMobile == '') {
              this.ruleForm.companyPersonnelDtoList.splice(index, 2)
            } else {
              if (item.personnelMobile != '') {
                if (item.personnelName != '' && item.personnelMobile == '') {
                  if (phoneReg.test(item.personnelMobile)) {
                  } else {
                    this.$message({type: 'warning', message: '电话号码为空或者格式不正确'})
                    throw new Error()
                  }
                }
              }
            }
          });
        }

        if (this.ruleForm.companyLevel == '' || this.ruleForm.companyLevel == undefined) {
          this.$message.warning('请选择客户级别');
          return;
        }

        if (this.ruleForm.companyTag && this.ruleForm.companyTag.length != 0) {
          this.ruleForm.companyTag = this.ruleForm.companyTag.join(',')
        } else {
          this.ruleForm.companyTag = ''
        }

        this.ruleForm.companyOrPersonal = this.is_personal ? 1 : 0;
        this.ruleForm.registerMoney = this.ruleForm.registerMoney * 10000
        this.ruleForm.realityCmoney = this.ruleForm.realityCmoney * 10000

        //判断如果是新增客户的时候（1）
        if (this.ruleForm.companyOrPersonal == 1) {
          this.ruleForm = {
            companyId: this.$store.getters.companyId,
            crmCompanyId: this.ruleForm.crmCompanyId,
            companyName: this.ruleForm.companyName,
            companyLevel: this.ruleForm.companyLevel,
            companyOrPersonal: this.ruleForm.companyOrPersonal,
            companyPersonnelDtoList: [{
              personnelSex: this.ruleForm.personnelSex,
              personnelMobile: this.ruleForm.personnelMobile,
              birthDate: this.ruleForm.birthDate,
              idCard: this.ruleForm.idCard,
              nativePlace: this.ruleForm.nativePlace,
              personnelId: this.ruleForm.personnelId
            }],
            provinceId: this.ruleForm.provinceId,
            cityId: this.ruleForm.cityId,
            districtId: this.ruleForm.districtId,
            townId: this.ruleForm.townId,
            companyAddress: this.ruleForm.companyAddress,
            industryInvolved: this.ruleForm.industryInvolved
          };
        }

        this.ruleForm.page = 0;
        this.ruleForm.pageSize = 10;

        if (this.ruleForm.socialSecurityNum == "") {
          this.ruleForm.socialSecurityNum = 0;
        }
        if (this.ruleForm.technologyNum == "") {
          this.ruleForm.technologyNum = 0;
        }
        if (this.ruleForm.collegeNum == "") {
          this.ruleForm.collegeNum = 0;
        }
        if (this.ruleForm.universityNum == "") {
          this.ruleForm.universityNum = 0;
        }
        if (this.ruleForm.masterNum == "") {
          this.ruleForm.masterNum = 0;
        }
        if (this.ruleForm.doctorNum == "") {
          this.ruleForm.doctorNum = 0;
        }
        if (this.ruleForm.lowLevelNum == "") {
          this.ruleForm.lowLevelNum = 0;
        }
        if (this.ruleForm.midLevelNum == "") {
          this.ruleForm.midLevelNum = 0;
        }
        if (this.ruleForm.highLevelNum == "") {
          this.ruleForm.highLevelNum = 0;
        }

        updateCrmCompanyInfo(this.ruleForm).then(response => {
          if (response.code == 200) {
            this.$message.success('修改成功')
            this.ruleForm = {
              page: 0,
              pageSize: 10
            }
            this.contactsList = [
              {personnelName: '', personnelMobile: ''},
              {personnelName: '', personnelMobile: ''}
            ];
            // this.$store.commit('SET_CUSTOMER_SCROLL',0)
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/customer');
          } else {
            this.$message.warning(response.message)
          }
        });

        setTimeout(() => {
          this.ruleForm.registerMoney = this.ruleForm.registerMoney / 10000
          this.ruleForm.realityCmoney = this.ruleForm.realityCmoney / 10000
        }, 300)
      },
      toEdit() {
        this.check = true
      },
      toOrderCheck(biz_id) {
        this.handleRedirect('/project/process-mng/check', {'id': biz_id, 'check': true})
      },
      // 查看项目
      toProject(id) {
        if (id) {
          this.$router.push({'path': '/policy/project/detail', 'query': {'id': id, 'check': true}})
        }
      },

      //选择省
      changeProvince(val) {
        // this.areaSetNull(3)
        this.ruleForm.cityId = ''
        this.ruleForm.districtId = ''
        this.ruleForm.townId = ''
        this.parentId = val
        this.level = 2
        this.getRegionList(this.level, this.parentId)
      },
      //选择市
      changeCity(val) {
        this.ruleForm.districtId = ''
        this.ruleForm.townId = ''
        // this.areaSetNull(2)
        this.parentId = val
        this.level = 1
        this.getRegionList(this.level, this.parentId)
      },
      //选择区县
      changeDistrict(val) {
        // this.areaSetNull(1)
        this.ruleForm.townId = ''
        this.parentId = val
        this.level = 0
        this.getRegionList(this.level, this.parentId)
      },
      //选择镇
      changeTowns(val) {
        this.$forceUpdate()
      },
      // 关联业务员
      goChange() {
        this.dialogVisible = true
        this.getPersonList('业务员,业务主管')
        this.batchChangeFrom = {};
        this.batchChangeFrom.companyName = this.ruleForm.companyName
        this.batchChangeFrom.traceSalesManName = this.ruleForm.traceSalesManName
        this.batchChangeFrom.companyIds = this.ruleForm.crmCompanyId
      },

      //设置人员
      relReviewer(num) {
        // if (this.batchChangeFrom.userId == '' || this.batchChangeFrom.userId == undefined) {
        //   this.$message.warning('请选择人员！');
        //   return;
        // }

        let formData = new FormData;
        formData.append('userIds', this.batchChangeFrom.userId)
        formData.append('userType', num)
        formData.append('companyIds', this.batchChangeFrom.companyIds)
        batchFollowUser(formData).then(res => {
          if (res.code == 200) {
            this.$message.success('设置成功')
            this.personList = [];
            this.batchChangeFrom = {};

            if (num == 0) {
              this.dialogVisible = false
            } else if (num == 1) {
              this.projectDialogVisible = false;
            } else {
              this.auditDialogVisible = false;
            }
            // this.$store.commit('SET_CUSTOMER_SCROLL',0)
            this.getDetail()
          }
        })
      },
      // 更改审计人员
      changeAudit() {
        this.auditDialogVisible = true
        this.getPersonList('审计员')
        this.batchChangeFrom = {};
        this.batchChangeFrom.companyName = this.ruleForm.companyName
        this.batchChangeFrom.auditMan = this.ruleForm.auditMan
        this.batchChangeFrom.companyIds = this.ruleForm.crmCompanyId
      },

      //设置审计人员
      relAuditor(num) {
        // if (this.batchChangeFrom.userId == '' || this.batchChangeFrom.userId == undefined) {
        //   this.$message.warning('请选择人员！');
        //   return;
        // }

        let formData = new FormData;
        let ids = [];
        ids.push(this.batchChangeFrom.userId)
        formData.append('userIds', ids)
        formData.append('userType', num)
        formData.append('companyIds', this.batchChangeFrom.companyIds)
        batchFollowUser(formData).then(res => {
          if (res.code == 200) {
            this.$message.success('设置成功')
            this.personList = [];
            this.batchChangeFrom = {};

            if (num == 0) {
              this.dialogVisible = false
            } else if (num == 1) {
              this.projectDialogVisible = false;
            } else {
              this.auditDialogVisible = false;
            }
            // this.$store.commit('SET_CUSTOMER_SCROLL',0)
            this.getDetail()
          }
        })
      },
      // 关联项目人员
      changeProject() {
        this.projectDialogVisible = true
        this.getPersonList('项目员')
        this.batchChangeFrom = {};
        this.batchChangeFrom.companyName = this.ruleForm.companyName
        this.batchChangeFrom.projectMan = this.ruleForm.projectMan
        this.batchChangeFrom.companyIds = this.ruleForm.crmCompanyId
      },

      //设置项目人员
      relProject(num) {
        // if (this.batchChangeFrom.userId == '' || this.batchChangeFrom.userId == undefined) {
        //   this.$message.warning('请选择人员！');
        //   return;
        // }

        let formData = new FormData;
        let ids = [];
        ids.push(this.batchChangeFrom.userId)
        formData.append('userIds', ids)
        formData.append('userType', num)
        formData.append('companyIds', this.batchChangeFrom.companyIds)
        batchFollowUser(formData).then(res => {
          if (res.code == 200) {
            this.$message.success('设置成功')
            this.personList = [];
            this.batchChangeFrom = {};

            if (num == 0) {
              this.dialogVisible = false
            } else if (num == 1) {
              this.projectDialogVisible = false;
            } else {
              this.auditDialogVisible = false;
            }
            // this.$store.commit('SET_CUSTOMER_SCROLL',0)
            this.getDetail()
          }
        })
      },
      //关联知识产权工程师
      changeIntellectual() {
        this.intellectualDialogVisible = true
        this.getPersonList('专利员,专利主管')
        this.batchChangeFrom = {};
        this.batchChangeFrom.companyName = this.ruleForm.companyName
        this.batchChangeFrom.propertyMan = this.ruleForm.propertyMan
        this.batchChangeFrom.companyIds = this.ruleForm.crmCompanyId
      },

      //设置知识产权人员
      relIntellectual(num) {
        // if (this.batchChangeFrom.userId == '' || this.batchChangeFrom.userId == undefined) {
        //   this.$message.warning('请选择人员！');
        //   return;
        // }
        let formData = new FormData;
        let ids = [];
        ids.push(this.batchChangeFrom.userId)
        formData.append('userIds', ids)
        formData.append('userType', num)
        formData.append('companyIds', this.batchChangeFrom.companyIds)
        batchFollowUser(formData).then(res => {
          if (res.code == 200) {
            this.$message.success('设置成功')
            this.personList = [];
            this.batchChangeFrom = {};
            this.intellectualDialogVisible = false
            // this.$store.commit('SET_CUSTOMER_SCROLL',0)
            this.getDetail()
          }
        })
      },
      // 默认工时
      handleUpdateHour() {
        this.hourDialogVisible = true
        // getEntDefaultHour({ id: this.id }).then(res => {
        //   if (res.data.code === 1) {
        //     this.hourForm = res.data.data
        //     this.hourForm.id = this.id
        //   }
        // })
      },
      saveHourForm() {
        // saveEntDefaultHour(this.hourForm).then(response => {
        //   if (response.data.code === 1) {
        //     this.$message({
        //       message: '操作成功',
        //       type: 'success'
        //     })
        //     this.hourDialogVisible = false
        //   }
        // })
      },
      // 同步企业知识产权信息
      syncIpr() {
        let arr = [];
        let obj = {};
        obj.companyName = this.ruleForm.companyName
        obj.crmCompanyId = this.ruleForm.crmCompanyId
        arr.push(obj);

        this.$confirm('确定同步该企业的知识产权信息？').then(res => {
          batchQueryIntellectualPropertyRights({companyList: arr}).then(response => {
            if (response.code == 200) {
              this.$message.success(response.message);
              this.getDetail();
            }
          })
        })
      },
      /**
       * 同步立项--通过企业名称
       */
      syncPolicyApprovalListByCompanyName() {
        if (this.ruleForm && this.ruleForm.companyName) {
          queryPolicyApprovalListByCompanyName({companyName: this.ruleForm.companyName}).then(r => {
          })
        }
      },
      /**
       * 同步立项--通过企业Id
       */
      syncPolicyApprovalList(){
        this.$confirm('确定同步该企业的立项信息？').then(res => {
          queryPolicyApprovalList({companyIds: this.ruleForm.crmCompanyId}).then(response => {
            if (response.code == 200) {
              this.$message.success(response.message);
              this.getDetail();
            }
          })
        })
      },
      // 同步企查查基本信息
      goSyncBasicInfo() {
        var ids = []
        ids.push(this.ruleForm.crmCompanyId)
        this.$confirm('确定同步企查查基本信息？').then(_ => {
          var formData = new FormData
          formData.append('companyIds', ids)
          batchQueryCompanyInfoFromQichacha(formData).then(response => {
            if (response.code == 200) {
              this.$message({message: response.message, type: 'success'})
            } else {
              this.$message.error(response.message ? response.message : '同步失败！')
            }
          })
        })
      },
      // 投入公海
      handlePutIntoFreeSea() {
        this.$confirm('确定将该企业投入公海？').then(_ => {
          let ids = [];
          ids.push(this.ruleForm.crmCompanyId)
          let formData = new FormData;
          formData.append('crmCompanyIds', ids)
          putCompanyToFreeSea(formData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message ? res.message : '投入公海成功!')
              // this.$store.commit('SET_CUSTOMER_SCROLL',0)
              this.getDetail();
            } else {
              this.$message.error(res.message ? res.message : '投入公海失败!')
            }
          })
        })
      },

      //提交新建
      saveForm() {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (this.is_personal == true || this.is_personal == 'true') {
          if (this.ruleForm.companyName == '' || this.ruleForm.companyName == undefined) {
            this.$message.warning('请输入客户名称');
            return;
          }

          if (this.ruleForm.personnelMobile != '' && this.ruleForm.personnelMobile != undefined) {
            if (phoneReg.test(this.ruleForm.personnelMobile)) {
            } else {
              this.$message({type: 'warning', message: '电话号码格式不正确'})
              return;
            }
          }

        } else {
          // 统一社会信用代码正则表达验证
          const credit_code = /[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/;
          if (!credit_code.test(this.ruleForm.companyCode)) {
            this.$message.warning('请输入正确格式的统一社会信用代码');
            return;
          }

          if (this.ruleForm.companyName == '' || this.ruleForm.companyName == undefined) {
            this.$message.warning('请输入企业名称');
            return;
          }

          if (this.ruleForm.registerStatus == '' || this.ruleForm.registerStatus == undefined) {
            this.$message.warning('请选择登记状态');
            return;
          }
          if (this.ruleForm.companyClass == '' || this.ruleForm.companyClass == undefined) {
            this.$message.warning('请选择企业类型');
            return;
          }
          if (this.ruleForm.companyShortName == '' || this.ruleForm.companyShortName == undefined) {
            this.$message.warning('请输入公司简称');
            return;
          }
          if (this.ruleForm.companySalesName == '' || this.ruleForm.companySalesName == undefined) {
            this.$message.warning('请选择年销售额');
            return;
          }
          if (this.ruleForm.setupDate == '' || this.ruleForm.setupDate == undefined) {
            this.$message.warning('请输入成立时间');
            return;
          }

          if (this.ruleForm.registerMoney == '' || this.ruleForm.registerMoney == undefined) {
            this.$message.warning('请输入注册资本');
            return;
          }
          // if (this.ruleForm.realityCmoney == '' || this.ruleForm.realityCmoney == undefined) {
          //   this.$message.warning('请输入实缴资本');
          //   return;
          // }

          if (this.ruleForm.mainProducts == '' || this.ruleForm.mainProducts == undefined) {
            this.$message.warning('请输入主营产品');
            return;
          }
// console.log(this.ruleForm.provinceId ,'this.ruleForm.provinceId', this.ruleForm.cityId ,'this.ruleForm.cityId ' ,this.ruleForm.districtId , 'this.ruleForm.districtId',this.ruleForm.townId , 'this.ruleForm.townId', this.ruleForm.companyAddress , 'this.ruleForm.companyAddress'   )

          if (this.ruleForm.provinceId == '' || this.ruleForm.provinceId == undefined || this.ruleForm.cityId == '' || this.ruleForm.cityId == undefined || this.ruleForm.districtId == '' || this.ruleForm.districtId == undefined  || this.ruleForm.townId == '' || this.ruleForm.townId == undefined || this.ruleForm.companyAddress == '' || this.ruleForm.companyAddress == undefined   ) {
            this.$message.warning('请输入公司详细地址');
            return;
          }


          //联系人电话号码验证
          this.ruleForm.companyPersonnelDtoList = JSON.parse(JSON.stringify(this.contactsList))
          this.ruleForm.companyPersonnelDtoList.forEach((item, index) => {
            if (item.personnelName == '' && item.personnelMobile == '') {
              this.ruleForm.companyPersonnelDtoList.splice(index, 2)
            } else {
              if (item.personnelMobile != '') {
                if (item.personnelName != '' && item.personnelMobile == '') {
                  if (phoneReg.test(item.personnelMobile)) {
                  } else {
                    this.$message({type: 'warning', message: '电话号码为空或者格式不正确'})
                    throw new Error()
                  }
                }
              }

              // if (item.personnelName == '' && item.personnelMobile != '') {
              //   this.$message.warning('请填写联系人名称');
              //   throw new Error()
              // }
            }

          });
        }

        if (this.ruleForm.companyLevel == '' || this.ruleForm.companyLevel == undefined) {
          this.$message.warning('请选择客户级别');
          return;
        }

        if (this.ruleForm.companyTag && this.ruleForm.companyTag.length != 0) {
          this.ruleForm.companyTag = this.ruleForm.companyTag.join(',')
        } else {
          this.ruleForm.companyTag = ''
        }

        // this.ruleForm.companyOrPersonal = this.is_personal ? 1 : 0;
        this.ruleForm.registerMoney = this.ruleForm.registerMoney * 10000
        this.ruleForm.realityCmoney = this.ruleForm.realityCmoney * 10000

        //判断如果是新增客户的时候（1）
        if (this.ruleForm.companyOrPersonal == 1) {
          this.ruleForm = {
            companyId: this.$store.getters.companyId,
            companyName: this.ruleForm.companyName,
            companyLevel: this.ruleForm.companyLevel,
            companyOrPersonal: this.ruleForm.companyOrPersonal,
            companyPersonnelDtoList: [{
              personnelSex: this.ruleForm.personnelSex,
              personnelMobile: this.ruleForm.personnelMobile,
              birthDate: this.ruleForm.birthDate,
              idCard: this.ruleForm.idCard,
              nativePlace: this.ruleForm.nativePlace,
            }],
            provinceId: this.ruleForm.provinceId,
            cityId: this.ruleForm.cityId,
            districtId: this.ruleForm.districtId,
            townId: this.ruleForm.townId,
            companyAddress: this.ruleForm.companyAddress,
            industryInvolved: this.ruleForm.industryInvolved
          };
        };

        saveCrmCompanyInfo(this.ruleForm).then(response => {
          if (response.code == 200) {
            this.$message.success('新建成功');
            var companyName = this.ruleForm.companyName
            this.ruleForm = {
              page: 0,
              pageSize: 10
            }
            this.contactsList = [
              {personnelName: '', personnelMobile: ''},
              {personnelName: '', personnelMobile: ''}
            ];

            // 同步立项
            queryPolicyApprovalListByCompanyName({companyName: companyName}).then(res => {})

            this.$store.commit('SET_CUSTOMER_SCROLL',0)
            this.$store.commit('SET_CUSTOMER_PAGE', 0)
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/customer');
          } else {
            this.$message.warning(response.message)
          }
        })

        setTimeout(() => {
          this.ruleForm.registerMoney = this.ruleForm.registerMoney / 10000
          this.ruleForm.realityCmoney = this.ruleForm.realityCmoney / 10000
        }, 300)

      },
      // 取消
      cancel() {
        this.ruleForm = {
          page: 0,
          pageSize: 10
        }
        this.contactsList = [
          {personnelName: '', personnelMobile: ''},
          {personnelName: '', personnelMobile: ''}
        ];
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/customer');
      },
      // 页签点击事件
      handleTabClick(tab, event) {
        // 立项
        if (tab.name === 'first') {
          if (this.ruleForm.crmCompanyId) {
            this.getMaintenanceList()
          }
        }
        if (tab.name === 'second') { // 订单
          this.getOrderList()
        }
        if (tab.name === 'three') {
          this.getContract();
        }
        if (tab.name === 'five') {
          // console.log(tab.name)
        }
        if (tab.name === 'eleven') {
          if (this.ruleForm.crmCompanyId && this.shareholder_list.length < 1) {
            // enterpriseGetShareholder({ 'id': this.id }).then(response => {
            //   if (response.data.code === 1) {
            //     this.shareholder_list = response.data.data
            //   }
            // })
          }
        }
        if (tab.name === 'twelve') {
          if (this.ruleForm.crmCompanyId && this.dev_project_list.length < 1) {
            this.enterpriseGetDevelopProject()
          }
        }
        if (tab.name === 'thirteen') {
          if (this.id && !this.briefing_list) {
            // enterpriseGetIntroduce({ 'id': this.id }).then(response => {
            //   if (response.data.code === 1) {
            //     this.briefing_list = response.data.data
            //   }
            // })
          }
        }
      },
      // 获取立项列表
      getMaintenanceList() {
        this.mainForm.crmCompanyId = this.ruleForm.crmCompanyId
        queryCompanyDetailApprovalListInfo(this.mainForm).then(res => {
          if (res.code == 200) {
            if (this.mainForm.page > 0) {
              this.maintenanceList = this.maintenanceList.concat(res.data.data);
            } else {
              this.maintenanceList = res.data.data;
            }

            this.mainTotal = res.data.total;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //导出立项
      exportApproval(){
        this.mainForm.crmCompanyId = this.ruleForm.crmCompanyId
        this.mainForm.page = 0;
        this.mainForm.pageSize = this.mainTotal;

        if(this.approvalCheckList.length != 0){
          this.mainForm.approvalIds = this.approvalCheckList;
        }else{
          this.mainForm.approvalIds = [];
        }
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportCompanyDetailApprovalListInfo(this.mainForm).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-立项列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close();

              this.mainForm.page = 0;
              this.mainForm.pageSize = 20;
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //立项全选
      allApprovalSelect() {
        if (this.isCheckAll) {
          this.approvalCheckList = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.maintenanceList.forEach(function (item, index) {
            if (_this.approvalCheckList.indexOf(item.approvalId) === -1) {
              _this.approvalCheckList.push(item.approvalId)
            }
            _this.isCheckAll = true
          })
        }
      },

      //打开新建立项弹窗
      openAddApproval() {
        this.addApprovalData = [{}];
        this.getProjectList();
        this.addApprovalDialogVisible = !this.addApprovalDialogVisible
      },
      // 选择项目时区获取它的最大批次
      changeProjectName(data) {
        this.projectList.forEach(item => {
          if (item.projectName == data.projectName ){
            data.projectId = item.projectId
          }
        })
        // 获取当前行的最大批次
        this.getThisRowMax(data)
      },

      // 获取当前行的最大批次
      getThisRowMax(data) {
        var rowBatchNoList = [{'label': '未指定', 'value': 0},]
        queryProjectMaxBatch({projectId: data.projectId}).then(res => {
          if (res.data > 0) {
            for (var i=1; i< res.data + 1; i++) {
              rowBatchNoList.push({'label': '第' + i + '批', 'value':i},)
            }
          }
        })
        this.$set(data, 'batchNoList', rowBatchNoList)
      },

      //新增一条
      addLine() {
        let data = {}
        this.addApprovalData.push(data)
      },

      //删除一条立项
      deleteApproval(index) {
        this.addApprovalData.splice(index, 1)
      },

      //选择立项
      checkApprovalChange(e,item){
        if(e == true){
          this.holdDelList.push(item)
        }else{
          this.holdDelList.forEach((data,index)=>{
            if(data.approvalId == item.approvalId){
              this.holdDelList.splice(index,1)
            }
          })
        }

        //去重
        let obj = {}
        this.holdDelList = this.holdDelList.reduce((cur, next) => {
          obj[next.approvalId] ? '' : obj[next.approvalId] = true && cur.push(next)
          return cur
        }, [])
      },

      //批量删除立项
      batchDeleteApproval() {
        if (this.approvalCheckList.length == 0) {
          this.$message.warning('请最少选择一条数据');
          return;
        }

        this.holdDelList.forEach(item=>{
          if(item.orderId){
            this.$message({
              type: 'error',
              message: '选择的立项中有关联订单，无法删除'
            });

            throw new Error()
          }
        })

        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePolicyApproval({approvalIds: this.approvalCheckList}).then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功！');
              this.approvalCheckList = [];
              this.mainForm.page = 0;
              this.getMaintenanceList()
            } else {
              this.$message.warning(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //新增立项
      addApproval() {
        this.addApprovalData.forEach(item => {
          this.$set(item, 'companyId', this.ruleForm.crmCompanyId)
          this.$set(item, 'companyName', this.ruleForm.companyName)
          if (item.projectName == '' || item.projectName == undefined) {
            this.$message.warning('项目名不能为空');
            throw new Error();
          }
          if (item.projectYear == '' || item.projectYear == undefined) {
            this.$message.warning('年度不能为空');
            throw new Error();
          }
        })
        addPolicyApproval(this.addApprovalData).then(res => {
          if (res.code == 200) {
            this.$message.success('新增成功');
            this.addApprovalDialogVisible = false;
            this.mainForm.page = 0;
            this.getMaintenanceList()
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //查看立项详情
      goApprovalDetail(id) {
        this.$router.push({
          path: '/approvalCollaborative/approvalDetail',
          query: {
            approvalId: id,
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
          this.getProjectList()
        }, 200)
      },
      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      // 更改订单工程师
      changeProjectUser(item) {
        this.changeVisible = true
        this.personList = [];
        this.batchChangeFrom = {};
        if (item.orderType == 0 || item.orderType == 1) {
          this.getPersonList('项目员')
        } else {
          this.getPersonList('审计员')
        }

        this.batchChangeFrom.orderList = [];
        item.crmCompanyId = this.ruleForm.crmCompanyId;
        this.batchChangeFrom.assignType = item.orderType
        this.batchChangeFrom.orderList.push(item)
      },

      //指派工程师提交
      saveProjectUser() {
        // 保存更改的项目员
        let params = {
          assignType: 1,
          assignUserId: this.batchChangeFrom.assignUserId,
          crmOrderDtoList: this.batchChangeFrom.orderList
        }
        assignOrderEngineer(params).then(res => {
          if (res.code == 200) {
            this.changeVisible = false;
            this.$message.success('指派成功!')
            // this.$store.commit('SET_CUSTOMER_SCROLL',0)
            this.getDetail();
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (this.allowGetRoleUserList.twoAllow) {
          queryUserComboInfo(formData).then(res => {
            if (res.code == 200) {
              this.personList = res.data;
            } else {
              this.$message.warning(res.message)
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取角色用户列表')
        }
      },

      // 编辑状态
      handleState(item) {
        this.visible = true
        this.stateForm.id = item.biz_id
        this.getState()
      },
      getState() {
        // 获取当前订单状态
        // getState(this.stateForm).then(response => {
        //   if (response.data.code === 1) {
        //     this.stateForm = response.data.data
        //     this.order_state_list = response.data.order_state_list
        //   }
        // })
      },

      //更新状态提交
      goEditState() {
        if (this.stateForm.process_state !== 0 && !this.stateForm.process_state_remarks) {
          this.$message.error('订单状态不为正常时需要添加备注信息')
          return
        }
        // editProcessState(this.stateForm).then(response => {
        //   if (response.data.code === 1) {
        //     this.$message.success('修改成功')
        //     this.stateForm = {}
        //     this.visible = false
        //     this.getEntOrderList()
        //   }
        // })
      },
      // 抢公海中客户
      grabFreeSeaCustomer(id) {
        this.$confirm('确定抢此客户?').then(_ => {
          let formData = new FormData;
          formData.append('companyIds', id)
          batchGrabCompany(formData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.data.message ? res.data.message : '抢客户成功!')
              // this.listQuery.page = 0;
              // this.$store.commit('SET_CUSTOMER_SCROLL',0)
              this.getDetail();
            } else {
              this.$message.error(res.data.messages ? res.data.messages : '抢客户失败!')
            }
          })
        })
      },
      // 拉企查查数据
      syncQccBasicInfo() {
        if (this.ruleForm.companyName == undefined || this.ruleForm.companyName == '') {
          this.$message.warning('请输入客户名称！')
          return;
        }

        let params = {
          companyName: this.ruleForm.companyName,
          companyId: ''
        }
        queryCompanyInfoFromQichacha(params).then(res => {
          if (res.code == 200) {
            this.ruleForm = res.data;
            if (this.is_personal == true || this.is_personal == 'true') {
              this.ruleForm.companyOrPersonal = 1;
            } else {
              this.ruleForm.companyOrPersonal = 0;
            }
            this.$message.success('同步成功,核对无误并完善后请保存!')
          } else {
            this.$message.error(res.message)
          }
        })

        // if (this.ruleForm.companyCode == '' || this.ruleForm.companyCode == undefined) {
        //   this.$message.warning('请输入社会统一信用代码！')
        //   return;
        // }
      },
      // 研发项目列表
      enterpriseGetDevelopProject() {
        // enterpriseGetDevelopProject({ 'id': this.id }).then(response => {
        //   if (response.data.code === 1) {
        //     this.dev_project_list = response.data.data
        //   }
        // })
      },
      //  切换新增个人客户或者新增客户
      changeType() {
        this.is_personal = !this.is_personal
        this.ruleForm = {}
        if (this.is_personal == false) {
          this.ruleForm.companyOrPersonal = 0;
          this.$router.push({'path': '/customer/addCustomer', 'query': {'is_personal': this.is_personal}})
        } else {
          this.ruleForm.companyOrPersonal = 1;
          this.$router.push({'path': '/customer/addCustomerPerson', 'query': {'is_personal': this.is_personal}})
        }
      },
      // 设置渠道
      setChannel() {
        this.$confirm('确定将客户设置为渠道身份?').then(_ => {
          let formData = new FormData;
          formData.append('crmCompanyIds', [this.ruleForm.crmCompanyId]);
          formData.append('isProxy', 1);
          updateCrmCompanyIsProxy(formData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message ? res.message : '操作成功!')
              // this.$store.commit('SET_CUSTOMER_SCROLL',0)
              this.getDetail()
            }
          })
        })
      },
      cancelSetChannel() {
        this.$confirm('确定取消客户的渠道身份?').then(_ => {
          let formData = new FormData;
          formData.append('crmCompanyIds', [this.ruleForm.crmCompanyId]);
          formData.append('isProxy', 0);
          updateCrmCompanyIsProxy(formData).then(res => {
            if (res.code == 200) {
              this.$message.success(res.message ? res.message : '操作成功!')
              // this.$store.commit('SET_CUSTOMER_SCROLL',0)
              this.getDetail()
            }
          })
        })
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'ENTERPRISE_REGISTRATION_STATUS,DICT:CUSTOMER_LEVEL,DICT:ANNUAL_SALES,DICT:STAFF_SIZE,DICT:INDUSTRY_INVOLVED,DICT:COMPANY_TYPE,DICT:TECHNOLOGY_TYPE',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.regist_status_list = res.data['ENTERPRISE_REGISTRATION_STATUS'];
            this.customer_classification_list = res.data['DICT:CUSTOMER_LEVEL'];
            // this.enterprise_annual_sales_list = res.data['DICT:ANNUAL_SALES'];
            this.employee_scale_list = res.data['DICT:STAFF_SIZE'];
            this.industry_involved_list = res.data['DICT:INDUSTRY_INVOLVED'];
            this.companyTypeList = res.data['DICT:COMPANY_TYPE'];
            this.companyTagList = res.data['DICT:TECHNOLOGY_TYPE']
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取地区信息
      getRegionList(level, parent) {
        let params = {
          level: level,
          parentId: parent
        }
        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (level == 3) {
              this.province_list = res.data
            }
            if (level == 2) {
              this.city_list = res.data
            }
            if (level == 1) {
              this.district_list = res.data
            }
            if (level == 0) {
              this.town_list = res.data
            }
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //查询客户详情-合同信息
      getContract() {
        this.contractForm.crmCompanyId = this.ruleForm.crmCompanyId
        queryCompanyDetailContractInfo(this.contractForm).then(res => {
          if (res.code == 200) {
            if (this.contractForm.page > 0) {
              this.contractList = this.contractList.concat(res.data.data);
            } else {
              this.contractList = res.data.data;
            }
            this.contractTotal = res.data.total;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //导出合同
      exportContractList(){
        this.contractForm.page = 0;
        this.contractForm.pageSize = this.contractTotal
        this.contractForm.contractIds = [];
        this.contractForm.exportCompanyId = this.contractForm.crmCompanyId
        exportContract(this.contractForm).then(res => {
          if (res.code === 200) {
            downloadCrm({fileName: res.message, delete: true}).then(response => {
              this.contractForm.contractIds = [];
              const url = window.URL.createObjectURL(response)
              let a = document.createElement('a')
              document.body.appendChild(a)
              let date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()
              const fileName = date + '-合同列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url);
              this.$message({
                type: 'success',
                message: '操作成功！'
              });

              this.contractForm.page = 0;
              this.contractForm.pageSize = 20
            })
          }
        })
      },

      //跳转查看合同
      goCheckContract(id) {
        this.$router.push({
          path: '/contract/checkContract',
          query: {
            contractId: id,
            isCheck: true
          }
        })
      },

      //跳转编辑合同
      goEditContract(id) {
        this.$router.push({
          path: '/contract/checkContract',
          query: {
            contractId: id,
          }
        })
      },

      //查看订单
      goOrderDetail(id) {
        this.$router.push({
          path: '/declareCoordination/orderManage/orderDetail',
          query: {
            orderId: id,
            isCheck: true
          }
        })
      },

      //获取订单列表
      getOrderList() {
        this.orderForm.crmCompanyId = this.ruleForm.crmCompanyId
        queryCompanyDetailOrderInfo(this.orderForm).then(res => {
          if (res.code == 200) {
            if (this.orderForm.page > 0) {
              this.orderList = this.orderList.concat(res.data.data);
            } else {
              this.orderList = res.data.data;
            }

            this.orderTotal = res.data.total;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //导出订单
      handleExport() {
        this.orderForm.pageSize = this.orderTotal
        this.orderForm.page = 0
        this.orderForm.companyId = this.contractForm.crmCompanyId

        // let orderIds = []
        // this.orderList.forEach(item=>{
        //   orderIds.push(item.orderId)
        // })
        // this.orderForm.orderIds = orderIds;

        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...'
        })
        exportCompanyDetailOrderInfo(this.orderForm).then(res => {
          if (res.code == 200) {
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-订单列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close()

              this.orderForm.pageSize = 20
              this.orderForm.page = 0
            })
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //加载更多 0-合同 1-订单 2-立项
      getMore(num) {
        if (num == 0) {
          this.contractForm.page = this.contractForm.page + 20;
          this.getContract();
        }
        if (num == 1) {
          this.orderForm.page = this.orderForm.page + 20;
          this.getOrderList();
        }
        if (num == 2) {
          this.mainForm.page = this.mainForm.page + 20;
          this.getMaintenanceList();
        }
      },

      //获取专利总数
      getPatentTotal(val) {
        this.patentTotal = val
      },
      //获取销售跟进总数
      getSalesTotal(val) {
        this.salesTotal = val
      },

      //获取商标总数
      getTrademarkTotal(val) {
        this.trademarkTotal = val
      },
      //获取著作权总数
      getCopyrightTotal(val) {
        this.copyrightTotal = val
      },
      //获取证书总数
      getCertificateTotal(val) {
        this.certTotal = val
      },
      //获取账号总数
      getAccountTotal(val) {
        this.accountTotal = val
      },
      //获取项目规划总数
      getProjectPlanTotal(val) {
        this.projectPlanTotal = val
      },
      //限制输入 num:1 去掉小数点
      inputXz(e, num) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        if (num) {
          e.target.value = e.target.value.replace('.', '');
          if (num == 1) {
            this.$set(this.ruleForm, 'socialSecurityNum', e.target.value)
          }
          // if(num == 2){
          //   this.$set(this.ruleForm,'registerMoney',e.target.value)
          // }
        }
      },

      //选择年销售额
      companySaleChange(e) {
        if (e != '') {
          this.enterprise_annual_sales_list.forEach(item => {
            if (item.value == e) {
              this.ruleForm.companySales = item.min;
              this.ruleForm.companySalesMax = item.max;
            }
          })
        } else {
          this.ruleForm.companySales = '';
          this.ruleForm.companySalesMax = '';
        }
      },
      // 客户综合信息表
      goEnterpriseComplexInfo() {
        this.complexInfoVisible = true
      },
      //选择文档类型
      handleEnterpriseComplexInfo() {
        this.complexInfoForm.companyId = this.$route.query.id;
        createCompanyComplexInfo(this.complexInfoForm).then(res => {
          if (res.code === 200) {
            this.complexInfoVisible = false
            let url = res.data.replace(/http/,'https')
            window.open(url)
          }
        })
      },

      //联系人新增/编辑提交
      contactsUserSubmit() {
        this.$refs.contactsUser.validate((valid) => {
          if (valid) {
            let isPhone = /^1[3-9]\d{9}$/;
            let isMob = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;

            //判断手机
            if (isMob.test(this.contactsUserFrom.personnelMobile) || isPhone.test(this.contactsUserFrom.personnelMobile)) {

            } else {
              this.$message.warning('请输入正确的手机号码或座机');
              return false
            }

            this.contactsUserFrom.companyId = this.ruleForm.crmCompanyId
            if (!this.isContactEdit) {
              saveCrmCompanyPersonnel(this.contactsUserFrom).then(res => {
                if (res.code === 200) {
                  this.$message.success('新增成功');
                  this.contactsUserFrom = {};
                  this.getContactUserData();
                  this.contactsUserVisible = false;
                }
              })
            } else {
              updateCrmCompanyPersonnel(this.contactsUserFrom).then(res => {
                if (res.code === 200) {
                  this.$message.success('修改成功');
                  this.contactsUserFrom = {};
                  this.getContactUserData();
                  this.contactsUserVisible = false;
                }
              })
            }
          }
        })
      },

      //删除联系人
      delContanctHandle(val) {
        this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let arr = [];
          arr.push(val.personnelId)
          delCrmCompanyPersonnelByIds(arr).then(res => {
            if (res.code === 200) {
              this.getContactUserData();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },


      //联系人点击新增/编辑
      addEditContactHandle(val, data) {
        this.isContactEdit = val;

        //当点击编辑
        if (val) {
          this.contactsUserFrom = JSON.parse(JSON.stringify(data));
        }
        this.contactsUserVisible = true;
      },

      //联系人弹窗取消
      cananlContact() {
        this.contactsUserFrom = {};
        this.contactsUserVisible = false;
      },

      //获取联系人数据
      getContactUserData() {
        this.contactListParams.companyId = this.ruleForm.crmCompanyId;
        queryCrmCompanyPersonnelList(this.contactListParams).then(res => {
          if (res.code === 200) {
            this.contactsUserTotal = res.data.total;

            if (this.contactListParams.page > 0) {
              this.contactsUserData = this.contactsUserData.concat(res.data.data);
              this.contactsUserTotal = res.data.total;
            } else {
              this.contactsUserData = res.data.data;
              this.contactsUserTotal = res.data.total;
            }
          }
        })
      },

      //导出联系人列表
      exportContactList(){
        this.contactListParams.crmCompanyId = this.ruleForm.crmCompanyId;
        this.contactListParams.page = 0;
        this.contactListParams.pageSize = this.contactsUserTotal;

        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportCrmCompanyPersonnelList(this.contactListParams).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-联系人列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close();
              this.contactListParams.page = 0;
              this.contactListParams.pageSize = 20;
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },


      //联系人加载更多
      contactUserGetMore() {
        this.contactListParams.page += 20;
        if (this.contactsUserData.length < this.contactsUserTotal) {
          this.getContactUserData();
        }
      },


      //人员统计--获取列表数据
      // getCompanyList() {
      //   this.listParams = {page: 0, pageSize: 20};
      //   this.listParams.crmCompanyId = this.ruleForm.crmCompanyId;
      //   if (this.ruleForm.isContractListSkipFlag) {
      //     this.listParams.isContractListSkipFlag = Number(this.ruleForm.isContractListSkipFlag);
      //   }
      //   queryCrmCompanyInfo(this.listParams).then(res => {
      //     if (res.code === 200) {
      //       this.listData = JSON.parse(JSON.stringify(res.data.data[0]));
      //       this.poroleForm = res.data.data[0];
      //
      //       if (!res.data.data[0].socialSecurityNum || res.data.data[0].socialSecurityNum == "") {
      //         this.$set(this.poroleForm, 'socialSecurityNum', 0)
      //       }
      //       if (!res.data.data[0].technologyNum || res.data.data[0].technologyNum == "") {
      //         this.$set(this.poroleForm, 'technologyNum', 0)
      //       }
      //       if (!res.data.data[0].collegeNum || res.data.data[0].collegeNum == "") {
      //         this.$set(this.poroleForm, 'collegeNum', 0)
      //       }
      //       if (!res.data.data[0].universityNum || res.data.data[0].universityNum == "") {
      //         this.$set(this.poroleForm, 'universityNum', 0)
      //       }
      //       if (!res.data.data[0].masterNum || res.data.data[0].masterNum == "") {
      //         this.$set(this.poroleForm, 'masterNum', 0)
      //       }
      //       if (!res.data.data[0].doctorNum || res.data.data[0].doctorNum == "") {
      //         this.$set(this.poroleForm, 'doctorNum', 0)
      //       }
      //       if (!res.data.data[0].lowLevelNum || res.data.data[0].lowLevelNum == "") {
      //         this.$set(this.poroleForm, 'lowLevelNum', 0)
      //       }
      //       if (!res.data.data[0].midLevelNum || res.data.data[0].midLevelNum == "") {
      //         this.$set(this.poroleForm, 'midLevelNum', 0)
      //       }
      //       if (!res.data.data[0].highLevelNum || res.data.data[0].highLevelNum == "") {
      //         this.$set(this.poroleForm, 'highLevelNum', 0)
      //       }
      //     }
      //   })
      // },


      //人员统计--保存
      // handleUpdate() {
      // this.poroleForm.crmCompanyId = this.ruleForm.crmCompanyId;
      // if (this.poroleForm.socialSecurityNum == "") {
      //   this.poroleForm.socialSecurityNum = 0;
      // }
      // if (this.poroleForm.technologyNum == "") {
      //   this.poroleForm.technologyNum = 0;
      // }
      // if (this.poroleForm.collegeNum == "") {
      //   this.poroleForm.collegeNum = 0;
      // }
      // if (this.poroleForm.universityNum == "") {
      //   this.poroleForm.universityNum = 0;
      // }
      // if (this.poroleForm.masterNum == "") {
      //   this.poroleForm.masterNum = 0;
      // }
      // if (this.poroleForm.doctorNum == "") {
      //   this.poroleForm.doctorNum = 0;
      // }
      // if (this.poroleForm.lowLevelNum == "") {
      //   this.poroleForm.lowLevelNum = 0;
      // }
      // if (this.poroleForm.midLevelNum == "") {
      //   this.poroleForm.midLevelNum = 0;
      // }
      // if (this.poroleForm.highLevelNum == "") {
      //   this.poroleForm.highLevelNum = 0;
      // }

      // this.ruleForm
      // updateCrmCompanyPersonnelStatistics(this.poroleForm).then(res => {
      //   if (res.code === 200) {
      //     // this.$message.success(res.data.message ? res.data.message : '保存成功!')
      //     this.getCompanyList()
      //   }
      // })
      // },

      //初始化在报项目图标
      getAppliingEchart(){
        echarts.init(document.getElementById('echart1')).setOption({
          title: {
            //百分比
            text: `${70}%`,
            textStyle: {
              color: '#05AAFF',
              fontSize: 14,
              fontWeight: 400,
            },
            //标题
            subtext: '项目进度',
            subtextStyle: {
              color: 'rgba(68,68,68,0.60)',
              fontSize: 12,
              // width: 10,
              wordWrap: 'break-word',
              wordBreak: 'normal'
            },
            itemGap: 3, // 主副标题距离
            left: 'center',
            top: 'center'
          },
          angleAxis: {
            max: 100, // 满分
            clockwise: true, // 逆时针
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'category',
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          polar: {
            center: ['50%', '50%'],
            radius: '170%' //图形大小
          },
          series: [{
            type: 'bar',
            data: [{
              value: 70,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    // color: '#5883FF'
                    color: '#5883FF'
                  }, {
                    offset: 1,
                    color: '#69CCFF'
                  }])
                }
              },
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 2,
          }, { // 灰色环
            type: 'bar',
            data: [{
              value: 100,
              itemStyle: {
                normal: {
                  color: '#DBF1FC'
                },
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 5,
                shadowOffsetY: 2
              }
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 1
          }]
        })
      },

      //初始化未报项目图标
      getNotApplyEchart(){
        echarts.init(document.getElementById('echart4')).setOption({
          title: {
            //百分比
            text: `${70}%`,
            textStyle: {
              color: '#444444',
              fontSize: 14,
              fontWeight: 400,
            },
            //标题
            subtext: '符合度',
            subtextStyle: {
              color: 'rgba(68,68,68,0.60)',
              fontSize: 12,
              // width: 10,
              wordWrap: 'break-word',
              wordBreak: 'normal'
            },
            itemGap: 3, // 主副标题距离
            left: 'center',
            top: 'center'
          },
          angleAxis: {
            max: 100, // 满分
            clockwise: true, // 逆时针
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'category',
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          polar: {
            center: ['50%', '50%'],
            radius: '170%' //图形大小
          },
          series: [{
            type: 'bar',
            data: [{
              value: 70,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    // color: '#5883FF'
                    color: '#FE4E7E'
                  }, {
                    offset: 1,
                    color: '#F56C6C'
                  }])
                }
              },
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 2,
          }, { // 灰色环
            type: 'bar',
            data: [{
              value: 100,
              itemStyle: {
                normal: {
                  color: '#FCEEF1'
                },
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 5,
                shadowOffsetY: 2
              }
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 1
          }]
        })
      },

      //初始化可报项目图标
      getCanApplyEchart(){
        echarts.init(document.getElementById('echart3')).setOption({
          title: {
            //百分比
            text: `${70}%`,
            textStyle: {
              color: '#369F4A',
              fontSize: 14,
              fontWeight: 400,
            },
            //标题
            subtext: '符合度',
            subtextStyle: {
              color: 'rgba(68,68,68,0.60)',
              fontSize: 12,
              // width: 10,
              wordWrap: 'break-word',
              wordBreak: 'normal'
            },
            itemGap: 3, // 主副标题距离
            left: 'center',
            top: 'center'
          },
          angleAxis: {
            max: 100, // 满分
            clockwise: true, // 逆时针
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'category',
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          polar: {
            center: ['50%', '50%'],
            radius: '170%' //图形大小
          },
          series: [{
            type: 'bar',
            data: [{
              value: 70,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    // color: '#5883FF'
                    color: '#48D462'
                  }, {
                    offset: 1,
                    color: '#05AAFF'
                  }])
                }
              },
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 2,
          }, { // 灰色环
            type: 'bar',
            data: [{
              value: 100,
              itemStyle: {
                normal: {
                  color: '#E3FBE8'
                },
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 5,
                shadowOffsetY: 2
              }
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 1
          }]
        })
      },

      //初始化已报项目图标
      getAppliedEchart(){
        echarts.init(document.getElementById('echart2')).setOption({
          title: {
            //百分比
            text: `${70}%`,
            textStyle: {
              color: '#FFA96A',
              fontSize: 14,
              fontWeight: 400,
            },
            //标题
            subtext: '已立项',
            subtextStyle: {
              color: 'rgba(68,68,68,0.60)',
              fontSize: 12,
              // width: 10,
              wordWrap: 'break-word',
              wordBreak: 'normal'
            },
            itemGap: 3, // 主副标题距离
            left: 'center',
            top: 'center'
          },
          angleAxis: {
            max: 100, // 满分
            clockwise: true, // 逆时针
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'category',
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          polar: {
            center: ['50%', '50%'],
            radius: '170%' //图形大小
          },
          series: [{
            type: 'bar',
            data: [{
              value: 70,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    // color: '#5883FF'
                    color: '#FFA96A'
                  }, {
                    offset: 1,
                    color: '#FE4E7E'
                  }])
                }
              },
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 2,
          }, { // 灰色环
            type: 'bar',
            data: [{
              value: 100,
              itemStyle: {
                normal: {
                  color: 'rgba(255,169,106,0.16)'
                },
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 5,
                shadowOffsetY: 2
              }
            }],
            hoverAnimation: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 15,
            barGap: '-100%', // 两环重叠
            z: 1
          }]
        })
      },

      //获取相关政策列表
      getRelevantNoticeList(projectId){
        queryProjectRelatedPolicy({projectId: projectId, companyId: this.ruleForm.crmCompanyId}).then(res=>{
          if(res.code == 200){
            // console.log(res.data,"==========>"),
            this.policyList = res.data;
            // this.$set(this.brieform, 'policyList', res.data)
          }
        })
      },

      //获取已报项目信息
      getProjectMsg(projectId,orderId){
        queryYiBaoProjectInfo({crmCompanyId:this.$route.query.id,projectId:projectId,orderId:orderId}).then(res=>{
          if(res.code == 200){
            this.approvalMsg = res.data;
          }
        })
      },

      //获取订单详情
      getOrderDetail(orderId) {
        if (!this.allowOrderDetail.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取此详情');
          return;
        }
        queryOrderDetail({orderId: orderId}).then(res => {
          if (res.code == 200) {
            this.orderDetailForm = res.data;
            if(res.data.engineerUserId){
              this.orderDetailForm.holdEngineerUserId = JSON.parse(JSON.stringify(res.data.engineerUserId));
            }

            this.$set(this.orderDetailForm, 'applyBatchNo', res.data.batch)
            this.userFlowList = [];

            if(JSON.stringify(this.orderDetailForm.workOrderProcessVoMap) != '[]'){
              let list = [];
              for(let key in this.orderDetailForm.workOrderProcessVoMap){
                list.push(this.orderDetailForm.workOrderProcessVoMap[key])
              }

              for(var i=list.length-1;i>=0;i--){
                //通过数组i的倒序调用，实现结果的倒序输出。
                this.userFlowList.push(list[i])
              }

              let arr = [];

              this.userFlowList.forEach(flow=>{
                let sendTimeIng = 0

                if (flow.orderProcessVoList.length > 0) {
                  flow.holdProcessList = JSON.parse(JSON.stringify(flow.orderProcessVoList))
                  flow.firstFlow = flow.orderProcessVoList.splice(0, 1)
                  flow.lastFlow = flow.orderProcessVoList.splice(flow.orderProcessVoList.length - 1, 1)
                  // if(flow.lastFlow[0].nodeName == '结束'){
                  //   if(flow.lastFlow[0].signTime){
                  //     flow.endProcess = true;
                  //   }
                  // }

                  arr.push(flow.holdProcessList[flow.holdProcessList.length - 1])
                  flow.orderProcessVoList.forEach((item, index) => {
                    // if(flow.firstFlow[0].signTime){
                    //   flow.userName = item.userName;
                    // }

                    if (item.signTime && !item.sendTime) {
                      flow.userName = item.userName
                      flow.signTime = item.signTime
                    }

                    if (flow.lastFlow[0].signTime) {
                      flow.userName = item.userName
                    }

                    // if(flow.orderProcessVoList[index-1] && flow.orderProcessVoList[index-1].userId == this.$store.getters.userId){
                    //   item.isPrevMyself = true
                    // }

                    flow.workId = item.workId
                    this.$set(item, 'closePro', false)
                    if (item.fileIds && item.fileIds != '') {
                      let fileIds = item.fileIds.split(',')
                      this.getFileDetail(fileIds, item)
                    }
                  })

                  var num
                  flow.orderProcessVoList = flow.orderProcessVoList.filter(function(item, index) {
                    if (item.needCheck == 1 && item.needRecheck == 1) {
                      if ((item.checkResult == 2 || item.recheckResult == 2) && item.goToType != 2) {
                        num = JSON.parse(JSON.stringify(index))
                      }
                    }

                    if (item.needCheck == 1 && item.needRecheck == 2) {
                      if (item.recheckResult == 2 && item.goToType != 2) {
                        num = JSON.parse(JSON.stringify(index))
                      }
                    }
                    if (item.sendTime != '' && item.sendTime != undefined) {
                      item.sendTime = item.sendTime.substring(0, 10)
                    } else {

                      if (sendTimeIng == 0) {
                        item.sendTime = '进行中...'
                        sendTimeIng = 1
                      } else {
                        item.sendTime = '未开始'
                      }

                      if (item.checkResult == 2) {
                        item.sendTime = item.checkTime.substring(0, 10)

                        // console.log("==>")
                      }

                    }

                    if (item.needCheck == 1 && item.needRecheck == 0) {
                      if (item.checkResult == 2 && item.goToType != 2) {
                        num = JSON.parse(JSON.stringify(index))
                      }
                    }

                    if (num != '' && num != undefined) {
                      return (item.sendTime && item.signTime) || (!item.sendTime && item.signTime)
                    } else {
                      return item
                    }
                  })
                }
              })

              if(arr.length != 0){
                let newarr = arr.every((key,index,arr)=>{
                  return key.signTime;
                })
                if(newarr == true){
                  this.endProcess = true;
                }
              }

              if(this.processWorkId == ''){
                this.processForm = this.userFlowList[0]
                this.processWorkId = this.userFlowList[0].workId
              }
            }else{
              this.processForm = '';
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //选择处理人切换流程
      changeProcessUser(e){
        this.userFlowList.forEach(item=>{
          if(item.workId == e){
            this.processForm = item
          }
        })
      },

      //根据文件id获取文件详情
      getFileDetail(fileIds,item) {
        getFileListWithFileIds({fileIds: fileIds, haveView: false}).then(res => {
          if (res.code == 200) {
            this.$set(item,'fileList', res.data)
            // item.fileList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //下载文件
      downloadFile(file) {
        if (file.filePath) {
          ossFileSystemFileDownload(file).then(res => {
            if (res.code == 200) {
              let url = res.data.replace(/http/,'https')
              window.open(url)
              // this.$message.success('下载成功')
            }
          })
        }
      },

      //获取项目申请情况表数据
      getCompanyProjectData(){
        queryCompanyProjectDeclare({crmCompanyId: this.ruleForm.crmCompanyId}).then(res=>{
          if(res.code == 200){
            this.companyProjectDeclare = res.data

            if(this.companyProjectDeclare.weiBaoNum != 0){
              this.getProjectBrief(this.companyProjectDeclare.weiBaoList[0].projectId)
              this.$set(this.companyProjectDeclare.weiBaoList[0], 'active', true)
              this.showType = 1;
              // this.getNotApplyEchart();
              this.getRelevantNoticeList(this.companyProjectDeclare.weiBaoList[0].projectId);
            }else if(this.companyProjectDeclare.keBaoNum != 0){
              this.getProjectBrief(this.companyProjectDeclare.keBaoList[0].projectId)
              this.$set(this.companyProjectDeclare.keBaoList[0], 'active', true)
              this.showType = 2;
              // this.getCanApplyEchart();
              this.getRelevantNoticeList(this.companyProjectDeclare.keBaoList[0].projectId);
            }else if(this.companyProjectDeclare.zaiBaoNum != 0){
              this.getProjectBrief(this.companyProjectDeclare.zaiBaoList[0].projectId)
              this.$set(this.companyProjectDeclare.zaiBaoList[0], 'active', true)
              this.showType = 3;
              // this.getAppliingEchart()
              this.getOrderDetail(this.companyProjectDeclare.zaiBaoList[0].orderId);
            }else if(this.companyProjectDeclare.yiBaoNum != 0){
              this.getProjectBrief(this.companyProjectDeclare.yiBaoList[0].projectId)
              this.$set(this.companyProjectDeclare.yiBaoList[0], 'active', true)
              this.showType = 4;
              // this.getAppliedEchart()
              this.getProjectMsg(this.companyProjectDeclare.yiBaoList[0].projectId,this.companyProjectDeclare.yiBaoList[0].orderId)
            }

            // console.log('sss',this.brieform)
          }
        })
      },

      //获取立项申报详情
      getProjectBrief(projectId){
        queryProjectDeclareInfo({projectId: projectId}).then(res=>{
          if(res.code == 200){
            this.brieform = res.data
          }
        })
      },

      // 1:未报 2：可报 3：在报 4：已报
      showProjectBrief(item,type){
        this.companyProjectDeclare.weiBaoList.forEach(list=>{
          if(list.active == true){
            this.$set(list, 'active', false)
          }
        })
        this.companyProjectDeclare.zaiBaoList.forEach(list=>{
          if(list.active == true){
            this.$set(list, 'active', false)
          }
        })
        this.companyProjectDeclare.keBaoList.forEach(list=>{
          if(list.active == true){
            this.$set(list, 'active', false)
          }
        })
        this.companyProjectDeclare.yiBaoList.forEach(list=>{
          if(list.active == true){
            this.$set(list, 'active', false)
          }
        })
        if(item){
          this.$set(item, 'active', true)
          this.showType = item.type;
          this.brieform = {};
          this.getProjectBrief(item.projectId);

          if(item.type == 1){
            // this.getNotApplyEchart();
            this.getRelevantNoticeList(item.projectId);
          }
          if(item.type == 2){
            // this.getCanApplyEchart();
            this.keBaoData = item
            this.getRelevantNoticeList(item.projectId);
          }
          if(item.type == 3){
            // this.getAppliingEchart()
            this.processWorkId = '';
            this.getOrderDetail(item.orderId);
          }
          if(item.type == 4){
            // this.getAppliedEchart()
            this.getProjectMsg(item.projectId,item.orderId)
          }
        }
      },

      //跳转政策详情
      goPolicy(noticeId){
        this.$router.push({
          'path': '/policy/detailPolicy',
          'query': {'noticeId': noticeId, 'is_check': true}
        })
      },

      //打开设为可报弹窗
      openSetCanApply(item,num){
        this.canApplyForm = {};
        this.canApplyForm = item;
        this.canApplyForm.num = num;
        this.getProjectMaxBatch(item.projectId)
        this.canApplyForm.companyId = this.ruleForm.crmCompanyId;
        this.setCanApplyDiog = true;
      },
      // 最大批次
      getProjectMaxBatch(projectId) {
        this.batchNoList = [{'label': '未指定', 'value': 0},]
        queryProjectMaxBatch({projectId: projectId}).then(res => {
          if (res.data > 0) {
            for (var i=1; i< res.data + 1; i++) {
              this.batchNoList.push({'label': '第' + i + '批', 'value':i},)
            }
          }
        })
      },
      //关闭设置可报弹窗
      cancelSelCan(){
        this.canApplyForm = {};
        this.setCanApplyDiog = false;
      },

      //设为已报按钮
      setSetApplied(formName){
        this.canApplyForm.companyName = this.ruleForm.companyName
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            if (this.canApplyForm.projectType == 822466810090618880 && !this.canApplyForm.titleSeries) {
              this.$message.warning('职称系列必选')
              return
            }
            addPolicyApprovalSetReported(this.canApplyForm).then(res=>{
              if(res.code == 200){
                this.$message.success('设置成功');
                this.setCanApplyDiog = false;
                this.getDetail();
                this.getCompanyProjectData();
              }
            })
          }
        })
      },

      //设为可报
      setCanSetApply(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            saveProjectPlan(this.canApplyForm).then(res => {
              if (res.code === 200) {
                this.$message.success('设置成功');
                this.setCanApplyDiog = false;
                this.getDetail();
                this.getCompanyProjectData();
              }
            })
          }
        })
      },

      // 查看得分情况
      openGetScore(noticeId) {
        this.matchingDialogVisible = true
        matchingCompanyInfo({projectId: this.keBaoData.projectId, companyId: this.$route.query.id, noticeId: noticeId}).then(res => {
          if (res.code === 200) {
            this.matchingCompanyInfoList = res.data
            this.matchingCompanyInfoList.forEach(item => {
              item.projectId = this.keBaoData.projectId
              item.noticeId = this.keBaoData.noticeId
              item.getScore = item.getScore > 0 ? this.$set(item, 'getScore', item.getScore) : this.$set(item, 'getScore', 0)
              item.isPass = item.isPass > 0 ? this.$set(item, 'isPass', 1) : this.$set(item, 'isPass', 0)
            })
          }
        })
      },
      // 修改已得分
      updateGetScore(){
        var canUpdate = false
        var totalScore = 0
        var regPos = /^\d+$/; // 非负整数
        this.matchingCompanyInfoList.forEach(item => {
          if (!regPos.test(item.getScore)) {
            canUpdate = true
          } else {
            totalScore += Number(item.getScore)
          }
        })
        if (canUpdate) {
          this.$message.error('已得分必须为正数或0')
          return
        }
        if (totalScore > 100) {
          this.$message.error("所有条件总得分不能超过100分")
          return
        }

        updateMatchingCompanyGetScore(this.matchingCompanyInfoList).then(res => {
          if (res.code === 200) {
            this.$message.success("修改成功")
            this.matchingDialogVisible = false
            this.matchingCompanyInfoList = []
          }
        })
      },

    }
  }
</script>

<style lang="less" scoped>

  .ulIntellectual{
    display: flex;
    margin-left: 50px;

    li{
      color: #666;
      width: 80px;
      font-size: 14px;
      list-style-type:none;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
    .changeColor{
      color: #05aaff;
      border-bottom: solid 2px #05aaff;
    }
  }

  .flex-row{
    display: flex;
    align-items: center;
  }
  .flex-column{
    display: flex;
    flex-direction:column;
    align-content: flex-start;
    .ongoing{
      color:#05AAFF !important;
    }

  }
  .class-span {
       color:rgba(68, 68, 68, 0.6)  !important;
  }
  .flex-column{
    span {
       align-items: left ;
       font-size: 12px;
       color:rgba(68, 68, 68, 0.6)  !important;
      }

  }
  .file-list-name{
    width:50px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    display: block;
  }
  .contentTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 30px;
    border-top: 0.020833rem solid #05AAFF;
    background: #fff;
    box-shadow: 0px 2px 12px rgba(5, 170, 255, 0.08);

    .contTopLeft {
      font-size: 16px;
      color: #000000;
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
      }
    }
  }



  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
    font-size: 12px;
  }

  .ul-li {
    list-style-type: none;
    width: 13%;
    text-align: left;
  }

  .ul-li-left-margin {
    margin-left: 2%;
  }

  .width-0-20 {
    width: 20%;
  }

  .width-0-3 {
    width: 30%;
  }

  .width-0-5 {
    width: 50%;
  }

  width-0-6 {
    width: 60%;
  }

  .input-90 {
    width: 90px;
  }

  .input-100 {
    width: 100px;
  }

  .input-120 {
    width: 120px;
  }

  .input-180 {
    width: 180px;
  }

  .input-200 {
    width: 200px;
  }

  .input-360 {
    width: 360px;
  }

  .input-460 {
    width: 460px;
  }

  .span-input {
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    white-space: nowrap;
  }

  .font-red {
    color: red;
    margin-right: 3px;
  }

  .overflow-x {
    overflow-x: hidden;
  }

  .overflow-y {
    overflow-y: hidden;
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

  .left-margin-5 {
    margin-left: 5px;
  }

  .left-margin-10 {
    margin-left: 10px;
  }

  .bottom-margin-10 {
    margin-bottom: 10px;
  }

  .bottom-margin-30 {
    margin-bottom: 30px;
  }

  .left-margin-50 {
    margin-left: 50px;
  }

  .left-margin-20 {
    margin-left: 20px;
  }

  .left-margin-30 {
    margin-left: 30px;
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

  .padding-20 {
    padding: 20px;
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

  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 5%;
    min-width: 960px;
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

  .bg_pale_purple {
    background: rgb(88, 131, 255);
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba(88, 131, 255, .5);
    }
  }

  .bg_pink {
    background: rgb(255, 112, 154);
    color: #fff;

    &:hover {
      background: rgba(255, 112, 154, .5);
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
    background: rgb(50, 184, 255);
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba(50, 184, 255, .5);
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
    width: 78px;
    height: 78px;
    border-radius: 4px;
    font-size: 18px;
    color: #f0f7ff;
    background: rgba(155, 181, 255, 1);

    &:hover {
      background: rgba(155, 181, 255, .5);
    }
  }

  .line-height-20 {
    height: 20px;
    line-height: 20px;
  }

  .width-0-7 {
    width: 7%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-8 {
    width: 8%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-10 {
    width: 10%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-12 {
    width: 12%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-15 {
    width: 15%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-18 {
    width: 18%;
    min-height: 18px;
    line-height: 18px;
    font-size: 12px;
  }

  .width-0-20 {
    width: 20%;
    min-height: 18px;
    line-height: 18px;
    font-size: 12px;
  }

  .width-0-25 {
    width: 25%;
    min-height: 18px;
    line-height: 18px;
  }


  /*-----------------------*/
  .rule-form-box {
    /deep/ .el-card__body {
      display: flex;

      .edit-ruleForm {
        .el-input__inner {
          border: 0;
          border-radius: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);
        }

        .company-name {
          font-size: 18px;

          .el-input__inner {
            color: #444;
            font-weight: bold;
            padding: 0;
          }
        }

        .register-status {
          width: 150px;

          .el-input__inner {
            border-bottom: 0;
            color: #05AAFF;
          }
        }

        .input-color-blue {
          .el-input__inner {
            color: #05AAFF;
          }
        }
      }
    }
  }

  //合同
  .cusConLine {
    height: 3px;
    background-color: rgb(237, 244, 255);
    width: 100%;
    margin-top: 10px;
  }

  .cusContractList {
    padding: 20px 0;
    display: flex;
    border-bottom: 2px solid rgb(241, 240, 242);
    position: relative;

    .freeContract {
      position: absolute;
      right: 50%;
      width: 5%;
      margin-right: -190px;
    }

    .cusContractLeft {
      flex: 1;
      margin-right: 50px;

      .cusContractMsg {
        margin-bottom: 15px;
        font-size: 14px;

        span {
          margin-right: 30px;
        }
      }

      .cusContractProject {
        background: #EFFAFF;
        padding: 10px;
        transition: all .3s ease-in-out;

        .curConProjectBox {
          display: flex;
          margin-bottom: 10px;

          .conProjectNum {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #FE95B2;
            border-radius: 100%;
            color: #ffffff;
            margin-right: 15px;
          }

          .conProjectLeftRig {
            display: flex;
            justify-content: space-between;
            flex: 1;

            .conProjectLeft {
              flex: 1;
              margin-right: 30px;

              .conProjectMsg {
                font-size: 14px;
                margin-right: 30px;
                margin-bottom: 10px;
                display: flex;

                span {
                  width: 20%;
                  display: flex;
                  margin-right: 10px;
                  span {
                    cursor: pointer;
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: rgb(5, 170, 255);
                    display: inline-block;
                    vertical-align: middle;
                  }
                }
              }
            }

            .conProjectRig {
              .conProBtn {
                cursor: pointer;
                color: rgb(88, 131, 255);
                margin-left: 10px;
              }
            }
          }
        }

        &:hover {
          background: #CDEEFF;
          transition: all .3s ease-in-out;
        }
      }
    }

    .cusContractRig {
      text-align: center;

      .cusContractBtn {
        margin-bottom: 10px;

        .primary {
          border: 1px solid rgba(5, 170, 255, 1);
          background: rgba(5, 170, 255, 1);
          color: #fff;

          &:hover {
            background: rgba(5, 170, 255, 0.90);
            color: #fff;
          }
        }

        .violet {
          border: 1px solid #799cff;
          background: #799cff;
          color: #fff;

          &:hover {
            background: rgba(121, 156, 255, 0.90);
            color: #fff;
          }
        }

        .origin {
          border: 1px solid #ffcba6;
          background: #ffcba6;
          color: #fff;

          &:hover {
            background: rgba(255, 203, 166, 0.90);
            color: #fff;
          }
        }
      }
    }
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
  }

  /* 立项*/
  .approvalContent {
    .approvalTit {
      .allChoose {
        padding: 6px 8px;
        color: #05AAFF;
        border: 1px solid #05AAFF;
        background-color: #fff;
        border-radius: 2px;
      }

      .allDelete {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FF8585;
        background-color: #FF8585;
        border-radius: 2px;
      }

      .dataCheck {
        padding: 6px 8px;
        color: #FFCBA6;
        border: 1px solid #FFCBA6;
        background-color: #fff;
        border-radius: 2px;
      }
    }

    .approvalBox {
      border-bottom: 1px solid #e2e2e2;

      /deep/ .el-checkbox__label {
        width: 100%;
      }

      .approvalBoxData {
        display: flex;
        padding: 15px 15px;

        .approvalBoxLeft {
          flex: 1;
          display: flex;
          width: 90%;

          .approvalTitle {
            width: 84px;
            height: 84px;
            background: #69ccff;
            border-radius: 10px;
            opacity: 1;
            font-size: 18px;
            font-weight: 400;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .approvalData {
            display: flex;
            flex: 1;
            margin-left: 20px;
            flex-wrap: wrap;
            width: 90%;
            p {
              width: 33%;
            }
          }
        }
      }
    }
  }

  // 弹出框样式设计
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }

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

  /deep/ .el-date-editor.el-input {
    width: auto;
  }

  /deep/ .el-table .hidden-columns {
    position: relative;
    z-index: 1;
    visibility: initial;
    width: 100%;
    display: flex;

    div {
      position: relative;
      width: 187px;

      span.star {
        margin-top: 12px;
      }
    }
  }

  .spanDelete {
    color: #ff4f5a;
    cursor: pointer;
    display: table;
    margin: 0 auto;
  }

  .unified-code {
    /deep/ .el-input__inner {
      padding: 0;
    }
  }

  .icon-chat {
    cursor: pointer;
    font-size: 16px;
  }

  .tips {
    div {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .customer-tabs {
    /deep/ .el-tabs__content {
      overflow: inherit;
    }
  }

  .add-contact-user {
    margin-bottom: 10px;
    color: #fff;
    border: 0;
    background: #05AAFF;
  }

  .remark {
    /deep/ .el-textarea__inner {
      height: 150px !important;
      min-height: 150px !important;
    }
  }

  .get-more {
    text-align: center;
    margin-top: 10px;
  }

  /deep/ .edit-ruleForm-tab {
    .el-input__inner {
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);
    }

    .company-name {
      font-size: 18px;

      .el-input__inner {
        color: #444;
        font-weight: bold;
        padding: 0;
      }
    }

    .register-status {
      width: 150px;

      .el-input__inner {
        border-bottom: 0;
        color: #05AAFF;
      }
    }

    .input-color-blue {
      .el-input__inner {
        color: #05AAFF;
      }
    }
  }

  .list-detail {
    width: 100%;
    margin-top: 10px;
    padding-left: 10px;

    table {
      width: 100%;

      tr {
        height: 30px;
      }

      td {
        white-space: nowrap;
      }

      .td-item {
        display: flex;
        align-items: center;
      }
    }

    .xin {
      color: red;
    }
  }

  .rule-forms {
    padding-top: 13px;
    display: flex;

    .rule-form-left {
      width: 40%;
      margin-right: 20px;
    }

    .rule-form-right {
      width: 100%;
    }
  }

  .flex {
    display: flex;
  }

  .register-select {
    /deep/ .el-input__inner {
      padding-left: 0;
    }
  }

  .projectApply{
    display: flex;
    justify-content: space-between;
    .projectApplyLeft{
      width: 75%;
      /deep/ .el-card__body{
        height:85%;
      }
      .projectHeartCont {
        display: flex;
        align-items: center;
        justify-content: center;
        /*height: 100%;*/
        .heartLeft {
          flex:1;
          .applyProjectBox{
            margin-bottom: 80px;
            .projectBoxTit{
              background:#FE4E7E;
              color:#fff;
              padding: 12px 15px;
              border-top-left-radius: 3px;
              border-top-right-radius: 3px;
            }
            .projectBoxList{
              padding:17px;
              background:#FFE9EE;
              border: 1px dashed #FE4E7E;
              border-top: none;
              border-bottom-left-radius: 3px;
              border-bottom-right-radius: 3px;
              display: flex;
              flex-wrap: wrap;
              max-height: 300px;
              overflow: auto;
              &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
                background-color:#f8f8f8;
              }
              &::-webkit-scrollbar {//滚动条的宽度
                width:5px;
                height:5px;
              }
              &::-webkit-scrollbar-thumb {//滚动条的设置
                background-color:#dddddd;
                background-clip:padding-box;
                min-height:28px;
                border-radius:120px;
              }
              &::-webkit-scrollbar-thumb:hover {
                background-color:#bbb;
              }
              .projectBox{
                font-size: 14px;
                font-weight: 400;
                color: #BF3B5F;
                padding: 3px 6px;
                background: #FCF6F8;
                border: 1px solid #FE4E7E;
                margin-right: 15px;
                border-radius: 3px;
                margin-bottom: 10px;
                cursor: pointer;
                transition: all .4s ease-out;
                &:hover{
                  transition: all .4s ease-out;
                  background: #FE4E7E;
                  color: #FFFFFF;
                }
              }
              .active{
                background: #FE4E7E !important;
                color: #FFFFFF !important;
              }
            }
          }
          .projectBlue{
            margin-bottom: 0px;
            .projectBoxTit{
              background:#05AAFF;
              color:#fff;
            }
            .projectBoxList{
              background:#EFFAFF;
              border: 1px dashed #69CCFF;
              .projectBox{
                color: #0480BF;
                background: #F8FDFF;
                border: 1px solid #05AAFF;
                transition: all .4s ease-out;
                &:hover{
                  transition: all .4s ease-out;
                  background: #05AAFF;
                  color: #FFFFFF;
                }
              }
              .active{
                background: #05AAFF !important;
                color: #FFFFFF !important;
              }
            }
          }
          .projectGreen{
            .projectBoxTit{
              background:#48D462;
              color:#fff;
            }
            .projectBoxList{
              background: #F2FCF4;
              border: 1px dashed #91E5A1;
              .projectBox{
                color: #369F4A;
                background: #fff;
                border: 1px solid #48D462;
                transition: all .4s ease-out;
                &:hover{
                  transition: all .4s ease-out;
                  background: #48D462;
                  color: #FFFFFF;
                }
              }
              .active{
                background: #48D462 !important;
                color: #FFFFFF !important;
              }
            }
          }
          .projectOrange{
            margin-bottom: 0px;
            .projectBoxTit{
              background:#FFA96A;
              color:#fff;
            }
            .projectBoxList{
              background: #FFFCF9;
              border: 1px dashed #FFCBA6;
              .projectBox{
                color: #BF7F50;
                background: #FFF8F2;
                border: 1px solid #FFA96A;
                transition: all .4s ease-out;
                &:hover{
                  transition: all .4s ease-out;
                  background: #FFA96A;
                  color: #FFFFFF;
                }
                &:last-child{
                  margin-right: 0;
                }
              }
              .active{
                background: #FFA96A !important;
                color: #FFFFFF !important;
              }
            }
          }
        }

        .heartCenter {
          flex:0;
          margin:0 10px;
          .imgFlex{
            display: flex;
            justify-content: center;
            /*width: 66%;*/
            margin: 0 auto;
            img{
              width: 50%;
            }
          }
          .projectContractCenter{
            background: url("../../../views/icons/enterprise/companyProjectCenter.png") no-repeat center;
            background-size: 100% 100%;
            width: 160px;
            height: 160px;
            margin: 0 auto;
            padding: 55px 25px;
            /*margin: 0 10px;*/
            h3{
              font-size: 18px;
              font-weight: bold;
              color: #FFFFFF;
              text-align: center;
            }
            .projectTotal{
              display: flex;
              justify-content: center;
              margin-top:10px;
              flex-wrap: wrap;
              text-align: center;
              align-items: center;
              span{
                font-size: 12px;
                color: #F1F8FC;
                margin-right: 10px;
                margin-bottom:5px;
                &:nth-child(2n + 2){
                  margin-right:0;
                }
              }
            }
          }
        }

        .heartRig {
        }
      }
    }
    .projectApplyRig{
      flex:1;
      margin-left: 15px;
      .applyRig{
        /deep/ .el-card__body{
          padding: 0;
        }
      }
      .projectMsgCont{
        .projectMsgFirst{
          display:flex;
          align-items: center;
          padding:20px;
          .projectMsgLeft{
            flex:1;
            margin-right: 10px;
            border: 1px solid #FCEEF1;
            border-radius: 100%;
            padding: 7px;
            .care{
              width: 93px;
              height: 93px;
            }
          }
          .projectMsgRig{
            h3{
              font-size: 18px;
              font-weight: bold;
              color: #FE4E7E;
              margin-bottom: 15px;
              line-height: 27px;
              span{
                height: 14px;
                font-size: 10px;
                font-weight: bold;
                color: #FE4E7E;
                padding:4px;
                border: 1px solid #FE4E7E;
                border-radius: 2px;
                margin-right: 12px;
                vertical-align: middle
              }
            }
            .msgData{
              display: flex;
              flex-wrap: wrap;
              p{
                font-size: 14px;
                color: rgba(68, 68, 68, 0.75);
                margin-right: 10px;
                margin-bottom: 10px;
                span{
                  font-size: 14px;
                  color: #444444;
                }
              }
            }
          }
        }
        .projectBtn{
          /*display: flex;*/
          /*justify-content: space-between;*/
          /*padding:15px;*/
          .projectGreenBtn{
            width: 90%;
            padding: 7px 22px;
            background: #48D462;
            border-radius: 2px;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin: 0 auto;
            margin-bottom: 10px;
            img{
              margin-right: 5px;
            }
          }
          .projectOrangeBtn{
            width: 90%;
            padding:7px 22px;
            background: #FFA96A;
            border-radius: 2px;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin: 0 auto;
            margin-bottom: 10px;
            img{
              margin-right: 5px;
            }
          }
          .projectRedBtn{
            width: 90%;
            padding:7px 22px;
            background: linear-gradient(180deg, #FE7198 0%, #FE4E7E 100%);
            border-radius: 2px;
            font-size: 14px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin: 0 auto;
            margin-bottom: 10px;
            img{
              margin-right: 5px;
            }
          }
        }
      }
      .policyCard{
        /deep/ .el-card__body{
          padding:0;
        }
      }
      .projectPolicyList{
        padding:20px;
        max-height: 400px;
        overflow: auto;
        &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
          background-color:#f8f8f8;
        }
        &::-webkit-scrollbar {//滚动条的宽度
          width:5px;
          height:5px;
        }
        &::-webkit-scrollbar-thumb {//滚动条的设置
          background-color:#dddddd;
          background-clip:padding-box;
          min-height:28px;
          border-radius:120px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color:#bbb;
        }
        .projectPolicyBox{
          margin-bottom: 30px;
          &:last-child{
            margin-bottom:0;
          }
          h3{
            cursor: pointer;
            font-size: 14px;
            color: #444444;
            margin-bottom:12px;
            line-height: 22px;
            span{
              font-size: 12px;
              color: #FFFFFF;
              padding:2px 8px;
              background:#FFBA88;
              margin-right:5px;
            }
          }
          .policyMsg {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .policyLeft{
              font-size: 12px;
              color: rgba(68, 68, 68, 0.75);
              span{
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #FF8585;
              }
            }
            .policyRig{
              font-size: 12px;
              color: #05AAFF;
              span{
                color:#F56C6C;
              }
            }
          }
          .projectBtn{
            .projectRedBtn{
              width: 90%;
              padding:5px 22px;
              background: linear-gradient(180deg, #FE7198 0%, #FE4E7E 100%);
              border-radius: 2px;
              font-size: 14px;
              color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              margin: 0 auto;
              margin-top: 5px;
              margin-bottom: 10px;
              img{
                margin-right: 5px;
              }
            }
          }
        }
      }

      .canApply{
        .projectMsgCont{
          .projectMsgFirst{
            .projectMsgLeft{
              border: 1px solid #E3FBE8;
              border-radius: 100%;
              padding: 7px;
            }
            .projectMsgRig{
              h3{
                color: #48D462;
                span{
                  color: #48D462;
                  border: 1px solid #48D462;
                }
              }
            }
          }
        }
      }

      .appling{
        .projectMsgCont{
          .projectMsgFirst {
            .projectMsgLeft{
              border: 1px solid #EBF4F9;
              border-radius: 100%;
              padding: 7px;
            }
            .projectMsgRig {
              h3{
                color: #05AAFF;
                span{
                  color: #05AAFF;
                  border: 1px solid #05AAFF;
                }
              }
            }
          }
        }
      }

      .applEd{
        .projectMsgCont{
          .projectMsgFirst{
            .projectMsgLeft{
              border: 1px solid #FFF8F3;
              border-radius: 100%;
              padding: 7px;
              flex: none;
            }
            .projectMsgRig{
              h3{
                color: #FFA96A;
                margin-bottom: 0;
                span{
                  color: #FFA96A;
                  border: 1px solid #FFA96A;
                }
              }
            }
          }
          .approvalList{
            padding: 20px 25px;
            p{
              font-size: 14px;
              color: rgba(68, 68, 68, 0.75);
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              &:before{
                content:'';
                width: 6px;
                height: 6px;
                background: #FFDDC3;
                border-radius: 50%;
                display:inline-block;
                margin-right:15px;
              }
              span{
                font-size: 14px;
                color: #444444;
                margin-right:6px;
                margin-bottom:6px;
                &:last-child{
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }

      .processCard{
        /deep/ .el-card__body{
          padding:0;
        }
      }
      .projectProcessList{
        padding: 20px;
        max-height: 600px;
        overflow: auto;
        &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
          background-color:#f8f8f8;
        }
        &::-webkit-scrollbar {//滚动条的宽度
          width:5px;
          height:5px;
        }
        &::-webkit-scrollbar-thumb {//滚动条的设置
          background-color:#dddddd;
          background-clip:padding-box;
          min-height:28px;
          border-radius:120px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color:#bbb;
        }
        .firstProcessBox{
          background: url("../../icons/enterprise/companyProcessFirst.png") no-repeat;
          background-size:100% 100%;
          text-align: center;
          color:#fff;
          padding: 7px 0;
          padding-bottom: 20px;
          margin-bottom: 10px;
          span{
            vertical-align: middle;
            margin-left:7px;
          }
          img{
            vertical-align: middle;
          }
          p{
            margin-top:10px;
            font-size: 12px;
          }
        }
        .processBox{
          text-align: center;
          .processHeader{
            display:flex;
            border: 1px solid rgba(68, 68, 68, 0.4);
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            .processName{
              text-align: center;
              background:#F1F1F1;
              padding:6px;
              border-right:1px solid rgba(68, 68, 68, 0.4);
              flex:1;
              border-top-left-radius: 4px;
              color:#444;
            }
            .processMsg{
              padding:10px;
              flex:3;
              p{
                margin-bottom: 7px;
                font-size: 14px;
                color: rgba(68, 68, 68, 0.6);
                display: flex;
                // align-items: center;
                &:last-child{
                  margin-bottom:0;
                }
                // &:before{
                //   content: '';
                //   width: 4px;
                //   height: 4px;
                //   background: #BCCDFF;
                //   border-radius: 100%;
                //   margin-right: 6px;
                //   display: inline-block;
                // }
                span{
                  font-size: 14px;
                  color: #444444;
                  flex:1;
                  text-align: left;
                }
                i{
                  margin-left: 10px;
                  cursor: pointer;
                }
              }
            }
          }
          .processResult{
            background:rgba(68, 68, 68, 0.4);
            text-align: center;
            padding:8px 0;
            color:#fff;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          .nextJian{
            margin: 10px 0;
          }
        }

        .processBoxOrange{
          .processHeader{
            border: 1px solid #FFA96A;
            .processName{
              border-right: 1px solid #FFA96A;
              background: #FFEEE1;
              color:#BF7F50;
            }
            .processMsg{
              p{
                i{
                  color:#FFA96A;
                }
              }
            }
          }
          .processResult{
            background:#FFA96A;
          }
        }

        .processBoxBlue{
          .processHeader{
            border: 1px solid #05AAFF;
            .processName{
              border-right: 1px solid #05AAFF;
              background: #CDEEFF;
              color:#035580;
            }
            .processMsg{
              p{
                i{
                  color:#05AAFF;
                }
              }
            }
          }
          .processResult{
            background:#05AAFF;
          }
        }

        .processBoxRed{
          .processHeader{
            border: 1px solid #ff3643;
            .processName{
              border-right: 1px solid #ff3643;
              background: rgba(255, 54, 67, 0.31);
              color: #cc0009;
            }
            .processMsg{
              p{
                i{
                  color:#ff3643;
                }
              }
            }
          }
          .processResult{
            background:#ff3643;
          }
        }

        .endProcessBox{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0;
          background: url("../../icons/enterprise/compProcessEndIn.png") no-repeat;
          background-size: 100% 100%;
          span{
            font-size: 14px;
            color: rgba(68, 68, 68, 0.75);
            margin-left:8px;
          }
        }
        .endProcessSuccessBox{
          background: url("../../icons/enterprise/compProcessEndOn.png") no-repeat;
          background-size: 100% 100%;
          span{
            color:#fff;
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

    .el-form-item__label {
      font-weight: normal;
      color: rgba(68, 68, 68, 0.75);
    }

    .el-form-item__content {
      width: 73%;
      display: flex;
    }

    .user-input {
      .el-input__inner {
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

      .el-form-item__content {
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
    .chat-modal {

    /deep/ .el-textarea__inner{
      height:73px;
    }

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

      /deep/ .el-dialog__headerbtn{
        top: 15px  ;
      }
      // 弹出框样式设计
      /deep/ .el-dialog__body {
        padding: 10px 20px 40px 20px;
      }

      /deep/ .el-dialog__header {
      background: #fff;
      padding: 10px 10px 0px 10px;
      margin-bottom: 0;

      /deep/ .el-dialog__title {
        color: #444;
        font-size: 14px;
      }

      /deep/ .el-dialog__headerbtn {
        border-radius: 50%;
        background: #fff;
        padding: 4px;
        font-size: 12px;
        font-weight: 400;

        /deep/ .el-dialog__close {
          color: #05AAFF;
          font-size: 16px;
        }
      }
    }

  }
  .class-pointer{
    cursor: pointer;
    color:  rgba(5, 170, 255, 1);
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
</style>
