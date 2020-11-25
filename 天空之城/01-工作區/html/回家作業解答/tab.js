var contents = [{
    'title': '政治',
    'content': "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
}, {
    'title': '財經',
    'content': "Lorem ipsum dolor. ",
}, {
    'title': '體育',
    'content': "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus adipisci explicabo.",
}, {
    'title': '娛樂',
    'content': "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus adipisci explicabo, cupiditate sintdicta illum aliquid labore soluta iusto sunt vitae accusamus illo expedita, aut ipsa culpa laudantiumquasi numquam",
}, {
    'title': '社會',
    'content': "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
}]

var tab_btns = document.querySelector('.tab_btns')
var tab_content = document.querySelector('.tab_content')
contents.forEach(function (content, index) {
    // 判斷索引值是否是第一筆資料
    if (index == 0) {
        // 建立按鈕部分
        tab_btns.innerHTML += `<div class="btn active">${content.title}</div>`;

        // 建立內容部分
        tab_content.innerHTML += `<div class="content active">
            <div>
            <a href="#">${content.content}</a>
        </div>
    </div>`

    } else {
        tab_btns.innerHTML += `<div class="btn">${content.title}</div>`;

        tab_content.innerHTML += `<div class="content">
        <div>
            <a href="#">${content.content}</a>
        </div>
    </div>`
    }
})

/////////////////////////////////下方製作綁定按鈕點擊事件///////////////////////////////////////////

var btns = document.querySelectorAll('.btn')
var contents = document.querySelectorAll('.content')
// 透過querySelectorAll抓到的結果 不是陣列 是NodeList

btns.forEach(function (btn, i) {
    const content = contents[i]

    btn.onclick = function () {
        remove_active() //先刪除所有的active

        btn.classList.add('active'); //被點擊的按鈕加上active
        content.classList.add('active'); //相對應的內容加上active
    }
})

function remove_active() {
    btns.forEach(function (btn, i) {
        const content = contents[i]

        btn.classList.remove('active')
        content.classList.remove('active')
    })
}