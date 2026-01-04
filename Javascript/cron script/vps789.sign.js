var myHeaders = new Headers();
const token = ""
myHeaders.append("yf-token", token);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://vps789.com/user/signin", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));