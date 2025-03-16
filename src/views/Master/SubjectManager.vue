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
          <div class="subject-manager">
            <h1>Quản lý Môn Học</h1>
            <button @click="showAddSubjectModal = true" class="btn btn-primary">Thêm Môn Học</button>
            
            <table class="subject-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Môn Học</th>
                  <th>Mô Tả</th>
                  <th>Hình Ảnh</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="subject in filteredSubjects" :key="subject.id">
                  <td>{{ subject.id }}</td>
                  <td>{{ subject.name }}</td>
                  <td>{{ subject.description }}</td>
                  <td>
                    <img v-if="subject.thumbnail" :src="subject.thumbnail" alt="Thumbnail" class="thumbnail-img" />
                    <span v-else>Không có ảnh</span>
                  </td>
                  <td>
                    <button @click="editSubject(subject)" class="btn btn-warning">Sửa</button>
                    <button @click="deleteSubject(subject.id)" class="btn btn-danger">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div v-if="showAddSubjectModal" class="modal">
                <div class="modal-content">
                    <h2>Thêm Môn Học</h2>
                    <button @click="showAddSubjectModal = false" class="close-btn">&times;</button>
                    <label>Tên Môn Học:</label>
                    <input v-model="newSubject.name" type="text" />
                    <label for="description">Mô Tả:</label>
                    <textarea id="description" v-model="newSubject.description" 
                    class="form-control" rows="5" style="width: 100%;"></textarea>

                    <input type="file" @change="handleThumbnailUpload" accept="image/*" />
                    <div v-if="newSubject.thumbnailPreview">
                      <h4>Ảnh Xem Trước:</h4>
                      <img :src="newSubject.thumbnailPreview" alt="Thumbnail Preview" class="preview-img" />
                    </div>

                    <button @click="addSubject()" class="btn btn-success">
                        Thêm
                    </button>
                    <button @click="showAddSubjectModal = false" class="btn btn-secondary">Hủy</button>
                </div>
            </div>
            <!-- Modal Cập Nhật Môn Học -->
            <div v-if="showUpdateSubjectModal" class="modal">
                <div class="modal-content">
                    <h2>Cập Nhật Môn Học</h2>
                    <button @click="showUpdateSubjectModal = false" class="close-btn">&times;</button>
                    <label>Tên Môn Học:</label>
                    <input v-model="newSubject.name" type="text" />
                    <label for="description">Mô Tả:</label>
                    <textarea id="description" v-model="newSubject.description" 
                    class="form-control" rows="5" style="width: 100%;"></textarea>

                    <input type="file" @change="handleThumbnailUpload" accept="image/*" />
                    <div v-if="newSubject.thumbnailPreview">
                      <h4>Ảnh Xem Trước:</h4>
                      <img :src="newSubject.thumbnailPreview" alt="Thumbnail Preview" class="preview-img" />
                    </div>

                    <button @click="updateSubject()" class="btn btn-success">
                        Cập Nhật
                    </button>
                    <button @click="showUpdateSubjectModal = false" class="btn btn-secondary">Hủy</button>
                </div>
            </div>
          </div>
        </main>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGauge, faVideo, faUsers, faCog, faSignOutAlt, faChevronLeft, faChevronRight, faBook, faSearch, faEnvelope  } from '@fortawesome/free-solid-svg-icons';

library.add(faGauge, faVideo, faUsers, faCog, faSignOutAlt, faChevronLeft, faChevronRight, faSearch, faBook, faEnvelope);

