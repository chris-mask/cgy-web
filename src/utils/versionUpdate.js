/*
* 版本更新方法
* 作者；令溪
* */
import Vue from 'vue';
// import ajax from "element-ui/packages/upload/src/ajax";
import versionJson  from '../../static/version'
import axios from 'axios'

const vm = new Vue();
const isNewVersion = () => {
  // let url
  // if(process.env.NODE_ENV === 'production'){
  //   url = `//${ window.location.host }/admin/static/version.json`;
  // }else{
  //   url = `//${ window.location.host }/static/version.json`;
  // }

  // axios.get(url).then(res=>{
    let version = versionJson.version;
    let localVersion = localStorage.getItem('version');
    if (!localVersion || (localVersion && localVersion != version)) {
      // if (confirm("系统检测到有新版本，是否更新？")) {
      //   localStorage.setItem('version', res.data.version);
      //   window.location.reload();
      //   return;
      // }
      localStorage.setItem('version', version);
      window.location.reload();
      return;
    }else {
      localStorage.setItem('version', version);
    }
  // })
};
export default {
  isNewVersion
}
