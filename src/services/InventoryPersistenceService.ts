import { InventoryItem } from "@/models/InventoryItem";

const storage = window.localStorage;

const defaultValues = [
  "Sacchi di patate",
  "Pane",
  "Carote",
  "Mango",
  "Fragole",
];

class InventoryPersistenceService {
  public persist(items: InventoryItem[]): void {
    storage.setItem("items", JSON.stringify(items));
  }
  public retrieve(): InventoryItem[] {
    const value = storage.getItem("items");
    if (value && value.trim() !== "") {
      return JSON.parse(value);
    }
    return defaultValues.map((value) => new InventoryItem(value));
  }
}

const inventoryPersistence = new InventoryPersistenceService();

export default inventoryPersistence;
