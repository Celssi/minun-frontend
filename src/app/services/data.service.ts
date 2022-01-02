import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {LoginResult} from '../models/loginResult';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public login(credentials: any): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.backendUrl + 'users/login', credentials);
  }

  public register(user): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.backendUrl + 'users/register', user);
  }

  public save(user): Observable<any> {
    if (user.id) {
      return this.http.put(environment.backendUrl + 'users', user, {
        headers: this.getAuthorizationHeader()
      });
    } else {
      return this.register(user);
    }
  }

  public checkEmailExists(email: string, userId: number): Observable<boolean> {
    return this.http.post<boolean>(environment.backendUrl + 'users/check-email', {email, userId});
  }

  public checkHandleExists(handle: string, userId: number): Observable<boolean> {
    return this.http.post<boolean>(environment.backendUrl + 'users/check-handle', {handle, userId});
  }

  getCurrentUser(): Observable<User> {
    if (!this.getToken()) {
      return;
    }

    return this.http.get<User>(environment.backendUrl + 'users/current', {
      headers: this.getAuthorizationHeader()
    });
  }

  public setToken(token): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(environment.backendUrl + 'users/' + id);
  }

  getUserWithHandle(handle: any): Observable<User> {
    return this.http.get<User>(environment.backendUrl + 'users/with-handle/' + handle);
  }
}
