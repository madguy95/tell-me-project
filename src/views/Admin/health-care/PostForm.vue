<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <router-link to="/admin/post-list">
      <b-button >Quay lại</b-button>
    </router-link>
    <h2>{{ isEditMode ? "Cập Nhật Bài Post" : "Thêm Mới Bài Post" }}</h2>

    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Tiêu Đề">
        <b-form-input v-model="post.title" required></b-form-input>
      </b-form-group>

      <b-form-group label="Nội Dung">
        <b-form-textarea
          v-model="post.content"
          rows="3"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Thời Gian Đăng" v-if="post.upTime">
        <b-form-input :value="formattedUpTime" readonly></b-form-input>
      </b-form-group>

      <b-form-group label="Hình Ảnh">
        <b-form-file
          v-model="imageFile"
          @change="handleFileChange"
          placeholder="Chọn hình ảnh"
          accept="image/*"
        ></b-form-file>
        <div v-if="imagePreview" class="preview-container">
          <p>Hình ảnh xem trước:</p>
          <img :src="imagePreview" alt="Preview" width="100" />
        </div>
        <div v-if="post.image">
          <p>Hình ảnh hiện tại:</p>
          <img :src="post.image" alt="Hình ảnh hiện tại" width="100" />
        </div>
      </b-form-group>

      <b-form-group label="Link Video">
        <b-form-input
          v-model="post.videoLink"
          placeholder="URL video"
          type="url"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">{{
        isEditMode ? "Cập Nhật" : "Lưu"
      }}</b-button>
    </b-form>
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
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      post: {
        title: "",
        content: "",
        upTime: null,
        image: "",
        videoLink: "",
      },
      isEditMode: false,
      imageFile: null,
      imagePreview: "",
    };
  },
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
    }
  },
  methods: {
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
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async handleSubmit() {
      try {
        this.showLoader();

        // Tải hình ảnh mới lên nếu có file hình ảnh
        if (this.imageFile) {
          // Nếu đang chỉnh sửa và có ảnh cũ, xóa ảnh cũ trước khi tải ảnh mới lên
          if (this.isEditMode && this.post.image) {
            const oldImageRef = ref(storage, this.post.image); // Lấy reference của ảnh cũ
            await deleteObject(oldImageRef); // Xóa ảnh cũ
          }
          const storageRef = ref(
            storage,
            `images/${uuidv4() + "_" + this.imageFile.name}`
          );
          await uploadBytes(storageRef, this.imageFile);
          const url = await getDownloadURL(storageRef);
          this.post.image = url; // Lưu URL hình ảnh mới vào post
        }

        if (this.isEditMode && this.post.id) {
          const postRef = doc(db, "health-posts", this.post.id);
          await updateDoc(postRef, {
            title: this.post.title,
            content: this.post.content,
            image: this.post.image,
            videoLink: this.post.videoLink,
            upTime: serverTimestamp(),
          });
        } else {
          await addDoc(collection(db, "health-posts"), {
            title: this.post.title,
            content: this.post.content,
            image: this.post.image,
            videoLink: this.post.videoLink,
            upTime: serverTimestamp(),
          });
        }
        this.$router.push("/admin/post-list");
      } catch (error) {
        console.error("Lỗi khi lưu bài viết:", error);
      } finally {
        this.hideLoader();
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
.preview-container {
  margin-top: 10px;
}
.preview-container img {
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
