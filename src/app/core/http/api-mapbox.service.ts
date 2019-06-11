import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { accessToken, config } from '../config/config';

@Injectable({
  providedIn: 'root'
})

export class ApiMapboxService {
  constructor(public http: HttpClient) {
  }

  getSearch(value: string, params: any): any {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?`
    + `proximity=${config.lng},${config.lat}`
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

  getStaticMap(): string {
    const urlStaticMap = `https://api.mapbox.com/v4/mapbox.emerald/${config.lng},${config.lat},15/600x300@2x.png`
      + `?access_token=${accessToken}`;
    return urlStaticMap;
  }
}
