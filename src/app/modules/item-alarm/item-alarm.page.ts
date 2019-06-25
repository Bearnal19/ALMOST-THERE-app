import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { config } from '../../core/config/config';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';
import { AlarmStorageService } from 'src/app/core/service/alarmStorage.service';
import * as uuid from 'uuid';
import { Storage } from '@ionic/storage';
import { Alarm } from 'src/app/core/interface/alarm';

@Component({
  selector: 'app-item-alarm',
  templateUrl: './item-alarm.page.html',
  styleUrls: ['./item-alarm.page.scss'],
})
export class ItemAlarmPage implements OnInit {

  alarms: Array<Alarm>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private apiMapbox: ApiMapboxService,
    private alarmStorage: AlarmStorageService
  ) { }

  ngOnInit() {
    this.alarmStorage.getItems().then((items) => {
      this.alarms = items;
      console.log(this.alarms);
    });
  }

  editAlarm(alarm) {
    this.navCtrl.navigateRoot('/add-alarm/' + alarm.id);
  }

  changeAlarmStatus(alarm ) {

  }

  addAlarm() {
    const id = uuid();
    const alarm = {
      id,
      name: 'Una alarma',
      hour: '12:20pm',
      location: '',
      days: {
        mon: true,
        tue: true,
        wen: true,
        fri: true,
        sat: true,
        sun: false
      },
      status: true
    } as Alarm;

    this.alarmStorage.addItem(alarm).then(() => {
      this.navCtrl.navigateRoot('/add-alarm/' + id);
    });
  }

  deleteAlarm(alarm) {
    this.alarmStorage.deleteItem(alarm.id).then((item) => {
      this.alarmStorage.getItems().then((items) => {
        this.alarms = items;
        console.log(this.alarms);
      });
    });
  }

}
