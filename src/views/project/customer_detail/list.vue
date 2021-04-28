<template>
  <div class="customer-files">
    <p style="margin-bottom: 10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
    <el-button class="up-file-btn" @click="upFileBtnHandle">上传附件</el-button>
    <div class="one-list" v-for="(item,index) in listData">
      <div class="title">
        {{index | toCN}}、{{item.projectName}}
        <span v-if="item.applyYear || item.applyBatchNo">
          (年份：{{item.applyYear && item.applyYear!==''?item.applyYear:'-'}} 批次：{{item.applyBatchNo && item.applyBatchNo !==''?item.applyBatchNo:'-'}})
        </span>
      </div>
      <div class="two-list" v-for="(data,nums) in item.crmProjectApplyFileVos">
        <div class="title">
          ({{nums+1}}) 、{{data.materialTypeName}}
          <div class="three-list">
            <ul class="file-list">
              <li v-for="(list,listNum) in data.fileIdsList">
                {{listNum+1}} . {{list.fileName}}
                <span class="read" @click="downFileHandle(list)">下载</span>
                <span class="del" @click="delFileList(item,data,list)" v-if="allowDelApplyFile.twoAllow">删除</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--上传附件--弹窗-->
    <el-dialog title="上传附件" class="editorUserModal" :before-close="cananlAddAnnex" :visible.sync="addAnnexModal"
               width="650px" v-dialogDrag>
      <el-form :model="upFilesParams" :rules="upFilesRules" ref="upFilesModal" label-width="100px">

        <el-form-item label="项目：" prop="orderId">
          <el-select v-model="upFilesParams.orderId" @change="projectChange">
            <el-option
              v-for="(item,index) in projectListData"
              :value="item.orderId"
              :label="item.projectName"
              :key="index"
            />
          </el-select>
        </el-form-item>


        <el-form-item v-if="upFilesParams.orderId == 1" label="" prop="projectName">
          <el-input maxlength="100" v-model="upFilesParams.projectName" placeholder="项目名称"></el-input>
        </el-form-item>

        <el-form-item label="附件分类：" prop="materialType">
          <el-select @change="annaxChange" v-model="upFilesParams.materialType">
            <el-option
              v-for="item in annexTypeData"
              :value="item.dictId"
              :label="item.dictName"
              :key="item.dictId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="下载模板：" v-if="modalList.length !== 0">
          <ul class="model-files-list">
            <li v-for="(item,index) in modalList" :key="index">
              {{index+1}}.{{item.fileName}} <span class="down" @click="downFileHandle(item)">下载</span>
            </li>
          </ul>
        </el-form-item>

        <el-form-item class="update-file-form">
          <div style="width: 100px;color: #606266;font-weight: bold;padding-left: 7px;"><span style="color:#F56C6C;margin-right: 4px;">*</span>上传附件：</div>
          <div>
            <el-upload style="display: inline-block;width:100%;"
                       ref="upload"
                       class="upload-box upload-box-width"
                       :http-request="handleFilesUpload"
                       :on-remove="delFilesUploadHandle"
                       :file-list="fileList"
                       :show-file-list="true">
              <el-button class="add-file-btn">增加文件</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="setBtn" @click="setAddAnnex">确 定</el-button>
        <el-button class="cananl" @click="cananlAddAnnex">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getOrderApplyMaterialListInfo,
    queryProjectApplyFile,
    updateProjectApplyFile,
    deleteProjectApplyFileIds,
    ossFileDownload,
    queryCompanyOrderList
  } from '@/api/customerCenter'
  import {getFileDownload} from '@/api/fileManage'
  import {addFileBatch, commonDict, getFileListWithFileIds} from '@/api/utils'
  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {annexUpload} from '@/utils/uploadPathMethods'
  import cloneDeep from "lodash/cloneDeep";


  export default {
    data() {
      return {
        // 上传附件--弹窗--显示/隐藏
        addAnnexModal: false,

        // 列表数据
        listData: [],

        // 项目数据列表
        projectListData: [],

        //附件分类数据
        annexTypeData: [],

        //上传附件提交数据
        upFilesParams: {},

        //附件列表的数据
        annexList: [],
        fileList: [],

        //下载模板数据
        modalList: [],

        //判断是否显示下载模板
        isShowDownModel: false,

        //监听上传附件弹窗form数据不能为空
        upFilesRules: {
          orderId: [
            {required: true, message: '请选择项目', trigger: 'blur'}
          ],
          projectName: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ],
          materialType: [
            {required: true, message: '请选择附件分类', trigger: 'blur'}
          ],
        },

        //获取下载模板--参数
        downModalParams: {},
        allowDelApplyFile: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER', 'SYSTEM:CUSTOMER:CENTER:APPLYFILE:DELETE'),// 删除客户资料
      }
    },
    props: ['id', 'companyNames', 'provinceId', 'cityId', 'districtId', 'townId'],
    mounted() {
      this.getMaterialList();
    },
    activated() {
      this.getMaterialList();
    },
    methods: {
      //获取列表信息
      getMaterialList() {
        let params = {
          companyId: this.id,
          page: 0,
          pageSize: 20
        };
        queryProjectApplyFile(params).then(res => {
          if (res.code === 200) {
            res.data.data.forEach(item => {
              if (item.crmProjectApplyFileVos.length !== 0) {
                item.crmProjectApplyFileVos.forEach(data => {
                  if (data.fileIds) {
                    data.fileIds = data.fileIds.split(',');
                    getFileListWithFileIds({fileIds: data.fileIds, haveView: false}).then(res => {
                      if (res.code == 200) {
                        data.fileIdsList = cloneDeep(res.data);
                      } else {
                        this.$message.warning(res.message)
                      }
                    })
                  }

                })
              }
            });

            setTimeout(() => {
              this.listData = res.data.data;
            }, 500)
          }
        })
      },

      //点击上传附件按钮
      upFileBtnHandle() {
        this.addAnnexModal = true;
        let params = {
          keyList: 'DICT:MATERIALTYPE',
          companyId: this.$store.getters.companyId
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.annexTypeData = res.data['DICT:MATERIALTYPE'];
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })

        let proParams = {
          page: 0,
          pageSize: 30,
          companyId: this.id
        }

        queryCompanyOrderList(proParams).then(res => {
          if (res.code === 200) {
            res.data.data.forEach(item => {
              item.projectName = `${item.projectName}  ${item.applyYear ? '年份:' + item.applyYear : ''}  ${item.applyBatchNo ? '批次:' + item.applyBatchNo : ''} `
            });
            this.projectListData = res.data.data;
          }
        })

      },

      //增加文件
      handleFilesUpload(option) {
        if(!this.companyNames || this.companyNames == ''){
          this.$message.error('企业名称为空，请检查');
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
        let filePath = annexUpload(this.companyNames, fileName) + '.' + fileType;

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
                this.annexList.push(response.data[0]);
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

      //删除--增加文件
      delFilesUploadHandle(file, index) {
        this.annexList.forEach((item, i) => {
          if (file.name == item.fileName) {
            this.annexList.splice(i, 1);
          }
        })
      },

      //选择项目获取模板
      projectChange(val) {
        if (val == 0 || val == 1 || !this.upFilesParams.materialType || this.upFilesParams.materialType == '') {
          this.isShowDownModel = false;
          this.modalList = [];
          this.downModalParams = {};
        } else {
          this.isShowDownModel = true;
          this.getModalList();
        }
      },

      //选择附件分类
      annaxChange() {
        if (this.upFilesParams.orderId && this.upFilesParams.orderId != '' && this.upFilesParams.orderId != 0 && this.upFilesParams.orderId !=1) {
          this.getModalList();
        }
      },

      //获取下载模板数据
      getModalList() {
        this.projectListData.forEach(item => {
          if (item.orderId == this.upFilesParams.orderId) {
            this.downModalParams.projectId = item.projectId;
            this.downModalParams.applyYear = item.applyYear;
            this.downModalParams.applyLevel = item.applyLevel;
          }
        });

        this.downModalParams.materialType = this.upFilesParams.materialType;
        this.downModalParams.orderId = this.upFilesParams.orderId;
        this.downModalParams.provinceId = this.provinceId;
        this.downModalParams.cityId = this.cityId;
        this.downModalParams.districtId = this.districtId;
        this.downModalParams.townId = this.townId;

        getOrderApplyMaterialListInfo(this.downModalParams).then(res => {
          if (res.code == 200) {
            if (res.data.templateFileIds) {
              let arr = res.data.templateFileIds.split(',');
              this.upFilesParams.materialId = res.data.materialId;
              getFileListWithFileIds({fileIds: arr, haveView: false}).then(res => {
                if (res.code == 200) {
                  this.modalList = res.data;
                } else {
                  this.$message.warning(res.message)
                }
              })
            } else {
              this.modalList = [];
            }
          }
        })
      },

      //确定新增上传附件
      setAddAnnex() {
        this.$refs.upFilesModal.validate((valid, error) => {
          if (valid) {
            if (this.annexList.length == 0) {
              this.$message.warning('请上传附件');
              return
            }

            let arr = this.annexList.map(item => {
              return item.fileId
            });
            this.upFilesParams.fileIds = arr.join(',');
            this.upFilesParams.crmCompanyId = this.id;

            updateProjectApplyFile(this.upFilesParams).then(res => {
              if (res.code === 200) {
                this.getMaterialList();
                this.upFilesParams = {};
                this.downModalParams = {};
                this.annexList = [];
                this.modalList = [];
                this.$refs.upload.clearFiles()
                this.addAnnexModal = false;
              }
            })

          }
        })
      },

      //取消上传附件
      cananlAddAnnex() {
        this.upFilesParams = {};
        this.downModalParams = {};
        this.annexList = [];
        this.modalList = []
        this.addAnnexModal = false;
      },

      //下载附件\模板
      downFileHandle(data) {
        if(!data.fileId){
          this.annexList.forEach(item=>{
            if(item.fileName == data.name){
              data = item;
            }
          })
        }

        if (data.fileId) {
          let params = {
            companyId: this.$store.getters.companyId,
            fileId: data.fileId
          };
          ossFileDownload(params).then(res => {
            if (res.code == 200) {
              let url = res.data.replace(/http/,'https')
              window.open(url)
              // this.$message({type: 'success', message: '下载成功'});
            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        }
      },

      // 删除文件
      delFileList(item, data, list) {
        let newFileIdlist = data.fileIdsList.filter(item => {
          if (item.fileId !== list.fileId) {
            return item
          }
        });
        let fileIdarr = newFileIdlist.map(item => {
          return item.fileId
        });

        let fileIdString = fileIdarr.join(',');

        let params = {
          applyFileId: data.applyFileId,
          fileIds: fileIdString
        };

        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProjectApplyFileIds(params).then(res => {
            if (res.code === 200) {
              this.getMaterialList();
              this.$message.success('删除成功');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },


    },
    filters: {
      toCN(val) {
        let chin_list = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];//所有的数值对应的汉字
        let sn = parseInt(val) + 1;//这里由于我的后台是从0开始排序
        if (sn <= 10) {
          return chin_list[sn - 1];
        } else if (sn <= 100) {
          if (sn < 20)
            return '十' + chin_list[sn % 10 - 1];
          if (sn % 10 == 0)
            return chin_list[Math.floor(sn / 10) - 1] + '十';
          else
            return chin_list[Math.floor(sn / 10) - 1] + '十' + chin_list[sn % 10 - 1];
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  ul li {
    list-style: none;
  }

  .customer-files {
    .up-file-btn {
      padding: 9px 15px;
      background: #409EFF;
      border: 0;
      color: #fff;
      margin-bottom: 10px;

      &:active {
        opacity: 0.5;
      }
    }

    .one-list {
      margin-bottom: 12px;
      padding-left: 5px;

      .two-list {
        padding-left: 30px;
        margin-top: 12px;
      }

      .three-list {
        padding-left: 40px;
        margin-top: 5px;

        .file-list {
          li {
            margin-top: 12px;
          }

          .read {
            color: #409EFF;
            cursor: pointer;
            margin-left: 10px;
          }

          .del {
            color: red;
            cursor: pointer;
            margin-left: 5px;
          }
        }
      }
    }

    .editorUserModal {
      .add-file-btn {
        background: rgba(5, 170, 255, 1);
        color: #fff;
        border: 0;
        padding: 9px 15px;

        &:active {
          opacity: 0.5;
        }
      }

      .model-files-list {
        li {
          color: rgba(5, 170, 255, 1);

          .down {
            cursor: pointer;
          }
        }
      }

      .update-files-list {
        .del-upFile {
          color: red;
          cursor: pointer;
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

    .update-file-form {
      /deep/ .el-form-item__content {
        margin-left: 0 !important;
        display: flex;
      }
    }
  }
</style>
