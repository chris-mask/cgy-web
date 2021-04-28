<template>
  <div class="dashboard-container" style="overflow: auto;overflow-x: hidden;height: 100%;">
    <el-row :gutter="15">
      <!--左边-->
      <el-col :span="16" :offset="1">
        <!--搜索-->
        <div ref="search">
          <el-card class="search-tab top-margin-10 center-items">
            <el-tabs v-model="search_type" type="card" @tab-click="handleTabChange">
              <el-tab-pane label="搜客户" name="1"></el-tab-pane>
              <el-tab-pane label="搜合同" name="2"></el-tab-pane>
              <el-tab-pane label="搜订单" name="3"></el-tab-pane>
              <el-tab-pane label="搜政策通知" name="4"></el-tab-pane>
              <!--<el-tab-pane label="搜知识产权" name="5"></el-tab-pane>-->
              <el-tab-pane label="搜立项" name="6"></el-tab-pane>
            </el-tabs>
            <div class="search-bar">
              <el-input class="search-ipt" :placeholder="search_placeholder" v-model="search_keyword"
                        @keyup.enter.native="goSearch">
                <template slot="append">
                  <el-button class="search-btn" type="primary" @click="goSearch">搜一下</el-button>
                </template>
              </el-input>
            </div>
            <div style="float: left" class="hot top-margin-15">
              <span class="hot-search">热搜榜：</span>
              <div class="hot-list">
               <span class="item" v-for="item in hot_search_keyword_list" @click="searchHotSearchKeyword(item)">
                 {{item.name}}
               </span>
              </div>

            </div>
          </el-card>
        </div>
        <!--销售跟进-->
        <div ref="sale">
          <!--          v-if="kan_ban_data.sale_follow_data"-->
          <el-card class="top-margin-10">
            <div slot="header" class="clearfix">
              <span style="color: #05AAFF; font-weight: bold;">|</span>
              <span class="index-content-title">&nbsp;销售跟进</span>
            </div>
            <div class="sales-nav-bar">

              <div class="item plan" @click="handleRedirect">
                <div class="left">
                  <div class="num">191</div>
                  <div class="text">我的计划</div>
                </div>
                <img src="https://www.chengguoyun.cn/media/kan_ban/icon/QmoLlzXe_20200326091155_927.png"/>
              </div>

              <div class="item electric">
                <div class="left">
                  <div class="num">191</div>
                  <div class="text">今日电销</div>
                </div>
                <img src="https://www.chengguoyun.cn/media/kan_ban/icon/ZcMoZ5sg_20200325151107_408.png"/>
              </div>

              <div class="item visit">
                <div class="left">
                  <div class="num">191</div>
                  <div class="text">今日拜访</div>
                </div>
                <img src="https://www.chengguoyun.cn/media/kan_ban/icon/DhIrhzDS_20200325151334_304.png"/>
              </div>

              <div class="item intention">
                <div class="left">
                  <div class="num">191</div>
                  <div class="text">我的意向</div>
                </div>
                <img src="https://www.chengguoyun.cn/media/kan_ban/icon/buKdwzTr_20200325152103_911.png"/>
              </div>

              <div class="item sign">
                <div class="left">
                  <div class="num">191</div>
                  <div class="text">今日签单</div>
                </div>
                <img src="https://www.chengguoyun.cn/media/kan_ban/icon/tT6lyZgv_20200325152239_648.png"/>
              </div>

            </div>
            <!--            <div>-->
            <!--              <el-row :gutter="12" style="margin-left: 50px">-->
            <!--                <el-col :span="4" style="width: 206px;height: 106px;"-->
            <!--                        v-for="(item,index) in kan_ban_data.sale_follow_data" :key="index">-->
            <!--                  <a @click="handleRedirect(item.visit_url)">-->
            <!--                    <el-card shadow="always"-->
            <!--                             :style="{background:'url('+item.background_image+')',backgroundRepeat:'no-repeat'}">-->
            <!--                      <div>-->
            <!--                      <span style="font-size: 28px;color: #ffffff;height: 37px">-->
            <!--                        {{item.num}}-->
            <!--                      </span>-->
            <!--                        <span style="height: 36px;width: 36px;float: right">-->
            <!--                        <img :src="host + item.icon_url" alt=""/>-->
            <!--                      </span>-->
            <!--                      </div>-->
            <!--                      <div style="font-size: 16px;color: #ffffff;height: 21pt;">{{item.name}}</div>-->
            <!--                    </el-card>-->
            <!--                  </a>-->
            <!--                </el-col>-->
            <!--              </el-row>-->
            <!--            </div>-->
          </el-card>
        </div>
        <!--综合看板-->
        <div ref="comprehensive">
          <!--          v-if="kan_ban_data.complex_kanban_data"-->
          <el-card class="top-margin-15">
            <div slot="header" class="clearfix">
              <span style="color: #5883FF; font-weight: bold;width: 3px;">|</span>
              <span class="index-content-title">&nbsp综合看板</span>
            </div>
            <div>
              <el-row :gutter="12" style="margin-left: 50px">
                <el-col :span="4" style="width: 206px;text-align: center;"
                        v-for="(item,index) in kan_ban_data.complex_kanban_data" :key="index">
                  <a @click="handleRedirect(item.visit_url)">
                    <div class="kan-ban-icon">
                      <img style="width: 42px; height: 42px;" :src="host + item.icon_url" alt="">
                      <div class="tip" v-if="item.has_no_read"></div>
                    </div>
                    <h1 style="margin: 0 auto;">
                      <span class="complex-kan-ban-num">{{item.num}}</span>
                    </h1>
                    <h1 style="margin-top: 0;">
                      <span class="complex-kan-ban-name">{{item.name}}</span>
                    </h1>
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <!--自定义看板-->
        <el-card class="top-margin-15">
          <div class="center-items" style="cursor:pointer;" @click="getUserKanBan">
            <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/YRZHLwgB_20200325084721_177.png" alt="">
            <span>自定义看板</span>
          </div>
        </el-card>
      </el-col>
      <!--右边-->
      <el-col :span="6">
        <!--我的事项-->
        <div ref="userMatter">
          <!--          v-if="kan_ban_data.to_do_data"-->
          <el-card class="top-margin-10 right-list">
            <div slot="header" class="clearfix">
              <span style="color: #05AAFF; font-weight: bold;">|</span>
              <span class="index-content-title">&nbsp我的事项</span>
            </div>
            <div class="user-matter">
              <el-row :gutter="12">
                <el-col :span="24" class="list-matter" v-for="(item,index) in kan_ban_data.to_do_data" :key="index">
                  <div class="list" @click="handleRedirect(item.visit_url)">
                    <div class="left">
                      <img style="width: 20px; height: 20px;" :src="host + item.icon_url" alt="">
                      <span>{{item.name}}</span>
                    </div>
                    <span style="float: right">{{item.num}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>

            <!--<div style="text-align: center" v-if="!kan_ban_data.to_do_data">请自定义看板</div>-->
          </el-card>
        </div>
        <!--政策通知-->
        <el-card class="right-list" :class="kan_ban_data.to_do_data  ? 'top-margin-10' : 'top-margin-10'">
          <div slot="header" class="clearfix">
            <span style="color: #FE4E7E; font-weight: bold;">|</span>
            <span class="scroll-list-title">&nbsp政策通知</span>
            <span class="scroll-more"><a @click="handleRedirect('/policy_notice/list')">更多></a></span>
          </div>
          <div style="height:100%;width:100%">
            <div class="body" :style="NoticeListView">
              <div class="scroll-content" :style="{'top':NoticeListTop}">
                <tr v-for="(item,index) in NoticeList" :key="index">
                  <a @click="handleRedirect('/policy_notice/check',item)">
                    <div style="margin-top: 10px;">
        <span class="scroll-list-area-level-background"><span class="scroll-list-area-level"
                                                              :style="{backgroundColor:item.background_color}">{{item.area_level}}</span></span>
                      <span class="scroll-list-name">{{item.name}}</span>
                    </div>
                    <div style="margin-top: 5px;">
                      <span class="scroll-list-time">{{item.submit_online_start}}</span>
                      <span class="apply-state">
                        <span v-if="item.apply_state_tuple[0] === '1'">
                          距申报开始<span class="apply-state-day">{{item.apply_state_tuple[1]}}</span>天(未开始)
                        </span>
                        <span v-else-if="item.apply_state_tuple[0] === '2'">
                          距申报截止<span class="apply-state-day">{{item.apply_state_tuple[1]}}</span>天(进行中)
                        </span>
                        <span v-else-if="item.apply_state_tuple[0] === '3'">
                          已结束
                        </span>
                      </span>
                    </div>
                  </a>
                </tr>
              </div>
            </div>
          </div>
        </el-card>
        <!--立项公示-->
        <el-card class="top-margin-10 right-list">
          <div slot="header" class="clearfix">
            <span style="color: #FFA96A; font-weight: bold;">|</span>
            <span class="scroll-list-title">&nbsp;立项公示</span>
            <span class="scroll-more"><a
              @click="handleRedirect('/maintenance/maintenance-mng/ent-dim-list')">更多></a></span>
          </div>
          <div style="height:100%;width:100%">
            <div class="body" :style="MaintenanceListView">
              <div class="scroll-content" :style="{'top':MaintenanceListTop}">
                <tr v-for="(item,index) in maintenanceList" :key="index">
                  <a @click="handleRedirect('/maintenance/maintenance-mng/detail',item)">
                    <div style="margin-top: 10px;">
                      <span class="scroll-list-area-level-background">
                        <span class="scroll-list-area-level" :style="{backgroundColor:item.background_color}">{{item.areaLevel}}</span>
                      </span>
                      <span class="scroll-list-name">{{item.project_name}}</span>
                    </div>
                    <div style="margin-top: 5px;">
                      <span class="scroll-list-time" style="float: right; text-align: right;">{{item.topic_time}}</span>
                    </div>
                  </a>
                </tr>
              </div>
            </div>
          </div>
        </el-card>

      </el-col>
    </el-row>

    <!--弹窗-->
    <el-dialog title="自定义看板" :visible.sync="kanBanVisible" v-dialogDrag>
      <el-form label-position="left" label-width="80px" style='width: 600px; margin-left:50px;'>
        <el-row>
          <el-col>
            <tree-transfer :title="kan_ban_title" :from_data='from_data' :to_data='to_data'
                           :defaultProps="{label:'label'}"
                           @addBtn='add' @removeBtn='remove' :button_text="button_text" width="100%" filter
                           openAll></tree-transfer>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="kanBanVisible = false">取消</el-button>
        <el-button type="primary" @click="saveBindUser">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import store from '@/store'
  // import { getKanBanDataApi, indexSearchApi } from '@/api/user_define'
  // import { PolicyNoticeMng } from '@/api/policy_notice'
  // import { getMaintenance } from '@/api/maintenance'
  // import { userKanBanMng, userKanBanSave } from '@/api/user_define'
  import treeTransfer from 'el-tree-transfer'
  // import Navbar from '@/views/dashboard/Navbar'

  export default {
    name: 'dashboard',
    components: {treeTransfer},
    props: {
      viewHeight: {// 可视窗口
        type: [Number, String],
        default: ''
      },
      moveDistance: { // 移动距离
        type: Number,
        default: 30
      }
    },
    data() {
      return {
        search_type: '1',
        search_keyword: null,
        search_placeholder: '请输入企业名称、信用代码',
        search_placeholder_list: ['请输入企业名称/信用代码', '请输入企业名称/合同编号/项目名称', '请输入企业名称/项目名称', '请输入政策通知名称/项目名称', '请输入知识产权名称', '请输入企业名称/项目名称'],
        host: process.env.BASE_API,
        user_name: store.getters.name,
        count: 0,
        listQuery: {
          page: 1,
          limit: 200,
          state: '1'
        },
        hot_search_keyword_dict: [], // 热搜榜
        hot_search_keyword_list: [], // 激活热搜榜
        kan_ban_data: {}, // 看板数据
        NoticeList: [],
        maintenanceList: [],
        kanBanVisible: false,
        kan_ban_title: ['可选看板', '我的看板'],
        button_text: ['添加', '移除'],
        from_data: [],
        to_data: [],
        NoticeListActiveIndex: 0,
        MaintenanceListActiveIndex: 0,
        NoticeListView: '', // 政策通知可视窗口高度
        MaintenanceListView: '' // 立项公示可视窗口高度
      }
    },
    filters: {},
    computed: {
      NoticeListTop() {
        return -this.NoticeListActiveIndex * this.moveDistance + 'px' // 定义移动的单元高度
      },
      MaintenanceListTop() {
        return -this.MaintenanceListActiveIndex * this.moveDistance + 'px' // 定义移动的单元高度
      }
    },
    mounted() {
      this.getNoticeList()
      this.getMaintenanceList()
      this.getKanBanData()
      setInterval(_ => {
        // 政策通知自定义滚动
        if (this.NoticeListActiveIndex < this.NoticeList.length) {
          this.NoticeListActiveIndex += 1
        } else {
          this.NoticeListActiveIndex = 0
        }
      }, 1500)
      setInterval(_ => {
        // 立项公示自定义滚动
        if (this.MaintenanceListActiveIndex < this.maintenanceList.length) {
          this.MaintenanceListActiveIndex += 1
        } else {
          this.MaintenanceListActiveIndex = 0
        }
      }, 1500)
      setTimeout(() => {
        this.getListHeight()
        window.onresize = () => {
          return (() => {
            const searchHeight = this.$refs.search.clientHeight
            const saleHeight = this.$refs.sale.clientHeight
            const comprehensiveHeight = this.$refs.comprehensive.clientHeight
            const userMatterHeight = this.$refs.userMatter.clientHeight
            const listHeight = ((searchHeight + saleHeight + comprehensiveHeight - userMatterHeight - 107) / 2) + 'px'
            this.NoticeListView = {'height': listHeight}
            this.MaintenanceListView = {'height': listHeight}
          })()
        }
      }, 1000)
    },

    methods: {
      // 搜索tab切换
      handleTabChange() {
        this.search_keyword = null
        this.search_placeholder = this.search_placeholder_list[this.search_type - 1]
        this.hot_search_keyword_list = this.hot_search_keyword_dict[this.search_type]
      },
      // 开始搜索
      goSearch() {
        // indexSearchApi({ search_type: this.search_type, search_keyword: this.search_keyword }).then(res => {
        //   if (res.data.code === 1) {
        //     this.hot_search_keyword_dict = res.data.data.hot_search_keyword_dict
        //     this.hot_search_keyword_list = res.data.data.hot_search_keyword_dict[this.search_type]
        //     this.$router.push(res.data.data.redirect_url)
        //     // this.handleRedirect(res.data.data.redirect_url)
        //   }
        // })
      },
      // 关键字搜索
      searchHotSearchKeyword(data) {
        this.search_type = data.search_type
        this.search_keyword = data.name
        this.goSearch()
      },
      // 登出
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      },
      // 获取看板数据
      getKanBanData() {
        // getKanBanDataApi({}).then(res => {
        //   if (res.data.code === 1) {
        //     this.kan_ban_data = res.data.data.kan_ban_data
        //     this.hot_search_keyword_dict = res.data.data.hot_search_keyword_dict
        //     this.hot_search_keyword_list = res.data.data.hot_search_keyword_dict['1']
        //   }
        // })
      },
      // 加载政策通知
      getNoticeList() {
        var notice_list_query = JSON.parse(JSON.stringify(this.listQuery))
        notice_list_query.order_type = '-submit_online_end'
        notice_list_query.is_cache = true
        // PolicyNoticeMng(notice_list_query).then(res => {
        //   if (res.data.code === 1) {
        //     this.NoticeList = res.data.data
        //   }
        // })
      },
      // 加载立项公示
      getMaintenanceList() {
        var maintenance_list_query = JSON.parse(JSON.stringify(this.listQuery))
        maintenance_list_query.is_cache = true
        // getMaintenance(maintenance_list_query).then(res => {
        //   if (res.data.code === 1) {
        //     this.maintenanceList = res.data.data
        //   }
        // })
      },
      // 点击跳转
      // handleRedirect(redirect_url, data) {
      //   if (redirect_url && data && redirect_url === '/policy_notice/check') { // 政策通知详情
      //     redirect_url = redirect_url + '?is_check=true&biz_id=' + data.biz_id
      //   }
      //   if (redirect_url && data && redirect_url === '/maintenance/maintenance-mng/detail') { // 立项公示详情
      //     redirect_url = redirect_url + '?biz_id=' + data.biz_id
      //   }
      //   if (redirect_url) {
      //     this.$router.push({path: redirect_url})
      //     // const routeUrl = this.$router.resolve({ path: redirect_url })
      //     // window.open(routeUrl.href, '_blank')
      //   } else {
      //     this.$message.error('该功能尚未开通，敬请期待！')
      //   }
      // },
      handleRedirect(){
        this.$router.push({
          'path': '/customer/salesPlan',
        })
      },
      // 获取用户自定义看板
      getUserKanBan() {
        this.kanBanVisible = true
        // userKanBanMng({}).then(res => {
        //   if (res.data.code === 1) {
        //     this.from_data = res.data.can_choice_kan_ban
        //     this.to_data = res.data.user_kan_ban_list
        //   }
        // })
      },
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        this.to_data = toData
      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        this.to_data = toData
      },
      // 保存自定义看板
      saveBindUser() {
        this.kanBanVisible = false
        // userKanBanSave({ to_data: this.to_data }).then((res) => {
        //   if (res.data.code === 1) {
        //     this.dialogFormVisible = false
        //     this.$notify({
        //       title: '成功',
        //       message: '更新成功',
        //       type: 'success',
        //       duration: 2000
        //     })
        //     // this.$router.go(0)
        //     this.getKanBanData()
        //   } else {
        //     this.$notify({
        //       title: '失败',
        //       message: res.message,
        //       type: 'error',
        //       duration: 2000
        //     })
        //   }
        // })
      },

      // 设置政策通知和立项公示高度
      getListHeight() {
        const searchHeight = this.$refs.search.clientHeight
        const saleHeight = this.$refs.sale.clientHeight
        const comprehensiveHeight = this.$refs.comprehensive.clientHeight
        const userMatterHeight = this.$refs.userMatter.clientHeight
        const listHeight = ((searchHeight + saleHeight + comprehensiveHeight - userMatterHeight - 135) / 2) + 'px'
        this.NoticeListView = {'height': listHeight}
        this.MaintenanceListView = {'height': listHeight}
      }

    }
  }
