import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ConfirmationService, MessageService } from 'primeng/api';
import { errorhttpInterceptor } from './interceptors/errorhttp.interceptor';
import { PadNumberPipe } from './core/pipe/pad-number.pipe';
export const appConfig: ApplicationConfig = {
  providers: [
    PadNumberPipe,
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptors([errorhttpInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'correspondencia-d0344',
        appId: '1:300095590833:web:7e19d535d7950331ff6d90',
        storageBucket: 'correspondencia-d0344.firebasestorage.app',
        apiKey: 'AIzaSyDH-0tImdR3SmBhtdkaOAIhvI5G-Z6JQRI',
        authDomain: 'correspondencia-d0344.firebaseapp.com',
        messagingSenderId: '300095590833',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
