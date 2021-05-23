import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '@app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class CustomInterceptorService implements HttpInterceptor {
  constructor(private errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    return next.handle(req)
    .pipe(catchError((error) => {
      debugger;
      this.errorService.showError('Error Occured');
      console.warn(error);
      return throwError(error);
    }));
  }

}
