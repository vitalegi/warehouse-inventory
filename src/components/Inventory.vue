<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field label="Cerca/aggiungi elementi" v-model="text">
          <v-btn
            icon
            @click="addItem(text)"
            :disabled="!enableAddItem"
            slot="append"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="(item, id) in items"
              :key="id"
              xs="12"
              sm="12"
              md="6"
              lg="4"
              xl="3"
              cols="12"
            >
              <v-card>
                <v-card-title>
                  {{ item.name }}
                  <v-spacer></v-spacer>
                  <v-btn icon @click="deleteItem(item.name)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-actions>
                  <v-container>
                    <v-row>
                      <v-col>
                        {{ item.quantity }}
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col>
                        <v-btn icon @click="incrementQuantity(item.name, -1)">
                          <v-icon>remove_circle_outline</v-icon>
                        </v-btn>
                        <v-btn icon @click="incrementQuantity(item.name, +1)">
                          <v-icon>add_circle_outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12">
        <summary-inventory />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import SummaryInventory from "@/components/SummaryInventory.vue";
import { InventoryItem } from "@/models/InventoryItem";
import inventoryPersistence from "@/services/InventoryPersistenceService";

export default Vue.extend({
  name: "Inventory",
  components: { SummaryInventory },
  data: () => ({
    text: "",
  }),
  computed: {
    items(): InventoryItem[] {
      return (this.$store.state.items as InventoryItem[])
        .filter(this.searchFilter())
        .sort((a, b) => (a.name >= b.name ? 1 : -1));
    },
    exportItems() {
      const items = this.$store.state.items as InventoryItem[];
      return items.map((item) => `${item.name}\t${item.quantity}`).join("\n");
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
    deleteItem(text: string) {
      console.log(`deleteItem ${text}`);
      const item = this.getItems().find((item) => item.name === text);
      if (item) {
        this.$store.commit("deleteItem", new InventoryItem(text));
      }
    },
    incrementQuantity(itemName: string, increment: number) {
      console.log(`updateItem ${itemName}, ${increment}`);
      this.$store.commit(
        "updateItem",
        new InventoryItem(itemName, this.itemQuantity(itemName) + increment)
      );
    },
    itemQuantity(itemName: string) {
      const element = this.findItem(itemName);
      if (element) {
        return element.quantity;
      } else {
        throw Error(`item ${itemName} not found`);
      }
    },
    findItem(itemName: string): InventoryItem | undefined {
      return this.getItems().find((curr) => curr.name === itemName);
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
