import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "../views/Starter/SampleLayout.vue";
import HomePage from "../views/home/HomePage.vue";
import LoginPage from "../views/Pages/Login.vue";
import ExamInfo from "../views/exam/ExamInfo.vue";
import ExamList from "../views/exam/ExamList.vue";
import ExamPage from "../views/exam/ExamPage.vue";
import ResultPage from "../views/exam/Result.vue";
import HealthPostList from "../views/health-care/HealthPostList.vue";
import HealthPostDetail from "../views/health-care/HealthPostDetail.vue";
import MapPage from "../views/map/Map.vue";
import WelcomePage from "../views/Welcome.vue";
import Report from "../views/stats/Report.vue";
import Banner from "../views/Admin/Banner.vue";
import ProcedureList from "../views/procedure/ProcedureList.vue";
import ProcedureDetail from "../views/procedure/ProcedureDetail.vue";
import store from "../store/store";
import ExamConfig from "../views/Admin/ExamConfig.vue";
import { auth } from "../plugins/firebaseConfig";
import MapConfig from "../views/Admin/map-config/MapConfig.vue";
import PostList from "../views/Admin/health-care/PostList.vue";
import PostForm from "../views/Admin/health-care/PostForm.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "/admin",
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "admin-home",
          components: { default: Report },
          meta: { requiresAuth: true },
        },
        {
          path: "banner",
          name: "admin-banner",
          components: { default: Banner },
          meta: { requiresAuth: true },
        },
        {
          path: "exam-config",
          name: "exam-config",
          components: { default: ExamConfig },
          meta: { requiresAuth: true },
        },
        {
          path: "map-config",
          name: "map-config",
          components: { default: MapConfig },
          meta: { requiresAuth: true },
        },
        {
          path: "post-list",
          name: "post-list",
          components: { default: PostList },
          meta: { requiresAuth: true },
        },
        {
          path: "post-detail/:id",
          name: "post-detail",
          components: { default: PostForm },
          meta: { requiresAuth: true },
        },
        {
          path: "post-detail",
          name: "post-detail",
          components: { default: PostForm },
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/home",
      name: "home",
      redirect: "/home",
      component: DashboardLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          components: { default: HomePage },
        },
        {
          path: "exam-list",
          name: "exam-list",
          components: { default: ExamList },
        },
        {
          path: "exam-info",
          name: "exam-info",
          components: { default: ExamInfo },
        },
        {
          path: "exam",
          name: "exam",
          components: { default: ExamPage },
        },
        {
          path: "result",
          name: "result",
          components: { default: ResultPage },
        },
        {
          path: "health-post",
          name: "health-post",
          components: { default: HealthPostList },
        },
        {
          path: "health-post/:id",
          name: "health-post-detail",
          components: { default: HealthPostDetail },
          props: true,
        },
        {
          path: "procedure",
          name: "procedure",
          components: { default: ProcedureList },
        },
        {
          path: "procedure/:id",
          name: "procedure-detail",
          components: { default: ProcedureDetail },
          props: true,
        },
        {
          path: "map",
          name: "map",
          components: { default: MapPage },
        }
      ],
    },
  ],
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});
// Lắng nghe trạng thái xác thực
auth.onAuthStateChanged((user) => {
  if (user) {
    // Người dùng đã đăng nhập
    const storedUser = store.getters.getUser;

    // Kiểm tra UID
    if (storedUser && user.uid !== storedUser.uid) {
      store.dispatch("logout");
      router.push({ path: "/login" });
    }
  } else {
    store.dispatch("logout");
  }
});

// Router guard to check for authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next({ path: "/login" });
  }
  if (to.path === "/login" && isAuthenticated) {
    next({ path: "/home" });
  } else {
    next();
  }
});
export default router;
