import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-alarm',
  templateUrl: './add-alarm.page.html',
  styleUrls: ['./add-alarm.page.scss'],
})
export class AddAlarmPage implements OnInit {
  urlStaticMap = '';
  lat = null;
  lng = null;
  constructor(private router: Router) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      const locationMarker = null;
      if (locationMarker) {
        // return if there is a locationMarker bug
        return;
      }
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.urlStaticMap = `https://api.mapbox.com/v4/mapbox.emerald/${this.lng},${this.lat},15/600x300@2x.png`
      + `?access_token=pk.eyJ1IjoibWFubmxleDIxIiwiYSI6ImNqd3A1enA3cDE2NjUzeXA4dnowOHNiMTAifQ.rjWxHhVcMdnciPeu6BYyfQ`;
    }, (error) => {
        console.log('Error: ', error);
    },
      {
      enableHighAccuracy: true
      }
    );
  }

  backToItemAlarm() {
    this.router.navigateByUrl('/item-alarm');
  }

  editLocation() {
    this.router.navigateByUrl('/map');
  }
}
