import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PandaListComponent } from './panda-list/panda-list.component';

const routes: Routes = [{ path: '', component: PandaListComponent }];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class PandasRoutingModule {}
