import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { fakeInterceptor } from '@shared/interceptors/fake.interceptor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    importProvidersFrom(
      BrowserAnimationsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      // provideAuth(() => getAuth()),
      // provideFirestore(() => getFirestore()),
      // provideStorage(() => getStorage())
    ),
    provideHttpClient(withInterceptors([fakeInterceptor])),
  ],
};
