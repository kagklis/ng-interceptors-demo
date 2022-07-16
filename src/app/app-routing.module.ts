import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
   {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
   },
   {
      path: 'login',
      title: 'Sign In',
      loadComponent: () =>
         import('./login/login.component').then((c) => c.LoginComponent),
   },
   {
      path: 'home',
      title: 'Home Page',
      loadComponent: () =>
         import('./home/home.component').then((c) => c.HomeComponent),
      canActivate: [AuthGuard],
   },
   {
      path: 'pandas',
      loadChildren: () =>
         import('./pandas/pandas.module').then((m) => m.PandasModule),
      canActivate: [AuthGuard],
   },
   {
      path: '**',
      title: 'Oops, wrong turn!',
      component: PageNotFoundComponent,
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
