const token = $argument || $done()
const signin = new Promise((resolve, reject) => {
  $httpClient.get(
    {
      url: "https://vps789.com/user/signin",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "yf-token": token,
      },
      timeout: 5,
    },
    (error, response, data) => {
      if (error) {
        console.log("签到失败");
        reject("签到失败, 详情查看日志");
      } else {
        data = JSON.parse(data);
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
// {
//   "code" : 0,
//   "count" : 0,
//   "message" : "今日已经签到过了~"
// }
