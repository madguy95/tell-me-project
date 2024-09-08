<template>
  <div class="" style="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container">
        <b-modal
            v-model="show"
            title="Thông báo"
            ok-title="Tiếp tục"
            header-class="header-modal"
            content-class="content-modal"
            title-class="title-modal"
            cancel-title="Trở về"
            @ok="handleConfirm"
            @cancel="handleCancel"
            hide-footer
            centered
          >
            <template #modal-header>
              <div class="d-block w-100 text-center">
                <h3 class="header-text">Thông báo</h3>
              </div>
            </template>
            <p class="alert-content">
              Website hiện đang trong quá trình phát triển nên không tránh khỏi những sai sót. Bạn có chắc chắn muốn truy cập?
            </p>
            <b-row>
              <b-col cols="6">
                <b-button
                  class="btn-common btn-cancel"
                  block
                  @click="handleCancel"
                  >Trở về</b-button
                >
              </b-col>
              <b-col cols="6">
                <b-button
                  class="btn-common btn-yes"
                  block
                  @click="handleConfirm"
                  >Tiếp tục</b-button
                >
              </b-col>
            </b-row>
          </b-modal>
        <div class="d-flex justify-content-center">
          <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="360"
            class="my-carousel"
            style="max-width: 100%; min-height: 241px; max-height: 50vh"
          >
            <!-- Text slides with image -->
            <b-carousel-slide
              img-src="/img/banner/banner1.png"
            ></b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="/img/banner/banner2.png">
              <!-- <h1>Yoga Cười</h1> -->
            </b-carousel-slide>
            <!-- Slides with custom text -->
            <b-carousel-slide img-src="/img/banner/banner3.png">
              <!-- <h1>Yoga Cười</h1> -->
            </b-carousel-slide>
            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <!-- <b-carousel-slide>
            <template #img>
              <img
                class="d-block img-fluid w-100"
                src="https://picsum.photos/1024/360/?image=55"
                alt="image slot"
              />
            </template>
          </b-carousel-slide> -->

            <!-- Slide with blank fluid image to maintain slide aspect ratio -->
            <!-- <b-carousel-slide
            caption="Blank Image"
            img-blank
            img-alt="Blank image"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse eros felis, tincidunt a tincidunt eget, convallis vel
              est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide> -->
          </b-carousel>
        </div>
        <b-row
          class="mt-3 d-flex align-items-center justify-content-center flex-column"
        >
          <b-col><h3 class="custom-text">Khảo sát sức khỏe tâm thần</h3></b-col>
          <b-col xl="6" md="6" class="mb-3">
            <router-link :to="{ name: 'exam-list' }">
              <b-button class="button-start text-center">
                <strong>BẮT ĐẦU</strong>
              </b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-4"><h3 class="custom-text">Trạm thông tin</h3></div>
        <b-row class="d-flex align-items-center justify-content-center">
          <b-col md="6" xl="6">
            <b-row
              class="d-flex align-items-center justify-content-center"
              xl="6"
            >
              <b-col cols="6" sm="6" xl="6" md="6" class="mb-3">
                <router-link :to="{ name: 'procedure' }">
                  <base-button icon class="button-common">
                    <span class="btn-inner--text">Thủ tục hành chính</span>
                  </base-button>
                </router-link>
              </b-col>
              <b-col cols="6" sm="6" md="6" xl="6" class="mb-3">
                <router-link :to="{ name: 'map' }">
                  <base-button icon class="button-common">
                    <span class="btn-inner--text">Sơ đồ</span>
                  </base-button>
                </router-link>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="6" xl="6" class="mb-3">
            <router-link :to="{ name: 'health-post' }">
              <base-button icon class="button-common">
                <span class="btn-inner--text">Chăm sóc bệnh nhân</span>
              </base-button>
            </router-link>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";

export default {
  name: "HomePage",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    goToRoute() {
      this.$router.push({ name: "exam" });
    },
    handleConfirm() {
      this.show = false;
    },
    handleCancel() {
      this.$router.push("/");
    },
  },
};
</script>
<style>
.starter-page {
  /* min-height: calc(100vh - 380px); */
}
.my-carousel {
  border: 2px solid #aed0f5; /* Màu viền (có thể thay đổi theo ý muốn) */
  border-radius: 15px; /* Làm cho viền có góc bo tròn */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Thêm bóng cho carousel */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  width: 100%;
  height: 100%;
  object-fit: cover; /* Đảm bảo ảnh phủ đầy khung mà không bị méo */
}
.my-carousel .carousel-control-prev-icon,
.my-carousel .carousel-control-next-icon {
  filter: invert(1); /* Đổi màu biểu tượng điều khiển */
}
.custom-text {
  /* Khảo sát sức khỏe tâm thần */

  width: 100%;
  min-height: 36px;

  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 1.5em;
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
  /* Thủ tục hành chính */
  min-height: 75px;
  width: 100%;
  color: #fff;
  background-color: #1276a8;
  font-family: "FS Magistral";
  font-size: 1em;
  line-height: 23px;
  text-align: center;
}
</style>
