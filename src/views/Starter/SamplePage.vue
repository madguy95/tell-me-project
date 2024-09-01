<template>
  <div class="bg-default" style="">
    <base-header class="pb-3 pt-5 pt-md-8 bg-default">   
    <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="340"
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
           class="my-carousel"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            caption="First slide"
            text="Nulla vitae elit libero, a pharetra augue mollis interdum."
            img-src="https://picsum.photos/1024/340/?image=52"
          ></b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://picsum.photos/1024/340/?image=54">
            <h1>Hello world!</h1>
          </b-carousel-slide>

          <!-- Slides with image only -->
          <b-carousel-slide
            img-src="https://picsum.photos/1024/340/?image=58"
          ></b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                src="https://picsum.photos/1024/340/?image=55"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide
            caption="Blank Image"
            img-blank
            img-alt="Blank image"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse eros felis, tincidunt a tincidunt eget, convallis vel
              est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>
        </b-carousel> 
    </base-header>
    <b-container fluid class="mt-3">
      <b-row class="row-type1">
        <b-col xl="6" md="6" class="mb-3">
          <router-link :to="{ name: 'exam' }">
            <b-card class="text-center card-hover card-item bg-info">
              <i
                class="fa-regular fa-file-lines my-2"
                style="font-size: 2rem"
              ></i>
              <b-card-text class="h1 text-secondary">
                <strong>Làm Bài Test Tâm Lý</strong>
              </b-card-text>
            </b-card>
          </router-link>
        </b-col>
        <b-col md="6" xl="6" class="mb-3">
          <router-link :to="{ name: 'program' }">
            <b-card class="text-center card-hover card-item bg-warning">
              <i class="far fa-newspaper my-2" style="font-size: 2rem"></i>
              <b-card-text class="h1 text-secondary">
                <strong>Các Chương Trình Đang Hoạt Động</strong>
              </b-card-text>
            </b-card>
          </router-link>
        </b-col>
      </b-row>
      <b-row class="row-type1">
        <b-col md="6" xl="6" class="mb-3">
          <router-link :to="{ name: 'map' }">
          <b-card class="text-center card-hover card-item" style="background-color: #3fba83;">
            <i
              class="fa-solid fa-map-location-dot my-2"
              style="font-size: 2rem"
            ></i>
            <b-card-text class="h1 text-secondary">
              <strong>Sơ đồ bệnh viện</strong>
            </b-card-text>
          </b-card>
          </router-link>
        </b-col>
        <b-col md="6" xl="6" class="mb-3">
          <b-card class="text-center card-hover card-item" style="background-color: #C8ACD6;">
            <i class="fas fa-robot my-2" style="font-size: 2rem"></i>
            <b-card-text class="h1 text-secondary">
              <strong>Hỗ Trợ</strong>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";

export default {
  name: "starter-page",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {};
  },
  method: {
    goToRoute() {
      this.$router.push({ name: "exam" });
    },
  },
};
</script>
<style>
.starter-page {
  min-height: calc(100vh - 380px);
}
.my-carousel {
  border: 2px solid #aed0f5; /* Màu viền (có thể thay đổi theo ý muốn) */
  border-radius: 15px; /* Làm cho viền có góc bo tròn */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Thêm bóng cho carousel */
}

.my-carousel .carousel-control-prev, .my-carousel .carousel-control-next {
  background-color: rgba(0, 0, 0, 0.5); /* Nền của các nút điều khiển */
   border-radius: 15px; /* Bo tròn hình ảnh bên trong carousel */
}
.my-carousel .carousel-inner {
  border-radius: 15px; /* Bo tròn hình ảnh bên trong carousel */
}
.my-carousel .carousel-inner img {
  border-radius: 15px; /* Bo tròn hình ảnh bên trong carousel */
}
.my-carousel .carousel-control-prev-icon, .my-carousel .carousel-control-next-icon {
  filter: invert(1); /* Đổi màu biểu tượng điều khiển */
}
</style>
