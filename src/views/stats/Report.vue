<template>
  <div class="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container">
        <h3>Thống kê tỉ lệ người nhà bệnh nhân ở các mức độ khác nhau</h3>
       <Pie :chart-data="data" :chart-options="options" />
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/plugins/firebaseConfig";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

Chart.register(ArcElement, Tooltip, Legend)
export const data = {
  labels: ['Mức 1', 'Mức 2', 'Mức 3', 'Mức 4'],
  datasets: [
    {
      backgroundColor: ["#1276A8", "#D6D600", "#F79C33", "#A83A12"],
      data: [40, 20, 80, 10]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
export default {
  name: "ReportPage",
  components: {
    StatsCard,
    RouteBreadCrumb,
    Pie
  },
  data() {
    return {
      openItem: null, // Item currently open
      data: data,
      options: options,
      items: [
        {
          id: 1,
          title: "Khám bệnh và xét nghiệm",
          subItems: [
            { id: 1, text: "Đăng ký khám theo yêu cầu" },
            { id: 2, text: "Đăng ký khám bảo hiểm y tế" },
            { id: 3, text: "Làm thủ tục TH cấp cứu" },
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
    async getUsers() {
      // use 'collection()' instead of 'doc()'
      const dataArr = [0,0,0,0]
      onSnapshot(collection(db, 'surveys'), (snap) => {

        snap.forEach((doc) => {
          // this.users.push(doc.data())
          console.log(doc.data())
          const data = doc.data()
          if (data.point >= 15) {
            dataArr[3]++
          } else if (data.point >= 10) {
            dataArr[2]++
          } else if (data.point >= 6) {
            dataArr[1]++
          } else {
            dataArr[0]++
          }
        })
        this.data.datasets[0].data = dataArr
      })
    }
  },
  created() {
    this.getUsers()
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
