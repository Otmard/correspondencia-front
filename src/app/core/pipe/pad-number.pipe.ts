import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padNumber',
  standalone: true,
})
export class PadNumberPipe implements PipeTransform {
  transform(value: number, length: number = 5): string {
    return value.toString().padStart(length, '0');
  }
}
