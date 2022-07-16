import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { SharedModule } from '../shared/shared.module';

@Component({
   standalone: true,
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
   imports: [SharedModule],
})
export class LoginComponent implements OnInit, OnDestroy {
   @ViewChild('form') form!: NgForm;

   private subscription: Subscription;

   constructor(private loginService: LoginService) {
      this.subscription = new Subscription();
   }

   ngOnInit(): void {}

   onSubmit(): void {
      if (this.form.invalid) {
         return;
      }
      this.subscription.add(
         this.loginService.login(this.form.value).subscribe()
      );
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }
}
