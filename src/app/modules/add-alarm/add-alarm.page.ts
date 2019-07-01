import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
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
    private alarmStorage: AlarmStorageService,
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private alertCrl: AlertController
  ){ 
    this.plt.ready().then(() =>{
      this.localNotifications.on('click').subscribe(res => {
        console.log('click: ',res);
        
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        console.log('trigger: ',res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });
  }

  ngOnInit() {
    this.urlStaticMap = this.apiMapbox.getStaticMap({lng: config.lng, lat: config.lat});
    const id = this.route.snapshot.paramMap.get('id');

    this.alarmStorage.getItemById(id).then((item) => {
      this.alarm = item;
      console.log(this.alarm);
    });
  }

  backToItemAlarm() {
    this.scheduleNotification();
    //this.router.navigateByUrl('/item-alarm');
  }

  editLocation() {
    this.router.navigateByUrl('/map');
  }

  showAlert(header, sub, msg){
    this.alertCrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

  scheduleNotification(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'First notification',
      data: { mydata: 'My hidden message this is'},
      sound:"file://assets/sounds/sound1.mp3",
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
      
    });
  }

  recurringNotification(){
    this.localNotifications.schedule({
      id: 2,
      title: 'Recurring',
      text: 'Second notification',
      data: { mydata: 'My hidden message this is'},
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE}
    });
  }

  repeatingDaily(){
    this.localNotifications.schedule({
      id: 2,
      title: 'Good Morning',
      text: 'HEY, LISTEN!',
      trigger: { 
        every:{
          hour:11, minute:49
        }
      }
    });
  }

  getAll(){

  }

}
