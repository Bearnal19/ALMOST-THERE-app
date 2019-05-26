import { Component, Renderer2 } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = {
    mainSection: [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Notifications',
        url: '/about',
        icon: 'notifications'
      }
    ],
    secondarySection: [
      {
        title: 'Settings',
        url: '/about',
        icon: 'settings'
      },
      {
        title: 'Comments',
        url: '/about',
        icon: 'chatboxes'
      }
    ],
    configurationSection: [
      {
        title: 'Help',
        url: '/about',
        icon: 'help'
      },
      {
        title: 'About',
        url: '/about',
        icon: 'book'
      }
    ],
  };
  darkTheme = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private renderer: Renderer2
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
