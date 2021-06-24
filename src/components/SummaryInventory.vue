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
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="newInventory"
              label="Importa un nuovo inventario"
              auto-grow
              outlined
              append-icon="mdi-close"
              @click:append="newInventory = ''"
            ></v-textarea>
            <v-btn elevation="2" @click="importInventory()">Importa</v-btn>
            <v-snackbar v-model="snackbar">
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-col>
          <v-col cols="12">
            <pre>{{ formatItems() }}</pre>
          </v-col>
        </v-row>
      </v-container>
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
  data: () => ({
    newInventory: "",
    snackbar: false,
    errors: new Array<string>(),
  }),
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
    importInventory(): void {
      console.log("Import", this.newInventory);
      this.errors.splice(0);
      const entries = this.newInventory.split("\n");
      const items = new Array<InventoryItem>();

      entries.forEach((entry: string, index: number) => {
        try {
          items.push(this.processImportEntry(entry));
        } catch (e) {
          console.error(e.message);
          this.errors.push(`Linea ${index + 1}, ${e.message}`);
        }
      });
      if (this.errors.length > 0) {
        this.snackbar = true;
      }
      console.log(this.errors.join(", "));
      if (items.length > 0) {
        this.$store.commit("overrideItems", items);
      }
    },
    processImportEntry(entry: string): InventoryItem {
      const values = entry.split(";");
      if (values.length !== 3) {
        throw new Error(`"${entry}" non contiene 3 elementi`);
      }
      const group = values[0].trim();
      if (group === "") {
        throw new Error(`"${entry}" non contiene un gruppo valido`);
      }
      const name = values[1].trim();
      if (group === "") {
        throw new Error(`"${entry}" non contiene un nome valido`);
      }
      const quantity = parseInt(values[2].trim(), 10);
      return new InventoryItem(name, quantity, group);
    },
  },
});
</script>
