import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {mergeMap, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {DataService} from '../services/data.service';
import {LoginResult} from '../models/loginResult';

@Injectable()
export class NotLoggedInInterceptor implements HttpInterceptor {

  constructor(private dataService: DataService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(response => {
        if (response.status === 401 && !request.url.endsWith('/login')) {
          return this.handle401Error(request, next);
        } else if (response.status === 403 && request.url.endsWith('/refresh')) {
          this.dataService.logout().subscribe();
        }

        return throwError(response);
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refreshToken = this.dataService.getRefreshToken();
    const token = this.dataService.getToken();

    if (!refreshToken || !token) {
      this.dataService.logout().subscribe();
      throwError(() => new Error('Login expired'));
    }

    return this.dataService.refresh(refreshToken, token).pipe(
      mergeMap((result: LoginResult) => {
        this.dataService.setToken(result.token);
        this.dataService.setRefreshToken(result.refreshToken);

        request = request.clone({
          setHeaders: {
            authorization: 'Bearer ' + result.token
          }
        });

        return next.handle(request);
      })
    );
  }
}
