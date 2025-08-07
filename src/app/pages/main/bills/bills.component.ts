import { Component, HostListener, inject, OnInit } from '@angular/core';
import { InitialConfigurationService } from '../../../services/initial-configuration.service';
import { Paths } from '../../../core/constants/paths';
import { BillService } from '../../../services/bill.service';
import { Icons } from '../../../core/constants/icons';
import { Bill } from '../../../core/interfaces/secundaryData.interface';
import { AddElementComponent } from '../../../components/add-element/add-element.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { AlertMessageService } from '../../../services/alert-message.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CurrencyDirective } from '../../../core/directives/currency.directive';
import { Utils } from '../../../core/Utils';
import { AlertResponseEnum } from '../../../components/alert-message/alert-message.component';
import { Frecuency } from '../../../core/enums/frecuency.enum';

@Component({
  selector: 'app-bills',
  imports: [AddElementComponent, MatIcon, ReactiveFormsModule, CurrencyPipe, CurrencyDirective],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.scss',
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class BillsComponent implements OnInit {
  private readonly initialConfigService = inject(InitialConfigurationService);
  private readonly alertService = inject(AlertMessageService);
  private readonly billService = inject(BillService)

  bills?: Bill[];
  billEdit?: HTMLDivElement;
  errorMessage?: string;
  billForm = new FormGroup({
    description: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    amountEstimated: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(11)]),
  });

  get Icons() {
    return Icons;
  }

  ngOnInit(): void {
    this.billService.getObservable().subscribe(bills => {
      this.bills = bills
    }, error => {
      this.errorMessage = `Error al cargar los gastos: ${error.message}`
    });
    this.initialConfigService.nextPage = `${Paths.INIT_CONFIG}/${Paths.QUICK_SHOPPING}`;
    this.initialConfigService.previousPage = `${Paths.INIT_CONFIG}/${Paths.INCOME}`;
  }

  @HostListener('window:touchstart', ['$event'])
  @HostListener('window:mousedown', ['$event'])
  outInteraction($event: Event) {
    if (this.billEdit && !this.billEdit.contains($event.target as Element)) {
      this.cancelEdit();
    }
  }

  async submitNew(addElement: AddElementComponent) {
    if (this.billForm.valid) {
      await this.billService.add({
        description: this.billForm.value.description!,
        amountEstimated: Utils.clearNumberFormat(this.billForm.value.amountEstimated!),
        frecuency: Frecuency.Biweekly,
        pocketId: 1
      });
      this.billForm.reset();
      addElement.writing = false;
    } else {
      this.billForm.markAllAsTouched();
    }
  }

  cancelNew(addElement: AddElementComponent) {
    this.billForm.reset();
    addElement.writing = false
  }

  openEdit(bill: Bill, item: HTMLDivElement) {
    this.billEdit = item;
    this.billForm.patchValue({
      description: bill.description,
      amountEstimated: bill.amountEstimated.toLocaleString("es-MX", { style: "currency", currency: "MXN" })
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }, 100);

  }

  cancelEdit() {
    this.billForm.reset();
    this.billEdit = undefined;
  }

  async submitEdit(incomeId: number) {
    if (this.billForm.valid) {
      try {
        await this.billService.update(incomeId, {
          description: this.billForm.value.description!,
          amountEstimated: Utils.clearNumberFormat(this.billForm.value.amountEstimated!),
        });
        this.cancelEdit();
      } catch (error: any) {
        this.alertService.addError('Error al actualizar el gasto: ' + (error?.message || error));
      }
    } else {
      this.billForm.markAllAsTouched();
    }
  }

  async deleteBill(incomeID: number, name: string) {
    const res = await this.alertService.addQuestionYoNDanger(`¿Desea eliminar ${name}?`, 'Eliminar gasto');
    if (res !== AlertResponseEnum.danger) return;
    this.billService.delete(incomeID);
  }
}

