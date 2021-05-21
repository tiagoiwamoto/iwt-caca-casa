import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../../../view-models/user.interface';
import {AppGatewayService} from '../../../services/app-gateway.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ApiDtoInterface} from '../../../view-models/api-dto.interface';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment.prod';
import {HttpActionEnum} from '../../../view-models/http-action.enum';

@Component({
  selector: 'app-user-sign',
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.scss'],
})
export class UserSignComponent implements OnInit {

  apiDto: ApiDtoInterface;
  userInterface: UserInterface;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  type = 'password';

  constructor(private appGateway: AppGatewayService,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private router: Router) {
    this.userInterface = {userType: 'USUARIO'};
  }

  ngOnInit() {}

  async performSign(): Promise<any>{
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    const loginHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    await this.appGateway.call(
      environment.url.concat('/v1/api/users'),
      this.userInterface, HttpActionEnum.POST, loginHeaders).then(async result => {
      this.apiDto = result;
      this.userInterface = this.apiDto.details;
      localStorage.setItem('user', JSON.stringify(this.userInterface));
      await loading.dismiss();
      await this.router.navigate(['/home']).then(() => window.location.reload());
    }).catch(async error => {
      console.log(error.message);
      const toast = await this.toastController.create({
        message: error.message,
        duration: 2000
      });
      await loading.dismiss();
      await toast.present();
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  segmentChanged(usertype: Event): void {
    // @ts-ignore
    this.userInterface.userType = usertype.detail.value;
  }

}
