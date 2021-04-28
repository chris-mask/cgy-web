<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-90" style="margin-bottom: 20px;">
      <el-form label-width="auto" label-position="left" @submit.native.prevent>
        <!--名称-->
        <el-card class="top-margin-10">
          <el-row type="flex">
            <el-col :span="2" :offset="1">
              <div class="short_name_bg center-items">
                {{form.noticeType ===1? '政策': '通知'}}
              </div>
            </el-col>
            <el-col :span="20">
              <div class="notice-name">
                <lable class="noice-title"><span style="color: rgb(245, 108, 108)">*</span> 名称：</lable>
                <span v-if="is_check">
                  <span>{{form.noticeName}}</span>
                </span>
                <el-input v-else v-model.trim="form.noticeName" type="text"
                          maxlength="450"
                          class="float-left width-600 noticeName"/>
              </div>
              <el-form-item label="类型：" prop="noticeType" style="margin-bottom: 0;">
                <el-radio-group v-model="form.noticeType" @change="typeRadioChange">
                  <el-radio v-for="item in sub_type_list"
                            :key="item.dictId"
                            :label="item.dictId"
                            :value="item.dictId"
                            :disabled="is_edit||is_check"
                  >
                    {{item.dictName}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="相关政策：" v-if="form.noticeType === 3" prop="parentName" style="margin-bottom: 0;">
                <input v-model="form.parentName" type="text" readonly
                       class="input_text float-left width-600"/>
                <el-button size="small" type="primary" class="left-margin-20" @click="getPolicyList"
                           v-if="!is_edit && !is_check">选择政策 
                </el-button>
              </el-form-item>
            </el-col>

            <el-col :span="3" :offset="1"  v-if="is_check || is_edit"  >
              <el-button @click="chooseQrCode" class="qrCodeChoose">生成二维码 
                <div class="qrcode-out" :class="qrCodeShowOrNo==true?'qrcode-out-show':'qrcode-out-no'">
                  <div class="qrcode" ref="qrCodeUrl"></div>
                  <span>用微信扫码二维码<br/>分享至好友和朋友圈 </span>
                </div> 
              </el-button>
            </el-col>


          </el-row>
        </el-card>

        <!--政策-->
        <noticeForm
          v-show="form.noticeType == 1"
          :noticeName="form.noticeName"
          :noticeType="form.noticeType"
          :noticeDetail="noticeDetail"
          @naticeByValue="naticeByValue"
        />

        <!--通知-->
        <policyForm
          v-show="form.noticeType == 2"
          :noticeName="form.noticeName"
          :noticeType="form.noticeType"
          :noticeDetail="noticeDetail"
          @naticeByValue="naticeByValue"
        />

        <!--根据政策录入通知-->
        <policyNoticeForm
          v-show="form.noticeType == 3"
          :noticeName="form.noticeName"
          :noticeType="form.noticeType"
          :noticeId="form.noticeId"
          :noticeDetail="noticeDetail"
          :policyDetail="policyDetail"

        />
<!--        @policyNoticeData="policyNoticeData"-->
      </el-form>
    </el-row>

    <!--弹窗-->
    <!--选择补贴项目-->
    <el-dialog title="选择补贴项目" class="project-modal"
               :visible.sync="project_table_visible"
               width="60%"
               :before-close="handleCloseProject"
               destroy-on-close="true"
               v-dialogDrag
    >
      <!-- 搜索框 -->
      <div>
        <div class="projectChoose">
          <span>项目筛选：</span>
          <el-select size="mini" clearable multiple v-model="project_list_query.projectTypes" placeholder="项目类型"
                     class="inline-block right-margin-10" @change="typeChange">
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
          <el-select class="inline-block" multiple size="mini" clearable v-model="project_list_query.areaLevel"
                     placeholder="国家级别" @change="areaChange">
            <el-option label="国家级" :value="1"></el-option>
            <el-option label="省级" :value="2"></el-option>
            <el-option label="市级" :value="3"></el-option>
            <el-option label="区县级" :value="4"></el-option>
            <el-option label="镇街级" :value="5"></el-option>
          </el-select>
        </div>
        <div class="projectChoose">
          <span>地区：</span>
          <el-select @change='changeProvince' clearable size="mini" class="inline-block input-150 right-margin-10"
                     v-model="project_list_query.provinceId" placeholder="省份">
            <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='changeCity' clearable size="mini" class="inline-block input-150 right-margin-10"
                     v-model="project_list_query.cityId" placeholder="城市">
            <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='changeDistrict' clearable size="mini" class="inline-block input-150 right-margin-10"
                     v-model="project_list_query.districtId" placeholder="县区">
            <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='getTownsId' clearable size="mini" class="inline-block input-150 right-margin-10"
                     v-model="project_list_query.townId" placeholder="镇街">
            <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
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

    <!--选择政策-->
    <el-dialog title="选择政策" class="project-modal" :visible.sync="policy_table_visible" width="60%" v-dialogDrag>
      <!--搜索到的总条数-->
      <div class="search-num">
        搜索到<span class="num">{{policy_list_total}}</span>条记录
      </div>
      <!-- 搜索框 -->
      <div>
        <el-input @keyup.enter.native="handlerPolicyListFilter" v-model.trim="policy_list_query.noticeName"
                  style="margin-bottom: 10px;" placeholder="输入政策名/项目名">
          <el-button slot="append" icon="el-icon-search" @click="handlerPolicyListFilter"></el-button>
        </el-input>
      </div>
      <!-- 表格 -->
      <el-table class="project-table"
                :data="policy_list"
                border
      >
        <el-table-column width="35">
          <template slot-scope="scope">
            <el-radio class="table-radio" v-model="policyId" :label="scope.row.noticeId"
                      @change="noticeHandle(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="政策名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.noticeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <span v-html="scope.row.projectName"></span>
          </template>
        </el-table-column>
      </el-table>

      <template v-if="policy_list.length !== 0">
        <div class="get-more" v-if="policy_list.length >= policy_list_total">没有更多</div>
        <div class="get-more" v-else @click="getMorePolicyList"><span>加载更多</span></div>
      </template>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
         <el-button class="sub-btn" @click="setPolicyList">确定</el-button>
         <el-button @click="policy_table_visible=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import noticeForm from "./noticeForm";
  import policyForm from "./policyForm";
  import policyNoticeForm from "./policyNoticeForm";
  import QRCode from "qrcodejs2";

  import {commonDict, commonDictOfRegion, getFileListWithFileIds, ossFileSystemFileDownload} from '@/api/utils'
  import {
    queryNoticeInfo,
    saveNoticeInfo,
    editNoticeInfo,
    queryProjectInfo,
    uploadFile,
    dissociatedFile
  } from '@/api/policy'
  import {queryProjectNameOfProjectType} from '@/api/projectManage'

  import cloneDeep from "lodash/cloneDeep";

  export default {
    name: 'policy_notice_detail',
    components: {noticeForm, policyForm, policyNoticeForm},
    props: {},
    data() {
      return {
        host: process.env.BASE_API,
        upload_url: '/policy/api/policy/policyNoticeInfo/uploadFile',
        uploadData: {save_path: 'policy_info/'},
        fileList: [],
        fileIdsList: [],
        fileNameList: [],
        is_edit: false,
        is_check: false,
        noticeId: null, // noticeId
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        level: 3,
        parentId: 0,
        supply_industry_list: [], // 补贴行业
        type_list: [], // 补贴行业
        projectDataList: [],
        dataProjectForm: {
          page: 0,
          pageSize: 10
        },
        proTotal: 0,
        loading: false,
        department_list: [], // 所属部门
        difficulty_list: [
          {dictName: '普惠性', dictId: 1},
          {dictName: '竞争性', dictId: 2}
        ], // 难易程度
        available_or_not_list: [
          {label: '有效', value: 0},
          {label: '无效', value: 1}
        ], // 是否有效
        apply_type_list: [], // 申报类别
        sub_type_list: [
          {dictName: '政策', dictId: 1},
          {dictName: '手动录入通知', dictId: 2},
          {dictName: '根据政策录入通知', dictId: 3}
        ], // 子类型
        supply_way_list: [
          {dictName: '事后补偿', dictId: 1},
          {dictName: '无偿补偿', dictId: 2},
          {dictName: '其他', dictId: 3}
        ], // 扶持方式
        form: {
          noticeName: '',
          noticeType: null,
          noticeContent: ''
        },

        // 项目库列表
        select_projects: [], // 已选项目
        proList: [], // 编辑用暂存项目
        project_table_visible: false,
        project_list: [],
        project_list_query: {
          page: 0,
          pageSize: 10
        },
        project_list_total: 0,
        // 政策列表
        policy_table_visible: false,
        policy_list: [],
        policy_list_query: {
          page: 0,
          pageSize: 10,
          noticeType: 1
        },
        policy_list_total: 0,
        //补贴项目选中的值
        tempProjectsList: [],
        policyId: '',
        policyData: {},

        //临时存放政策，手动录入通知，根据政策录入通知
        tempOneTwo: [],
        tempThree: [],

        regionBatch: [],
        rebForm: {
          page: 0,
          pageSize: 20
        },
        holdList: [],

        delProjectArr: [],


        //政策详情数据
        noticeDetail: {},

        //根据政策录入通知数据
        policyDetail: {},

        //二维码是否显示
        qrCodeShowOrNo:false,


        // 权限控制
        allowAdd: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:INSERT'),//新增政策通知
        allowUpdate: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:UPDATE'),//修改政策通知
        allowGetProjectList: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:PROJECT:LIST'),//查询项目信息
        allowCancelFileRelation: this.authorityControl('SYSTEM:POLICY:MANAGE', 'SYSTEM:POLICY:NOTICE', 'SYSTEM:POLICY:NOTICE:DISASSOCIATE:FILES'),//取消文件关联
      }
    },
    filters: {},
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
    activated() {
      // this.getRegionList();
      this.getCommonData()
      if (this.$route.query.noticeId) {
        this.noticeId = this.$route.query.noticeId
        this.getPolicyNoticeInfo()
      }

      // 是否新增
      if (this.$route.query.is_create) {
        // this.select_projects = []
        this.form.noticeType = 1
        this.tempOneTwo = []
        this.tempThree = []
      }
      // 是否编辑
      if (this.$route.query.is_edit) {
        this.is_edit = true
      }
      // 是否查看
      if (this.$route.query.is_check) {
        this.is_check = true
      }

      this.getProjectList()
      this.$nextTick(function () {
        this.creatQrCode()
      })
    },
    // mounted: function () {
    //   this.$nextTick(function () {
    //     this.creatQrCode()
    //   })
    // },
    destroyed(){
      window.removeEventListener('scroll', this.handleScroll); 
    },
    methods: {

      // 生成二维码
      creatQrCode() {
        console.log(this.$refs.qrCodeUrl,"=========================>")
        this.$refs.qrCodeUrl.innerHTML = "";
        let href = 'https://chengguoyun.cn/#/policy/detail?noticeId='+this.$route.query.noticeId+'&userId='+this.$store.state.user.userId;
        // let href = 'http://localhost:8080/#/policy/detail?noticeId='+this.$route.query.noticeId+'&userId='+this.$store.state.user.userId;
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: href, // 需要转换为二维码的内容
          width: 80,
          height: 80,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      },
      chooseQrCode(){
// console.log(this.$store.state.user,'==============>')
//         console.log(this.$store.state.user.username,'==============>')
        this.qrCodeShowOrNo=!this.qrCodeShowOrNo
      },
      //选择
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
      // 重定向
      handleRedirect(redirect_url) {
        const routeUrl = this.$router.resolve({path: redirect_url})
        window.open(routeUrl.href, '_blank')
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
      // 上传文件
      handlePreview(obj) {
        if (obj.name.length >= 150) {
          this.$message('文件名称超长，请检查');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return;
        }
        if (obj.size == 0) {
          this.$message.warning('请勿上传空文件');
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return
        }
        if (this.form.publishDate == '' || this.form.publishDate == undefined) {
          this.$message.warning('请先填写发布日期')
          this.fileList = JSON.parse(JSON.stringify(this.fileList))
          return
        }

        const loading = this.$loading({
          lock: true,
          text: '上传中',
        });

        // var sendDate = (new Date()).getSeconds();
        const formData = new FormData()
        formData.append('file', obj)
        formData.append('publishDate', this.form.publishDate)
        // this.$refs.upload.submit();
        uploadFile(formData).then(res => {
          if (res.code == 200) {
            this.fileIdsList.push(res.data)
            let fileNameList = {
              uid: obj.uid,
              name: obj.name,
              fileName: obj.name,
              filesId: res.data
            }
            loading.close();
            this.fileList.push(fileNameList)
            this.fileNameList.push(fileNameList)
            this.$message.success('上传成功！')
          } else {
            this.fileList = JSON.parse(JSON.stringify(this.fileList))
            this.$message.warning(res.message)
          }
        })

        // setTimeout(()=>{
        //   let endDate = (new Date()).getSeconds();
        //   if(sendDate < endDate){
        //     loading.close();
        //     this.fileList = []
        //   }
        // },5000)
      },
      handleRemove(file, fileList) {
        // if (this.noticeId && file.filesId) {
        //   if (this.allowCancelFileRelation.twoAllow) {
        //     dissociatedFile({fileid: file.filesId}).then(res => {
        //       if (res.code == 200) {
        //         this.$message.success('删除成功')
        //         this.fileList = fileList
        //         this.fileNameList.forEach(item => {
        //           if (file.uid == item.uid) {
        //             this.fileIdsList.forEach((list, index) => {
        //               if (item.filesId == list) {
        //                 this.fileIdsList.splice(index, 1)
        //               }
        //             })
        //           }
        //         })
        //       }
        //     })
        //   } else {
        //     this.$message.warning('抱歉，您沒有权限取消文件关联')
        //   }
        //
        // } else {
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
        // }
      },

      beforeRemove(file, fileList) {
        return this.$confirm(`是否确定删除此文件，解除关联? ${file.name}？`)
      },

      UploadUrl() {
        return '/policy/api/policy/policyNoticeInfo/uploadFile' // 返回需要上传的地址
      },
      onUploadChange(file) { // 处理上传
        this.handlePreview(file.raw)
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
      // 获取详情
      getPolicyNoticeInfo() {
        let params = {}
        if (this.$route.query.stateNum && this.$route.query.stateNum == 3) {
          params = {
            noticeId: this.noticeId, page: 0, pageSize: 10, stateNum: 3,viewDetail:1
          }
        } else {
          params = {
            noticeId: this.noticeId, page: 0, pageSize: 10,viewDetail:1
          }
        }
        queryNoticeInfo(params).then(res => {
          if (res.code == 200) {
            let form = res.data.data[0];
            if (form.noticeType == 1) {
              this.$set(this.form, 'noticeName', form.noticeName);
              this.$set(this.form, 'noticeType', form.noticeType);
              this.noticeDetail = form;
            } else if (form.noticeType == 2) {
              this.$set(this.form, 'noticeName', form.noticeName);
              this.$set(this.form, 'noticeType', form.noticeType);
              this.noticeDetail = form;
            } else if (form.noticeType == 3) {
              this.$set(this.form, 'noticeName', form.noticeName);
              this.$set(this.form, 'noticeType', form.noticeType);
              this.$set(this.form, 'parentName', form.parentName);
              this.policyDetail = form;
            }
          }
        })
      },

      getFileDetail(fileIds) {
        getFileListWithFileIds({fileIds: fileIds, haveView: false}).then(res => {
          if (res.code == 200) {
            var list = res.data.map(item => {
              item.name = item.fileName
              return item
            })
            this.fileList = list
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // 确认提交
      handSubmit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            let form = this.form
            if (form.noticeType === 1) {
              if (this.select_projects.length < 1) {
                this.$message.error('请选择补贴项目')
              } else {
                //政策--有效期--拆分日期赋值
                this.form.validDateBegin = this.form.termDate[0];
                this.form.validDateEnd = this.form.termDate[1];
                this.$delete(this.form, 'termDate');

                let selectProject = [];

                this.select_projects.forEach(item => {
                  if (!item.projectLevel || item.projectLevel === '') {
                    this.$message.warning('请选择项目级别');
                    throw new Error()
                  }

                  if (!item.subsidyPriceMin || item.subsidyPriceMin === '') {
                    this.$message.warning('请输入最低补助');
                    throw new Error()
                  }

                  if (!item.subsidyPriceMax || item.subsidyPriceMax === '') {
                    this.$message.warning('请输入最高补助');
                    throw new Error()
                  }

                  let obj = {
                    projectId: item.projectId,
                    projectLevel: item.projectLevel,
                    subsidyPriceMin: item.subsidyPriceMin,
                    subsidyPriceMax: item.subsidyPriceMax,
                    subsidyDesc: item.subsidyDesc
                  };
                  selectProject.push(obj)
                });
                this.form.policyNoticeProjectRelList = selectProject;
              }
            } else if (form.noticeType === 2) {

              this.$delete(this.form, 'termDate');
              this.$delete(this.form, 'validDateBegin');
              this.$delete(this.form, 'validDateEnd');
            }

            saveNoticeInfo(form).then(res => {
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
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy')
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },

      //编辑提交
      editSubmit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            var form = this.form
            if ((form.noticeType === 1 || form.noticeType === 2) && this.select_projects.length < 1) {
              this.$message.error('请选择补贴项目')
              return false
            }

            for (var i = 0; i < this.select_projects.length - 1; i++) {
              for (var j = i + 1; j < this.select_projects.length; j++) {
                if (this.select_projects[i].yearId == this.select_projects[j].yearId) {
                  this.$message.error(this.select_projects[i].projectName + '项目中选择了重复的地区批次，请检查!')
                  throw new Error()
                }
              }
            }

            let projectIds = [];

            let proIds = [];
            let selIds = [];
            let newIds = [];
            this.proList.forEach(item => {
              proIds.push(item.projectId)
            })
            this.select_projects.forEach(item => {
              selIds.push(item.projectId)
            })

            proIds.forEach(item => {
              if (!selIds.includes(item)) {
                newIds.push(item)
              }
            })

            this.proList.forEach(item => {
              if (newIds.includes(item.projectId)) {
                item.hasDelete = 1;
                projectIds.push(item);
              }
            })

            // this.proList.forEach((list,index)=>{
            this.select_projects.forEach(item => {
              if (item.yearId == '' || item.yearId == undefined) {
                this.$message.warning('请选择地区与批次');
                throw new Error()
              }

              let data = {
                areaId: item.areaId,
                yearId: item.yearId,
                projectId: item.projectId,
                hasDelete: item.hasDelete == 1 ? item.hasDelete : undefined,
                isNew: 1
              };
              projectIds.push(data)
            })
            // })

            //去重
            let obj = {}
            projectIds = projectIds.reduce((cur, next) => {
              obj[next.projectId] ? '' : obj[next.projectId] = true && cur.push(next)
              return cur
            }, [])

            form.projectInfoList = projectIds;

            let fileList = ''
            this.fileIdsList.forEach(item => {
              fileList += item + ','
            })
            form.fileIds = fileList;

            editNoticeInfo(form).then(res => {
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
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy')
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },

      // 取消
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
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy')
      },
      // 项目库
      handleProjectListFilter() {
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },

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
          // this.checkProjectIsSelect();
        })
      },

      focusRegBat(list) {
        if (!list.regionBatch) {
          let dataList = []
          this.select_projects.forEach(item => {
            if (item.projectId == list.projectId) {
              list.policyProjectAreaVoList.forEach(msg => {
                msg.areaLevel = msg.areaLevel == 1 ? '国家级' : msg.areaLevel == 2 ? '省级' : msg.areaLevel == 3 ? '市级' : msg.areaLevel == 4 ? '区县级' : msg.areaLevel == 5 ? '镇街级' : ''
                msg.provinceName = msg.provinceName ? '-' + msg.provinceName : ''
                msg.cityName = msg.cityName ? '-' + msg.cityName : ''
                msg.districtName = msg.districtName ? '-' + msg.districtName : ''

                msg.policyProjectYearVoList.forEach(val => {
                  val.applyYear = val.applyYear ? '-' + val.applyYear : ''
                  val.applyBatchNo = val.applyBatchNo == '0' ? '-未指定' : val.applyBatchNo == '1' ? '-第一批' : val.applyBatchNo == '2' ? '-第二批' : val.applyBatchNo == '3' ? '-第三批' : val.applyBatchNo == '4' ? '-第四批' : val.applyBatchNo == '5' ? '-第五批' : ''

                  let str = {
                    name: msg.areaLevel + msg.provinceName + msg.cityName + msg.districtName + val.applyYear + val.applyBatchNo,
                    areaId: msg.areaId,
                    projectId: item.projectId,
                    yearId: val.yearId,
                    subsidyType: val.subsidyType,
                    subsidyTotal: val.subsidyTotal,
                    realSubsidyPrice: val.realSubsidyPrice
                  }

                  dataList.push(str)
                })
              })
            }
          })
          this.$set(list, 'regionBatch', dataList)
        }
      },

      //新增同项目不同地区批次数据
      addCurProject(row, index) {
        if (row.regionBatch.length > 1) {
          let list = JSON.parse(JSON.stringify(row))
          this.select_projects.splice(index, 0, list)
        }
      },

      //地区选择change
      regBatChange(e, data, i) {
        data.regionBatch.forEach(item => {
          if (item.yearId == e) {
            this.select_projects.forEach((list, index) => {
              if (index == i) {
                list.subsidyType = item.subsidyType
                list.realSubsidyPrice = item.realSubsidyPrice
                list.subsidyTotal = item.subsidyTotal
                list.areaId = item.areaId
                list.yearId = item.yearId
              }
            })
          }
        })
      },

      typeChange(e) {
        this.dataProjectForm.typeIdList = e
        this.getProjectListForType()
        this.getProjectList()
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
      loadMore() {
        this.dataProjectForm.page = this.dataProjectForm.page + 10
        this.getProjectListForType()
      },
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
        // if (this.project_list_query.projectTypes == '' || this.project_list_query.projectTypes == undefined) {
        //   this.project_list_query.projectName = query
        //   this.project_list_query.page = 0
        //   this.project_list_query.pageSize = 10
        //   this.getProjectList()
        // }else{
        //   if (query !== '') {
        //     this.loading = true
        //     setTimeout(() => {
        //       this.loading = false
        //       this.getProjectListForType(query)
        //     }, 200)
        //   } else {
        //     this.loading = true
        //     setTimeout(() => {
        //       this.loading = false
        //       this.getProjectListForType()
        //     }, 200)
        //   }
        // }

      },
      projectChange(e) {
        if (e == '') {
          this.getProjectListForType();
        }
        this.project_list_query.page = 0;
        this.project_list_query.pageSize = 10;
        this.getProjectList()
      },
      areaChange() {
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      // handleProjectSizeChange(val) {
      //   this.project_list_query.pageSize = val
      //   this.getProjectList()
      // },
      handleProjectCurrentChange(val) {
        this.project_list_query.page = val
        this.getProjectList()
      },

      // 检查项目是否已添加
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

      //关闭补贴弹窗
      cloneProjectModal() {
        this.project_table_visible = false;
        this.$refs.dataTable.clearSelection();
      },

      // 显示选择项目列表
      goSelectProject() {
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.project_table_visible = true
        this.holdList = JSON.parse(JSON.stringify(this.select_projects))
        let obj = {};
        this.holdList = this.holdList.reduce((cur, next) => {
          obj[next.projectId] ? '' : obj[next.projectId] = true && cur.push(next);
          return cur
        }, []);
        this.checkProjectIsSelect();
        this.getRegionList()
        if (this.holdList.length !== 0) {
          this.tempProjectsList = JSON.parse(JSON.stringify(this.holdList));
        }
      },

      //确定选择补贴项目
      setProjectList() {
        this.tempProjectsList.forEach(item => {
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
        })

        this.project_table_visible = false
      },

      // 移除项目子项
      removeProjectItem(item, index) {
        this.select_projects.splice(index, 1);
        this.tempProjectsList = JSON.parse(JSON.stringify(this.select_projects));
      },


      changeProvince(val) {
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
      changeCity(val) {
        this.project_list_query.districtId = ''
        this.project_list_query.townId = ''
        this.parentId = val
        this.level = 1
        this.getRegionList()

        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      changeDistrict(val) {
        this.parentId = val
        this.level = 0
        this.getRegionList()

        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      getTownsId(val) {
        this.project_list_query.page = 0
        this.project_list_query.pageSize = 10
        this.getProjectList()
      },
      // 添加项目子项
      // addProjectItem(data) {
      //   if (this.select_projects && this.select_projects.length > 0) {
      //     for (var index_1 in data.policyProjectAreaVoList) {
      //       var item_1 = data.policyProjectAreaVoList[index_1]
      //       // 检查是否已经存在
      //       var is_exist = false
      //       for (var index_2 in this.select_projects) {
      //         var item_2 = this.select_projects[index_2]
      //         if (String(item_1['projectId']) === String(item_2['projectId'])) {
      //           is_exist = true
      //         }
      //       }
      //       if (!is_exist) {
      //         var new_item = JSON.parse(JSON.stringify(item_1))
      //         new_item['is_new'] = true
      //         new_item.projectName = data.projectName
      //         new_item.projectTypeName = data.projectTypeName
      //         new_item.subsidyTotal = new_item.policyProjectYearVoList[0].subsidyTotal
      //         this.select_projects.push(new_item)
      //       }
      //     }
      //   } else {
      //     this.select_projects = JSON.parse(JSON.stringify(data.policyProjectAreaVoList))
      //     this.select_projects.forEach(item => {
      //       item.projectName = data.projectName
      //       item.projectTypeName = data.projectTypeName
      //       // item.subsidyTotal = item.policyProjectYearVoList[0].subsidyTotal;
      //     })
      //   }
      // },

      // 选择政策的列表
      handlerPolicyListFilter() {
        this.policy_list_query.page = 0
        this.policy_list_query.pageSize = 10
        this.getPolicyList()
      },

      //获取政策列表
      getPolicyList() {
        this.policy_table_visible = true
        queryNoticeInfo(this.policy_list_query).then(res => {
          if (res.code == 200) {
            res.data.data.forEach(list => {
              list.projectName = ''
              list.policyNoticeProjectRelVos.forEach(item => {
                list.projectName += `${item.projectName}<br>`
                // if (list.projectName.length > 0) {
                //   list.projectName = list.projectName.substr(0, list.projectName.length - 1)
                // }
              })
            })
            this.policy_list = res.data.data;
            this.policy_list_total = res.data.total;

            // this.policy_list_total = res.data.recordsTotal
          }
        })
      },
      handlePolicySizeChange(val) {
        this.policy_list_query.pageSize = val
        this.getPolicyList()
      },
      handlePolicyCurrentChange(val) {
        this.policy_list_query.page = val
        this.getPolicyList()
      },
      // 选择政策
      addPolicy(data) {
        if ('noticeId' in data) {
          this.form.publishOrgan = data.publishOrgan
          this.form.publishDate = data.publishDate
          this.form.noticeId = data.noticeId
          this.form.rel_policy_name = data.noticeName
          this.form.parentId = data.noticeId // 用于跳转
          this.select_projects = JSON.parse(JSON.stringify(data.projectVoList))
          this.policy_table_visible = false
        }
      },
      // 类型radio切换
      typeRadioChange(val) {
        // this.policyId = {};
        this.form.noticeType = val

        if (val == 1 || val == 2) {
          this.select_projects = this.tempOneTwo
        } else if (val == 3) {
          this.select_projects = this.tempThree
        }
        // this.select_projects = []
      },
      // 跳转政策通知
      toPolicyNotice() {
        if (this.form.noticeId) {
          this.handleRedirect('/policy/addPolicy?is_check=true&noticeId=' + this.form.noticeId)
        }
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PROJECT_TYPE,DICT:SUBSIDYINDUSTRY_TYPE,DICT:PROJECT_TYPE'
        }
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.supply_industry_list = this.supply_industry_list.concat(res.data['DICT:SUBSIDYINDUSTRY_TYPE'])
            this.type_list = res.data['DICT:PROJECT_TYPE']
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
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

      //项目列表加载更多
      getMoreProjectList() {
        this.project_list_query.page = this.project_list_query.page + 10
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

      //政策加载更多
      getMorePolicyList() {
        this.policy_list_query.page = this.policy_list_query.page + 10
        queryNoticeInfo(this.policy_list_query).then(res => {
          if (res.code == 200) {
            res.data.data.forEach(list => {
              list.projectName = ''
              if (list.projectVoList && list.projectVoList.length !== 0) {
                list.projectVoList.forEach(item => {
                  list.projectName += item.projectName + ','
                  if (list.projectName.length > 0) {
                    list.projectName = list.projectName.substr(0, list.projectName.length - 1)
                  }
                })
              }
            })

            this.policy_list = this.policy_list.concat(res.data.data)
            this.policy_list_total = res.data.total
          }
        })
      },


      //关闭项目弹窗
      handleCloseProject() {
        // this.project_list = [];
        // this.project_list_query = {
        //   page: 0,
        //   pageSize: 10
        // }
        this.project_table_visible = false
      },

      noticeHandle(data) {
        this.policyData = data
      },

      //确定选择政策
      setPolicyList() {
        let data = JSON.parse(JSON.stringify(this.policyData));
        if (JSON.stringify(this.policyData) == '{}') {
          this.$message.warning('请选择政策')
        } else {
          if (data.publishOrgan) {
            this.form.publishOrgan = JSON.parse(JSON.stringify(data.publishOrgan))
          }
          this.policyDetail = data;
          this.form.publishDate = data.publishDate
          this.form.noticeId = data.noticeId
          this.form.parentName = data.noticeName
          this.form.parentId = data.noticeId // 用于跳转
          // this.select_projects = this.tempThree = JSON.parse(JSON.stringify(data.projectVoList))
          this.policy_table_visible = false
        }
      },

      isAvailableHandle(val) {
        this.form.stateNum = val
      },


      //政策返回来的数据
      naticeByValue(data) {
        this.form = data;
      },

      //根据政策录入通知的数据
      // policyNoticeData(data) {
      //   this.$set(this.form,'parentName',data);
      // }
    }
  }
</script>

<style lang="less" scoped>
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
    position:relative;
    z-index: 1;
  }
  .qrcode-out {
    position:absolute;
    right: -10px;
    top:40px;
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
        // overflow-y: auto;
      }
    }
  }

  .project-massage {
    .clearfix {
      position: relative;

      .select-project {
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
            width: 90%;
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
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-top: -9px;

                .project-name {
                  white-space: nowrap;
                  margin-bottom: 10px;
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

          .right {
            margin-top: -9px;

            .del-project-btn {
              height: 33px;
              white-space: nowrap;
              border: 0;
              background: #ff0000;
              color: #fff;
              padding: 7px 18px;
              border-radius: 4px;
              font-size: 14px;
              outline: none;
              cursor: pointer;

              &:active {
                opacity: 0.5;
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

  .notice-name {
    display: flex;
    align-items: center;
    margin-left: 47px;
    margin-bottom: 10px;

    .noice-title {
      font-size: 14px;
      font-weight: bold;
      color: #606266;
    }
  }
  .wscnph{
    width: auto;
    max-width:100%;
  }
</style>
