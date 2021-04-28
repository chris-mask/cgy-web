<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card">
        <div class="searchCont">
          <el-input v-model.trim="contractForm.companyName" placeholder="请输入企业名称/项目名称/合同编号"
                    @keyup.enter.native="goSearch"></el-input>
          <el-button type="primary" class="btn bt_blue" @click="goSearch"><span class="bt_font">搜一下</span>
          </el-button>
          <el-button type="primary" class="btn bt_blue addBtn" @click="goAddContract" v-if="allowAdd.twoAllow"><span
            class="bt_font">+新增</span>
          </el-button>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">已选条件:</span>
            <div class="conditionList">
              <div class="conditionBox" v-for="(value, key) in selectConditionsList">
                {{value}}<img class="hoverCursor" @click="deleteOneClick(key)" src="../icons/enterprise/close_con.png"/>
              </div>
              <div class="conditionClear" @click="deleteAllClick" v-if="Object.keys(selectConditionsList).length > 1">
                清空所有
              </div>
            </div>
          </div>
          <div class="headerRig conditRig" @click="openCond">
            <img v-if="moreCondition" src="../icons/enterprise/close_icon.png" style="vertical-align:middle;"/>
            <img v-else src="../icons/enterprise/open_icon.png" style="vertical-align:middle;"/>
            <span>选择筛选条件</span>
          </div>
        </div>
        <div class="conditionCont" v-if="moreCondition">
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>常用：</span>
                <el-select size="small" multiple v-model="contractForm.deptIds" placeholder="业务部门" clearable
                           v-if="allowGetDeptList.twoAllow"
                           @change="deptmentChange">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="contractForm.signUserIds" filterable
                           placeholder="选择签订人" clearable
                           @change="signUserChange" multiple>
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName+'-'+item.roleName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-select size="small" multiple v-model="contractForm.projectDeptIds" placeholder="工程部门" clearable
                           v-if="allowGetDeptList.twoAllow"
                           @change="deptmentChange2">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" multiple v-model="contractForm.projectPersonnelIdList" placeholder="选择项目员"
                           clearable @change="engineerUser">
                  <el-option
                    v-for="item in projectPersonList"
                    :key="item.userId"
                    :label="item.userName+'-'+item.roleName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-select size="small" multiple v-model="contractForm.auditorDeptIds" placeholder="审计部门" clearable
                           v-if="allowGetDeptList.twoAllow"
                           @change="deptmentChange3">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" multiple v-model="contractForm.auditorIds" placeholder="选择审计员"
                           clearable @change="auditUserChange">
                  <el-option
                    v-for="item in auditPersonList"
                    :key="item.userId"
                    :label="item.userName+'-'+item.roleName"
                    :value="item.userId">
                  </el-option>
                </el-select>

                <el-select size="small" @change="contractStateChange" v-model="contractForm.contractStates"
                           placeholder="履行状态" clearable multiple>
                  <el-option
                    v-for="item in contractStateList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>项目：</span>
                <el-select remote :remote-method="projectListMethod" @change='projectChange' multiple size="mini"
                           style="width: 350px;" filterable v-loadMore="loadMore" :loading="loading" class="inline-block float-left" clearable
                           v-model="contractForm.projectIds"
                           placeholder="项目名称">
                  <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName"
                             :value="item.projectId"></el-option>
                </el-select>
                <el-select size="small" @change='projectYearChange' filterable v-model="contractForm.projectYears"
                           placeholder="项目年度" clearable multiple>
                  <el-option
                    v-for="item in yearList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <el-select size="small" @change='projectLevelChange' v-model="contractForm.areaLevels"
                           placeholder="项目级别" clearable multiple>
                  <el-option
                    v-for="item in projectLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select size="small" @change='changeTitleSeries' v-model="contractForm.titleSeriesList" placeholder="职称系列" clearable multiple>
                  <el-option v-for="item in titleSeriesList" :label="item.dictName" :value="item.dictId" :key="item.dictId"></el-option>
                </el-select>
                <el-select size="small" @change='changeProjectBegin' v-if="!showFour" v-model="approvedInfo" placeholder="立项情况" clearable multiple>
                  <el-option label="未办结" value="unsettled"></el-option>
                  <el-option label="已办结" value="completed"></el-option>
                  <el-option label="未立项" value="notApproved"></el-option>
                  <el-option label="已立项" value="hasApproved"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>性质：</span>
                <el-select size="small" @change="newOldChange" v-model="contractForm.newOrOld" placeholder="新老客户"
                           clearable>
                  <el-option
                    label="新客户"
                    :value="0">
                  </el-option>
                  <el-option
                    label="老客户"
                    :value="1">
                  </el-option>
                </el-select>
                <el-select size="small" @change="companyLevelChange" v-model="contractForm.companyLevels"
                           placeholder="客户级别" clearable multiple>
                  <el-option
                    v-for="item in companyLevelList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" @change="channelChange" v-model="contractForm.isChannel" placeholder="是否渠道"
                           clearable>
                  <el-option
                    label="不是"
                    :value="0">
                  </el-option>
                  <el-option
                    label="是"
                    :value="1">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>企业地区：</span>
                <el-select size="small" @change="provinceChange" v-model="contractForm.provinceId" placeholder="省份"
                           clearable>
                  <el-option
                    v-for="item in provinceList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" @change="cityChange" v-model="contractForm.cityId" placeholder="城市" clearable>
                  <el-option
                    v-for="item in cityList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" @change="districtChange" v-model="contractForm.districtId" placeholder="县区"
                           clearable>
                  <el-option
                    v-for="item in districtList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" @change="townChange" v-model="contractForm.townId" placeholder="镇街" clearable>
                  <el-option
                    v-for="item in townList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>签订日期：</span>
                <el-date-picker
                  @change="signDateStartChange"
                  clearable
                  size="small"
                  v-model="contractForm.signDateStart"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="签订开始时间">
                </el-date-picker>
                <el-date-picker
                  @change="signDateEndChange"
                  clearable
                  size="small"
                  v-model="contractForm.signDateEnd"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="签订结束时间">
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>到期日期：</span>
                <el-date-picker
                  v-model="availableDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="availableDateChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>立项日期：</span>
                <el-date-picker
                  v-model="approvalDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="approvalDateChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>回款：</span>
                <el-date-picker
                  v-model="paymentDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="paymentDateChange"
                  class="date-select"
                >
                </el-date-picker>
                <el-radio-group v-model="contractForm.paymentState" @change="paymentStateChange">
                  <el-radio :label="2">未回款</el-radio>
                  <el-radio :label="3">未完全回款</el-radio>
                  <el-radio :label="4">已完全回款</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span>搜索到<span>{{total}}</span>个企业</span>
            <span>合同数量: {{contractTotalCount}}</span>
            <span>订单数量: {{orderTotalCount}}</span>
            <span style="margin-left: 10px;" v-if="payBackCount >= 0">已回款总额: <span>{{payBackCount}}</span> </span>
            <span style="margin-left: 10px;" v-if="payBackRecheck >= 0">回款已审核总额: <span>{{payBackRecheck}}</span> </span>
            <span style="margin-left: 10px;" v-if="checkList.length > 0">已选中<span>{{checkList.length}}</span>条记录</span>
            <div class="headBtn">
              <el-button type="primary" class="btn allChoose" size="small" @click="checkAllOrNo">全选</el-button>
              <el-button type="primary" class="btn export" size="small" @click="exportList" v-if="allowExport.twoAllow">
                导出
              </el-button>
              <el-button class="btn allDelete" size="small" @click="allDelete" v-if="allowDelete.twoAllow">删除
              </el-button>
              <el-button class="btn originBtn" size="small" @click="editPersonOpen" v-if="allowChangePerson.twoAllow">
                修改签订人
              </el-button>
              <el-checkbox size="small" v-model="showPaymentState" @change="showBackChange">显示回款记录</el-checkbox>
            </div>
          </div>
          <div class="headerRig">
            <el-select v-model="sortId" placeholder="默认排序" @change="handledSelect" clearable>
              <el-option
                v-for="item in sortList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="dataList">
