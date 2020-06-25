import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions, PreloadAllModules} from '@angular/router';

const routes: Routes = [
  {
    path: 'management',
    loadChildren: () => import('./page-admin/content/content.module')
      .then(m => m.ContentModule),
  },
  {
    path: '', redirectTo: 'management', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'management' },
];
const config = {
  preloadingStrategy: PreloadAllModules
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
