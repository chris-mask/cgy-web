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
        <div style="display: flex;">
          <div class="float-left" style="width: 90px;">
            <div class="bg_pale_blue ent_shorthand left-margin-10 padding-20 float-left text-align-center"
                 style="width : 80px; height: 80px;">
              {{ruleForm.projectTitle ? ruleForm.projectTitle : '项目简称'}}
            </div>
          </div>
          <div class="float-left left-margin-10" style="width: 90%; min-width: 1000px;">
            <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :inline="true">
              <el-row>
                <div class="float-left inline-block width-0-6" style="display: flex;align-items: center;">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>项目名称：</span>
                  <el-input v-if="check" size="mini" maxlength="50" show-word-limit v-model.trim="ruleForm.projectName"
                            placeholder="项目名称" class="inline-block left-margin-5" style="width: 300px;"></el-input>
                  <span v-else style="width: 260px;">{{ruleForm.projectName}}
                  <img v-if="check && can_edit" class="hover_cursor" @click="toEdit"
                       src="../../icons/enterprise/contract_edit.png" style="vertical-align:middle; margin-left: 3px;"/>
                </span>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150">项目简称：</span>
                  <el-input size="mini" v-if="check" maxlength="4" show-word-limit v-model="ruleForm.projectTitle"
                            placeholder="项目简称" class="float-left inline-block left-margin-5 input-100"></el-input>
                  <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.projectTitle}}</span>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-2">
                  <span class="float-left inline-block span-input input-150"><span class="star" style="margin-left: -10px;">*</span>最大批次：</span>
                  <el-input size="mini" v-if="check" type="number" v-model="ruleForm.maxBatch" placeholder="最大批次" class="float-left inline-block left-margin-5 input-100"></el-input>
                  <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.maxBatch}}</span>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-2" style="display: flex;">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>项目分类：</span>
                  <el-select size="mini" v-if="check" clearable v-model="ruleForm.projectType" placeholder="项目分类"
                             class="float-left inline-block left-margin-5" @change="typeChange">
                    <el-option v-for="item in type_list" :key="item.dictId" :value="item.dictId"
                               :label="item.dictName"></el-option>
                  </el-select>
                  <span v-else
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.projectTypeName}}</span>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-2" style="display: flex;">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>订单类型：</span>
                  <el-select size="mini" v-if="check" clearable v-model="ruleForm.orderType" placeholder="订单类型"
                             class="float-left inline-block left-margin-5" @change="typeChange">
                    <el-option v-for="item in orderTypeList" :key="item.dictId" :value="item.dictId"
                               :label="item.dictName"></el-option>
                  </el-select>
                  <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.orderType == 0 ? '项目型' : ruleForm.orderType == 1 ? '知识产权型' : ruleForm.orderType == 2 ? '财务型' : ruleForm.orderType == 4 ? '项目审计型' : '-'}}</span>
                </div>
