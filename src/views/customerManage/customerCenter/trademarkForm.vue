<template>
  <div class="patent-form">
    <!--    内容-->
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="auto" class="form-box">

      <!--上面的form-->
      <div class="cart-bar">
        <div class="cart-title">
          <div class="line"></div>
          <div class="title-name">商标 - {{titleName}}</div>
        </div>
        <div class="cart-body">
          <el-form-item class="form-input" label="客户名称：" prop="crmCompanyId">
            <el-select v-if="pageType =='add' && !this.$route.query.companyNames" v-model="form.crmCompanyId" class="user-name-item"
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

            <el-input v-else v-model="form.crmCompanyIdName" disabled class="patent-name-item"></el-input>

          </el-form-item>

          <el-form-item class="form-input" label="商标名称：" prop="trademarkName">
            <el-input v-if="pageType !=='read'" v-model.trim="form.trademarkName" class="patent-name-item"
                      placeholder="请输入商标名称" maxlength="50"></el-input>
            <el-input v-else disabled v-model="form.trademarkName" class="patent-name-item"></el-input>
          </el-form-item>

        </div>
      </div>


      <!--下面的form-->
      <div class="cart-bar">
        <div class="cart-body">

          <el-row class="floor-form">
            <el-col :sm="24" :md="12" :lg="10">
              <el-form-item class="form-input" label="商品/服务：">
                <el-input v-if="pageType !=='read'" v-model="form.goodsService" class="patent-name-item"
                          placeholder="请输入商品/服务" maxlength="50"></el-input>
                <el-input v-else v-model="form.goodsService" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :lg="14">
              <el-form-item class="form-input" label="类似群：">
                <el-input v-if="pageType !=='read'" v-model="form.similarGroup" class="patent-name-item"
                          placeholder="请输入类似群" maxlength="50"></el-input>
                <el-input v-else v-model="form.similarGroup" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="申请/注册号：" prop="trademarkNo">
                <el-input v-if="pageType !=='read'" v-model.trim="form.trademarkNo" class="patent-name-item"
                          placeholder="请输入申请/注册号" maxlength="50"></el-input>
                <el-input v-else v-model="form.trademarkNo" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="14">
              <el-form-item class="form-input" label="申请日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.applyDate"
                  type="date"
                  placeholder="选择申请日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.applyDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="国际分类：">
                <el-select v-if="pageType !=='read'" v-model="form.internationalClassify" class="user-name-item"
                           placeholder="请选择国际分类">
                  <el-option
                    v-for="item in IPCData"
                    :value="item.dictId"
                    :label="item.dictName"
                    :key="item.dictId"
                  />
                </el-select>
                <el-input v-else v-model="form.internationalClassifyName" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="申请人名称：">
                <el-input v-if="pageType !=='read'" v-model="form.applyName" class="patent-name-item"
                          placeholder="请输入申请人名称" maxlength="50"></el-input>
                <el-input v-else v-model="form.applyName" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="申请人地址：">
                <el-input v-if="pageType !=='read'" v-model="form.applyAddress" class="patent-name-item"
                          placeholder="请输入申请人地址" maxlength="50"></el-input>
                <el-input v-else v-model="form.applyAddress" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="初审公告期号：">
                <el-input v-if="pageType !=='read'" v-model="form.trialNoticeNo" class="patent-name-item"
                          placeholder="请输入初审公告期号" maxlength="50"></el-input>
                <el-input v-else v-model="form.trialNoticeNo" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="注册公告期号：">
                <el-input v-if="pageType !=='read'" v-model="form.registerNoticeNo" class="patent-name-item"
                          placeholder="请输入注册公告期号" maxlength="50"></el-input>
                <el-input v-else v-model="form.registerNoticeNo" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="初审公告日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.trialNoticeDate"
                  type="date"
                  placeholder="选择初审公告日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.trialNoticeDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="注册公告日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.registerNoticeDate"
                  type="date"
                  placeholder="选择注册公告日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.registerNoticeDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="商标类型：" prop="trademarkType">
                <el-select v-if="pageType !=='read'"
                           v-model="form.trademarkType"
                           class="user-name-item" placeholder="请选择商标类型">
                  <el-option
                    v-for="item in trademarkTypeData"
                    :value="item.keys"
                    :label="item.name"
                    :key="item.keys"
                  />
                </el-select>
                <el-input v-else v-model="form.trademarkTypeName" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="专用权期限开始日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.specialStartDate"
                  type="date"
                  placeholder="选择专用权期限开始日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.specialStartDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="专用权期限失效日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.specialEndDate"
                  type="date"
                  placeholder="选择专用权期限失效日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.specialEndDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="商标形式：">
                <el-input v-if="pageType !=='read'" v-model="form.trademarkShape" class="patent-name-item"
                          placeholder="请输入商标形式" maxlength="50"></el-input>
                <el-input v-else v-model="form.trademarkShape" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="国际注册日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.internationalRegisterDate"
                  type="date"
                  placeholder="选择国际注册日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.internationalRegisterDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="后期指定日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.specifiedDate"
                  type="date"
                  placeholder="选择后期指定日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.specifiedDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="优先权日期：">
                <el-date-picker
                  v-if="pageType !=='read'"
                  v-model="form.priorityDate"
                  type="date"
                  placeholder="选择优先权日期"
                  class="select-date"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <el-input v-else v-model="form.priorityDate" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="10">
              <el-form-item class="form-input" label="是否共有商标：" prop="isPublicTrademark">
                <el-select v-if="pageType !=='read'"
                           v-model="form.isPublicTrademark"
                           class="user-name-item"
                           placeholder="请选择是否共有商标">
                  <el-option
                    v-for="item in isShareMark"
                    :value="item.keys"
                    :label="item.name"
                    :key="item.keys"
                  />
                </el-select>
                <el-input v-else v-model="form.isPublicTrademarkName" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="14">
              <el-form-item class="form-input" label="最新状态：" prop="trademarkState">
                <el-select v-if="pageType !=='read'" v-model="form.trademarkState" class="user-name-item"
                           placeholder="请选择最新状态">
                  <el-option
                    v-for="item in latestStatusData"
                    :value="item.dictId"
                    :label="item.dictName"
                    :key="item.dictId"
                  />
                </el-select>
                <el-input v-else v-model="form.trademarkStateName" class="patent-name-item" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row class="floor-form">
            <el-col :md="24">
              <el-form-item class="form-input" label="商标图：">
                <div style="display: flex;align-items: center;">
                  <ul class="file-list">
                    <li v-for="(item,index) in fileTemp" @mousemove="filesOver(index)" @mouseout="filesOut(index)">
                      <el-image :src="item.fileUrl" :fit="contain"/>
                      <transition name="el-fade-in-linear">
                        <div v-show="item.isShowDan" class="transition-box">
                          <i @click="readBigPicHandle(item)" class="el-icon-zoom-in"></i>
                          <i v-if="pageType !=='read'" style="margin-left: 12px;" @click="delFilePicHandle(index)" class="el-icon-delete"></i>
                        </div>
                      </transition>
                    </li>
                  </ul>
                  <el-upload
                    :http-request="handleCheckUpload"
                    class="upload-pic"
                    :file-list="fileTemp"
                    :show-file-list="false"
                    action=""
                    accept=".jpg,.png,.JPG,.JPEG"
                  >
                    <i class="icon-plus el-icon-plus"></i>
                  </el-upload>
                </div>
                <p style="margin-bottom: 10px;font-size:12px;color:#ff3f4b;line-height: normal">限制文件不超过{{$store.getters.singleCapacity / 1024 + 'M'}}</p>
              </el-form-item>
            </el-col>
          </el-row>


        </div>
      </div>
    </el-form>

    <!--查看大图片-->
    <el-dialog class="pic-modal" :visible.sync="dialogVisible">
      <div class="pic">
        <img :src="dialogImageUrl"/>
      </div>
    </el-dialog>


    <!-- 操作按钮-->
    <div class="btn-group-handle">
      <el-button class="btn blue" v-if="pageType == 'add' && allowAdd.twoAllow" v-preventReClick @click="handSubmit('ruleForm')">确定
      </el-button>
      <el-button class="btn blue" v-if="pageType == 'edit' && allowUpdate.twoAllow" v-preventReClick @click="handSubmitEdit('ruleForm')">确定
      </el-button>
      <el-button class="btn cananl" @click="cananlHandle">取消</el-button>
    </div>
  </div>
