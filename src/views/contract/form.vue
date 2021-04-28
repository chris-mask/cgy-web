<!-- 合同创建/编辑页-->

<template>
  <div class="app-container">
    <el-divider content-position="left"><span style="color: #0d43fa">合同详情</span></el-divider>
    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm" style="margin-bottom: 70px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="编号：" prop="contract_code">
            <el-input style="width: 100%" v-model="ruleForm.contract_code" readonly> </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="* 企业名称"  prop="enterprise_name">
            <el-button icon="el-icon-search"  @click="handleEnterpriseSearch" v-if="!id">选择企业</el-button>
            <span>{{ruleForm.enterprise_name}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="7">
          <el-form-item label="合同金额或比例" prop="contract_price_or_bill">
            <el-select filterable clearable placeholder="请选择" v-model="ruleForm.contract_price_or_bill" >
              <el-option label="金额" value="0"> </el-option>
              <el-option label="比例" value="1"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7" v-if="ruleForm.contract_price_or_bill === '1'">
          <el-form-item label="合同比例" prop="contract_bill">
            <el-input style="width: 100%" type="number" v-model="ruleForm.contract_bill">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7" v-else>
          <el-form-item label="合同金额" prop="contract_price">
            <el-input style="width: 100%" type="number" v-model="ruleForm.contract_price">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7">
          <el-form-item label="是否渠道合同" prop="is_channel">
            <el-select filterable clearable placeholder="请选择签约公司" v-model="ruleForm.is_channel" >
              <el-option label="否" value="0"> </el-option>
              <el-option label="是" value="1"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7" v-if="ruleForm.is_channel === '1'">
          <el-form-item label="渠道公司" prop="channel_enterprise">
            <el-button icon="el-icon-search"  @click="getChannelList()">选择渠道公司</el-button>
            <span>{{ruleForm.channel_enterprise_name}}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7">
          <el-form-item label="签约公司" prop="sign_company">
            <el-select v-model="ruleForm.sign_company" filterable clearable placeholder="请选择签约公司">
              <el-option
                v-for="item in sign_company_list"
                :key="item.id + Math.random()"
                :label="item.enterprise_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="订单签订日期" prop="sign_date">
            <el-date-picker v-model="ruleForm.sign_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%" >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="有效期" prop="available_year">
            <el-input style="width: 100%" type="number" v-model="ruleForm.available_year">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="签署状态" prop="sign_state">
            <el-select v-model="ruleForm.sign_state" filterable clearable placeholder="请选择签署状态">
              <el-option
                v-for="item in sign_state_list"
                :key="item.id + Math.random()"
                :label="item.dict_value"
                :value="item.dict_value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="履行状态" prop="perform_state">
            <el-select v-model="ruleForm.perform_state" filterable clearable placeholder="请选择履行状态">
              <el-option
                v-for="item in perform_state_list"
                :key="item.id + Math.random()"
                :label="item.dict_value"
                :value="item.dict_value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="已开票金额">
            <el-input style="width: 100%" type="number" v-model="ruleForm.receive_money">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div style="padding: 5px 0px; margin-bottom: 10px">
        <el-divider content-position="left"><span style="color: #0d43fa">项目详情</span><span style="color: red;"> (只能选择同一企业，且保存后不能再修改)</span></el-divider>
        <el-form-item label="" prop="policy_item" >
          <el-table :span-method="arraySpanMethod2" :data="reportList" style="width: 95%">
            <el-table-column prop="date" label="补贴项目名称" width="220" header-align="center"	:render-header="renderHeader">
              <template slot-scope="scope">
                <span>{{scope.row.project_name}}</span>
                <el-button icon="el-icon-search" @click="handleProjectSearch(scope.row, scope.$index)" v-if="!id">选择项目</el-button>
              </template>
            </el-table-column>
            <el-table-column label="补贴地区"  width="200"  align="center">
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>

            <el-table-column label="项目年份"  width="120"  align="center" :render-header="renderHeader">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.apply_year" type="year" value-format="yyyy"  style="width: 100%"> </el-date-picker>
              </template>
            </el-table-column>

            <el-table-column label="项目级别"  width="120" align="center" :render-header="renderHeader">
              <template slot-scope="scope">
                <el-select v-model="scope.row.level" placeholder="请选择">
                  <el-option label="国家级" value="国家级"> </el-option>
                  <el-option label="省级" value="省级"> </el-option>
                  <el-option label="市级" value="市级"> </el-option>
                  <el-option label="区县级" value="区县级"> </el-option>
                  <el-option label="镇街级" value="镇街级"> </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="补贴标准(万元)" header-align="center">
              <el-table-column label="国家(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.subsidy_type === 1">{{scope.row.real_subsidy_price}}</span>
                  <span v-else>{{scope.row.subsidy_country}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="省级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.subsidy_province}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="市级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.subsidy_city}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="地区(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.subsidy_district}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="镇街(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.subsidy_town}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="总计(万元)" width="120" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.subsidy_total }}</span>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column prop="date" header-align="center" align="center" >
              <template slot="header">
                <span>操作</span>
                <el-button @click="addItem" v-if="!id">添加</el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="delItem(scope.$index)" v-if="!id">删除</el-button>
                <span v-else>已保存</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>

      <div style="padding: 5px 0px; margin-bottom: 10px; display: none;">
        <el-divider content-position="left"><span style="color: #0d43fa">项目应收款</span></el-divider>
        <el-form-item label="" prop="policy_item" >
          <el-table :data="reportList" style="width: 85%" show-summary :summary-method="getSummaries">

            <el-table-column prop="date" label="项目名称" width="220" header-align="center"	>
              <template slot-scope="scope">
                <span>{{scope.row.project_name}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="date" label="补贴区域" width="220" header-align="center"	>
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>

            <el-table-column label="应收金额(万元)" header-align="center">
              <el-table-column label="国家(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.accounts_receivable_country" @change="countSum(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="省级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.accounts_receivable_province" @change="countSum(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="市级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.accounts_receivable_city" @change="countSum(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="地区(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.accounts_receivable_district" @change="countSum(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="镇街(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.accounts_receivable_town" @change="countSum(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="总计(万元)" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.accounts_receivable_total }}</span>
                </template>
              </el-table-column>
            </el-table-column>

          </el-table>
        </el-form-item>
      </div>

      <div style="padding: 5px 0px; margin-bottom: 10px; display: none;">
        <el-divider content-position="left"><span style="color: #0d43fa">项目回款</span></el-divider>
        <el-form-item label="" prop="policy_item" >
          <el-table :data="reportList" style="width: 85%" show-summary :summary-method="getSummaries1">

            <el-table-column prop="date" label="项目名称" width="220" header-align="center"	>
              <template slot-scope="scope">
                <span>{{scope.row.project_name}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="date" label="补贴区域" width="220" header-align="center"	>
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>

            <el-table-column label="回款金额(万元)" header-align="center">
              <el-table-column label="国家(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.back_money_country" @change="countSum1(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="省级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.back_money_province" @change="countSum1(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="市级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.back_money_city" @change="countSum1(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="地区(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.back_money_district" @change="countSum1(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="镇街(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.back_money_town" @change="countSum1(scope.row)"> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="总计(万元)" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.back_money_total }}</span>
                </template>
              </el-table-column>
            </el-table-column>

          </el-table>
        </el-form-item>
      </div>

      <div style="padding: 5px 0px; margin-bottom: 10px; display: none;">
        <el-divider content-position="left"><span style="color: #0d43fa">项目未回款</span></el-divider>
        <el-form-item label="" prop="policy_item" >
          <el-table :data="reportList" style="width: 85%" show-summary :summary-method="getSummaries2">
            <el-table-column prop="date" label="项目名称" width="220" header-align="center"	>
              <template slot-scope="scope">
                <span>{{scope.row.project_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="补助区域" width="220" header-align="center"	>
              <template slot-scope="scope">
                <span>{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column label="未回款金额(万元)" header-align="center">
              <el-table-column label="国家(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.no_back_money_country" readonly> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="省级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.no_back_money_province" readonly> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="市级(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.no_back_money_city" readonly> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="地区(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.no_back_money_district" readonly> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="镇街(万元)" width="120" header-align="center">
                <template slot-scope="scope">
                  <el-input type="number" v-model="scope.row.no_back_money_town" readonly> </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="总计(万元)" header-align="center" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.no_back_money_total }}</span>
                </template>
              </el-table-column>
            </el-table-column>

          </el-table>
        </el-form-item>
      </div>

      <el-form-item label="业务费用" prop="cost_item"  v-if="read_channel_cost">
        <el-table :data="costList" style="width: 80%">
          <el-table-column prop="date" label="收款人" width="220" header-align="center"	>
            <template slot-scope="scope">
              <el-input v-model="scope.row.user_name"> </el-input>
            </template>
          </el-table-column>
          <el-table-column label="应收款"  width="200"  align="center">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.need_pay">
                <template slot="append">元</template>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column label="已收款"  width="200"  align="center">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.already_pay">
                <template slot="append">元</template>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column label="未收款"  width="200"  align="center">
            <template slot-scope="scope">
              <el-input type="number" v-model="scope.row.no_pay">
                <template slot="append">元</template>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column prop="date" header-align="center" align="center" >
            <template slot="header">
              <span>操作</span>
              <el-button @click="addCostItem">添加</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="delCostItem(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-row>
        <el-col :span="14">
          <el-form-item label="备注" prop="remarks" >
            <el-input v-model="ruleForm.remarks" type="textarea" :rows="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="合同扫描件上传" prop="official_file" class="redItem">
        <el-upload
          class="upload-box upload-box-width"
          :action="host + upload_url"
          :on-success="handleFileSuccess"
          :file-list="fileList"
          :show-file-list="true"
          :data="uploadData"
          :limit="limit">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div>
          <el-button class="yu-lan" v-if="ruleForm.contract_url" style="margin:10px; color: #ff1217;" @click="a_downfile(ruleForm)">已上传，点击下载</el-button>
        </div>
      </el-form-item>

      <el-form-item class="form-button">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>

    <!--选择渠道公司-->
    <el-dialog title="选择渠道公司" :visible.sync="channelVisiable"  width="60%">
      <div>
        <el-input v-model="channelListQuery.enterprise_name" style="width: 300px;" placeholder="企业名称">
          <el-button slot="append" @click="getChannelList()" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="channelList" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" label="" width="50" >
          <template slot-scope="scope">
            <el-radio v-model="channel_id" :label="scope.$index" @change="getChannelIndex(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="渠道企业名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.enterprise_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="跟踪业务员" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.business_managers}}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道客户所在区域" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                       :current-page="channelListQuery.page" :page-sizes="[10,20,30, 50]" :page-size="channelListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="channelTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="channelVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeChannel">确定</el-button>
      </div>
    </el-dialog>

    <!-- 选择签订合同的公司 -->
    <el-dialog title="选择签订企业" :visible.sync="orderEntVisiable"  width="60%">
      <div>
        <el-input v-model="orderEntListQuery.enterprise_name" style="width: 300px;" placeholder="企业名称">
          <el-button slot="append" @click="handleEnterpriseList()" icon="el-icon-search"> </el-button>
        </el-input>
      </div>
      <el-table :data="order_ent_list" border style="width: 100%; margin-top: 20px">
        <el-table-column align="center" label="" width="50" >
          <template slot-scope="scope">
            <el-radio v-model="order_ent_id" :label="scope.$index" @change="getOrderEntIndex(scope.row)">&nbsp;</el-radio>
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
                       :current-page="orderEntListQuery.page" :page-sizes="[10,20,30, 50]" :page-size="orderEntListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="orderEnterpriseTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderEntVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeOrderEnt">确定</el-button>
      </div>
    </el-dialog>

    <!-- 选择签订合同的项目 -->
    <el-dialog title="选择签订项目及区域" :visible.sync="orderProjectVisiable"  width="80%">
      <div>
        <el-input v-model="orderProjectListQuery.project_name" style="width: 300px;" placeholder="项目名称">
          <el-button slot="append" @click="handleProjectList()" icon="el-icon-search"> </el-button>
        </el-input>
      </div>
      <el-table :data="order_project_list" border style="width: 100%; margin-top: 20px" :span-method="arraySpanMethod">
        <el-table-column align="center" label="" width="50" >
          <template slot-scope="scope">
            <el-radio v-model="order_project_id" :label="scope.$index" @change="getOrderProjectIndex(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.project_name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="项目类型" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.project_type}}</span>
          </template>
        </el-table-column>

        <el-table-column label="补助区域" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>

        <el-table-column label="国家(万元)" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.subsidy_type === 1">{{scope.row.real_subsidy_price}}</span>
            <span v-else>{{scope.row.subsidy_country}}</span>
          </template>
        </el-table-column>

        <el-table-column label="省级(万元)" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.subsidy_province}}</span>
          </template>
        </el-table-column>

        <el-table-column label="市级(万元)" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.subsidy_city}}</span>
          </template>
        </el-table-column>

        <el-table-column label="区县(万元)" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.subsidy_district}}</span>
          </template>
        </el-table-column>

        <el-table-column label="镇街(万元)" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.subsidy_town}}</span>
          </template>
        </el-table-column>

        <el-table-column label="合计(万元)" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.subsidy_total}}</span>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleProjectSizeChange" @current-change="handleProjectCurrentChange"
                       :current-page="orderProjectListQuery.page" :page-sizes="[10,20,30, 50]" :page-size="orderProjectListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="orderProjectTotal">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderProjectVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeOrderProject">确定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
  // import { contractEdit, contractSave } from '@/api/contract'
  // import { orderGetEnterpriseList } from '@/api/enterprise_app'
  // import { orderGetProjectList } from '@/api/grp'
  // import { queryAuth } from '@/utils/auth'
  // import { getChannelList } from '@/api/channel'
  // import { ossSignUrl } from '@/api/utils'

  export default {
    name: 'mass-form',
    data() {
      return {
        host: process.env.BASE_API,
        upload_url: '/core/upload-files-to-oss/',
        uploadData: { save_path: 'contract/contract_img/' },
        limit: 1,
        fileList: [],
        enterprise_list: [], // 企业列表
        sign_company_list: [], // 签约公司列表
        perform_state_list: [], // 履行状态
        sign_state_list: [], // 签署状态
        itemList: [],
        reportList: [],
        costList: [], // 渠道提成
        id: '',
        pass_id: '',
        tableVisiable: false,
        is_channel_contract: false, // 从渠道合同跳过来的
        ruleForm: {},
        total: null,
        currentRow: null, // 当前选中的项目对象
        listQuery: {
          page: 1,
          limit: 10,
          sort: '+id',
          report_state: 0
        },
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
        countrySum: 0, // 国家级应回款合计
        provinceSum: 0, // 省级应回款合计
        citySum: 0, // 市级应回款合计
        districtSum: 0, // 区级应回款合计
        townSum: 0, // 镇级应回款合计
        rules: {
          sign_company: [{ required: true, message: '请选择签约公司' }],
          sign_date: [{ required: true, message: '请输入订单签订日期' }],
          available_year: [{ required: true, message: '请输入有效期' }],
          sign_state: [{ required: true, message: '请输入签署状态' }],
          perform_state: [{ required: true, message: '请输入履行状态' }],
          back_money_country: [{ required: true, message: '请输入合同回款-国家' }],
          back_money_province: [{ required: true, message: '请输入合同回款-省级' }],
          back_money_city: [{ required: true, message: '请输入合同回款-市级' }],
          back_money_district: [{ required: true, message: '请输入合同回款-区县' }],
          back_money_town: [{ required: true, message: '请输入合同回款-镇街' }],
          no_back_money_country: [{ required: true, message: '请输入合同未回款-国家' }],
          no_back_money_province: [{ required: true, message: '请输入合同未回款-省级' }],
          no_back_money_city: [{ required: true, message: '请输入合同未回款-市级' }],
          no_back_money_district: [{ required: true, message: '请输入合同未回款-区县' }],
          no_back_money_town: [{ required: true, message: '请输入合同未回款-镇街' }],
          is_channel: [{ required: true, message: '请选择是否渠道合同' }]
        },

        // 选择合同企业
        order_ent_id: '',
        orderEntVisiable: false,
        order_ent_list: [],
        orderEnterpriseTotal: null,
        orderEntListQuery: {
          page: 1,
          limit: 10
        },
        currentOrderEnt: {},
        // 选择项目
        searchProjectIndex: 0,
        order_project_id: '',
        orderProjectVisiable: false,
        order_project_list: [],
        orderProjectTotal: null,
        orderProjectListQuery: {
          page: 1,
          limit: 10
        },
        currentOrderProject: {},
        // 权限控制
        read_channel_cost: queryAuth(this, 'read_channel_cost', '/contract/contract-mng/list') // 查看渠道费用
      }
    },

    mounted() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
      }
      this.editForm(this.id)
    },
    watch: {
      countrySum: function(newVal) {
        let tempCount = newVal - this.ruleForm.back_money_country
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_country', tempCount)
        this.countUnreturnedMoney()
      },
      provinceSum: function(newVal) {
        let tempCount = newVal - this.ruleForm.back_money_province
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_province', tempCount)
        this.countUnreturnedMoney()
      },
      citySum: function(newVal) {
        let tempCount = newVal - this.ruleForm.back_money_city
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_city', tempCount)
        this.countUnreturnedMoney()
      },
      districtSum: function(newVal) {
        let tempCount = newVal - this.ruleForm.back_money_district
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_district', tempCount)
        this.countUnreturnedMoney()
      },
      townSum: function(newVal) {
        let tempCount = newVal - this.ruleForm.back_money_town
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_town', tempCount)
        this.countUnreturnedMoney()
      },
      'ruleForm.back_money_country': function(newVal) {
        let tempCount = this.countrySum - newVal
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_country', tempCount)
        this.countUnreturnedMoney()
      },
      'ruleForm.back_money_province': function(newVal) {
        let tempCount = this.provinceSum - newVal
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_province', tempCount)
        this.countUnreturnedMoney()
      },
      'ruleForm.back_money_city': function(newVal) {
        let tempCount = this.citySum - newVal
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_city', tempCount)
        this.countUnreturnedMoney()
      },
      'ruleForm.back_money_district': function(newVal) {
        let tempCount = this.districtSum - newVal
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_district', tempCount)
        this.countUnreturnedMoney()
      },
      'ruleForm.back_money_town': function(newVal) {
        let tempCount = this.townSum - newVal
        tempCount = tempCount > 0 ? tempCount : 0
        this.$set(this.ruleForm, 'no_back_money_town', tempCount)
        this.countUnreturnedMoney()
      }
    },
    filters: {
    },
    methods: {
      renderHeader(h, { column, $index }) {
        // 这里在最外层插入一个div标签
        return h('div', [
          h('span', {
            // 表示内容
            domProps: {
              innerHTML: column.label
            }
          }),
          h('span', {
            // 表示内容
            'style': 'color: red;',
            domProps: {
              innerHTML: ' *'
            }
          })
        ])
      },
      countReturnedMoney() {
        this.ruleForm.back_money_total = parseInt(this.ruleForm.back_money_country) || 0
        this.ruleForm.back_money_total += parseInt(this.ruleForm.back_money_province) || 0
        this.ruleForm.back_money_total += parseInt(this.ruleForm.back_money_city) || 0
        this.ruleForm.back_money_total += parseInt(this.ruleForm.back_money_district) || 0
        this.ruleForm.back_money_total += parseInt(this.ruleForm.back_money_town) || 0
      },
      countUnreturnedMoney() {
        this.ruleForm.no_back_money_total = parseInt(this.ruleForm.no_back_money_country) || 0
        this.ruleForm.no_back_money_total += parseInt(this.ruleForm.no_back_money_province) || 0
        this.ruleForm.no_back_money_total += parseInt(this.ruleForm.no_back_money_city) || 0
        this.ruleForm.no_back_money_total += parseInt(this.ruleForm.no_back_money_district) || 0
        this.ruleForm.no_back_money_total += parseInt(this.ruleForm.no_back_money_town) || 0
      },
      handleFileSuccess(res, file) {
        // 上传文件
        this.ruleForm.contract_url = file.response.url
        this.ruleForm.oss_object_name = file.response.oss_object_name
      },
      // 补贴金额若项目没固定值则提示用户自己看政策, 补贴项目弹出框部分
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (row.subsidy_type === 1) {
          if (columnIndex === 4) {
            return [1, 6]
          } else if (columnIndex > 4 && columnIndex < 10) {
            return [0, 0]
          }
        }
      },
      // 下载文件
      a_downfile(data) {
        // ossSignUrl(data).then(res => {
        //   if (res.data.code === 1) {
        //     window.open(res.data.data, '_blank')
        //   }
        // })
      },
      goback() {
        this.$router.go(-1)
      },
      editForm(id) {
        // contractEdit({ 'id': id }).then(response => {
        //   if (response.data.code === 1) {
        //     this.ruleForm = response.data.data
        //     this.ruleForm.contract_price_or_bill = this.ruleForm.contract_price_or_bill ? '1' : '0'
        //     this.ruleForm.is_channel = this.ruleForm.is_channel ? '1' : '0'
        //     this.reportList = response.data.contract_item_list
        //     this.costList = response.data.cost_list
        //     this.enterprise_list = response.data.enterprise_list
        //     this.ruleForm.contract_code = response.data.contract_code
        //     this.sign_company_list = response.data.sign_company_list
        //     this.perform_state_list = response.data.perform_state_list
        //     this.sign_state_list = response.data.sign_state_list
        //   }
        // })
      },
      submitForm(formName) {
        if (!this.ruleForm.enterprise_id) {
          this.$message({
            message: '请选择企业！',
            type: 'error'
          })
          return
        }
        if ((this.ruleForm.is_channel == '1' || this.ruleForm.is_channel == 1) && !this.ruleForm.channel_enterprise) {
          this.$message({
            message: '该合同是渠道合同，请选择渠道公司！',
            type: 'error'
          })
          return
        }
        for (var i = 0; i < this.reportList.length; i++) {
          if (!this.reportList[i].project_item_id) {
            this.$message.error('项目详情的补贴项目必填')
            return
          }
          if (!this.reportList[i].level) {
            this.$message.error('补贴项目的项目级别必填')
            return
          }
          if (!this.reportList[i].apply_year) {
            this.$message.error('补贴项目的申请年度必填')
            return
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var form = this.ruleForm
            form.id = this.id
            form.contract_item_list = this.reportList
            form.cost_list = this.costList
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
      // 补贴金额若项目没固定值则提示用户自己看政策 , 补贴项目表格部分
      arraySpanMethod2({ row, column, rowIndex, columnIndex }) {
        if (row.subsidy_type === 1) {
          if (columnIndex === 4) {
            return [1, 6]
          } else if (columnIndex > 4 && columnIndex <= 9) {
            return [0, 0]
          }
        }
      },
      addItem() {
        var policy_item = {
          biz_id: '',
          contract_id: 0,
          enterprise_id: '',
          enterprise_name: '',
          project_library_id: '',
          project_name: '',
          project_item_id: '',
          project_item__address: '',
          project_item__subsidy_type: 0,
          project_item__subsidy_total: 0,
          project_item__subsidy_country: 0,
          project_item__subsidy_province: 0,
          project_item__subsidy_city: 0,
          project_item__subsidy_district: 0,
          project_item__subsidy_town: 0,
          project_item__real_subsidy_price: 0,
          accounts_receivable_country: 0,
          accounts_receivable_province: 0,
          accounts_receivable_city: 0,
          accounts_receivable_district: 0,
          accounts_receivable_town: 0,
          accounts_receivable_total: 0
        }
        this.reportList.push(policy_item)
      },
      delItem(index) {
        this.reportList.splice(index, 1)
      },
      /**
       * 表格应收款合计列方法
       * columns 每列的对象
       * data 每行的对象
       */
      getSummaries(param) {
        const { columns, data } = param
        const showList = ['accounts_receivable_country', 'accounts_receivable_province', 'accounts_receivable_city', 'accounts_receivable_district', 'accounts_receivable_town', 'accounts_receivable_total']
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 1) {
            sums[index] = ''
            return
          }
          const flag = showList[index - 2]
          sums[index] = 0
          for (let j = 0; j < data.length; j++) {
            if (data[j][flag] === '未填' || !data[j][flag]) {
              continue
            }
            sums[index] += parseFloat(data[j][flag])
          }
          sums[index] = sums[index].toFixed(2)
        })
        this.countrySum = sums[2]
        this.provinceSum = sums[3]
        this.citySum = sums[4]
        this.districtSum = sums[5]
        this.townSum = sums[6]
        return sums
      },
      countSum(data) {
        var sum = 0
        if (parseFloat(data.accounts_receivable_country)) {
          sum += parseFloat(data.accounts_receivable_country)
        } else {
          sum += 0
        }
        if (parseFloat(data.accounts_receivable_province)) {
          sum += parseFloat(data.accounts_receivable_province)
        } else {
          sum += 0
        }
        if (parseFloat(data.accounts_receivable_city)) {
          sum += parseFloat(data.accounts_receivable_city)
        } else {
          sum += 0
        }
        if (parseFloat(data.accounts_receivable_district)) {
          sum += parseFloat(data.accounts_receivable_district)
        } else {
          sum += 0
        }
        if (parseFloat(data.accounts_receivable_town)) {
          sum += parseFloat(data.accounts_receivable_town)
        } else {
          sum += 0
        }
        this.$set(data, 'accounts_receivable_total', sum)
      },
      /**
       * 表格回款合计列方法
       * columns 每列的对象
       * data 每行的对象
       */
      getSummaries1(param) {
        const { columns, data } = param
        const showList = ['back_money_country', 'back_money_province', 'back_money_city', 'back_money_district', 'back_money_town', 'back_money_total']
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 1) {
            sums[index] = ''
            return
          }
          const flag = showList[index - 2]
          sums[index] = 0
          for (let j = 0; j < data.length; j++) {
            if (data[j][flag] === '未填' || !data[j][flag]) {
              continue
            }
            sums[index] += parseFloat(data[j][flag])
          }
          sums[index] = sums[index].toFixed(2)
        })
        return sums
      },
      countSum1(data) {
        var sum = 0
        if (parseFloat(data.back_money_country)) {
          sum += parseFloat(data.back_money_country)
        } else {
          sum += 0
        }
        if (parseFloat(data.back_money_province)) {
          sum += parseFloat(data.back_money_province)
        } else {
          sum += 0
        }
        if (parseFloat(data.back_money_city)) {
          sum += parseFloat(data.back_money_city)
        } else {
          sum += 0
        }
        if (parseFloat(data.back_money_district)) {
          sum += parseFloat(data.back_money_district)
        } else {
          sum += 0
        }
        if (parseFloat(data.back_money_town)) {
          sum += parseFloat(data.back_money_town)
        } else {
          sum += 0
        }
        this.$set(data, 'back_money_total', sum)
      },
      /**
       * 表格未回款合计列方法
       * columns 每列的对象
       * data 每行的对象
       */
      getSummaries2(param) {
        const { columns, data } = param
        const showList = ['no_back_money_country', 'no_back_money_province', 'no_back_money_city', 'no_back_money_district', 'no_back_money_town', 'no_back_money_total']
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 1) {
            sums[index] = ''
            return
          }
          const flag = showList[index - 2]
          sums[index] = 0
          for (let j = 0; j < data.length; j++) {
            if (data[j][flag] === '未填' || !data[j][flag]) {
              continue
            }
            sums[index] += parseFloat(data[j][flag])
          }
          sums[index] = sums[index].toFixed(2)
        })
        return sums
      },
      // 渠道费用
      addCostItem() {
        if (!this.ruleForm.back_money_total) {
          this.$message({
            message: '只有合同回款之后才能设置业务费用',
            type: 'error'
          })
        } else {
          var cost_item = {}
          this.costList.push(cost_item)
        }
      },
      delCostItem(index) {
        this.costList.splice(index, 1)
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
      // 选择项目
      handleProjectSearch(row, index) {
        this.orderProjectVisiable = true
        this.searchProjectIndex = index
        this.handleProjectList()
      },
      handleProjectSizeChange(val) {
        this.orderProjectListQuery.limit = val
        this.handleProjectList()
      },
      handleProjectCurrentChange(val) {
        this.orderProjectListQuery.page = val
        this.handleProjectList()
      },
      handleProjectList() {
        // orderGetProjectList(this.orderProjectListQuery).then(res => {
        //   if (res.data.code === 1) {
        //     this.order_project_list = res.data.data
        //     this.orderProjectTotal = res.data.recordsTotal
        //   }
        // })
      },
      getOrderProjectIndex(data) {
        this.currentOrderProject = data
      },
      changeOrderProject() {
        this.orderProjectVisiable = false
        this.reportList[this.searchProjectIndex].project_library_id = this.currentOrderProject.project_library_id
        this.reportList[this.searchProjectIndex].project_item_id = this.currentOrderProject.id
        this.reportList[this.searchProjectIndex].project_name = this.currentOrderProject.project_name
        this.reportList[this.searchProjectIndex].project_type = this.currentOrderProject.project_type
        this.reportList[this.searchProjectIndex].address = this.currentOrderProject.address
        this.reportList[this.searchProjectIndex].subsidy_type = this.currentOrderProject.subsidy_type
        this.reportList[this.searchProjectIndex].subsidy_total = this.currentOrderProject.subsidy_total
        this.reportList[this.searchProjectIndex].subsidy_country = this.currentOrderProject.subsidy_country
        this.reportList[this.searchProjectIndex].subsidy_province = this.currentOrderProject.subsidy_province
        this.reportList[this.searchProjectIndex].subsidy_city = this.currentOrderProject.subsidy_city
        this.reportList[this.searchProjectIndex].subsidy_district = this.currentOrderProject.subsidy_district
        this.reportList[this.searchProjectIndex].subsidy_town = this.currentOrderProject.subsidy_town
        this.reportList[this.searchProjectIndex].real_subsidy_price = this.currentOrderProject.real_subsidy_price
        // 恢复初始化，避免下一次添加残留数据
        this.currentOrderProject = null
        this.order_project_id = ''
        this.reportList = JSON.parse(JSON.stringify(this.reportList))
      }
    }
  }
</script>

<style scoped>
  .form-button{
    text-align: right;
    margin: 100px  150px;
  }
  .upload-box-width {
    width: 300px;
  }

  .yu-lan {
    display: inline-block;
    background: none;
    border: none;
  }
  .redItem .el-form-item__label{
    color: red;
  }
</style>
