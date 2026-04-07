
$httpClient.post(request,function (error,response,data) {
  
})

function input(name) {
  let rawData = $persistentStore.read("CheckinData");
  if (!rawData) {
    rawData = "{}";
    $persistentStore.write(rawData, "CheckinData"); //第一步初始化
  }
  let store = JSON.parse(rawData);
  if (!store[name]) {
    store[name] = {
      user: "",
      cookie: "",
      updateTime: "",
    };
    $persistentStore.write(store, "CheckinData"); //第二步初始化
  }
  const params = new URLSearchParams($argument);
  const config_Json = Object.fromEntries(params) || store[name];
  return config_Json || $done();
}