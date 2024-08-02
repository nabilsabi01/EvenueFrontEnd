import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPrice',
  standalone: true
})
export class SearchByPricePipe implements PipeTransform {
  transform(list: any[], term: string): any[] {
    const filteredList: any[] = [];
    list.forEach(event => {
      const minPrice = this.getMinPrice(event.tickets);
      if (minPrice !== null && minPrice.toString().includes(term)) {
        filteredList.push({ ...event });
      }
    });
    return filteredList;
  }
  private getMinPrice(tickets: any[]): number | null {
    if (!tickets || tickets.length === 0) {
      return null;
    }
    let minPrice = tickets[0].price;
    for (let i = 1; i < tickets.length; i++) {
      if (tickets[i].price < minPrice) {
        minPrice = tickets[i].price;
      }
    }
    return minPrice;
  }
}
