import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertManagerComponent } from './components/alert-manager/alert-manager.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
