<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <h2 class="">Tải sơ đồ lên</h2>
    <!-- Sử dụng Bootstrap-Vue input file -->
    <b-form-file
      v-model="imageFile"
      @change="handleImageUpload"
      class="mb-3"
    ></b-form-file>

    <!-- Hiển thị preview của hình ảnh ngay bên dưới input file -->
    <div v-if="imagePreview" class="mb-4">
      <h4>Xem trước hình ảnh:</h4>
      <b-img :src="imagePreview" alt="Sơ đồ" fluid></b-img>
      <!-- Hình ảnh được preview -->
    </div>

    <h3>Danh sách tòa nhà</h3>
    <b-list-group class="mb-4">
      <b-list-group-item
        v-for="(building, buildingIndex) in buildings"
        :key="buildingIndex"
      >
        <div class="d-flex justify-content-between align-items-center">
          <strong>{{ building.name }}</strong>
          <div>
            <b-button
              size="sm"
              variant="warning"
              @click="editNode('building', buildingIndex)"
              >Sửa</b-button
            >
            <b-button
              size="sm"
              variant="danger"
              @click="deleteNode('building', buildingIndex)"
              >Xóa</b-button
            >
          </div>
        </div>
        <b-list-group class="mt-2">
          <b-list-group-item
            v-for="(floor, floorIndex) in building.floors"
            :key="floorIndex"
          >
            <div class="d-flex justify-content-between align-items-center">
              <span>{{ floor.name }}</span>
              <div>
                <b-button
                  size="sm"
                  variant="warning"
                  @click="editNode('floor', buildingIndex, floorIndex)"
                  >Sửa</b-button
                >
                <b-button
                  size="sm"
                  variant="danger"
                  @click="deleteNode('floor', buildingIndex, floorIndex)"
                  >Xóa</b-button
                >
              </div>
            </div>
            <b-list-group class="mt-2">
              <b-list-group-item
                v-for="(room, roomIndex) in floor.rooms"
                :key="roomIndex"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <span>{{ room.name }}</span>
                  <div>
                    <b-button
                      size="sm"
                      variant="warning"
                      @click="
                        editNode('room', buildingIndex, floorIndex, roomIndex)
                      "
                      >Sửa</b-button
                    >
                    <b-button
                      size="sm"
                      variant="danger"
                      @click="
                        deleteNode('room', buildingIndex, floorIndex, roomIndex)
                      "
                      >Xóa</b-button
                    >
                  </div>
                </div>
              </b-list-group-item>
            </b-list-group>
            <b-button
              size="sm"
              variant="success"
              class="mt-2"
              @click="addNode('room', buildingIndex, floorIndex)"
              >Thêm Phòng</b-button
            >
          </b-list-group-item>
        </b-list-group>
        <b-button
          size="sm"
          variant="success"
          class="mt-2"
          @click="addNode('floor', buildingIndex)"
          >Thêm Tầng</b-button
        >
      </b-list-group-item>
    </b-list-group>
    <b-button variant="primary" @click="addNode('building')"
      >Thêm Tòa Nhà</b-button
    >
    <b-button variant="primary" @click="saveData">Lưu</b-button>

    <!-- Modal chỉnh sửa -->
    <b-modal id="editModal" v-model="showModal" title="Chỉnh sửa">
      <b-form-input v-model="editName" placeholder="Tên"></b-form-input>
      <template #modal-footer>
        <b-button variant="secondary" @click="showModal = false">Đóng</b-button>
        <b-button variant="primary" @click="saveEdit">Lưu</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import {
  collection,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  query,
  addDoc,
  getDocs,
  where,
  limit,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "@/plugins/firebaseConfig";
export default {
  data() {
    return {
      imageFile: null, // Biến lưu trữ file ảnh
      imagePreview: null, // Biến lưu trữ đường dẫn của ảnh để preview
      buildings: [
        {
          name: "Tòa nhà A",
          floors: [
            {
              name: "Tầng 1",
              rooms: [{ name: "Phòng Kế toán" }, { name: "Phòng Hành chính" }],
            },
          ],
        },
      ],
      editName: "",
      currentEditNode: null,
      currentEditType: "",
      showModal: false,
      mapData: {
        mapImage: "",
        buildings: [],
      },
    };
  },
  methods: {
    async saveData() {
      this.showLoader()
      if (this.imageFile) {
        let storageRef;
        if (this.mapData.imgUrl) {
          storageRef = ref(storage, this.mapData.imgUrl);
        } else {
          const uniqueFileName = uuidv4() + "_" + this.imageFile.name;
          storageRef = ref(storage, `maps/${uniqueFileName}`);
        }
        await uploadBytes(storageRef, this.imageFile);
        this.mapData.imgUrl = await getDownloadURL(storageRef);
        this.imagePreview = this.mapData.imgUrl;
      }
      this.mapData.buildings = this.buildings;
      const mapCol = collection(db, "maps"); // Store URL and order in Firestore
      if (this.mapData.id) {
        await updateDoc(doc(db, "maps", this.mapData.id), {
          imgUrl: this.mapData.imgUrl,
          buildings: this.mapData.buildings,
        });
      } else {
        const docRef = await addDoc(mapCol, {
          hospital: "BVK",
          ...this.mapData,
        });
        this.mapData.id = docRef.id;
      }
      this.imageFile = null; // Reset file input
      this.hideLoader()
    },
    async fetchData() {
      this.showLoader()
      const mapCol = collection(db, "maps");
      const q = query(mapCol, where("hospital", "==", "BVK"), limit(1));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        this.mapData = { id: doc.id, ...doc.data() };
        this.buildings = [...this.mapData.buildings];
        this.imagePreview = this.mapData.imgUrl;
      });
      this.hideLoader()
    },
    handleImageUpload(event) {
      const file = event.target.files[0]; // Lấy file từ input
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result; // Lưu đường dẫn ảnh vào biến imagePreview
        };
        reader.readAsDataURL(file); // Đọc file dưới dạng URL
      }
    },
    addNode(type, buildingIndex = null, floorIndex = null) {
      if (type === "building") {
        this.buildings.push({ name: "Tòa nhà mới", floors: [] });
      } else if (type === "floor") {
        this.buildings[buildingIndex].floors.push({
          name: "Tầng mới",
          rooms: [],
        });
      } else if (type === "room") {
        this.buildings[buildingIndex].floors[floorIndex].rooms.push({
          name: "Phòng mới",
        });
      }
    },
    editNode(type, buildingIndex, floorIndex = null, roomIndex = null) {
      if (type === "building") {
        this.currentEditNode = this.buildings[buildingIndex];
      } else if (type === "floor") {
        this.currentEditNode = this.buildings[buildingIndex].floors[floorIndex];
      } else if (type === "room") {
        this.currentEditNode =
          this.buildings[buildingIndex].floors[floorIndex].rooms[roomIndex];
      }
      this.currentEditType = type;
      this.editName = this.currentEditNode.name;
      this.showModal = true;
    },
    saveEdit() {
      if (this.currentEditNode) {
        this.currentEditNode.name = this.editName;
      }
      this.showModal = false;
    },
    deleteNode(type, buildingIndex, floorIndex = null, roomIndex = null) {
      if (type === "building") {
        this.buildings.splice(buildingIndex, 1);
      } else if (type === "floor") {
        this.buildings[buildingIndex].floors.splice(floorIndex, 1);
      } else if (type === "room") {
        this.buildings[buildingIndex].floors[floorIndex].rooms.splice(
          roomIndex,
          1
        );
      }
    },
  },
  created() {
    this.fetchData();
  },
  mounted() {},
};
</script>
