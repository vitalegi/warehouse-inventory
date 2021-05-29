<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="10">
            <v-text-field label="Search/Add item" v-model="text"></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn icon @click="addItem(text)">
              <v-icon large>add_circle_outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
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
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-actions>
                  <v-container>
                    <v-row>
                      <v-col cols="4">
                        <v-btn icon @click="decrementQuantity(item.name)">
                          <v-icon>remove_circle_outline</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="4">
                        {{ item.quantity }}
                      </v-col>
                      <v-col cols="4">
                        <v-btn icon @click="incrementQuantity(item.name)">
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
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <pre>{{ exportItems }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { InventoryItem } from "@/models/InventoryItem";
import inventoryPersistence from "@/services/InventoryPersistenceService";

export default Vue.extend({
  name: "Inventory",

  data: () => ({
    text: "",
  }),
  computed: {
    items(): InventoryItem[] {
      return (this.$store.state.items as InventoryItem[]).filter(
        this.searchFilter()
      );
    },
    exportItems() {
      const items = this.$store.state.items as InventoryItem[];
      return items.map((item) => `${item.name}\t${item.quantity}`).join("\n");
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
    incrementQuantity(itemName: string) {
      console.log(`updateItem ${itemName}, +1`);
      this.$store.commit(
        "updateItem",
        new InventoryItem(itemName, this.itemQuantity(itemName) + 1)
      );
    },
    decrementQuantity(itemName: string) {
      console.log(`updateItem ${itemName}, -1`);
      this.$store.commit(
        "updateItem",
        new InventoryItem(itemName, this.itemQuantity(itemName) - 1)
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
