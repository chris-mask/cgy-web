<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传附件
    </el-button>
<!--    <el-upload class="editor-slide-upload"-->
<!--               :action="host + '/policy/api/policy/policyNoticeInfo/uploadRichTextFile'"-->
<!--               :multiple="false"-->
<!--               :file-list="fileList"-->
<!--               :show-file-list="true"-->
<!--               list-type="picture-card"-->
<!--               :on-remove="handleRemove"-->
<!--               :on-success="handleSuccess"-->
<!--               :before-upload="beforeUpload">-->
<!--&lt;!&ndash;      <el-button size="small" type="primary">点击上传</el-button>&ndash;&gt;-->
<!--      <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传附件-->
<!--      </el-button>-->
<!--    </el-upload>-->
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload"
      :action="host + '/policy/api/policy/policyNoticeInfo/uploadRichTextFile'"
      :multiple="true"
      :file-list="fileList"
      :show-file-list="true"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" v-if="canUpload">确 定</el-button>
      <el-button type="primary" :loading="true"  v-if="!canUpload">上传中</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import axios from 'axios'
import { Message } from 'element-ui'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      host: process.env.BASE_API,
      dialogVisible: false,
      listObj: {},
      fileList: [],
      fileUrl: '',
      canUpload: true,
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item])
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     // this.listObj[objKeyArr[i]].url = response.files.file
      //     // this.listObj[objKeyArr[i]].url = this.host + response.url
      //     this.listObj[objKeyArr[i]].url = response.oss_object_url || response.url
      //     this.listObj[objKeyArr[i]].document = response.document
      //     this.listObj[objKeyArr[i]].img_list = response.img_list
      //     this.listObj[objKeyArr[i]].hasSuccess = true
      //     return
      //   }
      // }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      var Authorization = this.$store.getters.tokenType + ' ' + this.$store.getters.accessToken
      var securitycode = this.$store.getters.companyId;

      if(file.name.length >= 150){
        this.$message('文件名称超长，请检查');
        return;
      }

      const that = this
      // const _URL = window.URL || window.webkitURL
      that.canUpload = false;

      return new Promise((resolve, reject) => {
        // const img = new Image()
        // img.src = _URL.createObjectURL(file)
        // _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height, type: file.type, name: file.name }
        // resolve(true)
        let formdata = new FormData();
        formdata.append('file', file);
        formdata.append('companyId',securitycode);

        axios({
          method: 'post',
          url: this.host + '/policy/api/policy/policyNoticeInfo/uploadRichTextFile',
          data: formdata,
          headers: {
            Authorization: Authorization,
            securitycode: securitycode
          },
        }).then(function (ret) {
          // that.fileUrl = ret.data.data[0]
          if(ret.data.code == 200){
            const fileName = file.uid
            that.listObj[fileName] = {}
            that.listObj[fileName] = ret.data.data[0]
            that.canUpload = true;
          }
          // this.submitFile(ret.data.data[0])
        }).catch(function (err) {
          // console.log('aaa',err.response.data.message)
          // this.$message({type: 'error', message: err});
          Message({
            message: err.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(err);
        })

      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
