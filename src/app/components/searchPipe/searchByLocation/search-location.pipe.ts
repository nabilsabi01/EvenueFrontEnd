import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchLocation',
  standalone: true
})
export class SearchLocationPipe implements PipeTransform {

  transform(list: any[], term: string): any[] {
    const filteredList: any[] = [];
    list.forEach(event => {
      if (event.location?.toLowerCase().includes(term.toLowerCase())) {
        filteredList.push({ ...event });
      }
    });
    return filteredList;
  }
  
}
