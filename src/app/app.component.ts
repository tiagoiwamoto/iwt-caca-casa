import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menu: MenuController, public router: Router) {
    this.router.navigate(['/home']);
  }

  async openFirst(): Promise<void> {
    await this.menu.open('first');
  }

}
