// const fs = require('fs');
// const https = require('https');

// const file = fs.createWriteStream("dream11.apk");
// const request = https.get("https://d8.freeterabox.com/file/d2886153c589585f8e904c3405f8976d?bkt=en-e031c0692dcd5a217a14c34c378b9076155c7214f94dc0967d6babc4a354e0b847be2ab48e59bfc6&xcode=e05e4884036962ad3df475747ef35a6b2cc224fc4b2beee7f0a42ef2f4429fea6c8d89f9d95754e71dee2fc54f7676e30b2977702d3e6764&fid=4401431305631-250528-914838764921454&time=1718631006&sign=FDTAXUGERQlBHSKfon-DCb740ccc5511e5e8fedcff06b081203-F1aSSonapp%2BNUiJSx6jlU0Z0nz0%3D&signbak=&to=d8&size=50648354&sta_dx=50648354&sta_cs=11&sta_ft=apk&sta_ct=3&sta_mt=3&fm2=MH%2Cjapan%2CAnywhere%2C%2CS2FybmF0YWth%2Cany&region=japan&ctime=1718010061&mtime=1718010061&resv0=-1&resv1=0&resv2=rlim&resv3=5&resv4=50648354&vuk=4401431305631&iv=2&htype=&randtype=&newver=1&newfm=1&secfm=1&flow_ver=3&pkey=en-b6edde5e13fc9db279167bd48674f42cecbe18b4bf104fe5c179424fba437cb06217c07fc0b9c97b&expires=1718659806&rt=sh&r=430461239&sh=1&vbdid=-&fin=dream11_1.apk&rtype=1&dp-logid=458408100540626577&dp-callid=0.1&hps=1&tsl=0&csl=0&fsl=-1&csign=wDK9sAh6CCYns2WO4Xwz5HPk0KQ%3D&so=0&ut=1&uter=4&serv=0&uc=2630049532&ti=14a3010384c1ca3c7219debd39395cf48528368f03a5ce7b305a5e1275657320&ogr=0&rregion=&adg=&reqlabel=250528_f_0a08858edf09f3bd204479903b171e49_-1_c932d88a89849177449823a1eab3af61&ccn=IN&by=themis", function(response) {
//   response.pipe(file);
// });





const fs = require('fs');
const https = require('https');
const axios = require('axios');
require('dotenv').config();
const fileUrl = 'https://d.terabox.app/file/059b93c92b30225d8413434e8df84ca8?fid=4401431305631-250528-1114325265342709&dstime=1718642167&rt=sh&sign=FDtAER-DCb740ccc5511e5e8fedcff06b081203-1DwrJumrmsow%2Bjyb01HQD50fzfk%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=461404363908172582&dp-callid=0&r=186814562&sh=1&region=jp';

const file_name = "myPersonalVideo.mkv"

axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      "Connection": "keep-alive",
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": process.env.COOKIE,
    },
    maxRedirects: 5, // This will follow up to 5 redirects
    maxContentLength: Infinity, // Set to Infinity to handle large responses
    maxBodyLength: Infinity ,
  }).then(function (response) {
    const writer = fs.createWriteStream(file_name);
    response.data.pipe(writer);
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }).then(() => {
    console.log('Download completed.');
  }).catch((err) => {
    console.error(err);
  });
  
  
  