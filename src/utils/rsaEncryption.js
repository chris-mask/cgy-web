/*
* 对称加密方法，用于生成公私钥
* 作者： 李馥池
* */
import JsEncrypt from 'encryptlong'
import NodeRSA from 'node-rsa'
import store from '../store'
import {Base64} from 'js-base64'

//生成公私钥
function createKey(){
  const key = new NodeRSA({ b: 1024 }); //生成2048位的密钥
  let publicDer = key.exportKey("pkcs8-public-pem");  //公钥
  let privateDer = key.exportKey("pkcs8-private-pem");//私钥


  store.commit('SET_PUBLICDER', publicDer)
  store.commit('SET_PRIVATEDER', privateDer)
}

//实例化JSEncrypt key: 公钥
let jse = new JsEncrypt();
//Rsa加密
function getRsaEncryption(str,key){
  //加密公钥
  jse.setPublicKey(key);
  let data = jse.encryptLong(str.toString());  // 进行加密
  return data;
}

//Rsa解密 key: 秘钥
function getRsaDecrypt (password, key){
  console.log('www', jse.decryptLong(password))
  //私钥
  jse.setPrivateKey(key);
  // 加密内容
  let decrypt = jse.decryptLong(password);
  return decrypt
}

export default {
  createKey,
  getRsaEncryption,
  getRsaDecrypt,
}
