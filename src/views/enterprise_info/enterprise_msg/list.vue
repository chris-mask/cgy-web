<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->

    <el-row class="row-width-auto-margin-0-90" style="margin-bottom: 20px;">
      <span>
        <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #03ADF4; font-weight: bold;">|</span>
          <span class="left-margin-10" style="color: #263B45;">基本信息</span>
        </div>
      </el-card>
        <el-card class="rule-form-box">
        <div class="float-left" style="width: 5%; min-width: 90px;">
          <div class="ent_shorthand left-margin-10 padding-20 float-left text-align-center">企业简称</div>
        </div>
        <div class="float-left left-margin-10" style="width: 90%; min-width: 960px; position: relative;">
          <div class="edit-ruleForm" style="width: 100%">
            <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :inline="true">
            <el-row>
              <div class="float-left inline-block width-0-3" style="display: flex;min-width: 30%;width: auto;">
                <span class="font-red">*</span>
                <el-input size="mini" placeholder="输入企业名称"
                          class="float-left company-name inline-block left-margin-5"> </el-input>
              </div>
              <div class="float-left inline-block width-0-3 left-margin-50">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>客户级别：</span>
                <span>
                   <el-select size="mini" placeholder="客户级别"
                              class="register-status float-left inline-block left-margin-5 input-120">
                    <el-option>1</el-option>
                    <el-option>2</el-option>
                    <el-option>3</el-option>
                  </el-select>
                </span>
              </div>
            </el-row>
            <el-row>
              <div
                class="float-left inline-block top-margin-20 width-0-20':'float-left inline-block top-margin-10 width-0-20">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>登记状态：</span>
                <span>
                  <el-select size="mini" placeholder="登记状态"
                             class="register-status float-left inline-block left-margin-5 input-180">
                    <el-option>2</el-option>
                    <el-option>4</el-option>
                    <el-option>5</el-option>
                  </el-select>
                </span>
              </div>
              <!--              float-left inline-block top-margin-10 width-0-20-->
              <div class="float-left inline-block top-margin-20 width-0-20">
                <span class="float-left inline-block span-input">业务员：</span>
                <span class="float-left inline-block left-margin-5 span-input">123</span>
              </div>
              <div class="float-left inline-block top-margin-20 width-0-20">
                <span class="float-left inline-block span-input">项目员：</span>
                <span class="float-left inline-block left-margin-5 span-input">123</span>
              </div>
              <div class="float-left inline-block top-margin-20 width-0-20">
                <span class="float-left inline-block span-input">审计员：</span>
                <span class="float-left inline-block left-margin-5 span-input">123</span>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-3-->
              <div class="float-left inline-block top-margin-20 width-0-3">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>企业简称：</span>
                <el-input size="mini" maxlength="4" show-word-limit placeholder="企业简称"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
              <!--              float-left inline-block top-margin-10 width-0-6 left-margin-50-->
              <div class="float-left inline-block top-margin-20 width-0-6 left-margin-50">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>统一社会会信用代码：</span>
                <el-input size="mini" placeholder="统一社会会信用代码"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-3-->
              <div class="float-left inline-block top-margin-20 width-0-3">
                <span class="float-left inline-block span-input"><span class="font-red"></span>法人代表：</span>
                <el-input size="mini" placeholder="法人代表"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
              <!--              float-left inline-block top-margin-10 width-0-6 left-margin-50-->
              <div class="float-left inline-block top-margin-20 width-0-6 left-margin-50">
                <span class="float-left inline-block span-input"><span class="font-red"></span>官网：</span>
                <el-input size="mini" placeholder="官网"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-3-->
              <div class="float-left inline-block top-margin-20 width-0-3">
                <span class="float-left inline-block span-input"><span class="font-red"></span>联系人1：</span>
                <el-input size="mini" placeholder="联系人1"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
              <!--              float-left inline-block top-margin-10 width-0-3 left-margin-50-->
              <div class="float-left inline-block top-margin-20 width-0-3 left-margin-50">
                <span class="float-left inline-block span-input"><span class="font-red"></span>联系电话1：</span>
                <el-input size="mini" placeholder="联系电话1"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-3-->
              <div class="float-left inline-block top-margin-20 width-0-3">
                <span class="float-left inline-block span-input"><span class="font-red"></span>联系人2：</span>
                <el-input size="mini" placeholder="联系人2"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
              <!--              float-left inline-block top-margin-10 width-0-3 left-margin-50-->
              <div class="float-left inline-block top-margin-20 width-0-3 left-margin-50">
                <span class="float-left inline-block span-input"><span class="font-red"></span>联系电话2：</span>
                <el-input size="mini" placeholder="联系电话2"
                          class="float-left inline-block left-margin-5 input-180"> </el-input>
              </div>
            </el-row>
              <!--            <el-row >-->
              <!--&lt;!&ndash;              float-left inline-block top-margin-10 width-0-3&ndash;&gt;-->
              <!--              <div class="float-left inline-block top-margin-20 width-0-3">-->
              <!--                <span class="float-left inline-block span-input"><span class="font-red"></span>联系人1/联系电话1：</span>-->
              <!--                <span class="float-left inline-block left-margin-5 span-input">666</span>-->
              <!--              </div>-->
              <!--&lt;!&ndash;              float-left inline-block top-margin-10 width-0-3 left-margin-50&ndash;&gt;-->
              <!--              <div class="float-left inline-block top-margin-20 width-0-3 left-margin-50">-->
              <!--                <span class="float-left inline-block span-input"><span class="font-red"></span>联系人2/联系电话2：</span>-->
              <!--                <span class="float-left inline-block left-margin-5 span-input">666</span>-->
              <!--              </div>-->
              <!--            </el-row>-->
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-3-->
              <div class="float-left inline-block top-margin-20 width-0-3">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>成立时间：</span>
                <el-date-picker size="mini" class="float-left inline-block left-margin-5 input-180" type="date"
                                value-format="yyyy-MM-ddThh:mm:ss" placeholder="成立时间"> </el-date-picker>
              </div>
              <!--              float-left inline-block top-margin-10 width-0-3 left-margin-50-->
              <div class="float-left inline-block top-margin-20 width-0-3 left-margin-50">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>年销售额：</span>
                <span>
                  <el-select size="mini" placeholder="年销售额" class="float-left inline-block left-margin-5 input-120">
                    <el-option>6</el-option>
                    <el-option>6</el-option>
                    <el-option>6</el-option>
                  </el-select>
                </span>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-6-->
              <div class="float-left inline-block top-margin-20 width-0-6">
                <span class="float-left inline-block span-input"><span class="font-red"></span>公司地址：</span>
                <span>
                  <el-select size="mini" class="float-left inline-block left-margin-5 input-90" :clearable="true"
                             placeholder="省">
                    <el-option>9</el-option>
                    <el-option>9</el-option>
                    <el-option>9</el-option>
                  </el-select>
                  <el-select size="mini" class="float-left inline-block left-margin-5 input-90" :clearable="true"
                             placeholder="市">
                    <el-option>8</el-option>
                    <el-option>8</el-option>
                    <el-option>8</el-option>
                  </el-select>
                  <el-select size="mini" class="float-left inline-block left-margin-5 input-90" :clearable="true"
                             placeholder="区">
                    <el-option>6</el-option>
                    <el-option>6</el-option>
                    <el-option>6</el-option>
                  </el-select>
                  <el-select size="mini" class="float-left inline-block left-margin-5 input-90" :clearable="true"
                             placeholder="镇">
                    <el-option>5</el-option>
                    <el-option>5</el-option>
                    <el-option>5</el-option>
                  </el-select>
                  <el-input size="mini" placeholder="详细地址"
                            class="float-left inline-block left-margin-5 input-200"> </el-input>
                </span>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-3-->
              <div class="float-left inline-block top-margin-20 width-0-3'">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>注册资本(万元)：</span>
                <el-input size="mini" type="number" placeholder="注册资本"
                          class="float-left inline-block left-margin-5 input-120"> </el-input>
              </div>
              <!--              float-left inline-block top-margin-10 width-0-3 left-margin-50-->
              <div class="float-left inline-block top-margin-20 width-0-3 left-margin-50">
                <span class="float-left inline-block span-input"><span class="font-red"></span>实缴资本(万元)：</span>
                <el-input size="mini" type="number" placeholder="实缴资本"
                          class="float-left inline-block left-margin-5 input-120"> </el-input>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-3-->
              <div class="float-left inline-block top-margin-20 width-0-3">
                <span class="float-left inline-block span-input"><span class="font-red"></span>员工规模：</span>
                <span>
                  <el-select size="mini" placeholder="员工规模" class="float-left inline-block left-margin-5 input-120">
                    <el-option>8</el-option>
                    <el-option>8</el-option>
                    <el-option>8</el-option>
                  </el-select>
                </span>
              </div>
              <!--              <div :class="ent_biz_id !== null?'float-left inline-block top-margin-20 width-0-3 left-margin-50':'float-left inline-block top-margin-10 width-0-3 left-margin-50'">-->
              <!--                <span class="float-left inline-block span-input"><span class="font-red"></span>参保人数：</span>-->
              <!--                <el-input size="mini" v-if="check" type="number" v-model="ruleForm.join_Insurance_num" placeholder="参保人数" class="float-left inline-block left-margin-5 input-120"> </el-input>-->
              <!--                <span v-else class="float-left inline-block left-margin-5 span-input">{{ruleForm.join_Insurance_num}} 人</span>-->
              <!--              </div>-->
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-6-->
              <div class="float-left inline-block top-margin-20 width-0-6">
                <span class="float-left inline-block span-input"><span class="font-red"></span>所属行业：</span>
                <span>
                <el-select size="mini" placeholder="所属行业"
                           class="input-color-blue float-left inline-block left-margin-5 input-360">
                  <el-option>77</el-option>
                  <el-option>77</el-option>
                  <el-option>77</el-option>
                </el-select>
                </span>
              </div>

            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-6-->
              <div class="float-left inline-block top-margin-20 width-0-6">
                <span class="float-left inline-block span-input"><span class="font-red">*</span>主营产品：</span>
                <el-input size="mini" placeholder="主营产品"
                          class="input-color-blue float-left inline-block left-margin-5 input-360"> </el-input>
              </div>
            </el-row>
            <el-row>
