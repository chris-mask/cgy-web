<template>
  <div class="sale-plan-detail">
    <!--标题-->
    <div class="title-bar">
      申报管理列表 -新增
    </div>

    <!--公司名-框-->
    <div class="company-bar">
      <div class="pic-box">项目简称</div>
      <div class="detail">
        <div class="name">
          <span class="xin">*</span>
          <el-input class="input" placeholder="请输入项目名称" v-model.trim="form.projectName"/>
        </div>
        <div class="user-type">
          <span class="user-title">服务机构：</span>
          <el-input class="input" placeholder="请输入服务机构" v-model="form.serviceCompany"/>
        </div>
      </div>
    </div>

    <!--基础信息-->
    <div class="cart-bar">
      <div class="cart-title">
        <div class="title-name">
          <span class="line blue"></span>
          <div class="text">基础信息</div>
        </div>
      </div>
      <div class="cart-body">
        <el-row class="form-body">
          <!--申报人-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name"><span class="xin">*</span>申报人：</span>
              <el-input placeholder="请输入申报人" class="input" v-model.trim="form.applyPersonnel" clearable/>
            </div>
          </el-col>
          <!--申报时间-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name"><span class="xin">*</span>申报时间：</span>
              <el-date-picker
                class="date-input"
                type="date"
                v-model="form.applyDate"
                value-format="yyyy-MM-dd"
                placeholder="选择申报时间">
              </el-date-picker>
            </div>
          </el-col>
          <!--申报截止时间-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name"><span class="xin">*</span>系统提交截止时间：</span>
              <el-date-picker
                class="date-input"
                type="date"
                v-model="form.onlineDateEnd"
                value-format="yyyy-MM-dd"
                placeholder="选择截止时间">
              </el-date-picker>
            </div>
          </el-col>
          <!--提交资料时间-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name"><span class="xin">*</span>纸质提交截止时间：</span>
              <el-date-picker
                class="date-input"
                type="date"
                value-format="yyyy-MM-dd"
                v-model="form.paperDateEnd"
                placeholder="选择截止时间">
              </el-date-picker>
            </div>
          </el-col>
          <!--预计扶持金额-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name"><span class="xin">*</span>预计扶持金额：</span>
              <el-input class="money-input"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        v-model.trim="form.subsidyAmount"
                        placeholder="请输入预计扶持金额"
                        maxlength="9"
              >
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
          <!--主管单位-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name">主管单位：</span>
              <el-input placeholder="请输入主管单位" v-model="form.competentUnit" class="input" clearable/>
            </div>
          </el-col>
          <!--联系人-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name">联系人：</span>
              <el-input class="input" placeholder="请输入联系人" v-model="form.contactPersonnel" clearable/>
            </div>
          </el-col>
          <!--联系电话-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name">联系电话：</span>
              <el-input placeholder="请输入联系电话" v-model="form.contactPhone" class="input" clearable/>
            </div>
          </el-col>
          <!--立项情况-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name">立项情况：</span>
              <el-select v-model="form.approvalState" class="input-select" placeholder="请选择立项情况">
                <el-option v-for="item in approvalData"
                           :label="item.label"
                           :value="item.value"
                           :key="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <!--核准金额-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name">核准金额：</span>
              <el-input oninput="value=value.replace(/[^\d]/g,'')"
                        v-model="form.approveAmount"
                        class="money-input"
                        placeholder="请输入核准金额"
                        maxlength="9"
              >
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-col>
          <!--需要验收-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name">需要验收：</span>
              <el-select v-model="form.recheckState" class="input-select" placeholder="请选择需要验收">
                <el-option
                  v-for="item in recheckData"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                />
              </el-select>
            </div>
          </el-col>
          <!--项目截止时间-->
          <el-col :offset="1" :xs="12" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="item">
              <span class="name">项目截止时间：</span>
              <el-date-picker
                class="date-input"
                type="date"
                value-format="yyyy-MM-dd"
                v-model="form.projectDateEnd"
                placeholder="选择截止时间">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--tab列表-->
    <div class="tab-list">
      <ul class="tab-nav">
        <li :class="tabAcitive == index ? 'cur':''"
            v-for="(item,index) in tabNavData"
            @click="tabHandle(index)"
        >
          <img :src="item.img"/>{{item.name}}
        </li>
      </ul>
      <div class="tab-content">
        <!--进度跟踪-->
        <div v-if="tabAcitive == 0" class="tracking-tab">
          <div class="box-group"
               v-for="(item,index) in processData"
               @click="processBtnhandle(false,item,index)"
          >
            <div class="box">
              <div class="box-title">
                <div class="num">{{index+1}}</div>
                <div class="title-name">{{item.processName}}</div>
                <i @click.stop="clearBoxHandle(index)" class="icon-clear-box el-icon-circle-close"></i>
              </div>
              <div class="box-content">
                <div>时间：<span>{{item.processDate}}</span></div>
                <div class="remark">
                  <div class="label">备注：</div>
                  <div class="label-main">
                    {{item.processDesc}}
                  </div>
                </div>
              </div>
            </div>
            <div class="arrow">
              <img :src="rightArrow"/>
            </div>
          </div>

          <div class="box-group">
            <div class="box">
              <div class="add-pass" @click="processBtnhandle(true)">
                <img :src="addPass"/>
                <div class="pass-name">新增进度</div>
              </div>
            </div>
          </div>
        </div>

        <!--项目概况-->
        <div v-show="tabAcitive == 1" class="project-area-tab">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.projectSummary"
            class="project-area"
            resize="none"
          />
        </div>

        <!--政策原文-->
        <div v-if="tabAcitive == 2" class="policy-tab">
          <div class="tab-title">
            <div class="title-url">
              原文链接：<el-input clearable v-model="form.sourceUrl" class="source-url" placeholder="请输入原文链接"/>
            </div>
            <el-upload
              :http-request="handlePoliceUpload"
              class="image-uploader"
              :file-list="policeFileList"
              :show-file-list="false"
              action=""
            >
              <button class="update-file-btn">
                <img :src="setUpImg"/>
                上传文件
              </button>
            </el-upload>
            <p style="margin-left:10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
          </div>
          <div class="tab-content">
            <div class="item" v-for="(item,index) in policeFileList">
              <div class="files-name">
                政策文件： <span class="name">{{item.fileName}}</span>
                <span></span>
                <button class="files-del-btn" @click="delPoliceFileHandle(index)">删除</button>
              </div>
            </div>
          </div>
        </div>

        <!--申报材料-->
        <div v-if="tabAcitive == 3" class="declare-tab">
          <div class="tab-title">

            <el-upload
              :http-request="handleDeclareUpload"
              class="image-uploader"
              :file-list="declareFileList"
              :show-file-list="false"
              action=""
            >
              <button class="update-file-btn">
                <img :src="setUpImg"/>
                上传文件
              </button>
            </el-upload>
            <p style="margin-left:10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
          </div>
          <div class="tab-content">
            <div class="item" v-for="(item,index) in declareFileList">
              <div class="files-name">
                申报材料： <span class="name">{{item.fileName}}</span>
                <button class="files-del-btn" @click="delDeclareFileHandle(index)">删除</button>
              </div>
            </div>
          </div>
        </div>

        <!--验收材料-->
        <div v-if="tabAcitive == 4" class="declare-tab">
          <div class="tab-title">
            <el-upload
              :http-request="handleCheckUpload"
              class="image-uploader"
              :file-list="checkFileList"
              :show-file-list="false"
              action=""
            >
              <button class="update-file-btn">
                <img :src="setUpImg"/>
                上传文件
              </button>
            </el-upload>
            <p style="margin-left:10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
          </div>
          <div class="tab-content">
            <div class="item" v-for="(item,index) in checkFileList">
              <div class="files-name">
                申报材料： <span class="name">{{item.fileName}}</span>
                <button class="files-del-btn" @click="delCheckFileHandle(index)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--返回-->
    <div class="goPlanList">
      <el-button class="blue btn" @click="addHandle">确定</el-button>
      <el-button class="btn" @click="cananlHandle">取消</el-button>
    </div>


    <!--新增进度---弹窗-->
    <el-dialog title="新增进度" :visible.sync="updateVisible" class="editorUserModal" width="600px" v-dialogDrag>
      <el-form :model="processForm" ref="processForm" :rules="processRules" label-width="120px" @submit.native.prevent>
        <el-form-item label="进度名称：" prop="processName">
          <el-input maxlength="6" show-word-limit v-model="processForm.processName" class="user-input"
                    placeholder="请输入进度名称"/>
        </el-form-item>

        <el-form-item label="完成时间：" prop="processDate">
          <el-date-picker v-model="processForm.processDate" type="date" placeholder="选择完成时间"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="备注：" prop="processDesc">
          <el-input v-model="processForm.processDesc" type="textarea" resize="none" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="setBtn" @click="addProcessHandle">确 定</el-button>
        <el-button class="cananl" @click="updateVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //导入接口
  import {
    //申报管理--新增
    saveProjectApply,
    //申报进度--新增项目
    saveProjectApplyProcess,
  } from '@/api/declare'
  import {addFileBatch} from '@/api/utils.js'
  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {policyNoticeUpload, declareDataUpload, acceptanceDataUpload} from '@/utils/uploadPathMethods'

  import cloneDeep from "lodash/cloneDeep";
  import tracking from '../../../../static/icon/tracking.png'
  import projects from '../../../../static/icon/projects.png'
  import policy from '../../../../static/icon/policy.png'
  import declare from '../../../../static/icon/declare.png'
  import rightArrow from '../../../../static/icon/right_arrow.png'
  import addPass from '../../../../static/icon/add.png'
  import editIcon from '../../../../static/edit_icon.png'
  import setUpImg from '../../../../static/set_up_img.png'

  export default {
    data() {
      return {
        addPass,
        rightArrow,
        editIcon,
        setUpImg,
        //页面状态
        pageType: null,

        //是否能编辑
        isEdit: false,

        //默认选中的导航
        tabAcitive: 0,

        //基础信息---form
        form: {
          projectName: "",
          serviceCompany: "",
          applyPersonnel: "",
          applyDate: "",
          onlineDateEnd: "",
          paperDateEnd: "",
          subsidyAmount: "",
          approveAmount: "",
          competentUnit: "",
          contactPersonnel: "",
          contactPhone: "",
          approvalState: "",
          recheckState: "",
          projectDateEnd: "",
          projectSummary: "",
          processDtoList: []
        },
        //基础信息--立项情况
        approvalData: [
          {value: 0, label: '不需立项'},
          {value: 1, label: '等待立项'},
          {value: 2, label: '立项通过'},
          {value: 3, label: '立项不通过'},
        ],
        //基础信息--验收情况
        recheckData: [
          {value: 0, label: '不需验收'},
          {value: 1, label: '等待验收'},
          {value: 2, label: '验收通过'},
          {value: 3, label: '验收不通过'},
        ],

        // 导航栏--数据
        tabNavData: [
          {name: '进度跟踪', img: tracking},
          {name: '项目概况', img: projects},
          {name: '政策原文', img: policy},
          {name: '申报材料', img: declare},
          {name: '验收材料', img: declare},
        ],


        //进度跟踪--弹窗--显示/隐藏
        updateVisible: false,
        //进度跟踪--判读是新增还是修改
        isProcessEdit: false,
        //进度跟踪--标识第几个
        editActive: "",
        //进度跟踪--数据
        processData: [],
        //进度跟踪--新增/编辑--提交参数
        processForm: {
          processName: "",
          processDate: "",
          processDesc: "",
        },
        //进度跟踪--要删除的值
        processIds: [],
        //进度跟踪--输入框监听
        processRules: {
          processName: [
            {required: true, message: '请输入进度名称', trigger: 'blur'}
          ],
          processDate: [
            {required: true, message: '请选择完成时间', trigger: 'blur'}
          ],
          processDesc: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ],
        },

        //政策原文--文件数据
        policeFileList: [],

        //申报材料--文件数据
        declareFileList: [],

        //验收材料--文件数据
        checkFileList: []
      }
    },

    activated() {
      this.tabAcitive = 0;
      this.form = {
        processDtoList: []
      }
    },

    methods: {
      //申报管理--新增
      addHandle() {
        //判读某些字段不能为空
        if (!this.form.projectName || this.form.projectName === '') {
          this.$message.warning('项目名称不能为空');
          return
        }
        if (!this.form.applyPersonnel || this.form.applyPersonnel === '') {
          this.$message.warning('申报人不能为空');
          return
        }
        if (!this.form.applyDate || this.form.applyDate === '' || this.form.applyDate === null) {
          this.$message.warning('申报时间不能为空');
          return
        }
        if (!this.form.onlineDateEnd || this.form.onlineDateEnd === '' || this.form.onlineDateEnd === null) {
          this.$message.warning('系统提交截止时间不能为空');
          return
        }
        if (!this.form.paperDateEnd || this.form.paperDateEnd === '' || this.form.paperDateEnd === null) {
          this.$message.warning('纸质提交截止时间不能为空');
          return
        }
        if (!this.form.subsidyAmount || this.form.subsidyAmount === '') {
          this.$message.warning('预计扶持金额不能为空');
          return
        }
        this.form.processDtoList = cloneDeep(this.processData).map(item => {
          item.processDate = `${item.processDate} 00:00:00`;
          return item;
        });

        let sourceFileIds = [];
        if (this.policeFileList.length !== 0) {
          this.policeFileList.forEach(item => {
            sourceFileIds.push(item.fileId)
          })
        }

        let applyFileIds = [];
        if (this.declareFileList.length !== 0) {
          this.declareFileList.forEach(item => {
            applyFileIds.push(item.fileId)
          })
        }

        let recheckFileIds = [];
        if (this.checkFileList.length !== 0) {
          this.checkFileList.forEach(item => {
            recheckFileIds.push(item.fileId)
          })
        }

        this.form.applyFileIds = applyFileIds.join(',');
        this.form.recheckFileIds = recheckFileIds.join(',');
        this.form.sourceFileIds = sourceFileIds.join(',');

        //调用新增接口
        saveProjectApply(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功');
            this.$store.commit('SET_DECLARE_SCROLL', 0)
            this.$router.push({
              path: '/declare/list'
            });
            this.$store.state.tagsView.visitedViews.forEach((item, key) => {
              if (item.name == '新增申报管理') {
                this.$store.state.tagsView.visitedViews.splice(key, 1)
              } else {
                return false
              }
            });
            this.form = {
              projectName: "",
              serviceCompany: "",
              applyPersonnel: "",
              applyDate: "",
              onlineDateEnd: "",
              paperDateEnd: "",
              subsidyAmount: "",
              approveAmount: "",
              competentUnit: "",
              contactPersonnel: "",
              contactPhone: "",
              approvalState: "",
              recheckState: "",
              projectDateEnd: "",
              projectSummary: "",
              processDtoList: []
            };
            this.processData = [];
            this.declareFileList = [];
            this.checkFileList = [];
            this.policeFileList = [];
          }
        })
      },

      //申报进度--新增
      addProcessHandle() {
        this.$refs['processForm'].validate((valid, error) => {
          if (valid) {
            if (this.isProcessEdit) {
              this.processData.push(this.processForm);
            } else {
              this.processData[this.editActive] = this.processForm;
            }
            this.processForm = {};
            this.updateVisible = false;
          }
        })
      },

      //申报管理--取消
      cananlHandle() {
        this.$router.push({
          path: '/declare/list'
        })
        this.$store.state.tagsView.visitedViews.forEach((item, key) => {
          if (item.name == '新增申报管理') {
            this.$store.state.tagsView.visitedViews.splice(key, 1)
          } else {
            return false
          }
        });
        this.form = {
          projectName: "",
          serviceCompany: "",
          applyPersonnel: "",
          applyDate: "",
          onlineDateEnd: "",
          paperDateEnd: "",
          subsidyAmount: "",
          approveAmount: "",
          competentUnit: "",
          contactPersonnel: "",
          contactPhone: "",
          approvalState: "",
          recheckState: "",
          projectDateEnd: "",
          projectSummary: "",
          processDtoList: []
        };
        this.processData = [];
        this.declareFileList = [];
        this.checkFileList = [];
        this.policeFileList = [];
      },

      //申报进度--点击--判断是否新增/修改  true:新增 false:修改
      processBtnhandle(data, forms, num) {
        this.updateVisible = true;
        this.isProcessEdit = data;
        if (data) {
          this.processForm = {};
        } else {
          this.processForm = cloneDeep(forms);
          this.editActive = num
        }
      },

      //申报进度--删除
      clearBoxHandle(index) {
        this.processData.splice(index, 1);
      },

      //tab栏--点击切换
      tabHandle(index) {
        this.tabAcitive = index;
      },

      //上传政策原文
      handlePoliceUpload(option) {
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
        let filePath = policyNoticeUpload(this.$store.getters.companyName, fileName) + '.' + fileType
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
                this.policeFileList.push(response.data[0]);
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

      //删除政策原文
      delPoliceFileHandle(index) {
        this.policeFileList.splice(index, 1);
      },

      //上传申报材料
      handleDeclareUpload(option) {
        if (option.file.name.length >= 150) {
          this.$message.error('文件名称超长，请检查');
          this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          return;
        }
        let fileSize = option.file.size / 1024
        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = declareDataUpload(this.$store.getters.companyName, fileName) + '.' + fileType
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
              haveView: false
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                this.declareFileList.push(response.data[0]);
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          }
        })
      },

      //删除申报材料
      delDeclareFileHandle(index) {
        this.declareFileList.splice(index, 1);
      },

      //上传申报材料
      handleCheckUpload(option) {
        if (option.file.name.length >= 150) {
          this.$message.error('文件名称超长，请检查');
          this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          return;
        }
        let fileSize = option.file.size / 1024
        if(fileSize > this.$store.getters.singleCapacity){
          this.$message.error('文件大小超出限制，上传失败');
          this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          return;
        }
        if(fileSize > this.$store.getters.totalCapacity){
          this.$message.error('文件大小超出容量剩余空间，上传失败');
          this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);
        let filePath = acceptanceDataUpload(this.$store.getters.companyName, fileName) + '.' + fileType
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
              haveView: false
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                this.checkFileList.push(response.data[0]);
              }else{
                this.$message.error('上传失败，请检查重新上传');
                this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
              }
            })
          }else{
            this.$message.error('文件出错或文件已存在，无法覆盖');
            this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          }
        })
      },

      //删除申报材料
      delCheckFileHandle(index) {
        this.checkFileList.splice(index, 1);
      },
    },
  }
