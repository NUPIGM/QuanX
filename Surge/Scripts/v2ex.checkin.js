fetch("https://www.v2ex.com/mission/daily/redeem?once=94410", {
  "cache": "default",
  "credentials": "include",
  "headers": {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Priority": "u=0, i",
    "Cookie":"",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Safari/605.1.15"
  },
  "method": "GET",
  "mode": "cors",
  "redirect": "follow",
  "referrer": "https://www.v2ex.com/mission/daily/redeem",
  "referrerPolicy": "strict-origin-when-cross-origin"
}).then((res)=>{
  console.log(res.text())
})