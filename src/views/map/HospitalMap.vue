<template>
  <div class="container">
    <b-card>
      <b-row>
        <b-col md="8">
          <div
            class="panzoom-container"
            v-viewer="{ movable: false, rotatable: false, scalable: false }"
          >
            <img
              src="/img/so-do-bv-01.png"
              alt="Hospital Map"
              class="panzoom-image"
            />
          </div>
        </b-col>
        <b-col md="4">
          <b-list-group>
            <b-list-group-item
              v-for="(item, index) in items"
              :key="index"
              @click="toggle(index)"
              class="cursor-pointer"
            >
              <b-icon
                :icon="isOpen(index) ? 'chevron-up' : 'chevron-down'"
                class="mr-2"
              ></b-icon>
              {{ item.title }}
              <b-collapse v-model="openItems[index]">
                <b-list-group>
                  <b-list-group-item
                    v-for="(subItem, subIndex) in item.subItems"
                    :key="subIndex"
                    @click.stop="toggleSub(index, subIndex)"
                  >
                    <b-icon
                      :icon="
                        isOpenSub(index, subIndex)
                          ? 'chevron-up'
                          : 'chevron-down'
                      "
                      class="mr-2"
                    ></b-icon>
                    {{ subItem.title }}
                    <b-collapse v-model="openItemsSub[index][subIndex]">
                      <b-list-group>
                        <b-list-group-item
                          v-for="(subSubItem, subSubIndex) in subItem.subItems"
                          :key="subSubIndex"
                        >
                          {{ subSubItem }}
                        </b-list-group-item>
                      </b-list-group>
                    </b-collapse>
                  </b-list-group-item>
                </b-list-group>
              </b-collapse>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      scale: 1,
      locations: [
        {
          name: "Khu A: Khu vực khám nội",
          x: 100,
          y: 150,
          width: 200,
          height: 150,
        },
        {
          name: "Khu B: Khu vực khám ngoại",
          x: 400,
          y: 300,
          width: 150,
          height: 100,
        },
        { name: "Khu C: Làm thủ tục", x: 600, y: 500, width: 180, height: 120 },
        // Thêm các địa điểm khác tại đây
      ],
      items: [
        {
          title: "NHÀ A",
          subItems: [
            {
              title: "Tầng 1",
              subItems: [
                "Khoa khám bệnh Tân Triều",
                "TT Chẩn đoán hình ảnh",
                "Khoa Hồi sức cấp cứu",
                "Nhà thuốc bệnh viện",
              ],
            },
            {
              title: "Tầng 2",
              subItems: [
                "Khoa Nội soi thăm dò chức năng",
                "Khoa Khám bệnh theo yêu câu",
                "TT Chẩn đoán hình ảnh",
                "Nhà thuốc bệnh viện số 2",
              ],
            },
            {
              title: "Tầng 3",
              subItems: [
                "Trung tâm đào tạo và chỉ đạo tuyển",
                "Khoa Sinh hóa – Miễn dịch",
                "Khoa Huyết học vi sinh",
                "Trung tâm giải phẫu bệnh và sinh học phân tử",
                "Trung tâm pha chế thuốc",
                "Trung tâm vật lý trị liệu",
              ],
            },
            {
              title: "Tầng 4",
              subItems: [
                "Giám đốc",
                "Phó giám đốc",
                "Phòng Hợp tác quốc tế",
                "Phòng Kế hoạch tổng hợp",
                "Khoa Dược",
                "Phòng Tài chính kế toán",
                "Phòng Vật tư Trang thiết bi Y tế",
                "﻿﻿Phòng Hành chính",
                "﻿﻿Phòng Tổ chức cán bộ",
                "Phòng Điều dưỡng",
                "Hội trường, phòng họp 471, 444",
                "Phòng Công nghệ thông tin",
                "Phòng Công tác Xã hội",
              ],
            },
            {
              title: "Tầng 5",
              subItems: [
                "Khoa phẫu thuật gây mê Hồi sức",
                "Khoa Hồi sức tích cực",
                "Phòng Quản trị",
                "Phòng Quản lý chất lượng bệnh viện",
                "Trung tâm phẫu thuật ROBOT",
                "Bộ môn Ung thư",
              ],
            },
          ],
        },
        {
          title: "Nhà B",
          subItems: [
            {
              title: "Tầng 1",
              subItems: [
                "Khoa Nội hệ tạo huyết",
                "Khoa Xạ Lồng ngực",
                "Trung tâm Nghiên cứu Lâm Sàng",
                "Khoa Y học cổ truyền",
              ],
            },
            {
              title: "Tầng 2",
              subItems: [
                "Khoa Ngoại Tai Mũi Họng",
                "Khoa Ngoại Thần Kinh",
                "Khoa Ngoại tổng hợp Quán Sứ",
              ],
            },
            {
              title: "Tầng 3",
              subItems: [
                "Khoa Nội 1",
                "Khoa Nội nhi",
                "Khoa Ngoại đầu cổ (Ngoại A)",
                "Khoa Xạ đầu cổ (Xạ 1)",
              ],
            },
            {
              title: "Tầng 4",
              subItems: [
                "Khoa Nội 5",
                "Khoa Ngoại Phụ khoa (ngoại E)",
                "Khoa Ngoại vú (Ngoại B)",
                "Khoa Xạ vú - Phụ khoa (Xạ 2)",
              ],
            },
            {
              title: "Tầng 5",
              subItems: [
                "Khoa Nội ",
                "Khoa Xạ 5",
                "Khoa Ngoại bụng 1",
                "Khoa Ngoại bụng 2",
              ],
            },
            {
              title: "Tầng 6",
              subItems: [
                "Khoa Nội 3",
                "Khoa Nội 6",
                "Khoa Ngoại tiết niệu",
                "Khoa Ngoại Lồng ngực (ngoại D)",
              ],
            },
            {
              title: "Tầng 7",
              subItems: [
                "Khoa Nội 2",
                "Khoa Ngoại gan mật tụy",
                "Khoa điều trị A",
              ],
            },
          ],
        },
        {
          title: "Nhà C",
          subItems: [
            {
              title: "Tầng 1",
              subItems: [
                "Khoa Kiểm soát nhiễm khuẩn",
                "Căn tin dành cho người bệnh; người nhà người bệnh",
                "Trung tâm IOT 131",
                "Trung tâm Chấn đoán hình ảnh",
                "Khoa Y học hạt nhân",
                "Khoa Vật lý Xạ trị",
              ],
            },
            {
              title: "Tầng 2",
              subItems: [
                "Trung tâm dinh dưỡng Lâm Sàng",
                "Căn tin cán bộ nhân viên",
                "Khoa Kiểm soát nhiễm khuẩn",
              ],
            },
          ],
        },
      ],
      openItems: [],
      openItemsSub: [[], [], []],
    };
  },
  methods: {
    toggle(index) {
      if (this.openItems[index] !== undefined) {
        this.$set(this.openItems, index, !this.openItems[index]);
      } else {
        this.$set(this.openItems, index, true);
        // this.$set(
        //   this.openItemsSub,
        //   index,
        //   this.items[index].subItems.map(() => false)
        // );
      }
      console.log("parent");
    },
    toggleSub(index, subIndex) {
      if (this.openItemsSub[index][subIndex] !== undefined) {
        this.$set(
          this.openItemsSub[index],
          subIndex,
          !this.openItemsSub[index][subIndex]
        );
      } else {
        this.$set(this.openItemsSub[index], subIndex, true);
      }
      console.log("sub");
    },
    isOpen(index) {
      return this.openItems[index] !== undefined
        ? this.openItems[index]
        : false;
    },
    isOpenSub(index, subIndex) {
      return this.openItemsSub[index] &&
        this.openItemsSub[index][subIndex] !== undefined
        ? this.openItemsSub[index][subIndex]
        : false;
    },
  },
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
