import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { LoginData } from '@shared/models/login';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';

class MockAuthService {
  login(data: LoginData): Observable<any> {
    if (data.user !== 'user@demo.com' || data.password !== '123456') {
      return throwError(() => new HttpResponse({ status: 403 }))
    }
    return of({ user: 'user@demo.com', token: 'slgorhf.vo2048v.fjdsf9' });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render image', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeDefined();
  })

  it('should show error by validating user', () => {
    component.user.setValue('xxx');
    component.user.markAsTouched();
    fixture.detectChanges();
    const matError = fixture.nativeElement.querySelector('mat-error');
    expect(matError.textContent).toEqual('Invalid email format');
  })

  it('should show error by validating password', () => {
    component.password.setValue('xxx');
    component.password.markAsTouched();
    fixture.detectChanges();
    const matError = fixture.nativeElement.querySelector('mat-error');
    expect(matError.textContent).toEqual('Invalid password');
  })

  it('should show error by validating credentials', () => {
    component.user.setValue('zzz@zzz.zz');
    component.password.setValue('zzz123');
    component.formGroup.markAllAsTouched();
    component.login();
    fixture.detectChanges();
    const matError = fixture.nativeElement.querySelector('mat-error');
    expect(matError.textContent).toEqual('Invalid username or password');
  })

  it('should call Router.navigate after login', () => {
    const navigationSpy = routerSpy.navigate.and.returnValue(new Promise((res) => res(true)));
    component.user.setValue('user@demo.com');
    component.password.setValue('123456');
    component.formGroup.markAllAsTouched();
    component.login();
    expect(navigationSpy.calls.count()).withContext('navigate called').toBe(1);
  })

});
