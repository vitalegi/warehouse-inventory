<template>
  <v-card>
    <v-card-title>
      {{ item.name }}
      <v-spacer></v-spacer>
      <confirmation-dialog
        title="Attenzione"
        :message="`Sei sicuro di voler eliminare '${item.name}'?`"
        @accept="deleteItem()"
        color="secondary"
        icon="mdi-close"
        :largeIcon="false"
      />
    </v-card-title>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col> </v-col>
          <v-col>
            <strong>{{ item.quantity }}</strong>
          </v-col>
          <v-col align="right">
            <v-btn icon @click="incrementQuantity(-1)">
              <v-icon>remove_circle_outline</v-icon>
            </v-btn>
            <v-btn icon @click="incrementQuantity(1)">
              <v-icon>add_circle_outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { InventoryItem } from "@/models/InventoryItem";

export default Vue.extend({
  name: "ItemCard",
  components: { ConfirmationDialog },
  props: ["item"],
  data: () => ({}),
  computed: {},
  methods: {
    deleteItem() {
      console.log(`deleteItem ${this.item.name}`);
      this.$store.commit("deleteItem", this.item);
    },
    incrementQuantity(increment: number) {
      console.log(`updateItem ${this.item.name}, ${increment}`);
      this.$store.commit(
        "updateItem",
        new InventoryItem(this.item.name, this.item.quantity + increment)
      );
    },
  },
});
</script>

<style lang="scss">
strong {
  font-weight: bold;
}
</style>
