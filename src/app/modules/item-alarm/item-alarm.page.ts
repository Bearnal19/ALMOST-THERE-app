import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editItemAlarm() {
    this.router.navigateByUrl('/add-alarm');
  }

  changeAlarmStatus() {

  }

  deleteAlarm() { }

}
