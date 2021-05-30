import { InventoryItem } from "@/models/InventoryItem";

const storage = window.localStorage;

const defaultValues = [
  {
    group: "Verdura",
    values: [
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
    ],
  },
  { group: "Carne", values: ["Braciole", "Manzo", "Affettato"] },
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
    return defaultValues.flatMap((entry) =>
      entry.values.map((value) => new InventoryItem(value, 0, entry.group))
    );
  }
}

const inventoryPersistence = new InventoryPersistenceService();

export default inventoryPersistence;
