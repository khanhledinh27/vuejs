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
                <div class="user-manager">
                    <h1>Quản lý Người Dùng</h1>
                    <button @click="openAddUserModal" class="btn btn-primary">Thêm Người Dùng</button>
                    
                    <table class="user-table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai Trò</th>
                        <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in filteredUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                                <span>{{ user.role }}</span>
                        </td>
                        
                        <td>
                            <button @click="editUser(user)" class="btn btn-warning">Sửa</button>
                            <button @click="deleteUser(user.id)" class="btn btn-danger">Xóa</button>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    
                    <div v-if="showAddUserModal" class="modal">
                    <div class="modal-content">
                        <h2>Thêm Người Dùng</h2>
                        <label>Tên:</label>
                        <input v-model="newUser.name" type="text" />
                        <label>Email:</label>
                        <input v-model="newUser.email" type="email" />
                        <label>Mật Khẩu:</label>
                        <input v-model="newUser.password" type="password" />
                        <label>Vai Trò:</label>
                        <select v-model="newUser.role">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        </select>
                        <button @click="newUser.id ? updateUser() : addUser()" class="btn btn-success">
                            {{ newUser.id ? "Cập Nhật" : "Thêm" }}
                        </button>
                        <button @click="showAddUserModal = false" class="btn btn-secondary">Hủy</button>
                    </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
  
  <script>
  import axios from 'axios';  
  import { useRouter } from 'vue-router';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faGauge, faVideo, faUsers, faCog, faSignOutAlt, faChevronLeft, faChevronRight, faSearch, faBook, faEnvelope } from '@fortawesome/free-solid-svg-icons';
  
  library.add(faGauge, faVideo, faUsers, faCog, faSignOutAlt, faChevronLeft, faChevronRight, faSearch, faBook, faEnvelope);
  
  export default {
    name: 'UserManager',
    components: {
      FontAwesomeIcon
    },
    setup() {
        const router = useRouter();

        const logout = () => {
          console.log("Đang đăng xuất...");

          // Xóa toàn bộ token & role
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("role");

          // Kiểm tra nếu token còn tồn tại
          console.log("Token sau khi xóa:", localStorage.getItem("token"));
          console.log("Role sau khi xóa:", localStorage.getItem("role"));

          // Xóa toàn bộ localStorage để chắc chắn
          localStorage.clear();
          sessionStorage.clear();

          // Điều hướng về trang login
          router.push("/login");
        };
        return {
          logout // 
      };
    },
    data() {
      return {
        msg: 'Welcome to PLT Solution App',
        isCollapsed: false,
        searchQuery: '',
        isMobile: window.innerWidth <= 768,
        users: [],
        filteredUsers: [],
        showAddUserModal: false,
        newUser: {
            name: '',
            email: '',
            password: '',
            role: 'user'
        }
      };
    },
      computed: {
      filteredUsers() {
          if (!this.searchQuery) {
              return this.users;
          }
          const query = this.searchQuery.toLowerCase();
          return this.users.filter(user =>
              user.name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query) ||
              user.role.toLowerCase().includes(query)
          );
      }
  },
    mounted() {
        
      window.addEventListener('resize', this.checkScreenSize);
      const role = sessionStorage.getItem("role") || localStorage.getItem("role");
      if (role !== "admin") {
          this.$router.push("/login"); // Quay lại trang login nếu không phải admin
      } else {
        this.fetchUsers(); //Gọi API lấy danh sách người dùng
        this.filteredUsers = this.users;
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScreenSize);
    },
    methods: {
        async fetchUsers() {
            try {
                const token = sessionStorage.getItem('token'); 
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.users = response.data;
                this.filteredUsers = response.data;
            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
                alert("Không thể tải danh sách người dùng!");
            }
        },
        async addUser() {
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, this.newUser);
                this.fetchUsers();
                this.showAddUserModal = false;
            } catch (error) {
                console.error("Lỗi khi thêm người dùng:", error.response?.data || error.message);
                alert("Có lỗi xảy ra khi thêm người dùng!");
            }
        },
        async deleteUser(id) {
          if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
          try {
              const token = sessionStorage.getItem('token');
              await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              alert("Xóa thành công!");
              this.fetchUsers();
          } catch (error) {
              console.error("Lỗi xóa người dùng:", error.response);
              alert("Xóa thất bại: " + (error.response?.data?.message || "Lỗi không xác định"));
          }
        },
        async updateUser() {
            try {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${this.newUser.id}`, this.newUser);
                this.fetchUsers();
                this.showAddUserModal = false;
            } catch (error) {
                console.error("Lỗi khi cập nhật người dùng:", error.response?.data || error.message);
                alert("Có lỗi xảy ra khi cập nhật người dùng!");
            }
        },
        async updateUserRole(user) {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, { role: user.role });
            this.fetchUsers();
        },
        editUser(user) {
            this.newUser = { ...user };  // Copy dữ liệu, tránh tham chiếu trực tiếp
            this.showAddUserModal = true;
        },
        toggleSidebar() {
            if (this.isMobile) {
            this.isCollapsed = !this.isCollapsed;
            document.querySelector(".sidebar").classList.toggle("show");
            } else {
            this.isCollapsed = !this.isCollapsed;
            }
        },
        checkScreenSize() {
            this.isMobile = window.innerWidth <= 768;
            if (this.isMobile) {
            this.isCollapsed = true;
            } else {
            this.isCollapsed = false;
            }
        },
        openAddUserModal() {
            this.newUser = { name: '', email: '', password: '', role: 'user' };
            this.showAddUserModal = true;
        }
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
    font-size: 0; /* Kích thước nhỏ hơn khi sidebar thu gọn */
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
    margin-top: 60px
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
}

@media (max-width: 480px) {
  .modal-content {
    width: 90%;
    max-width: 300px;
  }
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

/* UserManager Table */
.user-manager {
  padding: 20px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
}
.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.user-table th {
  background-color: #f4f4f4;
}
.btn {
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
}
.btn-primary { background-color: blue; color: white; }
.btn-warning { background-color: orange; color: white; }
.btn-danger { background-color: red; color: white; }
.btn-success { background-color: green; color: white; }
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.modal-content .h2 {
  font-size: 16px;
}
  </style>
  