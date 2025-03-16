<template>
     <div class="admin-home">
      <aside :class="['sidebar', { collapsed: isCollapsed }]">
        <router-link to="/admin" class="logo-link">
            <img src="/logo_plt.png" alt="Logo" class="logo" />
        </router-link>
        
        <div class="logo-container">
          <h2 v-if="!isCollapsed">PLT SOLUTION ADMIN</h2>
        </div>
        <div class="toggle-container" @click="toggleSidebar">
          <font-awesome-icon :icon="['fas', isCollapsed ? 'chevron-right' : 'chevron-left']" class="toggle-btn" />
        </div>
        <ul>
          <li>
            <router-link to="/lectures">
              <font-awesome-icon :icon="['fas', 'video']" />
              <span v-if="!isCollapsed">Quản lý Video</span>
            </router-link>
          </li>
          <li>
            <router-link to="/subjectmanager">
              <font-awesome-icon :icon="['fas', 'book']" />
              <span v-if="!isCollapsed">Quản lý Môn Học</span>
            </router-link>
          </li>
          <li>
            <router-link to="/usermanager">
              <font-awesome-icon :icon="['fas', 'users']" />
              <span v-if="!isCollapsed">Quản lý Người Dùng</span>
            </router-link>
          </li>
          <li>
            <router-link to="/contactmanager">
              <font-awesome-icon :icon="['fas', 'envelope']" />
              <span v-if="!isCollapsed">Quản lý liên hệ</span>
            </router-link>
          </li>
          <li @click="logout">
            <a href="#">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
              <span v-if="!isCollapsed">Đăng Xuất</span>
            </a>
          </li>
        </ul>
      </aside>
      
      <div class="main-container">
                <header class="header">
                <div class="search-box">
                    <input type="text" placeholder="Tìm kiếm..." v-model="searchQuery" />
                    <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
                </div>
                </header>
                <!-- Main content -->
                <main class="content">
                    <h2>Quản Lý Liên Hệ</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ Tên</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Tin Nhắn</th>
                            <th>Trạng Thái</th>
                            <th>Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="contact in filteredContacts" :key="contact.id">
                            <td>{{ contact.id }}</td>
                            <td>{{ contact.name }}</td>
                            <td>{{ contact.email }}</td>
                            <td>{{ contact.number }}</td>
                            <td>{{ contact.message }}</td>
                            <td>{{ contact.is_read ? "Đã đọc" : "Chưa đọc" }}</td>
                            <td>
                            <button v-if="!contact.is_read" @click="markAsRead(contact.id)">Đánh dấu đã đọc</button>
                            <button @click="deleteContact(contact.id)">Xóa</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </main>
      </div>
    </div>
  </template>
  
  <script>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faVideo, faUsers, faBook, faSignOutAlt, faChevronLeft, faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faVideo, faUsers, faBook, faSignOutAlt, faChevronLeft, faChevronRight, faEnvelope);

