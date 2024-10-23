<template>
  <div class="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <h2 class="my-4">Quản lý các bài test và đánh giá</h2>

      <!-- Tabs for each test type and evaluation -->
      <b-tabs v-model="activeTab" fill>


        <!-- Plus button to add new test tab -->
        <b-tab @click="addNewTest" title="+" disabled> </b-tab>
        <!-- Existing test tabs -->
        <b-tab v-for="(test, tIndex) in tests" :key="tIndex" :title="test.name">
          <b-card class="mt-3">
            <div
              v-for="(question, qIndex) in test.questions"
              :key="qIndex"
              class="mb-3"
            >
              <b-card-header
                @click="toggleExpand(tIndex, qIndex)"
                class="d-flex justify-content-between align-items-center"
              >
                <span>{{ `${qIndex + 1}. ${question.content}` }}</span>
                <b-button
                  v-if="question.expanded"
                  variant="danger"
                  @click.stop="deleteQuestion(tIndex, qIndex)"
                >
                  Xóa câu hỏi
                </b-button>
              </b-card-header>

              <b-collapse v-model="question.expanded">
                <b-card-body>
                  <b-form-group label="Nội dung câu hỏi:">
                    <b-form-input
                      v-model="question.content"
                      placeholder="Nhập nội dung câu hỏi"
                    ></b-form-input>
                  </b-form-group>

                  <h5>Đáp án và trọng số điểm</h5>
                  <b-table
                    class="table-responsive"
                    :items="question.answers"
                    :fields="answerFields"
                    striped
                    bordered
                    style="width: 100"
                  >
                    <template #cell(answer)="data">
                      <b-form-input v-model="data.item.answer" style="min-width: 200px;"></b-form-input>
                    </template>
                    <template #cell(score)="data">
                      <b-form-input
                        type="number"
                        v-model="data.item.score"
                      ></b-form-input>
                    </template>
                    <template #cell(actions)="data">
                      <b-button
                        variant="danger"
                        @click="deleteAnswer(tIndex, qIndex, data.index)"
                        >Xóa</b-button
                      >
                    </template>
                  </b-table>

                  <b-button variant="success" @click="addAnswer(tIndex, qIndex)"
                    >Thêm đáp án</b-button
                  >
                </b-card-body>
              </b-collapse>
            </div>

            <b-button variant="primary" @click="addQuestion(tIndex)"
              >Thêm câu hỏi mới</b-button
            >
          </b-card>
        </b-tab>

        <!-- Tab for evaluation -->
        <b-tab title="Đánh giá">
          <b-card class="mt-3">
            <h5>Quản lý nội dung đánh giá</h5>
            <b-table
              :items="evaluations"
              :fields="evaluationFields"
              striped
              bordered
            >
              <template #cell(minScore)="data">
                <b-form-input
                  type="number"
                  v-model="data.item.minScore"
                ></b-form-input>
              </template>
              <template #cell(maxScore)="data">
                <b-form-input
                  type="number"
                  v-model="data.item.maxScore"
                ></b-form-input>
              </template>
              <template #cell(evaluation)="data">
                <b-form-textarea
                  v-model="data.item.evaluation"
                ></b-form-textarea>
              </template>
              <template #cell(actions)="data">
                <b-button variant="danger" @click="deleteEvaluation(data.index)"
                  >Xóa</b-button
                >
              </template>
            </b-table>

            <b-button variant="success" @click="addEvaluation"
              >Thêm mức đánh giá</b-button
            >
          </b-card>
        </b-tab>
      </b-tabs>

      <!-- Save button -->
      <b-button variant="success" class="mt-4" @click="saveChanges"
        >Lưu thay đổi</b-button
      >
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0, // Tab đang hoạt động
      tests: [
        {
          name: "GAD-7",
          questions: [
            {
              content: "Cảm thấy lo lắng, lo âu hoặc dễ cáu giận",
              expanded: false,
              answers: [
                { answer: "Không ngày nào", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như hàng ngày", score: 3 },
              ],
            },
            {
              content: "Không thể ngừng lại hoặc kiểm soát được sự lo lắng",
              expanded: false,
              answers: [
                { answer: "Không ngày nào", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như hàng ngày", score: 3 },
              ],
            },
            {
              content: "Khó thư giãn",
              expanded: false,
              answers: [
                { answer: "Không ngày nào", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như hàng ngày", score: 3 },
              ],
            },
          ],
        },
        {
          name: "PHQ-9",
          questions: [
            {
              content: "Câu hỏi 1",
              expanded: false,
              answers: [
                { answer: "Đáp án A", score: 8 },
                { answer: "Đáp án B", score: 3 },
              ],
            },
          ],
        },
        {
          name: "BSRS-5",
          questions: [
            {
              content: "Câu hỏi 1",
              expanded: false,
              answers: [
                { answer: "Đáp án X", score: 6 },
                { answer: "Đáp án Y", score: 4 },
              ],
            },
          ],
        },
      ],
      answerFields: [
        { key: "answer", label: "Đáp án" },
        { key: "score", label: "Trọng số điểm" },
        { key: "actions", label: "Hành động" },
      ],
      evaluations: [
        { minScore: 0, maxScore: 50, evaluation: "Mức đánh giá 1" },
        { minScore: 51, maxScore: 80, evaluation: "Mức đánh giá 2" },
        { minScore: 81, maxScore: 100, evaluation: "Mức đánh giá 3" },
      ],
      evaluationFields: [
        { key: "minScore", label: "Điểm tối thiểu" },
        { key: "maxScore", label: "Điểm tối đa" },
        { key: "evaluation", label: "Nội dung đánh giá" },
        { key: "actions", label: "Hành động" },
      ],
    };
  },
  methods: {
    toggleExpand(tIndex, qIndex) {
      this.tests[tIndex].questions[qIndex].expanded =
        !this.tests[tIndex].questions[qIndex].expanded;
    },
    addAnswer(tIndex, qIndex) {
      this.tests[tIndex].questions[qIndex].answers.push({
        answer: "",
        score: 0,
      });
    },
    deleteAnswer(tIndex, qIndex, aIndex) {
      this.tests[tIndex].questions[qIndex].answers.splice(aIndex, 1);
    },
    addQuestion(tIndex) {
      this.tests[tIndex].questions.push({
        content: "Câu hỏi mới",
        expanded: true,
        answers: [{ answer: "", score: 0 }],
      });
    },
    deleteQuestion(tIndex, qIndex) {
      this.tests[tIndex].questions.splice(qIndex, 1);
    },
    addNewTest() {
      this.tests.push({
        name: `Bài test mới ${this.tests.length + 1}`,
        questions: [
          {
            content: "Câu hỏi mới",
            expanded: false,
            answers: [{ answer: "", score: 0 }],
          },
        ],
      });
      this.activeTab = this.tests.length - 1; // Chuyển tới tab mới
    },
    addEvaluation() {
      this.evaluations.push({ minScore: 0, maxScore: 100, evaluation: "" });
    },
    deleteEvaluation(index) {
      this.evaluations.splice(index, 1);
    },
    saveChanges() {
      // Lưu thay đổi logic ở đây
      console.log("Saved tests:", this.tests);
      console.log("Saved evaluations:", this.evaluations);
    },
  },
};
</script>

<style scoped>
.question-item {
  margin-bottom: 20px;
}
</style>
