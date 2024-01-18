import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from '@shared/constants/fadeIn.animation';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeAnimation],
})
export class AppComponent {

  constructor() {}

}
