import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../views/Starter/SampleLayout.vue';
import Starter from '../views/Starter/SamplePage.vue';
import Exam from '../views/Starter/ExamPage.vue';
import Result from '../views/Starter/Result.vue';
import CarePost from '../views/Starter/CarePost.vue';
import PostDetail from '../views/Starter/PostDetail.vue';
import Program from '../views/Starter/Program.vue';
import MapPage from '../views/Starter/Map.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          components: { default: Starter }
        },
        {
          path: 'exam',
          name: 'exam',
          components: { default: Exam }
        },
        {
          path: 'post',
          name: 'post',
          components: { default: CarePost }
        },
        {
          path: 'program',
          name: 'program',
          components: { default: Program }
        },
        {
          path: 'map',
          name: 'map',
          components: { default: MapPage }
        },
        {
          path: 'result',
          name: 'result',
          components: { default: Result }
        },
        {
          path: 'postdetail/:id',
          name: 'PostDetail',
          components: { default: PostDetail },
          props: true
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