<!--          <el-checkbox-group v-model="checkList">-->
          <div class="dataBox" v-for="(data,k) in contractList" :key="k">
              <div class="dataBoxLeft">
                <div class="dataLeft">
                  <div class="fileType fileDoc" :style="`background:${data.bgColor}`">企业简称</div>
                  <div class="dataDetail">
                    <div class="companyName">
                      <p style="margin-bottom: 16px;cursor: pointer" @click="goCompany(data,data.companyIdMain)">
                        {{data.companyNameMain}}
                      </p>
                    </div>
                    <div class="contractlist" v-for="(item,index) in data.crmContractVoList" :key="item.contractId">
                      <el-checkbox :label="item.contractId" v-model="item.check" @change="checkContractChange($event,item)">
                        <div class="contractlist">
                          <div class="contractBox" >
                            <!--                          <p style="margin-bottom: 16px;" @click="goCompany(item,item.companyId)">-->
                            <!--                            {{item.companyName}}-->
                            <!--                            <span-->
                            <!--                              style="background-color: #FF8585;font-size:12px; padding: 3px 7px; height: 20px; width: 30px; line-height: 20px; color: #ffffff; margin-left: 13px; border-radius:10px;"-->
                            <!--                              v-if="item.newOrOld == 0">new</span>-->
                            <!--                          </p>-->
                            <div class="dataMsg" @click="goCheckContract(item.contractId,item.isOneself)">
                              <span>合同编号：{{item.contractCode}}</span>
                              <span>创建时间：{{item.createDate}}</span>
                              <span>有效期：{{item.availableYear}}年</span>
                            </div>
                            <div class="dataMsg" @click="goCheckContract(item.contractId,item.isOneself)">
                              <span>签约公司：{{item.signCompanyId ==0 ?'其他':item.signCompanyName}}</span>
                              <span>签订日期：{{item.signDate}}</span>
                              <span>签订人：{{item.signUserName}}</span>
                              <span>履行状态：
                                <span :class="item.contractState == -1 ? 'fontOrange' : ''">
                                  {{item.contractState == -1 ? '已完成' :item.contractState == 0 ? '履行中' : item.contractState == 1 ? '解约' : item.contractState == 2 ? '作废' : item.contractState == 3 ? '终止' : ''}}
                                </span>
                              </span>
                            </div>
                            <div class="projectList">
                              <div class="projectBox" v-for="(list,i) in item.orderVoList" @click="goOrderDetail(list.orderId)">
                                <div class="projectLeft">
                                  <span class="proNum">{{i + 1}}</span>
                                  <div class="projectMsg">
                                    <div class="leftBox" style="margin-bottom: 0;">
                                      <h4 @click="goProject(list.projectId)" :title="list.projectName"
                                          style="width: auto;min-width: 20%;margin-bottom: 10px;">项目：{{list.projectName}}</h4>
                                      <h4 v-if="list.projectType != 822466810090618880">级别：{{
                                        list.applyLevel == 1 ? '国家' :
                                        list.applyLevel == 2 ? '省级' :
                                        list.applyLevel == 3 ? '市级' :
                                        list.applyLevel == 4 ? '区县级' :
                                        list.applyLevel == 5 ? '镇街级' : '-'
                                        }}</h4>
                                      <h4 v-if="list.projectType == 822466810090618880">
                                        职称系列：{{list.titleSeriesName}}
                                      </h4>
                                      <h4 v-if="list.projectType == 822466810090618880">
                                        职称级别：{{list.titleLevelName}}
                                      </h4>

                                      <h4 v-if="list.projectType == 822466810090618880">
                                        职称区域：{{list.provinceName}}{{list.cityName}}{{list.townName}}{{list.districtName}}
                                      </h4>

                                      <h4 style="margin-bottom: 10px;">开始日期：{{list.projectYearStartDate}}</h4>
                                      <h4 style="margin-bottom: 10px;">截止日期：{{list.projectYearEndDate}}</h4>
<!--                                      <h4 v-if="list.orderType == 0" style="margin-bottom: 10px;">-->
<!--                                        当前工程师：{{list.engineerUserName}}</h4>-->
<!--                                      <h4 v-if="list.orderType == 1" style="margin-bottom: 10px;">-->
<!--                                        当前知识产权工程师：{{list.engineerUserName}}</h4>-->
<!--                                      <h4 v-if="list.orderType == 2" style="margin-bottom: 10px;">-->
<!--                                        当前审计人员：{{list.auditUserName}}</h4>-->
                                    </div>
                                    <div class="leftBox" style="margin-bottom: 0;">
<!--                                                                      <h4>当前进度：{{list.processState == 0 ? '未开始' : list.processState == 1 ? '进行中' :-->
<!--                                                                        list.processState == 2 ? '提前结束' : list.processState == 3 ? '正常结束' : '-' }}</h4> -->
                                      <h4 :title="list.currentEngineerAndProcessName">进度与处理人：{{list.currentEngineerAndProcessName}} <span class="noRead" v-if="list.isRead == 0">*</span></h4>
                                      <h4>申报年份：{{list.year}}</h4>
                                      <h4 v-if="list.unitPrice" style="margin-bottom: 10px;">
                                        {{list.unitPrice > 1?'单价：':'比例：'}}
                                        {{ list.unitPrice > 1 && list.unitPrice < 10000 ? list.unitPrice + '元' : list.unitPrice > 1 && list.unitPrice >= 10000 ? parseFloat((list.unitPrice / 10000).toPrecision(13)) + '万元' : list.unitPrice * 1000 / 10 + '%'}}
                                      </h4>
                                      <h4 v-else style="margin-bottom: 10px;">
                                        {{list.unitPrice > 1?'单价：':'比例：'}}
                                        {{list.unitPrice > 1 ? 0 : 0 * 100 + '%'}}
                                      </h4>
                                      <h4>数量：{{list.applyNum}}</h4>
                                      <h4 v-if="list.unitPrice > 1" style="margin-bottom: 10px;">
                                        总额：
                                        {{(list.unitPrice * list.applyNum) < 10000 ? (list.unitPrice * list.applyNum) + '元' : list.unitPrice && list.applyNum ? parseFloat(((list.unitPrice * list.applyNum) / 10000).toPrecision(13)) + '万元' :  0}}
                                      </h4>
                                    </div>
                                    <div class="paymentCont" v-if="showPaymentState == true && list.paymentRecordList.length > 0">
                                      <div class="leftBox" v-for="(data,num) in list.paymentRecordList">
                                        <span class="payNum">{{num + 1}}</span>
                                        <div class="projectBackLeft">
                                          <h4>汇款日期：{{data.paymentDate}}</h4>
                                          <h4>回款金额：{{data.paymentAmount && data.paymentAmount < 10000 ? data.paymentAmount + '元' : data.paymentAmount && data.paymentAmount >= 10000 ? parseFloat((data.paymentAmount / 10000).toPrecision(13)) + '万元' : '-'}}</h4>
                                          <h4>财政级别：{{data.paymentLevel == 1 ? '国家级' : data.paymentLevel == 2 ? '省级' : data.paymentLevel == 3 ? '市级' : data.paymentLevel == 4 ? '区县级' : data.paymentLevel == 5 ? '镇街级' : '-'}}</h4>
                                          <h4>收款人：{{data.paymentUserName}}</h4>
                                          <h4>录入日期：{{data.entryDate}}</h4>
                                          <h4>回款阶段：{{data.paymentType == 0 ? '签约后' : data.paymentType == 1 ? '受理后' : data.paymentType == 2 ? '完成（提交）后': data.paymentType == 3 ? '立项公示后':data.paymentType == 4 ? '拨付后':data.paymentType == 5 ? '验收后':data.paymentType == 6 ? '收到通知书后':'-'}}</h4>
                                          <h4>业务主管姓名：{{data.supervisorUserName}}</h4>
                                          <h4>业务主管审核结果：{{data.supervisorRecheck == 0 ? '未审核' : data.supervisorRecheck == 1 ? '审核通过' : data.supervisorRecheck == 2 ? '审核不通过' : ''}}</h4>
                                          <h4>财务专员姓名：{{data.financeUserName}}</h4>
                                          <h4>财务专员审核结果：{{data.financeRecheck == 0 ? '未审核' : data.financeRecheck == 1 ? '审核通过' : data.financeRecheck == 2 ? '审核不通过' : ''}}</h4>
                                        </div>
                                        <div class="projectBackRig">
                                          <span class="payZhi" @click="checkPayment(data.recordId)"><i class="el-icon-view"></i>查看</span>
                                          <span class="payBlue" @click="goPaymentDetail(data.recordId)"><i class="el-icon-edit"></i>编辑</span>
                                          <span class="payRed" @click="deletePayRecord(data.recordId)"><i class="el-icon-delete"></i>删除</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="projectRig">
                                  <span @click="goOrderDetail(list.orderId)">查看订单</span>
                                  <span @click="openPlanBack(item,list)">新建回款记录</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <img class="freeContract" v-if="item.contractType == 1" src="@/views/icons/enterprise/freeContract.png">
                          <div class="dataBoxRig">
                            <div class="btnMt">
                              <el-button class="violet" size="small" @click="goCheckContract(item.contractId,item.isOneself)">查看</el-button>
                            </div>
                            <div class="btnMt">
                              <el-button class="primary" size="small" @click="goEditContract(item.contractId,item.isOneself)" v-if="allowUpdate.twoAllow && item.isOneself == 1">编辑
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
<!--          </el-checkbox-group>-->
        </div>
        <div class="noMore" style="cursor: pointer" v-if="total - contractList.length > 0" @click="getMore">
          点击加载更多
        </div>
        <div class="noMore" v-else>
          没有更多
        </div>
      </el-card>

      <!--置顶-->
      <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
        <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
          <img src="../icons/enterprise/back_top.png" alt="">
        </a>
      </div>
    </div>

    <!--计划回款-->
    <el-dialog title="新增回款记录" :visible.sync="planBackVisible" width="50%" :before-close="cancelPlanBack">
      <el-form :model="planBackForm" :rules="planBackRules" ref="planBackForm" label-width="140px">
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="planBackForm.companyName" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="planBackForm.projectName" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目立项批准金额" prop="approvalMoney">
          <el-input type="number" min="0" maxlength="4" @input.native="inputXz" oninput="if(value && value>9999999)value=9999999" v-model="planBackForm.approvalMoney" clearable placeholder="请输入项目立项批准金额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="财政级别" prop="paymentLevel">
          <el-select v-model="planBackForm.paymentLevel" placeholder="财政级别" clearable>
            <el-option v-for="item in paymentLevelList" :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回款阶段" prop="paymentType">
          <el-select placeholder="回款阶段" clearable v-model="planBackForm.paymentType">
            <el-option-group
              v-for="group in payMethods"
              :key="group.lable"
              :label="group.lable">
              <el-option
                v-for="item in group.options"
                :key="item.paymentMode"
                :label="item.paymentModeName"
                :value="item.paymentMode">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="回款日期" prop="paymentDate">
          <el-date-picker clearable v-model="planBackForm.paymentDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择计划回款日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="回款金额" prop="paymentAmount">
          <el-input type="number" min="0" v-model="planBackForm.paymentAmount" @input.native="inputXzPayment" oninput="if(value && value>9999999)value=9999999" clearable placeholder="请输入回款金额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
