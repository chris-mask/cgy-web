<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">基本信息</span>
          </div>
        </div>
        <div class="contractCont">
          <div class="contractLeft">
            <div class="companySubName">企业简称</div>
          </div>
          <div class="contractRig">
            <el-form ref="contractForm" :model="contractForm" :rules="rules">
              <el-row>
                <el-col :span="12">
                  <span class="star" style="top: 0px;left: 28px;">*</span>
                  <el-form-item label="客户名称：">
<!--                    <el-button v-if="!this.$route.query.contractId && allowChooseCompany.twoAllow" icon="el-icon-search"-->
<!--                               size="small"-->
<!--                               @click="openEntList">选择客户-->
<!--                    </el-button>-->
                    <span style="margin-left: 10px">
                      {{contractForm.companyName}}
                      <i style="cursor: pointer" title='选择客户' class="el-icon-search" v-if="!this.$route.query.contractId && allowChooseCompany.twoAllow" @click="openEntList"></i>
                      <img
                        v-if="contractForm.contractId && isCheck && !hideEdit && allowUpdate.twoAllow && contractForm.hasEditContractRole == 1"
                        @click="editOpen" class="editBtn"
                        src="@/views/icons/enterprise/contract_edit.png"/>
                    </span>
                    <!--                    && contractForm.hasWithdrawProcess == 1-->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地区：">
                    <span>{{contractForm.provinceName ? contractForm.provinceName : ''}}</span>
                    <span>{{contractForm.cityName ? '-' + contractForm.cityName : ''}}</span>
                    <span>{{contractForm.districtName ? '-' + contractForm.districtName : ''}}</span>
                    <span>{{contractForm.townName ? '-' + contractForm.townName : ''}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系人：">
                    <el-input maxlength="20" v-model="contractFirst.personnelName" v-if="!isCheck"
                              size="small"></el-input>
                    <span v-else>{{contractFirst.personnelName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系手机：">
                    <el-input maxlength="11" oninput="value=value.replace(/[^0-9]/g,'')"
                              v-model="contractFirst.personnelMobile" v-if="!isCheck" size="small"/>
                    <span v-else>{{contractFirst.personnelMobile}}</span>
                  </el-form-item>
                </el-col>
              </el-row>


<!--              <el-row>-->
<!--                <el-col :span="9">-->
<!--                  <el-form-item label="联系人2：">-->
<!--                    <el-input maxlength="20" v-model="contractSecond.personnelName" v-if="!isCheck" size="small"/>-->
<!--                    <span v-else>{{contractSecond.personnelName}}</span>-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="9">-->
<!--                  <el-form-item label="联系电话2：">-->
<!--                    <el-input maxlength="11" oninput="value=value.replace(/[^0-9]/g,'')"-->
<!--                              v-model="contractSecond.personnelMobile" v-if="!isCheck" size="small"></el-input>-->
<!--                    <span v-else>{{contractSecond.personnelMobile}}</span>-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->

              <el-row>
                <el-col :span="12">
                  <el-form-item label="合同编号：" prop="contractCode">
                    <el-input v-if="!isCheck" size="small" v-model="contractForm.contractCode" readonly></el-input>
                    <span v-else>{{contractForm.contractCode}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="我方签约公司：" prop="signCompanyId">
                    <el-select v-if="!isCheck" v-model="contractForm.signCompanyId" placeholder="请选择" size="small"
                               clearable>
                      <el-option
                        v-for="item in companyList"
                        :key="item.companyId"
                        :label="item.companyName"
                        :value="item.companyId">
                      </el-option>
                    </el-select>
                    <span v-else>{{contractForm.signCompanyName ? contractForm.signCompanyName : '其他'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="是否渠道：">
                    <el-radio-group v-model="contractForm.isProxy" v-if="!isCheck" @change="isProxyChange">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                    <span v-else>{{contractForm.isProxy == '1' ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
<!--                <el-col :span="9" v-if="contractForm.isProxy == 1" style="position: relative">-->
<!--                  <span style="color: #F56C6C;position: absolute;left: 26px;">*</span>-->
<!--                  <el-form-item label="渠道名称：">-->
<!--                    <el-input size="small" clearable v-model.trim="contractForm.proxyCompanyName"-->
<!--                              maxlength="35"-->
<!--                              v-if="!isCheck"></el-input>-->
<!--                    <span v-else>{{contractForm.proxyCompanyName}}</span>-->
<!--                    &lt;!&ndash;                    <el-button v-if="!isCheck" icon="el-icon-search" size="small" @click="openChannelList">选择渠道&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </el-button>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    <span>{{contractForm.proxyCompanyName}}</span>&ndash;&gt;-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="是否委外：">
                    <el-radio-group v-model="contractForm.isOutsource" v-if="!isCheck" @change="isOutsourceChange">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                    <span v-else>{{contractForm.isOutsource == '1' ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12" v-if="contractForm.isOutsource == 1" style="position: relative">
                  <span style="color: #F56C6C;position: absolute;left: 26px;">*</span>
                  <el-form-item label="委外公司：">
                    <el-input size="small" clearable v-model="contractForm.outsourceCompanyName" maxlength="50"
                              v-if="!isCheck"></el-input>
                    <span v-else>{{contractForm.outsourceCompanyName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form-item label="是否新客户：">
                    <el-checkbox v-if="!isCheck" v-model="contractForm.newAndOld" @change="newOrOldChange">新客户</el-checkbox>
                    <span v-else>{{contractForm.newOrOld == '1' ? '是' : '否'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="签订日期：" prop="signDate">
                    <el-date-picker
                      v-if="!isCheck"
                      size="small"
                      v-model="contractForm.signDate"
                      type="date"
                      class="money"
                      value-format="yyyy-MM-dd"
                      placeholder="签订日期">
                    </el-date-picker>
                    <span v-else>{{contractForm.signDate}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="有效期：" prop="availableYear">
                    <el-input @input.native="inputXz($event,2)" oninput="if(value && value>1000)value=1000"
                              maxlength="4" size="small" type="number"
                              v-model="contractForm.availableYear" v-if="!isCheck">
                      <template slot="append">年</template>
                    </el-input>
                    <span v-else>{{contractForm.availableYear ? contractForm.availableYear + '年' : '-'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="合同状态：" prop="contractState">
                    <el-select v-if="!isCheck" v-model="contractForm.contractState" placeholder="请选择" size="small"
                               clearable>
                      <el-option
                        v-for="item in contractStateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <span v-else>
                      {{contractForm.contractState == 0 ? '履行中' :
                        contractForm.contractState == 1 ? '解约' :
                        contractForm.contractState == 2 ? '作废' :
                        contractForm.contractState == 3 ? '终止' :
                        contractForm.contractState == -1 ? '已完成' : ''}}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="签订人：">
<!--
                    <el-input maxlength="20" v-model="contractForm.signUserName" v-if="!isCheck"
                              size="small">22</el-input> -->
                    <span v-if="!contractForm.signUserName" >{{contractForm.signUserName ? contractForm.signUserName : '-'}}</span>
                    <span v-else class="classPointer" @click="handleShowConnectContentListPeople(contractForm,0)" >{{contractForm.signUserName ? contractForm.signUserName : '-'}}</span>
                    <!-- <el-button size="mini" class="filter-item bg_pale_orange left-margin-10" @click="goChange"  v-if="!isCheck" >设置业务员</el-button> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="contractForm.withDrawProcessVoList && contractForm.withDrawProcessVoList != ''">
                <el-col :span="12">
                  <el-form-item label="历史版本：">
                    <span v-for="(item,index) in contractForm.withDrawProcessVoList"
                          style="cursor:pointer;margin-right: 10px;" @click="openVersion(item,index)">
                      版本{{index+1}}
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="file-down-box">
                <el-col :span="20">
                  <el-form-item label="合同扫描件：">
                    <!--                    <el-upload-->
                    <!--                      v-if="!isCheck"-->
                    <!--                      ref="upload"-->
                    <!--                      class="upload-demo"-->
                    <!--                      action="#"-->
                    <!--                      :show-file-list="true"-->
                    <!--                      :auto-upload="false"-->
                    <!--                      :on-remove="handleRemove"-->
                    <!--                      :on-change="fileChange"-->
                    <!--                      :limit="1"-->
                    <!--                      :file-list="fileList"-->
                    <!--                    >-->
                    <!--                      <el-button size='small' type="primary">点击上传</el-button>-->
                    <!--                    </el-upload>-->
                    <el-upload
                      :http-request="importApprovalContract"
                      :before-upload="uploadBeforeFile"
                      v-if="!isCheck && allowUploadFile.twoAllow"
                      class="image-uploader"
                      :show-file-list="true"
                      :file-list="contractFileList"
                      :limit="1"
                      :on-remove="handleRemoveContract"
                      :on-exceed="handleExceed"
                      :on-preview="downFileHandle"
                      action=""
                    >
                      <el-button type="primary" class="btn export" size="small">点击上传</el-button>
                    </el-upload>
                    <p @click="downFileHandle(item)" class="file-down-group" v-else v-for="item in contractFileList"
                       :key="item.fileId">
                      {{item.fileName}} <i class="el-icon-download"></i>
                    </p>
                    <p style="margin-top:10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!--    合同流程图    -->
        <div class="contractProcess"
             v-if="contractForm.contractProcessVoList && contractForm.contractProcessVoList.length != 0"
             style="display:none;">
          <swiper ref="mySwiper" :options="swiperOption">
            <swiper-slide v-for="(item,index) in contractForm.contractProcessVoList" :key="item.nodeId">
              <div class="contractProcessTheBox"
                   :class="item.checkResult == 2 || item.recheckResult == 2 ? 'processRed' : item.flowStatus == 2 ? 'processOrgin' : item.flowStatus == 3 ? 'processBlue' : ''">
                <div class="threeJx"></div>
                <div class="contractProcessBox">
                  <div class="processHeader">
                    <span>{{index + 1}}.{{item.nodeName}}</span>
                    <el-icon class="el-icon-success" v-if="item.flowStatus == 3"></el-icon>
                    <el-icon class="el-icon-error" v-if="item.checkResult == 2"></el-icon>
                    <el-icon class="el-icon-time" v-if="item.flowStatus == 2 && !item.checkResult"></el-icon>
                  </div>
                  <div class="processCont">
                    <div class="processUserName" v-if="item.userName">
                      <span v-if="item.nameHead">{{item.nameHead}}</span>
                      <p>{{item.userName}}</p>
                    </div>
                    <div class="processMsg">
                      <p>
                        <span>时间：</span>{{item.sendTime ? item.sendTime : '-'}}
                      </p>
                      <p v-if="item.fileName && item.accessory == 1">
                        <span>合同文件：</span>{{item.fileName ? item.fileName : '-'}}
                        <i class="el-icon-download" @click="downFileHandle(item,item.fileIds)"
                           style="cursor:pointer;"></i>
                      </p>
                      <p v-if="item.needCheck == 1 && item.checkComment && item.opinion == 1"
                         :title="item.checkComment">
                        <span>意见：</span>{{item.checkComment ? item.checkComment : '-'}}
                      </p>
                      <!--                      <p v-if="item.needRecheck != 0 && item.recheckComment && item.opinion == 1">-->
                      <!--                        <span>复审意见：</span>{{item.recheckComment ? item.recheckComment : '-'}}-->
                      <!--                      </p>-->
                    </div>
                    <div class="processBtn">
                      <el-button size="small" @click="reviewBtn(item,index,1)"
                                 v-if="item.isOneself == 1 && item.needCheck == 1 && !item.checkResult && item.flowStatus == 2 && !item.sendTime && contractForm.hasProcessContractFisrtReview == 1">
                        初审
                      </el-button>
                      <!--                      <el-button size="small" @click="reviewBtn(item,index,2)" v-if="item.needRecheck != 0 && item.checkResult && item.checkResult != 0 && !item.recheckResult">复审</el-button>-->
                      <el-button size="small" @click="reviewBtn(item,index,3)"
                                 v-if="index != 0 && !item.sendTime && item.flowStatus == 2 && item.isOneself == 1 && item.checkResult == 2">
                        退回
                      </el-button>
                      <el-button size="small" @click="completeBtn(item,index,2)"
                                 v-if="contractForm.hasProcessComplete == 1 && item.needCheck == 0 && item.flowStatus == 2 && item.isOneself == 1 && item.accessory != 1">
                        完成
                      </el-button>
                      <el-button size="small" @click="reviewBtn(item,index,5)"
                                 v-if="item.isOneself == 1 && item.signTime && item.sendTime && index != 0 && contractForm.contractProcessVoList[index+1] && contractForm.contractProcessVoList[index+1].flowStatus == 1">
                        取回
                      </el-button>
                      <el-button size="small" @click="withdrawOpen(4)"
                                 v-if="contractForm.hasWithdrawProcess == 1 && withdrawFlow != '' && hideEdit && index == 0 && item.signTime && item.sendTime">
                        撤回流程
                      </el-button>
                      <el-button size="small" @click="reviewBtn(item)"
                                 v-if="item.accessory == 1 && !item.sendTime && item.flowStatus == 2 && item.isOneself == 1">
                        上传合同
                      </el-button>
                      <el-button size="small" @click="completeBtn(item,index,2)"
                                 v-if="item.needCheck == 0 && !item.needRecheck && item.flowStatus == 2 && item.accessory == 1 && item.fileIds && item.fileIds != '' && item.isOneself == 1 && contractForm.hasProcessComplete == 1">
                        完成
                      </el-button>
                    </div>
                    <img v-if="item.signTime && item.sendTime" src="@/views/icons/enterprise/contractPass.png"/>
                    <img v-if="item.checkResult == 2 || item.recheckResult == 2"
                         src="@/views/icons/enterprise/contractEnd.png"/>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" @click="prveSwiper">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class="swiper-button-next" @click="nextSwiper">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>

      </el-card>
      <el-card class="box-card boxProject">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">项目信息</span>
          </div>
          <div class="headerRig">
            <el-button type="primary" size="small" @click="openProjectDio" v-if="!isCheck">+新增</el-button>
          </div>
        </div>

        <div class="contractProject" v-for="(item,index) in select_projects">
          <div class="proNum">{{index+1}}</div>
          <div class="projectBox">
            <div class="projectBoxFirst">
              <el-row>
                <el-col :span="8">
                  <div class="address-level bottom-margin-10" style="min-width: 10%;">
                    <div class="star">*</div>
                    <div class="address-level-title">项目名称：</div>
                    <el-select remote :remote-method="projectListMethod" @change="projectOrderChange(item)"
                               v-if="!isCheck && !item.orderId"
                               size="small" style="width: 350px;flex:1;" filterable
                               v-loadMore="loadMores" :loading="loading"
                               class="inline-block float-left" clearable v-model="item.projectId"
                               placeholder="项目名称">
                      <el-option v-for="item in project_list" :key="item.projectId" :label="item.projectName"
                                 :value="item.projectId"></el-option>
                    </el-select>
                    <span v-else>{{item.projectName}}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="projectData bottom-margin-10">
                    <span style="color:#ff3e41">*</span>
                    申报年份：
                    <el-date-picker
                      v-if="!isCheck"
                      size="small"
                      type="year"
                      class="money"
                      value-format="yyyy"
                      placeholder="申报年份"
                      v-model="item.applyYear"
                    >
                    </el-date-picker>
                    <span v-else>{{item.applyYear}}</span>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="projectData bottom-margin-10">
                    <span style="color:#ff3e41">*</span>
                    数量：
                    <el-input type="number" :maxlength="5"
                              @blur="totalMoneyBlur($event,item)"
                              class="number-input" v-model="item.applyNum"
                              oninput="value=value.replace(/[^0-9.]/g,'');"
                              v-if="!isCheck" @input.native="inputXz($event,1,item)"></el-input>
                    <span v-else>{{item.applyNum}}</span>
                  </div>
                </el-col>
                <el-col :span="5" v-if="item.projectId">
                  <div class="address-level bottom-margin-10">
                    <div class="star">*</div>
                    <div class="address-level-title">批次：</div>
                    <el-select size="small" v-if="!isCheck" v-model="item.applyBatchNo" style="width:65%;">
                      <el-option v-for="batchNo in item.maxBatchList" :key="item.value" :label="batchNo.label" :value="batchNo.value"></el-option>
                    </el-select>
                    <span v-else>
                      <span v-if="item.applyBatchNo == 0">未指定</span>
                    <span v-else-if="item.applyBatchNo > 0">第{{item.applyBatchNo}}批</span>
                    <span v-else>-</span>
                    </span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" v-if="item.projectType != 822466810090618880">
                  <div class="address-level bottom-margin-10">
                    <div class="star">*</div>
                    <div class="address-level-title">级别：</div>
                    <el-select size="small" v-if="!isCheck" v-model="item.areaLevel" style="width:65%;">
                      <el-option label="国家级" :value="1"></el-option>
                      <el-option label="省级" :value="2"></el-option>
                      <el-option label="市级" :value="3"></el-option>
                      <el-option label="区县级" :value="4"></el-option>
                      <el-option label="镇街级" :value="5"></el-option>
                    </el-select>
                    <span v-else>
                      {{
                        item.applyLevel == 1 ? '国家级' :
                        item.applyLevel == 2 ? '省级' :
                        item.applyLevel == 3 ? '市级' :
                        item.applyLevel == 4 ? '区县级' :
                        item.applyLevel == 5 ? '镇街级' : ''
                      }}
                    </span>
                  </div>
                </el-col>

                <span v-if="item.projectType == 822466810090618880">
                  <el-col :span="4">
                    <div class="address-level bottom-margin-10">
                    <div class="star">*</div>
                    <div class="address-level-title">职称系列：</div>
                    <el-select size="small" v-if="!isCheck" v-model="item.titleSeries" style="width:65%;" @change="getTitleLevel(item, 1)">
                      <el-option v-for="series in titleSeriesList" :label="series.dictName" :value="series.dictId" :key="series.dictId"></el-option>
                    </el-select>
                    <span v-else>{{item.titleSeriesName}}</span>
                  </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="address-level bottom-margin-10">
                      <div class="star">*</div>
                      <div class="address-level-title">职称级别：</div>
                      <el-select size="small" v-if="!isCheck" v-model="item.titleLevel" style="width:65%;">
                        <el-option v-for="level in item.titleLevelList" :label="level.dictName" :value="level.dictId" :key="level.dictId"></el-option>
                      </el-select>
                      <span v-else>{{item.titleLevelName}}</span>
                    </div>
                  </el-col>
                </span>

                <el-col :span="10" style="display: flex;">
                  <div class="projectData bottom-margin-10">
                    <span style="color:#ff3e41">*</span>
                    服务费单价：
                    <el-radio-group v-model="item.typeMoney" class="radio-type" :disabled="isCheck"
                                    @change="radioHandle($event, item)">
                      <el-radio :label="1">金额</el-radio>
                      <el-radio :label="0">比例</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="projectData bottom-margin-10">
<!--                    <span style="color:#ff3e41">*</span>-->
<!--                    {{item.typeMoney == 1?'单价：':'比例：'}}-->
                    <el-input type="number"
                              v-model="item.unitPrice"
                              size="small"
                              v-if="!isCheck && item.typeMoney == 1"
                              ref="unitPrice"
                              @blur="totalMoneyBlur($event,item)"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEventMoney($event,item,1)'
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <el-input type="number"
                              v-model="item.unitPrice"
                              size="small"
                              v-if="!isCheck && item.typeMoney == 0"
                              ref="unitPrice"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEvent($event,item, 1)'
                    >

                      <template slot="append">%</template>
                    </el-input>

                    <span v-if="isCheck && item.unitPrice">{{item.typeMoney == '1' ? item.unitPrice + '元' : item.unitPrice + '%'}}</span>
                    <!--              <span v-else>-</span>-->
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="projectData bottom-margin-10" v-if="!isCheck || item.auditPrice">
                    <div class="address-level-title">审计费用：</div>
                    <el-input type="number"
                              v-model="item.auditPrice"
                              size="small"
                              v-if="!isCheck"
                              ref="auditPrice"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEventMoney($event,item,3)'
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <span v-if="isCheck && item.auditPrice">{{item.auditPrice + '元'}}</span>
                  </div>
                </el-col>
                <el-col :span="5" v-if="contractForm.isOutsource == 1">
                  <div class="projectData bottom-margin-10" v-if="contractForm.isOutsource == 1">
                    <span style="color:#ff3e41">*</span>
                    <div class="address-level-title">委外费用：</div>
                    <el-input type="number"
                              v-model="item.outsourcePrice"
                              size="small"
                              v-if="!isCheck"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEventMoney($event,item,4)'
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <!--                <span v-if="isCheck && item.outsourcePrice">{{item.typeMoney == '1' ? item.outsourcePrice + '元' : item.outsourcePrice + '%'}}</span>-->
                    <span v-if="isCheck && item.outsourcePrice">{{item.outsourcePrice + '元'}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11" style="display: flex;">
                  <div class="projectData bottom-margin-10">
                    <span style="color:#ff3e41">*</span>
                    <div class="address-level-title">业务员提成：</div>
                    <el-radio-group v-model="item.commType" class="radio-type" :disabled="isCheck">
                      <el-radio :label="1">金额</el-radio>
                      <el-radio :label="0">比例</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="projectData bottom-margin-10">
                    <el-input type="number"
                              v-model="item.commission"
                              size="small"
                              v-if="!isCheck && item.commType == 1"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEventMoney($event,item,6)'
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <el-input type="number"
                              v-model="item.commission"
                              size="small"
                              v-if="!isCheck && item.commType == 0"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEvent($event,item,3)'
                    >
                      <template slot="append">%</template>
                    </el-input>
                    <span v-if="isCheck && item.commission">{{item.commType == '1' ? item.commission + '元' : item.commission + '%'}}</span>
                  </div>
                </el-col>
                <el-col :span="13" v-if="contractForm.isProxy == 1">
                  <div class="projectData bottom-margin-10" v-if="contractForm.isProxy == 1">
                    <span style="color:#ff3e41">*</span>
                    <div class="address-level-title">业务费用：</div>
                    <el-radio-group v-model="item.radioType" class="radio-type" :disabled="isCheck">
                      <el-radio :label="3">金额</el-radio>
                      <el-radio :label="1">服务费比例<tip :name="'业务费用单价比例'" :pageUrl="'/contract/addContract'"/></el-radio>
                      <el-radio :label="2">实际拨付比例<tip :name="'业务费用补助比例'" :pageUrl="'/contract/addContract'"/></el-radio>
                    </el-radio-group>
                    <el-input type="number"
                              v-model="item.proxyPrice"
                              size="small"
                              v-if="!isCheck && item.radioType > '2'"
                              ref="proxyPrice"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEventMoney($event,item,2)'
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <el-input type="number"
                              v-model="item.proxyPrice"
                              size="small"
                              v-if="!isCheck && item.radioType <= '2'"
                              ref="proxyPrice"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEvent($event,item,2)'
                    >
                      <template slot="append">%</template>
                    </el-input>
                    <span v-if="isCheck && item.proxyPrice">{{item.radioType == '3' ? item.proxyPrice + '元' : item.proxyPrice + '%'}}</span>
                    <!--                <span v-if="isCheck && item.proxyPrice">{{item.proxyPrice + '元'}}</span>-->
                  </div>
                </el-col>
              </el-row>
              <el-row v-if="item.projectType == 822466810090618880">
                <el-col :span="6">
                  <div class="projectData bottom-margin-10">
                    <div class="address-level-title">职称专业：</div>
                    <el-input v-if="!isCheck" size="small" v-model="item.titleMajor" placeholder="请输入职称专业" style="width:65%;" ></el-input>
                    <span v-else>{{item.titleMajor}}</span>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="projectData right-margin-30 bottom-margin-10" style="min-width: 10%;">
                    <div class="address-level-title" style="margin-left: 6px;">职称区域(<span style="color:#ff3e41">省份必填</span>)：</div>
                    <el-select size="small" @change='provinceChange(item, 1)' class="address-input" clearable
                               v-model="item.provinceId" v-if="!isCheck"
                               placeholder="省份">
                      <el-option v-for="item in item.province_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                    <span v-else>{{item.provinceName}}</span>
                    <el-select size="small" @change='cityChange(item, 1)' class="address-input" clearable
                               v-model="item.cityId" v-if="!isCheck"
                               placeholder="城市">
                      <el-option v-for="item in item.city_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                    <span v-else>{{item.cityName}}</span>
                    <el-select size="small" @change='districtChange(item, 1)' class="address-input" clearable
                               v-model="item.districtId" v-if="!isCheck"
                               placeholder="县区">
                      <el-option v-for="item in item.district_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                    <span v-else>{{item.districtName}}</span>
                    <el-select size="small" class="address-input" clearable v-model="item.townId" placeholder="镇街"
                               v-if="!isCheck">
                      <el-option v-for="item in item.town_list" :key="item.dictId" :label="item.dictName"
                                 :value="item.dictId"></el-option>
                    </el-select>
                    <span v-else>{{item.townName}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="projectBoxSecond">
              <div class="projectPay">
                <p><span style="color:#ff3e41">*</span>收款阶段</p>
                <el-button v-if="!isCheck" @click="openAddPay(item,index)" size="mini" type="primary">+新增收款阶段</el-button>
              </div>
              <div class="projectPayList">
                <div class="projectPayBox" v-for="(list,i) in item.orderPaymentAgreementDtoList">
                  <p>
                    <span>{{i+1 + '、'}}收款阶段：</span>
                    <el-select size="mini" placeholder="收款阶段" clearable v-model="list.paymentMode" v-if="!isCheck">
                      <el-option
                        v-for="item in payMethods"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <span v-if="isCheck">
                    {{
                      list.paymentMode == 0 ? '签约后收' :
                      list.paymentMode == 1 ? '受理后收' :
                      list.paymentMode == 2 ? '完成（提交）后收' :
                      list.paymentMode == 3 ? '立项公示后收' :
                      list.paymentMode == 4 ? '拨付后收' :
                      list.paymentMode == 5 ? '验收后收' :
                      list.paymentMode == 6 ? '收到通知书后收' : '-'
                    }}
                    </span>
                  </p>
                  <p>
                    <span>限时：</span>
                    <el-input size="mini" type="number" maxlength="5" oninput="value=value.replace(/[^0-9.]/g,'');if(value && value>9999)value=9999" v-if="!isCheck"
                              v-model="list.paymentDays">
                    </el-input>
                    <span v-else>{{list.paymentDays}}</span>
                    <span>工作日内</span>
                  </p>
                  <p>
                    <el-radio-group v-model="item.typeMoney" class="radio-type" :disabled="isCheck"
                                    @change="payMoneyHandle(item)">
                      <el-radio :label="1">金额<tip :name="'收款金额'" :pageUrl="'/contract/addContract'"/></el-radio>
                      <el-radio :label="0">比例<tip :name="'收款比例'" :pageUrl="'/contract/addContract'"/></el-radio>
                    </el-radio-group>
                  </p>
                  <div style="margin-right:20px;">
                    <el-input type="number"
                              v-model="list.paymentPrice"
                              size="mini"
                              v-if="!isCheck && item.typeMoney == 1"
                              ref="paymentPrice"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEventMoney($event,list,5)'
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <el-input type="number"
                              v-model="list.paymentPrice"
                              size="mini"
                              v-if="!isCheck && item.typeMoney == 0"
                              ref="paymentPrice"
                              oninput="value=value.replace(/[^0-9.]/g,'')"
                              @keyup.native='keyupEventMoney($event,list,5)'
                    >
                      <template slot="append">%</template>
                    </el-input>
                    <p v-if="isCheck && list.paymentPrice">{{item.typeMoney == '1' ? list.paymentPrice + '元' : list.paymentPrice + '%'}}</p>
                  </div>
                  <span v-if="!isCheck && !hideEdit">
                    <i class="el-icon-delete" style="color: #ff4148;cursor: pointer"
                       @click="deletePay(item,index,list,i)"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="projectData">
            <el-button v-if="!isCheck && !hideEdit" size="mini" type="danger" @click="deleteProject(item,index)">移除
            </el-button>
            <p class="moreBat" v-if="item.regionBatch && item.regionBatch.length > 1 && !isCheck"
               @click="addCurProject(item,index)">+</p>
          </div>
        </div>
      </el-card>

      <div class="btnList">
        <el-button size='small' type="primary" @click="checkSubmit"
                   v-if="!contractForm.contractId && !isCheck && allowAdd.twoAllow">确定
        </el-button>
        <el-button size='small' type="primary" @click="checkSubmit"
                   v-if="contractForm.contractId && !isCheck && !hideEdit && allowUpdate.twoAllow">修改
        </el-button>
        <el-button size='small' @click="cancelSub">取消</el-button>
      </div>
    </div>

    <!-- 选择签订合同的公司 -->
    <el-dialog title="选择客户" :visible.sync="orderEntVisiable" width="60%" class="orderEntTable"  :modal-append-to-body="false"  v-dialogDrag>
      <div>
        <el-input clearable v-model="orderEntListQuery.companyName" style="width: 300px;" placeholder="企业名称"
                  @keyup.enter.native="getSignedCompany">
          <el-button slot="append" icon="el-icon-search" @click="getSignedCompany"></el-button>
        </el-input>
      </div>
      <el-table ref="companyTable" class="company-table" :data="orderEntList" border
                style="width: 100%; margin-top: 20px"  @row-click="selectCompanyHandletable">
        <el-table-column align="center" label="" width="50">
          <template slot-scope="scope">
            <el-radio v-model="newContractForm.companyId" :label="scope.row.crmCompanyId">
            <!-- {{scope.row.crmCompanyId}} -->
             <!-- @change="selectCompanyHandle(scope.row)" -->
            </el-radio>
          </template>
        </el-table-column>

        <el-table-column label="企业名称" align="left">
          <template slot-scope="scope">
            <block v-show="false">{{newContractForm.companyId}} companyId<br/>
            {{scope.row.crmCompanyId}} crmCompanyId<br/></block>
            <span >{{scope.row.companyName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="跟踪业务员" align="left">
          <template slot-scope="scope"   >
            <span>{{scope.row.companyBusinessUserName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="企业所在区域" align="left">
          <template slot-scope="scope"  >
            <span>{{scope.row.provinceName}}</span>
            <span>{{scope.row.cityName}}</span>
            <span>{{scope.row.districtName}}</span>
            <span>{{scope.row.townName}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="tableMore" @click="tableGetMore" v-if="total - orderEntList.length > 0">点击加载更多</div>
      <p style="padding:10px 0;">共{{total}}条</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOrderEnt">取消</el-button>
        <el-button type="primary" @click="changeOrderEnt">确定</el-button>
      </div>
    </el-dialog>

    <!--选择渠道公司-->
    <el-dialog title="选择渠道" :visible.sync="channelVisiable" width="60%" class="channelTable" v-dialogDrag>
      <div>
        <el-input v-model="channelForm.companyName" @keyup.enter.native="getChannelList" style="width: 300px;"
                  placeholder="渠道名称">
          <el-button slot="append" icon="el-icon-search" @click="getChannelList"></el-button>
        </el-input>
      </div>
      <el-table ref="channelTable" :data="channelList" border
                style="width: 100%; margin-top: 20px">
        <el-table-column align="center" label="" width="50">
          <template slot-scope="scope">
            <el-radio v-model="contractForm.proxyCompanyId"
                      :label="scope.row.companyId"
                      @change="getChannelIndex(scope.row)"
            >
              &nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="渠道名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.companyName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="跟踪业务员" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.followUserName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道所在区域" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.province ? scope.row.province : ''}}</span>
            <span>{{scope.row.city ? scope.row.city : ''}}</span>
            <span>{{scope.row.district ? scope.row.district : ''}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="tableMore" @click="getChannelMore"
           v-if="channelTotal - channelList.length > 0">
        点击加载更多
      </div>
      <div v-else class="tableMore">
        没有更多了
      </div>
      <p style="padding:10px 0;">共{{channelTotal}}条</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="channelVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeChannel">确定</el-button>
      </div>
    </el-dialog>

    <!--选择补贴项目-->
    <el-dialog title="选择补贴项目" class="project-modal"
               :visible.sync="project_table_visible" width="60%"
               :before-close="handleCloseProject"
               destroy-on-close="true"
               v-dialogDrag
    >
      <!-- 搜索框 -->
      <div>
        <div class="projectChoose">
          <span>项目筛选：</span>
          <el-select size="mini" clearable multiple v-model="project_list_query.projectTypes" placeholder="项目类型"
                     class="inline-block right-margin-10" @change="typeChange">
            <el-option v-for="item in type_list" :key="item.dictId" :value="item.dictId"
                       :label="item.dictName"></el-option>
          </el-select>
          <el-select remote :remote-method="companyRemoteMethod"
                     v-loadMore="loadMore"
                     :loading="loading" size="mini" clearable filterable
                     v-model="project_list_query.projectName" placeholder="项目"
                     class="inline-block right-margin-10"
                     @focus="getProjectListForType"
                     @change="projectChange"
                     @clear="clearProjectList"
          >
            <el-option v-for="item in projectDataList" :key="item" :value="item" :label="item"></el-option>
          </el-select>
        </div>
      </div>

      <!--搜索到的总条数-->
      <div class="search-num">
        搜索到<span class="num">{{project_list_total}}</span>条记录
      </div>

      <!-- 表格 -->
      <!--      @selection-change="handleSelectionChange"-->
      <el-table ref="dataTable"
                class="project-table"
                :data="project_list" border
                :reserve-selection="true"
                :row-key="getRowKeys"
                @select="onTableSelect"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.projectName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目分类" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.projectTypeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.orderType == 0 ? '项目型' : scope.row.orderType == 1 ? '知识产权型' : scope.row.orderType == 2 ? '财务型' : '-' }}</span>
          </template>
        </el-table-column>
      </el-table>

      <template v-if="project_list.length !== 0">
        <div class="get-more" v-if="project_list.length >= project_list_total">没有更多</div>
        <div class="get-more" v-else @click="getMoreProjectList"><span>加载更多</span></div>
      </template>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
         <el-button class="sub-btn" @click="setProjectList">确定</el-button>
         <el-button @click="cloneProjectModal">取消</el-button>
      </span>
    </el-dialog>

    <!--知识产权项目-->
    <el-dialog title="知识产权项目" :visible.sync="dialogFormVisible" :close-on-press-escape="false"
               :close-on-click-modal="false" v-dialogDrag>

      <el-form :model="iprOrderForm" :rules="rules" ref="iprOrderForm">
        <el-divider content-position="center">知识产权订单信息</el-divider>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单类别" :label-width="formLabelWidth" style="width: 100%" prop="new_order_type">
              <el-cascader :options="ipr_type_list" v-model="iprOrderForm.new_order_type" clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请方式" :label-width="formLabelWidth" style="width: 100%" prop="apply_type">
              <el-select v-model="iprOrderForm.apply_type" filterable placeholder="请选择">
                <el-option label="委外" :value="0" :key="0"></el-option>
                <el-option label="内部撰写" :value="1" :key="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="收款阶段" :label-width="formLabelWidth" prop="payment_type">
              <el-select v-model="iprOrderForm.payment_type" filterable placeholder="请选择" @change='changePayment'>
                <el-option label="签协议后一次性支付" :value="0" :key="0"></el-option>
                <el-option label="先预付，收到证书/受理通知书后付余款" :value="1" :key="1"></el-option>
                <el-option label="收到证书/受理通知书后一次性支付" :value="2" :key="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="margin-left:122px;margin-bottom:10px">
            <div v-if="iprOrderForm.payment_type === 0">
              <span>签协议后</span>
              <el-input v-model="iprOrderForm.payment_all_date" style="width:60px;margin:0 10px"></el-input>
              <span>天内一次性支付</span>
            </div>
            <div v-if="iprOrderForm.payment_type === 1">
              <div style="float:left">
                <span>签协议后</span>
                <el-input v-model="iprOrderForm.payment_pre_date" style="width:60px;margin:0 10px"/>
                <span>天内预付</span>
                <el-input v-model="iprOrderForm.payment_pre_ratio" style="width:60px;margin:0 10px"/>
                <span>%，收到</span>
              </div>
              <el-select v-model="iprOrderForm.payment_all_item" placeholder="请选择"
                         style="width:130px;float:left;margin:0 10px">
                <el-option v-for="item in payment_type_options" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
              后
              <el-input v-model="iprOrderForm.payment_all_date" style="width:60px;margin:0 10px"/>
              <span>内付余款</span>
            </div>
            <div v-if="iprOrderForm.payment_type === 2">
              <el-select v-model="iprOrderForm.payment_all_item" placeholder="请选择"
                         style="width:130px;float:left;margin:0 10px">
                <el-option v-for="item in payment_type_options" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <span>收到后</span>
              <el-input v-model="iprOrderForm.payment_all_date" style="width:60px;margin:0 10px"/>
              <span>天内一次性支付</span>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="费用备注" :label-width="formLabelWidth">
          <el-input type="textarea" maxlength="100" :rows="3" show-word-limit v-model="iprOrderForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveIprOrder('iprOrderForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--  初审复审  -->
    <el-dialog
      :title="reviewForm.num == 1 ? '初审' : reviewForm.num == 3 ? '退回' : reviewForm.num == 4 ? '撤回' : reviewForm.num == 5 ? '取回' : reviewForm.num == 2 ? '完成' : '上传合同扫描件'"
      :visible.sync="processialogVisible"
      width="30%"
      center>
      <div>
        <el-form ref="reviewForm" :model="reviewForm">
          <span class="star" style="left: 0;margin-left: 15px;"
                v-if="(reviewForm.checkResult != 2 || !reviewForm.checkResult) && reviewForm.nextHandlerType && reviewForm.nextHandlerType != 0 && reviewForm.nextHandlerType != 2 && reviewForm.nextHandlerType != 5 && (!reviewForm.num || reviewForm.num <= 3)  && !reviewForm.nextHandlerUserId">*</span>
          <el-form-item
            v-if="(reviewForm.checkResult != 2 || !reviewForm.checkResult) && reviewForm.nextHandlerType && reviewForm.nextHandlerType != 0 && reviewForm.nextHandlerType != 2 && reviewForm.nextHandlerType != 5 && (!reviewForm.num || reviewForm.num < 3) && !reviewForm.nextHandlerUserId"
            label="指定用户：">
            <el-select v-if="reviewForm.nextHandlerType == 1 && reviewForm.signTime" v-model="reviewForm.nextNodeUserId"
                       filterable placeholder="请选择" size="small" clearable>
              <el-option
                v-for="item in userList"
                :key="item.userId"
                :label="item.userName + '_' + item.roleName"
                :value="item.userId">
              </el-option>
            </el-select>
            <el-select v-if="reviewForm.nextHandlerType == 3 && reviewForm.signTime" v-model="reviewForm.nextNodeUserId"
                       filterable placeholder="请选择" size="small" clearable>
              <el-option
                v-for="item in deptUserList"
                :key="item.userId"
                :label="item.userName + '_' + item.roleName"
                :value="item.userId">
              </el-option>
            </el-select>
            <el-select v-if="reviewForm.nextHandlerType == 4 && reviewForm.signTime" v-model="reviewForm.nextNodeUserId"
                       filterable placeholder="请选择" size="small" clearable>
              <el-option
                v-for="item in roleUserList"
                :key="item.userId"
                :label="item.userName + '_' + item.roleName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.needCheck == 1 && reviewForm.num == 1">*</span>
          <el-form-item label="结果：" v-if="reviewForm.needCheck == 1 && reviewForm.num == 1">
            <div v-if="reviewForm.num == 1">
              <el-radio v-model="reviewForm.checkResult" label="1">通过</el-radio>
              <el-radio v-model="reviewForm.checkResult" label="2">不通过</el-radio>
            </div>
            <!--            <div v-else>-->
            <!--              <el-radio v-model="reviewForm.recheckResult" label="1">通过</el-radio>-->
            <!--              <el-radio v-model="reviewForm.recheckResult" label="2">不通过</el-radio>-->
            <!--            </div>-->
          </el-form-item>
          <el-form-item label="意见：" v-if="reviewForm.opinion == 1 && reviewForm.num == 1">
            <el-input type="textarea" :row="3" v-model="reviewForm.checkComment"></el-input>
            <!--            <el-input type="textarea" :row="3" v-model="reviewForm.recheckComment" v-else></el-input>-->
          </el-form-item>
          <span class="star" style="left: 0;margin-left: 15px;"
                v-if="reviewForm.num == 3 || reviewForm.num == 4 || reviewForm.num == 5">*</span>
          <el-form-item label="原因：" v-if="reviewForm.num == 3 || reviewForm.num == 4 || reviewForm.num == 5">
            <el-input type="textarea" :row="3" v-model="reviewForm.notifyComment"></el-input>
            <!--            <el-input type="textarea" :row="3" v-model="reviewForm.recheckComment" v-else></el-input>-->
          </el-form-item>
          <span class="star" style="left: 0;margin-left: 15px;" v-if="reviewForm.num == 3">*</span>
          <el-form-item label="选择流程：" v-if="reviewForm.num == 3">
            <el-radio-group v-model="reviewForm.goToNodeId" @change="goToNodeChange">
              <el-radio v-for="item in flowList" :key="item.processId" :label="item.processId">{{item.nodeName}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <span class="star" style="left: 0;margin-left: 15px;"
                v-if="reviewForm.accessory == 1 && !reviewForm.num">*</span>
          <el-form-item label="合同扫描件：" v-if="reviewForm.accessory == 1 && !reviewForm.num">
            <el-upload
              :http-request="importApprovalContract"
              :before-upload="uploadBeforeFile"
              class="image-uploader"
              :show-file-list="true"
              :file-list="contractFileList"
              :limit="1"
              :on-remove="handleRemoveContract"
              :on-exceed="handleExceed"
              action=""
            >
              <el-button type="primary" class="btn export" size="small">上传</el-button>
            </el-upload>
            <p style="margin-top:10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelCheck">取 消</el-button>
        <el-button size="small" type="primary" @click="checkResultSubmit" v-if="reviewForm.num == 1"
                   :loading="recheckLoading">确 定</el-button>
        <el-button size="small" type="primary" @click="uploadContractSubmit"
                   v-if="reviewForm.accessory == 1 && !reviewForm.num" :loading="recheckLoading">确 定</el-button>
        <!--完成提交-->
        <el-button size="small" type="primary" @click="completeSubmit"
                   v-if="reviewForm.needCheck == 0 && reviewForm.nextHandlerType && reviewForm.nextHandlerType != 0 && reviewForm.nextHandlerType != 2 && reviewForm.nextHandlerType != 5 && reviewForm.num == 2"
                   :loading="recheckLoading">确 定</el-button>
        <!--    退回    -->
        <el-button size="small" type="primary" @click="sendBackBtn" v-if="reviewForm.num == 3"
                   :loading="recheckLoading">确 定</el-button>
        <!--    撤回    -->
        <el-button size="small" type="primary" @click="withdrawBtn" v-if="reviewForm.num == 4"
                   :loading="recheckLoading">确 定</el-button>
        <!--    取回    -->
        <el-button size="small" type="primary" @click="RetrieveBtn" v-if="reviewForm.num == 5"
                   :loading="recheckLoading">确 定</el-button>
        <!--        <el-button type="primary" @click="recheckResultSubmit" v-else :loading="recheckLoading">确 定</el-button>-->
      </span>
    </el-dialog>

    <!--  历史版本  -->
    <el-dialog
      :title="'版本' + Number(versionNum+1)"
      :visible.sync="versionDialogVisible"
      width="32%"
      center>
      <div class="dialogProcess">
        <div class="contractProcess">
          <div class="contractProcessTheBox" v-for="(item,index) in processList"
               :class="item.checkResult == 2 || item.recheckResult == 2 ? 'processRed' : item.flowStatus == 2 ? 'processOrgin' : item.flowStatus == 3 ? 'processBlue' : ''">
            <!--            <div class="threeJx"></div>-->
            <div class="contractProcessBox">
              <div class="processHeader">
                <span>{{index + 1}}.{{item.nodeName}}</span>
                <el-icon class="el-icon-success" v-if="item.flowStatus == 3"></el-icon>
                <el-icon class="el-icon-error" v-if="item.checkResult == 2"></el-icon>
                <el-icon class="el-icon-time" v-if="item.flowStatus == 2"></el-icon>
              </div>
              <div class="processCont">
                <div class="processUserName" v-if="item.userName">
                  <span v-if="item.nameHead">{{item.nameHead}}</span>
                  <p>{{item.userName}}</p>
                </div>
                <div class="processMsg">
                  <p>
                    <span>时间：</span>{{item.sendTime ? item.sendTime : '-'}}
                  </p>
                  <p v-if="item.fileName && item.accessory == 1">
                    <span>合同文件：</span>{{item.fileName ? item.fileName : '-'}}
                    <i class="el-icon-download" @click="downFileHandle(item,item.fileIds)" style="cursor:pointer;"></i>
                  </p>
                  <p v-if="item.needCheck == 1 && item.checkComment && item.opinion == 1" :title="item.checkComment">
                    <span>意见：</span>{{item.checkComment ? item.checkComment : '-'}}
                  </p>
                </div>
                <!--                <img v-if="item.signTime && item.sendTime" src="@/views/icons/enterprise/contractPass.png"/>-->
                <!--                <img v-if="item.checkResult == 2 || item.recheckResult == 2" src="@/views/icons/enterprise/contractEnd.png"/>-->
              </div>
            </div>
          </div>
        </div>

        <div class="versionNextProv">
          <span @click="prevVersion" v-if="showProv && versionNum != 0">上一版本</span>
          <span @click="nextVersion"
                v-if="showNext && versionNum != contractForm.withDrawProcessVoList.length-1">下一版本</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeVersion">取 消</el-button>
      </span>
    </el-dialog>

    <!--  新增收款阶段  -->
    <el-dialog
      title="新增收款阶段"
      :visible.sync="payMethodDialogVisible"
      width="30%"
      center>
      <div>
        <el-form ref="payForm" :model="payForm" :rules="payRules">
          <el-form-item label="收款阶段：" prop="paymentMode">
            <el-select size="small" placeholder="收款阶段" clearable v-model="payForm.paymentMode">
              <el-option
                v-for="item in payMethods"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="限时：" prop="paymentDays">
            <el-input size="small" type="number" maxlength="5" oninput="if(value && value>9999)value=9999"
                      v-model="payForm.paymentDays">
              <template slot="append">工作日内</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelPay">取 消</el-button>
        <el-button size="small" type="primary" @click="submitAddPay('payForm')">确 定</el-button>
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
                         :on-change="newfileChange"
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



    <!-- 关联业务员 -->
    <el-dialog title="设置业务员" :visible.sync="dialogVisible" width="30%" v-dialogDrag>
      <p style="margin-bottom: 10px;">企业名字：{{batchChangeFrom.companyName}}</p>
      <p style="margin-bottom: 10px;">当前业务员：{{batchChangeFrom.traceSalesManName}}</p>
      <el-select clearable style="width: 100%" class="filter-item" filterable
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

    <!-- 提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogPrompt"
      width="30%"
      class="setgoto"
    >
      <span>企业信息还没完善,请马上完善企业信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPrompt = false">取 消</el-button>
        <el-button type="primary" @click="gotoSet">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    deleteOrder,
    getContractNumber,
    queryAllContract,
    queryAllProject,
    queryChannelCompany,
    queryCompany,
    queryPublicCrmCompany,
    saveContract,
    updateContract,
    uploadContractFile,
    contractProcessComplete,
    contractProcessFirstReview,
    contractProcessReview,
    sendBackProcess,
    withdrawProcess,
    queryPersonnelList,
    updateFileIds,
    signProcess,
    retrieveProcess,
    deleteAgreement,
    checkRequiredCompanyInfo,
    checkCompanyAndProjectIsRepetition
  } from '@/api/contractManage'
  import {queryMessageList, deleteChatById, addChat, addChatFile,importCrmCompanyPersonnel,getCrmCompanyPersonnelTemplate} from '@/api/messageCenter'
  import {
    commonDict,
    commonDictGetNameByCaChe,
    commonDictOfRegion,
    getFileListWithFileIds,
    ossFileSystemFileDownload,
    addFileBatch,
    roleIdConvertRoleName,
  } from '@/api/utils'
  import {queryProjectInfo} from '@/api/policy'
  import {queryProjectNameOfProjectType, queryProjectMaxBatch, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import {queryUserComboInfo} from '@/api/customerCenter'

  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {projectContractUpload} from '@/utils/uploadPathMethods'

  import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
  import 'swiper/swiper.less'
  import 'swiper/swiper-bundle.css'

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        titleSeriesList: [],
        // 保存/修改--提交的参数
        contractForm: {
          isProxy: '0',
          isOutsource: '0',
          projectList: [],
          contractCode: '',
          contractId: '',
          orderVoList: [],
          fileIds: '',
          companyId: '',
          contractState: 0,
        },
        signProcessId: '',

        flowList: [],
        hideEdit: false,

        //客户名称--获取企业参数
        orderEntListQuery: {
          page: 0,
          pageSize: 10
        },

        //客户名称--当前选中的客户
        currentOrderEnt: {},

        //客户名称--客户显示的名称
        companyName: "",


        orderEntVisiable: false,
        orderEntList: [],
        channelVisiable: false,
        channelListQuery: {},
        channelList: [],
        channelForm: {
          page: 0,
          pageSize: 10,
        },
        projectVisiable: false,
        projectListQuery: {},
        projectList: [],
        companyList: [],
        page: 0,
        pageSize: 10,
        total: 0,
        contractStateList: [
          {label: '履行中', value: 0},
          {label: '解约', value: 1},
          {label: '作废', value: 2},
          {label: '终止', value: 3},
          {label: '已完成', value: -1},
        ],
        typeMoneyList: [
          {label: '金额', value: '1'},
          {label: '比例', value: '0'},
        ],
        rules: {
          contractCode: [
            {required: true, message: '合同编号不能为空', trigger: 'blur'}
          ],
          signCompanyId: [
            {required: true, message: '请选择我方签约公司', trigger: 'blur'}
          ],
          signDate: [
            {required: true, message: '请选择签订日期', trigger: 'blur'}
          ],
          availableYear: [
            {required: true, message: '有效期不能为空', trigger: 'blur'}
          ],
          contractState: [
            {required: true, message: '请选择合同状态', trigger: 'blur'}
          ],
        },
        level: 3,
        parentId: 0,
        provinceList: [],
        cityList: [],
        districtList: [],
        townList: [],
        holdProjectList: [],
        isCheck: false,
        isOneself: '',
        fileList: [],
        fileIds: [],
        fileTemp: '',

        iprOrderForm: {},
        projectListParams: {
          page: 0,
          pageSize: 10
        },
        yearProject: [],

        // ------------------
        //补贴项目列表
        project_table_visible: false,
        project_list_total: 0,
        project_list_query: {
          page: 0,
          pageSize: 20,
          orderField: 'sales',
          orderType: 'DESC'
        },
        loading: false,
        project_list: [],
        dataProjectForm: {
          page: 0,
          pageSize: 10
        },
        projectDataList: [],
        type_list: [],
        //补贴项目选中的值
        tempProjectsList: [],
        select_projects: [], // 已选项目
        holdList: [], // 暂存

        swiperOption: {
          //设置点击箭头
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },

          slidesPerView: 7,
          // spaceBetween: 10,
          slidesPerGroup: 5,
          loopFillGroupWithBlank: true,

          //自动轮播
          autoplay: {
            delay: 2000,
            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //开启循环模式
          // loop: true
        },
        screenWidth: document.body.clientWidth, // 屏幕尺寸
        myswiper: {},
        reviewForm: {},
        processialogVisible: false,
        recheckLoading: false,
        firstFlow: {},
        lastFlow: {},
        contractFileList: [],
        fileTempContract: '',
        checkFileList: [],

        //联系人列表
        contractFirst: {
          personnelName: "",
          personnelMobile: ""
        },
        contractSecond: {
          personnelName: "",
          personnelMobile: ""
        },

        //地区--省
        province_list: [],
        //地区--市
        city_list: [],
        //地区--区
        district_list: [],
        //地区--镇街
        town_list: [],
        //level从3开始递减至0结束
        levels: 3,
        parentIds: 0,

        userList: [],
        roleUserList: [],
        deptUserList: [],
        versionDialogVisible: false,
        processList: [],
        versionNum: '',
        showProv: false,
        showNext: false,
        withdrawFlow: '',
        payMethodDialogVisible: false,
        payForm: {},
        payRules: {
          paymentMode: [
            {required: true, message: '请选择收款阶段', trigger: 'blur'}
          ],
          paymentDays: [
            {required: true, message: '限时不能为空', trigger: 'blur'}
          ],
        },
        payMethods: [
          {label: '签约后收', value: 0},
          {label: '受理后收', value: 1},
          {label: '完成（提交）后收', value: 2},
          {label: '立项公示后收', value: 3},
          {label: '拨付后收', value: 4},
          {label: '验收后收', value: 5},
          {label: '收到通知书后收', value: 6}
        ],
        holdDeleteProject:[],
        holdDeleteProjectAgreement:[],

        allowChooseCompany: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:COMPANY:LIST'),//选择企业
        allowSignCompany: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:SIGNCOMPANY:LIST'),//签约公司页面查询
        allowChannelCompany: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:CHANNELCOMPANY:LIST'),//渠道商页面查询
        allowGetCompanyNumber: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:GENERATE:NUMBER'),//生成合同编号
        allowGetProjectList: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:PROJECT:QUERYLIST'),//查询项目
        allowAdd: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:INSERT'),//保存合同信息
        allowDeleteOrder: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:ORDER:DELETE'),//删除合同关联订单
        allowUpdate: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:UPDATE'),//修改合同
        allowUploadFile: this.authorityControl('SYSTEM:CONTRACT:MANAGE', 'SYSTEM:CONTRACT:MANAGE:LIST', 'SYSTEM:CONTRACT:CHANNELCOMPANY:UPLOADFILE'),//修改合同



        // 跟进消息
        upload_url: '/core/upload-files-api/',
        uploadData: {save_path: 'enterprise_info/enterprise_chat/'},
        newfileList: [],
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
        dialogPrompt:false,//提示信息

        // 关联业务员
        reviewer_user_list: [],
        dialogVisible: false,
        reviewerForm: {
          companyName: '',
          business_name: '',
          id: '',
          user_id: ''
        },
        batchChangeFrom: {},
        personList:[],


        newContractForm:{
          companyId:""
        },
        newcompanyOrPersonal:1,
        PersonalOrNo:1,

      }
    },
    directives: {
      swiper: directive
    },

    created() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth;
        })()
      }

      if (that.screenWidth <= 1745) {
        this.swiperOption.slidesPerView = 6
        this.swiperOption.slidesPerGroup = 6
      }

      if (that.screenWidth <= 1536) {
        this.swiperOption.slidesPerView = 5
        this.swiperOption.slidesPerGroup = 5
      }

      if (that.screenWidth <= 1400 || that.screenWidth <= 1440 || that.screenWidth <= 1280) {
        this.swiperOption.slidesPerView = 4
        this.swiperOption.slidesPerGroup = 4
      }
      if (that.screenWidth <= 1024 || that.screenWidth <= 1097) {
        this.swiperOption.slidesPerView = 3
        this.swiperOption.slidesPerGroup = 3
      }

    },

    filters: {
      titleSize(val) {
        return val.substring(0, 1);
      },
    },

    mounted() {
      if (!this.$route.query.contractId) {
        this.select_projects = [];
      }

      if(!this.contractForm.signUserName){
        this.contractForm.signUserName = this.$store.getters.username
      }
      this.getTitleSeries()
      this.getRegionData(3, 0);
      this.getCommonData();
      this.currentOrderEnt = {};
      this.getContractList();
    },

    activated() {
      if (this.$route.query.contractId) {
        this.contractForm.contractId = this.$route.query.contractId;
        this.isCheck = this.$route.query.isCheck
        // this.isOneself = this.$route.query.isOneself;

        this.getDetail();
        this.getPersonList('');
        this.getProjectLists()
      } else {
        this.getContractNum();
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
    deactivated() {
      this.project_list_query.projectName = "";
      this.dataProjectForm.projectName = "";
    },
    methods: {
      // 关联业务员
      goChange() {
        this.dialogVisible = true
        this.newgetPersonList('业务员,业务主管')
        this.batchChangeFrom = {};
        this.batchChangeFrom.companyName = this.contractForm.signCompanyName
        this.batchChangeFrom.traceSalesManName = this.contractForm.signUserName
        this.batchChangeFrom.companyIds = this.contractForm.signUserId
        // console.log( this.contractForm,"==contractForm==>")
      },

      //设置业务员
      relReviewer(num) {
        if (this.batchChangeFrom.userId == '' || this.batchChangeFrom.userId == undefined) {
          this.$message.warning('请选择人员！');
          return;
        }

        var a = this.personList.findIndex((value)=>value.userId==this.batchChangeFrom.userId);
        this.contractForm.signUserId = this.batchChangeFrom.userId
        this.contractForm.signUserName = this.personList[a].userName
        this.dialogVisible = false
      },

      //根据角色获取人员列表
      newgetPersonList(name) {
        let formData = new FormData
        formData.append('roleNameList', name)
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            this.personList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //跟进--点击人员按钮 沟通
      handleShowConnectContentListPeople(data, i) {
        //  console.log( "====>")
        this.toUserId = data.signUserId
        this.toUserName = data.signUserName
        this.searchForm.toUserId = this.toUserId
        this.ConnectContentDialogVisible = true
        this.searchForm.companyId = this.$store.getters.companyId
        this.isShowMoreNews = true
        this.getConnectList()
      },

      //跟进--获取沟通列表
      getConnectList() {
        this.searchForm.page = 0;
        this.searchForm.pageSize = 10;

        // console.log(this.searchForm,"==searchForm=");
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
        if (this.chatContent == '') {
          this.$message.warning(`请输入沟通内容`)
          return
        }
        let params
        params = {
          companyId: this.$store.getters.companyId,
          chatContent: this.chatContent,
          // toCompanyId: this.searchForm.companyId,
          toUserId: this.toUserId
        }

        if (this.newfileList[0] !== undefined) {
          params.fileIds = this.newfileList
        }

        addChat(params).then(res => {
          if (res.code === 200) {
            this.chatContent = ''
            this.fileTemp = []
            this.fileIds = ''
            this.getConnectList()
          }
        })
      },

      //跟进--上传文件
      newfileChange(file, fileList) {
        if (file.name.length >= 150) {
          this.$message('文件名称超长，请检查')
          this.fileTemp = JSON.parse(JSON.stringify(this.fileTemp))
          return
        }
        const formData = new FormData()

        formData.append('companyId', this.searchForm.companyId)
        formData.append('files', file.raw)
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }

        addChatFile(formData).then(res => {
          if (res.code === 200) {
            this.newfileList = res.data
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

      //选择
      onTableSelect(rows, row) {
        let selected = rows.length && rows.indexOf(row) !== -1;
        if (selected) {
          this.tempProjectsList.push(row);
        } else {
          this.tempProjectsList.forEach((item, index) => {
            if (item.projectId == row.projectId) {
              this.tempProjectsList.splice(index, 1);
            }
          });
        }
      },

      //上一个轮播
      prveSwiper() {
        this.$refs.mySwiper.$swiper.slidePrev();
      },
      //下一个轮播
      nextSwiper() {
        this.$refs.mySwiper.$swiper.slideNext();
      },

      areaChange() {
        this.project_list_query.page = 0;
        this.project_list_query.pageSize = 10;
        this.getProjectLists()
      },
      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PROJECT_TYPE,DICT:SUBSIDYINDUSTRY_TYPE,DICT:PROJECT_TYPE'
        }
        commonDict(params).then(res => {
          if (res.code == 200) {
            // this.supply_industry_list = this.supply_industry_list.concat(res.data['DICT:SUBSIDYINDUSTRY_TYPE'])
            this.type_list = res.data['DICT:PROJECT_TYPE']
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //保持勾选
      getRowKeys(row) {
        return row.projectId;
      },

      loadMore() {
        this.dataProjectForm.page = this.dataProjectForm.page + 10
        this.getProjectListForType()
      },

      //项目搜索
      companyRemoteMethod(query) {
        this.dataProjectForm.page = 0
        this.dataProjectForm.projectName = query
        if (this.dataProjectForm.typeIdList == undefined) {
          this.dataProjectForm.typeIdList = [];
        }

        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.getProjectListForType(query)
        }, 200)

        this.project_list_query.projectName = query
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 20
        this.getProjectLists()

      },

      //关闭项目弹窗
      handleCloseProject() {
        this.project_table_visible = false
      },

      //获取项目列表
      getProjectLists() {
        if (!this.allowGetProjectList.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取项目列表，请联系管理员添加权限');
          return;
        }

        queryProjectInfo(this.project_list_query).then(res => {
          if (res.code == 200) {
            this.project_list_total = res.data.total;
            if (this.project_list_query.page > 0) {
              this.project_list = this.project_list.concat(res.data.data)
            } else {
              this.project_list = res.data.data;
            }
            // this.checkProjectIsSelect()
          }
        })
      },

      //远程搜索
      projectListMethod(query) {
        this.project_list_query.page = 0
        this.project_list_query.projectName = query
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.getProjectLists(query)
        }, 200)
      },

      loadMores() {
        this.project_list_query.page = this.project_list_query.page + 20
        this.getProjectLists()
      },

      //选择项目
      projectOrderChange(item) {
        if (item.projectId == '' || item.projectId == undefined) {
          this.project_list_query.page = 0
          this.project_list_query.projectName = ''
          this.getProjectLists()
        }
        this.project_list.forEach(list => {
          if (item.projectId == list.projectId) {
            // 获取最大批次数
            this.getMaxBatch(item)
            // 判断是否是申请职称类型，如果是就处理区域问题
            if(list.projectType == 822466810090618880) {
              item.province_list = this.province_list
              item.provinceId = ''
              item.cityId = ''
              item.districtId = ''
              item.townId = ''
            }
            item.flowId = list.flowId
            this.$set(item, 'flowId', list.flowId)
            this.$set(item, 'orderType', list.orderType)
            this.$set(item, 'projectName', list.projectName)
            this.$set(item, 'projectType', list.projectType)
          }
        })
      },

      // 获取最大批次批次
      getMaxBatch(data) {
        queryProjectMaxBatch({projectId: data.projectId}).then(res =>{
          const maxBatchList = [
            {'label': '未指定', 'value': 0},
          ]
          if (res.data > 0) {
            for (var i=1; i< res.data + 1; i++) {
              maxBatchList.push({'label': '第' + i + '批', 'value':i},)
            }
          }
          this.$set(data, 'maxBatchList', maxBatchList)
        })
      },


      //项目列表加载更多
      getMoreProjectList() {
        this.project_list_query.page = this.project_list_query.page + 20;
        queryProjectInfo(this.project_list_query).then(res => {
          this.project_list = this.project_list.concat(res.data.data);

          if (this.select_projects.length !== 0) {
            res.data.data.forEach(item => {
              this.select_projects.forEach(data => {
                if (item.projectId == data.projectId) {
                  setTimeout(() => {
                    this.$refs.dataTable.toggleRowSelection(item);
                  }, 100)
                }
              })
            })
          }
        })
      },

      //清空项目搜索
      clearProjectList() {
        this.dataProjectForm.projectName = '';
      },

      // 检查项目是否已添加
      checkProjectIsSelect() {
        if (this.holdList.length !== 0) {
          this.project_list.forEach(item => {
            this.$refs.dataTable.clearSelection(item);
            this.holdList.forEach(data => {
              if (item.projectId == data.projectId) {
                setTimeout(() => {
                  this.$refs.dataTable.toggleRowSelection(item);
                }, 100)
              }
            })
          })
        }
      },

      //补贴项目-项目筛选
      projectChange(e) {
        if (e == '') {
          this.getProjectListForType();
        }
        this.project_list_query.page = 0;
        this.project_list_query.pageSize = 20;
        this.getProjectLists()
      },

      //补贴项目-选择项目类型
      typeChange(e) {
        this.dataProjectForm.typeIdList = e
        this.getProjectListForType()
        this.getProjectLists()
      },

      //根据项目类型获取项目列表
      getProjectListForType(name) {
        let formData = new FormData;
        if (this.dataProjectForm.typeIdList == undefined) {
          this.dataProjectForm.typeIdList = "";
        }
        if (this.dataProjectForm.projectName == undefined) {
          this.dataProjectForm.projectName = "";
        }
        formData.append('page', this.dataProjectForm.page)
        formData.append('pageSize', this.dataProjectForm.pageSize)
        formData.append('typeIdList', this.dataProjectForm.typeIdList)
        formData.append('projectName', this.dataProjectForm.projectName)
        queryProjectNameOfProjectType(formData).then(res => {
          if (res.code == 200) {
            if (this.dataProjectForm.page > 0) {
              this.projectDataList = this.projectDataList.concat(res.data.data)
            } else {
              if (res.data) {
                this.projectDataList = res.data.data
                this.proTotal = res.data.total
              } else {
                this.projectDataList = []
              }
            }
          }
        })
      },

      // 选择省
      changeProvince(val) {
        this.project_list_query.cityId = ''
        this.project_list_query.districtId = ''
        this.project_list_query.townId = ''
        this.parentId = val
        this.level = 2
        this.getRegionList()
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 20
        this.getProjectLists()
      },
      // 选择市
      changeCity(val) {
        this.project_list_query.districtId = ''
        this.project_list_query.townId = ''
        this.parentId = val
        this.level = 1
        this.getRegionList()
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 20
        this.getProjectLists()
      },
      //选择区
      changeDistrict(val) {
        this.parentId = val
        this.level = 0
        this.getRegionList()
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 20
        this.getProjectLists()
      },
      //选择镇
      getTownsId(val) {
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 20
        this.getProjectLists()
      },

      //关闭补贴弹窗
      cloneProjectModal() {
        this.project_table_visible = false;
        this.$refs.dataTable.clearSelection();
      },

      //打开项目列表弹窗
      openProjectDio() {
        let data = this.currentOrderEnt;

        let projectBox = {
          typeMoney: 1,
          commType:1,
          radioType:1,
          orderPaymentAgreementDtoList:[],
        };

        let payBox = {};
        if(projectBox.typeMoney == 1){
          payBox.typeMoney = 1;
          if(projectBox.unitPrice && projectBox.applyNum){
            payBox.paymentPrice = parseFloat((projectBox.unitPrice * projectBox.applyNum).toPrecision(13))
          }
        }else{
          payBox.typeMoney = 0;
          payBox.paymentPrice = JSON.parse(JSON.stringify(projectBox.unitPrice))
        }

        projectBox.orderPaymentAgreementDtoList.push(payBox)

        this.getRegionData(3, 0);
        // 省
        if (data.provinceId && data.provinceId !== '') {
          projectBox.provinceId = data.provinceId;
          this.getRegionData(2, data.provinceId)
        }
        // 市
        if (data.cityId && data.cityId !== '') {
          projectBox.cityId = data.cityId;
          this.getRegionData(1, data.cityId)
        }
        // 区
        if (data.districtId && data.districtId !== '') {
          projectBox.districtId = data.districtId;
          this.getRegionData(0, data.districtId)
        }
        // 街道
        if (data.townId && data.townId !== '') {
          projectBox.townId = data.townId
        }

        this.select_projects.push(projectBox);
        this.project_list_query.page = 0;
        this.project_list_query.projectName = '';
        this.getProjectLists();
      },

      //确定选择补贴项目
      setProjectList() {
        this.tempProjectsList.forEach(item => {
          this.$set(item, 'typeMoney', 1)
          this.select_projects.push(item);
        });

        if (this.select_projects.length !== 0) {
          this.select_projects = this.select_projects.filter(n => this.tempProjectsList.map(v => v.projectId).includes(n.projectId));
          this.select_projects.forEach(item => {
            if (!item.yearId) {
              this.$set(item, 'yearId', item.projectId)
            }
          })
        }

        if (this.holdList.length != 0) {
          let obj = {};
          this.select_projects = this.select_projects.reduce((cur, next) => {
            obj[next.yearId] ? '' : obj[next.yearId] = true && cur.push(next);
            return cur
          }, []);
        }

        this.select_projects.forEach(item => {
          if (item.yearId == item.projectId) {
            this.$delete(item, 'yearId')
          }
        })

        this.project_table_visible = false;
      },

      //选择地区与批次
      focusRegBat(data) {
        let dataList = [];
        if (!data.regionBatch) {
          data.policyProjectAreaVoList.forEach(msg => {
            msg.areaLevel = msg.areaLevel == 1 ? '国家级' : msg.areaLevel == 2 ? '省级' : msg.areaLevel == 3 ? '市级' : msg.areaLevel == 4 ? '区县级' : msg.areaLevel == 5 ? '镇街级' : ''
            msg.provinceName = msg.provinceName ? '-' + msg.provinceName : ''
            msg.cityName = msg.cityName ? '-' + msg.cityName : ''
            msg.districtName = msg.districtName ? '-' + msg.districtName : ''

            msg.policyProjectYearVoList.forEach(val => {
              val.applyYear = val.applyYear ? '-' + val.applyYear : ''
              val.applyBatchNo = val.applyBatchNo == '0' ? '-未指定' : val.applyBatchNo == '1' ? '-第一批' : val.applyBatchNo == '2' ? '-第二批' : val.applyBatchNo == '3' ? '-第三批' : val.applyBatchNo == '4' ? '-第四批' : val.applyBatchNo == '5' ? '-第五批' : ''
              let str = {
                name: msg.areaLevel + msg.provinceName + msg.cityName + msg.districtName + val.applyYear + val.applyBatchNo,
                areaId: msg.areaId,
                projectId: data.projectId,
                yearId: val.yearId,
                subsidyType: val.subsidyType,
                subsidyTotal: val.subsidyTotal,
                realSubsidyPrice: val.realSubsidyPrice,
                orderId: val.orderId
              };
              dataList.push(str)
            })
          });
          this.$set(data, 'regionBatch', dataList);
        }
      },

      //新增同项目不同地区批次数据
      addCurProject(row, index) {
        if (row.regionBatch.length > 1) {
          let list = JSON.parse(JSON.stringify(row))
          this.select_projects.splice(index, 0, list)
        }
      },

      //选择地区与批次
      regBatChange(e, data, i) {
        this.select_projects.forEach(item => {
          if (data.projectId == item.projectId) {
            item.policyProjectAreaVoList.forEach(list => {
              list.policyProjectYearVoList.forEach(val => {
                if (item.yearId == e) {
                  if (val.yearId == e) {
                    this.$set(item, 'applyYear', val.applyYear.substr(1));
                    this.$set(item, 'subsidyTotal', val.subsidyTotal);
                    this.$set(item, 'areaId', list.areaId);
                    this.$set(item, 'realSubsidyPrice', val.realSubsidyPrice);
                    this.$set(item, 'subsidyType', val.subsidyType);
                    this.$set(item, 'areaLevel', list.areaLevel);
                    this.$set(item, 'applyBatchNo', val.applyBatchNo);
                    this.$set(item, 'typeMoney', 1);
                  }
                }
              })
            })
          }
        });
      },

      //删除项目信息
      delProjectHandle(index) {
        this.select_projects.splice(index, 1);
      },

      //客户名称--点击选择企业
      openEntList() {
        // 随便赋值去缓存
        // this.contractForm.companyId = ''
        // this.$set(this.contractForm, 'companyId', '')
        // console.log('ssa',this.contractForm)

        this.orderEntVisiable = true;
        this.orderEntListQuery = {
          page: 0,
          pageSize: 10
        }

        this.getSignedCompany()
      },

      //客户名称--获取企业列表
      getSignedCompany() {
        // this.contractForm.companyId = '';
        queryPublicCrmCompany(this.orderEntListQuery).then(res => {
          if (res.code == 200) {
            this.orderEntList = JSON.parse(JSON.stringify(res.data.data));
            this.total = res.data.total;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //客户名称--选择客户
      selectCompanyHandle(data) {
        // console.log(data,"selectCompanyHandle")
        //  this.currentOrderEnt = data;

        // console.log( this.$refs.companyTable.toggleRowSelection)
        //  this.$refs.companyTable.toggleRowSelection.currentOrderEnt = data;
      },

      //客户名称--选择客户
      selectCompanyHandletable(row) {
        // this.$set(this.contractForm, 'companyId', row.crmCompanyId)
        this.newContractForm.companyId = row.crmCompanyId
        this.currentOrderEnt = row;
         // 返回::0:企业,1:个人
        this.PersonalOrNo=row.companyOrPersonal

        if (row.companyOrPersonal == 0) {
          //  返回::0:代表不完整,1:代表完成
          this.newcompanyOrPersonal = 0
          checkRequiredCompanyInfo(this.newContractForm).then(res => {
            if (res.code == 200) {
              if (res.data == 0) {
                this.companyOpen()
              }
            } else {
              this.$message.warning(res.message)
            }
          })
        }
      },
      //跳转完善页面
      gotoSet(){
        this.dialogPrompt = false;
        this.orderEntVisiable = false;
        this.$router.push({
          path: '/customer/editCustomer',
          query: {
            id: this.newContractForm.companyId,
            tip: true,
            check:true,
            is_personal:false,
          }
        })

        if(this.contractForm.companyId && this.contractForm.companyId != ''){
          this.newContractForm.companyId = this.contractForm.companyId
        }else{
          this.newContractForm.companyId = '';
        }

        return
      },
      //弹出窗口
      companyOpen() {
        this.dialogPrompt = true
      },

      //客户名称--确认选择客户
      changeOrderEnt() {
        checkRequiredCompanyInfo({ companyId: this.currentOrderEnt.crmCompanyId }).then(res => {
          if (res.code == 200) {
            if (res.data == 0) {
               //  返回::0:企业,1:个人
              //  console.log(this.PersonalOrNo,"====== 555555555555555555  ========>")
              if (this.PersonalOrNo == 0) {
                //  console.log("======222=================>")
                this.companyOpen()
                return
              } else {
                // console.log("======11111=================>")
                this.gotoDo()
              }
            } else {
              this.gotoDo()
            }
          }
        })
      },
     //客户名称--确认选择客户
      gotoDo(){
        let data = this.currentOrderEnt;
        if (this.currentOrderEnt.crmCompanyId == '' || this.currentOrderEnt.crmCompanyId == undefined) {
          this.$message.warning('请选择客户');
          return;
        }
        this.orderEntVisiable = false;
        this.contractForm.companyId = this.currentOrderEnt.crmCompanyId;
        this.contractForm.companyName = this.currentOrderEnt.companyName;
        let params = {
          crmCompanyId: this.currentOrderEnt.crmCompanyId,
          personnelType: '3'
        };
        this.contractFirst = {};
        this.contractSecond = {};

        // 省
        if (this.currentOrderEnt.provinceId && this.currentOrderEnt.provinceId !== '') {
          this.contractForm.provinceId = this.currentOrderEnt.provinceId
          this.contractForm.provinceName = this.currentOrderEnt.provinceName
        }
        // 市
        if (this.currentOrderEnt.cityId && this.currentOrderEnt.cityId !== '') {
          this.contractForm.cityId = this.currentOrderEnt.cityId
          this.contractForm.cityName = this.currentOrderEnt.cityName
        }
        // 区
        if (this.currentOrderEnt.districtId && this.currentOrderEnt.districtId !== '') {
          this.contractForm.districtId = this.currentOrderEnt.districtId
          this.contractForm.districtName = this.currentOrderEnt.districtName
        }
        // 街道
        if (this.currentOrderEnt.townId && this.currentOrderEnt.townId !== '') {
          this.contractForm.townId = this.currentOrderEnt.townId
          this.contractForm.townName = this.currentOrderEnt.townName
        }

        //判断切换客户，项目信息地区覆盖
        if(this.select_projects.length !== 0){
          this.select_projects.forEach(item=>{
            this.getRejectList(3, 0);
            // 省
            if (item.provinceId && item.provinceId !== '') {
              item.provinceId = data.provinceId;
              this.getRejectList(2, data.provinceId)
            }
            // 市
            if (item.cityId && item.cityId !== '') {
              item.cityId = data.cityId;
              this.getRejectList(1, data.cityId)
            }
            // 区
            if (item.districtId && item.districtId !== '') {
              item.districtId = data.districtId;
              this.getRejectList(0, data.districtId)
            }
            // 街道
            if (item.townId && item.townId !== '') {
              item.townId = data.townId
            }
          })
        }

        queryPersonnelList(params).then(res => {
          if (res.code === 200) {
            if (res.data.data.length !== 0) {
              if (res.data.data.length >= 2) {
                this.contractFirst = res.data.data[0];
                this.contractSecond = res.data.data[1];
              } else {
                this.contractFirst = res.data.data[0];
                this.contractSecond = {
                  personnelName: "",
                  personnelMobile: ""
                }
              }
            } else {
              this.contractFirst = {
                personnelName: "",
                personnelMobile: ""
              }
              this.contractSecond = {
                personnelName: "",
                personnelMobile: ""
              }
            }
          }
        })
      },

      //客户名称--企业加载更多
      tableGetMore() {
        this.orderEntListQuery.page = this.orderEntListQuery.page += 10;
        queryPublicCrmCompany(this.orderEntListQuery).then(res => {
          if (res.code == 200) {
            this.orderEntList = this.orderEntList.concat(res.data.data)
            this.total = res.data.total;
          } else {
            this.$message.warning(res.message)
          }
        })
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
      getTitleLevel(data, isChange){
        if (isChange) {
          this.$set(data, 'titleLevel', '');
        }
        queryTitleSeriesOrLevel({parentId: data.titleSeries}).then(res =>{
          if (res.code === 200){
            this.$set(data, 'titleLevelList', res.data);
          }
        })
      },

      //获取合同详情
      getDetail() {
        let params = {
          page: 0,
          pageSize: 10,
          contractId: this.contractForm.contractId
        }
        queryAllContract(params).then(res => {
          if (res.code == 200) {
            if (res.data.data[0].crmContractVoList[0].length != 0) {
              if (res.data.data[0].crmContractVoList[0].orderVoList) {
                res.data.data[0].crmContractVoList[0].orderVoList.forEach(item => {
                  item.applyYear = JSON.stringify(item.year)
                  item.areaLevel = item.applyLevel
                  // item.applyBatchNo = Number(item.applyBatchNo)

                  this.projectListMethod(item.projectName)

                  if (item.unitPrice < 1) {
                    item.typeMoney = 0
                    item.unitPrice = item.unitPrice * 1000 / 10
                  } else {
                    item.typeMoney = 1
                    item.unitPrice = item.unitPrice
                  }

                  if(item.radioType == 3){
                    this.$set(item, 'proxyPrice', item.proxyPrice)
                  }else{
                    this.$set(item, 'proxyPrice', item.proxyPrice * 1000 / 10)
                  }

                  if (item.commission < 1) {
                    item.commType = 0
                    item.commission = item.commission * 1000 / 10
                  } else {
                    item.commType = 1
                    item.commission = item.commission
                  }

                  item.orderPaymentAgreementVoList.forEach(list => {
                    if (list.paymentPrice < 1) {
                      item.typeMoney = 0
                      list.paymentPrice = list.paymentPrice * 1000 / 10
                    } else {
                      item.typeMoney = 1
                      list.paymentPrice = list.paymentPrice
                    }
                  })

                  item.orderPaymentAgreementDtoList = item.orderPaymentAgreementVoList
                })
              }

              if (res.data.data[0].crmContractVoList[0].fileIds && res.data.data[0].crmContractVoList[0].fileIds != '') {
                let fileIds = res.data.data[0].crmContractVoList[0].fileIds.split(',')
                this.getFileDetail(fileIds, res.data.data[0].crmContractVoList[0])
              }

              this.contractForm = res.data.data[0].crmContractVoList[0]
              this.$set(this.contractForm, 'isOutsource', JSON.stringify(res.data.data[0].crmContractVoList[0].isOutsource))

              this.$set(this.contractForm, 'provinceId', res.data.data[0].companyProvinceId)
              this.$set(this.contractForm, 'cityId', res.data.data[0].companyCityId)
              this.$set(this.contractForm, 'districtId', res.data.data[0].companyDistrictId)
              this.$set(this.contractForm, 'townId', res.data.data[0].companyTownId)

              this.$set(this.contractForm, 'provinceName', res.data.data[0].companyProvinceName)
              this.$set(this.contractForm, 'cityName', res.data.data[0].companyCityName)
              this.$set(this.contractForm, 'districtName', res.data.data[0].companyDistrictName)
              this.$set(this.contractForm, 'townName', res.data.data[0].companyTownName)

              if (this.contractForm.contractProcessVoList.length > 0) {
                this.firstFlow = this.contractForm.contractProcessVoList.splice(0, 1)
                this.lastFlow = this.contractForm.contractProcessVoList.splice(this.contractForm.contractProcessVoList.length - 1, 1)

                let notSignProcess = []
                this.contractForm.contractProcessVoList.forEach((item, index) => {
                  if (item.flowStatus == 1) {
                    // this.signProcessId = item.processId;
                    notSignProcess.push(item)
                  }

                  if (item.userName) {
                    item.nameHead = item.userName.substr(0, 1)
                  }

                  if (item.userId == this.$store.getters.userId) {
                    this.$set(item, 'isOneself', 1)
                  } else {
                    this.$set(item, 'isOneself', 0)
                  }

                  if (index == 0) {
                    if (item.nodeName == '创建合同') {
                      if (item.signTime && !item.sendTime) {
                        // this.hideEdit = false
                        // this.isCheck = this.$route.query.isCheck;
                        // this.isCheck = true;
                      } else {
                        // this.hideEdit = true;
                        // this.isCheck = false;
                        // this.isCheck = this.$route.query.isCheck;
                      }
                    }
                  }

                  if (item.fileIds && item.fileIds != '') {
                    item.fileIds = item.fileIds.split(',')
                    this.getFileDetail(item.fileIds, item)
                  }

                  if (item.signTime && item.flowStatus > 1) {
                    let flow = []
                    flow.push(item)
                    this.withdrawFlow = flow[flow.length - 1]
                  }

                  if (item.nodeName == '生成订单') {
                    if (item.signTime && item.sendTime) {
                      this.withdrawFlow = ''
                    }
                  }
                })

                this.signProcessId = notSignProcess[0]
              }

              if (this.contractForm.isProxy) {
                this.contractForm.isProxy = JSON.stringify(res.data.data[0].crmContractVoList[0].isProxy)
              } else {
                this.$set(this.contractForm, 'isProxy', '0')
              }

              if(this.contractForm.newOrOld == 0){
                this.$set(this.contractForm, 'newAndOld', true)
              }else{
                this.$set(this.contractForm, 'newAndOld', false)
              }

              this.select_projects = res.data.data[0].crmContractVoList[0].orderVoList

              this.select_projects.forEach(item => {
                if (item.applyBatchNo) {
                  item.applyBatchNo = Number(item.applyBatchNo)
                } else {
                  this.$set(item, 'applyBatchNo', '');
                }
                // 最大批次
                this.getMaxBatch(item)
                // 判断是否是申请职称类型，如果是就处理区域问题
                if(item.projectType == 822466810090618880) {
                  // 职称级别
                  this.getTitleLevel(item, 0)
                  item.province_list = this.province_list
                  this.provinceChange(item, 0)
                  this.cityChange(item, 0)
                  this.districtChange(item, 0)
                }
              })
              this.tempProjectsList = JSON.parse(JSON.stringify(res.data.data[0].crmContractVoList[0].orderVoList))
              //获取联系人1、联系人2
              let params = {
                crmCompanyId: res.data.data[0].crmContractVoList[0].companyId,
                personnelType: '3'
              }

              queryPersonnelList(params).then(res => {
                if (res.code === 200) {
                  if (res.data.data.length >= 2) {
                    this.contractFirst = res.data.data[0]
                    this.contractSecond = res.data.data[1]
                  } else if (res.data.data.length == 1) {
                    this.contractFirst = res.data.data[0]
                  }
                }
              })
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //获取公司列表
      getContractList() {
        if (!this.allowSignCompany.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取签约公司列表，请联系管理员添加权限');
          return;
        }
        queryCompany({}).then(res => {
          if (res.code == 200) {
            this.companyList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //生成合同编号
      getContractNum() {
        if (!this.allowGetCompanyNumber.twoAllow) {
          this.$message.warning('抱歉，您没有权限生成合同编号，请联系管理员添加权限');
          return;
        }
        getContractNumber({}).then(res => {
          if (res.code == 200) {
            this.contractForm.contractCode = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //确定新增项目
      saveChoiceProject() {
        let syList = [];
        if (this.contractForm.projectList && this.contractForm.projectList.length != 0) {
          this.holdProjectList.forEach(item => {
            if (this.contractForm.projectList) {
              this.contractForm.projectList.forEach((list, index) => {
                if (item.yearId != list.yearId) {
                  syList.push(item)
                }
              })
            }
          })
          this.contractForm.projectList = this.contractForm.projectList.concat(syList);

          let obj = {}
          this.contractForm.projectList = this.contractForm.projectList.reduce((cur, next) => {
            obj[next.yearId] ? '' : obj[next.yearId] = true && cur.push(next)
            return cur
          }, [])
        } else {
          this.contractForm.projectList = this.contractForm.projectList.concat(this.holdProjectList);
        }

        this.holdProjectList = [];
        this.projectVisiable = false;
      },

      //获取项目列表
      getProjectList() {
        this.projectListParams.page = 0;
        queryAllProject(this.projectListParams).then(res => {
          if (res.code == 200) {
            res.data.data.forEach(item => {
              item.check = false;
              commonDictGetNameByCaChe({dictId: item.projectType}).then(response => {

                item.projectTypeName = JSON.parse(JSON.stringify(response.data))
              });

              this.provinceList.forEach(list => {
                if (item.provinceId == list.dictId) {
                  item.provinceName = list.dictName
                }
              })
            });

            setTimeout(() => {
              if (this.projectListParams.page > 0) {
                this.projectList = this.projectList.concat(res.data.data);
              } else {
                this.projectList = res.data.data;
              }

              this.projectListTotal = res.data.total;

            }, 200)

          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //项目列表--加载更多
      getProjectMore() {
        this.projectListParams.page += 10;
        this.getProjectList();
      },

      //项目列表--搜索
      searchProjectList() {
        this.projectListParams.page = 0;
        this.getProjectList();
      },

      //项目列表--添加项目
      addProject(row, index) {
        row.check = true;
        this.$set(row, 'applyYear', JSON.stringify(row.applyYear))
        // row.applyYear = JSON.stringify(row.applyYear);
        this.holdProjectList.push(row)
      },

      //项目列表--取消选择项目
      noChooseProject(row, index) {
        row.check = false;
        this.holdProjectList.splice(index, 1)
      },

      //删除项目
      deleteProject(item, index) {
        //编辑时项目列表不能为空
        if (this.contractForm.contractId) {
          if (this.select_projects.length <= 1) {
            this.$message.warning('无法删除，项目不能为空');
            return;
          } else {
            this.$confirm('是否确定删除项目订单', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (item.orderId) {
                if (!this.allowDeleteOrder.twoAllow) {
                  this.$message.warning('抱歉，您没有权限删除项目订单');
                  return;
                }

                this.holdDeleteProject.push(item.orderId)
                this.$message.success('删除成功！');
                this.select_projects.splice(index, 1);
                this.tempProjectsList = JSON.parse(JSON.stringify(this.select_projects));
                // let formData = new FormData;
                // formData.append('orderId', item.orderId)
                // deleteOrder(formData).then(res => {
                //   if (res.code == 200) {
                //     this.$message.success('删除成功！');
                //     this.select_projects.splice(index, 1);
                //     this.tempProjectsList = JSON.parse(JSON.stringify(this.select_projects));
                //   } else {
                //     this.$message.warning(res.message)
                //   }
                // })
              } else {
                this.select_projects.splice(index, 1);
                this.tempProjectsList = JSON.parse(JSON.stringify(this.select_projects));
              }
            })
          }
        } else {
          this.$confirm('是否确定删除项目订单', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.select_projects.splice(index, 1);
            this.tempProjectsList = JSON.parse(JSON.stringify(this.select_projects));
          })
        }
      },

      //删除项目订单方法
      deleteProjectOrder(orderId){
        let formData = new FormData;
        formData.append('orderId', orderId)
        deleteOrder(formData).then(res => {
          if (res.code == 200) {
            // this.$message.success('删除成功！');
            // this.select_projects.splice(index, 1);
            // this.tempProjectsList = JSON.parse(JSON.stringify(this.select_projects));
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //关闭选择客户弹窗
      cancelOrderEnt() {
        this.orderEntVisiable = false;
        this.page = 0;
        this.pageSize = 10;
        if(this.contractForm.companyId && this.contractForm.companyId != ''){
          this.newContractForm.companyId = this.contractForm.companyId
        }else{
          this.newContractForm = {};
        }
      },

      //打开渠道弹窗
      openChannelList() {
        this.channelVisiable = true;
        this.getChannelList();
      },

      //获取渠道列表
      getChannelList() {
        if (!this.allowChannelCompany.twoAllow) {
          this.$message.warning('抱歉，您没有权限获取渠道商列表，请联系管理员添加权限');
          return;
        }
        queryChannelCompany(this.channelForm).then(res => {
          if (res.code == 200) {
            //省市区地址拼接
            res.data.data.forEach(item => {
              //省
              if (item.provinceId) {
                commonDictGetNameByCaChe({dictId: item.provinceId}).then(province => {
                  if (res.code == 200) {
                    item.province = province.data;
                  }
                });
              }

              //市
              if (item.cityId) {
                commonDictGetNameByCaChe({dictId: item.cityId}).then(city => {
                  if (res.code == 200) {
                    item.city = city.data;
                  }
                });
              }

              //区
              if (item.districtId) {
                commonDictGetNameByCaChe({dictId: item.districtId}).then(district => {
                  if (res.code == 200) {
                    item.district = district.data;
                  }
                });
              }
            });

            setTimeout(() => {
              if (this.channelForm.page > 0) {
                this.channelList = this.channelList.concat(res.data.data)
              } else {
                this.channelList = res.data.data
              }
              this.channelTotal = res.data.total;
            }, 300)

          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //加载更多
      getChannelMore() {
        this.channelForm.page = this.channelForm.page + 10
        this.getChannelList();
      },

      getChannelIndex(data) {
        this.currentChannel = data;
      },

      //确定选择渠道
      changeChannel() {
        this.channelVisiable = false
        this.contractForm.proxyCompanyId = this.currentChannel.companyId
        // this.contractForm.proxyCompanyName = this.currentChannel.companyName
        this.currentChannel = null
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

      //获取地区信息2
      getRejectList(level, parentId) {
        if (level == undefined || level == null) {
          this.level = 3
        }

        if (parentId == undefined || parentId == '') {
          this.level = 3
          this.parentId = 0
        }

        let params = {
          level: level,
          parentId: parentId
        }

        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (this.level == 3) {
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
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //提交按钮
      checkSubmit(){
        if (this.contractForm.companyId == '' || this.contractForm.companyId == undefined) {
          this.$message.warning('请选择客户');
          return;
        }

        if (this.select_projects.length == 0) {
          this.$message.warning('请选择项目');
          return;
        }

        let projectMore = false;
        let projectIdentical = '';

        for (var i = 0; i < this.select_projects.length - 1; i++) {
          for (var j = i + 1; j < this.select_projects.length; j++) {
            if (this.select_projects[i].projectId == this.select_projects[j].projectId) {
              projectMore = true;
              projectIdentical += this.select_projects[i].projectName + ','
            }
          }
        }

        if(projectMore){
          if (projectIdentical.length > 0) {
            projectIdentical = projectIdentical.substr(0, projectIdentical.length - 1);
          }
          this.$confirm("你多次选择了" + projectIdentical + "项目，请你确认是否重复录入。", '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let key = ''
            let projectName = ''
            //去重
            let arrList = JSON.parse(JSON.stringify(this.select_projects))
            let obj = {}
            arrList = arrList.reduce((cur, next) => {
              obj[next.projectId] ? '' : obj[next.projectId] = true && cur.push(next)
              return cur
            }, [])
            arrList.forEach(item=>{
              let params = {
                companyId: this.contractForm.companyId,
                projectId: item.projectId
              }
              checkCompanyAndProjectIsRepetition(params).then(res=>{
                if(res.code == 200){
                  if(res.data == 1){
                    key = res.data
                    projectName += item.projectName + ','
                  }
                }
              })
            })

            setTimeout(()=>{
              if (projectName.length > 0) {
                projectName = projectName.substr(0, projectName.length - 1);
              }
              if(key == 1){
                this.$confirm("该企业已经申报过" + projectName + "项目，请你确认是否重复录入。", '温馨提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  if(!this.contractForm.contractId){
                    this.addContract('contractForm');
                  }else{
                    this.editContract('contractForm');
                  }
                }).catch(() => {

                });
              }else{
                if(!this.contractForm.contractId){
                  this.addContract('contractForm');
                }else{
                  this.editContract('contractForm');
                }
              }
            },500)
          }).catch(() => {

          });
        }else{
          let key = ''
          let projectName = ''
          let obj = {}
          let arrList = JSON.parse(JSON.stringify(this.select_projects))
          arrList = arrList.reduce((cur, next) => {
            obj[next.projectId] ? '' : obj[next.projectId] = true && cur.push(next)
            return cur
          }, [])
          arrList.forEach(item=>{
            let params = {
              companyId: this.contractForm.companyId,
              projectId: item.projectId
            }
            checkCompanyAndProjectIsRepetition(params).then(res=>{
              if(res.code == 200){
                if(res.data == 1){
                  key = res.data
                  projectName += item.projectName + ','
                }
              }
            })
          })

          setTimeout(()=>{
            if (projectName.length > 0) {
              projectName = projectName.substr(0, projectName.length - 1);
            }
            if(key == 1){
              this.$confirm("该企业已经申报过" + projectName + "项目，请你确认是否重复录入。", '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                if(!this.contractForm.contractId){
                  this.addContract('contractForm');
                }else{
                  this.editContract('contractForm');
                }
              }).catch(() => {

              });
            }else{
              if(!this.contractForm.contractId){
                this.addContract('contractForm');
              }else{
                this.editContract('contractForm');
              }
            }
          },500)
        }
      },

      //提交新建合同--新增
      addContract(formName) {
        // console.log('sdd',this.contractForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const telephone_number = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (this.contractForm.companyId == '' || this.contractForm.companyId == undefined || this.contractForm.companyId == 0) {
              this.$message.warning('请选择客户');
              return;
            }

            if (this.select_projects.length == 0) {
              this.$message.warning('请选择项目');
              return;
            }

            // if (this.contractForm.isProxy == 1) {
            //   if (this.contractForm.proxyCompanyName == '' || this.contractForm.proxyCompanyName == undefined) {
            //     this.$message.warning('请输入渠道商');
            //     return;
            //   }
            // }

            if (this.contractForm.isOutsource == 1) {
              if (this.contractForm.outsourceCompanyName == '' || this.contractForm.outsourceCompanyName == undefined) {
                this.$message.warning('请输入委外公司名称');
                return;
              }
            }

            for (var i = 0; i < this.select_projects.length - 1; i++) {
              for (var j = i + 1; j < this.select_projects.length; j++) {
                if (this.select_projects[i].projectId == this.select_projects[j].projectId) {
                  if (this.select_projects[i].applyYear == this.select_projects[j].applyYear) {
                    if(this.select_projects[i].areaLevel == this.select_projects[j].areaLevel){
                      if (this.select_projects[i].applyBatchNo != 0 && this.select_projects[j].applyBatchNo != 0) {
                        if (this.select_projects[i].applyBatchNo == this.select_projects[j].applyBatchNo) {
                          this.$message.error(this.select_projects[i].projectName + '项目中选择了相同年份和相同级别重复的批次，请检查!')
                          throw new Error()
                        }
                      }
                    }
                  }
                }
              }
            }

            let projectArr = [];
            this.select_projects.forEach(item => {
              let obj = {};
              // if (!item.yearId || item.yearId == '' || item.yearId == undefined) {
              //   if (document.getElementsByClassName('el-message').length === 0)
              //     this.$message.warning('请选择地区与批次');
              //   throw new Error()
              // }
              if (item.projectId == '' || item.projectId == undefined) {
                this.$message.warning('请选择项目')
                throw new Error()
              }

              if (item.projectType != 822466810090618880) {
                if (!item.areaLevel || item.areaLevel == '' || item.areaLevel == undefined) {
                  this.$message.warning('请选择级别');
                  throw new Error()
                }
              } else {
                if (!item.titleSeries || item.titleSeries == '' || item.titleSeries == undefined) {
                  this.$message.warning('请选择职称系列');
                  throw new Error()
                }
                if (!item.titleLevel || item.titleLevel == '' || item.titleLevel == undefined) {
                  this.$message.warning('请选择职称级别');
                  throw new Error()
                }
                if (!item.provinceId || item.provinceId == '' || item.provinceId == undefined) {
                  this.$message.warning("请选择职称所属的省份");
                  throw new Error()
                }
              }

              // if (!item.provinceId || item.provinceId == '' || item.provinceId == undefined) {
              //   this.$message.warning('请选择地区')
              //   throw new Error()
              // }
              if (!item.applyBatchNo || item.applyBatchNo == '' || item.applyBatchNo == undefined) {
                if (item.applyBatchNo != 0) {
                  this.$message.warning('请选择批次')
                  throw new Error()
                }
              }
              if (!item.applyNum || item.applyNum === '' || item.applyNum == undefined) {
                if (document.getElementsByClassName('el-message').length === 0) {
                  this.$message.warning('请输入数量')
                }
                throw new Error()
              }
              if (item.applyNum <= 0) {
                this.$message.warning('订单数量必须大于0')
                throw new Error()
              }
              if (!item.applyYear || item.applyYear === '' || item.applyYear == undefined) {
                if (document.getElementsByClassName('el-message').length === 0) {
                  this.$message.warning('请选择申报年份')
                }
                throw new Error()
              }
              if (!item.unitPrice || item.unitPrice === '' || item.unitPrice == undefined) {
                if (document.getElementsByClassName('el-message').length === 0) {
                  this.$message.warning('请输入单价或比例')
                }
                throw new Error()
              }
              if (!item.commission || item.commission === '' || item.commission == undefined) {
                this.$message.warning('请输入提成')
                throw new Error()
              }

              if (item.orderPaymentAgreementDtoList == '' || item.orderPaymentAgreementDtoList == undefined) {
                this.$message.warning('请添加收款阶段');
                throw new Error()
              }

              if (this.contractForm.isProxy == 1) {
                if (item.proxyPrice == '' || item.proxyPrice == undefined) {
                  this.$message.warning('请输入业务费用');
                  throw new Error()
                }
                if(item.radioType <= 2){
                  if(item.proxyPrice > 100){
                    this.$message.warning('业务费用比例不得大于100%');
                    item.proxyPrice = 100;
                    throw new Error()
                  }
                }
              }

              if (this.contractForm.isOutsource == 1) {
                if (item.outsourcePrice == '' || item.outsourcePrice == undefined) {
                  this.$message.warning('请输入委外费用');
                  throw new Error()
                }
              }

              if (item.typeMoney == 0) {
                if (item.unitPrice > 100) {
                  item.unitPrice = 100;
                  this.$message.warning('比例不能超出100%')
                  throw new Error()
                }
                // if(item.commType == 1){
                //   this.$message.warning('单价为比例时，提成不得为金额')
                //   throw new Error()
                // }
              }

              if (item.commType == 0) {
                if (item.commission > 100) {
                  item.commission = 100;
                  this.$message.warning('提成比例不能超出100%')
                  throw new Error()
                }
              }else{
                // if (item.commission > item.unitPrice) {
                //   this.$message.warning('提成金额不得大于单价')
                //   throw new Error()
                // }
              }

              let numberTotal = 0;
              item.orderPaymentAgreementDtoList.forEach(list => {
                numberTotal += Number(list.paymentPrice);
                if(list.paymentMode != 0){
                  if (list.paymentMode == '' || list.paymentMode == undefined) {
                    this.$message.warning('收款阶段中的收款阶段不能为空');
                    throw new Error()
                  }
                }

                if (list.paymentDays == '' || list.paymentDays == undefined) {
                  this.$message.warning('收款阶段中的限时不能为空');
                  throw new Error()
                }

                if (list.paymentPrice == '' || list.paymentPrice == undefined) {
                  this.$message.warning('收款阶段中的价格不能为空');
                  throw new Error()
                }

                if (item.typeMoney == 0) {
                  if (list.paymentPrice > 100) {
                    this.$message.warning('收款阶段中比例不得大于100%');
                    list.paymentPrice = 100;
                    throw new Error()
                  }

                  // list.paymentPrice = list.paymentPrice / 100;
                }

                if (item.typeMoney == 1) {
                  if (JSON.stringify(list.paymentPrice).length > 9999999) {
                    this.$message.warning('收款阶段中总额过大，请检查');
                    throw new Error()
                  }
                }
              })

              let totalMoney = Number(item.unitPrice * item.applyNum)

              if (item.typeMoney == 1) {
                if(totalMoney < numberTotal){
                  this.$message.warning('收款阶段总额大于订单总额，请检查');
                  throw new Error()
                }
                if(totalMoney > numberTotal){
                  this.$message.warning('收款阶段总额小于于订单总额，请检查');
                  throw new Error()
                }
              }

              obj.companyId = this.contractForm.companyId;
              obj.applyNum = Number(item.applyNum);
              obj.applyYear = Number(item.applyYear);
              // obj.areaId = item.areaId;
              obj.flowId = item.flowId;
              obj.projectId = item.projectId;
              obj.projectName = item.projectName;
              obj.projectType = item.projectType;
              obj.orderType = item.orderType;
              // obj.yearId = item.yearId;

              obj.areaLevel = item.areaLevel;
              obj.provinceId = item.provinceId;
              obj.cityId = item.cityId;
              obj.districtId = item.districtId;
              obj.townId = item.townId;
              obj.applyBatchNo = item.applyBatchNo;
              // obj.proxyPrice = item.proxyPrice
              obj.outsourcePrice = item.outsourcePrice
              obj.auditPrice = item.auditPrice
              obj.radioType = item.radioType
              obj.typeMoney = item.typeMoney
              obj.orderPaymentAgreementDtoList = item.orderPaymentAgreementDtoList;
              obj.titleMajor = item.titleMajor
              obj.titleSeries = item.titleSeries
              obj.titleLevel = item.titleLevel

              // obj.orderPaymentAgreementDtoList.forEach(key=>{
              //   if (item.typeMoney == 0) {
              //     key.paymentPrice = key.paymentPrice / 100;
              //
              //     console.log('sdd',key.paymentPrice)
              //   }
              // })


              // obj.areaLevel = item.areaLevel;
              // obj.areaLevel = item.areaLevel == '国家级' ? 1 : item.areaLevel == '省级' ? 2 : item.areaLevel == '市级' ? 3 : item.areaLevel == '区县级' ? 4 : item.areaLevel == '镇街级' ? 5 : '';

              // obj.applyBatchNo = item.applyBatchNo;
              // obj.applyBatchNo = item.applyBatchNo == '-未指定' ? '0' : item.applyBatchNo == '-第一批' ? '1' : item.applyBatchNo == '-第二批' ? '2' : item.applyBatchNo == '-第三批' ? '3' : item.applyBatchNo == '-第四批' ? '4' : item.applyBatchNo == '-第五批' ? '5' : ''


              if (item.subsidyTotal && item.subsidyTotal !== undefined) {
                obj.subsidyTotal = item.subsidyTotal;
              }
              if (item.typeMoney == 1) {
                obj.unitPrice = Number(item.unitPrice)
              } else {
                obj.unitPrice = Number(item.unitPrice) / 100;
              }

              if(item.radioType == 3){
                obj.proxyPrice = Number(item.proxyPrice)
              }else{
                obj.proxyPrice = Number(item.proxyPrice) / 100;
              }

              if (item.commType == 1) {
                obj.commission = Number(item.commission)
              } else {
                obj.commission = Number(item.commission) / 100;
              }
              projectArr.push(obj);

              // delete item.province_list
              // delete item.city_list
              // delete item.districtId
              // delete item.town_list
            });

            projectArr.forEach(data=>{
              data.orderPaymentAgreementDtoList.forEach(item=>{
                if (data.typeMoney == 0) {
                  item.paymentPrice = item.paymentPrice / 100
                }
              })
            })

            this.contractForm.projectList = projectArr;

            this.contractForm.fileIds = this.reviewForm.fileIds;

            this.contractForm.companyPersonnelDtoList = [];

            if (JSON.stringify(this.contractFirst) == '{}' && JSON.stringify(this.contractSecond) == '{}') {
              this.$message.warning('至少填写一位联系人和联系电话');
              return;
            }

            if (this.contractFirst.personnelName == '' && this.contractFirst.personnelMobile == '' && this.contractSecond.personnelName == "" && this.contractSecond.personnelMobile == "") {
              this.$message.warning('至少填写一位联系人和联系电话');
              return;
            }

            if (!this.contractFirst.personnelName && !this.contractFirst.personnelMobile && !this.contractSecond.personnelName && !this.contractSecond.personnelMobile) {
              this.$message.warning('至少填写一位联系人和联系电话');
              return;
            }

            if (this.contractFirst.personnelMobile !== '' && this.contractFirst.personnelMobile !== undefined) {
              if (!telephone_number.test(this.contractFirst.personnelMobile)) {
                this.$message.warning('联系电话1手机号码格式不正确，请重新输入');
                return
              }
            }

            // if (this.contractSecond.personnelMobile !== '' && this.contractSecond.personnelMobile !== undefined) {
            //   if (!telephone_number.test(this.contractSecond.personnelMobile)) {
            //     this.$message.warning('联系电话2手机号码格式不正确，请重新输入');
            //     return
            //   }
            // }

            if (this.contractFirst.personnelName !== '' && this.contractFirst.personnelMobile !== '' && this.contractFirst.personnelName && this.contractFirst.personnelMobile) {
              this.contractForm.companyPersonnelDtoList.push(this.contractFirst);
            }
            if (this.contractSecond.personnelName !== '' && this.contractSecond.personnelMobile !== '' && this.contractSecond.personnelName && this.contractSecond.personnelMobile) {
              this.contractForm.companyPersonnelDtoList.push(this.contractSecond);
            }

            if(this.contractForm.newAndOld == true){
              this.contractForm.newOrOld = 0;
            }else{
              this.contractForm.newOrOld = 1;
            }

            saveContract(this.contractForm).then(res => {
              if (res.code == 200) {
                this.$message.success('创建成功');
                this.contractForm = {
                  isProxy: '0',
                  isOutsource: '0',
                  contractState:0,
                  projectList: [],
                  contractCode: '',
                  contractId: '',
                  orderVoList: [],
                  fileIds: '',
                };
                this.fileIds = [];
                this.fileList = [];
                this.reviewForm = {};
                this.contractFileList = [];
                this.select_projects = [];
                this.tempProjectsList = [];
                this.contractFirst = {};
                this.contractSecond = {};
                this.$store.commit('SET_CONTRACT_SCROLL', 0)
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/contract');
              } else {
                this.$message.warning(res.message)
              }
            })
          }
        });
      },

      //编辑
      editContract(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const telephone_number = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (this.contractForm.companyId == '' || this.contractForm.companyId == undefined || this.contractForm.companyId == 0) {
              this.$message.warning('请选择客户');
              return;
            }

            if (this.select_projects.length == 0) {
              this.$message.warning('请选择项目');
              return;
            }

            // if (this.contractForm.isProxy == 1) {
            //   if (this.contractForm.proxyCompanyName == '' || this.contractForm.proxyCompanyName == undefined) {
            //     this.$message.warning('请输入渠道商');
            //     return;
            //   }
            // }

            if (this.contractForm.isOutsource == 1) {
              if (this.contractForm.outsourceCompanyName == '' || this.contractForm.outsourceCompanyName == undefined) {
                this.$message.warning('请输入委外公司名称');
                return;
              }
            }

            for (var i = 0; i < this.select_projects.length - 1; i++) {
              for (var j = i + 1; j < this.select_projects.length; j++) {
                if (this.select_projects[i].projectId == this.select_projects[j].projectId) {
                  if (this.select_projects[i].applyYear == this.select_projects[j].applyYear) {
                    if(this.select_projects[i].areaLevel == this.select_projects[j].areaLevel){
                      if (this.select_projects[i].applyBatchNo != 0 && this.select_projects[j].applyBatchNo != 0) {
                        if (this.select_projects[i].applyBatchNo == this.select_projects[j].applyBatchNo) {
                          this.$message.error(this.select_projects[i].projectName + '项目中选择了相同年份和相同级别重复的批次，请检查!')
                          throw new Error()
                        }
                      }
                    }
                  }
                }
              }
            }

            let projectArr = [];
            this.select_projects.forEach(item => {
              let obj = {};
              // if (!item.yearId || item.yearId == '' || item.yearId == undefined) {
              //   if (document.getElementsByClassName('el-message').length === 0)
              //     this.$message.warning('请选择地区与批次');
              //   throw new Error()
              // }
              if (item.projectId == '' || item.projectId == undefined) {
                this.$message.warning('请选择项目')
                throw new Error()
              }
              if (item.projectType != 822466810090618880) {
                if (!item.areaLevel || item.areaLevel == '' || item.areaLevel == undefined) {
                  this.$message.warning('请选择级别');
                  throw new Error()
                }
              } else {
                if (!item.titleSeries || item.titleSeries == '' || item.titleSeries == undefined) {
                  this.$message.warning('请选择职称系列');
                  throw new Error()
                }
                if (!item.titleLevel || item.titleLevel == '' || item.titleLevel == undefined) {
                  this.$message.warning('请选择职称级别');
                  throw new Error()
                }
                if (!item.provinceId || item.provinceId == '' || item.provinceId == undefined) {
                  this.$message.warning("请选择职称所属的省份");
                  throw new Error()
                }
              }

              // if (!item.provinceId || item.provinceId == '' || item.provinceId == undefined) {
              //   this.$message.warning('请选择地区');
              //   throw new Error()
              // }

              item.applyBatchNo = Number(item.applyBatchNo)
              if (!item.applyBatchNo || item.applyBatchNo == '' || item.applyBatchNo == undefined) {
                if (item.applyBatchNo != 0) {
                  this.$message.warning('请选择批次')
                  throw new Error()
                }
                if (item.applyBatchNo == '' && item.applyBatchNo != 0) {
                  this.$message.warning('请选择批次')
                  throw new Error()
                }
              }

              if (!item.applyNum || item.applyNum === '' || item.applyNum == undefined) {
                if (document.getElementsByClassName('el-message').length === 0)
                  this.$message.warning('请输入数量');
                throw new Error()
              }

              if (item.applyNum <= 0) {
                this.$message.warning('订单数量必须大于0')
                throw new Error()
              }

              if (!item.applyYear || item.applyYear === '' || item.applyYear == undefined) {
                if (document.getElementsByClassName('el-message').length === 0) {
                  this.$message.warning('请选择申报年份')
                }
                throw new Error()
              }

              if (!item.unitPrice || item.unitPrice === '' || item.unitPrice == undefined) {
                if (document.getElementsByClassName('el-message').length === 0)
                  this.$message.warning('请输入单价或比例');
                throw new Error()
              }

              if (!item.commission || item.commission === '' || item.commission == undefined) {
                this.$message.warning('请输入提成')
                throw new Error()
              }

              if (item.orderPaymentAgreementDtoList == '' || item.orderPaymentAgreementDtoList == undefined) {
                this.$message.warning('请添加收款阶段');
                throw new Error()
              }

              if (this.contractForm.isProxy == 1) {
                if (item.proxyPrice == '' || item.proxyPrice == undefined) {
                  this.$message.warning('请输入业务费用');
                  throw new Error()
                }
                if(item.radioType <= 2){
                  if(item.proxyPrice > 100){
                    this.$message.warning('业务费用比例不得大于100%');
                    item.proxyPrice = 100;
                    throw new Error()
                  }
                }
              }

              if (this.contractForm.isOutsource == 1) {
                if (item.outsourcePrice == '' || item.outsourcePrice == undefined) {
                  this.$message.warning('请输入委外费用');
                  throw new Error()
                }
              }

              if (item.typeMoney == 0) {
                if (item.unitPrice > 100) {
                  item.unitPrice = 100;
                  this.$message.warning('比例不能超出100%')
                  throw new Error()
                }
                // if(item.commType == 1){
                //   this.$message.warning('单价为比例时，提成不得为金额')
                //   throw new Error()
                // }
              }

              if (item.commType == 0) {
                if (item.commission > 100) {
                  item.commission = 100;
                  this.$message.warning('提成比例不能超出100%')
                  throw new Error()
                }
              }else{
                // if (item.commission > item.unitPrice) {
                //   this.$message.warning('提成金额不得大于单价')
                //   throw new Error()
                // }
              }

              let numberTotal = 0;
              item.orderPaymentAgreementDtoList.forEach(list => {
                numberTotal += Number(list.paymentPrice);
                if(list.paymentMode != 0){
                  if (list.paymentMode == '' || list.paymentMode == undefined) {
                    this.$message.warning('收款阶段中的收款阶段不能为空');
                    throw new Error()
                  }
                }

                if (list.paymentDays == '' || list.paymentDays == undefined) {
                  this.$message.warning('收款阶段中的限时不能为空');
                  throw new Error()
                }

                if (list.paymentPrice == '' || list.paymentPrice == undefined) {
                  this.$message.warning('收款阶段中的价格不能为空');
                  throw new Error()
                }

                if (item.typeMoney == 0) {
                  if (list.paymentPrice > 100) {
                    this.$message.warning('收款阶段中比例不得大于100%');
                    list.paymentPrice = 100;
                    throw new Error()
                  }

                  // list.paymentPrice = list.paymentPrice / 100;
                }

                if (item.typeMoney == 1) {
                  if (JSON.stringify(list.paymentPrice).length > 9999999) {
                    this.$message.warning('收款阶段中总额过大，请检查');
                    throw new Error()
                  }
                }
              })

              let totalMoney = Number(item.unitPrice * item.applyNum)
              if (item.typeMoney == 1) {
                if(totalMoney < numberTotal){
                  this.$message.warning('收款阶段总额大于订单总额，请检查');
                  throw new Error()
                }
                if(totalMoney > numberTotal){
                  this.$message.warning('收款阶段总额小于于订单总额，请检查');
                  throw new Error()
                }
              }

              obj.companyId = this.contractForm.companyId;
              obj.applyNum = Number(item.applyNum);
              obj.applyYear = Number(item.applyYear);
              obj.areaId = item.areaId;
              obj.flowId = item.flowId;
              obj.projectId = item.projectId;
              obj.projectName = item.projectName;
              obj.orderType = item.orderType;
              obj.yearId = item.yearId;
              obj.orderId = item.orderId;

              obj.areaLevel = item.areaLevel;
              obj.provinceId = item.provinceId;
              obj.cityId = item.cityId;
              obj.districtId = item.districtId;
              obj.townId = item.townId;
              obj.applyBatchNo = Number(item.applyBatchNo);
              // obj.proxyPrice = item.proxyPrice
              obj.outsourcePrice = item.outsourcePrice
              obj.auditPrice = item.auditPrice
              obj.radioType = item.radioType
              obj.typeMoney = item.typeMoney
              obj.orderPaymentAgreementDtoList = item.orderPaymentAgreementDtoList;
              obj.titleMajor = item.titleMajor
              obj.titleSeries = item.titleSeries
              obj.titleLevel = item.titleLevel

              // obj.areaLevel = item.areaLevel;
              // obj.areaLevel = item.areaLevel == '国家级' ? 1 : item.areaLevel == '省级' ? 2 : item.areaLevel == '市级' ? 3 : item.areaLevel == '区县级' ? 4 : item.areaLevel == '镇街级' ? 5 : '';

              // obj.applyBatchNo = item.applyBatchNo;
              // obj.applyBatchNo = item.applyBatchNo == '-未指定' ? '0' : item.applyBatchNo == '-第一批' ? '1' : item.applyBatchNo == '-第二批' ? '2' : item.applyBatchNo == '-第三批' ? '3' : item.applyBatchNo == '-第四批' ? '4' : item.applyBatchNo == '-第五批' ? '5' : ''

              if (item.subsidyTotal && item.subsidyTotal !== undefined) {
                obj.subsidyTotal = item.subsidyTotal;
              }

              if (item.typeMoney == 1) {
                obj.unitPrice = Number(item.unitPrice)
              } else {
                obj.unitPrice = Number(item.unitPrice) / 100;
              }

              if(item.radioType == 3){
                obj.proxyPrice = Number(item.proxyPrice)
              }else{
                obj.proxyPrice = Number(item.proxyPrice) / 100;
              }

              if (item.commType == 1) {
                obj.commission = Number(item.commission)
              } else {
                obj.commission = Number(item.commission) / 100;
              }

              projectArr.push(obj);

              // delete item.province_list
              // delete item.city_list
              // delete item.districtId
              // delete item.town_list
            });

            projectArr.forEach(data=>{
              data.orderPaymentAgreementDtoList.forEach(item=>{
                if (data.typeMoney == 0) {
                  item.paymentPrice = item.paymentPrice / 100
                }
              })
            })

            this.contractForm.projectList = projectArr;

            if (this.fileList.length != 0) {
              this.fileList.forEach(item => {
                this.fileIds.push(item.fileId);
              })
            }

            this.contractForm.fileIds = this.reviewForm.fileIds;

            this.contractForm.companyPersonnelDtoList = [];

            if (JSON.stringify(this.contractFirst) == '{}' && JSON.stringify(this.contractSecond) == '{}') {
              this.$message.warning('至少填写一位联系人和联系电话');
              return;
            }

            if (this.contractFirst.personnelName == '' && this.contractFirst.personnelMobile == '' && this.contractSecond.personnelName == "" && this.contractSecond.personnelMobile == "") {
              this.$message.warning('至少填写一位联系人和联系电话');
              return;
            }

            if (!this.contractFirst.personnelName && !this.contractFirst.personnelMobile && !this.contractSecond.personnelName && !this.contractSecond.personnelMobile) {
              this.$message.warning('至少填写一位联系人和联系电话');
              return;
            }

            if (this.contractFirst.personnelMobile && this.contractFirst.personnelMobile !== '') {
              if (!telephone_number.test(this.contractFirst.personnelMobile)) {
                this.$message.warning('联系电话1手机号码格式不正确，请重新输入');
                return
              }
            }

            // if (this.contractSecond.personnelMobile && this.contractSecond.personnelMobile !== '') {
            //   if (!telephone_number.test(this.contractSecond.personnelMobile)) {
            //     this.$message.warning('联系电话2手机号码格式不正确，请重新输入');
            //     return
            //   }
            // }

            this.contractForm.companyPersonnelDtoList.push(this.contractFirst);
            this.contractForm.companyPersonnelDtoList.push(this.contractSecond);

            if(this.contractForm.newAndOld == true){
              this.contractForm.newOrOld = 0;
            }else{
              this.contractForm.newOrOld = 1;
            }

            updateContract(this.contractForm).then(res => {
              if (res.code == 200) {
                this.$message.success('修改成功');
                this.contractForm = {
                  isProxy: '0',
                  isOutsource: '0',
                  contractState:0,
                  projectList: [],
                  contractCode: '',
                  contractId: '',
                  orderVoList: [],
                  fileIds: '',
                };
                this.fileIds = [];
                this.fileList = [];
                this.contractFileList = [];
                this.select_projects = [];
                this.tempProjectsList = [];
                this.contractFirst = {};
                this.contractSecond = {};
                this.reviewForm = {};
                // this.$store.commit('SET_CONTRACT_SCROLL', 0)
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/contract');
                // this.$router.push({path:'/contract',})
              } else {
                this.$message.warning(res.message)
              }
            })
            if(this.holdDeleteProject.length > 0){
              this.holdDeleteProject.forEach(item=>{
                this.deleteProjectOrder(item)
              })
            }

            if(this.holdDeleteProjectAgreement.length > 0){
              this.holdDeleteProjectAgreement.forEach(item=>{
                this.delProjectAgreement(item.agreementId)
              })
            }
          }
        });
      },

      //上传文件
      fileChange(file) {
        this.importApproval(file)
      },

      //移除文件
      handleRemove(file, filelist) {
        this.fileList.forEach(item => {
          if (item.fileId == file.fileId) {
            this.fileList.splice(0, 1);
          }
        });
      },

      importApproval(file) {
        if (file.name.length >= 150) {
          this.$message('文件名称超长，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if (this.contractForm.companyId == '' || this.contractForm.companyId == undefined) {
          this.$message.warning('请先选择客户');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if (this.contractForm.signDate == '' || this.contractForm.signDate == undefined) {
          this.$message.warning('请先选择签订日期');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }

        var day = new Date(this.contractForm.signDate)
        var years = day.getFullYear();

        this.fileTemp = file.raw
        if (this.fileTemp) {
          // const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
          // if (extension !== 'png' || extension !== 'jpg') {
          //   this.$message.warning('只能上传图片文件')
          //   this.fileTemp = ''
          //   this.fileList = []
          //   return;
          // }

          // const loading = this.$loading({
          //   lock: true,
          //   text: '上传中',
          // });

          let formData = new FormData;
          formData.append('crmCompanyId', this.contractForm.companyId)
          formData.append('customerName', this.contractForm.companyName)
          formData.append('file', this.fileTemp)
          formData.append('year', years)
          uploadContractFile(formData).then(res => {
            if (res.code == 200) {
              let fileNameList = {
                uid: file.uid,
                name: file.name,
                fileName: file.name,
                filesId: res.data
              }
              this.fileList.push(fileNameList)
              this.fileIds.push(res.data)
              this.$message.success('上传成功！')
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请上传文件！'
          })
        }
      },

      //点击打开编辑
      editOpen() {
        this.isCheck = !this.isCheck;
      },

      //限制输入 num:1 去掉小数点
      inputXz(e, num, item) {
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
        if (num) {
          if (num == 1) {
            e.target.value = e.target.value.replace('.', '');
            if(e.target.value > 9999){
              e.target.value = 9999
            }
            this.$set(item, 'applyNum', e.target.value)
          }
          if (num == 2) {
            this.$set(this.contractForm, 'availableYear', e.target.value)
          }
        }
      },

      //根据文件id获取文件详情
      getFileDetail(fileIds, item) {
        // let fileArr = fileIds.split(",");
        getFileListWithFileIds({fileIds: fileIds, haveView: false}).then(res => {
          if (res.code == 200) {
            this.contractFileList = res.data.map(item => {
              item.name = item.fileName;
              return item
            });

            this.$set(item, 'fileList', res.data)
            // this.$set(item,'fileIds', res.data[0].fileId)
            // this.$set(item,'fileName', res.data[0].fileName)
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // 返回
      cancelSub() {
        this.contractForm = {
          isProxy: '0',
          isOutsource: '0',
          projectList: [],
          contractCode: '',
          contractId: '',
          orderVoList: [],
          fileIds: '',
        };
        this.fileIds = [];
        this.fileList = [];
        this.contractFileList = [];
        this.select_projects = [];
        this.tempProjectsList = [];
        this.contractFirst = {};
        this.contractSecond = {};
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/contract');
      },

      //下载文件
      downFileHandle(item, id) {
        if(item.fileId == undefined){
          item = this.reviewForm
        }
        ossFileSystemFileDownload(item).then(res => {
          if (res.code == 200) {
            let url = res.data.replace(/http/,'https')
            window.open(url)
            // this.$message.success('下载成功')
          }
        })
      },

      radioHandle(e, data) {
        this.$set(data, 'unitPrice', '');
        // if(e == '0'){
        //   // this.$set(data, 'radioType', 1);
        //   this.$set(data, 'commType', 0);
        // }else{
        //   // this.$set(data, 'radioType', '');
        // }
      },

      //num 1:单价比例 2:业务费用比例 3：提成比例
      keyupEvent(e, data, num) {
        if (e.target.value > 100) {
          e.target.value = 100;
        }
        // e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
        if(!/^\d+$/.test(e.target.value)){
          e.target.value = ''
        }
        // e.target.value = !/^\d+$/.test(e.target.value) ? e.target.value : ''
        if(num == 1){
          data.unitPrice = e.target.value;
        }
        if(num == 2){
          data.proxyPrice = e.target.value;
        }
        if(num == 3){
          data.commission = e.target.value;
        }
      },

      //限制输入13位
      keyupEventMoney(e, data, num) {
        if (num == 1) {
          if (e.target.value.length > 13) e.target.value = e.target.value.slice(0, 13);
          e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
          if(e.target.value && e.target.value != ''){
            data.unitPrice = e.target.value
          }
        }
        if (num == 2) {
          if (e.target.value.length > 13) e.target.value = e.target.value.slice(0, 13);
          e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
          if(e.target.value && e.target.value != ''){
            data.proxyPrice = e.target.value
          }
        }
        if (num == 3) {
          if (e.target.value.length > 13) e.target.value = e.target.value.slice(0, 13);
          e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
          if(e.target.value && e.target.value != ''){
            data.auditPrice = e.target.value
          }
        }
        if (num == 4) {
          if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
          e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
          if(e.target.value && e.target.value != ''){
            data.outsourcePrice = e.target.value
          }
        }
        if (num == 5) {
          if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
          e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
          if(e.target.value && e.target.value != ''){
            data.paymentPrice = e.target.value
          }
        }
        if (num == 6) {
          if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
          e.target.value = e.target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
          if(e.target.value && e.target.value != ''){
            data.commission = e.target.value
          }
        }
      },

      //签收当前环节
      signTheProcess() {
        signProcess(this.signProcessId).then(res => {
          if (res.code == 200) {
            this.getDetail();
          }
        })
      },

      //打开审核窗口， num：1 初审，2：复审 3:退回 4：撤回 5：取回
      reviewBtn(item, index, num) {
        this.getDetail();
        setTimeout(() => {
          let flow = [];
          this.contractForm.contractProcessVoList.forEach((data) => {
            if (data.signTime && data.flowStatus > 1) {
              flow.push(data)
            }
          })

          if (item.nodeId != flow[flow.length - 1].nodeId) {
            this.$message.warning('此流程已流转，获取最新流程');
            setTimeout(() => {
              this.processialogVisible = false;
            }, 200)
            throw new Error()
          }

          this.processialogVisible = !this.processialogVisible;
          this.reviewForm = JSON.parse(JSON.stringify(item));
          this.reviewForm.num = num
          // this.reviewForm.fileIds = [];

          this.contractForm.contractProcessVoList.forEach((list, i) => {
            if (index - 1 == i) {
              this.$set(this.reviewForm, 'prevFlowStatus', list.flowStatus)
            }
            if (index + 1 == i) {
              this.$set(this.reviewForm, 'nextHandlerType', list.handlerType)
              this.$set(this.reviewForm, 'nextHandlerId', list.handlerId);
              this.$set(this.reviewForm, 'holdCheckResult', item.checkResult)
              this.$set(this.reviewForm, 'nextHandlerUserId', list.userId)

              if (this.reviewForm.nextHandlerType == 4) {
                this.getRoleName(this.reviewForm.nextHandlerId)
              }

              if (this.reviewForm.nextHandlerType == 2) {
                this.$set(this.reviewForm, 'nextNodeUserId', list.handlerId);
                // this.projectPersonList.forEach(list=>{
                //   if(this.reviewForm.nextHandlerId == list.userId){
                //     this.reviewForm.nextNodeUserName = list.userName
                //   }
                // })
              }

              if (this.reviewForm.nextHandlerType == 3) {
                let deptIds = [];
                deptIds.push(list.handlerId)
                this.getPersonList('', 2, deptIds);
              }
            }
          })

          if (num == 3) {
            let flowList = [];
            let holdFlow = JSON.parse(JSON.stringify(this.contractForm.contractProcessVoList))
            let useHold = false;
            let arr = [];
            this.contractForm.contractProcessVoList.forEach((list, k) => {
              list.index = k;
              if (list.flowStatus == 5) {
                arr.push(list);
                useHold = true
              }

              if (list.signTime && list.sendTime) {
                flowList.push(list)
              }
            })

            if (useHold) {
              holdFlow.splice(arr[arr.length - 1].index, this.contractForm.contractProcessVoList.length - 1)

              let result = [];
              for (let i = 0; i < flowList.length; i++) {
                let obj = flowList[i];
                let num = obj.processId;
                let isExist = false;
                for (let j = 0; j < holdFlow.length; j++) {
                  let aj = holdFlow[j];
                  let n = aj.processId;
                  if (n == num) {
                    isExist = true;
                    break;
                  }
                }
                if (!isExist) {
                  result.push(obj);
                }
              }

              flowList = result
            }

            flowList.forEach((item, index) => {
              if (this.reviewForm.processId == item.processId) {
                flowList.splice(index, 1)
              }
            })

            let obj = {}
            flowList = flowList.reduce((cur, next) => {
              obj[next.processId] ? '' : obj[next.processId] = true && cur.push(next)
              return cur
            }, [])

            this.flowList = flowList;
          }
        }, 300)
      },

      //撤回
      withdrawOpen(num) {
        this.getDetail();
        setTimeout(() => {
          this.processialogVisible = !this.processialogVisible;
          this.reviewForm = JSON.parse(JSON.stringify(this.withdrawFlow));
          this.reviewForm.num = num
        }, 300)
      },

      //根据角色id获取角色名称
      getRoleName(id) {
        roleIdConvertRoleName({roleId: id}).then(res => {
          if (res.code == 200) {
            // this.reviewForm.roleName = res.data
            this.$set(this.reviewForm, 'roleName', res.data)
            this.getPersonList(res.data, 1);
          }
        })
      },

      //完成节点
      completeBtn(item, index, num) {
        this.reviewForm = {};
        this.reviewForm = JSON.parse(JSON.stringify(item));

        if (item.accessory == 1) {
          if (item.fileIds == '' || item.fileIds == undefined) {
            this.$message.warning('请上传合同扫描件');
            return;
          }
        }

        this.contractForm.contractProcessVoList.forEach((list, i) => {
          if (index + 1 == i) {
            this.$set(this.reviewForm, 'nextHandlerType', list.handlerType)
            this.$set(this.reviewForm, 'nextHandlerId', list.handlerId);
            this.$set(this.reviewForm, 'nextHandlerUserId', list.userId)

            if (this.reviewForm.nextHandlerType == 4) {
              this.getRoleName(this.reviewForm.nextHandlerId)
            }

            if (this.reviewForm.nextHandlerType == 2) {
              this.$set(this.reviewForm, 'nextNodeUserId', list.handlerId);
              // this.projectPersonList.forEach(list=>{
              //   if(this.reviewForm.nextHandlerId == list.userId){
              //     this.reviewForm.nextNodeUserName = list.userName
              //   }
              // })
            }

            if (this.reviewForm.nextHandlerType == 3) {
              let deptIds = [];
              deptIds.push(list.handlerId)
              this.getPersonList('', 2, deptIds);
            }
          }
        })

        if (this.reviewForm.nextHandlerType && this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != 2 && this.reviewForm.nextHandlerType != 5 && !this.reviewForm.nextHandlerUserId) {
          this.processialogVisible = !this.processialogVisible;
          this.reviewForm.num = num
        } else {
          contractProcessComplete(item).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功');
              this.getDetail();
            }
          })
        }
      },

      //完成并需要选择下一环节负责人
      completeSubmit() {
        if (this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != 2 && this.reviewForm.nextHandlerType != 5) {
          if (!this.reviewForm.nextHandlerUserId) {
            if (this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined) {
              this.$message.warning('请选择指定用户');
              return;
            }
          }
        }

        this.recheckLoading = true;

        contractProcessComplete(this.reviewForm).then(res => {
          if (res.code == 200) {
            this.$message.success('操作成功');
            this.getDetail();
            this.recheckLoading = false;
            this.processialogVisible = false
          }
        })
      },

      //选择流程
      goToNodeChange(event) {
        // this.flowList.forEach(item=>{
        //   if(item.nodeId == event){
        //     // console.log('dss',event)
        //     // console.log('sss',item)
        //     this.$set(this.reviewForm, 'nextHandlerType', item.handlerType)
        //     if(this.reviewForm.nextHandlerType == 1 && this.reviewForm.needCheck == 1 && this.reviewForm.needRecheck == 2){
        //       this.$set(this.reviewForm, 'nextHandlerId', item.handlerId);
        //       this.$set(this.reviewForm, 'holdCheckResult', this.reviewForm.checkResult)
        //     }
        //     if(this.reviewForm.nextHandlerType == 4){
        //       this.$set(this.reviewForm, 'nextHandlerId', item.handlerId);
        //       this.getRoleName(this.reviewForm.nextHandlerId)
        //     }
        //
        //     if(this.reviewForm.nextHandlerType == 2){
        //       this.$set(this.reviewForm, 'nextNodeUserId', item.handlerId);
        //     }
        //
        //     if(this.reviewForm.nextHandlerType == 3){
        //       this.$set(this.reviewForm, 'nextHandlerId', item.handlerId);
        //       this.deptUserList = [];
        //       this.$set(this.reviewForm, 'nextNodeUserId', '');
        //       let deptIds = [];
        //       deptIds.push(item.handlerId)
        //       this.getPersonList('',2,deptIds);
        //     }
        //
        //     // console.log('aaa',this.reviewForm)
        //   }
        // })
      },

      //撤回
      withdrawBtn() {
        if (this.reviewForm.notifyComment == '' || this.reviewForm.notifyComment == undefined) {
          this.$message.warning('请填写撤回原因');
          return;
        }
        this.recheckLoading = true;
        this.$confirm('是否确定撤回', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          withdrawProcess(this.reviewForm).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功');
              this.processialogVisible = false;
              this.recheckLoading = false;
              this.reviewForm = {};
              this.getDetail();
            }
          })
        })
      },

      //取回
      RetrieveBtn() {
        if (this.reviewForm.notifyComment == '' || this.reviewForm.notifyComment == undefined) {
          this.$message.warning('请填写取回原因');
          return;
        }
        this.recheckLoading = true;
        this.$confirm('是否确定取回', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          retrieveProcess(this.reviewForm).then(res => {
            if (res.code == 200) {
              this.$message.success('操作成功');
              this.processialogVisible = false;
              this.recheckLoading = false;
              this.reviewForm = {};
              this.getDetail();
            }
          })
        })
      },

      //退回
      sendBackBtn() {
        if (this.reviewForm.goToNodeId == '' || this.reviewForm.goToNodeId == undefined) {
          this.$message.warning('请选择流程');
          return;
        }

        if (this.reviewForm.notifyComment == '' || this.reviewForm.notifyComment == undefined) {
          this.$message.warning('请填写退回原因');
          return;
        }

        this.recheckLoading = true;
        sendBackProcess(this.reviewForm).then(res => {
          if (res.code == 200) {
            this.$message.success('操作成功');
            this.processialogVisible = false;
            this.recheckLoading = false;
            this.reviewForm = {};
            this.flowList = [];
            this.getDetail();
          }
        })
      },

      //审核确定
      checkResultSubmit() {
        if (this.reviewForm.prevFlowStatus == 5) {
          if (this.reviewForm.checkResult == 2) {
            this.$message.warning('评审结果不允许连续不通过');
            return;
          }
        }
        if (this.reviewForm.checkResult == '' || this.reviewForm.checkResult == undefined) {
          this.$message.warning('请选择评审结果');
          return;
        }

        if (this.reviewForm.nextHandlerType != 0 && this.reviewForm.nextHandlerType != 2 && this.reviewForm.nextHandlerType != 5 && this.reviewForm.checkResult == 1) {
          if (!this.reviewForm.nextHandlerUserId) {
            if (this.reviewForm.nextNodeUserId == '' || this.reviewForm.nextNodeUserId == undefined) {
              this.$message.warning('请选择指定用户');
              return;
            }
          }
        }

        this.recheckLoading = true;

        contractProcessFirstReview(this.reviewForm).then(res => {
          if (res.code == 200) {
            this.$message.success('初审成功');
            this.recheckLoading = false;
            this.getDetail();
            this.fileList = [];
            this.contractFileList = [];
            this.processialogVisible = false
          }
        })
      },

      //复审确定
      recheckResultSubmit() {
        if (this.reviewForm.recheckResult == '' || this.reviewForm.recheckResult == undefined) {
          this.$message.warning('请选择评审结果');
          return;
        }

        if ( this.reviewForm.fileIds != undefined && this.reviewForm.fileIds != '' && this.reviewForm.fileIds.length != 0 ) {
          this.reviewForm.fileIds = this.reviewForm.fileIds.join(',')
        } else {
          this.reviewForm.fileIds = ''
        }

        this.recheckLoading = true;
        contractProcessReview(this.reviewForm).then(res => {
          if (res.code == 200) {
            this.$message.success('复审成功');
            this.recheckLoading = false;
            this.getDetail();
            this.fileList = [];
            this.contractFileList = [];
            this.processialogVisible = false
          }
        })
      },

      //确定合同上传
      uploadContractSubmit() {
        if (this.reviewForm.fileIds == '' || this.reviewForm.fileIds == undefined) {
          this.$message.warning('请上传合同扫描件');
          return;
        }
        // this.contractForm.contractProcessVoList.forEach(item=>{
        //   if(item.nodeId == this.reviewForm.nodeId){
        //     item.fileIds = this.reviewForm.fileIds
        //     item.fileName = this.reviewForm.fileName
        //   }
        // })

        this.recheckLoading = true;

        updateFileIds(this.reviewForm).then(res => {
          if (res.code == 200) {
            this.recheckLoading = false;
            this.processialogVisible = false;
            this.reviewForm = {};
            this.contractFileList = [];
            this.$message.success('提交成功');
            this.getDetail();
          }
        })
      },

      //取消彈出
      cancelCheck() {
        this.processialogVisible = false;
        this.recheckLoading = false;
        this.reviewForm = {};
      },

      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`)
      },

      //上传文件之前
      uploadBeforeFile(file) {
        // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isPDF = file.type === 'application/pdf';
        // const isLt2M = file.size / 1024 / 1024 < 500
        // //
        // if (!isLt2M) {
        //   this.$message.error('上传文件大小不能超过 100MB!')
        // }

        if (!isPDF) {
          this.$message.error('上传合同扫描件只能是 pdf 格式!');
        }

        return isPDF;
      },

      handleRemoveContract(file, filelist) {
        this.reviewForm.fileList = []
        this.reviewForm.fileIds = '';
      },

      importApprovalContract(file) {
        if(this.contractForm.companyName == '' || this.contractForm.companyName == undefined){
          this.$message('请先选择客户');
          this.contractFileList = JSON.parse(JSON.stringify(this.contractFileList))
          return;
        }
        if (file.file.name.length >= 150) {
          this.$message('文件名称超长，请检查');
          this.contractFileList = JSON.parse(JSON.stringify(this.contractFileList))
          return;
        }

        let fileSize = file.file.size / 1024

        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.contractFileList = JSON.parse(JSON.stringify(this.contractFileList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.contractFileList = JSON.parse(JSON.stringify(this.contractFileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = file.file.name.lastIndexOf(".")
        let fileName = file.file.name.substring(0,index);
        let fileType = file.file.name.substring(index+1,file.file.name.length);
        let filePath = projectContractUpload(this.contractForm.companyName, fileName) + '.' + fileType
        uploadFilesOss(filePath, file.file, file).then(res => {
          if (res) {
            let FileList = [];
            let addFile = {
              fileName: file.file.name,
              filePath: filePath,
              fileSize: fileSize,
              fileType: fileType,
              parentType: 4
            }
            FileList.push(addFile)
            let params = {
              companyId: this.contractForm.companyId,
              companyName: this.contractForm.companyName,
              addFileDtos: FileList,
              haveView: false
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                // this.contractFileList.push(response.data[0]);

                this.$set(this.reviewForm, 'fileIds', response.data[0].fileId)
                this.$set(this.reviewForm, 'fileId', response.data[0].fileId)
                this.$set(this.reviewForm, 'filePath', response.data[0].filePath)
                this.$set(this.reviewForm, 'fileName', response.data[0].fileName)
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.contractFileList = JSON.parse(JSON.stringify(this.contractFileList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.contractFileList = JSON.parse(JSON.stringify(this.contractFileList))
          }
        })
      },

      // 基本信息--选择省
      provinceChange(data, isChange) {
        if (isChange == 1) {
          this.$set(data, 'cityId', '')
          this.$set(data, 'districtId', '')
          this.$set(data, 'townId', '')
        }
        if (data.provinceId && data.provinceId !== '') {
          this.getAddressData(2, data.provinceId, data);
        }
      },
      //基本信息--选择市
      cityChange(data, isChange) {
        if (isChange == 1) {
          this.$set(data, 'districtId', '')
          this.$set(data, 'townId', '')
        }
        if (data.cityId && data.cityId !== '') {
          this.getAddressData(1, data.cityId, data);
        }
      },
      //基本信息--选择区
      districtChange(data, isChange) {
        if (isChange == 1) {
          this.$set(data, 'townId', '')
        }
        if (data.districtId && data.districtId !== '') {
          this.getAddressData(0, data.districtId, data);
        }
      },

      getAddressData(level, parentId, Data){
        let params = {
          level: level,
          parentId: parentId
        };
        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (level == 2) {
              this.$set(Data, 'city_list', res.data)
            }
            if (level == 1) {
              this.$set(Data, 'district_list', res.data)
            }
            if (level == 0) {
              this.$set(Data, 'town_list', res.data)
            }
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      getRegionData(level, parentId) {
        let params = {
          level: level,
          parentId: parentId
        };
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
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //根据角色获取人员列表 1:指定角色用户列表 2:部门用户列表
      getPersonList(name, num, deptIds) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (deptIds != undefined) {
          formData.append('deptIdList', deptIds)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            if (!num && !deptIds) {
              this.userList = res.data
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

      //打开新增收款弹窗
      openAddPay(item, index) {
        if (item.projectId == '' || item.projectId == undefined) {
          this.$message.warning('请先选择项目');
          return;
        }
        // this.payForm = {};
        // this.payMethodDialogVisible = true;
        // this.payForm.projectId = item.projectId;
        // this.payForm.index = index;
        let payBox = {};
        if(item.typeMoney == 1){
          payBox.typeMoney = 1;
          if(item.unitPrice && item.applyNum){
            payBox.paymentPrice = parseFloat((item.unitPrice * item.applyNum).toPrecision(13))
          }
        }else{
          payBox.typeMoney = 0;
          payBox.paymentPrice = JSON.parse(JSON.stringify(item.unitPrice))
        }

        item.orderPaymentAgreementDtoList.push(payBox)
      },

      //确定新增
      submitAddPay(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            // this.payForm.typeMoney = 1;
            this.$set(this.payForm, 'typeMoney', 1)
            this.$set(this.payForm, 'paymentPrice', '')
            this.select_projects.forEach((item, i) => {
              if (this.payForm.projectId == item.projectId && this.payForm.index == i) {
                if (item.orderPaymentAgreementDtoList) {
                  item.orderPaymentAgreementDtoList.push(this.payForm)
                } else {
                  item.orderPaymentAgreementDtoList = [];
                  item.orderPaymentAgreementDtoList.push(this.payForm)
                }
              }
            })

            this.payMethodDialogVisible = false;
            this.payForm = {};
          }
        })
      },

      //删除收款阶段
      deletePay(item, index, list, o) {
        this.$confirm('是否确定删除收款阶段', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (list.agreementId) {
            // deleteAgreement({agreementId: list.agreementId}).then(res => {
            //   if (res.code == 200) {
            //     // this.$message.success('删除成功');
            //     // this.getDetail()
            //     this.select_projects[index].orderPaymentAgreementDtoList.splice(o, 1);
            //     this.select_projects = JSON.parse(JSON.stringify(this.select_projects))
            //     setTimeout(() => {
            //       this.isCheck = false;
            //     }, 100)
            //   }
            // })

            this.holdDeleteProjectAgreement.push(list)
            this.select_projects[index].orderPaymentAgreementDtoList.splice(o, 1);
            this.select_projects = JSON.parse(JSON.stringify(this.select_projects))
            setTimeout(() => {
              this.isCheck = false;
            }, 100)
          } else {
            this.select_projects[index].orderPaymentAgreementDtoList.splice(o, 1);
            this.select_projects = JSON.parse(JSON.stringify(this.select_projects))
          }
        })
      },

      delProjectAgreement(agreementId){
        deleteAgreement({agreementId: agreementId}).then(res => {
          if (res.code == 200) {
          }
        })
      },

      //如果变化清除值
      payMoneyHandle(item) {
        this.$set(item, 'paymentPrice', '')
      },

      //关闭新增收款弹窗
      cancelPay() {
        this.payMethodDialogVisible = false;
        this.payForm = {};
        this.$refs['payForm'].clearValidate();  //清除校验
      },

      //打开版本弹窗
      openVersion(item, index) {
        this.versionDialogVisible = true;
        this.processList = item;
        this.versionNum = index;

        this.contractForm.withDrawProcessVoList.forEach((list, i) => {
          if (index - 1 == i) {
            this.showProv = true
          }

          if (index + 1 == i) {
            this.showNext = true
          }
        })

        if (this.processList.length > 0) {
          this.processList.forEach(item => {
            if (item.userName) {
              item.nameHead = item.userName.substr(0, 1)
            }
          })
        }
      },
      //关闭版本弹窗
      closeVersion() {
        this.versionDialogVisible = false;
        this.showProv = false;
        this.showNext = false;
        this.processList = [];
      },

      //上一版本
      prevVersion() {
        if (this.versionNum - 1 <= this.contractForm.withDrawProcessVoList.length - 1 && this.versionNum - 1 >= 0) {
          // this.versionNum = this.versionNum-1;
          this.versionNum = this.versionNum - 1
          this.showProv = true
        }

        if (this.versionNum + 1 <= this.contractForm.withDrawProcessVoList.length - 1) {
          this.showNext = true
        }

        this.contractForm.withDrawProcessVoList.forEach((item, index) => {
          if (this.versionNum == index) {
            this.processList = item;
          }

          // if(this.versionNum-1 != index){
          //   if(item){
          //     this.showProv = true
          //   }
          // }
          // if(this.versionNum+1 == index){
          //   if(item){
          //     this.showNext = true
          //   }
          // }
        })
      },

      //下一版本
      nextVersion() {
        if (this.versionNum + 1 <= this.contractForm.withDrawProcessVoList.length - 1) {
          this.versionNum = this.versionNum + 1;
          this.showNext = true
        }

        if (this.versionNum - 1 <= this.contractForm.withDrawProcessVoList.length - 1 && this.versionNum - 1 >= 0) {
          // this.versionNum = this.versionNum-1;
          this.showProv = true
        }

        this.contractForm.withDrawProcessVoList.forEach((item, index) => {
          if (this.versionNum == index) {
            this.processList = item;
          }

          // if(this.versionNum-1 ==` index){
          //   console.log('00',item)
          //   if(item){
          //     this.showProv = true
          //   }else{
          //     this.showProv = false
          //   }
          // }
          // if(this.versionNum+1 == index){
          //   if(item){
          //     this.showNext = true
          //   }else{
          //     this.showNext = false
          //   }
          // }
        })
      },

      //单价失去焦点
      totalMoneyBlur($event,item){
        if(item.typeMoney == 1){
          if(item.orderPaymentAgreementDtoList[0].paymentPrice == '' || item.orderPaymentAgreementDtoList[0].paymentPrice == undefined){
            // item.orderPaymentAgreementDtoList[0].paymentPrice = item.applyNum * item.unitPrice
            if(item.applyNum != undefined && item.unitPrice != undefined){
              this.$set(item.orderPaymentAgreementDtoList[0], 'paymentPrice', item.applyNum * item.unitPrice)
            }
          }
        }else{
          if(item.applyNum != undefined && item.unitPrice != undefined){
            this.$set(item.orderPaymentAgreementDtoList[0], 'paymentPrice', item.unitPrice)
          }
        }

      },

      newOrOldChange(e){
        if(e == true){
          this.contractForm.newOrOld = 0;
        }else{
          this.contractForm.newOrOld = 1;
        }
      },

      isProxyChange(e){
        if(e == 0){
          this.select_projects.forEach(item=>{
            this.$set(item, 'proxyPrice', '')
          })
        }
      },

      isOutsourceChange(e){
        if(e == 0){
          this.$set(this.contractForm, 'outsourceCompanyName', '')
          this.select_projects.forEach(item=>{
            this.$set(item, 'outsourcePrice', '')
          })
        }
      },
    }
  }
</script>

<style lang="less" scoped>

 .setgoto{
      /deep/.el-icon-close {
      display: none;
    }
 }
.classPointer{
  cursor: pointer;
  color:rgba(105, 204, 255, 1);

}


  .right-margin-30 {
    margin-right: 30px !important;
  }

  .bottom-margin-10 {
    margin-bottom: 10px;
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
    flex-wrap: wrap;
  }



  /deep/ .el-message-box{
    //  {
    // //   display:none;
    // // }

  }
  /deep/ .el-form-item__label {
    min-width: 120px;
    font-weight: normal;
    line-height: initial;
    display: flex;
    justify-content: flex-end;
  }

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }

  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 5%;
  }

  /deep/ .el-card__header {
    /*padding: 10px 20px;*/
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    display: flex;
    align-items: center;

    .conditionChoose {
      font-size: 16px;
      color: #444 !important;

      &::before {
        content: '';
        border-left: 2px solid rgb(3, 173, 244);
        margin-right: 15px;
      }
    }
  }

  span {
    font-size: 14px;
    color: rgba(68, 68, 68, 0.75);

    span {
      color: #F56C6C;
    }
  }


  .contractCont {
    display: flex;

    .contractLeft {
      font-size: 18px;
      width: 80px;
      height: 80px;
      opacity: 1;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin-right: 20px;
      box-sizing: border-box;
      white-space: pre-wrap;
      word-break: break-all;
      padding: 20px;
      background: rgba(105, 204, 255, 1);
    }

    .contractRig {
      flex: 1;
        /deep/ .el-input__inner, /deep/ .el-input-group__append{
          // border: 0;
          // border-radius: 0;
          // background:#fff;
          // border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);
          // width: 200px;
        }
        /deep/ .el-form-item__label{
          line-height: 32px;
          height: 32px;
        }
        /deep/ .el-form-item{
          line-height: 32px;
          height: 32px;
        }

    }
  }

  .boxProject {
    margin-top: 10px;

    .conditionChoose {
      &::before {
        content: '';
        border-left: 2px solid rgb(72, 212, 98);
        margin-right: 15px;
      }
    }

    .contractProject {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;

      .proNum {
        min-width: 20px;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background: #799cff;
        margin-right: 10px;
      }

      .projectBox {
        width: 100%;

        .projectBoxFirst {
          /*display: flex;*/
          font-size: 12px;
          /*flex-wrap: wrap;*/
          /*align-items: center;*/
          margin-bottom: 10px;
          /*margin-top: -4px;*/
          width: 100%;
        }

        .projectBoxSecond {
          border-bottom: 1px solid #e3e3e3;

          .projectPay {
            display: flex;
            font-size: 14px;
            align-items: center;
            padding-bottom: 10px;

            p {
              color: #00A5FF;
              margin-right: 15px;
            }
          }

          .projectPayList {
            .projectPayBox {
              display: flex;
              align-items: center;
              margin-bottom: 10px;

              p {
                margin-right: 20px;
                /*width: 15%;*/
                font-size:12px;
                display: flex;
                align-items: center;
                span{
                  width: auto;
                }
                .el-input,.el-select{
                  flex:1;
                }
              }
            }
          }
        }

        .projectData {
          display: flex;
          margin-right: 10px;
          /*justify-content: center;*/
          align-items: center;
          white-space: nowrap;

          /deep/ .el-input {
            width: auto;
          }

          /deep/ .el-select {
            margin-right: 10px;
          }

          /deep/ .el-input__inner {
            /*width: 100px;*/
          }

          .radio-type {
            /deep/ .el-radio {
              margin-right: 10px;
            }
          }

        }

        .address-level {
          display: flex;
          align-items: center;

          .star {
            display: inline-block;
          }

          .address-level-title {
            font-size: 12px;
            color: #303133;
            margin-left: 10px;
            position: relative;
          }
        }

        .address-select {
          margin-right: 10px;

          /deep/ .el-input__inner {
            height: 32px;
          }

          /deep/ .el-input__icon {
            line-height: 32px;
          }
        }

        .number-input {
          /deep/ .el-input__inner {
            height: 32px;
          }
        }
      }

      .delete {
        white-space: nowrap;
        color: #ff5459;
        cursor: pointer;
      }
    }
  }

  .editBtn {
    margin-left: 10px;
    cursor: pointer;
  }

  .tableMore {
    text-align: center;
    padding: 12px 0;
    border: 1px solid #EBEEF5;
    border-top: 0;
    cursor: pointer;
  }

  .sign-order-table, .project-table, .company-table {
    /deep/ .el-table__body-wrapper {
      height: 300px;
      overflow-y: auto;
    }
  }

  .file-down-box {
    /deep/ .el-form-item__content {
      display: block;
    }
  }

  .file-down-group {
    color: #69ccff;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .project-modal {
    /deep/ .el-dialog__body {
      padding: 10px 20px;
    }

    .search-num {
      font-size: 14px;
      margin-bottom: 10px;

      .num {
        color: rgb(249, 169, 169);
      }
    }

    .dialog-footer {
      .sub-btn {
        background: #05AAFF;
        color: #fff;
      }
    }

    .get-more {
      margin-top: 10px;
      text-align: center;

      span {
        cursor: pointer;
      }
    }

    .project-table {
      /deep/ .el-table__body-wrapper {
        max-height: 300px;
        overflow-y: auto;
      }
    }
  }

  .projectChoose {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    /deep/ .el-select {
      margin-right: 10px;
    }
  }

  /deep/ .el-table thead tr th .el-checkbox__input {
    display: none;
  }

  .orderEntTable, .channelTable {
    /deep/ .el-radio__label {
      display: none;
    }
  }

  .moreBat {
    background: #05AAFF;
    color: #fff;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 10px;
  }

  .address-input {
    margin-right: 10px;
  }

  .contractProcess {
    display: flex;
    position: relative;
    padding: 0 50px;

    .threeJx {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 14px solid rgba(68, 68, 68, 0.4);
      /*margin:0px 5px;*/
    }

    .contractProcessTheBox {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;

      .contractProcessBox {
        border-radius: 4px;
        border: 1px solid rgba(68, 68, 68, 0.4);
        min-width: 175px;
        width: 100%;
        height: 100%;
        margin: 0 5px;

        .processHeader {
          padding: 10px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          background: rgba(68, 68, 68, 0.4);
          color: #fff;
          display: flex;
          justify-content: space-between;

          span {
            color: #fff;
          }
        }

        .processCont {
          padding: 10px;
          position: relative;

          .processUserName {
            display: flex;
            margin-bottom: 10px;

            span {
              width: 20px;
              height: 20px;
              border-radius: 100%;
              background: rgba(68, 68, 68, 0.4);
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
            }

            p {
              font-size: 14px;
              color: rgba(68, 68, 68, 0.4);
              margin-left: 10px;
              font-weight: bold;
            }
          }

          .processMsg {
            p {
              /*margin-top:10px;*/
              font-size: 12px;
              text-align: left;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              line-height: 20px;

              span {
                color: rgba(68, 68, 68, 0.4);
              }
            }
          }

          .processBtn {
            button {
              margin-top: 10px;
            }
          }

          img {
            position: absolute;
            top: 5px;
            width: 30%;
            right: 10px;
          }
        }
      }
    }

    .processBlue {
      .threeJx {
        border-left: 14px solid #05AAFF;
      }

      .contractProcessBox {
        border: 1px solid #05AAFF;

        .processHeader {
          background: #05AAFF;
        }

        .processCont {
          .processUserName {
            span {
              background: #05AAFF;
            }

            p {
              color: #05AAFF;
            }
          }
        }
      }
    }

    .processOrgin {
      .threeJx {
        border-left: 14px solid #FFA96A;
      }

      .contractProcessBox {
        border: 1px solid #FFA96A;

        .processHeader {
          background: #FFA96A;
        }

        .processCont {
          .processUserName {
            margin-bottom: 10px;

            span {
              background: #FFA96A;
            }

            p {
              color: #FFA96A;
            }
          }
        }
      }
    }

    .processRed {
      .threeJx {
        border-left: 14px solid #ff5359;
      }

      .contractProcessBox {
        border: 1px solid #ff5359;

        .processHeader {
          background: #ff5359;
        }

        .processCont {
          .processUserName {
            span {
              background: #ff5359;
            }

            p {
              color: #ff5359;
            }
          }
        }
      }
    }
  }

  .swiper-slide {
    &:first-child .threeJx {
      display: none;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    line-height: 200px;
    margin: 0;
    background: #ccc;
  }

  .swiper-container {
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    padding: 1px 0;
  }

  .swiper-slide {
    text-align: center;
    background: #fff;
    height: 100%;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition-property: all;
  }

  .swiper-button-prev {
    height: 100%;
    top: 0;
    border: 2px solid #38aef3;
    background: #38aef338;
    font-size: 16px;
    margin: 0 auto;

    &::after {
      display: none;
    }
  }

  .swiper-button-next {
    height: 100%;
    top: 0;
    border: 2px solid #38aef3;
    background: #38aef338;
    font-size: 16px;
    margin: 0 auto;

    &::after {
      display: none;
    }
  }

  /deep/ .el-dialog__body {
    .el-form-item__label {
      min-width: auto;
    }
  }

  .dialogProcess {
    .contractProcess {
      padding: 0;
      flex-wrap: wrap;

      .contractProcessTheBox {
        width: auto;
        margin-bottom: 10px;
      }
    }
  }

  .versionNextProv {
    text-align: center;
    margin-top: 10px;

    span {
      cursor: pointer;
    }
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

 /deep/ .icon-tip{
   right: -10px !important;
   top: -10px !important;
 }

 /deep/ .el-select{
   width: 100%;
 }

 /*/deep/ .el-input-group__append{*/
 /*  padding: 0 6px;*/
 /*}*/

 /*/deep/ .el-input__inner{*/
 /*  padding: 0 5px;*/
 /*}*/

 /deep/ .el-date-editor{
   width:100%;
 /*  /deep/ .el-input__inner{*/
 /*    padding: 0 30px;*/
 /*  }*/
 }
</style>
