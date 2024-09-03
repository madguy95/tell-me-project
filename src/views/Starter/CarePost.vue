<template>
  <div class="">
    <base-header class="pb-3 pt-5 pt-md-8 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 100px)">
      <div class="container">
        <b-row>
          <b-col
            v-for="post in posts"
            :key="post.id"
            cols="12"
            md="4"
            class="mb-2"
          >
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
                :to="{ name: 'PostDetail', params: { id: post.id } }"
              >
                <a href="#" class="btn btn-link px-0">Xem thêm</a>
              </router-link>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import {POST_ARR} from '@/constants'
export default {
  name: "post-page",
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
<style>
.starter-page {
  min-height: calc(100vh - 380px);
}
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
