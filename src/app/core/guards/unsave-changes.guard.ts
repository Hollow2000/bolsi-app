import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface UnsaveChanges {
  hasUnsaveChanges: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsaveChangesGuard implements CanDeactivate<UnsaveChanges> {
  canDeactivate(component: UnsaveChanges): Observable<boolean> | Promise<boolean> | boolean {
    return component.hasUnsaveChanges ? component.hasUnsaveChanges() : true;
  }
}