<template>
  <div class="chat-list">
    <el-container class="link-up-box" :style="contentHeight">
      <!--左边-->
      <div class="left-box" v-show="companyType != 2">
        <div class="searchType" ref="searchType">
          <span :class="searchType == 1 ? 'active' : ''" @click="searchChange(1)">企业</span>
          <span :class="searchType == 2 ? 'active' : ''" @click="searchChange(2)">用户</span>
        </div>
        <div class="search-head" ref="searchHeard">
          <el-input v-if="searchType == 1" v-model="searchName" class="filter-item search-ipt" placeholder="公司名称" @keyup.enter.native="getUserList"></el-input>
          <el-input v-else v-model="searchUserName" class="filter-item search-ipt" placeholder="用户名称" @keyup.enter.native="getUserList"></el-input>
          <el-button class="filter-item search-btn" @click="getUserList">搜一下</el-button>
          <el-button class="filter-item more-news">更多条件</el-button>
        </div>
        <div class="user-list" :style="userListHeight">
          <!--全部-->
          <div v-if="isShowAll" :class="activedAll?'item cur':'item'" @click="allHandle">
            <div class="detail">
              <div class="user-pic">
                <div>全部</div>
              </div>
              <div>
                <div class="user-name">全部</div>
              </div>
            </div>
          </div>

          <!-- 内部 -- 公司-->
          <el-collapse>
            <el-collapse-item name="1" class="inside-user">
              <template slot="title">
                <div class="inside-title">
                  <el-badge :value="internalNotReadSum">
                    内部
                  </el-badge>
                </div>
                <span class="inside-text-name">内部</span>
              </template>

              <div
                v-for="(item,index) in companyInternalBos"
                :class="activedInside === index?'cur' : ''"
                :key="index"
              >
                <div :class="item.topTime?'item top':'item'" @click="selectItemHandle(index,item,0)">
                  <div class="detail">
                    <div class="user-pic">
                      <div class="userName">{{item.userName}}</div>
                      <div class="bage" v-if="item.notReadNum !== 0">
                        {{item.notReadNum}}
                      </div>
                    </div>
                    <div class="name-record">
                      <div class="user-name" :title="item.newUserName"> {{item.newUserName}}</div>
                      <div class="user-record">
                        {{item.lastChatContent && item.lastChatContent !== ""?item.lastChatContent:''}}
                      </div>
                    </div>
                  </div>
                  <div class="time">
                    {{item.newLastChatTime && item.newLastChatTime !== ""? item.newLastChatTime:''}}
                  </div>
                  <div class="tip">
                    <el-dropdown class="tip-box" v-if="allowTop.oneAllow">
                      <div class="el-dropdown-link">
                        <i class="icon el-icon-more"></i>
                      </div>
                      <el-dropdown-menu class="tip-list" slot="dropdown">
                        <el-dropdown-item v-if="!item.topTime" @click.native="topHandle(item,1,1,'inside')">置顶
                        </el-dropdown-item>
                        <el-dropdown-item v-else @click.native="topHandle(item,1,0,'inside')">取消置顶</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>

              </div>
            </el-collapse-item>
          </el-collapse>

          <!--     陌生人     -->
          <el-collapse>
            <el-collapse-item name="1" class="inside-user">
              <template slot="title">
                <div class="inside-title">
                  <el-badge :value="visitorNotReadSum">
                    陌生人
                  </el-badge>
                </div>
                <span class="inside-text-name">陌生人</span>
              </template>

              <div
                v-for="(item,index) in strangerBos"
                :class="activedStranger === index?'cur' : ''"
                :key="index"
              >
                <div :class="item.topTime?'item top':'item'" @click="selectItemHandle(index,item,2)">
                  <div class="detail">
                    <div class="user-pic">
                      <div class="userName">游客</div>
                      <div class="bage" v-if="item.notReadNum !== 0">
                        {{item.notReadNum}}
                      </div>
                    </div>
                    <div class="name-record">
                      <div class="user-name" :title="item.newUserName"> {{item.newUserName}}</div>
                      <div class="user-record">
                        {{item.lastChatContent && item.lastChatContent !== ""?item.lastChatContent:''}}
                      </div>
                    </div>
                  </div>
                  <div class="time">
                    {{item.newLastChatTime && item.newLastChatTime !== ""? item.newLastChatTime:''}}
                  </div>
                  <div class="tip">
                    <el-dropdown class="tip-box" v-if="allowTop.oneAllow">
                      <div class="el-dropdown-link">
                        <i class="icon el-icon-more"></i>
                      </div>
                      <el-dropdown-menu class="tip-list" slot="dropdown">
                        <el-dropdown-item v-if="!item.topTime" @click.native="topHandle(item,1,1,'inside')">置顶
                        </el-dropdown-item>
                        <el-dropdown-item v-else @click.native="topHandle(item,1,0,'inside')">取消置顶</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>

              </div>
            </el-collapse-item>
          </el-collapse>

          <!--     私海     -->
          <el-collapse>
            <el-collapse-item name="1" class="inside-user">
              <template slot="title">
                <div class="inside-title">
                  <el-badge :value="privateNotReadSeaSum">
                    私海
                  </el-badge>
                </div>
                <span class="inside-text-name">私海</span>
              </template>

              <div
                v-for="(item,index) in privateSeaBos"
                :class="activedInside === index?'cur' : ''"
                :key="index"
              >
                <div :class="item.topTime?'item top':'item'" @click="selectItemHandle(index,item,1)">
                  <div class="detail">
                    <div class="user-pic">
                      <div class="userName">{{item.userName}}</div>
                      <div class="bage" v-if="item.notReadNum !== 0">
                        {{item.notReadNum}}
                      </div>
                    </div>
                    <div class="name-record">
                      <div class="user-name" :title="item.newUserName"> {{item.newUserName}}</div>
                      <div class="user-record">
                        {{item.lastChatContent && item.lastChatContent !== ""?item.lastChatContent:''}}
                      </div>
                    </div>
                  </div>
                  <div class="time">
                    {{item.newLastChatTime && item.newLastChatTime !== ""? item.newLastChatTime:''}}
                  </div>
                  <div class="tip">
                    <el-dropdown class="tip-box" v-if="allowTop.oneAllow">
                      <div class="el-dropdown-link">
                        <i class="icon el-icon-more"></i>
                      </div>
                      <el-dropdown-menu class="tip-list" slot="dropdown">
                        <el-dropdown-item v-if="!item.topTime" @click.native="topHandle(item,1,1,'inside')">置顶
                        </el-dropdown-item>
                        <el-dropdown-item v-else @click.native="topHandle(item,1,0,'inside')">取消置顶</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>

              </div>
            </el-collapse-item>
          </el-collapse>

          <!--     公海     -->
          <el-collapse>
            <el-collapse-item name="1" class="inside-user">
              <template slot="title">
                <div class="inside-title">
                  <el-badge :value="highSeaNotReadSum">
                    公海
                  </el-badge>
                </div>
                <span class="inside-text-name">公海</span>
              </template>

              <div
                v-for="(item,index) in highSeaBos"
                :class="activedInside === index?'cur' : ''"
                :key="index"
              >
                <div :class="item.topTime?'item top':'item'" @click="selectItemHandle(index,item,1)">
                  <div class="detail">
                    <div class="user-pic">
                      <div class="userName">{{item.userName}}</div>
                      <div class="bage" v-if="item.notReadNum !== 0">
                        {{item.notReadNum}}
                      </div>
                    </div>
                    <div class="name-record">
                      <div class="user-name" :title="item.newUserName"> {{item.newUserName}}</div>
                      <div class="user-record">
                        {{item.lastChatContent && item.lastChatContent !== ""?item.lastChatContent:''}}
                      </div>
                    </div>
                  </div>
                  <div class="time">
                    {{item.newLastChatTime && item.newLastChatTime !== ""? item.newLastChatTime:''}}
                  </div>
                  <div class="tip">
                    <el-dropdown class="tip-box" v-if="allowTop.oneAllow">
                      <div class="el-dropdown-link">
                        <i class="icon el-icon-more"></i>
                      </div>
                      <el-dropdown-menu class="tip-list" slot="dropdown">
                        <el-dropdown-item v-if="!item.topTime" @click.native="topHandle(item,1,1,'inside')">置顶
                        </el-dropdown-item>
                        <el-dropdown-item v-else @click.native="topHandle(item,1,0,'inside')">取消置顶</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>

              </div>
            </el-collapse-item>
          </el-collapse>

          <!-- 外部 -- 公司 -->
