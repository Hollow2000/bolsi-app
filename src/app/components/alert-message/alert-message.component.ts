import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { AlertMessageService, IconData } from '../../services/alert-message.service';
import { MatIcon } from '@angular/material/icon';

export enum AlertResponseEnum{
  primary,
  secundary,
  danger
}

@Component({
  selector: 'app-alert-message',
  imports: [MatIcon],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent{
  responseEnum = AlertResponseEnum;
  alertService = inject(AlertMessageService);

  @Input() iconSrc?: IconData = {
    name: "info",
    iconStyle: {
      color: "var(--primary-color)",
      fontSize: "50px",
      width: "50px",
      height: "50px",
    }
  };
  @Input() titleText? = "Atención";
  @Input() contentText = ""

  @Input() primaryText? = "Aceptar";
  @Input() secundaryText? = "Regresar";
  @Input() dangerText? = "Cancelar";

  @Input() showCloseBtn? = false;
  @Input() showPrimaryBtn? = true;
  @Input() showSecundaryBtn? = false;
  @Input() showDangerBtn? = false;

  @Output() response = new EventEmitter<AlertResponseEnum>();

  responseAlert(response: AlertResponseEnum){
    this.response.emit(response);
  }
}
