import { Component, HostListener, inject } from '@angular/core';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { AlertMessageService } from '../../../services/alert-message.service';
import { PaymentMethod } from '../../../core/interfaces/primaryData.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AddElementComponent } from '../../../components/add-element/add-element.component';
import { CurrencyDirective } from '../../../core/directives/currency.directive';
import { PaymentMethodType } from '../../../core/enums/payment-method-type.enum';
import { CurrencyPipe } from '@angular/common';
import { Icons } from '../../../core/constants/icons';
import { AlertResponseEnum } from '../../../components/alert-message/alert-message.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { InitialConfigurationService } from '../../../services/initial-configuration.service';
import { Paths } from '../../../core/constants/paths';
import { CustomSelectComponent } from '../../../components/custom-select/custom-select.component';
import { SelectOption } from '../../../core/interfaces/selectOption.interface';
import { Utils } from '../../../core/Utils';

@Component({
  selector: 'app-payments-methods',
  imports: [
    MatIcon, ReactiveFormsModule, AddElementComponent, CurrencyDirective, CurrencyPipe,
    CustomSelectComponent
  ],
  templateUrl: './payments-methods.component.html',
  styleUrl: './payments-methods.component.scss',
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
export class PaymentsMethodsComponent {
  private readonly paymentMethodService = inject(PaymentMethodService);
  private readonly alertService = inject(AlertMessageService);
  private readonly initialConfigService = inject(InitialConfigurationService);

  paymentMethods?: PaymentMethod[];
  errorMessage?: string;
  paymentMethodForm = new FormGroup({
    alias: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(10)]),
    type: new FormControl<string>('', [Validators.required]),
    statementDay: new FormControl<number | null>(null, []),
    dayToPay: new FormControl<number | null>(null, []),
    amountCreditLimit: new FormControl<string | null>(null, []),
    amountCreditAvailable: new FormControl<string | null>(null, []),
    balance: new FormControl<string | null>(null, [])
  });
  paymentMethodEdit?: HTMLDivElement;

  get Icons() {
    return Icons;
  }

  get PaymentMethodType() {
    return PaymentMethodType;
  }

  get typeSelect(): SelectOption[] {
    return Object.keys(PaymentMethodType)
    .filter(key => key !== 'Cash')
    .map(key => {
      return {
        key,
        text: PaymentMethodType[key as keyof typeof PaymentMethodType]
      }
    });
  }
  
  get typeSelected(): PaymentMethodType {
    return PaymentMethodType[this.paymentMethodForm.value.type! as keyof typeof PaymentMethodType]
  }


  ngOnInit(): void {
    this.paymentMethodService.getObservable().subscribe(paymentMethods => {
      if (paymentMethods.length === 0 && !this.initialConfigService.isDone) {
        this.paymentMethodService.initPaymentMethods();
        return;
      }
      this.paymentMethods = paymentMethods;
    }, error => {
      this.errorMessage = 'Error al cargar los métodos de pago: ' + error.message;
    });
    this.paymentMethodForm.controls.type.valueChanges.subscribe(value => {
      if (PaymentMethodType[value as keyof typeof PaymentMethodType] === PaymentMethodType.Credit) {
        this.paymentMethodForm.controls.balance.clearValidators();
        this.paymentMethodForm.controls.statementDay.setValidators([Validators.required]);
        this.paymentMethodForm.controls.dayToPay.setValidators([Validators.required]);
        this.paymentMethodForm.controls.amountCreditLimit.setValidators([Validators.required]);
        this.paymentMethodForm.controls.amountCreditAvailable.setValidators([Validators.required]);
      } else if (PaymentMethodType[value as keyof typeof PaymentMethodType] === PaymentMethodType.Debit) {
        this.paymentMethodForm.controls.statementDay.clearValidators();
        this.paymentMethodForm.controls.dayToPay.clearValidators();
        this.paymentMethodForm.controls.amountCreditLimit.clearValidators();
        this.paymentMethodForm.controls.amountCreditAvailable.clearValidators();
        this.paymentMethodForm.controls.balance.setValidators([Validators.required]); 
      }      
    });
    this.initialConfigService.nextPage = `${Paths.INIT_CONFIG}/${Paths.INCOME}`;
    this.initialConfigService.previousPage = `${Paths.INIT_CONFIG}/${Paths.POCKETS}`;
  }

  @HostListener('window:touchstart', ['$event'])
  @HostListener('window:mousedown', ['$event'])
  outInteraction($event: Event) {
    if (this.paymentMethodEdit && !this.paymentMethodEdit.contains($event.target as Element)) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.paymentMethodForm.reset({type: ''});
    this.paymentMethodEdit = undefined;
  }

  openEdit(paymentMethod: PaymentMethod, item: HTMLDivElement) {
    this.paymentMethodEdit = item;
    this.paymentMethodForm.patchValue({
      alias: paymentMethod.alias,
      type: this.typeSelect.find(option => option.text === paymentMethod.type)?.key || 'Cash',
      statementDay: paymentMethod.statementDay ?? null,
      dayToPay: paymentMethod.daysToPay ?? null,
      amountCreditLimit: paymentMethod.amountCreditLimit ? Utils.transformCurrencyFormat(paymentMethod.amountCreditLimit) : null,
      amountCreditAvailable: paymentMethod.amountCreditAvailable ? Utils.transformCurrencyFormat(paymentMethod.amountCreditAvailable) : null,
      balance: paymentMethod.balance ? Utils.transformCurrencyFormat(paymentMethod.balance) : null
    });
    console.log(paymentMethod);
    console.log(this.paymentMethodForm.value);
    
    
    setTimeout(() => {
      requestAnimationFrame(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }, 100);
  }

  async submitEdit(id: number) {
    console.log(this.paymentMethodForm.valid);
    console.log(this.paymentMethodForm.value);
    if (this.paymentMethodForm.valid) {
      try {
        await this.paymentMethodService.update(id, {
          alias: this.paymentMethodForm.value.alias!,
          type: this.typeSelected,
          statementDay: this.typeSelected === PaymentMethodType.Credit ? this.paymentMethodForm.value.statementDay! : undefined,
          daysToPay: this.typeSelected === PaymentMethodType.Credit ? this.paymentMethodForm.value.dayToPay! : undefined,
          amountCreditLimit: this.typeSelected === PaymentMethodType.Credit ? Utils.clearNumberFormat(this.paymentMethodForm.value.amountCreditLimit!) : undefined,
          amountCreditAvailable: this.typeSelected === PaymentMethodType.Credit ? Utils.clearNumberFormat(this.paymentMethodForm.value.amountCreditAvailable!) : undefined,
          balance: this.typeSelected !== PaymentMethodType.Credit ? Utils.clearNumberFormat(this.paymentMethodForm.value.balance!) : undefined
        });
        this.cancelEdit();
      } catch (error: any) {
        this.alertService.addError('Error al actualizar el método de pago: ' + (error?.message || error));
      }
    } else {
      this.paymentMethodForm.markAllAsTouched();
    }
  }

  cancelNew(addElement: AddElementComponent) {
    this.paymentMethodForm.reset({type: ''});
    addElement.writing = false;
  };

  async submitNew(addElement: AddElementComponent) {
    if (this.paymentMethodForm.valid) {
      try {
        await this.paymentMethodService.add({
          alias: this.paymentMethodForm.value.alias!,
          type: this.typeSelected,
          statementDay: this.typeSelected === PaymentMethodType.Credit ? this.paymentMethodForm.value.statementDay! : undefined,
          daysToPay: this.typeSelected === PaymentMethodType.Credit ? this.paymentMethodForm.value.dayToPay! : undefined,
          amountCreditLimit: this.typeSelected === PaymentMethodType.Credit ? Utils.clearNumberFormat(this.paymentMethodForm.value.amountCreditLimit!) : undefined,
          amountCreditAvailable: this.typeSelected === PaymentMethodType.Credit ? Utils.clearNumberFormat(this.paymentMethodForm.value.amountCreditAvailable!) : undefined,
          balance: this.typeSelected === PaymentMethodType.Debit ? Utils.clearNumberFormat(this.paymentMethodForm.value.balance!) : undefined
        });
        this.cancelNew(addElement);
      } catch (error: any) {
        this.alertService.addError('Error al agregar el método de pago: ' + (error?.message || error));
      }
    } else {
      this.paymentMethodForm.markAllAsTouched();
    }
  }

  async deletePaymentMethod(paymentMethod: PaymentMethod) {
    const res = await this.alertService.addQuestionYoNDanger(`¿Desea eliminar ${paymentMethod.alias}?`, 'Eliminar método de pago');
    if (res !== AlertResponseEnum.danger) return;
    this.paymentMethodService.delete(paymentMethod.id!).catch(error => {
      this.alertService.addError('Error al eliminar el método de pago: ' + (error?.message || error));
    });
  }
    
}
