<!--立项管理-->
<template>
  <div class="app-container">
    <div class="">
      <el-card class="box-card">
        <div class="searchCont">
          <el-input v-model.trim="approvalForm.companyAndProjectName" placeholder="输入企业名称/项目名称"
                    @keyup.enter.native="goSearch"></el-input>
          <el-button type="primary" class="btn bt_blue" @click="goSearch"><span class="bt_font">搜一下</span>
          </el-button>
          <el-button type="primary" class="btn bt_blue addBtn" @click="getApprovalTemplate"
                     v-if="allowGetImport.twoAllow"><span class="bt_font">获取模板</span></el-button>
          <el-upload
            v-if="allowImport.twoAllow"
            class="upload-demo"
            :action="UploadUrl()"
            :limit=limitNum
            :show-file-list="false"
            :auto-upload="false"
            :on-change="fileChange"
            :disabled="exportShow"
            :file-list="fileList">
            <el-button type="primary" class="btn bt_blue addBtn" :disabled="exportShow"><span class="bt_font">导入</span></el-button>
          </el-upload>
        </div>
      </el-card>

      <el-alert
        v-if="exportShow"
        title="正在导入文件，请稍等..."
        style="margin-bottom:10px;"
        type="warning"
        effect="dark">
      </el-alert>

      <el-alert
        v-if="exportFailShow"
        :title="exportFailMsg.taskTitle"
        type="error"
        effect="dark"
        style="margin-bottom:10px;"
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
                <el-select size="small" v-model="approvalForm.signCompanyId" placeholder="签约公司" clearable
                           @change="signCompanyChange">
                  <el-option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="approvalForm.deptIds" multiple placeholder="选择部门" clearable
                           v-if="allowGetDeptList.twoAllow"
                           @change="deptmentChange">
                  <el-option
                    v-for="item in deptmentList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="approvalForm.userIds" multiple placeholder="选择员工" clearable filterable
                           @change="userChange">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="approvalForm.engineerUserIds" multiple placeholder="项目工程师" clearable
                           @change="engineerUser">
                  <el-option
                    v-for="item in projectPersonList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="approvalForm.auditUserIds" multiple placeholder="审计人员" clearable
                           @change="auditUserChange">
                  <el-option
                    v-for="item in auditPersonList"
                    :key="item.userId"
                    :label="item.userName"
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
                           :loading="loading" size="small" v-model="approvalForm.projectNames" placeholder="项目"
                           clearable @change="projectChange">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectName"
                    :label="item.projectName"
                    :value="item.projectName">
                  </el-option>
                </el-select>
                <el-date-picker
                  clearable
                  @change="yearChange"
                  size="small"
                  v-model="approvalForm.year"
                  type="year"
                  value-format="yyyy"
                  placeholder="项目年度">
                </el-date-picker>
                <el-select size="small" @change="applyLevelChange" v-model="approvalForm.applyLevel" placeholder="项目级别" clearable>
                  <el-option
                    v-for="item in projectLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

                <el-select size="small" @change='changeTitleSeries' v-model="approvalForm.titleSeries" placeholder="职称系列" clearable>
                  <el-option v-for="item in titleSeriesList" :label="item.dictName" :value="item.dictId" :key="item.dictId"></el-option>
                </el-select>

                <el-select size="small" @change="batchNoChange" v-model="approvalForm.projectBatchNo" placeholder="批次"
                           clearable>
                  <el-option
                    v-for="item in batchNoList"
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
                <span>地区：</span>
                <el-select @change='changeProvince' size="small" v-model="approvalForm.provinceId" placeholder="省份"
                           clearable>
                  <el-option
                    v-for="item in provinceList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select @change='changeCity' size="small" v-model="approvalForm.cityId" placeholder="城市" clearable>
                  <el-option
                    v-for="item in cityList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select @change="changeDistrict" size="small" v-model="approvalForm.districtId" placeholder="县区"
                           clearable>
                  <el-option
                    v-for="item in districtList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select @change="changeTown" size="small" v-model="approvalForm.townId" placeholder="镇街" clearable>
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
                <!--                <dateSelect-->
                <!--                  @change="signDateChange"-->
                <!--                  ref="submitOnlineEnd"-->
                <!--                  :inputName="'签单时间'"-->
                <!--                  :dateList="dateList"-->
                <!--                  :rangeDateName="signOffTime"-->
                <!--                  @handleDate="handleDate"-->
                <!--                  @handleClearDate="handleClearDate"-->
                <!--                  @handleDateRange="handleDateRange"-->
                <!--                >-->
                <!--                </dateSelect>-->
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
                <span>录入合同时间：</span>
                <!--                <dateSelect-->
                <!--                  ref="submitOnlineEnd"-->
                <!--                  :inputName="'录入合同时间'"-->
                <!--                  :dateList="dateList"-->
                <!--                  :rangeDateName="signOffTime"-->
                <!--                  @handleDate="handleDate"-->
                <!--                  @handleClearDate="handleClearDate"-->
                <!--                  @handleDateRange="handleDateRange"-->
                <!--                >-->
                <!--                </dateSelect>-->
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
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>项目类型：</span>
                <el-radio-group @change="projectTypeChange" v-model="approvalForm.projectType">
                  <el-radio v-for="item in projectTypeList" :label="item.dictId" :value="item.dictId"
                            :key="item.dictId">
                    {{item.dictName}}
                  </el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>类型：</span>
                <el-select size="small" @change="newOrOldChange" v-model="approvalForm.newOrOld" placeholder="新老客户"
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
                <el-select @change="companyLeveChange" size="small" v-model="approvalForm.companyLevel"
                           placeholder="客户级别" clearable>
                  <el-option
                    v-for="item in companyLevelList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select @change="isSigningChange" size="small" v-model="approvalForm.isSigning" placeholder="是否签单"
                           clearable>
                  <el-option
                    label="否"
                    :value="0">
                  </el-option>
                  <el-option
                    label="是"
                    :value="1">
                  </el-option>
                </el-select>
                <el-select @change="isChannelChange" size="small" v-model="approvalForm.isChannel" placeholder="是否渠道单"
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
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span>搜索到<span>{{total}}</span>条记录</span>
            <span style="margin-left: 10px;"
                  v-if="approvalCheckList.length > 0">已选中<span>{{approvalCheckList.length}}</span>条记录</span>
            <div class="headBtn">
                            <el-button type="primary" class="btn allChoose" size="small" @click="allSelect">全选</el-button>
              <el-button type="primary" class="btn allDelete" size="small" @click="allDelete">删除</el-button>
            </div>
          </div>
          <div class="headerRig">
            <el-select v-model="sort" placeholder="默认排序" @change="handledSelect" clearable>
              <el-option
                v-for="(item,index) in sortList"
                :key="index"
                :label="item.label"
                :value="index">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="dataList">
          <el-checkbox-group v-model="approvalCheckList">
            <div class="dataBox" v-for="item in approvalList">
              <div class="dataBoxLeft">
                <div class="dataLeft">
                  <div class="fileType fileDoc" :style="`background:${item.bgColor}`">企业简称</div>
                  <div class="dataDetail">
                    <div class="titleData" @click="goCompanyDatail(item)">
                      <p style="cursor: pointer">{{item.companyName}}</p>
                      <img v-if="item.companyLevelName == '优质客户'" src="@/views/icons/enterprise/customer_2.png"/>
                      <img v-if="item.companyLevelName == '重点客户'" src="@/views/icons/enterprise/customer_3.png"/>
                    </div>
                    <div class="projectList">
                      <div class="projectBox" v-for="(data,index) in item.innerProjectInfoList">
                        <el-checkbox :label="data.approvalId" @change="checkApprovalChange($event, data)">
                          <div class="projectLeft">
                            <span class="proNum">{{index+1}}</span>
                            <div class="projectMsg">
                              <div class="leftBox">
                                <h4>项目名称：{{data.projectName ? data.projectName : '-'}}</h4>
                                <h4>签约公司：{{data.signCompanyName && data.signCompanyName !==
                                  ''?data.signCompanyName:'其他'}}</h4>
                                <h4>签订人：{{data.signUserName&&data.signUserName!==''?data.signUserName:'-'}}</h4>
                                <h4>工程师：{{data.engineerUserName ? data.engineerUserName : '-'}}</h4>
                              </div>
                              <div class="leftBox">
                                <!--                                <h4>是否需要验收：否</h4>-->
                                <h4>立项日期：{{data.approvalDate ? data.approvalDate : '-'}}</h4>
                                <h4>扶持标准：{{data.subsidyTota > 99999999 ? data.subsidyTota / 100000000 + '亿' : data.subsidyTotal&&data.subsidyTotal!==''?data.subsidyTotal / 10000 + '万元' : '0元'}}</h4>
                                <h4>批准金额：{{data.approvalMoney > 99999999 ? data.approvalMoney / 100000000 + '亿' : data.approvalMoney&&data.approvalMoney!==''?data.approvalMoney / 10000 + '万元' : '0元'}}</h4>
                              </div>
                              <div class="leftBox">
                                <h4>中期检查日期：-</h4>
                                <h4>结题检查日期：-</h4>
                              </div>
                            </div>
                          </div>
                          <div class="projectRig">
                            <el-button size="small" type="primary" @click="goDetail(data.approvalId,data.projectId)">
                              查看
                            </el-button>
                            <el-button size="small" type="primary" @click="goEdit(data.approvalId,data.projectId)">
                              编辑
                            </el-button>
                          </div>
                        </el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dataBoxRig">
                <div class="btnMt">
                  <el-button class="origin" size="small" @click="handleShowConnectContentList(item.companyId)">跟进
                  </el-button>
                </div>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div class="noMore" style="cursor:pointer;" v-if="total - approvalList.length > 0" @click="getMore">
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

      <!--跟进消息-->
      <el-dialog title="跟进消息" class="chat-modal" :visible.sync="ConnectContentDialogVisible" width="40%" v-dialogDrag>
        <div class="dialog-box">
          <div class="dialog" ref="dialog">
            <div class="has-more-news" v-if="isShowMoreNews" @click="getMoreChar"><span>查看更多消息</span></div>
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
                           :file-list="fileTemps"
                           :on-remove="handleRemove"
                           :on-change="chatFileChange"
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
  </div>