</template>

<script>
  import {commonDict, addFileBatch, getFileListWithFileIds} from '@/api/utils'
  import {queryCrmCompanyInfoByCommon} from '@/api/sale_plan'
  import {saveTrademark, updateTrademark, queryTrademarkInfoById} from '@/api/patent'

  import {uploadFilesOss} from '@/utils/uploadFilesOss'
  import {intellectualUpload} from '@/utils/uploadPathMethods'

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
        //是否共有商标
        isShareMark: [
          {keys: '0', name: "否"},
          {keys: '1', name: "是"}
        ],

        //国际分类
        IPCData: [],

        //商标类型
        trademarkTypeData: [
          {keys: 1, name: "驰名商标"},
          {keys: 0, name: "普通商标"},
        ],

        //最新状态
        latestStatusData: [],

        //form值
        form: {
          crmCompanyId: "",
          trademarkName: "",
          goodsService: "",
          similarGroup: "",
          trademarkNo: "",
          applyDate: "",
          internationalClassify: "",
          applyName: "",
          applyAddress: "",
          trialNoticeNo: "",
          registerNoticeNo: "",
          trialNoticeDate: "",
          registerNoticeDate: "",
          trademarkType: "",
          specialStartDate: "",
          specialEndDate: "",
          trademarkShape: "",
          internationalRegisterDate: "",
          specifiedDate: "",
          priorityDate: "",
          isPublicTrademark: "",
          trademarkState: "",
          file: "",
        },
        //监听form
        rules: {
          crmCompanyId: [
            {required: true, message: '请选择客户', trigger: 'blur'}
          ],
          trademarkName: [
            {required: true, message: '请输入商标名称', trigger: 'blur'}
          ],
          trademarkNo: [
            {required: true, message: '请输入申请/注册号', trigger: 'blur'}
          ],
          trademarkType: [
            {required: true, message: '请选择商标类型', trigger: 'blur'}
          ],
          isPublicTrademark: [
            {required: true, message: '请选择是否共有商标', trigger: 'blur'}
          ],
          trademarkState: [
            {required: true, message: '请选择最新状态', trigger: 'blur'}
          ],
        },


        //图片上传参数
        fileTemp: [],
        dialogImageUrl: '',
        dialogVisible: false,
        picFormData: null,

        uploadDisabled: false,

        loading:false,

        allowAdd: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:PROPERTY:Trademark:INSERT'),//新增商标
        allowUpdate: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:PROPERTY:Trademark:UPDATE'),//编辑商标
        // allowDetail: this.authorityControl('SYSTEM:CUSTOMER:MANAGE', 'SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:CENTER:PROPERTY:Trademark:DETAILS'),//查询商标详情
        allowDetail: true,
      }
    },
    created() {
      this.pageType = this.$route.query.type;
    },
    activated() {
      this.getUserNameData();
      this.getIPCData();
      // this.getTrademarkTypeData();
      this.getLatestStatusData();
      this.isHeaderName();
      this.form = {
        crmCompanyId: "",
        trademarkName: "",
        goodsService: "",
        similarGroup: "",
        trademarkNo: "",
        applyDate: "",
        internationalClassify: "",
        applyName: "",
        applyAddress: "",
        trialNoticeNo: "",
        registerNoticeNo: "",
        trialNoticeDate: "",
        registerNoticeDate: "",
        trademarkType: "",
        specialStartDate: "",
        specialEndDate: "",
        trademarkShape: "",
        internationalRegisterDate: "",
        specifiedDate: "",
        priorityDate: "",
        isPublicTrademark: "",
        trademarkState: "",
        file: "",
      };
      this.fileTemp = []

      if(this.$route.query.companyId){
        this.form.crmCompanyId = this.$route.query.companyId;
      }

      if (this.pageType === "edit" || this.pageType === "read") {
        this.getFormDetail()
      }
      if (this.pageType === "read") {
        this.uploadDisabled = true
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
      //点击选择客户名称
      setCompanyNameHandle(val) {
        this.userNameList.forEach(item => {
          if (item.crmCompanyId === val) {
            this.form.crmCompanyName = item.companyName;
          }
        });
      },
      // 获取客户名称
      getUserNameData() {
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

      //获取国际分类
      getIPCData() {
        let params = {
          keyList: 'DICT:TRADEMARK_INTERNATIONAL_TYPE',
        };
        commonDict(params).then(res => {
          if (res.code === 200) {
            this.IPCData = res.data['DICT:TRADEMARK_INTERNATIONAL_TYPE'];
          }
        })
      },

      //获取商标类型
      // getTrademarkTypeData(){
      //   let params = {
      //     keyList: 'DICT:TRADEMARK_TYPE',
      //   };
      //   commonDict(params).then(res=>{
      //     if(res.code === 200){
      //       this.trademarkTypeData = res.data['DICT:TRADEMARK_TYPE'];
      //     }
      //   })
      // },

      //获取最新状态
      getLatestStatusData() {
        let params = {
          keyList: 'DICT:TRADEMARK_LATEST_STATUS',
        };
        commonDict(params).then(res => {
          if (res.code === 200) {
            this.latestStatusData = res.data['DICT:TRADEMARK_LATEST_STATUS'];
          }
        })
      },

      //判断头部名称
      isHeaderName() {
        if (this.pageType === 'read') {
          this.titleName = '商标详情'
        } else if (this.pageType === 'add') {
          this.titleName = '新增商标'
        } else if (this.pageType === 'edit') {
          this.titleName = '编辑商标'
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
      handlePic(file,fileList) {
        let fileName = file.raw.name.substr(file.raw.name.lastIndexOf("."));
        if (fileName !== '.jpg' && fileName !== '.png') {
          this.$message({type: 'warning', message: '请上传有效的.jpg或.png文件'});
          return;
        }
        if (fileList.length > 1) {
          fileList.splice(0, 1);
        }
        this.form.file = file.raw;
      },

      // 确认提交---新增
      handSubmit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            const formData = new FormData();
            formData.append('companyId', this.form.crmCompanyId);
            formData.append('companyName', this.form.crmCompanyName);
            formData.append('trademarkName', this.form.trademarkName);
            formData.append('goodsService', this.form.goodsService);
            formData.append('similarGroup', this.form.similarGroup);
            formData.append('trademarkNo', this.form.trademarkNo);
            formData.append('applyDate', this.form.applyDate);
            formData.append('internationalClassify', this.form.internationalClassify);
            formData.append('applyName', this.form.applyName);
            formData.append('applyAddress', this.form.applyAddress);
            formData.append('trialNoticeNo', this.form.trialNoticeNo);
            formData.append('registerNoticeNo', this.form.registerNoticeNo);
            formData.append('trialNoticeDate', this.form.trialNoticeDate);
            formData.append('registerNoticeDate', this.form.registerNoticeDate);
            formData.append('trademarkType', this.form.trademarkType);
            formData.append('specialStartDate', this.form.specialStartDate);
            formData.append('specialEndDate', this.form.specialEndDate);
            formData.append('trademarkShape', this.form.trademarkShape);
            formData.append('internationalRegisterDate', this.form.internationalRegisterDate);
            formData.append('specifiedDate', this.form.specifiedDate);
            formData.append('priorityDate', this.form.priorityDate);
            formData.append('isPublicTrademark', this.form.isPublicTrademark);
            formData.append('trademarkState', this.form.trademarkState);
            if (this.fileTemp.length !== 0) {
              let fileIdArr = this.fileTemp.map(item => {
                return item.fileId
              })
              this.form.fileIds = fileIdArr.join(',')
            }

            formData.append('fileIds', this.form.fileIds);

            saveTrademark(formData).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.form = {};
                this.fileTemp = []
                this.$store.commit('SET_TRADEMARK_SCROLL', 0)
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
      getFormDetail() {
        if(this.allowDetail.twoAllow){
          queryTrademarkInfoById({TrademarkId: this.$route.query.trademarkId}).then(res => {
            if (res.code === 200) {
              let form = JSON.parse(JSON.stringify(res.data));
              form.crmCompanyId = form.companyId;
              form.crmCompanyIdName = form.companyName;
              form.isPublicTrademark = form.isPublicTrademark.toString();
              Object.keys(this.form).forEach(item => {
                if (!form.hasOwnProperty(item)) {
                  form[item] = ""
                }
              });

              this.form = form;
              if (this.pageType === 'read') {
                this.IPCData.forEach(item => {
                  if (item.dictId == res.data.internationalClassify) {
                    this.form.internationalClassifyName = item.dictName;
                  }
                });

                this.isShareMark.forEach(item => {
                  if (item.keys == res.data.isPublicTrademark) {
                    this.form.isPublicTrademarkName = item.name;
                  }
                })

                this.trademarkTypeData.forEach(item => {
                  if (item.keys == res.data.trademarkType) {
                    this.form.trademarkTypeName = item.name;
                  }
                })

                this.latestStatusData.forEach(item => {
                  if (item.dictId == res.data.trademarkState) {
                    this.form.trademarkStateName = item.dictName;
                  }
                })
              }
              if (res.data.fileIds && res.data.fileIds !== "") {
                let fileArr = res.data.fileIds.split(',');
                getFileListWithFileIds({fileIds: fileArr, haveView: true}).then(res => {
                  if (res.code == 200) {
                    res.data.forEach(item => {
                      item.isShowDan = false;
                    })
                    this.fileTemp = res.data;
                  } else {
                    this.$message.warning(res.message)
                  }
                })
              }
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取此详情')
        }
      },


      // 确认提交---编辑
      handSubmitEdit(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            Object.keys(this.form).forEach(item => {
              if (this.form[item] === null || this.form[item] === undefined) {
                this.form[item] = "";
              }
            });


            const formData = new FormData();
            formData.append('companyId', this.form.crmCompanyId);
            formData.append('companyName', this.form.crmCompanyIdName);
            formData.append('trademarkName', this.form.trademarkName);
            formData.append('goodsService', this.form.goodsService);
            formData.append('similarGroup', this.form.similarGroup);
            formData.append('trademarkNo', this.form.trademarkNo);
            formData.append('applyDate', this.form.applyDate);
            formData.append('internationalClassify', this.form.internationalClassify);
            formData.append('applyName', this.form.applyName);
            formData.append('applyAddress', this.form.applyAddress);
            formData.append('trialNoticeNo', this.form.trialNoticeNo);
            formData.append('registerNoticeNo', this.form.registerNoticeNo);
            formData.append('trialNoticeDate', this.form.trialNoticeDate);
            formData.append('registerNoticeDate', this.form.registerNoticeDate);
            formData.append('trademarkType', this.form.trademarkType);
            formData.append('specialStartDate', this.form.specialStartDate);
            formData.append('specialEndDate', this.form.specialEndDate);
            formData.append('trademarkShape', this.form.trademarkShape);
            formData.append('internationalRegisterDate', this.form.internationalRegisterDate);
            formData.append('specifiedDate', this.form.specifiedDate);
            formData.append('priorityDate', this.form.priorityDate);
            formData.append('isPublicTrademark', this.form.isPublicTrademark);
            formData.append('trademarkState', this.form.trademarkState);

            if (this.fileTemp.length !== 0) {
              let fileIdArr = this.fileTemp.map(item => {
                return item.fileId
              })
              this.form.fileIds = fileIdArr.join(',')
            }
            formData.append('fileIds', this.form.fileIds);
            formData.append('trademarkId', this.$route.query.trademarkId);


            updateTrademark(formData).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.form = {};
                this.fileTemp = [];
                this.$store.commit('SET_TRADEMARK_SCROLL', 0)
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
        //   'path': '/ipr/trademark/list',
        // })
        this.$store.state.tagsView.visitedViews.forEach((item, key) => {
          if(item.name == '客户中心-商标详情'){
            sessionStorage.removeItem('demandForm');
            this.$store.state.tagsView.visitedViews.splice(key, 1)
          }
        });
        this.form = {};
        this.fileTemp = [];
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

      //上传图片
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
        let filePath = intellectualUpload(this.$store.getters.companyName, '商标', fileName) + '.' + fileType
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
            };

            addFileBatch(params).then(response => {
              if (response.code == 200) {
                this.$message.success('上传成功');
                response.data[0].isShowDan = false;
                this.fileTemp = response.data;
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

      //鼠标放到图片上的时候
      filesOver(index) {
        this.fileTemp[index].isShowDan = true
      },

      //鼠标离开图片上的时候
      filesOut(index) {
        this.fileTemp[index].isShowDan = false;
      },

      //点击查看大图片
      readBigPicHandle(data) {
        this.dialogImageUrl = data.fileUrl;
        this.dialogVisible = true;
      },

      //删除图片
      delFilePicHandle(index) {
        this.fileTemp.splice(index, 1);
      }
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

            /deep/ .el-input.is-disabled .el-input__inner {
              color: #444;
            }

          }
        }
      }
    }

    .upload-pic {
      /deep/ .el-upload {
        width: 100px;
        height: 100px;
        line-height: 110px;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;

        .icon-plus {
          color: #8c939d;
          font-size: 28px;
        }
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
        justify-content: center;
        max-width: 920px;
        max-height: 614px;
        overflow: hidden;

        img {
          width: auto;
          height: 100%;
        }
      }
    }

    .btn-group-handle {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      .btn {
        width: 100px;
        height: 38px;
        font-size: 16px;
        padding: 0;

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

  .file-list {
    margin-right: 10px;
    display: flex;

    li {
      position: relative;
      margin-right: 10px;
      border-radius: 4px;
      width: 100px;
      height: 100px;
      border: 1px solid #c0ccda;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 8px;
      box-sizing: border-box;

      img {
        width: auto;
      }

      .transition-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          color: #fff;
          cursor: pointer;
          font-size: 22px;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  /deep/ .disabled .el-upload--picture-card {
    display: none !important;
  }

  /deep/ .disabled .el-upload-list__item-delete {
    display: none !important;
  }

</style>
