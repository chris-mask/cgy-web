<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">已选条件:</span>
            <div class="conditionList">
              <div class="conditionBox" v-for="(value, key) in selectConditionsList">
                {{value}}<img class="hoverCursor" @click="deleteOneClick(key)" src="../icons/enterprise/close_con.png"/>
              </div>
              <div class="conditionClear" @click="deleteAllClick" v-if="Object.keys(selectConditionsList).length > 1">
                清空所有
              </div>
            </div>
          </div>
        </div>
        <div class="conditionCont">
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选项目：</span>
                <el-select multiple @change='handleFilterProjectType' clearable size="small"
                           class="inline-block float-left" v-model="statisticsForm.projectTypes" placeholder="项目分类">
                  <el-option v-for="item in projectTypeList" :key="item.dictId" :value="item.dictId"
                             :label="item.dictName"></el-option>
                </el-select>
                <el-select v-model="statisticsForm.projectIds" filterable remote multiple
                           :remote-method="projectListMethod" v-loadMore="loadMore" :loading="loading"
                           :multiple-limit="10" size="small" placeholder="项目" clearable @change="projectChange">
                  <el-option
                    v-for="item in projectList"
                    :key="item.projectId"
                    :label="item.projectName"
                    :value="item.projectId">
                  </el-option>
                </el-select>
                <el-select filterable size="small" v-model="statisticsForm.applyLevelList" placeholder="项目级别" multiple
                           clearable @change="areaLevelChange">
                  <el-option
                    v-for="item in projectLevelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select filterable multiple size="small" v-model="statisticsForm.titleSeriesList" placeholder="职称系列" clearable @change="changeTitleSeries">
                  <el-option v-for="item in titleSeriesList" :label="item.dictName" :value="item.dictId" :key="item.dictId"></el-option>
                </el-select>
                <el-button type="primary" size="small" @click="allGetList">汇总</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选地区：</span>
                <el-select size="small" v-model="statisticsForm.provinceId" placeholder="省份" clearable @change="changeProvince">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="statisticsForm.cityId" placeholder="城市" clearable @change="changeCity">
                  <el-option
                    v-for="item in cityList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="statisticsForm.districtId" placeholder="县区" clearable
                           @change="changeDistrict">
                  <el-option
                    v-for="item in districtList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="statisticsForm.townId" placeholder="镇街" clearable @change="changeTown">
                  <el-option
                    v-for="item in townList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>可选金额：</span>
                <el-select size="small" v-model="statisticsForm.money" placeholder="可选金额" clearable @change="changeMoney">
                  <el-option
                    v-for="item in moneyList"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose orginLeft">搜索到 {{total}} 条记录</span>
            <div class="headBtn">
              <el-button type="primary" class="btn export" size="small" @click="handleExport">导出</el-button>
            </div>
          </div>
        </div>
        <div class="projectTable">
          <el-table :data="projectReport" border fit highlight-current-row ref="projectReport" :span-method="arraySpanMethod">
            <el-table-column label="项目分类" align="center" min-width="300">
              <template slot-scope="scope">
                <span>{{scope.row.projectType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center" min-width="240">
              <template slot-scope="scope">
                <span>{{scope.row.projectName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="地区" align="center" min-width="220">
              <template slot-scope="scope">
                <span>{{scope.row.provinceName}}{{scope.row.cityName}}{{scope.row.districtName}}{{scope.row.townName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="级别" align="center">
              <template slot-scope="scope">
                <span>
                  {{
                  scope.row.projectLevel == 1 ? '国家级' :
                  scope.row.projectLevel == 2 ? '省级' :
                  scope.row.projectLevel == 3 ? '市级' :
                  scope.row.projectLevel == 4 ? '区县级' :
                  scope.row.projectLevel == 5 ? '镇街级' : '-'
                  }}
                </span>
              </template>
            </el-table-column>
<!--            <el-table-column label="批次" align="center" min-width="140">-->
<!--              <template slot-scope="scope">-->
<!--                <span>-->
<!--                  {{-->
<!--                    scope.row.projectBatchNo == 0 ? '未指定' :-->
<!--                    scope.row.projectBatchNo == 1 ? '第一批' :-->
<!--                    scope.row.projectBatchNo == 2 ? '第二批' :-->
<!--                    scope.row.projectBatchNo == 3 ? '第三批' :-->
<!--                    scope.row.projectBatchNo == 4 ? '第四批' :-->
<!--                    scope.row.projectBatchNo == 5 ? '第五批' : '-'-->
<!--                  }}-->
<!--                </span>-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column label="最低补助" align="center" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.subsidyPriceMin && scope.row.subsidyPriceMin >= 10000 ? scope.row.subsidyPriceMin / 10000 + '万元' : scope.row.subsidyPriceMin && scope.row.subsidyPriceMin + '元'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="最高补助" align="center" min-width="130">
              <template slot-scope="scope">
                <span>{{scope.row.subsidyPriceMax && scope.row.subsidyPriceMax >= 10000 ? scope.row.subsidyPriceMax / 10000 + '万元' : scope.row.subsidyPriceMax && scope.row.subsidyPriceMax + '元'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="总额" align="center" min-width="130">
              <template slot-scope="scope">
                <span>{{!scope.row.totalNubmer ? '-' : scope.row.totalNubmer && scope.row.totalNubmer >= 10000 ? scope.row.totalNubmer / 10000 + '万元' : scope.row.totalNubmer && scope.row.totalNubmer + '元'}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="projectReport.length != 0">
            <div class="noMore" @click="getMore" v-if="total - projectReport.length > 0">
              加载更多
            </div>
            <div class="noMore" v-else>
              没有更多
            </div>
          </div>
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
</template>

<script>
  import { commonDict,commonDictOfRegion,downloadPolicy } from '@/api/utils'
  import {queryAll, queryTitleSeriesOrLevel} from '@/api/projectManage'
  import {queryProjectStatisticalList,projectStatisticalInfo} from '@/api/statisticsReport'

  export default {
    name: 'projectSubsidyReport',
    data(){
      return{
        btnFlag:0,
        statisticsForm:{
          page:0,
          pageSize: 20
        },
        projectList:[],
        titleSeriesList: [],
        deptmentList:[],
        selectConditionsList:{},
        projectReport:[],
        total:0,
        projectTypeList:[],
        provinceList:[],
        cityList:[],
        districtList:[],
        townList:[],
        level:3,
        parentId:0,
        projectLevelList: [
          { label: '国家级', value: 1 },
          { label: '省级', value: 2 },
          { label: '市级', value: 3 },
          { label: '区县级', value: 4 },
          { label: '镇街级', value: 5 }
        ],
        batchNoList:[
          { label: '未指定', 'value': 0 },
          { label: '第一批', 'value': 1 },
          { label: '第二批', 'value': 2 },
          { label: '第三批', 'value': 3 },
          { label: '第四批', 'value': 4 },
          { label: '第五批', 'value': 5 }
        ],
        moneyList:[
          {label:'10万以下',min:0,max:100000},
          {label:'10万-50万',min:100000,max:500000},
          {label:'50万-100万',min:500000,max:1000000},
          {label:'100万-300万',min:1000000,max:3000000},
          {label:'300万-500万',min:3000000,max:5000000},
          {label:'500万-1000万',min:5000000,max:10000000},
          {label:'1000万以上',min:10000000,max:10000000000},
        ],
        projectForm:{
          page:0,
          pageSize:20,
          orderField:'sales',
          orderType: 'DESC'
        },
        loading:false,
        spanArr:[],
        position:0,
        allowGetDeptList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:DEPT:MANAGE','SYSTEM:DEPT:LIST'),//部门列表
      }
    },
    activated() {
      this.getCommonData();
      this.getRegionList();
      this.getProjectList();
      this.getReportList();
      this.getTitleSeries();
    },
    directives: {
      loadMore: {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
          SELECTWRAP_DOM.addEventListener('scroll', function() {

            const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
            if (CONDITION) {
              binding.value()
            }
          })
        }
      }
    },
    methods:{
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

      // 获取职称系列
      getTitleSeries() {
        queryTitleSeriesOrLevel({}).then(res =>{
          if (res.code === 200){
            this.titleSeriesList = res.data
          }
        })

      },

      // 职称筛选
      changeTitleSeries(val){
        const arr = []
        if (val.length != 0) {
          this.titleSeriesList.forEach(item => {
            val.forEach(val => {
              if (item.dictId == val) {
                arr.push(item.dictName)
                const string = arr.join('，')
                this.$set(this.selectConditionsList, 'titleSeries',  `职称系列 - ${string}`)
              }
            })
          })
        } else {
          this.$delete(this.selectConditionsList, 'titleSeries')
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },


      //获取统计列表
      getReportList(){
        queryProjectStatisticalList(this.statisticsForm).then(res=>{
          if(res.code == 200){
            if (this.statisticsForm.page > 0) {
              this.projectReport = this.projectReport.concat(res.data.data);
            } else {
              this.projectReport = res.data.data;
            }

            this.total = res.data.total;
            this.projectReport.forEach((item,index)=>{
              item.totalNubmer = 0;
              if(!item.subsidyPriceMax){
                this.$set(item, 'subsidyPriceMax',0)
              }
              this.projectReport.forEach((list,i)=>{
                if(item.statisticalId == list.statisticalId){
                  item.totalNubmer += list.subsidyPriceMax
                  // debugger
                }
              })
            })

            this.rowspan();
          }
        })
      },

      //汇总按钮
      allGetList(){
        this.statisticsForm.page = 0;
        this.getReportList();
      },

      //获得数据相同的行数
      rowspan() {
        //每次调用清空数据
        this.spanArr=[];
        this.position=0
        this.projectReport.forEach((item,index) => {
          if( index === 0){
            this.spanArr.push(1);
            this.position = 0;
          }else{
            if(this.projectReport[index].statisticalId === this.projectReport[index-1].statisticalId){
              this.spanArr[this.position] += 1;
              this.spanArr.push(0);
            }else{
              this.spanArr.push(1);
              this.position = index;
            }
          }
        })
      },

      arraySpanMethod({row, column, rowIndex, columnIndex}){
        if (columnIndex === 0) {
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        if(columnIndex === 1){
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        // if(columnIndex === 2){
        //   const _row = this.spanArr[rowIndex];
        //   const _col = _row>0 ? 1 : 0;
        //   return {
        //     rowspan: _row,
        //     colspan: _col
        //   }
        // }
        // if(columnIndex === 3){
        //   const _row = this.spanArr[rowIndex];
        //   const _col = _row>0 ? 1 : 0;
        //   return {
        //     rowspan: _row,
        //     colspan: _col
        //   }
        // }
        if(columnIndex === 6){
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },

      getMore(){
        this.statisticsForm.page = this.statisticsForm.page + 20
        this.getReportList();
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PROJECT_TYPE',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.projectTypeList = res.data['DICT:PROJECT_TYPE']
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      //获取项目列表
      getProjectList(query) {
        if(query){
          this.projectForm.projectName = query;
        }else{
          this.projectForm.projectName = '';
        }
        queryAll(this.projectForm).then(response => {
          if(response.code == 200){
            if(this.projectForm.page > 0){
              this.projectList = this.projectList.concat(response.data.data)
            }else{
              this.projectList = response.data.data
            }
          }else{
            this.$message.warning(response.message)
          }
        })
      },

      //远程搜索
      projectListMethod(query){
        this.projectForm.page = 0
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.getProjectList(query)
          }, 200)
        } else {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.getProjectList()
          }, 200)
        }
      },

      loadMore() {
        this.projectForm.page = this.projectForm.page + 20
        this.getProjectList()
      },

      //获取地区信息
      getRegionList() {
        if (this.level == undefined || this.level == null) {
          this.level = 3
        }

        if (this.parentId == undefined || this.parentId == '') {
          this.level = 3
          this.parentId = 0
        }

        let params = {
          level: this.level,
          parentId: this.parentId
        }

        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (this.level == 3) {
              this.provinceList = res.data
            }
            if (this.level == 2) {
              this.cityList = res.data
            }
            if (this.level == 1) {
              this.districtList = res.data
            }
            if (this.level == 0) {
              this.townList = res.data
            }

          } else {
            this.$message({ type: 'error', message: res.message })
          }
        })
      },

      //导出
      handleExport(){
        projectStatisticalInfo(this.statisticsForm).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadPolicy(parData).then(response => {
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-项目补助汇总表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)

              this.$message.success('导出成功！')
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      handleFilterProjectType(val) {
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.projectTypeList.forEach(item => {
              if (val == item.dictId) {
                arr.push(item.dictName)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectTypes', `项目分类 - ${string}`)
          })
          // this.$set(this.select_conditions_list, 'type_name', '项目分类 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'projectTypes')
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },

      projectChange(val){
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.projectList.forEach(item => {
              if (val == item.projectId) {
                arr.push(item.projectName)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectIds', `项目 - ${string}`)
          })
          // this.$set(this.select_conditions_list, 'type_name', '项目分类 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'projectIds')
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },

      areaLevelChange(val){
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.projectLevelList.forEach(item => {
              if (val == item.value) {
                arr.push(item.label)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'applyLevelList', `项目级别 - ${string}`)
          })
        } else {
          this.$delete(this.selectConditionsList, 'applyLevelList')
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },

      bathChange(val){
        const arr = []
        if (val.length != 0) {
          val.forEach(val => {
            this.batchNoList.forEach(item => {
              if (val == item.value) {
                arr.push(item.label)
              }
            })

            const string = arr.join('，')
            this.$set(this.selectConditionsList, 'projectBatchNoList', `批次 - ${string}`)
          })
        } else {
          this.$delete(this.selectConditionsList, 'projectBatchNoList')
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },

      changeProvince(val){
        if (val) {
          this.$set(this.selectConditionsList, 'provinceId', '省份 - ' + this.provinceList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'provinceId')
        }

        this.$delete(this.selectConditionsList, 'cityId')
        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.parentId = val
        this.level = 2
        this.getRegionList()

        this.statisticsForm.page = 0;
        this.getReportList();
      },
      changeCity(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'cityId', '城市 - ' + this.cityList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'cityId')
        }

        this.$delete(this.selectConditionsList, 'districtId')
        this.$delete(this.selectConditionsList, 'townId')

        this.parentId = val
        this.level = 1
        this.getRegionList()

        this.statisticsForm.page = 0;
        this.getReportList();
      },
      changeDistrict(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'districtId', '区县 - ' + this.districtList.find(ele => ele.dictId === val).dictName)
          this.$delete(this.selectConditionsList, 'townId')
        } else {
          this.$delete(this.selectConditionsList, 'districtId')
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.parentId = val
        this.level = 0
        this.getRegionList()

        this.statisticsForm.page = 0;
        this.getReportList();
      },
      changeTown(val) {
        if (val) {
          this.$set(this.selectConditionsList, 'townId', '镇街 - ' + this.townList.find(ele => ele.dictId === val).dictName)
        } else {
          this.$delete(this.selectConditionsList, 'townId')
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },

      changeMoney(val){
        if (val) {
          this.$set(this.selectConditionsList, 'money', '金额 - ' + this.moneyList.find(ele => ele.label === val).label)
          this.moneyList.forEach(item=>{
            if(item.label == val){
              this.statisticsForm.minPrice = item.min;
              this.statisticsForm.maxPrice = item.max;
            }
          })
        } else {
          this.$delete(this.selectConditionsList, 'money')
          this.statisticsForm.minPrice = '';
          this.statisticsForm.maxPrice = '';
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },

      //删除筛选调节
      deleteOneClick(item){
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.statisticsForm, item)
        if(item == 'money'){
          this.statisticsForm.minPrice = '';
          this.statisticsForm.maxPrice = '';
        }

        this.statisticsForm.page = 0;
        this.getReportList();
      },

      //清除所有条件
      deleteAllClick(){
        this.selectConditionsList = {}
        this.statisticsForm = {
          page:0,
          pageSize:20
        }
        this.deadlineDate = '';
        this.signTimeDate = '';

        this.statisticsForm.page = 0;
        this.getReportList();
      },
    }
  }
</script>

<style lang="less" scoped>
  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 1%;
  }

  /deep/ .el-card__header {
    padding: 10px 20px;
  }

  .cardCont {
    margin-bottom: 15px;

    /deep/ .el-card__body {
      padding: 0;
    }
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
      border-left: 2px solid #05AAFF;
      padding-left: 10px;

      span {
        color: #F56C6C;
      }
    }

    .orginLeft {
      border-left: 2px solid #FFA96A;
    }

    .headBtn {
      margin-left: 40px;
      font-size: 14px;

      .allChoose {
        padding: 6px 8px;
        color: #05AAFF;
        border: 1px solid #05AAFF;
        background-color: #fff;
        border-radius: 2px;
      }

      .export {
        padding: 6px 8px;
        border-radius: 2px;
      }

      .allDelete {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FF8585;
        background-color: #FF8585;
        border-radius: 2px;
      }

      .originBtn {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FD903C;
        background-color: #FD903C;
        border-radius: 2px;
      }
    }
  }

  .conditionCont {
    padding: 10px 20px;

    .conditionBox {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      position: relative;

      span {
        font-size: 14px;
        color: #606266;
        margin-right: 10px;
        min-width: 70px;
      }

      .el-select {
        margin-right: 10px;
      }

      .el-date-editor {
        margin-right: 10px;
      }
    }
  }

  .star {
    color: #ff3d4c !important;
    position: absolute;
    left: -8px;
  }

  .dataHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(68, 68, 68, 0.14901961);
    padding: 0 20px;
    /*overflow: auto;*/

    &::-webkit-scrollbar { /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 2px;
    }

    &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
      border-radius: 50px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(5, 170, 255, 0.75);
    }

    &::-webkit-scrollbar-track { /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 50px;
      background: #f9f9f9;
    }

    .dataHeadBox {
      flex: 3;
      text-align: center;
      padding: 15px 0;
      font-weight: bold;
      /*min-width: 300px;*/

      &:first-child {
        flex: 1;
        min-width: 174px;
      }
    }
  }

  .conditionList {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .conditionBox {
      border: 1px solid #33B3EE;
      font-size: 12px;
      color: #33B3EE;
      padding: 5px;
      margin-right: 10px;
      display: flex;
    }
  }

  .conditionClear {
    border: 1px solid rgb(255, 0, 0);
    font-size: 12px;
    color: rgb(255, 0, 0);
    padding: 5px;
    cursor: pointer;
  }

  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }

  /deep/ .el-table--border th,
  /deep/ .el-table th {
    background: #2CB1F5 !important;
    color: #fff;
    font-weight: 400;
    border-right: 1px solid rgba(220, 223, 230, 0.21);
    padding: 7px 0;
  }

  /deep/ .el-table__row:nth-child(even) {
    background: rgb(235, 248, 255) !important;
    border: 1px solid rgba(0, 141, 214, 0.26666666666666666);
  }

  /deep/ .el-table--border td {
    border: none;
    box-sizing: border-box;
  }

  /deep/ .el-table--border td:first-child {
    border-right: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table--border td:last-child {
    border-left: rgb(217, 242, 255) 1px solid !important;
  }

  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  .col_red {
    color: #FF6B6B !important;
  }

  .col_red:hover {
    opacity: 0.5;
  }

  .col_skyblue {
    color: #05AAFF !important;
  }

  .col_skyblue:hover {
    opacity: 0.5;
  }

  .colUpDown {
    color: #FD903C !important;
  }

  .colUpDown:hover {
    opacity: 0.5;
  }

  .projectTable{
    padding:10px;
  }

  .noMore {
    text-align: center;
    padding: 20px 0;
    cursor: pointer;
    font-size:14px;
  }
</style>
