<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <router-link to="/home/procedure">
      <b-button class="">Quay lại</b-button>
    </router-link>
    <div class="image-scroll">
      <img :src="procedureItemDetail.imageUrl" />
    </div>
  </div>
</template>
<script>
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
  name: "ProcedureDetail",
  components: {},
  data() {
    return {
      procedureItemDetail: {},
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
  async created() {
    const procedureId = this.$route.params.id;
    const subIdx = this.$route.query.subIdx || 0;
    if (procedureId) {
      this.isEditMode = true;
      await this.fetchPostData(procedureId, subIdx);
    } else {
      this.$router.push("/home");
    }
  },
  methods: {
    async fetchPostData(procedureId, subIdx) {
      this.showLoader();
      const postRef = doc(db, "procedure-items", procedureId);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        console.log(postSnapshot.data());
        this.procedureItemDetail = postSnapshot.data().subItems[subIdx];
      } else {
        console.error("Bài viết không tồn tại");
      }
      this.hideLoader();
    },
  },
};
</script>
<style scoped>
.image-scroll {
  overflow: hidden;
  overflow-x: scroll;
}
</style>
