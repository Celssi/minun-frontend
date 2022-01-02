import {Injectable} from '@angular/core';

@Injectable()
export class LocaleService {
  private currentLocale = 'fi-FI';

  get locale(): string {
    return this.currentLocale;
  }

  set locale(value: string) {
    this.currentLocale = value;
  }
}
