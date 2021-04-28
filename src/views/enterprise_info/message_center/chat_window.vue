<template>
  <!--右边-->
  <div class="right-box" ref="rightBox">
    <!--导航、搜索栏-->
    <div class="search-heard" ref="rightSearchHeard">
      <div class="left">
        <div :class="activedNavTab=== item.key?'tab-list cur':'tab-list'"
             v-for="item in rightNavTab"
             :key="item.key"
             @click="selectNavTab(item)"
        >
          {{item.name}}
        </div>
      </div>
      <div class="right">
        <el-input v-model="searchForm.chatContent" class="chatRecord" placeholder="搜索记录"
                  @keyup.enter.native="getChatList"></el-input>
        <el-date-picker v-model="searchForm.startDate" class="time" type="date" placeholder="开始日期"
                        value-format="yyyy-MM-dd"></el-date-picker>
        至
        <el-date-picker v-model="searchForm.endDate" class="time" type="date" placeholder="结束日期"
                        value-format="yyyy-MM-dd"></el-date-picker>
        <el-button class="filter-item search-btn" @click="getChatList">搜索</el-button>
      </div>
    </div>

    <!--对话窗口-->
    <div class="dialog-box">
      <div class="dialog" ref="dialog">
        <div class="has-more-news" v-if="isShowMoreNews" @click="getMore"><span>查看更多消息</span></div>
        <div class="has-more-news not_more" v-else>没有多消息了</div>
        <div class="connect-div">
          <template v-for="item in chatData">
            <div class="left-massage" v-if="item.msgPosition === 'left'">
              <div class="title">
                <div class="pic">{{item.userName|titleSize}}</div>
                <div class="text">{{item.userName}}</div>
                <div class="time">{{item.sendTime}}</div>
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
                <img class="del-icon" :src="del_icon" @click="delChat(item)"/>
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

      <div class="dialog-input" ref="dialogInput">
        <el-input
          autofocus="true"
          class="text-input"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="输入沟通内容..."
          v-model="chatContent"
          @keydown.native="handleKeyCode($event)"
        >
        </el-input>
        <div class="btn-group">
          <div slot="footer" class="dialog-footer">
            <el-upload action="#"
                       class="upload-box upload-box-width"
                       :auto-upload="false"
                       :file-list="fileTemp"
                       :on-remove="handleRemove"
                       :on-change="fileChange"
            >
              <el-button type="info" class="update-files-btn">附件上传<i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </div>
          <div>
            <span class="send-tap">Enter发送，Ctrl+Enter换行</span>
            <el-button class="send-btn" type="primary" @click="sendData">发 送</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {queryMessageList, addChat, addChatFile, deleteChatById} from '@/api/messageCenter'
  import {getNowTime} from '@/utils/auth'
  import del_icon from '../../../../static/del_icon.png'

  export default {
    data() {
      return {
        //删除ICON
        del_icon,
        //右侧栏---当前选中tab
        activedNavTab: 1,
        //搜索字段
        searchForm: {
          companyId: "",
          chatContent: "",
          startDate: "",
          endDate: "",
          page: 0,
          pageSize: 10,
          labelValue: 1,
        },

        //右侧栏---沟通框
        chatContent: "",

        //对话窗口数据
        chatData: [],

        // 判断是否显示查看更多
        isShowMoreNews: true,

        //文件上传参数
        fileTemp: [],
        fileIds: "",

        //消息范围
        rightNavTab: [
          {key: 1, name: "全部"},
          {key: 2, name: "客户消息"},
          {key: 3, name: "内部消息"},
          {key: 4, name: "我的消息"},
        ],

      }
    },
    props: {
      id: {
        type: String
      }
    },
    mounted() {
      this.getChatList();
    },
    methods: {
      //获取聊天数据
      getChatList() {
        this.searchForm.page = 0;
        this.searchForm.companyId = this.id;
        queryMessageList(this.searchForm).then(res => {
          if (res.code === 200) {
            this.chatData = res.data.msgChatListVos;
            // console.log(this.chatData);
            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            })
          }
        })
      },
      //发送信息
      sendData() {
        if (this.chatContent == "") {
          this.$message.warning(`请输入沟通内容`);
          return
        }
        let params = {
          chatContent: this.chatContent,
          toCompanyId: this.id,
          companyId:this.$store.getters.companyId
        };
        if (this.fileIds !== "") {
          params.fileIds = this.fileIds;
        }

        let date = getNowTime()
        let data = {
          sendUserId: this.$store.getters.userId,
          sendCompanyId: this.$store.getters.companyId,
          // reciveUserId: this.toUserId,
          reciveCompanyId: this.id,
          sendTime: date,
          msgType: "3",
          fileIds: this.fileIds && this.fileIds != '' ? this.fileIds : undefined,
          sendText: this.chatContent
        };

        this.sendMsg(data,ev=>{
          console.log(JSON.parse(ev.data),'K线相关数据')
          if(ev.data){
            this.fileTemp = [];
            this.fileIds = "";
            this.chatContent = "";
            this.getChatList();
            this.$nextTick(() => {
              this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
            });
          }
        })

        this.fileTemp = [];
        this.fileIds = "";
        this.chatContent = "";
        this.getChatList();
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight;
        });

        // addChat(params).then(res => {
        //   if (res.code === 200) {
        //     this.fileTemp = [];
        //     this.fileIds = "";
        //     this.chatContent = "";
        //     this.getChatList();
        //   }
        // })
      },
      //点击查看更多
      getMore() {
        this.searchForm.page += 1;
        queryMessageList(this.searchForm).then(res => {
          if (res.code === 200) {
            if (res.data.msgChatListVos.length !== 0) {
              let dataList = JSON.parse(JSON.stringify(res.data.msgChatListVos)).reverse();
              dataList.forEach(item => {
                this.chatData.unshift(item)
                this.$nextTick(() => {
                  const dialogHeight = this.$refs.dialog.clientHeight;
                  this.$refs.dialog.scrollTop = this.$refs.dialog.scrollHeight / 2 + dialogHeight;
                });
              })
            } else {
              //  console.log('=====isShowMoreNews=======>')
              this.isShowMoreNews = false;
            }
          }
        })
      },
      // 键盘回车事件
      handleKeyCode(event) {
        if (event.keyCode == 13 && event.ctrlKey) {
          this.chatContent += "\n"; //换行
        } else if (event.keyCode == 13) {
          this.sendData(); //提交的执行函数
          event.preventDefault();//禁止回车的默认换行
        }
      },

      //上传文件
      fileChange(file, fileList) {
        const formData = new FormData();

        formData.append('companyId', this.id);
        formData.append('files', file.raw);

        if (fileList.length > 1) {
          fileList.splice(0, 1);
        }

        addChatFile(formData).then(res => {
          if (res.code === 200) {
            this.fileIds = res.data;
          }
        })
      },

      //删除文件
      handleRemove(file, fileList) {
        this.fileIds = ""
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
      //下载文件
      downHandle(url) {
        window.location.href = url;
      },
      //点击tab
      selectNavTab(data) {
        this.activedNavTab = data.key;
        this.searchForm.page = 0;
        this.searchForm.labelValue = data.key;
        this.getChatList();
      }
    },
    filters: {
      // 过滤 圈内只显示一个字
      titleSize(val) {
        return val.substring(0, 1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .right-box {
    width: 100%;
    margin-top: 2px;
    border: 1px solid #CDEEFF;

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
        height: 400px;
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

  .upload-box {
    display: flex;
  }
</style>
