<template>
  <inventory />
</template>

<script lang="ts">
import Vue from "vue";
import Inventory from "@/components/Inventory.vue";

export default Vue.extend({
  name: "InventoryView",

  components: {
    Inventory,
  },
});
</script>
