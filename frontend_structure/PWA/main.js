const content = document.getElementById("content")

const xhr = new XMLHttpRequest()
xhr.open("get", "/api/img", true)
xhr.responseType = "json"
xhr.onload = function() {
    const arr = xhr.response
    let str = ""
    arr.forEach(item => {
        str += `<li><div>${item}</div></li>`
    })
    content.innerHTML = str
}
xhr.send()