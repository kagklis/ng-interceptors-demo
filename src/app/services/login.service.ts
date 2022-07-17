import { HttpBackend, HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CacheService } from './cache.service';
import { LOGIN_REQUEST } from './interceptors/auth.interceptor';

@Injectable({
   providedIn: 'root',
})
export class LoginService {
   public isLoggedIn$ = this.authService.token$.pipe(map((token) => !!token));

   constructor(
      handler: HttpBackend,
      private httpClient: HttpClient,
      private cacheService: CacheService,
      private authService: AuthService,
      private router: Router
   ) {
      // If we wanted to bypass the entire chain of interceptors
      // we would use the following instance instead.
      // this.httpClient = new HttpClient(handler);
   }

   public login(creds: Credentials): Observable<any> {
      return this.httpClient
         .post<any>('/login', creds, {
            context: new HttpContext().set(LOGIN_REQUEST, true),
         })
         .pipe(
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
