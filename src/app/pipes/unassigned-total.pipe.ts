import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unassignedTotal'
})
export class UnassignedTotalPipe implements PipeTransform {

  transform(list: Array<any>): number {
    const remaining = list.reduce((freq: any, value: any) => {
      return freq[value] ? ++freq[value] : freq[value] = 1, freq
    }, {});
    return remaining['null'];
  }

}
