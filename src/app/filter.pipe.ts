import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], filterValue: string): any[] {

    if(arr.length === 0 || filterValue === ''){
      return arr;
    }

    return arr.filter(e => (e.userName as string).toLowerCase().includes(filterValue.toLowerCase()))

  }

}
