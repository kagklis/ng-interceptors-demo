import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PandaService } from 'src/app/services/panda.service';
import { Panda } from '../panda';

@Component({
   templateUrl: './panda-list.component.html',
   styleUrls: ['./panda-list.component.scss'],
})
export class PandaListComponent {
   public pandas$: Observable<Panda[]>;

   constructor(pandaService: PandaService, private router: Router) {
      this.pandas$ = pandaService.getPandas();
   }

   returnHome(): void {
      this.router.navigate(['home']);
   }
}
