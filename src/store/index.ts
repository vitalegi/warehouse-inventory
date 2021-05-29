import Vue from "vue";
import Vuex from "vuex";
import { InventoryItem } from "@/models/InventoryItem";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: new Array<InventoryItem>(),
  },
  mutations: {
    addItem(state, item: InventoryItem) {
      state.items.push(item);
    },
    updateItem(state, item: InventoryItem) {
      const element = state.items.find((curr) => curr.name === item.name);
      if (element) {
        element.quantity = item.quantity;
      } else {
        throw Error(`item ${this.name} not found`);
      }
    },
  },
  actions: {},
  modules: {},
});
