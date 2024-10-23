<template>
  <div class="">
    <base-header class="pb-3 pt-3 pt-md-5 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 200px)">
      <div class="container mt-5">
        <h2>Upload Banner Images</h2>
        <b-form>
          <b-form-group label="Select Images:" label-for="file-input">
            <b-form-file
              id="file-input"
              v-model="files"
              multiple
              accept="image/*"
              @change="previewImages"
            />
          </b-form-group>
        </b-form>
        <div v-if="imagesWithPreviews.length" class="mt-4">
          <h4>Image Previews</h4>
          <div class="image-previews">
            <b-img
              v-for="(image, index) in imagesWithPreviews"
              :key="index"
              :src="image.url"
              class="img-thumbnail"
              alt="Preview"
              style="max-width: 150px"
            />
          </div>
        </div>
        <div class="mt-4">
          <h4>Uploaded Banners</h4>
          <div class="table-responsive">
            <!-- Added responsive wrapper -->
            <b-table :items="imagesWithPreviews" :fields="fields" striped hover>
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(preview)="data">
                <b-img
                  :src="data.item.url"
                  class="img-thumbnail"
                  alt="Preview"
                  style="max-width: 150px"
                />
              </template>
              <template #cell(actions)="data">
                <b-button
                  variant="light"
                  @click="moveUp(data.index)"
                  :disabled="data.index === 0"
                >
                  ↑
                </b-button>
                <b-button
                  variant="light"
                  @click="moveDown(data.index)"
                  :disabled="data.index === images.length - 1"
                >
                  ↓
                </b-button>
                <b-button
                  @click="removeImage(data.index)"
                  variant="danger"
                  class="ml-2"
                  >Remove</b-button
                >
              </template>
            </b-table>
          </div>

          <b-button @click="saveImages" type="submit" variant="primary"
            >Upload and save</b-button
          >
          <!-- End of responsive wrapper -->
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/Cards/StatsCard";
import {
  collection,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  query,
  addDoc,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/plugins/firebaseConfig";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "BannerPage",
  components: {
    StatsCard,
    RouteBreadCrumb,
  },
  data() {
    return {
      files: null,
      images: [],
      originData: [],
      fields: [
        { key: "index", label: "Order" },
        { key: "preview", label: "Preview" },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  computed: {
    imagesWithPreviews() {
      return this.images;
    },
  },
  created() {
    this.fetchImages(); // Fetch images on component creation
  },
  methods: {
    async saveImages() {
      console.log("def");
      if (this.images) {
        for (let i = 0; i < this.images.length; i++) {
          const image = this.images[i];
          if (image.id) {
            await updateDoc(doc(db, "banners", image.id), {
              order: i,
            });
          } else {
            const file = image.file;
            const uniqueFileName = uuidv4() + "_" + file.name;
            const storageRef = ref(storage, `banners/${uniqueFileName}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            await this.saveImageUrl(url, i); // Save the URL to Firestore
          }
        }
      }
      if (!this.images || this.images.length <= 0) {
        console.error("Must be at least 1 image exist");
        return;
      }
      for (let i = 0; i < this.originData.length; i++) {
        const imgOg = this.originData[i]
        if (!this.images.find((img) => img.id === imgOg.id)) {
          await deleteDoc(doc(db, "banners", imgOg.id));
          await deleteObject(ref(storage, imgOg.url));
        }
      }
      this.fetchImages();
      this.files = null; // Reset file input
    },
    async fetchImages() {
      const imagesCollection = collection(db, "banners");
      const q = query(imagesCollection, orderBy("order"));
      const snapshot = await getDocs(q);
      this.images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      this.originData = [...this.images];
    },
    async saveImageUrl(url, order) {
      const bannersCol = collection(db, "banners"); // Store URL and order in Firestore
      await addDoc(bannersCol, { url, order });
    },
    previewImages(event) {
      const files = event.target.files;
      Array.from(files)
        .map((file) => URL.createObjectURL(file))
        .forEach((f, index) =>
          this.images.unshift({ url: f, file: files[index] })
        );
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    moveUp(index) {
      if (index > 0) {
        const imagesClone = [...this.images];
        imagesClone[index] = this.images[index - 1];
        imagesClone[index - 1] = this.images[index];
        this.images = [...imagesClone];
      }
    },
    moveDown(index) {
      if (index < this.images.length - 1) {
        const imagesClone = [...this.images];
        imagesClone[index] = this.images[index + 1];
        imagesClone[index + 1] = this.images[index];
        this.images = [...imagesClone];
      }
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
.img-thumbnail {
  height: 100px; /* Set thumbnail height */
  object-fit: cover;
  margin-right: 10px; /* Space between images */
}
.image-previews {
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */
  white-space: nowrap; /* Prevent wrapping to new lines */
  padding: 10px 0;
}
.custom-file-label {
  white-space: nowrap;
  overflow-x: hidden;
}
/*  */
</style>
