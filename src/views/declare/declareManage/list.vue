<template>
  <div class="sales-plan-box">
    <!--筛选栏-->
    <div class="screen-bar">
      <div class="screen-title">
        <div class="screen-btn">
          <div class="btn" @click="handleScreenBtn">
            <img :src="isScreenShow?closeIcon:openIcon"/>
            <span class="text">{{!isScreenShow?'选择筛选条件':'收起筛选条件'}}</span>
          </div>
        </div>
      </div>
      <div class="screen-list" v-show="isScreenShow">
        <!--项目名称-->
        <div class="form-item">
          <span class="label-text">项目名称：</span>
          <div class="form-handle">
            <el-input clearable
                      class="select-input"
                      v-model="listQuery.projectName"
                      placeholder="请输入项目名称"
                      @keyup.enter.native="getList"
            />
          </div>
        </div>

        <!--服务机构-->
        <div class="form-item">
          <span class="label-text">服务机构：</span>
          <div class="form-handle">
            <el-input
              clearable
              class="select-input"
              v-model="listQuery.serviceCompany"
              placeholder="请输入服务机构"
              @keyup.enter.native="getList"
            />
          </div>
        </div>

        <!--申报人-->
        <div class="form-item">
          <span class="label-text">申报人：</span>
          <div class="form-handle">
            <el-input
              clearable
              class="select-input"
              v-model="listQuery.applyPersonnel"
              placeholder="请输入申报人"
              @keyup.enter.native="getList"
            />
          </div>
        </div>

        <!--申报时间段-->
        <div class="form-item">
          <span class="label-text">申报时间段：</span>
          <el-date-picker
            size="small"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            class="date-select"
            v-model="declareDate"
            clearable
            @change="declareDateHandle"
            @keyup.enter.native="getList"
          >
          </el-date-picker>
        </div>

        <!--最新进度-->
        <div class="form-item">
          <span class="label-text">最新进度：</span>
          <div class="form-handle">
            <el-input clearable class="select-input"
                      v-model="listQuery.latestProgress"
                      placeholder="请输入最新进度"
                      @keyup.enter.native="getList"
            />
          </div>
        </div>

        <!--主管单位-->
        <div class="form-item">
          <span class="label-text">主管单位：</span>
          <div class="form-handle">
            <el-input clearable class="select-input"
                      v-model="listQuery.competentUnit"
                      placeholder="请输入主管单位" @keyup.enter.native="getList"/>
          </div>
        </div>

        <!--立项情况-->
        <div class="form-item">
          <span class="label-text">立项情况：</span>
          <div class="form-handle">
            <el-select class="select-input"
                       size="small"
                       filterable
                       clearable
                       v-model="listQuery.approvalState"
                       placeholder="选择立项情况"
                       @change="getList"
            >
              <el-option
                v-for="item in approvalStateData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        <!--需要验收-->
        <div class="form-item">
          <span class="label-text">需要验收：</span>
          <div class="form-handle">
            <el-select class="select-input"
                       size="small"
                       filterable
                       clearable
                       v-model="listQuery.recheckState"
                       placeholder="需要验收"
                       @change="getList"
            >
              <el-option
                v-for="item in recheckStateData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        <!--搜一下-->
        <el-button class="btn" @click="getList">搜一下</el-button>
      </div>
    </div>

    <!--列表-->
    <div class="list">
      <div class="list-title">
        <div class="left">
          <div class="title-text">
            <span class="line"></span>
            <div class="search-total-num">搜索到 <span class="num">{{listTotal}}</span> 条记录</div>
            <div class="search-total-num" v-if="check_biz_ids.length > 0" style="margin-left: 10px;">
              已选中
              <span class="num">{{check_biz_ids.length}}</span> 条记录
            </div>
          </div>
          <div class="title-btn-group">
            <div class="btn" @click="checkAllOrNo">
              {{isCheckAll?'取消全选':'全选'}}
            </div>
            <div class="btn" @click="handleExport">导出</div>
            <div class="btn del" @click="delItemHandle">删除</div>
            <div class="btn" @click="goAddDeclare">新增</div>
          </div>
        </div>

        <div class="right">
          <el-select class="select-sort" clearable
                     popper-class="select-sort-option"
                     :popper-append-to-body="false"
                     v-model="sortData"
                     @change="sortListHandle"
          >
            <el-option
              v-for="item in sortDataList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>

      <div class="list-detail">
        <div class="item" v-for="item in listData">
          <div class="item-detail">

            <!--图片+多选-->
            <div class="pic">
              <input type="checkbox"
                     class="check-input"
                     name="check_biz_ids"
                     :value="item.applyId"
                     v-model="check_biz_ids"
                     @change="checkOneOrNo"
              />
              <div class="img-box" :style="`background:${item.bgColor}`" @click="goReadDeclare(item.applyId)">
                {{item.companyShortName}}
              </div>
            </div>

            <div class="detail">
              <table style="table-layout:fixed;">
                <tr class="tr-title">
                  <td colspan="2" class="title-name" :title="item.projectName" @click="goReadDeclare(item.applyId)">
                    {{item.projectName}}
                  </td>
                  <td colspan="2">
                    服务机构：<span class="company-name">{{item.serviceCompany}}</span>
                  </td>
                </tr>
                <tr class="tr-item">
                  <td>申报人：<span class="name" :title="item.applyPersonnel">{{item.applyPersonnel}}</span></td>
                  <td>申报时间：<span class="name">{{item.applyDate}}</span></td>
                  <td>系统提交截止时间：<span class="name">{{item.onlineDateEnd}}</span></td>
                  <td>纸质提交截止时间：<span class="name">{{item.paperDateEnd}}</span></td>
                </tr>
                <tr class="tr-item">
                  <td>预计扶持金额：<span class="name">{{item.subsidyAmount}}元</span></td>
                  <td>最新进度：<span class="name">{{item.latestProgress}}</span></td>
                  <td>主管单位：<span class="name" :title="item.competentUnit">{{item.competentUnit}}</span></td>
                  <td>联系方式：<span class="name" :title="item.contactPersonnel">{{item.contactPersonnel}} {{item.contactPhone}}</span></td>
                </tr>
                <tr class="tr-item">
                  <td>立项情况：<span class="name">{{approvalStateListData[item.approvalState]}}</span></td>
                  <td>核准金额：<span class="name">{{item.approveAmount}}元</span></td>
                  <td>需要验收：<span class="name">{{recheckStateListData[item.recheckState]}}</span></td>
                  <td>项目截止时间：<span class="name">{{item.projectDateEnd}}</span></td>
                </tr>
              </table>
            </div>
          </div>

          <!--操作按钮组  编辑-->
          <div class="handle-btn-group">
            <div class="item-btn edit" @click="goEditDeclare(item.applyId)"></div>
          </div>
        </div>

        <!--加载更多-->
        <div class="get-more" v-if="listData.length >= listTotal">
          没有更多
        </div>
        <div v-else class="get-more" @click="getMoreData">
          加载更多
        </div>
      </div>
    </div>

    <!--置顶-->
    <div class="goTop">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../../icons/enterprise/back_top.png" alt="">
      </a>
    </div>

  </div>
