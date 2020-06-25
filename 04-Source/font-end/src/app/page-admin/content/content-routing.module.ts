import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ContentComponent} from './content.component';
import {HomeComponent} from './home/home.component';
import {DecentralizationComponent} from './decentralization/decentralization.component';
import {DepartmentComponent} from './department/department.component';
import {CategoryComponent} from './category/category.component';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'decentralization',
        component: DecentralizationComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {
}
