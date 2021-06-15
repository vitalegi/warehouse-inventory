import { InventoryItem } from "@/models/InventoryItem";

const storage = window.localStorage;

const defaultValues = [
  {
    group: "Carne",
    values: [
      "Arista",
      "Arrosto di filetto suino",
      "Arrosto di v.one",
      "Arrosto di vitello",
      "Bollito",
      "Braciola di suino",
      "Brasato",
      "Costine",
      "Fette di coppa per piastra",
      "Fette di lombo per piastra",
      "Fusi di pollo",
      "Hamburger di manzo",
      "Hamburger di suino",
      "Involtini di pollo",
      "Involtini di suino (funghi)",
      "Mini-hamburger di manzo",
      "Mini-hamburger di suino",
      "Pollo al forno",
      "Polpette",
      "Polpettone",
      "Roastbeef",
      "Salsiccia base",
      "Sovraccosce di pollo",
      "Spezzatino",
      "Spiedini di suino",
      "Spiedini di tacchino",
      "Straccetti di pollo",
      "Straccetti di tacchino",
      "Tagliata di pollo",
    ],
  },
  { group: "Pesce", values: ["Calamari", "Gamberetti", "Polipo"] },
  {
    group: "Legumi",
    values: ["Borlotti", "Cannellini", "Ceci", "Fagioli rossi"],
  },
  {
    group: "Verdura",
    values: [
      "Carote cubetto",
      "Carote rondella",
      "Carote bastoncino",
      "Carote julienne",
      "Carote rondella ondulata",
      "Catalogna",
      "Cavolfiore",
      "Cavolo cappuccio julienne",
      "Cavolo romano",
      "Cavolo viola julienne",
      "Cicoria",
      "Cipolla bianca anello",
      "Cipolla bianca fetta",
      "Cipolla bianca julienne",
      "Cipolla di tropea",
      "Cipolla di tropea agrodolce",
      "Corallo",
      "Coste",
      "Erbette",
      "Fagiolini",
      "Finocchi ritaglio",
      "Finocchi spicchio",
      "Funghi champignon fette",
      "Funghi misti cubo",
      "Patate bastoncino",
      "Patate cubetto",
      "Patate cubo",
      "Patate fetta",
      "Patate julienne",
      "Peperoni brunoise",
      "Peperoni cubo",
      "Peperoni falde",
      "Piselli",
      "Pomodori confit",
      "Radicchio a spicchi",
      "Radicchio stufato",
      "Scarola",
      "Spinaci",
      "Verza",
      "Zucca cubetto",
      "Zucca cubo",
      "Zucchine bastoncino",
      "Zucchine cubetto",
      "Zucchine rondella",
      "Zucchine julienne",
    ],
  },
  {
    group: "Cereali",
    values: ["Bulgur", "Farro", "Orzo", "Riso basmati", "Riso venere"],
  },
  { group: "Basi", values: ["Base cipolla", "Base mirepoix"] },
  {
    group: "Sughi",
    values: [
      "Pesto alla genovese (pinoli)",
      "Pesto alla siciliana ",
      "Pesto di radicchio (mandorle)",
      "Pesto di rucola (pinoli)",
      "Pesto di sedano (noci)",
      "Puttanesca",
      "Ragu' di carne",
      "Ragu' di soia",
      "Salsa di pomodoro",
    ],
  },
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
