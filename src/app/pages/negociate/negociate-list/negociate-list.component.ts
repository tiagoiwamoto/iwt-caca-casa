import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppGatewayService} from '../../../services/app-gateway.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {environment} from '../../../../environments/environment.prod';
import {HttpActionEnum} from '../../../view-models/http-action.enum';
import {ApiDtoInterface} from '../../../view-models/api-dto.interface';
import {ProductNegociateInterface} from '../../../view-models/negociation/product-negociate-interface';
import {UserInterface} from '../../../view-models/user.interface';

@Component({
  selector: 'app-negociate-list',
  templateUrl: './negociate-list.component.html',
  styleUrls: ['./negociate-list.component.scss'],
})
export class NegociateListComponent implements OnInit {

  apiDto: ApiDtoInterface;
  messages: ProductNegociateInterface[];
  userInterface: UserInterface;

  constructor(private http: HttpClient,
              private router: Router,
              private appGateway: AppGatewayService,
              private toastController: ToastController,
              private loadingController: LoadingController) {
    this.messages = [];
    this.checkUser();
  }

  async ngOnInit(): Promise<void> {
    await this.loadMyNegociations();
  }

  goToHome(): void{
    this.router.navigate(['/home']);
  }

  goTo(page, messages: ProductNegociateInterface[], corretor, user): void{
    localStorage.setItem('currentChat', btoa(JSON.stringify(messages)));
    localStorage.setItem('corretor', btoa(corretor));
    localStorage.setItem('tmpUser', btoa(user));
    this.router.navigate([page]);
  }

  async loadMyNegociations(): Promise<void>{
    const loading = await this.loadingController.create({
      message: 'Carregando...',
    });
    await loading.present();
    const customHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-user-id', this.userInterface.id.toString())
      .append('x-usertype', this.userInterface.userType);
    this.appGateway.call(
      environment.url.concat('/v1/api/products/negociate'),
      null, HttpActionEnum.GET, customHeaders).then(async res => {
      console.log(res);
      this.apiDto = res;
      this.messages = this.apiDto.details;
      await loading.dismiss();
      this.apiDto = {};
    }).catch(async error => {
      console.log(error);
      await loading.dismiss();
      const toast = await this.toastController.create({message: 'Falha ao carregar negociações', duration: 2000});
      await toast.present();
    });
  }

  checkUser(){
    if(localStorage.getItem('user') !== undefined){
      this.userInterface = JSON.parse(localStorage.getItem('user'));
    }else{
      this.userInterface = null;
    }
  }

}