<!--          <div-->
<!--            v-for="(item,index) in companyExternalBos"-->
<!--            :class="activedCompany === index?'cur' : ''"-->
<!--            :key="index"-->
<!--          >-->
<!--            <div :class="item.topTime?'item top':'item'" @click="selectItemHandle(index,item,1)">-->
<!--              <div class="detail">-->
<!--                <div class="user-pic">-->
<!--                  <div>{{item.companyShortName}}</div>-->
<!--                  <div class="bage" v-if="item.notReadNum !== 0">-->
<!--                    {{item.notReadNum}}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="name-record">-->
<!--                  <div class="user-name" :title="item.companyName">{{item.companyName}}</div>-->
<!--                  <div class="user-record" v-if="item.lastChatContent && item.lastChatContent!==''">-->
<!--                    {{item.lastChatContent}}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="time">-->
<!--                {{item.lastChatTime}}-->
<!--              </div>-->
<!--              <div class="tip">-->
<!--                <el-dropdown class="tip-box" v-if="allowTop.oneAllow">-->
<!--                  <div class="el-dropdown-link">-->
<!--                    <i class="icon el-icon-more"></i>-->
<!--                  </div>-->
<!--                  <el-dropdown-menu class="tip-list" slot="dropdown">-->
<!--                    <el-dropdown-item v-if="!item.topTime" @click.native="topHandle(item,2,1,'enterprise')">置顶-->
<!--                    </el-dropdown-item>-->
<!--                    <el-dropdown-item v-else @click.native="topHandle(item,2,0,'enterprise')">取消置顶</el-dropdown-item>-->
<!--                  </el-dropdown-menu>-->
<!--                </el-dropdown>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>

      <!--右边-->
      <div class="right-box" ref="rightBox" v-show="activedName !==''">
        <!--客户名称-->
        <div class="company-name" ref="companyName">
          {{activedName}}
        </div>
        <!--导航、搜索栏-->
        <div class="search-heard" ref="rightSearchHeard">
          <div class="left">
            <div :class="activedNavTab=== item.keys?'tab-list cur':'tab-list'"
                 @click="selectNavTab(item)"
                 v-for="item in rightNavTab"
                 :key="item.keys"
            >
              {{item.name}}
            </div>
          </div>
          <div class="right">
            <el-input v-model="searchForm.chatContent" clearable class="chatRecord" @keyup.enter.native="searchChatHandle" placeholder="搜索记录"></el-input>
            <el-date-picker v-model="searchForm.startDate" class="time" type="date" placeholder="开始日期"
                            value-format="yyyy-MM-dd"></el-date-picker>
            至
            <el-date-picker v-model="searchForm.endDate" class="time" type="date" placeholder="结束日期"
                            value-format="yyyy-MM-dd"></el-date-picker>
            <el-button class="filter-item search-btn" @click="searchChatHandle">搜索</el-button>
          </div>
        </div>
        <!--对话窗口-->
        <div class="dialog-box">
          <div class="dialog" ref="dialog" :style="chatListHeight">
            <div class="has-more-news" v-if="isShowMoreNews" @click="getMore"><span>查看更多消息</span></div>
            <div class="has-more-news not_more" v-else>没有多消息了</div>
            <div class="connect-div">
              <template v-for="item in chatData">
                <div class="left-massage" v-if="item.msgPosition === 'left'">
                  <div class="title">
                    <div class="pic">{{item.userName|titleSize}}</div>
                    <div class="text">{{item.userName}}</div>
                    <div class="time">{{item.sendTime}}</div>
                    <!--                    <img class="del-icon" :src="del_icon" @click="delChat(item)"/>-->
                  </div>
                  <div class="content">{{item.chatContent}}</div>
                  <template v-if="item.appFileVoList && item.appFileVoList.length !== 0">
                    <div class="down-content" v-for="item in item.appFileVoList" :key="item.fileId">
                      附件：{{item.fileName}}.{{item.fileType}}
                      <button class="down-btn" @click="downHandle(item.fileUrl)">下载</button>
                    </div>
                  </template>
                </div>

                <div class="right-massage" v-if="item.msgPosition === 'right'">
                  <div class="title">
                    <img class="del-icon" :src="del_icon" @click="delChat(item)" v-if="allowDelete.oneAllow" />
                    <div class="time">{{item.sendTime}}</div>
                    <div class="text">{{item.userName}}</div>
                    <div class="pic">{{item.userName|titleSize}}</div>
                  </div>
                  <div class="content">
                    {{item.chatContent}}
                  </div>
                  <template v-if="item.appFileVoList &&item.appFileVoList.length !== 0">
                    <div class="down-content" v-for="item in item.appFileVoList" :key="item.fileId">
                      附件：{{item.fileName}}{{item.fileType}}
                      <button class="down-btn" @click="downHandle(item.fileUrl)" v-preventReClick>下载</button>
                    </div>
                  </template>
                </div>


              </template>
            </div>
          </div>

          <div class="dialog-input" ref="dialogInput" v-show="activedAll==null||activedAll==''||companyType == 2">
            <el-input
              autofocus="true"
              class="text-input"
              v-model="chatContent"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5}"
              placeholder="输入沟通内容..."
              @keydown.native="handleKeyCode($event)"
            >
            </el-input>
            <div class="btn-group">
              <div slot="footer" class="dialog-footer">
                <el-upload action="#"
                           v-if="allowUpload.oneAllow"
                           class="upload-box upload-box-width"
                           :on-change="fileChange"
                           :auto-upload="false"
                           :file-list="fileTemp"
                           :on-remove="handleRemove"
                >
                  <el-button type="info" class="update-files-btn">附件上传<i class="el-icon-upload el-icon--right"></i></el-button>
                </el-upload>
              </div>
              <div>
                <span class="send-tap">Enter发送，Ctrl+Enter换行</span>
                <el-button class="send-btn" type="primary" @click="goSendData" v-if="allowSend.oneAllow">发 送</el-button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
  import {
    queryChatList,
    updateChatPinOrUnpin,
    queryMessageList,
    addChat,
    deleteChatById,
    addChatFile,
    filterSensitiveWords
  } from '@/api/messageCenter'
  import del_icon from '../../../../static/del_icon.png'
  import {getNowTime} from '@/utils/auth'

  export default {
    data() {
      return {
        //删除ICON
        del_icon,
        // 公用：公司ID
        companyId: this.$store.getters.companyId,
        // 公用：公司名称
        companyName: this.$store.getters.companyName,
        // 公用：公司类型
        companyType: this.$store.getters.companyType,

        //内容框高度
        contentHeight: {'height': ""},
        //左侧栏高度
        userListHeight: {'height': ""},
        // 对话框高度
        chatListHeight: {height: ""},

        //当前选中的--消息类型：：0：内部，1：外部
        activedChatType: null,
        //右侧栏---当前选中tab
        activedNavTab: 1,
        //左侧栏---当前选中的内容
        activedItemData: {},
        //当前选中的名称
        activedName: "",

        //左侧栏---搜索栏
        searchName: "",
        searchUserName: "",
        //左侧栏---全部选中的值
        activedAll: null,
        //左侧栏---内部选中的值
        activedInside: '',
        //左侧栏---外部选中的值
        activedCompany: "",
        //左侧栏---陌生人选中的值
        activedStranger: "",

        //左侧栏---外部公司数据
        companyExternalBos: [],
        //左侧栏---内部公司数据
        companyInternalBos: [],
        //左侧栏---内部公司未读数
        internalNotReadSum: 0,
        //左侧栏---陌生人数据
        strangerBos: [],
        //左侧栏---陌生人未读数
        visitorNotReadSum: 0,
        //左侧栏---私海数据
        privateSeaBos:[],
        //左侧栏---私海未读数
        privateNotReadSeaSum:0,
        //左侧栏---公海数据
        highSeaBos:[],
        //左侧栏---公海未读数
        highSeaNotReadSum: 0,

        //右侧栏---navTab
        rightNavTab: [],

        //右侧栏---沟通框
        chatContent: "",

        //对话窗口数据
        chatData: [],
        // 判断是否显示查看更多
        isShowMoreNews: true,
        //页数
        page: 0,
        pageSize: 20,
        //搜索字段
        searchForm: {
          chatContent: "",
          startDate: "",
          endDate: ""
        },
        //图片上传参数
        fileTemp: [],
        fileIds: "",

        //判断是否显示左侧栏全部
        isShowAll:null,
        searchType: 1,

        allowGetPersonList: this.authorityControl('SYSTEM:MESSAGE:MANAGE','SYSTEM:MESSAGE:CHAT:LIST'),//查询聊天列表
        allowGetMessageList: this.authorityControl('SYSTEM:MESSAGE:MANAGE','SYSTEM:MESSAGE:MESSAGE:LIST'),//查询聊天内容列表
        allowUpload: this.authorityControl('SYSTEM:MESSAGE:MANAGE','SYSTEM:MESSAGE:MESSAGE:UPLOADFILE'),//上传聊天文件
        allowSend: this.authorityControl('SYSTEM:MESSAGE:MANAGE','SYSTEM:MESSAGE:MESSAGE:INSERT'),//发送聊天信息
        allowDelete: this.authorityControl('SYSTEM:MESSAGE:MANAGE','SYSTEM:MESSAGE:MESSAGE:DELETE'),//删除聊天信息
        allowTop: this.authorityControl('SYSTEM:MESSAGE:MANAGE','SYSTEM:MESSAGE:MESSAGE:TOP'),//聊天联系人置顶

      }
    },
    activated() {
      this.getUserList();
      this.allHandle();
      setTimeout(() => {
        this.getDialogHeight();
      }, 200);
    },
    updated() {
      this.getDialogHeight()
    },
    methods: {
      //左侧栏--点击全部
      allHandle() {
        if (this.companyType == 2) {
          this.activedName = this.companyName;
          queryMessageList({
            messageType: 1,
            companyId: this.companyId,
            page: this.page,
            pageSize: this.pageSize,
            labelValue: 1,
          }).then(res => {
            if (res.code === 200) {
              this.chatData = res.data.msgChatListVos;

              this.chatData.forEach(item=>{
                if(item.msgPosition == 'left'){
                  if(!item.userName){
                    item.userName = '游客'+ item.userId
                  }
                }
              })
              this.getDialogHeight();
            }
            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            });
          })
        }
      },
      //左侧栏--获取用户列表
      getUserList() {
        let params = {
          companySearchName: this.searchName,
          userSearchName: this.searchUserName,
          companyId: this.companyId,
          companyName: this.companyName
        };

        if(this.allowGetPersonList.oneAllow){
          queryChatList(params).then(res => {
            if (res.code === 200) {
              let rightNavTabArr = [];
              for (let keys in res.data.messageType) {
                let obj = {};
                obj.keys = Number(keys);
                obj.name = res.data.messageType[keys];
                rightNavTabArr.push(obj);
              }

              rightNavTabArr.splice(rightNavTabArr.length-1,1);
              this.rightNavTab = rightNavTabArr;

              //判断是否显示左侧栏的全部
              if (res.data.messageType.center) {
                this.isShowAll = true

                this.activedAll = true
                this.activedInside = ''
                this.activedCompany = ''
                this.activedStranger = ''
                this.activedNavTab = 1
                this.page = 0
                this.activedName = '全部'
                this.activedChatType = ''

                queryMessageList({
                  messageType: '',
                  companyId: this.$store.getters.companyId,
                  page: this.page,
                  pageSize: this.pageSize,
                  labelValue: 1
                }).then(res => {
                  if (res.code === 200) {
                    this.chatData = res.data.msgChatListVos

                    this.chatData.forEach(item => {
                      if (item.msgPosition == 'left') {
                        if (!item.userName) {
                          item.userName = '游客' + item.userId
                        }
                      }
                    })
                    this.getDialogHeight()
                  }
                  this.$nextTick(() => {
                    this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight
                  })
                })

              } else {
                this.isShowAll = false
              }

              // this.companyExternalBos = res.data.companyExternalBos;

              //私海
              this.privateNotReadSeaSum = res.data.privateNotReadSeaSum;
              this.privateSeaBos = res.data.privateSeaBos.map(item => {
                item.newUserNameArr = [];
                item.rolePos.forEach(role => {
                  item.newUserNameArr.push(role.roleName);
                });
                // item.newUserNameArr = arr;
                item.newUserName = `${item.userName}_${item.newUserNameArr.join("_")}`;
                if (item.lastChatTime) {
                  item.newLastChatTime = item.lastChatTime.substring(0, 10);
                }
                return item
              })

              //公海
              this.highSeaNotReadSum = res.data.highSeaNotReadSum
              this.highSeaBos = res.data.highSeaBos.map(item => {
                item.newUserNameArr = [];
                item.rolePos.forEach(role => {
                  item.newUserNameArr.push(role.roleName);
                });
                // item.newUserNameArr = arr;
                item.newUserName = `${item.userName}_${item.newUserNameArr.join("_")}`;
                if (item.lastChatTime) {
                  item.newLastChatTime = item.lastChatTime.substring(0, 10);
                }
                return item
              })

              //内部
              this.internalNotReadSum = res.data.internalNotReadSum;
              this.companyInternalBos = res.data.internalUserBos.map(item => {
                item.newUserNameArr = [];
                item.rolePos.forEach(role => {
                  item.newUserNameArr.push(role.roleName);
                });
                // item.newUserNameArr = arr;
                item.newUserName = `${item.userName}_${item.newUserNameArr.join("_")}`;
                if (item.lastChatTime) {
                  item.newLastChatTime = item.lastChatTime.substring(0, 10);
                }
                return item
              });

              //陌生人
              this.visitorNotReadSum = res.data.visitorNotReadSum;
              this.strangerBos = res.data.strangerBos.map(item => {
                item.newUserName = '游客'+item.userId
                if (item.lastChatTime) {
                  item.newLastChatTime = item.lastChatTime.substring(0, 10);
                }
                return item
              });
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取聊天列表')
        }

      },

      //左侧栏---置顶/取消置顶
      topHandle(data, chatType, isTop, name) {
        let params;
        if (name === 'inside') {
          params = {
            chatType,
            isTop,
            topUserId: data.userId
          };
        } else {
          params = {
            chatType,
            isTop,
            topCompanyId: data.companyId,
          };
        }

        updateChatPinOrUnpin(params).then(res => {
          if (res.code === 200) {
            this.$message({type: 'success', message: res.message});
            this.getUserList();
          }
        })
      },

      //右侧栏---获取聊天内容列表
      selectItemHandle(index, data, chatType) {
        data.notReadNum = 0;
        if(!this.allowGetMessageList.oneAllow){
          this.$message.warning('抱歉，您没有权限获取聊天内容');
          return;
        }
        let params;
        this.chatContent = "";
        this.searchForm.chatContent = "";
        this.searchForm.startDate = "";
        this.searchForm.endDate = "";
        this.fileIds = "";
        this.fileTemp = [];
        if (chatType === 0) {
          this.page = 0;
          this.activedAll = "";
          this.activedCompany = "";
          this.activedStranger = "";
          this.searchForm = {};
          this.activedInside = index;
          this.activedChatType = chatType;
          this.activedNavTab = 1;
          this.activedItemData = data;
          this.activedName = data.newUserName;
          params = {
            userId: data.userId,
            companyId: data.companyId,
            companyName: data.companyName,
            labelValue: this.activedNavTab,
            messageType: chatType,
            name: data.userName,
            page: this.page,
            pageSize: this.pageSize,
            chatContent: this.searchForm.chatContent,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
          };
        } else if (chatType === 1) {
          this.page = 0;
          this.activedInside = "";
          this.activedStranger = "";
          this.activedAll = "";
          this.activedCompany = index;
          this.activedChatType = chatType;
          this.activedNavTab = 1;
          this.activedItemData = data;
          this.activedName = data.companyName;
          this.companyType = 4;

          params = {
            companyId: this.$store.getters.companyId,
            msgCompanyId: data.companyId,
            msgCompanyName: data.companyName,
            labelValue: this.activedNavTab,
            messageType: chatType,
            name: data.companyName,
            page: this.page,
            pageSize: this.pageSize,
            chatContent: this.searchForm.chatContent,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
          };
        }else if(chatType === 2){
          this.page = 0;
          this.activedInside = "";
          this.activedCompany = "";
          this.activedAll = "";
          this.activedStranger = index;
          this.activedChatType = 0;
          this.activedNavTab = 1;
          this.activedItemData = data;
          this.activedName = data.companyName;

          params = {
            companyId: this.$store.getters.companyId,
            labelValue: this.activedNavTab,
            messageType: 0,
            page: this.page,
            pageSize: this.pageSize,
            chatContent: this.searchForm.chatContent,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
            userId: data.userId,
          };
        }
        params.isSelectUser = true
        queryMessageList(params).then(res => {
          if (res.code === 200) {
            this.chatData = res.data.msgChatListVos;

            this.chatData.forEach(item=>{
              if(item.msgPosition == 'left'){
                if(!item.userName){
                  item.userName = '游客'+ item.userId
                }
              }
            })

            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            });
          }
        });
      },

      //右侧栏--点击tab
      selectNavTab(data) {
        let a_data = this.activedItemData;
        this.activedNavTab = data.keys;
        this.chatContent = "";
        this.page = 0;
        this.searchForm = {};
        let params;
        if (this.activedChatType === 0) {
          params = {
            userId: a_data.userId,
            companyId: a_data.companyId,
            companyName: a_data.companyName,
            labelValue: data.keys,
            messageType: this.activedChatType,
            name: a_data.userName,
            page: this.page,
            pageSize: this.pageSize,
            chatContent: this.searchForm.chatContent,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
          }
        } else if (this.activedChatType === 1) {
          params = {
            companyId: this.$store.getters.companyId,
            msgCompanyId: a_data.companyId,
            msgCompanyName: a_data.companyName,
            labelValue: data.keys,
            messageType: this.activedChatType,
            page: this.page,
            pageSize: this.pageSize,
            chatContent: this.searchForm.chatContent,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
          }
        } else {
          params = {
            messageType: 1,
            labelValue: data.keys,
            companyId: this.$store.getters.companyId,
            page: this.page,
            pageSize: this.pageSize,
          }
        }

        if(this.activedName == '全部'){
          params.messageType = '';
        }
        queryMessageList(params).then(res => {
          if (res.code == 200) {
            this.chatData = res.data.msgChatListVos;

            this.chatData.forEach(item=>{
              if(item.msgPosition == 'left'){
                if(!item.userName){
                  item.userName = '游客'+ item.userId
                }
              }
            })
            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            });
          }
        });
      },

      // 发送内容前置方法
      goSendData(){
        filterSensitiveWords({content:this.chatContent}).then(res=>{
          if(res.code === 200 && res.data && res.data.length > 0){
            this.$message.warning("为了良好的网络环境，必须保持积极、正面的信息内容!")
          }else{
            this.sendData()
          }
        })
      },

      //发送内容
      sendData() {
        if (this.chatContent == "") {
          this.$message.warning(`请输入沟通内容`);
          return
        }

        if (this.companyType == 2) {
          let params = {
            chatContent: this.chatContent,
            companyId: this.companyId,
            labelValue: this.activedNavTab,
          };
          if (this.fileIds !== "") {
            params.fileIds = this.fileIds;
          }

          let date = getNowTime()
          let data = {
            sendUserId: this.$store.getters.userId,
            sendCompanyId: this.$store.getters.companyId,
            // reciveUserId: a_data.userId,
            reciveCompanyId: this.companyId,
            sendTime: date,
            msgType: "3",
            fileIds: this.fileIds && this.fileIds != '' ? this.fileIds : undefined,
            sendText: this.chatContent
          };

          this.sendMsg(data,ev=>{
            console.log(JSON.parse(ev.data),'K线相关数据')
            if(ev.data){
              this.getUserList();
              params.page = this.page;
              params.pageSize = this.pageSize;
              params.labelValue = this.activedNavTab;
              queryMessageList(params).then(res => {
                if (res.code == 200) {
                  this.chatData = res.data.msgChatListVos;
                  this.chatData.forEach(item=>{
                    if(item.msgPosition == 'left'){
                      if(!item.userName){
                        item.userName = '游客'+ item.userId
                      }
                    }
                  })
                  this.$nextTick(() => {
                    this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
                  });
                }
              });
            }
          })

          this.fileIds = "";
          this.fileTemp = [];
          this.chatContent = "";
          let datas = {
            messageType: 1,
            companyId: this.companyId,
            page: this.page,
            pageSize: this.pageSize,
            labelValue: this.activedNavTab,
          };
          queryMessageList(datas).then(res => {
            if (res.code == 200) {
              this.chatData = res.data.msgChatListVos;
              this.$nextTick(() => {
                this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
              });
            }
          });

          // addChat(params).then(res => {
          //   if (res.code === 200) {
          //     this.fileIds = "";
          //     this.fileTemp = [];
          //     this.chatContent = "";
          //     let data = {
          //       messageType: 1,
          //       companyId: this.companyId,
          //       page: this.page,
          //       pageSize: this.pageSize,
          //       labelValue: this.activedNavTab,
          //     };
          //     queryMessageList(data).then(res => {
          //       if (res.code == 200) {
          //         this.chatData = res.data.msgChatListVos;
          //
          //         this.chatData.forEach(item=>{
          //           if(item.msgPosition == 'left'){
          //             if(!item.userName){
          //               item.userName = '游客'+ item.userId
          //             }
          //           }
          //         })
          //         this.$nextTick(() => {
          //           this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
          //         });
          //       }
          //     });
          //   }
          // })
        } else {
          let params = {
            chatContent: this.chatContent,
            page: this.page,
            pageSize: this.pageSize,
          };
          let a_data = this.activedItemData;
          if (this.activedChatType === 0) {
            params.companyId = a_data.companyId;
            params.toUserId = a_data.userId;
            if (this.fileIds !== "") {
              params.fileIds = this.fileIds;
            }
          } else if (this.activedChatType === 1) {
            params.companyId = this.$store.getters.companyId;
            params.toCompanyId = a_data.companyId;
            params.toUserId = a_data.userId;
            if (this.fileIds !== "") {
              params.fileIds = this.fileIds;
            }
          }

          let date = getNowTime()
          let data = {
            sendUserId: this.$store.getters.userId,
            sendCompanyId: this.$store.getters.companyId,
            reciveUserId: a_data.userId,
            reciveCompanyId: a_data.companyId,
            sendTime: date,
            msgType: this.companyType,
            fileIds: this.fileIds && this.fileIds != '' ? this.fileIds : undefined,
            sendText: this.chatContent
          };

          this.sendMsg(data,ev=>{
            console.log(JSON.parse(ev.data),'K线相关数据')
            if(ev.data){
              this.getUserList();
              queryMessageList(params).then(res => {
                if (res.code == 200) {
                  this.chatData = res.data.msgChatListVos;
                  this.chatData.forEach(item=>{
                    if(item.msgPosition == 'left'){
                      if(!item.userName){
                        item.userName = '游客'+ item.userId
                      }
                    }
                  })
                  this.$nextTick(() => {
                    this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
                  });
                }
              });
            }
          })

          this.chatContent = '';
          this.fileIds = "";
          this.fileTemp = [];
          this.chatContent = "";
          // let a_data = this.activedItemData;
          let a_navTab = this.activedNavTab;
          let a_chatType = this.activedChatType;
          this.page = 0;
          if (a_chatType === 0) {
            params = {
              userId: a_data.userId,
              companyId: a_data.companyId,
              companyName: a_data.companyName,
              labelValue: a_navTab,
              messageType: a_chatType,
              name: a_data.userName,
              page: this.page,
              pageSize: this.pageSize,
              chatContent: this.searchForm.chatContent,
              startDate: this.searchForm.startDate,
              endDate: this.searchForm.endDate,
            };
          } else if (a_chatType === 1) {
            params = {
              companyId: this.companyId,
              userId: a_data.userId,
              msgCompanyId: a_data.companyId,
              msgCompanyName: a_data.companyName,
              labelValue: a_navTab,
              messageType: a_chatType,
              name: a_data.companyName,
              page: this.page,
              pageSize: this.pageSize,
              chatContent: this.searchForm.chatContent,
              startDate: this.searchForm.startDate,
              endDate: this.searchForm.endDate,
            };
          }
          queryMessageList(params).then(res => {
            if (res.code == 200) {
              this.chatData = res.data.msgChatListVos;
              this.chatData.forEach(item=>{
                if(item.msgPosition == 'left'){
                  if(!item.userName){
                    item.userName = '游客'+ item.userId
                  }
                }
              })
              this.$nextTick(() => {
                this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
              });
            }
          });

          // addChat(params).then(res => {
          //   if (res.code === 200) {
          //     this.fileIds = "";
          //     this.fileTemp = [];
          //     this.chatContent = "";
          //     let params = {};
          //     let a_data = this.activedItemData;
          //     let a_navTab = this.activedNavTab;
          //     let a_chatType = this.activedChatType;
          //     this.page = 0;
          //     if (a_chatType === 0) {
          //       params = {
          //         userId: a_data.userId,
          //         companyId: a_data.companyId,
          //         companyName: a_data.companyName,
          //         labelValue: a_navTab,
          //         messageType: a_chatType,
          //         name: a_data.userName,
          //         page: this.page,
          //         pageSize: this.pageSize,
          //         chatContent: this.searchForm.chatContent,
          //         startDate: this.searchForm.startDate,
          //         endDate: this.searchForm.endDate,
          //       };
          //     } else if (a_chatType === 1) {
          //       params = {
          //         companyId: this.companyId,
          //         msgCompanyId: a_data.companyId,
          //         msgCompanyName: a_data.companyName,
          //         labelValue: a_navTab,
          //         messageType: a_chatType,
          //         name: a_data.companyName,
          //         page: this.page,
          //         pageSize: this.pageSize,
          //         chatContent: this.searchForm.chatContent,
          //         startDate: this.searchForm.startDate,
          //         endDate: this.searchForm.endDate,
          //       };
          //     }
          //
          //     queryMessageList(params).then(res => {
          //       if (res.code == 200) {
          //         this.chatData = res.data.msgChatListVos;
          //
          //         this.chatData.forEach(item=>{
          //           if(item.msgPosition == 'left'){
          //             if(!item.userName){
          //               item.userName = '游客'+ item.userId
          //             }
          //           }
          //         })
          //         this.$nextTick(() => {
          //           this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
          //         });
          //       }
          //     });
          //   }
          // });
        }
      },

      //上传文件
      fileChange(file, fileList) {
        const formData = new FormData();
        let a_data = this.activedItemData;

        if (this.companyType == 2) {
          formData.append('companyId', this.$store.getters.companyId);
          formData.append('files', file.raw);
        } else {
          formData.append('companyId', a_data.companyId);
          formData.append('files', file.raw);
        }

        if (fileList.length > 1) {
          fileList.splice(0, 1);
        }

        addChatFile(formData).then(res => {
          if (res.code === 200) {
            this.fileIds = res.data;
          }
        })
      },

      //删除图片
      handleRemove(file, fileList) {
        this.fileIds = ""
      },

      // 获取对话框高度
      getDialogHeight() {
        let mainHeight = document.getElementsByClassName('app-main')[0].clientHeight;
        const searchHeardHeight = this.$refs.searchHeard.offsetHeight;
        const searchTypeHeight = this.$refs.searchType.offsetHeight;
        const rightSearchHeardHeight = this.$refs.rightSearchHeard.offsetHeight;
        const dialogInputHeight = this.$refs.dialogInput.offsetHeight;
        let contentHeight = mainHeight - 60;
        let userListHeight = contentHeight - searchHeardHeight - searchTypeHeight;
        let chatListHeight = contentHeight - rightSearchHeardHeight - dialogInputHeight - searchHeardHeight - searchTypeHeight;
        this.contentHeight.height = contentHeight + 'px';
        this.userListHeight.height = userListHeight + 'px';
        if (this.companyType == 2) {
          this.chatListHeight.height = chatListHeight - 50 + 'px';
        } else {
          this.chatListHeight.height = chatListHeight + 'px';
        }
        window.onresize = () => {
          return (() => {
            let mainHeight = document.getElementsByClassName('app-main')[0].clientHeight;
            const searchHeardHeight = this.$refs.searchHeard.offsetHeight;
            const searchTypeHeight = this.$refs.searchType.offsetHeight;
            const rightSearchHeardHeight = this.$refs.rightSearchHeard.offsetHeight;
            const dialogInputHeight = this.$refs.dialogInput.offsetHeight;
            let contentHeight = mainHeight - 60;
            let userListHeight = contentHeight - searchHeardHeight - searchTypeHeight;
            let chatListHeight = contentHeight - rightSearchHeardHeight - dialogInputHeight - searchHeardHeight - searchTypeHeight;
            this.contentHeight.height = contentHeight + 'px';
            this.userListHeight.height = userListHeight + 'px';
            if (this.companyType == 2) {
              this.chatListHeight.height = chatListHeight - 50 + 'px';
            } else {
              this.chatListHeight.height = chatListHeight + 'px';
            }
          })()
        }
      },

      //点击查看更多
      getMore() {
        this.page += 1;
        let params;
        let a_chatType = this.activedChatType;
        let a_navTab = this.activedNavTab;
        let a_data = this.activedItemData;
        if (a_chatType === 0) {
          params = {
            userId: a_data.userId,
            companyId: a_data.companyId,
            companyName: a_data.companyName,
            labelValue: a_navTab,
            messageType: this.activedChatType,
            name: a_data.userName,
            page: this.page,
            pageSize: this.pageSize,
            chatContent: this.searchForm.chatContent,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
          }
        } else if (a_chatType === 1) {
          params = {
            companyId: a_data.companyId,
            msgCompanyId: a_data.companyId,
            msgCompanyName: a_data.companyName,
            labelValue: a_navTab,
            messageType: this.activedChatType,
            name: a_data.companyName,
            page: this.page,
            pageSize: this.pageSize,
            chatContent: this.searchForm.chatContent,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
          }
        } else {
          params = {
            companyId: this.$store.getters.companyId,
            labelValue: a_navTab,
            messageType: "",
            page: this.page,
            pageSize: this.pageSize,
          }
        }
        queryMessageList(params).then(res => {
          if (res.code == 200) {
            const dataList = JSON.parse(JSON.stringify(res.data.msgChatListVos)).reverse();
            if (dataList.length === 0) {
              this.isShowMoreNews = false
              return
            }
            if (this.chatData.length == 20) {
              dataList.forEach(item => {
                this.chatData.unshift(item)
              })
            }
            this.$nextTick(() => {
              const dialogHeight = this.$refs.dialog.clientHeight
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight / 2 - dialogHeight;
            });
          }
        });
      },

      //删除聊天
      delChat(data) {
        this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteChatById({chatId: data.chatId}).then(res => {
            if (res.code === 200) {
              this.chatData.forEach((item, index) => {
                if (data.chatId == item.chatId) {
                  this.chatData.splice(index, 1);
                }
              });
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //搜索记录
      searchChatHandle() {
        let params;
        let a_chatType = this.activedChatType;
        let a_navTab = this.activedNavTab;
        let a_data = this.activedItemData;
        if (this.companyType == 2) {
          params = {
            messageType: "",
            companyId: this.companyId,
            page: this.page,
            pageSize: 0,
            labelValue: this.activedNavTab,
            startDate: this.searchForm.startDate,
            endDate: this.searchForm.endDate,
            chatContent: this.searchForm.chatContent,
          };
        } else {
          if (a_chatType === 0) {
            params = {
              userId: a_data.userId,
              companyId: a_data.companyId,
              companyName: a_data.companyName,
              labelValue: a_navTab,
              messageType: this.activedChatType,
              name: a_data.userName,
              page: 0,
              pageSize: this.pageSize,
              chatContent: this.searchForm.chatContent,
              startDate: this.searchForm.startDate,
              endDate: this.searchForm.endDate,
            }
          } else if (this.activedChatType === 1) {
            params = {
              companyId: a_data.companyId,
              companyName: a_data.companyName,
              labelValue: a_navTab,
              messageType: this.activedChatType,
              name: a_data.companyName,
              page: 0,
              pageSize: this.pageSize,
              chatContent: this.searchForm.chatContent,
              startDate: this.searchForm.startDate,
              endDate: this.searchForm.endDate,
            }
          } else {
            params = {
              startDate: this.searchForm.startDate,
              endDate: this.searchForm.endDate,
              chatContent: this.searchForm.chatContent,
              messageType: "",
              labelValue: a_navTab,
              companyId: this.$store.getters.companyId,
              page: 0,
              pageSize: this.pageSize,
            }
          }
        }
        queryMessageList(params).then(res => {
          if (res.code == 200) {
            this.chatData = res.data.msgChatListVos;

            this.chatData.forEach(item=>{
              if(item.msgPosition == 'left'){
                if(!item.userName){
                  item.userName = '游客'+ item.userId
                }
              }
            })
          }
        });
      },

      //下载文件
      downHandle(url) {
        let urls = url.replace(/http/,'https')
        window.location.href = urls;
      },

      // 键盘回车事件
      handleKeyCode(event) {
        if(this.allowSend.oneAllow){
          if (event.keyCode == 13 && event.ctrlKey) {
            this.chatContent += "\n"; //换行
          } else if (event.keyCode == 13) {
            // this.sendData(); //提交的执行函数
            this.goSendData(); //提交的执行函数
            event.preventDefault();//禁止回车的默认换行
          }
        }else{
          this.$message.warning('抱歉，您没有此权限')
        }

      },

      searchChange(num){
        this.searchType = num;
        this.searchName = ''
        this.searchUserName = ''
      },
    },
    computed: {
      myValue() {
        return this.$store.getters.newMessage
      }
    },
    watch:{
      myValue: function(newVal, oldVal) {
        //其他业务代码
        this.getUserList();

        this.activedName = this.companyName
        this.activedAll = true;
        queryMessageList({
          messageType: 0,
          companyId: this.companyId,
          page: this.page,
          pageSize: this.pageSize,
          labelValue: 1,
          userId: newVal.sendUserId
        }).then(res => {
          if (res.code == 200) {
            this.chatData = res.data.msgChatListVos;
            this.chatData.forEach(item=>{
              if(item.msgPosition == 'left'){
                if(!item.userName){
                  item.userName = '游客'+ item.userId
                }
              }
            })

            this.getDialogHeight();
            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            });
          }
        });
      }
    },
    filters: {
      // 过滤 圈内只显示一个字
      titleSize(val) {
        if(val){
          return val.substring(0, 1);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  /*------------------*/
  .chat-list {
    padding: 0;
    background: #fff;

    .link-up-box {
      overflow-x: auto;
      overflow-y: hidden;
      /*overflow: hidden;*/

      .left-box {
        width: 40%;
        min-width: 370px;
        max-width: 370px;

        .search-head {
          /*height: 50px;*/
          display: flex;
          align-items: center;
          padding-left: 9px;
          border-bottom: 1px solid #CDEEFF;
          padding-bottom: 10px;

          .search-ipt {
            width: 200px;
            height: 36px;

            /deep/ .el-input__inner {
              height: 36px;
              border-radius: 0;
              border: 1px solid rgba(5, 170, 255, 0.7294117647058823);
              border-right: 0;
            }
          }

          .search-btn {
            height: 36px;
            color: #fff;
            border-radius: 0;
            border: 0;
            background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

            &:active {
              opacity: .5;
            }
          }

          .more-news {
            height: 36px;
            color: #fff;
            border-radius: 0;
            border: 0;
            margin-left: 15px;
            background: linear-gradient(180deg, rgba(109, 221, 129, 1) 0%, rgba(72, 212, 98, 1) 100%);

            &:active {
              opacity: .5;
            }
          }
        }

        .user-list {
          width: auto !important;
          overflow-y: auto;
          position: relative;

          /deep/ .el-collapse {
            border-top: 0;
          }

          .item {
            height: 92px;
            cursor: pointer;
            display: flex;
            padding-left: 20px;
            align-items: center;
            position: relative;

            .detail {
              display: flex;
              align-items: center;
              height: 100%;
              width: 52%;

              .user-pic {
                min-width: 50px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #37BBFF;
                color: #fff;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                margin-right: 16px;
                position: relative;
                .userName{
                  line-height: 20px;
                  text-align: center;
                  text-overflow: ellipsis;  //超出隐藏
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  font-size: 12px;
                }
                .bage {
                  width: 14px;
                  height: 14px;
                  border-radius: 50%;
                  background: #F56C6C;
                  position: absolute;
                  top: 0;
                  right: 0;
                  color: #fff;
                  font-size: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }

              }

              .name-record {
                width: 100%;
                overflow: hidden;

                .user-name {
                  font-size: 16px;
                  color: #444;
                  margin-bottom: 14px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                .user-record {
                  font-size: 12px;
                  color: rgba(68, 68, 68, 0.50);
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }

            }

            .time {
              height: 100%;
              padding-top: 25px;
              white-space: nowrap;
              font-size: 14px;
              color: rgba(68, 68, 68, 0.60);
            }

            .tip {
              position: absolute;
              right: 2px;
              top: 40px;

              .icon {
                transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                -moz-transform: rotate(90deg);
                -webkit-transform: rotate(90deg);
                -o-transform: rotate(90deg);
              }
            }
          }

          .item.top {
            background: #EBF8FF;
          }

          .item:hover {
            background: #CDEEFF;
          }

          .cur {
            background: #05AAFF !important;

            .user-pic {
              background: #fff !important;
              color: #05AAFF !important;
            }

            .user-name, .user-record, .time {
              color: #fff !important;
            }

            .icon {
              color: #fff !important;
            }

            .item:hover {
              background: #05AAFF !important;
            }

            .top {
              background: #05AAFF !important;
            }
          }

          .top {
            background: #EBF8FF;
          }

          .inside-user {
            /deep/ .el-collapse-item__header {
              height: 92px;
              padding-left: 14px;
            }

            /deep/ .el-collapse-item__content {
              padding-bottom: 0;
            }

            .inside-title {
              min-width: 50px;
              height: 50px;
              border-radius: 50%;
              background: #37BBFF;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 7px;
              margin-right: 15px;
            }

            .inside-text-name {
              font-size: 16px;
            }

            .item {
              height: 92px;
              cursor: pointer;
              display: flex;
              padding-left: 33px;
              align-items: center;
              position: relative;

              .detail {
                display: flex;
                align-items: center;
                height: 100%;
                width: 73%;

                .user-pic {
                  min-width: 50px;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  background: #37BBFF;
                  color: #fff;
                  text-align: center;
                  line-height: 50px;
                  /*display: flex;*/
                  /*align-items: center;*/
                  /*justify-content: center;*/
                  font-size: 12px;
                  margin-right: 16px;
                  position: relative;

                  .bage {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #F56C6C;
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #fff;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }

                }

                .name-record {
                  width: 100%;
                  overflow: hidden;

                  .user-name {
                    font-size: 16px;
                    color: #444;
                    margin-bottom: 10px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }

                  .user-record {
                    font-size: 12px;
                    color: rgba(68, 68, 68, 0.50);
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                }

              }

              .time {
                height: 100%;
                padding-top: 19px;
                white-space: nowrap;
                font-size: 14px;
                color: rgba(68, 68, 68, 0.60);
              }

              .tip {
                position: absolute;
                right: 2px;
                top: 40px;

                .icon {
                  transform: rotate(90deg);
                  -ms-transform: rotate(90deg);
                  -moz-transform: rotate(90deg);
                  -webkit-transform: rotate(90deg);
                  -o-transform: rotate(90deg);
                }
              }
            }

            .item.top {
              background: #EBF8FF;
            }

            .item:hover {
              background: #CDEEFF;
            }

            .cur {
              background: #05AAFF !important;

              .user-pic {
                background: #fff !important;
                color: #05AAFF !important;
              }

              .user-name, .user-record, .time {
                color: #fff !important;
              }

              .icon {
                color: #fff !important;
              }

              .item:hover {
                background: #05AAFF !important;
              }

              .top {
                background: #05AAFF !important;
              }
            }

            .top {
              background: #EBF8FF;
            }
          }
        }

        /*滚动条整体样式*/

        .user-list::-webkit-scrollbar {
          width: 8px;
          height: 1px;
        }

        /*滚动条里面小方块*/

        .user-list::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #69CCFF;
        }

        /*滚动条里面轨道*/

        .user-list::-webkit-scrollbar-track {
          border-radius: 10px;
          background: #CDEEFF;
        }
      }

      .right-box {
        width: 100%;

        .company-name {
          height: 50px;
          line-height: 50px;
          color: #444444;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          border-bottom: 1px solid #CDEEFF;
        }

        .search-heard {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 54px;
          border-bottom: 1px solid #CDEEFF;
          border-left: 1px solid #CDEEFF;

          .left {
            display: flex;
            color: rgba(68, 68, 68, 0.60);
            align-items: center;

            .tab-list {
              font-size: 14px;
              cursor: pointer;
              margin-left: 20px;
              white-space: nowrap;

              &.cur {
                color: #05AAFF;
              }
            }
          }

          .right {
            margin-right: 10px;
            display: flex;
            align-items: center;

            .chatRecord {
              width: 160px;
              border: 0;
              border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);
              margin-right: 20px;

              /deep/ .el-input__inner {
                border: 0;
                padding-right: 0;
              }
            }

            .time {
              width: 140px;
              border: 0;
              border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);

              /deep/ .el-input__inner {
                border: 0;
                padding-right: 0;
              }
            }

            .search-btn {
              width: 60px;
              height: 30px;
              color: #fff;
              padding: 0;
              background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
            }
          }
        }

        .dialog-box {
          border-left: 1px solid #CDEEFF;

          .has-more-news {
            text-align: center;
            color: #37BBFF;
            font-size: 12px;

            &.not_more {
              color: rgba(68, 68, 68, 0.50);
            }

            span {
              cursor: pointer;
            }
          }

          .dialog {
            /*height: 300px;*/
            overflow-y: auto;
            padding: 10px;

            .connect-div {

              .left-massage, .right-massage {
                margin-top: 10px;

                .title {
                  width: 50%;
                  display: flex;
                  align-items: center;

                  .pic {
                    width: 24px;
                    height: 24px;
                    background: #37BBFF;
                    color: #fff;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                  }

                  .text {
                    color: #444;
                    font-size: 14px;
                    margin: 0 10px;
                  }

                  .time {
                    color: #FFA96A;
                    font-size: 14px;
                  }

                  .del-icon {
                    cursor: pointer;
                    margin-left: 10px;
                    width: 16px;
                    display: none;
                  }

                  &:hover {
                    .del-icon {
                      display: block;
                    }
                  }
                }

                .content {
                  margin-top: 10px;
                  width: 50%;
                  color: rgba(68, 68, 68, 0.75);
                  max-width: 680px;
                  background: #EEF9FF;
                  font-size: 14px;
                  padding: 10px;
                  border-radius: 4px;

                }

                .down-content {
                  margin-top: 10px;
                  font-size: 14px;

                  .down-btn {
                    width: 70px;
                    height: 30px;
                    color: #fff;
                    cursor: pointer;
                    outline: none;
                    border: 0;
                    border-radius: 4px;
                    margin-left: 10px;
                    background: linear-gradient(180deg, #69ccff 0%, #05aaff 100%);

                    &:active {
                      opacity: .5;
                    }
                  }
                }
              }

              .right-massage {
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .title {
                  justify-content: flex-end;
                }

                .content {
                  text-align: right;
                }

                .del-icon {
                  margin-right: 10px;
                }
              }
            }

            /*滚动条整体样式*/

            &::-webkit-scrollbar {
              width: 8px;
              height: 1px;
            }

            /*滚动条里面小方块*/

            &::-webkit-scrollbar-thumb {
              border-radius: 10px;
              background: #69CCFF;
            }

            /*滚动条里面轨道*/

            &::-webkit-scrollbar-track {
              border-radius: 10px;
              background: #CDEEFF;
            }
          }

          .dialog-input {
            height: 145px;
            border: 1px solid #37BBFF;

            /deep/ .el-textarea__inner {
              border: 0;
              resize: none;
            }

            .text-input {
              height: 100px;
            }

            .btn-group {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              padding: 0 15px;

              /deep/ .el-button {
                border: 0;
              }

              .update-files-btn {
                background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
              }

              .send-tap {
                font-size: 14px;
                color: #00A5FF;
                margin-right: 10px;
              }

              .send-btn {
                background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
              }
            }
          }
        }
      }
    }


  }

  .tip-list {
    /deep/ .el-dropdown-menu__item {
      text-align: center;
    }

    /deep/ .popper__arrow {
      display: none;
    }
  }

  .upload-box {
    display: flex;
  }

  .searchType{
    display: flex;
    padding-left: 9px;
    margin-top: 10px;
    span{
      padding:7px 10px;
      border: 1px solid rgba(5, 170, 255, 0.72941176);
      border-bottom: none;
      cursor: pointer;
    }
    .active{
      background: rgba(5, 170, 255, 0.72941176);
      color:#fff;
    }
  }
</style>