</template>

<script>
  // 接口
  import {
    // 查询列表
    queryProjectApplyList,
    //删除申报记录
    deleteProjectApplyByIds,
    //导出申报列表
    exportProjectApplyList
  } from '@/api/declare'
  import {downloadTemplate} from '@/api/patent'
  import clearBlue from '../../icons/enterprise/clear_blue.png'
  import closeIcon from '../../icons/enterprise/close_icon.png'
  import openIcon from '../../icons/enterprise/open_icon.png'

  import store from "../../../store";

  export default {
    data() {
      return {
        // <!------- 图片 -------->
        //蓝色-删除icon
        clearBlue,
        //关闭icon
        closeIcon,
        //打开icon
        openIcon,

        //<!------- 获取到登录后的公司 -------->
        //获取公司ID
        companyId: store.getters.companyId,
        //获取公司名称
        companyName: store.getters.companyName,

        //置顶按钮
        btnFlag: false,

        // 是否已经全选
        isCheckAll: false,


        // <!------- 列表 -------->
        //已选中的id
        check_biz_ids: [],
        //列表数据
        listData: [],
        //列表总数
        listTotal: "",
        //立项情况
        approvalStateListData: ['不需立项', '等待立项', '立项通过', '立项不通过'],
        //需要验收
        recheckStateListData: ['不需验收', '等待验收', '验收通过', '验收不通过'],


        // <!------- 筛选 -------->
        //最终要搜索的数据
        listQuery: {
          projectName: "",
          serviceCompany: "",
          applyPersonnel: "",
          applyDateStart: "",
          applyDateEnd: "",
          latestProgress: "",
          competentUnit: "",
          approvalState: "",
          recheckState: "",
          orderField: "applyDate",
          orderType: "DESC",
          page: 0,
          pageSize: 20
        },
        //申报时间段
        declareDate: [],

        //立项情况
        approvalStateData: [
          {value: 0, label: '不需立项'},
          {value: 1, label: '等待立项'},
          {value: 2, label: '立项通过'},
          {value: 3, label: '立项不通过'},
        ],

        //需要验收
        recheckStateData: [
          {value: 0, label: '不需验收'},
          {value: 1, label: '等待验收'},
          {value: 2, label: '验收通过'},
          {value: 3, label: '验收不通过'},
        ],

        //显示筛选更多条件
        isScreenShow: false,
        //已选条件
        select_filter_list: {},
        //排序
        sortData: "申报时间倒序",
        sortDataList: [
          {
            id: 'applyDate',
            value: '申报时间顺序',
            type: 'ASC'
          },
          {
            id: '-applyDate',
            value: '申报时间倒序',
            type: 'DESC'
          },
          {
            id: 'onlineDateEnd ',
            value: '系统提交截止时间顺序',
            type: 'ASC'
          }, {
            id: '-onlineDateEnd',
            value: '系统提交截止时间倒序',
            type: 'DESC'
          }, {
            id: 'paperDateEnd',
            value: '纸质提交截止时间顺序',
            type: 'ASC'
          }, {
            id: '-paperDateEnd',
            value: '纸质提交截止时间倒序',
            type: 'DESC'
          }, {
            id: 'projectDateEnd',
            value: '项目截止时间顺序',
            type: 'ASC'
          }, {
            id: '-projectDateEnd',
            value: '项目截止时间倒序',
            type: 'DESC'
          }, {
            id: '-subsidyAmount',
            value: '扶持金额倒序',
            type: 'DESC'
          }, {
            id: '-approveAmount',
            value: '核准金额倒序',
            type: 'DESC'
          }, {
            id: 'createTime',
            value: '创建时间顺序',
            type: 'ASC'
          }, {
            id: '-createTime',
            value: '创建时间倒序',
            type: 'DESC'
          }
        ],
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop);
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    activated() {
      if(this.$store.getters.declarePage != 0){
        this.listQuery.page = 0;
        this.listQuery.pageSize = this.$store.getters.declarePage + 20;
        this.getList();
      }else{
        this.listQuery.page = this.$store.getters.declarePage;
        this.listQuery.pageSize = 20;
        this.getList();
      }

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.declareScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_DECLARE_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_DECLARE_PAGE', this.listQuery.page) //离开路由时把位置存起来
      next()
    },
    methods: {
      //跳转到新增
      goAddDeclare() {
        this.$router.push('/declare/addDeclare');
      },
      //跳转到编辑
      goEditDeclare(id) {
        this.$router.push({path: '/declare/editDeclare', query: {id}});
        localStorage.setItem('decType', '1');
      },
      //跳转到详情
      goReadDeclare(id) {
        this.$router.push({path: '/declare/editDeclare', query: {id}});
        localStorage.setItem('decType', '2');
      },

      //筛选栏-点击选择筛选条件
      handleScreenBtn() {
        this.isScreenShow = !this.isScreenShow;
      },

      //筛选栏--选择申报时间
      declareDateHandle(val) {
        if (val !== null && val.length !== 0) {
          this.listQuery.applyDateStart = val[0];
          this.listQuery.applyDateEnd = val[1];
        } else {
          this.listQuery.applyDateStart = "";
          this.listQuery.applyDateEnd = "";
        }
        this.listQuery.page = 0;
        this.getList();
      },

      //筛选栏-排序
      sortListHandle(val) {
        this.sortDataList.forEach(item => {
          if (item.id === val) {
            if (item.type && item.type !== undefined) {
              this.listQuery.orderType = item.type
            }
          }
        })
        if (val.includes('-')) {
          val = val.substr(1);
        }
        this.listQuery.orderField = val;
        this.listQuery.page = 0;
        this.getList();
      },

      //列表--获取列表数据
      getList() {
        queryProjectApplyList(this.listQuery).then(res => {
          if (res.code === 200) {
            let list = res.data.data;
            let newRes = [];
            let R = [], F;
            for (F = 0; F < list.length;) R.push(list.slice(F, F += 5));
            R.forEach(item => {
              item.forEach((data, index) => {
                this.picBackgroundList.forEach((val, key) => {
                  if (index === key) {
                    data.bgColor = val;
                  }
                })
              })
            });
            R.forEach(item => {
              item.forEach(item => {
                newRes.push(item);
              })
            });

            if (this.listQuery.page > 0) {
              this.listData = this.listData.concat(newRes);
            } else {
              this.listData = newRes;

              if(this.$store.getters.declarePage != 0){
                this.listQuery.page = this.$store.getters.declarePage;
                this.listQuery.pageSize = 20;
              }
            }

            this.listTotal = res.data.total;
          }
        })
      },

      //列表--获取更多数据
      getMoreData() {
        this.listQuery.page += 20;
        this.getList();
      },

      //列表---为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
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

      //列表---回到顶部
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

      //列表---全选/反选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          let _this = this
          this.listData.forEach((item, index) => {
            if (_this.check_biz_ids.indexOf(item.applyId) === -1) {
              _this.check_biz_ids.push(item.applyId)
            }
            _this.isCheckAll = true
          })
        }
      },

      //列表---单选一个
      checkOneOrNo() {
        if (this.check_biz_ids.length === this.listData.length) {
          this.isCheckAll = true
        } else {
          this.isCheckAll = false
        }
      },

      //列表---导出
      handleExport() {
        let list_query = JSON.parse(JSON.stringify(this.listQuery))
        list_query.applyIds = this.check_biz_ids;
        exportProjectApplyList(list_query).then(res => {
          if (res.code === 200) {
            downloadTemplate({fileName: res.message, delete: true}).then(response => {
              const url = window.URL.createObjectURL(response)
              let a = document.createElement('a')
              document.body.appendChild(a)
              let date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()
              const fileName = date + '-申报管理' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url);
              this.$message({
                type: 'success',
                message: '操作成功！'
              });
            })
          }
        })
      },

      //列表---删除
      delItemHandle() {
        if (this.check_biz_ids.length === 0) {
          this.$message({
            message: '请勾选要删除的行！',
            type: 'warning'
          });
        } else {
          deleteProjectApplyByIds(this.check_biz_ids).then(res => {
            if (res.code === 200) {
              this.check_biz_ids = [];
              this.isCheckAll = false;
              this.$message.success('删除成功');
              this.listQuery.page = 0;
              this.getList();
            }
          })
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .sales-plan-box {
    margin: auto 5%;

    .search-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      padding: 20px 16px;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      border-radius: 4px;

      /deeep/ .el-button + .el-button {
        margin: 0;
      }

      .btn {
        height: 48px;
        border: 0;
        width: 120px;
        color: #fff;
        border-radius: 0;
        background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

        &:active {
          opacity: .5;
        }
      }

      .import-btn {
        margin-left: 20px;
        background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
      }

      .search {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 20px;
        width: 50%;

        .search-input {
          /deep/ .el-input__inner {
            height: 48px;
            border-radius: 0;
            border: 1px solid #05AAFF;
            border-right: 0;
          }
        }
      }
    }

    .screen-bar {
      background: #fff;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

      .screen-title {
        display: flex;
        padding: 14px 16px;

        .name {
          color: #042B40;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          white-space: nowrap;
          margin-right: 10px;
          display: flex;
          padding-top: 5px;

          .line {
            width: 3px;
            height: 14px;
            background: rgba(5, 170, 255, 1);
            display: inline-block;
            margin-right: 8px;
            margin-top: 4px;
          }

          .text {
            margin-top: 2px;
          }
        }

        .selected-list {
          width: 90%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 4px;
          min-height: 35px;

          .item {
            padding: 4px 6px;
            font-size: 12px;
            border: 1px solid #05AAFF;
            color: #05AAFF;
            margin-right: 13px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .text {
              margin-top: 2px;
              margin-right: 6px;
            }

            img {
              cursor: pointer;
            }

            &.clear {
              padding: 5px 15px;
              cursor: pointer;
              color: #F56C6C;
              border: 1px solid #F56C6C;
            }
          }
        }

        .screen-btn {
          margin-top: 3px;

          .btn {
            cursor: pointer;
            white-space: nowrap;

            img {
              vertical-align: middle;
            }

            .text {
              margin-top: 1px;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
      }

      .screen-list {
        padding: 16px 16px 16px 25px;
        border-top: 1px solid rgba(219, 233, 255, 1);

        .form-item {
          display: flex;
          align-items: center;
          margin-bottom: 17px;

          .label-text {
            width: 100px;
            font-size: 14px;
            color: rgba(4, 43, 64, 1);
            white-space: nowrap;
            text-align: right;
            font-weight: 600;
            margin-right: 12px;
          }

          .form-handle {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .select-input {
              margin-right: 20px;

              /deep/ .el-input__inner {
                height: 32px;
              }

              /deep/ .el-input__icon {
                line-height: 30px;
              }
            }
          }

          .date-select {
            width: 290px;

            /deep/ .el-range-separator {
              padding: 0;
              line-height: 33px;
            }

            /deep/ .el-date-editor .el-range__close-icon {
              line-height: 34px;
            }
          }
        }

        .btn {
          margin-left: 113px;
          height: 38px;
          border: 0;
          width: 100px;
          color: #fff;
          border-radius: 2px;
          background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

          &:active {
            opacity: .5;
          }
        }
      }
    }

    .list {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);
      margin-top: 16px;

      .list-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 16px;
        box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);

        .left {
          display: flex;
          align-items: center;

          .title-text {
            display: flex;
            align-items: center;
            margin-right: 38px;

            .line {
              margin-right: 8px;
              display: inline-block;
              width: 3px;
              height: 14px;
              background: rgba(255, 169, 106, 1);
            }

            .search-total-num {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(68, 68, 68, 0.75);

              .num {
                color: #FF6C6C;
              }
            }
          }

          .title-btn-group {
            display: flex;
            align-items: center;

            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 20px;
              padding: 4px 9px;
              font-size: 16px;
              color: rgba(5, 170, 255, 1);
              border: 1px solid rgba(5, 170, 255, 1);
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                color: #fff;
                background: rgba(5, 170, 255, 1);
              }

              &.del {
                border: 1px solid rgba(245, 108, 108, 1);
                color: rgba(245, 108, 108, 1);

                &:hover {
                  color: #fff;
                  background: rgba(245, 108, 108, 1);
                }
              }

              &:active {
                opacity: .5;
              }
            }
          }
        }

        .right {
          .select-sort {
            font-size: 16px;

            /deep/ .el-input__inner {
              border: 0;
              text-align: right;
            }

            /deep/ .el-popper[x-placement^=bottom] .popper__arrow {
              right: 35px;
              left: initial;
            }
          }
        }
      }

      .list-detail {
        .item {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          padding-bottom: 8px;
          position: relative;
          border-bottom: 1px solid #ddd;

          &:last-child {
            border-bottom: 0;
          }

          .item-detail {
            width: 100%;
            display: flex;
            align-items: flex-start;

            .pic {
              display: flex;
              align-items: center;
              margin-right: 20px;


              .check-input {
                width: 18px;
                height: 18px;
                cursor: pointer;
                border: 1px solid rgba(68, 68, 68, 0.15);
              }

              .check-input[type="checkbox"] {
                background-color: #05AAFF !important;
              }

              .img-box {
                width: 84px;
                height: 84px;
                border-radius: 5px;
                background: rgba(105, 204, 255, 1);
                margin-left: 15px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                cursor: pointer;
              }
            }

            .detail {
              width: 100%;

              .text {
                margin-right: 18px;
              }

              .title {
                font-size: 18px;
                color: rgba(68, 68, 68, 1);
                font-weight: bold;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                cursor: pointer;
              }

              .user-conent {
                .item {
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  padding: 0;
                  font-size: 14px;
                  border-bottom: 0;

                  .cate {
                    min-width: 25%;
                    color: rgba(68, 68, 68, 0.75);
                    margin-bottom: 12px;

                    span {
                      color: rgba(68, 68, 68, 1);
                    }

                    .blue {
                      color: rgba(5, 170, 255, 1);
                      cursor: pointer;
                    }

                    &.results {
                      display: flex;

                      .tit {
                        font-style: normal;
                        white-space: nowrap;
                      }

                      span {
                        width: 400px;
                        display: inline-block;
                        word-wrap: break-word;
                        word-break: normal;
                      }
                    }
                  }
                }
              }


              table {
                width: 100%;
                font-size: 14px;


                tr,td {
                  color: rgba(68, 68, 68, 0.75);
                  overflow:hidden;
                  white-space:nowrap;
                  text-overflow:ellipsis;
                  -o-text-overflow:ellipsis;
                  -moz-text-overflow: ellipsis;
                  -webkit-text-overflow: ellipsis;
                }

                .title-name {
                  font-size: 18px;
                  color: #444444;
                  font-weight: bold;
                  cursor: pointer;
                  max-width: 200px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }

                .company-name {
                  color: #05AAFF;
                }

                .tr-title {
                  height: 25px;
                  vertical-align: top;
                }

                .tr-item {
                  height: 25px;

                  .name {
                    color: #444444;
                  }
                }
              }

            }
          }


          .handle-btn-group {
            /*width: 153px;*/
            /*min-width: 153px;*/
            display: flex;
            flex-wrap: wrap;
            height: 72px;

            .item-btn {
              width: 72px;
              height: 30px;
              background-image: url("../../../../static/service_trace_sprite.png");
              cursor: pointer;
              background-size: cover;

              &.edit {
                background-position: -446px, 0;
              }
            }

            .item-btn:hover {
              background-image: url("../../../../static/_service_trace_sprite.png");

              &.edit {
                background-position: -433px, 0;
              }
            }
          }
        }


        .no-data, .get-more {
          padding: 30px 0;
          text-align: center;
          cursor: pointer;
        }
      }
    }

    .goTop {
      height: 60px;
      position: fixed;
      bottom: 20px;
      right: 0;
      width: 80px;
    }

    .editorUserModal {
      /deep/ .el-dialog__header {
        border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        padding: 20px 20px 16px;
      }

      /deep/ .el-dialog__title {
        line-height: 0;
      }

      /deep/ .el-dialog__headerbtn {
        top: 19px;
      }

      /deep/ .el-dialog__body {
        padding: 14px;
      }

      /deep/ .el-form-item__label {
        font-weight: normal;
        color: rgba(68, 68, 68, 0.75);
      }

      /deep/ .el-form-item__content {
        width: 73%;
        display: flex;
      }

      .user-input {
        /deep/ .el-input__inner {
          border: 0;
          border-radius: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        }

        &.input {
          width: 100%;
          border-radius: 0;
          border: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.3);

          &:focus {
            border: 0;
            border-bottom: 1px solid rgba(68, 68, 68, 0.3);
          }
        }
      }

      .user-select {
        width: 100%;
      }

      .switch-btn {
        font-size: 14px;
        color: #fff;
        background: rgba(5, 170, 255, 1);
        margin-left: 10px;

        &:active {
          opacity: .5;
        }
      }

      .modal-radio {
        display: flex;
        align-items: center;

        /deep/ .el-form-item__content {
          margin-left: 0 !important;
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
  }

  /deep/ .select-sort-option {
    z-index: 98 !important;

    /deep/ .popper__arrow {
      right: 40px !important;
      left: auto !important;
    }
  }
</style>
