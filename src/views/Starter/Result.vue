<template>
  <div class="bg-default" style="height: 100vh">
    <base-header class="pb-6 bg-default">
    </base-header>
    <b-container fluid class="mt--6">
      <div>
        <b-card v-for="result in results" :key="result.id" class="mb-4">
          <b-card-header>
            <h4>{{ result.title }}</h4>
          </b-card-header>
          <b-card-body>
            <p>{{ result.text }}</p>

            <div v-if="result.file">
              <b-button
                :href="result.file.url"
                target="_blank"
                variant="primary"
              >
                Tải về file
              </b-button>
            </div>

            <div v-if="result.video">
               <b-embed
                type="iframe"
                aspect="16by9"
                :src="result.video.url"
                allowfullscreen
              ></b-embed>
            </div>
          </b-card-body>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";

export default {
  name: 'ResultsComponent',
  data() {
    return {
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
</style>
