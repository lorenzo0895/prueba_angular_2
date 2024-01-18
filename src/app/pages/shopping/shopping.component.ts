import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '@shared/models/product';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from '@shared/services/products.service';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent implements OnInit, OnDestroy {;
  categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];
  limits = [5, 10, 15, 20];
  displayedColumns = ['id', 'title', 'category', 'price', 'actions'];
  products = signal<Product[]>([]);
  formGroup = new FormBuilder().group({
    category: ['all'],
    limit: [10],
  })
  subscription?: Subscription;

  constructor(
    private _productsService: ProductsService,
    private _authService: AuthService,
    private _router: Router,
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.searchProducts();
    this.subscription = this.formGroup.valueChanges.subscribe(x => {
      this.searchProducts();
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  searchProducts() {
    if (!this.category.value || !this.limit.value) return;
    this._productsService.getData(this.category.value, this.limit.value).subscribe({
      next: (res) => {
        this.products.set(res);
      },
      error: () => {}
    })
  }

  logout() {
    this._authService.logout().subscribe(() => {
      this._router.navigate(['..', 'login']);
    })
  }

  openModal(product: Product) {
    const modalRef = this._modalService.open(ModalComponent);
    modalRef.componentInstance.data = product;
  }

  get category() {
    return this.formGroup.controls.category;
  }

  get limit() {
    return this.formGroup.controls.limit;
  }

}
