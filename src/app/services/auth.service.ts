import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {DataService} from './data.service';

@Injectable()
export class AuthService {
  user: User;

  constructor(private dataService: DataService) {
    if (this.isAuthenticated() && !this.user) {
      this.dataService.getCurrentUser().subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public setUser(user: User): void {
    this.user = user;
  }
}
