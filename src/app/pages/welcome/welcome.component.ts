import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../../core/constants/paths';
import { InitialConfigurationService } from '../../services/initial-configuration.service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  router = inject(Router);
  private readonly initialConfigService = inject(InitialConfigurationService);

  start() {
    if (this.initialConfigService.isDone) {
      this.router.navigateByUrl(Paths.MAIN);
    } else {
      this.router.navigateByUrl(`${Paths.INIT_CONFIG}/${Paths.POCKETS}`);
    }
  }
}
