<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-text-field label="Cerca/aggiungi elementi" v-model="text">
          <v-btn
            icon
            @click="addItem(text)"
            :disabled="!enableAddItem"
            slot="append"
          >
            <v-icon color="primary">add</v-icon>
          </v-btn>
          <v-btn icon @click="text = ''" slot="prepend">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-text-field>
      </v-col>
      <v-col cols="12" v-for="(group, groupId) in groups" :key="groupId">
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
import { InventoryItem } from "@/models/InventoryItem";
import inventoryPersistence from "@/services/InventoryPersistenceService";

export default Vue.extend({
  name: "Inventory",
  components: { SummaryInventory, ItemGroup },
  data: () => ({
    text: "",
  }),
  computed: {
    items(): InventoryItem[] {
      return (this.$store.state.items as InventoryItem[])
        .filter(this.searchFilter())
        .sort((a, b) => (a.name >= b.name ? 1 : -1));
    },
    enableAddItem() {
      if (this.text.trim() === "") {
        return false;
      }
      const items = this.$store.state.items as InventoryItem[];
      return (
        items.findIndex(
          (item) => item.name.toLowerCase() === this.text.toLowerCase()
        ) === -1
      );
    },
    groups(): string[] {
      return [...new Set(this.items.map((item) => item.group))];
    },
  },
  methods: {
    searchFilter() {
      return (item: InventoryItem) => {
        if (this.text.trim() === "") {
          return true;
        }
        return item.name.toLowerCase().includes(this.text.toLowerCase());
      };
    },
    addItem(text: string) {
      console.log(`addItem ${text}`);
      const index = this.getItems().findIndex(
        (item) => item.name.toLowerCase() === text.toLowerCase()
      );
      if (index !== -1) {
        throw Error(`Duplicate item: ${text}`);
      }
      this.$store.commit("addItem", new InventoryItem(text));
    },
    getItems(): InventoryItem[] {
      return this.$store.state.items as InventoryItem[];
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
