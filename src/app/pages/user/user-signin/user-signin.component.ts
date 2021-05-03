import {Component, OnInit} from '@angular/core';
import {UserInterface} from '../../../view-models/user.interface';
import {AppGatewayService} from '../../../services/app-gateway.service';
import {environment} from '../../../../environments/environment.prod';
import {HttpActionEnum} from '../../../view-models/http-action.enum';
import {HttpHeaders} from '@angular/common/http';
import {ApiDtoInterface} from '../../../view-models/api-dto.interface';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss'],
})
export class UserSigninComponent implements OnInit {

  userInterface: UserInterface;
  apiDto: ApiDtoInterface;

  constructor(private appGateway: AppGatewayService,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private router: Router) {
    this.userInterface = {};
    this.apiDto = {};
  }

  ngOnInit() {
  }

  async performLogin(): Promise<any>{
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    const loginHeaders = new HttpHeaders()
      .append('x-user', this.userInterface.email)
      .append('x-token', this.userInterface.password);
    await this.appGateway.call(
      environment.url.concat('/v1/api/users/sign-in'),
      {}, HttpActionEnum.POST, loginHeaders).then(async result => {
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

  async goToRegister(): Promise<any> {
    await this.router.navigate(['/cadastrar']);
  }

}
