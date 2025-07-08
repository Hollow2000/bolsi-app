import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IncomeService } from '../../services/income.service';
import { Paths } from '../../core/constants/paths';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  router = inject(Router);
  incomeService = inject(IncomeService);

  async ngOnInit() {
    if (!this.router.url.includes(Paths.INCOME) && 
    (await this.incomeService.getIcomeList()).length == 0) {
      this.router.navigate([`${Paths.MAIN}/${Paths.INCOME}`],{replaceUrl:true});
    } 
  }

}
