<template>
  <div class="" style="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container">
        <h4 class="sub-note mt-2">
          Dưới đây là 3 bài kiểm tra có độ tin cậy cao và đang được sử dụng phổ
          biến tại các cơ sở sàng lọc sức khỏe tại bệnh viện để đánh giá sơ bộ
          tình trạng sức khỏe tâm thần. Mỗi bài kiểm tra giúp đánh giá một trong
          các chỉ số khác nhau của sức khỏe tâm thần: lo âu - trầm cảm - căng
          thẳng. Kết quả tổng thể và khuyến nghị sẽ càng chính xác hơn khi thực
          hiện được nhiều bài kiểm tra hơn.
        </h4>
        <div>
          <h1 class="text-center text-title">
            Vui lòng chọn các bài kiểm tra bạn muốn thực hiện
          </h1>
        </div>
        <b-form>
          <b-form-group label="" label-for="checkbox-group">
            <b-form-checkbox-group
              v-model="selectedOptions"
              :options="options"
              class="mb-3"
              disabled-field="notEnabled"
              html-field="text"
            ></b-form-checkbox-group>
            <!-- <b-form-checkbox
              v-model="checked1"
              name="check-button"
              class="custom-checkbox"
            >
              <div class="checkbox-label">
                <strong>GAD-7 (7 câu hỏi) </strong><br />Sàng lọc Rối loạn lo âu
                lan tỏa
              </div>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="checked1"
              name="check-button"
              class="custom-checkbox"
            >
              <div class="checkbox-label">
                <strong>PHQ-9 (9 câu hỏi) </strong><br />Sàng lọc Trầm cảm
              </div>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="checked1"
              name="check-button"
              class="custom-checkbox"
            >
              <div class="checkbox-label">
                <strong>BSRS-5 (5 câu hỏi) </strong><br />Đánh giá mức độ căng
                thẳng tâm lý
              </div>
            </b-form-checkbox> -->
          </b-form-group>
        </b-form>
        <router-link :to="{ name: 'exam', query: { id: selectedOptions } }">
          <b-button
            class="button-start text-center"
            :disabled="selectedOptions.length <= 0"
          >
            <strong>LÀM BÀI KIỂM TRA</strong>
          </b-button>
        </router-link>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  limit,
} from "firebase/firestore";
import { db } from "@/plugins/firebaseConfig";

export default {
  name: "ExamPage",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      selectedOptions: [],
      options: [
        {
          text: '<div class="checkbox-label"><strong>GAD-7 (7 câu hỏi) </strong><br />Sàng lọc Rối loạn lo âu lan tỏa </div>',
          value: "GAD-7",
        },
        {
          text: '<div class="checkbox-label"><strong>PHQ-9 (9 câu hỏi) </strong><br />Sàng lọc Trầm cảm </div>',
          value: "PHQ-9",
        },
        {
          text: '<div class="checkbox-label"><strong>BSRS-5 (5 câu hỏi) </strong><br />Đánh giá mức độ căng thẳng tâm lý </div>',
          value: "BSRS-5",
        },
      ],
    };
  },
  methods: {
    async loadExams() {
      const q = query(collection(db, "exams"), limit(1)); // Replace "yourCollection" with your actual collection name

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const firstDoc = querySnapshot.docs[0]; // Get the first document
          const dataTest = firstDoc.data();
          this.options = dataTest.tests.map((el) => ({
            text: `<div class="checkbox-label"><strong>${el.name} (${el.questions.length} câu hỏi)</strong><br /> ${el.description}</div>`,
            value: el.code,
          }));
        } else {
          console.log("No documents found in the collection.");
        }
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    },
  },
  mounted() {
    this.loadExams();
  },
};
</script>
<style>
.custom-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
  min-height: 57px;
  padding-left: unset;
}

.custom-checkbox .custom-control-label {
  align-content: center;
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

  color: #fff;
  border: 0.1em solid #1276a8;
  border-radius: 0.5em;
  background-color: #1276a8;
  padding-left: 2rem;
}
.custom-checkbox
  .custom-control-input:focus:not(:checked)
  ~ .custom-control-label::before {
  border-color: #0d4460;
}
.custom-checkbox input[type="checkbox"] + .custom-control-label::before,
.custom-checkbox
  input[type="checkbox"]:checked
  + .custom-control-label::before {
  position: absolute;
  left: calc(100% - 2.5rem);
  top: 1.5rem;
  width: 1.5rem;
  /* Adjust size */
  height: 1.5rem;
  /* Adjust size */
  /* border-radius: 50%; */
  border: 4px solid #0d4460;
  /* Outer border color */
  background-color: transparent;
  /* Inner circle color when checked */
  transform: translateY(-50%);
}

.custom-checkbox input[type="checkbox"]:checked + .custom-control-label::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23f79c33' stroke-width='1' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  background-color: transparent;
  /* Inner dot color when checked */
  position: absolute;
  left: calc(100% - 1.75rem);
  top: 1.5rem;
  width: 3rem;
  /* Adjust size */
  height: 3rem;
  /* Adjust size */
  transform: translate(-50%, -50%);
  border-color: #0d4460;
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
