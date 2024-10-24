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
        <b-tab v-for="(test, tIndex) in tests" :key="tIndex" :title="test.code">
          <b-card class="mt-3">
            <b-form-input
              v-model="test.name"
              placeholder="Nhập tên"
            ></b-form-input>
            <b-form-input
              v-model="test.description"
              placeholder="Nhập tên"
            ></b-form-input>
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
                  <div class="table-responsive">
                  <b-table
                    :items="question.answers"
                    :fields="answerFields"
                    striped
                    bordered
                    style="width: 100"
                  >
                    <template #cell(answer)="data">
                      <b-form-input
                        v-model="data.item.answer"
                        style="min-width: 200px"
                      ></b-form-input>
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
                </div>
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
            <div class="table-responsive">
              <b-table
                :items="evaluations"
                :fields="evaluationFields"
                striped
                bordered
                @row-clicked="toggleRowDetails"
                responsive
              >
                <template #cell(level)="data">
                  <b-form-input
                    type="number"
                    v-model="data.item.level"
                    disabled
                  ></b-form-input>
                </template>
                <template #cell(minScore)="data">
                  <b-form-input
                    type="number"
                    v-model="data.item.minScore"
                  ></b-form-input>
                </template>
                <template #cell(evaluation)="data">
                  <b-form-textarea
                    v-model="data.item.evaluation"
                  ></b-form-textarea>
                </template>
                <template #cell(actions)="data">
                  <b-button
                    variant="danger"
                    @click="deleteEvaluation(data.index)"
                    >Xóa</b-button
                  >
                </template>
                <template #row-details="{ item }">
                  <b-card v-if="item._showDetails">
                    <b-card-title>Solutions</b-card-title>
                    <quill-editor
                      v-model="item.solution"
                      :options="editorOptions"
                    />
                  </b-card>
                </template>
              </b-table>
            </div>

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
import { db } from "@/plugins/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  limit,
} from "firebase/firestore";

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css"; // Quill core CSS
import "quill/dist/quill.snow.css"; // Quill theme
import "quill/dist/quill.bubble.css"; // Quill bubble theme (nếu cần)
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      editorData: "<p>Hello, Quill!</p>", // Dữ liệu khởi tạo cho editor
      editorOptions: {
        // Cấu hình tùy chọn cho Quill
        placeholder: "Nhập văn bản ở đây...", // Placeholder
        theme: "snow", // Chọn theme: snow hoặc bubble
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            ["clean"], // Xóa định dạng
          ],
        },
      },
      activeTab: 0, // Tab đang hoạt động
      exams: {},
      tests: [
        {
          name: "GAD-7",
          code: "GAD-7",
          description: "Sàng lọc Rối loạn lo âu lan tỏa",
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
            {
              content: "Bồn chồn đến mức khó ngồi yên được",
              expanded: false,
              answers: [
                { answer: "Không ngày nào", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như hàng ngày", score: 3 },
              ],
            },
            {
              content: "Dễ bực bội hoặc dễ cáu kỉnh",
              expanded: false,
              answers: [
                { answer: "Không ngày nào", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như hàng ngày", score: 3 },
              ],
            },
            {
              content:
                "Cảm giác sợ sệt như thể có điều gì đó tồi tệ có thể xảy ra",
              expanded: false,
              answers: [
                { answer: "Không ngày nào", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như hàng ngày", score: 3 },
              ],
            },
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
          ],
        },
        {
          name: "PHQ-9",
          code: "PHQ-9",
          description: "Sàng lọc Trầm cảm",
          questions: [
            {
              content: "Ít quan tâm hoặc ít thích thú làm mọi việc.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content: "Cảm thấy buồn bã, chán nản hoặc tuyệt vọng.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content:
                "Khó vào giấc ngủ, khó ngủ thẳng giấc hoặc ngủ quá nhiều.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content: "Cảm thấy mệt mỏi hoặc có ít năng lượng.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content: "Kém ăn hoặc ăn quá nhiều.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content:
                "Cảm thấy tồi tệ về bản thân - hoặc rằng bạn là một người thất bại hoặc khiến bản thân hoặc gia đình của bạn thất vọng.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content:
                "Khó tập trung vào mọi việc, chẳng hạn như đọc báo hoặc xem truyền hình.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content:
                "Di chuyển hoặc nói quá chậm đến mức người khác để ý. Hoặc ngược lại – cảm giác bồn chồn hoặc bứt rứt đến mức bạn đi đi lại lại nhiều hơn bình thường.",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
            {
              content:
                "Nghĩ rằng mình nên chết hay muốn tự làm tổn thương bản thân theo cách nào đó",
              expanded: false,
              answers: [
                { answer: "Không có", score: 0 },
                { answer: "Vài ngày", score: 1 },
                { answer: "Hơn nửa số ngày", score: 2 },
                { answer: "Gần như mọi ngày", score: 3 },
              ],
            },
          ],
        },
        {
          name: "BSRS-5",
          code: "BSRS-5",
          description: "Đánh giá mức độ căng thẳng tâm lý",
          questions: [
            {
              content:
                "Khó ngủ, ví dụ khó đi vào giấc ngủ, dễ bị tỉnh giấc hoặc thức dậy sớm?",
              expanded: false,
              answers: [
                { answer: "Hoàn toàn không", score: 0 },
                { answer: "Một chút", score: 1 },
                { answer: "Vừa phải", score: 2 },
                { answer: "Nhiều", score: 3 },
                { answer: "Rất nhiều", score: 4 },
              ],
            },
            {
              content: "Cảm thấy lo lắng, căng thẳng?",
              expanded: false,
              answers: [
                { answer: "Hoàn toàn không", score: 0 },
                { answer: "Một chút", score: 1 },
                { answer: "Vừa phải", score: 2 },
                { answer: "Nhiều", score: 3 },
                { answer: "Rất nhiều", score: 4 },
              ],
            },
            {
              content: "Cảm thấy dễ nổi cáu hoặc bực mình?",
              expanded: false,
              answers: [
                { answer: "Hoàn toàn không", score: 0 },
                { answer: "Một chút", score: 1 },
                { answer: "Vừa phải", score: 2 },
                { answer: "Nhiều", score: 3 },
                { answer: "Rất nhiều", score: 4 },
              ],
            },
            {
              content: "Cảm thấy buồn rầu, tâm trạng chán nản?",
              expanded: false,
              answers: [
                { answer: "Hoàn toàn không", score: 0 },
                { answer: "Một chút", score: 1 },
                { answer: "Vừa phải", score: 2 },
                { answer: "Nhiều", score: 3 },
                { answer: "Rất nhiều", score: 4 },
              ],
            },
            {
              content: "Cảm thấy thua kém người khác?",
              expanded: false,
              answers: [
                { answer: "Hoàn toàn không", score: 0 },
                { answer: "Một chút", score: 1 },
                { answer: "Vừa phải", score: 2 },
                { answer: "Nhiều", score: 3 },
                { answer: "Rất nhiều", score: 4 },
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
        { key: "level", label: "Mức độ" },
        { key: "minScore", label: "Diểm vượt quá" },
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
    async loadExams() {
      const q = query(collection(db, "exams"), limit(1)); // Replace "yourCollection" with your actual collection name

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0]; // Get the first document
          this.exams = {
            id: firstDoc.id,
            ...firstDoc.data(),
          };
          this.tests = [...this.exams.tests];
          this.evaluations = [...this.exams.evaluations];
          console.log("First document data:", firstDoc.data());
          console.log("First document ID:", firstDoc.id);
        } else {
          console.log("No documents found in the collection.");
        }
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    },
    async saveChanges() {
      // Lưu thay đổi logic ở đây
      try {
        const colRef = collection(db, "exams");
        const dataObj = {
          tests: [...this.tests],
          evaluations: [...this.evaluations],
          timestamp: new Date(),
        };
        if (this.exams.id) {
          const oldDoc = await doc(db, "exams", this.exams.id);
          await updateDoc(oldDoc, dataObj);
        } else {
          const docRef = await addDoc(colRef, dataObj);
          this.exams.id = docRef.id;
        }
        this.exams = {
          ...this.exams,
          ...dataObj,
        };
        // console.log(dataObj);
        // console.log("Document was created with ID:", docRef.id);
        // console.log("Kết quả khảo sát đã được lưu thành công!");
        this.selectedResult = null;
      } catch (error) {
        console.error("Lỗi khi lưu khảo sát: ", error);
      }
      console.log("Saved tests:", this.tests);
      console.log("Saved evaluations:", this.evaluations);
    },
    toggleRowDetails(row) {
      const currentState = row._showDetails;
      this.evaluations.forEach((item) => {
        this.$set(item, "_showDetails", false);
      });
      this.$nextTick(() => {
        row._showDetails = !currentState;
      });
    },
  },
  mounted() {
    this.loadExams();
  },
};
</script>

<style scoped>
.question-item {
  margin-bottom: 20px;
}
</style>
