import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProductNegociateInterface} from '../../../view-models/negociation/product-negociate-interface';
import {ProductNegociateMessageInterface} from '../../../view-models/negociation/product-negociate-message-interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppGatewayService} from '../../../services/app-gateway.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {environment} from '../../../../environments/environment.prod';
import {HttpActionEnum} from '../../../view-models/http-action.enum';
import {UserInterface} from '../../../view-models/user.interface';
import {ApiDtoInterface} from '../../../view-models/api-dto.interface';
import {Validators} from '@angular/forms';
declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-negociate-chat',
  templateUrl: './negociate-chat.component.html',
  styleUrls: ['./negociate-chat.component.scss'],
})
export class NegociateChatComponent implements OnInit {

  @ViewChild('chatNegociate') private content: any;
  stompClientNotification;
  messages: ProductNegociateMessageInterface[];
  message: ProductNegociateInterface;
  userInterface: UserInterface;
  apiDto: ApiDtoInterface;
  tmpMessage;
  corretor;
  user;

  constructor(private http: HttpClient,
              private router: Router,
              private appGateway: AppGatewayService,
              private toastController: ToastController,
              private loadingController: LoadingController) {
    this.loadChat();
    this.checkUser();
    this.message = {};
    this.corretor = atob(localStorage.getItem('corretor'));
    this.user = atob(localStorage.getItem('tmpUser'));
    this.getUserNotifications();
    this.updateScroll();
  }

  ngOnInit() {}

  goToHome(): void{
    this.router.navigate(['/negociate/list']);
  }

  loadChat(){
    const chat = atob(localStorage.getItem('currentChat'));
    this.messages = JSON.parse(chat);
  }

  async performSendMessage(): Promise<void>{
    if(this.tmpMessage === undefined || this.tmpMessage.length < 1){
      const toast = await this.toastController.create({message: 'Informe uma mensagem', duration: 2000});
      await toast.present();
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Gravando imóvel',
    });
    await loading.present();
    const customHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('message', this.tmpMessage);
    this.message.type = this.userInterface.userType;
    this.message.userTo = this.corretor;
    this.message.userFrom = this.user;
    this.appGateway.call(
      environment.url.concat('/v1/api/products/negociate/reply'),
      this.message, HttpActionEnum.POST, customHeaders).then(async res => {
      this.apiDto = res;
      this.updateScroll();
      await loading.dismiss();
      // @ts-ignore
      const toast = await this.toastController.create({message: this.apiDto.message, duration: 200});
      await toast.present();
      this.tmpMessage = '';
      this.apiDto = {};
    }).catch(async error => {
      console.log(error);
      await loading.dismiss();
      const toast = await this.toastController.create({message: 'Falha ao enviar mensagem', duration: 2000});
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

  async getUserNotifications(): Promise<void> {
    this.stompClientNotification = Stomp.over(new SockJS('http://localhost:8082/socket'));
    // this.stompClientNotification.debug = null;
    this.stompClientNotification.connect({}, () => {
      this.stompClientNotification.subscribe('/topic/negociate/'.concat(this.user).concat(this.corretor), (message) => {
        console.log(message);
        this.message = JSON.parse(message.body);
        this.messages.push(this.message.messages[this.message.messages.length - 1]);
      });
    });
  }

  updateScroll(){
    this.content.scrollToBottom(300);
  }

}
