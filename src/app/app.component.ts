import { Component, Renderer2 } from '@angular/core';
import { config, accessToken } from 'src/app/core/config/config';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ApiMapboxService } from './core/http/api-mapbox.service';
import * as mapboxgl from 'mapbox-gl';
import { ThemeService } from './core/service/theme.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/item-alarm',
      icon: 'home',
      color: '#2B9483'
    },
    {
      title: 'Notifications',
      url: '/map',
      icon: 'notifications',
      color: '#FFA837'
    },
    {
      title: 'Comments',
      url: '/about',
      icon: 'chatboxes',
      color: '#F4FA28'
    },
    {
      title: 'Help',
      url: '/about',
      icon: 'help',
      color: '#8BDB24'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings',
      color: '#AFB4AE'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'book',
      color: '#AFB4AE'
    }
  ];
  darkTheme = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private renderer: Renderer2,
    private router: Router,
    private apiMapbox: ApiMapboxService,
    private theme: ThemeService,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken')
    .set(accessToken);
    // this.apiMapbox.getLocation().then((response) => {}).catch((error) => {});
    this.checkGPSPermission();
  }

  // Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition((resp) => {
      config.lat = resp.coords.latitude;
      config.lng = resp.coords.longitude;
    });
  }

  goToAddAlarm() {
    this.router.navigateByUrl('/add-alarm');
  }
}
