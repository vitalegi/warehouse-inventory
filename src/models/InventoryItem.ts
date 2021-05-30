export class InventoryItem {
  public name;
  public quantity;
  public group;

  public constructor(name = "", quantity = 0, group = "") {
    this.name = name;
    this.quantity = quantity;
    this.group = group;
  }
}
