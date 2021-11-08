const formList = document.querySelector(".formList")
// for(var i=2;i<=9;i++){
//     form_title[i-2].textContent = i
//     for(var i2=1; i2<=9; i2++){
//         form_content[i-2].innerHTML += `<div class="form_item">${`${i} x ${i2} = ${i * i2}`}</div>`
//     }
// }

for(var i=2;i<=9;i++){
    let str =`
    <div class="form_block">
        <div class="form_content">
        <h2 class="form_title">${i}</h2>
        `
    for(var i2=1; i2<=9; i2++){
        str  += `<p class="form_item">${`${i} x ${i2} = ${i * i2}`}</p>`
    }
    str += `</div></div>`

    formList.innerHTML += str
}