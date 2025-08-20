let dataOrder;
let dataFoods;
let dataTable;


const select_table = document.getElementById("selectTable");
const btn_PayBill = document.querySelector(".btnPayBill");

async function getAllOrders() {
   const data = await getAll(URL_ORDER)
   const dtFood = await getAll(URL_FOOD)
   const dtTable = await getAll(URL_TABLE)
   dataOrder = data;
   dataFoods = dtFood;
   dataTable = dtTable;

 
 
}




getAllOrders();


const btn_Orders = document.querySelector(".btnOders")
const option_Order = document.getElementById("optionOrder");
btn_Orders.addEventListener("click", () => {
   const card_food = document.querySelectorAll(".foodCard");
   const data_Order = dataOrder.find(e => e.id === option_Order.value)

   const items = data_Order ? data_Order.items : [];
   console.log(items);

   card_food.forEach(e => {
      const quantity = e.querySelector(".qty-input").value;
      if (quantity > 0) {
         const idFood = e.querySelector(".table-number").innerText;
         const indexFood = items.findIndex(e => e.idFood === idFood);
         if (indexFood != -1) {
            items[indexFood].quantity = parseInt(items[indexFood].quantity) + parseInt(quantity);
         } else {
            items.push({ idFood, quantity })
         }
      }
   })

   const orderFood = {
      id: option_Order.value,
      items: items
   }
   if (data_Order) {
      edit(URL_ORDER, orderFood)

   } else {
      add(URL_ORDER, orderFood)
   }
   alert('Đặt thành công!')
})


let currentOrderId = null;
function showModal(id) {
   currentOrderId = id; 
    const order = dataOrder.find(e => e.id == id);
    const cartFood = document.querySelector(".cart-body");
      cartFood.innerHTML = "";
      let total = 0;
    order.items.forEach((item,index) => {
        const food = dataFoods.find(a => a.id == item.idFood);
        console.log(food);
        const totalPrice = item.quantity * food.price;
        total += totalPrice
        cartFood.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td><img src="${food.image}" width="50" height="50" style="object-fit:cover"></td>
            <td>${food.name}</td>
            <td>${item.quantity}</td>
            <td>${totalPrice} $</td>
          
        </tr>`;
        
    });

   cartFood.innerHTML += `<tr>
        <td colspan="4"><strong>Total:</strong></td>
        <td><strong>${total} $</strong></td>`

    
}







select_table.addEventListener("change", paybill);

function paybill() {

    const selectedId = parseInt(select_table.value);
    if (isNaN(selectedId)) return;

    const orderBill = dataOrder.find(o => o.id == selectedId);
    const render_bill = document.querySelector(".payBill");
    const total_price_elem = document.querySelector(".total-price");

    render_bill.innerHTML = "";
    let total = 0;

    if (!orderBill || !orderBill.items || orderBill.items.length === 0) {
        render_bill.innerHTML = `<tr><td colspan="5">No order found</td></tr>`;
        total_price_elem.textContent = "$0";
        return;
    }

    orderBill.items.forEach((item, index) => {
        const foodBill = dataFoods.find(f => f.id == item.idFood);
        if (!foodBill) return;

        const priceFood = foodBill.price * item.quantity;
        total += priceFood;

        render_bill.innerHTML += `
            <tr>
                <th>${index + 1}</th>
                <td><img src="${foodBill.image}" class= "img-food"></td>
                <td>${foodBill.name}</td>
                <td>${item.quantity}</td>
                <td>${priceFood} $</td>
            </tr>
        `;
    });

    render_bill.innerHTML += `
        <tr class="fw-bold">
            <td colspan="4" class="text-end">Total</td>
            <td class="text-danger">${total} $</td>
        </tr>
    `;
}


