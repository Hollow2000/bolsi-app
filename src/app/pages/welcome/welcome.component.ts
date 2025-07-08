import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../../core/constants/paths';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  router = inject(Router);

  start() {
    this.router.navigateByUrl(`${Paths.MAIN}`);
  }
}