export default {
  name: 'SubjectManager',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      msg: 'Welcome to PLT Solution App',
      isCollapsed: false,
      searchQuery: null,
      subjects: [],
      filteredSubjects: [],
      isMobile: window.innerWidth <= 768,
      showAddSubjectModal: false,
      showUpdateSubjectModal: false,
      newSubject: { 
        name: '', 
        description: '',
        thumbnail: null}
    };
  },
  watch: {
    searchQuery: function(val){
      if (!val) {
        this.filteredSubjects = this.subjects;
        return;
      }
      this.filteredSubjects = this.subjects.filter(subject => 
        subject.name.toLowerCase().includes(val.toLowerCase()) ||
        subject.description.toLowerCase().includes(val.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchSubjects();
    this.filteredSubjects = this.subjects;
    window.addEventListener('resize', this.checkScreenSize);
    const role = sessionStorage.getItem("role") || localStorage.getItem("role");
    if (role !== "admin") {
        alert("Bạn không có quyền truy cập trang này!");
        this.$router.push("/login"); // Quay lại trang login nếu không phải admin
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
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
    async fetchSubjects() {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/subjects`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.subjects = response.data;
        this.filteredSubjects = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách môn học:", error);
        alert("Đã xảy ra lỗi khi lấy danh sách môn học. Vui lòng thử lại sau.");
      }
    },
    async addSubject() {
      try {
        const token = sessionStorage.getItem('token');

        const formData = new FormData();
        formData.append('name', this.newSubject.name);
        formData.append('description', this.newSubject.description);

        if (this.newSubject.thumbnail) {
          formData.append('thumbnail', this.newSubject.thumbnail);
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/subjects`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data);

        // Thêm môn học mới vào danh sách mà không cần fetch lại từ server
        this.subjects.push(response.data); 

        this.fetchSubjects();
        alert("Thêm môn học thành công!"); // Hiển thị thông báo
        this.newSubject = { name: '', description: '', thumbnail: null, thumbnailPreview: null }; // Reset form
        this.showAddSubjectModal = false;
      } catch (error) {
        console.error("Lỗi khi thêm môn học:", error);
      }
    },
    async deleteSubject(id) {
        if (confirm("Bạn có chắc chắn muốn xóa môn học này không?")) {
            try {
                const token = sessionStorage.getItem('token');
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/subjects/${id}`, {
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                });
                this.fetchSubjects();
            } catch (error) {
            console.error("Lỗi khi xóa môn học:", error);
            }
        }
    },
    async updateSubject() {
      try {
        const token = sessionStorage.getItem('token');

        const formData = new FormData();
        formData.append('name', this.newSubject.name);
        formData.append('description', this.newSubject.description);

        if (this.newSubject.thumbnail) {
          formData.append('thumbnail', this.newSubject.thumbnail);
        } else if (this.newSubject.thumbnailPreview) {
          // Nếu không có ảnh mới, gửi lại ảnh cũ
          formData.append('thumbnail', this.newSubject.thumbnailPreview);
        }

        await axios.post(`${import.meta.env.VITE_API_URL}/api/subjects/${this.newSubject.id}?_method=PUT`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.fetchSubjects();
        this.showUpdateSubjectModal = false;
      } catch (error) {
        console.error("Lỗi khi cập nhật môn học:", error);
      }
    },
    openAddSubjectModal() {
      this.newSubject = { name: '', description: '' };
      this.showAddSubjectModal = true;
    },
    openUpdateSubjectModal(subject) {
      this.newSubject = {
        id: subject.id,
        name: subject.name,
        description: subject.description,
        thumbnailPreview: subject.thumbnail, // Lưu ảnh cũ để hiển thị
        thumbnail: null // Đặt lại để tránh lỗi khi cập nhật
      };
      this.showUpdateSubjectModal = true;
    },
    editSubject(subject) {
      this.newSubject = { ...subject };
      this.showUpdateSubjectModal = true;
    },
    logout() {
      sessionStorage.removeItem("role");
      localStorage.removeItem("role");
      sessionStorage.removeItem('token');
      this.$router.push("/login");
    },
    handleThumbnailUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newSubject.thumbnail = file;

        // Hiển thị ảnh tạm thời trước khi gửi lên server
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newSubject.thumbnailPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        console.log("Không có ảnh nào được chọn");
      }
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
    font-size: 14px; /* Kích thước nhỏ hơn khi sidebar thu gọn */
    opacity: 0;
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
  .sidebar {
    position: fixed;
    left: -250px;
    height: 100%;
    transition: left 0.3s;
  }
  .sidebar.show {
    left: 0;
  }
  .toggle-container {
    top: 15px;
    right: -50px;
  }
}

/* Main Content */
.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 250px;
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

/* SubjectManager Table */
.subject-manager {
  padding: 20px;
}
.subject-table {
  width: 100%;
  border-collapse: collapse;
}
.subject-table th, .subject-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.subject-table th {
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
.close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.thumbnail-img {
  width: 80px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.preview-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
}

/* Modal */
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
  z-index: 1001;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
  </style>
  