import { Component, computed, inject } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper'; 
import { AuthGuardData, createKeycloakSignal, KEYCLOAK_EVENT_SIGNAL, KeycloakService } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-scanner',
  imports: [
    MatStepperModule
  ],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {
  kcInstance = inject(Keycloak)

  async logout(): Promise<void> {
    this.kcInstance.logout({ redirectUri: window.location.origin });
  }
}
