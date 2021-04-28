<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card">
        <div class="searchCont">
          <el-input v-model.trim="orderForm.companyAndProjectName" type="text" placeholder="请输入企业或项目名称"
                    @keyup.enter.native="goSearch"></el-input>
          <el-button type="primary" class="btn bt_blue" @click="goSearch"><span class="bt_font">搜一下</span></el-button>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">已选条件:</span>
            <div class="conditionList">
              <div class="conditionBox" v-for="(value, key) in selectConditionsList">
                {{value}}<img class="hoverCursor" @click="deleteOneClick(key)"
                              src="../../icons/enterprise/close_con.png"/>
              </div>
              <div class="conditionClear" @click="deleteAllClick" v-if="Object.keys(selectConditionsList).length > 1">
                清空所有
              </div>
            </div>
          </div>
          <div class="headerRig conditRig" @click="openCond">
            <img v-if="moreCondition" src="../../icons/enterprise/close_icon.png" style="vertical-align:middle;"/>
            <img v-else src="../../icons/enterprise/open_icon.png" style="vertical-align:middle;"/>
            <span>选择筛选条件</span>
          </div>
        </div>
        <div class="conditionCont" v-if="moreCondition">
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>常用：</span>
                <el-select size="small" filterable multiple v-model="orderForm.signCompanyIds" placeholder="签约公司"
                           clearable @change="signCompanyChange">
                  <el-option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId">
                  </el-option>
                </el-select>
                <el-select size="small" filterable v-model="orderForm.deptIds" placeholder="业务部门" clearable multiple
                           @change="deptmentChange" v-if="allowGetDeptList.twoAllow">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" multiple v-model="orderForm.signUserIdList" placeholder="选择签订人"
                           clearable @change="userChange">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName+'-'+item.roleName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-select size="small" filterable v-model="orderForm.projectDeptIds" placeholder="工程部门" clearable multiple
                           @change="deptmentChange2" v-if="allowGetDeptList.twoAllow">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" multiple v-model="orderForm.projectEngineerIds" placeholder="选择项目员"
                           clearable @change="engineerUser">
                  <el-option
                    v-for="item in projectPersonList"
                    :key="item.userId"
                    :label="item.userName+'-'+item.roleName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-select size="small" filterable v-model="orderForm.auditorDeptIds" placeholder="审计部门" clearable multiple
                           @change="deptmentChange3" v-if="allowGetDeptList.twoAllow">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" multiple v-model="orderForm.auditorIds" placeholder="选择审计员" clearable
                           @change="auditUserChange">
                  <el-option
                    v-for="item in auditPersonList"
                    :key="item.userId"
                    :label="item.userName+'-'+item.roleName"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>项目：</span>
                <el-select filterable multiple remote :remote-method="projectListMethod" v-loadMore="loadMore"
                           :loading="loading" size="small" v-model="orderForm.projectIds" placeholder="项目" clearable
                           @change="projectChange">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                  </el-option>
                </el-select>
                <el-select filterable multiple size="small" v-model="orderForm.areaLevels" placeholder="项目级别" clearable
                           @change="areaLevelChange">
                  <el-option
                    v-for="item in projectLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select size="small" filterable @change='projectYearChange' v-model="orderForm.projectYears"
                           placeholder="项目年度" clearable multiple>
                  <el-option
                    v-for="item in yearList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <el-select size="small" multiple v-model="orderForm.batchs" placeholder="项目批次" clearable
                           @change="bathChange">
                  <el-option
                    v-for="item in batchNoList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select size="small" @change='changeTitleSeries' v-model="orderForm.titleSeriesList" placeholder="职称系列" clearable multiple>
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
                <span>地区：</span>
                <el-select size="small" v-model="orderForm.provinceId" placeholder="省份" clearable
                           @change="changeProvince">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="orderForm.cityId" placeholder="城市" clearable @change="changeCity">
                  <el-option
                    v-for="item in cityList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="orderForm.districtId" placeholder="县区" clearable
                           @change="changeDistrict">
                  <el-option
                    v-for="item in districtList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="orderForm.townId" placeholder="镇街" clearable @change="changeTown">
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
                <span>签单时间：</span>
                <el-date-picker
                  v-model="signDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="signDateChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>录入时间：</span>
                <el-date-picker
                  v-model="createTime"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="createTimeChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <!--          <el-row>-->
          <!--            <el-col>-->
          <!--              <div class="conditionBox">-->
          <!--                <span>计划完成时间：</span>-->
          <!--                <el-date-picker-->
          <!--                  v-model="planCompleteDate"-->
          <!--                  type="daterange"-->
          <!--                  align="left"-->
          <!--                  size="small"-->
          <!--                  unlink-panels-->
          <!--                  range-separator="至"-->
          <!--                  start-placeholder="开始日期"-->
          <!--                  end-placeholder="结束日期"-->
          <!--                  value-format="yyyy-MM-dd"-->
          <!--                  :picker-options="pickerOptions"-->
          <!--                  @change="planCompleteDateChange"-->
          <!--                  class="date-select"-->
          <!--                >-->
          <!--                </el-date-picker>-->
          <!--              </div>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <!--          <el-row>-->
          <!--            <el-col>-->
          <!--              <div class="conditionBox">-->
          <!--                <span>实际完成时间：</span>-->
          <!--                <el-date-picker-->
          <!--                  v-model="realCompleteDate"-->
          <!--                  type="daterange"-->
          <!--                  align="left"-->
          <!--                  size="small"-->
          <!--                  unlink-panels-->
          <!--                  range-separator="至"-->
          <!--                  start-placeholder="开始日期"-->
          <!--                  end-placeholder="结束日期"-->
          <!--                  value-format="yyyy-MM-dd"-->
          <!--                  :picker-options="pickerOptions"-->
          <!--                  @change="realCompleteDateChange"-->
          <!--                  class="date-select"-->
          <!--                >-->
          <!--                </el-date-picker>-->
          <!--              </div>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>环节完成时间：</span>
                <el-date-picker
                  v-model="linkFinish"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="linkFinishDateChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>截止时间：</span>
                <el-date-picker
                  v-model="deadlineDate"
                  type="daterange"
                  align="left"
                  size="small"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  @change="deadlineDateChange"
                  class="date-select"
                >
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>申报状态：</span>
                <el-select size="small" v-model="orderForm.orderState" placeholder="申报状态" clearable @change="orderStateChange">
                  <el-option
                    v-for="item in orderStateList"
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
                <span>评估状态：</span>
                <el-select size="small" v-model="orderForm.orderAssessState" placeholder="评估状态" clearable @change="orderAssessStateChange">
                  <el-option
                    v-for="item in assessStateList"
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
                <span>进度：</span>
                <el-input clearable v-model.trim="orderForm.processName" @keyup.enter.native="goSearch"
                          placeholder="请输入当前进度关键字" size="small" style="width: 200px;margin-right: 10px;"></el-input>
                <el-input clearable v-model.trim="orderForm.completedProcessName" @keyup.enter.native="goSearch"
                          placeholder="请输入完成进度关键字" size="small" style="width: 200px;"></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span>搜索到<span>{{total}}</span>个企业</span>
            <span>订单总数:{{orderTotalCount}}</span>
            <span style="margin-left: 10px;" v-if="checkOrderIds.length > 0">已选中<span>{{checkOrderIds.length}}</span>条记录</span>
            <div class="headBtn">
              <el-button type="primary" class="btn allChoose" size="small" @click="checkAllOrNo">全选</el-button>
              <el-button type="primary" class="btn export" size="small" @click="selectedShow">导出</el-button>
              <!--              <el-button type="primary" class="btn export" size="small">未读</el-button>-->
<!--              <el-button class="btn originBtn" size="small" @click="cancelWorkAndProcess">批量取消订单关联工单和处理流程</el-button>-->
              <el-button class="btn originBtn" size="small" @click="openEditPerson" v-if="allowChangePerson.twoAllow">批量修改处理人</el-button>
              <el-button class="btn originBtn" size="small" @click="openOrderDeductDateDialog" v-if="setOrderDeducatDateBtnShowFlag">设置项目提成核算日期</el-button>
<!--              <el-button class="btn originBtn" size="small" @click="openEditPerson(0)" v-if="allowBatchEngineer.twoAllow">批量修改工程师</el-button>-->
<!--              <el-button class="btn originBtn" size="small" @click="openEditPerson(2)" v-if="allowBatchAuditor.twoAllow">批量修改审计员</el-button>-->
<!--              <el-button class="btn originBtn" size="small" v-if="allowBatchIntellectualEngineer.twoAllow" @click="openEditPerson(1)">批量修改知识产权工程师</el-button>-->
<!--              <el-checkbox label="已读" v-model="readForm.alredyRead" @change="readChange(0)"></el-checkbox>-->
              <el-checkbox label="未读" v-model="readForm.notRead" @change="readChange(1)"></el-checkbox>
              <el-checkbox size="small" v-model="showContractState" @change="showHistoryChange">历史订单</el-checkbox>
              <el-checkbox size="small" v-model="dealtWith" @change="myDealtWithChange">我的待办</el-checkbox>
            </div>
          </div>
          <div class="headerRig">
            <el-select v-model="sort" placeholder="默认排序" @change="sortSelect" clearable>
              <el-option
                v-for="(item,index) in sortList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="dataList">
          <div class="dataBox" v-for="item in orderList">
            <div class="dataBoxLeft">
              <div class="dataLeft">
                <div class="fileType fileDoc" :style="`background:${item.bgColor}`">企业简称</div>
                <div class="dataDetail">
                  <p style="cursor:pointer;" @click="goCompany(item)">{{item.companyName}}</p>
                  <div class="dataMsg">
                    <span>专利数：{{item.patentCount}}</span>
                    <span>商标数：{{item.trademarkCount}}</span>
                    <span>著作权数：{{item.copyrightCount}}</span>
                  </div>
                  <div class="projectList">
                    <!--                    <el-checkbox-group v-model="checkOrderIds" @change="checkOrderChange($event,item.crmCompanyId)">-->
                    <div class="projectBox" v-for="(list,i) in item.innerOrderList">
                      <el-checkbox v-model="list.check" :label="list.orderId" @change="checkOrderChange($event,list)">
                        <div class="projectLeft" @click="goCheckOrder(list.orderId,list.noticeId)">
                          <span class="noRead" v-if="list.isRead == 0">*</span>
                          <span class="proNum">{{i+1}}</span>
                          <div class="projectMsg">
                            <div class="leftBox">
                              <h4>项目：{{list.projectName}}</h4>
                              <h4>签订人：{{list.signUserName}}</h4>
                              <h4>创建时间：{{list.createTime}}</h4>
                              <h4>签订时间：{{list.signDate}}</h4>
                              <!--<h4>工程师：{{list.engineerUserName}}</h4>-->
