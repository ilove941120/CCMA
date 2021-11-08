const account = document.querySelector(".account")
const password = document.querySelector(".password")
const sentButton = document.querySelector(".sentButton")

sentButton.addEventListener("click",function(){
    callSingUP()
})

function callSingUP(){
    if(account.value == "" || password.value == ""){
        console.log("請填寫正確格式")
        return;
    }
    let obj = {}
    obj.email = account.value
    obj.password = password.value
    console.log(obj)

    axios.post('https://hexschool-tutorial.herokuapp.com/api/signup', obj )
  .then(function (response) {
    console.log(response);
    if(response.data.message == "帳號註冊成功"){
        alert("註冊成功")
    }
    else{
        alert("註冊失敗")
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


const signInAccount = document.querySelector(".signInAccount")
const signInPassword = document.querySelector(".signInPassword")
const singInSent = document.querySelector(".singInSent")

singInSent.addEventListener("click",function(){
    callSingIn()
})

function callSingIn(){
    let obj = {}
    obj.email = signInAccount.value
    obj.password = signInPassword.value

    axios.post('https://hexschool-tutorial.herokuapp.com/api/signin', obj )
  .then(function (response) {
    console.log(response);
    if(response.data.message == "登入成功"){
        alert("恭喜登入成功")
    }
    else{
        alert("登入失敗")
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


