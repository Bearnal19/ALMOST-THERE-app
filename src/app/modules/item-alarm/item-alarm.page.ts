import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { config } from '../../core/config/config';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';
import { AlarmStorageService, Alarm } from 'src/app/core/service/alarmStorage.service';
import * as uuid from 'uuid';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-item-alarm',
  templateUrl: './item-alarm.page.html',
  styleUrls: ['./item-alarm.page.scss'],
})
export class ItemAlarmPage implements OnInit {
  public alarms = [
    {
      name: 'Alarm1',
      location: '',
      days: {
        mon: true,
        tue: true,
        wen: true,
        fri: true,
        sat: true,
        sun: true
      },
      status: true
    },
    {
      name: 'Alarm2',
      location: '',
      days: {
        mon: true,
        tue: true,
        wen: true,
        fri: true,
        sat: true,
        sun: true
      },
      status: true
    },
    {
      name: 'Alarm3',
      location: '',
      days: {
        mon: true,
        tue: true,
        wen: true,
        fri: true,
        sat: true,
        sun: true
      },
      status: true
    },
    {
      name: 'Alarm4',
      location: '',
      days: {
        mon: true,
        tue: true,
        wen: true,
        fri: true,
        sat: true,
        sun: true
      },
      status: true
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private apiMapbox: ApiMapboxService,
    private alarmStorage: AlarmStorageService
  ) { }

  ngOnInit() {
  }

  editItemAlarm() {
    this.navCtrl.navigateRoot('/add-alarm');
  }

  changeAlarmStatus() {

  }

  addAlarm() {
    const id = uuid();
    const alarm = {
      id,
      'alarm-name': 'Una alarma',
      hora: '12:20pm'
    } as Alarm;

    this.alarmStorage.addItem(alarm).then(() => {
      this.navCtrl.navigateRoot('/add-alarm/' + id);
    });
  }

  deleteAlarm() {

  }

}
