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
                <div class="welcome-container">
                    <h1>Welcome to PLT SOLUTIONS COURSE</h1>
                    <p>{{ msg }}</p>
                    <div class="welcome-image">
                        <img src="/plt-main-logo.jpg" alt="Welcome Image" />
                    </div>
                    <div class="welcome-description">
                        <p>Explore our wide range of video courses and enhance your skills with PLT Solutions.</p>
                        <router-link to="/lectures" class="btn btn-primary">Explore Courses</router-link>
                    </div>
                </div>
          </main>
      </div>
    </div>
  </template>
  
  <script>

  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faGauge, faVideo, faUsers, faCog, faSignOutAlt, faChevronLeft, faChevronRight, faBook, faEnvelope  } from '@fortawesome/free-solid-svg-icons';
  import { useRouter } from 'vue-router';
  
  library.add(faGauge, faVideo, faUsers, faCog, faSignOutAlt, faChevronLeft, faChevronRight, faBook, faEnvelope);
  
  export default {
    name: 'Admin',
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

          // Reload trang để Vue Router cập nhật
          window.location.reload();

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
        isMobile: window.innerWidth <= 768
      };
    },
    mounted() {
      window.addEventListener('resize', this.checkScreenSize);
      const role = sessionStorage.getItem("role") || localStorage.getItem("role");
      console.log("Kiểm tra role:", role); 
      if (role !== "admin") {
          // alert("Bạn không có quyền truy cập trang này!");
          this.$router.push("/login"); // Quay lại trang login nếu không phải admin
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkScreenSize);
    },
    methods: {
      toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
          sidebar.classList.remove("show");
        } else {
            sidebar.classList.add("show");
        }
        if (window.innerWidth <= 768) {
          document.querySelector(".sidebar").classList.toggle("show");
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
      logout() {
        console.log("Đang đăng xuất...");
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
        this.$router.push("/login");
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

  /* Ẩn chữ khi thu nhỏ */
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

  .welcome-container {
    text-align: center;
    padding: 50px 20px;
  }

  .welcome-image {
    margin: 20px 0;
    max-width: 100%;
    height: auto;
  }

  .welcome-image img {
    width: 100%; /* Điều chỉnh ảnh để nó chiếm toàn bộ chiều rộng của khối */
    max-width: 500px; /* Giới hạn kích thước tối đa của ảnh */
    height: auto;
    border-radius: 8px; /* Bo góc ảnh */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Hiệu ứng khi hover */
  }

  .welcome-image img:hover {
    transform: scale(1.05); /* Phóng to ảnh khi hover */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ khi hover */
  }

  .welcome-description {
    margin-top: 20px;
    text-align: center;
  }

  .btn {
    padding: 10px 20px;
    text-decoration: none;
    color: white;
    background-color: #007bff;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .btn:hover {
    background-color: #0056b3;
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


  </style>
  