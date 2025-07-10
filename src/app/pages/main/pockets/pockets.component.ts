import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PocketService } from '../../../services/pocket.service';
import { Subject } from 'rxjs';
import { Pocket } from '../../../core/interfaces/primaryData.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pockets',
  imports: [AsyncPipe],
  templateUrl: './pockets.component.html',
  styleUrl: './pockets.component.scss'
})
export class PocketsComponent implements OnInit, OnDestroy {
  private readonly pocketService = inject(PocketService);

  pockets$ = new Subject<Pocket[]>;
  totalPercent = 0;

  ngOnInit(): void {
    this.pocketService.getObservable().subscribe(pockets => {
      this.pockets$.next(pockets);
      pockets.forEach(pocket => {
        this.totalPercent += pocket.percentEstimated;
      });
    });
  }

  ngOnDestroy(): void {
    this.pockets$.complete();
  }
}
