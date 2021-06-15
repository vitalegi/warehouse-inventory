import { InventoryItem } from "@/models/InventoryItem";

const storage = window.localStorage;

const defaultValues = [
  {
    group: "CARNE",
    values: [
      "ARROSTO DI V.ONE",
      "BOLLITO",
      "BRASATO",
      "POLPETTE",
      "POLPETTONE",
      "ROASTBEEF",
      "SPEZZATINO",
      "ARISTA",
      "FUSI DI POLLO",
      "INVOLTINI DI SUINO (FUNGHI)",
      "Involtini di suino (funghi)",
      "SOVRACCOSCE DI POLLO",
      "SPIEDINI DI SUINO",
      "SPIEDINI DI TACCHINO",
      "TAGLIATA DI POLLO",
      "BRACIOLA DI SUINO",
      "STRACCETTI DI POLLO",
      "STRACCETTI DI TACCHINO",
      "ARROSTO DI VITELLO",
      "FETTE DI COPPA PER PIASTRA",
      "FETTE DI LOMBO PER PIASTRA",
      "INVOLTINI DI POLLO",
    ],
  },
  { group: "PESCE", values: ["CALAMARI", "GAMBERETTI", "POLIPO"] },
  {
    group: "LEGUMI",
    values: ["CANNELLINI", "BORLOTTI", "CECI", "FAGIOLI ROSSI"],
  },
  {
    group: "VERDURA",
    values: [
      "PATATE CUBO",
      "PATATE CUBETTO ",
      "PATATE JULIENNE",
      "PATATE FETTA",
      "PATATE BASTONCINO",
      "CAROTE CUBETTO",
      "CAROTE FETTA",
      "CAROTE JULIENNE",
      "CAROTE RONDELLA ONDULATA",
      "CATALOGNA",
      "CAVOLFIORE",
      "CAVOLO CAPPUCCIO JULIENNE",
      "CAVOLO ROMANO",
      "CAVOLO VIOLA JULIENNE",
      "CICORIA",
      "CIPOLLA BIANCA ANELLO",
      "CIPOLLA BIANCA FETTA",
      "CIPOLLA BIANCA JULIENNE",
      "CIPOLLA DI TROPEA",
      "CIPOLLA DI TROPEA AGRODOLCE",
      "CORALLO ",
      "COSTE",
      "ERBETTE ",
      "FAGIOLINI",
      "FINOCCHI RITAGLIO",
      "FINOCCHI SPICCHIO",
      "FUNGHI CHAMPIGNON FETTE",
      "FUNGHI MISTI CUBO",
      "PEPERONI BRUNOISE",
      "PEPERONI CUBO",
      "PEPERONI FALDE",
      "PISELLI",
      "POMODORI CONFIT",
      "RADICCHIO A SPICCHI",
      "RADICCHIO STUFATO",
      "SCAROLA",
      "SPINACI",
      "VERZA",
      "ZUCCA CUBETTO",
      "ZUCCA CUBO",
      "ZUCCHINE BASTONCINO",
      "ZUCCHINE CUBETTO",
      "ZUCCHINE FETTA",
      "ZUCCHINE JULIENNE",
    ],
  },
  {
    group: "CEREALI",
    values: ["ORZO", "FARRO", "BULGUR", "RISO BASMATI", "RISO VENERE"],
  },
  { group: "BASI", values: ["BASE CIPOLLA", "BASE MIREPOIX"] },
  {
    group: "SUGHI",
    values: [
      "PESTO ALLA GENOVESE (PINOLI)",
      "PESTO DI RADICCHIO (MANDORLE)",
      "PESTO DI RUCOLA (PINOLI)",
      "PESTO DI SEDANO (NOCI)",
      "RAGU' DI CARNE",
      "RAGU' DI SOIA",
      "SALSA DI POMODORO",
      "PESTO ALLA SICILIANA ",
      "PUTTANESCA",
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
