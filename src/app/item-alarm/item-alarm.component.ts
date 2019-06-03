import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'item-alarm',
  templateUrl: './item-alarm.component.html',
  styleUrls: ['./item-alarm.component.scss'],
})
export class ItemAlarmComponent implements OnInit {

  public alarms = [
    {
      "name": "Alarm1",
      "location": "",
      "days": {
        "mon": true,
        "tue": true,
        "wen": true,
        "fri": true,
        "sat": true,
        "sun": true
      },
      "status": true
    },
    {
      "name": "Alarm2",
      "location": "",
      "days": {
        "mon": true,
        "tue": true,
        "wen": true,
        "fri": true,
        "sat": true,
        "sun": true
      },
      "status": true
    },
    {
      "name": "Alarm3",
      "location": "",
      "days": {
        "mon": true,
        "tue": true,
        "wen": true,
        "fri": true,
        "sat": true,
        "sun": true
      },
      "status": true
    },
    {
      "name": "Alarm4",
      "location": "",
      "days": {
        "mon": true,
        "tue": true,
        "wen": true,
        "fri": true,
        "sat": true,
        "sun": true
      },
      "status": true
    }
  ]; 

  constructor(private navCtrl: NavController) { }

  editItemAlarm(){
    this.navCtrl.navigateForward("list");
  }
  changeAlarmStatus(){

  }
  deleteAlarm(){
    
  }

  ngOnInit() {}

}
