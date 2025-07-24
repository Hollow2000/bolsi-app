import { Component, inject, OnInit } from '@angular/core';
import { PocketService } from '../../../services/pocket.service';
import { MatIcon } from '@angular/material/icon';
import { AddElementComponent } from '../../../components/add-element/add-element.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { PercentDirective } from '../../../core/directives/percent.directive';

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
export class PocketsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly pocketService = inject(PocketService);

  totalPercent = 0;
  pocketEdit?: HTMLDivElement;

  newPocketForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)]),
    percent: new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
  });

  arrayPocketForm = new FormArray<FormGroup<{
    id: FormControl<number | null>, name: FormControl<string | null>, percent: FormControl<number | null>
  }>>([]);

  ngOnInit(): void {
    this.pocketService.getObservable().subscribe(pockets => {
      this.arrayPocketForm.clear();
      this.totalPercent = 0;
      pockets.forEach(pocket => {
        this.arrayPocketForm.push(new FormGroup({
          id: new FormControl(pocket.id!), 
          name: new FormControl(pocket.name, [Validators.required, Validators.minLength(3)]),
          percent: new FormControl(pocket.percentEstimated, [Validators.required,Validators.min(1)])
        }));
        this.totalPercent += Number(pocket.percentEstimated);
      });
      this.arrayPocketForm.updateValueAndValidity();
    });
  }

  calculateTotal() {
    this.totalPercent = 0
    this.arrayPocketForm.value.forEach(pockets => {
      this.totalPercent = this.totalPercent + Number(pockets.percent!);
    });
  }

  submitNew(addElement: AddElementComponent) {
    this.newPocketForm.markAllAsTouched();
    if (this.newPocketForm.valid) {
      this.pocketService.add({
        name: this.newPocketForm.value.name!,
        percentEstimated: this.newPocketForm.value.percent!
      });
      this.cancelNew(addElement);
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
        return {id: pocket.id!, name: pocket.name!, percentEstimated: Number(pocket.percent!)}
      }));
    } else {
      this.arrayPocketForm.markAllAsTouched();
    }
  }
}
