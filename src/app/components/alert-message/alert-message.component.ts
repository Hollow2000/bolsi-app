import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';

export enum AlertResponseEnum{
  primary,
  secundary,
  danger
}

@Component({
  selector: 'app-alert-message',
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent{
  responseEnum = AlertResponseEnum;
  alertService = inject(AlertMessageService);

  @Input() iconSrc? = "";
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
