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
import { SelectOption } from '../../../core/interfaces/selectOption.interface';
import { CustomSelectComponent } from '../../../components/custom-select/custom-select.component';
import { PocketService } from '../../../services/pocket.service';
import { BillsGroup } from '../../../core/interfaces/viewData.interface';

@Component({
  selector: 'app-bills',
  imports: [
    AddElementComponent, MatIcon, ReactiveFormsModule, CurrencyPipe,
    CurrencyDirective, CustomSelectComponent
  ],
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
  private readonly billService = inject(BillService);
  private readonly pocketService = inject(PocketService);

  billsGroups?: BillsGroup[];
  billEdit?: HTMLDivElement;
  errorMessage?: string;
  billForm = new FormGroup({
    description: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    amountEstimated: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(11)]),
    frecueny: new FormControl<string>('', [Validators.required])
  });

  get Icons() {
    return Icons;
  }

  frecuencySelect?: SelectOption[];
  pocketsSelect?: SelectOption[];
  get Frecuency() {
    return Frecuency;
  }
  get frecuencySelected(): Frecuency {
    return Frecuency[this.billForm.value.frecueny! as keyof typeof Frecuency]
  }


  async ngOnInit(): Promise<void> {
    this.billService.getBillsGroupList$().subscribe(billsGroups => {
      this.billsGroups = billsGroups
    }, error => {
      this.errorMessage = `Error al cargar los gastos: ${error.message}`
    });
    this.frecuencySelect = Object.keys(Frecuency)
      .map(key => {
        return {
          key,
          text: Frecuency[key as keyof typeof Frecuency]
        }
      });
    this.pocketsSelect = await (await this.pocketService.getList()).map(pocket => {
      return { text: pocket.name, key: pocket.id };
    })
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

  async submitNew(addElement: AddElementComponent, pocketId: number) {
    if (this.billForm.valid) {
      await this.billService.add({
        description: this.billForm.value.description!,
        amountEstimated: Utils.clearNumberFormat(this.billForm.value.amountEstimated!),
        frecuency: this.frecuencySelected,
        pocketId
      });
      this.billForm.reset({ frecueny: '' });
      addElement.writing = false;
    } else {
      this.billForm.markAllAsTouched();
    }
  }

  cancelNew(addElement: AddElementComponent) {
    this.billForm.reset({ frecueny: '' });
    addElement.writing = false
  }

  openEdit(bill: Bill, item: HTMLDivElement) {
    this.billEdit = item;
    this.billForm.patchValue({
      description: bill.description,
      amountEstimated: Utils.transformCurrencyFormat(bill.amountEstimated),
      frecueny: this.frecuencySelect?.find(option => option.text === bill.frecuency)?.key || ''
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }, 100);

  }

  cancelEdit() {
    this.billForm.reset({ frecueny: ''});
    this.billEdit = undefined;
  }

  async submitEdit(incomeId: number, pocketId: number) {
    if (this.billForm.valid) {
      try {
        await this.billService.update(incomeId, {
          description: this.billForm.value.description!,
          amountEstimated: Utils.clearNumberFormat(this.billForm.value.amountEstimated!),
          frecuency: this.frecuencySelected,
          pocketId
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

