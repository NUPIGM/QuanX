
//打开 i.meituan.com -> 我的 -> 我的优惠券
//修改自chavy

const cookieName = '美团'
const tokenKey = 'meituanCookie'
const chavy = init()

const requrl = $request.url
if ($request && $request.method != 'OPTIONS' && requrl.match(/\/mttouch\/page\/magiccard\//)) {
  const cookieVal = $request.headers[Cookie];
  const token = jsonObj(cookieVal).token
  if (cookieVal) chavy.setdata(tokenKey, token)
  chavy.msg(cookieName, `获取Cookie: 成功`, ``)
}

function split(cookie) {
  // 使用正则表达式匹配键值对，并以分号为分隔符拆分字符串
  const cookie = str.split(';');
  // 初始化一个空的对象，用于存储键值对
  let jsonObj = {};
  // 遍历键值对数组
  cookie.forEach(pair => {
    // 使用正则表达式匹配键和值
    let match = pair.match(/([^=]+)=(.*)/);
    if (match) {
      // 将键值对存储到 JSON 对象中
      let key = match[1].trim();
      let value = match[2].trim();
      jsonObj[key] = value;
    }
  });
  return jsonObj

}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
chavy.done()