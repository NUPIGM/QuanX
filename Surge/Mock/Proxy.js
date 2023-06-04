//解析URL属性值：?sub=<url>
function queryURLParams() {
      let url = window.location.search;
      const urlSearchParams = new URLSearchParams(url);
      const params = Object.fromEntries(urlSearchParams.entries());
      return params;
    }
//提取订阅的网址
let sub = queryURLParams();
//获取订阅网址的内容
fetch(sub)
  .then(response => response.json())
  .then(data => {
    // 在这里对数据进行处理或传递到其他函数
    let result = processData(data).join("\n");
  })
  .catch(error => {
    console.error(error);
  });
  
//处理数据
function processData(data) {
  //拆分多个链接
  let base64Config = data.split("\n");
  //解码base64
  let decodedConfig = base64Config.map(base64Config =>{
    let config = base64Config.replace("vmess://","");
    const decodedConfig = atob(config);
  const jsonConfig = JSON.parse(decodedConfig);
  let strConfig = JSON.stringify(jsonConfig).replace(/[{}"]/g, "").replace(/:/g,"=")
  })
  return strConfig;
}
    //将脚本放在末尾，确保DOM已加载
    document.getElementById('output').innerHTML = "我是一个粉刷匠";

