import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PandasRoutingModule } from './pandas-routing.module';
import { PandaComponent } from './panda/panda.component';
import { PandaListComponent } from './panda-list/panda-list.component';

@NgModule({
   declarations: [PandaComponent, PandaListComponent],
   imports: [CommonModule, PandasRoutingModule],
})
export class PandasModule {}
