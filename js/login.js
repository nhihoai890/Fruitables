const btn_Login = document.querySelector(".btn_gradient")
btn_Login.addEventListener("click",async (e) => {
    e.preventDefault();
    const user_name = document.getElementById("username").value
    console.log(user_name);
    const pass_word = document.getElementById("password").value
    console.log(pass_word);
    const data = await getAll(URL_ACCOUNT);
    const user = data.find(u => u.username === user_name && u.password === pass_word );
    if(user){
        alert('Đăng nhập thành công');
        window.location.href = "Home.html";
    }else{
        alert('Bạn đã nhập sai tên hoặc mật khẩu')
    }
    
    
})

