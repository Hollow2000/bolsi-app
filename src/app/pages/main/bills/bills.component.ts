import { Component, inject, OnInit } from '@angular/core';
import { InitialConfigurationService } from '../../../services/initial-configuration.service';
import { Paths } from '../../../core/constants/paths';

@Component({
  selector: 'app-bills',
  imports: [],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss'
})
export class BillsComponent implements OnInit {
  private readonly initialConfigService = inject(InitialConfigurationService);

  ngOnInit(): void {
    this.initialConfigService.nextPage = `${Paths.INIT_CONFIG}/${Paths.QUICK_SHOPPING}`;
    this.initialConfigService.previousPage = `${Paths.INIT_CONFIG}/${Paths.INCOME}`;
  }

}
