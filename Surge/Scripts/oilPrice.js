// @ts-nocheck
/*
[Panel]
oilPrice = script-name=oilPrice,update-interval=43200
[Script]
oilPrice = type=generic,timeout=5,script-path=https://github.com/NUPIGM/QuanX/raw/main/Surge/Scripts/oilPrice.js
*/

const input =
  $argument ||
  $persistentStore.read("oilPrice") ||
  "title=油价信息⬇&location=fujian/fuzhou&type=92,95&isFriendlyTips=true&isShowGold=true";

const params = input.split("&");
let locate = {
  title: "实时油价信息",
  location: "shanxi-3/xian",
  type: "92,95,98,0",
  icon: "fuelpump.fill",
  isFriendlyTips: true,
  isShowGold: true,
};

params.forEach((param) => {
  let [key, value] = param.split("=");
  locate[key] = value;
});
const types = locate.type.split(",");
//油价
let oilPrice = new Promise((resolve, reject) => {
  const query_addr = `http://m.qiyoujiage.com/${locate.location}.shtml`;
  $httpClient.get(
    {
      url: query_addr,
      headers: {
        referer: "http://m.qiyoujiage.com/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    },
    (error, response, data) => {
      if (error) {
        console.log(`解析油价信息失败: URL=${query_addr}`);
        reject("解析油价信息失败, 详情查看日志");
      } else {
        const reg_price =
          /<dl>[\s\S]+?<dt>(.*油)<\/dt>[\s\S]+?<dd>(.*)\(元\)<\/dd>/gm;

        var prices = [];
        var m = null;

        while ((m = reg_price.exec(data)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === reg_price.lastIndex) {
            reg_price.lastIndex++;
          }

          prices.push({
            name: m[1],
            value: `${m[2]} 元/L`,
          });
        }

        // 解析油价调整趋势
        var adjust_date = "";
        var adjust_trend = "";
        var adjust_value = "";

        const reg_adjust_tips =
          /<div class="tishi"> <span>(.*)<\/span><br\/>([\s\S]+?)<br\/>/;
        const adjust_tips_match = data.match(reg_adjust_tips);

        if (adjust_tips_match && adjust_tips_match.length === 3) {
          adjust_date = adjust_tips_match[1].split("价")[1].slice(0, -2);

          adjust_value = adjust_tips_match[2];
          adjust_trend =
            adjust_value.indexOf("下调") > -1 ||
            adjust_value.indexOf("下跌") > -1
              ? "↓"
              : "↑";

          const adjust_value_re = /([\d\.]+)元\/升-([\d\.]+)元\/升/;
          const adjust_value_re2 = /[\d\.]+元\/吨/;
          const adjust_value_match = adjust_value.match(adjust_value_re);

          if (adjust_value_match && adjust_value_match.length === 3) {
            adjust_value = `${adjust_value_match[1]}-${adjust_value_match[2]}元/L`;
          } else {
            const adjust_value_match2 = adjust_value.match(adjust_value_re2);

            if (adjust_value_match2) {
              adjust_value = adjust_value_match2[0];
            }
          }
        }

        const friendly_tips = `\n下次${adjust_date}调整 ${adjust_trend} ${adjust_value}`;

        if (prices.length !== 4) {
          console.log(
            `解析油价信息失败, 数量=${prices.length}: URL=${query_addr}`
          );
          reject("解析油价信息失败, 详情查看日志");
        } else {
          let content = [];
          types.forEach((param) => {
            switch (param) {
              case "92":
                content.push(`${prices[0].name} ${prices[0].value}`);
                break;
              case "95":
                content.push(`${prices[1].name} ${prices[1].value}`);
                break;
              case "98":
                content.push(`${prices[2].name} ${prices[2].value}`);
                break;
              case "0":
                content.push(`${prices[3].name} ${prices[3].value}`);
                break;
              default:
                break;
            }
          });
          resolve(
            `${content.join("\n")}${locate.isFriendlyTips ? friendly_tips : ""}`
          );
        }
      }
    }
  );
});
//金价
let goldPrice = new Promise((resolve, reject) => {
  if (locate.isShowGold == "false"){
    resolve("")
  }
  const query_addr = "https://60s.viki.moe/v2/gold-price";
  $httpClient.get(
    {
      url: query_addr,
      headers: {
        referer: "http://m.qiyoujiage.com/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    },
    (error, response, data) => {
      if (error) {
        console.log(`获取金价信息失败: URL=${query_addr}`);
        reject("获取金价信息失败, 详情查看日志");
      } else {
        data = JSON.parse(data);
        resolve(
          `${data.data.metals[0].name}: ${data.data.metals[0].today_price} ${data.data.metals[0].unit}`
        );
      }
    }
  );
});
// 使用Promise.all来并行执行两个请求
Promise.all([oilPrice, goldPrice])
  .then(([oil, gold]) => {
    $done({
      title: locate.title+gold,
      content: oil,
      icon: locate.icon,
    });
  })