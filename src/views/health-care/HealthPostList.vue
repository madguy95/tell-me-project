<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <div @scroll="onScroll" class="scroll-container">
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
            <b-card-text>{{ post.content }}</b-card-text>
            <router-link
              :to="{ name: 'health-post-detail', params: { id: post.id } }"
            >
              <a href="#" class="btn btn-link px-0">Xem thêm</a>
            </router-link>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import { POST_ARR } from "@/constants";
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
  name: "HealthPostList",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      posts: [],
      lastVisibleDoc: null, // Tài liệu cuối cùng của lô dữ liệu hiện tại
      pageSize: 10,
      isFetching: false, // Trạng thái tải dữ liệu
      hasMorePosts: true, // Kiểm tra còn dữ liệu để tải hay không
    };
  },
  async created() {
    await this.fetchPosts();
  },
  methods: {
    toggle(id) {
      this.openItem = this.openItem === id ? null : id;
    },
    isOpen(id) {
      return this.openItem === id;
    },
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
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.fetchPosts();
      }
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
.scroll-container {
  max-height: 800px; /* Đặt chiều cao cố định cho khu vực cuộn */
  overflow-y: auto; /* Kích hoạt cuộn dọc */
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
