<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <b-card>
      <b-card-title>{{ post.title }}</b-card-title>
      <b-card-sub-title class="text-muted">{{
        formattedUpTime
      }}</b-card-sub-title>
      <b-card-text>
        {{ post.content }}
      </b-card-text>
      <b-card-img :src="post.image" alt="Post image" class="mb-3" />
      <b-embed
        type="iframe"
        aspect="16by9"
        :src="post.videoLink"
        v-if="post.videoLink"
        allowfullscreen
      ></b-embed>
      <router-link to="/home/health-post">
        <b-button class="btn-common">Quay lại</b-button>
      </router-link>
    </b-card>
  </div>
</template>
<script>
import { POST_ARR } from "@/constants";
import { db, storage } from "@/plugins/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export default {
  name: "HealthPostDetail",
  props: {
    postData: {
      type: Object,
      default: () => ({
        title: "Sample Post Title",
        date: "September 1, 2024",
        image: "/img/infographic.png",
        content:
          "This is the full content of the post. It contains detailed information about the subject matter. It can be quite long and includes all the information you want to convey to your readers.",
      }),
    },
  },
  components: {},
  computed: {
    formattedUpTime() {
      return this.post.upTime ? this.post.upTime.toDate().toLocaleString() : "";
    },
  },
  async created() {
    const postId = this.$route.params.id;
    if (postId) {
      this.isEditMode = true;
      await this.fetchPostData(postId);
    } else {
      this.$router.push("/home");
    }
  },
  data() {
    return {
      post: {},
    };
  },
  methods: {
    toggle(id) {
      this.openItem = this.openItem === id ? null : id;
    },
    isOpen(id) {
      return this.openItem === id;
    },
    async fetchPostData(postId) {
      this.showLoader();
      const postRef = doc(db, "health-posts", postId);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        this.post = { id: postId, ...postSnapshot.data() };
      } else {
        console.error("Bài viết không tồn tại");
      }
      this.hideLoader();
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
.btn-common {
  width: 150px;
  font-size: 15px;
  color: #fff;
  background-color: #1276a8;
}
</style>
