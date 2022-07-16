import { Component, Input } from '@angular/core';
import { Panda } from '../panda';

@Component({
   selector: 'app-panda',
   templateUrl: './panda.component.html',
   styleUrls: ['./panda.component.scss'],
})
export class PandaComponent {
   @Input() panda!: Panda;
}
