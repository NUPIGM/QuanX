/**
 * Surge 签到脚本
 */
const store = $persistentStore.read("CheckinData") || $persistentStore.write("","CheckinData") //初始化
store = JSON.parse(store)
const fakerCookie = store.fakerCheckin ? store.fakerCheckin.cookie : store.fakerCheckin={"cookie":"","updateTime":""}; //不存在就创建
const cookie = $argument || fakerCookie || $done()

const headers = {
    "new-api-user": "885",
    "Cookie": cookie,
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
};
// 签到
const checkin = new Promise((resolve, reject) => {
    const request = {
        url: "https://api.fakerclaw.online/api/user/checkin",
        method: "POST",
        headers: headers,
        body: ""
    };
    $httpClient.post(request,
        function (error, response, data) {
            if (error) {
                console.log("签到失败: " + error);
                reject("签到失败")
            } else {
                data = JSON.parse(data);
                resolve(data);
            }
        });
})
// 请求面板数据
const board = new Promise((resolve, reject) => {
    const request = {
        url: "https://api.fakerclaw.online/api/user/self",
        method: "GET",
        headers: headers
    };
    $httpClient.get(request,
        function (error, response, data) {
            if (error) {
                console.log("面板失败: " + error);
                reject("面板失败")
            } else {
                data = JSON.parse(data);
                const formatter = new Intl.DateTimeFormat('zh-CN', {
                month: '2-digit',
                day: '2-digit'
                });
                const time = new Date();
                //把更新日期写入储存中
                store.fakerCheckin.updateTime=formatter.format(new Date())
                $persistentStore.write(JSON.stringify(store),"CheckinData")
                resolve(data);
            }
        });
})

Promise.all([checkin, board]).then(([checkin, board]) => {
    let formatter = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    $notification.post("Faker API 签到", checkin.message + formatter.format(checkin.data?.quota_awarded/500000), formatter.format((board.data?.quota / 500000)));
    console.log(checkin)
    console.log(board)
    $done();
})
