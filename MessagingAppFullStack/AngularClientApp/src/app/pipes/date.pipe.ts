import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value?: string, ...args: unknown[]): string {
    if (!value) return '';

    const date = new Date(value);
    return date.toLocaleString();
  }
}
