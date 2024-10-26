<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <h2 class="">Số liệu thống kê</h2>
    <div>
      <b-button @click="exportToExcel">Tải Excel</b-button>
    </div>
    <b-row>
      <b-col md="6" class="mt-3 text-center">
        <h3>Thống kê mức độ lo âu của người nhà bệnh nhân (GAD-7)</h3>
        <Pie :chart-data="data['GAD-7']" :chart-options="options" />
      </b-col>
      <b-col md="6" class="mt-3 text-center">
        <h3>Thống kê mức độ trầm cảm của người nhà bệnh nhân (PHQ-9)</h3>
        <Pie :chart-data="data['PHQ-9']" :chart-options="options" />
      </b-col>
      <b-col md="6" class="mt-3 text-center">
        <h3>Thống kê mức độ căng thẳng của người nhà bệnh nhân (BSRS-5)</h3>
        <Pie :chart-data="data['BSRS-5']" :chart-options="options" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/plugins/firebaseConfig";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as Helpers from "chart.js/helpers";
import { Pie } from "vue-chartjs";
import _ from "lodash";
import * as XLSX from "xlsx";

ChartJS.register(ArcElement, Tooltip, Legend);
// var theHelp = ChartJS.helpers
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
  plugins: {
    legend: {
      position: "right",
      labels: {
        // Thay đổi văn bản legend ở đây
        generateLabels: (chart) => {
          var data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const labels = chart.data.labels.map((labelText, i) => {
              var meta = chart.getDatasetMeta(0);
              var ds = data.datasets[0];
              var arc = meta.data[i];
              var custom = (arc && arc.custom) || {};
              var getValueAtIndexOrDefault = Helpers.resolve;
              var arcOpts = chart.options.elements.arc;
              var fill = custom.backgroundColor
                ? custom.backgroundColor
                : getValueAtIndexOrDefault(
                    [ds.backgroundColor || [], arcOpts.backgroundColor],
                    chart.$context,
                    i
                  );
              var stroke = custom.borderColor
                ? custom.borderColor
                : getValueAtIndexOrDefault(
                    [ds.borderColor || [], arcOpts.borderColor],
                    chart.$context,
                    i
                  );
              var bw = custom.borderWidth
                ? custom.borderWidth
                : getValueAtIndexOrDefault(
                    [ds.borderWidth || [], arcOpts.borderWidth],
                    chart.$context,
                    i
                  );
              return {
                // And finally :
                text: `${labelText} (${ds.data[i] || 0})`,
                fillStyle: fill,
                strokeStyle: stroke,
                lineWidth: bw,
                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                index: i,
              };
            });
            // console.log(labels)
            return labels;
          }
          return [];
        },
      },
    },
    datalabels: {
      formatter: (value, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return `${label}: ${value}`;
      },
      color: "#fff",
    },
  },
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
    };
  },
  watch: {},
  methods: {
    toggle(id) {
      this.openItem = this.openItem === id ? null : id;
    },
    isOpen(id) {
      return this.openItem === id;
    },
    async getUsers() {
      this.showLoader()
      // use 'collection()' instead of 'doc()'
      const dataArr = {
        "GAD-7": [0, 0, 0, 0],
        "PHQ-9": [0, 0, 0, 0, 0],
        "BSRS-5": [0, 0, 0, 0],
      };
      onSnapshot(collection(db, "surveys"), (snap) => {
        snap.forEach((doc) => {
          const data = doc.data();
          // if (!data.result) {
          //   updateDoc(doc.ref, { result: { "BSRS-5": data.point } });
          // }
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
        this.items = dataArr;
        // Object.keys(dataArr).map((name) => {
        //   const dataClone = dataArr[name].reduce((acc, value, index) => {
        //     acc[`level${index + 1}`] = value;
        //     return acc;
        //   }, {});
        //   return { "Tên bài Test": name, ...dataClone };
        // });
      });
      this.hideLoader()
    },
    exportToExcel() {
      // Chuyển đổi đối tượng thành mảng mảng
      const sheetData = [];

      // Thêm tiêu đề với style
      const header = [
        "Tên bài test",
        "Mức 1",
        "Mức 2",
        "Mức 3",
        "Mức 4",
        "Mức 5",
      ];
      sheetData.push(header);

      // Thêm dữ liệu
      for (const key in this.items) {
        const row = [key]; // Thêm tên chỉ số
        row.push(...this.items[key]); // Thêm giá trị
        sheetData.push(row);
      }
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
      // Thiết lập chiều rộng cột
      worksheet["!cols"] = [
        { wch: 15 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
      ];
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Xuất file
      XLSX.writeFile(workbook, "data.xlsx");
    },
  },
  created() {
    this.getUsers();
  },
  mounted() {},
};
</script>
<style scoped>
</style>
