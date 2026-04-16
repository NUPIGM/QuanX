let rawData = $persistentStore.read("CheckinData") || "{}";
let store = JSON.parse(rawData);

let txt = "";
const formatter = new Intl.DateTimeFormat("zh-CN", {
  month: "2-digit",
  day: "2-digit",
});
// 遍历 store 对象
Object.entries(store).forEach(([key, value]) => {
  txt += key + "：" + (value.updateTime == formatter.format(new Date()))+ "/n";
});
$done({
  title: 签到状态,
  content: txt,
  icon: checkmark.seal.fill,
});
