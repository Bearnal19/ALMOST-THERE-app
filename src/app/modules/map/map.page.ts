import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { config } from 'src/app/core/config/config';
import { MapUtils } from 'src/app/core/config/map-utils';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';

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
  constructor(private router: Router, private apiMapbox: ApiMapboxService) {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken')
    .set('pk.eyJ1IjoibWFubmxleDIxIiwiYSI6ImNqd3A1enA3cDE2NjUzeXA4dnowOHNiMTAifQ.rjWxHhVcMdnciPeu6BYyfQ');
  }

  ngOnInit() {
    this.initMap();
  }

  backToAddAlarm() {
    this.router.navigateByUrl('/add-alarm');
  }

  initMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // map style
      center: [config.lng, config.lat], // starting position
      zoom: 15 // starting zoom
    });

    // Add Marker to the map.
    MapUtils.addMarker([config.lng, config.lat], this.map);
  }

  flyTo(item): void {
    // Go to the coordinates on map
    this.map.flyTo({
      center: item.geometry.coordinates
    });

    MapUtils.addMarker(item.geometry.coordinates, this.map);
  }
}
