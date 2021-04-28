<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="headerTop">
        <div class="headerLeft">
          <span class="conditionChoose">回款详情</span>
        </div>
      </div>
      <div class="paymentCont">
        <el-row>
          <el-col :span="12">
            <p class="payName">
              客户名称：
              <span>{{recordForm.crmCompanyName}}</span>
              <img v-if="!isCheck && recordForm.financeRecheck == 0 && recordForm.supervisorRecheck == 0" @click="openEdit" src="../icons/enterprise/contract_edit.png" style="vertical-align:middle; margin-left: 3px;cursor:pointer;"/>
            </p>
          </el-col>
          <el-col :span="12">
            <p class="payName">客户类别：<span>{{recordForm.companyLevelName}}</span></p>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="headerTop">
        <div class="headerLeft">
          <span class="conditionChoose condOring">合同信息</span>
        </div>
      </div>
      <div class="paymentCont">
        <el-row>
          <el-col :span="8">
            <p class="payName">合同编号：<span>{{recordForm.contractCode}}</span></p>
          </el-col>
          <el-col :span="8">
            <p class="payName">创建日期：{{recordForm.createDate}}</p>
          </el-col>
          <el-col :span="8">
            <p class="payName">有效期：{{recordForm.availableYear + '年'}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p class="payName">签订人：<span>{{recordForm.signUserName}}</span></p>
          </el-col>
          <el-col :span="8">
            <p class="payName">签约日期：{{recordForm.signDate}}</p>
          </el-col>
          <el-col :span="8">
            <p class="payName">签约公司：{{recordForm.signCompanyName}}</p>
          </el-col>
        </el-row>
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <p class="payName">年份：2220</p>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <p class="payName">数量：100</p>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="headerTop">
        <div class="headerLeft">
          <span class="conditionChoose condOring">项目信息</span>
        </div>
      </div>
      <div class="paymentCont">
        <el-row>
          <el-col :span="12">
            <p class="payName">项目名称：<span>{{recordForm.projectName}}</span></p>
          </el-col>
          <el-col :span="12">
            <p class="payName">工程师：<span>{{recordForm.engineerUserName}}</span></p>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="6">-->
<!--            <p class="payName">项目类别：<span>客户</span></p>-->
<!--          </el-col>-->
          <el-col :span="6">
            <p class="payName">年份：{{recordForm.year}}</p>
          </el-col>
          <el-col :span="6">
            <p class="payName">批次：
              {{
                recordForm.batch == 0 ? '未指定' :
                recordForm.batch == 1 ? '第一批' :
                recordForm.batch == 2 ? '第二批' :
                recordForm.batch == 3 ? '第三批' :
                recordForm.batch == 4 ? '第四批' :
                recordForm.batch == 5 ? '第五批' : '-'
              }}</p>
          </el-col>
          <el-col :span="6">
            <p class="payName">数量：{{recordForm.applyNum}}</p>
          </el-col>
        </el-row>
        <el-row>
<!--          <el-col :span="6">-->
<!--            <p class="payName">金额/比例：{{recordForm.unitPrice}}</p>-->
<!--          </el-col>-->
          <el-col :span="6">
            <p class="payName">批准金额：</p>
            <p v-if="!isCheck" class="payName">{{recordForm.approvalMoney + '元'}}</p>
            <el-input v-else type="number" size="small" v-model="recordForm.approvalMoney" maxlength="7" oninput="value=value.replace(/[^0-9.]/g,'');" @input.native="inputXz($event,1)">
              <template slot="append">元</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="headerTop">
        <div class="headerLeft">
          <span class="conditionChoose condOring">回款信息</span>
        </div>
      </div>
      <div class="paymentCont">
        <el-row>
          <el-col :span="5">
            <p class="payName">汇款日期：</p>
            <p v-if="!isCheck" class="payName"><span>{{recordForm.paymentDate}}</span></p>
            <el-date-picker
              v-else
              size="small"
              v-model="recordForm.paymentDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5">
            <p class="payName">回款金额/比例：</p>
            <p v-if="!isCheck" class="payName">{{recordForm.paymentAmount + '元'}}</p>
            <el-input v-else size="small" v-model="recordForm.paymentAmount" type="number" maxlength="7" oninput="value=value.replace(/[^0-9.]/g,'');" @input.native="inputXz($event,2)">
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <p class="payName">回款阶段：</p>
            <p v-if="!isCheck" class="payName">
              {{recordForm.paymentType == 0 ? '签约后' : recordForm.paymentType == 1 ? '受理后' : recordForm.paymentType == 2 ? '完成（提交）后': recordForm.paymentType == 3 ? '立项公示后':recordForm.paymentType == 4 ? '拨付后':recordForm.paymentType == 5 ? '验收后':recordForm.paymentType == 6 ? '收到通知书后':'-'}}
            </p>
            <el-select v-else placeholder="回款阶段" clearable v-model="recordForm.paymentType" size="small">
              <el-option-group
                v-for="group in payMethods"
                :key="group.lable"
                :label="group.lable">
                <el-option
                  v-for="item in group.options"
                  :key="item.paymentMode"
                  :label="item.paymentModeName"
                  :value="item.paymentMode">
                </el-option>
              </el-option-group>
            </el-select>
          </el-col>
          <el-col :span="5">
            <p class="payName">财政级别：</p>
            <p class="payName" v-if="!isCheck">
              {{
                recordForm.paymentLevel == 1 ? '国家级' :
                recordForm.paymentLevel == 2 ? '省级' :
                recordForm.paymentLevel == 3 ? '市级' :
                recordForm.paymentLevel == 4 ? '区县级' :
                recordForm.paymentLevel == 5 ? '镇街级' : '-'
              }}
            </p>
            <el-select v-else v-model="recordForm.paymentLevel" placeholder="财政级别" clearable size="small">
              <el-option v-for="item in paymentLevelList" :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <p class="payName">收款人：</p>
            <p class="payName" v-if="!isCheck">{{recordForm.paymentUserName}}</p>
            <el-select v-else v-model="recordForm.paymentUserId" placeholder="收款人" clearable size="small">
              <el-option v-for="item in userList" :key="item.userId"
                         :label="item.userName"
                         :value="item.userId"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <p class="payName">录入日期：{{recordForm.entryDate}}</p>
          </el-col>
<!--          <el-col :span="5">-->
<!--            <p class="payName">提成类型：</p>-->
<!--            <el-radio-group v-model="recordForm.typeMoney" class="radio-type" size="small">-->
<!--              <el-radio :label="1">金额</el-radio>-->
<!--              <el-radio :label="0">比例</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-col>-->
<!--          <el-col :span="5">-->
<!--            <p class="payName">提成：</p>-->
<!--            <el-input type="number" min="0" v-model="recordForm.commission" size="small" @input.native="inputXz($event,3)" oninput="if(value && value>9999999)value=9999999" clearable placeholder="请输入提成">-->
<!--              <template slot="append" v-if="recordForm.typeMoney == 1">元</template>-->
<!--              <template slot="append" v-if="recordForm.typeMoney == 0">%</template>-->
<!--            </el-input>-->
<!--          </el-col>-->
        </el-row>
      </div>
    </el-card>
    <el-card class="box-card">
      <p class="payName" v-if="recordForm.file">
        我是凭证：
        <span style="cursor: pointer" @click="downloadFile(recordForm.file)">{{recordForm.file.fileName}}</span>
      </p>
      <p class="payName" v-if="fileForm.file">
        回款依据：
        <el-image
          style="width: 100px; height: 100px"
          :src="fileForm.fileUrl"
          :preview-src-list="srcList">
        </el-image>
        <span style="cursor: pointer" @click="downloadFile(fileForm.file)">{{fileForm.file.fileName}}</span>
      </p>
      <p>
        <img :src="recordForm.fileUrl" alt="" style="max-width: 100%;margin-top:10px;">
      </p>
    </el-card>

    <div class="btnList">
      <el-button v-if="isCheck && recordForm.recordId && recordForm.financeRecheck == 0 && recordForm.supervisorRecheck == 0" size='small' type="primary" @click="editPayment">提交</el-button>
      <el-button v-if="recordForm.recordId && recordForm.supportRecheck" size='small' type="primary" @click="openRecheck">审核</el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>

    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      v-dialogDrag
    >
      <div style="display: flex">
        <span>上传凭证：</span>
        <el-upload
          :http-request="handleUpload"
          :before-upload="uploadBeforeFile"
          class="image-uploader"
          :file-list="recheckFileList"
          :limit="1"
          :on-exceed="handleExceed"
          action=""
        >
          <el-button type="primary" class="btn export" size="small">上传</el-button>
        </el-upload>
        <p style="margin-top:10px;font-size:12px;color:#ff3f4b;line-height: normal;">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button v-if="recordForm.recordId" size='small' type="info" @click="recheckPayment(2)">不通过</el-button>
        <el-button v-if="recordForm.recordId" size='small' type="primary" @click="recheckPayment(1)">通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { queryPaymentRecord, updatePaymentRecord, updateRecheckPaymentRecord,queryPaymentMode } from '@/api/contractManage'
  import {queryUserComboInfo} from '@/api/customerCenter.js'
  import {addFileBatch,getFileListWithFileIds,ossFileSystemFileDownload} from '@/api/utils.js'
  import { uploadFilesOss } from '@/utils/uploadFilesOss'
  import { projectOrderUpload } from '@/utils/uploadPathMethods'

  export default {
    activated() {
      this.recordForm = {};
      this.isCheck = this.$route.query.isCheck;
      this.recordForm.recordId = this.$route.query.recordId;
      if(this.recordForm.recordId){
        this.getDetail();
      }

      this.getPersonList('业务员,业务主管')
    },
    data(){
      return{
        recordForm:{},
        srcList: [],
        fileForm:{},
        paymentLevelList: [
          {label: '国家级', value: '1'},
          {label: '省级', value: '2'},
          {label: '市级', value: '3'},
          {label: '区县级', value: '4'},
          {label: '镇街级', value: '5'}
        ],
        isCheck:false,
        fileList:[],
        recheckFileList:[],
        dialogVisible:false,
        //回款阶段数据
        payMethods: [],
      }
    },
    methods:{
      //获取详情
      getDetail(){
        queryPaymentRecord({recordId:this.recordForm.recordId}).then(res=>{
          if (res.code == 200) {
            Object.assign(this.recordForm, res.data.crmContractVo, res.data.crmCustomerVo, res.data.orderDetailVo, res.data.paymentRecordVo)
            this.recordForm = JSON.parse(JSON.stringify(this.recordForm))

            if (this.recordForm.basisFileIds && this.recordForm.basisFileIds != '') {
              let fileIds = [this.recordForm.basisFileIds]
              this.getFileDetail(fileIds,1)
            }

            if (this.recordForm.recheckFileIds && this.recordForm.recheckFileIds != '') {
              let fileIds = [this.recordForm.recheckFileIds]
              this.getFileDetail(fileIds,2)
            }

            this.getPaymentData(res.data.paymentRecordVo.orderId)
          }
        })
      },

      //根据文件id获取文件详情
      getFileDetail(fileIds,num) {
        getFileListWithFileIds({fileIds: fileIds, haveView: true}).then(res => {
          if (res.code == 200) {
            if(num == 1){
              this.fileList = res.data.map(item => {
                item.name = item.fileName;
                return item
              });

              setTimeout(()=>{
                this.$set(this.fileForm,'file',res.data[0])
                this.srcList.push(res.data[0].fileUrl)
                this.$set(this.fileForm,'fileIds',res.data[0].fileId)
                this.$set(this.fileForm,'fileName',res.data[0].fileName)
                this.$set(this.fileForm,'fileUrl',res.data[0].fileUrl)
              },300)
            }

            if(num == 2){
              this.recheckFileList = res.data.map(item => {
                item.name = item.fileName;
                return item
              });

              setTimeout(()=>{
                this.$set(this.recordForm,'file',res.data[0])
                this.$set(this.recordForm,'fileIds',res.data[0].fileId)
                this.$set(this.recordForm,'fileName',res.data[0].fileName)
                this.$set(this.recordForm,'fileUrl',res.data[0].fileUrl)
              })
            }
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //下载文件
      downloadFile(file) {
        if (file.filePath) {
          ossFileSystemFileDownload(file).then(res => {
            if (res.code == 200) {
              let url = res.data.replace(/http/,'https')
              window.open(url)
              // this.$message.success('下载成功')
            }
          })
        }
      },

      //根据角色获取人员列表
      getPersonList(name, deptIds) {
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

      //切换编辑
      openEdit(){
        this.isCheck = true
      },

      //编辑提交
      editPayment(){
        if (this.recordForm.typeMoney == 0) {
          if (this.recordForm.commission > 100) {
            this.$message.warning('比例不得大于100%')
            return
          }
          this.recordForm.commission = this.recordForm.commission / 100
        }

        if (this.recordForm.typeMoney == 1) {
          if(this.recordForm.commission >= this.recordForm.paymentAmount){
            this.$message.warning('提成不得大于或等于回款金额')
            return
          }
        }

        updatePaymentRecord(this.recordForm).then(res=>{
          if(res.code == 200){
            this.$message.success('修改成功');
            this.recordForm = {};
            this.fileList = [];
            this.recheckFileList = [];
            this.$store.commit('SET_CONTRACT_SCROLL', 0)
            this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/contract');
          }
        })
      },

      //打开审核弹窗
      openRecheck(){
        this.dialogVisible = true;
      },

      //审核
      recheckPayment(num){
        this.$confirm('你确定审核吗？确定后即可生效', '提示', {
          // distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          // closeOnClickModal: false,
        }).then(() => {
          this.recordForm.recheckResult = num
          updateRecheckPaymentRecord(this.recordForm).then(res=>{
            if(res.code == 200){
              this.$message({type: 'success', message: '审核成功'});
              this.dialogVisible = false
              // this.$store.commit('SET_CONTRACT_SCROLL', 0)
              this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/contract');
            }
          })
        })
      },

      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },

      //上次文件之前
      uploadBeforeFile(file){
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 100
        //
        // if (!isLt2M) {
        //   this.$message.error('上传文件大小不能超过 100MB!')
        // }

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或者png 格式!');
        }

        return isJPG;
      },

      //上传凭证
      handleUpload(option){
        if(!this.recordForm.crmCompanyName || this.planBackForm.crmCompanyName == ''){
          this.$message.error('企业名称为空，请检查');
          this.recheckFileList = JSON.parse(JSON.stringify(this.recheckFileList))
          return;
        }
        if(!this.recordForm.projectName || this.recordForm.projectName == ''){
          this.$message.error('项目名称为空，请检查');
          this.recheckFileList = JSON.parse(JSON.stringify(this.recheckFileList))
          return;
        }
        if(option.file.name.length >= 150){
          this.$message.error('文件名称超长，请检查');
          this.recheckFileList = JSON.parse(JSON.stringify(this.recheckFileList))
          return;
        }

        let fileSize = option.file.size / 1024
        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.recheckFileList = JSON.parse(JSON.stringify(this.recheckFileList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.recheckFileList = JSON.parse(JSON.stringify(this.recheckFileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = projectOrderUpload(this.recordForm.crmCompanyName,this.recordForm.projectName,'其他资料',fileName) + '.' + fileType
        uploadFilesOss(filePath, option.file, option).then(res => {
          if(res){
            let FileList = [];
            let addFile = {
              fileName: option.file.name,
              filePath: filePath,
              fileSize: fileSize,
              fileType: fileType,
              parentType:4
            }
            FileList.push(addFile)
            let params = {
              companyId: this.recordForm.crmCompanyId,
              companyName: this.recordForm.crmCompanyName,
              addFileDtos: FileList,
              haveView: true
            }

            addFileBatch(params).then(response=>{
              if(response.code == 200){
                this.$message.success('上传成功');
                this.$set(this.recordForm,'recheckFileIds',response.data[0].fileId)
                // this.$set(this.recordForm,'fileIds',response.data[0].fileId)
                this.$set(this.recordForm,'fileName',response.data[0].fileName)
                this.$set(this.recordForm,'fileUrl',response.data[0].fileUrl)
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.recheckFileList = JSON.parse(JSON.stringify(this.recheckFileList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.recheckFileList = JSON.parse(JSON.stringify(this.recheckFileList))
          }
        })
      },

      //关闭当前页面，返回上一页
      cancelSub(){
        this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/contract');
      },

      //限制输入 num:1 折扣
      inputXz(e,num){
        if(e.target.value >= 9999999){
          e.target.value = 9999999;
        }

        if (e != '') {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        }

        if(num == 1 && e.target.value && e.target.value != ''){
          this.recordForm.approvalMoney = e.target.value
        }
        if(num == 2 && e.target.value && e.target.value != ''){
          this.recordForm.paymentAmount = e.target.value
        }
        if(num == 3 && e.target.value && e.target.value != ''){
          this.recordForm.commission = e.target.value
        }
      },

      //获取回款阶段数据
      getPaymentData(id) {
        let trueOjb = {};
        trueOjb.options = [];
        let falseOjb = {};
        falseOjb.options = [];
        queryPaymentMode({orderId: id}).then(res => {
          if (res.code === 200) {
            res.data.forEach(item => {
              if (item.paymentModeType) {
                trueOjb.lable = '历史回款阶段';
                trueOjb.options.push(item);
                // this.$set(this.payMethods, 0, trueOjb);
                this.payMethods.push(trueOjb)
              } else {
                falseOjb.lable = '';
                falseOjb.options.push(item);
                // this.$set(this.payMethods, 1, falseOjb);
              }
            });
            this.payMethods.push(falseOjb)
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .box-card{
    margin-bottom: 10px;
  }

  .headerLeft{
    display: flex;
    align-items: center;
    .conditionChoose{
      font-size: 16px;
      color: #444 !important;

      &::before {
        content: '';
        border-left: 2px solid rgb(3, 173, 244);
        margin-right: 15px;
      }
    }
    .condOring{
      &::before {
        content: '';
        border-left: 2px solid #ffa01c;
        margin-right: 15px;
      }
    }
  }

  .payName{
    font-size:14px;
    display: inline-block;
    span{
      color:#69ccff;
      margin-right: 10px;
    }
  }

  .el-row {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    &:last-child {
      margin-bottom: 0;
    }
  }

  /deep/ .el-card__header{
    padding: 12px 13px;
  }

  /deep/ .el-input{
    width: auto;
  }

  /deep/ .el-select{
    display: inline-block !important;
  }

  .btnList{
    text-align: center;
  }
</style>
