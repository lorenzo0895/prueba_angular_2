import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { fakeInterceptor } from './fake.interceptor';
import { environment } from 'src/environments/environment';
import { LoginData, LoginResponse } from '@shared/models/login';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '@shared/services/auth.service';
import { of } from 'rxjs';

describe('fakeInterceptor', () => {
  let httpController: HttpTestingController;
  let authService: AuthService;

  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => fakeInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClientTesting(),
        AuthService,
      ]
    });
    httpController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should return LoginResponse with valid credentials', (done: DoneFn) => {
    const body: LoginData = { user: 'user@demo.com', password: '123456' };
    const expected: LoginResponse = { user: 'user@demo.com', token: 'slgorhf.vo2048v.fjdsf9' };

    authService.login(body).subscribe();
    const req = httpController.expectOne(environment.authUrl + '/login');
    
    interceptor(req.request, (req) => of(new HttpResponse(req))).subscribe(x => {
      expect((<HttpResponse<any>>x).body).toEqual(expected);
      done();
    })
    req.flush(body);
  });

  it('should return Unauthorized with invalid credentials', (done: DoneFn) => {
    const body: LoginData = { user: 'user@demo.com', password: 'xxx' };
    
    authService.login(body).subscribe();
    const req = httpController.expectOne(environment.authUrl + '/login');
    
    interceptor(req.request, (req) => of(new HttpResponse(req))).subscribe({
      next:() => done.fail(),
      error:(err) => {
        expect(err.status).toEqual(403);
        done();
      },
    })
    req.flush(body);
  });

});
