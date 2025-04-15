import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTitre'
})
export class FilterByTitrePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
