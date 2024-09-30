<template>
  <div class="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container">
        <b-row>
          <b-col class="mt-3 text-center">
            <h3>Thống kê mức độ lo âu của người nhà bệnh nhân</h3>
            <Pie :chart-data="data['GAD-7']" :chart-options="options" />
          </b-col>
          <b-col class="mt-3 text-center">
            <h3>Thống kê mức độ trầm cảm của người nhà bệnh nhân</h3>
            <Pie :chart-data="data['PHQ-9']" :chart-options="options" />
          </b-col>
          <b-col class="mt-3 text-center">
            <h3>Thống kê mức độ căng thẳng của người nhà bệnh nhân</h3>
            <Pie :chart-data="data['BSRS-5']" :chart-options="options" />
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import { collection, onSnapshot, updateDoc } from "firebase/firestore";
import { db, loginAnonymously } from "@/plugins/firebaseConfig";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import _ from "lodash";
import { getUser } from "@/store/user";

Chart.register(ArcElement, Tooltip, Legend);
export const DATA_DEFAUT = {
  "GAD-7": {
    labels: ["Mức 1", "Mức 2", "Mức 3", "Mức 4"],
    datasets: [
      {
        backgroundColor: ["#1276A8", "#D6D600", "#F79C33", "#A83A12"],
        data: [40, 20, 80, 10],
      },
    ],
  },
  "PHQ-9": {
    labels: ["Mức 1", "Mức 2", "Mức 3", "Mức 4", "Mức 5"],
    datasets: [
      {
        backgroundColor: [
          "#1276A8",
          "#D6D600",
          "#F79C33",
          "#A83A12",
          "#FF0000",
        ],
        data: [40, 20, 80, 10],
      },
    ],
  },
  "BSRS-5": {
    labels: ["Mức 1", "Mức 2", "Mức 3", "Mức 4"],
    datasets: [
      {
        backgroundColor: ["#1276A8", "#D6D600", "#F79C33", "#A83A12"],
        data: [40, 20, 80, 10],
      },
    ],
  },
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};
export default {
  name: "ReportPage",
  components: {
    StatsCard,
    RouteBreadCrumb,
    Pie,
  },
  data() {
    return {
      openItem: null, // Item currently open
      data: _.cloneDeep(DATA_DEFAUT),
      options: options,
      items: [],
      user: null,
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
      if (this.user) {
        const dataArr = {
          "GAD-7": [0, 0, 0, 0],
          "PHQ-9": [0, 0, 0, 0, 0],
          "BSRS-5": [0, 0, 0, 0],
        };
        onSnapshot(collection(db, "surveys"), (snap) => {
          snap.forEach((doc) => {
            // this.users.push(doc.data())
            // console.log(doc.ref);
            const data = doc.data();
            if (!data.result) {
              updateDoc(doc.ref, { result: { "BSRS-5": data.point } });
            }
            Object.keys(data.result).forEach((name) => {
              if (name === "PHQ-9" && data.result[name] >= 20) {
                dataArr[name][4]++;
              } else if (data.result[name] >= 15) {
                dataArr[name][3]++;
              } else if (data.result[name] >= 10) {
                dataArr[name][2]++;
              } else if (data.result[name] >= 6) {
                dataArr[name][1]++;
              } else {
                dataArr[name][0]++;
              }
            });
          });
          Object.keys(dataArr).forEach((name) => {
            this.data[name].datasets[0].data = dataArr[name];
          });
        });
      }
    },
  },
  created() {
    this.getUsers();
  },
  mounted() {
    if (!getUser()) {
      loginAnonymously().then(() => {
        this.user = getUser();
      });
    } else {
      this.user = getUser();
    }
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
