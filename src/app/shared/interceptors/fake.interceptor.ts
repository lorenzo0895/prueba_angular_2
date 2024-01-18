import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { LoginData } from '@shared/models/login';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export const fakeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'POST' && req.url === environment.authUrl + '/login') {
    return handleLogin(req);
  }
  if (req.method === 'POST' && req.url === environment.authUrl + '/logout') {
    return of(handleLogout(req));
  }
  return next(req);
};

const handleLogin = (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
  const { user, password } = <LoginData>(req.body ?? {});
  const isValid = user === 'user@demo.com' && password === '123456';
  if (!isValid) {
    return throwError(() => new HttpResponse({ 
      url: req.url,
      status: 403,
      statusText: 'Unauthorized'
    }));
  }
  return of(new HttpResponse({
    status: 200,
    body: { user: 'user@demo.com', token: 'slgorhf.vo2048v.fjdsf9' },
  }));
};

const handleLogout = (req: HttpRequest<unknown>): HttpEvent<unknown> => {
  const isValid = !!localStorage.getItem('token');
  if (!isValid) throw new HttpErrorResponse({ status: 403 });
  return new HttpResponse({ status: 200 });
};
