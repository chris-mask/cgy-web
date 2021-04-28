<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">上传PDF
    </el-button>
    <el-dialog append-to-body
    :visible.sync="dialogVisible">
      <div class="upload_button">
        <el-upload
          class="upload-demo"
          :action="host + '/core/upload-pdf-img-to-oss/'"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          v-loading="loading"
          target=".upload_button"
          element-loading-text="正在上传中"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

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
      dialogVisible: false, // 上传文件弹出框是否显示
      fileList: [], // 已上传的文件列表
      imgList: [], // 图片列表，用来储存PDF文件经后台转换过的图片信息
      loading: false // 加载状态
    }
  },
  methods: {
    // 点击按钮提交文件上传
    handleSubmit() {
      // 触发父组件的方法，传递参数imgList
      this.$emit('handlePDFSuccess', this.imgList)
      // 数据初始化，弹出框隐藏
      this.imgList = []
      this.fileList = []
      this.dialogVisible = false
    },
    // 上传文件成功的处理函数
    handleSuccess(response, file) {
      if (response.code === 1) {
        this.imgList = response.data.img_list
        // 在后台返回的每张图片路径上添加当前域名
        this.imgList = this.imgList.map(v => {
          // return this.host + v
          return v
        })
        this.$message({
          type: 'success',
          message: '上传文件成功，点击确定按钮即可提交'
        })
        this.loading = false
      } else {
        this.$message({
          type: 'error',
          message: response.message
        })
      }
    },
    // 删除列表时候清空选项
    handleRemove(file, fileList) {
      this.imgList = []
      this.fileList = []
    },
    // 上传文件之前判断文件类型是否pdf图片，若不是则不上传
    beforeUpload(file) {
      if (file.type !== 'application/pdf') {
        this.$message({
          type: 'error',
          message: '上传的文件类型不是PDF,请选择正确的图片类型'
        })
        return
      }
      this.loading = true
    }
  }
}
</script>

<style lang="less" scoped>
.upload_button {
    text-align: center;
    padding: 50px 0;
    margin: 20px;
    border: 1px dashed #ccc;
}
</style>
