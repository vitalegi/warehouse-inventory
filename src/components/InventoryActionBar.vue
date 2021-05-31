<template>
  <v-container>
    <v-text-field
      label="Cerca/aggiungi elementi"
      v-model="text"
      @input="updateSearch()"
    >
      <v-btn icon @click="show = !show" slot="append-outer">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="
          text = '';
          updateSearch();
        "
        slot="prepend"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-text-field>
    <v-container v-show="show">
      <v-combobox v-model="group" :items="groups" label="Gruppo">
        <v-btn
          icon
          @click="addItem(text)"
          :disabled="!enableAddItem"
          slot="append-outer"
        >
          <v-icon color="primary">add</v-icon>
        </v-btn>
      </v-combobox>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { InventoryItem } from "@/models/InventoryItem";
import itemService from "@/services/ItemService";

export default Vue.extend({
  name: "InventoryActionBar",
  data: () => ({
    text: "",
    show: false,
    group: "",
  }),
  computed: {
    groups(): string[] {
      return itemService.getGroups(
        this.$store.state.items as InventoryItem[],
        ""
      );
    },
    enableAddItem() {
      if (this.text.trim() === "") {
        return false;
      }
      const items = this.$store.state.items as InventoryItem[];
      if (
        items.findIndex(
          (item) => item.name.toLowerCase() === this.text.toLowerCase()
        ) !== -1
      ) {
        return false;
      }
      if (this.group.trim() === "") {
        return false;
      }
      return true;
    },
  },
  methods: {
    addItem(text: string) {
      console.log(`addItem ${text}`);
      const index = this.getItems().findIndex(
        (item) => item.name.toLowerCase() === text.toLowerCase()
      );
      if (index !== -1) {
        throw Error(`Duplicate item: ${text}`);
      }
      this.$store.commit("addItem", new InventoryItem(text, 0, this.group));
      this.group = "";
      this.show = false;
    },
    getItems(): InventoryItem[] {
      return this.$store.state.items as InventoryItem[];
    },
    updateSearch(): void {
      this.$emit("updateSearch", this.text);
    },
  },
});
</script>

<style lang="scss">
strong {
  font-weight: bold;
}
</style>
