import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { config, accessToken } from 'src/app/core/config/config';
import { MapUtils } from 'src/app/core/config/map-utils';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: []
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    }]
  };
  constructor(private router: Router, private apiMapbox: ApiMapboxService, public toastController: ToastController) {
  }

  ngOnInit() {
    this.initMap();
  }

  backToAddAlarm() {
    this.router.navigateByUrl('/add-alarm');
  }

  initMap(): void {
    const This = this;
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // map style
      center: [config.lng, config.lat], // starting position
      zoom: 15 // starting zoom
    });

    this.map.on('click', (e: any) => {
      MapUtils.addMarker([e.lngLat.lng, e.lngLat.lat], this.map);
      MapUtils.flyTo([e.lngLat.lng, e.lngLat.lat], This.map);
      // MapUtils.makeCircle([e.lngLat.lng, e.lngLat.lat], This.map, 0.5);
    });

    MapUtils.addMarker([config.lng, config.lat], this.map);
  }

  flyTo(item: any): void {
    MapUtils.flyTo(item.geometry.coordinates, this.map);
    MapUtils.addMarker(item.geometry.coordinates, this.map);
  }

  goToMyLocation(): void {
    this.apiMapbox.getLocation().then((response) => {
      MapUtils.flyTo([response.coords.longitude, response.coords.latitude], this.map);
      MapUtils.addMarker([response.coords.longitude, response.coords.latitude], this.map);
    }).catch((error) => {});
  }

  async test() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'bottom',
      duration: 4000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
