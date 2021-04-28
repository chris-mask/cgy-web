<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <!--主体-->
    <el-row style="margin-bottom: 20px;">
      <!--搜索-->
      <div>
        <!--<el-card class="top-margin-10 center-items">-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item>-->
        <!--<input type="text" class="search_input" placeholder="  输入名称/项目名称/发布单位" v-model="listQuery.name">-->
        <!--<el-button class="bt_blue" @click="handleFilter"><span class="bt_font">搜一下</span></el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button :class="listQuery.is_delete?'bt_purple':'bt_blue'" @click="checkDeleteRecord"><span class="bt_font">已删除记录</span></el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button class="bt_blue" @click="handleRedirect('')"><span class="bt_font">新增</span></el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</el-card>-->
        <!--<el-card class="top-margin-10 padding-0">-->
        <!--<div>-->
        <!--<span style="color: #03ADF4; font-weight: bold;">|</span>-->
        <!--<span>-->
        <!--<span>已选条件：</span>-->
        <!--<span v-if="select_filter_list && select_filter_list.length > 0">-->
        <!--<span v-for="item in select_filter_list" class="padding-vertical-5 padding-level-10 right-margin-10 blue-border">-->
        <!--{{item.label}}-->
        <!--<a @click="clearThisSelect(item)">x</a>-->
        <!--</span>-->
        <!--<a @click="clearAllSelect" class="padding-vertical-5 padding-level-10 right-margin-10 red-border">清空所有</a>-->
        <!--</span>-->
        <!--</span>-->
        <!--<span class="float-right right-margin-10" @click="getMoreCondition">-->
        <!--<img v-if="more_condition" src="../../../icons/enterprise/close_icon.png" style="vertical-align:middle;"/>-->
        <!--<img v-else src="../../../icons/enterprise/open_icon.png" style="vertical-align:middle;"/>-->
        <!--<span style="color: #33B3EE;">选择筛选条件</span>-->
        <!--</span>-->
        <!--</div>-->
        <!--<div v-if="more_condition">-->
        <!--<div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 10px;"></div>-->
        <!--<div>-->
        <!--<div class="top-margin-10">-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="常用：" class="bottom-margin-5">-->
        <!--<el-col :span="14">-->
        <!--<el-select @change='handleFilter' clearable style="" class="filter-item" v-model="listQuery.supply_industry"-->
        <!--placeholder="补贴行业">-->
        <!--<el-option v-for="item in supply_industry_list" :key="item[0]" :label="item[1]" :value="item[0]"></el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="补贴地区：" class="bottom-margin-5">-->
        <!--<el-col :span="4">-->
        <!--<el-select @change='changeProvince' clearable filterable style="" class="filter-item" v-model="listQuery.province_id"-->
        <!--placeholder="省份">-->
        <!--<el-option v-for="item in province_list" :key="item.pk" :label="item.province_name" :value="item.pk"></el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
        <!--<el-select @change='changeCity' clearable filterable class="filter-item" v-model="listQuery.city_id" placeholder="城市"-->
        <!--style="margin-left: 20px;">-->
        <!--<el-option v-for="item in city_list" :key="item.pk" :label="item.city_name" :value="item.pk"></el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
        <!--<el-select @change='changeDistrict' clearable filterable class="filter-item" v-model="listQuery.district_id" placeholder="县区"-->
        <!--style="margin-left: 20px;">-->
        <!--<el-option v-for="item in district_list" :key="item.pk" :label="item.district_name" :value="item.pk"></el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
        <!--<el-select @change='changeTown' clearable filterable class="filter-item" v-model="listQuery.town_id" placeholder="镇街"-->
        <!--style="margin-left: 20px;">-->
        <!--<el-option v-for="item in town_list" :key="item.pk" :label="item.town_name" :value="item.pk"></el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="项目类型：" class="bottom-margin-5">-->
        <!--<el-checkbox-group v-model="listQuery.project_type_list">-->
        <!--<el-checkbox :label="item.dict_name" v-for="item in project_type_list" :key="item.dict_name">{{item.dict_name}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="补助金额：" class="bottom-margin-5">-->
        <!--<el-checkbox-group v-model="listQuery.subsidy_total_list">-->
        <!--<el-checkbox :label="item.key" v-for="item in subsidy_total_list" :key="item.key">{{item.val}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="线上截止时间：" class="bottom-margin-5">-->
        <!--<el-checkbox-group v-model="listQuery.submit_online_end_list" :max="1">-->
        <!--<el-checkbox :label="item.key" v-for="item in date_list" :key="item.key">{{item.val}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="纸质截止时间：" class="bottom-margin-5">-->
        <!--<el-checkbox-group v-model="listQuery.submit_paper_end_list" :max="1">-->
        <!--<el-checkbox :label="item.key" v-for="item in date_list" :key="item.key">{{item.val}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="发布时间：" class="bottom-margin-5">-->
        <!--<el-checkbox-group v-model="listQuery.publish_date_list" :max="1">-->
        <!--<el-checkbox :label="item.key" v-for="item in date_list" :key="item.key">{{item.val}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="申报状态：" class="bottom-margin-5">-->
        <!--<el-checkbox-group v-model="listQuery.apply_state_list" :max="1">-->
        <!--<el-checkbox :label="item.key" v-for="item in apply_state_list" :key="item.key">{{item.val}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<div>-->
        <!--<el-form :inline="true">-->
        <!--<el-form-item label="类型类型：" class="bottom-margin-5">-->
        <!--<el-checkbox-group v-model="listQuery.type_list">-->
        <!--<el-checkbox :label="item[0]" v-for="item in type_list" :key="item[0]">{{item[1]}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-card>-->
      </div>

      <el-card class="top-margin-10 padding-0">
        <div>
          <span style="color: #03ADF4; font-weight: bold;">|</span>
          <span style="color: #ABABAB;">搜索到<span style="color:#F9A9A9;">{{total}}</span>条记录</span>
          <a @click="checkAllOrNo" class="padding-5 right-margin-10 blue-border">全选</a>
          <a @click="handleCreate" class="padding-5 right-margin-10 blue-border">新增</a>
          <a @click="handleDelete" class="padding-5 right-margin-10 red-border">删除</a>
          <span class="float-right right-margin-10" style="vertical-align:middle;margin-top: -10px;">
            <el-select @change='handleFilter' clearable v-model="listQuery.order_type" placeholder="默认排序">
              <el-option v-for="item in order_type_list" :key="item.key" :label="item.val" :value="item.key"></el-option>
            </el-select>
          </span>
        </div>
        <div style="height: 3px; background-color: #EDF4FF; width: 100%; margin-top: 20px;"></div>

        <div class="top-margin-10" style="padding-bottom: 20px; border-bottom: 2px solid #F1F0F2; overflow:hidden;" v-for="(item, index) in list">
          <!--logo-->
          <div style="width: 150px;">
            <div class="float-left center-items right-margin-10">
              <input type="checkbox" name="check_biz_ids" :value="item.biz_id" v-model="check_biz_ids"/>
            </div>
            <div class="float-left">
              <div class="type_bg center-items right-margin-10" :style="{backgroundColor:item.background_color}">
                <div class="type_font">证书</div>
              </div>
            </div>
          </div>

          <!--内容div-->
          <div class="float-left overflow-x content-font" style="width: 75%;">
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="12" class="policy_notice_name">
                <a @click="handleCheck(item)">
                  {{item.certificate_name|interceptString(0,20)}}
                </a>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="8">
                证书编号：<span>{{item.certificate_no|lengthFilter('-')}}</span>
              </el-col>
              <el-col :span="16">
                颁发日期：<span>{{item.issue_date|lengthFilter('-')}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="8">
                到期日期：<span>{{item.expire_date|lengthFilter('-')}}</span>
              </el-col>
              <el-col :span="8">
                初次获证日期：<span>{{item.first_obtain_date|lengthFilter('-')}}</span>
              </el-col>
              <el-col :span="8">
                发证机构名称：<span>{{item.institution_name|lengthFilter('-')}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="top-margin-10">
              <el-col :span="8">
                证书简介：<span>{{item.cert_abstract|lengthFilter('-')}}</span>
              </el-col>
              <el-col :span="8">
                证书状态：<span>{{item.certificate_state|lengthFilter('-')}}</span>
              </el-col>
            </el-row>
          </div>

          <!--操作div-->
          <div class="float-right right-margin-10 text-align-center overflow-x" style="width: 90px; min-height: 100px;">
            <button @click="handleUpdate(item)" class="float-right send_sms_bt bottom-margin-4">查看</button>
            <button @click="handleUpdate(item)" class="float-right edit_bt bottom-margin-4">编辑</button>
          </div>

        </div>

        <!--加载更多-->
        <div class="padding-0" style="margin-top: 20px;">
          <div style="text-align: center; height: 40px; line-height: 30px;" @click="loadMore">{{list.length >= total ? '没有更多' : '加载更多'}}</div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  // import { iprCertMng, iprCertMngFilter, iprCertDel } from '@/api/v2_ipr'
  // import { getProvince, getCity, getDistrict, getTown } from '@/api/area'
  import qs from 'qs'

  var initListQuery = {
    page: 1,
    limit: 20
  }
  export default {
    name: 'cert_list',
    components: {},
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        search_keyword: null,
        search_type: 'policy',
        hot_search_keyword_list: ['wtf', 'wtf'],
        search_placeholder_list: {},
        search_placeholder: '',
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
        isCheckDeleteRecord: false, // 是否查看已删除记录
        isCheckAll: false, // 是否已经全选
        check_biz_ids: [], // 勾选行的biz_id
        select_filter_list: [], // 已选条件
        ent_list: [], // 企业列表
        order_type_list: [] // 排序
      }
    },
    filters: {},
    mounted() {
      // this.getListFilter()
      // this.getList()
    },
    // methods: {
    //   // 开始搜索
    //   goSearch() {
    //   },
    //   // 筛选更多条件
    //   getMoreCondition() {
    //     this.more_condition = !this.more_condition
    //   },
    //   handleFilter() {
    //     this.listQuery.page = 1
    //     this.getList()
    //   },
    //   getList() {
    //     this.listLoading = true
    //     var list_query = JSON.parse(JSON.stringify(this.listQuery))
    //     list_query.ent_biz_id = this.id
    //     iprCertMng(list_query).then(res => {
    //       this.list = res.data.data
    //       this.total = res.data.recordsTotal
    //       this.select_filter_list = res.data.select_filter_list
    //     })
    //   },
    //   getProvinces() {
    //     getProvince({}).then(response => {
    //       this.province_list = response.data.provinces
    //     })
    //   },
    //   areaSetNull(level) {
    //     if (level === 3) {
    //       this.listQuery.city_id = ''
    //       this.citys = []
    //     }
    //     if (level >= 2) {
    //       this.listQuery.district_id = ''
    //       this.districts = []
    //     }
    //     if (level >= 1) {
    //       this.listQuery.town_id = ''
    //       this.towns = []
    //     }
    //   },
    //   changeProvince() {
    //     this.listQuery.page = 1
    //     this.areaSetNull(3)
    //     this.getCitys()
    //     this.getList()
    //   },
    //   getCitys() {
    //     getCity({ 'provinceId': this.listQuery.province_id }).then(response => {
    //       this.city_list = response.data.cities
    //     })
    //   },
    //   changeCity() {
    //     this.listQuery.page = 1
    //     this.areaSetNull(2)
    //     this.getDistricts()
    //     this.getList()
    //   },
    //   getDistricts() {
    //     getDistrict({ 'cityId': this.listQuery.city_id }).then(response => {
    //       this.district_list = response.data.districts
    //     })
    //   },
    //   changeDistrict() {
    //     this.listQuery.page = 1
    //     this.areaSetNull(1)
    //     this.getTowns()
    //     this.getList()
    //   },
    //   changeTown() {
    //     this.listQuery.page = 1
    //     this.getList()
    //   },
    //   getTowns() {
    //     getTown({ 'districtId': this.listQuery.district_id }).then(response => {
    //       this.town_list = response.data.town
    //     })
    //   },
    //   // 清空已选条件
    //   clearAllSelect() {
    //     this.listQuery = JSON.parse(JSON.stringify(initListQuery))
    //     this.getList()
    //   },
    //   // 删除当前已选条件
    //   clearThisSelect(item) {
    //     if (item.key in this.listQuery) {
    //       var cur_list = this.listQuery[item.key]
    //       if (cur_list instanceof Array && cur_list.indexOf(item.val) !== -1) {
    //         cur_list.splice(cur_list.indexOf(item.val), 1)
    //       } else {
    //         console.log('delete')
    //         delete this.listQuery[item.key]
    //       }
    //     }
    //     this.getList()
    //   },
    //   // 全选/反选
    //   checkAllOrNo() {
    //     if (this.isCheckAll) {
    //       this.check_biz_ids = []
    //       this.isCheckAll = false
    //     } else {
    //       var _this = this
    //       this.list.forEach(function(item, index) {
    //         if (_this.check_biz_ids.indexOf(item.biz_id) === -1) {
    //           _this.check_biz_ids.push(item.biz_id)
    //         }
    //         _this.isCheckAll = true
    //       })
    //     }
    //   },
    //   // 筛选参数
    //   getListFilter() {
    //     iprCertMngFilter().then(res => {
    //       if (res.data.code === 1) {
    //         this.order_type_list = res.data.data.order_type_list
    //         this.ent_list = res.data.data.ent_list
    //       }
    //     })
    //   },
    //   // 点击加载更多
    //   loadMore() {
    //     this.listQuery.page += 1
    //     this.listLoading = true
    //     if (this.list.length < this.total) {
    //       iprCertMng(this.listQuery).then(res => {
    //         this.list = this.list.concat(res.data.data)
    //       })
    //     }
    //   },
    //   // 处理删除
    //   handleDelete() {
    //     if (this.check_biz_ids.length <= 0) {
    //       this.$message.error('请勾选删除的行!')
    //       return false
    //     }
    //     this.$confirm('您确定删除吗？').then(_ => {
    //       iprCertDel({ biz_ids: this.check_biz_ids }).then(res => {
    //         if (res.data.code === 1) {
    //           this.$message.success(res.data.message ? res.data.message : '删除成功！')
    //           this.check_biz_ids = []
    //           this.getList()
    //         }
    //       })
    //     })
    //   },
    //   // 查看已经删除记录
    //   checkDeleteRecord() {
    //     this.listQuery.is_delete = !this.listQuery.is_delete
    //     this.getList()
    //   },
    //   handleCreate(data) {
    //   },
    //   // 查看
    //   handleCheck(data) {
    //     var redirect_url = '/policy_notice/edit?is_check=true&biz_id=' + data.biz_id
    //     this.handleRedirect(redirect_url)
    //   },
    //   // 编辑
    //   handleUpdate(data) {
    //     var redirect_url = '/policy_notice/edit?is_edit=true&biz_id=' + data.biz_id
    //     this.handleRedirect(redirect_url)
    //   },
    //   // 重定向
    //   handleRedirect(redirect_url) {
    //     if (!redirect_url) {
    //       redirect_url = '/policy_notice/edit?is_create=true'
    //     }
    //     const routeUrl = this.$router.resolve({ path: redirect_url })
    //     window.open(routeUrl.href, '_blank')
    //   },
    //   // 搜索tab切换
    //   handleTabChange() {
    //     this.search_placeholder = this.search_placeholder_list[this.search_type]
    //     this.handleFilter()
    //   },
    //   // 导出
    //   handleExport() {
    //     window.open(this.host + '/enterprise/export-enterprise-excel/?' + qs.stringify(this.listQuery))
    //   }
    // }
  }
</script>

<style lang="less" scoped>
  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
  }

  .content-font {
    font-size: 14px;
    font-weight: 400;
  }

  .text-align-center {
    text-align: center;
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

  .bottom-margin-2 {
    margin-bottom: 2px;
  }

  .bottom-margin-4 {
    margin-bottom: 4px;
  }

  .bottom-margin-5 {
    margin-bottom: 5px;
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

  .float-right {
    float: right;
  }

  .float-left {
    float: left;
  }

  .padding-vertical-5 {
    padding: 5px 0;
  }

  .padding-5 {
    padding: 5px;
  }

  .padding-vertical-10 {
    padding: 10px 0;
  }

  .padding-level-10 {
    padding: 0 10px;
  }

  .search_input {
    width: 600px;
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
    width: 100%;
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
    width: 70px;
    height: 30px;
    background: #ffffff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    border: 1px solid #33B3EE;
    color: #33B3EE;
    opacity: 1;
  }

  .send_sms_bt {
    width: 70px;
    height: 30px;
    background: #ffffff;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    border: 1px solid #FFCBA6;
    color: #FFCBA6;
    opacity: 1;
  }

  .red-border {
    border: 1px solid #ff0000;
    color: #ff0000;
  }

  .blue-border {
    border: 1px solid #33B3EE;
    color: #33B3EE;
  }

  .orange-border {
    border: 1px solid #FFCBA6;
    color: #FFCBA6;
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
</style>
