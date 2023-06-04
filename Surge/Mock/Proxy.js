fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    // 在这里对数据进行处理或传递到其他函数
    processData(data);
  })
  .catch(error => {
    console.error(error);
  });

function processData(data) {
  // 这里可以对数据进行进一步处理或使用
  console.log(data);
  // 也可以将数据传递到其他函数进行进一步处理
  anotherFunction(data);
}

function anotherFunction(data) {
  // 在这里可以对数据进行额外的处理或使用
  console.log(data);
}

function queryURLParams() {
      let url = window.location.search;
      const urlSearchParams = new URLSearchParams(url);
      const params = Object.fromEntries(urlSearchParams.entries());
      return params;
    }

    let a = JSON.stringify(queryURLParams());

    // 将脚本放在末尾，确保DOM已加载
    document.getElementById('output').innerHTML = a;
    console.log(a);