</script>

<style lang="less" scoped>
  .scroll-content {
    //自定义滚动 间隔时间和方向
    position: relative;
    transition: top 1.5s; //向上移动
  }

  .body {
    width: 100%;
    height: 100px;
    overflow-y: hidden;
    //   position: absolute;
  }

  .dashboard-container {
    background-color: #F5F9FF;
  }

  .complex-kan-ban-num {
    text-align: center;
    width: 38px;
    height: 42px;
    font-size: 32px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 42px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }

  .complex-kan-ban-name {
    width: 64px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 18px;
    color: rgba(68, 68, 68, 0.75);
    opacity: 1;
  }

  .to-do-data-name {
    width: 64px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: rgba(68, 68, 68, 1);
    opacity: 1;
  }

  .to-do-data-num {
    width: 9px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: rgba(68, 68, 68, 0.75);
    opacity: 1;
  }

  .scroll-list-title {
    width: 64px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: rgba(4, 43, 64, 1);
    opacity: 1;
  }

  .scroll-more {
    float: right;
    width: 43px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(68, 68, 68, 0.50);
    opacity: 1;
  }

  .scroll-list-area-level-background {
    width: 40px;
    height: 20px;
    opacity: 1;
  }

  .scroll-list-name {
    width: 100%;
    height: 40px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(68, 68, 68, 1);
    opacity: 1;
  }

  .scroll-list-area-level {
    width: 24px;
    height: 17px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    padding: 2px 4px;
  }

  .scroll-list-time {
    width: 151px;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(68, 68, 68, 0.60);
    opacity: 1;
  }

  .apply-state {
    float: right;
    height: 19px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: #05AAFF;
    opacity: 1;
  }

  .apply-state-day {
    color: #F56C6C;
  }

  .top-margin-30 {
    margin-top: 30px;
  }

  .top-margin-10 {
    margin-top: 10px;
  }

  .top-margin-15 {
    margin-top: 15px;
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

  .index-box-card {
    margin: 30px 0px;
  }

  .content-div {
    margin: 30px;
    width: 90%;
  }

  .com_top_title {
    background: #3A3A3A;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px 5px 0;
    margin-bottom: 20px;
  }

  .index-content-title {
    width: 64px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: rgba(4, 43, 64, 1);
    opacity: 1;
  }

  .index-content-row {
    margin: 10px;
  }

  .link-content {
    font-size: 18px;
  }

  .navbar {
    height: 64px;
    line-height: 64px;
    border-radius: 0px !important;
    background: #05AAFF;

    .hamburger-container {
      line-height: 72px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      display: flex;
      float: right;
      height: 100%;
      font-size: 14px;
      color: #FFFFFF;
      margin-right: 60px;

      &:focus {
        outline: none;
      }
    }

    .left-menu {
      display: flex;
      float: left;
      height: 60%;
      line-height: 60%;
      font-size: 14px;
      color: #FFFFFF;
      margin: 12px 60px;

      &:focus {
        outline: none;
      }
    }

    .avatar {
      display: flex;
      height: 60%;
      line-height: 60%;
      font-size: 14px;
      color: #FFFFFF;
      margin: 12px 12px;

      &:focus {
        outline: none;
      }
    }

    .shu {
      margin: 0 20px;
    }
  }


  /*--------------*/
  /deep/ .el-card__header {
    padding: 8px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .user-matter {
    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      cursor: pointer;

      .left {
        display: flex;
        align-items: center;

        img {
          margin-right: 4px;
        }
      }
    }

    .list-matter:last-child {
      .list {
        margin-bottom: 0;
      }
    }
  }

  /deep/ .el-tabs__item.is-active {
    color: #fff;
    background-image: linear-gradient(#69CCFF, #05AAFF);
    border-bottom: 1px solid #05AAFF !important;
  }

  .search-tab {
    /*width: 124%;*/
    border-radius: 0;

    /deep/ .el-tabs__item {
      height: 32px;
      line-height: 32px;
    }

    /deep/ .el-tabs--card > .el-tabs__header {
      border-bottom: 0;
    }

    /deep/ .el-tabs__item {
      border-bottom: 1px solid #E4E7ED;
    }
  }

  .search-bar {
    .search-btn {
      /*height: 36px;*/
      border-radius: 0;
      color: #fff;
      background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    }

    .search-ipt {
      /deep/ .el-input__inner {
        width: 460px;
        height: 38px;
        border: 1px solid #05AAFF;
        border-right: 0;
      }
    }
  }

  .right-list {
    /deep/ .el-card__body {
      padding: 8px 20px;
    }
  }

  .hot {
    display: flex;
    align-items: flex-start;
    width: 440px;

    .hot-search {
      white-space: nowrap;
    }

    .hot-list {
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;

      .item {
        margin-right: 10px;
        font-family: Microsoft YaHei;
        color: rgba(151, 151, 151, 1);
        font-weight: 400;
        cursor: pointer;
        margin-bottom: 8px;
        margin-top: 2px;
      }
    }
  }

  .kan-ban-icon {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 42px;

    .tip {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #F56C6C;
      position: absolute;
      right: 2px;
      top: 2px;
    }
  }

  .sales-nav-bar {
    display: flex;
    align-items: center;
    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      padding-bottom: 27px;
      box-sizing: border-box;
      flex: 1;
      max-width: 210px;
      height: auto;
      margin-right: 10px;
      background-size: cover;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;

      .left {
        color: #fff;

        .num {
          font-size: 1.5vw;
          margin-bottom: 6px;
        }

        .text {
          font-size: 0.85vw;
        }
      }

      &.plan{
        background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/IrwwmFeY_20200326091500_457.png") no-repeat;
      }
      &.electric{
        background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/iucBhF23_20200326093649_935.png") no-repeat;
      }
      &.visit{
        background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/mnVEjNJc_20200326093718_403.png") no-repeat;
      }
      &.intention{
        background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/4B2MZpIP_20200324110316_886.png") no-repeat;
      }
      &.sign{
        background: url("https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/zd11QkvJ_20200324110350_190.png") no-repeat;
      }
      &:last-child{
        margin-right: 0;
      }
    }
  }

</style>
