import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {UserInterface} from '../../../view-models/user.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  userInterface: UserInterface;

  constructor(private router: Router,
              private menu: MenuController) {
    this.checkUser();
  }

  ngOnInit() {
  }

  async navigateTo(url: string): Promise<void> {
    await this.menu.close();
    await this.router.navigate([url]);
  }

  checkUser(){
    if(localStorage.getItem('user') !== undefined){
      this.userInterface = JSON.parse(localStorage.getItem('user'));
    }else{
      this.userInterface = null;
    }
  }

  async performSignOut(): Promise<void>{
    localStorage.removeItem('user');
    await this.router.navigate(['/home']).then(() => window.location.reload());
  }

}
