import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingComponent } from './shopping.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, provideRouter } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { HttpResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeInterceptor } from '@shared/interceptors/fake.interceptor';
import { of } from 'rxjs';
import { routes } from 'src/app/app.routes';
import { ProductsService } from '@shared/services/products.service';
import { Product } from '@shared/models/product';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
const mockResponse: Product[] = [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
},
{
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
},
];

describe('ShoppingComponent', () => {
  let component: ShoppingComponent;
  let fixture: ComponentFixture<ShoppingComponent>;
  let router: Router;
  let authService: AuthService;
  let productsService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([fakeInterceptor])),
        ProductsService,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    productsService = TestBed.inject(ProductsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toBe('Products list');
  })

  it('should call logout method by clicking on the logout button', () => {
    spyOn(component, 'logout');
    const logoutButton = fixture.nativeElement.querySelector('.shopping__header--logout');
    logoutButton.click();
    expect(component.logout).toHaveBeenCalled();
  })

  it('should redirect to login after logout', () => {
    spyOn(authService, 'logout').and.returnValue(of(new HttpResponse({ status: 200 })));
    spyOn(router, 'navigate');

    const logoutButton = fixture.nativeElement.querySelector('.shopping__header--logout');
    logoutButton.click();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['..', 'login']);
  })

  it('should fetch initial data', () => {
    spyOn(productsService, 'getData').and.returnValue(of(mockResponse));
    
    expect(component.products()).toEqual([]);
    fixture.detectChanges();
    expect(component.products()).toEqual(mockResponse);
  })

  it('should fetch category data', () => {
    spyOn(productsService, 'getData').and.returnValue(of([]));
    component.category.setValue('category');
    fixture.detectChanges();
    expect(productsService.getData).toHaveBeenCalledWith('category', 10);
  })
  
  it('should fetch data with limit', () => {
    spyOn(productsService, 'getData').and.returnValue(of([]));
    component.limit.setValue(20);
    fixture.detectChanges();
    expect(productsService.getData).toHaveBeenCalledWith('all', 20);
  })

  it('should call open method from modal service and open modal when clicking on an Open button', () => {
    const modalRefMock = { componentInstance: { } } as NgbModalRef;
    const spy = spyOn(TestBed.inject(NgbModal), 'open').and.returnValue(modalRefMock);

    spyOn(productsService, 'getData').and.returnValue(of(mockResponse));
    
    fixture.detectChanges();
    const openButton = fixture.nativeElement.querySelector('.shopping__table__actions--button');
    openButton.click();
    
    expect(spy).toHaveBeenCalledWith(ModalComponent);
    expect(document.getElementsByTagName('app-modal').item(0)).toBeDefined();
  })

  it('should pass data to new modal when clicking on an Open button', () => {
    const modalRefMock = { componentInstance: { } } as NgbModalRef;
    const spy = spyOn(TestBed.inject(NgbModal), 'open').and.returnValue(modalRefMock);

    spyOn(productsService, 'getData').and.returnValue(of(mockResponse));
    
    fixture.detectChanges();
    const openButton = fixture.nativeElement.querySelector('.shopping__table__actions--button');
    openButton.click();
    fixture.detectChanges();

    expect(spy.calls.first().returnValue.componentInstance.data).toBe(mockResponse[0]);
  })

});