<!--              float-left inline-block top-margin-10 width-0-6-->
              <div class="float-left inline-block top-margin-20 width-0-6">
                <span class="float-left inline-block span-input"><span class="font-red"></span>经营范围：</span>
                <el-input type="textarea" placeholder="经营范围"
                          class="float-left inline-block left-margin-5 input-460"> </el-input>
              </div>
            </el-row>
          </el-form>
          </div>
          <div style="width: 200px; height: 100px; position:absolute; top: 20px; right: 50px; z-index: 1000">
<!--            <img src="../icons/enterprise/sea_customer.png"/>-->
          </div>
        </div>
      </el-card>
      </span>

      <el-card class="top-margin-10">
        <div class="center-items">
          <el-button size="large" class="filter-item bg_pale_blue">确定</el-button>
          <el-button size="large" class="filter-item bg_pale_blue left-margin-50">取消</el-button>
        </div>
      </el-card>
    </el-row>
  </div>

</template>

<script>
  export default {
    data() {
      return {}
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

  .ul-li {
    list-style-type: none;
    width: 13%;
    text-align: left;
  }

  .ul-li-left-margin {
    margin-left: 2%;
  }

  .width-0-20 {
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

  .input-120 {
    width: 120px;
  }

  .input-180 {
    width: 180px;
  }

  .input-200 {
    width: 200px;
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

  .font-red {
    color: red;
    width: 8px;
    display: inline-block;
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
    cursor: pointer;
    color: #3a8ee6;
  }

  .top-margin-10 {
    margin-top: 10px;
  }

  .top-margin-20 {
    margin-top: 20px;
  }

  .left-margin-5 {
    margin-left: 5px;
  }

  .left-margin-10 {
    margin-left: 10px;
  }

  .bottom-margin-10 {
    margin-bottom: 10px;
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

  .left-margin-30 {
    margin-left: 30px;
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

  .bg_pale_purple {
    background: rgb(88, 131, 255);
    color: rgb(255, 255, 255);

    &:hover {
      background: rgba(88, 131, 255, .5);
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

  .ent_shorthand {
    width: 78px;
    height: 78px;
    border-radius: 4px;
    font-size: 18px;
    color: #f0f7ff;
    background: rgba(155, 181, 255, 1);

    &:hover {
      background: rgba(155, 181, 255, .5);
    }
  }

  .line-height-20 {
    height: 20px;
    line-height: 20px;
  }

  .width-0-7 {
    width: 7%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-8 {
    width: 8%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-10 {
    width: 10%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-12 {
    width: 12%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-15 {
    width: 15%;
    min-height: 18px;
    font-size: 12px;
    line-height: 18px;
  }

  .width-0-18 {
    width: 18%;
    min-height: 18px;
    line-height: 18px;
    font-size: 12px;
  }

  .width-0-20 {
    width: 20%;
    min-height: 18px;
    line-height: 18px;
    font-size: 12px;
  }

  .width-0-25 {
    width: 25%;
    min-height: 18px;
    line-height: 18px;
  }

  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding: 20px;
    margin-bottom: 20px;

    /deep/ .el-dialog__title {
      color: #fff;
      font-size: 16px;
    }

    /deep/ .el-dialog__headerbtn {
      border-radius: 50%;
      background: #fff;
      padding: 4px;
      font-size: 12px;
      font-weight: 400;

      /deep/ .el-dialog__close {
        color: #05AAFF;
      }
    }
  }

  /deep/ .el-dialog__footer {
    text-align: center;

    /deep/ .el-button {
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }

  /*-----------------------*/
  .rule-form-box {
    /deep/ .el-card__body {
      display: flex;

      .edit-ruleForm {
        /deep/ .el-input__inner {
          border: 0;
          border-radius: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);
        }

        .company-name {
          font-size: 18px;

          /deep/ .el-input__inner {
            color: #444;
            font-weight: bold;
            padding: 0;
          }
        }

        .register-status {
          width: 70px;

          /deep/ .el-input__inner {
            border-bottom: 0;
            color: #05AAFF;
          }
        }

        .input-color-blue {
          /deep/ .el-input__inner {
            color: #05AAFF;
          }
        }
      }
    }
  }

</style>
