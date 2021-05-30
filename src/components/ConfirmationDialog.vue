<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon :color="color" v-bind="attrs" v-on="on">
        <v-icon :large="largeIcon">{{ icon }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Annulla </v-btn>
        <v-btn
          color="primary"
          text
          @click="
            dialog = false;
            accept();
          "
        >
          Procedi
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfirmationDialog",
  props: ["title", "message", "icon", "color", "largeIcon"],
  data: () => ({
    dialog: false,
  }),
  methods: {
    accept(): void {
      this.$emit("accept");
    },
  },
});
</script>
