const token = $argument
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
    data = JSON.parse(data);
    $notification.post("vps789", "签到", data.message)
    $done(data);
  }
);
// {
//   "code" : 0,
//   "count" : 0,
//   "message" : "今日已经签到过了~"
// }