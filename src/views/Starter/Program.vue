<template>
  <div class="bg-default">
    <base-header class="pb-3 pt-5 pt-md-8 bg-default"> </base-header>
    <b-container fluid class="mt-3" style="min-height: calc(100vh - 100px)">
      <div class="container">
        <b-list-group>
          <b-list-group-item
            v-for="item in items"
            :key="item.id"
            class="my-list-item"
          >
            <b-button
              variant="primary"
              class="w-100 text-left"
              @click="toggle(item.id)"
            >
              {{ item.title }}
              <b-icon
                :icon="isOpen(item.id) ? 'chevron-up' : 'chevron-down'"
                class="float-right"
              />
            </b-button>
            <b-collapse :visible="openItem === item.id" :id="'collapse-' + item.id" class="mt-2">
              <b-card-body>
                <ul>
                  <li v-for="subItem in item.subItems" :key="subItem.id">
                    {{ subItem.text }}
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
  name: "program-page",
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
          title: "Nhập viện",
          subItems: [
            { id: 1, text: "Mục con 1" },
            { id: 2, text: "Mục con 2" },
          ],
        },
        {
          id: 2,
          title: "Xuất viện",
          subItems: [
            { id: 3, text: "Mục con 3" },
            { id: 4, text: "Mục con 4" },
          ],
        },
        {
          id: 3,
          title: "Khác",
          subItems: [
            { id: 5, text: "Mục con 5" },
            { id: 6, text: "Mục con 6" },
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
