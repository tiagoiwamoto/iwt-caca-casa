import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController, Platform} from '@ionic/angular';
import {FcmService} from './services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menu: MenuController,
              public router: Router,
              private platform: Platform,
              private fcmService: FcmService) {
    this.initializeApp();
    this.router.navigate(['/home']);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.fcmService.initPush();
    });
  }

  async openFirst(): Promise<void> {
    await this.menu.open('first');
  }

}
