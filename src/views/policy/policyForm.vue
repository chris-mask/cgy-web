<template>
  <div class="notice-form">
    <el-card class="top-margin-10 classBut" :class="{fixed:fixed}" >
    <div  class="step" >
        <el-button :class="classChoose==1?'class-Choose':''"   @click="jump('info')"   >基本信息</el-button>
        <el-button :class="classChoose==2?'class-Choose':''"   @click="jump('subsidies')" >补贴项目信息</el-button>
        <el-button :class="classChoose==3?'class-Choose':''"   @click="jump('interpretation')"  >政策解读</el-button>
        <el-button :class="classChoose==4?'class-Choose':''"   @click="jump('original')"  >政策原文</el-button>
        <!-- <el-button     @click="chooseQrCode" class="qrCodeChoose" >生成二维码

        <div class="qrcode-out"  :class="qrCodeShowOrNo==true?'qrcode-out-show':'qrcode-out-no'"   >
          <div class="qrcode" ref="qrCodeUrl">  </div>
          <span>用微信扫码二维码<br/>分享至好友和朋友圈 </span>
        </div>

        </el-button> -->
    </div>
    </el-card>

    <!--基本信息-->
    <el-form ref="form" id="info"  :rules="rules" :model="form" label-width="auto" label-position="left" @submit.native.prevent>
      <el-card class="top-margin-10">
        <div slot="header" class="clearfix">
          <span style="color: #6DDD81; font-weight: bold;width: 3px;">|</span>
          <span class="index-content-title">&nbsp;基本信息</span>
        </div>
        <div>
          <el-row type="flex" :gutter="10">
            <el-col :span="10" :offset="2">
              <div class="address-bar">
                <label class="address-title">
                  <span style="color: #F56C6C;">*</span> 地区：
                </label>
                <div class="address-group" v-if="!isCheck">
                  <el-select @change='changeProvince' style="margin-right: 20px;" clearable v-model="form.provinceId"
                             placeholder="省份">
                    <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='changeCity' style="margin-right: 20px;" clearable v-model="form.cityId"
                             placeholder="城市">
                    <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select @change='changeDistrict' style="margin-right: 20px;" clearable v-model="form.districtId"
                             placeholder="县区">
                    <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                  <el-select style="margin-right: 20px;" clearable v-model="form.townId" placeholder="镇街">
                    <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"></el-option>
                  </el-select>
                </div>
                <div v-else>{{form.provinceName}}{{form.cityName}}{{form.districtName}}{{form.townName}}</div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="address-bar" style="padding-left: 0">
                <label class="address-title" style="padding-left: 20px;">
                  <span style="color: #F56C6C;">*</span> 申报年份：
                </label>
                <el-date-picker v-if="!isCheck" type="year" v-model="form.projectYear" placeholder="选择年份"
                                value-format="yyyy"></el-date-picker>
                <div v-else>{{form.projectYear}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="10">
            <el-col :span="10" :offset="2">

              <div class="address-bar" style="padding-left: 0">
                <label class="address-title">
                  <span style="color: #F56C6C;">*</span> 发布单位：
                </label>
                <el-input v-if="!isCheck" v-model.trim="form.publishOrgan" placeholder="请输入发布单位"
                          maxlength="50"></el-input>
                <div v-else>{{form.publishOrgan}}</div>
              </div>

            </el-col>
            <el-col :span="10">
              <div class="address-bar" style="padding-left: 0">
                <label class="address-title" style="padding-left: 20px;">
                  <span style="color: #F56C6C;">*</span> 发布日期：
                </label>
                <el-date-picker v-if="!isCheck" type="date" v-model="form.publishDate" placeholder="选择日期"
                                value-format="yyyy-MM-dd"></el-date-picker>
                <div v-else>{{form.publishDate}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="10">
            <el-col :span="10" :offset="2">
              <div class="address-bar" style="padding-left: 9px;">
                <label class="address-title">
                  扶持方式：
                </label>
                <el-select v-if="!isCheck" style="width: 100%;" v-model="form.subsidyWay" clearable
                           placeholder="选择扶持方式">
                  <el-option v-for="item in supply_way_list" :key="item.dictId" :value="item.dictId"
                             :label="item.dictName"></el-option>
                </el-select>
                <div v-else>{{form.subsidyWay==1?'事后补偿':form.subsidyWay==2?'无偿补偿':form.subsidyWay==3?'其他':'-'}}</div>

              </div>
            </el-col>
            <el-col :span="10">
              <div class="address-bar" style="padding-left: 0">
                <label class="address-title" style="padding-left: 29px;">
                  补助行业：
                </label>
                <el-select v-if="!isCheck" @focus="getCommonData" filterable clearable v-model="form.subsidyIndustry"
                           placeholder="选择补助行业">
                  <el-option v-for="item in supply_industry_list"
                             :key="item.dictId"
                             :value="item.dictId"
                             :label="item.dictName"></el-option>
                </el-select>
                <div v-else>{{form.subsidyIndustryName && form.subsidyIndustryName != ''?form.subsidyIndustryName
                  :'-'}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="10">
            <el-col :span="10" :offset="2">
              <div class="address-bar" style="padding-left: 0">
                <label class="address-title">
                  <span style="color: #F56C6C;">*</span> 难易程度：
                </label>
                <el-select v-if="!isCheck" style="width: 100%;" clearable v-model="form.applyDifficulty"
                           placeholder="选择难易程度">
                  <el-option v-for="item in difficulty_list"
                             :key="item.dictId"
                             :value="item.dictId"
                             :label="item.dictName">
                  </el-option>
                </el-select>
                <div v-else>{{form.applyDifficulty == 1?'普惠性':form.applyDifficulty ==2?'竞争性':'-'}}</div>

              </div>
            </el-col>
            <el-col :span="10">
              <div class="address-bar" style="padding-left: 33px;">
                <label class="address-title">
                  <span style="color: #F56C6C;">&nbsp;</span> 有效期：
                </label>
                <el-date-picker
                unlink-panels
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  v-model="termDate"
                  v-if="!isCheck"
                />
                <div v-else>
                  {{form.validDateBegin&& form.validDateEnd?termDateName:'-'}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="10">
            <el-col :span="20" :offset="2">
              <el-form-item label="补助详情：">
                <el-input maxlength="4000" v-if="!isCheck" v-model="form.noticeRemark" type="textarea" :rows="3"
                          placeholder="请输入备注"></el-input>
                <span v-else>{{form.noticeRemark && form.noticeRemark != ''? form.noticeRemark : '-'}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-form>

    <!--补贴项目信息-->
    <el-card id="subsidies"  class="top-margin-10 project-massage">
      <div slot="header" class="clearfix">
        <div>
          <span style="color: #05AAFF; font-weight: bold;width: 3px;">|</span>
          <span>&nbsp;补贴项目信息</span>
          <span style="margin-left: 10px;">
            <el-checkbox v-model="isShowTerm">
              显示申报条件
            </el-checkbox>
          </span>
        </div>

        <button v-if="!isCheck" class="select_project_bt select-project float-right" @click="goSelectProject">
          选择项目
        </button>
      </div>
      <div class="list-box">
        <div class="item" v-for="(item,index) in select_projects">
          <div class="main-project">
            <div class="left">
              <div class="index">{{index+1}}</div>
              <div class="form-box">
                <div class="project-form">
                  <!--项目名称-->
                  <div class="project-name">
                    项目名称：{{item.projectName}}
                    <div class="right" v-if="!isCheck">
                      <button class="del-project-btn add-project-btn" @click="addSubsidyHandle(item,index)">新增批次
                      </button>
                      <button class="del-project-btn" @click="removeProjectItem(item,index)">移除</button>
                    </div>
                  </div>

                  <!--项目级别-->
                  <div class="project-sub-list" v-for="(data,index) in item.policyNoticeProjectRelList">
                    <div class="left-sub">
                      <div class="three-input">
                        <div class="project-level" v-if="item.projectType != 822466810090618880">
                          <span class="xin">*</span>项目级别：
                          <el-select v-if="!isCheck" v-model="data.projectLevel">
                            <el-option label="国家级" :value="1"></el-option>
                            <el-option label="省级" :value="2"></el-option>
                            <el-option label="市级" :value="3"></el-option>
                            <el-option label="区县级" :value="4"></el-option>
                            <el-option label="镇街级" :value="5"></el-option>
                          </el-select>
                          <div v-else>
                            {{data.projectLevel==1?'国家级':data.projectLevel==2?'省级':data.projectLevel==3?'市级':data.projectLevel==4?'区县级':data.projectLevel==5?'镇街级':'-'}}
                          </div>
                        </div>

                        <div class="project-level" v-if="item.projectType == 822466810090618880">
                          职称专业：
                          <el-input v-if="!isCheck" v-model="data.titleMajor" placeholder="职称专业"></el-input>
                          <div v-else>
                            {{data.titleMajor}}
                          </div>
                        </div>
                        <div class="project-level" v-if="item.projectType == 822466810090618880">
                          <span class="xin">*</span>职称系列：
                          <el-select v-if="!isCheck" v-model="data.titleSeries" @change="getTitleLevel(data, 1)">
                            <el-option v-for="title in data.titleSeriesList" :label="title.dictName" :value="title.dictId" :key="title.dictId"></el-option>
                          </el-select>
                          <div v-else>
                            {{data.titleSeriesName}}
                          </div>
                        </div>
                        <div class="project-level" v-if="item.projectType == 822466810090618880">
                          <span class="xin">*</span>职称级别：
                          <el-select v-if="!isCheck" v-model="data.titleLevel">
                            <el-option v-for="title in data.titleLevelList" :label="title.dictName" :value="title.dictId" :key="title.dictId"></el-option>
                          </el-select>
                          <div v-else>
                            {{data.titleLevelName}}
                          </div>
                        </div>

                        <div class="project-min-subsidy">
                          <span class="xin">*</span>批次：
                          <el-select v-if="!isCheck" v-model="data.projectBatchNo" class="money-input" placeholder="批次">
                            <el-option
                              v-for="item in projectBatchData"
                              :label="item.lable"
                              :value="item.value"
                              :key="item.value"
                            />
                          </el-select>

                          <div v-else>
                            {{data.projectBatchNo==0?'未指定':data.projectBatchNo==1?'第一批':data.projectBatchNo==2?'第二批':data.projectBatchNo==3?'第三批':data.projectBatchNo==4?'第四批':data.projectBatchNo==5?'第五批':'-'}}
                          </div>
                        </div>

                        <div class="project-max-subsidy">
                          <span class="xin">*</span>线上提交日期：
                          <div v-if="!isCheck">
                            <el-date-picker
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              v-model="data.onlineDate"
                            />
                            <el-checkbox v-model="data.isOnlineWrite">没有提交时间</el-checkbox>
                          </div>
                          <div v-else>{{data.onlineDateName}}</div>
                        </div>
                        <div class="project-max-subsidy">
                          <span class="xin">*</span>纸质提交日期：
                          <div v-if="!isCheck">
                            <el-date-picker
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd"
                              v-if="!isCheck"
                              v-model="data.paperDate"
                            />
                            <el-checkbox v-model="data.isPaperWrite">没有提交时间</el-checkbox>
                          </div>
                          <div v-else>{{data.paperDateName}}</div>
                        </div>
                      </div>
                    </div>
                    <i v-if="item.isDel && !isCheck" class="del-sub-list el-icon-delete"
                       @click="delProjectHandle(item,index)"></i>
                  </div>

                  <!--申报条件-->
                  <div class="main-declare" v-if="isShowTerm">
                    <div class="title">
                      <div class="title-name">申报条件</div>
                      <button class="choice-term-btn" @click="choiceCondition(item.policyApplyConditionVoList, item.projectId)"  v-if="!isCheck && allowCondition.twoAllow">选择复制条件</button>
                      <button class="add-term-btn" @click="addTermHandle(item)" v-if="!isCheck && allowCondition.twoAllow">新增条件</button>
                    </div>

                    <div class="content">
                      <div class="list" v-for="(list,index) in item.policyApplyConditionVoList">
                        <div class="list-num">{{index+1}}</div>
                        <div class="list-body">
                          <div class="term-title">
                            <div>政策条件描述：{{list.conditionDesc}}</div>
                            <div class="title-btn-group">
                              <button class="btn" @click="editTermHandle(list,index)" v-if="!isCheck && allowCondition.twoAllow">编辑</button>
                              <button class="btn" @click="delTermHandle(list,index)" v-if="!isCheck && allowCondition.twoAllow">删除</button>
                            </div>
                          </div>
                          <div class="sub-title">
                            <div>权重：{{list.weightScore}}分</div>
                            <div v-if="list.autoMatch == 0">匹配类型：人工匹配</div>
                            <div v-else>匹配类型：<span style="color: red;">自动匹配</span></div>
                            <div style="color: red;" v-if="list.autoMatch ==1">条件表达：{{list.conditionExpression}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!--政策解读-->
    <el-card id="interpretation" class="top-margin-10">
      <div slot="header" class="clearfix">
        <span style="color: #FFA96A; font-weight: bold;width: 3px;">|</span>
        <span class="index-content-title">&nbsp;政策解读</span>
      </div>
      <div>
        <el-row :gutter="12">
          <el-col :span="20" :offset="2">
            <Tinymce v-if="!isCheck" v-model="form.noticeSummary" :height=400 ref="policyEditor"/>
            <p v-else v-html="form.noticeSummary" class="editorHtml">{{form.noticeSummary}}</p>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!--原文-->
    <el-card id="original" class="top-margin-10">
      <div slot="header" class="clearfix">
        <span style="color: #799CFF; font-weight: bold;width: 3px;">|</span>
        <span class="index-content-title">&nbsp;原文</span>
      </div>
      <div>
        <el-row :gutter="12">
          <el-col :span="20" :offset="2">
            <Tinymce v-if="!isCheck" v-model="form.noticeContent" :height=400 ref="policyEditor2"/>
            <p v-else v-html="form.noticeContent" class="editorHtml">{{form.noticeContent}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="12" class="top-margin-10">
          <el-col :span="20" :offset="2">
            <el-form-item label="原文链接：">
                                <span v-if="isCheck">
                                  <a :href="form.sourceUrl" target="_blank">{{form.sourceUrl}}</a>
                                </span>
              <input v-else v-model="form.sourceUrl" type="text" placeholder="请输入原文链接"
                     class="input_text float-left width-800"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="20" :offset="2">
            <el-form-item label="政府文件补充：" prop="official_file">
              <el-upload style="display: inline-block;width:100%;"
                         ref="upload"
                         class="upload-box upload-box-width"
                         :http-request="handlePoliceUpload"
                         :file-list="fileList"
                         action=""
                         v-if="!isCheck"
                         :show-file-list="false">
                <el-button type="primary" size="small">点击上传</el-button>
              </el-upload>
              <p style="margin-bottom: 10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
              <div class="file-list" v-for="(item,index) in fileList">
                <div>{{item.fileName}}</div>
                <i v-if="!isCheck" class="icon-del-file el-icon-circle-close" @click="delFileHandle(index)"></i>
                <img class="down-files" v-else src="../../../static/down-img.png" @click="downFileHandle(item)" alt=""/>
              </div>
              <!--                            <p style="cursor:pointer;" v-for="(item,index) in fileList" v-else @click="downloadFile(item)">-->
              <!--                              {{ (index + 1 + '、') + item.name + '.' + item.fileType}}-->
              <!--                            </p>-->
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!--确认/取消-->
    <div class="center-items top-margin-30">
      <el-form-item>
        <el-button type="primary" v-if="isCreate" @click="policyHandSubmit('form')" v-preventReClick>确认</el-button>
        <el-button type="primary" v-if="isEdit" @click="policyHandSubmit('form')" v-preventReClick>修改</el-button>
        <el-button @click="handlerCancel">取消</el-button>
      </el-form-item>
    </div>

    <!--选择项目--弹窗-->
    <el-dialog title="选择补贴项目" class="project-modal" :visible.sync="project_table_visible" :before-close="handleCloseProject" width="60%" destroy-on-close="true" v-dialogDrag  >
      <!-- 搜索框 -->
      <div>
        <div class="projectChoose">
          <span>项目筛选：</span>
          <el-select size="mini"
                     clearable
                     multiple
                     class="inline-block right-margin-10"
                     placeholder="项目类型"
                     v-model="project_list_query.projectTypes"
                     @focus="getCommonData"
                     @change="typeChange"
          >
            <el-option v-for="item in type_list" :key="item.dictId" :value="item.dictId"
                       :label="item.dictName"></el-option>
          </el-select>
          <el-select remote
                     :remote-method="companyRemoteMethod"
                     v-loadMore="loadMore"
                     @change="projectChange"
                     :loading="loading" size="mini" clearable filterable
                     v-model="project_list_query.projectName" placeholder="项目"
                     class="inline-block right-margin-10"
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
      <el-table ref="dataTable" class="project-table"
                :data="project_list" border
                @select="onTableSelect"
      >
        <el-table-column type="selection" width="55"></el-table-column>
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
            <span>{{scope.row.orderType == 0 ? '项目型' : scope.row.orderType == 1 ? '知识产权型' : scope.row.orderType == 2 ? '财务型' : scope.row.orderType == 4 ? '项目审计型' : '-' }}</span>
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

    <!-- 选择复制条件 -->
    <el-dialog title="选择复制条件" class="project-modal" :visible.sync="choiceConditionVisible" width="60%" destroy-on-close="true" v-dialogDrag>
      <!-- 搜索框 -->
      <div>
        <el-input v-model="choiceConditionParams.keyWord" placeholder="请输入关键字" style="width: 220px;" @keyup.enter.native="searchChoiceCondition"></el-input>
        <el-button @click="searchChoiceCondition">搜索</el-button>
      </div>
      <!--搜索到的总条数-->
      <div class="search-num">
        搜索到<span class="num">{{choiceConditionTotal}}</span>条记录
      </div>
      <!-- 表格 -->
      <el-table ref="choiceDataTable" class="project-table" :data="choiceConditionList" border @select="onConditionSelect">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="政策名" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.noticeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.projectName}}</span>
          </template>
        </el-table-column>
      </el-table>

      <template v-if="choiceConditionList.length !== 0">
        <div class="get-more" v-if="choiceConditionList.length >= choiceConditionTotal">没有更多</div>
        <div class="get-more" v-else @click="getMoreChoiceCondition"><span>加载更多</span></div>
      </template>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
         <el-button class="sub-btn" @click="setChoiceCondition">确定</el-button>
         <el-button @click="cloneChoiceModal">取消</el-button>
      </span>
    </el-dialog>

    <!--新增条件--弹窗-->
    <el-dialog title="新增条件" class="editorUserModal" :visible.sync="addTermModal" width="800px" :before-close="callTermHandle" v-dialogDrag>
      <el-form :model="addTermParams" :rules="termParamsRules" ref="termParamsRules" label-width="88px">
        <el-form-item label="条件描述：" prop="conditionDesc" style="white-space: nowrap;">
          <el-input maxlength="500" show-word-limit v-model="addTermParams.conditionDesc" type="textarea" resize="none" :rows="3"
                    placeholder="请输入条件描述"></el-input>
        </el-form-item>
        <el-form-item class="modal-radio" label="匹配类型：" style="white-space: nowrap;">
          <el-radio-group v-model="addTermParams.autoMatch">
            <el-radio :label="0">人工匹配</el-radio>
            <el-radio :label="1">自动匹配</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="权重分数：" prop="weightScore" style="white-space: nowrap;">
          <el-input @input.native="inputXz($event,0)" oninput="value=value.replace(/[^0-9]/g,'')"
                    v-model="addTermParams.weightScore" placeholder="请输入权重分数"
                    maxlength="100"></el-input>
        </el-form-item>

        <div v-if="addTermParams.autoMatch == 1" v-for="(item, index) in conditionVarList">
          <el-form-item label="条件表达：" style="white-space: nowrap;" v-if="index === 0">
            <el-select v-model="item.varId" placeholder="选择系统变量" style="width: 150px;" @change="changeVarId(item,index)" filterable>
              <el-option v-for="variable in variableList" :label="variable.varName" :value="variable.varId" :key="variable.varId" :disabled="variable.varId == 813375878632443904"> </el-option>
            </el-select>
            <el-select v-model="item.comparisonId" placeholder="选择对比符号" @change="changeComparison(item)" style="width: 150px;margin-left: 10px;">
              <el-option v-for="comparison in comparisonList[index]" :label="comparison.comparisonName" :value="comparison.comparisonId" :key="comparison.comparisonId"> </el-option>
            </el-select>

            <el-select remote :remote-method="newProjectListMethod" @change="newProjectListChange" multiple style="width: 150px;   margin-left: 10px;" filterable
                       v-loadMore="newLoadMore" :loading="loading" v-if="item.varId == 798613854857859072"
                       class="inline-block float-left newInput" clearable v-model="item.comparisonValue"
                       placeholder="项目名称">
              <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName"
                         :value="item.projectId"></el-option>
            </el-select>

            <el-input v-model="item.comparisonValue" v-else style="width: 150px;margin-left: 10px;" placeholder="请输入对比值"></el-input>
            <span style="margin-left: 10px; color: white; cursor: pointer; padding: 2px 20px; background: #00a5ff;" @click="addConditionVarList">+</span>
          </el-form-item>

          <el-form-item label="" style="white-space: nowrap;" v-if="index !== 0 ">
            <el-select v-model="item.comparisonLinkSymbol" placeholder="选择连接符" style="width: 150px;" clearable>
              <el-option label="and" value="and"> </el-option>
              <el-option label="or" value="or" :disabled="conditionVarList && conditionVarList[0].varId == 798613854857859072"> </el-option>
            </el-select>

            <span v-if="conditionVarList && conditionVarList[0].varId != 798613854857859072">
              <el-select v-model="item.varId" placeholder="选择系统变量" style="width: 150px;margin-left: 10px;" @change="changeVarId(item,index)"  filterable>
                <el-option v-for="variable in variableList" :label="variable.varName" :value="variable.varId" :key="variable.varId" :disabled="variable.varId == 798613854857859072 || variable.varId == 813375878632443904"> </el-option>
              </el-select>
            </span>

            <span v-if="conditionVarList && conditionVarList[0].varId == 798613854857859072">
              <el-select v-model="item.varId" placeholder="选择系统变量" style="width: 150px;margin-left: 10px;" @change="changeVarId(item,index)"  filterable>
                <el-option v-for="variable in variableList" :label="variable.varName" :value="variable.varId" :key="variable.varId" :disabled="variable.varId != 813375878632443904"> </el-option>
              </el-select>
            </span>

            <el-select v-model="item.comparisonId" @change="changeComparison(item)" placeholder="选择对比符号" style="width: 150px;margin-left: 10px;">
              <el-option v-for="comparison in comparisonList[index]" :label="comparison.comparisonName" :value="comparison.comparisonId" :key="comparison.comparisonId"> </el-option>
            </el-select>

            <el-input v-model="item.comparisonValue" style="width: 150px;margin-left: 10px;" placeholder="请输入对比值"></el-input>

            <span style="padding-left: 10px; color: red; cursor: pointer;" @click="delConditionVarList(index)">删除</span>
          </el-form-item>
        </div>

        <div class="system-btn">
          <button class="btn" @click.stop="systemHandle">系统变量</button>
        </div>

      </el-form>

      <!--系统变量--弹窗-->
      <el-dialog title="系统变量" width="30%" :visible.sync="systemModal" append-to-body>
        <div class="system-model">
          <div class="modal-content">
            <div class="sum-data">
              <el-input v-model="keyWord" placeholder="请输入关键字" style="width: 220px;" @keyup.enter.native="searchSystemHandle"></el-input>
              <el-button @click="searchSystemHandle">搜索</el-button>
            </div>
            <div class="sum-data">共<span class="num">{{systemVarDataTotal}}</span>条数据</div>
            <el-table :data="systemVarData" height="302" border>
              <el-table-column type="index" width="40"></el-table-column>
              <el-table-column prop="varName" label="变量名"></el-table-column>
              <el-table-column prop="varDesc" label="备注"></el-table-column>
            </el-table>
            <div class="sys-var-more">
              <div v-if="this.systemVarData.length<systemVarDataTotal" class="get-sys-more" @click="getMoreSysData">加载更多
              </div>
              <div style="padding-bottom: 10px;" v-else>没有更多了</div>
            </div>
          </div>
        </div>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button class="setBtn" @click="setAddTerm">确 定</el-button>
        <el-button class="cananl" @click="callTermHandle">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

  import { queryVariableList, getComparisonByVarId } from '@/api/conditionVariable'
  import Tinymce from '@/components/Tinymce'
  import {commonDict, commonDictOfRegion} from '@/api/utils'
  import {queryProjectNameOfProjectType} from '@/api/projectManage'
  import { queryProjectInfo, saveNoticeInfo, editNoticeInfo, getNoticeProjectConditions } from '@/api/policy'
  import {addFileBatch, getFileListWithFileIds, ossFileSystemFileDownload} from '@/api/utils.js'
  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {policyNoticeUpload} from '@/utils/uploadPathMethods'
  import {noticeUpload} from '@/utils/uploadPathMethods'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import cloneDeep from "lodash/cloneDeep";
  // import QRCode from "qrcodejs2";

  export default {
    components: {Tinymce},
    props: ['noticeName', 'noticeType', 'noticeDetail'],
    data() {
      return {
        // 职称系列
        titleSeriesList: [],
        //地区--省
        province_list: [],
        //地区--市
        city_list: [],
        //地区--区
        district_list: [],
        //地区--镇街
        town_list: [],
        //level从3开始递减至0结束
        level: 3,
        parentId: 0,

        //基本信息--扶持方式
        supply_way_list: [
          {dictName: '事后补偿', dictId: '1'},
          {dictName: '无偿补偿', dictId: '2'},
          {dictName: '其他', dictId: '3'}
        ],

        // 基本信息--补助行业
        supply_industry_list: [],

        // 基本信息--难易程度
        difficulty_list: [
          {dictName: '普惠性', dictId: 1},
          {dictName: '竞争性', dictId: 2}
        ],


        //基本信息--有效期
        termDate: [],
        //基本信息--有效期-详情显示
        termDateName: "",

        //新增/编辑--提交的数据
        form: {},

        //补贴项目--弹窗
        project_table_visible: false,
        //补贴项目信息--数据
        project_list: [],
        //补贴项目信息--参数
        project_list_query: {
          page: 0,
          pageSize: 20
        },
        //补贴项目信息--总条数
        project_list_total: 0,
        //补贴项目信息--项目类型
        type_list: [],
        //补贴项目信息--项目名称
        projectDataList: [],
        //补贴项目信息--项目名称参数
        dataProjectForm: {
          page: 0,
          pageSize: 10
        },
        //补贴项目信息--已选项目
        select_projects: [],
        //补贴项目信息--批次
        projectBatchData: [
          {value: '0', lable: '未指定'},
          {value: '1', lable: '第一批'},
          {value: '2', lable: '第二批'},
          {value: '3', lable: '第三批'},
          {value: '4', lable: '第四批'},
          {value: '5', lable: '第五批'}
        ],
        //补贴项目选中的值
        tempProjectsList: [],
        holdList: [],

        //上传文件--数组
        fileList: [],

        //系统变量--弹窗
        systemModal: false,

        //判断是否新增
        isCreate: this.$route.query.is_create,

        //判断是否编辑
        isEdit: this.$route.query.is_edit,

        //判读是否详情页
        isCheck: this.$route.query.is_check,


        //判断是否显示申报条件
        isShowTerm: true,

        //系统变量参数
        systemVarParam: {
          page: 0,
          pageSize: 20
        },
        //系统变量数据
        systemVarData: [],
        //系统变量数据总数
        systemVarDataTotal: "",

        // 选择复制条件 - 弹窗
        choiceConditionVisible: false,
        choiceProjectId: '',
        // 选择复制条件筛选
        choiceConditionParams: {
          page: 0,
          pageSize: 20,
          keyWord: '',
        },
        // 选择复制条件数据
        choiceConditionList: [],
        // 选择复制条件数据总数
        choiceConditionTotal: '',
        // 选择的要插入条件的项目
        choiceData: [],
        // 已选择的要复制条件数据
        copyChoiceConditionList: [],

        keyWord: "",
        //锚点选中状态
        classChoose:1,
        //吸顶
        fixed:false,

        //二维码是否显示
        qrCodeShowOrNo:false,

        // 条件弹窗
        addTermModal: false,
        // 新增条件--判断状态新增/编辑；true:新增，false编辑
        isTermStyle: null,
        // 新增条件--参数
        addTermParams: {autoMatch: 0},
        // 新增条件--监听输入框
        termParamsRules: {
          conditionDesc: [
            {required: true, message: '请输入条件描述', trigger: 'blur'}
          ],
          weightScore: [
            {required: true, message: '请输入权重分数', trigger: 'blur'}
          ]
        },
        // 条件数
        conditionVarList: [{expressionId: '', varId: '', varName: '', comparisonId: '', comparisonName: '', comparisonValue: '', comparisonLinkSymbol: ''}],
        // 条件变量
        variableList: [],
        // 比较符
        comparisonList: [ [],[],[],[],[],[] ],

        projectList: [],
        conditionExpression: [],
        projectForm: {
          page: 0,
          pageSize: 20,
          orderField:'sales',
          orderType: 'DESC'
        },

        // 判断是否有设置申报条件的权限
        allowCondition: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:STATISTICS:POLICY:QUERY:TABLE:TYPE'),

      }
    },


    mounted() {
      // handleScroll为页面滚动的监听回调
      window.addEventListener('scroll', this.handleScroll);
      this.getRegionList();
      this.getVariableList()
      this.getTitleSeries()
      this.newGetProjectList();

      window.addEventListener('scroll', this.scrollToTop)
      // this.creatQrCode();     //生成二维码
        // this.$nextTick (function () {
        //     this.creatQrCode();     //生成二维码
        // })
    },

    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
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
      // 获取职称级别
      getTitleLevel(data, isChange){
        if (isChange == 1) {
          this.$set(data, 'titleLevel', '')
        }
        queryTitleSeriesOrLevel({parentId: data.titleSeries}).then(res =>{
          if (res.code === 200){
            this.$set(data, 'titleLevelList', res.data);

          }
        })
      },


      //获取项目列表
      newGetProjectList() {
        // console.log("this.projectList222===>")
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
      newProjectListChange(e){
        this.projectList.forEach(item=>{
          e.forEach(list=>{
            if(item.projectId == list){
              this.conditionExpression.push(item)
            }
          })
        })
      },
      //远程搜索
      newProjectListMethod(query) {
        if (query !== '') {
          this.projectForm.page = 0
          this.projectForm.projectName = query
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.newGetProjectList(query)
          }, 200)
        }
      },
      newLoadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.newGetProjectList()
      },


      // 生成二维码
//       creatQrCode() {
//         console.log(this.$route.query.noticeId,"==noticeId==>");
//         console.log(this.$store.state.user.userId,"==userId==>");
//         let href = 'https://chengguoyun.cn/#/policy/detail?noticeId='+this.$route.query.noticeId+'&userId='+this.$store.state.user.userId;
//         // let href = 'http://localhost:8080/#/policy/detail?noticeId='+this.$route.query.noticeId+'&userId='+this.$store.state.user.userId;
//         console.log(href,"==href==>");
//         var qrcode = new QRCode(this.$refs.qrCodeUrl, {
//           text: href, // 需要转换为二维码的内容
//           width: 80,
//           height: 80,
//           colorDark: '#000000',
//           colorLight: '#ffffff',
//           correctLevel: QRCode.CorrectLevel.H
//         })
//       },
//       chooseQrCode(){
// // console.log(this.$store.state.user,'==============>')
// //         console.log(this.$store.state.user.username,'==============>')
//         this.qrCodeShowOrNo=!this.qrCodeShowOrNo
//       },
      //吸顶
      handleScroll(){
          let scrollTop=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          let offsetTop=document.querySelector('.classBut').offsetTop;
          if(scrollTop>offsetTop){
              this.fixed=true;
          }else{
              this.fixed=false;
          }
      },
      //锚点
      jump(domId) {
        // 当前窗口正中心位置到指定dom位置的距离
        switch (domId) {
          case 'info':
            // console.log("=========1==>");
            this.classChoose = 1
            break
          case 'subsidies':
            // console.log("=========2==>");
            this.classChoose = 2
            break
          case 'interpretation':
            this.classChoose = 3
            break
          case 'original':
            this.classChoose = 4
            break
        }

        //页面滚动了的距离
        let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

        //指定dom到页面顶端的距离
        let dom = document.getElementById(domId)
        let domHeight = dom.offsetTop + 70

        //滚动距离计算
        var S = Number(height) - Number(domHeight)

        //判断上滚还是下滚
        if (S < 0) {
          //下滚
          S = Math.abs(S)
          window.scrollBy({ top: S, behavior: 'smooth' })
        } else if (S == 0) {
          //不滚
          window.scrollBy({ top: 0, behavior: 'smooth' })
        } else {
          //上滚
          S = -S
          window.scrollBy({ top: S, behavior: 'smooth' })
        }
      },

      //获取地区信息
      getRegionList() {
        let params = {
          level: this.level,
          parentId: this.parentId
        };
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

      //获取地区信息
      getRegionListsss(level, parent) {
        let params = {
          level: level,
          parentId: parent
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

      //获取字典数据
      getCommonData() {
        let params = {
          keyList: 'DICT:PROJECT_TYPE,DICT:SUBSIDYINDUSTRY_TYPE,DICT:PROJECT_TYPE'
        }
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.supply_industry_list = this.supply_industry_list.concat(res.data['DICT:SUBSIDYINDUSTRY_TYPE'])
            this.type_list = res.data['DICT:PROJECT_TYPE'];
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //基本信息--选择省
      changeProvince(val) {
        this.province_list.forEach(item=>{
          if(item.dictId == val){
            this.$set(this.form, 'provinceName', item.dictName);
          }
        })
        this.$set(this.form, 'cityId', "");
        this.$set(this.form, 'districtId', "");
        this.$set(this.form, 'townId', "");
        this.parentId = val;
        this.level = 2;
        this.getRegionList()

      },
      //基本信息--选择市
      changeCity(val) {
        this.city_list.forEach(item=>{
          if(item.dictId == val){
            this.$set(this.form, 'cityName', item.dictName);
          }
        })
        this.$set(this.form, 'districtId', "");
        this.$set(this.form, 'townId', "");
        this.parentId = val;
        this.level = 1;
        this.getRegionList();
      },
      //基本信息--选择区
      changeDistrict(val) {
        this.parentId = val;
        this.level = 0;
        this.getRegionList();
        this.$set(this.form, 'townId', "");
      },

      //选择补贴项目--选择项目，按钮点击
      goSelectProject() {
        this.project_list_query.page = 0;
        this.project_list_query.pageSize = 10;
        this.holdList = JSON.parse(JSON.stringify(this.select_projects))
        let obj = {};
        this.holdList = this.holdList.reduce((cur, next) => {
          obj[next.projectId] ? '' : obj[next.projectId] = true && cur.push(next);
          return cur
        }, []);
        if (this.holdList.length !== 0) {
          this.tempProjectsList = JSON.parse(JSON.stringify(this.holdList));
        }
        this.getProjectList();
        this.project_table_visible = true;
      },

      //选择补贴项目--获取列表数据
      getProjectList() {
        queryProjectInfo(this.project_list_query).then(res => {
          this.project_list = res.data.data;
          this.project_list_total = res.data.total;
          if (this.tempProjectsList.length !== 0) {
            this.project_list.forEach(item => {
              this.tempProjectsList.forEach(data => {
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

      // 选择项目类型
      typeChange(e) {
        this.dataProjectForm.typeIdList = e
        this.getProjectListForType()
        this.getProjectList()
      },

      loadMore() {
        this.dataProjectForm.page = this.dataProjectForm.page + 10
        this.getProjectListForType()
      },

      //根据项目类型获取项目列表
      getProjectListForType(name) {
        let formData = new FormData
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
      //选择补贴项目--选择项目名称
      companyRemoteMethod(query) {
        this.dataProjectForm.page = 0
        this.dataProjectForm.projectName = query
        if (this.dataProjectForm.typeIdList == undefined) {
          this.dataProjectForm.typeIdList = [];
        }
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.getProjectListForType()
        }, 200)

        this.project_list_query.projectName = query
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      //选择补贴项目--关闭项目弹窗
      handleCloseProject() {
        this.project_table_visible = false
      },
      //选择补贴项目--项目选择
      projectChange(e) {
        if (e == '') {
          this.getProjectListForType();
        }
        this.project_list_query.page = 0;
        this.project_list_query.pageSize = 10;
        this.getProjectList()
      },
      //选择补贴项目--国家级别选择
      areaChange() {
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      //选择补贴项目--选择省
      projectChangeProvince(val) {
        this.project_list_query.cityId = ''
        this.project_list_query.districtId = ''
        this.project_list_query.townId = ''
        this.parentId = val
        this.level = 2
        this.getRegionList()

        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      //选择补贴项目--选择市
      projectChangeCity(val) {
        this.project_list_query.districtId = ''
        this.project_list_query.townId = ''
        this.parentId = val
        this.level = 1
        this.getRegionList()

        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      //选择补贴项目--选择区
      projectChangeDistrict(val) {
        this.parentId = val
        this.level = 0
        this.getRegionList()

        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      //选择补贴项目--选择镇街
      projectChangeTownsId(val) {
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      //选择补贴项目--项目列表加载更多
      getMoreProjectList() {
        this.project_list_query.page = this.project_list_query.page + 20
        queryProjectInfo(this.project_list_query).then(res => {
          this.project_list = this.project_list.concat(res.data.data);

          this.project_list.forEach(item => {
            this.tempProjectsList.forEach(data => {
              if (item.projectId == data.projectId) {
                setTimeout(() => {
                  this.$refs.dataTable.toggleRowSelection(item);
                }, 100)
              }
            })
          })
        })
      },
      //选择补贴项目--选择项目
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
      //选择补贴项目--确定选择补贴项目
      setProjectList() {
        this.tempProjectsList.forEach(item => {
          this.$set(item, 'policyNoticeProjectRelList', []);
          this.$set(item, 'policyApplyConditionVoList', []);
          let obj = {
            projectId: item.projectId,
            projectLevel: "",
            isOnlineWrite: false,
            isPaperWrite: false,
            // subsidyDesc: "",
          };
          if (item.projectType == 822466810090618880) {
            this.$set(obj, 'titleSeriesList', this.titleSeriesList)
          }
          item.policyNoticeProjectRelList.push(obj);

          this.select_projects.push(item);
        });

        if (this.select_projects.length !== 0) {
          this.select_projects = JSON.parse(JSON.stringify(this.select_projects.filter(n => this.tempProjectsList.map(v => v.projectId).includes(n.projectId))));
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
        });
        this.project_table_visible = false
      },
      //选择补贴项目--关闭补贴弹窗
      cloneProjectModal() {
        this.project_table_visible = false;
        this.$refs.dataTable.clearSelection();
      },
      //选择补贴项目--检查项目是否已添加
      checkProjectIsSelect() {
        if (this.holdList.length !== 0) {
          this.project_list.forEach(item => {
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


      //////////////////////////

      //选择补贴项目--点击按钮--新增条件
      addTermHandle(data) {
        this.clickTermDetail = data;
        this.conditionVarList = [{expressionId: '', varId: '', varName: '', comparisonId: '', comparisonName: '', comparisonValue: '', comparisonLinkSymbol: ''}]
        this.addTermModal = true;
        this.isTermStyle = true;
      },

      //选择补贴项目--确定新增条件
      setAddTerm() {
        this.$refs['termParamsRules'].validate((valid, error) => {
          let canReturn = true
          if (valid) {
            if (this.isTermStyle) { // 新增
              this.addTermParams.projectId = this.clickTermDetail.projectId;
              this.$set(this.addTermParams, 'conditionVariableDtoList', [])
              this.select_projects.forEach(item => {
                if (item.projectId === this.addTermParams.projectId) {
                  if (this.addTermParams.autoMatch == 1) {  // 人工匹配没有条件
                    // 判断是否有条件表达式
                    let conditionExpression = ""
                    this.conditionVarList.forEach((thisVar, index) => {
                      if (index === 0) {
                        this.conditionVarList[index].comparisonLinkSymbol = ''
                        thisVar.comparisonLinkSymbol = ''
                      }
                      if ((index !== 0 && !thisVar.comparisonLinkSymbol) && !thisVar.varId || !thisVar.comparisonId || !thisVar.comparisonValue || (thisVar.varId == 798613854857859072 && !thisVar.comparisonValue) || (thisVar.varId == 798613854857859072 && thisVar.comparisonValue.length < 1)) {
                        canReturn = false
                      }
                      let expression = ""
                      if (thisVar.varId == 798613854857859072) {
                        let expression1 = "("
                        thisVar.comparisonValue.forEach(val => {
                          expression1 += this.conditionExpression.filter(item => item.projectId === val)[0].projectName + ", ";
                        })
                        expression1 += ")"
                        expression = thisVar.comparisonName + expression1
                      } else {
                        expression = " " + thisVar.comparisonLinkSymbol + " " + thisVar.varName + thisVar.comparisonName + thisVar.comparisonValue
                      }
                      conditionExpression += expression
                    })
                    if (canReturn) {
                      this.addTermParams.conditionVariableDtoList = this.conditionVarList
                      this.addTermParams.conditionExpression = conditionExpression
                    }
                  }
                  if (canReturn) {
                    item.policyApplyConditionVoList.push(this.addTermParams);
                  }
                }
              });

            } else { // 修改
              this.select_projects.forEach(item => {
                if (item.projectId == this.addTermParams.projectId) {
                  if (this.addTermParams.autoMatch == 1) {  // 人工匹配没有条件
                    // 判断是否有条件表达式
                    let conditionExpression = ""
                    this.conditionVarList.forEach((thisVar, index) => {
                      // console.log(thisVar)


                      if (index === 0) {
                        thisVar.comparisonLinkSymbol = ''
                      }
                      if ((index !== 0 && !thisVar.comparisonLinkSymbol) && !thisVar.varId || !thisVar.comparisonId || !thisVar.comparisonValue || (thisVar.varId == 798613854857859072 && !thisVar.comparisonValue) || (thisVar.varId == 798613854857859072 && thisVar.comparisonValue.length < 1)) {
                        canReturn = false
                      }
                      let expression = ""
                      if (thisVar.varId == 798613854857859072) {
                        let expression1 = "("
                        thisVar.comparisonValue.forEach(val => {
                          expression1 += this.conditionExpression.filter(item => item.projectId === val)[0].projectName + ", "
                        })
                        expression1 += ")"
                        expression = thisVar.comparisonName + expression1
                      } else {
                        expression = " " + thisVar.comparisonLinkSymbol + " " + thisVar.varName + thisVar.comparisonName + thisVar.comparisonValue
                      }
                      conditionExpression += expression
                    })
                    if (canReturn) {
                      this.addTermParams.conditionVariableDtoList = this.conditionVarList
                      this.addTermParams.conditionExpression = conditionExpression
                    }
                  }
                  item.policyApplyConditionVoList[this.addTermParams.index] = this.addTermParams;
                }
              });
            }
            if (canReturn) {
              this.addTermModal = false;
              this.addTermParams = {
                autoMatch: 0,
              };
            } else {
              this.$message.error("请将条件表达填写完整！")
            }

            this.this.conditionExpression = [];
          }
        })
      },

      //选择补贴项目--点击按钮--编辑条件
      editTermHandle(data, index) {
        data.index = index;
        this.addTermParams = JSON.parse(JSON.stringify(data));
        if (this.addTermParams.autoMatch == 1) {
          if (this.addTermParams.conditionVariableDtoList && this.addTermParams.conditionVariableDtoList.length > 0) {
            this.conditionVarList = this.addTermParams.conditionVariableDtoList
          } else {
            this.conditionVarList = [{expressionId: '', varId: '', varName: '', comparisonId: '', comparisonName: '', comparisonValue: '', comparisonLinkSymbol: ''}]
          }
        } else {
          this.conditionVarList = [{expressionId: '', varId: '', varName: '', comparisonId: '', comparisonName: '', comparisonValue: '', comparisonLinkSymbol: ''}]
        }

        this.getComparison(this.conditionVarList[0].varId)
        let i=1
        if(this.conditionVarList.length>1){
          for(i;i<this.conditionVarList.length;i++){
            this.getComparisonNum( this.conditionVarList[i].varId,i)
            //  console.log(i,"===iiiii=======>")
          }
        }

        setTimeout(() => {
          this.isTermStyle = false;
          this.addTermModal = true;
        },500)


      },

      //选择补贴项目--取消--编辑/新增条件
      callTermHandle() {
        this.addTermModal = false;
        this.addTermParams = {
          autoMatch: 0
        }
        this.conditionVarList = [{expressionId: '', varId: '', varName: '', comparisonId: '', comparisonName: '', comparisonValue: '', comparisonLinkSymbol: ''}]
      },

      //选择补贴项目--删除--条件
      delTermHandle(data, index) {
        this.select_projects.forEach(item => {
          if (data.projectId === item.projectId) {
            item.policyApplyConditionVoList.splice(index, 1);
          }
        })
      },

      // 搜索变量
      searchSystemHandle() {
        this.systemVarParam.varName = this.keyWord
        this.systemVarParam.page = 0
        this.systemVarParam.pageSize = 20
        this.systemVarData = []
        this.getSystemVarList()
      },

      // 点击系统变量按钮
      systemHandle() {
        this.systemModal = true
        this.systemVarParam.page = 0
        this.systemVarParam.pageSize = 20
        this.systemVarData = []
        this.getSystemVarList()
      },

      // 获取变量数据
      getSystemVarList() {
        queryVariableList(this.systemVarParam).then(res =>{
          if (res.code === 200) {
            if (this.systemVarParam.page > 0) {
              this.systemVarData = this.systemVarData.concat(res.data.data);
            } else {
              this.systemVarData = res.data.data;
            }

            this.systemVarDataTotal = res.data.total;
          }
        });
      },

      //获取更多系统变量
      getMoreSysData() {
        this.systemVarParam.page += 20;
        this.getSystemVarList();
      },

      // 点击选择复制条件
      choiceCondition(data, projectId) {
        this.choiceData = data
        this.choiceProjectId = projectId
        this.choiceConditionVisible = true
        this.getChoiceConditionList()
      },

      // 搜索
      searchChoiceCondition() {
        this.choiceConditionParams.page = 0
        this.getChoiceConditionList()
      },

      // 获取复制条件内容
      getChoiceConditionList() {
        getNoticeProjectConditions(this.choiceConditionParams).then(res => {
          if (res.code === 200) {
            if (this.choiceConditionParams.page > 0) {
              this.choiceConditionList = this.choiceConditionList.concat(res.data.data);
            } else {
              this.choiceConditionList = res.data.data;
            }
            this.choiceConditionTotal = res.data.total;
          }
        })
      },

      // 复制条件内容 加载更多
      getMoreChoiceCondition() {
        this.choiceConditionParams.page += 20;
        this.getChoiceConditionList();
      },

      // 复制条件内容取消显示
      cloneChoiceModal(){
        this.choiceConditionVisible = false;
        this.choiceConditionParams.page = 0
        this.choiceConditionParams.keyWord = ''
        this.choiceData = []
        this.choiceProjectId = ''
        this.copyChoiceConditionList = []
        this.$refs.choiceDataTable.clearSelection();
      },

      // 点击选中条件
      onConditionSelect(rows, row) {
        let choiceList = []
        if (rows.length && rows.indexOf(row) !== -1) {
          // 去除conditionId 和sqlId
          row.conditionList.forEach(item => {
            item.conditionVariableDtoList = item.conditionVariableVoList
            item.conditionVariableDtoList.forEach(i => {
              delete i.expressionId
            })
            item.projectId = this.choiceProjectId
            delete item.conditionId
            choiceList.push(item)
          })
          row.conditionList = choiceList
          this.copyChoiceConditionList.push(row);
        } else {
          this.copyChoiceConditionList.forEach((copy, index) => {
            if (copy.projectId === row.projectId && copy.noticeId === row.projectList[0].noticeId) {
              this.copyChoiceConditionList.splice(index, 1);
            }
          })
        }
      },

      // 确定选择复制条件
      setChoiceCondition() {
        this.copyChoiceConditionList.forEach(item => {
          item.conditionList.forEach(i => {
            delete i.conditionVariableVoList
            i.conditionVariableDtoList.forEach(j => {
              if (j.varId == 798613854857859072) {
                let comparisonValue = j.comparisonValue.split(",")
                j.comparisonValue = comparisonValue
              }
            })
            this.choiceData.push(i)
          })
        })
        this.choiceConditionVisible = false;
        this.choiceConditionParams.page = 0
        this.choiceConditionParams.keyWord = ''
        this.choiceData = [];
        this.choiceProjectId = ''
        this.copyChoiceConditionList = []
        this.$refs.choiceDataTable.clearSelection();
      },


      //限制输入数字
      inputXz(e, num) {
        if (Number(e.target.value) > 100) {
          e.target.value = 100;
        }

        if (num == 0) {
          this.addTermParams.weightScore = e.target.value
        }

        // e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      },

      //////////////////////////

      //新增补助
      addSubsidyHandle(data, index) {
        let obj = {
          projectId: data.projectId,
          projectLevel: "",
          // subsidyDesc: "",
        };


        this.select_projects = this.select_projects.map(item => {
          if (item.projectId === data.projectId) {
            item.isDel = true;
            if (item.projectType == 822466810090618880) {
              this.$set(obj, 'titleSeriesList', this.titleSeriesList)
            }
            item.policyNoticeProjectRelList.push(obj);
          }
          return item;
        })
      },

      //删除补助
      delProjectHandle(data, index) {
        this.select_projects = this.select_projects.map(item => {
          if (item.projectId === data.projectId) {
            item.policyNoticeProjectRelList.splice(index, 1);
            if (item.policyNoticeProjectRelList.length == 1) {
              item.isDel = false;
            } else {
              item.isDel = true;
            }
          }
          return item;
        })
      },

      //选择补贴项目--移除项目子项
      removeProjectItem(item, index) {
        this.select_projects.splice(index, 1);
        this.tempProjectsList = JSON.parse(JSON.stringify(this.select_projects));
      },

      // 返回需要上传的地址
      UploadUrl() {
        return '/policy/api/policy/policyNoticeInfo/uploadFile' // 返回需要上传的地址
      },

      //文件删除
      handleRemove(file, fileList) {
        this.$message.success('删除成功')
        this.fileList = fileList
        this.fileNameList.forEach(item => {
          if (file.uid == item.uid) {
            this.fileIdsList.forEach((list, index) => {
              if (item.filesId == list) {
                this.fileIdsList.splice(index, 1)
              }
            })
          }
        })
      },

      // 上传文件
      handlePoliceUpload(option) {
        if(!this.form.provinceId || this.form.provinceId == ''){
          this.$message.error('请先选择省');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if(!this.form.publishDate || this.form.publishDate == ''){
          this.$message.error('请先选择发布日期');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if (option.file.name.length >= 150) {
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
        let filePath = noticeUpload(this.form.provinceName, this.form.cityName,this.form.publishDate, fileName) + '.' + fileType
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
                this.fileList.push(response.data[0]);
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

      // 删除文件
      delFileHandle(index) {
        this.fileList.splice(index, 1);
      },


      // 确认提交
      policyHandSubmit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            //监听名称不能为空
            if (this.noticeName == undefined || this.noticeName == '') {
              this.$message.warning('请输入名称');
              return
            }

            //监听省不能为空
            if (this.form.provinceId == undefined || this.form.provinceId == '' || this.form.provinceId == null) {
              this.$message.warning('请选择地区');
              return
            }

            //监听发布单位不能为空
            if (this.form.publishOrgan == undefined || this.form.publishOrgan == '' || this.form.publishOrgan == null) {
              this.$message.warning('请输入发布单位');
              return
            }

            if (this.form.projectYear == undefined || this.form.projectYear == '' || this.form.projectYear == null) {
              this.$message.warning('请选择申报年份');
              return
            }

            //监听发布日期不能为空
            if (this.form.publishDate == undefined || this.form.publishDate == '' || this.form.publishDate == null) {
              this.$message.warning('请选择发布日期');
              return
            }

            //监听难易程度不能为空
            if (this.form.applyDifficulty == undefined || this.form.applyDifficulty == '' || this.form.applyDifficulty == null) {
              this.$message.warning('请选择难易程度');
              return
            }

            //监听有效期不能为空
            // if (this.termDate == null || this.termDate.length == 0) {
            //   this.$message.warning('请选择有效期');
            //   return
            // }

            //监听补贴项目信息本能为空
            if (this.select_projects.length == 0) {
              this.$message.warning('请选择补贴项目信息');
            }

            //上传文件数据重组
            if (this.fileList.length !== 0) {
              let file = this.fileList.map(item => {
                return item.fileId
              });

              this.form.fileIds = file.join(',');
            }

            //监听--项目级别是否有重复级别和重复批次
            if (this.select_projects.length !== 0) {
              for (let i = 0; i <= this.select_projects.length; i++) {
                if (this.select_projects[i] !== undefined && this.select_projects[i].policyNoticeProjectRelList.length !== 0 && this.select_projects[i].policyNoticeProjectRelList.length > 1) {
                  for (let j = 0; j <= this.select_projects[i].policyNoticeProjectRelList.length; j++) {
                    //项目级别是否有重复级别
                    if (this.select_projects[i].policyNoticeProjectRelList[j + 1] !== undefined) {
                      if ((this.select_projects[i].policyNoticeProjectRelList[j].projectLevel === this.select_projects[i].policyNoticeProjectRelList[j + 1].projectLevel) && (this.select_projects[i].policyNoticeProjectRelList[j].projectBatchNo === this.select_projects[i].policyNoticeProjectRelList[j + 1].projectBatchNo)) {
                        this.$message.warning(`${this.select_projects[i].projectName} 中存在相同的项目级别和批次，请重新选择`);
                        return
                      }
                    }
                  }
                }
              }
            }

            //监听 补助项目信息+补助项目信息-数据重组
            let selectArr = [];
            let mentArr = [];
            this.select_projects.forEach(item => {
              item.policyNoticeProjectRelList.forEach(data => {
                if (item.projectType != 822466810090618880 && (data.projectLevel == '' || data.projectLevel == null || data.projectLevel == undefined)) {
                  this.$message.warning('请选择项目级别');
                  throw new Error()
                }

                if (item.projectType == 822466810090618880 && (data.titleSeries == '' || data.titleSeries == null || data.titleSeries == undefined)) {
                  this.$message.warning('请选择职称系列');
                  throw new Error()
                }
                if (item.projectType == 822466810090618880 && (data.titleLevel == '' || data.titleLevel == null || data.titleLevel == undefined)) {
                  this.$message.warning('请选择职称级别');
                  throw new Error()
                }
                if (data.projectBatchNo == '' || data.projectBatchNo == null || data.projectBatchNo == undefined) {
                  this.$message.warning('请选择批次');
                  throw new Error()
                }


                if (!data.isOnlineWrite) {
                  if (!data.onlineDate || data.onlineDate.length == 0) {
                    this.$message.warning(`${item.projectName}中，请选择线上提交日期`);
                    throw new Error()
                  }
                }

                if (!data.isPaperWrite) {
                  if (!data.paperDate || data.paperDate.length == 0) {
                    this.$message.warning(`${item.projectName}中，请选择纸质提交日期`);
                    throw new Error()
                  }
                }


                let obj = {
                  projectId: data.projectId,
                  projectLevel: data.projectLevel,
                  projectYear: this.form.projectYear,
                  titleMajor: data.titleMajor,
                  titleSeries: data.titleSeries,
                  titleLevel: data.titleLevel,
                  // subsidyDesc: data.subsidyDesc,
                  projectBatchNo: data.projectBatchNo,
                  onlineDateBegin: data.onlineDate && data.onlineDate[0] !== '' ? data.onlineDate[0] : '',
                  onlineDateEnd: data.onlineDate && data.onlineDate[1] !== '' ? data.onlineDate[1] : '',
                  paperDateBegin: data.paperDate && data.paperDate[0] !== '' ? data.paperDate[0] : '',
                  paperDateEnd: data.paperDate && data.paperDate[1] !== '' ? data.paperDate[1] : '',
                  timeId: data.timeId ? data.timeId : '',
                };
                selectArr.push(obj)
              })
              //申报条件--数据重组
              item.policyApplyConditionVoList.forEach(ment => {
                if (ment.autoMatch == 1) {
                  if (!ment.conditionVariableDtoList || ment.conditionVariableDtoList.length < 1) {
                    this.$message.error('请将自动匹配的条件表达补充完整');
                    throw new Error()
                  } else {
                    ment.conditionVariableDtoList.forEach((mt, mtIndex) => {
                      mt.sortNum = mtIndex
                      if (mtIndex === 0) {
                        mt.comparisonLinkSymbol = ''
                      }
                      if ((mtIndex !== 0 && !mt.comparisonLinkSymbol) && !mt.varId || !mt.comparisonId || !mt.comparisonValue) {
                        this.$message.error('请将自动匹配的条件表达补充完整');
                        throw new Error()
                      }
                      if (mt.varId == 798613854857859072 && mt.comparisonValue instanceof Array) {
                        mt.comparisonValue = mt.comparisonValue.join(",")
                      }
                    })
                  }
                } else {
                  ment.conditionVariableDtoList = []
                }

                mentArr.push(ment)
              })

            });
            this.form.policyNoticeProjectRelList = selectArr;
            this.form.policyApplyConditionDtoList = mentArr;

            //有效期数据重组
            this.form.validDateBegin = this.termDate[0];
            this.form.validDateEnd = this.termDate[1];

            //类型赋值
            this.form.noticeType = this.noticeType;

            //名称赋值
            this.form.noticeName = this.noticeName;

            //保存接口--调用
            if (this.$route.query.is_edit) {
              this.form.noticeId = this.$route.query.noticeId;
              editNoticeInfo(this.form).then(res => {
                if (res.code == 200) {
                  this.$message.success('编辑成功!')
                  this.form = {
                    noticeType: 1,
                    noticeContent: '',
                    noticeSummary: ''
                  };
                  this.project_list_query = {
                    page: 0,
                    pageSize: 10
                  }
                  this.fileList = [];
                  this.select_projects = [];
                  this.tempProjectsList = [];
                  this.termDate = [];
                  this.$refs.policyEditor.setContent("");
                  this.$refs.policyEditor2.setContent("");
                  // this.$store.commit('SET_POLICY_SCROLL', 0)
                  this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy')
                }
              })
            } else {
              saveNoticeInfo(this.form).then(res => {
                if (res.code == 200) {
                  this.$message.success('新建成功!')
                  this.form = {
                    noticeType: 1,
                    noticeContent: '',
                    noticeSummary: ''
                  }
                  this.project_list_query = {
                    page: 0,
                    pageSize: 10
                  }
                  this.fileList = []
                  this.select_projects = []
                  this.tempProjectsList = [];
                  this.termDate = [];
                  this.$refs.policyEditor.setContent("");
                  this.$refs.policyEditor2.setContent("");
                  this.$emit('naticeByValue', this.form);
                  this.$store.commit('SET_POLICY_SCROLL', 0)
                  this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy')
                }
              })
            }
          } else {
            return false
          }
        })
      },

      //详情--地区一次获取
      getAddressDetail() {
        this.getRegionListsss(3, 0);
        if (this.form.provinceId) {
          this.getRegionListsss(2, this.form.provinceId)
        }
        if (this.form.cityId) {
          this.getRegionListsss(1, this.form.cityId)
        }
        if (this.form.districtId) {
          this.getRegionListsss(0, this.form.districtId)
        }
      },

      //详情-获取文件
      getFileDetail(fileIds) {
        let fileArr = fileIds.split(',');
        getFileListWithFileIds({fileIds: fileArr, haveView: false}).then(res => {
          if (res.code == 200) {
            this.fileList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //取消--点击
      handlerCancel() {
        this.form = {
          noticeType: 1,
          noticeContent: '',
          noticeSummary: ''
        }
        this.project_list_query = {
          page: 0,
          pageSize: 10
        }
        this.fileList = []
        this.select_projects = [];
        this.tempProjectsList = [];
        if(this.is_edit){
          this.$refs.policyEditor.setContent("");
          this.$refs.policyEditor2.setContent("");
        }

        this.$emit('naticeByValue', this.form);
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy')
      },

      //下载文件
      downFileHandle(data) {
        if (data.filePath) {
          ossFileSystemFileDownload(data).then(res => {
            if (res.code == 200) {
              let url = res.data.replace(/http/,'https')
              window.open(url)
              this.$message.success('下载成功')
            }
          })
        }
      },

      // 增加条件
      addConditionVarList(){
          this.conditionVarList.push({expressionId: '', varId: '', varName: '', comparisonId: '', comparisonName: '', comparisonValue: '', comparisonLinkSymbol: ''})
      },
      // 删除条件
      delConditionVarList(index) {
        this.conditionVarList.splice(index, 1)
      },
      // 获取条件变量
      getVariableList(){
        queryVariableList({page: 0, pageSize: 200}).then(res =>{
          if (res.code === 200){
            this.variableList = res.data.data

          }
        })
      },
      // 修改变量Id
      changeVarId(data,i) {
        // console.log(this.options.filter(item => item.varId === data.varId)[0])
        data.varName = this.variableList.filter(item => item.varId === data.varId)[0].varName
        data.comparisonId = ''
        if(i!=0){
          this.getComparisonNum(data.varId,i)
          }else{
            this.getComparison(data.varId)
          }

      },

      // 选择比较符
      changeComparison(data) {
        this.comparisonList.forEach(item => {
          item.forEach(i => {
            if (data.comparisonId == i.comparisonId) {
              data.comparisonName = i.comparisonName
            }
          })
        })
      },


      getComparison(varId){
        this.comparisonList[0]= []
        getComparisonByVarId({varId: varId}).then(res =>{
          if (res.code === 200){
            this.comparisonList[0]= res.data
            this.$set(this.comparisonList,0,res.data)
            // this.$set(this.approvalForm, 'companyAndProjectName', localStorage.getItem('searchName'));
            //  console.log(this.comparisonList,"===1=>")
          }
        })
      },

      getComparisonNum (varId,num){
        this.comparisonList[num]= []
        getComparisonByVarId({varId: varId}).then(res =>{
          if (res.code === 200){
            this.comparisonList[num] = res.data
            this.$set(this.comparisonList,num,res.data)
          }
        }).then(res =>{
            // console.log(this.comparisonList,num,"=2===>")
        })



      },


    },
    directives: {
      drag: {
        // 系统变量弹窗滑动--方法
        bind: function (el) {
          let ohead = el.querySelector('.modal-heards');   //获取当前元素
          ohead.onmousedown = (e) => {
            //算出鼠标相对元素的位置
            let disX = e.clientX - el.offsetLeft;
            let disY = e.clientY - el.offsetTop;
            let left = '';
            let top = '';
            document.onmousemove = (e) => {
              //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
              left = e.clientX - disX;
              top = e.clientY - disY;

              //绑定元素位置到positionX和positionY上面
              //移动当前元素
              el.style.left = left + 'px';
              el.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
        }
      },
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
    watch: {

      tabindex(val){
          $('.tabWrap').animate({scrollLeft: $('.tabs')[val].offsetLeft - 150},100)
      },

      noticeDetail(newVal, oldVal) {
        if (this.$route.query.is_edit || this.$route.query.is_check) {
          // this.getTitleSeries()
          if (JSON.stringify(newVal) !== '{}') {
            if (this.noticeType == 2) {
              //调用字典方法
              this.getCommonData();

              //详情数据赋值到form
              this.form = newVal;

              //获取地区方法
              this.getAddressDetail();

              //处理接口返回来的 补助信息 数据
              this.form.policyNoticeProjectTimeRelVos.forEach(item => {
                //   // 项目级别数据重组
                if (item.policyNoticeProjectTimeVos.length !== 0) {
                  item.policyNoticeProjectTimeVos.forEach(data => {
                    data.projectId = item.projectId;
                    // this.form.projectYear = JSON.stringify(data.projectYear);
                    this.$set(this.form, 'projectYear', JSON.stringify(data.projectYear))
                    data.isOnlineWrite = false;
                    data.isPaperWrite = false;

                    if (data.onlineDateBegin && data.onlineDateBegin !== '' && data.onlineDateEnd && data.onlineDateEnd !== '') {
                      data.onlineDate = [data.onlineDateBegin, data.onlineDateEnd];
                    } else {
                      data.onlineDate = [];
                    }

                    if (data.paperDateBegin && data.paperDateBegin !== '' && data.paperDateEnd && data.paperDateEnd !== '') {
                      data.paperDate = [data.paperDateBegin, data.paperDateEnd];
                    } else {
                      data.paperDate = [];
                    }


                    if (this.$route.query.is_check) {
                      data.onlineDateName = `${data.onlineDateBegin && data.onlineDateBegin !== '' ? data.onlineDateBegin : '-'} 至 ${data.onlineDateEnd && data.onlineDateEnd !== '' ? data.onlineDateEnd : '-'}`;
                      data.paperDateName = `${data.paperDateBegin && data.paperDateBegin !== '' ? data.paperDateBegin : '-'} 至 ${data.paperDateEnd && data.paperDateEnd !== '' ? data.paperDateEnd : '-'}`;
                    }
                  });
                  if (item.policyNoticeProjectTimeVos.length > 1) {
                    item.isDel = true;
                  }
                  item.policyNoticeProjectRelList = item.policyNoticeProjectTimeVos;
                }
              });

              this.select_projects = cloneDeep(this.form.policyNoticeProjectTimeRelVos)
              this.select_projects.forEach(item => {
                item.policyApplyConditionVoList.forEach(condition => {
                  condition.conditionVariableDtoList = []
                  if(condition.conditionVariableVoList){
                    condition.conditionVariableVoList.forEach(variable => {
                      if (variable.varId == 798613854857859072) {
                        let cValue = variable.comparisonValue.split(",")
                        variable.comparisonValue = cValue
                      }
                      condition.conditionVariableDtoList.push(variable)
                    })
                  }

                  delete condition.conditionVariableVoList
                })
                if (item.projectType == 822466810090618880) {
                  item.policyNoticeProjectRelList.forEach(policy => {
                    if (!this.titleSeriesList) {
                      this.getTitleSeries()
                    }
                    this.$set(policy, 'titleSeriesList', this.titleSeriesList)
                    this.getTitleLevel(policy, 0)
                  })
                }
              })

              //判断有效期是否存在
              if (this.form.validDateBegin && this.form.validDateEnd) {
                this.termDate = [this.form.validDateBegin, this.form.validDateEnd];
              } else {
                this.termDate = [];
              }

              //获取文件详情方法
              if (this.form.fileIds && this.form.fileIds !== "") {
                this.getFileDetail(this.form.fileIds)
              }
            }

          }
        }
      }
    }
  }
</script>

<style lang="less">

//二维码
  .el-card{
    overflow: visible;
  }
  .qrcode-out-show{
  display: inline-block;
  // overflow: hidden;
  }
  .qrcode-out-no{
  display: none;
  }
  .qrCodeChoose{
    position:relative
  }
  .qrcode-out {
    position:absolute;
    right: -150px;
    top:-20px;
    // display: inline-block;
    // display: none;
    background-color: #fff; //设置白色背景色
    .qrcode {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        background-color: #fff; //设置白色背景色
        padding: 6px; // 利用padding的特性，挤出白边
        box-sizing: border-box;
      }
    }

    span {
      white-space:nowrap;
      font-size: 12px;
      padding: 0;
      margin: 0;
    }

  }





  .notice-form{
    position: relative;
  }

  .fixed{
      position: fixed;
      top: 94px;
      left: 0;
      z-index: 10;
      width: 100%;
      margin-top: 0 !important;
      text-align: center;
  }
  .class-Choose{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

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
    overflow-y: hidden;
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

  .top-margin-30 {
    margin-top: 30px;
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

  .bottom-margin-30 {
    margin-bottom: 30px;
  }

  .left-margin-20 {
    margin-left: 20px;
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

  .padding-20 {
    padding: 20px;
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

  .short_name_bg {
    border-radius: 5px;
    width: 78px;
    height: 78px;
    background: rgba(105, 204, 255, 1);
    opacity: 1;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 2px;
  }

  .select_project_bt {
    width: 80px;
    height: 30px;
    background: rgba(5, 170, 255, 1);
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    border: none;
    cursor: pointer;
    outline: none;

    &:active {
      outline: none;
      border: none;
    }
  }

  .select_project_pray_bt {
    width: 80px;
    height: 30px;
    background: #DFDFDF;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    border: none;
  }

  .project_bg {
    border-radius: 5px;
    padding: 1px 10px;
    width: 100%;
    opacity: 1;
  }

  .projectListCont {
    padding: 10px 0;
    display: flex;
    align-items: center;

    span {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;
    }
  }

  .project_badge {
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: rgba(145, 229, 161, 1);
    color: #ffffff;
    border-radius: 50%;
    opacity: 1;
  }

  input:focus {
    outline: none;
  }

  .input_text {
    outline: none;
    height: 30px;
    line-height: 30px;
    /*text-indent: 10px;*/
    /*font-size: 18px;*/
    border-color: #444444;
    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    display: block;
    margin: 0 auto;
  }

  .noticeName {
    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      border-bottom: 1px solid #444;
    }
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

  .project-massage {
    .clearfix {
      position: relative;

      .select-project {
        border-radius: 4px;
        position: absolute;
        right: 0;
        top: -5px;
      }
    }

    .list-box {
      .item {
        margin-bottom: 25px;

        .xin {
          color: red;
        }

        .main-project {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;

          .left {
            width: 100%;
            display: flex;

            .index {
              width: 18px;
              min-width: 18px;
              height: 18px;
              background: #91e5a1;
              color: #ffffff;
              border-radius: 50%;
              opacity: 1;
              text-align: center;
              margin-right: 6px;
            }

            .form-box {
              width: 100%;

              .project-form {
                margin-top: -9px;

                .project-name {
                  display: flex;
                  justify-content: space-between;
                  white-space: nowrap;
                  margin-bottom: 10px;
                  margin-top: 10px;

                  .right {
                    display: flex;
                    margin-top: -8px;

                    .del-project-btn {
                      height: 30px;
                      white-space: nowrap;
                      border: 0;
                      background: #ff0000;
                      color: #fff;
                      padding: 7px 10px;
                      border-radius: 4px;
                      font-size: 14px;
                      outline: none;
                      cursor: pointer;

                      &:active {
                        opacity: 0.5;
                      }

                      &.add-project-btn {
                        background: #05aaff;
                        margin-right: 4px;
                      }
                    }
                  }
                }

                .project-sub-list {
                  display: flex;
                  margin-bottom: 10px;

                  .left-sub {
                    width: 88%;
                  }

                  .three-input {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                  }

                  .del-sub-list {
                    color: red;
                    cursor: pointer;
                    font-size: 18px;
                    margin-top: 10px;
                    margin-left: 10px;
                  }

                  &:last-child {
                    margin-bottom: 0;
                  }
                }

                .project-level, .project-min-subsidy, .project-max-subsidy {
                  display: flex;
                  align-items: center;
                  white-space: nowrap;
                  margin-bottom: 10px;

                  .money-input {
                    width: 170px;
                  }
                }
              }

              .remarks-form {
                display: flex;
                white-space: nowrap;

                /deep/ .el-textarea__inner {
                  height: 80px;
                }
              }

              .batch-form {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                padding-left: 15px;

                .list {
                  width: 95%;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;

                  .item {
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    margin-bottom: 0;
                    font-size: 13px;
                    margin-bottom: 10px;

                    .batch-select {
                      width: 200px;
                    }

                    .date-select-form {
                      width: 280px;

                      /deep/ .el-range-separator {
                        padding: 0;
                      }
                    }
                  }
                }

                .del-batch-btn {
                  margin-top: 13px;

                  i {
                    font-size: 18px;
                    color: #ff0000;
                    cursor: pointer;
                  }
                }

              }
            }

          }
        }

        .main-declare {
          .title {
            padding-bottom: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;

            .title-name {
              color: #05aaff;
            }
            .choice-term-btn{
              float: right;
              background: #05aaff;
              color: #FFF;
              outline: none;
              border: 0;
              font-size: 14px;
              cursor: pointer;
              width: 100px;
              height: 30px;
              border-radius: 4px;
              &:active {
                opacity: 0.5;
              }
            }
            .add-term-btn {
              background: #05aaff;
              color: #FFF;
              outline: none;
              border: 0;
              font-size: 14px;
              cursor: pointer;
              width: 80px;
              height: 30px;
              border-radius: 4px;

              &:active {
                opacity: 0.5;
              }
            }
          }

          .content {
            font-size: 14px;

            .list {
              padding: 10px 0;
              display: flex;

              .list-num {
                padding-top: 5px;
                padding-right: 3px;
              }

              .list-body {
                width: 100%;

                .term-title {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  .title-btn-group {
                    font-size: 12px;

                    .btn {
                      cursor: pointer;
                      height: 26px;
                      background: #00A5FF;
                      color: #fff;
                      outline: none;
                      border: 0;
                      border-radius: 4px;
                      padding: 0 10px;

                      &:last-child {
                        background: #ff0000;
                      }

                      &:active {
                        opacity: 0.5;
                      }
                    }
                  }
                }

                .sub-title {
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  margin: 5px 0;
                  margin-bottom: 0;

                  div {
                    margin-right: 50px;
                  }
                }

                .sub-list {
                  .item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;

                    .left {
                      width: 90%;
                      display: flex;
                      flex-wrap: wrap;
                      align-items: center;

                      div {
                        min-width: 25%;
                        white-space: nowrap;
                        margin-top: 10px;
                      }
                    }

                    .right {
                      width: 92px;
                      min-width: 92px;
                      font-size: 12px;

                      .btn {
                        cursor: pointer;
                        height: 26px;
                        background: #00A5FF;
                        color: #fff;
                        outline: none;
                        border: 0;
                        border-radius: 4px;
                        padding: 0 10px;

                        &:last-child {
                          background: #ff0000;
                        }

                        &:active {
                          opacity: 0.5;
                        }
                      }
                    }

                    &:last-child {
                      margin-bottom: 0;
                    }
                  }
                }
              }


            }
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .notice-list {
      .left {
        width: 85%;

        .form-box {
          .project-form {
            justify-content: flex-start;

            .project-name, .project-level {
              flex: 1;
            }
          }
        }
      }

      .right {
        display: flex;

        .del-project-btn.add {
          margin-right: 5px;
          background: #05aaff !important;
        }
      }
    }
  }

  .table-radio {
    /deep/ .el-radio__label {
      display: none;
    }
  }

  .projectChoose {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  /deep/ .el-table thead tr th .el-checkbox__input {
    display: none;
  }

  .moreBat {
    margin-right: 30px;
    background: #05AAFF;
    color: #fff;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
  }

  .address-group {
    display: flex;
    align-items: center;

    .address-input {
      /*width: 12%;*/
      margin-right: 20px;
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

    /deep/ .el-form-item__label {
      font-weight: normal;
      color: rgba(68, 68, 68, 0.75);
    }

    /deep/ .el-form-item__content {
      width: 83%;
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

    .system-btn {
      text-align: right;
      padding-right: 30px;

      .btn {
        width: 80px;
        height: 30px;
        background: #00A5FF;
        color: #fff;
        outline: none;
        cursor: pointer;
        border-radius: 4px;
        border: 0;

        &:active {
          opacity: 0.5;
        }
      }
    }
  }

  .ment-modal {
    /deep/ .el-form-item__label {
      line-height: 20px;
    }

    /deep/ .el-form-item__label {
      white-space: inherit;
    }

    .ment-text {
      display: flex;
      align-items: center;

      /deep/ .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }

  .system-model {
    /*width: 400px;*/
    /*height: 358px;*/
    /*position: fixed;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    /*-webkit-transform: translate(-50%, -50%);*/
    /*-moz-transform: translate(-50%, -50%);*/
    /*background: #fff;*/
    /*!*z-index: 3000;*!*/
    /*box-shadow: 0 1px 3px rgba(0, 0, 0, .3);*/
    /*border-radius: 2px;*/

    .modal-heards {
      cursor: move;
      padding: 20px 20px 16px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icon-close {
        cursor: pointer;
        color: #909399;
        font-size: 15px;
      }
    }

    .modal-content {
      .sys-var-more {
        background: #fff;
        padding-top: 10px;

        div {
          font-size: 14px;
          text-align: center;
        }

        .get-sys-more {
          cursor: pointer;
        }
      }

      .sum-data {
        font-size: 14px;
        padding-left: 20px;
        margin-bottom: 5px;

        .num {
          color: red;
        }
      }
    }

  }

  .address-bar {
    display: flex;
    align-items: center;
    margin-bottom: 22px;
    padding-left: 28px;

    .address-title {
      margin-right: 14px;
      white-space: nowrap;
      font-size: 14px;
      color: #606266;
    }
  }

  .file-list {
    display: flex;
    align-items: center;

    .icon-del-file {
      cursor: pointer;
      margin-left: 10px;
      margin-top: 3px;
    }

    .down-files {
      cursor: pointer;
      margin-top: 2px;
      margin-left: 10px;
    }
  }

  .editorHtml {
    .wscnph {
      width: auto;
      max-width: 100%;
    }
  }
</style>
