<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <div>
      <h1 class="text-center text-title">
        Vui lòng nhập thông tin trước khi làm bài khảo sát.
      </h1>
      <h4 class="sub-note mt-2">
        Những thông tin này nhằm mục đích thống kê và sàng lọc kết quả, phục vụ
        mục đích y tế, không sử dụng cho các mục đích khác nhằm đảm bảo thông
        tin của người dùng.
      </h4>
    </div>
    <b-form>
      <b-form-group label="" label-for="checkbox-group">
        <label>Đối tượng: </label>
        <b-form-select v-model="tester.userType" class="mb-3">
          <b-form-select-option value="A"
            >Người nhà bệnh nhân</b-form-select-option
          >
          <b-form-select-option value="B">Bệnh nhân</b-form-select-option>
          <b-form-select-option value="O">Khác</b-form-select-option>
        </b-form-select>
        <label>Tuổi: </label>
        <b-form-input v-model="tester.age" type="number"></b-form-input>
        <label>Giới tính: </label>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio
            v-model="tester.gender"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="M"
            >Nam</b-form-radio
          >
          <b-form-radio
            v-model="tester.gender"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="F"
            >Nữ</b-form-radio
          >
        </b-form-group>
      </b-form-group>
    </b-form>
    <b-button
      class="button-start text-center"
      @click="clickNext"
      :disabled="!isValid"
    >
      <strong>Tiếp tục</strong>
    </b-button>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import { mapState, mapActions } from "vuex";

export default {
  name: "ExamInfo",
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
      tester: {},
    };
  },
  computed: {
    ...mapState(["user", "testerInfo"]),
    isValid() {
      return this.tester.userType && this.tester.age && this.tester.gender;
    },
  },
  watch: {
  },
  methods: {
    ...mapActions(["setTesterInfo"]),
    clickNext() {
      this.setTesterInfo(this.tester);
      this.$router.push({ name: "exam-list" });
    },
  },
  created() {
    this.tester = { ...this.testerInfo };
  },
};
</script>
<style scoped>
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

.btn-finish {
  background: #f79c33 !important;
  width: 128px;
  height: 36px;
  min-height: 36px;
  padding: 0.325rem;
}
</style>
