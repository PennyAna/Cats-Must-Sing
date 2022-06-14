import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
