export class InventoryItem {
  public name;
  public quantity;

  public constructor(name = "", quantity = 0) {
    this.name = name;
    this.quantity = quantity;
  }
}
