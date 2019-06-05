import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './modules/list/list.module#ListPageModule'
  },
  {
    path: 'add-alarm',
    loadChildren: './modules/add-alarm/add-alarm.module#AddAlarmPageModule'
  },
  {
    path: 'about',
    loadChildren: './modules/about/about.module#AboutPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
