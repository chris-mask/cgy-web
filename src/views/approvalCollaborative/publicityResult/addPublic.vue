<!--公示详情-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="headerTop">
        <p class="publicTit">公示结果详情</p>
      </div>
      <div class="form-control">
        <el-form ref="publicForm" :model="publicForm" :rules="rules" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="公示标题：" prop="projectName">
                <el-input size="small" v-model.trim="publicForm.projectName" maxlength="100" clearable v-if="!isShow"></el-input>
                <span v-else>{{publicForm.projectName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主管部门：" prop="publicityOrgan">
                <el-input size="small" v-model.trim="publicForm.publicityOrgan" maxlength="100" clearable v-if="!isShow"></el-input>
                <span v-else>{{publicForm.publicityOrgan}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公示状态：" prop="publicityState">
                <el-select v-if="!isShow" v-model="publicForm.publicityState" placeholder="请选择公示状态" size="small" clearable>
                  <el-option
                    :key="0"
                    label="公示中"
                    :value="0">
                  </el-option>
                  <el-option
                    :key="1"
                    label="公示结束"
                    :value="1">
                  </el-option>
                </el-select>
                <span v-else>{{publicForm.publicityState == 0 ? '公示中' : '公示结束'}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年份：" prop="projectYear">
                <el-date-picker
                  v-if="!isShow"
                  size="small"
                  v-model="publicForm.projectYear"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年份">
                </el-date-picker>
                <span v-else>{{publicForm.projectYear}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="地区：">
                <el-select @change='changeProvince' clearable v-model="publicForm.provinceId" placeholder="省份" size="small" v-if="!isShow">
                  <el-option v-for="item in provinceList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>
                <el-select @change="cityChange" clearable v-model="publicForm.cityId" placeholder="城市" size="small" v-if="!isShow" style="margin-left: 10px">
                  <el-option v-for="item in cityList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>

                <el-select @change="districtChange" clearable v-model="publicForm.districtId" placeholder="区" size="small" v-if="!isShow" style="margin-left: 10px">
                  <el-option v-for="item in districtList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>

                <el-select clearable v-model="publicForm.townId" placeholder="镇" size="small" v-if="!isShow" style="margin-left: 10px">
                  <el-option v-for="item in townList" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId"></el-option>
                </el-select>

                <span v-else>{{publicForm.provinceName}}{{publicForm.cityName}}{{publicForm.districtName}}{{publicForm.townName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公示开始日期：" prop="publicityDate">
                <el-date-picker
                  v-if="!isShow"
                  size="small"
                  v-model="publicForm.publicityDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <span v-else>{{publicForm.publicityDate}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公示结束日期：" prop="endDate">
                <el-date-picker
                  v-if="!isShow"
                  size="small"
                  v-model="publicForm.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <span v-else>{{publicForm.endDate}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="公示原文：">
                <Tinymce :height=400 ref="editor" v-model="publicForm.publicityContent" v-if="!isShow" />
                <p v-html="publicForm.publicityContent" v-else>{{publicForm.publicityContent}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公示原文链接：">
                <el-input size="small" v-model="publicForm.sourceUrl" v-if="!isShow"></el-input>
                <span v-else>{{publicForm.sourceUrl}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="allowUpload.twoAllow">
            <el-col :span="12">
              <el-form-item label="文件补充：">
                <el-upload style="display: inline-block"
                           v-if="!isShow"
                           ref="upload"
                           class="upload-box upload-box-width"
                           :action="UploadUrl()"
                           :auto-upload="false"
                           :on-remove="handleRemove"
                           :before-remove="beforeRemove"
                           :file-list="fileList"
                           :on-change="onUploadChange"
                           :show-file-list="true">
                  <el-button type="primary" size="small">点击上传</el-button>
                  <div v-if="fileList && fileList.length === 0"
                       style="margin: 0 10px;color:gray;cursor: default;display: inline-block">未上传
                  </div>
                </el-upload>
                <p style="cursor:pointer;" v-for="(item,index) in fileList" v-else @click="downloadFile(item)">
                  {{ (index + 1 + '、') + item.name}}
                </p>
                <p style="font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btnList">
        <el-button size='small' type="primary" @click="submitResult('publicForm')" v-if="!publicityId && !isShow && allowAdd.twoAllow">确定</el-button>
        <el-button size='small' type="primary" @click="editResult('publicForm')" v-if="publicityId && !isShow && allowUpdate.twoAllow">修改</el-button>
        <el-button size='small' @click="cancelSub">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {editApprovalPublicity,saveApprovalPublicity,findApprovalPublicity,supplementFileUpload} from '@/api/publicityResult'
  import {commonDictOfRegion, getFileListWithFileIds, ossFileSystemFileDownload} from '@/api/utils'

  export default {
    components: { Tinymce },
    data(){
      return{
        publicForm:{},
        rules:{
          projectName: [
            { required: true, message: '请输入公示标题', trigger: 'blur' },
          ],
          publicityState: [
            { required: true, message: '请选择公示状态', trigger: 'blur' },
          ],
          projectYear: [
            { required: true, message: '请选择年份', trigger: 'blur' },
          ],
          publicityDate: [
            { required: true, message: '请选择公示开始日期', trigger: 'blur' },
          ],
          endDate: [
            { required: true, message: '请选择公示结束日期', trigger: 'blur' },
          ],
          // cityName: [
          //   { required: true, message: '省和市不能为空', trigger: 'blur' },
          // ],
        },
        provinceList:[],
        cityList:[],
        districtList:[],
        townList:[],
        fileList:[],
        parentId: 0,
        level:3,
        publicityId: '',
        isShow: false,

        allowAdd: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:INSERT'),//新增立项公示信息
        allowUpdate: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:UPDATE'),//编辑立项公示信息
        allowDetail: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:DETAILS'),//获取立项公示结果
        allowUpload: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:UPLOAD'),//补充文件上传
      }
    },
    activated() {
      this.publicityId = this.$route.query.publicityId;
      this.isShow = this.$route.query.isShow;
      if(this.publicityId){
        this.getDetail();
      }
    },
    mounted() {
      this.getRegionList();
    },
    methods:{
      //获取详情
      getDetail(){
        let params = {
          page:0,
          pageSize:10,
          publicityId: this.publicityId
        }
        if(this.allowDetail.twoAllow){
          findApprovalPublicity(params).then(res=>{
            if(res.code == 200){
              this.publicForm = res.data.data[0];

              if (res.data.data[0].fileIds.indexOf(",") != -1) {
                res.data.data[0].fileIds = res.data.data[0].fileIds.substr(0, res.data.data[0].fileIds.length - 1)
              }
              let fileIds = res.data.data[0].fileIds.split(',')

              if (res.data.data[0].fileIds && res.data.data[0].fileIds != '') {
                this.getFileDetail(fileIds)
              }
              this.getAddressDetail();
            }else{
              this.$message.warning(res.message)
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取此详情')
        }
      },

      //获取文件详情
      getFileDetail(fileIds) {
        getFileListWithFileIds({fileIds: fileIds, haveView: false}).then(res => {
          if (res.code == 200) {
            this.fileList = res.data.map(item => {
              item.name = item.fileName
              return item
            })
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
              this.$message.success('下载成功')
            }
          })
        }
      },

      //新建公示结果
      submitResult(formName){
        if(this.publicForm.publicityDate > this.publicForm.endDate){
          this.$message.warning('公示开始日期不得大于公示结束日期');
          return;
        }

        let fileList = ''
        if(this.fileList.length > 0){
          this.fileList.forEach(item => {
            fileList += item.fileId + ','
          })
        }
        this.publicForm.fileIds = fileList

        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            saveApprovalPublicity(this.publicForm).then(res=>{
              if(res.code == 200){
                this.$message.success('新建成功');
                this.publicForm = {};
                this.fileList =  [];
                this.$store.commit('SET_PUBLICITYRESULT_SCROLL', 0)
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route,'/approvalCollaborative/publicityResult');
              }else{
                this.$message.warning(res.message)
              }
            })
          }
        })
      },

      //编辑公示结果
      editResult(formName){
        if(this.publicForm.publicityDate > this.publicForm.endDate){
          this.$message.warning('公示开始日期不得大于公示结束日期');
          return;
        }

        let fileList = ''
        if(this.fileList.length > 0){
          this.fileList.forEach(item => {
            fileList += item.fileId + ','
          })
        }
        this.publicForm.fileIds = fileList

        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            editApprovalPublicity(this.publicForm).then(res=>{
              if(res.code == 200){
                this.$message.success('修改成功');
                this.publicForm = {};
                this.fileList =  [];
                // this.$store.commit('SET_PUBLICITYRESULT_SCROLL', 0)
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route,'/approvalCollaborative/publicityResult');
              }else{
                this.$message.warning(res.message)
              }
            })
          }
        })
      },

      // 上传文件
      handlePreview(obj) {
        if(obj.name.length >= 150){
          this.$message('文件名称超长，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if(this.publicForm.provinceName == '' || this.publicForm.provinceName == undefined){
          this.$message.warning('请先选择省');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        // if(this.publicForm.cityName == '' || this.publicForm.cityName == undefined){
        //   this.$message.warning('请先选择城市');
        //   this.fileList = JSON.parse(JSON.stringify(this.fileList))
        //   return;
        // }
        if(this.publicForm.publicityDate == '' || this.publicForm.publicityDate == undefined){
          this.$message.warning('请先选择公示开始日期');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }

        const formData = new FormData()
        formData.append('file', obj)
        formData.append('provinceName', this.publicForm.provinceName)
        if(this.publicForm.cityName){
          formData.append('cityName', this.publicForm.cityName)
        }
        formData.append('publicityDate', this.publicForm.publicityDate)
        supplementFileUpload(formData).then(res => {
          if (res.code == 200) {
            let file = {
              fileId: res.data[0],
              name: obj.name,
              uid: obj.uid,
              fileName: obj.name,
            }
            this.fileList.push(file)
            this.$message.success('上传成功!')
          }else{
            this.$message.warning(res.message)
            this.fileList = JSON.parse(JSON.stringify(this.fileList))
          }
        })
      },

      handleRemove(file, fileList) {
        this.$message.success('删除成功！')
        this.fileList = fileList;
      },

      beforeRemove(file, fileList){
        return this.$confirm(`是否确定删除此文件，解除关联 ${ file.name }？`);
      },

      UploadUrl() {
        return '/policy/api/policy/policyNoticeInfo/uploadFile' // 返回需要上传的地址
      },

      onUploadChange(file,fileList) { // 处理上传
        this.handlePreview(file.raw)
      },

      //获取地区信息
      getRegionList(level, parentId) {
        if (level == undefined || level == null) {
          level = 3
        }

        if (parentId == undefined || parentId == '') {
          level = 3
          parentId = 0
        }

        let params = {
          level: level,
          parentId: parentId
        }

        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (level == 3) {
              this.provinceList = res.data
            }
            if (level == 2) {
              this.cityList = res.data
            }
            if (level == 1) {
              this.districtList = res.data
            }
            if (level == 0) {
              this.townList = res.data
            }

          } else {
            this.$message({ type: 'error', message: res.message })
          }
        })
      },
      // 选择省
      changeProvince(val) {
        if(val == '' || val == undefined){
          this.cityList = [];
          this.districtList = [];
          this.townList = [];
          this.publicForm.cityId = '';
          this.publicForm.districtId = '';
          this.$set(this.publicForm,'townId','')
          this.publicForm.cityName = '';
        }
        this.publicForm.cityId = '';
        this.publicForm.districtId = '';
        this.$set(this.publicForm,'townId','')

        this.provinceList.forEach(item=>{
          if(item.dictId == val){
            this.publicForm.provinceName = item.dictName;
          }
        });
        this.getRegionList(2,val)
      },

      // 选择市
      cityChange(val){
        this.publicForm.districtId = '';
        this.$set(this.publicForm,'townId','')
        this.cityList.forEach(item=>{
          if(item.dictId == val){
            this.publicForm.cityName = item.dictName;
          }
        });

        this.getRegionList(1,val)
      },

      // 选择区
      districtChange(val){
        this.$set(this.publicForm,'townId','')
        this.getRegionList(0,val)
      },



      //详情--地区一次获取
      getAddressDetail() {
        this.getRegionList(3, 0);
        if (this.publicForm.provinceId) {
          this.getRegionList(2, this.publicForm.provinceId)
        }
        if (this.publicForm.cityId) {
          this.getRegionList(1, this.publicForm.cityId)
        }
        if (this.publicForm.districtId) {
          this.getRegionList(0, this.publicForm.districtId)
        }
      },

      // 返回
      cancelSub() {
        this.publicForm = {};
        this.fileList =  [];
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route);
      },
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .el-form-item {
    display: flex;
    margin-bottom: 20px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    line-height: normal;
    align-items: center;
    display: flex;
  }

  /deep/ .el-form-item__label {
    min-width: 140px;
    font-weight: normal;
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
