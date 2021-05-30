<template>
  <v-card>
    <v-card-title>
      Inventario
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!canShare()" @click="share()">
        <v-icon large>mdi-share-variant</v-icon>
      </v-btn>
      <reset-inventory
        message="Stai per ripristinare gli elementi ai valori di default, vuoi proseguire?"
        @accept="resetInventory"
      />
    </v-card-title>
    <v-card-text>
      <pre>{{ exportableItems }}</pre>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { InventoryItem } from "@/models/InventoryItem";
import ResetInventory from "@/components/ResetInventory.vue";
import inventoryPersistence from "@/services/InventoryPersistenceService";

export default Vue.extend({
  name: "SummaryInventory",
  components: { ResetInventory },
  data: () => ({}),
  computed: {
    exportableItems() {
      return this.formatItems();
    },
  },
  methods: {
    canShare(): boolean {
      return !!navigator.share;
    },
    share(): void {
      if (!this.canShare()) {
        console.error("Share API not available on this browser");
        return;
      }
      const share = {
        title: "Inventario",
        text: this.formatItems(),
      };
      navigator
        .share(share)
        .then(() => {
          console.log("Sharing completed");
        })
        .catch(console.error);
    },
    formatItems(): string {
      const items = this.$store.state.items as InventoryItem[];
      return items.map((item) => `${item.name}\t${item.quantity}`).join("\n");
    },
    resetInventory(): void {
      console.log("Reset items to default values");
      inventoryPersistence.persist(null);
      const values = inventoryPersistence.retrieve();
      this.$store.commit("setItems", values);
    },
  },
});
</script>
