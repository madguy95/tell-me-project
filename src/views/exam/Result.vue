<template>
  <div class="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container">
        <div>
          <h1 class="text-center text-title">Kết quả</h1>
        </div>
        <div
          v-for="(value, name, index) in pointLevel"
          :key="index"
          class="mt-3 result-box"
        >
          <h3 class="text-center result-title">
            {{ levelResults[name]["title"] }}
            <span></span>
          </h3>
          <h4 class="text-center result-sub-title">
            {{ levelResults[name]["subTitle"] }}
          </h4>
          <LevelIndicators
            :level="value"
            :maxLevel="levelResults[name].maxLevel"
          />
          <p class="text-center result-text">
            {{ levelResults[name][value] }}
          </p>
        </div>
        <div>
          <h1 class="text-center text-title">Khuyến nghị</h1>
        </div>
        <div class="">
          <p class="solution-text" v-html="results[maxLevel].advice"></p>

          <div
            v-for="(solution, index) in results[maxLevel].solutions"
            :key="index"
          >
            <template v-if="solution.type === 'program'">
              <p class="solution-text">- {{ solution.text }}</p>
              <img :src="solution.url" />
            </template>
            <template v-if="solution.type === 'video'">
              <p class="solution-text">- {{ solution.text }}</p>
              <b-embed
                type="iframe"
                aspect="16by9"
                :src="solution.url"
                allowfullscreen
              ></b-embed>
            </template>
          </div>
        </div>
        <div v-if="results[maxLevel].action" class="mt-3">
          <router-link
            :to="results[maxLevel].action.url"
            v-if="results[maxLevel].action.url"
          >
            <base-button icon class="button-common">
              <span class="btn-inner--text">{{
                results[maxLevel].action.text
              }}</span>
            </base-button>
          </router-link>
          <b-link
            :href="results[maxLevel].action.externalUrl"
            v-if="results[maxLevel].action.externalUrl"
          >
            <base-button icon class="button-common">
              <span class="btn-inner--text">{{
                results[maxLevel].action.text
              }}</span>
            </base-button>
          </b-link>
        </div>
        <div class="need-more mt-3">
          <div>
            <h1 class="text-center text-title">Có thể bạn sẽ cần</h1>
          </div>
          <b-row>
            <b-col cols="6" class="d-flex justify-content-center">
              <b-link
                href="https://www.facebook.com/groups/nguoinhanguoibenh.bvkcosotantrieu"
                class="icon-link d-flex"
              >
                <div class="image-container">
                  <img src="/img/icons/group.png" />
                </div>
                <div class="d-flex flex-column ml-1">
                  <span>Cộng đồng</span>
                  <span class="sub-text">người nhà người bệnh</span>
                </div>
              </b-link>
            </b-col>
            <b-col cols="6" class="d-flex justify-content-center">
              <b-link href="#" class="icon-link d-flex">
                <div class="image-container">
                  <img src="/img/icons/care.png" />
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
import LevelIndicators from "@/views/exam/LevelIndicators.vue";
import { RESULT_ARR } from "../../constants";
import _ from 'lodash';
const createSubObject = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export default {
  name: "ResultPage",
  components: {
    LevelIndicators,
  },
  computed: {
    // currentLevel() {
    //   if (this.point >= 15) {
    //     return 4;
    //   } else if (this.point >= 10) {
    //     return 3;
    //   } else if (this.point >= 6) {
    //     return 2;
    //   } else {
    //     return 1;
    //   }
    // },
  },
  data() {
    return {
      pointObj: createSubObject(this.$route.query || {}, ["GAD-7", "PHQ-9", "BSRS-5"]),
      levelResults: { ..._.cloneDeep(RESULT_ARR) },
      results: {
        1: {
          message: "Chúc mừng, bạn đã tự điều chỉnh cân bằng cảm xúc rất tốt.",
          advice:
            'Hãy cố gắng duy trì thể trạng sức khỏe tâm thần hiện tại để cùng đồng hành với bệnh nhân bạn nhé! <br>Bạn có thể tìm thấy các thông tin hữu ích cho quá trình chăm bệnh khi trở lại Trang chủ và nhấn vào mục <strong style="color: #F79C33;">Trạm thông tin</strong>.',
          solutions: [],
          action: {
            text: "Quay lại trang chủ",
            url: "/home",
          },
        },
        2: {
          message:
            "Bạn có mức độ căng thẳng nhẹ. Chúng tôi khuyến khích bạn nên tìm kiến sự hỗ trợ tâm lý như nói chuyện với gia đình, bạn bè để chia sẻ cảm xúc.",
          advice:
            'Trò chuyện, chia sẻ với những người xung quanh có thể giúp bạn tìm thấy sự đồng cảm và ổn định hơn về tâm lý. <br>Bạn có thể tham gia <strong style="color: #F79C33;">Cộng đồng người nhà người bệnh</strong> để cùng trò chuyện, trao đổi với  các chuyên gia và người nhà người bệnh khác.',
          solutions: [],
          action: {
            text: "Tham gia ngay",
            externalUrl: "https://www.facebook.com/groups/nguoinhanguoibenh.bvkcosotantrieu",
          },
        },
        3: {
          message:
            "Bạn có mức độ căng thẳng tâm lí cao. Bạn nên thực hành các liệu pháp thư giãn hoặc tìm đến bác sĩ tư vấn tâm lí.",
          advice:
            'Bạn nên có sự tư vấn của chuyên gia tâm lý hoặc bác sĩ chuyên khoa tâm thần để đảm bảo sức khỏe bản thân cũng như quá trình chăm sóc cho người bệnh. <br>Bằng cách nhấn vào nút Liên hệ ngay dưới đây, bạn sẽ được gặp gỡ các <strong style="color: #F79C33;">chuyên gia</strong> uy tín có thể đánh giá và hỗ trợ tình hình tâm lý hiện tại cho bạn.',
          solutions: [
            // {
            //   type: "program",
            //   text: "Tham gia chương trinh Yoga cười",
            //   url: "/img/brand/slide1.png",
            // },
            // {
            //   type: "video",
            //   text: "Liệu pháp thở",
            //   url: "https://www.youtube.com/embed/N52NMa8cZXM",
            // },
          ],
          action: {
            text: "Liên hệ ngay",
            externalUrl:
              "https://docs.google.com/document/d/1odSDHdKU44QKUy4vFu9wYsgVJTzi3auyjD6aL6ePHAc/edit",
          },
        },
        4: {
          message:
            "Bạn đang có mức độ căng thẳng tâm lí rất cao, bạn nên đến gặp bác sĩ tâm lí hoặc đến bệnh viện để được đánh giá thêm.",
          advice:
            'Bạn cần nghiêm túc quan tâm đến vấn đề tâm lý của mình để đảm bảo sức khỏe bản thân cũng như quá trình chăm sóc cho người bệnh. <br>Bằng cách nhấn vào nút Liên hệ ngay dưới đây, bạn sẽ được gặp gỡ các <strong style="color: #F79C33;">chuyên gia</strong> uy tín có thể đánh giá và hỗ trợ tình hình tâm lý hiện tại cho bạn.',
          solutions: [],
          action: {
            text: "Liên hệ ngay",
            externalUrl:
              "https://docs.google.com/document/d/1odSDHdKU44QKUy4vFu9wYsgVJTzi3auyjD6aL6ePHAc/edit",
          },
        },
        5: {
          message:
            "Bạn đang có mức độ căng thẳng tâm lí rất cao, bạn nên đến gặp bác sĩ tâm lí hoặc đến bệnh viện để được đánh giá thêm.",
          advice:
            'Bạn cần ngay lập tức trao đổi với bác sĩ chuyên khoa tâm thần về tình trạng sức khỏe của bản thân để nhận được liệu pháp điều trị thích hợp. <br>Bằng cách nhấn vào nút Liên hệ ngay dưới đây, bạn sẽ được gặp gỡ các <strong style="color: #F79C33;">chuyên gia</strong> uy tín có thể đánh giá và hỗ trợ tình hình tâm lý hiện tại cho bạn.',
          solutions: [],
          action: {
            text: "Liên hệ ngay",
            externalUrl:
              "https://docs.google.com/document/d/1odSDHdKU44QKUy4vFu9wYsgVJTzi3auyjD6aL6ePHAc/edit",
          },
        },
      },
    };
  },
  computed: {
    pointLevel() {
      return Object.keys(this.pointObj).reduce((arr, el) => {
        if (!arr[el]) arr[el] = 0;

        if (this.pointObj[el] >= 20) {
          arr[el] = 5;
        } else if (this.pointObj[el] >= 15) {
          arr[el] = 4;
        } else if (this.pointObj[el] >= 10) {
          arr[el] = 3;
        } else if (this.pointObj[el] >= 5) {
          arr[el] = 2;
        } else {
          arr[el] = 1;
        }
        return arr;
      }, {});
    },
    maxLevel() {
      return Math.max(...Object.values(this.pointLevel));
    },
  },
  methods: {
    currentLevel(point) {
      // console.log(point);
    },
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
  color: #f79c33;
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
.result-title,
.result-sub-title {
  color: #00297b;
  font-family: "FS Magistral";
  font-style: normal;
}
.result-title {
  font-weight: 600;
}
.result-sub-title {
  font-weight: 500;
}
</style>
