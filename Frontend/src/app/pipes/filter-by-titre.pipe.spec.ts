import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTitre'
})
export class FilterByTitrePipe implements PipeTransform {

  transform(ressources: any[], searchText: string): any[] {
    if (!ressources || !searchText) {
      return ressources;
    }

    return ressources.filter(res =>
      res.titre.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
