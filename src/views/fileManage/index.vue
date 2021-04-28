<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">

      <!--搜索-->
      <el-card class="box-card">
        <div class="searchCont">
          <el-input v-model="fileForm.fileName" placeholder="请输入文件名" @keyup.enter.native="goSearch"></el-input>
          <el-button type="primary" class="btn bt_blue" @click="goSearch"><span class="bt_font">搜一下</span></el-button>
        </div>
      </el-card>

      <!--列表-->
      <div class="main-list">
        <!--左侧-树---->
        <el-card class="left-file">
          <div slot="header" class="header-file-top">
            <div
              style="display: flex;align-items: center;font-size: 13px;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">
              <div style="cursor: pointer;" @click="masterPathHandle">根目录 /</div>

              <div style="cursor: pointer;" v-if="treePath.data && treePath.data.parentId == 0">
                <span :title="treePath.data.folderName">{{treePath.data.folderName}}</span>
              </div>
              <div style="display: flex;width: 100%;text-overflow: ellipsis;overflow:hidden;white-space: nowrap;"
                   v-else>
                <div @click="parentHandle(treePath.parent)" style="cursor: pointer;"
                     v-if="treePath.parent && treePath.parent.data.folderName !== ''"
                >
                  <span :title="treePath.parent.data.folderName">{{treePath.parent.data.folderName}}</span>
                </div>
                <div style="cursor: pointer;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                     v-if="treePath.data && treePath.data.folderName !==''"
                >
                  /<span :title="treePath.data.folderName">{{treePath.data.folderName}}</span>
                </div>
              </div>
            </div>

            <i class="icon-file el-icon-folder-opened" @click="goFileType" v-if="allowFileType"></i>
          </div>
          <div>
            <el-tree :data="treeData"
                     node-key="folderId"
                     @node-expand="getChildData"
                     @node-click="nodeHandle"
                     :highlight-current="true"
                     :expand-on-click-node="false"
                     ref="tree"
                     class="tree-list"
            >
              <span style="text-overflow: ellipsis;overflow: hidden;" slot-scope="{ node, data }">
        <span :title="node.label">{{node.label}}</span>
    </span>
            </el-tree>
          </div>
        </el-card>

        <!--右侧-->
        <el-card class="box-card cardCont">
          <div slot="header" class="headerTop">
            <div class="headerLeft">
              <span>搜索到<span>{{total}}</span>条记录</span>
              <span style="margin-left: 10px;"
                    v-if="checkList.length > 0">已选中<span>{{checkList.length}}</span>条记录</span>
              <div class="headBtn">
                <el-button type="primary" class="btn allChoose" size="small" @click="allCheck">全选</el-button>
                <el-button class="btn allDelete" size="small" @click="deleteFile(checkList,1)"
                           v-if="allowDelete.twoAllow">删除
                </el-button>
                <el-button
                  type="primary"
                  class="btn allChoose"
                  @click="openAddFile"
                  v-if="activeTreeData.folderId && activeTreeData.folderId !== '' && allowAdd.twoAllow">
                  新增
                </el-button>
              </div>
            </div>
            <div class="headerRig">
              <el-select v-model="value" placeholder="默认排序" @change="handledSelect" clearable>
                <el-option
                  v-for="item in orderList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="dataList">
            <el-checkbox-group v-model="checkList">
              <div class="dataBox" v-for="(item,index) in fileDataList" :key="item.fileId">
                <div class="dataBoxLeft">
                  <el-checkbox :label="item.fileId">
                    <div class="dataLeft">
                      <div class="fileType fileDoc"
                           :class="item.fileType == 'docx' ? 'fileDoc' :
                         item.fileType == 'xlsx' ? 'fileXls' :
                         item.fileType == 'ppt' ? 'filePpt' :
                         item.fileType == 'pdf' ? 'filePdf' :
                         item.fileType == 'jpg' || item.fileType == 'jpeg' ? 'fileJpg' :
                         item.fileType == 'png' ? 'filePng' : 'fileDoc' ">
                        .{{item.fileType}}
                      </div>
                      <div class="dataDetail">
                        <p>
                          <span :title="item.fileName">{{item.fileName}}</span>
                          <img v-if="allowDownload.twoAllow&&item.password&&item.password.length>0" @click="downloadFile(item)" class="down-img"
                               src="../../../static/pw-down-img.png"/>
                          <img v-else-if="allowDownload.twoAllow" @click="downloadFile(item)" class="down-img"
                               src="../../../static/down-img.png"/>
                        </p>
                        <div class="dataMsg">
                          <span>文件分类：{{item.folderName}}</span>
                          <span>上传日期：{{item.createTime}}</span>
                          <span>上传人：{{item.uploadUserName}}</span>
                          <span :title="item.fileDesc">备注：{{item.fileDesc}}</span>
                        </div>
                      </div>
                    </div>
                  </el-checkbox>
                </div>
                <div class="dataBoxRig">
                  <div class="btnMt" v-if="allowUpdate.twoAllow">
                    <el-button class="primary" plain icon="el-icon-edit" size="small"
                               @click="openEdit(item,item.fileId)">编辑
                    </el-button>
                  </div>
                  <div class="btnMt" v-if="allowDelete.twoAllow">
                    <el-button type="danger" plain icon="el-icon-delete" size="small" @click="deleteFile(item,0)">删除
                    </el-button>
                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </div>
          <div class="noMore" style="cursor: pointer" v-if="total - fileDataList.length > 0" @click="getMore">
            点击加载更多
          </div>
          <div class="noMore" v-else>
            没有更多
          </div>
        </el-card>
      </div>

      <!--置顶-->
      <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
        <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
          <img src="../icons/enterprise/back_top.png" alt="">
        </a>
      </div>
    </div>

    <!--新增/编辑--弹窗-->
    <el-dialog
      :title="isEditModal?'编辑文件':'新建文件'"
      :visible.sync="dialogVisible"
      width="30%"
      v-dialogDrag
      :before-close="handleClose">
      <div>
        <el-form ref="folderMgtDto" :model="folderMgtDto" :rules="rules" class="demo-ruleForm">
          <el-form-item label="文件分类:">

            <div v-if="!isEditModal">
              <span v-if="activeTreeData.parentFolderName == ''">{{activeTreeData.folderName}}</span>
              <span v-else>{{activeTreeData.parentFolderName}}/{{activeTreeData.folderName}}</span>
            </div>
            <div v-else>
              {{filePathName}}
            </div>

          </el-form-item>

          <el-form-item>
            <div style="font-weight: bold"><span style="color: red;">*</span> 文件上传:</div>
            <ul class="file-list" v-if="filesList.length!==0">
              <li v-for="(item,index) in filesList">
                {{item.fileName}}
              </li>
            </ul>

            <el-upload
              :http-request.stop="handleFilesUpload"
              class="image-uploader"
              :file-list="filesList"
              :show-file-list="false"
              action="">
              <el-button size='small' type="primary" :disabled="upFileLoad" style="margin-left:10px;margin-right:36px;">文件上传</el-button>
            </el-upload>
            <p style="margin-bottom: 10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
          </el-form-item>

          <span v-if="allowSetPassword.twoAllow">
            <el-form-item label="新密码:" prop="password">
              <el-input type="password" size='small' class="searchInput" :rows="3" v-model="folderMgtDto.password"
                        placeholder="请输入新密码" maxLength="100"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="confirmPassword">
              <el-input type="password" size='small' class="searchInput" :rows="3" v-model="folderMgtDto.confirmPassword"
                        placeholder="请输入确认密码" maxLength="100"></el-input>
            </el-form-item>
          </span>

          <el-form-item label="备注:" prop="fileDesc">
            <el-input size='small' class="searchInput" :rows="3" v-model="folderMgtDto.fileDesc"
                      placeholder="备注" maxLength="1000" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDio">取 消</el-button>
        <el-button type="primary" @click="submit('folderMgtDto')" v-if="!isEdit">确 定</el-button>
        <el-button type="primary" @click="editFile('folderMgtDto')" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    folderManagementListTree,
    uploadFile,
    updateFile,
    getFileDetail,
    deleteFile,
    getFileDownload,
    getFileList,
    getFolderListOrChildList,
    addFile
  } from '@/api/fileManage'

  import {addFileBatch} from '@/api/utils.js';
  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {fileManage} from '@/utils/uploadPathMethods'


  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.folderMgtDto.password && value === '') {
          callback(new Error('请输入新密码'))
        } else if (this.folderMgtDto.password && value !== this.folderMgtDto.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        btnFlag: 0,
        fileForm: {
          fileName: '',
          page: 0,
          pageSize: 200,
          orderField: '',
          orderType: '',
          folderId: '',
          companyId: this.$store.getters.companyId
        },
        rules: {
          fileName: [
            {required: true, message: '请上传文件', trigger: 'blur'}
          ],
          folderId: [
            {required: true, message: '请选择文件分类', trigger: 'blur'}
          ],
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          password: [
            // { required: true, message: '请输入新密码', trigger: 'blur' },
            {min: 6, max: 16, message: '密码长度不能小于6位，不能大于16位', trigger: 'blur'},
          ],
          confirmPassword: [
            { validator: validatePass, trigger: 'blur' },
            // { required: true, message: '请输入确认密码', trigger: 'blur' },
            {min: 6, max: 16, message: '密码长度不能小于6位，不能大于16位', trigger: 'blur'},
          ]
        },
        checkList: [],
        fileList: [],
        dialogVisible: false,
        typeList: [],
        folderMgtDto: {
          page: 0,
          pageSize: 1000,
          folderId: '',
          fileName: '',
          fileDesc: '',
        },
        limitNum: 1,
        upFileLoad: false,
        fileTemp: '',
        isEdit: false,
        orderList: [
          {
            label: '分类名升序', value: 'folderName', type: 'ASC', id: 1
          },
          {
            label: '分类名降序', value: 'folderName', type: 'DESC', id: 2
          },
          // {
          //   label: '文件上传人升序', value: 'uploadUserName', type: 'ASC', id: 3
          // },
          // {
          //   label: '文件上传人降序', value: 'uploadUserName', type: 'DESC', id: 4
          // },
          {
            label: '上传日期顺序', value: 'createTime', type: 'ASC', id: 5
          },
          {
            label: '上传日期倒序', value: 'createTime', type: 'DESC', id: 6
          },
          // {
          //   label: '文件格式类型升序', value: 'fileType', type: 'ASC', id: 7
          // },
          // {
          //   label: '文件格式类型降序', value: 'fileType', type: 'DESC', id: 8
          // },
          // {
          //   label: '文件大小升序', value: 'fileSize', type: 'ASC', id: 9
          // },
          // {
          //   label: '文件大小降序', value: 'fileSize', type: 'DESC', id: 10
          // },
        ],
        fileDataList: [],
        value: '',
        total: 0,
        isAll: false,


        //左侧树--传参数
        treeParam: {
          page: 0,
          pageSize: 100,
        },
        //左侧树--数据
        treeData: [],
        //新增/编辑文件--获取的子级临时传值
        tempChildData: [],
        //目录路径
        treePath: {},
        //判断是否显示路径
        isTreePath: false,

        filesList: [],

        //当前选中树的值
        activeTreeData: {},

        //判断新增/编辑点击(新增：false,编辑：true)
        isEditModal: true,

        //获取详情--路径名称
        filePathName: "",


        allowAdd: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:INSERT'),//文件上传
        allowDetail: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:DETAILS'),//查看文件详情
        allowDownload: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:DOWNLOAD'),//下载文件
        allowUpdate: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:UPDATE'),//修改文件
        allowDelete: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:DELETE'),//删除文件
        allowGetList: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:LIST'),//文件列表
        allowExport: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:EXPORT'),//导出文件列表

        allowFileType: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:FILECLASS'),//文件分类
        allowSetPassword: this.authorityControl('SYSTEM:FILE:MANAGE', 'SYSTEM:FILE:LIBRARY', 'SYSTEM:FILE:LIBRARY:SETPASSWORD'),//设置密码
      }
    },
    mounted() {
      this.getTreeData();
      this.getFileList();
    },
    activated() {
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    props: {
      changeOnSelect: {
        default: false
      }
    },
    methods: {
      // 回到顶部
      backTop() {
        const that = this
        const timer = setInterval(() => {
          const ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop =
            that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop() {
        const that = this // 缓存当前this
        const scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scroll_top
        if (that.scrollTop > 0) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },

      //获取文件列表
      getFileList() {
        if (this.allowGetList.twoAllow) {
          getFileList(this.fileForm).then(res => {
            if (res.code == 200) {
              if (this.fileForm.page > 0) {
                this.fileDataList = this.fileDataList.concat(res.data.data)
              } else {
                this.fileDataList = res.data.data
                this.checkList = [];
              }

              this.total = res.data.total
            } else {
              this.$message.warning(res.message);
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取此列表')
        }
      },

      //搜索
      goSearch() {
        this.fileForm.page = 0;
        this.getFileList();
      },

      //分页
      getMore() {
        this.fileForm.page = this.fileForm.page + 20;
        this.getFileList()
      },

      //删除文件  0-删除单个，1-批量删除
      deleteFile(item, num) {
        if (item == '' || item == undefined) {
          this.$message.warning('请选择需要删除的文件');
          return;
        }

        let fileList = [];
        if (num == 0) {
          let fileBox = {
            fileId: item.fileId,
            folderId: item.folderId
          }

          fileList.push(fileBox)
        } else {
          item.forEach(data => {
            this.fileDataList.forEach(list => {
              if (data == list.fileId) {
                let fileBox = {
                  fileId: list.fileId,
                  folderId: list.folderId
                }

                fileList.push(fileBox)
              }
            })
          })
        }

        if (fileList.length == 0 || fileList == '') {
          this.$message.warning('请选择需要删除的文件');
          return;
        }

        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            companyId: this.$store.getters.companyId,
            fileList: fileList,
          }

          deleteFile(params).then(res => {
            if (res.code == 200) {
              if (res.data == false) {
                this.$message.success('某些文件没有删除权限，只删除了有权限的文件');
                this.getFileList();
              } else {
                this.$message.success('删除成功');
                this.getFileList();
              }
            } else {
              this.$message.warning(res.message);
            }
          })
        })
      },
      //打开新建弹窗
      openAddFile() {
        this.getCateList();
        this.isEditModal = false;
        this.dialogVisible = true
      },
      // 关闭弹窗
      handleClose(done) {
        this.dialogVisible = false;
        this.folderMgtDto = {
          page: 1,
          pageSize: 1000,
          folderId: '',
          fileName: '',
          fileDesc: ''
        }
        this.filesList = [];
        if (this.isEdit) {
          this.isEdit = !this.isEdit
        }
      },

      //打开编辑弹窗
      openEdit(data, id) {
        this.getCateList();
        this.isEditModal = true;
        this.isEdit = true;
        let params = {
          fileId: id,
          companyId: this.$store.getters.companyId
        }
        if (this.allowDetail.twoAllow) {
          getFileDetail(params).then(res => {
            if (res.code == 200) {
              this.filesList.push(res.data);
              this.folderMgtDto = res.data;
              this.filePathName = res.data.parentFolderName.join('/');
            } else {
              this.$message.warning(res.message);
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取此详情')
        }
        this.dialogVisible = true
      },

      // 新增/编辑文件--获取分类列表
      getCateList() {
        getFolderListOrChildList(this.folderMgtDto).then(res => {
          if (res.code == 200) {
            this.typeList = res.data.data.map(item => {
              item.label = item.folderName;
              item.value = item.folderId;
              item.child = [];
              return item;
            });
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      UploadUrl() {
        return '/api/filelibrary/appFile/uploadFile' // 返回需要上传的地址
      },

      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
        const size = file.size / 1024 / 1024
        this.fileTemp = ''
        this.fileList = []
        // if(extension !== 'xlsx') {
        //   this.$message.warning('只能上传后缀是.xlsx的文件');
        //   this.fileTemp = '';
        //   this.fileList = [];
        // }
        if (size > 10) {
          this.$message.warning('文件大小不得超过10M');
          this.fileTemp = '';
          this.fileList = [];
        }

      },

      // 文件状态改变时的钩子
      fileChange(file, fileList) {
        this.fileTemp = '';
        this.folderMgtDto.fileName = '';
        this.fileList = [];
        let filename = file.raw.name.substr(file.raw.name.lastIndexOf("."));
        if (file.name.length >= 150) {
          this.$message('文件名称超长，请检查');
          return;
        }
        if (filename == '.msi') {
          this.$message({type: 'warning', message: '不支持上传msi文件'});
          return;
        }
        if (filename == '.vbs') {
          this.$message({type: 'warning', message: '不支持上传vbs文件'});
          return;
        }
        if (filename == '.cmd') {
          this.$message({type: 'warning', message: '不支持上传cmd文件'});
          return;
        }
        if (filename == '.bat') {
          this.$message({type: 'warning', message: '不支持上传bat文件'});
          return;
        }
        if (filename == '.scr') {
          this.$message({type: 'warning', message: '不支持上传scr文件'});
          return;
        }
        if (filename == '.reg') {
          this.$message({type: 'warning', message: '不支持上传reg文件'});
          return;
        }
        if (filename == '.obj') {
          this.$message({type: 'warning', message: '不支持上传obj文件'});
          return;
        }
        if (filename == '.ddl') {
          this.$message({type: 'warning', message: '不支持上传ddl文件'});
          return;
        }
        if (filename == '.sys') {
          this.$message({type: 'warning', message: '不支持上传sys文件'});
          return;
        }
        if (filename == '.apk') {
          this.$message({type: 'warning', message: '不支持上传apk文件'});
          return;
        }
        if (filename == '.o') {
          this.$message({type: 'warning', message: '不支持上传o文件'});
          return;
        }
        if (filename == '.c') {
          this.$message({type: 'warning', message: '不支持上传c文件'});
          return;
        }
        if (filename == '.h') {
          this.$message({type: 'warning', message: '不支持上传h文件'});
          return;
        }
        if (filename == '.sh') {
          this.$message({type: 'warning', message: '不支持上传sh文件'});
          return;
        }
        if (filename == '.so') {
          this.$message({type: 'warning', message: '不支持上传so文件'});
          return;
        }
        if (filename == '.out') {
          this.$message({type: 'warning', message: '不支持上传out文件'});
          return;
        }
        if (filename == '.coff') {
          this.$message({type: 'warning', message: '不支持上传coff文件'});
          return;
        }
        if (file.raw.type == 'text/javascript') {
          this.$message({type: 'warning', message: '不支持上传js文件'});
          return;
        }
        if (file.raw.type == 'application/x-msdownload') {
          this.$message({type: 'warning', message: '不支持上传exe文件'});
          return;
        }
        if (file.raw.type == 'application/x-msdownload') {
          this.$message({type: 'warning', message: '不支持上传exe文件'});
          return;
        }

        this.fileTemp = file.raw

        if (this.fileTemp) {
          this.folderMgtDto.fileName = file.name
          this.importMaterielList(this.fileTemp)
        } else {
          this.$message({
            type: 'warning',
            message: '请上传文件！'
          });
          this.fileTemp = '';
          this.fileList = []
        }
      },

      // 文件超出个数限制时的钩子
      exceedFile(files, fileList) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
      },

      // 上传
      importMaterielList(obj) {
        this.fileTemp = obj
        // uploadFilesOss(obj,'测试/文件上传')
      },

      // 新建文件
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.filesList.length == 0) {
              this.$message.warning('请选择文件');
              return;
            }

            let file = this.filesList[0];

            const formData = new FormData();
            formData.append('fileDesc', this.folderMgtDto.fileDesc);
            formData.append('fileId', file.fileId);
            formData.append('filePath', file.filePath);
            formData.append('fileName', file.fileName);
            formData.append('fileType', file.fileType);
            formData.append('fileSize', file.fileSize / 1024);
            formData.append('folderId', this.activeTreeData.folderId);
            formData.append('folderName', this.activeTreeData.folderName);
            formData.append('parentType', 3);
            formData.append('password', this.folderMgtDto.password?this.folderMgtDto.password:'');

            this.upFileLoad = true;
            addFile(formData).then(res => {
              if (res.code == 200) {
                this.upFileLoad = false;
                this.$message({
                  type: 'success',
                  message: '提交成功！'
                })
                this.getFileList();
                this.fileTemp = ''
                this.filesList = [];
                this.folderMgtDto = {
                  page: 1,
                  pageSize: 1000,
                  folderId: '',
                  fileName: '',
                  fileDesc: ''
                }
                this.dialogVisible = false
              } else {
                this.upFileLoad = false;
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          }
        })
      },

      //编辑提交
      editFile(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.filesList.length == 0) {
              this.$message.warning('请选择文件');
              return;
            }

            let file = this.filesList[0];
            const formData = new FormData();

            formData.append('companyId', this.$store.getters.companyId);
            formData.append('fileDesc', this.folderMgtDto.fileDesc);
            formData.append('fileId', this.folderMgtDto.fileId);
            formData.append('filePath', file.filePath);
            formData.append('fileName', file.fileName);
            formData.append('fileType', file.fileType);
            formData.append('fileSize', file.fileSize / 1024);
            formData.append('folderId', this.folderMgtDto.folderId);
            formData.append('folderName', this.folderMgtDto.folderName);
            formData.append('parentType', 3);
            formData.append('password', this.folderMgtDto.password?this.folderMgtDto.password:'');

            this.upFileLoad = true;
            updateFile(formData).then(res => {
              if (res.code == 200) {
                this.upFileLoad = false;
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.getFileList();
                this.fileTemp = ''
                this.filesList = [];
                this.folderMgtDto = {
                  page: 1,
                  pageSize: 1000,
                  folderId: '',
                  fileName: '',
                  fileDesc: ''
                }
                this.dialogVisible = false
                this.isEdit = false
              } else {
                this.upFileLoad = false;
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            })
          }
        })
      },

      //下载文件
      downloadFile(item) {
        // 下载文件参数
        var params = {
          companyId: this.$store.getters.companyId,
          fileId: item.fileId
        }
        // 检查文件是否设置密码
        if(item && item.password && item.password.length>0){ // 设置密码
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(value!==item.password){
              this.$message({
                type: 'info',
                message: '密码错误'
              });
            }else{
              this.handleDownloadFile(params)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消下载'
            });
          });
        }else{ // 无设置密码
          this.handleDownloadFile(params)
        }
      },

      // 处理--下载文件请求
      handleDownloadFile(params){
        getFileDownload(params).then(res => {
          if (res.code === 200) {
            let url = res.data.fileUrl.replace(/http/,'https')
            window.open(url)
            this.$message({type: 'success', message: '下载成功'});
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      handledSelect(e) {
        if (e == '') {
          this.fileForm.orderField = '';
          this.fileForm.orderType = '';
        } else {
          this.orderList.forEach(item => {
            if (item.id == e) {
              this.fileForm.orderField = item.value;
              this.fileForm.orderType = item.type;
            }
          })
        }

        this.getFileList();
      },

      //关闭弹窗
      cancelDio() {
        this.dialogVisible = false;
        this.fileTemp = ''
        this.filesList = [];
        this.folderMgtDto = {
          page: 1,
          pageSize: 1000,
          folderId: '',
          fileName: '',
          fileDesc: ''
        }
        if (this.isEdit) {
          this.isEdit = !this.isEdit
        }
      },

      //全选
      allCheck() {
        if (!this.isAll) {
          this.checkList = [];
          this.fileDataList.forEach(item => {
            this.checkList.push(item.fileId)
          })

          this.isAll = !this.isAll
        } else {
          this.checkList = [];
          this.isAll = !this.isAll
        }

      },


      //树列表--获取树列表
      getTreeData() {
        getFolderListOrChildList(this.treeParam).then(res => {
          if (res.code === 200) {
            this.treeData = res.data.data.map(item => {
              item.label = item.folderName;
              item.children = [{}];
              return item;
            })
          }
        })
      },

      //树列表--点击三角形获取子级数据
      getChildData(data, node) {
        this.treeParam.parentId = data.folderId;
        // 检查文件夹是否设置密码
        if(data && data.password && data.password.length >0){ // 设置密码
          this.$prompt('请输入密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {
            if(value!==data.password){
              this.$message({
                type: 'info',
                message: '密码错误'
              });
            }else{
              this.handleGetChildData(data, node);
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消打开目录'
            });
          });
        }else { // 无设置密码
          this.handleGetChildData(data, node);
        }
      },

      // 处理---树列表--点击三角形获取子级数据请求
      handleGetChildData(data, node){
        getFolderListOrChildList(this.treeParam).then(res => {
          if (res.code === 200) {
            if (res.data.data.length == 0) {
              this.$message.warning('当前目录下没有子目录');
              this.$refs.tree.store.nodesMap[data.folderId].expanded = false;
            } else {
              data.children = res.data.data.map(item => {
                item.label = item.folderName;
                item.children = [{}];
                return item;
              });
            }
          }
        })
      },

      //树列表--点击--获取右侧栏文件数据
      nodeHandle(data, node) {
        this.fileForm.folderId = data.folderId;

        //获取到当前选中的值
        this.activeTreeData.folderId = data.folderId;
        this.activeTreeData.folderName = data.folderName
        if (data.parentId != 0) {
          this.activeTreeData.parentFolderName = node.parent.data.folderName;
          this.activeTreeData.parentFolderId = node.parent.data.folderId;
        } else {
          this.activeTreeData.parentFolderName = '';
          this.activeTreeData.parentFolderId = '';
        }

        //未见列表
        this.getFileList();
        // 目录路径
        this.treePath = node;
        //显示路径
        this.isTreePath = true;
      },

      //点击根目录
      masterPathHandle() {
        this.treeParam = {
          page: 0,
          pageSize: 100,
        }
        this.fileForm = {
          fileName: '',
          page: 0,
          pageSize: 200,
          orderField: '',
          orderType: '',
          folderId: '',
          companyId: this.$store.getters.companyId
        }
        this.getTreeData();
        this.getFileList();
        this.treePath = {};
        this.activeTreeData = {};
      },

      //点击父级
      parentHandle(params) {
        this.$refs.tree.setCurrentKey(params.data.folderId);
        this.fileForm.folderId = params.data.folderId;
        this.getFileList();
        this.treePath = params;
      },


      //上传文件
      handleFilesUpload(option) {
        if (option.file.name.length >= 150) {
          this.$message.error('文件名称超长，请检查');
          this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
          return;
        }

        // 调用 ali-oss 中的方法
        let index = option.file.name.lastIndexOf(".")
        let fileName = option.file.name.substring(0,index);
        let fileType = option.file.name.substring(index+1,option.file.name.length);

        let filePath;
        if (!this.isEditModal) {
          if (this.activeTreeData.parentFolderName && this.activeTreeData.parentFolderName !== '') {
            if (!this.activeTreeData.parentFolderName || this.activeTreeData.parentFolderName == '') {
              this.$message.error('文件夹名称为空，请检查');
              this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
              return;
            }
            filePath = fileManage(this.activeTreeData.parentFolderName, this.activeTreeData.folderName, fileName) + '.' + fileType;
          } else {
            if (!this.activeTreeData.folderName || this.activeTreeData.folderName == '') {
              this.$message.error('文件夹名称为空，请检查');
              this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
              return;
            }
            filePath = fileManage(this.activeTreeData.folderName, '', fileName) + '.' + fileType;
          }
        } else {
          if (this.folderMgtDto.parentFolderName.length !== 0) {
            if (!this.activeTreeData.parentFolderName || this.activeTreeData.parentFolderName == '') {
              this.$message.error('文件夹名称为空，请检查');
              this.declareFileList = JSON.parse(JSON.stringify(this.declareFileList))
              return;
            }
            if (this.folderMgtDto.parentFolderName.length == 1) {
              filePath = fileManage(this.folderMgtDto.parentFolderName[0], '', fileName) + '.' + fileType;
            } else {
              let newArr = JSON.parse(JSON.stringify(this.folderMgtDto.parentFolderName));
              newArr.splice(0, 1);
              if (newArr.length > 1) {
                newArr.join('/');
                filePath = fileManage(this.folderMgtDto.parentFolderName[0], newArr, fileName) + '.' + fileType;
              } else {
                filePath = fileManage(this.folderMgtDto.parentFolderName[0], newArr[0], fileName) + '.' + fileType;
              }
            }
          }
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
                this.filesList = response.data;
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

      //删除文件
      delFileHandle(index) {
        this.filesList.splice(index, 1);
      },

      //跳转到文件库
      goFileType() {
        this.$router.push({
          path: '/file/fileType'
        })
      },

    }
  }
</script>

<style lang="less" scoped>
  ul li {
    list-style: none;
  }

  /deep/ .el-form-item {
    display: flex;
    margin-right: 14px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    display: flex;
  }

  /deep/ .el-form-item__label {
    min-width: 75px;
  }

  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 5%;
  }

  .searchCont {
    display: flex;
    justify-content: center;
    max-width: 740px;
    margin: 0 auto;

    /deep/ .el-input__inner {
      height: 100%;
      border-radius: 0;
      border: 1px solid #05AAFF;
    }

    .el-input {
      flex: 1;
    }

    .btn {
      border: 0;
      border-radius: 0;
    }

    .addBtn {
      margin-left: 45px;
    }

    .el-button {
      width: 120px;
    }
  }

  .hotSearch {
    display: flex;
    align-items: center;
    max-width: 740px;
    margin: 0 auto;

    p {
      font-size: 12px;
      color: #042B40;
    }

    span {
      font-size: 12px;
      color: #979797;
      margin-right: 18px;
    }
  }

  .box-card {
    margin-bottom: 14px;
  }

  .bt_blue {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  /deep/ .el-card__header {
    padding: 10px 20px;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);

      span {
        color: #F56C6C;
      }
    }

    .headBtn {
      margin-left: 40px;

      .allChoose {
        padding: 6px 8px;
        font-size: 16px;
        color: #05AAFF;
        border: 1px solid #05AAFF;
        background-color: #fff;
        border-radius: 2px;
      }

      .allDelete {
        padding: 6px 8px;
        font-size: 16px;
        color: #fff;
        border: 1px solid #FF8585;
        background-color: #FF8585;
        border-radius: 2px;
      }
    }
  }

  .headerRig {
    /deep/ .el-select .el-input__inner {
      border: none;
    }
  }

  .cardCont {
    /deep/ .el-card__body {
      padding: 0;
    }
  }

  .dataList {
    .dataBox {
      display: flex;
      padding: 23px 30px;
      border-bottom: 1px solid rgba(68, 68, 68, 0.14901960784313725);
      justify-content: space-between;

      .dataBoxLeft {
        .dataLeft {
          display: flex;

          .fileType {
            font-size: 18px;
            width: 60px;
            height: 60px;
            opacity: 1;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-right: 30px;
          }

          .fileDoc {
            background: rgba(105, 204, 255, 1);
          }

          .fileXls {
            background: #91E5A1;
          }

          .filePpt {
            background: #FFCBA6;
          }

          .filePdf {
            background: #FF8585;
          }

          .fileJpg {
            background: #9BB5FF;
          }

          .filePng {
            background: #FE95B2;
          }

          .dataDetail {
            p {
              font-size: 18px;
              font-weight: bold;
              color: rgba(68, 68, 68, 1);
              display: flex;
              align-items: center;

              span {
                width: auto;
                min-width: 45px;
                max-width: 700px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }

            .down-img {
              cursor: pointer;
              margin-left: 12px;
            }

            .dataMsg {
              font-size: 14px;
              display: flex;
              align-items: center;
              color: #444;
              margin-top: 16px;
              flex-wrap: wrap;

              span {
                margin-right: 60px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: auto;
                min-width: 45px;
                max-width: 500px;
              }
            }
          }

        }
      }

      .dataBoxRig {
        .primary {
          border: 1px solid rgba(5, 170, 255, 1);
          color: #05AAFF;

          &:hover {
            background: rgba(5, 170, 255, 1);
            color: #fff;
          }
        }

        .btnMt {
          margin-bottom: 5px;
        }
      }
    }
  }

  // 针对本页面弹出框专门设置样式
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #ddd;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    padding: 10px 10px;

    .el-dialog__title {
      color: #fff;
      font-size: 14px;
    }

    .el-dialog__headerbtn {
      top: 15px;
      background: #fff;
      border-radius: 100%;
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-dialog__close {
        font-size: 12px;
        color: #05AAFF;
        margin-top: 2px;
      }
    }
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
  }

  .main-list {
    display: flex;

    .left-file {
      width: 20%;
      min-width: 200px;
      height: 500px;
      margin-right: 10px;

      .header-file-top {
        display: flex;
        justify-content: space-between;

        .icon-file {
          cursor: pointer;
        }
      }

      /deep/ .el-card__header {
        padding: 15px 10px;
      }

      .mulu {
        display: flex;

        li {
          cursor: pointer;
        }
      }

      /deep/ .el-card__body {
        height: 453px;
        overflow-y: auto;
      }
    }

    .box-card {
      width: 100%;
    }

  }

  .file-list {
    margin-left: 9px;

    .icon-del-file {
      color: red;
      cursor: pointer;
    }
  }

  .tree-list {
    /deep/ .el-tree-node__label {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
