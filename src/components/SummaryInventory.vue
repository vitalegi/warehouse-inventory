<template>
  <v-card>
    <v-card-title>
      Sommario
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!canShare()" @click="share()">
        <v-icon large color="primary">mdi-share-variant</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <pre>{{ formatItems() }}</pre>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <confirmation-dialog
        title="Attenzione"
        message="Stai per ripristinare l'inventario ai valori di default, proseguire?"
        @accept="resetInventory"
        color="red lighten-2"
        icon="delete_forever"
        :largeIcon="true"
      />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { InventoryItem } from "@/models/InventoryItem";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import inventoryPersistence from "@/services/InventoryPersistenceService";
import itemService from "@/services/ItemService";

export default Vue.extend({
  name: "SummaryInventory",
  components: { ConfirmationDialog },
  data: () => ({}),
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
      return itemService
        .sort(items)
        .map((item) => `${item.group};${item.name};${item.quantity}`)
        .join("\n");
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
