/*
* OSS文件上传公共方法
* */
let OSS = require('ali-oss')

var client = new OSS({
  accessKeyId: 'LTAI4FfimpNszv46oBxR51jk',
  accessKeySecret: '2SxfRFa54cZvFFeWQGw4ua6AikrkMx',
  bucket: 'chengguoyun-java',
  region: 'oss-cn-shenzhen',
  secure:true
});

export const uploadFilesOss = async (ObjName, flieUrl,option) => {
  // try {
  //   // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
  //   let result = await client.put(ObjName, flieUrl);
  //   return result
  // } catch (e) {
  //   console.log(e);
  // }
  try {
    // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。+
    // await client.putACL(ObjName, 'private');
    // let result = await client.getACL(ObjName);
    // console.log('www',result);
    let result = await client.multipartUpload(ObjName, flieUrl, {
      headers: { 'x-oss-forbid-overwrite': true },
      progress: async function (p) {
        let e = {}
        e.percent = p * 100
        option.onProgress(e)
      }
    })

    return result
  } catch(e){
    console.log(e);
  }
}
