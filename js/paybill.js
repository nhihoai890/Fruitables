function showBill() {  
      boxItem[1].style.display = "none";
      boxItem[3].style.display = "block";
      const select_table = document.getElementById("selectTable")
      select_table.value = currentOrderId;
     paybill();
}


    const payBillBtn = document.querySelector(".btnPayBill");
    payBillBtn.addEventListener("click", () =>{
        const select_table = document.getElementById("selectTable");

    const order = dataOrder.find(e => e.id == select_table.value);
       let total = 0;
       console.log(order);
       
       
      order.items.forEach(item => {
       const foodBill = dataFoods.find( f => f.id === item.idFood)
       const priceBill = foodBill.price * item.quantity
       total += priceBill;
      })
       
       const bill = {
          idTable: select_table.value,
          total : total,
          time : new Date()
       }
       add(URL_BILL,bill)
       const updateTable = {
          id : select_table.value,
          customer : "",
          quantity : 0,
          status : false
       }
        edit(URL_TABLE, updateTable)
    
   
    })
    


