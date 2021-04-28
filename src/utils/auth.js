import Cookies from 'js-cookie'
import store from './../store'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//权限判断
export function authorityControl(code,sonCode,grandCode,lastCode) {
  const navList = store.getters.navList;
  let theData = '';
  navList.forEach(item=>{
    if(item.permissionCode == code){
      let data = {
        isModel: true
      };
      item.child.forEach(list=>{
        if(list.permissionCode == sonCode){
          data.path = list.webUrl;
          data.oneAllow = true;
          theData = data
          if(list.child && list.child != ''){
            list.child.forEach(res=>{
              if(res.permissionCode == grandCode){
                // data.grandFnc = true
                data.twoAllow = true
                theData = data
                if(res.child && res.child != ''){
                  res.child.forEach(items=>{
                    if(items.permissionCode == lastCode){
                      // data.lastBtn = true;
                      data.threeAllow = true;
                      theData = data
                    }
                  })
                }
              }
            })
          }
        }
      })
    }

  });
  //1-isModel 2-oneAllow 3-twoAllow 4-threeAllow
  return theData
}

//计算两个日期时间差，天 小时 分 秒格式
export function diffTime(startDate,endDate,useName){
  startDate= new Date(startDate);
  endDate = new Date(endDate);
  let diff=endDate.getTime() - startDate.getTime();//时间差的毫秒数

  //计算出相差天数
  let days=Math.floor(diff/(24*3600*1000));

  //计算出小时数
  let leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数
  let hours=Math.floor(leave1/(3600*1000));
  //计算相差分钟数
  let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
  let minutes=Math.floor(leave2/(60*1000));

  //计算相差秒数
  let leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
  let seconds=Math.round(leave3/1000);

  // let returnStr = seconds + "秒";
  let returnStr = '';

  if(useName != 'dashboard'){
    if(minutes>0) {
      returnStr = minutes + "分" + returnStr;
    }
    if(hours>0) {
      returnStr = hours + "小时" + returnStr;
    }
    if(days>0) {
      returnStr = days + "天" + returnStr;
    }
    if(seconds <= 0 ){
      returnStr = 0 + '天';
    }
  }else{
    if(minutes>0) {
      returnStr = minutes + "分" + returnStr;
    }
    if(hours>0) {
      returnStr = hours + "小时" + returnStr;
    }
    if(days>0) {
      returnStr = days + "天" + returnStr;
    }

    if(minutes<0) {
      minutes = JSON.stringify(minutes+1)
      minutes = minutes.replace("-","");
      returnStr = minutes + "分" + returnStr;
    }
    if(hours<0) {
      hours = JSON.stringify(hours+1)
      hours = hours.replace("-","");
      returnStr = hours + "小时" + returnStr;
    }
    if(days<0) {
      days = JSON.stringify(days+1)
      days = days.replace("-","");
      returnStr = days + "天" + returnStr;
    }
  }


  return returnStr;
}

//日期格式化  YY-MM-DD
export function transferDate(date) {

  // 年
  let year = date.getFullYear();
  // 月
  let month = date.getMonth() + 1;
  // 日
  let day = date.getDate();

  if (month >= 1 && month <= 9) {

    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {

    day = "0" + day;
  }

  let dateString = year + '-' + month + '-' + day;

  return dateString;
}

//获取本周日期
export function getThisWeek() {
  // 按周日为一周的最后一天计算
  let date = new Date();

  // 今天是这周的第几天
  let today = date.getDay();

  //上周日距离今天的天数（负数表示）
  let stepSunDay = -today + 1;

  // 如果今天是周日
  if (today == 0) {
    stepSunDay = -7;
  };

  // 周一距离今天的天数（负数表示）

  let stepMonday = 7 - today;

  let time = date.getTime();

  let monday = new Date(time + stepSunDay * 24 * 3600 * 1000);

  let sunday = new Date(time + stepMonday * 24 * 3600 * 1000);

  // 本周一的日期 （起始日期）
  let startDate = transferDate(monday); // 日期变换 2018-11-10

  // 本周日的日期 （结束日期）
  let endDate = transferDate(sunday); // 日期变换  2018-11-10

  let arr = [];
  arr.push(startDate)
  arr.push(endDate)

  return arr;
}

//获取上周日期
export function getLastWeek(){
  let now = new Date(); //当前日期
  let nowDayOfWeek = now.getDay(); //今天本周的第几天
  let nowDay = now.getDate(); //当前日
  let nowMonth = now.getMonth(); //当前月
  let nowYear = now.getFullYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  let weekStartDate = transferDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6));
  let weekEndDate = transferDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek));

  let arr = [];
  arr.push(weekStartDate)
  arr.push(weekEndDate)

  return arr
}

//获取本月日期
export function getThisMonth(){
  let now = new Date(); //当前日期
  let nowMonth = now.getMonth(); //当前月
  let nowYear = now.getFullYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  //获得某月的天数
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  var monthEndDate = new Date(nowYear, nowMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);

  var monthThisStartDate = transferDate(new Date(nowYear, nowMonth, 1));
  var monthThisEndDate = transferDate(new Date(nowYear, nowMonth, days));

  let arr = [];
  arr.push(monthThisStartDate);
  arr.push(monthThisEndDate);

  return arr
}

//获取上月日期
export function getLastMonth(){
  let now = new Date(); //当前日期
  let nowMonth = now.getMonth(); //当前月
  let nowYear = now.getFullYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //

  var lastMonthDate = new Date(); //上月日期
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  var lastMonth = lastMonthDate.getMonth();

  //获得某月的天数
  var monthStartDate = new Date(nowYear, lastMonth, 1);
  var monthEndDate = new Date(nowYear, lastMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);

  var lastMonthStartDate = transferDate(new Date(nowYear, lastMonth, 1));
  var lastMonthEndDate = transferDate(new Date(nowYear, lastMonth, days));

  let arr = [];
  arr.push(lastMonthStartDate);
  arr.push(lastMonthEndDate);

  return arr
}

//获取今天日期
export function getToday(){
  var day = new Date();
  day.setTime(day.getTime());
  let todayStart = transferDate(day)
  let todayEnd = transferDate(day)

  let arr = [];
  arr.push(todayStart);
  arr.push(todayEnd);

  return arr
}

//获取昨天日期
export function getYesterday(){
  var day = new Date();
  day.setTime(day.getTime()-24*60*60*1000);
  let todayStart = transferDate(day)
  let todayEnd = transferDate(day)

  let arr = [];
  arr.push(todayStart);
  arr.push(todayEnd);

  return arr
}


/**
 * 判断按钮是否显示
 * @param _this
 * @param to_auth_btn edit/delete/create/或者其他定义在菜单里面的path值
 * @param current_url 默认不填是/list，如果定义了其他路径就填其他路径
 * @returns {boolean}
 */
export const queryAuth = (_this, to_auth_btn, current_url) => {
  if (current_url === null) {
    current_url = '/list'
  }
  const pagePath = _this.$store.state.pagePath
  let authMenu = ''
  if (current_url !== '/list') {
    authMenu = current_url.replace('/list', '') + '/' + to_auth_btn
  } else {
    authMenu = pagePath.replace(current_url, '') + '/' + to_auth_btn
  }
  if (_this.$store.getters.authMenus[authMenu]) {
    if (_this.$store.getters.authMenus[authMenu].authed === true) {
      return true
    }
  }
  return false
}

//获取今天日期时间
export function getNowTime(){
  let dateTime
  let yy = new Date().getFullYear()
  let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
  let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
  let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
  let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
  let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
  dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
  return dateTime;
}
