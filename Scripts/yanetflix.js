let ele = '<head>';
let eleReplace = '<head><link rel="stylesheet" href="https://raw.githubusercontent.com/NUPIGM/QuanX/main/Scripts/css/netflix.mom.css" type="text/css" />'
let body = $response.body
    .replace(ele, eleReplace)
$done({ body });