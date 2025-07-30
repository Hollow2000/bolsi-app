import { Injectable } from '@angular/core';
import { Paths } from '../core/constants/paths';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialConfigurationService {
  private readonly initialConfigKey = 'initialConfigurationDone';
  private nextPageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(`${Paths.INIT_CONFIG}/${Paths.PAYMENT_METHODS}`);
  private previusPage: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setConfigDone(done: boolean) {
    localStorage.setItem(this.initialConfigKey, JSON.stringify(done));
  }

  get isDone(): boolean {
    const value = localStorage.getItem(this.initialConfigKey);
    return value ? JSON.parse(value) : false;
  }

  get previousPage(): string {
    return this.previusPage.getValue();
  }

  get observedPreviousPage(): Observable<string> {
    return this.previusPage.asObservable();
  }

  set previousPage(page: string) {
    this.previusPage.next(page);
  }

  get nextPage(): string {
    return this.nextPageSubject.getValue();
  }

  set nextPage(page: string) {
    this.nextPageSubject.next(page);
  }

  get observedNextPage(): Observable<string> {
    return this.nextPageSubject.asObservable();
  }
}
