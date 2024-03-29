import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { LoginResult } from '../models/loginResult';
import { from, map, mergeMap, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ResetRequest } from '../models/resetRequest';
import { Subscription } from '../models/subscription';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Output() scrollEmitter = new EventEmitter<void>();
  stripe$: Observable<Stripe> = from(loadStripe(environment.stripePK));

  constructor(private http: HttpClient, private router: Router) {}

  public login(credentials: any): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.backendUrl + 'login', credentials);
  }

  public async logout(): Promise<void> {
    if (!this.getToken()) {
      return;
    }

    try {
      await this.http.get<void>(environment.backendUrl + 'login/logout/' + this.getRefreshToken(), {
        headers: this.getAuthorizationHeader()
      });
    } catch (err) {
      await this.finalizeLogout();
    } finally {
      await this.finalizeLogout();
    }
  }

  public loginWithFacebookToken(facebookToken: string): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.backendUrl + 'login/facebook', { facebookToken });
  }

  public loginWithGoogleToken(googleToken: string): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.backendUrl + 'login/google', { googleToken });
  }

  public refresh(refreshToken: string, token: string): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.backendUrl + 'login/refresh', { refreshToken, token });
  }

  public register(user): Observable<LoginResult> {
    return this.http.post<LoginResult>(environment.backendUrl + 'login/register', user);
  }

  public confirmCode(email: string, confirmCode: string): Observable<void> {
    return this.http.post<void>(environment.backendUrl + 'login/confirm', { email, confirmCode });
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
    return this.http.post<boolean>(environment.backendUrl + 'users/check-email', { email, userId });
  }

  public checkHandleExists(handle: string, userId: number): Observable<boolean> {
    return this.http.post<boolean>(environment.backendUrl + 'users/check-handle', { handle, userId });
  }

  public deleteCurrentProfile(): Observable<any> {
    return this.http.delete<any>(environment.backendUrl + 'users', {
      headers: this.getAuthorizationHeader()
    });
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.backendUrl + 'users');
  }

  public getUser(id: any): Observable<User> {
    return this.http.get<User>(environment.backendUrl + 'users/' + id);
  }

  public getUserWithHandle(handle: any): Observable<User> {
    return this.http.get<User>(environment.backendUrl + 'users/with-handle/' + handle);
  }

  search(searchText: string, offset: number): Observable<User[]> {
    return this.http.get<User[]>(environment.backendUrl + 'users/search/' + searchText + '/' + offset);
  }

  getCurrentUser(): Observable<User> {
    if (!this.getToken()) {
      return;
    }

    return this.http.get<User>(environment.backendUrl + 'users/current', {
      headers: this.getAuthorizationHeader()
    });
  }

  getResetPassword(code: string): Observable<ResetRequest> {
    return this.http.get<ResetRequest>(environment.backendUrl + 'users/reset-password/' + code);
  }

  resetPassword(values: any): Observable<ResetRequest> {
    return this.http.post<ResetRequest>(environment.backendUrl + 'users/reset-password', values);
  }

  getSession(): Observable<string> {
    return this.http.get<{ id: string }>(environment.backendUrl + 'stripe/session').pipe(map((res) => res.id));
  }

  redirectToCheckout(sessionId: string): Observable<never | { error: StripeError }> {
    return this.stripe$.pipe(mergeMap((stripe: Stripe) => stripe.redirectToCheckout({ sessionId })));
  }

  goToCheckout(): Observable<never | { error: StripeError }> {
    return this.getSession().pipe(mergeMap((sessionId: string) => this.redirectToCheckout(sessionId)));
  }

  goToUpdateSubscription(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(environment.backendUrl + 'stripe/update-subscription', {
      headers: this.getAuthorizationHeader()
    });
  }

  getSubscription(): Observable<Subscription> {
    return this.http.get<Subscription>(environment.backendUrl + 'stripe/subscription', {
      headers: this.getAuthorizationHeader()
    });
  }

  resubscribe(): Observable<void> {
    return this.http.get<void>(environment.backendUrl + 'stripe/resubscribe', {
      headers: this.getAuthorizationHeader()
    });
  }

  cancelSubscription(): Observable<void> {
    return this.http.get<void>(environment.backendUrl + 'stripe/cancel-subscription', {
      headers: this.getAuthorizationHeader()
    });
  }

  public setToken(token): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setRefreshToken(refreshToken): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  public getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });
  }

  private async finalizeLogout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    await this.router.navigate(['etusivu']);
  }
}
