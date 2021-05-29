import { InventoryItem } from "@/models/InventoryItem";

const storage = window.localStorage;

const defaultValues = [
  "Patate cubetto",
  "Patate cubo",
  "Patate julienne",
  "Patate rondella",
  "Patate bastoncino",
  "Zucchine cubetto",
  "Zucchine rondella",
  "Carote cubetto",
  "Carote rondella",
  "Carote bastoncino",
  "Zucca cubo",
  "Zucca cubetto",
  "Funghi",
  "Cavolfiore",
  "Verza",
  "Peperoni falde",
  "Peperoni brunoise",
  "Peperoni cubo",
  "Finocchi",
  "Finocchi scarto",
];

class InventoryPersistenceService {
  public persist(items: InventoryItem[] | null): void {
    if (items) {
      storage.setItem("items", JSON.stringify(items));
    } else {
      storage.setItem("items", "");
    }
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
