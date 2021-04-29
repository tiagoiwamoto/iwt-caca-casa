import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../../../view-models/user.interface';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss'],
})
export class UserSigninComponent implements OnInit {

  userInterface: UserInterface;

  constructor() {
    this.userInterface = {};
  }

  ngOnInit() {}

}
