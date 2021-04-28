<template>
  <div class="sales-plan-box">

    <!--列表-->
    <div class="list">
          <div  class="class-newPlan"  @click="addListHandle(item)">新增计划</div>
              <div class="user-conent" v-for="(list,index) in  salePlanBos.slice(0,newPageSize) "   :key="index">
                <div class="index">
                  {{index+1}}
                </div>
                <div class="main-list">
                  <div class="item">
                    <div class="cate" style="overflow: inherit">
                      业务员：<span class="blue">{{list.userName}}</span>
                      <img style="margin-left: 6px;margin-top: -2px;" v-if="list.companyType === 1" :src="newly"/>
                      <img style="margin-left: 6px;margin-top: -2px;" v-if="list.companyType === 0"
                           :src="existing"/>
                    </div>
                    <div class="cate">
                      <div>创建日期：</div>
                      <span>{{list.createTime}}</span></div>
                    <div class="cate">联系人：<span :title="list.contactName"
                                                style="max-width: 200px;">{{list.contactName}}</span></div>
                    <div class="cate">联系电话：<span :title="list.contactPhone" style="max-width: 200px;">{{list.contactPhone}}</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="cate">计划实施时间：<span>{{list.planDate}}</span></div>
                    <div class="cate">推广项目：
                      <span style="display: inline-block;width: 200px;text-overflow: ellipsis;overflow: hidden;"
                            :title="list.newProjectName" class="blue"
                            v-if="list.newProjectName">{{list.newProjectName}}</span>
                      <span style="display: inline-block;width: 200px;text-overflow: ellipsis;overflow: hidden;"
                            :title="list.projectName" class="blue" v-else>{{list.projectName}}</span>
                    </div>
                    <div class="cate">
                      <div>推广依据：</div>
                      <span style="display: inline-block;width: 200px;text-overflow: ellipsis;overflow: hidden;"
                            :title="list.projectBasis">{{list.projectBasis}}</span>
                    </div>
                  </div>
                  <div class="item" v-if="list.executeStatus == 1">
                    <div class="cate">实际实施时间：<span>{{list.executeTime}}</span></div>
                    <div class="cate">实施类别：<span class="blue">{{executeTypeList[list.executeType]}}</span></div>
                    <div class="cate">实施效果：
                      <span v-for="(data,index) in list.executeResult" :title="executeResultList[data]">
                        {{executeResultList[data]}}&nbsp;
                      </span>
                    </div>
                    <div class="cate results"><i class="tit">实施结果：</i><span :title="list.executeContent">{{list.executeContent}}</span>
                    </div>
                  </div>
                  <div class="item" v-show="list.executeTime && list.commentRemark">
                    <div class="cate results"><i class="tit">评论：</i><span :title="list.commentRemark">{{list.commentRemark}}</span>
                    </div>
                  </div>
                </div>

                <div class="bage-btn-handle">
                  <!--标签-->
                  <div class="bage">
                    <img v-if="list.executeStatus !==1" :src="unenforced"/>
                  </div>

                  <!--操作按钮组-->
                  <div class="handle-btn-group">
                    <div class="item-btn read" v-if="allowDetails.twoAllow" @click="goPlanDetail(list)"></div>

                    <div class="item-btn implement" v-if="allowExecute.twoAllow && list.executeStatus !==1"
                         @click="implementHandle(list)"></div>

                    <div class="item-btn again" v-if="list.executeStatus ==1 && allowUpdate.twoAllow"
                         @click="editListHandle(list,true,item)">再次计划
                    </div>

                    <div class="item-btn edit" v-if="list.executeStatus!==1 && allowUpdate.twoAllow"
                         @click="editListHandle(list,false)"></div>

                    <div class="item-btn remark" v-if="list.executeStatus==1 && allowAppraise.twoAllow"
                         @click="commentRemarkHandle(list)"></div>
                  </div>
                </div>

              </div>

        <!--加载更多{{newPageSize}}{{salePlanBos.length}}-->
        <div class="get-more" v-if="salePlanBos.length <= newPageSize">
          没有更多
        </div>
        <div class="get-more" @click="newLoadMore" v-else>
          加载更多
        </div>

    </div>
    <!-- 变更 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="updatetitleName?'新增计划':'变更'"
               :visible.sync="updateVisible" class="editorUserModal" width="600px">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="120px" @submit.native.prevent>
        <el-form-item label="目标客户：" prop="companyNames">

          <el-input
            placeholder="请输入目标客户"
            class="user-input"
            v-model="updateForm.companyName"
            :disabled="true">
          </el-input>

          <!--
            <el-input maxlength="50" v-model="updateForm.companyName" v-if="!isUserWriteChoose" class="user-input"  placeholder="请输入目标客户" :disabled="true" />
            <el-select v-else v-model="updateForm.companyName"
                     class="user-select"
                     filterable
                     clearable
                     placeholder="选择目标客户"
                     @change="addSelectCompanyHandle"
                     v-loadMore="loadMore"
                     @focus="handleSelectData('user')"
                     @blur="handleSelectDataBlue"
                     remote
                     :remote-method="remoteMethod"
          >
            <el-option
              v-for="(item,index) in companyNameList"
              :key="index"
              :label="item.companyName"
              :value="item.crmCompanyId"
            />
          </el-select> -->
          <!-- <el-button class="switch-btn" @click="switchCompanyHandle">
            {{isUserWriteChoose?'切换为输入':'切换为选择'}}
          </el-button> -->
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input class="user-input" maxlength="50" v-model="updateForm.contactName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input class="user-input" maxlength="50" v-model="updateForm.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="计划实施日期：" prop="planDate">
          <el-date-picker type="date" v-model="updateForm.planDate" placeholder="选择日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="推广项目：" prop="projectName"  >
          <el-select v-if="isProjectWriteChoose"
                     v-model="updateForm.projectName"
                     class="user-select"
                     filterable
                     clearable placeholder="选择推广项目"
                     @change="addSelectProjectHandle"
                     v-loadMore="loadMore"
                     @focus="handleSelectData('project')"
                     @blur="handleSelectProjectBlue"
                     remote
                     :remote-method="remoteProject"
                     style="width:250px; "
          >
            <el-option
              v-for="(item,index) in projectWriteList"
              :key="index"
              :label="item.projectName"
              :value="item.projectId"
            />
          </el-select>
          <el-input maxlength="50" v-else class="user-input" v-model="updateForm.projectName"
                    placeholder="请输入推广项目"></el-input>
          <el-button class="switch-btn" @click="switchProjectHandle">
            {{isProjectWriteChoose?'切换为输入':'切换为选择'}}
          </el-button>

        </el-form-item>
        <el-form-item label="客户信息：" prop="projectBasis">
          <el-input maxlength="1000" type="textarea" v-model="updateForm.projectBasis" resize="none" :rows="5"
                    placeholder="客户的什么信息，让你去推广该项目，请提前做好准备"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">

        <el-button class="setBtn" v-if="updatetitleName" @click="setUpdateFormHandle" v-preventReClick>确 定</el-button>
        <el-button class="setBtn" v-else @click="setChangeFormHandle" v-preventReClick>确 定</el-button>

        <el-button class="cananl" @click="cananlUpdate">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 实施 -->
    <el-dialog v-dialogDrag title="实施" class="editorUserModal" :visible.sync="implementVisible" width="600px">
      <el-form :model="implementForm" :rules="implementRules" ref="implementForm" label-width="120px">
        <el-form-item label="实际实施时间:" prop="executeTime">
          <el-date-picker v-model="implementForm.executeTime"
                          type="datetime"
                          placeholder="选择时间"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          :default-value="implementForm.executeTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="modal-radio" label="实施类别：" prop="executeType">
          <el-radio-group v-model="implementForm.executeType">
            <el-radio
              v-for="item in executeTypeDetail"
              :label="item.num"
              :key="item.num"
            >
              {{item.value}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="modal-radio" label="实施效果：" prop="executeModalSelect">
          <el-checkbox-group v-model="implementForm.executeModalSelect">
            <el-checkbox v-for="item in executeResultDetail" :key="item.num" :label="item.num">
              {{item.value}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="实施结果：">
          <el-input type="textarea" v-model="implementForm.executeContent" resize="none" :rows="5"
                    placeholder="请输入实施结果"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="setBtn" @click="setImplementFormHandle" v-preventReClick>确 定</el-button>
        <el-button class="cananl" @click="cananlImplementForm">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 评论 -->
    <el-dialog v-dialogDrag title="评论" class="editorUserModal" :visible.sync="commentVisible" width="600px">
      <el-form :model="commentForm" :rules="commentRules" ref="commentForm" label-width="120px">
        <el-form-item label="评论：" prop="commentRemark">
          <el-input type="textarea" v-model="commentForm.commentRemark" resize="none" :rows="5"
                    placeholder="请输入评论"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="setBtn" @click="setCommentHandle" v-preventReClick>确 定</el-button>
        <el-button class="cananl" @click="cananlCommentHandle">取 消</el-button>
      </span>
    </el-dialog>


    <!--弹窗-->
    <!--批量新增--弹窗-->
    <el-dialog :before-close="cananlMoreSaleHandle" class="add-sale-modal" title="新增计划"
               :visible.sync="addSaleDialogVisible" width="1200px" v-dialogDrag>
      <el-button type="primary" @click="addSaleRowHandle" size="medium" style="margin-bottom: 10px;float: right">新增一行
      </el-button>
      <el-table :header-cell-class-name='must' class="add-sale-table" :data="addMoreSale" border highlight-current-row>

        <!--目标客户-->
        <el-table-column align="center" :label="`目标客户`" prop="userName">
          <!-- <span class="star" style="margin-left: -37px;left: 50%;">*</span> -->
          <template slot-scope="scope">

            <!-- {{scope.row.crmCompanyId}} -->
            <el-input
              placeholder="请输入内容"
              v-model="companyNames"
              :disabled="true">
            </el-input>
            <!-- <el-input
              placeholder="请输入内容"
              v-show="false"
              v-model="scope.row.crmCompanyId"
              :disabled="true">
            </el-input> -->


            <!-- <div class="flex-center">
              <el-input v-model="scope.row.companyName" v-if="!scope.row.isSelectUser" class="user-input"
                        placeholder="请输入目标客户"/>
              <el-select v-else v-model="scope.row.crmCompanyId"
                         class="user-select"
                         filterable
                         clearable
                         placeholder="选择目标客户"
                         @change="addSelectMoreCompanyHandle($event,scope.row)"
                         v-loadMore="loadMore"
                         @focus="handleMoreSelectData(scope.row,'moreUser',scope.$index)"
                         @blur="handleSelectMoreDataBlue"
                         remote
                         :remote-method="remoteMethod"
              >
                <el-option
                  v-for="(item,index) in scope.row.companyUserList"
                  :key="index"
                  :label="item.companyName"
                  :value="item.crmCompanyId"
                />
              </el-select>
              <i :title="'选择客户'" v-if="!scope.row.isSelectUser" class="el-icon-s-operation"
                 @click="switchMoreCompanyHandle(scope.row)"></i>
              <i :title="'输入客户'" v-else class="el-icon-edit" @click="switchMoreCompanyHandle(scope.row)"></i>
            </div> -->
          </template>
        </el-table-column>

        <!--联系人-->
        <el-table-column width="150" align="center" label="联系人" prop="userName">
          <!-- <span class="star" style="margin-left: -23px;left: 50%;">*</span> -->
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
          <span class="star" style="margin-left: -2px; margin-top:28px; left: 50%;">*</span>
          <template slot-scope="scope">
            <div class="flex-center">
              <el-select v-if="scope.row.isSelectProject"
                         v-model="scope.row.projectName"
                         class="user-select"
                         filterable
                         clearable placeholder="选择推广项目"
                         @change="addSelectMoreProjectHandle($event,scope.row)"
                         v-loadMore="loadMore"
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
          <span class="star" style="margin-left: 50px; margin-top:28px; left: 50%;">*</span>
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
        <el-button @click="addSaleDialogVisible=false" size="medium">取 消</el-button>
        <el-button @click="setMoreSaleHandle" type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>




  </div>
</template>

<script>
  import {commonDict} from '@/api/utils'
  import {queryPatentList, exportPatentList, deletePatentByIds, downloadTemplate} from '@/api/patent'
  import {
    getCompanyDeptTree,
    querySalePlanList,
    saveSalePlan,
    querySalePlanInfoById,
    updateChangeSalePlan,
    updateAppraiseSalePlan,
    updateExecuteSalePlan,
    importSalePlanList,
    getSalePlanTemplate,
    deleteSalePlanByIds,
    exportSalePlanList,
    queryCrmCompanyInfoByCommon,
    queryAllProjectBySalePlan,
    querySalePlanListByEnterpriseDimension,
    saveSalePlanBatch,
  } from '@/api/sale_plan'
  import store from "@/store";
  import {queryAll} from '@/api/projectManage'

  export default {
    props: {
      id: {
        type: String
      },
      companyNames:{
        type: String
      },
      crmCompanyId:{
        type: String
      },
      powerEdit:{
        type: Boolean
      }
    },
    data() {
      return {
        // 专利类型数据
        patentType: [],
        listQuery:{},
        salePlanBos:[],
        //新开发-图片
        newly: 'https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/新开发_20200514212127_390.png',
        //已有客户-图片
        existing: 'https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/已有客户(1)_20200514212222_746.png',
        //状态标签-未实施-图片
        unenforced: "https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案_20200514212701_500.png",

        //实施类别 ：0其他，1电话，2拜访，3线上
        executeTypeList: {
          0: '其他',
          1: '电话',
          2: '拜访',
          3: '线上'
        },
        //实施效果 ：0没有收获，1加qq微信，2有意向，3签单
        executeResultList: {
          0: '没有收获',
          1: '加qq微信',
          2: '有意向',
          3: '签单'
        },

        newPageSize:10,

        // <!------- 筛选 -------->
        //最终要搜索的数据
        listQuery: {
          page: 0,
          pageSize: 1,
          companyName: "",
          deptIds: [],
          userIds: [],
          companyType: [],
          executeStatus: [],
          executeType: [],
          executeResult: "",
          isComment: [],
          createTimeEnd: "",
          createTimeStart: "",
          executeTimeStart: "",
          executeTimeEnd: "",
          orderField: "",
          orderType: "",
          planDateEnd: "",
          planDateStart: "",
          projectBasis: "",
          provinceId: "",
          cityId: "",
          districtId: "",
          townId: "",
        },
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        select_conditions_list: {}, // 选中的条件
        tempListQuery: {},
        //筛选栏--实施效果选择
        executeSelectList: [],
        //筛选栏显示/隐藏
        isScreenShow: false,
        //部门数据
        companyList: [],
        //员工数据
        userList: [],
        //登录日期
        loginDate: [],
        //计划实施日期
        planDate: [],
        //实际实施时间
        actualDate: [],
        //日期范围设置
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '上周',
            onClick(picker) {
              const oDate = new Date();
              oDate.setTime(oDate.getTime() - 3600 * 1000 * 24 * 7);

              let day = oDate.getDay()

              let start = new Date(),
                end = new Date();
              if (day == 0) {
                start.setDate(oDate.getDate());
                end.setDate(oDate.getDate() + 6);
              } else {
                start.setTime(oDate.getTime() - 3600 * 1000 * 24 * day);
                end.setTime(oDate.getTime() + 3600 * 1000 * 24 * (6 - day));
              }

              picker.$emit('pick', [start, end]);
            }
          },
            {
              text: '本周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                let thisDay = start.getDay();
                let thisDate = start.getDate();
                if (thisDay != 0) {
                  start.setDate(thisDate - thisDay);
                }
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        //客户类别
        companyTypeList: [
          {num: "0", value: '已有客户'},
          {num: "1", value: '新开发'},
        ],
        //是否实施
        executeStatusList: [
          {num: "1", value: '已实施　'},
          {num: "0", value: '未实施'},
        ],
        //实施类别
        executeTypeDetail: [
          {num: "1", value: '电话联系 '},
          {num: "2", value: '上门拜访'},
          {num: "3", value: '线上'},
          {num: "0", value: '其他　　'},
        ],
        //实施效果
        executeResultDetail: [
          {num: "0", value: '没有收获'},
          {num: "1", value: '加qq微信'},
          {num: "2", value: '有意向　'},
          {num: "3", value: '签单'},
        ],
        //是否评论
        isCommentList: [
          {num: "0", value: '未评论　'},
          {num: "1", value: '已评论'},
        ],
        //已选条件
        select_filter_list: {},
        //排序
        sortData: "",
        sortDataList: [
          // {
          //   id: 'userId',
          //   value: '业务员顺序',
          //   type: 'ASC'
          // },
          // {
          //   id: '-userId',
          //   value: '业务员倒序',
          //   type: 'DESC'
          // },
          {
            id: 'createTime',
            value: '创建日期顺序',
            type: 'ASC'
          }, {
            id: '-createTime',
            value: '创建日期倒序',
            type: 'DESC'
          }, {
            id: 'planDate',
            value: '计划实施日期顺序',
            type: 'ASC'
          }, {
            id: '-planDate',
            value: '计划实施日期倒序',
            type: 'DESC'
          }, {
            id: 'executeTime',
            value: '实际实施日期顺序',
            type: 'ASC'
          }, {
            id: '-executeTime',
            value: '实际实施日期倒序',
            type: 'DESC'
          },
        ],


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

        exportShow: false,
        exportFailShow: false,
        exportSuccessShow: false,
        exportFailMsg: {},
        exportSuccessMsg: {},

        salestotal:0,
        //推广项目参数
        projectByParam: {
          page: 0,
          pageSize: 10
        },


        allowGetList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:LIST'),//销售计划列表
        allowGetImport: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:GETIMPORT'),//获取销售计划导入模板
        allowImport: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:IMPORT'),//导入销售计划
        allowExport: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:EXPORT'),//导出销售计划
        allowAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:INSERT'),//新建销售计划
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:UPDATE'),//变更销售计划
        allowExecute: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:EXECUTE'),//实施销售计划
        allowAppraise: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:APPRAISE'),//评论销售计划
        allowDetails: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:DETAILS'),//查询销售计划详情信息
        allowDelete: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:DELETE'),//删除销售计划
        allowGetCompanyList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:COMPANY:LIST'),//查询客户企业信息-下拉列表
        allowGetProjectList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:PROJECT:LIST'),//查询项目列表
        allowGetPolicyProjectList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:SALEPLAN:MANAGE', 'SYSTEM:CUSTOMER:SALEPLAN:POLICYPROJECT:LIST'),//查询项目列表-政策

        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:DEPT:MANAGE', 'SYSTEM:DEPT:LIST'),//部门列表

      }
    },
    mounted() {
     this.getPatentData()
    },
    activated() {
      this.getPatentData()
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

      //新增/变更 获取更多目标客户
      loadMore() {
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
        data.isSelectProject = !data.isSelectProject;
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

      //批量新增计划--选择推广项目
      addSelectMoreProjectHandle(val, data) {
        this.projectWriteList.forEach(item => {
          if (item.projectId == val) {
            data.projectName = item.projectName;
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
          item.crmCompanyId = this.crmCompanyId
          item.companyName = this.companyNames

          // if (item.crmCompanyId == '' && item.companyName == '') {
          //   this.$message.warning('请选择或输入目标客户');
          //   throw new Error();
          // }


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


      },




      //搜索栏---点击新增
      addListHandle() {
        this.updateForm = {
          crmCompanyId: this.crmCompanyId,
          planDate: "",
          companyName: this.companyNames,
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
        this.addMoreSale= [];
        this.addMoreSale.push(obj);

        this.addSaleDialogVisible = true;
      },


      //跳转到详情
      goPlanDetail(data) {
        if (this.allowDetails.twoAllow) {
          this.$router.push({'path': '/customer/salesPlanDetail', 'query': {'id': data.planId}})
        } else {
          this.$message.warning('抱歉，您没有此权限')
        }
      },

      //列表---点击变更---获取详情(true:再次规划，false:变更)
      editListHandle(data, type, parentData) {
        console.log('1111', parentData)
        querySalePlanInfoById({planId: data.planId}).then(res => {
          this.updateForm = {
            companyName: res.data.companyName,
            contactName: res.data.contactName,
            contactPhone: res.data.contactPhone,
            planDate: res.data.planDate,
            projectName: res.data.projectName,
            projectBasis: res.data.projectBasis,
            planId: res.data.planId,
            crmCompanyId: res.data.companyId
          }
          if (type) {
            this.updatetitleName = true;
            this.timeDefault();
            this.isAgailCompanyId = parentData.crmCompanyId
          } else {
            this.updatetitleName = false;
          }
        });

        this.getTargetUserList();
        this.getProjectData();
        this.updateVisible = true;
      },

      //列表---点击评论
      commentRemarkHandle(data) {
        if (data.commentRemark) {
          this.commentForm = {};
          this.$set(this.commentForm, 'commentRemark', data.commentRemark)
        }
        this.commentForm.planId = data.planId;
        this.commentVisible = true
      },

      //列表---点击实施
      implementHandle(data) {
        this.implementForm.executeModalSelect = [];
        this.$delete(this.implementForm, 'executeModalSelect');
        let newData = JSON.parse(JSON.stringify(data));
        if (data.executeStatus == 1) {
          this.implementForm = {
            executeTime: newData.executeTime,
            executeType: JSON.stringify(newData.executeType),
            executeContent: newData.executeContent,
            planId: newData.planId,
            executeResult: newData.executeResult
          };
          //  this.$set(this.implementForm, 'executeModalSelect', newData.executeResult);
          this.$set(this.implementForm, 'executeModalSelect', newData.executeResult.split(','));
        } else {
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
          let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
          let newDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
          this.implementForm = {
            executeTime: newDate,
            executeResult: [],
            planId: newData.planId,
            executeModalSelect: []
          };
        }
        this.implementVisible = true
      },




      //新增/变更销售计划---选择目标客户
      addSelectCompanyHandle(val) {
        this.selectUserOrProject = 'user';
        this.companyNameList.forEach(item => {
          if (item.crmCompanyId == val) {
            this.updateForm.companyName = item.companyName;
            this.updateForm.crmCompanyId = item.crmCompanyId;
          }
        })
      },
      //新增/变更销售计划---选择推广项目
      addSelectProjectHandle(val) {
        this.selectUserOrProject = 'project';
        this.projectWriteList.forEach(item => {
          if (item.projectId == val) {
            this.updateForm.projectName = item.projectName;
          }
        })
      },
      // 新增/变更销售计划---确定新增
      setUpdateFormHandle() {
        this.$refs['updateForm'].validate((valid, error) => {
          if (valid) {
            // 判断是否重新计划传参
            if (this.isAgailCompanyId !== "") {
              this.updateForm.crmCompanyId = this.isAgailCompanyId;
            }
            saveSalePlan({salePlanDtos: [this.updateForm]}).then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功')
                this.updateVisible = false;
                this.isAgailCompanyId = "";
                if (this.allowGetList.twoAllow) {
                  this.listQuery.page = 0;
                  this.getList();
                } else {
                  this.$message.warning('抱歉，您没有此权限')
                }
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      // 新增/变更销售计划---确定编辑
      setChangeFormHandle() {
        this.$refs['updateForm'].validate((valid, error) => {
          if (valid) {
            updateChangeSalePlan(this.updateForm).then(res => {
              if (res.code === 200) {
                this.$message.success('操作成功')
                this.updateVisible = false
                if (this.allowGetList.twoAllow) {
                  this.listQuery.page = 0;
                  this.getList();
                } else {
                  this.$message.warning('抱歉，您没有此权限')
                }
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
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

      //评论---确定评论
      setCommentHandle() {
        this.$refs['commentForm'].validate((valid, error) => {
          if (valid) {
            updateAppraiseSalePlan(this.commentForm).then(res => {
              if (res.code === 200) {
                this.commentForm = {};
                this.$message.success('操作成功')
                this.commentVisible = false
                if (this.allowGetList.twoAllow) {
                  this.listQuery.page = 0;
                  this.getList();
                } else {
                  this.$message.warning('抱歉，您没有此权限')
                }
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      //评论---取消
      cananlCommentHandle() {
        this.commentForm = {};
        this.commentVisible = false;
      },

      //实施---确认实施
      setImplementFormHandle() {
        this.$refs['implementForm'].validate((valid, error) => {
          if (valid) {
            if (this.implementForm.executeModalSelect.length == 0) {
              this.$message.warning('请选择实施效果');
              return
            }
            this.implementForm.executeResult = this.implementForm.executeModalSelect.join(',');

            updateExecuteSalePlan(this.implementForm).then(res => {
              if (res.code === 200) {
                this.implementForm = {executeResult: [], executeModalSelect: []};
                this.$message.success('操作成功');
                this.implementVisible = false;
                if (this.allowGetList.twoAllow) {
                  this.listQuery.page = 0;
                  this.getList();
                } else {
                  this.$message.warning('抱歉，您没有此权限')
                }
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },
      //实施---取消实施
      cananlImplementForm() {
        this.implementForm = {
          executeResult: [],
          executeModalSelect: []
        };
        this.implementVisible = false;
      },

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

      // 获取companyNames有延迟
      getPatentData() {
        if(this.crmCompanyId!=''){
          this.getList();
        }
        // setTimeout(() => { this.getList(); }, 1500)
      },

       //分页 加载更多
      newLoadMore() {
        this.newPageSize = this.newPageSize+10;
      },

      //获取列表数据
      getList() {
        this.listQuery.crmCompanyId = this.crmCompanyId;
        this.listQuery.pageSize = 10000;
        querySalePlanList(this.listQuery).then(res => {
          this.salePlanBos = res.data.data[0].salePlanBos;
          this.salestotal = res.data.data[0].salePlanBos.length;
          this.$emit('salesTotal',Number(res.data.data[0].salePlanBos.length));
          // console.log(this.salestotal,"this.salestotal===>")
        })
      },

    }
  }
</script>


<style lang="less" scoped>
  .star{
    color: #ff3d4c !important;
    position: absolute;
    left: -8px;
  }
  .class-newPlan{
    background:#2979ff;
    color: #fff;
    border-radius: 5px;
    width: 100px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-bottom: 10px;
  }
  .get-more {
    text-align: center;
    margin-top: 10px;
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

      /deep/ .el-form-item__label {
        font-weight: normal;
        color: rgba(68, 68, 68, 0.75);
      }

      /deep/ .el-form-item__content {
        width: 73%;
        display: flex;
      }

      .user-input {
        /deep/ .el-input__inner {
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

        /deep/ .el-form-item__content {
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


    .user-conent {
    display: flex;
    padding: 10px 10px 0;

    .check-input {
      width: 18px;
      height: 18px;
      cursor: pointer;
      margin-right: 5px;
      border: 1px solid rgba(68, 68, 68, 0.15);
    }

    .check-input[type="checkbox"] {
      background-color: #05AAFF !important;
    }

    .index {
      background: #FFCBA6;
      border-radius: 2px;
      width: 18px;
      min-width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 4px;
    }

    .item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      font-size: 14px;
      border-bottom: 0;

      .cate {
        display: flex;
        width: 33%;
        min-width: 25%;
        color: rgba(68, 68, 68, 0.75);
        margin-bottom: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        span {
          color: rgba(68, 68, 68, 1);
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .blue {
          color: rgba(5, 170, 255, 1);
          cursor: pointer;
        }

        &.results {
          display: flex;

          .tit {
            font-style: normal;
            white-space: nowrap;
          }

          span {
            width: 400px;
            display: inline-block;
            word-wrap: break-word;
            word-break: normal;
          }
        }
      }

      @media screen and (max-width: 1450px) {
        .cate {
          min-width: 50%;
        }
      }
    }

    .main-list {
      width: 80%;
    }

    .bage-btn-handle {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    @media screen and (max-width: 1250px) {
      .bage-btn-handle {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }


    &:nth-child(even) {
      background: #EFFAFF;
    }

    &:nth-child(odd) {
      background: #F1F4FF;
    }
  }




  .bage {
    min-width: 118px;
    margin-right: 30px;
  }

  .handle-btn-group {
    width: 153px;
    min-width: 153px;
    display: flex;
    flex-wrap: wrap;
    height: 72px;

    .item-btn {
      width: 72px;
      min-width: 72px;
      height: 30px;
      background-image: url("../../../../static/sales_plan_sprite.png");
      cursor: pointer;
      background-size: cover;

      &.read {
        background-position: 1px, 0;
        margin-right: 5px;
      }

      &.implement {
        background-position: -79px, 0;
      }

      &.edit {
        background-position: -158px, 0;
        margin-right: 5px;
      }

      &.remark {
        background-position: -237px, 0;
      }

      &.again {
        background: none;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #444;
        border-radius: 2px;
      }
    }

    .item-btn:hover {
      background-image: url("../../../../static/_sales_plan_sprite.png");

      &.again {
        background: none;
        background: #444;
        color: #fff;
      }
    }
  }

</style>

