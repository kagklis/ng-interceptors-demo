import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent {
   isLoggedIn$: Observable<boolean>;

   constructor(private loginService: LoginService) {
      this.isLoggedIn$ = loginService.isLoggedIn$;
   }

   logout(): void {
      this.loginService.logout();
   }
}
