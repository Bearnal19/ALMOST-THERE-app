import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { accessToken, config } from '../config/config';
import { MapUtils } from '../config/map-utils';
import * as mapboxgl from 'mapbox-gl';
@Injectable({
  providedIn: 'root'
})

export class ApiMapboxService {
  constructor(public http: HttpClient) {
  }

  // Api: Realiza busquedas en base a un string
  // Params: valor a buscar, radio del area a buscar (10km dfault)
  getSearch(value: string, params: any, radiusInKm?: number): any {
    const dots = MapUtils.createGeoJSONDots([config.lng, config.lat], radiusInKm, 63);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?`
    + `proximity=${config.lng},${config.lat}`
    + `&bbox=${dots[42][0]},${dots[42][1]},${dots[7][0]},${dots[7][1]}`
    + `&limit=${params.limit}`
    + `&access_token=${accessToken}`;
    return this.http.get<Array<any>>(url, {
      observe: 'response'
    }).pipe(
      map(res => {
        return res;
      })
    );
  }

  // Api: Realiza busquedas en base a un string
  // Params: valor a buscar, radio del area a buscar (10km dfault)
  getSearchCoordinates(value: string): any {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?`
    + `&access_token=${accessToken}`;
    return this.http.get<Array<any>>(url, {
      observe: 'response'
    }).pipe(
      map(res => {
        return res;
      })
    );
  }

  // Api: Realiza localizacion actual
  // Params:
  getLocation(): any {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationMarker = null;
        if (locationMarker) {
          // return if there is a locationMarker bug
          reject();
        }
        config.lat = position.coords.latitude;
        config.lng = position.coords.longitude;
        resolve(position);
      }, (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true
      });
    });
  }

  // Api: Obtiene una "foto" del mapa en una posicion especifica [lng, lat]
  // Params: valor a buscar, radio del area a buscar (10km dfault)
  getStaticMap(coordinates?: any): string {
    coordinates.lng = coordinates.lng || config.lng;
    coordinates.lat = coordinates.lat || config.lat;
    const urlStaticMap = `https://api.mapbox.com/v4/mapbox.emerald/${coordinates.lng},${coordinates.lat},15/600x300@2x.png`
      + `?access_token=${accessToken}`;
    return urlStaticMap;
  }
}
