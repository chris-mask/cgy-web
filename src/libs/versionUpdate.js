import Vue from 'vue';
import axios from 'axios'

const vm = new Vue();
const isNewVersion = () => {
  let url = `//${window.location.host}/static/version.json?t=${new Date().getTime()}`;
  if (process.env.NODE_ENV === 'production') {
    url = `//${window.location.host}/admin/static/version.json?t=${new Date().getTime()}`;
  }
  axios.get(url).then(res => {
    if (res.status === 200) {
      let vueVersion = res.data.version;
      let localVueVersion = localStorage.getItem('vueVersion');
      if (localVueVersion && localVueVersion != vueVersion) {
        localStorage.setItem('vueVersion', vueVersion);
        window.location.reload();
        return;
      } else {
        localStorage.setItem('vueVersion', vueVersion);
      }
    }
  });
}

export default {
  isNewVersion
}
