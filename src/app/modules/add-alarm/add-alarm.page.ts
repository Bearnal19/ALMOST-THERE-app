import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';
import { AlarmStorageService } from 'src/app/core/service/alarmStorage.service';
import { config } from 'src/app/core/config/config';
import { Storage } from '@ionic/storage';
import { Alarm } from 'src/app/core/interface/alarm';

@Component({
  selector: 'app-add-alarm',
  templateUrl: './add-alarm.page.html',
  styleUrls: ['./add-alarm.page.scss'],
})
export class AddAlarmPage implements OnInit {
  urlStaticMap = '';
  alarm: Alarm;
  lat = null;
  lng = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiMapbox: ApiMapboxService,
    private alarmStorage: AlarmStorageService
  ) { }

  ngOnInit() {
    this.urlStaticMap = this.apiMapbox.getStaticMap({lng: config.lng, lat: config.lat});
    const id = this.route.snapshot.paramMap.get('id');

    this.alarmStorage.getItemById(id).then((item) => {
      this.alarm = item;
      console.log(this.alarm);
    });
  }

  backToItemAlarm() {
    this.router.navigateByUrl('/item-alarm');
  }

  editLocation() {
    this.router.navigateByUrl('/map');
  }
}
