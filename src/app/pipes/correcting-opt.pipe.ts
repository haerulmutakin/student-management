import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'correctingOpt'
})
export class CorrectingOptPipe implements PipeTransform {

  transform(list: Array<any>, id: string): Array<any> {
    return list.filter((item) => item._id !== id);
  }

}
