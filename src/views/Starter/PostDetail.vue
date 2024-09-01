<template>
  <div class="bg-default">
    <base-header class="pb-3 pt-5 pt-md-8 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 100px)">
      <div class="container">
       <b-card>
      <b-card-img :src="post.image" alt="Post image" class="mb-3" />
      <b-card-title>{{ post.title }}</b-card-title>
      <b-card-sub-title class="text-muted">{{ post.date }}</b-card-sub-title>
      <b-card-text>
        {{ post.content }}
      </b-card-text>
      <b-button href="#" variant="primary">Back to Posts</b-button>
    </b-card>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "PostDetail",
  components: {
  },
  data() {
    return {
      post: {
        title: 'Sample Post Title',
        date: 'September 1, 2024',
        image: 'https://via.placeholder.com/800x400',
        content: 'This is the full content of the post. It contains detailed information about the subject matter. It can be quite long and includes all the information you want to convey to your readers.'
      }
    }
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
</style>
