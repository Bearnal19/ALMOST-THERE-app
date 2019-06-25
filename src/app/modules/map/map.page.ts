import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { config, accessToken } from 'src/app/core/config/config';
import { MapUtils } from 'src/app/core/config/map-utils';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';
import { ToastController, ModalController } from '@ionic/angular';
import { ModalConfigPage } from './modal-config/modal-config.page';
import { OverlayEventDetail } from '@ionic/core';
import { Utils } from 'src/app/core/config/utils';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  lastAction = '';
  data = {
    range: 100,
    coordinates: {
      lat: config.lat,
      lng: config.lng
    },
    polygon: [],
    place_name: ''
  };
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
  constructor(
    private router: Router,
    private apiMapbox: ApiMapboxService,
    public toastController: ToastController,
    public modalController: ModalController) {
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
      const kms = Utils.mToKm(this.data.range);
      this.lastAction = 'click';
      this.data.coordinates.lng = e.lngLat.lng;
      this.data.coordinates.lat = e.lngLat.lat;

      MapUtils.addMarker([e.lngLat.lng, e.lngLat.lat], this.map);
      MapUtils.flyTo([e.lngLat.lng, e.lngLat.lat], this.map);
      MapUtils.makeCircle([e.lngLat.lng, e.lngLat.lat], this.map, kms, '#ffc1bd');
    });

    this.map.on('load', () => {
      const kms = Utils.mToKm(this.data.range);

      MapUtils.addMarker([this.data.coordinates.lng, this.data.coordinates.lat], this.map);
      MapUtils.makeCircle([this.data.coordinates.lng, this.data.coordinates.lat], this.map, kms, '#ffc1bd');
    });
  }

  goToMyLocation(): void {
    this.apiMapbox.getLocation().then((response) => {
      const kms = Utils.mToKm(this.data.range);
      this.data.coordinates.lng = response.coords.longitude;
      this.data.coordinates.lat = response.coords.latitude;

      MapUtils.flyTo([response.coords.longitude, response.coords.latitude], this.map);
      MapUtils.addMarker([response.coords.longitude, response.coords.latitude], this.map);
      MapUtils.makeCircle([response.coords.longitude, response.coords.latitude], this.map, kms, '#ffc1bd');
    }).catch((error) => {});
  }

  async showConfig() {
    const modal = await this.modalController.create({
      component: ModalConfigPage,
      componentProps: {
        range: this.data.range
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.setData(data.data);
    });
    await modal.present();
  }

  flyTo(item: any): void {
    this.lastAction = 'search';
    const kms = Utils.mToKm(this.data.range);
    this.data.place_name = item.place_name;

    MapUtils.flyTo(item.geometry.coordinates, this.map);
    MapUtils.addMarker(item.geometry.coordinates, this.map);
    MapUtils.makeCircle(item.geometry.coordinates, this.map, kms, '#ffc1bd');
  }

  setData(data: any): void {
    this.data.range = data.value.range;
    const kms = Utils.mToKm(this.data.range);

    MapUtils.makeCircle([this.data.coordinates.lng, this.data.coordinates.lat], this.map, kms, '#ffc1bd');
  }

  save(): void {
    const kms = Utils.mToKm(this.data.range);
    this.data.polygon = MapUtils.createGeoJSONDots([this.data.coordinates.lng, this.data.coordinates.lat], kms, 63);
    console.log(this.data)
    if (this.lastAction === 'click' || this.lastAction === '') {
      this.apiMapbox.getSearchCoordinates(`${this.data.coordinates.lng},${this.data.coordinates.lat}`).subscribe(
        (response) => {
          this.data.place_name = response.body.features[0].place_name;
          console.log(this.data)
          this.backToAddAlarm();
        }, (error) => {
        }
      );
    } else {
      this.backToAddAlarm();
    }
    //  Con este metodo sabremos si un punto esta adentro de un poligono
    // MapUtils.pointIsInside([this.data.coordinates.lng, lat: this.data.coordinates.lat], dots);
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