</template>

<script>
  import dateSelect from '../../components/timeMoneySelect/dateSelect'
  import {getApprovalListTemplate, importApprovalListForTemplate, queryApprovalListAndDetail,deletePolicyApproval} from '@/api/approval'
  import {queryUserComboInfo} from '@/api/customerCenter'
  import {getDepartmentTree} from '@/api/department.js'
  import {downloadPolicy, commonDictOfRegion, commonDict, queryTaskProcessInfo} from '@/api/utils'
  import {queryMessageList, deleteChatById, addChat, addChatFile} from '@/api/messageCenter'
  import {queryCompany} from '@/api/contractManage'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'

  export default {
    components: {
      dateSelect
    },
    data() {
      return {
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
          }
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
        fileList: [],
        limitNum: 1,
        fileTemp: '',
        approvalForm: {
          page: 0,
          pageSize: 20,
          provinceId: '',
          cityId: '',
          districtId: '',
          townId: ''
        },
        approvalList: [],
        approvalCheckList: [],
        total: 0,
        isCheckAll: false,
        sortList: [
          {label: '客户级别顺序', value: 'companyLevel', key: 'ASC'},
          {label: '客户级别倒序', value: 'companyLevel', key: 'DESC'},
          {label: '项目库创建顺序', value: 'createTime', key: 'ASC'},
          {label: '项目库创建倒序', value: 'createTime', key: 'DESC'}
        ],
        sort: '',
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
        titleSeriesList: [],
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],


        selectConditionsList: {},
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
        signDate: '',
        createTime: '',
        projectTypeList: [],
        companyLevelList: [],
        companyList: [],
        deptmentList: [],
        userList: [],
        projectPersonList: [],
        auditPersonList: [],

        //跟进--对话窗口
        ConnectContentDialogVisible: false,
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
        fileTemps: [],

        projectForm:{
          page:0,
          pageSize:20,
          orderField:'sales',
          orderType: 'DESC'
        },
        loading: false,
        exportShow: false,
        exportFailShow: false,
        exportSuccessShow: false,
        exportFailMsg:{},
        exportSuccessMsg:{},
        holdDelList:[],
        projectList:[],

        allowGetList: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY', 'SYSTEM:SYNERGY:MANAGE', 'SYSTEM:SYNERGY:MANAGE:LIST'),//立项列表
        allowAddOrderProcess: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY', 'SYSTEM:SYNERGY:MANAGE', 'SYSTEM:SYNERGY:ORDERPROCESS:LIST'),//订单处理-添加立项信息
        allowGetImport: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY', 'SYSTEM:SYNERGY:MANAGE', 'SYSTEM:SYNERGY:ORDERPROCESS:GETTEMPLATE'),//获取导入立项名单模板
        allowImport: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY', 'SYSTEM:SYNERGY:MANAGE', 'SYSTEM:SYNERGY:ORDERPROCESS:IMPORT'),//导入立项名单信息

        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
      }
    },
    directives: {
      loadMore: {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
          SELECTWRAP_DOM.addEventListener('scroll', function() {

            const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
            if (CONDITION) {
              binding.value()
            }
          })
        }
      }
    },
    activated() {
      if (localStorage.getItem('searchName')) {
        if (localStorage.getItem('searchName') !== '') {
          this.approvalForm = {page: 0, pageSize: 10, provinceId: '', cityId: '', districtId: '', townId: ''};
          this.selectConditionsList = {};
          this.$set(this.approvalForm, 'companyAndProjectName', localStorage.getItem('searchName'));
        }
      }
      window.addEventListener('scroll', this.scrollToTop);

      if(this.$store.getters.approvalTaskMsg && this.$store.getters.approvalTaskMsg.taskId){
        this.getTaskInfo();
      }

      if(this.$store.getters.approvalPage != 0){
        this.approvalForm.page = 0;
        this.approvalForm.pageSize = this.$store.getters.approvalPage + 20;
        this.getApprovalList()
      }else{
        this.approvalForm.page = this.$store.getters.approvalPage;
        this.approvalForm.pageSize = 20;
        this.getApprovalList()
      }

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.approvalScroll //返回页面取出来
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
      this.$store.commit('SET_APPROVAL_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_APPROVAL_PAGE', this.approvalForm.page) //离开路由时把位置存起来
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

      //检测导入的文件是否上传完成
      getTaskInfo(){
        queryTaskProcessInfo({taskId: this.$store.getters.approvalTaskMsg.taskId}).then(res=>{
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
              this.$store.commit('SET_APPROVAL_TASKMSG', taskMsg);
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
              this.$store.commit('SET_APPROVAL_TASKMSG', taskMsg);
            }else{
              this.exportShow = false;
              this.exportFailShow = false;
              this.exportSuccessShow = false;
              this.exportFailMsg = {};
              this.exportSuccessMsg = {};
              this.$store.commit('SET_APPROVAL_TASKMSG', {});
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
        this.$store.commit('SET_APPROVAL_TASKMSG', {});
      },

      //关闭成功提示
      closeExportSuccess(){
        this.exportShow = false;
        this.exportFailShow = false;
        this.exportSuccessShow = false;
        this.exportSuccessMsg = {};
        this.$store.commit('SET_APPROVAL_TASKMSG', {});
      },

      //获取列表
      getApprovalList() {
        if (this.allowGetList.twoAllow) {
          queryApprovalListAndDetail(this.approvalForm).then(res => {
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

              if (this.approvalForm.page > 0) {
                this.approvalList = this.approvalList.concat(newRes)
                this.total = res.data.total
              } else {
                this.approvalList = newRes
                this.total = res.data.total
                this.approvalCheckList = [];

                if(this.$store.getters.approvalPage != 0){
                  this.approvalForm.page = this.$store.getters.approvalPage;
                  this.approvalForm.pageSize = 20;
                }
              }

              let obj = {}
              this.approvalList = this.approvalList.reduce((cur, next) => {
                obj[next.companyId] ? '' : obj[next.companyId] = true && cur.push(next)
                return cur
              }, [])
            } else {
              this.$message.warning(res.message)
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取列表')
        }
      },

      //搜索
      goSearch() {
        this.approvalForm.page = 0
        this.getApprovalList();
      },

      //跳转查看详情
      goDetail(id, projectId) {
        this.$router.push({
          path: '/approvalCollaborative/approvalDetail',
          query: {
            approvalId: id,
            projectId: projectId
          }
        })
      },
      // 跳转编辑立项
      goEdit(id, projectId) {
        this.$router.push({
          path: '/approvalCollaborative/approvalDetail',
          query: {
            approvalId: id,
            projectId: projectId,
            isEdit: true
          }
        })
      },

      //获取更多
      getMore() {
        this.approvalForm.page = this.approvalForm.page + 20
        // this.approvalForm.pageSize = this.approvalForm.pageSize + 10
        this.getApprovalList()
      },

      //全选
      allSelect() {
        if (this.isCheckAll) {
          this.approvalCheckList = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.approvalList.forEach(function (item, index) {
            item.innerProjectInfoList.forEach(list=>{
              if (_this.approvalCheckList.indexOf(list.approvalId) === -1) {
                _this.approvalCheckList.push(list.approvalId)
              }
              _this.isCheckAll = true
            })
          })
        }
      },

      //删除指定立项
      allDelete(){
        if(this.approvalCheckList.length == 0 || this.approvalCheckList == ''){
          this.$message.warning('请最少选择一条');
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

        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePolicyApproval({approvalIds:this.approvalCheckList}).then(res=>{
            if(res.code == 200){
              this.$message.success('删除成功');
              this.approvalForm.page = 0;
              this.holdDelList = [];
              this.getApprovalList()
            }
          })
        })
      },

      //排序
      handledSelect(e) {
        this.sortList.forEach((item, index) => {
          if (index == e) {
            this.approvalForm.orderField = item.value
            this.approvalForm.orderType = item.key
            this.approvalForm.page = 0
            this.approvalForm.pageSize = 20
          }
        })

        this.getApprovalList()
      },

      //获取模板
      getApprovalTemplate() {
        getApprovalListTemplate({}).then(res => {
          if (res.code == 200) {
            downloadPolicy({fileName: res.data, delete: true}).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()
              const fileName = date + '-立项列表模板' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)
            })
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //导入
      UploadUrl() {
        return '/api/policy/policyApprovalList/importApprovalListForTemplate'
      },
      fileChange(file) {
        this.fileTemp = ''
        this.fileList = []

        this.fileTemp = file.raw
        if (this.fileTemp) {
          const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
          if (extension !== 'xlsx') {
            this.$message.warning('只能上传后缀是.xlsx的文件')
            this.fileTemp = ''
            this.fileList = []
          } else {
            this.importApproval(this.fileTemp)
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请上传文件！'
          })
          this.fileTemp = ''
          this.fileList = []
        }
      },
      importApproval(obj) {
        const formData = new FormData()
        formData.append('file', obj)
        importApprovalListForTemplate(formData).then(res => {
          if (res.code == 200) {
            this.fileTemp = ''
            this.fileList = []
            this.$message({
              type: 'success',
              message: res.message
            })

            this.exportFailShow = false;
            this.exportFailMsg = {};

            let taskMsg = {
              taskId: res.data.taskId
            };

            this.$store.commit('SET_APPROVAL_TASKMSG', taskMsg);
            this.exportShow = true;
            this.getTaskInfo();
            this.getApprovalList();
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
        this.fileTemp = ''
        this.fileList = []
      },

      //打开筛选框
      openCond() {
        this.moreCondition = !this.moreCondition
        this.userList = [];
        this.getProjectList();
        this.getRegionList()
        this.getCommonData()
        this.getCompanyList()
        this.getDepartmentList()
        this.getTitleSeries()
        this.getPersonList('项目员')
        this.getPersonList('审计员')
        this.getPersonList('业务员,业务主管')
      },

      // 获取职称系列
      getTitleSeries() {
        queryTitleSeriesOrLevel().then(res =>{
          if (res.code === 200){
            this.titleSeriesList = res.data
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

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PROJECT_TYPE,DICT:CUSTOMER_LEVEL',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.projectTypeList = res.data['DICT:PROJECT_TYPE']
            this.companyLevelList = res.data['DICT:CUSTOMER_LEVEL']
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取签约公司
      getCompanyList() {
        queryCompany().then(res => {
          if (res.code == 200) {
            this.companyList = res.data;
          } else {
            this.$message({type: 'error', message: res.message});
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

      //根据角色获取人员列表
      getPersonList(name,deptIds) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if(deptIds != undefined){
          formData.append('deptIdList',deptIds)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            if (name == '业务员,业务主管') {
              this.userList = res.data;
            }
            if (name == '项目员') {
              this.projectPersonList = res.data;
            }
            if (name == '审计员') {
              this.auditPersonList = res.data;
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //获取项目列表
      getProjectList(query) {
        if(query){
          this.projectForm.projectName = query;
        }else{
          this.projectForm.projectName = '';
        }
        queryAll(this.projectForm).then(response => {
          if(response.code == 200){
            if(this.projectForm.page > 0){
              this.projectList = this.projectList.concat(response.data.data)
            }else{
              this.projectList = response.data.data
            }
          }else{
            this.$message.warning(response.message)
          }
        })
      },

      //远程搜索
      projectListMethod(query){
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

      projectChange(val){
        const arr = []
        if (val.length != 0) {
          this.projectList.forEach(item => {
            val.forEach(val => {
              if (item.projectName == val) {
                arr.push(item.projectName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'projectNames',  `项目 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'projectNames')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      yearChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'year', '项目年度 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'year')
        }
        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      applyLevelChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'applyLevel', '项目级别 - ' + this.projectLevelList.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'applyLevel')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      batchNoChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'projectBatchNo', '批次 - ' + this.batchNoList.find(ele => ele.value === val).label)
        } else {
          this.$delete(this.selectConditionsList, 'projectBatchNo')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      changeTitleSeries(val) {
        if (val) {
          this.titleSeriesList.forEach(item => {
            if (item.dictId == val) {
              this.$set(this.selectConditionsList, 'titleSeries', '职称系列 - ' + item.dictName)
            }
          })
        } else {
          this.$delete(this.selectConditionsList, 'titleSeries')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      changeProvince(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'provinceId', '省份 - ' + this.provinceList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'provinceId')
        }

        this.$delete(this.selectConditionsList, 'cityId')
        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.parentId = val
        this.level = 2
        this.getRegionList()
        this.getApprovalList()
      },
      changeCity(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'cityId', '城市 - ' + this.cityList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'cityId')
        }

        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.parentId = val
        this.level = 1
        this.getRegionList()
        this.getApprovalList()
      },
      changeDistrict(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'districtId', '区县 - ' + this.districtList.find(ele => ele.dictId === val).dictName)
          this.$delete(this.selectConditionsList, 'townId')
        } else {
          this.$delete(this.selectConditionsList, 'districtId')
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.parentId = val
        this.level = 0
        this.getRegionList()
        this.getApprovalList()
      },
      changeTown(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'townId', '镇街 - ' + this.townList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      signDateChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signDate', '签单时间 - ' + val[0] + '-' + val[1])
          this.approvalForm.signDateStart = val[0];
          this.approvalForm.signDateEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'signDate')
          this.approvalForm.signDateStart = '';
          this.approvalForm.signDateEnd = '';
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      createTimeChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'createTime', '录入合同时间 - ' + val[0] + '-' + val[1])
          this.approvalForm.createTimeStart = val[0];
          this.approvalForm.createTimeEnd = val[1];
        } else {
          this.$delete(this.selectConditionsList, 'createTime')
          this.approvalForm.createTimeStart = '';
          this.approvalForm.createTimeEnd = '';
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      projectTypeChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'projectType', '项目类型 - ' + this.projectTypeList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'projectType')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      companyLeveChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'companyLevel', '客户级别 - ' + this.companyLevelList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'companyLevel')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      newOrOldChange(val) {
        var name = val == '0' ? '新客户' : val == '1' ? '老客户' : undefined;
        if (name != undefined) {
          this.$set(this.selectConditionsList, 'newOrOld', '新老客户 - ' + name)
        } else {
          this.$delete(this.selectConditionsList, 'newOrOld')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      isSigningChange(val) {
        var name = val == '0' ? '否' : val == '1' ? '是' : undefined;
        if (name != undefined) {
          this.$set(this.selectConditionsList, 'isSigning', '签单 - ' + name)
        } else {
          this.$delete(this.selectConditionsList, 'isSigning')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      isChannelChange(val) {
        var name = val == '0' ? '不是' : val == '1' ? '是' : undefined;
        if (name != undefined) {
          this.$set(this.selectConditionsList, 'isChannel', '是否渠道单 - ' + name)
        } else {
          this.$delete(this.selectConditionsList, 'isChannel')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      signCompanyChange(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'signCompanyId', '签约公司 - ' + this.companyList.find(ele => ele.companyId === val).companyName)
        } else {
          this.$delete(this.selectConditionsList, 'signCompanyId')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      deptmentChange(val) {
        const arr = []
        if (val.length != 0) {
          this.deptmentList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'deptIds', `部门 - ${string}`)
              }
            })
          })

        } else {
          this.$delete(this.selectConditionsList, 'deptIds')
          this.$delete(this.selectConditionsList, 'userIds')
          this.userList = [];
        }

        this.getPersonList('业务员,业务主管',val)

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      userChange(val) {
        const arr = []
        if (val.length != 0) {
          this.userList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'userIds', `员工 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'userIds')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      engineerUser(val) {
        const arr = []
        if (val.length != 0) {
          this.projectPersonList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'engineerUserIds', `项目工程师 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'engineerUserIds')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      auditUserChange(val) {
        const arr = []
        if (val.length != 0) {
          this.auditPersonList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'auditUserIds', `审计人员 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'auditUserIds')
        }

        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      //删除筛选调节
      deleteOneClick(item) {
        this.approvalList = []
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.approvalForm, item)
        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        if(item == 'deptIds'){
          this.getPersonList('业务员,业务主管')
        }
        this.getApprovalList()
      },

      //清除所有条件
      deleteAllClick() {
        this.approvalList = []
        this.getPersonList('业务员,业务主管')
        this.selectConditionsList = {}
        this.approvalForm = {}
        this.approvalForm.page = 0
        this.approvalForm.pageSize = 20
        this.getApprovalList()
      },

      //跟进--点击跟进按钮
      handleShowConnectContentList(id) {
        this.ConnectContentDialogVisible = true
        this.searchForm.companyId = id;
        this.isShowMoreNews = true;
        this.getConnectList()
      },

      //跟进--获取沟通列表
      getConnectList() {
        this.searchForm.page = 0;
        this.searchForm.pageSize = 10;

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

      //跟进--发送信息
      sendData() {
        if (this.chatContent == "") {
          this.$message.warning(`请输入沟通内容`);
          return
        }
        let params = {
          chatContent: this.chatContent,
          companyId:this.$store.getters.companyId,
          toCompanyId: this.searchForm.companyId,
        };
        if (this.fileIds !== "") {
          params.fileIds = this.fileIds;
        }

        addChat(params).then(res => {
          if (res.code === 200) {
            this.chatContent = "";
            this.fileTemps = [];
            this.fileIds = "";
            this.getConnectList();
          }
        })
      },

      //跟进--上传文件
      chatFileChange(file, fileList) {
        if(file.name.length >= 150){
          this.$message('文件名称超长，请检查');
          this.fileTemps = JSON.parse(JSON.stringify(this.fileTemps))
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

      //跟进--点击查看更多
      getMoreChar() {
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
      //跳转到企业信息
      goCompanyDatail(data) {
        this.$router.push({'path': '/customer/editCustomer', 'query': {'id': data.companyId, 'check': true}})
      },

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

        let obj = {}
        this.holdDelList = this.holdDelList.reduce((cur, next) => {
          obj[next.approvalId] ? '' : obj[next.approvalId] = true && cur.push(next)
          return cur
        }, [])
      },
    },
    filters: {
      // 过滤 圈内只显示一个字
      titleSize(val) {
        return val.substring(0, 1);
      }
    }
  }
</script>

<style lang="less" scoped>
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
      margin-left: 20px;
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

      span {
        color: #F56C6C;
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
        width: 93%;

        /deep/ .el-checkbox {
          width: 100%;
          display: flex;
        }

        /deep/ .el-checkbox__label {
          width: 100%;
          display: flex;
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

            .titleData {
              display: flex;
              align-items: center;

              p {
                font-size: 18px;
                font-weight: bold;
                color: rgba(68, 68, 68, 1);
                margin-right: 10px;
              }
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

          .leftBox {
            display: flex;
            margin-bottom: 10px;

            h4 {
              font-size: 14px;
              font-weight: normal;
              flex: 1;
            }
          }
        }
      }

      .projectRig {
        /deep/ .el-button {
          padding: 5px 10px;
        }
      }
    }
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
  }

  /deep/ .select-box-date {
    .select-item-list {
      .item {
        padding: 10px 6px !important;
      }
    }
  }

  /deep/ .el-date-editor .el-range-separator {
    padding: 0;
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

  /deep/ .el-date-editor {
    .el-input__inner {
      padding: 0 30px;
    }
  }
</style>