<!--                              <h4 v-if="list.orderType == 0 || list.orderType == 4">当前工程师：{{list.currentEngineerUserName}}<i-->
<!--                                class="el-icon-edit" v-if="allowBatchEngineer.twoAllow && list.processName != '结束'"-->
<!--                                style="color: #48D462;cursor: pointer;" @click="openEditPerson(0,list)"></i></h4>-->
<!--                              <h4 v-if="list.orderType == 1">当前知识产权工程师：{{list.currentEngineerUserName}}-->
<!--                                <i v-if="allowBatchIntellectualEngineer.twoAllow && list.processName != '结束'" class="el-icon-edit" style="color: #48D462;cursor: pointer;" @click="openEditPerson(1,list)"></i>-->
<!--                              </h4>-->
<!--                              <h4 v-if="list.orderType == 2">当前审计员：{{list.currentEngineerUserName ? list.currentEngineerUserName : list.auditUserName }}<i-->
<!--                                class="el-icon-edit" v-if="allowBatchAuditor.twoAllow && list.processName != '结束'"-->
<!--                                style="color: #48D462;cursor: pointer;" @click="openEditPerson(2,list)"></i></h4>-->
                              <!--                              <h4>审计人员：{{list.auditUserName}}</h4>-->
                              <h4>申报年份：{{list.year}}</h4>
                              <h4>批次：
                                <span v-if="list.batch == 0">未指定</span>
                                <span v-else-if="list.batch > 0">第{{list.batch}}批</span>
                                <span v-else> - </span>
                              </h4>
                              <h4 v-if="list.projectType != 822466810090618880">级别：
                                {{list.areaLevel == 1 ? '国家级' : list.areaLevel == 2 ? '省级' : list.areaLevel == 3 ? '市级' : list.areaLevel == 4 ? '区县级' : list.areaLevel == 5 ? '镇街级' : '-' }}
                              </h4>
                              <h4 v-if="list.projectType == 822466810090618880">
                                职称系列：{{list.titleSeriesName}}
                              </h4>
                              <h4 v-if="list.projectType == 822466810090618880">
                                职称级别：{{list.titleLevelName}}
                              </h4>

                              <h4 v-if="list.projectType == 822466810090618880">
                                职称区域：<span v-if="list.provinceName">{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.townName}}</span> <span v-else> - </span>
                              </h4>

                              <h4>线上时间：{{list.onlineDateStart ? list.onlineDateStart : '-'}} 至 {{list.onlineDateEnd ? list.onlineDateEnd : '-'}}</h4>
                              <h4>纸质时间：{{list.paperDateStart ? list.paperDateStart : '-'}} 至 {{list.paperDateEnd ? list.paperDateEnd : '-'}}</h4>
                              <h4>截止天数：<span style="color: #ff2c2e">{{list.cutOffDatCount > 0 ? list.cutOffDatCount + '天' : list.cutOffDatCount < 0 ? '已截止' : '-'}}</span></h4>
                              <h4>订单类型：{{list.orderType == 0 ? '项目型' : list.orderType == 1 ? '知识产权型' : list.orderType == 2 ? '审计型' :  list.orderType == 4 ? '项目审计型' : '-'}}</h4>
                            </div>
                            <div class="leftBox">
                              <h4>数量：{{list.applyNum}}</h4>
                              <h4>进度与处理人：{{list.currentEngineerAndProcessName}}
                                <span class="noRead" v-if="list.isRead == 0" style="left:auto;right:0;margin-right:-12px;">*</span>
                                <i class="el-icon-edit" v-if="allowBatchEngineer.twoAllow && list.applyNum != 0 " title="修改处理人"
                                  style="color: #48D462;cursor: pointer;" @click="openEditPerson(list.orderType,list)"></i>
                              </h4>
                              <h4>订单评估：{{list.assessState == 0 ? '不通过' : list.assessState == 1 ? '通过' : '-'}}</h4>
                              <h4>
                                状态：{{list.orderState == 1 ? '正常' : !list.orderState ? '-' : '暂停/取消'}}
                                <i class="el-icon-edit" style="color: #48D462;cursor: pointer;" @click="openChangeState(list)"></i>
                              </h4>
                              <h4>
                                &nbsp;&nbsp;项目提成核算日期: {{list.deductDate == null?'-':list.deductDate}}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </el-checkbox>
                      <img class="freeContract" v-if="list.contractType == 1"
                           src="@/views/icons/enterprise/freeOrder.png">
                      <div class="projectRig">
                        <el-button type="primary" size="small" @click="goCheckOrder(list.orderId,list.noticeId)"
                                   v-if="allowDetail.twoAllow">查看
                        </el-button>
                      </div>
                    </div>
                    <!--                    </el-checkbox-group>-->
                  </div>
                </div>
              </div>
            </div>
            <!--            <div class="dataBoxRig">-->
            <!--              <div class="btnMt"><el-button class="violet" size="small">查看</el-button></div>-->
            <!--              <div class="btnMt"><el-button class="primary" size="small">编辑</el-button></div>-->
            <!--              <div class="btnMt"><el-button class="origin" size="small">更新状态</el-button></div>-->
            <!--            </div>-->
          </div>
        </div>
        <div class="noMore" @click="getMore" v-if="total - orderList.length > 0">
          加载更多
        </div>
        <div class="noMore" v-else>
          没有更多
        </div>
      </el-card>

      <el-dialog
        :title="personNum == 0 || personNum == 4 ? '指派工程师' : personNum == 2 ? '指派审计员' : personNum == 1 ? '指派知识产权工程师' : '-'"
        :visible.sync="personDialogVisible"
        width="45%">
        <div class="assignEngineer" v-if="applyNumTotal > 1">
          <div class="assignNumAndRig">
            <span>总数量：{{applyNumTotal}}</span>
            <el-button type="primary" size="small" @click="addNewAssign">新增指派</el-button>
          </div>
          <div class="assignBox" v-for="(item,index) in assignForm.assignUserList">
            <div>
              <span>处理人：</span>
              <el-select v-model="item.userId" placeholder="请选择" filterable clearable style="flex:1" size="small" :disabled="item.processIsOverState == 0">
                <el-option
                  v-for="item in personList"
                  :key="item.userId"
                  :label="item.userName + (item.deptName ? '_'+item.deptName : '') + (item.roleName ? '-'+item.roleName : '') + (assignForm.contractState == -1 && item.stateNum == 1 ? '(在职)' : item.stateNum == 2 ? '(离职)' : '')"
                  :value="item.userId">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>数量：</span>
              <el-input style="flex:1" size="small" v-model="item.allocationNumber" type="number" @input.native="inputXz" :disabled="item.processIsOverState == 0"></el-input>
            </div>
            <div v-if="assignForm.orderType == 4">
              <span>流程：</span>
              <el-select v-if="!item.notExistence" v-model="item.flowId" placeholder="请选择流程" size="small" clearable style="flex:1" :disabled="item.processIsOverState == 0">
                <el-option
                  v-for="item in flowList"
                  :key="item.flowId"
                  :label="item.flowName"
                  :value="item.flowId">
                </el-option>
              </el-select>
              <span v-else>{{item.flowName}}</span>
            </div>
            <i class="el-icon-delete-solid" @click="deleteAssignBox(item,index)" v-if="(item.processIsOverState != 0 && !item.processIsOverState) || item.processIsOverState == 1"></i>
          </div>
        </div>
        <div class="assignEngineer" v-if="applyNumTotal == 1 && personNum == 4">
          <div class="assignNumAndRig">
            <span>总数量：{{applyNumTotal}}</span>
            <el-button type="primary" size="small" @click="addNewAssign">新增指派</el-button>
          </div>
          <div class="assignBox" v-for="(item,index) in assignForm.assignUserList">
            <div>
              <span>处理人：</span>
              <el-select v-model="item.userId" placeholder="请选择" filterable clearable style="flex:1" size="small" :disabled="item.processIsOverState == 0">
                <el-option
                  v-for="item in personList"
                  :key="item.userId"
                  :label="item.userName + (item.deptName ? '_'+item.deptName : '') + (item.roleName ? '-'+item.roleName : '') + (assignForm.contractState == -1 && item.stateNum == 1 ? '(在职)' : item.stateNum == 2 ? '(离职)' : '')"
                  :value="item.userId">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>数量：</span>
              <el-input style="flex:1" size="small" v-model="item.allocationNumber" type="number" @input.native="inputXz" :disabled="item.processIsOverState == 0"></el-input>
            </div>
            <div v-if="personNum == 4">
              <span>流程：</span>
              <el-select v-if="!item.notExistence" v-model="item.flowId" placeholder="请选择流程" size="small" clearable style="flex:1" :disabled="item.processIsOverState == 0">
                <el-option
                  v-for="item in flowList"
                  :key="item.flowId"
                  :label="item.flowName"
                  :value="item.flowId">
                </el-option>
              </el-select>
              <span v-else>{{item.flowName}}</span>
            </div>
            <i class="el-icon-delete-solid" @click="deleteAssignBox(item,index)" v-if="(item.processIsOverState != 0 && !item.processIsOverState) || item.processIsOverState == 1"></i>
          </div>
        </div>
        <p v-if="assignForm.orderType == 4" style="margin-top:15px;color:red;">提示：处理人角色必须对应指定流程，例如处理人是项目员，流程必须是项目流程，请仔细检查！</p>

        <div v-if="applyNumTotal == 1 && personNum != 4" style="display: flex;align-items: center">
          <span style="margin-right: 10px;">指派{{personNum == 0 ? '项目工程师' : personNum == 2 ? '审计员' : personNum == 1 ? '知识产权工程师' : personNum == 4 ? '处理人' : '-'}}</span>
          <el-select v-model="personId" placeholder="请选择" filterable clearable style="flex:1">
            <el-option
              v-for="item in personList"
              :key="item.userId"
              :label="item.userName + (item.deptName ? '_'+item.deptName : '') + (item.roleName ? '-'+item.roleName : '') + (assignForm.contractState == -1 && item.stateNum == 1 ? '(在职)' : item.stateNum == 2 ? '(离职)' : '')"
              :value="item.userId">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAssignDig">取 消</el-button>
          <el-button type="primary" @click="editPerson">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="更新状态"
        :visible.sync="stateDialogVisible"
        width="40%">
        <div style="display: flex;align-items: center">
          <el-form ref="updateStateForm" :rules="updateStateRules" :model="updateStateForm" label-width="auto">
            <el-form-item label="订单状态：" prop="orderState">
              <el-radio-group v-model="updateStateForm.orderState">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="3">暂停/取消</el-radio>