export default {
  name: "ContactManager",
  components: { FontAwesomeIcon },
  data() {
    return {
      isCollapsed: false,
      searchQuery: "",
      contacts: [],
      filteredContacts: [],
    };
  },
  
  setup() {
    const router = useRouter();
    const isCollapsed = ref(false);
    const searchQuery = ref("");
    const contacts = ref([]);

    const filteredContacts = computed(() => {
      return contacts.value.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          contact.number.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          contact.message.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
    });

    const fetchContacts = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contacts`, {
            headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Dữ liệu API trả về:", response.data); // In dữ liệu để kiểm tra
            contacts.value = response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách liên hệ:", error);
        }
    };

    const deleteContact = async (id) => {
      if (confirm("Bạn có chắc chắn muốn xóa?")) {
        try {
          const token = sessionStorage.getItem("token");
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/contacts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          fetchContacts();
        } catch (error) {
          console.error("Lỗi khi xóa liên hệ:", error);
        }
      }
    };

    const markAsRead = async (id) => {
        if (!confirm("Bạn có chắc chắn muốn đánh dấu tin nhắn này là đã đọc?")) return;
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/contacts/${id}/mark-as-read`, 
            {}, 
            { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
            const contact = contacts.value.find((c) => c.id === id);
            if (contact) contact.is_read = true; // Cập nhật trạng thái trực tiếp mà không cần fetch lại toàn bộ danh sách
            }
        } catch (error) {
            console.error("Lỗi khi đánh dấu đã đọc:", error);
        }
    };

    const logout = () => {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/login");
    };

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    onMounted(fetchContacts);
    return { isCollapsed, searchQuery, contacts, deleteContact, markAsRead, logout, toggleSidebar, filteredContacts  };
  }
};
</script>
  
  <style scoped>
    .admin-home {
    display: flex;
  }
  .sidebar {
    width: 250px;
    background: #1e1e2d;
    color: white;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: width 0.3s;
    z-index: 1100;
  }

  .sidebar.collapsed {
    width: 80px;
  }

  .sidebar .logo {
    width: 200px;
    transition: width 0.3s;
  }

  .sidebar.collapsed .logo {
    width: 100px;
  }

  .toggle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
    background: #2a2a3a;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 15px;
  }

  .toggle-btn {
    color: white;
    font-size: 20px;
    transition: transform 0.3s;
  }

  .toggle-container:hover .toggle-btn {
    transform: scale(1.2);
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
  }
  .logo-container h2 {
    font-size: 18px;
    white-space: nowrap;
    transition: opacity 0.3s, font-size 0.3s;
  }
  .logo {
    cursor: pointer; /* Hiển thị con trỏ khi rê chuột vào */
    transition: transform 0.2s;
    width: 250px;
    height: auto;
  }
  .logo:hover {
    transform: scale(1.1); /* Hiệu ứng phóng to nhẹ khi hover */
  }
  .logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none; /* Loại bỏ gạch chân */
  }
  .sidebar.collapsed .logo-container h2 {
    display: none;
    opacity: 0;
    font-size: 0px; /* Kích thước nhỏ hơn khi sidebar thu gọn */
  }
  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .sidebar ul li {
    margin: 15px 0;
    display: flex;
    align-items: center;
    padding: 12px 20px;
    gap: 10px;
  }

  .sidebar ul li i {
    font-size: 24px; /* Kích thước icon */
    margin-right: 15px;
  }

  .sidebar.collapsed ul li span {
    display: none;
  }

  .sidebar ul li a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    transition: background 0.3s;
    white-space: nowrap;
    font-size: 16px;
    transition: background 0.3s, padding-left 0.3s;
    width: 100%;
    border-radius: 5px;
  }
  .sidebar ul li a svg {
    font-size: 22px;
  }
  .sidebar ul li a span {
    transition: opacity 0.3s;
  }
  .sidebar.collapsed ul li a span {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }
  .sidebar ul li a:hover {
    background: #444;
    padding-left: 15px;
  }
  .content {
    flex-grow: 1;
    padding: 20px;
    margin-top: 100px
  }

  @media (max-width: 768px) {
  .sidebar {
    width: 250px;
    left: 0;
    height: 100%;
    position: fixed;
    transition: width 0.3s ease-in-out;
    overflow: hidden;
  }

  .sidebar.show {
    width: 250px;
    overflow: visible
  }

  .sidebar .logo {
    width: 250px;
    transition: width 0.3s;
  }

  .sidebar.show .logo {
    width: 200px;
  }

  .sidebar.show ul {
    display: block;
  }

  .sidebar.collapsed {
    width: 80px;
  }

  .sidebar.show ul li a span {
    display: inline;
  }

  .toggle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
    background: #2a2a3a;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 15px;
  }

  .search-box {
    max-width: 250px;
  }

  .search-box input {
    font-size: 14px;
    padding: 8px 12px;
  }

  .main-container {
    margin-left: 0;
  }
  .header {
    left: 0;
    width: 100%;
  }

  .toggle-container {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  table {
    width: 100%;
    overflow-x: auto;
    display: block; /* Đảm bảo bảng có thể cuộn ngang */
  }

  th, td {
    font-size: 14px; /* Giảm kích thước font */
    padding: 5px; /* Giảm padding */
  }

  td {
    word-wrap: break-word; /* Chia từ nếu quá dài */
  }

  /* Các cột có thể được điều chỉnh để có chiều rộng tối ưu */
  th:nth-child(1), td:nth-child(1) {
    width: 50px; /* Cột ID */
  }

  th:nth-child(2), td:nth-child(2) {
    width: 150px; /* Cột Họ Tên */
  }

  th:nth-child(3), td:nth-child(3) {
    width: 200px; /* Cột Email */
  }

  th:nth-child(4), td:nth-child(4) {
    width: 120px; /* Cột SĐT */
  }

  th:nth-child(5), td:nth-child(5) {
    width: 200px; /* Cột Tin Nhắn */
  }

  th:nth-child(6), td:nth-child(6) {
    width: 100px; /* Cột Trạng Thái */
  }

  th:nth-child(7), td:nth-child(7) {
    width: 150px; /* Cột Hành Động */
  }

}

