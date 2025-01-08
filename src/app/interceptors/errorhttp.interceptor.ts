import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorhttpInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService); // Usamos inject para inyectar MessageService

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error.error.message);

      let errorMessage = '';
      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          error.error?.message || 'Hubo un problema al procesar la solicitud.',
        closable: true,
      });
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error code: ${error.status}, message: ${error.message}`;
      }
      return throwError(() => errorMessage);
    }),
  );
};