<!--                <el-radio :label="3">取消</el-radio>-->
<!--                <el-radio :label="4">暂时不符合条件</el-radio>-->
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态备注：" prop="orderRemarks" v-if="updateStateForm.orderState != 1">
              <el-input type="textarea" :rows="4" v-model="updateStateForm.orderRemarks"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="stateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateState">确 定</el-button>
        </span>
      </el-dialog>



      <!-- 项目提成核算日期选择日期窗口 -->
      <el-dialog
        title="设置项目提成核算日期"
        :visible.sync="orderDeductDateDialogVisible"
        width="30%">
        <div style="display: flex;align-items: center">
          <el-form ref="orderDeductDateDialogForm" :model="orderDeductDateForm" label-width="auto">
            <el-form-item label="日期：" prop="orderState">
              <el-col :span="30">
                <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" v-model="orderDeductDateForm.deductDate" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="orderDeductDateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateOrderDeductDateForm">确 定</el-button>
        </span>
      </el-dialog>

    <!--设置导出字段-->
    <el-dialog title="请选择导出字段" :visible.sync="exportDialogVisible" width="30%">


      <!-- {{item}}- -->
      <el-checkbox-group  v-model="radioChoose" class="checkboxChoose" @change="checkChoose" >
        <block v-for="(item, key, index ) in exportChoose" v-if="item.isDefault==true"   :key="index" >
          <el-checkbox  :label="item.fieldName"    disabled> {{key}}</el-checkbox>
        </block>

        <block v-for="(item, key, index ) in exportChoose"  v-if="item.isDefault!=true" :key="index">
          <el-checkbox  :label="item.fieldName" > {{key}}</el-checkbox>
        </block>
        <!-- <el-checkbox v-for="(item, key, index ) in exportChoose" :label="item.fieldName"  :key="index"> {{key}}</el-checkbox>   -->
      </el-checkbox-group>
              <div class="Choose"></div>
          <el-checkbox-group  v-model="radioAllChoose" class="checkboxChoose" @change="allChoose">
            <el-checkbox label="全选"> 全选</el-checkbox>
          </el-checkbox-group>


      <span slot="footer" class="dialog-footer">
        <el-button @click="exportDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportChooseShow">确 定</el-button>
      </span>

    </el-dialog>


      <!--置顶-->
      <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
        <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
          <img src="../../icons/enterprise/back_top.png">
        </a>
      </div>


    </div>
  </div>
</template>

