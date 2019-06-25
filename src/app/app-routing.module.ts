import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'item-alarm',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './modules/list/list.module#ListPageModule'
  },
  {
    path: 'add-alarm/:id',
    loadChildren: './modules/add-alarm/add-alarm.module#AddAlarmPageModule'
  },
  {
    path: 'map',
    loadChildren: './modules/map/map.module#MapPageModule'
  },
  {
    path: 'about',
    loadChildren: './modules/about/about.module#AboutPageModule'
  },
  {
    path: 'item-alarm',
    loadChildren: './modules/item-alarm/item-alarm.module#ItemAlarmPageModule'
  },
  {
    path: 'settings',
    loadChildren: './modules/settings/settings.module#SettingsPageModule'
  },
  { path: 'modal-config', loadChildren: './modules/map/modal-config/modal-config.module#ModalConfigPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
