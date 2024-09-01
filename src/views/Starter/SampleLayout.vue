<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">
        <sidebar-item
          :link="{
            name: 'Home',
            path:'/',
            icon: 'ni ni-shop text-primary',
          }"
        >
          <sidebar-item :link="{ name: 'Lam bai test tam ly', path: '/exam' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Thu tuc hanh chinh', path: '/program' }"></sidebar-item>
          <sidebar-item :link="{ name: 'Chăm sóc', path: '/post' }"></sidebar-item>
          <sidebar-item :link="{ name: 'So do', path: '/map' }"></sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <!-- Các nút nổi -->
    <div class="floating-buttons">
      <div class="floating-button hotline-button" >
        <i class="fas fa-phone"></i> <!-- Biểu tượng hotline -->
        <span class="button-text">Hotline</span>
      </div>
      <div class="floating-button support-button" >
        <i class="fas fa-life-ring"></i> <!-- Biểu tượng hỗ trợ -->
        <span class="button-text">Hỗ Trợ</span>
      </div>
    </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from './SampleNavbar.vue';
import ContentFooter from './SampleFooter.vue';
import DashboardContent from '../Layout/Content.vue';
import { FadeTransition } from 'vue2-transitions';

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
  },
  methods: {
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('scrollbar-inner');

        docClasses.add('perfect-scrollbar-on');
      } else {
        docClasses.add('perfect-scrollbar-off');
      }
    }
  }
};
</script>
<style scoped>
.floating-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
}

.floating-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #007bff; /* Màu nền của nút */
  color: white;
  border-radius: 50%; /* Hình dạng tròn */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Thêm bóng cho nút */
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
}

.floating-button:hover {
  background-color: #bac1c7; /* Màu nền khi hover */
}

.floating-button .button-text {
  position: absolute;
  left: -30px; /* Hiển thị bên dưới nút */
  white-space: nowrap;
  display: none;
  background-color: #1172da;
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}

.floating-button:hover .button-text {
  display: block; /* Hiển thị văn bản khi hover */
}
</style>