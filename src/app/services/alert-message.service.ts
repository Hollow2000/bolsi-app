import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertResponseEnum } from '../components/alert-message/alert-message.component';
import { Icons } from '../core/constants/icons';

export interface AlertMessageData{
  id: number;
  iconSrc?: string;
  titleText?: string;
  contentText: string;
  primaryText?: string;
  secundaryText?: string;
  dangerText?: string;
  showCloseBtn?: boolean;
  showPrimaryBtn?: boolean;
  showSecundaryBtn?: boolean;
  showDangerBtn?: boolean;
  alertResponseSubject: BehaviorSubject<AlertResponseEnum | null>;
}

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private _alertsPendings = new BehaviorSubject<AlertMessageData[]>([]);
  alertsPendings = this._alertsPendings.asObservable()

  /**
   * Metodo para añadir una alerta de tipo Pregunta cerrada a la lista de alertas pendientes
   * Muestra un icono de información
   * Titulo: "Atención"
   * Tiene 2 botones, un Primary "Si" y un Secundary "No"
   * Usar await para esperar la respuesta.
   * 
   * @param question Texto que mostrara como contenido en la alerta. OBLIGATORIO
   * @param title Texto para mostrar en el titulo. OPCIONAL
   * @returns La respuesta que el usuario seleccione. De tipo AlertResponseEnum.primary o AlertResponseEnum.secundary
   */
  addQuestionYoN(question: string, title?: string): Promise<AlertResponseEnum> {
    let alerts = this._alertsPendings.getValue();
    const alertResponseSubject = new BehaviorSubject<AlertResponseEnum | null>(null);
    const newId = this.generateId();

    alerts.push({
      id: newId,
      iconSrc: Icons.INFO,
      titleText: title,
      contentText: question,
      primaryText: "Si",
      secundaryText: "No",
      alertResponseSubject: alertResponseSubject
    });
    this._alertsPendings.next(alerts);

    return new Promise((resolve) =>{
      this._alertsPendings.getValue().find(m => m.id === newId)?.alertResponseSubject.subscribe(response => {
        if (response !== null){
          resolve(response);
        }
      });
    });
  }

  /**
   * Metodo para añadir una alerta de tipo Pregunta cerrada peligrosa a la lista de alertas pendientes
   * Muestra un icono de advertencia
   * Titulo: "Atención"
   * Tiene 2 botones, un Danger "Si" y un Primary "No"
   * Usar await para esperar la respuesta.
   * 
   * @param question Texto que mostrara como contenido en la alerta. OBLIGATORIO
   * @param title Texto para mostrar en el titulo. OPCIONAL
   * @returns La respuesta que el usuario seleccione. De tipo AlertResponseEnum.primary o AlertResponseEnum.Danger
   */
  addQuestionYoNDanger(question: string, title?: string): Promise<AlertResponseEnum> {
    let alerts = this._alertsPendings.getValue();
    const alertResponseSubject = new BehaviorSubject<AlertResponseEnum | null>(null);
    const newId = this.generateId();

    alerts.push({
      id: newId,
      iconSrc: Icons.WARNING,
      titleText: title,
      contentText: question,
      primaryText: "No",
      dangerText: "Si",
      alertResponseSubject: alertResponseSubject
    });
    this._alertsPendings.next(alerts);

    return new Promise((resolve) =>{
      this._alertsPendings.getValue().find(m => m.id === newId)?.alertResponseSubject.subscribe(response => {
        if (response !== null){
          resolve(response);
        }
      });
    });
  }

  /**
   * Metodo para añadir una alerta de tipo informativa a la lista de alertas pendientes
   * Muestra un icono de información
   * Titulo: "Atención"
   * Tiene 1 boton de tipo Primary con texto por defecto "Aceptar" 
   * Puedes usar await para esperar la respuesta.
   * 
   * @param textContent Texto que mostrara como contenido en la alerta. OBLIGATORIO
   * @param textBtn Texto para mostrar en el boton. OPCIONAL
   * @returns La respuesta que el usuario seleccione. De tipo AlertResponseEnum.primary
   */
  addInfo(textContent: string, textBtn?: string): Promise<AlertResponseEnum>{
    let alerts = this._alertsPendings.getValue();
    const alertResponseSubject = new BehaviorSubject<AlertResponseEnum | null>(null);
    const newId = this.generateId();

    alerts.push({
      id: newId,
      iconSrc: Icons.INFO,
      contentText: textContent,
      primaryText: textBtn,
      alertResponseSubject: alertResponseSubject
    });
    this._alertsPendings.next(alerts);

    return new Promise((resolve) =>{
      this._alertsPendings.getValue().find(m => m.id === newId)?.alertResponseSubject.subscribe(response => {
        if (response !== null){
          resolve(response);
        }
      });
    });
  }

  /**
   * Metodo para añadir una alerta de tipo satisfactoria a la lista de alertas pendientes
   * Muestra un icono de satisfacción
   * Titulo que muestra: "Exito!"
   * Contenido del mensaje por defecto: "La acción se realizo correctamente"
   * Tiene 1 boton de tipo Primary con texto por defecto "Aceptar" 
   * Puedes usar await para esperar la respuesta.
   * 
   * @param textContent Texto que mostrara como contenido en la alerta. OPCIONAL
   * @param textBtn Texto para mostrar en el boton. OPCIONAL
   * @returns La respuesta que el usuario seleccione. De tipo AlertResponseEnum.primary
   */
  addSuccess(textContent?: string, textBtn?: string): Promise<AlertResponseEnum> {
    let alerts = this._alertsPendings.getValue();
    const alertResponseSubject = new BehaviorSubject<AlertResponseEnum | null>(null);
    const newId = this.generateId();

    alerts.push({
      id: newId,
      iconSrc: Icons.SUCCESS,
      titleText: "Exito!",
      contentText: textContent ? textContent : "La acción se realizo correctamente",
      primaryText: textBtn,
      alertResponseSubject: alertResponseSubject
    });
    this._alertsPendings.next(alerts);

    return new Promise((resolve) =>{
      this._alertsPendings.getValue().find(m => m.id === newId)?.alertResponseSubject.subscribe(response => {
        if (response !== null){
          resolve(response);
        }
      });
    });
  }

  /**
   * Metodo para añadir una alerta de tipo error a la lista de alertas pendientes
   * Muestra un icono de error
   * Titulo que muestra: "Error!"
   * Contenido del mensaje por defecto: "Ocurrio un error al realizar esta acción"
   * Tiene 1 boton de tipo Primary con texto por defecto "Aceptar" 
   * Puedes usar await para esperar la respuesta.
   * 
   * @param textContent Texto que mostrara como contenido en la alerta. OPCIONAL
   * @param textBtn Texto para mostrar en el boton. OPCIONAL
   * @returns La respuesta que el usuario seleccione. De tipo AlertResponseEnum.primary
   */
  addError(textContent?: string, textBtn?: string): Promise<AlertResponseEnum> {
    let alerts = this._alertsPendings.getValue();
    const alertResponseSubject = new BehaviorSubject<AlertResponseEnum | null>(null);
    const newId = this.generateId();

    alerts.push({
      id: newId,
      iconSrc: Icons.ERROR,
      titleText: "Error!",
      contentText: textContent ? textContent : "Ocurrio un error al realizar esta acción",
      primaryText: textBtn,
      alertResponseSubject: alertResponseSubject
    });
    this._alertsPendings.next(alerts);

    return new Promise((resolve) =>{
      this._alertsPendings.getValue().find(m => m.id === newId)?.alertResponseSubject.subscribe(response => {
        if (response !== null){
          resolve(response);
        }
      });
    });
  }

  /**
   * Metodo para añadir una alerta personalizada a la lista de alertas pendientes.
   * 
   * @param message OBLIGATORIO Texto del mensaje a mostrar. Sin mensaje por defecto.
   * @param iconSrc Ruta, url o data del icono a mostrar. Sin icono por defecto.
   * @param title Texto del titulo a mostrar. Por defecto: "Atención".
   * @param showClose Mostrar o no el boton cerrar. Por defecto no se muestra.
   * @param textPrimary Texto corto del boton primario. Por defecto: "Aceptar".
   * @param textSecundary Texto corto del boton secundario. Por defecto: "Regresar".
   * @param textDanger Texto corto del boton peligro. Por defecto: "Cancelar".
   * @param showPrimary Mostrar o no el boton primario. Se muestra por defecto.
   * @param showSecundary Mostrar o no el boton secundario. Por defecto no se muestra.
   * @param showDanger Mostrar o no el boton peligro. Por defecto no se muestra
   * @returns La respuesta que el usuario seleccione de tipo 
   * AlertResponseEnum.primary, AlertResponseEnum. secundary o AlertResponseEnum.danger
   */
  addCustom(message: string, iconSrc?: string, title?: string, showClose?: boolean,
    textPrimary?: string, textSecundary?: string, textDanger?: string,
    showPrimary?: boolean, showSecundary?: boolean, showDanger?: boolean
  ): Promise<AlertResponseEnum> {
    let alerts = this._alertsPendings.getValue();
    const alertResponseSubject = new BehaviorSubject<AlertResponseEnum | null>(null);
    const newId = this.generateId();

    alerts.push({
      id: newId,
      iconSrc: iconSrc,
      titleText: title,
      showCloseBtn: showClose,
      contentText: message,
      primaryText: textPrimary,
      secundaryText: textSecundary,
      dangerText: textDanger,
      showPrimaryBtn: showPrimary,
      showSecundaryBtn: showSecundary,
      showDangerBtn: showDanger,
      alertResponseSubject: alertResponseSubject
    });
    this._alertsPendings.next(alerts);

    return new Promise((resolve) =>{
      this._alertsPendings.getValue().find(m => m.id === newId)?.alertResponseSubject.subscribe(response => {
        if (response !== null){
          resolve(response);
        }
      });
    });
  }

  /**
   * Metodo para resolver la respuesta de la alerta en curso y quitarla de la lista de pendientes.
   * @param response Respuesta seleccionada por el usuario.
   */
  respondToAlert(response: AlertResponseEnum) {
    this._alertsPendings.getValue()[0].alertResponseSubject.next(response);
    this.removeAlert();
  }

  private removeAlert(){
    let alerts = this._alertsPendings.getValue();
    alerts.shift();
    this._alertsPendings.next(alerts);
  }

  private generateId(): number{
    const timestamp = Date.now(); // Obtener la fecha y hora actual en milisegundos
    const identificador = Math.random() * timestamp % 10000000; // Limitar el valor a un rango de 0 a 9999999 (7 dígitos)
    return identificador;
  }
}