@media (max-width: 480px) {
  .sidebar {
    position: fixed;
    left: -250px;
    height: 100%;
    transition: left 0.3s;
  }
  .sidebar.show {
    left: 0;
  }

  .search-box {
    max-width: 200px;
  }

  .search-icon {
    font-size: 16px;
    right: 10px;
  }

  /* Điều chỉnh thanh tìm kiếm */
  .search-box input {
    width: 200px; /* Thu nhỏ thanh tìm kiếm */
  }

  th, td {
    padding: 10px; /* Tăng khoảng cách cho dễ đọc */
  }

  /* Cải thiện trải nghiệm xem bảng trên di động */
  table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  /* Trên màn hình rất nhỏ, ẩn một số cột không quá quan trọng */
  th:nth-child(5), td:nth-child(5), /* Tin Nhắn */ 
  th:nth-child(6), td:nth-child(6) { /* Trạng Thái */
    display: none; /* Ẩn các cột Tin Nhắn và Trạng Thái */
  }

  /* Thu gọn thêm cho các cột còn lại */
  th, td {
    font-size: 12px;
  }

  td {
    word-wrap: break-word;
  }
  
}

/* Khi sidebar mở rộng trên desktop */
@media (min-width: 768px) {
  .sidebar.collapsed {
    width: 80px;
  }

  .sidebar ul li a span {
    display: inline-block;
  }
  
  .sidebar .logo-container h2 {
    display: block;
  }
}

.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 250px; /* Tạo khoảng trống bằng với sidebar */
  transition: margin-left 0.3s;
}
.sidebar.collapsed + .main-container {
  margin-left: 80px; /* Khi sidebar thu gọn */
}
    /* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000000;
  padding: 15px 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed; /* Giữ header cố định */
  top: 0;
  left: 250px; /* Dịch sang phải để tránh bị sidebar đè lên */
  width: calc(100% - 250px);
  z-index: 1000;
  transition: left 0.3s, width 0.3s;
}

.sidebar.collapsed + .main-container .header {
  left: 80px;
  width: calc(100% - 80px);
}

/* Thanh tìm kiếm */
.search-box {
  position: relative; 
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 350px; /* Giới hạn chiều rộng */
  background: #fff;
  border-radius: 25px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  transition: all 0.3s ;
}

.search-box input {
  flex: 1; /* Giúp input chiếm hết không gian trống */
  padding: 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.search-box input:focus {
  width: 100%;
  border: none;
  outline: none;
}

.search-icon {
  position: absolute;
  right: 15px;
  font-size: 18px;
  color: #777;
  cursor: pointer;
  transition: color 0.3s;
}

.search-icon:hover {
  color: #333;
}
    
table {
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  button {
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #45a049;
    }

  </style>
  