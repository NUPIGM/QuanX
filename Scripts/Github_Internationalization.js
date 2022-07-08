let ele = '<head>';
let eleReplace = '<head><script type="text/javascript" async="async" src="https://raw.githubusercontent.com/k1995/github-i18n-plugin/master/userscript.js"></script>'
let body = $response.body
    .replace(ele, eleReplace)
$done({ body });
