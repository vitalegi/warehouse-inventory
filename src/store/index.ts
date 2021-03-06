import Vue from "vue";
import Vuex from "vuex";
import { InventoryItem } from "@/models/InventoryItem";
import inventoryPersistence from "@/services/InventoryPersistenceService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: new Array<InventoryItem>(),
  },
  mutations: {
    addItem(state, item: InventoryItem) {
      state.items.push(item);
      inventoryPersistence.persist(state.items);
    },
    overrideItems(state, items: InventoryItem[]) {
      state.items.splice(0);
      state.items.push(...items);
      inventoryPersistence.persist(state.items);
    },
    deleteItem(state, item: InventoryItem) {
      const index = state.items.findIndex((i) => i.name === item.name);
      state.items.splice(index, 1);
      inventoryPersistence.persist(state.items);
    },
    updateItem(state, item: InventoryItem) {
      const element = state.items.find((curr) => curr.name === item.name);
      if (element) {
        element.quantity = item.quantity;
        inventoryPersistence.persist(state.items);
      } else {
        throw Error(`item ${this.name} not found`);
      }
    },
    setItems(state, items: InventoryItem[]) {
      state.items.splice(0);
      items.forEach((item) => state.items.push(item));
    },
  },
  actions: {},
  modules: {},
});
