import { InventoryItem } from "@/models/InventoryItem";

class ItemService {
  public sortedFilter(
    items: InventoryItem[],
    searchQuery: string
  ): InventoryItem[] {
    return this.sort(this.filter(items, searchQuery));
  }

  public getGroups(items: InventoryItem[], searchQuery: string): string[] {
    const results = this.sortedFilter(items, searchQuery);
    return [...new Set(results.map((item) => item.group))] //
      .sort((a, b) => (a > b ? 1 : -1));
  }

  public filter(items: InventoryItem[], searchQuery: string): InventoryItem[] {
    const filtered = items.filter((item) =>
      this.applyFilters(item, searchQuery)
    );
    return filtered;
  }

  public sort(items: InventoryItem[]): InventoryItem[] {
    return [...items].sort((a, b) => {
      const groupA = a.group.toLowerCase();
      const groupB = b.group.toLowerCase();

      if (groupA !== groupB) {
        return groupA > groupB ? 1 : -1;
      }
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA > nameB ? 1 : -1;
    });
  }

  public applyFilters(item: InventoryItem, searchQuery: string): boolean {
    const queryFilters = searchQuery.split(" ");
    if (searchQuery.trim() === "") {
      return true;
    }
    const results = queryFilters.map((queryFilter) =>
      this.applyFilter(item, queryFilter)
    );
    return results.filter((res) => res == false).length == 0;
  }

  private applyFilter(item: InventoryItem, filter: string): boolean {
    if (item.name.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    if (item.group.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    return false;
  }
}
const itemService = new ItemService();
export default itemService;
