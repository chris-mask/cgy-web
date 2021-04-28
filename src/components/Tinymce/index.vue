<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container2" v-if="false">
      <editorPDF @handlePDFSuccess="handlePDFSuccess"></editorPDF>
    </div>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import editorPDF from './components/editorPDF'
import plugins from './plugins'
import toolbar from './toolbar'

export default {
  // name: 'tinymce',
  components: { editorImage, editorPDF },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        language: 'zh_CN',
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      // console.log('arr111',arr)
      const _this = this
      var img_suffix_list = ['jpg', 'png', 'jpeg']
      var pdf_suffix_list = ['pdf', 'PDF']
      var doc_suffix_list = ['docx', 'DOCX']
      // console.log('arr111',arr)
      arr.forEach(v => {
        console.log(v, 'v')
        var url_list = v.fileUrl.split('.');
        if(v){
          if (img_suffix_list.indexOf(String(url_list[url_list.length - 1])) !== -1) {
            window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.fileUrl}" >`)
          } else if (pdf_suffix_list.indexOf(String(url_list[url_list.length - 1])) !== -1) {
            let html = ''
            // v.img_list.forEach(v => {
              html += `<img class="wscnph" src="${v.fileUrl}" >`
            // })
            window.tinymce.get(this.tinymceId).insertContent(html)
          } else if (doc_suffix_list.indexOf(String(url_list[url_list.length - 1])) !== -1 && v.document) {
            window.tinymce.get(_this.tinymceId).insertContent(v.document)
          } else {
            // window.tinymce.get(_this.tinymceId).insertContent('<iframe frameborder="0" marginheight="0" width="100%" marginwidth="0" src="https://view.officeapps.live.com/op/view.aspx?src=https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/eRpPo90A_20200429161314_944.doc"></iframe>')
            window.tinymce.get(_this.tinymceId).insertContent(`<a href="${v.fileUrl}">${v.fileName}</a>`)
          }
        }

      })
    },
    // 处理PDF文件上传成功的操作
    handlePDFSuccess(arr) {
      let html = ''
      arr.forEach(v => {
        html += `<img class="wscnph" src="${v}" >`
      })
      window.tinymce.get(this.tinymceId).insertContent(html)
    }
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  width: 100%;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.editor-custom-btn-container2 {
  position: absolute;
  right: 120px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
