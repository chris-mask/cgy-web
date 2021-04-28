<!--立项详情-->
<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-form ref="approvalForm" :model="approvalForm" :rules="rules" >
        <el-card class="box-card">
          <div slot="header" class="headerTop">
            <p class="publicTit">{{isEdit?'立项编辑':'立项公示详情'}}</p>
          </div>
          <div class="form-control">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称：" prop="companyName">
                  <el-input size="small" v-model="approvalForm.companyName" clearable v-if="isShow"></el-input>
                  <span style="cursor: pointer;" @click="goCompanyDatail" v-else>{{approvalForm.companyName ? approvalForm.companyName : '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="项目名称：" prop="projectName">
                  <el-input size="small" v-model="approvalForm.projectName" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.projectName ? approvalForm.projectName : '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="相关政策：" prop="noticeName">
                  <el-input size="small" v-model="approvalForm.noticeName" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.noticeName ? approvalForm.noticeName : '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="headerTop">
            <p class="publicTit">基本信息</p>
          </div>
          <div class="form-control">
            <el-row>
              <el-col :span="8">
                <el-form-item label="签约公司：" prop="signCompanyName">
                  <el-input size="small" v-model="approvalForm.signCompanyName" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.signCompanyName ? approvalForm.signCompanyName : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签订人：" prop="signUserName">
                  <el-input size="small" v-model="approvalForm.signUserName" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.signUserName ? approvalForm.signUserName : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签订日期：" prop="signDate">
                  <el-input size="small" v-model="approvalForm.signDate" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.signDate ? approvalForm.signDate : '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目工程师：" prop="engineerUserName">
                  <el-input size="small" v-model="approvalForm.engineerUserName" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.engineerUserName ? approvalForm.engineerUserName : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="财务审计人员：" prop="auditUserName">
                  <el-input size="small" v-model="approvalForm.auditUserName" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.auditUserName ? approvalForm.auditUserName : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否渠道合同：" prop="isChannel">
                  <el-input size="small" v-model="approvalForm.isChannel" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.isChannel == 0 ? '不是' : approvalForm.isChannel == 1 ? '是' : '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="渠道名称：" prop="channelName">
                  <el-input size="small" v-model="approvalForm.channelName" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.channelName ? approvalForm.channelName : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="通过数量：">
                  <el-input size="small" type="number" v-model="approvalForm.projectNum" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.projectNum ? approvalForm.projectNum : 1}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="扶持金额：" prop="subsidyTotal">
                  <el-input size="small" v-model="approvalForm.subsidyTotal" clearable v-if="isShow"></el-input>
                  <span v-else>{{approvalForm.subsidyTotal ? approvalForm.subsidyTotal : '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="headerTop">
            <p class="publicTit">立项信息</p>
          </div>
          <div class="form-control">
            <el-row>
              <el-col :span="8">
                <el-form-item label="立项日期：" prop="approvalDate">
                  <el-date-picker
                    size="small"
                    v-model="approvalForm.approvalDate"
                    type="date"
                    placeholder="选择日期"
                    v-if="isShow||isEdit"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                  <span v-else>{{approvalForm.approvalDate ? approvalForm.approvalDate : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年份：" prop="year">
                  <el-date-picker
                    size="small"
                    v-model="approvalForm.year"
                    type="year"
                    placeholder="选择年份"
                    v-if="isShow || isEdit"
                    value-format="yyyy"
                  >
                  </el-date-picker>
                  <span v-else>{{approvalForm.year ? approvalForm.year : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公示结果：" prop="approvalResult">
                  <el-select size="small" v-model="approvalForm.approvalResult" v-if="isShow||isEdit">
                    <el-option :label="'通过'" :value="1"></el-option>
                    <el-option :label="'不通过'" :value="0"></el-option>
                  </el-select>
                  <!--                  <el-input size="small" v-model="approvalForm.approvalResult" clearable v-if="isShow||isEdit"></el-input>-->

                  <span v-else>{{approvalResult == 0 ? '不通过' : approvalResult == 1 ? '通过' : '-' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="批次：" prop="projectBatchNo">
                  <el-select size="small" v-model="approvalForm.projectBatchNo" v-if="isShow||isEdit">
                    <el-option
                      v-for="item in projectBatchNoList"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    />
                  </el-select>

                  <span v-else>
                    <span v-if="approvalForm.projectBatchNo == 0">未指定</span>
                    <span v-else-if="approvalForm.projectBatchNo > 0">第{{approvalForm.projectBatchNo }}批</span>
                    <span v-else>-</span>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数量：" prop="applyNum">
                  <el-input maxlength="8" oninput="value=value.replace(/[^0-9]/g,'')" size="small" v-model="approvalForm.applyNum" clearable v-if="isShow||isEdit" style="width: auto;"></el-input>
                  <span v-else>{{approvalForm.applyNum ? approvalForm.applyNum : 1}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="批准金额：" prop="approvalMoney">
                  <el-input maxlength="8" size="small" oninput="value=value.replace(/[^0-9]/g,'')" v-model="approvalForm.approvalMoney" clearable v-if="isShow||isEdit" style="width: auto;"></el-input>
                  <span v-else>{{approvalForm.approvalMoney > 99999999 ? approvalForm.approvalMoney / 100000000 + '亿' : approvalForm.approvalMoney ? approvalForm.approvalMoney / 10000 + '万元' :  '-'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" v-if="!approvalForm.titleSeriesName">
                <el-form-item label="级别：" prop="projectLevel">
                  <el-select size="small"  v-model="approvalForm.projectLevel" v-if="isShow || isEdit">
                    <el-option
                      v-for="item in projectLevelList"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    />
                  </el-select>
                  <span v-else>{{approvalForm.projectLevel == 1 ? '国家级' : approvalForm.projectLevel == 2 ? '省级' : approvalForm.projectLevel == 3 ? '市级' : approvalForm.projectLevel == 4 ? '区县级' : approvalForm.projectLevel == 5 ? '镇街级' : '-'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="approvalForm.titleSeriesName">
                <el-form-item label="职称专业：" prop="projectLevel">
                  <span>{{approvalForm.titleMajor }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="approvalForm.titleSeriesName">
                <el-form-item label="职称系列：" prop="projectLevel">
                  <span>{{approvalForm.titleSeriesName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="approvalForm.titleSeriesName">
                <el-form-item label="职称级别：" prop="projectLevel">
                  <span>{{approvalForm.titleLevelName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <div class="btnList">
          <el-button size='small' type="primary" v-if="!approvalId && isShow">确定</el-button>
          <el-button size='small' type="primary" @click="editHandle" v-if="isEdit">修改</el-button>
<!--          <el-button size='small' type="primary" @click="editResult('approvalForm')" v-if="approvalId && !isShow">修改</el-button>-->
          <el-button size='small' @click="cancelSub">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {queryApprovalDetail,updatePolicyApproval} from '@/api/approval'

  export default {
    data(){
      return{
        approvalForm:{},
        approvalId: '',
        projectId: '',
        isShow: false,
        isEdit:false,

        projectBatchNoList:[
          {value:'0',label:'未指定'},
          {value:'1',label:'第1批'},
          {value:'2',label:'第2批'},
          {value:'3',label:'第3批'},
          {value:'4',label:'第4批'},
          {value:'5',label:'第5批'},
          {value:'6',label:'第6批'},
          {value:'7',label:'第7批'},
          {value:'8',label:'第8批'},
          {value:'9',label:'第9批'},
          {value:'10',label:'第10批'},
          {value:'11',label:'第11批'},
        ],
        projectLevelList:[
          {value:'1',label:'国家级'},
          {value:'2',label:'省级'},
          {value:'3',label:'市级'},
          {value:'4',label:'区县级'},
          {value:'5',label:'镇街级'}
        ]
      }
    },
    activated() {
      this.approvalId = this.$route.query.approvalId;
      this.projectId = this.$route.query.projectId;
      this.isShow = this.$route.query.isShow;
      this.isEdit = this.$route.query.isEdit
      if(this.approvalId){
        this.getDetail();
      }
    },
    methods:{
      //获取详情
      getDetail(){
        queryApprovalDetail({approvalId: this.approvalId,page:0,pageSize:10}).then(res=>{
          if(res.code == 200){
            this.approvalForm = res.data;
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //编辑立项
      editHandle(){
        this.approvalForm.projectYear = this.approvalForm.year;
        this.$delete(this.approvalForm, 'year');
        updatePolicyApproval(this.approvalForm).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功');
            // this.$store.commit('SET_APPROVAL_SCROLL', 0)
            this.cancelSub();
          }
        })
      },
      // 返回
      cancelSub() {
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route,'/approvalCollaborative');
      },

      //跳转到企业信息
      goCompanyDatail() {
        this.$router.push({'path': '/customer/editCustomer', 'query': {'id': this.approvalForm.companyId, 'check': true}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 4%;
  }

  /deep/ .el-card{
    margin-bottom: 20px;
  }

  /deep/ .el-form-item {
    display: flex;
    margin-bottom: 20px;
    margin-right: 30px;
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
    min-width: 110px;
  }

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }

  .publicTit{
    font-size: 16px;
    border-left: 2px solid #05AAFF;
    padding-left: 10px;
  }
</style>
