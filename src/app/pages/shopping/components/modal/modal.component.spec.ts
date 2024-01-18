import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let ngbActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [NgbActiveModal]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.data = {} as any;
    ngbActiveModal = TestBed.inject(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render an image', () => {
    component.data = {
      image: 'https://via.placeholder.com/150'
    };
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeDefined();
  });

  it('should not render an image if there is no image url', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeNull();
  });

  it('should replace the image if there is an error in its url', () => {
    component.data = {
      image: 'broken-link'
    }
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    img.dispatchEvent(new Event('error'))
    fixture.detectChanges();
    expect(img.src).toContain('assets/img/Image-not-found.png');
  });

  it('should render title, captions and price', () => {
    component.data = {
      title: 'title',
      category: 'category',
      description: 'description',
      price: 10
    }
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('h2');
    const caption1 = fixture.nativeElement.querySelector('.details-modal__image__caption--el1');
    const caption2 = fixture.nativeElement.querySelector('.details-modal__image__caption--el2');
    const price = fixture.nativeElement.querySelector('.details-modal__price--value');
    
    expect(title.textContent).toMatch(/.+/);
    expect(caption1.textContent).toMatch(/.+/)
    expect(caption2.textContent).toMatch(/.+/)
    expect(price.textContent).toMatch(/.+/)
  });

  it('should show the price with $0.00 format', () => {
    component.data = { price: 10 };
    fixture.detectChanges();
    const price = fixture.nativeElement.querySelector('.details-modal__price--value');
    expect(price.textContent).toMatch(/\$[0-9]+\.[0-9]{2}/)
  });

  it('should close the modal after clicking on the close button', () => {
    const closeMethod = spyOn(ngbActiveModal, 'close');
    const closeButton = fixture.nativeElement.querySelector('.details-modal__header--close');
    closeButton.click();

    expect(closeMethod).toHaveBeenCalled();
  });

});
