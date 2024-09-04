<template>
  <div class="" >
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container image-scroll">
        <img :src="`/img/program/program${imageURl}.png`" />
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'ProcedureDetail',
  components: {
  },
  data() {
    return {
      imageURl: this.$route.params.id,
      results: [
        {
          id: 1,
          title: 'Kết quả A',
          text: 'Bạn đã đạt điểm cao với kết quả này!',
          file: { url: 'https://example.com/file-a.pdf' },
          video: { url: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0' }
        },
        {
          id: 2,
          title: 'Kết quả B',
          text: 'Bạn có thể làm tốt hơn với kết quả này.',
          file: null,
          video: { url: 'https://www.youtube.com/embed/zpOULjyy-n8?rel=0' }
        },
        // Thêm các kết quả khác nếu cần
      ]
    }
  }
};
</script>
<style>
.starter-page {
  min-height: calc(100vh - 380px);
}
.image-scroll {
  overflow: hidden;
  overflow-x: scroll;
}
</style>
