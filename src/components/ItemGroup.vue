<template>
  <v-card>
    <v-card-title>
      {{ group }}
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-expand-transition>
        <v-container v-show="show">
          <v-row dense>
            <v-col
              v-for="(item, id2) in groupItems"
              :key="id2"
              xs="12"
              sm="12"
              md="6"
              lg="4"
              xl="3"
              cols="12"
            >
              <item-card :item="item" />
            </v-col>
          </v-row>
        </v-container>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import ItemCard from "@/components/ItemCard.vue";
import { InventoryItem } from "@/models/InventoryItem";
import itemService from "@/services/ItemService";

export default Vue.extend({
  name: "ItemGroup",
  components: { ItemCard },
  props: ["group", "search"],
  data: () => ({
    show: false,
  }),
  computed: {
    groupItems(): InventoryItem[] {
      return itemService.sortedFilter(
        this.getItems().filter((item) => item.group === this.group),
        this.search
      );
    },
  },
  methods: {
    getItems(): InventoryItem[] {
      return this.$store.state.items as InventoryItem[];
    },
  },
});
</script>
