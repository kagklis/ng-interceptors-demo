import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   template: `
      <div class="h-100 d-flex flex-column align-items-center justify-content-center">
         <p class="display-6">This is not the page you were looking for!</p>
         <button class="btn btn-primary" (click)="returnHome()">
            Return Home
         </button>
      </div>
   `,
})
export class PageNotFoundComponent {
   constructor(private router: Router) {}

   returnHome(): void {
      console.log('Returning home...');
      this.router.navigate(['home']);
   }
}
