let rawData = $persistentStore.read("CheckinData") || "{}";
let store = JSON.parse(rawData);

// 找到最长的 key
const maxLength = Math.max(...Object.keys(store).map(k => k.length));

let txt = "";
const formatter = new Intl.DateTimeFormat("zh-CN", {
  month: "2-digit",
  day: "2-digit",
});

Object.entries(store).forEach(([key, value]) => {
  // 使用 padEnd 补齐空格
  key+= "："
  const paddedKey = key.padEnd(maxLength);
  txt += paddedKey  + (value.updateTime == formatter.format(new Date())?"✅":"❌") + "\n";
});

$done({
  title: "签到状态",
  content: txt,
  icon: "checkmark.seal.fill",
});