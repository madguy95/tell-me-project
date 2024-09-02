<template>
  <div class="container">
    <b-card>
      <b-row>
        <b-col md="8">
          <div
            class="panzoom-container"
          >
            <img src="img/so-do-bv.jpg" alt="Hospital Map" class="panzoom-image"/>
          </div>
        </b-col>
        <b-col md="4">
          <b-list-group>
            <b-list-group-item
              v-for="(location, index) in locations"
              :key="index"
              style="cursor: pointer;"
            >
              {{ location.name }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      scale: 1,
      locations: [
        { name: 'Khu A: Khu vực khám nội', x: 100, y: 150, width: 200, height: 150 },
        { name: 'Khu B: Khu vực khám ngoại', x: 400, y: 300, width: 150, height: 100 },
        { name: 'Khu C: Làm thủ tục', x: 600, y: 500, width: 180, height: 120 },
        // Thêm các địa điểm khác tại đây
      ]
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.panzoom-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}

.panzoom-image {
  max-width: 100%;
  height: auto;
}
</style>
