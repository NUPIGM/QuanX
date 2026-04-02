const config = input("gladosCheckin");
const request = {
  url:"https://glados.cloud/api/user/checkin",
  body: '{"token":"glados.cloud"}',
  cache: "default",
  credentials: "include",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json;charset=utf-8",
    Pragma: "no-cache",
    Priority: "u=3, i",
    Cookie: config.cookie,
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Safari/605.1.15",
  },
  method: "POST",
  mode: "cors",
  redirect: "follow",
  referrerPolicy: "no-referrer",
};
$httpClient.post(request, function (error, response, data) {
  if (error) {
    console.log("签到失败: " + error);
  } else {
    data = JSON.parse(data);
    console.log(data);
    $notification.post("glados 签到", data.message, data.list[0].change.toFixed(2));
  }
  $done();
});
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
/**
{
  "code": 1,
  "points": 0,
  "message": "Today's observation logged. Return tomorrow for more points.",
  "list": [{
    "id": 134744523,
    "user_id": 697732,
    "time": 1775062349709,
    "asset": "points",
    "business": "system:checkin",
    "change": "11.00000000",
    "balance": "21.0000000000000000",
    "detail": "2026-04-02"
  }, {
    "id": 134742277,
    "user_id": 697732,
    "time": 1775055722356,
    "asset": "points",
    "business": "system:checkin",
    "change": "10.00000000",
    "balance": "10.0000000000000000",
    "detail": "2026-04-01"
  }]
}
*/
