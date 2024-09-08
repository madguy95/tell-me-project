import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../views/Starter/SampleLayout.vue';
import HomePage from '../views/home/HomePage.vue';
import ExamList from '../views/exam/ExamList.vue';
import ExamPage from '../views/exam/ExamPage.vue';
import ResultPage from '../views/exam/Result.vue';
import HealthPostList from '../views/health-care/HealthPostList.vue';
import HealthPostDetail from '../views/health-care/HealthPostDetail.vue';
import MapPage from '../views/map/Map.vue';
import WelcomePage from '../views/Welcome.vue';
import Report from '../views/stats/Report.vue';
import ProcedureList from '../views/procedure/ProcedureList.vue';
import ProcedureDetail from '../views/procedure/ProcedureDetail.vue';

Vue.use(Router);

export default new Router({

  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePage,
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/home',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          components: { default: HomePage }
        },
        {
          path: 'exam-list',
          name: 'exam-list',
          components: { default: ExamList }
        },
        {
          path: 'exam',
          name: 'exam',
          components: { default: ExamPage }
        },
        {
          path: 'result',
          name: 'result',
          components: { default: ResultPage }
        },
        {
          path: 'health-post',
          name: 'health-post',
          components: { default: HealthPostList }
        },
        {
          path: 'health-post/:id',
          name: 'health-post-detail',
          components: { default: HealthPostDetail },
          props: true
        },
        {
          path: 'procedure',
          name: 'procedure',
          components: { default: ProcedureList }
        },
        {
          path: 'procedure/:id',
          name: 'procedure-detail',
          components: { default: ProcedureDetail },
          props: true
        },
        {
          path: 'map',
          name: 'map',
          components: { default: MapPage }
        },
        {
          path: 'report',
          name: 'Report',
          components: { default: Report },
        },
      ]
    }
  ],
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