<!--                <div class="float-left inline-block top-margin-10 width-0-2" style="display: flex;">-->
<!--                  <span class="float-left inline-block span-input input-150"><span class="star"-->
<!--                                                                                   style="margin-left: -10px;">*</span>单价：</span>-->
<!--                  <el-input size="mini" v-if="check" v-model="ruleForm.unitPrice" placeholder="单价"-->
<!--                            onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="13"-->
<!--                            class="float-left inline-block left-margin-5 input-90"></el-input>-->
<!--                  <span class="left-margin-5 span-input" v-if="check" style="font-size: 12px;">元</span>-->
<!--                  <span v-if="!check"-->
<!--                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.unitPrice}}元</span>-->
<!--                </div>-->
              </el-row>
              <el-row>
                <div class="flex inline-block top-margin-10">
                  <span class="inline-block span-input input-150">项目别名：</span>
                  <div>
                    <el-tag
                      :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag}}
                    </el-tag>
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="mini"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    >
                    </el-input>


                    <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 新增</el-button>
                  </div>
                </div>
              </el-row>
              <el-row>
                <div class="flex inline-block top-margin-10">
                  <span class="inline-block span-input input-150">项目概述：</span>
                  <el-input size="mini" v-if="check" type="textarea" v-model="ruleForm.projectSummary" maxlength="400" show-word-limit
                            :autosize="{ minRows: 3}" placeholder="项目概述" class="inline-block left-margin-5"></el-input>
                  <p v-else class="inline-block left-margin-5" style="flex:1;">{{ruleForm.projectSummary}}</p>
                </div>
              </el-row>


              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150">
                    <span class="star" style="margin-left: -10px;">*</span>单价金额/比例：
                  </span>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.unitPriceBill" label="0"
                            :disabled="!check">金额
                  </el-radio>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.unitPriceBill" label="1"
                            :disabled="!check">比例
                  </el-radio>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150">
                    <span class="star" style="margin-left: -10px;">*</span>单价金额/比例：
                  </span>
                  <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="13" v-if="check"
                            v-model="ruleForm.unitPrice" placeholder="单价金额/比例"
                            class="float-left inline-block left-margin-5 input-90"></el-input>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.unitPriceBill=='0'">元</span>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.unitPriceBill=='1'">%</span>
                  <span v-if="!check && ruleForm.unitPriceBill==='0'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.unitPrice}}元</span>
                  <span v-if="!check && ruleForm.unitPriceBill==='1'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.unitPrice}}%</span>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150">
                    原价金额/比例：
                  </span>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.originalPriceBill" label="0"
                            :disabled="!check">金额
                  </el-radio>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.originalPriceBill" label="1"
                            :disabled="!check">比例
                  </el-radio>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150">
                    原价金额/比例：
                  </span>
                  <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="13" v-if="check"
                            v-model="ruleForm.originalPrice" placeholder="原价金额/比例"
                            class="float-left inline-block left-margin-5 input-90"></el-input>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.originalPriceBill=='0'">元</span>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.originalPriceBill=='1'">%</span>
                  <span v-if="!check && ruleForm.originalPriceBill==='0'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.originalPrice}}元</span>
                  <span v-if="!check && ruleForm.originalPriceBill==='1'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.originalPrice}}%</span>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <!--                  <span class="float-left inline-block span-input input-150">销售保底价(金额)：</span>-->
                  <!--                  <el-input type="number" size="mini" v-if="check" show-word-limit v-model="ruleForm.salesMinimumPrice" placeholder="销售保底价(金额)" class="float-left inline-block left-margin-5 input-90"> </el-input>-->
                  <!--                  <span class="left-margin-5 span-input" style="font-size: 12px;">元</span>-->
                  <!--                  <span v-if="!check" class="float-left inline-block left-margin-5 span-input">{{ruleForm.salesMinimumPrice}}</span>-->
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>销售保底价金额/比例：</span>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.salesMinimumWay" label="0"
                            :disabled="!check">金额
                  </el-radio>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.salesMinimumWay" label="1"
                            :disabled="!check">比例
                  </el-radio>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>销售保底价金额/比例：</span>
                  <el-input onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="13" size="mini" v-if="check"
                            v-model="ruleForm.salesMinimum" placeholder="销售保底价"
                            class="float-left inline-block left-margin-5 input-90"></el-input>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.salesMinimumWay=='0'">元</span>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.salesMinimumWay=='1'">%</span>
                  <span v-if="!check && ruleForm.salesMinimumWay==='0'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.salesMinimum}}元</span>
                  <span v-if="!check && ruleForm.salesMinimumWay==='1'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.salesMinimum}}%</span>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>渠道提成方式：</span>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.channelCommissioBill" label="0"
                            :disabled="!check">金额
                  </el-radio>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.channelCommissioBill" label="1"
                            :disabled="!check">比例
                  </el-radio>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>渠道提成金额/比例：</span>
                  <el-input size="mini" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="13" v-if="check"
                            v-model="ruleForm.channelNumber" placeholder="渠道提成金额/比例"
                            class="float-left inline-block left-margin-5 input-90"></el-input>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.channelCommissioBill=='0'">元</span>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.channelCommissioBill=='1'">%</span>
                  <span v-if="!check && ruleForm.channelCommissioBill==='0'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.channelNumber}}元</span>
                  <span v-if="!check && ruleForm.channelCommissioBill==='1'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.channelNumber}}%</span>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>市场部提成方式：</span>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.marketCommissioWay" label="0"
                            :disabled="!check">金额
                  </el-radio>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.marketCommissioWay" label="1"
                            :disabled="!check">比例
                  </el-radio>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>市场部提成金额/比例：</span>
                  <el-input onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="13" size="mini" v-if="check"
                            v-model="ruleForm.marketCommissio" placeholder="市场部提成金额/比例"
                            class="float-left inline-block left-margin-5 input-90"></el-input>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.marketCommissioWay === '0'">元</span>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.marketCommissioWay === '1'">%</span>
                  <span v-if="!check && ruleForm.marketCommissioWay === '0'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.marketCommissio}}元</span>
                  <span v-if="!check && ruleForm.marketCommissioWay === '1'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.marketCommissio}}%</span>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>项目部提成方式：</span>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.projectCommissioWay" label="0"
                            :disabled="!check">金额
                  </el-radio>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.projectCommissioWay" label="1"
                            :disabled="!check">比例
                  </el-radio>
                </div>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>项目部提成金额/比例：</span>
                  <el-input onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="13" size="mini" v-if="check"
                            v-model="ruleForm.projectCommissioMoneyBill" placeholder="项目部提成金额/比例"
                            class="float-left inline-block left-margin-5 input-90"></el-input>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.projectCommissioWay === '0'">元</span>
                  <span class="left-margin-5 span-input" style="font-size: 12px;"
                        v-if="check && ruleForm.projectCommissioWay === '1'">%</span>
                  <span v-if="!check && ruleForm.projectCommissioWay === '0'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.projectCommissioMoneyBill}}元</span>
                  <span v-if="!check && ruleForm.projectCommissioWay === '1'"
                        class="float-left inline-block left-margin-5 span-input">{{ruleForm.projectCommissioMoneyBill}}%</span>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-3">
                  <span class="float-left inline-block span-input input-150"><span class="star"
                                                                                   style="margin-left: -10px;">*</span>工程师一次性提成：</span>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.engineerCommissio" label="0"
                            :disabled="!check">是
                  </el-radio>
                  <el-radio class="float-left inline-block span-input" v-model="ruleForm.engineerCommissio" label="1"
                            :disabled="!check">否
                  </el-radio>
                </div>
              </el-row>
              <el-row>
                <div class="float-left inline-block top-margin-10 width-0-5">
                  <!--0:false；1:true-->
                  <el-checkbox v-model="isOftenApply" class="float-left inline-block span-input"
                               @change="applyChange" :disabled="!check">常年可报
                  </el-checkbox>
                  <el-checkbox v-model="ruleForm.isOftenProject ==1?true:false"
                               class="float-left inline-block span-input" @change="projectChange"
                               :disabled="!check">常规项目
                  </el-checkbox>
                  <el-checkbox v-model="ruleForm.isPickProject ==1?true:false"
                               class="float-left inline-block span-input input-150" @change="isPickProjectChange"
                               :disabled="!check">精选项目
                  </el-checkbox>
                </div>

                <div class="float-left inline-block top-margin-10 width-0-5">
                  <el-radio-group v-model="ruleForm.priceType">
                    <el-radio :label="0">面议</el-radio>
                    <el-radio :label="1">单价起</el-radio>
                    <el-radio :label="2">单价</el-radio>
                  </el-radio-group>
                </div>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-card>

      <!-- 进度流程 -->
      <el-card class="top-margin-10 padding-0">
        <div style="display: flex">
          <span style="color: #FFA96A; font-weight: bold;">|</span>
          <span class="left-margin-10" style="color: #263B45;">进度流程（必填）</span>

          <span class="addProcess" title="新增流程" v-if="check && ruleForm.orderType == 4" @click="addProcess"><i
            class="el-icon-plus"></i></span>
        </div>
        <div>
          <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"></div>
          <div class="flowCont" v-for="(list,index) in addFlowList">
            <div style="display: flex;align-items: center;margin-top:15px;">
              <el-select v-if="check" v-model="list.flowId" placeholder="请选择流程" @change="flowChange(list)" size="small"
                         clearable style="width: 250px;">
                <el-option
                  v-for="item in flowList"
                  :key="item.flowId"
                  :label="item.flowName"
                  :value="item.flowId">
                </el-option>
              </el-select>
              <p v-else>流程名称：{{list.flowName}}</p>
              <i v-if="ruleForm.orderType == 4 && check" class="el-icon-delete-solid" @click="deleteFLow(index)"
                 style="color:#F56C6C;margin-left: 10px;cursor: pointer"></i>
            </div>
            <el-table
              v-if="list.flowBoxList"
              :data="list.flowBoxList"
              border
              :default-expand-all="false">
              <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
              <el-table-column label="环节名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.nodeName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="初审">
                <template slot-scope="scope">
                  <span>{{ scope.row.firstTrial == 1 ? '是' : '否' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="复审">
                <template slot-scope="scope">
                  <span>{{ scope.row.recheck == 1 ? '是' : '否' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="意见">
                <template slot-scope="scope">
                  <span>{{ scope.row.opinion == 1 ? '是' : '否' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="附件">
                <template slot-scope="scope">
                  <span>{{ scope.row.accessory == 1 ? '是' : '否' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="节点描述">
                <template slot-scope="scope">
                  <span>{{ scope.row.nodeDesc }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!--          <div class="top-margin-10" style="height: 28px; line-height: 28px; display: block; margin-left: 2%; text-align: left;" v-if="projectType === '知识产权' || projectType === '财务咨询'">-->
          <!--            <el-radio class="float-left inline-block span-input" v-model="ruleForm.orderType" label="0" :disabled="!check" @change="checkIpr">项目型订单</el-radio>-->
          <!--            <el-radio class="float-left inline-block span-input" v-if="projectType === '知识产权'" v-model="ruleForm.orderType" label="1" :disabled="!check" @change="checkIpr">知识产权型订单</el-radio>-->
          <!--            <el-radio class="float-left inline-block span-input" v-if="projectType === '财务咨询'" v-model="ruleForm.orderType" label="2" :disabled="!check" @change="checkIpr">财务型订单</el-radio>-->
          <!--          </div>-->
          <!--          <div class="top-margin-10">-->
          <!--            <ul class="ul-ul">-->
          <!--              <el-checkbox-group v-model="scheduleState" @change="scheduleChange">-->
          <!--                <el-checkbox v-for="item in stateList" :label="item.dictId" :value="item.dictId" :key="item.dictId" :disabled="item.dictName === '启动' || item.dictName === '结案'">{{item.dictName}}</el-checkbox>-->
          <!--              </el-checkbox-group>-->
          <!--            </ul>-->
          <!--          </div>-->
        </div>
      </el-card>

      <!--   项目详述   -->
      <el-card class="top-margin-10 padding-0">
        <div style="display: flex">
          <span style="color: #FFA96A; font-weight: bold;">|</span>
          <span class="left-margin-10" style="color: #263B45;">项目详述</span>
        </div>
        <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"></div>
        <div class="top-margin-20">
          <Tinymce v-if="check" v-model="ruleForm.projectContent" :height=400 ref="editor"/>
          <p class="editorHtml" v-else v-html="ruleForm.projectContent">{{ruleForm.projectContent}}</p>
        </div>

        <div class="top-margin-20">
          <el-row>
            <el-col span="12">
              <p style="margin-bottom: 10px;">图标：</p>
              <p style="margin-bottom: 10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
              <el-upload
                v-if="check"
                action="#"
                list-type="picture-card"
                :limit="1"
                :file-list="iconFileList"
                :http-request="importApprovalContract"
                :before-upload="uploadBeforeFile"
                :show-file-list="true"
                :on-exceed="handleExceed">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemoveContract(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>

              <p v-if="!check && iconFileList.length != 0">
                <img v-for="img in iconFileList" :src="img.url" alt="" width="100%">
              </p>

            </el-col>
            <el-col span="12">
              <p style="margin-bottom: 10px;">封面图：</p>
              <p style="margin-bottom: 10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
              <el-upload
                v-if="check"
                action="#"
                list-type="picture-card"
                :limit="1"
                :file-list="imgFileList"
                :http-request="importApprovalContractImg"
                :before-upload="uploadBeforeFileImg"
                :show-file-list="true"
                :on-exceed="handleExceedImg">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemoveContractImg(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>

              <p v-if="!check && imgFileList.length != 0">
                <img v-for="img in imgFileList" :src="img.url" alt="" width="100%">
              </p>
            </el-col>
          </el-row>

          <el-dialog class="pic-modal" :visible.sync="imgDialogVisible">
            <div class="pic">
              <img width="100%" :src="dialogImageUrl" alt="">
            </div>
          </el-dialog>
        </div>
      </el-card>

      <el-card class="top-margin-10">
        <div class="center-items">
          <el-button size="large" class="filter-item bg_pale_blue" @click="saveForm" v-if="!id && allowAdd.twoAllow">
            确定
          </el-button>
          <el-button size="large" class="filter-item bg_pale_blue" @click="editSubmit"
                     v-if="id && check && allowUpdate.twoAllow">修改
          </el-button>
          <el-button size="large" class="filter-item bg_pale_blue left-margin-50" @click="cancel">取消</el-button>
        </div>
      </el-card>
    </el-row>

    <el-dialog title="条件字段选择" :visible.sync="fieldVisiable" width="80%" v-dialogDrag>
      <el-table :data="fieldList" border style="width: 100%">
        <el-table-column align="center" label="" width="65">
          <template slot-scope="scope">
            <el-radio v-model="field_id" :label="scope.$index" @change="getFieldIndex(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="字段英文名" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="字段中文名" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.verbose_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="字段类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.fieldType}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 按钮 -->
      <div class="table-button">
        <el-button @click="fieldVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeItem">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="筛选字段选择" :visible.sync="filterFieldVisiable" width="80%" v-dialogDrag>
      <el-table :data="fieldList" border style="width: 100%">
        <el-table-column align="center" label="" width="65">
          <template slot-scope="scope">
            <el-radio v-model="field_id" :label="scope.$index" @change="getFilterFieldIndex(scope.row)">&nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column label="字段英文名" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="字段中文名" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.verbose_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="字段类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.fieldType}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 按钮 -->
      <div class="table-button">
        <el-button @click="filterFieldVisiable=false">取消</el-button>
        <el-button type="primary" @click="changeFilterItem">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {queryAuth} from '@/utils/auth'
  import {save, removeItem, queryAll, update, removeyear} from '@/api/projectManage'
  import {commonDict, commonDictOfRegion, addFileBatch, getFileListWithFileIds,ossFileSystemFileDownload} from '@/api/utils'
  import {flowSelectframe, queryFlowInfoDetails} from '@/api/processManage'
  import Tinymce from '@/components/Tinymce'
  import {uploadFilesOss} from '@/utils/uploadFilesOss'

  import {projectCenterUpload} from '@/utils/uploadPathMethods'

  export default {
    components: {Tinymce},
    props: {},
    data() {
      return {
        id: '',
        field_id: '',
        filterField: '',
        activeName: 'first',
        check: true,
        ruleForm: {
          // channelNumber: '',
          unitPriceBill: null,
          originalPriceBill: null,
          channelCommissioBill: null,
          isOftenApply: 0,
          isOftenProject: 0,
          isPickProject: 0,
          priceType: 0,
          maxBatch:5,
          marketCommissioWay: null,
          // marketCommissio:0,
          // projectCommissioMoneyBill: 0,
          projectCommissioWay: null,
          projectType: null,
          // salesMinimum: 0,
          // unitPrice: 0,
        },
        scheduleState: [],
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        stateList: [],
        type_list: [],
        orderTypeList: [
          {dictId: '0', dictName: '项目型'},
          {dictId: '1', dictName: '知识产权型'},
          {dictId: '2', dictName: '财务型'},
          {dictId: '4', dictName: '项目审计型'},
        ],
        batchNoList: [
          {'label': '未指定', 'value': '0'},
          {'label': '第一批', 'value': '1'},
          {'label': '第二批', 'value': '2'},
          {'label': '第三批', 'value': '3'},
          {'label': '第四批', 'value': '4'},
          {'label': '第五批', 'value': '5'}
        ],
        conditionList: [],
        modelList: [],
        fieldList: [],
        currentFieldData: {},
        fieldVisiable: false,
        filterFieldVisiable: false,
        itemList: [],
        can_edit: queryAuth(this, 'sys-setup/grp-project-mng/edit', ''),
        value3: '',
        chinaRegion: [],
        level: 3,
        parentId: 0,
        projectType: '',
        isOftenApply: '',
        isOftenProject: '',
        flowList: [],
        flowBoxList: [],
        batchShow: false,
        addFlowList: [{}],

        imgDialogVisible: false,
        dialogImageUrl: '',
        iconFileList:[],
        imgFileList:[],

        dynamicTags: [],
        inputVisible: false,
        inputValue: '',

        allowAdd: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:INSERT'),//新增项目
        allowUpdate: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:UPDATE'),//修改项目
        allowDeleteSon: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:PROJECTLIBRARY:MANAGE', 'SYSTEM:PROJECTLIBRARY:DELETE:CHILD'),//删除项目库子项
      }
    },
    filters: {},
    activated() {
      this.getCommonData();
      this.getFlowList();
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        setTimeout(() => {
          this.getDetail();
        }, 200)
      } else {
        // this.getRegionList(this.level,this.parentId)
      }
      if (this.$route.query.check) {
        this.check = false
      }
      // this.getStateList()
    },
    // deactivated() {
    // },
    methods: {
      //获取详情
      getDetail() {
        queryAll({projectId: this.id, page: 0, pageSize: 10}).then(response => {
          if (response.code == 200) {
            this.ruleForm = JSON.parse(JSON.stringify(response.data.data[0]));

            if(this.check && this.ruleForm.projectContent && this.ruleForm.projectContent != ''){
              this.$refs.editor.setContent(this.ruleForm.projectContent)
            }

            if (response.data.data[0].unitPrice != 0 && response.data.data[0].unitPrice <= 1) {
              this.$set(this.ruleForm, 'unitPrice', parseFloat((response.data.data[0].unitPrice * 100).toPrecision(12)))
              this.$set(this.ruleForm, 'unitPriceBill', '1')
            } else {
              this.$set(this.ruleForm, 'unitPriceBill', '0')
            }

            if (response.data.data[0].originalPrice != 0 && response.data.data[0].originalPrice <= 1) {
              this.$set(this.ruleForm, 'originalPrice', parseFloat((response.data.data[0].originalPrice * 100).toPrecision(12)))
              this.$set(this.ruleForm, 'originalPriceBill', '1')
            } else {
              if(response.data.data[0].originalPrice && response.data.data[0].originalPrice != ''){
                this.$set(this.ruleForm, 'originalPriceBill', '0')
              }
            }

            if (response.data.data[0].originalPrice == 0) {
              this.$set(this.ruleForm, 'originalPriceBill', '0')
            }

            if (response.data.data[0].salesMinimum != 0 && response.data.data[0].salesMinimum <= 1) {
              this.$set(this.ruleForm, 'salesMinimum', parseFloat((response.data.data[0].salesMinimum * 100).toPrecision(12)))
              this.$set(this.ruleForm, 'salesMinimumWay', '1')
            } else {
              this.$set(this.ruleForm, 'salesMinimumWay', '0')
            }

            if (response.data.data[0].marketCommissio != 0 && response.data.data[0].marketCommissio <= 1) {
              this.$set(this.ruleForm, 'marketCommissio', parseFloat((response.data.data[0].marketCommissio * 100).toPrecision(12)))
              this.$set(this.ruleForm, 'marketCommissioWay', '1')
            } else {
              this.$set(this.ruleForm, 'marketCommissioWay', '0')
            }

            if (response.data.data[0].projectCommissioMoneyBill <= 1) {
              this.$set(this.ruleForm, 'projectCommissioMoneyBill', parseFloat((response.data.data[0].projectCommissioMoneyBill * 100).toPrecision(12)))
              this.$set(this.ruleForm, 'projectCommissioWay', '1')
            } else {
              this.$set(this.ruleForm, 'projectCommissioWay', '0')
            }

            if (response.data.data[0].channelNumber <= 1) {
              this.$set(this.ruleForm, 'channelNumber', parseFloat((response.data.data[0].channelNumber * 100).toPrecision(12)))
              this.$set(this.ruleForm, 'channelCommissioBill', '1')
            } else {
              this.$set(this.ruleForm, 'channelCommissioBill', '0')
            }

            this.ruleForm.engineerCommissio = JSON.stringify(response.data.data[0].engineerCommissio)
            if(response.data.data[0].priceType){
              this.$set(this.ruleForm, 'priceType', response.data.data[0].priceType)
            }else{
              this.$set(this.ruleForm, 'priceType', 0)
            }
            // this.ruleForm.marketCommissio = JSON.stringify(response.data.data[0].marketCommissio)
            this.ruleForm.channelCommissioBill = JSON.stringify(response.data.data[0].channelCommissioBill);
            if(this.type_list){
              this.type_list.forEach(data => {
                if (response.data.data[0].projectType == data.dictId) {
                  this.ruleForm.projectTypeName = data.dictName;
                  this.projectType = data.dictName
                }
              })
            }

            if (response.data.data[0].isOftenApply == 1) {
              this.isOftenApply = true;
              this.ruleForm.isOftenApply = 1;
            } else {
              this.isOftenApply = false
              this.ruleForm.isOftenApply = 0;
            }

            this.ruleForm.orderType = JSON.stringify(response.data.data[0].orderType);

            // this.checkIpr(this.ruleForm.orderType)

            this.itemList = response.data.data[0].policyProjectAreaVoList;

            if (this.itemList) {
              this.itemList.forEach(val => {
                this.getRegionList(3, 0)
                // if (val.provinceId != '' && val.provinceId != undefined) {
                //   commonDictGetNameByCaChe({dictId: val.provinceId}).then(response => {
                //     val.provinceName = response.data
                //   })
                // }
                if (val.provinceId) {
                  this.getRegionList(2, val.provinceId, val)
                }
                if (val.cityId) {
                  this.getRegionList(1, val.cityId, val)
                }
                if (val.districtId) {
                  this.getRegionList(0, val.districtId, val)
                }

                this.$set(val, 'policyProjectYearDtoList', val.policyProjectYearVoList)
                val.policyProjectYearDtoList.forEach(list => {
                  // list.applyYear = JSON.stringify(list.applyYear)
                  this.$set(list, 'applyYear', JSON.stringify(list.applyYear))
                })
              })
            } else {
              this.getRegionList(this.level, this.parentId)
            }

            if (response.data.data[0].flowId) {
              this.addFlowList = [];
              let flowIds = [];
              flowIds = response.data.data[0].flowId.split(',')
              flowIds.forEach(item => {
                this.flowChange(item)
              })
              // this.flowChange(response.data.data[0].flowId)
            }

            if(response.data.data[0].iconFileId && response.data.data[0].iconFileId != ''){
              setTimeout(()=>{
                this.getFileDetail([response.data.data[0].iconFileId],'icon')
              },300)
            }

            if(response.data.data[0].imgFileId && response.data.data[0].imgFileId != ''){
              setTimeout(()=>{
                this.getFileDetail([response.data.data[0].imgFileId],'img')
              },300)
            }

            if(response.data.data[0].projectAlias && response.data.data[0].projectAlias != ''){
              this.dynamicTags = response.data.data[0].projectAlias.split(',')
            }

          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },
      toEdit() {
        this.check = true
      },
      // 省
      changeProvince(event, data) {
        // data.provinceId = data.province__province_name
        data.cityId = null
        data.districtId = null
        data.townId = null
        data.parentId = event
        data.level = 2;
        this.getRegionList(data.level, data.parentId, data)
      },

      // 市
      changeCity(val, data) {
        data.districtId = null
        data.townId = null
        data.parentId = val
        data.level = 1;
        this.getRegionList(data.level, data.parentId, data)
      },
      // 区县
      changeDistrict(val, data) {
        data.townId = null
        data.parentId = val
        data.level = 0;
        this.getRegionList(data.level, data.parentId, data)
      },
      // 镇
      changeTowns(data) {
        this.$forceUpdate(data)
      },
      // 保存企业基础信息
      saveForm() {
        let flowIds = [];
        if (this.addFlowList != '' && this.addFlowList.length != 0) {
          this.addFlowList.forEach(item => {
            if (item.flowId) {
              flowIds.push(item.flowId)
            }
          })

          this.ruleForm.flowId = flowIds.join(',')
        }
        if (this.ruleForm.maxBatch == '' || this.ruleForm.maxBatch == undefined || this.ruleForm.maxBatch < 0) {
          this.$message.warning('批次数不能为空或负数')
          return;
        }
        // if (this.ruleForm.channelNumber == '' || this.ruleForm.channelNumber == undefined || this.ruleForm.channelNumber == 0) {
        //   this.$message.warning('渠道的金额或比例不能为0和空')
        //   return;
        // }
        if (this.ruleForm.channelCommissioBill == '' || this.ruleForm.channelCommissioBill == undefined) {
          this.$message.warning('请选择渠道提成是金额还是比例')
          return;
        }
        if (this.ruleForm.channelCommissioBill == '1') {
          if (this.ruleForm.channelNumber > 100) {
            this.$message.warning('渠道提成比例不能大于100%')
            return;
          }
        }
        if (this.ruleForm.engineerCommissio == '' || this.ruleForm.engineerCommissio == undefined) {
          this.$message.warning('请选择工程师是否一次性提成')
          return;
        }
        // if (this.ruleForm.marketCommissio === '' || this.ruleForm.marketCommissio === undefined || this.ruleForm.marketCommissio === 0) {
        //   this.$message.warning('市场部提成金额或比例不能为0和空')
        //   return;
        // }
        if (this.ruleForm.marketCommissioWay == '1') {
          if (this.ruleForm.marketCommissio > 100) {
            this.$message.warning('市场部提成比例不能大于100%')
            return;
          }
        }
        if (this.ruleForm.marketCommissioWay == '' || this.ruleForm.marketCommissioWay == undefined) {
          this.$message.warning('请选择市场部提成方式')
          return;
        }
        if (this.ruleForm.projectName == '' || this.ruleForm.projectName == undefined) {
          this.$message.warning('项目名称不能为空')
          return;
        }
        // if (this.ruleForm.projectCommissioMoneyBill == '' || this.ruleForm.projectCommissioMoneyBill == undefined || this.ruleForm.projectCommissioMoneyBill == 0) {
        //   this.$message.warning('项目部提成金额或比例不能为0或空')
        //   return;
        // }
        if (this.ruleForm.projectCommissioWay == '1') {
          if (this.ruleForm.projectCommissioMoneyBill > 100) {
            this.$message.warning('项目部提成比例不能大于100%')
            return;
          }
        }
        if (this.ruleForm.projectCommissioWay == '' || this.ruleForm.projectCommissioWay == undefined) {
          this.$message.warning('请选择项目部提成方式')
          return;
        }
        if (this.ruleForm.projectType == '' || this.ruleForm.projectType == undefined) {
          this.$message.warning('请选择项目分类')
          return;
        }
        if (this.ruleForm.orderType == '' || this.ruleForm.orderType == undefined) {
          this.$message.warning('请选择订单类型')
          return;
        }
        // if (this.ruleForm.salesMinimum == '' || this.ruleForm.salesMinimum == undefined || this.ruleForm.salesMinimum == 0) {
        //   this.$message.warning('销售保底价不能为0或空');
        //   return;
        // }
        if (this.ruleForm.salesMinimumWay == '1') {
          if (this.ruleForm.salesMinimum > 100) {
            this.$message.warning('销售保底价比例不能大于100%');
            return;
          }
        }
        // if (this.ruleForm.unitPrice === '' || this.ruleForm.unitPrice === undefined) {
        //   this.$message.warning('单价不能为空')
        //   return;
        // }
        if (this.ruleForm.unitPriceBill == '1') {
          if (this.ruleForm.unitPrice > 100) {
            this.$message.warning('单价比例不能大于100%');
            return;
          }
        }

        if (this.ruleForm.originalPriceBill == '1') {
          if (this.ruleForm.originalPrice > 100) {
            this.$message.warning('原价比例不能大于100%');
            return;
          }
        }
        // if (this.ruleForm.originalPriceBill == '0') {
        //   if (this.ruleForm.originalPrice === '' || this.ruleForm.originalPrice === undefined  || this.ruleForm.originalPrice == 0) {
        //     this.$message.warning('原价不能为0或空');
        //     return;
        //   }
        // }

        if (this.ruleForm.flowId == '' || this.ruleForm.flowId == undefined) {
          this.$message.warning('请选择进度流程')
          return;
        }
        // if(this.itemList == '' || this.itemList == undefined) {
        //   this.$message.warning('请添加申报地区与金额')
        //   return;
        // }

        if(this.itemList) {
          this.itemList.forEach(item => {
            delete item.policyProjectYearVoList
            delete item.city_list
            delete item.district_list
            delete item.town_list
            if (item.areaLevel == '' || item.areaLevel == undefined) {
              this.$message.warning('请选择级别')
              throw new Error()
            }
            if (item.provinceId == '' || item.provinceId == undefined) {
              this.$message.warning('请选择地区省份')
              throw new Error()
            }
            // if(item.cityId == '' || item.cityId == undefined){
            //   this.$message.warning('请选择地区城市')
            //   throw new Error()
            // }
            // if(item.districtId == '' || item.districtId == undefined){
            //   this.$message.warning('请选择地区县区')
            //   throw new Error()
            // }
            // if(item.townId == '' || item.townId == undefined){
            //   this.$message.warning('请选择地区镇街')
            //   throw new Error()
            // }
            item.policyProjectYearDtoList.forEach((list, i) => {
              if (list.applyYear == '' || list.applyYear == undefined) {
                this.$message.warning('请选择年份')
                throw new Error()
              }
              // if(list.applyBatchNo === '' || list.applyBatchNo === undefined){
              //   this.$message.warning('请选择批次')
              //   throw new Error()
              // }
              if (list.subsidyType === '' || list.subsidyType === undefined) {
                this.$message.warning('请选择补贴类型')
                throw new Error()
              }
              if (list.subsidyType == 0) {
                if (list.subsidyTotal === '' || list.subsidyTotal === undefined) {
                  this.$message.warning('请填写补贴金额')
                  throw new Error()
                }
              } else {
                if (list.realSubsidyPrice === '' || list.realSubsidyPrice === undefined) {
                  this.$message.warning('请填写补贴金额')
                  throw new Error()
                }
              }

              if (this.batchShow == false) {
                if (list.applyBatchNo != '' && list.applyBatchNo != undefined && list.applyBatchNo != 0) {
                  item.policyProjectYearDtoList.forEach((val, index) => {
                    if (i != index) {
                      if (list.applyYear == val.applyYear) {
                        if (list.applyBatchNo == val.applyBatchNo) {
                          this.$message.warning('同年同批次的不能重复')
                          this.batchShow = true
                          throw new Error()
                        }
                      }
                    }
                  })
                }
              } else {
                if (list.applyBatchNo != '' && list.applyBatchNo != undefined && list.applyBatchNo != 0) {
                  item.policyProjectYearDtoList.forEach((val, index) => {
                    if (i != index) {
                      if (list.applyYear == val.applyYear) {
                        if (list.applyBatchNo != val.applyBatchNo) {
                          this.batchShow = false
                        }
                      }
                    }
                  })
                }
              }
            })
          })
        }

        if (this.batchShow == true) {
          return;
        }

        if (this.ruleForm.channelCommissioBill == '1') {
          this.ruleForm.channelNumber = this.ruleForm.channelNumber / 100
        }
        if (this.ruleForm.marketCommissioWay == '1') {
          this.ruleForm.marketCommissio = this.ruleForm.marketCommissio / 100
        }
        if (this.ruleForm.salesMinimumWay == '1') {
          this.ruleForm.salesMinimum = this.ruleForm.salesMinimum / 100
        }
        if (this.ruleForm.unitPriceBill == '1') {
          this.ruleForm.unitPrice = this.ruleForm.unitPrice / 100
        }
        if (this.ruleForm.originalPriceBill == '1') {
          this.ruleForm.originalPrice = this.ruleForm.originalPrice / 100;
        }
        if (this.ruleForm.projectCommissioWay == '1') {
          this.ruleForm.projectCommissioMoneyBill = this.ruleForm.projectCommissioMoneyBill / 100
        }

        this.ruleForm.policyProjectAreaDtoList = this.itemList;
        if(this.dynamicTags.length != 0){
          this.ruleForm.projectAlias = this.dynamicTags.join(',')
        }

        save(this.ruleForm).then(response => {
          if (response.code == 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.ruleForm = {
              channelCommissioBill: null,
              isOftenApply: 0,
              marketCommissioWay: null,
              projectCommissioWay: null,
              projectType: null,
            };
            this.itemList = [];
            this.flowList = [];
            this.flowBoxList = [];
            this.addFlowList = [];
            // this.batchShow = false;
            this.isOftenApply = false;
            this.$store.commit('SET_PROJECT_SCROLL', 0)
            this.$refs.editor.setContent("");
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy/project/list');
          }
        })
      },

      // 编辑提交
      editSubmit() {
        let flowIds = [];
        if (this.addFlowList != '' && this.addFlowList.length != 0) {
          this.addFlowList.forEach(item => {
            flowIds.push(item.flowId)
          })

          this.ruleForm.flowId = flowIds.join(',')
        }

        if (this.id != undefined && this.id != '') {
          this.ruleForm.projectId = this.id
        }

        // if (this.ruleForm.channelNumber == '' || this.ruleForm.channelNumber == undefined || this.ruleForm.channelNumber == 0) {
        //   this.$message.warning('渠道的金额或比例不能为0和空')
        //   return;
        // }
        if (this.ruleForm.channelCommissioBill == '' || this.ruleForm.channelCommissioBill == undefined) {
          this.$message.warning('请选择渠道提成是金额还是比例')
          return;
        }
        if (this.ruleForm.channelCommissioBill == '1') {
          if (this.ruleForm.channelNumber > 100) {
            this.$message.warning('渠道提成比例不能大于100%')
            return;
          }
        }
        if (this.ruleForm.engineerCommissio == '' || this.ruleForm.engineerCommissio == undefined) {
          this.$message.warning('请选择工程师是否一次性提成')
          return;
        }
        // if (this.ruleForm.marketCommissio === '' || this.ruleForm.marketCommissio === undefined || this.ruleForm.marketCommissio === 0) {
        //   this.$message.warning('市场部提成金额或比例不能为0和空')
        //   return;
        // }
        if (this.ruleForm.marketCommissioWay == '1') {
          if (this.ruleForm.marketCommissio > 100) {
            this.$message.warning('市场部提成比例不能大于100%')
            return;
          }
        }
        if (this.ruleForm.marketCommissioWay == '' || this.ruleForm.marketCommissioWay == undefined) {
          this.$message.warning('请选择市场部提成方式')
          return;
        }
        if (this.ruleForm.projectName == '' || this.ruleForm.projectName == undefined) {
          this.$message.warning('项目名称不能为空')
          return;
        }
        // if (this.ruleForm.projectCommissioMoneyBill == '' || this.ruleForm.projectCommissioMoneyBill == undefined || this.ruleForm.projectCommissioMoneyBill == 0) {
        //   this.$message.warning('项目部提成金额或比例不能为0或空')
        //   return;
        // }
        if (this.ruleForm.projectCommissioWay == '1') {
          if (this.ruleForm.projectCommissioMoneyBill > 100) {
            this.$message.warning('项目部提成比例不能大于100%')
            return;
          }
        }
        if (this.ruleForm.projectCommissioWay == '' || this.ruleForm.projectCommissioWay == undefined) {
          this.$message.warning('请选择项目部提成方式')
          return;
        }
        if (this.ruleForm.projectType == '' || this.ruleForm.projectType == undefined) {
          this.$message.warning('请选择项目分类')
          return;
        }
        if (this.ruleForm.orderType == '' || this.ruleForm.orderType == undefined) {
          this.$message.warning('请选择订单类型')
          return;
        }
        // if (this.ruleForm.salesMinimum == '' || this.ruleForm.salesMinimum == undefined || this.ruleForm.salesMinimum == 0) {
        //   this.$message.warning('销售保底价不能为0或空');
        //   return;
        // }
        if (this.ruleForm.salesMinimumWay == '1') {
          if (this.ruleForm.salesMinimum > 100) {
            this.$message.warning('销售保底价比例不能大于100%');
            return;
          }
        }

        // if (this.ruleForm.unitPrice === '' || this.ruleForm.unitPrice === undefined) {
        //   this.$message.warning('单价不能为空')
        //   return;
        // }
        if (this.ruleForm.unitPriceBill == '1') {
          if (this.ruleForm.unitPrice > 100) {
            this.$message.warning('单价比例不能大于100%');
            return;
          }
        }

        if (this.ruleForm.originalPriceBill == '1') {
          if (this.ruleForm.originalPrice > 100) {
            this.$message.warning('原价比例不能大于100%');
            return;
          }
        }
        // if (this.ruleForm.originalPriceBill == '0') {
        //   if (this.ruleForm.originalPrice === '' || this.ruleForm.originalPrice === undefined  || this.ruleForm.originalPrice == 0) {
        //     this.$message.warning('原价不能为0或空');
        //     return;
        //   }
        // }

        if (this.ruleForm.flowId == '' || this.ruleForm.flowId == undefined) {
          this.$message.warning('请选择进度流程')
          return;
        }
        // if(this.itemList == '' || this.itemList == undefined) {
        //   this.$message.warning('请添加申报地区与金额')
        //   return;
        // }

        if(this.itemList){
          this.itemList.forEach(item => {
            delete item.policyProjectYearVoList
            delete item.city_list
            delete item.district_list
            delete item.town_list
            if (item.areaLevel == '' || item.areaLevel == undefined) {
              this.$message.warning('请选择级别')
              throw new Error()
            }
            item.policyProjectYearDtoList.forEach((list, i) => {
              if (list.applyYear == '' || list.applyYear == undefined) {
                this.$message.warning('请选择年份')
                throw new Error()
              }
              if (list.subsidyType === '' || list.subsidyType === undefined) {
                this.$message.warning('请选择补贴类型')
                throw new Error()
              }

              if (this.batchShow == false) {
                if (list.applyBatchNo != '' && list.applyBatchNo != undefined && list.applyBatchNo != 0) {
                  item.policyProjectYearDtoList.forEach((val, index) => {
                    if (i != index) {
                      if (list.applyYear == val.applyYear) {
                        if (list.applyBatchNo == val.applyBatchNo) {
                          this.$message.warning('同年同批次的不能重复')
                          this.batchShow = true
                          throw new Error()
                        }
                      }
                    }
                  })
                }
              } else {
                if (list.applyBatchNo != '' && list.applyBatchNo != undefined && list.applyBatchNo != 0) {
                  item.policyProjectYearDtoList.forEach((val, index) => {
                    if (i != index) {
                      if (list.applyYear == val.applyYear) {
                        if (list.applyBatchNo != val.applyBatchNo) {
                          this.batchShow = false
                        }
                      }
                    }
                  })
                }
              }
            })
          })
        }else{
          this.itemList = [];
        }

        if (this.batchShow == true) {
          return;
        }

        if (this.ruleForm.channelCommissioBill == '1') {
          this.ruleForm.channelNumber = this.ruleForm.channelNumber / 100;
        }
        if (this.ruleForm.marketCommissioWay == '1') {
          this.ruleForm.marketCommissio = this.ruleForm.marketCommissio / 100;
        }
        if (this.ruleForm.salesMinimumWay == '1') {
          this.ruleForm.salesMinimum = this.ruleForm.salesMinimum / 100;
        }
        if (this.ruleForm.unitPriceBill == '1') {
          this.ruleForm.unitPrice = this.ruleForm.unitPrice / 100;
        }
        if (this.ruleForm.originalPriceBill == '1') {
          this.ruleForm.originalPrice = this.ruleForm.originalPrice / 100;
        }
        if (this.ruleForm.projectCommissioWay == '1') {
          this.ruleForm.projectCommissioMoneyBill = this.ruleForm.projectCommissioMoneyBill / 100;
        }

        this.ruleForm.policyProjectAreaDtoList = this.itemList

        delete this.ruleForm.policyProjectAreaVoList;

        if(this.dynamicTags.length != 0){
          this.ruleForm.projectAlias = this.dynamicTags.join(',')
        }

        console.log('update', this.itemList)
        console.log('update', this.ruleForm)
        update(this.ruleForm).then(response => {
          if (response.code == 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })

            this.ruleForm = {
              channelCommissioBill: null,
              isOftenApply: 0,
              marketCommissioWay: null,
              projectCommissioWay: null,
              projectType: null,
            };
            this.itemList = [];
            this.flowList = [];
            this.flowBoxList = [];
            this.addFlowList = [];
            this.batchShow = false;
            this.isOftenApply = false;
            // this.$refs.editor.setContent("");
            // this.$store.commit('SET_PROJECT_SCROLL', 0)
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy/project/list');
          }
        })
      },

      // 取消
      cancel() {
        this.ruleForm = {
          channelCommissioBill: null,
          isOftenApply: 0,
          marketCommissioWay: null,
          projectCommissioWay: null,
          projectType: null,
        };
        this.itemList = [];
        this.flowList = [];
        this.flowBoxList = [];
        this.batchShow = false;
        this.isOftenApply = false;
        if(this.$refs.editor){
          this.$refs.editor.setContent("");
        }

        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy/project/list');
        // this.closeFormPath('查看项目')
      },
      // 新增一条地区补贴记录
      addProjectItem() {
        var project_item = {
          policyProjectYearDtoList: [{}]
        }
        this.itemList.push(project_item)
        this.getRegionList(this.level, this.parentId)
      },
      // 删除
      delProjectItem(index) {
        this.itemList.splice(index, 1)
      },
      // 新增一条条件补贴记录
      addConditionItem() {
        var condition_item = {
          appLabelName: '',
          modelName: '',
          fieldZhName: '',
          judgeCondition: 0,
          conditionValue: '',
          fieldType: '',
          filterFieldZhName: '',
          filterValue: ''
        }
        this.conditionList.push(condition_item)
      },
      // 删除补贴记录
      delConditionItem(index) {
        this.conditionList.splice(index, 1)
      },
      // 修改模块名
      changeAppName(index) {
        this.conditionList[index].modelName = ''
      },
      // 获取文件信息
      getFieldIndex(data) {
        this.fieldName = data.name
        this.fieldZhName = data.verbose_name
        this.fieldType = data.fieldType
      },
      // 确定选择文件
      changeItem() {
        this.currentFieldData.fieldName = this.fieldName
        this.currentFieldData.fieldZhName = this.fieldZhName
        this.currentFieldData.fieldType = this.fieldType
        this.currentFieldData.fieldType = this.fieldType
        this.field_id = ''
        this.fieldVisiable = false
      },
      // 根据表名获取筛选字段
      handleFilterSearch(data) {
        this.filterFieldVisiable = true
        this.currentFieldData = data
        // modelGetField({ apps_id: data.app_label_name, model_class: data.model_name }).then(res => {
        //   if (res.data.code === 1) {
        //     this.fieldList = res.data.field_list
        //   }
        // })
      },
      // 表格选择
      getFilterFieldIndex(data) {
        this.filterField = data.name
        this.filterFieldZhName = data.verbose_name
      },
      // 筛选字段选择确定
      changeFilterItem() {
        this.currentFieldData.filterField = this.filterField
        this.currentFieldData.filterFieldZhName = this.filterFieldZhName
        this.filterFieldVisiable = false
      },

      // 申报地区与金额 - 增加年份
      addYear(data) {
        const obj = {}
        data.policyProjectYearDtoList.push(obj)
      },

      // 申报地区与金额 - 删除年份
      delYear(data, child, index, num) {
        if (this.id != undefined && this.id != '' && data.areaId && child.yearId) {
          this.$confirm('您确定删除吗？').then(_ => {
            removeyear({yearId: child.yearId}).then(res => {
              if (res.code == 200) {
                data.policyProjectYearDtoList.splice(num, 1)
                this.$message({type: 'success', message: '删除成功'});
                if (data.policyProjectYearDtoList.length === 0) {
                  removeItem({areaId: data.areaId}).then(res => {
                    if (res.code == 200) {
                      this.itemList.splice(index, 1)
                    } else {
                      this.$message({type: 'error', message: res.message});
                    }
                  })
                }
              } else {
                this.$message({type: 'error', message: res.message});
              }
            })
          })
        } else {
          data.policyProjectYearDtoList.splice(num, 1)
          if (data.policyProjectYearDtoList.length === 0) {
            this.itemList.splice(index, 1)
          }
        }

      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PROCESS_FLOW_PROJECT,DICT:PROJECT_TYPE',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.stateList = res.data['DICT:PROCESS_FLOW_PROJECT']
            this.type_list = res.data['DICT:PROJECT_TYPE']
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取地区信息
      getRegionList(level, parent, item) {
        let params = {
          level: level,
          parentId: parent
        }
        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (level == 3) {
              this.province_list = res.data
            }
            if (level == 2) {
              this.$set(item, 'city_list', res.data)
            }
            if (level == 1) {
              this.$set(item, 'district_list', res.data)
            }
            if (level == 0) {
              this.$set(item, 'town_list', res.data)
            }

          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      typeChange(e) {
        this.projectType = '';
        this.scheduleState = [];
        this.getCommonData();
        this.addFlowList = [{}]
        this.type_list.forEach(item => {
          if (e == item.dictId) {
            this.projectType = item.dictName
          }
        })
      },

      applyChange(e) {
        if (e == true) {
          this.ruleForm.isOftenApply = 1;
        } else {
          this.ruleForm.isOftenApply = 0;
        }
      },

      projectChange(e) {
        if (e == true) {
          this.$set(this.ruleForm, 'isOftenProject', 1)
        } else {
          this.$set(this.ruleForm, 'isOftenProject', 0)
        }
      },

      /**
       * 是否精选项目
       * @param e
       */
      isPickProjectChange(e){
        if (e == true) {
          this.$set(this.ruleForm, 'isPickProject', 1)
        } else {
          this.$set(this.ruleForm, 'isPickProject', 0)
        }
      },

      scheduleChange(e) {
        this.ruleForm.scheduleState = '';
        let arr = '';
        e.forEach(item => {
          arr += item + ',';
        })
        if (arr.length > 0) {
          arr = arr.substr(0, arr.length - 1)
        }

        this.ruleForm.scheduleState = JSON.parse(JSON.stringify(arr))
      },

      checkIpr(e) {
        let keyList = '';
        if (e == 0) {
          keyList = 'DICT:PROCESS_FLOW_PROJECT'
        }
        if (e == 1) {
          keyList = 'DICT:INTELLECTUAL_PROPERTY_TYPE'
        }
        if (e == 2) {
          keyList = 'DICT:PROCESS_FLOW_FINANCE'
        }
        var params = {
          keyList: keyList,
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.stateList = res.data[keyList]
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取流程列表
      getFlowList() {
        flowSelectframe().then(res => {
          if (res.code == 200) {
            this.flowList = res.data;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据流程id或者流程节点
      flowChange(item) {
        if (item.flowId) {
          let params = {
            page: 0,
            pageSize: 10,
            flowId: item.flowId
          }
          queryFlowInfoDetails(params).then(res => {
            if (res.code == 200) {
              // this.flowBoxList = res.data.nodeVoList;
              this.$set(item, 'flowBoxList', res.data.nodeVoList)
              // item.flowBoxList = res.data.nodeVoList;
            } else {
              this.$message.warning(res.message)
            }
          })
        } else if (item && !item.flowBoxList) {
          let flowBox = {
            flowId: item
          }
          let params = {
            page: 0,
            pageSize: 10,
            flowId: item
          }
          queryFlowInfoDetails(params).then(res => {
            if (res.code == 200) {
              // this.flowBoxList = res.data.nodeVoList;
              flowBox.flowName = res.data.flowName
              this.$set(flowBox, 'flowBoxList', res.data.nodeVoList)

              this.addFlowList.push(flowBox)
              // item.flowBoxList = res.data.nodeVoList;
            } else {
              this.$message.warning(res.message)
            }
          })
        }
      },

      //添加流程
      addProcess() {
        this.addFlowList.push({})
      },

      //删除流程
      deleteFLow(index) {
        this.addFlowList.splice(index, 1)
      },

      /*
        * 图标上传
        * handleExceed  上传后限制
        * uploadBeforeFile 上传文件
        * handleRemoveContract  移除文件
        * importApprovalContract  上传文件
        * handlePictureCardPreview  打开缩略图
       */
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`)
      },

      //上传文件之前
      uploadBeforeFile(file) {
        // const isLt2M = file.size / 1024 / 1024 < 100
        // if (!isLt2M) {
        //   this.$message.error('上传文件大小不能超过 100MB!')
        // }
        //
        // return isLt2M;
      },

      handleRemoveContract(file, filelist) {
        this.iconFileList = [];
        // this.ruleForm.iconFileId = '';
        this.$delete(this.ruleForm, 'iconFileId')
      },

      importApprovalContract(file) {
        if(this.ruleForm.projectName == '' || this.ruleForm.projectName == undefined){
          this.$message('请先填写项目名称');
          this.iconFileList = JSON.parse(JSON.stringify(this.iconFileList))
          return;
        }
        if (file.file.name.length >= 150) {
          this.$message('文件名称超长，请检查');
          this.iconFileList = JSON.parse(JSON.stringify(this.iconFileList))
          return;
        }

        let fileSize = file.file.size / 1024
        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.iconFileList = JSON.parse(JSON.stringify(this.iconFileList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.iconFileList = JSON.parse(JSON.stringify(this.iconFileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = file.file.name.lastIndexOf(".")
        let fileName = file.file.name.substring(0,index);
        let fileType = file.file.name.substring(index+1,file.file.name.length);
        let filePath = projectCenterUpload(this.ruleForm.projectName,'图标', fileName) + '.' + fileType
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
              companyId: this.$store.getters.companyId,
              companyName: this.$store.getters.companyName,
              addFileDtos: FileList,
              haveView: false
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                this.$set(this.ruleForm, 'iconFileId', response.data[0].fileId)
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.iconFileList = JSON.parse(JSON.stringify(this.iconFileList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.iconFileList = JSON.parse(JSON.stringify(this.iconFileList))
          }
        })
      },

      /*
        * 封面图上传
        * handleExceedImg  上传后限制
        * uploadBeforeFileImg 上传文件
        * handleRemoveContractImg  移除文件
        * importApprovalContractImg  上传文件
        * handlePictureCardPreview  打开缩略图
       */
      handleExceedImg(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`)
      },

      //上传文件之前
      uploadBeforeFileImg(file) {
        // const isLt2M = file.size / 1024 / 1024 < 100
        // if (!isLt2M) {
        //   this.$message.error('上传文件大小不能超过 100MB!')
        // }
        //
        // return isLt2M;
      },

      handleRemoveContractImg(file, filelist) {
        this.imgFileList = [];
        // this.ruleForm.imgFileId = '';
        this.$delete(this.ruleForm, 'imgFileId')
      },

      importApprovalContractImg(file) {
        if(this.ruleForm.projectName == '' || this.ruleForm.projectName == undefined){
          this.$message('请先填写项目名称');
          this.imgFileList = JSON.parse(JSON.stringify(this.imgFileList))
          return;
        }
        if (file.file.name.length >= 150) {
          this.$message('文件名称超长，请检查');
          this.imgFileList = JSON.parse(JSON.stringify(this.imgFileList))
          return;
        }

        let fileSize = file.file.size / 1024
        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.imgFileList = JSON.parse(JSON.stringify(this.imgFileList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.imgFileList = JSON.parse(JSON.stringify(this.imgFileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = file.file.name.lastIndexOf(".")
        let fileName = file.file.name.substring(0,index);
        let fileType = file.file.name.substring(index+1,file.file.name.length);
        let filePath = projectCenterUpload(this.ruleForm.projectName,'图标', fileName) + '.' + fileType
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
              companyId: this.$store.getters.companyId,
              companyName: this.$store.getters.companyName,
              addFileDtos: FileList,
              haveView: false
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                this.$set(this.ruleForm, 'imgFileId', response.data[0].fileId)
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.imgFileList = JSON.parse(JSON.stringify(this.imgFileList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.imgFileList = JSON.parse(JSON.stringify(this.imgFileList))
          }
        })
      },

      handlePictureCardPreview(file){
        this.imgDialogVisible = true;
        this.dialogImageUrl = file.url
      },

      //根据文件id获取文件详情
      getFileDetail(fileIds, type) {
        getFileListWithFileIds({fileIds: fileIds, haveView: false}).then(res => {
          if (res.code == 200) {
            // this.$set(item, 'fileList', res.data)
            ossFileSystemFileDownload(res.data[0]).then(response => {
              if (response.code == 200) {
                if(type == 'icon'){
                  this.iconFileList = res.data
                  this.$set(this.iconFileList[0], 'url', response.data)
                }else{
                  this.imgFileList = res.data
                  this.$set(this.imgFileList[0], 'url', response.data)
                }
              }
            })

            // this.$set(item,'fileIds', res.data[0].fileId)
            // this.$set(item,'fileName', res.data[0].fileName)
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //别名
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
  }

  .input-120 {
    width: 120px;
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
    position: relative;
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

  .top-margin-20 {
    margin-top: 20px;
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


  /*--------------*/
  .flex {
    display: flex;
  }

  .flex-align-center {
    display: flex;
    align-items: center;
  }

  .report-list {
    font-size: 14px;
    padding: 10px 0;

    /deep/ .el-card__body {
      padding: 0 20px;
    }

    .list {
      .parent-list {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .child-list {
        display: flex;
        align-items: flex-start;
        margin-left: 42px;

        .child {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        .item {
          margin-right: 30px;
          margin-bottom: 10px;

          /deep/ .el-input__inner {
            height: 28px;
          }

          .year {
            width: 100px;

            /deep/ .el-input__icon {
              line-height: 30px;
            }

            /deep/ .el-input__inner {
              width: 100px;
              padding-right: 0;
            }
          }

          .daterpick {
            width: 140px;

            /deep/ .el-input__icon {
              line-height: 30px;
            }

            /deep/ .el-range-separator {
              /*line-height: 26px;*/
            }

            /deep/ .el-input__inner {
              padding-top: 2px;
            }
          }

          .del {
            margin-top: 6px;
            color: red;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .report-term-list {
    /deep/ .el-card__body {
      padding-top: 5px;
    }
  }

  @media (min-width: 1600px) and (max-width: 1750px) {
    .report-list {
      .child {
        width: 80% !important;
      }
    }
  }

  @media screen and (max-width: 1600px) {
    .report-list {
      .child {
        width: 70% !important;
      }
    }
  }

  @media screen and (max-width: 1440px) {
    .report-list {
      .child {
        width: 70% !important;
      }
    }
  }

  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid !important;
    margin-top: 10px;
  }

  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }

  /deep/ .el-table--border th,
  /deep/ .el-table th {
    background: #2CB1F5 !important;
    color: #fff;
    font-weight: 400;
    border-right: 1px solid rgba(220, 223, 230, 0.21);
    padding: 7px 0;
  }

  /deep/ .el-table__row:nth-child(even) {
    background: rgb(235, 248, 255) !important;
    border: 1px solid rgba(0, 141, 214, 0.26666666666666666);
  }

  /deep/ .el-table--border td {
    border: none;
    box-sizing: border-box;
  }

  /deep/ .el-table--border td:first-child {
    border-right: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table--border td:last-child {
    border-left: rgb(217, 242, 255) 1px solid !important;
  }

  .addProcess {
    background: #2CB1F5;
    color: #fff;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .pic-modal {
    .pic {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 920px;
      max-height: 614px;
      overflow: hidden;

      img {
        width: auto;
        height: 100%;
      }
    }
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
