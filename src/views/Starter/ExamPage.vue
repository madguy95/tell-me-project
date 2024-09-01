<template>
  <div class="bg-default" style="height: 100vh">
    <base-header class="pb-3 pt-5 pt-md-8 bg-default"> </base-header>
    <b-container fluid class="" style="min-height: calc(100vh - 100px)">
      <div class="container">
        <b-card class="mt-3">
          <b-card-header>
            <h4>Bài test Mức độ căng thẳng tâm lí BSRS-5</h4>
            <h4>
              Anh/ chị hãy nhớ lại 1 cách chi tiết trong một tuần gần đây( bao
              gồm cả hôm nay), mức độ mà những vấn đề sau khiến anh/ chị cảm
              thấy buồn phiền hoặc lo lắng. Xin vui lòng lựa chọn những câu trả
              lời phù hợp nhất với tình trạng của anh/chị.
            </h4>
          </b-card-header>
          <b-card-body>
            <b-form>
              <b-form-group label="Câu Hỏi">
                <p>{{ questions[currentQuestion].question }}</p>
                <b-form-radio-group v-model="selectedAnswer">
                  <b-form-radio
                    class="custom-radio"
                    v-for="(option, index) in questions[currentQuestion]
                      .options"
                    :key="index"
                    :value="option"
                  >
                    {{ option }}
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-button
                :disabled="currentQuestion === 0"
                @click="goToPreviousQuestion"
                class="mr-2"
              >
                Quay lại
              </b-button>
              <b-button
                :disabled="currentQuestion === questions.length - 1"
                @click="goToNextQuestion"
              >
                Câu tiếp
              </b-button>
            </b-form>
          </b-card-body>
          <b-card-footer>
            <router-link :to="{ name: 'result' }">
              <b-button :disabled="currentQuestion < questions.length - 1">
                Hoàn Thành
              </b-button>
            </router-link>
          </b-card-footer>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";

export default {
  name: "exam-page",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      currentQuestion: 0,
      selectedAnswer: null,
      questions: [
        {
          question:
            "Khó ngủ, ví dụ khó đi vào giấc ngủ, dễ bị tỉnh giấc hoặc thức dậy sớm?",
          options: [
            "Hoàn toàn không",
            "Một chút",
            "Vừa phải",
            "Nhiều",
            "Rất nhiều",
          ],
        },
        {
          question: "Cảm thấy lo lắng, căng thẳng?",
          options: [
            "Hoàn toàn không",
            "Một chút",
            "Vừa phải",
            "Nhiều",
            "Rất nhiều",
          ],
        },
        {
          question: "Cảm thấy dễ nổi cáu hoặc bực mình?",
          options: [
            "Hoàn toàn không",
            "Một chút",
            "Vừa phải",
            "Nhiều",
            "Rất nhiều",
          ],
        },
        {
          question: "Cảm thấy buồn rầu, tâm trạng chán nản?",
          options: [
            "Hoàn toàn không",
            "Một chút",
            "Vừa phải",
            "Nhiều",
            "Rất nhiều",
          ],
        },
        {
          question: "Cảm thấy thua kém người khác?",
          options: [
            "Hoàn toàn không",
            "Một chút",
            "Vừa phải",
            "Nhiều",
            "Rất nhiều",
          ],
        },
      ],
    };
  },
  methods: {
    goToPreviousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion -= 1;
        this.selectedAnswer = null; // Reset selected answer
      }
    },
    goToNextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion += 1;
        this.selectedAnswer = null; // Reset selected answer
      }
    },
  },
};
</script>
<style>
.starter-page {
  min-height: calc(100vh - 380px);
}
.custom-radio {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
