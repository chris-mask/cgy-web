<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row class="row-width-auto-margin-0-90" style="margin-bottom: 20px;">
      <!--搜索-->
      <el-card class="top-margin-10 center-items">
        <el-tabs v-model="search_type" type="card" @tab-click="handleTabChange">
          <el-tab-pane label="专利" name="patent"></el-tab-pane>
          <el-tab-pane label="著作权" name="copyright"></el-tab-pane>
          <el-tab-pane label="商标" name="trademark"></el-tab-pane>
          <el-tab-pane label="证书" name="cert"></el-tab-pane>
        </el-tabs>
        <el-form :inline="true">
          <el-form-item>
            <input type="text" class="search_input width-400" :placeholder="search_placeholder" v-model="listQuery.name">
            <el-button class="bt_blue" @click="handleFilter"><span class="bt_font">搜一下</span></el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #03ADF4; font-weight: bold;">|</span>
          <span>
            <span>已选条件：</span>
            <span v-if="select_filter_list && select_filter_list.length > 0">
              <span v-for="item in select_filter_list" class="padding-vertical-5 padding-level-10 right-margin-10"
                    style="border: 1px solid #33B3EE; color: #33B3EE;">
                {{item.label}}
                <a @click="clearThisSelect(item)">x</a>
              </span>
              <a @click="clearAllSelect" class="padding-vertical-5 padding-level-10 right-margin-10"
                 style="border: 1px solid #ff0000; color: #ff0000;">清空所有</a>
            </span>
          </span>
          <span class="float-right right-margin-10" @click="getMoreCondition">
            <img v-if="more_condition" src="../../icons/enterprise/close_icon.png" style="vertical-align:middle;"/>
            <img v-else src="../../icons/enterprise/open_icon.png" style="vertical-align:middle;"/>
            <span style="color: #33B3EE;">选择筛选条件</span>
          </span>
        </div>
        <div v-if="more_condition">
          <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"></div>
          <div>
            <div class="top-margin-10">
              <el-form :inline="true">
                <el-form-item label="常用：" class="margin-0">
                  <span v-if="filter_user_list">
                    <el-col :span="4">
                      <el-select @change='handleFilter' filterable clearable v-model="listQuery.department" placeholder="选择部门">
                        <el-option v-for="item in filter_department_list" :key="item.biz_id" :label="item.department_name"
                                   :value="item.biz_id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="4">
                    <el-select @change='handleFilter' filterable clearable v-model="listQuery.sys_user" placeholder="选择员工">
                      <el-option v-for="item in filter_user_list" :key="item.biz_id" :label="item.user_name" :value="item.biz_id"></el-option>
                    </el-select>
                  </el-col>
                  </span>
                  <el-col :span="4">
                    <el-select @change='changeProvince' clearable v-model="listQuery.province_id"
                               placeholder="省份">
                      <el-option v-for="item in province_list" :key="item.pk" :label="item.province_name" :value="item.pk"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select @change='changeCity' clearable v-model="listQuery.city_id" placeholder="城市"
                               style="margin-left: 20px;">
                      <el-option v-for="item in city_list" :key="item.pk" :label="item.city_name" :value="item.pk"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select @change='changeDistrict' clearable v-model="listQuery.district_id" placeholder="县区"
                               style="margin-left: 20px;">
                      <el-option v-for="item in district_list" :key="item.pk" :label="item.district_name" :value="item.pk"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select @change='changeTown' clearable v-model="listQuery.town_id" placeholder="镇街"
                               style="margin-left: 20px;">
                      <el-option v-for="item in town_list" :key="item.pk" :label="item.town_name" :value="item.pk"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="top-margin-10 padding-0">
        <div>
          <span class="float-right right-margin-10" style="vertical-align:middle;">
            <el-select @change='handleFilter' clearable v-model="listQuery.order_type" placeholder="默认排序">
              <el-option v-for="item in order_type_list" :key="item.key" :label="item.val" :value="item.key"></el-option>
            </el-select>
          </span>
          <div class="float-left">
            <span style="color: #03ADF4; font-weight: bold;">|</span>
            <span style="color: #ABABAB;">搜索到<span style="color:#F9A9A9;">{{total}}</span>条记录</span>
            <el-button class="bg_blue" style="margin-left: 10px;" @click="checkAllOrNo">全选</el-button>
            <el-button class="bg_blue" style="margin-left: 10px;" @click="handleDelete">删除</el-button>
          </div>
          <!--专利操作-->
          <span v-if="search_type === 'patent'">
            <el-button class="bg_blue" @click="handlePatentExport">导出</el-button>
            <div style="display: flex" class="float-left">
              <el-button class="bg_blue" @click="get_patent_temp">模板</el-button>
              <el-select class="width-200" v-model="import_enterprise_id" filterable clearable placeholder="请选择企业信息">
              <el-option
                v-for="item in ent_list"
                :key="item.id"
                :label="item.enterprise_name"
                :value="item.id">
              </el-option>
            </el-select>
              <el-upload :action="host + '/core/upload-files/'"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         :before-upload="beforeUpload"
                         :on-success="handleImportPatentSuccess"
                         :data="{ save_path: 'ipr/patent_info/file/delete/' }"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
            <el-button class="bg_blue">导入</el-button>
          </el-upload>
            </div>
          </span>
          <span v-else-if="search_type === 'copyright'">
            <el-button class="bg_blue" @click="handleCopyrightExport">导出</el-button>
            <div style="display: flex" class="float-left">
              <el-button class="bg_blue" @click="get_copyright_temp">模板</el-button>
              <div class="width-200">
                <el-select v-model="import_enterprise_id" filterable clearable placeholder="请选择企业信息">
                  <el-option
                    v-for="item in ent_list"
                    :key="item.id"
                    :label="item.enterprise_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <el-upload class="display_inline" :action="host + '/core/upload-files/'"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         :before-upload="beforeUpload"
                         :on-success="handleImportCopyrightSuccess"
                         :data="{ save_path: 'ipr/patent_info/file/delete/' }"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
              <el-button class="bg_blue">导入</el-button>
            </el-upload>
            </div>
          </span>
          <span v-else-if="search_type === 'trademark'">
            <el-button class="bg_blue" @click="handleTrademarkExport">导出</el-button>
            <div style="display: flex" class="float-left">
              <el-button class="bg_blue" @click="get_trademark_temp">模板</el-button>
              <div class="width-200">
              <el-select v-model="import_enterprise_id" filterable clearable placeholder="请选择企业信息">
                <el-option
                  v-for="item in ent_list"
                  :key="item.id"
                  :label="item.enterprise_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
              <el-upload class="display_inline" :action="host + '/core/upload-files/'"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         :before-upload="beforeUpload"
                         :on-success="handleImportTrademarkSuccess"
                         :data="{ save_path: 'ipr/patent_info/file/delete/' }"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <el-button class="bg_blue">导入</el-button>
              </el-upload>
            </div>
          </span>
          <span v-else-if="search_type === 'cert'">
            <el-button class="bg_blue" @click="handleCertExport">导出</el-button>
            <div style="display: flex" class="float-left">
              <el-button class="bg_blue" @click="get_cert_temp">模板</el-button>
              <div class="width-200">
              <el-select v-model="import_enterprise_id" filterable clearable placeholder="请选择企业信息">
                <el-option
                  v-for="item in ent_list"
                  :key="item.id"
                  :label="item.enterprise_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
              <el-upload class="display_inline" :action="host + '/core/upload-files/'"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-remove="beforeRemove"
                         :before-upload="beforeUpload"
                         :on-success="handleImportCertSuccess"
                         :data="{ save_path: 'ipr/patent_info/file/delete/' }"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <el-button class="bg_blue">导入</el-button>
              </el-upload>
            </div>
          </span>
        </div>
        <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"></div>

        <div class="top-margin-10 overflow-x" style="padding-bottom: 20px; border-bottom: 2px solid #F1F0F2;" v-for="(item, index) in list">
          <!--图标div-->
          <div class="float-left overflow-x" style="width: 150px; min-height: 100px;">
            <div class="float-left center-items right-margin-10">
              <input type="checkbox" name="check_biz_ids" :value="item.biz_id" v-model="check_biz_ids"/>
            </div>
            <div class="float-left">
              <div class="type_bg center-items right-margin-10" :style="{backgroundColor:'#69CCFF'}">
                <div class="type_font">{{search_type==='patent'?'专利':search_type==='copyright'?'著作':search_type==='trademark'?'商标':'证书'}}</div>
              </div>
            </div>
          </div>
          <!--内容div-->
          <span v-if="search_type==='patent'">
            <div class="float-left overflow-x" style="width: 75%;">
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="12">
                {{item.enterprise__enterprise_name}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                业务员:{{item.business_manager_name_list}}
              </el-col>
              <el-col :span="6">
                专利名称:{{item.patent_name}}
              </el-col>
              <el-col :span="6">
                专利类型:{{item.patent_type_str}}
              </el-col>
              <el-col :span="6">
                专利号:{{item.patent_apply_no}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                缴年费截止日:{{item.annual_fee_date}}
              </el-col>
              <el-col :span="6">
                第一申请人:{{item.first_applicant}}
              </el-col>
              <el-col :span="6">
                申请日期:{{item.apply_date}}
              </el-col>
              <el-col :span="6">
                更新日期:{{item.last_update_time|parseTime('{y}-{m}-{d}')}}
              </el-col>
            </el-row>
          </div>
          </span>
          <span v-else-if="search_type==='copyright'">
            <div class="float-left overflow-x" style="width: 75%;">
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="12">
                {{item.enterprise__enterprise_name}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                业务员:{{item.business_manager_name_list}}
              </el-col>
              <el-col :span="6">
                著作权全称:{{item.copyright_name}}
              </el-col>
              <el-col :span="6">
                著作权人:{{item.copyright_owner}}
              </el-col>
              <el-col :span="6">
                登记号:{{item.register_no}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                登记日期:{{item.approval_date}}
              </el-col>
              <el-col :span="6">
                版本号:{{item.version_no}}
              </el-col>
            </el-row>
          </div>
          </span>
          <span v-else-if="search_type==='trademark'">
            <div class="float-left overflow-x" style="width: 75%;">
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="12">
                {{item.enterprise__enterprise_name}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                业务员:{{item.business_manager_name_list}}
              </el-col>
              <el-col :span="6">
                商标名称:{{item.trademark_name}}
              </el-col>
              <el-col :span="6">
                商标类型:{{item.trademark_type_str}}
              </el-col>
              <el-col :span="6">
                国际分类:{{item.international_classify|lengthFilter('无')}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                申请时间:{{item.apply_date}}
              </el-col>
              <el-col :span="6">
                最新状态:{{item.trademark_state_str}}
              </el-col>
            </el-row>
          </div>
          </span>
          <span v-else-if="search_type==='cert'">
            <div class="float-left overflow-x" style="width: 75%;">
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="12">
                {{item.enterprise__enterprise_name}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                业务员:{{item.business_manager_name_list}}
              </el-col>
              <el-col :span="6">
                证书名称:{{item.certificate_name|lengthFilter('无')}}
              </el-col>
              <el-col :span="6">
                证书编号:{{item.certificate_no|lengthFilter('无')}}
              </el-col>
              <el-col :span="6">
                证书状态:{{item.certificate_state|lengthFilter('无')}}
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="6">
                颁发日期:{{item.issue_date|lengthFilter('无')}}
              </el-col>
              <el-col :span="6">
                到期日期:{{item.expire_date|lengthFilter('无')}}
              </el-col>
              <el-col :span="6">
                初次获证日期:{{item.first_obtain_date|lengthFilter('无')}}
              </el-col>
              <el-col :span="6">
                发证机构名称:{{item.institution_name|lengthFilter('无')}}
              </el-col>
            </el-row>
          </div>
          </span>

          <!--操作div-->
          <div class="float-right right-margin-10 text-align-center overflow-x" style="width: 90px; min-height: 100px;">
            <!--<el-button class="filter-item bg_blue left-margin-10" @click="handleCheck(item)">查看</el-button>-->
          </div>
        </div>

        <!--加载更多-->
        <div class="padding-0" style="margin-top: 20px;">
          <div style="text-align: center; height: 40px; line-height: 30px;" @click="loadMore">{{list.length >= total ? '没有更多' : '加载更多'}}</div>
        </div>
      </el-card>
    </el-row>

    <!--弹窗-->
  </div>
</template>

<script>
  // import { iprMng, iprMngFilter, iprDelete } from '@/api/v2_ipr'
  // import { importPatentInfoExcel, importCopyrightInfoExcel, importTrademarkInfoExcel, importCertificateInfoExcel } from '@/api/ipr'
  // import { getProvince, getCity, getDistrict, getTown } from '@/api/area'
  import qs from 'qs'

  var initListQuery = {
    page: 1,
    limit: 20
  }
  export default {
    name: 'ipr_list',
    components: {},
    props: {},
    data() {
      return {
        search_keyword: null,
        search_type: 'patent',
        hot_search_keyword_list: ['wtf', 'wtf'],
        search_placeholder_list: { 'patent': '请输入专利名称', 'copyright': '请输入著作名称', 'trademark': '请输入商标名称', 'cert': '请输入证书名称' },
        search_placeholder: '请输入专利名称',
        more_condition: false,
        host: process.env.BASE_API,
        list: [],
        total: 0,
        count: 0,
        listQuery: JSON.parse(JSON.stringify(initListQuery)),
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        import_enterprise_id: undefined,
        fileList: [], // 导入回显文件
        import_temp: [], // 导入临时文件
        ent_list: [], // 客户列表
        filter_department_list: [], // 部门列表
        filter_user_list: [], // 用户列表
        isCheckAll: false, // 是否已经全选
        check_biz_ids: [], // 勾选行的biz_id
        select_filter_list: [], // 已选条件
        order_type_list: [] // 排序
      }
    },
    filters: {},
    mounted() {
      this.getListFilter()
      this.getList()
      this.getProvinces()
    },
    methods: {
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
      // 点击加载更多
      loadMore() {
        this.listQuery.page += 1
        this.listLoading = true
        if (this.list.length < this.total) {
          iprMng(this.listQuery).then(res => {
            this.list = this.list.concat(res.data.data)
          })
        }
      },
      // 筛选更多条件
      getMoreCondition() {
        this.more_condition = !this.more_condition
      },
      getProvinces() {
        // getProvince({}).then(response => {
        //   this.province_list = response.data.provinces
        // })
      },
      areaSetNull(level) {
        if (level === 3) {
          this.listQuery.city_id = ''
          this.citys = []
        }
        if (level >= 2) {
          this.listQuery.district_id = ''
          this.districts = []
        }
        if (level >= 1) {
          this.listQuery.town_id = ''
          this.towns = []
        }
      },
      changeProvince() {
        this.listQuery.page = 1
        this.areaSetNull(3)
        this.getCitys()
        this.getList()
      },
      getCitys() {
        // getCity({ 'provinceId': this.listQuery.province_id }).then(response => {
        //   this.city_list = response.data.cities
        // })
      },
      changeCity() {
        this.listQuery.page = 1
        this.areaSetNull(2)
        this.getDistricts()
        this.getList()
      },
      getDistricts() {
        // getDistrict({ 'cityId': this.listQuery.city_id }).then(response => {
        //   this.district_list = response.data.districts
        // })
      },
      changeDistrict() {
        this.listQuery.page = 1
        this.areaSetNull(1)
        this.getTowns()
        this.getList()
      },
      changeTown() {
        this.listQuery.page = 1
        this.getList()
      },
      getTowns() {
        // getTown({ 'districtId': this.listQuery.district_id }).then(response => {
        //   this.town_list = response.data.town
        // })
      },
      // 重定向
      handleRedirect(redirect_url) {
        if (!redirect_url) {
          redirect_url = ''
        }
        const routeUrl = this.$router.resolve({ path: redirect_url })
        window.open(routeUrl.href, '_blank')
      },
      // 搜索tab切换
      handleTabChange() {
        this.search_placeholder = this.search_placeholder_list[this.search_type]
        this.handleFilter()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        this.listQuery.search_type = this.search_type
        // iprMng(this.listQuery).then(res => {
        //   this.list = res.data.data
        //   this.total = res.data.recordsTotal
        //   this.select_filter_list = res.data.select_filter_list
        //   this.listQuery.cur_user_biz_id = res.data.cur_user_biz_id
        //   this.filter_department_list = res.data.filter_department_list
        //   this.filter_user_list = res.data.filter_user_list
        // })
      },
      // 清空已选条件
      clearAllSelect() {
        this.listQuery = JSON.parse(JSON.stringify(initListQuery))
        this.getList()
      },
      // 删除当前已选条件
      clearThisSelect(item) {
        if (item.key in this.listQuery) {
          var cur_list = this.listQuery[item.key]
          if (cur_list instanceof Array && cur_list.indexOf(item.val) !== -1) {
            cur_list.splice(cur_list.indexOf(item.val), 1)
          } else {
            delete this.listQuery[item.key]
          }
        }
        this.getList()
      },
      // 全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.list.forEach(function(item, index) {
            if (_this.check_biz_ids.indexOf(item.biz_id) === -1) {
              _this.check_biz_ids.push(item.biz_id)
            }
            _this.isCheckAll = true
          })
        }
      },
      // 筛选参数
      getListFilter() {
        // iprMngFilter().then(res => {
        //   if (res.data.code === 1) {
        //     this.ent_list = res.data.data.ent_list
        //   }
        // })
      },
      // 处理删除
      handleDelete() {
        if (this.check_biz_ids.length <= 0) {
          this.$message.error('请勾选删除的行!')
          return false
        }
        this.$confirm('您确定删除吗？').then(_ => {
          // iprDelete({ biz_id: this.check_biz_ids }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message({
          //       message: '操作成功',
          //       type: 'success'
          //     })
          //     this.getList()
          //   }
          // })
        })
      },
      // 查看
      handleCheck(data) {
        var redirect_url = ''
        this.handleRedirect(redirect_url)
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      beforeUpload(file) {
        if ((file.type.toLocaleLowerCase() !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') && (file.type.toLocaleLowerCase() !== 'application/vnd.ms-excel') && (file.name.split('.')[1] !== 'xlsx') && (file.name.split('.')[1] !== 'xls')) {
          this.$message.error('导入文件必须是xlsx')
          return false
        }
        if (this.import_enterprise_id === '' || this.import_enterprise_id === undefined || this.import_enterprise_id === null) {
          this.$message({
            type: 'info',
            message: '请先选择企业'
          })
          return false
        }
        return true
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {

      },
      // 专利导入导出
      get_patent_temp() {
        window.open(this.host + '/enterprise/download-excel-api?url=/media/xlsx_file/patent_info_temp.xlsx&name=' + '专利信息导入模板', '_blank')
      },
      handlePatentExport() {
        window.open(this.host + '/ipr/export-patent-excel/?' + qs.stringify(this.listQuery))
      },
      handleImportPatentSuccess(res, file, fileList) {
        this.import_temp = res.url
        this.$confirm('确定导入销售计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // importPatentInfoExcel({ 'import_temp': this.import_temp, 'enterprise_id': this.import_enterprise_id }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message({
          //       message: '导入成功',
          //       type: 'success'
          //     })
          //     this.getList()
          //   }
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '导入已取消'
          })
        }).finally(() => {
          this.fileList = [] // 清空excel文件
        })
      },
      // 著作导入导出
      get_copyright_temp() {
        window.open(this.host + '/enterprise/download-excel-api?url=/media/xlsx_file/copyright_info_temp.xlsx&name=' + '著作权信息导入模板', '_blank')
      },
      handleCopyrightExport() {
        window.open(this.host + '/ipr/export-copyright-excel/?' + qs.stringify(this.listQuery))
      },
      handleImportCopyrightSuccess(res, file, fileList) {
        this.import_temp = res.url
        this.$confirm('确定导入销售计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // importCopyrightInfoExcel({ 'import_temp': this.import_temp, 'enterprise_id': this.import_enterprise_id }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message({
          //       message: '导入成功',
          //       type: 'success'
          //     })
          //     this.getList()
          //   }
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '导入已取消'
          })
        }).finally(() => {
          this.fileList = [] // 清空excel文件
        })
      },
      // 商标导入导出
      get_trademark_temp() {
        window.open(this.host + '/enterprise/download-excel-api?url=/media/xlsx_file/trademark_info_temp.xlsx&name=' + '商标信息导入模板', '_blank')
      },
      handleTrademarkExport() {
        window.open(this.host + '/ipr/export-trademark-excel/?' + qs.stringify(this.listQuery))
      },
      handleImportTrademarkSuccess(res, file, fileList) {
        this.import_temp = res.url
        this.$confirm('确定导入销售计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // importTrademarkInfoExcel({ 'import_temp': this.import_temp, 'enterprise_id': this.import_enterprise_id }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message({
          //       message: '导入成功',
          //       type: 'success'
          //     })
          //     this.getList()
          //   }
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '导入已取消'
          })
        }).finally(() => {
          this.fileList = [] // 清空excel文件
        })
      },
      // 证书导入导出
      get_cert_temp() {
        window.open(this.host + '/enterprise/download-excel-api?url=/media/xlsx_file/certificate_info_temp.xlsx&name=' + '企业证书信息导入模板', '_blank')
      },
      handleCertExport() {
        window.open(this.host + '/ipr/export-certificate-excel/?' + qs.stringify(this.listQuery))
      },
      handleImportCertSuccess(res, file, fileList) {
        this.import_temp = res.url
        this.$confirm('确定导入销售计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // importCertificateInfoExcel({ 'import_temp': this.import_temp, 'enterprise_id': this.import_enterprise_id }).then(res => {
          //   if (res.data.code === 1) {
          //     this.$message({
          //       message: '导入成功',
          //       type: 'success'
          //     })
          //     this.getList()
          //   }
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '导入已取消'
          })
        }).finally(() => {
          this.fileList = [] // 清空excel文件
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
  }

  .overflow-x {
    overflow-x: hidden;
  }

  .overflow-y {
    overflow-y: hidden;
  }

  .display_inline {
    display: inline;
  }

  .margin-0 {
    margin: 0px;
  }

  .top-margin-10 {
    margin-top: 10px;
  }

  .left-margin-10 {
    margin-left: 10px;
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

  .all-width {
    width: 100%;
  }

  .width-50 {
    width: 50px;
  }

  .width-100 {
    width: 100px;
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

  .hot-search {
    width: 48px;
    height: 17px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: rgba(4, 43, 64, 1);
    opacity: 1;
  }

  .hot-search-kw {
    margin: auto 10px;
    width: 24px;
    height: 16px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 16px;
    color: rgba(151, 151, 151, 1);
    opacity: 1;
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

  .text-align-center {
    text-align: center;
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

  .search_input {
    height: 48px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(5, 170, 255, 0.7294117647058823);
    opacity: 1;
  }

  .bg_blue {
    background: #05AAFF;
    color: #fff;
    &:hover {
      background: #05AAFF;
      opacity: 0.5;
    }
  }

  .bt_blue {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  .bt_purple {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  .bt_font {
    width: 96px;
    height: 22px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  .type_bg {
    width: 84px;
    height: 84px;
    background: rgba(145, 229, 161, 1);
    border-radius: 10px;
    opacity: 1;
  }

  .type_font {
    width: 36px;
    height: 50px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  .policy_notice_name {
    width: 100%;
    height: 24px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 24px;
    color: rgba(68, 68, 68, 1);
    opacity: 1;
  }

  .normal_name {
    width: 70px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(68, 68, 68, 0.75);
    opacity: 1;
  }

  .red_name {
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(245, 108, 108, 1);
    opacity: 1;
  }

  .can_click {
    width: 42px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgb(5, 170, 255);
    opacity: 1;
  }

  .project_bg {
    border-radius: 5px;
    padding: 1px 10px;
    width: 75%;
    background: rgba(239, 250, 255, 1);
    opacity: 1;
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

  .edit_bt {
    width: 80px;
    height: 30px;
    background: rgba(5, 170, 255, 1);
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  .send_sms_bt {
    width: 80px;
    height: 30px;
    background: #FFCBA6;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }

  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 15px;
    position: relative;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9
  }

  input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #05AAFF;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid #05AAFF;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
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
</style>
