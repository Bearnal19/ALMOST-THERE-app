import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken')
    .set('pk.eyJ1IjoibWFubmxleDIxIiwiYSI6ImNqd3A1enA3cDE2NjUzeXA4dnowOHNiMTAifQ.rjWxHhVcMdnciPeu6BYyfQ');
  }

  ngOnInit() {
    this.initMap();
  }

  initMap(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8], // starting position
      zoom: 3 // starting zoom
      });

      // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
  }
}
