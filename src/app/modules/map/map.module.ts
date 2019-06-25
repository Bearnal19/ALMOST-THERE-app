import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { HttpClientModule } from '@angular/common/http';
import { SearchAddressComponent } from '../../shared/components/search-address/search-address.component';
import { ModalConfigPage } from './modal-config/modal-config.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibWFubmxleDIxIiwiYSI6ImNqd3A1enA3cDE2NjUzeXA4dnowOHNiMTAifQ.rjWxHhVcMdnciPeu6BYyfQ'
    }),
    HttpClientModule
  ],

  declarations: [
    MapPage,
    SearchAddressComponent,
    ModalConfigPage
  ],
  entryComponents: [ModalConfigPage]
})
export class MapPageModule {}
