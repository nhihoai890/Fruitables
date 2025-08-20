
const btnSignup = document.querySelector(".btn_signup");
btnSignup.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = document.getElementById("username").value;
    console.log(userName);
    const email = document.getElementById("email").value
    console.log(email);
    const passWord = document.getElementById("password").value;
    console.log(passWord);
    const confirmPassWord = document.getElementById("confirmPassword").value;
    console.log(confirmPassWord);
    
     if(passWord != confirmPassWord){
        alert('Mật khẩu không trùng khớp')
        return;
     }


    const userData = {
        username: userName,
        email: email,
        password: passWord,
    };
    add(URL_ACCOUNT, userData);
    window.location.href = "login.html";
    
})


