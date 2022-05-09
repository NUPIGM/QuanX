let ele = '<head>';
let eleReplace = '<head><script type="text/javascript" async="async" src="https://raw.githubusercontent.com/NUPIGM/QuanX/main/Script/Github_Internationalization.user.js"></script>'
let body = $response.body
    .replace(ele, eleReplace)
$done({ body });
