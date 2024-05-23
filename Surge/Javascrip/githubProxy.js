/*

2024年05月23日 22:17:54
*/
let githubPrefix = "https://raw.githubusercontent.com/"
let fastrawPrefix = "https://fastraw.ixnic.net/" //由FastGit群组成员 @duya1234567 提供，代号A镜像。
let hubinceptPrefix = "https://hub.incept.pw/" // 由FastGit群组成员 @mxe365 提供，代号B镜像。
let jsdelivrPrefix ="https://cdn.jsdelivr.net/gh/"
let gitmirrorPrefix ="https://raw.gitmirror.com"
// let kkgithubPrefix = "https://raw.kkgithub.com/" //由KGithub提供，暂时失效。


let changeTo = $argument

var url = $request.url
var headers = $request.headers
delete headers.host
delete headers.Host

if (!url.startsWith(githubPrefix)) {
    $done({});
    return;
}

if (changeTo == "") {
    headers["host"] = "A镜像"
    url = url.replace(githubPrefix,fastrawPrefix)
} else if (changeTo == "B镜像") {
    headers["host"] = "hub.incept.pw"
    url = url.replace(githubPrefix,hubinceptPrefix)
} else if (changeTo == "C镜像") {
    headers["host"] = "raw.kkgithub.com"
    url = url.replace(githubPrefix,kkgithubPrefix)
}

$done({url:url,headers:headers})