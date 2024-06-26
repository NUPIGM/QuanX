//打开 i.meituan.com -> 我的 -> 我的优惠券
//boxjs订阅：https://github.com/NUPIGM/QuanX/raw/main/Boxjs/cookies.boxjs.json
//修改自chavy

const cookieName = "美团";
const tokenKey = "meituanCookie";
const chavy = init();

const requrl = $request.url;
if (
  $request &&
  $request.method != "OPTIONS" &&
  requrl.match(/\/mttouch\/page\/magiccard/)
) {
  const cookieVal = $request.headers["Cookie"] || $request.headers["cookie"];
  const token = split(cookieVal)?.token;
  const userId = split(cookieVal)?.userId;
  if (token) {
    chavy.setdata(token, tokenKey);
    chavy.msg("用户:" + userId, `获取Cookie: 成功`, ``);
    console.log("获取Cookie: 成功");
  } else {
    console.log("用户未登录");
  }
} else {
  console.log("重写地址与脚本不匹配，可能是美团地址变更，联系作者更新。");
}

function split(str) {
  // 使用正则表达式匹配键值对，并以分号为分隔符拆分字符串
  if (typeof str == "string") {

    console.log(typeof str);
    let cookie = str.split(";");
    // 初始化一个空的对象，用于存储键值对
    let jsonObj = {};
    // 遍历键值对数组
    cookie.forEach((pair) => {
      // 使用正则表达式匹配键和值
      let match = pair.match(/([^=]+)=(.*)/);
      if (match) {
        // 将键值对存储到 JSON 对象中
        let key = match[1].trim();
        let value = match[2].trim();
        jsonObj[key] = value;
      }
    });

    return jsonObj;
  } else {
    console.log("cookie有误")
    return {}
  }
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
