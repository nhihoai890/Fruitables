
const URL_TABLE = "http://localhost:3000/tables";
const URL_FOOD = "http://localhost:3000/food"
const URL_ORDER = "http://localhost:3000/orders";
const URL_BILL = "http://localhost:3000/bills";
const URL_ACCOUNT = "http://localhost:3000/account";
async function getAll(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // hoặc response.text() nếu không phải JSON
    return data; // có thể return nếu muốn dùng dữ liệu bên ngoài
  } catch (error) {
    return null; // hoặc throw error lại nếu muốn xử lý bên ngoài
  }
}


function add(url, object) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(response => response.json())
    .then(data => {
      // After successful creation, refresh the post list
      fetchPosts();
    })
    .catch(error => console.error('Error creating post:', error));
}

function edit(url, item) {
  fetch(`${url}/${item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Đơn hàng đã được cập nhật', data);
    })
    .catch(error => console.error('Lỗi khi cập nhật đơn hàng', error));
}

function deleted(url, id) {
  fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => console.error('Lỗi khi cập nhật đơn hàng', error));
}


