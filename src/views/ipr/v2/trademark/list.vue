<template>
  <div class="sales-plan-box">
    <!--标题-->
    <!--    <div class="title-name">-->
    <!--      佛山市涂无忧建材有限公司 - 商标-->
    <!--    </div>-->

    <!--列表-->
    <div class="list">
      <div class="list-title">

        <div class="left">
          <div class="title-text">
            <span class="line"></span>
            <div class="search-total-num">搜索到 <span class="num">{{listTotal}}</span> 条记录</div>
            <div class="search-total-num" style="margin-left: 10px" v-if="check_biz_ids.length > 0">已选中 <span class="num">{{check_biz_ids.length}}</span> 条记录</div>
          </div>
          <div class="title-btn-group">
            <div @click="checkAllOrNo" class="btn">
              {{isCheckAll?'取消全选':'全选'}}
            </div>
            <div class="btn" @click="goHandle('add',id)" v-if="allowAdd.twoAllow">新增</div>
            <div class="btn" @click="handleExport" v-if="allowExport.twoAllow">导出</div>
            <div class="btn del" @click="delItemHandle" v-if="allowDelete.twoAllow">删除</div>
          </div>
        </div>

        <div class="right">
          <el-select v-model="sortSelectData"
                     @change="sortListHandle"
                     class="select-sort"
                     clearable
                     placeholder="默认排序"
                     popper-class="select-sort-option"
                     :popper-append-to-body="false"
          >
            <el-option
              v-for="item in sortDataList"
              :value="item.id"
              :label="item.value"
              :key="item.id"
            />
          </el-select>
        </div>
      </div>

      <div class="list-detail">
        <div class="item" v-for="item in listData">
          <div class="item-detail">

            <!--图片+多选-->
            <div class="pic">
              <input @change="checkOneOrNo" class="check-box" type="checkbox" name="check_biz_ids"
                     :value="item.trademarkId" v-model="check_biz_ids"/>
              <div class="img-box" :style="`background:${item.bgColor}`">
                商标
              </div>
            </div>

            <!--列表详情-->
            <div class="detail">
              <div class="title">
                <span class="text" @click="goHandle('read',item.trademarkId)">{{item.trademarkName}}</span>
                <span class="title-tag">
                    商标类型：
                  {{item.trademarkTypeName}}
                </span>
              </div>
              <div class="user-conent">
                <div class="item">
                  <div class="cate">类似群：<span>{{item.similarGroup}}</span></div>
                  <div class="cate">申请/注册号：<span>{{item.trademarkNo}}</span></div>
                  <div class="cate"></div>
                </div>

                <div class="item">
                  <div class="cate">申请日期：<span>{{item.applyDate}}</span></div>
                  <div class="cate">国际分类：<span>{{item.internationalClassifyName}}</span></div>
                  <div class="cate"></div>
                </div>

                <div class="item">
                  <div class="cate">最新状态：<span>{{item.trademarkStateName}}</span></div>
                  <div class="cate">申请人：<span>{{item.applyName}}</span></div>
                  <div class="cate"></div>
                </div>

                <div class="item">
                  <div class="cate mark-pic">
                    商标图：
                    <el-image
                      style="width: 45px; height: 45px"
                      v-if="item.fileUrls.length!==0"
                      :src="item.fileUrls[0]"
                      :preview-src-list="item.fileUrls">
                    </el-image>
                  </div>
                  <div class="cate"></div>
                  <div class="cate"></div>
                  <div class="cate"></div>
                </div>

              </div>
            </div>
          </div>


          <!--操作按钮组-->
          <div class="handle-btn-group">
            <!--查看-->
            <div class="btn-img read-img" @click="goHandle('read',item.trademarkId)" v-if="allowDetail.twoAllow"></div>
            <!--编辑-->
            <div class="btn-img edit-img" @click="goHandle('edit',item.trademarkId)" v-if="allowUpdate.twoAllow"></div>
          </div>
        </div>
        <!--加载更多-->
        <div class="get-more" v-if="listData.length >= listTotal">
          没有更多
        </div>
        <div class="get-more" @click="loadMore" v-else>
          加载更多
        </div>
      </div>
    </div>

    <!--    图片弹窗-->
    <!--    <el-dialog class="pic-modal" :visible.sync="dialogVisible">-->
    <!--      <div class="pic">-->
    <!--        <img src="static/address.png" />-->
    <!--      </div>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
  import patentIcon from '../../../icons/enterprise/patent_icon.png'
  import {queryTrademarkList, exportTrademarkList, deleteTrademarkByIds, downloadTemplate} from '@/api/patent'
  import {commonDict} from '@/api/utils'

  export default {
    props: {
      id: {
        type: String
      },
      companyNames:{
        type: String
      }
    },
    data() {
      return {
        //字典值
        internationalClassifyList: [],
        trademarkStateList: [],

        // 专利icon
        patentIcon,

        //排序--选中的值
        sortSelectData: "",
        //排序--列表数据
        sortDataList: [
          {id: 'createTime', value: "按创建日期顺序", type: "ASC"},
          {id: '-createTime', value: "按创建日期倒序", type: "DESC"},
          {id: 'applyDate', value: "按申请日期顺序", type: "ASC"},
          {id: '-applyDate', value: "按申请日期倒序", type: "DESC"},
        ],

        //商标类型
        trademarkTypeData: [
          {keys: 0, name: "普通商标"},
          {keys: 1, name: "驰名商标"},
        ],

        //参数
        listQuery: {
          page: 0,
          pageSize: 20
        },
        tempPage:null,

        //列表数据
        listData: [],
        // 勾选行的biz_id
        check_biz_ids: [],
        // 是否已经全选
        isCheckAll: false,

        //总数
        listTotal: 0,


        //图片弹出
        dialogVisible: false,
        //列表框背景色
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],

        allowAdd: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:TRADEMARK','SYSTEM:PROPERTY:Trademark:INSERT'),//新增商标
        allowUpdate: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:TRADEMARK','SYSTEM:PROPERTY:Trademark:UPDATE'),//编辑商标
        // allowDetail: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:TRADEMARK','SYSTEM:PROPERTY:Trademark:DETAILS'),//查询商标详情
        allowDetail: true,
        allowDelete: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:TRADEMARK','SYSTEM:PROPERTY:Trademark:DELETE'),//删除商标
        allowGetList: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:TRADEMARK','SYSTEM:PROPERTY:Trademark:LIST'),//商标列表
        allowExport: this.authorityControl('SYSTEM:PROPERTY:MANAGE','SYSTEM:PROPERTY:TRADEMARK','SYSTEM:PROPERTY:Trademark:EXPORT'),//导出商标列表
      }
    },
    activated() {
      if(this.$store.getters.trademarkPage != 0){
        this.listQuery.page = 0;
        this.listQuery.pageSize = this.$store.getters.trademarkPage + 20;
        this.getDictoryData();
      }else{
        this.listQuery.page = this.$store.getters.trademarkPage;
        this.listQuery.pageSize = 20;
        this.getDictoryData();
      }

      this.isCheckAll = false;

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.trademarkScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_TRADEMARK_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_TRADEMARK_PAGE', this.listQuery.page) //离开路由时把位置存起来
      next()
    },
    methods: {
      //跳转到：新增(add)、编辑(edit)、详情(read)
      goHandle(type, id) {
        let path;

        if (this.id !== undefined) {
          if (type === 'add') {
            this.$router.push({
              'path': '/ipr/trademark/form/add',
              'query': {'type': type, 'companyId': id,'companyNames':this.companyNames, isUser: true}
            })
          } else if (type === 'edit') {
            this.$router.push({
              'path': '/ipr/trademark/form/edit',
              'query': {'type': type, 'trademarkId': id, isUser: true}
            })
          } else if (type === 'read') {
            this.$router.push({
              'path': '/ipr/trademark/form/detail',
              'query': {'type': type, 'trademarkId': id}
            })
          }

        } else {
          if (type === 'add') {
            path = '/ipr/trademark/form/add'
          } else if (type === 'edit') {
            path = '/ipr/trademark/form/edit'
          } else if (type === 'read') {
            path = '/ipr/trademark/form/detail'
          }
          this.$router.push({
            'path': path,
            'query': {'type': type, 'trademarkId': id}
          })
        }


      },

      //获取字典国际分类、最新状态
      getDictoryData() {
        commonDict({keyList: 'DICT:TRADEMARK_INTERNATIONAL_TYPE,DICT:TRADEMARK_LATEST_STATUS'}).then(res => {
          if (res.code === 200) {
            this.internationalClassifyList = res.data['DICT:TRADEMARK_INTERNATIONAL_TYPE'];
            this.trademarkStateList = res.data['DICT:TRADEMARK_LATEST_STATUS'];
            this.getList()
          }
        })
      },

      //获取列表数据
      getList() {
        if (this.id !== undefined) {
          this.listQuery.crmCompanyId = this.id;
        } else {
          this.listQuery.companyId = ''
        }
        // this.listQuery.pageSize = 20;
        if (this.allowGetList.twoAllow) {
          queryTrademarkList(this.listQuery).then(res => {
            if (res.code === 200) {
              let list = res.data.data

              // if (list.length !== 0) {
              list.forEach(item => {
                this.trademarkTypeData.forEach(data => {
                  if (item.trademarkType == data.keys) {
                    item.trademarkTypeName = data.name
                  }
                })
              })
              let newRes = []
              let R = [], F
              for (F = 0; F < list.length;) R.push(list.slice(F, F += 5))
              R.forEach(item => {
                item.forEach((data, index) => {
                  this.picBackgroundList.forEach((val, key) => {
                    if (index === key) {
                      data.bgColor = val
                    }
                  })
                })
              })
              R.forEach(item => {
                item.forEach(item => {
                  newRes.push(item)
                })
              })
              newRes.map(item => {
                this.internationalClassifyList.forEach(inter => {
                  if (item.internationalClassify === inter.dictId) {
                    item.internationalClassifyName = inter.dictName
                  }
                })
                this.trademarkStateList.forEach(trade => {
                  if (item.trademarkState === trade.dictId) {
                    item.trademarkStateName = trade.dictName
                  }
                })
              })
              if (this.listQuery.page > 0) {
                this.listData = this.listData.concat(newRes)
              } else {
                this.listData = newRes
                this.check_biz_ids = []

                if(this.$store.getters.trademarkPage != 0){
                  this.listQuery.page = this.$store.getters.trademarkPage;
                  this.listQuery.pageSize = 20;
                }
              }

              let obj = {}
              this.listData = this.listData.reduce((cur, next) => {
                obj[next.trademarkId] ? '' : obj[next.trademarkId] = true && cur.push(next)
                return cur
              }, [])

              this.listTotal = res.data.total
              if (this.id !== undefined) {
                this.$emit('trademarkTotal', res.data.total)
              }
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取此列表')
        }
      },

      //选择一个的时候
      checkOneOrNo() {
        if (this.check_biz_ids.length === this.listData.length) {
          this.isCheckAll = true
        } else {
          this.isCheckAll = false
        }
      },

      //全选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          let _this = this
          this.listData.forEach((item, index) => {
            if (_this.check_biz_ids.indexOf(item.trademarkId) === -1) {
              _this.check_biz_ids.push(item.trademarkId)
            }
            _this.isCheckAll = true
          })
        }
      },

      //删除其中一项
      delItemHandle() {
        if (this.check_biz_ids.length === 0) {
          this.$message({
            message: '请勾选要删除的行！',
            type: 'warning'
          });
        } else {
          deleteTrademarkByIds(this.check_biz_ids).then(res => {
            if (res.code === 200) {
              this.check_biz_ids = [];
              this.isCheckAll = false;
              this.$message({message: res.message, type: 'success'});
              this.listQuery.page = 0;
              this.getDictoryData();
            }
          })
        }
      },

      //导出
      handleExport() {
        this.listQuery.page = 0;
        if (this.id !== undefined) {
          this.listQuery.crmCompanyId = this.id;
          this.listQuery.pageSize = this.listData.length;
        } else {
          this.listQuery.crmCompanyId = '';
          this.listQuery.pageSize = this.listTotal;
        }
        let list_query = JSON.parse(JSON.stringify(this.listQuery))
        list_query.trademarkIds = this.check_biz_ids;
        exportTrademarkList(list_query).then(res => {
          if (res.code === 200) {
            downloadTemplate({fileName: res.message, delete: true}).then(response => {
              const url = window.URL.createObjectURL(response)
              let a = document.createElement('a')
              document.body.appendChild(a)
              let date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()
              const fileName = date + '-商标列表' + '.xlsx'
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

      //排序
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
        this.getDictoryData();
      },


      //加载更多
      loadMore() {
        this.tempPage = this.listQuery.page += 20;
        this.listQuery.pageSize = 20;
        if (this.listData.length < this.listTotal) {
          this.getDictoryData();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .el-popper .popper__arrow {
    right: 0 !important;
    left: inherit !important;

  }

  .sales-plan-box {
    margin: auto 5%;

    .title-name {
      padding-left: 20px;
      margin-top: 20px;
      font-size: 14px;
      color: rgba(68, 68, 68, .75);
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
              margin-right: 14px;
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
            /deep/ .el-input__inner {
              font-size: 15px;
              border: 0;
              text-align: right;
              color: rgba(5, 170, 255, 1);
            }

            /deep/ .el-input__icon {
              line-height: 0;
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

              .check-box {
                width: 18px;
                height: 18px;
                cursor: pointer;

                /deep/ .el-checkbox__inner::after {
                  height: 10px;
                  left: 6px;
                }
              }

              .img-box {
                width: 84px;
                height: 84px;
                border-radius: 4px;
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
              }
            }

            .detail {
              width: 100%;
              padding-top: 3px;

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

                .title-tag {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 3px 8px;
                  background: rgba(205, 238, 255, 1);
                  border-radius: 12px;
                  color: rgba(5, 170, 255, 1);
                  font-weight: normal;
                  font-size: 14px;
                }
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
                    flex: 1;
                    color: rgba(68, 68, 68, 0.75);
                    margin-bottom: 12px;

                    span {
                      color: rgba(68, 68, 68, 1);
                    }

                    .blue {
                      color: rgba(5, 170, 255, 1);
                      cursor: pointer;
                    }

                    .red {
                      color: rgba(245, 108, 108, 1);
                    }

                    &.mark-pic {
                      display: flex;
                      align-items: center;

                      .img {
                        width: 45px;
                        height: 45px;
                        cursor: pointer;

                        img {
                          width: 100%;
                          height: 100%;
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          .bage {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10%;
          }

          .handle-btn-group {
            width: 98px;
            min-width: 98px;

            .btn-img {
              margin: 8px;
              cursor: pointer;
              width: 70px;
              height: 30px;

              &.read-img {
                background: url("../../../icons/enterprise/read_icon.png") no-repeat;

                &:hover {
                  background: url("../../../icons/enterprise/_read_icon.png") no-repeat;
                }
              }

              &.edit-img {
                background: url("../../../icons/enterprise/edit_icon.png") no-repeat;

                &:hover {
                  background: url("../../../icons/enterprise/_edit_icon.png") no-repeat;
                }
              }
            }
          }
        }

        .get-more {
          padding: 30px 0;
          text-align: center;
          cursor: pointer;
        }
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
  }
  /deep/ .select-sort-option {
    z-index: 98 !important;
    /deep/ .popper__arrow {
      right: 40px !important;
      left: auto !important;
    }
  }
</style>