<script>
  import dateSelect from '../../../components/timeMoneySelect/dateSelect'
  import {queryAllOrder, assignOrderEngineer, assignOrderEngineerOfMultiOrderNumber,queryAllocationInfo, deleteAssignUserOfMultiOrderNum,exportOrderList, updateOrderState,updateOrderDeductDate,deleteWorkAndProcess,getExcelExportField} from '@/api/orderManage'
  import {queryCompany} from '@/api/contractManage'
  import {queryUserComboInfo} from '@/api/customerCenter'
  import {getDepartmentTree} from '@/api/department.js'
  import {getUserList} from '@/api/userManage.js'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import {commonDictOfRegion, downloadCrm} from '@/api/utils'
  import {queryFlowInfoDetails} from '@/api/processManage'
  import { queryMyAgendaOrderIdList } from '@/api/home'

  export default {
    components: {
      dateSelect
    },
    data() {
      return {
        approvedInfo: '',
        titleSeriesList: [],
        btnFlag: 0,
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
        level: 3,
        parentId: 0,
        provinceList: [],
        cityList: [],
        districtList: [],
        townList: [],
        dateList: [
          {'key': '0:7', 'val': '1周内'},
          {'key': '0:14', 'val': '2周内'},
          {'key': '0:30', 'val': '1月内'},
          {'key': '0:60', 'val': '2月内'},
          {'key': '0:180', 'val': '半年内'},
          {'key': '0:365', 'val': '1年内'}
        ],
        signOffTime: '',
        orderForm: {
          page: 0,
          pageSize: 20,
          orderField: 'co.createTime',
          orderType: 'DESC',
          deptIds:[],
          projectNames:[],
        },
        orderList: [],
        orderTotalCount: 0,
        total: 0,
        readForm: {
          alredyRead: false,
          notRead: false,
        },
        showContractState:'',
        dealtWith:'',
        sortList: [
          {label: '以企业级别倒序排序', id: 1, type: 'DESC', name: 'companyLevelName'},
          {label: '以企业级别顺序排序', id: 2, type: 'ASC', name: 'companyLevelName'},
          {label: '按项目截止时间顺序', id: 3, type: 'ASC', name: 'ppy.onlineDateEnd'},
          {label: '按项目截止时间倒序', id: 4, type: 'DESC', name: 'ppy.onlineDateEnd'},
          // {label:'录入客户时间倒序排序',id:5,type:'DESC',name:'cc.createTime'},
          // {label:'录入客户时间顺序排序',id:6,type:'ASC',name:'cc.createTime'},
          {label: '生成订单时间倒序排序', id: 5, type: 'DESC', name: 'co.createTime'},
          {label: '生成订单时间顺序排序', id: 6, type: 'ASC', name: 'co.createTime'},
        ],
        sort: 5,
        projectLevelList: [
          {'label': '国家级', 'value': 1},
          {'label': '省级', 'value': 2},
          {'label': '市级', 'value': 3},
          {'label': '区县级', 'value': 4},
          {'label': '镇街级', 'value': 5}
        ],
        batchNoList: [
          {'label': '未指定', 'value': 0},
          {'label': '第1批', 'value': 1},
          {'label': '第2批', 'value': 2},
          {'label': '第3批', 'value': 3},
          {'label': '第4批', 'value': 4},
          {'label': '第5批', 'value': 5},
          {'label': '第6批', 'value': 6},
          {'label': '第7批', 'value': 7},
          {'label': '第8批', 'value': 8},
          {'label': '第9批', 'value': 9},
          {'label': '第10批', 'value': 10}
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
        companyList: [],
        deptmentList: [],
        userList: [],
        projectPersonList: [],
        auditPersonList: [],
        projectList: [],
        selectConditionsList: {},
        signDate: [],
        createTime: [],
        planCompleteDate: [],
        realCompleteDate: [],
        deadlineDate: [],
        orderStateList: [
          {label: '正常', value: 1},
          {label: '暂停/取消', value: 3},
          // {label: '取消', value: 3},
          // {label: '暂不符合条件', value: 4},
        ],
        assessStateList:[
          {label: '未评估', value: 2},
          {label: '通过', value: 1},
          {label: '不通过', value: 0},
        ],
        personDialogVisible: false,
        stateDialogVisible: false,
        orderDeductDateDialogVisible:false,
        personNum: '',
        flowList:[],
        applyNumTotal: 0,
        personList: [],
        checkOrderIds: [],
        personId: '',
        projectForm: {
          page: 0,
          pageSize: 20,
          orderField:'sales',
          orderType: 'DESC'
        },
        updateStateRules: {
          orderState: [
            {required: true, message: '请选择订单状态', trigger: 'blur'}
          ],
          orderRemarks: [
            {required: true, message: '请填写状态备注', trigger: 'blur'}
          ],
        },
        updateStateForm: {},
        loading: false,
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],
        linkFinish: [],
        assignForm: {
          assignUserList:[],
        },
        orderDeductDateForm:{},
        yearList:[],
        setOrderDeducatDateBtnShowFlag:false,
        allowGetList: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:LIST'),//查询订单列表
        allowChangePerson: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:BATCHASSIGNORDERENGINEER'),//批量修改工程师/审计员

        allowBatchEngineer: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:BATCH:EDIT:ENGINEER'),//批量修改工程师
        allowBatchIntellectualEngineer: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:BATCH:EDIT:INTELLECTUAL:ENGINEER'),//批量修改知识产权工程师
        allowBatchAuditor: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:BATCH:EDIT:AUDITOR'),//批量修改审计员
        allowDetail: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:DETAILS'),//查看订单详情
        allowUpdate: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:UPDATE'),//修改订单
        // allowUpdateProcess: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:PROCESSUSER:UPDATE'),//修改订单处理流程用户(工程师)
        allowFlowReview: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:FLOW:REVIEW'),//处理流程节点评估
        allowFlowComplete: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:FLOW:COMPLETE'),//完成处理流程节点
        allowProcessReview: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:PROCESS:REVIEW'),//处理流程节点复审

        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:DEPT:MANAGE', 'SYSTEM:DEPT:LIST'),//部门列表
        //导出显示
        exportDialogVisible:false,
        //获取导出企业字段
        exportField: {
          companyId: []
        },
        exportChoose:{},
        radioChoose:[],
        listQuery: {
          page: 0,
          pageSize: 20,
          companyPosition: []
        },
        radioAllChoose:[],
        choosenum:0,
        showFour: true,
        unsettled: false,
        completed: false,
        notApproved: false,
        hasApproved: false,
        holdProject: [],
      }
    },
    mounted() {
      // this.getOrderList();
    },
    activated() {
      if (localStorage.getItem('searchName')) {
        if (localStorage.getItem('searchName') !== '') {
          this.orderForm = {page: 0, pageSize: 20,orderField: 'co.createTime', orderType: 'DESC'};
          this.selectConditionsList = {}
          this.$set(this.orderForm, 'companyAndProjectName', localStorage.getItem('searchName'));
        }
        // this.getOrderList();
      }

      if (localStorage.getItem('orderParams') && localStorage.getItem('orderParams') !== '') {
        let localParams = JSON.parse(localStorage.getItem('orderParams'));
        this.orderForm = {page: 0, pageSize: 20,orderField: 'co.createTime', orderType: 'DESC'};
        this.selectConditionsList = {};
        this.$delete(this.orderForm, 'querynotAllocation');
        this.orderForm.boardDataOrderIds = localParams.arr;
        this.$set(this.orderForm, 'companyAndProjectName', '')
        if (localParams.num === 0) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 马上截止')
        } else if (localParams.num === 1) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 未分配');
          this.orderForm.querynotAllocation = 1;
        } else if (localParams.num === 2) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 待评估')
        } else if (localParams.num === 3) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 待复审')
        } else if (localParams.num === 4) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 待完成')
        } else if (localParams.num === 5) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 待提交')
        } else if (localParams.num === 6) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 已立项')
        } else if (localParams.num === 7) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 待回款')
        }else if (localParams.num === 8) {
          this.$set(this.selectConditionsList, 'boardDataOrderIds', '其他 - 我的待办')
        }
        // this.getOrderList();
      }
      // else{
      //   this.$delete(this.orderForm,'boardDataOrderIds');
      //   this.$delete(this.selectConditionsList, 'querynotAllocation');
      //   this.$delete(this.selectConditionsList, 'boardDataOrderIds');
      //   this.getOrderList();
      // }

      if(this.$store.getters.orderPage != 0){
        this.orderForm.page = 0;
        this.orderForm.pageSize = this.$store.getters.orderPage + 20;
        this.getOrderList();
      }else{
        this.orderForm.page = this.$store.getters.orderPage;
        this.orderForm.pageSize = 20;
        this.getOrderList();
      }

      window.addEventListener('scroll', this.scrollToTop);

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.orderScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_ORDER_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_ORDER_PAGE', this.orderForm.page) //离开路由时把位置存起来
      next()
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
    methods: {
      // 获取职称系列
      getTitleSeries() {
        queryTitleSeriesOrLevel({}).then(res =>{
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
        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      checkChoose() {
        if (this.radioChoose.length == this.choosenum) {
          this.radioAllChoose = ['全选']
        } else {
          this.radioAllChoose = []
        }
      },
      // 全选
      allChoose() {
        let that = this
        if (that.radioAllChoose[0] == '全选') {
          that.radioChoose = []
          Object.keys(that.exportChoose).forEach(function(key) {
            that.radioChoose.push(that.exportChoose[key].fieldName)
          })
        } else {
          that.radioChoose = []
          Object.keys(that.exportChoose).forEach(function(key) {
            if (that.exportChoose[key].isDefault == true) {
              that.radioChoose.push(that.exportChoose[key].fieldName)
            }
          })
        }
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

      //获取订单列表
      getOrderList() {
        if (!this.allowGetList.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取此列表');
          return;
        }
        queryAllOrder(this.orderForm).then(res => {
          if (res.code == 200) {
            let list = res.data.data;
            let newRes = [];
            let R = [], F;
            for (F = 0; F < list.length;) R.push(list.slice(F, F += 5));
            R.forEach(item => {
              item.forEach((data, index) => {
                this.picBackgroundList.forEach((val, key) => {
                  if (index === key) {
                    data.bgColor = val
                  }
                })
              })
            })
            R.forEach(item => {
              item.forEach(item => {
                newRes.push(item)
              })
            })
            if (list.length > 0) {
              let currUserHasEditOrderDeDuctDatePermission = list[0].currUserHasEditOrderDeDuctDatePermission
              if (currUserHasEditOrderDeDuctDatePermission === 1) {
                this.setOrderDeducatDateBtnShowFlag = true
              }
            }


            if (this.orderForm.page > 0) {
              this.orderList = this.orderList.concat(newRes);
            } else {
              this.orderList = newRes;
              this.checkOrderIds = [];

              if(this.$store.getters.orderPage != 0){
                this.orderForm.page = this.$store.getters.orderPage;
                this.orderForm.pageSize = 20;
              }
            }

            if(this.orderList.length > 0){
              this.orderTotalCount = this.orderList[0].orderTotalCount
            }else{
              this.orderTotalCount = 0
            }

            this.orderList.forEach(item => {
              item.innerOrderList.forEach(list => {
                this.$set(list, 'crmCompanyId', item.crmCompanyId)
                this.$set(list, 'check', false);

                //判断是否全部流程都结束处理
                let arr = list.currentEngineerAndProcessName.split('|')
                let arr3 = [];
                arr.forEach(key=>{
                  let arr2 = key.split('_');
                  arr3.push(arr2[0])
                })

                let newarr = arr3.every((item,index,arr)=>{
                  return item == '结束';
                })
                if(newarr == true){
                  this.$set(list, 'endProcess', true);
                }
              })
            })

            let obj = {}
            this.orderList = this.orderList.reduce((cur, next) => {
              obj[next.crmCompanyId] ? '' : obj[next.crmCompanyId] = true && cur.push(next)
              return cur
            }, [])
            this.total = res.data.total
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //搜索
      goSearch() {
        this.orderForm.page = 0;
        this.getOrderList();
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

      //获取签约公司
      getCompanyList() {
        queryCompany().then(res => {
          if (res.code == 200) {
            this.companyList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // 获取左侧公司部门列表
      getDepartmentList() {
        getDepartmentTree({}).then(res => {
          if (res.code == 200) {
            this.deptmentList = res.data.deptInfoTreeVos;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // // 获取用户列表
      // getUserList(deptId) {
      //   const params = {
      //     companyId: this.companyId,
      //     deptId: deptId,
      //     page: 1,
      //     pageSize: 100000,
      //   }
      //   getUserList(params).then(res => {
      //     if (res.code == 200) {
      //       this.userList = res.data.data;
      //     } else {
      //       this.$message({type: 'error', message: res.message})
      //     }
      //   })
      // },

      //根据角色获取人员列表
      getPersonList(name, deptIds,isResign,isExcludePermission) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (isResign != undefined) {
          formData.append('isResign', isResign)
        }
        if (deptIds != undefined) {
          formData.append('deptIdList', deptIds)
        }
        if(isExcludePermission != undefined){
          formData.append('isExcludePermission', isExcludePermission)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            this.personList = res.data;
            if (name == '项目主管,项目员,专利主管,专利员') {
              this.projectPersonList = res.data;
            }
            if (name == '审计员') {
              this.auditPersonList = res.data;
            }
            if (name == '业务员,业务主管') {
              this.userList = res.data;
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //获取项目列表
      getProjectList(query) {
        if (query) {
          this.projectForm.projectName = query;
        } else {
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

      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      //打开筛选框
      openCond() {
        this.moreCondition = !this.moreCondition;
        this.userList = [];
        this.getTitleSeries()
        this.getRegionList();
        this.getCompanyList()
        this.getDepartmentList()
        this.getProjectList()
        this.getAllYearList();
        this.getPersonList('项目主管,项目员,专利主管,专利员','',false, true)
        this.getPersonList('审计员','',false, true)
        this.getPersonList('业务员,业务主管','',false, true)
      },

      // 签约公司
      signCompanyChange(val) {
        const arr = [];
        if (val.length != 0) {
          this.companyList.forEach(item => {
            val.forEach(val => {
              if (item.companyId == val) {
                arr.push(item.companyName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'signCompanyIds', '签约公司 - ' + string);
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'signCompanyIds')
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 业务部门
      deptmentChange(val) {
        const arr = []
        if (val.length != 0) {
          this.deptmentList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'deptIds', `业务部门 - ${string}`)
              }
            })
          })

        } else {
          this.userList = [];
          this.$delete(this.selectConditionsList, 'deptIds')
          this.$delete(this.selectConditionsList, 'signUserIdList')
        }

        this.getPersonList('业务员,业务主管', val,false, true)

        // this.orderForm.deptIds = this.orderForm.deptIds.concat(val)
        //
        // //去重
        // let obj = {}
        // this.orderForm.deptIds = this.orderForm.deptIds.reduce((cur, next) => {
        //   obj[next] ? '' : obj[next] = true && cur.push(next)
        //   return cur
        // }, [])

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 工程部门
      deptmentChange2(val) {
        const arr = []
        if (val.length != 0) {
          this.deptmentList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'projectDeptIds', `工程部门 - ${string}`)
              }
            })
          })

        } else {
          this.userList = [];
          this.$delete(this.selectConditionsList, 'projectDeptIds')
          this.$delete(this.selectConditionsList, 'signUserIdList')
        }

        this.getPersonList('项目主管,项目员,专利主管,专利员', val,false, true)

        // this.orderForm.deptIds = this.orderForm.deptIds.concat(val)
        //
        // //去重
        // let obj = {}
        // this.orderForm.deptIds = this.orderForm.deptIds.reduce((cur, next) => {
        //   obj[next] ? '' : obj[next] = true && cur.push(next)
        //   return cur
        // }, [])

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 审计部门
      deptmentChange3(val) {
        const arr = []
        if (val.length != 0) {
          this.deptmentList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'auditorDeptIds', `审计部门 - ${string}`)
              }
            })
          })

        } else {
          this.userList = [];
          this.$delete(this.selectConditionsList, 'auditorDeptIds')
          this.$delete(this.selectConditionsList, 'signUserIdList')
        }

        this.getPersonList('审计员', val,false, true)

        // this.orderForm.deptIds = this.orderForm.deptIds.concat(val)

        //去重
        // let obj = {}
        // this.orderForm.deptIds = this.orderForm.deptIds.reduce((cur, next) => {
        //   obj[next] ? '' : obj[next] = true && cur.push(next)
        //   return cur
        // }, [])

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 签订人
      userChange(val) {
        const arr = []
        if (val.length != 0) {
          this.userList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'signUserIdList', `签订人 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'signUserIdList')
        }
        // if (val) {
        //   this.$set(this.selectConditionsList, 'signUserId', '签订人 - ' + this.userList.find(ele => ele.userId === val).userName)
        // } else {
        //   this.$delete(this.selectConditionsList, 'signUserId')
        // }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 项目工程师
      engineerUser(val) {
        const arr = []
        if (val.length != 0) {
          this.projectPersonList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'projectEngineerIds', `项目工程师 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'projectEngineerIds')
        }
        // if (val) {
        //   this.$set(this.selectConditionsList, 'projectEngineerId', '项目工程师 - ' + this.projectPersonList.find(ele => ele.userId === val).userName)
        // } else {
        //   this.$delete(this.selectConditionsList, 'projectEngineerId')
        // }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 审计人员
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

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 选择项目
      projectChange(val) {
        const arr = []
        this.orderForm.projectNames = []
        if (val.length != 0) {
          this.projectList.forEach(item => {
            val.forEach(val => {
              if (item.projectId == val) {
                this.holdProject.push(item)
                // this.orderForm.projectNames.push(item.projectName)
              }
            })
          })
          this.showFour = false;

          let arr2 = [];
          this.holdProject.forEach((item,index)=>{
            val.forEach(str=>{
              if(item.projectId == str){
                arr2.push(item)
              }
            })
          })

          //去重
          let obj = {}
          arr2 = arr2.reduce((cur, next) => {
            obj[next.projectId] ? '' : obj[next.projectId] = true && cur.push(next)
            return cur
          }, [])

          arr2.forEach(item=>{
            arr.push(item.projectName)
            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectIds', `项目 - ${string}`);
            this.orderForm.projectNames.push(item.projectName)
          })
        }
        else {
          this.$delete(this.selectConditionsList, 'projectIds')
          this.$delete(this.orderForm, 'projectNames')
          this.holdProject = [];
          if(this.orderForm.projectIds == '' && this.orderForm.areaLevels == '' && this.orderForm.projectYears == '' && this.orderForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.orderForm, 'searchNotFinished')
            this.$delete(this.orderForm, 'searchFinished')
            this.$delete(this.orderForm, 'searchNowReport')
            this.$delete(this.orderForm, 'searchAlreadyReport')
          }
        }
        // if (val) {
        //   this.$set(this.selectConditionsList, 'projectId', '项目 - ' + this.projectList.find(ele => ele.projectId === val).projectName)
        // } else {
        //   this.$delete(this.selectConditionsList, 'projectId')
        // }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 已报项目
      // projectChange2(val) {
      //   const arr = []
      //   if (val.length != 0) {
      //     this.projectList.forEach(item => {
      //       val.forEach(val => {
      //         if (item.projectName == val) {
      //           arr.push(item.projectName)
      //           const string = arr.join('，')
      //           this.$set(this.selectConditionsList, 'alreadyReportProjectNames', `已报项目 - ${string}`)
      //         }
      //       })
      //     })
      //   } else {
      //     this.$delete(this.selectConditionsList, 'alreadyReportProjectNames')
      //   }
      //
      //   // if (val) {
      //   //   this.$set(this.selectConditionsList, 'projectId', '项目 - ' + this.projectList.find(ele => ele.projectId === val).projectName)
      //   // } else {
      //   //   this.$delete(this.selectConditionsList, 'projectId')
      //   // }
      //
      //   this.orderForm.page = 0
      //   this.orderForm.pageSize = 20
      //   this.getOrderList()
      // },

      // 项目级别
      areaLevelChange(val) {
        const arr = []
        if (val.length != 0) {
          this.projectLevelList.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'areaLevels', `项目级别 - ${string}`)
              }
            })
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'areaLevels')
          if(this.orderForm.projectIds == '' && this.orderForm.areaLevels == '' && this.orderForm.projectYears == '' && this.orderForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.orderForm, 'searchNotFinished')
            this.$delete(this.orderForm, 'searchFinished')
            this.$delete(this.orderForm, 'searchNowReport')
            this.$delete(this.orderForm, 'searchAlreadyReport')
          }
        }
        // if (val) {
        //   this.$set(this.selectConditionsList, 'areaLevel', '项目级别 - ' + this.projectLevelList.find(ele => ele.value === val).label)
        // } else {
        //   this.$delete(this.selectConditionsList, 'areaLevel')
        // }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // areaLevelChange2(val) {
      //   const arr = []
      //   if (val.length != 0) {
      //     this.projectLevelList.forEach(item => {
      //       val.forEach(val => {
      //         if (item.value == val) {
      //           arr.push(item.label)
      //           const string = arr.join('，')
      //           this.$set(this.selectConditionsList, 'alreadyReportProjectLevelList', `已报项目级别 - ${string}`)
      //         }
      //       })
      //     })
      //   } else {
      //     this.$delete(this.selectConditionsList, 'alreadyReportProjectLevelList')
      //   }
      //   // if (val) {
      //   //   this.$set(this.selectConditionsList, 'areaLevel', '项目级别 - ' + this.projectLevelList.find(ele => ele.value === val).label)
      //   // } else {
      //   //   this.$delete(this.selectConditionsList, 'areaLevel')
      //   // }
      //
      //   this.orderForm.page = 0
      //   this.orderForm.pageSize = 20
      //   this.getOrderList()
      // },

      // 项目年度
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
          if(this.orderForm.projectIds == '' && this.orderForm.areaLevels == '' && this.orderForm.projectYears == '' && this.orderForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.orderForm, 'searchNotFinished')
            this.$delete(this.orderForm, 'searchFinished')
            this.$delete(this.orderForm, 'searchNowReport')
            this.$delete(this.orderForm, 'searchAlreadyReport')
          }
        }

        // if (val) {
        //   this.$set(this.selectConditionsList, 'projectYears', '项目年度 - ' + val)
        // } else {
        //   this.$delete(this.selectConditionsList, 'projectYears')
        // }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // projectYearChange2(val) {
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
      //       this.$set(this.selectConditionsList, 'alreadyReportProjectYearList', `已报项目年度 - ${string}`)
      //     })
      //
      //   } else {
      //     this.$delete(this.selectConditionsList, 'alreadyReportProjectYearList')
      //   }
      //
      //   // if (val) {
      //   //   this.$set(this.selectConditionsList, 'alreadyReportProjectYearList', '立项项目年度 - ' + val)
      //   // } else {
      //   //   this.$delete(this.selectConditionsList, 'alreadyReportProjectYearList')
      //   // }
      //
      //   this.orderForm.page = 0
      //   this.orderForm.pageSize = 20
      //   this.getOrderList()
      // },

      // 项目批次
      bathChange(val) {
        const arr = []
        if (val.length != 0) {
          this.batchNoList.forEach(item => {
            val.forEach(val => {
              if (item.value == val) {
                arr.push(item.label)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'batchs', `项目批次 - ${string}`)
              }
            })
          })
          this.showFour = false;
        } else {
          this.$delete(this.selectConditionsList, 'batchs')
          if(this.orderForm.projectIds == '' && this.orderForm.areaLevels == '' && this.orderForm.projectYears == '' && this.orderForm.batchs == '' ){
            this.showFour = true;
            this.unsettled = false;
            this.completed = false;
            this.notApproved = false;
            this.hasApproved = false;
            this.$delete(this.orderForm, 'searchNotFinished')
            this.$delete(this.orderForm, 'searchFinished')
            this.$delete(this.orderForm, 'searchNowReport')
            this.$delete(this.orderForm, 'searchAlreadyReport')
          }
        }
        // if (val) {
        //   this.$set(this.selectConditionsList, 'batch', '批次 - ' + this.batchNoList.find(ele => ele.value === val).label)
        // } else {
        //   this.$delete(this.selectConditionsList, 'batch')
        // }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 立项情况
      changeProjectBegin(){
        if (this.approvedInfo.includes('unsettled')){
          this.orderForm.searchNotFinished = 1
        } else {
          this.$delete(this.orderForm, 'searchNotFinished')
        }
        if (this.approvedInfo.includes('completed')) {
          this.orderForm.searchFinished = 1
        } else {
          this.$delete(this.orderForm, 'searchFinished')
        }
        if (this.approvedInfo.includes('notApproved')) {
          this.orderForm.searchNowReport = 1
        } else {
          this.$delete(this.orderForm, 'searchNowReport')
        }
        if (this.approvedInfo.includes('hasApproved')) {
          this.orderForm.searchAlreadyReport = 1
        } else {
          this.$delete(this.orderForm, 'searchAlreadyReport')
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // bathChange2(val) {
      //   const arr = []
      //   if (val.length != 0) {
      //     this.batchNoList.forEach(item => {
      //       val.forEach(val => {
      //         if (item.value == val) {
      //           arr.push(item.label)
      //           const string = arr.join('，')
      //           this.$set(this.selectConditionsList, 'alreadyReportProjectBatchNoList', `已报项目批次 - ${string}`)
      //         }
      //       })
      //     })
      //   } else {
      //     this.$delete(this.selectConditionsList, 'alreadyReportProjectBatchNoList')
      //   }
      //   // if (val) {
      //   //   this.$set(this.selectConditionsList, 'batch', '批次 - ' + this.batchNoList.find(ele => ele.value === val).label)
      //   // } else {
      //   //   this.$delete(this.selectConditionsList, 'batch')
      //   // }
      //
      //   this.orderForm.page = 0
      //   this.orderForm.pageSize = 20
      //   this.getOrderList()
      // },

      // 省份
      changeProvince(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'provinceId', '省份 - ' + this.provinceList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'provinceId')
        }

        this.$delete(this.selectConditionsList, 'cityId')
        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.parentId = val
        this.level = 2
        this.getRegionList()
        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },
      // 城市
      changeCity(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'cityId', '城市 - ' + this.cityList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'cityId')
        }

        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.parentId = val
        this.level = 1
        this.getRegionList()
        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },
      // 区县
      changeDistrict(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'districtId', '区县 - ' + this.districtList.find(ele => ele.dictId === val).dictName)
          this.$delete(this.selectConditionsList, 'townId')
        } else {
          this.$delete(this.selectConditionsList, 'districtId')
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.parentId = val
        this.level = 0
        this.getRegionList()
        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },
      // 镇街
      changeTown(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'townId', '镇街 - ' + this.townList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 签单时间
      signDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signDate', '签单时间 - ' + val[0] + '-' + val[1])
          this.orderForm.signDateStart = val[0] + ' ' + '00:00:00';
          this.orderForm.signDateEnd = val[1] + ' ' + '23:59:59';
        } else {
          this.$delete(this.selectConditionsList, 'signDate')
          this.orderForm.signDateStart = '';
          this.orderForm.signDateEnd = '';
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 录入时间
      createTimeChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'createTime', '录入时间 - ' + val[0] + '-' + val[1])
          this.orderForm.createTimeStart = val[0] + ' ' + '00:00:00';
          this.orderForm.createTimeEnd = val[1] + ' ' + '23:59:59';
        } else {
          this.$delete(this.selectConditionsList, 'createTime')
          this.orderForm.createTimeStart = '';
          this.orderForm.createTimeEnd = '';
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 计划完成时间
      planCompleteDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'planCompleteDate', '计划完成时间 - ' + val[0] + '-' + val[1])
          this.orderForm.planCompleteDateStart = val[0] + ' ' + '00:00:00';
          this.orderForm.planCompleteDateEnd = val[1] + ' ' + '23:59:59';
        } else {
          this.$delete(this.selectConditionsList, 'planCompleteDate')
          this.orderForm.planCompleteDateStart = '';
          this.orderForm.planCompleteDateEnd = '';
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 实际完成时间
      realCompleteDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'realCompleteDate', '实际完成时间 - ' + val[0] + '-' + val[1])
          this.orderForm.realCompleteDateStart = val[0] + ' ' + '00:00:00';
          this.orderForm.realCompleteDateEnd = val[1] + ' ' + '23:59:59';
        } else {
          this.$delete(this.selectConditionsList, 'realCompleteDate')
          this.orderForm.realCompleteDateStart = '';
          this.orderForm.realCompleteDateEnd = '';
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 环节完成时间
      linkFinishDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'linkFinish', '环节完成时间 - ' + val[0] + '-' + val[1])
          this.orderForm.processCompleteDateStart = val[0] + ' ' + '00:00:00';
          this.orderForm.processCompleteDateEnd = val[1] + ' ' + '23:59:59';

        } else {
          this.$delete(this.selectConditionsList, 'linkFinish')
          this.orderForm.processCompleteDateStart = '';
          this.orderForm.processCompleteDateEnd = '';
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 截止时间
      deadlineDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'deadlineDate', '截止时间 - ' + val[0] + '-' + val[1])
          this.orderForm.deadlineDateStart = val[0]+ ' ' + '00:00:00';
          this.orderForm.deadlineDateEnd = val[1] + ' ' + '23:59:59';
        } else {
          this.$delete(this.selectConditionsList, 'deadlineDate')
          this.orderForm.deadlineDateStart = '';
          this.orderForm.deadlineDateEnd = '';
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 申报状态
      orderStateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'orderState', '申报状态 - ' + this.orderStateList.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'orderState')
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 评估状态
      orderAssessStateChange(val){
        if (val || JSON.stringify(val) == '0') {
          this.$set(this.selectConditionsList, 'orderAssessState', '评估状态 - ' + this.assessStateList.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'orderAssessState')
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      //已读未读  0-已读 1-未读
      readChange(num) {
        if (num == 0) {
          this.readForm.notRead = false;
          this.$set(this.orderForm, 'alredyRead', 1);
          this.$delete(this.orderForm, 'notRead');
        } else {
          this.readForm.alredyRead = false;
          this.$set(this.orderForm, 'notRead', 1);
          this.$delete(this.orderForm, 'alredyRead');
        }

        if (this.readForm.notRead == false && this.readForm.alredyRead == false) {
          this.$delete(this.orderForm, 'alredyRead');
          this.$delete(this.orderForm, 'notRead');
        }


        if (this.readForm.alredyRead == true && this.readForm.notRead == true) {
          this.$set(this.orderForm, 'alredyRead', '')
          this.$set(this.orderForm, 'notRead', '')
          // this.alredyRead = false
          // this.notRead = false
          this.$set(this.readForm, 'alredyRead', false)
          this.$set(this.readForm, 'notRead', false)
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 历史订单
      showHistoryChange(val){
        if (val == true) {
          this.orderForm.contractState = -1
        } else {
          this.orderForm.contractState = ''
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      // 我的待办
      myDealtWithChange(val){
        if (val == true) {
          queryMyAgendaOrderIdList({}).then(res => {
            if (res.code === 200) {
              let data = res.data
              if(data.length == 0){
                data = ['0'];
              }

              this.orderForm.boardDataOrderIds = data;

              this.orderForm.page = 0
              this.orderForm.pageSize = 20
              this.getOrderList()
            }
          });
        } else {
          this.orderForm.boardDataOrderIds = [];
          if(this.selectConditionsList.boardDataOrderIds == '其他 - 我的待办'){
            this.$delete(this.selectConditionsList, 'boardDataOrderIds')
            localStorage.removeItem('orderParams')
            localStorage.removeItem('contractParams')
          }

          this.orderForm.page = 0
          this.orderForm.pageSize = 20
          this.getOrderList()
        }
      },

      //删除筛选调节
      deleteOneClick(item){
        this.orderList = []

        this.$delete(this.selectConditionsList, item)
        this.$delete(this.orderForm, item)
        if(item == 'deptIds'){
          this.getPersonList('业务员,业务主管','',false, true)
        }
        if(item == 'projectDeptIds'){
          this.getPersonList('项目主管,项目员,专利主管,专利员','',false, true)
        }
        if(item == 'auditorDeptIds'){
          this.getPersonList('审计员','',false, true)
        }
        if(item == 'signDate'){
          this.signDate = []
          this.orderForm.signDateStart = '';
          this.orderForm.signDateEnd = '';
        }
        if(item == 'createTime'){
          this.createTime = []
          this.orderForm.createTimeStart = '';
          this.orderForm.createTimeEnd = '';
        }
        if(item == 'planCompleteDate'){
          this.planCompleteDate = []
          this.orderForm.planCompleteDateStart = '';
          this.orderForm.planCompleteDateEnd = '';
        }
        if(item == 'realCompleteDate'){
          this.realCompleteDate = []
          this.orderForm.realCompleteDateStart = '';
          this.orderForm.realCompleteDateEnd = '';
        }
        if(item == 'deadlineDate'){
          this.deadlineDate = []
          this.orderForm.deadlineDateStart = '';
          this.orderForm.deadlineDateEnd = '';
        }
        if(item == 'linkFinish'){
          this.linkFinish = []
          this.orderForm.processCompleteDateStart = '';
          this.orderForm.processCompleteDateEnd = '';
        }

        if(item == 'boardDataOrderIds'){
          this.orderForm.querynotAllocation = '';
          localStorage.removeItem('orderParams')
        }

        if(item == 'projectIds'){
          this.$delete(this.orderForm, 'projectNames')
          this.holdProject = [];
        }

        if((!this.orderForm.projectIds || this.orderForm.projectIds == '') && (!this.orderForm.areaLevels || this.orderForm.areaLevels == '') && (!this.orderForm.projectYears || this.orderForm.projectYears == '') && (!this.orderForm.batchs || this.orderForm.batchs == '')){
          this.showFour = true;
          this.unsettled = false;
          this.completed = false;
          this.notApproved = false;
          this.hasApproved = false;
          this.$delete(this.orderForm, 'searchNotFinished')
          this.$delete(this.orderForm, 'searchFinished')
          this.$delete(this.orderForm, 'searchNowReport')
          this.$delete(this.orderForm, 'searchAlreadyReport')
        }

        this.orderForm.page = 0
        this.orderForm.pageSize = 20
        this.getOrderList()
      },

      //清除所有条件
      deleteAllClick(){
        this.signDate = []
        this.createTime = []
        this.orderForm.createTimeStart = '';
        this.orderForm.createTimeEnd = '';
        this.planCompleteDate = []
        this.realCompleteDate = []
        this.deadlineDate = []
        this.orderList = []
        this.getPersonList('业务员,业务主管','',false, true)
        this.selectConditionsList = {}
        this.orderForm.createTimeStart = '';
        this.orderForm.createTimeEnd = '';
        this.orderForm.planCompleteDateStart = '';
        this.orderForm.planCompleteDateEnd = '';
        this.orderForm.realCompleteDateStart = '';
        this.orderForm.realCompleteDateEnd = '';
        this.orderForm.deadlineDateStart = '';
        this.orderForm.deadlineDateEnd = '';
        this.linkFinish = []
        this.orderForm.processCompleteDateStart = '';
        this.orderForm.processCompleteDateEnd = '';
        this.showFour = true;
        this.unsettled = false;
        this.completed = false;
        this.notApproved = false;
        this.hasApproved = false;
        this.holdProject = [];
        this.orderForm = {page: 0, pageSize: 20,orderField: 'co.createTime', orderType: 'DESC'};
        this.sortList.forEach((item, index) => {
          if (this.sort == item.id) {
            this.orderForm.orderField = item.name
            this.orderForm.orderType = item.type;
          }
        })
        this.getOrderList()
      },

      //查看订单
      goCheckOrder(id,noticeId) {
        this.$router.push({
          path: '/declareCoordination/orderManage/orderDetail',
          query: {
            orderId: id,
            isCheck: true,
            noticeId: noticeId
          }
        })
      },

      //打开修改人员弹窗 0-工程师  2-审计员 1-知识产权工程师
      openEditPerson(num, item) {
        let isResign = false;

        if (item) {
          this.personNum = 0;
          this.applyNumTotal = 0;
          this.assignForm = {};
          this.checkOrderIds = [];
          setTimeout(()=>{
            this.$set(this.checkOrderIds,[0],item)
          },300)

           //判断某字符串元素是否存在于数组中
          function in_array(stringToSearch, arrayToSearch) {
            for (var s = 0; s < arrayToSearch.length; s++) {
              let thisEntry = arrayToSearch[s].toString();
              if (thisEntry == stringToSearch) {
                return true;
              }
            }
            return false;
          }

          if(item.contractState == -1){
            isResign = true
          }
          if(item.currentEngineerAndProcessName != ''){
            isResign = true
          }

          this.assignForm.contractState = item.contractState;
          this.assignForm.orderId = item.orderId;
          this.assignForm.flowId = item.flowId;
          this.assignForm.orderType = item.orderType;

          queryAllocationInfo({orderId: item.orderId}).then(res=>{
            if(res.code == 200){
              this.applyNumTotal = res.data.orderAllocationTotalNumber

              if(res.data.orderAllocationTotalNumber > 1){
                // this.assignForm.assignUserList = res.data.allAllocationUserList
                if(res.data.allAllocationUserList.length > 0){
                  this.$set(this.assignForm, 'assignUserList', res.data.allAllocationUserList)
                  if(item.orderType == 4){
                    let flowIds = [];
                    flowIds = item.flowId.split(',')

                    this.getPersonList('项目主管,项目员,审计员','',isResign)
                    this.flowList = [];
                    flowIds.forEach(data=>{
                      this.getFlowList(data);
                    })

                    this.assignForm.assignUserList.forEach(key=>{
                      if(in_array(key.flowId,flowIds)){
                        this.$set(key, 'notExistence', false)
                      }else{
                        this.$set(key, 'notExistence', true)
                        this.getFlowList(key.flowId,key)
                      }
                    })
                  }
                }else{
                  this.$set(this.assignForm, 'assignUserList', res.data.allAllocationUserList)
                  let flowIds = [];
                  flowIds = item.flowId.split(',')
                  if(item.orderType == 4){
                    this.getPersonList('项目主管,项目员,审计员','',isResign)
                    this.flowList = [];
                    flowIds.forEach(data=>{
                      this.getFlowList(data);
                    })
                    let assignBox = {
                      orderId:item.orderId,
                      flowId: '',
                      allocationNumber: res.data.orderAllocationTotalNumber,
                    }
                    this.assignForm.assignUserList.push(assignBox)
                  }else{
                    let assignBox = {
                      orderId:item.orderId,
                      allocationNumber: res.data.orderAllocationTotalNumber,
                    }
                    this.$set(this.assignForm, 'assignUserList', res.data.allAllocationUserList)
                    this.assignForm.assignUserList.push(assignBox)
                  }
                }
              }

              if(res.data.orderAllocationTotalNumber == 1 && item.orderType == 4){
                if(res.data.allAllocationUserList.length > 0){
                  this.$set(this.assignForm, 'assignUserList', res.data.allAllocationUserList)

                  if(item.orderType == 4){
                    let flowIds = [];
                    flowIds = item.flowId.split(',')

                    this.getPersonList('项目主管,项目员,审计员','',isResign)
                    this.flowList = [];
                    flowIds.forEach(data=>{
                      this.getFlowList(data);
                    })

                    this.assignForm.assignUserList.forEach(key=>{
                      if(in_array(key.flowId,flowIds)){
                        this.$set(key, 'notExistence', false)
                      }else{
                        this.$set(key, 'notExistence', true)
                        this.getFlowList(key.flowId,key)
                      }
                    })
                  }
                }else{
                  this.$set(this.assignForm, 'assignUserList', res.data.allAllocationUserList)
                  let flowIds = [];
                  flowIds = item.flowId.split(',')
                  if(item.orderType == 4){
                    this.getPersonList('项目主管,项目员,审计员','',isResign)
                    this.flowList = [];
                    flowIds.forEach(data=>{
                      this.getFlowList(data);
                    })
                    let assignBox = {
                      orderId:item.orderId,
                      flowId: ''
                    }
                    this.assignForm.assignUserList.push(assignBox)
                  }else{
                    let assignBox = {
                      orderId:item.orderId,
                    }
                    this.$set(this.assignForm, 'assignUserList', res.data.allAllocationUserList)
                    this.assignForm.assignUserList.push(assignBox)
                  }

                }
              }

              setTimeout(()=>{
                if(this.flowList.length == 1){
                  this.assignForm.assignUserList.forEach(key=>{
                    this.$set(key,'flowId',this.flowList[0].flowId)
                  })
                }

                // this.checkOrderIds.push(item)
              },200)
            }
          })
        }else{
          this.applyNumTotal = 1;
          if (this.checkOrderIds.length == 0) {
            this.$message.error('至少勾选一个订单')
            return;
          }

          this.checkOrderIds.forEach(list=>{
            this.checkOrderIds.forEach(key=>{
              if(list.orderType != key.orderType){
                this.$message.warning('请选择相同类型的订单进行修改');
                throw new Error();
              }

              if(list.orderType == 0 && key.orderType == 0){
                num = 0;
              }
              if(list.orderType == 1 && key.orderType == 1){
                num = 1;
              }
              if(list.orderType == 2 && key.orderType == 2){
                num = 2;
              }
              if(list.orderType == 4 && key.orderType == 4){
                num = 4;
              }
            })

            if(list.applyNum > 1){
              this.$message.warning('您选择的订单中包含多个工单的订单,无法批量修改,请检查');
              throw new Error();
            }
            if(list.processName == '结束'){
              this.$message.warning('您选择的订单中包含已结束订单,请检查');
              throw new Error();
            }

            if(this.applyNumTotal == 1 && num == 4){
              this.$message.warning('项目审计型订单无法批量修改，请检查');
              throw new Error();
              // this.assignForm = {
              //   assignUserList: []
              // };
              // let flowIds = [];
              // flowIds = list.flowId.split(',')
              // this.getPersonList('项目主管,项目员,审计员','',isResign)
              // this.flowList = [];
              // flowIds.forEach(data=>{
              //   this.getFlowList(data);
              // })
              // let assignBox = {
              //   orderId:list.orderId,
              // }
              //
              // if(flowIds.length == 1){
              //   assignBox.flowId = list.flowId
              // }
              // this.assignForm.assignUserList.push(assignBox)
            }
          })
        }

        this.personNum = num;

        this.personDialogVisible = true;

        if (num == 0) {
          this.getPersonList('项目主管,项目员','',isResign)
        } else if (num == 1) {
          this.getPersonList('专利员,专利主管','',isResign)
        } else if (num == 2) {
          this.getPersonList('审计员','',isResign)
        }else if(num == 4){
          this.getPersonList('项目主管,项目员,审计员','',isResign)
        }

        this.cancelBubble();
      },

      // 阻止时间冒泡
      cancelBubble(e) {
        var evt = e ? e : window.event
        if (evt.stopPropagation) { //W3C
          evt.stopPropagation()
        } else { //IE
          evt.cancelBubble = true
        }
      },

      //新增指派
      addNewAssign(){
        if(this.assignForm.orderType == 4){
          let assignBox = {
            orderId:this.assignForm.orderId,
          }
          this.assignForm.assignUserList.push(assignBox)
        }else{
          let assignBox = {
            orderId:this.assignForm.orderId,
            flowId:this.assignForm.flowId,
            userId: '',
          }

          this.assignForm.assignUserList.push(assignBox)
        }
      },

      cancelAssignDig(){
        this.personNum = 0;
        this.applyNumTotal = 0;
        this.assignForm = {};
        this.checkOrderIds = [];
        this.personId = '';
        var _this = this
        this.orderList.forEach(function (item, index) {
          item.innerOrderList.forEach(list => {
            _this.$set(list, 'check', false)
          })
        })
        this.personDialogVisible = false;
      },

      // 全选、 反全选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.checkOrderIds = []
          var _this = this
          this.orderList.forEach(function (item, index) {
            item.innerOrderList.forEach(list => {
              _this.$set(list, 'check', false)
            })
          })
          this.isCheckAll = false
        } else {
          var _this = this
          this.orderList.forEach(function (item, index) {
            item.innerOrderList.forEach(list => {
              // _this.checkOrderIds.forEach()
              if (_this.checkOrderIds.indexOf(list) === -1) {
                _this.checkOrderIds.push(list)
                _this.$set(list, 'check', true)
              }
            })
            _this.isCheckAll = true
          })
        }
      },

      //选择订单
      checkOrderChange(e, data) {
        if (e != true) {
          this.checkOrderIds.forEach((item, index) => {
            if (data.orderId == item.orderId) {
              this.checkOrderIds.splice(index, 1)
            }
          })
        } else {
          this.checkOrderIds.push(data)

          let obj = {};
          this.checkOrderIds = this.checkOrderIds.reduce((cur, next) => {
            obj[next.orderId] ? '' : obj[next.orderId] = true && cur.push(next);
            return cur
          }, []);
        }
      },

      //确定工程师或审计员修改
      editPerson() {
        if(this.applyNumTotal > 1){
          this.assignForm.assignUserList.forEach(item=>{
            if(item.userId == undefined || item.userId == ''){
              this.$message.warning('请填写处理人信息');
              throw new Error()
            }
            if(item.allocationNumber == 0 || item.allocationNumber == ''){
              this.$message.warning('数量不能为0或者空');
              throw new Error()
            }

            if(this.personNum == 4){
              if(!item.flowId || item.flowId == ''){
                this.$message.warning('请选择流程');
                throw new Error()
              }
            }

            if(this.assignForm.contractState != -1){
              this.personList.forEach(key => {
                if (key.userId == item.userId) {
                  if (key.stateNum == 2) {
                    this.$message.warning(key.userName + '已离职，请重新选择！')
                    throw new Error()
                  }
                }
              })
            }

            let numberTotal = 0;
            if(!item.flowId){
              item.flowId = this.checkOrderIds[0].flowId;
            }
            this.assignForm.assignUserList.forEach(list=>{
              if(item.flowId == list.flowId){
                numberTotal += Number(list.allocationNumber);
              }
            })

            if(numberTotal > this.applyNumTotal){
              this.$message.warning('相同流程下，数量超出总数量，请检查数量');
              throw new Error()
            }
            if(numberTotal < this.applyNumTotal){
              this.$message.warning('相同流程下，工单未分配完，请检查数量');
              throw new Error()
            }
          })

          this.checkOrderIds.forEach(item=>{
            if(this.personNum == 4){
              delete item['flowId']
            }
            this.$set(item, 'allocationDtoList',this.assignForm.assignUserList)
            this.$set(item, 'assignType',this.personNum)
          })

          assignOrderEngineerOfMultiOrderNumber(this.checkOrderIds[0]).then(res=>{
            if(res.code == 200){
              this.personDialogVisible = false;
              this.personId = '';
              this.personNum = 0;
              this.applyNumTotal = 0;
              this.assignForm = {};
              this.checkOrderIds = [];
              this.orderForm.page = 0;
              this.getOrderList();
              this.$message.success('修改成功!')
            }
          })
        }

        if(this.applyNumTotal == 1 && this.personNum == 4){
          this.assignForm.assignUserList.forEach(item=>{
            if(item.userId == undefined || item.userId == ''){
              this.$message.warning('请填写处理人信息');
              throw new Error()
            }
            if(item.allocationNumber == 0 || item.allocationNumber == ''){
              this.$message.warning('数量不能为0或者空');
              throw new Error()
            }

            if(!item.flowId || item.flowId == ''){
              this.$message.warning('请选择流程');
              throw new Error()
            }

            if(this.assignForm.contractState != -1){
              this.personList.forEach(key => {
                if (key.userId == item.userId) {
                  if (key.stateNum == 2) {
                    this.$message.warning(key.userName + '已离职，请重新选择！')
                    throw new Error()
                  }
                }
              })
            }

            let numberTotal = 0;
            this.assignForm.assignUserList.forEach(list=>{
              if(item.flowId == list.flowId){
                numberTotal += Number(list.allocationNumber);
              }
            })

            if(numberTotal > this.applyNumTotal){
              this.$message.warning('相同流程下，数量超出总数量，请检查数量');
              throw new Error()
            }
            if(numberTotal < this.applyNumTotal){
              this.$message.warning('相同流程下，工单未分配完，请检查数量');
              throw new Error()
            }
          })

          this.checkOrderIds.forEach(item=>{
            delete item['flowId']
            this.$set(item, 'allocationDtoList',this.assignForm.assignUserList)
            this.$set(item, 'assignType',this.personNum)
          })

          assignOrderEngineerOfMultiOrderNumber(this.checkOrderIds[0]).then(res=>{
            if(res.code == 200){
              this.personDialogVisible = false;
              this.personId = '';
              this.personNum = 0;
              this.applyNumTotal = 0;
              this.assignForm = {};
              this.checkOrderIds = [];
              this.orderForm.page = 0;
              this.getOrderList();
              this.$message.success('修改成功!')
            }
          })
        }

        if(this.applyNumTotal == 1 && this.personNum != 4){
          if(this.checkOrderIds.length == 0){
            this.$message('请选择订单');
            return;
          }

          // this.checkOrderIds.forEach(item=>{
          //   //判断是否全部流程都结束处理
          //   // let arr = item.currentEngineerAndProcessName.split('_')
          //   // let arr3 = [];
          //   // arr.forEach(key=>{
          //   //   let arr2 = key.split('_');
          //   //   arr3.push(arr2[0])
          //   // })
          //   //
          //   // if(arr[0] == '结束'){
          //   //   this.$message.warning('该订单已结束，无法修改');
          //   //   throw new Error()
          //   // }
          // })
          if(this.assignForm.contractState != -1){
            this.personList.forEach(key=>{
              if (key.userId == this.personId) {
                if (key.stateNum == 2) {
                  this.$message.warning(key.userName + '已离职，请重新选择！')
                  throw new Error()
                }
              }
            })
          }

          let params = {
            assignType: this.personNum,
            assignUserId: this.personId,
            crmOrderDtoList: this.checkOrderIds
          }
          assignOrderEngineer(params).then(res => {
            if (res.code == 200) {
              this.personDialogVisible = false;
              this.personId = '';
              this.personNum = 0;
              this.applyNumTotal = 0;
              this.assignForm = {};
              this.checkOrderIds = [];
              this.orderForm.page = 0;
              this.getOrderList();
              this.$message.success('修改成功!')
            } else {
              this.$message.warning(res.message)
            }
          })
        }
      },

      //删除工单处理人
      deleteAssignBox(item,index){
        if(item.workId){
          this.$confirm('该处理人的进度将被删除，请确认是否要删除', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteAssignUserOfMultiOrderNum({workId: item.workId}).then((res)=>{
              if(res.code == 200){
                this.assignForm.assignUserList.splice(index, 1)
              }
            })
          })
        }else{
          this.assignForm.assignUserList.splice(index, 1)
        }
      },

      //加载更多
      getMore() {
        this.orderForm.page = this.orderForm.page + 20
        this.getOrderList();
      },

      // 排序
      sortSelect(e) {
        this.sortList.forEach((item, index) => {
          if (e == item.id) {
            this.orderForm.orderField = item.name
            this.orderForm.orderType = item.type;
          }
        })
        this.orderForm.page = 0;
        this.getOrderList();
      },

      //导出
      handleExport() {
        this.orderForm.pageSize = this.total;
        this.orderForm.page = 0;
        let orderIds = [];
        this.checkOrderIds.forEach(item => {
          orderIds.push(item.orderId)
        })
        this.orderForm.orderIds = orderIds;
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportOrderList(this.orderForm).then(res => {
          if (res.code == 200) {
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              this.orderForm.orderIds = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-订单列表' + '.xlsx'
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

      //弹出选项
      selectedShow() {
        this.exportField.companyId = this.$store.getters.companyId
        getExcelExportField(this.exportField).then(res => {
          if (res.code == 200) {
            this.exportChoose = res.data
            this.choosenum = 0

            for (let i in res.data) {
              this.choosenum = this.choosenum + 1
              if (res.data[i].isDefault == true) {
                this.radioChoose.push(res.data[i].fieldName)
              }
            }
            this.exportDialogVisible = true
          }
        })
      },


      // 新导出企业信息
      exportChooseShow(){
        this.listQuery = this.orderForm;
        this.exportDialogVisible=false;
        this.listQuery.page = 0;
        this.listQuery.pageSize  = this.total;
        this.listQuery.excelExportFieldSet = this.radioChoose;
        let orderIds = [];
        this.checkOrderIds.forEach(item => {
          orderIds.push(item.orderId)
        })
        this.listQuery.orderIds =orderIds;
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportOrderList(this.listQuery).then(res => {
          if (res.code == 200) {
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              this.orderForm.orderIds = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-订单列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              loading.close();
            })
            this.listQuery.excelExportFieldSet=[];
            this.radioChoose=[];
            this.radioAllChoose=[];
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //新导出
      selectedExport() {
        this.orderForm.pageSize = this.total;
        this.orderForm.page = 0;
        let orderIds = [];
        this.checkOrderIds.forEach(item => {
          orderIds.push(item.orderId)
        })
        this.orderForm.orderIds = orderIds;
        const loading = this.$loading({
          lock: true,
          text: '导出中，请稍等...',
        });
        exportOrderList(this.orderForm).then(res => {
          if (res.code == 200) {
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadCrm(parData).then(response => {
              this.orderForm.orderIds = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-订单列表' + '.xlsx'
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

      //跳转到企业详情
      goCompany(data) {
        if(data.relevanceCompanyExist == 3){
          this.$message.warning('该企业不存在，无法跳转');
          return;
        }
        this.$router.push({'path': '/customer/editCustomer', 'query': {'id': data.crmCompanyId, 'check': false,isContractListSkipFlag: 1}})
      },

      openChangeState(list) {
        this.stateDialogVisible = true;
        this.$set(this.updateStateForm, 'orderId', list.orderId)
        this.$set(this.updateStateForm, 'orderState', list.orderState)
        this.$set(this.updateStateForm, 'orderRemarks', list.orderRemarks)
        this.$set(this.updateStateForm, 'assessState', list.assessState)

        this.cancelBubble();
      },

      //修改订单状态
      updateState() {
        if (this.updateStateForm.orderState == '' || this.updateStateForm.orderState == undefined) {
          this.$message.warning('请选择订单状态');
          return;
        }
        if (this.updateStateForm.orderState != 1) {
          if (this.updateStateForm.orderRemarks == '' || this.updateStateForm.orderRemarks == undefined) {
            this.$message.warning('请填写状态备注');
            return;
          }
        }

        if(this.updateStateForm.assessState == 0){
          if(this.updateStateForm.orderState == 1){
            this.$message.warning('订单评估不通过，订单状态无法设置为正常！');
            return;
          }
        }

        updateOrderState(this.updateStateForm).then(res => {
          if (res.code == 200) {
            this.stateDialogVisible = false;
            this.updateStateForm = {};
            this.$message.success('修改成功！')
            this.orderForm.page = 0;
            this.getOrderList();
          }
        })
      },

      openOrderDeductDateDialog(){
        if( this.checkOrderIds.length>0){
           this.orderDeductDateDialogVisible=true;
        }else{
          this.$message.error('至少勾选一个订单')
          return;
        }
      },

      //修改订单核算日期
      updateOrderDeductDateForm(){

        if(this.orderDeductDateForm.deductDate =='' || this.orderDeductDateForm.deductDate ==undefined){
          this.$message.warning('请选择日期');
          return;
        }

        this.orderDeductDateForm.orderIds = this.checkOrderIds.map(item=>item.orderId);

        updateOrderDeductDate(this.orderDeductDateForm).then(res => {
          if (res.code == 200) {
            this.orderDeductDateDialogVisible = false;
            this.orderDeductDateForm = {};
            this.$message.success('修改成功！')
            this.orderForm.page = 0;
            this.getOrderList();
          }
        })
      },

      //获取流程列表
      getFlowList(flowId,key){
        let params = {
          page:0,
          pageSize:30,
          flowId: flowId
        }
        queryFlowInfoDetails(params).then(res=>{
          if(res.code == 200){
            if(key){
              this.$set(key,'flowName',res.data.flowName)
            }else{
              this.flowList.push(res.data);
            }
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //限制输入 num:1 去掉小数点
      inputXz(e) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        e.target.value = e.target.value.replace('.', '');
      },

      //批量取消订单关联工单和处理流程
      cancelWorkAndProcess(){
        if (this.checkOrderIds.length == 0) {
          this.$message.error('至少勾选一个订单')
          return;
        }
        let orderIds = [];
        this.checkOrderIds.forEach(item=>{
          orderIds.push(item.orderId)
        })
        deleteWorkAndProcess({orderIds: orderIds}).then(res=>{
          if(res.code == 200){
            this.checkOrderIds = [];
            this.orderForm.page = 0;
            this.getOrderList();
            this.$message.success('操作成功!')
          }
        })
      },

      // 获取年份列表
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
    justify-content: space-between;
    flex-wrap: wrap;
    block{
      width: 50%;
    }
    /deep/label{
      width: 45%;
      height: 28px;
    }
  }
  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 1%;
  }

  /deep/ .el-card {
    overflow: inherit;
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

      .dataBoxLeft {
        /*width: 80%;*/
        flex: 1;

        /deep/ .el-checkbox {
          /*width: 100%;*/
          flex: 1;
        }

        /deep/ .el-checkbox__label {
          width: 100%;
        }

        .dataLeft {
          display: flex;

          .fileType {
            font-size: 18px;
            width: 60px;
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

            p {
              font-size: 18px;
              font-weight: bold;
              color: rgba(68, 68, 68, 1);
              display: inline-block;
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
              margin-top: 16px;

              span {
                margin-right: 60px;
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
    margin-left: 10px;

    .conditionBox {
      border: 1px solid #33B3EE;
      font-size: 12px;
      color: #33B3EE;
      padding: 5px;
      margin-right: 10px;
      display: flex;
    }
  }

  .conditionClear {
    border: 1px solid rgb(255, 0, 0);
    font-size: 12px;
    color: rgb(255, 0, 0);
    padding: 5px;
    cursor: pointer;
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
    margin-top: 10px;

    .projectBox {
      padding: 10px;
      background: #EFFAFF;
      display: flex;
      justify-content: space-between;
      position: relative;

      .freeContract {
        width: 6%;
        position: absolute;
        right: 50%;
        margin-right: -300px;
      }

      &:hover {
        background: #CDEEFF;
      }
      .projectLeft{
        flex:1;
        margin-right: 15px;
        display: flex;
        position: relative;
        .proNum{
          width: 20px;
          height: 20px;
          background: #9BB5FF;
          border-radius: 100%;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          position: relative;
        }

        .projectMsg {
          flex: 1;

          .leftBox {
            display: flex;
            /*margin-bottom: 10px;*/
            flex-wrap: wrap;

            h4 {
              font-size: 14px;
              font-weight: normal;
              margin-right: 30px;
              margin-bottom: 10px;
              position: relative;
              i{
                padding: 10px;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                margin-top: -7px;
              }
            }
          }
        }
      }

      .projectRig {
        .el-button {
          padding: 5px 10px;
        }
      }
    }
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
    cursor: pointer;
  }

  /deep/ .select-box-date {
    .select-item-list {
      .item {
        padding: 10px 6px !important;
      }
    }
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
    left: 0;
    margin-left: 14px;
    margin-top: -3px;
  }

  /deep/ .el-checkbox {
    margin-left: 10px;
    margin-right: 0;
  }

  .assignEngineer{
    .assignNumAndRig{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .assignBox{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      div{
        display: flex;
        align-items: center;
        margin-right: 10px;
      }
      i{
        color:red;
        cursor: pointer;
      }
    }
  }
</style>
