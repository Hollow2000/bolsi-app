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

@Component({
  selector: 'app-payments-methods',
  imports: [MatIcon, ReactiveFormsModule, AddElementComponent, CurrencyDirective, CurrencyPipe],
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
    alias: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(30)]),
    type: new FormControl<PaymentMethodType | null>(null, [Validators.required])
  });
  paymentMethodEdit?: HTMLDivElement;

  get Icons() {
    return Icons;
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
    this.paymentMethodForm.reset();
    this.paymentMethodEdit = undefined;
  }

  openEdit(paymentMethod: PaymentMethod, item: HTMLDivElement) {
    this.paymentMethodEdit = item;
    this.paymentMethodForm.patchValue({
      alias: paymentMethod.alias,
      type: paymentMethod.type
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }, 100);
  }

  async submitEdit(id: number) {
    if (this.paymentMethodForm.valid) {
      try {
        await this.paymentMethodService.update(id, {
          alias: this.paymentMethodForm.value.alias!,
          type: this.paymentMethodForm.value.type!
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
    this.paymentMethodForm.reset();
    addElement.writing = false;
  };

  async submitNew(addElement: AddElementComponent) {
    if (this.paymentMethodForm.valid) {
      try {
        await this.paymentMethodService.add({
          alias: this.paymentMethodForm.value.alias!,
          type: this.paymentMethodForm.value.type!
        });
        this.paymentMethodForm.reset();
        addElement.writing = false;
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
