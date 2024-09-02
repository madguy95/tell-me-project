<template>
  <div class="" style="height: 100vh">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3">
      <div class="container">
        <div>
          <h1 class="text-center text-title">Kết quả</h1>
        </div>
        <div class="result-box">
          <LevelIndicators :level="currentLevel" />
          <p class="result-text">
            Chúc mừng, bạn đã tự điều chỉnh cân bằng cảm xúc rất tốt!
          </p>
        </div>
        <div>
          <h1 class="text-center text-title">Khuyến nghị</h1>
        </div>
        <div class="">
          <p class="solution-text" v-html="results[currentLevel].advice"></p>

          <div
            v-for="(solution, index) in results[currentLevel].solutions"
            :key="index"
          >
            <template v-if="solution.type === 'program'">
              <p class="solution-text">{{ solution.text }}</p>
              <img :src="solution.url" />
            </template>
            <template v-if="solution.type === 'video'">
              <p class="solution-text">{{ solution.text }}</p>
              <b-embed
                type="iframe"
                aspect="16by9"
                :src="solution.url"
                allowfullscreen
              ></b-embed>
            </template>
          </div>
        </div>
        <div v-if="results[currentLevel].action" class="mt-3">
          <router-link :to="results[currentLevel].action.url">
            <base-button icon class="button-common">
              <span class="btn-inner--text">{{
                results[currentLevel].action.text
              }}</span>
            </base-button>
          </router-link>
        </div>
        <div class="need-more mt-3">
          <div>
            <h1 class="text-center text-title">Có thể bạn sẽ cần</h1>
          </div>
          <b-row>
            <b-col cols="6">
              <b-link href="#" class="icon-link d-flex">
                <div class="image-container">
                  <img src="img/icons/group.png" />
                </div>
                <div class="d-flex flex-column ml-1">
                  <span>Cộng đồng</span>
                  <span class="sub-text">người nhà người bệnh</span>
                </div>
              </b-link>
            </b-col>
            <b-col cols="6">
              <b-link href="#" class="icon-link d-flex">
                <div class="image-container">
                  <img src="img/icons/care.png" />
                </div>
                <div class="d-flex flex-column ml-1">
                  <span>Phương pháp</span>
                  <span class="sub-text">trị liệu tâm lý</span>
                </div>
              </b-link>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import LevelIndicators from "@/views/Starter/LevelIndicators.vue";
// Hàm để tạo số ngẫu nhiên từ 1 đến 4
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  name: "ResultsComponent",
  components: {
    LevelIndicators,
  },
  computed: {
    currentLevel() {
      if (this.point >= 15) {
        return 4;
      } else if (this.point >= 10) {
        return 3;
      } else if (this.point >= 6) {
        return 2;
      } else {
        return 1;
      }
    },
  },
  data() {
    return {
      point: this.$route.query.point | 0,
      results: {
        1: {
          advice:
            "Hãy cố gắng duy trì thể trạng sức khỏe tâm thần hiện tại để cùng đồng hành với bệnh nhân bạn nhé! Bạn có thể tìm thấy các thông tin hữu ích cho quá trình chăm bệnh khi trở lại Trang chủ và nhấn vào mục Trạm thông tin.",
          solutions: [],
          action: {
            text: "Quay lại trang chủ",
            url: "/",
          },
        },
        2: {
          advice:
            "Trò chuyện, chia sẻ với những người xung quanh có thể giúp bạn tìm thấy sự đồng cảm và ổn định hơn về tâm lý. Bạn có thể tham gia Cộng đồng người nhà người bệnh để cùng trò chuyện, trao đổi với  các chuyên gia và người nhà người bệnh khác.",
          solutions: [],
          action: {
            text: "Tham gia ngay",
            url: "/",
          },
        },
        3: {
          advice:
            "Một số hoạt động có thể có ích cho tình trạng tâm lý hiện tại của bạn:",
          solutions: [
            {
              type: "program",
              text: "Tham gia chương trinh Yoga cười",
              url: "img/brand/slide1.png",
            },
            {
              type: "video",
              text: "Liệu pháp thở",
              url: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0",
            },
          ],
          action: {
            text: "Quay lại trang chủ",
            url: "/",
          },
        },
        4: {
          advice:
            "Bạn cần nghiêm túc quan tâm đến vấn đề tâm lý của mình để đảm bảo sức khỏe bản thân cũng như quá trình chăm sóc cho người bệnh. Bằng cách nhấn vào nút Liên hệ ngay dưới đây, bạn sẽ được gặp gỡ các <strong style=\"color: #F79C33;\">chuyên gia</strong> uy tín có thể đánh giá và hỗ trợ tình hình tâm lý hiện tại cho bạn.",
          solutions: [],
          action: {
            text: "Liên hệ ngay",
            url: "/",
          },
        },
      },
    };
  },
};
</script>
<style scoped>
.starter-page {
  min-height: calc(100vh - 380px);
}
.result-box {
  border: 0.1em solid #00297b;
  border-radius: 0.5em;
  padding: 0.5em;
}
.result-text {
  /* Chúc mừng, bạn đã tự điều chỉnh cân bằng cảm xúc rất tốt! */
  margin-top: 1.5em;
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: justify;

  color: #00297b;
}
.text-title {
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 700;
  font-size: 27.5px;
  line-height: 38px;
  text-align: justify;

  color: #00297b;
}

.solution-text {
  /* Hãy cố gắng duy trì thể trạng sức khỏe tâm thần hiện tại để cùng đồng hành với bệnh nhân bạn nhé! Bạn có thể tìm thấy các thông tin hữu ích cho quá trình chăm bệnh khi trở lại Trang chủ và nhấn vào mục Trạm thông tin. */

  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: justify;

  color: #00297b;
}
.solution-text strong {
  color: #F79C33;
}
.image-container {
  width: 41px; /* Kích thước phần tử chứa */
  height: 41px;
  overflow: hidden; /* Đảm bảo ảnh không vượt ra ngoài phần tử */
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Chỉnh sửa cách hình ảnh fit vào phần tử */
}
.need-more span {
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;

  color: #00297b;
  overflow: hidden;
  text-overflow: ellipsis;
}
.need-more .sub-text {
  font-weight: 250;
  font-size: 12px;
  line-height: 16px;
}
/* .text-center {
  font-family: "FS Magistral"; */
/* font-style: normal; */
/* } */
</style>
