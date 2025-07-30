import { Component, inject, OnInit } from '@angular/core';
import { InitialConfigurationService } from '../../../services/initial-configuration.service';
import { Paths } from '../../../core/constants/paths';

@Component({
  selector: 'app-quick-shopping',
  imports: [],
  templateUrl: './quick-shopping.component.html',
  styleUrl: './quick-shopping.component.scss'
})
export class QuickShoppingComponent implements OnInit {
  private readonly initialConfigService = inject(InitialConfigurationService);

  ngOnInit(): void {
    this.initialConfigService.nextPage = `${Paths.MAIN}`;
    this.initialConfigService.previousPage = `${Paths.INIT_CONFIG}/${Paths.BILLS}`;
  }
}
