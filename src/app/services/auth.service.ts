import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class AuthService {
   private tokenSubject = new BehaviorSubject<string>('');
   public token$ = this.tokenSubject.asObservable();

   constructor() {}

   setToken(token: string): void {
      this.tokenSubject.next(token);
   }

   get token(): string {
      return this.tokenSubject.value;
   }
}
