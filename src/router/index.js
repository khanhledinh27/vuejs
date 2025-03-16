import { createRouter, createWebHistory } from 'vue-router'
import LectureView from '../views/Lectures/View.vue'
import LectureCreate from '../views/Lectures/Create.vue'
import LectureEdit from '../views/Lectures/Edit.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Dashboard from '@/views/Master/Dashboard.vue'
import Home from '@/views/Master/Home.vue'
import UserHome from '@/views/User/UserHome.vue'
import UserManager from '@/views/Master/UserManager.vue'
import VideoDetailPage from '@/views/Video/VideoDetailPage.vue';
import HomePage from '@/views/User/HomePage.vue';
import SubjectManager from '@/views/Master/SubjectManager.vue';
import CoursesListPage from '@/views/User/Courses/CoursesListPage.vue'
import LandingPage from '@/views/User/LandingPage.vue'
import ContactForm from '@/views/User/ContactForm.vue'
import ContactManager from '@/views/Master/ContactManager.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'Admin',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/lectures',
      name: 'lectures',
      component: LectureView
    },
    {
      path: '/lectures/create',
      name: 'lectureCreate',
      component: LectureCreate
    },
    {
      path: '/lectures/:id/edit',
      name: 'lectureEdit',
      component: LectureEdit
    },
    {
      path:'/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path:'/usermanager',
      name: 'UserManager',
      component: UserManager
    },
    {
      path:'/subjectmanager',
      name: 'SubjectManager',
      component: SubjectManager
    },
    {
      path:'/',
      name: 'Home',
      component: HomePage
    },
    {
      path:'/course',
      name: 'User',
      component: UserHome
    },
    {
      path: "/videodetail/:id",
      name: "videos",
      component: VideoDetailPage,
    },
    {
      path: "/courselist",
      name: "CourseList",
      component: CoursesListPage,
    },
    {
      path: "/landingpage",
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactForm,
    },
    {
      path: "/contactmanager",
      name: "ContactManager",
      component: ContactManager,
    },
  ],
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");

  if (to.path === "/admin" && (!token || role !== "admin")) {
      // alert("Bạn không có quyền truy cập!");
      next("/login");  // Chuyển hướng về trang login
  } else {
      next();  // Cho phép tiếp tục
  }
});
export default router
