<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-90" style="margin-bottom: 20px;">
      <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #03ADF4; font-weight: bold;">|</span>
          <span class="left-margin-10" style="color: #263B45;">基本信息</span>
        </div>
      </el-card>
      <el-card>
        <div class="float-left" style="width: 90px;">
          <div class="bg_pale_blue ent_shorthand left-margin-10 padding-20 float-left text-align-center"
               style="width : 80px; height: 80px;">{{ruleForm.sub_title ? ruleForm.sub_title : '企业简称'}}
          </div>
        </div>
        <div class="float-left left-margin-10 bottom-margin-30 rule-form" style="width: 80%">
          <el-form :model="ruleForm" :rules="contract" ref="ruleForm" class="demo-ruleForm" :inline="true">
            <el-row>
              <div class="float-left inline-block width-0-6" style="display: flex;">
                <span class="float-left inline-block span-input input-100">客户名称：</span>
                <el-button size="mini" class="float-left inline-block left-margin-5" icon="el-icon-search"
                           @click="handleEnterpriseSearch" v-if="!id">选择企业
                </el-button>
                <span v-if="check" class="inline-block left-margin-5" style="margin-top: 4px;">{{ruleForm.enterprise_name}}</span>
                <span v-else style="margin-top: 4px;">
                  {{ruleForm.enterprise_name}}
                  <img class="hover_cursor" v-if="can_edit" @click="toEdit"
                       src="../../icons/enterprise/contract_edit.png" style="vertical-align:middle; margin-left: 3px;"/>
                </span>
              </div>
            </el-row>
            <el-row>
              <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="8" class="float-left inline-block top-margin-14">
                <el-form-item style="margin: 0" prop="contract_code" v-if="check" label="合同编号：">
                  <el-input size="mini" v-model="ruleForm.contract_code" placeholder="合同编号"
                            class="inline-block left-margin-5 input-200" readonly></el-input>
                </el-form-item>
                <el-form-item v-else style="margin: 0" prop="contract_code" label="合同编号：">
                  <span class="float-left inline-block left-margin-5 span-input" style="margin-top: 4px;">{{ruleForm.contract_code}}</span>
                </el-form-item>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="8" class="float-left inline-block top-margin-14">
                <el-form-item style="margin: 0" prop="sign_company" v-if="check" label="我方签约公司：">
                  <el-select size="mini" @change='changeSignCompany' v-model="ruleForm.sign_company"
                             placeholder="我方签约公司" class="float-left inline-block left-margin-5 input-200">
                    <el-option v-for="item in sign_company_list" :key="item.id + Math.random()"
                               :label="item.enterprise_name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item style="margin: 0" prop="sign_company" v-else label="我方签约公司：">
                  <span class="float-left inline-block left-margin-5 span-input" style="margin-top: 4px;">{{ruleForm.sign_company_name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="float-left inline-block top-margin-14 width-0-3">
                <span class="float-left inline-block span-input input-100">是否渠道：</span>
                <span v-if="check">
                  <el-radio class="float-left inline-block span-input left-margin-10" v-model="ruleForm.is_channel"
                            label="1">是</el-radio>
                  <el-radio class="float-left inline-block span-input" @change="isCompany = false"
                            v-model="ruleForm.is_channel" label="0">否</el-radio>
                </span>
                <span class="float-left inline-block span-input" v-else>
                  <span v-if="ruleForm.is_channel === '1'">是</span>
                  <span v-else>否</span>
                </span>
              </div>
              <div class="float-left inline-block top-margin-14 width-0-6" v-if=" this.ruleForm.is_channel === '1'"
                   style="position: relative;">
                <span class="float-left inline-block span-input input-100">
                  <span style="color: #F56C6C;">*</span>
                  渠道名称：
                </span>
                <el-button size="mini" class="float-left inline-block left-margin-5" icon="el-icon-search"
                           @click="getChannelList">选择渠道
                </el-button>
                <span class="inline-block left-margin-5">{{ruleForm.channel_enterprise_name}}</span>
                <span style="position: absolute;bottom:-15px;font-size: 12px;right: 15px;color: red;" v-if="isCompany">请选择渠道</span>
              </div>
            </el-row>
            <el-row>

              <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="8" class="float-left inline-block top-margin-14">
                <el-form-item style="margin: 0" prop="sign_date" v-if="check" label="签订日期：">
                  <el-date-picker size="mini" v-model="ruleForm.sign_date"
                                  class="float-left inline-block left-margin-5 input-180" type="date"
                                  value-format="yyyy-MM-dd" placeholder="签订日期"></el-date-picker>
                </el-form-item>

                <el-form-item style="margin: 0" prop="sign_date" v-else label="签订日期：">
                  <span class="float-left inline-block left-margin-5 span-input" style="margin-top: 4px;">{{ruleForm.sign_date}}</span>
                </el-form-item>
              </el-col>


              <el-col :xs="12" :sm="12" :md="12" :lg="10" :xl="8" class="float-left inline-block top-margin-14">
                <el-form-item style="margin: 0" prop="available_year" v-if="check" label="有效期：">
                  <el-input size="mini" type="number" v-model="ruleForm.available_year" placeholder="有效期"
                            class="float-left inline-block left-margin-5 input-100"></el-input>
                  <span v-if="check" class="float-left inline-block left-margin-5 span-input">年</span>
                </el-form-item>

                <el-form-item style="margin: 0" prop="sign_date" v-else label="有效期：">
                  <span class="float-left inline-block left-margin-5 span-input" style="margin-top: 4px;">{{ruleForm.available_year}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="float-left inline-block top-margin-14">
                <el-form-item style="margin: 0" prop="perform_state" v-if="check" label="合同状态：">
                  <el-select size="mini" v-model="ruleForm.perform_state" placeholder="合同状态"
                             class="float-left inline-block left-margin-5 input-180">
                    <el-option v-for="item in perform_state_list" :key="item.id + Math.random()"
                               :label="item.dict_value" :value="item.dict_value"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item style="margin: 0" prop="sign_date" v-else label="合同状态：">
                  <span class="float-left inline-block left-margin-5 span-input" style="margin-top: 4px;">{{ruleForm.perform_state}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="float-left inline-block top-margin-14">
                <el-form-item style="margin: 0" label="合同扫描件：">
                  <el-upload
                    class="upload-box upload-box-width"
                    :action="host + upload_url"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleFileSuccess"
                    :file-list="fileList"
                    :show-file-list="true"
                    :data="uploadData"
                    :limit="limit">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                  <div>
                    <el-button class="yu-lan" v-if="ruleForm.contract_url" style="margin:10px; color: #ff1217;"
                               @click="a_downfile(ruleForm)">
                      已上传，点击下载
                    </el-button>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>

      <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #48D462; font-weight: bold;">|</span>
          <span class="left-margin-10" style="color: #042B40;">项目信息</span>
          <span class="float-right right-margin-10">
            <!--<el-button class="filter-item bg_blue left-margin-10" v-if="check && !ruleForm.biz_id" size="mini" @click="addItem">+新增</el-button>-->
            <el-button class="filter-item bg_blue left-margin-10" v-if="check && can_crate" size="mini"
                       @click="addProject">+新增</el-button>
          </span>
        </div>
      </el-card>
      <el-card>
        <div class="float-left bottom-margin-30" style="width: 100%;font-size: 12px;">
          <div style="width: 100%; color: #444444;">
            <div class="new-list top-margin-10 top-bottom-10" v-for="(item, index) in itemList">
              <div class="inline-block overflow-x overflow-y"
                   style="display: flex;align-items: center;width: 22%;min-width: 15%;overflow: hidden;">
                <span
                  class="float-left inline-block overflow-x overflow-y right-margin-10 text-align-center bg_pale_violet order_number"
                  v-if="index % 5 === 0 "
                  style="min-width:20px;height:20px; line-height: 20px; border-radius: 50% / 50%;margin-top:0;">{{index + 1}}</span>
                <span
                  class="float-left inline-block overflow-x overflow-y right-margin-10 text-align-center bg_pale_blue order_number"
                  v-if="index % 5 === 1 "
                  style="min-width:20px;height:20px; line-height: 20px; border-radius: 50% / 50%;margin-top:0;">{{index + 1}}</span>
                <span
                  class="float-left inline-block overflow-x overflow-y right-margin-10 text-align-center bg_pale_yellow order_number"
                  v-if="index % 5 === 2 "
                  style="min-width:20px;height:20px; line-height: 20px; border-radius: 50% / 50%;margin-top:0;">{{index + 1}}</span>
                <span
                  class="float-left inline-block overflow-x overflow-y right-margin-10 text-align-center bg_pale_green order_number"
                  v-if="index % 5 === 3 "
                  style="min-width:20px;height:20px; line-height: 20px; border-radius: 50% / 50%;margin-top:0;">{{index + 1}}</span>
                <span
                  class="float-left inline-block overflow-x overflow-y right-margin-10 text-align-center bg_pale_pink order_number"
                  v-if="index % 5 === 4 "
                  style="min-width:20px;height:20px; line-height: 20px; border-radius: 50% / 50%;margin-top:0;">{{index + 1}}</span>
                <span class="float-left project-name" :title="item.project_library__project_name">项目名称：{{item.project_library__project_name}}
                  <i class="el-icon-edit" style="margin-left:5px;color: #FFA96A; cursor: pointer;"
                     v-if="can_edit && item.id" @click="editProject(item)"></i>
                </span>
              </div>

              <div class="inline-block overflow-x overflow-y" style="width: 8%;min-width: 8%;">
                <span class="float-left">级别：{{item.level}}</span>
              </div>
              <div class="inline-block overflow-x overflow-y">
                <div class="float-left" style="display: flex;align-items: center;">
                  <span style="color: #F56C6C">*</span> 数量：
                  <el-input size="mini" type="number" v-model="item.num" placeholder="数量"
                            class="inline-block left-margin-5 input-90" :readonly="!check"></el-input>
                </div>
              </div>

              <div class="inline-block overflow-x overflow-y">
                <span class="float-left">
                  <span style="color: #F56C6C">*</span> 年份：
                  <el-date-picker @change='handleProjectYear(item)' size="mini" v-model="item.apply_year"
                                  class="inline-block left-margin-5 input-90" type="year" value-format="yyyy"
                                  placeholder="年份" :readonly="!check"> </el-date-picker>
                </span>
              </div>

              <div class="inline-block overflow-x overflow-y">
                <el-radio class="float-left" v-model="item.contract_price_or_bill" label="0" :disabled="!check">金额
                </el-radio>
                <el-radio class="float-left" v-model="item.contract_price_or_bill" label="1" :disabled="!check">比例
                </el-radio>
              </div>
              <div class="inline-block overflow-x overflow-y">
                <span class="float-left" v-if="item.contract_price_or_bill === '1'">
                  <span style="color: #F56C6C">*</span> 比例：
                  <el-input size="mini" v-model="item.price_and_bill" placeholder="项目比例"
                            class="inline-block left-margin-5 input-90" :readonly="!check"> </el-input>
                  <span style="display:inline-block;width: 24px;">%</span>
                </span>

                <span class="float-left" v-else>
                  <span style="color: #F56C6C">*</span> 单价：
                  <el-input size="mini" v-model="item.price_and_bill" placeholder="项目单价"
                            class="inline-block left-margin-5 input-90" :readonly="!check"> </el-input>
                  <span style="display:inline-block;width: 24px;">万元</span>
                </span>
              </div>

              <div class="inline-block overflow-x overflow-y">
                <span class="float-left line-height-30 text-align-center hover_cursor" style="color: red;" v-if="check"
                      @click="delItem(index)">删除</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="top-margin-10">
        <div class="center-items">
          <el-button size="large" class="filter-item bg_pale_blue" v-if="check" @click="saveForm">确定</el-button>
          <el-button size="large" class="filter-item bg_pale_blue left-margin-50" @click="cancel">取消</el-button>
        </div>
      </el-card>
    </el-row>

    <!-- 选择签订合同的公司 -->
    <el-dialog  title="选择签订企业" :visible.sync="orderEntVisiable" width="60%" v-dialogDrag>
      <div>
        <el-input @keyup.enter.native="handleEnterpriseList()" v-model="orderEntListQuery.enterprise_name"
                  style="width: 300px;" placeholder="企业名称">
          <el-button slot="append" @click="handleEnterpriseList()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="order_ent_list" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" label="" width="50">
          <template slot-scope="scope">
            <el-radio v-model="order_ent_id" :label="scope.$index" @change="getOrderEntIndex(scope.row)">&nbsp;
            </el-radio>
          </template>
        </el-table-column>

        <el-table-column label="企业名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.enterprise_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="跟踪业务员" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.business_manager__user_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="企业所在区域" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleOrderEntSizeChange" @current-change="handleOrderEntCurrentChange"
                       :current-page="orderEntListQuery.page" :page-sizes="[10,20,30, 50]"
                       :page-size="orderEntListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="orderEnterpriseTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderEntVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeOrderEnt">确定</el-button>
      </div>
    </el-dialog>

    <!--选择渠道公司-->
    <el-dialog title="选择渠道" :visible.sync="channelVisiable" width="60%" v-dialogDrag>
      <div>
        <el-input v-model="channelListQuery.enterprise_name" style="width: 300px;" placeholder="渠道名称">
          <el-button slot="append" @click="getChannelList()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="channelList" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" label="" width="50">
          <template slot-scope="scope">
            <el-radio v-model="channel_id" :label="scope.$index" @change="getChannelIndex(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="渠道名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.enterprise_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="跟踪业务员" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.business_managers}}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道所在区域" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                       :current-page="channelListQuery.page" :page-sizes="[10,20,30, 50]"
                       :page-size="channelListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="channelTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="channelVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeChannel">确定</el-button>
      </div>
    </el-dialog>

    <!--新增合同 - 选择项目-->
    <el-dialog title="选择项目" :visible.sync="projectVisiable" width="80%" v-dialogDrag>
      <div>
        <el-input @keyup.enter.native="addProject" v-model="projectListQuery.project_name" style="width: 300px;"
                  placeholder="项目名称">
          <el-button slot="append" @click="addProject()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="projectList" border style="width: 100%; margin-top: 20px">
        <el-table-column label="项目名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.project_library__project_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目类型" align="left" width="120px">
          <template slot-scope="scope">
            <span>{{scope.row.project_library__project_type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="级别" align="left" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.level}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地区" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="补贴金额" align="left" width="150px">
          <template slot-scope="scope">
            <span>{{scope.row.subsidy_total}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申报年度" align="left" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.apply_year}}</span>
          </template>
        </el-table-column>
        <el-table-column label="线上提交日期" header-align="left" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.online_date_start ? scope.row.online_date_start : ' - '}} 至 {{scope.row.online_date_end ? scope.row.online_date_end : ' - '}}</span>
          </template>
        </el-table-column>
        <el-table-column label="纸质提交日期" header-align="left" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paper_date_start ? scope.row.paper_date_start : ' - '}} 至 {{scope.row.paper_date_end ? scope.row.paper_date_end : ' - '}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="120px;" v-if="change_item === 1">
          <template slot-scope="scope">
            <span class="hover_cursor" style="width: 5%;" v-if="scope.row.check === '1'"
                  @click="addContractItem(scope.row)">
              <img class="hover_cursor" src="../../icons/enterprise/project_add.png"
                   style="vertical-align:middle; margin-left: 3px;"/>
            </span>
            <span class="hover_cursor" style="width: 5%;" v-else @click="delContractItem(scope.row)">
                <img class="hover_cursor" src="../../icons/enterprise/project_add1.png"
                     style="vertical-align:middle; margin-left: 3px;"/>
              </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="120px;" v-if="change_item === 2">
          <template slot-scope="scope">
            <span class="hover_cursor" style="width: 5%; color: #20B3FF;" v-if="scope.row.check === '1'"
                  @click="changeItem(scope.row)">选择</span>
            <span class="hover_cursor" style="width: 5%;" v-else @click="delChangeItem(scope.row)">取消</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeProject" @current-change="handleCurrentProject"
                       :current-page="projectListQuery.page" :page-sizes="[10,20,30, 50]"
                       :page-size="projectListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="projectTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelChoiceProject">取消</el-button>
        <el-button v-if="change_item === 1" @click="saveChoiceProject">确定</el-button>
        <el-button v-if="change_item === 2" @click="saveChangeProject">确定</el-button>
      </div>
    </el-dialog>
    <!--添加知识产权项目-->
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
            <el-form-item label="收款方式" :label-width="formLabelWidth" prop="payment_type">
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

  </div>

</template>

<script>
  // import { contractEdit, contractSave, existContractYear } from '@/api/contract'
  // import { orderGetEnterpriseList, enterpriseFilterList } from '@/api/enterprise_app'
  // import { getChannelList } from '@/api/channel'
  // import { getProjectItemList } from '@/api/grp'
  // import { ossSignUrl } from '@/api/utils'
  import {queryAuth} from '@/utils/auth'

  var ipr_type_list = [
    {
      value: '专利',
      label: '专利',
      children: [{value: '发明专利', label: '发明专利'}, {value: '实用新型', label: '实用新型'}, {
        value: '外观专利',
        label: '外观专利'
      }, {value: '版权', label: '版权'}, {value: '其他', label: '其他'}]
    },
    {value: '商标', label: '商标', children: [{value: '商标', label: '商标'}]}, {
      value: '著作权',
      label: '著作权',
      children: [{value: '著作权', label: '著作权'}]
    },
    {value: '企业证书', label: '企业证书', children: [{value: '企业证书', label: '企业证书'}]}
  ]
  export default {
    name: 'dashboard',
    components: {},
    props: {},
    data() {
      return {
        id: '',
        host: process.env.BASE_API,
        upload_url: '/core/upload-files-to-oss/',
        uploadData: {save_path: 'contract/contract_img/'},
        limit: 1,
        fileList: [],
        check: true,
        ruleForm: {},
        itemList: [],
        project_ids: [],
        // 选择合同企业
        order_ent_id: '',
        orderEntVisiable: false,
        sign_company_list: [],
        order_ent_list: [],
        perform_state_list: [],
        orderEnterpriseTotal: null,
        orderEntListQuery: {
          page: 1,
          limit: 10
        },
        // 渠道合同
        channelVisiable: false,
        channelListQuery: {
          page: 1,
          limit: 10,
          sort: '+id'
        },
        channelTotal: null,
        currentChannel: null,
        channel_id: '',
        channelList: [],
        // 选择项目
        choice_items: [],
        projectVisiable: false,
        projectListQuery: {
          page: 1,
          limit: 10,
          sort: '+id'
        },
        projectTotal: null,
        projectList: [],
        contract: {
          contract_code: [
            {required: true, message: '请输入合同编号', trigger: 'blur'}
          ],
          sign_company: [
            {required: true, message: '请选择我方签约公司', trigger: 'blur'}
          ],
          sign_date: [
            {required: true, message: '请选择签订日期', trigger: 'blur'}
          ],
          available_year: [
            {required: true, message: '请输入有效期', trigger: 'blur'}
          ],
          perform_state: [
            {required: true, message: '请选择合同状态', trigger: 'blur'}
          ]
        },
        isCompany: false,
        // 知识产权项目
        dialogFormVisible: false,
        formLabelWidth: '120px',
        payment_type_item: '', // 新增订单收款方式
        payment_pre_date: '', // 新增订单收款方式 -- XX天内付款
        payment_pre_ratio: '', //  新增订单收款方式 -- 预付比例
        payment_all_item: '', // 新增订单收款方式 -- 收到XX后付全款
        payment_all_date: '', // 新增订单收款方式 -- 收到后XX天内付全款
        ipr_type_list: ipr_type_list,
        payment_type_options: [{label: '受理通知书', value: 1}, {label: '证书', value: 2}], // 新增订单收款方式 --  满足XX条件付全款
        rules: {
          new_order_type: [{required: true, message: '请选择订单类别', trigger: 'change'}],
          apply_type: [{required: true, message: '请选择申请方式', trigger: 'change'}],
          payment_type: [{required: true, message: '请选择收款方式', trigger: 'change'}]
        },
        iprOrderForm: {
          new_order_type: null,
          payment_type: null
        },
        saveToInputIprItem: {},
        // 修改项目
        change_item: 1,
        editItem: {},
        can_edit: queryAuth(this, 'contract/contract-mng/edit', ''),
        can_crate: queryAuth(this, 'contract/contract-mng/create', '')
      }
    },
    filters: {},
    mounted() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
      }
      if (this.$route.query.check) {
        this.check = false
        this.id = this.$route.query.id
      }
      this.enterpriseFilterList()
      this.editForm()
    },
    methods: {
      // 合同扫描件
      handleBeforeUpload(file) {
        this.uploadData.enterprise__biz_id = this.ruleForm.enterprise_biz_id
        this.uploadData.dir_name = '合同附件'
      },
      handleFileSuccess(res, file) {
        // 上传文件
        this.ruleForm.contract_url = file.response.url
        this.ruleForm.oss_object_name = file.response.oss_object_name
      },
      // 下载文件
      a_downfile(data) {
        // ossSignUrl(data).then(res => {
        //   if (res.data.code === 1) {
        //     window.open(res.data.data, '_blank')
        //   }
        // })
      },
      editForm() {
        // contractEdit({ 'id': this.id }).then(response => {
        //   if (response.data.code === 1) {
        //     this.ruleForm = response.data.data
        //     this.ruleForm.is_channel = this.ruleForm.is_channel ? '1' : '0'
        //     this.itemList = response.data.contract_item_list
        //     this.itemList.forEach(item => {
        //       item.contract_price_or_bill = item.contract_price_or_bill ? '1' : '0'
        //     })
        //     this.perform_state_list = response.data.perform_state_list
        //     this.cost_list = response.data.cost_list
        //   }
        // })
      },
      // 获取签约公司
      enterpriseFilterList() {
        // enterpriseFilterList(this.listQuery).then(response => {
        //   this.sign_company_list = response.data.sign_company_list
        // })
      },
      toEdit() {
        this.check = true
      },
      // 保存企业基础信息
      saveForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (this.ruleForm.is_channel === '1') {
              if (this.ruleForm.channel_enterprise_name !== '') {
                this.isCompany = false
              } else {
                this.isCompany = true
                return false
              }
            }
            const form = this.ruleForm
            form.itemList = this.itemList
            form.id = this.id

            for (let i = 0; i < form.itemList.length; i++) {
              if (form.itemList[i].num == '' || form.itemList[i].num == null || !form.itemList[i].num) {
                this.$message({
                  message: '请输入数量',
                  type: 'warning'
                })
                return
              }
              if (form.itemList[i].apply_year == '' || form.itemList[i].apply_year == null || !form.itemList[i].apply_year) {
                this.$message({
                  message: '请选择年份',
                  type: 'warning'
                })
                return
              }
              if (form.itemList[i].contract_price_or_bill == '1') {
                if (form.itemList[i].price_and_bill == '' || form.itemList[i].price_and_bill == null || !form.itemList[i].price_and_bill) {
                  this.$message({
                    message: '请输入比例',
                    type: 'warning'
                  })
                  return
                }
              } else {
                if (form.itemList[i].price_and_bill == '' || form.itemList[i].price_and_bill == null || !form.itemList[i].price_and_bill) {
                  this.$message({
                    message: '请输入单价',
                    type: 'warning'
                  })
                  return
                }
              }
            }
            // contractSave(form).then(response => {
            //   if (response.data.code === 1) {
            //     this.$message({
            //       message: '操作成功',
            //       type: 'success'
            //     })
            //     this.$router.push({ 'path': '/contract/contract-mng/list' })
            //   }
            // })
          } else {
            return false
          }
        })
      },
      // 取消
      cancel() {
        this.$router.go(-1)
      },
      delItem(index) {
        this.itemList.splice(index, 1)
      },
      handleProjectYear(item) {
        if (!item.id) {
          var new_form = {}
          new_form.project_library_id = item.project_library_id
          new_form.apply_year = item.apply_year
          new_form.enterprise_id = this.ruleForm.enterprise_id
          // existContractYear(new_form).then(response => {
          //   if (response.data.code === 1) {
          //     console.log()
          //   }
          // })
        }
      },
      changeSignCompany(val) {
        this.$set(this.ruleForm, 'sign_company_name', this.sign_company_list.find(ele => ele.id === val).enterprise_name)
      },
      // 选择公司
      handleEnterpriseSearch() {
        this.orderEntVisiable = true
        this.handleEnterpriseList()
      },
      handleOrderEntSizeChange(val) {
        this.orderEntListQuery.limit = val
        this.handleEnterpriseList()
      },
      handleOrderEntCurrentChange(val) {
        this.orderEntListQuery.page = val
        this.handleEnterpriseList()
      },
      handleEnterpriseList() {
        // orderGetEnterpriseList(this.orderEntListQuery).then(res => {
        //   if (res.data.code === 1) {
        //     this.order_ent_list = res.data.data
        //     this.orderEnterpriseTotal = res.data.recordsTotal
        //   }
        // })
      },
      getOrderEntIndex(data) {
        this.currentOrderEnt = data
      },
      changeOrderEnt() {
        this.orderEntVisiable = false
        this.ruleForm.enterprise_id = this.currentOrderEnt.id
        this.ruleForm.enterprise_name = this.currentOrderEnt.enterprise_name
        // 恢复初始化，避免下一次添加残留数据
        this.currentOrderEnt = null
        this.order_ent_id = ''
      },
      // 获取渠道公司
      handleSizeChange1(val) {
        this.channelListQuery.limit = val
        this.getChannelList()
      },
      handleCurrentChange1(val) {
        this.channelListQuery.page = val
        this.getChannelList()
      },
      getChannelList() {
        this.channelVisiable = true
        // getChannelList(this.channelListQuery).then(res => {
        //   if (res.data.code === 1) {
        //     this.channelList = res.data.data
        //     this.channelTotal = res.data.recordsTotal
        //   }
        // })
      },
      getChannelIndex(data) {
        this.currentChannel = data
      },
      changeChannel() {
        this.channelVisiable = false
        this.ruleForm.channel_enterprise = this.currentChannel.id
        this.ruleForm.channel_enterprise_name = this.currentChannel.enterprise_name
        this.currentChannel = null
        this.isCompany = false
      },
      // 新增合同选择项目
      addProject() {
        this.projectVisiable = true
        // getProjectItemList(this.projectListQuery).then(response => {
        //   if (response.data.code === 1) {
        //     this.projectList = response.data.data_list.data
        //     this.projectTotal = response.data.data_list.recordsTotal
        //   }
        // })
      },
      handleSizeProject(val) {
        this.projectListQuery.limit = val
        this.addProject()
      },
      handleCurrentProject(val) {
        this.projectListQuery.page = val
        this.addProject()
      },
      addContractItem(item) {
        let can_add = false
        if (this.choice_items.length > 0) {
          this.choice_items.forEach((i, index) => {
            if (i.project_library_id === item.project_library_id) {
              can_add = true
              item.check = '1'
            }
          })
          if (can_add) {
            this.$message.error('你已经选过该项目了')
            return false
          } else {
            if (item.project_library__is_ipr_project) {
              this.saveToInputIprItem = {}
              this.dialogFormVisible = true
              this.saveToInputIprItem = item
            } else {
              item.check = '0'
              this.choice_items.push(item)
            }
          }
        } else {
          if (item.project_library__is_ipr_project) {
            this.saveToInputIprItem = {}
            this.dialogFormVisible = true
            this.saveToInputIprItem = item
          } else {
            item.check = '0'
            this.choice_items.push(item)
          }
        }
      },
      delContractItem(item) {
        item.check = '1'
        this.choice_items.forEach((i, index) => {
          if (i.id === item.id) {
            this.choice_items.splice(index, 1)
          }
        })
      },
      cancelChoiceProject() {
        this.choice_items = []
        this.projectVisiable = false
      },
      saveChoiceProject() {
        if (this.choice_items.length < 1) {
          this.$message.error('您还没有选择项目哦')
          return
        }
        this.choice_items.forEach(item => {
          const newItem = JSON.parse(JSON.stringify(item))
          newItem.project_year_id = item.id
          newItem.project_item_id = item.project_item_id
          newItem.apply_year = item.apply_year
          newItem.contract_price_or_bill = '0'
          newItem.num = '1'
          newItem.price_and_bill = '0'
          this.$delete(newItem, 'id')
          this.itemList.push(newItem)
        })

        const obj = {}
        this.itemList = this.itemList.reduce((cur, next) => {
          obj[next.project_library_id] ? '' : obj[next.project_library_id] = true && cur.push(next)
          return cur
        }, []);
        this.choice_items = []
        this.projectVisiable = false
      },
      // 添加知识产权项目
      changePayment() {
        const payment = this.iprOrderForm.payment_type
        if (payment === 0) {
          this.flag = false
          this.flag1 = true
        }
        if (payment === 1 || payment === 2) {
          this.flag = true
          this.flag1 = false
        }
      },
      saveIprOrder(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            this.saveToInputIprItem.new_order_type = this.iprOrderForm.new_order_type
            this.saveToInputIprItem.apply_type = this.iprOrderForm.apply_type
            this.saveToInputIprItem.payment_type = this.iprOrderForm.payment_type
            this.saveToInputIprItem.payment_all_date = this.iprOrderForm.payment_all_date
            this.saveToInputIprItem.payment_pre_date = this.iprOrderForm.payment_pre_date
            this.saveToInputIprItem.payment_pre_ratio = this.iprOrderForm.payment_pre_ratio
            this.saveToInputIprItem.payment_all_item = this.iprOrderForm.payment_all_item
            this.saveToInputIprItem.ipr_pay_remarks = this.iprOrderForm.remarks
            this.saveToInputIprItem.check = '0'
            this.choice_items.push(this.saveToInputIprItem)
            this.dialogFormVisible = false
            this.saveToInputIprItem = {}
          } else {
            this.callbackError(error)
            return false
          }
        })
      },

      // 修改项目
      editProject(item) {
        this.editItem = {}
        this.choice_items = []
        this.change_item = 2
        this.addProject()
        this.editItem = item
      },
      changeItem(item) {
        this.projectList.forEach(i => {
          i.check = '1'
        })
        let can_add = false
        this.itemList.forEach((i, index) => {
          if (i.project_library_id === item.project_library_id) {
            can_add = true
            item.check = '1'
          }
        })
        if (can_add) {
          this.$message.error('该项目已存在')
          return false
        } else {
          this.choice_items = []
          if (item.project_library__is_ipr_project) {
            this.saveToInputIprItem = {}
            this.dialogFormVisible = true
            this.saveToInputIprItem = item
          } else {
            item.check = '0'
            this.choice_items.push(item)
          }
        }
      },
      delChangeItem(item) {
        item.check = '1'
        this.editItem = {}
        this.choice_items = []
      },
      saveChangeProject() {
        if (this.choice_items.length !== 1) {
          this.$message.error('您还没有选择项目哦')
          return
        }
        var newItem = {}
        this.choice_items.forEach(item => {
          newItem = JSON.parse(JSON.stringify(item))
          newItem.project_year_id = item.id
          newItem.project_item_id = item.project_item_id
          newItem.apply_year = item.apply_year
          newItem.contract_price_or_bill = '0'
          newItem.num = '1'
          newItem.price_and_bill = '0'
          this.$delete(newItem, 'id')
        })
        this.itemList.forEach((i, index) => {
          if (i.id === this.editItem.id) {
            this.itemList.splice(index, 1, newItem)
          }
        })
        this.choice_items = []
        this.projectVisiable = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
    font-size: 12px;
  }

  .order_number {
    width: 20px;
    margin-top: 5px;
    color: #ffffff;
  }

  .line-height-30 {
    height: 30px;
    line-height: 30px;
  }

  .ul-li {
    list-style-type: none;
    text-align: left;
    margin-bottom: 15px;
  }

  .ul-ul li:first-child {
    margin-left: 0;
  }

  .ul-li-left-margin {
    margin-left: 2%;
  }

  .width-0-2 {
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
    text-align: right;
  }

  .input-120 {
    width: 120px;
    text-align: right;
  }

  .input-150 {
    width: 150px;
    text-align: right;
  }

  .input-180 {
    width: 180px;
  }

  .input-200 {
    width: 200px;
  }

  .input-240 {
    width: 240px;
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

  .hover_cursor :hover {
    color: #05AAFF;
  }

  .top-margin-10 {
    margin-top: 10px;
  }

  .top-margin-14 {
    margin-top: 14px;
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

  .left-margin-50 {
    margin-left: 50px;
  }

  .left-margin-20 {
    margin-left: 20px;
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

  .bg_pale_pink {
    background: rgb(254, 149, 178);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(254, 149, 178, .5);
    }
  }

  .bg_pale_green {
    background: rgb(145, 229, 161);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(145, 229, 161, .5);
    }
  }

  .bg_pink {
    background: rgb(255, 112, 154);
    color: #fff;

    &:hover {
      background: rgba(255, 112, 154, .5);
    }
  }

  .bg_pale_yellow {
    background: rgb(255, 203, 166);
    color: rgb(255, 255, 255, 1);

    &:hover {
      background: rgba(255, 203, 166, .5);
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
    font-size: 18px;
    color: #f0f7ff;
  }


  /*-----------------------*/
  .new-list {
    /deep/ .el-radio {
      margin-right: 10px;
    }

    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .project-name {
      max-width: 85%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .rule-form {
    /deep/ .el-form-item__label {
      font-size: 14px;
      font-weight: inherit;
      color: #303133;
      width: 100px;
      padding: 0;
      white-space: nowrap;
    }
  }

  .tip {
    position: absolute;
    font-size: 12px;
    bottom: 0;
    right: 0;
  }
</style>
