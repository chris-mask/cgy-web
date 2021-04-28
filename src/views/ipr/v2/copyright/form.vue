<template>
  <div class="patent-form">

    <!--    内容-->
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="auto" class="form-box">

      <!--      上面的form-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="line"></div>
          <div class="title-name">著作列表 - {{titleName}}</div>
        </div>
        <div class="cart-body">
          <el-form-item class="form-input" label="客户名称：" prop="crmCompanyId">
            <el-select v-if="pageType =='add' && !this.$route.query.companyNames"
                       v-model="form.crmCompanyId"
                       class="user-name-item"
                       placeholder="请选择客户名称"
                       @change="setCompanyNameHandle"
                       @focus="resetCompanyHandle"
                       :disabled="this.$route.query.isUser"
                       v-loadMore="loadMore"
                       filterable
                       remote
                       :loading="loading"
                       :remote-method="remoteMethod"
                       clearable
            >
              <el-option
                v-for="item in userNameList"
                :value="item.crmCompanyId"
                :label="item.companyName"
                :key="item.crmCompanyId"
              />
            </el-select>


            <el-input v-else-if="this.$route.query.companyNames" v-model="this.$route.query.companyNames" disabled class="patent-name-item"></el-input>

            <el-input v-else v-model="form.companyName" disabled class="patent-name-item"></el-input>

          </el-form-item>

          <el-form-item class="form-input" label="著作名称：" prop="copyrightName">
            <el-input v-if="pageType !=='read'" v-model.trim="form.copyrightName" class="patent-name-item" maxlength="50" clearable placeholder="请输入著作名称"></el-input>
            <el-input v-else disabled v-model="form.copyrightName" class="patent-name-item"></el-input>
          </el-form-item>

        </div>
      </div>


      <!--下面的form-->
      <div class="cart-bar">
        <div class="cart-body">
          <el-row class="floor-form">
            <el-col :sm="24" :md="12" :lg="10">
              <el-form-item class="form-input" label="著作权人：">
                <el-input v-if="pageType !=='read'" clearable v-model="form.copyrightOwner" class="patent-name-item" maxlength="50" placeholder="请输入著作权人" style="width: 300px;"></el-input>
                <el-input v-else v-model="form.copyrightOwner" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :lg="14">
              <el-form-item class="form-input" label="类别：" prop="copyrightType">
                <el-select v-if="pageType !=='read'" v-model="form.copyrightType" class="user-name-item" placeholder="请选择类别">
                  <el-option
                    v-for="item in workType"
                    :value="item.dictId"
                    :label="item.dictName"
                    :key="item.dictId"
                  />
                </el-select>
                <el-input v-else v-model="form.copyrightTypeName" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="登记号：" prop="registerNo">
                <el-input clearable v-if="pageType !=='read'" v-model.trim="form.registerNo" maxlength="50" class="patent-name-item" placeholder="请输入登记号" style="width: 300px;"></el-input>
                <el-input v-else v-model="form.registerNo" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="版本号：">
                <el-input clearable v-if="pageType !=='read'" v-model="form.versionNo" maxlength="50" class="patent-name-item" placeholder="请输入版本号" style="width: 300px;"></el-input>
                <el-input v-else v-model="form.versionNo" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="登记批准日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.approvalDate"
                  type="date"
                  placeholder="选择登记批准日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.approvalDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="发布日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.publicDate"
                  type="date"
                  placeholder="选择发布日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.publicDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </div>
      </div>
    </el-form>


    <!-- 操作按钮-->
    <div class="btn-group-handle">
      <el-button class="btn blue" v-if="pageType == 'add' && allowAdd.twoAllow" v-preventReClick @click="handSubmit('ruleForm')">确定</el-button>
      <el-button class="btn blue" v-if="pageType == 'edit' && allowUpdate.twoAllow" v-preventReClick @click="handSubmitEdit('ruleForm')">确定</el-button>
      <el-button class="btn cananl" @click="cananlHandle">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {commonDict} from '@/api/utils'
  import {queryCrmCompanyInfoByCommon} from '@/api/sale_plan'
  import {saveCopyright, updateCopyright, queryCopyrightInfoById} from '@/api/patent'

  export default {

    data() {
      return {
        //页面入来的时候的类型
        pageType: "",

        //标题名称
        titleName: "",

        //客户名称
        userNameList: [],
        //客户总数
        userNameTotal: null,
        //客户列表参数
        userParams: {
          page: 0,
          pageSize: 20,
        },
        //著作类型
        workType: [],
        //form值
        form: {},
        //监听form
        rules: {
          crmCompanyId: [
            {required: true, message: '请选择客户', trigger: 'blur'}
          ],
          copyrightName: [
            {required: true, message: '请输入著作权名称', trigger: 'blur'}
          ],
          copyrightType: [
            {required: true, message: '请选择类别', trigger: 'blur'}
          ],
          registerNo:[
            {required: true, message: '请输入登记号', trigger: 'blur'}
          ]
        },

        loading:false,

        allowAdd: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:COPYRIGHT','SYSTEM:PROPERTY:Copyright:INSERT'),//新增著作权
        allowUpdate: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:COPYRIGHT','SYSTEM:PROPERTY:Copyright:UPDATE'),//编辑著作权
        // allowDetail: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:COPYRIGHT','SYSTEM:PROPERTY:Copyright:DETAILS'),//查询著作权详情
        allowDetail: true
      }
    },
    created() {
      this.getCopyRightData();
      this.pageType = this.$route.query.type;
    },
    activated() {
      this.isHeaderName();
      this.getUserNameData();
      this.form = {
        crmCompanyId:"",
        copyrightName:"",
        copyrightOwner:"",
        copyrightType:"",
        registerNo:"",
        versionNo:"",
        approvalDate:"",
        publicDate:"",
      };

      if(this.$route.query.companyId){
        this.form.crmCompanyId = this.$route.query.companyId;
      }

      if(this.pageType === "edit" || this.pageType === "read"){
        setTimeout(()=>{
          this.getFormDetail()
        },150)
      }

    },
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
    methods: {
      // 获取客户名称列表
      getUserNameData(){
        queryCrmCompanyInfoByCommon(this.userParams).then(res => {
          if (res.code === 200) {
            this.userNameList = res.data.data;
            this.userNameTotal = res.data.total;
          }
        })
      },

      //滚动获取更多客户
      loadMore() {
        if (this.userNameList.length >= this.userNameTotal) {
          return
        } else {
          this.userParams.page += 20;
          queryCrmCompanyInfoByCommon(this.userParams).then(res => {
            if (res.code === 200) {
              this.userNameList = this.userNameList.concat(res.data.data);
            }
          })
        }
      },

      //获取著作权字典类别
      getCopyRightData(){
        let params = {
          keyList: 'DICT:COPYRIGHT_CATEGORY',
        };
        commonDict(params).then(res=>{
          if(res.code === 200){
            this.workType = res.data['DICT:COPYRIGHT_CATEGORY'];
          }
        })
      },

      //点击选择客户名称
      setCompanyNameHandle(val){
        this.userNameList.forEach(item=>{
          if(item.crmCompanyId === val){
            this.form.crmCompanyName = item.companyName;
          }
        });
      },

      //判断头部名称
      isHeaderName() {
        if (this.pageType === 'read') {
          this.titleName = '著作权详情'
        } else if (this.pageType === 'add') {
          this.titleName = '新增著作权'
        } else if (this.pageType === 'edit') {
          this.titleName = '编辑著作权'
        }
      },

      //删除图片
      handleRemove(file, fileList) {
      },

      // 点击查看大图
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //监听图片格式----上传图片
      handlePic(file) {
        let fileName = file.raw.name.substr(file.raw.name.lastIndexOf("."));
        if (fileName !== '.jpg' && fileName !== '.png') {
          this.$message({type: 'warning', message: '请上传有效的.jpg或.png文件'});
          return;
        }
        const formData = new FormData();
        formData.append('file', file.raw);
        this.picFormData = formData;
      },


      // 确认提交---新增
      handSubmit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            if(this.form.copyrightOwner.length >50){
              this.$message.warning('著作权人字符长度不能大于50')
              return
            }
            if(this.form.copyrightName.length >50){
              this.$message.warning('著作名称字符长度不能大于50')
              return
            }
            Object.keys(this.form).forEach(item => {
              if (this.form[item] === null || this.form[item] === undefined) {
                this.form[item] = "";
              }
            });
            const formData = new FormData();
            formData.append('companyId',this.form.crmCompanyId);
            formData.append('companyName',this.form.crmCompanyName);
            formData.append('copyrightName',this.form.copyrightName);
            formData.append('copyrightOwner',this.form.copyrightOwner);
            formData.append('copyrightType',this.form.copyrightType);
            formData.append('registerNo',this.form.registerNo);
            formData.append('versionNo',this.form.versionNo);
            formData.append('approvalDate',this.form.approvalDate);
            formData.append('publicDate',this.form.publicDate);
            saveCopyright(formData).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.form = {};
                this.$store.commit('SET_COPYRIGHT_SCROLL', 0)
                this.cananlHandle();
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },

      //编辑--获取详情
      getFormDetail(){
        // if(this.allowDetail.twoAllow){
          queryCopyrightInfoById({copyrightId: this.$route.query.copyrightId}).then(res => {
            if (res.code === 200) {
              let form=  JSON.parse(JSON.stringify(res.data));
              form.crmCompanyId = form.companyId;
              form.crmCompanyName = form.companyName;
              Object.keys(this.form).forEach(item=>{
                if(!form.hasOwnProperty(item)){
                  form[item] = ""
                }
              });
              this.form = form;
              if(this.pageType === 'read'){
                this.workType.forEach(item=>{
                  if(res.data.copyrightType === item.dictId){
                    this.form.copyrightTypeName = item.dictName
                  }
                })
              }
            }
          })
        // }else{
        //   this.$message.warning('抱歉，您没有权限获取此详情')
        // }
      },

      // 确认提交---编辑
      handSubmitEdit(formName){
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            if(this.form.copyrightOwner.length >50){
              this.$message.warning('著作权人字符长度不能大于50')
              return
            }
            if(this.form.copyrightName.length >50){
              this.$message.warning('著作名称字符长度不能大于50')
              return
            }

            Object.keys(this.form).forEach(item => {
              if (this.form[item] === null || this.form[item] === undefined) {
                this.form[item] = "";
              }
            });

            const formData = new FormData();
            formData.append('companyId',this.form.crmCompanyId);
            formData.append('companyName',this.form.crmCompanyName);
            formData.append('copyrightName',this.form.copyrightName);
            formData.append('copyrightOwner',this.form.copyrightOwner);
            formData.append('copyrightType',this.form.copyrightType);
            formData.append('registerNo',this.form.registerNo);
            formData.append('versionNo',this.form.versionNo);
            formData.append('approvalDate',this.form.approvalDate);
            formData.append('publicDate',this.form.publicDate);
            formData.append('copyrightId',this.$route.query.copyrightId);
            updateCopyright(formData).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.form = {};
                // this.$store.commit('SET_COPYRIGHT_SCROLL', 0)
                this.cananlHandle();
              }
            })
          } else {
            this.callbackError(error)
            return false
          }
        })
      },


      //点击取消
      cananlHandle() {
        this.$router.go(-1);
        // this.$router.push({
        //   'path': '/ipr/copyright/list',
        // })
        this.$store.state.tagsView.visitedViews.forEach((item, key) => {
          if (item.name == '著作权详情' || item.name == '新增著作权' || item.name == '编辑著作权') {
            this.$store.state.tagsView.visitedViews.splice(key, 1)
          } else {
            return false
          }
        });
        this.form = {};
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

      //重置客户名称列表
      resetCompanyHandle(){
        this.userParams.companyNameOnly = "";
        this.getUserNameData()
      },

      //远程查询
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getCompanyData(query);
          }, 200);
        } else {
          this.userParams.companyNameOnly = "";
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getUserNameData();
          }, 200);
        }
      },
      //获取企业
      getCompanyData(query) {
        this.userParams.page = 0;
        this.userParams.companyNameOnly = query;
        queryCrmCompanyInfoByCommon(this.userParams).then(res => {
          if (res.code == 200) {
            this.userNameList = res.data.data;
            this.userNameTotal = res.data.total;
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .patent-form {
    margin: auto 5%;

    .title {
      margin-top: 20px;
      padding-left: 20px;
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);
    }

    .form-box {
      .cart-bar {
        background: #fff;
        margin-top: 20px;
        box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
        border-radius: 4px;

        .cart-title {
          padding: 16px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(219, 233, 255, 1);;

          .line {
            width: 3px;
            height: 14px;
            background: rgba(5, 170, 255, 1);
            margin-right: 10px;
          }

          .title-name {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(4, 43, 64, 1);
          }
        }

        .cart-body {
          padding: 20px 0 1px 12px;

          .form-input {
            /deep/ .el-form-item__label {
              font-weight: normal;
              font-size: 14px;
              color: rgba(68, 68, 68, 0.75);
              border-radius: 0;
              white-space: nowrap;
            }

            .user-name-item {
              width: 300px;

              /deep/ .el-input {
                width: 300px;
              }

              /deep/ .el-input__inner {
                width: 300px;
                background: none;
                border-radius: 0;
                border: 0;
                color: #444444;
                border-bottom: 1px solid rgba(68, 68, 68, .3);
              }
            }

            .patent-name-item {
              /deep/ .el-input__inner {
                width: 300px;
                background: none;
                border-radius: 0;
                border: 0;
                border-bottom: 1px solid rgba(68, 68, 68, .3);
              }
            }

            .select-date {
              width: 300px !important;
              /deep/ .el-input__inner, /deep/ .el-date-editor.el-input, /deep/ .el-date-editor.el-input__inner {
                width: 300px !important;
                border-radius: 0;
                border: 0;
                background: none;
                border-bottom: 1px solid rgba(68, 68, 68, .3);
              }
            }

            .patent-area {
              /deep/ .el-textarea__inner {
                width: 300px;
              }
            }

            /deep/ .el-input.is-disabled .el-input__inner{
              color: #444;
            }

          }
        }
      }
    }

    .upload-pic {
      /deep/ .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 110px;
      }

      /deep/ .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
      }
    }

    .pic-modal {
      .pic {
        display: flex;
        align-items: center;
        justify-content: center
      }
    }

    .btn-group-handle {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      .btn {
        padding: 0;
        width: 100px;
        height: 38px;
        font-size: 16px;

        &.blue {
          color: #fff;
          background: linear-gradient(180deg, rgba(155, 221, 255, 1) 0%, rgba(55, 187, 255, 1) 100%);
        }

        &.cananl {
          color: rgba(68, 68, 68, 1);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
        }
      }
    }
  }

</style>
