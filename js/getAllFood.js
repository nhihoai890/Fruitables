let dataFood ;
async function getAllFood(search) {
  const data = await getAll(URL_FOOD);
   dataFood = data;
  const showFood = document.querySelector(".show-food");
  showFood.innerHTML = "";
  data.filter(e => e.name.toLowerCase().includes(search.toLowerCase())).forEach((food, index) => {
    const item = document.createElement("div");
    item.classList.add("col-lg-3", "col-md-4", "foodCard");

    item.innerHTML = `
                <div class="card shadow-sm position-relative text-center">
                    <span class="table-number position-absolute top-0 start-0 mt-2 ms-2">${food.id}</span>
                    <button
                      class="btn btn-link position-absolute top-0 end-0 text-pink edit-btn"
                    >
                      <i onclick="getEditFood(${food.id})" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#addFood"></i>
                      <i onclick=getDeleteFood(${food.id}) class="fa-solid fa-trash " data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
                    </button>
      
                  <div class="card-body">
                    <img src="${food.image}" alt="${food.name}"
                      class="img-fluid imageFoody"
                      style="height:150px; object-fit:contain;">
                    <h5 class="mt-2">${food.name}</h5>
                    <p class="text-danger fw-bold">${food.price} $</p>
                    <div
                      class="d-flex justify-content-center align-items-center gap-2">
                      <button class="btn btn-sm btn-pink minus-btn"
                       ><i
                          class="fa-solid fa-circle-minus"></i></button>
                      <input type="text" value="0"
                        class="form-control form-control-sm text-center qty-input"
                         style="width:50px;">
                      <button class="btn btn-sm btn-pink plus-btn"
                        ><i
                          class="fa-solid fa-circle-plus"></i></button>
                    </div>
                  </div>
                </div>`;
    const minus = item.querySelector(".minus-btn");
    const plus = item.querySelector(".plus-btn");
    const input_quantity = item.querySelector(".qty-input")

    minus.addEventListener("click", (e) => {
      let count = parseInt(input_quantity.value) || 0;
      if (count > 0) {
        input_quantity.value = count - 1;
      }
    })
    plus.addEventListener("click", (e) => {
      input_quantity.value = parseInt(input_quantity.value) + 1;
    })
    showFood.appendChild(item);
  });
}
getAllFood("");

let idEdit;
function getDeleteFood(id) {

     const btnDelete = document.querySelector(".btn_delete")
  btnDelete.addEventListener("click",()=>{  
    deleted(URL_FOOD, id) 
  })
   
}

  const addFood = document.querySelector(".btnAddFood");

  addFood.addEventListener("click", async (e) => {
    const nameFood = document.getElementById("foodName")
    const priceFood = document.getElementById("foodPrice")
    const imgFood = await uploadImageToCloudinary(file_food);

    let newId = 1;

  dataFood.forEach(e => {
      if(newId == e.id){
         newId++;
      }else {
         return;
      }
  })

    const newFood = {
      id : idEdit ? idEdit : JSON.stringify(newId),
      name: nameFood.value,
      price: priceFood.value,
      image: imgFood
    }

    if(idEdit) {
      edit(URL_FOOD,newFood );
    }else {
      add(URL_FOOD, newFood);
    }
   
     getAddFood();

  })

 

  const inputSearch = document.querySelector(".searchBox");
  inputSearch.addEventListener("change", () =>{
    getAllFood(inputSearch.value)
     
  })
  

function getEditFood(id) {
   idEdit = id ;
   const food = dataFood.find(e => e.id == id);

    const nameFood = document.getElementById("foodName");
    nameFood.value = food.name ;
    const priceFood = document.getElementById("foodPrice"); 
    priceFood.value = food.price ;
    const imgeFood = document.getElementById("img_food")
    imgeFood.src = food.image;
    const textFood = document.querySelector(".titleFood");
    textFood.innerText = "EDIT FOOD";
    const addFood = document.querySelector(".btnAddFood");
    addFood.innerText = "EDIT FOOD" ;
}

function getAddFood() {
 idEdit = null;
    document.getElementById("foodName").value = "";
    document.getElementById("foodPrice").value = "";
    document.getElementById("img_food").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7P9RA3o4VO0WIcHUtducAPCXGQqkH0tWlwQ&s";
    document.querySelector(".titleFood").innerText = "ADD FOOD";
    document.querySelector(".btnAddFood").innerText = "Add Food";
}

