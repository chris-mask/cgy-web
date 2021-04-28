<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">订单详情</span>
          </div>
        </div>
        <div class="orderDetailCont">
          <el-row class="orderMsg">
            <el-col>
              <span style="margin-right: 30px;">
                客户名称：
                <span class="goLink" @click="goToUrl(1)">{{orderForm.companyName}}</span></span>
              <!--              <span class="orderBtn" style="color: rgb(32, 170, 233);">联系企业</span>-->
              <!--              <span class="orderBtn" style="color: rgb(114, 131, 238);">申报账号</span>-->
              <!--              <span class="orderBtn" style="color: rgb(236, 184, 132)">历史项目对接人</span>-->
            </el-col>
          </el-row>
          <el-row class="orderMsg">
            <el-col :span="9">
              <span>项目名称：<span class="goLink"><span class="goLink" @click="goToUrl(2)">{{orderForm.projectName}}</span></span></span>
            </el-col>
<!--            <el-col :span="9">-->
<!--              <span>级别：{{orderForm.companyLevelName}}</span>-->
<!--            </el-col>-->
          </el-row>
          <el-row class="orderMsg">
            <el-col>
              <span>相关通知：<span class="goLink" @click="goToUrl(3)">{{orderForm.noticeName}}</span></span>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose conOrgin">基本信息</span>
            <img
              v-if="isCheck && allowUpdate.twoAllow && !endProcess"
              @click="changeCheck" src="@/views/icons/enterprise/contract_edit.png" style="cursor: pointer">
          </div>
        </div>
        <div class="orderDetailCont">
          <el-row class="orderMsg">
            <el-col :span="5">
              <span>签约公司：{{orderForm.signCompanyName  ? orderForm.signCompanyName:'其他'}}</span>
            </el-col>
            <el-col :span="5">
              <span  @click="handleShowConnectContentListPeople(orderForm,5)"  >签订人：<span class="classPointer" >{{orderForm.signUserName}}</span></span>
            </el-col>
            <el-col :span="5">
              <span>签订时间：{{orderForm.signDate}}</span>
            </el-col>
          </el-row>
          <el-row class="orderMsg" style="display: none">
            <el-col :span="8" v-if="orderForm.orderType != 2">
              <div class="msgFlex">
                <span v-if="orderForm.orderType == 0">项目工程师 ：</span>
                <span v-if="orderForm.orderType == 1">知识产权工程师：</span>

                <el-select v-if="!isCheck && orderForm.orderType == 0 && allowBatchassignOrder.twoAllow" v-model="orderForm.engineerUserId" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in projectPersonList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-select v-if="!isCheck && orderForm.orderType == 1 && allowBatchassignOrder.twoAllow" v-model="orderForm.engineerUserId" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in patentPersonList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <span v-if="isCheck"  >{{orderForm.engineerUserName}}</span>
                <span v-if="!isCheck && !allowBatchassignOrder.twoAllow">{{orderForm.engineerUserName}}</span>
              </div>
            </el-col>
            <el-col :span="8" v-if="orderForm.orderType == 2">
              <div class="msgFlex">
                <span>财务审计人员：</span>
                <el-select v-if="!isCheck && allowBatchassignOrder.twoAllow" v-model="orderForm.engineerUserId" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in auditPersonList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <span v-if="isCheck">{{orderForm.engineerUserName}}</span>
                <span v-if="!isCheck && !allowBatchassignOrder.twoAllow">{{orderForm.engineerUserName}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="orderMsg">
            <el-col :span="5">
              <span>申报年份：{{orderForm.year}}</span>
            </el-col>
            <el-col :span="5">
              <span>数量：{{orderForm.applyNum}}</span>
            </el-col>
            <el-col :span="5">
              <span>是否渠道公司：{{orderForm.isChannel == 0 ? '不是' : orderForm.isChannel == 1 ? '是' : '-'}}</span>
            </el-col>
          </el-row>
          <el-row class="orderMsg">
            <el-col :span="5" v-if="orderForm.projectType != 822466810090618880">
              <div class="msgFlex">
                <span>项目级别：</span>
                <span>
                  {{
                    orderForm.applyLevel == 1 ? '国家' :
                    orderForm.applyLevel == 2 ? '省级' :
                    orderForm.applyLevel == 3 ? '市级' :
                    orderForm.applyLevel == 4 ? '区县级' :
                    orderForm.applyLevel == 5 ? '镇街级' : '-'
                  }}
                </span>
              </div>
            </el-col>
            <el-col :span="5" v-else>
              <div class="msgFlex">
                <span>职称系列 - 职称级别：</span>
                <span>
                  {{ orderForm.titleSeriesName }} - {{ orderForm.titleLevelName }}
                </span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="msgFlex">
                <span>项目批次：</span>
                <el-select v-if="!isCheck" v-model="orderForm.applyBatchNo" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in batchNoList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <!--                <span v-else>{{batchNoList[orderForm.applyBatchNo].label}}</span>-->
                <span v-else>
                  <span v-if="orderForm.applyBatchNo == 0">未指定</span>
                  <span v-else-if="orderForm.applyBatchNo > 0">第{{orderForm.applyBatchNo}}批</span>
                  <span v-else>-</span>
                </span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="msgFlex">
                <span>订单状态：</span>
                <el-select v-if="!isCheck" v-model="orderForm.orderState" placeholder="请选择" size="small" clearable>
                  <el-option label="正常" :value="1"></el-option>
                  <el-option label="暂停/取消" :value="3"></el-option>
                </el-select>
                <span v-else>{{orderForm.orderState == 1 ? '正常' : !orderForm.orderState ? '-' : '暂停/取消'}}</span>
              </div>
<!--              <el-radio-group v-model="orderForm.orderState" :disabled="isCheck">-->
<!--                <el-radio :label="1">正常</el-radio>-->
<!--                <el-radio :label="2">暂停</el-radio>-->
<!--                <el-radio :label="3">取消</el-radio>-->
<!--                <el-radio :label="4">暂时不符合条件</el-radio>-->
<!--              </el-radio-group>-->
            </el-col>
          </el-row>
          <el-row class="orderMsg" v-if="orderForm.orderState != 1">
            <el-col :span="10" style="display: flex">
              <div class="stateDesc">
                <span class="star" style="position:relative;">*</span><span>状态备注：</span>
                <el-input type="textarea" :rows="4" v-model="orderForm.orderRemarks" v-if="!isCheck" style="flex: 1"
                          maxlength="150"></el-input>
                <span v-else>{{orderForm.orderRemarks}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="orderMsg">
            <el-col :span="5">
              <span>订单评估：</span>
              <span>{{orderForm.assessState == 0 ? '不通过' : orderForm.assessState == 1 ? '通过' : '-'}}</span>
            </el-col>
            <el-col :span="5">
              <p v-if="orderForm.orderType == 0 || orderForm.orderType == 4">
                项目工程师：
                <span v-for="item in userFlowList" @click="handleShowConnectContentListPeople(item,1)"><span class="classPointer" >{{item.userName}}</span> ({{item.allocationNumber ? item.allocationNumber +'件' : 0 }}) | </span>
                <i v-if="orderForm.applyNum != 0 && lastFlowData && !lastFlowData.signTime" class="el-icon-edit" style="color: #48D462;cursor: pointer;" @click="openEditPerson(orderForm)"></i>
              </p>
              <p v-if="orderForm.orderType == 1">
                知识产权工程师：<span v-for="item in userFlowList"  @click="handleShowConnectContentListPeople(item,2)"><span class="classPointer" >{{item.userName}}</span> ({{item.allocationNumber ? item.allocationNumber +'件' : 0 }}) | </span>
                <i v-if="orderForm.applyNum != 0 && lastFlowData && !lastFlowData.signTime" class="el-icon-edit" style="color: #48D462;cursor: pointer;" @click="openEditPerson(orderForm)"></i>
              </p>
              <p v-if="orderForm.orderType == 2">
                财务审计人员：<span v-for="item in userFlowList" @click="handleShowConnectContentListPeople(item,3)"><span class="classPointer" >{{item.userName}}</span> ({{item.allocationNumber ? item.allocationNumber +'件' : 0 }}) | </span>
                <i v-if="orderForm.applyNum != 0 && lastFlowData && !lastFlowData.signTime" class="el-icon-edit" style="color: #48D462;cursor: pointer;" @click="openEditPerson(orderForm)"></i>
              </p>
            </el-col>
            <el-col :span="4">
              <span>项目提成核算日期：{{orderForm.deductDate == null?'-':orderForm.deductDate}}</span>
            </el-col>
          </el-row>
          <el-row class="orderMsg" v-if="orderForm.projectType == 822466810090618880">
            <el-col :span="5">
              <div class="msgFlex">
                <span>职称专业：</span>
                <el-input v-if="!isCheck" v-model="orderForm.titleMajor" size="small" placeholder="请输入职称专业" style="width:65%;" ></el-input>
                <span v-else>{{orderForm.titleMajor}}</span>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="msgFlex">
                <span>职称区域(省份必填)：</span>
                <el-select v-if="!isCheck" @change='provinceChange' v-model="orderForm.titleProvinceId" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in provinceList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select v-if="!isCheck" @change='cityChange' v-model="orderForm.titleCityId" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in cityList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select v-if="!isCheck" @change='districtChange' v-model="orderForm.titleDistrictId" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in districtList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select v-if="!isCheck" v-model="orderForm.titleTownId" placeholder="请选择" size="small" clearable>
                  <el-option
                    v-for="item in townList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <span v-else>
                  <span v-if="orderForm.titleProvinceName && orderForm.titleProvinceName != ''">{{orderForm.titleProvinceName}}{{orderForm.titleCityName}}{{orderForm.titleDistrictName}}{{orderForm.titleTownName}}</span>
                  <span v-else>-</span>
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft jiba">
            <span @click="jiabaTabHandle(index)" v-for="(list,index) in userFlowList" :class="activeJiBa === index?'liucheng cur' : 'liucheng'">流程进度 ({{list.userName}})</span>
            <span @click="jiabaTabHandle(-1)"
                  :class="activeJiBa ===-1?'conditionChoose conZhi cur':'conditionChoose conZhi'">资料收集</span>
          </div>
          <el-button v-if="activeJiBa ===-1" class="upload-order-file" @click="addAnnexHandle(-1)">上传其他附件</el-button>
        </div>
        <!--流程进度-->
        <div v-if="activeJiBa ===index" class="orderDetailCont" v-for="(flow,index) in userFlowList">
          <p class="tips">不同颜色提示：
            <span style="color:#FFA96A">橙色：表示已完成</span>，
            <span style="color:#ff3643">红色：表示审批不通过</span>，
            <span style="color:#05AAFF">蓝色：表示进行中</span>，
            <span style="color:rgba(68, 68, 68, 0.4);">灰色：表示未开始</span>
          </p>
          <!--          <el-row class="orderMsg">-->
          <!--            <el-col :span="12">-->
          <!--              <span>分配时间：</span>-->
          <!--&lt;!&ndash;              <span style="color:#ff383f">（*项目工程师及时勾选已完成的环节）</span>&ndash;&gt;-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <p v-if="flow.orderProcessVoList == ''">暂无流程</p>
          <el-row class="orderMsg" v-else>
            <el-col>
              <div class="processContentData">
                <div class="processCont">
                  <div style="width: 20%;">
                    <div class="processFirstBox">
                      <div class="processStart">
                        <img src="@/views/icons/enterprise/proceStartIcon.png" alt="">
                        <span>开始</span>
                        <p>分配时间:{{flow.orderProcessVoList[0].signTime}}</p>
                        <i class="el-icon-refresh-right" title="撤回" @click="withdrawProcess(flow.orderProcessVoList, flow.lastFlow)"></i>
                      </div>
                      <img class="processDown" src="@/views/icons/enterprise/proceRight.png" alt="">
                    </div>
                    <div class="processHistory">
                      <el-card class="box-card" v-if="flow.historyList != ''">
                        <div slot="header" class="clearfix">
                          <span>历史版本</span>
                          <i class="el-icon-arrow-down historyIcon" :class="openOrCloseHistory ? 'closeIcon' : ''" @click="openOrClose"></i>
                        </div>
                        <el-collapse-transition>
                          <el-timeline class="timeLine" v-show="!openOrCloseHistory">
                            <el-timeline-item :timestamp="hist.time" placement="top" v-for="hist in flow.historyList" :key="hist.processId">
                              <p>{{hist.text}}</p>
                            </el-timeline-item>
                          </el-timeline>
                        </el-collapse-transition>
                      </el-card>
                    </div>
                  </div>
                  <div class="processCenter">
                    <div class="processBoxBig" v-for="(item,i) in flow.orderProcessVoList">
                      <div class="processBox" :title="!item.signTime ? '工作还未到达该环节' : ''"
                           :class="!item.signTime ? '' : item.recheckResult == 1 ? 'processBoxOrgin' :item.checkResult == 2 || item.recheckResult == 2 ? 'processBoxRed' : item.signTime && !item.sendTime ? 'processBoxBlue' : item.signTime && item.sendTime ? 'processBoxOrgin' : ''">
                        <div class="processTit">
                          <span>{{item.nodeName}}</span>
                          <!--                          <img @click="closeProcess(item)" class="processClose"-->
                          <!--                               :class="item.closePro == true ? 'closePro' : ''"-->
                          <!--                               src="@/views/icons/enterprise/procejianIcon.png" alt="">-->
                          <i class="icon iconfont icon-jiantou processClose" @click="closeProcess(item)"
                             :class="item.closePro == true ? 'closePro' : ''"></i>
                        </div>
                        <div class="processBoxList" :class="item.closePro == true ? 'closeProBox' : ''">
                          <!--                        <div class="proBoxData">-->
                          <!--                          <span>计划完成时间：</span>-->
                          <!--                          <p>{{item.planStopDate}}</p>-->
                          <!--                        </div>-->
                          <div class="proBoxData">
                            <span>负责人：</span>
                            <p>{{item.userName ? item.userName : '-'}}</p>
                          </div>

                          <div class="proBoxData" v-if="item.needCheck == 0">
                            <span>实际完成时间：{{item.sendTime ? item.sendTime : '-'}}</span>
                          </div>

                          <div class="proBoxData" v-if="item.needCheck == 1">
                            <span>
                              <span>初审完成时间：{{item.checkTime ? item.checkTime : '-'}}</span>
                            </span>
                          </div>

                          <div class="proBoxData" v-if="(item.needRecheck == 1 || item.needRecheck == 2) && item.recheckTime">
                            <span>复审完成时间：{{item.recheckTime ? item.recheckTime : '-'}}</span>
                          </div>

                          <div class="proBoxData" v-if="item.workingHours">
                            <span>工时：</span>
                            <p>{{item.workingHours}}</p>
                          </div>
                          <div class="proBoxData" v-if="item.workingRatio">
                            <span>工作量占比例：</span>
                            <p>{{item.workingRatio}}</p>
                          </div>
                          <div class="proBoxData" v-if="(item.accessory == 1 || item.isMustUploadAccessory == 1) && item.fileIds">
                            <span>附件：</span>
                            <div style="flex: 1">
                              <div v-for="list in item.fileList" class="fileShow" @click="downloadFile(list)">
                                <p>{{list.fileName}}</p>
                                <el-icon class="el-icon-download"></el-icon>
                              </div>
                            </div>
                          </div>
                          <div class="proBoxData">
                            <span>评论：</span>
                            <div style="flex: 1;text-align: left">
                              <div class="commentBox" v-for="(list,index) in item.commentVoList"
                                   v-if="index<2 && item.commentVoList.length != 0" @click="openCommentList(item)">
                                <p :title="list.userComment">
                                  <span v-if="!list.hasRead" class="star"
                                        style="float: none;color:#ff2f34;margin-left: -7px;">*</span>
                                  {{list.userComment}}
                                </p>
                                <span>{{list.commentTime}}</span>
                                <span>{{list.userName}}</span>
                              </div>
                              <span v-if="item.commentVoList.length == 0">暂无评论</span>
                            </div>
                            <i title="评论" class="el-icon-chat-dot-square commentChat" @click="openCommentList(item)"
                               v-if="item.signTime"></i>
                          </div>
                          <div class="proBoxData" v-if="item.needCheck == 1 && item.checkComment && item.opinion == 1">
                            <span>初审意见：</span>
                            <p>{{item.checkComment}}</p>
                          </div>
                          <div class="processBtn" v-if="item.needCheck == 1 && item.checkResult">
                            <el-icon class="el-icon-success" v-if="item.checkResult == 1"></el-icon>
                            <el-icon class="el-icon-circle-close" v-if="item.checkResult == 2"></el-icon>
                            <span>初审结果：{{item.checkResult == 0 ? '未审' : item.checkResult == 1 ? '已审通过' : item.checkResult == 2 ? '已审不通过' : ''}}</span>

                            <h4 v-if="item.needRecheck == 1 && item.checkResult == 1 && (!item.recheckResult || item.recheckResult == 0)">
                              <p>
                                <el-icon class="el-icon-time"></el-icon>
                                等待
                                <span :title="item.reviewUserListString">{{item.reviewUserListString}}</span>
                                复审
                              </p>
                            </h4>

                            <h4 v-if="item.needRecheck == 2 && item.checkResult == 2 && (!item.recheckResult || item.recheckResult == 0)">
                              <p>
                                <el-icon class="el-icon-time"></el-icon>
                                等待
                                <span :title="item.reviewUserListString">{{item.reviewUserListString}}</span>
                                复审
                              </p>
                              <span v-if="item.needRecheck == 2 && item.checkResult == 2 && !item.recheckResult">等待领导复审</span>
                            </h4>
                          </div>
                          <div class="proBoxData"
                               v-if="item.needRecheck != 0 && item.recheckComment && item.opinion == 1">
                            <span>复审意见：</span>
                            <p>{{item.recheckComment}}</p>
                          </div>
                          <div class="processBtn" v-if="item.needRecheck != 0 && (item.recheckResult && item.recheckResult != 0)">
                            <el-icon class="el-icon-success" v-if="item.recheckResult == 1"></el-icon>
                            <el-icon class="el-icon-circle-close" v-if="item.recheckResult == 2"></el-icon>
                            <span>复审结果：{{item.recheckResult == 0 ? '未审' : item.recheckResult == 1 ? '已审通过' : item.recheckResult == 2 ? '已审不通过' : ''}}</span>
                          </div>
                          <div v-if="(flow.hasProcessOrderFisrtReview == 1 || flow.hasProcessOrderReview == 1) && orderForm.orderState == 1 && orderForm.assessState != 0">
                            <div class="processBtn" v-if="(item.needCheck == 1 || item.needRecheck != 0) && item.signTime && !item.sendTime">
                              <el-button size="mini" v-if="item.needCheck == 1 && !item.sendTime && !item.checkResult && flow.hasProcessOrderFisrtReview == 1 && allowFlowReview.twoAllow" @click="reviewBtn(flow,item,i,1)">初审</el-button>
                              <el-button size="mini" v-if="item.needRecheck == 1 && !item.sendTime && item.checkResult && item.checkResult == 1 && !item.recheckResult && flow.hasProcessOrderReview == 1 && allowProcessReview.twoAllow" @click="reviewBtn(flow,item,i,2)">复审</el-button>
                              <el-button size="mini" v-if="item.needRecheck == 2 && !item.sendTime && item.checkResult && item.checkResult == 2 && !item.recheckResult && flow.hasProcessOrderReview == 1 && allowProcessReview.twoAllow" @click="reviewBtn(flow,item,i,2)">复审</el-button>
<!--                              <el-button size="mini" v-if="item.signTime && item.sendTime && flow.orderProcessVoList[i+1] && !flow.orderProcessVoList[i+1].sendTime" @click="retrieveProcess(item)">取回</el-button>-->
<!--                              <el-button size="mini" v-if="item.signTime && !item.sendTime && i != 0" @click="returnBackOpen(item,flow.orderProcessVoList)">退回</el-button>-->
                            </div>
                          </div>
                          <div class="processBtn" v-if="(item.needCheck == 0 && item.needRecheck == 0) && item.signTime && !item.sendTime && flow.hasProcessComplete == 1 && allowFlowComplete.twoAllow && orderForm.orderState == 1 && orderForm.assessState != 0">
                            <el-button size="mini" v-if="item.needCheck == 0 && !item.checkResult && !item.sendTime" @click="completeBtn(flow,item,i,3)">完成</el-button>
<!--                            <el-button size="mini" v-if="item.signTime && item.sendTime && flow.orderProcessVoList[i+1] && !flow.orderProcessVoList[i+1].sendTime" @click="retrieveProcess(item)">取回</el-button>-->
<!--                            <el-button size="mini" v-if="item.signTime && !item.sendTime && item.isMyself && i != 0" @click="returnBackOpen(item,flow.orderProcessVoList)">退回</el-button>-->
                          </div>
                          <div class="processBtn" v-if="item.signTime && item.userId == userId && !flow.endProcess && orderForm.orderState == 1 && orderForm.assessState != 0">
                            <el-button size="mini" v-if="item.signTime && item.sendTime && flow.orderProcessVoList[i+1] && !flow.orderProcessVoList[i+1].sendTime && !flow.orderProcessVoList[i+1].checkResult && item.userId == userId" @click="retrieveProcess(flow.orderProcessVoList[i+1])">取回</el-button>
                            <el-button size="mini" v-if="item.signTime && !item.sendTime && i != 0" @click="returnBackOpen(item,flow.orderProcessVoList)">退回</el-button>
                          </div>
                        </div>
                      </div>
                      <img v-if="i != flow.orderProcessVoList.length-1" class="processDown" src="@/views/icons/enterprise/proceRight.png" alt="">
                      <img class="processDown" src="#" v-else alt="">
                    </div>
                    <div class="processEnd">
                      <img v-if="flow.lastFlow && !flow.lastFlow.signTime" src="@/views/icons/enterprise/proceEndSign.png">
                      <img v-if="flow.lastFlow && flow.lastFlow.signTime && flow.lastFlow.sendTime" src="@/views/icons/enterprise/proceEndSend.png">
                      <img v-if="flow.lastFlow && flow.lastFlow.signTime && !flow.lastFlow.sendTime" src="@/views/icons/enterprise/proceEnd.png">
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!--*************资料收集*************-->
        <div v-if="activeJiBa ===-1" class="orderDetailCont">
          <!-- 列表-->
          <el-table @row-click="onRowClick" :row-class-name="tableRowClassName" :data="collectDataList" border
                    style="width: 100%">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="materialTypeName" label="类型名称"></el-table-column>
            <el-table-column prop="materialDesc" label="要求备注"></el-table-column>
            <el-table-column label="附件">
              <template slot-scope="scope">
                <ul>
                  <li v-for="(item,index) in scope.row.fileIds" :key="index">
                    {{index+1}}.{{item.fileName}}
                    <span class="down" @click="downFileHandle(item)">下载</span>
                    <span v-if="scope.row.orderId !=0&&allowDelApplyFile.twoAllow" @click="delListAnnex(scope.row,item,index)" class="del">删除</span>
                  </li>
                  <li class="add-annex-btn" v-if="scope.row.orderId != 0" @click="addAnnexHandle(scope.row)">新增附件</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column label="模板">
              <template slot-scope="scope">
                <ul>
                  <li v-for="(item,index) in scope.row.templateFileList" :key="index">
                    {{index+1}}.{{item.fileName}} <span @click="downFileHandle(item)" class="donwn-file">下载</span>
                  </li>
                </ul>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <div class="btnList">
        <el-button size='small' type="primary" @click="submitOrder" v-if="!isCheck && allowUpdate.twoAllow">确定</el-button>
        <el-button size='small' @click="cancelSub">取消</el-button>
      </div>
    </div>

    <el-dialog
      :title="reviewForm.num == 1 ? '初审' : reviewForm.num == 2 ? '复审' : '请您选择'"
      :visible.sync="processialogVisible"
      width="30%"
      center>
      <div>
        <el-form ref="reviewForm" :model="reviewForm" :rules="rules">
          <span class="star" style="left: 0;margin-left: 15px;">*</span>
          <!--      需要初审并需要复审时     -->
          <div v-if="reviewForm.nextHandlerType == 1">
            <el-form-item v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 1 && reviewForm.signTime && reviewForm.holdCheckResult && reviewForm.recheckResult == 1" label="指定下一环节处理人：">
              <el-select v-if="orderForm.orderType == 0" v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
                <el-option
                  v-for="item in projectPersonList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
              <el-select v-if="orderForm.orderType == 1" v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
                <el-option
                  v-for="item in patentPersonList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>

              <el-select v-if="orderForm.orderType == 2" v-model="reviewForm.nextNodeUserId" placeholder="请选择"
                         size="small" clearable filterable>
                <el-option
                  v-for="item in auditPersonList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
              <el-select v-if="orderForm.orderType == 4" v-model="reviewForm.nextNodeUserId" placeholder="请选择"
                         size="small" clearable>
                <el-option
                  v-for="item in personList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 2 && reviewForm.signTime && (reviewForm.checkResult == 1 || reviewForm.holdCheckResult == 2)" label="指定下一环节处理人：">
              <el-select v-if="orderForm.orderType == 0" v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
                <el-option
                  v-for="item in projectPersonList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
              <el-select v-if="orderForm.orderType == 1" v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
                <el-option
                  v-for="item in patentPersonList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
              <el-select v-if="orderForm.orderType == 2" v-model="reviewForm.nextNodeUserId" placeholder="请选择"
                         size="small" clearable filterable>
                <el-option
                  v-for="item in auditPersonList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
              <el-select v-if="orderForm.orderType == 4" v-model="reviewForm.nextNodeUserId" placeholder="请选择"
                         size="small" clearable>
                <el-option
                  v-for="item in personList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!--      需要初审不需要复审时     -->
          <el-form-item
            v-if="reviewForm.nextHandlerType == 1 && ((reviewForm.needCheck == 1 && reviewForm.needRecheck == 0) || (reviewForm.needCheck == 0 && reviewForm.needRecheck == 0)) && reviewForm.signTime"
            label="指定下一环节处理人：">
            <el-select v-if="orderForm.orderType == 0" v-model="reviewForm.nextNodeUserId"
                       placeholder="请选择" size="small" clearable filterable>
              <el-option
                v-for="item in projectPersonList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
            <el-select v-if="orderForm.orderType == 1" v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
              <el-option
                v-for="item in patentPersonList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
            <el-select v-if="orderForm.orderType == 2" v-model="reviewForm.nextNodeUserId" placeholder="请选择"
                       size="small" clearable>
              <el-option
                v-for="item in auditPersonList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
            <el-select v-if="orderForm.orderType == 4" v-model="reviewForm.nextNodeUserId" placeholder="请选择"
                       size="small" clearable>
              <el-option
                v-for="item in personList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>

          <!--      需要初审并需要复审时     -->
<!--          <el-form-item v-if="reviewForm.nextHandlerType == 2" label="指定用户：">-->
<!--            <span>{{reviewForm.nextNodeUserName}}</span>-->
<!--          </el-form-item>-->

          <!--      需要初审并需要复审时     -->
          <div v-if="reviewForm.nextHandlerType == 3">
            <el-form-item
              v-if="((reviewForm.needCheck == 1 && reviewForm.needRecheck == 1 && reviewForm.signTime && reviewForm.holdCheckResult))"
              label="指定下一环节处理人：">
              <el-select filterable v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable>
                <el-option
                  v-for="item in deptUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 2 && reviewForm.signTime && (reviewForm.checkResult == 1 || reviewForm.holdCheckResult == 2)" label="指定下一环节处理人：">
              <el-select filterable v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable>
                <el-option
                  v-for="item in deptUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!--      需要初审不需要复审时     -->
          <el-form-item v-if="reviewForm.nextHandlerType == 3 && ((reviewForm.needCheck == 1 && reviewForm.needRecheck == 0) || (reviewForm.needCheck == 0 && reviewForm.needRecheck == 0)) && reviewForm.signTime" label="指定下一环节处理人：">
            <el-select filterable v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable>
              <el-option
                v-for="item in deptUserList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>

          <!--      需要初审并需要复审时     -->
          <div v-if="reviewForm.nextHandlerType == 4">
            <el-form-item v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 1 && reviewForm.signTime && reviewForm.holdCheckResult" label="指定下一环节处理人：">
              <el-select v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
                <el-option
                  v-for="item in roleUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 2 && reviewForm.signTime && (reviewForm.holdCheckResult == 2 || reviewForm.checkResult == 1)" label="指定下一环节处理人：">
              <el-select v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
                <el-option
                  v-for="item in roleUserList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <!--      需要初审不需要复审时     -->
          <el-form-item v-if="reviewForm.nextHandlerType == 4 && ((reviewForm.needCheck == 1 && reviewForm.needRecheck == 0) || (reviewForm.needCheck == 0 && reviewForm.needRecheck == 0)) && reviewForm.signTime" label="指定下一环节处理人：">
            <el-select v-model="reviewForm.nextNodeUserId" placeholder="请选择" size="small" clearable filterable>
              <el-option
                v-for="item in roleUserList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>

          <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.num == 1 || reviewForm.num == 2">*</span>
          <el-form-item label="结果：" v-if="reviewForm.num == 1 || reviewForm.num == 2">
            <div v-if="reviewForm.num == 1">
              <el-radio v-model="reviewForm.checkResult" label="1">通过</el-radio>
              <el-radio v-model="reviewForm.checkResult" label="2">不通过</el-radio>
            </div>
            <div v-if="reviewForm.num == 2">
              <el-radio v-model="reviewForm.recheckResult" @change="recheckReChange" label="1">通过</el-radio>
              <el-radio v-model="reviewForm.recheckResult" @change="recheckReChange" label="2">不通过</el-radio>
            </div>
          </el-form-item>
          <!--          <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 1">*</span>-->
          <!--      需要初审并需要复审时      || reviewForm.goToType == 3-->
          <!--          <el-form-item-->
          <!--            v-if="((reviewForm.goToType == 1 && reviewForm.needCheck == 1 && reviewForm.needRecheck == 1 && reviewForm.signTime && reviewForm.holdRecheckResult == 1) ||-->
          <!--            (reviewForm.goToType == 1 && reviewForm.needCheck == 1 && reviewForm.needRecheck == 2 && reviewForm.signTime && reviewForm.checkResult == 1))-->
          <!--            || (reviewForm.goToType == 2 && (reviewForm.needCheck == 1 && reviewForm.needRecheck != 0) && reviewForm.signTime && reviewForm.recheckResult == 2)"-->
          <!--            label="跳转环节：">-->
          <!--            <el-radio-group v-model="reviewForm.goToNodeId">-->
          <!--              <el-radio v-for="item in flowList" :key="item.nodeId" :label="item.nodeId">{{item.nodeName}}</el-radio>-->
          <!--            </el-radio-group>-->
          <!--          </el-form-item>-->

          <div v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 1">
            <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.goToType == 1 && reviewForm.signTime && reviewForm.holdRecheckResult == 1 && reviewForm.recheckResult == 1">*</span>
            <el-form-item
              v-if="reviewForm.goToType == 1 && reviewForm.signTime && reviewForm.holdRecheckResult == 1 && reviewForm.recheckResult == 1"
              label="跳转环节：">
              <el-radio-group v-model="reviewForm.goToNodeId" @change="goToNodeChange">
                <el-radio v-for="item in flowList" :key="item.nodeId" :label="item.nodeId">{{item.nodeName}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.goToType == 2 && reviewForm.signTime && reviewForm.checkResult == 2">*</span>
            <el-form-item
              v-if="reviewForm.goToType == 2 && reviewForm.signTime && reviewForm.checkResult == 2" label="跳转环节：">
              <el-radio-group v-model="reviewForm.goToNodeId" @change="goToNodeChange">
                <el-radio v-for="item in flowList" :key="item.nodeId" :label="item.nodeId">{{item.nodeName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>


          <div v-if="reviewForm.needCheck == 1 && reviewForm.needRecheck == 2">
            <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.goToType == 1 && reviewForm.signTime && reviewForm.checkResult == 1">*</span>
            <el-form-item
              v-if="reviewForm.goToType == 1 && reviewForm.signTime && reviewForm.checkResult == 1"
              label="跳转环节：">
              <el-radio-group v-model="reviewForm.goToNodeId" @change="goToNodeChange">
                <el-radio v-for="item in flowList" :key="item.nodeId" :label="item.nodeId">{{item.nodeName}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.goToType == 1 && reviewForm.signTime && reviewForm.checkResult == 2 && reviewForm.recheckResult == 1">*</span>
            <el-form-item
              v-if="reviewForm.goToType == 1 && reviewForm.signTime && reviewForm.checkResult == 2 && reviewForm.recheckResult == 1" label="跳转环节：">
              <el-radio-group v-model="reviewForm.goToNodeId" @change="goToNodeChange">
                <el-radio v-for="item in flowList" :key="item.nodeId" :label="item.nodeId">{{item.nodeName}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.goToType == 2 && reviewForm.signTime && reviewForm.checkResult == 2 && reviewForm.recheckResult == 2">*</span>
            <el-form-item
              v-if="reviewForm.goToType == 2 && reviewForm.signTime && reviewForm.checkResult == 2 && reviewForm.recheckResult == 2"
              label="跳转环节：">
              <el-radio-group v-model="reviewForm.goToNodeId" @change="goToNodeChange">
                <el-radio v-for="item in flowList" :key="item.nodeId" :label="item.nodeId">{{item.nodeName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

          <!--      需要初审不需要复审时     -->
          <span class="star" style="left: 0;margin-left: 15px;" v-if="(reviewForm.goToType == 1 &&(reviewForm.needCheck == 1 && reviewForm.needRecheck == 0) && reviewForm.signTime) || (reviewForm.goToType == 2 && (reviewForm.needCheck == 1 && reviewForm.needRecheck == 0) && reviewForm.signTime  && reviewForm.checkResult == 2)">*</span>
          <el-form-item v-if="(reviewForm.goToType == 1 && (reviewForm.needCheck == 1 && reviewForm.needRecheck == 0) && reviewForm.signTime) || (reviewForm.goToType == 2 && (reviewForm.needCheck == 1 && reviewForm.needRecheck == 0) && reviewForm.signTime && reviewForm.checkResult == 2)" label="跳转环节：">
            <el-radio-group v-model="reviewForm.goToNodeId" @change="goToNodeChange">
              <el-radio v-for="item in flowList" :key="item.nodeId" :label="item.nodeId">{{item.nodeName}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="意见：" v-if="reviewForm.opinion == 1">
            <el-input type="textarea" :row="3" v-model="reviewForm.checkComment" v-if="reviewForm.num == 1"></el-input>
            <el-input type="textarea" :row="3" v-model="reviewForm.recheckComment" v-if="reviewForm.num == 2"></el-input>
          </el-form-item>
          <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.isMustUploadAccessory == 1 && reviewForm.checkResult == 1 && reviewForm.num == 1">*</span>
          <el-form-item label="附件：" v-if="(reviewForm.accessory == 1 || reviewForm.isMustUploadAccessory == 1)">
            <!--          <el-form-item label="附件：">-->
            <!--            <el-upload-->
            <!--              v-if="reviewForm.num == 1 || reviewForm.num == 2"-->
            <!--              ref="upload"-->
            <!--              class="upload-demo"-->
            <!--              action="#"-->
            <!--              :show-file-list="true"-->
            <!--              :auto-upload="false"-->
            <!--              :on-remove="handleRemove"-->
            <!--              :on-change="fileChange"-->
            <!--              :file-list="fileList"-->
            <!--            >-->
            <!--              <el-button size='small' type="primary">点击上传</el-button>-->
            <!--            </el-upload>-->
            <el-upload
              ref="upload"
              v-if="reviewForm.num == 1 || reviewForm.num == 2"
              class="upload-demo"
              :http-request="handlePoliceUpload"
              :on-remove="delUploadFileHandle"
              :on-preview="downFileHandle"
              :limit=limitNum
              :on-exceed="exceedFile"
              action=""
              :file-list="fileList"
              :show-file-list="true">
              <el-button size='small' type="primary">点击上传</el-button>
            </el-upload>
            <span style="cursor:pointer;" v-for="file in reviewForm.fileList" @click="downloadFile(file)">{{file.fileName + '.' + file.fileType}}<el-icon class="el-icon-download"></el-icon></span>
            <p style="font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="checkResultSubmit" v-if="reviewForm.num == 1" :loading="recheckLoading">确 定</el-button>
        <el-button type="primary" @click="recheckResultSubmit" v-if="reviewForm.num == 2" :loading="recheckLoading">确 定</el-button>
        <el-button type="primary" @click="completeSubmit" v-if="reviewForm.num == 3" :loading="recheckLoading">确 定</el-button>
      </span>
    </el-dialog>

    <!--  评论  -->
    <el-dialog
      title="评论"
      :visible.sync="commentDialog"
      width="50%"
      center>
      <div class="commentList">
        <div class="commentData" v-for="item in commentList" v-if="commentList.length != 0">
          <span v-if="!item.hasRead" class="star" style="float: none;color:#ff2f34;margin-left: -7px;">*</span>
          <div class="commentDit">
            <span>{{item.userName}}</span>
            <span style="color: #1e6abc">{{item.commentTime}}</span>
          </div>
          <p>{{item.userComment}}</p>
          <div class="commentDit" v-if="item.operationFlag">
            <span style="color: #ff3738" @click="deleteComment(item)">删除</span>
          </div>
          <div class="commentDit">
            <div v-for="list in item.fileList" class="fileShow" @click="downloadFile(list)">
              <p>{{list.fileName + '.' + list.fileType}}</p>
              <el-icon class="el-icon-download"></el-icon>
            </div>
          </div>
        </div>
        <p v-if="commentList.length == 0" style="text-align: center">暂无评论</p>
      </div>
      <div class="commontSubmit">
        <span class="star" style="margin-left: -7px;">*</span>
        <span>评论意见：</span>
        <el-input type="textarea" :rows="4" v-model="addCommentForm.userComment" maxlength="1900"></el-input>
      </div>
      <!--      <div class="commontSubmit">-->
      <!--        <span>上传附件：</span>-->
      <!--        <el-upload style="flex:1;"-->
      <!--                   ref="upload"-->
      <!--                   action="#"-->
      <!--                   class="upload-box upload-box-width"-->
      <!--                   :auto-upload="false"-->
      <!--                   :on-remove="handleCommentRemove"-->
      <!--                   :before-remove="beforeRemove"-->
      <!--                   :file-list="fileCommentList"-->
      <!--                   :on-change="(file)=> onUploadChange(file)"-->
      <!--                   :show-file-list="true">-->
      <!--          <el-button type="primary" size="small">点击上传</el-button>-->
      <!--        </el-upload>-->
      <!--      </div>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeComment">取 消</el-button>
        <el-button type="primary" @click="addComment">确 定</el-button>
      </span>
    </el-dialog>

    <!--上传附件-->
    <el-dialog
      title="上传附件"
      :visible.sync="uploadFileModal"
      width="40%"
      class="upload-modal"
      :before-close="cananlUploadFile"
      center
      v-dialogDrag
    >
      <div>
        <el-form :model="uploadAnnexParams" :rules="annexRule" ref="annexParams">
          <el-form-item v-if="reviewForm.nextHandlerType == 2" label="指定下一环节处理人：">
            <span>{{reviewForm.nextNodeUserName}}</span>
          </el-form-item>
          <el-form-item label="类型名称：" prop="materialType">
            <el-select v-model="uploadAnnexParams.materialType" :disabled="isFileClick">
              <el-option
                v-for="item in annexTypeData"
                :value="item.dictId"
                :label="item.dictName"
                :key="item.dictId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="要求备注：">
            <el-input v-model="uploadAnnexParams.materialDesc" class="need-remark" type="textarea" resize="none"
                      :row="6"></el-input>
          </el-form-item>
          <el-form-item class="upload-file" label="　">
            <div style="width: 82px;color: #606266;padding-top: 5px;"><span
              style="color:#F56C6C;margin-right: 4px;">*</span>附件：
            </div>
            <div>
              <el-upload style="display: inline-block;width:100%;"
                         ref="upload"
                         class="upload-box upload-box-width"
                         :http-request="handlePoliceUpload"
                         :on-remove="delUploadFileHandle"
                         :on-preview="downFileHandle"
                         :limit=limitNum
                         :on-exceed="exceedFile"
                         action=""
                         :file-list="anFilesList"
                         :show-file-list="true">
                <el-button size='small' type="primary">点击上传</el-button>
              </el-upload>
              <p style="font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cananlUploadFile">取 消</el-button>
        <el-button type="primary" @click="setAnnexHandle">确 定</el-button>
      </span>
    </el-dialog>

    <!--指派处理人-->
    <el-dialog
      title="指派处理人"
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
            <el-input style="flex:1" size="small" v-model="item.allocationNumber" @input.native="inputXz" :disabled="item.processIsOverState == 0"></el-input>
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
      <div class="assignEngineer" v-if="applyNumTotal == 1 && assignForm.orderType == 4">
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
            <el-input style="flex:1" size="small" v-model="item.allocationNumber" @input.native="inputXz" :disabled="item.processIsOverState == 0"></el-input>
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
      <p v-if="assignForm.orderType == 4" style="margin-top:15px;color:red;">提示：处理人角色必须对应指定流程，例如处理人是项目员，流程必须是项目流程，请仔细检查！</p>

      <div v-if="applyNumTotal == 1 && assignForm.orderType != 4" style="display: flex;align-items: center">
        <span style="margin-right: 10px;">指派{{personNum == 0 ? '项目工程师' : personNum == 2 ? '审计员' : personNum == 1 ? '知识产权工程师' : '-'}}</span>
        <el-select v-model="personId" placeholder="请选择" filterable clearable style="flex:1">
          <el-option
            v-for="item in personList"
            :key="item.userId"
            :label="item.userName+'_'+item.deptName+'-'+item.roleName + (assignForm.contractState == -1 && item.stateNum == 1 ? '(在职)' : assignForm.contractState == -1 && item.stateNum == 2 ? '(离职)' : '')"
            :value="item.userId">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAssignDig">取 消</el-button>
          <el-button type="primary" @click="editPerson">确 定</el-button>
        </span>
    </el-dialog>

    <!--  退回流程  -->
    <el-dialog
      title="退回"
      :visible.sync="sendBackDialog"
      width="50%"
      center
    >
      <div class="backProcessList">
        <span><i style="color:red;margin-right: 3px;">*</i>退回环节：</span>
        <el-radio-group v-model="sendBackForm.targetSkipProcessId">
          <el-radio v-for="item in sendBackForm.sendList" :label="item.processId" :key="item.processId">{{item.nodeName}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSendBack">取 消</el-button>
        <el-button type="primary" @click="returnBackProcess">确 定</el-button>
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

  </div>
</template>

<script>
  import {
    addprocesscomment,
    deleteprocesscomment,
    editOrderDetailAndProcess,
    editOrderIsRead,
    orderProcessComplete,
    orderProcessFirstReview,
    orderProcessReview,
    queryApplyMaterialList,
    queryOrderDetail,
    queryOrderProjectApplyFile,
    queryprocesscomment,
    saveProjectApplyFile,
    updateCommentReadStatus,
    uploadProcessNodeFile,
    assignOrderEngineer,
    assignOrderEngineerOfMultiOrderNumber,
    deleteAssignUserOfMultiOrderNum,
    queryAllocationInfo,
    invalidProcess,
    recaptionProcess,
    sendbackProcess,
    queryBakProcessList
  } from '@/api/orderManage'
  import {queryUserComboInfo} from '@/api/customerCenter'
  // import {getRolesList} from '@/api/rolesManage'
  import {addFileBatch, getFileListWithFileIds, ossFileSystemFileDownload, roleIdConvertRoleName,commonDict, commonDictOfRegion} from '@/api/utils'
   import {queryMessageList, deleteChatById, addChat, addChatFile,importCrmCompanyPersonnel,getCrmCompanyPersonnelTemplate} from '@/api/messageCenter'
  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {getFileDownload} from '@/api/fileManage'
  import {projectOrderUpload} from '@/utils/uploadPathMethods'
  import {ossFileDownload} from '@/api/customerCenter'
  import {queryFlowInfoDetails} from '@/api/processManage'
  import {queryProjectMaxBatch} from '@/api/projectManage'

  import cloneDeep from "lodash/cloneDeep";

  export default {
    data() {
      return {
        closePro: false,
        orderId: '',
        isCheck: false,
        endProcess: false,
        batchNoList: [
          {'label': '未指定', 'value': 0},
        ],
        projectPersonList: [],
        patentPersonList: [],
        auditPersonList: [],
        roleUserList: [],
        deptUserList: [],
        orderForm: {},
        processialogVisible: false,
        reviewForm: {},
        // rolesList:[
        //   {roleName:'总经理', roleId: 1},
        //   {roleName:'中台（总经办）', roleId: 2},
        //   {roleName:'中台（子公司）', roleId: 3},
        //   {roleName:'项目主管', roleId: 4},
        //   {roleName:'项目员', roleId: 5},
        //   {roleName:'审计员', roleId: 6}
        // ],
        recheckLoading: false,
        rules: {},
        fileList: [],
        firstFlow: [{userName: ''}],
        lastFlow: [],
        commentDialog: false,
        commentList: [],
        addCommentForm: {},
        fileCommentList: [],
        commentIdList: [],
        holdProcessList: [],
        flowList: [],
        rolesList: [],


        //*************资料收集**********
        //上传附件弹窗显示、隐藏
        uploadFileModal: false,
        //当前选中的项目模板
        activeSelectProjectModal: "",
        //选择项目模板数据
        selectProjectModalData: [],
        //列表数据
        collectDataList: [],
        //上传附件参数
        uploadAnnexParams: {
          materialTypeName: "",
          materialDesc: "",
          fileIds: []
        },
        //上传附件的文件
        annexFilesList: [],
        anFilesList: [],
        //判断是否上传其他
        isOtherFile: '',
        //选中的 流程进度（0）|资料收集（1）
        activeJiBa: 0,

        //附件分类数据
        annexTypeData: [],

        //当前点击的第几条数据
        curData: "",
        //判断是否点击附件
        isFileClick: false,

        //上传附件--监听
        annexRule: {
          materialType: [
            {required: true, message: '请选择类型名称', trigger: 'blur'}
          ]
        },
        userFlowList: [],
        personList: [],
        checkOrderIds: [],
        assignForm:{},
        personId:'',
        applyNumTotal: 0,
        personNum: 0,
        personDialogVisible: false,

        sendBackDialog:false,
        sendBackForm: {},
        openOrCloseHistory: false,
        userId:'',

        allowDetail: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:DETAILS'),//查看订单详情
        allowUpdate: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:UPDATE'),//修改订单
        allowFlowReview: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:FLOW:REVIEW'),//处理流程节点初审
        allowFlowComplete: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:FLOW:COMPLETE'),//完成处理流程节点
        allowProcessReview: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:PROCESS:REVIEW'),//处理流程节点复审
        allowBatchassignOrder: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:BATCHASSIGNORDERENGINEER'),//批量修改工程师/审计员
        allowOrderCheckInfo: this.authorityControl('SYSTEM:DECLARE:SYNERGY', 'SYSTEM:DECLARE:ORDER:MANAGE', 'SYSTEM:DECLARE:ORDER:CHECK:INFO'),//查询订单关联工单分配情况
        allowDelApplyFile: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:APPLYFILE:DELETE'),// 删除客户资料



        // 跟进消息
        upload_url: '/core/upload-files-api/',
        uploadData: {save_path: 'enterprise_info/enterprise_chat/'},
        fileList: [],
        ConnectContentDialogVisible:  false,
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

        limitNum:1,

        lastFlowData: {},

        provinceList: [],
        cityList: [],
        districtList: [],
        townList: [],

      }
    },


    filters: {
      titleSize(val) {
        return val.substring(0, 1);
      },
    },

    activated() {
      this.orderId = this.$route.query.orderId;
      this.isCheck = this.$route.query.isCheck;
      this.userId = this.$store.getters.userId;

      if(this.$route.query.noticeId){
        this.noticeId = this.$route.query.noticeId;
      }

      this.getDetail();
      this.changeOrderRead();
      // this.getRoles();
      this.getDictData();
      // this.getPersonList('项目主管,项目员');
      // this.getPersonList('专利主管,专利员');
      // this.getPersonList('审计员');
    },
    methods: {
      // 根据省份获取城市信息
      provinceChange() {
        this.$set(this.orderForm, 'titleCityId', '')
        this.$set(this.orderForm, 'titleDistrictId', '')
        this.$set(this.orderForm, 'titleTownId', '')
        if (this.orderForm.titleProvinceId){
          this.getAddressData(2, this.orderForm.titleProvinceId)
        }
      },
      // 根据城市获取区县信息
      cityChange() {
        this.$set(this.orderForm, 'titleDistrictId', '')
        this.$set(this.orderForm, 'titleTownId', '')
        if (this.orderForm.titleCityId) {
          this.getAddressData(1, this.orderForm.titleCityId)
        }
      },
      // 根据区县获取镇街信息
      districtChange() {
        this.$set(this.orderForm, 'titleTownId', '')
        if (this.orderForm.titleDistrictId) {
          this.getAddressData(0, this.orderForm.titleDistrictId)
        }
      },

      // 获取职称区域信息
      getAddressData(level, parentId){
        let params = {
          level: level,
          parentId: parentId
        };
        commonDictOfRegion(params).then(res => {
          if (res.code === 200) {
            if (level == 3) {
              this.provinceList = res.data
            }
            if (level == 2) {
              this.cityList = res.data
            }
            if (level == 1) {
              this.districtList = res.data
            }
            if (level == 0) {
              this.townList = res.data
            }
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },


      //跟进--点击人员按钮 沟通
      handleShowConnectContentListPeople(data, i) {

        let newformData = new FormData
        switch (i) {
          case 0:
            newformData.append('roleNameList', '业务员,业务主管')
            break
          case 1:
            newformData.append('roleNameList', '项目主管,项目员,审计员,专利员,专利主管')
            break
          case 2:
            newformData.append('roleNameList', '项目主管,项目员,审计员,专利员,专利主管')
            break
          case 3:
            newformData.append('roleNameList', '项目主管,项目员,审计员,专利员,专利主管')
          case 5:
            newformData.append('roleNameList', '业务员,业务主管,总经理,中台（总经办）,中台（子公司）')
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
              if (data.signUserName == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.signUserName)
              // console.log(a)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.signUserName
              break
            case 1:
              if (data.userName == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.userName)
              this.toUserName = data.userName

              this.toUserId = this.personList[a].userId

              break
            case 2:
              if (data.userName == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.userName)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.userName
              break
            case 3:
              if (data.userName == undefined) {
                return
              }
              var a = this.personList.findIndex((value) => value.userName == data.userName)
              this.toUserId = this.personList[a].userId
              this.toUserName = data.userName
              break
          }

          // this.searchForm.toUserId = this.toUserId
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
        if (this.chatContent == "") {
          this.$message.warning(`请输入沟通内容`);
          return
        }
        let params
        if (this.toUserId != 0) {
          params = {
            companyId: this.$store.getters.companyId,
            chatContent: this.chatContent,
            // toCompanyId: this.searchForm.companyId,
            toUserId: this.toUserId
          }
        }else{
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

        addChat(params).then(res => {
          if (res.code === 200) {
            this.chatContent = "";
            this.fileTemp = [];
            this.fileIds = "";
            this.getConnectList();
          }
        })
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

      // 已阅订单
      changeOrderRead() {
        let formData = new FormData;
        formData.append('orderId', this.orderId)
        editOrderIsRead(formData).then(res => {
          if (res.code == 200) {
          }
        })
      },

      //获取订单详情
      getDetail() {
        if (!this.allowDetail.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取此详情');
          return;
        }

        queryOrderDetail({orderId: this.orderId, noticeId: this.noticeId}).then(res => {
          if (res.code == 200) {
            this.orderForm = res.data;
            // console.log('sss',this.orderForm)
            if (this.orderForm.orderType == 0) {
              this.getPersonList('项目主管,项目员','','',true, false)
            } else if (this.orderForm.orderType == 1) {
              this.getPersonList('专利员,专利主管','','',true, false)
            } else if (this.orderForm.orderType == 2) {
              this.getPersonList('审计员','','',true, false)
            }else if(this.orderForm.orderType == 4){
              this.getPersonList('项目主管,项目员,审计员','','',true, false)
            }
            // 获取该项目最大的批次
            if (res.data.projectId) {
              this.getProjectMaxBatch(res.data.projectId)
            }
            // 职称区域信息
            if (res.data.projectType == 822466810090618880) {
              this.getAddressData(3, 0);
              if (res.data.titleProvinceId) {
                this.getAddressData(2, res.data.titleProvinceId);
              }
              if (res.data.titleCityId) {
                this.getAddressData(1, res.data.titleCityId);
              }
              if (res.data.titleDistrictId) {
                this.getAddressData(0, res.data.titleDistrictId);
              }
            }

            if(res.data.orderState && res.data.orderState != 1){
              this.$set(this.orderForm, 'orderState', 3)
            }

            if(res.data.engineerUserId){
              this.orderForm.holdEngineerUserId = JSON.parse(JSON.stringify(res.data.engineerUserId));
            }

            this.$set(this.orderForm, 'applyBatchNo', res.data.batch)
            this.userFlowList = [];
            let list = [];

            for(let key in this.orderForm.workOrderProcessVoMap){
              list.push(this.orderForm.workOrderProcessVoMap[key])
            }

            for(var i=list.length-1;i>=0;i--){
              //通过数组i的倒序调用，实现结果的倒序输出。
              this.userFlowList.push(list[i])
            }


            let arr = [];

            this.userFlowList.forEach(flow=>{
              setTimeout(()=>{
                queryAllocationInfo({orderId: this.orderForm.orderId}).then(response=>{
                  if(response.code == 200){
                    response.data.allAllocationUserList.forEach(key=>{
                      if(flow.workId == key.workId){
                        this.personList.forEach(msg=>{
                          if(msg.userId == key.userId){
                            this.$set(key, 'userName', msg.userName)
                          }
                        })

                        this.$set(flow, 'userId', key.userId)
                        this.$set(flow, 'userName', key.userName)
                      }
                    })
                  }
                })
              },300)
              if (flow.orderProcessVoList.length > 0) {
                flow.holdProcessList = JSON.parse(JSON.stringify(flow.orderProcessVoList));
                flow.firstFlow = flow.orderProcessVoList.splice(0, 1);
                flow.lastFlow = flow.orderProcessVoList.splice(flow.orderProcessVoList.length - 1, 1);
                // if(flow.lastFlow[0].nodeName == '结束'){
                //   if(flow.lastFlow[0].signTime){
                //     flow.endProcess = true;
                //   }
                // }

                flow.lastFlow = flow.lastFlow[0];
                if(flow.lastFlow.signTime){
                  flow.endProcess = true;
                }

                this.lastFlowData = flow.lastFlow

                arr.push(flow.holdProcessList[flow.holdProcessList.length-1])
                flow.orderProcessVoList.forEach((item, index) => {
                  if(item.userId == this.$store.getters.userId){
                    item.isMyself = true
                  }

                  flow.workId = item.workId;
                  this.$set(item, 'closePro', false);
                  if (item.fileIds && item.fileIds != '') {
                    let fileIds = item.fileIds.split(',')
                    this.getFileDetail(fileIds, item);
                  }
                })
                this.getHistoryList(flow)

                var num
                flow.orderProcessVoList = flow.orderProcessVoList.filter(function (item, index) {
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

                  if(item.needCheck == 1 && item.needRecheck == 0){
                    if (item.checkResult == 2 && item.goToType != 2) {
                      num = JSON.parse(JSON.stringify(index))
                    }
                  }

                  if (num == 0 || (num != '' && num != undefined)) {
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
              }else{
                this.endProcess = false;
              }
            }

            if(this.allowOrderCheckInfo.twoAllow){
              this.getEditPersonNum();
            }

            this.getCollectData();
          } else {
            this.$message.warning(res.message)
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

      // 编辑模式
      changeCheck() {
        this.getDetail();
        this.isCheck = !this.isCheck;
      },

      //根据角色id获取角色名称
      getRoleName(id) {
        roleIdConvertRoleName({roleId: id}).then(res => {
          if (res.code == 200) {
            this.$set(this.reviewForm, 'roleName', res.data)
            this.getPersonList(res.data, 1,'',true);
          }
        })
      },

      //根据角色获取人员列表 1:指定角色用户列表 2:部门用户列表
      getPersonList(name, num, deptIds,isResign,isExcludePermission) {
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
            if (name == '项目主管,项目员') {
              this.projectPersonList = res.data;
            }
            if (name == '专利主管,专利员') {
              this.patentPersonList = res.data;
            }
            if (name == '审计员') {
              this.auditPersonList = res.data;
            }

            if (num == 1) {
              this.roleUserList = res.data
            }

            if (num == 2) {
              this.deptUserList = res.data
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // 提交修改订单
      submitOrder() {
        if (this.orderForm.orderState != 1) {
          if (this.orderForm.orderRemarks == '' || this.orderForm.orderRemarks == undefined) {
            this.$message.warning('请填写状态备注');
            return;
          }
        }

        if(this.orderForm.assessState == 0){
          if(this.orderForm.orderState == 1){
            this.$message.warning('订单评估不通过，订单状态无法设置为正常！');
            return;
          }
        }
        if(!this.orderForm.titleProvinceId || this.orderForm.titleProvinceId== '' || this.orderForm.titleProvinceId == undefined){
          this.$message.warning('职称所属省份必填');
          return;
        }

        editOrderDetailAndProcess(this.orderForm).then(res=>{
          if(res.code == 200){
            this.$message.success('修改成功');
            this.orderForm = {};
            // this.$store.commit('SET_ORDER_SCROLL', 0)
            this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route);
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //确定工程师或审计员修改
      // editPerson() {
      //   let checkOrderIds = [];
      //   this.orderForm.crmCompanyId = this.orderForm.companyId
      //   checkOrderIds.push(this.orderForm)
      //   let params = {
      //     assignType: this.orderForm.orderType,
      //     assignUserId: this.orderForm.engineerUserId,
      //     crmOrderDtoList: checkOrderIds
      //   }
      //   assignOrderEngineer(params).then(res => {
      //     if (res.code == 200) {
      //     } else {
      //       this.$message.warning(res.message)
      //     }
      //   })
      // },

      //打开审核窗口， num：1 初审，2：复审
      reviewBtn(flow,item, index, num) {
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == flow.workId){
              str.orderProcessVoList.forEach(msg=>{
                if(msg.processId == item.processId){
                  if(num == 1){
                    if(msg.needCheck == 1 && msg.signTime && !msg.sendTime && !msg.checkResult){
                      this.processialogVisible = !this.processialogVisible;
                    }
                  }
                  if(num == 2){
                    if((msg.needRecheck == 1 || msg.needRecheck == 2) && msg.signTime && !msg.sendTime && msg.checkResult && (msg.checkResult == 1 || msg.checkResult == 2) && !msg.recheckResult){
                      this.processialogVisible = !this.processialogVisible;
                    }
                  }
                }
              })
            }
          })

          if(item.fileIds && item.fileIds != ''){
            let fileIds = item.fileIds.split(',')
            this.getFileDetail(fileIds,item)
          }

          // this.processialogVisible = !this.processialogVisible;
          this.reviewForm = {};
          this.reviewForm = JSON.parse(JSON.stringify(item));
          this.reviewForm.num = num
          // this.reviewForm.fileIds = [];

          flow.orderProcessVoList.forEach((list, i) => {
            if (index + 1 == i) {
              this.$set(this.reviewForm, 'nextHandlerType', list.handlerType)
              this.$set(this.reviewForm, 'nextHandlerId', list.handlerId);
              this.$set(this.reviewForm, 'holdCheckResult', item.checkResult)

              if(this.reviewForm.nextHandlerType == 4){
                this.getRoleName(this.reviewForm.nextHandlerId)
              }

              if(this.reviewForm.nextHandlerType == 2){
                this.$set(this.reviewForm, 'nextNodeUserId', list.handlerId);
                this.personList.forEach(list=>{
                  if(this.reviewForm.nextHandlerId == list.userId){
                    this.reviewForm.nextNodeUserName = list.userName
                  }
                })
              }

              if(this.reviewForm.nextHandlerType == 3){
                let deptIds = [];
                deptIds.push(list.handlerId)
                this.getPersonList('',2,deptIds);
              }
            }
          })

          if(item.goToType == 1 && item.needRecheck != 0){
            this.$set(this.reviewForm, 'holdRecheckResult', item.checkResult)
          }

          if(this.reviewForm.goToType != 0){
            let flowList = [];
            // this.orderForm.originalNodeList = this.orderForm.originalNodeList.splice(0,1)
            flow.holdProcessList.forEach((item,index)=>{
              if(item.nodeName == '开始'){
                flow.holdProcessList.splice(index,1)
              }
              if(!item.sendTime && item.nodeName != '开始'){
                flowList.push(item)
              }
            })

            // flowList = flow.originalNodeList
            // flowList = this.orderForm.crmOrderProcessVoList.concat(this.lastFlow);

            flowList.forEach((item,index)=>{
              if(this.reviewForm.nodeId == item.nodeId){
                flowList.splice(index,1)
              }
            })

            this.flowList = flowList;
          }
        },600)
      },

      // 是否通过
      recheckReChange(val){
        this.$set(this.reviewForm, 'holdRecheckResult', val)
      },

      //审核确定
      checkResultSubmit(){
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == this.reviewForm.workId){
              str.orderProcessVoList.forEach(msg=>{
                if(msg.processId == this.reviewForm.processId){
                  if(msg.needCheck == 1 && msg.signTime && !msg.sendTime && !msg.checkResult){
                    if(this.reviewForm.needCheck == 1 && (this.reviewForm.needRecheck == 0 || (this.reviewForm.needRecheck == 2 && this.reviewForm.checkResult == 1))){
                      if(this.reviewForm.nextHandlerType == 1 && this.reviewForm.nextHandlerType != undefined){
                        // if(this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                        if(this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined){
                          this.$message.warning('请选择指定用户');
                          return;
                          // }
                        }
                      }

                      if(this.reviewForm.nextHandlerType == 2 && this.reviewForm.nextHandlerType != undefined){
                        // if(this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                        if(this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined){
                          this.$message.warning('请选择指定用户');
                          return;
                          // }
                        }
                      }

                      if(this.reviewForm.nextHandlerType == 3 && this.reviewForm.nextHandlerType != undefined){
                        // if(this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                        if(this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined){
                          this.$message.warning('请选择指定用户');
                          return;
                          // }
                        }
                      }

                      if(this.reviewForm.nextHandlerType == 4 && this.reviewForm.nextHandlerType != undefined){
                        // if(this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                        if(this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined){
                          this.$message.warning('请选择指定用户');
                          return;
                          // }
                        }
                      }

                      // if(this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != undefined){
                      //   if(this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined){
                      //     this.$message.warning('请选择指定用户');
                      //     return;
                      //   }
                      // }

                      if(this.reviewForm.goToType != 0 && this.reviewForm.goToType != 3){
                        if(this.reviewForm.needRecheck == 1){
                          if(this.reviewForm.goToType == 1 && this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 2){
                          if(this.reviewForm.goToType == 1 && this.reviewForm.checkResult == 1){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 1){
                          if(this.reviewForm.goToType == 1 && this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 2){
                          if(this.reviewForm.goToType == 2 && this.reviewForm.checkResult == 2 && this.reviewForm.recheckResult == 2){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 1){
                          if(this.reviewForm.goToType == 2 && (this.reviewForm.checkResult == 2 || this.reviewForm.recheckResult == 2)){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 0){
                          if(this.reviewForm.goToType == 2 && this.reviewForm.checkResult == 2){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }
                      }
                    }

                    if(this.reviewForm.checkResult == '' || this.reviewForm.checkResult == undefined){
                      this.$message.warning('请选择评审结果');
                      return;
                    }
                    // if( this.reviewForm.fileIds != undefined && this.reviewForm.fileIds.length != 0){
                    //   this.reviewForm.fileIds = this.reviewForm.fileIds.join(',')
                    // }else{
                    //   this.reviewForm.fileIds = ''
                    // }
                    if(this.reviewForm.isMustUploadAccessory == 1){
                      if(this.reviewForm.checkResult == 1){
                        if(this.reviewForm.fileIds == '' || this.reviewForm.fileIds == undefined){
                          this.$message.warning('请上传附件');
                          return;
                        }
                      }
                    }

                    this.recheckLoading = true;
                    orderProcessFirstReview(this.reviewForm).then(res=>{
                      if(res.code == 200){
                        this.$message.success('初审成功');
                        this.recheckLoading = false;
                        this.getDetail();
                        this.fileList = [];
                        this.flowList = [];
                        // this.$store.commit('SET_ORDER_SCROLL', 0)
                        this.processialogVisible = false
                      }
                    })
                  }else{
                    this.processialogVisible = false
                  }
                }
              })
            }
          })
        },600)
      },

      //复审确定
      recheckResultSubmit(){
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == this.reviewForm.workId){
              str.orderProcessVoList.forEach(msg=>{
                if(msg.processId == this.reviewForm.processId){
                  if((msg.needRecheck == 1 || msg.needRecheck == 2) && msg.signTime && !msg.sendTime && msg.checkResult && (msg.checkResult == 1 || msg.checkResult == 2) && !msg.recheckResult){
                    if(this.reviewForm.needCheck == 1 && this.reviewForm.needRecheck != 0){
                      if(this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != undefined){
                        if(this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined){
                          this.$message.warning('请选择指定用户');
                          return;
                        }
                      }

                      if(this.reviewForm.goToType != 0 && this.reviewForm.goToType != 3){
                        if(this.reviewForm.needRecheck == 1){
                          if(this.reviewForm.goToType == 1 && this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 2){
                          if(this.reviewForm.goToType == 1 && this.reviewForm.checkResult == 1){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 1){
                          if(this.reviewForm.goToType == 1 && this.reviewForm.checkResult == 1 && this.reviewForm.recheckResult == 1){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 2){
                          if(this.reviewForm.goToType == 2 && this.reviewForm.checkResult == 2 && this.reviewForm.recheckResult == 2){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 1){
                          if(this.reviewForm.goToType == 2 && (this.reviewForm.checkResult == 2 || this.reviewForm.recheckResult == 2)){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }

                        if(this.reviewForm.needRecheck == 0){
                          if(this.reviewForm.goToType == 2 && this.reviewForm.checkResult == 2){
                            if(this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined){
                              this.$message.warning('请选择跳转节点');
                              return;
                            }
                          }
                        }
                      }
                    }

                    if (this.reviewForm.recheckResult == '' || this.reviewForm.recheckResult == undefined) {
                      this.$message.warning('请选择评审结果');
                      return;
                    }

                    // if (this.reviewForm.fileIds != undefined && this.reviewForm.fileIds != '' && this.reviewForm.fileIds.length != 0) {
                    //   this.reviewForm.fileIds = this.reviewForm.fileIds.join(',')
                    // } else {
                    //   this.reviewForm.fileIds = ''
                    // }

                    this.recheckLoading = true;
                    orderProcessReview(this.reviewForm).then(res=>{
                      if(res.code == 200){
                        this.$message.success('复审成功');
                        this.recheckLoading = false;
                        this.getDetail();
                        this.fileList = [];
                        this.flowList = [];
                        // this.$store.commit('SET_ORDER_SCROLL', 0)
                        this.processialogVisible = false
                      }
                    })
                  }else{
                    this.processialogVisible = false
                  }
                }
              })
            }
          })
        },600)
      },

      //关闭弹窗
      cancelSubmit(){
        this.fileList = [];
        this.flowList = [];
        this.processialogVisible = false;
        this.recheckLoading = false;
      },

      //完成节点
      completeBtn(flow,item,index,num){
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == flow.workId){
              str.orderProcessVoList.forEach(msg=>{
                if(msg.processId == item.processId){
                  if(msg.needCheck == 0 && msg.needRecheck == 0 && !msg.checkResult && !msg.sendTime && msg.signTime){
                    this.reviewForm = {};
                    this.reviewForm = JSON.parse(JSON.stringify(item));

                    flow.orderProcessVoList.forEach((list, i) => {
                      if (index + 1 == i) {
                        this.$set(this.reviewForm, 'nextHandlerType', list.handlerType)
                        this.$set(this.reviewForm, 'nextHandlerId', list.handlerId);
                        this.$set(this.reviewForm, 'holdCheckResult', item.checkResult)

                        if(this.reviewForm.nextHandlerType == 4){
                          this.getRoleName(this.reviewForm.nextHandlerId)
                        }

                        if(this.reviewForm.nextHandlerType == 2){
                          this.$set(this.reviewForm, 'nextNodeUserId', list.handlerId);
                          this.personList.forEach(list=>{
                            if(this.reviewForm.nextHandlerId == list.userId){
                              this.reviewForm.nextNodeUserName = list.userName
                            }
                          })
                        }

                        if(this.reviewForm.nextHandlerType == 3){
                          let deptIds = [];
                          deptIds.push(list.handlerId)
                          this.getPersonList('',2,deptIds);
                        }
                      }
                    })

                    if(item.goToType == 1 && item.needRecheck != 0){
                      this.$set(this.reviewForm, 'holdRecheckResult', item.checkResult)
                    }

                    if(this.reviewForm.goToType != 0){
                      let flowList = [];
                      // this.orderForm.originalNodeList = this.orderForm.originalNodeList.splice(0,1)
                      flow.holdProcessList.forEach((item,index)=>{
                        if(item.nodeName == '开始'){
                          flow.holdProcessList.splice(index,1)
                        }

                        if(!item.sendTime && item.nodeName != '开始'){
                          flowList.push(item)
                        }
                      })

                      // flowList = flow.originalNodeList
                      // flowList = this.orderForm.crmOrderProcessVoList.concat(this.lastFlow);

                      flowList.forEach((item,index)=>{
                        if(this.reviewForm.nodeId == item.nodeId){
                          flowList.splice(index,1)
                        }
                      })

                      this.flowList = flowList;
                    }

                    if(this.reviewForm.nextHandlerType && this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != 2 && this.reviewForm.nextHandlerType != 5 && !this.reviewForm.nextHandlerUserId){
                      this.processialogVisible = !this.processialogVisible;
                      this.reviewForm.num = num
                    }else{
                      orderProcessComplete(item).then(res=>{
                        if(res.code == 200){
                          this.$message.success('操作成功');
                          // this.$store.commit('SET_ORDER_SCROLL', 0)
                          this.getDetail();
                        }
                      })
                    }
                  }else{
                    flow.orderProcessVoList.forEach((list, i) => {
                      if (index + 1 == i) {
                        this.$set(this.reviewForm, 'nextHandlerType', list.handlerType)
                        this.$set(this.reviewForm, 'nextHandlerId', list.handlerId);
                        this.$set(this.reviewForm, 'holdCheckResult', item.checkResult)
                      }
                    })
                    if(this.reviewForm.nextHandlerType && this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != 2 && this.reviewForm.nextHandlerType != 5 && !this.reviewForm.nextHandlerUserId){
                      this.processialogVisible = false;
                    }
                  }
                }
              })
            }
          })
        },1000)
      },

      //完成流程提交
      completeSubmit(){
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == this.reviewForm.workId){
              str.orderProcessVoList.forEach(msg=>{
                if(msg.processId == this.reviewForm.processId){
                  if(msg.needCheck == 0 && msg.needRecheck == 0 && !msg.checkResult && !msg.sendTime && msg.signTime){
                    if(this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != undefined){
                      if(this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined){
                        this.$message.warning('请选择指定用户');
                        throw new Error
                      }
                    }
                    orderProcessComplete(this.reviewForm).then(res=>{
                      if(res.code == 200){
                        this.processialogVisible = !this.processialogVisible;
                        this.$message.success('操作成功');
                        // this.$store.commit('SET_ORDER_SCROLL', 0)
                        this.getDetail();
                      }
                    })
                  }else{
                    this.processialogVisible = false;
                  }
                }
              })
            }
          })
        },600)
      },

      //撤回
      withdrawProcess(list,lastFlow){
        this.getDetail();
        setTimeout(()=>{
          let params = {};
          list.push(lastFlow)
          this.userFlowList.forEach(str=>{
            list.forEach(item=>{
              if(str.workId == item.workId){
                if(item.signTime && !item.sendTime){
                  params = {
                    currentProcessId: item.processId,
                    orderId: item.orderId,
                    workId: item.workId,
                  };
                }
              }
            })
          })
          this.$confirm('是否确定撤回此流程', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            invalidProcess(params).then(res=>{
              if(res.code == 200){
                this.$message.success('撤回成功');
                this.getDetail();
              }
            })
          })
        },600)
      },

      //取回
      retrieveProcess(item){
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == item.workId){
              str.orderProcessVoList.forEach((msg,i)=>{
                if(msg.processId == item.processId){
                  if(str.orderProcessVoList[i-1] && str.orderProcessVoList[i-1].signTime && str.orderProcessVoList[i-1].userId == this.userId && str.orderProcessVoList[i-1].sendTime && !msg.sendTime && !msg.checkResult){
                    let params = {
                      currentProcessId: item.processId,
                      orderId: item.orderId,
                      workId: item.workId,
                    }
                    recaptionProcess(params).then(res=>{
                      if(res.code == 200){
                        this.$message.success('取回成功');
                        this.getDetail();
                      }
                    })
                  }
                }
              })
            }
          })
        },600)
      },

      //退回弹出
      returnBackOpen(item,list){
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == item.workId){
              str.orderProcessVoList.forEach(msg=>{
                if(msg.processId == item.processId){
                  if(msg.signTime && !msg.sendTime){
                    this.sendBackForm = {
                      currentProcessId: item.processId,
                      orderId: item.orderId,
                      workId: item.workId,
                      sendList:[]
                    }

                    list.forEach(key=>{
                      if(key.signTime && key.sendTime){
                        this.sendBackForm.sendList.push(key)
                      }
                    })

                    this.sendBackDialog = true;
                  }
                }
              })
            }
          })
        },600)
      },

      //退回
      returnBackProcess(){
        this.getDetail();
        setTimeout(()=>{
          this.userFlowList.forEach(str=>{
            if(str.workId == this.sendBackForm.workId){
              str.orderProcessVoList.forEach(msg=>{
                if(msg.processId == this.sendBackForm.currentProcessId){
                  if(msg.signTime && !msg.sendTime){
                    if(this.sendBackForm.targetSkipProcessId == undefined || this.sendBackForm.targetSkipProcessId == ''){
                      this.$message.warning('请选择退回环节');
                      return;
                    }

                    delete this.sendBackForm.sendList
                    sendbackProcess(this.sendBackForm).then(res=>{
                      if(res.code == 200){
                        this.sendBackForm = {};
                        this.getDetail();
                        this.sendBackDialog = false;
                      }
                    })
                  }
                }
              })
            }
          })
        },600)
      },

      //关闭退回弹窗
      closeSendBack(){
        this.sendBackForm = {};
        this.sendBackDialog = false
      },

      //获取工单处理进度历史
      getHistoryList(item){
        queryBakProcessList({workId: item.workId}).then(res=>{
          if(res.code == 200){
            let list = [];
            let list2 = [];
            for(let key in res.data){
              for(let i=0;i<=res.data[key].length;i++){
                if(res.data[key][i]){
                  list.push(res.data[key][i])
                }
              }
            }

            for(var k=list.length-1;k>=0;k--){
              //通过数组i的倒序调用，实现结果的倒序输出。
              list2.push(list[k])
            }

            let dataList = [];
            list2.forEach(str=>{
              str = str.split("|");
              str[1] = str[1].replace('T',' ')
              let msg = {
                time: str[1],
                text: str[0]
              };
              dataList.push(msg)
            })
            this.$set(item,'historyList', dataList)
          }
        })
      },

      //上传文件
      fileChange(file) {
        this.importApproval(file)
      },

      // 移除文件
      handleRemove(file,filelist) {
        this.fileList.forEach(item=>{
          if(item.fileId == file.fileId){
            this.fileList.splice(0,1);
          }
        });
      },

      // 上传文件
      importApproval(file) {
        if(file.size == 0){
          this.$message('文件为空，请重新上传');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if(file.name.length >= 150){
          this.$message('文件名称超长，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        this.fileTemp = file.raw
        if (this.fileTemp) {
          let formData = new FormData;
          formData.append('crmCompanyId', this.orderForm.companyId)
          formData.append('customerName', this.orderForm.companyName)
          formData.append('projectName', this.orderForm.projectName)
          formData.append('file', this.fileTemp)
          uploadProcessNodeFile(formData).then(res => {
            if (res.code == 200) {
              let fileNameList = {
                uid: file.uid,
                name: file.name,
                fileName: file.name,
                filesId: res.data
              }
              this.fileList.push(fileNameList)
              this.reviewForm.fileIds = [];
              this.reviewForm.fileIds.push(res.data)
              this.$message.success('上传成功')
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请上传文件！'
          })
        }
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
              this.$message.success('下载成功')
            }
          })
        }
      },

      // 关闭当前页跳转指定页面
      cancelSub() {
        this.orderForm = {};
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/declareCoordination/orderManage');
      },

      // 收起流程
      closeProcess(item) {
        item.closePro = !item.closePro
      },

      //打开评论弹窗
      openCommentList(row){
        this.commentDialog = true;
        this.addCommentForm = {
          companyId: this.orderForm.companyId,
          companyName: this.orderForm.companyName,
          fileIds: "",
          nodeName: row.nodeName,
          orderType: this.orderForm.orderType,
          orderId: this.orderForm.orderId,
          processId: row.processId,
          projectName: this.orderForm.projectName,
          userComment: "",
          userId: this.$store.getters.userId,
          userName: this.$store.getters.username,
          currentProcessUserId: row.userId
        }

        this.getCommentList(row.processId);
      },

      //根据流程id获取评论列表
      getCommentList(id) {
        queryprocesscomment({processId: id}).then(res => {
          if (res.code == 200) {
            this.commentList = res.data;
            this.commentIdList = [];
            this.commentList.forEach(item=>{
              if(item.fileIds && item.fileIds != ''){
                item.fileIds = item.fileIds.split(',')
                this.getFileDetail(item.fileIds,item);
              }
              this.commentIdList.push(item.commentId)
            })

            if(this.commentIdList.length != 0){
              this.changeCommentState(id)
            }
          }
        })
      },

      //改变评论状态
      changeCommentState(id) {
        updateCommentReadStatus({commentIdList: this.commentIdList}).then(response => {
          if (response.code == 200) {
            queryprocesscomment({processId: id}).then(res => {
              if (res.code == 200) {
                this.commentList = res.data;
                this.commentIdList = [];
                this.commentList.forEach(item=>{
                  if(item.fileIds && item.fileIds != ''){
                    item.fileIds = item.fileIds.split(',')
                    this.getFileDetail(item.fileIds,item);
                  }
                  this.commentIdList.push(item.commentId)
                })
              }
            })
          }
        })
      },

      //添加评论
      addComment() {
        if (this.addCommentForm.userComment == '' || this.addCommentForm.userComment == undefined) {
          this.$message.warning('评论内容不能为空');
          return;
        }
        addprocesscomment(this.addCommentForm).then(res => {
          if (res.code == 200) {
            this.$message.success('评论成功');
            this.commentDialog = false;
            this.getDetail();
          }
        })
      },

      //关闭评论弹窗
      closeComment(){
        this.getDetail();
        this.commentDialog = false
      },

      //删除评论
      deleteComment(item){
        this.$confirm('是否确定删除评论', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteprocesscomment({commentId:item.commentId}).then(res=>{
            if(res.code == 200){
              this.$message.success('删除成功！');
              this.getCommentList(item.processId)
              this.getDetail();
            }
          })
        })
      },

      // 选择节点
      goToNodeChange(event){
        this.flowList.forEach(item=>{
          if(item.nodeId == event){
            this.$set(this.reviewForm, 'nextHandlerType', item.handlerType)
            this.$set(this.reviewForm, 'nextHandlerId', item.handlerId);
            if(this.reviewForm.nextHandlerType == 1 && this.reviewForm.needCheck == 1 && this.reviewForm.needRecheck == 2){
              this.$set(this.reviewForm, 'holdCheckResult', this.reviewForm.checkResult)
            }
            if(this.reviewForm.nextHandlerType == 4){
              this.roleUserList = [];
              this.$set(this.reviewForm, 'nextNodeUserId', '');
              this.$set(this.reviewForm, 'holdCheckResult', this.reviewForm.checkResult)

              this.getRoleName(this.reviewForm.nextHandlerId)
            }

            if(this.reviewForm.nextHandlerType == 2){
              this.$set(this.reviewForm, 'nextNodeUserId', item.handlerId);
              this.personList.forEach(list=>{
                if(this.reviewForm.nextHandlerId == list.userId){
                  this.reviewForm.nextNodeUserName = list.userName
                }
              })
            }

            if(this.reviewForm.nextHandlerType == 3){
              this.deptUserList = [];
              this.$set(this.reviewForm, 'nextNodeUserId', '');
              let deptIds = [];
              deptIds.push(item.handlerId)
              this.getPersonList('',2,deptIds);
            }

            // console.log('aaa',this.reviewForm)
          }
        })
      },

      // 获取角色列表
      // getRoles() {
      //   const params = {
      //     page: 1,
      //     pageSize: 1000,
      //     roleName: this.roleName,
      //     parentId: 0,
      //   }
      //   getRolesList(params).then(res => {
      //     if (res.code == 200) {
      //       this.rolesList = res.data.data;
      //     } else {
      //       this.$message({type: 'error', message: res.message})
      //     }
      //   })
      // },

      // handleCommentRemove(file, filelist) {
      //   this.fileCommentList.forEach(item => {
      //     if (item.fileId == file.fileId) {
      //       this.fileCommentList.splice(0, 1);
      //     }
      //   });
      // },

      // beforeRemove(file, fileList) {
      //   return this.$confirm(`是否确定删除此文件，解除关联? ${file.name}？`)
      // },
      //
      // onUploadChange(file) { // 处理上传
      //   this.uploadCommentFile(file.raw)
      // },

      // uploadCommentFile(obj) {
      //   if (obj.name.length >= 150) {
      //     this.$message('文件名称超长，请检查');
      //     this.fileList = JSON.parse(JSON.stringify(this.fileList))
      //     return;
      //   }
      //   if (obj.size == 0) {
      //     this.$message.warning('请勿上传空文件');
      //     this.fileList = JSON.parse(JSON.stringify(this.fileList))
      //     return
      //   }
      //
      //   const loading = this.$loading({
      //     lock: true,
      //     text: '上传中',
      //   });
      //
      //   // var sendDate = (new Date()).getSeconds();
      //   const formData = new FormData()
      //   formData.append('file', obj)
      //   // this.$refs.upload.submit();
      //   uploadFile(formData).then(res => {
      //     if (res.code == 200) {
      //       this.fileIdsList.push(res.data)
      //       let fileNameList = {
      //         uid: obj.uid,
      //         name: obj.name,
      //         fileName: obj.name,
      //         filesId: res.data
      //       }
      //       loading.close();
      //       this.fileList.push(fileNameList)
      //       this.fileNameList.push(fileNameList)
      //       this.$message.success('上传成功！')
      //     } else {
      //       this.fileList = JSON.parse(JSON.stringify(this.fileList))
      //       this.$message.warning(res.message)
      //     }
      //   })
      // },


      //************** 资料收集 ****************//
      //获取类型名称字典
      getDictData() {
        let params = {
          keyList: 'DICT:MATERIALTYPE',
          companyId: this.$store.getters.companyId
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.annexTypeData = res.data['DICT:MATERIALTYPE'];
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //点击流程进度和资料收集
      jiabaTabHandle(num) {
        this.activeJiBa = num;
      },

      //获取资料收集列表数据
      getCollectData() {
        let params = {
          page: 0,
          pageSize: 20,
          companyId: this.orderForm.companyId,
          orderId: this.orderForm.orderId,
          applyLevel: this.orderForm.applyLevel,
          provinceId: this.orderForm.provinceId,
          cityId: this.orderForm.cityId,
          districtId: this.orderForm.districtId,
          townId: this.orderForm.townId,
          applyYear: this.orderForm.year,
          projectId: this.orderForm.projectId,
        };
        queryOrderProjectApplyFile(params).then(res => {
          if (res.code === 200) {
            if (res.data.data.length !== 0) {
              this.selectProjectModalData = [];
              let dataArr = JSON.parse(JSON.stringify(res.data.data));
              dataArr.forEach(item => {

                //附件数据重组
                if (item.fileIds && item.fileIds !== '') {
                  let filesArr = item.fileIds.split(',');
                  getFileListWithFileIds({fileIds: filesArr, haveView: false}).then(res => {
                    if (res.code == 200) {
                      item.fileIds = res.data;
                    } else {
                      this.$message.warning(res.message)
                    }
                  })
                } else {
                  item.fileIds = []
                }

                //模板数据重组
                if (item.templateFileIds && item.templateFileIds !== '') {
                  let templateFileArr = item.templateFileIds.split(',');
                  getFileListWithFileIds({fileIds: templateFileArr, haveView: false}).then(res => {
                    if (res.code == 200) {
                      item.templateFileList = res.data;
                    } else {
                      this.$message.warning(res.message)
                    }
                  })
                }
              });

              setTimeout(() => {
                this.collectDataList = dataArr;
              }, 600)
            }
          }
        })
      },

      // 文件超出个数限制时的钩子
      exceedFile(files, fileList) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件`)
      },

      //下载文件
      downFileHandle(data) {
        if(!data.fileId){
          this.annexFilesList.forEach(item=>{
            if(item.fileName == data.name){
              data = item;
            }
          })
        }

        let params = {
          companyId: this.$store.getters.companyId,
          fileId: data.fileId
        }
        ossFileDownload(params).then(res => {
          if (res.code == 200) {
            let url = res.data.replace(/http/,'https')
            window.open(url)
            this.$message({type: 'success', message: '下载成功'});
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //新增附件
      addAnnexHandle(data) {
        this.uploadFileModal = true;
        this.anFilesList = [];

        if (data !== -1) {
          if (data.fileIds.length !== 0) {
            data.fileIds.forEach(item => {
              item.name = item.fileName;
            })
          }
          this.uploadAnnexParams = JSON.parse(JSON.stringify(data));
          this.isFileClick = true;
        } else {
          this.isFileClick = false;
        }
      },

      tableRowClassName({row, rowIndex}) {
        //把每一行的索引放进row
        row.index = rowIndex;
      },

      //获取资料收集列表 第几条数据
      onRowClick(row, column, event) {
        this.curData = row.index;
      },

      // 上传附件
      handlePoliceUpload(option) {
        if (!this.orderForm.companyName || this.orderForm.companyName == '') {
          this.$message.error('客户名称为空，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          this.anFilesList = JSON.parse(JSON.stringify(this.anFilesList))
          return;
        }
        if (!this.orderForm.projectName || this.orderForm.projectName == '') {
          this.$message.error('项目名称为空，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          this.anFilesList = JSON.parse(JSON.stringify(this.anFilesList))
          return;
        }
        if (option.file.name.length >= 150) {
          this.$message.error('文件名称超长，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          this.anFilesList = JSON.parse(JSON.stringify(this.anFilesList))
          return;
        }

        let fileSize = option.file.size / 1024
        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          this.anFilesList = JSON.parse(JSON.stringify(this.anFilesList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          this.anFilesList = JSON.parse(JSON.stringify(this.anFilesList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = projectOrderUpload(this.orderForm.companyName, this.orderForm.projectName,'申报书', fileName) + '.' + fileType

        uploadFilesOss(filePath, option.file, option).then(res => {
          if (res) {
            let FileList = [];
            let addFile = {
              fileName: option.file.name,
              filePath: filePath,
              fileSize: fileSize,
              fileType: fileType,
              parentType: 4
            }

            FileList.push(addFile)

            let params = {
              companyId: this.$store.getters.companyId,
              companyName: this.$store.getters.companyName,
              addFileDtos: FileList,
              haveView: true
            }

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                this.annexFilesList.push(response.data[0]);

                response.data[0].name = response.data[0].fileName;
                this.uploadAnnexParams.fileIds.push(response.data[0]);

                this.$set(this.reviewForm, 'fileIds', response.data[0].fileId)
                this.$set(this.reviewForm, 'fileName', response.data[0].fileName)
                this.$set(this.reviewForm, 'fileList', [])
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.fileList = JSON.parse(JSON.stringify(this.fileList))
                this.anFilesList = JSON.parse(JSON.stringify(this.anFilesList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.fileList = JSON.parse(JSON.stringify(this.fileList))
            this.anFilesList = JSON.parse(JSON.stringify(this.anFilesList))
          }
        })
      },

      //删除-上传附件中的附件
      delUploadFileHandle(file, index) {
        this.uploadAnnexParams.fileIds.forEach((item, i) => {
          if (file.name == item.fileName) {
            this.uploadAnnexParams.fileIds.splice(i, 1);
          }
        })
      },

      //确定上传附件
      setAnnexHandle() {
        this.$refs.annexParams.validate((valid, error) => {
          if (valid) {
            if (this.uploadAnnexParams.fileIds.length == 0) {
              this.$message.warning('请上传附件');
              return
            }

            let arr = [];
            let filesArr = this.uploadAnnexParams.fileIds.map(item => {
              return item.fileId
            });
            this.uploadAnnexParams.fileIds = filesArr.join(',');
            this.uploadAnnexParams.orderId = this.$route.query.orderId;
            this.uploadAnnexParams.crmCompanyId = this.orderForm.companyId;

            arr.push(this.uploadAnnexParams);

            saveProjectApplyFile(arr).then(res => {
              if (res.code === 200) {
                this.$message.success('保存成功');
                this.getCollectData();

                this.uploadAnnexParams = {
                  materialTypeName: "",
                  materialDesc: "",
                  fileIds: [],
                };
                this.annexFilesList = [];
                this.anFilesList = [];
                // this.$refs.filesUpload.clearFiles();
                this.uploadFileModal = false;
              }
            })
          }
        });
      },

      //取消上传附件
      cananlUploadFile() {
        this.uploadAnnexParams = {
          materialTypeName: "",
          materialDesc: "",
          fileIds: []
        };
        this.annexFilesList = [];
        this.anFilesList = [];
        // this.$refs.filesUpload.clearFiles();
        this.uploadFileModal = false;
      },

      //列表删除附件
      delListAnnex(data, list, index) {
        let obj = JSON.parse(JSON.stringify(data));
        obj.fileIds.forEach(item => {
          if (item.fileId === list.fileId) {
            obj.fileIds.splice(index, 1);
          }
        });


        obj.fileIds = obj.fileIds.map(item => {
          return item.fileId
        })

        obj.fileIds = obj.fileIds.join(',');

        let arr = [];
        arr.push(obj);

        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          saveProjectApplyFile(arr).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功');
              this.getCollectData();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //跳转到各个页面（1：客户名称，2：项目名称，3：相关通知）
      goToUrl(num) {
        switch (num) {
          case 1:
            this.$router.push({
              'path': '/customer/editCustomer',
              'query': {'id': this.orderForm.companyId, 'check': false, 'tip': true,isContractListSkipFlag: 1}
            })
            break;
          case 2:
            this.$router.push({
              'path': '/policy/project/detail',
              'query': {'id': this.orderForm.projectId, 'check': true}
            })
            break;
          case 3:
            this.$router.push({
              'path': '/policy/detailPolicy',
              'query': {'noticeId': this.orderForm.noticeId, 'is_check': true}
            })
            break;
        }
      },

      //获取处理人数量
      getEditPersonNum(){
        queryAllocationInfo({orderId: this.orderId}).then(res=>{
          if(res.code == 200){
            if(res.data.allAllocationUserList != 0){
              this.userFlowList.forEach(item=>{
                res.data.allAllocationUserList.forEach(list=>{
                  if(item.workId == list.workId){
                    this.$set(item,'allocationNumber', list.allocationNumber)
                  }
                })
              })
            }
          }
        })
      },

      //打开修改人员弹窗 0-工程师  2-审计员 1-知识产权工程师
      openEditPerson(item) {
        let isResign = false;
        if (item) {
          item.crmCompanyId = item.companyId
          this.personNum = 0;
          this.applyNumTotal = 0;
          this.assignForm = {};
          this.checkOrderIds = [];
          this.checkOrderIds.push(item)

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

          if (this.checkOrderIds.length == 0) {
            this.$message.error('至少勾选一个订单')
            return;
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

                    this.getPersonList('项目主管,项目员,审计员','','',isResign, false)
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
                    this.getPersonList('项目主管,项目员,审计员','','',isResign, false)
                    this.flowList = [];
                    flowIds.forEach(data=>{
                      this.getFlowList(data);
                    })
                    let assignBox = {
                      orderId:item.orderId,
                      allocationNumber: res.data.orderAllocationTotalNumber,
                    }
                    this.assignForm.assignUserList.push(assignBox)
                  }else{
                    let assignBox = {
                      orderId:item.orderId,
                      flowId:item.flowId,
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

                    this.getPersonList('项目主管,项目员,审计员','','',isResign, false)
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
                    this.getPersonList('项目主管,项目员,审计员','','',isResign, false)
                    this.flowList = [];
                    flowIds.forEach(data=>{
                      this.getFlowList(data);
                    })
                    let assignBox = {
                      orderId:item.orderId,
                    }
                    this.assignForm.assignUserList.push(assignBox)
                  }else{
                    let assignBox = {
                      orderId:item.orderId,
                      flowId:item.flowId,
                    }
                    this.$set(this.assignForm, 'assignUserList', res.data.allAllocationUserList)
                    this.assignForm.assignUserList.push(assignBox)
                  }
                }
              }

              setTimeout(()=>{
                if(this.flowList.length == 1){
                  this.assignForm.assignUserList.forEach(key=>{
                    // key.flowId = this.flowList[0].flowId
                    this.$set(key,'flowId',this.flowList[0].flowId)

                    let ids = this.personList.map(item=>{
                      return item.userId
                    })
                    if(JSON.stringify(ids).indexOf(JSON.stringify(key.userId))==-1){
                      this.userFlowList.forEach(list=>{
                        if(list.userId == key.userId){
                          let box = {
                            userName: list.userName,
                            userId: list.userId,
                            stateNum: 2
                          }

                          this.personList.push(box)
                        }
                      })
                    }
                  })
                }else{
                  this.assignForm.assignUserList.forEach(key=>{
                    // key.flowId = this.flowList[0].flowId
                    let ids = this.personList.map(item=>{
                      return item.userId
                    })
                    if(JSON.stringify(ids).indexOf(JSON.stringify(key.userId))==-1){
                      this.userFlowList.forEach(list=>{
                        if(list.userId == key.userId){
                          let box = {
                            userName: list.userName,
                            userId: list.userId,
                            stateNum: 2
                          }

                          this.personList.push(box)
                        }
                      })
                    }
                  })
                }
              },600)
            }
          })
        }

        this.personNum = item.orderType;

        this.personDialogVisible = true;

        if (item.orderType == 0) {
          this.getPersonList('项目主管,项目员','','',isResign, false)
        } else if (item.orderType == 1) {
          this.getPersonList('专利员,专利主管','','',isResign, false)
        } else if (item.orderType == 2) {
          this.getPersonList('审计员','','',isResign, false)
        }else if(item.orderType == 4){
          this.getPersonList('项目主管,项目员,审计员','','',isResign, false)
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
        this.personDialogVisible = false;
      },

      //确定工程师或审计员修改
      editPerson() {
        if(this.applyNumTotal > 1 || (this.applyNumTotal == 1 && this.assignForm.orderType == 4)){
          if (this.checkOrderIds.length == 0) {
            this.$message.error('至少勾选一个订单')
            return;
          }

          this.assignForm.assignUserList.forEach(item=>{
            if(item.userId == undefined || item.userId == ''){
              this.$message.warning('请填写处理人信息');
              throw new Error()
            }
            if(item.allocationNumber == 0 || item.allocationNumber == ''){
              this.$message.warning('数量不能为0或者空');
              throw new Error()
            }

            if(this.assignForm.orderType == 4){
              if(!item.flowId || item.flowId == ''){
                this.$message.warning('请选择流程');
                throw new Error()
              }
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
              // this.$store.commit('SET_ORDER_SCROLL', 0)
              this.getDetail();
              this.$message.success('修改成功!')
            }
          })
        }
        if(this.applyNumTotal == 1 && this.assignForm.orderType != 4){
          if(this.checkOrderIds.length == 0){
            this.$message('请选择订单');
            return;
          }

          // this.checkOrderIds.forEach(item=>{
          //   //判断是否全部流程都结束处理
          //   let arr = item.currentEngineerAndProcessName.split('_')
          //   let arr3 = [];
          //   arr.forEach(key=>{
          //     let arr2 = key.split('_');
          //     arr3.push(arr2[0])
          //   })
          //
          //   if(arr[0] == '结束'){
          //     this.$message.warning('该订单已结束，无法修改');
          //     throw new Error()
          //   }
          // })

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
              // this.$store.commit('SET_ORDER_SCROLL', 0)
              this.getDetail();
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

      // 开关历史记录
      openOrClose(){
        this.openOrCloseHistory = !this.openOrCloseHistory
      },

    }
  }
</script>

<style lang="less" scoped>

  .classPointer{
    cursor: pointer;
    color:rgba(105, 204, 255, 1);

  }
  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 4%;
  }

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }

  .cardCont {
    margin-bottom: 10px;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    span{
      &::after {
        content: '';
        border-left: 2px solid rgb(3, 173, 244);
        margin-left: 15px;
      }
      &:last-child{
        &::after {
          content: '';
          border-left: 2px solid rgb(3, 173, 244);
          margin-left: 15px;
          display: none;
        }
      }
    }

    .conditionChoose {
      font-size: 16px;
      color: #444 !important;
      margin-right: 20px;

      /*&::after {*/
      /*  content: '';*/
      /*  border-left: 2px solid rgb(3, 173, 244);*/
      /*  margin-right: 15px;*/
      /*}*/
    }

    /*.conOrgin {*/
    /*  &::before {*/
    /*    content: '';*/
    /*    border-left: 2px solid rgb(255, 169, 106);*/
    /*    margin-right: 15px;*/
    /*  }*/
    /*}*/

    /*.conZhi {*/
    /*  &::before {*/
    /*    content: '';*/
    /*    border-left: 2px solid rgb(121, 156, 255);*/
    /*    margin-right: 15px;*/
    /*  }*/
    /*}*/
  }

  .upload-order-file {
    padding: 10px;
    background: #03adf4;
    color: #fff;
    border: 0;

    &:active {
      opacity: 0.5;
    }
  }

  .orderDetailCont {
    .orderMsg {
      margin-bottom: 20px;
      padding-left: 40px;

      .msgFlex {
        display: flex;
        align-items: center;
      }

      p{
        font-size: 14px;
      }
    }

    span {
      font-size: 14px;
    }

    .orderBtn {
      margin-left: 15px;
    }
  }

  .processContentData {
    display: flex;
  }

  .processCont {
    min-width: 310px;
    margin-right: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width:100%;
    .processFirstBox {
      text-align: center;
      display: flex;
      align-items: center;

      .processStart {
        background: url("../../icons/enterprise/proceStartBgTwo.png");
        background-size: 100% 100%;
        width: 200px;
        padding: 10px 10px;
        padding-bottom: 20px;
        /*margin: 0 auto;*/
        color: #fff;
        font-size: 12px;

        p {
          margin-top: 10px;
        }

        span {
          vertical-align: top;
        }

        i{
          margin-top: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      }

      .processDown{
        width: 15%;
      }
    }
    .processHistory{
      margin-top: 20px;
      width:90%;
      /deep/ .el-card__header{
        padding: 10px;
      }
      /deep/ .el-card__body{
        padding: 0;
      }

      .historyIcon{
        float:right;
        cursor:pointer;
        transform: rotate(0deg);
        transition: transform .4s; //过度时间 可调
      }

      .closeIcon{
        ransform-origin: center center; //旋转中心要是正中间 才行
        transform: rotate(-180deg);
        transition: transform .4s; //过度时间 可调
      }

      .timeLine{
        padding: 20px;
        transition: all .4s;
        /*max-height: 10000px;*/
        /*overflow: hidden;*/
      }
    }

    .processCenter {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      align-items: center;

      .processBoxBig {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 33%;
        .processDown{
          width: 13%;
        }

        &:nth-last-child(2) {
          .processDown {
            /*display: none;*/
          }
        }
      }
    }


    .processBox {
      border: 1px solid rgba(68, 68, 68, 0.4);
      border-radius: 4px;
      margin-bottom: 10px;
      max-width: 400px;
      width: 100%;
      .processTit{
        span{
          font-size:16px;
          margin-right: 5px;
          color:#fff;
        }
        border-color: rgba(68, 68, 68, 0.4);
        background: rgba(68, 68, 68, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6px 0;

        .processClose {
          transform: rotate(0deg);
          transition: transform .6s; //过度时间 可调
          cursor: pointer;
          font-size:12px;
          color:#fff;
        }

        .closePro {
          ransform-origin: center center; //旋转中心要是正中间 才行

          transform: rotate(-90deg);

          transition: transform .6s; //过度时间 可调
          font-size:12px;
          color:#fff;
        }
      }

      .processBoxList {
        max-height: 1000px;
        transition: all .6s;
        overflow: hidden;

        .proBoxData {
          display: flex;
          /*align-items: center;*/
          padding: 10px 15px;

          .commentBox {
            cursor: pointer;
            margin-bottom: 10px;
            display: table;
            width: 100%;

            p {
              font-size: 14px;
              margin-bottom: 5px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              width: 100%;
            }

            span {
              float: right;
              margin-left: 10px;
              font-size: 12px;
              text-align: right;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }

          span {
            font-size: 14px;
            color: rgba(68, 68, 68, 0.60);
            text-align: left;
          }

          p {
            font-size: 14px;
            color: rgba(68, 68, 68, 1);
            flex: 1;
            text-align: left;
            margin-bottom: 10px;

            &:last-child {
              margin-bottom: 0px;
            }
          }

          i {
            margin-left: 10px;
            cursor: pointer;
          }

          &::before {
            content: '';
            width: 4px;
            height: 4px;
            background: rgba(188, 205, 255, 1);
            border-radius: 100%;
            display: inline-block;
            margin-right: 10px;
            margin-top: 6px;
          }
        }
      }

      .closeProBox {
        max-height: 0px;
      }

      .processBtn{
        background: #ccc;
        color:#fff;
        padding:8px 0;
        position: relative;
        h4{
          font-size: 14px;
          color: #fff;
          font-weight: normal;
          padding: 0 10px;
          margin-top: 10px;
          p{
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              margin-right: 5px;
            }
          }
          span{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            flex:1;
          }
        }

        span {
          font-size: 14px;
          color: #fff;
        }

        .commentChat {
          position: absolute;
          right: 10px;
          cursor: pointer;
          top: 14px;
        }
      }
    }

    .processBoxOrgin{
      border:1px solid #FFA96A;
      .processTit{
        border-color: #FFA96A;
        background: #FFA96A;
        span{
          color:#fff;
        }
        .processClose{
          color:#fff;
        }
      }
      .proBoxData{
        i{
          color:#FFA96A;
        }
      }
      .processBtn{
        background:#FFA96A;
      }
    }

    .processBoxBlue{
      border:1px solid #05AAFF;
      .processTit{
        border-color: #05AAFF;
        background: #05AAFF;
        span{
          color:#fff;
        }
        .processClose{
          color:#fff;
        }
      }
      .processBtn{
        background:#05AAFF;
      }
    }

    .processBoxRed{
      border:1px solid #ff3643;
      .processTit{
        border-color: #ff3643;
        background: #ff3643;
        span{
          color:#fff;
        }
        .processClose{
          color:#fff;
        }
      }
      .processBtn{
        background:#ff3643;
      }
    }

    .processEnd{
      display: flex;
      justify-content: center;
      img{
        width: 113px;
      }
    }

    .processDown{
      /*margin-bottom: 10px;*/
    }
  }

  /deep/ .el-form-item {
    display: flex;
    margin-right: 75px;
    margin-bottom: 23px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    line-height: normal;
    align-items: center;
    display: flex;
  }

  /deep/ .el-form-item__label {
    font-weight: normal;
    line-height: initial;
    display: flex;
    justify-content: flex-end;
  }

  .fileShow{
    display: flex;
  }

  .stateDesc{
    display: flex;
    width: 100%;
    /deep/ .el-textarea{
      flex:1;
    }
  }

  .commentList{
    margin-bottom: 10px;
    .commentData{
      margin-bottom: 10px;
      p{
        font-size:14px;
        padding: 10px;
        margin-bottom: 5px;
        background: #f9f9f9;
      }
      .commentDit{
        display: flex;
        margin-bottom: 5px;
        span{
          font-size:12px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }

  .commontSubmit {
    display: flex;
    margin-top: 30px;

    /deep/ .el-textarea {
      flex: 1;
    }
  }


  /***************资料收集*****************/
  .liucheng {
    margin-right: 15px;
    font-size:16px;
  }

  .jiba {
    cursor: pointer;

    span.cur {
      color: #00A5FF !important;
    }
  }

  ul li {
    list-style: none;
  }

  .upload-modal {
    /deep/ .el-dialog__header {
      border-bottom: 1px solid #ccc;
    }

    .need-remark {
      /deep/ .el-textarea__inner {
        height: 120px;
      }
    }

    .upload-file {
      /deep/ .el-form-item__label {
        display: none;
      }

      /deep/ .el-form-item__content {
        align-items: normal;
      }
    }
  }

  .donwn-file {
    cursor: pointer;
    color: #03adf4;
  }

  .add-annex-btn {
    cursor: pointer;
    color: #03adf4;
  }


  .down {
    color: #00A5FF;
    cursor: pointer;
  }

  .del {
    color: red;
    cursor: pointer;
    margin-left: 6px;
  }

  .save-data {
    margin-top: 10px;
    text-align: center;

    .save-btn {
      background: #03adf4;
      color: #fff;
      border: 0;

      &:active {
        opacity: 0.5;
      }
    }
  }

  .goLink {
    color: #05AAFF;
    cursor: pointer;
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

  .tips{
    font-size:14px;
    margin-bottom:20px;
    /*color:red;*/
  }





    .chat-modal {
    /deep/ .el-dialog__body {
      padding-top: 0;
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
