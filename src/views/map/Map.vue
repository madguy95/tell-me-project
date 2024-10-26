<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <HospitalMap />
  </div>
</template>
<script>
import HospitalMap from "@/views/map/HospitalMap.vue";

export default {
  name: "Map",
  components: {
    HospitalMap,
  },
  data() {
    return {
      results: [
        {
          id: 1,
          title: "Kết quả A",
          text: "Bạn đã đạt điểm cao với kết quả này!",
          file: { url: "https://example.com/file-a.pdf" },
          video: { url: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0" },
        },
        {
          id: 2,
          title: "Kết quả B",
          text: "Bạn có thể làm tốt hơn với kết quả này.",
          file: null,
          video: { url: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0" },
        },
        // Thêm các kết quả khác nếu cần
      ],
    };
  },
};
</script>
<style scoped>
</style>
