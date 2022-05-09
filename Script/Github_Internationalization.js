let ele = '<head>';
let eleReplace = '<head><script type="text/javascript" async="async" src="https://github.com/NUPIGM/QuanX/raw/main/Script/GitHub_Internationalization.user.js"></script>'
let body = $response.body
    .replace(ele, eleReplace)
$done({ body });
