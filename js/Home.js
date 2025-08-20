const listItem = document.querySelectorAll(".sidebar .item");

const btn_back = document.querySelector(".btnback");
const menuItem = document.querySelector(".menu")

btn_back.addEventListener("click", () => {
  listItem.forEach(e => {
    e.classList.toggle("d-none")
  });

  menuItem.classList.toggle("menu")
});

const sidebarItem = document.querySelectorAll(".sidebar a");
const boxItem = document.querySelectorAll("main .box");

sidebarItem.forEach((e, index) => {
  e.addEventListener("click", () => {
    boxItem.forEach(b => b.style.display = "none");
    boxItem[index].style.display = "block";
    localStorage.setItem("key",index);
  })
})

function showBox(id) {
  boxItem[1].style.display = "none";
  boxItem[2].style.display = "block";
  const order_Option = document.getElementById("optionOrder");
  order_Option.value = id;
}

const key = localStorage.getItem("key");

if(key) {
    boxItem[key].style.display = "block";
}


const btn_logout = document.getElementById("btnLogout")
btn_logout.addEventListener("click", (e) => {
   e.preventDefault()
   alert('Bạn đã đăng xuất khỏi tài khoản');
   window.location.href = "login.html";
})