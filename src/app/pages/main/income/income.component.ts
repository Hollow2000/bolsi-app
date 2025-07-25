import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IncomeViewData } from '../../../core/interfaces/incomeViewData.interface';
import { Subject } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { AddElementComponent } from "../../../components/add-element/add-element.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyDirective } from '../../../core/directives/currency.directive';
import { Utils } from '../../../core/Utils';
import { animate, style, transition, trigger } from '@angular/animations';
import { Income } from '../../../core/interfaces/primaryData.interface';
import { MatIcon } from '@angular/material/icon';
import { AlertMessageService } from '../../../services/alert-message.service';
import { AlertResponseEnum } from '../../../components/alert-message/alert-message.component';

@Component({
  selector: 'app-income',
  imports: [AsyncPipe, CurrencyPipe, AddElementComponent, ReactiveFormsModule, CurrencyDirective, MatIcon],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
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
export class IncomeComponent implements OnInit, OnDestroy {
  private readonly incomeService = inject(IncomeService);
  private readonly alertService = inject(AlertMessageService);

  incomes$ = new Subject<IncomeViewData>();
  incomeForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    amountEstimated: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(11)]),
  });
  incomeEdit?: HTMLDivElement;

  ngOnInit(): void {
    this.incomeService.getIncomesViewDataObservable().subscribe(incomes => {
      this.incomes$.next(incomes);
    }, error => {
      console.log(error);
    });
  }

  @HostListener('window:touchstart', ['$event'])
  @HostListener('window:mousedown', ['$event'])
  outInteraction($event: Event) {
    if (this.incomeEdit && !this.incomeEdit.contains($event.target as Element)) {
      this.cancelEdit();
    }
  }

  ngOnDestroy(): void {
    this.incomes$.complete();
  }

  async submitNew(addElement: AddElementComponent) {
    if (this.incomeForm.valid) {
      await this.incomeService.add({
        name: this.incomeForm.value.name!,
        amountEstimated: Utils.clearNumberFormat(this.incomeForm.value.amountEstimated!),
      });
      this.incomeForm.reset();
      addElement.writing = false;
    } else {
      this.incomeForm.markAllAsTouched();
    }
  }

  cancelNew(addElement: AddElementComponent) {
    this.incomeForm.reset();
    addElement.writing = false
  }

  openEdit(income: Income, item: HTMLDivElement) {
    this.incomeEdit = item;
    this.incomeForm.patchValue({
      name: income.name,
      amountEstimated: income.amountEstimated.toLocaleString("es-MX", { style: "currency", currency: "MXN" })
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }, 100);

  }

  cancelEdit() {
    this.incomeForm.reset();
    this.incomeEdit = undefined;
  }

  submitEdit(incomeId: number) {
    this.incomeService.update(incomeId,
      {
        name: this.incomeForm.value.name!,
        amountEstimated: Utils.clearNumberFormat(this.incomeForm.value.amountEstimated!),
      }
    );
    this.incomeForm.reset();
    this.incomeEdit = undefined;
  }

  async deleteIncome(incomeID: number, name: string) {
    const res = await this.alertService.addQuestionYoNDanger(`¿Desea eliminar ${name}?`, 'Eliminar ingreso');
    if (res !== AlertResponseEnum.danger) return;
    this.incomeService.delete(incomeID);
  }
}
