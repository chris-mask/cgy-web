<template>
  <div class="sales-plan-box">
    <!--搜索-->
    <div class="search-bar">
      <div class="search">
        <el-input @keyup.enter.native="handleFilter" v-model="listQuery.companyName" class="search-input"
                  placeholder="请输入企业名称 / 项目名称"/>
        <el-button class="btn" @click="handleFilter">搜一下</el-button>
      </div>
      <el-button class="btn" @click="addListHandle" v-if="allowAdd.twoAllow">新增</el-button>
      <el-upload
        v-if="allowImport.twoAllow"
        :disabled="exportShow"
        ref="upload"
        class="upload-demo"
        :action="UploadUrl()"
        :limit="1"
        :show-file-list="false"
        :auto-upload="false"
        :before-upload="beforeUpload"
        :on-exceed="handleExceed"
        :on-change="fileChange"
        :file-list="fileList">
        <el-button class="btn import-btn" :disabled="exportShow">
          导入计划模板
        </el-button>
      </el-upload>
      <div class="down-load-modal" @click="get_import_template" v-if="allowGetImport.twoAllow">
        <img :src="iconDownLoad" class="icon-down-load" alt="downLoadIcon">
        下载导入模板
      </div>
    </div>

    <el-alert
      v-if="exportShow"
      title="正在导入文件，请稍等..."
      style="margin-top:20px;"
      type="warning"
      effect="dark">
    </el-alert>

    <el-alert
      v-if="exportFailShow"
      :title="exportFailMsg.taskTitle"
      type="error"
      effect="dark"
      style="margin-top:20px;"
      :description="exportFailMsg.taskMessage"
      @close="closeExportFail"
      show-icon>
    </el-alert>

    <el-alert
      v-if="exportSuccessShow"
      :title="exportSuccessMsg.taskTitle"
      type="success"
      effect="dark"
      style="margin-top:20px;"
      :description="exportSuccessMsg.taskMessage"
      @close="closeExportSuccess"
      show-icon>
    </el-alert>

    <!--筛选栏-->
    <div class="screen-bar">
      <div class="screen-title">
        <div class="name">
          <span class="line"></span>
          <span class="text">已选条件：</span>
        </div>
        <div class="selected-list">
          <div class="item" v-for="(item,index) in select_filter_list">
            <div class="text">{{item}}</div>
            <img :src="clearBlue" @click="deleteOneClick(index)"/>
          </div>

          <div class="item clear" @click="deleteAllClick" v-if="Object.keys(select_filter_list).length>0">清空所有</div>
        </div>
        <div class="screen-btn">
          <div class="btn" @click="handleScreenBtn">
            <img :src="isScreenShow?closeIcon:openIcon"/>
            <span class="text">{{!isScreenShow?'选择筛选条件':'收起筛选条件'}}</span>
          </div>
        </div>
      </div>
      <div class="screen-list" v-show="isScreenShow">
        <!--常用-->
        <div class="form-item" v-if="allowGetDeptList.twoAllow">
          <span class="label-text">常用：</span>
          <div class="form-handle">
            <el-select class="select-input"
                       v-model="listQuery.deptIds"
                       size="small"
                       @change="selectCompanyHandle"
                       filterable
                       clearable multiple
                       placeholder="选择部门">
              <el-option v-for="item in companyList"
                         :key="item.deptId"
                         :label="item.deptName"
                         :value="item.deptId"
              />
            </el-select>
            <el-select @change="selectUserHandle"
                       size="small"
                       class="select-input" v-model="listQuery.userIds" filterable clearable multiple
                       placeholder="选择员工">
              <el-option v-for="item in userList"
                         :key="item.userId"
                         :label="item.userName"
                         :value="item.userId"
              />
            </el-select>
          </div>
        </div>

        <div class="form-item">
          <span class="label-text">地区：</span>
          <div class="form-handle">
            <el-form :inline="true">
              <el-form-item>
                <el-select @change='changeProvince' clearable size="mini" class="inline-block input-150 float-left"
                           v-model="listQuery.provinceId" placeholder="省份">
                  <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>
                <el-select @change='changeCity' clearable size="mini" class="inline-block input-150 float-left"
                           v-model="listQuery.cityId" placeholder="城市">
                  <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>
                <el-select @change='changeDistrict' clearable size="mini" class="inline-block input-150 float-left"
                           v-model="listQuery.districtId" placeholder="县区">
                  <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>
                <el-select @change='getTownsId' clearable size="mini" class="inline-block input-150 float-left"
                           v-model="listQuery.townId" placeholder="镇街">
                  <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!--客户类别-->
        <div class="form-item">
          <span class="label-text">客户类别：</span>
          <div class="form-handle">
            <el-checkbox-group v-model="listQuery.companyType" @change="selectCompanyTypeHandle">
              <el-checkbox v-for="item in companyTypeList" :label="item.num" :key="item.keys">
                {{item.value}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!--推广依据-->
        <div class="form-item">
          <span class="label-text">推广依据：</span>
          <div class="form-handle">
            <el-input placeholder="请输入推广依据" class="input" v-model.trim="listQuery.projectBasis" @blur="handleFilter"/>
          </div>
        </div>

        <!--是否实施-->
        <div class="form-item">
          <span class="label-text">是否实施：</span>
          <div class="form-handle">
            <el-checkbox-group v-model="listQuery.executeStatus" @change="selectExecuteStatusHandle">
              <el-checkbox v-for="item in executeStatusList" :key="item.num" :label="item.num">{{item.value}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!--实施类别-->
        <div class="form-item">
          <span class="label-text">实施类别：</span>
          <div class="form-handle">
            <el-checkbox-group v-model="listQuery.executeType" @change="selectExecuteTypeHandle">
              <el-checkbox v-for="item in executeTypeDetail" :key="item.num" :label="item.num">{{item.value}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!--实施效果-->
        <div class="form-item">
          <span class="label-text">实施效果：</span>
          <div class="form-handle">
            <el-checkbox-group v-model="executeSelectList" @change="selectExecuteResultHandle">
              <el-checkbox v-for="item in executeResultDetail" :key="item.num" :label="item.num">{{item.value}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!--是否评论-->
        <div class="form-item">
          <span class="label-text">是否评论：</span>
          <div class="form-handle">
            <el-checkbox-group v-model="listQuery.isComment" @change="selectIsCommentHandle">
              <el-checkbox v-for="item in isCommentList" :key="item.num" :label="item.num">{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!--登录日期-->
        <div class="form-item">
          <span class="label-text">创建日期：</span>
          <el-date-picker
            v-model="loginDate"
            size="small"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="loginDataHandle"
            class="date-select"
          >
          </el-date-picker>
        </div>

        <!--计划实施日期-->
        <div class="form-item">
          <span class="label-text">计划实施日期：</span>
          <el-date-picker
            v-model="planDate"
            size="small"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="planDateHandle"
            class="date-select"
          >
          </el-date-picker>
        </div>

        <!--实际实施日期-->
        <div class="form-item">
          <span class="label-text">实际实施日期：</span>
          <el-date-picker
            v-model="actualDate"
            size="small"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="actualDateHandle"
            class="date-select"
          >
          </el-date-picker>
        </div>


      </div>
    </div>

    <!--列表-->
    <div class="list">
      <div class="list-title">

        <div class="left">
          <div class="title-text">
            <span class="line"></span>
            <div class="search-total-num">搜索到 <span class="num">{{listTotal}}</span> 条企业记录, <span class="num">{{pages}}</span> 条销售计划记录</div>
            <div class="search-total-num" style="margin-left: 10px;" v-if="check_biz_ids.length > 0">已选中 <span
              class="num">{{check_biz_ids.length}}</span> 条记录
            </div>
          </div>
          <div class="title-btn-group">
            <div class="btn" @click="checkAllOrNo">
              {{isCheckAll?'取消全选':'全选'}}
            </div>
            <div class="btn" @click="handleExport" v-if="allowExport.twoAllow">导出</div>
            <div class="btn del" @click="delItemHandle" v-if="allowDelete.twoAllow">删除</div>
          </div>
        </div>

        <div class="right">
          <el-select class="select-sort" v-model="sortData" @change="sortListHandle" clearable placeholder="默认排序"
                     popper-class="select-sort-option" :popper-append-to-body="false">
            <el-option
              v-for="item in sortDataList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>

      <div class="list-detail">
        <div class="item" v-for="item in list">
          <div class="item-detail">

            <!--图片+多选-->
            <div class="pic">
              <div class="img-box" :style="`background:${item.bgColor}`">
                {{item.companyShortName && item.companyShortName!=='' ? item.companyShortName : '企业简称'}}
              </div>
            </div>

            <!--列表详情-->
            <div class="detail">
              <div class="title">
                <span class="text" @click="toCheck(item)">{{item.companyName}}</span>
                <span class="text cate">{{item.provinceName}} {{item.cityName}} {{item.districtName}} {{item.townName}}</span>
              </div>

              <div class="user-conent" v-for="(list,index) in item.salePlanBos">
                <div>
                  <input type="checkbox"
                         class="check-input"
                         name="check_biz_ids"
                         :value="list.planId"
                         v-model="check_biz_ids"
                         @change="checkOneOrNo"
                  />
                </div>
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
            </div>
          </div>
        </div>

        <!--加载更多-->
        <div class="get-more" v-if="list.length >= listTotal">
          没有更多
        </div>
        <div v-else class="get-more" @click="getMore">
          加载更多
        </div>
      </div>
    </div>

    <!--置顶-->
    <div class="goTop">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../../icons/enterprise/back_top.png" alt="">
      </a>
    </div>

    <!--弹窗-->
    <!--批量新增--弹窗-->
    <el-dialog :before-close="cananlMoreSaleHandle" class="add-sale-modal" title="新增计划"
               :visible.sync="addSaleDialogVisible" width="80%" v-dialogDrag>
      <el-button type="primary" @click="addSaleRowHandle" size="medium" style="margin-bottom: 10px;float: right">新增一行
      </el-button>
      <el-table :header-cell-class-name='must' class="add-sale-table" :data="addMoreSale" border highlight-current-row>

        <!--目标客户-->
        <el-table-column align="center" :label="`目标客户`" prop="userName">
          <span class="star" style="margin-left: -37px;left: 50%;">*</span>
          <template slot-scope="scope">
            <div class="flex-center">
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
                <!--                @focus="handleSelectData('user')"-->
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
            </div>
          </template>
        </el-table-column>

        <!--联系人-->
        <el-table-column width="150" align="center" label="联系人" prop="userName">
          <span class="star" style="margin-left: -23px;left: 50%;">*</span>
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
        <el-button @click="cananlMoreSaleHandle" size="medium">取 消</el-button>
        <el-button @click="setMoreSaleHandle" type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 变更 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="updatetitleName?'新增计划':'变更'"
               :visible.sync="updateVisible" class="editorUserModal" width="600px">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="120px" @submit.native.prevent>
        <el-form-item label="目标客户：" prop="companyName">
          <el-input maxlength="50" v-model="updateForm.companyName" v-if="!isUserWriteChoose" class="user-input"
                    placeholder="请输入目标客户"/>
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
          </el-select>
          <el-button class="switch-btn" @click="switchCompanyHandle">
            {{isUserWriteChoose?'切换为输入':'切换为选择'}}
          </el-button>
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
        <el-form-item label="推广项目：" prop="projectName">
          <el-select v-if="isProjectWriteChoose"
                     v-model="updateForm.projectName"
                     class="user-select"
                     filterable
                     clearable placeholder="选择推广项目"
                     @change="addSelectProjectHandle"
                     v-loadMore="loadMore"
                     @focus="handleSelectData('project')"
                     remote
                     @blur="handleSelectProjectBlue"
                     :remote-method="remoteProject"
          >
<!--            @blur="handleSelectProjectBlue"-->
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

  </div>
</template>

<script>
  import iconDownLoad from '../../icons/enterprise/down_load.png'
  import clearBlue from '../../icons/enterprise/clear_blue.png'
  import closeIcon from '../../icons/enterprise/close_icon.png'
  import openIcon from '../../icons/enterprise/open_icon.png'
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
    downloadTemplate,
    deleteSalePlanByIds,
    exportSalePlanList,
    queryCrmCompanyInfoByCommon,
    queryAllProjectBySalePlan,
    querySalePlanListByEnterpriseDimension,
    saveSalePlanBatch,
  } from '@/api/sale_plan'
  import {queryUserComboInfo} from '@/api/customerCenter'
  import {queryTaskProcessInfo, commonDictOfRegion} from '@/api/utils'
  import store from "../../../store";

  export default {
    data() {
      return {
        // <!------- 图片 -------->
        //下载icon
        iconDownLoad,
        //蓝色-删除icon
        clearBlue,
        //关闭icon
        closeIcon,
        //打开icon
        openIcon,
        //新开发-图片
        newly: 'https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/新开发_20200514212127_390.png',
        //已有客户-图片
        existing: 'https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/已有客户(1)_20200514212222_746.png',
        //状态标签-未实施-图片
        unenforced: "https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案_20200514212701_500.png",

        //<!------- 获取到登录后的公司 -------->
        //获取公司ID
        companyId: store.getters.companyId,
        //获取公司名称
        companyName: store.getters.companyName,

        //<!------- 搜索栏 -------->
        // 导入计划
        fileList: [],
        fileTemp: '',
        host: process.env.BASE_API,


        //<!------- 列表 -------->
        // 销售计划数据列表
        list: [],
        listTotal: "",
        pages: "",
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
        //置顶按钮
        btnFlag: false,
        // 是否已经全选
        isCheckAll: false,
        // 勾选行的biz_id
        check_biz_ids: [],
        //列表框背景色
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],
        tempPage: null,


        // <!------- 筛选 -------->
        //最终要搜索的数据
        listQuery: {
          page: 0,
          pageSize: 20,
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
    mounted() {
      window.addEventListener('scroll', this.scrollToTop)
      this.tempListQuery = JSON.parse(JSON.stringify(this.listQuery))
      // console.log(this.allowGetDeptList,'allowGetDeptList' ,store.getters.navList,'store.getters.navList');
      // allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:DEPT:MANAGE', 'SYSTEM:DEPT:LIST'),//部门列表
      // this.getList();
    },
    activated() {
      this.isCheckAll = false;
      this.check_biz_ids = [];
      if (localStorage.getItem('planStatus')) {
        this.planDate = [];
        this.actualDate = [];
        this.loginDate = [];
        let num = Number(localStorage.getItem('planStatus'))
        this.select_filter_list = {};
        this.getHomeParamsData(num);
      } else {
        if (this.allowGetList.twoAllow) {
          if(this.$store.getters.salePlanPage != 0){
            this.listQuery.page = 0;
            this.listQuery.pageSize = this.$store.getters.salePlanPage + 20;
            this.getList();
          }else{
            this.listQuery.page = this.$store.getters.salePlanPage;
            this.listQuery.pageSize = 20;
            this.getList();
          }

        } else {
          this.$message.warning('抱歉，您没有此权限')
        }
      }

      if (this.$store.getters.saleplanTaskMsg && this.$store.getters.saleplanTaskMsg.taskId) {
        this.getTaskInfo();
      }

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.salePlanScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    deactivated() {
      localStorage.removeItem('planStatus');
      // this.listQuery = JSON.parse(JSON.stringify(this.tempListQuery));
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_SALEPLAN_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_SALEPLAN_PAGE', this.listQuery.page)
      next()
    },

    methods: {
      //检测导入的文件是否上传完成
      getTaskInfo() {
        queryTaskProcessInfo({taskId: this.$store.getters.saleplanTaskMsg.taskId}).then(res => {
          if (res.code == 200) {
            if (res.data.taskStatus == 'FAILURE') {
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
              this.$store.commit('SET_SALEPLAN_TASKMSG', taskMsg);
            } else if (res.data.taskStatus == 'SUCCESS') {
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
              this.$store.commit('SET_SALEPLAN_TASKMSG', taskMsg);
            } else {
              this.exportShow = false;
              this.exportFailShow = false;
              this.exportSuccessShow = false;
              this.exportFailMsg = {};
              this.exportSuccessMsg = {};
              this.$store.commit('SET_SALEPLAN_TASKMSG', {});
            }
          }
        })
      },

      //关闭失败提示
      closeExportFail() {
        this.exportShow = false;
        this.exportFailShow = false;
        this.exportSuccessShow = false;
        this.exportFailMsg = {};
        this.$store.commit('SET_SALEPLAN_TASKMSG', {});
      },

      //关闭成功提示
      closeExportSuccess() {
        this.exportShow = false;
        this.exportFailShow = false;
        this.exportSuccessShow = false;
        this.exportSuccessMsg = {};
        this.$store.commit('SET_SALEPLAN_TASKMSG', {});
      },

      //判断首页进来是显示的状态
      getHomeParamsData(num) {
        let day2 = new Date();
        day2.setTime(day2.getTime());
        let y = day2.getFullYear();
        let m = day2.getMonth() + 1 < 10 ? "0" + (day2.getMonth() + 1) : day2.getMonth() + 1;
        let d = day2.getDate() < 10 ? "0" + day2.getDate() : day2.getDate();
        let newData = `${y}-${m}-${d}`
        switch (num) {
          case 1:
            this.listQuery = JSON.parse(JSON.stringify(this.tempListQuery));
            this.listQuery.executeResult = "";
            this.executeSelectList = [];
            this.listQuery.executeStatus = ['0'];
            this.$set(this.select_filter_list, 'executeStatus', `是否实施-未实施`);
            // this.selectExecuteStatusHandle(['0']);
            this.getList();
            break;
          case 2:
            this.listQuery = JSON.parse(JSON.stringify(this.tempListQuery));
            this.listQuery.executeType = ['1'];
            this.listQuery.executeTimeStart = `${newData} 00:00:00`;
            this.listQuery.executeTimeEnd = `${newData} 00:00:00`;
            this.actualDate = [newData, newData];
            this.$set(this.select_filter_list, 'executeType', `实施类别-电话联系`);
            this.$set(this.select_filter_list, 'actualDate', `实际实施日期-${newData}至${newData}`)
            this.getList();
            // this.selectExecuteTypeHandle(["1"]);
            // this.planDateHandle([newData, newData]);
            break;
          case 3:
            this.listQuery = JSON.parse(JSON.stringify(this.tempListQuery));
            this.listQuery.executeType = ['2'];
            this.listQuery.executeTimeStart = `${newData} 00:00:00`;
            this.listQuery.executeTimeEnd = `${newData} 00:00:00`;
            this.actualDate = [newData, newData];
            this.$set(this.select_filter_list, 'executeType', `实施类别-上门拜访`)
            this.$set(this.select_filter_list, 'actualDate', `实际实施日期-${newData}至${newData}`)
            this.getList();
            // this.selectExecuteTypeHandle(["2"]);
            // this.planDateHandle([newData, newData]);
            break;
          case 4:
            this.listQuery = JSON.parse(JSON.stringify(this.tempListQuery));
            this.listQuery.executeResult = '2';
            this.listQuery.executeTimeStart = `${newData} 00:00:00`;
            this.listQuery.executeTimeEnd = `${newData} 00:00:00`;
            this.actualDate = [newData, newData];
            this.executeSelectList = ["2"];
            this.$set(this.select_filter_list, 'executeResult', `实施效果-有意向`)
            this.$set(this.select_filter_list, 'actualDate', `实际实施日期-${newData}至${newData}`);
            this.getList();
            // this.selectExecuteResultHandle(["2"]);
            // this.planDateHandle([newData, newData]);
            break;
          case 5:
            this.listQuery = JSON.parse(JSON.stringify(this.tempListQuery));
            this.listQuery.executeResult = '3';
            this.listQuery.executeTimeStart = `${newData} 00:00:00`;
            this.listQuery.executeTimeEnd = `${newData} 00:00:00`;
            this.actualDate = [newData, newData];
            this.executeSelectList = ["3"];
            this.$set(this.select_filter_list, 'executeResult', `实施效果-签单`)
            this.$set(this.select_filter_list, 'actualDate', `实际实施日期-${newData}至${newData}`)
            if (this.allowGetList.twoAllow) {
              this.getList();
            } else {
              this.$message.warning('抱歉，您没有此权限')
            }
            break;
        }
      },
      //搜索栏---点击新增
      addListHandle() {
        this.updateForm = {
          crmCompanyId: "",
          planDate: "",
          companyName: "",
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
        this.addMoreSale.push(obj);

        this.addSaleDialogVisible = true;
      },

      //搜索栏---导入模板
      beforeUpload(file) {
      },
      handleExceed(files, fileList) {
        // this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      UploadUrl() {
        return '/api/filelibrary/appFile/uploadFile' // 返回需要上传的地址
      },
      // 选择文件上传
      fileChange(file) {
        this.$confirm('确定导入销售计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let fileName = file.raw.name.substr(file.raw.name.lastIndexOf("."));
          if (fileName != '.xlsx' && fileName != '.xls') {
            this.$message({type: 'warning', message: '导入文件必须是xlsx'});
            return;
          }

          this.fileTemp = file.raw;
          const formData = new FormData();
          formData.append('file', this.fileTemp);
          if (this.fileTemp) {
            importSalePlanList(formData).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });

                this.exportFailShow = false;
                this.exportFailMsg = {};

                let taskMsg = {
                  taskId: res.data.taskId
                };

                this.$store.commit('SET_SALEPLAN_TASKMSG', taskMsg);
                this.exportShow = true;
                this.getTaskInfo();

                if (this.allowGetList.twoAllow) {
                  this.listQuery.page = 0;
                  this.getList();
                } else {
                  this.$message.warning('抱歉，您没有此权限')
                }
              }
            })
          } else {
            this.$message({
              type: 'warning',
              message: '请上传文件！'
            });
            this.fileTemp = '';
            this.fileList = []
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '导入已取消'
          })
        }).finally(() => {
          this.fileTemp = '';
          this.fileList = [] // 清空excel文件
        })
      },

      //搜索栏---下载导入模板
      get_import_template() {
        getSalePlanTemplate({}).then(res => {
          if (res.code === 200) {
            downloadTemplate({fileName: res.data, delete: true}).then(response => {
              const url = window.URL.createObjectURL(response)
              let a = document.createElement('a')
              document.body.appendChild(a)
              let date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()
              const fileName = date + '-销售计划模板' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url);
              this.$message({
                type: 'success',
                message: res.message
              });
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            });
          }
        })
      },

      //筛选栏--获取企业列表
      getCompanyDeptTrees() {
        getCompanyDeptTree({
          'companyId': this.$store.getters.companyId,
          'companyName': this.companyName
        }).then(res => {
          this.companyList = res.data.deptInfoTreeVos;
        })
      },

      //筛选栏--获取员工列表
      getUserComboInfo(deptIds) {
        let name = '业务员,业务主管';
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (deptIds != undefined) {
          formData.append('deptIdList', deptIds)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            this.userList = res.data;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //筛选栏-选择部门-操作
      selectCompanyHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.companyList.forEach(item => {
            val.forEach(val => {
              if (item.deptId == val) {
                arr.push(item.deptName)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'deptIds', `部门-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'deptIds')
          this.$delete(this.select_filter_list, 'userIds')
          this.userList = [];
        }

        this.getUserComboInfo(val);
        this.handleFilter();
      },

      //筛选栏-选择员工-操作
      selectUserHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.userList.forEach(item => {
            val.forEach(val => {
              if (item.userId == val) {
                arr.push(item.userName)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'userIds', `员工-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'userIds')
        }
        this.handleFilter();
      },

      //筛选栏-选择客户类别-操作
      selectCompanyTypeHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.companyTypeList.forEach(item => {
            val.forEach(val => {
              if (item.num == val) {
                arr.push(item.value)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'companyType', `客户类别-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'companyType')
        }
        this.handleFilter();
      },

     //筛选栏-是否实施-操作
      selectExecuteStatusHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.executeStatusList.forEach(item => {
            val.forEach(val => {
              if (item.num == val) {
                arr.push(item.value)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'executeStatus', `是否实施-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'executeStatus')
        }
        this.handleFilter();
      },

      //筛选栏-实施类别-操作
      selectExecuteTypeHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.executeTypeDetail.forEach(item => {
            val.forEach(val => {
              if (item.num == val) {
                arr.push(item.value)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'executeType', `实施类别-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'executeType')
        }
        this.handleFilter();
      },

      //筛选栏-实施效果-操作
      selectExecuteResultHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.executeResultDetail.forEach(item => {
            val.forEach(val => {
              if (item.num == val) {
                arr.push(item.value)
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'executeResult', `实施效果-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'executeResult')
        }
        this.handleFilter();
      },

      //筛选栏-是否评论-操作
      selectIsCommentHandle(val) {
        const arr = []
        if (val.length != 0) {
          this.isCommentList.forEach(item => {
            val.forEach(val => {
              if (item.num == val) {
                arr.push(item.value);
                const string = arr.join('，')
                this.$set(this.select_filter_list, 'isComment', `是否评论-${string}`)
              }
            })
          })
        } else {
          this.$delete(this.select_filter_list, 'isComment')
        }
        this.handleFilter();
      },

      //筛选栏-登录日期--操作
      loginDataHandle(val) {
        if (val !== null && val.length !== 0) {
          this.listQuery.createTimeStart = `${val[0]} 00:00:00`;
          this.listQuery.createTimeEnd = `${val[1]} 00:00:00`;
          this.$set(this.select_filter_list, 'loginDate', `创建日期-${val[0]}至${val[1]}`)
        } else {
          this.listQuery.createTimeStart = ""
          this.listQuery.createTimeEnd = ""
          this.$delete(this.select_filter_list, 'loginDate')
        }
        this.handleFilter();
      },

      //筛选栏-计划实施日期--操作
      planDateHandle(val) {
        if (val !== null && val.length !== 0) {
          this.listQuery.planDateStart = `${val[0]} 00:00:00`;
          this.listQuery.planDateEnd = `${val[1]} 00:00:00`;
          this.$set(this.select_filter_list, 'planDate', `计划实施日期-${val[0]}至${val[1]}`)
        } else {
          this.listQuery.planDateStart = ""
          this.listQuery.planDateEnd = ""
          this.$delete(this.select_filter_list, 'planDate')
        }
        this.handleFilter();
      },

      //筛选栏-实际实施日期--操作
      actualDateHandle(val) {
        if (val !== null && val.length !== 0) {
          this.listQuery.executeTimeStart = `${val[0]} 00:00:00`;
          this.listQuery.executeTimeEnd = `${val[1]} 00:00:00`;
          this.$set(this.select_filter_list, 'actualDate', `实际实施日期-${val[0]}至${val[1]}`)
        } else {
          this.listQuery.executeTimeStart = ""
          this.listQuery.executeTimeEnd = ""
          this.$delete(this.select_filter_list, 'actualDate')
        }
        this.handleFilter();
      },

      //筛选栏-删除一个
      deleteOneClick(item) {
        this.list = [];
        this.$delete(this.select_filter_list, item);
        if (Array.isArray(this.listQuery[item])) {
          this.listQuery[item] = []
        } else {
          if (item === 'loginDate') {
            this.loginDate = [];
            this.listQuery.createTimeStart = this.listQuery.createTimeEnd = "";
          } else if (item === 'planDate') {
            this.planDate = [];
            this.listQuery.planDateStart = this.listQuery.planDateEnd = "";
          } else if (item === 'actualDate') {
            this.actualDate = [];
            this.listQuery.executeTimeStart = this.listQuery.executeTimeEnd = "";
          } else if (item === 'executeResult') {
            this.executeSelectList = [];
          } else if (item === 'deptIds') {
            this.getUserComboInfo();
          } else {
            this.$delete(this.listQuery, item);
          }
        }
        this.handleFilter();
      },

      //筛选栏-删除所有
      deleteAllClick() {
        this.list = []
        this.select_filter_list = {}
        this.listQuery = {
          // companyId:this.$store.getters.companyId,
          page: 0,
          pageSize: 10,
          companyType: [],
          executeStatus: [],
          executeType: [],
          executeResult: "",
          isComment: [],
          createTimeStart: "",
          createTimeEnd: "",
          planDateStart: "",
          planDateEnd: "",
          executeTimeStart: "",
          executeTimeEnd: ""
        };
        this.loginDate = [];
        this.planDate = [];
        this.actualDate = [];
        this.executeSelectList = [];
        this.getUserComboInfo();
        this.handleFilter()
      },

      //筛选栏-排序
      sortListHandle(val) {
        this.sortDataList.forEach(item => {
          if (item.id === val) {
            if (item.type && item.type !== undefined) {
              this.listQuery.orderType = item.type
            }
          }
        })
        if (val.includes('-')) {
          val = val.substr(1);
        }
        this.listQuery.orderField = val;
        this.handleFilter();
      },

      //筛选栏-筛选的多选，下拉，单选---操作
      handleFilter() {
        this.listQuery.page = 0
        if (this.allowGetList.twoAllow) {
          this.getList();
          this.isCheckAll = false;
        } else {
          this.$message.warning('抱歉，您没有此权限')
        }
      },

      //筛选栏-点击选择筛选条件
      handleScreenBtn() {
        this.isScreenShow = !this.isScreenShow;
        if (this.isScreenShow) {
          this.userList = [];
          this.getCompanyDeptTrees();
          this.getRegionList();
          this.getUserComboInfo();
        }
      },

      // 省
      changeProvince(val) {

        if (val) {
          this.$set(this.select_conditions_list, 'provinceId', '省份 - ' + this.province_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'provinceId')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.$delete(this.select_conditions_list, 'cityId')
        this.$delete(this.select_conditions_list, 'districtId')
        this.$delete(this.select_conditions_list, 'townId')
        this.listQuery.cityId = '';
        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.parentId = val
        this.level = 2;
        this.getRegionList()
        this.getList()
      },
      //城市
      changeCity(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'cityId', '城市 - ' + this.city_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'cityId')
        }
        this.$delete(this.select_conditions_list, 'districtId')
        this.$delete(this.select_conditions_list, 'townId')

        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 1;
        this.getRegionList()
        this.getList()
      },
      // 区县
      changeDistrict(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'districtId', '区县 - ' + this.district_list.find(ele => ele.dictId === val).dictName)
          this.$delete(this.select_conditions_list, 'townId')
        } else {
          this.$delete(this.select_conditions_list, 'districtId')
          this.$delete(this.select_conditions_list, 'townId')

          this.listQuery.townId = '';
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 0;
        this.getRegionList()
        this.getList()
      },
      // 镇街
      getTownsId(val) {
        if (val) {
          this.$set(this.select_conditions_list, 'townId', '镇街 - ' + this.town_list.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.select_conditions_list, 'townId')
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.getList()
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
      },

      //条件查询销售计划列表
      getList() {
        // this.listQuery.page = 0;
        // this.listQuery.pageSize = 20;
        this.listQuery.executeResult = this.executeSelectList.join(',');
        querySalePlanList(this.listQuery).then(res => {
          let list = res.data.data;
          list.forEach(item => {
            this.projectWriteList.forEach(data => {
              if (data.projectId == item.projectName) {
                item.newProjectName = data.projectName;
              }
            })
          });
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

          newRes.forEach(item => {
            if (item.executeResult && item.executeResult != '') {
              item.executeResult = item.executeResult.split(",");
            }
          });

          if (this.listQuery.page > 0) {
            this.list = this.list.concat(newRes);
          } else {
            this.list = newRes;
            this.check_biz_ids = [];

            if(this.$store.getters.salePlanPage != 0){
              this.listQuery.page = this.$store.getters.salePlanPage;
              this.listQuery.pageSize = 20;
            }
          }

          let obj = {}
          this.list = this.list.reduce((cur, next) => {
            obj[next.crmCompanyId] ? '' : obj[next.crmCompanyId] = true && cur.push(next)
            return cur
          }, [])

          this.listTotal = res.data.total;
          this.pages = res.data.pages;
        })
      },
      //列表---获取销售计划列表
      // getList() {
      //   this.listQuery.page = 0;
      //   this.listQuery.pageSize = 20;
      //   this.listQuery.executeResult = this.executeSelectList.join(',');
      //   querySalePlanList(this.listQuery).then(res => {
      //     let list = res.data.data;
      //     list.forEach(item => {
      //       this.projectWriteList.forEach(data => {
      //         if (data.projectId == item.projectName) {
      //           item.newProjectName = data.projectName;
      //         }
      //       })
      //     });
      //     let newRes = [];
      //     let R = [], F;
      //     for (F = 0; F < list.length;) R.push(list.slice(F, F += 5));
      //     R.forEach(item => {
      //       item.forEach((data, index) => {
      //         this.picBackgroundList.forEach((val, key) => {
      //           if (index === key) {
      //             data.bgColor = val;
      //           }
      //         })
      //       })
      //     });
      //     R.forEach(item => {
      //       item.forEach(item => {
      //         newRes.push(item);
      //       })
      //     });
      //
      //     newRes.forEach(item => {
      //       if (item.executeResult && item.executeResult != '') {
      //         item.executeResult = item.executeResult.split(",");
      //       }
      //     });
      //
      //     this.list = newRes;
      //     this.listTotal = res.data.total;
      //
      //     this.check_biz_ids = [];
      //   })
      // },

      //列表---点击加载更多
      getMore() {
        this.tempPage = this.listQuery.page += 20
        this.listQuery.pageSize = 20;
        if (this.list.length < this.listTotal) {
          querySalePlanList(this.listQuery).then(res => {
            let list = res.data.data
            let newRes = []
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
            this.list = this.list.concat(newRes)
          })
        }
      },

      //列表---为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
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

      //列表---回到顶部
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

      //列表---全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          let _this = this
          this.list.forEach((item, index) => {
            item.salePlanBos.forEach(data => {
              if (_this.check_biz_ids.indexOf(data.planId) === -1) {
                _this.check_biz_ids.push(data.planId)
              }
              _this.isCheckAll = true
            })
          })
        }
      },

      //列表---单选一个
      checkOneOrNo() {
        let num = 0;
        this.list.forEach(item => {
          num = num + item.salePlanBos.length
        });
        if (this.check_biz_ids.length === num) {
          this.isCheckAll = true
        } else {
          this.isCheckAll = false
        }
      },

      //列表---导出
      handleExport() {
        this.listQuery.page = 0;
        this.listQuery.pageSize = this.listTotal
        let list_query = JSON.parse(JSON.stringify(this.listQuery))
        list_query.planIds = this.check_biz_ids;
        exportSalePlanList(list_query).then(res => {
          if (res.code === 200) {
            downloadTemplate({fileName: res.message, delete: true}).then(response => {
              const url = window.URL.createObjectURL(response)
              let a = document.createElement('a')
              document.body.appendChild(a)
              this.listQuery.page = this.tempPage;
              let date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()
              const fileName = date + '-销售计划' + '.xlsx'
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

      //列表---删除
      delItemHandle() {
        if (this.check_biz_ids.length === 0) {
          this.$message({
            message: '请勾选要删除的行！',
            type: 'warning'
          });
        } else {
          deleteSalePlanByIds(this.check_biz_ids).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.message,
                type: 'success'
              });
              if (this.allowGetList.twoAllow) {
                this.listQuery.page = 0;
                this.getList();
              } else {
                this.$message.warning('抱歉，您没有此权限')
              }
            } else {
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
        }
      },

      //列表---点击变更---获取详情(true:再次规划，false:变更)
      editListHandle(data, type, parentData) {
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

          if (item.crmCompanyId == '' && item.companyName == '') {
            this.$message.warning('请选择或输入目标客户');
            throw new Error();
          }


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

      //远程查询
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getCompanyData(query);
          }, 100);
        } else {
          this.targetUserParam.companyNameOnly = "";
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getTargetUserList();
          }, 100);
        }
      },

      //选择目标客户--焦点离开的时候
      handleSelectDataBlue() {
        this.targetUserParam.companyNameOnly = "";
        this.getTargetUserList();
      },

      // 选择目标客户
      handleSelectMoreDataBlue() {
        this.targetUserParam.companyNameOnly = "";
        this.targetUserParam.page = 0;
        this.saleIndex = '';
        this.getTargetUserList();
      },


      //远程搜索推广项目
      remoteProject(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.projectByParam.page = 0
            this.projectByParam.projectName = query;
            this.getProjectData();
          }, 100);
        } else {
          this.projectByParam.projectName = "";
          this.projectByParam.page = 0
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getProjectData();
          }, 100);
        }
      },

      //选择项目取消焦点
      handleSelectProjectBlue() {
        this.projectByParam.projectName = "";
        this.getProjectData();
      },

      //获取企业
      getCompanyData(query) {
        this.targetUserParam.page = 0;
        this.targetUserParam.companyNameOnly = query;
        queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
          if (res.code == 200) {
            this.companyNameList = res.data.data;
            this.companyTotalList = res.data.total;

            if (this.saleIndex !== "") {
              this.addMoreSale[this.saleIndex].companyUserList = res.data.data;
            }
          }
        })
      },

      //新增/变更 获取更多目标客户
      loadMore() {
        if (this.selectUserOrProject === 'user') {
          this.targetUserParam.page += 10;
          queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
            if (res.code == 200) {
              if (this.companyNameList.length >= res.data.total) {
                return false
              } else {
                this.companyNameList = this.companyNameList.concat(res.data.data)
              }
            }
          })
        } else if (this.selectUserOrProject === 'project') {
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
        }


        if (this.selectUserOrProject === 'moreUser') {
          this.targetUserParam.page += 10;
          queryCrmCompanyInfoByCommon(this.targetUserParam).then(res => {
            if (res.code == 200) {
              if (this.addMoreSale[this.saleIndex]) {
                if (this.addMoreSale[this.saleIndex].companyUserList.length >= res.data.total) {
                  return false
                } else {
                  this.addMoreSale[this.saleIndex].companyUserList = this.addMoreSale[this.saleIndex].companyUserList.concat(res.data.data)
                }
              }
            }
          })
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
      //跳转到详情
      goPlanDetail(data) {
        if (this.allowDetails.twoAllow) {
          this.$router.push({'path': '/customer/salesPlanDetail', 'query': {'id': data.planId}})
        } else {
          this.$message.warning('抱歉，您没有此权限')
        }

      },
      //跳转到公司详情
      toCheck(data) {
        this.$router.push({
          'path': '/customer/editCustomer',
          'query': {'id': data.crmCompanyId, 'check': true, 'tip': true, isContractListSkipFlag: 1}
        })
      },

      //取消新增销售计划
      cananlMoreSaleHandle() {
        this.addMoreSale = [];
        this.addSaleDialogVisible = false;
      },

      must(obj) {
        if (obj.columnIndex == 0 || obj.columnIndex == 3 || obj.columnIndex == 4 || obj.columnIndex == 5) {
          return 'must';
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .sales-plan-box {
    margin: auto 5%;

    .search-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      padding: 20px 16px;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      border-radius: 4px;

      .el-button + .el-button {
        margin: 0;
      }

      .btn {
        height: 48px;
        border: 0;
        width: 120px;
        color: #fff;
        border-radius: 0;
        background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

        &:active {
          opacity: .5;
        }
      }

      .import-btn {
        margin-left: 20px;
        background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
      }

      .search {
        display: flex;
        align-items: center;
        justify-content: flex-end;companyUserList
        margin-right: 20px;
        width: 50%;

        .search-input {
          /deep/ .el-input__inner {
            height: 48px;
            border-radius: 0;
            border: 1px solid #05AAFF;
            border-right: 0;
          }
        }
      }

      .down-load-modal {
        color: #5883FF;
        font-size: 14px;
        margin-left: 14px;
        cursor: pointer;
        white-space: nowrap;

        .icon-down-load {
          vertical-align: middle;
        }
      }
    }

    .address-group {
      display: flex;
      align-items: center;

      .address-input {
        /*width: 12%;*/
        margin-right: 20px;
      }
    }


    .screen-bar {
      background: #fff;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

      .screen-title {
        display: flex;
        padding: 14px 16px;
        padding-bottom: 3px;

        .name {
          color: #042B40;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          white-space: nowrap;
          margin-right: 10px;
          display: flex;
          padding-top: 5px;

          .line {
            width: 3px;
            height: 14px;
            background: rgba(5, 170, 255, 1);
            display: inline-block;
            margin-right: 8px;
            margin-top: 4px;
          }

          .text {
            margin-top: 2px;
          }
        }

        .selected-list {
          width: 90%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 4px;
          min-height: 35px;

          .item {
            padding: 4px 6px;
            font-size: 12px;
            border: 1px solid #05AAFF;
            color: #05AAFF;
            margin-right: 13px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .text {
              margin-top: 2px;
              margin-right: 6px;
            }

            img {
              cursor: pointer;
            }

            &.clear {
              padding: 5px 15px;
              cursor: pointer;
              color: #F56C6C;
              border: 1px solid #F56C6C;
            }
          }
        }

        .screen-btn {
          margin-top: 3px;

          .btn {
            cursor: pointer;
            white-space: nowrap;

            img {
              vertical-align: middle;
            }

            .text {
              margin-top: 1px;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
      }

      .screen-list {
        padding: 16px 16px 3px 25px;
        border-top: 1px solid rgba(219, 233, 255, 1);

        .form-item {
          display: flex;
          align-items: center;
          margin-bottom: 17px;

          .label-text {
            width: 100px;
            font-size: 14px;
            color: rgba(4, 43, 64, 1);
            white-space: nowrap;
            text-align: right;
            font-weight: 600;
            margin-right: 12px;
          }

          .form-handle {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .select-input {
              margin-right: 20px;

              .el-input__inner {
                min-height: 32px;
              }

              .el-input__icon {
                line-height: 30px;
              }
            }
          }

          .date-select {
            width: 290px;

            /deep/ .el-range-separator {
              padding: 0;
              line-height: 33px;
            }

            /deep/ .el-date-editor .el-range__close-icon {
              line-height: 34px;
            }
          }
        }
      }
    }

    .list {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);
      margin-top: 16px;

      .list-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 16px;
        box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);

        .left {
          display: flex;
          align-items: center;

          .title-text {
            display: flex;
            align-items: center;
            margin-right: 38px;

            .line {
              margin-right: 8px;
              display: inline-block;
              width: 3px;
              height: 14px;
              background: rgba(255, 169, 106, 1);
            }

            .search-total-num {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(68, 68, 68, 0.75);

              .num {
                color: #FF6C6C;
              }
            }
          }

          .title-btn-group {
            display: flex;
            align-items: center;

            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 20px;
              padding: 4px 9px;
              font-size: 16px;
              color: rgba(5, 170, 255, 1);
              border: 1px solid rgba(5, 170, 255, 1);
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                color: #fff;
                background: rgba(5, 170, 255, 1);
              }

              &.del {
                border: 1px solid rgba(245, 108, 108, 1);
                color: rgba(245, 108, 108, 1);

                &:hover {
                  color: #fff;
                  background: rgba(245, 108, 108, 1);
                }
              }

              &:active {
                opacity: .5;
              }
            }
          }
        }

        .right {
          .select-sort {
            font-size: 16px;

            .el-input__inner {
              border: 0;
              text-align: right;
            }

            .el-popper[x-placement^=bottom] .popper__arrow {
              right: 35px;
              left: initial;
            }
          }
        }
      }

      .list-detail {
        .item {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          padding-bottom: 8px;
          position: relative;
          border-bottom: 1px solid #ddd;

          &:last-child {
            border-bottom: 0;
          }

          .item-detail {
            width: 100%;
            display: flex;
            align-items: flex-start;

            .pic {
              display: flex;
              align-items: center;
              margin-right: 20px;


              .img-box {
                width: 84px;
                height: 84px;
                border-radius: 5px;
                background: rgba(105, 204, 255, 1);
                margin-left: 15px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
              }
            }

            .detail {
              width: 100%;

              .text {
                margin-right: 18px;
              }

              .title {
                font-size: 18px;
                color: rgba(68, 68, 68, 1);
                font-weight: bold;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                cursor: pointer;
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
        }


        .no-data, .get-more {
          padding: 30px 0;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    .inline-block {
      display: inline-block;
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

    .goTop {
      height: 60px;
      position: fixed;
      bottom: 20px;
      right: 0;
      width: 80px;
    }

    .editorUserModal {
      .el-form-item{
        margin-bottom: 0;
      }
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

    .add-sale-modal {
      /deep/ .el-dialog__header {
        border-bottom: 1px solid #ccc;
      }

      .add-sale-table {
        .flex-center {
          display: flex;
          align-items: center;

          i {
            font-size: 14px;
            color: #00A5FF;
            cursor: pointer;
            margin-left: 10px;
          }
        }

        .icon-sale-del {
          color: red;
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
  }

  /deep/ .select-sort-option {
    z-index: 98 !important;

    /deep/ .popper__arrow {
      right: 40px !important;
      left: auto !important;
    }
  }

  .el-button.is-disabled {
    color: #fff;
    background-image: none !important;
    background-color: #C0C4CC !important;
  }

  /deep/ .el-table th.must > .cell:before {
    content: '*';
    color: #ff1818;
  }
</style>
