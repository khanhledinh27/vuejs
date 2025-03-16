<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <router-link to="/" @click="reloadPage" class="navbar-brand">
                    <img src="/src/assets/logo_plt.png" class="navbar-logo">
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" @click="reloadPage" class="nav-link active" aria-current="page">Trang chủ</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/course" class="nav-link">Bài giảng</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/courselist" class="nav-link">Khóa học</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link">Liên hệ</router-link>
                    </li>
                    
                    </ul>
                </div>
            </div>
        </nav>
        
        <!-- Header -->
        <div class="header">
            <h2>Liên hệ</h2>
        </div>
        
        <div class="contact-container">
            
            
            <div class="contact-content">
                <div class="contact-form">
                    <h3>Thông tin liên hệ</h3>
                    <form @submit.prevent="submitContact">
                        <input v-model="contact.name" type="text" placeholder="Enter your name" required />
                        <input v-model="contact.email" type="email" placeholder="Email" required />
                        <input v-model="contact.number" type="text" placeholder="Number" required />
                        <textarea v-model="contact.message" placeholder="Enter Message" required></textarea>
                        <button type="submit">Gửi</button>
                    </form>
                    <p v-if="message" class="success-message">{{ message }}</p>
                </div>
                <div class="contact-info">
                    <p><strong>Địa chỉ:</strong> 739 đường 14, KDC Ehome 4, P. Vĩnh Phú, TP. Thuận An, Bình Dương</p>
                    <p><strong>Điện thoại:</strong> 0971460075</p>
                    <p><strong>Email:</strong> plt.solutions3010@gmail.com</p>
                </div>
            </div>
        </div>

        
        <footer class="text-center text-white">
        <div class="container p-4 pb-0">
          <section class="">
            <p class="d-flex justify-content-center align-items-center">
              <span class="me-3">Tạo tài khoản miễn phí:</span>
              <router-link to="/login" type="button" class="btn btn-outline-light btn-rounded">
                Đăng ký ngay!
              </router-link>
            </p>
          </section>
        </div>
        <div class="text-center p-3">
          © 2025 Copyright:
          <router-link class="text-white" to="/">PLT Solutions</router-link>
        </div>
      </footer>
    </div>
    
</template>

<script>
    import axios from "axios";
    import { ref } from "vue";

    export default {
        name: "Contact",
        setup() {
            const contact = ref({ name: "", email: "", number: "", message: "" });
            const message = ref("");
            
            const submitContact = async () => {
                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/contacts", {
                        name: contact.value.name,
                        email: contact.value.email,
                        number: contact.value.number,
                        message: contact.value.message
                    }, {
                        headers: { "Content-Type": "application/json" }
                    });

                    message.value = response.data.message || "Gửi thành công!";
                    contact.value = { name: "", email: "", number: "", message: "" };
                } catch (error) {
                    console.error("Lỗi khi gửi liên hệ:", error.response?.data || error.message);
                    message.value = "Lỗi khi gửi!";
                }
            };
            
            return { contact, message, submitContact };
        }
    };
</script>

<style scoped>

/* Logo */
.navbar-logo {
  height: 100px; /* Adjust the height as needed */
  width: auto;
}

/*Nav item */
  .nav-item{
    margin-right: 15px;
    font-size: 19px;
  }
  .nav-item:hover{
    text-transform: uppercase;
  }
 .nav-item::after {
     content: '';
     display: block;
     width: 0px;
     height: 2px;
     background: #3883e6;
     transition: 0.4s
 }

 .nav-item:hover::after {
     width: 100%
 }

 .navbar-dark .navbar-nav .active>.nav-link,
 .navbar-dark .navbar-nav .nav-link.active,
 .navbar-dark .navbar-nav .nav-link.show,
 .navbar-dark .navbar-nav .show>.nav-link,
 .navbar-dark .navbar-nav .nav-link:focus,
 .navbar-dark .navbar-nav .nav-link:hover {
     color: #324ee9
 }

 .nav-link {
     padding: 5px 5px;
     transition: 0.2s
 }

 .header {
    background-color: #3a3f5f;
    color: white;
    text-align: center;
    padding: 20px;
    font-size: 24px;
}
.contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
.map-container {
    width: 100%;
    max-width: 900px;
    margin-bottom: 20px;
}
.contact-content {
    display: flex;
    flex-direction: row;
    max-width: 900px;
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
}
.contact-form {
    width: 50%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
.contact-info {
    width: 40%;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
}
input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
button {
    width: 100%;
    padding: 10px;
    background-color: #3a3f5f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background-color: #2e324b;
}
.success-message {
    color: green;
}

/* Responsive Design */
@media (max-width: 768px) {
    .contact-content {
        flex-direction: column;
        align-items: center;
    }
    .contact-form, .contact-info {
        width: 100%;
        margin-bottom: 20px;
    }
}
/* Footer Section */
footer{
  background-color:#3a3f5f;
}
</style>
