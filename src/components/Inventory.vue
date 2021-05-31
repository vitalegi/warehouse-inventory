<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <inventory-action-bar @updateSearch="updateSearch" />
      </v-col>
      <v-col cols="12" v-for="group in groups" :key="group">
        <item-group :group="group" :search="text" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <summary-inventory />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import SummaryInventory from "@/components/SummaryInventory.vue";
import ItemGroup from "@/components/ItemGroup.vue";
import InventoryActionBar from "@/components/InventoryActionBar.vue";
import { InventoryItem } from "@/models/InventoryItem";
import inventoryPersistence from "@/services/InventoryPersistenceService";
import itemService from "@/services/ItemService";

export default Vue.extend({
  name: "Inventory",
  components: { SummaryInventory, ItemGroup, InventoryActionBar },
  data: () => ({
    text: "",
  }),
  computed: {
    items(): InventoryItem[] {
      return itemService.sortedFilter(
        this.$store.state.items as InventoryItem[],
        this.text
      );
    },
    groups(): string[] {
      return itemService.getGroups(this.items, this.text);
    },
  },
  methods: {
    getItems(): InventoryItem[] {
      return this.$store.state.items as InventoryItem[];
    },
    updateSearch(text: string) {
      this.text = text;
    },
  },
  mounted() {
    const values = inventoryPersistence.retrieve();
    if (this.getItems().length == 0) {
      this.$store.commit("setItems", values);
    }
  },
});
</script>

<style lang="scss">
strong {
  font-weight: bold;
}
</style>
