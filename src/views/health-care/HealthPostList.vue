<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <b-row>
      <b-col v-for="post in posts" :key="post.id" cols="12" md="4" class="mb-2">
        <b-card
          :title="post.title"
          :img-src="post.image"
          img-alt="Card image cap"
          img-top
          class="mb-4"
        >
          <b-card-sub-title>{{ post.date }}</b-card-sub-title>
          <b-card-text>{{ post.summary }}</b-card-text>
          <router-link
            :to="{ name: 'health-post-detail', params: { id: post.id } }"
          >
            <a href="#" class="btn btn-link px-0">Xem thêm</a>
          </router-link>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import { POST_ARR } from "@/constants";
export default {
  name: "HealthPostList",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      posts: POST_ARR,
    };
  },
  methods: {
    toggle(id) {
      this.openItem = this.openItem === id ? null : id;
    },
    isOpen(id) {
      return this.openItem === id;
    },
  },
};
</script>
<style scoped>
.my-list-item {
  margin-bottom: 10px;
}
.card-img-top {
  max-height: 200px; /* Set the max height of the image */
  object-fit: cover; /* Optional: Ensure the image covers the area without stretching */
}
.btn-link {
  color: #1276a8;
}
</style>