<!--        <el-form-item label="提成类型" prop="typeMoney">-->
<!--          <el-radio-group v-model="planBackForm.typeMoney" class="radio-type">-->
<!--            <el-radio :label="1">金额</el-radio>-->
<!--            <el-radio :label="0">比例</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="提成" prop="commission">-->
<!--          <el-input type="number" min="0" v-model="planBackForm.commission" @input.native="inputXz" oninput="if(value && value>9999999)value=9999999" clearable placeholder="请输入提成">-->
<!--            <template slot="append" v-if="planBackForm.typeMoney == 1">元</template>-->
<!--            <template slot="append" v-if="planBackForm.typeMoney == 0">%</template>-->
<!--          </el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="收款人" prop="paymentUserId">
          <el-select v-model="planBackForm.paymentUserId" placeholder="收款人" clearable filterable>
            <el-option v-for="item in userList" :key="item.userId"
                       :label="item.userName"
                       :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回款依据" prop="basisFileIds">
          <el-upload
            :http-request="handleUpload"
            :before-upload="uploadBeforeFile"
            class="image-uploader"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
            :on-preview="downFileHandle"
            action=""
          >
            <el-button type="primary" class="btn export" size="small">上传</el-button>
          </el-upload>
          <p style="margin-top:10px;font-size:12px;color:#ff3f4b;line-height: normal;">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPlanBack">取 消</el-button>
        <el-button class="bg_blue" @click="savePlanBack('planBackForm')" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改签订人" :visible.sync="editPersonVisible" width="586px">
      <el-form :model="editPersonForm" ref="editPersonForm" label-width="70px">
        <el-form-item label="签订人" prop="enterprise_name">
          <el-select v-model="editPersonForm.userId" filterable placeholder="请选择签订人" size="small" clearable>
            <el-option v-for="item in userList" :key="item.userId" :label="item.userName"
                       :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPersonVisible = false">取 消</el-button>
        <el-button class="bg_blue" @click="savePerson" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {commonDictOfRegion, commonDict, downloadCrm,addFileBatch} from '@/api/utils'
  import {getDepartmentTree} from '@/api/department.js'
  import {queryUserComboInfo} from '@/api/customerCenter.js'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import { uploadFilesOss } from '@/utils/uploadFilesOss'
  import { projectOrderUpload } from '@/utils/uploadPathMethods'
  import {ossFileDownload} from '@/api/customerCenter'

  import {
    queryAllContract,
    batchDeleteContract,
    batchEditContractSignUser,
    exportContract,
    savePaymentRecord,
    deletePaymentRecord,
    queryPaymentMode
  } from '@/api/contractManage'

  export default {
    data() {
      return {
        btnFlag: 0,
        approvedInfo: '',
        titleSeriesList: [],
        contractName: '',
        moreCondition: false,
        checkList: [],
        department: '',
        departmentList: [
          {
            dictName: '部门1', dictId: 1
          },
          {
            dictName: '部门2', dictId: 2
          },
          {
            dictName: '部门3', dictId: 3
          },
        ],
        contractList: [],
        contractTotalCount: 0,
        orderTotalCount: 0,
        payBackCount: 0,
        payBackRecheck: 0,
        level: 3,
        parentId: 0,
        provinceList: [],
        cityList: [],
        districtList: [],
        townList: [],
        contractForm: {
          page: 0,
          pageSize: 20,
          orderType: 'DESC',
          orderField: 'c.createTime',
          deptIds:[],
        },
        showPaymentState:'',
        showContractState:'',
        signingDate: [],
        availableDate: [],
        approvalDate: [],
        planPaymentDate: [],
        paymentDate: [],
        fileList: [],
        planBackVisible: false,
        planBackForm: {},
        editPersonVisible: false,
        editPersonForm: {
          userId: ''
        },
        planBackRules: {
          approvalMoney: [
            {required: true, message: '请输入项目立项批准金额', trigger: 'change'}
          ],
          paymentLevel: [
            {required: true, message: '请选择财政级别', trigger: 'change'}
          ],
          paymentType: [
            {required: true, message: '请选择回款阶段', trigger: 'change'}
          ],
          paymentUserId: [
            {required: true, message: '请选择收款人', trigger: 'change'}
          ],
          paymentDate: [
            {required: true, message: '请选择回款日期', trigger: 'change'}
          ],
          paymentAmount: [
            {required: true, message: '请输入回款金额', trigger: 'change'}
          ],
          // typeMoney: [
          //   {required: true, message: '请选择提成类型', trigger: 'change'}
          // ],
          // commission: [
          //   {required: true, message: '请输入提成金额', trigger: 'change'}
          // ],
          // basisFileIds: [
          //   {required: true, message: '请上传回款依据', trigger: 'change'}
          // ]
        },
        selectConditionsList: {},
        sortId: 3,
        sortList: [
          {label: '签约日期倒序', value: 'c.signDate', key: 'DESC', id: 1},
          {label: '签约日期顺序', value: 'c.signDate', key: 'ASC', id: 2},
          {label: '创建日期倒序', value: 'c.createTime', key: 'DESC', id: 3},
          {label: '创建日期顺序', value: 'c.createTime', key: 'ASC', id: 4},
        ],
        projectLevelList: [
          {label: '国家级', value: 1},
          {label: '省级', value: 2},
          {label: '市级', value: 3},
          {label: '区县级', value: 4},
          {label: '镇街级', value: 5}
        ],
        paymentLevelList: [
          {label: '国家级', value: 1},
          {label: '省级', value: 2},
          {label: '市级', value: 3},
          {label: '区县级', value: 4},
          {label: '镇街级', value: 5}
        ],
        contractStateList: [
          {label: '履行中', value: 0},
          {label: '解约', value: 1},
          {label: '作废', value: 2},
          {label: '终止', value: 3},
          {label: '已完成', value: -1},
        ],
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
          ]
        },
        total: 0,
        deptmentList: [],
        userList: [],
        projectPersonList: [],
        auditPersonList: [],
        companyLevelList: [],
        projectForm: {
          page: 0,
          pageSize: 20,
          orderField:'sales',
          orderType: 'DESC'
        },
        projectList: [],
        loading: false,
        unsettled: false,
        completed: false,
        notApproved: false,
        hasApproved: false,

        //列表框背景色
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],

        //回款阶段数据
        payMethods: [],
        yearList: [],
        showFour: true,

        allowGetList: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:LIST'),//查询合同列表
        allowChooseCompany: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:COMPANY:LIST'),//选择企业
        allowSignCompany: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:SIGNCOMPANY:LIST'),//签约公司页面查询
        allowChannelCompany: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:CHANNELCOMPANY:LIST'),//渠道商页面查询
        allowGetCompanyNumber: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:GENERATE:NUMBER'),//生成合同编号
        allowGetProjectList: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:PROJECT:QUERYLIST'),//查询项目
        allowAdd: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:INSERT'),//保存合同信息
        allowDeleteOrder: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:ORDER:DELETE'),//删除合同关联订单
        allowDelete: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:DELETE'),//批量删除合同
        allowUpdate: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:UPDATE'),//修改合同
        allowExport: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:MANAGE:CONTRACT:EXPORT'),//导出合同列表
        allowChangePerson: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:MANAGE:BATCHEDITCONTRACTSIGNUSER'),//合同列表批量修改签订人

        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
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
      if(localStorage.getItem('searchName') == ''){
        this.contractForm = {page: 0, pageSize: 20};
        this.selectConditionsList = {};
        this.$set(this.contractForm, 'companyName', localStorage.getItem('searchName'));
      }
      if (localStorage.getItem('searchName')) {
        if (localStorage.getItem('searchName') !== '') {
          this.contractForm = {page: 0, pageSize: 20};
          this.selectConditionsList = {};
          this.$set(this.contractForm, 'companyName', localStorage.getItem('searchName'));
        }
      }

      if (localStorage.getItem('orderParams') && localStorage.getItem('orderParams') !== '') {
        let localParams = JSON.parse(localStorage.getItem('orderParams'));
        this.contractForm = {page: 0, pageSize: 20};
        this.selectConditionsList = {};
        this.contractForm.contractIds = localParams.arr;
        this.$set(this.contractForm, 'companyName', '')
        if (localParams.num === 9) {
          this.$set(this.selectConditionsList, 'contractIds', '其他 - 回款待审核')
        }
        // this.getOrderList();goContractParams(num)
      }

      if (localStorage.getItem('contractParams') && localStorage.getItem('contractParams') !== '') {
        let localParams = JSON.parse(localStorage.getItem('contractParams'));
        this.contractForm = {page: 0, pageSize: 20};
        this.selectConditionsList = {};
        this.contractForm.contractIds = localParams.arr;
        this.$set(this.contractForm, 'companyName', '')
        if (localParams.num === 0) {
          this.$set(this.selectConditionsList, 'contractIds', '其他 - 已回款')
        }
        // this.getOrderList();
      }

      window.addEventListener('scroll', this.scrollToTop);

      if(this.$store.getters.contractPage != 0){
        this.contractForm.page = 0;
        this.contractForm.pageSize = this.$store.getters.contractPage + 20;
        this.getContractList();
      }else{
        this.contractForm.page = this.$store.getters.contractPage;
        this.contractForm.pageSize = 20;
        this.getContractList();
      }

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.contractScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    deactivated() {
      localStorage.removeItem('searchName')
      localStorage.removeItem('orderParams')
      localStorage.removeItem('contractParams')
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_CONTRACT_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_CONTRACT_PAGE', this.contractForm.page)
      next()
    },
    methods: {
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
                this.$set(this.selectConditionsList, 'titleSeriesList', `职称系列 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'titleSeriesList')
        }
        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },

      // 获取左侧公司部门列表
      getCompanyList() {
        getDepartmentTree({}).then(res => {
          if (res.code == 200) {
            this.deptmentList = res.data.deptInfoTreeVos;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name, deptIds,isExcludePermission) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (deptIds != undefined) {
          formData.append('deptIdList', deptIds)
        }
        if(isExcludePermission != undefined){
          formData.append('isExcludePermission', isExcludePermission)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            if (name == '项目主管,项目员,专利主管,专利员') {
              this.projectPersonList = res.data;
            }
            if(name == '审计员'){
              this.auditPersonList = res.data
            }
            if (name == '业务员,业务主管') {
              this.userList = res.data;
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:CUSTOMER_LEVEL',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.companyLevelList = res.data['DICT:CUSTOMER_LEVEL']
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //打开筛选框
      openCond() {
        this.moreCondition = !this.moreCondition;
        this.userList = [];
        this.getTitleSeries()
        this.getRegionList();
        this.getCompanyList();
        this.getCommonData();
        this.getProjectList();
        this.getAllYearList();
        this.getPersonList('项目主管,项目员,专利主管,专利员','',true)
        this.getPersonList('业务员,业务主管','',true)
        this.getPersonList('审计员','',true)
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
              this.provinceList = res.data
            }
            if (this.level == 2) {
              this.cityList = res.data
            }
            if (this.level == 1) {
              this.districtList = res.data
            }
            if (this.level == 0) {
              this.townList = res.data
            }

          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //跳转新建页面
      goAddContract() {
        this.$router.push({
          path: '/contract/addContract'
        })
      },

      //获取合同列表
      getContractList() {
        if (!this.allowGetList.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取此列表');
          return;
        }
        queryAllContract(this.contractForm).then(res => {
          if (res.code == 200) {
            let list = res.data.data;
            let newRes = [];
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

            if (this.contractForm.page > 0) {
              this.contractList = this.contractList.concat(newRes);
              this.total = res.data.total;
            } else {
              this.contractList = newRes;
              this.total = res.data.total;
              this.checkList = [];

              if(this.$store.getters.contractPage != 0){
                this.contractForm.page = this.$store.getters.contractPage;
                this.contractForm.pageSize = 20;
              }
            }

            if(this.contractList.length > 0){
              this.contractTotalCount = this.contractList[0].contractTotalCount
            }else{
              this.contractTotalCount = 0
            }

            if(this.contractList.length > 0){
              this.orderTotalCount = this.contractList[0].orderTotalCount
            }else{
              this.orderTotalCount = 0
            }

            if(this.contractList.length > 0){
              this.payBackCount = this.contractList[0].payBackCount
            }else{
              this.payBackCount = 0
            }

            if(this.contractList.length > 0){
              this.payBackRecheck = this.contractList[0].payBackRecheck
            }else{
              this.payBackRecheck = 0
            }

            this.contractList.forEach(item=>{
              item.crmContractVoList.forEach(list=>{
                if(list.signUserId == this.$store.getters.userId){
                  this.$set(list, 'isOneself', 1)
                }else{
                  this.$set(list, 'isOneself', 0)
                }
              })
            })

            //去重
            let obj = {}
            this.contractList = this.contractList.reduce((cur, next) => {
              obj[next.companyIdMain] ? '' : obj[next.companyIdMain] = true && cur.push(next)
              return cur
            }, [])

          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //搜索
      goSearch() {
        this.contractForm.page = 0;
        this.getContractList();
      },

      //跳转查看合同
      goCheckContract(id,isOneself) {
        this.$router.push({
          path: '/contract/checkContract',
          query: {
            contractId: id,
            isCheck: true,
            isOneself: isOneself
          }
        })
      },

      //跳转编辑合同
      goEditContract(id,isOneself) {
        this.$router.push({
          path: '/contract/checkContract',
          query: {
            contractId: id,
            isOneself: isOneself
          }
        })

        this.cancelBubble();
      },

      //批量删除合同
      allDelete() {
        if (this.checkList.length < 1) {
          this.$message.error('至少勾选一个合同')
          return
        }

        let contractIds = [];
        this.checkList.forEach(item=>{
          contractIds.push(item.contractId)
        })

        // this.contractList.forEach(list=>{
        //   list.crmContractVoList.forEach(str=>{
        //     contractIds.forEach(item=>{
        //       if(item == str.contractId){
        //         if(str.isOneself == 0){
        //           this.$message.warning('包含不是您签订的合同，无法删除，请检查');
        //           throw new Error();
        //         }
        //       }
        //     })
        //   })
        // })

        this.$confirm('删除合同会把所有关联订单信息都删除，是否确定删除合同', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let formData = new FormData;
          formData.append('contractIds', contractIds)
          batchDeleteContract(formData).then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功！');
              this.checkList = [];
              this.contractForm.page = 0;
              this.getContractList();

              this.contractList.forEach(item=>{
                item.crmContractVoList.forEach(list=>{
                  this.$set(list, 'check', false)
                })
              })
            } else {
              this.$message.warning(res.message)
            }
          })
        })
      },

      //排序
      handledSelect(e) {
        this.contractForm.orderType = '';
        this.contractForm.orderField = '';
        this.sortList.forEach(item => {
          if (e == item.id) {
            this.contractForm.orderType = item.key;
            this.contractForm.orderField = item.value;
          }
        })
        this.contractForm.page = 0;
        this.getContractList();
      },

      /*
        * 筛选条件方法
       */
      //选择部门
      deptmentChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.deptmentList.forEach(item => {
              if (item.deptId == val) {
                arr.push(item.deptName)
              }
            });

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'deptIds', `业务部门 - ${string}`)
          })

        } else {
          this.$delete(this.selectConditionsList, 'deptIds')
          this.$delete(this.selectConditionsList, 'signUserIds')
          this.userList = [];
        }
        this.getPersonList('业务员,业务主管',val,true)

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择工程部门
      deptmentChange2(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.deptmentList.forEach(item => {
              if (item.deptId == val) {
                arr.push(item.deptName)
              }
            });

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectDeptIds', `工程部门 - ${string}`)
          })

        } else {
          this.$delete(this.selectConditionsList, 'projectDeptIds')
          this.$delete(this.selectConditionsList, 'signUserIds')
          this.userList = [];
        }
        this.getPersonList('项目主管,项目员,专利主管,专利员',val,true)

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择审计部门
      deptmentChange3(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.deptmentList.forEach(item => {
              if (item.deptId == val) {
                arr.push(item.deptName)
              }
            });

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'auditorDeptIds', `审计部门 - ${string}`)
          })

        } else {
          this.$delete(this.selectConditionsList, 'auditorDeptIds')
          this.$delete(this.selectConditionsList, 'signUserIds')
          this.userList = [];
        }
        this.getPersonList('审计员',val,true)

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择签订人
      signUserChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.userList.forEach(item => {
              if (item.userId == val) {
                arr.push(item.userName)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'signUserIds', `签订人 - ${string}`)
          })

        } else {
          this.$delete(this.selectConditionsList, 'signUserIds')
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择签订时间
      signDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signDate', '签约日期 - ' + val[0] + '-' + val[1])
          this.contractForm.signDateStart = val[0];
          this.contractForm.signDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'signDate')
          this.contractForm.signDateStart = '';
          this.contractForm.signDateEnd = '';
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择到期日期
      availableDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'availableDate', '到期日期 - ' + val[0] + '-' + val[1])
          this.contractForm.availableDateStart = val[0];
          this.contractForm.availableDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'availableDate')
          this.contractForm.availableDateStart = '';
          this.contractForm.availableDateEnd = '';
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择立项日期
      approvalDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'approvalDate', '立项日期 - ' + val[0] + '-' + val[1])
          this.contractForm.approvalDateStart = val[0];
          this.contractForm.approvalDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'approvalDate')
          this.contractForm.approvalDateStart = '';
          this.contractForm.approvalDateEnd = '';
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择计划回款日期
      planPaymentDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'planPaymentDate', '计划回款日期 - ' + val[0] + '-' + val[1])
          this.contractForm.planPaymentDateStart = val[0];
          this.contractForm.planPaymentDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'planPaymentDate')
          this.contractForm.planPaymentDateStart = '';
          this.contractForm.planPaymentDateEnd = '';
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择回款日期
      paymentDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'paymentDate', '回款日期 - ' + val[0] + '-' + val[1])
          this.contractForm.paymentDateStart = val[0];
          this.contractForm.paymentDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'paymentDate')
          this.contractForm.paymentDateStart = '';
          this.contractForm.paymentDateEnd = '';
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择回款状态
      paymentStateChange(val){
        let name = val == 2 ? '未回款' : val == 3 ? '未完全回款' : val == 4 ? '已完全回款' : '-'
        // if (val) {
        //   this.$set(this.selectConditionsList, 'paymentState', '回款状态 - ' + name)
        // } else {
        //   this.$delete(this.selectConditionsList, 'paymentState')
        // }

        if(val !== 0 && val == ''){
          this.$delete(this.selectConditionsList, 'paymentState')
        }else{
          this.$set(this.selectConditionsList, 'paymentState', '回款状态 - ' + name)
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择签订开始时间
      signDateStartChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signDateStart', '签订开始时间 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'signDateStart')
        }
        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择签订结束时间
      signDateEndChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signDateEnd', '签订结束时间 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'signDateEnd')
        }
        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择履行状态
      contractStateChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.contractStateList.forEach(item => {
              if (item.value == val) {
                arr.push(item.label)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'contractStates', `履行状态 - ${string}`)
          })

        } else {
          this.$delete(this.selectConditionsList, 'contractStates')
        }

        // if (val != undefined) {
        //   if(val === ''){
        //     this.$delete(this.selectConditionsList, 'contractState')
        //   }else{
        //     this.$set(this.selectConditionsList, 'contractState', '履行状态 - ' + this.contractStateList.find(ele => ele.value === val).label)
        //   }
        // } else {
        //   this.$delete(this.selectConditionsList, 'contractState')
        // }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择项目
      projectChange(val) {
        const arr = []
        this.contractForm.projectNames = [];
        if (val.length != 0) {
          val.forEach(val => {
            this.projectList.forEach(item => {
              if (item.projectId == val) {
                arr.push(item.projectName)
                this.contractForm.projectNames.push(item.projectName)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectIds', `项目 - ${string}`)
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'projectIds')
          this.$delete(this.selectConditionsList, 'projectNames')
          if(this.contractForm.projectIds == '' && this.contractForm.projectYears == '' && this.contractForm.areaLevels == '' ){
            this.showFour = true;
            this.$delete(this.contractForm, 'searchNotFinished')
            this.$delete(this.contractForm, 'searchFinished')
            this.$delete(this.contractForm, 'searchNowReport')
            this.$delete(this.contractForm, 'searchAlreadyReport')
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
          }
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择项目年度
      projectYearChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.yearList.forEach(item => {
              if (item == val) {
                arr.push(item)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectYears', `项目年度 - ${string}`)
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'projectYears')
          if(this.contractForm.projectIds == '' && this.contractForm.projectYears == '' && this.contractForm.areaLevels == '' ){
            this.showFour = true;
            this.$delete(this.contractForm, 'searchNotFinished')
            this.$delete(this.contractForm, 'searchFinished')
            this.$delete(this.contractForm, 'searchNowReport')
            this.$delete(this.contractForm, 'searchAlreadyReport')
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
          }
        }

        this.contractForm.page = 0
        this.contractList = []
        this.getContractList()
      },
      //选择项目级别
      projectLevelChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.projectLevelList.forEach(item => {
              if (item.value == val) {
                arr.push(item.label)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'areaLevels', `项目级别 - ${string}`)
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'areaLevels')
          if(this.contractForm.projectIds == '' && this.contractForm.projectYears == '' && this.contractForm.areaLevels == '' ){
            this.showFour = true;
            this.$delete(this.contractForm, 'searchNotFinished')
            this.$delete(this.contractForm, 'searchFinished')
            this.$delete(this.contractForm, 'searchNowReport')
            this.$delete(this.contractForm, 'searchAlreadyReport')
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
          }
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择立项情况
      changeProjectBegin(){
        if (this.approvedInfo.includes('unsettled')){
          this.contractForm.searchNotFinished = 1
        } else {
          this.$delete(this.contractForm, 'searchNotFinished')
        }
        if (this.approvedInfo.includes('completed')) {
          this.contractForm.searchFinished = 1
        } else {
          this.$delete(this.contractForm, 'searchFinished')
        }
        if (this.approvedInfo.includes('notApproved')) {
          this.contractForm.searchNowReport = 1
        } else {
          this.$delete(this.contractForm, 'searchNowReport')
        }
        if (this.approvedInfo.includes('hasApproved')) {
          this.contractForm.searchAlreadyReport = 1
        } else {
          this.$delete(this.contractForm, 'searchAlreadyReport')
        }


        // if(this.unsettled == true){
        //   this.contractForm.searchNotFinished = 1
        // }else{
        //   this.$delete(this.contractForm, 'searchNotFinished')
        // }
        //
        // if(this.completed == true){
        //   this.contractForm.searchFinished = 1
        // }else{
        //   this.$delete(this.contractForm, 'searchFinished')
        // }
        //
        // if(this.notApproved == true){
        //   this.contractForm.searchNowReport = 1
        // }else{
        //   this.$delete(this.contractForm, 'searchNowReport')
        // }
        //
        // if(this.hasApproved == true){
        //   this.contractForm.searchAlreadyReport = 1
        // }else{
        //   this.$delete(this.contractForm, 'searchAlreadyReport')
        // }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.getContractList()
      },
      //选择项目工程师
      engineerUser(val) {
        const arr = []
        if (val.length != 0) {
          this.projectPersonList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'projectPersonnelIdList', `项目工程师 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'projectPersonnelIdList')
        }
        // if (val) {
        //   this.$set(this.selectConditionsList, 'projectPersonnelIdList', '项目工程师 - ' + this.projectPersonList.find(ele => ele.userId === val).userName)
        // } else {
        //   this.$delete(this.selectConditionsList, 'projectPersonnelIdList')
        // }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择审计人员
      auditUserChange(val) {
        const arr = []
        if (val.length != 0) {
          this.auditPersonList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'auditorIds', `审计人员 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'auditorIds')
        }

        // if (val) {
        //   this.$set(this.selectConditionsList, 'auditorId', '审计人员 - ' + this.auditPersonList.find(ele => ele.userId === val).userName)
        // } else {
        //   this.$delete(this.selectConditionsList, 'auditorId')
        // }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择省份
      provinceChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'provinceId', '省份 - ' + this.provinceList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'provinceId')
        }

        this.$delete(this.selectConditionsList, 'cityId')
        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')
        this.contractForm.cityId = '';
        this.contractForm.districtId = '';
        this.contractForm.townId = '';
        this.parentId = val
        this.level = 2;
        this.getRegionList()
        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择城市
      cityChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'cityId', '城市 - ' + this.cityList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'cityId')
        }
        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')
        this.contractForm.districtId = '';
        this.contractForm.townId = '';
        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.parentId = val
        this.level = 1;
        this.getRegionList()
        this.getContractList()
      },
      //选择区县
      districtChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'districtId', '区县 - ' + this.districtList.find(ele => ele.dictId === val).dictName)
          this.$delete(this.selectConditionsList, 'townId')
        } else {
          this.$delete(this.selectConditionsList, 'districtId')
          this.$delete(this.selectConditionsList, 'townId')
        }
        this.contractForm.townId = '';
        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.parentId = val
        this.level = 0;
        this.getRegionList()
        this.getContractList()
      },
      //选择镇街
      townChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'townId', '镇街 - ' + this.townList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'townId')
        }
        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择新老客户
      newOldChange(val) {
        var name = val == '0' ? '新客户' : val == '1' ? '老客户' : undefined;
        if (name != undefined) {
          this.$set(this.selectConditionsList, 'newOrOld', '新老客户 - ' + name)
        } else {
          this.$delete(this.selectConditionsList, 'newOrOld')
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择客户级别
      companyLevelChange(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.companyLevelList.forEach(item => {
              if (item.dictId == val) {
                arr.push(item.dictName)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'companyLevels', `客户级别 - ${string}`)
          })

        } else {
          this.$delete(this.selectConditionsList, 'companyLevels')
        }

        // if (val) {
        //   this.$set(this.selectConditionsList, 'companyLevel', '客户级别 - ' + this.companyLevelList.find(ele => ele.dictId === val).dictName)
        // } else {
        //   this.$delete(this.selectConditionsList, 'companyLevel')
        // }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },
      //选择是否渠道商
      channelChange(val) {
        var name = val == '0' ? '不是' : val == '1' ? '是' : undefined;
        if (name != undefined) {
          this.$set(this.selectConditionsList, 'isChannel', '是否渠道商 - ' + name)
        } else {
          this.$delete(this.selectConditionsList, 'isChannel')
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.contractList = []
        this.getContractList()
      },

      //获取项目列表
      getProjectList(name) {
        if (!this.allowGetProjectList.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取项目列表');
          return;
        }
        if (name) {
          this.projectForm.projectName = name;
        }else{
          this.projectForm.projectName = '';
        }

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
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.getProjectList(query)
          }, 200)
        } else {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.getProjectList()
          }, 200)
        }
      },

      //加载更多
      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      //删除筛选调节
      deleteOneClick(item) {
        this.contractList = []
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.contractForm, item)

        if(item == 'deptIds'){
          this.getPersonList('业务员,业务主管','',true)
        }
        if(item == 'projectDeptIds'){
          this.getPersonList('项目主管,项目员,专利主管,专利员','',true)
        }
        if(item == 'auditorDeptIds'){
          this.getPersonList('审计员','',true)
        }
        if (item == 'signDate') {
          this.signingDate = []
          this.contractForm.signDateStart = '';
          this.contractForm.signDateEnd = '';
        }
        if (item == 'availableDate') {
          this.availableDate = []
          this.contractForm.availableDateStart = '';
          this.contractForm.availableDateEnd = '';
        }
        if (item == 'approvalDate') {
          this.approvalDate = []
          this.contractForm.approvalDateStart = '';
          this.contractForm.approvalDateEnd = '';
        }
        if (item == 'planPaymentDate') {
          this.planPaymentDate = []
          this.contractForm.planPaymentDateStart = '';
          this.contractForm.planPaymentDateEnd = '';
        }
        if (item == 'paymentDate') {
          this.paymentDate = [];
          this.contractForm.paymentDateStart = '';
          this.contractForm.paymentDateEnd = '';
        }
        if(item == 'projectIds'){
          this.$delete(this.contractForm, 'projectNames')
        }

        if((!this.contractForm.projectIds || this.contractForm.projectIds == '') && (!this.contractForm.projectYears || this.contractForm.projectYears == '') && (!this.contractForm.areaLevels || this.contractForm.areaLevels == '')){
          this.showFour = true;
          this.unsettled = false;
          this.completed = false;
          this.notApproved = false;
          this.hasApproved = false;
          this.$delete(this.contractForm, 'searchNotFinished')
          this.$delete(this.contractForm, 'searchFinished')
          this.$delete(this.contractForm, 'searchNowReport')
          this.$delete(this.contractForm, 'searchAlreadyReport')
        }

        this.contractForm.page = 0
        this.contractForm.pageSize = 20
        this.getContractList()
      },

      //清除所有条件
      deleteAllClick() {
        this.contractList = []
        this.getPersonList('业务员,业务主管','',true)
        this.selectConditionsList = {}
        this.signingDate = []
        this.contractForm.signDateStart = '';
        this.contractForm.signDateEnd = '';
        this.availableDate = []
        this.contractForm.availableDateStart = '';
        this.contractForm.availableDateEnd = '';
        this.approvalDate = []
        this.contractForm.approvalDateStart = '';
        this.contractForm.approvalDateEnd = '';
        this.planPaymentDate = []
        this.contractForm.planPaymentDateStart = '';
        this.contractForm.planPaymentDateEnd = '';
        this.paymentDate = []
        this.contractForm.paymentDateStart = '';
        this.contractForm.paymentDateEnd = '';
        this.showFour = true;
        this.contractForm = {}
        this.contractForm.page = 0
        this.contractForm.pageSize = 20;
        this.unsettled = false;
        this.completed = false;
        this.notApproved = false;
        this.hasApproved = false;
        this.getContractList()
      },

      //下载更多
      getMore() {
        this.contractForm.page = this.contractForm.page + 20;
        this.getContractList()
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
        this.cancelBubble();
      },

      //选择合同
      checkContractChange(e,data){
        if (e != true) {
          this.checkList.forEach((item, index) => {
            if (data.contractId == item.contractId) {
              this.checkList.splice(index, 1)
            }
          })
        } else {
          this.checkList.push(data)

          let obj = {};
          this.checkList = this.checkList.reduce((cur, next) => {
            obj[next.contractId] ? '' : obj[next.contractId] = true && cur.push(next);
            return cur
          }, []);
        }
      },

      // 全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.checkList = []
          var _this = this
          this.contractList.forEach(function (item, index) {
            item.crmContractVoList.forEach(list => {
              _this.$set(list, 'check', false)
            })
          })
          this.isCheckAll = false
        } else {
          var _this = this
          this.contractList.forEach(function (item, index) {
            item.crmContractVoList.forEach(list => {
              if (_this.checkList.indexOf(list) === -1) {
                _this.checkList.push(list)
                _this.$set(list, 'check', true)
              }
            })
            _this.isCheckAll = true
          })
        }
      },

      //*************************************************************

      //打开修改签订人弹窗
      editPersonOpen() {
        if (this.checkList.length < 1) {
          this.$message.error('至少勾选一个合同')
          return
        }

        this.contractList.forEach(list=>{
          this.checkList.forEach(item=>{
            if(item == list.contractId){
              if(list.isOneself == 0){
                this.$message.warning('包含不是您签订的合同，无法修改，请检查');
                throw new Error();
              }
            }
          })
        })

        this.editPersonForm.userId = '';
        this.editPersonForm.contractIds = this.checkList
        this.getPersonList('业务员,业务主管')
        this.editPersonVisible = true
      },

      //修改签订人
      savePerson() {
        if(this.editPersonForm.userId == '' || this.editPersonForm.userId == undefined){
          this.$message.warning('请选择签订人');
          return;
        }

        let contractIds = [];
        this.editPersonForm.contractIds.forEach(item=>{
          contractIds.push(item.contractId)
        })

        let formData = new FormData;
        formData.append('contractIds', contractIds)
        formData.append('userId', this.editPersonForm.userId)
        batchEditContractSignUser(formData).then(res => {
          if (res.code == 200) {
            this.$message.success('修改成功！');
            this.checkList = [];
            this.editPersonVisible = false
            this.contractForm.page = 0;
            this.getContractList();
            this.editPersonForm = {
              userId: ''
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //导出
      exportList() {
        let contractIds = [];
        this.checkList.forEach(item=>{
          contractIds.push(item.contractId)
        })

        this.contractForm.page = 0;
        this.contractForm.pageSize = this.total
        this.contractForm.contractIds = contractIds;
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
            })
          }
        })
      },

      //跳转项目详情
      goProject(id) {
        this.$router.push({'path': '/policy/project/detail', 'query': {'id': id, 'check': true}})
      },

      //跳转企业详情
      goCompany(item,id) {
        if(item.relevanceCompanyExist == 3){
          this.$message.warning('该企业不存在，无法跳转');
          return;
        }
        this.$router.push({'path': '/customer/editCustomer', 'query': {'id': id, 'check': false,isContractListSkipFlag: 1}})
      },

      //显示回款记录
      showBackChange(val){
        // if(val == true){
        //   this.contractForm.paymentState = 1
        // }else{
        //   this.contractForm.paymentState = '';
        // }

        this.getContractList();
      },

      //打开计划回款弹窗
      openPlanBack(item, data) {
        this.cancelBubble();
        // if(data.paymentAgreementCount == 0){
        //   this.$message.warning('该订单没有收款阶段，无法新建回款记录');
        //   return;
        // }

        this.planBackForm = {};
        this.planBackVisible = true;
        this.planBackForm.companyId = item.companyId;
        this.planBackForm.companyName = item.companyName;
        this.planBackForm.projectName = data.projectName;
        this.planBackForm.contractId = item.contractId;
        this.planBackForm.orderId = data.orderId;
        this.planBackForm.planId = data.planId;

        this.getPersonList('业务员,业务主管')
        this.getPaymentData(data.orderId);
      },

      //获取计划回款
      getPaymentData(id) {
        let trueOjb = {};
        trueOjb.options = [];
        let falseOjb = {};
        falseOjb.options = [];
        this.payMethods = [];
        queryPaymentMode({orderId: id}).then(res => {
          if (res.code === 200) {
            res.data.forEach(item => {
              if (item.paymentModeType) {
                trueOjb.lable = '历史回款阶段';
                trueOjb.options.push(item);
                // this.payMethods[0] = cloneDeep(trueOjb);
                // this.$set(this.payMethods, 0, trueOjb);
                this.payMethods.push(trueOjb)
              } else {
                falseOjb.lable = '';
                falseOjb.options.push(item);
                // this.payMethods[1] = cloneDeep(falseOjb);
                // this.$set(this.payMethods, this.payMethods.length, falseOjb);
              }
            });
            this.payMethods.push(falseOjb)
          }
        })
      },

      //阻止冒泡
      cancelBubble(e) {
        var evt = e ? e : window.event
        if (evt.stopPropagation) { //W3C
          evt.stopPropagation()
        } else { //IE
          evt.cancelBubble = true
        }
      },

      //关闭新增回款弹窗
      cancelPlanBack(){
        this.planBackVisible = false;
        this.planBackForm = {};
        this.fileList = [];
        this.$refs['planBackForm'].resetFields()
      },

      //提交计划回款
      savePlanBack(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // if (this.planBackForm.typeMoney == 0) {
            //   if (this.planBackForm.commission > 100) {
            //     this.$message.warning('比例不得大于100%')
            //     return
            //   }
            //   this.planBackForm.commission = this.planBackForm.commission / 100
            // }
            //
            // if (this.planBackForm.typeMoney == 1) {
            //   if(this.planBackForm.commission >= this.planBackForm.paymentAmount){
            //     this.$message.warning('提成不得大于或等于回款金额')
            //     return
            //   }
            // }

            savePaymentRecord(this.planBackForm).then(res => {
              if (res.code == 200) {
                this.planBackVisible = false
                this.$refs[name].resetFields()
                this.$message.success('新建成功')
                this.planBackForm = {}
                this.fileList = []
                this.contractForm.page = 0
                this.getContractList()
              }
            })
          } else {
            return false
          }
        })
      },

      //删除回款记录
      deletePayRecord(id){
        this.$confirm('是否确定删除记录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePaymentRecord({recordId:id}).then(res=>{
            if(res.code == 200){
              this.$message.success('删除成功');
              this.contractForm.page = 0;
              this.getContractList();
            }
          })
        })

        this.cancelBubble();
      },

      //查看回款详情
      checkPayment(id){
        this.$router.push({
          path:'/contract/paymentRecordDetail',
          query:{
            recordId:id
          }
        })

        this.cancelBubble();
      },

      //跳转编辑回款
      goPaymentDetail(id){
        this.$router.push({
          path:'/contract/paymentRecordDetail',
          query:{
            isCheck: true,
            recordId:id
          }
        })

        this.cancelBubble();
      },

      //限制输入
      inputXz(e){
        if (e.target.value.indexOf('.') > -1) {
          this.planBackForm.approvalMoney = e.target.value.slice(0, e.target.value.indexOf('.') + 3)
        }
      },

      inputXzPayment(e) {
        if (e.target.value.indexOf('.') > -1) {
          this.planBackForm.paymentAmount = e.target.value.slice(0, e.target.value.indexOf('.') + 3)
        }
      },


      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },

      //上次文件之前
      uploadBeforeFile(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 100
        //
        // if (!isLt2M) {
        //   this.$message.error('上传文件大小不能超过 100MB!')
        // }

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或者png 格式!');
        }

        return isJPG;
      },

      //上传凭证
      handleUpload(option){
        if(!this.planBackForm.companyName || this.planBackForm.companyName == ''){
          this.$message.error('企业名称为空，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if(!this.planBackForm.projectName || this.planBackForm.projectName == ''){
          this.$message.error('项目名称为空，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if(option.file.name.length >= 150){
          this.$message.error('文件名称超长，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }

        let fileSize = option.file.size / 1024
        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = projectOrderUpload(this.planBackForm.companyName,this.planBackForm.projectName,'其他资料',fileName) + '.' + fileType
        uploadFilesOss(filePath, option.file, option).then(res => {
          if(res){
            let FileList = [];
            let addFile = {
              fileName: option.file.name,
              filePath: filePath,
              fileSize: fileSize,
              fileType: fileType,
              parentType:4
            }
            FileList.push(addFile)
            let params = {
              companyId: this.planBackForm.companyId,
              companyName: this.planBackForm.companyName,
              addFileDtos: FileList,
              haveView: true
            }

            addFileBatch(params).then(response=>{
              if(response.code == 200){
                this.$message.success('上传成功');
                this.$set(this.planBackForm,'basisFileIds',response.data[0].fileId)
                this.$set(this.planBackForm,'fileIds',response.data[0].fileId)
                this.$set(this.planBackForm,'fileName',response.data[0].fileName)
                this.$set(this.planBackForm,'fileUrl',response.data[0].fileUrl)
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.fileList = JSON.parse(JSON.stringify(this.fileList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.fileList = JSON.parse(JSON.stringify(this.fileList))
          }
        })
      },

      //下载附件\模板
      downFileHandle(data) {
        if(!data.fileId){
          this.annexList.forEach(item=>{
            if(item.fileName == data.name){
              data = item;
            }
          })
        }

        if (data.fileId) {
          let params = {
            companyId: this.$store.getters.companyId,
            fileId: data.fileId
          };
          ossFileDownload(params).then(res => {
            if (res.code == 200) {
              let url = res.data.replace(/http/,'https')
              window.open(url)
              this.$message({type: 'success', message: '下载成功'});
            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        }
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
    },
  }
</script>

<style lang="less" scoped>
  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 4%;
  }

  .searchCont {
    display: flex;
    justify-content: center;
    max-width: 740px;
    margin: 0 auto;

    /deep/ .el-input__inner {
      height: 100%;
      border-radius: 0;
      border: 1px solid #05AAFF;
    }

    .el-input {
      flex: 1;
    }

    .btn {
      border: 0;
      border-radius: 0;
    }

    .addBtn {
      margin-left: 45px;
    }

    .el-button {
      width: 120px;
    }
  }

  .hotSearch {
    display: flex;
    align-items: center;
    max-width: 740px;
    margin: 0 auto;

    p {
      font-size: 12px;
      color: #042B40;
    }

    span {
      font-size: 12px;
      color: #979797;
      margin-right: 18px;
    }
  }

  .box-card {
    margin-bottom: 14px;
  }

  .bt_blue {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  /deep/ .el-card__header {
    padding: 10px 20px;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);
      margin-right: 10px;

      span {
        color: #F56C6C;
        margin-right: 0px;
      }
    }

    .headBtn {
      margin-left: 40px;
      font-size: 14px;

      .allChoose {
        padding: 6px 8px;
        color: #05AAFF;
        border: 1px solid #05AAFF;
        background-color: #fff;
        border-radius: 2px;
      }

      .export {
        padding: 6px 8px;
        border-radius: 2px;
      }

      .allDelete {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FF8585;
        background-color: #FF8585;
        border-radius: 2px;
      }

      .originBtn {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FD903C;
        background-color: #FD903C;
        border-radius: 2px;
      }
    }
  }

  .headerRig {
    /deep/ .el-select .el-input__inner {
      border: none;
    }
  }

  .cardCont {
    /deep/ .el-card__body {
      padding: 0;
    }
  }

  .dataList {
    .dataBox {
      display: flex;
      padding: 23px 30px;
      border-bottom: 1px solid rgba(68, 68, 68, 0.14901960784313725);
      justify-content: space-between;
      position: relative;
      .freeContract{
        width: 8%;
        /*position: absolute;*/
        /*right: 50%;*/
        /*margin-right: -50%;*/
      }

      .dataBoxLeft {
        width: 100%;
        position: relative;

        /deep/ .el-checkbox {
          width: 100%;
        }

        /deep/ .el-checkbox__label {
          width: 100%;
        }

        .dataLeft {
          display: flex;

          .fileType {
            font-size: 18px;
            width: 60px;
            min-width: 60px;
            height: 60px;
            opacity: 1;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-right: 30px;
            box-sizing: border-box;
            white-space: pre-wrap;
            word-break: break-all;
            padding: 10px;
          }

          .fileDoc {
            background: rgba(105, 204, 255, 1);
          }

          .fileXls {
            background: #91E5A1;
          }

          .filePpt {
            background: #FFCBA6;
          }

          .filePdt {
            background: #FF8585;
          }

          .fileJpg {
            background: #9BB5FF;
          }

          .filePng {
            background: #FE95B2;
          }

          .dataDetail {
            width: 100%;
            .contractlist{
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              background: #fffaf3;
              padding: 10px;
              align-items: flex-start;
              .contractBox{
                flex:1;
                margin-right: 20px;
              }
              &:last-child{
                margin-bottom: 0;
              }
            }

            p {
              font-size: 18px;
              font-weight: bold;
              color: rgba(68, 68, 68, 1);
            }

            .down-img {
              cursor: pointer;
              margin-left: 12px;
            }

            .dataMsg {
              font-size: 14px;
              display: flex;
              align-items: center;
              color: #444;
              flex-wrap: wrap;

              span {
                margin-right: 60px;
                margin-bottom: 10px;
              }
            }
          }

        }
      }

      .dataBoxRig {
        .btnMt {
          text-align: center;
          margin-bottom: 5px;

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
  }

  .conditionCont {
    padding: 10px 20px;

    .conditionBox {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      span {
        font-size: 14px;
        color: #606266;
        margin-right: 10px;
        min-width: 100px;
        text-align: right;
      }

      .el-select {
        margin-right: 10px;
      }

      .el-date-editor {
        margin-right: 10px;
      }
    }
  }

  .conditionChoose {
    font-size: 14px;
    color: #444 !important;

    &::before {
      content: '';
      border-left: 2px solid rgb(3, 173, 244);
      margin-right: 4px;
    }
  }

  .conditionList {
    display: flex;
    align-items: center;

    .conditionBox {
      border: 1px solid #33B3EE;
      font-size: 12px;
      color: #33B3EE;
      padding: 5px;
      margin-right: 10px;
    }
  }

  .conditRig {
    display: flex;
    align-items: center;

    img {
      width: 20%;
    }

    span {
      cursor: pointer;
      font-size: 14px;
      color: #33B3EE;
      white-space: nowrap;
      margin-left: 5px;
    }
  }

  .projectList {
    .projectBox {
      padding: 10px;
      background: #EFFAFF;
      display: flex;
      justify-content: space-between;

      &:hover {
        background: #CDEEFF;
      }

      .projectLeft {
        flex: 1;
        margin-right: 15px;
        display: flex;

        .proNum {
          width: 20px;
          height: 20px;
          background: #FE95B2;
          border-radius: 100%;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }

        .projectMsg {
          flex: 1;

          .paymentCont{
            background: rgba(173, 164, 249, 0.3);
            padding:10px 20px;
            margin-top:10px;
            h4{
              margin-bottom: 10px;
            }
            .payNum{
              width: 15px;
              height: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #009dff;
              border-radius:100%;
              color:#fff;
              font-size: 12px;
              margin-right: 10px;
            }
          }

          .leftBox {
            display: flex;
            flex-wrap: wrap;

            .projectBackLeft {
              display: flex;
              margin-right: 20px;
              flex: 1;
              flex-wrap: wrap;
              h4{
                width: 45%;
              }
            }

            .projectBackRig {
              span {
                color: rgb(88, 131, 255);
                margin-right: 10px;
              }
              .payBlue{
                color:#05aaff;
              }
              .payZhi{
                color: #6e6df9;
              }
              .payRed{
                color: #ff5d65;
              }
            }

            h4 {
              font-size: 12px;
              font-weight: normal;
              width: 20%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              position: relative;
              margin-right: 10px;
            }
          }
        }
      }

      .projectRig {
        span {
          color: rgb(88, 131, 255);
          font-size: 12px;
          margin-left: 10px;
          display: table;
        }
      }
    }
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
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

  .conditionClear {
    border: 1px solid rgb(255, 0, 0);
    font-size: 12px;
    color: rgb(255, 0, 0);
    padding: 5px;
    cursor: pointer;
  }

  .hoverCursor {
    vertical-align: middle;
    margin-left: 3px;
    cursor: pointer;
  }

  /deep/ .el-date-editor .el-range-separator {
    padding: 0;
  }
  .noRead {
    width: 10px;
    height: 10px;
    position: absolute;
    background: red;
    border-radius: 100%;
    color: #fff;
    z-index: 9;
    display: inline-block;
    text-align: center;
    line-height: 16px;
  }

  .fontOrange{
    color: orange;
  }

  /deep/ .el-date-editor {
    .el-input__inner {
      padding: 0 30px;
    }
  }
</style>
