// @ts-nocheck
/*

2024年05月23日 22:17:54
*/
let githubPrefix = "https://raw.githubusercontent.com/"
let fastrawPrefix = "https://fastraw.ixnic.net/" //由FastGit群组成员 @duya1234567 提供，代号A镜像。
let hubinceptPrefix = "https://hub.incept.pw/" // 由FastGit群组成员 @mxe365 提供，代号B镜像。
let gitmirrorPrefix = "https://raw.gitmirror.com"
// let jsdelivrPrefix = "https://cdn.jsdelivr.net/gh/"
// let kkgithubPrefix = "https://raw.kkgithub.com/" //由KGithub提供，暂时失效。


const cdn = $argument

var url = $request.url
var headers = $request.headers
delete headers.host
delete headers.Host

if (!url.startsWith(githubPrefix)) {
    $done({});
    return;
}

switch (cdn) {
    case 1:
        headers["host"] = "fastraw.ixnic.net"
        url = url.replace(githubPrefix, fastrawPrefix)
        break;
    case 2:
        headers["host"] = "hub.incept.pw"
        url = url.replace(githubPrefix, hubinceptPrefix)
        break;
    case 3:
        headers["host"] = "raw.gitmirror.com"
        url = url.replace(githubPrefix, gitmirrorPrefix)
        break;
    default:
        headers["host"] = "fastraw.ixnic.net"
        url = url.replace(githubPrefix, fastrawPrefix)
        break;
}

$done({ url: url, headers: headers })