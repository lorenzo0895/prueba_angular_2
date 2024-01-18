import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '@shared/models/product';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input({ required: true }) data!: Partial<Product>;

  constructor(protected _activeModal: NgbActiveModal) {}

  replaceUrl(img: HTMLImageElement) {
    img.src = 'assets/img/Image-not-found.png';
  }
}
