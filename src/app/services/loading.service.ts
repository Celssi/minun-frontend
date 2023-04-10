import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();

  setLoading(isLoading: boolean): void {
    setTimeout(() => {
      this.isLoading$$.next(isLoading);
    }, 0);
  }
}
