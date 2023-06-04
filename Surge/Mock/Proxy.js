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
    processData(data);
  })
  .catch(error => {
    console.error(error);
  });
//将数据进行base64解析
function processData(data) {
  const base64Config = data.split('vmess://');
  for(let config in base64Config){
    const decodedConfig = atob(config);
  const jsonConfig = JSON.parse(decodedConfig);
    }
}


    // 将脚本放在末尾，确保DOM已加载
    document.getElementById('output').innerHTML = a;

