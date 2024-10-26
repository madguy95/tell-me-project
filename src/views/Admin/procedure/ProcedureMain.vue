<template>
  <div class="container-fluid bg-white position-relative pt-3 pb-3">
    <Loader :visible="isLoading" />
    <b-button @click="addMainItem" variant="primary" class="mb-3"
      >Thêm Loại thủ tục</b-button
    >
    <b-list-group>
      <b-list-group-item
        v-for="(mainItem, mainIndex) in mainItems"
        :key="mainItem.id"
      >
        <b-form @submit.prevent="saveMainItem(mainItem, mainIndex)">
          <b-form-group label="Tiêu Đề">
            <b-form-input v-model="mainItem.title" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success" class="mb-2"
            >Lưu Tiêu Đề</b-button
          >
          <b-button variant="danger" @click="deleteMainItem(mainIndex)"
            >Xóa</b-button
          >
        </b-form>

        <b-button @click="toggleCollapse(mainIndex)" variant="link">
          {{
            mainItem.subItems.length
              ? `Thủ tục (${mainItem.subItems.length})`
              : "Thêm thủ tục "
          }}
        </b-button>

        <b-collapse v-model="mainItem.collapse" class="mt-2">
          <b-list-group>
            <b-list-group-item
              v-for="(subItem, subIndex) in mainItem.subItems"
              :key="subIndex"
            >
              <b-form-group label="Tên">
                <b-form-input v-model="subItem.name" required></b-form-input>
              </b-form-group>

              <b-form-group label="Hình Ảnh">
                <b-form-file v-model="subItem.file" accept="image/*" />
                <img
                  v-if="subItem.imageUrl"
                  :src="subItem.imageUrl"
                  class="img-preview"
                />
                <b-button
                  v-if="subItem.imageUrl"
                  variant="danger"
                  @click="deleteImage(mainIndex, subIndex)"
                  class="mt-2"
                  >Xóa Ảnh</b-button
                >
              </b-form-group>
            </b-list-group-item>
          </b-list-group>

          <b-button
            @click="addSubItem(mainIndex)"
            variant="secondary"
            class="mt-2"
            >Thêm Mục Con</b-button
          >
          <b-button
            @click="saveAllItems(mainItem, mainIndex)"
            variant="success"
            class="mt-2"
            >Lưu Tất Cả Mục Con</b-button
          >
        </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "@/plugins/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      mainItems: [],
    };
  },
  created() {
    this.loadItems();
  },
  methods: {
    async loadItems() {
      const snapshot = await getDocs(
        query(collection(db, "procedure-items"), orderBy("order"))
      );
      this.mainItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        collapse: false,
        subItems: doc.data().subItems || [],
      }));
    //   this.mainItems.forEach((item) => {
    //     item.subItems.sort((a, b) => a.order - b.order); // Sort by value, adjust as necessary
    //   });
    //   this.mainItems.forEach((item) => {
    //     item.subItems.forEach((sub, idx) => (sub.order = idx)); // Sort by value, adjust as necessary
    //   });
    },
    addMainItem() {
      this.mainItems.push({
        title: "",
        collapse: false,
        subItems: [],
        id: null,
        order: this.mainItems.length + 1,
      }); // ID khởi tạo là null
    },
    addSubItem(mainIndex) {
      this.mainItems[mainIndex].subItems.push({
        name: "",
        file: null,
        imageUrl: "",
        oldImageUrl: "",
        order: this.mainItems[mainIndex].subItems.length + 1,
      });
    },
    toggleCollapse(index) {
      this.mainItems[index].collapse = !this.mainItems[index].collapse;
    },
    async deleteImage(mainIndex, subIndex) {
      const subItem = this.mainItems[mainIndex].subItems[subIndex];
      if (subItem.imageUrl) {
        const imageRef = storageRef(storage, subItem.imageUrl);
        await deleteObject(imageRef); // Xóa ảnh cũ
        subItem.imageUrl = ""; // Đặt lại imageUrl sau khi xóa
        subItem.oldImageUrl = ""; // Xóa oldImageUrl
        alert("Đã xóa hình ảnh thành công!");
      }
    },
    async saveMainItem(mainItem, mainIndex) {
      if (mainItem.id) {
        // Cập nhật nếu có ID
        await updateDoc(doc(db, "procedure-items", mainItem.id), {
          title: mainItem.title,
          order: mainItem.order,
        });
        alert("Đã cập nhật tiêu đề mục chính thành công!");
      } else {
        // Thêm mới nếu chưa có ID
        const docRef = await addDoc(collection(db, "procedure-items"), {
          title: mainItem.title,
          order: mainItem.order,
          subItems: [],
        });
        this.mainItems[mainIndex].id = docRef.id; // Lưu ID vào mục chính
        alert("Đã thêm mục chính thành công!");
      }
    },
    async saveAllItems(mainItem, mainIndex) {
      if (!mainItem.id) {
        alert("Vui lòng lưu tiêu đề mục chính trước!");
        return; // Nếu ID là null, không lưu mục con
      }

      const subItemsData = [];

      for (const subItem of mainItem.subItems) {
        let imageUrl = subItem.imageUrl;

        // Tải lên hình ảnh nếu có file mới
        if (subItem.file) {
          // Nếu có hình ảnh cũ, xóa nó
          if (subItem.oldImageUrl) {
            const oldImageRef = storageRef(storage, subItem.oldImageUrl);
            await deleteObject(oldImageRef);
          }
          const storageRefPath = storageRef(
            storage,
            `procedure-images/${uuidv4() + "_" + subItem.file.name}`
          );
          await uploadBytes(storageRefPath, subItem.file); // Tải lên hình ảnh
          imageUrl = await getDownloadURL(storageRefPath); // Lấy URL hình ảnh
        }

        subItemsData.push({
          name: subItem.name,
          imageUrl: imageUrl,
          order: subItem.order,
        });
      }

      // Cập nhật mục chính cùng với các mục con vào Firestore
      await updateDoc(doc(db, "procedure-items", mainItem.id), {
        subItems: subItemsData,
      });

      alert("Đã lưu tất cả mục con thành công!");
    },
    async deleteMainItem(index) {
      const mainItem = this.mainItems[index];
      await deleteDoc(doc(db, "procedure-items", mainItem.id)); // Xóa mục chính
      this.mainItems.splice(index, 1);
      alert("Đã xóa mục chính thành công!");
    },
  },
};
</script>

<style>
.img-preview {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
}
</style>
