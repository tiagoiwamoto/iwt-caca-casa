import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {
  Capacitor,
  Plugins,
  PushNotificationActionPerformed,
  PushNotification,
  PushNotificationToken} from '@capacitor/core';
import {ToastController} from '@ionic/angular';
import {UserInterface} from '../view-models/user.interface';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  userInterface: UserInterface;

  constructor(private router: Router,
              private toastController: ToastController) { }

  initPush() {
    if(Capacitor.platform !== 'web'){
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if(permission.granted){
        PushNotifications.register();
      }else{
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        const toast = await this.toastController.create({
          message: notification.body,
          duration: 2000
        });
        this.userInterface = JSON.parse(localStorage.getItem('user'));
        if(this.userInterface.userType === 'CORRETOR'){
          await toast.present();
        }
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if(data.detailsId){
          //TODO: Navegar quando tiver um id
        }
      }
    );
  }
}
