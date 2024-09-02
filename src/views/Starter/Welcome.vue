<template>
  <b-container
    class="d-flex align-items-center justify-content-center flex-column min-vh-100"
  >
    <b-row class="img-container">
      <!-- Image -->

      <img
        src="img/welcome.png"
        alt="Welcome Image"
        class="img-fluid welcome-image"
      />
    </b-row>
    <!-- Slogan -->
    <b-row class="">
      <b-col>
        <h3 class="mt-3 welcome-text">Chào mừng bạn đến với website dự án!</h3>
      </b-col>
    </b-row>
    <b-row class=""> <h1 class="mt-3 project-name">Tell me</h1></b-row>
    <b-row class="">
      <b-col>
        <h3 class="mt-3 welcome-text">Hỗ trợ chăm sóc sức khỏe tinh thần cho người nhà người bệnh điều trị nội trú</h3>
      </b-col>
    </b-row>
    <!-- Select Box -->
    <b-row class="">
      <b-form-group label="" class="mt-3">
        <b-form-select
          class="select-box-bv custom-select"
          v-model="selected"
          @change="onChangeSelectBox"
          :options="options"
        >
          <template #first>
            <b-form-select-option :value="null" disabled
              >-- Bệnh viện --</b-form-select-option
            >
          </template>
          <i class="fa-solid fa-chevron-down"></i>
        </b-form-select>
      </b-form-group>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: "option1", text: "Bệnh viện K" },
        { value: "option2", text: "Bệnh viện Bạch Mai" },
        { value: "option3", text: "Bệnh viện Việt Đức" },
      ],
    };
  },
  methods: {
    onChangeSelectBox() {
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
h1 {
  font-size: 2rem;
  color: #333;
}
.welcome-image {
  width: 40%;
  height: 40%;
}
.img-container {
  width: 342px;
  height: 380px;
  overflow: hidden; /* Ẩn phần ảnh vượt ra ngoài kích thước */
  position: relative; /* Đặt vị trí cho ảnh bên trong */
  display: flex;
  justify-content: center; /* Căn giữa ảnh theo chiều ngang */
  align-items: center; /* Căn giữa ảnh theo chiều dọc */
}

.img-container img {
  width: 100%; /* Ảnh sẽ chiếm toàn bộ chiều rộng của div */
  height: 100%; /* Ảnh sẽ chiếm toàn bộ chiều cao của div */
  object-fit: cover; /* Ảnh sẽ được cắt sao cho vừa với div, giữ tỷ lệ khung hình */
}

.welcome-text {
  /* Chào mừng bạn đến với website dự án */

  width: 334px;
  left: calc(50% - 334px / 2 + 0.5px);
  top: 59.86%;
  bottom: 37.44%;

  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  /* identical to box height */
  text-align: center;

  color: #00297b;
}
.project-name {
  /* TELL ME */

  width: 222px;
  left: calc(50% - 222px / 2 - 0.5px);
  top: 64.44%;
  bottom: 27.7%;

  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 67px;
  text-align: center;

  color: #00297B;
}
.select-box-bv {
  position: relative;
  width: 299px;
  height: 84px;
  font-family: "FS Magistral";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  border-radius: 1rem;
  color: #ffffff;
  background-color: #1276A8; 
}
</style>
