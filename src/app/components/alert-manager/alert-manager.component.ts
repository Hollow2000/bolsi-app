import { Component, inject } from '@angular/core';
import { AlertMessageComponent, AlertResponseEnum } from '../alert-message/alert-message.component';
import { AlertMessageData, AlertMessageService } from '../../services/alert-message.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alert-manager',
  imports: [AlertMessageComponent],
  templateUrl: './alert-manager.component.html',
  styleUrl: './alert-manager.component.css',
  animations: [
    trigger('popInOut', [
      // Animación de entrada tipo "pop"
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      // Animación de salida tipo "pop"
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AlertManagerComponent {
  alertService = inject(AlertMessageService);
  animation = true;

  alertsPending: AlertMessageData[] = [];
  opacity = false;

  ngOnInit(): void {
    this.alertService.alertsPendings.subscribe(alerts => {
      this.alertsPending = alerts;
      if (alerts.length > 0) {
        this.opacity = true;
      } else {
        setTimeout(() => {
          this.opacity = false;
        }, 100);
      }
    });
  }

  handleAlertResponse(response: AlertResponseEnum) {
    this.alertService.respondToAlert(response);
    this.animation = false;
    setTimeout(() => {
      this.animation = true;
    }, 300);
  }
}
