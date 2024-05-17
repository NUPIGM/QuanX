//打开 iqiyi.com -> 我的 -> 会员中心
//boxjs订阅：https://github.com/NUPIGM/QuanX/raw/main/Boxjs/cookies.boxjs.json
//^https:\/\/cashier\.iqiyi\.com\/cashier\/cashier\/cashier\.html$

const cookieName = "爱奇艺";
const tokenKey = "iqiyiCookie";
let chavy = init();

const requrl = $request.url;
if (
  $request &&
  requrl.match(/\/cashier\/cashier\/cashier\.html\?s3\=personal\_center\_vip\&/)
) {
  const CKA = $request.headers["Cookie"] || $request.headers["cookie"];
  let iQIYI =
    CKA &&
    CKA.includes("P00001=") &&
    CKA.includes("P00003=") &&
    CKA.includes("__dfp=") &&
    CKA;
  if (CKA && iQIYI) {
    chavy.setdata(iQIYI, tokenKey);
    chavy.msg(cookieName, `获取Cookie: 成功`, ``);
    console.log("获取Cookie: 成功");
  } else {
    console.log("用户未登录");
  }
} else {
  console.log("重写地址与脚本不匹配，可能是美团地址变更，联系作者更新。");
}

function init() {
  const isRequest = typeof $request != "undefined";
  const isSurge = typeof $httpClient != "undefined";
  const isQuanX = typeof $task != "undefined";
  const isLoon = typeof $loon != "undefined";
  const isJSBox = typeof $app != "undefined" && typeof $http != "undefined";
  const isNode = typeof require == "function" && !isJSBox;
  const node = (() => {
    if (isNode) {
      const request = require("request");
      return {
        request,
      };
    } else {
      return null;
    }
  })();
  let getdata = (key) => {
    if (isSurge) return $persistentStore.read(key);
    if (isQuanX) return $prefs.valueForKey(key);
  };
  let setdata = (val, key) => {
    if (isSurge) return $persistentStore.write(val, key);
    if (isQuanX) return $prefs.setValueForKey(val, key);
  };
  let msg = (title, subtitle, body) => {
    if (isSurge) $notification.post(title, subtitle, body);
    if (isQuanX) $notify(title, subtitle, body);
  };
  let log = (message) => console.log(message);
  let get = (url, cb) => {
    if (isSurge) {
      $httpClient.get(url, cb);
    }
    if (isQuanX) {
      url.method = "GET";
      $task.fetch(url).then((resp) => cb(null, {}, resp.body));
    }
  };
  let post = (url, cb) => {
    if (isSurge) {
      $httpClient.post(url, cb);
    }
    if (isQuanX) {
      url.method = "POST";
      $task.fetch(url).then((resp) => cb(null, {}, resp.body));
    }
  };
  let done = (value = {}) => {
    $done(value);
  };
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done };
}
chavy.done();
