<template>
  <div class="bg-default">
    <base-header class="pb-3 pt-5 pt-md-8 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 100px)">
      <div class="container">
        <b-card>
          <b-card-title>{{ post.title }}</b-card-title>
          <b-card-sub-title class="text-muted">{{
            post.date
          }}</b-card-sub-title>
          <b-card-text>
            {{ post.content }}
          </b-card-text>
          <b-card-img :src="post.image" alt="Post image" class="mb-3" />
          <router-link to="/home/post">
            <b-button class="btn-common">Quay lại</b-button>
          </router-link>
        </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
import {POST_ARR} from '@/constants'
export default {
  name: "PostDetail",
  props: {
    postData: {
      type: Object,
      default: {
        title: "Sample Post Title",
        date: "September 1, 2024",
        image: "img/infographic.png",
        content:
          "This is the full content of the post. It contains detailed information about the subject matter. It can be quite long and includes all the information you want to convey to your readers.",
      },
    },
  },
  components: {},
  data() {
    return {
      post: POST_ARR[this.$route.params.id - 1],
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
  created() {
    console.log(this.$route)
  }
};
</script>
<style scoped>
.starter-page {
  min-height: calc(100vh - 380px);
}
.my-list-item {
  margin-bottom: 10px;
}
.card-img-top {
  max-height: 400px; /* Set a maximum height for the image */
  object-fit: cover; /* Ensure the image covers the area without stretching */
}
.btn-common {
  width: 150px;
  font-size: 15px;
  color: #fff;
  background-color: #1276a8;
}
</style>
