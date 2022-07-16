import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private authService: AuthService) {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const modifiedRequest = req.clone({
         setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ' + ${this.authService.token}`
         }
      });
      console.log('[AuthInterceptor] - Setting request headers...');
      return next.handle(modifiedRequest);
   }
}
