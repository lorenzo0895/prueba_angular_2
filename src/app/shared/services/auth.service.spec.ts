import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginData } from '@shared/models/login';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeInterceptor } from '@shared/interceptors/fake.interceptor';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(withInterceptors([fakeInterceptor]))
      ]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should return Unauthorized with invalid credentials', (done: DoneFn) => {
    const invalidData: LoginData = { user: 'xx', password: 'xx' };
    service.login(invalidData).subscribe({
      next: () => {
        done.fail();
      },
      error: (err) => {
        expect(err.status).toEqual(403);
        done();
      }
    })
  });

  it('login should return LoginResponse with valid credentials', (done: DoneFn) => {
    const okData: LoginData = { user: 'user@demo.com', password: '123456' };
    service.login(okData).subscribe({
      next: (res) => {
        expect(res.user).toEqual(okData.user);
        expect(res.token).toBeDefined();
        done();
      },
      error: () => done.fail(),
      
    })
  });

  it('logout should return Unauthorized with invalid credentials', (done: DoneFn) => {
    service.logout().subscribe({
      next: () => done.fail(),
      error: (err) => {
        expect(err.status).toEqual(403);
        done();
      }
    })
  });

  it('logout should return 200 Ok with valid credentials', (done: DoneFn) => {
    localStorage.setItem('token', 'slgorhf.vo2048v.fjdsf9');
    service.logout().subscribe({
      next: (res) => {
        expect(res.status).toEqual(200);
        done();
      },
      error: () => done.fail(),  
    })
  });

});
