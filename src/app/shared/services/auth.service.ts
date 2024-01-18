import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginData, LoginResponse } from '@shared/models/login';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = environment.authUrl;
  private _http = inject(HttpClient);

  login(data: LoginData): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(this._url + '/login', data);
  }
  
  logout() {
    return this._http.post<unknown>(this._url + '/logout', {
      token: localStorage.getItem('token')
    }, { observe: 'response' }).pipe(
      tap(() => localStorage.removeItem('token'))
    );
  }
}
