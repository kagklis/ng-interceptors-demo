import { Injectable } from '@angular/core';
import {
   HttpInterceptor,
   HttpEvent,
   HttpHandler,
   HttpRequest,
   HttpContextToken,
   HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

export const LOGIN_REQUEST = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor(private authService: AuthService) {}

   intercept(
      req: HttpRequest<any>,
      next: HttpHandler
   ): Observable<HttpEvent<any>> {
      // We don't have a backend server, so for the login request
      // we mock the response based on the passed context.
      if (req.context.get(LOGIN_REQUEST)) {
         return this.mockTokenResponse();
      }

      const modifiedRequest = req.clone({
         setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ' + ${this.authService.token}`,
         },
      });
      console.log('[AuthInterceptor] - Setting request headers...');
      return next.handle(modifiedRequest);
   }

   private mockTokenResponse(): Observable<HttpEvent<any>> {
      return of(
         new HttpResponse({
            body: {
               token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ',
            },
         })
      );
   }
}
