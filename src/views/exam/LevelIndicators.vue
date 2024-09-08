<template>
  <div class="level-indicators justify-content-center">
    <div class="col-8 d-flex justify-content-center">
      <div
        v-for="(level, index) in levels"
        :key="index"
        class="indicator"
        :class="{
          active: currentLevel >= index + 1,
          inactive: currentLevel < index + 1,
        }"
        :style="{
          width: indicatorWidth,
          backgroundColor: getIndicatorColor(index),
        }"
      >
        <span class="indicator-text"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 0,
    },
    maxLevel: 
    {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      levels: [...Array.from({length: this.maxLevel}, (_, i) => i + 1)], // Định nghĩa 5 mức độ
      currentLevel: this.level,
    };
  },
  computed: {
    indicatorWidth() {
      return `calc(100% / ${this.levels.length})`;
    },
  },
  methods: {
    getIndicatorColor(index) {
      const colors = ["#1276A8", "#D6D600", "#F79C33", "#A83A12", "#FF0000"]; // Các màu cho từng mức độ
      return this.currentLevel >= index + 1
        ? colors[this.currentLevel - 1]
        : "#e0e0e0";
    },
  },
};
</script>

<style scoped>
.level-indicators {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20px; /* Chiều cao của indicator */
}

.indicator {
  width: 40px;
  height: 8px;
  border-radius: 2px;
  background-color: #e0e0e0; /* Màu nền mặc định cho không được chọn */
  position: relative;
  transition: background-color 0.3s, width 0.3s;
}
.indicator:not(:first-of-type) {
  margin-left: 2px;
}

.indicator.active {
  background-color: #007bff; /* Màu cho các mức độ đã được chọn */
}

.indicator.inactive {
  background-color: #e0e0e0; /* Màu cho các mức độ chưa được chọn */
}

.indicator-text {
  position: absolute;
  top: -25px; /* Đặt vị trí của số */
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: bold;
  color: #007bff; /* Màu của số */
}
</style>
