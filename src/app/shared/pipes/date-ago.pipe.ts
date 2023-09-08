import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  language = localStorage.getItem('language');

  transform(value: any, args?: any): any {
   
      if (value) {
        const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
        let intervals: any;

        // less than 30 seconds ago will show as 'Just now'
        if (seconds < 29) return this.language === 'en' ? 'Just now' : 'Justo Ahora';

        if (this.language === 'en') {

          intervals = {
            'year': 31536000,
            'month': 2592000,
            'week': 604800,
            'day': 86400,
            'hour': 3600,
            'minute': 60,
            'second': 1
          };

        }
        else intervals = {
          'año': 31536000,
          'mes': 2592000,
          'semana': 604800,
          'día': 86400,
          'hora': 3600,
          'minuto': 60,
          'segundo': 1
        };

        let counter: number;

        for (const i in intervals) {
          counter = Math.floor(seconds / intervals[i]);
          if (counter > 0)

            if (counter === 1) {

              // singular (1 day ago)
              if (this.language === 'en') return counter + ' ' + i + ' ago'
              else return 'Hace ' + counter + ' ' + i;

            } else {

              // plural (2 days ago)
              if (this.language === 'en') return counter + ' ' + i + 's ago';
              else return 'Hace ' + counter + ' ' + i + 's';

            }
        }
      }
      return value;
    }
  }


