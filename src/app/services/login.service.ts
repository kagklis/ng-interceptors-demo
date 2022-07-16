import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CacheService } from './cache.service';

@Injectable({
   providedIn: 'root',
})
export class LoginService {
   public isLoggedIn$ = this.authService.token$.pipe(map((token) => !!token));
   private httpClient: HttpClient;

   constructor(
      handler: HttpBackend,
      private cacheService: CacheService,
      private authService: AuthService,
      private router: Router
   ) {
      this.httpClient = new HttpClient(handler);
   }

   public login(creds: Credentials): Observable<any> {
      // Normally, we'd have something like this.httpClient.post<any>('/login', creds)
      // To keep this demo as simple as possible, we're going to return a fixed jwt token
      return of({
         token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ',
      }).pipe(
         tap((response) => {
            this.authService.setToken(response.token);
            this.router.navigate(['home']);
         })
      );
   }

   public logout(): void {
      this.authService.setToken('');
      this.router.navigate(['login']);
      console.log('Invalidating cache on logout...');
      this.cacheService.invalidateCache();
   }
}

export interface Credentials {
   username: string;
   password: string;
}
