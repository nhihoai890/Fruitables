// Hàm upload ảnh lên Cloudinary và trả về link
async function uploadImageToCloudinary(file) {
    const cloudName = "dfuw8zfpw"; // Thay bằng cloud_name của bạn
    const uploadPreset = "Fruitable"; // Thay bằng upload_preset đã cấu hình

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const data = await response.json();
        return data.secure_url; // Trả về link ảnh đã upload
    } catch (error) {
        console.error("Error uploading image:", error);
        return null; // Trả về null nếu có lỗi
    }
}

let file_food ;

  const foodImg = document.getElementById("imgFood");
  foodImg.addEventListener("change",fileBook )
function fileBook(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
        document.getElementById("img_food").src = e.target.result;
    };
    file_food = file;
}