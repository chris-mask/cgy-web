<template>
  <div class="notice-form">
    <!--基本信息-->
    <el-form ref="form" :rules="rules" :model="form" label-width="auto" label-position="left" @submit.native.prevent>
      <el-card class="top-margin-10">
        <div slot="header" class="clearfix">
          <span style="color: #6DDD81; font-weight: bold;width: 3px;">|</span>
          <span class="index-content-title">&nbsp;基本信息</span>
        </div>
        <div>
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
            <el-col :span="20" :offset="2">
              <el-form-item label="备注：">
                <el-input v-if="!isCheck" v-model="form.noticeRemark" type="textarea" :rows="3"
                          placeholder="请输入备注"></el-input>
                <span v-else>{{form.noticeRemark}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-form>

    <!--补贴项目信息-->
    <el-card class="top-margin-10 project-massage">
      <div slot="header" class="clearfix">
        <div>
          <span style="color: #05AAFF; font-weight: bold;width: 3px;">|</span>
          <span>&nbsp;补贴项目信息</span>
        </div>
      </div>
      <div class="list-box">
        <div class="item" v-for="(item,index) in select_projects">
          <div class="main-project">
            <div class="left">
              <div class="index">{{index+1}}</div>
              <div class="form-box">
                <div class="project-form">

                  <div class="project-name">
                    项目名称：{{item.projectName}}
                  </div>

                  <div class="project-sub-list" v-for="(data,index) in item.policyNoticeProjectRelList">
                    <div class="left-sub">
                      <div class="three-input">
                        <div class="project-level">
                          <span class="xin">*</span>项目级别：
                          <!--                          <el-select v-model="data.projectLevel">-->
                          <!--                            <el-option label="国家级" :value="1"></el-option>-->
                          <!--                            <el-option label="省级" :value="2"></el-option>-->
                          <!--                            <el-option label="市级" :value="3"></el-option>-->
                          <!--                            <el-option label="区县级" :value="4"></el-option>-->
                          <!--                            <el-option label="镇街级" :value="5"></el-option>-->
                          <!--                          </el-select>-->
                          <span>{{data.projectLevel==1?'国家级':data.projectLevel==2?'省级':data.projectLevel==3?'市级':data.projectLevel==4?'区县级':data.projectLevel==5?'镇街级':''}}</span>
                        </div>
                        <div class="project-min-subsidy">
                          <span class="xin">*</span>最低补助：
                          <!--                          <el-input v-model="data.subsidyPriceMin" class="money-input" placeholder="最低补助">-->
                          <!--                            <template slot="append">元</template>-->
                          <!--                          </el-input>-->
                          <span>{{data.subsidyPriceMin}}元</span>
                        </div>
                        <div class="project-max-subsidy">
                          <span class="xin">*</span>最高补助：
                          <!--                          <el-input v-model="data.subsidyPriceMax" class="money-input" placeholder="最低补助">-->
                          <!--                            <template slot="append">元</template>-->
                          <!--                          </el-input>-->
                          <span>{{data.subsidyPriceMax}}元</span>
                        </div>
                      </div>
                      <div class="remarks-form">
                        补助详情：
                        <!--                        <el-input v-model="data.subsidyDesc" resize="none" type="textarea"/>-->
                        <span style="white-space: initial;">{{data.subsidyDesc}}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <!--申报条件-->
          <div class="main-declare" v-if="false">
            <div class="title">
              <div class="title-name">申报条件</div>
              <button class="add-term-btn" @click="addTermModal = true">新增条件</button>
            </div>

            <div class="content">
              <div class="list" v-for="(list,index) in 1">
                <div class="list-num">{{index+1}}.</div>
                <div class="list-body">
                  <div class="term-title">
                    <div>政策条件描述：*******</div>
                    <div class="title-btn-group">
                      <button class="btn" @click="addMentModal = true">新增语句</button>
                      <button class="btn">编辑</button>
                      <button class="btn">删除</button>
                    </div>
                  </div>
                  <div class="sub-title">
                    <div>权重：50分</div>
                    <div>匹配类型：自动分配</div>
                    <div>子表达式：true_false(#1>3) and #2</div>
                  </div>
                  <div class="sub-list">
                    <div class="item" v-for="(item,index) in 1">
                      <div class="left">
                        <div>#{{index+1}}.分类：****</div>
                        <div>数据表：****</div>
                        <div>字段：****</div>
                        <div>对比符号：****</div>
                        <div>对比值：****</div>
                        <div>统计：是</div>
                      </div>
                      <div class="right">
                        <button class="btn">编辑</button>
                        <button class="btn">删除</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!--材料清单-->
          <div class="main-declare" style="margin-top: 30px;">
            <div class="title">
              <div class="title-name">材料清单</div>
            </div>

            <div class="content">
              <div class="list" v-for="(material,nums) in item.policyApplyMaterialLists">
                <div class="list-num" style="padding-top: 0;">{{nums+1}}.</div>
                <div class="list-body">
                  <div class="term-title" style="align-items: normal;">

                    <div class="file-type-bar">
                      <div style="width: 33%">附件分类：{{material.materialTypeName}}</div>
                      <div style="width: 33%;padding-right: 20px;">要求：{{material.materialDesc}}</div>
                      <div style="width: 33%" class="file-model">
                        <div style="white-space: nowrap;">模板文件：</div>
                        <ul class="files-list">
                          <li v-for="(childMat,childNum) in material.templateFileIds">
                            {{childNum+1}}.{{childMat.fileName}}
                          </li>
                        </ul>
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
    <el-card class="top-margin-10">
      <div slot="header" class="clearfix">
        <span style="color: #FFA96A; font-weight: bold;width: 3px;">|</span>
        <span class="index-content-title">&nbsp;政策解读</span>
      </div>
      <div>
        <el-row :gutter="12">
          <el-col :span="20" :offset="2">
            <Tinymce v-if="!isCheck" v-model="form.noticeSummary" :height=400 ref="policyNoticeeditor"/>
            <p v-else v-html="form.noticeSummary" class="editorHtml">{{form.noticeSummary}}</p>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!--原文-->
    <el-card class="top-margin-10">
      <div slot="header" class="clearfix">
        <span style="color: #799CFF; font-weight: bold;width: 3px;">|</span>
        <span class="index-content-title">&nbsp;原文</span>
      </div>
      <div>
        <el-row :gutter="12">
          <el-col :span="20" :offset="2">
            <Tinymce v-if="!isCheck" v-model="form.noticeContent" :height=400 ref="policyNoticeeditor2"/>
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

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {saveNoticeInfo, editNoticeInfo, queryNoticeInfo} from '@/api/policy'
  import {addFileBatch, getFileListWithFileIds,ossFileSystemFileDownload} from '@/api/utils.js'
  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {noticeUpload} from '@/utils/uploadPathMethods'


  export default {
    components: {Tinymce},
    props: ['noticeId', 'noticeType', 'policyDetail', 'noticeName', 'noticeDetail'],
    data() {
      return {
        //选中的政策ID
        newNoticeId: '',

        //基本信息--扶持方式
        supply_way_list: [
          {dictName: '事后补偿', dictId: '1'},
          {dictName: '无偿补偿', dictId: '2'},
          {dictName: '其他', dictId: '3'}
        ],

        //新增/编辑--提交的数据
        form: {},

        //上传文件--数组
        fileList: [],

        //
        select_projects: [],

        //判断是否新增
        isCreate: this.$route.query.is_create,

        //判断是否编辑
        isEdit: this.$route.query.is_edit,

        //判读是否详情页
        isCheck: this.$route.query.is_check
      }
    },

    activated() {
      //判断是否修改跳转进来
      // if (this.$route.query.is_edit || this.$route.query.is_check) {
      //   this.setTime();
      //
      // }
    },

    methods: {
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

            //监听是否选择相关政策
            if (this.$route.query.is_create) {
              if (this.noticeId == undefined || this.noticeId == '' || this.noticeId == null) {
                this.$message.warning('请选择相关政策');
                return
              }
            }


            //上传文件数据重组
            if (this.fileList.length !== 0) {
              let file = this.fileList.map(item => {
                return item.fileId
              });

              this.form.fileIds = file.join(',');
            } else {
              this.form.fileIds = ""
            }


            //监听 补助项目信息+补助项目信息-数据重组
            let selectArr = []
            this.select_projects.forEach(item => {
              item.policyNoticeProjectRelList.forEach(data => {
                let obj = {
                  projectId: data.projectId,
                  projectLevel: data.projectLevel,
                  projectYear: this.form.projectYear,
                  subsidyDesc: data.subsidyDesc,
                  subsidyPriceMin: "",
                  subsidyPriceMax: "",
                };
                selectArr.push(obj)
              })
            });
            this.form.policyNoticeProjectRelList = selectArr;

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
                  this.$refs.policyNoticeeditor.setContent("");
                  this.$refs.policyNoticeeditor2.setContent("");
                  // this.$store.commit('SET_POLICY_SCROLL', 0)
                  this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/policy')
                }
              })
            } else {
              this.form.parentId = this.noticeId;
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
                  this.$refs.policyNoticeeditor.setContent("");
                  this.$refs.policyNoticeeditor2.setContent("");
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

      // 获取详情--解决赋值慢问题
      // setTime() {
      //   if (this.$route.query.is_edit || this.$route.query.is_check) {
      //     setTimeout(() => {
      //       if (JSON.stringify(this.noticeDetail) !== '{}') {
      //         if (this.noticeType == 3) {
      //
      //           //详情数据赋值到form
      //           this.form = this.noticeDetail;
      //
      //
      //           let obj = {
      //             noticeId: this.noticeDetail.parentId, page: 0, pageSize: 10
      //           }
      //           queryNoticeInfo(obj).then(res => {
      //             if (res.code == 200) {
      //               //处理接口返回来的 补助信息 数据
      //               this.select_projects = res.data.data[0].policyNoticeProjectRelVos.map(item => {
      //                 item.policyNoticeProjectSubsidyOrTimeVos.forEach(data => {
      //                   data.projectId = item.projectId
      //                 })
      //                 item.policyNoticeProjectRelList = item.policyNoticeProjectSubsidyOrTimeVos;
      //                 return item;
      //               });
      //               this.$emit('policyNoticeData', res.data.data[0].noticeName)
      //             }
      //           });
      //
      //           //获取文件详情方法
      //           if (this.form.fileIds && this.form.fileIds !== "") {
      //             this.getFileDetail(this.form.fileIds)
      //           }
      //         }
      //
      //       } else {
      //         this.setTime();
      //       }
      //     }, 50);
      //   }
      // },

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
          this.$refs.policyNoticeeditor.setContent("");
          this.$refs.policyNoticeeditor2.setContent("");
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
      }

    },
    watch: {
      policyDetail(newVal, oldValue) {
        if (newVal !== undefined && JSON.stringify(newVal) !== '{}') {
          this.form = newVal;
          let obj = {
            noticeId: this.noticeDetail.parentId, page: 0, pageSize: 10,noticeType: 1
          };

          queryNoticeInfo(obj).then(res => {
            if (res.code == 200) {
              //处理接口返回来的 补助信息 数据
              this.select_projects = this.form.policyNoticeProjectRelVos.map(item => {
                item.policyNoticeProjectSubsidyOrTimeVos.forEach(data => {
                  data.projectId = item.projectId;
                });
                item.policyNoticeProjectRelList = item.policyNoticeProjectSubsidyOrTimeVos;

                if (item.policyApplyMaterialListVos) {
                  if (item.policyApplyMaterialListVos.length !== 0) {
                    item.policyApplyMaterialLists = item.policyApplyMaterialListVos.map(item => {
                      if (item.templateFileIds && item.templateFileIds !== "") {
                        item.templateFileIds = item.templateFileIds.split(',');
                        getFileListWithFileIds({fileIds: item.templateFileIds, haveView: false}).then(res => {
                          if (res.code == 200) {
                            item.templateFileIds = res.data;
                          } else {
                            this.$message.warning(res.message)
                          }
                        })
                      }
                      return item;
                    });
                  } else {
                    this.$set(item, 'policyApplyMaterialLists', [])
                  }
                }
                return item;
              });

              //处理接口返回来的 补助信息 数据
              this.form.policyNoticeProjectTimeRelVos.forEach(item => {
                if (item.policyNoticeProjectTimeVos.length !== 0) {
                  item.policyNoticeProjectTimeVos.forEach(data => {
                    // this.form.projectYear = JSON.stringify(data.projectYear);
                    this.$set(this.form, 'projectYear', JSON.stringify(data.projectYear))
                  });
                }
              });

              // this.$emit('policyNoticeData', res.data.data[0].noticeName)
            }
          });
        }
      }
    }
  }
</script>

<style lang="less">
  ul li{
    list-style: none;
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

                  .file-type-bar {
                    width: 90%;
                    display: flex;

                    .file-model {
                      display: flex;

                      .files-list {
                        li {
                          margin-bottom: 5px;

                          &:last-child {
                            margin-bottom: 0;
                          }
                        }

                        .icon-del-file {
                          margin-left: 4px;
                          cursor: pointer;
                          color: red;
                        }
                      }
                    }
                  }
                }

                .sub-title {
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  margin: 5px 0;

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
                        flex: 1;
                        white-space: nowrap;
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

  .editorHtml{
    .wscnph{
      width: auto;
      max-width:100%;
    }
    .zw{
      line-height: 26px;
    }
    p,li,span {
      line-height: 26px;
    }

  }
</style>
