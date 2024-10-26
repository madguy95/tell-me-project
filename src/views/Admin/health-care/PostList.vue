<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <h2>Danh Sách Bài Post</h2>
    <b-button variant="primary" @click="$router.push('/admin/post-detail')"
      >Tải Lên Bài Post Mới</b-button
    >

    <!-- Bảng hiển thị danh sách post -->
    <div class="table-container" @scroll="onScroll">
      <b-table :items="posts" :fields="fields" responsive>
        <template #table-colgroup="scope">
          <colgroup>
            <col />
            <col style="width: 60%" />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
        </template>
        <template #cell(content)="data">
          <div class="text-truncate">{{ data.item.content }}</div>
        </template>
        <template #cell(image)="data">
          <b-img
            :src="data.item.image"
            fluid
            alt="Image"
            style="max-width: 100px"
          />
        </template>
        <template #cell(upTime)="data">
          {{ data.item.upTime.toDate().toLocaleDateString() }}
        </template>
        <template #cell(videoLink)="data">
          <b-button
            v-if="data.item.videoLink"
            :href="data.item.videoLink"
            target="_blank"
            variant="link"
            >Xem Video</b-button
          >
        </template>
        <template #cell(actions)="data">
          <b-button variant="warning" @click="editPost(data.item.id)"
            >Sửa</b-button
          >
          <b-button
            variant="danger"
            @click="confirmDelete(data.item.id)"
            class="ml-2"
            >Xóa</b-button
          >
        </template>
      </b-table>
    </div>

    <!-- Confirm Delete Modal -->
    <b-modal id="confirmDeleteModal" title="Xác nhận xóa" @ok="deletePost">
      Bạn có chắc chắn muốn xóa bài post này không?
    </b-modal>
  </div>
</template>

<script>
import { db } from "@/plugins/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export default {
  data() {
    return {
      posts: [],
      lastVisibleDoc: null, // Tài liệu cuối cùng của lô dữ liệu hiện tại
      pageSize: 10,
      isFetching: false, // Trạng thái tải dữ liệu
      hasMorePosts: true, // Kiểm tra còn dữ liệu để tải hay không
      fields: [
        { key: "title", label: "Tiêu Đề" },
        { key: "content", label: "Nội Dung" },
        { key: "upTime", label: "Thời Gian Đăng" },
        { key: "image", label: "Hình Ảnh" },
        { key: "videoLink", label: "Video" },
        { key: "actions", label: "Thao Tác", class: "text-center" },
      ],
      postToDelete: null,
    };
  },
  async created() {
    await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      // Ngừng tải nếu đang trong quá trình tải hoặc không còn bài viết nào
      if (this.isFetching || !this.hasMorePosts) return;

      this.showLoader();
      this.isFetching = true;

      let q;
      if (this.lastVisibleDoc) {
        // Tải các bài tiếp theo bắt đầu từ tài liệu cuối cùng của lần trước
        q = query(
          collection(db, "health-posts"),
          orderBy("upTime", "desc"),
          startAfter(this.lastVisibleDoc),
          limit(this.pageSize)
        );
      } else {
        // Tải dữ liệu lần đầu
        q = query(
          collection(db, "health-posts"),
          orderBy("upTime", "desc"),
          limit(this.pageSize)
        );
      }

      const snapshot = await getDocs(q);

      // Kiểm tra nếu không còn dữ liệu
      if (snapshot.empty) {
        this.hasMorePosts = false;
      } else {
        // Thêm dữ liệu vào danh sách bài post hiện tại
        this.posts.push(
          ...snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        // Lưu lại tài liệu cuối cùng để sử dụng cho lần tải sau
        this.lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      }
      this.hideLoader();
      this.isFetching = false;
    },
    onScroll(event) {
      const { scrollTop, clientHeight, scrollHeight } = event.target;
      //   console.log({ scrollTop, clientHeight, scrollHeight });
      // Khi cuộn đến cuối bảng, tải thêm dữ liệu
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        this.fetchPosts();
      }
    },
    editPost(id) {
      this.$router.push(`/admin/post-detail/${id}`);
    },
    confirmDelete(id) {
      this.postToDelete = id;
      this.$bvModal.show("confirmDeleteModal");
    },
    async deletePost() {
      if (this.postToDelete) {
        try {
          await deleteDoc(doc(db, "health-posts", this.postToDelete));
          this.posts = this.posts.filter(
            (post) => post.id !== this.postToDelete
          );
          this.postToDelete = null;
          // Sau khi xóa, reset và tải lại dữ liệu từ đầu
          this.resetData();
          await this.fetchPosts();
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      }
    },
    resetData() {
      this.posts = [];
      this.lastVisibleDoc = null;
      this.isFetching = false;
      this.hasMorePosts = true;
    },
  },
};
</script>

<style scoped>
.table-container {
  max-height: calc(100vh - 300px); /* Đặt chiều cao cố định */
  overflow-y: auto; /* Kích hoạt cuộn dọc */
}

.table-container .b-table {
  border: 1px solid #ccc; /* Đường viền cho bảng */
}
.text-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* Giới hạn 2 dòng */
  max-height: 3em; /* Chiều cao tối đa cho 2 dòng */
  text-overflow: ellipsis; /* Dấu ba chấm */
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
