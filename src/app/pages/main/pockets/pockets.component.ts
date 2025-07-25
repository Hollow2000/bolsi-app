import { Component, inject, OnInit } from '@angular/core';
import { PocketService } from '../../../services/pocket.service';
import { MatIcon } from '@angular/material/icon';
import { AddElementComponent } from '../../../components/add-element/add-element.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { PercentDirective } from '../../../core/directives/percent.directive';
import { Utils } from '../../../core/Utils';
import { UnsaveChanges } from '../../../core/guards/unsave-changes.guard';
import { AlertMessageService } from '../../../services/alert-message.service';

@Component({
  selector: 'app-pockets',
  imports: [MatIcon, AddElementComponent, ReactiveFormsModule, PercentDirective],
  templateUrl: './pockets.component.html',
  styleUrl: './pockets.component.scss',
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
export class PocketsComponent implements OnInit, UnsaveChanges {
  private readonly pocketService = inject(PocketService);
  private readonly alertService = inject(AlertMessageService);

  totalPercent = 0;
  pocketEdit?: HTMLDivElement;

  newPocketForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
    percent: new FormControl<string | null>(null, [Validators.required, Validators.min(1)])
  });

  arrayPocketForm = new FormArray<FormGroup<{
    id: FormControl<number | null>, name: FormControl<string | null>, percent: FormControl<string | null>
  }>>([]);

  ngOnInit(): void {
    this.pocketService.getObservable().subscribe(pockets => {
      this.arrayPocketForm.clear();
      this.totalPercent = 0;
      pockets.forEach(pocket => {
        this.arrayPocketForm.push(new FormGroup({
          id: new FormControl(pocket.id!),
          name: new FormControl(pocket.name, [Validators.required, Validators.minLength(3)]),
          percent: new FormControl(`${pocket.percentEstimated}%`, [Validators.required, Validators.min(1)])
        }));
        this.totalPercent += Number(pocket.percentEstimated);
      });
      this.arrayPocketForm.updateValueAndValidity();
    });
  }

  hasUnsaveChanges(): boolean {
    if (this.totalPercent !== 100 || this.arrayPocketForm.touched) {
      this.alertService.addInfo('Los porcentajes deben sumar 100% y guardar los cambios para continuar');
      return false;
    } else {
      return true;
    }
  }

  calculateTotal() {
    this.arrayPocketForm.markAsTouched();
    this.totalPercent = 0
    this.arrayPocketForm.value.forEach(pockets => {
      this.totalPercent = this.totalPercent + Utils.clearNumberFormat(pockets.percent!);
    });
  }

  submitNew(addElement: AddElementComponent) {
    if (this.newPocketForm.valid) {
      this.pocketService.add({
        name: this.newPocketForm.value.name!,
        percentEstimated: Utils.clearNumberFormat(this.newPocketForm.value.percent!)
      });
      this.cancelNew(addElement);
    } else {
      this.newPocketForm.markAllAsTouched();
    }
  }

  cancelNew(addElement: AddElementComponent) {
    this.newPocketForm.reset();
    addElement.writing = false;
  }

  deletePocket(id: number) {
    this.pocketService.delete(id);
  }

  submitALL() {
    if (this.arrayPocketForm.valid) {
      this.pocketService.updatePockets(this.arrayPocketForm.value.map(pocket => {
        return {
          id: pocket.id!,
          name: pocket.name!,
          percentEstimated: Utils.clearNumberFormat(pocket.percent!)
        }
      }));
      this.arrayPocketForm.markAsUntouched();
    } else {
      this.arrayPocketForm.markAllAsTouched();
    }
  }
}
