<template>
  <div class="" style="">
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
        <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            eros felis, tincidunt a tincidunt eget, convallis vel est. Ut
            pellentesque ut lacus vel interdum.
          </p>
        </b-carousel-slide>
      </b-carousel>
    </base-header>
    <b-container fluid class="mt-3">
      <b-row
        class="d-flex align-items-center justify-content-center flex-column"
      >
        <b-col><h3 class="custom-text">Khảo sát sức khỏe tâm thần</h3></b-col>
        <b-col xl="6" md="6" class="mb-3">
          <router-link :to="{ name: 'exam' }">
            <b-button class="button-start text-center">
              <i
                class="fa-regular fa-file-lines my-2"
                style="font-size: 2rem"
              ></i>
              <strong>BẮT ĐẦU</strong>
            </b-button>
          </router-link>
        </b-col>
      </b-row>
      <div><h3 class="custom-text">Trạm thông tin</h3></div>
      <b-row class="d-flex align-items-center justify-content-center">
        <b-col md="6" xl="6">
          <b-row
            class="d-flex align-items-center justify-content-center"
            xl="6"
          >
            <b-col cols="6" sm="6" xl="6" md="6" class="mb-3">
              <router-link :to="{ name: 'program' }">
                <base-button icon class="button-common">
                  <span class="btn-inner--icon"
                    ><i class="fa-regular fa-file-lines my-2"></i
                  ></span>
                  <span class="btn-inner--text">Thủ tục hành chính</span>
                </base-button>
              </router-link>
            </b-col>
            <b-col cols="6" sm="6" md="6" xl="6" class="mb-3">
              <router-link :to="{ name: 'map' }">
                <base-button icon class="button-common">
                  <span class="btn-inner--icon"
                    ><i class="fa-solid fa-map-location-dot my-2"></i
                  ></span>
                  <span class="btn-inner--text">Sơ đồ</span>
                </base-button>
              </router-link>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="6" xl="6" class="mb-3">
          <router-link :to="{ name: 'program' }">
            <base-button icon class="button-common">
              <span class="btn-inner--icon"
                ><i class="fas fa-hand-holding-medical my-2"></i>
              </span>
              <span class="btn-inner--text">Chăm sóc bệnh nhân</span>
            </base-button>
          </router-link>
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

.my-carousel .carousel-control-prev,
.my-carousel .carousel-control-next {
  background-color: rgba(0, 0, 0, 0.5); /* Nền của các nút điều khiển */
  border-radius: 15px; /* Bo tròn hình ảnh bên trong carousel */
}
.my-carousel .carousel-inner {
  border-radius: 15px; /* Bo tròn hình ảnh bên trong carousel */
}
.my-carousel .carousel-inner img {
  border-radius: 15px; /* Bo tròn hình ảnh bên trong carousel */
}
.my-carousel .carousel-control-prev-icon,
.my-carousel .carousel-control-next-icon {
  filter: invert(1); /* Đổi màu biểu tượng điều khiển */
}
.custom-text {
  /* Khảo sát sức khỏe tâm thần */

  width: 100%;
  height: 36px;
  left: 20px;
  top: 412px;

  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 27.5px;
  line-height: 36px;
  /* identical to box height */
  text-align: center;

  color: #0635a1;
}
.button-start {
  /* Vector_16 */
  width: 100%;
  height: 76px;

  background: #f79c33;

  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 700;
  font-size: 27.5px;
  line-height: 38px;
  /* identical to box height */
  text-align: center;

  color: #ffffff;
}
.button-common {
  height: 75px;
  width: 100%;
  color: #fff;
  background: linear-gradient(90deg, #62c0ef 0%, #3263ce 100%);
}
</style>
