<template>
  <el-input :id="id" :editor="editor" type="textarea" v-model="value" :rows="5" @change="toValue" :maxlength="maxlength"></el-input>
</template>

<script>
  import CKEDITOR from "@ckeditor/ckeditor5-vue"
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";

  import axios from 'axios'
  import dev from '../../../config/dev.env'

  export default {
    props:['value','id','maxlength'],
    data(){
      return {
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
          // The configuration of the editor.
          language: 'zh-cn',
          ckfinder: {
            uploadUrl: '/manage/api/manage/rich/uploadRichTextFile',
            options: {
              resourceType: 'Images'
            }
            //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          },
        },
        editorCont:null,
      }
    },
    mounted() {
      // console.log('sss',this.value)
      // console.log('sss',this.id)
      // console.log('asd','#' + this.id)
      var Authorization = this.$store.getters.tokenType + ' ' + this.$store.getters.accessToken
      var securitycode = this.$store.getters.companyId;


      class myUploadLoader {
        constructor(loader) {
          this.loader = loader;
        }
        upload() {
          return this.loader.file.then(file =>new Promise((resolve, reject) => {
              // 这里面写的就是上传请求，只需要最终结果调用 resolve 方法
              // 并且返回一个至少包含 default : imgUrl 的对象,
              // 例如：{default:'http://abc.com/a/b.png'}
              let formdata = new FormData();
              formdata.append('file',file);
              formdata.append('companyId',securitycode);
              axios({
                url: JSON.parse(dev.BASE_API) + '/manage/api/manage/rich/uploadRichTextFile',
                method:'post',
                data:formdata,
                headers:{
                  Authorization: Authorization,
                  securitycode: securitycode
                }
              })
                .then(response=>{
                  // console.log('img',response)
                  // 后端至少返回上传图片的URL
                  let url = response.data.data.filePath
                  resolve({
                    default: url
                  });
                })
                .catch(err=>{
                  reject(err)
                })
            })
          );
        }
      }
      function myUpload(e) {
        // 使用 CKeditor 提供的 API 修改上传适配器
        e.plugins.get("FileRepository").createUploadAdapter = loader => new myUploadLoader(loader);
      }

      this.editorCont =  ClassicEditor.create(document.querySelector('#' + this.id), {
        language: 'zh-cn',
        // toolbar: ['Bold', 'Italic','BulletedList', 'Outdent', 'Indent', 'Blockquote'],
        extraPlugins: [myUpload],
      })
    },
    methods:{
      initCKEditor(){

        // 上传适配插件所有的操作都在这里面完成
        this.editorCont.then(editor=>{
          let value = this.$emit("toValue",{value:this.value})
          if(this.value){
            // editor.data.set(this.value)
            editor.data.set(this.value)

          }

          editor.model.document.on("change:data", () => {
            // this.value = editor.getData();
            value = editor.getData();
            this.toValue(value)
          });
        })


        //   .then(editor => {
        //   let value = this.$emit("toValue",{value:this.value})
        //   if(this.value){
        //     // editor.data.set(this.value)
        //     editor.data.set(value)
        //   }
        //
        //
        //   // const toolbarContainer = document.querySelector('#toolbar-container');
        //   // toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        //   // this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        //   editor.model.document.on("change:data", () => {
        //     // this.value = editor.getData();
        //     value = editor.getData();
        //     this.toValue(value)
        //   });
        //
        //   // editor.destroy();
        // })

      },

      destroyEditor(){
        this.editorCont.then(editor=>{
          editor.data.set('');
          // editor.destroy() //销毁实例
        })
      },

      toValue(val){
        this.$emit('changeValue',val);
      },
    }
  }

</script>

<style scoped>

</style>
