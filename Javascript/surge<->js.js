fetch("https://60s.viki.moe/v2/ip", {
  method: "GET",
  redirect: "follow",
})
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

$httpClient.get(
  {
    url: "https://60s.viki.moe/v2/moyu?encoding=json",
    headers: {
      referer: "https://60s.viki.moe/",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
    timeout: 5,
  },

  (error, response, data) => {
    data = JSON.parse(data);

    $done({
      title: `${data.data.nextHoliday.name}: ${data.data.nextHoliday.until}天`,
      content: data.data.moyuQuote,
      icon: icon_now(data.data.nextHoliday.until),
    });
  }
);
