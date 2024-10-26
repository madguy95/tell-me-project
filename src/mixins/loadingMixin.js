export default {
    data() {
      return {
        isLoading: false, // Biến quản lý trạng thái loading
      };
    },
    methods: {
      showLoader() {
        this.isLoading = true; // Hàm để hiển thị loader
      },
      hideLoader() {
        this.isLoading = false; // Hàm để ẩn loader
      },
    },
  };
  