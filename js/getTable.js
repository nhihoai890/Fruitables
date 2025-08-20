
async function getAllTables() {
  const data = await getAll(URL_TABLE);
  const showTable = document.querySelector(".show-table");
// kien ve thung chua cac option
  const tableOption = document.getElementById("optionOrder")

  const select_table = document.getElementById("selectTable");
  
  
  data.forEach(element => {

/// lấy biến của thung chứa innnerHTML add option neu element.status true
    if(element.status === true){
    tableOption.innerHTML +=`<option value="${element.id}">Table ${element.id}</option>`
  }

   if(element.status === true){
    select_table.innerHTML += `<option value="${element.id}">Table ${element.id}</option>`
   }
    const img = element.status ? "/img/dinner.png" : "/img/table.png";
    const btn = element.status ? `<button onclick=showBox(${element.id}) class="btn btn-success btn-sm add-btn"><i class="bi bi-plus-circle"></i> ADD</button>
                    <button onclick="showModal(${element.id})" class="btn btn-danger btn-sm cart_btn " id=btnCart data-bs-toggle="modal" data-bs-target="#cartModal"  ><i class="bi bi-cart"></i> CART</button>`
      : ` <button onclick="getTable(${element.id})" class="btn booking-btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#bookingModal" ><i class="bi bi-calendar-event"></i> BOOKING</button>`;

    showTable.innerHTML += `  <div class="col-lg-3 col-md-4" >
              <div class="card position-relative shadow-sm">
                <span class="table-number">${element.id}</span>
                <div class="card-body text-center">
                  <img src=${img} alt="Occupied">
                  <div class="mt-3">
                    ${btn}
                  </div>
                </div>
              </div>
            </div>`;
  });
}


getAllTables();

function getTable(id) {

  const btn_send = document.querySelector(".send");
  console.log(btn_send );
  
  btn_send.addEventListener("click", (e) => {
    const customer = document.getElementById("customerName");

    const quantity = document.getElementById("quantity");

    const item = {
      id: id,
      customerName: customer.value,
      quantity: quantity.value,
      status: true
    }
    edit(URL_TABLE, item);
  })
}

