import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { AutoRefreshTokenService, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, includeBearerTokenInterceptor, provideKeycloak, UserActivityService } from 'keycloak-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor, loadingInterceptor } from '@core/interceptors';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([loadingInterceptor, authInterceptor])
    ),
  ]
};
