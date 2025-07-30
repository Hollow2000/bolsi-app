import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { Icons } from '../../core/constants/icons';
import { Paths } from '../../core/constants/paths';
import { InitialConfigurationService } from '../../services/initial-configuration.service';

@Component({
  selector: 'app-initial-configuration',
  imports: [RouterOutlet, MatIcon],
  templateUrl: './initial-configuration.component.html',
  styleUrl: './initial-configuration.component.scss'
})
export class InitialConfigurationComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly initialConfigService = inject(InitialConfigurationService);

  previusPage?: string;
  nextPage = `${Paths.INIT_CONFIG}/${Paths.PAYMENT_METHODS}`;

  get Icons() {
    return Icons;
  }

  ngOnInit(): void {
    this.initialConfigService.observedPreviousPage.subscribe(page => {
      this.previusPage = page;
    });
    this.initialConfigService.observedNextPage.subscribe(page => {
      this.nextPage = page;
    });
  }

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
