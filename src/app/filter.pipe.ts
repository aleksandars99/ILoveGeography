import { Pipe, PipeTransform } from '@angular/core';
import { countries } from './countries';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(countries: countries[], filterBy: string):countries[] {
    if (!countries || !filterBy) {
      return countries;
    }
    return countries.filter(countries => countries.name.common.toLowerCase().includes(filterBy.toLowerCase()) && countries.name.common.toLowerCase()!="kosovo");
  }

}
