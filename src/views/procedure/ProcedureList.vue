<template>
  <div class="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container">
        <b-list-group>
          <b-list-group-item
            v-for="item in items"
            :key="item.id"
            class="my-list-item"
          >
            <b-button class="w-100 text-left" @click="toggle(item.id)">
              {{ item.title }}
              <b-icon
                :icon="isOpen(item.id) ? 'chevron-up' : 'chevron-down'"
                class="float-right"
              />
            </b-button>
            <b-collapse
              :visible="openItem === item.id"
              :id="'collapse-' + item.id"
              class="mt-2"
            >
              <b-card-body>
                <ul>
                  <li v-for="subItem in item.subItems" :key="subItem.id">
                    <template v-if="subItem.img">
                      <router-link
                        :to="{ name: 'procedure-detail', params: { id: subItem.img } }"
                      >
                        <a href="#">{{
                          subItem.text
                        }}</a>
                      </router-link>
                    </template>
                    <span v-if="!subItem.img">{{ subItem.text }}</span>
                  </li>
                </ul>
              </b-card-body>
            </b-collapse>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";

export default {
  name: "ProcedureList",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      openItem: null, // Item currently open
      items: [
        {
          id: 1,
          title: "Khám bệnh và xét nghiệm",
          subItems: [
            { id: 1, text: "Đăng ký khám theo yêu cầu", img: "1" },
            {
              id: 2,
              text: "Đăng ký khám bảo hiểm y tế và có giấy chuyển tuyến",
              img: "2",
            },
            {
              id: 3,
              text: "Đăng ký khám không có bảo hiểm y tế hoặc không có giấy chuyển tuyến",
              img: "3",
            },
            { id: 4, text: "Làm thủ tục TH cấp cứu" },
            { id: 5, text: "Các địa điểm làm xét nghiệm", img: "4" },
          ],
        },
        {
          id: 2,
          title: "Nhập viện",
          subItems: [
            { id: 1, text: "Làm thủ tục nhập viện" },
            { id: 2, text: "Hình thức ngoại trú" },
            { id: 3, text: "Hình thức nội trú" },
          ],
        },
        {
          id: 3,
          title: "Xuất viện",
          subItems: [
            { id: 1, text: "Thủ tục xuất viện" },
            { id: 2, text: "Nhận hồ sơ bệnh án" },
            { id: 3, text: "Các loại hình thức thanh toán và chi phí" },
            { id: 4, text: "Đặt lịch tái khám" },
          ],
        },
        {
          id: 4,
          title: "Khác",
          subItems: [
            { id: 1, text: "Thủ tục chuyển viện" },
            { id: 2, text: "Yêu cầu bản sao hồ sơ y tế" },
          ],
        },
      ],
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
</style>
