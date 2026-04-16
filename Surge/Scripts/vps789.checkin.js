const config = input("vps789");
const signin = new Promise((resolve, reject) => {
  $httpClient.get(
    {
      url: "https://vps789.com/user/signin",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "yf-token": config.token,
      },
      timeout: 5,
    },
    (error, response, data) => {
      if (error) {
        console.log("签到失败");
        reject("签到失败, 详情查看日志");
      } else {
        data = JSON.parse(data);
        writeStatus("vps789")
        resolve(data);
      }
    },
  );
});
const info = new Promise((resolve, reject) => {
  $httpClient.get(
    {
      url: "https://vps789.com/user/userInfo",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "yf-token": token,
      },
      timeout: 5,
    },
    (error, response, data) => {
      if (error) {
        console.log("获取信息失败");
        reject("获取信息失败, 详情查看日志");
      } else {
        data = JSON.parse(data);
        resolve(data);
      }
    },
  );
});
Promise.all([signin, info]).then(([signin,info]) => {
  $notification.post("vps789", "签到", signin.message + "总积分:" + info.data.score);
  $done();
});
function writeStatus(name) {
      const formatter = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
      });
      //把更新日期写入储存中
      let store = $persistentStore.read("CheckinData");
      store = JSON.parse(store);
      store[name].updateTime = formatter.format(new Date());
      $persistentStore.write(store, "CheckinData");
}
/**
 *
 * @param {string} name 脚本名
 * @returns config json
 */
function input(name) {
  let rawData = $persistentStore.read("CheckinData");
  if (!rawData) {
    rawData = "{}";
    $persistentStore.write(rawData, "CheckinData"); //第一步初始化
  }
  let store = JSON.parse(rawData);
  if (!store[name]) {
    store[name] = {
      cookie: "",
      updateTime: "",
    };
    $persistentStore.write(store, "CheckinData"); //第二步初始化
  }
const params = new URLSearchParams($argument);
const config_Json = Object.fromEntries(params) || store[name];
  return config_Json || $done();
}
// {
//   "code" : 0,
//   "count" : 0,
//   "message" : "今日已经签到过了~"
// }
