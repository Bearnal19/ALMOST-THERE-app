import { Component, Renderer2 } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/list',
      icon: 'home',
      color: '#2B9483'
    },
    {
      title: 'Notifications',
      url: '/about',
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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToAddAlarm() {
    this.router.navigateByUrl('/add-alarm');
  }
}
