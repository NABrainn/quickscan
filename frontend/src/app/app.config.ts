import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, includeBearerTokenInterceptor, KeycloakService, provideKeycloak, UserActivityService, withAutoRefreshToken } from 'keycloak-angular';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './scanner/core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([LoadingInterceptor, includeBearerTokenInterceptor])
    ),
    provideKeycloak({
      config: {
        url: 'http://localhost:9090',
        realm: 'scanner-network',
        clientId: 'sn'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      },
      
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [{
        urlPattern: /^http:\/\/localhost:8080\/api\//,
        httpMethods: ['GET', 'POST', 'PUT', 'DELETE']
      }]
    }
  ]
};
