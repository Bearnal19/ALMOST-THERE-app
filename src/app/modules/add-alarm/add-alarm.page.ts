import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiMapboxService } from 'src/app/core/http/api-mapbox.service';
import { config } from 'src/app/core/config/config';

@Component({
  selector: 'app-add-alarm',
  templateUrl: './add-alarm.page.html',
  styleUrls: ['./add-alarm.page.scss'],
})
export class AddAlarmPage implements OnInit {
  urlStaticMap = '';
  lat = null;
  lng = null;
  constructor(private router: Router, private apiMapbox: ApiMapboxService) { }

  ngOnInit() {
    this.urlStaticMap = this.apiMapbox.getStaticMap();
  }

  backToItemAlarm() {
    this.router.navigateByUrl('/item-alarm');
  }

  editLocation() {
    this.router.navigateByUrl('/map');
  }
}
