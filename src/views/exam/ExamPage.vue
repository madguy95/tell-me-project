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
            Bạn sắp được chuyển tới các câu hỏi của bài kiểm tra
            <strong>{{ examIds.join(", ") }}</strong
            >. Vui lòng nhấn Tiếp tục để bắt đầu quá trình kiểm tra hoặc Trở về
            để chọn lại bài kiểm tra sẽ thực hiện.
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
              <b-button class="btn-common btn-yes" block @click="handleConfirm"
                >Tiếp tục</b-button
              >
            </b-col>
          </b-row>
        </b-modal>
        <div>
          <b-form>
            <b-form-group>
              <div class="question-box">
                <p>
                  {{
                    currentQuestion !== questions.length - 1
                      ? `${questions[currentQuestion].type} - Câu ${questions[currentQuestion].numb}:`
                      : `***`
                  }}
                </p>
                <p class="content">
                  Anh/ chị có gặp tình trạng:
                  {{ questions[currentQuestion].question }}
                </p>
              </div>
              <h4 class="sub-note mt-2">
                {{ questionData[questions[currentQuestion].type].questionNote }}
              </h4>
              <b-form-radio-group v-model="questions[currentQuestion].answer">
                <b-form-radio
                  class="custom-radio"
                  v-for="(option, index) in questions[currentQuestion].options"
                  :key="index"
                  :value="index"
                >
                  {{ option }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-row class="justify-content-center">
              <b-col cols="5" class="text-center">
                <b-button
                  class="btn-common btn-back"
                  :disabled="currentQuestion === 0"
                  @click="goToPreviousQuestion"
                >
                  <i class="fas fa-long-arrow-alt-left"></i>
                </b-button>
              </b-col>
              <b-col
                cols="5"
                class="text-center"
                v-if="currentQuestion !== questions.length - 1"
              >
                <b-button class="btn-common btn-next" @click="goToNextQuestion">
                  <i class="fas fa-long-arrow-alt-right"></i>
                </b-button>
              </b-col>
              <b-col
                cols="5"
                class="text-center"
                v-if="currentQuestion === questions.length - 1"
              >
                <b-button class="btn-common btn-finish" @click="clickFinish">
                  Hoàn Thành
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import { db } from "@/plugins/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";
import { QUESTION_ARR, RESULT_ARR } from "../../constants";
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "ExamPage",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      examIds: this.$route.query.id || [],
      show: true,
      currentQuestion: 0,
      selectedAnswer: 0,
      questions: [],
      questionData: _.cloneDeep(RESULT_ARR),
    };
  },
  computed: {
    ...mapState(["user", "testerInfo"]),
  },
  created() {
    this.questions = this.examIds.reduce((acc, examId) => {
      if (QUESTION_ARR[examId]) {
        return acc.concat(_.cloneDeep(QUESTION_ARR[examId]));
      }
      return acc;
    }, []);
  },
  methods: {
    goToPreviousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion -= 1;
        this.selectedAnswer = 0; // Reset selected answer
      }
    },
    goToNextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion += 1;
        this.selectedAnswer = 0; // Reset selected answer
      }
    },
    handleConfirm() {
      this.show = false;
    },
    handleCancel() {
      this.$router.push("/home");
    },
    async clickFinish() {
      let pointObj = this.questions.reduce((total, el) => {
        if (!total[el.type]) {
          total[el.type] = 0;
        }
        if (el.type === "PHQ-9" && el.oneForAll && el.answer >= 1)
          total[el.type] = el.answer + 20;
        total[el.type] = el.answer + total[el.type];
        return total;
      }, {});
      await this.submitSurvey(pointObj);
      // console.log(this.questions);
      // console.log(pointObj);
      this.$router.push({ name: "result", query: { ...pointObj } });
    },
    async submitSurvey(pointObj) {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        const ip = response.data.ip;
        const colRef = collection(db, "surveys");
        const dataObj = {
          userId: this.user.uid || 'ANONYMOUS_USER',
          requestPublicIp: ip,
          result: pointObj,
          timestamp: new Date(),
          testerInfo
        };
        // console.log(dataObj);
        const docRef = await addDoc(colRef, dataObj);
        // console.log("Document was created with ID:", docRef.id);
        // console.log("Kết quả khảo sát đã được lưu thành công!");
        this.selectedResult = null;
      } catch (error) {
        console.error("Lỗi khi lưu khảo sát: ", error);
      }
    },
  },
  mounted() {},
};
</script>
<style>
.custom-radio {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
  min-height: 57px;
  border: 0.1em solid #1276a8;
  border-radius: 0.5em;
}

.custom-radio .custom-control-label {
  border-left: 0.1em solid #89b9d1;
  align-content: center;
  padding-left: 1em;
  flex: 1 1;
  min-height: 48px;

  /* Radio text */
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  /* identical to box height */
  text-align: justify;

  color: #00297b;
}

.custom-radio input[type="radio"] + .custom-control-label::before {
  position: absolute;
  left: -2.25rem;
  top: 1.5rem;
  width: 1.5rem;
  /* Adjust size */
  height: 1.5rem;
  /* Adjust size */
  border-radius: 50%;
  border: 1px solid #1276a8;
  /* Outer border color */
  background-color: #fff;
  /* Inner circle color when checked */
  transform: translateY(-50%);
}

.custom-radio input[type="radio"]:checked + .custom-control-label::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23f79c33'/%3e%3c/svg%3e");
  background-color: #f79c33;
  /* Inner dot color when checked */
  position: absolute;
  left: -1.5rem;
  top: 1.5rem;
  width: 1rem;
  /* Adjust size */
  height: 1rem;
  /* Adjust size */
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.alert-content {
  /* Vector */
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: justify;

  color: #ffffff;

  background: #1276a8;
}

.header-modal,
.content-modal {
  background: #1276a8 !important;
  color: #ffffff;
}

.header-text {
  color: #fff;
}

.btn-common {
  border-radius: 0.75rem;
  color: #fff;
  min-height: 57px;
}

.btn-cancel {
  background: #66c2f0;
}

.btn-yes {
  background: #f79c33;
}

.modal-backdrop {
  background-color: rgba(255, 255, 255, 0.5) !important;
  /* Màu trắng mờ với opacity 0.5 */
}

.container {
  background-color: #fff;
}

.question-box {
  background: #1276a8;
  color: #ffffff;
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.question-box p {
  color: #ffffff;
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.question-box .content {
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: justify;
}

.sub-note {
  /* Anh/chị hãy nhớ lại một cách chi tiết trong một tuần gần đây (bao gồm cả hôm nay), mức độ mà những vấn đề sau khiến anh/chị cảm thấy buồn phiền hoặc lo lắng. Xin vui lòng lựa chọn câu trả lời phù hợp nhất với tình trạng của anh/chị. */
  font-family: "FS Magistral";
  font-style: italic;
  font-weight: 300;
  font-size: 12px;
  line-height: 13px;
  text-align: justify;
  letter-spacing: 0.05em;

  color: #00297b;

  opacity: 0.75;
}

.btn-back,
.btn-next {
  /* Group 6 */

  width: 128px;
  height: 36px;
  color: #fff !important;
  background: #1276a8 !important;
  min-height: 36px;
  padding: 0.325rem;
}

.btn-finish {
  background: #f79c33 !important;
  width: 128px;
  height: 36px;
  min-height: 36px;
  padding: 0.325rem;
}
</style>
