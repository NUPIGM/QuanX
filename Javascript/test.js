async function promise() {
  setTimeout(function () {
    console.log(1)
  },2000)
  await fetch("https://vps789.com/user/signin")
  console.log(2)
}
promise().then((data)=>{
  console.log(4)
})
console.log(3)