</script>

<style lang="less" scoped>
  ul li {
    list-style: none;
  }

  .sale-plan-detail {
    margin: auto 5%;

    .title-bar {
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);
      margin-top: 20px;
      padding-left: 20px;
    }

    .company-bar {
      background: #fff;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      padding: 16px 50px;
      display: flex;
      align-items: center;

      .pic-box {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        width: 78px;
        height: 78px;
        background: rgba(105, 204, 255, 1);
        opacity: 1;
        margin-right: 20px;
        border-radius: 6px;
        padding: 23px;
      }

      .detail {
        width: 24%;
        min-width: 350px;

        .input {
          /deep/ .el-input__inner {
            border: 0;
            border-radius: 0;
            border-bottom: 1px solid rgba(68, 68, 68, 0.3);
          }
        }

        .name {
          font-size: 18px;
          color: rgba(68, 68, 68, 1);
          margin-bottom: 20px;
          display: flex;
          align-items: center;

          .xin {
            color: red;
          }

          img {
            cursor: pointer;
            margin-left: 10px;
          }
        }

        .user-type {
          display: flex;
          align-items: center;
          font-size: 14px;

          .user-title {
            white-space: nowrap;
            color: rgba(68, 68, 68, 0.75);
          }
        }
      }
    }

    .cart-bar {
      margin-top: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

      .cart-title {
        min-height: 47px;
        font-size: 16px;
        border-bottom: 1px solid rgba(219, 233, 255, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;

        .title-name {
          display: flex;
          align-items: center;

          .line {
            display: inline-block;
            width: 3px;
            height: 14px;
            margin-right: 10px;

            &.blue {
              background: rgba(5, 170, 255, 1);
            }
          }

          .text {
            margin-top: 2px;
          }
        }

        .btn-img {
          cursor: pointer;
        }

        .item-btn {
          width: 72px;
          height: 30px;
          background-image: url("../../../../static/sales_plan_sprite.png");
          cursor: pointer;
          background-size: cover;

          &.edit {
            background-position: -158px, 0;
            margin-right: 5px;
          }

          &.implement {
            background-position: -79px, 0;
          }

          &.remark {
            background-position: -237px, 0;
          }
        }

        .item-btn:hover {
          background-image: url("../../../../static/_sales_plan_sprite.png");
        }
      }

      .cart-body {
        padding: 10px 10px 10px 0;

        font-size: 14px;

        .cart-item {
          margin-bottom: 16px;

          .name {
            color: rgba(68, 68, 68, 0.75);
          }

          .blue {
            color: rgba(5, 170, 255, 1);
          }

          .col-item {
            display: flex;

            .select-list-detail {
              display: flex;
              align-items: center;
              color: rgba(5, 170, 255, 1);

              .cate {
                margin-right: 10px;
              }
            }
          }
        }

        .form-body {
          width: 100%;
          font-size: 14px;
          @media only screen and (min-width: 992px) {
            .el-col-md-8 {
              width: 45.33333%;
            }
          }

          @media only screen and (min-width: 1300px) {
            .el-col-lg-6 {
              width: 28%;
            }
          }

          @media only screen and (min-width: 1700px) {
            /deep/ .el-col-lg-6 {
              width: 20%;
            }
          }

          @media only screen and (min-width: 1800px) {
            /deep/ .el-col-lg-6 {
              width: 20%;
            }
          }

          @media only screen and (min-width: 1900px) {
            .el-col-lg-6 {
              width: 20%;
            }
          }

          .item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .name {
              display: inline-block;
              width: 126px;
              min-width: 126px;
              text-align: right;
              white-space: nowrap;
              color: rgba(68, 68, 68, 0.75);

              .xin {
                color: red;
              }
            }

            .input {
              width: 185px;
              min-width: 185px;

              /deep/ .el-input__inner {
                height: 30px;
                padding-left: 2px;
                border: 0;
                border-radius: 0;
                border-bottom: 1px solid rgba(68, 68, 68, 0.3);
              }

              /deep/ .el-input__icon {
                height: 30px;
                line-height: 30px;
                right: 0;
              }
            }

            .money-input {
              width: 185px;
              min-width: 185px;

              /deep/ .el-input__inner {
                padding-left: 2px;
                padding-right: 0;
                height: 30px;
                border: 0;
                border-bottom: 1px solid #ccc;
                border-radius: 0;
              }

              /deep/ .el-input-group__append {
                background: none;
                color: #444444;
                border: 0;
                border-radius: 0;
                border-bottom: 1px solid rgba(68, 68, 68, 0.3);
                padding-right: 11px;
              }

              /deep/ .el-input__icon {
                height: 30px;
                line-height: 30px;
              }
            }

            .date-input {
              width: 185px;
              min-width: 185px;

              /deep/ .el-input__inner {
                height: 30px;
                border: 0;
                border-bottom: 1px solid #ccc;
                border-radius: 0;
              }

              /deep/ .el-input-group__append {
                background: none;
                color: #444444;
                border: 0;
                border-radius: 0;
                border-bottom: 1px solid rgba(68, 68, 68, 0.3);
                padding-right: 0;
              }

              /deep/ .el-input__icon {
                height: 30px;
                line-height: 30px;
              }
            }

            .input-select {
              width: 185px;
              min-width: 185px;
              height: 30px;

              /deep/ .el-input__inner {
                height: 30px;
                border: 0;
                border-bottom: 1px solid #ccc;
                border-radius: 0;
                padding-left: 0;
              }

              /deep/ .el-input__icon {
                height: 30px;
                line-height: 30px;
              }
            }

          }
        }
      }
    }

    .tab-list {
      margin-top: 20px;
      color: #444;

      .tab-nav {
        display: flex;
        align-items: center;

        li {
          padding: 14px 20px;
          font-size: 16px;
          background: #F8F8F8;
          cursor: pointer;
          display: flex;
          align-items: center;

          img {
            margin-right: 4px;
          }

          &.cur {
            background: #fff;
            box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
          }
        }
      }

      .tab-content {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

        .tracking-tab {
          padding: 20px 19px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .box-group {
            display: flex;
            align-items: center;
            cursor: pointer;

            .box {
              width: 170px;
              height: 120px;
              border-radius: 4px;
              border: 1px solid rgba(5, 170, 255, 1);
              overflow: hidden;
              font-size: 14px;
              margin-bottom: 10px;

              .box-title {
                height: 34px;
                background: #CDEEFF;
                color: #035580;
                display: flex;
                align-items: center;
                padding-left: 14px;
                border-bottom: 1px solid #05AAFF;
                position: relative;

                .num {
                  width: 16px;
                  height: 16px;
                  background: rgba(3, 85, 128, 1);
                  border-radius: 50%;
                  color: #fff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  padding-top: 2px;
                  padding-right: 1px;
                }

                .title-name {
                  margin-left: 6px;
                }

                .icon-clear-box {
                  position: absolute;
                  right: 6px;
                  color: #035580;
                  font-weight: bold;
                  font-size: 16px;
                  cursor: pointer;
                }
              }

              .box-content {
                height: 86px;
                box-sizing: border-box;
                padding: 10px 14px;
                color: rgba(68, 68, 68, 0.60);
                display: flex;
                flex-direction: column;

                .remark {
                  display: flex;
                  margin-top: 6px;

                  .label {
                    white-space: nowrap;
                  }

                  .label-main {
                    color: #444;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /*截取2行*/
                    -webkit-box-orient: vertical;
                  }
                }

                span {
                  color: #444444;
                }
              }

              .add-pass {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 100%;
                width: 100%;
                cursor: pointer;

                .pass-name {
                  margin-top: 6px;
                  font-size: 14px;
                  color: #05AAFF;
                }
              }
            }

            .arrow {
              margin: 0 4px;
            }
          }
        }

        .project-area-tab {
          padding: 20px 30px;

          /deep/ .el-textarea__inner {
            height: 114px;
          }
        }

        .policy-tab, .declare-tab {
          .tab-title {
            display: flex;
            padding: 20px 30px;
            border-bottom: 1px solid rgba(219, 233, 255, 1);
            align-items: center;

            .update-file-btn {
              width: 90px;
              height: 28px;
              color: #fff;
              background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
              box-shadow: 0 3px 6px rgba(5, 170, 255, 0.08);
              opacity: 1;
              outline: none;
              border-radius: 2px;
              border: 0;
              cursor: pointer;
              font-size: 13px;
              display: flex;
              align-items: center;
              justify-content: center;

              img {
                margin-right: 4px;
              }

              &:active {
                opacity: 0.5;
              }
            }

            .title-url{
              display: flex;
              align-items: center;
              font-size: 14px;
              color: rgba(68, 68, 68, 0.75);
              white-space: nowrap;
              .source-url{
                width: 250px;
                /deep/ .el-input__inner{
                  border: 0;
                  border-bottom: 1px solid #ccc;
                  border-radius: 0;
                  height: 30px;
                  padding: 0;
                }
                /deep/ .el-input__icon {
                  height: 30px;
                  line-height: 30px;
                }
              }
            }
          }

          .tab-content {
            padding: 30px;
            font-size: 14px;

            .item {
              margin-bottom: 14px;

              .files-link {
                color: rgba(68, 68, 68, 0.75);
                margin-bottom: 14px;

                .link {
                  color: #05AAFF;
                }
              }

              .files-name {
                color: rgba(68, 68, 68, 0.75);

                .name {
                  color: #444444;
                }

                .files-del-btn {
                  width: 50px;
                  height: 24px;
                  color: #fff;
                  border: 0;
                  outline: none;
                  background: rgba(255, 133, 133, 1);
                  border-radius: 2px;
                  cursor: pointer;
                  margin-left: 18px;

                  &:active {
                    opacity: 0.5;
                  }
                }
              }
            }
          }
        }
      }
    }

    .goPlanList {
      margin-top: 20px;
      margin-bottom: 10px;
      text-align: center;

      .btn {
        padding: 0;
        width: 100px;
        height: 38px;
        background: rgba(255, 255, 255, 1);
        font-size: 16px;
        color: rgba(68, 68, 68, 1);
        box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
        cursor: pointer;

        &.blue {
          color: #fff;
          background: #05AAFF;
          border: 1px solid #05AAFF;
        }

        &:active {
          opacity: 0.5;
        }
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
        width: 73%;
        display: flex;
      }

      .user-input {
        width: 220px;

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
  }
</style>
