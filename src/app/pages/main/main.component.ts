import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PocketService } from '../../services/pocket.service';
import { Paths } from '../../core/constants/paths';
import { IncomeService } from '../../services/income.service';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  router = inject(Router);
  private readonly pocketService = inject(PocketService);
  private readonly incomeService = inject(IncomeService);
  private readonly paymentMethodService = inject(PaymentMethodService);

  async ngOnInit() {
    if (!this.router.url.includes(Paths.POCKETS) && 
    (await this.pocketService.getList()).length === 0) {
      this.pocketService.initPockets();
      this.router.navigate([`${Paths.MAIN}/${Paths.POCKETS}`],{replaceUrl:true});
    }else if (!this.router.url.includes(Paths.INCOME) && 
    (await this.incomeService.getList()).length === 0) {
      this.router.navigate([`${Paths.MAIN}/${Paths.INCOME}`],{replaceUrl:true});
    } else if (!this.router.url.includes(Paths.PAYMENT_METHODS) && 
    (await this.paymentMethodService.getList()).length === 0) {
      this.paymentMethodService.initPaymentMethods();
      this.router.navigate([`${Paths.MAIN}/${Paths.PAYMENT_METHODS}`],{replaceUrl:true});
    }
  }

}
